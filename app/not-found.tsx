import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="card w-full max-w-lg overflow-hidden font-mono text-sm">
        <div className="border-b border-line bg-surface-2 px-4 py-2.5 text-xs text-muted">harsh@delhi ~ 404</div>
        <div className="space-y-3 p-6">
          <p><span className="text-accent-fg">$</span> curl -I this-page</p>
          <p className="text-2xl font-semibold font-sans">404 · Page not found</p>
          <p className="font-sans text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
          <Link href="/" className="btn btn-primary mt-2 font-sans">Back to portfolio</Link>
        </div>
      </div>
    </main>
  );
}
