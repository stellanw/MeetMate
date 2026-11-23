/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.weatherapi.com",
        port: "",
      },
    ],
  },

  compiler: {
    styledComponents: true,
  },

  reactStrictMode: false,

  async redirects() {
    return [
      // old English routes; friend list was merged into the profile page
      { source: "/profilepage", destination: "/profil", permanent: true },
      { source: "/friendlist", destination: "/profil", permanent: true },
      { source: "/calendar", destination: "/kalender", permanent: true },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
