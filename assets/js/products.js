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
       Some tools use Creative Commons photos (CC helper, credited); their art: '<name>'
       line illustration (#art-<name>) stays behind the photo as a fallback if it fails to load.
     • level (beginner | intermediate | pro) only on complete vehicles; parts, tools,
       electronics and plane accessories have level: null (never in level results).
     • No prices on the site (price: null) — the shop confirms price and availability.
     • Specs are well-known type facts only (scale, petrol / electric / nitro,
       drive, cell count when it is part of the model name). No speeds, no
       prices, no invented numbers.

   Product shape:
     id, model (English, both languages), brands [..], name_ar / name_en
     (descriptor), desc_ar / desc_en, category (baja | offroad | planes |
     drift | parts | power | tools | electronics | boats), scales [..], level, featured (sort weight), inStock,
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
  /* Creative Commons photos (attribution required): credited in the footer "Photo credits"
     dialog and under the photo in quick view. Files: assets/img/shop/{full,thumb}/<key>.jpg */
  window.VOLT_PHOTO_CREDITS = {
    'tools-cc-nut-drivers-1': { product: 'nut-driver-set', author: 'Steve Rider', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', source: 'https://commons.wikimedia.org/wiki/File:Xcelite_Nut_driver.jpg', size: [600, 450, 1400, 1050] },
    'tools-cc-nut-drivers-2': { product: 'nut-driver-set', author: 'lmorchard', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://www.flickr.com/photos/35034355597@N01/24684318539', size: [600, 445, 1024, 760] },
    'tools-cc-body-reamer-1': { product: 'body-reamer', author: '魔私利戸', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', source: 'https://commons.wikimedia.org/wiki/File:Taper_reamer_K-444.jpg', size: [600, 444, 1400, 1035] },
    'tools-cc-body-reamer-2': { product: 'body-reamer', author: '魔私利戸', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', source: 'https://commons.wikimedia.org/wiki/File:Taper_reamer_K-442.jpg', size: [600, 511, 1400, 1192] },
    'tools-cc-setup-station-1': { product: 'setup-station', author: 'Vi4oto', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', source: 'https://commons.wikimedia.org/wiki/File:Mugen_mtx5.jpg', size: [450, 600, 1050, 1400] },
    'tools-cc-tire-balancer-1': { product: 'tire-balancer', author: 'K. Murray', license: 'CC BY-SA 3.0', licenseUrl: 'http://creativecommons.org/licenses/by-sa/3.0/', source: 'https://commons.wikimedia.org/wiki/File:Wheel_balancing_tool.jpg', size: [600, 450, 800, 600] },
    'tools-cc-tire-balancer-2': { product: 'tire-balancer', author: 'ProjectManhattan', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', source: 'https://commons.wikimedia.org/wiki/File:Wheel_balancing.jpg', size: [600, 337, 1400, 787] },
    'tools-cc-pit-mat-1': { product: 'pit-mat-magnetic', author: 'Zintosch7', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:Workbench_of_a_bicycle_dealer.jpg', size: [600, 450, 1400, 1050] },
    'tools-cc-pit-mat-2': { product: 'pit-mat-magnetic', author: 'btwashburn', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Garage_Workbench_-_(1).jpg', size: [600, 450, 1400, 1050] },
    'tools-cc-lipo-charger-1': { product: 'lipo-balance-charger-dual', author: 'SokilFPV', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:ToolkitRC_M8S_LiPo_battery_charger.jpg', size: [600, 450, 1400, 1050] },
    'tools-cc-lipo-charger-2': { product: 'lipo-balance-charger-dual', author: 'Teardown Central', license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0', source: 'https://commons.wikimedia.org/wiki/File:Turnigy_Accucel_6_(7758024940).jpg', size: [600, 400, 1400, 933] },
    'tools-cc-spark-plug-tool-1': { product: 'spark-plug-clutch-tool', author: 'SSC-Aviation', license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/', source: 'https://www.flickr.com/photos/116745893@N02/12640075785', size: [600, 400, 1008, 672] }
  };
  var CC = function (key) {
    var c = window.VOLT_PHOTO_CREDITS[key];
    return { src: 'assets/img/shop/full/' + key + '.jpg', thumb: 'assets/img/shop/thumb/' + key + '.jpg', size: c.size, credit: key };
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
    { id: 'power' },
    { id: 'tools' },
    { id: 'electronics' },
    { id: 'boats' }
  ];

  /* ---------- Brands the shop deals in (shown as text only — no logos) ---------- */
  window.VOLT_BRANDS = ['Losi', 'Arrma', 'Traxxas', 'HPI', 'Rovan', 'King Motor', 'FG', 'Rofun', 'MST', 'HSP', 'Xray', 'Kyosho', 'Thunder Tiger', 'Spektrum', 'Pro Boat', 'Zenoah', 'DDM', 'SkyRC', 'HTRC', 'Radiolink', 'CNHL', 'HRB', 'Dynamite', 'Turbo Racing', 'Venom', 'HUDY', 'Pro-Line', 'iMAX', 'AustarHobby', 'Pineal Model', 'Outerwears'];

  var PETROL = { ar: 'بنزين', en: 'Petrol' };
  var ELECTRIC = { ar: 'كهربائي', en: 'Electric' };
  var EPO = { ar: 'فوم EPO متين', en: 'Tough EPO foam' };
  var ASK = { ar: 'استفسر عن الطرازات المتوفرة', en: 'Ask for available models' };
  var CONTACT_AR = ' استفسر عن السعر والتوفر عبر واتساب.';
  var CONTACT_EN = ' Contact us for price and availability.';

  /* ---------- Products ---------- */
  window.VOLT_PRODUCTS = [
    /* ===== Baja & 1/5 ===== */
    {
      id: 'losi-5ive-t-3', model: 'Losi 5IVE-T 3.0', brands: ['Losi'],
      name_ar: 'شاحنة 1/5 بمحرك بنزين ودفع رباعي', name_en: '1/5 Petrol 4WD Truck',
      desc_ar: 'أكبر إصدارات Losi 5IVE-T العاملة بالبنزين وأقواها، لهواة السيارات الكبيرة على الرمال والطرق الوعرة. مقاس 1/5 بدفع رباعي ومحرك سعة 35.2cc، وتأتي جاهزة للتشغيل (RTR) مع جهاز التحكم Spektrum DX3 Smart.' + CONTACT_AR,
      desc_en: 'A big 1/5-scale petrol truck with four-wheel drive for sand and rough ground.' + CONTACT_EN,
      category: 'baja', scales: ['1/5'], level: 'pro', featured: 100, inStock: true, price: null,
      specs: { power: PETROL, drive: '4WD' },
      tags: ['losi', '5ive', 'five-t', '12s', 'baja', 'petrol', 'باجا', 'بنزين', 'لوسي', 'عربية', 'عربيات'],
      photos: ['baja-008', 'baja-009', 'shop-010', 'shop-010', 'shop-007']
    },
    {
      id: 'fg-15-buggy', model: 'FG 1/5 Buggy', brands: ['FG'],
      name_ar: 'باجي 1/5 بمحرك بنزين', name_en: '1/5 Petrol Buggy',
      desc_ar: 'باجي كبير مقاس 1/5 من FG بمحرك بنزين، لهواة الأحجام الكبيرة وصوت محرك البنزين الحقيقي. خيار مناسب للمحترفين.' + CONTACT_AR,
      desc_en: 'A large 1/5-scale petrol buggy from FG.' + CONTACT_EN,
      category: 'baja', scales: ['1/5'], level: 'pro', featured: 97, inStock: true, price: null,
      specs: { power: PETROL },
      tags: ['fg', 'buggy', 'petrol', 'باجي', 'بنزين', 'عربية', 'عربيات'],
      photos: range('baja', 23, 27)
    },
    {
      id: 'fg-baja-beetle', model: 'FG Baja Beetle 1/5', brands: ['FG'],
      name_ar: 'سيارة 1/5 بمحرك بنزين وهيكل كلاسيكي', name_en: '1/5 Petrol Baja Car',
      desc_ar: 'سيارة مقاس 1/5 من FG بمحرك بنزين وهيكل خارجي على طراز Beetle الكلاسيكي، تجمع بين الحجم الكبير والتصميم المميز. مناسبة للمحترفين وهواة سيارات البنزين.' + CONTACT_AR,
      desc_en: 'A 1/5-scale petrol Baja car from FG.' + CONTACT_EN,
      category: 'baja', scales: ['1/5'], level: 'pro', featured: 95, inStock: true, price: null,
      specs: { power: PETROL },
      tags: ['fg', 'beetle', 'baja', 'petrol', 'باجا', 'بنزين', 'عربية', 'عربيات'],
      photos: range('baja', 130, 134)
    },
    {
      id: 'rofun-baja-5t', model: 'Rofun Baja 5T 1/5 32cc', brands: ['Rofun'],
      name_ar: 'شاحنة باجا 1/5 بمحرك بنزين 32cc', name_en: '1/5 Petrol Baja Truck (32cc)',
      desc_ar: 'إصدار Rofun من شاحنة الباجا 5T مقاس 1/5، بمحرك بنزين ثنائي الأشواط سعة 32cc وقوة 3.24 حصان، ودفع خلفي. تزن 13.5 كجم، وهي موجهة للمحترفين وعشاق سيارات البنزين الكبيرة.' + CONTACT_AR,
      desc_en: 'A 1/5-scale Baja truck with a 32cc petrol engine, from Rofun.' + CONTACT_EN,
      category: 'baja', scales: ['1/5'], level: 'pro', featured: 93, inStock: true, price: null,
      specs: { power: { ar: 'بنزين 32cc', en: 'Petrol 32cc' } },
      tags: ['rofun', 'baja', '5t', '32cc', 'petrol', 'باجا', 'بنزين', 'عربية', 'عربيات'],
      photos: ['baja-210', 'baja-211', 'baja-209', 'baja-212', 'baja-213', 'baja-wa-520-baha-5t-1-5-32cc-5'],
      specs: {"engine":"32cc 2-stroke petrol (38 mm bore x 28 mm stroke)","drivetrain":"RWD","dimensions":"970 x 440 x 340 mm (L x W x H)","wheelbase":"570 mm","weight":"13.5 kg net","output":"3.24 HP @ 13,000 rpm"}, specSource: true
    },
    {
      id: 'fg-16-monster-2wd', model: 'FG 1/6 Monster Truck 2WD', brands: ['FG'],
      name_ar: 'مونستر تراك 1/6 بنزين بدفع ثنائي', name_en: '1/6 Petrol 2WD Monster Truck',
      desc_ar: 'مونستر تراك كبير مقاس 1/6 من FG بمحرك بنزين ودفع ثنائي، لهواة الأحجام الكبيرة وصوت محرك البنزين. مناسب للمحترفين.' + CONTACT_AR,
      desc_en: 'A big 1/6-scale petrol monster truck with two-wheel drive, from FG.' + CONTACT_EN,
      category: 'baja', scales: ['1/6'], level: 'pro', featured: 91, inStock: true, price: null,
      specs: { power: PETROL, drive: '2WD' },
      tags: ['jeep', 'rubicon', 'led', 'fg', 'monster', 'truck', 'petrol', 'مونستر', 'بنزين', 'عربية', 'عربيات', 'مونستر تراك'],
      photos: ['offroad-n04', 'offroad-n01'].concat(range('baja', 214, 218))
    },
    {
      id: 'petrol-chassis-15', model: '1/5 Petrol Chassis', brands: [],
      name_ar: 'شاسيه 1/5 بمحرك بنزين', name_en: '1/5 Petrol Chassis',
      desc_ar: 'شاسيه مقاس 1/5 مزود بمحرك بنزين، لمن يجمّع سيارته بنفسه أو يبحث عن شاسيه بديل. راسلنا عبر واتساب لمعرفة التفاصيل والطرازات المتوافقة.',
      desc_en: 'A 1/5-scale petrol chassis — ask us for the details and compatible models.',
      category: 'baja', scales: ['1/5'], level: 'pro', featured: 89, inStock: true, price: null,
      specs: { power: PETROL, version: ASK },
      tags: ['baja 5b', 'chassis', 'petrol', 'baja', 'شاسيه', 'بنزين'],
      photos: ['baja-121', 'baja-122', 'baja-123', 'baja-125', 'baja-n19']
    },
    {
      id: 'losi-obr-15', model: 'Losi 1/5 OBR', brands: ['Losi'],
      name_ar: 'سيارة 1/5 براشلس للأسفلت والأوف رود', name_en: '1/5 Brushless On/Off-road Car',
      desc_ar: 'سيارة كبيرة مقاس 1/5 من Losi بمحرك براشلس، تسير على الأسفلت والطرق الوعرة بالكفاءة نفسها، وتناسب المحترفين. شاهدها أثناء التشغيل في قسم الفيديوهات.' + CONTACT_AR,
      desc_en: 'A big 1/5-scale brushless car for on- and off-road driving — see it running in the videos section.' + CONTACT_EN,
      category: 'baja', scales: ['1/5'], level: 'pro', featured: 88, inStock: true, price: null,
      specs: { power: { ar: 'كهربائي براشلس', en: 'Brushless electric' }, use: { ar: 'أسفلت وأوف رود', en: 'On- & off-road' } },
      tags: ['losi', 'obr', '1/5', 'brushless', 'mini cooper', 'لوسي', 'براشلس', 'عربية', 'عربيات'],
      images: [
        { src: 'assets/video/losi-obr-road-run.jpg', thumb: 'assets/video/losi-obr-road-run.jpg', size: [1280, 720, 1280, 720] },
        { src: 'assets/video/losi-obr-mini-cooper.jpg', thumb: 'assets/video/losi-obr-mini-cooper.jpg', size: [1280, 720, 1280, 720] }
      ]
    },

    /* ===== Off-road ===== */
    {
      id: 'traxxas-x-maxx-8s', model: 'Traxxas X-Maxx 8S', brands: ['Traxxas'],
      name_ar: 'مونستر تراك 1/5 كهربائي بدفع رباعي', name_en: '1/5 Electric 4WD Monster Truck',
      desc_ar: 'مونستر تراك كبير من Traxxas مقاس 1/5 بدفع رباعي ومحرك 1200XL. يعمل بنظام 8S (بطاريتان 4S) وتتجاوز سرعته 50 ميلًا في الساعة، للمحترفين وهواة القفزات.' + CONTACT_AR,
      desc_en: 'A big 1/5-scale electric monster truck with four-wheel drive.' + CONTACT_EN,
      category: 'offroad', scales: ['1/5'], level: 'pro', featured: 90, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', cells: '8S' },
      tags: ['traxxas', 'x-maxx', 'xmaxx', 'x maxx', 'monster', 'electric', 'مونستر', 'تراكساس', 'عربية', 'عربيات', 'مونستر تراك'],
      photos: ['offroad-194', 'offroad-195', 'offroad-197', 'offroad-198', 'offroad-199', 'offroad-201', 'offroad-202', 'offroad-203', 'offroad-012', 'offroad-013', 'offroad-014', 'offroad-015', 'offroad-016']
    },
    {
      id: 'traxxas-maxx-v2', model: 'Traxxas Maxx V2', brands: ['Traxxas'],
      name_ar: 'مونستر تراك 1/10 كهربائي بدفع رباعي', name_en: '1/10 Electric 4WD Monster Truck',
      desc_ar: 'مونستر تراك مقاس 1/10 من Traxxas لأصحاب الخبرة المتوسطة، بنظام تعليق WideMaxx الذي يوسّع المسافة بين العجلات 20 مم من كل جانب، مع إطارات Sledgehammer. يدفعه محرك براشلس 540XL إلى أكثر من 60 ميلًا في الساعة على 4S، ويأتي جاهزًا للتشغيل (RTR) مع جهاز التحكم TQi.' + CONTACT_AR,
      desc_en: 'A 1/10-scale electric monster truck with four-wheel drive and 4S power.' + CONTACT_EN,
      category: 'offroad', scales: ['1/10'], level: 'intermediate', featured: 86, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', cells: '4S' },
      tags: ['traxxas', 'maxx', 'monster', 'electric', 'مونستر', 'تراكساس', 'عربية', 'عربيات', 'مونستر تراك'],
      photos: ['offroad-028', 'offroad-029', 'offroad-031']
    },
    {
      id: 'traxxas-slash-vxl', model: 'Traxxas Slash VXL', brands: ['Traxxas'],
      name_ar: 'سيارة شورت كورس 1/10 بدفع خلفي', name_en: '1/10 2WD Short-Course Truck',
      desc_ar: 'سيارة شورت كورس مقاس 1/10 من Traxxas بدفع خلفي ومحرك براشلس وجهاز التحكم TQi. ممتعة على التراب والأسفلت، وخطوة تالية مناسبة بعد السيارة الأولى.' + CONTACT_AR,
      desc_en: 'A 1/10-scale two-wheel-drive short-course truck with a brushless motor and the TQi radio.' + CONTACT_EN,
      category: 'offroad', scales: ['1/10'], level: 'intermediate', featured: 89, inStock: true, price: null,
      specs: { power: { ar: 'كهربائي براشلس', en: 'Brushless electric' }, drive: '2WD', radio: 'Traxxas TQi' },
      tags: ['traxxas', 'slash', 'vxl', 'short course', 'brushless', 'شورت كورس', 'تراكساس', 'عربية', 'عربيات'],
      photos: ['offroad-n09']
    },
    {
      id: 'traxxas-trx4m-high-trail', model: 'Traxxas TRX-4M High Trail Cheyenne', brands: ['Traxxas'],
      name_ar: 'كراولر 1/18 للتسلق والمسارات الوعرة', name_en: '1/18 Scale & Trail Crawler',
      desc_ar: 'كراولر صغير مقاس 1/18 من Traxxas بهيكل بيك أب كلاسيكي، للتسلق على الصخور والتنقل في المسارات الوعرة. سهل القيادة ومناسب للمبتدئين.' + CONTACT_AR,
      desc_en: 'A small 1/18-scale scale-and-trail crawler with a classic pickup body, for crawling and rough trails.' + CONTACT_EN,
      category: 'offroad', scales: ['1/18'], level: 'beginner', featured: 87, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', use: { ar: 'التسلق والمسارات الوعرة', en: 'Crawling & trails' } },
      tags: ['traxxas', 'trx-4m', 'trx4m', 'crawler', 'trail', 'cheyenne', 'كراولر', 'تسلق', 'عربية', 'عربيات'],
      photos: ['offroad-n10']
    },
    {
      id: 'arrma-mojave-6s', model: 'Arrma Mojave 6S 1/7', brands: ['Arrma'],
      name_ar: 'ديزرت تراك 1/7 كهربائي بدفع رباعي', name_en: '1/7 Electric 4WD Desert Truck',
      desc_ar: 'ديزرت تراك كهربائي مقاس 1/7 من Arrma بدفع رباعي، يعمل ببطارية 6S. مصمم للرمال والسرعة في المساحات المفتوحة، ومناسب للمحترفين.' + CONTACT_AR,
      desc_en: 'A 1/7-scale electric desert truck with four-wheel drive.' + CONTACT_EN,
      category: 'offroad', scales: ['1/7'], level: 'pro', featured: 84, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', cells: '6S' },
      tags: ['arrma', 'mojave', 'desert', 'electric', 'أرما', 'صحراء', 'عربية', 'عربيات', 'ديزرت تراك'],
      photos: range('offroad', 98, 101)
    },
    {
      id: 'arrma-mojave-exb', model: 'Arrma Mojave EXB 1/7', brands: ['Arrma'],
      name_ar: 'ديزرت تراك 1/7 كهربائي EXB', name_en: '1/7 Electric 4WD Desert Truck (EXB)',
      desc_ar: 'إصدار EXB (Extreme Bash) من ديزرت تراك Mojave مقاس 1/7 من Arrma، كهربائي بدفع رباعي ومصمم لتحمّل القيادة القاسية. للمحترفين وهواة القفز على الرمال.' + CONTACT_AR,
      desc_en: 'The EXB version of the 1/7-scale electric four-wheel-drive desert truck.' + CONTACT_EN,
      category: 'offroad', scales: ['1/7'], level: 'pro', featured: 83, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD' },
      tags: ['arrma', 'mojave', 'exb', 'desert', 'electric', 'أرما', 'صحراء', 'عربية', 'عربيات', 'ديزرت تراك'],
      photos: range('offroad', 167, 171)
    },
    {
      id: 'arrma-kraton-6s-v6', model: 'Arrma Kraton 6S v6 1/8', brands: ['Arrma'],
      name_ar: 'تراجي 1/8 كهربائي بدفع رباعي', name_en: '1/8 Electric 4WD Truggy',
      desc_ar: 'الجيل السادس (V6) من Arrma Kraton 6S مقاس 1/8، بدفع رباعي ومحرك براشلس Firma 2050Kv ومنظم سرعة 150A مقاوم للماء. يعمل على 4S أو 6S وتتجاوز سرعته 105 كم/ساعة، ويأتي جاهزًا للتشغيل (RTR) للمحترفين.' + CONTACT_AR,
      desc_en: 'A 1/8-scale electric truggy with four-wheel drive — a mix of buggy and truck.' + CONTACT_EN,
      category: 'offroad', scales: ['1/8'], level: 'pro', featured: 82, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', cells: '6S' },
      tags: ['arrma', 'kraton', 'truggy', 'electric', 'أرما', 'تراغي', 'عربية', 'عربيات', 'تراجي'],
      photos: ['offroad-103', 'offroad-105', 'offroad-229', 'offroad-230', 'offroad-n06', 'offroad-n18']
    },
    {
      id: 'arrma-big-rock-6s', model: 'Arrma Big Rock Crew Cab 6S BLX', brands: ['Arrma'],
      name_ar: 'مونستر تراك 1/7 جاهز للتشغيل', name_en: '1/7 4WD Monster Truck RTR',
      desc_ar: 'مونستر تراك Big Rock Crew Cab من Arrma مقاس 1/7، بدفع رباعي ومحرك براشلس يعمل ببطارية 6S. يأتي جاهزًا للتشغيل (RTR) بهيكل بيك أب بكابينة مزدوجة، للمحترفين وهواة القفزات.' + CONTACT_AR,
      desc_en: 'A 1/7-scale four-wheel-drive brushless monster truck for 6S, ready to run.' + CONTACT_EN,
      category: 'offroad', scales: ['1/7'], level: 'pro', featured: 90, inStock: true, price: null,
      specs: { power: { ar: 'كهربائي براشلس', en: 'Brushless electric' }, drive: '4WD', cells: '6S', version: 'RTR' },
      tags: ['arrma', 'big rock', 'crew cab', '6s', 'blx', 'monster', 'rtr', 'مونستر', 'أرما', 'عربية', 'عربيات', 'مونستر تراك'],
      photos: ['offroad-n17']
    },
    {
      id: 'arrma-kraton-exb-roller', model: 'Arrma Kraton EXB Roller', brands: ['Arrma'],
      name_ar: 'شاسيه 1/8 رولر بدون إلكترونيات', name_en: '1/8 4WD Roller (no electronics)',
      desc_ar: 'إصدار Roller من Kraton EXB: سيارة مكتملة مقاس 1/8 بدفع رباعي من دون محرك أو سيرفو أو جهاز تحكم، لتركّب الإلكترونيات التي تختارها. مناسب للمحترفين الذين يفضّلون إعداداتهم الخاصة.' + CONTACT_AR,
      desc_en: 'The Full Option Roller: a complete rolling chassis without motor, servo or radio, so you fit the electronics you choose.' + CONTACT_EN,
      category: 'offroad', scales: ['1/8'], level: 'pro', featured: 84, inStock: true, price: null,
      specs: { drive: '4WD', version: { ar: 'رولر بدون إلكترونيات', en: 'Roller — no electronics' } },
      tags: ['arrma', 'kraton', 'exb', 'roller', 'رولر', 'شاسيه', 'أرما'],
      photos: ['offroad-n14', 'offroad-n12', 'offroad-n13']
    },
    {
      id: 'arrma-talion-exb-6s', model: 'Arrma Talion EXB 6S 1/7', brands: ['Arrma'],
      name_ar: 'تراجي 1/7 كهربائي بدفع رباعي', name_en: '1/7 Electric 4WD Truggy',
      desc_ar: 'إصدار EXB من Arrma Talion 6S مقاس 1/7، بدفع رباعي وثلاثة تروس تفاضلية وشاسيه من الألومنيوم 7075-T6. يعمل على 4S أو 6S وتتجاوز سرعته 120 كم/ساعة، ويأتي جاهزًا للتشغيل (RTR) للمحترفين.' + CONTACT_AR,
      desc_en: 'A 1/7-scale electric truggy with four-wheel drive for rough ground.' + CONTACT_EN,
      category: 'offroad', scales: ['1/7'], level: 'pro', featured: 81, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', cells: '6S' },
      tags: ['arrma', 'talion', 'exb', 'truggy', 'electric', 'أرما', 'تراغي', 'عربية', 'عربيات', 'تراجي'],
      photos: ['offroad-017', 'offroad-wa-521-arrma-talion-6s-2', 'offroad-wa-521-arrma-talion-6s-3']
    },
    {
      id: 'arrma-typhon-grom', model: 'Arrma Typhon Grom', brands: ['Arrma'],
      name_ar: 'باجي صغير 1/18 كهربائي', name_en: '1/18 Electric 4WD Mini Buggy',
      desc_ar: 'باجي صغير مقاس 1/18 من Arrma بدفع رباعي، يجمع بين الحجم المدمج والمتعة الكبيرة. سهل القيادة ومناسب للمبتدئين.' + CONTACT_AR,
      desc_en: 'A small 1/18-scale electric four-wheel-drive buggy — small size, big fun.' + CONTACT_EN,
      category: 'offroad', scales: ['1/18'], level: 'beginner', featured: 78, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD' },
      tags: ['arrma', 'typhon', 'grom', 'mini', 'buggy', 'أرما', 'باجي', 'عربية', 'عربيات'],
      photos: ['offroad-234', 'offroad-235', 'offroad-237']
    },
    {
      id: 'traxxas-e-revo-116', model: 'Traxxas E-Revo 1/16', brands: ['Traxxas'],
      name_ar: 'مونستر تراك صغير 1/16 كهربائي', name_en: '1/16 Electric 4WD Mini Monster Truck',
      desc_ar: 'النسخة المصغّرة من Traxxas E-Revo مقاس 1/16، بدفع رباعي كامل وتروس تفاضلية محكمة الإغلاق. يأتي جاهزًا للتشغيل (RTR) مع جهاز التحكم TQ 2.4GHz وبطارية NiMH بسعة 1200mAh، ومناسب للمبتدئين.' + CONTACT_AR,
      desc_en: 'A small 1/16-scale electric four-wheel-drive monster truck.' + CONTACT_EN,
      category: 'offroad', scales: ['1/16'], level: 'beginner', featured: 77, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD' },
      tags: ['traxxas', 'e-revo', 'erevo', 'e revo', 'mini', 'monster', 'مونستر', 'تراكساس', 'عربية', 'عربيات', 'مونستر تراك'],
      photos: range('offroad', 150, 154)
    },
    {
      id: 'traxxas-e-revo-6s', model: 'Traxxas E-Revo 6S', brands: ['Traxxas'],
      name_ar: 'مونستر تراك كهربائي 6S بدفع رباعي', name_en: 'Electric 4WD Monster Truck',
      desc_ar: 'مونستر تراك E-Revo من Traxxas بدفع رباعي، يعمل ببطارية 6S. للمحترفين وهواة السرعة والقفزات.' + CONTACT_AR,
      desc_en: 'An electric four-wheel-drive monster truck with 6S power.' + CONTACT_EN,
      category: 'offroad', scales: [], level: 'pro', featured: 76, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD', cells: '6S' },
      tags: ['traxxas', 'e-revo', 'erevo', 'e revo', 'monster', 'مونستر', 'تراكساس', 'عربية', 'عربيات', 'مونستر تراك'],
      photos: range('offroad', 186, 188)
    },
    {
      id: 'traxxas-desert-truck-fox', model: 'Traxxas Desert Truck (Fox body)', brands: ['Traxxas'],
      name_ar: 'ديزرت تراك بهيكل Fox', name_en: 'Desert Truck with Fox Body',
      desc_ar: 'ديزرت تراك من Traxxas بهيكل خارجي بتصميم Fox، مصمم للرمال والمساحات المفتوحة ومناسب للمحترفين. يتغيّر الإصدار المتوفر من وقت لآخر، لذا تواصل معنا عبر واتساب لمعرفة الإصدار الحالي والسعر.',
      desc_en: 'A Traxxas desert truck with a Fox body — ask us about the version available.',
      category: 'offroad', scales: [], level: 'pro', featured: 75, inStock: true, price: null,
      specs: { version: ASK },
      tags: ['traxxas', 'desert', 'fox', 'truck', 'صحراء', 'تراكساس', 'عربية', 'عربيات', 'ديزرت تراك'],
      photos: range('offroad', 155, 158)
    },
    {
      id: 'losi-promoto-mx', model: 'Losi Promoto-MX 1/4 Motorcycle', brands: ['Losi'],
      name_ar: 'دراجة موتوكروس كهربائية 1/4', name_en: '1/4 Electric Motocross Bike, RTR',
      desc_ar: 'دراجة موتوكروس مقاس 1/4 من Losi، تحاكي في شكلها وحركتها الدراجة النارية الحقيقية. تأتي جاهزة للتشغيل (RTR) مع البطارية والشاحن، وتناسب أصحاب الخبرة المتوسطة.' + CONTACT_AR,
      desc_en: 'A 1/4-scale electric motocross bike, ready to run with battery and charger.' + CONTACT_EN,
      category: 'offroad', scales: ['1/4'], level: 'intermediate', featured: 74, inStock: true, price: null,
      specs: { power: ELECTRIC, version: { ar: 'جاهز للتشغيل مع البطارية والشاحن', en: 'RTR with battery & charger' } },
      tags: ['losi', 'promoto', 'motorcycle', 'bike', 'motocross', 'دراجة', 'موتوسيكل', 'موتوكروس'],
      photos: ['offroad-219', 'offroad-220', 'offroad-222']
    },
    {
      id: 'savage-maxx-bodies', model: 'HPI Savage & Traxxas Maxx Bodies', brands: ['HPI', 'Traxxas'],
      name_ar: 'هياكل بديلة لسيارات مونستر تراك', name_en: 'Monster Truck Bodies',
      desc_ar: 'هياكل خارجية (بودي) بديلة لسيارات HPI Savage وسيارات Traxxas Maxx. تواصل معنا عبر واتساب لمعرفة الأشكال والألوان المتوفرة.',
      desc_en: 'Bodies for HPI Savage and Traxxas Maxx monster trucks — ask about the shapes and colours available.',
      category: 'offroad', scales: [], level: null, featured: 60, inStock: true, price: null,
      specs: { compat: { ar: 'HPI Savage · Traxxas Maxx', en: 'HPI Savage · Traxxas Maxx' } },
      tags: ['body', 'bodies', 'savage', 'maxx', 'hpi', 'traxxas', 'هيكل', 'بودي', 'مونستر'],
      photos: range('offroad', 18, 22)
    },

    /* ===== Planes ===== */
    {
      id: 'foam-trainer-3ch', model: 'Foam Trainer 3CH', brands: [],
      name_ar: 'طائرة تدريب فوم 3 قنوات', name_en: '3-Channel Foam Trainer',
      desc_ar: 'طائرة تدريب بجناح علوي مصنوعة من فوم EPO المتين، تتحمّل الصدمات وتطير بثبات وهدوء. بداية مناسبة لتجربة الطيران الأولى.' + CONTACT_AR,
      desc_en: 'A high-wing trainer made of tough EPO foam — crash-resistant and ideal for your first flights.',
      category: 'planes', scales: [], level: 'beginner', featured: 72, inStock: true, price: null,
      specs: { build: EPO, channels: '3CH', wing: { ar: 'جناح علوي', en: 'High wing' } },
      tags: ['plane', 'trainer', 'foam', 'epo', 'طائرة', 'فوم', 'تدريب', 'طيارة', 'طيارات'],
      images: [PX('3841145')]
    },
    {
      id: 'foam-trainer-4ch-gyro', model: 'Foam Trainer 4CH + Gyro', brands: [],
      name_ar: 'طائرة تدريب فوم 4 قنوات بجايرو', name_en: '4-Channel Foam Trainer with Gyro',
      desc_ar: 'طائرة تدريب من فوم EPO بأربع قنوات وجايرو يساعد على ثبات الطيران. الخطوة التالية للمبتدئين بعد طائرات القنوات الثلاث.' + CONTACT_AR,
      desc_en: 'A 4-channel EPO foam trainer with a gyro that helps keep flight steady — the next step after 3-channel trainers.',
      category: 'planes', scales: [], level: 'beginner', featured: 71, inStock: true, price: null,
      specs: { build: EPO, channels: '4CH', extras: { ar: 'جايرو للثبات', en: 'Stabilising gyro' } },
      tags: ['plane', 'trainer', 'foam', 'gyro', 'طائرة', 'فوم', 'جايرو', 'طيارة', 'طيارات'],
      images: [U('1764836671873-5e2c4b777daf')]
    },
    {
      id: 'foam-glider-trainer', model: 'Foam Glider Trainer', brands: [],
      name_ar: 'طائرة شراعية فوم للتدريب', name_en: 'Foam Glider Trainer',
      desc_ar: 'طائرة شراعية (جلايدر) من فوم EPO بجناح طويل، تطير ببطء وهدوء. مناسبة للمبتدئين لتعلّم أساسيات التحكم بسهولة.' + CONTACT_AR,
      desc_en: 'An EPO foam glider with long wings and slow, calm flight — easy to learn with.',
      category: 'planes', scales: [], level: 'beginner', featured: 58, inStock: true, price: null,
      specs: { build: EPO, wing: { ar: 'جناح طويل', en: 'Long wing' } },
      tags: ['glider', 'plane', 'foam', 'شراعية', 'طائرة', 'فوم', 'طيارة', 'طيارات', 'جلايدر'],
      images: [U('1759072865254-d4e9b204d291')]
    },
    {
      id: 'cessna-foam-trainer', model: 'Cessna-style Foam Trainer', brands: [],
      name_ar: 'طائرة تدريب فوم بتصميم كلاسيكي', name_en: 'Light-aircraft Style Foam Trainer',
      desc_ar: 'طائرة تدريب من فوم EPO على طراز الطائرات الخفيفة ذات الجناح العلوي. متينة وسهلة الطيران، ومناسبة للمبتدئين.' + CONTACT_AR,
      desc_en: 'An EPO foam trainer shaped like classic high-wing light aircraft — tough and easy to fly.',
      category: 'planes', scales: [], level: 'beginner', featured: 57, inStock: true, price: null,
      specs: { build: EPO, wing: { ar: 'جناح علوي', en: 'High wing' } },
      tags: ['plane', 'trainer', 'foam', 'طائرة', 'فوم', 'تدريب', 'طيارة', 'طيارات'],
      images: [U('1689092914752-36601d72b607')]
    },
    {
      id: 'foam-sport-trainer', model: 'Foam Sport Trainer (aileron)', brands: [],
      name_ar: 'طائرة فوم رياضية بأيلرون', name_en: 'Foam Sport Trainer with Ailerons',
      desc_ar: 'طائرة من فوم EPO مزودة بأيلرون (جنيحات تحكم) لأداء مناورات أكثر في الجو. للطيارين الذين تجاوزوا مرحلة طائرات التدريب.' + CONTACT_AR,
      desc_en: 'An EPO foam plane with ailerons for more manoeuvres — for pilots who have mastered trainers.',
      category: 'planes', scales: [], level: 'intermediate', featured: 56, inStock: true, price: null,
      specs: { build: EPO, extras: { ar: 'أيلرون', en: 'Ailerons' } },
      tags: ['plane', 'sport', 'aileron', 'foam', 'طائرة', 'فوم', 'رياضية', 'طيارة', 'طيارات', 'أيلرون'],
      images: [PX('38544903'), PX('38544892')]
    },
    {
      id: 'plane-engines', model: 'Plane Engines (glow/nitro)', brands: [],
      name_ar: 'محركات طائرات جلو ونيترو', name_en: 'Glow / Nitro Plane Engines',
      desc_ar: 'تشكيلة من محركات الجلو والنيترو لطائرات الريموت كنترول. تواصل معنا عبر واتساب لمعرفة الطرازات المتوفرة وأسعارها.',
      desc_en: 'Selection of plane engines available — ask for models.',
      category: 'planes', scales: [], level: null, featured: 76, inStock: true, price: null,
      specs: { power: { ar: 'جلو / نيترو', en: 'Glow / nitro' }, version: ASK },
      tags: ['engine', 'glow', 'nitro', 'plane', 'محرك', 'محركات', 'نيترو', 'طائرة', 'طيارة', 'طيارات', 'موتور', 'مواتير'],
      photos: ['planes-040', 'planes-039', 'planes-pe13', 'planes-pe20', 'planes-pe29', 'planes-pe34', 'planes-pe06', 'planes-pe21'].concat(range('planes', 39, 43))
    },
    {
      id: 'plane-engine-prop-set', model: 'Engine + Propeller & Spinner Set', brands: [],
      name_ar: 'محرك طائرة مع مروحة وسبينر', name_en: 'Engine with propeller & spinner',
      desc_ar: 'محرك جلو ثنائي الأشواط لطائرات الريموت كنترول العاملة بالوقود، يأتي مع مروحة وسبينر.' + CONTACT_AR,
      desc_en: 'A 2-stroke glow RC plane engine supplied with a propeller and spinner.' + CONTACT_EN,
      category: 'planes', scales: [], level: null, featured: 75, inStock: true, price: null,
      specs: { power: { ar: 'جلو ثنائي الأشواط', en: '2-stroke glow' }, extras: { ar: 'مروحة وسبينر', en: 'Propeller & spinner' } },
      tags: ['engine', 'glow', 'nitro', '2-stroke', 'propeller', 'prop', 'spinner', 'محرك', 'مروحة', 'سبينر', 'جلو', 'طيارة', 'طيارات', 'موتور'],
      photos: ['planes-pe29', 'planes-pe28', 'planes-pe30', 'planes-pe33']
    },
    {
      id: 'plane-engine-mufflers', model: 'Engine Mufflers & Exhaust Parts', brands: [],
      name_ar: 'كواتم صوت وقطع عادم للمحركات', name_en: 'Engine mufflers & exhaust parts',
      desc_ar: 'كواتم صوت (شكمانات) وقطع عادم لمحركات طائرات الجلو. أرسل إلينا طراز المحرك لنرشّح لك القطعة المناسبة.' + CONTACT_AR,
      desc_en: 'Mufflers and exhaust parts for glow plane engines — tell us your engine model.' + CONTACT_EN,
      category: 'planes', scales: [], level: null, featured: 70, inStock: true, price: null,
      specs: { use: { ar: 'محركات الجلو', en: 'Glow engines' } },
      tags: ['muffler', 'exhaust', 'pipe', 'engine', 'glow', 'شكمان', 'عادم', 'محرك', 'طيارة', 'طيارات', 'موتور'],
      photos: ['planes-pe24', 'planes-pe23']
    },
    {
      id: 'plane-parts', model: 'RC Plane Parts', brands: [],
      name_ar: 'قطع غيار الطائرات', name_en: 'Plane Parts',
      desc_ar: 'قطع غيار لطائرات الريموت كنترول. أرسل إلينا طراز الطائرة والقطعة المطلوبة عبر واتساب.',
      desc_en: 'Parts for RC planes — send us your plane model and the part you need.',
      category: 'planes', scales: [], level: null, featured: 55, inStock: true, price: null,
      specs: { version: ASK },
      tags: ['plane', 'parts', 'طائرة', 'قطع غيار', 'طيارة', 'طيارات'],
      photos: range('planes', 44, 48).concat(['planes-087'])
    },
    {
      id: 'plane-accessories', model: 'RC Plane Accessories', brands: [],
      name_ar: 'إكسسوارات وأدوات الطائرات', name_en: 'Plane Accessories & Tools',
      desc_ar: 'إكسسوارات وأدوات لطائرات الريموت كنترول. تواصل معنا عبر واتساب لمعرفة المتوفر حاليًا.',
      desc_en: 'Accessories and tools for RC planes — ask what is available.',
      category: 'planes', scales: [], level: null, featured: 75, inStock: true, price: null,
      specs: { version: ASK },
      tags: ['plane', 'accessories', 'tools', 'طائرة', 'إكسسوارات', 'أدوات', 'طيارة', 'طيارات'],
      photos: ['planes-136', 'planes-138']
    },
    {
      id: 'plane-wheels', model: 'Plane Wheels', brands: [],
      name_ar: 'عجلات طائرات بمقاسات متعددة', name_en: 'Plane wheels',
      desc_ar: 'عجلات خفيفة الوزن لطائرات الريموت كنترول بمقاسات متعددة. أرسل إلينا طراز طائرتك لنرشّح لك المقاس المناسب.' + CONTACT_AR,
      desc_en: 'Lightweight wheels for RC planes in several sizes — tell us your plane model.' + CONTACT_EN,
      category: 'planes', scales: [], level: null, featured: 74, inStock: true, price: null,
      specs: { use: { ar: 'عجلات الهبوط', en: 'Landing gear' } },
      tags: ['wheels', 'plane', 'عجلات', 'طائرة', 'كاوتش', 'طيارة', 'طيارات', 'عجل'],
      photos: ['planes-138', 'planes-pa22', 'planes-138']
    },
    {
      id: 'plane-spinners', model: 'Spinners', brands: [],
      name_ar: 'سبينرات لمراوح الطائرات', name_en: 'Propeller spinners',
      desc_ar: 'سبينرات من البلاستيك والألومنيوم بألوان ومقاسات متعددة، لتثبيت المروحة وإضفاء لمسة نهائية أنيقة على مقدمة الطائرة.' + CONTACT_AR,
      desc_en: 'Plastic and aluminium spinners in different colours and sizes to finish the prop.' + CONTACT_EN,
      category: 'planes', scales: [], level: null, featured: 73, inStock: true, price: null,
      specs: { use: { ar: 'تثبيت المروحة', en: 'Propeller mounting' } },
      tags: ['spinner', 'spinners', 'prop', 'سبينر', 'مروحة', 'طيارة', 'طيارات'],
      photos: ['planes-pa07', 'planes-pa09', 'planes-pa10', 'planes-pa12', 'planes-pa39', 'planes-pa40']
    },
    {
      id: 'plane-fuel-tanks-tubing', model: 'Fuel Tanks & Tubing', brands: [],
      name_ar: 'خزانات وخراطيم وقود', name_en: 'Fuel tanks & tubing',
      desc_ar: 'خزانات وقود وخراطيم لطائرات النيترو والجلو، لاستبدال القطع التالفة أو تجهيز طائرة جديدة.' + CONTACT_AR,
      desc_en: 'Fuel tanks and fuel tubing for nitro / glow planes.' + CONTACT_EN,
      category: 'planes', scales: [], level: null, featured: 71, inStock: true, price: null,
      specs: { use: { ar: 'طائرات النيترو', en: 'Nitro planes' } },
      tags: ['fuel tank', 'tank', 'tubing', 'nitro', 'خزان', 'وقود', 'خرطوم', 'نيترو', 'طيارة', 'طيارات', 'تنك'],
      photos: ['planes-pa15', 'planes-pa20', 'planes-pa13']
    },
    {
      id: 'plane-glow-plugs', model: 'Glow Plugs', brands: [],
      name_ar: 'شمعات توهّج لمحركات الجلو', name_en: 'Glow plugs',
      desc_ar: 'شمعات توهّج (بوجيهات جلو) لمحركات النيترو والجلو. أرسل إلينا طراز المحرك لنرشّح لك النوع المناسب.' + CONTACT_AR,
      desc_en: 'Glow plugs for nitro engines — ask which type suits your engine.' + CONTACT_EN,
      category: 'planes', scales: [], level: null, featured: 70, inStock: true, price: null,
      specs: { use: { ar: 'محركات النيترو والجلو', en: 'Nitro / glow engines' } },
      tags: ['glow plug', 'glow', 'nitro', 'شمعة', 'جلو', 'نيترو', 'طيارة', 'طيارات', 'بوجيه'],
      photos: ['planes-pa16', 'planes-pa17']
    },
    {
      id: 'plane-control-horns', model: 'Control Horns, Hinges & Clevises', brands: [],
      name_ar: 'أذرع تحكم ومفصلات ووصلات', name_en: 'Control horns, hinges & clevises',
      desc_ar: 'أذرع تحكم (هورنات) ومفصلات ووصلات (كليفس) وقضبان دفع ومسامير تثبيت، لتركيب أسطح التحكم في الطائرة.' + CONTACT_AR,
      desc_en: 'Control horns, hinges, clevises, pushrods and hardware for fitting control surfaces.' + CONTACT_EN,
      category: 'planes', scales: [], level: null, featured: 69, inStock: true, price: null,
      specs: { use: { ar: 'أسطح التحكم', en: 'Control surfaces' } },
      tags: ['control horn', 'hinge', 'clevis', 'pushrod', 'linkage', 'قرن', 'مفصلة', 'وصلة', 'طيارة', 'طيارات', 'هورن'],
      photos: ['planes-pa19', 'planes-pa31', 'planes-pa33', 'planes-pa38', 'planes-pa21', 'planes-pa30']
    },

    /* ===== Drift & rally ===== */
    {
      id: 'traxxas-4-tec-drift', model: 'Traxxas 4-Tec Drift 1/10 (Mustang)', brands: ['Traxxas'],
      name_ar: 'سيارة درفت 1/10 بدفع رباعي', name_en: '1/10 AWD Drift Car',
      desc_ar: 'سيارة درفت مقاس 1/10 على شاسيه 4-Tec من Traxxas، بدفع رباعي وهيكل Mustang. سهلة التحكم، وخطوة موفقة لدخول عالم الدرفت.' + CONTACT_AR,
      desc_en: 'A 1/10-scale drift car on the four-wheel-drive 4-Tec chassis with a Mustang body.' + CONTACT_EN,
      category: 'drift', scales: ['1/10'], level: 'intermediate', featured: 69, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: 'AWD' },
      tags: ['traxxas', '4-tec', '4tec', 'drift', 'mustang', 'درفت', 'تراكساس', 'عربية', 'عربيات'],
      photos: range('drift', 32, 36)
    },
    {
      id: 'mst-110-drift', model: 'MST 1/10 Drift', brands: ['MST'],
      name_ar: 'سيارة درفت 1/10 بدفع خلفي', name_en: '1/10 RWD Drift Car',
      desc_ar: 'سيارة درفت مقاس 1/10 من MST بدفع خلفي، وهو الأسلوب الأقرب إلى درفت السيارات الحقيقية. تتطلب مهارة في القيادة ودقة في الضبط، لذا فهي مناسبة للمحترفين.' + CONTACT_AR,
      desc_en: 'A 1/10-scale rear-wheel-drive drift car from MST — the closest style to real-car drifting.',
      category: 'drift', scales: ['1/10'], level: 'pro', featured: 68, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: 'RWD' },
      tags: ['mst', 'drift', 'rwd', 'درفت', 'عربية', 'عربيات'],
      photos: ['drift-037', 'drift-038']
    },
    {
      id: 'hpi-rs4', model: 'HPI RS4', brands: ['HPI'],
      name_ar: 'سيارة تورينج 1/10 بدفع رباعي', name_en: '1/10 4WD Touring Car',
      desc_ar: 'سيارة تورينج (أون رود) مقاس 1/10 من HPI بدفع رباعي، للأسفلت والطرق الممهدة. مناسبة لمن يرغب في دخول عالم الأون رود والدرفت.' + CONTACT_AR,
      desc_en: 'A 1/10-scale four-wheel-drive touring car from HPI.' + CONTACT_EN,
      category: 'drift', scales: ['1/10'], level: 'intermediate', featured: 66, inStock: true, price: null,
      specs: { drive: '4WD' },
      tags: ['hpi', 'rs4', 'touring', 'on-road', 'سياحية', 'عربية', 'عربيات', 'تورينج'],
      photos: range('drift', 172, 175)
    },
    {
      id: 'hpi-wr8', model: 'HPI WR8 Rally', brands: ['HPI'],
      name_ar: 'سيارة رالي 1/8 بدفع رباعي', name_en: '1/8 4WD Rally Car',
      desc_ar: 'سيارة رالي مقاس 1/8 من HPI بدفع رباعي، تسير على الأسفلت والتراب كسيارات الرالي الحقيقية. مناسبة للمحترفين.' + CONTACT_AR,
      desc_en: 'A 1/8-scale four-wheel-drive rally car from HPI.' + CONTACT_EN,
      category: 'drift', scales: ['1/8'], level: 'pro', featured: 65, inStock: true, price: null,
      specs: { drive: '4WD' },
      tags: ['hpi', 'wr8', 'rally', 'رالي', 'عربية', 'عربيات'],
      photos: range('drift', 189, 193)
    },
    {
      id: 'mini-drift-128', model: 'Mini Drift 1/28 RWD', brands: [],
      name_ar: 'سيارة درفت صغيرة بحجم الكف', name_en: 'Palm-size RWD Drift Car',
      desc_ar: 'سيارة درفت صغيرة مقاس 1/28 بدفع خلفي وجايرو يثبّت الانزلاق. مناسبة للمبتدئين وللعب داخل المنزل أو على حلبة صغيرة.' + CONTACT_AR,
      desc_en: 'A palm-size 1/28-scale rear-wheel-drive drift car with a gyro — made for indoor tracks.' + CONTACT_EN,
      category: 'drift', scales: ['1/28'], level: 'beginner', featured: 64, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: 'RWD', extras: { ar: 'جايرو لتثبيت الدرفت', en: 'Gyro for drift control' } },
      tags: ['mini', 'drift', 'rwd', 'gyro', 'palm', 'ميني', 'صغيرة', 'درفت', 'جيرو', 'عربية', 'عربيات'],
      images: [PX('13047779')]
    },
    {
      id: 'mini-drift-124', model: 'Mini Drift 1/24 RWD', brands: [],
      name_ar: 'سيارة درفت صغيرة 1/24 بدفع خلفي', name_en: 'Mini RWD Drift Car',
      desc_ar: 'سيارة درفت مقاس 1/24 بدفع خلفي وجايرو يثبّت الانزلاق، للتدرّب في المنزل أو على حلبة صغيرة. بداية مناسبة للمبتدئين.' + CONTACT_AR,
      desc_en: 'A small 1/24-scale rear-wheel-drive drift car with a gyro — for drift practice at home or on a small track.' + CONTACT_EN,
      category: 'drift', scales: ['1/24'], level: 'beginner', featured: 64, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: 'RWD', extras: { ar: 'جايرو لتثبيت الدرفت', en: 'Gyro for drift control' } },
      tags: ['mini', 'drift', 'rwd', 'gyro', 'ميني', 'صغيرة', 'درفت', 'جيرو', 'عربية', 'عربيات'],
      images: [PX('13047786'), PX('13047783')]
    },
    {
      id: 'drift-116-4wd', model: 'Drift 1/16 4WD', brands: [],
      name_ar: 'سيارة درفت 1/16 بدفع رباعي', name_en: '4WD Drift Car',
      desc_ar: 'سيارة درفت مقاس 1/16 بدفع رباعي، سهلة التحكم وبداية جيدة لدخول عالم الدرفت. مناسبة للمبتدئين.' + CONTACT_AR,
      desc_en: 'A 1/16-scale four-wheel-drive drift car — easy to control and a good first step into drifting.' + CONTACT_EN,
      category: 'drift', scales: ['1/16'], level: 'beginner', featured: 64, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: '4WD' },
      tags: ['drift', '4wd', 'درفت', 'دفع رباعي', 'عربية', 'عربيات'],
      images: [U('1637875373155-2f9d64a849e3')]
    },
    {
      id: 'drift-114-rwd', model: 'Drift 1/14 RWD', brands: [],
      name_ar: 'سيارة درفت 1/14 بدفع خلفي', name_en: 'RWD Drift Car',
      desc_ar: 'سيارة درفت مقاس 1/14 بدفع خلفي، يقع حجمها بين السيارات الصغيرة ومقاس 1/10. مناسبة لمن يريد تعلّم الدرفت بالدفع الخلفي.' + CONTACT_AR,
      desc_en: 'A 1/14-scale rear-wheel-drive drift car — a size between the mini cars and 1/10.' + CONTACT_EN,
      category: 'drift', scales: ['1/14'], level: 'intermediate', featured: 64, inStock: true, price: null,
      specs: { power: ELECTRIC, drive: 'RWD' },
      tags: ['drift', 'rwd', 'درفت', 'دفع خلفي', 'عربية', 'عربيات'],
      images: [PX('13047783')]
    },
    {
      id: 'drift-wheels-tires-110', model: '1/10 Drift Wheels & Tires', brands: [],
      name_ar: 'إطارات وجنوط درفت 1/10', name_en: '1/10 Drift Wheels & Tyres',
      desc_ar: 'إطارات وجنوط مقاس 1/10 لسيارات الدرفت والأون رود. تواصل معنا عبر واتساب لمعرفة الأشكال المتوفرة.',
      desc_en: 'Drift and on-road wheels and tyres in 1/10 scale — ask about the styles available.',
      category: 'drift', scales: ['1/10'], level: null, featured: 63, inStock: true, price: null,
      specs: { use: { ar: 'درفت وأون رود', en: 'Drift & on-road' } },
      tags: ['wheels', 'tires', 'tyres', 'drift', 'جنوط', 'إطارات', 'كاوتش', 'عجل'],
      photos: range('drift', 116, 120)
    },
    {
      id: 'bodies-110', model: '1/10 Bodies', brands: [],
      name_ar: 'هياكل 1/10 للدرفت والتورينج', name_en: '1/10 Drift & Touring Bodies',
      desc_ar: 'هياكل خارجية (بودي) مقاس 1/10 لسيارات الدرفت والتورينج. تواصل معنا عبر واتساب لمعرفة الأشكال المتوفرة.',
      desc_en: '1/10-scale bodies for drift and touring cars — ask about the shapes available.',
      category: 'drift', scales: ['1/10'], level: null, featured: 61, inStock: true, price: null,
      specs: { use: { ar: 'درفت وتورينج', en: 'Drift & touring' } },
      tags: ['body', 'bodies', 'shell', 'drift', 'هيكل', 'بودي', 'درفت'],
      photos: range('drift', 73, 78)
    },
    {
      id: 'panther-touring-rtr', model: 'Panther Brushless Touring Car RTR', brands: [],
      name_ar: 'سيارة تورينج براشلس جاهزة للتشغيل', name_en: 'Brushless On-road Touring Car RTR',
      desc_ar: 'سيارة تورينج للأسفلت بمحرك براشلس، تأتي جاهزة للتشغيل (RTR). مناسبة لمن يبحث عن السرعة على الطرق الممهدة دون عناء التجميع.' + CONTACT_AR,
      desc_en: 'A brushless on-road touring car, ready to run.' + CONTACT_EN,
      category: 'drift', scales: [], level: 'intermediate', featured: 60, inStock: true, price: null,
      specs: { power: { ar: 'كهربائي براشلس', en: 'Brushless electric' }, version: 'RTR' },
      tags: ['panther', 'touring', 'on-road', 'brushless', 'rtr', 'سياحية', 'براشلس', 'عربية', 'عربيات', 'تورينج'],
      photos: ['drift-n16']
    },

    /* ===== Parts & batteries ===== */
    {
      id: 'parts-hpi-hsp-xray', model: 'HPI / HSP / Xray / Kyosho / Thunder Tiger Parts', brands: ['HPI', 'HSP', 'Xray', 'Kyosho', 'Thunder Tiger', 'Rovan', 'King Motor'],
      name_ar: 'قطع غيار لعلامات تجارية متعددة', name_en: 'Parts for Several Brands',
      desc_ar: 'قطع غيار لسيارات HPI · HSP · Xray · Kyosho · Thunder Tiger · Rovan · King Motor. أرسل إلينا طراز سيارتك والقطعة المطلوبة عبر واتساب.',
      desc_en: 'Parts for HPI, HSP, Xray, Kyosho, Thunder Tiger, Rovan and King Motor cars — send us your model and the part you need.',
      category: 'parts', scales: [], level: null, featured: 53, inStock: true, price: null,
      specs: { compat: 'HPI · HSP · Xray · Kyosho · Thunder Tiger · Rovan · King Motor' },
      tags: ['parts', 'hpi', 'hsp', 'xray', 'kyosho', 'thunder tiger', 'rovan', 'king motor', 'قطع غيار'],
      photos: ['parts-002', 'parts-003'].concat(range('parts', 59, 62))
    },
    {
      id: 'zenoah-g320rc', model: 'Zenoah G320RC 32cc Engine', brands: ['Zenoah'],
      name_ar: 'محرك بنزين 32cc لسيارات 1/5', name_en: '1/5 32cc Petrol Engine',
      desc_ar: 'محرك بنزين سعة 32cc من Zenoah لسيارات مقاس 1/5، يأتي مع القابض والمكربن. مناسب لسيارات الباجا وغيرها من سيارات الفئة نفسها.' + CONTACT_AR,
      desc_en: 'A 32cc petrol engine for 1/5 cars, with clutch and carburettor.' + CONTACT_EN,
      category: 'parts', scales: ['1/5'], level: null, featured: 53, inStock: true, price: null,
      specs: { power: PETROL, extras: { ar: 'قابض ومكربن', en: 'Clutch & carburettor' }, use: { ar: 'سيارات الباجا', en: 'Baja cars' } },
      tags: ['zenoah', 'g320rc', '32cc', 'engine', 'petrol', 'baja', 'محرك', 'بنزين', 'زينوا', 'موتور'],
      photos: ['parts-n11', 'parts-n05']
    },
    {
      id: 'ddm-petrol-engine-15', model: 'DDM Petrol Engine for 1/5', brands: ['DDM'],
      name_ar: 'محرك بنزين 1/5 ببادئ سحب', name_en: '1/5 Pull-start Petrol Engine',
      desc_ar: 'محرك بنزين من DDM لسيارات مقاس 1/5، يُدار ببادئ السحب (Pull Start). مناسب لسيارات الباجا وغيرها من سيارات الفئة نفسها.' + CONTACT_AR,
      desc_en: 'A pull-start petrol engine for 1/5 cars.' + CONTACT_EN,
      category: 'parts', scales: ['1/5'], level: null, featured: 52, inStock: true, price: null,
      specs: { power: PETROL, extras: { ar: 'بادئ تشغيل بالسحب', en: 'Pull start' }, use: { ar: 'سيارات الباجا', en: 'Baja cars' } },
      tags: ['ddm', 'engine', 'petrol', 'pull start', 'baja', 'محرك', 'بنزين', 'موتور'],
      photos: ['parts-n08', 'parts-n07']
    },
    {
      id: 'arrma-parts-oils', model: 'Arrma Spare Parts', brands: ['Arrma'],
      name_ar: 'قطع غيار Arrma', name_en: 'Arrma spare parts',
      desc_ar: 'قطع غيار أصلية لسيارات Arrma. أرسل إلينا طراز سيارتك والقطعة المطلوبة عبر واتساب.',
      desc_en: 'Genuine parts for Arrma cars — send us your model and the part you need.',
      category: 'parts', scales: [], level: null, featured: 52, inStock: true, price: null,
      specs: { compat: 'Arrma' },
      tags: ['arrma', 'parts', 'shock oil', 'oil', 'قطع غيار', 'زيت', 'أرما'],
      photos: [].concat([1,2,3,4,5,6,7,8].map(function (n) { return 'parts-wa-545-arrma-parts-3-' + n; }))
    },
    {
      id: 'traxxas-parts', model: 'Traxxas Parts', brands: ['Traxxas'],
      name_ar: 'قطع غيار Traxxas', name_en: 'Traxxas Parts',
      desc_ar: 'قطع غيار لسيارات Traxxas. أرسل إلينا طراز سيارتك والقطعة المطلوبة عبر واتساب.',
      desc_en: 'Parts for Traxxas cars — send us your model and the part you need.',
      category: 'parts', scales: [], level: null, featured: 51, inStock: true, price: null,
      specs: { compat: 'Traxxas' },
      tags: ['traxxas', 'parts', 'قطع غيار', 'تراكساس'],
      photos: range('parts', 160, 163)
    },
    {
      id: 'rc-tires', model: 'RC Tires 1/5 · 1/8 · 1/10 · 1/16', brands: [],
      name_ar: 'إطارات لسيارات الريموت كنترول', name_en: 'RC Car Tyres',
      desc_ar: 'إطارات بمقاسات 1/5 · 1/8 · 1/10 · 1/16 للتراب والرمال والأسفلت. أرسل إلينا طراز سيارتك ونوع الأرض التي تقود عليها عبر واتساب، وسنرشّح لك الإطار المناسب.',
      desc_en: 'Tyres in 1/5, 1/8, 1/10 and 1/16 — tell us your model and surface and we will suggest the right set.',
      category: 'parts', scales: ['1/5', '1/8', '1/10', '1/16'], level: null, featured: 50, inStock: true, price: null,
      specs: { use: { ar: 'تراب ورمل وأسفلت', en: 'Dirt, sand & tarmac' } },
      tags: ['tires', 'tyres', 'wheels', 'إطارات', 'كاوتش', 'جنوط', 'عجل'],
      photos: range('parts', 49, 53)
    },
    {
      id: 'proline-badlands-15', model: 'Pro-Line Badlands 1/5 (X-Maxx)', brands: [],
      name_ar: 'إطارات 1/5 متوافقة مع X-Maxx', name_en: '1/5 Tyres for X-Maxx',
      desc_ar: 'إطارات Pro-Line Badlands مقاس 1/5 متوافقة مع مونستر تراك Traxxas X-Maxx، لمن يريد تماسكًا أقوى على الأراضي الوعرة.' + CONTACT_AR,
      desc_en: 'Pro-Line Badlands 1/5 tyres to fit the Traxxas X-Maxx.' + CONTACT_EN,
      category: 'parts', scales: ['1/5'], level: null, featured: 49, inStock: true, price: null,
      specs: { compat: 'Traxxas X-Maxx' },
      tags: ['pro-line', 'proline', 'badlands', 'tires', 'x-maxx', 'إطارات', 'كاوتش', 'عجل'],
      photos: ['parts-239', 'parts-240']
    },
    {
      id: 'batteries', model: 'Batteries (Traxxas / LiPo)', brands: ['Traxxas'],
      name_ar: 'بطاريات Traxxas وبطاريات ليبو', name_en: 'Traxxas & LiPo Batteries',
      desc_ar: 'بطاريات Traxxas وبطاريات ليبو لسيارات الأوف رود. أرسل إلينا طراز سيارتك عبر واتساب، وسنرشّح لك البطارية المناسبة.',
      desc_en: 'Traxxas and LiPo batteries for off-road cars — tell us your model and we will suggest the right one.',
      category: 'parts', scales: [], level: null, featured: 48, inStock: true, price: null,
      specs: { use: { ar: 'سيارات الأوف رود', en: 'Off-road cars' } },
      tags: ['battery', 'batteries', 'lipo', 'traxxas', 'بطارية', 'بطاريات', 'ليبو'],
      photos: range('parts', 140, 144)
    },
    {
      id: 'lipo-4s-1500-100c', model: 'LiPo 4S 1500mAh 100C', brands: [],
      name_ar: 'بطارية ليبو 4S 1500mAh', name_en: '4S LiPo battery',
      desc_ar: 'بطارية ليبو 4S بجهد 14.8 فولت وسعة 1500mAh ومعدل تفريغ 100C، مزودة بموصل XT60. خيار مناسب لمن يحتاج إلى تفريغ عالٍ في حجم صغير.' + CONTACT_AR,
      desc_en: 'A 4S 14.8V 1500mAh LiPo pack with an XT60 plug.' + CONTACT_EN,
      category: 'parts', scales: [], level: null, featured: 47, inStock: true, price: null,
      specs: { cells: '4S · 14.8V', plug: 'XT60', sizes: '1500mAh · 100C' },
      tags: ['lipo', '4s', '1500mah', '100c', 'xt60', 'battery', 'بطارية', 'ليبو'],
      photos: ['parts-n15']
    },
    {
      id: 'bodies-traxxas-fox', model: 'Bodies (Traxxas / Fox)', brands: ['Traxxas'],
      name_ar: 'هياكل خارجية Traxxas · Fox', name_en: 'Traxxas & Fox Bodies',
      desc_ar: 'هياكل خارجية لسيارات Traxxas وهياكل بتصميم Fox. تواصل معنا عبر واتساب لمعرفة الأشكال والألوان المتوفرة.',
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
      desc_ar: 'مفكات سداسية (ألن) بمقابض مريحة، بالمقاسات الأكثر استخدامًا في سيارات 1/10 · 1/8: 1.5 · 2.0 · 2.5 · 3.0 مم.' + CONTACT_AR,
      desc_en: 'Hex drivers with comfortable handles in the sizes most used on 1/10 and 1/8 cars.' + CONTACT_EN,
      category: 'tools', scales: ['1/10', '1/8'], level: null, featured: 45, inStock: true, price: null,
      specs: { sizes: '1.5 · 2.0 · 2.5 · 3.0 mm', use: { ar: 'فك البراغي وتركيبها', en: 'Everyday screw work' } },
      tags: ['hex', 'allen', 'driver', 'tools', 'مفك', 'مفكات', 'ألن', 'عدة'],
      photos: ['planes-135', 'planes-137', 'tools-pa06', 'planes-135', 'planes-137']
    },
    {
      id: 'nut-driver-set', model: 'Nut Driver Set 5.5 / 7 / 8 mm', brands: [],
      name_ar: 'طقم مفكات صواميل (بوكس)', name_en: 'Nut driver set',
      desc_ar: 'مفكات صواميل (بوكس) لفك صواميل الجنوط والصواميل الصغيرة، بمقاسات 5.5 · 7 · 8 مم.' + CONTACT_AR,
      desc_en: 'Socket-tip drivers for wheel nuts and small nuts.' + CONTACT_EN,
      category: 'tools', scales: ['1/10', '1/8'], level: null, featured: 44, inStock: true, price: null,
      specs: { sizes: '5.5 · 7 · 8 mm', use: { ar: 'صواميل الجنوط', en: 'Wheel nuts' } },
      tags: ['nut driver', 'socket', 'tools', 'مفك', 'صواميل', 'عدة'],
      images: [CC('tools-cc-nut-drivers-1'), CC('tools-cc-nut-drivers-2')],
      art: 'nut-drivers'
    },
    {
      id: 'hex-key-set-15', model: 'Metric Hex Key Set 4 / 5 / 6 mm', brands: [],
      name_ar: 'طقم مفاتيح ألن لسيارات 1/5', name_en: 'Hex key set for 1/5',
      desc_ar: 'مفاتيح ألن كبيرة بمقاسات 4 · 5 · 6 مم لبراغي سيارات 1/5 مثل الباجا.' + CONTACT_AR,
      desc_en: 'Larger hex keys for the screws on Baja and 1/5-scale cars.' + CONTACT_EN,
      category: 'tools', scales: ['1/5'], level: null, featured: 43, inStock: true, price: null,
      specs: { sizes: '4 · 5 · 6 mm', use: { ar: 'سيارات الباجا', en: 'Baja cars' } },
      tags: ['hex', 'allen', 'keys', 'baja', 'tools', 'ألن', 'مفاتيح', 'باجا', 'عدة'],
      images: [PX('5691647'), PX('5691648')]
    },
    {
      id: 'shock-pliers-multitool', model: 'Shock Pliers & Multi-tool', brands: [],
      name_ar: 'كمّاشة ممتصات الصدمات وأداة متعددة', name_en: 'Shock pliers & multi-tool',
      desc_ar: 'كمّاشة تثبّت عمود ممتص الصدمات دون أن تخدشه، ومعها أداة متعددة الاستخدامات للوصلات ورؤوس الكرات.' + CONTACT_AR,
      desc_en: 'Pliers that grip shock shafts without scratching them, plus a multi-tool for links and ball ends.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 42, inStock: true, price: null,
      specs: { use: { ar: 'ممتصات الصدمات والوصلات', en: 'Shocks, links & ball ends' } },
      tags: ['pliers', 'shock', 'multi-tool', 'tools', 'زرادية', 'بنسة', 'مساعدات', 'عدة', 'مساعدين'],
      images: [PX('5583100')]
    },
    {
      id: 'turnbuckle-wrench', model: 'Turnbuckle Wrench', brands: [],
      name_ar: 'مفتاح وصلات (تيرن باكل)', name_en: 'Turnbuckle wrench',
      desc_ar: 'مفتاح رفيع لضبط أطوال الوصلات (تيرن باكل) عند ضبط زاويتي الكامبر والتو.' + CONTACT_AR,
      desc_en: 'A thin wrench for adjusting turnbuckles when setting camber and toe.' + CONTACT_EN,
      category: 'tools', scales: ['1/10', '1/8'], level: null, featured: 41, inStock: true, price: null,
      specs: { use: { ar: 'ضبط الكامبر والتو', en: 'Camber & toe adjustment' } },
      tags: ['turnbuckle', 'wrench', 'camber', 'toe', 'tools', 'مفتاح', 'وصلات', 'عدة'],
      images: [PX('5853933'), PX('8703535')]
    },
    {
      id: 'body-reamer', model: 'Body Reamer', brands: [],
      name_ar: 'أداة تثقيب الهياكل (ريمر)', name_en: 'Body reamer',
      desc_ar: 'أداة مخروطية لإحداث ثقوب نظيفة ودقيقة في الهياكل المصنوعة من البولي كربونات.' + CONTACT_AR,
      desc_en: 'A tapered tool for making clean, round holes in bodies.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 40, inStock: true, price: null,
      specs: { use: { ar: 'هياكل البولي كربونات', en: 'Polycarbonate bodies' } },
      tags: ['reamer', 'body', 'tools', 'هيكل', 'بودي', 'ثقوب', 'عدة'],
      images: [CC('tools-cc-body-reamer-1'), CC('tools-cc-body-reamer-2')],
      art: 'reamer'
    },
    {
      id: 'curved-body-scissors', model: 'Curved Body Scissors', brands: [],
      name_ar: 'مقص هياكل مقوّس', name_en: 'Curved body scissors',
      desc_ar: 'مقص بشفرة مقوّسة لقص الهيكل الخارجي حول فتحات الإطارات بسهولة.' + CONTACT_AR,
      desc_en: 'Curved-blade scissors for trimming bodies around the wheel arches.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 39, inStock: true, price: null,
      specs: { use: { ar: 'قص هياكل البولي كربونات', en: 'Trimming polycarbonate bodies' } },
      tags: ['scissors', 'body', 'lexan', 'tools', 'مقص', 'هيكل', 'بودي', 'عدة'],
      photos: ['tools-pa27']
    },
    {
      id: 'ride-height-camber-gauge', model: 'Ride Height & Camber Gauge', brands: [],
      name_ar: 'مقياس ارتفاع الشاسيه والكامبر', name_en: 'Ride height & camber gauge',
      desc_ar: 'مقياس لضبط ارتفاع الشاسيه عن الأرض وزاوية الكامبر في سيارات 1/10 · 1/8.' + CONTACT_AR,
      desc_en: 'A gauge for setting ride height and camber angle.' + CONTACT_EN,
      category: 'tools', scales: ['1/10', '1/8'], level: null, featured: 38, inStock: true, price: null,
      specs: { use: { ar: 'ضبط إعدادات السيارة', en: 'Car setup' } },
      tags: ['ride height', 'camber', 'gauge', 'setup', 'tools', 'مقياس', 'كامبر', 'عدة'],
      images: [PX('32633664'), PX('7180748')]
    },
    {
      id: 'setup-station', model: 'Setup Station 1/10 & 1/8', brands: [],
      name_ar: 'محطة ضبط 1/10 · 1/8', name_en: 'Setup station',
      desc_ar: 'محطة ضبط (Setup Station) لسيارات 1/10 · 1/8، لقياس الكامبر والتو وارتفاع الشاسيه بدقة.' + CONTACT_AR,
      desc_en: 'A setup station for 1/10 and 1/8 cars to measure camber, toe and ride height accurately.' + CONTACT_EN,
      category: 'tools', scales: ['1/10', '1/8'], level: null, featured: 37, inStock: true, price: null,
      specs: { use: { ar: 'الكامبر والتو وارتفاع الشاسيه', en: 'Camber, toe & ride height' } },
      tags: ['setup station', 'setup', 'camber', 'toe', 'tools', 'ضبط', 'إعدادات', 'عدة'],
      images: [CC('tools-cc-setup-station-1')],
      art: 'setup-station'
    },
    {
      id: 'tire-balancer', model: 'Tire Balancer', brands: [],
      name_ar: 'جهاز موازنة الإطارات', name_en: 'Tire balancer',
      desc_ar: 'جهاز لموازنة الإطارات والجنوط، يقلّل الاهتزاز على السرعات العالية.' + CONTACT_AR,
      desc_en: 'For balancing wheels and tyres to cut vibration at high speed.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 36, inStock: true, price: null,
      specs: { use: { ar: 'موازنة الإطارات', en: 'Wheel balancing' } },
      tags: ['tire', 'tyre', 'balancer', 'wheels', 'tools', 'إطارات', 'موازنة', 'عدة', 'كاوتش', 'جنوط', 'ترصيص'],
      images: [CC('tools-cc-tire-balancer-1'), CC('tools-cc-tire-balancer-2')],
      art: 'tire-balancer'
    },
    {
      id: 'pit-mat-magnetic', model: 'Pit Mat with Magnetic Tray', brands: [],
      name_ar: 'بساط صيانة وصينية مغناطيسية', name_en: 'Pit mat with magnetic tray',
      desc_ar: 'بساط عمل يحمي سطح الطاولة ويحفظ القطع في مكانها، مع صينية مغناطيسية للبراغي.' + CONTACT_AR,
      desc_en: 'A work mat that protects the bench and keeps parts together, with a magnetic tray for screws.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 35, inStock: true, price: null,
      specs: { use: { ar: 'حفظ البراغي والقطع الصغيرة', en: 'Keeps screws & small parts in place' } },
      tags: ['pit mat', 'mat', 'magnetic tray', 'tools', 'مفرش', 'صينية', 'مغناطيس', 'عدة'],
      images: [CC('tools-cc-pit-mat-1'), CC('tools-cc-pit-mat-2')],
      art: 'pit-mat'
    },
    {
      id: 'soldering-kit', model: 'Soldering Iron & Solder Kit', brands: [],
      name_ar: 'مكواة لحام وقصدير', name_en: 'Soldering iron & solder kit',
      desc_ar: 'مكواة لحام مع قصدير لتركيب الموصلات والأسلاك وتوصيل المحركات.' + CONTACT_AR,
      desc_en: 'A soldering iron with solder for fitting plugs, wires and motors.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 34, inStock: true, price: null,
      specs: { use: { ar: 'الموصلات والأسلاك', en: 'Plugs & wiring' } },
      tags: ['soldering', 'solder', 'iron', 'tools', 'كاوية', 'لحام', 'قصدير', 'عدة'],
      images: [U('1521798604188-0d6595d6d6ae'), U('1560846389-8c7e1d88eca8')]
    },
    {
      id: 'servo-tester', model: 'Servo Tester', brands: [],
      name_ar: 'جهاز اختبار السيرفو', name_en: 'Servo tester',
      desc_ar: 'جهاز صغير لاختبار السيرفو وضبط نقطة المنتصف قبل التركيب.' + CONTACT_AR,
      desc_en: 'A small tester for checking servos and centring them before fitting.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 33, inStock: true, price: null,
      specs: { use: { ar: 'اختبار السيرفو وضبط نقطة المنتصف', en: 'Testing & centring servos' } },
      tags: ['servo', 'tester', 'tools', 'سيرفو', 'اختبار', 'عدة'],
      images: [PX('35652333'), PX('35652465')]
    },
    {
      id: 'lipo-balance-charger-dual', model: 'Dual LiPo Balance Charger', brands: [],
      name_ar: 'شاحن ليبو مزدوج بموازنة الخلايا', name_en: 'Dual LiPo balance charger',
      desc_ar: 'شاحن بمخرجين يشحن بطاريتين في الوقت نفسه مع موازنة الخلايا (Balance).' + CONTACT_AR,
      desc_en: 'A two-output charger that charges two packs at once with cell balancing.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 32, inStock: true, price: null,
      specs: { use: { ar: 'شحن بطاريات ليبو', en: 'LiPo charging' } },
      tags: ['charger', 'lipo', 'balance', 'dual', 'شاحن', 'ليبو', 'بطاريات', 'عدة'],
      images: [CC('tools-cc-lipo-charger-1'), CC('tools-cc-lipo-charger-2')],
      art: 'charger'
    },
    {
      id: 'cellmeter-8', model: 'CellMeter 8 Battery Checker', brands: [],
      name_ar: 'جهاز فحص خلايا البطارية', name_en: 'Battery checker / cell meter',
      desc_ar: 'يعرض جهد كل خلية ونسبة الشحن لبطاريات LiPo · Li-ion · LiFe · NiMH من 1S حتى 8S، ويعمل أيضًا جهازًا لاختبار السيرفو.' + CONTACT_AR,
      desc_en: 'Shows the voltage of each cell and the charge level for LiPo, Li-ion, LiFe and NiMH packs, and doubles as a servo tester.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 31, inStock: true, price: null,
      specs: { cells: '1S–8S', use: { ar: 'فحص البطاريات واختبار السيرفو', en: 'Battery checks & servo testing' } },
      tags: ['cellmeter', 'cell meter', 'checker', 'lipo', 'battery', 'servo', 'فحص', 'بطاريات', 'ليبو', 'عدة', 'بطارية'],
      photos: ['planes-139', 'planes-139']
    },
    {
      id: 'digital-tachometer', model: 'Digital Tachometer', brands: [],
      name_ar: 'مقياس سرعة دوران رقمي', name_en: 'Digital tachometer',
      desc_ar: 'جهاز محمول بشاشة رقمية لقياس سرعة دوران المحرك والمروحة (RPM).' + CONTACT_AR,
      desc_en: 'A handheld digital meter for measuring engine and propeller RPM.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 30, inStock: true, price: null,
      specs: { use: { ar: 'قياس سرعة الدوران', en: 'Measuring RPM' } },
      tags: ['tachometer', 'rpm', 'meter', 'عداد', 'لفات', 'سرعة الدوران'],
      photos: ['tools-pa14']
    },
    {
      id: 'charge-leads-servo-extensions', model: 'Charge Leads & Servo Extensions', brands: [],
      name_ar: 'أسلاك شحن ووصلات سيرفو', name_en: 'Charge leads & servo extensions',
      desc_ar: 'أسلاك شحن متعددة المخارج بموصلات موزية (Banana)، ووصلات تمديد للسيرفو بأطوال مختلفة.' + CONTACT_AR,
      desc_en: 'Multi-plug charge leads with banana plugs, and servo extension leads in several lengths.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 29, inStock: true, price: null,
      specs: { use: { ar: 'الشحن والتوصيلات', en: 'Charging & wiring' } },
      tags: ['charge lead', 'leads', 'banana', 'servo extension', 'extension', 'أسلاك', 'شحن', 'سيرفو', 'وصلات'],
      photos: ['tools-pa24', 'tools-pa25']
    },
    {
      id: 'lipo-safe-bag', model: 'LiPo Safe Bag', brands: [],
      name_ar: 'حقيبة أمان لبطاريات ليبو', name_en: 'LiPo safe bag',
      desc_ar: 'حقيبة مقاومة للحرارة لشحن بطاريات ليبو وتخزينها بأمان أكبر.' + CONTACT_AR,
      desc_en: 'A heat-resistant bag for safer charging and storage of LiPo packs.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 30, inStock: true, price: null,
      specs: { use: { ar: 'شحن وتخزين البطاريات', en: 'Charging & storage' } },
      tags: ['lipo bag', 'safe bag', 'battery', 'حقيبة', 'ليبو', 'بطاريات', 'أمان', 'بطارية'],
      images: [PX('13047785')]
    },
    {
      id: 'glow-igniter-plug-driver', model: 'Glow Igniter & Glow Plug Driver', brands: [],
      name_ar: 'مُشعل جلو ومفتاح شمعات التوهّج', name_en: 'Glow igniter & glow plug driver',
      desc_ar: 'مُشعل يسخّن شمعة التوهّج عند تشغيل محركات النيترو، ومعه مفتاح لفك الشمعات وتركيبها.' + CONTACT_AR,
      desc_en: 'An igniter that heats the glow plug to start nitro engines, plus a driver for fitting and removing plugs.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 29, inStock: true, price: null,
      specs: { use: { ar: 'محركات النيترو والجلو', en: 'Nitro / glow engines' } },
      tags: ['glow', 'igniter', 'glow plug', 'nitro', 'جلو', 'شمعة', 'نيترو', 'عدة', 'بوجيه'],
      photos: ['tools-pa29', 'tools-pa18']
    },
    {
      id: 'spark-plug-clutch-tool', model: 'Spark Plug Wrench & Clutch Tool', brands: [],
      name_ar: 'مفتاح شمعة الإشعال وأداة القابض', name_en: 'Spark plug wrench & clutch tool',
      desc_ar: 'مفتاح لفك شمعة الإشعال (البوجيه) وأداة لفك القابض في محركات البنزين لسيارات 1/5 مثل الباجا.' + CONTACT_AR,
      desc_en: 'A spark plug wrench and a clutch tool for the petrol engines on Baja cars.' + CONTACT_EN,
      category: 'tools', scales: ['1/5'], level: null, featured: 28, inStock: true, price: null,
      specs: { use: { ar: 'محركات البنزين', en: 'Petrol engines' } },
      tags: ['spark plug', 'clutch', 'petrol', 'baja', 'tools', 'بوجيه', 'كلتش', 'بنزين', 'باجا', 'عدة'],
      images: [CC('tools-cc-spark-plug-tool-1')],
      art: 'spark-plug'
    },
    {
      id: 'shock-oil-thread-lock', model: 'Shock Oil, Diff Oil & Thread Lock', brands: ['Traxxas'],
      name_ar: 'زيوت ممتصات الصدمات والدفرنس ومثبّت البراغي', name_en: 'Shock oil, diff oil & thread lock',
      desc_ar: 'زيوت لممتصات الصدمات والترس التفاضلي (الدفرنس) بدرجات لزوجة مختلفة، مع مثبّت للبراغي المعدنية (Thread Lock).' + CONTACT_AR,
      desc_en: 'Shock oil and diff oil sets in different weights, plus thread lock for metal screws.' + CONTACT_EN,
      category: 'tools', scales: [], level: null, featured: 27, inStock: true, price: null,
      specs: { use: { ar: 'ممتصات الصدمات والدفرنس والبراغي', en: 'Shocks, diffs & screws' } },
      tags: ['shock oil', 'diff oil', 'thread lock', 'oil', 'traxxas', 'زيت', 'زيوت', 'مساعدات', 'ديفرنس', 'عدة', 'مساعدين', 'دفرنس'],
      photos: ['parts-054', 'parts-055', 'parts-056', 'parts-058', 'tools-wa-543-hudy-silconne-oil-1']
    },

    /* ===== Radios & electronics ===== */
    {
      id: 'spektrum-dx8-ar8010t', model: 'Spektrum DX8 + AR8010T Receiver', brands: ['Spektrum'],
      name_ar: 'جهاز تحكم 8 قنوات مع مستقبل', name_en: '8-channel radio with receiver',
      desc_ar: 'جهاز تحكم بثماني قنوات 2.4GHz بنظام DSMX مع مستقبل الإشارة AR8010T، لهواة الطائرات والسيارات.' + CONTACT_AR,
      desc_en: 'An 8-channel 2.4GHz DSMX radio with the AR8010T receiver, for planes and cars.' + CONTACT_EN,
      category: 'electronics', scales: [], level: null, featured: 46, inStock: true, price: null,
      specs: { channels: '8', system: '2.4GHz DSMX', use: { ar: 'الطائرات والسيارات', en: 'Planes & cars' } },
      tags: ['spektrum', 'dx8', 'ar8010t', 'radio', 'transmitter', 'receiver', 'dsmx', 'ريموت', 'جهاز تحكم', 'رسيفر'],
      photos: ['electronics-n02']
    },
    {
      id: 'traxxas-link-module', model: 'Traxxas Link Wireless Module', brands: ['Traxxas'],
      name_ar: 'وحدة بلوتوث لجهاز التحكم TQi', name_en: 'Bluetooth telemetry module',
      desc_ar: 'وحدة لاسلكية تضيف البلوتوث وقراءات القياس عن بُعد (Telemetry) إلى جهاز التحكم Traxxas TQi.' + CONTACT_AR,
      desc_en: 'A wireless module that adds Bluetooth and telemetry readouts to the TQi radio.' + CONTACT_EN,
      category: 'electronics', scales: [], level: null, featured: 45, inStock: true, price: null,
      specs: { system: 'Bluetooth', compat: 'Traxxas TQi' },
      tags: ['traxxas', 'link', 'bluetooth', 'telemetry', 'tqi', 'بلوتوث', 'تليمتري', 'ريموت'],
      photos: ['electronics-n20']
    },

    /* ===== Boats ===== */
    {
      id: 'traxxas-m41-6s', model: 'Traxxas M41 6S', brands: ['Traxxas'],
      name_ar: 'قارب سباق كاتاماران براشلس', name_en: 'Brushless Catamaran Race Boat',
      desc_ar: 'قارب سباق كاتاماران من Traxxas بطول 40 بوصة تقريبًا ومحرك براشلس مبرّد بالماء، وتتجاوز سرعته 50 ميلًا في الساعة على 6S. يأتي جاهزًا للتشغيل مع جهاز التحكم TQi وإلكترونيات مقاومة للماء، ومناسب للمحترفين.' + CONTACT_AR,
      desc_en: 'A Traxxas catamaran race boat with a brushless electric motor running on 6S LiPo.' + CONTACT_EN,
      category: 'boats', scales: [], level: 'pro', featured: 26, inStock: true, price: null,
      specs: { power: { ar: 'كهربائي براشلس', en: 'Brushless electric' }, cells: '6S', hull: { ar: 'كاتاماران', en: 'Catamaran' } },
      tags: ['traxxas', 'm41', 'boat', 'catamaran', 'brushless', 'قارب', 'لانش', 'مركب', 'تراكساس'],
      photos: ['boats-225', 'boats-226', 'boats-228', 'boats-224', 'boats-227']
    },
    {
      id: 'proboat-blackjack-42', model: 'Pro Boat Blackjack 42 8S', brands: ['Pro Boat'],
      name_ar: 'قارب كاتاماران 42 بوصة براشلس', name_en: '42-inch Brushless Catamaran',
      desc_ar: 'قارب سباق كاتاماران للمحترفين من Pro Boat بطول 42 بوصة، بمحرك Spektrum Marine 4685 ومنظم سرعة 160A مبرّدين بالماء. تتجاوز سرعته 55 ميلًا في الساعة على 8S (بطاريتان 4S)، ويصبح جاهزًا للتشغيل بعد إضافة البطاريات والشاحن.' + CONTACT_AR,
      desc_en: 'A 42-inch brushless catamaran race boat for 8S, ready to run with Spektrum Smart technology.' + CONTACT_EN,
      category: 'boats', scales: [], level: 'pro', featured: 25, inStock: true, price: null,
      specs: { power: { ar: 'كهربائي براشلس', en: 'Brushless electric' }, cells: '8S', hull: { ar: 'كاتاماران', en: 'Catamaran' }, version: 'RTR' },
      tags: ['pro boat', 'proboat', 'blackjack', '42', '8s', 'catamaran', 'spektrum', 'قارب', 'لانش', 'مركب'],
      photos: ['boats-n03']
    }
  ];


  /* ==========================================================================
     WhatsApp Business catalog merge (generated from
     hamdy-kit/whatsapp-catalog/merge-plan.json — cleaned & deduplicated)
     • MERGE: append catalog photos to existing products, add missing spec keys
       (manufacturer data), replace the description only where it was shorter.
     • NEW: products from the catalog (entries without photos were skipped).
     ========================================================================== */
  var CATALOG_MERGE = [
    {"id":"arrma-kraton-6s-v6","photos":["offroad-wa-001-arrma-kraton-6s-v6-1-8-1","offroad-wa-001-arrma-kraton-6s-v6-1-8-2","offroad-wa-001-arrma-kraton-6s-v6-1-8-4","offroad-wa-001-arrma-kraton-6s-v6-1-8-5","offroad-wa-001-arrma-kraton-6s-v6-1-8-7","offroad-wa-001-arrma-kraton-6s-v6-1-8-8"],"specs":{"motor":"Firma 2050Kv brushless","esc":"Firma 150A Smart V2 (waterproof)","top_speed":"65+ mph (105+ km/h) on 6S LiPo","battery":"4S or 6S LiPo","servo":"S665 steel-geared steering servo","waterproof":"yes","version":"RTR"},"desc_ar":"الجيل السادس (V6) من Arrma Kraton 6S مقاس 1/8، بدفع رباعي ومحرك براشلس Firma 2050Kv ومنظم سرعة 150A مقاوم للماء. يعمل على 4S أو 6S وتتجاوز سرعته 105 كم/ساعة، ويأتي جاهزًا للتشغيل (RTR) للمحترفين.","desc_en":"The Arrma Kraton 6S V6 is a 1/8-scale RTR 4WD monster truck with a powerful brushless system that runs on 4S or 6S LiPo, reaching speeds beyond 65+ mph (105+ km/h). It comes with a Firma 2050Kv motor, a waterproof Firma 150A Smart V2 ESC, and a steel-geared steering servo. Its EXB-reinforced construction makes it well suited to bashing and racing across varied terrain.","specSource":true,"brand":""},
    {"id":"parts-hpi-hsp-xray","photos":["parts-wa-102-hpi-baja-parts-16-1","parts-wa-102-hpi-baja-parts-16-2","parts-wa-102-hpi-baja-parts-16-3","parts-wa-102-hpi-baja-parts-16-4","parts-wa-102-hpi-baja-parts-16-5","parts-wa-102-hpi-baja-parts-16-6","parts-wa-102-hpi-baja-parts-16-7","parts-wa-300-hpi-baja-parts-6-1","parts-wa-300-hpi-baja-parts-6-2","parts-wa-300-hpi-baja-parts-6-3","parts-wa-300-hpi-baja-parts-6-4","parts-wa-300-hpi-baja-parts-6-6","parts-wa-300-hpi-baja-parts-6-7","parts-wa-300-hpi-baja-parts-6-8","parts-wa-301-hpi-baja-parts-10-1","parts-wa-301-hpi-baja-parts-10-2","parts-wa-301-hpi-baja-parts-10-3","parts-wa-301-hpi-baja-parts-10-4","parts-wa-301-hpi-baja-parts-10-5","parts-wa-301-hpi-baja-parts-10-6","parts-wa-301-hpi-baja-parts-10-7","parts-wa-301-hpi-baja-parts-10-8","parts-wa-302-hpi-baja-parts-1","parts-wa-302-hpi-baja-parts-2","parts-wa-302-hpi-baja-parts-3","parts-wa-302-hpi-baja-parts-4","parts-wa-302-hpi-baja-parts-5","parts-wa-302-hpi-baja-parts-6","parts-wa-302-hpi-baja-parts-7","parts-wa-302-hpi-baja-parts-8","parts-wa-340-hpi-baja-parts-5-1","parts-wa-340-hpi-baja-parts-5-2","parts-wa-340-hpi-baja-parts-5-3","parts-wa-340-hpi-baja-parts-5-4","parts-wa-340-hpi-baja-parts-5-5","parts-wa-340-hpi-baja-parts-5-6","parts-wa-340-hpi-baja-parts-5-7","parts-wa-340-hpi-baja-parts-5-8","parts-wa-515-hpi-baja-parts-3-1","parts-wa-515-hpi-baja-parts-3-3","parts-wa-515-hpi-baja-parts-3-4","parts-wa-515-hpi-baja-parts-3-5","parts-wa-515-hpi-baja-parts-3-6","parts-wa-515-hpi-baja-parts-3-7","parts-wa-515-hpi-baja-parts-3-8","parts-wa-518-hpi-baja-parts-11-1","parts-wa-518-hpi-baja-parts-11-2","parts-wa-518-hpi-baja-parts-11-3","parts-wa-518-hpi-baja-parts-11-4","parts-wa-518-hpi-baja-parts-11-5","parts-wa-518-hpi-baja-parts-11-6","parts-wa-518-hpi-baja-parts-11-7","parts-wa-528-hpi-baja-parts-13-1","parts-wa-528-hpi-baja-parts-13-2","parts-wa-528-hpi-baja-parts-13-3","parts-wa-528-hpi-baja-parts-13-4","parts-wa-528-hpi-baja-parts-13-7","parts-wa-528-hpi-baja-parts-13-8","parts-wa-547-hpi-baja-parts-21-1","parts-wa-547-hpi-baja-parts-21-2","parts-wa-547-hpi-baja-parts-21-3","parts-wa-547-hpi-baja-parts-21-4","parts-wa-547-hpi-baja-parts-21-5","parts-wa-547-hpi-baja-parts-21-6","parts-wa-547-hpi-baja-parts-21-7","parts-wa-547-hpi-baja-parts-21-8","parts-wa-550-hpi-baja-parts-17-1","parts-wa-550-hpi-baja-parts-17-2","parts-wa-550-hpi-baja-parts-17-3","parts-wa-550-hpi-baja-parts-17-4","parts-wa-550-hpi-baja-parts-17-5","parts-wa-550-hpi-baja-parts-17-7","parts-wa-550-hpi-baja-parts-17-8","parts-wa-552-hpi-baja-parts-1-1","parts-wa-552-hpi-baja-parts-1-2","parts-wa-552-hpi-baja-parts-1-3","parts-wa-552-hpi-baja-parts-1-5","parts-wa-552-hpi-baja-parts-1-6","parts-wa-552-hpi-baja-parts-1-7","parts-wa-552-hpi-baja-parts-1-8","parts-wa-553-hpi-baja-parts-14-1","parts-wa-553-hpi-baja-parts-14-3","parts-wa-553-hpi-baja-parts-14-5","parts-wa-553-hpi-baja-parts-14-6","parts-wa-553-hpi-baja-parts-14-7","parts-wa-553-hpi-baja-parts-14-8","parts-wa-554-hpi-baja-parts-20-1","parts-wa-554-hpi-baja-parts-20-2","parts-wa-554-hpi-baja-parts-20-3","parts-wa-554-hpi-baja-parts-20-4","parts-wa-554-hpi-baja-parts-20-8","parts-wa-555-hpi-baja-parts-2-1","parts-wa-555-hpi-baja-parts-2-2","parts-wa-555-hpi-baja-parts-2-3","parts-wa-555-hpi-baja-parts-2-4","parts-wa-555-hpi-baja-parts-2-5","parts-wa-555-hpi-baja-parts-2-6","parts-wa-555-hpi-baja-parts-2-7","parts-wa-555-hpi-baja-parts-2-8","parts-wa-558-hpi-baja-parts-9-1","parts-wa-558-hpi-baja-parts-9-2","parts-wa-558-hpi-baja-parts-9-3","parts-wa-558-hpi-baja-parts-9-6","parts-wa-558-hpi-baja-parts-9-7"],"specs":{},"desc_ar":"","desc_en":"","specSource":false,"brand":""},
    {"id":"savage-maxx-bodies","photos":["parts-wa-304-traxxas-maxx-body-1","parts-wa-304-traxxas-maxx-body-2","parts-wa-304-traxxas-maxx-body-3"],"specs":{},"desc_ar":"","desc_en":"","specSource":false,"brand":""},
    {"id":"traxxas-m41-6s","photos":["boats-wa-306-traxxas-m41-boat-1","boats-wa-306-traxxas-m41-boat-2","boats-wa-306-traxxas-m41-boat-3"],"specs":{"top_speed":"50+ mph (80+ km/h)","radio":"TQi 2.4GHz","feature":"TSM stability management","waterproof":"yes"},"desc_ar":"قارب سباق كاتاماران من Traxxas بطول 40 بوصة تقريبًا ومحرك براشلس مبرّد بالماء، وتتجاوز سرعته 50 ميلًا في الساعة على 6S. يأتي جاهزًا للتشغيل مع جهاز التحكم TQi وإلكترونيات مقاومة للماء، ومناسب للمحترفين.","desc_en":"A Traxxas catamaran race boat about 40 inches long, powered by a water-cooled Velineon brushless motor that pushes it beyond 50 mph (80+ km/h) on 6S LiPo. It is Ready-To-Race with the TQi 2.4GHz radio system, TSM stability management for extra control, and fully waterproof electronics.","specSource":true,"brand":""},
    {"id":"bodies-110","photos":["parts-wa-318-body-1-10-3-1","parts-wa-318-body-1-10-3-2","parts-wa-318-body-1-10-3-3","parts-wa-318-body-1-10-3-4","parts-wa-318-body-1-10-3-5","parts-wa-318-body-1-10-3-6","parts-wa-318-body-1-10-3-7","parts-wa-318-body-1-10-3-8","parts-wa-319-body-1-10-2-1","parts-wa-319-body-1-10-2-2","parts-wa-319-body-1-10-2-3","parts-wa-319-body-1-10-2-4","parts-wa-319-body-1-10-2-5","parts-wa-319-body-1-10-2-6","parts-wa-319-body-1-10-2-7","parts-wa-319-body-1-10-2-8","parts-wa-519-body-1-10-4-1","parts-wa-519-body-1-10-4-2","parts-wa-519-body-1-10-4-3","parts-wa-519-body-1-10-4-4","parts-wa-519-body-1-10-4-5","parts-wa-519-body-1-10-4-6","parts-wa-519-body-1-10-4-7","parts-wa-519-body-1-10-4-8"],"specs":{},"desc_ar":"","desc_en":"","specSource":false,"brand":""},
    {"id":"plane-parts","photos":["planes-wa-321-rc-plane-parts-3-1","planes-wa-321-rc-plane-parts-3-2","planes-wa-321-rc-plane-parts-3-3","planes-wa-321-rc-plane-parts-3-4","planes-wa-321-rc-plane-parts-3-5","planes-wa-321-rc-plane-parts-3-6","planes-wa-321-rc-plane-parts-3-7","planes-wa-321-rc-plane-parts-3-8","planes-wa-322-rc-plane-parts-1-1","planes-wa-322-rc-plane-parts-1-2","planes-wa-322-rc-plane-parts-1-3","planes-wa-322-rc-plane-parts-1-4","planes-wa-322-rc-plane-parts-1-6","planes-wa-333-rc-plane-parts-1","planes-wa-333-rc-plane-parts-2"],"specs":{},"desc_ar":"","desc_en":"","specSource":false,"brand":""},
    {"id":"rc-tires","photos":["parts-wa-323-baga-5t-1","parts-wa-323-baga-5t-2","parts-wa-323-baga-5t-3","parts-wa-323-baga-5t-4","parts-wa-339-baja-5b-1","parts-wa-339-baja-5b-2","parts-wa-339-baja-5b-3","parts-wa-339-baja-5b-4"],"specs":{},"desc_ar":"","desc_en":"","specSource":false,"brand":""},
    {"id":"drift-wheels-tires-110","photos":["parts-wa-324-rc-drift-car-tires-1","parts-wa-324-rc-drift-car-tires-2","parts-wa-324-rc-drift-car-tires-3","parts-wa-324-rc-drift-car-tires-4","parts-wa-324-rc-drift-car-tires-5","parts-wa-324-rc-drift-car-tires-6","parts-wa-324-rc-drift-car-tires-7","parts-wa-324-rc-drift-car-tires-8","parts-wa-325-rc-drift-car-tires-1-4","parts-wa-325-rc-drift-car-tires-1-6","parts-wa-325-rc-drift-car-tires-1-7","parts-wa-325-rc-drift-car-tires-1-8"],"specs":{},"desc_ar":"","desc_en":"","specSource":false,"brand":""},
    {"id":"fg-16-monster-2wd","photos":["baja-wa-326-fg-1-6-26cc-1","baja-wa-326-fg-1-6-26cc-2","baja-wa-326-fg-1-6-26cc-3","baja-wa-326-fg-1-6-26cc-4","baja-wa-326-fg-1-6-26cc-5","baja-wa-326-fg-1-6-26cc-6","baja-wa-326-fg-1-6-26cc-7","baja-wa-533-rc-car-1-6-fg-26cc-1","baja-wa-533-rc-car-1-6-fg-26cc-2","baja-wa-533-rc-car-1-6-fg-26cc-3","baja-wa-533-rc-car-1-6-fg-26cc-4","baja-wa-533-rc-car-1-6-fg-26cc-5","baja-wa-533-rc-car-1-6-fg-26cc-6","baja-wa-533-rc-car-1-6-fg-26cc-7","baja-wa-533-rc-car-1-6-fg-26cc-8"],"specs":{},"desc_ar":"","desc_en":"","specSource":false,"brand":""},
    {"id":"shock-oil-thread-lock","photos":["tools-wa-543-hudy-silconne-oil-1","tools-wa-543-hudy-silconne-oil-2","tools-wa-543-hudy-silconne-oil-4","tools-wa-543-hudy-silconne-oil-5","tools-wa-543-hudy-silconne-oil-6","tools-wa-543-hudy-silconne-oil-7","tools-wa-332-shock-oil-shock-oil-shock-oil-traxxas-4"],"specs":{},"desc_ar":"","desc_en":"","specSource":false,"brand":"HUDY"},
    {"id":"proboat-blackjack-42","photos":["boats-wa-336-blackjack-boat-8s-2","boats-wa-336-blackjack-boat-8s-4","boats-wa-336-blackjack-boat-8s-5"],"specs":{"motor":"Spektrum Marine 4685 4-pole, water-cooled","esc":"Spektrum 160A High Voltage Smart ESC, water-cooled","receiver":"Spektrum SR6110AT 6-channel telemetry","servo":"Spektrum S904 1/6-scale waterproof digital servo","top_speed":"55+ mph"},"desc_ar":"قارب سباق كاتاماران للمحترفين من Pro Boat بطول 42 بوصة، بمحرك Spektrum Marine 4685 ومنظم سرعة 160A مبرّدين بالماء. تتجاوز سرعته 55 ميلًا في الساعة على 8S (بطاريتان 4S)، ويصبح جاهزًا للتشغيل بعد إضافة البطاريات والشاحن.","desc_en":"The Pro Boat Blackjack 42 8S is a 42-inch catamaran race boat with a water-cooled Spektrum Marine 4685 motor and a water-cooled Spektrum 160A Smart ESC, reaching 55+ mph on 8S power (two 4S packs). It is RTR once you add the right batteries and charger, and includes a Spektrum Smart telemetry receiver.","specSource":true,"brand":""},
    {"id":"traxxas-maxx-v2","photos":["offroad-wa-516-traxxas-maxx-v2-3"],"specs":{"motor":"540XL brushless (5 mm shaft)","esc":"Velineon VXL-4s","top_speed":"60+ mph on 4S LiPo","suspension":"WideMaxx suspension (track widened 20 mm/side), Sledgehammer tyres","radio":"TQi 2.4GHz","version":"RTR"},"desc_ar":"مونستر تراك مقاس 1/10 من Traxxas لأصحاب الخبرة المتوسطة، بنظام تعليق WideMaxx الذي يوسّع المسافة بين العجلات 20 مم من كل جانب، مع إطارات Sledgehammer. يدفعه محرك براشلس 540XL إلى أكثر من 60 ميلًا في الساعة على 4S، ويأتي جاهزًا للتشغيل (RTR) مع جهاز التحكم TQi.","desc_en":"The Traxxas Maxx V2 is a 1/10-scale monster truck fitted with WideMaxx suspension that widens the track by 20 mm per side, paired with large Sledgehammer tyres. It runs a 540XL brushless motor and Velineon VXL-4s ESC, reaching 60+ mph on 4S LiPo, with the TQi 2.4GHz radio system, fully assembled and ready to run.","specSource":true,"brand":""},
    {"id":"arrma-talion-exb-6s","photos":[],"specs":{"top_speed":"75+ mph (120+ km/h)","weight":"5.2 kg (no battery)","length":"473 mm","wheelbase":"411 mm","battery":"4S or 6S LiPo, up to 158 x 48 x 70 mm","chassis":"laser-etched 7075-T6 aluminium plate"},"desc_ar":"إصدار EXB من Arrma Talion 6S مقاس 1/7، بدفع رباعي وثلاثة تروس تفاضلية وشاسيه من الألومنيوم 7075-T6. يعمل على 4S أو 6S وتتجاوز سرعته 120 كم/ساعة، ويأتي جاهزًا للتشغيل (RTR) للمحترفين.","desc_en":"The larger EXB version of the Talion 6S, a 1/7-scale RTR truggy capable of 75+ mph (120+ km/h). It weighs 5.2 kg without a battery, has a 411 mm wheelbase, a laser-etched 7075-T6 aluminium chassis plate, runs 4S or 6S LiPo, and has 4WD with three differentials.","specSource":true,"brand":""},
    {"id":"losi-5ive-t-3","photos":["baja-wa-524-losi-5t-3-0-2","baja-wa-524-losi-5t-3-0-3","baja-wa-524-losi-5t-3-0-4","baja-wa-524-losi-5t-3-0-6","baja-wa-524-losi-5t-3-0-7"],"specs":{"engine":"35.2cc Fujiwara FJ350RC petrol (Zenoah G320-based)","radio":"Spektrum DX3 Smart w/ SR615 receiver","tires":"8.5 in Pro-Line Mirage TT on KMC wheels","shocks":"32 mm big-bore, tapered pistons","version":"RTR"},"desc_ar":"أكبر إصدارات Losi 5IVE-T العاملة بالبنزين وأقواها، لهواة السيارات الكبيرة على الرمال والطرق الوعرة. مقاس 1/5 بدفع رباعي ومحرك سعة 35.2cc، وتأتي جاهزة للتشغيل (RTR) مع جهاز التحكم Spektrum DX3 Smart.","desc_en":"The Losi 5IVE-T 3.0 (also sold as the 5IVE-TG 3.0) is a 1/5-scale gas desert truck — the largest and most powerful gas-powered 5IVE-T to date. It runs a 35.2cc Fujiwara FJ350RC engine based on the Zenoah G320, with 4WD, massive 8.5-inch Pro-Line Mirage TT tyres, the Spektrum DX3 Smart radio, and 32 mm big-bore shocks.","specSource":true,"brand":""},
    {"id":"traxxas-x-maxx-8s","photos":["offroad-wa-531-traxxas-x-maxx-1-5-8s-1","offroad-wa-531-traxxas-x-maxx-1-5-8s-2","offroad-wa-531-traxxas-x-maxx-1-5-8s-3"],"specs":{"motor":"1200XL, 1200 rpm/volt","top_speed":"50+ mph on 8S (30+ volts)","battery":"dual 4-cell LiPo packs (8S total, 29.6V); Traxxas 6700mAh iD packs available","version":"RTR"},"desc_ar":"مونستر تراك كبير من Traxxas مقاس 1/5 بدفع رباعي ومحرك 1200XL. يعمل بنظام 8S (بطاريتان 4S) وتتجاوز سرعته 50 ميلًا في الساعة، للمحترفين وهواة القفزات.","desc_en":"The large Traxxas X-Maxx is a 1/5-scale 4WD monster truck running an 8S setup (two 4-cell packs totalling 29.6V) that pushes it beyond 50 mph. Its 1200XL motor spins at 1,200 rpm per volt for extra torque from its larger size, and dedicated Traxxas 6700mAh iD battery packs are available for it.","specSource":true,"brand":""},
    {"id":"traxxas-e-revo-116","photos":["offroad-wa-557-traxxas-r-revo-1-16-1","offroad-wa-557-traxxas-r-revo-1-16-4","offroad-wa-535-traxxas-e-revo-1-16-1","offroad-wa-535-traxxas-e-revo-1-16-2","offroad-wa-535-traxxas-e-revo-1-16-3","offroad-wa-535-traxxas-e-revo-1-16-4","offroad-wa-535-traxxas-e-revo-1-16-5","offroad-wa-535-traxxas-e-revo-1-16-6","offroad-wa-535-traxxas-e-revo-1-16-7"],"specs":{"radio":"TQ 2.4GHz","battery":"6-cell 1200mAh NiMH included","length":"14 in (about half the size of the 1/10 E-Revo)","tires":"Talon tyres on 53mm Gemini wheels","version":"RTR"},"desc_ar":"النسخة المصغّرة من Traxxas E-Revo مقاس 1/16، بدفع رباعي كامل وتروس تفاضلية محكمة الإغلاق. يأتي جاهزًا للتشغيل (RTR) مع جهاز التحكم TQ 2.4GHz وبطارية NiMH بسعة 1200mAh، ومناسب للمبتدئين.","desc_en":"A 1/16-scale Traxxas E-Revo miniature monster truck with full shaft-driven 4WD and sealed differentials. It comes RTR with the TQ 2.4GHz radio and a 6-cell 1200mAh NiMH battery.","specSource":true,"brand":""},
    {"id":"arrma-parts-oils","photos":["parts-wa-545-arrma-parts-3-1","parts-wa-545-arrma-parts-3-2","parts-wa-545-arrma-parts-3-3","parts-wa-545-arrma-parts-3-4","parts-wa-545-arrma-parts-3-5","parts-wa-545-arrma-parts-3-6","parts-wa-545-arrma-parts-3-7","parts-wa-545-arrma-parts-3-8"],"specs":{},"desc_ar":"","desc_en":"","specSource":false,"brand":""}
  ];
  var productIndex = {};
  window.VOLT_PRODUCTS.forEach(function (p) { productIndex[p.id] = p; });
  CATALOG_MERGE.forEach(function (m) {
    var p = productIndex[m.id];
    if (!p) return;
    p.photos = (p.photos || []).concat(m.photos);
    p.specs = p.specs || {};
    Object.keys(m.specs).forEach(function (k) { if (p.specs[k] == null || p.specs[k] === '') p.specs[k] = m.specs[k]; });
    if (m.desc_ar) { p.desc_ar = m.desc_ar + CONTACT_AR; p.desc_en = m.desc_en + CONTACT_EN; }
    if (m.specSource) p.specSource = true;
    if (m.brand) p.brands = (p.brands || []).concat([m.brand]);
  });
  // chargers & batteries get their own category
  ['batteries', 'lipo-4s-1500-100c', 'lipo-balance-charger-dual'].forEach(function (id) { if (productIndex[id]) productIndex[id].category = 'power'; });

  Array.prototype.push.apply(window.VOLT_PRODUCTS, [
    {
      id: "arrma-mojave-grom-223s-blx-1-16-4wd-desert-truck", model: "Arrma Mojave Grom 223S BLX", brands: ["Arrma"],
      name_ar: "ديزرت تراك صغير 1/16 بدفع رباعي", name_en: "1/16 4WD Desert Truck",
      desc_ar: "ديزرت تراك صغير مقاس 1/16 من Arrma، جاهز للتشغيل (RTR) بدفع رباعي ونظام ثبات DSC. تتجاوز سرعته 35 ميلًا في الساعة على 2S و50 ميلًا في الساعة على 3S، ويناسب المبتدئين والمحترفين على حد سواء." + CONTACT_AR,
      desc_en: "The Arrma Mojave Grom is a small-scale 1/16 RTR 4WD desert truck suited to both beginners and experienced bashers. It reaches 35+ mph on a 2S battery and over 50 mph on 3S, and includes Dynamic Stability Control (DSC) built into its electronics for extra control. Its compact size and tough build make it an easy, fun basher." + CONTACT_EN,
      category: "offroad", scales: ["1/16"], level: "beginner", featured: 77, inStock: true, price: null,
      specs: {"drivetrain":"4WD","top_speed":"35+ mph on 2S LiPo, 50+ mph on 3S LiPo","feature":"Dynamic Stability Control (DSC)","version":"RTR"}, specSource: true,
      tags: ["arrma","offroad","arrma mojave grom","عربية","عربيات","ديزرت تراك"],
      photos: ["offroad-wa-002-arrma-mojave-grom-1","offroad-wa-002-arrma-mojave-grom-4","offroad-wa-002-arrma-mojave-grom-5","offroad-wa-002-arrma-mojave-grom-6","offroad-wa-002-arrma-mojave-grom-7","offroad-wa-002-arrma-mojave-grom-8"]
    },
    {
      id: "arrma-kraton-4x4-4s-v2-blx-1-10-speed-monster-tr", model: "Arrma Kraton 4X4 4S V2 BLX", brands: ["Arrma"],
      name_ar: "مونستر تراك 1/10 بدفع رباعي", name_en: "1/10 4WD Monster Truck",
      desc_ar: "مونستر تراك Kraton 4S V2 من Arrma مقاس 1/10 لأصحاب الخبرة المتوسطة، يقع بين فئتي 3S و6S من حيث القوة وسهولة الاستخدام. مزود بمحرك براشلس 2400Kv ومنظم سرعة Firma 120A مقاوم للماء، وتتجاوز سرعته 80 كم/ساعة، ويأتي جاهزًا للتشغيل (RTR)." + CONTACT_AR,
      desc_en: "The Arrma Kraton 4S V2 is a 1/10-scale RTR 4WD monster truck that sits between the 3S and 6S classes for power and ease of use. It runs a 2400Kv brushless motor with a waterproof Spektrum Firma 120A Smart V2 ESC, reaching 50+ mph (80+ km/h). It has dBoots Copperhead 2 tires, a 327 mm wheelbase and weighs 3.63 kg without a battery." + CONTACT_EN,
      category: "offroad", scales: ["1/10"], level: "intermediate", featured: 78, inStock: true, price: null,
      specs: {"motor":"2400Kv brushless","esc":"Spektrum Firma 120A Smart V2 waterproof (IC5/EC5)","top_speed":"50+ mph (80+ km/h)","radio":"Spektrum SLT3 3-channel 2.4GHz w/ SR315 receiver","servo":"Spektrum S662 metal-geared digital servo","tires":"dBoots Copperhead 2 LP","waterproof":"yes","version":"RTR","drivetrain":"4WD","wheelbase":"327 mm","weight":"3.63 kg (no battery)"}, specSource: true,
      tags: ["arrma","offroad","arrma kraton 4s 1/10","arrma kraton 6s v5 1/8","عربية","عربيات","مونستر تراك","مونستر"],
      photos: ["offroad-wa-303-arrma-kraton-4s-1-10-1","offroad-wa-303-arrma-kraton-4s-1-10-2","offroad-wa-303-arrma-kraton-4s-1-10-3","offroad-wa-327-arrma-kraton-6s-v5-1-8-1","offroad-wa-327-arrma-kraton-6s-v5-1-8-2","offroad-wa-327-arrma-kraton-6s-v5-1-8-3","offroad-wa-327-arrma-kraton-6s-v5-1-8-4","offroad-wa-327-arrma-kraton-6s-v5-1-8-5","offroad-wa-327-arrma-kraton-6s-v5-1-8-8"]
    },
    {
      id: "traxxas-slash-4x4-vxl-1-16-brushless-short-cours", model: "Traxxas Slash 4X4 VXL 1/16", brands: ["Traxxas"],
      name_ar: "سيارة شورت كورس 1/16 بدفع رباعي", name_en: "1/16 4WD Short-Course Truck",
      desc_ar: "سيارة شورت كورس صغيرة مقاس 1/16 من Traxxas بدفع رباعي وإلكترونيات مقاومة للماء. مزودة بمحرك براشلس Velineon 380 وبطارية NiMH ضمن المحتويات، ومناسبة للمبتدئين." + CONTACT_AR,
      desc_en: "A small-scale 1/16 short-course truck from Traxxas with 4WD and waterproof electronics for driving in varied conditions. It uses a modern Velineon 380 brushless motor with a VXL-3m speed control, and ships with a 6-cell NiMH battery. Its lightweight nylon chassis and active suspension make it a strong choice for beginners and experienced drivers alike." + CONTACT_EN,
      category: "offroad", scales: ["1/16"], level: "beginner", featured: 77, inStock: true, price: null,
      specs: {"compat":"Traxxas Slash 4X4 VXL 1/16","motor":"Velineon 380 brushless","esc":"VXL-3m brushless ESC","drivetrain":"4WD","length":"14 in (356 mm)","battery":"6-cell NiMH included; compatible with 2S LiPo","waterproof":"yes","version":"RTR"}, specSource: true,
      tags: ["traxxas","offroad","traxxas slash 1/16 brushless","traxxas 1 /16 slash body","treaxxas 1/16","عربية","عربيات","شورت كورس"],
      photos: ["offroad-wa-305-traxxas-slash-1-16-brushless-1","offroad-wa-305-traxxas-slash-1-16-brushless-2","offroad-wa-305-traxxas-slash-1-16-brushless-3","offroad-wa-305-traxxas-slash-1-16-brushless-4","offroad-wa-305-traxxas-slash-1-16-brushless-5","offroad-wa-305-traxxas-slash-1-16-brushless-6","offroad-wa-305-traxxas-slash-1-16-brushless-7","offroad-wa-305-traxxas-slash-1-16-brushless-8","offroad-wa-334-traxxas-1-16-slash-body-1","offroad-wa-538-treaxxas-1-16-1","offroad-wa-538-treaxxas-1-16-2","offroad-wa-538-treaxxas-1-16-3","offroad-wa-538-treaxxas-1-16-5"]
    },
    {
      id: "htrc-t240-duo-dual-channel-touchscreen-charger", model: "HTRC T240 Duo", brands: ["HTRC"],
      name_ar: "شاحن مزدوج بشاشة لمس", name_en: "Dual-channel touchscreen charger",
      desc_ar: "شاحن HTRC T240 Duo بقناتين وشاشة لمس ملونة مقاس 3.2 بوصة، لمن يشحن بطاريتين من نوعين مختلفين في الوقت نفسه. تبلغ قدرته 150 واط على التيار المتردد (AC) و240 واط على التيار المستمر (DC)، بتيار يصل إلى 10 أمبير لكل قناة." + CONTACT_AR,
      desc_en: "The HTRC T240 Duo is a dual-channel charger with a 3.2-inch colour touchscreen that can charge two different batteries at once, delivering up to 150W on AC power or 240W on DC. It supports LiPo, LiFe, LiHV, NiMH, NiCd and Pb chemistries, with adjustable charge current up to 10A per channel." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"output":"AC 150W (75W x2) / DC 240W (120W x2)","channels":"2 independent","charge_current":"0.1–10A per channel","compat":"LiPo/LiHV/Li-Ion/LiFe (1S–6S), NiMH/NiCd (1S–15S), Pb (2–20V)","display":"3.2-inch touchscreen","input":"AC 100–240V or DC 11–18V"}, specSource: true,
      tags: ["htrc","power","htrc t240 duo","شاحن","ليبو"],
      photos: ["power-wa-308-htrc-t240-duo-1","power-wa-308-htrc-t240-duo-2","power-wa-308-htrc-t240-duo-3","power-wa-308-htrc-t240-duo-4","power-wa-308-htrc-t240-duo-5","power-wa-308-htrc-t240-duo-6","power-wa-308-htrc-t240-duo-7","power-wa-308-htrc-t240-duo-8"]
    },
    {
      id: "skyrc-q200neo-ac-dc-smart-charger", model: "SkyRC Q200neo", brands: ["SkyRC"],
      name_ar: "شاحن ذكي بأربعة مخارج", name_en: "4-port smart charger",
      desc_ar: "شاحن SkyRC Q200neo بأربعة مخارج لمن يشحن عدة بطاريات معًا، بقدرة 200 واط على التيار المتردد (AC) وحتى 400 واط على التيار المستمر (DC)، وتيار أقصى 10 أمبير لكل مخرج. يوفّر موازنة للخلايا حتى 800 مللي أمبير، ومخرج USB-C لشحن الهاتف." + CONTACT_AR,
      desc_en: "The SkyRC Q200neo is a smart 4-port charger that accepts 200W AC or up to 400W DC input, with up to 10A per port. It offers precise cell balancing up to 800mA per cell and includes a USB-C output supporting PD and QC3.0 fast charging for phones and other devices." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"output":"AC 200W / DC 400W","ports":"4","per_port":"up to 10A","balance_current":"800 mA/cell","usb":"USB-C PD / QC3.0 output","input":"AC 100–240V or DC 10–30V"}, specSource: true,
      tags: ["skyrc","power","skyrc charger q200 neo","شاحن","ليبو"],
      photos: ["power-wa-309-skyrc-charger-q200-neo-1","power-wa-309-skyrc-charger-q200-neo-2"]
    },
    {
      id: "skyrc-t100-twin-channel-ac-balance-charger", model: "SkyRC T100", brands: ["SkyRC"],
      name_ar: "شاحن مزدوج بموازنة الخلايا", name_en: "Twin-channel balance charger",
      desc_ar: "شاحن SkyRC T100 بقناتين مستقلتين، لشحن بطاريتين من نوعين مختلفين في الوقت نفسه. تيار الشحن قابل للضبط من 0.1 إلى 5.0 أمبير، مع موصل XT60 مدمج وذاكرة تحفظ 10 إعدادات شحن." + CONTACT_AR,
      desc_en: "The SkyRC T100 is a twin-channel AC charger with two independent circuits, letting you charge two different battery chemistries at once (LiPo, LiFe, Li-Ion, LiHV, NiMH, NiCd, Pb). Charge current is adjustable from 0.1 to 5A, it has a built-in XT60 connector, and it can store 10 charge profiles." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"channels":"2 independent","compat":"LiPo/LiFe/Li-Ion/LiHV (2–4S), NiMH/NiCd (6–8 cells), Pb (6/12V)","charge_current":"0.1–5.0A","connector":"built-in XT60","memory":"10 profiles"}, specSource: true,
      tags: ["skyrc","power","skyrc charger t100","شاحن","ليبو"],
      photos: ["power-wa-310-skyrc-charger-t100-1","power-wa-310-skyrc-charger-t100-2"]
    },
    {
      id: "radiolink-rc4gs-v3-5-channel-transmitter-with-r6", model: "Radiolink RC4GS V3 + R6FG", brands: ["Radiolink"],
      name_ar: "جهاز تحكم 5 قنوات ومستقبل بجايرو", name_en: "5-channel radio with gyro receiver",
      desc_ar: "جهاز التحكم Radiolink RC4GS V3 بخمس قنوات، بمدى يصل إلى 400 متر وذاكرة تحفظ 30 طرازًا. يأتي مع مستقبل الإشارة R6FG المزود بجايرو مدمج لتثبيت السيارة، ويناسب الكراولر والدرفت والباجي والقوارب." + CONTACT_AR,
      desc_en: "The Radiolink RC4GS V3 is a 5-channel 2.4GHz transmitter with a control range of up to 400 m and storage for 30 models. It ships with the 6-channel R6FG receiver, which has a built-in gyro for extra stability, and suits crawlers, drift cars, buggies and boats. It can run from a 2–4S LiPo pack or 6 AA batteries." + CONTACT_EN,
      category: "electronics", scales: [], level: null, featured: 43, inStock: true, price: null,
      specs: {"channels":"5","range":"400 m","frequency":"2.4GHz FHSS","model_memory":"30 models","receiver":"R6FG (6-channel, integrated gyro)","power":"4.8–15V (2–4S LiPo or 6xAA)"}, specSource: true,
      tags: ["radiolink","electronics","radiolink rc4gs v3 5ch 2.4g rc transmitter w/ r6fg 6ch gyro radiolink rc4gs v3","ريموت","رسيفر","جايرو"],
      photos: ["electronics-wa-311-radiolink-rc4gs-v3-5ch-2-4g-rc-transmitt-1","electronics-wa-311-radiolink-rc4gs-v3-5ch-2-4g-rc-transmitt-2","electronics-wa-311-radiolink-rc4gs-v3-5ch-2-4g-rc-transmitt-3","electronics-wa-311-radiolink-rc4gs-v3-5ch-2-4g-rc-transmitt-4","electronics-wa-311-radiolink-rc4gs-v3-5ch-2-4g-rc-transmitt-5","electronics-wa-311-radiolink-rc4gs-v3-5ch-2-4g-rc-transmitt-6","electronics-wa-311-radiolink-rc4gs-v3-5ch-2-4g-rc-transmitt-7"]
    },
    {
      id: "radiolink-rc6gs-v3-7-channel-transmitter", model: "Radiolink RC6GS V3", brands: ["Radiolink"],
      name_ar: "جهاز تحكم 7 قنوات", name_en: "7-channel radio",
      desc_ar: "جهاز التحكم Radiolink RC6GS V3 بسبع قنوات، بمدى يصل إلى 600 متر وذاكرة تحفظ 30 طرازًا. يعمل مع مستقبلات مزودة بجايرو مثل R6FG أو R7FG، ويناسب مختلف السيارات والقوارب من الكراولر إلى الدرفت والباجي." + CONTACT_AR,
      desc_en: "The Radiolink RC6GS V3 is a professional 7-channel 2.4GHz transmitter with a 600 m control range and 30-model memory. It supports gyro-equipped receivers such as the R6FG/R7FG for extra stability, and suits a wide range of RC cars and boats — crawlers, drift cars and buggies alike." + CONTACT_EN,
      category: "electronics", scales: [], level: null, featured: 43, inStock: true, price: null,
      specs: {"channels":"7","range":"600 m","frequency":"2.4GHz FHSS","model_memory":"30 models","power":"4.8–16.8V (2–4S LiPo or 6xAA)","weight":"319 g"}, specSource: true,
      tags: ["radiolink","electronics","radiolink rc6gs v3","ريموت"],
      photos: ["electronics-wa-312-radiolink-rc6gs-v3-1","electronics-wa-312-radiolink-rc6gs-v3-2","electronics-wa-312-radiolink-rc6gs-v3-3","electronics-wa-312-radiolink-rc6gs-v3-4","electronics-wa-312-radiolink-rc6gs-v3-5"]
    },
    {
      id: "spektrum-dx3s-3-channel-transmitter", model: "Spektrum DX3S", brands: ["Spektrum"],
      name_ar: "جهاز تحكم 3 قنوات للسيارات والقوارب", name_en: "3-channel radio for cars & boats",
      desc_ar: "جهاز التحكم Spektrum DX3S بثلاث قنوات 2.4GHz وتقنية DSM للسيارات والقوارب. يدعم القياس عن بُعد (Telemetry)، فعند استخدامه مع مستقبل متوافق تظهر حالة البطارية على شاشة جهاز التحكم." + CONTACT_AR,
      desc_en: "The Spektrum DX3S is a 3-channel 2.4GHz DSM radio for cars and boats, with integrated telemetry when paired with a compatible surface receiver so you can see data like battery status directly on the transmitter." + CONTACT_EN,
      category: "electronics", scales: [], level: null, featured: 43, inStock: true, price: null,
      specs: {"channels":"3","technology":"2.4GHz DSM/DSM2","telemetry":"integrated (needs a telemetry-compatible surface receiver)"}, specSource: true,
      tags: ["spektrum","electronics","spektrum dx3s","ريموت"],
      photos: ["electronics-wa-313-spektrum-dx3s-1","electronics-wa-313-spektrum-dx3s-3","electronics-wa-313-spektrum-dx3s-4","electronics-wa-313-spektrum-dx3s-5","electronics-wa-313-spektrum-dx3s-6"]
    },
    {
      id: "hrb-2200mah-2s-7-4v-50c-lipo-battery", model: "HRB 2200mAh 2S 50C LiPo", brands: ["HRB"],
      name_ar: "بطارية ليبو 2S 2200mAh", name_en: "2S 2200mAh LiPo battery",
      desc_ar: "بطارية ليبو من HRB بجهد 7.4 فولت (2S) وسعة 2200mAh ومعدل تفريغ 50C، ووزن يقارب 110 جم. مناسبة للسيارات والقوارب والطائرات." + CONTACT_AR,
      desc_en: "An HRB 7.4V (2S) LiPo battery with a 2200mAh capacity and a 50C discharge rating, weighing about 110 g and measuring 88 x 34 x 20 mm. It suits RC cars, boats and planes that need reliable power and a good runtime." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"capacity":"2200 mAh","voltage":"7.4V (2S)","discharge":"50C continuous","weight":"~110 g","size":"88 x 34 x 20 mm"}, specSource: true,
      tags: ["hrb","power","hrb 2200 mah 2s 7.4v 50c","بطارية","ليبو"],
      photos: ["power-wa-314-hrb-2200-mah-2s-7-4v-50c-1","power-wa-314-hrb-2200-mah-2s-7-4v-50c-3","power-wa-314-hrb-2200-mah-2s-7-4v-50c-4"]
    },
    {
      id: "cnhl-black-series-5000mah-6s-65c-lipo-battery", model: "CNHL Black Series 5000mAh 6S 65C", brands: ["CNHL"],
      name_ar: "بطارية ليبو 6S 5000mAh", name_en: "6S 5000mAh LiPo battery",
      desc_ar: "بطارية ليبو من CNHL بجهد 22.2 فولت (6S) وسعة 5000mAh، بمعدل تفريغ 65C مستمر و130C لحظي، وموصل XT90 أو EC5. للسيارات والقوارب والطائرات التي تتطلب قدرة عالية." + CONTACT_AR,
      desc_en: "A high-performance CNHL LiPo battery with 6 cells (22.2V) and a 5000mAh capacity, rated at 65C continuous discharge (up to 130C burst), with an XT90 or EC5 plug. It suits planes, helicopters, RC cars and boats that need strong, reliable power." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"capacity":"5000 mAh","voltage":"22.2V (6S)","discharge":"65C continuous / 130C burst","plug":"XT90 or EC5","weight":"~839 g","size":"56 x 51 x 144 mm"}, specSource: true,
      tags: ["cnhl","power","cnhl 5000 mah","بطارية","ليبو"],
      photos: ["power-wa-315-cnhl-5000-mah-3","power-wa-315-cnhl-5000-mah-4"]
    },
    {
      id: "spektrum-smart-3s-5000mah-100c-lipo-battery-ic5", model: "Spektrum Smart 3S 5000mAh 100C", brands: ["Spektrum"],
      name_ar: "بطارية ليبو ذكية 3S", name_en: "Smart 3S LiPo battery",
      desc_ar: "بطارية Spektrum Smart 3S بجهد 11.1 فولت وسعة 5000mAh ومعدل تفريغ 100C، لمستخدمي منظومة Spektrum Smart. ينقل موصل IC5 الذكي الطاقة وبيانات الموازنة عبر قابس واحد دون سلك موازنة منفصل، ويحمي الغلاف الصلب (Hardcase) الخلايا." + CONTACT_AR,
      desc_en: "A Spektrum Smart 3S LiPo battery at 11.1V with a 5000mAh capacity and 100C discharge rating, using the Smart IC5 connector that carries both power and balance/telemetry data in a single plug — no separate balance lead needed. Its hardcase protects the cells and improves heat dissipation." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"capacity":"5000 mAh","voltage":"11.1V (3S)","discharge":"100C","connector":"IC5 (Smart, data + power in one plug)","case":"hardcase"}, specSource: true,
      tags: ["spektrum","power","spektrum 3s 5000mah 100c","بطارية","ليبو"],
      photos: ["power-wa-316-spektrum-3s-5000mah-100c-1","power-wa-316-spektrum-3s-5000mah-100c-2","power-wa-316-spektrum-3s-5000mah-100c-3","power-wa-316-spektrum-3s-5000mah-100c-4"]
    },
    {
      id: "1-10-scale-rc-car-model-unspecified", model: "RC Car 1/10", brands: [],
      name_ar: "سيارة ريموت كنترول 1/10", name_en: "1/10 RC car",
      desc_ar: "سيارة ريموت كنترول مقاس 1/10 مناسبة لأصحاب الخبرة المتوسطة، ويتوقف الطراز والعلامة التجارية على المتوفر في المتجر." + CONTACT_AR,
      desc_en: "A 1/10-scale RC car — ask us about the model and brand currently in stock." + CONTACT_EN,
      category: "offroad", scales: ["1/10"], level: "intermediate", featured: 78, inStock: true, price: null,
      specs: {},
      tags: ["offroad","rc car 1/10","عربية","عربيات"],
      photos: ["offroad-wa-317-rc-car-1-10-1","offroad-wa-317-rc-car-1-10-2","offroad-wa-317-rc-car-1-10-3","offroad-wa-317-rc-car-1-10-4","offroad-wa-317-rc-car-1-10-5","offroad-wa-317-rc-car-1-10-6","offroad-wa-317-rc-car-1-10-7","offroad-wa-317-rc-car-1-10-8"]
    },
    {
      id: "traxxas-x-maxx-body-shell", model: "Traxxas X-Maxx Body Shell", brands: ["Traxxas"],
      name_ar: "هيكل بديل لمونستر تراك 1/5", name_en: "X-Maxx replacement body",
      desc_ar: "هيكل خارجي بديل من البولي كربونات لمونستر تراك Traxxas X-Maxx، قابل للطلاء بأشكال وألوان مختلفة. أرسل إلينا الشكل واللون المطلوبين." + CONTACT_AR,
      desc_en: "A replacement polycarbonate body shell for the large Traxxas X-Maxx monster truck, paintable in a range of styles and colours. Tell us the style and colour you want and we will check availability." + CONTACT_EN,
      category: "parts", scales: ["1/5"], level: null, featured: 46, inStock: true, price: null,
      specs: {"compat":"Traxxas X-Maxx 8S"}, specSource: true,
      tags: ["traxxas","parts","body traxxas x maxx","بودي"],
      photos: ["parts-wa-328-body-traxxas-x-maxx-1"]
    },
    {
      id: "1-5-rc-car-body-shell", model: "1/5 Body Shell", brands: [],
      name_ar: "هيكل خارجي مقاس 1/5", name_en: "1/5 body shell",
      desc_ar: "هيكل خارجي من البولي كربونات مقاس 1/5 لسيارات وشاحنات البنزين الكبيرة، بأشكال وألوان مختلفة حسب المتوفر." + CONTACT_AR,
      desc_en: "A 1/5-scale polycarbonate body shell for large Baja-class cars and trucks. Ask about the shapes and colours currently in stock." + CONTACT_EN,
      category: "parts", scales: ["1/5"], level: null, featured: 46, inStock: true, price: null,
      specs: {},
      tags: ["parts","body 1/5 1","body 1/5 2","بودي"],
      photos: ["parts-wa-329-body-1-5-1-1","parts-wa-329-body-1-5-1-2","parts-wa-329-body-1-5-1-3","parts-wa-329-body-1-5-1-4","parts-wa-329-body-1-5-1-5","parts-wa-329-body-1-5-1-6","parts-wa-329-body-1-5-1-7","parts-wa-329-body-1-5-1-8","parts-wa-556-body-1-5-2-1","parts-wa-556-body-1-5-2-2","parts-wa-556-body-1-5-2-3","parts-wa-556-body-1-5-2-4","parts-wa-556-body-1-5-2-5","parts-wa-556-body-1-5-2-6","parts-wa-556-body-1-5-2-7"]
    },
    {
      id: "traxxas-1200mah-7-2v-6-cell-nimh-battery-2925x", model: "Traxxas 1200mAh 7.2V NiMH (2925X)", brands: ["Traxxas"],
      name_ar: "بطارية NiMH بجهد 7.2 فولت", name_en: "7.2V NiMH battery",
      desc_ar: "بطارية NiMH أصلية من Traxxas بجهد 7.2 فولت (6 خلايا) وسعة 1200mAh، مع موصل Traxxas iD. مصممة لسيارات 1/16 مثل E-Revo · Slash 4WD · Summit." + CONTACT_AR,
      desc_en: "A genuine Traxxas 7.2V (6-cell) NiMH battery with a 1200mAh capacity and the easy-to-identify Traxxas iD connector. It is designed for 1/16-scale models such as the E-Revo, Slash 4WD and Summit, and weighs about 145 g." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"capacity":"1200 mAh","voltage":"7.2V (6-cell)","connector":"Traxxas iD","compat":"1/16 E-Revo, 1/16 E-Revo VXL, 1/16 Slash 4WD, 1/16 Summit, 1/18 LaTrax models","length":"94 mm","width":"34 mm","height":"17 mm","weight":"145 g"}, specSource: true,
      tags: ["traxxas","power","traxxas 1200 mah 7.2v nimh","بطارية","نيكل"],
      photos: ["power-wa-330-traxxas-1200-mah-7-2v-nimh-1","power-wa-330-traxxas-1200-mah-7-2v-nimh-2"]
    },
    {
      id: "pro-line-badlands-mx-m2-1-8-buggy-tyres-pre-moun", model: "Pro-Line Badlands MX M2 1/8 (PRO9067-41)", brands: ["Pro-Line"],
      name_ar: "إطارات باجي 1/8 مركّبة على جنوط", name_en: "Pre-mounted 1/8 buggy tyres",
      desc_ar: "إطارات Pro-Line Badlands MX بخامة M2 لسيارات الباجي 1/8، مركّبة مسبقًا على جنوط Velocity V2 سوداء بقاعدة سداسية 17 مم. تمنح تماسكًا ممتازًا على التراب المفكك والطين والعشب، وتصلح للمحور الأمامي أو الخلفي." + CONTACT_AR,
      desc_en: "Pro-Line Badlands MX tyres in the M2 (medium) compound for 1/8-scale buggies, pre-mounted on black Velocity V2 wheels with a 17mm hex. They stand 117 mm tall and 44 mm wide, fit front or rear, and grip well on loose dirt, mud and grass." + CONTACT_EN,
      category: "parts", scales: ["1/8"], level: null, featured: 46, inStock: true, price: null,
      specs: {"compound":"M2 (medium), Pro-Line M2 race rubber","height":"117 mm (4.60 in)","width":"44 mm (1.72 in)","hex":"17 mm","mounted_on":"black Velocity V2 wheels"}, specSource: true,
      tags: ["pro-line","parts","proline pro9067-41 1/8 badlands mx m2 front/rear buggy tires mounted 17mm black","كاوتش","عجل","جنوط"],
      photos: ["parts-wa-331-proline-pro9067-41-1-8-badlands-mx-m2-fr-2","parts-wa-331-proline-pro9067-41-1-8-badlands-mx-m2-fr-3","parts-wa-331-proline-pro9067-41-1-8-badlands-mx-m2-fr-4"]
    },
    {
      id: "hpi-sprint-2-flux-1-10-4wd-brushless-touring-car", model: "HPI Sprint 2 Flux", brands: ["HPI"],
      name_ar: "سيارة تورينج 1/10 بدفع رباعي", name_en: "1/10 4WD Touring Car",
      desc_ar: "سيارة التورينج HPI Sprint 2 Flux مقاس 1/10 بدفع رباعي بالسير، تأتي جاهزة للتشغيل (RTR) بإلكترونيات مقاومة للماء. مزودة بمحرك براشلس Flux Vektor 5900 ونظام تعليق قابل للضبط بالكامل (الكامبر والتو والارتفاع)، وتناسب السباقات والقيادة الترفيهية على حد سواء." + CONTACT_AR,
      desc_en: "The HPI Sprint 2 Flux is a 1/10-scale 4WD belt-driven touring car, RTR with fully waterproof electronics. It runs an HPI Flux Vektor 5900 brushless motor with a Flux Vapor ESC, a 254 mm wheelbase and 431 mm overall length. Its fully adjustable suspension (camber, toe, ride height) suits both racing and casual driving." + CONTACT_EN,
      category: "drift", scales: ["1/10"], level: "intermediate", featured: 78, inStock: true, price: null,
      specs: {"drivetrain":"4WD, belt-driven","motor":"HPI Flux Vektor 5900 brushless","esc":"HPI Flux Vapor waterproof ESC","length":"431 mm","width":"200 mm","wheelbase":"254 mm","height":"127 mm","radio":"2.4GHz","waterproof":"yes","version":"RTR"}, specSource: true,
      tags: ["hpi","drift","hpi sprint 2 flux","عربية","عربيات","تورينج"],
      photos: ["drift-wa-335-hpi-sprint-2-flux-1","drift-wa-335-hpi-sprint-2-flux-2","drift-wa-335-hpi-sprint-2-flux-3"]
    },
    {
      id: "hpi-baja-5b-body-shell-1-5", model: "HPI Baja 5B Body Shell", brands: ["HPI"],
      name_ar: "هيكل بديل للباجا 5B", name_en: "1/5 replacement body",
      desc_ar: "هيكل خارجي بديل من البولي كربونات لسيارة HPI Baja 5B مقاس 1/5، قابل للطلاء. أرسل إلينا الشكل واللون المطلوبين." + CONTACT_AR,
      desc_en: "A replacement polycarbonate body shell for the 1/5-scale HPI Baja 5B, paintable to order. Tell us the style and colour you need and we will check availability." + CONTACT_EN,
      category: "parts", scales: ["1/5"], level: null, featured: 46, inStock: true, price: null,
      specs: {"compat":"HPI Baja 5B"},
      tags: ["hpi","parts","body baja 5b","body 1/5 baja 5b","بودي"],
      photos: ["parts-wa-337-body-baja-5b-1","parts-wa-337-body-baja-5b-2","parts-wa-337-body-baja-5b-3","parts-wa-337-body-baja-5b-4","parts-wa-337-body-baja-5b-5","parts-wa-337-body-baja-5b-6","parts-wa-337-body-baja-5b-8"]
    },
    {
      id: "losi-1-5-dbxl-4wd-gas-desert-buggy-rtr-23cc", model: "Losi DBXL 1/5 23cc", brands: ["Losi"],
      name_ar: "باجي 1/5 بمحرك بنزين ودفع رباعي", name_en: "1/5 Petrol 4WD Buggy",
      desc_ar: "باجي صحراوي Losi DBXL مقاس 1/5 للمحترفين، بمحرك بنزين سعة 23cc ببادئ سحب ودفع رباعي وشاسيه من الألومنيوم 6061-T6 بسماكة 4 مم. يكفي خزان الوقود الممتلئ لأكثر من 40 دقيقة من القيادة، ويأتي جاهزًا للتشغيل (RTR) مع جهاز التحكم Spektrum DX2E." + CONTACT_AR,
      desc_en: "The Losi DBXL is a 1/5-scale gas buggy with a 23cc pull-start engine, 4WD and a rugged 4 mm 6061-T6 aluminium chassis. It is 781 mm long and weighs about 13 kg, comes with the 2-channel Spektrum DX2E radio, and runs for over 40 minutes on a full tank." + CONTACT_EN,
      category: "baja", scales: ["1/5"], level: "pro", featured: 80, inStock: true, price: null,
      specs: {"engine":"23cc pull-start petrol","drivetrain":"4WD","length":"781 mm (30.75 in)","weight":"13.01 kg (28.7 lb)","chassis":"4 mm 6061-T6 aluminium","radio":"Spektrum DX2E 2-channel","version":"RTR","width":"485 mm (19.1 in)","height":"311 mm (12.25 in)","wheelbase":"559 mm (22.0 in)"}, specSource: true,
      tags: ["losi","baja","losi dbxl 1/5 23cc","losi 1/5 23cc","losi dbxl v1 1/5","عربية","عربيات","باجي","بنزين"],
      photos: ["baja-wa-338-losi-dbxl-1-5-23cc-1","baja-wa-338-losi-dbxl-1-5-23cc-2","baja-wa-338-losi-dbxl-1-5-23cc-3","baja-wa-338-losi-dbxl-1-5-23cc-4","baja-wa-506-losi-dbxl-v1-1-5-3","baja-wa-506-losi-dbxl-v1-1-5-4","baja-wa-506-losi-dbxl-v1-1-5-5","baja-wa-506-losi-dbxl-v1-1-5-6","baja-wa-506-losi-dbxl-v1-1-5-7","baja-wa-506-losi-dbxl-v1-1-5-8"]
    },
    {
      id: "rc-brushed-motor-generic-540-550-size", model: "RC Brushed Motor (540 / 550)", brands: [],
      name_ar: "محرك براشد لسيارات 1/10", name_en: "Brushed motor for 1/10 cars",
      desc_ar: "محرك براشد بمقاس شائع لسيارات 1/10، لاستبدال المحرك التالف أو لترقية بسيطة. أرسل إلينا طراز سيارتك وعدد اللفات (Turns) المطلوب لنرشّح لك المحرك المناسب." + CONTACT_AR,
      desc_en: "A standard brushed RC motor in a common size suited to 1/10-scale cars, for replacing a worn motor or a simple upgrade. Tell us your car model and preferred turn count and we will suggest the right one." + CONTACT_EN,
      category: "parts", scales: [], level: null, featured: 46, inStock: true, price: null,
      specs: {},
      tags: ["parts","motor brushed","موتور","براشد"],
      photos: ["parts-wa-341-motor-brushed-1","parts-wa-341-motor-brushed-2"]
    },
    {
      id: "rc-battery-connectors-xt60-xt90-deans-ec3-etc", model: "Battery Connectors (XT60 / XT90 / Deans / EC3)", brands: [],
      name_ar: "موصلات وقوابس للبطاريات", name_en: "Battery plugs & connectors",
      desc_ar: "موصلات بطاريات بالأنواع الأكثر شيوعًا مثل XT60 · XT90 · Deans · EC3، لتركيب موصلات البطاريات والشواحن أو استبدالها. أرسل إلينا النوع المطلوب." + CONTACT_AR,
      desc_en: "Battery connectors and plugs in common types such as XT60, XT90, Deans and EC3, for wiring or replacing battery and charger connectors. Tell us which type you need and we will confirm stock." + CONTACT_EN,
      category: "electronics", scales: [], level: null, featured: 43, inStock: true, price: null,
      specs: {},
      tags: ["electronics","rc connector 1","rc connector 2","بطارية","فيش"],
      photos: ["electronics-wa-342-rc-connector-1-1","electronics-wa-342-rc-connector-1-2","electronics-wa-342-rc-connector-1-3","electronics-wa-342-rc-connector-1-4","electronics-wa-342-rc-connector-1-5","electronics-wa-342-rc-connector-1-6","electronics-wa-342-rc-connector-1-7","electronics-wa-517-rc-connector-2-1","electronics-wa-517-rc-connector-2-2","electronics-wa-517-rc-connector-2-3","electronics-wa-517-rc-connector-2-4","electronics-wa-517-rc-connector-2-6","electronics-wa-517-rc-connector-2-7","electronics-wa-517-rc-connector-2-8"]
    },
    {
      id: "rc-boat-model-unspecified", model: "RC Boat", brands: [],
      name_ar: "قارب ريموت كنترول", name_en: "RC boat",
      desc_ar: "قارب ريموت كنترول لهواة الإثارة على سطح الماء، وتتغيّر الطرازات المعروضة حسب المتوفر في المتجر." + CONTACT_AR,
      desc_en: "An RC boat — ask us which models are in stock." + CONTACT_EN,
      category: "boats", scales: [], level: null, featured: 24, inStock: true, price: null,
      specs: {},
      tags: ["boats","rc boat","لانش","مركب","قارب"],
      photos: ["boats-wa-505-rc-boat-1","boats-wa-505-rc-boat-2","boats-wa-505-rc-boat-3","boats-wa-505-rc-boat-4","boats-wa-505-rc-boat-5","boats-wa-505-rc-boat-6","boats-wa-505-rc-boat-7","boats-wa-505-rc-boat-8"]
    },
    {
      id: "outerwears-pull-start-pre-filter-cover", model: "Outerwears Pull-Start Pre-Filter", brands: ["Outerwears"],
      name_ar: "غطاء فلتر لبادئ السحب", name_en: "Pull-start pre-filter cover",
      desc_ar: "غطاء فلتر (Pre-Filter) من Outerwears لبادئ السحب في محركات البنزين، يمنع دخول الغبار والرمال إلى المحرك. مصنوع من شبك بوليستر طارد للماء ومقاوم للأشعة فوق البنفسجية، وقابل للغسل وإعادة الاستخدام، ويتوافق مع معظم أنظمة بدء التشغيل في محركات Zenoah · Chung Yang · Rovan · King Motor." + CONTACT_AR,
      desc_en: "An Outerwears pre-filter cover for the pull-start assembly on petrol Baja engines, made from water-repellent, UV-resistant polyester mesh. It fits most Zenoah, Chung Yang, Rovan and King Motor pull-starters, keeps dust and sand out of the engine, and is washable and reusable." + CONTACT_EN,
      category: "tools", scales: [], level: null, featured: 26, inStock: true, price: null,
      specs: {"material":"polyester mesh, water-repellent, UV resistant","compat":"Zenoah G230RC/G260RC/G270RC/G290RC/G320RC and Chung Yang CY23/26/27/29RC pull-starters (Rovan/KM/Taylor RC/OBR starters)"}, specSource: true,
      tags: ["outerwears","tools","outerwears r/c pullstart","فلتر","مارش","بنزين"],
      photos: ["tools-wa-507-outerwears-r-c-pullstart-1","tools-wa-507-outerwears-r-c-pullstart-3"]
    },
    {
      id: "turbo-racing-c71-1-76-mini-cooper-rc-car", model: "Turbo Racing C71 1/76 Mini Cooper", brands: ["Turbo Racing"],
      name_ar: "سيارة ميني 1/76", name_en: "Tiny 1/76 RC car",
      desc_ar: "سيارة صغيرة جدًا مقاس 1/76 من Turbo Racing بهيكل Mini Cooper، بدفع خلفي وتحكم تناسبي كامل في السرعة والتوجيه، ومناسبة للمبتدئين. تُشحن بطاريتها عبر USB-C وتعمل حتى 30 دقيقة، وتأتي مع إضاءة LED وهياكل إضافية قابلة للتلوين." + CONTACT_AR,
      desc_en: "The Turbo Racing C71 is a tiny 1/76-scale Mini Cooper-styled RC car with rear-wheel drive and full proportional control via a 2.4GHz 4-channel radio. It has a built-in 40mAh LiPo battery charged over USB-C, giving up to 30 minutes of runtime, with a 30 m control range. It comes with LED head/tail lights and extra unpainted body shells for customising." + CONTACT_EN,
      category: "drift", scales: ["1/76"], level: "beginner", featured: 77, inStock: true, price: null,
      specs: {"drivetrain":"RWD","battery":"built-in 40 mAh LiPo, USB-C charging","control_range":"30 m","radio":"2.4GHz, 4-channel proportional","runtime":"up to 30 minutes"}, specSource: true,
      tags: ["turbo racing","drift","turbo racing 176/ mini cooper","turbo racing 1 76 mini cooper","عربية","عربيات","ميني"],
      photos: ["drift-wa-508-turbo-racing-176-mini-cooper-1","drift-wa-508-turbo-racing-176-mini-cooper-2","drift-wa-508-turbo-racing-176-mini-cooper-3","drift-wa-508-turbo-racing-176-mini-cooper-4"]
    },
    {
      id: "austarhobby-ax-3013-170mm-wheel-tyre-set-17mm-he", model: "AustarHobby AX-3013 170mm Wheels", brands: ["AustarHobby"],
      name_ar: "إطارات وجنوط لمونستر تراك 1/8", name_en: "1/8 monster truck wheels & tyres",
      desc_ar: "طقم إطارات وجنوط AustarHobby بقطر 170 مم وقاعدة سداسية 17 مم، متوافق مع معظم سيارات المونستر تراك 1/8 من HPI · HSP · Traxxas. خيار اقتصادي لاستبدال الإطارات القديمة أو تجديد مظهر السيارة." + CONTACT_AR,
      desc_en: "An AustarHobby 170mm wheel and tyre set with a 17mm hex, compatible with most 1/8-scale monster trucks from HPI, HSP and Traxxas. A budget-friendly option for replacing worn tyres or refreshing a truck's look." + CONTACT_EN,
      category: "parts", scales: ["1/8"], level: null, featured: 46, inStock: true, price: null,
      specs: {"diameter":"170 mm","hex":"17 mm","compat":"1/8 monster trucks (HPI, HSP, Traxxas)"}, specSource: true,
      tags: ["austarhobby","parts","austarhobby 170mm wheel tires 17mm hex for 1/8 rc monster","كاوتش","عجل","جنوط","مونستر"],
      photos: ["parts-wa-509-austarhobby-170mm-wheel-tires-17mm-hex-f-1","parts-wa-509-austarhobby-170mm-wheel-tires-17mm-hex-f-2","parts-wa-509-austarhobby-170mm-wheel-tires-17mm-hex-f-3","parts-wa-509-austarhobby-170mm-wheel-tires-17mm-hex-f-4"]
    },
    {
      id: "imax-b6ac-v2-ac-dc-balance-charger", model: "iMAX B6AC V2", brands: ["iMAX"],
      name_ar: "شاحن موازنة AC/DC", name_en: "AC/DC balance charger",
      desc_ar: "إصدار AC/DC من شاحن iMAX B6 الشهير بين الهواة، يعمل على التيار المنزلي (100-240 فولت) أو التيار المستمر (11-18 فولت) دون الحاجة إلى مزود طاقة خارجي. تصل قدرته إلى 50 واط وتيار الشحن إلى 6.0 أمبير، ويوازن بطاريات LiPo · Li-ion · LiFe حتى 6 خلايا، إلى جانب NiMH · NiCd · Pb." + CONTACT_AR,
      desc_en: "The iMAX B6AC V2 version of the popular charger runs from either AC (100–240V) or DC (11–18V) power, without needing a separate external supply. It delivers up to 50W of charging at up to 6A and balance-charges LiPo, Li-ion and LiFe packs up to 6 cells, plus NiMH, NiCd and Pb batteries." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"output":"50W max charge / 5W max discharge","input":"AC 100–240V or DC 11–18V","charge_current":"0.1–6.0A","discharge_current":"0.1–1.0A","compat":"LiPo/Li-ion/LiFe (1–6S), NiMH/NiCd (1–15 cells), Pb (2–20V)","weight":"277 g"}, specSource: true,
      tags: ["imax","power","imax b6ac","imax b6","شاحن","ليبو"],
      photos: ["power-wa-548-imax-b6ac-1","power-wa-548-imax-b6ac-2","power-wa-548-imax-b6ac-3","power-wa-548-imax-b6ac-4","power-wa-548-imax-b6ac-5","power-wa-548-imax-b6ac-6","power-wa-548-imax-b6ac-7","power-wa-510-imax-b6-1","power-wa-510-imax-b6-2","power-wa-510-imax-b6-3"]
    },
    {
      id: "arrma-typhon-4x4-tlr-tuned-1-8-race-buggy", model: "Arrma Typhon 4X4 TLR Tuned", brands: ["Arrma"],
      name_ar: "باجي سباق 1/8 بدفع رباعي", name_en: "1/8 4WD Race Buggy",
      desc_ar: "إصدار TLR Tuned من باجي Arrma Typhon مقاس 1/8، بدفع رباعي ومجموعة نقل حركة معززة بالكامل: تروس تفاضلية معدنية وتروس مقسّاة وأعمدة نقل فولاذية. مزود بجناح خلفي قابل للضبط لثبات أعلى على السرعات العالية، ومناسب لهواة القيادة الحرة الراغبين في دخول عالم السباقات." + CONTACT_AR,
      desc_en: "The TLR Tuned version of the Arrma Typhon 1/8-scale buggy, with 4WD and a fully upgraded drivetrain — all-metal differentials, hardened gears and a steel driveshaft. It has an adjustable rear wing for high-speed stability and a sliding motor mount for quick access, aimed at bashers looking to step into racing without giving up durability." + CONTACT_EN,
      category: "offroad", scales: ["1/8"], level: "pro", featured: 80, inStock: true, price: null,
      specs: {"drivetrain":"4WD","tires":"dBoots Exabyte race-compound tyres","drivetrain_parts":"all-metal diff outdrives, gearbox internals and steel driveshafts","feature":"adjustable race-spec rear wing, sliding aluminium motor mount"}, specSource: true,
      tags: ["arrma","offroad","arrma typhon tlr 1/8","عربية","عربيات","باجي"],
      photos: ["offroad-wa-511-arrma-typhon-tlr-1-8-1","offroad-wa-511-arrma-typhon-tlr-1-8-4","offroad-wa-511-arrma-typhon-tlr-1-8-5","offroad-wa-511-arrma-typhon-tlr-1-8-7","offroad-wa-511-arrma-typhon-tlr-1-8-8"]
    },
    {
      id: "skyrc-e3-ac-balance-charger", model: "SkyRC e3", brands: ["SkyRC"],
      name_ar: "شاحن موازنة صغير 2S · 3S", name_en: "Compact 2S–3S balance charger",
      desc_ar: "شاحن SkyRC e3 صغير واقتصادي لبطاريات ليبو 2S أو 3S، يعمل مباشرة على التيار المنزلي دون مزود طاقة خارجي. خيار بسيط ومنتشر بين هواة الريموت كنترول ولاعبي الإيرسوفت." + CONTACT_AR,
      desc_en: "The compact, low-cost SkyRC e3 is an AC balance charger for 2S–3S LiPo batteries, running directly from mains power without an external supply. It is a simple, popular choice among RC hobbyists and airsoft users alike." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"compat":"LiPo 2–3S","type":"compact AC balance charger"}, specSource: true,
      tags: ["skyrc","power","skyrc charger e3","شاحن","ليبو"],
      photos: ["power-wa-514-skyrc-charger-e3-1"]
    },
    
    {
      id: "4s-5200mah-120c-lipo-battery", model: "4S 5200mAh 120C LiPo", brands: [],
      name_ar: "بطارية ليبو 4S 5200mAh", name_en: "4S 5200mAh LiPo battery",
      desc_ar: "بطارية ليبو بجهد 14.8 فولت (4S) وسعة 5200mAh ومعدل تفريغ مرتفع 120C، مناسبة للسيارات والشاحنات القوية التي تسحب تيارًا عاليًا. تتوقف العلامة التجارية على المتوفر في المتجر." + CONTACT_AR,
      desc_en: "A 14.8V (4S) LiPo battery with a 5200mAh capacity and a high 120C discharge rating, suited to powerful cars and trucks that draw heavy current. Ask us which brand is in stock." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"capacity":"5200 mAh","voltage":"14.8V (4S)","discharge":"120C"},
      tags: ["power","5200 mah 120c 14.8v 4s","بطارية","ليبو"],
      photos: ["power-wa-523-5200-mah-120c-14-8v-4s-1","power-wa-523-5200-mah-120c-14-8v-4s-2","power-wa-523-5200-mah-120c-14-8v-4s-3","power-wa-523-5200-mah-120c-14-8v-4s-4","power-wa-523-5200-mah-120c-14-8v-4s-5"]
    },
    {
      id: "1-10-rc-formula-1-car", model: "RC Formula Car 1/10", brands: [],
      name_ar: "سيارة فورمولا 1/10 للأسفلت", name_en: "1/10 Formula on-road car",
      desc_ar: "سيارة فورمولا ريموت كنترول مقاس 1/10 للأسفلت، لعشاق سباقات الفورمولا وأصحاب الخبرة المتوسطة. يتوقف الطراز على المتوفر في المتجر." + CONTACT_AR,
      desc_en: "A 1/10-scale RC Formula on-road car — ask us about the model in stock." + CONTACT_EN,
      category: "drift", scales: ["1/10"], level: "intermediate", featured: 78, inStock: true, price: null,
      specs: {},
      tags: ["drift","f1 1/10","عربية","عربيات","فورمولا"],
      photos: ["drift-wa-526-f1-1-10-1","drift-wa-526-f1-1-10-2","drift-wa-526-f1-1-10-3","drift-wa-526-f1-1-10-4","drift-wa-526-f1-1-10-6","drift-wa-526-f1-1-10-7"]
    },
    {
      id: "spektrum-smart-4s-5000mah-100c-lipo-battery-ic5", model: "Spektrum Smart 4S 5000mAh 100C", brands: ["Spektrum"],
      name_ar: "بطارية ليبو ذكية 4S", name_en: "Smart 4S LiPo battery",
      desc_ar: "بطارية Spektrum Smart 4S بجهد 14.8 فولت وسعة 5000mAh ومعدل تفريغ 100C، مع موصل IC5 الذكي الذي ينقل الطاقة وبيانات الموازنة دون سلك موازنة منفصل. تسجّل البطارية عدد دورات الشحن والتفريغ وسجل الأعطال لتتابع حالتها باستمرار." + CONTACT_AR,
      desc_en: "A Spektrum Smart 4S LiPo battery at 14.8V with a 5000mAh capacity and 100C discharge rating, using the Smart IC5 connector that carries power and balance data together without a separate lead. The battery logs data such as charge/discharge cycles and fault history to track its health." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"capacity":"5000 mAh","voltage":"14.8V (4S)","discharge":"100C","connector":"IC5 (Smart, data + power in one plug)","case":"hardcase"}, specSource: true,
      tags: ["spektrum","power","spektrum 4s 5000mah 100c","بطارية","ليبو"],
      photos: ["power-wa-527-spektrum-4s-5000mah-100c-1","power-wa-527-spektrum-4s-5000mah-100c-2","power-wa-527-spektrum-4s-5000mah-100c-3"]
    },
    {
      id: "dynamite-350mah-2s-7-4v-lipo-battery-ph2-0", model: "Dynamite 350mAh 2S LiPo (PH2.0)", brands: ["Dynamite"],
      name_ar: "بطارية ليبو 2S للكراولر الصغير", name_en: "Small 2S LiPo for micro crawlers",
      desc_ar: "بطارية Dynamite صغيرة بجهد 7.4 فولت (2S) وسعة 350mAh مع موصل PH2.0، مصممة لسيارات الكراولر الصغيرة مثل Axial SCX24 والطرازات المشابهة." + CONTACT_AR,
      desc_en: "A small Dynamite battery at 7.4V (2S) with a 350mAh capacity and a PH2.0 connector, designed for micro crawlers such as the Axial SCX24 and similar small-scale models." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"capacity":"350 mAh","voltage":"7.4V (2S)","connector":"PH2.0","length":"55.56 mm","width":"28.57 mm","use":"Axial SCX24 and similar micro crawlers"}, specSource: true,
      tags: ["dynamite","power","dynamite 350mah 2s 7.4v lipo battery","بطارية","ليبو","كراولر"],
      photos: ["power-wa-529-dynamite-350mah-2s-7-4v-lipo-battery-1"]
    },
    {
      id: "pineal-model-1-8-body-shell-sg-ck01-for-sg-801-8", model: "Pineal Model SG-CK01 1/8 Body", brands: ["Pineal Model"],
      name_ar: "هيكل بديل مقاس 1/8", name_en: "1/8 replacement body",
      desc_ar: "هيكل خارجي بديل من البلاستيك (رمز SG-CK01) لسيارات Pineal Model SG-801 · SG-802 · SG-803 مقاس 1/8. يبلغ طوله 475 مم وعرضه 210 مم، على قاعدة عجلات 325 مم." + CONTACT_AR,
      desc_en: "A replacement plastic body shell (SG-CK01) for the Pineal Model SG-801, SG-802 and SG-803 1/8-scale cars, measuring 475 x 210 mm with a 325 mm wheelbase and weighing about 500 g." + CONTACT_EN,
      category: "parts", scales: ["1/8"], level: null, featured: 46, inStock: true, price: null,
      specs: {"length":"475 mm","width":"210 mm","wheelbase":"325 mm","weight":"~500 g","compat":"Pineal Model SG-801 / SG-802 / SG-803"}, specSource: true,
      tags: ["pineal model","parts","pineal model 1/8 car body shell for sg-801/802/803","بودي"],
      photos: ["parts-wa-530-pineal-model-1-8-car-body-shell-for-sg-8-2","parts-wa-530-pineal-model-1-8-car-body-shell-for-sg-8-3","parts-wa-530-pineal-model-1-8-car-body-shell-for-sg-8-4","parts-wa-530-pineal-model-1-8-car-body-shell-for-sg-8-5","parts-wa-530-pineal-model-1-8-car-body-shell-for-sg-8-6"]
    },
    {
      id: "cnhl-racing-series-5200mah-lipo-battery", model: "CNHL Racing Series 5200mAh", brands: ["CNHL"],
      name_ar: "بطارية ليبو 5200mAh", name_en: "5200mAh LiPo battery",
      desc_ar: "بطارية CNHL من سلسلة Racing لمحبي الأداء العالي، بسعة 5200mAh ومعدل تفريغ 90C مستمر (حتى 180C لحظي) وموصل EC5. متوفرة من 3S حتى 6S، لذا حدّد عدد الخلايا المطلوب عند الطلب." + CONTACT_AR,
      desc_en: "A CNHL Racing Series LiPo battery with a 5200mAh capacity and a 90C continuous discharge rating (up to 180C burst), with an EC5 plug. It is available in several configurations from 3S to 6S, so please specify the cell count (voltage) you need when ordering." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"capacity":"5200 mAh","discharge":"90C continuous / 180C burst","plug":"EC5","available_configs":"3S (11.1V), 4S (14.8V), 5S (18.5V) and 6S (22.2V)"},
      tags: ["cnhl","power","cnhl 5200 mah","بطارية","ليبو"],
      photos: ["power-wa-534-cnhl-5200-mah-1","power-wa-534-cnhl-5200-mah-2","power-wa-534-cnhl-5200-mah-3","power-wa-534-cnhl-5200-mah-5"]
    },
    {
      id: "traxxas-ez-peak-plus-4s-charger-2981", model: "Traxxas EZ-Peak Plus 4S (2981)", brands: ["Traxxas"],
      name_ar: "شاحن 4S يتعرّف على البطارية تلقائيًا", name_en: "4S charger with battery auto-detect",
      desc_ar: "شاحن Traxxas EZ-Peak Plus 4S (رمز 2981) لمستخدمي بطاريات Traxxas، بقدرة 75 واط وتيار حتى 8 أمبير، يشحن بطاريات NiMH (5-8 خلايا) وبطاريات ليبو من 2S حتى 4S. يتعرّف نظام Traxxas iD على البطارية تلقائيًا ويضبط إعدادات الشحن، مع وضع تخزين بزر واحد." + CONTACT_AR,
      desc_en: "The Traxxas EZ-Peak Plus 4S charger (part 2981) delivers 75W at up to 8A, charging NiMH (5–8 cell) and 2S–4S LiPo batteries. It uses the Traxxas iD system to automatically detect the battery and configure the correct charge settings, with a one-button storage mode." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {"output":"75W, 8A","compat":"NiMH (5–8 cell) & LiPo 2S–4S","features":"Traxxas iD auto battery detection, one-button storage mode, built-in balance port"}, specSource: true,
      tags: ["traxxas","power","traxxas 2981 - ez-peak plus 4s charger","شاحن","ليبو"],
      photos: ["power-wa-536-traxxas-2981-ez-peak-plus-4s-charger-1"]
    },
    {
      id: "xray-1-10-electric-on-road-touring-pan-car-exact", model: "Xray 1/10 On-Road Touring Car", brands: ["Xray"],
      name_ar: "سيارة تورينج سباق 1/10", name_en: "1/10 On-road Touring Car",
      desc_ar: "سيارة تورينج مخصصة للسباق مقاس 1/10 من XRAY، لهواة السباقات على الأسفلت. يتوقف الطراز على المتوفر في المتجر." + CONTACT_AR,
      desc_en: "A 1/10-scale on-road touring race car from XRAY — ask us about the exact model in stock." + CONTACT_EN,
      category: "drift", scales: ["1/10"], level: "intermediate", featured: 78, inStock: true, price: null,
      specs: {},
      tags: ["xray","drift","x ray 1/10","عربية","عربيات","تورينج"],
      photos: ["drift-wa-539-x-ray-1-10-1","drift-wa-539-x-ray-1-10-2","drift-wa-539-x-ray-1-10-3","drift-wa-539-x-ray-1-10-4","drift-wa-539-x-ray-1-10-5","drift-wa-539-x-ray-1-10-6","drift-wa-539-x-ray-1-10-7","drift-wa-539-x-ray-1-10-8"]
    },
    {
      id: "arrma-fireteam-6s-blx-1-7-4wd-buggy", model: "Arrma Fireteam 6S BLX 1/7", brands: ["Arrma"],
      name_ar: "باجي 1/7 بدفع رباعي", name_en: "1/7 4WD Buggy",
      desc_ar: "باجي Fireteam 6S من Arrma مقاس 1/7 للمحترفين، جاهز للتشغيل (RTR) بدفع رباعي وقاعدة عجلات طويلة ومسار عريض لثبات أفضل. تتجاوز سرعته 96 كم/ساعة، وهو أول سيارة أوف رود من Arrma مزودة بفرامل يد ميكانيكية." + CONTACT_AR,
      desc_en: "The Arrma Fireteam 6S is a 1/7-scale RTR 4WD buggy with an extra-long wheelbase and wide track for dynamic handling. It reaches 60+ mph (96+ km/h) and is the first Arrma off-road vehicle to include a mechanical handbrake, riding on multi-terrain dBoots Fireteam tyres." + CONTACT_EN,
      category: "offroad", scales: ["1/7"], level: "pro", featured: 80, inStock: true, price: null,
      specs: {"top_speed":"60+ mph (96+ km/h)","drivetrain":"4WD","feature":"mechanical handbrake (first for an Arrma off-road vehicle)","tires":"dBoots Fireteam multi-terrain","version":"RTR"}, specSource: true,
      tags: ["arrma","offroad","arrma fireteam  1/7","arrma fireteam 1/7","عربية","عربيات","باجي"],
      photos: ["offroad-wa-540-arrma-fireteam-1-7-1","offroad-wa-540-arrma-fireteam-1-7-2","offroad-wa-540-arrma-fireteam-1-7-3","offroad-wa-540-arrma-fireteam-1-7-4","offroad-wa-540-arrma-fireteam-1-7-5","offroad-wa-540-arrma-fireteam-1-7-6","offroad-wa-540-arrma-fireteam-1-7-7","offroad-wa-540-arrma-fireteam-1-7-8"]
    },
    {
      id: "spektrum-smart-s150-ac-dc-charger-model-assumed", model: "Spektrum Smart Charger", brands: ["Spektrum"],
      name_ar: "شاحن ذكي لبطاريات ليبو", name_en: "Smart charger",
      desc_ar: "شاحن ذكي من Spektrum لبطاريات LiPo · Li-ion · LiHV، لمستخدمي بطاريات Spektrum Smart وغيرها. يتوقف الطراز على المتوفر في المتجر." + CONTACT_AR,
      desc_en: "A Spektrum Smart charger for LiPo, Li-ion and LiHV packs — ask us which model is in stock." + CONTACT_EN,
      category: "power", scales: [], level: null, featured: 44, inStock: true, price: null,
      specs: {},
      tags: ["spektrum","power","spektrum charger","شاحن","ليبو"],
      photos: ["power-wa-542-spektrum-charger-1","power-wa-542-spektrum-charger-2","power-wa-542-spektrum-charger-4"]
    },
    {
      id: "rc-car-led-light-kit", model: "RC Car LED Light Kit", brands: [],
      name_ar: "طقم إضاءة LED للسيارات", name_en: "LED light kit",
      desc_ar: "طقم إضاءة LED لسيارات الريموت كنترول، يضيف أضواء أمامية وخلفية بمظهر واقعي. أرسل إلينا مقاس سيارتك وطرازها لنرشّح لك الطقم المناسب." + CONTACT_AR,
      desc_en: "An LED lighting kit for RC cars, adding realistic front and rear lights. Tell us your car's size and model and we will suggest the right kit." + CONTACT_EN,
      category: "parts", scales: [], level: null, featured: 46, inStock: true, price: null,
      specs: {},
      tags: ["parts","rc car led","إضاءة","ليد"],
      photos: ["parts-wa-544-rc-car-led-1","parts-wa-544-rc-car-led-2","parts-wa-544-rc-car-led-3","parts-wa-544-rc-car-led-4","parts-wa-544-rc-car-led-5","parts-wa-544-rc-car-led-6","parts-wa-544-rc-car-led-7","parts-wa-544-rc-car-led-8"]
    },
    {
      id: "traxxas-velineon-vxl-8s-waterproof-esc", model: "Traxxas Velineon VXL-8S ESC", brands: ["Traxxas"],
      name_ar: "منظم سرعة مقاوم للماء حتى 8S", name_en: "Waterproof 4S–8S ESC",
      desc_ar: "منظم السرعة (ESC) Traxxas Velineon VXL-8S مقاوم للماء ويعمل من 4S حتى 8S (بجهد أقصى 33.6 فولت)، وهو نفسه المستخدم في سيارات X-Maxx · XRT. مزود بمروحة تبريد ومخرج BEC بجهد 6.0 فولت وتيار 10 أمبير مستمر (20 أمبير لحظي)، ومناسب لترقية السيارات الكبيرة أو استبدال منظم السرعة." + CONTACT_AR,
      desc_en: "The Traxxas Velineon VXL-8S is a waterproof ESC supporting 4S to 8S LiPo (up to 33.6V), the same unit used in the X-Maxx and XRT. It has a built-in cooling fan, a 6V BEC rated at 10A continuous (20A peak), and weighs 215.5 g." + CONTACT_EN,
      category: "electronics", scales: [], level: null, featured: 43, inStock: true, price: null,
      specs: {"input":"4S/6S/8S LiPo (max 33.6V)","bec":"6.0V, 10A continuous / 20A peak","waterproof":"yes (sealed case with O-rings)","weight":"215.5 g","size":"58 x 72 x 46 mm","connectors":"Traxxas 6.5mm bullet motor connectors"}, specSource: true,
      tags: ["traxxas","electronics","traxxas esc 8s","اسبيد كنترول"],
      photos: ["electronics-wa-549-traxxas-esc-8s-1"]
    }
  ]);

  /* ---------- Level shortcuts: typical first models listed first (then the rest by weight) ---------- */
  window.VOLT_LEVEL_ORDER = {
    beginner: ['foam-trainer-3ch', 'foam-trainer-4ch-gyro', 'cessna-foam-trainer', 'foam-glider-trainer', 'traxxas-trx4m-high-trail', 'traxxas-e-revo-116', 'arrma-typhon-grom', 'mini-drift-128', 'mini-drift-124', 'drift-116-4wd'],
    intermediate: ['traxxas-slash-vxl', 'traxxas-maxx-v2', 'traxxas-4-tec-drift', 'hpi-rs4', 'drift-114-rwd', 'panther-touring-rtr', 'foam-sport-trainer', 'losi-promoto-mx'],
    pro: ['losi-5ive-t-3', 'fg-15-buggy', 'rofun-baja-5t', 'fg-baja-beetle', 'fg-16-monster-2wd', 'petrol-chassis-15', 'losi-obr-15', 'traxxas-x-maxx-8s', 'arrma-kraton-6s-v6', 'arrma-mojave-6s', 'arrma-mojave-exb', 'arrma-big-rock-6s', 'arrma-talion-exb-6s', 'traxxas-e-revo-6s', 'arrma-kraton-exb-roller', 'traxxas-desert-truck-fox', 'hpi-wr8', 'mst-110-drift', 'traxxas-m41-6s', 'proboat-blackjack-42']
  };

  /* ---------- Safety net: never show the same photo twice in one product ---------- */
  window.VOLT_PRODUCTS.forEach(function (p) { if (Array.isArray(p.photos)) p.photos = p.photos.filter(function (k, i, a) { return a.indexOf(k) === i; }); });

  /* ---------- Featured product (+ which real photo to show large) ---------- */
  window.VOLT_FEATURED = { productId: 'losi-5ive-t-3', photo: 'shop-010' };
})();
