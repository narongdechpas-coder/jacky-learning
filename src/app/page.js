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
      <SiteHeader />
      <main className="page-main">
        <p className="doc-crumb">หน้าแรก</p>
        <h1 className="doc-title" style={{ marginBottom: '0.75rem' }}>Jacky Learning Hub</h1>
        <p className="lead">ศูนย์รวมการเรียนรู้ เลือกเรียนแบบคอร์สออนไลน์ทีละสัปดาห์ หรืออ่าน E-Book ตามจังหวะของตัวเอง</p>
        <div className="stat-row">
          <Stat value={courses.length} label="คอร์สออนไลน์" />
          <Stat value={weeks} label="สัปดาห์ + Workshop" />
          <Stat value={`~${fmtHours(hours)}`} label="ชั่วโมงเรียนรวม" />
          <Stat value={ebooks.length} label="E-Book" />
        </div>

        <section>
          <h2 className="section-title">เลือกรูปแบบการเรียน</h2>
          <div className="hub-grid">
            <Link href="/courses/" className="hub-card" style={{ borderTop: '3px solid #0071E3' }}>
              <span className="hub-card__icon" style={{ background: 'rgba(0,113,227,0.07)' }}>🎓</span>
              <p className="hub-card__eyebrow">01 · ONLINE TRAINING COURSE</p>
              <h3 className="hub-card__title">คอร์สออนไลน์</h3>
              <p className="hub-card__desc">เรียนเป็น Phase และสัปดาห์ มี Workshop, Prompt สำเร็จรูป และเกณฑ์ผ่านทุกสัปดาห์</p>
              <div className="hub-card__meta">
                {courses.map((c) => (
                  <span key={c.slug} className="tag" style={{ background: 'rgba(0,113,227,0.07)', color: '#0071E3' }}>{c.icon} {c.shortTitle}</span>
                ))}
              </div>
              <p className="hub-card__cta">ดูคอร์สทั้งหมด →</p>
            </Link>
            <Link href="/ebooks/" className="hub-card" style={{ borderTop: '3px solid #AF52DE' }}>
              <span className="hub-card__icon" style={{ background: 'rgba(175,82,222,0.07)' }}>📚</span>
              <p className="hub-card__eyebrow">02 · E-BOOK</p>
              <h3 className="hub-card__title">E-Book</h3>
              <p className="hub-card__desc">หนังสืออ่านเองแบบ Self-Study เล่าเป็นเรื่องต่อเนื่อง พร้อมตัวอย่างและ Prompt ให้ลองทำตาม</p>
              <div className="hub-card__meta">
                <span className="tag" style={{ background: 'rgba(175,82,222,0.07)', color: '#AF52DE' }}>
                  {ebooks.length ? `${ebooks.length} เล่ม` : 'เร็วๆ นี้'}
                </span>
              </div>
              <p className="hub-card__cta">ดู E-Book →</p>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
