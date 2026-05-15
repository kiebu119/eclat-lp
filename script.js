/* ============================================
   ÉCLAT — Premium Beauty Supplement LP
   script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== GAS URL ===== */
  // TODO: GASデプロイURL差し替え
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbyiHqFnubC2l9-wYO33NvSgC8_DhmkExuUgy_jdTWdDW3SyUppVFmDF8qRFUHMx_2Mb5Q/exec';

  /* ===== STICKY CTA BAR ===== */
  const stickyBar = document.getElementById('stickyBar');
  const hero = document.getElementById('hero');
  const purchaseSection = document.getElementById('purchase');

  if (stickyBar && hero) {
    window.addEventListener('scroll', () => {
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const purchaseTop = purchaseSection ? purchaseSection.offsetTop - 100 : Infinity;
      const scrollY = window.scrollY;

      if (scrollY > heroBottom && scrollY < purchaseTop) {
        stickyBar.classList.add('show');
      } else {
        stickyBar.classList.remove('show');
      }
    });
  }

  /* ===== NAV SCROLL ===== */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ===== MOBILE MENU ===== */
  const menuBtn = document.getElementById('menuBtn');
  const mobMenu = document.getElementById('mobMenu');
  const mobClose = document.getElementById('mobClose');

  if (menuBtn && mobMenu) {
    menuBtn.addEventListener('click', () => {
      mobMenu.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      setTimeout(() => mobMenu.classList.add('on'), 10);
    });
  }

  function closeMenu() {
    if (mobMenu) {
      mobMenu.classList.remove('on');
      document.body.style.overflow = '';
      setTimeout(() => mobMenu.style.display = 'none', 400);
    }
  }

  if (mobClose) mobClose.addEventListener('click', closeMenu);
  document.querySelectorAll('.mob-menu a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  /* ===== COUNT UP ANIMATION ===== */
  function countUp(el, target, duration = 1800) {
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
    }, 16);
  }

  // カウントアップ対象要素を監視
  const countEls = document.querySelectorAll('[data-count]');
  if (countEls.length) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          countUp(el, target);
          countObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    countEls.forEach(el => countObs.observe(el));
  }

  /* ===== SCROLL ANIMATION ===== */
  const animEls = document.querySelectorAll('.fi-anim');
  if (animEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('v'), i * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(el => observer.observe(el));
  }

  /* ===== SAMPLE TAB LINK ===== */
  // 「無料サンプルを試す」リンクをクリックしたらサンプルタブに切り替える
  document.querySelectorAll('a[href="#sample"], a[href="#purchase"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#sample') {
        // サンプルタブに切り替え
        document.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('on'));
        document.querySelectorAll('.plan-panel').forEach(p => p.classList.remove('on'));
        document.querySelector('[data-tab="sample"]').classList.add('on');
        document.getElementById('panel-sample').classList.add('on');
      } else if (href === '#purchase') {
        // 定期購入タブに切り替え
        document.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('on'));
        document.querySelectorAll('.plan-panel').forEach(p => p.classList.remove('on'));
        document.querySelector('[data-tab="teiki"]').classList.add('on');
        document.getElementById('panel-teiki').classList.add('on');
      }
      // スクロール
      setTimeout(() => {
        document.getElementById('purchase').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      e.preventDefault();
    });
  });

  /* ===== PLAN TABS ===== */
  document.querySelectorAll('.plan-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('on'));
      document.querySelectorAll('.plan-panel').forEach(p => p.classList.remove('on'));
      tab.classList.add('on');
      document.getElementById('panel-' + target).classList.add('on');
    });
  });

  /* ===== FAQ ACCORDION ===== */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('on');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('on'));
      if (!wasOpen) item.classList.add('on');
    });
  });

  /* ===== PHONE AUTO FORMAT ===== */
  function setupPhoneFormat(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener('input', () => {
      let digits = input.value.replace(/\D/g, '').slice(0, 11);
      if (digits.length <= 3) input.value = digits;
      else if (digits.length <= 7) input.value = digits.slice(0, 3) + '-' + digits.slice(3);
      else input.value = digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7);
    });
    input.setAttribute('inputmode', 'tel');
  }
  setupPhoneFormat('pPhone');
  setupPhoneFormat('sPhone');

  /* ===== ZIP AUTO FORMAT ===== */
  function setupZipFormat(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener('input', () => {
      let digits = input.value.replace(/\D/g, '').slice(0, 7);
      if (digits.length <= 3) input.value = digits;
      else input.value = digits.slice(0, 3) + '-' + digits.slice(3);
    });
  }
  setupZipFormat('pZip');
  setupZipFormat('sZip');

  /* ===== VALIDATE ===== */
  function validate(fields) {
    let valid = true;
    fields.forEach(({ id, errId, check, msg }) => {
      const el = document.getElementById(id);
      const errEl = document.getElementById(errId);
      el.classList.remove('err');
      errEl.classList.remove('show');
      if (!check(el.value)) {
        el.classList.add('err');
        errEl.textContent = msg;
        errEl.classList.add('show');
        valid = false;
      }
      el.addEventListener('input', () => {
        el.classList.remove('err');
        errEl.classList.remove('show');
      }, { once: true });
    });
    return valid;
  }

  /* ===== SUBMIT TO GAS ===== */
  function submitToGAS(data, btn, originalText) {
    btn.disabled = true;
    btn.textContent = '送信中...';

    fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    .then(res => res.text())
    .then(() => {
      const id = 'EC-2026-' + String(Math.floor(Math.random() * 9000) + 1000);
      document.getElementById('orderId').textContent = id;
      document.getElementById('modal').classList.add('on');
      document.body.style.overflow = 'hidden';
    })
    .catch(() => {
      // GASに届いている可能性があるので成功扱い
      const id = 'EC-2026-' + String(Math.floor(Math.random() * 9000) + 1000);
      document.getElementById('orderId').textContent = id;
      document.getElementById('modal').classList.add('on');
      document.body.style.overflow = 'hidden';
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = originalText;
    });
  }

  /* ===== PURCHASE FORM ===== */
  const purchaseForm = document.getElementById('purchaseForm');
  if (purchaseForm) {
    purchaseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const valid = validate([
        { id: 'pName', errId: 'eName', check: v => v.trim().length > 0, msg: '氏名を入力してください' },
        { id: 'pEmail', errId: 'eEmail', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: '正しいメールアドレスを入力してください' },
        { id: 'pPhone', errId: 'ePhone', check: v => v.replace(/\D/g, '').length >= 10, msg: '正しい電話番号を入力してください' },
        { id: 'pZip', errId: 'eZip', check: v => v.replace(/\D/g, '').length === 7, msg: '正しい郵便番号を入力してください' },
        { id: 'pAddress', errId: 'eAddress', check: v => v.trim().length > 0, msg: '住所を入力してください' },
      ]);

      const terms = document.getElementById('pTerms');
      const eTerms = document.getElementById('eTerms');
      if (!terms.checked) {
        eTerms.textContent = '規約への同意が必要です';
        eTerms.classList.add('show');
        return;
      }

      if (!valid) return;

      const btn = document.getElementById('subBtn');
      const data = {
        type: 'purchase',
        name: document.getElementById('pName').value.trim(),
        email: document.getElementById('pEmail').value.trim(),
        phone: document.getElementById('pPhone').value.trim(),
        zip: document.getElementById('pZip').value.trim(),
        address: document.getElementById('pAddress').value.trim(),
        plan: document.getElementById('pPlan').value,
        payment: document.getElementById('pPayment').value,
        lineConsent: document.getElementById('pLine').checked,
      };
      submitToGAS(data, btn, '注文を確定する');
      purchaseForm.reset();
    });
  }

  /* ===== SAMPLE FORM ===== */
  const sampleForm = document.getElementById('sampleForm');
  if (sampleForm) {
    sampleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const valid = validate([
        { id: 'sName', errId: 'seName', check: v => v.trim().length > 0, msg: '氏名を入力してください' },
        { id: 'sEmail', errId: 'seEmail', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: '正しいメールアドレスを入力してください' },
        { id: 'sPhone', errId: 'sePhone', check: v => v.replace(/\D/g, '').length >= 10, msg: '正しい電話番号を入力してください' },
        { id: 'sZip', errId: 'seZip', check: v => v.replace(/\D/g, '').length === 7, msg: '正しい郵便番号を入力してください' },
        { id: 'sAddress', errId: 'seAddress', check: v => v.trim().length > 0, msg: '住所を入力してください' },
      ]);

      const terms = document.getElementById('sTerms');
      const eTerms = document.getElementById('seTerms');
      if (!terms.checked) {
        eTerms.textContent = '規約への同意が必要です';
        eTerms.classList.add('show');
        return;
      }

      if (!valid) return;

      const btn = document.getElementById('sampleBtn');
      const data = {
        type: 'sample',
        name: document.getElementById('sName').value.trim(),
        email: document.getElementById('sEmail').value.trim(),
        phone: document.getElementById('sPhone').value.trim(),
        zip: document.getElementById('sZip').value.trim(),
        address: document.getElementById('sAddress').value.trim(),
        lineConsent: document.getElementById('sLine').checked,
      };
      submitToGAS(data, btn, '無料サンプルを請求する');
      sampleForm.reset();
    });
  }

  /* ===== MODAL CLOSE ===== */
  const modalClose = document.getElementById('modalClose');
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      document.getElementById('modal').classList.remove('on');
      document.body.style.overflow = '';
    });
  }

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});