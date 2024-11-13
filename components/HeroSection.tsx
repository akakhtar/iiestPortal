// app/components/HeroSection.tsx
import Image from "next/image";
import iiestBuilding from "../public/mainBuilding.jpg"; // Ensure this image is in the public folder

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center md:justify-between px-8 py-16 bg-gray-50 w-full min-h-screen">
      <div className="md:w-1/2 space-y-5 ml-7 md:mr-5">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Welcome to the Indian Institute of Engineering Science and Technology (IIEST),Shibpur
        </h1>
        <p className="text-lg text-gray-700 mt-4 md:mt-6">
          Established over 160 years ago, IIEST Shibpur is one of the oldest and most prestigious engineering institutes in India. Our mission is to provide high-quality education and foster research and innovation to meet the needs of society. Join us to experience a transformative education in engineering and technology.
        </p>
      </div>
      <div className="mt-10 mr-10 md:mt-0 flex justify-center md:block md:w-auto">
        <Image
          src={iiestBuilding}
          alt="IIEST Building"
          className="rounded-lg shadow-lg  h-[600px] w-auto md:w-[400px] lg:w-[700px]"
        />
      </div>
    </section>
  );
}
