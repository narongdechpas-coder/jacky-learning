---
title: "Google Sheets + SheetDB — Spreadsheet เป็น Database ง่ายๆ"
hours: 3
---

## 📅 สัปดาห์ที่ 16 — Google Sheets + SheetDB — Spreadsheet เป็น Database ง่ายๆ

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Browser ไปที่ URL นี้:

```
https://sheetdb.io/demo
```

**ถ้าเห็นหน้า Demo ของ SheetDB = พร้อมแล้ว ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**ทำไมต้องใช้ Google Sheets เป็น Database?**

บางโปรเจกต์ไม่จำเป็นต้องมี Firebase หรือ Supabase ก็ได้ เช่น:

-   เก็บรายการสินค้าที่ทีมแก้ไขได้เองจาก Spreadsheet
-   แบบสอบถามที่ส่งข้อมูลลง Sheet อัตโนมัติ
-   ข้อมูลที่ต้องให้คนที่ไม่ใช่ Dev แก้ไขได้ง่ายๆ

```
ข้อดี:
✅ ทีมแก้ข้อมูลใน Sheet ได้เลย ไม่ต้องรู้โค้ด
✅ Setup เร็วมาก ไม่ต้องสร้าง DB Schema
✅ Export เป็น Excel / CSV ได้ทันที
✅ ฟรีทั้งหมด

ข้อเสีย:
❌ ไม่เหมาะกับข้อมูลที่ซับซ้อน
❌ ไม่มี Auth / Security แบบ DB จริง
❌ Concurrent Write อาจมีปัญหา
```

**SheetDB คืออะไร?**

SheetDB คือ Service ที่แปลง Google Sheet ให้กลายเป็น REST API ในคลิกเดียว เราแค่ให้ URL ของ Sheet แล้ว SheetDB จะสร้าง Endpoint ให้เรา GET / POST / PUT / DELETE ข้อมูลได้เลย

---

### 🔧 Google Sheets API — 2 วิธีต่อ

**วิธีที่ 1: SheetDB (แนะนำสำหรับ Vibe Coder)**

```
ข้อดี: ไม่ต้องตั้งค่า Google Cloud เลย
ข้อเสีย: Free Tier มี 500 Requests/เดือน

ขั้นตอน:
1. สร้าง Google Sheet + ตั้งชื่อ Column บน Row แรก
2. ไปที่ sheetdb.io → Create API
3. วาง URL ของ Google Sheet
4. ได้ Endpoint เช่น: https://sheetdb.io/api/v1/abc123
5. ใช้ Endpoint นี้แทน Database API ได้เลย
```

**วิธีที่ 2: Google Sheets API (Official)**

```
ข้อดี: ไม่มี Limit, ควบคุมได้เต็มที่
ข้อเสีย: ต้องตั้งค่า Google Cloud + OAuth ซับซ้อนกว่า

ใช้เมื่อ:
→ ต้องการ Requests มากกว่า 500/เดือน
→ ต้องการ Security ระดับ Enterprise
→ ต้องการ Feature พิเศษเช่น Format Cells
```

---

### 📝 SheetDB CRUD Operations

```
const SHEETDB_URL = import.meta.env.VITE_SHEETDB_URL
// เช่น: https://sheetdb.io/api/v1/abc123def456

// ─── READ ALL ─────────────────────────────────────
const getAll = async () => {
  const res = await fetch(SHEETDB_URL)
  return res.json()
  // Return: Array ของ Row เป็น Object
  // [{ name: "สมชาย", email: "a@b.com", age: "25" }, ...]
  // หมายเหตุ: ทุก Field เป็น String แม้จะพิมพ์ตัวเลขใน Sheet
}

// ─── READ WITH FILTER ──────────────────────────────
const getByField = async (field, value) => {
  const res = await fetch(`${SHEETDB_URL}/search?${field}=${value}`)
  return res.json()
}

// ─── CREATE ───────────────────────────────────────
const create = async (data) => {
  const res = await fetch(SHEETDB_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data })
    // data คือ Object ที่มี Keys ตรงกับ Column Headers
  })
  return res.json()
}

// ─── UPDATE ───────────────────────────────────────
const update = async (column, value, newData) => {
  // อัพเดต Row ที่ column มีค่าเท่ากับ value
  const res = await fetch(`${SHEETDB_URL}/${column}/${value}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: newData })
  })
  return res.json()
}

// ─── DELETE ───────────────────────────────────────
const remove = async (column, value) => {
  const res = await fetch(`${SHEETDB_URL}/${column}/${value}`, {
    method: 'DELETE'
  })
  return res.json()
}
```

**ข้อควรระวังเรื่อง Type:**

```
// Google Sheets เก็บทุกอย่างเป็น String!
// ต้องแปลงประเภทข้อมูลเองหลังดึงมา

const rows = await getAll()
const items = rows.map(row => ({
  ...row,
  price: parseFloat(row.price),   // String → Number
  quantity: parseInt(row.quantity),
  isActive: row.isActive === 'TRUE', // String → Boolean
  createdAt: new Date(row.createdAt), // String → Date
}))
```

---

### 📊 ออกแบบ Google Sheet สำหรับใช้เป็น Database

**กฎสำคัญ:**

```
Row 1: ชื่อ Column (Header) เท่านั้น — ห้ามว่าง
Row 2+: ข้อมูลจริง

ชื่อ Column ที่ดี:
✅ id, name, email, price, createdAt
❌ ชื่อ/Name, ราคา (บาท), Date Created

ห้ามมีแถวว่างกลางตาราง
ห้าม Merge Cell
ห้ามมี Formula ใน Column ที่จะ Write ผ่าน API
```

**ตัวอย่าง Sheet สำหรับ Product Catalog:**

```
| id  | name         | price | category | stock | imageUrl          |
|-----|-------------|-------|----------|-------|-------------------|
| 001 | กาแฟดำ      | 45    | beverage | 100   | https://...       |
| 002 | ชาเขียว     | 40    | beverage | 80    | https://...       |
| 003 | เค้กช็อกโกแลต| 120  | dessert  | 20    | https://...       |
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Google Sheets เป็น Database ภาษาไทย**

[![Sheets DB TH](https://img.youtube.com/vi/K6Vcfm7TA5U/0.jpg)](https://www.youtube.com/watch?v=K6Vcfm7TA5U)

🔗 [https://www.youtube.com/watch?v=K6Vcfm7TA5U](https://www.youtube.com/watch?v=K6Vcfm7TA5U)

---

**วิดีโอ 2 — SheetDB Tutorial (English)**

[![SheetDB](https://img.youtube.com/vi/OlthIm6e5u4/0.jpg)](https://www.youtube.com/watch?v=OlthIm6e5u4)

🔗 [https://www.youtube.com/watch?v=OlthIm6e5u4](https://www.youtube.com/watch?v=OlthIm6e5u4)

> 💡 ดูเพื่อเห็นการตั้งค่า SheetDB ตั้งแต่ต้น

---

### 📖 Further Reading

-   🔗 [sheetdb.io/docs](https://sheetdb.io/docs) — SheetDB Official Docs
-   🔗 [developers.google.com/sheets](https://developers.google.com/sheets/api/guides/concepts) — Google Sheets API Official

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` 🏷️ **SheetDB URL: เก็บใน .env VITE\_SHEETDB\_URL**

---

**Prompt 1 — ต่อ App กับ SheetDB**

```
[Context] ฉันมี Google Sheet ที่มี Column: [ชื่อ Columns ทั้งหมด]
SheetDB Endpoint: ดึงจาก import.meta.env.VITE_SHEETDB_URL
[Task] สร้าง React App แสดงข้อมูลจาก Sheet
[Spec]
- Custom Hook useSheet(): ดึงข้อมูลจาก SheetDB
- แปลง Type หลังดึงข้อมูล (String → Number/Boolean/Date ตามความเหมาะสม)
- แสดงเป็น [Table / Card Grid / List] พร้อม Search
- Add Form: เพิ่มข้อมูลใหม่ลง Sheet จริง
[Constraint] Handle Error ถ้า SheetDB ล่มหรือเกิน Rate Limit
อธิบาย Type Conversion ที่ต้องทำด้วย
```

---

**Prompt 2 — Sync ข้อมูลระหว่าง Sheet และ App**

```
[Context] ทีมแก้ข้อมูลใน Google Sheet โดยตรง
ต้องการให้ App แสดงข้อมูลล่าสุดเสมอ
[Task] สร้าง Auto-sync ระหว่าง Sheet และ App
[Spec]
- Polling ทุก 30 วินาที (เรียก SheetDB ซ้ำ)
- เปรียบเทียบข้อมูลใหม่กับเก่า
- ถ้าเปลี่ยนแปลงแสดง Toast "มีข้อมูลใหม่ กด Refresh"
- Manual Refresh ปุ่ม
[Constraint] อธิบาย Tradeoff ระหว่าง Polling vs Webhook
```

---

**Prompt ฉุกเฉิน — SheetDB Return ข้อมูลผิด**

```
[Context] SheetDB Return ข้อมูลไม่ตรงกับใน Sheet
[Task] ช่วย Debug ว่าปัญหาอยู่ที่ไหน
[Spec]
ข้อมูลใน Sheet: [บอกโครงสร้าง]
ข้อมูลที่ได้จาก API: [Copy JSON Response มา]
สิ่งที่คาดหวัง: [อธิบาย]
[Constraint] ตรวจ Type Conversion และ Column Name ด้วย
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

| Filename | Dimension | รายละเอียด | แหล่งรูปฟรี |
| --- | --- | --- | --- |
| `public/product-placeholder.jpg` | 300 × 300 px | Placeholder สำหรับสินค้าที่ไม่มีรูป | [unsplash.com](https://unsplash.com) |

---

### 🛠️ Workshop — "Product Catalog จาก Google Sheet"

> 🏷️ **Module ที่ใช้:** `Claude Chat` ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **ต้องมีก่อนเริ่ม:** Google Account + สมัคร SheetDB ฟรี

**โจทย์ / Assignment:**

สร้าง Product Catalog ที่ดึงข้อมูลจาก Google Sheet ผ่าน SheetDB ทีมสามารถแก้ไขสินค้าใน Sheet ได้โดยตรงแล้ว App จะอัพเดตตามอัตโนมัติ

---

**Checkpoint ก่อนเริ่ม:**

```
1. สร้าง Google Sheet ใหม่ ตั้งชื่อ Column:
   id | name | description | price | category | imageUrl | stock | isActive
2. ใส่ข้อมูลตัวอย่าง 5–10 แถว (isActive ใส่ TRUE/FALSE)
3. ไปที่ sheetdb.io → สร้าง API จาก Sheet นี้
4. Copy Endpoint URL ใส่ใน .env VITE_SHEETDB_URL=...
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat`**

```
=== Iteration 1: Data Layer ===
[Context] สร้าง Product Catalog จาก Google Sheet ผ่าน SheetDB
[Task] สร้าง Data Layer ครบ
[Spec]
Custom Hook: useProducts()
- ดึงข้อมูลจาก VITE_SHEETDB_URL
- Type Conversion:
  price → parseFloat
  stock → parseInt
  isActive → value === 'TRUE'
- Return: { products, isLoading, error, refresh }

Functions:
- addProduct(data): POST ไป SheetDB
- updateProduct(id, data): PATCH ไป SheetDB
- deleteProduct(id): DELETE จาก SheetDB
[Constraint] Handle Rate Limit: ถ้าเกิน 500 req ให้แสดง Error ชัดเจน

=== Iteration 2: Product UI ===
[Context] ต่อจาก Data Layer
[Task] สร้าง UI ทั้งหมด
[Spec]
Components:
- ProductGrid: Grid 3 คอลัมน์ (Responsive 1–2–3)
- ProductCard:
  - รูปสินค้า (imageUrl หรือ Placeholder ถ้าว่าง)
  - ชื่อ, คำอธิบาย, ราคา, Badge Category
  - Stock Badge: "มีสินค้า" สีเขียว / "หมด" สีแดง
  - ซ่อน Card ถ้า isActive = FALSE
- SearchBar: ค้นหาใน name และ description
- CategoryFilter: กรองตาม category
- AddProductForm: Modal เพิ่มสินค้าใหม่
[Constraint] ใช้ CSS Module ทุก Component

=== Iteration 3: Admin Mode ===
[Context] ต่อจาก Product UI
[Task] เพิ่ม Admin Mode สำหรับแก้ไขข้อมูล
[Spec]
- Toggle Admin Mode ด้วยปุ่มที่มุมบน
- ใน Admin Mode แต่ละ Card มีปุ่ม Edit และ Delete
- Edit: Inline Form แก้ไขใน Card โดยตรง
- Delete: Modal ยืนยันก่อนลบ
- หลัง Add/Edit/Delete: Refresh ข้อมูลจาก SheetDB ใหม่
[Constraint] Admin Mode ไม่ต้อง Login ก็ได้ (สัปดาห์นี้เน้น Data Flow)
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| ดึงข้อมูลจาก Sheet จริง (ไม่ใช่ Mock) | ข้อมูลตรงกับใน Sheet | ยังใช้ Mock Data |
| แก้ข้อมูลใน Sheet → App อัพเดต (กด Refresh) | ข้อมูลใหม่แสดง | ต้อง Rebuild |
| Type Conversion ถูกต้อง | price เป็นตัวเลข | price เป็น String |
| Search และ Filter ทำงาน | กรองได้ถูกต้อง | Filter พัง |
| isActive=FALSE ซ่อน Card | Card หายไปถูกต้อง | ยังแสดงอยู่ |
| Commit ขึ้น GitHub | มี Commit ใหม่ | ยังไม่ Commit |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| SheetDB Return `[]` | Sheet ไม่ได้แชร์เป็น Public | Sheet → Share → Anyone with link → Viewer |
| ราคาแสดงเป็น NaN | parseFloat("") = NaN | ตรวจค่าว่างก่อน: `row.price ? parseFloat(row.price) : 0` |
| เพิ่มข้อมูลแล้วไม่ขึ้น | Column Name ไม่ตรง Case | ตรวจว่า Object Keys ตรงกับ Header Row |
| 429 Too Many Requests | เกิน 500 Req Free Tier | Cache ผลลัพธ์ หรืออัพเกรด SheetDB |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 17 ได้เลย!

---

---
