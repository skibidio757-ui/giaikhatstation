// ============================================================
// TOAST NOTIFICATION – Giải Khát Station
// Hiện giữa màn hình, glassmorphism, fade + zoom
// ============================================================

(function () {
  // Tạo container nếu chưa có
  function getContainer() {
    let c = document.getElementById('gk-toast-wrap');
    if (!c) {
      c = document.createElement('div');
      c.id = 'gk-toast-wrap';
      c.style.cssText = `
        position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);
        z-index:99999; display:flex; flex-direction:column; gap:12px;
        align-items:center; pointer-events:none; width:90%; max-width:380px;
      `;
      document.body.appendChild(c);
    }
    return c;
  }

  const ICONS = {
    success: '<i class="fas fa-check-circle"></i>',
    error:   '<i class="fas fa-times-circle"></i>',
    warning: '<i class="fas fa-exclamation-triangle"></i>',
    info:    '<i class="fas fa-info-circle"></i>',
  };

  const COLORS = {
    success: { bg:'rgba(139,195,74,0.18)',  border:'rgba(139,195,74,0.45)',  icon:'#8BC34A' },
    error:   { bg:'rgba(244,67,54,0.18)',   border:'rgba(244,67,54,0.45)',   icon:'#f44336' },
    warning: { bg:'rgba(255,152,0,0.18)',   border:'rgba(255,152,0,0.45)',   icon:'#FF9800' },
    info:    { bg:'rgba(255,255,255,0.10)', border:'rgba(255,255,255,0.25)', icon:'#AED581' },
  };

  window.showToast = function (type = 'info', title = '', msg = '') {
    const wrap  = getContainer();
    const c     = COLORS[type] || COLORS.info;
    const toast = document.createElement('div');
    toast.style.cssText = `
      display:flex; align-items:flex-start; gap:12px;
      padding:14px 18px; border-radius:16px;
      background:${c.bg}; border:1px solid ${c.border};
      backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
      box-shadow:0 16px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08);
      pointer-events:auto; min-width:260px;
      animation: gkToastIn .38s cubic-bezier(.34,1.56,.64,1) forwards;
      font-family:'Be Vietnam Pro',sans-serif;
    `;
    toast.innerHTML = `
      <span style="color:${c.icon};font-size:1.25rem;flex-shrink:0;margin-top:1px">${ICONS[type]||ICONS.info}</span>
      <div style="flex:1">
        <div style="font-weight:700;font-size:.9rem;color:#fff">${esc(title)}</div>
        ${msg ? `<div style="font-size:.78rem;color:rgba(255,255,255,.6);margin-top:2px">${esc(msg)}</div>` : ''}
      </div>
      <button onclick="this.closest('div[style]').remove()"
        style="background:none;border:none;color:rgba(255,255,255,.4);cursor:pointer;font-size:.85rem;padding:2px;flex-shrink:0">
        <i class="fas fa-times"></i>
      </button>
      <div style="position:absolute;bottom:0;left:0;height:3px;border-radius:0 0 16px 16px;
                  background:${c.icon};animation:gkProgress 3s linear forwards"></div>
    `;
    toast.style.position = 'relative';

    // Inject keyframes once
    if (!document.getElementById('gk-toast-kf')) {
      const s = document.createElement('style');
      s.id = 'gk-toast-kf';
      s.textContent = `
        @keyframes gkToastIn  { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }
        @keyframes gkToastOut { from{opacity:1;transform:scale(1)}   to{opacity:0;transform:scale(.85)} }
        @keyframes gkProgress { from{width:100%} to{width:0} }
      `;
      document.head.appendChild(s);
    }

    wrap.prepend(toast);

    let t = setTimeout(dismiss, 3200);
    toast.addEventListener('mouseenter', () => clearTimeout(t));
    toast.addEventListener('mouseleave', () => { t = setTimeout(dismiss, 1800); });

    function dismiss() {
      toast.style.animation = 'gkToastOut .3s ease forwards';
      setTimeout(() => toast.remove(), 310);
    }
  };

  // Shortcuts
  window.toast = {
    success: (t, m) => showToast('success', t, m),
    error:   (t, m) => showToast('error',   t, m),
    warning: (t, m) => showToast('warning', t, m),
    info:    (t, m) => showToast('info',    t, m),
  };
})();
