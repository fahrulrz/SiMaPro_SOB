"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { submitStakeholder } from "@/lib/Stakeholder";
import type { AddStakeholder, Stakeholder } from "@/lib/Stakeholder";
import Swal from "sweetalert2";

interface NavigationItem {
  id: number;
  name: string;
}

interface ValidationErrors {
  nama: string;
  kategori: string;
  email: string;
  nomor_telepon: string;
  foto: string;
}

const AddStakeholder = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<AddStakeholder>({
    nama: "",
    kategori: "",
    nomor_telepon: "",
    email: "",
    foto: null,
  });
  const [fileName, setFileName] = useState<string>(
    "Add Foto Profil Stakeholder"
  );
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [showFailedModal, setShowFailedModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [stakeholder, setStakeholder] = useState<Stakeholder>();

  // State untuk validation errors
  const [errors, setErrors] = useState<ValidationErrors>({
    nama: "",
    kategori: "",
    email: "",
    nomor_telepon: "",
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

  // Fungsi untuk clear error ketika user mulai mengetik
  const clearError = (fieldName: keyof ValidationErrors) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
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
        clearError("foto");
      } else {
        setFileName("Add Foto Profil Stakeholder");
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      // Clear error ketika user mulai mengetik
      clearError(name as keyof ValidationErrors);
    }
    console.log(formData);
  };

  const [selectedItem, setSelectedItem] = useState<NavigationItem | null>(null);

  const handleSelect = (item: NavigationItem) => {
    setSelectedItem(item);
    // Clear error kategori ketika user memilih kategori
    clearError("kategori");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const navigationItems: NavigationItem[] = [
    { id: 1, name: "Internal" },
    { id: 2, name: "Eksternal" },
  ];

  // Fungsi validasi
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      nama: "",
      kategori: "",
      email: "",
      nomor_telepon: "",
      foto: "",
    };

    let isValid = true;

    // Validasi nama
    if (!formData.nama.trim()) {
      newErrors.nama = "*Kolom wajib di isi";
      isValid = false;
    }

    // Validasi kategori
    if (!selectedItem) {
      newErrors.kategori = "*Kolom wajib di isi";
      isValid = false;
    }

    // Validasi email
    if (!formData.email.trim()) {
      newErrors.email = "*Kolom wajib di isi";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "*Format email tidak valid";
      isValid = false;
    }

    // Validasi nomor telepon
    if (!formData.nomor_telepon.trim()) {
      newErrors.nomor_telepon = "*Kolom wajib di isi";
      isValid = false;
    }

    // Validasi foto
    if (!formData.foto) {
      newErrors.foto = "*Kolom wajib di isi";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validasi form sebelum submit
    if (!validateForm()) {
      toggleModal();
      return;
    }

    toggleModal();
    setIsLoading(true);

    const data = new FormData();
    data.append("nama", formData.nama);
    data.append("kategori", selectedItem?.name || "");
    data.append("nomor_telepon", formData.nomor_telepon);
    data.append("email", formData.email);
    data.append("foto", formData.foto as Blob);

    try {
      const res = await submitStakeholder(data);
      if (res.status === 201) {
        setIsLoading(false);
        setStakeholder(res.data.data);
        // setShowSuccessModal(true);
        Swal.fire({
          title: "Upload Stakeholder Success!",
          icon: "success",
          confirmButtonColor: "#1e293b",
          buttonsStyling: false,
          confirmButtonText: `<div class="text-white bg-primary p-3 px-5 rounded-lg border-2 border-primary hover:border-slate-800"> <a href="/stakeholder/detail-stakeholder?id=${res.data.data.id}" >OK</a></div>`,
        });
      }
    } catch (error) {
      toggleModal();
      // setShowFailedModal(true);
      // const errorMessage =
      //   error?.response?.data?.message || "Gagal upload data. Coba lagi ya.";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
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

  // const closeSuccessModal = () => {
  //   setShowSuccessModal(false);
  // };

  // const closeFailedModal = () => {
  //   setShowFailedModal(false);
  // };

  const handleBackdropClick = (e: React.MouseEvent, closeModal: () => void) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col p-20 max-sm:p-4 min-h-[55vh] w-full mb-14">
          <div className="flex flex-col gap-5 max-sm:gap-0">
            <div className=" flex w-full items-center justify-center">
              <div className="text-4xl max-sm:text-3xl font-bold text-primary">
                Profile Stakeholder
              </div>
            </div>
            <div className="w-full mt-8 flex flex-col gap-4 h-full">
              {/* Input Nama */}
              <div className="flex flex-col">
                <div className="h-6">
                  {errors.nama && (
                    <p className="text-red-500 text-sm mb-1">{errors.nama}</p>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="stakeholderName"
                    className="flex py-3 justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama
                  </label>
                  <div className="col-span-3">
                    <input
                      id="stakeholderName"
                      type="text"
                      name="nama"
                      onChange={handleChange}
                      placeholder="Name"
                      className={`placeholder:text-hint py-3 text-primary max-sm:placeholder:text-sm bg-inputAddProject text-lg border-none rounded-md p-2 w-full focus:ring-0 ${
                        errors.nama ? "border-red-500 border-2" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Input Kategori */}
              <div className="flex flex-col">
                <div className="h-6">
                  {errors.kategori && (
                    <p className="text-red-500 text-sm mb-1">
                      {errors.kategori}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="kategori"
                    className="flex py-3 justify-center max-sm:py-3 items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Kategori
                  </label>
                  <div className="col-span-3">
                    <Menu
                      as="div"
                      className="relative insline-block text-left w-full"
                    >
                      <Menu.Button
                        className={`inline-flex w-full py-3 items-center max-sm:py-3 gap-x-1.5 rounded-md ${selectedItem ? "bg-white" : "bg-primary"}  hover:bg-gray-50 px-3 py-2 text-lg max-sm:text-sm ${isHovered ? "text-primary" : `${selectedItem ? "text-primary" : "text-white"}`} shadow-sm ${
                          errors.kategori ? "border-red-500 border-2" : ""
                        }`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        {selectedItem ? selectedItem.name : "Pilih kategori"}
                        <ChevronDownIcon className="h-5 w-5 ms-auto me-0" />
                      </Menu.Button>

                      <Menu.Items className="absolute left-0 z-10 mt-2 w-full bg-primary rounded-md shadow-lg overflow-hidden">
                        {navigationItems.map((item) => (
                          <Menu.Item key={item.id}>
                            {({ active }) => (
                              <button
                                onClick={() => handleSelect(item)}
                                className={`${
                                  active
                                    ? "bg-gray-100 text-primary"
                                    : "text-white"
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
                      name="kategori"
                      onChange={handleChange}
                      value={selectedItem ? selectedItem.name : ""}
                    />
                  </div>
                </div>
              </div>

              {/* Input Email */}
              <div className="flex flex-col">
                <div className="h-6">
                  {errors.email && (
                    <p className="text-red-500 text-sm mb-1">{errors.email}</p>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="email"
                    className="flex py-3 justify-center items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Email
                  </label>
                  <div className="col-span-3">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      placeholder="Email"
                      className={`placeholder:text-hint py-3 text-primary bg-inputAddProject text-lg max-sm:placeholder:text-sm border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full ${
                        errors.email ? "border-red-500 border-2" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Input No Telepon */}
              <div className="flex flex-col">
                <div className="h-6">
                  {errors.nomor_telepon && (
                    <p className="text-red-500 text-sm mb-1">
                      {errors.nomor_telepon}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="noTelepon"
                    className="flex py-3 justify-center items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    No Telepon
                  </label>
                  <div className="col-span-3">
                    <input
                      id="noTelepon"
                      name="nomor_telepon"
                      type="text"
                      onChange={handleChange}
                      placeholder="No Telepon"
                      className={`placeholder:text-hint text-primary bg-inputAddProject py-3 text-lg max-sm:placeholder:text-sm border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full ${
                        errors.nomor_telepon ? "border-red-500 border-2" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Input Foto */}
              <div className="flex flex-col">
                <div className="h-6">
                  {errors.foto && (
                    <p className="text-red-500 text-sm mb-1">{errors.foto}</p>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4 w-full h-full">
                  <label
                    htmlFor="foto"
                    className="flex py-3 justify-center items-center text-xl max-sm:text-sm text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Foto Profil
                  </label>

                  <div className="relative max-sm:col-span-3 col-span-3">
                    <span
                      className={`absolute bg-inputAddProject max-sm:text-sm inset-0 flex items-center pl-2 text-hint pointer-events-none rounded-md ${
                        errors.foto ? "border-red-500 border-2" : ""
                      }`}
                    >
                      {fileName}
                    </span>

                    <input
                      id="foto"
                      name="foto"
                      type="file"
                      onChange={handleChange}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 ml-auto">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-primary px-10 py-2 max-sm:px-7 text-white border-2 border-primary hover:border-white font-medium rounded-md shadow-lg"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-white px-10 py-2 max-sm:px-7 text-primary font-medium rounded-md shadow-lg border-2 border-white hover:border-primary"
                  onClick={() => router.push("/home")}
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
                    Are you sure you want to upload this profile?
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
            isLoading ? "flex animate-zoom-in" : "hidden animate-zoom-out"
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
              Uploading stakeholder...
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
                  Stakeholder successfully added!
                </h3>

                <button
                  data-modal-hide="successModal"
                  type="button"
                  onClick={() =>
                    router.push(
                      "/stakeholder/detail-stakeholder?id=" + stakeholder?.id
                    )
                  }
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
                  Stakeholder failed to upload!
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

export default AddStakeholder;
