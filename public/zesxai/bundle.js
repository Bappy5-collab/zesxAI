/* @ds-bundle: {"format":4,"namespace":"Zesxai","components":[{"name":"Button"},{"name":"Navbar"},{"name":"Hero3D"},{"name":"GalleryBackdrop"},{"name":"ProjectGallery"},{"name":"ClientLogos"},{"name":"ServiceBento"},{"name":"ServiceCard"},{"name":"ProcessFlow"},{"name":"FlowCanvas"},{"name":"TextReviews"},{"name":"VideoReviewCarousel"},{"name":"CaseStudyShowcase"},{"name":"CaseStudyCard"},{"name":"ProductShowcase"},{"name":"ProjectBrief"},{"name":"AgencyPortal"},{"name":"ContactHub"}]} */
(function () {
  'use strict';
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function list(x) { if (!x) return []; if (x.nodeType === 1) return [x]; return Array.prototype.slice.call(x); }
  function cssVar(name, el) { return getComputedStyle(el || document.documentElement).getPropertyValue(name).trim(); }
  function svg(d, extra) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (extra || '') + '>' + d + '</svg>'; }

  /* ---------- Icons (original 24px line set) ---------- */
  var icons = {
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    arrowL: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>',
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    menu: svg('<path d="M4 8h16M4 16h16"/>'),
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>',
    brain: svg('<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/><path d="M12 9h3M12 14h2"/>'),
    agent: svg('<rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 3v4M9 12h.01M15 12h.01M9 16h6"/>'),
    stack: svg('<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>'),
    code: svg('<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>'),
    cloud: svg('<path d="M7 18a4 4 0 0 1-.6-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z"/>'),
    chart: svg('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    shield: svg('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'),
    home: svg('<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/>'),
    folder: svg('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
    chat: svg('<path d="M4 5h16v11H9l-5 4z"/>'),
    file: svg('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'),
    card: svg('<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>'),
    gear: svg('<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: svg('<path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z"/>'),
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
    phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
    pin: svg('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
    calendar: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M8 14h2M12 14h2M16 14h.01M8 17.5h2"/>'),
    msg: svg('<path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12z"/><path d="M9 10.5c.3 1.8 2.2 3.7 4 4l1.2-1.2 1.8.9"/>'),
    check: svg('<path d="M5 12l5 5 9-10"/>'),
    lock: svg('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>')
  };

  /* ---------- Reveal on scroll ---------- */
  function reveal(root) {
    var els = $$('.zx-reveal, .zx-split', root || document);
    if (RM || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { if (!e.classList.contains('is-in')) io.observe(e); });
  }
  /* Split a headline into masked words that rise in sequence */
  function split(el) {
    if (!el || el.dataset.split) return;
    el.dataset.split = '1';
    var html = el.innerHTML.split(/(<[^>]+>)/g);
    var i = 0, out = '';
    html.forEach(function (part) {
      if (part.charAt(0) === '<') { out += part; return; }
      part.split(/(\s+)/).forEach(function (w) {
        if (!w) return;
        if (/^\s+$/.test(w)) { out += ' '; return; }
        out += '<span class="w"><span style="--d:' + (i++ * 70) + 'ms">' + w + '</span></span>';
      });
    });
    el.innerHTML = out;
    el.classList.add('zx-split');
  }

  /* ---------- 3D tilt + magnetic ---------- */
  function tilt(els, max) {
    max = max || 8;
    list(els).forEach(function (el) {
      el.classList.add('zx-tilt');
      if (RM) return;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.classList.add('is-tilting');
        el.style.setProperty('--ry', ((x - 0.5) * max * 2).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((0.5 - y) * max * 2).toFixed(2) + 'deg');
        el.style.setProperty('--mx', (x * 100) + '%'); el.style.setProperty('--my', (y * 100) + '%');
      });
      el.addEventListener('pointerleave', function () { el.classList.remove('is-tilting'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    });
  }
  function magnetic(els, strength) {
    strength = strength || 0.3;
    list(els).forEach(function (el) {
      if (RM) return;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * strength) + 'px,' + ((e.clientY - r.top - r.height / 2) * strength) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }
  function glow(el) {
    if (RM || !el) return;
    document.addEventListener('pointermove', function (e) { el.style.setProperty('--gx', e.clientX + 'px'); el.style.setProperty('--gy', e.clientY + 'px'); });
  }
  function counters(root) {
    $$('[data-count]', root).forEach(function (el) {
      var to = parseFloat(el.dataset.count), suf = el.dataset.suffix || '', t0 = null, dur = RM ? 1 : 1400;
      function step(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / dur), v = to * (1 - Math.pow(1 - p, 3)); el.textContent = (to % 1 ? v.toFixed(1) : Math.round(v)) + suf; if (p < 1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    });
  }

  /* ---------- Hero 3D: heightfield terrain ----------
     A GPU-displaced terrain that flows toward the viewer, drawn as a glowing contour grid.
     Uses three.js when window.THREE is present; otherwise a canvas-2D ridge-line fallback. */
  function hero3d(host, opts) {
    opts = opts || {};
    var colors = function () { return { high: cssVar('--brand-ink') || '#d4ff3a', low: cssVar('--data') || '#5ee7df', hot: cssVar('--accent') || '#ff6b35', ink: cssVar('--ink') || '#f4efe9', bg: cssVar('--bg-000') || '#07080a' }; };
    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener('pointermove', function (e) { mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2; mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2; });
    var st = { scroll: 0, speed: opts.speed == null ? 1 : opts.speed, amp: opts.amplitude == null ? 1 : opts.amplitude };
    document.addEventListener('scroll', function (e) { var s = (e.target && e.target.scrollTop) || window.scrollY || 0; st.scroll = Math.min(1, s / 700); }, true);
    if (window.THREE) return threeField(host, colors, mouse, st);
    return canvasField(host, colors, mouse, st);
  }
  /* Shared height function (mirrors the shader) for the fallback */
  function fieldH(x, z, t, mx, mz) {
    var qx = x, qz = z - t * 1.2;
    var h = Math.sin(qx * 0.35 + Math.sin(qz * 0.2) * 1.5) * 0.9 + Math.sin(qz * 0.45 + qx * 0.15) * 0.7 + Math.sin((qx + qz) * 0.9) * 0.18;
    var valley = Math.min(1, Math.max(0, (Math.abs(x) - 0.8) / 5));
    h = (h + 1.1) * (0.25 + valley * valley * 1.6);
    var dx = x - mx, dz = z - mz; h += Math.exp(-(dx * dx + dz * dz) / 5) * 1.6;
    return h;
  }
  function threeField(host, colors, mouse, st) {
    var T = window.THREE, c = colors();
    var renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    host.appendChild(renderer.domElement);
    var scene = new T.Scene(), cam = new T.PerspectiveCamera(48, 1, 0.1, 140);
    var uni = {
      uTime: { value: 0 }, uMouse: { value: new T.Vector2(0, -4) }, uAmp: { value: st.amp },
      uLow: { value: new T.Color(c.low) }, uHigh: { value: new T.Color(c.high) }, uHot: { value: new T.Color(c.hot) }, uBg: { value: new T.Color(c.bg) },
      uFog: { value: new T.Vector2(18, 58) }
    };
    var vs = [
      'uniform float uTime; uniform vec2 uMouse; uniform float uAmp;',
      'varying float vH; varying vec2 vQ; varying float vDepth; varying float vBump;',
      'float field(vec2 p){',
      '  vec2 q = vec2(p.x, p.y - uTime * 1.2);',
      '  float h = sin(q.x*0.35 + sin(q.y*0.2)*1.5)*0.9 + sin(q.y*0.45 + q.x*0.15)*0.7 + sin((q.x+q.y)*0.9)*0.18;',
      '  float valley = clamp((abs(p.x) - 0.8) / 5.0, 0.0, 1.0);',
      '  return (h + 1.1) * (0.25 + valley*valley*1.6);',
      '}',
      'void main(){',
      '  vec3 p = position.xzy; p.z = -p.z;',
      '  vec2 d = p.xz - uMouse; float bump = exp(-dot(d,d)/5.0);',
      '  float h = field(p.xz) * uAmp + bump * 1.6;',
      '  p.y = h; vH = h; vBump = bump; vQ = vec2(p.x, p.z - uTime * 1.2);',
      '  vec4 mv = modelViewMatrix * vec4(p, 1.0); vDepth = -mv.z;',
      '  gl_Position = projectionMatrix * mv;',
      '}'
    ].join('\n');
    var fs = [
      'uniform vec3 uLow; uniform vec3 uHigh; uniform vec3 uHot; uniform vec3 uBg; uniform vec2 uFog;',
      'varying float vH; varying vec2 vQ; varying float vDepth; varying float vBump;',
      'float grid(vec2 q, float s){ vec2 g = abs(fract(q*s - 0.5) - 0.5) / fwidth(q*s); return 1.0 - min(min(g.x, g.y), 1.0); }',
      'void main(){',
      '  float k = smoothstep(0.2, 3.2, vH);',
      '  vec3 col = mix(uLow, uHigh, k);',
      '  col = mix(col, uHot, smoothstep(0.35, 0.9, vBump));',
      '  float line = max(grid(vQ, 0.8), grid(vQ, 3.2) * 0.16);',
      '  vec3 fill = mix(uBg, col, 0.10 + k * 0.08);',
      '  vec3 outc = mix(fill, col, line);',
      '  float fog = smoothstep(uFog.x, uFog.y, vDepth);',
      '  gl_FragColor = vec4(mix(outc, uBg, fog), 1.0 - fog);',
      '}'
    ].join('\n');
    var mat = new T.ShaderMaterial({ uniforms: uni, vertexShader: vs, fragmentShader: fs, transparent: true, extensions: { derivatives: true } });
    var geo = new T.PlaneGeometry(64, 64, 180, 180);
    geo.translate(0, 22, 0);
    var mesh = new T.Mesh(geo, mat);
    scene.add(mesh);
    var N = 500, pos = new Float32Array(N * 3);
    for (var i = 0; i < N; i++) { pos[i * 3] = (Math.random() - 0.5) * 60; pos[i * 3 + 1] = 2 + Math.random() * 9; pos[i * 3 + 2] = -Math.random() * 50 + 6; }
    var dg = new T.BufferGeometry(); dg.setAttribute('position', new T.BufferAttribute(pos, 3));
    var dust = new T.Points(dg, new T.PointsMaterial({ color: c.low, size: 0.06, transparent: true, opacity: 0.55 }));
    scene.add(dust);
    function recolor() {
      c = colors();
      uni.uLow.value.set(c.low); uni.uHigh.value.set(c.high); uni.uHot.value.set(c.hot); uni.uBg.value.set(c.bg); dust.material.color.set(c.low);
    }
    new MutationObserver(recolor).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    var wide = true;
    function size() { var w = host.clientWidth || 1, h = host.clientHeight || 1; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); wide = w > 900; }
    size(); window.addEventListener('resize', size);
    var running = true, t = 0;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { running = en[0].isIntersecting; if (running) loop(); }, {}).observe(host);
    function loop() {
      if (!running) return;
      t += RM ? 0 : 0.016 * st.speed;
      mouse.x += (mouse.tx - mouse.x) * 0.06; mouse.y += (mouse.ty - mouse.y) * 0.06;
      uni.uTime.value = t;
      uni.uMouse.value.set(3 + mouse.x * 12, -6 - mouse.y * 6);
      var camY = 5.6 + st.scroll * 3 + mouse.y * -0.5;
      cam.position.set(mouse.x * 1.5 + (wide ? 3.5 : 0), camY, 12);
      cam.lookAt(wide ? 3.5 : 0, 1.2 - st.scroll * 1.5, -16);
      dust.position.z = (t * 1.2) % 6;
      renderer.render(scene, cam);
      requestAnimationFrame(loop);
    }
    loop();
    return { renderer: renderer, recolor: recolor, set: function (o) { if (o.speed != null) st.speed = o.speed; if (o.amplitude != null) uni.uAmp.value = o.amplitude; } };
  }
  function canvasField(host, colors, mouse, st) {
    var cv = document.createElement('canvas'), ctx = cv.getContext('2d'); host.appendChild(cv);
    var W, H, dpr = Math.min(2, window.devicePixelRatio || 1), t = 0;
    function size() { W = host.clientWidth; H = host.clientHeight; cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px'; }
    size(); window.addEventListener('resize', size);
    function loop() {
      if (!cv.isConnected) return;
      var c = colors(); t += RM ? 0 : 0.016 * st.speed;
      mouse.x += (mouse.tx - mouse.x) * 0.06; mouse.y += (mouse.ty - mouse.y) * 0.06;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      var camY = 5.6 + st.scroll * 3, horizon = H * 0.36, f = H * 0.9, cx = W > 900 ? W * 0.62 : W / 2;
      var mx = 3 + mouse.x * 12, mz = -6 - mouse.y * 6;
      for (var zi = 44; zi >= 0; zi--) {
        var z = -zi * 1 + 6, depth = 10 - z, a = Math.max(0, 1 - depth / 48);
        ctx.beginPath();
        for (var xi = -40; xi <= 40; xi++) {
          var x = xi * 0.7, h = fieldH(x, z, t, mx, mz) * st.amp;
          var sx = cx + (x - mouse.x * 1.2) / depth * f, sy = horizon + (camY - h) / depth * f;
          xi === -40 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        }
        ctx.lineTo(W + 10, H + 10); ctx.lineTo(-10, H + 10); ctx.closePath();
        ctx.fillStyle = c.bg; ctx.globalAlpha = 1; ctx.fill();
        ctx.strokeStyle = zi % 4 === 0 ? c.high : c.low; ctx.lineWidth = 1.2; ctx.globalAlpha = a * (zi % 4 === 0 ? 0.9 : 0.45); ctx.stroke();
      }
      ctx.globalAlpha = 1; requestAnimationFrame(loop);
    }
    loop();
    return { canvas: cv };
  }

  /* ---------- Project gallery: endless vertical columns of project videos and images ---------- */
  function gallery(el) {
    if (!el) return {};
    $$('.zx-gallery__col', el).forEach(function (col) {
      if (col.dataset.cloned) return; col.dataset.cloned = '1';
      Array.prototype.slice.call(col.children).forEach(function (t) { var c = t.cloneNode(true); c.setAttribute('aria-hidden', 'true'); col.appendChild(c); });
    });
    var vids = $$('video', el);
    vids.forEach(function (v) { v.muted = true; v.playsInline = true; v.loop = true; if (RM) v.removeAttribute('autoplay'); });
    function play(on) { vids.forEach(function (v) { if (on && !RM) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); }); }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { play(en[0].isIntersecting); }, { threshold: 0.05 }).observe(el);
    else play(true);
    document.addEventListener('visibilitychange', function () { play(!document.hidden); });
    return { play: function () { play(true); }, pause: function () { play(false); } };
  }

  /* ---------- Clients: logo strip + "see all" dialog with industry filters ---------- */
  function clients(el) {
    if (!el) return {};
    var track = $('.zx-logos__track', el);
    if (track && !track.dataset.cloned) { track.dataset.cloned = '1'; Array.prototype.slice.call(track.children).forEach(function (t) { var c = t.cloneNode(true); c.setAttribute('aria-hidden', 'true'); track.appendChild(c); }); }
    var dlg = $('dialog', el) || $('.zx-dialog');
    $$('[data-open-clients]', el).forEach(function (b) { b.addEventListener('click', function () { if (dlg && dlg.showModal) dlg.showModal(); }); });
    if (dlg) {
      $$('[data-close]', dlg).forEach(function (b) { b.addEventListener('click', function () { dlg.close(); }); });
      dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
      $$('[data-industry]', dlg).forEach(function (b) {
        b.addEventListener('click', function () {
          var f = b.dataset.industry;
          $$('[data-industry]', dlg).forEach(function (x) { x.classList.toggle('zx-btn--primary', x === b); x.classList.toggle('zx-btn--ghost', x !== b); });
          $$('.zx-client', dlg).forEach(function (c) { c.classList.toggle('is-out', f !== 'All' && c.dataset.industry !== f); });
        });
      });
    }
    return { open: function () { dlg && dlg.showModal(); } };
  }

  /* ---------- Node canvas (React Flow style): draggable nodes, animated edges, pan, zoom, minimap ---------- */
  function flowgraph(el, data) {
    if (!el || !data) return {};
    var NS = 'http://www.w3.org/2000/svg', uid = 'rf' + Math.random().toString(36).slice(2, 7);
    el.classList.add('zx-rf'); el.innerHTML = '';
    var vp = document.createElement('div'); vp.className = 'zx-rf__viewport';
    var svgE = document.createElementNS(NS, 'svg'); svgE.setAttribute('class', 'zx-rf__edges');
    var layer = document.createElement('div');
    vp.appendChild(svgE); vp.appendChild(layer); el.appendChild(vp);
    var ctr = document.createElement('div'); ctr.className = 'zx-rf__controls';
    ctr.innerHTML = '<button type="button" data-z="in" aria-label="Zoom in">+</button><button type="button" data-z="out" aria-label="Zoom out">&minus;</button><button type="button" data-z="fit" aria-label="Fit view">&#9633;</button>';
    el.appendChild(ctr);
    var mini = document.createElementNS(NS, 'svg'); mini.setAttribute('class', 'zx-rf__mini'); mini.setAttribute('aria-hidden', 'true'); el.appendChild(mini);
    if (data.hint !== false) { var hint = document.createElement('div'); hint.className = 'zx-rf__hint'; hint.textContent = data.hint || 'Drag nodes \u00b7 drag canvas to pan'; el.appendChild(hint); }
    var mobile = el.clientWidth < 700, nodes = {}, edges = [], view = { x: 0, y: 0, k: 1 }, bounds;
    data.nodes.forEach(function (n, i) {
      var pos = (mobile && n.m) ? n.m : n.p;
      var d = document.createElement('div');
      d.className = 'zx-rf__node' + (n.type ? ' zx-rf__node--' + n.type : '');
      if (n.w) d.style.setProperty('--w', n.w + 'px');
      d.style.setProperty('--d', (i * 70) + 'ms');
      d.innerHTML = '<header><span class="zx-rf__icon">' + (icons[n.icon] || icons.stack) + '</span><b>' + n.title + '</b></header>' + (n.text ? '<p>' + n.text + '</p>' : '') + (n.meta || n.status ? '<div class="zx-rf__meta"><span>' + (n.meta || '') + '</span>' + (n.status ? '<em>' + n.status + '</em>' : '') + '</div>' : '') + '<i class="zx-rf__h zx-rf__h--l"></i><i class="zx-rf__h zx-rf__h--r"></i>' + (n.tb ? '<i class="zx-rf__h zx-rf__h--t"></i><i class="zx-rf__h zx-rf__h--b"></i>' : '');
      layer.appendChild(d);
      nodes[n.id] = { el: d, x: pos[0], y: pos[1], type: n.type };
      d.setAttribute('tabindex', '0'); d.setAttribute('role', 'group'); d.setAttribute('aria-label', n.title);
    });
    function place(n) { n.el.style.left = n.x + 'px'; n.el.style.top = n.y + 'px'; }
    Object.keys(nodes).forEach(function (k) { place(nodes[k]); });
    function size(n) { return { w: n.el.offsetWidth, h: n.el.offsetHeight }; }
    function anchor(n, side) {
      var s = size(n);
      if (side === 'l') return [n.x, n.y + s.h / 2]; if (side === 'r') return [n.x + s.w, n.y + s.h / 2];
      if (side === 't') return [n.x + s.w / 2, n.y]; return [n.x + s.w / 2, n.y + s.h];
    }
    function pick(a, b, e) {
      if (mobile && e.mfrom) return [e.mfrom, e.mto];
      if (e.from && e.to) return [e.from, e.to];
      var sa = size(a), sb = size(b), dx = (b.x + sb.w / 2) - (a.x + sa.w / 2), dy = (b.y + sb.h / 2) - (a.y + sa.h / 2);
      if (Math.abs(dy) > Math.abs(dx) * 1.1 && mobile) return dy > 0 ? ['b', 't'] : ['t', 'b'];
      if (Math.abs(dx) >= Math.abs(dy) * 0.6 || !mobile) return dx >= 0 ? ['r', 'l'] : ['l', 'r'];
      return dy > 0 ? ['b', 't'] : ['t', 'b'];
    }
    function pathD(e) {
      var a = nodes[e.s], b = nodes[e.t], sides = pick(a, b, e), p = anchor(a, sides[0]), q = anchor(b, sides[1]);
      var arc = mobile ? e.marc : e.arc;
      if (arc) { var lift = arc; return 'M' + p[0] + ' ' + p[1] + ' C' + p[0] + ' ' + (p[1] - lift) + ' ' + q[0] + ' ' + (q[1] - lift) + ' ' + q[0] + ' ' + q[1]; }
      var horiz = sides[0] === 'l' || sides[0] === 'r', c = sides[0] === sides[1] ? 56 : Math.max(40, (horiz ? Math.abs(q[0] - p[0]) : Math.abs(q[1] - p[1])) * .5);
      var dir = { l: [-1, 0], r: [1, 0], t: [0, -1], b: [0, 1] };
      var d1 = dir[sides[0]], d2 = dir[sides[1]];
      return 'M' + p[0] + ' ' + p[1] + ' C' + (p[0] + d1[0] * c) + ' ' + (p[1] + d1[1] * c) + ' ' + (q[0] + d2[0] * c) + ' ' + (q[1] + d2[1] * c) + ' ' + q[0] + ' ' + q[1];
    }
    data.edges.forEach(function (e, i) {
      var g = document.createElementNS(NS, 'g'), path = document.createElementNS(NS, 'path'), id = uid + 'e' + i;
      path.setAttribute('id', id); path.setAttribute('class', 'zx-rf__edge' + (e.back ? ' is-back' : e.anim === false ? '' : ' is-anim'));
      g.appendChild(path);
      var dot = null;
      if (!e.back && e.pulse !== false && !RM) {
        dot = document.createElementNS(NS, 'circle'); dot.setAttribute('r', '3.2'); dot.setAttribute('class', 'zx-rf__pulse');
        var am = document.createElementNS(NS, 'animateMotion'); am.setAttribute('dur', (2.4 + (i % 3) * .5) + 's'); am.setAttribute('repeatCount', 'indefinite'); am.setAttribute('begin', (i * .3) + 's');
        var mp = document.createElementNS(NS, 'mpath'); mp.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + id); mp.setAttribute('href', '#' + id);
        am.appendChild(mp); dot.appendChild(am); g.appendChild(dot);
      }
      var lab = null, bg = null;
      if (e.label) { bg = document.createElementNS(NS, 'rect'); bg.setAttribute('class', 'zx-rf__elabel-bg'); bg.setAttribute('rx', '6'); lab = document.createElementNS(NS, 'text'); lab.setAttribute('class', 'zx-rf__elabel'); lab.setAttribute('text-anchor', 'middle'); lab.textContent = e.label; g.appendChild(bg); g.appendChild(lab); }
      svgE.appendChild(g);
      edges.push({ e: e, path: path, lab: lab, bg: bg });
    });
    function drawEdges() {
      edges.forEach(function (x) {
        x.path.setAttribute('d', pathD(x.e));
        if (x.lab) {
          var L = x.path.getTotalLength(), m = x.path.getPointAtLength(L / 2);
          x.lab.setAttribute('x', m.x); x.lab.setAttribute('y', m.y + 3.5);
          var w = x.e.label.length * 6.6 + 14; x.bg.setAttribute('x', m.x - w / 2); x.bg.setAttribute('y', m.y - 9); x.bg.setAttribute('width', w); x.bg.setAttribute('height', 18);
        }
      });
    }
    function calcBounds() {
      var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      Object.keys(nodes).forEach(function (k) { var n = nodes[k], s = size(n); x0 = Math.min(x0, n.x); y0 = Math.min(y0, n.y); x1 = Math.max(x1, n.x + s.w); y1 = Math.max(y1, n.y + s.h); });
      bounds = { x: x0, y: y0 - (data.top || 0), w: x1 - x0, h: y1 - y0 + (data.top || 0) };
      svgE.setAttribute('width', x1 + 200); svgE.setAttribute('height', y1 + 200);
    }
    function apply() { vp.style.transform = 'translate(' + view.x + 'px,' + view.y + 'px) scale(' + view.k + ')'; drawMini(); }
    function fit() {
      calcBounds();
      var W = el.clientWidth, H = el.clientHeight, pad = mobile ? 28 : 56;
      view.k = Math.min((W - pad * 2) / bounds.w, (H - pad * 2 - 30) / bounds.h, data.maxZoom || 1.1);
      view.x = (W - bounds.w * view.k) / 2 - bounds.x * view.k;
      view.y = (H - bounds.h * view.k) / 2 - bounds.y * view.k + 12;
      apply();
    }
    function drawMini() {
      if (!bounds) return;
      var mw = 150, mh = 96, k = Math.min((mw - 16) / bounds.w, (mh - 16) / bounds.h), ox = (mw - bounds.w * k) / 2 - bounds.x * k, oy = (mh - bounds.h * k) / 2 - bounds.y * k, h = '';
      Object.keys(nodes).forEach(function (id) { var n = nodes[id], s = size(n); h += '<rect class="n' + (n.type === 'core' ? ' c' : '') + '" rx="2" x="' + (ox + n.x * k) + '" y="' + (oy + n.y * k) + '" width="' + (s.w * k) + '" height="' + (s.h * k) + '"/>'; });
      var vx = (-view.x / view.k), vy = (-view.y / view.k), vw = el.clientWidth / view.k, vh = el.clientHeight / view.k;
      h += '<rect class="v" rx="3" x="' + (ox + vx * k) + '" y="' + (oy + vy * k) + '" width="' + (vw * k) + '" height="' + (vh * k) + '"/>';
      mini.innerHTML = h;
    }
    /* interactions */
    var drag = null;
    el.addEventListener('pointerdown', function (ev) {
      if (ev.target.closest('.zx-rf__controls')) return;
      var nodeEl = ev.target.closest('.zx-rf__node');
      el.setPointerCapture(ev.pointerId);
      if (nodeEl) {
        var id = Object.keys(nodes).filter(function (k) { return nodes[k].el === nodeEl; })[0];
        drag = { type: 'node', id: id, sx: ev.clientX, sy: ev.clientY, ox: nodes[id].x, oy: nodes[id].y };
        nodeEl.classList.add('is-drag'); el.classList.add('is-dragging');
        select(id);
      } else { drag = { type: 'pan', sx: ev.clientX, sy: ev.clientY, ox: view.x, oy: view.y }; el.classList.add('is-panning'); select(null); }
    });
    el.addEventListener('pointermove', function (ev) {
      if (!drag) return;
      var dx = ev.clientX - drag.sx, dy = ev.clientY - drag.sy;
      if (drag.type === 'node') { var n = nodes[drag.id]; n.x = drag.ox + dx / view.k; n.y = drag.oy + dy / view.k; place(n); drawEdges(); drawMini(); }
      else { view.x = drag.ox + dx; view.y = drag.oy + dy; apply(); }
    });
    function end() { if (!drag) return; if (drag.type === 'node') { nodes[drag.id].el.classList.remove('is-drag'); calcBounds(); drawMini(); } drag = null; el.classList.remove('is-panning', 'is-dragging'); }
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
    function select(id) {
      Object.keys(nodes).forEach(function (k) { nodes[k].el.classList.toggle('is-sel', k === id); });
      hot(id);
    }
    function hot(id) {
      el.classList.toggle('has-hot', !!id);
      edges.forEach(function (x) { x.path.classList.toggle('is-hot', !!id && (x.e.s === id || x.e.t === id)); });
    }
    Object.keys(nodes).forEach(function (id) {
      nodes[id].el.addEventListener('pointerenter', function () { if (!drag) hot(id); });
      nodes[id].el.addEventListener('pointerleave', function () { if (!drag) { var sel = Object.keys(nodes).filter(function (k) { return nodes[k].el.classList.contains('is-sel'); })[0]; hot(sel || null); } });
      nodes[id].el.addEventListener('focus', function () { select(id); });
    });
    ctr.addEventListener('click', function (ev) {
      var b = ev.target.closest('button'); if (!b) return;
      var z = b.dataset.z, W = el.clientWidth / 2, H = el.clientHeight / 2;
      if (z === 'fit') return fit();
      var f = z === 'in' ? 1.2 : 1 / 1.2, nk = Math.max(.25, Math.min(2.2, view.k * f));
      view.x = W - (W - view.x) * (nk / view.k); view.y = H - (H - view.y) * (nk / view.k); view.k = nk; apply();
    });
    requestAnimationFrame(function () { drawEdges(); fit(); });
    setTimeout(function () { drawEdges(); fit(); }, 400);
    if (el._rfOff) window.removeEventListener('resize', el._rfOff);
    el._rfOff = function () { var m = el.clientWidth < 700; if (m !== mobile) { flowgraph(el, data); return; } fit(); };
    window.addEventListener('resize', el._rfOff);
    if ('IntersectionObserver' in window && !RM) new IntersectionObserver(function (en) { if (en[0].isIntersecting) el.classList.add('is-in'); }, { threshold: .2 }).observe(el);
    else el.classList.add('is-in');
    return { fit: fit, select: select, refresh: function () { drawEdges(); fit(); } };
  }

  /* ---------- Spotlight: pointer-following light inside cards (sets --mx/--my) ---------- */
  function spotlight(els) {
    list(els).forEach(function (el) {
      if (RM) return;
      el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
    });
  }
  /* ---------- Tabs: [role=tab][aria-controls] buttons switch .zx-case-panel panels ---------- */
  function tabs(el, opts) {
    if (!el) return {};
    opts = opts || {};
    var ts = $$('[role="tab"]', el), timer;
    function go(i) {
      ts.forEach(function (t, k) { var on = k === i, p = document.getElementById(t.getAttribute('aria-controls')); t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; if (p) p.classList.toggle('is-active', on); });
      cur = i;
    }
    var cur = 0;
    ts.forEach(function (t, i) {
      t.addEventListener('click', function () { go(i); stop(); });
      t.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { var n = (cur + (e.key === 'ArrowRight' ? 1 : -1) + ts.length) % ts.length; go(n); ts[n].focus(); stop(); } });
    });
    function stop() { clearInterval(timer); }
    if (opts.auto && !RM) timer = setInterval(function () { go((cur + 1) % ts.length); }, opts.auto);
    go(0);
    return { go: go };
  }

  /* ---------- Text reviews: loop marquee rows, filter a wall by source ---------- */
  function reviews(el) {
    if (!el) return {};
    $$('.zx-tr-row', el).forEach(function (row) {
      if (row.dataset.cloned) return; row.dataset.cloned = '1';
      Array.prototype.slice.call(row.children).forEach(function (c) { var d = c.cloneNode(true); d.setAttribute('aria-hidden', 'true'); row.appendChild(d); });
    });
    $$('[data-src-filter]', el).forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.dataset.srcFilter;
        $$('[data-src-filter]', el).forEach(function (x) { x.classList.toggle('zx-btn--primary', x === b); x.classList.toggle('zx-btn--ghost', x !== b); });
        $$('.zx-tr-wall .zx-tr', el).forEach(function (c) { c.classList.toggle('is-out', f !== 'all' && c.dataset.source !== f); });
      });
    });
    return {};
  }

  /* ---------- Generative stand-in for a review video (used when no src is given) ---------- */
  function standIn(canvas, seed, playing) {
    var ctx = canvas.getContext('2d'), t = seed * 10, hue = ['--brand', '--data', '--accent'][seed % 3];
    function draw() {
      var w = canvas.width = canvas.clientWidth * 1.5 || 300, h = canvas.height = canvas.clientHeight * 1.5 || 400;
      ctx.fillStyle = '#14100e'; ctx.fillRect(0, 0, w, h);
      var col = cssVar(hue) || '#d4ff3a';
      for (var i = 0; i < 5; i++) { var g = ctx.createRadialGradient(w * (0.5 + 0.35 * Math.sin(t * 0.3 + i)), h * (0.4 + 0.3 * Math.cos(t * 0.25 + i * 2)), 0, w / 2, h / 2, w * 0.9); g.addColorStop(0, i % 2 ? col : '#2e2622'); g.addColorStop(1, 'transparent'); ctx.globalAlpha = 0.18; ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }
      ctx.globalAlpha = 1; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath();
      for (var x = 0; x <= w; x += 6) { var y = h * 0.62 + Math.sin(x * 0.03 + t * 3) * Math.sin(x * 0.007 + t) * h * (playing() ? 0.07 : 0.025); x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke(); t += playing() ? 0.03 : 0.006;
    }
    (function loop() { if (!canvas.isConnected) return; draw(); requestAnimationFrame(loop); })();
  }

  /* ---------- Video review carousel ---------- */
  function carousel(el, opts) {
    opts = opts || {};
    var track = $('.zx-reviews__track', el), items = $$('.zx-review', el), dots = $('.zx-reviews__dots', el), idx = 0, timer;
    var modal = opts.modal || $('.zx-modal', el) || $('.zx-modal');
    items.forEach(function (it, i) {
      var frame = $('.zx-review__frame', it);
      if (!$('video', frame) && !$('img', frame)) { var cv = document.createElement('canvas'); cv.className = 'zx-review__poster'; frame.insertBefore(cv, frame.firstChild); standIn(cv, i, function () { return false; }); }
      if (dots) { var b = document.createElement('button'); b.setAttribute('aria-label', 'Review ' + (i + 1)); b.onclick = function () { go(i); }; dots.appendChild(b); }
      frame.addEventListener('click', function () { open(it, i); });
      frame.setAttribute('tabindex', '0'); frame.setAttribute('role', 'button');
      frame.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(it, i); } });
    });
    function layout() {
      var w = items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 24);
      var vp = el.querySelector('.zx-reviews__viewport').clientWidth, center = (vp - items[0].getBoundingClientRect().width) / 2;
      var shift = opts.align === 'start' ? -idx * w : center - idx * w;
      track.style.transform = 'translateX(' + shift + 'px)';
      items.forEach(function (it, i) { var d = i - idx; it.style.setProperty('--ry', (d === 0 ? 0 : Math.max(-1, Math.min(1, d)) * -18) + 'deg'); it.style.setProperty('--sc', d === 0 ? 1 : 0.9); it.style.setProperty('--op', Math.abs(d) > 2 ? 0.25 : d === 0 ? 1 : 0.6); it.setAttribute('aria-hidden', d === 0 ? 'false' : 'true'); });
      if (dots) $$('button', dots).forEach(function (b, i) { b.setAttribute('aria-current', i === idx ? 'true' : 'false'); });
    }
    function go(i) { idx = (i + items.length) % items.length; layout(); restart(); }
    function restart() { clearInterval(timer); if (!RM && opts.autoplay !== false) timer = setInterval(function () { go(idx + 1); }, opts.interval || 5500); }
    var prev = $('[data-prev]', el), next = $('[data-next]', el);
    if (prev) prev.onclick = function () { go(idx - 1); };
    if (next) next.onclick = function () { go(idx + 1); };
    el.addEventListener('pointerenter', function () { clearInterval(timer); });
    el.addEventListener('pointerleave', restart);
    el.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') go(idx + 1); if (e.key === 'ArrowLeft') go(idx - 1); });
    var sx = null; track.addEventListener('pointerdown', function (e) { sx = e.clientX; });
    track.addEventListener('pointerup', function (e) { if (sx !== null && Math.abs(e.clientX - sx) > 50) go(idx + (e.clientX < sx ? 1 : -1)); sx = null; });
    window.addEventListener('resize', layout);
    function open(it, i) {
      if (!modal) return;
      var box = $('.zx-modal__box', modal), src = it.dataset.src, bar;
      box.innerHTML = '';
      if (src) { var v = document.createElement('video'); v.src = src; v.controls = true; v.autoplay = true; v.playsInline = true; box.appendChild(v); }
      else {
        var cv = document.createElement('canvas'); box.appendChild(cv); var playing = true; standIn(cv, i, function () { return playing; });
        var cap = document.createElement('div'); cap.className = 'zx-review__cap'; cap.innerHTML = $('.zx-review__cap', it).innerHTML; box.appendChild(cap);
        bar = document.createElement('div'); bar.className = 'zx-review__bar'; bar.innerHTML = '<i></i>'; box.appendChild(bar);
        var t0 = performance.now(), dur = 8000; (function tick(t) { if (!modal.classList.contains('is-open')) { playing = false; return; } var p = Math.min(1, (t - t0) / dur); bar.firstChild.style.width = p * 100 + '%'; if (p < 1) requestAnimationFrame(tick); else playing = false; })(t0);
      }
      var x = document.createElement('button'); x.className = 'zx-btn zx-btn--ghost zx-btn--icon zx-btn--sm zx-modal__close'; x.style.background = 'rgba(12,9,8,.6)'; x.style.color = '#f4efe9'; x.setAttribute('aria-label', 'Close video'); x.innerHTML = icons.close; x.onclick = close; box.appendChild(x);
      modal.classList.add('is-open'); clearInterval(timer); x.focus();
    }
    function close() { modal.classList.remove('is-open'); var v = $('video', modal); if (v) v.pause(); restart(); }
    if (modal) { modal.addEventListener('click', function (e) { if (e.target === modal) close(); }); document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); }); }
    requestAnimationFrame(layout); setTimeout(layout, 300); restart();
    return { go: go };
  }

  /* ---------- Process flow ---------- */
  function flow(el, opts) {
    opts = opts || {};
    var steps = $$('.zx-step', el), rail = $('.zx-flow__rail i', el), cur = -1;
    function set(i) { cur = i; steps.forEach(function (s, k) { s.classList.toggle('is-active', k <= i); }); if (rail) rail.style.setProperty('--p', steps.length > 1 ? i / (steps.length - 1) : 1); }
    if (opts.auto || RM) { var i = 0; set(0); if (!RM) setInterval(function () { i = (i + 1) % steps.length; set(i); }, opts.interval || 1800); else set(steps.length - 1); return; }
    function onScroll() {
      var mid = window.innerHeight * 0.55, best = -1;
      steps.forEach(function (s, k) { if (s.getBoundingClientRect().top < mid) best = k; });
      if (best !== cur) set(best);
    }
    document.addEventListener('scroll', onScroll, true); window.addEventListener('resize', onScroll); onScroll();
  }

  /* ---------- Project brief wizard ---------- */
  function wizard(el, opts) {
    opts = opts || {};
    var panes = $$('.zx-wizard__pane', el), bars = $$('.zx-wizard__steps i', el), back = $('[data-back]', el), next = $('[data-next]', el), i = 0;
    function show() {
      panes.forEach(function (p, k) { p.classList.toggle('is-active', k === i); });
      bars.forEach(function (b, k) { b.classList.toggle('is-done', k <= i); });
      if (back) back.disabled = i === 0;
      if (next) next.innerHTML = (i === panes.length - 1 ? 'Send brief ' : 'Continue ') + icons.arrow;
      var lbl = $('[data-step-label]', el); if (lbl) lbl.textContent = 'Step ' + (i + 1) + ' of ' + panes.length;
    }
    if (back) back.onclick = function () { if (i > 0) { i--; show(); } };
    if (next) next.onclick = function () {
      var req = $$('[required]', panes[i]).filter(function (f) { return f.type === 'radio' ? !$('input[name="' + f.name + '"]:checked', panes[i]) : !f.value.trim(); });
      if (req.length) { req[0].focus(); req[0].closest('.zx-options, .zx-field').animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 300 }); return; }
      if (i < panes.length - 1) { i++; show(); } else if (opts.onSubmit) opts.onSubmit(new FormData(el.tagName === 'FORM' ? el : $('form', el) || el));
    };
    $$('input[type="range"]', el).forEach(function (r) { var out = $('[data-out="' + r.name + '"]', el); function upd() { if (out) out.textContent = (r.dataset.prefix || '') + Number(r.value).toLocaleString() + (r.dataset.suffix || ''); } r.addEventListener('input', upd); upd(); });
    show();
    return { go: function (k) { i = k; show(); } };
  }

  /* ---------- Mini router for multi-page previews / SPAs ---------- */
  function router(root, opts) {
    opts = opts || {};
    var pages = $$('[data-page]', root), scroller = opts.scroller || document.scrollingElement;
    function go(name) {
      var found = false;
      pages.forEach(function (p) { var on = p.dataset.page === name; p.hidden = !on; if (on) found = true; });
      if (!found) return;
      $$('[data-to]', root).forEach(function (a) { if (a.closest('.zx-nav__links, .zx-nav__sheet, .zx-side')) a.setAttribute('aria-current', a.dataset.to === name ? 'page' : 'false'); });
      if (scroller) scroller.scrollTop = 0;
      var sheet = $('.zx-nav__sheet', root); if (sheet) sheet.classList.remove('is-open');
      if (opts.onChange) opts.onChange(name);
      reveal(root);
    }
    root.addEventListener('click', function (e) { var a = e.target.closest('[data-to]'); if (!a) return; e.preventDefault(); go(a.dataset.to); });
    return { go: go };
  }
  function nav(el) {
    var btn = $('.zx-nav__menu', el), sheet = $('.zx-nav__sheet', el) || $('.zx-nav__sheet');
    if (btn && sheet) { btn.onclick = function () { sheet.classList.toggle('is-open'); }; sheet.addEventListener('click', function (e) { if (e.target === sheet) sheet.classList.remove('is-open'); }); }
  }
  function icon(root) { $$('[data-icon]', root).forEach(function (el) { if (icons[el.dataset.icon]) el.innerHTML = icons[el.dataset.icon]; }); }


  /* ---------- Intro video: a blinking play pill opens an embedded video (YouTube, Vimeo, Loom or any iframe URL) ---------- */
  function embedUrl(u) {
    if (!u) return '';
    var m;
    if ((m = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/))) return 'https://www.youtube-nocookie.com/embed/' + m[1] + '?autoplay=1&rel=0&modestbranding=1';
    if ((m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return 'https://player.vimeo.com/video/' + m[1] + '?autoplay=1';
    if ((m = u.match(/loom\.com\/(?:share|embed)\/([\w]+)/))) return 'https://www.loom.com/embed/' + m[1] + '?autoplay=1';
    return u;
  }
  function intro(els) {
    var modal = document.getElementById('zx-intro-modal');
    if (!modal) {
      modal = document.createElement('div'); modal.id = 'zx-intro-modal'; modal.className = 'zx-modal zx-modal--intro';
      modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-label', 'Introduction video');
      modal.innerHTML = '<div class="zx-modal__box"></div>'; document.body.appendChild(modal);
      modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
    }
    var box = $('.zx-modal__box', modal), last = null;
    function close() { modal.classList.remove('is-open'); box.innerHTML = ''; if (last) last.focus(); }
    function open(btn) {
      last = btn; var src = embedUrl(btn.dataset.src || '');
      box.innerHTML = src
        ? '<iframe src="' + src.replace(/"/g, '&quot;') + '" title="' + (btn.dataset.title || 'Introduction video').replace(/"/g, '&quot;') + '" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>'
        : '<div class="zx-intro-empty"><span class="zx-eyebrow">Intro video</span><b>Your introduction video plays here.</b><span>Set its YouTube, Vimeo or Loom link and it opens in this player.</span></div>';
      var x = document.createElement('button'); x.className = 'zx-btn zx-btn--ghost zx-btn--icon zx-btn--sm zx-modal__close'; x.style.background = 'rgba(12,9,8,.6)'; x.style.color = '#f4efe9';
      x.setAttribute('aria-label', 'Close video'); x.innerHTML = icons.close; x.onclick = close; box.appendChild(x);
      modal.classList.add('is-open'); x.focus();
    }
    list(els).forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); open(b); });
      var dot = $('.zx-intro__dot', b), th = b.dataset.thumb;
      if (dot && th) { dot.style.backgroundImage = 'url("' + th.replace(/"/g, '') + '")'; dot.classList.add('has-thumb'); }
    });
    return { close: close };
  }

  /* ---------- Team grid: filter members by department ---------- */
  function team(el) {
    if (!el) return {};
    var btns = $$('[data-dept-filter]', el);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.dataset.deptFilter;
        btns.forEach(function (x) { x.classList.toggle('zx-btn--primary', x === b); x.classList.toggle('zx-btn--ghost', x !== b); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        $$('.zx-member', el).forEach(function (m) { m.classList.toggle('is-out', f !== 'all' && m.dataset.dept !== f); });
      });
    });
    return {};
  }

  /* ---------- Pricing switcher: [role=tab] plan options switch .zx-pricer__panel; price counts up ---------- */
  function pricer(el) {
    if (!el) return {};
    var opts = $$('.zx-pricer__opt', el), panels = $$('.zx-pricer__panel', el), cur = -1;
    function count(b, to) {
      if (!b || isNaN(to) || RM) return;
      var from = +(b.dataset.from || 0), t0 = null, pre = b.dataset.prefix || '';
      (function step(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 700), v = from + (to - from) * (1 - Math.pow(1 - p, 3)); b.textContent = pre + Math.round(v).toLocaleString('en-US'); if (p < 1) requestAnimationFrame(step); })(performance.now());
    }
    function go(i, focus) {
      var prev = cur >= 0 ? +(opts[cur].dataset.price || 0) : 0;
      cur = i;
      opts.forEach(function (o, k) { o.setAttribute('aria-selected', k === i ? 'true' : 'false'); o.tabIndex = k === i ? 0 : -1; });
      panels.forEach(function (p, k) { p.classList.toggle('is-active', k === i); p.hidden = k !== i; });
      el.style.setProperty('--pc', opts[i].style.getPropertyValue('--oc') || 'var(--brand)');
      var b = $('.zx-pricer__price b[data-to]', panels[i]); if (b) { b.dataset.from = prev || Math.round(+b.dataset.to * .7); count(b, +b.dataset.to); }
      if (focus) opts[i].focus();
    }
    opts.forEach(function (o, k) {
      o.addEventListener('click', function () { go(k); });
      o.addEventListener('keydown', function (e) { var d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0; if (d) { e.preventDefault(); go((cur + d + opts.length) % opts.length, true); } });
    });
    var start = opts.findIndex ? opts.findIndex(function (o) { return o.dataset.default === 'true'; }) : -1;
    go(start >= 0 ? start : 0);
    return { go: go };
  }

  /* ---------- Theme: dark / light, follows the device until the visitor picks one ---------- */
  function themeSaved() { try { return localStorage.getItem('zx-theme'); } catch (e) { return null; } }
  function themeNow() { var t = document.documentElement.getAttribute('data-theme'); if (t) return t; return window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; }
  function themeSet(t, save) {
    document.documentElement.setAttribute('data-theme', t);
    if (save) { try { localStorage.setItem('zx-theme', t); } catch (e) {} }
    $$('.zx-theme').forEach(function (b) { b.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode'); b.setAttribute('aria-pressed', String(t === 'light')); });
    try { document.dispatchEvent(new CustomEvent('zx:theme', { detail: t })); } catch (e) {}
  }
  function theme(root) {
    var saved = themeSaved();
    themeSet(saved || themeNow(), false);
    $$('.zx-theme', root || document).forEach(function (b) {
      if (b.__zxTheme) return; b.__zxTheme = 1;
      if (!b.innerHTML.trim()) b.innerHTML = '<span class="zx-theme__sun">' + icons.sun + '</span><span class="zx-theme__moon">' + icons.moon + '</span>';
      b.addEventListener('click', function () { themeSet(themeNow() === 'light' ? 'dark' : 'light', true); });
    });
    if (!theme.__mq && window.matchMedia) {
      theme.__mq = 1; var mq = matchMedia('(prefers-color-scheme: light)');
      var f = function (e) { if (!themeSaved()) themeSet(e.matches ? 'light' : 'dark', false); };
      if (mq.addEventListener) mq.addEventListener('change', f); else if (mq.addListener) mq.addListener(f);
    }
  }
  window.Zesxai = { theme: theme, icons: icons, icon: icon, reveal: reveal, split: split, tilt: tilt, magnetic: magnetic, glow: glow, counters: counters, hero3d: hero3d, gallery: gallery, clients: clients, flowgraph: flowgraph, spotlight: spotlight, tabs: tabs, reviews: reviews, carousel: carousel, flow: flow, wizard: wizard, router: router, nav: nav, intro: intro, embedUrl: embedUrl, team: team, pricer: pricer };
})();
