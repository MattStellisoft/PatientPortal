const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "v9gpb2",
  viewportWidth: 1400,
  viewportHeight: 1060,
  video: false,

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
