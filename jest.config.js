module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',

// Only run Jest test files
  testMatch: [
    "**/*.test.ts"
  ],

   reporters: [
    "default",
    ["jest-html-reporters", {
      publicPath: "./html-report",
      filename: "report.html"
    }]
  ]
};