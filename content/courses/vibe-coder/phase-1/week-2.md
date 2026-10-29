---
title: "Prompt Engineering + Prompt Chaining (การสั่งงาน AI แบบมีระบบ)"
hours: 3
---

## 📅 สัปดาห์ที่ 2 — Prompt Engineering + Prompt Chaining (การสั่งงาน AI แบบมีระบบ)

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Prompt Engineering คืออะไร?**

ลองนึกว่าเราเป็นผู้กำกับหนัง Claude คือนักแสดง ถ้าผู้กำกับบอก Script (บท) ไม่ชัด หนังก็จะออกมาไม่ดี Prompt Engineering คือการเป็นผู้กำกับที่ดี — บอก Context ชัด บอก Task ชัด บอก Constraint ชัด

**Prompt Chaining คืออะไร?**

แทนที่จะสั่ง Claude ทำทุกอย่างใน Single Prompt เดียว เราแบ่งงานออกเป็น Sequence (ลำดับ) ของ Prompt ย่อยๆ เหมือนสร้างบ้านทีละขั้น ไม่ใช่สั่ง "สร้างบ้านทั้งหลังเดี๋ยวนี้"

```
Prompt 1 → HTML Structure (โครงสร้าง)
Prompt 2 → Real Content (เนื้อหาจริง)
Prompt 3 → CSS Styling (ตกแต่ง)
Prompt 4 → JavaScript Interaction (การโต้ตอบ)
```

---

### 📐 สูตร Prompt ที่ดี — 4 ส่วนเสมอ

```
[Context / บริบท]       → กำลังทำอะไร สำหรับใคร
[Task / งานหลัก]        → ต้องการให้ Claude ทำอะไร
[Specification / Spec]   → รายละเอียดที่ต้องการ
[Constraint / ข้อจำกัด] → ห้ามทำอะไร หรือต้องใช้อะไร
```

**เปรียบเทียบ Prompt แย่ vs ดี:**

```
❌ แย่ (ไม่มี Context, Spec ไม่ชัด):
"สร้างเมนูนำทาง"

✅ ดี (ครบ 4 ส่วน):
[Context]  ฉันกำลังสร้างเว็บ Portfolio สำหรับตัวเอง
[Task]     สร้าง Navigation Bar (แถบนำทาง) แนวนอน
[Spec]     มีเมนู 4 ข้อ: หน้าแรก, ผลงาน, ทักษะ, ติดต่อ
           Background สีขาว Text สีเข้ม
           Hover Effect เปลี่ยนสีเป็นน้ำเงิน
[Constraint] HTML + CSS ล้วน ไม่มี JavaScript
```

---

### 🔗 Prompt Chaining — ตัวอย่างที่ถูกต้องมีหน้าตาแบบนี้

**สิ่งที่ควรเห็นหลังแต่ละ Iteration:**

```
หลัง Iteration 1 (Structure):
→ Claude ส่ง HTML โล่งๆ มีแค่โครงสร้าง section เปล่า
→ Artifact แสดง Layout เทาๆ ไม่มีสีไม่มีเนื้อหา ✅ ถูกต้อง

หลัง Iteration 2 (Content):
→ Claude เพิ่ม Text จริงเข้าไปใน section
→ Artifact แสดง Text แต่ยังไม่มีสี ✅ ถูกต้อง

หลัง Iteration 3 (Styling):
→ Claude เพิ่ม CSS ให้ทั้งหน้า
→ Artifact แสดงผลสวยงาม มีสี ✅ ถูกต้อง

หลัง Iteration 4 (Interaction):
→ Claude เพิ่ม JavaScript
→ Artifact มี Hover Effect, Scroll Effect ✅ ถูกต้อง
```

> ⚠️ **สำคัญมาก:** ต้องพิมพ์ทุก Iteration ใน Conversation Window เดิม ถ้าเปิด Chat ใหม่ Claude จะเสีย Context และสร้างโค้ดใหม่จากศูนย์

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Prompt Engineering พื้นฐาน (ภาษาไทย)**

[![Prompt Engineering TH](https://img.youtube.com/vi/1bUy-1hGZpI/0.jpg)](https://www.youtube.com/watch?v=1bUy-1hGZpI)

🔗 [https://www.youtube.com/watch?v=1bUy-1hGZpI](https://www.youtube.com/watch?v=1bUy-1hGZpI)

---

**วิดีโอ 2 — Prompt Engineering Guide (English)**

[![Prompt Engineering EN](https://img.youtube.com/vi/T9aRN5JkmL8/0.jpg)](https://www.youtube.com/watch?v=T9aRN5JkmL8)

🔗 [https://www.youtube.com/watch?v=T9aRN5JkmL8](https://www.youtube.com/watch?v=T9aRN5JkmL8)

> 💡 ดูช่วง 0:00–8:00 เน้นเรื่อง "Be Specific" และ "Give Examples"

---

### 📖 Further Reading

-   🔗 [Anthropic Prompt Engineering Overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` ⚠️ ทุก Prompt ในสัปดาห์นี้ใช้ใน **Conversation Window เดิม** ห้ามเปิดใหม่ระหว่าง Chaining

---

**Prompt ฝึกสูตร 4 ส่วน**

```
[Context] ฉันกำลังสร้างเว็บ [ชื่อโปรเจกต์] สำหรับ [Target Audience / กลุ่มเป้าหมาย]
[Task] สร้าง [Component ที่ต้องการ]
[Spec]
- Color (สี): [สี]
- Size (ขนาด): [ขนาด]
- Content (เนื้อหา): [เนื้อหา]
- Behavior (พฤติกรรม): [เมื่อ Click / Hover ทำอะไร]
[Constraint] ใช้ [Technology] ไม่ใช้ [สิ่งที่ไม่ต้องการ]
แสดงผลเป็น Artifact
```

---

**Prompt เริ่ม Chaining Session**

```
ฉันจะส่ง Prompt ทีละ Iteration ใน Conversation นี้
ทุกรอบให้รับ Context และต่อยอดจากรอบก่อนเสมอ
ห้าม Reset โค้ดจากศูนย์

Project: [ชื่อ]
Tech Stack: HTML + CSS + JavaScript

Iteration 1 — Structure (โครงสร้าง):
[Task] สร้าง HTML Skeleton เปล่าๆ
[Spec] มี Section: [รายชื่อ Section]
[Constraint] ยังไม่มี CSS, Content จริง หรือ JavaScript
แสดงผลเป็น Artifact
```

---

**Prompt ฉุกเฉิน — เมื่อ Chaining แล้วโค้ดพัง**

```
โค้ดล่าสุดที่คุณสร้างมี Error / ไม่ทำงานตามที่ต้องการ
ปัญหาที่เห็น: [อธิบายอาการ]
ช่วย Fix โดยไม่เปลี่ยน Feature อื่นที่ทำงานอยู่แล้ว
แสดงผลเป็น Artifact
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

| Filename | Dimension | รายละเอียด | แหล่งรูปฟรี |
| --- | --- | --- | --- |
| `images/hero-bg.jpg` | 1440 × 800 px | Hero Background เช่น รูปห้องเรียน กีฬา หรือ Abstract | [unsplash.com](https://unsplash.com) |
| `images/feature-icon-1.png` | 80 × 80 px | Icon จุดเด่นที่ 1 (หรือใช้ Emoji แทน) | [flaticon.com](https://www.flaticon.com) |
| `images/feature-icon-2.png` | 80 × 80 px | Icon จุดเด่นที่ 2 (หรือใช้ Emoji แทน) | [flaticon.com](https://www.flaticon.com) |
| `images/feature-icon-3.png` | 80 × 80 px | Icon จุดเด่นที่ 3 (หรือใช้ Emoji แทน) | [flaticon.com](https://www.flaticon.com) |

> 💡 ยังไม่มีรูป? บอก Claude: "ใช้ CSS Gradient Placeholder แทน Hero Image ก่อน"

---

### 🛠️ Workshop — "Landing Page ด้วย Prompt Chaining"

> 🏷️ **Module ที่ใช้:** `Claude Chat` — Conversation เดียวกันตลอด 4 Iteration ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **สิ่งที่ต้องมีก่อนเริ่ม:** Folder โปรเจกต์พร้อม, Chrome, VS Code

**โจทย์ / Assignment:**

สร้าง Landing Page สำหรับ "คลาสเรียนอะไรก็ได้ที่ชอบ" ใช้ Prompt Chaining 4 Iteration ใน Conversation เดียว ต้องมีครบ: Navbar + Hero + Features + Footer

---

**Checkpoint ก่อนเริ่ม Iteration แต่ละรอบ:**

```
✅ ก่อน Iteration 1: เปิด Conversation ใหม่ใน Claude Chat
✅ ก่อน Iteration 2: Artifact รอบที่ 1 แสดง Skeleton เปล่าได้
✅ ก่อน Iteration 3: Artifact รอบที่ 2 มี Text Content แต่ยังไม่มีสี
✅ ก่อน Iteration 4: Artifact รอบที่ 3 มีสีและ Style สวยงาม
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat` ทีละ Iteration ในหน้าต่างเดิม**

```
=== Iteration 1: Structure ===
[Context] ฉันกำลังสร้าง Landing Page สำหรับคลาส [ชื่อคลาส]
[Task] สร้าง HTML Skeleton 4 Section
[Spec] Section: Navbar, Hero, Features, Footer
       ใส่ Placeholder Text ทุกที่
[Constraint] HTML ล้วน ยังไม่มี CSS หรือ JavaScript เลย
แสดงผลเป็น Artifact

--- พิมพ์ต่อใน Conversation เดิม ---

=== Iteration 2: Content ===
[Context] ต่อจาก HTML Skeleton ที่มีอยู่
[Task] เพิ่ม Real Content เข้าไปทุก Section
[Spec]
- Navbar: Logo "[ชื่อคลาส]" + Menu 3 ข้อ
- Hero: Headline "[หัวข้อดึงดูด]"
        Subtext "[คำอธิบายสั้น]"
        CTA Button: "สมัครเรียนเลย"
        Hero Background: ใช้ images/hero-bg.jpg
        ถ้าไม่มีให้ใช้ CSS Gradient สีเข้มแทน
- Features: 3 จุดเด่น พร้อม Emoji
- Footer: เบอร์โทร, อีเมล, เวลาทำการ
[Constraint] ยังไม่มี CSS

--- พิมพ์ต่อใน Conversation เดิม ---

=== Iteration 3: Styling ===
[Context] ต่อจาก Content ที่มีอยู่
[Task] เพิ่ม CSS ให้ทั้งหน้า
[Spec]
- Primary Color: [สีที่เลือก]
- Secondary Color: [สีรอง]
- Hero: Full-width, Text สีขาว
- Feature Cards: Box Shadow, Border Radius
- Buttons: Rounded, สีชัดเจน
[Constraint] ยังไม่มี JavaScript

--- พิมพ์ต่อใน Conversation เดิม ---

=== Iteration 4: Interaction ===
[Context] ต่อจาก Styling ที่มีอยู่
[Task] เพิ่ม JavaScript Interaction
[Spec]
- Button Hover: เปลี่ยนสี + CSS Transition 0.3s
- Navbar Scroll: มี Box Shadow เมื่อ Scroll ลง (Sticky Effect)
- Feature Card Hover: Scale 1.05 (Transform)
[Constraint] JavaScript ต้องอยู่ใน <script> Tag ท้ายไฟล์
แสดงผลเป็น Artifact
```

---

**ขั้นตอนหลังได้ Artifact รอบสุดท้าย:**

```
1. Copy โค้ดจาก Artifact
2. วางใน VS Code → บันทึกเป็น index.html
3. ดับเบิลคลิกเปิดใน Chrome ทดสอบ
4. ทดสอบ Hover Effect ทุกปุ่ม
5. ย่อหน้าต่าง Browser ดู Responsive
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| ใช้ Chaining 4 Iteration ใน Conversation เดิม | ไม่เปิด Chat ใหม่ | เปิด Chat ใหม่ทุกรอบ |
| มีครบ 4 Section | ครบทุก Section | ขาด Section |
| Hero มี Background Image หรือ Gradient | มีภาพพื้นหลัง | พื้นขาวเปล่า |
| Hover Effect ทำงาน | Effect ทำงานได้ | ไม่มี Effect |
| Prompt แต่ละรอบใช้ 4 ส่วน | ครบ Context/Task/Spec/Constraint | Prompt สั้นเกินไป |
| Responsive บน Mobile | Layout ไม่แตก | Layout พัง |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| Claude เริ่มโค้ดใหม่ทุก Iteration | เปิด Chat ใหม่ | ใช้ Conversation เดิมเสมอ |
| Hover Effect ไม่ทำงาน | JavaScript Error | ถาม Claude: "Hover ไม่ทำงาน ช่วย Debug" |
| Layout แตกบน Mobile | ไม่มี Media Query | ถาม Claude: "แก้ให้ Responsive บน Mobile ด้วย" |
| Hero Background ไม่แสดง | Path ผิดหรือไม่มีไฟล์ | บอก Claude: "ใช้ CSS Gradient แทน Background Image" |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 3 ได้เลย!

---

---
