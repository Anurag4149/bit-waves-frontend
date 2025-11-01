# 🧪 Testing Guide - IT Services Website MVP

## 🚀 Quick Start

**Development server is now running!**

Open your browser to: **http://localhost:5173**

---

## ✅ Test Checklist

### 1. **Navigation Testing** (5 minutes)

#### Desktop Navigation
- [ ] Click logo → returns to home page
- [ ] Click each nav link (Home, Services, About, Case Studies, Blog, Contact)
- [ ] Verify active page is highlighted in navigation
- [ ] Test "Get Started" CTA button in header
- [ ] Test keyboard navigation (Tab through links, Enter to activate)

#### Mobile Navigation (resize browser to <768px)
- [ ] Click hamburger menu icon
- [ ] Verify menu slides in from right
- [ ] Test all navigation links in mobile menu
- [ ] Close menu by clicking X icon
- [ ] Close menu by clicking outside (backdrop)
- [ ] Verify body scroll is prevented when menu is open

---

### 2. **Home Page Testing** (10 minutes)

#### Hero Section
- [ ] Verify hero text is readable and properly formatted
- [ ] Test "Get Started" CTA → should go to Contact page
- [ ] Test "Explore Services" CTA → should go to Services page
- [ ] Check statistics display (50+ Projects, 100% Satisfaction, 24/7 Support)
- [ ] Verify animations trigger on page load (if motion enabled)

#### Services Overview
- [ ] Verify 3 service cards display correctly
- [ ] Check icons load for each service (Server, Brain, Chart)
- [ ] Test hover effects on service cards (scale, shadow)
- [ ] Verify scroll animations trigger when section enters viewport
- [ ] Click "Discuss Your IT Needs" button → should go to Contact
- [ ] Click "View All Services" button → should go to Services page

---

### 3. **Services Page Testing** (10 minutes)

#### Page Header
- [ ] Verify hero banner displays with correct title
- [ ] Check text contrast and readability

#### Service Details (3 services)
- [ ] **IT Solutioning**: Verify full description, capabilities, use cases
- [ ] **AI Agent Development**: Verify full description, capabilities, use cases  
- [ ] **Data Visualization**: Verify full description, capabilities, use cases
- [ ] Check icon displays for each service
- [ ] Verify capabilities list has checkmark icons
- [ ] Verify use cases list has lightning icons
- [ ] Test CTA buttons for each service → should go to Contact

#### Bottom CTA
- [ ] Verify final CTA section displays
- [ ] Test "Get Started Today" button → should go to Contact

---

### 4. **Contact Page Testing** (15 minutes)

#### Form Validation
- [ ] Submit empty form → should show validation errors
- [ ] Enter invalid email → should show "Invalid email address"
- [ ] Enter name with <2 characters → should show error
- [ ] Enter message with <10 characters → should show error
- [ ] Test real-time validation (blur events)

#### Form Submission
**Note: EmailJS needs configuration to actually send emails**

- [ ] Fill all required fields correctly
- [ ] Click "Send Message"
- [ ] Verify submit button shows "Sending..." state
- [ ] Verify submit button is disabled during submission
- [ ] Check for success/error message
  - If EmailJS configured: Should show success message
  - If not configured: Should show configuration error message

#### Contact Information
- [ ] Verify email link is clickable (mailto:)
- [ ] Verify phone link is clickable (tel:)
- [ ] Verify address displays correctly
- [ ] Test social media links (LinkedIn, Twitter, GitHub)
- [ ] Verify business hours display

#### Map
- [ ] If configured: Map should display office location
- [ ] If not configured: Should show placeholder message
- [ ] Verify map is responsive

---

### 5. **Responsive Design Testing** (15 minutes)

#### Mobile (320px - 767px)
Resize browser or use Device Toolbar in DevTools:

- [ ] **320px (iPhone SE)**: All content fits, no horizontal scroll
- [ ] **375px (iPhone X)**: Proper spacing and readability
- [ ] **414px (iPhone Plus)**: Optimal layout

**Check:**
- [ ] Header: Logo + hamburger menu visible
- [ ] Hero: Text stacks vertically, buttons full-width
- [ ] Services: Cards stack in single column
- [ ] Contact Form: Full-width inputs
- [ ] Footer: Links stack vertically
- [ ] All touch targets are at least 44px (buttons, links)
- [ ] Text is readable (at least 16px)

#### Tablet (768px - 1023px)
- [ ] **768px (iPad)**: Proper 2-column layouts
- [ ] **820px (iPad Air)**: Good spacing

**Check:**
- [ ] Header: Full navigation appears
- [ ] Services: 2-column grid
- [ ] Contact: 2-column layout starts
- [ ] Footer: Multi-column layout

#### Desktop (1024px+)
- [ ] **1024px**: Proper 3-column layouts
- [ ] **1280px**: Optimal desktop experience
- [ ] **1920px**: Content centered, not too wide

**Check:**
- [ ] Header: Full nav with CTAs
- [ ] Services: 3-column grid
- [ ] Contact: 2-column layout with proper spacing
- [ ] Footer: 4-column layout
- [ ] No elements too stretched

---

### 6. **Accessibility Testing** (10 minutes)

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Verify focus indicators are visible (blue outline)
- [ ] Test Enter/Space to activate buttons and links
- [ ] Test Escape key to close mobile menu
- [ ] Verify tab order is logical (top to bottom, left to right)

#### Screen Reader Testing (Optional)
If you have a screen reader:
- [ ] Navigate through page structure
- [ ] Verify headings are properly announced
- [ ] Check button and link labels
- [ ] Verify form labels and error messages
- [ ] Test ARIA live regions for form submission

#### Color Contrast
- [ ] Text on white background is easily readable
- [ ] Text on colored backgrounds has sufficient contrast
- [ ] Links are distinguishable from regular text
- [ ] Form errors are clearly visible

#### Reduced Motion
Test with system preference for reduced motion:
- [ ] Animations should be minimal or disabled
- [ ] Content should still appear properly
- [ ] No jarring motion effects

---

### 7. **Performance Testing** (5 minutes)

#### Load Time
- [ ] Initial page load feels fast (<3 seconds)
- [ ] Page transitions are smooth
- [ ] No layout shift (CLS) during load

#### Animations
- [ ] Scroll animations trigger smoothly
- [ ] Hover effects are responsive
- [ ] No animation lag or jank
- [ ] Mobile menu opens/closes smoothly

#### Images/Assets
- [ ] Service icons load properly
- [ ] No broken images (check browser console for 404s)

---

### 8. **Browser Compatibility** (If Available)

Test in multiple browsers:
- [ ] Chrome (primary development browser)
- [ ] Firefox
- [ ] Safari (Mac only)
- [ ] Edge

**Check:**
- [ ] Layout appears correctly
- [ ] Animations work
- [ ] Forms function properly
- [ ] No console errors

---

## 🐛 Bug Reporting Template

If you find issues, note them in this format:

**Issue:** [Brief description]
**Page:** [Home/Services/Contact]
**Browser:** [Chrome/Firefox/Safari/Edge]
**Device:** [Desktop/Mobile/Tablet]
**Screen Size:** [e.g., 375px]
**Steps to Reproduce:**
1. Go to...
2. Click on...
3. See error...

**Expected:** [What should happen]
**Actual:** [What actually happened]
**Screenshot:** [If possible]

---

## 📝 Known Limitations (Expected)

These are expected and not bugs:

1. **About Us Page**: Shows placeholder ("Coming Soon")
2. **Case Studies Page**: Shows placeholder
3. **Blog Page**: Shows placeholder  
4. **Contact Form Email**: Requires EmailJS configuration
   - Without config: Shows error message
   - This is expected behavior
5. **Google Maps**: Requires embed URL configuration
   - Without config: Shows placeholder
   - This is expected behavior

---

## 🎯 Success Criteria

Your MVP is working correctly if:

✅ All navigation links work
✅ Pages render without errors
✅ Layout is responsive (mobile to desktop)
✅ Forms validate properly
✅ Animations are smooth
✅ No console errors (except EmailJS/Maps config warnings)
✅ Keyboard navigation works
✅ Touch targets are properly sized

---

## 💡 Next Steps After Testing

1. **Report any bugs** using the template above
2. **Share feedback** on design, UX, content
3. **Request changes** or enhancements
4. **Configure EmailJS** (if you want working contact form)
5. **Add Google Maps** (if you want map display)
6. **Deploy to production** when ready

---

## 🔧 Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

---

## 📞 Need Help?

If you encounter issues:

1. Check browser console for errors (F12 → Console tab)
2. Verify Node.js version (should be 18+ for best compatibility)
3. Try clearing browser cache (Cmd+Shift+R or Ctrl+Shift+R)
4. Restart dev server (Ctrl+C then `npm run dev`)

Happy testing! 🚀

