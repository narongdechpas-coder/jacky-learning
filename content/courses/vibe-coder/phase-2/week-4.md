---
title: "HTML & CSS + UI Elements (ส่วนประกอบหน้าเว็บ)"
hours: 3
---

## 📅 สัปดาห์ที่ 4 — HTML & CSS + UI Elements (ส่วนประกอบหน้าเว็บ)

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด [claude.ai](https://claude.ai) แล้วพิมพ์:

```
สร้าง Navbar มีโลโก้ "MyBrand" และเมนู 3 ข้อ
ใช้ HTML + CSS แสดงผลเป็น Artifact
```

**ถ้าเห็น Navbar Preview ใน Artifact = พร้อมแล้ว ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**HTML, CSS, JavaScript — สามส่วนของเว็บทุกหน้า**

ลองนึกว่าเราสร้างบ้าน:

```
HTML = โครงสร้างบ้าน
       กำแพง, ประตู, หน้าต่าง, ห้องต่างๆ
       → บอกว่า "มีอะไรบ้าง"

CSS  = การตกแต่งบ้าน
       สีผนัง, พรม, ผ้าม่าน, เฟอร์นิเจอร์
       → บอกว่า "หน้าตาเป็นยังไง"

JS   = ระบบไฟฟ้าและเครื่องใช้
       สวิตช์ไฟ, แอร์, TV, กริ่งประตู
       → บอกว่า "ทำงานได้อะไรบ้าง"
```

**ทำไมต้องรู้ทั้งที่ Claude เขียนให้ได้?**

เพราะถ้าไม่รู้ว่า "Flexbox" คืออะไร จะสั่ง Claude ไม่ได้ว่าต้องการ Layout แบบไหน เหมือนสั่งช่างบ้านโดยไม่รู้คำว่า "ผนังรับน้ำหนัก" — ผลลัพธ์จะผิดทุกครั้ง

---

### 🏗️ HTML — โครงสร้างพื้นฐาน

**Tags ที่ใช้บ่อยที่สุด — ต้องรู้จักหน้าตา**

```
<!-- โครงสร้างหลัก (Structure) -->
<html>        ← ครอบทุกอย่าง
<head>        ← ข้อมูล Meta ไม่แสดงบนหน้าเว็บ
<body>        ← เนื้อหาที่แสดงบนหน้าเว็บ

<!-- Heading (หัวข้อ) — h1 ใหญ่สุด h6 เล็กสุด -->
<h1>หัวข้อหลัก</h1>
<h2>หัวข้อรอง</h2>

<!-- Text (ข้อความ) -->
<p>ย่อหน้าข้อความ</p>
<span>ข้อความ inline</span>

<!-- Container (กล่องครอบ) -->
<div>กล่องทั่วไป Block element</div>

<!-- Link (ลิงก์) -->
<a href="https://...">ข้อความลิงก์</a>

<!-- Image (รูปภาพ) -->
<img src="images/photo.jpg" alt="คำอธิบายรูป">

<!-- List (รายการ) -->
<ul>                    ← Unordered List (จุด)
  <li>รายการ 1</li>
</ul>
<ol>                    ← Ordered List (ตัวเลข)
  <li>รายการ 1</li>
</ol>

<!-- Semantic Tags — บอก "ความหมาย" ของ Section -->
<header>   ← ส่วนบนของหน้า
<nav>      ← Navigation Bar
<main>     ← เนื้อหาหลัก
<section>  ← แบ่ง Section
<article>  ← เนื้อหาอิสระ เช่น บทความ
<footer>   ← ส่วนล่างของหน้า
```

---

### 🎨 CSS — ตกแต่งหน้าเว็บ

**วิธีเขียน CSS — 3 แบบ รู้ไว้อย่างน้อย 1**

```
/* แบบที่ 1: External CSS (แนะนำ) — ไฟล์ style.css แยกต่างหาก */
/* ใน HTML เรียกใช้ด้วย: <link rel="stylesheet" href="style.css"> */

/* แบบที่ 2: Internal CSS — อยู่ใน <style> tag ใน HTML */
<style>
  p { color: red; }
</style>

/* แบบที่ 3: Inline CSS — อยู่ใน style attribute */
<p style="color: red;">ข้อความ</p>
```

**CSS Properties ที่ใช้บ่อยที่สุด:**

```
/* สี (Color) */
color: #333333;                /* สีตัวอักษร */
background-color: #F0F4FF;     /* สีพื้นหลัง */

/* ขนาดตัวอักษร (Typography) */
font-size: 16px;               /* ขนาด */
font-weight: bold;             /* ความหนา */
font-family: 'Inter', sans-serif; /* Font */
text-align: center;            /* จัดชิด */

/* กล่อง (Box Model) */
padding: 16px;                 /* ระยะห่างภายใน */
margin: 24px auto;             /* ระยะห่างภายนอก / auto = กลาง */
border: 1px solid #E2E8F0;     /* เส้นขอบ */
border-radius: 8px;            /* ขอบโค้งมน */

/* ขนาด (Size) */
width: 100%;                   /* กว้าง */
max-width: 1200px;             /* กว้างสูงสุด */
height: 60px;                  /* สูง */

/* เงา (Shadow) */
box-shadow: 0 2px 8px rgba(0,0,0,0.1);

/* Flexbox — จัด Layout แนวนอนหรือแนวตั้ง */
display: flex;
justify-content: space-between; /* จัดแนวนอน */
align-items: center;            /* จัดแนวตั้ง */
gap: 16px;                      /* ระยะห่างระหว่าง Item */

/* Grid — จัด Layout แบบตาราง */
display: grid;
grid-template-columns: repeat(3, 1fr); /* 3 คอลัมน์เท่ากัน */
gap: 24px;
```

**CSS Variable (ตัวแปร CSS) — ใช้สร้าง Design System:**

```
/* กำหนดตัวแปรใน :root ใช้ได้ทั้งไฟล์ */
:root {
  --primary: #3B82F6;      /* สีหลัก */
  --secondary: #10B981;    /* สีรอง */
  --text-dark: #1E293B;    /* สีตัวอักษรเข้ม */
  --text-light: #64748B;   /* สีตัวอักษรอ่อน */
  --bg: #F8FAFC;           /* สีพื้นหลัง */
  --radius: 8px;           /* ความโค้งมนมาตรฐาน */
  --shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* ใช้ตัวแปร */
.button {
  background-color: var(--primary);
  border-radius: var(--radius);
}
```

---

### 🗂️ UI Elements — ชื่อชิ้นส่วน UI ที่ต้องรู้จัก

> 💡 **รู้ชื่อ = Prompt ได้ถูกต้อง** — เวลาสั่ง Claude ต้องบอกชื่อ Component ที่ต้องการ

| เห็นอะไร | ชื่อที่ถูกต้อง | Prompt Claude ว่า |
| --- | --- | --- |
| เมนู ☰ | **Hamburger Menu** | "สร้าง Hamburger Menu ที่เปิด Sidebar" |
| Popup กลางจอ | **Modal / Dialog** | "สร้าง Modal ยืนยันก่อนลบข้อมูล" |
| แถบแจ้งเตือน | **Toast / Snackbar** | "แสดง Toast Notification เมื่อ Save สำเร็จ" |
| เมนู Dropdown | **Dropdown Menu** | "สร้าง Dropdown Menu มี 3 ตัวเลือก" |
| คำอธิบายเมื่อ Hover | **Tooltip** | "เพิ่ม Tooltip อธิบายปุ่มนี้" |
| แถบด้านข้าง | **Sidebar / Drawer** | "สร้าง Sidebar Slide เข้าออก" |
| Tab สลับเนื้อหา | **Tabs** | "สร้าง Tabs มี 3 หัวข้อ" |
| วงกลมหมุน Loading | **Spinner / Skeleton Loader** | "แสดง Skeleton Loader ขณะดึงข้อมูล" |
| แถบความคืบหน้า | **Progress Bar** | "สร้าง Progress Bar แสดง % Upload" |
| ค้นหาพร้อมผลลัพธ์ | **Search Autocomplete** | "สร้าง Search Bar พร้อม Dropdown แนะนำ" |
| Slide แสดงรูป | **Carousel / Slider** | "สร้าง Image Carousel เลื่อนซ้ายขวา" |
| พับ/ขยายเนื้อหา | **Accordion / Collapsible** | "สร้าง FAQ Accordion" |
| Navigation ล่าง Mobile | **Bottom Navigation Bar** | "สร้าง Bottom Nav Bar สำหรับ Mobile" |
| พื้นมืดหลัง Modal | **Backdrop / Overlay** | "เพิ่ม Backdrop กดแล้วปิด Modal" |
| ป้ายสถานะ | **Badge / Chip** | "เพิ่ม Badge แจ้ง Notification Count" |
| ปุ่มลอยมุมจอ | **FAB (Floating Action Button)** | "สร้าง FAB สีน้ำเงิน มุมล่างขวา" |
| การ์ดข้อมูล | **Card** | "สร้าง Card แสดงข้อมูลสินค้า" |
| ฟอร์มกรอกข้อมูล | **Form / Input Field** | "สร้าง Form มีช่อง Name, Email, Submit" |

**แหล่งดู UI Elements เพิ่มเติม:**

-   🔗 [m3.material.io/components](https://m3.material.io/components) — ทุก Component พร้อม Demo
-   🔗 [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components) — ดู Live Demo ได้เลย

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — HTML & CSS Crash Course (ภาษาไทย)**

[![HTML CSS TH](https://img.youtube.com/vi/qz0aGYrrlhU/0.jpg)](https://www.youtube.com/watch?v=qz0aGYrrlhU)

🔗 [https://www.youtube.com/watch?v=qz0aGYrrlhU](https://www.youtube.com/watch?v=qz0aGYrrlhU)

> 💡 ดูเพื่อเข้าใจภาพรวม ไม่ต้องจำทุก Tag

---

**วิดีโอ 2 — Flexbox in 15 Minutes (English — Kevin Powell)**

[![Flexbox Kevin](https://img.youtube.com/vi/fYq5PXgSsbE/0.jpg)](https://www.youtube.com/watch?v=fYq5PXgSsbE)

🔗 [https://www.youtube.com/watch?v=fYq5PXgSsbE](https://www.youtube.com/watch?v=fYq5PXgSsbE)

> 💡 Flexbox คือหัวใจการจัด Layout — ดูแล้วจะ Prompt Claude ได้แม่นขึ้นมาก

---

**วิดีโอ 3 — CSS Grid in 20 Minutes (English — Kevin Powell)**

[![CSS Grid](https://img.youtube.com/vi/EiNiSFIPIQE/0.jpg)](https://www.youtube.com/watch?v=EiNiSFIPIQE)

🔗 [https://www.youtube.com/watch?v=EiNiSFIPIQE](https://www.youtube.com/watch?v=EiNiSFIPIQE)

---

### 📖 Further Reading

-   🔗 [web.dev/learn/html](https://web.dev/learn/html) — บทที่ 1–3
-   🔗 [flexbox.help](https://flexbox.help) — ทดลอง Flexbox แบบ Interactive
-   🔗 [cssgrid.io](https://cssgrid.io) — เรียน Grid ฟรี

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` — claude.ai

---

**Prompt 1 — ฝึกบอกชื่อ UI Element แล้วขอสร้าง**

```
[Context] ฉันกำลังสร้างเว็บ Portfolio ส่วนตัว
[Task] สร้าง UI Components ต่อไปนี้แยกทีละชิ้น:
1. Navbar มีโลโก้และเมนู 4 ข้อ พร้อม Hover Effect
2. Hero Section พื้นหลัง Gradient มี Headline และ CTA Button
3. Card Grid แสดง 3 Cards ใน 1 แถว
[Spec] ใช้ CSS Variable สำหรับสี:
- --primary: #6366F1 (Indigo)
- --text: #1E293B
- --bg: #F8FAFC
[Constraint] HTML + CSS ล้วน แสดงผลเป็น Artifact
```

---

**Prompt 2 — ให้ Claude อธิบาย Component ที่ไม่รู้จัก**

```
ฉันเห็น UI แบบนี้บนเว็บ: [อธิบายสิ่งที่เห็น]
1. ชื่อ Component นี้คืออะไร?
2. มันทำงานอย่างไร? (Behavior)
3. ใช้ใน Situation ไหนบ้าง?
4. ถ้าต้องการสร้าง ควร Prompt ว่าอะไร?
```

---

**Prompt ฉุกเฉิน — เมื่อไม่รู้จักคำศัพท์ CSS**

```
ฉันเห็นโค้ด CSS นี้แล้วไม่เข้าใจ:
[วาง CSS ที่ไม่เข้าใจ]
ช่วยอธิบายทีละ Property ว่าทำอะไร
ใช้ภาษาง่ายๆ เหมือนอธิบายให้เด็ก 10 ขวบฟัง
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

| Filename | Dimension | รายละเอียด | แหล่งรูปฟรี |
| --- | --- | --- | --- |
| `images/portfolio-hero.jpg` | 1440 × 600 px | Hero Background ของหน้า Portfolio | [unsplash.com](https://unsplash.com) |
| `images/project-1.jpg` | 600 × 400 px | รูปตัวอย่างโปรเจกต์ที่ 1 | [unsplash.com](https://unsplash.com) |
| `images/project-2.jpg` | 600 × 400 px | รูปตัวอย่างโปรเจกต์ที่ 2 | [unsplash.com](https://unsplash.com) |
| `images/project-3.jpg` | 600 × 400 px | รูปตัวอย่างโปรเจกต์ที่ 3 | [unsplash.com](https://unsplash.com) |

> 💡 ยังไม่มีรูป? บอก Claude: "ใช้ CSS Gradient Placeholder แทนรูปทุกจุด"

---

### 🛠️ Workshop — "Portfolio Homepage"

> 🏷️ **Module ที่ใช้:** `Claude Chat` ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **ต้องมีก่อนเริ่ม:** VS Code + Chrome + Folder โปรเจกต์ใหม่

**โจทย์ / Assignment:**

สร้างหน้าแรกของ Portfolio ส่วนตัว โดยใช้ CSS Variable สร้าง Design System ก่อน แล้วค่อย Build ทีละ Component มีครบ:

-   Navbar ที่มี Logo และ Menu
-   Hero Section พร้อมรูปและ CTA
-   Projects Section แสดง Card Grid 3 ชิ้น
-   Footer

---

**Checkpoint ก่อนเริ่ม:**

```
✅ สร้าง Folder ใหม่ชื่อ my-portfolio
✅ สร้างไฟล์ index.html และ style.css ว่างๆ ไว้ใน Folder
✅ สร้าง Folder images/ ไว้ข้างใน
✅ เปิด VS Code แล้ว Open Folder นั้น
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat` Chaining 5 รอบ**

```
=== Iteration 1: Design System ===
[Context] ฉันกำลังสร้าง Portfolio Website ส่วนตัว
[Task] สร้าง CSS Design System ไว้ใน style.css
[Spec] กำหนด CSS Variable ครบดังนี้:
- สี (Color): Primary, Secondary, Text Dark/Light, Background, White
- Typography: Font Family (Google Font ที่ดูดี), Scale h1–h4, body
- Spacing: --space-xs(4px), sm(8px), md(16px), lg(24px), xl(48px)
- Border Radius: --radius-sm(4px), md(8px), lg(16px), full(9999px)
- Shadow: --shadow-sm, md, lg
[Constraint] CSS ล้วน ยังไม่มี HTML

=== Iteration 2: HTML Structure ===
[Context] ต่อจาก Design System ที่มีอยู่
[Task] สร้าง HTML Skeleton ใน index.html
[Spec] มี Section: header/nav, hero, projects, footer
       ใส่ Placeholder Text แต่ใช้ Semantic HTML Tag ที่ถูกต้อง
[Constraint] ยังไม่ต้องเพิ่ม CSS Class หรือ Style

=== Iteration 3: Navbar + Hero ===
[Context] ต่อจาก HTML ที่มีอยู่
[Task] เพิ่ม Content และ Style ให้ Navbar และ Hero
[Spec]
Navbar:
- Logo: "[ชื่อคุณ]" ด้านซ้าย
- Menu Links: About, Projects, Contact ด้านขวา
- Background: สีขาว Box Shadow เล็กน้อย
- Sticky (ติดบนสุดเมื่อ Scroll)

Hero:
- Background Image: images/portfolio-hero.jpg
  ถ้าไม่มีใช้ Gradient จาก Primary ไป Secondary
- Headline: "[ชื่อคุณ] — [อาชีพ/สิ่งที่ทำ]"
- Subtext: "[คำอธิบาย 1 บรรทัด]"
- CTA Button: "ดูผลงานของฉัน" → Scroll ไป Projects
[Constraint] ใช้ CSS Variable ที่สร้างไว้ใน Design System เท่านั้น

=== Iteration 4: Projects Section ===
[Context] ต่อจากโค้ดที่มีอยู่
[Task] สร้าง Projects Section แสดง 3 Project Cards
[Spec]
- Section Heading: "ผลงานของฉัน"
- Card แต่ละอัน:
  - Project Image บน (images/project-1.jpg ถึง 3)
    ถ้าไม่มีรูปใช้ CSS Gradient Placeholder
  - ชื่อโปรเจกต์
  - คำอธิบาย 2 บรรทัด
  - Tag บอก Tech Stack เช่น HTML, CSS, JS
  - ปุ่ม "ดูโปรเจกต์"
- Layout: CSS Grid 3 คอลัมน์ Gap 24px
[Constraint] ใช้ CSS Variable เท่านั้น

=== Iteration 5: Footer + Interactions ===
[Context] ต่อจากโค้ดที่มีอยู่
[Task] เพิ่ม Footer และ JavaScript Interactions
[Spec]
Footer:
- Copyright: "© 2025 [ชื่อคุณ]"
- Social Links: GitHub, LinkedIn (ใส่ # แทน URL จริง)
- สี Background เข้ม

Interactions:
- Navbar: เพิ่ม Box Shadow เมื่อ Scroll ลง
- Project Cards: Hover แล้วยกตัวขึ้น (translateY -4px) + Shadow เพิ่ม
- CTA Button: Hover Effect + Scale 1.02
[Constraint] JavaScript ไม่เกิน 30 บรรทัด อยู่ใน <script> ท้ายไฟล์
```

---

**ขั้นตอนหลังได้ Artifact สุดท้าย:**

```
1. Copy HTML → วางใน index.html
2. Copy CSS → วางใน style.css
3. Copy JS (ถ้าแยก) → วางใน script.js
4. เปิด index.html ใน Chrome
5. ทดสอบ Hover ทุก Card และ Button
6. git add . → git commit -m "feat: portfolio homepage"
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| มี CSS Variable ครบ (สี/Font/Spacing) | ดูใน style.css เห็น :root | ไม่มี CSS Variable เลย |
| Navbar Sticky ทำงาน | ติดบนเมื่อ Scroll | หายไปเมื่อ Scroll |
| Hero มี Background หรือ Gradient | มีภาพพื้นหลัง | พื้นขาวเปล่า |
| Projects แสดง 3 Cards ใน Grid | Grid 3 คอลัมน์ | เรียงแนวตั้ง |
| Card Hover Effect ทำงาน | ยกตัวได้ | ไม่มี Effect |
| Commit ขึ้น GitHub แล้ว | มี Commit ใหม่ | ยังไม่ได้ Commit |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| CSS Variable ไม่ทำงาน | ไม่ได้ใส่ใน `:root {}` | ตรวจว่า Variable อยู่ใน `:root { }` |
| Flexbox ไม่จัดกลาง | ลืม `display: flex` | ถาม Claude: "ทำไม Flexbox ไม่ทำงาน" |
| Grid ไม่เป็น 3 คอลัมน์ | `grid-template-columns` ผิด | ถาม Claude: "แก้ Grid ให้เป็น 3 คอลัมน์เท่ากัน" |
| รูปไม่แสดงใน Card | Path ผิด | ตรวจว่าไฟล์อยู่ใน `images/` จริงไหม |
| Font ไม่โหลด | ไม่ได้ Link Google Fonts | ถาม Claude: "เพิ่ม Google Font \[ชื่อ Font\] ให้หน่อย" |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 5 ได้เลย!

---

---
