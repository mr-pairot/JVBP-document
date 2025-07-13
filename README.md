# 📄 JVBP Document Viewer (LINE LIFF + Google Sheets + Looker Studio)

ระบบนี้ช่วยให้สามารถเปิดดูรายงาน Looker Studio ผ่าน LINE LIFF พร้อมกับบันทึกข้อมูลผู้ใช้งานลงใน Google Sheets โดยใช้ LIFF, Netlify และ Google Apps Script ร่วมกัน

---

## 🔧 ความสามารถ (Features)

- ✅ เชื่อมต่อกับ LINE Login (ผ่าน LIFF)
- ✅ แสดงรายงาน Looker Studio ตามประเภทเอกสาร (RFA, RFI, Letter_IN)
- ✅ บันทึกข้อมูลผู้ใช้งานใหม่ใน Google Sheet
- ✅ บันทึก log การเปิดดูเอกสารทุกครั้ง
- ✅ รองรับการ deploy ผ่าน Netlify
- ✅ ปรับประเภทเอกสารผ่านพารามิเตอร์ `?docType=RFA`

---

## 📁 โครงสร้างไฟล์

```
📦project-root
 ┣ 📄 index.html         ← หน้าเว็บหลัก
 ┣ 📄 script.js          ← โค้ดเชื่อมต่อ LINE LIFF และ Google Apps Script
 ┣ 📄 style.css          ← สไตล์ Spinner + Layout
 ┗ 📄 README.md          ← ไฟล์นี้
```

---

## 🚀 วิธีใช้งาน

### 1. เตรียม LIFF App

- ไปที่ [LINE Developers](https://developers.line.biz/console)
- สร้าง LIFF App
  - ตั้งค่า LIFF URL เช่น `https://document.netlify.app/?buttonName=RFA`
  - เปิดใช้งาน LINE Login
  - คัดลอก `LIFF ID` มาใส่ใน `index.html`

---

### 2. เตรียม Google Apps Script

- เปิด [https://script.new](https://script.new) แล้ววาง `code.gs` จากตัวอย่างนี้
- ตั้งค่า `SHEET_ID` ให้ตรงกับ Google Sheet ของคุณ
- `Deploy > Manage Deployments > New deployment`
  - Type: **Web app**
  - Execute as: **Me**
  - Access: **Anyone**
- คัดลอก URL มาใช้ใน `script.js`

> Apps Script จะ:
> - รับ `GET` → ส่ง Looker URL กลับ
> - รับ `POST` → บันทึก User log และข้อมูลผู้ใช้

---

### 3. เตรียม Looker Studio URLs

ใน `code.gs` แก้ไข `LOOKER_URLS` ดังนี้:

```js
const LOOKER_URLS = {
  'RFA': 'https://lookerstudio.google.com/embed/your-rfa-url',
  'RFI': 'https://lookerstudio.google.com/embed/your-rfi-url',
  'Letter_IN': 'https://lookerstudio.google.com/embed/your-letterin-url'
};
```

---

### 4. Deploy หน้าเว็บด้วย Netlify

- Push โปรเจกต์ขึ้น GitHub
- ไปที่ [Netlify](https://www.netlify.com/)
  - เลือก “Import from GitHub”
  - ตั้งชื่อ เช่น: `document.netlify.app`
- เปิดใช้งานทันทีที่มี Git Push

---

## 🧪 วิธีทดสอบ

1. เปิดผ่าน LINE App หรือ Web Browser:
   - `https://document.netlify.app/?docType=RFA`
   - `https://document.netlify.app/?docType=RFI`
   - `https://document.netlify.app/?docType=Letter_IN`
2. ระบบจะให้ Login ผ่าน LINE (ถ้ายังไม่เคย)
3. ระบบจะโหลด Looker Report ที่กำหนด และบันทึกข้อมูลลง Google Sheet

---

## 📌 ตัวอย่างข้อมูลใน Google Sheet

### Sheet: `UserDATA`

| User ID | Display Name | FirstTimeLogin |
|---------|--------------|----------------|
| Uxxxx   | John Doe     | 2025-07-10     |

### Sheet: `UserLog`

| Timestamp           | User ID | Display Name | docType |
|---------------------|---------|--------------|---------|
| 2025-07-10 12:34:56 | Uxxxx   | John Doe     | RFA     |

---

## 📎 ข้อแนะนำเพิ่มเติม

- เพิ่ม `LINE LIFF URL` เข้า Allow List บน LINE Developer Console
- ตั้งค่าหน้า Looker Studio ให้เปิดได้โดยไม่ต้อง Login (Public Embed)
- ใช้ Netlify Environment Variables ซ่อน `SCRIPT_URL` (ในระดับ Production)

---

## 🧑‍💻 ผู้จัดทำ

- Pairot Huipan 
- พัฒนาเพื่อใช้งานในระบบเอกสาร JVBP ผ่าน Looker Studio
