const fs = require('fs');
const path = require('path');

const CONFIG = {
    startDir: '.',
    outputDir: 'dist',
    excludes: ['node_modules', '.git', 'dist', 'deprecated', 'REFACTOR_REPORT.json', 'README.md', 'README_EDITING.md', 'CHANGES.md', 'assemble.js', 'package.json', 'package-lock.json', '.gemini']
};

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function processIncludes(content, filePath) {
    const includeRegex = /<!--\s*include:\s*([^\s]+)\s*-->/g;

    return content.replace(includeRegex, (match, includePath) => {
        try {
            // Resolve path relative to the current file
            const fullPath = path.resolve(path.dirname(filePath), includePath);

            if (fs.existsSync(fullPath)) {
                console.log(`  Included: ${includePath}`);
                return fs.readFileSync(fullPath, 'utf8');
            } else {
                console.error(`  [WARN] Include not found: ${fullPath} in ${filePath}`);
                return match; // Keep the comment if not found
            }
        } catch (err) {
            console.error(`  [ERROR] processing include ${includePath}: ${err.message}`);
            return match;
        }
    });
}

function scanAndBuild(currentDir, relativeDir = '') {
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
        if (CONFIG.excludes.some(ex => file.includes(ex))) continue;

        const fullPath = path.join(currentDir, file);
        const stat = fs.statSync(fullPath);
        const outputPath = path.join(CONFIG.outputDir, relativeDir, file);

        if (stat.isDirectory()) {
            ensureDir(outputPath);
            scanAndBuild(fullPath, path.join(relativeDir, file));
        } else {
            // Ensure output directory exists for files at root
            ensureDir(path.dirname(outputPath));

            if (file.endsWith('.html')) {
                console.log(`Processing ${relativeDir ? relativeDir + '/' : ''}${file}...`);
                let content = fs.readFileSync(fullPath, 'utf8');
                content = processIncludes(content, fullPath);
                fs.writeFileSync(outputPath, content);
            } else {
                // Copy assets/css/js as is
                // Note: ideally we might symlink images to save space, but copy is safer for "dist"
                fs.copyFileSync(fullPath, outputPath);
            }
        }
    }
}

// Start
console.log('Starting build...');
if (fs.existsSync(CONFIG.outputDir)) {
    console.log('Cleaning clean dist/ ...');
    fs.rmSync(CONFIG.outputDir, { recursive: true, force: true });
}
ensureDir(CONFIG.outputDir);

scanAndBuild(CONFIG.startDir);
console.log('Build complete! Check /dist directory.');
