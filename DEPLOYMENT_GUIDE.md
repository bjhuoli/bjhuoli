# Beijing Huoli Website - Deployment & Configuration Guide

## 🚀 Deployment Instructions

### Step 1: Choose Hosting Provider
Recommended hosts with .htaccess support:
- Bluehost
- SiteGround  
- HostGator
- DreamHost
- NameCheap
- GoDaddy

For cloud hosting:
- AWS (CloudFront + S3)
- Google Cloud (Cloud Storage + CDN)
- Azure (App Service + CDN)
- Digital Ocean (App Platform)

### Step 2: Configure Domain & SSL

1. **Point Domain to Server**
   ```
   A Record: bjhuoli.com -> Server IP
   CNAME: www -> bjhuoli.com
   ```

2. **Install SSL Certificate**
   - Use Let's Encrypt (free)
   - Or purchase from: Comodo, DigiCert, GoDaddy
   - Force HTTPS redirect via .htaccess (included)

### Step 3: Upload Files

1. Connect via SFTP/FTP:
   ```
   Host: bjhuoli.com
   Username: [Your FTP username]
   Password: [Your FTP password]
   ```

2. Upload to public_html or www directory:
   - All HTML files
   - css/ folder
   - js/ folder
   - svg/ folder
   - .htaccess
   - robots.txt
   - sitemap.xml
   - README.md

### Step 4: Configure .htaccess

The included .htaccess provides:
- GZIP compression
- Browser caching
- Security headers
- MIME type configuration
- Directory listing disabled

Ensure .htaccess permissions:
```
chmod 644 .htaccess
```

### Step 5: Test Configuration

1. **Check HTTPS**
   - Visit https://bjhuoli.com
   - Verify SSL certificate is valid

2. **Test Compression**
   ```bash
   curl -I -H "Accept-Encoding: gzip" https://bjhuoli.com
   ```

3. **Check Sitemap**
   - Visit https://bjhuoli.com/sitemap.xml

4. **Verify robots.txt**
   - Visit https://bjhuoli.com/robots.txt

## 📧 Contact Form Setup

### Option 1: Using Formspree (Easiest)
1. Go to https://formspree.io/
2. Sign up and create a new form
3. Update form action in contact.html:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 2: Using Netlify Forms
1. Deploy on Netlify
2. Add form submission handling automatically
3. Access submissions in Netlify dashboard

### Option 3: Custom Backend (Node.js Example)

Create `backend/contact.js`:
```javascript
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  const { name, email, message, subject } = JSON.parse(event.body);
  
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'support@bjhuoli.com',
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
```

Update `js/main.js` form handler to point to your endpoint.

### Option 4: Using AWS SES + Lambda

Configure Lambda function for email handling with AWS SES.

## 🔍 SEO Configuration

### 1. Submit to Search Engines

**Google Search Console**
1. Go to https://search.google.com/search-console
2. Add property: bjhuoli.com
3. Upload sitemap.xml
4. Monitor indexation status

**Bing Webmaster Tools**
1. Go to https://www.bing.com/webmasters
2. Add site: bjhuoli.com
3. Upload sitemap.xml

### 2. Structured Data

Add JSON-LD schema in pages:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Beijing Huoli",
  "url": "https://bjhuoli.com",
  "email": "support@bjhuoli.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No. 206-052, No. 7 Juyuan West Road",
    "addressLocality": "Beijing",
    "postalCode": "100000",
    "addressCountry": "CN"
  }
}
</script>
```

### 3. Open Graph for Social Sharing

Already included in all pages. Update image URLs if needed:
```html
<meta property="og:image" content="https://bjhuoli.com/svg/logo.svg">
```

## 📊 Analytics Setup

### Google Analytics 4

Add to all pages in `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Conversion Tracking

Track form submissions:
```javascript
// Add after successful form submission
gtag('event', 'form_submission', {
  'form_name': 'contact_form',
  'submission_date': new Date().toISOString()
});
```

## 🔐 Security Configuration

### 1. HTTPS/SSL
- Install certificate from Let's Encrypt or commercial provider
- Configure automatic renewal
- Force HTTPS:
```apache
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 2. WAF (Web Application Firewall)
- Use Cloudflare (free tier available)
- AWS WAF
- Imperva
- ModSecurity (open source)

### 3. DDoS Protection
- Cloudflare DDoS protection
- AWS Shield
- Akamai

### 4. Backup Strategy
- Daily backups to cloud storage
- Off-site backup copies
- Test restore procedure monthly

## 📱 Mobile Optimization

Already implemented:
- Responsive design ✅
- Mobile-first CSS ✅
- Touch-friendly buttons ✅
- Fast loading ✅

To further optimize:
1. Add favicon to all pages
2. Add app manifest for PWA
3. Implement service worker for offline support

## ⚡ Performance Tuning

### Current Optimizations
- GZIP compression configured
- Browser caching enabled
- SVG graphics (no raster images)

### Further Improvements
1. **Minification**
   ```bash
   # CSS minification
   cleancss -o css/styles.min.css css/styles.css
   
   # JavaScript minification
   uglifyjs js/main.js -o js/main.min.js
   ```

2. **Update HTML to use minified versions**
   ```html
   <link rel="stylesheet" href="css/styles.min.css">
   <script src="js/main.min.js"></script>
   ```

3. **CDN Configuration**
   - Use Cloudflare CDN (free)
   - Configure cache rules
   - Enable image optimization

4. **HTTP/2 Push**
   ```apache
   <FilesMatch "\.(html)$">
     Header add Link "</css/styles.css>; rel=preload; as=style"
     Header add Link "</js/main.js>; rel=preload; as=script"
   </FilesMatch>
   ```

## 🗠️ Monitoring & Alerts

### Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- StatusCake
- New Relic

### Error Tracking
- Sentry (application errors)
- Rollbar
- Loggly

### Performance Monitoring
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- DataBox

## 📈 Maintenance Schedule

### Weekly
- Check analytics
- Monitor search rankings
- Review error logs

### Monthly
- Update content  
- Check SSL certificate status
- Review security logs
- Test contact form

### Quarterly
- Update privacy policy if needed
- Review and optimize underperforming pages
- Check competitor activity
- Update team information

### Annually
- Full security audit
- Renew SSL certificate
- Update all dependencies
- Review and update terms of service

## 🎯 Post-Launch Checklist

- [ ] Domain registered and configured
- [ ] SSL certificate installed
- [ ] DNS propagated
- [ ] All pages accessible
- [ ] Forms working
- [ ] Analytics tracking
- [ ] Sitemap submitted
- [ ] robots.txt in place
- [ ] Social media links updated
- [ ] Email tested
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Performance optimized
- [ ] SEO verified
- [ ] Mobile testing complete

## 📞 Emergency Procedures

### Website Down
1. Check server status
2. Check DNS propagation
3. Verify SSL certificate
4. Check .htaccess syntax
5. Contact hosting provider

### Form Not Working
1. Check email configuration
2. Verify backend endpoint
3. Check console for errors
4. Test email delivery

### High Server Load
1. Enable caching
2. Check for malicious traffic
3. Use CDN
4. Optimize database queries
5. Scale resources

### Security Breach
1. Take site offline if necessary
2. Restore from backup
3. Change all passwords
4. Review access logs
5. Update security measures
6. Notify users if needed

---

**Configuration Version**: 1.0
**Last Updated**: April 3, 2026
