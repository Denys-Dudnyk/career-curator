declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<unknown, object, Record<string, unknown>>
  export default component
}
