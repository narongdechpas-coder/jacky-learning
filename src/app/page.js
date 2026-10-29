// หน้าหลัก: แยกทางเข้า 2 ส่วน — Online Training Course และ E-Book
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import GlassCubes from '@/components/GlassCubes';
import { getAllCourses, getEbooks, fmtHours } from '@/lib/content';
import { illustration } from '@/lib/illustration';

// ภาพการ์ด: มีไฟล์จริงใช้ไฟล์ ไม่มีใช้ไอคอนในกรอบไล่สีแทน
function CardArt({ src, icon, tint }) {
  // eslint-disable-next-line @next/next/no-img-element
  if (src) return <img className="hub-card__art" src={src} alt="" />;
  return <span className="hub-card__art hub-card__art--icon" style={{ background: tint }}>{icon}</span>;
}

export default function HomePage() {
  const courses = getAllCourses();
  const ebooks = getEbooks();
  const weeks = courses.reduce((s, c) => s + c.stats.weeks + c.stats.workshops, 0);
  const hours = courses.reduce((s, c) => s + c.stats.hours, 0);
  const hero = illustration('hero-learner');

  return (
    <div className="page-shell">
      <SiteHeader active="home" />
      {/* หน้าแรกจัดให้จบในจอเดียว (จอคอม/โน้ตบุ๊ก) ไม่ต้องเลื่อนลง */}
      <main className="page-main home-main">
        <section className="home-hero">
          <div className="home-hero__text">
            <p className="home-hero__eyebrow">Learn · Apply · Create · Grow</p>
            <h1 className="home-hero__title">Jacky <span className="text-gradient">Learning Hub</span></h1>
            <p className="lead">ศูนย์รวมการเรียนรู้ เลือกเรียนแบบคอร์สออนไลน์ทีละสัปดาห์ หรืออ่าน E-Book ตามจังหวะของตัวเอง</p>
            <div className="home-hero__actions">
              <Link href="/courses/" className="btn-primary">เริ่มเรียนคอร์ส →</Link>
              <Link href="/ebooks/" className="btn-secondary">ดู E-Book</Link>
            </div>
            <dl className="home-stats">
              <div><dt>คอร์สออนไลน์</dt><dd>{courses.length}</dd></div>
              <div><dt>สัปดาห์ + Workshop</dt><dd>{weeks}</dd></div>
              <div><dt>ชั่วโมงเรียนรวม</dt><dd>~{fmtHours(hours)}</dd></div>
              <div><dt>E-Book</dt><dd>{ebooks.length}</dd></div>
            </dl>
          </div>
          <div className="home-hero__art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {hero ? <img src={hero} alt="ผู้เรียนเดินขึ้นบันไดแก้วไปหาลูกบาศก์ AI" /> : <GlassCubes />}
          </div>
        </section>

        <div className="hub-grid">
          <Link href="/courses/" className="hub-card">
            <div className="hub-card__body">
              <p className="hub-card__eyebrow">01 · ONLINE TRAINING COURSE</p>
              <h2 className="hub-card__title">คอร์สออนไลน์</h2>
              <p className="hub-card__desc">เรียนเป็น Phase และสัปดาห์ มี Workshop, Prompt สำเร็จรูป และเกณฑ์ผ่านทุกสัปดาห์</p>
              <div className="hub-card__meta">
                {courses.map((c) => (
                  <span key={c.slug} className="tag" style={{ background: 'rgba(47,107,255,0.08)', color: '#2563EB' }}>{c.icon} {c.shortTitle}</span>
                ))}
              </div>
            </div>
            <CardArt src={illustration('hub-courses')} icon="🎓" tint="linear-gradient(135deg, #e4f1ff, #c6e7ff)" />
            <span className="hub-card__go" aria-hidden="true">→</span>
          </Link>
          <Link href="/ebooks/" className="hub-card">
            <div className="hub-card__body">
              <p className="hub-card__eyebrow">02 · E-BOOK</p>
              <h2 className="hub-card__title">E-Book</h2>
              <p className="hub-card__desc">หนังสืออ่านเองแบบ Self-Study เล่าเป็นเรื่องต่อเนื่อง พร้อมตัวอย่างและ Prompt ให้ลองทำตาม</p>
              <div className="hub-card__meta">
                <span className="tag" style={{ background: 'rgba(79,70,229,0.08)', color: '#4F46E5' }}>
                  {ebooks.length ? `${ebooks.length} เล่ม` : 'เร็วๆ นี้'}
                </span>
              </div>
            </div>
            <CardArt src={illustration('hub-ebooks')} icon="📚" tint="linear-gradient(135deg, #eef0ff, #dfe3ff)" />
            <span className="hub-card__go" aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
