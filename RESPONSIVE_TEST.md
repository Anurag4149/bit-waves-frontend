# Responsive Design Testing Guide

## Quick Test Checklist

### Mobile (320px - 767px)
- [ ] Header: Logo visible, hamburger menu works
- [ ] Hero: Text readable, CTAs stack vertically
- [ ] Services: Cards stack in single column
- [ ] Contact Form: Full-width inputs, labels clear
- [ ] Footer: Links stack vertically
- [ ] All touch targets minimum 44px (buttons, links)

### Tablet (768px - 1023px)
- [ ] Header: Full navigation visible
- [ ] Hero: Good spacing, readable text
- [ ] Services: 2 columns grid
- [ ] Contact Form: 2-column layout begins
- [ ] Footer: Multi-column layout

### Desktop (1024px+)
- [ ] Header: Full navigation with CTAs
- [ ] Hero: Optimal spacing and typography
- [ ] Services: 3 columns grid
- [ ] Contact Form: 2-column with proper spacing
- [ ] Footer: 4-column layout

## Browser DevTools Testing

### Chrome/Edge DevTools
1. Open DevTools (F12 or Cmd+Option+I)
2. Click Device Toolbar icon (Cmd+Shift+M)
3. Test these viewports:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1280px)
4. Toggle device orientation
5. Test touch interactions

### Responsive Breakpoints
```
sm: 640px   - Small phones landscape
md: 768px   - Tablets portrait  
lg: 1024px  - Tablets landscape / Small laptops
xl: 1280px  - Desktop
2xl: 1536px - Large desktop
```

## Key Features Tested

✅ **Mobile Menu**: Hamburger icon, slide-out navigation, focus trap
✅ **Touch Targets**: All interactive elements ≥ 44px for accessibility
✅ **Text Scaling**: Responsive font sizes at all breakpoints
✅ **Grid Layouts**: Proper column collapse on mobile
✅ **Forms**: Full-width on mobile, multi-column on desktop
✅ **Images/Icons**: Proper sizing and aspect ratios
✅ **Spacing**: Consistent padding/margins across breakpoints
✅ **No Horizontal Scroll**: Content fits within viewport

## Manual Testing Steps

1. **Test Mobile First** (320px):
   ```bash
   npm run dev
   # Open http://localhost:5173
   # Resize browser to 320px width
   ```

2. **Navigate All Pages**:
   - Home → Services → About → Case Studies → Blog → Contact
   - Check layout, readability, and interactions

3. **Test Mobile Menu**:
   - Click hamburger icon
   - Verify menu slides in
   - Test all navigation links
   - Close menu with X or backdrop click

4. **Test Forms**:
   - Fill contact form on mobile
   - Verify input sizes are touch-friendly
   - Check validation messages display properly

5. **Test Orientation Changes**:
   - Rotate device (or toggle in DevTools)
   - Verify layout adapts smoothly

6. **Test Touch Gestures**:
   - Tap all buttons and links
   - Scroll vertically
   - Verify no accidental clicks

## Common Issues to Check

- [ ] Text too small on mobile (< 16px base)
- [ ] Touch targets too small (< 44px)
- [ ] Horizontal scrolling appears
- [ ] Content cut off at edges
- [ ] Overlapping elements
- [ ] Unreadable text on backgrounds
- [ ] Broken layouts at specific widths
- [ ] Mobile menu doesn't close properly
- [ ] Form inputs too narrow

## Accessibility Checks

- [ ] Keyboard navigation works at all sizes
- [ ] Focus indicators visible
- [ ] Skip links functional
- [ ] ARIA labels present
- [ ] Screen reader announcements work
- [ ] Color contrast meets WCAG AA (4.5:1)

## Performance on Mobile

- [ ] Page loads < 3s on 3G
- [ ] Animations respect prefers-reduced-motion
- [ ] Images optimized/lazy loaded
- [ ] No layout shift (CLS)
- [ ] Smooth scrolling

All responsive design requirements are implemented! ✅

