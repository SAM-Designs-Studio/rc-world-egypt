/* ==========================================================================
   VOLT RC — Product catalogue
   --------------------------------------------------------------------------
   Plain global data (no modules) so the site works from file://.
   All brands and product names are fictional.

   NAMING RULE: brand and model names are ALWAYS English (Latin letters),
   in both languages. Only the descriptor is translated. main.js renders
   every English name inside Arabic text in <bdi dir="ltr">…</bdi>
   (or ⁨…⁩ isolates in plain-text contexts such as aria-labels / alt).

   Product shape:
     id
     model     : English model name — identical in AR and EN (e.g. "Dune Viper X")
     name_ar   : Arabic descriptor  (e.g. "باجي صحراء كهربائي 1/8")
     name_en   : English descriptor (e.g. "1/8 Desert Buggy")
     desc_ar, desc_en
     category  : cars | drones | planes | boats | batteries | parts
     brand     : fictional brand name (English in both languages)
     price     : SAR, integer
     oldPrice  : SAR (optional) -> item is "on sale"
     rating    : 0–5, reviews: number of reviews
     stock     : units available (0 = sold out)
     level     : beginner | intermediate | pro
     featured  : sort weight for "Featured"
     badges    : any of "new", "best" ("sale" is derived from oldPrice)
     specs     : ordered object. Numbers get units from i18n (see main.js):
                 speed (km/h), runtime/flight (min), range (m),
                 wingspan/length (mm), weight (g). Strings are shown as-is,
                 {ar, en} objects are localised.
     tags      : extra search keywords (generic terms, both languages)
     image     : Unsplash CDN URL (every URL verified to return HTTP 200)
   ========================================================================== */

(function () {
  'use strict';

  var IMG = function (id, w) {
    return 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=' + (w || 800) + '&q=80';
  };

  /* ---------- Categories (order = display order) ---------- */
  window.VOLT_CATEGORIES = [
    { id: 'cars',      image: IMG('1675301586777-2c56ee8aa5ef') },
    { id: 'drones',    image: IMG('1508444845599-5c89863b1c44') },
    { id: 'planes',    image: IMG('1606370744289-16795bbded58') },
    { id: 'boats',     image: IMG('1550009375-99bb7e3bf4d2') },
    { id: 'batteries', image: IMG('1676337167616-78853693ba3a') },
    { id: 'parts',     image: IMG('1517420704952-d9f39e95b43e') }
  ];

  /* ---------- Products ---------- */
  window.VOLT_PRODUCTS = [
    /* ===== Cars ===== */
    {
      id: 'dune-viper-x',
      model: 'Dune Viper X',
      name_ar: 'باجي صحراء كهربائي 1/8',
      name_en: '1/8 Desert Buggy',
      desc_ar: 'وحش Brushless بقوة 4S في هيكل باجي: 110 كم/س، مساعدات ألمنيوم وهيكل مضبوط لقفزات الصحراء. نجم عرض هذا الأسبوع.',
      desc_en: 'A 4S brushless monster in a buggy chassis: 110 km/h, aluminium shocks and a chassis tuned for desert jumps. This week’s headline deal.',
      category: 'cars', brand: 'Torque Lab',
      price: 1199, oldPrice: 1649, rating: 4.8, reviews: 174, stock: 7,
      level: 'pro', featured: 100, badges: ['best'],
      specs: { scale: '1/8', speed: 110, drive: '4WD', motor: 'Brushless 2200KV', battery: '4S LiPo 6500mAh', runtime: 20, range: 300 },
      tags: ['buggy', 'basher', 'desert', 'باجي', 'صحراء', 'تطعيس'],
      image: IMG('1741271254950-8690e9a40965'),
      imageLarge: IMG('1741271254950-8690e9a40965', 1200)
    },
    {
      id: 'sandstorm-mt10',
      model: 'Sandstorm MT-10',
      name_ar: 'شاحنة مونستر كهربائية 1/10',
      name_en: '1/10 Monster Truck',
      desc_ar: 'مساعدات ضخمة، نظام Brushless مقاوم للماء، وإطارات تلتهم الكثبان الرملية. صُممت لتقفز وتهبط وتعيدها مرة بعد مرة.',
      desc_en: 'Oversized shocks, a waterproof brushless system and tyres that eat sand dunes for breakfast. Built to bash, land and do it all again.',
      category: 'cars', brand: 'Torque Lab',
      price: 1499, oldPrice: 1799, rating: 4.8, reviews: 212, stock: 9,
      level: 'intermediate', featured: 95, badges: ['best'],
      specs: { scale: '1/10', speed: 80, drive: '4WD', motor: 'Brushless 3300KV', battery: '3S LiPo 5000mAh', runtime: 25, range: 200 },
      tags: ['monster', 'truck', 'basher', 'مونستر', 'شاحنة'],
      image: IMG('1643236873141-6511884b19e2')
    },
    {
      id: 'kaze-dr1',
      model: 'Kaze DR-1',
      name_ar: 'سيارة درفت كهربائية 1/10',
      name_en: '1/10 Drift Car',
      desc_ar: 'دفع خلفي، جايرو توجيه ذكي، وإطارات صلبة لانزلاقات طويلة وأنيقة على الأسطح الملساء. أناقة الدرفت بين يديك.',
      desc_en: 'Rear-wheel drive, an active steering gyro and hard-compound tyres for long, smoky slides on smooth concrete. Pure style on four wheels.',
      category: 'cars', brand: 'Kaze Racing',
      price: 1290, rating: 4.9, reviews: 138, stock: 14,
      level: 'intermediate', featured: 90, badges: ['new'],
      specs: { scale: '1/10', speed: 60, drive: { ar: 'دفع خلفي + جايرو', en: 'RWD + gyro' }, motor: 'Brushless 10.5T', battery: '2S LiPo 4000mAh', runtime: 30 },
      tags: ['drift', 'on-road', 'درفت', 'تفحيط', 'اسفلت'],
      image: IMG('1758964087156-0eac97044f84')
    },
    {
      id: 'kaze-gtr',
      model: 'Kaze GT-R Speed Run',
      name_ar: 'سيارة سرعة للأسفلت 1/7',
      name_en: '1/7 Speed-Run Car',
      desc_ar: 'هيكل مصمم انسيابيًا، قوة 6S، وسرعة قصوى تتجاوز 130 كم/س. أسرع سيارة لدينا — تحتاج مدرجًا طويلًا وفارغًا.',
      desc_en: 'Aero-tuned body, 6S power and a top speed north of 130 km/h. Our fastest car — bring a long, empty runway.',
      category: 'cars', brand: 'Kaze Racing',
      price: 2390, rating: 4.9, reviews: 57, stock: 4,
      level: 'pro', featured: 88, badges: ['new'],
      specs: { scale: '1/7', speed: 130, drive: 'AWD', motor: 'Brushless 1900KV', battery: '6S LiPo 5000mAh', runtime: 15, range: 300 },
      tags: ['speed', 'on-road', 'fast', 'سرعة', 'اسفلت'],
      image: IMG('1727622738048-29e6f37b2a8c')
    },
    {
      id: 'atlas-cr4',
      model: 'Atlas CR-4',
      name_ar: 'زاحف صخور 1/10',
      name_en: '1/10 Rock Crawler',
      desc_ar: 'محاور بورتال، دفرنسات مقفلة، وإطارات لاصقة تتسلق صخورًا لن تجرؤ على صعودها مشيًا. بطيء، دقيق، وممتع بلا نهاية.',
      desc_en: 'Portal axles, locked diffs and sticky tyres that climb rocks you wouldn’t walk up. Slow, precise and endlessly satisfying.',
      category: 'cars', brand: 'Ridgeline',
      price: 1150, rating: 4.7, reviews: 96, stock: 6,
      level: 'beginner', featured: 70, badges: [],
      specs: { scale: '1/10', speed: 15, drive: '4WD', motor: 'Brushed 35T', battery: '2S LiPo 3000mAh', runtime: 45 },
      tags: ['crawler', 'rock', 'trail', 'زاحف', 'صخور'],
      image: IMG('1579271723124-a758848c2753')
    },
    {
      id: 'trail-ranger-tr10',
      model: 'Trail Ranger TR-10',
      name_ar: 'شاحنة طرق وعرة 1/10',
      name_en: '1/10 Scale Trail Truck',
      desc_ar: 'شاحنة طرق وعرة بهيكل صلب بمقياس واقعي، أضواء LED تعمل وناقل حركة بسرعتين. صُممت لرحلات نهاية الأسبوع في الأودية.',
      desc_en: 'A hard-body scale trail truck with working LED lights and a two-speed gearbox. Built for long weekend adventures in the wadi.',
      category: 'cars', brand: 'Ridgeline',
      price: 1349, rating: 4.7, reviews: 64, stock: 0,
      level: 'intermediate', featured: 65, badges: ['new'],
      specs: { scale: '1/10', speed: 20, drive: '4WD', motor: 'Brushed 45T', battery: '3S LiPo 3000mAh', runtime: 40 },
      tags: ['scale', 'trail', 'jeep', 'crawler', 'وعرة', 'جيب'],
      image: IMG('1629840963351-f5e2e6578f38')
    },
    {
      id: 'trophy-sct',
      model: 'Trophy SCT',
      name_ar: 'شاحنة سباق للمسارات القصيرة 1/10',
      name_en: '1/10 Short Course Truck',
      desc_ar: 'شكل شاحنات السباق مع صدّامات تتحمل الاصطدامات. الخيار المثالي لأول سيارة احترافية — وكل قطعة فيها قابلة للترقية لاحقًا.',
      desc_en: 'Race-truck looks with bumpers that shrug off crashes. The ideal first hobby-grade truck — and every part can be upgraded later.',
      category: 'cars', brand: 'Torque Lab',
      price: 899, rating: 4.6, reviews: 81, stock: 18,
      level: 'beginner', featured: 60, badges: [],
      specs: { scale: '1/10', speed: 45, drive: '4WD', motor: 'Brushed 550', battery: '2S LiPo 3000mAh', runtime: 20, range: 150 },
      tags: ['short course', 'sct', 'truck', 'شاحنة', 'مبتدئ'],
      image: IMG('1675301590589-c56007c935d4')
    },
    {
      id: 'scout-jr',
      model: 'Scout Jr. 4x4',
      name_ar: 'شاحنة للمبتدئين 1/16',
      name_en: '1/16 Starter Truck',
      desc_ar: 'صغيرة، قوية، وممتعة بشكل لا يُصدّق. بطاريتان داخل العلبة تعني ضعف وقت اللعب للسائقين الصغار من عمر 8 سنوات.',
      desc_en: 'Small, tough and ridiculously fun. Two batteries in the box mean double the run time for young drivers aged 8+.',
      category: 'cars', brand: 'Ridgeline',
      price: 449, oldPrice: 529, rating: 4.5, reviews: 302, stock: 32,
      level: 'beginner', featured: 85, badges: ['best'],
      specs: { scale: '1/16', speed: 30, drive: '4WD', battery: '2 × 7.4V Li-ion 1500mAh', runtime: 25, range: 80 },
      tags: ['kids', 'gift', 'starter', 'أطفال', 'هدية', 'مبتدئ'],
      image: IMG('1630029546304-981fdadbb842')
    },

    /* ===== Drones ===== */
    {
      id: 'skylens-4k',
      model: 'SkyLens 4K',
      name_ar: 'درون تصوير قابل للطي',
      name_en: 'Foldable Camera Drone',
      desc_ar: 'ينطوي ليصبح أصغر من قارورة ماء، يطير 34 دقيقة ويصوّر 4K بسلاسة على جيمبال ثلاثي المحاور. لقطات رحلاتك بمستوى آخر.',
      desc_en: 'Folds smaller than a water bottle, flies for 34 minutes and films silky 4K on a 3-axis gimbal. Your travel shots, upgraded.',
      category: 'drones', brand: 'SkyForge',
      price: 2799, oldPrice: 3199, rating: 4.9, reviews: 241, stock: 8,
      level: 'intermediate', featured: 98, badges: ['best'],
      specs: { camera: { ar: '4K 60fps · جيمبال 3 محاور', en: '4K 60fps · 3-axis gimbal' }, speed: 65, flight: 34, range: 8000, battery: 'Smart 3S 3850mAh', weight: 590 },
      tags: ['camera', 'gimbal', 'travel', 'تصوير', 'كاميرا', 'سفر'],
      image: IMG('1507582020474-9a35b7d455d9')
    },
    {
      id: 'hornet-x5',
      model: 'Hornet X5',
      name_ar: 'درون سباق FPV',
      name_en: 'FPV Racing Drone',
      desc_ar: 'درون سباق كربوني 5 إنش مع بث FPV رقمي عالي الدقة، مصمم ليخترق الفجوات بسرعة 140 كم/س. متوافق مع أي نظارات FPV.',
      desc_en: 'A 5-inch carbon racer with digital HD FPV, built to rip through gaps at 140 km/h. Pairs with any FPV goggles.',
      category: 'drones', brand: 'SkyForge',
      price: 1890, rating: 4.8, reviews: 89, stock: 11,
      level: 'pro', featured: 87, badges: ['new'],
      specs: { camera: { ar: 'FPV رقمي + 4K', en: 'Digital FPV + 4K' }, speed: 140, flight: 6, range: 2000, motor: '2207 1950KV', battery: '6S LiPo 1100mAh' },
      tags: ['fpv', 'racing', 'freestyle', 'سباق', 'فري ستايل'],
      image: IMG('1577533870320-2c31e7e41028')
    },
    {
      id: 'falcon-pro-6k',
      model: 'Falcon Pro 6K',
      name_ar: 'درون تصوير سينمائي',
      name_en: 'Cinema Drone',
      desc_ar: 'مستشعر 1 إنش، فيديو 6K HDR واستشعار عوائق من كل الاتجاهات. الدرون المناسب لصنّاع المحتوى المحترفين.',
      desc_en: 'A 1-inch sensor, 6K HDR video and omnidirectional obstacle sensing. The drone for creators who get paid for their footage.',
      category: 'drones', brand: 'SkyForge',
      price: 5490, rating: 4.9, reviews: 47, stock: 3,
      level: 'pro', featured: 84, badges: ['new'],
      specs: { camera: { ar: '6K HDR · مستشعر 1 إنش', en: '6K HDR · 1-inch sensor' }, speed: 75, flight: 42, range: 15000, battery: 'Smart 4S 5000mAh', weight: 920 },
      tags: ['cinema', 'camera', '6k', 'سينمائي', 'تصوير', 'محترف'],
      image: IMG('1527977966376-1c8408f9f108')
    },
    {
      id: 'pixie-mini',
      model: 'Pixie Mini',
      name_ar: 'درون داخلي للمبتدئين',
      name_en: 'Indoor Starter Drone',
      desc_ar: 'واقيات للمراوح، تثبيت ارتفاع وإقلاع بزر واحد — أسهل طريقة لتتعلم الطيران من داخل صالة البيت.',
      desc_en: 'Prop guards, altitude hold and one-key take-off make this the easiest way to learn to fly — right in your living room.',
      category: 'drones', brand: 'SkyForge',
      price: 249, rating: 4.4, reviews: 418, stock: 45,
      level: 'beginner', featured: 80, badges: ['best'],
      specs: { camera: '720p', speed: 20, flight: 10, range: 80, battery: '3 × 1S 450mAh', weight: 85 },
      tags: ['mini', 'indoor', 'kids', 'gift', 'صغير', 'أطفال', 'هدية'],
      image: IMG('1514043454212-14c181f46583')
    },

    /* ===== Planes & helis ===== */
    {
      id: 'aero-trainer-1200',
      model: 'Aero Trainer 1200',
      name_ar: 'طائرة تدريب للمبتدئين',
      name_en: 'Beginner Trainer Plane',
      desc_ar: 'جناح علوي ثابت، جايرو سداسي المحاور مع زر إنقاذ فوري، وفوم EPO متين. تعلّم الطيران لم يكن آمنًا بهذا الشكل من قبل.',
      desc_en: 'High-wing stability, a 6-axis gyro with a panic-recovery button and tough EPO foam. Learning to fly has never felt this safe.',
      category: 'planes', brand: 'Northwind Aero',
      price: 899, rating: 4.7, reviews: 133, stock: 12,
      level: 'beginner', featured: 78, badges: ['best'],
      specs: { wingspan: 1200, speed: 55, flight: 15, range: 500, motor: 'Brushless 2830 1000KV', battery: '3S LiPo 2200mAh' },
      tags: ['trainer', 'plane', 'foam', 'تدريب', 'طائرة'],
      image: IMG('1606370744289-16795bbded58')
    },
    {
      id: 'stryker-warbird',
      model: 'Stryker Warbird',
      name_ar: 'طائرة مقاتلة بطلاء مموّه',
      name_en: 'Camo Warbird Plane',
      desc_ar: 'طلاء مموّه واقعي، عجلات هبوط قابلة للطي، وقوة كافية للحلقات واللفات والتمريرات المنخفضة السريعة.',
      desc_en: 'Scale camo finish, retractable landing gear and the power for loops, rolls and low, fast passes.',
      category: 'planes', brand: 'Northwind Aero',
      price: 1790, oldPrice: 1990, rating: 4.6, reviews: 52, stock: 5,
      level: 'pro', featured: 68, badges: [],
      specs: { wingspan: 1100, speed: 120, flight: 8, range: 800, motor: 'Brushless 3536 1000KV', battery: '4S LiPo 2200mAh' },
      tags: ['warbird', 'aerobatic', 'مقاتلة', 'استعراض'],
      image: IMG('1717645730191-b0e2d1962a2b')
    },
    {
      id: 'hover-450',
      model: 'Hover 450',
      name_ar: 'هليكوبتر للحركات الاستعراضية',
      name_en: '3D Aerobatic Helicopter',
      desc_ar: 'رأس بدون فلاي بار، تروس معدنية ومثبّت بأوضاع من المبتدئ إلى الحركات الاستعراضية. ثبّتها اليوم واقلبها غدًا.',
      desc_en: 'Flybarless head, metal gears and a stabiliser with beginner-to-3D modes. Hover it today, flip it tomorrow.',
      category: 'planes', brand: 'Northwind Aero',
      price: 1390, rating: 4.5, reviews: 38, stock: 6,
      level: 'pro', featured: 55, badges: [],
      specs: { channels: '6CH', speed: 90, flight: 7, motor: 'Brushless 3500KV', battery: '3S LiPo 2200mAh' },
      tags: ['helicopter', 'heli', '3d', 'هليكوبتر', 'مروحية'],
      image: IMG('1699084582699-dfa7a31ad041')
    },

    /* ===== Boats ===== */
    {
      id: 'riptide-700',
      model: 'Riptide 700',
      name_ar: 'قارب سرعة بمحرك Brushless',
      name_en: 'Brushless Speedboat',
      desc_ar: 'بدن V عميق، محرك Brushless بتبريد مائي، واستعادة ذاتية عند الانقلاب. يصل إلى 70 كم/س على الماء المفتوح.',
      desc_en: 'A deep-V hull, water-cooled brushless motor and self-righting capsize recovery. Hits 70 km/h on open water.',
      category: 'boats', brand: 'AquaDash',
      price: 1190, oldPrice: 1390, rating: 4.7, reviews: 76, stock: 10,
      level: 'intermediate', featured: 76, badges: ['best'],
      specs: { length: 700, speed: 70, runtime: 12, range: 150, motor: { ar: 'Brushless بتبريد مائي', en: 'Brushless, water-cooled' }, battery: '3S LiPo 4000mAh' },
      tags: ['boat', 'speedboat', 'water', 'قارب', 'بحر'],
      image: IMG('1508109261185-dd0146900a71')
    },
    {
      id: 'coral-cruiser',
      model: 'Coral Cruiser',
      name_ar: 'قارب عائلي للبحيرات',
      name_en: 'Family Lake Boat',
      desc_ar: 'بدن ثابت ومتسامح مع محركين وأضواء LED ليلية — قارب العائلة المثالي للبحيرات والمنتجعات.',
      desc_en: 'A stable, forgiving hull with twin motors and LED night lights — the perfect family boat for lakes and resorts.',
      category: 'boats', brand: 'AquaDash',
      price: 399, rating: 4.5, reviews: 58, stock: 22,
      level: 'beginner', featured: 58, badges: ['new'],
      specs: { length: 450, speed: 30, runtime: 15, range: 100, battery: '7.4V Li-ion 1500mAh' },
      tags: ['boat', 'family', 'lake', 'قارب', 'عائلة'],
      image: IMG('1562003985-145bc8353647')
    },
    {
      id: 'splash-mini',
      model: 'Splash Mini',
      name_ar: 'قارب صغير للمسابح',
      name_en: 'Pool Racer Boat',
      desc_ar: 'متعة بحجم المسبح مع تنبيه عند انخفاض البطارية وبدن لا يغرق. صيف السعودية صار أحلى.',
      desc_en: 'Pool-sized fun with a low-battery alert and a hull that won’t sink. Saudi summer, sorted.',
      category: 'boats', brand: 'AquaDash',
      price: 219, rating: 4.3, reviews: 190, stock: 40,
      level: 'beginner', featured: 50, badges: [],
      specs: { length: 330, speed: 25, runtime: 10, range: 60, battery: '3.7V Li-ion 600mAh' },
      tags: ['pool', 'kids', 'mini', 'مسبح', 'أطفال'],
      image: IMG('1532256483510-5c2ce93c39a1')
    },

    /* ===== Batteries & chargers ===== */
    {
      id: 'voltcell-4s-6500',
      model: 'VoltCell 4S 6500mAh',
      name_ar: 'بطارية LiPo بتفريغ 120C',
      name_en: '120C LiPo Battery',
      desc_ar: 'طاقة عالية التفريغ في غلاف صلب لسيارات 1/8 وتحديات السرعة. خلايا معززة بالجرافين تبقى باردة تحت الضغط الكامل.',
      desc_en: 'Hard-case, high-discharge power for 1/8 bashers and speed runs. Graphene-enhanced cells stay cool at full throttle.',
      category: 'batteries', brand: 'VoltCell',
      price: 459, rating: 4.8, reviews: 264, stock: 26,
      level: 'pro', featured: 72, badges: ['best'],
      specs: { voltage: '14.8V', capacity: '6500mAh', discharge: '120C', connector: 'XT90', weight: 680 },
      tags: ['lipo', 'battery', '4s', 'بطارية', 'ليبو'],
      image: IMG('1662793962594-8842ff287640')
    },
    {
      id: 'voltcell-2s-5200',
      model: 'VoltCell 2S 5200mAh',
      name_ar: 'بطارية LiPo بغلاف صلب',
      name_en: 'Hardcase LiPo Battery',
      desc_ar: 'البطارية اليومية المناسبة لمعظم سيارات وشاحنات 1/10. ضاعف وقت اللعب ببطارية احتياطية في حقيبتك.',
      desc_en: 'The everyday pack that fits most 1/10 cars and trucks. Double your run time with a spare in your bag.',
      category: 'batteries', brand: 'VoltCell',
      price: 219, oldPrice: 259, rating: 4.7, reviews: 388, stock: 50,
      level: 'beginner', featured: 62, badges: [],
      specs: { voltage: '7.4V', capacity: '5200mAh', discharge: '60C', connector: 'XT60', weight: 290 },
      tags: ['lipo', 'battery', '2s', 'بطارية', 'ليبو'],
      image: IMG('1676337167629-d896b3ed5724')
    },
    {
      id: 'pulse-duo-200',
      model: 'Pulse Duo 200W',
      name_ar: 'شاحن ذكي بمنفذين',
      name_en: 'Dual-Port Smart Charger',
      desc_ar: 'منفذان مستقلان، مدخل AC/DC وشاشة ملونة واضحة. اشحن ووازن وخزّن بطاريتين في نفس الوقت.',
      desc_en: 'Two independent ports, AC/DC input and a crisp colour screen. Charge, balance and storage-charge two packs at once.',
      category: 'batteries', brand: 'VoltCell',
      price: 549, rating: 4.9, reviews: 171, stock: 15,
      level: 'beginner', featured: 74, badges: ['new'],
      specs: { output: '2 × 100W', cells: '1–6S LiPo · LiHV · NiMH', input: 'AC 100–240V / DC 12V' },
      tags: ['charger', 'balance', 'شاحن', 'شحن'],
      image: IMG('1676337167498-ceac1d6dafba')
    },

    /* ===== Parts & electronics ===== */
    {
      id: 'apex-120a-combo',
      model: 'Apex 120A + 2200KV',
      name_ar: 'طقم محرك ومنظم سرعة Brushless',
      name_en: 'Brushless ESC + Motor Combo',
      desc_ar: 'ترقية Brushless جاهزة للتركيب في سيارات 1/8 مع إعدادات قابلة للبرمجة للاندفاع والفرامل وحماية حرارية.',
      desc_en: 'Drop-in brushless power for 1/8 builds with programmable punch, braking and thermal protection.',
      category: 'parts', brand: 'Apex Works',
      price: 699, rating: 4.6, reviews: 66, stock: 13,
      level: 'pro', featured: 57, badges: [],
      specs: { esc: '120A', motor: '4274 2200KV', battery: '3–6S LiPo', compat: { ar: 'سيارات وشاحنات 1/8', en: '1/8 cars & trucks' } },
      tags: ['esc', 'motor', 'brushless', 'upgrade', 'محرك', 'ترقية'],
      image: IMG('1518770660439-4636190af475')
    },
    {
      id: 'apex-rx8',
      model: 'Apex RX8',
      name_ar: 'مستقبل 8 قنوات مع جايرو تثبيت',
      name_en: '8-Channel Gyro Receiver',
      desc_ar: '8 قنوات، جايرو تثبيت مدمج وقراءات مباشرة للجهد والإشارة. لوحة صغيرة وتحكم كبير.',
      desc_en: '8 channels, a built-in stabilising gyro and live telemetry for voltage and signal. Small board, big control.',
      category: 'parts', brand: 'Apex Works',
      price: 239, rating: 4.5, reviews: 49, stock: 19,
      level: 'intermediate', featured: 54, badges: ['new'],
      specs: { channels: '8CH', freq: '2.4GHz', range: 1200, compat: { ar: 'سيارات، قوارب وطائرات', en: 'Cars, boats & planes' } },
      tags: ['receiver', 'gyro', 'radio', 'مستقبل', 'جايرو'],
      image: IMG('1562408590-e32931084e23')
    },
    {
      id: 'gripx-tires',
      model: 'Grip X',
      name_ar: 'طقم إطارات لكل التضاريس (4 قطع)',
      name_en: 'All-Terrain Tyre Set (×4)',
      desc_ar: 'إطارات ملصوقة مسبقًا بمطاط ناعم ونتوءات عدوانية تعض الرمل والتراب والحصى.',
      desc_en: 'Pre-glued soft-compound tyres with aggressive pins that bite into sand, dirt and gravel.',
      category: 'parts', brand: 'Apex Works',
      price: 189, oldPrice: 229, rating: 4.6, reviews: 143, stock: 21,
      level: 'beginner', featured: 52, badges: [],
      specs: { compat: { ar: 'شاحنات SCT وتراغي 1/10', en: '1/10 SCT & truggy' }, hex: '12mm', compound: { ar: 'ناعم — للرمل والتراب', en: 'Soft — sand & dirt' } },
      tags: ['tires', 'tyres', 'wheels', 'إطارات', 'كفرات', 'جنوط'],
      image: IMG('1741003788656-8bc2525272e0')
    }
  ];

  /* ---------- Deal of the week ---------- */
  window.VOLT_DEAL = {
    productId: 'dune-viper-x',
    stockTotal: 22,          // units allocated to the deal (for the "claimed" meter)
    daysAhead: 5             // countdown target, relative to page load
  };
})();
