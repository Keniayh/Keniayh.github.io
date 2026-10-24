// =========================================================
// SECCIONES — diseño y animaciones al hacer scroll.
// Solo agrega clases y elementos decorativos: no cambia tu
// contenido ni las traducciones de script.js.
// Va DESPUÉS de js/script.js y js/hero.js.
// =========================================================
(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  const sections = [...document.querySelectorAll("section.band")];
  if (!sections.length) return;

  // ---------- barra de progreso ----------
  const bar = document.createElement("div");
  bar.className = "fx-progress";
  document.body.appendChild(bar);

  // ---------- preparar cada sección ----------
  const ghosts = [];
  const masks = [];
  const items = [];

  sections.forEach((sec, i) => {
    sec.classList.add("fx-sec");
    const wrap = sec.querySelector(".wrap");
    const eyebrow = wrap && wrap.querySelector(".eyebrow");
    const h2 = wrap && wrap.querySelector("h2");

    if (eyebrow) {
      const num = document.createElement("span");
      num.className = "fx-num";
      num.textContent = String(i + 1).padStart(2, "0");
      eyebrow.prepend(num);

      const label = eyebrow.querySelector("[data-i18n]");
      const ghost = document.createElement("div");
      ghost.className = "fx-ghost";
      ghost.setAttribute("aria-hidden", "true");
      sec.prepend(ghost);
      ghosts.push({ sec, ghost, label, dir: i % 2 ? 1 : -1 });
    }

    if (h2) {
      const mask = document.createElement("div");
      mask.className = "fx-mask";
      h2.parentNode.insertBefore(mask, h2);
      mask.appendChild(h2);
      masks.push(mask);
    }
  });

  function paintGhosts() {
    ghosts.forEach((g) => {
      const t = g.label ? g.label.textContent.trim() : "";
      const gap = "\u2003\u2003";
      g.ghost.textContent = `${t}${gap}${t}${gap}${t}`;
    });
  }
  paintGhosts();
  new MutationObserver(paintGhosts).observe(root, { attributes: true, attributeFilter: ["lang"] });

  // ---------- foto con marco ----------
  const photo = document.querySelector("#sobre-mi .about-photo");
  if (photo && !photo.parentElement.classList.contains("fx-photo")) {
    const frame = document.createElement("div");
    frame.className = "fx-photo";
    photo.parentNode.insertBefore(frame, photo);
    frame.appendChild(photo);
  }

  // ---------- elementos que aparecen en cascada ----------
  const groups = [
    "#sobre-mi .fx-photo",
    "#sobre-mi .section-sub",
    ".stat",
    ".profile-card",
    ".soft-skills",
    ".service-card-new",
    ".entry",
    ".empty",
    ".project",
    ".quiz-card",
    ".fx-sec .section-sub",
    ".contact-row > *",
  ];
  const seen = new Set();
  groups.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (seen.has(el) || el.closest(".scene")) return;
      seen.add(el);
      const siblings = [...el.parentElement.children].filter((c) => c.matches(sel));
      el.style.setProperty("--d", `${Math.min(siblings.indexOf(el), 6) * 0.09}s`);
      el.classList.add("fx-item");
      items.push(el);
    });
  });

  // ---------- tarjetas con brillo + inclinación ----------
  const cards = document.querySelectorAll(".stat, .profile-card, .service-card-new, .project, .quiz-card, .entry-body");
  cards.forEach((card) => {
    card.classList.add("fx-spot");
    const tilt = card.matches(".profile-card, .service-card-new, .project");
    if (tilt) card.classList.add("fx-tilt");
    if (!finePointer.matches) return;
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      if (tilt && !reduce.matches) {
        card.style.setProperty("--rx", `${(0.5 - y) * 4}deg`);
        card.style.setProperty("--ry", `${(x - 0.5) * 5}deg`);
      }
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });

  // ---------- miniaturas de proyectos con los dibujos del monitor ----------
  const artFor = {
    "projects.spacex.name": 1,
    "projects.kario.name": 2,
    "projects.environment.name": 3,
    "projects.prestservice.name": 4,
  };
  document.querySelectorAll(".project").forEach((p) => {
    const name = p.querySelector(".project-name");
    const thumb = p.querySelector(".project-thumb");
    const ch = name && artFor[name.getAttribute("data-i18n")];
    const art = ch && document.querySelector(`.sc-ch[data-ch="${ch}"] .sc-art`);
    if (!thumb || !art || thumb.querySelector("img")) return;
    thumb.classList.add("fx-art");
    thumb.appendChild(art.cloneNode(true));
  });

  // ---------- cinta de tecnologías ----------
  const stack = document.getElementById("stack");
  let tickerRows = [];
  if (stack) {
    const words = ["GeneXus", "SQL Server", "React", "Node.js", "Java", "Spring Boot", "Laravel", "PHP", "MySQL", "JavaScript", "Python", "APIs"];
    const row = (list) => {
      const half = list.map((w) => `<span>${w}</span><span>/</span>`).join("");
      return `<div class="fx-ticker-row"><div class="fx-ticker-track">${half}${half}${half}</div></div>`;
    };
    const ticker = document.createElement("div");
    ticker.className = "fx-ticker";
    ticker.setAttribute("aria-hidden", "true");
    ticker.innerHTML = row(words);
    stack.parentNode.insertBefore(ticker, stack);
    tickerRows = [...ticker.querySelectorAll(".fx-ticker-track")];
  }

  // ---------- líneas de tiempo ----------
  const timelines = [];
  document.querySelectorAll(".fx-sec .wrap").forEach((wrap) => {
    const entries = [...wrap.children].filter((c) => c.classList.contains("entry"));
    if (entries.length < 2) return;
    wrap.classList.add("fx-tl");
    const line = document.createElement("div");
    line.className = "fx-tl-line";
    line.innerHTML = "<span></span>";
    wrap.appendChild(line);
    timelines.push({ wrap, entries, line });
  });

  function layoutTimelines() {
    timelines.forEach((t) => {
      const first = t.entries[0];
      const last = t.entries[t.entries.length - 1];
      t.dot = parseFloat(getComputedStyle(first, "::before").top) + 7 || 39;
      const top = first.offsetTop + t.dot;
      const bottom = last.offsetTop + t.dot;
      t.wrap.style.setProperty("--tl-top", `${top}px`);
      t.wrap.style.setProperty("--tl-h", `${Math.max(0, bottom - top)}px`);
    });
  }

  // ---------- activar revelados ----------
  root.classList.add("fx-ready");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("fx-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );
  [...masks, ...items].forEach((el) => io.observe(el));

  // ---------- todo lo que depende del scroll ----------
  function update() {
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;

    if (!reduce.matches) {
      ghosts.forEach((g) => {
        const r = g.sec.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const p = (vh - r.top) / (vh + r.height);
        g.ghost.style.transform = `translate3d(${(g.dir < 0 ? -8 - p * 40 : -48 + p * 40)}vw, 0, 0)`;
      });

      tickerRows.forEach((track, i) => {
        const third = track.scrollWidth / 3;
        const shift = (window.scrollY * 0.3) % third;
        track.style.transform = `translate3d(${i ? shift - third : -shift}px, 0, 0)`;
      });
    }

    timelines.forEach((t) => {
      const r = t.line.getBoundingClientRect();
      const p = clamp((vh * 0.62 - r.top) / Math.max(1, r.height), 0, 1);
      t.wrap.style.setProperty("--tl-p", p.toFixed(4));
      t.entries.forEach((en) => {
        en.classList.toggle("fx-on", en.getBoundingClientRect().top + (t.dot || 39) < vh * 0.62);
      });
    });
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  }, { passive: true });

  window.addEventListener("resize", () => {
    layoutTimelines();
    update();
  });
  window.addEventListener("load", () => {
    layoutTimelines();
    update();
  });

  layoutTimelines();
  update();

  // ---------- menú en pantallas pequeñas ----------
  const menuBtn = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-links");
  if (menuBtn && menu) {
    const setOpen = (open) => {
      menu.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    };
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(!menu.classList.contains("is-open"));
    });
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false);
        menuBtn.focus();
      }
    });
  }

  // ---------- luz rosada que sigue al mouse por las secciones ----------
  if (finePointer.matches && !reduce.matches) {
    const glow = document.createElement("div");
    glow.className = "fx-light";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);
    const scene = document.getElementById("inicio");
    let gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy, moving = false;
    const step = () => {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      moving = Math.abs(tx - gx) + Math.abs(ty - gy) > 0.5;
      if (moving) requestAnimationFrame(step);
    };
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
      const overScene = scene && scene.getBoundingClientRect().bottom > e.clientY;
      root.classList.toggle("fx-light-on", !overScene);
      if (!moving) { moving = true; requestAnimationFrame(step); }
    }, { passive: true });
    document.addEventListener("mouseleave", () => root.classList.remove("fx-light-on"));
  }

  const strongMotion = !reduce.matches;

  // ---------- tu foto: inclinación 3D con brillo ----------
  const photoFrame = document.querySelector(".fx-photo");
  if (photoFrame) {
    const sheen = document.createElement("span");
    sheen.className = "fx-sheen";
    sheen.setAttribute("aria-hidden", "true");
    photoFrame.appendChild(sheen);
    if (finePointer.matches && strongMotion) {
      photoFrame.addEventListener("pointermove", (e) => {
        const r = photoFrame.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        photoFrame.classList.add("is-tilting");
        photoFrame.style.setProperty("--prx", `${(0.5 - y) * 14}deg`);
        photoFrame.style.setProperty("--pry", `${(x - 0.5) * 16}deg`);
        photoFrame.style.setProperty("--sx", `${120 - x * 140}%`);
      });
      photoFrame.addEventListener("pointerleave", () => {
        photoFrame.classList.remove("is-tilting");
        photoFrame.style.setProperty("--prx", "0deg");
        photoFrame.style.setProperty("--pry", "0deg");
      });
    }
  }

  // ---------- botones magnéticos ----------
  if (finePointer.matches && strongMotion) {
    document.querySelectorAll(".btn-grad, .hero-actions .btn, .contact-row .btn, .icon-btn").forEach((btn) => {
      btn.classList.add("fx-magnet");
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.classList.add("is-pulled");
        btn.style.translate = `${dx * 0.25}px ${dy * 0.35}px`;
      });
      btn.addEventListener("pointerleave", () => {
        btn.classList.remove("is-pulled");
        btn.style.translate = "0 0";
      });
    });
  }
})();
