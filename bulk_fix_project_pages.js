#!/usr/bin/env node
/**
 * Bulk fix script for all project detail HTML pages
 * Fixes:
 * - Adds Cormorant Garamond font import
 * - Updates Lenis version from 1.0.33 to 1.0.42
 * - Adds defer to all script tags
 * - Adds mobile-nav.js script if missing
 */

const fs = require('fs');
const path = require('path');

// Get all HTML files in current directory
const files = fs.readdirSync('.').filter(f => 
    f.endsWith('.html') && 
    f !== 'index.html' && 
    f !== 'portfolio.html' &&
    f !== 'project-template.html' &&
    f !== 'catalog.html' &&
    f !== 'cottages.html' &&
    f !== 'townhouses.html' &&
    f !== 'settlements.html' &&
    f !== 'investing-spaces.html'
);

console.log(`Found ${files.length} project detail pages to fix`);

files.forEach(file => {
    console.log(`Processing ${file}...`);
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Fix 1: Add Cormorant Garamond if missing
    if (!content.includes('Cormorant+Garamond')) {
        content = content.replace(
            /href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^"]+"/,
            'href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;600;700&display=swap"'
        );
        modified = true;
    }

    // Fix 2: Update Lenis version
    if (content.includes('lenis@1.0.33')) {
        content = content.replace(/lenis@1\.0\.33/g, 'lenis@1.0.42');
        modified = true;
    }

    // Fix 3: Add defer to scripts without it
    content = content.replace(
        /<script src="https:\/\/unpkg\.com\/@studio-freight\/lenis@[^"]+"><\/script>/g,
        '<script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js" defer></script>'
    );
    content = content.replace(
        /<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/gsap\/3\.12\.2\/gsap\.min\.js"><\/script>/g,
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>'
    );
    content = content.replace(
        /<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/gsap\/3\.12\.2\/ScrollTrigger\.min\.js"><\/script>/g,
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" defer></script>'
    );
    content = content.replace(
        /<script src="project-detail\.js"><\/script>/g,
        '<script src="project-detail.js" defer></script>'
    );

    // Fix 4: Add mobile-nav.js if missing
    if (!content.includes('mobile-nav.js')) {
        content = content.replace(
            /<script src="project-detail\.js" defer><\/script>/,
            '<script src="project-detail.js" defer></script>\n    <script src="mobile-nav.js" defer></script>'
        );
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`  ✓ Fixed ${file}`);
    } else {
        console.log(`  - ${file} already up to date`);
    }
});

console.log('\nDone!');
