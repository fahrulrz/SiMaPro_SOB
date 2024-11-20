"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faPenToSquare,
  faTrash,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faComment as faCommentRegular } from "@fortawesome/free-regular-svg-icons";

// import gambar from "../../../../../public/assets/images/image 24.png";
import axios from "axios";

import Comment from "@/components/Comment";

interface Category {
  id: number;
  nama_kategori: string;
}

interface Year {
  id: number;
  tahun: string;
}

interface Stakeholder {
  id: number;
  nama: string;
  kategori: string;
  nomor_telepon: string;
  email: string;
  foto: string;
}

interface Team {
  id: number;
  nama_tim: string;
  team_member: AnggotaTeam[];
}

interface Anggota {
  id: number;
  nama_lengkap: string;
  NIM: string;
  foto: string;
}

interface AnggotaTeam {
  id: number;
  role: string;
  member: Anggota;
}

interface Image {
  id: number;
  link_gambar: string;
}

interface Comment {
  id: number;
  isi_komen: string;
  user: User;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Like {
  id: number;
}

interface Project {
  id: number;
  nama_proyek: string;
  deskripsi: string;
  image: Image[];
  like: Like[];
  comment: Comment[];
  year: Year[];
  stakeholder: Stakeholder;
  team: Team;
  categories: Category[];
}

const Content = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [projects, setProjects] = useState<Project>();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/projects/${id}`) // api mengambil detail project berdasarkan id
      .then((response) => {
        setProjects(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

  const [isHoveredLike, setIsHoveredLike] = useState<boolean>(false);

  const [isHoveredComment, setIsHoveredComment] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-12 px-20 py-10 h-full w-screen">
      <div className="flex flex-row h-full w-full gap-5">
        <div className="flex flex-col h-full w-full max-h-[84.5vh] gap-10">
          <div className="flex w-full max-h-[84.5vh] px-24">
            <Image
              src={projects?.image[0].link_gambar}
              alt="Picture of the author"
              width={1600}
              height={900}
              sizes="max-h-[80vh]"
              objectFit="cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div className="flex justify-center items-center">
              <Image
                src={projects?.image[1].link_gambar}
                alt="Picture of the author"
                width={1600}
                height={900}
                sizes="80vh"
                objectFit="cover"
              />
            </div>
            <div className="flex justify-center items-center">
              <Image
                src={projects?.image[2].link_gambar}
                alt="Picture of the author"
                width={1600}
                height={900}
                sizes="80vh"
                objectFit="cover"
              />
            </div>
            <div className=" flex justify-center items-center">
              <Image
                src={projects?.image[3].link_gambar}
                alt="Picture of the author"
                width={1600}
                height={900}
                sizes="80vh"
                objectFit="cover"
              />
            </div>
            <div className="bg-gray-500 flex justify-center items-center">
              <Image
                src={projects?.image[4].link_gambar}
                alt="Picture of the author"
                width={1600}
                height={900}
                sizes="max-h-[80vh]"
                objectFit="cover"
              />
            </div>
          </div>
        </div>

        {/* comment section */}

        <div className="bg-[#FBF9F1] p-2 flex flex-col w-2/6 max-h-[84.5vh] relative">
          <div className="flex w-full z-30 top-0 start-0 sticky text-2xl">
            Comments
          </div>
          <div className="flex flex-col mt-4 overflow-scroll px-4 pb-9">
            <div className="">
              {projects?.comment.map((comment) => (
                <Comment
                  key={comment.id}
                  isi_komen={JSON.stringify(comment.isi_komen)}
                  id={comment.id}
                />
              ))}
            </div>
          </div>
          <div className="flex bottom-0 start-0 z-30 absolute w-full p-4 justify-between bg-primary text-white">
            <form
              action="#"
              className="flex justify-between w-full gap-4 items-center">
              <label htmlFor="comment">
                <span
                  onMouseEnter={() => setIsHoveredComment(true)}
                  onMouseLeave={() => setIsHoveredComment(false)}>
                  <FontAwesomeIcon
                    icon={isHoveredComment ? faComment : faCommentRegular}
                    size="2xl"
                    className="cursor-pointer"
                  />
                </span>
              </label>

              <input
                type="text"
                placeholder="Tulis Komentar"
                name="comment"
                id="comment"
                className="text-primary placeholder:text-hint text-lg border-none rounded-md p-2 w-full focus:ring-0"
              />
              <button type="submit">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  size="2xl"
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
        </div>
        {/* end comment section */}
      </div>

      {/* like section */}
      <div id="like-comment" className="flex gap-14">
        <div className="flex flex-col text-primary items-center ">
          <span
            onMouseEnter={() => setIsHoveredLike(true)}
            onMouseLeave={() => setIsHoveredLike(false)}>
            <FontAwesomeIcon
              icon={isHoveredLike ? faHeart : faHeartRegular}
              size="2x"
              className="cursor-pointer"
            />
          </span>
          <p>120k</p>
        </div>
      </div>
      {/* end like section */}

      <div className="flex flex-col gap-4">
        <div className="flex justify-center items-center py-4 bg-white text-4xl font-black text-primary tracking-wide">
          {projects?.nama_proyek}
        </div>
        <div className="flex w-full gap-4 text-primary text-lg">
          <div className="bg-white w-2/5 p-2 flex flex-col gap-4">
            <p>
              {projects?.categories.map((category) => category.nama_kategori)}
            </p>
            <p>Tahun {projects?.year.map((year) => year.tahun).join(", ")}</p>
            <div>
              Stakeholder :{" "}
              <Link
                href={`/stakeholder/detail-stakeholder?id=${projects?.stakeholder.id}`}
                className="hover:underline">
                {projects?.stakeholder.nama}
              </Link>
            </div>
            <div>
              Nama Tim :{" "}
              <Link
                href={`/team?id=${projects?.team.id}`}
                className="hover:underline">
                {projects?.team.nama_tim}
              </Link>
            </div>
            <p>Nama Anggota Kelompok : </p>
            <ul className=" ms-6 list-disc">
              <li>
                <Link
                  href={`/mahasiswa/detail-mahasiswa?id=${projects?.team.team_member.find((member) => member.role == "pm")?.member.id}`}
                  className="hover:underline">
                  {" "}
                  {
                    projects?.team.team_member.find(
                      (member) => member.role == "pm"
                    )?.member.nama_lengkap
                  }{" "}
                  (PM)
                </Link>
              </li>
              <li>
                <Link
                  href={`/mahasiswa/detail-mahasiswa?id=${projects?.team.team_member.find((member) => member.role == "fe")?.member.id}`}
                  className="hover:underline">
                  {
                    projects?.team.team_member.find(
                      (member) => member.role == "fe"
                    )?.member.nama_lengkap
                  }{" "}
                  (FE)
                </Link>
              </li>
              <li>
                <Link
                  href={`/mahasiswa/detail-mahasiswa?id=${projects?.team.team_member.find((member) => member.role == "be")?.member.id}`}
                  className="hover:underline">
                  {
                    projects?.team.team_member.find(
                      (member) => member.role == "be"
                    )?.member.nama_lengkap
                  }{" "}
                  (BE)
                </Link>
              </li>
              <li>
                <Link
                  href={`/mahasiswa/detail-mahasiswa?id=${projects?.team.team_member.find((member) => member.role == "ui_ux")?.member.id}`}
                  className="hover:underline">
                  {
                    projects?.team.team_member.find(
                      (member) => member.role == "ui_ux"
                    )?.member.nama_lengkap
                  }{" "}
                  (UI/UX)
                </Link>
              </li>
            </ul>
          </div>
          <div className="bg-white w-3/5 p-2 flex flex-col gap-4">
            <p>Description : </p>
            <p>{projects?.deskripsi}</p>
          </div>
        </div>
        <div className="w-full flex justify-end gap-6">
          <Link href={`/home/project/edit-project?id=${projects?.id}`}>
            <button className="bg-white text-primary hover:bg-primary hover:text-white flex items-center gap-3 p-2 px-6  rounded-md">
              <FontAwesomeIcon icon={faPenToSquare} size="xl" />
              Edit Proyek
            </button>
          </Link>

          <a href="#" className="">
            <button className="bg-white flex hover:bg-primary hover:text-white items-center gap-3 p-2 px-6 text-primary rounded-md">
              <FontAwesomeIcon icon={faTrash} size="xl" />
              Hapus Proyek
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Content;
