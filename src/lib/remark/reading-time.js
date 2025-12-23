
import visit from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

const WORDS_PER_MINUTE = 200;

export function remarkReadingTime() {
    /**
     * @param {import('unist').Node} tree
     * @param {{ data: { fm: Record<string, any> } }} file
     */
    return function (tree, file) {
        const textOnPage = toString(tree);
        const readingTime = Math.ceil(textOnPage.split(/\s+/).length / WORDS_PER_MINUTE);

        // Add reading time to frontmatter
        file.data.fm = {
            ...file.data.fm,
            readingTime,
        };
    };
}
