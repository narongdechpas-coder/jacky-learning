---
title: "Supabase — SQL Database + Row Level Security"
hours: 3
---

## 📅 สัปดาห์ที่ 12 — Supabase — SQL Database + Row Level Security

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Browser ไปที่ [supabase.com](https://supabase.com) → Sign Up ด้วย GitHub

**ถ้าสร้าง Account ได้และเห็น Dashboard = พร้อมแล้ว ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Supabase คืออะไร?**

ถ้า Firebase เป็น "ชุดเครื่องมือ Google" Supabase ก็เป็น "ชุดเครื่องมือ Open Source" ที่ทำสิ่งเดียวกัน แต่ใช้ PostgreSQL ซึ่งเป็น Database มาตรฐานที่บริษัทใหญ่ๆ ใช้กัน

**Firebase vs Supabase — เลือกอะไรดี?**

```
เลือก Firebase เมื่อ:
✅ ต้องการ Real-time แบบ Millisecond
✅ ข้อมูลไม่มี Relation ซับซ้อน
✅ ต้องการ Setup เร็ว ใช้งานง่าย
✅ ไม่รู้ SQL เลย

เลือก Supabase เมื่อ:
✅ ข้อมูลมี Relation (User → Posts → Comments)
✅ ต้องการ SQL และ JOIN Table
✅ ไม่อยากติด Google Ecosystem
✅ อยากรู้ SQL ติดตัว (มีประโยชน์ระยะยาว)
✅ ต้องการ Self-host ได้ในอนาคต
```

---

### 🏗️ Supabase Setup — ตั้งค่าครั้งแรก

**ขั้นตอนสร้าง Supabase Project:**

```
1. ไปที่ supabase.com → New Project
2. ตั้งชื่อ Project + Database Password (จำไว้!)
3. เลือก Region: Southeast Asia (Singapore)
4. รอ ~2 นาที Project พร้อม
5. ไปที่ Project Settings → API
6. Copy: Project URL และ anon public Key
```

**ติดตั้ง Supabase SDK:**

```
npm install @supabase/supabase-js
```

**ไฟล์ supabase.js:**

```
// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

**ไฟล์ .env:**

```
VITE_SUPABASE_URL=https://xyzabc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5c...
```

---

### 🗃️ Supabase Table + SQL พื้นฐาน

**สร้าง Table ผ่าน Supabase Dashboard (Table Editor):**

```
-- หรือรันใน SQL Editor ของ Supabase

-- Table: profiles (ข้อมูลเพิ่มเติมของ User)
CREATE TABLE profiles (
  id        UUID REFERENCES auth.users ON DELETE CASCADE,
  username  TEXT UNIQUE NOT NULL,
  bio       TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Table: posts
CREATE TABLE posts (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  content    TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: comments
CREATE TABLE comments (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post_id    BIGINT REFERENCES posts(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 📝 Supabase CRUD Operations

```
import { supabase } from './supabase'

// ─── READ ──────────────────────────────────────────
// ดึงทุก Row
const { data: posts, error } = await supabase
  .from('posts')
  .select('*')

// Filter + Sort
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('user_id', userId)        // WHERE user_id = userId
  .eq('is_published', true)     // AND is_published = true
  .order('created_at', { ascending: false })  // ORDER BY
  .limit(10)

// JOIN — ดึง Post พร้อมข้อมูล Profile ของเจ้าของ
const { data, error } = await supabase
  .from('posts')
  .select(`
    id, title, content, created_at,
    profiles (username, avatar_url)
  `)

// ─── CREATE ────────────────────────────────────────
const { data, error } = await supabase
  .from('posts')
  .insert({
    title:   'บทความใหม่',
    content: 'เนื้อหา...',
    user_id: user.id,
  })
  .select()   // Return ข้อมูลที่เพิ่งสร้าง

// ─── UPDATE ────────────────────────────────────────
const { data, error } = await supabase
  .from('posts')
  .update({
    title:      'ชื่อใหม่',
    updated_at: new Date().toISOString(),
  })
  .eq('id', postId)
  .eq('user_id', user.id)   // ป้องกันการแก้ของคนอื่น

// ─── DELETE ────────────────────────────────────────
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId)
  .eq('user_id', user.id)

// ─── REAL-TIME ─────────────────────────────────────
const channel = supabase
  .channel('posts-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('ข้อมูลเปลี่ยน:', payload)
      // อัพเดต State ตาม payload.eventType
    }
  )
  .subscribe()

// Cleanup
// channel.unsubscribe()
```

---

### 🔒 Row Level Security (RLS)

```
-- เปิด RLS สำหรับ Table ก่อนเสมอ
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy: อ่านได้เฉพาะ Post ที่ Published
CREATE POLICY "อ่านได้เฉพาะที่ Published"
ON posts FOR SELECT
USING (is_published = true);

-- Policy: สร้างได้เฉพาะ User ที่ Login แล้ว
CREATE POLICY "สร้างได้เฉพาะ Login แล้ว"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: แก้ไขได้เฉพาะเจ้าของ
CREATE POLICY "แก้ไขได้เฉพาะเจ้าของ"
ON posts FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: ลบได้เฉพาะเจ้าของ
CREATE POLICY "ลบได้เฉพาะเจ้าของ"
ON posts FOR DELETE
USING (auth.uid() = user_id);
```

---

### 🔐 Supabase Authentication

```
// สมัครสมาชิก
const { data, error } = await supabase.auth.signUp({
  email: 'user@email.com',
  password: 'password123',
})

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@email.com',
  password: 'password123',
})

// Login ด้วย Google (OAuth)
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
})

// Logout
await supabase.auth.signOut()

// ดู User ปัจจุบัน
const { data: { user } } = await supabase.auth.getUser()

// ฟัง Auth State เปลี่ยน
supabase.auth.onAuthStateChange((event, session) => {
  setUser(session?.user ?? null)
})
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Supabase เบื้องต้น ภาษาไทย**

[![Supabase TH](https://img.youtube.com/vi/dU7GwCOgvNY/0.jpg)](https://www.youtube.com/watch?v=dU7GwCOgvNY)

🔗 [https://www.youtube.com/watch?v=dU7GwCOgvNY](https://www.youtube.com/watch?v=dU7GwCOgvNY)

---

**วิดีโอ 2 — Supabase in 100 Seconds (Fireship — English)**

[![Supabase Fireship](https://img.youtube.com/vi/zBZgdTb-dns/0.jpg)](https://www.youtube.com/watch?v=zBZgdTb-dns)

🔗 [https://www.youtube.com/watch?v=zBZgdTb-dns](https://www.youtube.com/watch?v=zBZgdTb-dns)

---

**วิดีโอ 3 — Supabase Full Tutorial (Traversy — English)**

[![Supabase Full](https://img.youtube.com/vi/ydz7Dj5QHKY/0.jpg)](https://www.youtube.com/watch?v=ydz7Dj5QHKY)

🔗 [https://www.youtube.com/watch?v=ydz7Dj5QHKY](https://www.youtube.com/watch?v=ydz7Dj5QHKY)

> 💡 ดูช่วง 0:00–30:00 ครอบคลุม Setup + CRUD + Auth

---

### 📖 Further Reading

-   🔗 [supabase.com/docs](https://supabase.com/docs) — Official Docs
-   🔗 [supabase.com/docs/guides/auth/row-level-security](https://supabase.com/docs/guides/auth/row-level-security)

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` ⚠️ Supabase URL และ Key ต้องอยู่ใน .env เสมอ

---

**Prompt 1 — สร้าง Table Schema + RLS**

```
[Context] ฉันกำลังสร้าง [ชื่อ App] ด้วย Supabase
[Task] ช่วยสร้าง SQL สำหรับ Table และ RLS Policies
[Spec]
App Features:
[บอก Feature ทั้งหมดของ App]

ต้องการ:
1. SQL สร้าง Table ทั้งหมดพร้อม Constraint
2. RLS Policies ที่เหมาะสมสำหรับแต่ละ Table
3. Index ที่ควรสร้างสำหรับ Query ที่ใช้บ่อย
[Constraint] อธิบาย Design Decision ของแต่ละ Table
```

---

**Prompt 2 — Supabase CRUD ใน React**

```
[Context] ต่อจาก Table Schema ที่สร้างไว้
[Task] สร้าง Custom Hooks สำหรับ Supabase CRUD
[Spec]
สร้าง Hook สำหรับ Table: [ชื่อ Table]
- use[TableName](): ดึงข้อมูลทั้งหมด (พร้อม Filter ถ้ามี)
- add[TableName](data): เพิ่มข้อมูลใหม่
- update[TableName](id, data): แก้ไข
- delete[TableName](id): ลบ
- ทุก Hook Return: { data, isLoading, error }
[Constraint] Handle Error ทุก Operation
อธิบาย RLS ที่จะ Block Operation ไหนบ้าง
```

---

**Prompt ฉุกเฉิน — RLS Block Query**

```
[Context] Supabase Query Return ข้อมูลว่างทั้งที่มีข้อมูลใน DB
[Task] ช่วย Debug RLS Policy
[Spec]
Query ที่ใช้:
[วาง Supabase Query]
Table และ RLS ที่มี:
[วาง SQL ของ Policy]
Auth State: [Login อยู่หรือเปล่า / uid คือ?]
[Constraint] อธิบายว่า Policy ไหนที่ Block และทำไม
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

> 💡 สัปดาห์นี้ไม่ต้องเตรียมรูปพิเศษ ใช้ Default Avatar จากสัปดาห์ 11 ได้เลย

---

### 🛠️ Workshop — "Habit Tracker ด้วย Supabase"

> 🏷️ **Prompt: ใช้ใน `Claude Chat`** + SQL รันใน Supabase SQL Editor ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **ต้องมีก่อนเริ่ม:** Supabase Account + Project สร้างแล้ว

**โจทย์ / Assignment:**

สร้าง Habit Tracker ที่บันทึก Habit และ Check-in รายวัน ใช้ Supabase เป็น Database จริง

---

**Checkpoint ก่อนเริ่ม:**

```
npm install @supabase/supabase-js
# สร้าง .env ใส่ VITE_SUPABASE_URL และ VITE_SUPABASE_ANON_KEY
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat`**

```
=== Step 1: Database Schema ===
[Context] สร้าง Habit Tracker ด้วย Supabase PostgreSQL
[Task] สร้าง SQL Schema ครบ
[Spec]
Tables ที่ต้องมี:
1. habits: id, user_id, name, description, color, icon, created_at
2. habit_logs: id, habit_id, user_id, logged_date (DATE), note, created_at

Constraints:
- habit_logs ต้อง Unique ต่อ habit_id + logged_date
  (Check-in ได้แค่ครั้งเดียวต่อวัน)
- Foreign Key ครบทุก Relationship

RLS Policies:
- User เห็นเฉพาะ Habits ของตัวเอง
- User บันทึก Log ได้เฉพาะ Habits ของตัวเอง

[Constraint] รัน SQL นี้ใน Supabase SQL Editor

=== Step 2: Supabase Setup + Auth ===
[Context] Schema สร้างแล้ว ต่อจากนี้ใน React
[Task] Setup Supabase Client + Authentication
[Spec]
- src/supabase.js: createClient จาก .env
- AuthContext: currentUser, login, register, logout
- Protected Route: Redirect ถ้ายัง Login

=== Step 3: Habits CRUD + UI ===
[Context] ต่อจาก Auth Setup
[Task] สร้าง Habit Management ครบ
[Spec]
Features:
- แสดง Habit List พร้อม Color Icon
- Add Habit: Modal Form (name, color, icon emoji)
- Delete Habit: ยืนยันก่อนลบ
- Check-in Today: กดปุ่มบน Habit Card ได้เลย
  ถ้า Check-in แล้วจะแสดง ✅ และปุ่มเป็น Disabled
- Streak: นับจำนวนวันติดต่อกัน (Current Streak)
[Constraint] ใช้ Supabase RLS ดึงเฉพาะข้อมูลของ User

=== Step 4: Statistics ===
[Context] ต่อจาก CRUD
[Task] เพิ่มหน้าสถิติ
[Spec]
- รายการ Check-in ใน 30 วันล่าสุด
- Heatmap Calendar แสดงวันที่ Check-in
  (ใช้สี่เหลี่ยมสีเข้มขึ้นตามจำนวน Habit ที่ Check-in)
- Completion Rate ของแต่ละ Habit
[Constraint] Query ข้อมูลจาก Supabase จริง ไม่ใช้ Mock Data
```

---

**ขั้นตอน Commit:**

```
git add .
git commit -m "feat: habit tracker with supabase postgres and rls"
git push
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| Table สร้างใน Supabase Dashboard แล้ว | เห็น Table ใน Table Editor | ยังไม่มี Table |
| Login แล้วเห็น Habits ของตัวเองเท่านั้น | RLS Filter ถูกต้อง | เห็น Habits คนอื่น |
| Check-in ได้แค่ 1 ครั้งต่อวัน | ปุ่ม Disabled หลัง Check-in | Check-in ซ้ำได้ |
| Streak นับถูกต้อง | ตัวเลข Streak ตรง | ตัวเลขผิด |
| Supabase Keys ไม่อยู่ใน GitHub | ตรวจ Repo ไม่เห็น | เห็น Keys |
| Commit ขึ้น GitHub | มี Commit ใหม่ | ยังไม่ Commit |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| `new row violates row-level security` | RLS ไม่อนุญาต INSERT | ตรวจ WITH CHECK Policy |
| Query Return `[]` ทั้งที่มีข้อมูล | RLS บล็อก SELECT | ตรวจ USING Policy |
| Unique Violation บน Check-in | Check-in ซ้ำวันเดิม | ใช้ `.upsert()` หรือตรวจก่อน Insert |
| Foreign Key Violation | Insert ข้อมูลที่ Reference ไม่มี | ตรวจว่า Parent Record มีก่อน |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 13 ได้เลย!

---

---
