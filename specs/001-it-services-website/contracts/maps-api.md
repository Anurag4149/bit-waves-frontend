# Maps API Contract

**Service**: Google Maps Embed API  
**Purpose**: Display interactive map showing office location on contact page  
**Requirement**: FR-012 (Display an interactive map showing the office location)

---

## Service Selection

**Recommended**: Google Maps Embed API

**Alternatives**:
- Google Maps JavaScript API (requires API key + billing)
- Mapbox
- OpenStreetMap with Leaflet
- Static image map

**Decision Rationale**: Embed API selected for simplicity (no API key required), zero cost, and familiar Google Maps interface that users trust.

---

## API Specification

### Embed URL Format

```
https://www.google.com/maps/embed/v1/place
  ?key=API_KEY (optional for basic embed)
  &q=place_id:PLACE_ID
  &zoom=15
  &maptype=roadmap
```

### iframe Integration

**Basic Embed (No API Key)**:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
  width="600"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Office Location"
></iframe>
```

**With API Key (Advanced Features)**:
```html
<iframe
  src="https://www.google.com/maps/embed/v1/place?key=API_KEY&q=place_id:ChIJ...&zoom=15"
  width="600"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="Office Location"
></iframe>
```

---

## Implementation

### React Component

```typescript
// src/components/sections/MapEmbed.tsx
interface MapEmbedProps {
  placeId?: string;
  embedUrl: string;
  width?: string;
  height?: string;
  zoom?: number;
  className?: string;
}

export function MapEmbed({
  embedUrl,
  width = '100%',
  height = '450',
  className = '',
}: MapEmbedProps) {
  return (
    <div className={`map-container ${className}`}>
      <iframe
        src={embedUrl}
        width={width}
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Company Office Location"
        aria-label="Interactive map showing company office location"
      />
    </div>
  );
}
```

### Usage in Contact Page

```typescript
// src/pages/Contact/Contact.tsx
import { MapEmbed } from '@/components/sections/MapEmbed';

const OFFICE_MAP_URL = import.meta.env.VITE_OFFICE_MAP_EMBED_URL;

export function ContactPage() {
  return (
    <div>
      {/* Contact form */}
      
      <section className="office-location">
        <h2>Visit Our Office</h2>
        <MapEmbed embedUrl={OFFICE_MAP_URL} height="400" />
        
        <address>
          <p>123 Business Street</p>
          <p>Tech City, TC 12345</p>
          <p>United States</p>
        </address>
      </section>
    </div>
  );
}
```

---

## Configuration

### Getting Embed URL

1. **Go to Google Maps** (https://www.google.com/maps)
2. **Search for office address**
3. **Click "Share" button**
4. **Select "Embed a map" tab**
5. **Choose map size** (Small, Medium, Large, Custom)
6. **Copy iframe code**
7. **Extract `src` attribute value** → This is your embed URL

Example URL:
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.123!2d-73.987!3d40.748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ0JzUyLjYiTiA3M8KwNTknMTEuMiJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus
```

### Environment Variables

```bash
# .env.local
VITE_OFFICE_MAP_EMBED_URL=https://www.google.com/maps/embed?pb=...

# Optional: If using API key
VITE_GOOGLE_MAPS_API_KEY=AIza...
```

```bash
# .env.example
VITE_OFFICE_MAP_EMBED_URL=your_google_maps_embed_url_here
```

---

## Responsive Design

### Responsive Container

```typescript
// src/components/sections/MapEmbed.tsx (enhanced)
export function MapEmbed({ embedUrl }: MapEmbedProps) {
  return (
    <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 aspect ratio */}
      <iframe
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Company Office Location"
        aria-label="Interactive map showing company office location"
      />
    </div>
  );
}
```

### Breakpoint Adjustments

```css
/* Tailwind classes or custom CSS */
.map-container {
  @apply w-full;
}

/* Mobile */
@media (max-width: 640px) {
  .map-container iframe {
    height: 300px;
  }
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  .map-container iframe {
    height: 400px;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .map-container iframe {
    height: 450px;
  }
}
```

---

## Accessibility (FR-036, FR-042)

### ARIA Attributes

```html
<iframe
  src="..."
  title="Company Office Location"
  aria-label="Interactive map showing company office location at 123 Business Street, Tech City"
  role="region"
  ...
/>
```

### Skip Link for Keyboard Users

```tsx
// src/pages/Contact/Contact.tsx
export function ContactPage() {
  return (
    <div>
      {/* Skip link for keyboard users */}
      <a href="#office-address" className="sr-only focus:not-sr-only">
        Skip map to office address
      </a>

      <MapEmbed embedUrl={OFFICE_MAP_URL} />

      <address id="office-address">
        {/* Address text */}
      </address>
    </div>
  );
}
```

### Alternative Text Content

Always provide text address alongside map:

```tsx
<section>
  <h2>Visit Our Office</h2>
  
  <div className="grid md:grid-cols-2 gap-8">
    {/* Map */}
    <div>
      <MapEmbed embedUrl={OFFICE_MAP_URL} />
    </div>

    {/* Text Address (accessible alternative) */}
    <div>
      <h3 className="sr-only">Office Address</h3>
      <address className="not-italic">
        <p className="font-semibold">Company Name</p>
        <p>123 Business Street</p>
        <p>Suite 456</p>
        <p>Tech City, TC 12345</p>
        <p>United States</p>
        <p className="mt-4">
          <a href="https://maps.google.com/?q=..." target="_blank" rel="noopener noreferrer">
            Get Directions →
          </a>
        </p>
      </address>
    </div>
  </div>
</section>
```

---

## Error Handling (FR-043)

### Graceful Degradation

```tsx
// src/components/sections/MapEmbed.tsx
import { useState } from 'react';

export function MapEmbed({ embedUrl }: MapEmbedProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-gray-600">
          Map temporarily unavailable.
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('123 Business Street, Tech City, TC 12345')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Open in Google Maps →
        </a>
      </div>
    );
  }

  return (
    <div className="map-container">
      <iframe
        src={embedUrl}
        onError={() => setHasError(true)}
        // ... other props
      />
    </div>
  );
}
```

### Ad Blocker Detection

Some ad blockers may block Google Maps embeds:

```tsx
// src/hooks/useMapBlockerDetection.ts
import { useEffect, useState } from 'react';

export function useMapBlockerDetection(iframeRef: React.RefObject<HTMLIFrameElement>) {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const checkIfBlocked = () => {
      if (iframeRef.current) {
        try {
          // Try to access iframe content (will fail if blocked)
          const iframeDoc = iframeRef.current.contentDocument;
          if (!iframeDoc) {
            setIsBlocked(true);
          }
        } catch (e) {
          // Likely blocked by ad blocker
          setIsBlocked(true);
        }
      }
    };

    // Check after iframe loads
    const timer = setTimeout(checkIfBlocked, 2000);
    return () => clearTimeout(timer);
  }, [iframeRef]);

  return isBlocked;
}
```

---

## Performance Optimization

### Lazy Loading

```html
<iframe
  loading="lazy"
  ...
/>
```

This tells browser to defer loading until iframe is near viewport.

### Intersection Observer (Advanced)

```tsx
// src/components/sections/MapEmbed.tsx
import { useEffect, useRef, useState } from 'react';

export function MapEmbed({ embedUrl }: MapEmbedProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load 200px before visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="map-container">
      {shouldLoad ? (
        <iframe src={embedUrl} {...} />
      ) : (
        <div className="skeleton-loader h-96 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}
```

---

## Testing

### Unit Tests

```typescript
// tests/unit/MapEmbed.test.tsx
import { render, screen } from '@testing-library/react';
import { MapEmbed } from '@/components/sections/MapEmbed';

describe('MapEmbed', () => {
  it('should render iframe with correct src', () => {
    const embedUrl = 'https://www.google.com/maps/embed?pb=...';
    render(<MapEmbed embedUrl={embedUrl} />);

    const iframe = screen.getByTitle('Company Office Location');
    expect(iframe).toHaveAttribute('src', embedUrl);
  });

  it('should have accessibility attributes', () => {
    render(<MapEmbed embedUrl="..." />);

    const iframe = screen.getByRole('region');
    expect(iframe).toHaveAttribute('aria-label');
    expect(iframe).toHaveAttribute('title');
  });

  it('should show fallback on error', () => {
    render(<MapEmbed embedUrl="..." />);
    
    const iframe = screen.getByTitle('Company Office Location');
    fireEvent.error(iframe);

    expect(screen.getByText(/Map temporarily unavailable/i)).toBeInTheDocument();
  });
});
```

### Integration Tests

```typescript
// tests/integration/ContactPage.test.tsx
import { render, screen } from '@testing-library/react';
import { ContactPage } from '@/pages/Contact/Contact';

describe('ContactPage', () => {
  it('should display office map and address', () => {
    render(<ContactPage />);

    // Map present
    expect(screen.getByTitle(/office location/i)).toBeInTheDocument();

    // Address present (accessibility alternative)
    expect(screen.getByText(/123 Business Street/i)).toBeInTheDocument();
  });
});
```

---

## Security & Privacy

### No API Key Exposure

Basic embed doesn't require API key → No security concerns.

### User Privacy

- **No tracking**: Embed API doesn't track individual users
- **GDPR**: May need privacy policy disclosure that Google Maps is embedded
- **referrerPolicy**: Set to `no-referrer-when-downgrade` for privacy

### Content Security Policy (CSP)

If using CSP headers, allow Google Maps:

```
Content-Security-Policy: frame-src https://www.google.com;
```

---

## Alternative: Static Map Image

If embed fails or for better performance, consider static map as fallback:

```tsx
<img
  src={`https://maps.googleapis.com/maps/api/staticmap?center=40.748,-73.987&zoom=15&size=600x400&key=API_KEY`}
  alt="Map showing office location at 123 Business Street"
  loading="lazy"
/>
```

**Note**: Static Maps API requires API key and billing.

---

## Monitoring

**Metrics to Track**:
- Map load success rate
- Time to interactive
- Error frequency
- Ad blocker impact

**Implementation**:
```typescript
console.log('[Map Service]', {
  loaded: true,
  timestamp: new Date().toISOString(),
  hasError: false,
});
```

---

## Deployment Checklist

- [ ] Get office address from client
- [ ] Generate Google Maps embed URL
- [ ] Add embed URL to `.env.local` and `.env.example`
- [ ] Test map loading in all target browsers
- [ ] Verify accessibility (screen reader, keyboard navigation)
- [ ] Test graceful degradation (block map, see fallback)
- [ ] Add skip link for keyboard users
- [ ] Include text address alongside map
- [ ] Test responsive design (320px - 2560px)
- [ ] Update privacy policy if needed

---

**Status**: ✅ Contract complete. Maps integration specified with accessibility and error handling.






