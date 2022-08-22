import { defineConfig, UserConfig } from 'vitest/config'
import path from "path";

export default defineConfig({
  define: {
    TEST_EXPECTED_VUE_VERSION: 2
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["test/global-setup.ts"],
  },
}) as UserConfig