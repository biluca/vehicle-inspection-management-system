"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/inspections`);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <div>
        <Image alt="Haul Logo" src="/haul.png" width={100} height={100} />
      </div>
      <div id="div1" className="text-center text-white font-bold mb-4">
        <span className="bg-haul text-black px-2 rounded-sm">{"Haul"}</span>
        <span className="text-gray-300">{" Feature Challenge "}</span>
        <span className="text-gray-400">{" Inspections Viewer "}</span>
      </div>
      <div id="div2" className="text-center">
        <button
          className="px-6 py-2 text-black bg-haul font-medium rounded-md hover:bg-gray-800 hover:text-haul transition-all shadow-lg"
          onClick={() => handleClick()}
        >
          Go to Inspections
        </button>
      </div>
    </div>
  );
}
