import React, { useState } from "react";

const HoverCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="relative">
        <div
          className={`w-[70rem] h-[20rem] rounded-lg shadow-md transition-transform transform ${
            isHovered
              ? "scale-110 text-black bg-white"
              : "text-white bg-zinc-400 "
          } flex flex-col justify-center items-center`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="p-8 text-left flex">
            <div className="w-3/4">
              <h3 className="font-semibold mb-4 text-4xl">
                Get Started with Advocate Case Management System Today
              </h3>
              <p className="text-xl mb-8">
                Streamline your legal practice with our all-in-one case
                management system. Sign up now to access a range of features
                designed to enhance your efficiency and productivity.
              </p>
            </div>
            <div className="flex justify-center items-center w-1/4">
              <button className="bg-lime-400 text-white px-4 py-2 rounded border border-lime-400 hover:text-zinc-400 font-bold">
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverCard;
