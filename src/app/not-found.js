// หน้า 404: ภาพเข็มทิศ + ทางกลับ + ช่องค้นหาบทเรียน
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CourseSearch from '@/components/CourseSearch';
import { getAllCourses, weekLabel } from '@/lib/content';
import { illustration } from '@/lib/illustration';

export const metadata = { title: 'ไม่พบหน้านี้' };

export default function NotFound() {
  const art = illustration('not-found');
  const searchItems = getAllCourses().flatMap((c) => c.phases.flatMap((p) => p.weeks.map((w) => ({
    course: c.shortTitle, phase: p.title, phaseId: p.id, label: weekLabel(w), title: w.title, color: p.color,
    href: `/courses/${c.slug}/phase/${p.id}/week/${w.id}/`,
  }))));

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-main nf-main">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {art ? <img className="nf-art" src={art} alt="" /> : <span className="nf-art nf-art--icon">🧭</span>}
        <span className="home-hero__eyebrow">404 · ไม่พบหน้านี้</span>
        <h1 className="doc-title nf-title">หลงทางนิดหน่อย</h1>
        <p className="lead nf-lead">ลิงก์นี้อาจเปลี่ยนที่อยู่ไปแล้ว ลองค้นชื่อบทที่ต้องการ หรือกลับไปเริ่มจากหน้าหลัก</p>
        <div className="nf-search"><CourseSearch items={searchItems} /></div>
        <div className="home-hero__actions nf-actions">
          <Link href="/" className="btn-primary">กลับหน้าแรก</Link>
          <Link href="/courses/" className="btn-secondary">ดูคอร์สทั้งหมด</Link>
          <Link href="/ebooks/" className="btn-ghost">E-Book</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
