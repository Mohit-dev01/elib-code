import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto relative h-64 rounded-md overflow-hidden my-5">
      {/* Background image */}
      <Image
        src="/paper-bg.jpg"
        alt="Background image"
        className="object-cover"
        fill
        priority
      />

      {/* Text */}
      <div className="absolute inset-0 flex items-center pl-8">
        <h1 className="text-white text-2xl font-semibold max-w-md leading-snug">
          Connect, Share and Trade Your Favourite Reads...
        </h1>
      </div>

      {/* Book image */}
      <Image
        src="/book.png"
        alt="Book image"
        className="absolute right-5 bottom-0"
        width={200}
        height={200}
        priority
      />
    </div>
  );
};

export default Banner;
