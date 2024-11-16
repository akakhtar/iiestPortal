import Image from "next/image";
import iiestBuilding from "../public/mainBuilding.jpg"; // Ensure this image is in the public folder

export default function HeroSection() {
  return (
    <section className="flex flex-grow flex-col md:flex-row items-center justify-between px-8 py-12 bg-gray-50">
      {/* Text Section */}
      <div className="md:w-1/2 space-y-5 md:pr-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Welcome to the Indian Institute of Engineering Science and Technology (IIEST), Shibpur
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Established over 160 years ago, IIEST Shibpur is one of the oldest and most prestigious engineering institutes in India. Our mission is to provide high-quality education and foster research and innovation to meet the needs of society. Join us to experience a transformative education in engineering and technology.
        </p>
      </div>

      {/* Image Section */}
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center md:justify-end">
        <Image
          src={iiestBuilding}
          alt="IIEST Building"
          className="rounded-lg shadow-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw" // Responsive sizing
          style={{ objectFit: "cover" }} // Ensures image scales proportionally
          priority
        />
      </div>
    </section>
  );
}
