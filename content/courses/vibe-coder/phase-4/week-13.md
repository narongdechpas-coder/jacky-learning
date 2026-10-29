---
title: "Serverless Functions + Security + Deploy"
hours: 3
---

## 📅 สัปดาห์ที่ 13 — Serverless Functions + Security + Deploy

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Browser ไปที่ [vercel.com](https://vercel.com) → Login ด้วย GitHub

**ถ้าเข้าได้และเห็น Dashboard = พร้อมแล้ว ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Serverless Function คืออะไร?**

ปกติถ้าจะมี Backend ต้องมี Server ที่เปิดทำงานตลอด 24 ชั่วโมง ซึ่งแพงและซับซ้อน Serverless Function คือ "ฟังก์ชันที่รันเมื่อถูกเรียก" เหมือนแท็กซี่ที่มาเมื่อโทรเรียก ไม่ต้องจ้างคนขับให้จอดรอตลอดวัน

```
ปัญหาที่ Serverless แก้ได้:
Frontend มี API Key → ทุกคนเห็นใน Browser ❌

ทางแก้:
Frontend → เรียก Serverless Function (ไม่มี Key)
Serverless Function → มี API Key อยู่ฝั่ง Server
                    → เรียก External API แทน
                    → ส่งผลลัพธ์กลับให้ Frontend ✅
```

**Vercel คืออะไร?**

Vercel คือแพลตฟอร์ม Deploy เว็บที่ง่ายที่สุด เชื่อมกับ GitHub แล้ว Push Code ก็ Deploy อัตโนมัติ มี Serverless Functions ในตัว และ Free Plan ใจดีมากสำหรับโปรเจกต์ส่วนตัว

---

### 🔧 Vercel Serverless Functions

**โครงสร้าง Folder สำหรับ API Route:**

```
my-project/
├── api/                    ← Vercel จะสร้าง Route จาก Folder นี้
│   ├── weather.js          → GET /api/weather
│   ├── translate.js        → GET /api/translate
│   └── send-email.js       → POST /api/send-email
├── src/
│   └── ...
└── package.json
```

**ตัวอย่าง Serverless Function — ซ่อน API Key:**

```
// api/weather.js
export default async function handler(req, res) {
  // ดึง Query Parameter จาก Request
  const { city } = req.query

  if (!city) {
    return res.status(400).json({ error: 'ต้องระบุชื่อเมือง' })
  }

  try {
    // API Key อยู่ฝั่ง Server — ไม่โชว์ใน Browser ✅
    // ใน Vercel ตั้งค่าใน Project Settings → Environment Variables
    // ไม่ต้องมี VITE_ Prefix เพราะไม่ใช่ Frontend
    const apiKey = process.env.WEATHER_API_KEY

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=th`
    )

    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.status}`)
    }

    const data = await response.json()

    // CORS Header — อนุญาต Frontend เรียกได้
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(200).json(data)

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
```

**เรียกจาก Frontend:**

```
// ❌ อย่าเรียก External API โดยตรง (Key โชว์)
const res = await fetch(
  `https://api.openweather.org/...&appid=${API_KEY}`
)

// ✅ เรียกผ่าน Serverless Function แทน
const res = await fetch(`/api/weather?city=${city}`)
const data = await res.json()
```

---

### 🚀 Deploy บน Vercel — Step by Step

**ขั้นตอน Deploy ครั้งแรก:**

```
1. Push โค้ดขึ้น GitHub ให้เรียบร้อย
   (ตรวจว่า .env ไม่ติดไปด้วย!)

2. ไปที่ vercel.com → New Project

3. Import Git Repository → เลือก Repo จาก GitHub

4. Configure Project:
   - Framework Preset: Vite (เลือกอัตโนมัติ)
   - Build Command: npm run build
   - Output Directory: dist

5. Environment Variables:
   → เพิ่มทุกตัวจาก .env ของเรา
   → ไม่ต้องมี VITE_ Prefix ก็ได้ใน Vercel
   → แต่ถ้าใช้ใน Frontend ต้องมี VITE_ เหมือนเดิม

6. คลิก Deploy → รอ ~1 นาที

7. ได้ URL เช่น: https://my-app.vercel.app ✅
```

**Auto Deploy เมื่อ Push:**

```
ทุกครั้งที่ git push → Vercel Deploy อัตโนมัติ
ไม่ต้องทำอะไรเพิ่ม ✅

Production Branch: main
Preview Branch: ทุก Branch อื่น → ได้ Preview URL แยก
```

---

### 🔐 Security Best Practices

**1\. Environment Variables ใน Production:**

```
# Development (.env — ไม่ Push GitHub)
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=eyJ...
WEATHER_API_KEY=abc123   # Server-side เท่านั้น

# Production (ตั้งใน Vercel Dashboard)
# ไม่มีไฟล์ .env บน Server ต้องตั้งผ่าน Dashboard
```

**2\. CORS — ควบคุมใครเรียก API เราได้:**

```
// api/weather.js
export default async function handler(req, res) {
  // อนุญาตเฉพาะ Domain ของเรา
  const allowedOrigins = [
    'https://my-app.vercel.app',
    'http://localhost:5173',  // Dev
  ]

  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  // Handle OPTIONS (Preflight Request)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  // ... โค้ดหลัก
}
```

**3\. Rate Limiting — ป้องกัน Abuse:**

```
// ใช้ Vercel KV หรือ Upstash Redis สำหรับ Rate Limit
// สำหรับมือใหม่ ใช้วิธีง่ายๆ ก่อน:
// ตรวจว่า Request มาจาก Header ที่ถูกต้อง

export default async function handler(req, res) {
  // ตรวจ Method
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  // Validate Input ก่อนใช้เสมอ
  const { city } = req.query
  if (!city || city.length > 100 || /[<>{}]/.test(city)) {
    return res.status(400).json({ error: 'Invalid city name' })
  }

  // ... โค้ดหลัก
}
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Vercel Deploy + Serverless Functions (ภาษาไทย)**

[![Vercel TH](https://img.youtube.com/vi/bZmfHun1kl4/0.jpg)](https://www.youtube.com/watch?v=bZmfHun1kl4)

🔗 [https://www.youtube.com/watch?v=bZmfHun1kl4](https://www.youtube.com/watch?v=bZmfHun1kl4)

---

**วิดีโอ 2 — Vercel Serverless Functions (Fireship — English)**

[![Vercel Fireship](https://img.youtube.com/vi/nbNY3cT0dU0/0.jpg)](https://www.youtube.com/watch?v=nbNY3cT0dU0)

🔗 [https://www.youtube.com/watch?v=nbNY3cT0dU0](https://www.youtube.com/watch?v=nbNY3cT0dU0)

---

### 📖 Further Reading

-   🔗 [vercel.com/docs/functions](https://vercel.com/docs/functions) — Serverless Functions Docs
-   🔗 [vercel.com/docs/deployments/environments](https://vercel.com/docs/deployments/environments)

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` สร้างโค้ด 🏷️ **Deploy: ทำผ่าน Vercel Dashboard**

---

**Prompt 1 — สร้าง Serverless Function**

```
[Context] ฉันมี React App บน Vercel ต้องการซ่อน API Key
[Task] สร้าง Serverless Function สำหรับ [ชื่อ API ที่ใช้]
[Spec]
API ที่ต้องการเรียก: [URL และ Params ที่ต้องการ]
Key ที่ต้องซ่อน: [ชื่อ ENV Variable — ไม่ใส่ค่าจริง]
Input ที่รับจาก Frontend: [Query Params หรือ Body]
Output ที่ส่งกลับ: [Structure ของ Response]
[Constraint]
- Validate Input ก่อนใช้เสมอ
- Handle Error ทุกกรณี
- เพิ่ม CORS Header ที่เหมาะสม
```

---

**Prompt 2 — ตรวจสอบความปลอดภัยก่อน Deploy**

```
[Context] App ใกล้พร้อม Deploy แล้ว
[Task] ช่วย Security Checklist ก่อน Go Live
[Spec] App ที่สร้าง: [อธิบาย App สั้นๆ]
โค้ดส่วนที่สงสัย: [วางโค้ดที่ไม่แน่ใจ]
[Constraint]
ตรวจสอบ:
1. API Keys หรือ Secrets โชว์ใน Client Code ไหม?
2. Input Validation ครบหรือเปล่า?
3. Error Message เปิดเผยข้อมูล Internal ไหม?
4. CORS ตั้งค่าถูกต้องไหม?
5. .env อยู่ใน .gitignore ไหม?
```

---

**Prompt ฉุกเฉิน — Deploy แล้วพัง**

```
[Context] Deploy ขึ้น Vercel แล้ว App พัง
[Task] ช่วย Debug Build Error
[Spec]
Error จาก Vercel Build Log:
[Copy Error มา]
โค้ดที่เกี่ยวข้อง: [วางโค้ด]
[Constraint] อธิบายสาเหตุและวิธีแก้ทีละขั้น
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

> 💡 สัปดาห์นี้เน้น Backend และ Deploy ไม่ต้องเตรียมรูปใหม่

---

### 🛠️ Workshop — "Weather App ที่ปลอดภัย + Deploy"

> 🏷️ **Prompt: ใช้ใน `Claude Chat`** 🏷️ **Deploy: ทำผ่าน Vercel Dashboard** ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **ต้องมีก่อนเริ่ม:** Vercel Account + GitHub Repo พร้อม

**โจทย์ / Assignment:**

นำ Weather App จากสัปดาห์ 8 มา Upgrade ให้ซ่อน API Key ด้วย Serverless Function แล้ว Deploy ขึ้น Vercel จริง มี URL ที่เปิดได้จากอินเทอร์เน็ต

---

**Checkpoint ก่อนเริ่ม:**

```
✅ Weather App จากสัปดาห์ 8 อยู่บน GitHub
✅ Vercel Account เชื่อมกับ GitHub แล้ว
✅ ได้ API Key จาก openweathermap.org (ฟรี สมัครได้เลย)
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat`**

```
=== Prompt 1: Serverless Function ===
[Context] Weather App ที่มีอยู่เรียก API โดยตรงจาก Frontend
[Task] ย้ายการเรียก API ไปไว้ใน Serverless Function
[Spec]
สร้างไฟล์ api/weather.js:
- รับ Query Param: city (string)
- Validate: city ต้องมี ยาวไม่เกิน 100 ตัวอักษร
- เรียก OpenWeatherMap API ด้วย process.env.WEATHER_API_KEY
- Return: temperature, description, humidity, icon, city name
- Error Cases: City Not Found (404), API Error (500)
- CORS: อนุญาต localhost:5173 และ Production Domain

Frontend: เปลี่ยนจากเรียก API โดยตรง → เรียก /api/weather?city=...
[Constraint] API Key ต้องไม่โชว์ในโค้ด Frontend เลย

=== Prompt 2: Environment Variables Setup ===
[Context] ต่อจาก Serverless Function
[Task] สร้าง .env.example และ README สำหรับ Setup
[Spec]
.env.example (ไฟล์ตัวอย่างที่ Push GitHub ได้):
- แสดงชื่อ Variable ทุกตัวโดยไม่มีค่าจริง
- มี Comment อธิบายแต่ละตัวว่าหาได้ที่ไหน

README.md Section "Setup":
- วิธีสมัคร OpenWeatherMap API Key
- วิธีสร้างไฟล์ .env จาก .env.example
- วิธี Deploy ขึ้น Vercel พร้อมตั้ง Environment Variables
[Constraint] README ต้องอ่านแล้วทำตามได้โดยไม่ต้องถามใคร

=== Prompt 3: Pre-deploy Checklist ===
[Context] App ใกล้พร้อม Deploy แล้ว
[Task] ตรวจสอบ Security และ Production Readiness
[Spec]
ตรวจสอบโค้ดทั้งหมดและบอก:
1. มี API Key หลุดในโค้ด Frontend ไหม?
2. มี console.log ที่ไม่ควรอยู่ไหม?
3. Error Message เปิดเผยข้อมูล Sensitive ไหม?
4. .env อยู่ใน .gitignore ไหม?
5. Build จะสำเร็จไหม (มี Import ที่ผิดไหม)?
[Constraint] แสดงเป็น Checklist ✅ / ❌ / ⚠️
```

---

**ขั้นตอน Deploy:**

```
# 1. Commit และ Push ขึ้น GitHub
git add .
git commit -m "feat: serverless weather api + production ready"
git push

# 2. ไปที่ vercel.com → New Project → Import Repo นี้
# 3. เพิ่ม Environment Variable: WEATHER_API_KEY = [Key จริง]
# 4. Deploy → รอ Build เสร็จ
# 5. ได้ URL https://your-app.vercel.app ✅
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| App Live บน Vercel มี HTTPS URL | เปิด URL ได้จากมือถือ | Build Error |
| เปิด DevTools Network Tab ไม่เห็น API Key | Key ไม่โชว์ใน Request | Key โชว์ใน URL |
| Serverless Function Return ข้อมูลถูกต้อง | Weather แสดงผลได้ | Function Error |
| .env.example อยู่ใน GitHub | ดูใน Repo เห็น .env.example | ไม่มี |
| .env จริงไม่อยู่ใน GitHub | ดูใน Repo ไม่เห็น .env | เห็น .env |
| README มีวิธี Setup ครบ | อ่านแล้วทำตามได้ | ไม่มี README |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| Build Error: `Cannot find module` | Import Path ผิด | ตรวจ Case Sensitivity ของชื่อไฟล์ |
| Function Timeout | API ภายนอกช้าเกิน 10 วินาที | เพิ่ม Timeout ใน Fetch หรือเลือก API ที่เร็วกว่า |
| CORS Error บน Production | Domain ไม่ได้อยู่ใน Allow List | เพิ่ม Vercel Domain ใน CORS Header |
| `process.env.X is undefined` | ลืมตั้ง Env ใน Vercel Dashboard | ไปตั้งใน Vercel → Settings → Environment Variables |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 14 ได้เลย!

---

---
