"use client";

import React, { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
// import "flowbite";
// import "flowbite/dist/flowbite";

import axios from "axios";
import { AddMahasiswa, updateMahasiswa } from "@/lib/Mahasiswa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
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

const EditMahasiswa = () => {
  const router = useRouter();

  const [mahasiswa, setMahasiswa] = useState<Mahasiswa>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState<AddMahasiswa>({
    nama_lengkap: "",
    NIM: "",
    foto: null,
  });

  const [id, setId] = useState<string>(" ");

  useEffect(() => {
    const idUrl = window
      ? new URLSearchParams(window.location.search).get("id") || " "
      : " ";
    setId(idUrl);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/mahasiswa/${idUrl}`)
      .then((response) => {
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

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const toggleModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

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

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData();
    data.append("nama_lengkap", formData.nama_lengkap);
    data.append("NIM", formData.NIM);
    if (formData.foto && formData.foto instanceof File) {
      data.append("foto", formData.foto);
    }
    data.append("_method", "put");

    try {
      const res = await updateMahasiswa(data, mahasiswa?.id as number);
      console.log("Berhasil Update:", res);
      setShowSuccessModal(true);
      console.log("Berhasil upload:", res);
    } catch (error) {
      setShowFailedModal(true);
      console.error("Gagal upload:", error);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const closeFailedModal = () => {
    setShowFailedModal(false);
  };

  const handleBackdropClick = (e: React.MouseEvent, closeModal: () => void) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
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
                  className="flex justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                >
                  Nama
                </label>
                <input
                  id="mahasiswaName"
                  type="text"
                  name="nama_lengkap"
                  value={formData.nama_lengkap || ""}
                  onChange={handleChange}
                  placeholder="Name"
                  className=" placeholder:text-hint text-primary bg-inputAddProject text-lg max-sm:text-base border-none rounded-md p-2 w-full col-span-3 focus:ring-0"
                />
              </div>
              <div className=" grid grid-cols-4 gap-4 w-full">
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
                  value={formData.NIM || ""}
                  onChange={handleChange}
                  placeholder="NIM"
                  className=" placeholder:text-hint text-primary max-sm:text-base bg-inputAddProject text-lg border-none focus:outline-none focus:ring-0 focus:ring-[var(--border)] rounded-md p-2 w-full col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 w-full h-full">
                <label
                  htmlFor="foto"
                  className="flex py-2 justify-center items-center text-xl max-sm:text-base text-primary font-medium w-full bg-inputAddProject col-span-1 rounded-md"
                >
                  Foto
                </label>

                <div className="relative w-full col-span-3">
                  {/* Placeholder custom */}
                  <span className="absolute bg-inputAddProject truncate w-full inset-0 flex items-center max-sm:text-sm px-2 text-primary pointer-events-none rounded-md">
                    {mahasiswa && fileName === "Add Foto Profile Mahasiswa" ? (
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
                    // value={mahasiswa?.foto || ""}
                    onChange={handleChange}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex gap-4 ml-auto">
                <button
                  type="button"
                  onClick={submitHandler}
                  className="bg-primary px-10 py-2 text-white font-medium rounded-md shadow-lg hover:bg-green-400"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-white px-10 py-2 text-primary font-medium rounded-md shadow-lg hover:bg-hoverBtnAddProject"
                  onClick={() => router.push(`detail-mahasiswa?id=${id}`)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* modal start */}

        <div
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
        </div>

        {/* modal failed */}
        <div
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
        </div>
      </form>
    </>
  );
};

export default EditMahasiswa;
