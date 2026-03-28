
const images = [
  { src: 'assets/images/shu-memory-01.jpeg', caption: 'A beautiful beginning of motherhood.' },
  { src: 'assets/images/shu-memory-02.jpeg', caption: 'Safe in your arms, wrapped in love.' },
  { src: 'assets/images/shu-memory-03.jpeg', caption: 'A smile and a tender little moment.' },
  { src: 'assets/images/shu-memory-04.jpeg', caption: 'Soft beginnings, priceless closeness.' },
  { src: 'assets/images/shu-memory-05.jpeg', caption: 'Tiny wonder and motherly warmth.' },
  { src: 'assets/images/shu-memory-06.jpeg', caption: 'Sweet little eyes, sweeter memories.' },
  { src: 'assets/images/shu-memory-07.jpeg', caption: 'A gentle pink-hued memory.' },
  { src: 'assets/images/shu-memory-08.jpeg', caption: 'Family love, all in one frame.' },
  { src: 'assets/images/shu-memory-09.jpeg', caption: 'Shu with her glowing little star.' },
  { src: 'assets/images/shu-memory-10.jpeg', caption: 'A soft cuddle full of peace.' },
  { src: 'assets/images/shu-memory-11.jpeg', caption: 'Love hidden in laughter and fabric folds.' },
  { src: 'assets/images/shu-memory-12.jpeg', caption: 'Joy held close, heart to heart.' },
  { src: 'assets/images/shu-memory-13.jpeg', caption: 'In family circles, love grows deeper.' },
  { src: 'assets/images/shu-memory-14.jpeg', caption: 'Shared warmth and smiling faces.' },
  { src: 'assets/images/shu-memory-15.jpeg', caption: 'A lion-hearted little smile.' },
  { src: 'assets/images/shu-memory-16.jpeg', caption: 'Sunshine day and playful rides.' },
  { src: 'assets/images/shu-memory-17.jpeg', caption: 'Curious eyes and a red winter cap.' },
  { src: 'assets/images/shu-memory-18.jpeg', caption: 'A blue shawl, a bright little face.' },
  { src: 'assets/images/shu-memory-19.jpeg', caption: 'Winter smile and happy eyes.' },
  { src: 'assets/images/shu-memory-20.jpeg', caption: 'A mother’s look that says everything.' },
  { src: 'assets/images/shu-memory-21.jpeg', caption: 'A cheerful family gathering.' },
  { src: 'assets/images/shu-memory-22.jpeg', caption: 'Love, laughter, and friendship in one frame.' },
  { src: 'assets/images/shu-memory-23.jpeg', caption: 'Togetherness across generations.' },
  { src: 'assets/images/shu-memory-24.jpeg', caption: 'Family celebration and cherished bonds.' },
  { src: 'assets/images/shu-memory-25.jpeg', caption: 'A happy hug full of sparkle.' },
  { src: 'assets/images/shu-memory-26.jpeg', caption: 'Three generations, one beautiful blessing.' },
  { src: 'assets/images/shu-memory-27.jpeg', caption: 'A joyful smile that lights the frame.' },
  { src: 'assets/images/shu-memory-28.jpeg', caption: 'An award day with proud smiles.' },
];


const captionsFallback = [
  'A moment worth keeping forever.'
];

const galleryGrid = document.getElementById('galleryGrid');
const introOverlay = document.getElementById('introOverlay');
const enterBtn = document.getElementById('enterBtn');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const cursorGlow = document.querySelector('.cursor-glow');
const quotesDrawer = document.getElementById('quotesDrawer');
const openAllQuotes = document.getElementById('openAllQuotes');
const closeDrawer = document.getElementById('closeDrawer');

let musicPlaying = false;
let currentIndex = 0;

function buildGallery() {
  images.forEach((image, index) => {
    const card = document.createElement('button');
    card.className = 'memory-item';
    card.type = 'button';
    card.setAttribute('aria-label', `Open memory ${index + 1}`);
    card.innerHTML = `
      <img src="${image.src}" alt="Memory ${index + 1}" loading="lazy" />
      <div class="memory-overlay"><p>${image.caption || captionsFallback[0]}</p></div>
    `;
    card.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(card);
  });
}

function buildParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 26; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    const size = Math.random() * 9 + 4;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 12;
    const delay = Math.random() * 12;
    const colors = [
      'rgba(255,134,200,.52)',
      'rgba(244,202,123,.45)',
      'rgba(205,184,255,.42)',
      'rgba(255,255,255,.25)'
    ];
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(particle);
  }
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .memory-item').forEach((el) => observer.observe(el));
}

function hideIntro() {
  introOverlay.classList.add('hidden');
  attemptPlayMusic();
}

async function attemptPlayMusic() {
  try {
    await bgMusic.play();
    musicPlaying = true;
    musicToggle.textContent = '❚❚ Pause Music';
  } catch (err) {
    musicPlaying = false;
    musicToggle.textContent = '♪ Play Music';
  }
}

musicToggle.addEventListener('click', async () => {
  if (!bgMusic.getAttribute('src') && bgMusic.querySelector('source')) {
    // source tag used, fine
  }
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    musicToggle.textContent = '♪ Play Music';
  } else {
    try {
      await bgMusic.play();
      musicPlaying = true;
      musicToggle.textContent = '❚❚ Pause Music';
    } catch (err) {
      alert('Add your MP3 file at assets/music/your-song.mp3 first, then music will work.');
    }
  }
});

enterBtn.addEventListener('click', hideIntro);

window.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function openLightbox(index) {
  currentIndex = index;
  const item = images[currentIndex];
  lightboxImage.src = item.src;
  lightboxCaption.textContent = item.caption || captionsFallback[0];
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
}
function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
}
function showNext(step = 1) {
  currentIndex = (currentIndex + step + images.length) % images.length;
  openLightbox(currentIndex);
}

lightboxClose.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => showNext(-1));
nextBtn.addEventListener('click', () => showNext(1));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    quotesDrawer.classList.remove('active');
  }
  if (lightbox.classList.contains('active')) {
    if (e.key === 'ArrowRight') showNext(1);
    if (e.key === 'ArrowLeft') showNext(-1);
  }
});

openAllQuotes.addEventListener('click', () => quotesDrawer.classList.add('active'));
closeDrawer.addEventListener('click', () => quotesDrawer.classList.remove('active'));
quotesDrawer.addEventListener('click', (e) => {
  if (e.target === quotesDrawer) quotesDrawer.classList.remove('active');
});

buildGallery();
buildParticles();
setupReveal();
setTimeout(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')), 250);
