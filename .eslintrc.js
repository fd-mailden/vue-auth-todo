module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    strict: "off",
    "no-unused-vars": [0],
    "space-before-blocks": 1,
    "keyword-spacing": ["warn", { after: true }],
    "space-infix-ops": "warn",
    "key-spacing": ["warn", { afterColon: true }],
  },
};
