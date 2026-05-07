#!/usr/bin/env node
/**
 * Fix navbar consistency across all pages
 * - Remove duplicate "Contact" link from nav-links
 * - Keep only the "Contact Us" button in nav-cta
 */

const fs = require('fs');
const path = require('path');

// Get all HTML files
const files = fs.readdirSync('.').filter(f => 
    f.endsWith('.html') && 
    f !== 'project-template.html'
);

console.log(`Found ${files.length} HTML pages to check`);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Check if this page has the duplicate Contact link
    const hasContactLink = content.includes('<li><a href="index.html#contact">Contact</a></li>');
    const hasContactInList = content.includes('<li><a href="#contact">Contact</a></li>');
    
    if (hasContactLink) {
        console.log(`Fixing ${file}...`);
        // Remove the Contact link from nav-links
        content = content.replace(
            /\s*<li><a href="index\.html#contact">Contact<\/a><\/li>\n/g,
            ''
        );
        modified = true;
    }
    
    if (hasContactInList) {
        console.log(`Fixing ${file}...`);
        // Remove the Contact link from nav-links (homepage version)
        content = content.replace(
            /\s*<li><a href="#contact">Contact<\/a><\/li>\n/g,
            ''
        );
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`  ✓ Fixed ${file}`);
    }
});

console.log('\nDone! All pages now have consistent navbar.');
