// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    // // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    // 'plugin:vue/essential',
    // // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    // 'standard',
    "eslint:recommended", // ESLint 기본 추천 규칙
    "plugin:vue/recommended", // Vue 추천 규칙
    "prettier" // Prettier 충돌 규칙 비활성화
  ],
  // required to lint *.vue files
  plugins: ["vue", "prettier"],
  // add your custom rules here
  rules: {
    "prettier/prettier": [
      "error",
      {
        // 문자열은 작은 따옴표를 사용
        singleQuote: false,

        // 코드 끝 세미콜론 제거
        semi: false,

        // 탭 대신 스페이스 사용
        useTabs: false,

        printWidth: 100,

        // 들여쓰기 공백 2칸
        tabWidth: 2,

        // 객체나 배열 끝 쉼표 사용 여부
        trailingComma: "none",

        // 함수 괄호 앞뒤 공백
        bracketSpacing: true

        // JSX 안에서 >를 다음 줄에 붙일지 여부
        // jsxBracketSameLine: false,
      }
    ],
    "no-console": "off", // console 사용 허용
    "no-debugger": "off" // debugger 사용 허용

    // allow async-await
    // 'generator-star-spacing': 'off',
    // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // "quote-props": ["error", "always"] // 모든 객체 키에 따옴표 강제
    // "quote-props": ["error", "as-needed"] // 필요한 경우에만 (Prettier 기본)
  }
}
