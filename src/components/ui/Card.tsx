import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * Reusable Card component with hover effects
 * Used for service cards, case studies, blog posts, etc.
 */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hover = false, padding = 'md', ...props }, ref) => {
    const baseStyles = 'bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300';

    const hoverStyles = hover
      ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
      : '';

    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, hoverStyles, paddingStyles[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;




