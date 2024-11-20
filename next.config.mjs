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

  images: {
    domains: [
      "tse1.mm.bing.net",
      "tse2.mm.bing.net",
      "tse3.mm.bing.net",
      "cdn.idntimes.com",
      "api.duniagames.co.id",
      "www.tagar.id",
      "i0.wp.com",
    ],
  },
};

export default nextConfig;
