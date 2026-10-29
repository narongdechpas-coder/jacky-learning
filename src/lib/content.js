// อ่านเนื้อหาคอร์สและ E-Book จากโฟลเดอร์ content/ (ทำงานตอน build เท่านั้น)
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT = path.join(process.cwd(), 'content');
const COURSES_DIR = path.join(CONTENT, 'courses');

// ---------- ป้ายเรียกสัปดาห์ (ใช้ทั้งเว็บให้ตรงกัน) ----------
export function weekLabel(w) {
  if (w.isWorkshop) return `Workshop ${w.workshopLetter}`;
  return `สัปดาห์ ${w.weekLabel || w.id}`;
}
// จำนวนสัปดาห์ที่หน้านี้ครอบคลุม (เช่น 21–22 = 2)
function weekSpan(w) {
  if (!w.weekLabel) return 1;
  const m = String(w.weekLabel).match(/(\d+)\D+(\d+)/);
  return m ? Number(m[2]) - Number(m[1]) + 1 : 1;
}

function readWeek(slug, phaseId, weekId) {
  const file = path.join(COURSES_DIR, slug, `phase-${phaseId}`, `week-${weekId}.md`);
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return { id: weekId, ...data, content };
}

export function getCourse(slug) {
  const file = path.join(COURSES_DIR, slug, 'course.json');
  if (!fs.existsSync(file)) return null;
  const course = JSON.parse(fs.readFileSync(file, 'utf8'));
  course.phases = course.phases.map((p) => {
    const weeks = p.weeks.map((w) => {
      const { content, ...rest } = readWeek(slug, p.id, w.id);
      return rest;
    });
    const hours = weeks.reduce((s, w) => s + (w.hours || 0), 0);
    return { ...p, weeks, hours };
  });
  const all = course.phases.flatMap((p) => p.weeks);
  course.stats = {
    phases: course.phases.length,
    weeks: all.filter((w) => !w.isWorkshop).reduce((s, w) => s + weekSpan(w), 0),
    workshops: all.filter((w) => w.isWorkshop).length,
    hours: all.reduce((s, w) => s + (w.hours || 0), 0),
  };
  return course;
}

export function getAllCourses() {
  return fs.readdirSync(COURSES_DIR)
    .filter((d) => fs.existsSync(path.join(COURSES_DIR, d, 'course.json')))
    .map(getCourse)
    .sort((a, b) => a.order - b.order);
}

export function getPhase(course, phaseId) {
  return course.phases.find((p) => String(p.id) === String(phaseId)) || null;
}

// รายการสัปดาห์ทั้งคอร์สเรียงต่อกัน ใช้ทำปุ่มก่อนหน้า/ถัดไป
export function getFlatWeeks(course) {
  return course.phases.flatMap((p) => p.weeks.map((w) => ({ ...w, phaseId: p.id })));
}

export function getWeek(slug, phaseId, weekId) {
  return readWeek(slug, phaseId, weekId);
}

export function getEbooks() {
  const file = path.join(CONTENT, 'ebooks.json');
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export const fmtHours = (h) => (Number.isInteger(h) ? String(h) : h.toFixed(1));
