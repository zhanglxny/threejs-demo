/// <reference types="vite/client" />

declare module '*.geojson' {
  const src: string
  export default src
}