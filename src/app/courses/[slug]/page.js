// หน้าภาพรวมคอร์ส: ส่วนหัว + Learning Pathway (ทุก Phase เรียงเป็นขั้น)
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Crumbs from '@/components/Crumbs';
import IconChip from '@/components/IconChip';
import { getAllCourses, getCourse, weekLabel, fmtHours } from '@/lib/content';
import { illustration } from '@/lib/illustration';

export function generateStaticParams() {
  return getAllCourses().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCourse(slug);
  return { title: c?.title, description: c?.description };
}

// ข้อความหลัง " — " ใน description เป็นตัวเลขซ้ำกับป้าย จึงตัดออก
const shortDesc = (d = '') => d.split(' — ')[0];

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  const { stats } = course;
  const first = course.phases[0];
  const art = illustration(`course-${slug}`);
  // จำนวนคอลัมน์ของ pathway: ไม่เกิน 4 ขั้นต่อแถว (6 Phase = 3 × 2)
  const cols = course.phases.length <= 4 ? course.phases.length : 3;

  return (
    <div className="page-shell">
      <SiteHeader active="courses" />
      <main className="page-main courses-main">
        <Crumbs items={[{ href: '/', label: 'หน้าแรก' }, { href: '/courses/', label: 'Online Training Course' }, { label: course.shortTitle }]} />
        <section className="course-hero">
          <div>
            <span className="tag" style={{ background: first.bgColor, color: first.color }}>
              {stats.phases} Phase · {stats.weeks} สัปดาห์{stats.workshops ? ` + ${stats.workshops} Workshop` : ''}
            </span>
            <h1 className="doc-title course-hero__title">{course.title}</h1>
            <p className="lead">{shortDesc(course.description)}</p>
            <div className="home-hero__actions">
              <Link href={`/courses/${slug}/phase/${first.id}/week/${first.weeks[0].id}/`} className="btn-primary">เริ่ม{weekLabel(first.weeks[0])} →</Link>
              <Link href="/courses/" className="btn-ghost">ดูคอร์สอื่น</Link>
            </div>
            <dl className="home-stats">
              <div><dt>Phase</dt><dd>{stats.phases}</dd></div>
              <div><dt>{stats.workshops ? 'สัปดาห์ + Workshop' : 'สัปดาห์'}</dt><dd>{stats.weeks + stats.workshops}</dd></div>
              <div><dt>ชั่วโมงโดยประมาณ</dt><dd>~{fmtHours(stats.hours)}</dd></div>
            </dl>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {art && <img className="course-hero__art" src={art} alt="" />}
        </section>

        <section>
          <h2 className="section-title">Learning Pathway</h2>
          <ol className={`path path--cols-${cols}`}>
            {course.phases.map((p, i) => {
              const ws = p.weeks.every((w) => w.isWorkshop);
              return (
                <li key={p.id} className="path-step">
                  <span className="path-step__num" style={{ background: p.color }}>{i + 1}</span>
                  <div className="path-step__card">
                    <div className="path-step__head">
                      <IconChip icon={p.icon} bg={p.bgColor} size={40} radius={12} fontSize={19} />
                      <div>
                        <p className="path-step__eyebrow" style={{ color: p.color }}>Phase {p.id}</p>
                        <h3 className="path-step__title"><Link href={`/courses/${slug}/phase/${p.id}/`}>{p.title}</Link></h3>
                      </div>
                    </div>
                    <p className="path-step__meta">{p.weeks.length} {ws ? 'Workshop' : 'สัปดาห์'} · ~{fmtHours(p.hours)} ชม.</p>
                    <ul className="path-step__weeks">
                      {p.weeks.map((w) => (
                        <li key={w.id}>
                          <Link href={`/courses/${slug}/phase/${p.id}/week/${w.id}/`}>
                            <span className="path-step__wlabel" style={{ color: p.color }}>{weekLabel(w)}</span>
                            <span>{w.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/courses/${slug}/phase/${p.id}/`} className="path-step__cta" style={{ color: p.color }}>ดู Phase {p.id} →</Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </main>
      <SiteFooter line={course.footer} />
    </div>
  );
}
