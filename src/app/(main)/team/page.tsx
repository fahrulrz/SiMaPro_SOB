"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import Aos from "aos";
import "aos/dist/aos.css";

import Image from "next/image";

import Card from "@/components/Card";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

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

  const teamId = useSearchParams().get("id");

  const [team, setTeam] = useState<Team>();
  const [error, setError] = useState(null);

   useEffect(() => {
     Aos.init();
   }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/teams/${teamId}`)
      .then((response) => {
        setTeam(response.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [teamId]);

  const clickHandler = (id: number) => {
    router.push(`/mahasiswa/detail-mahasiswa?id=${id}`);
  };
  return (
    <div>
      <div>
        <div className="bg-red-500 flex flex-col w-full h-full py-10 gap-4">
          <div className="bg-blue-500 flex flex-col text-primary font-black justify-center items-center text-4xl">
            <div>Profil Team</div>
            <div>{team?.nama_tim}</div>
          </div>
          <div className="grid grid-cols-4 gap-6 px-52">
            {/* card mahasiswa */}

            {team?.team_member.map((member) => (
              <div
                key={member.id}
                onClick={() => clickHandler(member.member.id)}
                data-aos="flip-left"
                data-aos-duration="1000"
                // onMouseEnter={() => setIsHovered(true)}
                // onMouseLeave={() => setIsHovered(false)}
                className="w-full h-full z-10 hover:z-40 relative">
                <div
                  className={`bg-[#FBF9F1] h-[36rem] flex flex-col justify-center items-center cursor-pointer hover:scale-110 hover:shadow-lg  transition duration-500 ease-in-out`}>
                  <div className="flex flex-col w-full h-full justify-center items-center mb-10">
                    <div className="flex w-full h-full p-8">
                      <div className="flex relative h-full w-full">
                        <Image
                          src={member.member.foto}
                          alt={`Foto ${member.member.nama_lengkap}`}
                          // width={720}
                          // height={700}
                          layout="fill"
                          objectFit="cover"
                          className="bg-red-500 hover:scale-125 transition duration-500 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="text-primary font-bold text-xl mb-10 flex flex-col justify-center items-center">
                      {/* {mahasiswa.nama_lengkap}{" "} */}
                      <div>{member.role.toUpperCase()}</div>
                      <div>{member.member.nama_lengkap}</div>
                      <div>{member.member.NIM}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="bg-gray-600 w-full h-full">2</div>
            <div className="bg-purple-600 w-full h-full">3</div>
            <div className="bg-yellow-600 w-full h-full">4</div> */}
          </div>
          {/* project */}
          <div className=" bg-green-500 flex w-full gap-4 justify-end px-11">
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
              <a
                href="#"
                className="bg-primary w-full flex text-lg hover:bg-white hover:text-primary items-center gap-3 p-2 px-6 text-white rounded-md">
                <FontAwesomeIcon icon={faTrash} size="xl" />
                Delete Tim
              </a>
            </div>
          </div>
        </div>
        <div></div>
        <div className="bg-blue-500 w-full flex flex-col py-12 px-20">
          <div className="text-3xl text-primary">List Project</div>
          <div className="grid grid-cols-2 gap-4">
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
