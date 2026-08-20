(function () {
  function enhanceForms() {
    document.querySelectorAll("form").forEach((form) => {
      if (form.dataset.nhForm === "1") return;
      form.dataset.nhForm = "1";

      // Accessible required fields
      form.querySelectorAll('input[type="text"], input[name="name"]').forEach((el) => {
        el.required = true;
        if (!el.getAttribute("aria-label") && el.placeholder) el.setAttribute("aria-label", el.placeholder);
      });
      form.querySelectorAll('input[type="email"]').forEach((el) => {
        el.required = true;
        if (!el.getAttribute("aria-label") && el.placeholder) el.setAttribute("aria-label", el.placeholder);
      });
      form.querySelectorAll('input[type="tel"]').forEach((el) => {
        if (!el.getAttribute("aria-label") && el.placeholder) el.setAttribute("aria-label", el.placeholder);
      });
      form.querySelectorAll("textarea").forEach((el) => {
        el.required = true;
        if (!el.getAttribute("aria-label") && el.placeholder) el.setAttribute("aria-label", el.placeholder);
      });

      // Netlify Forms attributes when hosted on Netlify
      if (!form.getAttribute("name")) form.setAttribute("name", "contact");
      form.setAttribute("method", "POST");
      form.setAttribute("data-netlify", "true");
      form.setAttribute("netlify-honeypot", "bot-field");
      if (!form.querySelector('input[name="form-name"]')) {
        const hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = "form-name";
        hidden.value = form.getAttribute("name") || "contact";
        form.prepend(hidden);
      }
      if (!form.querySelector('input[name="bot-field"]')) {
        const hp = document.createElement("p");
        hp.className = "nh-hp";
        hp.setAttribute("hidden", "");
        hp.innerHTML = '<label>Don’t fill this out: <input name="bot-field" /></label>';
        form.prepend(hp);
      }

      // Local success fallback when action is # or empty
      const action = (form.getAttribute("action") || "").trim();
      if (!action || action === "#") {
        form.addEventListener("submit", (e) => {
          // Allow real Netlify POST on production hosts
          const host = location.hostname;
          const isLocal = host === "localhost" || host === "127.0.0.1" || host.endsWith(".local") || location.protocol === "file:";
          if (isLocal) {
            e.preventDefault();
            if (!form.checkValidity()) {
              form.reportValidity();
              return;
            }
            let msg = form.querySelector(".nh-form-success");
            if (!msg) {
              msg = document.createElement("p");
              msg.className = "nh-form-success";
              msg.setAttribute("role", "status");
              form.appendChild(msg);
            }
            msg.textContent = "Thanks — your enquiry has been captured locally. Connect Netlify Forms (or your endpoint) for live delivery.";
            form.reset();
          }
        });
      }
    });
  }

  function projectFilters() {
    const wrap = document.querySelector("[data-project-filters]");
    if (!wrap) return;
    const buttons = [...wrap.querySelectorAll("[data-filter]")];
    const cards = [...document.querySelectorAll(".project-grid .card")];
    cards.forEach((card) => {
      if (!card.dataset.category) {
        const t = (card.textContent || "").toLowerCase();
        const cats = ["completed"];
        if (/peb|volvo|advik|lm wind/.test(t)) cats.push("peb", "civil-peb");
        if (/mep|schaeffler|toyota/.test(t)) cats.push("mep", "civil-peb");
        if (/epc|tata|ge healthcare|foxconn/.test(t)) cats.push("epc");
        if (/civil|vajra|magnum|wendt|rwh/.test(t)) cats.push("civil", "civil-peb");
        if (/ongoing|on-going/.test(t)) cats.push("ongoing");
        card.dataset.category = cats.join(" ");
      }
    });
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        cards.forEach((card) => {
          const show = f === "all" || (card.dataset.category || "").split(/\s+/).includes(f);
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  function verticalsClose() {
    document.querySelectorAll(".home-verticals-close").forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".home-verticals");
        if (card) card.hidden = true;
      });
    });
  }

  function prioritizeHeroImages() {
    const heroImg = document.querySelector(
      ".home-hero img, .pd-hero > img.cover, .sd-hero-media > img.cover, .ab-hero img, .svc-hero img, .hero img"
    );
    if (heroImg && !heroImg.hasAttribute("fetchpriority")) {
      heroImg.setAttribute("fetchpriority", "high");
    }
    const video = document.getElementById("home-hero-video");
    if (video && !video.hasAttribute("fetchpriority")) {
      video.setAttribute("fetchpriority", "high");
    }
  }

  function processJourney() {
    const stage = document.querySelector("[data-process]");
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      stage.classList.add("is-on");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stage.classList.add("is-on");
            io.disconnect();
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(stage);
  }

  function passthroughVerticalScroll(selector) {
    const mq = window.matchMedia("(max-width: 768px)");
    document.querySelectorAll(selector).forEach((el) => {
      const onWheel = (e) => {
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
        if (el.scrollWidth <= el.clientWidth + 1) return;
        e.preventDefault();
        window.scrollBy(0, e.deltaY);
      };
      const sync = () => {
        el.removeEventListener("wheel", onWheel);
        if (!mq.matches) return;
        el.addEventListener("wheel", onWheel, { passive: false });
      };
      sync();
      if (typeof mq.addEventListener === "function") mq.addEventListener("change", sync);
      else mq.addListener(sync);
    });
  }

  function homeStatsCarousel() {
    const block = document.querySelector(".home-stats-block");
    const track = block && block.querySelector(".home-stats");
    const prev = block && block.querySelector('[data-stats-dir="-1"]');
    const next = block && block.querySelector('[data-stats-dir="1"]');
    if (!block || !track || !prev || !next) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function step() {
      const card = track.querySelector(".home-stat-card");
      if (!card) return 320;
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap) || 16;
      return Math.round(card.getBoundingClientRect().width + gap);
    }

    function maxScroll() {
      return Math.max(0, track.scrollWidth - track.clientWidth);
    }

    function overflowing() {
      return maxScroll() > 4;
    }

    function sync() {
      const can = overflowing();
      block.classList.toggle("is-scrollable", can);
      const left = track.scrollLeft;
      prev.disabled = !can || left <= 2;
      next.disabled = !can || left >= maxScroll() - 2;
    }

    function go(dir) {
      if (!overflowing()) return;
      track.scrollBy({
        left: dir * step(),
        behavior: reduce ? "auto" : "smooth"
      });
    }

    function onKey(e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    }

    prev.addEventListener("click", () => go(-1));
    next.addEventListener("click", () => go(1));
    prev.addEventListener("keydown", onKey);
    next.addEventListener("keydown", onKey);
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(sync).observe(track);
    }
    sync();
  }

  function isPhotoBlock(el) {
    if (
      el.matches(
        ".home-svc-card, .home-member, .ab-member, .ab-iso, .card, .svc-card, .pd-hero, .sd-hero-media"
      )
    ) {
      return true;
    }
    return !!el.querySelector(
      "img.cover, .home-member-photo img, .ab-member-photo img, .home-svc-card img, .svc-card img"
    );
  }

  function scrollReveals() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = [...document.querySelectorAll("[data-reveal], .reveal")];
    // Auto-mark copy blocks only — photo cards stay visible (no opacity-0 snap)
    const auto = document.querySelectorAll(
      ".home-about-intro, .home-stats .home-stat-card, .home-services-head, .home-projects-head, .home-team-head, .home-contact-left, .home-brand-copy, .home-faq-item, .ab-hero-left, .ab-hero-right, .ab-story-copy, .ab-stat, .ab-method-card, .ab-hsc-point, .ab-legacy-content"
    );
    auto.forEach((el) => {
      if (isPhotoBlock(el)) return;
      if (!el.hasAttribute("data-reveal")) el.setAttribute("data-reveal", "");
    });
    const all = [...new Set([...nodes, ...auto])].filter((el) => !isPhotoBlock(el));
    nodes.filter(isPhotoBlock).forEach((el) => {
      el.classList.add("is-in");
      el.removeAttribute("data-reveal");
      el.classList.remove("reveal");
    });
    if (!all.length) return;
    if (reduce) {
      all.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    all.forEach((el, i) => {
      el.style.setProperty("--reveal-delay", `${Math.min(i % 6, 5) * 60}ms`);
      io.observe(el);
    });
  }

  function homeHeroAudio() {
    const video = document.getElementById("home-hero-video");
    const btn = document.getElementById("home-hero-volume");
    if (!video || !btn) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.pause();
      btn.hidden = true;
      return;
    }

    const syncUi = () => {
      const muted = !!video.muted;
      btn.classList.toggle("is-muted", muted);
      btn.setAttribute("aria-pressed", muted ? "true" : "false");
      btn.setAttribute("aria-label", muted ? "Unmute video sound" : "Mute video sound");
    };

    const tryPlay = async (withSound) => {
      video.muted = !withSound;
      try {
        await video.play();
        return true;
      } catch (_) {
        return false;
      }
    };

    // Prefer sound; fall back to muted autoplay if the browser blocks it.
    (async () => {
      const withSound = await tryPlay(true);
      if (!withSound) await tryPlay(false);
      syncUi();
    })();

    btn.addEventListener("click", async () => {
      if (video.muted) {
        video.muted = false;
        try {
          await video.play();
        } catch (_) {
          /* ignore */
        }
      } else {
        video.muted = true;
      }
      syncUi();
    });

    video.addEventListener("volumechange", syncUi);
    syncUi();
  }

  document.addEventListener("DOMContentLoaded", () => {
    enhanceForms();
    projectFilters();
    verticalsClose();
    prioritizeHeroImages();
    processJourney();
    scrollReveals();
    passthroughVerticalScroll(".home-stats");
    homeStatsCarousel();
    homeHeroAudio();
  });
})();
