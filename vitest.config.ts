import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // 実際のテスト追加時に削除する
    passWithNoTests: true,
  },
});
