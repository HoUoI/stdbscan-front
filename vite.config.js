import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import VitePlugin from 'vite-plugin-windicss';
export default defineConfig({
	// build: {
	// 	rollupOptions: {
	// 	  external: ['wavesurfer.js/dist/wavesurfer.css'],
	// 	},
	//   },
  plugins: [
	  vue(),
	  // VitePlugin(),
  ],
})
