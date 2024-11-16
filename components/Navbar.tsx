// app/components/Navbar.tsx
import Link from "next/link";
import Image from "next/image";
import iiestLogo from "../public/IIEST_LOGO.svg.png"; // Place your IIEST logo in the public folder

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-emerald-600 text-slate-100 shadow-md">
      <div className="flex items-center">
        <Image src={iiestLogo} alt="IIEST Logo" width={50} height={50} />
        <span className="text-3xl  ml-3 sm:text-s md:text-2xl lg:text-3xl xl:text-3xl">
  Indian Institute of Engineering Science and Technology (IIEST)
</span>

      </div>
      <div className="flex gap-6 text-lg font-bold">
        <Link href="/" className="hover:no-underline hover:text-slate-200">Home</Link>
        <Link href="/faculty" className="hover:no-underline hover:text-slate-200">Faculty</Link>
        <Link href="/alumni" className="hover:no-underline hover:text-slate-200">Alumni</Link>
        <Link href="/about" className="hover:no-underline hover:text-slate-200">About</Link>
        <Link href="/contact" className="hover:no-underline hover:text-slate-200">Contact</Link>
      </div>
    </nav>
  );
}
