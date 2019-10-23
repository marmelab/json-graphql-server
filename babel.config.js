module.exports = {
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current"
            },
            useBuiltIns: "entry"
          }
        ]
      ]
    },
    development: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false
          }
        ]
      ],
      plugins: ["add-module-exports", "@babel/plugin-external-helpers"]
    },
    production: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false
          }
        ]
      ],
      plugins: ["add-module-exports", "@babel/plugin-external-helpers"]
    }
  }
};
