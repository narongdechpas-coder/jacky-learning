'use client';
// ตัวแสดงเนื้อหาบทเรียนจาก Markdown — สไตล์ทุก element ยึดตามคอร์ส Data Analysis & Viz
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { withBase } from '@/lib/basePath';

// กล่องโค้ดแบบหน้าต่าง Terminal + ปุ่ม Copy
function CodeWindow({ children }) {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(ref.current?.innerText ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard ไม่พร้อมใช้งาน */ }
  }
  return (
    <div className="code-win">
      <div className="code-win__bar">
        <span className="code-win__dot" style={{ background: '#FF5F57' }} />
        <span className="code-win__dot" style={{ background: '#FEBC2E' }} />
        <span className="code-win__dot" style={{ background: '#28C840' }} />
        <button onClick={copy} aria-label="คัดลอกโค้ด" className={`code-win__copy${copied ? ' is-done' : ''}`}>
          {copied ? '✓ คัดลอกแล้ว' : '⧉ Copy'}
        </button>
      </div>
      <div className="code-win__body">
        <pre ref={ref}>{children}</pre>
      </div>
    </div>
  );
}

// ตาราง: คอลัมน์ "ผ่าน" เป็นสีเขียว / "ไม่ผ่าน" เป็นสีแดงอัตโนมัติ
function Table({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const t = ref.current;
    if (!t) return;
    Array.from(t.querySelectorAll('thead th')).forEach((th, i) => {
      const label = th.textContent ?? '';
      const col = i + 1;
      const cls = label.includes('ไม่ผ่าน') ? 'is-fail' : label.includes('ผ่าน') ? 'is-pass' : null;
      if (!cls) return;
      t.querySelectorAll(`tbody tr td:nth-child(${col})`).forEach((td) => td.classList.add(cls));
    });
  }, []);
  return (
    <div className="md-table">
      <div className="md-table__scroll">
        <table ref={ref}>{children}</table>
      </div>
    </div>
  );
}

const isYoutube = (href) => !!href && (href.includes('youtube.com') || href.includes('youtu.be'));

// สไตล์ของแต่ละ element อยู่ใน .prose ที่ globals.css
const components = {
  pre: ({ children }) => <CodeWindow>{children}</CodeWindow>,
  code: ({ className, children, node, ...rest }) => (className || String(children).includes('\n'))
    ? <code className="code-block" {...rest}>{children}</code>
    : <code className="code-inline" {...rest}>{children}</code>,
  table: ({ children }) => <Table>{children}</Table>,
  tr: ({ children }) => <tr className="md-tr">{children}</tr>,
  a: ({ href, children }) => (
    <a href={withBase(href)} target="_blank" rel="noopener noreferrer">
      {isYoutube(href) && '🎬 '}{children}
    </a>
  ),
  img: ({ src, alt }) => {
    const s = typeof src === 'string' ? src : '';
    if (s.includes('img.youtube.com')) {
      return <span className="md-video">🎬 <span>{alt || 'วิดีโอประกอบ'}</span></span>;
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={withBase(s)} alt={alt ?? ''} loading="lazy" />;
  },
};

export default function Markdown({ content }) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
