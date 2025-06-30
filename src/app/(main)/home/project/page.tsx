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

import axios, { AxiosError } from "axios";

import Comment from "@/components/Comment";
import {
  deleteProject,
  getComments,
  getLikeCount,
  getLikeStatus,
  likeProject,
  submitComment,
} from "@/lib/Project";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Swal from "sweetalert2";

// import Aos from "aos";
// import "aos/dist/aos.css";

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

interface Project {
  id: number;
  nama_proyek: string;
  deskripsi: string;
  image: Image[];
  comments: Comment[];
  link_proyek: string;
  year: Year[];
  stakeholder: Stakeholder;
  team: Team;
  categories: Category[];
}

const Content = () => {
  const [id, setId] = useState<string>(" ");
  const [projects, setProjects] = useState<Project>();
  const [error, setError] = useState(null);
  const [clickComment, setClickComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [likes, setLike] = useState<number>(0);
  const { user } = useAuth();
  const [isHoveredLike, setIsHoveredLike] = useState<boolean>(false);
  const [isHoveredComment, setIsHoveredComment] = useState<boolean>(false);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const router = useRouter();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const idUrl = window
      ? new URLSearchParams(window.location.search).get("id") || "0"
      : "0";
    setId(idUrl);

    if (!isLoading || !idUrl) {
      return;
    }

    setIsLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/projects/${idUrl}`)
      .then((response) => {
        setProjects(response.data.data);
        setImages(response.data.data.image);
        setLike(response.data.data.likes.length);
        likeStatus(response.data.data.id);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [id, isLoading]);

  const likeStatus = async (id: number) => {
    try {
      const response = await getLikeStatus(id);
      setIsHoveredLike(response.data.liked);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteComment = (deletedId: number) => {
    if (!projects) return;
    const updatedComments = projects.comments.filter(
      (comment) => comment.id !== deletedId
    );
    setProjects({ ...projects, comments: updatedComments });
  };

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleImageClick = (clickedIndex: number) => {
    // Tukar posisi gambar yang diklik dengan main image
    const updatedImages = [...images];
    const temp = updatedImages[mainImageIndex];
    updatedImages[mainImageIndex] = updatedImages[clickedIndex];
    updatedImages[clickedIndex] = temp;

    setImages(updatedImages);
    setMainImageIndex(mainImageIndex); // mainImageIndex tetap sama
  };

  const handleClickLike = async () => {
    try {
      const res = await likeProject(projects?.id || 0);
      if (res.status === 200) {
        const like = await getLikeStatus(projects?.id || 0);
        if (like.status === 200) {
          setIsHoveredLike(like.data.liked);
          const likes = await getLikeCount(projects?.id || 0);
          if (likes.status === 200) {
            setLike(likes.data.likes_count);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    setIsLoadingDelete(true);
    handleUpdate();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const res = await deleteProject(projectId);
      if (res.status === 200) {
        setIsLoadingDelete(false);

        Swal.fire({
          title: "Delete Project Success!",
          icon: "success",
          confirmButtonColor: "#1e293b",
          buttonsStyling: false,
          confirmButtonText: `<div class="text-white bg-primary rounded-lg border-2 border-primary hover:border-slate-800"> <a href="/home" class="h-full w-full flex p-3 px-5 justify-center items-center">OK</a></div>`,
        });
      }
    } catch (error: unknown) {
      setIsLoadingDelete(false);
      const err = error as AxiosError<{
        message: string;
        errors?: Record<string, string[]>;
      }>;
      console.log(error);

      const errorMessage =
        err?.response?.data?.message || "Gagal delete data. Coba lagi ya.";
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
    }
  };

  const handleClickComment = async (event: React.FormEvent) => {
    event.preventDefault();
    setComment("");
    // setClickComment(!clickComment);
    try {
      const res = await submitComment(projects?.id || 0, comment);
      if (res.status === 201) {
        const comments = await getComments(projects?.id || 0);
        if (comments.status === 200) {
          setProjects({
            ...(projects as Project),
            comments: comments.data.data,
          });
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-12 max-sm:gap-6 transition-all ease-in-out px-20 max-sm:px-4 py-10 h-screen justify-center items-center w-screen ">
        <div className="text-4xl text-primary font-bold animate-pulse">
          Loading....
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-12 max-sm:gap-6 transition-all ease-in-out px-20 max-sm:px-4 py-10 h-screen justify-center items-center w-screen ">
        <div className="text-4xl text-primary font-bold animate-pulse">
          Project Not Found
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 max-sm:gap-6 transition-all ease-in-out px-20 max-sm:px-4 py-10 h-full w-screen">
      <div className="flex flex-row max-sm:flex-col h-full w-full gap-5">
        <div className="flex flex-col h-full w-full max-h-[84.5vh] gap-10 max-sm:gap-4">
          <div className="flex w-full h-[65vh] px-24 max-sm:px-0 items-center justify-center">
            <Image
              src={images[mainImageIndex]?.link_gambar || ""}
              alt="Main Picture"
              width={1600}
              height={900}
              unoptimized
              className="object-contain w-full h-full"
              objectFit="cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-6 max-sm:gap-1">
            {images.map((img: Image, index: number) =>
              index !== mainImageIndex ? (
                <div
                  key={index}
                  className="flex justify-center items-center cursor-pointer max-h-[20vh] bg-gray-200 overflow-hidden relative"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={img.link_gambar}
                    alt={`Picture ${index + 1}`}
                    width={900}
                    height={900}
                    unoptimized
                    className="w-full h-full object-cover"
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
            <div className="pb-8">
              {projects?.comments?.map((comment) => (
                <Comment
                  key={comment.id}
                  isi_komen={JSON.stringify(comment.isi_komen)}
                  id={comment.id}
                  userId={user?.id || 0}
                  userComment={comment.user.id}
                  role={user?.role || ""}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
          </div>
          <div className="flex bottom-0 start-0 z-30 absolute w-full p-4 justify-between bg-primary text-white">
            <form
              onSubmit={handleClickComment}
              className="flex w-full gap-4 justify-between items-center"
            >
              <label htmlFor="comment" className="max-sm:hidden">
                <span
                  onMouseEnter={() => setIsHoveredComment(true)}
                  onMouseLeave={() => setIsHoveredComment(false)}
                >
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
                onChange={(e) => setComment(e.target.value)}
                value={comment}
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
      <div id="like-comment" className="flex gap-14 sm:mt-5">
        <div className="flex flex-col text-primary items-center">
          <span>
            <FontAwesomeIcon
              onClick={handleClickLike}
              icon={isHoveredLike ? faHeart : faHeartRegular}
              size="2x"
              className="cursor-pointer"
            />
          </span>
          <p>{likes}</p>
        </div>
        <div className="flex flex-col text-primary sm:hidden items-center ">
          <span>
            <FontAwesomeIcon
              onClick={() => setClickComment(!clickComment)}
              icon={clickComment ? faComment : faCommentRegular}
              size="2x"
            />
          </span>
          <p>{projects?.comments?.length}</p>
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
            <div className="pb-4">
              {projects?.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  isi_komen={JSON.stringify(comment.isi_komen)}
                  id={comment.id}
                  userId={user?.id || 0}
                  userComment={comment.user.id}
                  role={user?.role || ""}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
          </div>
          <div className="flex bottom-0 start-0 z-30 absolute w-full p-2 justify-between bg-primary text-white">
            <form
              onSubmit={handleClickComment}
              className="flex w-full gap-4 justify-between items-center"
            >
              <input
                type="text"
                placeholder="Tulis Komentar"
                name="comment"
                id="comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
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
                className="hover:underline"
              >
                {projects?.stakeholder.nama}
              </Link>
            </div>
            <div>
              Nama Tim :{" "}
              <Link
                href={`/team?id=${projects?.team.id}`}
                className="hover:underline"
              >
                {projects?.team.nama_tim}
              </Link>
            </div>
            <p>Nama Anggota Kelompok : </p>
            <ul className=" ms-6 list-disc">
              <li>
                <Link
                  href={`/mahasiswa/detail-mahasiswa?id=${projects?.team.team_member.find((member) => member.role == "pm")?.member.id}`}
                  className="hover:underline"
                >
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
                  className="hover:underline"
                >
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
                  className="hover:underline"
                >
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
                  className="hover:underline"
                >
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
        {projects?.link_proyek ? (
          <div className="justify-end items-end flex">
            <button
              className="bg-white flex hover:bg-primary hover:text-white items-center gap-3 p-2 px-6 max-sm:px-2 text-primary rounded-md"
              onClick={() => router.push(projects?.link_proyek || "")}
            >
              Lihat Website
            </button>
          </div>
        ) : (
          <div className="justify-end items-end flex">
            <button className="bg-white flex hover:bg-gray-100 cursor-not-allowed items-center gap-3 p-2 px-6 max-sm:px-2 text-primary rounded-md">
              Belum ada link
            </button>
          </div>
        )}
        {user?.role == "admin" ? (
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

            <div>
              <button
                className="bg-white flex hover:bg-primary hover:text-white items-center gap-3 p-2 px-6 max-sm:px-2 text-primary rounded-md"
                onClick={handleUpdate}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ fontSize: "max-sm:1rem 1.3rem" }}
                />
                Hapus Proyek
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {/* modal confirm */}
      {update && (
        <div
          tabIndex={-1}
          className="overflow-y-auto flex bg-black/30 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-primary rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                //close modal
                onClick={handleUpdate}
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
                  Are you sure you want to delete this project? Please back up
                  the data first before deleting
                </h3>
                <button
                  type="submit"
                  onClick={() => handleDeleteProject(projects?.id || 0)}
                  className="text-primary bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-white/30 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I&apos;m sure
                </button>
                <button
                  onClick={handleUpdate}
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
          isLoadingDelete ? "flex animate-zoom-in" : "hidden animate-zoom-out"
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
            Deleting Project...
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Content;
