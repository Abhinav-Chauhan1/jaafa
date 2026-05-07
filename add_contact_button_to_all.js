#!/usr/bin/env node
/**
 * Add Contact Us button to all pages that are missing it
 */

const fs = require('fs');

// Get all HTML files except template
const files = fs.readdirSync('.').filter(f => 
    f.endsWith('.html') && 
    f !== 'project-template.html'
);

console.log(`Checking ${files.length} HTML pages for Contact Us button...`);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Check if page has nav-cta section
    const hasNavCta = content.includes('<div class="nav-cta">');
    
    if (!hasNavCta) {
        console.log(`Adding Contact Us button to ${file}...`);
        
        // Find the closing </ul> of nav-links and add nav-cta after it
        const navLinksEnd = content.indexOf('</ul>', content.indexOf('class="nav-links"'));
        
        if (navLinksEnd !== -1) {
            // Find the position after </ul>
            const insertPos = navLinksEnd + 6; // length of '</ul>\n'
            
            // Insert the nav-cta section
            const navCtaHtml = `            <div class="nav-cta">
                <a href="index.html#contact" class="nav-cta-btn">Contact Us</a>
            </div>
`;
            
            content = content.slice(0, insertPos) + navCtaHtml + content.slice(insertPos);
            modified = true;
        }
    } else {
        // Check if it has the button with correct class
        if (content.includes('class="btn-primary"')) {
            console.log(`Updating button class in ${file}...`);
            content = content.replace(/class="btn-primary"/g, 'class="nav-cta-btn"');
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`  ✓ Fixed ${file}`);
    }
});

console.log('\nDone! All pages now have Contact Us button.');
