import React from 'react';
import Image from 'next/image';

interface CardProps {
  name: string;
  id: string;
}

export default function CharacterCard({ name, id }: CardProps) {
  return (
    <div className="overflow-hidden relative rounded-lg cursor-pointer font-medium transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:brightness-125 duration-300">
      <div className="relative z-10 bg-st-hyper-bg bg-cover bg-center">
        <Image
          src={`/${id}-removed.png`}
          alt={name}
          width={200}
          height={200}
        />
      </div>
      <div className="absolute inset-x-0 w-100 bottom-0 bg-gradient-to-t from-black to-transparent p-4 z-30">
        <h2 className="text-white">{name}</h2>
        <h2 className="text-white">{name}</h2>
      </div>
    </div>
  );
}