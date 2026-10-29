// หน้ารวมสัปดาห์ของแต่ละ Phase
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Crumbs from '@/components/Crumbs';
import IconChip from '@/components/IconChip';
import PhaseRail from '@/components/PhaseRail';
import { getAllCourses, getCourse, getPhase, weekLabel, fmtHours } from '@/lib/content';

export function generateStaticParams() {
  return getAllCourses().flatMap((c) => c.phases.map((p) => ({ slug: c.slug, phase: String(p.id) })));
}

export async function generateMetadata({ params }) {
  const { slug, phase } = await params;
  const c = getCourse(slug);
  const p = c && getPhase(c, phase);
  return { title: p ? `Phase ${p.id}: ${p.title} — ${c.shortTitle}` : undefined };
}

export default async function PhasePage({ params }) {
  const { slug, phase } = await params;
  const course = getCourse(slug);
  const p = course && getPhase(course, phase);
  if (!p) notFound();
  const idx = course.phases.indexOf(p);
  const prev = course.phases[idx - 1];
  const next = course.phases[idx + 1];
  const first = p.weeks[0];
  const ws = p.weeks.every((w) => w.isWorkshop);
  const base = `/courses/${slug}/phase/${p.id}`;

  return (
    <div className="page-shell">
      <SiteHeader active="courses" />
      <main className="page-main">
        <Crumbs items={[{ href: '/', label: 'หน้าแรก' }, { href: '/courses/', label: 'Online Training Course' }, { href: `/courses/${slug}/`, label: course.shortTitle }, { label: `Phase ${p.id}` }]} />
        <header className="phase-head">
          <PhaseRail slug={slug} phases={course.phases} current={p.id} />
          <div className="phase-head__title">
            <IconChip icon={p.icon} bg={p.bgColor} size={52} radius={16} fontSize={26} />
            <div>
              <span className="tag" style={{ background: p.bgColor, color: p.color }}>Phase {p.id} จาก {course.phases.length}</span>
              <h1 className="doc-title phase-head__h1">{p.title}</h1>
            </div>
          </div>
          <div className="phase-head__bar">
            <p className="phase-head__meta">{p.weeks.length} {ws ? 'Workshop' : 'สัปดาห์'} · ~{fmtHours(p.hours)} ชม.</p>
            <Link href={`${base}/week/${first.id}/`} className="btn-primary" style={{ background: p.color, boxShadow: `0 6px 16px ${p.color}40` }}>
              เริ่ม{weekLabel(first)} →
            </Link>
          </div>
        </header>

        <section>
          <h2 className="section-title">{ws ? 'Workshop ทั้งหมด' : 'สัปดาห์ทั้งหมด'}</h2>
          <ol className="lesson-list">
            {p.weeks.map((w) => (
              <li key={w.id}>
                <Link href={`${base}/week/${w.id}/`} className="lesson-row">
                  <span className="lesson-row__num" style={{ background: p.bgColor, color: p.color }}>
                    {w.isWorkshop ? w.workshopLetter : (w.weekLabel || w.id)}
                  </span>
                  <span className="lesson-row__text">
                    <span className="lesson-row__label">{weekLabel(w)} · {fmtHours(w.hours)} ชม.</span>
                    <span className="lesson-row__title">{w.title}</span>
                  </span>
                  <span className="lesson-row__go" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <nav className="doc-nav-row" aria-label="Phase ก่อนหน้าและถัดไป">
          {prev ? (
            <Link href={`/courses/${slug}/phase/${prev.id}/`} className="doc-nav-link">
              <span className="doc-nav-link__dir">← Phase {prev.id}</span>
              <span className="doc-nav-link__title">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/courses/${slug}/phase/${next.id}/`} className="doc-nav-link" style={{ textAlign: 'right' }}>
              <span className="doc-nav-link__dir">Phase {next.id} →</span>
              <span className="doc-nav-link__title">{next.title}</span>
            </Link>
          ) : (
            <Link href={`/courses/${slug}/`} className="doc-nav-link" style={{ textAlign: 'right' }}>
              <span className="doc-nav-link__dir">จบคอร์ส →</span>
              <span className="doc-nav-link__title">กลับไปภาพรวม {course.shortTitle}</span>
            </Link>
          )}
        </nav>
      </main>
      <SiteFooter line={course.footer} />
    </div>
  );
}
