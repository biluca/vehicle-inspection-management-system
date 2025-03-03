"use client";

import { redirect } from "next/navigation";
import { FaHome } from "react-icons/fa";


interface HeaderProps {
  title: string;
  showHomeButton: boolean;
}

export default function Header({ title, showHomeButton }: HeaderProps) {
  const handleBackHomeClick = () => {
    redirect(`/inspections/`);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-t-md shadow-md mb-2">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <button
        className={`${
          showHomeButton ? "visible" : "invisible"
        } px-6 py-2 text-black bg-haul font-medium rounded-md hover:bg-black hover:text-haul transition-all`}
        onClick={() => handleBackHomeClick()}
      >
        <FaHome />
      </button>
    </div>
  );
}
