import { z } from "zod";
import { createHash } from "node:crypto";
import { OS_CODES, ENGINE_CODES } from "@/features/admin/lib/statistics";
const score = z.number().int().min(0).max(2);
const biases = [
  "Confirmation",
  "SunkCost",
  "StatusQuo",
  "Authority",
  "Availability",
] as const;
export const submissionSchema = z.object({
  id: z.uuid(),
  locale: z.enum(["ja", "en"]),
  result: z.object({
    os: z.object({
      code: z.enum(OS_CODES),
      subtype: z.enum(["Contact", "Inert"]),
    }),
    engine: z.object({
      primary: z.enum(ENGINE_CODES),
      secondary: z.enum(ENGINE_CODES),
    }),
    bias: z
      .object({
        scores: z.object({
          Confirmation: score,
          SunkCost: score,
          StatusQuo: score,
          Authority: score,
          Availability: score,
        }),
        alerts: z.array(z.enum(biases)).max(5),
        totalScore: z.number().int().min(0).max(10),
      })
      .refine(
        (b) =>
          Object.values(b.scores).reduce((a, v) => a + v, 0) === b.totalScore,
      ),
    matrix: z.object({
      x: z.number().min(0).max(10),
      y: z.number().min(0).max(10),
    }),
    validity: z.enum(["A", "B", "C"]),
    timestamp: z.string().min(1).max(80),
  }),
});
export function submissionHash(value: z.infer<typeof submissionSchema>) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}
