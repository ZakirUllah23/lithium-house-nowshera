/**
 * ============================================================================
 * Lithium House Nowshera — Core Master JavaScript (js/main.js)
 * ============================================================================
 */

const LITHIUM_HOUSE_CONFIG = {
  businessName: "Lithium House Nowshera",
  city: "Nowshera",
  district: "Nowshera",
  province: "Khyber Pakhtunkhwa",
  country: "Pakistan",

  // Verified Business Contact Details & Placeholders
  whatsappNumber: "923000000000",
  phoneDisplay: "+92 300 0000000",
  phoneTel: "+923000000000",
  emailDisplay: "info@lithiumhousenowshera.pk",
  addressDisplay: "Main GT Road, Near Cantonment Board, Nowshera, Khyber Pakhtunkhwa, Pakistan",
  openingHoursDisplay: "Monday – Saturday: 9:00 AM – 7:00 PM (Friday Break: 12:30 PM – 2:30 PM)",
  googleMapsUrl: "https://maps.app.goo.gl/WUBxp4S3CZqdrkW3A",

  socialLinks: {
    facebook: "https://www.facebook.com/Lithium.House.Nowshera/",
  }
};

/**
 * Builds encoded WhatsApp URLs tailored to specific business contexts
 */
function buildWhatsAppUrl(type, detail) {
  const cleanNumber = String(LITHIUM_HOUSE_CONFIG.whatsappNumber || "").replace(/[^0-9]/g, "");
  let message = "";

  switch (type) {
    case "product":
      message = `Assalam-o-Alaikum ${LITHIUM_HOUSE_CONFIG.businessName}, I would like to inquire about the current availability, specifications, and quotation for: ${detail || "Solar Equipment"}.`;
      break;
    case "package":
      message = `Assalam-o-Alaikum ${LITHIUM_HOUSE_CONFIG.businessName}, I would like to request a customized quotation and load assessment for: ${detail || "Solar Package"} in Nowshera / KP.`;
      break;
    case "repair":
      message = `Assalam-o-Alaikum ${LITHIUM_HOUSE_CONFIG.businessName}, I am requesting an inspection and repair assessment for my solar equipment: ${detail || "Inverter / Battery Troubleshooting"}.`;
      break;
    case "custom":
      message = detail;
      break;
    case "general":
    default:
      message = `Assalam-o-Alaikum ${LITHIUM_HOUSE_CONFIG.businessName}, I visited your website and would like to speak with your solar specialists regarding solar solutions for my property in Nowshera.`;
      break;
  }

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Binds all declarative [data-wa-type] buttons and links
 */
function initWhatsAppLinks() {
  const waElements = document.querySelectorAll("[data-wa-type]");
  waElements.forEach((el) => {
    const type = el.getAttribute("data-wa-type") || "general";
    const detail = el.getAttribute("data-wa-detail") || "";
    const url = buildWhatsAppUrl(type, detail);

    if (el.tagName.toLowerCase() === "a") {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    } else {
      el.addEventListener("click", () => {
        window.open(url, "_blank", "noopener,noreferrer");
      });
    }
  });

  // Also bind floating WhatsApp button if present
  const floatBtn = document.querySelector(".floating-whatsapp-btn");
  if (floatBtn && !floatBtn.getAttribute("data-wa-type")) {
    floatBtn.setAttribute("href", buildWhatsAppUrl("general"));
    floatBtn.setAttribute("target", "_blank");
    floatBtn.setAttribute("rel", "noopener noreferrer");
  }
}

/**
 * Sticky Header & Mobile Navigation Toggle
 */
function initNavigation() {
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("is-open");
      toggleBtn.setAttribute("aria-expanded", String(!isOpen));
      navMenu.classList.toggle("is-open", !isOpen);
    });

    // Close on click of nav link
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        toggleBtn.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
      });
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
        toggleBtn.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
        toggleBtn.focus();
      }
    });
  }

  // Highlight active link based on current filename
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/**
 * Brands We Offer Slideshow
 * Supports auto-play, manual prev/next, pause on hover/focus, and prefers-reduced-motion
 */
function initBrandSlider() {
  const container = document.querySelector(".brand-carousel-wrapper");
  if (!container) return;

  const track = container.querySelector(".brand-track");
  const prevBtn = container.querySelector(".carousel-nav-btn.prev-btn");
  const nextBtn = container.querySelector(".carousel-nav-btn.next-btn");
  const slides = container.querySelectorAll(".brand-slide");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoPlayTimer = null;
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function getVisibleSlidesCount() {
    const width = window.innerWidth;
    if (width <= 390) return 1;
    if (width <= 768) return 2;
    if (width <= 1024) return 3;
    return 5;
  }

  function updateSlider() {
    const visibleCount = getVisibleSlidesCount();
    const maxIndex = Math.max(0, slides.length - visibleCount);
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;

    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 40; // 2.5rem gap
    const offset = currentIndex * (slideWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
  }

  function nextSlide() {
    const visibleCount = getVisibleSlidesCount();
    const maxIndex = Math.max(0, slides.length - visibleCount);
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  }

  function prevSlide() {
    const visibleCount = getVisibleSlidesCount();
    const maxIndex = Math.max(0, slides.length - visibleCount);
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateSlider();
  }

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  function startAutoPlay() {
    if (isReducedMotion) return;
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, 3500);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  container.addEventListener("mouseenter", stopAutoPlay);
  container.addEventListener("mouseleave", startAutoPlay);
  container.addEventListener("focusin", stopAutoPlay);
  container.addEventListener("focusout", startAutoPlay);

  window.addEventListener("resize", updateSlider);
  updateSlider();
  startAutoPlay();
}

/**
 * Recent Projects Slideshow
 * Featured slide layout, indicators, auto-play, pause on hover/focus, keyboard support
 */
function initProjectsSlider() {
  const container = document.querySelector(".projects-slider-container");
  if (!container) return;

  const slides = container.querySelectorAll(".project-slide");
  const dotsContainer = container.querySelector(".slider-indicators");
  const prevBtn = container.querySelector(".slider-btn.prev-slide");
  const nextBtn = container.querySelector(".slider-btn.next-slide");

  if (slides.length === 0) return;

  let activeIndex = 0;
  let autoTimer = null;
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Create dot indicators
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = `slider-dot ${idx === 0 ? "active" : ""}`;
      dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
      dot.addEventListener("click", () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(idx) {
    slides[activeIndex].classList.remove("active");
    const dots = dotsContainer ? dotsContainer.querySelectorAll(".slider-dot") : [];
    if (dots[activeIndex]) dots[activeIndex].classList.remove("active");

    activeIndex = (idx + slides.length) % slides.length;

    slides[activeIndex].classList.add("active");
    if (dots[activeIndex]) dots[activeIndex].classList.add("active");
  }

  function nextSlide() {
    goToSlide(activeIndex + 1);
  }

  function prevSlide() {
    goToSlide(activeIndex - 1);
  }

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  function startAuto() {
    if (isReducedMotion) return;
    stopAuto();
    autoTimer = setInterval(nextSlide, 5000);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  container.addEventListener("mouseenter", stopAuto);
  container.addEventListener("mouseleave", startAuto);
  container.addEventListener("focusin", stopAuto);
  container.addEventListener("focusout", startAuto);

  // Keyboard navigation
  container.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  startAuto();
}

/**
 * Customer Reviews Slideshow
 * Authentic review carousel, controls, and indicators
 */
function initReviewsSlider() {
  const container = document.querySelector(".reviews-carousel-wrapper");
  if (!container) return;

  const slides = container.querySelectorAll(".review-slide");
  const prevBtn = container.querySelector(".review-nav-btn.prev-btn");
  const nextBtn = container.querySelector(".review-nav-btn.next-btn");
  const indicatorsContainer = container.querySelector(".review-indicators");

  if (slides.length === 0) return;

  let activeIndex = 0;
  let autoTimer = null;
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = "";
    slides.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = `slider-dot ${idx === 0 ? "active" : ""}`;
      dot.setAttribute("aria-label", `View review ${idx + 1}`);
      dot.addEventListener("click", () => {
        goToReview(idx);
        resetAuto();
      });
      indicatorsContainer.appendChild(dot);
    });
  }

  function goToReview(idx) {
    slides[activeIndex].classList.remove("active");
    const dots = indicatorsContainer ? indicatorsContainer.querySelectorAll(".slider-dot") : [];
    if (dots[activeIndex]) {
      dots[activeIndex].classList.remove("active");
    }

    activeIndex = (idx + slides.length) % slides.length;

    slides[activeIndex].classList.add("active");
    if (dots[activeIndex]) {
      dots[activeIndex].classList.add("active");
    }
  }

  function nextReview() {
    goToReview(activeIndex + 1);
  }

  function prevReview() {
    goToReview(activeIndex - 1);
  }

  if (nextBtn) nextBtn.addEventListener("click", () => { nextReview(); resetAuto(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prevReview(); resetAuto(); });

  function startAuto() {
    if (isReducedMotion) return;
    stopAuto();
    autoTimer = setInterval(nextReview, 3000); // Exactly 3 second wait requested
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function resetAuto() {
    stopAuto();
    startAuto();
  }

  container.addEventListener("mouseenter", stopAuto);
  container.addEventListener("mouseleave", startAuto);
  container.addEventListener("focusin", stopAuto);
  container.addEventListener("focusout", startAuto);

  startAuto();
}

/**
 * Honest Contact Form Handler
 * Validates user input and seamlessly directs them to WhatsApp Business with prefilled details.
 */
function initContactForm() {
  const form = document.getElementById("contact-inquiry-form");
  if (!form) return;

  const statusBox = document.getElementById("form-status-box");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (form.querySelector('[name="name"]')?.value || "").trim();
    const contact = (form.querySelector('[name="contact"]')?.value || "").trim();
    const serviceType = (form.querySelector('[name="serviceType"]')?.value || "Solar Installation").trim();
    const message = (form.querySelector('[name="message"]')?.value || "").trim();

    if (!name || !contact) {
      if (statusBox) {
        statusBox.className = "form-status-box";
        statusBox.style.backgroundColor = "#FEE2E2";
        statusBox.style.color = "#991B1B";
        statusBox.textContent = "Please provide your name and phone number so we can respond to your inquiry.";
        statusBox.hidden = false;
      }
      return;
    }

    const composedText = [
      `Assalam-o-Alaikum ${LITHIUM_HOUSE_CONFIG.businessName},`,
      `I am sending an inquiry from your website:`,
      `• Name: ${name}`,
      `• Contact: ${contact}`,
      `• Interest: ${serviceType}`,
      `• Message / Requirement: ${message || "Please provide quotation and consultation details."}`
    ].join("\n");

    const waUrl = buildWhatsAppUrl("custom", composedText);

    if (statusBox) {
      statusBox.className = "form-status-box info";
      statusBox.style.backgroundColor = "#DCFCE7";
      statusBox.style.color = "#166534";
      statusBox.innerHTML = `
        <strong>Thank you, ${name}!</strong> Your inquiry is ready.
        <div style="margin-top:0.5rem;">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-brand btn-sm">
            Send Inquiry via WhatsApp
          </a>
        </div>
      `;
      statusBox.hidden = false;
    }

    // Open WhatsApp in a new tab
    window.open(waUrl, "_blank", "noopener,noreferrer");
  });
}

/**
 * Global Initializer
 */
function bootLithiumHouse() {
  initHeroTypingAnimation();
  initHeroSlideshow();
  initStatsCounter();
  initProjectsShowcaseSlider();
  initWhatsAppLinks();
  initNavigation();
  initProductNavStrip();
  initBrandSlider();
  initProjectsSlider();
  initReviewsSlider();
  initContactForm();
  initCardScrollAnimations();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootLithiumHouse);
} else {
  bootLithiumHouse();
}

/**
 * ============================================================================
 * Homepage Interactive Controllers (Lithium House Nowshera)
 * - Hero Typing Animation (Type, Pause, Erase, Next Phrase, Cursor Blink)
 * - Hero 16:9 Image Slideshow (Auto slide, smooth fade, indicators)
 * - Business Statistics Animated Counter (Triggers on viewport entry)
 * - Installation Projects Showcase Slideshow (5-6 slides, auto & manual, touch/keys)
 * ============================================================================
 */

function initHeroTypingAnimation() {
  const target = document.getElementById("hero-typing-target");
  if (!target) return;

  const phrases = [
    "Power Your Home with Solar Energy",
    "Reliable Solar Solutions for Every Need",
    "Make the Switch to Clean Energy",
    "Power Your Future with Lithium House"
  ];

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReducedMotion) {
    target.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let isDeleting = false;
  let typingTimer = null;

  const TYPE_SPEED = 60;      // Typing speed per char
  const DELETE_SPEED = 30;    // Erasing speed per char
  const HOLD_PAUSE = 2600;    // Pause after completing phrase
  const EMPTY_PAUSE = 400;    // Pause when fully erased before next phrase

  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      target.textContent = currentPhrase.substring(0, charIndex);

      if (charIndex <= 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingTimer = setTimeout(tick, EMPTY_PAUSE);
        return;
      }
      typingTimer = setTimeout(tick, DELETE_SPEED);
    } else {
      charIndex++;
      target.textContent = currentPhrase.substring(0, charIndex);

      if (charIndex >= currentPhrase.length) {
        isDeleting = true;
        typingTimer = setTimeout(tick, HOLD_PAUSE);
        return;
      }
      typingTimer = setTimeout(tick, TYPE_SPEED);
    }
  }

  target.textContent = phrases[0];
  isDeleting = true;
  charIndex = phrases[0].length;
  typingTimer = setTimeout(tick, HOLD_PAUSE);
}

function initHeroSlideshow() {
  const container = document.querySelector(".hero-slideshow-container");
  if (!container) return;

  const slides = container.querySelectorAll(".hero-slide");
  const dots = container.querySelectorAll(".hero-dot");
  if (slides.length <= 1) return;

  let activeIndex = 0;
  let autoTimer = null;
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showSlide(index) {
    slides[activeIndex].classList.remove("active");
    if (dots[activeIndex]) {
      dots[activeIndex].classList.remove("active");
      dots[activeIndex].setAttribute("aria-selected", "false");
    }

    activeIndex = (index + slides.length) % slides.length;

    slides[activeIndex].classList.add("active");
    if (dots[activeIndex]) {
      dots[activeIndex].classList.add("active");
      dots[activeIndex].setAttribute("aria-selected", "true");
    }
  }

  function nextSlide() {
    showSlide(activeIndex + 1);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      showSlide(idx);
      resetAuto();
    });
  });

  function startAuto() {
    if (isReducedMotion) return;
    stopAuto();
    autoTimer = setInterval(nextSlide, 6000);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function resetAuto() {
    stopAuto();
    startAuto();
  }

  container.addEventListener("mouseenter", stopAuto);
  container.addEventListener("mouseleave", startAuto);

  startAuto();
}

function initStatsCounter() {
  const counters = document.querySelectorAll(".stat-counter");
  if (counters.length === 0) return;

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function runCounter(el) {
    const target = parseInt(el.getAttribute("data-target") || "0", 10);
    const suffix = el.getAttribute("data-suffix") || "";

    if (isReducedMotion || target <= 0) {
      el.textContent = target + suffix;
      return;
    }

    let current = 0;
    const duration = 1600;
    const steps = 40;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(current) + suffix;
    }, stepTime);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach((c) => observer.observe(c));
  } else {
    counters.forEach((c) => runCounter(c));
  }
}

function initProjectsShowcaseSlider() {
  // Infinite marquee is handled smoothly via CSS keyframes with hover pause
}


/**
 * ============================================================================
 * Professional Scroll Reveal Animation Controller for Cards
 * Adds subtle, smooth scroll entry animations to product, package, trust & team cards
 * ============================================================================
 */
function initCardScrollAnimations() {
  const animatedSelectors = [
    ".product-card",
    ".package-card",
    ".trust-card",
    ".team-card",
    ".stat-highlight-item"
  ];
  
  const cards = document.querySelectorAll(animatedSelectors.join(", "));
  if (!cards.length) return;

  // Add base card-reveal class
  cards.forEach((card) => {
    card.classList.add("card-reveal-init");
  });

  if ("IntersectionObserver" in window) {
    const cardObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1
      }
    );

    cards.forEach((card) => cardObserver.observe(card));
  } else {
    // Fallback if IntersectionObserver is unsupported
    cards.forEach((card) => card.classList.add("card-revealed"));
  }
}

/**
 * ============================================================================
 * Product Catalogue Sticky Category Navigation Strip Controller
 * - Eliminates gap: Dynamically syncs --site-header-height with rendered header
 * - Auto-hides on scroll down, reveals immediately when scrolling back up
 * - Stays visible when at the top of the page (before passing into sticky mode)
 * - Smoothly navigates & maintains visibility when category jumps are clicked
 * - Highlights active category pill via IntersectionObserver scroll spy
 * ============================================================================
 */
function initProductNavStrip() {
  const strip = document.querySelector(".products-nav-strip");
  const header = document.querySelector(".site-header");
  if (!strip) return;

  // Dynamically calculate and sync exact site header height to eliminate any gap
  const syncHeaderHeight = () => {
    if (header) {
      const h = header.offsetHeight || header.getBoundingClientRect().height;
      if (h > 0) {
        document.documentElement.style.setProperty("--site-header-height", `${Math.round(h)}px`);
      }
    }
  };

  syncHeaderHeight();
  window.addEventListener("resize", syncHeaderHeight, { passive: true });

  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
  let ticking = false;
  let isClickScrolling = false;
  let clickTimeout = null;

  // Track initial offset position of strip relative to document
  const getStripInitialTop = () => {
    const rect = strip.getBoundingClientRect();
    return rect.top + (window.pageYOffset || document.documentElement.scrollTop);
  };
  let initialStripTop = getStripInitialTop();
  window.addEventListener("resize", () => {
    initialStripTop = getStripInitialTop();
  }, { passive: true });

  // Handle category link clicks
  const navBtns = strip.querySelectorAll(".products-nav-btn");
  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      navBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Keep strip visible during programmatic smooth scroll
      strip.classList.remove("is-hidden");
      isClickScrolling = true;
      if (clickTimeout) clearTimeout(clickTimeout);
      clickTimeout = setTimeout(() => {
        isClickScrolling = false;
        lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
      }, 750);
    });
  });

  // Scroll handler: hide on scroll down, show when scrolling back up
  const onScroll = () => {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = header ? (header.offsetHeight || 59) : 59;
    const scrollDiff = currentScrollY - lastScrollY;

    if (isClickScrolling) {
      strip.classList.remove("is-hidden");
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    // When near top (above sticky engagement point), keep strip in place
    if (currentScrollY <= initialStripTop - headerHeight + 5) {
      strip.classList.remove("is-hidden");
    } else {
      // User is scrolling DOWN -> hide the category jump strip
      if (scrollDiff > 6) {
        strip.classList.add("is-hidden");
      }
      // User is scrolling UP ("going back") -> show the category jump strip
      else if (scrollDiff < -6) {
        strip.classList.remove("is-hidden");
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // IntersectionObserver scroll spy to keep the active category button updated
  const sections = [
    document.getElementById("batteries"),
    document.getElementById("inverters"),
    document.getElementById("panels")
  ].filter(Boolean);

  if (sections.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navBtns.forEach((btn) => {
              const href = btn.getAttribute("href");
              if (href === `#${id}`) {
                btn.classList.add("active");
              } else {
                btn.classList.remove("active");
              }
            });
          }
        });
      },
      {
        rootMargin: "-25% 0px -50% 0px",
        threshold: 0.05
      }
    );

    sections.forEach((sec) => observer.observe(sec));
  }
}
