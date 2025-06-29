"use client";

// import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Card from "@/components/Card";

import Swal from "sweetalert2";

// import gambar from "../../../../../public/assets/photoProfile.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import myImageLoader from "@/lib/loader";
import { useAuth } from "@/contexts/AuthContext";
import { deleteMahasiswa } from "@/lib/Mahasiswa";

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

const DetailMahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa>();
  const { user } = useAuth();
  const [error, setError] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMahasiswa, setIsLoadingMahasiswa] = useState(true);

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
        setIsLoadingMahasiswa(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  console.log(error);

  const hanfleDelete = async (id: number) => {
    setIsLoading(true);
    setConfirmDelete(false);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const res = await deleteMahasiswa(id);
      if (res.status === 200) {
        setIsLoading(false);
        setConfirmDelete(false);
        Swal.fire({
          title: "Delete Mahasiswa Success!",
          icon: "success",
          confirmButtonColor: "#1e293b",
          buttonsStyling: false,
          confirmButtonText: `<div class="text-white bg-primary p-3 px-5 rounded-lg border-2 border-primary hover:border-slate-800"> <a href="/mahasiswa" >OK</a></div>`,
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      setConfirmDelete(false);
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
      console.log(error);
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
      <div className="flex w-screen max-sm:flex-col">
        <div className="bg-[#FBF9F1] flex p-8 max-sm:p-2 left-0 flex-col w-2/5 max-sm:w-full ustify-center items-center">
          <div className="flex flex-col mt-7 items-center justify-center">
            <div className="text-4xl flex justify-center items-center text-primary">
              Mahasiswa
            </div>
            <div
              className={`${mahasiswa?.foto ? "" : "animate-pulse"}bg-gray-700 flex flex-col mt-10`}
            >
              <div className="flex relative h-[30rem] max-sm:h-96 w-96 max-sm:w-72">
                <Image
                  loader={myImageLoader}
                  src={mahasiswa?.foto || ""}
                  alt="Picture of the author"
                  layout="fill"
                  objectFit="cover"
                  sizes="80vh"
                />
              </div>
            </div>
            <div className="w-fit mt-10 text-xl max-sm:text-base max-sm:w-full flex flex-col text-primary">
              <div className="grid grid-cols-12">
                <div className="col-span-3">Nama</div>
                <div className="flex justify-center">:</div>
                <div className="col-span-6">{mahasiswa?.nama_lengkap}</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-3">NIM</div>
                <div className="flex items-center justify-center">:</div>
                <div className="col-span-7">{mahasiswa?.NIM}</div>
              </div>
            </div>
            {user?.role == "admin" ? (
              <div className="gap-4 mt-10 w-full grid grid-cols-2 px-24 max-sm:px-8">
                <div>
                  <Link href={`edit-mahasiswa?id=${id}`}>
                    <button className="bg-primary flex w-full text-lg max-sm:text-sm hover:bg-white hover:text-primary items-center gap-3 p-2 max-sm:px-2 max-sm:py-3 px-6 text-white rounded-md">
                      {" "}
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="xl"
                        className="me-2 max-sm:hidden"
                      />
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="lg"
                        className="me-2 sm:hidden"
                      />
                      Edit Profile
                    </button>
                  </Link>
                </div>
                <div>
                  <div
                    onClick={() => setConfirmDelete(true)}
                    className="bg-primary w-full flex text-lg max-sm:text-sm max-sm:px-2 cursor-pointer hover:bg-white hover:text-primary items-center gap-3 p-2 px-6 max-sm:py-3 text-white rounded-md"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="xl"
                      className="max-sm:hidden"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="lg"
                      className="sm:hidden"
                    />
                    Delete Profile
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div
          id="defaultModal"
          tabIndex={-1}
          className={`${
            confirmDelete ? "flex animate-zoom-in" : "hidden animate-zoom-out"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                //close modal
                // data-modal-hide="defaultModal"
                onClick={() => setConfirmDelete(false)}
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
                  Are you sure you want to delete this mahasiswa? Please make
                  sure you have saved the data before deleting.
                </h3>
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  onClick={() => hanfleDelete(mahasiswa?.id as number)}
                  className="text-primary bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-white/30 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, Im sure
                </button>
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-primary focus:outline-none bg-white rounded-lg hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>

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
              Deleteing...
            </h3>
          </div>
        </div>

        <div className="h-screen flex flex-col w-3/5 max-sm:w-full px-20 max-sm:px-4 py-14">
          <div>
            <div className="text-2xl text-primary font-bold">List Project</div>
            <div className="flex h-[80vh] overflow-scroll">
              <div className=" flex flex-col gap-4 w-full overflow-y-scroll max-sm:overflow-y-visible h-full container">
                {mahasiswa?.project == null ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-4xl text-black">Belum ada projek</div>
                  </div>
                ) : mahasiswa?.project?.length > 0 ? (
                  mahasiswa?.project?.map((project) => (
                    <Card
                      key={project.id}
                      id={project.id}
                      dataAos=""
                      name={project.nama_proyek}
                      imageUrl={project.image[0]?.link_gambar}
                    />
                  ))
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-4xl text-black">Belum ada projek</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailMahasiswa;
