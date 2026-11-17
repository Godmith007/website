(() => {
  "use strict";
  const C = CONTENT;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Content ---------------- */
  $("#heroName").textContent = C.name;
  $("#logo").textContent = C.initials;
  $("#role").textContent = C.role;
  $("#tagline").textContent = C.tagline;
  const parts = C.name.split(" ");
  $("#tbName").textContent = parts.slice(0, -1).map((p) => p[0] + ".").join(" ") + " " + parts[parts.length - 1];
  $("#rev").textContent = "A · " + new Date().getFullYear();

  // Rotating focus word
  const cyc = $("#cycle");
  let fi = 0;
  cyc.textContent = C.focus[0];
  if (!reduced) setInterval(() => { fi = (fi + 1) % C.focus.length; cyc.textContent = C.focus[fi]; }, 2400);

  C.about.forEach((p) => $("#about").appendChild(el("p", "", esc(p))));
  C.facts.forEach((f) => $("#facts").appendChild(el("div", "", `<dt>${esc(f.value)}</dt><dd>${esc(f.label)}</dd>`)));

  // Projects (expandable)
  C.projects.forEach((p, i) => {
    const d = el("details", "project");
    if (i === 0) d.open = true;
    d.innerHTML = `<summary>
        <span class="kind">${esc(p.kind)}</span>
        <h3>${esc(p.title)}</h3>
        <p class="sum">${esc(p.summary)}</p>
        <span class="plus" aria-hidden="true">+</span>
      </summary>
      <div class="body">
        <ul>${p.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        <div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        ${p.demo ? `<a class="demo-link" href="#top" data-demo>Run the live model at the top of the page ↑</a>` : ""}
      </div>`;
    $("#projects-list").appendChild(d);
  });
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-demo]")) setTimeout(() => sim.start(true), 400);
  });

  // Skills with filter
  const LV = { Strong: 3, Working: 2, Basics: 1 };
  const groups = ["All", ...new Set(C.skills.map((s) => s.group))];
  groups.forEach((g, i) => {
    const b = el("button", "chip", esc(g));
    b.type = "button";
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.onclick = () => {
      document.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === b ? "true" : "false"));
      document.querySelectorAll(".skill").forEach((s) => s.classList.toggle("dim-out", g !== "All" && s.dataset.group !== g));
    };
    $("#filters").appendChild(b);
  });
  C.skills.forEach((s) => {
    const n = LV[s.level] || 1;
    const meter = [1, 2, 3].map((k) => `<i class="${k <= n ? "on" : ""}"></i>`).join("");
    const d = el("div", "skill", `<span>${esc(s.name)}</span><small>${esc(s.level)} <span class="meter" aria-hidden="true">${meter}</span></small>`);
    d.dataset.group = s.group;
    $("#skills").appendChild(d);
  });

  // Experience + certifications
  C.experience.forEach((x) => {
    $("#exp").appendChild(el("article", "job",
      `<h3>${esc(x.org)}</h3><p class="meta">${esc(x.what)} · ${esc(x.when)}</p>
       <ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`));
  });
  C.certifications.forEach((c) => {
    $("#certs").appendChild(el("li", "",
      `<div><strong>${esc(c.name)}</strong><br /><small>${esc(c.by)}${c.note ? " · " + esc(c.note) : ""}</small></div>
       <span class="when">${esc(c.when)}</span>`));
  });

  // Journey
  const J = C.journey;
  const nowIdx = Math.max(0, J.findIndex((j) => j.now));
  const range = $("#journeyRange");
  range.max = J.length - 1;
  const steps = $("#steps");
  const fill = el("div", "fill");
  steps.appendChild(fill);
  J.forEach((j, i) => {
    const b = el("button", "step", `<span class="node"></span><span>${esc(j.when)}</span>`);
    b.type = "button";
    b.setAttribute("aria-label", `${j.when}: ${j.title}`);
    if (i > nowIdx) b.classList.add("future");
    b.onclick = () => setStep(i);
    steps.appendChild(b);
  });
  const half = 50 / J.length;
  function setStep(i) {
    range.value = i;
    const j = J[i];
    steps.querySelectorAll(".step").forEach((s, k) => {
      s.classList.toggle("done", k <= i);
      s.classList.toggle("cur", k === i);
    });
    fill.style.left = half + "%";
    fill.style.width = (i / (J.length - 1)) * (100 - 2 * half) + "%";
    const card = $("#journeyCard");
    card.classList.remove("swap"); void card.offsetWidth; card.classList.add("swap");
    card.innerHTML = `<span class="when">${esc(j.when)}${i > nowIdx ? " · planned" : ""}</span>
      <h3>${esc(j.title)}${j.now ? '<span class="here">YOU ARE HERE</span>' : ""}</h3>
      <p>${esc(j.text)}</p>`;
  }
  range.addEventListener("input", () => setStep(+range.value));
  setStep(nowIdx);
  // keep the grey track aligned with the first and last node
  const styleTag = document.createElement("style");
  styleTag.textContent = `.steps::before{left:${half}%;right:${half}%}#journeyRange{width:${100 - 2 * half}%;margin-left:${half}%;margin-right:${half}%}`;
  document.head.appendChild(styleTag);

  // Goals (flip cards)
  C.goals.forEach((g) => {
    const b = el("button", "goal",
      `<div class="goal-in">
        <div class="face"><h3>${esc(g.front)}</h3><small>Tap to flip</small></div>
        <div class="face back">${esc(g.back)}</div>
      </div>`);
    b.type = "button";
    b.setAttribute("aria-pressed", "false");
    b.onclick = () => b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
    $("#goalCards").appendChild(b);
  });

  // Links
  const names = { linkedin: "LinkedIn", github: "GitHub" };
  Object.entries(C.links).forEach(([k, v], i) => {
    if (!v) return;
    const a = el("a", i === 0 ? "btn" : "btn ghost", esc(names[k] || k) + " ↗");
    a.href = v; a.target = "_blank"; a.rel = "noopener";
    $("#links").appendChild(a);
  });

  /* ---------------- Nav highlight ---------------- */
  const navLinks = [...document.querySelectorAll(".nav nav a")];
  const secs = [...document.querySelectorAll("main section[id]")];
  addEventListener("scroll", () => {
    let cur = "";
    secs.forEach((s) => { if (s.getBoundingClientRect().top < 140) cur = s.id; });
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
  }, { passive: true });

  /* ---------------- CAD-style coordinate readout ---------------- */
  const PX_MM = 25.4 / 96;
  addEventListener("pointermove", (e) => {
    $("#cx").textContent = Math.round((e.clientX + scrollX) * PX_MM);
    $("#cy").textContent = Math.round((document.documentElement.scrollHeight - (e.clientY + scrollY)) * PX_MM);
  }, { passive: true });

  /* ---------------- Theme ---------------- */
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (_) {}
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  $("#themeBtn").addEventListener("click", () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (_) {}
    sim.draw();
  });

  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* =========================================================
     WAAM thermal model (simplified)
     A 2-D grid: a base plate plus a wall built layer by layer.
     Cells "switch on" as the torch passes (element birth), a
     moving elliptical heat source adds energy, heat conducts
     between neighbours and is lost from free surfaces. The
     bottom of the plate is held at 22 °C.
     ========================================================= */
  const sim = (() => {
    const AMB = 22, TMAX = 1500;
    const MARGIN = 8, WALL = 75, LAYERS = 12, RL = 2, PLATE = 4, HEAD = 5;
    const GX = WALL + 2 * MARGIN, GY = HEAD + LAYERS * RL + PLATE;
    const CELL = 7;
    const cv = $("#sim"), ctx = cv.getContext("2d");
    cv.width = GX * CELL; cv.height = GY * CELL;
    $(".dim").style.marginInline = (MARGIN / GX) * 100 + "%";

    const N = GX * GY;
    let T = new Float32Array(N), Tn = new Float32Array(N), act = new Uint8Array(N);
    const id = (x, y) => y * GX + x;
    const BANDS = ["#0000ff", "#00b2ff", "#00ffff", "#00ffb2", "#00ff00", "#b2ff00", "#ffff00", "#ffb200", "#ff0000"];
    const bandLow = (i) => AMB + Math.pow(i / 9, 2) * (TMAX - AMB);
    const bandOf = (t) => Math.min(8, Math.max(0, Math.floor(Math.sqrt(Math.max(0, (t - AMB) / (TMAX - AMB))) * 9)));

    // legend
    const leg = $("#legend");
    leg.innerHTML = BANDS.map((c, i) => `<div><i style="background:${c}"></i><span>${Math.round(bandLow(i))}</span></div>`).join("");

    let state, layer, tx, dir, dwell, time, running, sparks, raf, visible = true;
    const status = $("#simStatus"), runBtn = $("#simRun");

    function reset() {
      T.fill(AMB); act.fill(0);
      for (let y = GY - PLATE; y < GY; y++) for (let x = 0; x < GX; x++) act[id(x, y)] = 1;
      state = "idle"; layer = 0; tx = MARGIN; dir = 1; dwell = 0; time = 0; sparks = [];
      running = false;
      setStatus("ready");
      runBtn.textContent = "Print the wall";
      draw(); readouts();
    }
    const layerRows = (k) => { const top = GY - PLATE - (k + 1) * RL; return [top, top + RL - 1]; };
    const dwellSteps = () => Math.round(+$("#simDwell").value * 9);

    function startLayer() {
      state = "print";
      const zig = $("#simPattern").value === "zigzag";
      dir = zig && layer % 2 === 1 ? -1 : 1;
      tx = dir === 1 ? MARGIN : MARGIN + WALL - 0.001;
      setStatus(`printing layer ${layer + 1}`);
    }

    function step() {
      time += 0.05;
      if (state === "print") {
        const [r0, r1] = layerRows(layer);
        const prev = tx;
        tx += dir * 0.6;
        const a = Math.floor(Math.min(prev, tx)), b = Math.floor(Math.max(prev, tx));
        for (let x = Math.max(MARGIN, a); x <= Math.min(MARGIN + WALL - 1, b); x++)
          for (let y = r0; y <= r1; y++) { const k = id(x, y); if (!act[k]) { act[k] = 1; T[k] = 1450; } }
        // moving elliptical (double-ellipsoid style) heat source: longer trailing tail than leading front
        for (let y = r0 - 1; y <= r1 + 4; y++) {
          for (let x = Math.floor(tx) - 6; x <= Math.floor(tx) + 6; x++) {
            if (x < 0 || x >= GX || y < 0 || y >= GY) continue;
            const k = id(x, y); if (!act[k]) continue;
            const dx = x + 0.5 - tx, dy = y - r0;
            const ax = dx * dir > 0 ? 1.8 : 3.6;
            const q = 95 * Math.exp(-3 * ((dx * dx) / (ax * ax) + (dy * dy) / 4));
            T[k] = Math.min(1650, T[k] + q);
          }
        }
        if (tx >= MARGIN + WALL || tx < MARGIN) {
          layer++;
          if (layer >= LAYERS) { state = "cool"; setStatus("cooling to room temperature"); }
          else { state = "dwell"; dwell = dwellSteps(); setStatus("cooling between layers"); }
        }
      } else if (state === "dwell") {
        if (--dwell <= 0) startLayer();
      }
      // conduction + surface losses
      const k = 0.22, h = 0.006;
      for (let y = 0; y < GY; y++) {
        for (let x = 0; x < GX; x++) {
          const i = id(x, y);
          if (!act[i]) { Tn[i] = AMB; continue; }
          const t = T[i]; let d = 0;
          const nb = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
          for (const [nx, ny] of nb) {
            if (nx < 0 || nx >= GX || ny < 0 || ny >= GY) { d -= h * (t - AMB); continue; }
            const j = id(nx, ny);
            d += act[j] ? k * (T[j] - t) : -h * (t - AMB);
          }
          Tn[i] = t + d;
        }
      }
      for (let x = 0; x < GX; x++) Tn[id(x, GY - 1)] = AMB; // plate clamped to a table at 22 °C
      [T, Tn] = [Tn, T];
    }

    function peak() { let m = AMB; for (let i = 0; i < N; i++) if (act[i] && T[i] > m) m = T[i]; return m; }

    function readouts() {
      $("#rLayer").textContent = `${Math.min(layer + (state === "print" ? 1 : 0), LAYERS)} / ${LAYERS}`;
      $("#rPeak").textContent = `${Math.round(peak())} °C`;
      $("#rTime").textContent = `${time.toFixed(1)} s`;
    }
    function setStatus(s) { status.textContent = s; }

    function draw() {
      const cs = getComputedStyle(document.documentElement);
      const ink = cs.getPropertyValue("--ink").trim() || "#17212b";
      const line = cs.getPropertyValue("--line").trim() || "#c4cbcd";
      ctx.clearRect(0, 0, cv.width, cv.height);
      // outline of the finished wall (dashed, like hidden detail lines)
      ctx.setLineDash([5, 4]); ctx.strokeStyle = line; ctx.lineWidth = 1;
      ctx.strokeRect(MARGIN * CELL + 0.5, (GY - PLATE - LAYERS * RL) * CELL + 0.5, WALL * CELL - 1, LAYERS * RL * CELL);
      ctx.setLineDash([]);
      for (let y = 0; y < GY; y++) for (let x = 0; x < GX; x++) {
        const i = id(x, y); if (!act[i]) continue;
        ctx.fillStyle = BANDS[bandOf(T[i])];
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      }
      // torch
      if (state === "print" || state === "dwell") {
        const [r0] = layerRows(Math.min(layer, LAYERS - 1));
        const px = (state === "print" ? tx : (dir === 1 ? MARGIN + WALL : MARGIN)) * CELL;
        const py = r0 * CELL;
        ctx.fillStyle = ink;
        ctx.fillRect(px - 5, py - 34, 10, 22);
        ctx.beginPath(); ctx.moveTo(px - 5, py - 12); ctx.lineTo(px + 5, py - 12); ctx.lineTo(px + 2, py - 4); ctx.lineTo(px - 2, py - 4); ctx.fill();
        if (state === "print") {
          ctx.fillStyle = "rgba(255,255,255,0.95)";
          ctx.beginPath(); ctx.arc(px, py - 1, 3.5, 0, 7); ctx.fill();
        }
      }
      // sparks
      for (const s of sparks) {
        ctx.fillStyle = `rgba(255,${180 + Math.round(70 * s.l)},60,${s.l})`;
        ctx.fillRect(s.x, s.y, 2, 2);
      }
    }

    function frame() {
      raf = 0;
      if (!running) return;
      const sub = state === "print" ? 6 : state === "dwell" ? 14 : 70;
      for (let i = 0; i < sub && state !== "done"; i++) step();
      if (state === "print" && !reduced) {
        const [r0] = layerRows(layer);
        for (let i = 0; i < 3; i++) sparks.push({ x: tx * CELL, y: r0 * CELL, vx: (Math.random() - 0.5) * 5, vy: -Math.random() * 4, l: 1 });
      }
      sparks = sparks.filter((s) => { s.x += s.vx; s.y += s.vy; s.vy += 0.35; s.l -= 0.05; return s.l > 0; });
      if (state === "cool" && peak() < AMB + 0.5) {
        state = "done"; running = false;
        setStatus("done · cooled to 22 °C");
        runBtn.textContent = "Print again";
        toast("Wall printed and cooled to room temperature");
      }
      draw(); readouts();
      if (running && visible) raf = requestAnimationFrame(frame);
    }
    const loop = () => { if (!raf && running && visible) raf = requestAnimationFrame(frame); };

    function start(fresh) {
      if (fresh || state === "done") reset();
      if (state === "idle") startLayer();
      running = true;
      runBtn.textContent = "Pause";
      loop();
    }
    runBtn.addEventListener("click", () => {
      if (running) { running = false; runBtn.textContent = "Resume"; setStatus("paused"); }
      else start(false);
    });
    $("#simReset").addEventListener("click", reset);

    // hover readout
    const tip = $("#simTip");
    cv.addEventListener("pointermove", (e) => {
      const r = cv.getBoundingClientRect();
      const x = Math.floor(((e.clientX - r.left) / r.width) * GX), y = Math.floor(((e.clientY - r.top) / r.height) * GY);
      if (x < 0 || y < 0 || x >= GX || y >= GY) { tip.hidden = true; return; }
      const i = id(x, y);
      tip.hidden = false;
      tip.style.left = e.clientX - r.left + "px"; tip.style.top = e.clientY - r.top + "px";
      tip.textContent = act[i] ? `${Math.round(T[i])} °C · x ${((x - MARGIN) * 2).toFixed(0)} mm` : "air";
      if (!running) return;
    });
    cv.addEventListener("pointerleave", () => (tip.hidden = true));

    new IntersectionObserver(([en]) => { visible = en.isIntersecting; loop(); }).observe(cv);

    // Opening frame: a few layers already down, so the model never shows empty
    reset();
    startLayer();
    for (let n = 0; n < 3 * 140; n++) step();
    if (reduced) { running = false; setStatus("paused"); runBtn.textContent = "Resume"; draw(); readouts(); }
    else { running = true; runBtn.textContent = "Pause"; draw(); readouts(); loop(); }

    return { start, draw };
  })();

  /* ---------------- Command line (APDL-flavoured) ---------------- */
  const term = $("#terminal"), body = $("#termBody"), input = $("#termInput");
  const print = (txt, cls = "") => { body.appendChild(el("div", cls, esc(txt))); body.scrollTop = body.scrollHeight; };
  const cmds = {
    help: () => "Commands: profile, projects, skills, exp, goals, contact, solve, theme, clear, exit",
    profile: () => C.about.join("\n\n"),
    whoami: () => `${C.name}, ${C.role.toLowerCase()}`,
    projects: () => C.projects.map((p) => `- ${p.title} (${p.kind})\n  ${p.summary}`).join("\n"),
    skills: () => C.skills.map((s) => `${s.name.padEnd(32, ".")} ${s.level}`).join("\n"),
    exp: () => C.experience.map((x) => `- ${x.org}, ${x.when}`).join("\n") + "\n" + C.certifications.map((c) => `- ${c.name} (${c.by}), ${c.when}`).join("\n"),
    goals: () => C.goals.map((g) => `- ${g.front}: ${g.back}`).join("\n"),
    contact: () => Object.entries(C.links).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n"),
    solve: () => { scrollTo({ top: 0, behavior: "smooth" }); sim.start(true); return "*** SOLVE *** Transient thermal run started. Watch the model at the top."; },
    "/solu": () => cmds.solve(),
    theme: () => { $("#themeBtn").click(); return "Theme switched."; },
    clear: () => { body.innerHTML = ""; return null; },
    exit: () => { openTerm(false); return null; },
    "/exit": () => cmds.exit(),
  };
  function openTerm(open) {
    term.hidden = !open;
    if (open) {
      if (!body.childElementCount) print(`Welcome. Type 'help' to see what you can ask about ${C.name.split(" ")[0]}.`);
      setTimeout(() => input.focus(), 30);
    }
  }
  $("#termBtn").addEventListener("click", () => openTerm(term.hidden));
  $("#termClose").addEventListener("click", () => openTerm(false));
  $("#termForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = input.value.trim(); input.value = "";
    if (!raw) return;
    print("BEGIN: " + raw, "cmd");
    const fn = cmds[raw.toLowerCase().split(/\s+/)[0]];
    const out = fn ? fn() : `*** ERROR *** Unknown command '${raw}'. Type help.`;
    if (out) print(out);
  });
  addEventListener("keydown", (e) => {
    if (e.target === input) { if (e.key === "Escape") openTerm(false); return; }
    if (e.key === "`" && !e.target.closest("input,select,textarea")) { e.preventDefault(); openTerm(term.hidden); }
  });
})();
