import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkGfm from 'remark-gfm';

const config = defineConfig({
	extensions: ['.md', '.svx'],
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [remarkGfm],
	rehypePlugins: []
});

export default config;
