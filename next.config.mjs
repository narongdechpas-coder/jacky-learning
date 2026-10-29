/** @type {import('next').NextConfig} */
// BASE_PATH: ว่างไว้สำหรับ Netlify, ตั้งเป็น /jacky-learning ตอน build ให้ GitHub Pages (ดู .github/workflows/pages.yml)
const basePath = process.env.BASE_PATH || '';

const nextConfig = {
  output: 'export',      // สร้างเว็บแบบ static ไว้ในโฟลเดอร์ out/ (deploy บน Netlify ได้ทันที)
  trailingSlash: true,   // ทุกหน้าเป็น /path/index.html เปิดได้ทุก host
  images: { unoptimized: true },
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
export default nextConfig;
