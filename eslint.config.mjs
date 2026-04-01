import { environments, react, recommended } from "@zthun/janitor-eslint-config";

export default [
  ...recommended,
  ...react,
  {
    rules: {
      "@typescript-eslint/unbound-method": "off",
    },
  },
  ...environments.node,
  ...environments.browser,
];
