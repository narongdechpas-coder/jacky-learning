import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export default function NotFound() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-main">
        <p className="doc-crumb">404</p>
        <h1 className="doc-title">ไม่พบหน้านี้</h1>
        <p className="lead">ลิงก์อาจเปลี่ยนไปแล้ว ลองกลับไปที่ <Link href="/" style={{ color: 'var(--c-electric-blue)', textDecoration: 'underline' }}>หน้าแรก</Link></p>
      </main>
      <SiteFooter />
    </div>
  );
}
