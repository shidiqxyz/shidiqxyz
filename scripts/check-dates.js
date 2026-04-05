import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.resolve(__dirname, '../src/content');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

walk(contentDir, (filePath) => {
    if (filePath.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const hasDate = content.match(/date:\s*["']?([^"'\n]+)["']?/);
        const hasTitle = content.match(/title:\s*["']?([^"'\n]+)["']?/);
        
        if (!hasDate) {
            console.log(`MISSING DATE: ${filePath}`);
        } else {
            const dateStr = hasDate[1];
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                console.log(`INVALID DATE: ${dateStr} in ${filePath}`);
            }
        }
        
        if (!hasTitle) {
            console.log(`MISSING TITLE: ${filePath}`);
        }
    }
});
