const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");
const saved = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const initial = saved || (prefersLight ? "light" : "dark");
if (initial === "light") root.setAttribute("data-theme", "light");

themeBtn.addEventListener("click", () => {
  const isLight = root.getAttribute("data-theme") === "light";
  if (isLight) {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
  } else {
    root.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
  updateGhStats();
});

function updateGhStats() {
  const isLight = root.getAttribute("data-theme") === "light";
  const theme = isLight ? "default" : "radical";
  const img = document.getElementById("gh-stats");
  if (img)
    img.src = `https://github-readme-stats.vercel.app/api?username=Keniayh&show_icons=true&hide_border=true&theme=${theme}&bg_color=00000000`;
}
updateGhStats();

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// resaltar el link activo del menú según la sección visible
const navLinks = document.querySelectorAll(".nav-links a");
const navSections = [...navLinks].map((a) =>
  document.querySelector(a.getAttribute("href")),
);
const navIo = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = "#" + entry.target.id;
        navLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === id),
        );
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px" },
);
navSections.forEach((s) => s && navIo.observe(s));

// ---------- idioma ES/EN ----------
const i18n = {
  es: {
    "nav.about": "Sobre mí",
    "nav.profile": "Perfil",
    "nav.stack": "Tecnologías",
    "nav.exp": "Experiencia",
    "nav.services": "Aportes",
    "nav.projects": "Proyectos",
    "nav.quiz": "Reto",
    "nav.contact": "Contacto",
    "nav.cv": "CV ↓",
    "hero.kicker": "Hola, soy ✦",
    "hero.role":
      "Desarrolladora de software · desarrolladora GeneXus · programadora junior",
    "hero.bio":
      "Me gusta descubrir cómo funcionan las cosas y encontrar la manera de hacerlas mejor. Disfruto trabajar con datos, crear soluciones y darle estructura a las ideas hasta convertirlas en algo que realmente funcione. Estoy construyendo mi camino en el desarrollo de software, aprendiendo constantemente y buscando que cada proyecto me enseñe algo nuevo.",
    "hero.cta1": "Ver mis proyectos →",
    "hero.cta2": "Contáctame",
    "about.eyebrow": "Sobre mí",
    "about.title": "Mi perfil",
    "about.bio":
      "Soy desarrolladora de software con interés en la creación y mantenimiento de soluciones informáticas. Me gusta trabajar de forma organizada, entender los requerimientos de cada proyecto y buscar soluciones prácticas y eficientes. Mi formación y experiencia me han permitido desarrollar una perspectiva integral del proceso de desarrollo y continuar fortaleciendo mis habilidades técnicas.",
    "about.stat1.k": "Formación",
    "about.stat1.v": "Tecnología en Desarrollo de Sistemas Informáticos · UTS",
    "about.stat2.k": "Experiencia",
    "about.stat2.v": "Desarrollo de software · GeneXus · SQL",
    "about.stat3.k": "Intereses",
    "about.stat3.v": "Desarrollo web · Bases de datos · Datos",
    "stack.eyebrow": "Tecnologías",
    "stack.title": "Tecnologías y herramientas",
    "stack.sub":
      "Lenguajes, frameworks y herramientas que utilizo y estoy aprendiendo.",
    "stack.soft.title": "Habilidades blandas",
    "stack.soft.team": "Trabajo en equipo",
    "stack.soft.communication": "Comunicación",
    "stack.soft.problem": "Resolución de problemas",
    "stack.soft.adaptability": "Adaptabilidad",
    "profile.eyebrow": "Perfil profesional",
    "profile.title": "Misión y visión",
    "profile.mission.title": "Misión",
    "profile.mission.text":
      "Desarrollar soluciones tecnológicas que aporten a la optimización de procesos, combinando una comprensión clara de los requerimientos con una implementación organizada y orientada a resultados.",
    "profile.vision.title": "Visión",
    "profile.vision.text":
      "Seguir fortaleciendo mis conocimientos en desarrollo de software y participar en proyectos donde pueda asumir nuevos retos técnicos, ampliar mi experiencia y aportar a la construcción de soluciones empresariales.",
    "services.eyebrow": "Aportes",
    "services.title": "Áreas en las que puedo aportar",
    "services.sub":
      "Áreas relacionadas con mi experiencia y formación en desarrollo de software.",
    "services.web.title": "Desarrollo web",
    "services.web.text":
      "Creación y mantenimiento de interfaces web utilizando HTML, CSS y JavaScript, con atención a la estructura, responsividad y experiencia de uso.",
    "services.integration.title": "Integración de servicios",
    "services.integration.text":
      "Integración y consumo de APIs y Web Services como parte del desarrollo y mantenimiento de soluciones empresariales.",
    "services.support.title": "Soporte y mantenimiento",
    "services.support.text":
      "Resolución de incidencias, soporte técnico y mejoras sobre funcionalidades existentes.",
    "services.database.title": "Bases de datos",
    "services.database.text":
      "Trabajo con bases de datos como parte del desarrollo de aplicaciones y de la gestión de información.",
    "exp.eyebrow": "Experiencia",
    "exp.title": "Lo que he construido hasta ahora",
    "exp.e1.when": "Actualidad",
    "exp.e1.role": "Desarrolladora GeneXus",
    "exp.e1.org": "Desarrollo de soluciones empresariales · ERP farmacéutico",
    "exp.e1.desc":
      "Trabajo en el desarrollo y mantenimiento de soluciones para el área de dispensación de medicamentos, participando en la integración y consumo de APIs y Web Services con diferentes entidades. He trabajado especialmente en procesos de integración con servicios como Compensar, además de realizar mantenimiento, resolución de incidencias, soporte técnico y mejoras sobre funcionalidades existentes.",
    "exp.e2.when": "Formación",
    "exp.e2.role": "Programación de Software",
    "exp.e2.desc":
      "Formación práctica en desarrollo de software, con énfasis en Python, HTML, CSS, JavaScript, Java y MySQL, complementada con metodologías ágiles, trabajo colaborativo y desarrollo de habilidades profesionales.",
    "edu.eyebrow": "Educación",
    "edu.title": "Formación académica",
    "edu.e1.present": "presente",
    "edu.e1.role": "Tecnología en Desarrollo de Sistemas Informáticos",
    "edu.e1.desc":
      "Formación orientada al desarrollo de software, programación, bases de datos, análisis y diseño de sistemas informáticos, como preparación para continuar la formación profesional en Ingeniería de Sistemas.",
    "edu.e2.role": "Técnico Laboral en Programación de Software",
    "edu.e2.desc":
      "Formación práctica en programación y desarrollo de software, con fundamentos en Python, Java, JavaScript, HTML, CSS y bases de datos, además de metodologías de trabajo y desarrollo de habilidades profesionales.",
    "edu.e3.role": "Bachiller Académico",
    "edu.e3.desc":
      "Formación académica con énfasis en inglés como lengua extranjera y formación técnica en Operación Turística Local.",
    "certs.eyebrow": "Certificaciones",
    "certs.title": "Diplomas",
    "certs.empty":
      "Aún no hay certificaciones cargadas — cuéntame cuáles quieres mostrar y las agrego aquí.",
    "projects.eyebrow": "Proyectos",
    "projects.title": "Algunos proyectos",
    "projects.view": "Ver repositorio ↗",
    "projects.spacex.name": "Aplicación SpaceX",
    "projects.spacex.desc":
      "Réplica de la página de SpaceX con consumo de una API y cuatro módulos para consultar información sobre cohetes, misiones, historia de la empresa y cápsulas espaciales.",
    "projects.kario.name": "Plataforma Kario Media",
    "projects.kario.desc":
      "Desarrollo del FrontEnd de una plataforma web de consulta utilizando HTML y CSS, con una interfaz responsiva para diferentes dispositivos.",
    "projects.environment.name": "Min Ambiente BD",
    "projects.environment.desc":
      "Diseño y desarrollo de una base de datos para gestionar información relacionada con parques naturales administrados por cada departamento.",
    "projects.prestservice.name": "PrestService",
    "projects.prestservice.desc":
      "Proyecto en Java con Spring Boot y Spring Security, incluyendo JWT para gestionar los servicios ofrecidos por la empresa y la seguridad de los usuarios.",
    "quiz.eyebrow": "Mini-reto",
    "quiz.title": "¿Qué imprime este código?",
    "quiz.sub":
      "Un reto rápido de lógica, uno por pregunta, una sola respuesta correcta.",
    "contact.eyebrow": "Contacto",
    "contact.title": "¿Hablamos?",
    "contact.sub":
      "Abierta a nuevas oportunidades, colaboraciones o simplemente a charlar sobre tecnología.",
    "contact.cta": "Enviarme un mensaje",
    "footer.text": "© 2026 Kenia Hernández · Bucaramanga, Colombia",
  },
  en: {
    "nav.about": "About",
    "nav.profile": "Profile",
    "nav.stack": "Stack",
    "nav.exp": "Experience",
    "nav.services": "What I offer",
    "nav.projects": "Projects",
    "nav.quiz": "Challenge",
    "nav.contact": "Contact",
    "nav.cv": "CV↓",
    "hero.kicker": "Hi, I'm ✦",
    "hero.role": "Software developer · GeneXus developer · junior programmer",
    "hero.bio":
      "I like figuring out how things work and finding ways to make them better. I enjoy working with data, building solutions, and giving structure to ideas until they actually work. I'm building my path in software development, constantly learning and looking for every project to teach me something new.",
    "hero.cta1": "See my projects →",
    "hero.cta2": "Get in touch",
    "about.eyebrow": "About me",
    "about.title": "My profile",
    "about.bio":
      "I'm a software developer interested in building and maintaining software solutions. I like working in an organized way, understanding each project's requirements, and finding practical, efficient solutions. My education and experience have given me a well-rounded view of the development process, and I keep strengthening my technical skills.",
    "about.stat1.k": "Education",
    "about.stat1.v": "Technology in Information Systems Development · UTS",
    "about.stat2.k": "Experience",
    "about.stat2.v": "Software development · GeneXus · SQL",
    "about.stat3.k": "Interests",
    "about.stat3.v": "Web development · Databases · Data",
    "stack.eyebrow": "Technologies",
    "stack.title": "Technologies & tools",
    "stack.sub": "Languages, frameworks and tools I use and I'm learning.",
    "stack.soft.title": "Soft skills",
    "stack.soft.team": "Teamwork",
    "stack.soft.communication": "Communication",
    "stack.soft.problem": "Problem solving",
    "stack.soft.adaptability": "Adaptability",
    "profile.eyebrow": "Professional profile",
    "profile.title": "Mission & vision",
    "profile.mission.title": "Mission",
    "profile.mission.text":
      "Develop technology solutions that help optimize processes, combining a clear understanding of requirements with organized, results-oriented implementation.",
    "profile.vision.title": "Vision",
    "profile.vision.text":
      "Keep strengthening my software development knowledge and take part in projects where I can take on new technical challenges, grow my experience, and contribute to building enterprise solutions.",
    "services.eyebrow": "What I offer",
    "services.title": "Areas where I can contribute",
    "services.sub":
      "Areas related to my experience and background in software development.",
    "services.web.title": "Web development",
    "services.web.text":
      "Building and maintaining web interfaces with HTML, CSS and JavaScript, with attention to structure, responsiveness and user experience.",
    "services.integration.title": "Service integration",
    "services.integration.text":
      "Integrating and consuming APIs and Web Services as part of developing and maintaining enterprise solutions.",
    "services.support.title": "Support & maintenance",
    "services.support.text":
      "Incident resolution, technical support and improvements to existing features.",
    "services.database.title": "Databases",
    "services.database.text":
      "Working with databases as part of application development and information management.",
    "exp.eyebrow": "Experience",
    "exp.title": "What I've built so far",
    "exp.e1.when": "Present",
    "exp.e1.role": "GeneXus Developer",
    "exp.e1.org": "Enterprise solutions development · pharmaceutical ERP",
    "exp.e1.desc":
      "I work on developing and maintaining solutions for the medication dispensing area, taking part in the integration and consumption of APIs and Web Services with different entities. I've worked especially on integration processes with services like Compensar, along with maintenance, incident resolution, technical support, and improvements to existing features.",
    "exp.e2.when": "Training",
    "exp.e2.role": "Software Programming",
    "exp.e2.desc":
      "Hands-on training in software development, focused on Python, HTML, CSS, JavaScript, Java and MySQL, complemented with agile methodologies, teamwork and professional skills development.",
    "edu.eyebrow": "Education",
    "edu.title": "Academic background",
    "edu.e1.present": "present",
    "edu.e1.role": "Technology in Information Systems Development",
    "edu.e1.desc":
      "Training focused on software development, programming, databases, and systems analysis and design, as preparation to continue professional studies in Systems Engineering.",
    "edu.e2.role": "Vocational Technician in Software Programming",
    "edu.e2.desc":
      "Hands-on training in programming and software development, with fundamentals in Python, Java, JavaScript, HTML, CSS and databases, plus work methodologies and professional skills development.",
    "edu.e3.role": "Academic High School Diploma",
    "edu.e3.desc":
      "Academic training with an emphasis on English as a foreign language and technical training in Local Tourism Operations.",
    "certs.eyebrow": "Certifications",
    "certs.title": "Diplomas",
    "certs.empty":
      "No certifications added yet — let me know which ones you'd like to show and I'll add them here.",
    "projects.eyebrow": "Projects",
    "projects.title": "Some projects",
    "projects.view": "View repository ↗",
    "projects.spacex.name": "SpaceX App",
    "projects.spacex.desc":
      "Replica of the SpaceX website consuming an API, with four modules to look up information about rockets, missions, company history and space capsules.",
    "projects.kario.name": "Kario Media Platform",
    "projects.kario.desc":
      "Front-end development for a web platform using HTML and CSS, with a responsive interface across devices.",
    "projects.environment.name": "Environment Ministry DB",
    "projects.environment.desc":
      "Design and development of a database to manage information about natural parks administered by each department.",
    "projects.prestservice.name": "PrestService",
    "projects.prestservice.desc":
      "Java project with Spring Boot and Spring Security, including JWT, to manage the company's services and user security.",
    "quiz.eyebrow": "Mini challenge",
    "quiz.title": "What does this code print?",
    "quiz.sub":
      "A quick logic challenge, one question at a time, a single correct answer.",
    "contact.eyebrow": "Contact",
    "contact.title": "Let's talk?",
    "contact.sub":
      "Open to new opportunities, collaborations, or just chatting about tech.",
    "contact.cta": "Send me a message",
    "footer.text": "© 2026 Kenia Hernández · Bucaramanga, Colombia",
  },
};

let currentLang = localStorage.getItem("lang") || "es";

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang][key] !== undefined) el.textContent = i18n[lang][key];
  });
  langBtn.textContent = lang === "es" ? "EN" : "ES";
  localStorage.setItem("lang", lang);
  renderQuiz();
}

const langBtn = document.getElementById("lang-toggle");
langBtn.addEventListener("click", () =>
  applyLang(currentLang === "es" ? "en" : "es"),
);

const quizStrings = {
  es: {
    progress: (i, n) => `Reto ${i} de ${n}`,
    score: (s) => `Aciertos: ${s}`,
    correct: "Correcto! ",
    wrong: "No exactamente — ",
    next: "Siguiente reto →",
    result: "Ver resultado →",
    done: "Reto completado",
    finished: (s, n) => `Terminaste con ${s} de ${n} aciertos.`,
    retry: "Reintentar",
  },
  en: {
    progress: (i, n) => `Challenge ${i} of ${n}`,
    score: (s) => `Correct: ${s}`,
    correct: "Correct! ",
    wrong: "Not quite — ",
    next: "Next challenge →",
    result: "See result →",
    done: "Challenge complete",
    finished: (s, n) => `You finished with ${s} out of ${n} correct.`,
    retry: "Try again",
  },
};
const quizExplain = {
  es: [
    "NaN es, por extraño que parezca, de tipo 'number' en JavaScript.",
    "** es potenciación en Python: 2³ = 8.",
    "El arreglo tiene tres elementos, así que .length es 3.",
    "WHERE filtra antes de agrupar; HAVING filtra después del GROUP BY.",
  ],
  en: [
    "NaN is, oddly enough, of type 'number' in JavaScript.",
    "** is exponentiation in Python: 2³ = 8.",
    "The array has three elements, so .length is 3.",
    "WHERE filters before grouping; HAVING filters after GROUP BY.",
  ],
};
const quiz = [
  {
    code: "console.log(typeof NaN);",
    options: ["'number'", "'NaN'", "'undefined'", "'object'"],
    correct: 0,
    explain: "NaN es, por extraño que parezca, de tipo 'number' en JavaScript.",
  },
  {
    code: "print(2 ** 3)",
    options: ["6", "8", "9", "23"],
    correct: 1,
    explain: "** es potenciación en Python: 2³ = 8.",
  },
  {
    code: "console.log([1, 2, 3].length);",
    options: ["2", "3", "4", "undefined"],
    correct: 1,
    explain: "El arreglo tiene tres elementos, así que .length es 3.",
  },
  {
    code: "SELECT ... GROUP BY ... ???",
    options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"],
    correct: 1,
    explain:
      "WHERE filtra antes de agrupar; HAVING filtra después del GROUP BY.",
  },
];
let qIndex = 0,
  score = 0,
  answered = false;
const qCount = document.getElementById("quiz-count");
const qScore = document.getElementById("quiz-score");
const qCode = document.getElementById("quiz-code");
const qOptions = document.getElementById("quiz-options");
const qFeedback = document.getElementById("quiz-feedback");
const qNext = document.getElementById("quiz-next");

function renderQuiz() {
  answered = false;
  const q = quiz[qIndex];
  const s = quizStrings[currentLang];
  qCount.textContent = s.progress(qIndex + 1, quiz.length);
  qScore.textContent = s.score(score);
  qCode.textContent = q.code;
  qFeedback.textContent = "";
  qFeedback.classList.remove("show");
  qNext.style.display = "none";
  qOptions.innerHTML = "";
  q.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.className = "quiz-opt";
    b.textContent = opt;
    b.addEventListener("click", () => selectAnswer(i));
    qOptions.appendChild(b);
  });
}

function selectAnswer(i) {
  if (answered) return;
  answered = true;
  const q = quiz[qIndex];
  const s = quizStrings[currentLang];
  const explain = quizExplain[currentLang][qIndex];
  const btns = qOptions.querySelectorAll(".quiz-opt");
  btns.forEach((b, idx) => {
    b.disabled = true;
    if (idx === q.correct) b.classList.add("correct");
    else if (idx === i) b.classList.add("wrong");
  });
  if (i === q.correct) {
    score++;
    qFeedback.textContent = s.correct + explain;
  } else {
    qFeedback.textContent = s.wrong + explain;
  }
  qFeedback.classList.add("show");
  qScore.textContent = s.score(score);
  qNext.style.display = "inline-flex";
  qNext.textContent = qIndex < quiz.length - 1 ? s.next : s.result;
}

qNext.addEventListener("click", () => {
  qIndex++;
  if (qIndex < quiz.length) {
    renderQuiz();
  } else {
    const s = quizStrings[currentLang];
    qCount.textContent = s.done;
    qCode.textContent = "";
    qOptions.innerHTML = "";
    qFeedback.textContent = s.finished(score, quiz.length);
    qNext.textContent = s.retry;
    qNext.onclick = () => {
      qIndex = 0;
      score = 0;
      renderQuiz();
    };
  }
});

applyLang(currentLang);
