// app/components/Navbar.tsx
import Link from "next/link";
import Image from "next/image";
import iiestLogo from "../public/IIEST_LOGO.svg.png"; // Place your IIEST logo in the public folder

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        <Image src={iiestLogo} alt="IIEST Logo" width={50} height={50} />
        <span className="text-3xl font-bold ml-3 sm:text-sm md:text-2xl lg:text-3xl xl:text-4xl">
  Indian Institute of Engineering Science and Technology (IIEST)
</span>

      </div>
      <div className="flex gap-6 sm:text-sm">
        <Link href="/" className="text-gray-900 font-bold text-lg hover:underline">Home</Link>
        <Link href="/faculty" className="text-gray-900 font-bold text-lg hover:underline">Faculty</Link>
        <Link href="/alumni" className="text-gray-900 font-bold text-lg hover:underline">Alumni</Link>
        <Link href="/about" className="text-gray-900 font-bold text-lg hover:underline">About</Link>
        <Link href="/contact" className="text-gray-900 font-bold text-lg hover:underline">Contact</Link>
      </div>
    </nav>
  );
}
