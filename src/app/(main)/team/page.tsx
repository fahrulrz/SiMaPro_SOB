"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  const [teamId, setTeamId] = useState<string>(" ");

  useEffect(() => {
    const teamIdUrl = window
      ? new URLSearchParams(window.location.search).get("id") || " "
      : " ";
    setTeamId(teamIdUrl);
  }, []);

  // const teamId = useSearchParams().get("id");

  const [team, setTeam] = useState<Team>();
  const [error, setError] = useState(null);
  console.error(error);

  if (typeof window != "undefined") {
    import("aos").then((Aos) => {
      Aos.init();
    });
  }

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`)
      .then((response) => {
        setTeam(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [teamId]);

  const deleteHandler = async (id: number) => {
    try {
      const res = await deleteTeam(id);
      if (res.status === 200) {
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clickHandler = (id: number) => {
    router.push(`/mahasiswa/detail-mahasiswa?id=${id}`);
  };
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
                  onClick={() => deleteHandler(team?.id as number)}
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
    </div>
  );
};

export default Team;
