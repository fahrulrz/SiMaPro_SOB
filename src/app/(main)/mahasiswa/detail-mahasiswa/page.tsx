"use client";

// import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Card from "@/components/Card";

// import gambar from "../../../../../public/assets/photoProfile.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import myImageLoader from "@/lib/loader";

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
  const [error, setError] = useState(null);

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
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  console.log(error);

  return (
    <>
      <div className="flex w-screen max-sm:flex-col">
        <div className="bg-[#FBF9F1] flex p-8 max-sm:p-2 left-0 flex-col w-2/5 max-sm:w-full ustify-center items-center">
          <div className="flex flex-col mt-7 items-center justify-center">
            <div className="text-4xl flex justify-center items-center text-primary">
              Mahasiswa
            </div>
            <div className="bg-red-600 flex flex-col mt-10">
              <div className="flex relative h-[30rem] max-sm:h-96 w-96 max-sm:w-72">
                <Image
                  loader={myImageLoader}
                  src={mahasiswa?.foto || ""}
                  alt="Picture of the author"
                  //   width={1600}
                  //   height={900}
                  layout="fill"
                  objectFit="cover"
                  sizes="80vh"
                />
              </div>
            </div>
            <div className="w-3/5  max-sm:justify-center mt-10 text-xl  max-sm:text-base grid grid-cols-3 text-primary">
              <div>
                <div>Nama</div>
                <div>NIM</div>
              </div>
              <div className="col-span-2">
                <div>: {mahasiswa?.nama_lengkap}</div>
                <div>: {mahasiswa?.NIM}</div>
              </div>
            </div>
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
                <a
                  href="#"
                  className="bg-primary w-full flex text-lg max-sm:text-sm max-sm:px-2 hover:bg-white hover:text-primary items-center gap-3 p-2 px-6 max-sm:py-3 text-white rounded-md">
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
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen flex flex-col w-3/5 max-sm:w-full px-20 max-sm:px-4 py-14">
          <div>
            <div className="text-2xl text-primary font-bold">List Project</div>
            <div className="flex h-[80vh] overflow-scroll">
              <div className=" flex flex-col gap-4 w-full overflow-y-scroll max-sm:overflow-y-visible h-full container">
                {mahasiswa?.project == null ||
                  (mahasiswa?.project?.length == 0 && (
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="text-4xl text-white">
                        Belum ada projek SOBBB
                      </div>
                    </div>
                  ))}

                {mahasiswa?.project?.map((project) => (
                  <Card
                    key={project.id}
                    id={project.id}
                    dataAos=""
                    name={project.nama_proyek}
                    imageUrl={project.image[0]?.link_gambar}
                    // year={project.year.map((item) => item.tahun).join(", ")}
                    // comment={JSON.stringify(project.image)}
                    // comment={project.comments.map((isi) => isi.isi_komen).join(', ')}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailMahasiswa;
