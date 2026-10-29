// หน้าหลัก: แยกทางเข้า 2 ส่วน — Online Training Course และ E-Book
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Stat from '@/components/Stat';
import { getAllCourses, getEbooks, fmtHours } from '@/lib/content';

export default function HomePage() {
  const courses = getAllCourses();
  const ebooks = getEbooks();
  const weeks = courses.reduce((s, c) => s + c.stats.weeks + c.stats.workshops, 0);
  const hours = courses.reduce((s, c) => s + c.stats.hours, 0);

  return (
    <div className="page-shell">
      <SiteHeader active="home" />
      {/* หน้าแรกจัดให้จบในจอเดียว (จอคอม/โน้ตบุ๊ก) ไม่ต้องเลื่อนลง */}
      <main className="page-main home-main">
        <div className="home-hero">
          <div>
            <h1 className="doc-title">Jacky Learning Hub</h1>
            <p className="lead">ศูนย์รวมการเรียนรู้ เลือกเรียนแบบคอร์สออนไลน์ทีละสัปดาห์ หรืออ่าน E-Book ตามจังหวะของตัวเอง</p>
          </div>
          <div className="stat-row home-stats">
            <Stat value={courses.length} label="คอร์สออนไลน์" />
            <Stat value={weeks} label="สัปดาห์ + Workshop" />
            <Stat value={`~${fmtHours(hours)}`} label="ชั่วโมงเรียนรวม" />
            <Stat value={ebooks.length} label="E-Book" />
          </div>
        </div>

        <div className="hub-grid">
          <Link href="/courses/" className="hub-card" style={{ borderTop: '3px solid #2F6BFF' }}>
            <div className="hub-card__head">
              <span className="hub-card__icon" style={{ background: 'rgba(47,107,255,0.08)' }}>🎓</span>
              <div>
                <p className="hub-card__eyebrow">01 · ONLINE TRAINING COURSE</p>
                <h2 className="hub-card__title">คอร์สออนไลน์</h2>
              </div>
            </div>
            <p className="hub-card__desc">เรียนเป็น Phase และสัปดาห์ มี Workshop, Prompt สำเร็จรูป และเกณฑ์ผ่านทุกสัปดาห์</p>
            <div className="hub-card__meta">
              {courses.map((c) => (
                <span key={c.slug} className="tag" style={{ background: 'rgba(47,107,255,0.08)', color: '#2F6BFF' }}>{c.icon} {c.shortTitle}</span>
              ))}
            </div>
            <p className="hub-card__cta">ดูคอร์สทั้งหมด →</p>
          </Link>
          <Link href="/ebooks/" className="hub-card" style={{ borderTop: '3px solid #4F46E5' }}>
            <div className="hub-card__head">
              <span className="hub-card__icon" style={{ background: 'rgba(79,70,229,0.08)' }}>📚</span>
              <div>
                <p className="hub-card__eyebrow">02 · E-BOOK</p>
                <h2 className="hub-card__title">E-Book</h2>
              </div>
            </div>
            <p className="hub-card__desc">หนังสืออ่านเองแบบ Self-Study เล่าเป็นเรื่องต่อเนื่อง พร้อมตัวอย่างและ Prompt ให้ลองทำตาม</p>
            <div className="hub-card__meta">
              <span className="tag" style={{ background: 'rgba(79,70,229,0.08)', color: '#4F46E5' }}>
                {ebooks.length ? `${ebooks.length} เล่ม` : 'เร็วๆ นี้'}
              </span>
            </div>
            <p className="hub-card__cta">ดู E-Book →</p>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
