# Email API Contract

**Service**: EmailJS (or alternative email service)  
**Purpose**: Send contact form submissions via email to company address  
**Requirement**: FR-008 (Send contact form submissions via email)

---

## Service Selection

**Recommended**: [EmailJS](https://www.emailjs.com/)

**Alternatives**:
- Formspree
- SendGrid (via client-side API)
- Custom backend with Nodemailer (requires backend deployment)

**Decision Rationale**: EmailJS selected for no-backend requirement, free tier sufficient for startup volume, simple client-side integration.

---

## API Specification

### Endpoint

```
POST https://api.emailjs.com/api/v1.0/email/send
```

### Request Headers

```
Content-Type: application/json
```

### Request Body

```json
{
  "service_id": "service_xxxxxxx",      // EmailJS service ID
  "template_id": "template_xxxxxxx",     // EmailJS template ID
  "user_id": "user_xxxxxxxxxxxxxx",      // EmailJS public key
  "template_params": {
    "from_name": "John Doe",             // User's name from form
    "from_email": "john@example.com",    // User's email from form
    "from_phone": "+1 234-567-8900",     // User's phone (optional)
    "service_interest": "it-solutioning", // Service ID or "general"
    "message": "I would like to...",     // User's message
    "timestamp": "2025-10-19T14:30:00Z"  // ISO timestamp (generated)
  }
}
```

### Success Response

**Status**: 200 OK

```json
{
  "status": "OK",
  "text": "Your message was sent successfully!"
}
```

### Error Responses

**Status**: 400 Bad Request
```json
{
  "status": "error",
  "text": "The email service is not supported"
}
```

**Status**: 422 Unprocessable Entity
```json
{
  "status": "error",
  "text": "Template params are invalid"
}
```

**Status**: 429 Too Many Requests
```json
{
  "status": "error",
  "text": "Rate limit exceeded"
}
```

**Status**: 500 Internal Server Error
```json
{
  "status": "error",
  "text": "Service temporarily unavailable"
}
```

---

## Implementation

### Service Configuration

```typescript
// src/services/emailService.ts
import emailjs from '@emailjs/browser';

const EMAIL_CONFIG = {
  serviceId: import.meta.env.VITE_EMAIL_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAIL_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY,
};

export interface ContactFormData {
  from_name: string;
  from_email: string;
  from_phone?: string;
  service_interest: string;
  message: string;
  timestamp: string;
}

export async function sendContactEmail(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      data,
      EMAIL_CONFIG.publicKey
    );

    if (response.status === 200) {
      return { success: true };
    }

    return {
      success: false,
      error: 'Failed to send email. Please try again.',
    };
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      error: 'Service temporarily unavailable. Please try again later or contact us directly at [email protected]',
    };
  }
}
```

### React Hook Form Integration

```typescript
// src/pages/Contact/ContactForm.tsx
import { useForm } from 'react-hook-form';
import { sendContactEmail } from '@/services/emailService';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  serviceInterest: string;
  message: string;
}

export function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const emailData = {
      from_name: data.name,
      from_email: data.email,
      from_phone: data.phone || '',
      service_interest: data.serviceInterest,
      message: data.message,
      timestamp: new Date().toISOString(),
    };

    const result = await sendContactEmail(emailData);

    if (result.success) {
      // Show success message (FR-009)
      showSuccessNotification('Message sent successfully!');
    } else {
      // Show error message (FR-010, FR-037)
      showErrorNotification(result.error || 'Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

---

## Email Template Configuration

### EmailJS Dashboard Setup

1. **Create Service**:
   - Service Type: Gmail / Outlook / Custom SMTP
   - Configure sender email address

2. **Create Template**:
   - Template Name: "Contact Form Submission"
   - Subject: "New Contact Form Submission - {{service_interest}}"
   - Content:
   ```
   New contact form submission from the website:

   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{from_phone}}
   Service Interest: {{service_interest}}
   Timestamp: {{timestamp}}

   Message:
   {{message}}

   ---
   This email was sent from the IT Services Website contact form.
   ```

3. **Get Credentials**:
   - Service ID: `service_xxxxxxx`
   - Template ID: `template_xxxxxxx`
   - Public Key: `user_xxxxxxxxxxxxxx`

---

## Environment Variables

### .env.local

```bash
# EmailJS Configuration
VITE_EMAIL_SERVICE_ID=service_xxxxxxx
VITE_EMAIL_TEMPLATE_ID=template_xxxxxxx
VITE_EMAIL_PUBLIC_KEY=user_xxxxxxxxxxxxxx
```

### .env.example

```bash
# EmailJS Configuration
VITE_EMAIL_SERVICE_ID=your_service_id_here
VITE_EMAIL_TEMPLATE_ID=your_template_id_here
VITE_EMAIL_PUBLIC_KEY=your_public_key_here
```

---

## Error Handling

### Client-Side Validation (FR-007)

```typescript
const validationRules = {
  name: {
    required: 'Name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 100, message: 'Name must be less than 100 characters' },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
  },
  phone: {
    pattern: {
      value: /^[\d\s\-\+\(\)]+$/,
      message: 'Please enter a valid phone number',
    },
  },
  serviceInterest: {
    required: 'Please select a service',
  },
  message: {
    required: 'Message is required',
    minLength: { value: 10, message: 'Message must be at least 10 characters' },
    maxLength: { value: 1000, message: 'Message must be less than 1000 characters' },
  },
};
```

### Service Unavailability (FR-037)

```typescript
function handleEmailError(error: unknown): string {
  if (error instanceof Error) {
    // Network error
    if (error.message.includes('network')) {
      return 'Network error. Please check your connection and try again.';
    }
    
    // Rate limit
    if (error.message.includes('rate limit')) {
      return 'Too many requests. Please wait a moment and try again.';
    }
  }

  // Default fallback
  return 'Service temporarily unavailable. Please contact us directly at contact@company.com or call +1 234-567-8900.';
}
```

### Duplicate Submission Prevention (FR-038)

```typescript
// Disable submit button while submitting
<button 
  type="submit" 
  disabled={isSubmitting}
  className="..."
>
  {isSubmitting ? 'Sending...' : 'Send Message'}
</button>

// Alternative: Debounce submission
import { useCallback } from 'react';
import { debounce } from 'lodash';

const debouncedSubmit = useCallback(
  debounce((data) => sendContactEmail(data), 1000, {
    leading: true,
    trailing: false,
  }),
  []
);
```

---

## Rate Limits

**EmailJS Free Tier**:
- 200 emails/month
- 1 request/second per IP
- 70 requests/minute per account

**Mitigation**:
- Client-side throttling (1 submission per 5 seconds)
- Show rate limit message if exceeded
- Provide alternative contact methods

---

## Testing

### Unit Tests

```typescript
// tests/unit/emailService.test.ts
import { sendContactEmail } from '@/services/emailService';

describe('emailService', () => {
  it('should send email successfully', async () => {
    const result = await sendContactEmail({
      from_name: 'Test User',
      from_email: 'test@example.com',
      service_interest: 'it-solutioning',
      message: 'Test message',
      timestamp: new Date().toISOString(),
    });

    expect(result.success).toBe(true);
  });

  it('should handle service errors', async () => {
    // Mock emailjs to throw error
    // Test error handling
  });
});
```

### Integration Tests

```typescript
// tests/integration/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '@/pages/Contact/ContactForm';

describe('ContactForm', () => {
  it('should submit form successfully', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    // ... fill other fields

    fireEvent.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
    });
  });
});
```

---

## Security Considerations

1. **API Key Exposure**: EmailJS public key is intentionally public (domain-restricted in dashboard)
2. **Rate Limiting**: Enforced by EmailJS per IP and account
3. **CORS**: EmailJS handles CORS, no configuration needed
4. **Input Sanitization**: Validate all inputs client-side before sending
5. **Spam Protection**: Consider adding reCAPTCHA if spam becomes an issue

---

## Monitoring

**Metrics to Track**:
- Email send success rate (target: >95% per SC-004)
- Average response time
- Error types and frequencies
- Monthly email volume vs. free tier limit

**Implementation**:
```typescript
// Log to console (production: send to analytics)
console.log('[Email Service]', {
  success: result.success,
  timestamp: new Date().toISOString(),
  serviceInterest: data.service_interest,
});
```

---

## Alternative: Formspree

If EmailJS doesn't meet needs, Formspree is similar alternative:

**Endpoint**: `https://formspree.io/f/{form_id}`

**Differences**:
- No template configuration (sends raw form data)
- Requires paid plan for custom branding
- Similar rate limits and pricing

---

**Status**: ✅ Contract complete. Email service integration specified with error handling and testing strategy.






