# Beijing Huoli Website - Quick Reference Guide

## 🎯 Quick Updates

### Update Company Information

**Email Address**
Search for these in all .html files and update:
- `hanjunrui@bjhuoli.com` - Business inquiries
- `support@bjhuoli.com` - Technical support
- `dpo@bjhuoli.com` - Data protection officer (privacy.html)

**Phone Number**
Add phone number to contact.html contact-info-item section

**Address**
Update everywhere:
```
No. 206-052, No. 7 Juyuan West Road
Mapo Town, Shunyi District
Beijing, 100000, China
```

**Website URL**
- Update `https://bjhuoli.com` throughout all pages
- Update in robots.txt
- Update in sitemap.xml
- Update canonical tags

---

## 🖼️ Add/Update SVG Graphics

### Replace Logo
1. Create new logo SVG
2. Save to `svg/logo.svg` or update `svg/favicon.svg`
3. Update logo references in navbar:
```html
<svg class="logo" viewBox="0 0 100 40" width="140" height="56">
    <!-- Update SVG content -->
</svg>
```

### Add New Icons
Create in `svg/` folder and reference in HTML:
```html
<svg viewBox="0 0 100 100" class="icon-name">
    <!-- SVG content -->
</svg>
```

---

## ✏️ Update Page Content

### Home Page (index.html)
- **Hero Section**: Update heading and description
- **Highlights**: Edit card titles and descriptions
- **Services**: Modify service descriptions
- **Monetization**: Update monetization strategies

### Services Page (business.html)
- **Service Details**: Edit descriptions and features
- **Monetization Strategies**: Add/remove/update strategies
- **Technology Stack**: Update tech categories

### Team Page (team.html)
- **Team Overview**: Update overview text
- **Centers**: Modify center descriptions and specialties
- **Expertise Areas**: Update statistics (15+, 50+, etc.)
- **Competencies**: Add/remove competency areas

### Contact Page (contact.html)
- **Contact Form**: Update fields if needed
- **Contact Information**: Update all contact details
- **FAQ**: Add/update FAQ items

---

## 🎨 Customize Colors

Edit in `css/styles.css` (`:root` section):
```css
:root {
    --primary-color: #1a73e8;        /* Main blue */
    --primary-dark: #1557b0;         /* Hover state */
    --primary-light: #4285f4;        /* Light blue */
    --accent-green: #34a853;         /* Green accent */
    --accent-yellow: #fbbc04;        /* Yellow accent */
    --accent-red: #ea4335;           /* Red accent */
    --gray-900: #1f1f1f;             /* Dark gray */
    --gray-700: #5f6368;             /* Medium gray */
    /* ... other colors ... */
}
```

---

## 📱 Responsive Breakpoints

Key breakpoints in CSS:
```css
@media (max-width: 768px) {
    /* Tablet and mobile adjustments */
}
```

Test on:
- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px+

---

## 🔗 Update Navigation Links

Edit in navbar and footer:
```html
<ul class="nav-menu">
    <li><a href="index.html">Home</a></li>
    <li><a href="business.html">Services</a></li>
    <li><a href="team.html">Team</a></li>
    <li><a href="contact.html">Contact</a></li>
</ul>
```

---

## 📝 Add New Page

1. Create new HTML file (e.g., `blog.html`)
2. Copy structure from existing page
3. Update meta tags and title
4. Add to navigation in all files:
```html
<li><a href="blog.html">Blog</a></li>
```
5. Add footer links if needed

---

## 🔐 Update Privacy Policy & Terms

### Privacy Policy (privacy.html)
Sections to update:
- 4.1 GDPR compliance
- 4.2 CCPA compliance
- 4.3 PIPL compliance
- 5 Developer Policy Compliance
- 6 Monetization Platform Compliance

### Terms of Service (terms.html)
Sections to update:
- Company information
- Service descriptions
- Payment terms
- Jurisdiction and governing law

---

## 📊 SEO Updates

### Update Sitemap (sitemap.xml)
```xml
<url>
    <loc>https://bjhuoli.com/newpage.html</loc>
    <lastmod>2026-04-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
</url>
```

### Update robots.txt
```
Disallow: /admin/
Disallow: /private/
Allow: /
```

### Update Meta Tags
Add to new pages:
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
```

---

## 🎯 Form Handling

### Contact Form Configuration

Update `js/main.js` to send to your backend:
```javascript
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    if (result.success) {
        showFormMessage('Success!', 'success');
    }
});
```

Or use Formspree:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

---

## 🎬 Add Animation

Add fade-in class to elements:
```html
<div class="service-item fade-in">
    <!-- Content -->
</div>
```

Existing animations:
- `.fade-in` - Fade in effect
- `.float` - Floating animation (hero icon)

---

## 📱 Mobile Menu

Mobile menu is automatic at 768px breakpoint. To adjust:
```css
@media (max-width: 768px) {  /* Change 768px to your breakpoint */
    .hamburger { display: flex; }
    /* ... other mobile styles ... */
}
```

---

## 🔧 JavaScript Functions

### Useful Functions in main.js

**Show Message**
```javascript
showFormMessage('Your message here', 'success');  // or 'error'
```

**Update Meta Tags**
```javascript
updateMetaTags('New Title', 'New description');
```

**Track Analytics**
```javascript
trackPageView();  // Already called on page load
```

---

## 🎓 CSS Class Reference

### Layout Classes
- `.container` - Max-width 1200px, centered
- `.section` - Full-width section

### Component Classes
- `.btn-primary` - Blue primary button
- `.btn-secondary` - Outlined button
- `.card` - Card component

### Visibility
- `.fade-in` - Fade in animation
- `.active` - Active state

### Responsive
- Automatically handled via media queries

---

## 🐛 Common Issues & Solutions

### Issue: Form Not Sending
**Solution**: 
1. Check endpoint URL in js/main.js
2. Verify server is receiving POST requests
3. Check browser console for errors

### Issue: Styles Not Loading
**Solution**:
1. Check CSS file path is correct
2. Clear browser cache (Ctrl+Shift+Del)
3. Verify .htaccess MIME types

### Issue: Menu Not Responsive
**Solution**:
1. Check viewport meta tag exists
2. Verify CSS media queries
3. Check JavaScript is loading

### Issue: SVGs Not Displaying
**Solution**:
1. Verify viewBox attribute
2. Check SVG syntax
3. Verify file paths

---

## 📈 Performance Checklist

- [ ] Images optimized
- [ ] CSS minified
- [ ] JavaScript minified
- [ ] GZIP enabled
- [ ] Caching configured
- [ ] CDN in use
- [ ] Lazy loading implemented
- [ ] Critical CSS inline

---

## 🔄 Version Control (Git)

Initialize Git repository:
```bash
git init
git add .
git commit -m "Initial commit: Beijing Huoli website"
```

Common commands:
```bash
git status              # Check changes
git add .               # Stage all files
git commit -m "..."     # Commit with message
git push origin main    # Push to remote
```

---

## 📞 Contact & Support

**For Updates:**
- Email: support@bjhuoli.com
- Business: hanjunrui@bjhuoli.com

**Website:**
- https://bjhuoli.com

---

## 📚 Additional Resources

- HTML5 Reference: https://www.w3schools.com/html/
- CSS Reference: https://www.w3schools.com/css/
- JavaScript Reference: https://www.w3schools.com/js/
- SVG Reference: https://www.w3schools.com/graphics/svg_intro.asp

---

**Quick Reference Version**: 1.0
**Last Updated**: April 3, 2026
