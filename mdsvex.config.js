import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes';

import visit from 'unist-util-visit';

// Custom plugin to add IDs to headings (replaces rehype-slug)
function rehypeAddHeadingIds() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
				// Get text content from the heading
				let text = '';
				visit(node, 'text', (textNode) => {
					text += textNode.value;
				});

				// Create slug from text (simple version)
				const slug = text
					.toLowerCase()
					.trim()
					.replace(/[^\w\s-]/g, '') // Remove special chars
					.replace(/\s+/g, '-')      // Replace spaces with hyphens
					.replace(/-+/g, '-');      // Replace multiple hyphens with single

				if (!node.properties) {
					node.properties = {};
				}
				node.properties.id = slug;
			}
		});
	};
}

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

// Custom plugin to open external links in new tab
function rehypeExternalLinks() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName === 'a' && node.properties && node.properties.href) {
				const href = node.properties.href;
				// Check if it's an external link (starts with http:// or https://)
				if (href.startsWith('http://') || href.startsWith('https://')) {
					node.properties.target = '_blank';
					node.properties.rel = 'noopener noreferrer';
				}
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
	rehypePlugins: [rehypeAddHeadingIds, rehypeImgSize, rehypeExternalLinks]
});

export default config;

