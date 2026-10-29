---
title: "Testing & Debugging — หา Bug ได้เอง แก้ได้เอง"
hours: 3
---

## 📅 สัปดาห์ที่ 10 — Testing & Debugging — หา Bug ได้เอง แก้ได้เอง

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Budget Tracker จากสัปดาห์ 9 ใน Chrome กด F12 แล้วพิมพ์ใน Console:

```
console.log("DevTools ทำงานได้แล้ว ✅")
```

**ถ้าเห็นข้อความใน Console = พร้อมแล้ว ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Debugging คืออะไร?**

"Bug" มาจากเรื่องจริงในปี 1947 ที่มีแมลงไปติดอยู่ในคอมพิวเตอร์แล้วทำให้มันพัง Debugging จึงหมายถึง "การกำจัดแมลงออกจากโค้ด" หรือ "การค้นหาและแก้ไขข้อผิดพลาด"

```
มือใหม่เจอ Bug:
😱 "โค้ดพัง ไม่รู้ทำไม" → เพิ่งทิ้งทุกอย่าง

Vibe Coder ที่ Debug เป็น:
🔍 อ่าน Error Message → เข้าใจปัญหา →
   หาสาเหตุอย่างเป็นระบบ → แก้ไข ✅
```

---

### 🔧 Chrome DevTools — เครื่องมือ Debug หลัก

**แท็บที่ต้องรู้จัก:**

```
F12 เปิด DevTools แล้วจะเห็น:

Console Tab:
→ ดู Error Message และ console.log()
→ รัน JavaScript ชั่วคราวได้

Elements Tab:
→ ดู HTML Structure จริงๆ ที่ Browser เห็น
→ แก้ CSS ชั่วคราวเพื่อทดสอบ

Network Tab:
→ ดู API Request/Response ทั้งหมด
→ ตรวจว่า API ส่งข้อมูลอะไรมา

Sources Tab:
→ ตั้ง Breakpoint หยุดโค้ดเพื่อตรวจ State
→ Step through โค้ดทีละบรรทัด
```

---

### 🔍 Debugging Workflow — ทำตามขั้นตอนนี้เสมอ

```
Step 1: อ่าน Error Message ให้ครบ
        อย่าข้ามไปหา Solution ทันที

Step 2: ระบุว่า Error อยู่ที่ไหน
        Error บอก File และ Line Number เสมอ

Step 3: Reproduce ปัญหาให้ได้
        "ทำอะไรแล้วถึงพัง?" ต้องทำซ้ำได้

Step 4: เพิ่ม console.log() เพื่อตรวจ
        ดูว่าตัวแปรมีค่าอะไรตรงจุดที่สงสัย

Step 5: สร้าง Hypothesis แล้วทดสอบ
        "คิดว่าน่าจะเพราะ..." แล้วแก้ดูทีละจุด

Step 6: ถ้ายังแก้ไม่ได้ ถาม Claude
        Copy Error + Code + อาการมาครบ
```

---

### 🐛 Error Types ที่เจอบ่อย

**1\. SyntaxError — โค้ดเขียนผิด**

```
// ❌ ลืมปิด bracket
const user = {
  name: "สมชาย"
  age: 25        // ← ลืม comma

// ✅ แก้แล้ว
const user = {
  name: "สมชาย",
  age: 25
}
```

**2\. ReferenceError — ใช้ตัวแปรที่ไม่มี**

```
// ❌
console.log(userName)   // userName ไม่ได้ประกาศ

// ✅
const userName = "สมชาย"
console.log(userName)
```

**3\. TypeError — ใช้ Method กับ Type ที่ไม่รองรับ**

```
// ❌
const users = null
users.map(u => u.name)   // Cannot read property 'map' of null

// ✅ ตรวจก่อนใช้
const users = null
users?.map(u => u.name)  // Optional Chaining — ถ้า null จะ Return undefined
```

**4\. Network Error — API ล้มเหลว**

```
// ดู Network Tab ใน DevTools:
// Status 200 = สำเร็จ ✅
// Status 404 = ไม่พบ Resource
// Status 401 = Unauthorized (API Key ผิด)
// Status 500 = Server Error
// Status 0   = No Network / CORS Error
```

---

### 🧪 Testing ประเภทต่างๆ ที่ควรรู้

```
Manual Testing (ทดสอบมือ):
→ คลิกทดสอบ Feature ทุกอย่างด้วยตัวเอง
→ ทดสอบ Edge Cases: ข้อมูลว่าง, ตัวอักษรพิเศษ, ตัวเลขลบ

Browser Testing:
→ Chrome, Firefox, Safari, Edge
→ ผลลัพธ์อาจต่างกันในแต่ละ Browser

Responsive Testing:
→ ใช้ DevTools หรือ BrowserStack
→ ทดสอบ iPhone SE (375px) เสมอ — เล็กสุดในชีวิตจริง

Console Testing:
→ รัน Function โดยตรงใน Console
→ ตรวจผลลัพธ์โดยไม่ต้องผ่าน UI
```

---

### 📝 Console.log อย่างมีประสิทธิภาพ

```
// แบบธรรมดา (บอกแค่ว่าเกิดอะไร)
console.log(user)

// แบบที่ดีกว่า (บอกด้วยว่าอยู่ตรงไหน)
console.log("=== UserCard: user data ===", user)

// ดูหลายค่าพร้อมกัน
console.log({ userId, userName, isLoading, error })

// วัดเวลา
console.time("fetchData")
await fetchData()
console.timeEnd("fetchData")  // fetchData: 245ms

// Stack Trace
console.trace("ฟังก์ชันนี้ถูกเรียกจากที่ไหน?")

// ✅ ลบ console.log ทั้งหมดก่อน Deploy
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Chrome DevTools สำหรับมือใหม่ (ภาษาไทย)**

[![DevTools TH](https://img.youtube.com/vi/gTVpBbFWry8/0.jpg)](https://www.youtube.com/watch?v=gTVpBbFWry8)

🔗 [https://www.youtube.com/watch?v=gTVpBbFWry8](https://www.youtube.com/watch?v=gTVpBbFWry8)

---

**วิดีโอ 2 — Debugging JavaScript (Fireship — English)**

[![Debug Fireship](https://img.youtube.com/vi/AX7uybwukkk/0.jpg)](https://www.youtube.com/watch?v=AX7uybwukkk)

🔗 [https://www.youtube.com/watch?v=AX7uybwukkk](https://www.youtube.com/watch?v=AX7uybwukkk)

> 💡 ดูเพื่อเรียนรู้เทคนิค Debug ที่ Professional ใช้

---

### 📖 Further Reading

-   🔗 [developer.chrome.com/docs/devtools](https://developer.chrome.com/docs/devtools) — Chrome DevTools Official Guide

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` ทั้งหมด

---

**Prompt 1 — Debug อย่างเป็นระบบ**

```
[Context] มีปัญหาใน React App
[Task] ช่วย Debug อย่างเป็นระบบ
[Spec]
Error Message จาก Console:
[Copy Error Message มาวาง]

โค้ดที่เกี่ยวข้อง:
[วางโค้ดส่วนที่สงสัย]

สิ่งที่ทำก่อนเจอ Error: [อธิบาย]
สิ่งที่ควรเกิด: [อธิบาย]
สิ่งที่เกิดจริง: [อธิบาย]

[Constraint]
1. อธิบายสาเหตุของ Error ก่อน
2. บอก console.log ที่ควรเพิ่มเพื่อตรวจสอบ
3. แล้วค่อยบอก Solution
```

---

**Prompt 2 — สร้าง Edge Case Test List**

```
[Context] ฉันสร้าง [ชื่อ App / Feature] เสร็จแล้ว
[Task] ช่วยสร้าง Manual Test Checklist
[Spec]
Feature ที่สร้าง: [อธิบาย]
[Constraint]
- รวม Happy Path (ทุกอย่างถูกต้อง)
- รวม Edge Cases (ข้อมูลขอบเขต)
- รวม Error Cases (ข้อมูลผิดพลาด)
- เรียงจาก Critical ที่สุดก่อน
```

---

**Prompt ฉุกเฉิน — Bug แก้ไม่ได้สักที**

```
[Context] ฉันพยายาม Debug มาแล้ว [X] นาที แต่ยังแก้ไม่ได้
[Task] ช่วย Debug แบบ Step-by-step
[Spec]
1. Error: [Copy Error มา]
2. โค้ดที่สงสัย: [วางโค้ด]
3. สิ่งที่ลองแล้ว: [บอกว่าลองอะไรไปแล้วบ้าง]
4. ผลลัพธ์ Console.log: [วางผลลัพธ์]
[Constraint]
- อย่าเพิ่ง Fix ให้ — ช่วยฉัน Understand ก่อน
- ถามคำถามนำถ้าข้อมูลไม่พอ
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

> 💡 สัปดาห์นี้เน้น Debug และ Test ไม่ต้องใช้รูปภาพใหม่

---

### 🛠️ Workshop — "Debug Challenge + Final Polish"

> 🏷️ **Module ที่ใช้:** `Claude Chat` + Chrome DevTools ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **ต้องมีก่อนเริ่ม:** Budget Tracker จากสัปดาห์ 9 พร้อม

**โจทย์ / Assignment:**

เพิ่ม Feature สุดท้ายให้ Budget Tracker พร้อมทดสอบ Edge Cases ทั้งหมดก่อน Commit

---

**Checkpoint ก่อนเริ่ม:**

```
✅ เปิด Budget Tracker ใน Chrome
✅ เปิด DevTools (F12) ค้างไว้
✅ เปิด Network Tab ค้างไว้
✅ เตรียม Test Cases ที่จะทดสอบ
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat`**

```
=== Prompt 1: เพิ่ม Form เพิ่ม Transaction ===
[Context] ต่อจาก Budget Tracker ที่มีอยู่
[Task] เพิ่ม Form สำหรับเพิ่ม Transaction ใหม่
[Spec]
Fields:
- Type: Income หรือ Expense (Radio หรือ Toggle)
- Amount: ตัวเลข ต้องมากกว่า 0
- Category: Dropdown จาก Categories ที่มี
- Description: ข้อความสั้นๆ (Optional)
- Date: Date Picker Default เป็นวันนี้

Validation:
- Amount ต้องเป็นตัวเลขที่มากกว่า 0
- Category ต้อง Select
- ถ้า Validation ไม่ผ่านแสดง Error Message ใต้ Field
- ถ้าสำเร็จแสดง Success Toast และ Reset Form
[Constraint] ไม่ใช้ Form Library เช่น React Hook Form

=== Prompt 2: สร้าง Test Checklist ===
[Context] Budget Tracker ใกล้เสร็จแล้ว
[Task] สร้าง Manual Test Checklist ครบถ้วน
[Spec]
ครอบคลุม:
- Happy Path: เพิ่ม/ดู/กรอง Transaction ปกติ
- Edge Cases: Amount = 0, Amount ติดลบ, Description ยาวมาก
- Error Cases: ค่าว่าง, Type ไม่ถูกต้อง
- UI Cases: Mobile 375px, Responsive ทุก Breakpoint
[Constraint] เรียง Priority Critical → High → Medium → Low

=== Prompt 3: Debug และ Fix ===
[Context] ทดสอบตาม Checklist แล้วพบปัญหา
[Task] ช่วย Debug และ Fix ทุก Issue ที่พบ
[Spec]
Issue ที่พบ: [บอกทุก Issue จาก Checklist]
[Constraint]
- Fix ทีละ Issue อย่าแก้รวมกัน
- อธิบายสาเหตุของแต่ละ Issue
- ทดสอบซ้ำหลัง Fix ทุกครั้ง
```

---

**ขั้นตอน Final Commit:**

```
# ลบ console.log ทั้งหมดก่อน Commit
# ตรวจสอบ .env ไม่ได้ถูก Track โดย Git

git add .
git commit -m "feat: add transaction form + manual testing complete"
git push
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| Form Validation ทุก Field ทำงาน | Error Message แสดงถูกที่ | Validation ไม่ทำงาน |
| เพิ่ม Transaction แล้ว Balance อัพเดตทันที | ตัวเลขถูกต้อง Real-time | ต้อง Refresh |
| ทดสอบ Edge Cases ผ่านทั้งหมด | Checklist ผ่านทุกข้อ | ยังมี Bug |
| ไม่มี console.log ใน Code | ดูใน Source ไม่เห็น | ยังมี console.log เหลือ |
| App ทำงานได้บน Mobile 375px | ไม่มี Layout แตก | Layout พัง |
| Commit ขึ้น GitHub พร้อม | มี Commit ใหม่ | ยังไม่ Commit |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| Form ไม่ Reset หลัง Submit | ลืม Reset State | ตั้งค่า State กลับเป็น Default หลัง Submit |
| Balance คำนวณผิด | ลืม parseFloat() | ถาม Claude: "Amount คำนวณแล้วได้ NaN" |
| Toast ไม่หาย | ไม่ได้ตั้ง setTimeout | ถาม Claude: "Toast แสดงแล้วไม่หาย" |
| Date Format ผิด | Timezone ต่างกัน | ใช้ `toLocaleDateString('th-TH')` |

---

> 🎯 ผ่านทุกข้อ → **Phase 3 เสร็จสมบูรณ์!** พร้อมเข้า Phase 4

---

## 🏁 Phase 3 Summary — สิ่งที่ได้เรียนรู้ทั้งหมด

```
✅ สร้าง React Component แบบ Functional ได้
✅ ใช้ useState จัดการ State และ Re-render ได้
✅ ส่ง Props ระหว่าง Component และทำ State Lifting ได้
✅ ใช้ useEffect ดึงข้อมูลจาก API ตอน Mount ได้
✅ จัดการ 3 State: data, isLoading, error ครบ
✅ ใช้ async/await กับ try/catch อย่างถูกต้อง
✅ ซ่อน API Key ด้วย .env + VITE_ Prefix ได้
✅ ออกแบบ Data Model ก่อนเขียนโค้ดเสมอ
✅ เข้าใจ Relationship: One-to-Many, Many-to-Many
✅ ใช้ Chrome DevTools Console, Network, Sources Tab ได้
✅ Debug ได้อย่างเป็นระบบ 6 ขั้นตอน
✅ ทดสอบ Edge Cases และ Error Cases ก่อน Deploy
✅ ลบ console.log ก่อน Commit เสมอ
```

**Deliverables (ชิ้นงาน) จาก Phase 3:**

-   ✅ **Todo App** — React Component + useState + State Lifting (สัปดาห์ 7)
-   🌤️ **Weather App** — API Fetch + .env + Loading/Error State (สัปดาห์ 8)
-   💰 **Budget Tracker** — Data Model + TypeScript Types + Chart (สัปดาห์ 9)
-   🐛 **Budget Tracker สมบูรณ์** — Form + Validation + Tested (สัปดาห์ 10)

---

> ⏭️ **Phase 4 ถัดไป:** ข้อมูล + Backend + Security — Firebase, Supabase, Serverless Functions และ API Security
