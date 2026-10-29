---
title: "Context Setting + System Prompt — สั่ง Claude แบบ Pro"
hours: 3
---

## 📅 สัปดาห์ที่ 19 — Context Setting + System Prompt — สั่ง Claude แบบ Pro

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Claude Chat ใหม่แล้วพิมพ์:

```
ฉันกำลังสร้าง E-commerce App ด้วย React + Supabase
Stack: React, Vite, Tailwind CSS, Supabase
Color Palette: Primary #6366F1, Secondary #10B981
ตอบทุกอย่างโดยคำนึงถึง Context นี้เสมอ
ยืนยันด้วยการบอกว่าเข้าใจ Context แล้วสรุปสั้นๆ
```

**ถ้า Claude ตอบโดยสรุป Context กลับมาถูกต้อง = พร้อมแล้ว ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Context Setting คืออะไร?**

ลองนึกถึงการจ้างผู้รับเหมาสร้างบ้าน ถ้าเราบอกแค่ว่า "สร้างบ้านให้หน่อย" เขาจะถามกลับมา 100 คำถาม แต่ถ้าเราให้ Blueprint, งบประมาณ, สไตล์ที่ต้องการ, และกฎข้อบังคับก่อน — เขาจะทำงานได้เลยโดยไม่ต้องถามซ้ำ

Context Setting คือการให้ "Briefing ครบ" ให้ Claude ก่อนเริ่ม Session ใหม่ทุกครั้ง

```
ไม่มี Context:
"สร้าง Button สีน้ำเงิน"
→ Claude ไม่รู้ว่าใช้ Framework อะไร
→ ไม่รู้ขนาดหรือ Style ที่ต้องการ
→ ได้ผลลัพธ์ที่ต้องแก้อีก 5 รอบ

มี Context:
[บริบทเต็ม + Stack + Design System]
"สร้าง Button สีน้ำเงิน"
→ Claude รู้ทุกอย่างแล้ว
→ ได้ Button ที่ใช้ได้เลยรอบแรก ✅
```

---

### 📋 Context Setting Template — ครบทุกส่วน

**Template ที่ใช้เริ่ม Session ใหม่ทุกครั้ง:**

```
═══════════════════════════════════════
PROJECT CONTEXT — [ชื่อโปรเจกต์]
═══════════════════════════════════════

🎯 PROJECT OVERVIEW:
App: [ชื่อ App]
Purpose: [ทำอะไร สำหรับใคร]
Stage: [Planning / Development / Testing / Production]

🛠️ TECH STACK:
Frontend: React 18 + Vite + TypeScript
Styling: Tailwind CSS
Backend: [Firebase / Supabase / None]
Hosting: Vercel
State: [useState / Zustand / Context API]

🎨 DESIGN SYSTEM:
Primary Color: [hex]
Secondary Color: [hex]
Font: [ชื่อ Font]
Border Radius: [px]
Spacing: [ทวีคูณของกี่ px]

📁 FOLDER STRUCTURE:
src/
  components/  ← Reusable Components
  pages/       ← Page Components
  hooks/       ← Custom Hooks
  utils/       ← Helper Functions
  types/       ← TypeScript Types
  lib/         ← Third-party Config (firebase.js, supabase.js)

📏 CODING CONVENTIONS:
- Component: PascalCase (UserCard.tsx)
- Hook: camelCase นำด้วย use (useAuth.ts)
- Function: camelCase (fetchUserData)
- Constant: UPPER_SNAKE (MAX_RETRY)
- TypeScript Interface นำด้วย I (IUser) หรือไม่ก็ได้
- CSS: Tailwind Classes เท่านั้น ไม่ใช้ Inline Style

🚫 CONSTRAINTS:
- ไม่ใช้ Class Component — Functional เท่านั้น
- ไม่ใช้ any ใน TypeScript
- ทุก Async Function ต้องมี try/catch
- ทุก Component ต้องมี Loading + Error State

═══════════════════════════════════════
ยืนยันด้วยการสรุป Context กลับมาสั้นๆ
แล้วรอคำสั่งถัดไป
═══════════════════════════════════════
```

---

### 🎭 System Prompt Patterns — เทคนิคขั้นสูง

**Pattern 1: Role Assignment (กำหนดบทบาท)**

```
ตลอด Session นี้ คุณคือ Senior Frontend Engineer
ที่เชี่ยวชาญ React + TypeScript มา 5 ปี
เมื่อเขียนโค้ดให้:
- ใช้ Best Practices เสมอ
- อธิบาย Trade-off ของแต่ละ Approach
- แนะนำ Alternative ถ้ามีวิธีที่ดีกว่า
- แจ้งเตือนถ้าโค้ดมี Performance Issue
```

**Pattern 2: Output Format (กำหนดรูปแบบ Output)**

```
เมื่อสร้างโค้ด ให้แสดงในรูปแบบนี้เสมอ:

📁 FILES TO CREATE/MODIFY:
[รายการไฟล์]

💻 CODE:
[โค้ด]

📝 HOW TO USE:
[วิธีนำไปใช้]

⚠️ IMPORTANT NOTES:
[สิ่งที่ต้องระวัง]
```

**Pattern 3: Incremental Building (สร้างต่อยอด)**

```
เราจะสร้าง [App] ทีละขั้น
แต่ละขั้นจะมีเลขกำกับ เช่น Step 1, Step 2

กฎสำคัญ:
- อย่า Skip Step
- แต่ละ Step ต้อง Build ได้และรันได้ก่อนไปต่อ
- ถ้าต้องแก้ Step ก่อนหน้า บอกด้วยว่า Step ไหน
- ห้าม Refactor โค้ดที่ยังไม่ได้ขอ
```

**Pattern 4: Review Mode (ตรวจโค้ด)**

```
ตลอด Session นี้ ก่อนตอบทุกครั้ง
ให้ตรวจสอบ Output ก่อนส่งโดยถามตัวเองว่า:
1. โค้ดนี้ Build ผ่านไหม?
2. มี TypeScript Error ที่มองเห็นได้ไหม?
3. มี Security Issue ที่ชัดเจนไหม?
4. ตรงกับ Project Context ที่กำหนดไหม?
ถ้าพบปัญหา ให้แก้ก่อนส่ง
```

---

### 🔄 Session Management — จัดการ Conversation อย่างมีประสิทธิภาพ

```
สิ่งที่ควรทำ:
✅ เริ่ม Session ใหม่ทุกครั้งที่เปลี่ยน Feature หลัก
✅ Copy Context Template มาวางต้น Session เสมอ
✅ Summary โค้ดที่สร้างไปแล้วไว้ใน Context ถ้า Session ยาว
✅ บอก Claude เมื่อ Requirement เปลี่ยน

สิ่งที่ควรหลีกเลี่ยง:
❌ Session ยาวเกิน 50 รอบ (Claude เริ่มลืม Context)
❌ เปลี่ยนเรื่องกลางคัน Session
❌ ไม่บอก Stack เมื่อเริ่ม Session
❌ Prompt สั้นเกินไปจนไม่มี Context
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Advanced Prompt Engineering (ภาษาไทย)**

[![Advanced Prompt TH](https://img.youtube.com/vi/ImjFiMuQd8Q/0.jpg)](https://www.youtube.com/watch?v=ImjFiMuQd8Q)

🔗 [https://www.youtube.com/watch?v=ImjFiMuQd8Q](https://www.youtube.com/watch?v=ImjFiMuQd8Q)

---

**วิดีโอ 2 — Master Prompt Engineering (English)**

[![Master Prompt](https://img.youtube.com/vi/jC4v5AS4RIM/0.jpg)](https://www.youtube.com/watch?v=jC4v5AS4RIM)

🔗 [https://www.youtube.com/watch?v=jC4v5AS4RIM](https://www.youtube.com/watch?v=jC4v5AS4RIM)

> 💡 ดูช่วง 0:00–15:00 เน้นเรื่อง System Prompt และ Role Assignment

---

### 📖 Further Reading

-   🔗 [docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
-   🔗 [learnprompting.org](https://learnprompting.org) — Prompt Engineering Guide ฟรีครบ

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` ทั้งหมด

---

**Prompt 1 — Context Template สำหรับโปรเจกต์ Final**

```
[Task] ช่วยสร้าง Context Template สำหรับโปรเจกต์ของฉัน
[Spec]
App ที่จะสร้าง: [อธิบาย App สั้นๆ]
Stack ที่เลือก: [React + Firebase / Supabase + Vercel]
Design Preference: [Minimal / Bold / Playful / Corporate]
Coding Style: [TypeScript / JavaScript]
[Constraint]
สร้าง Template ที่:
- Copy วางได้เลยต้น Session
- ครอบคลุม Stack, Design System, Conventions
- มีส่วน "Current Task" ที่แก้ได้ทุก Session
- ยาวไม่เกิน 50 บรรทัด (กระชับแต่ครบ)
```

---

**Prompt 2 — Review Session ที่ยาวเกินไป**

```
[Context] Session นี้ยาวมากแล้ว
[Task] ช่วยสรุป Context และโค้ดที่สร้างไปทั้งหมด
[Spec]
สรุปในรูปแบบ:
1. สิ่งที่สร้างไปแล้ว (Files + Function)
2. State ปัจจุบันของ App
3. สิ่งที่ยังต้องทำ
4. Context ที่ต้องพาไป Session ใหม่
[Constraint] สรุปแบบกระชับ ไม่เกิน 30 บรรทัด
```

---

### 🛠️ Workshop — "สร้าง Context Template สำหรับ Final Project"

> 🏷️ **Module ที่ใช้:** `Claude Chat` ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง

**โจทย์ / Assignment:**

เตรียมความพร้อมสำหรับ Final Project โดยสร้าง Context Template ที่สมบูรณ์ และทดสอบ Session แบบ Pro

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat`**

```
=== Step 1: เลือกและออกแบบ Final Project ===
[Context] ฉันกำลังจะเริ่ม Final Project ของ Vibe Coder Course
[Task] ช่วยออกแบบ Project ที่เหมาะกับระดับความสามารถฉัน
[Spec]
สิ่งที่ฉันอยากสร้าง: [บอกไอเดียที่มี]
เวลาที่มี: 6 ชั่วโมง (2 สัปดาห์ สัปดาห์ละ 3 ชม.)
Skills ที่มี: React, Supabase/Firebase, API, Responsive Design

[Constraint]
ช่วยกำหนด:
1. MVP Scope (Feature จำเป็นที่ต้องมีใน 6 ชม.)
2. Nice-to-have (ถ้าเวลาเหลือ)
3. Out of scope (ไม่ทำ)
4. Tech Stack ที่แนะนำและเหตุผล
5. ประมาณเวลาแต่ละ Feature

=== Step 2: สร้าง Context Template ===
[Context] ต่อจาก Project ที่ออกแบบไว้
[Task] สร้าง Context Template ที่ครบสมบูรณ์
[Spec]
ใช้รูปแบบ:
- PROJECT OVERVIEW
- TECH STACK
- DESIGN SYSTEM (ช่วยเลือก Color Palette ที่เหมาะกับ App ด้วย)
- FOLDER STRUCTURE
- CODING CONVENTIONS
- CONSTRAINTS
[Constraint] Template ต้องใช้ได้จริง Copy วางแล้วใช้ได้เลย

=== Step 3: ทดสอบ Context ===
[Context] ใช้ Template ที่สร้าง วาง Context เต็มๆ
[Task] ทดสอบโดยสั่ง Claude สร้าง Feature แรก
[Spec] สร้าง [Feature เล็กๆ ของ Final Project]
สังเกตว่า Claude เข้าใจ Context และผลลัพธ์ตรงใจไหม
[Constraint] ถ้าไม่ตรงใจ ให้แก้ Context Template ทันที
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| มี Context Template ที่ Copy ใช้ได้ทันที | Template พร้อมใช้ | ยังไม่มี Template |
| Final Project ชัดเจน มี MVP Scope | รู้ว่าจะทำอะไรบ้าง | ยังไม่แน่ใจ |
| ทดสอบ Context แล้ว Claude ตอบถูก Stack | ผลลัพธ์ตรง Stack | Claude ใช้ Stack ผิด |
| มี Task List สำหรับ Final Project | รู้ลำดับขั้นตอน | ยังไม่มีแผน |

---

### 🚨 Common Errors

| ปัญหาที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| Claude ลืม Stack กลาง Session | Session ยาวเกินไป | เริ่ม Session ใหม่ + วาง Context ใหม่ |
| Claude เปลี่ยน Style กลาง Session | Context ไม่ชัดพอ | เพิ่มตัวอย่าง Code ใน Context |
| Claude แนะนำ Library ที่ไม่ได้ใช้ | ไม่ได้ระบุ Constraints | เพิ่ม "ห้ามใช้ \[X\]" ใน CONSTRAINTS |
| Output ยาวเกินไป | ไม่ได้กำหนด Output Format | เพิ่ม Pattern 2 ใน Context |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 20 ได้เลย!

---

---
