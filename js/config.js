// ============================================================
// FIREBASE CONFIGURATION – Giải Khát Station
// THAY THẾ CÁC GIÁ TRỊ DƯỚI ĐÂY BẰNG CONFIG FIREBASE CỦA BẠN
// ============================================================

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Services
const auth    = firebase.auth();
const db      = firebase.firestore();
const storage = firebase.storage();

// ============================================================
// GOOGLE MAPS GEOCODING API KEY
// Lấy tại: https://console.cloud.google.com → Enable Geocoding API
// ============================================================
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

// ============================================================
// ADMIN EMAIL – tài khoản duy nhất được vào /admin/
// ============================================================
const ADMIN_EMAIL = "admin@giaikhat.vn";

// ============================================================
// HELPER: Thời gian GMT+7
// ============================================================
function nowGMT7() {
  const now  = new Date();
  const gmt7 = new Date(now.getTime() + 7 * 3600 * 1000);
  const p    = n => String(n).padStart(2, '0');
  return `${gmt7.getUTCFullYear()}-${p(gmt7.getUTCMonth()+1)}-${p(gmt7.getUTCDate())} ` +
         `${p(gmt7.getUTCHours())}:${p(gmt7.getUTCMinutes())}:${p(gmt7.getUTCSeconds())} GMT+7`;
}

// ============================================================
// HELPER: Định dạng tiền VND
// ============================================================
function fmtVND(n) {
  return Number(n).toLocaleString('vi-VN') + '₫';
}

// ============================================================
// HELPER: Escape XSS cơ bản
// ============================================================
function esc(str) {
  return String(str ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}
