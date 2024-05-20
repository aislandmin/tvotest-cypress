const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://tvolearn.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // default viewport
  // viewportWidth: 1000, 
  // viewportHeight: 660, 
});
