// app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 bg-emerald-600 text-slate-100 text-center">
      <div className="flex justify-center gap-6">
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        <Link href="/terms" className="hover:underline">Terms of Service</Link>
        <Link href="/sitemap" className="hover:underline">Sitemap</Link>
      </div>
      <p className="mt-4">&copy; {new Date().getFullYear()} IIEST. All rights reserved.</p>
    </footer>
  );
}
