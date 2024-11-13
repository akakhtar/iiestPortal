// app/components/Header.tsx
"use client";

import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import Logo from "./Logo";

export default function Header() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <header className="bg-green-600 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="cursor-pointer" onClick={handleLogoClick}>
        <Logo />
      </div>
      
      {/* Navbar */}
      <Navbar />
    </header>
  );
}
