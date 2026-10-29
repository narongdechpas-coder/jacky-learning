---
title: "Slide Master + Template ส่วนตัว"
hours: 3
---

## 📅 สัปดาห์ที่ 7 — Slide Master + Template ส่วนตัว

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Google Slides → **View → Theme builder**

**ถ้าเห็น Slide Master Editor เปิดขึ้น = พร้อมแล้ว ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Slide Master คืออะไร?**

ลองนึกถึงการพิมพ์เอกสารบนกระดาษหัวจดหมายบริษัท กระดาษมีโลโก้และสีบริษัทพิมพ์ไว้แล้ว เราแค่พิมพ์เนื้อหาลงไป ไม่ต้องวาดโลโก้ใหม่ทุกหน้า

Slide Master คือ "กระดาษหัวจดหมาย" ของ Presentation — กำหนด Font สี Logo Layout ครั้งเดียว แล้วทุกสไลด์ใหม่จะใช้ Style เดิมอัตโนมัติ

```
ไม่ใช้ Slide Master:
→ แก้ Font ทีละสไลด์ (50 สไลด์ = 50 ครั้ง) 😩

ใช้ Slide Master:
→ แก้ครั้งเดียว ทุกสไลด์อัพเดตอัตโนมัติ ✅
```

---

### 🔧 วิธีตั้งค่า Slide Master ใน Google Slides

```
ขั้นตอน:
1. View → Theme builder (หรือ Slide Master)
2. คลิกสไลด์หลักที่สุด (อยู่บนสุดของ Panel ซ้าย)
3. ตั้งค่า:
   → Background Color
   → Font Heading (Format → Paragraph styles → Heading)
   → Font Body (Format → Paragraph styles → Normal text)
   → Logo: Insert → Image → วางมุมที่ต้องการ
   → Color Palette: Slide → Change theme colors
4. กด Close (X) เพื่อออกจาก Theme builder
5. ทุกสไลด์ใหม่จะใช้ Style ที่ตั้งไว้แล้ว ✅
```

---

### 📐 Layout ที่ควรมีในทุก Template

```
Layout ที่ใช้บ่อยที่สุด (ควรสร้างไว้):
1. Title Slide      → หน้าแรก ชื่อเรื่อง + ผู้นำเสนอ
2. Section Header   → คั่นหัวข้อใหม่
3. Content + Text   → หน้าข้อมูลทั่วไป
4. Two Column       → เปรียบเทียบ 2 ด้าน
5. Big Number       → เน้นตัวเลขสำคัญ
6. Chart Full Page  → Chart ใหญ่เต็มหน้า
7. Closing Slide    → สรุป + Next Steps
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Google Slides Slide Master ภาษาไทย**

[![Slide Master TH](https://img.youtube.com/vi/JjIs8YZiGyg/0.jpg)](https://www.youtube.com/watch?v=JjIs8YZiGyg)

🔗 [https://www.youtube.com/watch?v=JjIs8YZiGyg](https://www.youtube.com/watch?v=JjIs8YZiGyg)

---

**วิดีโอ 2 — Create Custom Google Slides Template (English)**

[![Template EN](https://img.youtube.com/vi/zLsDqVHUzyw/0.jpg)](https://www.youtube.com/watch?v=zLsDqVHUzyw)

🔗 [https://www.youtube.com/watch?v=zLsDqVHUzyw](https://www.youtube.com/watch?v=zLsDqVHUzyw)

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **ใช้ใน:** `Claude Chat` วางแผน + `Google Slides` ลงมือทำ

---

**Prompt 1 — ออกแบบ Template Structure**

```
[Context] ฉันต้องการสร้าง Presentation Template สำหรับ
ใช้ใน [บริษัท/ทีม/บริบท]
นำเสนอบ่อยที่สุดคือ: [ประเภทการนำเสนอ เช่น Monthly Report, Project Update]

[Task] แนะนำ Slide Layouts ที่ควรมีใน Template
[Spec]
บอกสำหรับแต่ละ Layout:
- ชื่อ Layout
- เนื้อหาที่ใช้กับ Layout นี้
- องค์ประกอบที่ต้องมี (Title, Subtitle, Chart Area ฯลฯ)
[Constraint] แนะนำ 6–8 Layouts เท่านั้น ไม่เยอะเกิน
```

---

### 🛠️ Workshop — "สร้าง Template ส่วนตัว"

> 🏷️ **Tool ที่ใช้:** Google Slides Slide Master ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง

**โจทย์:** สร้าง Google Slides Template ส่วนตัว 1 ชุด ที่มีครบ 6 Layouts พร้อม Color Palette และ Font ที่ตั้งไว้แล้ว เซฟเป็นไฟล์ Template แยกต่างหาก

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| Slide Master ตั้งค่า Font + Color แล้ว | สไลด์ใหม่ใช้ Style เดิมอัตโนมัติ | ยังต้องตั้งค่าทุกครั้ง |
| มีครบ 6 Layouts | ทุก Layout ใช้งานได้ | บาง Layout ว่างเปล่า |
| บันทึกเป็น Template (Make a copy ได้) | มีไฟล์ Template แยก | ยังเป็นไฟล์ปกติ |

---

### 🚨 Common Errors

| ปัญหาที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| Font ไม่อัพเดตหลังแก้ Slide Master | แก้ Layout แทน Master | ต้องแก้ที่ Slide Master หลัก (อันบนสุด) |
| Layout ใหม่ไม่แสดงใน Add Slide | ยังอยู่ใน Theme Builder | ออกจาก Theme Builder แล้วลอง New Slide ใหม่ |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 8 ได้เลย!

---

---
