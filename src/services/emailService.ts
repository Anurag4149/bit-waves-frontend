import emailjs from '@emailjs/browser';
import type { ContactFormData } from '@/utils/validation';

/**
 * Email service for sending contact form submissions via EmailJS
 * FR-008: Send contact form submissions via email
 * FR-037: Handle email service unavailability gracefully
 */

interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

/**
 * Get EmailJS configuration from environment variables
 */
function getEmailConfig(): EmailConfig {
  const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'EmailJS configuration is missing. Please set VITE_EMAIL_SERVICE_ID, VITE_EMAIL_TEMPLATE_ID, and VITE_EMAIL_PUBLIC_KEY environment variables.'
    );
  }

  return { serviceId, templateId, publicKey };
}

/**
 * Send contact form email via EmailJS
 * Returns success/error result
 */
export async function sendContactEmail(
  formData: ContactFormData
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    // Get configuration
    const config = getEmailConfig();

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      service_interest: formData.serviceInterest,
      message: formData.message,
      to_email: 'contact@bitwaves.com', // Your company email
      timestamp: new Date().toLocaleString(),
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
      config.publicKey
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Failed to send email. Please try again later.',
      };
    }
  } catch (error) {
    console.error('EmailJS error:', error);

    // Handle specific error cases
    if (error instanceof Error) {
      // Check for network errors
      if (error.message.includes('network') || error.message.includes('NetworkError')) {
        return {
          success: false,
          error:
            'Network error. Please check your internet connection and try again.',
        };
      }

      // Check for configuration errors
      if (error.message.includes('configuration') || error.message.includes('API key')) {
        return {
          success: false,
          error:
            'Email service is not configured. Please contact support at contact@bitwaves.com directly.',
        };
      }
    }

    // Generic error
    return {
      success: false,
      error:
        'Unable to send message at this time. Please try again later or contact us directly at contact@bitwaves.com.',
    };
  }
}

/**
 * Check if EmailJS is properly configured
 */
export function isEmailConfigured(): boolean {
  try {
    getEmailConfig();
    return true;
  } catch {
    return false;
  }
}

