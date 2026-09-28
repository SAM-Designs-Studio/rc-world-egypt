/* ==========================================================================
   RC World Egypt — main.js
   --------------------------------------------------------------------------
   Vanilla JS, no modules / no build step (works from file://).
   Depends on (loaded before this file, all with <script defer>):
     i18n.js         → window.VOLT_I18N
     photos.js       → window.SHOP_PHOTOS  (the shop's photo library)
     photo-sizes.js  → window.SHOP_PHOTO_SIZES
     products.js     → window.VOLT_PRODUCTS / VOLT_CATEGORIES / VOLT_BRANDS / VOLT_FEATURED
   (The VOLT_* / volt.* names are internal identifiers only — never shown to visitors.)

   The shop takes no online payment: there are no prices on the
   site. Visitors build an inquiry list, then contact Hamdy by phone or
   WhatsApp, who confirms price, availability and shipping.
   ========================================================================== */

/* ==========================================================================
   BANK TRANSFER DETAILS — fill in when the shop sends them
   --------------------------------------------------------------------------
   While every field is '' the contact section only says that bank transfer
   is available and that the account details are sent when the order is
   confirmed. Filled fields appear in a card, each with a copy button
   (numbers / IBAN are shown left-to-right, also in Arabic).
     bankName      'CIB' shows the full bank name + the CIB logo (on a white plate)
     accountName   the account holder's name exactly as the bank spells it
     accountNumber the account number
     iban          e.g. 'EG38 0019 …'
     instapay      InstaPay address or phone, e.g. 'name@instapay'
   Never put sample / placeholder numbers here.
   ========================================================================== */
const BANK_DETAILS = { bankName: 'CIB', accountName: 'Hamdy Shawky Alfahim', accountNumber: '100031395447', iban: '', instapay: '' };

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
  const FEATURED = window.VOLT_FEATURED || null;
  const LEVEL_ORDER = window.VOLT_LEVEL_ORDER || {};
  const CREDITS = window.VOLT_PHOTO_CREDITS || {};
  const VIDEOS = window.VOLT_VIDEOS || [];
  const BRANDS = (window.VOLT_BRANDS || []).slice();
  const SIZES = window.SHOP_PHOTO_SIZES || {};
  const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
  const LEVELS = ['beginner', 'intermediate', 'pro'];

  // Two numbers: WhatsApp Business "rc world Egypt" (orders, inquiry list, contact form, price questions,
  // bank receipts — every wa.me link) and a separate number for calls (tel:+201003130449 in index.html).
  const WA_NUMBER = '201009000193';   // WhatsApp (wa.me format)
  const PAGE_SIZE = 12;                // products per "page" in the grid
  const GALLERY_PAGE = 24;             // gallery thumbnails per "page"
  const MAX_QTY = 10;                  // max units per inquiry line
  const RLM = '‏';                // keeps Arabic WhatsApp lines right-to-left

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const desktopFilters = window.matchMedia('(min-width: 1024px)');
  const YEAR = new Date().getFullYear();

  /* ---------- Shop photo library ---------- */
  const PHOTOS = (window.SHOP_PHOTOS || []).map((p) => {
    const key = p.cat + '-' + p.id;
    const d = SIZES[key] || [600, 450, 1280, 960];
    return { key: key, cat: p.cat, title: String(p.post || '').trim(), full: p.full, thumb: p.thumb, tw: d[0], th: d[1], fw: d[2], fh: d[3] };
  });
  const photoByKey = new Map(PHOTOS.map((p) => [p.key, p]));

  /** Product images: shop photos (by key) or stock photos of the item type (no photo → category icon). */
  PRODUCTS.forEach((p) => {
    if (p.photos && p.photos.length) {
      p._imgs = p.photos.map((k) => photoByKey.get(k)).filter(Boolean).map((ph) => ({
        src: ph.full, thumb: ph.thumb, tw: ph.tw, th: ph.th, fw: ph.fw, fh: ph.fh
      }));
    } else {
      p._imgs = (p.images || []).map((im) => {
        const d = im.size || [600, 400, 1200, 800];
        return { src: im.src, thumb: im.thumb, tw: d[0], th: d[1], fw: d[2], fh: d[3], credit: im.credit || '', art: p.art || '' };
      });
    }
  });

  const denom = (s) => parseInt(String(s).split('/')[1], 10) || 0;
  /** Scale filter options come from the catalogue itself (largest scale first). */
  const SCALES = Array.from(new Set([].concat.apply([], PRODUCTS.map((p) => p.scales || []))))
    .sort((a, b) => denom(a) - denom(b));

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
    heroCount: $('#heroCount'),
    heroScales: $('#heroScales'),
    heroScalesLabel: $('#heroScalesLabel'),
    // shop
    grid: $('#productGrid'),
    emptyState: $('#emptyState'),
    resultCount: $('#resultCount'),
    resultsHead: $('#resultsHead'),
    resultsTitle: $('#resultsTitle'),
    resultsHint: $('#resultsHint'),
    resultsAll: $('#resultsAll'),
    miniToast: $('#miniToast'),
    creditsModal: $('#creditsModal'),
    videoGrid: $('#videoGrid'),
    videoModal: $('#videoModal'),
    vpVideo: $('#vpVideo'),
    vpTitle: $('#vpTitle'),
    vpDesc: $('#vpDesc'),
    vpProduct: $('#vpProduct'),
    creditsList: $('#creditsList'),
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
    fScale: $('#fScale'),
    fBrand: $('#fBrand'),
    fLevel: $('#fLevel'),
    // quick view
    quickView: $('#quickView'),
    qvContent: $('#qvContent'),
    // inquiry list
    cartDrawer: $('#cartDrawer'),
    cartLines: $('#cartLines'),
    cartEmpty: $('#cartEmpty'),
    cartSummary: $('#cartSummary'),
    cartCount: $('#cartCount'),
    checkoutBtn: $('#checkoutBtn'),
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
    // featured
    dealImg: $('#dealImg'),
    dealName: $('#dealName'),
    dealDesc: $('#dealDesc'),
    dealSpecs: $('#dealSpecs'),
    dealPrice: $('#dealPrice'),
    dealAdd: $('#dealAdd'),
    dealDetails: $('#dealDetails'),
    // gallery
    galleryGrid: $('#galleryGrid'),
    galleryMore: $('#galleryMore'),
    galleryMoreLabel: $('#galleryMoreLabel'),
    lightbox: $('#lightbox'),
    lbStage: $('#lbStage'),
    lbImg: $('#lbImg'),
    lbCaption: $('#lbCaption'),
    lbCount: $('#lbCount'),
    lbPrev: $('#lbPrev'),
    lbNext: $('#lbNext'),
    // contact form
    bankBody: $('#bankBody'),
    contactForm: $('#contactForm'),
    formStatus: $('#formStatus'),
    cName: $('#cName'),
    cPhone: $('#cPhone'),
    cTopic: $('#cTopic'),
    cMsg: $('#cMsg')
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
     2. i18n + bidi helpers
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

  /** Translate a key (dictionary markup such as <bdi> is kept), filling {placeholders}. */
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

  /* ---------- Bidi ----------
     English names inside Arabic text are isolated so they never flip the
     line or drag punctuation around:
       • HTML contexts  → <bdi dir="ltr">Name</bdi>
       • Plain text     → U+2068 FSI … U+2069 PDI (aria-label, alt, title,
                          meta, WhatsApp messages)                        */
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
  /** Plain-text template filled with raw (user) values — user text is never tag-stripped. */
  function tpl(key, vars) {
    let s = lookup(key);
    if (s == null) return key;
    if (typeof s === 'object') s = s.other;
    return fill(plain(s), vars);
  }

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
    $$('[data-i18n-title]', ctx).forEach((node) => { node.setAttribute('title', tt(node.dataset.i18nTitle)); });
    $$('[data-i18n-content]', ctx).forEach((node) => { node.setAttribute('content', tt(node.dataset.i18nContent)); });
    $$('[data-query-key]', ctx).forEach((node) => { node.textContent = t(node.dataset.queryKey); });
  }

  /* ======================================================================
     3. Formatting, WhatsApp links & search helpers
     ====================================================================== */
  const nf0 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  function fmt(n) { return nf0.format(n); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const maxQty = (p) => (p.inStock === false ? 0 : MAX_QTY);
  /** Largest scale of a product (smallest denominator), or null. */
  const scaleNum = (p) => ((p.scales && p.scales.length) ? Math.min.apply(null, p.scales.map(denom)) : null);
  const pBrands = (p) => p.brands || [];
  const pScales = (p) => p.scales || [];

  /* Product naming: the English model name is shown in both languages; the
     descriptor ("1/5 Petrol 4WD Truck" / "شاحنة 1/5 بمحرك بنزين…") is localised. */
  const pType = (p) => (state.lang === 'en' ? p.name_en : p.name_ar);
  const pDesc = (p) => (state.lang === 'en' ? p.desc_en : p.desc_ar);
  const pModelHTML = (p) => bdi(p.model);
  const pModelText = (p) => iso(p.model);
  /** Full plain-text name for alt text: Arabic descriptor first, so the line stays RTL. */
  const pLabel = (p) => (state.lang === 'en' ? p.model + ' — ' + p.name_en : p.name_ar + ' ' + iso(p.model));
  const pImages = (p) => (p._imgs && p._imgs.length ? p._imgs : [{ src: '', thumb: '', tw: 600, th: 450, fw: 1200, fh: 900, none: true, art: p.art || '' }]);
  /** <img> for a product image; products without a photo get their drawn illustration (#art-…) on a designed card. */
  const imgTag = (im, attrs, large) => {
    if (!im.none) {
      // tools with a line illustration keep it behind the photo, shown only if the photo fails to load
      const behind = im.art ? '<span class="tool-art tool-art--behind" aria-hidden="true"><svg><use href="#art-' + esc(im.art) + '"/></svg></span>' : '';
      return behind + '<img src="' + esc(large ? (im.src || im.thumb) : (im.thumb || im.src)) + '" ' + attrs + '>';
    }
    return im.art ? '<span class="tool-art" aria-hidden="true"><svg><use href="#art-' + esc(im.art) + '"/></svg></span>' : '';
  };

  /** Localise a spec value ({ar, en} objects; strings shown as-is). */
  function specValue(v) {
    if (v && typeof v === 'object') return v[state.lang] || v.en || '';
    return String(v);
  }

  const HIGHLIGHT_KEYS = ['power', 'drive', 'cells', 'hull', 'build', 'channels', 'system', 'plug', 'wing', 'sizes', 'extras', 'compat', 'version', 'radio', 'use'];
  const SPEC_ICON = {
    power: 'i-bolt', drive: 'i-gauge', cells: 'i-cat-parts', version: 'i-wrench', build: 'i-check',
    channels: 'i-cat-planes', wing: 'i-cat-planes', extras: 'i-gauge', compat: 'i-check', use: 'i-pin', scale: 'i-ruler', sizes: 'i-ruler', hull: 'i-cat-boats', radio: 'i-cat-electronics', system: 'i-cat-electronics', plug: 'i-bolt'
  };
  const highlights = (p, n) => HIGHLIGHT_KEYS.filter((k) => p.specs && p.specs[k] != null).slice(0, n || 2);

  function specChipsHTML(p, n) {
    return highlights(p, n).map((k) =>
      '<li><svg class="icon" aria-hidden="true"><use href="#' + SPEC_ICON[k] + '"/></svg><span>' + ltrHTML(specValue(p.specs[k])) + '</span></li>'
    ).join('');
  }

  /** "Category · 1/5" meta line (scales isolated as LTR). */
  function metaHTML(p) {
    const sc = pScales(p);
    return esc(t('cat.' + p.category)) + (sc.length ? '<span aria-hidden="true"> · </span>' + bdi(sc.join(' · ')) : '');
  }

  /** wa.me link with a URL-encoded (UTF-8) prefilled message. */
  const waLink = (text) => 'https://wa.me/' + WA_NUMBER + (text ? '?text=' + encodeURIComponent(text) : '');

  /** Arabic WhatsApp messages: an RLM at the start of every line keeps each line right-to-left. */
  function waText(lines) {
    const all = lines.join('\n').split('\n');
    return (state.lang === 'ar' ? all.map((l) => RLM + l) : all).join('\n');
  }

  function openWhatsApp(text) {
    const url = waLink(text);
    let w = null;
    try { w = window.open(url, '_blank'); } catch (e) { w = null; }
    if (w) { try { w.opener = null; } catch (e) { /* ignore */ } } else { window.location.href = url; }
    return url;
  }

  /** "Ask for price" block: label + small WhatsApp link that prefills "Price for {name}?". */
  function priceAskHTML(p, extraClass) {
    const href = waLink(waText([tpl('wa.price', { name: pModelText(p) })]));
    return '<div class="price-ask ' + (extraClass || '') + '">' +
      '<span class="price-ask__label">' + esc(t('price.ask')) + '</span>' +
      '<a class="price-ask__wa" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' +
        '<svg class="icon" aria-hidden="true"><use href="#i-whatsapp"/></svg>' +
        '<span>' + esc(t('price.wa')) + '</span>' +
        '<span class="sr-only">: ' + pModelHTML(p) + ' ' + esc(t('a11y.newTab')) + '</span>' +
      '</a></div>';
  }


  /** Tiny CIB logo on its white plate (the logo only reads correctly on white). */
  const CIB_XS = '<span class="cib-plate cib-plate--xs"><img src="assets/img/cib-logo.svg" width="35" height="14" alt="CIB"></span>';

  /** Normalise text for forgiving AR/EN search (diacritics, alef forms, digits). */
  function norm(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ًͯ-ٰٟـ]/g, '')
      .replace(/[إأآٱ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
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
      p.model, p.name_ar, p.name_en, p.category, pScales(p).join(' '), pBrands(p).join(' '),
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
    cart: [],                  // inquiry list: [{ id, qty }]
    f: freshFilters(),
    sort: 'featured',
    shown: PAGE_SIZE,
    gFilter: 'all',
    gShown: GALLERY_PAGE,
    lbList: [],
    lbIndex: 0,
    formPrefilled: false
  };

  function freshFilters() {
    return { cats: new Set(), scales: new Set(), brands: new Set(), levels: new Set(), q: '' };
  }

  function loadCart() {
    const raw = storage.getJSON('volt.cart', []);
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((l) => l && byId.has(l.id) && maxQty(byId.get(l.id)) > 0)
      .map((l) => ({ id: l.id, qty: clamp(parseInt(l.qty, 10) || 1, 1, MAX_QTY) }));
  }
  state.cart = loadCart();

  /* ======================================================================
     5. Overlay manager — one overlay at a time; focus trap, Esc, backdrop
     ====================================================================== */
  const Overlay = (function () {
    let current = null; // { node, trigger, onClose }
    const FOCUSABLE = 'a[href], button:not([disabled]), video[controls], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
    const ids = ['home', 'categories', 'shop', 'gallery', 'videos', 'deals', 'levels', 'about', 'contact'];
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
     7. Counts
     ====================================================================== */
  /** Count products per key; fn may return one key or an array of keys. */
  function countBy(fn) {
    return PRODUCTS.reduce((acc, p) => {
      [].concat(fn(p) || []).forEach((k) => { if (k) acc[k] = (acc[k] || 0) + 1; });
      return acc;
    }, {});
  }
  const catCounts = countBy((p) => p.category);
  const levelCounts = countBy((p) => p.level);
  const scaleCounts = countBy((p) => pScales(p));
  const brandCounts = countBy((p) => pBrands(p));

  function setCount(node, value) {
    if (!node) return;
    node.dataset.count = String(value);
    if (!node.dataset.animating) node.textContent = fmt(value);
  }

  function renderCounts() {
    $$('[data-cat-count]').forEach((n) => { n.textContent = tp('unit.product', catCounts[n.dataset.catCount] || 0); });
    $$('[data-level-count]').forEach((n) => { n.textContent = '(' + fmt(levelCounts[n.dataset.levelCount] || 0) + ')'; });
    renderLevelPreviews();
    setCount(el.heroCount, PRODUCTS.length);
    setCount(el.heroScales, SCALES.length);
    if (el.heroScalesLabel && SCALES.length) {
      el.heroScalesLabel.innerHTML = t('hero.stat2', { min: bdi(SCALES[0]), max: bdi(SCALES[SCALES.length - 1]) });
    }
  }

  /** 3–4 round thumbnails of real models at a level (one per category first, then fill). */
  function levelPreview(level) {
    const list = PRODUCTS.filter((p) => p.level === level && !pImages(p)[0].none).sort(levelSorter(level));
    const picked = [];
    const cats = new Set();
    list.forEach((p) => { if (picked.length < 4 && !cats.has(p.category)) { picked.push(p); cats.add(p.category); } });
    list.forEach((p) => { if (picked.length < 4 && picked.indexOf(p) === -1) picked.push(p); });
    return picked;
  }

  function renderLevelPreviews() {
    $$('[data-level-models]').forEach((ul) => {
      ul.innerHTML = levelPreview(ul.dataset.levelModels).map((p) => {
        const im = pImages(p)[0];
        return '<li title="' + esc(p.model) + '"><img src="' + esc(im.thumb || im.src) + '" width="' + im.tw + '" height="' + im.th + '" loading="lazy" decoding="async" alt=""></li>';
      }).join('');
    });
  }

  /* ======================================================================
     8. Filters (category / scale / brand / level)
     ====================================================================== */
  /** labelHTML must already be escaped. */
  function checkHTML(name, value, labelHTML, count, checked) {
    return '<label class="check"><input type="checkbox" name="' + name + '" value="' + esc(value) + '"' + (checked ? ' checked' : '') + '>' +
      '<span class="check__box" aria-hidden="true"><svg class="icon"><use href="#i-check"/></svg></span>' +
      '<span class="check__label">' + labelHTML + '</span>' +
      '<span class="check__count">' + fmt(count) + '</span></label>';
  }

  function pillHTML(name, value, labelHTML, checked, extraClass, count) {
    return '<label class="pill ' + (extraClass || '') + '"><input type="checkbox" name="' + name + '" value="' + esc(value) + '"' + (checked ? ' checked' : '') + '>' +
      '<span>' + labelHTML + (count != null ? ' <small>' + fmt(count) + '</small>' : '') + '</span></label>';
  }

  function renderFilterOptions() {
    const f = state.f;
    el.fCategory.innerHTML = CATEGORIES.map((c) => checkHTML('cat', c, esc(t('cat.' + c)), catCounts[c] || 0, f.cats.has(c))).join('');
    el.fScale.innerHTML = SCALES.map((s) => pillHTML('scale', s, bdi(s), f.scales.has(s), 'pill--scale', scaleCounts[s] || 0)).join('');
    el.fBrand.innerHTML = BRANDS.filter((b) => brandCounts[b]).map((b) => checkHTML('brand', b, bdi(b), brandCounts[b] || 0, f.brands.has(b))).join('');
    el.fLevel.innerHTML = LEVELS.map((l) => pillHTML('level', l, esc(t('level.' + l)), f.levels.has(l), 'pill--' + l)).join('');
  }

  function activeFilterTotal() {
    const f = state.f;
    return f.cats.size + f.scales.size + f.brands.size + f.levels.size;
  }

  /** Push state.f back into every control (after chips, shortcuts, clear). */
  function syncFilterControls() {
    renderFilterOptions();
    el.shopSearch.value = state.f.q;
    el.sortSelect.value = state.sort;
  }

  function toggleSet(set, value, on) { if (on) set.add(value); else set.delete(value); }

  function renderChips() {
    const f = state.f;
    const chips = []; // { type, value, html } — html is escaped; Latin values isolated with <bdi>
    f.cats.forEach((c) => chips.push({ type: 'cat', value: c, html: esc(t('cat.' + c)) }));
    f.scales.forEach((s) => chips.push({ type: 'scale', value: s, html: t('chip.scale', { x: bdi(s) }) }));
    f.brands.forEach((b) => chips.push({ type: 'brand', value: b, html: bdi(b) }));
    f.levels.forEach((l) => chips.push({ type: 'level', value: l, html: esc(t('level.' + l)) }));
    if (f.q.trim()) chips.push({ type: 'q', value: '', html: t('chip.search', { q: ltrHTML(f.q.trim()) }) });

    let html = chips.map((c) =>
      '<li><button type="button" class="fchip" data-chip-type="' + c.type + '" data-chip-value="' + esc(c.value) + '" aria-label="' + esc(tt('chip.remove', { x: plain(c.html) })) + '">' +
      '<span>' + c.html + '</span><svg class="icon" aria-hidden="true"><use href="#i-close"/></svg></button></li>'
    ).join('');
    el.chips.innerHTML = html;

    const n = activeFilterTotal();
    el.activeFilterCount.hidden = n === 0;
    el.activeFilterCount.textContent = String(n);
  }

  function removeChip(type, value) {
    const f = state.f;
    if (type === 'cat') f.cats.delete(value);
    else if (type === 'scale') f.scales.delete(value);
    else if (type === 'brand') f.brands.delete(value);
    else if (type === 'level') f.levels.delete(value);
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
  /** Shortcut used by level cards, category tiles, hero CTAs and footer links: filter, then land on the results. */
  function applyShortcut(opts) {
    if (Overlay.current) Overlay.close({ restoreFocus: false }); // never leave a drawer open over the results
    state.f = freshFilters();
    const cats = opts.cat ? String(opts.cat).split(',').map((c) => c.trim()).filter(Boolean) : [];
    cats.forEach((c) => state.f.cats.add(c));        // e.g. "baja,offroad"
    if (opts.level) state.f.levels.add(opts.level);
    if (opts.scale) state.f.scales.add(opts.scale);
    syncFilterControls();
    resetAndRender();
    scrollToResults();
    announce(plain(el.resultsTitle.innerHTML) + ' — ' + el.resultCount.textContent);
  }

  /** Scroll so the results header sits just below the sticky header, with the first row of cards in view. */
  function scrollToResults(opts) {
    const o = opts || {};
    const head = el.resultsHead;
    if (!head || !head.getBoundingClientRect) return;
    const headerH = el.header ? el.header.getBoundingClientRect().height : 0;
    const y = window.scrollY || root.scrollTop || 0;
    const top = Math.max(0, Math.round(head.getBoundingClientRect().top + y - headerH - 12));
    const smooth = !o.instant && !reduceMotion.matches;
    try { window.scrollTo({ top: top, behavior: smooth ? 'smooth' : 'auto' }); } catch (e) { window.scrollTo(0, top); }
    if (o.focus !== false) {
      window.setTimeout(() => { try { head.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }, smooth ? 450 : 0);
    }
  }

  /* ---------- URL hash: #shop?level=beginner · #shop?cat=baja,offroad · &scale= · &brand= · &q= ---------- */
  function filtersToQuery() {
    const f = state.f;
    const parts = [];
    const add = (k, set) => { if (set.size) parts.push(k + '=' + Array.from(set).map(encodeURIComponent).join(',')); };
    add('cat', f.cats); add('level', f.levels); add('scale', f.scales); add('brand', f.brands);
    if (f.q.trim()) parts.push('q=' + encodeURIComponent(f.q.trim()));
    return parts.join('&');
  }

  function syncHash() {
    try {
      const q = filtersToQuery();
      const cur = window.location.hash || '';
      const next = q ? '#shop?' + q : (cur.indexOf('#shop?') === 0 ? '#shop' : null);
      if (next !== null && next !== cur && window.history && window.history.replaceState) window.history.replaceState(null, '', next);
    } catch (e) { /* file:// or sandboxed — filtering still works */ }
  }

  /** Read filters from the hash; returns true when it held any. */
  function filtersFromHash() {
    let h = '';
    try { h = window.location.hash || ''; } catch (e) { h = ''; }
    if (h.indexOf('#shop?') !== 0) return false;
    const f = freshFilters();
    let any = false;
    const allow = { cat: [CATEGORIES, 'cats'], level: [LEVELS, 'levels'], scale: [SCALES, 'scales'], brand: [BRANDS, 'brands'] };
    h.slice(6).split('&').forEach((pair) => {
      const i = pair.indexOf('=');
      if (i < 1) return;
      const k = pair.slice(0, i);
      const raw = pair.slice(i + 1);
      try {
        if (k === 'q') { f.q = decodeURIComponent(raw); any = any || !!f.q.trim(); return; }
        if (!allow[k]) return;
        raw.split(',').map((v) => decodeURIComponent(v)).forEach((v) => {
          if (allow[k][0].indexOf(v) !== -1) { f[allow[k][1]].add(v); any = true; }
        });
      } catch (e) { /* malformed value — ignore */ }
    });
    if (!any) return false;
    state.f = f;
    return true;
  }

  function applyHashFilters(instant) {
    if (!filtersFromHash()) return false;
    syncFilterControls();
    state.shown = PAGE_SIZE;
    renderProducts();
    scrollToResults({ instant: instant, focus: false });
    return true;
  }

  function scrollToId(id, focusTarget) {
    const target = doc.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
    if (focusTarget) {
      window.setTimeout(() => {
        try { focusTarget.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
      }, reduceMotion.matches ? 0 : 450);
    }
  }

  function resetAndRender() {
    state.shown = PAGE_SIZE;
    renderProducts();
    syncHash();
  }

  /* ======================================================================
     9. Product grid
     ====================================================================== */
  const SORTERS = {
    featured: (a, b) => b.featured - a.featured,
    // largest scale first = smallest denominator first; items without a scale go last
    scaleDesc: (a, b) => (scaleNum(a) || 999) - (scaleNum(b) || 999) || b.featured - a.featured,
    scaleAsc: (a, b) => (scaleNum(b) || -1) - (scaleNum(a) || -1) || b.featured - a.featured
  };

  /** Level shortcuts list the typical first models first (VOLT_LEVEL_ORDER), then the rest by weight. */
  function levelSorter(level) {
    const order = LEVEL_ORDER[level] || [];
    const rank = (p) => { const i = order.indexOf(p.id); return i === -1 ? 999 : i; };
    return (a, b) => rank(a) - rank(b) || b.featured - a.featured;
  }

  function getResults() {
    const f = state.f;
    const q = norm(f.q);
    return PRODUCTS.filter((p) =>
      (!f.cats.size || f.cats.has(p.category)) &&
      (!f.scales.size || pScales(p).some((s) => f.scales.has(s))) &&
      (!f.brands.size || pBrands(p).some((b) => f.brands.has(b))) &&
      (!f.levels.size || f.levels.has(p.level)) &&
      matches(p, q)
    ).sort(state.sort === 'featured' && f.levels.size === 1 ? levelSorter(Array.from(f.levels)[0]) : (SORTERS[state.sort] || SORTERS.featured));
  }

  function cardHTML(p, i) {
    const model = pModelHTML(p);
    const img = pImages(p)[0];
    const unavailable = maxQty(p) === 0;
    const specs = specChipsHTML(p, 2);
    const count = pImages(p).length;

    return '<li class="pcard' + (unavailable ? ' is-soldout' : '') + '" style="--i:' + (i % PAGE_SIZE) + '">' +
      '<article class="pcard__inner" aria-labelledby="pn-' + p.id + ' pt-' + p.id + '">' +
        '<div class="pcard__media">' +
          '<svg class="media-fallback" aria-hidden="true"><use href="#i-cat-' + p.category + '"/></svg>' +
          imgTag(img, 'width="' + img.tw + '" height="' + img.th + '" loading="lazy" decoding="async" alt="' + esc(pLabel(p)) + '"') +
          (p.level ? '<span class="level-tag level--' + p.level + '">' + esc(t('level.' + p.level)) + '</span>' : '') +
          (count > 1 ? '<span class="photo-count" aria-hidden="true"><svg class="icon"><use href="#i-camera"/></svg>' + fmt(count) + '</span>' : '') +
          '<button class="pcard__quick" type="button" data-quick="' + p.id + '">' +
            '<svg class="icon" aria-hidden="true"><use href="#i-eye"/></svg><span>' + esc(t('card.quick')) + '</span>' +
            '<span class="sr-only">: ' + model + '</span></button>' +
        '</div>' +
        '<div class="pcard__body">' +
          '<p class="pcard__brand">' + metaHTML(p) + '</p>' +
          '<h3 class="pcard__name" id="pn-' + p.id + '"><button type="button" data-quick="' + p.id + '">' + model + '</button></h3>' +
          '<p class="pcard__type" id="pt-' + p.id + '">' + esc(pType(p)) + '</p>' +
          (specs ? '<ul class="pcard__specs">' + specs + '</ul>' : '') +
          '<div class="pcard__foot">' + priceAskHTML(p) + '</div>' +
          '<button class="btn-add" type="button" data-add="' + p.id + '"' + (unavailable ? ' disabled' : '') + '>' +
            '<svg class="icon icon-cart" aria-hidden="true"><use href="#i-list"/></svg>' +
            '<svg class="icon icon-ok" aria-hidden="true"><use href="#i-check"/></svg>' +
            '<span class="btn-add__label">' + esc(unavailable ? t('card.soldOut') : t('card.add')) + '</span>' +
            (unavailable ? '' : '<span class="sr-only">: ' + model + '</span>') +
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
    renderResultsHead(total);
    updateLoadMore(total, visible.length);
    el.filtersApplyLabel.textContent = t('shop.apply', { x: tp('unit.product', total) });
    renderChips();
    if (hasRendered) pulse(el.resultsHead);
    hasRendered = true;
  }

  let hasRendered = false;
  function pulse(node) {
    if (!node || !node.classList || reduceMotion.matches) return;
    node.classList.remove('is-pulse');
    void node.offsetWidth; // restart the animation
    node.classList.add('is-pulse');
  }

  /** Title / count / hint above the grid, naming the current selection. */
  function renderResultsHead(total) {
    const f = state.f;
    const q = f.q.trim();
    const active = activeFilterTotal() > 0 || !!q;
    const segs = [];
    if (f.cats.size) segs.push(Array.from(f.cats).map((c) => esc(t('cat.' + c))).join(' + '));
    f.levels.forEach((l) => segs.push(esc(t('results.level.' + l))));
    if (f.scales.size) segs.push(t('results.scale', { x: bdi(Array.from(f.scales).join(' · ')) }));
    if (f.brands.size) segs.push(Array.from(f.brands).map(bdi).join(' · '));
    let title;
    if (!active) title = esc(t('results.all', { n: fmt(PRODUCTS.length) }));
    else if (!segs.length) title = t('results.search', { q: ltrHTML(q) });
    else title = segs.join('<span class="results-head__sep" aria-hidden="true"> · </span>') + (q ? ' <span class="results-head__q">' + t('results.searchShort', { q: ltrHTML(q) }) + '</span>' : '');
    el.resultsTitle.innerHTML = title;
    el.resultsHead.classList.toggle('is-quiet', !active);
    // models-only wording when a level is selected (levels only exist on complete vehicles)
    el.resultCount.textContent = active ? tp(f.levels.size ? 'unit.model' : 'unit.product', total) : '';
    el.resultCount.hidden = !active;
    const onlyLevel = f.levels.size === 1 && !f.cats.size && !f.scales.size && !f.brands.size && !q;
    el.resultsHint.hidden = !onlyLevel;
    el.resultsHint.textContent = onlyLevel ? t('results.hint.' + Array.from(f.levels)[0]) : '';
    el.resultsAll.hidden = !active;
    el.chips.hidden = !active;
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
     10. Quick view (with photo thumbnails)
     ====================================================================== */
  let qvId = null;
  let qvQty = 1;
  let qvImg = 0;

  function openQuickView(id, trigger) {
    if (!byId.has(id)) return;
    qvId = id;
    qvQty = 1;
    qvImg = 0;
    renderQuickView();
    Overlay.open(el.quickView, { trigger: trigger });
  }

  function renderQuickView() {
    const p = byId.get(qvId);
    if (!p) return;
    const imgs = pImages(p);
    const unavailable = maxQty(p) === 0;
    const main = imgs[clamp(qvImg, 0, imgs.length - 1)];
    // [label key, cell HTML] — type-level facts only
    const rows = [['category', esc(t('cat.' + p.category))]]
      .concat(pBrands(p).length ? [['brand', pBrands(p).map(bdi).join(' · ')]] : [])
      .concat(pScales(p).length ? [['scale', bdi(pScales(p).join(' · '))]] : [])
      .concat(p.level ? [['level', esc(t('level.' + p.level))]] : [])
      .concat(Object.keys(p.specs || {}).map((k) => [k, ltrHTML(specValue(p.specs[k]))]))
      .map((r) => '<tr><th scope="row">' + esc(t('spec.' + r[0])) + '</th><td>' + r[1] + '</td></tr>')
      .join('');
    const thumbs = imgs.length > 1
      ? '<div class="qv__thumbs" role="group" aria-label="' + esc(t('qv.photos')) + '">' +
          imgs.map((im, i) =>
            '<button type="button" class="qv__thumb" data-qv-img="' + i + '" aria-pressed="' + (i === qvImg ? 'true' : 'false') + '" aria-label="' + esc(t('qv.thumb', { n: i + 1 })) + '">' +
              '<img src="' + esc(im.thumb || im.src) + '" width="' + im.tw + '" height="' + im.th + '" loading="lazy" decoding="async" alt=""></button>'
          ).join('') +
        '</div>'
      : '';

    el.qvContent.innerHTML =
      '<div class="qv__gallery">' +
        '<div class="qv__media">' +
          '<svg class="media-fallback" aria-hidden="true"><use href="#i-cat-' + p.category + '"/></svg>' +
          imgTag(main, 'id="qvMainImg" width="' + main.fw + '" height="' + main.fh + '" alt="' + esc(pLabel(p)) + '"', true) +
          '<span class="qv__scan" aria-hidden="true"></span>' +
        '</div>' +
        '<p class="qv__credit" id="qvCredit"' + (main.credit ? '' : ' hidden') + '>' + creditLine(main) + '</p>' +
        thumbs +
      '</div>' +
      '<div class="qv__body">' +
        '<p class="qv__brand">' + metaHTML(p) + (p.level ? ' <span class="level-tag level--' + p.level + '">' + esc(t('level.' + p.level)) + '</span>' : '') + '</p>' +
        '<h2 class="qv__title" id="qvTitle">' + pModelHTML(p) + '</h2>' +
        '<p class="qv__type">' + esc(pType(p)) + '</p>' +
        priceAskHTML(p, 'price-ask--lg') +
        '<p class="qv__desc">' + esc(pDesc(p)) + '</p>' +
        '<div class="qv__buy">' +
          '<div class="qty" role="group" aria-label="' + esc(t('qv.qty')) + '">' +
            '<button type="button" data-qv-dec aria-label="' + esc(t('qv.dec')) + '"><svg class="icon" aria-hidden="true"><use href="#i-minus"/></svg></button>' +
            '<output class="qty__val" id="qvQty" aria-live="polite">' + qvQty + '</output>' +
            '<button type="button" data-qv-inc aria-label="' + esc(t('qv.inc')) + '"><svg class="icon" aria-hidden="true"><use href="#i-plus"/></svg></button>' +
          '</div>' +
          '<button class="btn btn--primary qv__add" type="button" data-qv-add' + (unavailable ? ' disabled' : '') + '>' +
            '<svg class="icon" aria-hidden="true"><use href="#i-list"/></svg><span class="btn-add__label">' + esc(unavailable ? t('card.soldOut') : t('card.add')) + '</span></button>' +
        '</div>' +
        '<ul class="qv__perks">' +
          '<li><svg class="icon" aria-hidden="true"><use href="#i-whatsapp"/></svg>' + esc(t('qv.perk1')) + '</li>' +
          '<li><svg class="icon" aria-hidden="true"><use href="#i-truck"/></svg>' + esc(t('qv.perk2')) + '</li>' +
          '<li><svg class="icon" aria-hidden="true"><use href="#i-cash"/></svg><span>' + esc(t('qv.perk3')) + '</span>' + CIB_XS + '</li>' +
        '</ul>' +
        '<h3 class="qv__specs-title">' + esc(t('qv.specs')) + '</h3>' +
        '<table class="specs-table"><tbody>' + rows + '</tbody></table>' +
      '</div>';
    updateQvQty();
  }

  function setQvImage(i) {
    const p = byId.get(qvId);
    if (!p) return;
    const imgs = pImages(p);
    qvImg = clamp(i, 0, imgs.length - 1);
    const im = imgs[qvImg];
    const main = $('#qvMainImg', el.qvContent);
    if (main) { main.src = im.src || im.thumb; main.width = im.fw; main.height = im.fh; }
    const credit = $('#qvCredit', el.qvContent);
    if (credit) { credit.innerHTML = creditLine(im); credit.hidden = !im.credit; }
    $$('.qv__thumb', el.qvContent).forEach((b, k) => b.setAttribute('aria-pressed', k === qvImg ? 'true' : 'false'));
  }

  /** "📷 Author · License" under Creative Commons photos (quick view). */
  function creditLine(im) {
    const c = im && im.credit && CREDITS[im.credit];
    if (!c) return '';
    return '<svg class="icon" aria-hidden="true"><use href="#i-camera"/></svg><span>' + bdi(c.author) + ' · ' +
      '<a href="' + esc(c.licenseUrl) + '" target="_blank" rel="noopener noreferrer license">' + bdi(c.license) + '</a></span>';
  }

  /** Footer "Photo credits" dialog: item — author — license (link) — source (link). */
  function renderCredits() {
    if (!el.creditsList) return;
    const keys = Object.keys(CREDITS);
    el.creditsList.innerHTML = keys.map((k) => {
      const c = CREDITS[k];
      const p = byId.get(c.product);
      const siblings = keys.filter((x) => CREDITS[x].product === c.product);
      const item = (p ? esc(pType(p)) : '') + (siblings.length > 1 ? ' <span class="credits__n">' + fmt(siblings.indexOf(k) + 1) + '</span>' : '');
      return '<li><span class="credits__item">' + item + '</span>' +
        '<span class="credits__sep" aria-hidden="true"> — </span>' + bdi(c.author) +
        '<span class="credits__sep" aria-hidden="true"> — </span><a href="' + esc(c.licenseUrl) + '" target="_blank" rel="noopener noreferrer license">' + bdi(c.license) + '</a>' +
        '<span class="credits__sep" aria-hidden="true"> — </span><a href="' + esc(c.source) + '" target="_blank" rel="noopener noreferrer">' + esc(t('credits.source')) + '</a></li>';
    }).join('');
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
    if (inc) inc.disabled = qvQty >= max || maxQty(p) === 0;
  }

  /* ======================================================================
     11. Inquiry list (no prices — Hamdy confirms price & availability)
     ====================================================================== */
  const cartCount = () => state.cart.reduce((s, l) => s + l.qty, 0);
  function saveCart() { storage.setJSON('volt.cart', state.cart); }

  function lineHTML(line) {
    const p = byId.get(line.id);
    const name = pModelText(p); // plain text (isolated) for aria-labels
    const img = pImages(p)[0];
    return '<li class="cline" data-id="' + p.id + '">' +
      '<div class="cline__img"><svg class="media-fallback" aria-hidden="true"><use href="#i-cat-' + p.category + '"/></svg>' +
        imgTag(img, 'width="' + img.tw + '" height="' + img.th + '" loading="lazy" decoding="async" alt=""') + '</div>' +
      '<div class="cline__info">' +
        '<p class="cline__name">' + pModelHTML(p) + '</p>' +
        '<p class="cline__type">' + esc(pType(p)) + '</p>' +
        '<div class="qty qty--sm" role="group" aria-label="' + esc(t('qv.qty') + ': ' + name) + '">' +
          '<button type="button" data-cart-dec="' + p.id + '" aria-label="' + esc(t('list.dec', { name: name })) + '"><svg class="icon" aria-hidden="true"><use href="#' + (line.qty <= 1 ? 'i-trash' : 'i-minus') + '"/></svg></button>' +
          '<span class="qty__val" aria-label="' + esc(t('list.qty', { n: line.qty })) + '">' + line.qty + '</span>' +
          '<button type="button" data-cart-inc="' + p.id + '" aria-label="' + esc(t('list.inc', { name: name })) + '"' + (line.qty >= maxQty(p) ? ' disabled' : '') + '><svg class="icon" aria-hidden="true"><use href="#i-plus"/></svg></button>' +
        '</div>' +
      '</div>' +
      '<div class="cline__end">' +
        '<button type="button" class="cline__remove" data-cart-remove="' + p.id + '" aria-label="' + esc(t('list.remove', { name: name })) + '"><svg class="icon" aria-hidden="true"><use href="#i-trash"/></svg></button>' +
      '</div>' +
    '</li>';
  }

  function renderCart() {
    const count = cartCount();
    const empty = count === 0;
    el.cartBadge.textContent = count > 99 ? '99+' : String(count);
    el.cartBadge.dataset.count = String(count);
    el.cartOpen.setAttribute('aria-label', tt('header.list', { x: tp('unit.item', count) }));
    el.cartCount.textContent = String(count);
    el.cartLines.innerHTML = state.cart.map(lineHTML).join('');
    el.cartLines.hidden = empty;
    el.cartEmpty.hidden = !empty;
    el.cartSummary.hidden = empty;
  }

  function bumpBadge() {
    el.cartBadge.classList.remove('is-bump');
    void el.cartBadge.offsetWidth; // restart animation
    el.cartBadge.classList.add('is-bump');
  }

  function addToCart(id, qty, sourceEl) {
    const p = byId.get(id);
    if (!p || maxQty(p) === 0) return false;
    const line = state.cart.find((l) => l.id === id);
    const current = line ? line.qty : 0;
    if (current >= maxQty(p)) {
      announce(t('list.max', { name: pModelText(p) }));
      shake(sourceEl);
      return false;
    }
    const next = Math.min(maxQty(p), current + (qty || 1));
    if (line) line.qty = next; else state.cart.push({ id: id, qty: next });
    saveCart();
    renderCart();
    announce(t('list.added', { name: pModelText(p), x: tp('unit.item', cartCount()) }));
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
    if (next > maxQty(p)) { announce(t('list.max', { name: pModelText(p) })); return; }
    line.qty = next;
    saveCart();
    renderCart();
    bumpBadge();
    announce(t('list.updated', { name: pModelText(p), n: next }));
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
    announce(t('list.removed', { name: pModelText(p) }));
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

  /** Glowing dot that arcs from the button to the list icon. */
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
    dot.innerHTML = '<svg class="icon"><use href="#i-check"/></svg>';
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
    const img = pImages(p)[0];
    el.toastImg.hidden = !!img.none;
    if (!img.none) el.toastImg.src = img.thumb || img.src;
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

  /** "Contact us to order": close the drawer, go to #contact and prefill the form message. */
  function listToContact() {
    if (!state.cart.length) return;
    const lines = [tpl('wa.listIntro')].concat(state.cart.map((l) => '• ' + pModelText(byId.get(l.id)) + ' × ' + l.qty));
    Overlay.close({ restoreFocus: false });
    el.cMsg.value = lines.join('\n');
    el.cTopic.value = 'order';
    setFieldError(el.cMsg, '');
    state.formPrefilled = true;
    el.formStatus.textContent = t('form.prefilled');
    scrollToId('contact', el.cName.value.trim() ? el.cMsg : el.cName);
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
      el.searchResults.innerHTML = res.slice(0, 6).map((p) => {
        const img = pImages(p)[0];
        return '<li><button type="button" class="sresult" data-quick="' + p.id + '">' +
          '<span class="sresult__img"><svg class="media-fallback" aria-hidden="true"><use href="#i-cat-' + p.category + '"/></svg>' +
          imgTag(img, 'width="' + img.tw + '" height="' + img.th + '" loading="lazy" decoding="async" alt=""') + '</span>' +
          '<span class="sresult__text"><span class="sresult__name">' + pModelHTML(p) + '</span>' +
          '<span class="sresult__meta">' + esc(pType(p)) + '</span></span>' +
          '<span class="sresult__price">' + esc(t('price.ask')) + '</span>' +
        '</button></li>';
      }).join('');
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
    scrollToResults();
  }

  /* ======================================================================
     13. Featured product
     ====================================================================== */
  function renderDeal() {
    const p = FEATURED && byId.get(FEATURED.productId);
    if (!p) return;
    const photo = FEATURED.photo && photoByKey.get(FEATURED.photo);
    el.dealName.innerHTML = pModelHTML(p) + '<span class="deal__type">' + esc(pType(p)) + '</span>';
    el.dealDesc.textContent = pDesc(p);
    el.dealSpecs.innerHTML = specChipsHTML(p, 4);
    el.dealPrice.innerHTML = priceAskHTML(p, 'price-ask--lg');
    if (photo) {
      // thumb by default, full photo only on large / high-density screens
      const srcset = photo.thumb + ' 600w, ' + photo.full + ' ' + photo.fw + 'w';
      if (el.dealImg.getAttribute('srcset') !== srcset) { el.dealImg.setAttribute('srcset', srcset); el.dealImg.src = photo.thumb; }
    } else {
      const img = pImages(p)[0];
      el.dealImg.removeAttribute('srcset');
      if (img.src && el.dealImg.getAttribute('src') !== img.src) el.dealImg.src = img.src;
    }
    el.dealImg.alt = pLabel(p);
  }

  /* ======================================================================
     14. Gallery (inside the shop) + lightbox
     ====================================================================== */
  const galleryList = () => PHOTOS.filter((g) => state.gFilter === 'all' || g.cat === state.gFilter);
  /* Photo captions: tidy model / brand names per photo group (keys = the
     group titles in photos.js). A string = English model/brand names (isolated
     with <bdi>); [ar, en] = localised trusted markup; '' = category name alone. */
  const L = (s) => '<bdi dir="ltr">' + s + '</bdi>';
  const CAPTIONS = {
    'Shop': '', 'Rc car': '', '': '',
    'Losi 12s': 'Losi 12S',
    'parts Hpi Arrma Traxxas': ['قطع غيار ' + L('HPI · Arrma · Traxxas'), 'HPI · Arrma · Traxxas parts'],
    'Rc car 1/10 drift': ['سيارة درفت بمقاس ' + L('1/10'), '1/10 drift car'],
    'Fg 1/5': 'FG 1/5',
    'Fg': 'FG',
    'Rofun baja 5t 1/5 32cc': 'Rofun Baja 5T 1/5 32cc',
    'fg 1/6 monster truck 2wd': ['شاحنة مونستر ' + L('FG 1/6 2WD'), 'FG 1/6 monster truck 2WD'],
    'Traxxas x maxx 8s 1/5': 'Traxxas X-Maxx 8S',
    'X macc 8s': 'Traxxas X-Maxx 8S',
    'Arrma talion exb 1/7 6s 75mph': 'Arrma Talion EXB 6S 1/7',
    'hpi savage body traxxas maxx': ['هياكل ' + L('HPI Savage · Traxxas Maxx'), 'HPI Savage · Traxxas Maxx bodies'],
    'For sale traxxas maxx v2': 'Traxxas Maxx V2',
    'Arrma MOJAVE 6S 1/7': 'Arrma Mojave 6S 1/7',
    'Arrma Mojave exb 1/7': 'Arrma Mojave EXB 1/7',
    'Arrma KRATON 1/8 6S v6': 'Arrma Kraton 6S V6 1/8',
    'Arrma KRATON 6S v6 1/8': 'Arrma Kraton 6S V6 1/8',
    'Arrma typhon grom': 'Arrma Typhon Grom',
    'E revo 1/16': 'Traxxas E-Revo 1/16',
    'E revo 1/8 6s': 'Traxxas E-Revo 6S',
    'Traxxas': 'Traxxas',
    'Losi 1/4 Promoto-MX Motorcycle RTR with Battery and Charger': 'Losi Promoto-MX 1/4',
    'New for sale traxxas 4tec 1/10 drift': 'Traxxas 4-Tec Drift 1/10',
    'rc car 1/10 mst drift': 'MST 1/10 Drift',
    '1/10 Drift On Road Tires': ['إطارات درفت وأون رود بمقاس ' + L('1/10'), '1/10 drift & on-road tires'],
    'Hpi rs4': 'HPI RS4',
    'Hpi wr8': 'HPI WR8',
    'New for sale 1/10 body': ['هيكل بمقاس ' + L('1/10'), '1/10 body'],
    'rc plane engine for sael': ['محركات طائرات', 'RC plane engines'],
    'rc plane parts for sael': ['قطع غيار طائرات', 'RC plane parts'],
    'rc plane parts': ['قطع غيار طائرات', 'RC plane parts'],
    'rc plane accessories': ['إكسسوارات طائرات', 'RC plane accessories'],
    'Hpi Hsp Xray thunder tiger kyosho Rovan King motor parts': ['قطع غيار ' + L('HPI · HSP · Xray · Thunder Tiger · Kyosho · Rovan · King Motor'), 'HPI · HSP · Xray · Thunder Tiger · Kyosho · Rovan · King Motor parts'],
    'Hpi Hsp Xray thunder tiger kyosho': ['قطع غيار ' + L('HPI · HSP · Xray · Thunder Tiger · Kyosho'), 'HPI · HSP · Xray · Thunder Tiger · Kyosho parts'],
    'arrma parts': ['قطع غيار ' + L('Arrma'), 'Arrma parts'],
    'Rc Tires 1/5 1/8 1/10 1/16': ['إطارات بمقاسات ' + L('1/5 · 1/8 · 1/10 · 1/16'), 'Tires 1/5 · 1/8 · 1/10 · 1/16'],
    'Proline badlands 1/5 x maxx': 'Pro-Line Badlands · X-Maxx',
    'battery': ['بطاريات', 'Batteries'],
    'Body': ['هياكل', 'Bodies'],
    'Hex drivers 1.5-3.0 mm': ['مفكات سداسية ' + L('1.5–3.0 mm'), 'Hex drivers 1.5–3.0 mm'],
    'Hex driver set': ['طقم مفكات سداسية', 'Hex driver set'],
    'Driver set': ['طقم مفكات', 'Driver set'],
    'CellMeter 8': 'CellMeter 8',
    'Digital tachometer': ['عدّاد لفات رقمي', 'Digital tachometer'],
    'Glow plug driver': ['مفتاح شمعات جلو', 'Glow plug driver'],
    'Glow igniter': ['مشعل شمعات جلو', 'Glow igniter'],
    'Charge leads': ['أسلاك شحن متعددة', 'Multi charge leads'],
    'Servo extension leads': ['وصلات تمديد سيرفو', 'Servo extension leads'],
    'Curved body scissors': ['مقص هياكل منحني', 'Curved body scissors'],
    'Plane accessories': ['إكسسوارات طائرات', 'RC plane accessories'],
    'Plane wheels': ['عجلات طائرات', 'Plane wheels'],
    'Spinners': ['سبينرات للمراوح', 'Propeller spinners'],
    'Fuel tubing': ['خراطيم وقود', 'Fuel tubing'],
    'Fuel tanks': ['خزانات وقود', 'Fuel tanks'],
    'Glow plugs': ['شمعات جلو', 'Glow plugs'],
    'Control horns & hinges': ['قرون تحكم ومفصلات', 'Control horns & hinges'],
    'Pushrods & linkages': ['أذرع ووصلات تحكم', 'Pushrods & linkages'],
    'Linkage hardware': ['مسامير ووصلات', 'Linkage hardware'],
    'Traxxas M41': 'Traxxas M41 6S',
    'FG 1/6 Monster Truck': ['شاحنة مونستر ' + L('FG 1/6'), 'FG 1/6 monster truck'],
    'Panther touring car': ['سيارة سياحية ' + L('Panther'), 'Panther touring car'],
    'DDM petrol engine': ['محرك بنزين ' + L('DDM'), 'DDM petrol engine'],
    '2-stroke glow plane engines': ['محركات طائرات جلو ثنائية الأشواط', '2-stroke glow plane engines'],
    'Traxxas TQi transmitter': ['جهاز تحكم ' + L('Traxxas TQi'), 'Traxxas TQi transmitter']
  };
  function photoCaptionHTML(g) {
    const c = Object.prototype.hasOwnProperty.call(CAPTIONS, g.title) ? CAPTIONS[g.title] : g.title;
    const cap = Array.isArray(c) ? c[state.lang === 'en' ? 1 : 0] : (c ? ltrHTML(c) : '');
    return esc(t('gallery.' + g.cat)) + (cap ? ' — ' + cap : '');
  }

  function galleryItemHTML(g, i) {
    return '<li class="gitem" style="--i:' + (i % 12) + '">' +
      '<button type="button" class="gitem__btn" data-lb-index="' + i + '" aria-label="' + esc(tt('gallery.open', { x: plain(photoCaptionHTML(g)) })) + '">' +
        '<img src="' + esc(g.thumb) + '" width="' + g.tw + '" height="' + g.th + '" loading="lazy" decoding="async" alt="">' +
        '<span class="gitem__tag" aria-hidden="true">' + esc(t('gallery.' + g.cat)) + '</span>' +
        '<span class="gitem__zoom" aria-hidden="true"><svg class="icon"><use href="#i-expand"/></svg></span>' +
      '</button>' +
    '</li>';
  }

  function renderGallery() {
    const list = galleryList();
    const shown = list.slice(0, state.gShown);
    el.galleryGrid.innerHTML = shown.map(galleryItemHTML).join('');
    const remaining = list.length - shown.length;
    el.galleryMore.hidden = remaining <= 0;
    el.galleryMoreLabel.textContent = t('gallery.more', { n: fmt(Math.min(GALLERY_PAGE, remaining)) });
    $$('[data-gallery-filter]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.galleryFilter === state.gFilter ? 'true' : 'false'));
    $$('[data-gallery-count]').forEach((n) => {
      const g = n.dataset.galleryCount;
      n.textContent = fmt(g === 'all' ? PHOTOS.length : PHOTOS.filter((x) => x.cat === g).length);
    });
  }

  /** Append the next 24 thumbnails without re-rendering the existing ones. */
  function galleryMore() {
    const list = galleryList();
    const from = state.gShown;
    state.gShown += GALLERY_PAGE;
    const next = list.slice(from, state.gShown);
    el.galleryGrid.insertAdjacentHTML('beforeend', next.map((g, i) => galleryItemHTML(g, from + i)).join(''));
    const remaining = list.length - Math.min(state.gShown, list.length);
    el.galleryMore.hidden = remaining <= 0;
    el.galleryMoreLabel.textContent = t('gallery.more', { n: fmt(Math.min(GALLERY_PAGE, remaining)) });
    const firstNew = el.galleryGrid.children[from];
    if (firstNew) { const b = $('.gitem__btn', firstNew); if (b) b.focus({ preventScroll: false }); }
  }

  function openLightbox(index, trigger) {
    state.lbList = galleryList();
    if (!state.lbList.length) return;
    state.lbIndex = clamp(index, 0, state.lbList.length - 1);
    renderLightbox();
    Overlay.open(el.lightbox, { trigger: trigger, initialFocus: '#lbNext' });
  }

  function renderLightbox() {
    const g = state.lbList[state.lbIndex];
    if (!g) return;
    el.lbImg.src = g.full;              // full-size photo only in the lightbox
    el.lbImg.width = g.fw;
    el.lbImg.height = g.fh;
    el.lbImg.alt = plain(photoCaptionHTML(g));
    el.lbCaption.innerHTML = photoCaptionHTML(g);
    el.lbCount.textContent = t('lb.counter', { n: fmt(state.lbIndex + 1), total: fmt(state.lbList.length) });
  }

  function lbGo(delta) {
    const n = state.lbList.length;
    if (!n) return;
    state.lbIndex = (state.lbIndex + delta + n) % n;
    renderLightbox();
  }

  function initLightboxGestures() {
    // Keyboard: arrows follow the reading direction (in RTL, ← is "next").
    doc.addEventListener('keydown', (e) => {
      if (Overlay.current !== el.lightbox) return;
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      const rtl = root.dir === 'rtl';
      const forward = e.key === 'ArrowRight' ? !rtl : rtl;
      lbGo(forward ? 1 : -1);
    });
    // Touch swipe (direction-aware)
    let startX = null;
    el.lbStage.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') startX = e.clientX; });
    el.lbStage.addEventListener('pointerup', (e) => {
      if (startX == null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) < 45) return;
      const forward = root.dir === 'rtl' ? dx > 0 : dx < 0;
      lbGo(forward ? 1 : -1);
    });
    el.lbStage.addEventListener('pointercancel', () => { startX = null; });
  }

  /* ======================================================================
     14a. Videos — muted 8-second previews while in view; full player on tap
     ====================================================================== */
  const PREVIEW_SECONDS = 8;
  const vTime = (sec) => Math.floor(sec / 60) + ':' + ('0' + (sec % 60)).slice(-2);
  const vDesc = (v) => (v.desc && (v.desc[state.lang] || v.desc.en)) || '';
  let videoIO = null;
  let currentVideo = null;

  /** Autoplay previews only when motion is welcome and the connection is not constrained. */
  function canAutoplayPreviews() {
    if (reduceMotion.matches) return false;
    try {
      const c = window.navigator && window.navigator.connection;
      if (c && (c.saveData || /(^|-)2g$/.test(String(c.effectiveType || '')))) return false;
    } catch (e) { /* unknown → allow */ }
    return true;
  }

  function videoCardHTML(v) {
    const label = tt('videos.play', { x: iso(v.title) + ' — ' + vDesc(v) + ' (' + vTime(v.duration) + ')' });
    return '<li class="vcard">' +
      '<button type="button" class="vcard__btn" data-video="' + esc(v.id) + '" aria-label="' + esc(label) + '">' +
        '<span class="vcard__media">' +
          // no src until the card is on screen: nothing downloads before that (preload="none" + poster)
          '<video class="vcard__video" muted loop playsinline preload="none" poster="' + esc(v.poster) + '" data-src="' + esc(v.src) + '" aria-hidden="true" tabindex="-1"></video>' +
          '<span class="vcard__play" aria-hidden="true"><svg class="icon"><use href="#i-play"/></svg></span>' +
          '<span class="vcard__time" aria-hidden="true">' + vTime(v.duration) + '</span>' +
        '</span>' +
        '<span class="vcard__text"><span class="vcard__title">' + bdi(v.title) + '</span><span class="vcard__desc">' + esc(vDesc(v)) + '</span></span>' +
      '</button></li>';
  }

  function renderVideos() {
    if (!el.videoGrid) return;
    el.videoGrid.innerHTML = VIDEOS.map(videoCardHTML).join('');
    initVideoPreviews();
  }

  function pausePreviews() { $$('.vcard__video', el.videoGrid).forEach((vid) => { try { vid.pause(); } catch (e) { /* ignore */ } }); }

  function initVideoPreviews() {
    if (videoIO && videoIO.disconnect) videoIO.disconnect();
    videoIO = null;
    if (!el.videoGrid || !canAutoplayPreviews() || !('IntersectionObserver' in window)) return;
    videoIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const vid = entry.target;
        if (entry.isIntersecting && Overlay.current !== el.videoModal) {
          if (!vid.getAttribute('src')) vid.setAttribute('src', vid.dataset.src);
          const p = vid.play();
          if (p && p.catch) p.catch(() => { /* autoplay refused → poster stays */ });
        } else {
          try { vid.pause(); } catch (e) { /* ignore */ }
        }
      });
    }, { threshold: 0.5 });
    $$('.vcard__video', el.videoGrid).forEach((vid) => {
      vid.addEventListener('timeupdate', () => { if (vid.currentTime >= PREVIEW_SECONDS) vid.currentTime = 0; });
      videoIO.observe(vid);
    });
  }

  function renderVideoMeta() {
    const v = currentVideo;
    if (!v) return;
    el.vpTitle.innerHTML = bdi(v.title);
    el.vpDesc.textContent = vDesc(v) + ' · ' + vTime(v.duration);
    const p = byId.get(v.product);
    el.vpProduct.hidden = !p;
    if (p) el.vpProduct.dataset.quick = p.id;
  }

  function openVideo(id, trigger) {
    const v = VIDEOS.find((x) => x.id === id);
    if (!v) return;
    currentVideo = v;
    renderVideoMeta();
    const vid = el.vpVideo;
    pausePreviews();
    vid.poster = v.poster;
    vid.src = v.src;
    vid.muted = false;
    Overlay.open(el.videoModal, {
      trigger: trigger,
      initialFocus: '#vpVideo',
      onOpen() {
        try { const p = vid.play(); if (p && p.catch) p.catch(() => { /* user can press play */ }); } catch (e) { /* ignore */ }
      },
      onClose() {
        try { vid.pause(); vid.removeAttribute('src'); vid.load(); } catch (e) { /* ignore */ }
        currentVideo = null;
        initVideoPreviews(); // resume the previews that are in view
      }
    });
  }

  /* ======================================================================
     14b. Bank transfer details (config at the top of this file)
     ====================================================================== */
  const BANK_FIELDS = [
    ['bankName', 'bank.bankName', false],
    ['accountName', 'bank.accountName', false],
    ['accountNumber', 'bank.accountNumber', true],
    ['iban', 'bank.iban', true],
    ['instapay', 'bank.instapay', true]
  ];

  const BANK_NAMES = { CIB: 'bank.cibName' };            // known banks → full localised name + logo
  const groupDigits = (v) => (/^\d+$/.test(v) ? v.replace(/(\d{4})(?=\d)/g, '$1 ') : v);

  function bankRow(labelKey, valueHTML, copyValue, extraClass) {
    return '<div class="bank__row' + (extraClass ? ' ' + extraClass : '') + '"><dt>' + t(labelKey) + '</dt><dd>' +
      '<span class="bank__value">' + valueHTML + '</span>' +
      (copyValue ? '<button type="button" class="bank__copy" data-copy="' + esc(copyValue) + '" aria-label="' + esc(tt('bank.copy', { x: plain(t(labelKey)) })) + '">' +
        '<svg class="icon" aria-hidden="true"><use href="#i-copy"/></svg><span class="bank__copy-label">' + esc(t('bank.copyShort')) + '</span></button>' : '') +
      '</dd></div>';
  }

  function renderBank() {
    if (!el.bankBody) return;
    const val = (k) => String(BANK_DETAILS[k] || '').trim();
    const any = BANK_FIELDS.some((fl) => val(fl[0]));
    if (!any) {
      el.bankBody.innerHTML = '<p class="bank__note">' + esc(t('bank.pending')) + '</p>';
      return;
    }
    const bankKey = BANK_NAMES[val('bankName').toUpperCase()];
    const rows = [];
    if (val('bankName')) rows.push(bankRow('bank.bankName', bankKey ? t(bankKey) : ltrHTML(val('bankName'))));
    if (val('accountName')) rows.push(bankRow('bank.accountName', ltrHTML(val('accountName')), val('accountName')));
    if (val('accountNumber')) {
      const raw = val('accountNumber').replace(/\s+/g, '');
      rows.push(bankRow('bank.accountNumber', '<bdi dir="ltr" class="bank__number">' + esc(groupDigits(raw)) + '</bdi>', raw, 'bank__row--number'));
    }
    if (val('iban')) rows.push(bankRow('bank.iban', '<bdi dir="ltr" class="bank__number bank__number--sm">' + esc(val('iban')) + '</bdi>', val('iban').replace(/\s+/g, '')));
    if (val('instapay')) rows.push(bankRow('bank.instapay', bdi(val('instapay')), val('instapay')));
    rows.push(bankRow('bank.currency', t('bank.currencyValue')));
    const waHref = waLink(waText([tpl('wa.bankSent')]));
    el.bankBody.innerHTML =
      '<div class="bank-card">' +
        '<div class="bank-card__top">' +
          '<span class="bank-card__label"><svg class="icon" aria-hidden="true"><use href="#i-bank"/></svg>' + esc(t('pay.bank')) + '</span>' +
          (bankKey ? '<span class="cib-plate"><img src="assets/img/cib-logo.svg" width="100" height="40" alt="' + esc(plain(t(bankKey))) + '"></span>' : '') +
        '</div>' +
        '<dl class="bank__list">' + rows.join('') + '</dl>' +
        '<div class="bank-card__foot">' +
          '<p>' + esc(t('bank.note')) + '</p>' +
          '<a class="btn btn--wa btn--sm bank-card__wa" href="' + esc(waHref) + '" target="_blank" rel="noopener noreferrer">' +
            '<svg class="icon" aria-hidden="true"><use href="#i-whatsapp"/></svg><span>' + esc(t('bank.sendReceipt')) + '</span>' +
            '<span class="sr-only"> ' + esc(t('a11y.newTab')) + '</span></a>' +
        '</div>' +
      '</div>';
  }

  let miniToastTimer = null;
  function showMiniToast(text) {
    if (!el.miniToast) return;
    el.miniToast.textContent = text;
    el.miniToast.classList.add('is-show');
    window.clearTimeout(miniToastTimer);
    miniToastTimer = window.setTimeout(() => el.miniToast.classList.remove('is-show'), 1800);
  }

  function fallbackCopy(text) {
    try {
      const ta = doc.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      doc.body.appendChild(ta);
      ta.select();
      const ok = doc.execCommand('copy');
      ta.remove();
      return !!ok;
    } catch (e) { return false; }
  }

  /** Copy to clipboard (Clipboard API on https, textarea fallback on file:// / older browsers). */
  function copyText(text) {
    return new Promise((resolve) => {
      try {
        const nav = window.navigator;
        if (nav && nav.clipboard && window.isSecureContext) {
          nav.clipboard.writeText(text).then(() => resolve(true), () => resolve(fallbackCopy(text)));
          return;
        }
      } catch (e) { /* fall through */ }
      resolve(fallbackCopy(text));
    });
  }

  function onCopy(btn) {
    copyText(btn.dataset.copy || '').then((ok) => {
      const label = $('.bank__copy-label', btn);
      btn.classList.toggle('is-copied', ok);
      if (label) label.textContent = t(ok ? 'bank.copied' : 'bank.copyFailed');
      showMiniToast(t(ok ? 'bank.copied' : 'bank.copyFailed')); // role=status → also announced
      window.clearTimeout(btn._copyTimer);
      btn._copyTimer = window.setTimeout(() => {
        btn.classList.remove('is-copied');
        if (label && doc.contains(label)) label.textContent = t('bank.copyShort');
      }, 1800);
    });
  }

  /* ======================================================================
     15. Contact form → WhatsApp (validation; nothing is sent from the site)
     ====================================================================== */
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
    else if (v && field.name === 'phone') {
      const digits = toLatinDigits(v).replace(/[\s\-()]/g, '');
      // Egyptian mobile: 11 digits 010 / 011 / 012 / 015 (+20 / 0020 prefix normalised to 0)
      if (!/^01[0125]\d{8}$/.test(digits.replace(/^(\+|00)20(?=1)/, '0'))) key = 'form.errPhone';
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

  /** Build the WhatsApp message from the form (current language). */
  function contactMessage() {
    const topic = el.cTopic.options[el.cTopic.selectedIndex];
    const phone = el.cPhone.value.trim();
    const lines = [tpl('wa.contactIntro'), tpl('wa.contactName', { x: el.cName.value.trim() })];
    if (phone) lines.push(tpl('wa.contactPhone', { x: toLatinDigits(phone) }));
    lines.push(tpl('wa.contactTopic', { x: topic ? topic.textContent.trim() : '' }));
    lines.push(tpl('wa.contactMsg'));
    lines.push(el.cMsg.value.trim());
    return waText(lines);
  }

  function initForms() {
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
      openWhatsApp(contactMessage()); // opens WhatsApp with the text ready — the visitor presses Send
    });
  }

  function refreshFormText() {
    $$('.field__error').forEach((err) => { if (err.dataset.errKey) err.textContent = t(err.dataset.errKey); });
    if (state.formPrefilled) el.formStatus.textContent = t('form.prefilled');
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
      node.dataset.animating = '1';
      node.textContent = '0';
      const step = (now) => {
        if (t0 === null) t0 = now;
        const k = Math.min(1, (now - t0) / duration);
        node.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 3))));
        if (k < 1) window.requestAnimationFrame(step);
        else delete node.dataset.animating;
      };
      window.setTimeout(() => window.requestAnimationFrame(step), 350);
    });
  }

  /* ======================================================================
     17. Language switching (instant, no reload, remembered)
     ====================================================================== */
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
    renderProducts();
    renderCart();
    renderDeal();
    renderGallery();
    renderBank();
    renderVideos();
    refreshFormText();
    if (Overlay.current === el.quickView && qvId) renderQuickView();
    if (Overlay.current === el.searchOverlay) renderSearch();
    if (Overlay.current === el.lightbox) renderLightbox();
    if (Overlay.current === el.creditsModal) renderCredits();
    if (Overlay.current === el.videoModal) renderVideoMeta();
    if (el.toast.classList.contains('is-show')) hideToast();

    if (o.save !== false) storage.set('volt.lang', state.lang);
    if (o.announce) announce(t('lang.switched'));
  }

  /* ---------- Screen-reader announcements ---------- */
  let announceTimer = null;
  function announce(msg) {
    el.liveRegion.textContent = '';
    window.clearTimeout(announceTimer);
    announceTimer = window.setTimeout(() => { el.liveRegion.textContent = plain(msg); }, 80);
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
      if (shop) { e.preventDefault(); scrollToResults(); return; }

      const clear = tgt.closest('[data-clear-filters]');
      if (clear) { clearFilters(); if (el.shopSearch) el.shopSearch.focus({ preventScroll: true }); return; }

      const chip = tgt.closest('[data-chip-type]');
      if (chip) { removeChip(chip.dataset.chipType, chip.dataset.chipValue); el.shopSearch.focus({ preventScroll: true }); return; }

      const gFilter = tgt.closest('[data-gallery-filter]');
      if (gFilter) { state.gFilter = gFilter.dataset.galleryFilter; state.gShown = GALLERY_PAGE; renderGallery(); return; }

      const gItem = tgt.closest('[data-lb-index]');
      if (gItem) { openLightbox(Number(gItem.dataset.lbIndex), gItem); return; }

      const vBtn = tgt.closest('[data-video]');
      if (vBtn) { openVideo(vBtn.dataset.video, vBtn); return; }

      const creditsBtn = tgt.closest('[data-open-credits]');
      if (creditsBtn) { renderCredits(); Overlay.open(el.creditsModal, { trigger: creditsBtn }); return; }

      const copyBtn = tgt.closest('[data-copy]');
      if (copyBtn) { onCopy(copyBtn); return; }

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
      const logo = $('.logo');
      if (logo) logo.focus({ preventScroll: true });
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
      else if (f.name === 'scale') toggleSet(state.f.scales, f.value, f.checked);
      else if (f.name === 'brand') toggleSet(state.f.brands, f.value, f.checked);
      else if (f.name === 'level') toggleSet(state.f.levels, f.value, f.checked);
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
      const thumb = e.target.closest('[data-qv-img]');
      if (thumb) { setQvImage(Number(thumb.dataset.qvImg)); return; }
      if (e.target.closest('[data-qv-dec]')) { qvQty = Math.max(1, qvQty - 1); updateQvQty(); }
      else if (e.target.closest('[data-qv-inc]')) { qvQty = Math.min(Math.max(1, maxQty(p)), qvQty + 1); updateQvQty(); }
      else {
        const addBtn = e.target.closest('[data-qv-add]');
        if (addBtn) addToCart(qvId, qvQty, addBtn);
      }
    });

    // Inquiry list controls
    el.cartLines.addEventListener('click', (e) => {
      const inc = e.target.closest('[data-cart-inc]');
      const dec = e.target.closest('[data-cart-dec]');
      const rm = e.target.closest('[data-cart-remove]');
      if (inc) changeQty(inc.dataset.cartInc, 1);
      else if (dec) changeQty(dec.dataset.cartDec, -1);
      else if (rm) removeLine(rm.dataset.cartRemove);
    });
    el.checkoutBtn.addEventListener('click', listToContact);

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

    // Featured product
    el.dealAdd.addEventListener('click', () => { if (FEATURED) addToCart(FEATURED.productId, 1, el.dealAdd); });
    el.dealDetails.addEventListener('click', () => { if (FEATURED) openQuickView(FEATURED.productId, el.dealDetails); });

    // Gallery + lightbox
    el.galleryMore.addEventListener('click', galleryMore);
    el.lbPrev.addEventListener('click', () => lbGo(-1));
    el.lbNext.addEventListener('click', () => lbGo(1));
    initLightboxGestures();

    // Broken images → hide <img>, reveal the styled fallback behind it
    doc.addEventListener('error', (e) => {
      const img = e.target;
      if (img && img.tagName === 'IMG') img.classList.add('is-broken');
    }, true);

    // Keep the inquiry list in sync across tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'volt.cart') { state.cart = loadCart(); renderCart(); }
    });
  }

  function init() {
    initTicker();
    wireEvents();
    initForms();
    setLang(state.lang, { save: false });
    initScrollSpy();
    initTilt();
    initReveal();
    initCountUp();
    onScroll();
    root.classList.add('is-ready');
    // Shared link such as #shop?level=beginner → open the same filtered view
    window.setTimeout(() => applyHashFilters(true), 60);
    window.addEventListener('hashchange', () => applyHashFilters(false));
  }

  init();
})();
