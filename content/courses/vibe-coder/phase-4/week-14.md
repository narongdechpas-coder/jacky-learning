---
title: "Full Stack Mini Project — รวมทุกอย่างใน 1 App"
hours: 3
---

## 📅 สัปดาห์ที่ 14 — Full Stack Mini Project — รวมทุกอย่างใน 1 App

### ⏱️ เวลาโดยประมาณ

ออกแบบ 30 นาที + สร้าง 2.5 ชม. = รวม 3 ชม.

> 💡 **สัปดาห์นี้คือบทพิสูจน์ตัวเองครั้งแรก** — ไม่มีคำแนะนำทีละขั้นเหมือนสัปดาห์ก่อน ต้องนำทุกอย่างที่เรียนใน Phase 4 มาใช้เอง

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด App จากสัปดาห์ 13 ที่ Deploy บน Vercel แล้ว ทดสอบ:

```
✅ เปิดได้จากมือถือ (ไม่ใช่แค่ Localhost)
✅ ค้นหาเมืองแล้วข้อมูลแสดงผล
✅ เปิด DevTools ไม่เห็น API Key ใน Network Tab
```

**ถ้าผ่านทั้ง 3 ข้อ = พร้อม Phase 4 Final Project แล้ว ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Full Stack App คืออะไร?**

"Full Stack" หมายถึงทำงานทั้ง 2 ชั้น ครบวงจร:

```
Frontend (ส่วนที่ผู้ใช้เห็น):
→ React UI, CSS, Responsive Design
→ ทำงานใน Browser ของผู้ใช้

Backend (ส่วนที่ทำงานเบื้องหลัง):
→ Database (Firebase/Supabase)
→ Authentication (ระบบ Login)
→ Serverless Functions (ซ่อน API Key)
→ ทำงานบน Server / Cloud
```

ก่อนหน้านี้เราเรียนทีละชั้น สัปดาห์นี้คือการนำทุกชั้นมาประกอบเข้าด้วยกันเป็น App จริง

---

### 🏗️ Full Stack Architecture ของ Phase 4

```
ผู้ใช้ (Browser)
     ↓ เปิด URL
React App (Vercel CDN)
     ↓ Login
Firebase Auth / Supabase Auth
     ↓ ได้ JWT Token
     ↓ ดึงข้อมูล
Firebase Firestore / Supabase PostgreSQL
     ↓ ถ้าต้องใช้ External API
Vercel Serverless Function
     ↓ ซ่อน API Key
External API (TheMealDB / Open Library / etc.)
     ↓ ส่งข้อมูลกลับ
React App แสดงผล ✅
```

---

### 📐 Full Stack Checklist — ต้องครบก่อน Deploy

```
FRONTEND:
✅ Responsive ทุก Breakpoint (375px / 768px / 1280px)
✅ Loading State ทุก Async Operation
✅ Error State ทุก API Call
✅ Empty State ทุก List
✅ Form Validation ทุก Input
✅ ไม่มี console.log เหลือ
✅ ไม่มี Hardcoded API Key ใน Code

BACKEND & SECURITY:
✅ Firebase Security Rules หรือ Supabase RLS เปิดอยู่
✅ User เห็นเฉพาะข้อมูลของตัวเอง
✅ .env ไม่อยู่ใน Git
✅ .env.example อยู่ใน Git (ไม่มีค่าจริง)
✅ Serverless Function Validate Input

DEPLOY:
✅ npm run build ผ่านโดยไม่ Error
✅ Environment Variables ตั้งใน Vercel Dashboard ครบ
✅ Auto-deploy จาก GitHub Main Branch ทำงาน
✅ HTTPS URL ใช้ได้จาก Mobile

DOCUMENTATION:
✅ README.md อธิบาย App + วิธี Setup
✅ Commit History มีความหมาย ≥ 5 Commits
```

---

### 🗺️ Prompt Chaining Strategy สำหรับ Full Stack App

**แบ่งงานเป็น 5 ระลอก ไม่ทำรวมกันครั้งเดียว:**

```
ระลอกที่ 1: Database Schema + Auth Setup
→ สร้าง Table / Collection + ตั้ง Auth
→ ทดสอบ Login/Register ได้ก่อนทำต่อ

ระลอกที่ 2: Core CRUD Operations
→ Add, Read, Update, Delete ข้อมูลหลัก
→ ทดสอบว่าข้อมูลบันทึกใน DB จริง

ระลอกที่ 3: External API Integration
→ เชื่อม API ภายนอก ผ่าน Serverless ถ้าต้องซ่อน Key
→ ทดสอบ API Response Format ก่อน Build UI

ระลอกที่ 4: UI + Styling ครบ
→ สร้าง Component ทั้งหมด + Responsive
→ Loading / Error / Empty State ครบ

ระลอกที่ 5: Polish + Pre-deploy Review
→ Fix Bug จาก Manual Testing
→ Security Review + README
→ Deploy
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Full Stack React + Firebase ตั้งแต่ต้น (ภาษาไทย)**

[![Fullstack TH](https://img.youtube.com/vi/PKwu15ldZ7k/0.jpg)](https://www.youtube.com/watch?v=PKwu15ldZ7k)

🔗 [https://www.youtube.com/watch?v=PKwu15ldZ7k](https://www.youtube.com/watch?v=PKwu15ldZ7k)

> 💡 ดูเพื่อเห็นภาพรวมว่า Full Stack App ทุกส่วนต่อกันยังไง

---

**วิดีโอ 2 — Full Stack React + Supabase (Traversy — English)**

[![Fullstack Supabase](https://img.youtube.com/vi/ydz7Dj5QHKY/0.jpg)](https://www.youtube.com/watch?v=ydz7Dj5QHKY)

🔗 [https://www.youtube.com/watch?v=ydz7Dj5QHKY](https://www.youtube.com/watch?v=ydz7Dj5QHKY)

> 💡 ดูช่วง 30:00–60:00 เน้นการเชื่อม Auth + DB + UI เข้าด้วยกัน

---

**วิดีโอ 3 — How to Structure a React Project (Codevolution — English)**

[![React Structure](https://img.youtube.com/vi/GGo3MVBFr1A/0.jpg)](https://www.youtube.com/watch?v=GGo3MVBFr1A)

🔗 [https://www.youtube.com/watch?v=GGo3MVBFr1A](https://www.youtube.com/watch?v=GGo3MVBFr1A)

> 💡 ดูก่อนเริ่ม Workshop เพื่อจัด Folder Structure ให้ถูกต้อง

---

### 📖 Further Reading

-   🔗 [vitejs.dev/guide/build](https://vitejs.dev/guide/build) — Vite Build for Production
-   🔗 [vercel.com/guides/react](https://vercel.com/guides/react) — Deploy React on Vercel
-   🔗 [dbdiagram.io](https://dbdiagram.io) — วาด Data Model ก่อนเริ่ม

---

### 🎯 โจทย์ Phase 4 Final Project

**เลือก 1 โปรเจกต์จากตัวเลือกด้านล่าง:**

```
ตัวเลือก A — "Recipe Saver" (ง่าย)
→ บันทึกสูตรอาหาร + ดึงแรงบันดาลใจจาก TheMealDB API
→ Stack: React + Supabase + Vercel

ตัวเลือก B — "Reading List" (ปานกลาง)
→ บันทึกหนังสือที่อยากอ่าน + ค้นหาจาก Open Library API
→ Stack: React + Firebase + Vercel Serverless

ตัวเลือก C — "Link Saver" (ท้าทาย)
→ บันทึก URL + ดึง Metadata (Title, Image) โดยอัตโนมัติ
→ Stack: React + Supabase + Vercel Serverless ดึง Metadata
```

**ทุกตัวเลือกต้องมี:**

```
✅ Authentication (Login/Register)
✅ Database จริง (Firebase หรือ Supabase)
✅ External API อย่างน้อย 1 ตัว
✅ Serverless Function ซ่อน API Key (ถ้ามี Key)
✅ Deploy บน Vercel มี URL จริง
✅ Responsive (ดูดีบน Mobile)
✅ README บอกวิธี Setup
```

---

### 📋 Workflow — วิธีคิดก่อนสร้าง

**ทำก่อนเขียน Prompt เสมอ:**

```
Step 1: เลือกโปรเจกต์และ Stack

Step 2: ออกแบบ Data Model
→ มี Entity อะไร?
→ Field ของแต่ละ Entity คืออะไร?
→ Relationship คืออะไร?
→ วาดออกมาบนกระดาษก่อน

Step 3: วางแผน Component
→ หน้าไหนมีบ้าง?
→ แต่ละหน้ามี Component อะไร?

Step 4: ระบุ API ที่ต้องใช้
→ Endpoint ไหนบ้าง?
→ ต้องซ่อน Key ไหม?

แล้วค่อยเริ่ม Prompt Claude ทีละขั้น
```

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` สร้างโค้ด 🏷️ **SQL: รันใน Supabase SQL Editor** 🏷️ **Deploy: Vercel Dashboard**

---

**Prompt เริ่มต้น Session — ตั้ง Context ให้ Claude รู้จักโปรเจกต์**

```
[Context]
ฉันกำลังสร้าง [ชื่อ App] — [อธิบาย 1 ประโยค]
Stack: React + Vite + [Firebase หรือ Supabase] + Vercel
Target Users: [ใครใช้?]

Data Model ที่ออกแบบไว้:
[วาง Data Model ที่คิดไว้]

Features ทั้งหมด:
[List Feature]

External APIs:
[ชื่อ API + Endpoint ที่จะใช้]

[Task] ฉันจะ Prompt ทีละ Feature โดยให้ Context นี้เสมอ
เริ่มจาก [Feature แรก] ก่อน

[Constraint]
- ใช้ TypeScript ถ้าเป็นไปได้
- Security ครบ: .env, RLS/Security Rules, Input Validation
- บอกทุกไฟล์ที่ต้องสร้างหรือแก้
```

---

**Prompt สำหรับแต่ละ Feature:**

```
[Context] ต่อจาก [Feature ก่อนหน้า] ที่สร้างไว้แล้ว
[Task] สร้าง [Feature ถัดไป]
[Spec]
[อธิบาย Feature อย่างละเอียด]
[Constraint]
- ต่อยอดจากโค้ดที่มีอยู่
- ใช้ Design System เดิม
- ทดสอบ Edge Case: [ระบุ]
```

---

**Prompt ตรวจสอบก่อน Deploy:**

```
[Context] App เสร็จแล้ว ก่อน Deploy ขอ Review
[Task] ตรวจสอบ Production Readiness ครบ
[Spec]
โค้ดที่อยากให้ Review: [วางโค้ดทุกไฟล์ที่สำคัญ]
[Constraint]
ตรวจ:
1. Security: API Key, Auth, Input Validation, Error Messages
2. Performance: Unnecessary Re-renders, Unused Imports
3. UX: Loading States, Empty States, Error States ครบไหม?
4. Code Quality: console.log ยังอยู่ไหม?
5. Deploy Readiness: Build จะผ่านไหม?
แสดงเป็น ✅ / ⚠️ / ❌ พร้อมวิธีแก้
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

| ตัวเลือก | Filename | Dimension | รายละเอียด |
| --- | --- | --- | --- |
| A (Recipe) | `public/recipe-placeholder.jpg` | 400 × 300 px | รูป Placeholder สำหรับ Recipe ที่ไม่มีรูป |
| B (Reading) | `public/book-placeholder.jpg` | 200 × 300 px | รูป Book Cover Placeholder |
| C (Links) | `public/link-placeholder.png` | 400 × 200 px | รูป Placeholder สำหรับ Link Preview |

> 💡 แหล่งรูปฟรี: [unsplash.com](https://unsplash.com) หรือใช้ CSS Gradient แทน

---

### 🛠️ Workshop — Phase 4 Final Project

> 🏷️ **ทุก Prompt: ใช้ใน `Claude Chat`** 🏷️ **SQL: รันใน Supabase SQL Editor (ตัวเลือก A, C)** 🏷️ **Deploy: ทำผ่าน Vercel Dashboard** ⏱️ **เวลาโดยประมาณ:** 3 ชั่วโมง (ยาวกว่าสัปดาห์ปกติ)

---

**Checkpoint ก่อนเริ่ม:**

```
✅ เลือกตัวเลือก A, B หรือ C แล้ว
✅ วาด Data Model บนกระดาษก่อน (Entity + Fields + Relationship)
✅ วางแผน Component ในหัวว่ามีหน้าไหนบ้าง
✅ สร้าง GitHub Repo ใหม่สำหรับโปรเจกต์นี้
✅ สร้าง Firebase หรือ Supabase Project ใหม่พร้อม
```

---

### 🍳 ตัวเลือก A — "Recipe Saver" (Stack: React + Supabase + Vercel)

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat` ทีละระลอก**

```
=== ระลอกที่ 1: Database Schema + Auth ===
[Context]
ฉันกำลังสร้าง Recipe Saver App
Stack: React + Vite + Supabase + Vercel
ผู้ใช้บันทึกสูตรอาหารที่ชอบ + ค้นหาแรงบันดาลใจจาก TheMealDB API

[Task] สร้าง SQL Schema + Auth Setup
[Spec]
Tables:
1. recipes: id, user_id, title, description,
            ingredients (TEXT ARRAY), steps (TEXT ARRAY),
            image_url, source_url, category, created_at
2. ไม่ต้องมี Table อื่นเพิ่ม

SQL ที่ต้องการ:
- CREATE TABLE พร้อม Constraints
- RLS Policies: User เห็น/แก้/ลบเฉพาะ Recipes ของตัวเอง
- Enable Auth Provider: Email/Password

React Setup:
- supabase.js: createClient จาก VITE_ ENV
- AuthContext: currentUser, login, register, logout
- Protected Routes: Redirect ถ้ายัง Login

[Constraint] SQL รันใน Supabase SQL Editor
อธิบาย RLS แต่ละ Policy ด้วย Comment

=== ระลอกที่ 2: Recipe CRUD ===
[Context] ต่อจาก Auth Setup ที่มีอยู่
[Task] สร้าง Recipe CRUD ครบ
[Spec]
Hooks:
- useRecipes(): ดึง Recipes ของ User ปัจจุบัน
  Filter ตาม category ได้ด้วย Optional param
- addRecipe(data): เพิ่ม Recipe ใหม่
- updateRecipe(id, data): แก้ไข
- deleteRecipe(id): ลบ

Component:
- RecipeGrid: แสดง Cards ทุก Recipe ที่บันทึก
- RecipeCard: รูป, ชื่อ, Category Badge, ปุ่ม Edit/Delete
- RecipeForm: Modal สำหรับ Add/Edit (Title, Description,
              Ingredients เพิ่มทีละบรรทัด, Steps, Category, Image URL)
[Constraint] ใช้ Supabase RLS ดึงเฉพาะข้อมูลของ User

=== ระลอกที่ 3: TheMealDB Integration ===
[Context] ต่อจาก CRUD ที่มีอยู่
[Task] เชื่อม TheMealDB API หาแรงบันดาลใจ
[Spec]
API: https://www.themealdb.com/api/json/v1/1/search.php?s={query}
(ไม่ต้อง API Key)

Features:
- SearchBar: ค้นหาชื่ออาหาร
- SearchResults: แสดง Card ผลลัพธ์จาก TheMealDB
- ปุ่ม "บันทึกสูตรนี้": Import ข้อมูลจาก TheMealDB
  ลงใน RecipeForm และ Save ลง Supabase ทันที
- Loading / Error / Empty State ครบ
[Constraint] ไม่ต้อง Serverless (TheMealDB ไม่มี Key)
เรียก API โดยตรงจาก Frontend ได้เลย

=== ระลอกที่ 4: UI + Styling + Deploy ===
[Context] ต่อจากทุก Feature ที่มีอยู่
[Task] ทำ UI สมบูรณ์ + ตรวจ Pre-deploy
[Spec]
Pages:
- /login: Login + Register Form
- /: Recipe Grid + Search Bar + Category Filter
- /search: ค้นหาจาก TheMealDB

Style:
- Color Scheme: โทนอบอุ่น เช่น ส้ม ครีม น้ำตาล
- Responsive: Mobile 1 Col / Tablet 2 Col / Desktop 3 Col
- Recipe Card: รูปบน ข้อมูลล่าง มี Hover Effect

Pre-deploy Checklist:
- ✅ ไม่มี console.log
- ✅ Loading/Error/Empty State ครบ
- ✅ .env.example พร้อม
- ✅ README มี Setup Instructions
[Constraint] ตรวจ Security ก่อน Commit ทุกครั้ง
```

---

### 📚 ตัวเลือก B — "Reading List" (Stack: React + Firebase + Vercel Serverless)

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat` ทีละระลอก**

```
=== ระลอกที่ 1: Firebase Setup + Auth ===
[Context]
ฉันกำลังสร้าง Reading List App
Stack: React + Vite + Firebase + Vercel
ผู้ใช้บันทึกหนังสือที่อยากอ่าน + ค้นหาจาก Open Library API

[Task] Setup Firebase + Authentication
[Spec]
Firestore Collection:
books/{bookId}:
- userId: string
- title: string
- author: string
- coverUrl: string
- status: "want_to_read" | "reading" | "finished"
- rating: number (1–5, Optional)
- note: string (Optional)
- openLibraryId: string (Optional — ถ้า Import จาก API)
- addedAt: serverTimestamp

Firebase Setup:
- firebase.js: initializeApp จาก VITE_ ENV
- Auth: Email/Password + Google Sign-in
- Security Rules:
  - อ่าน/เขียนเฉพาะ userId == request.auth.uid

React:
- AuthContext: currentUser, loginEmail, loginGoogle, register, logout
- ProtectedRoute
[Constraint] Google Sign-in ต้องตั้ง Authorized Domain ใน Firebase Console

=== ระลอกที่ 2: Books CRUD + Real-time ===
[Context] ต่อจาก Firebase Setup
[Task] สร้าง Books CRUD ด้วย onSnapshot
[Spec]
Custom Hook: useBooks(statusFilter?)
- ใช้ onSnapshot (Real-time)
- Filter ตาม status ถ้ามี param
- Return: { books, isLoading, error }

Functions:
- addBook(bookData): เพิ่มหนังสือ
- updateBook(id, data): แก้ status, rating, note
- deleteBook(id): ลบ

Components:
- BookShelf: แสดง Tabs (Want / Reading / Finished)
- BookCard: Cover Image, Title, Author, Status Badge,
            Rating Stars, ปุ่ม Edit/Delete
- BookForm: Modal สำหรับ Add/Edit
- Stats: นับจำนวนหนังสือแต่ละ Status
[Constraint] ใช้ onSnapshot ไม่ใช่ getDocs

=== ระลอกที่ 3: Open Library API ผ่าน Serverless ===
[Context] ต่อจาก CRUD ที่มีอยู่
[Task] สร้าง Serverless Function + Search UI
[Spec]
Serverless (api/search-books.js):
- รับ Query Param: q (search query)
- เรียก: https://openlibrary.org/search.json?q={q}&limit=10
- Return: id, title, author, cover_url ของแต่ละ Book
- Handle: Network Error, Empty Result, Rate Limit
- CORS Header สำหรับ localhost + Vercel Domain

Search UI:
- SearchPage: Input + ผลลัพธ์จาก Serverless
- SearchResultCard: Cover, Title, Author, ปุ่ม "เพิ่มใน Reading List"
- เมื่อกดปุ่ม → addBook() บันทึกลง Firestore ทันที
[Constraint] เรียก Open Library ผ่าน Serverless เท่านั้น
แม้จะไม่ต้องซ่อน Key แต่ฝึก Pattern ที่ถูกต้อง

=== ระลอกที่ 4: UI + Deploy ===
[Context] ต่อจากทุก Feature
[Task] ทำ UI สมบูรณ์ + ตรวจ Pre-deploy
[Spec]
Pages:
- /login: Login Form + Google Button
- /: BookShelf (Tabs) + Stats Summary
- /search: ค้นหาจาก Open Library

Style:
- Color Scheme: โทนเย็น น้ำเงินกรมท่า ครีม
- Book Card: Cover Image สูง แบบ Book Spine
- Responsive: 1–2–4 Col ตาม Breakpoint

Pre-deploy:
- ✅ Google Auth Authorized Domain ตั้งแล้ว
- ✅ Firestore Security Rules เปิดอยู่
- ✅ Env Variables ตั้งใน Vercel Dashboard
- ✅ README + .env.example พร้อม
[Constraint] ทดสอบ Google Sign-in บน Production Domain ด้วย
```

---

### 🔗 ตัวเลือก C — "Link Saver" (Stack: React + Supabase + Vercel Serverless)

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat` ทีละระลอก**

```
=== ระลอกที่ 1: Database Schema + Auth ===
[Context]
ฉันกำลังสร้าง Link Saver App
Stack: React + Vite + Supabase + Vercel
ผู้ใช้บันทึก URL + ระบบดึง Metadata (Title, Image, Description) อัตโนมัติ

[Task] สร้าง SQL Schema + Auth Setup
[Spec]
Tables:
1. links: id, user_id, url (TEXT UNIQUE per user),
          title, description, image_url,
          tags (TEXT ARRAY), is_favorite (BOOLEAN DEFAULT false),
          created_at
2. tags มีใน Array ของ links ไม่ต้องสร้าง Table แยก

RLS Policies:
- User เห็น/แก้/ลบเฉพาะ Links ของตัวเอง
- Check Unique URL per User: ห้าม Insert URL ซ้ำของ User เดิม

React:
- supabase.js: createClient จาก VITE_ ENV
- AuthContext: currentUser, login, register, logout
- ProtectedRoute

[Constraint] SQL รันใน Supabase SQL Editor

=== ระลอกที่ 2: Link CRUD + Metadata Fetch ===
[Context] ต่อจาก Schema + Auth
[Task] สร้าง Serverless Function ดึง Metadata + CRUD

Serverless (api/fetch-metadata.js):
- รับ Query Param: url (string)
- Validate: ต้องเป็น URL format ที่ถูกต้อง, ยาวไม่เกิน 2048 ตัวอักษร
- ดึง HTML ของ URL นั้น ด้วย fetch()
- Parse หา: og:title, og:description, og:image, <title> tag
- Return: { title, description, imageUrl }
- Handle: Timeout 5s, Non-HTML Response, Fetch Error
- CORS Header ครบ

React Hooks:
- useLinks(filter?): ดึง Links ทั้งหมด Filter ตาม tag / favorite
- addLink(url): เรียก /api/fetch-metadata → บันทึกลง Supabase
- updateLink(id, data): แก้ title, tags, is_favorite
- deleteLink(id): ลบ

[Constraint] Metadata Fetch ต้องผ่าน Serverless เท่านั้น

=== ระลอกที่ 3: UI ครบ ===
[Context] ต่อจาก CRUD ที่มีอยู่
[Task] สร้าง UI ทั้งหมด
[Spec]
Components:
- AddLinkBar: Input URL + ปุ่ม Add (Loading ระหว่างดึง Metadata)
- LinkGrid: CSS Grid แสดง Cards ทั้งหมด
- LinkCard: Preview Image บน, Title, Description, URL Domain,
            Tags, ปุ่ม Favorite (⭐), ปุ่ม Delete
            คลิก Card เปิด URL ในแท็บใหม่
- TagFilter: แสดง Tags ทั้งหมด กด Filter ได้
- FavoriteFilter: Toggle แสดงเฉพาะ Favorites

States:
- เมื่อกำลังดึง Metadata: Skeleton Card แสดง
- URL ซ้ำ: แสดง Error "บันทึกไว้แล้ว"
- Image โหลดไม่ได้: แสดง CSS Gradient Placeholder
[Constraint] CSS Module ทุก Component

=== ระลอกที่ 4: Polish + Deploy ===
[Context] ต่อจาก UI ทั้งหมด
[Task] ทำ Polish สุดท้าย + ตรวจ Pre-deploy + Deploy
[Spec]
Polish:
- Keyboard Shortcut: กด Enter ใน Input เพื่อ Add Link
- Copy URL ปุ่มใน Card (Copy to Clipboard)
- Sort: เรียงตาม Newest / Oldest / Title A–Z
- Search: ค้นหาใน Title และ Description

Pre-deploy:
- ✅ Serverless Function Timeout ตั้งเป็น 10s
- ✅ Input Validation ทุก Field
- ✅ .env.example พร้อม
- ✅ README บอก: วิธี Setup + วิธี Deploy
- ✅ ไม่มี console.log เหลือ
[Constraint] ทดสอบ Add URL จริง 5 URL ก่อน Deploy
```

---

**Prompt ฉุกเฉิน — ติดตรงไหนก็ได้ระหว่าง Workshop**

```
[Context] ฉันกำลังสร้าง [ตัวเลือก A/B/C] ติดปัญหา
[Task] ช่วย Debug / อธิบาย
[Spec]
ระลอกที่ทำอยู่: [ระลอกที่เท่าไหร่]
ปัญหา: [อธิบายอาการ]
Error Message: [Copy จาก Console / Terminal]
โค้ดที่เกี่ยวข้อง: [วางโค้ด]
[Constraint]
- อธิบายสาเหตุก่อนให้ Solution
- บอกว่าต้องแก้ไฟล์ไหนบ้าง
```

---

**Acceptance Criteria ✅ — ต้องผ่านทั้งหมด**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| App Live บน Vercel มี HTTPS URL จริง | เปิดได้จากมือถือ | Build Error หรือยัง Localhost |
| Login / Register ทำงานได้จริง | Firebase/Supabase มี User | Error ตอน Login |
| ข้อมูลบันทึกลง Database จริง | เห็นใน Firebase/Supabase Console | ข้อมูลหายหลัง Refresh |
| External API ทำงาน (ผ่าน Serverless หรือตรง) | ดึงข้อมูลได้ | API Error ทุกครั้ง |
| API Key ไม่โชว์ใน Browser Network Tab | DevTools ตรวจไม่เห็น Key | Key โชว์ใน URL หรือ Header |
| Responsive บน Mobile 375px | Layout ไม่แตก | Layout พัง |
| README มี Setup Instructions | อ่านแล้วทำตามได้ | ไม่มี README |
| GitHub Repo มี Commit History ≥ 5 Commits | git log เห็น 5+ | มีแค่ 1–2 |
| .env ไม่อยู่ใน GitHub | Repo ไม่มี .env | เห็น .env ใน Repo |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| Vercel Build Fail | TypeScript Error หรือ Import ผิด | ดู Build Log ใน Vercel Dashboard |
| Auth ทำงาน Local แต่พัง Production | Callback URL ไม่ได้ตั้ง | ตั้ง Authorized Domain ใน Firebase/Supabase |
| API ทำงาน Local แต่พัง Production | Env Variable ไม่ได้ตั้งใน Vercel | ตรวจ Vercel → Settings → Environment Variables |
| Database ใช้ได้ Local แต่ใช้ไม่ได้ Production | RLS/Security Rules ต่างกัน | ตรวจว่า Production ใช้ Config เดียวกัน |

---

> 🎯 ผ่านทุกข้อ → **Phase 4 เสร็จสมบูรณ์!** พร้อมเข้า Phase 5

---

## 🏁 Phase 4 Summary — สิ่งที่ได้เรียนรู้ทั้งหมด

```
✅ รู้ความต่าง Firebase (NoSQL) vs Supabase (SQL) เลือกได้ถูกโจทย์
✅ ใช้ Firestore CRUD + Real-time onSnapshot ได้
✅ ตั้งค่า Firebase Authentication และ Security Rules ได้
✅ สร้าง Supabase Table ด้วย SQL + Foreign Key ได้
✅ เขียน Row Level Security (RLS) Policy ใน Supabase ได้
✅ สร้าง Serverless Function บน Vercel ซ่อน API Key ได้
✅ ตั้งค่า Environment Variables บน Vercel Dashboard ได้
✅ Deploy React App ขึ้น Vercel ได้ มี Auto-deploy จาก GitHub
✅ ตรวจสอบ Security ก่อน Deploy ด้วย Checklist
✅ มี App จริงที่ Live บน Internet พร้อม URL แชร์ได้
```

**Deliverables (ชิ้นงาน) จาก Phase 4:**

-   📝 **Note App** — Firebase Auth + Firestore Real-time (สัปดาห์ 11)
-   💪 **Habit Tracker** — Supabase PostgreSQL + RLS (สัปดาห์ 12)
-   🌤️ **Weather App (Secure)** — Serverless Function + Deploy บน Vercel (สัปดาห์ 13)
-   🚀 **Full Stack Mini App** — ทุก Skill รวมกัน + Live URL (สัปดาห์ 14)

---

> ⏭️ **Phase 5 ถัดไป:** Connectors + Automation — Public APIs, Google Sheets, App Script, Make.com และ Webhook Integration
