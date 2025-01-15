import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.sunlife.co.id', 'i.ibb.co'], // Ruxsat berilgan domenlarni qo'shing
  },
};

export default withNextIntl(nextConfig);
