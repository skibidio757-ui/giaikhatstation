// ============================================================
// CART MODULE – Giải Khát Station
// ============================================================

let cart = JSON.parse(localStorage.getItem('gk_cart') || '[]');

// ---------- Persist ----------
function saveCart() {
  localStorage.setItem('gk_cart', JSON.stringify(cart));
  updateBadge();
  renderCartSidebar();
}

function updateBadge() {
  const b = document.getElementById('cart-badge');
  if (!b) return;
  const total = cart.reduce((s, i) => s + i.qty, 0);
  b.textContent = total;
  b.style.display = total > 0 ? 'flex' : 'none';
}

// ---------- Add ----------
function addToCart(product, size, qty = 1) {
  const unitPrice = calcPrice(product.price, size);
  const existing  = cart.find(i => i.id === product.id && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: product.id, name: product.name, image: product.image,
                size, unitPrice, qty });
  }
  saveCart();
  toast.success('Đã thêm vào giỏ!', `${product.name} – Size ${size}`);
}

function calcPrice(base, size) {
  if (size === 'M') return Math.round(base * 1.2);
  if (size === 'L') return Math.round(base * 1.4);
  return base;
}

// ---------- Update qty ----------
function updateQty(id, size, delta) {
  const item = cart.find(i => i.id === id && i.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeItem(id, size, true);
  else saveCart();
}

// ---------- Remove ----------
function removeItem(id, size, silent = false) {
  const name = cart.find(i => i.id === id && i.size === size)?.name || '';
  cart = cart.filter(i => !(i.id === id && i.size === size));
  saveCart();
  if (!silent) toast.warning('Đã xóa', name);
}

// ---------- Clear ----------
function clearCart() {
  if (!cart.length) return;
  cart = [];
  saveCart();
  toast.info('Đã dọn sạch giỏ hàng');
}

// ---------- Total ----------
function cartTotal() {
  return cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
}

// ============================================================
// RENDER CART SIDEBAR
// ============================================================
function renderCartSidebar() {
  const listEl   = document.getElementById('cart-list');
  const emptyEl  = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');
  const totalEl  = document.getElementById('cart-total');
  if (!listEl) return;

  // Clear previous items
  listEl.querySelectorAll('.gk-cart-item').forEach(el => el.remove());

  if (cart.length === 0) {
    emptyEl?.classList.remove('hidden');
    footerEl?.classList.add('hidden');
    return;
  }

  emptyEl?.classList.add('hidden');
  footerEl?.classList.remove('hidden');

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gk-cart-item flex gap-3 items-center p-3 rounded-2xl bg-white/5 border border-white/10';
    div.innerHTML = `
      <img src="${esc(item.image)}" alt="${esc(item.name)}"
           class="w-14 h-14 rounded-xl object-cover flex-shrink-0"
           onerror="this.src='https://images.unsplash.com/photo-1541167760496-1628856ab772?w=120&h=120&fit=crop'" />
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-white text-sm truncate">${esc(item.name)}</div>
        <div class="text-xs text-gray-400 mt-0.5">Size ${esc(item.size)} · ${fmtVND(item.unitPrice)}</div>
      </div>
      <div class="flex flex-col items-end gap-1.5">
        <div class="flex items-center gap-1.5">
          <button onclick="updateQty(${item.id},'${item.size}',-1)" class="gk-qty-btn">−</button>
          <span class="text-sm font-bold w-5 text-center text-white">${item.qty}</span>
          <button onclick="updateQty(${item.id},'${item.size}',1)"  class="gk-qty-btn">+</button>
        </div>
        <div class="text-xs font-bold text-primary">${fmtVND(item.unitPrice * item.qty)}</div>
        <button onclick="removeItem(${item.id},'${item.size}')" class="text-gray-500 hover:text-red-400 text-xs transition-colors">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    listEl.appendChild(div);
  });

  if (totalEl) totalEl.textContent = fmtVND(cartTotal());
}

// ============================================================
// SIDEBAR TOGGLE
// ============================================================
function openCart() {
  document.getElementById('cart-sidebar')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  renderCartSidebar();
}

function closeCart() {
  document.getElementById('cart-sidebar')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.add('hidden');
  document.body.style.overflow = '';
}

// ============================================================
// CHECKOUT MODAL
// ============================================================
function openCheckout() {
  if (!cart.length) { toast.warning('Giỏ trống!', 'Thêm sản phẩm trước nhé.'); return; }
  if (!auth.currentUser) {
    toast.info('Vui lòng đăng nhập', 'Bạn cần đăng nhập để đặt hàng.');
    setTimeout(() => window.location.href = 'pages/login.html', 1400);
    return;
  }

  // Populate summary
  const summary = document.getElementById('co-summary');
  if (summary) {
    summary.innerHTML = cart.map(i => `
      <div class="flex justify-between text-sm text-gray-300 py-1">
        <span>${esc(i.name)} <span class="text-gray-500">Size ${i.size} ×${i.qty}</span></span>
        <span class="text-primary font-semibold">${fmtVND(i.unitPrice * i.qty)}</span>
      </div>`).join('');
  }
  const totEl = document.getElementById('co-total');
  if (totEl) totEl.textContent = fmtVND(cartTotal());

  // Pre-fill name
  const u = auth.currentUser;
  const nameInput = document.getElementById('co-name');
  if (nameInput && u?.displayName) nameInput.value = u.displayName;

  closeCart();
  document.getElementById('checkout-modal')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkout-modal')?.classList.remove('open');
  document.body.style.overflow = '';
  addrOK = false;
}

// ============================================================
// ADDRESS VALIDATION
// ============================================================
let addrOK   = false;
let addrTimer = null;

function onAddressInput(val) {
  clearTimeout(addrTimer);
  addrOK = false;
  const statusEl = document.getElementById('addr-status');
  const msgEl    = document.getElementById('addr-msg');
  if (!statusEl || !msgEl) return;
  if (val.length < 8) {
    statusEl.innerHTML = ''; msgEl.textContent = ''; msgEl.className = '';
    return;
  }
  statusEl.innerHTML = '<i class="fas fa-spinner fa-spin text-gray-400 text-sm"></i>';
  addrTimer = setTimeout(() => geocode(val, statusEl, msgEl), 750);
}

async function geocode(addr, statusEl, msgEl) {
  try {
    const q   = encodeURIComponent(addr + ', Việt Nam');
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${q}&key=${GOOGLE_MAPS_API_KEY}&language=vi&region=VN`;
    const res  = await fetch(url);
    const data = await res.json();

    if (data.status === 'OK' && data.results.length) {
      addrOK = true;
      statusEl.innerHTML = '<i class="fas fa-check-circle text-green-400 text-sm"></i>';
      msgEl.textContent  = '✓ ' + data.results[0].formatted_address;
      msgEl.className    = 'text-xs text-green-400 mt-1';
      document.getElementById('co-address')?.classList.add('valid');
      document.getElementById('co-address')?.classList.remove('invalid');
    } else {
      throw new Error('not_found');
    }
  } catch {
    // Nếu chưa cấu hình Maps API → cho phép đặt hàng với cảnh báo
    if (GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
      addrOK = true;
      statusEl.innerHTML = '<i class="fas fa-exclamation-circle text-yellow-400 text-sm"></i>';
      msgEl.textContent  = '⚠ Maps API chưa được cấu hình – địa chỉ chưa được xác thực.';
      msgEl.className    = 'text-xs text-yellow-400 mt-1';
    } else {
      addrOK = false;
      statusEl.innerHTML = '<i class="fas fa-times-circle text-red-400 text-sm"></i>';
      msgEl.textContent  = '✗ Không tìm thấy địa chỉ này. Vui lòng kiểm tra lại.';
      msgEl.className    = 'text-xs text-red-400 mt-1';
      document.getElementById('co-address')?.classList.add('invalid');
      document.getElementById('co-address')?.classList.remove('valid');
    }
  }
}

// ============================================================
// PLACE ORDER
// ============================================================
async function placeOrder() {
  const name  = document.getElementById('co-name')?.value.trim();
  const phone = document.getElementById('co-phone')?.value.trim();
  const addr  = document.getElementById('co-address')?.value.trim();

  if (!name || !phone || !addr) {
    toast.error('Thiếu thông tin!', 'Vui lòng điền đầy đủ.'); return;
  }
  if (!/^0\d{9}$/.test(phone)) {
    toast.error('SĐT không hợp lệ!', 'Nhập đúng định dạng 10 số.'); return;
  }
  if (!addrOK && GOOGLE_MAPS_API_KEY !== 'YOUR_GOOGLE_MAPS_API_KEY') {
    toast.error('Địa chỉ chưa hợp lệ!', 'Vui lòng kiểm tra lại địa chỉ.'); return;
  }

  const btn = document.getElementById('place-order-btn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Đang xử lý...'; }

  try {
    await db.collection('orders').add({
      userId:       auth.currentUser?.uid || null,
      customerName: name,
      phoneNumber:  phone,
      address:      addr,
      products:     cart.map(i => ({ name:i.name, size:i.size, qty:i.qty, unitPrice:i.unitPrice, subtotal:i.unitPrice*i.qty })),
      totalPrice:   cartTotal(),
      orderTime:    nowGMT7(),
      status:       'pending',
      createdAt:    firebase.firestore.FieldValue.serverTimestamp(),
    });

    cart = [];
    saveCart();
    closeCheckout();
    toast.success('Đặt hàng thành công! 🎉', 'Chúng tôi sẽ giao trong 30 phút.');
  } catch (e) {
    console.error(e);
    toast.error('Lỗi!', 'Không thể đặt hàng. Thử lại.');
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Xác Nhận Đặt Hàng'; }
  }
}

// Init badge on load
document.addEventListener('DOMContentLoaded', updateBadge);
