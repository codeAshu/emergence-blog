/* Preview-only script: restores the interactive bits of the static export without React.
   Knight's tour, writing tabs, murmuration canvas. The live site uses the React components. */
(function () {
  "use strict";

  /* ---------- knight's tour ---------- */
  var TOUR = [0, 10, 4, 14, 31, 21, 27, 17, 2, 12, 6, 23, 29, 19, 25, 8, 18, 24, 9, 3, 20, 30, 15, 5, 22, 7, 13, 28, 11, 1, 16, 26];
  document.querySelectorAll(".ck-controls").forEach(function (controls) {
    var wrap = controls.previousElementSibling;
    var board = wrap && wrap.querySelector(".board");
    if (!board) return;
    var cells = board.querySelectorAll(".sq");
    var svgPath = wrap.querySelector("svg path");
    var readout = controls.nextElementSibling && controls.nextElementSibling.classList.contains("ck-readout") ? controls.nextElementSibling : null;
    var spans = readout ? readout.querySelectorAll("span") : [];
    var buttons = controls.querySelectorAll("button");
    var counter = controls.querySelector("span.small");
    var check = controls.querySelector("input[type=checkbox]");
    var k = 0, timer = null;
    var byName = {};
    buttons.forEach(function (b) { byName[b.textContent.trim()] = b; });
    var play = byName["Auto-play"];

    function cell(i) { return [((i % 8) + 0.5) * 12.5, (Math.floor(i / 8) + 0.5) * 25]; }
    function render() {
      var cur = k > 0 ? TOUR[k - 1] : -1;
      var visited = {};
      TOUR.slice(0, k).forEach(function (i) { visited[i] = true; });
      cells.forEach(function (c, i) {
        c.classList.toggle("visited", !!visited[i]);
        c.classList.toggle("current", i === cur);
      });
      if (svgPath) {
        svgPath.setAttribute("d", TOUR.slice(0, k).map(function (i, j) { var c = cell(i); return (j ? "L" : "M") + c[0] + " " + c[1]; }).join(" "));
      }
      spans.forEach(function (s, i) {
        s.className = i < k - 1 ? "lit" : i === k - 1 ? "cur" : "";
      });
      if (counter) counter.textContent = k + " / 32";
      byName["Step"].disabled = k >= 32;
      byName["Back"].disabled = k <= 0;
      if (play) play.textContent = timer ? "Pause" : "Auto-play";
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    byName["Step"].onclick = function () { stop(); k = Math.min(32, k + 1); render(); };
    byName["Back"].onclick = function () { stop(); k = Math.max(0, k - 1); render(); };
    byName["Reset"].onclick = function () { stop(); k = 0; render(); };
    if (play) play.onclick = function () {
      if (timer) { stop(); render(); return; }
      if (k >= 32) k = 0;
      timer = setInterval(function () { k++; if (k >= 32) stop(); render(); }, 650);
      render();
    };
    if (check) check.onchange = function () {
      board.querySelectorAll(".n").forEach(function (n) { n.style.display = check.checked ? "" : "none"; });
    };
    render();
  });

  /* ---------- writing tabs ---------- */
  var tabs = document.querySelectorAll(".tabs .tab");
  if (tabs.length) {
    var rows = document.querySelectorAll(".rows .row");
    tabs.forEach(function (t) {
      t.onclick = function () {
        var cat = t.firstChild.textContent.trim();
        tabs.forEach(function (o) { o.setAttribute("aria-selected", o === t ? "true" : "false"); });
        rows.forEach(function (r) {
          var rc = r.querySelector(".cat").textContent.trim();
          r.parentElement.style.display = cat === "All" || rc === cat ? "" : "none";
        });
      };
    });
  }

  /* ---------- murmuration ---------- */
  var canvas = document.querySelector(".flock canvas");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resize() { var r = canvas.getBoundingClientRect(); w = r.width; h = r.height; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    resize(); window.addEventListener("resize", resize);
    var N = 80, boids = [];
    for (var i = 0; i < N; i++) boids.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2 });
    var ink = "#161614", accent = "#d14016";
    function step() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < N; i++) {
        var b = boids[i], sx = 0, sy = 0, ax = 0, ay = 0, cx = 0, cy = 0, n = 0;
        for (var j = 0; j < N; j++) {
          if (i === j) continue;
          var o = boids[j], dx = o.x - b.x, dy = o.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 4900) { n++; ax += o.vx; ay += o.vy; cx += o.x; cy += o.y; if (d2 < 484) { sx -= dx; sy -= dy; } }
        }
        if (n) { ax = ax / n - b.vx; ay = ay / n - b.vy; cx = cx / n - b.x; cy = cy / n - b.y; }
        b.vx += sx * 0.02 + ax * 0.04 + cx * 0.0015; b.vy += sy * 0.02 + ay * 0.04 + cy * 0.0015;
        if (b.x < 60) b.vx += 0.03; if (b.x > w - 60) b.vx -= 0.03; if (b.y < 40) b.vy += 0.03; if (b.y > h - 40) b.vy -= 0.03;
        var sp = Math.hypot(b.vx, b.vy) || 1;
        if (sp > 1.5) { b.vx = b.vx / sp * 1.5; b.vy = b.vy / sp * 1.5; }
        if (sp < 0.6) { b.vx = b.vx / sp * 0.6; b.vy = b.vy / sp * 0.6; }
        b.x += b.vx; b.y += b.vy;
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(b.vy, b.vx));
        ctx.beginPath(); ctx.moveTo(-4, 3); ctx.lineTo(4, 0); ctx.lineTo(-4, -3);
        ctx.strokeStyle = i % 23 === 0 ? accent : ink; ctx.globalAlpha = 0.55; ctx.lineWidth = 1; ctx.stroke(); ctx.restore();
      }
      if (!reduce) requestAnimationFrame(step);
    }
    step();
  }
})();
