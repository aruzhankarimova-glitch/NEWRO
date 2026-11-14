/* NEWRO interactive hero; independent implementation inspired by the page-building concept. */
(function () {
  "use strict";

  var cursorRun = 0;
  var activeShell = null;
  var rootNode = null;
  var roleNames = { marketing: "AI Marketing Specialist", pm: "Product Manager" };
  var actors = [
    { name: "YOU", color: "#6954dc" },
    { name: "MENTOR", color: "#24815a" },
    { name: "DESIGN", color: "#d07d36" },
    { name: "NEWRO", color: "#bd46a9" }
  ];
  var prefersLessMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var shortScreen = window.matchMedia && window.matchMedia("(max-width: 760px)").matches;

  function text(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function svg(type) {
    if (type === "explore") return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 2.8l2.6 6.6 6.6 2.6-6.6 2.6L12 21.2l-2.6-6.6L2.8 12l6.6-2.6z"/></svg>';
    if (type === "roles") return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="6" width="16" height="14" rx="3"/><path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6m-11 7h16"/></svg>';
    return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 8v5l3.5 2M4.2 7.3A9 9 0 1 1 3 12"/><path d="M4 3.8v3.8h3.8"/></svg>';
  }

  function cancelBuild() {
    cursorRun++;
    if (!activeShell) return;
    activeShell.querySelectorAll("[data-build]").forEach(function (el) { el.classList.add("nl-built"); });
    activeShell.classList.remove("nl-is-building");
    var overlay = document.getElementById("nl-build-overlay");
    if (overlay) overlay.remove();
    var skip = document.getElementById("nl-skip-build");
    if (skip) skip.remove();
    var status = activeShell.querySelector("[data-build-progress]");
    if (status) status.textContent = "STUDIO READY";
    activeShell = null;
  }

  function mountHome(meta, root) {
    cancelBuild();
    rootNode = root;
    var hasProgress = !!(meta && meta.resume);
    var savedRole = meta && roleNames[meta.role] ? roleNames[meta.role] : "your career";
    root.innerHTML =
      '<div id="nl-shell" class="nl-shell">' +
        '<header id="top" class="nl-header"><div class="nl-wrap nl-nav">' +
          '<a class="nl-brand" href="#top" data-build="brand" aria-label="NEWRO — top of page"><span class="nl-brand-icon">n</span>newro<span class="nl-brand-dot">.</span></a>' +
          '<nav class="nl-links" aria-label="Main navigation"><a href="#careers">Explore careers</a><a href="#how">How it works</a>' +
          (hasProgress ? '<button class="nl-smallbtn" type="button" onclick="NEWRO.resume()">Resume session ↗</button>' : '') +
          '</nav><div class="nl-navright"><button class="nl-smallbtn" type="button" data-replay aria-label="Replay construction animation">↺ Replay</button><button class="nl-join" onclick="NEWRO.start(\'marketing\')">Start a free try-out ↗</button></div>' +
          '<span class="nl-mobile-hint">CAREER LAB / 001</span>' +
        '</div></header>' +
        '<main><div class="nl-wrap"><div class="nl-hero"><div class="nl-hero-copy">' +
          '<p class="nl-eyebrow" data-build="eyebrow"><span class="nl-live"></span> TRY BEFORE YOU COMMIT · NO SIGNUP</p>' +
          '<h1 class="nl-hero-title" data-build="heading">Try the career.<span class="nl-serif">Then decide.</span></h1>' +
          '<p class="nl-lede" data-build="description">Forget watching someone else do the job. Step into a real-world scenario, make the decisions and get feedback you can actually use.</p>' +
          '<div class="nl-ctarow" data-build="actions"><button class="nl-bigcta" type="button" onclick="NEWRO.start(\'marketing\')">Start with AI marketing <span class="nl-arrow">↗</span></button><button class="nl-textcta" type="button" data-scroll="how">See how it works ↘</button></div>' +
          '<div class="nl-proof" data-build="proof"><strong>About 10 minutes</strong><span class="nl-proof-sep"></span><span>Free to try</span><span class="nl-proof-sep"></span><span>Keep your work</span></div>' +
          (hasProgress ? '<div class="nl-resume" data-build="saved"><div><b>Pick up where you left off</b><p>' + text(savedRole) + ' · saved on this device</p></div><button type="button" onclick="NEWRO.resume()">Resume →</button></div>' : '') +
        '</div>' +
        '<div class="nl-stage" data-build="stage" aria-label="NEWRO interactive simulation preview">' +
          '<div class="nl-stage-top"><span class="nl-stage-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="nl-stage-tag">NEWRO / CAREER STUDIO</span><span class="nl-stage-count" data-build-progress>LIVE PREVIEW</span></div>' +
          '<div class="nl-stage-board"><p class="nl-board-head" data-build="board-eyebrow">YOUR FIRST ASSIGNMENT</p>' +
            '<h2 class="nl-board-title" data-build="board-heading">Small project.<br><span>Big perspective.</span></h2>' +
            '<p class="nl-board-lead" data-build="board-copy">Experience the work. See the choices. Leave with a result.</p>' +
            '<div class="nl-board-ruler" aria-hidden="true"><span>00</span><span>140</span><span>280</span><span>420</span></div>' +
            '<button class="nl-board-card" type="button" data-build="board-card" onclick="NEWRO.start(\'marketing\')" aria-label="Open AI Marketing Specialist simulation">' +
              '<div class="nl-board-card-top"><span>ASSIGNMENT / 01</span><span class="nl-mini-check">TO TRY ↗</span></div>' +
              '<h3>Find the first customers.</h3><p>Build a small marketing hypothesis with your AI teammate.</p>' +
            '</button>' +
            '<div class="nl-mentor-note" data-build="board-mentor"><b>◉ AI MENTOR</b>Good decisions start with better questions.</div>' +
          '</div>' +
          '<div class="nl-stage-pointer one" aria-hidden="true"><i class="nl-pointer-symbol"></i><span>future you</span></div>' +
          '<div class="nl-stage-pointer two" aria-hidden="true"><i class="nl-pointer-symbol"></i><span>mentor</span></div>' +
          '<div class="nl-stage-foot"><span><i class="nl-simmark"></i> 01 / REALISTIC TASK</span><span>DECIDE → REFLECT → IMPROVE</span></div>' +
          '<button type="button" class="nl-replay" data-replay aria-label="Replay the hero assembly">↺ REPLAY</button>' +
        '</div></div></div>' +
        '<section id="careers" class="nl-careers"><div class="nl-wrap"><div class="nl-section-head"><h2 data-build="careers-heading">Pick your first role.</h2><p>Two different jobs. Two different kinds of decisions. Choose one to explore now.</p></div>' +
          '<div class="nl-cards">' +
            '<button class="nl-role" data-build="career-one" onclick="NEWRO.start(\'marketing\')" type="button"><span class="nl-role-head"><span class="nl-role-num">CAREER TRY-OUT · 01</span><span class="nl-role-icon" aria-hidden="true">✳</span></span><h3>AI Marketing<br>Specialist</h3><p>Find an audience, direct an AI teammate and decide what makes a good campaign.</p><span class="nl-role-bottom"><span class="nl-detail">◷ About 10 min · Beginner</span><span class="nl-go" aria-hidden="true">↗</span></span></button>' +
            '<button class="nl-role" data-build="career-two" onclick="NEWRO.start(\'pm\')" type="button"><span class="nl-role-head"><span class="nl-role-num">CAREER TRY-OUT · 02</span><span class="nl-role-icon" aria-hidden="true">▤</span></span><h3>Product<br>Manager</h3><p>Ship a product release with limited time, conflicting priorities and real trade-offs.</p><span class="nl-role-bottom"><span class="nl-detail">◷ Short exercise · Beginner</span><span class="nl-go" aria-hidden="true">↗</span></span></button>' +
          '</div></div></section>' +
        '<section id="how" class="nl-how"><div class="nl-wrap nl-how-grid"><h2>Learn what the<br>work feels like.</h2>' +
          '<div class="nl-how-step"><span>01 / ENTER</span><h3>Get a real scenario</h3><p>Start with a clear brief based on the kinds of problems people solve at work.</p></div>' +
          '<div class="nl-how-step"><span>02 / DECIDE</span><h3>Make the call</h3><p>Choose a direction, explain why and examine the trade-offs.</p></div>' +
          '<div class="nl-how-step"><span>03 / KEEP</span><h3>Leave with your work</h3><p>Review your decisions and download the result. No account needed.</p></div>' +
        '</div></section></main>' +
        '<footer class="nl-wrap nl-bottom"><span>© NEWRO · A career exploration prototype</span><span>Fictional cases · Guided rule-based feedback, not a live AI mentor</span></footer>' +
        '<nav class="nl-mobile-dock" aria-label="Mobile navigation">' +
          '<button type="button" class="nl-dockitem active" data-scroll="top">' + svg("explore") + 'Explore</button>' +
          '<button type="button" class="nl-dockitem" data-scroll="careers">' + svg("roles") + 'Try-outs</button>' +
          '<button type="button" class="nl-dockitem" data-resume ' + (hasProgress ? "" : "disabled aria-label=\"No saved session\"") + '>' + svg("saved") + 'Resume</button>' +
        '</nav>' +
      '</div>';

    var shell = document.getElementById("nl-shell");
    shell.querySelectorAll("[data-replay]").forEach(function (b) { b.addEventListener("click", function () { beginBuild(shell, true); }); });
    shell.querySelectorAll("[data-scroll]").forEach(function (b) {
      b.addEventListener("click", function () {
        var target = document.getElementById(b.getAttribute("data-scroll"));
        if (!target) return;
        if (document.getElementById("nl-build-overlay")) cancelBuild();
        target.scrollIntoView({ behavior: prefersLessMotion ? "auto" : "smooth", block: "start" });
        shell.querySelectorAll(".nl-dockitem").forEach(function (x) { x.classList.toggle("active", x === b); });
      });
    });
    var resumeButton = shell.querySelector("[data-resume]");
    if (resumeButton) resumeButton.addEventListener("click", function () { if (window.NEWRO && hasProgress) window.NEWRO.resume(); });
    if (!prefersLessMotion && !shortScreen) beginBuild(shell, false);
  }

  function actorEl(name, color, overlay) {
    var actor = document.createElement("div");
    actor.className = "nl-actor";
    actor.style.setProperty("--actor-color", color);
    actor.innerHTML = '<span class="nl-actor-arrow"></span><span class="nl-actor-name">' + text(name) + '</span>';
    overlay.appendChild(actor);
    return { element: actor, x: window.innerWidth * (0.36 + Math.random() * 0.2), y: window.innerHeight * (0.35 + Math.random() * 0.3) };
  }

  function moveActor(actor, target, token, index) {
    return new Promise(function (resolve) {
      if (token !== cursorRun || !document.body.contains(target)) { resolve(false); return; }
      var rect = target.getBoundingClientRect();
      var toX = Math.max(18, Math.min(window.innerWidth - 125, rect.left + Math.min(rect.width * 0.68, 170)));
      var toY = Math.max(16, Math.min(window.innerHeight - 45, rect.top + Math.min(rect.height * 0.48, 32)));
      if (rect.top > window.innerHeight - 18 || rect.bottom < 0) { resolve(true); return; }
      var startX = actor.x, startY = actor.y, begin = performance.now(), duration = 470 + (index % 3) * 110;
      actor.element.style.opacity = "1";
      function frame(t) {
        if (token !== cursorRun) { resolve(false); return; }
        var v = Math.min(1, (t - begin) / duration);
        var eased = 1 - Math.pow(1 - v, 3);
        var arc = Math.sin(v * Math.PI) * 24 * (index % 2 ? 1 : -1);
        var x = startX + (toX - startX) * eased, y = startY + (toY - startY) * eased + arc;
        actor.element.style.transform = "translate3d(" + x + "px," + y + "px,0)";
        if (v < 1) requestAnimationFrame(frame);
        else { actor.x = x; actor.y = y; resolve(true); }
      }
      requestAnimationFrame(frame);
    });
  }

  function outline(el, overlay) {
    var r = el.getBoundingClientRect();
    if (r.top > window.innerHeight || r.bottom < 0) return;
    var line = document.createElement("span");
    line.className = "nl-draw-outline";
    line.style.left = (r.left - 4) + "px";
    line.style.top = (r.top - 4) + "px";
    line.style.width = (r.width + 8) + "px";
    line.style.height = (r.height + 8) + "px";
    overlay.appendChild(line);
    window.setTimeout(function () { line.remove(); }, 500);
  }

  function beginBuild(shell, replay) {
    cancelBuild();
    if (prefersLessMotion || window.matchMedia("(max-width: 760px)").matches) return;
    activeShell = shell;
    var token = cursorRun;
    var nodes = Array.prototype.slice.call(shell.querySelectorAll("[data-build]"));
    nodes.forEach(function (n) { n.classList.remove("nl-built"); });
    shell.classList.add("nl-is-building");
    var overlay = document.createElement("div");
    overlay.id = "nl-build-overlay";
    overlay.className = "nl-build-cursors";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);
    var skip = document.createElement("button");
    skip.id = "nl-skip-build";
    skip.className = "nl-skip";
    skip.type = "button";
    skip.textContent = "Skip animation ↗";
    skip.addEventListener("click", cancelBuild);
    document.body.appendChild(skip);

    var cursors = actors.map(function (a) { return actorEl(a.name, a.color, overlay); });
    var completed = 0;
    var order = ["brand", "eyebrow", "heading", "description", "actions", "proof", "stage", "board-eyebrow", "board-heading", "board-copy", "board-card", "board-mentor", "saved", "careers-heading", "career-one", "career-two"];
    var sorted = order.map(function (key) { return shell.querySelector('[data-build="' + key + '"]'); }).filter(Boolean);
    var tasks = sorted.map(function (node, i) {
      return new Promise(function (resolve) {
        window.setTimeout(function () {
          if (token !== cursorRun || !document.body.contains(node)) { resolve(); return; }
          var person = cursors[i % cursors.length];
          moveActor(person, node, token, i).then(function (ok) {
            if (ok && token === cursorRun) {
              node.classList.add("nl-built");
              outline(node, overlay);
              completed++;
              var p = shell.querySelector("[data-build-progress]");
              if (p) p.textContent = "ASSEMBLING " + String(Math.round(completed / sorted.length * 100)) + "%";
            }
            resolve();
          });
        }, 150 + i * 260);
      });
    });
    Promise.all(tasks).then(function () {
      if (token !== cursorRun) return;
      window.setTimeout(function () { if (token === cursorRun) cancelBuild(); }, 570);
    });
  }

  document.addEventListener("visibilitychange", function () { if (document.hidden && activeShell) cancelBuild(); });
  window.addEventListener("resize", function () { if (activeShell && window.matchMedia("(max-width: 760px)").matches) cancelBuild(); });
  window.NEWROHome = mountHome;
})();
