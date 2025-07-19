import Image from "next/image";
import { Footer } from "./ui/footer";
import { Header } from "./ui/header";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="relative w-full h-[1200px]"> 
      <Image
        src="/gym-barbell.jpg"
        alt="Gym Image"
        fill 
        className="rounded-lg shadow-lg object-cover" 
        sizes="100vw" 
      />
      </div>

      <div className="absolute top-50 inset-0 flex items-center justify-center">
        <h1 className="text-7xl text-black [text-shadow:_1px_1px_2px_rgba(255,255,255,0.8)]">Iron Peak Fitness</h1>
      </div>

      {/* Centered button */}
        <div className="absolute top-150 inset-0 flex items-center justify-center">
          <Link href="/registration" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition duration-300 transform hover:scale-105">
            View Membership Plans
          </Link>
        </div>

      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Image container - add id="side-image" here if needed */}
        <div className="w-full md:w-1/3">
          <Image
            src="/gym-room.jpg"
            alt="Gym Room"
            width={800}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
        
        {/* Text container */}
        <div id="side-text" className="flex-1 pt-80 pl-6 md:pl-20">
          <h1 className="text-3xl font-bold mb-6">Welcome to Iron Peak Fitness</h1>
          <p className="mb-4 text-lg">
            At Iron Peak, we're more than just a gym - we're a community dedicated to helping you achieve your fitness goals. Our 24,000 sq ft facility offers state-of-the-art equipment, expert trainers, and a motivating environment for everyone from beginners to elite athletes.
          </p>
          
          <h2 className="text-xl font-semibold mb-3 mt-6">World-Class Facilities</h2>
          <p className="mb-4">
            Our fully equipped gym features an expansive free weights section with premium benches, squat racks, and deadlift platforms. You'll find a complete range of dumbbells (5-150lbs), Olympic bars, bumper plates, and specialty bars for all your strength training needs. Our cardio zone boasts the latest treadmills, ellipticals, and rowing machines with integrated entertainment systems.
          </p>
          
          <h2 className="text-xl font-semibold mb-3 mt-6">Diverse Fitness Classes</h2>
          <p className="mb-4">
            Choose from over 50 weekly classes including HIIT, power yoga, spin cycling, boxing, and functional training. Our certified instructors offer modifications for all fitness levels, ensuring every workout is challenging yet accessible. Specialty programs include 6-week transformation challenges, mobility workshops, and nutrition seminars.
          </p>
          
          <h2 className="text-xl font-semibold mb-3 mt-6">Tailored Memberships</h2>
          <p className="mb-4">
            We offer flexible membership plans to suit your lifestyle:
          </p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li><span className="font-medium">Basic:</span> 24/7 gym access and locker room facilities</li>
            <li><span className="font-medium">Premium:</span> Includes unlimited classes and guest privileges</li>
            <li><span className="font-medium">Elite:</span> Adds personal training sessions and recovery amenities</li>
            <li><span className="font-medium">Student/Senior:</span> Discounted rates with full access</li>
          </ul>
          
          <p>
            Our staff is available daily for facility tours and consultations. Start your fitness journey today with a 7-day trial pass and experience the Iron Peak difference!
          </p>
        </div>
      </div>
      <Footer />
      
    </div>
    
  );
}
