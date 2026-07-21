import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  trailingSlash: true,
  output: "export",
  experimental: {
    staticGenerationMaxConcurrency: 1,
    workerThreads: false,
    cpus: 1
  }
};

export default withNextIntl(nextConfig);
