// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./node_modules/flowbite/**/*.js",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//         primary: "var(--primary)",
//       },
//       backgroundImage: {
//         'SimaPro' : "url('/assets/logo.png')",
//       },
//     },
//   },
//   plugins: [require("flowbite/plugin")],
// };
// export default config;

import type { Config } from "tailwindcss";

import flowbite from "flowbite-react/tailwind";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        hint: "var(--hint)",
        inputAddProject: "var(--inputAddProject)",
      },
      fontFamily: {
        sans: ["Inria Sans", "sans-serif"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
