import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ContactFormSchema, type ContactFormData } from '@/utils/validation';
import { sendContactEmail } from '@/services/emailService';
import { announceToScreenReader } from '@/utils/accessibility';
import { scrollAnimationVariants, useScrollAnimation } from '@/hooks/useScrollAnimation';
import { prefersReducedMotion } from '@/utils/accessibility';

/**
 * Contact form component with validation and EmailJS integration
 * FR-007: Form validation (email format, required fields)
 * FR-008: Send submissions via email
 * FR-009: Show success/error messages
 * FR-010: Real-time validation feedback
 * FR-038: Prevent duplicate submissions
 */

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const shouldReduceMotion = prefersReducedMotion();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    mode: 'onBlur', // Validate on blur for better UX
  });

  const onSubmit = async (data: ContactFormData) => {
    // Prevent duplicate submissions
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const result = await sendContactEmail(data);

      if (result.success) {
        setSubmitSuccess(true);
        reset(); // Clear form
        announceToScreenReader('Form submitted successfully', 'polite');
        
        // Scroll to success message
        setTimeout(() => {
          document.getElementById('form-success')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        setSubmitError(result.error);
        announceToScreenReader(`Form submission failed: ${result.error}`, 'assertive');
      }
    } catch (error) {
      const errorMessage =
        'An unexpected error occurred. Please try again or contact us directly.';
      setSubmitError(errorMessage);
      announceToScreenReader(`Form submission failed: ${errorMessage}`, 'assertive');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : "hidden"}
      animate={shouldReduceMotion ? false : isVisible ? 'visible' : 'hidden'}
      variants={scrollAnimationVariants.fadeInUp}
      className="bg-white rounded-lg shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-6">
        Get in Touch
      </h2>

      {/* Success Message */}
      {submitSuccess && (
        <div
          id="form-success"
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md"
          role="alert"
        >
          <div className="flex items-start">
            <svg
              className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-green-800">Message sent successfully!</h3>
              <p className="mt-1 text-sm text-green-700">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md"
          role="alert"
        >
          <div className="flex items-start">
            <svg
              className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-800">Submission failed</h3>
              <p className="mt-1 text-sm text-red-700">{submitError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        {/* Name Field */}
        <Input
          label="Name"
          type="text"
          {...register('name')}
          error={errors.name?.message}
          fullWidth
          required
          autoComplete="name"
        />

        {/* Email Field */}
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          fullWidth
          required
          autoComplete="email"
        />

        {/* Phone Field (Optional) */}
        <Input
          label="Phone"
          type="tel"
          {...register('phone')}
          error={errors.phone?.message}
          fullWidth
          helperText="Optional"
          autoComplete="tel"
        />

        {/* Service Interest Field */}
        <div>
          <label
            htmlFor="serviceInterest"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Service Interest <span className="text-red-500 ml-1" aria-label="required">*</span>
          </label>
          <Controller
            name="serviceInterest"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select
                {...field}
                id="serviceInterest"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                aria-invalid={errors.serviceInterest ? 'true' : 'false'}
                aria-describedby={errors.serviceInterest ? 'serviceInterest-error' : undefined}
              >
                <option value="">Select a service</option>
                <option value="it-solutioning">IT Solutioning</option>
                <option value="ai-agents">AI Agent Development</option>
                <option value="data-visualization">Data Visualization</option>
                <option value="general">General Inquiry</option>
              </select>
            )}
          />
          {errors.serviceInterest && (
            <p
              id="serviceInterest-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.serviceInterest.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Message <span className="text-red-500 ml-1" aria-label="required">*</span>
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-y"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p
              id="message-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </motion.div>
  );
}

