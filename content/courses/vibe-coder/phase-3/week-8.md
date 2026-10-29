---
title: "API & Fetch + Environment Variables (ดึงข้อมูลจากภายนอก + ความปลอดภัย)"
hours: 3
---

## 📅 สัปดาห์ที่ 8 — API & Fetch + Environment Variables (ดึงข้อมูลจากภายนอก + ความปลอดภัย)

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Browser ไปที่ URL นี้เลย:

```
https://jsonplaceholder.typicode.com/users
```

**ถ้าเห็นข้อมูล JSON เป็น Array ของ User = API ทำงานได้ ✅** นี่คือ Free Test API ที่จะใช้ตลอดสัปดาห์นี้

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**API คืออะไร?**

API เหมือน "พนักงานเสิร์ฟ" ในร้านอาหาร เราเป็นลูกค้า ครัวคือ Server เราไม่ได้เข้าไปในครัวเอง แต่สั่งผ่านพนักงานเสิร์ฟ (API) ซึ่งจะไปเอาอาหาร (Data) มาให้เรา

```
เราสั่ง (Request):
"ขอ User ID 1 หน่อย"

API ไปดึงข้อมูล แล้วส่งกลับมา (Response):
{
  "id": 1,
  "name": "สมชาย ใจดี",
  "email": "somchai@email.com"
}
```

**Environment Variable คืออะไร?**

ลองนึกว่าเรามีลูกกุญแจบ้าน เราไม่โพสต์รูปลูกกุญแจบน Facebook ฉันใด API Key ก็ไม่ควรอยู่ในโค้ดที่ Push ขึ้น GitHub ไฟล์ `.env` คือ "กล่องเก็บลูกกุญแจ" ที่ไม่ได้ Upload ขึ้น

```
❌ แบบผิด (API Key โชว์ใน GitHub):
const API_KEY = "sk-abc123xyz"

✅ แบบถูก (API Key อยู่ใน .env):
const API_KEY = import.meta.env.VITE_API_KEY
```

---

### 🌐 Free Public APIs — ทดลองได้เลยไม่ต้อง Key

| API | ทำอะไร | URL |
| --- | --- | --- |
| **JSONPlaceholder** | Fake Data สำหรับทดสอบ | jsonplaceholder.typicode.com |
| **PokeAPI** | ข้อมูล Pokemon ทั้งหมด | pokeapi.co/api/v2 |
| **RestCountries** | ข้อมูลประเทศทั่วโลก | restcountries.com/v3.1 |
| **TheMealDB** | สูตรอาหารจากทั่วโลก | themealdb.com/api |
| **wttr.in** | สภาพอากาศ ไม่ต้อง Key | wttr.in/\[เมือง\]?format=j1 |
| **Open Library** | ข้อมูลหนังสือ | openlibrary.org/search.json |

---

### 📡 วิธี Fetch ข้อมูลจาก API

**Pattern มาตรฐาน — ใช้ async/await + useState + useEffect:**

```
import { useState, useEffect } from 'react'

function UserList() {
  // 3 State ที่ต้องมีเสมอเมื่อ Fetch API
  const [users, setUsers]       = useState([])      // ข้อมูล
  const [isLoading, setIsLoading] = useState(true)  // กำลังโหลด
  const [error, setError]       = useState(null)    // ข้อผิดพลาด

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )

        // ตรวจสอบว่า Response สำเร็จหรือเปล่า
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`)
        }

        const data = await response.json()
        setUsers(data)

      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)  // ไม่ว่าจะสำเร็จหรือไม่ก็ปิด Loading
      }
    }

    fetchUsers()
  }, []) // [] = ดึงข้อมูลแค่ครั้งเดียวตอน Mount

  // แสดงผลตาม State
  if (isLoading) return <p>⏳ กำลังโหลด...</p>
  if (error)     return <p>❌ เกิดข้อผิดพลาด: {error}</p>

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} — {user.email}</li>
      ))}
    </ul>
  )
}
```

---

### 🔐 Environment Variables — เก็บข้อมูลลับให้ปลอดภัย

**ขั้นตอนการใช้ .env ใน Vite:**

```
# ขั้นตอนที่ 1: สร้างไฟล์ .env ใน Root Folder
# (อยู่ระดับเดียวกับ package.json)

# ขั้นตอนที่ 2: ใส่ Key ในไฟล์ .env
# *** ใน Vite ต้องขึ้นต้นด้วย VITE_ เสมอ ***
VITE_WEATHER_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.example.com

# ขั้นตอนที่ 3: ตรวจว่า .gitignore มีบรรทัดนี้
.env
.env.local
.env.*.local
```

**วิธีใช้ใน React:**

```
// เรียกใช้ผ่าน import.meta.env
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = import.meta.env.VITE_API_BASE_URL

const response = await fetch(
  `${BASE_URL}/weather?city=${city}&key=${API_KEY}`
)
```

**ความแตกต่างระหว่าง .env ใน Vite vs Next.js:**

```
# Vite → ต้องขึ้นต้นด้วย VITE_
VITE_API_KEY=xxx
# ใช้ใน Code: import.meta.env.VITE_API_KEY

# Next.js → ต้องขึ้นต้นด้วย NEXT_PUBLIC_ (ถ้าใช้ใน Frontend)
NEXT_PUBLIC_API_KEY=xxx
# ใช้ใน Code: process.env.NEXT_PUBLIC_API_KEY
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — JavaScript Fetch API ภาษาไทย**

[![Fetch TH](https://img.youtube.com/vi/Oive66jrwBs/0.jpg)](https://www.youtube.com/watch?v=Oive66jrwBs)

🔗 [https://www.youtube.com/watch?v=Oive66jrwBs](https://www.youtube.com/watch?v=Oive66jrwBs)

---

**วิดีโอ 2 — React Fetch API + useEffect (Traversy Media — English)**

[![React Fetch](https://img.youtube.com/vi/qdCHEUaFhBk/0.jpg)](https://www.youtube.com/watch?v=qdCHEUaFhBk)

🔗 [https://www.youtube.com/watch?v=qdCHEUaFhBk](https://www.youtube.com/watch?v=qdCHEUaFhBk)

> 💡 ดูช่วง 0:00–20:00 ครอบคลุม Fetch + Loading + Error State

---

### 📖 Further Reading

-   🔗 [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) — Free Test API
-   🔗 [rapidapi.com/hub](https://rapidapi.com/hub) — Browse APIs ทั้งหมดในโลก
-   🔗 [vitejs.dev/guide/env-and-mode](https://vitejs.dev/guide/env-and-mode) — Vite Env Variables

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` สำหรับโค้ด ⚠️ API Key จริงต้องใส่ใน .env เท่านั้น ห้ามวางใน Prompt หรือโค้ด

---

**Prompt 1 — สร้าง Data Fetching Component**

```
[Context] กำลังฝึก Fetch API ใน React
[Task] สร้าง Component ดึงข้อมูลจาก PokeAPI
[Spec]
- SearchBar: Input ชื่อ Pokemon + ปุ่ม Search
- PokemonCard: แสดงรูป, ชื่อ, Type, Stats
- State ต้องมี: pokemon, isLoading, error
- Loading State: แสดง Skeleton Loader (กล่องสีเทากระพริบ)
- Error State: แสดงข้อความ + ปุ่ม "ลองอีกครั้ง"
- API: https://pokeapi.co/api/v2/pokemon/[ชื่อ]
[Constraint] React + useEffect + useState เท่านั้น
แสดงผลเป็น Artifact
```

---

**Prompt 2 — ซ่อน API Key ด้วย .env**

```
[Context] ฉันมี API Key ที่ต้องใช้ในโปรเจกต์ Vite + React
[Task] ช่วยตั้งค่า Environment Variable อย่างปลอดภัย
[Spec]
1. สร้างไฟล์ .env ในโปรเจกต์
2. ตั้งชื่อ Variable ที่ถูกต้องสำหรับ Vite
3. เรียกใช้ใน React Component
4. ตรวจสอบว่า .gitignore ถูกต้อง
5. สร้างไฟล์ .env.example (ตัวอย่างไม่ใส่ Key จริง)
   เพื่อให้คนอื่นรู้ว่าต้องมี Variable อะไรบ้าง
[Constraint] อธิบาย Security Risk ของแต่ละขั้นตอนด้วย
```

---

**Prompt 3 — จัดการ Loading และ Error State**

```
[Context] ต่อจาก Component ที่ Fetch API แล้ว
[Task] เพิ่ม Professional Loading และ Error UI
[Spec]
Loading State:
- Skeleton Loader — กล่องสีเทา Pulse Animation
- แสดงแทน Content จริงระหว่างรอ

Error State:
- แสดง Error Icon + ข้อความที่อ่านรู้เรื่อง
- ปุ่ม "ลองใหม่" ที่ Fetch ซ้ำได้
- แยก Error: Network Error vs API Error vs Not Found

Empty State:
- ถ้าผลลัพธ์ว่างเปล่าแสดงข้อความ + Icon
[Constraint] ใช้ CSS Animation เท่านั้น ไม่ใช้ Library
```

---

**Prompt ฉุกเฉิน — CORS Error**

```
[Context] Fetch API แล้วเจอ CORS Error ใน Console
[Task] อธิบายว่า CORS คืออะไรและวิธีแก้
[Spec]
Error Message: [Copy Error จาก Console มา]
API ที่ใช้: [URL ของ API]
[Constraint] อธิบายแบบง่าย + บอกทางเลือกในการแก้ทั้งหมด
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

> 💡 สัปดาห์นี้รูปภาพมาจาก API โดยตรง (PokeAPI ส่งรูปมาให้) ไม่ต้องเตรียมรูปเอง

---

### 🛠️ Workshop — "Weather App + API Security"

> 🏷️ **Module ที่ใช้:** `Claude Chat` สำหรับโค้ด → `Terminal` รัน ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **ต้องมีก่อนเริ่ม:** React Project พร้อม + .env ในโปรเจกต์

**โจทย์ / Assignment:**

สร้าง Weather App ที่ดึงข้อมูลจาก API จริง โดยใช้ wttr.in (ไม่ต้อง API Key) และจัดการ Loading/Error State ครบ

---

**Checkpoint ก่อนเริ่ม:**

```
# ทดสอบ API ก่อนในเบราว์เซอร์
https://wttr.in/Bangkok?format=j1

# ถ้าเห็น JSON = API พร้อม ✅
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat`**

```
=== Iteration 1: App Structure ===
[Context] สร้าง Weather App ด้วย React + Vite
[Task] สร้างโครงสร้าง Component และ State
[Spec]
Components:
- App.jsx: Parent เก็บ State ทั้งหมด
- SearchBar.jsx: Input ชื่อเมือง + ปุ่ม Search
- WeatherCard.jsx: แสดงผลสภาพอากาศ
- LoadingState.jsx: Skeleton Loader
- ErrorState.jsx: Error Message + Retry

State ใน App:
- city: "" (String ชื่อเมืองที่ค้นหา)
- weather: null (Object ข้อมูลอากาศ)
- isLoading: false
- error: null

API: https://wttr.in/{city}?format=j1
[Constraint] React + Vite ยังไม่ต้องมี Style

=== Iteration 2: Fetch Logic ===
[Context] ต่อจาก Structure ที่มีอยู่
[Task] เพิ่ม Fetch Logic ครบ
[Spec]
- fetchWeather(city): async function ใน App.jsx
- จัดการ 3 State: isLoading, error, weather
- แสดง Temperature (°C), Humidity (%), Weather Description
- แปลง Weather Code เป็นข้อความภาษาไทย
  (เช่น Sunny = แดดจ้า, Cloudy = มีเมฆ, Rain = ฝนตก)
- ถ้าหาเมืองไม่เจอให้แสดง Error "ไม่พบเมืองนี้"
[Constraint] ใช้ async/await + try/catch เท่านั้น

=== Iteration 3: UI + Styling ===
[Context] ต่อจาก Logic ที่มีอยู่
[Task] เพิ่ม UI ที่สมบูรณ์
[Spec]
- Background เปลี่ยนตาม Weather: แดด=เหลือง, ฝน=น้ำเงิน, เมฆ=เทา
- Weather Icon (ใช้ Emoji): ☀️🌧️⛅🌩️
- Skeleton Loader แสดงระหว่างโหลด
- Error Message มีปุ่ม Retry
- Responsive ดีทั้ง Mobile และ Desktop
[Constraint] CSS Module หรือ Inline Style เท่านั้น

=== Iteration 4: Search History ===
[Context] ต่อจาก UI ที่มีอยู่
[Task] เพิ่ม Search History
[Spec]
- บันทึก 5 เมืองล่าสุดใน localStorage
- แสดงเป็น Chip ใต้ SearchBar
- คลิก Chip เพื่อค้นหาซ้ำได้
- ปุ่ม Clear History ลบทั้งหมด
[Constraint] ใช้ localStorage โดยตรง ไม่ใช้ Library
```

---

**ขั้นตอน Commit:**

```
git add .
git commit -m "feat: weather app with api fetch and search history"
git push
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| ค้นหาเมืองแล้วแสดงอุณหภูมิได้ | ข้อมูลแสดงถูกต้อง | Error หรือไม่แสดง |
| Loading Skeleton แสดงระหว่างรอ | เห็น Skeleton ก่อน Data | ไม่มี Loading |
| Error Message เมื่อหาเมืองไม่เจอ | แสดง Error ที่อ่านรู้เรื่อง | หน้าขาวหรือ Console Error |
| Background เปลี่ยนตาม Weather | สีเปลี่ยนได้ | Background เหมือนเดิมตลอด |
| Search History ใน localStorage | ล้าง Browser แล้วยังมีประวัติ | ประวัติหายทุกครั้งที่ Refresh |
| .env ไม่อยู่ใน GitHub | ตรวจใน Repo ไม่เห็น .env | เห็น .env ใน GitHub |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| CORS Error | API ไม่อนุญาต Browser Request | ถาม Claude: "วิธีแก้ CORS Error ใน Vite" |
| `undefined` จาก API | ชื่อ Field ผิด | `console.log(data)` ดู Structure จริงก่อน |
| .env ไม่ทำงาน | ไม่ได้ขึ้นต้นด้วย VITE\_ | เปลี่ยนเป็น `VITE_API_KEY` |
| localStorage ล้มเหลว | Browser Private Mode | ทดสอบใน Normal Mode |
| API ส่ง 404 | ชื่อเมืองผิดหรือ Encode ไม่ถูก | ใช้ `encodeURIComponent(city)` |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 9 ได้เลย!

---

---
