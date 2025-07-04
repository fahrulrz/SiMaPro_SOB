// kode biasa

"use client";

// import React, { useEffect,  } from "react";
import Image from "next/image";
// import Aos from "aos";
import "aos/dist/aos.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

interface CardProps {
  id: number;
  name: string;
  imageUrl: string;
  dataAos: string;
}

const Card: React.FC<CardProps> = ({ id, name, imageUrl, dataAos }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const router = useRouter();

  if (typeof window != "undefined") {
    import("aos").then((Aos) => {
      Aos.init();
    });
  }

  const clickHandler = (id: number) => {
    router.push(`/home/project?id=${id}`);
  };

  return (
    <Link
      href={`/home/project?id=${id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="mt-10">
      <div className=" flex flex-col justify-between px-12 max-sm:px-0">
        {/* card yang dibuat perulangan */}
        <div
          data-aos={dataAos}
          data-aos-duration="1000"
          key={id}
          onClick={() => clickHandler(id)}
          className="bg-SimaPro flex w-full h-[28rem] max-sm:h-52 shadow-lg rounded-md overflow-hidden">
          <div className="relative flex items-end w-full h-full  overflow-hidden">
            <div className="absolute hover:cursor-pointer z-10 w-full h-full opacity-0 hover:opacity-20 bg-black from-black to-transparent transition ease-in-out duration-1000"></div>
            <Image
              src={imageUrl}
              alt="Picture of the author"
              layout="fill"
              objectFit="cover"
              unoptimized
            />

            <div
              className={`absolute ${isHovered ? "translate-y-0" : "translate-y-12"} ${isHovered ? "opacity-100" : "opacity-0"} delay-150 z-10 w-full flex flex-row items-center gap-5 ps-4 mb-4 font-black transition ease-in-out duration-1000`}>
              <h1>{name}</h1>
            </div>
          </div>
        </div>

        {/* end perulangan */}
      </div>
    </Link>
  );
};

export default Card;
