---
title: "Make.com / n8n + Webhook — ต่อหลาย Service ไม่ต้องโค้ด"
hours: 3
---

## 📅 สัปดาห์ที่ 18 — Make.com / n8n + Webhook — ต่อหลาย Service ไม่ต้องโค้ด

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Browser ไปที่ [make.com](https://make.com) → Sign Up ฟรี

**ถ้าเห็น Dashboard และสร้าง Scenario ได้ = พร้อมแล้ว ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Make.com คืออะไร?**

ลองนึกถึงโรงงานที่มี "สายพาน" เชื่อมเครื่องจักรต่างๆ เข้าด้วยกัน Make.com คือ "ระบบสายพาน" ที่เชื่อม App ต่างๆ เช่น Gmail, Google Sheets, Slack, Notion, Facebook เข้าด้วยกัน โดยไม่ต้องเขียนโค้ดเลย แค่ลากและวาง

```
ตัวอย่าง Scenario ที่สร้างได้ใน 5 นาที:
"เมื่อมีอีเมลใหม่ที่มีคำว่า 'Invoice' ในหัวข้อ
→ บันทึกลง Google Sheet
→ ส่ง Notification ไป Slack
→ สร้าง Task ใน Notion"
```

**Webhook คืออะไร?**

Webhook เหมือน "กริ่งประตูบ้าน" — เมื่อมีคนกดกริ่ง (ส่ง HTTP Request) บ้านจะรู้ทันที และทำงานบางอย่างตามที่กำหนด ต่างจาก API ที่เราต้องไป "เดินไปเปิดประตูดูเอง" (Polling) ทุกครั้ง

```
Polling (เก่า): เราถาม Server ทุก 1 นาทีว่า "มีอะไรใหม่ไหม?"
Webhook (ใหม่): Server แจ้งเราทันทีเมื่อมีเหตุการณ์ใหม่
```

---

### 🔀 Make.com vs Zapier vs n8n — เลือกอะไร?

```
Make.com:
✅ Visual Interface สวยมาก
✅ Free Tier: 1,000 Operations/เดือน
✅ รองรับ 1,000+ Apps
✅ Conditional Logic ซับซ้อนได้
❌ Paid Plan แพง ($9–$29/เดือน)
→ เหมาะกับ: Workflow ซับซ้อน หลาย Service

Zapier:
✅ ง่ายที่สุด มี Template เยอะ
✅ Free Tier: 100 Tasks/เดือน
❌ Free Tier น้อยมาก
→ เหมาะกับ: Workflow ง่าย 2 Step

n8n:
✅ Open Source — Self-host ฟรีไม่จำกัด
✅ Code Node เขียน JavaScript ได้
✅ Cloud: Free Tier 250 Executions/เดือน
❌ Self-host ต้องมี Server
→ เหมาะกับ: Developer ที่อยาก Control เต็มที่

สรุป:
→ มือใหม่ / Workflow ง่าย: Zapier
→ Workflow ซับซ้อน / หลาย App: Make.com
→ ต้องการ Free ไม่จำกัด / มีพื้นฐาน Dev: n8n
```

---

### 🔗 Webhook — รับและส่งข้อมูล

**ส่ง Webhook จาก App ของเรา:**

```
// เมื่อเกิด Event สำคัญใน App → ส่งไปที่ Webhook URL
const notifyWebhook = async (event, data) => {
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL
  // เช่น https://hook.eu2.make.com/abc123xyz

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event,          // เช่น "new_order", "user_registered"
      data,           // ข้อมูลที่เกี่ยวข้อง
      timestamp: new Date().toISOString()
    })
  })
}

// ใช้งาน:
await notifyWebhook('new_order', {
  orderId: '001',
  customer: 'สมชาย',
  total: 1500
})
// → Make.com รับข้อมูลนี้ แล้วทำ Action ต่อๆ ไป
```

**รับ Webhook ใน Vercel Serverless:**

```
// api/webhook.js — รับข้อมูลจาก Service ภายนอก
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  // Verify Signature (ถ้า Service รองรับ)
  // เช่น Stripe ส่ง stripe-signature header มาให้ตรวจ

  const payload = req.body
  const { event, data } = payload

  // ทำงานตาม Event Type
  switch (event) {
    case 'payment_success':
      await handlePaymentSuccess(data)
      break
    case 'new_subscriber':
      await handleNewSubscriber(data)
      break
    default:
      console.log('Unknown event:', event)
  }

  // ต้อง Return 200 เร็วๆ ไม่งั้น Service จะ Retry
  return res.status(200).json({ received: true })
}
```

---

### 🗺️ Scenario ตัวอย่างใน Make.com

**Scenario 1: Form Submit → Slack + Sheet**

```
Trigger: Webhook (รับข้อมูลจาก Contact Form ของเรา)
    ↓
Action 1: Google Sheets → Add Row (บันทึกข้อมูล)
    ↓
Action 2: Slack → Send Message (แจ้งทีม)
    ↓
Action 3: Gmail → Send Email (ส่ง Confirmation ให้ผู้ส่ง)
```

**Scenario 2: New GitHub Issue → Notion Task**

```
Trigger: GitHub → Watch Issues (ดู Issue ใหม่)
    ↓
Filter: ถ้า Label = "bug"
    ↓
Action: Notion → Create Page (สร้าง Task ใน Bug Tracker)
```

**Scenario 3: RSS Feed → Daily Email Digest**

```
Trigger: RSS → Watch Items (ดู Article ใหม่)
    ↓
Aggregator: รวม Article ทั้งวัน
    ↓
Schedule: รอถึง 8:00 น.
    ↓
Action: Gmail → Send Email (ส่ง Daily Digest)
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Make.com เบื้องต้น ภาษาไทย**

[![Make TH](https://img.youtube.com/vi/KBTIUhEkW_0/0.jpg)](https://www.youtube.com/watch?v=KBTIUhEkW_0)

🔗 [https://www.youtube.com/watch?v=KBTIUhEkW\_0](https://www.youtube.com/watch?v=KBTIUhEkW_0)

---

**วิดีโอ 2 — Make.com Full Tutorial (English)**

[![Make EN](https://img.youtube.com/vi/JSA2oezQWOU/0.jpg)](https://www.youtube.com/watch?v=JSA2oezQWOU)

🔗 [https://www.youtube.com/watch?v=JSA2oezQWOU](https://www.youtube.com/watch?v=JSA2oezQWOU)

> 💡 ดูช่วง 0:00–20:00 เรียนรู้วิธีสร้าง Scenario แรก

---

**วิดีโอ 3 — Webhooks Explained (Fireship — English)**

[![Webhook](https://img.youtube.com/vi/mrkQ5iLb4DM/0.jpg)](https://www.youtube.com/watch?v=mrkQ5iLb4DM)

🔗 [https://www.youtube.com/watch?v=mrkQ5iLb4DM](https://www.youtube.com/watch?v=mrkQ5iLb4DM)

> 💡 ดูเพื่อเข้าใจ Concept ของ Webhook ใน 8 นาที

---

### 📖 Further Reading

-   🔗 [make.com/en/help](https://www.make.com/en/help) — Make.com Help Center
-   🔗 [docs.n8n.io](https://docs.n8n.io) — n8n Official Docs
-   🔗 [pipedream.com](https://pipedream.com) — ตัวเลือกที่ 4 (Free tier ใจดี)

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` สร้างโค้ด Webhook 🏷️ **Make.com Scenario: ตั้งค่าผ่าน Make.com Dashboard**

---

**Prompt 1 — สร้าง Webhook Sender จาก App**

```
[Context] ฉันมี [App ที่สร้างไว้] และต้องการส่ง Event ไป Make.com
[Task] สร้าง Webhook Integration ใน App
[Spec]
Events ที่ต้องการส่ง:
1. [Event 1 เช่น new_user_registered]
   Payload: [Field ที่ต้องการ]
2. [Event 2 เช่น order_placed]
   Payload: [Field ที่ต้องการ]

Webhook URL: ดึงจาก import.meta.env.VITE_WEBHOOK_URL
[Constraint]
- ส่ง Webhook แบบ Fire-and-forget (ไม่รอ Response)
- Handle Error แบบ Silent (ไม่ให้ UX พัง)
- อธิบาย วิธีสร้าง Webhook ใน Make.com ด้วย
```

---

**Prompt 2 — สร้าง Webhook Receiver ใน Serverless**

```
[Context] ต้องการรับ Webhook จาก [ชื่อ Service เช่น Stripe, GitHub]
[Task] สร้าง Vercel Serverless Function รับ Webhook
[Spec]
Service: [ชื่อ]
Events ที่รับ: [รายการ Events]
เมื่อรับแล้วต้องทำ:
1. [Action 1]
2. [Action 2]
[Constraint]
- Verify Signature ถ้า Service รองรับ
- Return 200 ทันที ทำ Heavy Processing แบบ Async
- Log ทุก Event สำหรับ Debugging
```

---

**Prompt ฉุกเฉิน — Webhook ไม่ทำงาน**

```
[Context] ส่ง Webhook แล้วไม่มีอะไรเกิดขึ้นใน Make.com
[Task] ช่วย Debug Webhook
[Spec]
โค้ดที่ส่ง Webhook:
[วางโค้ด]
Make.com Webhook URL ที่ใช้: [ไม่ต้องใส่ URL จริง แต่บอก Format]
สิ่งที่เห็นใน Network Tab: [Status Code / Response]
[Constraint]
- ตรวจ Content-Type Header
- ตรวจ Make.com Webhook History
- บอกวิธี Test Webhook โดยใช้ curl หรือ Postman
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

> 💡 สัปดาห์นี้ทำงานกับ Automation ไม่ต้องใช้รูปภาพ

---

### 🛠️ Workshop — "Contact Form → Webhook → Multi-channel Notification"

> 🏷️ **โค้ด: ใช้ใน `Claude Chat`** 🏷️ **Make.com Scenario: ตั้งค่าผ่าน Make.com Dashboard** ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **ต้องมีก่อนเริ่ม:** Make.com Account + React App จากสัปดาห์ก่อน

**โจทย์ / Assignment:**

เพิ่ม Webhook Integration ให้ Portfolio Contact Form — เมื่อมีคนส่งฟอร์มจะ Trigger Make.com ซึ่งจะบันทึกลง Sheet และส่ง Notification พร้อมกัน

---

**Checkpoint ก่อนเริ่ม:**

```
✅ Portfolio App จากสัปดาห์ก่อนมี Contact Form
✅ สมัคร Make.com แล้ว
✅ สร้าง Google Sheet ใหม่สำหรับ Contact Submissions
   Columns: timestamp | name | email | message | source
```

---

**Part A — ตั้งค่า Make.com Scenario (ทำผ่าน Dashboard)**

```
Scenario ที่ต้องสร้าง:

1. Trigger: Webhooks → Custom Webhook
   → Copy Webhook URL ที่ได้ → ใส่ใน .env VITE_WEBHOOK_URL

2. Action 1: Google Sheets → Add a Row
   → เลือก Sheet ที่สร้างไว้
   → Map Fields: timestamp, name, email, message, source

3. Action 2: Gmail → Send an Email
   → To: [admin email ของคุณ]
   → Subject: "Contact Form: {{name}}"
   → Body: "จาก: {{name}} ({{email}})\n\n{{message}}"

4. ทดสอบโดยคลิก Run ครั้งแรกใน Make.com
   แล้วส่ง Test Webhook จาก Terminal:
   curl -X POST [WEBHOOK_URL] \
   -H "Content-Type: application/json" \
   -d '{"name":"ทดสอบ","email":"test@test.com","message":"Hello"}'
```

---

**Part B — เชื่อม Contact Form กับ Webhook (ใช้ใน `Claude Chat`)**

```
=== Prompt: เพิ่ม Webhook ใน Contact Form ===
[Context] ต่อจาก Portfolio Contact Form ที่มีอยู่
[Task] เพิ่ม Webhook ส่งข้อมูลไป Make.com เมื่อ Submit
[Spec]
เมื่อ Form Submit สำเร็จ:
1. ส่ง POST ไป VITE_WEBHOOK_URL พร้อม Payload:
   { name, email, message,
     source: "portfolio-contact-form",
     timestamp: ISO string }
2. ไม่รอ Webhook Response (Fire-and-forget)
3. ถ้า Webhook พัง → แสดง Warning ใน Console แต่ UX ไม่พัง
   (Form ยังส่งได้ปกติ)

UI:
- Success Message หลัง Submit: "ส่งข้อความแล้ว จะติดต่อกลับเร็วๆ นี้"
- ปิด Form Modal หลัง Submit สำเร็จ
[Constraint] Webhook URL ต้องดึงจาก .env เท่านั้น
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| กรอก Form แล้วข้อมูลบันทึกลง Google Sheet | Row ใหม่ปรากฏใน Sheet | Sheet ว่าง |
| Admin ได้รับ Email Notification | Email มาภายใน 2 นาที | ไม่ได้รับ |
| ถ้า Webhook พัง Form ยังส่งได้ | UX ปกติ | Form พังตาม |
| Webhook URL อยู่ใน .env ไม่โชว์ใน Code | ตรวจใน GitHub ไม่เห็น | URL โชว์ใน Code |
| Make.com Scenario Run สำเร็จ | เห็น Execution History | Error ทุกครั้ง |
| Commit ขึ้น GitHub | มี Commit ใหม่ | ยังไม่ Commit |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| Make.com ไม่รับ Webhook | Scenario ยังไม่ได้ Activate | Toggle Scenario เป็น ON |
| Google Sheet ไม่ได้รับ Row | Column Mapping ผิดใน Make.com | ตรวจ Field Mapping ใน Scenario |
| CORS Error ตอนส่ง Webhook | Make.com ไม่รองรับ CORS โดยตรง | ส่งผ่าน Serverless Function แทน |
| Webhook Timeout | Make.com ตอบช้า | ใช้ `Promise.race` กับ Timeout 5 วินาที |

---

> 🎯 ผ่านทุกข้อ → **Phase 5 เสร็จสมบูรณ์!** พร้อมเข้า Phase 6

---

## 🏁 Phase 5 Summary — สิ่งที่ได้เรียนรู้ทั้งหมด

```
✅ รู้จัก Public APIs 20+ รายการ แยกตามประเภทและ Free Tier
✅ ค้นหา API ใหม่ได้เองจาก RapidAPI, public-apis.io
✅ ดึง 2+ APIs พร้อมกันด้วย Promise.all / Promise.allSettled
✅ ใช้ Google Sheets เป็น Database ง่ายๆ ผ่าน SheetDB
✅ แปลง Type จาก Sheets String → ประเภทที่ถูกต้องได้
✅ เขียน Apps Script สำหรับ Automate Google Workspace ได้
✅ ตั้ง Time-driven Trigger และ onFormSubmit Trigger ได้
✅ ส่ง Email อัตโนมัติจาก Apps Script ได้
✅ สร้าง Make.com Scenario เชื่อมหลาย Service ได้
✅ ส่งและรับ Webhook ใน App ได้อย่างถูกต้อง
✅ รู้ความต่างระหว่าง Make.com, Zapier, n8n เลือกได้ถูกโจทย์
```

**Deliverables (ชิ้นงาน) จาก Phase 5:**

-   📊 **Multi-API Dashboard** — ดึงข้อมูล 3 APIs พร้อมกัน Auto-refresh (สัปดาห์ 15)
-   🛍️ **Product Catalog** — Google Sheet เป็น Database แก้ไขได้ทีมทุกคน (สัปดาห์ 16)
-   📧 **Contact Automation** — Form → Sheet → Email อัตโนมัติด้วย Apps Script (สัปดาห์ 17)
-   🔗 **Webhook Integration** — Portfolio Form ส่ง Notification ผ่าน Make.com (สัปดาห์ 18)

---

> ⏭️ **Phase 6 ถัดไป:** โปรเจกต์จริง + Deploy + Portfolio — Context Setting, System Prompt, Git Branch Strategy, โปรเจกต์จบ และสร้าง Portfolio ที่แชร์ได้
