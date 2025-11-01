import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * Reusable Input component with validation styling
 * FR-040: Accessible input with keyboard support
 * FR-010: Validation error styling
 */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className,
      id,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const baseStyles =
      'px-4 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const stateStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <div className={cn('flex flex-col', fullWidth ? 'w-full' : '')}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 text-sm font-medium text-gray-700"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(baseStyles, stateStyles, widthStyles, className)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          {...props}
        />

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;




