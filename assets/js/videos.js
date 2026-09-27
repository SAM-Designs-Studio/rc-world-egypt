/* ==========================================================================
   RC World Egypt — videos (the owner's own clips)
   --------------------------------------------------------------------------
   Data only; main.js renders the "In action" section from this list.
   Add a video by appending an entry (poster = a JPG with the same name):
     id        unique slug (also the file name)
     src       MP4 path            poster   JPG path (landscape frame)
     duration  seconds (shown as m:ss)
     title     English model name (shown in both languages, isolated with <bdi>)
     desc      { ar, en } short descriptor
     product   product id opened by "View product" (quick view)
   Every video is shown in a 16:9 box with object-fit: cover — portrait files
   that carry a letterboxed landscape picture are cropped to that picture.
   ========================================================================== */
window.VOLT_VIDEOS = [
  {
    id: 'arrma-kraton-6s-speed-run',
    src: 'assets/video/arrma-kraton-6s-speed-run.mp4',
    poster: 'assets/video/arrma-kraton-6s-speed-run.jpg',
    duration: 54,
    title: 'Arrma Kraton 6S',
    desc: { ar: 'تجربة سرعة على الطريق بمقاس 1/8', en: '1/8 · speed run' },
    product: 'arrma-kraton-6s-v6'
  },
  {
    id: 'losi-obr-road-run',
    src: 'assets/video/losi-obr-road-run.mp4',
    poster: 'assets/video/losi-obr-road-run.jpg',
    duration: 33,
    title: 'Losi 1/5 OBR',
    desc: { ar: 'تجربة على الطريق', en: 'Road run' },
    product: 'losi-obr-15'
  },
  {
    id: 'losi-obr-mini-cooper',
    src: 'assets/video/losi-obr-mini-cooper.mp4',
    poster: 'assets/video/losi-obr-mini-cooper.jpg',
    duration: 25,
    title: 'Losi 1/5 OBR Mini Cooper',
    desc: { ar: 'نسخة بهيكل كلاسيكي على الطريق', en: 'Classic-body version on the road' },
    product: 'losi-obr-15'
  },
  {
    id: 'mst-drift-mustang',
    src: 'assets/video/mst-drift-mustang.mp4',
    poster: 'assets/video/mst-drift-mustang.jpg',
    duration: 40,
    title: 'MST 1/10 Drift — Mustang',
    desc: { ar: 'سيارة درفت 1/10 بإضاءة كاملة', en: '1/10 drift car with full lights' },
    product: 'mst-110-drift'
  }
];
