// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["interlade.s3.amazonaws.com"],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "interlade.s3.amazonaws.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "interlade.s3.amazonaws.com",
//         pathname: "**",
//       },
//     ],
//   },
// };
