import React, { useState } from "react";
import Image1 from "../assets/L-3-1.jpg";
import Image2 from "../assets/L-3-2.jpg";
import Image3 from "../assets/L-3-3.jpg";

const LandingPageSection3 = () => {
  const Images = [Image1, Image2, Image3];
  const Text = [
    {
      heading: "Add Clients",
      text: "Effortlessly add new clients to your case management system and keep track of their information.",
    },
    {
      heading: "Chat & Video Call",
      text: "Communicate securely with clients through built-in chat and video call features.",
    },
    {
      heading: "Accept Payments",
      text: "Easily accept payments for your services through the integrated payment system.",
    },
  ];

  const [currentImage, setCurrentImage] = useState(Images[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-900 p-4">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-4">
        <img
          src={currentImage}
          alt="Displayed Image"
          className="object-cover h-[30rem] w-[40rem]"
        />
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-4 space-y-4">
        {Images.map((src, index) => (
          <button
            key={index}
            className={`text-left text-white p-4 w-full lg:w-auto ${
              activeIndex === index ? "border-l-4 border-white" : ""
            }`}
            onClick={() => {
              setCurrentImage(src);
              setActiveIndex(index);
            }}
          >
            <h2 className="font-medium text-4xl">{Text[index].heading}</h2>
            <p className="text-2xl">{Text[index].text}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LandingPageSection3;
