import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      // 카카오
      "/kauth": {
        target: "https://kauth.kakao.com/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/kauth/, ""),
        secure: false,
        ws: true,
      },
      // 로컬
      "/api": {
        target: "http://localhost:8000/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
      // 개발 서버
      "/talkingclass": {
        target: "http://talkingclass.iptime.org:9000/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/talkingclass/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
