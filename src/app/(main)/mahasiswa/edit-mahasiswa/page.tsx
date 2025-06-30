"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// import "flowbite";
// import "flowbite/dist/flowbite";

import axios, { AxiosError } from "axios";
import { AddMahasiswa, updateMahasiswa } from "@/lib/Mahasiswa";
import Swal from "sweetalert2";
// import { Modal } from "flowbite";

interface Mahasiswa {
  id: number;
  nama_lengkap: string;
  NIM: string;
  foto: string;
  project: Project[];
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
}

interface FormErrors {
  nama_lengkap?: string;
  NIM?: string;
  foto?: string;
}

const EditMahasiswa = () => {
  const router = useRouter();

  const [mahasiswa, setMahasiswa] = useState<Mahasiswa>();
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [showFailedModal, setShowFailedModal] = useState(false);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingMahasiswa, setIsLoadingMahasiswa] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState<AddMahasiswa>({
    nama_lengkap: "",
    NIM: "",
    foto: null,
  });

  // State untuk menyimpan error validasi
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [id, setId] = useState<string>(" ");

  useEffect(() => {
    const initializeFlowbite = async () => {
      if (typeof window !== "undefined") {
        const { initFlowbite } = await import("flowbite");
        initFlowbite();
      }
    };

    initializeFlowbite();
    const idUrl = window
      ? new URLSearchParams(window.location.search).get("id") || " "
      : " ";
    setId(idUrl);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/mahasiswa/${idUrl}`)
      .then((response) => {
        setIsLoadingMahasiswa(false);
        setMahasiswa(response.data.data);
        setFormData({
          nama_lengkap: response.data.data.nama_lengkap,
          NIM: response.data.data.NIM,
          foto: null,
        });
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  console.log(error);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    // Clear error untuk field yang sedang diubah
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      });
    }

    if (name == "foto") {
      handleFileChange(e);
      setFormData({
        ...formData,
        foto: files ? files[0] : null,
      });
      if (files && files.length > 0) {
        setFileName(files[0].name);
      } else {
        setFileName("Add Foto Profile Mahasiswa");
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Fungsi validasi form
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.nama_lengkap.trim()) {
      errors.nama_lengkap = "*Kolom wajib diisi";
    }

    if (!formData.NIM.trim()) {
      errors.NIM = "*Kolom wajib diisi";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validasi form sebelum submit
    if (!validateForm()) {
      setIsLoadingUpdate(false);
      return;
    }

    toggleModal();
    setIsLoadingUpdate(true);

    const data = new FormData();
    data.append("nama_lengkap", formData.nama_lengkap);
    data.append("NIM", formData.NIM);
    if (formData.foto && formData.foto instanceof File) {
      data.append("foto", formData.foto);
    }
    data.append("_method", "put");

    try {
      const res = await updateMahasiswa(data, mahasiswa?.id as number);
      if (res.status === 200) {
        setIsLoadingUpdate(false);
        toggleModal();
        Swal.fire({
          title: "Update Mahasiswa Success!",
          icon: "success",
          confirmButtonColor: "#1e293b",
          buttonsStyling: false,
          confirmButtonText: `<div class="text-white bg-primary rounded-lg border-2 border-primary hover:border-slate-800"> <a href="/mahasiswa/detail-mahasiswa?id=${res.data.data.id}" class="h-full w-full flex p-3 px-5 justify-center items-center">OK</a></div>`,
        });
      }
    } catch (error: unknown) {
      setIsLoadingUpdate(false);
      const err = error as AxiosError<{
        message: string;
        errors?: Record<string, string[]>;
      }>;

      const errorMessage =
        err?.response?.data?.message || "Gagal upload data. Coba lagi ya.";
      toggleModal();
      setIsLoadingUpdate(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        iconColor: "##f05252",
        background: "#white",
        color: "#000000",
        confirmButtonColor: "#1e293b",
        buttonsStyling: false,
        confirmButtonText: `<div class="text-white hover:bg-white hover:border-primary hover:text-primary border-2 bg-primary p-3 px-5 rounded-lg">OK</div>`,
      });
      console.error("Gagal upload:", error);
    }
  };

  if (isLoadingMahasiswa) {
    return (
      <div className="flex flex-col gap-12 max-sm:gap-6 transition-all ease-in-out px-20 max-sm:px-4 py-10 h-screen justify-center items-center w-screen">
        <div className="text-4xl text-primary font-bold animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (mahasiswa == null) {
    return (
      <div className="flex flex-col gap-12 max-sm:gap-6 transition-all ease-in-out px-20 max-sm:px-4 py-10 h-screen justify-center items-center w-screen ">
        <div className="text-4xl text-primary font-bold animate-pulse">
          Mahasiswa Not Found
        </div>
      </div>
    );
  }

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
              <div>
                <div className="h-6">
                  {formErrors.nama_lengkap && (
                    <div className="text-red-500 text-sm mb-1">
                      {formErrors.nama_lengkap}
                    </div>
                  )}
                </div>
                <div className=" grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="mahasiswaName"
                    className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama
                  </label>
                  <div className="col-span-3">
                    <input
                      id="mahasiswaName"
                      type="text"
                      name="nama_lengkap"
                      value={formData.nama_lengkap || ""}
                      onChange={handleChange}
                      placeholder="Name"
                      className={`placeholder:text-hint text-primary bg-inputAddProject text-lg max-sm:text-base border-none rounded-md p-2 w-full focus:ring-0 ${
                        formErrors.nama_lengkap ? "border-2 border-red-500" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="h-6">
                  {formErrors.NIM && (
                    <div className="text-red-500 text-sm mb-1">
                      {formErrors.NIM}
                    </div>
                  )}
                </div>
                <div className=" grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="nim"
                    className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    NIM
                  </label>
                  <div className="col-span-3">
                    <input
                      id="nim"
                      type="text"
                      name="NIM"
                      value={formData.NIM || ""}
                      onChange={handleChange}
                      placeholder="NIM"
                      className={`placeholder:text-hint text-primary max-sm:text-base bg-inputAddProject text-lg border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full ${
                        formErrors.NIM ? "border-2 border-red-500" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="h-6">
                  {formErrors.foto && (
                    <div className="text-red-500 text-sm mb-1">
                      {formErrors.foto}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="foto"
                    className="flex py-2 justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Foto
                  </label>

                  <div className="relative w-full col-span-3">
                    {/* Placeholder custom */}
                    <span
                      className={`absolute bg-inputAddProject truncate w-full inset-0 flex items-center max-sm:text-sm px-2 text-primary pointer-events-none rounded-md ${
                        formErrors.foto ? "border-2 border-red-500" : ""
                      }`}
                    >
                      {mahasiswa &&
                      fileName === "Add Foto Profile Mahasiswa" ? (
                        <div>{mahasiswa.foto || ""}</div>
                      ) : (
                        <div>{fileName}</div>
                      )}
                    </span>

                    {/* Input file */}
                    <input
                      id="foto"
                      type="file"
                      name="foto"
                      accept="image/*"
                      onChange={handleChange}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 ml-auto">
                <button
                  type="button"
                  data-modal-toggle="popup-modal"
                  data-modal-target="popup-modal"
                  onClick={toggleModal}
                  className="bg-primary px-10 py-2 text-white font-medium rounded-md shadow-lg hover:border-white border-2 border-primary"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-white px-10 py-2 text-primary font-medium rounded-md shadow-lg border-2 border-white hover:border-primary"
                  onClick={() => router.push(`detail-mahasiswa?id=${id}`)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div
            ref={modalRef}
            tabIndex={-1}
            className="overflow-y-auto flex bg-black/30 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                    Are you sure you want to update this mahasiswa? Please check
                    your data first
                  </h3>
                  <button
                    type="submit"
                    className="text-primary bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-white/30 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, I&apos;m sure
                  </button>
                  <button
                    onClick={toggleModal}
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

        <div
          className={`${
            isLoadingUpdate ? "flex animate-zoom-in" : "hidden animate-zoom-out"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="p-10 md:p-14 text-center bg-primary gap-8 flex flex-col justify-center items-center rounded-lg">
            <div className="p-4 md:p-5 text-center flex justify-center">
              <svg
                className="mr-3 size-5 w-12 h-12 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
            <h3 className="mb-5 font-normal text-white text-xl dark:text-gray-400">
              Updating mahasiswa...
            </h3>
          </div>
        </div>

        {/* modal start */}
        {/* <div
          className={`${
            showSuccessModal ? "flex" : "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          onClick={(e) => handleBackdropClick(e, closeSuccessModal)}
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
                  Mahasiswa successfully added!
                </h3>

                <button
                  data-modal-hide="successModal"
                  type="button"
                  onClick={() => router.push("/mahasiswa")}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* modal failed */}
        {/* <div
          id="failedModal"
          tabIndex={-1}
          className={`${
            showFailedModal ? "flex" : "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          onClick={(e) => handleBackdropClick(e, closeFailedModal)}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
              <div className="p-4 md:p-5 text-center">
                <FontAwesomeIcon
                  icon={faXmark}
                  size="6x"
                  className="mx-auto mb-4 text-white w-12 h-12 dark:text-gray-200"
                />
                <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                  Mahasiswa failed to upload!
                </h3>

                <button
                  onClick={closeFailedModal}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </form>
    </>
  );
};

export default EditMahasiswa;
