# 🍵 GIẢI KHÁT STATION – Hướng Dẫn Cài Đặt & Deploy

## CẤU TRÚC THƯ MỤC

```
giaikh/
├── index.html              ← Trang chủ
├── firebase.json           ← Cấu hình Firebase Hosting
├── firestore.rules         ← Security Rules Firestore
├── css/
│   └── style.css           ← Toàn bộ CSS (glassmorphism, animations)
├── js/
│   ├── config.js           ← Firebase config + helpers
│   ├── toast.js            ← Toast notification system
│   ├── products.js         ← Dữ liệu 6 đồ uống
│   └── cart.js             ← Giỏ hàng + checkout + địa chỉ
├── pages/
│   └── login.html          ← Đăng nhập / Đăng ký
└── admin/
    └── index.html          ← Trang quản trị admin
```

---

## BƯỚC 1 – TẠO FIREBASE PROJECT

1. Vào https://console.firebase.google.com
2. Click **"Add project"** → Đặt tên: `giaikh-station`
3. Tắt Google Analytics (tuỳ chọn) → **Create project**

---

## BƯỚC 2 – BẬT AUTHENTICATION

1. Vào **Build → Authentication → Get started**
2. Tab **Sign-in method** → Bật **Email/Password**
3. Save

---

## BƯỚC 3 – TẠO FIRESTORE DATABASE

1. Vào **Build → Firestore Database → Create database**
2. Chọn **Production mode** → chọn region gần nhất (asia-southeast1)
3. Sau khi tạo xong, vào tab **Rules** → dán nội dung từ file `firestore.rules`
4. Click **Publish**

**Cấu trúc Collections sẽ được tạo tự động:**

```
users/
  {uid}/
    uid: string
    fullName: string
    email: string
    registerTime: "2026-06-25 20:15:00 GMT+7"
    lastLogin: "2026-06-25 21:00:00 GMT+7"
    role: "user"

orders/
  {auto-id}/
    userId: string
    customerName: string
    phoneNumber: string
    address: string
    products: array
    totalPrice: number
    orderTime: "2026-06-25 20:30:00 GMT+7"
    status: "pending"
```

---

## BƯỚC 4 – LẤY FIREBASE CONFIG

1. Vào **Project Settings** (bánh răng ⚙) → **General**
2. Kéo xuống **"Your apps"** → Click **"Web"** (`</>`)
3. Đặt tên app → **Register app**
4. Copy đoạn `firebaseConfig` → dán vào `js/config.js`

```js
// Thay thế trong js/config.js:
const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "giaikh-station.firebaseapp.com",
  projectId:         "giaikh-station",
  storageBucket:     "giaikh-station.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123:web:abc"
};
```

---

## BƯỚC 5 – CẤU HÌNH GOOGLE MAPS API

1. Vào https://console.cloud.google.com
2. Tạo project mới hoặc dùng chung project
3. Vào **APIs & Services → Library**
4. Tìm **"Geocoding API"** → Enable
5. Vào **APIs & Services → Credentials → Create Credentials → API Key**
6. Copy API key → dán vào `js/config.js`:

```js
const GOOGLE_MAPS_API_KEY = "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX";
```

7. Hạn chế key: **Application restrictions → HTTP referrers** → thêm domain của bạn

> ⚠️ Nếu chưa có API key, website vẫn chạy được nhưng địa chỉ sẽ không được xác thực.

---

## BƯỚC 6 – TẠO TÀI KHOẢN ADMIN

Có 2 cách:

**Cách 1:** Đăng ký tài khoản với email `admin@giaikhat.vn` (email mặc định trong config.js)

**Cách 2:** Đăng ký bất kỳ email nào → vào Firestore → collection `users` → tìm document của tài khoản đó → thêm field `role: "admin"`

---

## BƯỚC 7 – DEPLOY LÊN FIREBASE HOSTING

```bash
# Cài Firebase CLI (nếu chưa có)
npm install -g firebase-tools

# Đăng nhập
firebase login

# Vào thư mục dự án
cd giaikh/

# Khởi tạo hosting (chọn project của bạn)
firebase init hosting
# - Use existing project → chọn giaikh-station
# - Public directory: .  (dấu chấm)
# - Single-page app: No
# - GitHub auto deploy: No

# Deploy
firebase deploy

# Sau khi deploy thành công sẽ có URL dạng:
# https://giaikh-station.web.app
```

---

## BƯỚC 8 – XEM DỮ LIỆU FIRESTORE

1. Firebase Console → **Firestore Database**
2. Collection `orders` → xem tất cả đơn hàng
3. Collection `users`  → xem khách hàng

---

## CHỨC NĂNG ĐÃ XÂY DỰNG

✅ Trang chủ glassmorphism + hero section đẹp
✅ 6 đồ uống: Matcha, Cacao, Cà Phê, Nước Cam, Sữa Đậu, Sữa Tươi
✅ Modal chi tiết sản phẩm với chọn Size S/M/L
✅ Giỏ hàng sidebar (thêm, xóa, tăng/giảm số lượng)
✅ Checkout + xác thực địa chỉ Google Maps
✅ Lưu đơn hàng lên Firestore
✅ Đăng ký / Đăng nhập Firebase Auth
✅ Icon mắt hiện/ẩn mật khẩu
✅ Toast notification đẹp (giữa màn hình)
✅ Thời gian GMT+7 lưu vào Firestore
✅ Admin panel: xem đơn hàng, khách hàng, doanh thu
✅ Cập nhật trạng thái đơn hàng
✅ Firestore Security Rules
✅ Chống XSS cơ bản (escHtml)
✅ AOS Animation + hover effects 60FPS
✅ Responsive 100% (điện thoại + tablet + máy tính)
✅ Liên hệ: chỉ số điện thoại 0768152277

---

## CUSTOMIZATION

### Đổi logo:
Trong `index.html` và `pages/login.html`, tìm đoạn:
```html
<i class="fas fa-leaf text-white"></i>
```
Thay bằng `<img src="path/to/your-logo.png" ...>` hoặc icon khác.

### Đổi màu chủ đạo:
Trong `css/style.css`, thay:
```css
--green:   #8BC34A;  /* Xanh lá */
--orange:  #FF9800;  /* Cam */
```

### Thêm sản phẩm:
Trong `js/products.js`, thêm object vào mảng `PRODUCTS`.

---

## HỖ TRỢ

📞 **0768 152 277**
