// ============================================================
// PRODUCTS – Giải Khát Station
// 6 loại đồ uống chính với hình ảnh Unsplash thực tế
// ============================================================

const products = [
  {
    id: 1,
    name: 'Matcha Latte',
    shortDesc: 'Matcha Nhật Bản cao cấp, béo ngậy, thanh mát.',
    longDesc: 'Matcha latte làm từ bột matcha Nhật Bản nguyên chất grade premium, pha cùng sữa tươi Anchor béo ngậy theo tỷ lệ vàng. Hương vị thơm nhẹ đắng đặc trưng của trà xanh, dịu ngọt tự nhiên. Hoàn hảo cho buổi sáng hoặc chiều tà.',
    ingredients: '🍵 Bột matcha Nhật Bản, sữa tươi, đường mía, đá viên',
    volume: '250ml / 350ml / 450ml',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500&h=400&fit=crop',
    rating: 4.9, reviews: 328,
    badge: 'Bán chạy',
    color: '#8BC34A',
  },
  {
    id: 2,
    name: 'Cacao Nóng',
    shortDesc: 'Cacao nguyên chất, đậm đà, ấm áp.',
    longDesc: 'Cacao nóng pha từ bột cacao nguyên chất 100% nhập khẩu từ Ivory Coast – vùng cacao nổi tiếng nhất thế giới. Kết hợp sữa nguyên kem và chút vanilla tạo nên hương vị sô cô la đậm đà, ấm lòng. Thêm một lớp whipping cream phủ trên cùng cho cảm giác béo ngậy.',
    ingredients: '🍫 Bột cacao 100%, sữa nguyên kem, đường, vanilla, whipping cream',
    volume: '250ml / 350ml / 450ml',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&h=400&fit=crop',
    rating: 4.8, reviews: 215,
    badge: 'Mới',
    color: '#795548',
  },
  {
    id: 3,
    name: 'Cà Phê Sữa Đá',
    shortDesc: 'Cà phê rang xay, sữa đặc, đá viên mát lạnh.',
    longDesc: 'Cà phê phin truyền thống pha từ hạt Robusta Buôn Ma Thuột và Arabica Cầu Đất pha trộn theo tỷ lệ độc quyền. Sữa đặc Ông Thọ nguyên bản, đá viên trong suốt. Từng giọt cà phê rỏ đều, đậm vị, thơm lừng – đúng chuẩn cà phê Việt.',
    ingredients: '☕ Cà phê hạt Robusta + Arabica, sữa đặc, đá viên',
    volume: '250ml / 350ml / 450ml',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=400&fit=crop',
    rating: 4.7, reviews: 512,
    badge: 'Phổ biến',
    color: '#6D4C41',
  },
  {
    id: 4,
    name: 'Nước Cam Tươi',
    shortDesc: 'Cam Sành vắt tươi, ngọt thanh, nhiều vitamin C.',
    longDesc: 'Nước cam vắt tươi 100% từ cam Sành Vĩnh Long – giống cam ngọt đặc trưng miền Tây. Vắt ngay tại chỗ, không pha loãng, không đường, không chất bảo quản. Một ly đủ lượng vitamin C cho cả ngày. Tươi ngon – Lành mạnh – Thuần tự nhiên.',
    ingredients: '🍊 Cam Sành tươi 100%, không đường, không chất bảo quản',
    volume: '250ml / 350ml / 450ml',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&h=400&fit=crop',
    rating: 4.9, reviews: 401,
    badge: 'Tươi 100%',
    color: '#FF9800',
  },
  {
    id: 5,
    name: 'Sữa Đậu Nành',
    shortDesc: 'Đậu nành rang vàng, xay mịn, thơm bùi béo ngậy.',
    longDesc: 'Sữa đậu nành tự nấu mỗi sáng từ đậu nành hạt vàng được chọn lọc kỹ. Ngâm qua đêm, rang vàng nhẹ trước khi xay – kỹ thuật rang tạo hương thơm bùi đặc biệt. Không có chất bảo quản, không màu nhân tạo. Đường phèn thêm vào vừa phải, thanh ngọt tự nhiên.',
    ingredients: '🫘 Đậu nành hạt, đường phèn, nước lọc, không chất bảo quản',
    volume: '250ml / 350ml / 450ml',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&h=400&fit=crop',
    rating: 4.6, reviews: 187,
    badge: 'Lành mạnh',
    color: '#F9A825',
  },
  {
    id: 6,
    name: 'Sữa Tươi Nguyên Chất',
    shortDesc: 'Sữa tươi Vinamilk, nguyên chất, giàu canxi.',
    longDesc: 'Sữa tươi thanh trùng Vinamilk nguyên chất 100%, không pha loãng. Phục vụ lạnh hoặc nóng theo yêu cầu. Thêm các topping tuỳ chọn: phô mai, trân châu, thạch. Nguồn canxi và protein thiết yếu cho cả gia đình – an toàn cho trẻ em từ 1 tuổi trở lên.',
    ingredients: '🥛 Sữa tươi Vinamilk 100%, tùy chọn đường, lạnh/nóng',
    volume: '250ml / 350ml / 450ml',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=400&fit=crop',
    rating: 4.7, reviews: 263,
    badge: 'Dinh dưỡng',
    color: '#E0E0E0',
  },
];

// Render rating stars
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '⭐'.repeat(full) + (half ? '✨' : '') + '☆'.repeat(empty);
}
// ============================================================
// ĐOẠN CODE TỰ ĐỘNG HIỂN THỊ MÓN ĂN RA MÀN HÌNH
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // Tìm khu vực chứa thực đơn trên giao diện web của bạn
  const productsContainer = document.getElementById("products-container") || document.querySelector(".products-grid") || document.querySelector("#products .row");
  
  if (productsContainer) {
    productsContainer.innerHTML = ""; // Xóa thông báo trống cũ
    
    // Vòng lặp tự động bốc từng món nước ra vẽ hiệu ứng
    products.forEach(product => {
      const productHTML = `
        <div class="product-card" style="border-top: 4px solid ${product.color || '#8BC34A'};" data-id="${product.id}">
          <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
          </div>
          <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.shortDesc}</p>
            <div class="product-meta">
              <span class="product-rating">${renderStars(product.rating)} (${product.reviews})</span>
              <span class="product-volume">${product.volume.split(' / ')[0]}</span>
            </div>
            <div class="product-footer">
              <span class="product-price">${product.price.toLocaleString('vi-VN')} đ</span>
              <button class="btn-add-cart" onclick="addToCart(${product.id})">Thêm món 🛒</button>
            </div>
          </div>
        </div>
      `;
      productsContainer.insertAdjacentHTML("beforeend", productHTML);
    });
  }
});
