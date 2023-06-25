import { defineConfig } from "umi";

export default defineConfig({
  hash: true,
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: "yarn",
  // request: {
  //   dataField: "",
  // },
  // request: {
  //   dataField: "",
  // },
  proxy: {
    "/api": {
      target: "https://echarts.apache.org",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
});
