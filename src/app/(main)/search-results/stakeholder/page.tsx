"use client";

import React, { useState, useEffect } from "react";

import { useRouter} from "next/navigation";

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

const SearchStakeholder = () => {
  const [stakeholder, setStakeholder] = useState<Stakeholder[]>([]);
  const [error, setError] = useState(null);

  const [keyword, setKeyword] = useState<string>(" ");

  useEffect(() => {
    const keywordUrl = window
      ? new URLSearchParams(window.location.search).get("query") || " "
      : " ";
      setKeyword(keywordUrl);
  }, []);

  // const keyword = useSearchParams()?.get("query");

  useEffect(() => {
    if (keyword) {
      axios
        .get(`https://be-pad.trpl.space/api/stakeholders/search/${keyword}`)
        .then((response) => {
          setStakeholder(response.data.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [keyword]);

  const router = useRouter();

  const clickHandler = (stakeholder: number) => {
    router.push(`/stakeholder/detail-stakeholder?id=${stakeholder}`);
  };

  console.log(error);

  return (
    <>
      <div className="h-full w-screen">
        <div className="grid grid-cols-4 max-sm:grid-cols-2 p-20 max-sm:p-2 gap-16 max-sm:gap-4">
          {stakeholder?.length > 0 ? (
            stakeholder.map((stakeholder) => (
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
                        layout="fill"
                        objectFit="cover"
                        className="bg-red-500"
                      />
                    </div>
                  </div>
                  <h1 className="text-primary font-bold text-xl mb-10 max-sm:mb-0">
                    {stakeholder.nama}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-red-500 font-bold text-2xl flex justify-center h-[45vh] items-center">
              No stakeholder found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchStakeholder;
