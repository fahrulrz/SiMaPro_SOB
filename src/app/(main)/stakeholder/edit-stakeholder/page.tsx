"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// import "flowbite";
import axios from "axios";
import { AddStakeholder, updateStakeholder } from "@/lib/Stakeholder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

interface NavigationItem {
  id: number;
  name: string;
}

interface Stakeholder {
  id: number;
  nama: string;
  kategori: string;
  nomor_telepon: string;
  email: string;
  foto: string;
  projects: Project[];
}

interface Image {
  id: number;
  link_gambar: string;
}

interface Project {
  id: number;
  nama_proyek: string;
  logo: string;
  deskripsi: string;
  image: Image[];
}

// Interface untuk validation errors
interface ValidationErrors {
  nama?: string;
  kategori?: string;
  nomor_telepon?: string;
  email?: string;
}

const EditStakeholder = () => {
  const router = useRouter();
  const [fileName, setFileName] = useState<string>(
    "Add Foto Profil Stakeholder"
  );
  const [stakeholder, setStakeholder] = useState<Stakeholder>();
  const [error, setError] = useState(null);
  console.error(error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [showFailedModal, setShowFailedModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // State untuk validation errors
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const [formData, setFormData] = useState<AddStakeholder>({
    nama: "",
    kategori: "",
    nomor_telepon: "",
    email: "",
    foto: null,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [id, setId] = useState<string>(" ");

  useEffect(() => {
    const idUrl = window
      ? new URLSearchParams(window.location.search).get("id") || " "
      : " ";
    setId(idUrl);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/stakeholders/${idUrl}`)
      .then((response) => {
        setStakeholder(response.data.data);
        setFormData({
          nama: response.data.data.nama,
          kategori: response.data.data.kategori,
          nomor_telepon: response.data.data.nomor_telepon,
          email: response.data.data.email,
          foto: null,
        });
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  // Fungsi untuk validasi form
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.nama.trim()) {
      errors.nama = "*Kolom wajib di isi";
    }

    if (!formData.kategori) {
      errors.kategori = "*Kolom wajib di isi";
    }

    if (!formData.nomor_telepon.trim()) {
      errors.nomor_telepon = "*Kolom wajib di isi";
    }

    if (!formData.email.trim()) {
      errors.email = "*Kolom wajib di isi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "*Format email tidak valid";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    // Clear validation error ketika user mulai mengetik
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
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
        setFileName("Add Foto Profil Stakeholder");
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    console.log(formData);
  };

  const [selectedItem, setSelectedItem] = useState<NavigationItem | null>(null);

  const handleSelect = (item: NavigationItem) => {
    setSelectedItem(item);
    setFormData({
      ...formData,
      kategori: item.name,
    });

    // Clear validation error untuk kategori
    if (validationErrors.kategori) {
      setValidationErrors((prev) => ({
        ...prev,
        kategori: undefined,
      }));
    }
  };

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const navigationItems: NavigationItem[] = [
    { id: 1, name: "Internal" },
    { id: 2, name: "Eksternal" },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
    } else {
      setFileName("Add Foto Profil Stakeholder");
    }
  };

  // Modifikasi submitHandler untuk validasi
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validasi form sebelum submit
    if (!validateForm()) {
      return; // Stop jika ada error validasi
    }
    setIsModalOpen(false);
    setIsLoading(true);

    const data = new FormData();
    data.append("nama", formData.nama);
    data.append("kategori", formData.kategori);
    data.append("nomor_telepon", formData.nomor_telepon);
    data.append("email", formData.email);
    if (formData.foto && formData.foto instanceof File) {
      data.append("foto", formData.foto);
    }
    data.append("_method", "put");

    try {
      const res = await updateStakeholder(data, stakeholder?.id as number);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (res.status === 200) {
        setIsLoading(false);
        Swal.fire({
          title: "Update Stakeholder Success!",
          icon: "success",
          confirmButtonColor: "#1e293b",
          buttonsStyling: false,
          confirmButtonText: `<div class="text-white bg-primary p-3 px-5 rounded-lg border-2 border-primary hover:border-slate-800"> <a href="/stakeholder/detail-stakeholder?id=${res.data.data.id}" >OK</a></div>`,
        });
      }
    } catch (error) {
      setIsLoading(false);
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

  // Handler untuk tombol Update - validasi dulu sebelum buka modal
  const handleUpdateClick = () => {
    if (validateForm()) {
      toggleModal();
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
  if (error) {
    return (
      <div className="flex flex-col gap-12 max-sm:gap-6 transition-all ease-in-out px-20 max-sm:px-4 py-10 h-screen justify-center items-center w-screen ">
        <div className="text-4xl text-primary font-bold animate-pulse">
          Stakeholder Not Found
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col p-20 max-sm:p-4 max-sm:py-6 min-h-[55vh] w-full mb-14">
          <div className="flex flex-col gap-5">
            <div className=" flex w-full items-center justify-center">
              <div className="text-4xl font-bold text-primary">
                Profile Stakeholder
              </div>
            </div>
            <div className="w-full mt-8 flex flex-col gap-4 h-full">
              {/* Input Nama */}
              <div className="flex flex-col gap-1">
                {validationErrors.nama && (
                  <span className="text-red-500 text-sm font-medium">
                    {validationErrors.nama}
                  </span>
                )}
                <div className="grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="stakeholderName"
                    className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Nama
                  </label>
                  <input
                    id="stakeholderName"
                    type="text"
                    name="nama"
                    placeholder="Name"
                    value={formData.nama || ""}
                    onChange={handleChange}
                    className={`placeholder:text-hint max-sm:text-base text-primary bg-inputAddProject text-lg border-none rounded-md p-2 w-full col-span-3 focus:ring-0 ${
                      validationErrors.nama ? "border-red-500 border-2" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Input Kategori */}
              <div className="flex flex-col gap-1">
                {validationErrors.kategori && (
                  <span className="text-red-500 text-sm font-medium">
                    {validationErrors.kategori}
                  </span>
                )}
                <div className="grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="selectedProject"
                    className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Kategori
                  </label>
                  <Menu
                    as="div"
                    className="relative insline-block text-left w-full col-span-3"
                  >
                    <Menu.Button
                      className={`inline-flex w-full items-center gap-x-1.5 rounded-md ${selectedItem ? "bg-white" : "bg-primary"}  hover:bg-gray-50 px-3 py-2 text-lg max-sm:text-base ${isHovered ? "text-primary" : `${selectedItem ? "text-primary" : "text-white"}`} shadow-sm ${
                        validationErrors.kategori
                          ? "border-red-500 border-2"
                          : ""
                      }`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      {selectedItem ? selectedItem.name : stakeholder?.kategori}{" "}
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
                              } block w-full text-left px-4 py-2 text-lg max-sm:text-base`}
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
                    value={formData.kategori}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Input Email */}
              <div className="flex flex-col gap-1">
                {validationErrors.email && (
                  <span className="text-red-500 text-sm font-medium">
                    {validationErrors.email}
                  </span>
                )}
                <div className="grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="email"
                    className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className={`placeholder:text-hint text-primary bg-inputAddProject text-lg max-sm:text-base border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full col-span-3 ${
                      validationErrors.email ? "border-red-500 border-2" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Input No Telepon */}
              <div className="flex flex-col gap-1">
                {validationErrors.nomor_telepon && (
                  <span className="text-red-500 text-sm font-medium">
                    {validationErrors.nomor_telepon}
                  </span>
                )}
                <div className="grid grid-cols-4 gap-4 w-full">
                  <label
                    htmlFor="noTelepon"
                    className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                  >
                    No Telepon
                  </label>
                  <input
                    id="noTelepon"
                    type="text"
                    name="nomor_telepon"
                    placeholder="No Telepon"
                    value={formData.nomor_telepon || ""}
                    onChange={handleChange}
                    className={`placeholder:text-hint text-primary bg-inputAddProject text-lg max-sm:text-base border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full col-span-3 ${
                      validationErrors.nomor_telepon
                        ? "border-red-500 border-2"
                        : ""
                    }`}
                  />
                </div>
              </div>

              {/* Input Foto Profil */}
              <div className="grid grid-cols-4 gap-4 w-full h-full">
                <label
                  htmlFor="foto"
                  className="flex py-2 justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                >
                  Foto Profil
                </label>

                <div className="relative w-full col-span-3 ">
                  <span className="absolute bg-inputAddProject w-full max-sm:text-base truncate inset-0 flex items-center pl-2 text-primary pointer-events-none rounded-md">
                    {stakeholder &&
                    fileName === "Add Foto Profil Stakeholder" ? (
                      <div>{stakeholder.foto}</div>
                    ) : (
                      <div>{fileName}</div>
                    )}
                  </span>

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

              <div className="flex gap-4 ml-auto">
                <button
                  type="button"
                  onClick={handleUpdateClick}
                  className="bg-primary px-10 py-2 hover:bg-white hover:text-primary text-white font-medium rounded-md shadow-lg hover:bg-hoverBtnAddProject"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-white px-10 py-2 text-primary hover:bg-primary hover:text-white font-medium rounded-md shadow-lg hover:bg-hoverBtnAddProject"
                  onClick={() =>
                    router.push(`/stakeholder/detail-stakeholder?id=${id}`)
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* confirm modal */}
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
                    Are you sure you want to edit this profile? Any updates made
                    will replace the current profile information.
                  </h3>
                  <button
                    type="button"
                    onClick={submitHandler}
                    className="text-primary bg-white hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-white/30 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
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
              Updating stakeholder...
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
                  Stakeholder successfully updated!
                </h3>

                <button
                  data-modal-hide="successModal"
                  type="button"
                  onClick={() => router.push("/stakeholder")}
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
                  Stakeholder failed to update!
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

export default EditStakeholder;
