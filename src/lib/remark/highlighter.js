
import { createHighlighter } from 'shiki';

/** @type {import('shiki').Highlighter} */
let highlighter;

/**
 * Singleton to get the highlighter instance
 */
async function getHighlighter() {
    if (!highlighter) {
        highlighter = await createHighlighter({
            themes: ['github-dark', 'github-light'],
            langs: ['javascript', 'typescript', 'svelte', 'html', 'css', 'json', 'bash', 'markdown', 'diff', 'solidity', 'python', 'yaml', 'sql', 'go', 'rust', 'java', 'c', 'cpp', 'latex', 'tex']
        });
    }
    return highlighter;
}

/**
 * Custom highlighter for mdsvex
 * @param {string} code
 * @param {string} [lang]
 */
export async function highlightCode(code, lang) {
    const h = await getHighlighter();
    const html = h.codeToHtml(code, {
        lang: lang || 'text',
        themes: {
            light: 'github-light',
            dark: 'github-dark'
        }
    });

    const title = (lang || 'text').toUpperCase();

    // Wrap the code block with a header
    const wrappedHtml = `
<div class="code-block-wrapper my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
    <div class="code-block-header px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <span class="text-xs font-mono font-medium text-gray-600 dark:text-gray-400 select-none">${title}</span>
    </div>
    <div class="code-block-content bg-[#fff] dark:bg-[#24292e]">
        ${html}
    </div>
</div>`;

    // Escape curly braces for Svelte
    return wrappedHtml.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
}
