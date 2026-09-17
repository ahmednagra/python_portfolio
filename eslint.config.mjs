import nextConfig from "eslint-config-next";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      ".tmp_profile_readme/**",
      ".tmp_profile_readme2/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  {
    files: ["tests/**/*.{ts,tsx}"],
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  },
];

export default eslintConfig;
