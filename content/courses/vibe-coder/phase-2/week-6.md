---
title: "JavaScript Concept + Package Management (เข้าใจ Logic + npm)"
hours: 3
---

## 📅 สัปดาห์ที่ 6 — JavaScript Concept + Package Management (เข้าใจ Logic + npm)

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

> ⚠️ **ก่อนเริ่มสัปดาห์นี้:** ต้องติดตั้ง Node.js แล้ว ตรวจสอบโดยพิมพ์ใน Terminal: `node --version` และ `npm --version` ถ้าขึ้นเลข Version = พร้อมแล้ว ✅

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Terminal แล้วพิมพ์ทีละบรรทัด:

```
node --version    # ควรขึ้น v20.x.x หรือสูงกว่า
npm --version     # ควรขึ้น 10.x.x หรือสูงกว่า
```

**ถ้าขึ้นเลข Version ทั้งคู่ = พร้อมแล้ว ✅** ถ้าขึ้น "command not found" → กลับไปติดตั้ง Node.js ตามส่วนเครื่องมือ

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**JavaScript คืออะไร?**

ถ้า HTML คือโครงสร้างบ้าน CSS คือการตกแต่ง JavaScript คือ "ระบบไฟฟ้าและเครื่องใช้ภายในบ้าน"

```
กดสวิตช์ไฟ (Click Button)
→ หลอดไฟติด (Element แสดงผล)

ตั้งเวลา (setTimeout)
→ แอร์ปิดอัตโนมัติ (Function รันหลังเวลาผ่านไป)

เซ็นเซอร์ตรวจจับ (Event Listener)
→ กริ่งประตูดัง (Alert / Notification แสดง)
```

**npm คืออะไร?**

npm = Node Package Manager ลองนึกว่าเป็น "App Store สำหรับโค้ด" เวลาต้องการใช้ความสามารถพิเศษในโปรเจกต์ แทนที่จะเขียนเอง ก็แค่ "ติดตั้ง Package" ที่คนอื่นเขียนไว้แล้ว

```
# เหมือนกดติดตั้งแอปบน App Store
npm install [ชื่อ package]
```

---

### 📝 JavaScript — 5 Concept หลักที่ต้องรู้จัก

**1\. Variable (ตัวแปร) — ที่เก็บข้อมูล**

```
// const = ค่าไม่เปลี่ยน (ใช้เป็น Default)
const siteName = "My Portfolio"
const primaryColor = "#6366F1"

// let = ค่าเปลี่ยนได้
let count = 0
let isMenuOpen = false

// ❌ อย่าใช้ var — เป็น Old Style
```

**2\. Function (ฟังก์ชัน) — ชุดคำสั่งที่ใช้ซ้ำได้**

```
// Function Declaration
function showAlert(message) {
  alert(message)
}

// Arrow Function (Modern Style — แนะนำ)
const showAlert = (message) => {
  alert(message)
}

// เรียกใช้
showAlert("สวัสดี!")
```

**3\. Conditional (เงื่อนไข) — ทำต่างกันตามสถานการณ์**

```
const hour = new Date().getHours()

if (hour < 12) {
  console.log("สวัสดีตอนเช้า")
} else if (hour < 18) {
  console.log("สวัสดีตอนบ่าย")
} else {
  console.log("สวัสดีตอนเย็น")
}
```

**4\. Event Listener (การรับ Event) — รอฟังสิ่งที่เกิดขึ้น**

```
// เมื่อคลิก Button → ทำอะไรบางอย่าง
const button = document.querySelector('#myButton')

button.addEventListener('click', () => {
  console.log('ถูกคลิกแล้ว!')
})

// Events ที่ใช้บ่อย:
// 'click'       → คลิก
// 'scroll'      → เลื่อนหน้า
// 'mouseover'   → Hover เมาส์
// 'submit'      → Submit Form
// 'keydown'     → กดคีย์บอร์ด
```

**5\. DOM Manipulation — แก้ไข HTML ด้วย JavaScript**

```
// เข้าถึง Element
const title = document.querySelector('h1')
const cards = document.querySelectorAll('.card')

// เปลี่ยนข้อความ
title.textContent = "ชื่อใหม่"

// เปลี่ยน Style
title.style.color = "red"

// เพิ่ม / ลบ CSS Class
title.classList.add('active')
title.classList.remove('hidden')
title.classList.toggle('dark')  // สลับเปิด/ปิด

// เปลี่ยน HTML ข้างใน
title.innerHTML = "<span>ข้อความใหม่</span>"
```

---

### 📦 Package Management — npm ใช้อย่างไร

**Structure ของ package.json:**

```
{
  "name": "my-portfolio",
  "version": "1.0.0",
  "description": "Portfolio website",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

**คำอธิบายแต่ละส่วน:**

```
"scripts"        → คำสั่งลัด เช่น npm run dev = รัน Development Server
"dependencies"   → Package ที่ใช้ใน Production (ผู้ใช้ต้องการ)
"devDependencies"→ Package ที่ใช้ตอน Development เท่านั้น (Build Tools)
```

**Commands npm ที่ใช้บ่อย:**

```
npm init -y              # สร้าง package.json ใหม่
npm install              # ติดตั้ง Package ทั้งหมดใน package.json
npm install [package]    # ติดตั้ง Package ใหม่
npm install -D [package] # ติดตั้งเป็น devDependency
npm run dev              # รัน Script "dev"
npm run build            # Build สำหรับ Production
npx [command]            # รัน Package โดยไม่ต้องติดตั้ง
```

**npm vs npx ต่างกันยังไง?**

```
# npm install = ติดตั้งลงเครื่องก่อนใช้
npm install create-react-app
create-react-app my-app

# npx = รันเลยโดยไม่ต้องติดตั้ง (แนะนำ)
npx create-react-app my-app
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — JavaScript พื้นฐาน ภาษาไทย**

[![JavaScript TH](https://img.youtube.com/vi/PGZ7QiKdumo/0.jpg)](https://www.youtube.com/watch?v=PGZ7QiKdumo)

🔗 [https://www.youtube.com/watch?v=PGZ7QiKdumo](https://www.youtube.com/watch?v=PGZ7QiKdumo)

---

**วิดีโอ 2 — JavaScript in 100 Seconds (Fireship — English)**

[![JS Fireship](https://img.youtube.com/vi/DHjqpvDnNGE/0.jpg)](https://www.youtube.com/watch?v=DHjqpvDnNGE)

🔗 [https://www.youtube.com/watch?v=DHjqpvDnNGE](https://www.youtube.com/watch?v=DHjqpvDnNGE)

> 💡 ดูเพื่อเข้าใจ Big Picture ของ JavaScript ใน 2 นาที

---

**วิดีโอ 3 — npm Crash Course (Traversy Media — English)**

[![npm Crash](https://img.youtube.com/vi/jHDhaSSKmB0/0.jpg)](https://www.youtube.com/watch?v=jHDhaSSKmB0)

🔗 [https://www.youtube.com/watch?v=jHDhaSSKmB0](https://www.youtube.com/watch?v=jHDhaSSKmB0)

> 💡 ดูช่วง 0:00–15:00 ก็พอเข้าใจ npm แล้ว

---

### 📖 Further Reading

-   🔗 [javascript.info](https://javascript.info) — บทที่ 1–4 (Variables, Functions, Conditionals, DOM)
-   🔗 [docs.npmjs.com](https://docs.npmjs.com) — npm Official Docs

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` สำหรับโค้ด JavaScript 🏷️ **npm commands: รันใน Terminal โดยตรง**

---

**Prompt 1 — สร้าง Interactive Feature ด้วย JavaScript**

```
[Context] ต่อจาก Portfolio ที่มีอยู่แล้ว
[Task] เพิ่ม Interactive Features ด้วย JavaScript
[Spec]
1. Dark Mode Toggle: ปุ่มสลับ Light/Dark Mode
   - บันทึก Preference ใน localStorage
   - ใช้ CSS Class Toggle

2. Filter Projects: ปุ่ม Filter Project Cards ตาม Category
   - All, Web, Design, Other
   - เมื่อ Filter Cards ที่ไม่ตรงจะ Fade Out

3. Form Validation: ตรวจสอบ Contact Form ก่อน Submit
   - Email Format ถูกต้องไหม
   - ช่องว่างไม่ได้ปล่อยว่าง
   - แสดง Error Message ใต้ช่องที่ผิด
[Constraint] JavaScript ล้วน ไม่ใช้ Library
แสดงผลเป็น Artifact
```

---

**Prompt 2 — ให้ Claude อธิบาย JavaScript ที่ไม่เข้าใจ**

```
[Context] ฉันกำลังเรียน JavaScript แต่ไม่เข้าใจ Concept นี้
[Task] อธิบาย [Concept ที่ไม่เข้าใจ] ให้เข้าใจได้
[Spec]
- อธิบายด้วยอุปมาชีวิตจริง
- ยกตัวอย่างโค้ดสั้นๆ 3–5 บรรทัด
- บอกด้วยว่าใช้ตอนไหนในชีวิตจริง
[Constraint] ไม่ใช้ศัพท์เทคนิคที่ซับซ้อนโดยไม่อธิบาย
```

---

**Prompt 3 — ตั้งค่าโปรเจกต์ด้วย npm (ใช้ใน `Claude Chat`)**

```
[Context] ฉันอยากเปลี่ยนโปรเจกต์ HTML ธรรมดาเป็นโปรเจกต์ที่ใช้ npm
[Task] เขียน Step-by-step วิธีตั้งค่าโปรเจกต์ด้วย Vite
[Spec]
- ติดตั้ง Vite สำหรับ Development Server
- ย้ายไฟล์เดิมเข้าโครงสร้างใหม่
- ตั้งค่า npm Scripts: dev, build, preview
[Constraint] อธิบายทุก Command ที่ต้องรัน ใช้ภาษาไทย
```

---

**Prompt ฉุกเฉิน — JavaScript Error แก้ไม่ได้**

```
[Context] มี JavaScript Error ที่แก้ไม่ได้
[Task] ช่วย Debug และอธิบายสาเหตุ
[Spec]
Error Message: [Copy ข้อความ Error จาก Console มาวาง]
โค้ดที่เกี่ยวข้อง:
[วางโค้ดที่คิดว่าเป็นปัญหา]
สิ่งที่ควรเกิดขึ้น: [อธิบาย]
สิ่งที่เกิดขึ้นจริง: [อธิบาย]
[Constraint] อธิบายสาเหตุด้วย ไม่ใช่แค่ให้โค้ดใหม่
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

> 💡 สัปดาห์นี้ใช้รูปเดิมจากสัปดาห์ 4–5 ได้เลย ไม่ต้องเตรียมใหม่

---

### 🛠️ Workshop — "Portfolio Interactive + npm Setup"

> 🏷️ **Prompt โค้ด: ใช้ใน `Claude Chat`** 🏷️ **npm Commands: รันใน Terminal** ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **ต้องมีก่อนเริ่ม:** Node.js ติดตั้งแล้ว + Portfolio จากสัปดาห์ 5 พร้อม

**โจทย์ / Assignment:**

เพิ่ม JavaScript Features ให้ Portfolio และตั้งค่าโปรเจกต์ให้ใช้ npm + Vite

---

**Checkpoint ก่อนเริ่ม:**

```
✅ node --version ขึ้นเลข Version
✅ npm --version ขึ้นเลข Version
✅ Portfolio จากสัปดาห์ 5 อยู่ใน VS Code พร้อม
```

---

**Part A — เพิ่ม JavaScript Features (ใช้ใน `Claude Chat`)**

```
=== Prompt 1: Dark Mode ===
[Context] ต่อจาก Portfolio ที่มี Design System แล้ว
[Task] เพิ่ม Dark Mode Toggle
[Spec]
- ปุ่ม Toggle ที่ Navbar มีไอคอน ☀️ / 🌙
- เมื่อ Toggle เปลี่ยน CSS Variable ทั้งหมดเป็น Dark Mode
- บันทึก Preference ไว้ใน localStorage
- หน้าเว็บ Load มาให้ดึง Preference เดิมขึ้นมาใช้
[Constraint] ใช้ CSS Class Toggle + CSS Variable เท่านั้น

=== Prompt 2: Project Filter ===
[Context] ต่อจากโค้ดที่มีอยู่
[Task] เพิ่มระบบ Filter Project Cards
[Spec]
- เพิ่ม Category Tag ให้แต่ละ Card: HTML/CSS, JavaScript, Design
- ปุ่ม Filter: All, HTML/CSS, JavaScript, Design
- เมื่อ Filter Inactive Cards จะ Fade Out (opacity 0.3)
- Active Filter ปุ่มจะมีสีต่าง
[Constraint] ใช้ data-attribute บน Cards ไม่ใช้ Library

=== Prompt 3: Form Validation ===
[Context] ต่อจากโค้ดที่มีอยู่
[Task] เพิ่ม Client-side Validation ให้ Contact Form
[Spec]
- Validate ทุก Field ก่อน Submit:
  Name: ต้องมีอย่างน้อย 2 ตัวอักษร
  Email: ต้องเป็น Format ที่ถูกต้อง
  Message: ต้องมีอย่างน้อย 10 ตัวอักษร
- แสดง Error Message สีแดงใต้ Field ที่ผิด
- เมื่อแก้ไขถูกต้องให้ Error หายไป (Real-time Validation)
- เมื่อ Submit สำเร็จแสดง Success Message สีเขียว
[Constraint] JavaScript ล้วน ไม่ใช้ Library ใดๆ
```

---

**Part B — ตั้งค่า npm + Vite (รันใน Terminal)**

```
# ขั้นตอนที่ 1: เข้าไปใน Folder โปรเจกต์
cd path/to/my-portfolio

# ขั้นตอนที่ 2: สร้าง package.json
npm init -y

# ขั้นตอนที่ 3: ติดตั้ง Vite
npm install -D vite

# ขั้นตอนที่ 4: เปิด package.json ใน VS Code แล้วเพิ่ม Scripts
# "scripts": {
#   "dev": "vite",
#   "build": "vite build",
#   "preview": "vite preview"
# }

# ขั้นตอนที่ 5: รัน Development Server
npm run dev
# เปิด Browser ไป http://localhost:5173
```

> 💡 ถ้าไม่แน่ใจขั้นตอนไหน ถาม Claude Chat: "ช่วยอธิบาย Step \[เลข\] ให้ชัดขึ้นหน่อย"

---

**ขั้นตอน Commit หลังทำเสร็จ:**

```
# เพิ่ม node_modules ใน .gitignore ก่อน!
echo "node_modules/" >> .gitignore

git add .
git commit -m "feat: add dark mode, project filter, form validation"
git push
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| Dark Mode Toggle สลับได้ และจำ Preference | Reload แล้วยัง Dark | กลับเป็น Light ทุกครั้ง |
| Project Filter กรอง Cards ได้ถูกต้อง | Filter ตรงตาม Category | Filter ไม่ทำงาน |
| Form Validation แสดง Error ที่ถูกต้อง | Error ขึ้นตรง Field ที่ผิด | Error ไม่ขึ้น หรือขึ้นผิดที่ |
| npm run dev รันได้ เปิด localhost ได้ | Browser เปิด localhost:5173 | Error ตอนรัน |
| node\_modules ไม่อยู่ใน Git | ตรวจใน GitHub ไม่เห็น | เห็น node\_modules ใน Repo |
| Commit ขึ้น GitHub แล้ว | มี Commit ใหม่ | ยังไม่ได้ Commit |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| `npm: command not found` | ยังไม่ได้ติดตั้ง Node.js | ติดตั้ง Node.js LTS จาก nodejs.org |
| `npm run dev` แล้ว Error | Vite ยังไม่ได้ติดตั้ง | รัน `npm install` ก่อน |
| localStorage ไม่ทำงาน | เปิดไฟล์ HTML ตรงๆ ไม่ผ่าน Server | ใช้ `npm run dev` แทนดับเบิลคลิก |
| Dark Mode ไม่จำ Preference | localStorage Key ผิด | ถาม Claude: "localStorage ไม่ Save ค่า ช่วย Debug" |
| node\_modules อยู่ใน GitHub | ลืมเพิ่ม .gitignore ก่อน Commit | ถาม Claude: "วิธีลบ node\_modules ออกจาก Git History" |

---

> 🎯 ผ่านทุกข้อ → **Phase 2 เสร็จสมบูรณ์!** พร้อมเข้า Phase 3

---

## 🏁 Phase 2 Summary — สิ่งที่ได้เรียนรู้ทั้งหมด

```
✅ รู้ว่า HTML / CSS / JavaScript แต่ละส่วนทำหน้าที่อะไร
✅ อ่าน HTML Tag และ CSS Property ออก บอก Claude ได้ถูกต้อง
✅ รู้ชื่อ UI Component ทั้งหมดกว่า 16 ชนิด — Prompt ได้แม่นขึ้น
✅ ใช้ Flexbox และ CSS Grid จัด Layout ได้
✅ สร้าง Design System ด้วย CSS Variable ครบชุด
✅ ทำ Responsive Design ด้วย Mobile-first + Media Query
✅ ทดสอบ Responsive ด้วย Chrome DevTools
✅ เข้าใจ JavaScript 5 Concept: Variable, Function, Conditional, Event, DOM
✅ ใช้ npm ติดตั้ง Package และรัน Script ได้
✅ ตั้งค่า Vite Development Server ได้
✅ รู้ความต่างระหว่าง npm และ npx
✅ รู้ว่า node_modules ต้องอยู่ใน .gitignore เสมอ
```

**Deliverables (ชิ้นงาน) จาก Phase 2:**

-   🏠 **Portfolio Homepage** — มี Design System + Component ครบ (สัปดาห์ 4)
-   📱 **Portfolio Responsive** — ดีทุก Device + Animation (สัปดาห์ 5)
-   ⚡ **Portfolio Interactive** — Dark Mode + Filter + Validation + npm (สัปดาห์ 6)

---

> ⏭️ **Phase 3 ถัดไป:** สร้าง App แบบ Interactive — React, State Management, API & Fetch, Data Modeling, Testing & Debugging
