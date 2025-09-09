// src/types/vue-styled-components.d.ts
declare module "vue-styled-components" {
  import { Component } from "vue"
  type StyledComponent = Component<any, any, any, any>

  export default function styled(
    element: string | Component,
    props?: Record<string, any>
  ): (style: TemplateStringsArray, ...args: any[]) => StyledComponent
}
