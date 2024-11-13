// app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center">
      <div className="flex justify-center gap-6">
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        <Link href="/terms" className="hover:underline">Terms of Service</Link>
        <Link href="/sitemap" className="hover:underline">Sitemap</Link>
      </div>
      <p className="mt-4">&copy; {new Date().getFullYear()} IIEST. All rights reserved.</p>
    </footer>
  );
}
