---
title: "Gemini ช่วยออกแบบ Visual — สร้าง Visual ด้วย AI เร็วขึ้น"
hours: 3
---

## 📅 สัปดาห์ที่ 6 — Gemini ช่วยออกแบบ Visual — สร้าง Visual ด้วย AI เร็วขึ้น

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Google Slides → คลิกที่ Text Box ใดก็ได้ → กด **Insert → Image → Search the web**

พิมพ์ "business presentation" แล้วดูว่ามีรูปให้เลือก

**ถ้าเห็นรูปปรากฏ = Google Image Search ทำงาน ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Visual ใน Slides คืออะไรและมีกี่ประเภท?**

Visual ทุกอย่างที่ไม่ใช่ข้อความล้วนๆ ช่วยให้สมองเข้าใจได้เร็วขึ้น 60,000 เท่า (จริงๆ) มีหลายประเภท:

```
1. Chart / Graph     → แสดงข้อมูลเชิงปริมาณ
2. Icon / Pictogram  → แทนแนวคิดด้วยสัญลักษณ์
3. Photo / Image     → เพิ่มอารมณ์และบริบท
4. Diagram           → แสดงกระบวนการหรือความสัมพันธ์
5. Big Number        → เน้นตัวเลขสำคัญ 1 ตัว
6. Timeline          → แสดงลำดับเวลา
7. Comparison Table  → เปรียบเทียบหลายตัวเลือก
```

---

### 🤖 Gemini ช่วย Visual ได้ยังไง

**สิ่งที่ Gemini ช่วยได้:**

```
✅ แนะนำประเภท Visual ที่เหมาะกับข้อมูล
✅ สร้าง Icon/Shape Layout ใน Slides
✅ แนะนำ Stock Photo ที่เหมาะสม
✅ สร้าง Diagram อธิบายกระบวนการ
✅ สร้าง Comparison Layout
✅ แนะนำ Free Image Sources

ต้องทำเองบางส่วน:
→ เลือก Photo ที่ถูก Tone กับ Brand
→ ปรับ Chart Color ให้ตรง Palette
→ ตรวจสอบว่า Visual ตรงกับ Key Message
```

---

### 🖼️ แหล่ง Visual ฟรีที่ใช้ใน Slides ได้

```
รูปภาพ (ฟรี Commercial Use):
→ unsplash.com      — รูปคุณภาพสูง
→ pexels.com        — รูปและวิดีโอฟรี
→ pixabay.com       — รูปหลากหลายประเภท

Icon (ฟรี):
→ flaticon.com      — Icon หลายล้านแบบ
→ icons8.com        — Icon + Illustration
→ thenounproject.com — Icon เรียบง่าย

Illustration:
→ undraw.co         — Illustration สวยงาม เปลี่ยนสีได้
→ storyset.com      — Illustration หลายสไตล์

Diagram Tool:
→ diagrams.net (draw.io) — ฟรี สร้าง Flowchart/Diagram
→ canva.com         — Template สำเร็จรูป
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — ใช้ AI สร้าง Visual สำหรับ Presentation (ภาษาไทย)**

[![Visual AI TH](https://img.youtube.com/vi/5nlgertmKwU/0.jpg)](https://www.youtube.com/watch?v=5nlgertmKwU)

🔗 [https://www.youtube.com/watch?v=5nlgertmKwU](https://www.youtube.com/watch?v=5nlgertmKwU)

---

**วิดีโอ 2 — How to Use AI for Better Presentations (English)**

[![Visual AI EN](https://img.youtube.com/vi/JjIs8YZiGyg/0.jpg)](https://www.youtube.com/watch?v=JjIs8YZiGyg)

🔗 [https://www.youtube.com/watch?v=JjIs8YZiGyg](https://www.youtube.com/watch?v=JjIs8YZiGyg)

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **วางแผน Visual: ใช้ใน `Claude Chat`** 🏷️ **สร้างใน Slides: ใช้ `Gemini ใน Google Slides`**

---

**Prompt 1 — ให้ AI แนะนำ Visual สำหรับแต่ละสไลด์**

```
[Context] ฉันมีสไลด์นำเสนอเรื่อง [หัวข้อ]
[Task] แนะนำ Visual ที่เหมาะสมสำหรับแต่ละสไลด์
[Spec]
สไลด์ที่มี:
- สไลด์ 1: [เนื้อหา]
- สไลด์ 2: [เนื้อหา]
- สไลด์ 3: [เนื้อหา]

สำหรับแต่ละสไลด์บอก:
1. ประเภท Visual ที่แนะนำ (Chart/Icon/Photo/Diagram)
2. เหตุผล
3. Keyword ภาษาอังกฤษสำหรับค้นหา Stock Photo
[Constraint] Visual ต้องสนับสนุน Key Message ไม่ใช่แค่ตกแต่ง
```

---

**Prompt 2 — สร้าง Process Diagram ใน Slides**

```
[ใช้ใน Gemini ใน Google Slides]

สร้าง Process Diagram แสดงขั้นตอน:
[Step 1] → [Step 2] → [Step 3] → [Step 4]

ใช้:
- รูปสี่เหลี่ยมสำหรับแต่ละขั้นตอน
- ลูกศรเชื่อมระหว่างขั้นตอน
- สีหลัก: [Hex Code]
- Font: ขนาด 20pt ภาษาไทย
```

---

**Prompt ฉุกเฉิน — สไลด์ดูว่างเกินไป**

```
สไลด์นี้มีแค่ข้อความ ดูว่างและน่าเบื่อ
เนื้อหา: [อธิบายเนื้อหา]
[Task] แนะนำวิธีเพิ่ม Visual โดยไม่ทำให้รก
[Constraint]
- ต้องทำได้ใน Google Slides โดยไม่ซื้อ Plugin
- Visual ต้องสนับสนุนเนื้อหา ไม่ใช่แค่เติมพื้นที่ว่าง
```

---

### 🛠️ Workshop — "Visual Storytelling Deck ครบชุด"

> 🏷️ **Tool ที่ใช้:** Claude Chat + Gemini Slides + Unsplash + Flaticon ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง

**โจทย์:** นำสไลด์ทั้งหมดจากสัปดาห์ 4–5 มารวมกัน เพิ่ม Visual ที่เหมาะสมทุกหน้า และปรับให้ดู Professional ระดับที่นำเสนอในทีมได้จริงๆ

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| ทุกสไลด์มี Visual ไม่ใช่แค่ข้อความ | มีอย่างน้อย 1 Visual/หน้า | บางหน้าแค่ Bullet Points |
| Visual สนับสนุน Key Message | อธิบายความสัมพันธ์ได้ | Visual แค่ตกแต่ง |
| Chart ถูกประเภทและ Axis ชัดเจน | อ่านเข้าใจได้ทันที | ต้องอ่านนาน |
| Style สอดคล้องทุกหน้า | Font/Color เดิมตลอด | แต่ละหน้า Style ต่างกัน |
| ดูพร้อมนำเสนอจริง | คนอื่นดูแล้วเข้าใจ | ยังต้องอธิบายเพิ่ม |

---

### 🚨 Common Errors

| ปัญหาที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| รูปภาพดูไม่เข้ากับสไลด์ | เลือก Stock Photo จากธีมที่ต่างออกไป | ใช้ Keyword ที่ตรงกับอุตสาหกรรมมากขึ้น |
| Icon สีไม่ตรงกับ Palette | ดาวน์โหลดมาแล้วสีต่าง | Flaticon/Icons8 มีตัวเลือกเปลี่ยนสีก่อนโหลด |
| Diagram ดูรกเกินไป | ใส่ขั้นตอนมากเกิน 5 | ตัดให้เหลือแค่ขั้นตอนหลัก Detail ไปไว้ใน Notes |

---

> 🎯 ผ่านทุกข้อ → **Phase 2 เสร็จสมบูรณ์!** พร้อมเข้า Phase 3

---

## 🏁 Phase 2 Summary — สิ่งที่ได้เรียนรู้ทั้งหมด

```
✅ ใช้หลัก CARP ออกแบบสไลด์ที่ดูมืออาชีพได้
✅ เลือก Font และ Color Palette ที่เหมาะกับบริบทธุรกิจ
✅ เลือก Chart ได้ถูกประเภทตาม Key Message
✅ ปรับ Chart ให้สื่อสารได้ดีขึ้นด้วยสีเน้นและ Data Label
✅ ใช้ Gemini สร้าง Visual และ Diagram ใน Slides ได้
✅ รู้แหล่ง Visual ฟรีที่ใช้ในงานได้ถูกต้อง
✅ สร้างสไลด์ที่พร้อมนำเสนอจริงในทีม/บริษัทได้
```

**Deliverables (ชิ้นงาน) จาก Phase 2:**

-   🎨 **สไลด์ Redesign** — ปรับ Design ด้วยหลัก CARP + Color Palette (สัปดาห์ 4)
-   📊 **Data Dashboard** — 1 หน้า มี 2–3 Charts ที่ถูกประเภท (สัปดาห์ 5)
-   🖼️ **Visual Storytelling Deck** — สไลด์ครบชุดพร้อม Visual ทุกหน้า (สัปดาห์ 6)

---

> ⏭️ **Phase 3 ถัดไป:** Gemini AI ขั้นสูง + สร้างสไลด์อย่างมีระบบ — ใช้ AI สร้าง Template, จัดการ Deck หลายชุด และสร้างระบบที่ใช้ซ้ำได้
