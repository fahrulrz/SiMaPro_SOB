"use client";
import myImageLoader from "@/lib/loader";
import Image from "next/image";
import { useRouter } from "next/navigation";

const About = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex bg-inputAddProject p-72">
        <div className="flex flex-col justify-center items-center gap-7  text-primary">
          <h1 className="text-6xl font-bold">Tim Pengembang SimaPro.id</h1>
          <p className="text-2xl tracking-wide text-center">
            &quot;Kami adalah tim yang bekerja di balik layar untuk menghadirkan
            pengalaman terbaik dalam pengelolaan proyek berbasis aplikasi.
            Dengan keahlian masing-masing, kami memastikan sistem ini berjalan
            optimal, efisien, dan responsif&quot;
          </p>
        </div>
      </div>
      <div className="flex bg-primary py-12 px-48 gap-48">
        <div className="flex relative h-[30rem] min-w-96">
          <Image
            src="/assets/about/syafiq.jpg"
            alt="Tim Pengembang SimaPro.id"
            layout="fill"
            objectFit="cover"
            loader={myImageLoader}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-12 text-inputAddProject">
          <h1 className="text-6xl font-bold text-input">
            Halo! Saya Syafiq – Project Manager
          </h1>
          <p className="text-2xl tracking-wide text-center leading-10">
            Sebagai Project Manager, saya memastikan setiap proyek berjalan
            sesuai timeline dan kebutuhan klien. Dengan pendekatan manajemen
            Agile, saya mengelola komunikasi tim, membagi tugas, dan memastikan
            kualitas hasil akhir sesuai dengan ekspektasi.
          </p>
          <div className="text-2xl tracking-wide w-full flex items-center justify-center text-center">
            syafiqabdillahhabib@mail.ugm.ac.id <span className="mx-2">|</span>
            <div
              className="cursor-pointer hover:underline"
              onClick={() => router.push("https://www.linkedin.com/in/syafiq-abdillah-habib-041a952b8")}
            >
              LINKED IN
            </div>
          </div>
        </div>
      </div>
      <div className="flex bg-inputAddProject py-12 px-48 gap-48">
        <div className="flex flex-col justify-center items-center gap-12 text-primary">
          <h1 className="text-6xl font-bold">
            Halo! Saya Alin – UI/UX Designer
          </h1>
          <p className="text-2xl tracking-wide text-center leading-10">
            Saya berfokus pada menciptakan pengalaman pengguna yang intuitif dan
            menarik. Dengan pendekatan berbasis riset, saya merancang antarmuka
            yang tidak hanya estetis tetapi juga fungsional, memastikan setiap
            desain memberikan dampak positif bagi pengguna.
          </p>
          <div className="text-2xl tracking-wide w-full flex items-center justify-center text-center">
            alinseptianinuraisyah@mail.ugm.ac.id <span className="mx-2">|</span>
            <div
              className="cursor-pointer hover:underline"
              onClick={() => router.push("#")}
            >
              LINKED IN
            </div>
          </div>
        </div>
        <div className="flex relative h-[30rem] min-w-96">
          <Image
            src="/assets/about/alin.jpg"
            alt="Tim Pengembang SimaPro.id"
            layout="fill"
            objectFit="cover"
            loader={myImageLoader}
          />
        </div>
      </div>
      <div className="flex bg-primary py-12 px-48 gap-24 text-inputAddProject">
        <div className="flex relative h-[30rem] min-w-96">
          <Image
            src="/assets/about/fahrul.jpeg"
            alt="Tim Pengembang SimaPro.id"
            layout="fill"
            objectFit="cover"
            loader={myImageLoader}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-12">
          <h1 className="text-6xl font-bold">
            Halo! Saya Fahrul – Frontend Developer
          </h1>
          <p className="text-2xl tracking-wide text-center leading-10">
            Saya seorang Frontend Developer yang bersemangat dalam membangun
            antarmuka web yang responsif dan interaktif. Dengan teknologi
            seperti React dan Tailwind CSS, saya memastikan setiap desain yang
            dibuat dapat diimplementasikan dengan efisien dan optimal.
          </p>
          <div className="text-2xl tracking-wide w-full flex items-center justify-center text-center">
            muhamadfahrulrazi@mail.ugm.ac.id <span className="mx-2">|</span>
            <div
              className="cursor-pointer hover:underline"
              onClick={() =>
                router.push(
                  "https://www.linkedin.com/in/muhamad-fahrul-razi-6a2706290"
                )
              }
            >
              LINKED IN
            </div>
          </div>
        </div>
      </div>
      <div className="flex  bg-inputAddProject py-12 px-48 gap-24 ">
        <div className="flex flex-col justify-center items-center gap-12 text-primary">
          <h1 className="text-6xl font-bold">
            Halo! Saya Naldo – Backend Developer
          </h1>
          <p className="text-2xl tracking-wide text-center leading-10">
            Saya seorang Backend Developer yang berfokus pada pengembangan
            sistem yang scalable dan aman. Dengan Laravel dan MySQL, saya
            memastikan data terkelola dengan baik dan API yang dibuat dapat
            berjalan dengan stabil dan cepat.
          </p>
          <div className="text-2xl tracking-wide w-full flex items-center justify-center text-center">
            rifqirenaldo@mail.ugm.ac.id <span className="mx-2">|</span>
            <div
              className="cursor-pointer hover:underline"
              onClick={() => router.push("https://www.linkedin.com/in/rifqi-renaldo-259b49190")}
            >
              LINKED IN
            </div>
          </div>
        </div>
        <div className="flex relative h-[30rem] min-w-96">
          <Image
            src="/assets/about/naldo.jpg"
            alt="Tim Pengembang SimaPro.id"
            layout="fill"
            objectFit="cover"
            loader={myImageLoader}
          />
        </div>
      </div>
    </>
  );
};

export default About;
