---
title: "Final Project — สร้างจริง 6 ชั่วโมง"
hours: 6
weekLabel: "21–22"
---

## 📅 สัปดาห์ที่ 21–22 — Final Project — สร้างจริง 6 ชั่วโมง

### ⏱️ เวลาโดยประมาณ

3 ชม. (สัปดาห์ 21) + 3 ชม. (สัปดาห์ 22) = รวม 6 ชม.

> 💡 **สัปดาห์นี้คือบทพิสูจน์ตัวเองครั้งสุดท้าย** — นำทุกทักษะจาก Phase 1–5 มาใช้จริง ไม่มีคำแนะนำทีละขั้น ใช้ Context Template, Branch Strategy, และ Prompt Chaining ที่เรียนมาทั้งหมด

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม)

```
# ตรวจทุกอย่างพร้อมก่อนลงมือ
git status              # ต้องอยู่บน feature/[ชื่อ feature แรก]
npm run dev             # ต้องรันได้
cat .env.example        # ต้องมีทุก Variable
```

**ถ้าผ่านทั้งหมด = เริ่มสร้าง Final Project ได้เลย ✅**

---

### 🎯 Final Project Options — เลือก 1

**เลือกโปรเจกต์ที่ "อยากมีจริงๆ" ไม่ใช่แค่อยากสร้าง**

```
ตัวเลือก A — Personal Finance Tracker 💰
เป้าหมาย: App ติดตามรายรับรายจ่ายส่วนตัว
Stack: React + Supabase + Vercel
MVP: บันทึก Transaction, ดู Balance, Filter ตาม Category
Stretch: Chart, Export CSV, Budget Goal

ตัวเลือก B — Task Manager with Teams 📋
เป้าหมาย: Kanban Board ง่ายๆ สำหรับทีมเล็ก
Stack: React + Firebase Realtime + Vercel
MVP: สร้าง Board, เพิ่ม Card, Drag-and-drop สถานะ
Stretch: Team Invite, Due Date, Notification

ตัวเลือก C — Knowledge Base ส่วนตัว 🧠
เป้าหมาย: บันทึกและค้นหาสิ่งที่เรียนรู้
Stack: React + Supabase Full-text Search + Vercel
MVP: เพิ่ม/แก้/ลบ Note, Tag, Full-text Search
Stretch: Markdown Editor, Export, Share Link

ตัวเลือก D — โปรเจกต์ของตัวเอง 🚀 (แนะนำ)
→ App ที่อยากมีจริงๆ ในชีวิตประจำวัน
→ ถ้าไม่แน่ใจ ถาม Claude ช่วยออกแบบ
```

---

### 📋 Session Template — ใช้ก่อนเริ่มทุก Session

**วาง Context + สถานะปัจจุบันก่อน Prompt ทุกครั้ง:**

```
[PROJECT CONTEXT — วาง Template จากสัปดาห์ 19]

CURRENT STATUS:
- Branch: feature/[ชื่อ]
- Completed: [List Feature ที่เสร็จแล้ว]
- In Progress: [Feature ที่กำลังทำ]
- Next: [Feature ถัดไป]

CURRENT TASK:
[อธิบาย Task ที่จะทำใน Session นี้]
```

---

### 🗓️ แผนการ 6 ชั่วโมง (แนะนำ)

**Session 1 — สัปดาห์ 21 (3 ชม.)**

```
ชม. 1: Setup + Database + Auth
→ สร้าง Schema / Collections
→ Setup Auth (Login/Register)
→ Protected Route
→ Commit: "feat: auth and database setup"

ชม. 2: Core Feature #1
→ Feature หลักที่สุดของ App
→ CRUD Operations ครบ
→ Commit: "feat: [ชื่อ feature หลัก]"

ชม. 3: Core Feature #2
→ Feature สำคัญลำดับ 2
→ ทดสอบ Edge Cases
→ Commit: "feat: [ชื่อ feature 2]"
```

**Session 2 — สัปดาห์ 22 (3 ชม.)**

```
ชม. 4: UI + Responsive
→ Polish ทุก Component
→ Mobile Responsive ครบ
→ Loading/Error/Empty State ครบ
→ Commit: "style: responsive ui and polish"

ชม. 5: Integration + Testing
→ เชื่อม External API (ถ้ามี)
→ Manual Testing ทุก Feature
→ Fix Bug ที่พบ
→ Commit: "fix: bug fixes from testing"

ชม. 6: Pre-deploy + README
→ Security Review
→ ลบ console.log ทั้งหมด
→ เขียน README
→ Merge feature branches → dev → main
→ Commit: "docs: readme and final cleanup"
```

---

### 💬 Prompt ที่ใช้ในสัปดาห์ที่ 21–22

> 🏷️ **Module ที่ใช้:** `Claude Chat` ทุก Prompt 🏷️ **SQL: Supabase SQL Editor (ถ้าใช้ Supabase)** 🏷️ **Git: Terminal**

---

**Prompt เริ่ม Session — ใช้ต้นทุก Session**

```
[วาง Context Template เต็มๆ จากสัปดาห์ 19]

CURRENT STATUS:
Completed: [รายการที่เสร็จ]
In Progress: [กำลังทำ]

CURRENT TASK:
[Task ที่จะทำใน Session นี้อย่างละเอียด]

เริ่มด้วย [Feature/Component แรก] ก่อน
```

---

**Prompt ขอ Code Review กลาง Session**

```
[Context] ฉันเพิ่งเขียน [ชื่อ Feature] เสร็จ
[Task] Review โค้ดนี้ก่อน Commit
[Spec]
โค้ดที่ต้อง Review:
[วางโค้ด]
[Constraint]
ตรวจ:
1. TypeScript Types ถูกต้องไหม?
2. มี Bug หรือ Edge Case ที่ยังไม่ Handle ไหม?
3. Security Issue ไหม?
4. Performance Issue ที่ชัดเจนไหม?
5. โค้ดสอดคล้องกับ Context Template ไหม?
แสดงเป็น ✅ / ⚠️ / ❌
```

---

**Prompt เมื่อติดปัญหา**

```
[Context] ติดปัญหาระหว่างสร้าง Final Project
[Task] ช่วย Debug
[Spec]
Feature ที่กำลังสร้าง: [ชื่อ]
Branch ปัจจุบัน: [ชื่อ Branch]
ปัญหา: [อธิบายอาการ]
Error: [Copy Error มา]
โค้ดที่เกี่ยวข้อง: [วางโค้ด]
สิ่งที่ลองแล้ว: [บอกสิ่งที่ลองไปแล้ว]
[Constraint] อธิบายสาเหตุก่อน Fix
```

---

**Prompt Pre-deploy Review**

```
[Context] Final Project ใกล้เสร็จ เตรียม Deploy
[Task] Security + Production Readiness Review
[Spec]
ตรวจสอบทุกส่วน:
[วางโค้ดไฟล์สำคัญทั้งหมด]
[Constraint]
ตรวจ:
1. API Key / Secret โชว์ใน Client ไหม?
2. Auth Guard ครอบทุก Protected Route ไหม?
3. Input Validation ครบไหม?
4. console.log ยังอยู่ไหม?
5. Error Message เปิดเผยข้อมูล Internal ไหม?
6. npm run build ผ่านไหม? (ถ้าไม่แน่ใจ TypeScript Error)
แสดงเป็น Checklist ✅ / ⚠️ / ❌
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

| ตัวเลือก | Filename | Dimension | รายละเอียด |
| --- | --- | --- | --- |
| A (Finance) | `public/empty-transactions.svg` | 200 × 200 px | Empty State Illustration |
| B (Task) | `public/empty-board.svg` | 200 × 200 px | Empty State Illustration |
| C (Knowledge) | `public/empty-notes.svg` | 200 × 200 px | Empty State Illustration |
| ทุกตัวเลือก | `public/logo.svg` | 40 × 40 px | Logo ของ App |

> 💡 **ไม่มีรูป?** ถาม Claude: "สร้าง SVG Empty State Illustration สำหรับ \[App\]" Claude สร้าง SVG Code ให้ได้เลย ไม่ต้องโหลดจากที่ไหน

---

### Acceptance Criteria สัปดาห์ 21–22 ✅

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| MVP Features ครบทั้งหมด | ทำงานได้จริงทุก Feature | ยังขาด Feature หลัก |
| Auth ทำงานได้ (Login/Register/Logout) | Firebase/Supabase มี User | Login Error |
| ข้อมูลบันทึกลง Database จริง | เห็นใน Console | หายหลัง Refresh |
| Responsive ทุก Breakpoint | ทดสอบบน Mobile แล้วไม่แตก | Layout พังบน Mobile |
| Loading/Error/Empty State ครบ | ทุก Async มี 3 State | บางจุดหน้าขาว |
| ไม่มี console.log เหลือ | ตรวจใน Source ไม่เห็น | ยังมี |
| Commit History มีความหมาย ≥ 8 Commits | git log อ่านรู้เรื่อง | "update" ทุก Commit |
| npm run build ผ่าน | Build สำเร็จ 0 Error | TypeScript Error |

---

### 🚨 Common Errors สัปดาห์ที่ 21–22

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| Feature ไม่เสร็จตาม Plan | ประมาณเวลา Optimistic เกิน | Cut Scope ทันที ทำ MVP ก่อน |
| Merge Conflict ระหว่าง Branch | แก้ไฟล์เดิมหลาย Branch | ถาม Claude วิธีแก้ Conflict ทีละไฟล์ |
| TypeScript Error ตอน Build | Type ไม่ตรง | `npm run build` บ่อยๆ อย่ารอจนท้าย |
| Session ยาวเกิน Claude ลืม Context | Session ไม่มีขอบเขต | เริ่ม Session ใหม่ + วาง Context ใหม่ |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 23 ได้เลย!

---

---
