import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // 브라우저 환경 흉내
    setupFiles: "./src/setupTests.js",
    globals: true, // expect, vi 등 전역 사용
    coverage: { reporter: ["text", "html"] }, // 선택
  },
});
