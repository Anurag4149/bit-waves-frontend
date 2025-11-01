import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

/**
 * Desktop navigation component
 * FR-003: Navigation to all primary pages
 * FR-040: Keyboard navigation support
 */

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/case-studies' },
    { label: 'Research', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className={cn('flex items-center space-x-8', className)} aria-label="Main navigation">
      {navLinks.map(link => (
        <Link
          key={link.href}
          to={link.href}
          className={cn(
            'text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-3 py-2',
            isActive(link.href)
              ? 'text-primary-600'
              : 'text-gray-600 hover:text-gray-900'
          )}
          aria-current={isActive(link.href) ? 'page' : undefined}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}




