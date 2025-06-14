/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },

  output: "standalone",

  images: {
    domains: [
      "tse1.mm.bing.net",
      "tse2.mm.bing.net",
      "tse3.mm.bing.net",
      "cdn.idntimes.com",
      "api.duniagames.co.id",
      "via.placeholder.com",
      "localhost",
      "www.tagar.id",
      "i0.wp.com",
      "fastly.picsum.photos",
      "simapro.web.id",
      "127.0.0.1",
    ],
  },
};

export default nextConfig;
