"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import Image from "next/image";
import { searchStakeholder, Stakeholder } from "@/lib/Stakeholder";

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
      searchStakeholder(keyword)
        .then((data) => {
          setStakeholder(data);
        })
        .catch((err) => {
          setError(err);
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
                        alt={"Photo of " + stakeholder.nama}
                        layout="fill"
                        objectFit="cover"
                        unoptimized
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
