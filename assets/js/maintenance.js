/* ==========================================================================
   RC World Egypt — Maintenance section (self-contained)
   --------------------------------------------------------------------------
   • index.html holds an empty placeholder:
       <section class="section maintenance" id="maintenance" aria-labelledby="maintTitle"></section>
     This script (loaded with defer, after main.js) renders the whole section
     into it from its own bilingual data below.
   • main.js switches language by setting <html lang/dir> and fires no event,
     so a MutationObserver on <html lang> re-renders the section.
   • Any element with data-maint-i18n="nav" | "footer" (the nav, mobile-nav
     and footer links that point to #maintenance) gets its label from here
     too, so i18n.js needs no new keys.
   • Optional: data-num="08" on the <section> shows a numbered eyebrow tag
     like the other sections; without it the eyebrow shows a wrench icon.
   • BIDI: English names inside Arabic strings are wrapped in <bdi>, and no
     Arabic prefix letter is ever glued to a Latin word.
   • No prices, durations or warranty promises — by design.
   ========================================================================== */
(function () {
  'use strict';

  const doc = document;
  const root = doc.documentElement;

  const WA_NUMBER = '201009000193';
  const TEL_HREF = 'tel:+201003130449';
  const IMG = 'assets/img/shop/';

  /* ------------------------------------------------------------------------
     Copy (trusted markup: only <bdi> is used)
     ------------------------------------------------------------------------ */
  const DATA = {
    ar: {
      nav: 'الصيانة',
      footer: 'خدمات الصيانة',
      eyebrow: 'خدمات الصيانة',
      title: 'صيانة لكل أنواع عربيات الريموت كنترول',
      intro: 'من التنظيف والتطويرات لحد صيانة موتورات البنزين والنيترو — بنرجّع عربيتك تجري زي الأول وأحسن.',
      collageAlt: 'شاسيه باجا بنزين من غير البودي',
      chipsLabel: 'أبرز خدمات الصيانة',
      chips: [
        'صيانة وتنظيف كاملة',
        'تطويرات وقطع <bdi>Upgrade</bdi>',
        'تركيب إضاءة <bdi>LED</bdi>',
        'تغيير كاوتش وجنوط',
        'صيانة وضبط الكاربراتير',
        'إصلاح الإستارتر'
      ],
      groups: [
        {
          title: 'عربيات كهرباء',
          items: [
            'تغيير رولمان بلي',
            'صيانة المساعدين وتغيير الزيت',
            'صيانة وتزييت الدفرنس',
            'تغيير التروس وضبط التعشيق',
            'تركيب وضبط السيرفو',
            'تركيب وبرمجة الموتور والاسبيد كنترول',
            'ربط وضبط الريموت',
            'تركيب وتلحيم أفياش البطاريات',
            'فحص بطاريات الليبو',
            'عزل الإلكترونيات ضد المياه'
          ]
        },
        {
          title: 'موتورات بنزين ونيترو',
          items: [
            'تنظيف وضبط الكاربراتير',
            'إصلاح وتغيير الإستارتر',
            'صيانة الكلتش وجرس الكلتش',
            'تغيير البوجيه (بنزين أو جلو)',
            'تنظيف وتغيير فلتر الهوا',
            'تغيير خراطيم وتنك البنزين',
            'ضبط وتظبيط الموتور — لموتورات <bdi>Zenoah</bdi> و <bdi>DDM</bdi> و <bdi>Rovan</bdi> وغيرها'
          ]
        },
        {
          title: 'ضبط وتطويرات',
          items: [
            'تركيب قطع الـ <bdi>Upgrade</bdi>',
            'ضبط العفشة (<bdi>Camber</bdi> / <bdi>Toe</bdi> / الارتفاع)',
            'تغيير وتركيب كاوتش وجنوط',
            'تركيب إضاءة <bdi>LED</bdi>',
            'تركيب وتظبيط البودي',
            'فحص شامل وتنظيف كامل للعربية'
          ]
        },
        {
          title: 'طيارات ومحركات',
          items: [
            'صيانة وضبط موتورات الجلو',
            'إصلاح السيرفوهات والوصلات',
            'تركيب وضبط المراوح والسبينر'
          ]
        }
      ],
      stepsLabel: 'خطوات حجز الصيانة',
      steps: [
        'ابعتلنا صورة أو فيديو للمشكلة على واتساب',
        'نتفق على المطلوب',
        'صيانة على إيد متخصصين'
      ],
      cta: 'احجز صيانة على واتساب',
      call: 'اتصل بنا',
      newTab: '(يفتح في صفحة جديدة)',
      // U+2068/U+2069 isolate the Latin store name, like main.js does for WhatsApp text
      waMsg: 'مرحبًا ⁨RC World Egypt⁩، عايز أحجز صيانة لعربية: '
    },
    en: {
      nav: 'Maintenance',
      footer: 'Maintenance service',
      eyebrow: 'Maintenance',
      title: 'Service for every kind of RC car',
      intro: 'From cleaning and upgrades to petrol and nitro engine work — we get your car running like new, or better.',
      collageAlt: 'A petrol Baja chassis with the body off',
      chipsLabel: 'Service highlights',
      chips: [
        'Full maintenance &amp; cleaning',
        'Upgrades',
        'LED light installation',
        'Tires &amp; rims replacement',
        'Carburettor service &amp; tuning',
        'Pull-starter repair'
      ],
      groups: [
        {
          title: 'Electric cars',
          items: [
            'Bearing replacement',
            'Shock rebuild &amp; oil change',
            'Differential service',
            'Gear replacement &amp; mesh setup',
            'Servo installation &amp; centering',
            'Motor &amp; ESC install and programming',
            'Radio binding &amp; setup',
            'Battery connectors &amp; soldering',
            'LiPo battery check',
            'Electronics waterproofing'
          ]
        },
        {
          title: 'Petrol &amp; nitro engines',
          items: [
            'Carburettor cleaning &amp; tuning',
            'Pull-starter repair/replacement',
            'Clutch &amp; clutch bell service',
            'Spark/glow plug replacement',
            'Air filter cleaning/replacement',
            'Fuel lines &amp; tank',
            'Engine tune-up — Zenoah, DDM, Rovan and more'
          ]
        },
        {
          title: 'Setup &amp; upgrades',
          items: [
            'Upgrade parts installation',
            'Suspension setup (camber / toe / ride height)',
            'Tires &amp; rims replacement',
            'LED light kits',
            'Body fitting &amp; mounting',
            'Full inspection &amp; deep cleaning'
          ]
        },
        {
          title: 'Planes &amp; engines',
          items: [
            'Glow engine service &amp; tuning',
            'Servo &amp; linkage repair',
            'Propeller &amp; spinner fitting'
          ]
        }
      ],
      stepsLabel: 'How to book a service',
      steps: [
        'Send us a photo or video of the issue on WhatsApp',
        'We agree on what’s needed',
        'Serviced by specialists'
      ],
      cta: 'Book a service on WhatsApp',
      call: 'Call us',
      newTab: '(opens in a new tab)',
      waMsg: 'Hello RC World Egypt, I’d like to book a service for my: '
    }
  };

  /* ------------------------------------------------------------------------
     Owner's photos (thumb + full). pos = object-position for the crop;
     trim = extra image height hidden at the bottom (e.g. a phone watermark).
     ------------------------------------------------------------------------ */
  const photo = (id, w, h, fw, fh, pos, trim) => ({ id, w, h, fw, fh, pos, trim });
  const COLLAGE = [
    photo('baja-123', 600, 450, 1280, 960, '50% 60%'),   // petrol Baja chassis (main)
    photo('parts-n11', 338, 600, 788, 1400, '50% 36%'),  // Zenoah engine with carb
    photo('parts-n08', 338, 600, 788, 1400, '50% 30%'),  // DDM pull-start engine
    photo('planes-137', 450, 600, 960, 1280, '50% 50%')  // hex drivers
  ];
  // One photo per group card, same order as DATA.*.groups
  const GROUPS = [
    { key: 'electric', icon: 'electric', img: photo('planes-135', 600, 450, 1280, 960, '50% 50%') },
    { key: 'engines', icon: 'engine', img: photo('parts-n05', 338, 600, 788, 1400, '50% 34%') },
    { key: 'setup', icon: 'setup', img: photo('baja-125', 600, 450, 1280, 960, '50% 58%') },
    { key: 'planes', icon: 'plane', img: photo('planes-pe13', 600, 450, 1400, 1050, '50% 40%', '18%') }
  ];
  const CHIP_ICONS = ['clean', 'upgrade', 'led', 'wheel', 'carb', 'starter'];
  const STEP_ICONS = ['whatsapp', 'agree', 'wrench'];

  /* ------------------------------------------------------------------------
     Line icons (24×24, same stroke style as the site sprite)
     ------------------------------------------------------------------------ */
  const LINE = '<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">';
  const ICONS = {
    wrench: LINE + '<path d="M14.7 6.3a4.2 4.2 0 0 0-5.3 5.3L3.8 17.2a1.9 1.9 0 0 0 2.7 2.7l5.6-5.6a4.2 4.2 0 0 0 5.3-5.3l-2.6 2.6-2.4-.3-.3-2.4z"/></g>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    phone: LINE + '<path d="M6.6 3.5h2.6l1.4 4.2-2 1.4a11 11 0 0 0 6.3 6.3l1.4-2 4.2 1.4v2.6a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 4.6 5.6a2 2 0 0 1 2-2.1z" stroke-width="1.8"/></g>',
    whatsapp: LINE + '<path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 20.5 11.8z" stroke-width="1.8"/></g>' +
      '<path d="M9.3 7.9c.3-.3.7-.3.9 0l1 1.5c.2.3.1.6-.1.8l-.6.6c.5 1.2 1.5 2.2 2.7 2.7l.6-.6c.2-.2.5-.3.8-.1l1.5 1c.3.2.3.6 0 .9-.7.6-1.6.9-2.5.6-2.4-.7-4.3-2.6-5-5-.2-.9.1-1.8.7-2.4z" fill="currentColor"/>',
    agree: LINE + '<path d="M4 4.5h16A1.5 1.5 0 0 1 21.5 6v9.5A1.5 1.5 0 0 1 20 17h-9.5L6 20.5V17H4a1.5 1.5 0 0 1-1.5-1.5V6A1.5 1.5 0 0 1 4 4.5z"/><path d="m8.5 10.8 2.4 2.4 4.6-4.6" stroke-width="1.9"/></g>',
    // Chips
    clean: LINE + '<path d="M8.6 9h5.8a1 1 0 0 1 1 .9l.6 10a1.5 1.5 0 0 1-1.5 1.6H8.5A1.5 1.5 0 0 1 7 19.9l.6-10a1 1 0 0 1 1-.9z"/><path d="M9.8 9V6.5h3.4V9M8 3.5h6.2l1.8 3H9.8"/><path d="M9.8 5 7 7.8"/><path d="M8.2 14.5h6.6"/></g>' +
      '<circle cx="19.2" cy="3.6" r=".95" fill="currentColor"/><circle cx="21" cy="6.4" r=".95" fill="currentColor"/><circle cx="19.2" cy="9" r=".95" fill="currentColor"/>',
    upgrade: LINE + '<circle cx="12" cy="12" r="9"/><path d="m8 12.2 4-4 4 4M8 16.4l4-4 4 4" stroke-width="1.8"/></g>',
    led: LINE + '<path d="M8.5 14V9.5a3.5 3.5 0 0 1 7 0V14"/><path d="M7 14h10M10.2 14v6.5M13.8 14v4.5"/><path d="M3.2 9.5h2.1M18.7 9.5h2.1M5 3.8l1.5 1.5M19 3.8l-1.5 1.5M12 1.8v.4"/></g>',
    wheel: LINE + '<circle cx="12" cy="12" r="8.6" stroke-width="1.8"/><circle cx="12" cy="12" r="10.4" stroke-width="1.4" stroke-dasharray="1.6 1.7"/><circle cx="12" cy="12" r="4.8"/><path d="M12 7.2v2.9M12 13.9v2.9M7.2 12h2.9M13.9 12h2.9" stroke-width="1.5"/></g>' +
      '<circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
    carb: LINE + '<rect x="3" y="8.5" width="14" height="10" rx="2.2"/><circle cx="10" cy="13.5" r="2.7"/><path d="M6.5 8.5V5M13.5 8.5V4.2M5.2 5h2.6M12.2 4.2h2.6M17 12h3.5M17 15h2"/></g>',
    starter: LINE + '<circle cx="9" cy="8.5" r="5.6"/><circle cx="9" cy="8.5" r="1.9"/><path d="M9 14.1v3.9"/><path d="M5.3 18h7.4a1.6 1.6 0 0 1 0 3.2H5.3a1.6 1.6 0 0 1 0-3.2z"/><path d="M18.6 3.8v11.4M16.2 12.8l2.4 2.4 2.4-2.4" stroke-width="1.8"/></g>',
    // Groups
    electric: LINE + '<path d="M2.8 15.8 4.5 12a2 2 0 0 1 1.8-1.2h8.9a2 2 0 0 1 1.6.8l2.2 3h1a1.6 1.6 0 0 1 1.6 1.6v.4"/><circle cx="7" cy="17" r="2.3"/><circle cx="17" cy="17" r="2.3"/></g>' +
      '<path d="M13.1 1.6 9.2 6.9h2.9l-.9 3.2 4-5.3h-2.9z" fill="currentColor"/>',
    engine: LINE + '<path d="M10.6 2.5h2.8M12 2.5v2.2"/><path d="M8 4.7h8v10.5a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z"/><path d="M5 7.6h14M5 10.6h14M5.8 13.6h12.4"/><path d="M6.5 17.2h11v3.2a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1z"/></g>',
    setup: LINE + '<path d="M6 3.5v8.3M6 16.2v4.3M12 3.5v2.3M12 10.2v10.3M18 3.5v9.3M18 17.2v3.3"/><circle cx="6" cy="14" r="2.2"/><circle cx="12" cy="8" r="2.2"/><circle cx="18" cy="15" r="2.2"/></g>',
    plane: LINE + '<path d="M12 2.5c.8 0 1.4.9 1.4 2v4.6l7.6 4.4v2.3l-7.6-2.4v4.7l2.3 1.8v1.6L12 20.6l-3.7.9v-1.6l2.3-1.8v-4.7L3 15.8v-2.3l7.6-4.4V4.5c0-1.1.6-2 1.4-2z" stroke-width="1.6"/></g>'
  };

  const svg = (name, cls) =>
    '<svg class="icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + ICONS[name] + '</svg>';

  /** Plain text: <bdi>x</bdi> → U+2068 x U+2069 (the site's convention outside HTML), tags dropped. */
  const plain = (html) => String(html)
    .replace(/<bdi>/g, '⁨').replace(/<\/bdi>/g, '⁩')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&');
  /** Attribute-safe version of plain(). */
  const attr = (html) => plain(html).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const imgTag = (p, sizes, alt, eager) =>
    '<img src="' + IMG + 'thumb/' + p.id + '.jpg"' +
    ' srcset="' + IMG + 'thumb/' + p.id + '.jpg ' + p.w + 'w, ' + IMG + 'full/' + p.id + '.jpg ' + p.fw + 'w"' +
    ' sizes="' + sizes + '" width="' + p.w + '" height="' + p.h + '"' +
    (eager ? '' : ' loading="lazy"') + ' decoding="async"' +
    ' style="--pos:' + p.pos + (p.trim ? ';--trim:' + p.trim : '') + '" alt="' + attr(alt || '') + '">';

  /* ------------------------------------------------------------------------
     State
     ------------------------------------------------------------------------ */
  const section = doc.getElementById('maintenance');
  const reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  const revealed = new Set();   // reveal keys already shown — not re-animated after a language switch
  let revealIO = null;
  let renderedLang = null;

  const currentLang = () => (root.lang === 'en' ? 'en' : 'ar');

  /** data-reveal attributes (skipped for blocks already revealed). */
  function rv(key, delay) {
    if (revealed.has(key)) return ' data-mkey="' + key + '"';
    return ' data-reveal data-mkey="' + key + '"' + (delay ? ' style="--d:' + delay + '"' : '');
  }

  /* ------------------------------------------------------------------------
     Render
     ------------------------------------------------------------------------ */
  function render() {
    const lang = currentLang();
    const d = DATA[lang];
    renderedLang = lang;

    translateLinks(d);
    if (!section) return;

    const num = section.getAttribute('data-num');
    const eyebrowLead = num
      ? '<span class="eyebrow__num">' + attr(num) + '</span>'
      : svg('wrench');

    const waHref = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(d.waMsg);

    const collage = COLLAGE.map((p, i) => (
      '<figure class="maint__shot' + (i === 0 ? ' maint__shot--main' : '') + '"' + (i === 0 ? '' : ' aria-hidden="true"') + '>' +
        imgTag(p, i === 0 ? '(min-width: 1024px) 640px, 92vw' : '(min-width: 1024px) 210px, 31vw', i === 0 ? d.collageAlt : '') +
      '</figure>'
    )).join('');

    const chips = d.chips.map((label, i) => (
      '<li class="maint-chip"' + rv('chip' + i, i % 6) + '>' +
        '<span class="maint-chip__icon" aria-hidden="true">' + svg(CHIP_ICONS[i]) + '</span>' +
        '<span class="maint-chip__label">' + label + '</span>' +
      '</li>'
    )).join('');

    const cards = d.groups.map((g, i) => {
      const meta = GROUPS[i];
      const items = g.items.map((it) => '<li>' + svg('check') + '<span>' + it + '</span></li>').join('');
      return (
        '<li class="maint-card maint-card--' + meta.key + '"' + rv('card' + i, i) + '>' +
          '<div class="maint-card__head">' +
            '<span class="maint-card__icon" aria-hidden="true">' + svg(meta.icon) + '</span>' +
            '<h3 class="maint-card__title">' + g.title + '</h3>' +
          '</div>' +
          '<ul class="maint-card__list">' + items + '</ul>' +
          '<figure class="maint-card__media" aria-hidden="true">' +
            imgTag(meta.img, '(min-width: 1200px) 300px, (min-width: 640px) 46vw, 92vw', '') +
          '</figure>' +
        '</li>'
      );
    }).join('');

    const steps = d.steps.map((s, i) => (
      '<li class="maint-step maint-step--' + STEP_ICONS[i] + '">' +
        '<span class="maint-step__num" aria-hidden="true">0' + (i + 1) + '</span>' +
        '<span class="maint-step__icon" aria-hidden="true">' + svg(STEP_ICONS[i]) + '</span>' +
        '<span class="maint-step__text">' + s + '</span>' +
      '</li>'
    )).join('');

    section.innerHTML =
      '<div class="container">' +
        '<div class="maint__intro">' +
          '<header class="section-head maint__head"' + rv('head') + '>' +
            '<p class="eyebrow">' + eyebrowLead + '<span>' + d.eyebrow + '</span></p>' +
            '<h2 class="section-title" id="maintTitle">' + d.title + '</h2>' +
            '<p class="section-sub">' + d.intro + '</p>' +
          '</header>' +
          '<div class="maint__collage"' + rv('collage', 1) + '>' + collage + '</div>' +
        '</div>' +
        '<ul class="maint__chips" aria-label="' + attr(d.chipsLabel) + '">' + chips + '</ul>' +
        '<ul class="maint__groups">' + cards + '</ul>' +
        '<div class="maint__book"' + rv('book') + '>' +
          '<ol class="maint__steps" aria-label="' + attr(d.stepsLabel) + '">' + steps + '</ol>' +
          '<div class="maint__cta">' +
            '<a class="btn btn--wa btn--skew btn--lg" href="' + attr(waHref) + '" target="_blank" rel="noopener">' +
              svg('whatsapp') + '<span>' + d.cta + '</span>' +
              '<span class="sr-only">' + d.newTab + '</span>' +
            '</a>' +
            '<a class="btn btn--ghost btn--skew btn--lg" href="' + TEL_HREF + '">' +
              svg('phone') + '<span>' + d.call + '</span>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';

    observeReveal();
  }

  /** Labels for the links that point to this section (nav, mobile nav, footer). */
  function translateLinks(d) {
    doc.querySelectorAll('[data-maint-i18n]').forEach((node) => {
      const key = node.getAttribute('data-maint-i18n');
      if (d[key]) node.textContent = plain(d[key]);
    });
  }

  /* ------------------------------------------------------------------------
     Scroll reveal (main.js only observes [data-reveal] present at its init,
     so this section runs its own observer with the same CSS hooks).
     ------------------------------------------------------------------------ */
  function observeReveal() {
    if (revealIO) { revealIO.disconnect(); revealIO = null; }
    const items = section.querySelectorAll('[data-reveal][data-mkey]');
    if (!items.length) return;
    const show = (n) => { n.classList.add('is-in'); revealed.add(n.getAttribute('data-mkey')); };
    if (!('IntersectionObserver' in window) || reduceMotion.matches) {
      items.forEach(show);
      return;
    }
    revealIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        revealIO.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach((n) => revealIO.observe(n));
  }

  /* ------------------------------------------------------------------------
     Scroll spy: highlight links to #maintenance while the section is in view.
     main.js's own spy clears it again when another tracked section enters.
     ------------------------------------------------------------------------ */
  function initSpy() {
    if (!section || !('IntersectionObserver' in window)) return;
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        doc.querySelectorAll('.nav__link, .mnav a').forEach((a) => {
          const on = a.getAttribute('href') === '#maintenance';
          a.classList.toggle('is-active', on);
          if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spy.observe(section);
  }

  /* ------------------------------------------------------------------------
     Language watcher
     ------------------------------------------------------------------------ */
  function watchLang() {
    if (!('MutationObserver' in window)) return;
    new MutationObserver(() => {
      if (currentLang() !== renderedLang) render();
    }).observe(root, { attributes: true, attributeFilter: ['lang'] });
  }

  function init() {
    render();
    initSpy();
    watchLang();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
