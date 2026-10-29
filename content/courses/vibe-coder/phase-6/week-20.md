---
title: "Git Branch Strategy + Project Planning — วางแผนและจัดการโค้ดอย่างมีระบบ"
hours: 3
---

## 📅 สัปดาห์ที่ 20 — Git Branch Strategy + Project Planning — วางแผนและจัดการโค้ดอย่างมีระบบ

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Terminal ใน Folder โปรเจกต์แล้วพิมพ์:

```
git log --oneline --graph --all
```

**ถ้าเห็น Commit History มีอย่างน้อย 5 Commits = พร้อมแล้ว ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Feature Branch คืออะไร?**

ลองนึกถึงห้องแล็บในโรงเรียน นักเรียนแต่ละคนทดลองในโต๊ะของตัวเอง ไม่ทำให้โต๊ะกลางที่ทุกคนแชร์กันยุ่ง Feature Branch ก็เหมือนกัน — แต่ละ Feature พัฒนาใน Branch แยก แล้ว Merge เข้า Main เมื่อพร้อม

```
ไม่มี Branch Strategy:
main branch ←─ โค้ดพัง ←─ โค้ดพัง ←─ พยายามแก้ ←─ พังอีก 😭

มี Branch Strategy:
main ←─ feature/login ←─ feature/dashboard ←─ feature/payment
ทุก Branch ทำงานได้ main เสถียรเสมอ ✅
```

---

### 🌿 Git Branch Strategy — รูปแบบที่แนะนำ

**สำหรับ Solo Developer (Vibe Coder):**

```
main          ← Production Code เสถียรเสมอ
  └── dev     ← Development รวม Feature ที่เสร็จแล้ว
        ├── feature/auth        ← กำลังพัฒนา Login
        ├── feature/dashboard   ← กำลังพัฒนา Dashboard
        └── fix/navbar-mobile   ← กำลังแก้ Bug
```

**Workflow จริงๆ ทุกวัน:**

```
# 1. เริ่ม Feature ใหม่จาก dev
git checkout dev
git pull                          # อัพเดต dev ให้ล่าสุดก่อน
git checkout -b feature/add-cart  # สร้าง Branch ใหม่

# 2. พัฒนา Feature + Commit บ่อยๆ
git add .
git commit -m "feat: add product to cart"
git commit -m "feat: update cart quantity"
git commit -m "fix: cart total calculation"

# 3. เมื่อ Feature เสร็จ → Merge เข้า dev
git checkout dev
git merge feature/add-cart
git push origin dev

# 4. เมื่อพร้อม Release → Merge dev เข้า main
git checkout main
git merge dev
git push origin main              # Vercel Deploy อัตโนมัติ ✅

# 5. ลบ Branch ที่ไม่ใช้แล้ว
git branch -d feature/add-cart
```

---

### 📋 Project Planning — วิธีวางแผนก่อนลงมือ

**วิธีที่ Vibe Coder ใช้ — 4 ขั้นตอน:**

```
ขั้นที่ 1: กำหนด MVP
→ ถามตัวเองว่า "ถ้าทำได้แค่ 3 Feature App นี้ยังใช้งานได้ไหม?"
→ Feature ที่ตอบว่า "ใช่" คือ MVP
→ Feature ที่เหลือคือ Nice-to-have

ขั้นที่ 2: แตก Task
→ แต่ละ Feature แตกเป็น Task ย่อยที่ทำได้ใน 30–60 นาที
→ Task ที่ใหญ่เกินไปต้องแตกต่อไปอีก

ขั้นที่ 3: กำหนด Order
→ เรียง Task ตาม Dependency
→ Task ที่ Task อื่น Depend On ต้องทำก่อนเสมอ

ขั้นที่ 4: Estimate
→ ประมาณเวลาแต่ละ Task
→ บวกเผื่อไว้ 1.5x เสมอ (มักนานกว่าคิด)
```

**ตัวอย่าง Task Breakdown — Budget App:**

```
MVP Features:
├── Auth (2 ชม.)
│   ├── Login Form — 30 นาที
│   ├── Register Form — 30 นาที
│   ├── Protected Route — 20 นาที
│   └── Auth Context — 40 นาที
│
├── Transaction CRUD (2 ชม.)
│   ├── Database Schema — 20 นาที
│   ├── Add Transaction Form — 40 นาที
│   ├── Transaction List — 30 นาที
│   └── Delete Transaction — 30 นาที
│
└── Balance Summary (1 ชม.)
    ├── Calculate Balance — 20 นาที
    ├── Income/Expense Total — 20 นาที
    └── Summary Card UI — 20 นาที

Nice-to-have (ทำถ้าเวลาเหลือ):
- Chart / Visualization
- Export CSV
- Category Filter
- Monthly View
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Git Branching Strategy ภาษาไทย**

[![Git Branch TH](https://img.youtube.com/vi/royxjMnQqOM/0.jpg)](https://www.youtube.com/watch?v=royxjMnQqOM)

🔗 [https://www.youtube.com/watch?v=royxjMnQqOM](https://www.youtube.com/watch?v=royxjMnQqOM)

---

**วิดีโอ 2 — Git Flow for Solo Developers (Fireship — English)**

[![Git Flow](https://img.youtube.com/vi/Uszj_k0DGsg/0.jpg)](https://www.youtube.com/watch?v=Uszj_k0DGsg)

🔗 [https://www.youtube.com/watch?v=Uszj\_k0DGsg](https://www.youtube.com/watch?v=Uszj_k0DGsg)

---

### 📖 Further Reading

-   🔗 [git-scm.com/book/en/v2/Git-Branching-Branching-Workflows](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)
-   🔗 [www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` วางแผน + Terminal รัน Git

---

**Prompt 1 — ให้ Claude ช่วยวาง Project Plan**

```
[Context] ฉันกำลังจะสร้าง [ชื่อ Final Project]
Stack: [Stack ที่เลือก]
เวลาที่มี: 6 ชั่วโมง แบ่งเป็น 2 Session ละ 3 ชั่วโมง

[Task] ช่วยสร้าง Project Plan ที่ทำได้จริงใน 6 ชั่วโมง
[Spec]
- กำหนด MVP Scope อย่างชัดเจน
- แตก Task พร้อมเวลาประมาณ (Realistic ไม่ Optimistic)
- เรียง Task ตาม Dependency
- ระบุ Branch ที่ต้องสร้างสำหรับแต่ละ Feature
- บอก Risk ที่อาจทำให้ช้า
[Constraint] Plan ต้องทำตามได้จริง ไม่ใช่แค่สวยงาม
```

---

**Prompt 2 — สร้าง Git Setup สำหรับโปรเจกต์**

```
[Context] เริ่ม Final Project ใหม่
[Task] เขียน Commands ทั้งหมดสำหรับ Git Setup
[Spec]
1. Init Repo + First Commit
2. สร้าง dev Branch
3. Push ขึ้น GitHub พร้อม Remote
4. สร้าง Feature Branch แรก: feature/[ชื่อ Feature แรก]
5. .gitignore ที่เหมาะสมสำหรับ React + Vite + [Firebase/Supabase]
[Constraint] อธิบายทุก Command ว่าทำอะไร
```

---

### 🛠️ Workshop — "Setup Final Project + Git Strategy"

> 🏷️ **Module ที่ใช้:** `Claude Chat` วางแผน + `Terminal` Git ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง

**โจทย์ / Assignment:**

เตรียม Infrastructure ทั้งหมดสำหรับ Final Project ให้พร้อมก่อนลงมือสร้าง

---

**Checklist ก่อนเริ่ม Workshop:**

```
✅ Final Project ชัดเจนแล้วจากสัปดาห์ 19
✅ Context Template พร้อมแล้ว
✅ รู้ว่าจะใช้ Firebase หรือ Supabase
```

---

**ขั้นตอน Setup (ทำตามลำดับ):**

```
# 1. สร้าง React Project ใหม่
npx create-vite@latest [ชื่อ project] -- --template react-ts
cd [ชื่อ project]
npm install

# 2. ติดตั้ง Dependencies ที่ต้องใช้
npm install [firebase หรือ @supabase/supabase-js]
npm install react-router-dom
# เพิ่มอื่นๆ ตาม Stack ที่เลือก

# 3. ตั้งค่า Git
git init
git add .
git commit -m "init: project setup with vite react typescript"

# 4. Push ขึ้น GitHub
# สร้าง Repo บน GitHub ก่อน แล้วรัน:
git remote add origin [GitHub URL]
git branch -M main
git push -u origin main

# 5. สร้าง dev Branch
git checkout -b dev
git push -u origin dev

# 6. สร้าง Feature Branch แรก
git checkout -b feature/auth
```

---

**Prompt สำเร็จรูป — สร้าง Folder Structure ที่ถูกต้อง**

```
[Context] เพิ่ง Setup React + Vite + TypeScript Project ใหม่
[Task] สร้าง Folder Structure และไฟล์เริ่มต้นที่ถูกต้อง
[Spec]
Project: [ชื่อและอธิบาย App]
Stack: React + Vite + TypeScript + [Firebase/Supabase]

สร้างให้:
- Folder Structure ตาม Context Template
- src/types/index.ts — TypeScript Interfaces ทั้งหมด
- src/lib/[firebase.ts หรือ supabase.ts] — DB Client
- src/hooks/useAuth.ts — Auth Hook Skeleton
- src/components/ui/ — Button, Input, Modal Component พื้นฐาน
- App.tsx — Router Setup พร้อม Protected Route
- .env.example — ทุก ENV Variable ที่ต้องใช้

[Constraint]
- ใช้ TypeScript Interfaces ไม่ใช่ any
- Comment บอกว่าแต่ละ Folder ใช้ทำอะไร
- ไม่ต้อง Implement Logic ยังแค่ Skeleton ก่อน
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| GitHub Repo มี main + dev Branch | git branch -a เห็นทั้งคู่ | มีแค่ main |
| Folder Structure ตาม Context Template | ครบทุก Folder | ทุกอย่างอยู่ใน src/ ราก |
| .env.example อยู่ใน GitHub | ดูใน Repo เห็น | ไม่มี |
| .env จริงไม่อยู่ใน GitHub | Repo ไม่มี .env | เห็น .env |
| Project Plan เขียนลงกระดาษ/Notion | มี Task List | ยังคิดในหัวอยู่ |
| npm run dev รันได้ | Browser เปิดได้ | Error |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| `fatal: remote origin already exists` | เคย git remote add แล้ว | `git remote set-url origin [URL ใหม่]` |
| TypeScript Error ทันทีหลัง Setup | Version ไม่ Compatible | ถาม Claude: "แก้ TypeScript Config สำหรับ \[Stack\]" |
| Merge Conflict | แก้ไฟล์เดิมใน 2 Branch | ถาม Claude: "วิธีแก้ Merge Conflict ใน \[ไฟล์นี้\]" |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 21–22 ได้เลย!

---

---
