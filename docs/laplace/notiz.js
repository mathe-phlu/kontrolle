/* ───────── Die Notizleiste ─────────

   NEU (2026-08-22, Rikes Auftrag): «Kannst du für Maurus noch unten
   drunter ein Feld machen, wo man Notizen getippt oder handschriftlich
   machen kann, damit man gleich sieht, was zu tun ist, wo er anpassen
   würde?»

   Sie steht auf JEDER Seite - den vier Reflexionen und der Festigung -
   und sieht überall gleich aus. Wer durchsieht, soll nicht auf jeder
   Seite neu suchen, wo die Rückmeldung hingehört.

   ZWEI WEGE, wie verlangt:
     tippen        ein Textfeld
     schreiben     eine Fläche zum Zeichnen, mit Maus, Finger oder Stift

   WARUM SIE ALS BILD HERAUSKOMMT: Diese Seiten sind reine Dateien, es
   gibt keinen Server, der etwas entgegennähme. Ein Bild kann man in
   eine Mail hängen oder ausdrucken, und es trägt seinen Zusammenhang
   mit: Kapitel, Etappe, Datum stehen im Kopf. Eine Notiz ohne die
   Angabe, WO sie gilt, kostet eine Rückfrage - genau das, was
   RUECKMELDUNG.md vermeiden will.

   Der Text überlebt ausserdem das Neuladen (localStorage). Wer die
   Seite versehentlich schliesst, verliert nicht, was er geschrieben
   hat. Die Zeichnung ebenfalls.
*/
(function(){
  const SCHLUESSEL = 'kasper-notiz-' + location.pathname;

  function wo(){
    // Woher weiss die Notiz, wo sie gilt? Aus dem, was die Seite
    // gerade zeigt - nicht aus einer Zahl, die jemand eintippen muesste.
    const teile = [document.title];
    // Woher der Ort kommt, ist je Seite verschieden: Die Reflexionen
    // tragen ihn in der Auftragszeile (.titel), die Festigung oben
    // rechts (#wostehe). Beides wird gefragt.
    ['#wostehe', '.titel'].forEach(w => {
      const e = document.querySelector(w);
      if (e && e.textContent.trim()) teile.push(e.textContent.trim());
    });
    return teile.join(' · ');
  }

  const leiste = document.createElement('div');
  leiste.className = 'notizleiste';
  leiste.innerHTML =
      '<button class="notizgriff" type="button">'
    + '<span class="stift">✎</span> Notiz für die Rückmeldung'
    + '<span class="zart"> — was würden Sie hier anpassen?</span></button>'
    + '<div class="notizinhalt">'
    + '  <div class="notizwo"></div>'
    + '  <textarea class="notiztext" spellcheck="false" '
    + '    placeholder="Tippen: Was stört, und wie schlimm — Kleinigkeit, '
    + 'stört, geht so nicht."></textarea>'
    + '  <div class="notizmalen">'
    + '    <canvas class="notizblatt"></canvas>'
    + '    <div class="notizhinweis">Oder von Hand: hier zeichnen und schreiben.</div>'
    + '  </div>'
    + '  <div class="notizknoepfe">'
    + '    <button type="button" class="notizsichern">Notiz als Bild sichern</button>'
    + '    <button type="button" class="notizleeren">Zeichnung löschen</button>'
    + '    <span class="notizstand"></span>'
    + '  </div>'
    + '</div>';
  document.body.appendChild(leiste);

  const griff  = leiste.querySelector('.notizgriff');
  const text   = leiste.querySelector('.notiztext');
  const blatt  = leiste.querySelector('.notizblatt');
  const stand  = leiste.querySelector('.notizstand');
  const woFeld = leiste.querySelector('.notizwo');
  woFeld.textContent = wo();
  // Der Ort aendert sich mit der Etappe und mit der Welt. Ohne diese
  // Beobachtung stuende auf der Notiz, wo man ANGEFANGEN hat - und das
  // waere schlimmer als gar keine Angabe.
  new MutationObserver(() => { woFeld.textContent = wo(); })
    .observe(document.body, {childList: true, subtree: true,
                            characterData: true});

  griff.onclick = () => {
    leiste.classList.toggle('offen');
    if (leiste.classList.contains('offen')) blattGroesse();
  };

  /* ---- das Blatt zum Schreiben ---- */
  const stift = blatt.getContext('2d');
  let malt = false, letzte = null;

  function blattGroesse(){
    // Die Zeichnung wuerde beim Groesseaendern verloren gehen - deshalb
    // erst sichern, dann neu aufspannen, dann zurueckmalen.
    const alt = blatt.width ? blatt.toDataURL() : null;
    const b = blatt.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    blatt.width = Math.max(1, Math.round(b.width * dpr));
    blatt.height = Math.max(1, Math.round(b.height * dpr));
    stift.setTransform(dpr, 0, 0, dpr, 0, 0);
    stift.lineCap = 'round'; stift.lineJoin = 'round';
    stift.lineWidth = 2; stift.strokeStyle = '#2d2924';
    if (alt){
      const im = new Image();
      im.onload = () => stift.drawImage(im, 0, 0, b.width, b.height);
      im.src = alt;
    } else {
      const g = localStorage.getItem(SCHLUESSEL + '-bild');
      if (g){ const im = new Image();
              im.onload = () => stift.drawImage(im, 0, 0, b.width, b.height);
              im.src = g; }
    }
  }

  const punkt = e => {
    const r = blatt.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  blatt.addEventListener('pointerdown', e => {
    malt = true; letzte = punkt(e); blatt.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  blatt.addEventListener('pointermove', e => {
    if (!malt) return;
    const p = punkt(e);
    stift.beginPath(); stift.moveTo(letzte[0], letzte[1]);
    stift.lineTo(p[0], p[1]); stift.stroke();
    letzte = p;
  });
  ['pointerup','pointercancel'].forEach(t =>
    blatt.addEventListener(t, () => { if (malt){ malt = false; sichern(); } }));

  /* ---- merken, damit ein Neuladen nichts kostet ---- */
  let uhr = null;
  function sichern(){
    clearTimeout(uhr);
    uhr = setTimeout(() => {
      localStorage.setItem(SCHLUESSEL, text.value);
      try { localStorage.setItem(SCHLUESSEL + '-bild', blatt.toDataURL()); }
      catch (_) {}
      stand.textContent = 'gemerkt';
      setTimeout(() => { stand.textContent = ''; }, 1600);
    }, 400);
  }
  text.value = localStorage.getItem(SCHLUESSEL) || '';
  text.addEventListener('input', sichern);

  leiste.querySelector('.notizleeren').onclick = () => {
    stift.clearRect(0, 0, blatt.width, blatt.height);
    localStorage.removeItem(SCHLUESSEL + '-bild');
  };

  /* ---- die Notiz als Bild ---- */
  leiste.querySelector('.notizsichern').onclick = () => {
    const rand = 18, breite = 900;
    const kopf = 74;
    const zeilen = (text.value || '').split('\n')
      .flatMap(z => z.match(/.{1,86}/g) || ['']);
    const textH = zeilen.length * 20 + 12;
    const bb = blatt.getBoundingClientRect();
    const malH = Math.round(bb.height * (breite - 2 * rand) / bb.width);
    const c = document.createElement('canvas');
    const dpr = 2;
    c.width = breite * dpr;
    c.height = (kopf + textH + malH + rand) * dpr;
    const g = c.getContext('2d');
    g.scale(dpr, dpr);
    g.fillStyle = '#fffefb';
    g.fillRect(0, 0, breite, kopf + textH + malH + rand);
    g.fillStyle = '#9867A5';
    g.fillRect(0, 0, breite, 5);
    g.fillStyle = '#2d2924';
    g.font = '600 17px "Fira Sans", sans-serif';
    g.fillText('Notiz zur Rückmeldung', rand, 34);
    g.fillStyle = '#6c6357';
    g.font = '13px "Fira Sans", sans-serif';
    g.fillText(wo(), rand, 56);
    const heute = new Date().toLocaleDateString('de-CH');
    g.fillText(heute, breite - rand - g.measureText(heute).width, 56);
    g.fillStyle = '#2d2924';
    g.font = '15px "Fira Sans", sans-serif';
    zeilen.forEach((z, i) => g.fillText(z, rand, kopf + i * 20));
    g.drawImage(blatt, rand, kopf + textH, breite - 2 * rand, malH);
    c.toBlob(b => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.download = 'notiz-' + document.title.replace(/[^\wäöüÄÖÜ]+/g, '-')
                            .replace(/^-|-$/g, '') + '.png';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 3000);
    });
  };

  window.addEventListener('resize', () => {
    if (leiste.classList.contains('offen')) blattGroesse();
  });
})();
