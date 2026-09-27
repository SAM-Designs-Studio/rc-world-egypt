/* ==========================================================================
   RC World Egypt — Product catalogue
   --------------------------------------------------------------------------
   Plain global data (no modules) so the site works from file://.
   (window.VOLT_* are internal identifiers only — never shown to visitors.)

   CATALOGUE: the shop's models, using its own naming. Shop photos come from
   window.SHOP_PHOTOS (photos.js):
     • photos: ['<cat>-<id>', …] — the first key is the card image; all keys
       appear as quick-view thumbnails.
     • Keys not yet in photos.js (e.g. 'boats-224') resolve to
       assets/img/shop/{full,thumb}/<key>.jpg.
     • Foam trainer planes, small drift cars and a few tools use stock photos that
       show the item type itself (PX / U helpers, content-checked, location-neutral).
       Tools with no matching photo carry art: '<name>' → a drawn line illustration
       (#art-<name> in index.html) on a designed card instead of a photo.
     • level (beginner | intermediate | pro) only on complete vehicles; parts, tools,
       electronics and plane accessories have level: null (never in level results).
     • No prices on the site (price: null) — the shop confirms price and availability.
     • Specs are well-known type facts only (scale, petrol / electric / nitro,
       drive, cell count when it is part of the model name). No speeds, no
       prices, no invented numbers.

   Product shape:
     id, model (English, both languages), brands [..], name_ar / name_en
     (descriptor), desc_ar / desc_en, category (baja | offroad | planes |
     drift | parts | tools | electronics | boats), scales [..], level, featured (sort weight), inStock,
     price (null), specs, tags, photos [..] | images [{ src, thumb }] | art
   ========================================================================== */

(function () {
  'use strict';

  /* Stock photos that accurately show the item (content-checked, URLs verified HTTP 200) */
  var PX = function (id) {
    var base = 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=';
    return { src: base + '1200', thumb: base + '600' };
  };
  var U = function (id) {
    var base = 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&q=80&w=';
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
    { id: 'parts' },
    { id: 'tools' },
    { id: 'electronics' },
    { id: 'boats' }
  ];

  /* ---------- Brands the shop deals in (shown as text only — no logos) ---------- */
  window.VOLT_BRANDS = ['Losi', 'Arrma', 'Traxxas', 'HPI', 'Rovan', 'King Motor', 'FG', 'Rofun', 'MST', 'HSP', 'Xray', 'Kyosho', 'Thunder Tiger', 'Spektrum', 'Pro Boat', 'Zenoah', 'DDM'];

  var PETROL = { ar: 'بنزين', en: 'Petrol' };
  var ELECTRIC = { ar: 'كهربائي', en: 'Electric' };
  var EPO = { ar: 'فوم EPO متين', en: 'Tough EPO foam' };
  var ASK = { ar: 'اسأل عن الموديلات المتاحة', en: 'Ask for available models' };
  var CONTACT_AR = ' تواصل معنا لمعرفة السعر والتوفر.';
  var CONTACT_EN = ' Contact us for price and availability.';

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
      tags: ['jeep', 'rubicon', 'led', 'fg', 'monster', 'truck', 'petrol', 'مونستر', 'بنزين'],
      photos: ['offroad-n04', 'offroad-n01'].concat(range('baja', 214, 218))
    },
    {
      id: 'petrol-chassis-15', model: '1/5 Petrol Chassis', brands: [],
      name_ar: 'شاسيه 1/5 بمحرك بنزين', name_en: '1/5 Petrol Chassis',
      desc_ar: 'شاسيه بمقاس 1/5 بمحرك بنزين — اسألنا عن التفاصيل والموديلات المتوافقة.',
      desc_en: 'A 1/5-scale petrol chassis — ask us for the details and compatible models.',
      category: 'baja', scales: ['1/5'], level: 'pro', featured: 89, inStock: true, price: null,
      specs: { power: PETROL, version: ASK },
      tags: ['baja 5b', 'chassis', 'petrol', 'baja', 'شاسيه', 'بنزين'],
      photos: ['baja-121', 'baja-122', 'baja-123', 'baja-125', 'baja-n19']
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
      id: 'traxxas-slash-vxl', model: 'Traxxas Slash VXL', brands: ['Traxxas'],
      name_ar: 'شاحنة شورت كورس 1/10 بدفع خلفي', name_en: '1/10 2WD Short-Course Truck',
      desc_ar: 'شاحنة شورت كورس بمقاس 1/10 بدفع خلفي ومحرك براشلس، مع جهاز التحكم TQi.' + CONTACT_AR,
      desc_en: 'A 1/10-scale two-wheel-drive short-course truck with a brushless motor and the TQi radio.' + CONTACT_EN,
      category: 'offroad', scales: ['1/10'], level: 'intermediate', featured: 89, inStock: true, price: null,
      specs: { power: { ar: 'كهربائي براشلس', en: 'Brushless electric' }, drive: '2WD', radio: 'Traxxas TQi' },
      tags: ['traxxas', 'slash', 'vxl', 'short course', 'brushless', 'شورت كورس', 'تراكساس'],
      photos: ['offroad-n09']
    },
    {
      id: 'traxxas-trx4m-high-trail', model: 'Traxxas TRX-4M High Trail Cheyenne', brands: ['Traxxas'],
      name_ar: 'سيارة كراولر وتريل 1/18', name_en: '1/18 Scale & Trail Crawler',
      desc_ar: 'سيارة كراولر وتريل صغيرة بمقاس 1/18 بهيكل شاحنة كلاسيكي، للتسلق والطرق الوعرة.' + CONTACT_AR,
      desc_en: 'A small 1/18-scale scale-and-trail crawler with a classic pickup body, for crawling and rough trails.' + CONTACT_EN,
      category: 'offroad', scales: ['1/18'], level: 'beginner', featured: 87, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', use: { ar: 'التسلق والطرق الوعرة', en: 'Crawling & trails' } },
      tags: ['traxxas', 'trx-4m', 'trx4m', 'crawler', 'trail', 'cheyenne', 'كراولر', 'تسلق'],
      photos: ['offroad-n10']
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
      photos: ['offroad-103', 'offroad-105', 'offroad-229', 'offroad-230', 'offroad-n06', 'offroad-n18']
    },
    {
      id: 'arrma-big-rock-6s', model: 'Arrma Big Rock Crew Cab 6S BLX', brands: ['Arrma'],
      name_ar: 'شاحنة مونستر 1/7 بدفع رباعي جاهزة للتشغيل', name_en: '1/7 4WD Monster Truck RTR',
      desc_ar: 'شاحنة مونستر بمقاس 1/7 بدفع رباعي ومحرك براشلس تعمل على بطاريات 6S، جاهزة للتشغيل.' + CONTACT_AR,
      desc_en: 'A 1/7-scale four-wheel-drive brushless monster truck for 6S, ready to run.' + CONTACT_EN,
      category: 'offroad', scales: ['1/7'], level: 'pro', featured: 90, inStock: true, price: null,
      specs: { power: { ar: 'كهربائي براشلس', en: 'Brushless electric' }, drive: '4WD', cells: '6S', version: 'RTR' },
      tags: ['arrma', 'big rock', 'crew cab', '6s', 'blx', 'monster', 'rtr', 'مونستر', 'أرما'],
      photos: ['offroad-n17']
    },
    {
      id: 'arrma-kraton-exb-roller', model: 'Arrma Kraton EXB Roller', brands: ['Arrma'],
      name_ar: 'شاسيه 1/8 بدفع رباعي بدون إلكترونيات', name_en: '1/8 4WD Roller (no electronics)',
      desc_ar: 'نسخة Full Option Roller: شاسيه كامل بدون محرك أو سيرفو أو جهاز تحكم، لتركّب الإلكترونيات التي تختارها.' + CONTACT_AR,
      desc_en: 'The Full Option Roller: a complete rolling chassis without motor, servo or radio, so you fit the electronics you choose.' + CONTACT_EN,
      category: 'offroad', scales: ['1/8'], level: 'pro', featured: 84, inStock: true, price: null,
      specs: { drive: '4WD', version: { ar: 'رولر بدون إلكترونيات', en: 'Roller — no electronics' } },
      tags: ['arrma', 'kraton', 'exb', 'roller', 'رولر', 'شاسيه', 'أرما'],
      photos: ['offroad-n14', 'offroad-n12', 'offroad-n13']
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
      desc_ar: 'شاحنة صحراوية من Traxxas بهيكل Fox — اسألنا عن النسخة المتاحة.',
      desc_en: 'A Traxxas desert truck with a Fox body — ask us about the version available.',
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
      category: 'offroad', scales: [], level: null, featured: 60, inStock: true, price: null,
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
      images: [PX('3841145')]
    },
    {
      id: 'foam-trainer-4ch-gyro', model: 'Foam Trainer 4CH + Gyro', brands: [],
      name_ar: 'طائرة تدريب من الفوم — 4 قنوات مع جايرو', name_en: '4-Channel Foam Trainer with Gyro',
      desc_ar: 'طائرة تدريب من فوم EPO بأربع قنوات مع جايرو يساعد على ثبات الطيران — خطوة تالية بعد طائرات الثلاث قنوات.',
      desc_en: 'A 4-channel EPO foam trainer with a gyro that helps keep flight steady — the next step after 3-channel trainers.',
      category: 'planes', scales: [], level: 'beginner', featured: 71, inStock: true, price: null,
      specs: { build: EPO, channels: '4CH', extras: { ar: 'جايرو للثبات', en: 'Stabilising gyro' } },
      tags: ['plane', 'trainer', 'foam', 'gyro', 'طائرة', 'فوم', 'جايرو'],
      images: [U('1764836671873-5e2c4b777daf')]
    },
    {
      id: 'foam-glider-trainer', model: 'Foam Glider Trainer', brands: [],
      name_ar: 'طائرة شراعية للتدريب من الفوم', name_en: 'Foam Glider Trainer',
      desc_ar: 'طائرة شراعية من فوم EPO بجناح طويل وطيران هادئ وبطيء — مناسبة لتعلّم التحكم بسهولة.',
      desc_en: 'An EPO foam glider with long wings and slow, calm flight — easy to learn with.',
      category: 'planes', scales: [], level: 'beginner', featured: 58, inStock: true, price: null,
      specs: { build: EPO, wing: { ar: 'جناح طويل', en: 'Long wing' } },
      tags: ['glider', 'plane', 'foam', 'شراعية', 'طائرة', 'فوم'],
      images: [U('1759072865254-d4e9b204d291')]
    },
    {
      id: 'cessna-foam-trainer', model: 'Cessna-style Foam Trainer', brands: [],
      name_ar: 'طائرة تدريب من الفوم بشكل الطائرات الخفيفة', name_en: 'Light-aircraft Style Foam Trainer',
      desc_ar: 'طائرة تدريب من فوم EPO بشكل الطائرات الخفيفة ذات الجناح العلوي، متينة وسهلة الطيران.',
      desc_en: 'An EPO foam trainer shaped like classic high-wing light aircraft — tough and easy to fly.',
      category: 'planes', scales: [], level: 'beginner', featured: 57, inStock: true, price: null,
      specs: { build: EPO, wing: { ar: 'جناح علوي', en: 'High wing' } },
      tags: ['plane', 'trainer', 'foam', 'طائرة', 'فوم', 'تدريب'],
      images: [U('1689092914752-36601d72b607')]
    },
    {
      id: 'foam-sport-trainer', model: 'Foam Sport Trainer (aileron)', brands: [],
      name_ar: 'طائرة فوم رياضية بجنيحات تحكم', name_en: 'Foam Sport Trainer with Ailerons',
      desc_ar: 'طائرة من فوم EPO بجنيحات تحكم لحركات أكثر — للطيارين الذين أتقنوا طائرات التدريب.',
      desc_en: 'An EPO foam plane with ailerons for more manoeuvres — for pilots who have mastered trainers.',
      category: 'planes', scales: [], level: 'intermediate', featured: 56, inStock: true, price: null,
      specs: { build: EPO, extras: { ar: 'جنيحات تحكم', en: 'Ailerons' } },
      tags: ['plane', 'sport', 'aileron', 'foam', 'طائرة', 'فوم', 'رياضية'],
      images: [PX('38544903'), PX('38544892')]
    },
    {
      id: 'plane-engines', model: 'Plane Engines (glow/nitro)', brands: [],
      name_ar: 'محركات طائرات جلو ونيترو', name_en: 'Glow / Nitro Plane Engines',
      desc_ar: 'مجموعة محركات طائرات متاحة — اسأل عن الموديلات.',
      desc_en: 'Selection of plane engines available — ask for models.',
      category: 'planes', scales: [], level: null, featured: 76, inStock: true, price: null,
      specs: { power: { ar: 'جلو / نيترو', en: 'Glow / nitro' }, version: ASK },
      tags: ['engine', 'glow', 'nitro', 'plane', 'محرك', 'محركات', 'نيترو', 'طائرة'],
      photos: range('planes', 39, 43)
    },
    {
      id: 'plane-parts', model: 'RC Plane Parts', brands: [],
      name_ar: 'قطع غيار طائرات', name_en: 'Plane Parts',
      desc_ar: 'قطع غيار لطائرات التحكم عن بعد — أرسل لنا موديل الطائرة والقطعة المطلوبة.',
      desc_en: 'Parts for RC planes — send us your plane model and the part you need.',
      category: 'planes', scales: [], level: null, featured: 55, inStock: true, price: null,
      specs: { version: ASK },
      tags: ['plane', 'parts', 'طائرة', 'قطع غيار'],
      photos: range('planes', 44, 48).concat(['planes-087'])
    },
    {
      id: 'plane-accessories', model: 'RC Plane Accessories', brands: [],
      name_ar: 'إكسسوارات وأدوات الطائرات', name_en: 'Plane Accessories & Tools',
      desc_ar: 'إكسسوارات وأدوات لطائرات التحكم عن بعد — اسأل عن المتاح.',
      desc_en: 'Accessories and tools for RC planes — ask what is available.',
      category: 'planes', scales: [], level: null, featured: 75, inStock: true, price: null,
      specs: { version: ASK },
      tags: ['plane', 'accessories', 'tools', 'طائرة', 'إكسسوارات', 'أدوات'],
      photos: ['planes-pa02', 'planes-138']
    },
    {
      id: 'plane-wheels', model: 'Plane Wheels', brands: [],
      name_ar: 'عجلات طائرات', name_en: 'Plane wheels',
      desc_ar: 'عجلات خفيفة لطائرات التحكم عن بعد بمقاسات مختلفة — أخبرنا بموديل طائرتك.' + CONTACT_AR,
      desc_en: 'Lightweight wheels for RC planes in several sizes — tell us your plane model.' + CONTACT_EN,
      category: 'planes', scales: [], level: null, featured: 74, inStock: true, price: null,
      specs: { use: { ar: 'عجلات الهبوط', en: 'Landing gear' } },
      tags: ['wheels', 'plane', 'عجلات', 'طائرة', 'كاوتش'],
      photos: ['planes-pa04', 'planes-pa22', 'planes-138']
    },
    {
      id: 'plane-spinners', model: 'Spinners', brands: [],
      name_ar: 'سبينرات للمراوح', name_en: 'Propeller spinners',
      desc_ar: 'سبينرات بلاستيك وألومنيوم بألوان ومقاسات مختلفة لتثبيت المروحة.' + CONTACT_AR,
      desc_en: 'Plastic and aluminium spinners in different colours and sizes to finish the prop.' + CONTACT_EN,
      category: 'planes', scales: [], level: null, featured: 73, inStock: true, price: null,
      specs: { use: { ar: 'تثبيت المروحة', en: 'Propeller mounting' } },
      tags: ['spinner', 'spinners', 'prop', 'سبينر', 'مروحة'],
      photos: ['planes-pa07', 'planes-pa09', 'planes-pa10', 'planes-pa12', 'planes-pa39', 'planes-pa40']
    },
    {
      id: 'plane-fuel-tanks-tubing', model: 'Fuel Tanks & Tubing', brands: [],
      name_ar: 'خزانات وخراطيم وقود', name_en: 'Fuel tanks & tubing',
      desc_ar: 'خزانات وقود وخراطيم لطائرات النيترو والجلو.' + CONTACT_AR,
      desc_en: 'Fuel tanks and fuel tubing for nitro / glow planes.' + CONTACT_EN,
      category: 'planes', scales: [], level: null, featured: 71, inStock: true, price: null,
      specs: { use: { ar: 'طائرات النيترو', en: 'Nitro planes' } },
      tags: ['fuel tank', 'tank', 'tubing', 'nitro', 'خزان', 'وقود', 'خرطوم', 'نيترو'],
      photos: ['planes-pa15', 'planes-pa20', 'planes-pa13']
    },
    {
      id: 'plane-glow-plugs', model: 'Glow Plugs', brands: [],
      name_ar: 'شمعات جلو', name_en: 'Glow plugs',
      desc_ar: 'شمعات جلو لمحركات النيترو — اسأل عن النوع المناسب لمحركك.' + CONTACT_AR,
      desc_en: 'Glow plugs for nitro engines — ask which type suits your engine.' + CONTACT_EN,
      category: 'planes', scales: [], level: null, featured: 70, inStock: true, price: null,
      specs: { use: { ar: 'محركات النيترو والجلو', en: 'Nitro / glow engines' } },
      tags: ['glow plug', 'glow', 'nitro', 'شمعة', 'جلو', 'نيترو'],
      photos: ['planes-pa16', 'planes-pa17']
    },
    {
      id: 'plane-control-horns', model: 'Control Horns, Hinges & Clevises', brands: [],
      name_ar: 'قرون تحكم ومفصلات ووصلات', name_en: 'Control horns, hinges & clevises',
      desc_ar: 'قرون تحكم ومفصلات ووصلات وأذرع ومسامير لتركيب أسطح التحكم في الطائرة.' + CONTACT_AR,
      desc_en: 'Control horns, hinges, clevises, pushrods and hardware for fitting control surfaces.' + CONTACT_EN,
      category: 'planes', scales: [], level: null, featured: 69, inStock: true, price: null,
      specs: { use: { ar: 'أسطح التحكم', en: 'Control surfaces' } },
      tags: ['control horn', 'hinge', 'clevis', 'pushrod', 'linkage', 'قرن', 'مفصلة', 'وصلة'],
      photos: ['planes-pa19', 'planes-pa31', 'planes-pa33', 'planes-pa38', 'planes-pa21', 'planes-pa30']
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
      id: 'mini-drift-128', model: 'Mini Drift 1/28 RWD', brands: [],
      name_ar: 'سيارة درفت صغيرة بحجم كف اليد', name_en: 'Palm-size RWD Drift Car',
      desc_ar: 'سيارة درفت صغيرة بحجم كف اليد بمقاس 1/28 بدفع خلفي وجيروسكوب — مناسبة للمساحات الداخلية.' + CONTACT_AR,
      desc_en: 'A palm-size 1/28-scale rear-wheel-drive drift car with a gyro — made for indoor tracks.' + CONTACT_EN,
      category: 'drift', scales: ['1/28'], level: 'beginner', featured: 64, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: 'RWD', extras: { ar: 'جيروسكوب للتحكم في الانزلاق', en: 'Gyro for drift control' } },
      tags: ['mini', 'drift', 'rwd', 'gyro', 'palm', 'ميني', 'صغيرة', 'درفت', 'جيرو'],
      images: [PX('13047779')]
    },
    {
      id: 'mini-drift-124', model: 'Mini Drift 1/24 RWD', brands: [],
      name_ar: 'سيارة درفت صغيرة بدفع خلفي', name_en: 'Mini RWD Drift Car',
      desc_ar: 'سيارة درفت صغيرة بمقاس 1/24 بدفع خلفي وجيروسكوب — للتدريب على الدرفت في البيت أو على حلبة صغيرة.' + CONTACT_AR,
      desc_en: 'A small 1/24-scale rear-wheel-drive drift car with a gyro — for drift practice at home or on a small track.' + CONTACT_EN,
      category: 'drift', scales: ['1/24'], level: 'beginner', featured: 64, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: 'RWD', extras: { ar: 'جيروسكوب للتحكم في الانزلاق', en: 'Gyro for drift control' } },
      tags: ['mini', 'drift', 'rwd', 'gyro', 'ميني', 'صغيرة', 'درفت', 'جيرو'],
      images: [PX('13047786'), PX('13047783')]
    },
    {
      id: 'drift-116-4wd', model: 'Drift 1/16 4WD', brands: [],
      name_ar: 'سيارة درفت بدفع رباعي', name_en: '4WD Drift Car',
      desc_ar: 'سيارة درفت بمقاس 1/16 بدفع رباعي، سهلة التحكم وبداية مناسبة لعالم الدرفت.' + CONTACT_AR,
      desc_en: 'A 1/16-scale four-wheel-drive drift car — easy to control and a good first step into drifting.' + CONTACT_EN,
      category: 'drift', scales: ['1/16'], level: 'beginner', featured: 64, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD' },
      tags: ['drift', '4wd', 'درفت', 'دفع رباعي'],
      images: [U('1637875373155-2f9d64a849e3')]
    },
    {
      id: 'drift-114-rwd', model: 'Drift 1/14 RWD', brands: [],
      name_ar: 'سيارة درفت بدفع خلفي', name_en: 'RWD Drift Car',
      desc_ar: 'سيارة درفت بمقاس 1/14 بدفع خلفي — حجم وسط بين السيارات الصغيرة ومقاس 1/10.' + CONTACT_AR,
      desc_en: 'A 1/14-scale rear-wheel-drive drift car — a size between the mini cars and 1/10.' + CONTACT_EN,
      category: 'drift', scales: ['1/14'], level: 'intermediate', featured: 64, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: 'RWD' },
      tags: ['drift', 'rwd', 'درفت', 'دفع خلفي'],
      images: [PX('13047783')]
    },
    {
      id: 'drift-wheels-tires-110', model: '1/10 Drift Wheels & Tires', brands: [],
      name_ar: 'جنوط وإطارات درفت 1/10', name_en: '1/10 Drift Wheels & Tyres',
      desc_ar: 'جنوط وإطارات للدرفت والسيارات السياحية بمقاس 1/10 — اسأل عن الأشكال المتاحة.',
      desc_en: 'Drift and on-road wheels and tyres in 1/10 scale — ask about the styles available.',
      category: 'drift', scales: ['1/10'], level: null, featured: 63, inStock: true, price: null,
      specs: { use: { ar: 'درفت وسياحية', en: 'Drift & on-road' } },
      tags: ['wheels', 'tires', 'tyres', 'drift', 'جنوط', 'إطارات', 'كاوتش'],
      photos: range('drift', 116, 120)
    },
    {
      id: 'bodies-110', model: '1/10 Bodies', brands: [],
      name_ar: 'هياكل 1/10 للدرفت والسيارات السياحية', name_en: '1/10 Drift & Touring Bodies',
      desc_ar: 'هياكل بمقاس 1/10 لسيارات الدرفت والسيارات السياحية — اسأل عن الأشكال المتاحة.',
      desc_en: '1/10-scale bodies for drift and touring cars — ask about the shapes available.',
      category: 'drift', scales: ['1/10'], level: null, featured: 61, inStock: true, price: null,
      specs: { use: { ar: 'درفت وسياحية', en: 'Drift & touring' } },
      tags: ['body', 'bodies', 'shell', 'drift', 'هيكل', 'بودي', 'درفت'],
      photos: range('drift', 73, 78)
    },
    {
      id: 'panther-touring-rtr', model: 'Panther Brushless Touring Car RTR', brands: [],
      name_ar: 'سيارة سياحية براشلس جاهزة للتشغيل', name_en: 'Brushless On-road Touring Car RTR',
      desc_ar: 'سيارة سياحية للطرق الممهدة بمحرك براشلس، جاهزة للتشغيل.' + CONTACT_AR,
      desc_en: 'A brushless on-road touring car, ready to run.' + CONTACT_EN,
      category: 'drift', scales: [], level: 'intermediate', featured: 60, inStock: true, price: null,
      specs: { power: { ar: 'كهربائي براشلس', en: 'Brushless electric' }, version: 'RTR' },
      tags: ['panther', 'touring', 'on-road', 'brushless', 'rtr', 'سياحية', 'براشلس'],
      photos: ['drift-n16']
    },

    /* ===== Parts & batteries ===== */
    {
      id: 'parts-hpi-hsp-xray', model: 'HPI / HSP / Xray / Kyosho / Thunder Tiger Parts', brands: ['HPI', 'HSP', 'Xray', 'Kyosho', 'Thunder Tiger', 'Rovan', 'King Motor'],
      name_ar: 'قطع غيار لعلامات متعددة', name_en: 'Parts for Several Brands',
      desc_ar: 'قطع غيار لسيارات HPI أو HSP أو Xray أو Kyosho أو Thunder Tiger أو Rovan أو King Motor — أرسل لنا اسم الموديل والقطعة المطلوبة.',
      desc_en: 'Parts for HPI, HSP, Xray, Kyosho, Thunder Tiger, Rovan and King Motor cars — send us your model and the part you need.',
      category: 'parts', scales: [], level: null, featured: 53, inStock: true, price: null,
      specs: { compat: 'HPI · HSP · Xray · Kyosho · Thunder Tiger · Rovan · King Motor' },
      tags: ['parts', 'hpi', 'hsp', 'xray', 'kyosho', 'thunder tiger', 'rovan', 'king motor', 'قطع غيار'],
      photos: ['parts-002', 'parts-003'].concat(range('parts', 59, 62))
    },
    {
      id: 'zenoah-g320rc', model: 'Zenoah G320RC 32cc Engine', brands: ['Zenoah'],
      name_ar: 'محرك بنزين 32cc لمقاس 1/5', name_en: '1/5 32cc Petrol Engine',
      desc_ar: 'محرك بنزين 32cc لسيارات 1/5 مع الكلتش والكاربراتير.' + CONTACT_AR,
      desc_en: 'A 32cc petrol engine for 1/5 cars, with clutch and carburettor.' + CONTACT_EN,
      category: 'parts', scales: ['1/5'], level: null, featured: 53, inStock: true, price: null,
      specs: { power: PETROL, extras: { ar: 'كلتش وكاربراتير', en: 'Clutch & carburettor' }, use: { ar: 'سيارات الباجا', en: 'Baja cars' } },
      tags: ['zenoah', 'g320rc', '32cc', 'engine', 'petrol', 'baja', 'محرك', 'بنزين', 'زينوا'],
      photos: ['parts-n11', 'parts-n05']
    },
    {
      id: 'ddm-petrol-engine-15', model: 'DDM Petrol Engine for 1/5', brands: ['DDM'],
      name_ar: 'محرك بنزين لمقاس 1/5 بتشغيل بالشد', name_en: '1/5 Pull-start Petrol Engine',
      desc_ar: 'محرك بنزين لسيارات 1/5 يعمل بالتشغيل بالشد.' + CONTACT_AR,
      desc_en: 'A pull-start petrol engine for 1/5 cars.' + CONTACT_EN,
      category: 'parts', scales: ['1/5'], level: null, featured: 52, inStock: true, price: null,
      specs: { power: PETROL, extras: { ar: 'تشغيل بالشد', en: 'Pull start' }, use: { ar: 'سيارات الباجا', en: 'Baja cars' } },
      tags: ['ddm', 'engine', 'petrol', 'pull start', 'baja', 'محرك', 'بنزين'],
      photos: ['parts-n08', 'parts-n07']
    },
    {
      id: 'arrma-parts-oils', model: 'Arrma Parts & Shock Oils', brands: ['Arrma'],
      name_ar: 'قطع غيار وزيوت مساعدات Arrma', name_en: 'Arrma Parts & Shock Oils',
      desc_ar: 'قطع غيار لسيارات Arrma وزيوت للمساعدات — أرسل لنا اسم الموديل والقطعة المطلوبة.',
      desc_en: 'Parts for Arrma cars plus shock oils — send us your model and the part you need.',
      category: 'parts', scales: [], level: null, featured: 52, inStock: true, price: null,
      specs: { compat: 'Arrma' },
      tags: ['arrma', 'parts', 'shock oil', 'oil', 'قطع غيار', 'زيت', 'أرما'],
      photos: ['parts-054', 'parts-055', 'parts-056', 'parts-058']
    },
    {
      id: 'traxxas-parts', model: 'Traxxas Parts', brands: ['Traxxas'],
      name_ar: 'قطع غيار Traxxas', name_en: 'Traxxas Parts',
      desc_ar: 'قطع غيار لسيارات Traxxas — أرسل لنا اسم الموديل والقطعة المطلوبة.',
      desc_en: 'Parts for Traxxas cars — send us your model and the part you need.',
      category: 'parts', scales: [], level: null, featured: 51, inStock: true, price: null,
      specs: { compat: 'Traxxas' },
      tags: ['traxxas', 'parts', 'قطع غيار', 'تراكساس'],
      photos: range('parts', 160, 163)
    },
    {
      id: 'rc-tires', model: 'RC Tires 1/5 · 1/8 · 1/10 · 1/16', brands: [],
      name_ar: 'إطارات سيارات تحكم عن بعد', name_en: 'RC Car Tyres',
      desc_ar: 'إطارات بالمقاسات 1/5 · 1/8 · 1/10 · 1/16 — أخبرنا بموديلك ونوع الأرض لنرشّح المناسب.',
      desc_en: 'Tyres in 1/5, 1/8, 1/10 and 1/16 — tell us your model and surface and we will suggest the right set.',
      category: 'parts', scales: ['1/5', '1/8', '1/10', '1/16'], level: null, featured: 50, inStock: true, price: null,
      specs: { use: { ar: 'تراب ورمال وأسفلت', en: 'Dirt, sand & tarmac' } },
      tags: ['tires', 'tyres', 'wheels', 'إطارات', 'كاوتش', 'جنوط'],
      photos: range('parts', 49, 53)
    },
    {
      id: 'proline-badlands-15', model: 'Pro-Line Badlands 1/5 (X-Maxx)', brands: [],
      name_ar: 'إطارات 1/5 لشاحنة X-Maxx', name_en: '1/5 Tyres for X-Maxx',
      desc_ar: 'إطارات Pro-Line Badlands بمقاس 1/5 مناسبة لشاحنة Traxxas X-Maxx.' + CONTACT_AR,
      desc_en: 'Pro-Line Badlands 1/5 tyres to fit the Traxxas X-Maxx.' + CONTACT_EN,
      category: 'parts', scales: ['1/5'], level: null, featured: 49, inStock: true, price: null,
      specs: { compat: 'Traxxas X-Maxx' },
      tags: ['pro-line', 'proline', 'badlands', 'tires', 'x-maxx', 'إطارات'],
      photos: ['parts-239', 'parts-240']
    },
    {
      id: 'batteries', model: 'Batteries (Traxxas / LiPo)', brands: ['Traxxas'],
      name_ar: 'بطاريات Traxxas · LiPo', name_en: 'Traxxas & LiPo Batteries',
      desc_ar: 'بطاريات من Traxxas وبطاريات LiPo لسيارات الأوف رود — أخبرنا بموديلك ونرشّح لك المناسبة.',
      desc_en: 'Traxxas and LiPo batteries for off-road cars — tell us your model and we will suggest the right one.',
      category: 'parts', scales: [], level: null, featured: 48, inStock: true, price: null,
      specs: { use: { ar: 'سيارات الأوف رود', en: 'Off-road cars' } },
      tags: ['battery', 'batteries', 'lipo', 'traxxas', 'بطارية', 'بطاريات', 'ليبو'],
      photos: range('parts', 140, 144)
    },
    {
      id: 'lipo-4s-1500-100c', model: 'LiPo 4S 1500mAh 100C', brands: [],
      name_ar: 'بطارية ليبو 4S', name_en: '4S LiPo battery',
      desc_ar: 'بطارية ليبو 4S بجهد 14.8 فولت وسعة 1500mAh، بفيشة XT60.' + CONTACT_AR,
      desc_en: 'A 4S 14.8V 1500mAh LiPo pack with an XT60 plug.' + CONTACT_EN,
      category: 'parts', scales: [], level: null, featured: 47, inStock: true, price: null,
      specs: { cells: '4S · 14.8V', plug: 'XT60', sizes: '1500mAh · 100C' },
      tags: ['lipo', '4s', '1500mah', '100c', 'xt60', 'battery', 'بطارية', 'ليبو'],
      photos: ['parts-n15']
    },
    {
      id: 'bodies-traxxas-fox', model: 'Bodies (Traxxas / Fox)', brands: ['Traxxas'],
      name_ar: 'هياكل Traxxas · Fox', name_en: 'Traxxas & Fox Bodies',
      desc_ar: 'هياكل لسيارات Traxxas وهياكل Fox — اسأل عن الأشكال والألوان المتاحة.',
      desc_en: 'Bodies for Traxxas cars and Fox bodies — ask about the shapes and colours available.',
      category: 'parts', scales: [], level: null, featured: 47, inStock: true, price: null,
      specs: { compat: 'Traxxas' },
      tags: ['body', 'bodies', 'traxxas', 'fox', 'هيكل', 'بودي'],
      photos: range('parts', 145, 149)
    },

    /* ===== Tools ===== */
    {
      id: 'hex-driver-set', model: 'Hex Driver Set 1.5–3.0 mm', brands: [],
      name_ar: 'طقم مفكات سداسية (ألن)', name_en: 'Hex driver set',
      desc_ar: 'مفكات سداسية بمقابض مريحة بالمقاسات الأكثر استخدامًا في سيارات 1/10 · 1/8.' + CONTACT_AR,
      desc_en: 'Hex drivers with comfortable handles in the sizes most used on 1/10 and 1/8 cars.' + CONTACT_EN,
      category: 'tools', scales: ['1/10', '1/8'], level: null, featured: 45, inStock: true, price: null,
      specs: { sizes: '1.5 · 2.0 · 2.5 · 3.0 mm', use: { ar: 'فك وتركيب المسامير', en: 'Everyday screw work' } },
      tags: ['hex', 'allen', 'driver', 'tools', 'مفك', 'مفكات', 'ألن', 'عدة'],
      photos: ['tools-pa01', 'tools-pa03', 'tools-pa06', 'planes-135', 'planes-137']
    },
    {
      id: 'nut-driver-set', model: 'Nut Driver Set 5.5 / 7 / 8 mm', brands: [],
      name_ar: 'طقم مفكات صواميل', name_en: 'Nut driver set',
      desc_ar: 'مفكات بلقم سداسية لفك صواميل العجلات والصواميل الصغيرة.' + CONTACT_AR,
      desc_en: 'Socket-tip drivers for wheel nuts and small nuts.' + CONTACT_EN,
      category: 'tools', scales: ['1/10', '1/8'], level: null, featured: 44, inStock: true, price: null,
      specs: { sizes: '5.5 · 7 · 8 mm', use: { ar: 'صواميل العجلات', en: 'Wheel nuts' } },
      tags: ['nut driver', 'socket', 'tools', 'مفك', 'صواميل', 'عدة'],
      art: 'nut-drivers'
    },
    {
      id: 'hex-key-set-15', model: 'Metric Hex Key Set 4 / 5 / 6 mm', brands: [],
      name_ar: 'طقم مفاتيح ألن لمقاس 1/5', name_en: 'Hex key set for 1/5',
      desc_ar: 'مفاتيح ألن كبيرة لمسامير سيارات الباجا ومقاس 1/5.' + CONTACT_AR,
      desc_en: 'Larger hex keys for the screws on Baja and 1/5-scale cars.' + CONTACT_EN,
      category: 'tools', scales: ['1/5'], level: null, featured: 43, inStock: true, price: null,
      specs: { sizes: '4 · 5 · 6 mm', use: { ar: 'سيارات الباجا', en: 'Baja cars' } },
      tags: ['hex', 'allen', 'keys', 'baja', 'tools', 'ألن', 'مفاتيح', 'باجا', 'عدة'],
      images: [PX('5691647'), PX('5691648')]
    },
    {
      id: 'shock-pliers-multitool', model: 'Shock Pliers & Multi-tool', brands: [],
      name_ar: 'زرادية مساعدات وأداة متعددة', name_en: 'Shock pliers & multi-tool',
      desc_ar: 'زرادية لإمساك أعمدة المساعدات دون خدشها، وأداة متعددة للوصلات والكرات.' + CONTACT_AR,
      desc_en: 'Pliers that grip shock shafts without scratching them, plus a multi-tool for links and ball ends.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 42, inStock: true, price: null,
      specs: { use: { ar: 'المساعدات والوصلات', en: 'Shocks, links & ball ends' } },
      tags: ['pliers', 'shock', 'multi-tool', 'tools', 'زرادية', 'بنسة', 'مساعدات', 'عدة'],
      images: [PX('5583100')]
    },
    {
      id: 'turnbuckle-wrench', model: 'Turnbuckle Wrench', brands: [],
      name_ar: 'مفتاح ضبط الوصلات', name_en: 'Turnbuckle wrench',
      desc_ar: 'مفتاح رفيع لضبط أطوال الوصلات (تيرن باكل) لضبط الكامبر والتو.' + CONTACT_AR,
      desc_en: 'A thin wrench for adjusting turnbuckles when setting camber and toe.' + CONTACT_EN,
      category: 'tools', scales: ['1/10', '1/8'], level: null, featured: 41, inStock: true, price: null,
      specs: { use: { ar: 'ضبط الكامبر والتو', en: 'Camber & toe adjustment' } },
      tags: ['turnbuckle', 'wrench', 'camber', 'toe', 'tools', 'مفتاح', 'وصلات', 'عدة'],
      images: [PX('5853933'), PX('8703535')]
    },
    {
      id: 'body-reamer', model: 'Body Reamer', brands: [],
      name_ar: 'أداة فتح ثقوب الهيكل', name_en: 'Body reamer',
      desc_ar: 'أداة مخروطية لفتح ثقوب نظيفة ودائرية في الهياكل.' + CONTACT_AR,
      desc_en: 'A tapered tool for making clean, round holes in bodies.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 40, inStock: true, price: null,
      specs: { use: { ar: 'هياكل البولي كربونات', en: 'Polycarbonate bodies' } },
      tags: ['reamer', 'body', 'tools', 'هيكل', 'بودي', 'ثقوب', 'عدة'],
      art: 'reamer'
    },
    {
      id: 'curved-body-scissors', model: 'Curved Body Scissors', brands: [],
      name_ar: 'مقص هياكل منحني', name_en: 'Curved body scissors',
      desc_ar: 'مقص بشفرات منحنية لقص الهياكل حول أقواس العجلات.' + CONTACT_AR,
      desc_en: 'Curved-blade scissors for trimming bodies around the wheel arches.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 39, inStock: true, price: null,
      specs: { use: { ar: 'قص هياكل البولي كربونات', en: 'Trimming polycarbonate bodies' } },
      tags: ['scissors', 'body', 'lexan', 'tools', 'مقص', 'هيكل', 'بودي', 'عدة'],
      photos: ['tools-pa27']
    },
    {
      id: 'ride-height-camber-gauge', model: 'Ride Height & Camber Gauge', brands: [],
      name_ar: 'مقياس ارتفاع الشاسيه والكامبر', name_en: 'Ride height & camber gauge',
      desc_ar: 'مقياس لضبط ارتفاع الشاسيه عن الأرض وزاوية الكامبر.' + CONTACT_AR,
      desc_en: 'A gauge for setting ride height and camber angle.' + CONTACT_EN,
      category: 'tools', scales: ['1/10', '1/8'], level: null, featured: 38, inStock: true, price: null,
      specs: { use: { ar: 'ضبط الإعدادات', en: 'Car setup' } },
      tags: ['ride height', 'camber', 'gauge', 'setup', 'tools', 'مقياس', 'كامبر', 'عدة'],
      images: [PX('32633664'), PX('7180748')]
    },
    {
      id: 'setup-station', model: 'Setup Station 1/10 & 1/8', brands: [],
      name_ar: 'محطة ضبط الإعدادات', name_en: 'Setup station',
      desc_ar: 'محطة ضبط للسيارات بمقاس 1/10 · 1/8 لقياس الكامبر والتو وارتفاع الشاسيه بدقة.' + CONTACT_AR,
      desc_en: 'A setup station for 1/10 and 1/8 cars to measure camber, toe and ride height accurately.' + CONTACT_EN,
      category: 'tools', scales: ['1/10', '1/8'], level: null, featured: 37, inStock: true, price: null,
      specs: { use: { ar: 'الكامبر والتو وارتفاع الشاسيه', en: 'Camber, toe & ride height' } },
      tags: ['setup station', 'setup', 'camber', 'toe', 'tools', 'ضبط', 'إعدادات', 'عدة'],
      art: 'setup-station'
    },
    {
      id: 'tire-balancer', model: 'Tire Balancer', brands: [],
      name_ar: 'جهاز موازنة الإطارات', name_en: 'Tire balancer',
      desc_ar: 'جهاز لموازنة العجلات والإطارات لتقليل الاهتزاز على السرعات العالية.' + CONTACT_AR,
      desc_en: 'For balancing wheels and tyres to cut vibration at high speed.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 36, inStock: true, price: null,
      specs: { use: { ar: 'موازنة العجلات', en: 'Wheel balancing' } },
      tags: ['tire', 'tyre', 'balancer', 'wheels', 'tools', 'إطارات', 'موازنة', 'عدة'],
      art: 'tire-balancer'
    },
    {
      id: 'pit-mat-magnetic', model: 'Pit Mat with Magnetic Tray', brands: [],
      name_ar: 'مفرش صيانة مع صينية مغناطيسية', name_en: 'Pit mat with magnetic tray',
      desc_ar: 'مفرش عمل يحمي الطاولة ويجمع القطع، مع صينية مغناطيسية للمسامير.' + CONTACT_AR,
      desc_en: 'A work mat that protects the bench and keeps parts together, with a magnetic tray for screws.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 35, inStock: true, price: null,
      specs: { use: { ar: 'حفظ المسامير والقطع الصغيرة', en: 'Keeps screws & small parts in place' } },
      tags: ['pit mat', 'mat', 'magnetic tray', 'tools', 'مفرش', 'صينية', 'مغناطيس', 'عدة'],
      art: 'pit-mat'
    },
    {
      id: 'soldering-kit', model: 'Soldering Iron & Solder Kit', brands: [],
      name_ar: 'كاوية لحام مع قصدير', name_en: 'Soldering iron & solder kit',
      desc_ar: 'كاوية لحام مع قصدير لتركيب الفيش والأسلاك والمحركات.' + CONTACT_AR,
      desc_en: 'A soldering iron with solder for fitting plugs, wires and motors.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 34, inStock: true, price: null,
      specs: { use: { ar: 'الفيش والأسلاك', en: 'Plugs & wiring' } },
      tags: ['soldering', 'solder', 'iron', 'tools', 'كاوية', 'لحام', 'قصدير', 'عدة'],
      images: [U('1521798604188-0d6595d6d6ae'), U('1560846389-8c7e1d88eca8')]
    },
    {
      id: 'servo-tester', model: 'Servo Tester', brands: [],
      name_ar: 'جهاز اختبار السيرفو', name_en: 'Servo tester',
      desc_ar: 'جهاز صغير لاختبار السيرفو وضبط نقطة المنتصف قبل التركيب.' + CONTACT_AR,
      desc_en: 'A small tester for checking servos and centring them before fitting.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 33, inStock: true, price: null,
      specs: { use: { ar: 'اختبار السيرفو وضبط المنتصف', en: 'Testing & centring servos' } },
      tags: ['servo', 'tester', 'tools', 'سيرفو', 'اختبار', 'عدة'],
      images: [PX('35652333'), PX('35652465')]
    },
    {
      id: 'lipo-balance-charger-dual', model: 'Dual LiPo Balance Charger', brands: [],
      name_ar: 'شاحن ليبو مزدوج بالموازنة', name_en: 'Dual LiPo balance charger',
      desc_ar: 'شاحن بمخرجين لشحن بطاريتين في وقت واحد مع موازنة الخلايا.' + CONTACT_AR,
      desc_en: 'A two-output charger that charges two packs at once with cell balancing.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 32, inStock: true, price: null,
      specs: { use: { ar: 'شحن بطاريات الليبو', en: 'LiPo charging' } },
      tags: ['charger', 'lipo', 'balance', 'dual', 'شاحن', 'ليبو', 'بطاريات', 'عدة'],
      art: 'charger'
    },
    {
      id: 'cellmeter-8', model: 'CellMeter 8 Battery Checker', brands: [],
      name_ar: 'جهاز فحص البطاريات', name_en: 'Battery checker / cell meter',
      desc_ar: 'يعرض جهد كل خلية ونسبة الشحن لبطاريات LiPo · Li-ion · LiFe · NiMH، ويعمل أيضًا جهازًا لاختبار السيرفو.' + CONTACT_AR,
      desc_en: 'Shows the voltage of each cell and the charge level for LiPo, Li-ion, LiFe and NiMH packs, and doubles as a servo tester.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 31, inStock: true, price: null,
      specs: { cells: '1S–8S', use: { ar: 'فحص البطاريات واختبار السيرفو', en: 'Battery checks & servo testing' } },
      tags: ['cellmeter', 'cell meter', 'checker', 'lipo', 'battery', 'servo', 'فحص', 'بطاريات', 'ليبو', 'عدة'],
      photos: ['tools-pa05', 'planes-139']
    },
    {
      id: 'digital-tachometer', model: 'Digital Tachometer', brands: [],
      name_ar: 'عدّاد لفات رقمي', name_en: 'Digital tachometer',
      desc_ar: 'جهاز يدوي بشاشة رقمية لقياس سرعة دوران المحرك والمروحة.' + CONTACT_AR,
      desc_en: 'A handheld digital meter for measuring engine and propeller RPM.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 30, inStock: true, price: null,
      specs: { use: { ar: 'قياس سرعة الدوران', en: 'Measuring RPM' } },
      tags: ['tachometer', 'rpm', 'meter', 'عداد', 'لفات', 'سرعة الدوران'],
      photos: ['tools-pa14']
    },
    {
      id: 'charge-leads-servo-extensions', model: 'Charge Leads & Servo Extensions', brands: [],
      name_ar: 'أسلاك شحن ووصلات تمديد سيرفو', name_en: 'Charge leads & servo extensions',
      desc_ar: 'أسلاك شحن متعددة المخارج بفيش موز، ووصلات تمديد للسيرفو بأطوال مختلفة.' + CONTACT_AR,
      desc_en: 'Multi-plug charge leads with banana plugs, and servo extension leads in several lengths.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 29, inStock: true, price: null,
      specs: { use: { ar: 'الشحن والتوصيلات', en: 'Charging & wiring' } },
      tags: ['charge lead', 'leads', 'banana', 'servo extension', 'extension', 'أسلاك', 'شحن', 'سيرفو', 'وصلات'],
      photos: ['tools-pa24', 'tools-pa25']
    },
    {
      id: 'lipo-safe-bag', model: 'LiPo Safe Bag', brands: [],
      name_ar: 'حقيبة أمان لبطاريات الليبو', name_en: 'LiPo safe bag',
      desc_ar: 'حقيبة مقاومة للحرارة لشحن بطاريات الليبو وتخزينها بأمان أكبر.' + CONTACT_AR,
      desc_en: 'A heat-resistant bag for safer charging and storage of LiPo packs.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 30, inStock: true, price: null,
      specs: { use: { ar: 'شحن وتخزين البطاريات', en: 'Charging & storage' } },
      tags: ['lipo bag', 'safe bag', 'battery', 'حقيبة', 'ليبو', 'بطاريات', 'أمان'],
      images: [PX('13047785')]
    },
    {
      id: 'glow-igniter-plug-driver', model: 'Glow Igniter & Glow Plug Driver', brands: [],
      name_ar: 'مشعل شمعات جلو ومفتاح شمعات', name_en: 'Glow igniter & glow plug driver',
      desc_ar: 'مشعل لتسخين شمعة الجلو عند تشغيل محركات النيترو، مع مفتاح لفك وتركيب الشمعات.' + CONTACT_AR,
      desc_en: 'An igniter that heats the glow plug to start nitro engines, plus a driver for fitting and removing plugs.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 29, inStock: true, price: null,
      specs: { use: { ar: 'محركات النيترو والجلو', en: 'Nitro / glow engines' } },
      tags: ['glow', 'igniter', 'glow plug', 'nitro', 'جلو', 'شمعة', 'نيترو', 'عدة'],
      photos: ['tools-pa29', 'tools-pa18']
    },
    {
      id: 'spark-plug-clutch-tool', model: 'Spark Plug Wrench & Clutch Tool', brands: [],
      name_ar: 'مفتاح بوجيه وأداة كلتش', name_en: 'Spark plug wrench & clutch tool',
      desc_ar: 'مفتاح لفك البوجيه وأداة لفك الكلتش في محركات البنزين لسيارات الباجا.' + CONTACT_AR,
      desc_en: 'A spark plug wrench and a clutch tool for the petrol engines on Baja cars.' + CONTACT_EN,
      category: 'tools', scales: ['1/5'], level: null, featured: 28, inStock: true, price: null,
      specs: { use: { ar: 'محركات البنزين', en: 'Petrol engines' } },
      tags: ['spark plug', 'clutch', 'petrol', 'baja', 'tools', 'بوجيه', 'كلتش', 'بنزين', 'باجا', 'عدة'],
      art: 'spark-plug'
    },
    {
      id: 'shock-oil-thread-lock', model: 'Shock Oil, Diff Oil & Thread Lock', brands: ['Traxxas'],
      name_ar: 'زيوت مساعدات وديفرنس ومثبت مسامير', name_en: 'Shock oil, diff oil & thread lock',
      desc_ar: 'أطقم زيوت مساعدات وزيوت ديفرنس بلزوجات مختلفة، مع مثبت مسامير للمسامير المعدنية.' + CONTACT_AR,
      desc_en: 'Shock oil and diff oil sets in different weights, plus thread lock for metal screws.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 27, inStock: true, price: null,
      specs: { use: { ar: 'المساعدات والديفرنس والمسامير', en: 'Shocks, diffs & screws' } },
      tags: ['shock oil', 'diff oil', 'thread lock', 'oil', 'traxxas', 'زيت', 'زيوت', 'مساعدات', 'ديفرنس', 'عدة'],
      photos: ['parts-054', 'parts-055', 'parts-056', 'parts-058']
    },

    /* ===== Radios & electronics ===== */
    {
      id: 'spektrum-dx8-ar8010t', model: 'Spektrum DX8 + AR8010T Receiver', brands: ['Spektrum'],
      name_ar: 'جهاز تحكم 8 قنوات مع رسيفر', name_en: '8-channel radio with receiver',
      desc_ar: 'جهاز تحكم 8 قنوات بتردد 2.4 جيجاهرتز ونظام DSMX مع رسيفر AR8010T، للطائرات والسيارات.' + CONTACT_AR,
      desc_en: 'An 8-channel 2.4GHz DSMX radio with the AR8010T receiver, for planes and cars.' + CONTACT_EN,
      category: 'electronics', scales: [], level: null, featured: 46, inStock: true, price: null,
      specs: { channels: '8', system: '2.4GHz DSMX', use: { ar: 'طائرات وسيارات', en: 'Planes & cars' } },
      tags: ['spektrum', 'dx8', 'ar8010t', 'radio', 'transmitter', 'receiver', 'dsmx', 'ريموت', 'جهاز تحكم', 'رسيفر'],
      photos: ['electronics-n02']
    },
    {
      id: 'traxxas-link-module', model: 'Traxxas Link Wireless Module', brands: ['Traxxas'],
      name_ar: 'وحدة بلوتوث لجهاز التحكم', name_en: 'Bluetooth telemetry module',
      desc_ar: 'وحدة لاسلكية تضيف البلوتوث وقراءات التليمتري إلى جهاز التحكم TQi.' + CONTACT_AR,
      desc_en: 'A wireless module that adds Bluetooth and telemetry readouts to the TQi radio.' + CONTACT_EN,
      category: 'electronics', scales: [], level: null, featured: 45, inStock: true, price: null,
      specs: { system: 'Bluetooth', compat: 'Traxxas TQi' },
      tags: ['traxxas', 'link', 'bluetooth', 'telemetry', 'tqi', 'بلوتوث', 'تليمتري'],
      photos: ['electronics-n20']
    },

    /* ===== Boats ===== */
    {
      id: 'traxxas-m41-6s', model: 'Traxxas M41 6S', brands: ['Traxxas'],
      name_ar: 'قارب سباق كاتاماران بمحرك براشلس', name_en: 'Brushless Catamaran Race Boat',
      desc_ar: 'قارب سباق كاتاماران من Traxxas بمحرك كهربائي بدون فرش (براشلس) يعمل على بطاريات 6S.' + CONTACT_AR,
      desc_en: 'A Traxxas catamaran race boat with a brushless electric motor running on 6S LiPo.' + CONTACT_EN,
      category: 'boats', scales: [], level: 'pro', featured: 26, inStock: true, price: null,
      specs: { power: { ar: 'كهربائي براشلس', en: 'Brushless electric' }, cells: '6S', hull: { ar: 'كاتاماران', en: 'Catamaran' } },
      tags: ['traxxas', 'm41', 'boat', 'catamaran', 'brushless', 'قارب', 'لانش', 'مركب', 'تراكساس'],
      photos: ['boats-225', 'boats-226', 'boats-228', 'boats-224', 'boats-227']
    },
    {
      id: 'proboat-blackjack-42', model: 'Pro Boat Blackjack 42 8S', brands: ['Pro Boat'],
      name_ar: 'قارب كاتاماران 42 بوصة براشلس', name_en: '42-inch Brushless Catamaran',
      desc_ar: 'قارب سباق كاتاماران بطول 42 بوصة بمحرك براشلس يعمل على 8S، جاهز للتشغيل مع تقنية Spektrum Smart.' + CONTACT_AR,
      desc_en: 'A 42-inch brushless catamaran race boat for 8S, ready to run with Spektrum Smart technology.' + CONTACT_EN,
      category: 'boats', scales: [], level: 'pro', featured: 25, inStock: true, price: null,
      specs: { power: { ar: 'كهربائي براشلس', en: 'Brushless electric' }, cells: '8S', hull: { ar: 'كاتاماران', en: 'Catamaran' }, version: 'RTR' },
      tags: ['pro boat', 'proboat', 'blackjack', '42', '8s', 'catamaran', 'spektrum', 'قارب', 'لانش', 'مركب'],
      photos: ['boats-n03']
    }
  ];

  /* ---------- Level shortcuts: typical first models listed first (then the rest by weight) ---------- */
  window.VOLT_LEVEL_ORDER = {
    beginner: ['foam-trainer-3ch', 'foam-trainer-4ch-gyro', 'cessna-foam-trainer', 'foam-glider-trainer', 'traxxas-trx4m-high-trail', 'traxxas-e-revo-116', 'arrma-typhon-grom', 'mini-drift-128', 'mini-drift-124', 'drift-116-4wd'],
    intermediate: ['traxxas-slash-vxl', 'traxxas-maxx-v2', 'traxxas-4-tec-drift', 'hpi-rs4', 'drift-114-rwd', 'panther-touring-rtr', 'foam-sport-trainer', 'losi-promoto-mx'],
    pro: ['losi-5ive-t-3', 'fg-15-buggy', 'rofun-baja-5t', 'fg-baja-beetle', 'fg-16-monster-2wd', 'petrol-chassis-15', 'traxxas-x-maxx-8s', 'arrma-kraton-6s-v6', 'arrma-mojave-6s', 'arrma-mojave-exb', 'arrma-big-rock-6s', 'arrma-talion-exb-6s', 'traxxas-e-revo-6s', 'arrma-kraton-exb-roller', 'traxxas-desert-truck-fox', 'hpi-wr8', 'mst-110-drift', 'traxxas-m41-6s', 'proboat-blackjack-42']
  };

  /* ---------- Featured product (+ which real photo to show large) ---------- */
  window.VOLT_FEATURED = { productId: 'losi-5ive-t-3', photo: 'shop-011' };
})();
