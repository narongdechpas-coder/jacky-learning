---
title: "Gemini Prompt ขั้นสูง + Iteration"
hours: 3
---

## 📅 สัปดาห์ที่ 8 — Gemini Prompt ขั้นสูง + Iteration

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Google Slides → คลิก ✨ Gemini แล้วพิมพ์:

```
"สร้างสไลด์สรุปยอดขาย Q3 ที่มีตัวเลขหลัก 3 ตัว
และ 2 bullet points สำหรับ Next Steps"
```

**ถ้า Gemini สร้างสไลด์ให้ได้เลย = พร้อมแล้ว ✅**

---

### 🧠 หลักการ Prompt ขั้นสูงสำหรับสไลด์

**Iteration Method — ไม่ต้อง Perfect รอบแรก:**

```
รอบที่ 1: Prompt คร่าวๆ ดู Structure
"สร้างสไลด์สรุปผลการดำเนินงาน Q3"

รอบที่ 2: Refine เนื้อหา
"ปรับสไลด์นี้ให้เน้นการเติบโต 15%
และลดข้อความให้เหลือแค่ 3 bullet"

รอบที่ 3: Refine โทน
"เปลี่ยนโทนให้ดูมั่นใจและ Positive มากขึ้น"

รอบที่ 4: ปรับ Format
"จัดให้ตัวเลข 15% ใหญ่โดดเด่นกว่าข้อความอื่น"
```

**Prompt Patterns ที่ได้ผลดีใน Google Slides:**

```
Pattern 1: Role + Task
"ในฐานะ Business Analyst ช่วยเขียนสไลด์ที่..."

Pattern 2: Audience Aware
"เขียนสำหรับผู้บริหารที่มีเวลา 2 นาทีต่อสไลด์..."

Pattern 3: Format Specific
"เขียนเป็น 3 bullet points ไม่เกิน 10 คำต่อข้อ..."

Pattern 4: Tone Setting
"ใช้โทน Professional แต่ไม่เป็นทางการเกินไป..."

Pattern 5: Constraint Driven
"ตัดข้อมูลที่ไม่จำเป็นออก เหลือแค่ที่ผู้บริหารต้องตัดสินใจ..."
```

---

### 📝 Prompt Library — ชุด Prompt สำเร็จรูปสำหรับทุกสถานการณ์

**สำหรับ Monthly Report:**

```
สร้างสไลด์ Monthly Report สำหรับเดือน [เดือน]
ข้อมูลที่มี: [วางตัวเลขหลัก]
Audience: ทีมผู้บริหาร
Format:
- Headline: ประโยคสรุป 1 บรรทัดที่บอก So What?
- Highlights: 3 ตัวเลขสำคัญพร้อม Context
- Action Items: 3 สิ่งที่ต้องทำเดือนหน้า
โทน: กระชับ มั่นใจ มีข้อเท็จจริง
```

**สำหรับ Project Update:**

```
สร้างสไลด์ Project Status Update
Project: [ชื่อ]
สถานะ: [On Track / At Risk / Delayed]
Milestone ที่เสร็จแล้ว: [รายการ]
Milestone ถัดไป: [รายการ]
ปัญหาและการแก้ไข: [รายการ]
Format: ใช้สีเขียว/เหลือง/แดงแสดงสถานะ
```

**สำหรับ Executive Summary:**

```
สร้าง Executive Summary สำหรับผู้บริหาร
เนื้อหาทั้งหมด: [สรุปเนื้อหาที่มี]
ต้องการ:
- ประเด็นหลัก 3 ข้อที่ผู้บริหารต้องรู้
- ตัวเลขสำคัญที่สุด 2 ตัว
- การตัดสินใจที่ต้องการ 1 ข้อ
ยาวไม่เกิน 5 bullet points รวม
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Advanced Gemini Prompting for Google Workspace (ภาษาไทย)**

[![Gemini Advanced TH](https://img.youtube.com/vi/PIWnZkNGYDI/0.jpg)](https://www.youtube.com/watch?v=PIWnZkNGYDI)

🔗 [https://www.youtube.com/watch?v=PIWnZkNGYDI](https://www.youtube.com/watch?v=PIWnZkNGYDI)

---

**วิดีโอ 2 — Prompt Engineering for Presentations (English)**

[![Prompt Slides EN](https://img.youtube.com/vi/ZpXN9M0WLQ4/0.jpg)](https://www.youtube.com/watch?v=ZpXN9M0WLQ4)

🔗 [https://www.youtube.com/watch?v=ZpXN9M0WLQ4](https://www.youtube.com/watch?v=ZpXN9M0WLQ4)

---

### 🛠️ Workshop — "สร้าง Monthly Report ด้วย Gemini"

> 🏷️ **Tool ที่ใช้:** Claude Chat วางแผน → Gemini Slides สร้าง ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง

**โจทย์:** สร้าง Monthly Report Deck 8–10 สไลด์ ใช้ Template จากสัปดาห์ 7 และสร้างด้วย Gemini โดยใช้ Iteration Method อย่างน้อย 3 รอบต่อสไลด์สำคัญ

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| ใช้ Template จากสัปดาห์ 7 | Style สม่ำเสมอทุกหน้า | ไม่ได้ใช้ Template |
| ใช้ Iteration อย่างน้อย 3 รอบ | แต่ละรอบปรับปรุงขึ้นชัดเจน | สร้างรอบเดียวจบ |
| Executive Summary ชัดเจน | ดูสไลด์เดียวรู้เรื่องทันที | ต้องอ่านทั้ง Deck |
| Speaker Notes ครบทุกหน้า | Notes อธิบายเพิ่มเติมได้ | หน้าส่วนใหญ่ไม่มี Notes |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 9 ได้เลย!

---

---
