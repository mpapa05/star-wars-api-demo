import React from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player'; // Use the appropriate import for your video source

interface CardProps {
  name: string;
  id: string;
}

export default function CharacterCard({ name, id }: CardProps) {
  return (
    <div className="overflow-hidden relative rounded-md pb-1 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:brightness-125 duration-300 hover:font-black duration-300">
      {/* Video Background */}
      <ReactPlayer
        url={`/hyperspace.mov`} // Update with the correct video source
        playing={true}
        loop={true}
        muted={true}
        width="320%" 
        height="80%" 
        className="absolute rounded-md rotate-[90deg] -right-[200px]"
      />

      {/* Image and Content */}
      <div className="relative z-10">
        <Image
          src={`/${id}-removed.png`}
          alt={name}
          width={200}
          height={200}
          className="rounded-md mx-auto"
        />
        <div className="grid grid-cols-1 content-center justify-items-center hover:font-black duration-300">
          <h2>{name}</h2>
        </div>
      </div>
    </div>
  );
}