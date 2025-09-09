module.exports = {
  extends: ["plugin:prettier/recommended"],
  rules: {
    // 모든 객체 키에 항상 따옴표 사용
    "quote-props": ["error", "always"]
  },
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
  // bracketSameLine: false,

  // vueIndentScriptAndStyle: true,
}
