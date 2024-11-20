"use client";

// import components
import Carousel from "@/components/MyCarousel";
import Card from "@/components/Card";

import "../../styles/style.css";

// import fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFilter,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

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

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState(null);

  const [filterPad, setFilterPad] = useState(false);

  const menuRefPad = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Jika klik terjadi di luar elemen menuRefPad
      if (
        menuRefPad.current &&
        !menuRefPad.current.contains(event.target as Node)
      ) {
        setFilterPad(false);
      }
    };

    if (filterPad) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [filterPad]);

  const menuRefYear = useRef<HTMLDivElement>(null);
  const [filterYear, setFilterYear] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Jika klik terjadi di luar elemen menuRefYear
      if (
        menuRefYear.current &&
        !menuRefYear.current.contains(event.target as Node)
      ) {
        setFilterYear(false);
      }
    };

    if (filterYear) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [filterYear]);

  useEffect(() => {
    axios

      .get("http://127.0.0.1:8000/api/projects") // api mengambil semua data project
      .then((response) => {
        setProjects(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const toggleFilterPad = () => {
    setFilterPad(!filterPad);
  };

  const toggleFilterYear = () => {
    setFilterYear(!filterYear);
  };

  console.log(projects);
  console.log(error);

  return (
    <div className="flex flex-col w-full h-full bg-[#E5E1DA] no-scrollbar mb-20">
      <div className="flex w-full h-full text-black">
        <div className="flex w-full flex-col h-full">
          <div className="items-center w-full h-[42rem] justify-center">
            <Carousel />
          </div>

          <div className="flex flex-col w-full h-fit px-28 mt-10">
            <div className="flex h-20 w-full gap-6 ps-12">
              {/* dropdown filter pad */}

              <div
                ref={menuRefPad}
                className="relative inline-block w-44 text-left cursor-pointer">
                <div data-aos="fade-up" data-aos-duration="700">
                  <div
                    className="inline-flex w-full hover:bg-white hover:text-primary h-10 items-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-base text-white tracking-wide font-bold shadow-sm  transition ease-in-out duration-300"
                    onClick={toggleFilterPad}>
                    <FontAwesomeIcon
                      icon={faFilter}
                      style={{ fontSize: "1.2rem" }}
                      className="me-2"
                    />
                    Pilih PAD
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      style={{ fontSize: "1.2rem" }}
                      className={`-mr-1 h-5 w-5 me-0 ms-auto ease-in-out duration-300`}
                    />
                  </div>
                </div>

                {filterPad && (
                  <div className="absolute left-0 z-30 mt-2 w-full origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <div>
                      <form action="#">
                        <div className="py-1">
                          <div>
                            <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                              <label htmlFor="pad1">PAD 1</label>
                              <input type="checkbox" name="pad1" id="pad1" />
                            </div>
                          </div>
                          <div>
                            <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                              <label htmlFor="">PAD 2</label>
                              <input type="checkbox" />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
              {/* dropdown Filter pad end */}

              {/* dropdown filter tahun */}

              <div
                ref={menuRefYear}
                className="relative inline-block w-44 text-left cursor-pointer">
                <div data-aos="fade-up" data-aos-duration="700">
                  <div
                    className="inline-flex w-full hover:bg-white hover:text-primary h-10 items-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-base text-white tracking-wide font-bold shadow-sm  transition ease-in-out duration-300"
                    onClick={toggleFilterYear}>
                    <FontAwesomeIcon
                      icon={faFilter}
                      style={{ fontSize: "1.2rem" }}
                      className="me-2"
                    />
                    Pilih Tahun
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      style={{ fontSize: "1.2rem" }}
                      className={`-mr-1 h-5 w-5 me-0 ms-auto ease-in-out duration-300`}
                    />
                  </div>
                </div>

                {filterYear && (
                  <div className="absolute block z-30 left-0 mt-2 w-full origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <div>
                      <form action="#">
                        <div className="py-1">
                          <div>
                            <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                              <label htmlFor="pad1">2020</label>
                              <input type="checkbox" name="pad1" id="pad1" />
                            </div>
                          </div>
                          <div>
                            <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                              <label htmlFor="">2021</label>
                              <input type="checkbox" />
                            </div>
                          </div>
                          <div>
                            <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                              <label htmlFor="pad1">2022</label>
                              <input type="checkbox" name="pad1" id="pad1" />
                            </div>
                          </div>
                          <div>
                            <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                              <label htmlFor="">2023</label>
                              <input type="checkbox" />
                            </div>
                          </div>
                          <div>
                            <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                              <label htmlFor="pad1">2024</label>
                              <input type="checkbox" name="pad1" id="pad1" />
                            </div>
                          </div>
                          <div>
                            <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                              <label htmlFor="">2025</label>
                              <input type="checkbox" />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
              {/* dropdown filter tahun end */}

              {/* button add start */}
              <div data-aos="fade-up" data-aos-duration="800">
                <a href="home/project/add-project">
                  <button
                    type="submit"
                    className="w-fit h-10 bg-primary ps-4 pe-4 shadow-md text-white flex justify-center items-center rounded-[5px] font-bold tracking-wide hover:bg-gray-50 hover:text-primary transition ease-in-out duration-300">
                    <FontAwesomeIcon
                      icon={faFileCirclePlus}
                      style={{ fontSize: "1.2rem" }}
                      className="me-2"
                    />
                    Add New Project
                  </button>
                </a>
              </div>

              <div data-aos="fade-up" data-aos-duration="900">
                <a href="mahasiswa/add-mahasiswa">
                  <button
                    type="submit"
                    className="w-fit h-10 bg-primary ps-4 pe-4 shadow-md text-white flex justify-center items-center rounded-[5px] font-bold tracking-wide hover:bg-gray-50 hover:text-primary transition ease-in-out duration-300">
                    <FontAwesomeIcon
                      icon={faFileCirclePlus}
                      style={{ fontSize: "1.2rem" }}
                      className="me-2"
                    />
                    Add Profil Mahasiswa
                  </button>
                </a>
              </div>

              <div data-aos="fade-up" data-aos-duration="1000">
                <a className="" href="/team/add-profile-team">
                  <button
                    type="submit"
                    className="w-fit h-10 bg-primary ps-4 pe-4 shadow-md text-white flex justify-center items-center rounded-[5px] font-bold tracking-wide hover:bg-gray-50 hover:text-primary transition ease-in-out duration-300">
                    <FontAwesomeIcon
                      icon={faFileCirclePlus}
                      style={{ fontSize: "1.2rem" }}
                      className="me-2"
                    />
                    Add Team
                  </button>
                </a>
              </div>

              <div data-aos="fade-up" data-aos-duration="1100">
                <a href="stakeholder/add-stakeholder">
                  <button
                    type="submit"
                    className="w-fit h-10 bg-primary ps-4 pe-4 shadow-md text-white flex justify-center items-center rounded-[5px] font-bold tracking-wide hover:bg-gray-50 hover:text-primary transition ease-in-out duration-300">
                    <FontAwesomeIcon
                      icon={faFileCirclePlus}
                      style={{ fontSize: "1.2rem" }}
                      className="me-2"
                    />
                    Add Profil Stakeholder
                  </button>
                </a>
              </div>
            </div>

            {/* button add end */}

            {/* card start */}
            <div className="">
              <div className="grid grid-cols-2 gap-4 w-full">
                {/* card yang dibuat perulangan */}
                {projects.map((project) => (
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
  );
}
