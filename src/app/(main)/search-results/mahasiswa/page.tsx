"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mahasiswa, searchMahasiswa } from "@/lib/Mahasiswa";

const SearchMahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [error, setError] = useState(null);

  const [keyword, setKeyword] = useState<string>(" ");

  useEffect(() => {
    const keywordUrl = window
      ? new URLSearchParams(window.location.search).get("query") || " "
      : " ";
    setKeyword(keywordUrl);
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (keyword) {
      searchMahasiswa(keyword)
        .then((data) => {
          setMahasiswa(data);
        })
        .catch((err) => {
          setError(err);
        });
    } else if (keyword == "") {
      router.push("/mahasiswa");
    }
  }, [keyword, router]);

  console.error(error);

  const clickHandler = (mahasiswa: number) => {
    router.push(`/mahasiswa/detail-mahasiswa?id=${mahasiswa}`);
  };

  return (
    <>
      <div className="h-full w-screen overflow-hidden">
        <div className="grid grid-cols-4 max-sm:grid-cols-2 p-20 max-sm:p-2 gap-16 max-sm:gap-4">
          {mahasiswa?.length > 0 ? (
            mahasiswa.map((mahasiswa) => (
              <div
                key={mahasiswa.id}
                onClick={() => clickHandler(mahasiswa.id)}
                className={`bg-[#FBF9F1] h-[36rem] max-sm:h-80 flex flex-col justify-center items-center cursor-pointer hover:scale-110 hover:shadow-lg z-10 hover:z-30 transition duration-300 ease-in-out`}>
                <div className="flex flex-col w-full h-full justify-center items-center mb-10">
                  <div className="flex w-full h-full p-8">
                    <div className="flex relative h-full max-sm:h-52 w-full">
                      <Image
                        src={mahasiswa.foto}
                        alt={"Picture of " + mahasiswa.nama_lengkap}
                        unoptimized
                        layout="fill"
                        objectFit="cover"
                        className="bg-red-500"
                      />
                    </div>
                  </div>
                  <h1 className="text-primary font-bold text-xl mb-10 max-sm:mb-0">
                    {mahasiswa.nama_lengkap}{" "}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-red-500 font-bold text-2xl flex justify-center h-[45vh] items-center">
              No mahasiswa found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchMahasiswa;
