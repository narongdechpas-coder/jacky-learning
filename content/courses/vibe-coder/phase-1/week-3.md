---
title: "Git & Version Control — ตาข่ายนิรภัย"
hours: 3
---

## 📅 สัปดาห์ที่ 3 — Git & Version Control — ตาข่ายนิรภัย

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + ตั้งค่า 30 นาที + Workshop 1.5 ชม. = รวม 3 ชม.

---

### 🖥️ เปิด Terminal (หน้าต่างคำสั่ง) ครั้งแรก

> 💡 **Terminal คืออะไร?** หน้าต่างที่เราพิมพ์คำสั่งให้คอมทำงานโดยตรง แทนที่จะคลิกไอคอน เหมือน Remote Control ที่ควบคุมคอมได้ทุกอย่าง

**วิธีเปิด Terminal แยกตาม OS:**

```
Windows:
วิธีที่ 1 → กด Windows Key → พิมพ์ "Git Bash" → Enter
           (Git Bash จะมาพร้อมกับการติดตั้ง Git)
วิธีที่ 2 → เปิด VS Code → เมนู Terminal → New Terminal
           → เลือก Git Bash จาก Dropdown

Mac:
วิธีที่ 1 → กด Cmd + Space → พิมพ์ "Terminal" → Enter
วิธีที่ 2 → เปิด VS Code → เมนู Terminal → New Terminal

Linux:
→ กด Ctrl + Alt + T
```

**ทดสอบว่า Terminal พร้อมใช้:**

```
# พิมพ์คำสั่งนี้แล้วกด Enter
git --version

# ถ้าขึ้นแบบนี้ = พร้อมแล้ว ✅
git version 2.x.x

# ถ้าขึ้น "command not found" = ยังไม่ได้ติดตั้ง Git
# ให้กลับไปติดตั้งตามส่วน "เครื่องมือที่ต้องติดตั้ง"
```

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Git (Version Control System) คืออะไร?**

ลองนึกว่าเรากำลังแต่งเพลง แล้วบันทึกเสียงไว้หลาย Version:

-   Version 1: ท่อนแรก
-   Version 2: เพิ่มท่อนฮุก
-   Version 3: ลองเปลี่ยนจังหวะ (แต่ไม่ดี)
-   Revert (ย้อนกลับ) ไป Version 2 แล้วลองใหม่

Git คือ "เครื่องบันทึก Version" ของโค้ด ทุกครั้งที่ Commit มันเหมือนถ่ายรูปโค้ดเก็บไว้ แล้วสามารถ Checkout (ย้อนกลับ) ไปรูปไหนก็ได้

**GitHub คืออะไร?**

ถ้า Git คือกล้องถ่ายรูป GitHub คือ "อัลบั้มออนไลน์" บน Cloud ไม่หายแม้คอมพัง

```
สถานการณ์จริง:
โค้ดทำงานดี (Working State)
→ สั่ง Claude เพิ่ม Feature
→ โค้ดพัง Error ทุกอย่าง
→ มี Git: Revert กลับไป Version ดีได้ทันที ✅
→ ไม่มี Git: ร้องไห้ 😭
```

---

### 🔧 6 Command ที่ต้องรู้ — ทีละคำสั่ง

> 💡 **เรียนทีละคำสั่ง อย่าพยายามจำทั้งหมดในครั้งเดียว**

```
# Command 1: git init
# ความหมาย: "เริ่มต้น Git ในโฟลเดอร์นี้"
# ใช้ตอน: สร้างโปรเจกต์ใหม่ครั้งแรก
git init

# Command 2: git add .
# ความหมาย: "เตรียมไฟล์ทั้งหมดสำหรับ Commit"
# จุด (.) หมายถึง "ทุกไฟล์ในโฟลเดอร์นี้"
git add .

# Command 3: git commit -m "ข้อความ"
# ความหมาย: "บันทึก Snapshot พร้อมอธิบายว่าทำอะไร"
# -m ย่อมาจาก message (ข้อความ)
git commit -m "feat: add navbar"

# Command 4: git push
# ความหมาย: "ส่งโค้ดขึ้น GitHub"
git push

# Command 5: git log --oneline
# ความหมาย: "ดูประวัติ Commit ทั้งหมดแบบย่อ"
git log --oneline

# Command 6: git checkout [commit-hash]
# ความหมาย: "ย้อนกลับไปดู Version เก่า"
# commit-hash คือรหัสที่เห็นจาก git log
git checkout abc1234
```

---

### 📝 Commit Message Convention — เขียนแบบไหนดี?

> 💡 **ใช้ภาษาอังกฤษเสมอ** เพราะเป็น Standard สากล ทีมทั่วโลกเข้าใจได้

```
# รูปแบบ: [type]: [อธิบายสั้นๆ ว่าทำอะไร]

feat: add contact form        ← เพิ่ม Feature ใหม่
fix: navbar not showing       ← แก้ Bug
style: change button color    ← แก้แค่ CSS/Design
refactor: clean up html       ← จัดระเบียบโค้ด ไม่เปลี่ยน Behavior

# ❌ อย่าเขียนแบบนี้:
git commit -m "update"
git commit -m "fix"
git commit -m "aaaaa"
```

---

### 🚫 .gitignore — ไฟล์ที่ห้าม Push ขึ้น GitHub

```
# สร้างไฟล์ .gitignore ใน Root Folder แล้วใส่ข้อความนี้

node_modules/   # Dependencies ที่โหลดได้ใหม่ ไม่ต้อง Track
.env            # Environment Variables — API Key, Password
.env.local      # Local Environment Variables
.DS_Store       # ไฟล์ระบบ Mac ไม่จำเป็น
*.log           # Log Files ทุกประเภท
```

> ⚠️ **Security Warning:** Push .env ขึ้น GitHub = API Key โชว์ทั่วโลก อาจโดนเรียกเก็บค่าใช้งาน API โดยไม่รู้ตัว!

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Git & GitHub ภาษาไทย**

[![Git Thai](https://img.youtube.com/vi/U6zZyIKZ2NA/0.jpg)](https://www.youtube.com/watch?v=U6zZyIKZ2NA)

🔗 [https://www.youtube.com/watch?v=U6zZyIKZ2NA](https://www.youtube.com/watch?v=U6zZyIKZ2NA)

---

**วิดีโอ 2 — Git and GitHub for Beginners (freeCodeCamp — English)**

[![Git freeCodeCamp](https://img.youtube.com/vi/RGOj5yH7evk/0.jpg)](https://www.youtube.com/watch?v=RGOj5yH7evk)

🔗 [https://www.youtube.com/watch?v=RGOj5yH7evk](https://www.youtube.com/watch?v=RGOj5yH7evk)

> 💡 ดูแค่ช่วง 0:00–20:00 ก็พอสำหรับสัปดาห์นี้

---

### 📖 Further Reading

-   🔗 [git-scm.com — Getting Started](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F)
-   🔗 [github.com/signup](https://github.com/signup) — สมัครฟรี

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Prompt 1–2: ใช้ใน `Claude Chat`** — ถามวิธีใช้ Terminal และตั้งค่า Git 🏷️ **Prompt 3: ใช้ใน `Claude Code`** — หลัง Install Claude Code แล้ว

---

**Prompt 1 — ถาม Claude Chat วิธีตั้งค่า Git**

```
[Context] ฉันใช้ [Windows / Mac / Linux]
          เพิ่งเปิด Terminal เป็นครั้งแรกในชีวิต
[Task] เขียน Step-by-step Instructions สำหรับ:
1. ตรวจสอบว่า Git ติดตั้งแล้วหรือยัง
2. Config ชื่อและอีเมลครั้งแรก
3. สร้าง Repository บน GitHub ผ่านเว็บ
4. เชื่อม Local Folder กับ GitHub
5. Push โค้ดขึ้นครั้งแรก
[Spec] อธิบายทีละ Command บอกว่าแต่ละ Command ทำอะไร
[Constraint] ใช้ภาษาไทย อธิบายแบบไม่มีพื้นฐาน Terminal เลย
```

---

**Prompt 2 — สร้าง .gitignore**

```
[Context] โปรเจกต์ของฉันใช้ HTML + CSS + JavaScript
[Task] สร้างไฟล์ .gitignore ที่เหมาะสม
[Spec] โปรเจกต์นี้:
- มีไฟล์ .env เก็บ API Key
- ใช้ VS Code เป็น Editor
- ใช้ [Mac / Windows]
[Constraint] อธิบายสั้นๆ ว่าแต่ละ Entry ป้องกัน Security Risk อะไร
```

---

**Prompt 3 — ใช้ใน `Claude Code`**

```
[Context] ฉันมีโปรเจกต์ HTML อยู่ใน Folder นี้แล้ว
[Task] ช่วย Initialize Repository และทำ First Commit
[Spec]
1. สร้างไฟล์ .gitignore ที่เหมาะสม
2. รัน git init และ git add .
3. Commit ครั้งแรก Message: "first commit: landing page phase 1"
4. แสดง Next Steps สำหรับ Push ขึ้น GitHub
[Constraint] อธิบายทุก Command ที่รัน
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

| Filename | Dimension | รายละเอียด | แหล่งรูปฟรี |
| --- | --- | --- | --- |
| `images/profile-photo.jpg` | 400 × 400 px | รูปโปรไฟล์ (จากสัปดาห์ 1 ใช้ได้เลย) | [unsplash.com](https://unsplash.com) |
| `images/about-bg.jpg` | 800 × 400 px | Background ของ About Section (Optional) | [unsplash.com](https://unsplash.com) |

> 💡 วางไฟล์รูปทั้งหมดใน Folder `images/` เพื่อให้ Git Track พร้อมกับโค้ด

---

### 🛠️ Workshop — "Landing Page พร้อม Git History"

> 🏷️ **Prompt แก้โค้ด: ใช้ใน `Claude Chat`** 🏷️ **Git Commands: รันใน Terminal หรือใช้ `Claude Code` ช่วย** ⏱️ **เวลาโดยประมาณ:** 1.5 ชั่วโมง 📋 **สิ่งที่ต้องมีก่อนเริ่ม:** Git ติดตั้งแล้ว + GitHub Account พร้อม

**โจทย์ / Assignment:**

นำ Landing Page จากสัปดาห์ 2 มา Iterate และจัดการด้วย Git ต้องมี Commit History อย่างน้อย 4 Commits พร้อม Push ขึ้น GitHub

---

**Checkpoint ก่อนเริ่ม:**

```
✅ Terminal เปิดได้และพิมพ์ git --version แล้วขึ้นเลข Version
✅ มี GitHub Account และ Login แล้ว
✅ มีโฟลเดอร์โปรเจกต์จากสัปดาห์ 2 พร้อม
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat` ทีละ Prompt แล้ว Commit ทันที**

```
=== Prompt 1: About Section ===
[Context] ต่อจาก Landing Page ที่มีอยู่แล้ว
[Task] เพิ่ม About Section ระหว่าง Hero กับ Features
[Spec]
- Profile Image: images/profile-photo.jpg เป็น Circle 150×150px
  ถ้าไม่มีไฟล์ใช้ CSS Placeholder วงกลมสีเทา
- Body Text: แนะนำตัว 3–4 บรรทัด
- Layout: Image ซ้าย Text ขวา (Mobile: Image บน Text ล่าง)
[Constraint] Style ต้อง Consistent กับ Section อื่น

=== Prompt 2: Contact Form ===
[Context] ต่อจากโค้ดที่มีอยู่
[Task] เพิ่ม Contact Section ก่อน Footer
[Spec]
- Form Fields: Name, Email, Message
- Submit Button: "ส่งข้อความ"
- On Submit: Alert "ได้รับข้อความแล้ว ขอบคุณครับ/ค่ะ"
- Form Width: Max 600px, Center Aligned
[Constraint] No Backend — Alert เท่านั้น

=== Prompt 3: Mobile Responsive ===
[Context] ต่อจากโค้ดที่มีอยู่
[Task] แก้ทุก Section ให้ดูดีบน Mobile (< 768px)
[Spec]
- Navbar: ซ่อน Links แสดง Hamburger Icon (☰) แทน
  Hamburger Toggle → Dropdown Menu
- About: Single Column (Image บน Text ล่าง)
- Features Grid: 1 Column
[Constraint] ใช้ CSS Media Query + JavaScript เท่านั้น
```

---

**Git Workflow หลังแต่ละ Prompt — รันใน Terminal**

```
# ✅ ทำทันทีหลังแต่ละ Prompt — อย่ารอทำพร้อมกัน

# หลัง Prompt 1
git add .
git commit -m "feat: add about section with profile image"

# หลัง Prompt 2
git add .
git commit -m "feat: add contact form with alert"

# หลัง Prompt 3
git add .
git commit -m "fix: responsive layout and hamburger menu"

# Push ทั้งหมดขึ้น GitHub
git push origin main

# ตรวจสอบ Commit History
git log --oneline
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| มี GitHub Repository URL แชร์ได้ | มี Public URL | อยู่แค่ใน Local |
| git log แสดง 4+ Commits | มี 4+ Commits | มีแค่ 1 Commit |
| Commit Messages เป็น English บอกได้ว่าทำอะไร | เช่น "feat: add about section" | เขียนแค่ "update" |
| มีไฟล์ .gitignore ใน Repository | มีไฟล์นี้ | ไม่มี |
| ไม่มี .env หรือ API Key ใน Repository | ตรวจแล้วไม่พบ | พบ Key ใน Repo |
| About Section มีรูปหรือ CSS Placeholder | แสดงรูปได้ | ไม่มีรูปเลย |
| Hamburger Menu Toggle ทำงาน | เปิด/ปิดได้ | ไม่มีหรือไม่ทำงาน |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| `git: command not found` | ยังไม่ได้ติดตั้ง Git | กลับไปติดตั้งตามส่วนเครื่องมือ |
| `git push` แล้วขึ้น "rejected" | ยังไม่ได้ Link กับ GitHub | ถาม Claude: "git push rejected ต้องทำอะไร" |
| `fatal: not a git repository` | ยังไม่ได้รัน git init | รัน `git init` ใน Root Folder ก่อน |
| Hamburger ไม่ทำงาน | JavaScript Error | เปิด DevTools (F12) → Console ดู Error แล้วถาม Claude |
| รูปใน About ไม่แสดง | Path ผิด | ตรวจว่าไฟล์อยู่ใน `images/` จริงไหม |

---

> 🎯 ผ่านทุกข้อ → **Phase 1 เสร็จสมบูรณ์!** พร้อมเข้า Phase 2

---

## 🏁 Phase 1 Summary — สิ่งที่ได้เรียนรู้ทั้งหมด

```
✅ รู้จัก Claude 3 Module: Chat, Code, Artifacts
✅ รู้ Mental Model: คิด DATA / LOGIC / OUTPUT ก่อน Prompt ทุกครั้ง
✅ เขียน Prompt ครบ 4 ส่วน: Context / Task / Spec / Constraint
✅ ใช้ Prompt Chaining ใน Conversation เดียว ไม่เปิดใหม่กลางทาง
✅ เปิด Terminal ได้ทุก OS และรัน Command พื้นฐานได้
✅ รู้ Folder Structure มาตรฐานของโปรเจกต์เว็บ
✅ Copy โค้ดจาก Artifact ลงไฟล์จริงและดูใน Chrome ได้
✅ ใช้ Git Commit, Push และ Checkout ย้อน Version ได้
✅ มี GitHub Repository พร้อม Commit History
✅ รู้ Commit Message Convention แบบ English
✅ รู้ .gitignore และ Security Best Practice
✅ มี Bilingual Vocabulary ใช้ค้นหาข้อมูลต่อได้เอง
✅ รู้วิธีแก้ Common Errors ที่เจอบ่อยใน Phase นี้
```

**Deliverables (ชิ้นงาน) จาก Phase 1:**

-   🃏 **Profile Card** — HTML + CSS พร้อม Profile Image (สัปดาห์ 1)
-   🌐 **Landing Page** — สร้างด้วย Prompt Chaining 4 Iteration (สัปดาห์ 2)
-   📁 **Landing Page บน GitHub** — ครบ 5 Section มี Commit History (สัปดาห์ 3)

---

> ⏭️ **Phase 2 ถัดไป:** พื้นฐาน Web — HTML, CSS, Responsive Design, Design System, JavaScript และ Package Management
