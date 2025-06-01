/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IMGBB_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
