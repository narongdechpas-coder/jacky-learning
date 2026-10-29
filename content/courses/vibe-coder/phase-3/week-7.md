---
title: "React + State Management (Component และการจัดการข้อมูล)"
hours: 3
---

## 📅 สัปดาห์ที่ 7 — React + State Management (Component และการจัดการข้อมูล)

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

> ⚠️ **ก่อนเริ่มสัปดาห์นี้:** ต้องมี Node.js และ npm พร้อมใช้งานแล้ว ตรวจสอบ: พิมพ์ `node --version` ใน Terminal ควรขึ้นเลข Version

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Terminal แล้วรัน:

```
npx create-vite@latest test-react -- --template react
cd test-react
npm install
npm run dev
```

**ถ้าเปิด Browser แล้วเห็นหน้า Vite + React = Node.js พร้อมแล้ว ✅** ลบ Folder test-react ทิ้งได้เลย เป็นแค่การทดสอบ

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**React คืออะไร?**

ลองนึกถึงการสร้างบ้านด้วย LEGO แทนที่จะสร้างทุกอย่างตั้งแต่ต้น เราสร้างชิ้นส่วนย่อยๆ ก่อน เช่น ประตู หน้าต่าง หลังคา แล้วนำมาประกอบ — React ทำงานแบบเดียวกัน เรียกชิ้นส่วนพวกนี้ว่า "Component"

```
App (บ้านทั้งหลัง)
├── Navbar (หลังคา)
├── Hero (ห้องนั่งเล่น)
│   ├── Heading (โซฟา)
│   └── Button (โต๊ะ)
├── Projects (ห้องนอน)
│   ├── Card (เตียง)
│   ├── Card (ตู้เสื้อผ้า)
│   └── Card (โต๊ะทำงาน)
└── Footer (รั้ว)
```

**State คืออะไร?**

State คือ "ความจำ" ของ Component ลองนึกถึงกระดานคะแนนในเกม ตัวเลขบนกระดานเปลี่ยนไปทุกครั้งที่ผู้เล่นทำคะแนน และเมื่อกระดานเปลี่ยน UI ก็อัพเดตตามทันที — นั่นคือ State

```
State เปลี่ยน → React Render UI ใหม่อัตโนมัติ ✅

ถ้าใช้ตัวแปร JS ธรรมดา:
ตัวแปรเปลี่ยน → UI ไม่อัพเดต ❌
```

---

### ⚛️ React Concept หลัก — ทีละชิ้น

**1\. Component — ชิ้นส่วนที่ประกอบเป็น UI**

```
// Component คือ Function ที่ Return JSX
// ชื่อต้องขึ้นต้นด้วยตัวพิมพ์ใหญ่เสมอ

function ProfileCard() {
  return (
    <div className="card">
      <img src="profile.jpg" alt="Profile" />
      <h2>สมชาย ใจดี</h2>
      <p>Frontend Developer</p>
    </div>
  )
}

// ใช้งาน Component เหมือน HTML Tag
function App() {
  return (
    <div>
      <ProfileCard />
      <ProfileCard />
    </div>
  )
}
```

**2\. Props — ส่งข้อมูลเข้า Component**

```
// กำหนด Props ที่รับได้
function ProfileCard({ name, role, image }) {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  )
}

// ส่ง Props เมื่อใช้งาน
function App() {
  return (
    <div>
      <ProfileCard
        name="สมชาย ใจดี"
        role="Frontend Developer"
        image="profile1.jpg"
      />
      <ProfileCard
        name="สมหญิง รักดี"
        role="UI Designer"
        image="profile2.jpg"
      />
    </div>
  )
}
```

**3\. useState — เก็บและอัพเดต State**

```
import { useState } from 'react'

function Counter() {
  // [ค่าปัจจุบัน, ฟังก์ชันอัพเดต] = useState(ค่าเริ่มต้น)
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div>
      <p>นับ: {count}</p>
      <button onClick={() => setCount(count + 1)}>เพิ่ม</button>
      <button onClick={() => setCount(count - 1)}>ลด</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'ซ่อน' : 'แสดง'}
      </button>
      {isVisible && <p>ข้อความนี้ซ่อน/แสดงได้</p>}
    </div>
  )
}
```

**4\. useEffect — ทำงานหลัง Render**

```
import { useState, useEffect } from 'react'

function App() {
  const [time, setTime] = useState(new Date())

  // รันทุกครั้งที่ Component Mount (โหลดครั้งแรก)
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // Cleanup — ทำงานเมื่อ Component ถูกลบออก
    return () => clearInterval(timer)
  }, []) // [] = รันแค่ครั้งเดียวตอน Mount

  return <p>เวลาปัจจุบัน: {time.toLocaleTimeString()}</p>
}
```

**5\. State Lifting — แชร์ State ระหว่าง Component**

```
// ปัญหา: 2 Component ต้องการ State เดียวกัน
// แก้ไข: ยก State ขึ้นไปไว้ที่ Parent แล้วส่งลงผ่าน Props

function Parent() {
  // State อยู่ที่ Parent
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div>
      {/* ส่ง State และ Setter ลงไปทั้งคู่ */}
      <ItemList
        onSelect={setSelectedItem}
      />
      <ItemDetail
        item={selectedItem}
      />
    </div>
  )
}
```

---

### 🔄 React Data Flow — ข้อมูลไหลทางเดียว

```
Parent Component
      ↓ Props (ส่งลง)
Child Component
      ↓ Props (ส่งลงต่อ)
Grandchild Component

❌ ข้อมูลส่งขึ้นโดยตรงไม่ได้
✅ ส่งขึ้นได้ผ่าน Callback Function (State Lifting)
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — React เบื้องต้น ภาษาไทย**

[![React TH](https://img.youtube.com/vi/RVFAyFWO4go/0.jpg)](https://www.youtube.com/watch?v=RVFAyFWO4go)

🔗 [https://www.youtube.com/watch?v=RVFAyFWO4go](https://www.youtube.com/watch?v=RVFAyFWO4go)

> 💡 ดูเพื่อเข้าใจภาพรวม React และ Component ก่อน

---

**วิดีโอ 2 — React in 100 Seconds (Fireship — English)**

[![React Fireship](https://img.youtube.com/vi/Tn6-PIqc4UM/0.jpg)](https://www.youtube.com/watch?v=Tn6-PIqc4UM)

🔗 [https://www.youtube.com/watch?v=Tn6-PIqc4UM](https://www.youtube.com/watch?v=Tn6-PIqc4UM)

> 💡 ดูเพื่อ Concept ภาพรวม 2 นาที ก่อนลงมือ

---

**วิดีโอ 3 — useState & useEffect (Codevolution — English)**

[![useState](https://img.youtube.com/vi/O6P86uwfdR0/0.jpg)](https://www.youtube.com/watch?v=O6P86uwfdR0)

🔗 [https://www.youtube.com/watch?v=O6P86uwfdR0](https://www.youtube.com/watch?v=O6P86uwfdR0)

---

### 📖 Further Reading

-   🔗 [react.dev/learn](https://react.dev/learn) — React Official Docs (Quick Start เท่านั้น)
-   🔗 [react.dev/reference/react/useState](https://react.dev/reference/react/useState)

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` สำหรับโค้ด React 🏷️ **npm Commands: รันใน Terminal**

---

**Prompt 1 — สร้าง React Project และ Component แรก**

```
[Context] ฉันกำลังเรียน React เป็นครั้งแรก
[Task] ช่วย Step-by-step สร้าง React Project และ Component แรก
[Spec]
1. สร้าง Project ด้วย: npx create-vite@latest my-app -- --template react
2. อธิบาย Folder Structure ที่ได้
3. สร้าง Component ชื่อ ProfileCard รับ Props: name, role, bio, imageUrl
4. แสดง 3 Cards ใน App.jsx ด้วยข้อมูลต่างกัน
5. Style ด้วย CSS Module หรือ Inline Style
[Constraint] React + Vite เท่านั้น ยังไม่ใช้ Library อื่น
อธิบายทุกบรรทัดที่สำคัญด้วย Comment
```

---

**Prompt 2 — สร้าง Interactive Component ด้วย useState**

```
[Context] กำลังฝึก useState ใน React
[Task] สร้าง Todo List แบบ Interactive
[Spec]
State ที่ต้องมี:
- todos: Array ของ Todo Item (text, id, isDone)
- inputText: String ข้อความใน Input

Features:
- เพิ่ม Todo ใหม่เมื่อกด Enter หรือปุ่ม Add
- Toggle isDone เมื่อคลิกที่ Todo (ขีดฆ่า)
- ลบ Todo เมื่อกดปุ่ม Delete
- นับและแสดงจำนวน Todo ที่ยังไม่เสร็จ

[Constraint] ใช้ useState เท่านั้น ยังไม่ต้องใช้ useReducer
แสดงผลเป็น Artifact (React JSX)
```

---

**Prompt 3 — ฝึก State Lifting**

```
[Context] กำลังฝึก State Lifting และ Props ใน React
[Task] สร้าง Product Filter App
[Spec]
Components:
- App (Parent): เก็บ State: products[], selectedCategory
- FilterBar (Child): แสดงปุ่ม Filter รับ onFilter Callback
- ProductGrid (Child): รับ products Props แสดง Card
- ProductCard (Child): แสดงข้อมูลสินค้า 1 ชิ้น

Data Flow:
- FilterBar คลิก → ส่ง Category ขึ้นไป App ผ่าน onFilter
- App กรองข้อมูล → ส่ง products ที่กรองแล้วลง ProductGrid

[Constraint] ใช้ useState + Props เท่านั้น ไม่ใช้ Context หรือ Redux
อธิบาย Data Flow ด้วย Comment ในโค้ด
```

---

**Prompt ฉุกเฉิน — React ไม่ Re-render**

```
[Context] React Component ไม่ Re-render แม้ข้อมูลเปลี่ยน
[Task] ช่วย Debug ว่าทำไม UI ไม่อัพเดต
[Spec]
โค้ดที่มีปัญหา:
[วางโค้ดมา]
สิ่งที่ทำ: [อธิบาย]
สิ่งที่คาดหวัง: [อธิบาย]
สิ่งที่เกิดจริง: [อธิบาย]
[Constraint] อธิบายสาเหตุ ไม่ใช่แค่ให้โค้ดใหม่
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

| Filename | Dimension | รายละเอียด | แหล่งรูปฟรี |
| --- | --- | --- | --- |
| `public/profile-1.jpg` | 300 × 300 px | รูปโปรไฟล์ Card ที่ 1 | [unsplash.com](https://unsplash.com) |
| `public/profile-2.jpg` | 300 × 300 px | รูปโปรไฟล์ Card ที่ 2 | [unsplash.com](https://unsplash.com) |
| `public/profile-3.jpg` | 300 × 300 px | รูปโปรไฟล์ Card ที่ 3 | [unsplash.com](https://unsplash.com) |

> 💡 ใน React + Vite รูปที่วางใน `public/` สามารถเรียกได้ด้วย `/profile-1.jpg` โดยตรง ต่างจาก HTML ธรรมดาที่ต้องใช้ `images/profile-1.jpg`

---

### 🛠️ Workshop — "Todo App ด้วย React"

> 🏷️ **Module ที่ใช้:** `Claude Chat` สร้างโค้ด → `Terminal` รัน Project ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **ต้องมีก่อนเริ่ม:** Node.js พร้อม + VS Code พร้อม

**โจทย์ / Assignment:**

สร้าง Todo App ด้วย React ที่มี State Management ครบ และแบ่ง Component อย่างถูกต้อง

---

**Checkpoint ก่อนเริ่ม:**

```
# รันใน Terminal ก่อนเริ่ม
node --version    # ต้องขึ้น Version
npm --version     # ต้องขึ้น Version

# สร้าง Project ใหม่
npx create-vite@latest todo-app -- --template react
cd todo-app
npm install
npm run dev
# เปิด Browser ไป localhost:5173 ต้องเห็นหน้า React ✅
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat` Chaining 4 รอบ**

```
=== Iteration 1: Component Structure ===
[Context] สร้าง Todo App ด้วย React + Vite
[Task] ออกแบบ Component Structure และสร้าง Skeleton
[Spec]
Components ที่ต้องมี:
- App.jsx: Parent เก็บ State ทั้งหมด
- TodoInput.jsx: Input + ปุ่ม Add รับ onAdd Prop
- TodoList.jsx: รับ todos[] Prop แสดง TodoItem
- TodoItem.jsx: รับ todo, onToggle, onDelete Props
- TodoSummary.jsx: รับ todos[] แสดงสถิติ

สร้างแค่ Skeleton ก่อน แต่ละ Component Return Placeholder Text
[Constraint] React Functional Component เท่านั้น

=== Iteration 2: State + Logic ===
[Context] ต่อจาก Component Structure
[Task] เพิ่ม State และ Logic ทั้งหมดใน App.jsx
[Spec]
State:
- todos: [] (Array ของ { id, text, isDone, createdAt })
- inputText: "" (String)

Functions:
- addTodo(text): สร้าง Todo ใหม่ใส่ id แบบ Date.now()
- toggleTodo(id): สลับ isDone true/false
- deleteTodo(id): ลบ Todo ออกจาก Array

ส่ง State และ Functions ลง Child ผ่าน Props
[Constraint] ใช้ useState เท่านั้น

=== Iteration 3: UI + Styling ===
[Context] ต่อจาก Logic ที่มีอยู่
[Task] เพิ่ม UI ที่สมบูรณ์และ Style ให้สวยงาม
[Spec]
- TodoInput: Input + Button Add ข้างๆ กัน
- TodoItem: Checkbox + Text + Delete Button
  isDone = true → ขีดฆ่า Text + สีจาง
- TodoSummary: "เหลือ X งาน จาก Y งานทั้งหมด"
- Color Scheme: เลือกโทนสีที่ชอบ
- ใช้ CSS Module (TodoItem.module.css)
[Constraint] ทุก Component มีไฟล์ CSS Module ของตัวเอง

=== Iteration 4: Extra Features ===
[Context] ต่อจากโค้ดที่มีอยู่
[Task] เพิ่ม Features เพิ่มเติม
[Spec]
1. กด Enter ใน Input เพื่อ Add ได้
2. Filter: All / Active / Completed
3. Clear All Completed ปุ่มลบทุก Todo ที่เสร็จแล้ว
4. Empty State: ถ้าไม่มี Todo แสดงข้อความ "ยังไม่มีงาน เพิ่มงานแรกได้เลย!"
[Constraint] ไม่เพิ่ม Library ใหม่
```

---

**ขั้นตอนหลังได้โค้ดจาก Claude:**

```
1. Claude จะให้โค้ดแต่ละไฟล์แยกกัน
2. สร้างไฟล์ตามที่ Claude บอกใน src/components/
3. วางโค้ดแต่ละไฟล์ให้ถูกที่
4. npm run dev ดูผลลัพธ์
5. ทดสอบ Add, Toggle, Delete ทุก Feature
6. git add . → git commit -m "feat: todo app with react state"
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| แบ่ง Component ถูกต้องอย่างน้อย 4 ชิ้น | ดูใน src/components/ | โค้ดทั้งหมดอยู่ใน App.jsx |
| Add Todo ได้และแสดงทันที | UI อัพเดต Real-time | ต้อง Refresh ถึงจะเห็น |
| Toggle isDone ขีดฆ่า Text | Text มีเส้นขีดฆ่า | ไม่เปลี่ยน |
| Delete Todo ลบออกจาก List | Todo หายจาก List | Todo ยังอยู่ |
| Filter All/Active/Completed ทำงาน | แสดงถูกตาม Filter | Filter ไม่ทำงาน |
| Commit ขึ้น GitHub | มี Commit ใหม่ | ยังไม่ Commit |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| `Cannot find module` | Import Path ผิด | ตรวจสอบชื่อไฟล์และ Path |
| UI ไม่อัพเดตหลัง setState | Mutate State โดยตรง | ถาม Claude: "ทำไม setState แล้วไม่ Re-render?" |
| Each child should have unique key | ไม่มี key Prop ใน List | เพิ่ม key={item.id} ใน .map() |
| Too many re-renders | useEffect Loop | ตรวจ Dependency Array ของ useEffect |
| JSX ไม่ทำงาน | ไฟล์นามสกุลไม่ใช่ .jsx | เปลี่ยนนามสกุลไฟล์เป็น .jsx |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 8 ได้เลย!

---

---
