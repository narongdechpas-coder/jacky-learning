'use client';
// ตัวอย่าง Interactive ของคอร์ส Data Analysis & Viz สัปดาห์ 7 (ย้ายมาจากเว็บเดิมครบทุกกราฟ)
import { useCallback, useEffect, useRef, useState } from 'react';

const COLORS = ['#d97757', '#6a9b8e', '#e8c468', '#8a7ca8', '#5b8fb9', '#c97b8c', '#7fb069', '#d4a574', '#9d8189', '#6b6560'];
const CAT4 = ['อาหาร', 'เดินทาง', 'ของใช้', 'บันเทิง'];
const CAT10 = ['อาหาร', 'เดินทาง', 'ของใช้', 'บันเทิง', 'สุขภาพ', 'การศึกษา', 'เสื้อผ้า', 'ของขวัญ', 'สาธารณูปโภค', 'อื่นๆ'];
const WEEKS = Array.from({ length: 8 }, (_, i) => `สัปดาห์ ${i + 1}`);
const FONT = { family: 'Sarabun, sans-serif' };
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const randArr = (n, a = 15, b = 90) => Array.from({ length: n }, () => rand(a, b));
const scatterData = () => Array.from({ length: 20 }, () => ({ x: rand(5, 50), y: rand(300, 3000) }));
const BASE = { maintainAspectRatio: false, plugins: { legend: { labels: { font: { ...FONT, size: 11 } } } } };
const axes = (rot) => ({ y: { beginAtZero: true, ticks: { font: FONT } }, x: { ticks: { font: FONT, ...(rot ? { maxRotation: 45 } : {}) } } });

const card = { background: '#fff', border: '1px solid var(--c-navy-12)', borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '1.25rem' };
const titleS = { fontSize: '0.9375rem', fontWeight: 600, color: 'var(--c-deep-navy)', marginBottom: '0.375rem' };
const descS = { fontSize: '0.875rem', color: 'var(--c-navy-60)', marginBottom: '1rem', lineHeight: 1.65 };
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '0.875rem' };
const pill = { padding: '7px 18px', borderRadius: 20, border: '1px solid', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' };

function Card({ title, desc, onRandomize, children }) {
  return (
    <div style={card}>
      <p style={titleS}>{title}</p>
      <p style={descS}>{desc}</p>
      {children}
      <button onClick={onRandomize} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 18px', borderRadius: 20, border: '1px solid var(--c-navy-12)', background: 'var(--c-navy-04)', color: 'var(--c-deep-navy)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
        🎲 สุ่มข้อมูลใหม่
      </button>
    </div>
  );
}
function Box({ label, height = 240, children }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-navy-60)', textAlign: 'center', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
      <div style={{ background: 'var(--c-navy-04)', borderRadius: 8, padding: 12, position: 'relative', height }}>{children}</div>
    </div>
  );
}

export default function ChartTypesDemo() {
  const c = { bar: useRef(null), pie: useRef(null), line: useRef(null), bar2: useRef(null), sc: useRef(null), pie2: useRef(null), hbar: useRef(null) };
  const ch = useRef({});
  const [n, setN] = useState(4);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { default: Chart } = await import('chart.js/auto');
      if (!alive) return;
      const a = randArr(4);
      ch.current.bar = new Chart(c.bar.current, { type: 'bar', data: { labels: CAT4, datasets: [{ label: 'ค่าใช้จ่าย (บาท)', data: a, backgroundColor: COLORS.slice(0, 4), borderRadius: 4 }] }, options: { ...BASE, plugins: { ...BASE.plugins, legend: { display: false } }, scales: axes() } });
      ch.current.pie = new Chart(c.pie.current, { type: 'pie', data: { labels: CAT4, datasets: [{ data: a, backgroundColor: COLORS.slice(0, 4) }] }, options: { ...BASE, plugins: { ...BASE.plugins, legend: { position: 'bottom', labels: { font: { ...FONT, size: 11 }, padding: 10 } } } } });
      const w = randArr(8);
      ch.current.line = new Chart(c.line.current, { type: 'line', data: { labels: WEEKS, datasets: [{ label: 'ค่าใช้จ่าย (บาท)', data: w, borderColor: COLORS[4], backgroundColor: COLORS[4] + '33', fill: true, tension: 0.35, pointRadius: 4 }] }, options: { ...BASE, scales: axes(true) } });
      ch.current.bar2 = new Chart(c.bar2.current, { type: 'bar', data: { labels: WEEKS, datasets: [{ label: 'ค่าใช้จ่าย (บาท)', data: w, backgroundColor: COLORS[4] + 'BB', borderColor: COLORS[4], borderWidth: 1, borderRadius: 4 }] }, options: { ...BASE, scales: axes(true) } });
      ch.current.sc = new Chart(c.sc.current, { type: 'scatter', data: { datasets: [{ label: 'บิล vs ยอดขาย', data: scatterData(), backgroundColor: COLORS[5] + 'CC', pointRadius: 6 }] }, options: { ...BASE, scales: { x: { title: { display: true, text: 'จำนวนบิล', font: FONT }, ticks: { font: FONT } }, y: { title: { display: true, text: 'ยอดขายรวม (บาท)', font: FONT }, ticks: { font: FONT } } } } });
      const h = randArr(4);
      ch.current.pie2 = new Chart(c.pie2.current, { type: 'pie', data: { labels: CAT4, datasets: [{ data: h, backgroundColor: COLORS.slice(0, 4) }] }, options: { ...BASE, plugins: { ...BASE.plugins, legend: { position: 'bottom', labels: { font: { ...FONT, size: 11 }, padding: 8 } } } } });
      ch.current.hbar = new Chart(c.hbar.current, { type: 'bar', data: { labels: CAT4, datasets: [{ label: 'สัดส่วน (%)', data: h, backgroundColor: COLORS.slice(0, 4), borderRadius: 4 }] }, options: { ...BASE, indexAxis: 'y', plugins: { ...BASE.plugins, legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { font: FONT } }, y: { ticks: { font: FONT } } } } });
    })();
    return () => { alive = false; Object.values(ch.current).forEach((x) => x?.destroy()); ch.current = {}; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { pie2, hbar } = ch.current;
    if (!pie2 || !hbar) return;
    const labels = n === 4 ? CAT4 : CAT10; const data = randArr(n); const colors = COLORS.slice(0, n);
    for (const x of [pie2, hbar]) { x.data.labels = labels; x.data.datasets[0].data = data; x.data.datasets[0].backgroundColor = colors; x.update(); }
  }, [n]);

  const update = (keys, data) => keys.forEach((k) => { const x = ch.current[k]; if (x) { x.data.datasets[0].data = data; x.update(); } });
  const r1 = useCallback(() => update(['bar', 'pie'], randArr(4)), []);
  const r2 = useCallback(() => update(['line', 'bar2'], randArr(8)), []);
  const r3 = useCallback(() => update(['sc'], scatterData()), []);
  const choice = (v) => ({ ...pill, background: n === v ? 'var(--c-electric-blue)' : '#fff', color: n === v ? '#fff' : 'var(--c-deep-navy)', borderColor: n === v ? 'var(--c-electric-blue)' : 'var(--c-navy-12)' });

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
        <div style={{ width: 3, height: 24, borderRadius: 2, background: 'var(--c-electric-blue)' }} />
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--c-deep-navy)', margin: 0, flex: 1, minWidth: 0 }}>🖱️ ตัวอย่าง Interactive — ลองเปลี่ยนข้อมูลและสังเกตกราฟแต่ละแบบ</h2>
      </div>
      <Card title="1. Bar Chart vs Pie Chart — เปรียบเทียบหมวดหมู่" desc="ข้อมูลชุดเดียวกัน แต่ดูต่างกันใน Bar กับ Pie — กดสุ่มข้อมูลใหม่แล้วสังเกตว่าแบบไหนอ่านง่ายกว่า" onRandomize={r1}>
        <div style={grid}><Box label="Bar Chart"><canvas ref={c.bar} /></Box><Box label="Pie Chart"><canvas ref={c.pie} /></Box></div>
      </Card>
      <Card title="2. Line Chart vs Bar Chart — ข้อมูลตามเวลา" desc="ค่าใช้จ่ายรายสัปดาห์ 8 สัปดาห์ — Line Chart เหมาะกว่าสำหรับแนวโน้ม ส่วน Bar ดีสำหรับเทียบค่าแต่ละช่วง" onRandomize={r2}>
        <div style={grid}><Box label="Line Chart"><canvas ref={c.line} /></Box><Box label="Bar Chart"><canvas ref={c.bar2} /></Box></div>
      </Card>
      <Card title="3. Scatter Plot — ดูความสัมพันธ์ระหว่างตัวเลข 2 ชุด" desc="จำนวนบิลต่อวัน vs ยอดขายรวม — ถ้าจุดกระจายแนวขึ้นซ้ายล่างไปขวาบน แสดงว่าสัมพันธ์กันในทางบวก" onRandomize={r3}>
        <div style={{ ...grid, gridTemplateColumns: '1fr' }}><Box label="Scatter Plot" height={280}><canvas ref={c.sc} /></Box></div>
      </Card>
      <div style={card}>
        <p style={titleS}>4. ⚠️ Pie Challenge — ทดสอบข้อจำกัดของ Pie Chart</p>
        <p style={descS}>Pie Chart อ่านง่ายเมื่อมีน้อยกว่า 5-6 หมวด — ลองเปลี่ยนเป็น 10 หมวดแล้วดูว่าอ่านยากขึ้นแค่ไหน เทียบกับ Bar Chart ที่ข้อมูลเท่ากัน</p>
        <div style={{ display: 'flex', gap: 8, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <button onClick={() => setN(4)} style={choice(4)}>4 หมวด (อ่านง่าย)</button>
          <button onClick={() => setN(10)} style={choice(10)}>10 หมวด (อ่านยาก?)</button>
        </div>
        <div style={grid}>
          <Box label={`Pie Chart (${n} หมวด)`} height={280}><canvas ref={c.pie2} /></Box>
          <Box label={`Bar Chart (${n} หมวด)`} height={280}><canvas ref={c.hbar} /></Box>
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--c-navy-60)', marginTop: '0.5rem' }}>✅ สังเกตว่า Bar Chart บอกคำตอบได้เร็วกว่า Pie ทันทีที่หมวดเยอะขึ้น</p>
      </div>
    </div>
  );
}
