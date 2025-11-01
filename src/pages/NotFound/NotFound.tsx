import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

/**
 * 404 Not Found page
 * FR-036: Appropriate error pages for non-existent URLs
 */

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-heading font-bold text-gray-900 mb-4">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Go to Home
        </Button>
      </Link>
    </div>
  );
}


