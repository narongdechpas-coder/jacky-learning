---
title: "Deploy + Optimization — Live บน Internet พร้อม"
hours: 3
---

## 📅 สัปดาห์ที่ 23 — Deploy + Optimization — Live บน Internet พร้อม

### ⏱️ เวลาโดยประมาณ

ศึกษา 30 นาที + Deploy 1 ชม. + Optimize 1.5 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

```
npm run build
```

**ถ้า Build สำเร็จ 0 Error = พร้อม Deploy ✅** ถ้ามี Error → แก้ก่อน Deploy เสมอ

---

### 🚀 Deploy บน Vercel — Checklist ครบ

**ขั้นตอน Deploy Final Project:**

```
1. ตรวจ Pre-deploy Checklist ให้ผ่านทั้งหมด

2. Merge ทุก Branch เข้า main
   git checkout dev
   git merge feature/[ทุก branch]
   git checkout main
   git merge dev
   git push origin main

3. ไปที่ vercel.com → New Project
   → Import จาก GitHub → เลือก Repo

4. Configure:
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Root Directory: . (ถ้าไม่มี Monorepo)

5. Environment Variables:
   → เพิ่มทุก Variable จาก .env.example
   → ใส่ค่าจริงใน Value

6. Deploy → รอ Build ~1 นาที

7. ได้ URL เช่น https://my-app.vercel.app
```

---

### ⚡ Performance Optimization

**วัด Performance ก่อน Optimize:**

```
1. เปิด App บน Chrome
2. F12 → Lighthouse Tab
3. คลิก "Analyze page load"
4. ดูคะแนน Performance, Accessibility, SEO

เป้าหมาย:
Performance  ≥ 80 ✅
Accessibility ≥ 90 ✅
Best Practices ≥ 90 ✅
SEO ≥ 80 ✅
```

**เทคนิค Optimize ที่ทำได้ทันที:**

```
// 1. Lazy Load Component ที่ไม่ได้ใช้ทันที
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('./components/HeavyChart'))

function App() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <HeavyChart />
    </Suspense>
  )
}

// 2. useMemo — คำนวณซ้ำแค่เมื่อ Dependency เปลี่ยน
const expensiveTotal = useMemo(() => {
  return transactions.reduce((sum, t) => sum + t.amount, 0)
}, [transactions])  // คำนวณใหม่แค่เมื่อ transactions เปลี่ยน

// 3. useCallback — ป้องกัน Re-render ที่ไม่จำเป็น
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id))
}, [])  // Function เดิมไม่สร้างใหม่ทุก Render
```

**Image Optimization:**

```
<!-- ใช้ loading="lazy" สำหรับรูปที่อยู่ด้านล่าง -->
<img src="photo.jpg" loading="lazy" alt="description" />

<!-- กำหนด width/height ป้องกัน Layout Shift -->
<img src="photo.jpg" width="400" height="300" alt="description" />
```

---

### 🌐 Custom Domain (Optional)

```
ถ้าต้องการ Domain เช่น myapp.com:

1. ซื้อ Domain จาก:
   - Namecheap (~$10/ปี)
   - Google Domains (~$12/ปี)
   - Cloudflare Registrar (~$8/ปี) — ราคาต้นทุน แนะนำ

2. ไปที่ Vercel → Project → Settings → Domains
   → Add Domain → myapp.com

3. Vercel จะบอก DNS Records ที่ต้องตั้ง
   → ไปที่ Domain Provider → DNS Settings
   → เพิ่ม Records ตามที่ Vercel บอก

4. รอ DNS Propagate ~1-24 ชั่วโมง
```

---

### 📱 ทดสอบ Cross-device ก่อน Share

```
ทดสอบบน:
✅ Chrome Desktop (1280px+)
✅ Chrome Mobile (F12 → iPhone SE 375px)
✅ มือถือจริง (เปิด URL แล้วทดสอบ)
✅ Safari บน iPhone (ถ้าเป็นไปได้)
✅ Firefox (ตรวจ CSS Compatibility)

สิ่งที่ต้องทดสอบ:
✅ Login/Register ทำงาน
✅ CRUD ทุก Feature
✅ Loading State ทุก Async Call
✅ Error State เมื่อ Network หาย
✅ Empty State เมื่อไม่มีข้อมูล
✅ ปุ่มทุกปุ่มกดได้บน Mobile
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Deploy React บน Vercel ภาษาไทย**

[![Deploy TH](https://img.youtube.com/vi/w-M_yZzyzQA/0.jpg)](https://www.youtube.com/watch?v=w-M_yZzyzQA)

🔗 [https://www.youtube.com/watch?v=w-M\_yZzyzQA](https://www.youtube.com/watch?v=w-M_yZzyzQA)

---

**วิดีโอ 2 — React Performance Tips (Codevolution — English)**

[![React Perf](https://img.youtube.com/vi/4FhJkX18fS8/0.jpg)](https://www.youtube.com/watch?v=4FhJkX18fS8)

🔗 [https://www.youtube.com/watch?v=4FhJkX18fS8](https://www.youtube.com/watch?v=4FhJkX18fS8)

---

### 📖 Further Reading

-   🔗 [vercel.com/docs/deployments/overview](https://vercel.com/docs/deployments/overview)
-   🔗 [web.dev/measure](https://web.dev/measure) — วัด Lighthouse Score ออนไลน์
-   🔗 [bundlephobia.com](https://bundlephobia.com) — ตรวจขนาด npm Package

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` + Terminal + Vercel Dashboard

---

**Prompt 1 — สร้าง README ที่สมบูรณ์**

```
[Context] Final Project เสร็จและ Deploy แล้ว
[Task] เขียน README.md ที่สมบูรณ์
[Spec]
App: [ชื่อ + อธิบายสั้น]
URL: [Vercel URL]
Tech Stack: [Stack ที่ใช้]
Features: [List Feature ทั้งหมด]

README ต้องมี:
1. Project Banner (Badges + Screenshot Description)
2. Live Demo URL
3. Features List พร้อม GIF/Screenshot
4. Tech Stack พร้อม Version
5. Getting Started (Clone + Install + Setup .env + Run)
6. Environment Variables Table
7. Folder Structure
8. Contributing (ถ้า Open Source)
9. License
[Constraint] เขียน Markdown ที่สวยงาม ใช้ Emoji ประกอบ
```

---

**Prompt 2 — Optimize Lighthouse Score**

```
[Context] App Deploy แล้ว Lighthouse Score ต่ำกว่าเป้าหมาย
[Task] วิเคราะห์และแก้ไข Performance Issues
[Spec]
Lighthouse Report:
Performance: [คะแนน]
Issues ที่ Lighthouse ระบุ: [Copy Issues มา]
Stack: [Stack ที่ใช้]
[Constraint]
- แก้ Issues ที่ Impact สูงที่สุดก่อน
- อธิบาย Why ของแต่ละ Fix
- บอกเวลาที่คาดว่าจะดีขึ้นเท่าไหร่
```

---

### Acceptance Criteria สัปดาห์ 23 ✅

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| App Live มี HTTPS URL | เปิดได้จากมือถือ | Build Error |
| Lighthouse Performance ≥ 70 | Score ≥ 70 | Score < 70 |
| ทดสอบ Cross-device ผ่าน | Mobile ไม่แตก | Layout พัง |
| README.md ครบสมบูรณ์ | มีทุกหัวข้อ | มีแค่ชื่อ App |
| .env.example อยู่ใน GitHub | ดูเห็น | ไม่มี |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| Vercel Build Error | TypeScript หรือ Import ผิด | ดู Build Log ใน Vercel → Functions |
| Env Variables ใช้ไม่ได้บน Production | ลืมตั้งใน Vercel Dashboard | Settings → Environment Variables |
| Firebase Auth Blocked บน Production | Domain ไม่ได้ Authorized | Firebase Console → Auth → Authorized Domains |
| Lighthouse Score ต่ำมาก | รูปใหญ่เกิน, JS Bundle ใหญ่ | ถาม Claude: "วิธีลด Bundle Size สำหรับ \[Stack\]" |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 24 ได้เลย!

---

---
