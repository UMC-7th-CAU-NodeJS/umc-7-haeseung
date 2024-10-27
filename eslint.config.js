import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  module.exports = {
    rules: {
      'no-unused-vars': 'off', // 사용하지 않는 변수에 대한 오류를 비활성화
    },
  }
];