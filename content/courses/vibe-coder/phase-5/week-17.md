---
title: "Google Apps Script — Automate Google Workspace"
hours: 3
---

## 📅 สัปดาห์ที่ 17 — Google Apps Script — Automate Google Workspace

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Google Sheet ใดก็ได้ → เมนู **Extensions → Apps Script**

**ถ้าเห็น Script Editor เปิดขึ้นมา = พร้อมแล้ว ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Apps Script คืออะไร?**

Apps Script คือ JavaScript ที่รันได้ใน Google Workspace ทั้งหมด เหมือนมี "รีโมคคอนโทรล" สำหรับควบคุม Sheets, Docs, Gmail, Calendar, Drive ได้ทุกอย่างด้วยโค้ด

```
ถ้า Google Workspace เป็นบ้าน:
Apps Script คือ Smart Home Controller
ที่ตั้งโปรแกรมได้ว่า "เมื่อเกิด A ให้ทำ B"

ตัวอย่างจริง:
→ มีคนกรอก Form → ส่ง Email ยืนยันอัตโนมัติ
→ ทุกวันจันทร์ 8 โมง → สร้าง Report แล้วส่ง Email ทีม
→ มีข้อมูลใหม่ใน Sheet → สร้าง Slide สรุปอัตโนมัติ
```

**ข้อดีเหนือ Make.com/Zapier:**

```
✅ ฟรี 100% ไม่มี Limit (ในขอบเขต Google)
✅ เข้าถึง Google Services ได้ลึกกว่า
✅ Logic ซับซ้อนได้เต็มที่เพราะเป็น JavaScript
✅ ไม่ต้องพึ่ง Third-party Service
```

---

### 🔧 Apps Script — ตัวอย่างโค้ดจริง

**1\. อ่านและเขียนข้อมูลใน Google Sheet**

```
// เปิดใช้งานจาก Extensions → Apps Script ใน Sheet

function readAndProcessData() {
  // เข้าถึง Sheet ปัจจุบัน
  const sheet = SpreadsheetApp.getActiveSheet()

  // ดึงข้อมูลทั้งหมด (Row 2 เป็นต้นไป ข้าม Header)
  const lastRow  = sheet.getLastRow()
  const lastCol  = sheet.getLastColumn()
  const data     = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues()

  // วน Loop ประมวลผล
  data.forEach((row, index) => {
    const name   = row[0]  // Column A
    const email  = row[1]  // Column B
    const amount = row[2]  // Column C

    // ทำอะไรกับข้อมูล...
    Logger.log(`${name}: ${email} - ${amount}`)
  })
}

function writeToSheet(rowData) {
  const sheet = SpreadsheetApp.getActiveSheet()
  // เพิ่ม Row ใหม่ท้ายสุด
  sheet.appendRow(rowData)
  // rowData = [value1, value2, value3, ...]
}
```

**2\. ส่ง Email อัตโนมัติ**

```
function sendEmailReport() {
  const sheet = SpreadsheetApp.getActiveSheet()
  const data  = sheet.getRange("A2:C10").getValues()

  // สร้างเนื้อหา Email
  let body = "สรุปรายการประจำวัน\n\n"
  data.forEach(row => {
    body += `• ${row[0]}: ${row[1]} (${row[2]})\n`
  })

  // ส่ง Email
  GmailApp.sendEmail(
    "manager@company.com",           // To
    "รายงานประจำวัน " + new Date().toLocaleDateString('th-TH'),  // Subject
    body,                            // Plain Text Body
    {
      htmlBody: `<pre>${body}</pre>` // HTML Body (Optional)
    }
  )

  Logger.log("ส่ง Email เรียบร้อย")
}
```

**3\. Trigger อัตโนมัติตามเวลา**

```
// ตั้ง Trigger ผ่าน UI: Triggers (นาฬิกา) → Add Trigger
// หรือสร้างผ่านโค้ด:

function createTimeTrigger() {
  // รันทุกวันจันทร์เวลา 8:00–9:00
  ScriptApp.newTrigger('sendEmailReport')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(8)
    .create()
}

// Trigger Types:
// .everyMinutes(n)   → ทุก n นาที (1, 5, 10, 15, 30)
// .everyHours(n)     → ทุก n ชั่วโมง
// .everyDays(n)      → ทุก n วัน
// .onWeekDay(day)    → ทุกวันที่กำหนด
// .atDate(year,m,d)  → วันที่กำหนด
```

**4\. รับข้อมูลจาก Google Form (onFormSubmit)**

```
// Trigger: onFormSubmit
// สร้างใน Form → Linked Sheet → Extensions → Apps Script

function onFormSubmit(e) {
  // e.values = Array ของคำตอบ ตามลำดับ Field ในฟอร์ม
  const [timestamp, name, email, message] = e.values

  // ส่ง Confirmation Email ให้ผู้กรอก
  GmailApp.sendEmail(
    email,
    "ได้รับข้อความของคุณแล้ว",
    `สวัสดีคุณ ${name}\n\nเราได้รับข้อความของคุณแล้ว จะติดต่อกลับภายใน 24 ชั่วโมง\n\nข้อความ: ${message}`
  )

  // บันทึก Status ลง Column ถัดไป
  const sheet = SpreadsheetApp.getActiveSheet()
  const lastRow = sheet.getLastRow()
  sheet.getRange(lastRow, 5).setValue("Sent ✅")
}
```

**5\. เชื่อม API ภายนอกจาก Apps Script**

```
function fetchExternalData() {
  // Apps Script ใช้ UrlFetchApp แทน fetch()
  const url = "https://api.exchangerate-api.com/v4/latest/THB"
  const response = UrlFetchApp.fetch(url)
  const data     = JSON.parse(response.getContentText())

  // เขียนอัตราแลกเปลี่ยนลง Sheet
  const sheet = SpreadsheetApp.getActiveSheet()
  const rates = data.rates

  Object.entries(rates).forEach(([currency, rate], i) => {
    sheet.getRange(i + 1, 1).setValue(currency)
    sheet.getRange(i + 1, 2).setValue(rate)
  })
}
```

---

### 🗂️ Apps Script เชื่อม Google Services ได้ทั้งหมด

| Service | Object | ตัวอย่างการใช้ |
| --- | --- | --- |
| Google Sheets | `SpreadsheetApp` | อ่าน/เขียน/สร้าง Sheet |
| Google Docs | `DocumentApp` | สร้าง Document จาก Template |
| Gmail | `GmailApp` | ส่ง/อ่าน Email |
| Google Calendar | `CalendarApp` | สร้าง Event, ส่ง Invite |
| Google Drive | `DriveApp` | สร้างโฟลเดอร์, ย้ายไฟล์, แชร์ |
| Google Forms | `FormApp` | อ่านคำตอบ, สร้าง Form |
| Google Slides | `SlidesApp` | สร้าง Presentation |
| URL Fetch | `UrlFetchApp` | เรียก External API |
| HTML Service | `HtmlService` | สร้าง Web UI |

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Google Apps Script เบื้องต้น ภาษาไทย**

[![Apps Script TH](https://img.youtube.com/vi/Nd3DV_heK2Q/0.jpg)](https://www.youtube.com/watch?v=Nd3DV_heK2Q)

🔗 [https://www.youtube.com/watch?v=Nd3DV\_heK2Q](https://www.youtube.com/watch?v=Nd3DV_heK2Q)

---

**วิดีโอ 2 — Automate Google Sheets with Apps Script (Coding with Curt — English)**

[![Apps Script CwC](https://img.youtube.com/vi/pHyCxAnOFZI/0.jpg)](https://www.youtube.com/watch?v=pHyCxAnOFZI)

🔗 [https://www.youtube.com/watch?v=pHyCxAnOFZI](https://www.youtube.com/watch?v=pHyCxAnOFZI)

> 💡 Coding with Curt เป็นช่องที่ดีที่สุดสำหรับ Apps Script — ดูช่วง 0:00–20:00

---

**วิดีโอ 3 — Send Emails Automatically (Apps Script — English)**

[![Apps Script Email](https://img.youtube.com/vi/tQnnADSqe34/0.jpg)](https://www.youtube.com/watch?v=tQnnADSqe34)

🔗 [https://www.youtube.com/watch?v=tQnnADSqe34](https://www.youtube.com/watch?v=tQnnADSqe34)

---

### 📖 Further Reading

-   🔗 [developers.google.com/apps-script](https://developers.google.com/apps-script) — Official Docs
-   🔗 [developers.google.com/apps-script/reference](https://developers.google.com/apps-script/reference) — API Reference ครบ

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` — เขียนโค้ด Apps Script 🏷️ **รันโค้ด: Extensions → Apps Script ใน Google Sheet**

---

**Prompt 1 — สร้าง Apps Script ครั้งแรก**

```
[Context] ฉันกำลังใช้ Google Sheet เก็บข้อมูล [ประเภทข้อมูล]
Sheet มี Columns: [รายชื่อ Columns]
[Task] เขียน Apps Script สำหรับ [งานที่ต้องการ Automate]
[Spec]
งานที่ต้องการ:
1. [งานที่ 1 เช่น ส่ง Email ทุก Row ที่ Status = "Pending"]
2. [งานที่ 2 เช่น ตั้ง Trigger รันทุกวันจันทร์]
[Constraint]
- อธิบายทุกบรรทัดด้วย Comment ภาษาไทย
- บอกวิธีตั้ง Trigger (ผ่าน UI หรือโค้ด)
- บอก Permission ที่ต้อง Allow เมื่อรันครั้งแรก
```

---

**Prompt 2 — Form → Sheet → Email อัตโนมัติ**

```
[Context] มี Google Form เชื่อมกับ Sheet แล้ว
Form Fields: [รายชื่อ Fields ในฟอร์ม]
[Task] เขียน onFormSubmit Script
[Spec]
เมื่อมีคนกรอก Form ให้:
1. ส่ง Confirmation Email ไปที่ Email ที่กรอกในฟอร์ม
2. ส่ง Notification Email ไปที่ [admin@email.com]
3. เขียน Timestamp ลง Column สุดท้ายว่า "Processed at [วันเวลา]"
[Constraint]
- อธิบายวิธีเชื่อม Trigger กับ Form
- Handle กรณีที่ Email ไม่ถูก Format
```

---

**Prompt ฉุกเฉิน — Script Error**

```
[Context] Apps Script รันแล้วได้ Error
[Task] ช่วย Debug Script
[Spec]
Error Message ใน Execution Log:
[Copy Error มา]
โค้ดที่มีปัญหา:
[วางโค้ด]
Sheet Structure:
[อธิบาย Column]
[Constraint]
- อธิบายสาเหตุก่อน Fix
- บอกวิธีดู Logger.log ด้วย
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

> 💡 สัปดาห์นี้ทำงานใน Google Workspace ไม่ต้องเตรียมรูปสำหรับ Web App

---

### 🛠️ Workshop — "Contact Form → Sheet → Email อัตโนมัติ"

> 🏷️ **โค้ด Apps Script: เขียนใน `Claude Chat` แล้ว Copy ไปรันใน Script Editor** ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **ต้องมีก่อนเริ่ม:** Google Account + Google Sheet ว่างๆ

**โจทย์ / Assignment:**

สร้างระบบรับ Contact Form ที่สมบูรณ์ โดยเชื่อม Google Form → Google Sheet → Apps Script → Email อัตโนมัติ ทั้งหมดฟรี 100%

---

**Checkpoint ก่อนเริ่ม:**

```
1. สร้าง Google Form มี Fields:
   ชื่อ (Short answer) | อีเมล (Short answer) |
   หัวข้อ (Dropdown: ทั่วไป/ซื้อสินค้า/แจ้งปัญหา) | ข้อความ (Paragraph)
2. Responses → Link to Sheets → สร้าง Sheet ใหม่
3. เปิด Sheet ที่ได้ → Extensions → Apps Script
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat` แล้ว Copy ไปใส่ Script Editor**

```
=== Script 1: onFormSubmit Handler ===
[Context] Google Form เชื่อมกับ Sheet แล้ว
Form Fields ตามลำดับ: Timestamp, ชื่อ, อีเมล, หัวข้อ, ข้อความ
[Task] เขียน onFormSubmit Function ครบ
[Spec]
เมื่อมีคนกรอก Form:

1. ส่ง Auto-reply Email ไปที่ผู้กรอก:
   - Subject: "ได้รับข้อความของคุณแล้ว — [ชื่อผู้กรอก]"
   - Body: ขอบคุณ + สรุปข้อมูลที่ส่งมา + บอกว่าจะตอบกลับใน 24 ชม.
   - ใช้ HTML Email (มีสีและ Formatting สวยงาม)

2. ส่ง Internal Notification ไปที่ admin@yoursite.com:
   - Subject: "[หัวข้อ] จาก [ชื่อ] — ต้องตอบกลับ"
   - Body: ข้อมูลทั้งหมดในรูปแบบที่อ่านง่าย

3. อัพเดต Status Column ใน Sheet:
   - เพิ่ม Column "Status" และเขียน "Sent ✅ [เวลา]"

[Constraint]
- ใส่ Comment อธิบายทุกส่วนสำคัญ
- Handle Error ถ้า Email ไม่ถูก Format
- บอกวิธีตั้ง Trigger onFormSubmit

=== Script 2: Weekly Summary Report ===
[Context] ต่อจาก Script เดิม
[Task] เขียน Function ส่ง Weekly Summary ทุกวันจันทร์
[Spec]
- ดึงข้อมูล 7 วันล่าสุดจาก Sheet
- สรุป: จำนวน Submission ทั้งหมด แบ่งตาม หัวข้อ
- สร้าง HTML Email ที่มีตารางสรุป
- ส่งไปที่ admin@yoursite.com
- บันทึกลง Sheet ว่าส่ง Report แล้ว

[Constraint]
- บอกวิธีสร้าง Time-driven Trigger ทุกวันจันทร์ 8:00
- อธิบายวิธีดู Execution Log ถ้า Script พัง

=== Script 3: ทดสอบทุกอย่าง ===
[Context] ต่อจาก Scripts ทั้งสอง
[Task] เขียน Test Function สำหรับทดสอบโดยไม่ต้องกรอก Form จริง
[Spec]
- testOnFormSubmit(): สร้าง Mock e.values แล้วเรียก onFormSubmit
- testWeeklyReport(): เรียก Weekly Summary โดยตรง
- ทั้งสองแสดงผลใน Logger ว่าทำงานถูกต้อง
[Constraint] อธิบายวิธีรัน Test Function จาก Script Editor
```

---

**ขั้นตอนหลังได้โค้ดจาก Claude:**

```
1. Copy โค้ดแต่ละ Script ไปวางใน Script Editor
2. บันทึก (Ctrl+S)
3. รัน testOnFormSubmit() ก่อน → ดู Execution Log
4. ถ้าขอ Permission → Allow ทั้งหมด
5. ตั้ง Trigger: Triggers → Add Trigger
   Function: onFormSubmit | Event source: From spreadsheet
   Event type: On form submit
6. ทดสอบโดยกรอก Google Form จริง
7. ตรวจ Email ว่าได้รับหรือเปล่า
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| กรอก Form แล้วได้ Auto-reply Email ทันที | Email มาภายใน 1 นาที | ไม่ได้รับ Email |
| Admin ได้รับ Notification Email | Email ถึง Admin | Admin ไม่ได้รับ |
| Sheet มี Status Column อัพเดต | เห็น "Sent ✅" | Column ว่าง |
| Weekly Report Function รันได้ | Logger แสดงผล OK | Error ทุกครั้ง |
| Trigger ตั้งเรียบร้อย | เห็นใน Triggers Dashboard | ยังไม่มี Trigger |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| `Exception: You do not have permission` | ยังไม่ได้ Allow OAuth | รัน Function ด้วยตนเองก่อน แล้วกด Allow |
| `ReferenceError: e is not defined` | รัน onFormSubmit โดยตรง | ใช้ testOnFormSubmit() ที่มี Mock e |
| Email ไม่ถึง | Gmail Block หรือ Format ผิด | ตรวจ Spam Folder + ตรวจ Email Format |
| `Exceeded maximum execution time` | Script รันนานเกิน 6 นาที | แบ่ง Batch ประมวลผลทีละส่วน |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 18 ได้เลย!

---

---
