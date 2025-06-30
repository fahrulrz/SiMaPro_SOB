"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

// import Aos from "aos";
import "aos/dist/aos.css";

import Image from "next/image";

import Card from "@/components/Card";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import myImageLoader from "@/lib/loader";
import { useAuth } from "@/contexts/AuthContext";
import { deleteTeam } from "@/lib/Team";
import Swal from "sweetalert2";

interface Images {
  id: number;
  link_gambar: string;
}

interface Projects {
  id: number;
  nama_proyek: string;
  image: Images[];
}

interface Member {
  id: number;
  nama_lengkap: string;
  NIM: string;
  foto: string;
}

interface TeamMember {
  id: number;
  role: string;
  team_id: number;
  member_id: number;
  member: Member;
}

interface Team {
  id: number;
  nama_tim: string;
  team_member: TeamMember[];
  project: Projects[];
}

const Team = () => {
  // http://127.0.0.1:8000/api/

  const router = useRouter();
  const { user } = useAuth();
  const [teamId, setTeamId] = useState<string>("");
  const [update, setUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  useEffect(() => {
    const urlId = new URLSearchParams(window.location.search).get("id") || "";
    setTeamId(urlId);
  }, []);

  useEffect(() => {
    if (!teamId) return;

    console.log("ini team id url: " + teamId);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`)
      .then((response) => {
        setTeam(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [teamId]);

  console.log("Team ID dari URL:", teamId);
  console.log("API URL:", `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`);

  // const teamId = useSearchParams().get("id");

  const [team, setTeam] = useState<Team>();
  const [error, setError] = useState(null);
  console.error(error);

  if (typeof window != "undefined") {
    import("aos").then((Aos) => {
      Aos.init();
    });
  }

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const deleteHandler = async (id: number) => {
    setUpdate(false);
    setIsLoadingDelete(true);
    try {
      const res = await deleteTeam(id);
      if (res.status === 200) {
        setIsLoadingDelete(false);
        Swal.fire({
          title: "Delete Team Success!",
          icon: "success",
          confirmButtonColor: "#1e293b",
          buttonsStyling: false,
          confirmButtonText: `<div class="text-white bg-primary p-3 px-5 rounded-lg border-2 border-primary hover:border-slate-800"> <a href="/home" >OK</a></div>`,
        });
      }
    } catch (error: unknown) {
      setIsLoadingDelete(false);
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
      console.log(error);
    }
  };

  const clickHandler = (id: number) => {
    router.push(`/mahasiswa/detail-mahasiswa?id=${id}`);
  };

  if (error !== null) {
    return (
      <div className="flex flex-col gap-12 max-sm:gap-6 transition-all ease-in-out px-20 max-sm:px-4 py-10 h-screen justify-center items-center w-screen ">
        <div className="text-4xl text-primary font-bold animate-pulse">
          Team Not Found
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="flex flex-col w-full h-full py-10 gap-4">
          <div className=" flex flex-col text-primary font-black justify-center items-center text-4xl max-sm:text-2xl">
            <div>Profil Team</div>
            <div>{team?.nama_tim}</div>
          </div>
          <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-6 px-52 max-sm:px-24">
            {/* card mahasiswa */}

            {team?.team_member.map((member) => (
              <div
                key={member.id}
                onClick={() => clickHandler(member.member.id)}
                data-aos="flip-left"
                data-aos-duration="1000"
                className="w-full h-full z-10 hover:z-40 relative"
              >
                <div
                  className={`bg-[#FBF9F1] h-[36rem] max-sm:h-[24rem] flex flex-col justify-center items-center cursor-pointer hover:scale-110 hover:shadow-lg  transition duration-500 ease-in-out`}
                >
                  <div className="flex flex-col w-full h-full justify-center items-center mb-10 max-sm:mb-0">
                    <div className="flex w-full h-full p-8">
                      <div className="flex relative h-full w-full">
                        <Image
                          loader={myImageLoader}
                          src={member.member.foto}
                          alt={`Foto ${member.member.nama_lengkap}`}
                          // width={720}
                          // height={700}
                          layout="fill"
                          objectFit="cover"
                          className=" hover:scale-125 transition duration-500 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="text-primary font-bold text-xl mb-10 max-sm:mb-6 flex flex-col justify-center items-center">
                      {/* {mahasiswa.nama_lengkap}{" "} */}
                      <div>{member.role.toUpperCase()}</div>
                      <div>{member.member.nama_lengkap}</div>
                      <div>{member.member.NIM}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* project */}
          {user?.role == "admin" ? (
            <div className=" flex w-full gap-4 justify-end px-11 max-sm:px-0 max-sm:justify-center max-sm:mt-8">
              <div>
                <Link href={`/team/edit-profile-team?id=${teamId}`}>
                  <button className="bg-primary flex w-full text-lg hover:bg-white hover:text-primary items-center gap-3 p-2 px-6 text-white rounded-md">
                    {" "}
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="xl"
                      className="me-2"
                    />
                    Edit Tim
                  </button>
                </Link>
              </div>
              <div>
                <div
                  onClick={handleUpdate}
                  className="bg-primary w-full flex text-lg cursor-pointer hover:bg-white hover:text-primary items-center gap-3 p-2 px-6 text-white rounded-md"
                >
                  <FontAwesomeIcon icon={faTrash} size="xl" />
                  Delete Tim
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div></div>
        <div className=" w-full flex flex-col py-12 px-20 max-sm:px-6">
          <div className="text-3xl text-primary">List Project</div>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
            {team?.project.map((project) => (
              <Card
                key={project.id}
                id={project.id}
                name={project.nama_proyek}
                imageUrl={project.image[0].link_gambar}
                dataAos="fade-up"
              />
            ))}
          </div>
        </div>
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
                  Are you sure you want to delete this team? Please back up the
                  data first before deleting
                </h3>
                <button
                  type="submit"
                  onClick={() => deleteHandler(team?.id as number)}
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
            Deleting Team...
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Team;
