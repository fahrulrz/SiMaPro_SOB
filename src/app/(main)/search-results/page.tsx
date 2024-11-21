"use client";

// import components
import Card from "@/components/Card";

import "../../styles/style.css";

// import fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

// import dropdown filter
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import React, { useState, useEffect } from "react";

import axios from "axios";
import { useSearchParams } from "next/navigation";

interface Category {
  id: number;
  nama_kategori: string;
}

interface Year {
  id: number;
  tahun: string;
}

interface Stakeholder {
  id: number;
  nama: string;
  kategori: string;
  nomor_telepon: string;
  email: string;
  foto: string;
}

interface Team {
  id: number;
  nama: string;
}

interface Anggota {
  id: number;
  nama_lengkap: string;
  NIM: string;
  foto: string;
}

interface AnggotaTeam {
  id: number;
  role: string;
  team: Team;
  member: Anggota;
}

interface Image {
  id: number;
  link_gambar: string;
}

interface Comment {
  id: number;
  isi_komen: string;
  user: User;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Project {
  id: number;
  nama_proyek: string;
  categories: Category[];
  year: Year[];
  image: Image[];
  comment: Comment;
  stakeholder: Stakeholder;
  team: AnggotaTeam;
}

const SearchResults = () => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [result, setResult] = useState<Project[]>([]);

  //   const [projects, setProjects] = useState<Project[]>([]);
  // const [selectedFilters, setSelectedFilters] = useState<Category[]>([]);

  useEffect(() => {
    if (query && query !== "") {
      axios
        .get(`http://127.0.0.1:8000/api/search/${query}`)
        .then((response) => setResult(response.data.data))
        .catch((error) => console.error(error));
    }
  }, [query]);

  // const toggleFilter = (category: Category) => {
  //   setSelectedFilters((prev) =>
  //     prev.some((item) => item.id === category.id)
  //       ? prev.filter((item) => item.id !== category.id)
  //       : [...prev, category]
  //   );
  // };

  console.log("dibawah merupakan result");
  console.log(result);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col w-full h-full min-h-[50.5vh] bg-[#E5E1DA] no-scrollbar mb-20">
        <div className="flex w-full h-full text-black">
          <div className="flex w-full flex-col h-full">
            <div className="flex flex-col w-full h-fit px-28 max-sm:px-4 mt-10">
              <div className="flex h-20 max-sm:h-full w-full gap-6 ps-12 max-sm:ps-0">
                {/* dropdown filter pad */}
                <Menu as="div" className="relative inline-block w-44 text-left">
                  <div data-aos="fade-up" data-aos-duration="700">
                    <MenuButton
                      className="inline-flex w-full h-10 items-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-base text-white tracking-wide font-bold shadow-sm hover:bg-gray-50 hover:text-primary transition ease-in-out duration-300"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}>
                      <FontAwesomeIcon
                        icon={faFilter}
                        style={{ fontSize: "1.2rem" }}
                        className="me-2"
                      />
                      Pilih PAD
                      <ChevronDownIcon
                        aria-hidden="true"
                        className={`-mr-1 h-5 w-5 me-0 ms-auto ease-in-out duration-300 ${isHovered ? "text-primary" : "text-white"}`}
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <div className="py-1">
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-white data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                          Projek Aplikasi Dasar 1
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-white data-[focus]:bg-gray-100 data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                          Projek Aplikasi Dasar 2
                        </a>
                      </MenuItem>

                      <form action="#" method="POST">
                        <MenuItem>
                          <button
                            type="submit"
                            className="block w-full px-4 py-2 text-left text-sm text-white data-[focus]:bg-gray-100 data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                            Sign out
                          </button>
                        </MenuItem>
                      </form>
                    </div>
                  </MenuItems>
                </Menu>
                {/* dropdown Filter pad end */}

                {/* dropdown filter tahun */}

                <Menu as="div" className="relative inline-block w-44 text-left">
                  <div data-aos="fade-up" data-aos-duration="700">
                    <MenuButton
                      className="inline-flex w-full h-10 items-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-base text-white tracking-wide font-bold shadow-sm hover:bg-gray-50 hover:text-primary transition ease-in-out duration-300"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}>
                      <FontAwesomeIcon
                        icon={faFilter}
                        style={{ fontSize: "1.2rem" }}
                        className="me-2"
                      />
                      Pilih Tahun
                      <ChevronDownIcon
                        aria-hidden="true"
                        className={`-mr-1 h-5 w-5 me-0 ms-auto ease-in-out duration-300 ${isHovered ? "text-primary" : "text-white"}`}
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <div className="py-1">
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-white data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                          2020
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-white data-[focus]:bg-gray-100 data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                          2021
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-white data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                          2022
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-white data-[focus]:bg-gray-100 data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                          2023
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-white data-[focus]:bg-gray-100 data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                          2024
                        </a>
                      </MenuItem>

                      <form action="#" method="POST">
                        <MenuItem>
                          <button
                            type="submit"
                            className="block w-full px-4 py-2 text-left text-sm text-white data-[focus]:bg-gray-100 data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                            Sign out
                          </button>
                        </MenuItem>
                      </form>
                    </div>
                  </MenuItems>
                </Menu>
                {/* dropdown filter tahun end */}

                {/* dropdown Filter end */}
              </div>

              {/* card start */}
              <div>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 max-sm:gap-2 w-full">
                  {/* card yang dibuat perulangan */}
                  {result.map((project) => (
                    <Card
                      key={project.id}
                      id={project.id}
                      dataAos="fade-up"
                      name={project.nama_proyek}
                      imageUrl={project.image[0].link_gambar}
                    />
                  ))}
                </div>
              </div>
              {/* card end */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
