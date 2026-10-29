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
  const dot = (bg) => <span style={{ width: 11, height: 11, borderRadius: '50%', background: bg, display: 'inline-block', flexShrink: 0 }} />;
  return (
    <div style={{ margin: '1.25rem 0', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 11, boxShadow: '0 12px 34px rgba(6,11,45,0.28)', overflow: 'hidden', maxWidth: '100%' }}>
      <div style={{ height: 34, background: '#161C33', display: 'flex', alignItems: 'center', gap: 7, padding: '0 13px' }}>
        {dot('#FF5F57')}{dot('#FEBC2E')}{dot('#28C840')}
        <button
          onClick={copy}
          aria-label="คัดลอกโค้ด"
          style={{
            marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5,
            background: copied ? 'rgba(91,224,160,0.18)' : 'rgba(255,255,255,0.08)', color: copied ? '#5BE0A0' : '#FFFFFF',
            border: `1px solid ${copied ? 'rgba(91,224,160,0.45)' : 'rgba(255,255,255,0.14)'}`, borderRadius: 6,
            fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1, padding: '4px 9px', cursor: 'pointer',
          }}
        >
          ⧉ {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div style={{ background: '#0C1124', overflowX: 'auto' }}>
        <pre ref={ref} style={{ padding: '16px 18px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.75, color: '#FFFFFF', margin: 0, background: 'transparent', whiteSpace: 'pre', minWidth: 'max-content' }}>
          {children}
        </pre>
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
      const color = label.includes('ไม่ผ่าน') ? '#E53E3E' : label.includes('ผ่าน') ? '#27AE60' : null;
      if (!color) return;
      t.querySelectorAll(`tbody tr td:nth-child(${col})`).forEach((td) => { td.style.color = color; td.style.fontWeight = '500'; });
    });
  }, []);
  return (
    <div style={{ margin: '1.25rem 0', border: '1px solid var(--c-navy-12)', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table ref={ref} style={{ minWidth: '100%', fontSize: '0.875rem', borderCollapse: 'collapse', width: '100%' }}>{children}</table>
      </div>
    </div>
  );
}

const isYoutube = (href) => !!href && (href.includes('youtube.com') || href.includes('youtu.be'));

const components = {
  h1: ({ children }) => <h1 style={{ fontSize: '1.6rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--c-navy-12)', color: 'var(--c-deep-navy)', lineHeight: 1.3 }}>{children}</h1>,
  h2: ({ children }) => <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem', paddingBottom: '0.6rem', borderBottom: '1px solid var(--c-navy-12)', color: 'var(--c-deep-navy)', lineHeight: 1.3 }}>{children}</h2>,
  h3: ({ children }) => <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--c-deep-navy)' }}>{children}</h3>,
  h4: ({ children }) => <h4 style={{ fontSize: '0.975rem', fontWeight: 600, marginTop: '1.25rem', marginBottom: '0.5rem', color: 'var(--c-deep-navy)' }}>{children}</h4>,
  p: ({ children }) => <p style={{ marginBottom: '0.875rem', lineHeight: 1.75, color: 'var(--c-navy-60)' }}>{children}</p>,
  blockquote: ({ children }) => <blockquote style={{ margin: '1.25rem 0', padding: '1rem 1.25rem', background: 'rgba(30,144,255,0.06)', border: '1px solid var(--c-navy-12)', borderLeft: '3px solid var(--c-electric-blue)', borderRadius: 10, color: 'var(--c-navy-60)', lineHeight: 1.7, fontSize: '0.95rem' }}>{children}</blockquote>,
  pre: ({ children }) => <CodeWindow>{children}</CodeWindow>,
  code: ({ className, children, node, ...rest }) => (className || String(children).includes('\n'))
    ? <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em', color: 'inherit' }} {...rest}>{children}</code>
    : <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88em', background: 'var(--c-navy-04)', border: '1px solid var(--c-navy-12)', padding: '1px 6px', borderRadius: 5, color: 'var(--c-vivid-indigo)' }} {...rest}>{children}</code>,
  table: ({ children }) => <Table>{children}</Table>,
  thead: ({ children }) => <thead style={{ background: 'rgba(11,22,41,0.08)' }}>{children}</thead>,
  th: ({ children }) => <th style={{ padding: '0.625rem 0.875rem', textAlign: 'left', fontSize: '0.8125rem', fontWeight: 600, borderBottom: '1px solid rgba(11,22,41,0.15)', borderRight: '1px solid rgba(11,22,41,0.10)', color: 'var(--c-deep-navy)', letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>{children}</th>,
  td: ({ children }) => <td style={{ padding: '0.625rem 0.875rem', borderBottom: '1px solid var(--c-navy-12)', borderRight: '1px solid var(--c-navy-12)', color: 'var(--c-deep-navy)', lineHeight: 1.6, fontSize: '0.875rem', verticalAlign: 'top' }}>{children}</td>,
  tr: ({ children }) => <tr className="md-tr">{children}</tr>,
  ul: ({ children }) => <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '0.875rem', color: 'var(--c-navy-60)', display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</ul>,
  ol: ({ children, start }) => <ol start={start} style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '0.875rem', color: 'var(--c-navy-60)', display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</ol>,
  li: ({ children }) => <li style={{ lineHeight: 1.7 }}>{children}</li>,
  a: ({ href, children }) => (
    <a href={withBase(href)} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-electric-blue)', textDecoration: 'underline', fontWeight: 500 }}>
      {isYoutube(href) && '🎬 '}{children}
    </a>
  ),
  img: ({ src, alt }) => {
    const s = typeof src === 'string' ? src : '';
    if (s.includes('img.youtube.com')) {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, margin: '8px 0', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--c-navy-12)', background: 'var(--c-navy-04)', fontSize: '0.875rem', color: 'var(--c-deep-navy)' }}>
          🎬 <span style={{ fontStyle: 'italic' }}>{alt || 'วิดีโอประกอบ'}</span>
        </span>
      );
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={withBase(s)} alt={alt ?? ''} loading="lazy" style={{ borderRadius: 8, maxWidth: '100%', margin: '0.75rem 0' }} />;
  },
  hr: () => <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--c-navy-12)' }} />,
  strong: ({ children }) => <strong style={{ fontWeight: 600, color: 'var(--c-deep-navy)' }}>{children}</strong>,
};

export default function Markdown({ content }) {
  return (
    <div style={{ width: '100%' }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
