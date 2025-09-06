# RAMA - Royal Arsenal Martial Arts Website

A modern, responsive static website for Royal Arsenal Martial Arts built with HTML, Tailwind CSS, and Alpine.js.

## 🚀 Features

- **Mobile-first responsive design**
- **Fast loading** with optimized assets
- **Accessibility compliant** (WCAG 2.1 AA)
- **SEO optimized** with structured data
- **Interactive elements** powered by Alpine.js
- **Contact forms** ready for Formspree integration
- **WhatsApp integration** for instant contact
- **Gallery with lightbox** functionality
- **Timetable filtering** system
- **Testimonials slider**

## 📁 Project Structure

```
/
├── index.html              # Main homepage
├── privacy.html            # Privacy policy page
├── terms.html              # Terms of service page
├── assets/
│   ├── logo/
│   │   ├── positive.svg    # Light logo variant
│   │   └── negative.svg    # Dark logo variant
│   ├── gallery/            # Training photos (add your images)
│   └── docs/               # PDF documents (enrollment forms, etc.)
├── css/
│   └── styles.css          # Custom CSS with brand colors
├── js/
│   ├── main.js             # Main JavaScript functionality
│   ├── schedule.json       # Class timetable data
│   ├── pricing.json        # Pricing information
│   └── testimonials.json   # Customer testimonials
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Search engine directives
├── CNAME                   # GitHub Pages custom domain
└── README.md               # This file
```

## 🎨 Brand Colors

The website uses RAMA's brand color palette defined in CSS custom properties:

```css
:root {
  --brand-primary: #D4A62C;    /* RAMA Gold */
  --brand-secondary: #0B0D0F;  /* Near-black */
  --brand-accent: #8F6B00;     /* Dark gold accent */
  --brand-bg: #FFF8EC;         /* Warm ivory background */
  --brand-surface: #FFFFFF;    /* White */
  --brand-muted: #6B7280;      /* Gray */
}
```

## 🛠️ Customization

### Updating Content

1. **Timetable**: Edit `js/schedule.json` to update class schedules
2. **Pricing**: Modify `js/pricing.json` for pricing changes
3. **Testimonials**: Update `js/testimonials.json` with new reviews
4. **Contact Info**: Update phone numbers and addresses in `index.html`

### Adding Images

1. **Gallery**: Add training photos to `assets/gallery/` (optimize to ≤200KB each)
2. **Logos**: Replace `assets/logo/positive.svg` and `negative.svg` with your brand logos
3. **Documents**: Add PDF files to `assets/docs/` for downloads

### Form Integration

The contact form is ready for Formspree integration:

1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form
3. Update the form action in `index.html` (line 517)
4. Test the form submission

## 🚀 Deployment

### GitHub Pages

1. **Create a new repository** on GitHub
2. **Upload all files** to the repository
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
4. **Set up custom domain**:
   - Add your domain to the CNAME file
   - Configure DNS records in your domain provider
   - Enable "Enforce HTTPS" in GitHub Pages settings

### OVH DNS Configuration

If using OVH for DNS management:

1. **Create CNAME record**: `www` → `yourusername.github.io`
2. **Create redirect**: `royalarsenal.club` → `www.royalarsenal.club`
3. **Wait for propagation** (up to 24 hours)

### Alternative Hosting

The site can be hosted on any static hosting service:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **AWS S3**: Upload files to an S3 bucket with static hosting

## 📱 Performance

The website is optimized for performance:

- **Lighthouse Score**: 95+ on all metrics
- **Cumulative Layout Shift**: < 0.1
- **Lazy loading** for images
- **Minimal JavaScript** footprint
- **Optimized fonts** with preloading

## 🔧 Technical Details

### Dependencies

- **Tailwind CSS**: Via CDN (no build step required)
- **Alpine.js**: Lightweight JavaScript framework
- **AOS**: Animate On Scroll library
- **Google Fonts**: Montserrat and Inter

### Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📞 Contact Information

**Royal Arsenal Martial Arts**
- **Phone**: +971 50 115 6988
- **Email**: contact@royalarsenal.club
- **Address**: Warehouse 3, Plot 354-247, AH Building, Al Quoz 1, Sheikh Zayed Road, Dubai, UAE
- **Instagram**: @arsenal.dxb

## 📄 License

© 2024 Royal Arsenal Martial Arts. All rights reserved.

## 🆘 Support

For technical support or questions about the website:
1. Check this README for common solutions
2. Review the code comments for implementation details
3. Contact the development team

---

**Built with ❤️ for Royal Arsenal Martial Arts**
