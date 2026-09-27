/* ==========================================================================
   VOLT RC — main.js
   --------------------------------------------------------------------------
   Vanilla JS, no modules / no build step (works from file://).
   Depends on window.VOLT_I18N (i18n.js) and window.VOLT_PRODUCTS (products.js).

   Sections
     0.  Shortcuts, data & constants
     1.  Safe storage (every access wrapped in try/catch)
     2.  i18n helpers (t, tp, applyI18n)
     3.  Formatting helpers (money, stars, specs, search normalisation)
     4.  State
     5.  Overlay manager (focus trap, Esc, backdrop, scroll lock)
     6.  Header: sticky state, scroll-spy, back-to-top, ticker
     7.  Category & level counts
     8.  Filters
     9.  Product grid (render, load more, tilt)
     10. Quick view
     11. Cart (drawer, toast, fly-to-cart, checkout)
     12. Search overlay
     13. Deal of the week + countdown
     14. Reviews carousel
     15. Forms (newsletter + contact)
     16. Scroll reveal + count-up
     17. Language switching
     18. Event wiring & init
   ========================================================================== */

(function () {
  'use strict';

  /* ======================================================================
     0. Shortcuts, data & constants
     ====================================================================== */
  const doc = document;
  const root = doc.documentElement;
  const $ = (sel, ctx) => (ctx || doc).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || doc).querySelectorAll(sel));

  const I18N = window.VOLT_I18N || { ar: {}, en: {} };
  const PRODUCTS = window.VOLT_PRODUCTS || [];
  const CATEGORIES = (window.VOLT_CATEGORIES || []).map((c) => c.id);
  const DEAL = window.VOLT_DEAL || null;
  const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
  const LEVELS = ['beginner', 'intermediate', 'pro'];
  const BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();

  const FREE_SHIP = 500;   // SAR — free shipping threshold
  const SHIP_FEE = 35;     // SAR — flat shipping below threshold
  const VAT_RATE = 0.15;   // Saudi VAT
  const PAGE_SIZE = 12;    // products per "page" in the grid
  const MAX_QTY = 10;      // max units per line
  const PRICE_STEP = 50;

  const prices = PRODUCTS.map((p) => p.price);
  const PRICE_FLOOR = Math.floor(Math.min.apply(null, prices.concat([0])) / PRICE_STEP) * PRICE_STEP;
  const PRICE_CEIL = Math.ceil(Math.max.apply(null, prices.concat([PRICE_STEP])) / PRICE_STEP) * PRICE_STEP;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const desktopFilters = window.matchMedia('(min-width: 1024px)');
  const YEAR = new Date().getFullYear();

  /* ---------- DOM references ---------- */
  const el = {
    header: $('#siteHeader'),
    menuToggle: $('#menuToggle'),
    mobileNav: $('#mobileNav'),
    searchOpen: $('#searchOpen'),
    cartOpen: $('#cartOpen'),
    cartBadge: $('#cartBadge'),
    liveRegion: $('#liveRegion'),
    toTop: $('#toTop'),
    toTopProgress: $('#toTopProgress'),
    announceTrack: $('#announceTrack'),
    // shop
    grid: $('#productGrid'),
    emptyState: $('#emptyState'),
    resultCount: $('#resultCount'),
    chips: $('#activeChips'),
    loadMore: $('#loadMore'),
    loadMoreLabel: $('#loadMoreLabel'),
    shopSearch: $('#shopSearch'),
    sortSelect: $('#sortSelect'),
    shopTitle: $('#shopTitle'),
    filters: $('#filters'),
    filtersOpen: $('#filtersOpen'),
    filtersBackdrop: $('#filtersBackdrop'),
    filtersApplyLabel: $('#filtersApplyLabel'),
    activeFilterCount: $('#activeFilterCount'),
    fCategory: $('#fCategory'),
    fLevel: $('#fLevel'),
    fBrand: $('#fBrand'),
    priceMin: $('#priceMin'),
    priceMax: $('#priceMax'),
    priceMinOut: $('#priceMinOut'),
    priceMaxOut: $('#priceMaxOut'),
    priceRange: $('#priceRange'),
    inStock: $('#inStockOnly'),
    // quick view
    quickView: $('#quickView'),
    qvContent: $('#qvContent'),
    // cart
    cartDrawer: $('#cartDrawer'),
    cartLines: $('#cartLines'),
    cartEmpty: $('#cartEmpty'),
    cartSummary: $('#cartSummary'),
    cartCount: $('#cartCount'),
    freeShip: $('#freeShip'),
    freeShipText: $('#freeShipText'),
    freeShipMeter: $('#freeShipMeter'),
    sumSubtotal: $('#sumSubtotal'),
    sumShipping: $('#sumShipping'),
    sumVat: $('#sumVat'),
    sumTotal: $('#sumTotal'),
    checkoutBtn: $('#checkoutBtn'),
    checkoutModal: $('#checkoutModal'),
    coText: $('#coText'),
    coOrder: $('#coOrder'),
    coItems: $('#coItems'),
    coTotal: $('#coTotal'),
    toast: $('#toast'),
    toastImg: $('#toastImg'),
    toastName: $('#toastName'),
    toastView: $('#toastView'),
    // search
    searchOverlay: $('#searchOverlay'),
    searchInput: $('#searchInput'),
    searchResults: $('#searchResults'),
    searchPopular: $('#searchPopular'),
    searchStatus: $('#searchStatus'),
    searchAll: $('#searchAll'),
    // deal
    dealImg: $('#dealImg'),
    dealTag: $('#dealTag'),
    dealName: $('#dealName'),
    dealDesc: $('#dealDesc'),
    dealPrice: $('#dealPrice'),
    dealMeter: $('#dealMeter'),
    dealStockText: $('#dealStockText'),
    dealAdd: $('#dealAdd'),
    dealDetails: $('#dealDetails'),
    countdown: $('#countdown'),
    dealEnded: $('#dealEnded'),
    cdDays: $('#cdDays'),
    cdHours: $('#cdHours'),
    cdMins: $('#cdMins'),
    cdSecs: $('#cdSecs'),
    // forms
    nlForm: $('#newsletterForm'),
    nlEmail: $('#nlEmail'),
    nlSuccess: $('#nlSuccess'),
    contactForm: $('#contactForm'),
    contactSuccess: $('#contactSuccess'),
    contactSuccessText: $('#contactSuccessText'),
    contactAgain: $('#contactAgain')
  };

  /* ======================================================================
     1. Safe storage — the site keeps working if storage throws
     ====================================================================== */
  const storage = {
    get(key) {
      try { return window.localStorage.getItem(key); } catch (e) { return null; }
    },
    set(key, value) {
      try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
    },
    getJSON(key, fallback) {
      const raw = this.get(key);
      if (raw == null) return fallback;
      try { return JSON.parse(raw); } catch (e) { return fallback; }
    },
    setJSON(key, value) {
      try { this.set(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
    }
  };

  /* ======================================================================
     2. i18n helpers
     ====================================================================== */
  const pluralCache = {};

  function fill(str, vars) {
    const v = Object.assign({ year: YEAR }, vars || {});
    return String(str).replace(/\{(\w+)\}/g, (m, k) => (v[k] != null ? v[k] : m));
  }

  function lookup(key) {
    const dict = I18N[state.lang] || {};
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    const fb = I18N.ar || {};
    return Object.prototype.hasOwnProperty.call(fb, key) ? fb[key] : null;
  }

  /** Translate a key, filling {placeholders}. */
  function t(key, vars) {
    let s = lookup(key);
    if (s == null) return key;
    if (typeof s === 'object') s = s.other;
    return fill(s, vars);
  }

  /** Plural-aware translation (Arabic has 6 plural categories). */
  function tp(key, n, vars) {
    const entry = lookup(key);
    const base = Object.assign({ n: fmt(n) }, vars || {});
    if (entry == null) return String(n);
    if (typeof entry === 'string') return fill(entry, base);
    let cat = 'other';
    try {
      const pr = pluralCache[state.lang] || (pluralCache[state.lang] = new Intl.PluralRules(state.lang));
      cat = pr.select(n);
    } catch (e) { cat = n === 1 ? 'one' : 'other'; }
    if (n === 0 && entry.zero) cat = 'zero';
    return fill(entry[cat] || entry.other, base);
  }

  /* ---------- Bidi helpers ----------
     Brand, store and model names are always English. Inside Arabic text they
     are isolated so they never flip the line or drag punctuation around:
       • HTML contexts  → <bdi dir="ltr">Name</bdi>
       • Plain text     → U+2068 FSI … U+2069 PDI (aria-label, alt, title, meta)
     Dictionary strings use <bdi>…</bdi>; plain() converts them for attributes. */
  const FSI = '⁨';
  const PDI = '⁩';
  const HAS_ARABIC = /[؀-ۿݐ-ݿ]/;
  const iso = (s) => FSI + s + PDI;
  const bdi = (s) => '<bdi dir="ltr">' + esc(s) + '</bdi>';
  /** Latin-only values get an LTR isolate; values containing Arabic stay in the RTL flow. */
  const ltrHTML = (s) => (HAS_ARABIC.test(String(s)) ? esc(s) : bdi(s));

  function plain(s) {
    return String(s)
      .replace(/<bdi[^>]*>([\s\S]*?)<\/bdi>/g, FSI + '$1' + PDI)
      .replace(/<[^>]+>/g, '')
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&');
  }
  /** Plain-text translation (for attributes, document.title, textContent). */
  const tt = (key, vars) => plain(t(key, vars));

  /** Translate every static element carrying data-i18n* attributes. */
  function applyI18n(scope) {
    const ctx = scope || doc;
    $$('[data-i18n]', ctx).forEach((node) => {
      const s = t(node.dataset.i18n);
      if (s.indexOf('<') === -1) node.textContent = s; else node.innerHTML = s; // trusted dictionary markup (<bdi>)
    });
    $$('[data-i18n-html]', ctx).forEach((node) => { node.innerHTML = t(node.dataset.i18nHtml); });
    $$('[data-i18n-placeholder]', ctx).forEach((node) => { node.setAttribute('placeholder', tt(node.dataset.i18nPlaceholder)); });
    $$('[data-i18n-aria]', ctx).forEach((node) => { node.setAttribute('aria-label', tt(node.dataset.i18nAria)); });
    $$('[data-i18n-alt]', ctx).forEach((node) => { node.setAttribute('alt', tt(node.dataset.i18nAlt)); });
    $$('[data-i18n-content]', ctx).forEach((node) => { node.setAttribute('content', tt(node.dataset.i18nContent)); });
    $$('[data-query-key]', ctx).forEach((node) => { node.textContent = t(node.dataset.queryKey); });
  }

  /* ======================================================================
     3. Formatting helpers
     ====================================================================== */
  const nf0 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function fmt(n) { return nf0.format(n); }

  /** Price markup. {plain:true} returns text; {decimals:true} shows halalas. */
  function money(n, opts) {
    const o = opts || {};
    const num = o.decimals ? nf2.format(n) : nf0.format(Math.round(n));
    if (o.plain) return num + ' ' + t('currency');
    return '<span class="money"><span class="money__num">' + num + '</span> <span class="money__cur">' + esc(t('currency')) + '</span></span>';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* Product naming: the English model name is shown in both languages; the
     descriptor ("1/8 Desert Buggy" / "باجي صحراء كهربائي 1/8") is localised. */
  const pType = (p) => (state.lang === 'en' ? p.name_en : p.name_ar);
  const pDesc = (p) => (state.lang === 'en' ? p.desc_en : p.desc_ar);
  const pModelHTML = (p) => bdi(p.model);
  const pModelText = (p) => iso(p.model);
  /** Full plain-text name for alt text: Arabic descriptor first, so the line stays RTL. */
  const pLabel = (p) => (state.lang === 'en' ? p.model + ' ' + p.name_en : p.name_ar + ' ' + iso(p.model));
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const maxQty = (p) => Math.max(0, Math.min(p.stock, MAX_QTY));
  const salePct = (p) => (p.oldPrice && p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0);

  const STAR = '<svg aria-hidden="true"><use href="#i-star"/></svg>';
  const STARS5 = STAR + STAR + STAR + STAR + STAR;

  function starsHTML(r, extra) {
    return '<span class="stars ' + (extra || '') + '" style="--r:' + r + '" aria-hidden="true">' +
      '<span class="stars__base">' + STARS5 + '</span><span class="stars__fill">' + STARS5 + '</span></span>';
  }

  function ratingHTML(p) {
    const label = t('card.ratingAria', { r: p.rating.toFixed(1), x: tp('unit.review', p.reviews) });
    return '<div class="rating" role="img" aria-label="' + esc(label) + '">' + starsHTML(p.rating) +
      '<span class="rating__num">' + p.rating.toFixed(1) + '</span>' +
      '<span class="rating__count">(' + fmt(p.reviews) + ')</span></div>';
  }

  /** Localise a spec value; numbers get units by spec key. */
  function specValue(key, v) {
    if (v && typeof v === 'object') return v[state.lang] || v.en || '';
    if (typeof v === 'number') {
      switch (key) {
        case 'speed': return fmt(v) + ' ' + t('unit.kmh');
        case 'runtime':
        case 'flight': return tp('unit.min', v);
        case 'range': return v >= 1000 ? nf1.format(v / 1000) + ' ' + t('unit.km') : fmt(v) + ' ' + t('unit.m');
        case 'wingspan':
        case 'length': return fmt(v) + ' ' + t('unit.mm');
        case 'weight': return fmt(v) + ' ' + t('unit.g');
        default: return fmt(v);
      }
    }
    return String(v);
  }

  const HIGHLIGHT_KEYS = ['speed', 'flight', 'runtime', 'capacity', 'discharge', 'output', 'channels', 'esc', 'compat'];
  const SPEC_ICON = {
    speed: 'i-gauge', flight: 'i-clock', runtime: 'i-clock', capacity: 'i-cat-batteries',
    discharge: 'i-bolt', output: 'i-bolt', channels: 'i-signal', esc: 'i-bolt', compat: 'i-check'
  };
  const highlights = (p) => HIGHLIGHT_KEYS.filter((k) => p.specs && p.specs[k] != null).slice(0, 2);

  /** Normalise text for forgiving AR/EN search (diacritics, alef forms, digits). */
  function norm(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ًͯ-ٰٟـ]/g, '')
      .replace(/[إأآٱ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/ڤ/g, 'ف')
      .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
      .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
      .replace(/\s+/g, ' ')
      .trim();
  }

  const searchIndex = new Map(PRODUCTS.map((p) => {
    const specText = Object.keys(p.specs || {}).map((k) => {
      const v = p.specs[k];
      return v && typeof v === 'object' ? v.ar + ' ' + v.en : v;
    }).join(' ');
    const words = [
      p.model, p.name_ar, p.name_en, p.brand, p.category,
      (I18N.ar || {})['cat.' + p.category], (I18N.en || {})['cat.' + p.category],
      (I18N.ar || {})['level.' + p.level], (I18N.en || {})['level.' + p.level],
      (p.tags || []).join(' '), specText
    ];
    return [p.id, norm(words.join(' '))];
  }));

  function matches(p, q) {
    if (!q) return true;
    const hay = searchIndex.get(p.id) || '';
    return q.split(' ').every((tok) => hay.indexOf(tok) !== -1);
  }

  /* ======================================================================
     4. State
     ====================================================================== */
  const state = {
    lang: root.lang === 'en' ? 'en' : 'ar',
    cart: [],
    f: freshFilters(),
    sort: 'featured',
    shown: PAGE_SIZE,
    lastOrder: null,
    contactName: ''
  };

  function freshFilters() {
    return { cats: new Set(), brands: new Set(), levels: new Set(), min: PRICE_FLOOR, max: PRICE_CEIL, inStock: false, q: '' };
  }

  function loadCart() {
    const raw = storage.getJSON('volt.cart', []);
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((l) => l && byId.has(l.id) && byId.get(l.id).stock > 0)
      .map((l) => ({ id: l.id, qty: clamp(parseInt(l.qty, 10) || 1, 1, maxQty(byId.get(l.id))) }));
  }
  state.cart = loadCart();

  /* ======================================================================
     5. Overlay manager — one overlay at a time; focus trap, Esc, backdrop
     ====================================================================== */
  const Overlay = (function () {
    let current = null; // { node, trigger, onClose }
    const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function focusables(node) {
      return $$(FOCUSABLE, node).filter((f) => f.offsetParent !== null || f.getClientRects().length > 0);
    }

    function open(node, opts) {
      const o = opts || {};
      let trigger = o.trigger || doc.activeElement;
      if (current) {
        // Opening from inside another overlay: inherit its trigger so focus returns sensibly.
        if (current.node !== node && trigger && current.node.contains(trigger)) trigger = current.trigger;
        if (current.node !== node) close({ restoreFocus: false });
      }
      current = { node: node, trigger: trigger, onClose: o.onClose || null };
      node.classList.add('is-open');
      root.classList.add('is-locked');
      if (o.onOpen) o.onOpen();
      window.setTimeout(() => {
        const target = (o.initialFocus && $(o.initialFocus, node)) || focusables(node)[0] || node;
        try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); }
      }, 60);
    }

    function close(opts) {
      if (!current) return;
      const o = opts || {};
      const c = current;
      current = null;
      c.node.classList.remove('is-open');
      root.classList.remove('is-locked');
      if (c.onClose) c.onClose();
      if (o.restoreFocus !== false && c.trigger && doc.contains(c.trigger) && typeof c.trigger.focus === 'function') {
        try { c.trigger.focus({ preventScroll: true }); } catch (e) { c.trigger.focus(); }
      }
    }

    doc.addEventListener('keydown', (e) => {
      if (!current) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const list = focusables(current.node);
      if (!list.length) { e.preventDefault(); return; }
      const first = list[0];
      const last = list[list.length - 1];
      const active = doc.activeElement;
      if (!current.node.contains(active)) { e.preventDefault(); first.focus(); return; }
      if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    });

    return {
      open: open,
      close: close,
      get current() { return current ? current.node : null; }
    };
  })();

  /* ======================================================================
     6. Header: sticky state, scroll-spy, back-to-top, ticker
     ====================================================================== */
  const RING = 2 * Math.PI * 22;
  let scrollTicking = false;

  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      const y = window.scrollY || root.scrollTop;
      el.header.classList.toggle('is-scrolled', y > 8);
      el.toTop.classList.toggle('is-visible', y > 700);
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      el.toTopProgress.style.strokeDashoffset = String(RING * (1 - clamp(y / max, 0, 1)));
      scrollTicking = false;
    });
  }

  function initScrollSpy() {
    if (!('IntersectionObserver' in window)) return;
    const links = $$('.nav__link, .mnav a');
    const ids = ['home', 'categories', 'shop', 'deals', 'levels', 'reviews', 'contact'];
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((a) => {
          const on = a.getAttribute('href') === '#' + id;
          a.classList.toggle('is-active', on);
          if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach((id) => { const s = doc.getElementById(id); if (s) spy.observe(s); });
  }

  /** Duplicate the ticker list so the marquee loops seamlessly. */
  function initTicker() {
    const list = $('.announce__list', el.announceTrack);
    if (!list) return;
    for (let i = 0; i < 3; i++) {
      const clone = list.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      el.announceTrack.appendChild(clone);
    }
  }

  /* ======================================================================
     7. Category & level counts
     ====================================================================== */
  function countBy(key) {
    return PRODUCTS.reduce((acc, p) => { acc[p[key]] = (acc[p[key]] || 0) + 1; return acc; }, {});
  }
  const catCounts = countBy('category');
  const levelCounts = countBy('level');
  const brandCounts = countBy('brand');

  function renderCounts() {
    $$('[data-cat-count]').forEach((n) => { n.textContent = tp('unit.product', catCounts[n.dataset.catCount] || 0); });
    $$('[data-level-count]').forEach((n) => { n.textContent = '(' + fmt(levelCounts[n.dataset.levelCount] || 0) + ')'; });
  }

  /* ======================================================================
     8. Filters
     ====================================================================== */
  /** labelHTML must already be escaped (brands arrive wrapped in <bdi>). */
  function checkHTML(name, value, labelHTML, count, checked) {
    return '<label class="check"><input type="checkbox" name="' + name + '" value="' + esc(value) + '"' + (checked ? ' checked' : '') + '>' +
      '<span class="check__box" aria-hidden="true"><svg class="icon"><use href="#i-check"/></svg></span>' +
      '<span class="check__label">' + labelHTML + '</span>' +
      '<span class="check__count">' + fmt(count) + '</span></label>';
  }

  function pillHTML(name, value, label, checked) {
    return '<label class="pill pill--' + value + '"><input type="checkbox" name="' + name + '" value="' + esc(value) + '"' + (checked ? ' checked' : '') + '>' +
      '<span>' + esc(label) + '</span></label>';
  }

  function renderFilterOptions() {
    const f = state.f;
    el.fCategory.innerHTML = CATEGORIES.map((c) => checkHTML('cat', c, esc(t('cat.' + c)), catCounts[c] || 0, f.cats.has(c))).join('');
    el.fLevel.innerHTML = LEVELS.map((l) => pillHTML('level', l, t('level.' + l), f.levels.has(l))).join('');
    el.fBrand.innerHTML = BRANDS.map((b) => checkHTML('brand', b, bdi(b), brandCounts[b] || 0, f.brands.has(b))).join('');
  }

  function initPriceRange() {
    [el.priceMin, el.priceMax].forEach((r) => {
      r.min = PRICE_FLOOR;
      r.max = PRICE_CEIL;
      r.step = PRICE_STEP;
    });
    el.priceMin.value = state.f.min;
    el.priceMax.value = state.f.max;

    el.priceMin.addEventListener('input', () => {
      let v = Number(el.priceMin.value);
      if (v > state.f.max - PRICE_STEP) { v = state.f.max - PRICE_STEP; el.priceMin.value = v; }
      state.f.min = v;
      updateRangeUI();
      scheduleRender();
    });
    el.priceMax.addEventListener('input', () => {
      let v = Number(el.priceMax.value);
      if (v < state.f.min + PRICE_STEP) { v = state.f.min + PRICE_STEP; el.priceMax.value = v; }
      state.f.max = v;
      updateRangeUI();
      scheduleRender();
    });
  }

  function updateRangeUI() {
    const span = PRICE_CEIL - PRICE_FLOOR || 1;
    el.priceRange.style.setProperty('--from', ((state.f.min - PRICE_FLOOR) / span * 100) + '%');
    el.priceRange.style.setProperty('--to', ((PRICE_CEIL - state.f.max) / span * 100) + '%');
    el.priceMinOut.innerHTML = money(state.f.min);
    el.priceMaxOut.innerHTML = money(state.f.max);
    el.priceMin.setAttribute('aria-valuetext', money(state.f.min, { plain: true }));
    el.priceMax.setAttribute('aria-valuetext', money(state.f.max, { plain: true }));
    // Keep the min thumb reachable when both thumbs sit at the top end.
    el.priceMin.style.zIndex = state.f.min > PRICE_CEIL - PRICE_STEP * 3 ? '5' : '3';
  }

  function priceActive() { return state.f.min > PRICE_FLOOR || state.f.max < PRICE_CEIL; }

  function activeFilterTotal() {
    const f = state.f;
    return f.cats.size + f.brands.size + f.levels.size + (priceActive() ? 1 : 0) + (f.inStock ? 1 : 0);
  }

  /** Push state.f back into every control (after chips, shortcuts, clear). */
  function syncFilterControls() {
    renderFilterOptions();
    el.priceMin.value = state.f.min;
    el.priceMax.value = state.f.max;
    updateRangeUI();
    el.inStock.checked = state.f.inStock;
    el.shopSearch.value = state.f.q;
    el.sortSelect.value = state.sort;
  }

  function toggleSet(set, value, on) { if (on) set.add(value); else set.delete(value); }

  function renderChips() {
    const f = state.f;
    const chips = []; // { type, value, html } — html is escaped; English names isolated with <bdi>
    f.cats.forEach((c) => chips.push({ type: 'cat', value: c, html: esc(t('cat.' + c)) }));
    f.levels.forEach((l) => chips.push({ type: 'level', value: l, html: esc(t('level.' + l)) }));
    f.brands.forEach((b) => chips.push({ type: 'brand', value: b, html: bdi(b) }));
    if (priceActive()) chips.push({ type: 'price', value: '', html: money(f.min) + ' – ' + money(f.max) });
    if (f.inStock) chips.push({ type: 'stock', value: '', html: esc(t('chip.inStock')) });
    if (f.q.trim()) chips.push({ type: 'q', value: '', html: t('chip.search', { q: ltrHTML(f.q.trim()) }) });

    let html = chips.map((c) =>
      '<li><button type="button" class="fchip" data-chip-type="' + c.type + '" data-chip-value="' + esc(c.value) + '" aria-label="' + esc(tt('chip.remove', { x: plain(c.html) })) + '">' +
      '<span>' + c.html + '</span><svg class="icon" aria-hidden="true"><use href="#i-close"/></svg></button></li>'
    ).join('');
    if (chips.length > 1) html += '<li><button type="button" class="fchip fchip--clear" data-clear-filters>' + esc(t('filter.clear')) + '</button></li>';
    el.chips.innerHTML = html;

    const n = activeFilterTotal();
    el.activeFilterCount.hidden = n === 0;
    el.activeFilterCount.textContent = String(n);
  }

  function removeChip(type, value) {
    const f = state.f;
    if (type === 'cat') f.cats.delete(value);
    else if (type === 'level') f.levels.delete(value);
    else if (type === 'brand') f.brands.delete(value);
    else if (type === 'price') { f.min = PRICE_FLOOR; f.max = PRICE_CEIL; }
    else if (type === 'stock') f.inStock = false;
    else if (type === 'q') f.q = '';
    syncFilterControls();
    resetAndRender();
  }

  function clearFilters() {
    state.f = freshFilters();
    syncFilterControls();
    resetAndRender();
  }

  /** Shortcut used by category tiles, level cards, hero & footer links. */
  function applyShortcut(opts) {
    state.f = freshFilters();
    if (opts.cat) state.f.cats.add(opts.cat);
    if (opts.level) state.f.levels.add(opts.level);
    syncFilterControls();
    resetAndRender();
    scrollToShop();
    const label = opts.cat ? t('cat.' + opts.cat) : t('level.' + opts.level);
    announce(label + ' — ' + tp('unit.product', getResults().length));
  }

  function scrollToShop() {
    const target = doc.getElementById('shop');
    if (!target) return;
    target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
    window.setTimeout(() => {
      try { el.shopTitle.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    }, reduceMotion.matches ? 0 : 450);
  }

  let renderTimer = null;
  function scheduleRender() {
    window.clearTimeout(renderTimer);
    renderTimer = window.setTimeout(resetAndRender, 140);
  }

  function resetAndRender() {
    state.shown = PAGE_SIZE;
    renderProducts();
  }

  /* ======================================================================
     9. Product grid
     ====================================================================== */
  const SORTERS = {
    featured: (a, b) => (b.stock > 0) - (a.stock > 0) || b.featured - a.featured,
    priceAsc: (a, b) => a.price - b.price || b.featured - a.featured,
    priceDesc: (a, b) => b.price - a.price || b.featured - a.featured,
    rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews
  };

  function getResults() {
    const f = state.f;
    const q = norm(f.q);
    return PRODUCTS.filter((p) =>
      (!f.cats.size || f.cats.has(p.category)) &&
      (!f.brands.size || f.brands.has(p.brand)) &&
      (!f.levels.size || f.levels.has(p.level)) &&
      p.price >= f.min && p.price <= f.max &&
      (!f.inStock || p.stock > 0) &&
      matches(p, q)
    ).sort(SORTERS[state.sort] || SORTERS.featured);
  }

  function badgesHTML(p) {
    const out = [];
    const pct = salePct(p);
    if (pct) out.push('<span class="badge badge--sale">-' + pct + '%</span>');
    (p.badges || []).forEach((b) => out.push('<span class="badge badge--' + b + '">' + esc(t('badge.' + b)) + '</span>'));
    return '<div class="pcard__badges">' + out.join('') + '</div>';
  }

  function stockHTML(p) {
    if (p.stock <= 0) return '<p class="stock is-out"><span class="stock__dot"></span>' + esc(t('card.soldOut')) + '</p>';
    if (p.stock <= 5) return '<p class="stock is-low"><span class="stock__dot"></span>' + esc(t('card.left', { n: fmt(p.stock) })) + '</p>';
    return '<p class="stock is-ok"><span class="stock__dot"></span>' + esc(t('card.inStock')) + '</p>';
  }

  function cardHTML(p, i) {
    const model = pModelHTML(p);
    const soldOut = p.stock <= 0;
    const pct = salePct(p);
    const specs = highlights(p).map((k) =>
      '<li><svg class="icon" aria-hidden="true"><use href="#' + SPEC_ICON[k] + '"/></svg><span>' + ltrHTML(specValue(k, p.specs[k])) + '</span></li>'
    ).join('');

    return '<li class="pcard' + (soldOut ? ' is-soldout' : '') + '" style="--i:' + (i % PAGE_SIZE) + '">' +
      '<article class="pcard__inner" aria-labelledby="pn-' + p.id + ' pt-' + p.id + '">' +
        '<div class="pcard__media">' +
          '<svg class="media-fallback" aria-hidden="true"><use href="#i-cat-' + p.category + '"/></svg>' +
          '<img src="' + p.image + '" width="800" height="600" loading="lazy" decoding="async" alt="' + esc(pLabel(p)) + '">' +
          badgesHTML(p) +
          '<span class="level-tag level--' + p.level + '">' + esc(t('level.' + p.level)) + '</span>' +
          '<button class="pcard__quick" type="button" data-quick="' + p.id + '">' +
            '<svg class="icon" aria-hidden="true"><use href="#i-eye"/></svg><span>' + esc(t('card.quick')) + '</span>' +
            '<span class="sr-only">: ' + model + '</span></button>' +
        '</div>' +
        '<div class="pcard__body">' +
          '<p class="pcard__brand">' + bdi(p.brand) + '</p>' +
          '<h3 class="pcard__name" id="pn-' + p.id + '"><button type="button" data-quick="' + p.id + '">' + model + '</button></h3>' +
          '<p class="pcard__type" id="pt-' + p.id + '">' + esc(pType(p)) + '</p>' +
          ratingHTML(p) +
          (specs ? '<ul class="pcard__specs">' + specs + '</ul>' : '') +
          '<div class="pcard__foot">' +
            '<p class="price"><span class="price__now">' + money(p.price) + '</span>' +
              (pct ? '<s class="price__old">' + money(p.oldPrice) + '</s>' : '') + '</p>' +
            stockHTML(p) +
          '</div>' +
          '<button class="btn-add" type="button" data-add="' + p.id + '"' + (soldOut ? ' disabled' : '') + '>' +
            '<svg class="icon icon-cart" aria-hidden="true"><use href="#i-cart"/></svg>' +
            '<svg class="icon icon-ok" aria-hidden="true"><use href="#i-check"/></svg>' +
            '<span class="btn-add__label">' + esc(soldOut ? t('card.soldOut') : t('card.add')) + '</span>' +
            (soldOut ? '' : '<span class="sr-only">: ' + model + '</span>') +
          '</button>' +
        '</div>' +
      '</article>' +
    '</li>';
  }

  function renderProducts() {
    const results = getResults();
    const total = results.length;
    const visible = results.slice(0, state.shown);
    el.grid.innerHTML = visible.map(cardHTML).join('');
    el.grid.hidden = total === 0;
    el.emptyState.hidden = total > 0;
    el.resultCount.innerHTML = t('shop.found', { x: '<strong>' + esc(tp('unit.product', total)) + '</strong>' });
    updateLoadMore(total, visible.length);
    el.filtersApplyLabel.textContent = t('shop.apply', { x: tp('unit.product', total) });
    renderChips();
  }

  function updateLoadMore(total, shown) {
    const remaining = total - shown;
    el.loadMore.hidden = remaining <= 0;
    el.loadMoreLabel.textContent = t('shop.more', { n: fmt(remaining) });
  }

  /** Append the next page without re-animating existing cards. */
  function loadMore() {
    const results = getResults();
    const from = state.shown;
    state.shown += PAGE_SIZE;
    const next = results.slice(from, state.shown);
    el.grid.insertAdjacentHTML('beforeend', next.map((p, i) => cardHTML(p, i)).join(''));
    updateLoadMore(results.length, Math.min(state.shown, results.length));
    const firstNew = el.grid.children[from];
    if (firstNew) {
      const btn = $('.pcard__name button', firstNew);
      if (btn) btn.focus({ preventScroll: false });
    }
  }

  /** Pointer-driven 3D tilt + glare on product cards (fine pointers only). */
  function initTilt() {
    if (!finePointer.matches || reduceMotion.matches) return;
    el.grid.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.pcard__inner');
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.classList.add('is-tilting');
      card.style.setProperty('--rx', ((0.5 - y) * 7).toFixed(2) + 'deg');
      card.style.setProperty('--ry', ((x - 0.5) * 9).toFixed(2) + 'deg');
      card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    });
    el.grid.addEventListener('pointerout', (e) => {
      const card = e.target.closest('.pcard__inner');
      if (!card || card.contains(e.relatedTarget)) return;
      card.classList.remove('is-tilting');
      ['--rx', '--ry', '--mx', '--my'].forEach((v) => card.style.removeProperty(v));
    });
  }

  /* ======================================================================
     10. Quick view
     ====================================================================== */
  let qvId = null;
  let qvQty = 1;

  function openQuickView(id, trigger) {
    if (!byId.has(id)) return;
    qvId = id;
    qvQty = 1;
    renderQuickView();
    Overlay.open(el.quickView, { trigger: trigger });
  }

  function renderQuickView() {
    const p = byId.get(qvId);
    if (!p) return;
    const pct = salePct(p);
    const soldOut = p.stock <= 0;
    // [label key, cell HTML] — Latin-only values are LTR-isolated, Arabic values stay in the RTL flow
    const rows = [['brand', bdi(p.brand)], ['level', esc(t('level.' + p.level))]]
      .concat(Object.keys(p.specs || {}).map((k) => [k, ltrHTML(specValue(k, p.specs[k]))]))
      .map((r) => '<tr><th scope="row">' + esc(t('spec.' + r[0])) + '</th><td>' + r[1] + '</td></tr>')
      .join('');

    el.qvContent.innerHTML =
      '<div class="qv__media">' +
        '<svg class="media-fallback" aria-hidden="true"><use href="#i-cat-' + p.category + '"/></svg>' +
        '<img src="' + (p.imageLarge || p.image) + '" width="1200" height="900" alt="' + esc(pLabel(p)) + '">' +
        badgesHTML(p) +
        '<span class="qv__scan" aria-hidden="true"></span>' +
      '</div>' +
      '<div class="qv__body">' +
        '<p class="qv__brand">' + bdi(p.brand) + ' <span class="level-tag level--' + p.level + '">' + esc(t('level.' + p.level)) + '</span></p>' +
        '<h2 class="qv__title" id="qvTitle">' + pModelHTML(p) + '</h2>' +
        '<p class="qv__type">' + esc(pType(p)) + '</p>' +
        ratingHTML(p) +
        '<div class="qv__price"><span class="price__now">' + money(p.price) + '</span>' +
          (pct ? '<s class="price__old">' + money(p.oldPrice) + '</s><span class="save-pill">' + esc(t('qv.save', { x: money(p.oldPrice - p.price, { plain: true }) })) + '</span>' : '') +
        '</div>' +
        '<p class="qv__desc">' + esc(pDesc(p)) + '</p>' +
        '<div class="qv__buy">' +
          '<div class="qty" role="group" aria-label="' + esc(t('qv.qty')) + '">' +
            '<button type="button" data-qv-dec aria-label="' + esc(t('qv.dec')) + '"><svg class="icon" aria-hidden="true"><use href="#i-minus"/></svg></button>' +
            '<output class="qty__val" id="qvQty" aria-live="polite">' + qvQty + '</output>' +
            '<button type="button" data-qv-inc aria-label="' + esc(t('qv.inc')) + '"><svg class="icon" aria-hidden="true"><use href="#i-plus"/></svg></button>' +
          '</div>' +
          '<button class="btn btn--primary qv__add" type="button" data-qv-add' + (soldOut ? ' disabled' : '') + '>' +
            '<svg class="icon" aria-hidden="true"><use href="#i-cart"/></svg><span class="btn-add__label">' + esc(soldOut ? t('card.soldOut') : t('card.add')) + '</span></button>' +
        '</div>' +
        stockHTML(p) +
        '<ul class="qv__perks">' +
          '<li><svg class="icon" aria-hidden="true"><use href="#i-shield"/></svg>' + esc(t('qv.perk1')) + '</li>' +
          '<li><svg class="icon" aria-hidden="true"><use href="#i-test"/></svg>' + esc(t('qv.perk2')) + '</li>' +
          '<li><svg class="icon" aria-hidden="true"><use href="#i-truck"/></svg>' + esc(t('qv.perk3')) + '</li>' +
        '</ul>' +
        '<h3 class="qv__specs-title">' + esc(t('qv.specs')) + '</h3>' +
        '<table class="specs-table"><tbody>' + rows + '</tbody></table>' +
      '</div>';
    updateQvQty();
  }

  function updateQvQty() {
    const p = byId.get(qvId);
    if (!p) return;
    const out = $('#qvQty', el.qvContent);
    const dec = $('[data-qv-dec]', el.qvContent);
    const inc = $('[data-qv-inc]', el.qvContent);
    const max = Math.max(1, maxQty(p));
    if (out) out.textContent = String(qvQty);
    if (dec) dec.disabled = qvQty <= 1;
    if (inc) inc.disabled = qvQty >= max || p.stock <= 0;
  }

  /* ======================================================================
     11. Cart
     ====================================================================== */
  const cartCount = () => state.cart.reduce((s, l) => s + l.qty, 0);

  function cartTotals() {
    const subtotal = state.cart.reduce((s, l) => s + byId.get(l.id).price * l.qty, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIP ? 0 : SHIP_FEE;
    const vat = (subtotal + shipping) * VAT_RATE;
    return { subtotal: subtotal, shipping: shipping, vat: vat, total: subtotal + shipping + vat };
  }

  function saveCart() { storage.setJSON('volt.cart', state.cart); }

  function lineHTML(line) {
    const p = byId.get(line.id);
    const name = pModelText(p); // plain text (isolated) for aria-labels
    const max = maxQty(p);
    return '<li class="cline" data-id="' + p.id + '">' +
      '<div class="cline__img"><svg class="media-fallback" aria-hidden="true"><use href="#i-cat-' + p.category + '"/></svg>' +
        '<img src="' + p.image + '" width="800" height="600" loading="lazy" decoding="async" alt=""></div>' +
      '<div class="cline__info">' +
        '<p class="cline__name">' + pModelHTML(p) + '</p>' +
        '<p class="cline__type">' + esc(pType(p)) + '</p>' +
        '<p class="cline__unit">' + esc(t('cart.each', { x: money(p.price, { plain: true }) })) + '</p>' +
        '<div class="qty qty--sm" role="group" aria-label="' + esc(t('qv.qty') + ': ' + name) + '">' +
          '<button type="button" data-cart-dec="' + p.id + '" aria-label="' + esc(t('cart.dec', { name: name })) + '"><svg class="icon" aria-hidden="true"><use href="#' + (line.qty <= 1 ? 'i-trash' : 'i-minus') + '"/></svg></button>' +
          '<span class="qty__val" aria-label="' + esc(t('cart.qty', { n: line.qty })) + '">' + line.qty + '</span>' +
          '<button type="button" data-cart-inc="' + p.id + '" aria-label="' + esc(t('cart.inc', { name: name })) + '"' + (line.qty >= max ? ' disabled' : '') + '><svg class="icon" aria-hidden="true"><use href="#i-plus"/></svg></button>' +
        '</div>' +
      '</div>' +
      '<div class="cline__end">' +
        '<p class="cline__total">' + money(p.price * line.qty) + '</p>' +
        '<button type="button" class="cline__remove" data-cart-remove="' + p.id + '" aria-label="' + esc(t('cart.remove', { name: name })) + '"><svg class="icon" aria-hidden="true"><use href="#i-trash"/></svg></button>' +
      '</div>' +
    '</li>';
  }

  function renderCart() {
    const count = cartCount();
    const totals = cartTotals();
    const empty = count === 0;

    el.cartBadge.textContent = count > 99 ? '99+' : String(count);
    el.cartBadge.dataset.count = String(count);
    el.cartOpen.setAttribute('aria-label', t('header.cart', { x: tp('unit.item', count) }));
    el.cartCount.textContent = String(count);

    el.cartLines.innerHTML = state.cart.map(lineHTML).join('');
    el.cartLines.hidden = empty;
    el.cartEmpty.hidden = !empty;
    el.cartSummary.hidden = empty;
    el.freeShip.hidden = empty;

    el.sumSubtotal.innerHTML = money(totals.subtotal, { decimals: true });
    el.sumShipping.innerHTML = totals.shipping === 0 ? '<span class="is-free">' + esc(t('cart.free')) + '</span>' : money(totals.shipping, { decimals: true });
    el.sumVat.innerHTML = money(totals.vat, { decimals: true });
    el.sumTotal.innerHTML = money(totals.total, { decimals: true });

    const done = totals.subtotal >= FREE_SHIP;
    el.freeShip.classList.toggle('is-done', done);
    el.freeShipText.textContent = done ? t('cart.freeDone') : t('cart.freeLeft', { x: money(FREE_SHIP - totals.subtotal, { plain: true }) });
    el.freeShipMeter.style.width = clamp(totals.subtotal / FREE_SHIP * 100, 0, 100) + '%';
  }

  function bumpBadge() {
    el.cartBadge.classList.remove('is-bump');
    void el.cartBadge.offsetWidth; // restart animation
    el.cartBadge.classList.add('is-bump');
  }

  function addToCart(id, qty, sourceEl) {
    const p = byId.get(id);
    if (!p || p.stock <= 0) return false;
    const line = state.cart.find((l) => l.id === id);
    const current = line ? line.qty : 0;
    const max = maxQty(p);
    if (current >= max) {
      announce(t('cart.max', { name: pModelText(p) }));
      shake(sourceEl);
      return false;
    }
    const next = Math.min(max, current + (qty || 1));
    if (line) line.qty = next; else state.cart.push({ id: id, qty: next });
    saveCart();
    renderCart();
    announce(t('cart.added', { name: pModelText(p), x: tp('unit.item', cartCount()) }));
    buttonFeedback(sourceEl);
    flyToCart(sourceEl);
    showToast(p);
    return true;
  }

  function changeQty(id, delta) {
    const line = state.cart.find((l) => l.id === id);
    if (!line) return;
    const p = byId.get(id);
    const next = line.qty + delta;
    if (next <= 0) { removeLine(id); return; }
    if (next > maxQty(p)) { announce(t('cart.max', { name: pModelText(p) })); return; }
    line.qty = next;
    saveCart();
    renderCart();
    bumpBadge();
    announce(t('cart.updated', { name: pModelText(p), n: next }));
    // Keep keyboard focus on the same control after re-render.
    const same = $('[data-cart-' + (delta > 0 ? 'inc' : 'dec') + '="' + id + '"]', el.cartLines);
    const fallback = $('[data-cart-dec="' + id + '"]', el.cartLines);
    const target = same && !same.disabled ? same : fallback;
    if (target) target.focus();
  }

  function removeLine(id) {
    const idx = state.cart.findIndex((l) => l.id === id);
    if (idx === -1) return;
    const p = byId.get(id);
    state.cart.splice(idx, 1);
    saveCart();
    renderCart();
    bumpBadge();
    announce(t('cart.removed', { name: pModelText(p) }));
    const lines = $$('.cline', el.cartLines);
    const nextLine = lines[Math.min(idx, lines.length - 1)];
    const target = nextLine ? $('.cline__remove', nextLine) : $('.btn', el.cartEmpty);
    if (target) target.focus();
  }

  /** "Added" state on the clicked button. */
  function buttonFeedback(btn) {
    if (!btn || !btn.classList) return;
    const label = $('.btn-add__label', btn);
    btn.classList.remove('is-added');
    void btn.offsetWidth;
    btn.classList.add('is-added');
    if (label) label.textContent = t('card.added');
    window.clearTimeout(btn._voltTimer);
    btn._voltTimer = window.setTimeout(() => {
      btn.classList.remove('is-added');
      if (label && doc.contains(label)) label.textContent = t('card.add');
    }, 1500);
  }

  function shake(btn) {
    if (!btn || !btn.classList || reduceMotion.matches) return;
    btn.classList.remove('is-shake');
    void btn.offsetWidth;
    btn.classList.add('is-shake');
  }

  /** Glowing bolt that arcs from the button to the cart icon. */
  function flyToCart(sourceEl) {
    if (reduceMotion.matches || !sourceEl || !sourceEl.getBoundingClientRect || typeof doc.body.animate !== 'function') {
      bumpBadge();
      return;
    }
    const from = sourceEl.getBoundingClientRect();
    const to = el.cartOpen.getBoundingClientRect();
    if (!from.width || !to.width) { bumpBadge(); return; }
    const size = 34;
    const sx = from.left + from.width / 2 - size / 2;
    const sy = from.top + from.height / 2 - size / 2;
    const dx = to.left + to.width / 2 - size / 2 - sx;
    const dy = to.top + to.height / 2 - size / 2 - sy;
    const dot = doc.createElement('span');
    dot.className = 'fly-dot';
    dot.setAttribute('aria-hidden', 'true');
    dot.innerHTML = '<svg class="icon"><use href="#i-bolt"/></svg>';
    dot.style.left = sx + 'px';
    dot.style.top = sy + 'px';
    doc.body.appendChild(dot);
    const anim = dot.animate([
      { transform: 'translate(0,0) scale(.4)', opacity: 0 },
      { transform: 'translate(0,-10px) scale(1.15)', opacity: 1, offset: 0.14 },
      { transform: 'translate(' + (dx * 0.5) + 'px,' + (dy * 0.5 - 110) + 'px) scale(1)', opacity: 1, offset: 0.55 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.3)', opacity: 0.4 }
    ], { duration: 820, easing: 'cubic-bezier(.45,.05,.35,1)' });
    anim.onfinish = () => { dot.remove(); bumpBadge(); };
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function showToast(p) {
    el.toastImg.src = p.image;
    el.toastName.innerHTML = pModelHTML(p);
    el.toast.classList.add('is-show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(hideToast, 3800);
  }
  function hideToast() { el.toast.classList.remove('is-show'); }

  function openCart(trigger) {
    renderCart();
    Overlay.open(el.cartDrawer, { trigger: trigger || el.cartOpen });
  }

  /* ---------- Checkout (demo only — nothing is sent anywhere) ---------- */
  function checkout() {
    if (!state.cart.length) return;
    const totals = cartTotals();
    state.lastOrder = {
      id: 'VR-' + String(Math.floor(10000 + Math.random() * 89999)),
      items: cartCount(),
      total: totals.total
    };
    state.cart = [];
    saveCart();
    renderCart();
    renderCheckout();
    Overlay.open(el.checkoutModal, { trigger: el.cartOpen, initialFocus: '.checkout .btn' });
  }

  function renderCheckout() {
    const o = state.lastOrder;
    if (!o) return;
    el.coText.innerHTML = t('co.text'); // trusted dictionary markup (store name in <bdi>)
    el.coOrder.textContent = o.id;
    el.coItems.textContent = tp('unit.item', o.items);
    el.coTotal.innerHTML = money(o.total, { decimals: true });
  }

  /* ======================================================================
     12. Search overlay (live results → quick view, or apply to shop)
     ====================================================================== */
  function openSearch(trigger) {
    Overlay.open(el.searchOverlay, { trigger: trigger, initialFocus: '#searchInput' });
    renderSearch();
  }

  function renderSearch() {
    const raw = el.searchInput.value.trim();
    const q = norm(raw);
    el.searchPopular.hidden = !!q;
    if (!q) {
      el.searchResults.innerHTML = '';
      el.searchAll.hidden = true;
      el.searchStatus.textContent = '';
      return;
    }
    const res = PRODUCTS.filter((p) => matches(p, q)).sort(SORTERS.featured);
    if (!res.length) {
      el.searchResults.innerHTML = '<li class="search-results__none">' + t('search.none', { q: ltrHTML(raw) }) + '</li>';
      el.searchAll.hidden = true;
    } else {
      el.searchResults.innerHTML = res.slice(0, 6).map((p) =>
        '<li><button type="button" class="sresult" data-quick="' + p.id + '">' +
          '<span class="sresult__img"><svg class="media-fallback" aria-hidden="true"><use href="#i-cat-' + p.category + '"/></svg>' +
          '<img src="' + p.image + '" width="800" height="600" loading="lazy" decoding="async" alt=""></span>' +
          '<span class="sresult__text"><span class="sresult__name">' + pModelHTML(p) + '</span>' +
          '<span class="sresult__meta">' + esc(pType(p)) + ' · ' + bdi(p.brand) + '</span></span>' +
          '<span class="sresult__price">' + money(p.price) + '</span>' +
        '</button></li>'
      ).join('');
      el.searchAll.hidden = false;
    }
    el.searchStatus.textContent = t('search.status', { x: tp('unit.product', res.length) });
  }

  function applySearchToShop() {
    const raw = el.searchInput.value.trim();
    Overlay.close({ restoreFocus: false });
    state.f = freshFilters();
    state.f.q = raw;
    syncFilterControls();
    resetAndRender();
    scrollToShop();
  }

  /* ======================================================================
     13. Deal of the week + countdown
     ====================================================================== */
  const dealEnd = (function () {
    const d = new Date();
    d.setDate(d.getDate() + ((DEAL && DEAL.daysAhead) || 5));
    d.setHours(0, 0, 0, 0); // midnight, ~5 days after page load
    return d.getTime();
  })();
  let cdTimer = null;

  function renderDeal() {
    const p = DEAL && byId.get(DEAL.productId);
    if (!p) return;
    const pct = salePct(p);
    el.dealName.innerHTML = pModelHTML(p) + '<span class="deal__type">' + esc(pType(p)) + '</span>';
    el.dealDesc.textContent = pDesc(p);
    el.dealImg.alt = pLabel(p);
    el.dealTag.textContent = pct ? '-' + pct + '%' : '';
    el.dealTag.hidden = !pct;
    el.dealPrice.innerHTML =
      '<span class="deal__now">' + money(p.price) + '</span>' +
      (p.oldPrice ? '<s class="deal__old">' + money(p.oldPrice) + '</s>' +
        '<span class="save-pill">' + esc(t('deal.save', { x: money(p.oldPrice - p.price, { plain: true }) })) + '</span>' : '');
    const claimed = clamp(Math.round((1 - p.stock / (DEAL.stockTotal || p.stock || 1)) * 100), 0, 100);
    el.dealMeter.style.width = claimed + '%';
    el.dealStockText.textContent = t('deal.claimed', { p: claimed, x: tp('unit.item', p.stock) });
  }

  function setDigit(node, v) {
    const str = String(v).padStart(2, '0');
    if (node.textContent === str) return;
    node.textContent = str;
    node.classList.remove('is-tick');
    void node.offsetWidth;
    node.classList.add('is-tick');
  }

  function tick() {
    const diff = dealEnd - Date.now();
    if (diff <= 0) {
      el.countdown.hidden = true;
      el.dealEnded.hidden = false;
      window.clearInterval(cdTimer);
      return;
    }
    const s = Math.floor(diff / 1000);
    setDigit(el.cdDays, Math.floor(s / 86400));
    setDigit(el.cdHours, Math.floor((s % 86400) / 3600));
    setDigit(el.cdMins, Math.floor((s % 3600) / 60));
    setDigit(el.cdSecs, s % 60);
  }

  function initCountdown() {
    tick();
    cdTimer = window.setInterval(tick, 1000);
  }

  /* ======================================================================
     14. Reviews carousel (direction-aware, autoplay pauses on hover/focus)
     ====================================================================== */
  function initCarousel() {
    const wrap = $('#reviewCarousel');
    const track = $('#reviewTrack');
    if (!wrap || !track) return null;
    const viewport = $('.carousel__viewport', wrap);
    const slides = $$('.review', track);
    const dots = $('#revDots');
    const prev = $('#revPrev');
    const next = $('#revNext');
    const pauseBtn = $('#revPause');

    let index = 0;
    let perView = 1;
    let timer = null;
    let hoverPause = false;
    let userPaused = reduceMotion.matches; // no auto-advance for reduced motion
    let startX = null;

    const perViewFor = () => (window.innerWidth >= 1100 ? 3 : window.innerWidth >= 720 ? 2 : 1);
    const maxIndex = () => Math.max(0, slides.length - perView);

    function buildDots() {
      let html = '';
      for (let i = 0; i <= maxIndex(); i++) {
        html += '<button type="button" class="dot" data-dot="' + i + '" aria-label="' + esc(t('rev.goTo', { n: i + 1 })) + '"></button>';
      }
      dots.innerHTML = html;
    }

    function update() {
      const sign = root.dir === 'rtl' ? 1 : -1;
      track.style.transform = 'translate3d(' + (sign * index * (100 / perView)) + '%,0,0)';
      slides.forEach((s, i) => {
        const visible = i >= index && i < index + perView;
        s.setAttribute('aria-label', t('rev.slide', { n: i + 1, total: slides.length }));
        if (visible) { s.removeAttribute('inert'); s.removeAttribute('aria-hidden'); }
        else { s.setAttribute('inert', ''); s.setAttribute('aria-hidden', 'true'); }
      });
      $$('.dot', dots).forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
    }

    function go(i) {
      const m = maxIndex();
      index = i > m ? 0 : i < 0 ? m : i;
      update();
    }

    function stop() { window.clearInterval(timer); timer = null; }
    function start() {
      stop();
      if (userPaused) return;
      timer = window.setInterval(() => {
        if (!hoverPause && !doc.hidden) go(index + 1);
      }, 6000);
    }

    function syncPauseBtn() {
      pauseBtn.setAttribute('aria-pressed', userPaused ? 'true' : 'false');
      pauseBtn.setAttribute('aria-label', t(userPaused ? 'rev.play' : 'rev.pause'));
      pauseBtn.classList.toggle('is-paused', userPaused);
    }

    function layout() {
      const pv = perViewFor();
      if (pv !== perView) {
        perView = pv;
        wrap.style.setProperty('--per-view', String(perView));
        buildDots();
        index = Math.min(index, maxIndex());
      }
      update();
    }

    prev.addEventListener('click', () => { go(index - 1); start(); });
    next.addEventListener('click', () => { go(index + 1); start(); });
    dots.addEventListener('click', (e) => {
      const d = e.target.closest('[data-dot]');
      if (!d) return;
      go(Number(d.dataset.dot));
      start();
    });
    pauseBtn.addEventListener('click', () => {
      userPaused = !userPaused;
      syncPauseBtn();
      start();
    });

    wrap.addEventListener('mouseenter', () => { hoverPause = true; });
    wrap.addEventListener('mouseleave', () => { hoverPause = false; });
    wrap.addEventListener('focusin', () => { hoverPause = true; });
    wrap.addEventListener('focusout', (e) => { if (!wrap.contains(e.relatedTarget)) hoverPause = false; });

    // Touch swipe (direction-aware)
    viewport.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') startX = e.clientX; });
    viewport.addEventListener('pointerup', (e) => {
      if (startX == null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) < 45) return;
      const forward = root.dir === 'rtl' ? dx > 0 : dx < 0;
      go(index + (forward ? 1 : -1));
      start();
    });
    viewport.addEventListener('pointercancel', () => { startX = null; });

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(layout, 120);
    });

    perView = 0; // force first layout
    layout();
    syncPauseBtn();
    start();

    return {
      refresh() { buildDots(); update(); syncPauseBtn(); }
    };
  }

  /* ======================================================================
     15. Forms — client-side validation, inline errors, success states.
         Nothing is ever sent anywhere.
     ====================================================================== */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const toLatinDigits = (s) => String(s)
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776));

  function setFieldError(field, key) {
    const err = doc.getElementById(field.getAttribute('aria-describedby'));
    if (key) {
      field.setAttribute('aria-invalid', 'true');
      if (err) { err.dataset.errKey = key; err.textContent = t(key); err.hidden = false; }
    } else {
      field.removeAttribute('aria-invalid');
      if (err) { err.dataset.errKey = ''; err.textContent = ''; err.hidden = true; }
    }
  }

  function validateField(field) {
    const v = field.value.trim();
    let key = '';
    if (field.required && !v) key = 'form.errRequired';
    else if (v && field.type === 'email' && !EMAIL_RE.test(v)) key = 'form.errEmail';
    else if (v && field.name === 'phone') {
      const digits = toLatinDigits(v).replace(/[\s\-()]/g, '');
      if (!/^(05\d{8}|(\+|00)?9665\d{8})$/.test(digits)) key = 'form.errPhone';
    } else if (v && field.minLength > 0 && v.length < field.minLength) {
      key = field.name === 'message' ? 'form.errMsg' : 'form.errName';
    }
    setFieldError(field, key);
    return !key;
  }

  function wireLiveValidation(form) {
    form.addEventListener('focusout', (e) => {
      const f = e.target;
      if (!f.name || !('value' in f) || f.tagName === 'SELECT') return;
      if (f.value.trim() || f.dataset.touched) { f.dataset.touched = '1'; validateField(f); }
    });
    form.addEventListener('input', (e) => {
      const f = e.target;
      if (f.getAttribute('aria-invalid') === 'true') validateField(f);
    });
  }

  function initForms() {
    // Newsletter
    wireLiveValidation(el.nlForm);
    el.nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      el.nlEmail.dataset.touched = '1';
      if (!validateField(el.nlEmail)) { el.nlEmail.focus(); return; }
      el.nlSuccess.dataset.key = 'nl.success';
      el.nlSuccess.textContent = t('nl.success');
      el.nlForm.classList.add('is-done');
      el.nlForm.reset();
      delete el.nlEmail.dataset.touched;
    });

    // Contact
    wireLiveValidation(el.contactForm);
    el.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = $$('input, textarea', el.contactForm).filter((f) => f.name);
      let firstBad = null;
      fields.forEach((f) => {
        f.dataset.touched = '1';
        if (!validateField(f) && !firstBad) firstBad = f;
      });
      if (firstBad) { firstBad.focus(); return; }
      state.contactName = $('#cName').value.trim();
      el.contactSuccessText.innerHTML = t('form.successText', { name: ltrHTML(state.contactName) }); // user text escaped + isolated
      el.contactForm.hidden = true;
      el.contactSuccess.hidden = false;
      el.contactSuccess.focus();
      el.contactForm.reset();
      fields.forEach((f) => { delete f.dataset.touched; });
    });
    el.contactAgain.addEventListener('click', () => {
      el.contactSuccess.hidden = true;
      el.contactForm.hidden = false;
      state.contactName = '';
      $('#cName').focus();
    });
  }

  function refreshFormText() {
    $$('.field__error').forEach((err) => { if (err.dataset.errKey) err.textContent = t(err.dataset.errKey); });
    if (el.nlSuccess.dataset.key) el.nlSuccess.textContent = t(el.nlSuccess.dataset.key);
    if (!el.contactSuccess.hidden) el.contactSuccessText.innerHTML = t('form.successText', { name: ltrHTML(state.contactName) });
  }

  /* ======================================================================
     16. Scroll reveal + hero count-up
     ====================================================================== */
  function initReveal() {
    const items = $$('[data-reveal]');
    if (!('IntersectionObserver' in window) || reduceMotion.matches) {
      items.forEach((n) => n.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach((n) => io.observe(n));
  }

  function initCountUp() {
    if (reduceMotion.matches || !window.requestAnimationFrame) return;
    $$('[data-count]').forEach((node) => {
      const target = Number(node.dataset.count) || 0;
      const duration = 1500;
      let t0 = null;
      node.textContent = '0';
      const step = (now) => {
        if (t0 === null) t0 = now;
        const k = Math.min(1, (now - t0) / duration);
        node.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 3))));
        if (k < 1) window.requestAnimationFrame(step);
      };
      window.setTimeout(() => window.requestAnimationFrame(step), 350);
    });
  }

  /* ======================================================================
     17. Language switching (instant, no reload, remembered)
     ====================================================================== */
  let carousel = null;

  function setLang(lang, opts) {
    const o = opts || {};
    state.lang = lang === 'en' ? 'en' : 'ar';
    root.lang = state.lang;
    root.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    doc.title = tt('meta.title');

    applyI18n();
    el.menuToggle.setAttribute('aria-label', t(el.menuToggle.getAttribute('aria-expanded') === 'true' ? 'a11y.menuClose' : 'a11y.menuOpen'));

    // Re-render everything dynamic
    renderCounts();
    renderFilterOptions();
    updateRangeUI();
    renderProducts();
    renderCart();
    renderDeal();
    renderCheckout();
    refreshFormText();
    if (carousel) carousel.refresh();
    if (Overlay.current === el.quickView && qvId) renderQuickView();
    if (Overlay.current === el.searchOverlay) renderSearch();
    if (el.toast.classList.contains('is-show')) hideToast();

    if (o.save !== false) storage.set('volt.lang', state.lang);
    if (o.announce) announce(t('lang.switched'));
  }

  /* ---------- Screen-reader announcements ---------- */
  let announceTimer = null;
  function announce(msg) {
    el.liveRegion.textContent = '';
    window.clearTimeout(announceTimer);
    announceTimer = window.setTimeout(() => { el.liveRegion.textContent = msg; }, 80);
  }

  /* ======================================================================
     18. Event wiring & init
     ====================================================================== */
  function wireEvents() {
    // Global click delegation
    doc.addEventListener('click', (e) => {
      const tgt = e.target;
      if (!(tgt instanceof Element)) return;

      // Close buttons / backdrops of the current overlay
      const closer = tgt.closest('[data-close]');
      if (closer && Overlay.current && Overlay.current.contains(closer)) {
        const navigating = closer.hasAttribute('data-scroll-shop');
        Overlay.close({ restoreFocus: !navigating });
        if (!navigating) return;
      }

      // Mobile nav links: close the drawer, let the anchor jump happen
      const mlink = tgt.closest('#mobileNav a[href^="#"]');
      if (mlink) { Overlay.close({ restoreFocus: false }); return; }

      const add = tgt.closest('[data-add]');
      if (add) { addToCart(add.dataset.add, 1, add); return; }

      const quick = tgt.closest('[data-quick]');
      if (quick) { openQuickView(quick.dataset.quick, quick); return; }

      const cat = tgt.closest('[data-set-category]');
      if (cat) { e.preventDefault(); applyShortcut({ cat: cat.dataset.setCategory }); return; }

      const lvl = tgt.closest('[data-set-level]');
      if (lvl) { e.preventDefault(); applyShortcut({ level: lvl.dataset.setLevel }); return; }

      const shop = tgt.closest('[data-scroll-shop]');
      if (shop) { e.preventDefault(); scrollToShop(); return; }

      const clear = tgt.closest('[data-clear-filters]');
      if (clear) { clearFilters(); if (el.shopSearch) el.shopSearch.focus({ preventScroll: true }); return; }

      const chip = tgt.closest('[data-chip-type]');
      if (chip) { removeChip(chip.dataset.chipType, chip.dataset.chipValue); el.shopSearch.focus({ preventScroll: true }); return; }

      const langBtn = tgt.closest('[data-lang-toggle]');
      if (langBtn) { setLang(state.lang === 'ar' ? 'en' : 'ar', { announce: true }); }
    });

    // Header
    el.menuToggle.addEventListener('click', () => {
      Overlay.open(el.mobileNav, {
        trigger: el.menuToggle,
        onOpen() { el.menuToggle.setAttribute('aria-expanded', 'true'); el.menuToggle.setAttribute('aria-label', t('a11y.menuClose')); },
        onClose() { el.menuToggle.setAttribute('aria-expanded', 'false'); el.menuToggle.setAttribute('aria-label', t('a11y.menuOpen')); }
      });
    });
    el.searchOpen.addEventListener('click', () => openSearch(el.searchOpen));
    el.cartOpen.addEventListener('click', () => openCart(el.cartOpen));
    el.toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      const skip = $('.logo');
      if (skip) skip.focus({ preventScroll: true });
    });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Shop controls
    let searchTimer = null;
    el.shopSearch.addEventListener('input', () => {
      window.clearTimeout(searchTimer);
      searchTimer = window.setTimeout(() => { state.f.q = el.shopSearch.value; resetAndRender(); }, 160);
    });
    el.sortSelect.addEventListener('change', () => { state.sort = el.sortSelect.value; resetAndRender(); });
    el.filters.addEventListener('change', (e) => {
      const f = e.target;
      if (f.name === 'cat') toggleSet(state.f.cats, f.value, f.checked);
      else if (f.name === 'brand') toggleSet(state.f.brands, f.value, f.checked);
      else if (f.name === 'level') toggleSet(state.f.levels, f.value, f.checked);
      else if (f.id === 'inStockOnly') state.f.inStock = f.checked;
      else return;
      resetAndRender();
    });
    el.loadMore.addEventListener('click', loadMore);

    // Mobile filter drawer
    el.filtersOpen.addEventListener('click', () => {
      Overlay.open(el.filters, {
        trigger: el.filtersOpen,
        onOpen() {
          el.filtersBackdrop.classList.add('is-open');
          el.filtersOpen.setAttribute('aria-expanded', 'true');
          el.filters.setAttribute('role', 'dialog');
          el.filters.setAttribute('aria-modal', 'true');
        },
        onClose() {
          el.filtersBackdrop.classList.remove('is-open');
          el.filtersOpen.setAttribute('aria-expanded', 'false');
          el.filters.removeAttribute('role');
          el.filters.removeAttribute('aria-modal');
        }
      });
    });
    $$('[data-close-filters]').forEach((b) => b.addEventListener('click', () => {
      if (Overlay.current === el.filters) Overlay.close();
    }));
    const onFilterMQ = () => { if (desktopFilters.matches && Overlay.current === el.filters) Overlay.close({ restoreFocus: false }); };
    if (desktopFilters.addEventListener) desktopFilters.addEventListener('change', onFilterMQ);
    else if (desktopFilters.addListener) desktopFilters.addListener(onFilterMQ);

    // Quick view controls
    el.qvContent.addEventListener('click', (e) => {
      const p = byId.get(qvId);
      if (!p) return;
      if (e.target.closest('[data-qv-dec]')) { qvQty = Math.max(1, qvQty - 1); updateQvQty(); }
      else if (e.target.closest('[data-qv-inc]')) { qvQty = Math.min(Math.max(1, maxQty(p)), qvQty + 1); updateQvQty(); }
      else {
        const addBtn = e.target.closest('[data-qv-add]');
        if (addBtn) addToCart(qvId, qvQty, addBtn);
      }
    });

    // Cart controls
    el.cartLines.addEventListener('click', (e) => {
      const inc = e.target.closest('[data-cart-inc]');
      const dec = e.target.closest('[data-cart-dec]');
      const rm = e.target.closest('[data-cart-remove]');
      if (inc) changeQty(inc.dataset.cartInc, 1);
      else if (dec) changeQty(dec.dataset.cartDec, -1);
      else if (rm) removeLine(rm.dataset.cartRemove);
    });
    el.checkoutBtn.addEventListener('click', checkout);

    // Toast
    el.toastView.addEventListener('click', () => { hideToast(); openCart(el.cartOpen); });
    el.toast.addEventListener('mouseenter', () => window.clearTimeout(toastTimer));
    el.toast.addEventListener('mouseleave', () => { toastTimer = window.setTimeout(hideToast, 1800); });
    el.toast.addEventListener('focusin', () => window.clearTimeout(toastTimer));
    el.toast.addEventListener('focusout', () => { toastTimer = window.setTimeout(hideToast, 1800); });

    // Search overlay
    let sTimer = null;
    el.searchInput.addEventListener('input', () => {
      window.clearTimeout(sTimer);
      sTimer = window.setTimeout(renderSearch, 110);
    });
    el.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && el.searchInput.value.trim()) { e.preventDefault(); applySearchToShop(); }
    });
    el.searchAll.addEventListener('click', applySearchToShop);
    el.searchPopular.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-query-key]');
      if (!chip) return;
      el.searchInput.value = t(chip.dataset.queryKey);
      renderSearch();
      el.searchInput.focus();
    });

    // Deal
    el.dealAdd.addEventListener('click', () => addToCart(DEAL.productId, 1, el.dealAdd));
    el.dealDetails.addEventListener('click', () => openQuickView(DEAL.productId, el.dealDetails));

    // Broken images → hide <img>, reveal the styled fallback behind it
    doc.addEventListener('error', (e) => {
      const img = e.target;
      if (img && img.tagName === 'IMG') img.classList.add('is-broken');
    }, true);

    // Keep the cart in sync across tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'volt.cart') { state.cart = loadCart(); renderCart(); }
    });
  }

  function init() {
    initTicker();
    initPriceRange();
    wireEvents();
    initForms();
    carousel = initCarousel();
    setLang(state.lang, { save: false });
    initScrollSpy();
    initTilt();
    initCountdown();
    initReveal();
    initCountUp();
    onScroll();
    root.classList.add('is-ready');
  }

  init();
})();
