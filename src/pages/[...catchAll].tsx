export default function NotFoundPage({ catchAll }: { catchAll: string[] }) {
  return (
    <div className="flex flex-col min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <p className="text-sm text-gray-500">
        Attempted path: /{catchAll.join('/')}
      </p>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic', // Use dynamic rendering for 404 pages
  };
};

