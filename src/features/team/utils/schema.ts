import { z } from 'zod';

// Zod schema for a single team member
export const teamMemberSchema = z.object({
  name: z.string().min(1, '名前を入力してください').max(30, '30文字以内で入力してください'),
  typeCode: z.string().length(4, '正しい16タイプを選択してください'),
  enneagram: z.string().optional(),
});

// Zod schema for the lead generation (corporate info)
export const leadInfoSchema = z.object({
  companyName: z.string().min(1, '会社名を入力してください').max(100, '100文字以内で入力してください'),
  contactName: z.string().min(1, '担当者名を入力してください').max(50, '50文字以内で入力してください'),
  phoneNumber: z.string().min(1, '電話番号を入力してください').regex(/^[0-9-]{10,15}$/, '正しい電話番号を入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  emailConfirm: z.string().email('確認用メールアドレスを入力してください'),
}).refine((data) => data.email === data.emailConfirm, {
  message: "メールアドレスが一致しません",
  path: ["emailConfirm"],
});

// Zod schema for the entire checkout form input
export const teamInputSchema = z.object({
  members: z.array(teamMemberSchema)
    .min(3, '最低3名以上のメンバーが必要です')
    .max(30, 'Webからの分析お申し込みは最大30名までです。31名以上の場合は別途お問い合わせください。'),
  leadInfo: leadInfoSchema,
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
export type LeadInfoInput = z.infer<typeof leadInfoSchema>;
export type TeamInputFormValues = z.infer<typeof teamInputSchema>;
