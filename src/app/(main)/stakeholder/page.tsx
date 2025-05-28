"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import Image from "next/image";

import axios from "axios";

interface Stakeholder {
  id: number;
  nama: string;
  kategori: string;
  nomor_telepon: string;
  email: string;
  foto: string;
  projects: Project[];
}

interface Project {
  id: number;
  nama_proyek: string;
  logo: string;
  deskripsi: string;
}

const Stakeholder = () => {
  const [stakeholder, setStakeholder] = useState<Stakeholder[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/stakeholders`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        setStakeholder(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const router = useRouter();

  const clickHandler = (stakeholder: number) => {
    router.push(`/stakeholder/detail-stakeholder?id=${stakeholder}`);
  };

  console.log(error);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-12 max-sm:gap-6 transition-all ease-in-out px-20 max-sm:px-4 py-10 h-screen justify-center items-center w-screen ">
        <div className="text-4xl text-primary font-bold animate-pulse">
          Loading....
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full w-screen">
        <div className="grid grid-cols-4 max-sm:grid-cols-2 p-20 max-sm:p-2 gap-16 max-sm:gap-4">
          {stakeholder.map((stakeholder) => (
            <div
              key={stakeholder.id}
              onClick={() => clickHandler(stakeholder.id)}
              className="bg-[#FBF9F1] cursor-pointer h-[36rem] max-sm:h-80 flex flex-col justify-center items-center hover:scale-110 duration-300 ease-in-out transition">
              <div className="flex flex-col w-full h-full justify-center items-center mb-10">
                <div className="flex w-full h-full p-8">
                  <div className="flex relative h-full max-sm:h-52 w-full">
                    <Image
                      src={stakeholder.foto}
                      alt="Picture of the author"
                      // width={720}
                      // height={700}
                      layout="fill"
                      objectFit="cover"
                      className={isLoading ? "animate-pulse bg-slate-700" : ""}
                    />
                  </div>
                </div>
                <h1 className="text-primary font-bold text-xl mb-10 max-sm:mb-0">
                  {stakeholder.nama}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stakeholder;
