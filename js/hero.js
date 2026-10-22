// =========================================================
// INICIO — monitor con canales, zoom al hacer scroll,
// cursor personalizado y textura de grano.
// Va DESPUÉS de js/script.js (usa el idioma que ese archivo aplica).
// =========================================================
(() => {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  // ---------- textos ES / EN de la escena ----------
  const T = {
    es: {
      hint: "Desliza para entrar",
      led: [
        "HOLA, SOY KENIA ✦ GIRA LA PERILLA PARA VER MIS PROYECTOS",
        "APLICACIÓN SPACEX ▸ JAVASCRIPT + API",
        "PLATAFORMA KARIO MEDIA ▸ HTML + CSS",
        "MIN AMBIENTE BD ▸ MODELADO DE DATOS",
        "PRESTSERVICE ▸ SPRING BOOT + JWT",
      ],
      titles: [null, "Aplicación SpaceX", "Plataforma Kario Media", "Min Ambiente BD", "PrestService"],
      descs: [
        null,
        "Réplica de SpaceX que consume una API: cohetes, misiones, historia y cápsulas.",
        "Frontend responsivo de una plataforma web de consulta.",
        "Base de datos para gestionar los parques naturales de cada departamento.",
        "Spring Boot + Spring Security con JWT para servicios y usuarios.",
      ],
      code: { focus: "enfoque", focusVal: "desarrollo de software", learning: "aprendiendo", location: "ubicacion", tip: "// gira la perilla ↻" },
      cursor: { next: "siguiente", prev: "anterior", turn: "gira ↻", open: "abrir ↗", go: "go ›" },
      aria: { screenIntro: "Pantalla: siguiente canal", screenOpen: "Pantalla: abrir repositorio de ", dial: "Perilla: cambiar canal", prev: "Canal anterior", next: "Canal siguiente", go: "Abrir repositorio" },
      termNext: "cd ./sobre-mi",
    },
    en: {
      hint: "Scroll to enter",
      led: [
        "HI, I'M KENIA ✦ TURN THE KNOB TO SEE MY PROJECTS",
        "SPACEX APP ▸ JAVASCRIPT + API",
        "KARIO MEDIA PLATFORM ▸ HTML + CSS",
        "MIN AMBIENTE DB ▸ DATA MODELING",
        "PRESTSERVICE ▸ SPRING BOOT + JWT",
      ],
      titles: [null, "SpaceX App", "Kario Media Platform", "Min Ambiente DB", "PrestService"],
      descs: [
        null,
        "SpaceX replica consuming an API: rockets, missions, history and capsules.",
        "Responsive frontend for a web information platform.",
        "Database to manage the natural parks of each department.",
        "Spring Boot + Spring Security with JWT for services and users.",
      ],
      code: { focus: "focus", focusVal: "software development", learning: "learning", location: "location", tip: "// turn the knob ↻" },
      cursor: { next: "next", prev: "back", turn: "turn ↻", open: "open ↗", go: "go ›" },
      aria: { screenIntro: "Screen: next channel", screenOpen: "Screen: open repository of ", dial: "Knob: change channel", prev: "Previous channel", next: "Next channel", go: "Open repository" },
      termNext: "cd ./about-me",
    },
  };

  const projects = [
    null,
    { url: "https://github.com/Keniayh/PROYECTO-FILTRO_JS_HernandezKenia-LatorreDaniel", tags: ["JavaScript", "API"] },
    { url: "https://github.com/juandariver9/PROYECTO-FILTRO_RiveroJuan_HernandezKenia", tags: ["HTML", "CSS"] },
    { url: "https://github.com/Keniayh/Proyecto_BBDD_HernandezKenia-CeballosKenneth", tags: ["MySQL", "SQL"] },
    { url: "https://github.com/Ospina115/Examen-SpringBoot-Final", tags: ["Java", "Spring Boot", "JWT"] },
  ];

  const lang = () => (root.lang === "en" ? "en" : "es");

  // ---------- cursor + grano (en todo el sitio) ----------
  const grain = document.createElement("div");
  grain.className = "sc-grain";
  document.body.appendChild(grain);

  let cursorLabelKey = null;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  let curLabelEl = null;

  if (finePointer.matches) {
    const ring = document.createElement("div");
    ring.className = "cur-ring";
    ring.innerHTML = '<span class="cur-label"></span>';
    const dot = document.createElement("div");
    dot.className = "cur-dot";
    document.body.append(ring, dot);
    curLabelEl = ring.firstChild;
    root.classList.add("has-cursor");

    let mx = -100, my = -100, rx = -100, ry = -100;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      root.classList.add("cur-visible");
    }, { passive: true });

    document.addEventListener("mouseleave", () => root.classList.remove("cur-visible"));
    window.addEventListener("mousedown", () => root.classList.add("cur-down"));
    window.addEventListener("mouseup", () => root.classList.remove("cur-down"));

    document.addEventListener("mouseover", (e) => {
      const el = e.target.closest("a, button, [data-cursor], .quiz-opt");
      root.classList.toggle("cur-hover", !!el);
      cursorLabelKey = el && el.dataset.cursor ? el.dataset.cursor : null;
      paintCursorLabel();
    });

    (function follow() {
      const k = reduce.matches ? 1 : 0.2;
      rx += (mx - rx) * k;
      ry += (my - ry) * k;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(follow);
    })();
  }

  function paintCursorLabel() {
    if (!curLabelEl) return;
    const txt = cursorLabelKey ? T[lang()].cursor[cursorLabelKey] : "";
    curLabelEl.textContent = txt || "";
    root.classList.toggle("cur-has-label", !!txt);
  }

  // ---------- escena ----------
  const scene = document.getElementById("inicio");
  if (!scene) return;

  const sticky = scene.querySelector(".sc-sticky");
  const layers = {
    back: scene.querySelector(".sc-back"),
    mid: scene.querySelector(".sc-mid"),
    front: scene.querySelector(".sc-front"),
  };
  const screen = document.getElementById("sc-screen");
  const chans = [...scene.querySelectorAll(".sc-ch")];
  const dial = document.getElementById("sc-dial");
  const prevBtn = document.getElementById("sc-prev");
  const nextBtn = document.getElementById("sc-next");
  const goBtn = document.getElementById("sc-go");
  const led = document.getElementById("sc-led");
  const osd = document.getElementById("sc-osd");
  const code = document.getElementById("sc-code");
  const copy = document.getElementById("sc-copy");
  const hint = document.getElementById("sc-hint");
  const hintText = document.getElementById("sc-hint-text");
  const term = document.getElementById("sc-term");
  const termInner = term.querySelector(".sc-term-inner");
  const termCmd = document.getElementById("sc-term-cmd");
  const termNext = document.getElementById("sc-term-next");
  const canvas = document.getElementById("sc-static");
  const ctx = canvas.getContext("2d");

  const CH_COUNT = 5;
  const ANGLES = [-60, -30, 0, 30, 60];
  let ch = 0;

  // encendido del monitor
  if (!reduce.matches) {
    scene.classList.add("sc-booting");
    window.addEventListener("load", () => setTimeout(() => scene.classList.remove("sc-booting"), 350));
    setTimeout(() => scene.classList.remove("sc-booting"), 2500); // por si "load" tarda
  }

  function renderTexts() {
    const t = T[lang()];
    hintText.textContent = t.hint;
    termNext.textContent = t.termNext;
    code.innerHTML =
      `<span class="k">const</span> <span class="v">kenia</span> = {\n` +
      `  <span class="k">stack</span>: [<span class="s">'GeneXus'</span>, <span class="s">'SQL'</span>,\n` +
      `          <span class="s">'React'</span>, <span class="s">'Node.js'</span>],\n` +
      `  <span class="k">${t.code.focus}</span>: <span class="s">'${t.code.focusVal}'</span>,\n` +
      `  <span class="k">${t.code.learning}</span>: [<span class="s">'MongoDB'</span>, <span class="s">'Supabase'</span>],\n` +
      `  <span class="k">${t.code.location}</span>: <span class="s">'CO'</span>,\n` +
      `};\n<span class="c">${t.code.tip}</span> <span class="sc-blink"></span>`;
    chans.forEach((el, i) => {
      if (!i) return;
      el.querySelector(".sc-title").textContent = t.titles[i];
      el.querySelector(".sc-desc").textContent = t.descs[i];
      el.querySelector(".sc-tags").textContent = projects[i].tags.join(" · ");
    });
    dial.setAttribute("aria-label", t.aria.dial);
    prevBtn.setAttribute("aria-label", t.aria.prev);
    nextBtn.setAttribute("aria-label", t.aria.next);
    goBtn.setAttribute("aria-label", t.aria.go);
    renderChannelUi();
    paintCursorLabel();
  }

  function renderChannelUi() {
    const t = T[lang()];
    const msg = `CH0${ch} ▸ ${t.led[ch]}`;
    led.innerHTML = `<span>${msg}</span><span aria-hidden="true">${msg}</span>`;
    osd.textContent = `CH 0${ch}`;
    screen.dataset.cursor = ch === 0 ? "next" : "open";
    screen.setAttribute("aria-label", ch === 0 ? t.aria.screenIntro : t.aria.screenOpen + t.titles[ch]);
    if (screen.matches(":hover")) { cursorLabelKey = screen.dataset.cursor; paintCursorLabel(); }
  }

  function drawStatic() {
    const img = ctx.createImageData(canvas.width, canvas.height);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() * 255;
      d[i] = v;
      d[i + 1] = v * 0.82;
      d[i + 2] = v;
      d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }

  function playStatic(ms) {
    if (reduce.matches) return;
    canvas.classList.add("on");
    const start = performance.now();
    (function loop(now) {
      drawStatic();
      if (now - start < ms) requestAnimationFrame(loop);
      else canvas.classList.remove("on");
    })(start);
  }

  function setDial(angle) {
    dial.style.transform = `rotate(${angle}deg)`;
  }

  function setChannel(n) {
    n = ((n % CH_COUNT) + CH_COUNT) % CH_COUNT;
    setDial(ANGLES[n]);
    if (n === ch) return;
    playStatic(260);
    chans[ch].classList.remove("is-on");
    chans[n].classList.add("is-on");
    ch = n;
    renderChannelUi();
  }

  function openCurrent() {
    if (ch === 0) return setChannel(1);
    window.open(projects[ch].url, "_blank", "noopener");
  }

  prevBtn.addEventListener("click", () => setChannel(ch - 1));
  nextBtn.addEventListener("click", () => setChannel(ch + 1));
  goBtn.addEventListener("click", openCurrent);
  screen.addEventListener("click", openCurrent);
  screen.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCurrent(); }
  });

  // perilla: clic = siguiente canal, arrastrar = girar, flechas del teclado
  let drag = null;
  dial.addEventListener("pointerdown", (e) => {
    const r = dial.getBoundingClientRect();
    drag = { cx: r.left + r.width / 2, cy: r.top + r.height / 2, moved: 0, angle: ANGLES[ch] };
    dial.setPointerCapture(e.pointerId);
    dial.classList.add("dragging");
  });
  dial.addEventListener("pointermove", (e) => {
    if (!drag) return;
    let a = (Math.atan2(e.clientX - drag.cx, drag.cy - e.clientY) * 180) / Math.PI;
    a = Math.max(-75, Math.min(75, a));
    drag.moved = Math.max(drag.moved, Math.abs(a - ANGLES[ch]));
    drag.angle = a;
    if (drag.moved > 6) setDial(a);
  });
  const endDrag = () => {
    if (!drag) return;
    dial.classList.remove("dragging");
    if (drag.moved > 6) {
      let best = 0;
      ANGLES.forEach((v, i) => { if (Math.abs(v - drag.angle) < Math.abs(ANGLES[best] - drag.angle)) best = i; });
      setChannel(best);
      setDial(ANGLES[best]);
    } else {
      setChannel(ch + 1);
    }
    drag = null;
  };
  dial.addEventListener("pointerup", endDrag);
  dial.addEventListener("pointercancel", endDrag);
  dial.addEventListener("click", (e) => { if (e.detail === 0) setChannel(ch + 1); }); // Enter / Espacio
  dial.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); setChannel(ch + 1); }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); setChannel(ch - 1); }
  });

  // ---------- zoom con el scroll ----------
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const seg = (p, a, b) => clamp((p - a) / (b - a), 0, 1);
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

  let ox = 0, oy = 0, S = 6, lastP = -1, typed = false;

  function measure() {
    Object.values(layers).forEach((l) => (l.style.transform = "none"));
    const s = screen.getBoundingClientRect();
    const st = sticky.getBoundingClientRect();
    ox = s.left + s.width / 2 - st.left;
    oy = s.top + s.height / 2 - st.top;
    S = Math.max(st.width / s.width, st.height / s.height) * 1.12;
    Object.values(layers).forEach((l) => (l.style.transformOrigin = `${ox}px ${oy}px`));
    lastP = -1;
    update();
  }

  function zoom(layer, e, factor, w, h) {
    const s = 1 + (S * factor - 1) * e;
    const tx = (w / 2 - ox) * e;
    const ty = (h / 2 - oy) * e;
    layer.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${s})`;
  }

  function typeCommand() {
    typed = true;
    const cmd = "whoami";
    if (reduce.matches) {
      termCmd.textContent = cmd;
      term.classList.add("typed");
      return;
    }
    let i = 0;
    (function step() {
      termCmd.textContent = cmd.slice(0, ++i);
      if (i < cmd.length) setTimeout(step, 85);
      else setTimeout(() => term.classList.add("typed"), 250);
    })();
  }

  function update() {
    const r = scene.getBoundingClientRect();
    const w = sticky.clientWidth;
    const h = sticky.clientHeight;
    const total = r.height - h;
    const p = total > 0 ? clamp(-r.top / total, 0, 1) : 0;
    if (p === lastP) return;
    lastP = p;

    const c = seg(p, 0.02, 0.16);
    copy.style.opacity = 1 - c;
    copy.style.transform = `translateY(${-50 * c}px)`;
    copy.style.visibility = c >= 1 ? "hidden" : "visible";
    hint.style.opacity = 1 - seg(p, 0, 0.05);

    if (reduce.matches) {
      // sin zoom: solo fundidos
      const f = seg(p, 0.12, 0.32);
      Object.values(layers).forEach((l) => (l.style.opacity = 1 - f));
      term.style.opacity = f;
    } else {
      const e = ease(seg(p, 0.06, 0.56));
      zoom(layers.back, e, 0.4, w, h);
      zoom(layers.mid, e, 1, w, h);
      zoom(layers.front, e, 1.8, w, h);
      layers.front.style.opacity = 1 - seg(p, 0.1, 0.34);
      layers.back.style.opacity = 1 - seg(p, 0.4, 0.55);
      term.style.opacity = seg(p, 0.5, 0.6);
    }

    const tOn = parseFloat(term.style.opacity) > 0.02;
    term.style.visibility = tOn ? "visible" : "hidden";
    layers.mid.style.pointerEvents = p > 0.2 ? "none" : "";
    termInner.style.transform = reduce.matches ? "none" : `translateY(${(0.5 - seg(p, 0.6, 1)) * 60}px)`;

    if (!typed && parseFloat(term.style.opacity) > 0.7) typeCommand();
  }

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; update(); });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => requestAnimationFrame(measure));
  reduce.addEventListener("change", measure);

  // al cambiar ES/EN (script.js cambia el atributo lang del <html>)
  new MutationObserver(renderTexts).observe(root, { attributes: true, attributeFilter: ["lang"] });

  renderTexts();
  setDial(ANGLES[0]);
  measure();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
})();
