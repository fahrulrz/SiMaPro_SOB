"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import Image from "next/image";

import Aos from "aos";
import "aos/dist/aos.css";

import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

import "@/app/styles/style.css";

import "flowbite";

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
  //   like: Like[];
  //   comment: Comment[];
  year: Year[];
  stakeholder: Stakeholder;
  team: Team;
  categories: Category[];
}

const EditProject: React.FC = () => {
  const router = useRouter();

  //   mengambil id dari params url
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // membuat variabel untuk menyimpan data project
  const [projects, setProjects] = useState<Project>();
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(!isSuccess);
    setUpdate(false);
    setTimeout(() => {
      setIsSuccess(false);
      router.push(`/home/project?id=${id}`);
    }, 5000);
  };

  const handleUpdate = () => {
    setUpdate(!update);
  };

  console.log(error);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/projects/${id}`) // api mengambil detail project berdasarkan id
      .then((response) => {
        setProjects(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

  const [selectedItem, setSelectedItem] = useState<NavigationItem | null>(null);

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

  const handleSelect = (item: NavigationItem) => {
    setSelectedItem(item);
  };

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const navigationItems: NavigationItem[] = [
    { id: 1, name: "Projek Aplikasi Dasar 1" },
    { id: 2, name: "Projek Aplikasi Dasar 2" },
  ];

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

  Aos.init();

  // Menangani submit form
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/home/project?id=${id}`);
  };

  return (
    <div>
      <div className="px-36 py-20 max-sm:px-4 max-sm:py-6">
        <form
          onSubmit={submitHandler}
          method="post"
          className="flex flex-col gap-4 h-full px-10 max-sm:px-2">
          <div className="flex flex-col gap-4 h-[48rem] max-sm:h-80">
            <div
              data-aos="zoom-in"
              data-aos-duration="800"
              className=" h-full  ">
              <label
                htmlFor="image-upload-1"
                className="bg-inputAddProject relative hover:cursor-pointer w-full font-medium tracking-wide text-xl text-primary h-full justify-center items-center flex">
                {fileUrls[0] ? (
                  <div className="absolute flex w-full h-full">
                    <Image
                      src={fileUrls[0]}
                      alt={selectedFiles[0]?.name || "Uploaded Image"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ) : (
                  <Image
                    src={projects?.image[0].link_gambar}
                    alt={JSON.stringify(projects?.image[0].link_gambar)}
                    layout="fill"
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
                  className="flex flex-auto h-full w-full">
                  <label
                    htmlFor={`image-upload-${index + 2}`}
                    className="bg-inputAddProject hover:cursor-pointer w-full font-medium tracking-wide text-xl text-primary flex justify-center items-center">
                    {fileUrls[index + 1] ? (
                      <div className="absolute flex w-full h-full">
                        <Image
                          src={fileUrls[index + 1]}
                          alt={
                            selectedFiles[index + 1]?.name || "Uploaded Image"
                          }
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    ) : (
                      <Image
                        src={projects?.image[index + 1].link_gambar}
                        alt={JSON.stringify(
                          projects?.image[index + 1].link_gambar
                        )}
                        layout="fill"
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
                  className="flex justify-center items-center text-xl max-sm:py-3 max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md">
                  Project Name
                </label>
                <input
                  id="project-name"
                  type="text"
                  value={projects?.nama_proyek}
                  onChange={(e) => {
                    if (projects) {
                      setProjects({ ...projects, nama_proyek: e.target.value });
                    }
                  }}
                  placeholder="Project Name"
                  className=" placeholder:text-hint max-sm:text-sm text-primary focus:ring-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="selectedProject"
                  className="flex justify-center items-center text-xl max-sm:py-3 max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md">
                  PAD
                </label>
                {/* dropdown jenis pad */}
                <Menu
                  as="div"
                  className="relative insline-block text-left w-full col-span-3">
                  <Menu.Button
                    className={`inline-flex w-full items-center gap-x-1.5 rounded-md bg-white max-sm:py-3 hover:bg-gray-50 px-3 py-2 text-lg max-sm:text-sm text-primary shadow-sm`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    {selectedItem
                      ? selectedItem.name
                      : projects?.categories[0].nama_kategori}{" "}
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
                            } block w-full text-left px-4 py-2 text-lg max-sm:text-sm`}>
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
                  className="flex justify-center items-center text-xl max-sm:py-3 max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md">
                  Year
                </label>
                <input
                  id="year"
                  type="text"
                  value={projects?.year.map((item) => item.tahun).join(", ")}
                  onChange={(e) => {
                    if (projects) {
                      const updatedYears = e.target.value
                        .split(",")
                        .map((year) => ({
                          id: 0, // sesuaikan dengan ID atau biarkan 0 jika tidak digunakan
                          tahun: year.trim(),
                        }));
                      setProjects({ ...projects, year: updatedYears });
                    }
                  }}
                  placeholder="e.g. 2022"
                  className=" placeholder:text-hint text-primary bg-inputAddProject  focus:ring-primary text-lg max-sm:text-sm border-none rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="stakeholder"
                  className="flex justify-center items-center max-sm:py-3 text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md">
                  Stakeholder
                </label>
                <input
                  id="stakeholder"
                  type="text"
                  value={projects?.stakeholder.nama}
                  onChange={(e) => {
                    if (projects) {
                      setProjects({
                        ...projects,
                        stakeholder: {
                          ...projects.stakeholder, // menjaga properti lain
                          nama: e.target.value, // hanya memperbarui nama
                        },
                      });
                    }
                  }}
                  placeholder="Stakeholder"
                  className=" placeholder:text-hint text-primary bg-inputAddProject focus:ring-primary text-lg max-sm:text-sm border-none rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="group-name"
                  className="flex justify-center items-center max-sm:py-3 text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md">
                  Name Group
                </label>
                <input
                  id="group-name"
                  type="text"
                  value={projects?.team.nama_tim}
                  onChange={(e) => {
                    if (projects) {
                      setProjects({
                        ...projects,
                        team: {
                          ...projects.team, // menjaga properti lain
                          nama_tim: e.target.value, // hanya memperbarui nama
                        },
                      });
                    }
                  }}
                  placeholder="Team Name"
                  className=" placeholder:text-hint focus:ring-primary text-primary bg-inputAddProject text-lg max-sm:text-sm border-none rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="description"
                  className="flex justify-center items-center max-sm:py-3 text-xl max-sm:text-sm text-primary font-medium w-full h-fit py-2 bg-inputAddProject col-span-1 rounded-md">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={10}
                  value={projects?.deskripsi}
                  onChange={(e) => {
                    if (projects) {
                      setProjects({
                        ...projects,
                        deskripsi: e.target.value,
                      });
                    }
                  }}
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
              className="bg-primary px-10 py-2 hover:bg-red-500 text-white font-medium rounded-md shadow-lg hover:bg-hoverBtnAddProject">
              Update
            </button>
            <button
              type="button"
              className="bg-white px-10 py-2 text-primary font-medium rounded-md shadow-lg hover:bg-hoverBtnAddProject"
              onClick={() => router.push(`/home/project?id=${id}`)}>
              Cancel
            </button>
          </div>

          {/* modal confirm */}
          {update && (
            <div
              tabIndex={-1}
              className="overflow-y-auto flex bg-black/30 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    //close modal
                    onClick={handleUpdate}>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14">
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
                      viewBox="0 0 20 20">
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
                      type="button"
                      onClick={handleSuccess}
                      className="text-primary bg-white hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-white/30 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                      Yes, It&apos;m sure
                    </button>
                    <button
                      onClick={handleUpdate}
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
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
              className="overflow-y-auto flex bg-black/30 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
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
                      type="submit"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
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
