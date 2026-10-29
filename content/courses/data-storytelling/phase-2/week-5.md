---
title: "Data Visualization — เลือก Chart ให้ถูกประเภท"
hours: 3
---

## 📅 สัปดาห์ที่ 5 — Data Visualization — เลือก Chart ให้ถูกประเภท

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

ดูรูปนี้แล้วบอกว่า Chart ไหนเหมาะกับข้อมูลแบบไหน:

```
ข้อมูล A: ยอดขายรายเดือน ม.ค.–ธ.ค.
ข้อมูล B: สัดส่วนลูกค้าแยกตามอายุ 4 กลุ่ม
ข้อมูล C: เปรียบเทียบยอดขาย 5 ทีม
ข้อมูล D: ความสัมพันธ์ระหว่างราคากับยอดขาย
```

**เฉลย:** A=Line, B=Pie/Donut (ถ้า≤4), C=Bar, D=Scatter ถ้าตอบถูกหมด = พื้นฐานดีแล้ว ✅

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Chart ผิดประเภท = ข้อมูลดีก็พังได้**

ลองนึกถึงเราต้องการบอกว่า "อุณหภูมิกรุงเทพเพิ่มขึ้นทุกปี" ถ้าใช้ Pie Chart คนดูจะงงทันที เพราะ Pie Chart บอกสัดส่วน ไม่ใช่แนวโน้ม Line Chart ถึงจะถูกต้องในกรณีนี้

```
Chart แต่ละประเภทเหมาะกับคำถามต่างกัน:
→ "มากหรือน้อยกว่า?" = Bar Chart
→ "เปลี่ยนแปลงยังไงตามเวลา?" = Line Chart
→ "คิดเป็นกี่เปอร์เซ็นต์?" = Pie/Donut Chart
→ "มีความสัมพันธ์กันไหม?" = Scatter Plot
→ "กระจายอยู่ยังไง?" = Histogram
```

---

### 📊 Chart Selection Guide — เลือก Chart ให้ถูก

**กฎง่ายๆ ก่อนเลือก Chart:**

```
ถามตัวเองว่า "ฉันอยากให้คนดูเห็นอะไร?"

เปรียบเทียบค่า         → Bar Chart (แนวตั้ง/นอน)
แนวโน้มตามเวลา        → Line Chart
สัดส่วน (≤5 ชิ้น)     → Pie / Donut Chart
สัดส่วน (>5 ชิ้น)     → Bar Chart แทน
ความสัมพันธ์          → Scatter Plot
ส่วนประกอบเปลี่ยนตามเวลา → Stacked Area Chart
ตัวเลขเดียวที่สำคัญมาก → Big Number + Text
การจัดอันดับ          → Horizontal Bar Chart
```

**ตัวอย่างการใช้ Chart ที่ถูกและผิด:**

```
❌ ผิด: Pie Chart เปรียบเทียบยอดขาย 8 ทีม
→ Pie 8 ชิ้นอ่านยากมาก ตาต้องเดา

✅ ถูก: Horizontal Bar Chart เรียงจากมากไปน้อย
→ เห็นทันทีว่าทีมไหนอันดับ 1

❌ ผิด: Bar Chart แสดงอุณหภูมิ 12 เดือน
→ ดูเหมือนค่าแยกจากกัน ไม่เห็น Trend

✅ ถูก: Line Chart แสดงอุณหภูมิ 12 เดือน
→ เห็น Trend ขึ้น-ลงชัดเจน
```

---

### ✍️ วิธีสร้าง Chart ใน Google Slides

```
วิธีที่ 1: Insert จาก Google Sheets (แนะนำ)
1. สร้างข้อมูลใน Google Sheets
2. Insert Chart ใน Sheets ก่อน
3. Copy Chart → Paste ใน Slides
4. เลือก "Link to spreadsheet" เพื่ออัพเดตอัตโนมัติ

วิธีที่ 2: Insert โดยตรงใน Slides
1. Insert → Chart → เลือกประเภท
2. แก้ข้อมูลใน Sheets ที่ Link มา

วิธีที่ 3: ใช้ Gemini สร้างช่วย
→ บอก Gemini ว่า "Insert a bar chart
   comparing [ข้อมูล] with this data: [วางข้อมูล]"
```

---

### 🎨 ปรับแต่ง Chart ให้สื่อสารได้ดีขึ้น

```
สิ่งที่ต้องทำกับทุก Chart:
✅ ลบ Gridlines ที่ไม่จำเป็น
✅ ลบ Legend ถ้ามีแค่ 1 Data Series
✅ เพิ่ม Data Labels บนแท่ง/จุดที่สำคัญ
✅ ใช้สีเน้น (Accent Color) แค่ Bar/Line ที่อยากเน้น
   ที่เหลือใช้สีเทา
✅ ชื่อแกน X และ Y ต้องชัดเจน
✅ ตัดทศนิยมที่ไม่จำเป็น (1,234,567 ดีกว่า 1,234,567.23)
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — เลือก Chart ยังไงให้ถูก (ภาษาไทย)**

[![Chart TH](https://img.youtube.com/vi/g4IxcYL1H4Q/0.jpg)](https://www.youtube.com/watch?v=g4IxcYL1H4Q)

🔗 [https://www.youtube.com/watch?v=g4IxcYL1H4Q](https://www.youtube.com/watch?v=g4IxcYL1H4Q)

---

**วิดีโอ 2 — Storytelling with Data Charts (English)**

[![Chart EN](https://img.youtube.com/vi/5Zg-C8AAIGg/0.jpg)](https://www.youtube.com/watch?v=5Zg-C8AAIGg)

🔗 [https://www.youtube.com/watch?v=5Zg-C8AAIGg](https://www.youtube.com/watch?v=5Zg-C8AAIGg)

> 💡 Cole Nussbaumer Knaflic เป็นผู้เชี่ยวชาญ Data Visualization ที่ดีที่สุด

---

### 📖 Further Reading

-   🔗 [datavizproject.com](https://datavizproject.com) — ดูตัวอย่าง Chart ทุกประเภท
-   🔗 [storytellingwithdata.com/chart-guide](https://www.storytellingwithdata.com/chart-guide) — คู่มือเลือก Chart

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **วางแผน: ใช้ใน `Claude Chat`** 🏷️ **สร้าง Chart: ใช้ใน `Google Sheets + Slides`**

---

**Prompt 1 — ให้ AI แนะนำ Chart ที่เหมาะสม**

```
[Context] ฉันมีข้อมูลนี้ที่ต้องนำเสนอ:
[วางข้อมูล]
Key Message ที่ต้องการสื่อ: [Key Message]
[Task] แนะนำ Chart ที่เหมาะสมที่สุด
[Spec]
- บอกว่าควรใช้ Chart ประเภทไหน
- อธิบายว่าทำไมถึงเลือก Chart นี้
- บอกว่ามีทางเลือกอื่นอีกไหมและข้อดีข้อเสียของแต่ละแบบ
- แนะนำว่าควรเน้น (Highlight) ค่าไหนด้วย Accent Color
[Constraint] อธิบายจากมุมมอง Audience ไม่ใช่แค่ความสวยงาม
```

---

**Prompt 2 — ให้ AI ช่วยเตรียมข้อมูลสำหรับ Chart**

```
[Context] ฉันมีข้อมูลดิบนี้:
[วางข้อมูลดิบ]
[Task] ช่วยจัดเรียงข้อมูลให้พร้อมสำหรับใส่ใน Google Sheets
[Spec]
- จัดรูปแบบเป็น Table ที่ Google Sheets รับได้
- เรียงลำดับที่เหมาะสม (เช่น มากไปน้อย หรือตามเวลา)
- ระบุว่าคอลัมน์ไหนเป็น X-axis และ Y-axis
[Constraint] ให้ข้อมูลเป็น Markdown Table ที่ Copy ไปวางได้เลย
```

---

### 🛠️ Workshop — "Data Dashboard 1 หน้า"

> 🏷️ **Tool ที่ใช้:** Claude Chat + Google Sheets + Google Slides ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง

**โจทย์:** สร้างสไลด์ 1 หน้าที่มี 2–3 Chart พร้อม Big Number แสดงสรุปข้อมูลสำคัญในหน้าเดียว

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| เลือก Chart ถูกประเภทกับข้อมูล | อธิบายเหตุผลได้ | เลือกตามความสวย |
| มีสีเน้นแค่ Bar/Line ที่อยากเน้น | ที่เหลือสีเทา | ทุก Bar มีสีต่างกัน |
| มี Data Labels บนจุดสำคัญ | ตัวเลขอ่านได้ทันที | ต้องอ่านจากแกน |
| ดูเข้าใจได้ใน 5 วินาที | ทดสอบกับคนอื่นแล้วผ่าน | คนดูต้องใช้เวลานาน |

---

### 🚨 Common Errors

| ปัญหาที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| Chart มีสีเยอะเกินไป | Google Slides ให้สีอัตโนมัติ | เปลี่ยนสีทุก Bar เป็นเทา ยกเว้นอันที่อยากเน้น |
| Pie Chart มีชิ้นเยอะเกิน 5 | ข้อมูลมีหลายหมวด | รวมหมวดเล็กๆ เป็น "อื่นๆ" หรือเปลี่ยนเป็น Bar |
| ตัวเลขบน Chart อ่านยาก | ทศนิยมเยอะเกิน | ปัดเลขให้กระชับ เช่น 1.2M แทน 1,234,567 |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 6 ได้เลย!

---

---
