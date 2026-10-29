// หน้าภาพรวมคอร์ส
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Crumbs from '@/components/Crumbs';
import IconChip from '@/components/IconChip';
import Stat from '@/components/Stat';
import { getAllCourses, getCourse, weekLabel, fmtHours } from '@/lib/content';

export function generateStaticParams() {
  return getAllCourses().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCourse(slug);
  return { title: c?.title, description: c?.description };
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  const { stats } = course;
  return (
    <div className="page-shell">
      <SiteHeader active="courses" />
      <main className="page-main">
        <Crumbs items={[{ href: '/', label: 'หน้าแรก' }, { href: '/courses/', label: 'Online Training Course' }, { label: course.shortTitle }]} />
        <h1 className="doc-title" style={{ marginBottom: '0.75rem' }}>{course.title}</h1>
        <p className="lead">{course.description}</p>
        <div className="stat-row">
          <Stat value={stats.phases} label="Phases" />
          <Stat value={stats.weeks + stats.workshops} label={stats.workshops ? 'สัปดาห์ + Workshop' : 'สัปดาห์'} />
          <Stat value={`~${fmtHours(stats.hours)}`} label="ชั่วโมงโดยประมาณ" />
        </div>
        <section>
          <h2 className="section-title">เนื้อหาทั้งหมด</h2>
          <div className="card-grid">
            {course.phases.map((p) => {
              const ws = p.weeks.every((w) => w.isWorkshop);
              return (
                <Link key={p.id} href={`/courses/${slug}/phase/${p.id}/`} className="phase-card">
                  <p className="phase-card__eyebrow">Phase {p.id}</p>
                  <div className="phase-card__title">
                    <IconChip icon={p.icon} bg={p.bgColor} />
                    <span>{p.title}</span>
                  </div>
                  <p className="phase-card__desc">{p.weeks.length} {ws ? 'Workshop' : 'สัปดาห์'} · ~{fmtHours(p.hours)} ชม.</p>
                  <div className="tag-row">
                    {p.weeks.map((w) => (
                      <span key={w.id} className="tag" style={{ background: p.bgColor, color: p.color }}>{weekLabel(w)}</span>
                    ))}
                  </div>
                  <p className="phase-card__cta">เริ่มเรียน →</p>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter line={course.footer} />
    </div>
  );
}
