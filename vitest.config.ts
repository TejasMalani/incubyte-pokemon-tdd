import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,               // use global test functions like describe, it
        environment: "jsdom",        // needed for React components
        setupFiles: "src/setupTests.ts", // optional, for setup like testing-library
        coverage: {
            provider: "v8",             // or "istanbul"
            reporter: ["text", "lcov"], // text in terminal + HTML report
            // all: true,                  // include all files, not just the ones imported in tests
            include: ["src/**/*.{ts,tsx}"],  // include your app code
            exclude: ["node_modules", "tests", "vitest.setup.ts"], // optional
        },
    },
});