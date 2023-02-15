import { fileURLToPath, URL } from 'url';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'svelte-yt': fileURLToPath(new URL('./src/lib', import.meta.url))
		}
	}
};

export default config;
