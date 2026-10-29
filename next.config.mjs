/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // สร้างเว็บแบบ static ไว้ในโฟลเดอร์ out/ (deploy บน Netlify ได้ทันที)
  trailingSlash: true,   // ทุกหน้าเป็น /path/index.html เปิดได้ทุก host
  images: { unoptimized: true },
};
export default nextConfig;
