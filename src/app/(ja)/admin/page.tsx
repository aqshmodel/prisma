import { Suspense } from "react";
import type { Metadata } from "next";
import { AdminPage } from "@/features/admin/AdminPage";

export const metadata: Metadata = {
  title: "Prisma Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <Suspense fallback={<p className="p-8">読み込み中…</p>}>
      <AdminPage />
    </Suspense>
  );
}
