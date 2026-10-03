const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const appDir = path.join(projectRoot, 'app');
const srcDir = path.join(projectRoot, 'src');
const pagesDir = path.join(srcDir, 'pages');

// Create src/pages
if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });
if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath, callback);
        } else {
            callback(fullPath);
        }
    }
}

// 1. Move folders
const dirsToMove = ['components', 'hooks', 'lib'];
for (const dirName of dirsToMove) {
    const srcPath = path.join(projectRoot, dirName);
    const destPath = path.join(srcDir, dirName);
    if (fs.existsSync(srcPath)) {
        fs.renameSync(srcPath, destPath);
    }
}

// 2. Process app directory
walkDir(appDir, (filePath) => {
    if (filePath.endsWith('layout.tsx') || filePath.endsWith('layout.ts')) return; // Ignore layout files
    if (filePath.endsWith('globals.css')) {
        // Move globals.css to src
        fs.copyFileSync(filePath, path.join(srcDir, 'globals.css'));
        return;
    }
    
    // Move pages
    let destPath = filePath.replace(appDir, pagesDir);
    if (filePath.endsWith('page.tsx')) {
        // e.g. app/page.tsx -> src/pages/home/page.tsx or we just name it index.tsx
        const isRootPage = filePath === path.join(appDir, 'page.tsx');
        if (isRootPage) {
            destPath = path.join(pagesDir, 'Home.tsx');
        } else {
            const dirName = path.basename(path.dirname(filePath));
            const ComponentName = dirName.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
            destPath = path.join(pagesDir, `${ComponentName}.tsx`);
        }
    }
    
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(filePath, destPath);
});

// 3. Process all TSX/TS files to fix imports and next-specific features
walkDir(srcDir, (filePath) => {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove "use client";
    content = content.replace(/['"]use client['"];?\n?/g, '');
    
    // Fix @ imports
    content = content.replace(/@\//g, '@/'); // If using Vite path aliases, this is fine
    
    // Replace next/link with react-router-dom Link
    content = content.replace(/import\s+(?:{\s*Link\s*}|\w+\s+as\s+Link)\s+from\s+['"]next\/link['"]/g, "import { Link } from 'react-router-dom'");
    content = content.replace(/<Link\s+href=/g, "<Link to=");
    
    // Replace next/image with standard img
    content = content.replace(/import\s+Image\s+from\s+['"]next\/image['"]/g, "");
    content = content.replace(/<Image([^>]+)\/>/g, (match, p1) => {
        let attrs = p1.replace(/priority/g, '').replace(/fill/g, 'style={{width: "100%", height: "100%"}}');
        return `<img${attrs}/>`;
    });
    
    // Replace next/navigation hooks
    content = content.replace(/import\s+{([^}]+)}\s+from\s+['"]next\/navigation['"]/g, (match, p1) => {
        const hooks = p1.split(',').map(h => h.trim());
        const mapped = [];
        if (hooks.includes('useRouter')) mapped.push('useNavigate');
        if (hooks.includes('usePathname')) mapped.push('useLocation');
        if (hooks.includes('useSearchParams')) mapped.push('useSearchParams'); // React Router has this too
        if (mapped.length > 0) return `import { ${mapped.join(', ')} } from 'react-router-dom'`;
        return '';
    });
    
    // Replace hook usages
    content = content.replace(/const\s+(\w+)\s*=\s*useRouter\(\)/g, "const $1 = useNavigate()");
    content = content.replace(/const\s+(\w+)\s*=\s*usePathname\(\)/g, "const $1 = useLocation().pathname");
    content = content.replace(/(\w+)\.push\(/g, "$1("); // router.push -> navigate(
    
    // Replace next/font/google
    content = content.replace(/import\s+{([^}]+)}\s+from\s+['"]@next\/font\/google['"].*?\n/g, '');
    // Remove font instantiations
    content = content.replace(/const\s+\w+\s*=\s*\w+\(\{[^}]+\}\);?\n/g, '');

    fs.writeFileSync(filePath, content);
});

// Delete old app folder
fs.rmSync(appDir, { recursive: true, force: true });
// Delete next.config.js and next-env.d.ts
if (fs.existsSync(path.join(projectRoot, 'next.config.js'))) fs.rmSync(path.join(projectRoot, 'next.config.js'));
if (fs.existsSync(path.join(projectRoot, 'next-env.d.ts'))) fs.rmSync(path.join(projectRoot, 'next-env.d.ts'));

console.log("Migration script complete");
