'use client';

import { useRouter_UNSTABLE as useRouter } from 'waku';
import { Link } from 'waku';

export function Breadcrumbs() {
  const router = useRouter();
  const pathSegments = router.path.split('/').filter(Boolean);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li className="breadcrumb__item">
          <Link
            to="/"
            className="text-gray-400 hover:text-gray-500"
            aria-label="Home page"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 flex-shrink-0"
              fill="currentColor"
            >
              <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
            </svg>
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;

          return (
            <li key={href} className="">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link
                  to={href}
                  className="text-sm font-medium text-gray-400 hover:text-gray-500"
                >
                  {formatSegment(segment)}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function formatSegment(segment: string) {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
