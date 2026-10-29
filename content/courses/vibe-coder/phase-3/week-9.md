---
title: "Data Modeling — ออกแบบโครงสร้างข้อมูลก่อนสร้าง"
hours: 3
---

## 📅 สัปดาห์ที่ 9 — Data Modeling — ออกแบบโครงสร้างข้อมูลก่อนสร้าง

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

ลองวาด Data Model ของ Todo App จากสัปดาห์ 7 บนกระดาษ:

```
Todo {
  id: ?
  text: ?
  isDone: ?
  createdAt: ?
}
```

**ถ้าบอกได้ว่าแต่ละ Field มี Type อะไร (string, boolean, number) = พร้อมแล้ว ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Data Model คืออะไร?**

ก่อนสร้างบ้าน สถาปนิกต้องวาด Blueprint ก่อน เพื่อรู้ว่าห้องไหนอยู่ตรงไหน ผนังหนาเท่าไหร่ Data Model ก็เหมือน Blueprint ของข้อมูล — วาดก่อนเขียนโค้ด ป้องกันปัญหาที่แก้ยากในภายหลัง

```
ถ้าไม่ออกแบบ Data ก่อน:
สร้างไปครึ่งทาง → ตระหนักว่า
"โอ้! ฉันลืมเก็บวันที่สร้าง" หรือ
"ความสัมพันธ์ User กับ Post ทำยังไงวะ?"
→ แก้ยากมาก บางทีต้องสร้างใหม่ทั้งหมด
```

---

### 🗃️ Data Types พื้นฐาน

```
// ประเภทข้อมูลที่ใช้บ่อยใน JavaScript / TypeScript

string   → ข้อความ        "สมชาย", "Bangkok", "2025-01-01"
number   → ตัวเลข         42, 3.14, -10
boolean  → จริง/เท็จ      true, false
Date     → วันเวลา        new Date()
null     → ไม่มีค่า       null
undefined→ ยังไม่กำหนด   undefined

// ประเภทซับซ้อน
Array    → รายการ         [1, 2, 3], ["a", "b"]
Object   → กลุ่มข้อมูล   { id: 1, name: "สมชาย" }
```

---

### 🔗 ความสัมพันธ์ระหว่างข้อมูล — 3 แบบ

**1\. One-to-One (หนึ่งต่อหนึ่ง)**

```
User ←→ Profile
1 User มีแค่ 1 Profile
1 Profile เป็นของแค่ 1 User

User {
  id: number
  email: string
  profileId: number   ← เชื่อมกับ Profile
}

Profile {
  id: number
  userId: number      ← เชื่อมกลับไป User
  bio: string
  avatar: string
}
```

**2\. One-to-Many (หนึ่งต่อหลาย) — ใช้บ่อยที่สุด**

```
User → Posts
1 User มีได้หลาย Post
1 Post เป็นของแค่ 1 User

User {
  id: number
  name: string
}

Post {
  id: number
  userId: number    ← Foreign Key เชื่อมกลับ User
  title: string
  content: string
  createdAt: Date
}
```

**3\. Many-to-Many (หลายต่อหลาย)**

```
Student ←→ Course
1 Student เรียนได้หลาย Course
1 Course มีได้หลาย Student

Student { id, name }
Course  { id, title }

StudentCourse {   ← Junction Table เชื่อมกลาง
  studentId: number
  courseId: number
  enrolledAt: Date
}
```

---

### 📐 วิธีออกแบบ Data Model — 5 ขั้นตอน

```
ขั้นที่ 1: ระบุ Entity (สิ่งที่ต้องเก็บข้อมูล)
→ "App ของฉันมีอะไร?" เช่น User, Product, Order, Review

ขั้นที่ 2: กำหนด Fields ของแต่ละ Entity
→ "แต่ละชิ้นมีข้อมูลอะไร?" พร้อม Type

ขั้นที่ 3: ระบุความสัมพันธ์
→ "ชิ้นไหนเชื่อมกับชิ้นไหน?" One-to-One / One-to-Many / Many-to-Many

ขั้นที่ 4: หา Fields ที่จำเป็น
→ "ต้องมี id, createdAt, updatedAt ไหม?"

ขั้นที่ 5: ตั้งคำถาม Validation
→ "Field ไหน Required? มี Default Value ไหม? มี Unique ไหม?"
```

---

### 🗺️ ตัวอย่าง Data Model จริง — E-commerce App

```
User {
  id: number (Primary Key, Auto Increment)
  email: string (Unique, Required)
  passwordHash: string (Required)
  name: string (Required)
  createdAt: Date (Default: now)
}

Product {
  id: number
  name: string (Required)
  description: string
  price: number (Required, Min: 0)
  imageUrl: string
  stock: number (Default: 0)
  categoryId: number (Foreign Key → Category)
}

Category {
  id: number
  name: string (Unique)
}

Order {
  id: number
  userId: number (Foreign Key → User)
  totalPrice: number
  status: "pending" | "paid" | "shipped" | "delivered"
  createdAt: Date
}

OrderItem {    ← Junction ระหว่าง Order กับ Product
  orderId: number
  productId: number
  quantity: number
  priceAtTime: number   ← เก็บราคา ณ เวลานั้น (ราคาอาจเปลี่ยน)
}
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Database Design พื้นฐาน ภาษาไทย**

[![DB Design TH](https://img.youtube.com/vi/ztHopE5Wnpc/0.jpg)](https://www.youtube.com/watch?v=ztHopE5Wnpc)

🔗 [https://www.youtube.com/watch?v=ztHopE5Wnpc](https://www.youtube.com/watch?v=ztHopE5Wnpc)

---

**วิดีโอ 2 — Entity Relationship Diagram (Lucidchart — English)**

[![ERD](https://img.youtube.com/vi/QpdhBUYk7Kk/0.jpg)](https://www.youtube.com/watch?v=QpdhBUYk7Kk)

🔗 [https://www.youtube.com/watch?v=QpdhBUYk7Kk](https://www.youtube.com/watch?v=QpdhBUYk7Kk)

> 💡 ดูช่วง 0:00–10:00 เพื่อเข้าใจการวาด ERD

---

### 📖 Further Reading

-   🔗 [dbdiagram.io](https://dbdiagram.io) — วาด ERD ออนไลน์ฟรี
-   🔗 [drawsql.app](https://drawsql.app) — อีกตัวเลือกสำหรับวาด Database Schema

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` ทั้งหมด

---

**Prompt 1 — ให้ Claude ช่วยออกแบบ Data Model**

```
[Context] ฉันกำลังจะสร้าง [ชื่อ App]
App นี้ทำอะไร: [อธิบายสั้นๆ]
ผู้ใช้ทำอะไรได้บ้าง: [List Feature]

[Task] ช่วยออกแบบ Data Model ให้
[Spec]
- ระบุ Entity ทั้งหมด
- กำหนด Fields พร้อม Type และ Constraint (Required/Optional/Unique)
- วาดความสัมพันธ์แบบ ASCII Diagram
- ระบุว่า Relationship ไหนเป็น One-to-Many หรือ Many-to-Many

[Constraint] อธิบายว่าทำไมถึงออกแบบแบบนี้
            และบอกสิ่งที่อาจต้องเพิ่มในอนาคต
```

---

**Prompt 2 — ตรวจสอบ Data Model ก่อนสร้าง**

```
[Context] ฉันออกแบบ Data Model นี้สำหรับ [ชื่อ App]
[Data Model ที่ออกแบบ]:
[วาง Model ที่ออกแบบมา]

[Task] ช่วย Review Data Model นี้
[Spec] ตรวจสอบ:
- มี Edge Case ที่ Model นี้รับมือไม่ได้ไหม?
- มี Field ที่ควรเพิ่มแต่ลืมไหม?
- Relationship ถูกต้องไหม?
- มีปัญหา Performance ที่คาดได้ล่วงหน้าไหม?
[Constraint] บอกทั้ง Strong Points และ Weak Points
```

---

**Prompt 3 — แปลง Data Model เป็น TypeScript Types**

```
[Context] มี Data Model นี้แล้ว
[Task] แปลงเป็น TypeScript Interface
[Spec]
[วาง Data Model]
- สร้าง Interface สำหรับทุก Entity
- ใช้ Optional Fields (?) สำหรับ Fields ที่ไม่ Required
- สร้าง Type สำหรับ Status Enum ถ้ามี
[Constraint] TypeScript เท่านั้น ไม่ใช้ Library
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

> 💡 สัปดาห์นี้เน้น Logic และ Design ไม่ต้องใช้รูปภาพ

---

### 🛠️ Workshop — "ออกแบบ Data Model สำหรับ Budget Tracker"

> 🏷️ **Module ที่ใช้:** `Claude Chat` ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง

**โจทย์ / Assignment:**

ออกแบบ Data Model สำหรับ Personal Budget Tracker App แล้วสร้าง React App ที่ใช้ Model นั้นจริงๆ

**Features ของ Budget Tracker:**

-   บันทึก Income (รายรับ) และ Expense (รายจ่าย)
-   แบ่งหมวดหมู่ เช่น อาหาร, เดินทาง, ช็อปปิ้ง
-   ดูยอดคงเหลือรวม
-   ดูสรุปรายเดือน
-   ค้นหาและกรองรายการ

---

**Checkpoint ก่อนเริ่ม:**

```
✅ เปิดกระดาษหรือ Notepad เพื่อวาด Data Model ก่อน
✅ ลองตอบคำถาม: App นี้มี Entity อะไรบ้าง?
✅ เปิด claude.ai พร้อม
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat`**

```
=== Step 1: ออกแบบ Data Model ===
[Context] ฉันจะสร้าง Personal Budget Tracker App
Features:
- บันทึก Income และ Expense
- แบ่ง Category
- ดูยอดคงเหลือรวม
- ดูสรุปรายเดือน
- ค้นหาและกรองรายการ

[Task] ช่วยออกแบบ Data Model ที่เหมาะสม
[Spec]
- ระบุทุก Entity พร้อม Fields และ Type
- วาด Relationship Diagram แบบ Text
- อธิบาย Reasoning ว่าทำไมถึงออกแบบแบบนี้
[Constraint] ออกแบบให้ขยายได้ในอนาคต
             อธิบาย Trade-off ของแต่ละ Decision

=== Step 2: สร้าง TypeScript Types ===
[Context] ต่อจาก Data Model ที่ออกแบบแล้ว
[Task] แปลง Data Model เป็น TypeScript Interface
[Spec]
- Interface สำหรับทุก Entity
- Type สำหรับ Category Enum
- Type สำหรับ Transaction Type (income/expense)
- Helper Type: Summary, MonthlyReport
[Constraint] ไม่ใช้ Library ใดๆ

=== Step 3: สร้าง Mock Data ===
[Context] ต่อจาก TypeScript Types
[Task] สร้าง Mock Data ตาม Model ที่ออกแบบ
[Spec]
- transactions: 10 รายการ ทั้ง Income และ Expense
- categories: 6 หมวดหมู่ พร้อม Icon Emoji
- ข้อมูลครอบคลุมอย่างน้อย 2 เดือน
[Constraint] ข้อมูลต้องสมจริง ใช้ Date จริงๆ

=== Step 4: สร้าง React App ===
[Context] ต่อจาก Mock Data
[Task] สร้าง Budget Tracker UI ด้วย React
[Spec]
Components:
- SummaryCard: แสดง Balance, Total Income, Total Expense
- TransactionList: รายการ Transaction ทั้งหมด
- TransactionItem: 1 Transaction พร้อม Category Icon
- FilterBar: Filter ตาม Type และ Category
- MonthlyChart: Bar Chart แสดงสรุปรายเดือน
  (ใช้ Recharts หรือ Chart.js)
[Constraint] ใช้ Mock Data ก่อน ยังไม่ต้องเชื่อม Backend
```

---

**ขั้นตอน Commit:**

```
git add .
git commit -m "feat: budget tracker with data model"
git push
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| มี TypeScript Interface ครบทุก Entity | ดูในไฟล์ types.ts | ไม่มี TypeScript |
| Data Model รองรับทุก Feature ที่กำหนด | อธิบายได้ว่า Field ไหนรองรับอะไร | บางสิ่งเก็บไม่ได้ |
| Balance คำนวณถูกต้อง (Income - Expense) | ตัวเลขตรง | ตัวเลขผิด |
| Filter ตาม Category ทำงาน | แสดงถูกตาม Filter | Filter พัง |
| Chart แสดงข้อมูลสรุปรายเดือน | Chart แสดงผล | ไม่มี Chart |
| Commit ขึ้น GitHub | มี Commit ใหม่ | ยังไม่ Commit |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| TypeScript Type Error | Field ไม่ตรงกับ Interface | ตรวจสอบ Interface vs ข้อมูลจริง |
| NaN ในการคำนวณ | String ไม่ได้แปลงเป็น Number | ใช้ `parseFloat()` หรือ `Number()` |
| Chart ไม่แสดง | Data Format ผิด | ถาม Claude: "Recharts Data Format ที่ถูกต้อง" |
| Date เรียงลำดับผิด | Sort String แทน Date | ใช้ `new Date(a) - new Date(b)` ใน Sort |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 10 ได้เลย!

---

---
