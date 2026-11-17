(() => {
  const C = CONTENT;
  const $ = (s, el = document) => el.querySelector(s);
  const h = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Fill content ---------- */
  document.title = `${C.name} — Portfolio`;
  $("#heroName").textContent = C.name;
  $("#logo").textContent = C.initials;
  $("#tagline").textContent = C.tagline;
  $("#year").textContent = new Date().getFullYear();
  C.about.forEach((p) => $("#aboutText").appendChild(h("p", "", esc(p))));

  C.stats.forEach((s) => {
    const el = h("div", "stat", `<b data-to="${s.value}" data-suffix="${esc(s.suffix)}">0</b><span>${esc(s.label)}</span>`);
    $("#stats").appendChild(el);
  });

  // Skills + filters
  const groups = ["All", ...new Set(C.skills.map((s) => s.group))];
  groups.forEach((g, i) => {
    const b = h("button", "chip" + (i === 0 ? " on" : ""), esc(g));
    b.onclick = () => {
      document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === b));
      document.querySelectorAll(".skill").forEach((s) =>
        s.classList.toggle("hide", g !== "All" && s.dataset.group !== g)
      );
    };
    $("#skillFilters").appendChild(b);
  });
  C.skills.forEach((s) => {
    const el = h("div", "skill reveal",
      `<div class="skill-head"><strong>${esc(s.name)}</strong><small class="mono">${s.level}%</small></div>
       <div class="bar"><i data-w="${s.level}"></i></div>`);
    el.dataset.group = s.group;
    $("#skillList").appendChild(el);
  });

  // Projects
  C.projects.forEach((p) => {
    const el = h("article", "card reveal",
      `<span class="emoji">${p.emoji}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
       <div class="tags">${p.tags.map((t) => `<span class="mono">${esc(t)}</span>`).join("")}</div>
       ${p.link ? `<a class="go mono" href="${esc(p.link)}" target="_blank" rel="noopener">view →</a>` : ""}`);
    $("#projectCards").appendChild(el);
  });

  // Journey
  const range = $("#journeyRange");
  range.max = C.journey.length - 1;
  C.journey.forEach((j, i) => {
    const b = h("button", "step", `<span class="node mono">${i + 1}</span><small>${esc(j.when)}</small>`);
    b.onclick = () => setStep(i);
    $("#steps").appendChild(b);
  });
  function setStep(i) {
    range.value = i;
    const j = C.journey[i];
    document.querySelectorAll(".step").forEach((s, k) => {
      s.classList.toggle("done", k <= i);
      s.classList.toggle("cur", k === i);
    });
    $("#trackFill").style.width = (i / (C.journey.length - 1)) * 100 + "%";
    const card = $("#journeyCard");
    card.style.animation = "none";
    void card.offsetWidth;
    card.style.animation = "";
    card.innerHTML = `<span class="when mono">${esc(j.when)}</span>
      <h3>${esc(j.title)}${j.now ? '<span class="badge-now mono">YOU ARE HERE</span>' : ""}</h3>
      <p>${esc(j.text)}</p>`;
  }
  range.oninput = () => setStep(+range.value);
  setStep(Math.max(0, C.journey.findIndex((j) => j.now)));

  // Dreams
  C.dreams.forEach((d) => {
    const el = h("button", "dream reveal",
      `<div class="dream-inner">
        <div class="face"><span class="ic">${d.icon}</span><h3>${esc(d.front)}</h3><small class="mono" style="opacity:.6">tap to flip</small></div>
        <div class="face back">${esc(d.back)}</div>
      </div>`);
    el.onclick = () => el.classList.toggle("flipped");
    $("#dreams").appendChild(el);
  });

  // Links
  const linkDefs = { github: "GitHub", linkedin: "LinkedIn", email: "Email" };
  Object.entries(C.links).forEach(([k, v]) => {
    if (!v) return;
    const href = k === "email" ? `mailto:${v}` : v;
    const a = h("a", "btn ghost magnetic", esc(linkDefs[k] || k));
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    $("#links").appendChild(a);
  });

  /* ---------- Typing effect ---------- */
  const typed = $("#typed");
  let ri = 0, ci = 0, del = false;
  (function type() {
    const word = C.roles[ri];
    typed.textContent = word.slice(0, ci);
    if (!del && ci < word.length) ci++;
    else if (del && ci > 0) ci--;
    else if (!del) { del = true; return setTimeout(type, 1600); }
    else { del = false; ri = (ri + 1) % C.roles.length; }
    setTimeout(type, del ? 45 : 95);
  })();

  /* ---------- Scroll reveal, counters, bars ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll(".bar i").forEach((b) => (b.style.width = b.dataset.w + "%"));
      e.target.querySelectorAll("b[data-to]").forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + "s";
    io.observe(el);
  });
  function countUp(el) {
    const to = +el.dataset.to, suf = el.dataset.suffix, t0 = performance.now(), dur = 1600;
    (function step(t) {
      const p = Math.min(1, (t - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString() + suf;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  // Progress bar + active nav
  const navLinks = [...document.querySelectorAll(".nav nav a")];
  addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    $(".progress").style.width = (scrollY / max) * 100 + "%";
    let cur = "";
    document.querySelectorAll("section").forEach((s) => { if (scrollY >= s.offsetTop - 200) cur = s.id; });
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
  }, { passive: true });

  /* ---------- Cursor glow, 3D tilt, magnetic buttons ---------- */
  const glow = $(".cursor-glow");
  const mouse = { x: -9999, y: -9999 };
  addEventListener("pointermove", (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px";
  });
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", x * 100 + "%");
      card.style.setProperty("--my", y * 100 + "%");
      if (!reduced) card.style.transform = `rotateX(${(0.5 - y) * 14}deg) rotateY(${(x - 0.5) * 14}deg)`;
    });
    card.addEventListener("pointerleave", () => (card.style.transform = ""));
  });
  document.querySelectorAll(".magnetic").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      if (reduced) return;
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    });
    b.addEventListener("pointerleave", () => (b.style.transform = ""));
  });

  /* ---------- Particle constellation background ---------- */
  const cv = $("#bg"), ctx = cv.getContext("2d");
  let W, H, pts = [];
  const dpr = Math.min(devicePixelRatio || 1, 2);
  function resize() {
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    const n = Math.min(110, Math.floor((innerWidth * innerHeight) / 14000));
    while (pts.length < n) pts.push(newPt());
    pts.length = n;
  }
  const newPt = (x, y, burst) => ({
    x: x ?? Math.random() * W, y: y ?? Math.random() * H,
    vx: (Math.random() - 0.5) * (burst ? 6 : 0.4) * dpr, vy: (Math.random() - 0.5) * (burst ? 6 : 0.4) * dpr,
    r: (Math.random() * 1.6 + 0.6) * dpr, life: burst ? 1 : null,
  });
  addEventListener("resize", resize);
  resize();
  document.addEventListener("click", (e) => {
    if (e.target.closest("a,button,input,.card,.terminal")) return;
    for (let i = 0; i < 14; i++) pts.push(newPt(e.clientX * dpr, e.clientY * dpr, true));
  });
  function frame() {
    ctx.clearRect(0, 0, W, H);
    const light = document.documentElement.dataset.theme === "light";
    const base = light ? "80,60,200" : "160,150,255";
    const mx = mouse.x * dpr, my = mouse.y * dpr, link = 120 * dpr;
    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i];
      const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
      if (d < 140 * dpr && d > 0) { p.x += (dx / d) * 1.6; p.y += (dy / d) * 1.6; }
      p.x += p.vx; p.y += p.vy;
      if (p.life !== null) {
        p.vx *= 0.96; p.vy *= 0.96; p.life -= 0.008;
        if (p.life <= 0) { pts.splice(i, 1); continue; }
      }
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fillStyle = `rgba(${base},${p.life ?? 0.8})`; ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < link) {
          ctx.strokeStyle = `rgba(${base},${(1 - d / link) * 0.25})`;
          ctx.lineWidth = dpr; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      const a = pts[i], d = Math.hypot(a.x - mx, a.y - my);
      if (d < link * 1.6) {
        ctx.strokeStyle = `rgba(0,212,255,${(1 - d / (link * 1.6)) * 0.5})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my); ctx.stroke();
      }
    }
    requestAnimationFrame(frame);
  }
  if (!reduced) frame();

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  try { if (localStorage.getItem("theme")) root.dataset.theme = localStorage.getItem("theme"); } catch {}
  $("#themeBtn").onclick = () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
  };

  /* ---------- Toast + emoji burst ---------- */
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2600);
  }
  function burst(x, y, chars = ["✨", "🚀", "💜", "⭐", "🎉"]) {
    for (let i = 0; i < 18; i++) {
      const s = h("span", "burst", chars[i % chars.length]);
      s.style.left = x + "px"; s.style.top = y + "px";
      s.style.setProperty("--dx", (Math.random() - 0.5) * 400 + "px");
      s.style.setProperty("--dy", (Math.random() - 0.5) * 400 + "px");
      s.style.setProperty("--r", Math.random() * 720 + "deg");
      document.body.appendChild(s); setTimeout(() => s.remove(), 1000);
    }
  }
  let logoClicks = 0;
  $("#logo").addEventListener("click", (e) => {
    if (++logoClicks % 5 === 0) { e.preventDefault(); burst(e.clientX, e.clientY); toast("You found a secret! 🎉"); }
  });

  // Konami code
  const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let kpos = 0;

  /* ---------- Terminal ---------- */
  const term = $("#terminal"), body = $("#termBody"), input = $("#termInput");
  const print = (txt, cls = "") => { body.appendChild(h("div", cls, esc(txt))); body.scrollTop = body.scrollHeight; };
  const cmds = {
    help: () => "commands: about, skills, projects, goals, contact, theme, party, clear, exit",
    about: () => C.about.join("\n"),
    whoami: () => `${C.name} — ${C.roles.join(" / ")}`,
    skills: () => C.skills.map((s) => `${s.name.padEnd(18)} ${"█".repeat(Math.round(s.level / 10))}${"░".repeat(10 - Math.round(s.level / 10))}`).join("\n"),
    projects: () => C.projects.map((p) => `${p.emoji} ${p.title} — ${p.desc}`).join("\n"),
    goals: () => C.dreams.map((d) => `${d.icon} ${d.front}: ${d.back}`).join("\n"),
    contact: () => Object.entries(C.links).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n") || "coming soon",
    theme: () => { $("#themeBtn").click(); return "theme switched"; },
    party: () => { burst(innerWidth / 2, innerHeight / 2); return "🎉🎉🎉"; },
    clear: () => { body.innerHTML = ""; return null; },
    exit: () => { toggleTerm(false); return null; },
    sudo: () => "nice try 😄",
  };
  function toggleTerm(force) {
    const open = force ?? !term.classList.contains("open");
    term.classList.toggle("open", open);
    term.setAttribute("aria-hidden", !open);
    if (open) {
      if (!body.childElementCount) print(`Welcome! Type 'help' to explore ${C.name}'s world.`);
      setTimeout(() => input.focus(), 50);
    }
  }
  $("#termBtn").onclick = () => toggleTerm();
  $("#termClose").onclick = () => toggleTerm(false);
  $("#termForm").onsubmit = (e) => {
    e.preventDefault();
    const raw = input.value.trim(); input.value = "";
    if (!raw) return;
    print("$ " + raw, "cmd");
    const fn = cmds[raw.toLowerCase().split(" ")[0]];
    const out = fn ? fn() : `command not found: ${raw}. try 'help'`;
    if (out) print(out);
  };

  addEventListener("keydown", (e) => {
    if (e.key === konami[kpos]) {
      if (++kpos === konami.length) { kpos = 0; burst(innerWidth / 2, innerHeight / 2, ["🕹️", "👾", "⭐"]); toast("Konami code unlocked! 👾"); }
    } else kpos = e.key === konami[0] ? 1 : 0;
    if (e.target === input) { if (e.key === "Escape") toggleTerm(false); return; }
    if (e.key === "`") { e.preventDefault(); toggleTerm(); }
  });
})();
