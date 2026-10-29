---
title: "Firebase — NoSQL Database + Authentication"
hours: 3
---

## 📅 สัปดาห์ที่ 11 — Firebase — NoSQL Database + Authentication

### ⏱️ เวลาโดยประมาณ

ศึกษา 1 ชม. + Workshop 2 ชม. = รวม 3 ชม.

---

### ⚡ Quick Win (ทดสอบก่อนเริ่ม 5 นาที)

เปิด Browser ไปที่ [console.firebase.google.com](https://console.firebase.google.com) Login ด้วย Google Account

**ถ้าเข้าได้และเห็นหน้า Dashboard = พร้อมแล้ว ✅**

---

### 😊 Jacky ขออธิบายเพิ่มเติมว่า

**Firebase คืออะไร?**

Firebase เหมือน "ชุดเครื่องมือบ้านสำเร็จรูป" ที่ Google สร้างไว้ให้ แทนที่จะต้องสร้าง Database เอง, สร้างระบบ Login เอง, จัดการ File เอง — Firebase จัดการทุกอย่างให้ เราแค่เชื่อมต่อแล้วใช้งาน

**Firestore vs Realtime Database:**

```
Firebase มี Database 2 แบบ:

Firestore (แนะนำ):
→ เก็บข้อมูลเป็น Collection → Document
→ Query ได้ยืดหยุ่น
→ Offline Support ดี
→ ใช้สำหรับโปรเจกต์ใหม่เสมอ ✅

Realtime Database (เก่ากว่า):
→ เก็บข้อมูลเป็น JSON Tree
→ Real-time ดีกว่า แต่ Query ยากกว่า
→ ยังใช้งานได้แต่ Firestore ดีกว่าในส่วนใหญ่
```

**โครงสร้างข้อมูล Firestore:**

```
Firestore
│
├── users/                    ← Collection
│   ├── uid_abc123/          ← Document ID
│   │   ├── name: "สมชาย"
│   │   ├── email: "somchai@email.com"
│   │   └── createdAt: Timestamp
│   └── uid_def456/
│       ├── name: "สมหญิง"
│       └── ...
│
└── posts/                    ← Collection
    ├── post_001/             ← Document ID
    │   ├── title: "บทความแรก"
    │   ├── userId: "uid_abc123"   ← Reference ไป User
    │   └── createdAt: Timestamp
    └── post_002/
        └── ...
```

---

### 🔧 Firebase Setup — ตั้งค่าครั้งแรก

**ขั้นตอนสร้าง Firebase Project:**

```
1. ไปที่ console.firebase.google.com
2. คลิก "Create a project"
3. ตั้งชื่อ Project
4. เปิด/ปิด Google Analytics (ไม่จำเป็น)
5. คลิก "Create project"
6. เลือก "</>" (Web App) เพื่อเพิ่ม App
7. ตั้งชื่อ App แล้วกด "Register app"
8. Copy firebaseConfig ที่ได้ไปใส่ในโปรเจกต์
```

**ติดตั้ง Firebase SDK:**

```
npm install firebase
```

**ไฟล์ firebase.js — ตั้งค่า Config:**

```
// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// ❌ อย่าใส่ค่าจริงในโค้ด
// ✅ ดึงจาก .env เสมอ
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const db   = getFirestore(app)
export const auth = getAuth(app)
```

**ไฟล์ .env:**

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=myapp.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myapp-12345
VITE_FIREBASE_STORAGE_BUCKET=myapp.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

### 📝 Firestore CRUD Operations

```
import {
  collection, doc,
  getDocs, getDoc,
  addDoc, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'
import { db } from './firebase'

// ─── CREATE ───────────────────────────────────────
// addDoc: Firebase สร้าง ID ให้เอง (แนะนำ)
const newPost = await addDoc(collection(db, 'posts'), {
  title:     'บทความแรก',
  content:   'เนื้อหา...',
  userId:    'uid_abc123',
  createdAt: serverTimestamp(),  // ใช้เวลา Server เสมอ
})
console.log('Post ID:', newPost.id)

// ─── READ ONE ─────────────────────────────────────
const docRef  = doc(db, 'posts', 'post_001')
const docSnap = await getDoc(docRef)
if (docSnap.exists()) {
  console.log(docSnap.data())   // ข้อมูลใน Document
}

// ─── READ MANY (พร้อม Filter + Sort) ──────────────
const q = query(
  collection(db, 'posts'),
  where('userId', '==', 'uid_abc123'),   // Filter
  orderBy('createdAt', 'desc'),          // Sort ใหม่สุดก่อน
  limit(10)                              // แค่ 10 รายการ
)
const querySnap = await getDocs(q)
const posts = querySnap.docs.map(d => ({ id: d.id, ...d.data() }))

// ─── REAL-TIME LISTENER ───────────────────────────
// onSnapshot: อัพเดต UI ทันทีเมื่อข้อมูลเปลี่ยน
const unsubscribe = onSnapshot(
  collection(db, 'posts'),
  (snapshot) => {
    const posts = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    setPosts(posts)  // อัพเดต React State ทันที
  }
)
// ยกเลิก Listener เมื่อ Component Unmount
// return () => unsubscribe()  ← ใส่ใน useEffect cleanup

// ─── UPDATE ───────────────────────────────────────
await updateDoc(doc(db, 'posts', 'post_001'), {
  title: 'ชื่อใหม่',                    // แก้เฉพาะ Field นี้
  updatedAt: serverTimestamp(),
})

// ─── DELETE ───────────────────────────────────────
await deleteDoc(doc(db, 'posts', 'post_001'))
```

---

### 🔐 Firebase Authentication

```
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from './firebase'

// สมัครสมาชิก
const register = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth, email, password
  )
  return userCredential.user
}

// Login
const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth, email, password
  )
  return userCredential.user
}

// Logout
await signOut(auth)

// ตรวจ Auth State — ใช้ใน App.jsx
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setCurrentUser(user)    // user = null ถ้าไม่ได้ Login
    setIsLoading(false)
  })
  return unsubscribe
}, [])
```

---

### 🔒 Firebase Security Rules เบื้องต้น

```
// Firestore → Rules Tab

// ❌ อย่าใช้แบบนี้ใน Production (ทุกคนเข้าถึงได้หมด)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // อันตราย!
    }
  }
}

// ✅ แบบปลอดภัยกว่า: Login แล้วถึงเขียนได้
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users อ่านได้เฉพาะข้อมูลตัวเอง
    match /users/{userId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }

    // Posts อ่านได้ทุกคน เขียนได้เฉพาะเจ้าของ
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
                            && request.auth.uid == resource.data.userId;
    }
  }
}
```

---

### 📺 วิดีโอประกอบ

**วิดีโอ 1 — Firebase Firestore เบื้องต้น ภาษาไทย**

[![Firebase TH](https://img.youtube.com/vi/fgdpvwEWJ9M/0.jpg)](https://www.youtube.com/watch?v=fgdpvwEWJ9M)

🔗 [https://www.youtube.com/watch?v=fgdpvwEWJ9M](https://www.youtube.com/watch?v=fgdpvwEWJ9M)

---

**วิดีโอ 2 — Firebase in 100 Seconds (Fireship — English)**

[![Firebase Fireship](https://img.youtube.com/vi/vAoB4VbhRzM/0.jpg)](https://www.youtube.com/watch?v=vAoB4VbhRzM)

🔗 [https://www.youtube.com/watch?v=vAoB4VbhRzM](https://www.youtube.com/watch?v=vAoB4VbhRzM)

---

**วิดีโอ 3 — Firebase Auth + Firestore CRUD (Traversy — English)**

[![Firebase CRUD](https://img.youtube.com/vi/jCY6DH8F4oc/0.jpg)](https://www.youtube.com/watch?v=jCY6DH8F4oc)

🔗 [https://www.youtube.com/watch?v=jCY6DH8F4oc](https://www.youtube.com/watch?v=jCY6DH8F4oc)

> 💡 ดูช่วง 0:00–25:00 ครอบคลุม Setup + CRUD ครบ

---

### 📖 Further Reading

-   🔗 [firebase.google.com/docs/firestore](https://firebase.google.com/docs/firestore) — Official Docs
-   🔗 [firebase.google.com/docs/auth](https://firebase.google.com/docs/auth/web/start)
-   🔗 [firebase.google.com/docs/rules](https://firebase.google.com/docs/rules)

---

### 💬 Prompt สำเร็จรูป

> 🏷️ **Module ที่ใช้:** `Claude Chat` สำหรับโค้ด ⚠️ Firebase Config ต้องอยู่ใน .env เท่านั้น ห้ามวางใน Prompt

---

**Prompt 1 — ตั้งค่า Firebase และ CRUD แรก**

```
[Context] ฉันมี Firebase Project สร้างแล้ว และมี Config พร้อม
[Task] ช่วย Setup Firebase ในโปรเจกต์ React + Vite
[Spec]
1. สร้างไฟล์ src/firebase.js ดึง Config จาก .env
2. สร้าง Custom Hook: useFirestore(collectionName)
   - ดึง Documents ทั้งหมดจาก Collection
   - Return: { data, isLoading, error }
3. ใช้ Hook นี้ใน Component แสดง List ข้อมูล
4. เพิ่ม Function addDocument(data)
[Constraint] ใช้ onSnapshot (Real-time) ไม่ใช่ getDocs
อธิบาย Security ที่ต้องตั้งค่าด้วย
```

---

**Prompt 2 — Firebase Authentication**

```
[Context] ต่อจาก Firebase Setup ที่มีอยู่
[Task] เพิ่มระบบ Authentication ด้วย Email/Password
[Spec]
Components:
- AuthContext: Context ที่เก็บ currentUser State
- LoginForm: Email + Password + ปุ่ม Login
- RegisterForm: Email + Password + Confirm Password
- ProtectedRoute: Redirect ไป /login ถ้ายังไม่ Login

Flow:
- ถ้า Login แล้ว → แสดงหน้า App
- ถ้ายังไม่ Login → Redirect ไป /login
- Logout ปุ่มใน Navbar
[Constraint] ใช้ Firebase Auth + React Context เท่านั้น
```

---

**Prompt ฉุกเฉิน — Firebase Permission Denied**

```
[Context] เรียก Firestore แล้วได้ Error
[Task] ช่วย Debug Firebase Security Rules
[Spec]
Error: FirebaseError: Missing or insufficient permissions
Operation: [อ่าน/เขียน] Collection: [ชื่อ Collection]
Auth State: [Login อยู่หรือเปล่า]
Security Rules ปัจจุบัน: [Copy Rules มา]
[Constraint] อธิบาย Rules ที่ควรเป็น พร้อม Reasoning
```

---

### 🖼️ Image Assets — รูปภาพที่ต้องเตรียม

| Filename | Dimension | รายละเอียด | แหล่งรูปฟรี |
| --- | --- | --- | --- |
| `public/default-avatar.png` | 200 × 200 px | Avatar Default สำหรับ User ที่ยังไม่มีรูป | [unsplash.com](https://unsplash.com) |

---

### 🛠️ Workshop — "Note App ด้วย Firebase"

> 🏷️ **Prompt: ใช้ใน `Claude Chat`** → คัดลอกโค้ดไปใส่ใน VS Code ⏱️ **เวลาโดยประมาณ:** 2 ชั่วโมง 📋 **ต้องมีก่อนเริ่ม:** Firebase Account + Project สร้างแล้ว + .env พร้อม

**โจทย์ / Assignment:**

สร้าง Note-taking App เชื่อม Firebase Firestore จริง บันทึกข้อมูลลง Cloud และแสดง Real-time

---

**Checkpoint ก่อนเริ่ม:**

```
npm install firebase
# สร้างไฟล์ .env ใส่ Firebase Config ครบ
# ตรวจว่า .env อยู่ใน .gitignore แล้ว
```

---

**Prompt สำเร็จรูป — ใช้ใน `Claude Chat`**

```
=== Iteration 1: Firebase Setup + Auth ===
[Context] สร้าง Note App เชื่อม Firebase
[Task] Setup Firebase และระบบ Login
[Spec]
- src/firebase.js: init App, export db, auth
- AuthContext: เก็บ currentUser, login, register, logout
- LoginPage: Form + Validation + Error Message
- RegisterPage: Form + Validation

ทุก Field ดึงจาก import.meta.env.VITE_FIREBASE_*
[Constraint] React + Firebase SDK เท่านั้น

=== Iteration 2: Notes CRUD ===
[Context] ต่อจาก Auth Setup
[Task] สร้างระบบ CRUD Notes เชื่อม Firestore
[Spec]
Collection: notes/{noteId}
Document Fields:
- title: string
- content: string
- userId: string (UID ของเจ้าของ)
- createdAt: serverTimestamp
- updatedAt: serverTimestamp

Operations:
- addNote(title, content): เพิ่ม Note ใหม่
- updateNote(id, data): แก้ไข Note
- deleteNote(id): ลบ Note
- useNotes(): Custom Hook ดึง Notes ของ User ปัจจุบัน
             ใช้ onSnapshot (Real-time)
             Filter เฉพาะ userId == currentUser.uid
[Constraint] แสดงเฉพาะ Notes ของ User ที่ Login เท่านั้น

=== Iteration 3: UI + Real-time ===
[Context] ต่อจาก CRUD Logic
[Task] สร้าง UI ครบ
[Spec]
- NoteList: แสดง Cards ทั้งหมด เรียงใหม่ไปเก่า
- NoteCard: Title + Preview Content + วันที่ + ปุ่ม Edit/Delete
- NoteEditor: Modal Form สำหรับ Add/Edit
- Empty State: ถ้าไม่มี Note แสดงข้อความชวนสร้าง
- Real-time: Note ใหม่ปรากฏทันทีโดยไม่ต้อง Refresh
[Constraint] CSS Module สำหรับ Styling

=== Iteration 4: Security Rules ===
[Context] ต่อจาก App ที่ทำงานได้แล้ว
[Task] เขียน Firestore Security Rules ที่ปลอดภัย
[Spec]
Rules ที่ต้องการ:
- อ่าน Notes ได้เฉพาะเจ้าของ
- สร้าง Note ได้เฉพาะ Login แล้ว
- แก้/ลบ ได้เฉพาะเจ้าของ
- ห้าม User คนอื่นเข้าถึง Notes ของคนอื่น
[Constraint] อธิบาย Rule แต่ละบรรทัดด้วย Comment
```

---

**ขั้นตอน Commit:**

```
git add .
git commit -m "feat: note app with firebase auth and firestore"
git push
```

---

**Acceptance Criteria ✅**

| เกณฑ์ | ผ่าน ✅ | ไม่ผ่าน ❌ |
| --- | --- | --- |
| Login/Register ทำงานจริงกับ Firebase Auth | Firebase Console เห็น User | Login Error |
| เพิ่ม Note แล้วเห็นใน Firestore Console | ข้อมูลอยู่ใน DB จริง | ไม่มีใน DB |
| Real-time: Note ใหม่ปรากฏโดยไม่ Refresh | ปรากฏทันที | ต้อง Refresh |
| User เห็นเฉพาะ Notes ของตัวเอง | Filter ถูกต้อง | เห็น Notes คนอื่น |
| Security Rules ไม่อนุญาตการเข้าถึงที่ผิด | ทดสอบแล้วผ่าน | ยัง Allow All |
| Firebase Config ไม่อยู่ใน GitHub | ตรวจ Repo ไม่เห็น Key | เห็น Key ใน GitHub |

---

### 🚨 Common Errors

| Error ที่เจอ | สาเหตุ | วิธีแก้ |
| --- | --- | --- |
| `Firebase: No Firebase App` | ลืม initializeApp | ตรวจว่า firebase.js Import ถูกต้อง |
| `Permission Denied` | Security Rules บล็อก | ตรวจ Rules และ Auth State |
| `Invalid API Key` | .env ผิดหรือไม่ได้ Prefix VITE\_ | ตรวจ .env และ Restart Dev Server |
| Real-time ไม่ทำงาน | ใช้ getDocs แทน onSnapshot | เปลี่ยนเป็น onSnapshot |
| Notes ของคนอื่นโชว์ด้วย | ลืม where('userId','==',uid) | เพิ่ม where Clause |

---

> 🎯 ผ่านทุกข้อ → ไปสัปดาห์ 12 ได้เลย!

---

---
