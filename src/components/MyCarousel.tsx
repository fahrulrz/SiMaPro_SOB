"use client";

import { useEffect } from "react";
// import { Carousel } from "flowbite";
import Image from "next/image";
import { type CarouselOptions } from "flowbite";

const imageSources = [
  "https://simapro.web.id/assets/slide1.png",
  "https://simapro.web.id/assets/slide2.png",
  "https://simapro.web.id/assets/slide3.png",
  "/assets/logo.png",
]; // Sesuaikan src image di sini

const MyCarousel = () => {
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     import("flowbite").then(({ Carousel }) => {
  //       const carousel = new Carousel(carouselElement, items, options);
  //       carousel.cycle();

  //       document
  //         .querySelector("[data-carousel-prev]")
  //         ?.addEventListener("click", () => carousel.prev());
  //       document
  //         .querySelector("[data-carousel-next]")
  //         ?.addEventListener("click", () => carousel.next());
  //     });
  //   }
  // });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const carouselElement = document.getElementById("carousel-example");

      if (!carouselElement) return;

      const items = Array.from(document.querySelectorAll(".carousel-item")).map(
        (el, index) => ({
          position: index,
          el: el as HTMLElement,
        })
      );

      const options: CarouselOptions = {
        defaultPosition: 0,
        interval: 3000,
        indicators: {
          activeClasses: "bg-slate-900 dark:bg-gray-800",
          inactiveClasses:
            "bg-slate-900/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800",
          items: items.map((item, index) => ({
            position: index,
            el: document.querySelector(
              `[data-carousel-slide-to="${index}"]`
            ) as HTMLElement,
          })),
        },
      };

      if (typeof window !== "undefined") {
        import("flowbite").then(({ Carousel }) => {
          const carousel = new Carousel(carouselElement, items, options);
          carousel.cycle();

          document
            .querySelector("[data-carousel-prev]")
            ?.addEventListener("click", () => carousel.prev());
          document
            .querySelector("[data-carousel-next]")
            ?.addEventListener("click", () => carousel.next());
        });
      }

      // const carousel = new Carousel(carouselElement, items, options);
      // carousel.cycle();

      // document
      //   .querySelector("[data-carousel-prev]")
      //   ?.addEventListener("click", () => carousel.prev());
      // document
      //   .querySelector("[data-carousel-next]")
      //   ?.addEventListener("click", () => carousel.next());
    }
  }, []);

  return (
    <div className="relative w-screen overflow-hidden h-full">
      {/* Konten Carousel */}
      <div id="carousel-example" className="carousel relative w-full h-full">
        {imageSources.map((src, i) => (
          <div
            key={i}
            id={`carousel-item-${i + 1}`}
            className="carousel-item w-full h-full">
            <Image
              src={src}
              alt={`Deskripsi Gambar ${i + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {imageSources.map((_, i) => (
          <button
            key={i}
            type="button"
            className="sm:w-3 sm:h-3 w-2 h-2 rounded-full"
            aria-current={i === 0 ? "true" : "false"}
            aria-label={`Slide ${i + 1}`}
            data-carousel-slide-to={i}></button>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev>
        {/* SVG Icon */}
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-700/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-slate-800 dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next>
        {/* SVG Icon */}
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-700/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-slate-800 dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default MyCarousel;
