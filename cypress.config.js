const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://tvolearn.com/',
    numTestsKeptInMemory: 5,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
});
