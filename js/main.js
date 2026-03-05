// ═══════════════════════════════════
// LOADING COUNTER
// ═══════════════════════════════════
(function () {
  var el    = document.getElementById('loadingScreen');
  var numEl = document.getElementById('loadNum');
  var barEl = document.getElementById('loadBar');
  var lblEl = document.getElementById('loadLabel');
  if (!numEl) return;
  var labels = ['Initializing...', 'Loading assets...', 'Almost there...', 'Welcome! ✨'];
  var count  = 0;
  var t = setInterval(function () {
    count++;
    numEl.textContent = count;
    numEl.dataset.num = count;
    if (barEl) barEl.style.width = count + '%';
    if (count === 30 && lblEl) lblEl.textContent = labels[1];
    if (count === 70 && lblEl) lblEl.textContent = labels[2];
    if (count === 99 && lblEl) lblEl.textContent = labels[3];
    if (count >= 100) {
      clearInterval(t);
      setTimeout(function () {
        if (el) el.classList.add('hidden');
        playWelcomeVoice();
        if (typeof initHeroAnim === 'function') initHeroAnim();
        try { ScrollTrigger.refresh(); } catch (e) {}
      }, 500);
    }
  }, 24);
})();

// ═══════════════════════════════════
// GSAP
// ═══════════════════════════════════
gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════
// I18N
// ═══════════════════════════════════
var i18n = {
  en: {
    'nav.home':'Home','nav.about':'About','nav.projects':'Projects','nav.certs':'Certificates',
    'nav.exp':'Experience','nav.contact':'Contact',
    'hero.badge':'Available for Freelance','hero.role':'Frontend Developer \u2022 UI/UX Designer',
    'hero.desc':'I specialize in building clean, modern, and user-focused web interfaces.',
    'hero.btn1':'View Projects','hero.btn2':'Download CV',
    'about.eyebrow':'Who I Am','about.title':'About Me','about.greeting':"Hey there! I'm Zahrah",
    'about.p1':'Information Systems student passionate about building responsive web interfaces. I live at the intersection of code and design — where logic meets aesthetics and every pixel has a purpose.',
    'about.p2':'Every project is a chance to do something memorable — with clean architecture, thoughtful interactions, and a sharp eye for detail that users feel even when they can\'t name it.',
    'about.m1':'Years Coding','about.m2':'Projects Done','about.m3':'Happy Clients','about.cv':'Download CV',
    'projects.eyebrow':'My Work','projects.title':'Selected Projects',
    'proj.detail':'View Details \u2197','proj.visit':'Visit Project','common.more':'See More',
    'certs.eyebrow':'Credentials','certs.title':'Certificates & Awards',
    'papers.eyebrow':'Research','papers.title':'Papers & Journals','papers.read':'Read Paper \u2192',
    'gallery.eyebrow':'Gallery','gallery.title':'Visual Gallery',
    'exp.eyebrow':'My Journey','exp.title':'Experience & Education',
    'exp.work':'Work Experience','exp.org':'Organization & Committee','exp.edu':'Education',
    'exp.w1':'Developing responsive web applications using React and modern frameworks.',
    'exp.w2':'Built custom websites for small businesses.',
    'exp.o1':'Led 12 designers in event branding. 500+ participants.',
    'exp.o2':'Developed organization website with event registration system.',
    'exp.e1':'Bachelor of Information Systems','exp.e1d':'GPA: 3.8/4.0. Focus on web development & UI/UX design.',
    'skills.eyebrow':'What I Use','skills.title':'Skills & Tools','skills.fe':'Frontend','skills.be':'Backend','skills.tools':'Design & Tools',
    'contact.eyebrow':"Let's Connect",'contact.title':'Get In Touch','contact.sub':"Let's work together!",
    'contact.p':'Open for freelance, collaborations, and new exciting opportunities.',
    'form.name':'Your Name','form.email':'Your Email','form.subject':'Subject','form.message':'Message','form.send':'Send Message'
  },
  id: {
    'nav.home':'Beranda','nav.about':'Tentang','nav.projects':'Proyek','nav.certs':'Sertifikat',
    'nav.exp':'Pengalaman','nav.contact':'Kontak',
    'hero.badge':'Tersedia untuk Freelance','hero.role':'Frontend Developer \u2022 UI/UX Designer',
    'hero.desc':'Saya spesialis dalam membangun antarmuka web yang bersih, modern, dan berfokus pada pengguna.',
    'hero.btn1':'Lihat Proyek','hero.btn2':'Unduh CV',
    'about.eyebrow':'Tentang Saya','about.title':'Tentang Saya','about.greeting':'Hai! Saya Zahrah',
    'about.p1':'Mahasiswa Sistem Informasi yang bersemangat membangun antarmuka web responsif.',
    'about.p2':'Setiap proyek adalah kesempatan menciptakan sesuatu yang berkesan — arsitektur bersih, interaksi yang thoughtful, dan perhatian tajam terhadap detail.',
    'about.m1':'Tahun','about.m2':'Proyek','about.m3':'Klien','about.cv':'Unduh CV',
    'projects.eyebrow':'Portofolio','projects.title':'Proyek Pilihan',
    'proj.detail':'Lihat Detail \u2197','proj.visit':'Kunjungi Proyek','common.more':'Lihat Lebih',
    'certs.eyebrow':'Pencapaian','certs.title':'Sertifikat & Penghargaan',
    'papers.eyebrow':'Penelitian','papers.title':'Makalah & Jurnal','papers.read':'Baca Makalah \u2192',
    'gallery.eyebrow':'Galeri','gallery.title':'Galeri Visual',
    'exp.eyebrow':'Perjalanan','exp.title':'Pengalaman & Pendidikan',
    'exp.work':'Pengalaman Kerja','exp.org':'Organisasi & Kepanitiaan','exp.edu':'Pendidikan',
    'exp.w1':'Mengembangkan aplikasi web responsif menggunakan React dan framework modern.',
    'exp.w2':'Membangun situs web kustom untuk bisnis kecil.',
    'exp.o1':'Memimpin 12 desainer dalam branding acara. 500+ peserta.',
    'exp.o2':'Mengembangkan website organisasi dengan sistem registrasi acara.',
    'exp.e1':'Sarjana Sistem Informasi','exp.e1d':'IPK: 3.8/4.0. Fokus pengembangan web & desain UI/UX.',
    'skills.eyebrow':'Keahlian','skills.title':'Kemampuan & Alat','skills.fe':'Frontend','skills.be':'Backend','skills.tools':'Desain & Alat',
    'contact.eyebrow':'Hubungi Saya','contact.title':'Hubungi Saya','contact.sub':'Mari bekerja sama!',
    'contact.p':'Terbuka untuk freelance, kolaborasi, dan peluang menarik baru.',
    'form.name':'Nama Anda','form.email':'Email Anda','form.subject':'Subjek','form.message':'Pesan','form.send':'Kirim Pesan'
  }
};
var currentLang = 'en';
function applyLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
}
document.querySelectorAll('.lang-btn').forEach(function (btn) {
  btn.addEventListener('click', function () { applyLang(btn.dataset.lang); });
});

// ═══════════════════════════════════
// WELCOME VOICE
// ═══════════════════════════════════
function playWelcomeVoice() {
  playCuteChime();
  setTimeout(speakCute, 800);
}
function playCuteChime() {
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
    var times = [0, 0.12, 0.24, 0.38, 0.52, 0.64];
    notes.forEach(function (freq, i) {
      var osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + times[i]);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + times[i] + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + times[i] + 0.35);
      osc.start(ctx.currentTime + times[i]); osc.stop(ctx.currentTime + times[i] + 0.38);
    });
  } catch(e){}
}
function speakCute() {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  var utter = new SpeechSynthesisUtterance('Hi, welcome to my portfolio');
  utter.rate = 1.1; utter.pitch = 1.5; utter.volume = 0.85;
  function doSpeak(voices) {
    var preferred = ['Google UK English Female','Microsoft Zira Desktop','Samantha','Karen','Moira','Zoe','Tessa'];
    var pick = null;
    for (var i = 0; i < preferred.length; i++) {
      pick = voices.find(function(v){ return v.name.includes(preferred[i]); });
      if (pick) break;
    }
    if (!pick) pick = voices.find(function(v){ return v.lang.startsWith('en'); });
    if (pick) utter.voice = pick;
    window.speechSynthesis.speak(utter);
  }
  var voices = window.speechSynthesis.getVoices();
  if (voices.length) { doSpeak(voices); }
  else { window.speechSynthesis.addEventListener('voiceschanged', function(){ doSpeak(window.speechSynthesis.getVoices()); }, {once:true}); }
}

// ═══════════════════════════════════
// TAYLOR SWIFT–INSPIRED DREAMY POP MUSIC
// Original composition using Web Audio API
// Key: G major, BPM: 80, Chord: G→Em→C→D
// ═══════════════════════════════════
var musicCtx = null, musicGain = null, musicOn = false;

function buildTaylorPop() {
  try {
    musicCtx  = new (window.AudioContext || window.webkitAudioContext)();
    musicGain = musicCtx.createGain();
    musicGain.gain.value = 0;

    // Master compressor + reverb
    var comp = musicCtx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.ratio.value = 3;

    // Reverb impulse
    function makeReverb(ctx, duration) {
      var rate = ctx.sampleRate, len = rate * duration;
      var buf = ctx.createBuffer(2, len, rate);
      for (var c = 0; c < 2; c++) {
        var d = buf.getChannelData(c);
        for (var i = 0; i < len; i++) d[i] = (Math.random()*2-1) * Math.pow(1 - i/len, 2.5);
      }
      var conv = ctx.createConvolver(); conv.buffer = buf; return conv;
    }
    var reverb = makeReverb(musicCtx, 2.4);
    var reverbGain = musicCtx.createGain(); reverbGain.gain.value = 0.3;
    comp.connect(reverb); reverb.connect(reverbGain); reverbGain.connect(musicGain);
    comp.connect(musicGain);
    musicGain.connect(musicCtx.destination);

    var BPM = 80, beat = 60/BPM, bar = beat*4;

    // G major chord voicings: G, Em, C, D
    var chords = [
      [196.00, 246.94, 293.66, 392.00, 493.88],   // G  major (warm & full)
      [164.81, 246.94, 293.66, 369.99, 493.88],   // Em (wistful)
      [130.81, 196.00, 261.63, 329.63, 392.00],   // C  major (hopeful)
      [146.83, 220.00, 293.66, 369.99, 440.00]    // D  major (uplifting)
    ];

    function playPad(freq, startT, dur, vol) {
      var osc  = musicCtx.createOscillator();
      var osc2 = musicCtx.createOscillator();
      var gain = musicCtx.createGain();
      osc.type = 'triangle'; osc.frequency.value = freq;
      osc2.type = 'sine';    osc2.frequency.value = freq * 2.001;
      gain.gain.setValueAtTime(0, startT);
      gain.gain.linearRampToValueAtTime(vol, startT + 0.08);
      gain.gain.setValueAtTime(vol, startT + dur - 0.12);
      gain.gain.linearRampToValueAtTime(0, startT + dur);
      osc.connect(gain); osc2.connect(gain); gain.connect(comp);
      osc.start(startT); osc.stop(startT + dur + 0.1);
      osc2.start(startT); osc2.stop(startT + dur + 0.1);
    }

    // Arpeggio pattern (signature TS dreamy picking)
    var arpeggioPatterns = [
      [0, 2, 4, 2, 1, 2, 4, 2],   // pattern for G
      [0, 2, 4, 2, 1, 2, 4, 2],   // Em
      [0, 2, 4, 2, 1, 2, 4, 2],   // C
      [0, 2, 4, 2, 1, 2, 4, 2]    // D
    ];

    function playArpeggio(chord, startT, pattern) {
      var step = beat / 2;
      pattern.forEach(function(idx, i) {
        var osc  = musicCtx.createOscillator();
        var gain = musicCtx.createGain();
        var t = startT + i * step;
        var f = chord[idx] * 2; // one octave up
        osc.type = 'sine'; osc.frequency.value = f;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.04, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + step * 0.9);
        osc.connect(gain); gain.connect(comp);
        osc.start(t); osc.stop(t + step);
      });
    }

    // Soft hi-hat noise bursts
    function playHat(t, vol) {
      var buf  = musicCtx.createBuffer(1, musicCtx.sampleRate * 0.04, musicCtx.sampleRate);
      var data = buf.getChannelData(0);
      for (var i = 0; i < data.length; i++) data[i] = Math.random()*2-1;
      var src  = musicCtx.createBufferSource();
      var filt = musicCtx.createBiquadFilter();
      var gain = musicCtx.createGain();
      src.buffer = buf; filt.type = 'highpass'; filt.frequency.value = 10000;
      gain.gain.setValueAtTime(vol, t); gain.gain.exponentialRampToValueAtTime(0.001, t+0.05);
      src.connect(filt); filt.connect(gain); gain.connect(comp);
      src.start(t); src.stop(t + 0.06);
    }

    // Schedule one full 4-bar loop
    function scheduleLoop(startT) {
      chords.forEach(function(chord, ci) {
        var barStart = startT + ci * bar;
        // Pad chord
        chord.forEach(function(f) { playPad(f, barStart, bar * 0.95, 0.028); });
        // Arpeggio
        playArpeggio(chord, barStart, arpeggioPatterns[ci]);
        // Hi-hats every 8th note
        for (var h = 0; h < 8; h++) {
          var hVol = (h % 2 === 0) ? 0.05 : 0.025;
          playHat(barStart + h * (beat/2), hVol);
        }
      });
      var loopDur = bar * chords.length;
      setTimeout(function() {
        if (musicOn) scheduleLoop(musicCtx.currentTime + 0.1);
      }, (loopDur - 0.6) * 1000);
    }

    scheduleLoop(musicCtx.currentTime + 0.1);
  } catch(e){ musicCtx = null; }
}

function startMusic() {
  if (!musicCtx) buildTaylorPop();
  if (musicCtx) {
    musicCtx.resume();
    if (musicGain) {
      musicGain.gain.cancelScheduledValues(musicCtx.currentTime);
      musicGain.gain.setValueAtTime(0, musicCtx.currentTime);
      musicGain.gain.linearRampToValueAtTime(0.85, musicCtx.currentTime + 1.8);
    }
  }
}
function stopMusic() {
  if (musicCtx && musicGain) {
    musicGain.gain.cancelScheduledValues(musicCtx.currentTime);
    musicGain.gain.setValueAtTime(musicGain.gain.value, musicCtx.currentTime);
    musicGain.gain.linearRampToValueAtTime(0, musicCtx.currentTime + 0.9);
    setTimeout(function(){ if (musicCtx) musicCtx.suspend(); }, 1000);
  }
}

var soundBtn = document.getElementById('soundBtn');
var iconOn   = document.getElementById('iconOn');
var iconOff  = document.getElementById('iconOff');
var soundLbl = document.getElementById('soundLabel');
function updateSoundUI() {
  if (iconOn)  iconOn.style.display  = musicOn ? '' : 'none';
  if (iconOff) iconOff.style.display = musicOn ? 'none' : '';
  if (soundLbl) soundLbl.textContent = musicOn ? 'Music On' : 'Music';
}
if (soundBtn) {
  soundBtn.addEventListener('click', function () {
    musicOn = !musicOn;
    if (musicOn) startMusic(); else stopMusic();
    updateSoundUI();
  });
}
updateSoundUI();

// ═══════════════════════════════════
// NAV
// ═══════════════════════════════════
var navbar    = document.getElementById('navbar');
var navToggle = document.getElementById('navToggle');
var navLinks  = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}
document.addEventListener('click', function (e) {
  if (navbar && !navbar.contains(e.target)) {
    navLinks  && navLinks.classList.remove('active');
    navToggle && navToggle.classList.remove('active');
  }
});
window.addEventListener('scroll', function () {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 80);
  var y = window.scrollY + 140;
  document.querySelectorAll('section[id]').forEach(function (s) {
    var a = document.querySelector('.nav-links a[href="#' + s.id + '"]');
    if (a) a.classList.toggle('active', y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
  });
});
document.querySelectorAll('.smooth-scroll').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      var t = document.querySelector(href);
      if (t) t.scrollIntoView({ behavior: 'smooth' });
      navLinks  && navLinks.classList.remove('active');
      navToggle && navToggle.classList.remove('active');
    }
  });
});

// ═══════════════════════════════════
// HERO ANIMATION
// ═══════════════════════════════════
function initHeroAnim() {
  gsap.timeline()
    .from('.hero-badge',   { y: 25, opacity: 0, duration: .6 })
    .from('.hero h1',      { y: 60, opacity: 0, duration: .9 }, '-=.3')
    .from('.hero-role',    { y: 25, opacity: 0, duration: .6 }, '-=.5')
    .from('.hero-desc',    { y: 25, opacity: 0, duration: .6 }, '-=.5')
    .from('.hbtn',         { y: 25, opacity: 0, stagger: .15, duration: .6 }, '-=.4')
    .from('.hero-social',  { y: 20, opacity: 0, duration: .5 }, '-=.3')
    .from('.tech-halo',    { scale: .85, opacity: 0, duration: 1.1, ease: 'power3.out' }, '-=.9');
}

// ═══════════════════════════════════
// PHOTO TILT (About)
// ═══════════════════════════════════
(function () {
  var frame = document.getElementById('apzFrame');
  if (!frame) return;
  var maxTilt = 16;
  frame.addEventListener('mousemove', function (e) {
    var r = frame.getBoundingClientRect();
    var dx = (e.clientX - r.left - r.width/2) / (r.width/2);
    var dy = (e.clientY - r.top  - r.height/2) / (r.height/2);
    frame.style.transform = 'perspective(700px) rotateX('+(-dy*maxTilt)+'deg) rotateY('+(dx*maxTilt)+'deg) scale3d(1.04,1.04,1.04)';
    frame.style.transition = 'transform .05s ease';
  });
  frame.addEventListener('mouseleave', function () {
    frame.style.transition = 'transform .6s cubic-bezier(.23,1,.32,1)';
    frame.style.transform  = 'perspective(700px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  });
})();

// ═══════════════════════════════════
// PROJECT CARD SWIPERS
// ═══════════════════════════════════
function initProjectSwiper(el) {
  if (!el || el.swiper) return;
  new Swiper(el, {
    loop: true, speed: 600,
    autoplay: { delay: 3500, disableOnInteraction: false },
    navigation: { nextEl: el.querySelector('.swiper-button-next'), prevEl: el.querySelector('.swiper-button-prev') }
  });
}
document.querySelectorAll('.projectSwiper').forEach(initProjectSwiper);

// ═══════════════════════════════════
// PROJECT DETAIL MODAL
// ═══════════════════════════════════
var projModal      = document.getElementById('projModal');
var projModalBg    = document.getElementById('projModalBg');
var projModalClose = document.getElementById('projModalClose');
var pmSwiperEl     = document.getElementById('pmSwiper');
var pmSlidesEl     = document.getElementById('pmSlides');
var pmSwiper       = null;
document.querySelectorAll('.project-detail-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var card = btn.closest('.project');
    if (!card || !projModal) return;
    document.getElementById('pmTitle').textContent = card.dataset.title || '';
    document.getElementById('pmRole').textContent  = card.dataset.role  || '';
    document.getElementById('pmDesc').textContent  = card.dataset.desc  || '';
    document.getElementById('pmTech').textContent  = card.dataset.tech  || '';
    document.getElementById('pmLink').href         = card.dataset.link  || '#';
    var tagEl = card.querySelector('.project-tag');
    var pmTagEl = document.getElementById('pmTag');
    if (pmTagEl) pmTagEl.textContent = tagEl ? tagEl.textContent : '';
    var imgs = (card.dataset.imgs || '').split('|').filter(Boolean);
    if (pmSlidesEl) {
      pmSlidesEl.innerHTML = '';
      imgs.forEach(function (src) {
        var slide = document.createElement('div'); slide.className = 'swiper-slide';
        var img = document.createElement('img'); img.src = src; img.alt = ''; img.draggable = false;
        slide.appendChild(img); pmSlidesEl.appendChild(slide);
      });
    }
    if (pmSwiper) { try { pmSwiper.destroy(true, true); } catch(e){} pmSwiper = null; }
    if (pmSwiperEl && imgs.length >= 1) {
      pmSwiper = new Swiper(pmSwiperEl, {
        loop: imgs.length > 1, speed: 500, grabCursor: true, keyboard: { enabled: true },
        pagination: { el: '.pm-swiper .swiper-pagination', clickable: true },
        navigation: { nextEl: '.pm-swiper .swiper-button-next', prevEl: '.pm-swiper .swiper-button-prev' }
      });
    }
    projModal.classList.add('open'); document.body.style.overflow = 'hidden';
  });
});
function closeModal() { if (projModal) projModal.classList.remove('open'); document.body.style.overflow = ''; }
if (projModalClose) projModalClose.addEventListener('click', closeModal);
if (projModalBg)    projModalBg.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeLightbox(); } });

// ═══════════════════════════════════
// GALLERY LIGHTBOX
// ═══════════════════════════════════
var allGalSrcs = [], glbCurrent = 0;
var lightbox   = document.getElementById('galleryLightbox');
var glbBg      = document.getElementById('glbBg');
var glbClose   = document.getElementById('glbClose');
var glbPrev    = document.getElementById('glbPrev');
var glbNext    = document.getElementById('glbNext');
var glbImg     = document.getElementById('glbImg');
var glbCounter = document.getElementById('glbCounter');
document.querySelectorAll('.gal-item').forEach(function (item) {
  var src = item.dataset.src || (item.querySelector('img') ? item.querySelector('img').src : '');
  if (src && !allGalSrcs.includes(src)) allGalSrcs.push(src);
});
function openLightbox(src) {
  var idx = allGalSrcs.indexOf(src);
  if (idx === -1) { allGalSrcs.push(src); idx = allGalSrcs.length - 1; }
  glbCurrent = idx; showLightboxImg();
  if (lightbox) lightbox.classList.add('open'); document.body.style.overflow = 'hidden';
}
function closeLightbox() { if (lightbox) lightbox.classList.remove('open'); document.body.style.overflow = ''; }
function showLightboxImg() {
  if (glbImg && allGalSrcs[glbCurrent]) {
    glbImg.src = allGalSrcs[glbCurrent];
    if (glbCounter) glbCounter.textContent = (glbCurrent+1)+' / '+allGalSrcs.length;
  }
}
document.querySelectorAll('.gal-item').forEach(function (item) {
  item.addEventListener('click', function () {
    var src = item.dataset.src || (item.querySelector('img') ? item.querySelector('img').getAttribute('src') : '');
    if (src) openLightbox(src);
  });
});
if (glbClose) glbClose.addEventListener('click', closeLightbox);
if (glbBg)    glbBg.addEventListener('click', closeLightbox);
if (glbPrev)  glbPrev.addEventListener('click', function () { glbCurrent = (glbCurrent-1+allGalSrcs.length) % allGalSrcs.length; showLightboxImg(); });
if (glbNext)  glbNext.addEventListener('click', function () { glbCurrent = (glbCurrent+1) % allGalSrcs.length; showLightboxImg(); });

// ═══════════════════════════════════
// SEE MORE
// ═══════════════════════════════════
function setupSeeMore(btnId, containerSel) {
  var btn = document.getElementById(btnId); if (!btn) return;
  var shown = false;
  btn.addEventListener('click', function () {
    shown = !shown;
    var container = document.querySelector(containerSel); if (!container) return;
    container.querySelectorAll('.extra-card').forEach(function (c) { c.style.display = shown ? '' : 'none'; });
    btn.textContent = shown ? (currentLang==='id'?'Tampilkan Lebih Sedikit':'Show Less') : (currentLang==='id'?'Lihat Lebih':'See More');
    if (shown) container.querySelectorAll('.extra-card .projectSwiper').forEach(initProjectSwiper);
  });
}
setupSeeMore('projMore',  '#projectList');
setupSeeMore('certMore',  '#certGrid');
setupSeeMore('paperMore', '#paperList');

// ═══════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════
var cform = document.getElementById('contactForm'), sendBtn = document.getElementById('sendBtn'), sendTxt = document.getElementById('sendBtnText');
if (cform && sendBtn) {
  cform.addEventListener('submit', function (e) {
    e.preventDefault();
    var orig = sendTxt ? sendTxt.textContent : 'Send Message';
    if (sendTxt) sendTxt.textContent = currentLang==='id' ? '\u2713 Terkirim!' : '\u2713 Sent!';
    sendBtn.disabled = true;
    setTimeout(function () {
      if (sendTxt) sendTxt.textContent = orig;
      sendBtn.disabled = false; cform.reset();
    }, 3000);
  });
}

// ═══════════════════════════════════
// SCROLL ANIMATIONS
// ═══════════════════════════════════
gsap.utils.toArray('.section-eyebrow').forEach(function (el) {
  gsap.from(el, { scrollTrigger:{trigger:el,start:'top 88%'}, opacity:0, y:20, duration:.6 });
});
gsap.utils.toArray('section h2').forEach(function (el) {
  gsap.from(el, { scrollTrigger:{trigger:el,start:'top 86%'}, opacity:0, y:35, duration:.8 });
});
gsap.from('.about-card', { scrollTrigger:{trigger:'.about-card',start:'top 82%'}, opacity:0, y:40, duration:.9 });
gsap.from('.ab-photo-wrap', { scrollTrigger:{trigger:'.ab-photo-wrap',start:'top 82%'}, opacity:0, scale:.85, duration:1, ease:'back.out(1.4)' });
gsap.utils.toArray('.ab-tl-item').forEach(function (el, i) {
  gsap.from(el, { scrollTrigger:{trigger:el,start:'top 90%'}, opacity:0, x:-20, duration:.5, delay:i*.1 });
});
gsap.utils.toArray('.ab-stat-item').forEach(function (el, i) {
  gsap.from(el, { scrollTrigger:{trigger:el,start:'top 90%'}, opacity:0, y:15, duration:.5, delay:i*.1 });
});
gsap.utils.toArray('.project').forEach(function (c, i) {
  gsap.from(c, { scrollTrigger:{trigger:c,start:'top 87%'}, y:60, opacity:0, scale:.96, duration:.9, delay:i*.08, ease:'power3.out' });
});
gsap.utils.toArray('.certificate-item').forEach(function (c, i) {
  gsap.from(c, { scrollTrigger:{trigger:c,start:'top 87%'}, y:50, opacity:0, duration:.7, delay:i*.06 });
});
gsap.utils.toArray('.paper-card').forEach(function (c, i) {
  gsap.from(c, { scrollTrigger:{trigger:c,start:'top 87%'}, x:-40, opacity:0, duration:.7, delay:i*.07 });
});
gsap.utils.toArray('.timeline .item').forEach(function (c, i) {
  gsap.from(c, { scrollTrigger:{trigger:c,start:'top 87%'}, x:-35, opacity:0, duration:.7, delay:i*.06 });
});
gsap.utils.toArray('.skill-item').forEach(function (c, i) {
  gsap.from(c, { scrollTrigger:{trigger:c,start:'top 90%'}, scale:.7, opacity:0, duration:.45, delay:i*.04 });
});

// ═══════════════════════════════════
// CURSOR
// ═══════════════════════════════════
(function () {
  var cur = document.querySelector('.cursor'), fol = document.querySelector('.cursor-follower');
  if (!cur || !fol) return;
  var mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
  (function loop() {
    fx += (mx-fx)*0.13; fy += (my-fy)*0.13;
    cur.style.left = mx+'px'; cur.style.top = my+'px';
    fol.style.left = fx+'px'; fol.style.top = fy+'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button').forEach(function (el) {
    el.addEventListener('mouseenter', function () { fol.style.transform='translate(-50%,-50%) scale(1.6)'; fol.style.opacity='.3'; });
    el.addEventListener('mouseleave', function () { fol.style.transform='translate(-50%,-50%) scale(1)';   fol.style.opacity='.5'; });
  });
})();