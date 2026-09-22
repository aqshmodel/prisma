import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
const root = process.cwd();
export default defineConfig({
  root: path.join(root, "tests/admin-browser"),
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@/lib/firebase",
        replacement: path.join(root, "tests/admin-browser/firebase.ts"),
      },
      {
        find: "firebase/auth",
        replacement: path.join(root, "tests/admin-browser/auth.ts"),
      },
      {
        find: "next/navigation",
        replacement: path.join(root, "tests/admin-browser/navigation.ts"),
      },
      { find: "@", replacement: path.join(root, "src") },
    ],
  },
  server: { host: "127.0.0.1", port: 3004, fs: { allow: [root] } },
});
