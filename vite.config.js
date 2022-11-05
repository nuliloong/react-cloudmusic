import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/lib/${name}/style`,
        },
      ],
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@v": resolve(__dirname, "./src/view"),
      "@c": resolve(__dirname, "./src/components"),
      "@h": resolve(__dirname, "./src/hooks")
    }
  },
  // global css
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: {
        // 	"primary-color": "#1DA57A",
        // },
        javascriptEnabled: true,
        additionalData: `@import "@/styles/global.less";`
      }
    }
  },
})