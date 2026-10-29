import Link from 'next/link';

// โลโก้: ลูกบาศก์แก้ว (อิงภาพ 3D Glass Cube ใน moodboard)
function Logo() {
  return (
    <svg className="site-header__logo" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f6bff" />
          <stop offset="1" stopColor="#7c8dff" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#logo-g)" />
      <path d="M16 7.5 24 12v8.5L16 25l-8-4.5V12z" fill="#fff" fillOpacity=".22" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 12l8 4.5 8-4.5M16 16.5V25" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

// แถบบนสุดของทุกหน้า (ยกเว้นหน้าบทเรียนที่ใช้ Sidebar แทน)
export default function SiteHeader({ active }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand"><Logo />Jacky Learning Hub</Link>
        <nav className="site-header__nav">
          <Link href="/" className={active === 'home' ? 'is-active' : ''}>หน้าแรก</Link>
          <Link href="/courses/" className={active === 'courses' ? 'is-active' : ''}>Online Training Course</Link>
          <Link href="/ebooks/" className={active === 'ebooks' ? 'is-active' : ''}>E-Book</Link>
        </nav>
      </div>
    </header>
  );
}
