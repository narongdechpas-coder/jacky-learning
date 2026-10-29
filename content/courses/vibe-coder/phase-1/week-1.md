---
title: "Claude คืออะไร + Mental Model (แบบจำลองความคิด)"
hours: 3
---

## 📅 สัปดาห์ที่ 1 — Claude คืออะไร + Mental Model (แบบจำลองความคิด)

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Claude คืออะไร?**

ลองนึกภาพว่าเรามีเพื่อนที่ฉลาดมากๆ คนหนึ่ง เขาอ่านหนังสือมาแล้วเกือบทุกเล่มในโลก รู้เรื่องโปรแกรมมิ่ง ภาษา วิทยาศาสตร์ ศิลปะ แทบทุกอย่าง — นั่นคือ Claude

แต่เพื่อนคนนี้จะช่วยได้ดีแค่ไหน **ขึ้นอยู่กับว่าเราบอกเขาชัดแค่ไหน**

```
บอกว่า "ช่วยทำอาหารให้หน่อย"
→ เขาจะงงว่าทำอะไร?

บอกว่า "ช่วยทำข้าวผัดหมู ใส่ไข่ดาว ไม่เผ็ด สำหรับ 2 คน"
→ เขาจะทำได้ทันที ✅
```

**Artifact (ผลลัพธ์ที่ Preview ได้) คืออะไร?**

เวลาสั่งให้ Claude สร้างเว็บหรือโค้ด มันจะแสดงผลใน "กล่อง Preview" แยกต่างหากทางขวามือ เหมือนเพื่อนวาดรูปลงกระดาษให้ดูสดๆ ไม่ใช่แค่อธิบายว่ารูปหน้าตาเป็นยังไง

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

> 🎯 **ทำก่อนเลย เพื่อให้มั่นใจว่าทุกอย่างพร้อม**

เปิด [claude.ai](https://claude.ai) แล้วพิมพ์ Prompt นี้:

```
เขียน Hello World เป็น HTML แล้วแสดงผลเป็น Artifact
```

**ถ้าเห็นกล่อง Preview ทางขวาแสดงคำว่า "Hello World" = พร้อมแล้ว! ✅**

ถ้าไม่เห็น Artifact → ดูส่วน Common Errors ด้านล่าง

---

### 🎯 Mental Model (แบบจำลองความคิด) — คิด 3 ข้อก่อน Prompt ทุกครั้ง

```
❌ คนทั่วไป:   นึกอะไรได้ → พิมพ์ทันที → ได้ผลงงงง

✅ Vibe Coder:  คิด 3 ข้อก่อน → แล้วค่อย Prompt → ได้ผลตรงใจ
```

**3 คำถามที่ต้องถามตัวเองก่อนพิมพ์เสมอ:**

```
1. DATA (ข้อมูล) มาจากไหน?
   → พิมพ์เองหรือดึงจาก API (ระบบภายนอก)?

2. LOGIC (ตรรกะ / เงื่อนไข) คืออะไร?
   → มีเงื่อนไขอะไรบ้าง? ถ้ากด A แล้วจะเกิด B?

3. OUTPUT (ผลลัพธ์) แสดงผลยังไง?
   → ผู้ใช้จะเห็นอะไร? Card? Table? Form?
```

**ตัวอย่างจริง — "หน้าแนะนำตัว":**

```
DATA   (ข้อมูล)   → ชื่อ, อาชีพ, ทักษะ (พิมพ์เอง ไม่ดึงจากที่ไหน)
LOGIC  (เงื่อนไข) → ไม่มี แค่แสดงข้อมูลอย่างเดียว
OUTPUT (ผลลัพธ์)  → Card มีรูปกลม ชื่อ และรายการทักษะ
```

---

### 📁 Folder Structure มาตรฐาน — จัดไฟล์แบบนี้ตลอดคอร์ส

> 💡 **ทำความเข้าใจก่อนสัปดาห์ 1 จะช่วยให้ไม่งงตอน Workshop**

```
my-project/              ← Root Folder (โฟลเดอร์หลักของโปรเจกต์)
│
├── index.html           ← ไฟล์ HTML หลัก (ชื่อนี้เสมอ)
├── style.css            ← CSS แยกไฟล์ (ตั้งชื่อนี้)
├── script.js            ← JavaScript แยกไฟล์ (ตั้งชื่อนี้)
│
├── images/              ← รูปทั้งหมดอยู่ใน Folder นี้
│   ├── profile-photo.jpg
│   ├── hero-bg.jpg
│   └── logo.png
│
└── .gitignore           ← ไฟล์บอก Git ว่าอย่า Track อะไร
```

**วิธีสร้าง Folder โปรเจกต์ใหม่:**

```
1. สร้าง Folder ใหม่ในที่ที่ต้องการ เช่น Desktop/my-project
2. เปิด VS Code
3. ลาก Folder ไปวางบน VS Code icon หรือ File → Open Folder
4. VS Code จะแสดง Folder Structure ทางซ้าย
```

---

### 🔄 วิธี Copy โค้ดจาก Artifact ไปใส่ไฟล์จริง

> 💡 **นี่คือขั้นตอนที่มือใหม่มักงง ทำตามนี้ทุกครั้ง**

```
ขั้นตอน:
1. Claude สร้าง Artifact (กล่อง Preview ทางขวา) ✅
2. คลิกปุ่ม "Copy" มุมบนขวาของ Artifact
3. เปิด VS Code → เปิดไฟล์ index.html (หรือสร้างใหม่)
4. Ctrl+A (เลือกทั้งหมด) แล้ว Ctrl+V (วาง)
5. Ctrl+S (Save ไฟล์)
6. เปิด File Explorer → ดับเบิลคลิก index.html
   → Chrome จะเปิดและแสดงผลได้เลย ✅
```

**วิธีดู Preview ไฟล์ HTML ในเครื่อง:**

```
วิธีที่ 1 (ง่ายสุด):
→ ดับเบิลคลิกไฟล์ .html ใน File Explorer
→ Chrome จะเปิดแสดงผลทันที

วิธีที่ 2 (แนะนำ — ใช้ VS Code Extension):
→ ติดตั้ง Extension ชื่อ "Live Server" ใน VS Code
→ คลิกขวาที่ index.html → "Open with Live Server"
→ หน้าเว็บจะ Refresh อัตโนมัติทุกครั้งที่ Save
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Claude คืออะไร เริ่มต้นยังไง (ภาษาไทย)**

[![Claude AI Tutorial](https://img.youtube.com/vi/ulaJqtfoTqA/0.jpg)](https://www.youtube.com/watch?v=ulaJqtfoTqA)

🔗 [https://www.youtube.com/watch?v=ulaJqtfoTqA](https://www.youtube.com/watch?v=ulaJqtfoTqA)

> 💡 ดูเพื่อเข้าใจภาพรวมก่อน ไม่ต้องจำทุกอย่าง

---

**วิดีโอ 2 — Claude Artifacts explained (English)**

[![Claude Artifacts](https://img.youtube.com/vi/vUdNaAAc4FY/0.jpg)](https://www.youtube.com/watch?v=vUdNaAAc4FY)

🔗 [https://www.youtube.com/watch?v=vUdNaAAc4FY](https://www.youtube.com/watch?v=vUdNaAAc4FY)

> 💡 ดูช่วง 0:00–5:00 พอเข้าใจว่า Artifact Preview แสดงผลยังไง

---

### 📖 Further Reading — แหล่งอ่านเพิ่มเติม

-   🔗 [docs.anthropic.com — Intro to Claude](https://docs.anthropic.com/en/docs/intro-to-claude)
-   🔗 [claude.ai](https://claude.ai) — เปิดใช้งานได้เลย

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` ที่ claude.ai — ยังไม่ต้องเปิด Claude Code

---

**Prompt 1 — ทดสอบ Artifact**

```
[Context] ฉันกำลังทดสอบการใช้งาน Claude ครั้งแรก
[Task] สร้าง Profile Card (การ์ดแนะนำตัว) เป็น HTML
[Spec]
- ชื่อ: [ใส่ชื่อคุณ]
- อาชีพ: [ใส่อาชีพ]
- ทักษะ 3 อย่าง: [ทักษะ 1], [ทักษะ 2], [ทักษะ 3]
- Background (พื้นหลัง): สีน้ำเงินเข้ม, Text (ตัวอักษร): สีขาว
[Constraint] HTML + CSS ล้วน ไม่มี JavaScript
แสดงผลเป็น Artifact
```

---

**Prompt 2 — ฝึก Mental Model คิด 3 ข้อก่อนสร้าง**

```
[Context] ฉันอยากสร้าง [บอกสิ่งที่อยากสร้าง]
[Task] ก่อนเริ่มเขียนโค้ด ช่วยถามฉันตาม Mental Model นี้:
1. DATA (ข้อมูล): ข้อมูลที่แสดงในเว็บมาจากไหน?
2. LOGIC (ตรรกะ): มีเงื่อนไขหรือการคำนวณอะไรบ้าง?
3. OUTPUT (ผลลัพธ์): ผู้ใช้ (User) จะเห็น Interface หน้าตาเป็นยังไง?
[Constraint] รอฉันตอบครบทั้ง 3 ข้อก่อน แล้วค่อยสร้าง
```

---

**Prompt ฉุกเฉิน — ใช้เมื่อติด ไม่เข้าใจ หรืองงตรงไหนก็ได้**

```
ฉันกำลังเรียนเรื่อง [หัวข้อที่งง]
ไม่เข้าใจตรงที่ [จุดที่สับสน]
ช่วยอธิบายใหม่แบบที่เด็ก 10 ขวบเข้าใจได้
พร้อมยกตัวอย่างง่ายๆ 1 ตัวอย่าง
```

> 📍 **จำไว้:** ทุกครั้งที่ติดหรืองง ใช้ Prompt นี้ถาม Claude ได้เลย ไม่ต้องรู้สึกผิด

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

| Filename (ชื่อไฟล์) | Dimension (ขนาด) | รายละเอียด | แหล่งรูปฟรี |
| --- | --- | --- | --- |
| `images/profile-photo.jpg` | 400 × 400 px | รูปโปรไฟล์สี่เหลี่ยม จะ Crop เป็นวงกลม | [unsplash.com](https://unsplash.com) |

> 💡 ยังไม่มีรูป? Claude จะใส่ CSS Placeholder วงกลมสีเทาให้อัตโนมัติ

---

### 🛠️ Workshop — "Profile Card" (การ์ดแนะนำตัว)

> 🏷️ **Module ที่ใช้:** `Claude Chat` ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **สิ่งที่ต้องมีก่อนเริ่ม:** บัญชี claude.ai + Chrome

**โจทย์ / Assignment:**

สร้าง Profile Card ส่วนตัว 1 หน้า มีครบ:

-   Profile Image กลม (รูปจริงหรือ Placeholder)
-   ชื่อ-นามสกุล
-   อาชีพหรือสิ่งที่กำลังเรียน
-   Skills (ทักษะ) หรือสิ่งที่สนใจ 3 อย่าง
-   Color Scheme (โทนสี) ที่เลือกเอง ห้ามซ้ำตัวอย่างในบทเรียน

---

**Prompt สำเร็จรูป** — Copy ไปใช้ใน `Claude Chat` แก้เฉพาะ \[ \]

```
[Context] ฉันกำลังสร้าง Profile Card (การ์ดแนะนำตัว) ส่วนตัว

[Task] สร้าง HTML 1 ไฟล์ แสดง Card อยู่กลางหน้าจอ

[Spec]
ข้อมูล (Data):
- ชื่อ: [ชื่อคุณ]
- อาชีพ / กำลังเรียน: [อาชีพหรือสิ่งที่เรียน]
- Interests (สิ่งที่สนใจ): [สิ่ง 1], [สิ่ง 2], [สิ่ง 3]

Profile Image:
- ใช้ไฟล์ images/profile-photo.jpg แสดงเป็น Circle (วงกลม) 120×120px
- ถ้าไม่พบไฟล์ให้แสดง CSS Placeholder วงกลมสีเทา ขนาดเดียวกัน

Style:
- Primary Color (สีหลัก): [บอกสีที่ชอบ เช่น เขียวมิ้นต์, ม่วง, ส้ม]
- มี Box Shadow (เงา) และ Border Radius (ขอบโค้งมน)
- Card Center Aligned (อยู่กลางหน้าจอ)
- มี Emoji ประกอบ

[Constraint] HTML + CSS ล้วน ไม่มี JavaScript หรือ Framework
แสดงผลเป็น Artifact
```

---

**ขั้นตอนหลังได้ Artifact:**

```
1. คลิก Copy ที่ Artifact
2. เปิด VS Code → สร้างไฟล์ใหม่ชื่อ index.html
3. Ctrl+V วางโค้ด → Ctrl+S Save
4. ดับเบิลคลิก index.html → ดูใน Chrome
```

---

**Acceptance Criteria (เกณฑ์ตรวจงาน) ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| มี Profile Image กลม (จริงหรือ Placeholder) | แสดงรูปได้ | ไม่มีรูปเลย |
| Content ครบ 3 ส่วน (ชื่อ / อาชีพ / Skills) | แสดงครบ | ขาดส่วนใดส่วนหนึ่ง |
| ใช้ Color Scheme ที่เลือกเอง ไม่ซ้ำตัวอย่าง | สีต่างออกไป | ใช้สีน้ำเงินเหมือน Demo |
| Artifact Preview แสดงผลได้ ไม่ Error | Preview โชว์ได้ | หน้าขาวหรือ Error |
| Copy โค้ดลงไฟล์จริงแล้วเปิดใน Chrome ได้ | Chrome แสดงผล | ไม่รู้จะทำยังไง |
| อธิบาย Mental Model ได้ (DATA / LOGIC / OUTPUT) | อธิบายได้ | อธิบายไม่ได้ |

---

### 🚨 Common Errors สัปดาห์ที่ 1 — ถ้าเจอแบบนี้ทำอย่างไร

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| ไม่เห็น Artifact เลย | Claude ไม่สร้าง Preview | เพิ่มคำว่า "แสดงผลเป็น Artifact" ท้าย Prompt |
| Artifact ขึ้น "Unable to display" | โค้ดมี Error | ถาม Claude: "โค้ดนี้มี Error อะไร ช่วย Fix ให้หน่อย" |
| เปิด index.html แล้วหน้าขาว | Path รูปผิด หรือโค้ดไม่สมบูรณ์ | ถาม Claude: "เปิดใน Chrome แล้วหน้าขาว ช่วย Debug ให้" |
| รูปโปรไฟล์ไม่แสดง | ไฟล์ไม่ได้อยู่ใน images/ | ย้ายไฟล์รูปเข้าโฟลเดอร์ images/ |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 2 ได้เลย!

---

---
