// ต่อ basePath หน้า path ของไฟล์ใน public/ (รูป ไฟล์ดาวน์โหลด Banner)
// Netlify รันที่ราก (BASE_PATH ว่าง) ส่วน GitHub Pages รันใต้ /jacky-learning
// <Link> ของ Next ต่อให้เองอยู่แล้ว ใช้ฟังก์ชันนี้เฉพาะ <img> กับ <a> ธรรมดา
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBase(p) {
  if (typeof p !== 'string' || !p.startsWith('/') || p.startsWith('//')) return p;
  return BASE_PATH + p;
}
