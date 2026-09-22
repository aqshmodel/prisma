import { describe, it, expect } from "vitest";
import {
  submissionSchema,
  submissionHash,
} from "@/features/diagnosis/lib/submission";
const input = {
  id: "12345678-1234-4123-8123-123456789012",
  locale: "ja",
  result: {
    os: { code: "ENTp", subtype: "Contact" },
    engine: { primary: "T1", secondary: "T2" },
    bias: {
      scores: {
        Confirmation: 0,
        SunkCost: 0,
        StatusQuo: 0,
        Authority: 0,
        Availability: 0,
      },
      alerts: [],
      totalScore: 0,
    },
    matrix: { x: 5, y: 5 },
    validity: "A",
    timestamp: "2026/9/22 10:00:00",
  },
};
describe("submission validation", () => {
  it("accepts current calculator shape and gives stable canonical identity", () => {
    expect(submissionSchema.safeParse(input).success).toBe(true);
    expect(submissionHash(submissionSchema.parse(input))).toBe(
      submissionHash(submissionSchema.parse(JSON.parse(JSON.stringify(input)))),
    );
  });
  it("rejects invalid code, non-finite scores, unexpected identifiers and contradictory totals", () => {
    expect(
      submissionSchema.safeParse({
        ...input,
        result: { ...input.result, os: { code: "fake", subtype: "Contact" } },
      }).success,
    ).toBe(false);
    expect(
      submissionSchema.safeParse({
        ...input,
        result: { ...input.result, matrix: { x: Infinity, y: 5 } },
      }).success,
    ).toBe(false);
    expect(submissionSchema.safeParse({ ...input, id: "../bad" }).success).toBe(
      false,
    );
    expect(
      submissionSchema.safeParse({
        ...input,
        result: {
          ...input.result,
          bias: { ...input.result.bias, totalScore: 3 },
        },
      }).success,
    ).toBe(false);
  });
});
