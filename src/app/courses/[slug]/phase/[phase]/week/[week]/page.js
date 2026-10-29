// หน้าบทเรียนรายสัปดาห์
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import SiteFooter from '@/components/SiteFooter';
import Markdown from '@/components/Markdown';
import ChartTypesDemo from '@/components/ChartTypesDemo';
import { getAllCourses, getCourse, getPhase, getWeek, getFlatWeeks, weekLabel, fmtHours } from '@/lib/content';
import { withBase } from '@/lib/basePath';

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
      <span className="doc-nav-link__dir">{dir === 'next' ? 'ถัดไป →' : '← ก่อนหน้า'}</span>
      <span className="doc-nav-link__title">{weekLabel(w)}: {w.title}</span>
    </Link>
  );
}

function Clock() {
  return <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
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
          <nav className="lesson-crumb" aria-label="ตำแหน่งบทเรียน">
            <Link href={`/courses/${slug}/`}>{course.shortTitle}</Link>
            <span>›</span>
            <Link href={`/courses/${slug}/phase/${p.id}/`}>Phase {p.id}</Link>
            <span>›</span>
            <span style={{ color: 'var(--c-deep-navy)' }}>{weekLabel(w)}</span>
          </nav>
          <header className="lesson-head">
            <div className="lesson-head__tags">
              <span className="tag" style={{ background: p.bgColor, color: p.color }}>{p.icon} Phase {p.id} · {weekLabel(w)}</span>
              <span className="lesson-head__hours"><Clock /> {fmtHours(w.hours)} ชม.</span>
            </div>
            <h1 className="lesson-head__title">{w.title}</h1>
            <div className="lesson-progress">
              <span>บทที่ {idx + 1} จาก {flat.length}</span>
              <span className="lesson-progress__bar"><span style={{ width: `${Math.round(((idx + 1) / flat.length) * 100)}%` }} /></span>
            </div>
          </header>

          {w.downloads?.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <p className="section-label">ไฟล์ข้อมูลสำหรับ Workshop</p>
              {w.downloads.map((d) => (
                <a key={d.file} href={withBase(`/courses/${slug}/downloads/${d.file}`)} download={d.file} className="download-card">
                  <span className="download-card__icon">📊</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="download-card__name">{d.file}</p>
                    <p className="download-card__desc">{d.label} · {d.file.split('.').pop().toUpperCase()}</p>
                  </div>
                  <span className="btn-primary download-card__btn">⬇ Download</span>
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
