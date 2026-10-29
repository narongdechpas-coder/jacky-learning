// หน้ารวม E-Book — ข้อมูลอยู่ที่ content/ebooks.json, รูปปกวางที่ public/ebooks/
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Crumbs from '@/components/Crumbs';
import { getEbooks } from '@/lib/content';
import { withBase } from '@/lib/basePath';

export const metadata = { title: 'E-Book' };

const STATUS = {
  available: { label: 'อ่านได้แล้ว', bg: 'rgba(4,120,87,0.1)', color: '#047857' },
  writing: { label: 'กำลังเขียน', bg: 'rgba(47,107,255,0.1)', color: '#2563EB' },
  soon: { label: 'เร็วๆ นี้', bg: 'rgba(79,70,229,0.08)', color: '#4F46E5' },
};

// ปกหนังสือแนวตั้ง (A5 ≈ 1 : 1.414) ไม่มีรูปปกใช้ปกสำรองแบบไล่สี
function Cover({ book }) {
  if (book.cover) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="ebook-cover" src={withBase(book.cover)} alt={`ปกหนังสือ ${book.title}`} />;
  }
  return (
    <div className="ebook-cover ebook-cover--empty" aria-hidden="true">
      <span className="ebook-cover__mark">📘</span>
      <span className="ebook-cover__soon">Coming Soon</span>
    </div>
  );
}

function EbookCard({ book }) {
  const st = STATUS[book.status] || STATUS.soon;
  const inner = (
    <>
      <Cover book={book} />
      <div className="ebook-body">
        <span className="ebook-status" style={{ background: st.bg, color: st.color }}>{st.label}</span>
        <h2 className="ebook-title">{book.title}</h2>
        {book.description && <p className="ebook-desc">{book.description}</p>}
      </div>
    </>
  );
  return book.link
    ? <a className="ebook-card" href={book.link} target="_blank" rel="noopener noreferrer">{inner}</a>
    : <div className="ebook-card">{inner}</div>;
}

export default function EbooksPage() {
  const ebooks = getEbooks();
  return (
    <div className="page-shell">
      <SiteHeader active="ebooks" />
      <main className="page-main courses-main">
        <Crumbs items={[{ href: '/', label: 'หน้าแรก' }, { label: 'E-Book' }]} />
        <h1 className="doc-title" style={{ marginBottom: '0.75rem' }}>E-Book</h1>
        <p className="lead">หนังสืออ่านเองแบบ Self-Study ทีละบท พร้อมตัวอย่างและ Prompt ให้ลองทำตาม</p>
        <div className="ebook-grid">
          {ebooks.length > 0
            ? ebooks.map((b) => <EbookCard key={b.slug || b.title} book={b} />)
            : <EbookCard book={{ title: 'E-Book เล่มแรกกำลังจะมา', description: 'ติดตามได้เร็วๆ นี้', status: 'soon' }} />}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
