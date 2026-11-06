/* ══════════════════════════════════════════════════════
   VisuaLens Photography Portfolio — app.js
   Features:
     • Masonry gallery with 24 real Unsplash photos
     • Category filter with animated transitions
     • Hover zoom micro-interactions (CSS-driven)
     • Lightbox modal with prev/next navigation & EXIF meta
     • Navbar scroll effect
     • Scroll-reveal animations (IntersectionObserver)
     • Mobile menu toggle
     • Contact form with validation & success state
   ══════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════════
   PHOTO DATA — 24 curated Unsplash photos with metadata
   ══════════════════════════════════════════════════════ */
const PHOTOS = [
  /* ── Nature ── */
  {
    id: 1, category: 'nature',
    title: 'Aurora Dreamscape',
    description: 'A breathtaking aurora borealis painting the Arctic sky in ribbons of emerald and violet.',
    src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=75',
    camera: 'Sony A7 III', aperture: 'f/2.8', iso: 'ISO 3200', location: 'Tromsø, Norway',
  },
  {
    id: 2, category: 'nature',
    title: 'Golden Hour Valley',
    description: 'The valley floor glows amber as the last rays of sunlight skim across rolling meadows.',
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=75',
    camera: 'Canon EOS R5', aperture: 'f/8', iso: 'ISO 100', location: 'Yosemite, USA',
  },
  {
    id: 3, category: 'nature',
    title: 'Misty Waterfall',
    description: 'Silky water cascades over ancient basalt columns, veiled in soft morning mist.',
    src: 'https://images.unsplash.com/photo-1455218873509-8097305ee378?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1455218873509-8097305ee378?w=600&q=75',
    camera: 'Nikon Z7 II', aperture: 'f/11', iso: 'ISO 64', location: 'Iceland',
  },
  {
    id: 4, category: 'nature',
    title: 'Desert Dunes at Dusk',
    description: 'Sand dunes cast long, sculpted shadows in the dying light of the Saharan sunset.',
    src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=75',
    camera: 'Sony A7R IV', aperture: 'f/16', iso: 'ISO 50', location: 'Sahara, Morocco',
  },
  {
    id: 5, category: 'nature',
    title: 'Forest Cathedral',
    description: 'Towering redwoods form a natural cathedral, dappled light filtering through the canopy.',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=75',
    camera: 'Fujifilm GFX 100', aperture: 'f/5.6', iso: 'ISO 400', location: 'California, USA',
  },

  /* ── Portrait ── */
  {
    id: 6, category: 'portrait',
    title: 'Eyes of the Soul',
    description: 'A close-up portrait capturing the depth and quiet strength in a subject\'s gaze.',
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=75',
    camera: 'Canon 5D IV', aperture: 'f/1.4', iso: 'ISO 200', location: 'Studio, NYC',
  },
  {
    id: 7, category: 'portrait',
    title: 'Golden Light',
    description: 'Warm window light sculpts the contours of a thoughtful face in this intimate study.',
    src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=75',
    camera: 'Sony 85mm f/1.4', aperture: 'f/1.8', iso: 'ISO 160', location: 'Paris, France',
  },
  {
    id: 8, category: 'portrait',
    title: 'Quiet Contemplation',
    description: 'Soft, diffused light envelops a figure lost in thought against a minimal backdrop.',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75',
    camera: 'Leica Q2', aperture: 'f/2.0', iso: 'ISO 320', location: 'London, UK',
  },
  {
    id: 9, category: 'portrait',
    title: 'Street Chic',
    description: 'Fashion meets street photography; bold style against the texture of an urban wall.',
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=75',
    camera: 'Nikon Z6 II', aperture: 'f/2.8', iso: 'ISO 250', location: 'Tokyo, Japan',
  },
  {
    id: 10, category: 'portrait',
    title: 'Elder Wisdom',
    description: 'Every line on this face tells a story — a portrait of grace, time and lived experience.',
    src: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&q=75',
    camera: 'Canon EOS R', aperture: 'f/2.2', iso: 'ISO 400', location: 'Marrakech, Morocco',
  },

  /* ── Architecture ── */
  {
    id: 11, category: 'architecture',
    title: 'Steel & Glass Cathedral',
    description: 'Modern skyscrapers reflect each other in a mesmerizing dance of glass and steel.',
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=75',
    camera: 'Sony A7R V', aperture: 'f/8', iso: 'ISO 100', location: 'Dubai, UAE',
  },
  {
    id: 12, category: 'architecture',
    title: 'Spiral Ascent',
    description: 'A spiraling staircase winds upward in perfect geometric symmetry, shot from below.',
    src: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=600&q=75',
    camera: 'Fujifilm X-T5', aperture: 'f/5.6', iso: 'ISO 800', location: 'Vienna, Austria',
  },
  {
    id: 13, category: 'architecture',
    title: 'Ancient Arches',
    description: 'Centuries-old arches frame a sunlit courtyard in this study of Moorish architecture.',
    src: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=75',
    camera: 'Canon EOS R5', aperture: 'f/7.1', iso: 'ISO 200', location: 'Seville, Spain',
  },
  {
    id: 14, category: 'architecture',
    title: 'Brutalist Beauty',
    description: 'Raw concrete textures and bold geometric forms define this ode to brutalism.',
    src: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=600&q=75',
    camera: 'Sony A7 IV', aperture: 'f/9', iso: 'ISO 160', location: 'Berlin, Germany',
  },
  {
    id: 15, category: 'architecture',
    title: 'Bridge at Blue Hour',
    description: 'An iconic suspension bridge glows against the deep cobalt of twilight.',
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=75',
    camera: 'Nikon D850', aperture: 'f/11', iso: 'ISO 200', location: 'San Francisco, USA',
  },

  /* ── Street ── */
  {
    id: 16, category: 'street',
    title: 'Rain-Slicked Alley',
    description: 'Neon reflections shimmer on wet cobblestones in a quiet Tokyo side street.',
    src: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=600&q=75',
    camera: 'Ricoh GR III', aperture: 'f/2.8', iso: 'ISO 1600', location: 'Tokyo, Japan',
  },
  {
    id: 17, category: 'street',
    title: 'Crosswalk Rush',
    description: 'A stream of pedestrians blur into silhouettes at a busy intersection.',
    src: 'https://images.unsplash.com/photo-1476304884326-cd2c88572c5f?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1476304884326-cd2c88572c5f?w=600&q=75',
    camera: 'Leica M11', aperture: 'f/8', iso: 'ISO 400', location: 'New York, USA',
  },
  {
    id: 18, category: 'street',
    title: 'Morning Market',
    description: 'Vendors arrange their colourful produce at dawn, before the city fully wakes.',
    src: 'https://images.unsplash.com/photo-1534685785745-60a2cea0ec34?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1534685785745-60a2cea0ec34?w=600&q=75',
    camera: 'Fujifilm X-Pro3', aperture: 'f/4', iso: 'ISO 800', location: 'Bangkok, Thailand',
  },
  {
    id: 19, category: 'street',
    title: 'The Last Tram',
    description: 'A lone tram rounds a corner at midnight, its windows warm against the dark city.',
    src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=75',
    camera: 'Sony A7 III', aperture: 'f/2.8', iso: 'ISO 2000', location: 'Prague, Czech Republic',
  },

  /* ── Abstract ── */
  {
    id: 20, category: 'abstract',
    title: 'Liquid Metal',
    description: 'Molten silver curves captured at 1/4000s — a world between solid and fluid.',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=75',
    camera: 'Canon EOS R3', aperture: 'f/16', iso: 'ISO 100', location: 'Studio, LA',
  },
  {
    id: 21, category: 'abstract',
    title: 'Chromatic Swirl',
    description: 'Pigments bloom in water, forming an organic canvas of impossible colour.',
    src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=75',
    camera: 'Nikon Z9', aperture: 'f/22', iso: 'ISO 64', location: 'Studio, NYC',
  },
  {
    id: 22, category: 'abstract',
    title: 'Light Trails',
    description: 'Long-exposure headlights trace luminous ribbons through a mountain highway curve.',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
    camera: 'Sony A7R IV', aperture: 'f/11', iso: 'ISO 100', location: 'Swiss Alps',
  },
  {
    id: 23, category: 'abstract',
    title: 'Geometric Shadows',
    description: 'Hard light slices through a slatted shutter, turning a plain wall into geometry.',
    src: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=600&q=75',
    camera: 'Hasselblad X2D', aperture: 'f/8', iso: 'ISO 100', location: 'Lisbon, Portugal',
  },
  {
    id: 24, category: 'abstract',
    title: 'Frozen Moment',
    description: 'A water droplet crown, frozen at the apex of its splash — 1/8000s of pure physics.',
    src: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&q=75',
    camera: 'Canon EOS R5', aperture: 'f/16', iso: 'ISO 400', location: 'Studio, Berlin',
  },
];

/* ══════════════════════════════════════════════════════
   STATE
   ══════════════════════════════════════════════════════ */
let activeFilter = 'all';
let lightboxIndex = 0;
let filteredPhotos = [...PHOTOS];

/* ══════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ══════════════════════════════════════════════════════
   NAVBAR — scroll effect
   ══════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = $('#navbar');
  const toggle = $('#menu-toggle');
  const mobileMenu = $('#mobile-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    mobileMenu.classList.toggle('hidden', !isOpen);
  });

  // Close mobile menu on link click
  $$('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.add('hidden');
    });
  });
}

/* ══════════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
   ══════════════════════════════════════════════════════ */
function initScrollReveal() {
  const revealEls = $$('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════
   GALLERY — build & render
   ══════════════════════════════════════════════════════ */
function buildCard(photo, index) {
  const card = document.createElement('div');
  card.className = 'gallery-card';
  card.dataset.id = photo.id;
  card.dataset.category = photo.category;
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Open lightbox for ${photo.title}`);

  // Vary card heights for masonry feel
  const heights = ['180px', '220px', '260px', '300px', '240px'];
  const h = heights[index % heights.length];

  card.innerHTML = `
    <!-- Category chip -->
    <div class="card-category-chip">${photo.category}</div>

    <!-- Photo -->
    <img
      src="${photo.thumb}"
      alt="${photo.title}"
      style="height:${h};"
      loading="lazy"
    />

    <!-- Eye icon (shown on hover) -->
    <div class="card-eye" aria-hidden="true">
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
      </svg>
    </div>

    <!-- Overlay with text -->
    <div class="card-overlay">
      <div>
        <p class="text-white font-serif text-base font-bold leading-tight">${photo.title}</p>
        <p class="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">${photo.description}</p>
      </div>
    </div>
  `;

  // Open lightbox on click or keyboard
  card.addEventListener('click', () => openLightbox(index));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(index);
    }
  });

  return card;
}

function renderGallery(photos) {
  const grid = $('#gallery-grid');
  const emptyState = $('#empty-state');
  const resultsCount = $('#results-count');

  // Clear existing
  grid.innerHTML = '';

  if (!photos.length) {
    grid.classList.add('hidden');
    emptyState.classList.remove('hidden');
    resultsCount.textContent = '0';
    return;
  }

  grid.classList.remove('hidden');
  emptyState.classList.add('hidden');
  resultsCount.textContent = photos.length;

  photos.forEach((photo, i) => {
    const card = buildCard(photo, i);
    // Stagger animation delay
    card.style.animationDelay = `${i * 0.06}s`;
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════
   FILTER — category buttons
   ══════════════════════════════════════════════════════ */
function updateCounts() {
  const categories = ['nature', 'portrait', 'architecture', 'street', 'abstract'];
  const countAll = $('#count-all');
  if (countAll) countAll.textContent = PHOTOS.length;

  categories.forEach(cat => {
    const el = $(`#count-${cat}`);
    if (el) el.textContent = PHOTOS.filter(p => p.category === cat).length;
  });
}

function initFilters() {
  const filterBtns = $$('.filter-btn');
  updateCounts();

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      if (filter === activeFilter) return;

      activeFilter = filter;

      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter and re-render
      filteredPhotos = filter === 'all'
        ? [...PHOTOS]
        : PHOTOS.filter(p => p.category === filter);

      renderGallery(filteredPhotos);
    });
  });
}

/* ══════════════════════════════════════════════════════
   LIGHTBOX MODAL
   ══════════════════════════════════════════════════════ */
function openLightbox(index) {
  lightboxIndex = index;
  const lightbox = $('#lightbox');
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  populateLightbox(lightboxIndex);

  // Animate panel
  const panel = $('#lightbox-panel');
  panel.classList.remove('animate-zoom-in');
  void panel.offsetWidth; // reflow
  panel.classList.add('animate-zoom-in');
}

function closeLightbox() {
  const lightbox = $('#lightbox');
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function populateLightbox(index) {
  const photo = filteredPhotos[index];
  if (!photo) return;

  const img = $('#lightbox-img');
  const loader = $('#lightbox-loader');

  // Show loader, hide image while loading
  loader.style.display = 'flex';
  img.style.opacity = '0';

  // Populate text fields immediately
  $('#lightbox-title').textContent = photo.title;
  $('#lightbox-desc').textContent = photo.description;
  $('#lightbox-category').textContent = photo.category;
  $('#lightbox-camera').textContent = photo.camera;
  $('#lightbox-aperture').textContent = photo.aperture;
  $('#lightbox-iso').textContent = photo.iso;
  $('#lightbox-location').textContent = photo.location;

  // Load high-res image
  const tempImg = new Image();
  tempImg.onload = () => {
    img.src = photo.src;
    img.alt = photo.title;
    loader.style.display = 'none';
    img.style.opacity = '1';
  };
  tempImg.onerror = () => {
    img.src = photo.thumb; // fallback to thumb
    loader.style.display = 'none';
    img.style.opacity = '1';
  };
  tempImg.src = photo.src;

  // Update prev/next button states
  $('#lightbox-prev').disabled = index === 0;
  $('#lightbox-next').disabled = index === filteredPhotos.length - 1;
  $('#lightbox-prev').style.opacity = index === 0 ? '0.3' : '1';
  $('#lightbox-next').style.opacity = index === filteredPhotos.length - 1 ? '0.3' : '1';
}

function initLightbox() {
  const lightbox = $('#lightbox');
  const backdrop = $('#lightbox-backdrop');
  const closeBtn = $('#lightbox-close');
  const prevBtn = $('#lightbox-prev');
  const nextBtn = $('#lightbox-next');

  // Close on backdrop click
  backdrop.addEventListener('click', closeLightbox);

  // Close button
  closeBtn.addEventListener('click', closeLightbox);

  // Navigation
  prevBtn.addEventListener('click', () => {
    if (lightboxIndex > 0) {
      lightboxIndex--;
      populateLightbox(lightboxIndex);
    }
  });
  nextBtn.addEventListener('click', () => {
    if (lightboxIndex < filteredPhotos.length - 1) {
      lightboxIndex++;
      populateLightbox(lightboxIndex);
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;

    switch (e.key) {
      case 'Escape': closeLightbox(); break;
      case 'ArrowLeft':
        if (lightboxIndex > 0) { lightboxIndex--; populateLightbox(lightboxIndex); }
        break;
      case 'ArrowRight':
        if (lightboxIndex < filteredPhotos.length - 1) { lightboxIndex++; populateLightbox(lightboxIndex); }
        break;
    }
  });

  // Touch / swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) < 50) return;
    if (dx < 0 && lightboxIndex < filteredPhotos.length - 1) {
      lightboxIndex++;
      populateLightbox(lightboxIndex);
    } else if (dx > 0 && lightboxIndex > 0) {
      lightboxIndex--;
      populateLightbox(lightboxIndex);
    }
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════
   CONTACT FORM — validation & fake submit
   ══════════════════════════════════════════════════════ */
function initContactForm() {
  const form = $('#contact-form');
  const submitBtn = $('#submit-btn');
  const successMsg = $('#form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const inputs = $$('input, select, textarea', form);
    let valid = true;

    inputs.forEach(input => {
      input.style.borderColor = '';
      if (input.hasAttribute('required') && !input.value.trim()) {
        input.style.borderColor = '#EF4444';
        input.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
        valid = false;
      }
    });

    if (!valid) return;

    // Simulate sending
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      submitBtn.style.opacity = '1';
      successMsg.classList.remove('hidden');
      setTimeout(() => successMsg.classList.add('hidden'), 5000);
    }, 1600);
  });

  // Live clear error styles on input
  $$('input, select, textarea', form).forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    });
  });
}

/* ══════════════════════════════════════════════════════
   ADD REVEAL CLASS — to static sections
   ══════════════════════════════════════════════════════ */
function markRevealElements() {
  const selectors = [
    '#about .grid > div',
    '#contact .grid > *',
    '#contact .text-center',
    'footer',
  ];
  selectors.forEach(sel => {
    $$(sel).forEach(el => el.classList.add('reveal'));
  });
}

/* ══════════════════════════════════════════════════════
   ACTIVE NAV LINK — highlight on scroll
   ══════════════════════════════════════════════════════ */
function initActiveNavHighlight() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.style.color = isActive ? 'var(--accent)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ══════════════════════════════════════════════════════
   PARALLAX — subtle hero parallax on scroll
   ══════════════════════════════════════════════════════ */
function initParallax() {
  const hero = $('.hero-section');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hero.style.backgroundPositionY = `${y * 0.4}px`;
  }, { passive: true });
}

/* ══════════════════════════════════════════════════════
   INIT — DOMContentLoaded
   ══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  markRevealElements();
  updateCounts();
  renderGallery(filteredPhotos);
  initFilters();
  initLightbox();
  initContactForm();
  initActiveNavHighlight();
  initParallax();

  // Delay scroll-reveal so initial render completes
  requestAnimationFrame(() => {
    setTimeout(initScrollReveal, 100);
  });
});

