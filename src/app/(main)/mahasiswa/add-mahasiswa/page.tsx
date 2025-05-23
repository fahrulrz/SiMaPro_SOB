"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import "flowbite";

const AddMahasiswa = () => {
  const router = useRouter();

  const [fileName, setFileName] = useState<string>(
    "Add Foto Profile Mahasiswa"
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
    } else {
      setFileName("Add Foto Profile Mahasiswa");
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/home");
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col p-20 max-sm:p-4 h-[55vh] w-full mb-14">
          <div className="flex flex-col gap-5">
            <div className=" flex w-full items-center justify-center">
              <div className="text-4xl font-bold text-primary">
                Profil Mahasiswa
              </div>
            </div>
            <div className="w-full mt-8 flex flex-col gap-4 h-full">
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="mahasiswaName"
                  className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md">
                  Nama
                </label>
                <input
                  id="mahasiswaName"
                  type="text"
                  placeholder="Name   "
                  className=" placeholder:text-hint text-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full col-span-3 focus:ring-0"
                />
              </div>
              <div className=" grid grid-cols-4 gap-4 w-full">
                <label
                  htmlFor="nim"
                  className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md">
                  NIM
                </label>
                <input
                  id="nim"
                  type="text"
                  placeholder="NIM"
                  className=" placeholder:text-hint text-primary bg-inputAddProject text-lg max-sm:placeholder:text-base border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 w-full h-full">
                <label
                  htmlFor="foto"
                  className="flex py-2 justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md">
                  Foto
                </label>

                <div className="relative max-sm:col-span-3">
                  {/* Placeholder custom */}
                  <span className="absolute bg-inputAddProject inset-0 max-sm:placeholder:text-base flex items-center pl-2 text-hint pointer-events-none rounded-md">
                    {fileName}
                  </span>

                  {/* Input file */}
                  <input
                    id="foto"
                    type="file"
                    onChange={handleFileChange}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex gap-4 ml-auto">
                <button
                  type="button"
                  data-modal-toggle="confirmModal"
                  data-modal-target="confirmModal"
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
            </div>
          </div>
        </div>

        <div
          id="confirmModal"
          tabIndex={-1}
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                //close modal
                data-modal-hide="confirmModal">
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
                  Are you sure you want to add this profile? Please check all
                  information before continuing.
                </h3>
                <button
                  data-modal-hide="confirmModal"
                  type="submit"
                  className="text-primary bg-white hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-white/30 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                  Yes, Im sure
                </button>
                <button
                  data-modal-hide="confirmModal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddMahasiswa;
