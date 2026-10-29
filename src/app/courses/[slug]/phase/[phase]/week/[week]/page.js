// หน้าบทเรียนรายสัปดาห์
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import SiteFooter from '@/components/SiteFooter';
import Markdown from '@/components/Markdown';
import ChartTypesDemo from '@/components/ChartTypesDemo';
import { getAllCourses, getCourse, getPhase, getWeek, getFlatWeeks, weekLabel, fmtHours } from '@/lib/content';

// คอมโพเนนต์ Interactive ที่เรียกใช้ได้จาก frontmatter: interactive: "<ชื่อ>"
const INTERACTIVE = { 'chart-types-demo': ChartTypesDemo };

export function generateStaticParams() {
  return getAllCourses().flatMap((c) => c.phases.flatMap((p) => p.weeks.map((w) => ({ slug: c.slug, phase: String(p.id), week: String(w.id) }))));
}

export async function generateMetadata({ params }) {
  const { slug, phase, week } = await params;
  const c = getCourse(slug);
  if (!c) return {};
  const w = getWeek(slug, phase, week);
  return { title: `${weekLabel(w)}: ${w.title} — ${c.shortTitle}` };
}

function NavLink({ w, slug, dir }) {
  if (!w) return <div />;
  return (
    <Link href={`/courses/${slug}/phase/${w.phaseId}/week/${w.id}/`} className="doc-nav-link" style={dir === 'next' ? { textAlign: 'right' } : undefined}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--c-navy-60)', marginBottom: 4 }}>{dir === 'next' ? 'ถัดไป →' : '← ก่อนหน้า'}</p>
      <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--c-deep-navy)' }}>{weekLabel(w)}: {w.title}</p>
    </Link>
  );
}

export default async function WeekPage({ params }) {
  const { slug, phase, week } = await params;
  const course = getCourse(slug);
  const p = course && getPhase(course, phase);
  if (!p || !p.weeks.find((w) => String(w.id) === String(week))) notFound();
  const w = getWeek(slug, phase, week);
  const flat = getFlatWeeks(course);
  const idx = flat.findIndex((x) => String(x.phaseId) === String(p.id) && String(x.id) === String(w.id));
  const Interactive = w.interactive ? INTERACTIVE[w.interactive] : null;

  return (
    <div className="docs-layout">
      <Sidebar course={course} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <main className="week-main" style={{ width: '100%', flex: 1 }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            <Link href={`/courses/${slug}/`} style={{ color: 'var(--c-navy-60)' }}>{course.shortTitle}</Link>
            <span style={{ color: 'var(--c-navy-60)' }}>›</span>
            <Link href={`/courses/${slug}/phase/${p.id}/`} style={{ color: 'var(--c-navy-60)' }}>Phase {p.id}</Link>
            <span style={{ color: 'var(--c-navy-60)' }}>›</span>
            <span style={{ color: 'var(--c-deep-navy)' }}>{weekLabel(w)}</span>
          </nav>
          <header style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--c-navy-12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: p.bgColor, color: p.color, border: `1px solid ${p.color}25` }}>
                {p.icon} Phase {p.id} · {weekLabel(w)}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-navy-60)' }}>⏱️ {fmtHours(w.hours)} ชม.</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.875rem)', fontWeight: 700, lineHeight: 1.25, color: 'var(--c-deep-navy)', letterSpacing: '-0.02em' }}>{w.title}</h1>
          </header>

          {w.downloads?.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-navy-60)', marginBottom: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>ไฟล์ข้อมูลสำหรับ Workshop</p>
              {w.downloads.map((d) => (
                <a key={d.file} href={`/courses/${slug}/downloads/${d.file}`} download={d.file} className="download-card">
                  <span style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(30,144,255,0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>📊</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, color: 'var(--c-deep-navy)', fontSize: '0.9rem', marginBottom: 2 }}>{d.file}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--c-navy-60)' }}>{d.label} · {d.file.split('.').pop().toUpperCase()}</p>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 20, background: 'var(--c-electric-blue)', color: '#fff', fontSize: '0.8rem', fontWeight: 600, flexShrink: 0, whiteSpace: 'nowrap' }}>⬇ Download</span>
                </a>
              ))}
            </div>
          )}

          <Markdown content={w.content} />
          {Interactive && <Interactive />}

          <div className="doc-nav-row">
            <NavLink w={flat[idx - 1]} slug={slug} dir="prev" />
            <NavLink w={flat[idx + 1]} slug={slug} dir="next" />
          </div>
        </main>
        <SiteFooter line={course.footer} />
      </div>
    </div>
  );
}
