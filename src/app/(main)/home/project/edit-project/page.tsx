"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import React from "react";

import Image from "next/image";

// import Aos from "aos";
import "aos/dist/aos.css";

import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

import "@/app/styles/style.css";
import { searchStakeholder } from "@/lib/Stakeholder";
import SearchResult from "@/components/SearchResult";
import { updateProject } from "@/lib/Project";
import { searchTeam } from "@/lib/Team";

// import "flowbite";

interface NavigationItem {
  id: number;
  name: string;
}

// interface unutk menyimpan data project
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
  nama_tim: string;
  team_member: AnggotaTeam[];
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
  member: Anggota;
}

interface Image {
  id: number;
  link_gambar: string;
}

interface Project {
  id: number;
  nama_proyek: string;
  deskripsi: string;
  image: Image[];
  year: Year[];
  stakeholder: Stakeholder;
  team: Team;
  categories: Category[];
}

const EditProject: React.FC = () => {
  const router = useRouter();

  //   mengambil id dari params url
  const [id, setId] = useState<string>(" ");
  const [isLoading, setIsLoading] = useState(true);
  // membuat variabel untuk menyimpan data project
  const [projects, setProjects] = useState<Project>();
  // const [stakeholder, setStakeholder] = useState<string>();
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>();
  const [stakeholderKeyword, setStakeholderKeyword] = useState<string>("");
  const [error, setError] = useState(null);
  // const successModalRef = useRef<HTMLDivElement | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [update, setUpdate] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeStakeholder, setActiveStakeholder] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    stakeholder: 0,
    team: 0,
    year: 0,
    description: "",
    projectCategory: 0,
  });
  const [selectedItem, setSelectedItem] = useState<NavigationItem | null>(null);

  // Team
  const [activeTeam, setActiveTeam] = useState(false);
  const [teams, setTeams] = useState<Team[]>();
  const [teamKeyword, setTeamKeyword] = useState<string>("");

  // State untuk menyimpan file dan URL file untuk setiap input
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [fileUrls, setFileUrls] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  useEffect(() => {
    const idUrl = window
      ? new URLSearchParams(window.location.search).get("id") || " "
      : " ";
    setId(idUrl);

    if (!isLoading || !idUrl) {
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setIsLoading(true);

    console.log("use effect berjalan lagi");

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/projects/${idUrl}`) // api mengambil detail project berdasarkan id
      .then((response) => {
        const images = response.data.data.image;
        setProjects(response.data.data);
        setStakeholderKeyword(response.data.data.stakeholder.nama);
        setTeamKeyword(response.data.data.team.nama_tim);
        setIsLoading(false);
        setFormData({
          projectName: response.data.data.nama_proyek,
          stakeholder: response.data.data.stakeholder.id,
          team: response.data.data.team.id,
          year: response.data.data.year[0].tahun,
          description: response.data.data.deskripsi,
          projectCategory: response.data.data.categories[0].id,
        });
        setFileUrls(
          Array.from({ length: 5 }).map(
            (_, i) => images[i]?.link_gambar ?? null
          )
        );
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [isLoading]);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  console.log(error);

  const handleSelect = (item: NavigationItem) => {
    setFormData({ ...formData, projectCategory: item.id });
    setSelectedItem(item);
  };

  const navigationItems: NavigationItem[] = [
    { id: 1, name: "Projek Aplikasi Dasar 1" },
    { id: 2, name: "Projek Aplikasi Dasar 2" },
  ];

  const convertUrlsToFiles = async (urls: (string | null)[]) => {
    return Promise.all(
      urls.map(async (url) => {
        if (!url) return null;

        try {
          const res = await fetch(
            `/api/image-proxy?url=${encodeURIComponent(url)}`
          );
          if (!res.ok) throw new Error("Failed to fetch image");

          const blob = await res.blob();
          return new File([blob], "image.jpg", { type: blob.type });
        } catch (err) {
          console.error("Gagal convert URL jadi file:", err);
          return null;
        }
      })
    );
  };

  // Menangani perubahan file untuk input file tertentu
  const handleFileChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      if (files && files.length > 0) {
        const file = files[0];
        const newSelectedFiles = [...selectedFiles];
        const newFileUrls = [...fileUrls];

        newSelectedFiles[index] = file; // Simpan file yang dipilih
        newFileUrls[index] = URL.createObjectURL(file); // Buat URL sementara dan simpan

        setSelectedFiles(newSelectedFiles);
        setFileUrls(newFileUrls);
      }
    };

  if (typeof window != "undefined") {
    import("aos").then((Aos) => {
      Aos.init();
    });
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name == "stakeholder") {
      setStakeholderKeyword(value);
      console.log("stakeholder ->", value);

      if (value == "") {
        setActiveStakeholder(false);
        // Clear timeout jika ada
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
          searchTimeoutRef.current = null;
        }
        return;
      }

      // Clear timeout sebelumnya
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Set timeout baru dengan delay 500ms
      searchTimeoutRef.current = setTimeout(() => {
        searchStakeholder(value)
          .then((data) => {
            setStakeholders(data);
            setActiveStakeholder(true);
          })
          .catch((err) => {
            setError(err);
          });
      }, 500);
    } else if (name == "team") {
      setTeamKeyword(value);

      if (value == "") {
        setActiveTeam(false);
        // Clear timeout jika ada
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
          searchTimeoutRef.current = null;
        }
        return;
      }

      // Clear timeout sebelumnya
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        searchTeam(value)
          .then((data) => {
            setTeams(data);
            setActiveTeam(true);
          })
          .catch((err) => {
            setError(err);
          });
      }, 500);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleClick = (name: string, id: number, fullName: string) => {
    if (name == "stakeholder") {
      setActiveStakeholder(false);
      setFormData({
        ...formData,
        stakeholder: id,
      });
      setStakeholderKeyword(fullName);
      setStakeholders([]);
    } else if (name == "team") {
      setActiveTeam(false);
      setFormData({
        ...formData,
        team: id,
      });
      setTeamKeyword(fullName);
      setTeams([]);
    }
  };

  // Aos.init();

  // Menangani submit form
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = new FormData();
    data.append("nama_proyek", formData.projectName);
    data.append("stakeholder_id", formData.stakeholder.toString());
    data.append("team_id", formData.team.toString());
    data.append("year", formData.year.toString());
    data.append("deskripsi", formData.description);
    data.append("category_project", formData.projectCategory.toString());
    data.append("_method", "put");

    const fetchedOldFiles = await convertUrlsToFiles(fileUrls);

    for (let i = 0; i < 5; i++) {
      const file = selectedFiles[i] ?? fetchedOldFiles[i];
      if (file) {
        data.append("images[]", file);
      }
    }

    console.log("Isi FormData:");
    console.log(Array.from(data.entries()));

    try {
      const res = await updateProject(data, projects?.id as number);
      setIsSuccess(!isSuccess);
      setUpdate(false);
      console.log("berhasil upload project", res);
    } catch (error) {
      console.log("gagal upload project", error);
    }
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

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div className="px-36 py-20 max-sm:px-4 max-sm:py-6">
        <form
          onSubmit={submitHandler}
          method="post"
          className="flex flex-col gap-4 h-full px-10 max-sm:px-2"
        >
          <div className="flex flex-col gap-4 h-[48rem] max-sm:h-80">
            <div
              data-aos="zoom-in"
              data-aos-duration="800"
              className=" h-full  "
            >
              <label
                htmlFor="image-upload-1"
                className="bg-inputAddProject relative hover:cursor-pointer w-full font-medium tracking-wide text-xl text-primary h-full justify-center items-center flex"
              >
                {fileUrls[0] ? (
                  <div className="absolute flex w-full h-full">
                    <Image
                      src={fileUrls[0]}
                      alt={selectedFiles[0]?.name || "Uploaded Image"}
                      layout="fill"
                      unoptimized
                      objectFit="cover"
                    />
                  </div>
                ) : (
                  <Image
                    src={projects?.image[0].link_gambar || ""}
                    alt={JSON.stringify(projects?.image[0].link_gambar)}
                    layout="fill"
                    unoptimized
                    objectFit="cover"
                  />
                )}
              </label>
              <input
                id="image-upload-1"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange(0)}
              />
            </div>
            <div className="flex gap-4 w-full h-2/5 columns-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  className="flex flex-auto h-full w-full"
                >
                  <label
                    htmlFor={`image-upload-${index + 2}`}
                    className="bg-inputAddProject hover:cursor-pointer w-full font-medium tracking-wide text-xl text-primary flex justify-center items-center"
                  >
                    {fileUrls[index + 1] ? (
                      <div className="absolute flex w-full h-full">
                        <Image
                          src={fileUrls[index + 1] || ""}
                          alt={
                            selectedFiles[index + 1]?.name || "Uploaded Image"
                          }
                          layout="fill"
                          unoptimized
                          objectFit="cover"
                        />
                      </div>
                    ) : (
                      <Image
                        src={projects?.image[index + 1]?.link_gambar || ""}
                        alt={JSON.stringify(
                          projects?.image[index + 1]?.link_gambar
                        )}
                        layout="fill"
                        unoptimized
                        objectFit="cover"
                      />
                    )}
                  </label>
                  <input
                    id={`image-upload-${index + 2}`}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange(index + 1)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 max-sm:mt-4">
            <div className="flex flex-col gap-4 w-full">
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="project-name"
                  className="flex justify-center items-center text-xl max-sm:py-3 max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                >
                  Project Name
                </label>
                <input
                  id="project-name"
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="Project Name"
                  className=" placeholder:text-hint max-sm:text-sm text-primary focus:ring-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="selectedProject"
                  className="flex justify-center items-center text-xl max-sm:py-3 max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                >
                  PAD
                </label>
                {/* dropdown jenis pad */}
                <Menu
                  as="div"
                  className="relative insline-block text-left w-full col-span-3"
                >
                  <Menu.Button
                    className={`inline-flex w-full items-center gap-x-1.5 rounded-md bg-white max-sm:py-3 hover:bg-gray-50 px-3 py-2 text-lg max-sm:text-sm text-primary shadow-sm`}
                    // onMouseEnter={() => setIsHovered(true)}
                    // onMouseLeave={() => setIsHovered(false)}
                  >
                    {selectedItem
                      ? selectedItem.name
                      : projects?.categories[0].nama_kategori}
                    {""}
                    <ChevronDownIcon className="h-5 w-5 ms-auto me-0 " />
                  </Menu.Button>

                  <Menu.Items className="absolute left-0 z-10 mt-2 w-full bg-primary rounded-md shadow-lg overflow-hidden">
                    {navigationItems.map((item) => (
                      <Menu.Item key={item.id}>
                        {({ active }) => (
                          <button
                            onClick={() => handleSelect(item)}
                            className={`${
                              active ? "bg-gray-100 text-primary" : "text-white"
                            } block w-full text-left px-4 py-2 text-lg max-sm:text-sm`}
                          >
                            {item.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
                <input
                  type="hidden"
                  name="selectedProject"
                  value={selectedItem ? selectedItem.name : ""}
                />
              </div>
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="year"
                  className="flex justify-center items-center text-xl max-sm:py-3 max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                >
                  Year
                </label>
                <input
                  id="year"
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g. 2022"
                  className=" placeholder:text-hint text-primary bg-inputAddProject  focus:ring-primary text-lg max-sm:text-sm border-none rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="stakeholder"
                  className="flex justify-center items-center max-sm:py-3 text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                >
                  Stakeholder
                </label>
                <input
                  id="stakeholder"
                  type="text"
                  name="stakeholder"
                  value={stakeholderKeyword != "" ? stakeholderKeyword : ""}
                  placeholder="Stakeholder"
                  onChange={handleChange}
                  className=" placeholder:text-hint text-primary bg-inputAddProject focus:ring-primary text-lg max-sm:text-sm border-none rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className="w-full  -mt-3 relative">
                <div className=" grid grid-cols-4 gap-4 bg-red-400 absolute top-0 left-0 w-full h-full">
                  <div className="col-span-1"></div>
                  <div className="text-primary bg-inputAddProject text-lg border-none rounded-md w-full col-span-3 focus:ring-0">
                    {activeStakeholder && stakeholderKeyword != "" ? (
                      stakeholders && stakeholders.length > 0 ? (
                        stakeholders.map((stakeholder) => (
                          <div
                            onClick={() =>
                              handleClick(
                                "stakeholder",
                                stakeholder.id,
                                stakeholder.nama
                              )
                            }
                            key={stakeholder.id}
                          >
                            <SearchResult name={stakeholder.nama} />
                          </div>
                        ))
                      ) : (
                        <div>
                          <SearchResult name="No Stakeholder Found" />
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="group-name"
                  className="flex justify-center items-center max-sm:py-3 text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                >
                  Name Group
                </label>
                <input
                  id="group-name"
                  type="text"
                  value={formData.team}
                  name="team"
                  onChange={handleChange}
                  placeholder="Team Name"
                  className=" placeholder:text-hint focus:ring-primary text-primary bg-inputAddProject text-lg max-sm:text-sm border-none rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className="w-full -mt-3 relative">
                <div className=" grid grid-cols-4 gap-4 bg-red-400 absolute top-0 left-0 w-full h-full">
                  <div className="col-span-1"></div>
                  <div className="text-primary bg-inputAddProject text-lg border-none rounded-md w-full col-span-3 focus:ring-0">
                    {activeTeam && teamKeyword != "" ? (
                      teams && teams.length > 0 ? (
                        teams.map((team) => (
                          <div
                            onClick={() =>
                              handleClick("team", team.id, team.nama_tim)
                            }
                            key={team.id}
                          >
                            <SearchResult name={team.nama_tim} />
                          </div>
                        ))
                      ) : (
                        <div>
                          <SearchResult name="No teams Found" />
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="description"
                  className="flex justify-center items-center max-sm:py-3 text-xl max-sm:text-sm text-primary font-medium w-full h-fit py-2 bg-inputAddProject col-span-1 rounded-md"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={10}
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                  className=" placeholder:text-hint text-primary focus:ring-primary bg-inputAddProject text-lg max-sm:text-sm border-none rounded-md p-2 w-full col-span-3"
                  placeholder="Add your project description here"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 ml-auto">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-primary px-10 py-2 hover:bg-red-500 text-white font-medium rounded-md shadow-lg hover:bg-hoverBtnAddProject"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-white px-10 py-2 text-primary font-medium rounded-md shadow-lg hover:bg-hoverBtnAddProject"
              onClick={() => router.push(`/home/project?id=${id}`)}
            >
              Cancel
            </button>
          </div>

          {/* modal confirm */}
          {update && (
            <div
              tabIndex={-1}
              className="overflow-y-auto flex bg-black/30 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    //close modal
                    onClick={handleUpdate}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center">
                    <svg
                      className="mx-auto mb-4 text-white w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                      Are you sure you want to edit this profile? Any updates
                      made will replace the current profile information.
                    </h3>
                    <button
                      type="submit"
                      onClick={submitHandler}
                      className="text-primary bg-white hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-white/30 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Yes, It&apos;m sure
                    </button>
                    <button
                      onClick={handleUpdate}
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* modal success */}
          {isSuccess && (
            <div
              id="successModal"
              tabIndex={-1}
              className="overflow-y-auto flex bg-black/30 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
                  <div className="p-4 md:p-5 text-center">
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="6x"
                      className="mx-auto mb-4 text-white w-12 h-12 dark:text-gray-200"
                    />
                    <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                      Your project has been uploaded successfully!
                    </h3>

                    <button
                      onClick={() => router.push(`/home/project?id=${id}`)}
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProject;
