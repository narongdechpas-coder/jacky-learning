// หาภาพประกอบ 3D ใน public/illustrations/ (ทำงานตอน build เท่านั้น)
// ยังไม่มีไฟล์ → คืน null แล้วหน้าเว็บจะใช้ภาพสำรองที่วาดด้วย SVG แทน
import fs from 'fs';
import path from 'path';
import { withBase } from '@/lib/basePath';

const DIR = path.join(process.cwd(), 'public', 'illustrations');

export function illustration(name) {
  for (const ext of ['webp', 'png']) {
    if (fs.existsSync(path.join(DIR, `${name}.${ext}`))) return withBase(`/illustrations/${name}.${ext}`);
  }
  return null;
}
