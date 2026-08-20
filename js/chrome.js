(function () {
  const depth = document.body.dataset.root || "";
  const a = (p) => depth + p;
  const img = (f) => a("assets/shared/" + f);

  const CONTACT = {
    phones: ["+91 9940217718", "+91 87546 05666", "+91 88700 33414"],
    emails: ["ceo@neoheights.com", "monalisa@neoheights.com", "marketing@neoheights.com"],
    primaryEmail: "monalisa@neoheights.com",
    corporate:
      "Achuth Square, First floor 1018/1, 24th Main Rd, 3th Cross Rd, 1st Sector, HSR Layout, Bengaluru, Karnataka 560102",
    headOffice:
      "Plot No. CP5A, Vajra Tower, Second floor, SIPCOT II National Highway, Opp to Adiyaman College, Hosur 635109",
    social: {
      linkedin: "https://www.linkedin.com/company/neo-heights",
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      youtube: "https://www.youtube.com/",
    },
  };

  const MEGA_PROJECTS = [
    { title: "Schaeffler India Limited.", loc: "SHOOLAGIRI", href: "projects/schaeffler.html" },
    { title: "FAIVELEY - CS Building", loc: "HOSUR", href: "projects/faiveley.html" },
    { title: "Toyato Design Build canteen", loc: "BIDADI, KA", href: "projects/toyota.html" },
    { title: "SHIMZU - SAKATA", loc: "HOSUR", href: "projects/shimzu.html" },
    { title: "SAKATA - WAREHOUSE", loc: "BENGALURU", href: "projects/shimzu.html" },
    { title: "TATA Electronic", loc: "HOSUR", href: "projects/tata-rwh.html" },
  ];

  const MEGA_SERVICES = [
    { title: "Civil Construction", href: "services/civil.html" },
    { title: "PEB Structures", href: "services/peb.html" },
    { title: "Interior Fit-outs", href: "services/interiors.html" },
    { title: "MEP Works", href: "services/mep.html" },
    { title: "Land Development", href: "services/land.html" },
    { title: "General Contractor", href: "services/gc.html" },
    { title: "EPC Contractor", href: "services/epc.html" },
  ];

  const EXPLORE = {
    title: "SAKATA INDIA PVT LTD",
    loc: "DODDABALLAPURA",
    href: "projects/shimzu.html",
    image: "explore-sakata.png",
  };

  function skipLink() {
    return `<a class="skip-link" href="#main">Skip to content</a>`;
  }

  function megaProjectsPanel() {
    const cards = MEGA_PROJECTS.map(
      (p) => `
      <a class="mega-project-item" href="${a(p.href)}">
        <span class="mega-project-title">${p.title}</span>
        <span class="mega-project-loc">${p.loc}</span>
      </a>`
    ).join("");
    return `
<div class="mega-panel mega-panel-projects" id="mega-projects" hidden>
  <div class="mega-grid">
    <div class="mega-col">
      <p class="mega-label">Projects</p>
      <div class="mega-projects-list">${cards}</div>
    </div>
    <div class="mega-col mega-col-explore">
      <p class="mega-label">Explore</p>
      <a class="mega-explore-card" href="${a(EXPLORE.href)}">
        <img src="${img(EXPLORE.image)}" alt="${EXPLORE.title}" />
        <div class="mega-explore-overlay">
          <span class="mega-explore-title">${EXPLORE.title}</span>
          <span class="mega-explore-loc">${EXPLORE.loc}</span>
        </div>
      </a>
    </div>
  </div>
  <div class="mega-bottom">
    <div class="mega-bottom-copy">
      <span class="mega-cta-icon" aria-hidden="true">→</span>
      <p>Ready to kick off a project? <strong>Let's get in touch!</strong></p>
    </div>
    <a class="btn-primary mega-cta" href="${a("contact.html")}">
      <span class="btn-label">Start Your Project</span>
      <img src="${img("arrow-btn.svg")}" alt="" width="24" height="24" />
    </a>
  </div>
</div>`;
  }

  function megaServicesPanel() {
    const cards = MEGA_SERVICES.map(
      (s) => `
      <a class="mega-project-item" href="${a(s.href)}">
        <span class="mega-project-title">${s.title}</span>
      </a>`
    ).join("");
    return `
<div class="mega-panel mega-panel-services" id="mega-services" hidden>
  <div class="mega-grid mega-grid-services">
    <div class="mega-col">
      <p class="mega-label">Services</p>
      <div class="mega-projects-list mega-services-list">${cards}</div>
    </div>
  </div>
  <div class="mega-bottom">
    <div class="mega-bottom-copy">
      <span class="mega-cta-icon" aria-hidden="true">→</span>
      <p>Need a delivery partner? <strong>Talk to our team.</strong></p>
    </div>
    <a class="btn-primary mega-cta" href="${a("contact.html")}">
      <span class="btn-label">Start Your Project</span>
      <img src="${img("arrow-btn.svg")}" alt="" width="24" height="24" />
    </a>
  </div>
</div>`;
  }

  window.NH = {
    CONTACT,
    MEGA_PROJECTS,
    MEGA_SERVICES,
    header(active) {
      const isActive = (href) =>
        active === href ||
        (href === "projects.html" && String(active).startsWith("projects")) ||
        (href === "services.html" && String(active).startsWith("services")) ||
        (href === "about.html#team" && active === "about.html");

      const link = (href, label) => {
        const on = isActive(href) ? ' aria-current="page"' : "";
        return `<a class="nav-item" href="${a(href)}"${on}>${label}</a>`;
      };

      const megaTrigger = (id, href, label) => {
        const on = isActive(href) ? ' aria-current="page"' : "";
        return `
<button type="button" class="nav-item nav-mega-trigger" data-mega="${id}" aria-expanded="false" aria-haspopup="true" aria-controls="mega-${id}"${on}>
  <span>${label}</span>
  <svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>
<a class="nav-item nav-mega-fallback" href="${a(href)}"${on}>${label}</a>`;
      };

      return `
${skipLink()}
<header class="header">
  <a class="header-logo" href="${a("index.html")}"><img class="logo" src="${img("logo.png")}" alt="Neo Heights" width="133" height="100" /></a>
  <nav class="nav font-nav" id="primary-nav" aria-label="Primary">
    ${link("index.html", "Home")}
    ${link("about.html", "About us")}
    ${megaTrigger("projects", "projects.html", "Projects")}
    ${megaTrigger("services", "services.html", "Services")}
    ${link("sustainability.html", "Sustainability")}
    ${link("blogs.html", "Newsroom")}
    ${link("about.html#team", "Team")}
    ${link("contact.html", "Contact")}
  </nav>
  <div class="header-actions">
    <div class="theme-switch" role="group" aria-label="Color theme">
      <button type="button" class="theme-toggle" data-theme-set="dark" aria-label="Dark mode" aria-pressed="true">
        <img src="${img("moon.svg")}" alt="" width="20" height="20" />
      </button>
      <button type="button" class="theme-toggle" data-theme-set="light" aria-label="Light mode" aria-pressed="false">
        <img src="${img("sun.svg")}" alt="" width="20" height="20" />
      </button>
    </div>
    <button type="button" class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="primary-nav">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="mega-backdrop" hidden></div>
  ${megaProjectsPanel()}
  ${megaServicesPanel()}
</header>`;
    },
    footer() {
      const phones = CONTACT.phones.map((p) => `<span>${p}</span>`).join("");
      return `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <p class="footer-top-title">Have a project in mind?</p>
        <p class="footer-top-sub">Let's build it together.</p>
      </div>
      <a class="btn-primary" href="${a("contact.html")}"><span class="btn-label">Contact Us</span></a>
    </div>
    <div class="footer-grid">
      <div class="footer-brand">
        <img class="logo" src="${img("logo.png")}" alt="Neo Heights" width="133" height="100" />
        <p class="footer-arul">Part of Arul Group</p>
        <p class="footer-about">Neo Heights, backed by the Arul Group, delivers civil, PEB, interior, and MEP construction solutions with a focus on quality, safety, and long-term value.</p>
      </div>
      <div>
        <h4 class="footer-col-title">Quick Links</h4>
        <ul class="footer-links">
          <li><a href="${a("about.html")}">About Us</a></li>
          <li><a href="${a("services.html")}">Services</a></li>
          <li><a href="${a("projects.html")}">Projects</a></li>
          <li><a href="${a("sustainability.html")}">Sustainability</a></li>
          <li><a href="${a("about.html")}#legacy">Legacy</a></li>
          <li><a href="${a("contact.html")}">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer-col-title">Services</h4>
        <ul class="footer-links">
          <li><a href="${a("services/civil.html")}">Civil Construction</a></li>
          <li><a href="${a("services/peb.html")}">PEB Structures</a></li>
          <li><a href="${a("services/interiors.html")}">Interior Fit-outs</a></li>
          <li><a href="${a("services/mep.html")}">MEP Works</a></li>
          <li><a href="${a("services/land.html")}">Land Development</a></li>
          <li><a href="${a("services/gc.html")}">General Contractor</a></li>
          <li><a href="${a("services/epc.html")}">EPC Contractor</a></li>
          <li><a href="${a("sustainability.html")}">Sustainable Construction</a></li>
        </ul>
      </div>
      <div>
        <h4 class="footer-col-title">Contact</h4>
        <div class="footer-contact">
          <div class="footer-contact-row">
            <img src="${img("icon-phone.svg")}" alt="" width="20" height="20" />
            <div class="footer-phones">${phones}</div>
          </div>
          <div class="footer-contact-row">
            <img src="${img("icon-email.svg")}" alt="" width="20" height="20" />
            <span>${CONTACT.emails.join(", ")}</span>
          </div>
          <div class="footer-contact-row footer-address">
            <img src="${img("icon-location.svg")}" alt="" width="20" height="20" />
            <div><strong>Corporate Office :</strong><br />${CONTACT.corporate.replace(/, /g, ",<br />")}</div>
          </div>
        </div>
      </div>
      <div class="footer-social">
        <a href="${CONTACT.social.linkedin}" target="_blank" rel="noopener noreferrer"><img src="${img("social-1.svg")}" alt="LinkedIn" width="46" height="35" /></a>
        <a href="${CONTACT.social.facebook}" target="_blank" rel="noopener noreferrer"><img src="${img("social-2.svg")}" alt="Facebook" width="46" height="35" /></a>
        <a href="${CONTACT.social.instagram}" target="_blank" rel="noopener noreferrer"><img src="${img("social-3.svg")}" alt="Instagram" width="46" height="35" /></a>
        <a href="${CONTACT.social.youtube}" target="_blank" rel="noopener noreferrer"><img src="${img("social-4.svg")}" alt="YouTube" width="46" height="35" /></a>
      </div>
    </div>
    <div class="footer-headoffice">
      <img src="${img("icon-location.svg")}" alt="" width="20" height="20" />
      <div><strong>Head office :</strong><br />${CONTACT.headOffice.replace(/, /g, ",<br />")}</div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2025 Neo Heights. All rights reserved.</p>
    <p><a href="${a("terms.html")}">Terms &amp; Conditions</a> | <a href="${a("privacy.html")}">Privacy policy</a></p>
    <p>A part of the <span class="arul-link">Arul Group</span>.</p>
  </div>
</footer>`;
    },
    bindHeader() {
      const header = document.querySelector(".header");
      if (!header || header.dataset.bound === "1") return;
      header.dataset.bound = "1";

      const backdrop = header.querySelector(".mega-backdrop");
      const triggers = [...header.querySelectorAll(".nav-mega-trigger")];
      const panels = {
        projects: header.querySelector("#mega-projects"),
        services: header.querySelector("#mega-services"),
      };
      const nav = header.querySelector("#primary-nav");
      const navToggle = header.querySelector(".nav-toggle");

      const closeMega = () => {
        triggers.forEach((t) => t.setAttribute("aria-expanded", "false"));
        Object.values(panels).forEach((p) => {
          if (p) p.hidden = true;
        });
        if (backdrop) backdrop.hidden = true;
        document.body.classList.remove("mega-open");
      };

      const openMega = (id) => {
        closeMega();
        const panel = panels[id];
        const trigger = triggers.find((t) => t.dataset.mega === id);
        if (!panel || !trigger) return;
        panel.hidden = false;
        trigger.setAttribute("aria-expanded", "true");
        if (backdrop) backdrop.hidden = false;
        document.body.classList.add("mega-open");
      };

      triggers.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const id = btn.dataset.mega;
          const open = btn.getAttribute("aria-expanded") === "true";
          if (open) closeMega();
          else openMega(id);
        });
      });

      if (backdrop) backdrop.addEventListener("click", closeMega);
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeMega();
          document.body.classList.remove("nav-open");
          if (navToggle) navToggle.setAttribute("aria-expanded", "false");
        }
      });

      if (navToggle && nav) {
        navToggle.addEventListener("click", () => {
          const open = document.body.classList.toggle("nav-open");
          navToggle.setAttribute("aria-expanded", open ? "true" : "false");
          navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
          closeMega();
        });
      }

      // Theme
      const applyTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
        try {
          localStorage.setItem("nh-theme", theme);
        } catch (_) {}
        header.querySelectorAll("[data-theme-set]").forEach((btn) => {
          const on = btn.dataset.themeSet === theme;
          btn.classList.toggle("active", on);
          btn.setAttribute("aria-pressed", on ? "true" : "false");
        });
      };
      let saved = "dark";
      try {
        saved = localStorage.getItem("nh-theme") || "dark";
      } catch (_) {}
      applyTheme(saved);
      header.querySelectorAll("[data-theme-set]").forEach((btn) => {
        btn.addEventListener("click", () => applyTheme(btn.dataset.themeSet));
      });

      // Sticky/fixed header compact state on scroll
      const onScroll = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      // Reduced motion: pause autoplay videos
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        document.querySelectorAll("video[autoplay]").forEach((v) => {
          v.removeAttribute("autoplay");
          v.pause();
        });
      }
    },
    mount(active) {
      const path = (active || location.pathname || "").replace(/^.*\//, "");
      let key = active || path;
      if (location.pathname.includes("/projects/")) key = "projects.html";
      if (location.pathname.includes("/services/")) key = "services.html";
      const h = document.querySelector("[data-nh-header]");
      const f = document.querySelector("[data-nh-footer]");
      if (h) h.outerHTML = this.header(key);
      if (f) f.outerHTML = this.footer();
      if (!document.getElementById("main")) {
        const page = document.querySelector(".page");
        if (page) {
          const main = document.createElement("main");
          main.id = "main";
          const headerEl = page.querySelector(".header");
          const footerEl = page.querySelector(".footer");
          const nodes = [...page.childNodes];
          nodes.forEach((n) => {
            if (n === headerEl || n === footerEl || (n.nodeType === 1 && n.classList && n.classList.contains("skip-link"))) return;
            if (n.nodeType === 1 && n.hasAttribute && n.hasAttribute("data-nh-header")) return;
            if (n.nodeType === 1 && n.hasAttribute && n.hasAttribute("data-nh-footer")) return;
            // leave structure; only set id on first section sibling approach differently
          });
          // Simpler: mark first section after header
          const firstSection = page.querySelector("section, .hero, .home-hero");
          if (firstSection && !document.getElementById("main")) {
            firstSection.id = firstSection.id || "main";
            if (firstSection.id !== "main") {
              // add tabindex target via skip using #main on a wrapper — inject empty anchor
            }
          }
        }
      }
      // Ensure skip target
      if (!document.getElementById("main")) {
        const target = document.querySelector(".page > section, .page .home-hero, .page .hero, .page .ct-hero, .page .terms-hero");
        if (target) target.id = "main";
      }
      this.bindHeader();
    },
  };
})();
