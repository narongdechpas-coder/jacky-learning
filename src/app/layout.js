import './globals.css';

export const metadata = {
  title: { default: 'Jacky Learning Hub', template: '%s | Jacky Learning Hub' },
  description: 'ศูนย์รวมคอร์สออนไลน์และ E-Book ของ Jacky CP',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
