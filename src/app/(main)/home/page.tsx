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

import React, { useState, useEffect, useRef, useCallback } from "react";

import axios from "axios";
import { filterProjects } from "@/api/filter";
import { useAuth } from "@/contexts/AuthContext";

interface Image {
  id: number;
  link_gambar: string;
}

interface Project {
  id: number;
  nama_proyek: string;
  image: Image[];
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  console.error(error);

  const [filterPad, setFilterPad] = useState(false);

  const menuRefPad = useRef<HTMLDivElement>(null);
  const menuRefFilter = useRef<HTMLDivElement>(null);

  const [clickFilter, setClickFilter] = useState(false);

  const handleClickFilter = () => {
    setClickFilter(!clickFilter);
  };

  const menuRefYear = useRef<HTMLDivElement>(null);
  const [filterYear, setFilterYear] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/projects`) // api mengambil semua data project
      .then((response) => {
        setProjects(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const toggleFilterPad = () => {
    setFilterPad(!filterPad);
  };

  const toggleFilterYear = () => {
    setFilterYear(!filterYear);
  };

  // filter year
  const [checkedFilterYears, setCheckedFilterYears] = useState<string[]>([]);

  const handleFilterYearChange = (year: string) => {
    if (checkedFilterYears.includes(year)) {
      setCheckedFilterYears(checkedFilterYears.filter((y) => y !== year));
    } else {
      setCheckedFilterYears([...checkedFilterYears, year]);
    }
  };

  // filter pad
  const [checkedFilterPads, setCheckedFilterPads] = useState<string[]>([]);

  const handleFilterPadChange = (pad: string) => {
    if (checkedFilterPads.includes(pad)) {
      setCheckedFilterPads(checkedFilterPads.filter((p) => p !== pad));
    } else {
      setCheckedFilterPads([...checkedFilterPads, pad]);
    }
  };

  // menggunakan filter dengan api
  const filteredProjects = useCallback(async () => {
    try {
      console.info("filter berjalan");
      const data = await filterProjects(checkedFilterPads, checkedFilterYears);
      console.info(data);
      setProjects(data);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }, [checkedFilterPads, checkedFilterYears]);

  /**
   * ! ketika di klik diluar akan otomatis mentup
  
   * TODO: filter year desktop
   */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Jika klik terjadi di luar elemen menuRefYear
      if (
        menuRefYear.current &&
        !menuRefYear.current.contains(event.target as Node)
      ) {
        setFilterYear(false);
        if (checkedFilterYears.length > 0) {
          filteredProjects();
        }
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
  }, [filterYear, checkedFilterYears.length, filteredProjects]);

  // TODO: filter pad desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Jika klik terjadi di luar elemen menuRefPad
      if (
        menuRefPad.current &&
        !menuRefPad.current.contains(event.target as Node)
      ) {
        setFilterPad(false);
        if (checkedFilterPads.length > 0) {
          filteredProjects();
        }
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
  }, [filterPad, checkedFilterPads.length, filteredProjects]);

  // TODO: filter mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Jika klik terjadi di luar elemen menuRef
      if (
        menuRefFilter.current &&
        !menuRefFilter.current.contains(event.target as Node)
      ) {
        setClickFilter(false);
        if (checkedFilterPads.length > 0 && checkedFilterYears.length > 0) {
          filteredProjects();
        }
      }
    };

    if (clickFilter) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [
    clickFilter,
    checkedFilterPads.length,
    checkedFilterYears.length,
    filteredProjects,
  ]);

  return (
    <div className="flex flex-col w-full h-full bg-[#E5E1DA] no-scrollbar mb-20">
      <div className="flex w-full h-full text-black">
        <div className="flex w-full flex-col h-full">
          <div className="items-center w-full h-[42rem] justify-center max-sm:h-[20rem]">
            <Carousel />
          </div>

          <div className="flex flex-col w-full h-fit px-28 max-sm:px-4 mt-10">
            <div className="flex h-20 w-full gap-6 max-sm:h-10 ps-12 max-sm:flex-col max-sm:ps-0 max-sm:relative">
              {/* dropdown filter pad */}
              <div
                ref={menuRefFilter}
                className="sm:hidden w-60 h-full flex max-sm:relative gap-4">
                <div
                  className="btn bg-primary h-ful w-full flex justify-center items-center text-white rounded-[5px] cursor-pointer"
                  onClick={handleClickFilter}>
                  Filter
                </div>

                {/* mobile */}
                {clickFilter && (
                  <div
                    className={`flex max-sm:flex-col w-full sm:hidden max-sm:gap-1 gap-4 max-sm:absolute z-20 mt-11`}>
                    <div
                      ref={menuRefPad}
                      className="relative inline-flex w-full text-left cursor-pointer">
                      <div
                        data-aos="fade-up"
                        data-aos-duration="700"
                        className="flex w-full flex-col">
                        <div
                          className="inline-flex w-full hover:bg-white hover:text-primary h-10  items-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-sm text-white tracking-wide font-bold shadow-sm  transition ease-in-out duration-300"
                          onClick={toggleFilterPad}>
                          <FontAwesomeIcon
                            icon={faFilter}
                            style={{ fontSize: "1rem" }}
                            className="me-2"
                          />
                          Pilih PAD
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            style={{ fontSize: "1rem" }}
                            className={`-mr-1 h-5 w-5 me-0 ms-auto ease-in-out duration-300`}
                          />
                        </div>
                      </div>

                      {filterPad && (
                        <div className="absolute left-full w-24 z-30 ms-2 origin-top-right rounded-md bg-primary text-sm shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                          <div>
                            <form action="#">
                              <div className="py-1">
                                <div>
                                  <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                    <label htmlFor="pad1">PAD 1</label>
                                    <input
                                      type="checkbox"
                                      name="pad1"
                                      id="pad1"
                                      value="PAD1"
                                      onChange={(e) =>
                                        handleFilterPadChange(e.target.value)
                                      }
                                      checked={checkedFilterPads.includes(
                                        "PAD1"
                                      )}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                    <label htmlFor="pad2">PAD 2</label>
                                    <input
                                      type="checkbox"
                                      name="pad2"
                                      id="pad2"
                                      value="PAD2"
                                      onChange={(e) =>
                                        handleFilterPadChange(e.target.value)
                                      }
                                      checked={checkedFilterPads.includes(
                                        "PAD2"
                                      )}
                                    />
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
                      className="relative inline-flex w-full text-left cursor-pointer">
                      <div
                        data-aos="fade-up"
                        data-aos-duration="800"
                        className="flex w-full">
                        <div
                          className="inline-flex w-full hover:bg-white hover:text-primary h-10 items-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-sm text-white tracking-wide font-bold shadow-sm  transition ease-in-out duration-300"
                          onClick={toggleFilterYear}>
                          <FontAwesomeIcon
                            icon={faFilter}
                            style={{ fontSize: "1rem" }}
                            className="me-2"
                          />
                          Pilih Tahun
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            style={{ fontSize: "1rem" }}
                            className={`-mr-1 h-5 w-5 me-0 ms-auto ease-in-out duration-300`}
                          />
                        </div>
                      </div>

                      {filterYear && (
                        <div className="absolute block z-30 left-full ms-2 w-24 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                          <div>
                            <div>
                              <div className="py-1">
                                <div>
                                  <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                    <label htmlFor="2020">2020</label>
                                    <input
                                      type="checkbox"
                                      name="2020"
                                      id="2020"
                                      value="2020"
                                      onChange={(e) =>
                                        handleFilterYearChange(e.target.value)
                                      }
                                      checked={checkedFilterYears.includes(
                                        "2020"
                                      )}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                    <label htmlFor="2021">2021</label>
                                    <input
                                      type="checkbox"
                                      name="2021"
                                      id="2021"
                                      value="2021"
                                      onChange={(e) =>
                                        handleFilterYearChange(e.target.value)
                                      }
                                      checked={checkedFilterYears.includes(
                                        "2021"
                                      )}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                    <label htmlFor="2022">2022</label>
                                    <input
                                      type="checkbox"
                                      name="2022"
                                      id="2022"
                                      value="2022"
                                      onChange={(e) =>
                                        handleFilterYearChange(e.target.value)
                                      }
                                      checked={checkedFilterYears.includes(
                                        "2022"
                                      )}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                    <label htmlFor="2023">2023</label>
                                    <input
                                      type="checkbox"
                                      name="2023"
                                      id="2023"
                                      value="2023"
                                      onChange={(e) =>
                                        handleFilterYearChange(e.target.value)
                                      }
                                      checked={checkedFilterYears.includes(
                                        "2023"
                                      )}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                    <label htmlFor="2024">2024</label>
                                    <input
                                      type="checkbox"
                                      name="2024"
                                      id="2024"
                                      value="2024"
                                      onChange={(e) =>
                                        handleFilterYearChange(e.target.value)
                                      }
                                      checked={checkedFilterYears.includes(
                                        "2024"
                                      )}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                    <label htmlFor="2025">2025</label>
                                    <input
                                      type="checkbox"
                                      name="2025"
                                      id="2025"
                                      value="2025"
                                      onChange={(e) =>
                                        handleFilterYearChange(e.target.value)
                                      }
                                      checked={checkedFilterYears.includes(
                                        "2025"
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* dropdown filter tahun end */}

                    {/* dari admin */}
                    {/* button add start */}
                    {user?.role == "admin" ? (
                      <>
                        <div
                          data-aos="fade-up"
                          data-aos-duration="900"
                          className="flex w-full">
                          <a
                            href="home/project/add-project"
                            className="flex w-full">
                            <button
                              type="submit"
                              className="w-full h-10 bg-primary ps-4 pe-4 shadow-md text-white flex justify-start items-center rounded-[5px] font-bold tracking-wide hover:bg-gray-50 hover:text-primary transition ease-in-out duration-300">
                              <FontAwesomeIcon
                                icon={faFileCirclePlus}
                                style={{ fontSize: "1rem" }}
                                className="me-2"
                              />
                              Add New Project
                            </button>
                          </a>
                        </div>

                        <div
                          data-aos="fade-up"
                          data-aos-duration="1000"
                          className="flex w-full">
                          <a
                            href="mahasiswa/add-mahasiswa"
                            className="flex w-full">
                            <button
                              type="submit"
                              className="w-full h-10 bg-primary ps-4 gap-0 shadow-md text-white flex justify-start items-center rounded-[5px] font-bold tracking-wide hover:bg-gray-50 hover:text-primary transition ease-in-out duration-300">
                              <FontAwesomeIcon
                                icon={faFileCirclePlus}
                                style={{ fontSize: "1rem" }}
                                className="me-2"
                              />
                              Add Profil Mahasiswa
                            </button>
                          </a>
                        </div>

                        <div
                          data-aos="fade-up"
                          data-aos-duration="1100"
                          className="flex w-full">
                          <a
                            className="flex w-full"
                            href="/team/add-profile-team">
                            <button
                              type="submit"
                              className="w-full h-10 bg-primary ps-4 pe-4 shadow-md text-white flex justify-start items-center rounded-[5px] font-bold tracking-wide hover:bg-gray-50 hover:text-primary transition ease-in-out duration-300">
                              <FontAwesomeIcon
                                icon={faFileCirclePlus}
                                style={{ fontSize: "1rem" }}
                                className="me-2"
                              />
                              Add Team
                            </button>
                          </a>
                        </div>

                        <div
                          data-aos="fade-up"
                          data-aos-duration="1200"
                          className="flex w-full">
                          <a
                            href="stakeholder/add-stakeholder"
                            className="flex w-full">
                            <button
                              type="submit"
                              className="w-full h-10 bg-primary ps-4 shadow-md text-white flex justify-start items-center rounded-[5px] font-bold tracking-wide hover:bg-gray-50 hover:text-primary transition ease-in-out duration-300">
                              <FontAwesomeIcon
                                icon={faFileCirclePlus}
                                style={{ fontSize: "1rem" }}
                                className="me-2"
                              />
                              Add Profil Stakeholder
                            </button>
                          </a>
                        </div>
                        {/* admin berakhir */}
                      </>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Desktop */}
              <div className={`flex gap-4 max-sm:hidden`}>
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
                                <input
                                  type="checkbox"
                                  name="pad1"
                                  id="pad1"
                                  value="PAD1"
                                  onChange={(e) =>
                                    handleFilterPadChange(e.target.value)
                                  }
                                  checked={checkedFilterPads.includes("PAD1")}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                <label htmlFor="">PAD 2</label>
                                <input
                                  type="checkbox"
                                  name="pad2"
                                  id="pad2"
                                  value="PAD2"
                                  onChange={(e) =>
                                    handleFilterPadChange(e.target.value)
                                  }
                                  checked={checkedFilterPads.includes("PAD2")}
                                />
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
                                <label htmlFor="2020">2020</label>
                                <input
                                  type="checkbox"
                                  name="2020"
                                  id="2020"
                                  value="2020"
                                  onChange={(e) =>
                                    handleFilterYearChange(e.target.value)
                                  }
                                  checked={checkedFilterYears.includes("2020")}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                <label htmlFor="2021">2021</label>
                                <input
                                  type="checkbox"
                                  name="2021"
                                  id="2021"
                                  value="2021"
                                  onChange={(e) =>
                                    handleFilterYearChange(e.target.value)
                                  }
                                  checked={checkedFilterYears.includes("2021")}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                <label htmlFor="2022">2022</label>
                                <input
                                  type="checkbox"
                                  name="2022"
                                  id="2022"
                                  value={"2022"}
                                  onChange={(e) =>
                                    handleFilterYearChange(e.target.value)
                                  }
                                  checked={checkedFilterYears.includes("2022")}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                <label htmlFor="2023">2023</label>
                                <input
                                  type="checkbox"
                                  name="2023"
                                  id="2023"
                                  value={"2023"}
                                  onChange={(e) =>
                                    handleFilterYearChange(e.target.value)
                                  }
                                  checked={checkedFilterYears.includes("2023")}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                <label htmlFor="2024">2024</label>
                                <input
                                  type="checkbox"
                                  name="2024"
                                  id="2024"
                                  value={"2024"}
                                  onChange={(e) =>
                                    handleFilterYearChange(e.target.value)
                                  }
                                  checked={checkedFilterYears.includes("2024")}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex px-4 py-2 text-sm text-white justify-between items-center data-[focus]:bg-white data-[focus]:text-primary data-[focus]:forced-color-adjust-none data-[focus]:forced-colors:bg-[Highlight] data-[focus]:forced-colors:text-[HighlightText]">
                                <label htmlFor="2025">2025</label>
                                <input
                                  type="checkbox"
                                  name="2025"
                                  id="2025"
                                  value={"2025"}
                                  onChange={(e) =>
                                    handleFilterYearChange(e.target.value)
                                  }
                                  checked={checkedFilterYears.includes("2025")}
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
                {/* dropdown filter tahun end */}
                {user?.role == "admin" ? (
                  <>
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
                  </>
                ) : null}
              </div>

              {/* button add end */}
            </div>

            {/* menampung button diatas */}

            {/* card start */}
            <div className="">
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 max-sm:gap-0 w-full">
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
