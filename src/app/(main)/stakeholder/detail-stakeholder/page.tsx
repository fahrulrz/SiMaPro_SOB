"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Card from "@/components/Card";

import gambar from "../../../../../public/assets/photoProfile.png";
import { useEffect, useState } from "react";
import axios from "axios";

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

const DetailStakeholder = () => {
  const [stakeholder, setStakeholder] = useState<Stakeholder>();
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/stakeholders/${id}`)
      .then((response) => {
        setStakeholder(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

  console.log(error);

  return (
    <>
      <div className="flex w-screen">
        <div className="bg-[#FBF9F1]  flex p-8 left-0 flex-col w-2/5 ustify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl flex justify-center items-center text-primary font-bold">
              Stakeholder
            </div>
            <div className="flex flex-col mt-10">
              <div className="flex relative h-[30rem] w-96">
                <Image
                  src={`${stakeholder?.foto}`}
                  alt="Picture of the author"
                  layout="fill"
                  objectFit="cover"
                  sizes="80vh"
                />
              </div>
            </div>
            <div className="w-4/5 mt-10 text-xl grid grid-cols-3 text-primary">
              <div className="">
                <div>Nama</div>
                <div>Kategori</div>
                <div>Email</div>
                <div>Nomor Telepon</div>
              </div>
              <div className="col-span-2">
                <div>: {stakeholder?.nama}</div>
                <div>: {stakeholder?.kategori}</div>
                <div>: {stakeholder?.email}</div>
                <div>: {stakeholder?.nomor_telepon}</div>
              </div>
            </div>
            <div className="gap-4 mt-10 w-full grid grid-cols-2 px-24">
              <div>
                <a
                  href={`/stakeholder/edit-stakeholder?id=${id}`}
                  className="bg-primary flex w-full text-lg hover:bg-white hover:text-primary items-center gap-3 p-2 px-6 text-white rounded-md">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="xl"
                    className="me-2"
                  />
                  Edit Profile
                </a>
              </div>
              <div>
                <a
                  href=""
                  className="bg-primary w-full flex text-lg hover:bg-white hover:text-primary items-center gap-3 p-2 px-6 text-white rounded-md">
                  <FontAwesomeIcon icon={faTrash} size="xl" />
                  Delete Profile
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen flex flex-col w-3/5 px-20 py-14">
          <div>
            <div className="text-2xl font-bold text-primary">List Project</div>
            <div className="flex h-[80vh] overflow-scroll">
              <div className=" flex flex-col gap-4 w-full overflow-y-scroll h-full">
                {stakeholder?.projects.map((project) => (
                  <Card
                    key={project.id}
                    id={project.id}
                    dataAos=""
                    name={project.nama_proyek}
                    imageUrl={project.image[0].link_gambar}
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

export default DetailStakeholder;
