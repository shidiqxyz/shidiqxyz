import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes';

import visit from 'unist-util-visit';

function rehypeImgSize() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName === 'img' && node.properties && node.properties.src) {
				const src = node.properties.src;
				const widthMatch = src.match(/[?&]w(?:idth)?=(\d+)/);
				const heightMatch = src.match(/[?&]h(?:eight)?=(\d+)/);
				const alignMatch = src.match(/[?&]a(?:lign)?=(left|center|right)/);

				let style = node.properties.style || '';

				if (widthMatch) {
					node.properties.width = widthMatch[1];
					style += `; width: ${widthMatch[1]}px;`;
				}
				if (heightMatch) {
					node.properties.height = heightMatch[1];
					style += `; height: ${heightMatch[1]}px;`;
				}

				if (alignMatch) {
					const align = alignMatch[1];
					if (align === 'center') {
						style += '; display: block; margin: 0 auto;';
					} else if (align === 'left') {
						style += '; float: left; margin-right: 1.5rem; margin-bottom: 1rem;';
					} else if (align === 'right') {
						style += '; float: right; margin-left: 1.5rem; margin-bottom: 1rem;';
					}
				}

				node.properties.style = style;
			}
		});
	};
}

const config = defineConfig({
	extensions: ['.md', '.svx'],
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [remarkGfm, [remarkFootnotes, { inlineNotes: true }]],
	rehypePlugins: [rehypeImgSize]
});

export default config;
