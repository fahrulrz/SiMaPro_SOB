"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

import Image from "next/image";

import Aos from "aos";
import "aos/dist/aos.css";

import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import "flowbite";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "@/app/styles/style.css";

interface NavigationItem {
  id: number;
  name: string;
}

const AddProject: React.FC = () => {
  const router = useRouter();
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
    router.push("/home");
  };

  return (
    <div>
      <div className="px-36 py-20">
        <form
          onSubmit={submitHandler}
          method="post"
          className="flex flex-col gap-4 h-full px-10">
          <div className="flex flex-col gap-4 h-[48rem]">
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
                  "Add New File"
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
                      "Add New File"
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
          <div className="mt-16">
            <div className="flex flex-col gap-4 w-full">
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="project-name"
                  className="flex justify-center items-center text-xl text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md">
                  Project Name
                </label>
                <input
                  id="project-name"
                  type="text"
                  placeholder="Project Name"
                  className=" placeholder:text-hint text-primary focus:ring-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="selectedProject"
                  className="flex justify-center items-center text-xl text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md">
                  Proyek Aplikasi Dasar
                </label>
                {/* dropdown jenis pad */}
                <Menu
                  as="div"
                  className="relative insline-block text-left w-full col-span-3">
                  <Menu.Button
                    className={`inline-flex w-full items-center gap-x-1.5 rounded-md ${selectedItem ? "bg-white" : "bg-primary"}  hover:bg-gray-50 px-3 py-2 text-lg ${isHovered ? "text-primary" : `${selectedItem ? "text-primary" : "text-white"}`} shadow-sm`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    {selectedItem ? selectedItem.name : "Select Project"}{" "}
                    <ChevronDownIcon className="h-5 w-5 ms-auto me-0" />
                  </Menu.Button>

                  <Menu.Items className="absolute left-0 z-10 mt-2 w-full bg-primary rounded-md shadow-lg overflow-hidden">
                    {navigationItems.map((item) => (
                      <Menu.Item key={item.id}>
                        {({ active }) => (
                          <button
                            onClick={() => handleSelect(item)}
                            className={`${
                              active ? "bg-gray-100 text-primary" : "text-white"
                            } block w-full text-left px-4 py-2 text-lg`}>
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
                  className="flex justify-center items-center text-xl text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md">
                  Year
                </label>
                <input
                  id="year"
                  type="text"
                  placeholder="e.g. 2022"
                  className=" placeholder:text-hint text-primary bg-inputAddProject  focus:ring-primary text-lg border-none rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="stakeholder"
                  className="flex justify-center items-center text-xl text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md">
                  Stakeholder
                </label>
                <input
                  id="stakeholder"
                  type="text"
                  placeholder="Stakeholder"
                  className=" placeholder:text-hint text-primary bg-inputAddProject focus:ring-primary text-lg border-none rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="group-name"
                  className="flex justify-center items-center text-xl text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md">
                  Name Group Members
                </label>
                <input
                  id="group-name"
                  type="text"
                  placeholder="Team Name"
                  className=" placeholder:text-hint focus:ring-primary text-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="description"
                  className="flex justify-center items-center text-xl text-primary font-medium w-full h-fit py-2 bg-inputAddProject col-span-1 rounded-md">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={10}
                  className=" placeholder:text-hint text-primary focus:ring-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full col-span-3"
                  placeholder="Add your project description here"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 ml-auto">
            <button
              type="button"
              data-modal-toggle="defaultModal"
              data-modal-target="defaultModal"
              className="bg-primary px-10 py-2 text-white font-medium rounded-md shadow-lg hover:bg-hoverBtnAddProject">
              Submit
            </button>
            <button
              type="button"
              className="bg-white px-10 py-2 text-primary font-medium rounded-md shadow-lg hover:bg-hoverBtnAddProject"
              onClick={() => router.push("/home")}>
              Cancel
            </button>
          </div>

          {/* modal confirm */}
          <div
            id="defaultModal"
            tabIndex={-1}
            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  //close modal
                  data-modal-hide="defaultModal">
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
                    Are you sure you want to add this project? Please review all
                    project details before proceeding.
                  </h3>
                  <button
                    data-modal-hide="defaultModal"
                    data-modal-toggle="successModal"
                    data-modal-target="successModal"
                    type="button"
                    className="text-primary bg-white hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-white/30 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* modal success */}
          <div
            id="successModal"
            tabIndex={-1}
            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
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
                    data-modal-hide="successModal"
                    type="submit"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
