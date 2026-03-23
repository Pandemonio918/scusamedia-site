// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.style.display === 'flex';
  mobileNav.style.display = isOpen ? 'none' : 'flex';
  hamburger.classList.toggle('active');
});

// Close mobile nav on link click
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.style.display = 'none';
    hamburger.classList.remove('active');
  });
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 100) {
    header.style.background = 'rgba(10, 10, 10, 0.95)';
  } else {
    header.style.background = 'rgba(10, 10, 10, 0.85)';
  }
  lastScroll = currentScroll;
});

// ===== SERVICES ACCORDION =====
document.querySelectorAll('.svc-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.svc-item');
    const body = item.querySelector('.svc-body');
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.svc-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.svc-body').style.maxHeight = null;
    });

    // Open clicked if wasn't active
    if (!isActive) {
      item.classList.add('active');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

// ===== FAQ =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-answer').style.maxHeight = null;
    });

    // Open clicked if wasn't active
    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ===== TABS =====
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    document.querySelectorAll('.cs-card').forEach(card => {
      if (filter === 'all' || card.dataset.type.includes(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== VIDEO TESTIMONIALS =====
document.querySelectorAll('.testimonial-video').forEach(wrapper => {
  wrapper.addEventListener('click', () => {
    const video = wrapper.querySelector('video');
    if (!video) return;
    if (video.paused) {
      // Pause all others
      document.querySelectorAll('.testimonial-video video').forEach(v => {
        v.pause();
        v.closest('.testimonial-video').classList.remove('playing');
      });
      video.muted = false;
      video.play();
      wrapper.classList.add('playing');
    } else {
      video.pause();
      wrapper.classList.remove('playing');
    }
  });
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
