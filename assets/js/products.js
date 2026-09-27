/* ==========================================================================
   RC World Egypt — Product catalogue
   --------------------------------------------------------------------------
   Plain global data (no modules) so the site works from file://.
   (window.VOLT_* are internal identifiers only — never shown to visitors.)

   CATALOGUE: models Hamdy posts in the RC World Egypt Facebook group, using
   his own naming. Real photos come from window.SHOP_PHOTOS (photos.js):
     • photos: ['<cat>-<id>', …] — the first key is the card image; all keys
       appear as quick-view thumbnails.
     • The foam trainer planes have no real photos yet, so they keep ILLUSTRATIVE
       stock photos (images: [...]) and the UI labels them
       "صورة توضيحية / Illustrative photo".
     • No prices on the site (price: null) — Hamdy confirms price and availability.
     • Specs are well-known type facts only (scale, petrol / electric / nitro,
       drive, cell count when it is part of the model name). No speeds, no
       prices, no invented numbers.

   Product shape:
     id, model (English, both languages), brands [..], name_ar / name_en
     (descriptor), desc_ar / desc_en, category (baja | offroad | planes |
     drift | parts), scales [..], level, featured (sort weight), inStock,
     price (null), specs, tags, photos [..] | images [{ src, thumb }]
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Stock image helper (foam trainers only; URLs verified HTTP 200) ---------- */
  var P = function (id) {
    var base = 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=';
    return { src: base + '1200', thumb: base + '600' };
  };
  /* Photo key range helper: range('baja', 23, 27) -> ['baja-023', … 'baja-027'] */
  var range = function (cat, from, to) {
    var out = [];
    for (var i = from; i <= to; i++) out.push(cat + '-' + ('00' + i).slice(-3));
    return out;
  };

  /* ---------- Categories (order = display order) ---------- */
  window.VOLT_CATEGORIES = [
    { id: 'baja' },
    { id: 'offroad' },
    { id: 'planes' },
    { id: 'drift' },
    { id: 'parts' }
  ];

  /* ---------- Brands the shop deals in (shown as text only — no logos) ---------- */
  window.VOLT_BRANDS = ['Losi', 'Arrma', 'Traxxas', 'HPI', 'Rovan', 'King Motor', 'FG', 'Rofun', 'MST', 'HSP', 'Xray', 'Kyosho', 'Thunder Tiger'];

  var PETROL = { ar: 'بنزين', en: 'Petrol' };
  var ELECTRIC = { ar: 'كهربائي', en: 'Electric' };
  var EPO = { ar: 'فوم EPO متين', en: 'Tough EPO foam' };
  var ASK = { ar: 'اسأل عن الموديلات المتاحة', en: 'Ask for available models' };
  var CONTACT_AR = ' تواصل مع حمدي لمعرفة السعر والتوفر.';
  var CONTACT_EN = ' Contact Hamdy for price and availability.';

  /* ---------- Products ---------- */
  window.VOLT_PRODUCTS = [
    /* ===== Baja & 1/5 ===== */
    {
      id: 'losi-5ive-t-3', model: 'Losi 5IVE-T 3.0', brands: ['Losi'],
      name_ar: 'شاحنة 1/5 بمحرك بنزين ودفع رباعي', name_en: '1/5 Petrol 4WD Truck',
      desc_ar: 'شاحنة كبيرة بمقاس 1/5 بمحرك بنزين ودفع رباعي للرمال والطرق الوعرة.' + CONTACT_AR,
      desc_en: 'A big 1/5-scale petrol truck with four-wheel drive for sand and rough ground.' + CONTACT_EN,
      category: 'baja', scales: ['1/5'], level: 'pro', featured: 100, inStock: true, price: null,
      specs: { power: PETROL, drive: '4WD' },
      tags: ['losi', '5ive', 'five-t', '12s', 'baja', 'petrol', 'باجا', 'بنزين', 'لوسي'],
      photos: ['baja-008', 'baja-009', 'shop-010', 'shop-011', 'shop-007']
    },
    {
      id: 'fg-15-buggy', model: 'FG 1/5 Buggy', brands: ['FG'],
      name_ar: 'باجي 1/5 بمحرك بنزين', name_en: '1/5 Petrol Buggy',
      desc_ar: 'باجي كبير بمقاس 1/5 يعمل بالبنزين من FG.' + CONTACT_AR,
      desc_en: 'A large 1/5-scale petrol buggy from FG.' + CONTACT_EN,
      category: 'baja', scales: ['1/5'], level: 'pro', featured: 97, inStock: true, price: null,
      specs: { power: PETROL },
      tags: ['fg', 'buggy', 'petrol', 'باجي', 'بنزين'],
      photos: range('baja', 23, 27)
    },
    {
      id: 'fg-baja-beetle', model: 'FG Baja Beetle 1/5', brands: ['FG'],
      name_ar: 'سيارة باجا 1/5 بمحرك بنزين', name_en: '1/5 Petrol Baja Car',
      desc_ar: 'سيارة باجا بمقاس 1/5 تعمل بالبنزين من FG.' + CONTACT_AR,
      desc_en: 'A 1/5-scale petrol Baja car from FG.' + CONTACT_EN,
      category: 'baja', scales: ['1/5'], level: 'pro', featured: 95, inStock: true, price: null,
      specs: { power: PETROL },
      tags: ['fg', 'beetle', 'baja', 'petrol', 'باجا', 'بنزين'],
      photos: range('baja', 130, 134)
    },
    {
      id: 'rofun-baja-5t', model: 'Rofun Baja 5T 1/5 32cc', brands: ['Rofun'],
      name_ar: 'شاحنة باجا 1/5 بمحرك بنزين 32cc', name_en: '1/5 Petrol Baja Truck (32cc)',
      desc_ar: 'شاحنة باجا بمقاس 1/5 بمحرك بنزين سعة 32cc من Rofun.' + CONTACT_AR,
      desc_en: 'A 1/5-scale Baja truck with a 32cc petrol engine, from Rofun.' + CONTACT_EN,
      category: 'baja', scales: ['1/5'], level: 'pro', featured: 93, inStock: true, price: null,
      specs: { power: { ar: 'بنزين 32cc', en: 'Petrol 32cc' } },
      tags: ['rofun', 'baja', '5t', '32cc', 'petrol', 'باجا', 'بنزين'],
      photos: ['baja-210', 'baja-211', 'baja-209', 'baja-212', 'baja-213']
    },
    {
      id: 'fg-16-monster-2wd', model: 'FG 1/6 Monster Truck 2WD', brands: ['FG'],
      name_ar: 'شاحنة مونستر 1/6 بمحرك بنزين ودفع ثنائي', name_en: '1/6 Petrol 2WD Monster Truck',
      desc_ar: 'شاحنة مونستر كبيرة بمقاس 1/6 تعمل بالبنزين بدفع ثنائي من FG.' + CONTACT_AR,
      desc_en: 'A big 1/6-scale petrol monster truck with two-wheel drive, from FG.' + CONTACT_EN,
      category: 'baja', scales: ['1/6'], level: 'pro', featured: 91, inStock: true, price: null,
      specs: { power: PETROL, drive: '2WD' },
      tags: ['fg', 'monster', 'truck', 'petrol', 'مونستر', 'بنزين'],
      photos: range('baja', 214, 218)
    },
    {
      id: 'petrol-chassis-15', model: '1/5 Petrol Chassis', brands: [],
      name_ar: 'شاسيه 1/5 بمحرك بنزين', name_en: '1/5 Petrol Chassis',
      desc_ar: 'شاسيه بمقاس 1/5 بمحرك بنزين — اسأل حمدي عن التفاصيل والموديلات المتوافقة.',
      desc_en: 'A 1/5-scale petrol chassis — ask Hamdy for the details and compatible models.',
      category: 'baja', scales: ['1/5'], level: 'pro', featured: 89, inStock: true, price: null,
      specs: { power: PETROL, version: ASK },
      tags: ['chassis', 'petrol', 'baja', 'شاسيه', 'بنزين'],
      photos: ['baja-121', 'baja-122', 'baja-123', 'baja-125']
    },

    /* ===== Off-road ===== */
    {
      id: 'traxxas-x-maxx-8s', model: 'Traxxas X-Maxx 8S', brands: ['Traxxas'],
      name_ar: 'شاحنة مونستر كهربائية 1/5 بدفع رباعي', name_en: '1/5 Electric 4WD Monster Truck',
      desc_ar: 'شاحنة مونستر كبيرة بمقاس 1/5 كهربائية بدفع رباعي.' + CONTACT_AR,
      desc_en: 'A big 1/5-scale electric monster truck with four-wheel drive.' + CONTACT_EN,
      category: 'offroad', scales: ['1/5'], level: 'pro', featured: 90, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', cells: '8S' },
      tags: ['traxxas', 'x-maxx', 'xmaxx', 'x maxx', 'monster', 'electric', 'مونستر', 'تراكساس'],
      photos: ['offroad-194', 'offroad-195', 'offroad-197', 'offroad-198', 'offroad-199', 'offroad-201', 'offroad-202', 'offroad-203', 'offroad-012', 'offroad-013', 'offroad-014', 'offroad-015', 'offroad-016']
    },
    {
      id: 'traxxas-maxx-v2', model: 'Traxxas Maxx V2', brands: ['Traxxas'],
      name_ar: 'شاحنة مونستر كهربائية 1/10 بدفع رباعي', name_en: '1/10 Electric 4WD Monster Truck',
      desc_ar: 'شاحنة مونستر بمقاس 1/10 كهربائية بدفع رباعي وبطارية 4S.' + CONTACT_AR,
      desc_en: 'A 1/10-scale electric monster truck with four-wheel drive and 4S power.' + CONTACT_EN,
      category: 'offroad', scales: ['1/10'], level: 'intermediate', featured: 86, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', cells: '4S' },
      tags: ['traxxas', 'maxx', 'monster', 'electric', 'مونستر', 'تراكساس'],
      photos: ['offroad-028', 'offroad-029', 'offroad-031']
    },
    {
      id: 'arrma-mojave-6s', model: 'Arrma Mojave 6S 1/7', brands: ['Arrma'],
      name_ar: 'شاحنة صحراوية كهربائية 1/7 بدفع رباعي', name_en: '1/7 Electric 4WD Desert Truck',
      desc_ar: 'شاحنة صحراوية بمقاس 1/7 كهربائية بدفع رباعي.' + CONTACT_AR,
      desc_en: 'A 1/7-scale electric desert truck with four-wheel drive.' + CONTACT_EN,
      category: 'offroad', scales: ['1/7'], level: 'pro', featured: 84, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', cells: '6S' },
      tags: ['arrma', 'mojave', 'desert', 'electric', 'أرما', 'صحراء'],
      photos: range('offroad', 98, 101)
    },
    {
      id: 'arrma-mojave-exb', model: 'Arrma Mojave EXB 1/7', brands: ['Arrma'],
      name_ar: 'شاحنة صحراوية كهربائية 1/7 بدفع رباعي — نسخة EXB', name_en: '1/7 Electric 4WD Desert Truck (EXB)',
      desc_ar: 'نسخة EXB من شاحنة الصحراء بمقاس 1/7 الكهربائية بدفع رباعي.' + CONTACT_AR,
      desc_en: 'The EXB version of the 1/7-scale electric four-wheel-drive desert truck.' + CONTACT_EN,
      category: 'offroad', scales: ['1/7'], level: 'pro', featured: 83, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD' },
      tags: ['arrma', 'mojave', 'exb', 'desert', 'electric', 'أرما', 'صحراء'],
      photos: range('offroad', 167, 171)
    },
    {
      id: 'arrma-kraton-6s-v6', model: 'Arrma Kraton 6S v6 1/8', brands: ['Arrma'],
      name_ar: 'تراغي 1/8 كهربائية بدفع رباعي', name_en: '1/8 Electric 4WD Truggy',
      desc_ar: 'تراغي بمقاس 1/8 كهربائية بدفع رباعي — مزيج بين الباجي والشاحنة.' + CONTACT_AR,
      desc_en: 'A 1/8-scale electric truggy with four-wheel drive — a mix of buggy and truck.' + CONTACT_EN,
      category: 'offroad', scales: ['1/8'], level: 'pro', featured: 82, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', cells: '6S' },
      tags: ['arrma', 'kraton', 'truggy', 'electric', 'أرما', 'تراغي'],
      photos: ['offroad-103', 'offroad-105', 'offroad-229', 'offroad-230']
    },
    {
      id: 'arrma-talion-exb-6s', model: 'Arrma Talion EXB 6S 1/7', brands: ['Arrma'],
      name_ar: 'تراغي 1/7 كهربائية بدفع رباعي', name_en: '1/7 Electric 4WD Truggy',
      desc_ar: 'تراغي بمقاس 1/7 كهربائية بدفع رباعي للطرق الوعرة.' + CONTACT_AR,
      desc_en: 'A 1/7-scale electric truggy with four-wheel drive for rough ground.' + CONTACT_EN,
      category: 'offroad', scales: ['1/7'], level: 'pro', featured: 81, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', cells: '6S' },
      tags: ['arrma', 'talion', 'exb', 'truggy', 'electric', 'أرما', 'تراغي'],
      photos: ['offroad-017']
    },
    {
      id: 'arrma-typhon-grom', model: 'Arrma Typhon Grom', brands: ['Arrma'],
      name_ar: 'باجي صغير 1/18 كهربائي بدفع رباعي', name_en: '1/18 Electric 4WD Mini Buggy',
      desc_ar: 'باجي صغير بمقاس 1/18 كهربائي بدفع رباعي — حجم صغير ومتعة كبيرة.' + CONTACT_AR,
      desc_en: 'A small 1/18-scale electric four-wheel-drive buggy — small size, big fun.' + CONTACT_EN,
      category: 'offroad', scales: ['1/18'], level: 'beginner', featured: 78, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD' },
      tags: ['arrma', 'typhon', 'grom', 'mini', 'buggy', 'أرما', 'باجي'],
      photos: ['offroad-234', 'offroad-235', 'offroad-237']
    },
    {
      id: 'traxxas-e-revo-116', model: 'Traxxas E-Revo 1/16', brands: ['Traxxas'],
      name_ar: 'شاحنة مونستر صغيرة 1/16 كهربائية بدفع رباعي', name_en: '1/16 Electric 4WD Mini Monster Truck',
      desc_ar: 'شاحنة مونستر صغيرة بمقاس 1/16 كهربائية بدفع رباعي.' + CONTACT_AR,
      desc_en: 'A small 1/16-scale electric four-wheel-drive monster truck.' + CONTACT_EN,
      category: 'offroad', scales: ['1/16'], level: 'beginner', featured: 77, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD' },
      tags: ['traxxas', 'e-revo', 'erevo', 'e revo', 'mini', 'monster', 'مونستر', 'تراكساس'],
      photos: range('offroad', 150, 154)
    },
    {
      id: 'traxxas-e-revo-6s', model: 'Traxxas E-Revo 6S', brands: ['Traxxas'],
      name_ar: 'شاحنة مونستر كهربائية بدفع رباعي', name_en: 'Electric 4WD Monster Truck',
      desc_ar: 'شاحنة مونستر كهربائية بدفع رباعي وبطارية 6S.' + CONTACT_AR,
      desc_en: 'An electric four-wheel-drive monster truck with 6S power.' + CONTACT_EN,
      category: 'offroad', scales: [], level: 'pro', featured: 76, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', cells: '6S' },
      tags: ['traxxas', 'e-revo', 'erevo', 'e revo', 'monster', 'مونستر', 'تراكساس'],
      photos: range('offroad', 186, 188)
    },
    {
      id: 'traxxas-desert-truck-fox', model: 'Traxxas Desert Truck (Fox body)', brands: ['Traxxas'],
      name_ar: 'شاحنة صحراوية بهيكل Fox', name_en: 'Desert Truck with Fox Body',
      desc_ar: 'شاحنة صحراوية من Traxxas بهيكل Fox — اسأل حمدي عن النسخة المتاحة.',
      desc_en: 'A Traxxas desert truck with a Fox body — ask Hamdy about the version available.',
      category: 'offroad', scales: [], level: 'pro', featured: 75, inStock: true, price: null,
      specs: { version: ASK },
      tags: ['traxxas', 'desert', 'fox', 'truck', 'صحراء', 'تراكساس'],
      photos: range('offroad', 155, 158)
    },
    {
      id: 'losi-promoto-mx', model: 'Losi Promoto-MX 1/4 Motorcycle', brands: ['Losi'],
      name_ar: 'دراجة موتوكروس 1/4 كهربائية جاهزة للتشغيل', name_en: '1/4 Electric Motocross Bike, RTR',
      desc_ar: 'دراجة موتوكروس بمقاس 1/4 كهربائية، جاهزة للتشغيل مع البطارية والشاحن.' + CONTACT_AR,
      desc_en: 'A 1/4-scale electric motocross bike, ready to run with battery and charger.' + CONTACT_EN,
      category: 'offroad', scales: ['1/4'], level: 'intermediate', featured: 74, inStock: true, price: null,
      specs: { power: ELECTRIC, version: { ar: 'جاهزة للتشغيل مع البطارية والشاحن', en: 'RTR with battery & charger' } },
      tags: ['losi', 'promoto', 'motorcycle', 'bike', 'motocross', 'دراجة', 'موتوسيكل'],
      photos: ['offroad-219', 'offroad-220', 'offroad-222']
    },
    {
      id: 'savage-maxx-bodies', model: 'HPI Savage & Traxxas Maxx Bodies', brands: ['HPI', 'Traxxas'],
      name_ar: 'هياكل لشاحنات المونستر', name_en: 'Monster Truck Bodies',
      desc_ar: 'هياكل لشاحنات المونستر من HPI Savage أو Traxxas Maxx — اسأل عن الأشكال والألوان المتاحة.',
      desc_en: 'Bodies for HPI Savage and Traxxas Maxx monster trucks — ask about the shapes and colours available.',
      category: 'offroad', scales: [], level: 'intermediate', featured: 60, inStock: true, price: null,
      specs: { compat: { ar: 'HPI Savage · Traxxas Maxx', en: 'HPI Savage · Traxxas Maxx' } },
      tags: ['body', 'bodies', 'savage', 'maxx', 'hpi', 'traxxas', 'هيكل', 'بودي'],
      photos: range('offroad', 18, 22)
    },

    /* ===== Planes ===== */
    {
      id: 'foam-trainer-3ch', model: 'Foam Trainer 3CH', brands: [],
      name_ar: 'طائرة تدريب من الفوم — 3 قنوات', name_en: '3-Channel Foam Trainer',
      desc_ar: 'طائرة تدريب بجناح علوي مصنوعة من فوم EPO المتين، تتحمل الصدمات ومناسبة لأول طيران.',
      desc_en: 'A high-wing trainer made of tough EPO foam — crash-resistant and ideal for your first flights.',
      category: 'planes', scales: [], level: 'beginner', featured: 72, inStock: true, price: null,
      specs: { build: EPO, channels: '3CH', wing: { ar: 'جناح علوي', en: 'High wing' } },
      tags: ['plane', 'trainer', 'foam', 'epo', 'طائرة', 'فوم', 'تدريب'],
      images: [P('3841145'), P('38551472')]
    },
    {
      id: 'foam-trainer-4ch-gyro', model: 'Foam Trainer 4CH + Gyro', brands: [],
      name_ar: 'طائرة تدريب من الفوم — 4 قنوات مع جايرو', name_en: '4-Channel Foam Trainer with Gyro',
      desc_ar: 'طائرة تدريب من فوم EPO بأربع قنوات مع جايرو يساعد على ثبات الطيران — خطوة تالية بعد طائرات الثلاث قنوات.',
      desc_en: 'A 4-channel EPO foam trainer with a gyro that helps keep flight steady — the next step after 3-channel trainers.',
      category: 'planes', scales: [], level: 'beginner', featured: 71, inStock: true, price: null,
      specs: { build: EPO, channels: '4CH', extras: { ar: 'جايرو للثبات', en: 'Stabilising gyro' } },
      tags: ['plane', 'trainer', 'foam', 'gyro', 'طائرة', 'فوم', 'جايرو'],
      images: [P('38544886'), P('38544852')]
    },
    {
      id: 'foam-glider-trainer', model: 'Foam Glider Trainer', brands: [],
      name_ar: 'طائرة شراعية للتدريب من الفوم', name_en: 'Foam Glider Trainer',
      desc_ar: 'طائرة شراعية من فوم EPO بجناح طويل وطيران هادئ وبطيء — مناسبة لتعلّم التحكم بسهولة.',
      desc_en: 'An EPO foam glider with long wings and slow, calm flight — easy to learn with.',
      category: 'planes', scales: [], level: 'beginner', featured: 58, inStock: true, price: null,
      specs: { build: EPO, wing: { ar: 'جناح طويل', en: 'Long wing' } },
      tags: ['glider', 'plane', 'foam', 'شراعية', 'طائرة', 'فوم'],
      images: [P('8244925'), P('38544873')]
    },
    {
      id: 'cessna-foam-trainer', model: 'Cessna-style Foam Trainer', brands: [],
      name_ar: 'طائرة تدريب من الفوم بشكل الطائرات الخفيفة', name_en: 'Light-aircraft Style Foam Trainer',
      desc_ar: 'طائرة تدريب من فوم EPO بشكل الطائرات الخفيفة ذات الجناح العلوي، متينة وسهلة الطيران.',
      desc_en: 'An EPO foam trainer shaped like classic high-wing light aircraft — tough and easy to fly.',
      category: 'planes', scales: [], level: 'beginner', featured: 57, inStock: true, price: null,
      specs: { build: EPO, wing: { ar: 'جناح علوي', en: 'High wing' } },
      tags: ['plane', 'trainer', 'foam', 'طائرة', 'فوم', 'تدريب'],
      images: [P('38544860'), P('11917454')]
    },
    {
      id: 'foam-sport-trainer', model: 'Foam Sport Trainer (aileron)', brands: [],
      name_ar: 'طائرة فوم رياضية بجنيحات تحكم', name_en: 'Foam Sport Trainer with Ailerons',
      desc_ar: 'طائرة من فوم EPO بجنيحات تحكم لحركات أكثر — للطيارين الذين أتقنوا طائرات التدريب.',
      desc_en: 'An EPO foam plane with ailerons for more manoeuvres — for pilots who have mastered trainers.',
      category: 'planes', scales: [], level: 'intermediate', featured: 56, inStock: true, price: null,
      specs: { build: EPO, extras: { ar: 'جنيحات تحكم', en: 'Ailerons' } },
      tags: ['plane', 'sport', 'aileron', 'foam', 'طائرة', 'فوم', 'رياضية'],
      images: [P('38544908'), P('38544873')]
    },
    {
      id: 'plane-engines', model: 'Plane Engines (glow/nitro)', brands: [],
      name_ar: 'محركات طائرات جلو ونيترو', name_en: 'Glow / Nitro Plane Engines',
      desc_ar: 'مجموعة محركات طائرات متاحة — اسأل عن الموديلات.',
      desc_en: 'Selection of plane engines available — ask for models.',
      category: 'planes', scales: [], level: 'pro', featured: 70, inStock: true, price: null,
      specs: { power: { ar: 'جلو / نيترو', en: 'Glow / nitro' }, version: ASK },
      tags: ['engine', 'glow', 'nitro', 'plane', 'محرك', 'محركات', 'نيترو', 'طائرة'],
      photos: range('planes', 39, 43)
    },
    {
      id: 'plane-parts', model: 'RC Plane Parts', brands: [],
      name_ar: 'قطع غيار طائرات', name_en: 'Plane Parts',
      desc_ar: 'قطع غيار لطائرات التحكم عن بعد — أرسل لنا موديل الطائرة والقطعة المطلوبة.',
      desc_en: 'Parts for RC planes — send us your plane model and the part you need.',
      category: 'planes', scales: [], level: 'intermediate', featured: 55, inStock: true, price: null,
      specs: { version: ASK },
      tags: ['plane', 'parts', 'طائرة', 'قطع غيار'],
      photos: range('planes', 44, 48).concat(['planes-087'])
    },
    {
      id: 'plane-accessories', model: 'RC Plane Accessories', brands: [],
      name_ar: 'إكسسوارات وأدوات الطائرات', name_en: 'Plane Accessories & Tools',
      desc_ar: 'إكسسوارات وأدوات لطائرات التحكم عن بعد — اسأل عن المتاح.',
      desc_en: 'Accessories and tools for RC planes — ask what is available.',
      category: 'planes', scales: [], level: 'beginner', featured: 54, inStock: true, price: null,
      specs: { version: ASK },
      tags: ['plane', 'accessories', 'tools', 'طائرة', 'إكسسوارات', 'أدوات'],
      photos: range('planes', 135, 139)
    },

    /* ===== Drift & rally ===== */
    {
      id: 'traxxas-4-tec-drift', model: 'Traxxas 4-Tec Drift 1/10 (Mustang)', brands: ['Traxxas'],
      name_ar: 'سيارة درفت 1/10 بدفع رباعي', name_en: '1/10 AWD Drift Car',
      desc_ar: 'سيارة درفت بمقاس 1/10 على شاسيه 4-Tec بدفع رباعي بهيكل موستانج.' + CONTACT_AR,
      desc_en: 'A 1/10-scale drift car on the four-wheel-drive 4-Tec chassis with a Mustang body.' + CONTACT_EN,
      category: 'drift', scales: ['1/10'], level: 'intermediate', featured: 69, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: 'AWD' },
      tags: ['traxxas', '4-tec', '4tec', 'drift', 'mustang', 'درفت', 'تراكساس'],
      photos: range('drift', 32, 36)
    },
    {
      id: 'mst-110-drift', model: 'MST 1/10 Drift', brands: ['MST'],
      name_ar: 'سيارة درفت 1/10 بدفع خلفي', name_en: '1/10 RWD Drift Car',
      desc_ar: 'سيارة درفت بمقاس 1/10 بدفع خلفي من MST — الأسلوب الأقرب لدرفت السيارات الحقيقية.',
      desc_en: 'A 1/10-scale rear-wheel-drive drift car from MST — the closest style to real-car drifting.',
      category: 'drift', scales: ['1/10'], level: 'pro', featured: 68, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: 'RWD' },
      tags: ['mst', 'drift', 'rwd', 'درفت'],
      photos: ['drift-037', 'drift-038']
    },
    {
      id: 'hpi-rs4', model: 'HPI RS4', brands: ['HPI'],
      name_ar: 'سيارة سياحية 1/10 بدفع رباعي', name_en: '1/10 4WD Touring Car',
      desc_ar: 'سيارة سياحية بمقاس 1/10 بدفع رباعي من HPI.' + CONTACT_AR,
      desc_en: 'A 1/10-scale four-wheel-drive touring car from HPI.' + CONTACT_EN,
      category: 'drift', scales: ['1/10'], level: 'intermediate', featured: 66, inStock: true, price: null,
      specs: { drive: '4WD' },
      tags: ['hpi', 'rs4', 'touring', 'on-road', 'سياحية'],
      photos: range('drift', 172, 175)
    },
    {
      id: 'hpi-wr8', model: 'HPI WR8 Rally', brands: ['HPI'],
      name_ar: 'سيارة رالي 1/8 بدفع رباعي', name_en: '1/8 4WD Rally Car',
      desc_ar: 'سيارة رالي بمقاس 1/8 بدفع رباعي من HPI.' + CONTACT_AR,
      desc_en: 'A 1/8-scale four-wheel-drive rally car from HPI.' + CONTACT_EN,
      category: 'drift', scales: ['1/8'], level: 'pro', featured: 65, inStock: true, price: null,
      specs: { drive: '4WD' },
      tags: ['hpi', 'wr8', 'rally', 'رالي'],
      photos: range('drift', 189, 193)
    },
    {
      id: 'drift-wheels-tires-110', model: '1/10 Drift Wheels & Tires', brands: [],
      name_ar: 'جنوط وإطارات درفت 1/10', name_en: '1/10 Drift Wheels & Tyres',
      desc_ar: 'جنوط وإطارات للدرفت والسيارات السياحية بمقاس 1/10 — اسأل عن الأشكال المتاحة.',
      desc_en: 'Drift and on-road wheels and tyres in 1/10 scale — ask about the styles available.',
      category: 'drift', scales: ['1/10'], level: 'beginner', featured: 63, inStock: true, price: null,
      specs: { use: { ar: 'درفت وسياحية', en: 'Drift & on-road' } },
      tags: ['wheels', 'tires', 'tyres', 'drift', 'جنوط', 'إطارات', 'كاوتش'],
      photos: range('drift', 116, 120)
    },
    {
      id: 'bodies-110', model: '1/10 Bodies', brands: [],
      name_ar: 'هياكل 1/10 للدرفت والسيارات السياحية', name_en: '1/10 Drift & Touring Bodies',
      desc_ar: 'هياكل بمقاس 1/10 لسيارات الدرفت والسيارات السياحية — اسأل عن الأشكال المتاحة.',
      desc_en: '1/10-scale bodies for drift and touring cars — ask about the shapes available.',
      category: 'drift', scales: ['1/10'], level: 'intermediate', featured: 61, inStock: true, price: null,
      specs: { use: { ar: 'درفت وسياحية', en: 'Drift & touring' } },
      tags: ['body', 'bodies', 'shell', 'drift', 'هيكل', 'بودي', 'درفت'],
      photos: range('drift', 73, 78)
    },

    /* ===== Parts & batteries ===== */
    {
      id: 'parts-hpi-hsp-xray', model: 'HPI / HSP / Xray / Kyosho / Thunder Tiger Parts', brands: ['HPI', 'HSP', 'Xray', 'Kyosho', 'Thunder Tiger', 'Rovan', 'King Motor'],
      name_ar: 'قطع غيار لعلامات متعددة', name_en: 'Parts for Several Brands',
      desc_ar: 'قطع غيار لسيارات HPI أو HSP أو Xray أو Kyosho أو Thunder Tiger أو Rovan أو King Motor — أرسل لنا اسم الموديل والقطعة المطلوبة.',
      desc_en: 'Parts for HPI, HSP, Xray, Kyosho, Thunder Tiger, Rovan and King Motor cars — send us your model and the part you need.',
      category: 'parts', scales: [], level: 'intermediate', featured: 53, inStock: true, price: null,
      specs: { compat: 'HPI · HSP · Xray · Kyosho · Thunder Tiger · Rovan · King Motor' },
      tags: ['parts', 'hpi', 'hsp', 'xray', 'kyosho', 'thunder tiger', 'rovan', 'king motor', 'قطع غيار'],
      photos: ['parts-002', 'parts-003'].concat(range('parts', 59, 62))
    },
    {
      id: 'arrma-parts-oils', model: 'Arrma Parts & Shock Oils', brands: ['Arrma'],
      name_ar: 'قطع غيار وزيوت مساعدات Arrma', name_en: 'Arrma Parts & Shock Oils',
      desc_ar: 'قطع غيار لسيارات Arrma وزيوت للمساعدات — أرسل لنا اسم الموديل والقطعة المطلوبة.',
      desc_en: 'Parts for Arrma cars plus shock oils — send us your model and the part you need.',
      category: 'parts', scales: [], level: 'intermediate', featured: 52, inStock: true, price: null,
      specs: { compat: 'Arrma' },
      tags: ['arrma', 'parts', 'shock oil', 'oil', 'قطع غيار', 'زيت', 'أرما'],
      photos: ['parts-054', 'parts-055', 'parts-056', 'parts-058']
    },
    {
      id: 'traxxas-parts', model: 'Traxxas Parts', brands: ['Traxxas'],
      name_ar: 'قطع غيار Traxxas', name_en: 'Traxxas Parts',
      desc_ar: 'قطع غيار لسيارات Traxxas — أرسل لنا اسم الموديل والقطعة المطلوبة.',
      desc_en: 'Parts for Traxxas cars — send us your model and the part you need.',
      category: 'parts', scales: [], level: 'intermediate', featured: 51, inStock: true, price: null,
      specs: { compat: 'Traxxas' },
      tags: ['traxxas', 'parts', 'قطع غيار', 'تراكساس'],
      photos: range('parts', 160, 163)
    },
    {
      id: 'rc-tires', model: 'RC Tires 1/5 · 1/8 · 1/10 · 1/16', brands: [],
      name_ar: 'إطارات سيارات تحكم عن بعد', name_en: 'RC Car Tyres',
      desc_ar: 'إطارات بالمقاسات 1/5 · 1/8 · 1/10 · 1/16 — أخبرنا بموديلك ونوع الأرض لنرشّح المناسب.',
      desc_en: 'Tyres in 1/5, 1/8, 1/10 and 1/16 — tell us your model and surface and we will suggest the right set.',
      category: 'parts', scales: ['1/5', '1/8', '1/10', '1/16'], level: 'beginner', featured: 50, inStock: true, price: null,
      specs: { use: { ar: 'تراب ورمال وأسفلت', en: 'Dirt, sand & tarmac' } },
      tags: ['tires', 'tyres', 'wheels', 'إطارات', 'كاوتش', 'جنوط'],
      photos: range('parts', 49, 53)
    },
    {
      id: 'proline-badlands-15', model: 'Pro-Line Badlands 1/5 (X-Maxx)', brands: [],
      name_ar: 'إطارات 1/5 لشاحنة X-Maxx', name_en: '1/5 Tyres for X-Maxx',
      desc_ar: 'إطارات Pro-Line Badlands بمقاس 1/5 مناسبة لشاحنة Traxxas X-Maxx.' + CONTACT_AR,
      desc_en: 'Pro-Line Badlands 1/5 tyres to fit the Traxxas X-Maxx.' + CONTACT_EN,
      category: 'parts', scales: ['1/5'], level: 'pro', featured: 49, inStock: true, price: null,
      specs: { compat: 'Traxxas X-Maxx' },
      tags: ['pro-line', 'proline', 'badlands', 'tires', 'x-maxx', 'إطارات'],
      photos: ['parts-239', 'parts-240']
    },
    {
      id: 'batteries', model: 'Batteries (Traxxas / LiPo)', brands: ['Traxxas'],
      name_ar: 'بطاريات Traxxas · LiPo', name_en: 'Traxxas & LiPo Batteries',
      desc_ar: 'بطاريات من Traxxas وبطاريات LiPo لسيارات الأوف رود — أخبرنا بموديلك ونرشّح لك المناسبة.',
      desc_en: 'Traxxas and LiPo batteries for off-road cars — tell us your model and we will suggest the right one.',
      category: 'parts', scales: [], level: 'intermediate', featured: 48, inStock: true, price: null,
      specs: { use: { ar: 'سيارات الأوف رود', en: 'Off-road cars' } },
      tags: ['battery', 'batteries', 'lipo', 'traxxas', 'بطارية', 'بطاريات', 'ليبو'],
      photos: range('parts', 140, 144)
    },
    {
      id: 'bodies-traxxas-fox', model: 'Bodies (Traxxas / Fox)', brands: ['Traxxas'],
      name_ar: 'هياكل Traxxas · Fox', name_en: 'Traxxas & Fox Bodies',
      desc_ar: 'هياكل لسيارات Traxxas وهياكل Fox — اسأل عن الأشكال والألوان المتاحة.',
      desc_en: 'Bodies for Traxxas cars and Fox bodies — ask about the shapes and colours available.',
      category: 'parts', scales: [], level: 'intermediate', featured: 47, inStock: true, price: null,
      specs: { compat: 'Traxxas' },
      tags: ['body', 'bodies', 'traxxas', 'fox', 'هيكل', 'بودي'],
      photos: range('parts', 145, 149)
    }
  ];

  /* ---------- Featured product (+ which real photo to show large) ---------- */
  window.VOLT_FEATURED = { productId: 'losi-5ive-t-3', photo: 'shop-011' };
})();
