const reveals = document.querySelectorAll(".reveal");
const navbar = document.querySelector(".navbar");
const navCollapse = document.querySelector(".navbar-collapse");
const navLinks = document.querySelectorAll(".nav-link");
const heroSection = document.querySelector(".hero-section");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

reveals.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 360)}ms`;
  revealObserver.observe(item);
});

const syncNavbarState = () => {
  if (window.scrollY > 24) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};

const syncHeroProgress = () => {
  if (!heroSection) {
    return;
  }

  const introRange = heroSection.offsetHeight * 0.85;
  const progress = Math.max(0, Math.min(window.scrollY / introRange, 1));
  document.documentElement.style.setProperty("--hero-progress", progress.toFixed(3));
};

const handleScroll = () => {
  syncNavbarState();
  syncHeroProgress();
};

handleScroll();
window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", syncHeroProgress);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 992 && navCollapse.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    }
  });
});
