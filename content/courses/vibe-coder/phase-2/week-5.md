---
title: "Responsive Design + Design System (เว็บดีทุกอุปกรณ์)"
hours: 3
---

## 📅 สัปดาห์ที่ 5 — Responsive Design + Design System (เว็บดีทุกอุปกรณ์)

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Portfolio จากสัปดาห์ 4 ใน Chrome แล้วกด **F12 → Ctrl+Shift+M** (หรือคลิกไอคอนมือถือใน DevTools)

```
ถ้าหน้าเว็บแตกหรือ Layout พัง = ยังไม่ Responsive ต้องแก้ในสัปดาห์นี้
ถ้าหน้าเว็บดูดีบนมือถือด้วย = เยี่ยมมาก! ✅
```

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Responsive Design คืออะไร?**

ลองนึกถึงน้ำในแก้ว น้ำจะปรับรูปร่างตามแก้วเสมอ ไม่ว่าแก้วจะเล็กหรือใหญ่ Responsive Design คือการทำให้เว็บ "ปรับรูปร่างตามหน้าจอ" เหมือนกัน

```
หน้าจอกว้าง (Desktop 1440px)
→ แสดง 3 คอลัมน์ Navbar แนวนอน

หน้าจอกลาง (Tablet 768px)
→ แสดง 2 คอลัมน์ Navbar ยังอยู่

หน้าจอแคบ (Mobile 375px)
→ แสดง 1 คอลัมน์ Hamburger Menu แทน Navbar
```

**Mobile-first คืออะไร?**

แทนที่จะออกแบบ Desktop ก่อนแล้วย่อลงมา Mobile-first คือออกแบบ Mobile ก่อนแล้วค่อยขยายขึ้น Desktop เหมือนสร้างบ้านเล็กก่อนแล้วต่อเติม ดีกว่าสร้างบ้านใหญ่แล้วรื้อทิ้ง

---

### 📐 Media Query — หัวใจของ Responsive

**Breakpoints มาตรฐานที่ใช้กันทั่วโลก:**

```
/* Mobile-first: เขียน Style สำหรับมือถือก่อน */
/* แล้วค่อย Override สำหรับหน้าจอใหญ่ขึ้น */

/* Default (Mobile): ไม่ต้องมี @media */
.grid {
  display: grid;
  grid-template-columns: 1fr;  /* 1 คอลัมน์ */
}

/* Tablet (≥ 768px) */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);  /* 2 คอลัมน์ */
  }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);  /* 3 คอลัมน์ */
  }
}
```

**Breakpoints ที่ Tailwind CSS ใช้ (มาตรฐาน):**

```
sm  → 640px   (Mobile Landscape / Small Tablet)
md  → 768px   (Tablet Portrait)
lg  → 1024px  (Laptop / Tablet Landscape)
xl  → 1280px  (Desktop)
2xl → 1536px  (Large Desktop)
```

---

### 🎨 Design System — ทำให้เว็บดู Consistent

**ทำไมต้องมี Design System?**

```
ปัญหาที่เกิดขึ้นบ่อย:
- Button นี้ขอบโค้ง 4px แต่อีก Button 8px
- สีน้ำเงินใน Navbar ≠ สีน้ำเงินใน Button
- Font ขนาดต่างกันทุก Section

Design System แก้ปัญหานี้โดยกำหนด "กฎ" ตายตัว
แล้วทุกอย่างในเว็บใช้กฎเดียวกันหมด = ดู Professional
```

**Design Token ครบชุด — Copy ไปใช้ได้เลย:**

```
:root {
  /* ===== Color Palette (โทนสี) ===== */
  --color-primary-50:  #EEF2FF;
  --color-primary-100: #E0E7FF;
  --color-primary-500: #6366F1;   /* Primary หลัก */
  --color-primary-600: #4F46E5;   /* Primary Hover */
  --color-primary-700: #4338CA;   /* Primary Active */

  --color-neutral-50:  #F8FAFC;   /* Background */
  --color-neutral-100: #F1F5F9;
  --color-neutral-200: #E2E8F0;   /* Border */
  --color-neutral-600: #475569;   /* Text Light */
  --color-neutral-800: #1E293B;   /* Text Dark */
  --color-neutral-900: #0F172A;   /* Heading */

  /* ===== Typography Scale ===== */
  --font-sans: 'Inter', sans-serif;
  --font-display: 'Poppins', sans-serif;

  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px — Body */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px — Heading */

  /* ===== Spacing Scale (ทวีคูณของ 4px) ===== */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;

  /* ===== Border Radius ===== */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;

  /* ===== Shadow ===== */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.10);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.10);
}
```

---

### 🔍 Chrome DevTools — ทดสอบ Responsive

**วิธีใช้ Responsive Mode ใน Chrome:**

```
1. เปิดหน้าเว็บใน Chrome
2. กด F12 เปิด DevTools
3. คลิกไอคอนมือถือ (Toggle Device Toolbar) หรือกด Ctrl+Shift+M
4. เลือกอุปกรณ์จาก Dropdown เช่น iPhone 14, iPad
5. ลาก Handle ขอบเปลี่ยนขนาดได้เองด้วย
6. กด Ctrl+Shift+M อีกครั้งเพื่อออก
```

**Device ที่ควรทดสอบเสมอ:**

```
Mobile  → iPhone SE (375px) — เล็กสุดที่ยังใช้กัน
Tablet  → iPad (768px)
Desktop → 1280px ขึ้นไป
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Responsive Design ภาษาไทย**

[![Responsive TH](https://img.youtube.com/vi/srvUrASNj0s/0.jpg)](https://www.youtube.com/watch?v=srvUrASNj0s)

🔗 [https://www.youtube.com/watch?v=srvUrASNj0s](https://www.youtube.com/watch?v=srvUrASNj0s)

---

**วิดีโอ 2 — CSS Media Queries (Kevin Powell — English)**

[![Media Query](https://img.youtube.com/vi/K24lUqcT0Ms/0.jpg)](https://www.youtube.com/watch?v=K24lUqcT0Ms)

🔗 [https://www.youtube.com/watch?v=K24lUqcT0Ms](https://www.youtube.com/watch?v=K24lUqcT0Ms)

> 💡 Kevin Powell คือครู CSS ที่ดีที่สุดบน YouTube — ดูช่วง 0:00–12:00

---

### 📖 Further Reading

-   🔗 [web.dev/learn/design](https://web.dev/learn/design) — Responsive Design Guide
-   🔗 [developer.chrome.com/docs/devtools](https://developer.chrome.com/docs/devtools) — DevTools Guide

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat`

---

**Prompt 1 — ทำ Portfolio Responsive**

```
[Context] ต่อจาก Portfolio Homepage ที่สร้างไว้แล้ว
[Task] เพิ่ม Responsive Design ให้ทำงานได้ทุกขนาดหน้าจอ
[Spec] ใช้ Mobile-first approach:
Mobile (< 768px):
- Navbar: ซ่อน Menu แสดง Hamburger Icon แทน
- Hero: Font เล็กลง, รูปย้ายไปอยู่ด้านบน
- Projects Grid: เปลี่ยนเป็น 1 คอลัมน์

Tablet (768px–1024px):
- Navbar: แสดง Menu ปกติ
- Projects Grid: 2 คอลัมน์

Desktop (> 1024px):
- ทุกอย่างเหมือนเดิม 3 คอลัมน์
[Constraint] ใช้ CSS Media Query เท่านั้น ไม่ใช้ Framework
```

---

**Prompt 2 — สร้าง Design System ใหม่ให้โปรเจกต์**

```
[Context] ฉันกำลังสร้าง [ชื่อโปรเจกต์] เว็บสำหรับ [กลุ่มเป้าหมาย]
[Task] สร้าง CSS Design System ที่เหมาะกับโปรเจกต์นี้
[Spec]
- Mood ที่ต้องการ: [เช่น Professional, Playful, Minimal, Bold]
- Primary Color ที่ชอบ: [ระบุสี หรือบอก Mood แล้วให้ Claude แนะนำ]
- กำหนด: Color Palette, Typography Scale, Spacing, Border Radius, Shadow
[Constraint] ใช้ CSS Custom Property (:root) เท่านั้น
อธิบายด้วยว่าทำไมถึงเลือก Color Palette นี้
```

---

**Prompt ฉุกเฉิน — Layout พังบน Mobile**

```
[Context] Layout บนมือถือแตกหรือดูไม่ดี
[Task] ช่วย Debug และแก้ไข Responsive
[Spec] ปัญหาที่เห็น:
- [อธิบายอาการ เช่น Grid ล้นออกนอกหน้าจอ]
- ทดสอบที่ iPhone SE (375px)
[Constraint] แก้เฉพาะ Responsive ไม่เปลี่ยน Design Desktop
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

> 💡 สัปดาห์นี้ใช้รูปจากสัปดาห์ 4 ต่อได้เลย ไม่ต้องเตรียมใหม่

---

### 🛠️ Workshop — "Portfolio Responsive + Design System"

> 🏷️ **Module ที่ใช้:** `Claude Chat` ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **ต้องมีก่อนเริ่ม:** Portfolio จากสัปดาห์ 4 พร้อม

**โจทย์ / Assignment:**

นำ Portfolio จากสัปดาห์ 4 มาทำให้ Responsive ครบทุก Breakpoint และ Upgrade Design System ให้ครบชุด

---

**Checkpoint ก่อนเริ่ม:**

```
✅ เปิด Portfolio จากสัปดาห์ 4 ใน VS Code
✅ เปิดใน Chrome กด F12 → Ctrl+Shift+M ทดสอบ Mobile ดูก่อน
✅ จดไว้ว่า Layout พังตรงไหนบ้าง
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat`**

```
=== Prompt 1: Upgrade Design System ===
[Context] ต่อจาก Portfolio ที่มีอยู่ ต้องการ Upgrade Design System
[Task] แทนที่ CSS Variable เดิมด้วย Design Token ครบชุด
[Spec]
- Color Palette: Primary 3 Shade, Neutral 5 Shade
- Typography: 2 Font Family (Display + Body) จาก Google Fonts
- Spacing Scale: ทวีคูณของ 4px ตั้งแต่ 4px ถึง 64px
- Border Radius: 4 ขนาด
- Shadow: 4 ระดับ
[Constraint] ต้องเป็น CSS Custom Property ใน :root เท่านั้น
อัพเดต style.css ไม่เปลี่ยน index.html

=== Prompt 2: Mobile Responsive ===
[Context] ต่อจาก Design System ที่ Upgrade แล้ว
[Task] เพิ่ม Media Query ให้ทุก Section ดูดีบน Mobile (< 768px)
[Spec]
- Navbar: Hamburger Menu Toggle ด้วย JavaScript
- Hero: Single Column, Font Scale ลง 20%
- Projects: 1 คอลัมน์, Card เต็มความกว้าง
- Footer: Stack แนวตั้ง
[Constraint] Mobile-first — เขียน Default Style สำหรับ Mobile ก่อน

=== Prompt 3: Tablet Breakpoint ===
[Context] ต่อจาก Mobile Responsive
[Task] เพิ่ม Media Query สำหรับ Tablet (768px–1024px)
[Spec]
- Navbar: แสดง Menu ปกติ ไม่มี Hamburger
- Projects: 2 คอลัมน์
- Hero: Layout 2 คอลัมน์ ข้อความซ้าย รูปขวา
[Constraint] ใช้ min-width Media Query เท่านั้น

=== Prompt 4: Polish + Animation ===
[Context] ต่อจากโค้ดที่มีอยู่
[Task] เพิ่ม Micro Animation และ Polish รายละเอียด
[Spec]
- Smooth Scroll เมื่อคลิก Navigation Link
- Fade-in Animation เมื่อ Section เข้ามาใน Viewport
- Page Load Animation สำหรับ Hero
- Focus Style ที่ชัดเจนสำหรับ Accessibility
[Constraint] Animation ต้องใช้ CSS เป็นหลัก JavaScript เฉพาะที่จำเป็น
```

---

**ขั้นตอนทดสอบหลังทำเสร็จ:**

```
1. เปิด Chrome DevTools (F12)
2. ทดสอบ 3 ขนาด:
   - iPhone SE (375px) — Mobile
   - iPad (768px) — Tablet
   - 1280px — Desktop
3. ทดสอบ Hamburger Menu บน Mobile
4. ทดสอบ Smooth Scroll
5. git commit -m "feat: responsive design and design system upgrade"
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| Design System มี CSS Variable ครบชุด | มีใน :root ครบ | ไม่มีหรือมีแค่สี |
| Mobile (375px) ไม่มี Horizontal Scroll | Scroll แนวตั้งเท่านั้น | มี Horizontal Scroll |
| Hamburger Menu Toggle ทำงาน | เปิด/ปิดได้ | ไม่มีหรือพัง |
| Tablet แสดง 2 คอลัมน์ | Grid 2 คอลัมน์ | ยัง 1 หรือ 3 คอลัมน์ |
| Desktop แสดง 3 คอลัมน์ | Grid 3 คอลัมน์ | Layout ผิด |
| Smooth Scroll ทำงาน | เลื่อนหน้า Smooth | กระโดดทันที |
| Commit ขึ้น GitHub | มี Commit ใหม่ | ยังไม่ได้ Commit |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| หน้าเว็บมี Horizontal Scroll บน Mobile | Element กว้างเกิน 100% | ถาม Claude: "แก้ Horizontal Overflow บน Mobile" |
| Google Font ไม่โหลด | ลืม Import ใน HTML | ถาม Claude: "เพิ่ม Google Font \[ชื่อ\] ให้ถูกต้อง" |
| Media Query ไม่ทำงาน | ลืม `<meta name="viewport">` | ถาม Claude: "Media Query ไม่ทำงานบน Mobile ทำไม?" |
| Animation กระตุก | ไม่ได้ใช้ `transform` แทน `position` | ถาม Claude: "Animation ไม่ Smooth แก้ยังไง?" |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 6 ได้เลย!

---

---
