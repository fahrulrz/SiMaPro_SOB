"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { submitMahasiswa } from "@/lib/Mahasiswa";
import type { AddMahasiswa } from "@/lib/Mahasiswa";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

const AddMahasiswa = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<AddMahasiswa>({
    nama_lengkap: "",
    NIM: "",
    foto: null,
  });
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [showFailedModal, setShowFailedModal] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);

  // State untuk menyimpan error messages
  const [errors, setErrors] = useState({
    nama_lengkap: "",
    NIM: "",
    foto: "",
  });

  useEffect(() => {
    const initializeFlowbite = async () => {
      if (typeof window !== "undefined") {
        const { initFlowbite } = await import("flowbite");
        initFlowbite();
      }
    };

    initializeFlowbite();

    // if (showFailedModal) {
    //   document.body.style.overflow = "hidden";
    //   document.body.style.paddingRight = "15px";
    // }
    // if (showSuccessModal) {
    //   document.body.style.overflow = "hidden";
    //   document.body.style.paddingRight = "15px";
    // } else {
    //   document.body.style.overflow = "unset";
    //   document.body.style.paddingRight = "0px";
    // }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
      console.log("dipanggil terus");
    };
  }, []);

  const [fileName, setFileName] = useState<string>(
    "Add Foto Profile Mahasiswa"
  );

  // Fungsi untuk validasi form
  const validateForm = () => {
    const newErrors = {
      nama_lengkap: "",
      NIM: "",
      foto: "",
    };

    if (!formData.nama_lengkap.trim()) {
      newErrors.nama_lengkap = "*Kolom wajib di isi";
    }

    if (!formData.NIM.trim()) {
      newErrors.NIM = "*Kolom wajib di isi";
    }

    if (!formData.foto) {
      newErrors.foto = "*Kolom wajib di isi";
    }

    setErrors(newErrors);

    // Return true jika tidak ada error
    return !newErrors.nama_lengkap && !newErrors.NIM && !newErrors.foto;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name == "foto") {
      setFormData({
        ...formData,
        foto: files ? files[0] : null,
      });
      if (files && files.length > 0) {
        setFileName(files[0].name);
        // Clear error ketika file dipilih
        setErrors((prev) => ({ ...prev, foto: "" }));
      } else {
        setFileName("Add Foto Profile Mahasiswa");
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      // Clear error ketika user mulai mengetik
      if (value.trim()) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validasi form sebelum submit
    if (!validateForm()) {
      setIsLoadingUpload(false);
      return; // Jangan submit jika ada error
    }

    setIsLoadingUpload(true);
    const data = new FormData();
    data.append("nama_lengkap", formData.nama_lengkap);
    data.append("NIM", formData.NIM);
    if (formData.foto && formData.foto instanceof File) {
      data.append("foto", formData.foto);
    }

    try {
      const res = await submitMahasiswa(data);
      if (res.status === 201) {
        setIsLoadingUpload(false);
        Swal.fire({
          title: "Upload Mahasiswa Success!",
          icon: "success",
          confirmButtonColor: "#1e293b",
          buttonsStyling: false,
          confirmButtonText: `<div class="text-white bg-primary rounded-lg border-2 border-primary hover:border-slate-800"> <a href="/mahasiswa/detail-mahasiswa?id=${res.data.data.id}" class="h-full w-full flex p-3 px-5 justify-center items-center" >OK</a></div>`,
        });
      }
    } catch (error: unknown) {
      setIsLoadingUpload(false);

      const err = error as AxiosError<{
        message: string;
        errors?: Record<string, string[]>;
      }>;

      const errorMessage =
        err?.response?.data?.message || "Gagal upload data. Coba lagi ya.";
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
      // setShowFailedModal(true);
      console.error("Gagal upload:", error);
    }
  };

  // const closeSuccessModal = () => {
  //   setShowSuccessModal(false);
  // };

  // const closeFailedModal = () => {
  //   setShowFailedModal(false);
  // };

  // const handleBackdropClick = (e: React.MouseEvent, closeModal: () => void) => {
  //   if (e.target === e.currentTarget) {
  //     closeModal();
  //   }
  // };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col p-20 max-sm:p-4 min-h-[55vh] w-full mb-14">
          <div className="flex flex-col gap-5">
            <div className=" flex w-full items-center justify-center">
              <div className="text-4xl font-bold text-primary">
                Profil Mahasiswa
              </div>
            </div>
            <div className="w-full mt-8 flex flex-col gap-4 h-full">
              {/* Input Nama */}
              <div className="flex flex-col gap-1">
                {errors.nama_lengkap && (
                  <span className="text-red-500 text-sm font-medium">
                    {errors.nama_lengkap}
                  </span>
                )}
                <div className="grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="mahasiswaName"
                    className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama
                  </label>
                  <input
                    id="mahasiswaName"
                    type="text"
                    name="nama_lengkap"
                    placeholder="Name"
                    value={formData.nama_lengkap}
                    onChange={handleChange}
                    className={`placeholder:text-hint text-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full col-span-3 focus:ring-0 ${
                      errors.nama_lengkap ? "border-2 border-red-500" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Input NIM */}
              <div className="flex flex-col gap-1">
                {errors.NIM && (
                  <span className="text-red-500 text-sm font-medium">
                    {errors.NIM}
                  </span>
                )}
                <div className="grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="nim"
                    className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    NIM
                  </label>
                  <input
                    id="nim"
                    type="text"
                    name="NIM"
                    placeholder="NIM"
                    value={formData.NIM}
                    onChange={handleChange}
                    className={`placeholder:text-hint text-primary bg-inputAddProject text-lg max-sm:placeholder:text-base border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full col-span-3 border-2 ${
                      errors.NIM ? "border-2 border-red-500" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Input Foto */}
              <div className="flex flex-col gap-1 h-full">
                {errors.foto && (
                  <span className="text-red-500 text-sm font-medium">
                    {errors.foto}
                  </span>
                )}
                <div className="grid grid-cols-4 gap-4 w-full h-full">
                  <label
                    htmlFor="foto"
                    className="flex py-2 justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Foto
                  </label>

                  <div
                    className={`relative max-sm:col-span-3 col-span-3 ${
                      errors.foto ? "border-2 border-red-500 rounded-md " : ""
                    }`}
                  >
                    {/* Placeholder custom */}
                    <span className="absolute bg-inputAddProject inset-0 max-sm:placeholder:text-base flex items-center pl-2 text-hint pointer-events-none rounded-md">
                      {fileName}
                    </span>

                    {/* Input file */}
                    <input
                      id="foto"
                      name="foto"
                      type="file"
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
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                  className="bg-primary px-10 py-2 text-white font-medium rounded-md shadow-lg hover:bg-border-white border-2 border-primary"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-white px-10 py-2 text-primary font-medium rounded-md shadow-lg hover:bg-hoverBtnAddProject"
                  onClick={() => router.push("/home")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          id="popup-modal"
          tabIndex={-1}
          className="hidden overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                data-modal-hide="popup-modal"
                className="absolute top-3 end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                  Are you sure you want to add this profile? Please check all
                  information before continuing.
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="submit"
                  className="text-primary bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-white/30 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, Im sure
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  onClick={() => console.log("tombol cancel di klik")}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            isLoadingUpload ? "flex animate-zoom-in" : "hidden animate-zoom-out"
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
              Uploading mahasiswa...
            </h3>
          </div>
        </div>

        {/* modal success */}
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

export default AddMahasiswa;
