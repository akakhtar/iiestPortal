// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { buttonVariants } from "@/components/ui/button";
// export default function HomePage() {
//   return (
//     <div>
//       <h1 className="text-4xl font-bold">Welcome to IIEST PORTAL</h1>
//       <p className="mt-4 text-lg">Explore our faculty and alumni information.</p>
//       <div className="flex space-x-4 mt-6">
//         <Link href="/faculty" className={buttonVariants({ variant: "outline" })}>Faculty</Link>
//         <Link href="/alumni" className={buttonVariants({ variant: "outline" })}>Alumni</Link>
//         <Link href="/test" className={buttonVariants({ variant: "outline" })}>Test</Link>
//       </div>
//     </div>
//   );
// }
// app/page.tsx
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}
