// // app/layout.tsx
// import "./globals.css";
// import Header from "@/components/Header";

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-gray-100 text-gray-900">
//         <Header />
//         <main className="p-4">{children}</main>
//       </body>
//     </html>
//   );
// }
// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

