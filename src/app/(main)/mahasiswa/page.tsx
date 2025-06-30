"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { getMahasiswa } from "@/lib/Mahasiswa";
import type { Mahasiswa } from "@/lib/Mahasiswa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/contexts/AuthContext";

const Mahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMahasiswa();
        setMahasiswa(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "Gagal mengambil data");
        } else {
          setError("Unknown error");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    console.log("Data mahasiswa:", mahasiswa);
  }, [isLoading]);

  useEffect(() => {
    console.log(
      "Daftar foto mahasiswa:",
      mahasiswa.map((m) => m.foto)
    );
  }, [mahasiswa]);

  console.error(error);

  const clickHandler = (mahasiswa: number) => {
    router.push(`/mahasiswa/detail-mahasiswa?id=${mahasiswa}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-12 max-sm:gap-6 transition-all ease-in-out px-20 max-sm:px-4 py-10 h-screen justify-center items-center w-screen ">
        <div className="text-4xl text-primary font-bold animate-pulse">
          Loading....
        </div>
      </div>
    );
  }

  if (mahasiswa.length === 0) {
    return (
      <>
        {user?.role == "admin" ? (
          <div
            // data-aos="fade-up"
            // data-aos-duration="1000"
            className="flex mt-10 px-20 absolute"
          >
            <a href="mahasiswa/add-mahasiswa" className="flex">
              <button
                type="submit"
                className="w-full h-10 bg-primary ps-4 pe-2 gap-0 shadow-md text-white flex justify-start items-center rounded-[5px] font-bold tracking-wide hover:bg-gray-50 hover:text-primary transition ease-in-out duration-300"
              >
                <FontAwesomeIcon
                  icon={faFileCirclePlus}
                  style={{ fontSize: "1rem" }}
                  className="me-2"
                />
                Add Profil Mahasiswa
              </button>
            </a>
          </div>
        ) : null}
        <div className="flex flex-col gap-12 max-sm:gap-6 transition-all ease-in-out px-20 max-sm:px-4 py-10 h-screen justify-center items-center w-screen">
          <div className="text-4xl text-primary font-bold animate-pulse">
            Data Mahasiswa Kosong
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="h-full w-screen overflow-hidden">
        {user?.role == "admin" ? (
          <div
            // data-aos="fade-up"
            // data-aos-duration="1000"
            className="flex mt-10 px-20"
          >
            <a href="mahasiswa/add-mahasiswa" className="flex">
              <button
                type="submit"
                className="w-full h-10 bg-primary ps-4 pe-2 gap-0 shadow-md text-white flex justify-start items-center rounded-[5px] font-bold tracking-wide hover:bg-gray-50 hover:text-primary transition ease-in-out duration-300"
              >
                <FontAwesomeIcon
                  icon={faFileCirclePlus}
                  style={{ fontSize: "1rem" }}
                  className="me-2"
                />
                Add Profil Mahasiswa
              </button>
            </a>
          </div>
        ) : null}
        <div className="grid grid-cols-4 max-sm:grid-cols-2 px-20 py-10 max-sm:py-6 max-sm:p-2 gap-16 max-sm:gap-4">
          {mahasiswa.map((mahasiswa) => (
            <div
              key={mahasiswa.id}
              onClick={() => clickHandler(mahasiswa.id)}
              className={`bg-[#FBF9F1] h-[36rem] max-sm:h-80 flex flex-col justify-center items-center cursor-pointer hover:scale-110 hover:shadow-lg z-10 hover:z-30 transition duration-300 ease-in-out`}
            >
              {mahasiswa.foto ? (
                <div className="flex flex-col w-full h-full justify-center items-center mb-10">
                  <div className="flex w-full h-full p-8">
                    <div className="flex relative h-full max-sm:h-52 w-full">
                      <Image
                        src={mahasiswa.foto}
                        alt={"Picture of " + mahasiswa.nama_lengkap}
                        layout="fill"
                        unoptimized
                        objectFit="cover"
                        className={
                          isLoading ? "animate-pulse bg-slate-700" : ""
                        }
                      />
                    </div>
                  </div>
                  <h1 className="text-primary font-bold text-xl mb-10 max-sm:mb-0">
                    {mahasiswa.nama_lengkap}{" "}
                  </h1>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Mahasiswa;
