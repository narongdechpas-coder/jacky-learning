// หน้ารวมสัปดาห์ของแต่ละ Phase
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Crumbs from '@/components/Crumbs';
import IconChip from '@/components/IconChip';
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
  const first = p.weeks[0];
  const base = `/courses/${slug}/phase/${p.id}`;
  return (
    <div className="page-shell">
      <SiteHeader active="courses" />
      <main className="page-main" style={{ paddingTop: '2.5rem' }}>
        <Crumbs items={[{ href: '/', label: 'หน้าแรก' }, { href: `/courses/${slug}/`, label: course.shortTitle }, { label: `Phase ${p.id}` }]} />
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
            <IconChip icon={p.icon} bg={p.bgColor} size={42} radius={12} fontSize={20} border={`1px solid ${p.color}20`} />
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-navy-60)', marginBottom: 2 }}>Phase {p.id}</p>
              <h1 className="doc-title" style={{ marginBottom: 0, fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>{p.title}</h1>
            </div>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--c-navy-60)', marginTop: '0.5rem' }}>
            {p.weeks.length} {p.weeks.every((w) => w.isWorkshop) ? 'Workshop' : 'สัปดาห์'} · ~{fmtHours(p.hours)} ชม. ·{' '}
            <Link href={`${base}/week/${first.id}/`} style={{ color: 'var(--c-electric-blue)', textDecoration: 'underline' }}>เริ่ม{weekLabel(first)}</Link>
          </p>
        </div>
        <section>
          <h2 className="section-title" style={{ paddingBottom: '0.625rem', marginBottom: '1.25rem' }}>{p.weeks.every((w) => w.isWorkshop) ? 'Workshop ทั้งหมด' : 'สัปดาห์ทั้งหมด'}</h2>
          <div className="week-grid">
            {p.weeks.map((w) => (
              <Link key={w.id} href={`${base}/week/${w.id}/`} className="week-card">
                <span className="week-card__num" style={{ background: p.bgColor, borderColor: `${p.color}30`, color: p.color }}>
                  {w.isWorkshop ? w.workshopLetter : (w.weekLabel || w.id)}
                </span>
                <div>
                  <p className="week-card__label">{weekLabel(w)} · ⏱️ {fmtHours(w.hours)} ชม.</p>
                  <p className="week-card__title">{w.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Link href={`${base}/week/${first.id}/`} className="btn-primary" style={{ background: p.color, boxShadow: `0 2px 12px ${p.color}40` }}>
              {p.icon} เริ่มเรียน Phase {p.id} →
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter line={course.footer} />
    </div>
  );
}
