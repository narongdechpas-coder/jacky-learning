---
title: "สร้าง Dashboard ด้วย Looker Studio"
hours: 2.5
---

## 📅 สัปดาห์ที่ 8 — สร้าง Dashboard ด้วย Looker Studio

### ⏱️ เวลาโดยประมาณ

ศึกษา 1.5 ชม. + Workshop 1.5 ชม.

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

นึกถึงหน้าปัดรถยนต์ 🚗 — มีมาตรวัดความเร็ว, ระดับน้ำมัน, อุณหภูมิเครื่อง ทั้งหมดอยู่ในที่เดียว มองทีเดียวรู้สถานะรถทันที ไม่ต้องเปิดฝากระโปรงเช็คทุกครั้ง

**Dashboard** ก็เหมือนหน้าปัดของข้อมูล — รวมกราฟ/ตัวเลขสำคัญไว้ในหน้าเดียว และที่เจ๋งคือถ้าข้อมูลต้นทาง (Google Sheets) เปลี่ยน Dashboard จะอัปเดตให้เองอัตโนมัติ

### 📖 เนื้อหาหลัก

#### 1\. ขั้นตอนเชื่อม Google Sheets กับ Looker Studio

1.  เข้า [Looker Studio](https://lookerstudio.google.com) → `Create` > `Report`
2.  เลือก Connector: **Google Sheets** → เลือกไฟล์และ Sheet ที่ต้องการ
3.  Looker Studio จะดึง column ทั้งหมดมาให้เป็น "Field" พร้อมเดา Data Type ให้ (ตรวจสอบตามหลักสัปดาห์ 1 ว่าเดาถูกไหม)

#### 2\. การจัด Layout ของ Dashboard

| ส่วน | ใส่อะไร |
| --- | --- |
| **บนสุด** | ชื่อ Dashboard + ช่วงเวลาของข้อมูล + Filter control (เช่น เลือกสาขา/เดือน) |
| **แถวแรก** | ตัวเลขสรุปสำคัญที่สุด (Scorecard) เช่น ยอดขายรวม, ค่าใช้จ่ายรวม |
| **แถวกลาง** | กราฟหลักตาม Insight อันดับ 1-2 (มักเป็น Bar/Line) |
| **แถวล่าง** | กราฟเสริม/รายละเอียดเพิ่มเติม |

> 💡 หลักเดียวกับสัปดาห์ที่ 5: เรียง insight สำคัญที่สุดไว้บนสุด/ซ้ายสุด เพราะคนดูจะเห็นก่อน

![ตัวอย่าง Layout ของ Dashboard — 4 โซนหลัก: Header+Filter, Scorecard, กราฟหลัก, รายละเอียด](/courses/data-analysis-viz/images/phase3/phase3-dashboard-layout.webp)

#### 3\. Filter Control

เพิ่ม `Add a control` > `Drop-down list` เพื่อให้คนดู Dashboard เลือกดูเฉพาะสาขา/ช่วงเวลาที่สนใจได้เอง โดยกราฟทั้งหมดจะกรองตามค่าที่เลือก

### ⚡ Quick Win (ทดสอบได้ใน 5 นาที)

1.  เชื่อม Google Sheets (ตารางจาก Phase 1-2) เข้า Looker Studio
2.  ลาก Chart แบบ Bar มาวาง 1 อัน → เลือก Dimension = "ประเภท", Metric = "จำนวนเงิน" (SUM)
3.  ดูว่ากราฟแสดงผลรวมค่าใช้จ่ายแยกตามประเภทถูกต้องไหม

✅ ถ้ากราฟแสดงข้อมูลตรงกับ Pivot Table ที่ทำไว้ใน Phase 1 → ผ่าน!

### 💬 Prompt สำเร็จรูป

ใช้ใน **Claude Chat** ให้ช่วยออกแบบ layout ของ Dashboard:

```
[Context] ฉันมี Insight 3 อันดับ: (1) ค่าอาหารคิดเป็น 30% ของค่าใช้จ่ายรวม (2) ค่าใช้จ่ายรวมเพิ่มขึ้น 20% จากสัปดาห์ก่อน (3) ค่าเดินทางลดลง 10%
[Task] ช่วยออกแบบ layout ของ Dashboard ใน Looker Studio ว่าควรมี chart อะไร วางตรงไหน
[Spec] บอกประเภทกราฟ (Bar/Line/Pie/Scorecard) และตำแหน่ง (บน/กลาง/ล่าง) ของแต่ละ insight
[Constraint] Dashboard มีพื้นที่ประมาณ 1 หน้าจอ ไม่ต้อง scroll เยอะ
```

### 🛠️ Workshop + โจทย์

1.  เชื่อมข้อมูลจาก Phase 1-2 เข้า Looker Studio
2.  สร้าง Dashboard 1 หน้า ประกอบด้วย:
    -   Scorecard สรุปยอดรวม 1-2 ตัว
    -   กราฟตาม Insight อันดับ 1 และ 2 (เลือกประเภทกราฟตามสัปดาห์ 7)
    -   Filter control อย่างน้อย 1 ตัว (เช่น เลือกประเภท/สัปดาห์)
3.  ลองเปลี่ยนค่าใน Filter control แล้วเช็คว่ากราฟอัปเดตตามถูกต้อง

### ✅ Acceptance Criteria

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| เชื่อมข้อมูล | Looker Studio ดึงข้อมูลจาก Sheets ได้ถูก field/ถูก type | field แสดงผิด type (เช่น ตัวเลขกลายเป็น Text) |
| Layout | Insight สำคัญอยู่บน/แถวแรก ตามหลักสัปดาห์ 5 | จัดเรียงแบบสุ่ม ไม่มีลำดับความสำคัญ |
| Filter control | เลือกค่าแล้วกราฟทั้งหมดอัปเดตตาม | Filter ไม่ทำงาน หรือกราฟบางตัวไม่ตอบสนอง |

### 🚨 Common Errors

| Error | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| ตัวเลขใน Looker Studio ไม่ตรงกับ Sheets | Field ถูกตั้งเป็น Data Type ผิด (เช่น Text แทน Number) | คลิก field > เปลี่ยน Type เป็น Number/Currency ให้ตรง |
| เพิ่มข้อมูลใน Sheets แล้ว Dashboard ไม่อัปเดต | Cache ของ data source ยังไม่ refresh | คลิกขวาที่ chart > `Refresh data` หรือรอ auto-refresh |
| Filter เลือกแล้วบาง chart ไม่เปลี่ยน | chart นั้นใช้ data source คนละตัว หรือไม่ได้เชื่อมกับ filter | ตรวจสอบว่าทุก chart ใช้ data source เดียวกัน |

### 📖 Further Reading

-   Looker Studio Help: "Connect to Google Sheets" (ค้นใน Help Center ของ Looker Studio)

---
