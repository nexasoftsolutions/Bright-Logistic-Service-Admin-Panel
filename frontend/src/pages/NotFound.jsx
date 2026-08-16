import { Link } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <main className="min-h-screen w-full bg-[#f8f9ff] flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#fff3e6] text-[#904d00] shadow-sm">
          <span className="text-3xl font-bold">404</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#0d1c2f] tracking-tight">
          Page Not Found
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#43474e] leading-6">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#000613] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1a2438]"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#0d1c2f] transition hover:border-[#000613] hover:text-[#000613]"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
