# Jacky Learning Hub

รวมคอร์สออนไลน์ 4 คอร์สกับหน้า E-Book ไว้ในเว็บเดียว ใช้ดีไซน์เดียวกันทั้งหมด (ยึดตามคอร์ส Data Analysis & Viz)

- Next.js 16.2.9 (static export) → ได้ไฟล์ HTML ทั้งเว็บในโฟลเดอร์ `out/`
- เนื้อหาทุกบทเป็นไฟล์ Markdown แก้เนื้อหาได้โดยไม่ต้องแตะโค้ด UI

## โครงหน้าเว็บ

| URL | หน้า |
|---|---|
| `/` | หน้าหลัก: เลือก Online Training Course หรือ E-Book |
| `/courses/` | รวมคอร์สออนไลน์ทั้งหมด |
| `/courses/<slug>/` | ภาพรวมคอร์ส |
| `/courses/<slug>/phase/<n>/` | รวมสัปดาห์ใน Phase |
| `/courses/<slug>/phase/<n>/week/<w>/` | บทเรียนรายสัปดาห์ |
| `/ebooks/` | รวม E-Book (Banner แนวนอน) |

slug ของคอร์ส: `prompt-engineering`, `data-analysis-viz`, `data-storytelling`, `vibe-coder`

## โครงโฟลเดอร์

```
content/
  courses/<slug>/course.json        ชื่อคอร์ส คำอธิบาย Phase (ชื่อ ไอคอน สี) และลำดับสัปดาห์
  courses/<slug>/phase-N/week-M.md  เนื้อหาแต่ละสัปดาห์ (frontmatter + Markdown)
  ebooks.json                       รายการ E-Book
public/
  courses/<slug>/images|downloads   รูปและไฟล์ดาวน์โหลดของคอร์ส
  ebooks/                           รูป Banner ของ E-Book
  fonts/sarabun/                    ฟอนต์ Sarabun (โหลดจากเครื่อง ไม่พึ่ง Google Fonts)
src/
  app/                              หน้าเว็บทั้งหมด
  components/                       Sidebar, Markdown, ChartTypesDemo ฯลฯ
  lib/content.js                    ตัวอ่านเนื้อหาจาก content/
```

## งานที่ทำบ่อย

**แก้เนื้อหาบทเรียน** — แก้ไฟล์ `content/courses/<slug>/phase-N/week-M.md` ตรงๆ

frontmatter ที่ใช้ได้:

```yaml
title: "ชื่อบท"           # แสดงหัวหน้า เมนู และการ์ด
hours: 2.5               # ชั่วโมงของสัปดาห์ (รวมเป็นชั่วโมง Phase/คอร์สอัตโนมัติ)
weekLabel: "21–22"       # ใส่เมื่อหน้าเดียวครอบคลุมหลายสัปดาห์
isWorkshop: true         # หน้า Workshop (ป้ายจะเป็น Workshop A/B/C)
workshopLetter: "A"
interactive: "chart-types-demo"   # แปะคอมโพเนนต์ Interactive ท้ายบท
downloads:               # กล่องดาวน์โหลดไฟล์ด้านบนบท (ไฟล์อยู่ใน public/courses/<slug>/downloads/)
  - file: "workshop-a-sales-data.csv"
    label: "ยอดขายร้านกาแฟ 3 สาขา"
```

**เพิ่มสัปดาห์ใหม่** — สร้างไฟล์ `week-M.md` แล้วเพิ่ม `{ "id": M }` ใน `weeks` ของ Phase นั้นใน `course.json`

**เพิ่มคอร์สใหม่** — คัดลอกโฟลเดอร์คอร์สเดิมเป็นต้นแบบ เปลี่ยน `slug`, `order`, `icon` ใน `course.json`

**เพิ่ม E-Book** — วางรูป Banner ขนาด 1600 × 500 px (16:5) ที่ `public/ebooks/` แล้วเพิ่มใน `content/ebooks.json`

```json
[
  {
    "slug": "my-book",
    "title": "ชื่อหนังสือ",
    "description": "คำอธิบายสั้นๆ",
    "banner": "/ebooks/my-book.webp",
    "status": "available",
    "link": "https://ลิงก์ไปหน้าขายหรืออ่าน"
  }
]
```

`status`: `available` (อ่านได้แล้ว) / `writing` (กำลังเขียน) / `soon` (เร็วๆ นี้) — ไม่มี `link` การ์ดจะกดไม่ได้

## รันและ Deploy

```bash
npm install
npm run dev      # เปิด http://localhost:3000
npm run build    # สร้างเว็บไว้ที่ out/
```

Netlify: push ขึ้น GitHub แล้วเชื่อม repo ได้เลย ค่า build ตั้งไว้ใน `netlify.toml` แล้ว (`npm run build`, publish `out`)

GitHub Pages: push เข้า `main` แล้ว `.github/workflows/pages.yml` จะ build และ deploy ให้เอง เว็บอยู่ที่ `https://narongdechpas-coder.github.io/jacky-learning/` (ต้องตั้ง Settings → Pages → Source เป็น GitHub Actions ไว้ครั้งเดียว)

เว็บบน GitHub Pages อยู่ใต้ `/jacky-learning/` ไม่ได้อยู่ที่ราก ตอน build จึงตั้ง `BASE_PATH=/jacky-learning` ถ้าจะทดสอบแบบเดียวกันในเครื่อง:

```bash
BASE_PATH=/jacky-learning npm run build
```

ในโค้ด `<Link>` ต่อ path ให้เอง ส่วน `<img>` หรือ `<a>` ธรรมดาที่ชี้ไฟล์ใน `public/` ต้องครอบด้วย `withBase()` จาก `src/lib/basePath.js` ส่วนรูปในไฟล์ Markdown เขียน `/courses/...` ตามเดิมได้ เพราะตัวแสดง Markdown ต่อให้แล้ว

## ข้อตกลงด้านการแสดงผล (ให้ทุกคอร์สเหมือนกัน)

- สีหลักของเว็บอยู่ใน `:root` ของ `src/app/globals.css` (Cobalt `#2F6BFF`, Lavender `#7C8DFF`, Sky `#C6E7FF`, Mint `#DFF7EC`, ตัวอักษร Deep Navy `#172B4D`)
- สีประจำ Phase ไล่ตามลำดับ (โทนเดียวกับพาเลต แต่เข้มพอให้อ่านเป็นตัวอักษรได้): Cobalt `#2563EB` → Indigo `#4F46E5` → Sky `#0369A1` → Mint `#047857` → Violet `#7C3AED` → Teal `#0F766E`
- ป้ายสัปดาห์ใน UI ใช้ "สัปดาห์ N" หัวบทในเนื้อหาใช้ "📅 สัปดาห์ที่ N — ชื่อบท"
- หัวข้อมาตรฐานในบท: ⏱️ เวลาโดยประมาณ · 😊 Jacky ขออธิบายเพิ่มเติมว่า · ⚡ Quick Win (…) · 📖 เนื้อหาหลัก · 💬 Prompt สำเร็จรูป · 🛠️ Workshop — … · ✅ Acceptance Criteria · 🚨 Common Errors · 📖 Further Reading
- ตารางที่หัวคอลัมน์มีคำว่า "ผ่าน" / "ไม่ผ่าน" จะเป็นสีเขียว / แดงอัตโนมัติ

ดูรายการที่ปรับชื่อหัวข้อทั้งหมดได้ใน `CHANGELOG.md`
