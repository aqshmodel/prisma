// Validate proposed transition rules; publish only with explicit --apply.
import admin from "firebase-admin";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
const cert = JSON.parse(
  fs.readFileSync("google-key/prisma-8e66a-firebase-adminsdk.json", "utf8"),
);
const credential = admin.credential.cert(cert);
const token = process.argv.includes("--gcloud")
  ? {
      access_token: execFileSync("gcloud", ["auth", "print-access-token"], {
        encoding: "utf8",
      }).trim(),
    }
  : await credential.getAccessToken();
const project = `projects/${cert.project_id}`;
const call = async (path, method = "GET", body) => {
  const res = await fetch(`https://firebaserules.googleapis.com/v1/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/json",
      "x-goog-user-project": cert.project_id,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${json.error?.message}`);
  return json;
};
const source = {
  files: [
    {
      name: "firestore.rules",
      content: fs.readFileSync("firebase/firestore.transition.rules", "utf8"),
    },
  ],
};
const uid = source.files[0].content.match(/request.auth.uid == '([^']+)'/)[1];
const cases = [];
for (const auth of [null, { uid: "non-admin", token: {} }])
  for (const collection of [
    "diagnosis_results",
    "_admin_statistics",
    "team_analysis_orders",
  ])
    for (const method of ["get", "update", "delete"]) {
      cases.push({
        expectation: "DENY",
        request: {
          path: `/databases/(default)/documents/${collection}/validation-only`,
          method,
          auth,
        },
        resource: { data: {} },
      });
    }
cases.push({
  expectation: "ALLOW",
  request: {
    path: "/databases/(default)/documents/diagnosis_results/validation-only",
    method: "get",
    auth: { uid, token: {} },
  },
  resource: { data: {} },
});
for (const collection of ["_admin_statistics", "team_analysis_orders"])
  cases.push({
    expectation: "DENY",
    request: {
      path: `/databases/(default)/documents/${collection}/validation-only`,
      method: "create",
      auth: null,
      resource: { data: {} },
    },
  });
const time = "2026-09-22T00:00:00Z";
cases.push({
  expectation: "ALLOW",
  request: {
    path: "/databases/(default)/documents/diagnosis_results/validation-only",
    method: "create",
    auth: null,
    time,
    resource: {
      data: {
        timestamp: time,
        type: { os: { code: "ENTp" }, engine: { primary: "T1" } },
      },
    },
  },
});
const result = await call(`${project}:test`, "POST", {
  source,
  testSuite: { testCases: cases },
});
console.log(
  JSON.stringify({
    issues: result.issues,
    testResults: result.testResults?.map((r, i) => ({
      index: i,
      state: r.state,
      errors: r.errorPosition,
    })),
  }),
);
if (
  result.issues?.some((i) => i.severity === "ERROR") ||
  result.testResults?.length !== cases.length ||
  result.testResults.some((r) => r.state !== "SUCCESS")
)
  throw new Error("Rules validation did not pass");
if (process.argv.includes("--apply")) {
  const previous = await call(`${project}/releases/cloud.firestore`);
  const previousRules = await call(previous.rulesetName);
  fs.mkdirSync("documents/admin/rules-backups", { recursive: true });
  fs.writeFileSync(
    `documents/admin/rules-backups/${Date.now()}.json`,
    JSON.stringify({ previous, previousRules }, null, 2),
    { mode: 0o600 },
  );
  const next = await call(`${project}/rulesets`, "POST", { source });
  const release = await call(`${project}/releases/cloud.firestore`, "PATCH", {
    release: { name: previous.name, rulesetName: next.name },
    updateMask: "rulesetName",
  });
  console.log(
    JSON.stringify({
      publishedRuleset: release.rulesetName,
      previousRuleset: previous.rulesetName,
    }),
  );
}
