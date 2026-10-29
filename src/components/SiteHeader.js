import Link from 'next/link';

// แถบบนสุดของทุกหน้า (ยกเว้นหน้าบทเรียนที่ใช้ Sidebar แทน)
export default function SiteHeader({ active }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">Jacky Learning Hub</Link>
        <nav className="site-header__nav">
          <Link href="/courses/" className={active === 'courses' ? 'is-active' : ''}>Online Training Course</Link>
          <Link href="/ebooks/" className={active === 'ebooks' ? 'is-active' : ''}>E-Book</Link>
        </nav>
      </div>
    </header>
  );
}
