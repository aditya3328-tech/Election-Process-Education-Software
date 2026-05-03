import fs from 'fs';
import path from 'path';

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Remove framer-motion imports
            content = content.replace(/import\s+{([^}]+)}\s+from\s+['"]framer-motion['"];?\n?/g, (match, p1) => {
                if (p1.includes('AnimatePresence')) {
                    // It might be used as a wrapper, we will just remove the import
                }
                return '';
            });
            content = content.replace(/import\s+motion\s+from\s+['"]framer-motion['"];?\n?/g, '');
            
            // Replace <motion.div> with <div>, <motion.h1> with <h1>, etc.
            content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
            content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');
            
            // Remove AnimatePresence wrapper
            content = content.replace(/<AnimatePresence[^>]*>/g, '<>');
            content = content.replace(/<\/AnimatePresence>/g, '</>');
            
            // Remove animation props
            content = content.replace(/\s+(initial|animate|exit|transition|whileHover|whileTap|whileInView|viewport|variants|custom)=\{(?:[^{}]*|\{[^{}]*\})\}/g, '');
            content = content.replace(/\s+(initial|animate|exit|transition|whileHover|whileTap|whileInView|viewport|variants|custom)="[^"]*"/g, '');
            
            // Some nested braces might not be caught by the simple regex above
            // Let's do a slightly better regex for simple ones
            content = content.replace(/\s+(initial|animate|exit|transition|whileHover|whileTap|whileInView|viewport|variants|custom)=\{.*?\}/gs, (match) => {
                // simple heuristic: if it contains a tag < or a return, don't touch
                if (match.includes('<') && !match.includes('=>')) return match;
                // try to balance braces
                let braces = 0;
                let end = -1;
                for (let i = 0; i < match.length; i++) {
                    if (match[i] === '{') braces++;
                    if (match[i] === '}') {
                        braces--;
                        if (braces === 0) {
                            end = i;
                            break;
                        }
                    }
                }
                if (end !== -1) {
                    return match.substring(end + 1);
                }
                return '';
            });

            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

processDir('./frontend/src');
console.log('Done removing animations');
