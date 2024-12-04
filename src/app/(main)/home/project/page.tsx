"use client";

import { useEffect, useState } from "react";

// import { useSearchParams } from "next/navigation";

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

import axios from "axios";

import Comment from "@/components/Comment";

// import Aos from "aos";
// import "aos/dist/aos.css";

interface Category {
  id: number;
  nama_kategori: string;
}

interface Like {
  id: number;
  user_id: number;
  project_id: number;
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
  // Aos.init();

  // let id: string;

  const [id, setId] = useState<string>(" ");

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(`https://fahrul-api.duckdns.org/api/projects/${id}`) // api mengambil detail project berdasarkan id
  //     .then((response) => {
  //       setProjects(response.data.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setIsLoading(false);
  //     });
  // }, [id]);
  const [projects, setProjects] = useState<Project>();
  const [error, setError] = useState(null);

  // const searchParams = useSearchParams();
  // const id = searchParams.get("id");

  console.log(error);

  const [clickComment, setClickComment] = useState<boolean>(false);

  const [isHoveredLike, setIsHoveredLike] = useState<boolean>(false);

  const [isHoveredComment, setIsHoveredComment] = useState<boolean>(false);

  const [mainImageIndex, setMainImageIndex] = useState<number>(0);

  const [images, setImages] = useState<Image[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const idUrl = window
      ? new URLSearchParams(window.location.search).get("id") || "0"
      : "0";
    setId(idUrl);
    console.log("id", idUrl);

    if (!isLoading || !idUrl) {
      return;
    }
    axios
      .get(`https://fahrul-api.duckdns.org/api/projects/${idUrl}`) // api mengambil detail project berdasarkan id
      .then((response) => {
        setProjects(response.data.data);
        console.log("respon data", response.data.data);
        console.log("respon project", projects);
        setImages(response.data.data.image);

        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [id, projects, isLoading]);

  // useEffect(() => {
  //   if (projects) {
  //     setImages(projects.image);
  //   }
  // }, [projects]);

  console.log(images);

  const handleImageClick = (clickedIndex: number) => {
    const updatedImages = [...images];
    const temp = updatedImages[mainImageIndex];
    updatedImages[mainImageIndex] = updatedImages[clickedIndex];
    updatedImages[clickedIndex] = temp;

    setImages(updatedImages);
    setMainImageIndex(clickedIndex);
  };

  const handleClickLike = () => {
    setIsHoveredLike(!isHoveredLike);
  };

  const handleClickComment = () => {
    setClickComment(!clickComment);
    setIsHoveredComment(!isHoveredComment);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col gap-12 max-sm:gap-6 transition-all ease-in-out px-20 max-sm:px-4 py-10 h-full w-screen">
      {isLoading ? <div>Loading...</div> : <>Loading selesai</>}
      <div className="flex flex-row max-sm:flex-col h-full w-full gap-5">
        <div className="flex flex-col h-full w-full max-h-[84.5vh] gap-10 max-sm:gap-4">
          <div className="flex w-full max-h-[84.5vh] px-24 max-sm:px-0">
            <Image
              src={projects?.image[mainImageIndex].link_gambar || ""}
              alt="Main Picture"
              width={1600}
              height={900}
              sizes="max-h-[80vh]"
              objectFit="cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-6 max-sm:gap-1">
            {/* <div className="flex justify-center items-center">
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
                sizes={"max-h-[80vh]"}
                objectFit="cover"
              />
            </div> */}
            {/* {projects?.image.slice(0, 4).map((img: Image, index: number) => (
              <div
                key={index + 1}
                className={`flex justify-center items-center ${
                  index + 1 === mainImageIndex ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => handleImageClick(index + 1)}>
                <Image
                  src={projects?.image[index + 1].link_gambar}
                  alt={`Picture ${projects?.image[index].link_gambar}`}
                  width={1600}
                  height={900}
                  sizes="80vh"
                  objectFit="cover"
                  className="cursor-pointer"
                />
              </div>
            ))} */}
            {images.map((img: Image, index: number) =>
              index !== mainImageIndex ? (
                <div
                  key={index}
                  className="flex justify-center items-center cursor-pointer"
                  onClick={() => handleImageClick(index)}>
                  <Image
                    src={img.link_gambar}
                    alt={`Picture ${index + 1}`}
                    width={1600}
                    height={900}
                    sizes="80vh"
                    objectFit="cover"
                  />
                </div>
              ) : null
            )}
          </div>
        </div>

        {/* comment section */}

        {/* desktop */}
        <div className="bg-[#FBF9F1] p-2 flex max-sm:hidden max-sm:w-full flex-col w-2/6 max-h-[84.5vh] relative">
          <div className="flex w-full z-30 top-0 start-0 sticky text-2xl max-sm:text-lg">
            Comments
          </div>
          <div className="flex flex-col mt-4 overflow-scroll px-4 pb-9 max-sm:text-sm">
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
              className="flex w-full gap-4 justify-between items-center">
              <label htmlFor="comment" className="max-sm:hidden">
                <span
                  onMouseEnter={() => setIsHoveredComment(true)}
                  onMouseLeave={() => setIsHoveredComment(false)}>
                  <FontAwesomeIcon
                    icon={isHoveredComment ? faComment : faCommentRegular}
                    size="2xl"
                    className="cursor-pointer max-sm:hidden"
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
                  size="xl"
                  className="cursor-pointer sm:hidden"
                />
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  size="2xl"
                  className="cursor-pointer max-sm:hidden"
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
          <span>
            <FontAwesomeIcon
              onClick={handleClickLike}
              icon={isHoveredLike ? faHeart : faHeartRegular}
              size="2x"
              className="cursor-pointer"
            />
          </span>
          <p>{projects?.like.length}</p>
        </div>
        <div className="flex flex-col text-primary sm:hidden items-center ">
          <span>
            <FontAwesomeIcon
              onClick={handleClickComment}
              icon={isHoveredComment ? faComment : faCommentRegular}
              size="2x"
              className="cursor-pointer"
            />
          </span>
          <p>{projects?.comment.length}</p>
        </div>
      </div>
      {/* end like section */}

      {/* comment mobile */}
      {clickComment && (
        <div className="bg-[#FBF9F1] p-2 flex sm:hidden max-sm:w-full flex-col w-2/6 h-80 relative">
          <div className="flex w-full z-30 top-0 start-0 sticky text-2xl max-sm:text-lg">
            Comments
          </div>
          <div className="flex flex-col mt-4 overflow-scroll px-4 pb-9 max-sm:text-sm">
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
          <div className="flex bottom-0 start-0 z-30 absolute w-full p-2 justify-between bg-primary text-white">
            <form
              action="#"
              className="flex w-full gap-4 justify-between items-center">
              <input
                type="text"
                placeholder="Tulis Komentar"
                name="comment"
                id="comment"
                className="text-primary placeholder:text-hint max-sm:placeholder:text-sm text-lg border-none rounded-md p-1 w-full focus:ring-0"
              />
              <button type="submit">
                {/* mobile */}
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  size="lg"
                  className="cursor-pointer sm:hidden"
                />
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex justify-center items-center py-4 bg-white text-4xl max-sm:text-2xl font-black text-primary tracking-wide">
          {projects?.nama_proyek}
        </div>
        <div className="flex max-sm:flex-col w-full gap-4 text-primary text-lg max-sm:text-base">
          <div className="bg-white w-2/5 max-sm:w-full p-6 max-sm:p-4 flex flex-col gap-4">
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
          <div className="bg-white w-3/5 max-sm:w-full p-6 max-sm:p-4 flex flex-col gap-4">
            <p>Description : </p>
            <p>{projects?.deskripsi}</p>
          </div>
        </div>
        <div className="w-full flex justify-end gap-6">
          <Link href={`/home/project/edit-project?id=${projects?.id}`}>
            <button className="bg-white text-primary hover:bg-primary hover:text-white flex items-center gap-3 p-2 px-6 max-sm:px-2  rounded-md">
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ fontSize: "max-sm:1rem 1.3rem" }}
              />
              Edit Proyek
            </button>
          </Link>

          <a href="#" className="">
            <button className="bg-white flex hover:bg-primary hover:text-white items-center gap-3 p-2 px-6 max-sm:px-2 text-primary rounded-md">
              <FontAwesomeIcon
                icon={faTrash}
                style={{ fontSize: "max-sm:1rem 1.3rem" }}
              />
              Hapus Proyek
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Content;
