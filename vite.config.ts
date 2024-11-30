import fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import path from "path";

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./certs/rootCA-key.pem"), //No es necesario especificarlo explicitamnete, el plugin lo hace por ti
      cert: fs.readFileSync("./certs/rootCA.pem"), //No es necesario especificarlo explicitamnete, el plugin lo hace por ti
    },
  },
  plugins: [
    react(),
    mkcert({
      savePath: "./certs",
      force: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
