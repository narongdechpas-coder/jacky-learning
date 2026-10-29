// หน้ารวม E-Book — ข้อมูลอยู่ที่ content/ebooks.json, รูป Banner วางที่ public/ebooks/
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Crumbs from '@/components/Crumbs';
import { getEbooks } from '@/lib/content';
import { withBase } from '@/lib/basePath';

export const metadata = { title: 'E-Book' };

const STATUS = {
  available: { label: 'อ่านได้แล้ว', bg: 'rgba(52,199,89,0.1)', color: '#1F9D45' },
  writing: { label: 'กำลังเขียน', bg: 'rgba(255,149,0,0.1)', color: '#C26F00' },
  soon: { label: 'เร็วๆ นี้', bg: 'rgba(175,82,222,0.08)', color: '#AF52DE' },
};

function Banner({ book }) {
  if (book?.banner) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="ebook-banner" src={withBase(book.banner)} alt={book.title} />;
  }
  return (
    <div className="ebook-banner ebook-banner--empty">
      <span style={{ fontSize: 22 }}>🖼️</span>
      <span>Horizontal Banner · 1600 × 500 px (16:5)</span>
    </div>
  );
}

function EbookCard({ book }) {
  const st = STATUS[book.status] || STATUS.soon;
  const inner = (
    <>
      <Banner book={book} />
      <div className="ebook-body">
        <span className="ebook-status" style={{ background: st.bg, color: st.color }}>{st.label}</span>
        <h3 className="ebook-title">{book.title}</h3>
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
      <main className="page-main">
        <Crumbs items={[{ href: '/', label: 'หน้าแรก' }, { label: 'E-Book' }]} />
        <h1 className="doc-title" style={{ marginBottom: '0.75rem' }}>E-Book</h1>
        <p className="lead">หนังสืออ่านเองแบบ Self-Study ทีละบท พร้อมตัวอย่างและ Prompt ให้ลองทำตาม</p>
        <section style={{ marginTop: '2.5rem' }}>
          <h2 className="section-title">E-Book ทั้งหมด</h2>
          <div className="ebook-list">
            {ebooks.length > 0
              ? ebooks.map((b) => <EbookCard key={b.slug || b.title} book={b} />)
              : <EbookCard book={{ title: 'E-Book เล่มแรกกำลังจะมา', description: 'ติดตามได้เร็วๆ นี้', status: 'soon' }} />}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
