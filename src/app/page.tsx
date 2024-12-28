import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Manage your data and analytics all in one place
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Quick Stats</h3>
            <p className="text-gray-600 dark:text-gray-300">
              View your analytics and performance metrics
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Data Management</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Add, update, and manage your data entries
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/dasboard"
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-medium transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/Login"
            className="rounded-full border border-gray-300 dark:border-gray-600 px-8 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </main>

      <footer className="row-start-3 text-sm text-gray-500 dark:text-gray-400">
        © 2024 Your Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
