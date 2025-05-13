import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        The requested page could not be found.
      </p>
      <Link
        href="/"
        className="rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
