---
title: "Public APIs + Free APIs — ต่อ App กับ Data ภายนอก"
hours: 3
---

## 📅 สัปดาห์ที่ 15 — Public APIs + Free APIs — ต่อ App กับ Data ภายนอก

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Browser ไปที่ URL นี้:

```
https://api.coindesk.com/v1/bpi/currentprice.json
```

**ถ้าเห็น JSON ราคา Bitcoin = API ทำงานได้ ✅** นี่คือ Free API ที่ไม่ต้องสมัครอะไรเลย

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Public API คืออะไร?**

ลองนึกถึงห้องสมุดขนาดใหญ่มากๆ ที่เปิดให้ทุกคนเข้าไปยืมหนังสือได้ฟรี — Public API ก็คือ "ห้องสมุดข้อมูล" ที่บริษัทหรือองค์กรต่างๆ เปิดให้ Developer ดึงข้อมูลไปใช้ได้ บางแห่งเปิดให้ฟรีทั้งหมด บางแห่งให้ใช้ฟรีแต่จำกัดจำนวน

```
ข้อดีของการใช้ Public API:
→ ไม่ต้องเก็บข้อมูลเอง
→ ข้อมูลอัพเดตเสมอโดยผู้เชี่ยวชาญ
→ ประหยัดเวลามหาศาล
→ บาง API มีข้อมูลที่เราไม่มีทางสร้างเองได้เลย
   (เช่น อัตราแลกเปลี่ยน, สภาพอากาศ, ข้อมูลยา)
```

---

### 🗂️ Free Public APIs — รวมทั้งหมดที่ใช้บ่อย

**กลุ่มที่ 1 — ไม่ต้อง API Key เลย (เรียกได้ทันที)**

| API | ข้อมูล | URL |
| --- | --- | --- |
| **JSONPlaceholder** | Fake Data สำหรับทดสอบ | jsonplaceholder.typicode.com |
| **PokeAPI** | Pokemon ทั้งหมด | pokeapi.co/api/v2 |
| **RestCountries** | ข้อมูลประเทศทั่วโลก | restcountries.com/v3.1/all |
| **TheMealDB** | สูตรอาหาร | themealdb.com/api/json/v1/1 |
| **TheCocktailDB** | สูตรเครื่องดื่ม | thecocktaildb.com/api/json/v1/1 |
| **Open Library** | ข้อมูลหนังสือ | openlibrary.org/search.json |
| **wttr.in** | สภาพอากาศ | wttr.in/{city}?format=j1 |
| **CoinDesk** | ราคา Bitcoin | api.coindesk.com/v1/bpi/currentprice.json |
| **Numbers API** | ข้อเท็จจริงเกี่ยวกับตัวเลข | numbersapi.com/{number} |
| **Dog CEO** | รูปสุนัขแบบสุ่ม | dog.ceo/api/breeds/image/random |
| **Random User** | User ปลอมสำหรับทดสอบ | randomuser.me/api |

**กลุ่มที่ 2 — ต้อง API Key (สมัครฟรีได้)**

| API | ข้อมูล | สมัครที่ | Free Tier |
| --- | --- | --- | --- |
| **OpenWeatherMap** | สภาพอากาศละเอียด | openweathermap.org/api | 1,000 calls/วัน |
| **CoinGecko** | ราคา Crypto ทุกเหรียญ | coingecko.com/api | 10,000 calls/เดือน |
| **NewsAPI** | ข่าวจากทั่วโลก | newsapi.org | 100 calls/วัน |
| **exchangerate-api** | อัตราแลกเปลี่ยน | exchangerate-api.com | 1,500 calls/เดือน |
| **Unsplash** | รูปภาพฟรี | unsplash.com/developers | 50 calls/ชม. |
| **TMDB** | ข้อมูลหนัง/ซีรีส์ | themoviedb.org/settings/api | ไม่จำกัด |
| **Spoonacular** | สูตรอาหารละเอียด | spoonacular.com/food-api | 150 points/วัน |

**กลุ่มที่ 3 — สำหรับ Dev เฉพาะทาง**

| API | ข้อมูล | URL |
| --- | --- | --- |
| **IP API** | ข้อมูล Location จาก IP | ip-api.com/json |
| **QR Code** | สร้าง QR Code | api.qrserver.com/v1/create-qr-code |
| **Google Translate** | แปลภาษา (ต้องมี Key) | cloud.google.com/translate |
| **DictionaryAPI** | พจนานุกรมอังกฤษ | api.dictionaryapi.dev/api/v2/entries/en |

---

### 🔍 วิธีค้นหา API ใหม่ๆ

```
แหล่งค้นหา:
→ rapidapi.com/hub        — Marketplace API ใหญ่ที่สุด
→ public-apis.io          — List API ฟรีแบบ Open Source
→ apis.guru               — OpenAPI Directory
→ programmableweb.com     — API Directory
→ any-api.com             — ค้นหา API แบบ Category

วิธีค้นหาใน RapidAPI:
1. ไปที่ rapidapi.com/hub
2. พิมพ์สิ่งที่ต้องการ เช่น "football", "recipe", "weather"
3. กรอง: Free / Freemium
4. ดู Documentation ก่อนใช้งาน
```

---

### 🔗 Pattern การใช้ 2 API พร้อมกัน

**ตัวอย่าง: แสดงสภาพอากาศ + รูปเมืองจาก Unsplash**

```
const fetchCityData = async (city) => {
  // เรียก 2 API พร้อมกันด้วย Promise.all
  // เร็วกว่าเรียกทีละตัว
  const [weatherRes, photoRes] = await Promise.all([
    fetch(`/api/weather?city=${city}`),        // Serverless ซ่อน Key
    fetch(`/api/city-photo?query=${city}`)     // Serverless ซ่อน Key
  ])

  const weather = await weatherRes.json()
  const photo   = await photoRes.json()

  return { weather, photo }
}
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Public APIs คืออะไร ใช้ยังไง (ภาษาไทย)**

[![API TH](https://img.youtube.com/vi/GZvSYJDk-us/0.jpg)](https://www.youtube.com/watch?v=GZvSYJDk-us)

🔗 [https://www.youtube.com/watch?v=GZvSYJDk-us](https://www.youtube.com/watch?v=GZvSYJDk-us)

---

**วิดีโอ 2 — APIs for Beginners (freeCodeCamp — English)**

[![API fCC](https://img.youtube.com/vi/WXsD0ZgxjRw/0.jpg)](https://www.youtube.com/watch?v=WXsD0ZgxjRw)

🔗 [https://www.youtube.com/watch?v=WXsD0ZgxjRw](https://www.youtube.com/watch?v=WXsD0ZgxjRw)

> 💡 ดูช่วง 0:00–25:00 เข้าใจ API + HTTP + JSON ครบ

---

**วิดีโอ 3 — 5 Free APIs เจ๋งที่ควรรู้ (Fireship — English)**

[![Free APIs](https://img.youtube.com/vi/nHzKzBMHENw/0.jpg)](https://www.youtube.com/watch?v=nHzKzBMHENw)

🔗 [https://www.youtube.com/watch?v=nHzKzBMHENw](https://www.youtube.com/watch?v=nHzKzBMHENw)

---

### 📖 Further Reading

-   🔗 [rapidapi.com/hub](https://rapidapi.com/hub) — Browse APIs ทั้งหมด
-   🔗 [public-apis.io](https://public-apis.io) — Free Public APIs List
-   🔗 [any-api.com](https://any-api.com) — API Directory

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` สร้างโค้ด 🏷️ **API Keys ที่ต้องซ่อน: ใส่ใน .env + ผ่าน Serverless Function**

---

**Prompt 1 — ต่อ App กับ 2 APIs พร้อมกัน**

```
[Context] ฉันกำลังสร้าง Dashboard ที่ดึงข้อมูลจากหลาย API พร้อมกัน
[Task] สร้าง React Component ดึง 2 API พร้อมกันด้วย Promise.all
[Spec]
API 1: [ชื่อ API + Endpoint + ข้อมูลที่ต้องการ]
API 2: [ชื่อ API + Endpoint + ข้อมูลที่ต้องการ]

State ที่ต้องการ:
- data1, data2: ผลลัพธ์จากแต่ละ API
- isLoading: Boolean รวม
- errors: Object { api1: null, api2: null }

UI:
- แสดง Loading Skeleton ระหว่างรอทั้ง 2 API
- ถ้า API 1 พัง แต่ API 2 ยังทำงาน → แสดงเฉพาะที่ทำงานได้
[Constraint] ใช้ Promise.all ไม่ใช่ await ทีละตัว
อธิบายความต่างระหว่าง Promise.all กับ Promise.allSettled ด้วย
```

---

**Prompt 2 — สร้าง API Explorer Component**

```
[Context] ฉันอยากสำรวจ API ใหม่ที่ไม่รู้จัก
[Task] สร้าง Component ทดสอบ API Response แบบ Visual
[Spec]
- Input: URL ของ API
- ปุ่ม Fetch: เรียก API แล้วแสดงผล
- แสดง Response ในรูป JSON Tree ที่ขยาย/ยุบได้
- แสดง Status Code, Response Time, Headers
- ปุ่ม Copy Response to Clipboard
[Constraint] ใช้ React เท่านั้น ไม่ต้องมี Backend
อธิบาย CORS Limitation ที่จะเจอด้วย
```

---

**Prompt ฉุกเฉิน — ไม่รู้จัก API ที่อยากใช้**

```
[Context] ฉันต้องการข้อมูล [ประเภทข้อมูล] สำหรับ App ของฉัน
[Task] แนะนำ Public API ที่เหมาะสม
[Spec]
- บอก URL + วิธีเรียก
- ต้องมี API Key ไหม ถ้ามีสมัครได้ที่ไหน ฟรีไหม
- ตัวอย่าง Response JSON จริงๆ
- ข้อจำกัด Rate Limit ที่ควรรู้
[Constraint] แนะนำมา 3 ตัวเลือก เรียงจากง่ายไปยาก
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

> 💡 สัปดาห์นี้ใช้รูปจาก APIs โดยตรง ไม่ต้องเตรียมเอง เช่น Dog CEO API ส่งรูปสุนัขมาให้ / Unsplash API ส่งรูปเมืองมาให้

---

### 🛠️ Workshop — "Multi-API Dashboard"

> 🏷️ **Module ที่ใช้:** `Claude Chat` ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **ต้องมีก่อนเริ่ม:** React Project + .env พร้อม

**โจทย์ / Assignment:**

สร้าง Personal Dashboard ที่ดึงข้อมูลจากอย่างน้อย 3 APIs พร้อมกัน โดยเลือก API ได้อย่างอิสระจากตารางด้านบน

---

**Checkpoint ก่อนเริ่ม:**

```
✅ เลือก 3 APIs ที่อยากแสดงบน Dashboard
✅ เปิดดู API Response ในเบราว์เซอร์ก่อนว่า Structure เป็นยังไง
✅ วางแผนว่าแต่ละ API จะแสดงใน Widget ไหน
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat`**

```
=== Iteration 1: Dashboard Layout ===
[Context] สร้าง Personal Dashboard ดึงข้อมูลจาก 3 APIs
[Task] สร้าง Layout + Widget System
[Spec]
APIs ที่เลือก:
1. [ชื่อ API 1] — แสดง [ข้อมูลอะไร]
2. [ชื่อ API 2] — แสดง [ข้อมูลอะไร]
3. [ชื่อ API 3] — แสดง [ข้อมูลอะไร]

Layout:
- Grid ที่ปรับ Widget ขนาดต่างกันได้
- Widget แต่ละอันมี: Header, Content Area, Last Updated Time
- Refresh ปุ่มในแต่ละ Widget
- Color Theme: เลือกเอง

[Constraint] ยังไม่ต้องเรียก API จริง ใช้ Mock Data ก่อน
สร้าง Widget Component ที่ Reusable ได้

=== Iteration 2: เชื่อม APIs จริง ===
[Context] ต่อจาก Layout
[Task] เชื่อม API จริงทั้ง 3 ตัว
[Spec]
- เรียกทั้ง 3 API พร้อมกันด้วย Promise.allSettled
  (allSettled = ถ้าบางตัวพังก็ยังแสดงที่เหลือได้)
- แต่ละ Widget มี isLoading, error, data State แยกกัน
- Auto-refresh ทุก [X] นาที ตาม Nature ของข้อมูล
  เช่น Crypto = ทุก 30 วินาที / Weather = ทุก 10 นาที
[Constraint] API ที่ต้องซ่อน Key ให้ผ่าน Serverless Function

=== Iteration 3: UX ครบ ===
[Context] ต่อจาก API Integration
[Task] เพิ่ม UX ที่สมบูรณ์
[Spec]
- Skeleton Loader แต่ละ Widget มีลักษณะตาม Content
- Error State: แสดง Icon + ข้อความ + ปุ่ม Retry
- Last Refresh Time: "อัพเดตเมื่อ 2 นาทีที่แล้ว"
- Network Status: แจ้งเตือนถ้า Offline
- Persist Last Data: ถ้า Refresh แล้วพัง ยังแสดงข้อมูลเก่าไปก่อน
[Constraint] localStorage สำหรับ Persist ข้อมูลล่าสุด
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| แสดงข้อมูลจาก 3 APIs พร้อมกัน | ครบทุก Widget | บาง Widget ว่าง |
| ถ้า 1 API พัง Widget อื่นยังทำงาน | isolate ได้ | ทั้งหน้าพังพร้อมกัน |
| Skeleton Loader ต่างกันตาม Widget | ดูเหมือน Content จริง | Spinner เดิมทุกอัน |
| Auto-refresh ทำงาน | ข้อมูลอัพเดตเองโดยไม่ต้อง Reload | ต้อง Reload ทุกครั้ง |
| API Key ที่ต้องซ่อนผ่าน Serverless | Network Tab ไม่เห็น Key | Key โชว์ใน URL |
| Commit ขึ้น GitHub | มี Commit ใหม่ | ยังไม่ Commit |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| CORS Error จาก API | API ไม่อนุญาต Browser Request | ผ่าน Serverless Function แทน |
| Rate Limit 429 | เรียก API บ่อยเกิน | เพิ่ม Debounce + Cache ผลลัพธ์ชั่วคราว |
| JSON Parse Error | API ส่ง HTML Error แทน JSON | ตรวจ `response.ok` ก่อน `.json()` |
| Auto-refresh ทำ Memory Leak | ไม่ได้ Clear Interval | `return () => clearInterval(id)` ใน useEffect |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 16 ได้เลย!

---

---
