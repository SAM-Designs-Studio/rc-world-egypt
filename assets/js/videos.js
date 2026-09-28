/* ==========================================================================
   RC World Egypt — videos (the owner's own clips)
   --------------------------------------------------------------------------
   Data only; main.js renders the "In action" section, its filter chips and
   the product-video slides from this list. Order = display order (best first).
   Add a video by appending an entry (poster = a JPG with the same name):
     id           unique slug (also the file name)
     src / poster MP4 path / JPG path
     duration     seconds (shown as m:ss)
     orientation  'landscape' (16:9 cover) | 'portrait' | 'square'
                  (portrait / square: taller cards in the grid, never cropped in the player)
     category     'baja' | 'offroad' | 'drift' | 'boats' | 'shop'  (filter chips)
     title        'English model name' (brand/model → shown in <bdi>)
                  or { ar, en } for generic titles (trusted markup; English names
                  inside Arabic wrapped in <bdi>)
     desc         { ar, en } short descriptor (plain text)
     product      product id for "View product" + the product-card video badge
                  and the first quick-view slide; '' when no confirmed product
   ========================================================================== */
window.VOLT_VIDEOS = [
  {
    id: 'maintenance-promo',
    src: 'assets/video/maintenance-promo.mp4',
    poster: 'assets/video/maintenance-promo.jpg',
    duration: 41, orientation: 'landscape', category: 'shop',
    title: { ar: 'ورشة <bdi dir="ltr">RC World Egypt</bdi>', en: 'RC World Egypt workshop' },
    desc: { ar: 'صيانة شاملة لسيارة 1/5 بمحرك بنزين', en: 'Full service of a 1/5 petrol car' },
    product: 'losi-5ive-t-3'
  },
  {
    id: 'monster-truck-night-hero-shot-vertical',
    src: 'assets/video/monster-truck-night-hero-shot-vertical.mp4',
    poster: 'assets/video/monster-truck-night-hero-shot-vertical.jpg',
    duration: 49, orientation: 'portrait', category: 'offroad',
    title: { ar: 'مونستر تراك', en: 'Monster Truck' },
    desc: { ar: 'لقطة ليلية', en: 'Night hero shot' },
    product: ''
  },
  {
    id: 'proboat-style-boat-and-truck-water-splash',
    src: 'assets/video/proboat-style-boat-and-truck-water-splash.mp4',
    poster: 'assets/video/proboat-style-boat-and-truck-water-splash.jpg',
    duration: 59, orientation: 'square', category: 'boats',
    title: { ar: 'قارب ومونستر تراك', en: 'RC Boat &amp; Monster Truck' },
    desc: { ar: 'حركة وإثارة فوق الماء', en: 'Water action' },
    product: 'proboat-blackjack-42'
  },
  {
    id: 'shop-hpi-savage-x-unboxing',
    src: 'assets/video/shop-hpi-savage-x-unboxing.mp4',
    poster: 'assets/video/shop-hpi-savage-x-unboxing.jpg',
    duration: 45, orientation: 'landscape', category: 'shop',
    title: 'HPI Savage X',
    desc: { ar: 'فتح العلبة في المتجر', en: 'Unboxing at the shop' },
    product: ''
  },
  {
    id: 'arrma-kraton-6s-speed-run',
    src: 'assets/video/arrma-kraton-6s-speed-run.mp4',
    poster: 'assets/video/arrma-kraton-6s-speed-run.jpg',
    duration: 54, orientation: 'landscape', category: 'offroad',
    title: 'Arrma Kraton 6S',
    desc: { ar: 'اختبار سرعة لسيارة 1/8 على الأسفلت', en: '1/8 · speed run' },
    product: 'arrma-kraton-6s-v6'
  },
  {
    id: 'baja-buggy-villa-lawn-run',
    src: 'assets/video/baja-buggy-villa-lawn-run.mp4',
    poster: 'assets/video/baja-buggy-villa-lawn-run.jpg',
    duration: 41, orientation: 'landscape', category: 'baja',
    title: { ar: 'باجي 1/5', en: '1/5 Baja Buggy' },
    desc: { ar: 'جولة في حديقة فيلا', en: 'Villa lawn run' },
    product: ''
  },
  {
    id: 'mst-drift-mustang',
    src: 'assets/video/mst-drift-mustang.mp4',
    poster: 'assets/video/mst-drift-mustang.jpg',
    duration: 40, orientation: 'landscape', category: 'drift',
    title: 'MST 1/10 Drift — Mustang',
    desc: { ar: 'سيارة درفت 1/10 بإضاءة كاملة', en: '1/10 drift car with full lights' },
    product: 'mst-110-drift'
  },
  {
    id: 'arrma-kraton-daytime-street-run',
    src: 'assets/video/arrma-kraton-daytime-street-run.mp4',
    poster: 'assets/video/arrma-kraton-daytime-street-run.jpg',
    duration: 26, orientation: 'landscape', category: 'offroad',
    title: 'Arrma Kraton',
    desc: { ar: 'تجربة نهارية في الشارع', en: 'Daytime street run' },
    product: 'arrma-kraton-6s-v6'
  },
  {
    id: 'drift-car-green-underglow-night-run',
    src: 'assets/video/drift-car-green-underglow-night-run.mp4',
    poster: 'assets/video/drift-car-green-underglow-night-run.jpg',
    duration: 55, orientation: 'landscape', category: 'drift',
    title: { ar: 'سيارة درفت 1/10', en: '1/10 Drift Car' },
    desc: { ar: 'جولة ليلية بإضاءة خضراء أسفل الهيكل', en: 'Green underglow night run' },
    product: '' // the manifest hinted the 1/14 drift car, but the clip is a 1/10 car → no link
  },
  {
    id: 'losi-obr-road-run',
    src: 'assets/video/losi-obr-road-run.mp4',
    poster: 'assets/video/losi-obr-road-run.jpg',
    duration: 33, orientation: 'landscape', category: 'baja',
    title: 'Losi 1/5 OBR',
    desc: { ar: 'تجربة على الأسفلت', en: 'Road run' },
    product: 'losi-obr-15'
  },
  {
    id: 'monster-truck-airborne-jump-vertical',
    src: 'assets/video/monster-truck-airborne-jump-vertical.mp4',
    poster: 'assets/video/monster-truck-airborne-jump-vertical.jpg',
    duration: 11, orientation: 'portrait', category: 'offroad',
    title: { ar: 'مونستر تراك', en: 'Monster Truck' },
    desc: { ar: 'قفزة في الهواء', en: 'Airborne jump' },
    product: ''
  },
  {
    id: 'shop-arrma-losi-promoto-mx-display',
    src: 'assets/video/shop-arrma-losi-promoto-mx-display.mp4',
    poster: 'assets/video/shop-arrma-losi-promoto-mx-display.jpg',
    duration: 41, orientation: 'landscape', category: 'shop',
    title: 'Arrma & Losi ProMoto-MX',
    desc: { ar: 'المعروضات في المتجر', en: 'Shop display' },
    product: 'losi-promoto-mx'
  },
  {
    id: 'baja-buggy-night-donuts',
    src: 'assets/video/baja-buggy-night-donuts.mp4',
    poster: 'assets/video/baja-buggy-night-donuts.jpg',
    duration: 11, orientation: 'portrait', category: 'baja',
    title: { ar: 'باجي 1/5', en: '1/5 Baja Buggy' },
    desc: { ar: 'حركات دونات ليلية', en: 'Night donuts' },
    product: ''
  },
  {
    id: 'losi-obr-mini-cooper',
    src: 'assets/video/losi-obr-mini-cooper.mp4',
    poster: 'assets/video/losi-obr-mini-cooper.jpg',
    duration: 25, orientation: 'landscape', category: 'baja',
    title: 'Losi 1/5 OBR Mini Cooper',
    desc: { ar: 'بهيكل كلاسيكي على الأسفلت', en: 'Classic-body version on the road' },
    product: 'losi-obr-15'
  },
  {
    id: 'monster-truck-led-night-bash-closeup',
    src: 'assets/video/monster-truck-led-night-bash-closeup.mp4',
    poster: 'assets/video/monster-truck-led-night-bash-closeup.jpg',
    duration: 56, orientation: 'landscape', category: 'offroad',
    title: { ar: 'سيارة شورت كورس من <bdi dir="ltr">HPI</bdi>', en: 'HPI Short-Course Truck' },
    desc: { ar: 'قيادة ليلية حرة بإضاءة ملوّنة', en: 'LED night bash' },
    product: '' // hinted the HPI RS4 (a touring car) — the clip shows a short-course truck → no link
  },
  {
    id: 'shop-mini-drift-track-demo',
    src: 'assets/video/shop-mini-drift-track-demo.mp4',
    poster: 'assets/video/shop-mini-drift-track-demo.jpg',
    duration: 45, orientation: 'landscape', category: 'shop',
    title: { ar: 'ميني درفت', en: 'Mini Drift' },
    desc: { ar: 'تجربة على حلبة الدرفت في المتجر', en: 'In-store track demo' },
    product: 'mini-drift-124'
  },
  {
    id: 'red-jeep-body-monster-truck-closeup',
    src: 'assets/video/red-jeep-body-monster-truck-closeup.mp4',
    poster: 'assets/video/red-jeep-body-monster-truck-closeup.jpg',
    duration: 53, orientation: 'landscape', category: 'offroad',
    title: { ar: 'مونستر تراك بهيكل <bdi dir="ltr">Jeep</bdi>', en: 'Jeep-Body Monster Truck' },
    desc: { ar: 'لقطات ليلية مقرّبة', en: 'Night close-up' },
    product: ''
  },
  {
    id: 'baja-buggy-lineup-hpi-rally-truck',
    src: 'assets/video/baja-buggy-lineup-hpi-rally-truck.mp4',
    poster: 'assets/video/baja-buggy-lineup-hpi-rally-truck.jpg',
    duration: 27, orientation: 'landscape', category: 'baja',
    title: { ar: 'سيارات باجي وسيارة رالي من <bdi dir="ltr">HPI</bdi>', en: 'Baja Buggies &amp; HPI Rally Truck' },
    desc: { ar: 'تجمّع ليلي للهواة', en: 'Night lineup at a meetup' },
    product: 'hpi-wr8'
  },
  {
    id: 'shortcourse-truck-street-run-chase',
    src: 'assets/video/shortcourse-truck-street-run-chase.mp4',
    poster: 'assets/video/shortcourse-truck-street-run-chase.jpg',
    duration: 25, orientation: 'landscape', category: 'offroad',
    title: { ar: 'سيارة شورت كورس', en: 'Short-Course Truck' },
    desc: { ar: 'تجربة في الشارع', en: 'Street run' },
    product: ''
  },
  {
    id: 'shop-rc-meetup-race-day-aerial',
    src: 'assets/video/shop-rc-meetup-race-day-aerial.mp4',
    poster: 'assets/video/shop-rc-meetup-race-day-aerial.jpg',
    duration: 50, orientation: 'landscape', category: 'shop',
    title: { ar: 'تجمّع هواة الريموت كنترول', en: 'RC Meetup' },
    desc: { ar: 'يوم سباق بتصوير جوي', en: 'Race day, aerial view' },
    product: ''
  },
  {
    id: 'offroad-night-session-two-trucks',
    src: 'assets/video/offroad-night-session-two-trucks.mp4',
    poster: 'assets/video/offroad-night-session-two-trucks.jpg',
    duration: 24, orientation: 'landscape', category: 'offroad',
    title: { ar: 'قيادة ليلية حرة', en: 'Night Bash Session' },
    desc: { ar: 'سيارتان بإضاءة ليلية', en: 'Two trucks' },
    product: ''
  }
];
