"use strict";
/* Binomialverteilung - GEMEINSAME QUELLE fuer das sigma-Labor und die
   Reflexion zu Kapitel 7 (themen/bernoulli).

   NEU (2026-09-29): Herausgeloest aus labor.js, damit das Probierwerkzeug
   in der Reflexion dieselbe Rechnung benutzt und nicht eine zweite
   Fassung davon (thema.md von bernoulli, «Technik»). Der Inhalt ist
   Zeile fuer Zeile der alte; einzige Aenderung: histogramm() faellt auf
   eine feste Balkenfarbe zurueck, wenn die Seite --balken nicht kennt.

   Alles steht in EINEM Namensraum `BINOM`, damit die Namen nicht mit der
   gemeinsamen Flaeche (kern/flaechen/flaeche/flaeche.js) zusammenstossen.

   Eingebunden wird die Datei beim Bauen:
     sigmalabor/bauen.py   legt sie VOR labor.js in die Seite
     bernoulli/flaeche.py  legt sie VOR etappen.js in dieselbe Datei
   Die Referenzwerte rechnet weiterhin bauen.py (Python) nach. */
const BINOM = (function () {
  /* ------------------------------------------------------------------
     Rechnen: Binomialverteilung ueber Logarithmen (Lanczos-lgamma).
     Stimmt fuer n bis 2000 - geprueft gegen Python (bauen.py).
     ------------------------------------------------------------------ */
  const LANCZOS = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

  function lgamma(x) {
    if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lgamma(1 - x);
    x -= 1;
    let s = LANCZOS[0];
    const t = x + 7.5;
    for (let i = 1; i < 9; i++) s += LANCZOS[i] / (x + i);
    return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(s);
  }

  function logPmf(n, p, k) {
    if (k < 0 || k > n) return -Infinity;
    if (p <= 0) return k === 0 ? 0 : -Infinity;
    if (p >= 1) return k === n ? 0 : -Infinity;
    return lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1)
      + k * Math.log(p) + (n - k) * Math.log1p(-p);
  }

  // Alle Einzelwahrscheinlichkeiten P(X = k), k = 0..n
  function verteilung(n, p) {
    const f = new Float64Array(n + 1);
    for (let k = 0; k <= n; k++) f[k] = Math.exp(logPmf(n, p, k));
    return f;
  }

  // P(a <= X <= b)
  function summe(f, a, b) {
    const n = f.length - 1;
    a = Math.max(a, 0); b = Math.min(b, n);
    let s = 0;
    for (let k = a; k <= b; k++) s += f[k];
    return Math.min(1, s);
  }

  // Wortform -> [a; b]. Muss mit intervall() in bauen.py uebereinstimmen.
  function INTERVALL(form, n, k, a, b) {
    switch (form) {
      case "genau": return [k, k];
      case "hoechstens": return [0, k];
      case "mindestens": return [k, n];
      case "mehrals": return [k + 1, n];
      case "wenigerals": return [0, k - 1];
      default: return [a, b];
    }
  }

  // Ganzzahlige Grenzen wie im Skript: nur Balken ganz im Band.
  function sigmaGrenzen(n, p, c) {
    const mu = n * p, s = Math.sqrt(n * p * (1 - p));
    const a = Math.max(0, Math.ceil(mu - c * s - 1e-9));
    const b = Math.min(n, Math.floor(mu + c * s + 1e-9));
    return { mu, s, a, b };
  }

  /* ------------------------------------------------------------------
     Eingabe lesen, Zahlen schreiben
     ------------------------------------------------------------------ */
  // p darf als 0.4, 0,4, 1/6 oder 40 % kommen
  function leseP(txt) {
    let t = String(txt).trim().replace(/\s+/g, "").replace(",", ".");
    let faktor = 1;
    if (t.endsWith("%")) { faktor = 0.01; t = t.slice(0, -1); }
    let x;
    const m = t.match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
    if (m) x = Number(m[1]) / Number(m[2]);
    else if (/^\d*\.?\d+$/.test(t)) x = Number(t);
    else return NaN;
    x *= faktor;
    return (x >= 0 && x <= 1) ? x : NaN;
  }

  function leseGanz(txt) {
    const t = String(txt).trim();
    return /^-?\d+$/.test(t) ? parseInt(t, 10) : NaN;
  }

  function zahl(x, d) {
    // hoechstens d Nachkommastellen, ohne nachlaufende Nullen
    let s = x.toFixed(d);
    if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
    return s;
  }

  /* Prozent mit einer Stelle; mehr Stellen, wenn die Rundung sonst
     taeuschen wuerde (94.96 % als «95.0 %» bei Ziel >= 95 %) oder wenn
     der Wert ganz nahe bei 0 oder 100 liegt. */
  function prozent(P, ziel) {
    for (let d = 1; d <= 4; d++) {
      const s = (100 * P).toFixed(d), r = Number(s);
      let ok = true;
      if (P < 1 && r >= 100) ok = false;
      if (P > 0 && r <= 0) ok = false;
      if (ziel && vergleiche(r / 100, ziel) !== vergleiche(P, ziel)) ok = false;
      if (ok) return s + " %";
    }
    if (P > 0.5) return "≈ 100 %";
    return "≈ 0 %";
  }

  function vergleiche(P, ziel) {
    const w = ziel.wert / 100;
    return ziel.op === ">" ? P > w : P >= w;
  }

  function intervallText(a, b) {
    return a > b ? "∅ (leer)" : "[" + a + "; " + b + "]";
  }

  /* ------------------------------------------------------------------
     SVG-Helfer
     ------------------------------------------------------------------ */
  const SVGNS = "http://www.w3.org/2000/svg";
  function S(tag, attr, eltern) {
    const e = document.createElementNS(SVGNS, tag);
    for (const k in attr) e.setAttribute(k, attr[k]);
    if (eltern) eltern.appendChild(e);
    return e;
  }
  function schrittweite(spanne, ziel) {
    const roh = spanne / ziel, e = Math.pow(10, Math.floor(Math.log10(roh)));
    for (const m of [1, 2, 5, 10]) if (m * e >= roh) return m * e;
    return 10 * e;
  }
  function farbe(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  /* ------------------------------------------------------------------
     Histogramm von B(n; p)
     opt: a, b (Intervall, farbig), band {mu, s, c} (nur σ-Labor)
     NEU (2026-10-10, Kapitel 7 Etappe 2): baender [{mu, s, c, a, b,
     farbe}] - mehrere Baender μ ± cσ zugleich, schmalstes zuerst; ein
     Balken bekommt die Farbe des schmalsten Bandes, in dem er ganz
     liegt. glocke: true legt die Normalverteilungsdichte mit demselben
     μ und σ als Umriss darueber. Ohne diese beiden Angaben zeichnet die
     Funktion genau wie vorher (σ-Labor, «Probieren»).
     ------------------------------------------------------------------ */
  function histogramm(svg, f, opt) {
    svg.textContent = "";
    const n = f.length - 1;
    const W = 820, Hh = opt.hoehe || 300, L = 54, R = 14, O = 26, U = 38;
    svg.setAttribute("viewBox", "0 0 " + W + " " + Hh);

    // Ausschnitt: dort, wo Masse liegt. Kleine n ganz.
    let lo = 0, hi = n;
    if (n > 40) {
      let max = 0;
      for (let k = 0; k <= n; k++) if (f[k] > max) max = f[k];
      const schwelle = max * 1e-4;
      while (lo < n && f[lo] < schwelle) lo++;
      while (hi > 0 && f[hi] < schwelle) hi--;
      // Intervall, das ganz neben der Masse liegt, noch zeigen
      if (opt.a <= opt.b) {
        if (opt.a > hi) hi = Math.min(n, opt.a + 2);
        if (opt.b < lo) lo = Math.max(0, opt.b - 2);
      }
      // mindestens 15 Balken
      while (hi - lo < 14) { if (lo > 0) lo--; if (hi < n) hi++; if (lo === 0 && hi === n) break; }
    }
    let ymax = 0;
    for (let k = lo; k <= hi; k++) if (f[k] > ymax) ymax = f[k];
    ymax = Math.max(ymax * 1.08, 1e-12);

    const bw = (W - L - R) / (hi - lo + 1);
    const X = v => L + (v - lo + 0.5) * bw;       // Balkenmitte bei k
    const Y = v => Hh - U - (v / ymax) * (Hh - U - O);

    // Gitter und y-Achse (in %)
    const ys = schrittweite(ymax * 100, 5) / 100;
    for (let v = 0; v <= ymax + 1e-15; v += ys) {
      S("line", { x1: L, x2: W - R, y1: Y(v), y2: Y(v), class: "gitter" }, svg);
      const t = S("text", { x: L - 6, y: Y(v) + 4, "text-anchor": "end", class: "zahl" }, svg);
      t.textContent = zahl(v * 100, 3) + " %";
    }

    // Mehrere Baender (Kapitel 7): breitestes zuerst, damit die schmalen obenauf liegen
    const baender = opt.baender || null;
    if (baender) {
      baender.slice().reverse().forEach(bd => {
        const x1 = Math.max(L, X(bd.mu - bd.c * bd.s));
        const x2 = Math.min(W - R, X(bd.mu + bd.c * bd.s));
        if (x2 > x1) S("rect", { x: x1, y: O + 10, width: x2 - x1, height: Hh - U - O - 10,
          fill: bd.farbe, "fill-opacity": 0.07 }, svg);
      });
    }

    // Band (σ-Labor)
    const band = opt.band;
    if (band) {
      const def = S("defs", {}, svg);
      const pat = S("pattern", { id: "schraffur", width: 8, height: 8,
        patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, def);
      S("rect", { width: 8, height: 8, fill: band.farbe, "fill-opacity": 0.08 }, pat);
      S("line", { x1: 0, y1: 0, x2: 0, y2: 8, stroke: band.farbe, "stroke-width": 2, "stroke-opacity": 0.35 }, pat);
      const x1 = Math.max(L, X(band.mu - band.c * band.s));
      const x2 = Math.min(W - R, X(band.mu + band.c * band.s));
      if (x2 > x1) S("rect", { x: x1, y: O - 6, width: x2 - x1, height: Hh - U - O + 6, fill: "url(#schraffur)" }, svg);
    }

    // Balken
    // Rueckfall fuer Seiten ohne --balken (die Flaeche von Kapitel 7)
    const aus = farbe("--balken") || "#d9ccb6", an = band ? band.farbe : farbe("--akzent");
    const luecke = bw > 6 ? Math.min(2, bw * 0.15) : 0;
    for (let k = lo; k <= hi; k++) {
      const drin = k >= opt.a && k <= opt.b;
      let fuell = drin ? an : aus;
      if (baender) {
        const bd = baender.find(x => k >= x.a && k <= x.b);
        fuell = bd ? bd.farbe : aus;
      }
      const r = S("rect", { x: X(k) - bw / 2 + luecke / 2, y: Y(f[k]), width: Math.max(bw - luecke, 0.5),
        height: Math.max(Hh - U - Y(f[k]), 0), fill: fuell }, svg);
      S("title", {}, r).textContent = "P(X = " + k + ") = " + prozent(f[k]);
    }

    // x-Achse
    S("line", { x1: L, x2: W - R, y1: Hh - U, y2: Hh - U, class: "achse" }, svg);
    const xs = Math.max(1, Math.round(schrittweite(hi - lo + 1, 12)));
    for (let k = Math.ceil(lo / xs) * xs; k <= hi; k += xs) {
      S("line", { x1: X(k), x2: X(k), y1: Hh - U, y2: Hh - U + 4, class: "achse" }, svg);
      const t = S("text", { x: X(k), y: Hh - U + 17, "text-anchor": "middle", class: "zahl" }, svg);
      t.textContent = k;
    }
    const tx = S("text", { x: W - R, y: Hh - 4, "text-anchor": "end", class: "zahl" }, svg);
    tx.textContent = "Anzahl Treffer k" + (lo > 0 || hi < n ? "  (Ausschnitt " + lo + " bis " + hi + " von 0 bis " + n + ")" : "");

    // Hinweis, wenn das Intervall ueber den Ausschnitt hinausreicht
    if (opt.a <= opt.b) {
      if (opt.b > hi && opt.a <= hi) {
        const t = S("text", { x: W - R, y: O - 8, "text-anchor": "end", class: "zahl" }, svg);
        t.textContent = "Intervall geht weiter bis " + opt.b + " →";
      }
      if (opt.a < lo && opt.b >= lo) {
        const t = S("text", { x: L, y: O - 8, "text-anchor": "start", class: "zahl" }, svg);
        t.textContent = "← Intervall beginnt bei " + opt.a;
      }
    }

    // Kapitel 7: Linien bei mu und mu -+ c*sigma fuer jedes Band,
    // Beschriftung gestaffelt, damit nahe Linien sich nicht ueberdecken
    if (baender) {
      const linie = (v, farbeL, stark, text, zeile) => {
        const x = X(v);
        if (x < L || x > W - R) return;
        S("line", { x1: x, x2: x, y1: O + 10, y2: Hh - U, stroke: farbeL,
          "stroke-width": stark ? 1.5 : 1.6, "stroke-dasharray": stark ? "" : "5 4" }, svg);
        if (text) {
          const t = S("text", { x: x, y: O - 12 + zeile * 11, "text-anchor": "middle", class: "zahl" }, svg);
          t.setAttribute("fill", farbeL);
          t.textContent = text;
        }
      };
      baender.forEach((bd, i) => {
        const cz = bd.c === 1 ? "" : zahl(bd.c, 2);
        linie(bd.mu - bd.c * bd.s, bd.farbe, false, "−" + cz + "σ", i);
        linie(bd.mu + bd.c * bd.s, bd.farbe, false, "+" + cz + "σ", i);
      });
      linie(baender[0].mu, farbe("--tinte") || "#2d2924", true, "μ", 0);
    }

    // Glockenkurve als Umriss: Dichte der Normalverteilung mit μ und σ,
    // in derselben Einheit wie die Balken (Wahrscheinlichkeit je Treffer).
    if (opt.glocke && opt.glocke.s > 0) {
      const g = opt.glocke, pkte = [];
      for (let i = 0; i <= 240; i++) {
        const v = lo - 0.5 + (hi - lo + 1) * i / 240;
        const z = (v - g.mu) / g.s;
        const y = Math.exp(-z * z / 2) / (g.s * Math.sqrt(2 * Math.PI));
        pkte.push(X(v).toFixed(1) + "," + Math.max(O - 6, Y(y)).toFixed(1));
      }
      S("polyline", { points: pkte.join(" "), fill: "none", stroke: farbe("--tinte") || "#2d2924",
        "stroke-width": 1.8, "stroke-opacity": 0.75 }, svg);
    }

    // Linien bei mu und mu -+ c*sigma
    if (band) {
      const linie = (v, text, stark) => {
        const x = X(v);
        if (x < L || x > W - R) return;
        S("line", { x1: x, x2: x, y1: O - 4, y2: Hh - U, stroke: stark ? farbe("--tinte") : band.farbe,
          "stroke-width": stark ? 1.5 : 2, "stroke-dasharray": stark ? "" : "5 4" }, svg);
        const t = S("text", { x: x, y: O - 9, "text-anchor": "middle" }, svg);
        t.textContent = text;
      };
      const cz = zahl(band.c, 2);
      linie(band.mu, "μ", true);
      linie(band.mu - band.c * band.s, "μ − " + (cz === "1" ? "" : cz + "·") + "σ", false);
      linie(band.mu + band.c * band.s, "μ + " + (cz === "1" ? "" : cz + "·") + "σ", false);
    }
  }

  /* ------------------------------------------------------------------
     Streudiagramm «σ gegen P» (Punkte farbig nach c)
     NEU (2026-10-10): aus labor.js (streuung) herausgeloest, damit
     Kapitel 7, Etappe 2 dasselbe Diagramm zeigt. Zeichnung unveraendert.
     punkte: [{n, p, c, s, P, a, b}]; opt.farbe(q) liefert die Farbe,
     opt.hoehe (Vorgabe 210), opt.leer (Text ohne Punkte).
     ------------------------------------------------------------------ */
  function streudiagramm(svg, pk, opt) {
    svg.textContent = "";
    const W = 820, Hh = opt.hoehe || 210, L = 54, R = 14, O = 12, U = 38;
    svg.setAttribute("viewBox", "0 0 " + W + " " + Hh);
    let smax = 5, pmin = 0.4;
    for (const q of pk) { smax = Math.max(smax, q.s); pmin = Math.min(pmin, q.P); }
    const xs = schrittweite(smax, 8);
    smax = Math.ceil(smax * 1.02 / xs) * xs;
    pmin = Math.floor(pmin * 10) / 10;
    const X = v => L + v / smax * (W - L - R);
    const Y = v => O + (1 - (v - pmin) / (1 - pmin)) * (Hh - O - U);
    for (let v = pmin; v <= 1.0001; v += 0.1) {
      S("line", { x1: L, x2: W - R, y1: Y(v), y2: Y(v), class: "gitter" }, svg);
      const t = S("text", { x: L - 6, y: Y(v) + 4, "text-anchor": "end", class: "zahl" }, svg);
      t.textContent = Math.round(v * 100) + " %";
    }
    S("line", { x1: L, x2: W - R, y1: Hh - U, y2: Hh - U, class: "achse" }, svg);
    S("line", { x1: L, x2: L, y1: O, y2: Hh - U, class: "achse" }, svg);
    for (let v = 0; v <= smax + 1e-9; v += xs) {
      S("line", { x1: X(v), x2: X(v), y1: Hh - U, y2: Hh - U + 4, class: "achse" }, svg);
      const t = S("text", { x: X(v), y: Hh - U + 17, "text-anchor": "middle", class: "zahl" }, svg);
      t.textContent = zahl(v, 2);
    }
    const tx = S("text", { x: W - R, y: Hh - 4, "text-anchor": "end", class: "zahl" }, svg);
    tx.textContent = "Standardabweichung σ";
    if (!pk.length) {
      const t = S("text", { x: (L + W - R) / 2, y: (O + Hh - U) / 2, "text-anchor": "middle", class: "zahl" }, svg);
      t.textContent = opt.leer || "Hier erscheinen die festgehaltenen Punkte.";
    }
    pk.forEach((q, i) => {
      const kr = S("circle", { cx: X(q.s), cy: Y(q.P), r: 5, fill: opt.farbe(q),
        "fill-opacity": 0.8, stroke: i === pk.length - 1 ? farbe("--tinte") : "#fff", "stroke-width": 1.5 }, svg);
      S("title", {}, kr).textContent = "n = " + q.n + ", p = " + q.p + ", c = " + zahl(q.c, 2)
        + ": σ ≈ " + zahl(q.s, 2) + ", P(" + q.a + " ≤ X ≤ " + q.b + ") = " + prozent(q.P);
    });
  }

  const NMAX = 2000;
  const FORMEN = [
    ["genau", "genau k"], ["hoechstens", "höchstens k"], ["mindestens", "mindestens k"],
    ["mehrals", "mehr als k"], ["wenigerals", "weniger als k"], ["vonbis", "von a bis b"]];
  const FORM_WORT = { genau: "genau", hoechstens: "höchstens", mindestens: "mindestens",
    mehrals: "mehr als", wenigerals: "weniger als" };
  return { lgamma, logPmf, verteilung, summe, INTERVALL, sigmaGrenzen, leseP, leseGanz, zahl, prozent, vergleiche, intervallText, SVGNS, S, schrittweite, farbe, histogramm, streudiagramm, NMAX, FORMEN, FORM_WORT };
})();

/* Die zwei Etappen von Kapitel 7 - «Vier Groessen, und welche fehlt?».

   Erste Fassung 2026-09-29, Fassung 2 vom 2026-10-10, Fassung 3 vom
   2026-10-16 (thema.md, «FASSUNG 3 — verbindlich»).

   E1  Was ist gesucht, und wie wird gerechnet?
         Textmarker   vier Stifte n · p · k · P und ein Radierer ueber den
                      Karten. Erst den Stift waehlen, dann ueber den Text
                      streichen oder Woerter anklicken. Nicht geprueft.
         Vier Felder  n, p, k, P auf jeder Karte, in den Farben der Stifte
                      (n blau, p gruen, k lila, P gelb). Eingetragen wird,
                      was gegeben ist; genau ein Feld bekommt «?».
                      NEU (gemeinsam entschieden, Fassung 3): k hat vier
                      Formen X = k · X ≤ k · X ≥ k · a ≤ X ≤ b. Ist k
                      gesucht, bleibt die Form stehen, die Zahl ist «?»
                      («X ≤ ?»). NEU (gemeinsam entschieden, Nachtrag
                      2026-10-16): «keine Trefferzahl» ist gestrichen. Bei
                      Aufgaben, die keine Binomialaufgaben sind, bleiben
                      die Felder leer und werden nicht geprueft.
         Faelle       NEU (gemeinsam entschieden, Rike 2026-10-16: «7.2 macht
                      keinen Sinn, weil wir jetzt schon die
                      Fallunterscheidung vorgeben.»): Jede Karte beginnt
                      mit EINER Zeile n, p, k. Auf jeder Karte steht
                      unauffaellig «+ weiterer Fall» - auf allen, damit es
                      nichts verraet. Karten mit mehreren Faellen im Soll
                      (Tennis 7.2, Glücksritter 7.7) werden nicht hart
                      geprueft (gestrichelt, «Mehrere Fälle – vergleichen
                      Sie mit der Lösung»); die Loesung zeigt die
                      Fallaufteilung des Skripts. Bei allen anderen Karten
                      meldet ein zusaetzlicher Fall «Hier genügt ein Fall».
                      Gleichwertige k-Formen zaehlen.
         Gruppieren   NEU (gemeinsam entschieden, Nachtrag 2026-10-16, Rike
                      «ja»: «Etappe 1 frei sortieren»): keine vorgegebenen
                      Faecher. Die Karten werden frei gruppiert, jede
                      Gruppe bekommt einen selbst gewaehlten Namen (Mechanik
                      wie Reflexion 1, Etappe 2). Unter jeder Gruppe «Wie
                      löst man diese Aufgaben?». Die Gruppierung wird nicht
                      geprueft. Sind alle Karten gelegt und alle Gruppen
                      benannt, zeigt «Eine mögliche Sicht» die Einteilung in
                      fuenf Gruppen (thema.FAECHER und ABLAGE) zum Vergleich.
       Liegt eine Karte in einer Gruppe, zeigt sie ihre Eintraege in EINER
       Zeile, das Gesuchte gelb unterlegt (Fassung 3).
   E2  Gibt es eine Abkuerzung fuers Austesten?
       NEU (gemeinsam entschieden, Fassung 3; ersetzt «Was sagt σ?»):
       eine Situation, drei Reihen als Tabellenzeilen (n, p, Sicherheit
       aendern sich). Je Zeile den Bereich [a; b] mit dem Rechner B(n; p)
       austesten, μ, σ, b − μ und (b − μ) : σ selbst eintragen
       (Rechenausdruck erlaubt, geprueft mit Toleranz). Daneben das Bild
       der aktuellen Zeile: anfangs nur Balken und gefundener Bereich lila
       mit Prozent, Schwaenze beschriftet. NEU (gemeinsam entschieden,
       Nachtrag 2026-10-16 «Etappe 2 gibt zu viel vor»): keine μ- oder
       σ-Linien am Anfang; die Frage erst nach Reihe 1; erst am Schluss
       «σ-Raster einblenden» (Glocke, μ und μ ± c · σ im Bild wie in
       Kapitel 8), drei Faktoren und «Eine mögliche Sicht». Alle
       Sollwerte aus inhalte.abkuerzung().

   NEU (FASSUNG CHILBI, thema.md, 2026-10-19, Rike): Die eigenen Karten
   K19-K24 spielen an der Chilbi (neuer Text, gleiche IDs und Zahlen;
   ihre alten Markierungen fallen beim Laden weg, siehe bnStand), Etappe 2
   an der Wuerfelbude. Bedienung wie Kapitel 5/6, lokal nachgebaut:
   Situationskarte, Auftragsfenster, Fahne mit automatischem Weiter,
   Rechnung unter Direktwerten (Abschnitt «Bedienung wie Kapitel 5/6»).
   Stand neu: stand.bn.auftrag {1, 2}, stand.bn.fassung 5.

   NEU (gemeinsam entschieden, FASSUNG 4, thema.md, 2026-10-20, Rike):
   E1  zwei Zuege. Zug 1: nur die acht Chilbi-Karten K19-K26 auf dem
       Tisch, frei gruppieren, danach «Eine mögliche Sicht». Zug 2 beginnt
       mit dieser Sicht: Die Skriptkarten kommen auf den Tisch (Pflicht
       oben, die freiwilligen darunter, aufklappbar) und werden den
       eigenen Gruppen zugeordnet. Pflicht sind dort nur das «?» und die
       k-Form; leere Felder n, p, P werden nicht angemerkt. Danach zeigt
       «Eine mögliche Sicht» die fuenf Gruppen mit den Skriptkarten.
       Neue k-Form «? ≤ X ≤ ?» (beide Grenzen gesucht, Wuerfelbude K26).
   E2  sieben Zeilen in zwei Reihen. Zeile 1 (= K26) von Hand, ab Zeile 2
       «Bereich finden». Je Zeile μ, σ, b − μ; die Spalte «(b − μ) : σ»
       ist gestrichen. Nach den Faktoren «Wann stimmt das schlecht?».
   Stand neu: stand.bn.sicht2, stand.bn.freiOffen, stand.bn.abk.schlecht,
   stand.bn.fassung 6 (Gruppen und Etappe 2 beginnen neu, siehe bnStand).

   NEU (gemeinsam entschieden, FASSUNG 5, thema.md, 2026-10-20, Rike:
   «baue bitte»): Etappe 1 bleibt wie Fassung 4. Etappe 2 heisst «Was
   sagt σ?» und ersetzt alles oben unter E2 (sieben Zeilen, «Bereich
   finden», b − μ, Faktoren, σ-Raster): ein Werkzeug (Histogramm,
   σ-Staebe, Schalter c, Band μ ± c·σ) fuer drei Zuege - Vorhersage an
   vier Buden, Wackeln und Einpendeln (P gegen n), die Abkuerzung μ ± 2σ
   an der Wuerfelbude. Stand neu: stand.bn.sig, stand.bn.fassung 7
   (Etappe 2 beginnt neu, siehe bnStand).

   NEU (gemeinsam entschieden, FASSUNG 6, thema.md, 2026-10-21, Rike):
   E1  neunte Chilbi-Karte K27 Torwand (p gesucht, nur austesten). Unter
       den Gruppen von Zug 1 ein ausgegrauter Kasten «Danach: die Aufgaben
       aus dem Skript» (BN.danach); die Situationskarte nennt beide Schritte.
   E2  «Gibt es eine Abkürzung fürs Austesten?», von der Sicherheit zum c:
       Zug 1 Grenzen schaetzen (zwei Griffe an drei Buden), Zug 2 in σ
       messen (σ-Stab), Zug 3 90 % und 99 %, dann μ ± 2σ von Hand. Ersetzt
       Vorhersage und Wackeln aus FASSUNG 5. Stand neu: stand.bn.sig mit
       v: 6, stand.bn.fassung 8 (Etappe 2 beginnt neu, siehe bnStand).

   NEU (gemeinsam entschieden, FASSUNG 7, thema.md «Rückmeldung
   2026-10-21 (Rike) zu Fassung 6», Etappe 1): Alle Karten auf dem Tisch
   gleich gross (bnEinheitsHoehe). Eingeordnet bleibt die Karte ein
   Kaertchen: Titel, Chips n · p · k · P in den Feldfarben, das Gesuchte
   gefuellt (bnChips); «Text ▾» klappt Text und Felder auf, dort wird
   eingetragen. Mehrere Kaertchen einer Gruppe stehen nebeneinander.
   Etappe 2 und der Stand bleiben unveraendert.

   NEU (gemeinsam entschieden, FASSUNG 7, thema.md «FASSUNG 7, Etappe 2»,
   2026-10-21, Rike: «Ja, bau Etappe 2 so»): Etappe 2 entdeckend, ein
   Werkzeug mit Reglern n und p fuer drei Zuege - Zug 1 «Reicht ein festes
   Band?» (Bens μ ± 10), Zug 2 «Das Band in σ» (c = 1, 2, 3, zuerst
   schaetzen), Zug 3 «Umgekehrt gefragt» (Regler c, dann μ ± 2σ von Hand).
   Ersetzt die Zuege von FASSUNG 6 (Griffe, Messen je Bude). Stand neu:
   stand.bn.sig mit v: 7, stand.bn.fassung 9 (Etappe 2 beginnt neu, siehe
   bnStand).

   NEU (gemeinsam entschieden, FASSUNG 8, thema.md «FASSUNG 8, Etappe 2»,
   2026-10-21, Rike): Etappe 2 baut zuerst das Werkzeug zum Austesten. Neuer
   Zug 1 «Austesten»: Rechner B(n; p) mit «−»/«+» (und «beide ±1» beim
   Bereich), Histogramm mit dem Bereich eingefaerbt, «Ihre Versuche», die
   vier Austest-Aufgaben aus Etappe 1 (Ballonstand, Greifautomat,
   Penaltyschiessen, Wuerfelbude) mit Antwort und Hinweis. Die Zuege von
   FASSUNG 7 werden Zug 2-4, inhaltlich unveraendert. Intern zaehlt der Zug
   ab 0 (0 = Austesten, 1-3 wie in FASSUNG 7), damit die Staende passen;
   angezeigt wird zug + 1. Stand neu: stand.bn.sig mit v: 8 und zt,
   stand.bn.fassung 10 (Eintraege der Zuege 2-4 bleiben, siehe bnStand).

   DIE RECHNUNG kommt aus binomial.js (themen/sigmalabor), die beim Bauen
   VOR diese Datei gelegt wird: Namensraum BINOM. Hier wird nichts an der
   Binomialverteilung selbst gerechnet.

   Die Karten laufen ueber das gemeinsame Geruest (ziehbar, ablegen,
   merken), werden aber NICHT mit karte() erzeugt: karte() haengt ein
   Kartenbild ein und vergroessert beim Darueberfahren - auf einer Karte,
   deren Woerter man markiert, springt dann der Text unter dem Zeiger weg.

   Stand dieses Kapitels (eigener Topf):
     stand.bn = {f: {Karte: {n: [je Kette], p: [je Kette], P,
                             k: [{form, a, b} je Kette], frage}},
                 mark: {Karte: {Stuecknr: Art}}, stift: Art|'weg'|null,
                 gruppen: [{name, weg}], sicht: bool, sicht2: bool,
                 freiOffen: bool, fassung: 10,
                 sig: {v: 8, zug: 0|1|2|3 (intern, angezeigt + 1), sicht,
                       ohneZt: bool (Stand aus FASSUNG 7 mit Eintraegen:
                               Zug 2-4 gehen auf, ohne dass Zug 1 fertig ist),
                       zt: {auf: 0..3, r: {Karte: {n, p: {t, w}, form, k, a, b}},
                            v: {Karte: [{n, pt, pw, form, k, a, b}]},
                            antw: {Karte: {t, a, b, g}}, text},
                       z1: {n, rows: [{n}], text},
                       z2: {n, p: {t, w}, c: 1|2|3,
                            est: {c: {t, auf}}, rows: {c: [{n, pt, pw}]}, text},
                       z3: {n, p: {t, w}, c, ansicht: '95'|'90'|'99'|'abk',
                            m: {95|90|99: {etwa, auf, n, pt, pw}},
                            mu, s, unten, oben, a, b, text, geprueft}}}
*/

const BN = D.bn;
const BN_KARTE = {};
BN.karten.forEach(k => { BN_KARTE[k.id] = k; });
const BN_ARTEN = BN.marken.map(m => m.art);          // n, p, k, P
const BN_GROESSEN = ['n', 'p', 'k', 'P'];
/* Karten, deren Text sich mit der Fassung Chilbi geaendert hat: die
   sechs eigenen (Skript-Karten bleiben woertlich). */
const BN_NEUER_TEXT = ['K19', 'K20', 'K21', 'K22', 'K23', 'K24'];
/* Die fuenf Gruppen von «Eine mögliche Sicht» (die alten Faecher). */
const BN_ALLE_FAECHER = () => BN.faecher.concat([BN.ablage]);
const BN_KFORM = {};
BN.kformen.forEach(f => { BN_KFORM[f.form] = f.text; });
/* NEU (FASSUNG 4): Zug 2 von Etappe 1 - Texte, Pflicht- und freiwillige
   Karten. */
const BN_Z2 = BN.zug2;
const bnFreiwillig = k => k.zug === 2 && !k.pflicht;
/* Etappe 2 - Texte (thema.SIG) und Sollwerte (inhalte.abkuerzung(),
   GEAENDERT in FASSUNG 6 und 7; bis FASSUNG 5 inhalte.sigma()). */
const BN_S = D.bn.sig;
const BN_SV = 8;                     // Kennung des Stands von Etappe 2 (FASSUNG 8; bis FASSUNG 7: 7)

/* ───────── Stil (eingehaengt; der Kern bleibt unberuehrt) ───────── */
(function bnStil(){
  if (document.getElementById('bn-stil')) return;
  const s = document.createElement('style');
  s.id = 'bn-stil';
  s.textContent = `
    /* Die Kapitelfarbe steht sonst nur am body. */
    :root{--akzent:var(--beweis)}
    /* Textmarker-Farben (Fassung 2): n blau, p gruen, k lila, P gelb.
       --mf Rand/Strich, --mg Leuchtfarbe, --mt Schrift auf --mf. */
    .m-n{--mf:#0065A9;--mg:#d3e6f7;--mt:#fff} .m-p{--mf:#007D57;--mg:#d1f0e2;--mt:#fff}
    .m-k{--mf:#9867A5;--mg:#eddff3;--mt:#fff} .m-P{--mf:#d4ac00;--mg:#fff09a;--mt:#2d2924}

    /* Die Stifte */
    .bn-stifte{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;margin:2px 0 8px;
      padding:6px 10px;border:1px solid var(--linie);border-radius:10px;background:var(--karte);font-size:13px}
    .bn-stifte .was{font-weight:600;color:var(--akzent-t,#8a5a24);margin-right:2px}
    .bn-stifte button{font:inherit;font-size:15px;font-weight:600;min-width:46px;height:32px;padding:0 10px;
      border:2px solid var(--mf,#b9ad98);border-radius:8px;background:var(--mg,#fff);color:var(--tinte);
      cursor:pointer;display:inline-flex;align-items:center;gap:6px}
    .bn-stifte button::before{content:'';width:9px;height:16px;border-radius:2px 2px 4px 4px;
      background:var(--mf,#b9ad98);transform:rotate(18deg)}
    .bn-stifte button.weg{--mf:#8d8476;--mg:#f3efe8;font-weight:400;font-size:13px}
    .bn-stifte button.weg::before{width:14px;height:9px;border-radius:2px;background:#e9b8b0;
      border:1px solid #8d8476;transform:rotate(-18deg)}
    .bn-stifte button[aria-pressed=true]{background:var(--mf);color:var(--mt,#fff);
      box-shadow:0 0 0 3px var(--mg),0 2px 5px rgba(0,0,0,.18);transform:translateY(-1px)}
    .bn-stifte button[aria-pressed=true]::before{background:var(--mt,#fff)}
    .bn-stifte .zart{color:var(--matt);font-size:12.5px}
    .bn-stifte.winke{animation:bnwinke .9s ease 1}
    @keyframes bnwinke{0%,100%{box-shadow:none}30%,70%{box-shadow:0 0 0 3px var(--akzent)}}
    /* Kleine Fenster: die Stiftleiste darf der Arbeitsflaeche keine
       Hoehe wegnehmen - die Anleitung steht dann im title. */
    @media (max-width:900px),(max-height:640px){
      .bn-stifte{padding:3px 8px;margin:0 0 4px}
      .bn-stifte button{height:27px;font-size:14px}
      .bn-stifte .zart{display:none}}

    /* left/top fest auf 0: sonst sitzt eine absolute Karte an ihrer
       STATISCHEN Stelle - in der Ablage also unter deren Kopfzeile, und
       die Rechnung mit _y stimmt nicht mehr. */
    .k.bn-k{left:0;top:0;width:calc(var(--kb) * 1.9);background:var(--karte);border:1px solid var(--linie);
      border-radius:10px;box-shadow:0 1px 3px rgba(0,0,0,.08);font-size:13.5px;line-height:1.42;
      cursor:default}
    .bn-k .bn-kk{display:flex;justify-content:space-between;align-items:baseline;gap:6px;
      padding:5px 9px 3px;border-bottom:1px solid var(--linie);background:#fbf3e7;
      border-radius:10px 10px 0 0;cursor:grab;font-size:12.5px;color:var(--akzent-t,#8a5a24)}
    .bn-k .bn-kk b{font-weight:600}
    .bn-k .bn-kk span{color:var(--matt);font-size:11px}
    .bn-k .bn-kk::after{content:'⠿';color:#c9bda8;margin-left:auto;padding-left:6px}
    .bn-k .bn-text{padding:6px 9px 5px;cursor:text}
    body.bn-stift-an .bn-k .bn-text{cursor:crosshair;user-select:none;-webkit-user-select:none}
    .bn-k .w,.bn-k .ws{border-radius:2px}
    body.bn-stift-an .bn-k .w:hover{box-shadow:inset 0 -2px 0 #c9bda8}
    .bn-k .w[class*=" m-"],.bn-k .ws[class*=" m-"]{background:var(--mg);color:var(--tinte)}
    .bn-k .w[class*=" m-"]{box-shadow:inset 0 -2px 0 var(--mf)}
    .bn-k .ws[class*=" m-"]{box-shadow:inset 0 -2px 0 var(--mf)}

    /* Die vier Felder, in den Farben der Stifte */
    .bn-felder{border-top:1px dashed var(--linie);padding:6px 9px 6px;display:flex;flex-direction:column;gap:5px;cursor:grab}
    .bn-kette{display:flex;flex-direction:column;gap:5px}
    .bn-kette + .bn-kette{border-top:1px dotted var(--linie);padding-top:5px}
    .bn-teil{font-size:11.5px;font-weight:600;color:var(--matt);letter-spacing:.02em}
    .bn-frow{display:flex;flex-wrap:wrap;gap:5px 10px;align-items:center}
    .bn-f{display:inline-flex;align-items:center;gap:3px}
    .bn-fn{display:inline-block;font-weight:700;font-size:13px;min-width:18px;text-align:center;line-height:20px;
      border-radius:5px;background:var(--mf,#b9ad98);color:var(--mt,#fff);padding:0 3px}
    .bn-felder input,.bn-felder select{font:inherit;font-size:13.5px;padding:2px 5px;border:1.6px solid var(--mf,var(--linie));
      border-radius:6px;background:var(--mg,#fff);color:var(--tinte);cursor:text;box-sizing:border-box}
    .bn-felder select{cursor:pointer;padding:2px 2px;max-width:100%}
    .bn-felder input:focus,.bn-felder select:focus{outline:2px solid var(--mf,var(--akzent));outline-offset:0;background:#fff}
    .bn-felder input[data-g=n]{width:3.6em} .bn-felder input[data-g=p]{width:4.4em}
    .bn-felder input[data-g=P]{width:5em} .bn-felder input.gr{width:3em}
    .bn-q{font:inherit;font-size:12px;font-weight:700;width:20px;height:20px;padding:0;border-radius:50%;
      border:1.3px solid #c9bda8;background:#fff;color:var(--matt);cursor:pointer;line-height:1}
    .bn-q[aria-pressed=true]{background:var(--mf,var(--akzent));border-color:var(--mf,var(--akzent));color:var(--mt,#fff)}
    .bn-frage{display:inline-block;min-width:2.4em;text-align:center;font-weight:700;font-size:14px;
      padding:1px 6px;border:1.6px solid var(--mf,var(--akzent));border-radius:6px;background:var(--mg,#fff7ec);color:var(--tinte)}
    .bn-krow{display:flex;flex-wrap:wrap;align-items:center;gap:3px 4px}
    .bn-krow .op{color:var(--matt)}
    .bn-iv{font-size:12px;color:var(--matt);margin-left:4px;font-variant-numeric:tabular-nums;white-space:nowrap}
    .bn-felder .ok{border-color:var(--richtig)!important;background:#eef7ef!important}
    .bn-felder .falsch{border-color:var(--falsch)!important;background:#fbeeec!important}
    .bn-felder .halb{border-color:var(--fast)!important;border-style:dashed!important;background:#fdf4e4!important}
    .bn-k .bn-hinweis{font-size:12px;line-height:1.35;color:var(--matt);padding:0 9px 7px}
    /* NEU (Fassung 10): die Formel auf der Karte */
    .bn-k .bn-formel{display:none;font:13px/1.7 var(--druck);color:var(--tinte);padding:4px 9px 7px;
        margin:0 6px 6px;background:#fffaf2;border:1px dashed #d9c7a6;border-radius:6px}
    .bn-k .bn-formel.an{display:block}
    .bn-k .bn-formel .was{display:block;font:600 11.5px var(--druck);color:var(--matt);letter-spacing:.02em}
    .bn-k .bn-formel mark{background:var(--mf,#d4ac00);color:var(--mt,#2d2924);font-weight:600;padding:0 3px;border-radius:3px}
    .bn-k .bn-formel sup{font-size:.72em}
    .bn-k .bn-formel .bn-sig{display:inline-flex;align-items:center;gap:1px;font-size:1.15em}
    .bn-k .bn-formel .bn-sig>span{display:inline-flex;flex-direction:column;font-size:.62em;line-height:1.05;margin-left:1px}
    .bn-k .bn-formel .bn-sig sub,.bn-k .bn-formel .bn-sig sup{font-size:1em;vertical-align:baseline}
    .bn-k.klein .bn-formel{font-size:12px;margin:0 5px 5px;padding:3px 7px 5px}
    .bn-k .bn-hinweis:empty{display:none}
    .bn-k .bn-hinweis.falsch{color:var(--falsch)} .bn-k .bn-hinweis.ok{color:var(--richtig)}
    .bn-k .bn-hinweis.halb{color:var(--fast)}
    /* NEU (gemeinsam entschieden, FASSUNG 7, Rike 2026-10-21): Auf dem
       Tisch sind alle Karten gleich hoch (bnTischSetzen setzt die Hoehe);
       der Text waechst, die Felder stehen unten buendig. */
    .k.bn-k{display:flex;flex-direction:column;box-sizing:border-box}
    .bn-k .bn-text{flex:1 1 auto}
    /* NEU (gemeinsam entschieden, FASSUNG 7): Eingeordnet bleibt die
       Karte ein Kaertchen - Titel, «Text ▾» und die Angaben als Chips in
       den Farben der Felder, das Gesuchte gefuellt. Aufgeklappt zeigt sie
       Text (mit Markierungen) und Felder wie auf dem Tisch; dort wird
       eingetragen. Ersetzt die eine Zeile aus Fassung 3. */
    .bn-k .bn-kurz{display:none;padding:5px 7px 6px;cursor:grab}
    .bn-k .bn-kz{display:flex;align-items:flex-start;gap:6px;margin-bottom:5px}
    .bn-k .bn-kz b{flex:1 1 auto;min-width:0;font-weight:600;font-size:13px;line-height:1.3;
      color:var(--akzent-t,#8a5a24)}
    .bn-k .bn-kz::after{content:'⠿';color:#c9bda8;line-height:1.3}
    .bn-k .bn-auf{font:inherit;font-size:11.5px;line-height:17px;color:var(--matt);background:#fff;
      border:1px solid var(--linie);border-radius:6px;padding:0 6px;cursor:pointer;white-space:nowrap;flex:0 0 auto}
    .bn-k .bn-auf:hover{color:var(--tinte);border-color:#c9bda8}
    .bn-chips{display:flex;flex-wrap:wrap;gap:4px}
    .bn-chips .fz{font-size:11.5px;color:var(--matt);line-height:20px}
    .bn-chip{display:inline-flex;align-items:center;font-size:12.5px;line-height:17px;padding:0 7px;
      border:1.5px solid var(--mf);border-radius:999px;background:var(--mg);color:var(--tinte);
      white-space:nowrap;font-variant-numeric:tabular-nums}
    .bn-chip .leer{color:#9d927f}
    .bn-chip.gs{background:var(--mf);color:var(--mt);font-weight:700;box-shadow:0 0 0 2px var(--mg)}
    .bn-chip.ok{border-color:var(--richtig)} .bn-chip.falsch{border-color:var(--falsch);border-width:2px}
    .bn-chip.halb{border-color:var(--fast);border-style:dashed}
    .bn-k.klein .bn-kk,.bn-k.klein .bn-text,.bn-k.klein .bn-felder{display:none}
    .bn-k.klein .bn-kurz{display:block;order:-1}
    .bn-k.klein .bn-hinweis{font-size:11.5px;padding:0 7px 6px}
    .bn-k.klein:not(.auf) .bn-hinweis .soll{display:none}
    .bn-k.klein.auf .bn-kurz{background:#fbf3e7;border-bottom:1px solid var(--linie);border-radius:10px 10px 0 0;padding-bottom:4px}
    .bn-k.klein.auf .bn-kz{margin-bottom:0}
    .bn-k.klein.auf .bn-chips{display:none}
    .bn-k.klein.auf .bn-text{display:block}
    .bn-k.klein.auf .bn-felder{display:flex}
    .bn-k.klein.auf .bn-hinweis{font-size:12px;padding:0 9px 7px}
    .bn-k.pruefen .bn-kk span::before{content:'nicht gewertet · ';color:var(--fast)}

    /* Gruppen (frei, selbst benannt), Schreibfelder, Sicht */
    .feld.bn-fach{border-style:solid;border-width:1px;background:#fffdf8}
    .feld.bn-fach.ueber{background:#fff}
    .feld.bn-fach > .kopf{display:flex;align-items:center;gap:6px;padding:4px 6px 2px 8px;line-height:1.2}
    .feld.bn-fach > .kopf input.gname{flex:1;min-width:0;width:auto;margin:2px 0 0;font-size:17px}
    .feld.bn-fach > .kopf .gweg{font:inherit;font-size:15px;line-height:1;width:22px;height:22px;padding:0;
      border:none;background:none;color:var(--matt);cursor:pointer;border-radius:50%}
    .feld.bn-fach > .kopf .gweg:hover{background:#f1e8da;color:var(--tinte)}
    .feld.bn-fach .leerhinweis{position:absolute;left:12px;bottom:6px;font-size:12px;color:#b3a690;pointer-events:none}
    .feld.neu.bn-neu{display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--matt);
      border:1.5px dashed #cdbfa8;border-radius:10px;background:transparent;cursor:pointer;text-align:center}
    .feld.neu.bn-neu.ueber{background:#fff;border-color:var(--akzent);color:var(--tinte)}
    .bn-weg{position:absolute}
    .bn-weg label{display:block;font-size:12px;color:var(--matt);margin:0 0 2px;line-height:1.25}
    .bn-weg textarea{width:100%;height:48px;box-sizing:border-box;font:13px/1.35 var(--druck);
      border:1px solid var(--linie);border-radius:8px;padding:4px 6px;background:#fff;resize:none}
    .bn-sicht{position:absolute;font-size:13.5px;line-height:1.45}
    .bn-sicht .zart{color:var(--matt);font-size:12.5px;margin-left:8px}
    .bn-sicht .box{background:#fffaf2;border:1px solid var(--akzent);border-radius:10px;padding:8px 12px}
    .bn-sicht h4{margin:0 0 4px;font-size:14px;color:var(--akzent-t,#8a5a24)}
    .bn-sicht ol{margin:2px 0 0;padding-left:20px}
    .bn-sicht ol li{margin-bottom:5px}
    .bn-sicht ol li b{color:var(--akzent-t,#8a5a24);font-weight:600}
    .bn-sicht ol li .ks{color:var(--matt);font-size:12.5px}

    /* Weitere Faelle: unauffaellig, auf jeder Karte */
    .bn-fall{font:inherit;font-size:11.5px;color:var(--matt);background:none;border:none;padding:0;
      cursor:pointer;text-decoration:underline dotted;text-underline-offset:2px;align-self:flex-start}
    .bn-fall:hover{color:var(--tinte)}
    .bn-teil{display:flex;align-items:center;gap:6px}
    .bn-teil .bn-fallweg{font:inherit;font-size:13px;line-height:1;padding:0 3px;border:none;background:none;
      color:var(--matt);cursor:pointer}
    .bn-teil .bn-fallweg:hover{color:var(--falsch)}
    .bn-kette.zuviel{outline:1.6px solid var(--falsch);outline-offset:2px;border-radius:5px}

    /* Fallunterscheidung (Tennis 7.2): Zusatz unter jeder Zeile */
    .bn-zusatz{font-size:12px;color:var(--matt);margin:1px 0 0 2px}

    /* Etappe 2 · Was sagt σ? (FASSUNG 5) */
    .bn-s2{padding:26px 10px 16px;font-size:14px;line-height:1.45}
    .bn-box{background:var(--karte);border:1px solid var(--linie);border-radius:10px;padding:8px 10px;
      margin-bottom:10px}
    .bn-box > .kopf{font-weight:600;color:var(--akzent-t,#8a5a24);margin-bottom:3px}
    .bn-box .zart,.bn-s2r .zart{color:var(--matt);font-size:12.5px}
    .bn-zuege{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}
    .bn-zuege button{font:inherit;font-size:13px;padding:4px 10px;border-radius:16px;border:1.4px solid var(--linie);
      background:#fff;color:var(--tinte);cursor:pointer}
    .bn-zuege button[aria-current=true]{border-color:var(--akzent);background:#fbefdc;font-weight:600}
    .bn-zuege button.fertig::after{content:' ✓';color:var(--richtig)}
    .bn-zuege button:disabled{opacity:.45;cursor:default}
    .bn-wahl{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 4px}
    .bn-wahl button{font:inherit;font-size:13.5px;padding:4px 10px;border-radius:8px;border:1.4px solid var(--linie);
      background:#fff;cursor:pointer}
    .bn-wahl button[aria-pressed=true]{border-color:var(--akzent);background:#fbefdc;font-weight:600}
    .bn-wahl button:disabled{cursor:default;opacity:.75}
    .bn-wahl button[aria-pressed=true]:disabled{opacity:1}
    .bn-buden{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:8px 0}
    .bn-bude{font:inherit;text-align:left;border:1.4px solid var(--linie);border-radius:9px;background:#fffefb;
      padding:5px 7px 3px;cursor:pointer;color:var(--tinte)}
    .bn-bude:disabled{cursor:default}
    .bn-bude .nm{font-weight:600;font-size:13px} .bn-bude .bp{font-size:12px;color:var(--matt)}
    .bn-bude svg{display:block;width:100%;height:auto;margin-top:2px}
    .bn-bude.aktiv{border-color:var(--akzent);box-shadow:0 0 0 2px #f3d9b8}
    .bn-bude.gesehen .nm::after{content:' ✓';color:var(--richtig)}
    .bn-bude:not(:disabled):hover{border-color:var(--akzent)}
    .bn-tab{border-collapse:collapse;width:100%;font-size:13.5px;font-variant-numeric:tabular-nums}
    .bn-tab th,.bn-tab td{padding:3px 5px;text-align:right;border-bottom:1px solid #eee4d3;white-space:nowrap}
    .bn-tab th{color:var(--matt);font-weight:400;font-size:12px;vertical-align:bottom;white-space:normal;line-height:1.2}
    .bn-tab td:first-child,.bn-tab th:first-child{text-align:left}
    .bn-tab td.leer{color:var(--matt);font-size:12px}
    .bn-tab tr.aktiv td{background:#fbefdc}
    .bn-auftrag{margin:8px 0}
    .bn-auftrag label{display:block;font-size:13.5px;margin-bottom:3px;font-weight:600}
    .bn-s2 textarea{width:100%;min-height:54px;box-sizing:border-box;font:13.5px/1.4 var(--druck);
      border:1px solid var(--linie);border-radius:8px;padding:5px 8px;background:#fff;resize:vertical}
    .bn-regler{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;margin:6px 0}
    .bn-regler input[type=range]{flex:1 1 180px;accent-color:var(--akzent)}
    .bn-regler input[type=number]{font:inherit;font-size:14px;width:5em;padding:2px 5px;border:1.4px solid var(--linie);border-radius:6px}
    .bn-z3{display:grid;grid-template-columns:auto 1fr;gap:5px 8px;align-items:start;margin:6px 0}
    .bn-z3 label{font-weight:600;padding-top:3px;white-space:nowrap}
    .bn-z3 input{font:inherit;font-size:14px;width:11em;max-width:100%;padding:2px 6px;border:1.4px solid var(--linie);
      border-radius:6px;background:#fff;box-sizing:border-box}
    .bn-z3 input.gr{width:5em}
    .bn-z3 input.ok{border-color:var(--richtig);background:#eef7ef}
    .bn-z3 input.falsch{border-color:var(--falsch);background:#fff4f2}
    .bn-z3 .wert{display:block;font-size:11.5px;color:var(--matt);line-height:1.2;min-height:0}
    .bn-z3 .wert.falsch{color:var(--falsch)}
    .bn-ab{display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px}
    .bn-hinweis{font-size:13px;margin:4px 0;padding:5px 8px;border-left:3px solid var(--akzent);background:#fffaf2}
    .bn-vergleich{font-size:14px;margin:6px 0;padding:6px 10px;border:1px solid var(--richtig);border-radius:8px;background:#eef7ef}
    .bn-vergleich b{color:var(--tinte)}
    .bn-s2r{padding:26px 10px 14px;font-size:14px}
    .bn-s2r .titel{font-weight:600;color:var(--akzent-t,#8a5a24);margin-bottom:2px}
    .bn-s2r svg,.bn-s2sicht svg{display:block;width:100%;height:auto;background:#fffefb;border:1px solid var(--linie);
      border-radius:10px;margin:4px 0}
    .bn-cwahl{display:flex;flex-wrap:wrap;align-items:center;gap:5px 6px;margin:4px 0}
    .bn-cwahl button{font:inherit;font-size:14px;min-width:2.6em;padding:2px 8px;border-radius:7px;border:1.4px solid var(--linie);
      background:#fff;cursor:pointer}
    .bn-cwahl button[aria-pressed=true]{border-color:#9867A5;background:#eddff3;font-weight:600}
    .bn-werte{font-size:14px;font-variant-numeric:tabular-nums;margin:2px 0 6px}
    .bn-werte b{font-size:15.5px}
    .bn-s2sicht{margin-top:8px}
    .bn-s2sicht .box{background:#fffaf2;border:1px solid var(--akzent);border-radius:10px;padding:8px 12px;font-size:13.5px}
    .bn-s2sicht h4{margin:0 0 4px;font-size:14px;color:var(--akzent-t,#8a5a24)}
    .bn-s2sicht ul{margin:0 0 6px;padding-left:18px}
    @media (max-width:900px){.bn-s2,.bn-s2r{padding-left:6px;padding-right:6px} .bn-box{padding:7px 7px}
      .bn-tab{font-size:12.5px} .bn-tab th,.bn-tab td{padding:3px 3px}}

    /* NEU (FASSUNG CHILBI, 2026-10-19): Bedienung wie Kapitel 5/6, mit
       eigenen Namen nachgebaut (Kapitel 6: .zgr-skarte, .zgr-fenster,
       .zgr-fahne). Kapitelfarbe Ocker #E09E5A, Schrift darauf dunkler. */
    :root{--bn-ocker:#E09E5A;--bn-ocker-t:#9a5a1c}
    .bn-skarte{flex:0 0 auto;display:flex;align-items:flex-start;gap:14px;margin:0 14px 8px;
       background:#fcf3ea;background:color-mix(in srgb,var(--bn-ocker) 12%,#fff);border-radius:0 10px 10px 0;
       box-shadow:inset 4px 0 0 var(--bn-ocker);padding:10px 16px 9px 18px}
    .bn-sbild{flex:0 0 auto;width:76px;height:76px;object-fit:cover;border-radius:8px;mix-blend-mode:multiply;margin-top:2px}
    .bn-sinhalt{flex:1 1 auto;min-width:0}
    .bn-skopf{display:flex;flex-wrap:wrap;align-items:center;gap:4px 12px;margin-bottom:2px}
    .bn-stitel{font-family:var(--hand);font-size:21px;color:var(--bn-ocker-t);line-height:1.2}
    .bn-skurz,.bn-snurzu{display:none}
    .bn-sklapp{font:inherit;font-size:12px;color:var(--matt);background:none;border:1px solid transparent;border-radius:7px;
       padding:2px 7px;cursor:pointer;white-space:nowrap;margin-left:auto}
    .bn-sklapp:hover{border-color:var(--linie);background:#fff;color:var(--tinte)}
    .bn-sklapp::before{content:'▴ '}
    .bn-skarte.zu .bn-sklapp::before{content:'▾ '}
    .bn-stext{margin:0;font-size:16px;line-height:1.48;color:var(--tinte)}
    .bn-sfrage{margin:5px 0 0;font-size:17px;line-height:1.35;font-weight:700;color:var(--bn-ocker-t)}
    .bn-sauftragz{display:flex;align-items:center;gap:6px 12px;margin:6px 0 0;padding:4px 0 0;border-top:1px solid rgba(0,0,0,.08);
       font-size:14px;line-height:1.35}
    .bn-sauftragz p{margin:0;flex:1 1 auto;min-width:0}
    .bn-sauftragz .was{font-weight:700;color:var(--bn-ocker-t);margin-right:6px}
    .bn-auftragknopf{font:inherit;font-size:13px;font-weight:700;border:2px solid var(--bn-ocker);color:var(--bn-ocker-t);
       background:#fff;border-radius:999px;padding:2px 12px;cursor:pointer;white-space:nowrap;flex:0 0 auto}
    .bn-auftragknopf::before{content:'☰ ';font-weight:400}
    .bn-auftragknopf:hover{background:var(--bn-ocker);color:#fff}
    .bn-skarte.zu{padding:5px 12px 5px 16px;align-items:center}
    .bn-skarte.zu .bn-sbild{width:30px;height:30px;margin:0;border-radius:6px}
    .bn-skarte.zu .bn-sganz{display:none}
    .bn-skarte.zu .bn-skopf{flex-wrap:nowrap;margin:0;cursor:pointer}
    .bn-skarte.zu .bn-stitel{font-size:18px;white-space:nowrap}
    .bn-skarte.zu .bn-skurz{display:block;flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
       font-weight:700;color:var(--bn-ocker-t);font-size:15px}
    .bn-skarte.zu .bn-snurzu{display:inline-flex}
    .bn-skarte.zu .bn-sklapp{margin-left:0}
    @media (max-width:900px),(max-height:650px){
      .bn-skarte{padding:6px 10px 6px 14px;gap:10px;margin:0 10px 6px}
      .bn-sbild{width:52px;height:52px}
      .bn-stitel{font-size:18px}
      .bn-stext{font-size:14.5px;line-height:1.4}
      .bn-sfrage{font-size:15.5px;margin-top:2px}
      .bn-sauftragz{font-size:13px;margin-top:4px}
      .bn-skarte.zu .bn-sbild{width:24px;height:24px}
      .bn-skarte.zu .bn-stitel{font-size:16px}
      .bn-skarte.zu .bn-skurz{font-size:13.5px}}
    .bn-fenster{position:fixed;inset:0;z-index:200000;display:flex;align-items:center;justify-content:center;
       background:rgba(45,41,36,.42);padding:12px}
    .bn-fenster .kasten{position:relative;background:#fff;border-radius:14px;border:2px solid var(--bn-ocker);border-top-width:7px;
       box-shadow:0 10px 36px rgba(0,0,0,.25);width:min(600px,100%);max-height:calc(100vh - 24px);overflow:auto;
       padding:14px 20px 14px;font-size:15px;line-height:1.45;color:var(--tinte)}
    .bn-fenster h2{margin:0 30px 4px 0;font-size:19px;color:var(--bn-ocker-t)}
    .bn-fenster .satz{margin:0 0 8px;font-weight:600;font-size:16px}
    .bn-fenster ol{margin:0 0 8px;padding-left:24px}
    .bn-fenster li{margin:0 0 4px}
    .bn-fenster li::marker{font-weight:700;color:var(--bn-ocker-t)}
    .bn-fenster .bsp{color:var(--matt);font-size:13.5px}
    .bn-fenster .schluss{margin:0 0 10px;padding:5px 10px;border-left:3px solid var(--bn-ocker);background:#fffefb;font-size:14px}
    .bn-fenster .zu{position:absolute;top:6px;right:8px;width:32px;height:32px;border:0;background:none;font-size:24px;
       line-height:1;color:var(--matt);cursor:pointer;border-radius:8px}
    .bn-fenster .zu:hover{background:#f3efe6;color:var(--tinte)}
    .bn-fenster .unten{display:flex;justify-content:flex-end}
    .bn-fenster .los{font-size:15px;padding:6px 18px}
    @media (max-height:640px),(max-width:900px){
      .bn-fenster .kasten{font-size:14px;line-height:1.38;padding:10px 16px 10px}
      .bn-fenster h2{font-size:17px} .bn-fenster .satz{font-size:14.5px;margin-bottom:5px}
      .bn-fenster li{margin-bottom:2px}}
    .bn-fahne{position:absolute;right:14px;bottom:12px;z-index:40;display:flex;align-items:center;gap:10px;flex-wrap:wrap;
       max-width:min(460px,calc(100% - 28px));background:#fff;border:2px solid var(--bn-ocker);border-radius:12px;padding:7px 10px 7px 12px;
       box-shadow:0 6px 20px rgba(0,0,0,.18);font-size:14px;animation:bnfahne .25s ease-out}
    .bn-fahne .notiz{font-weight:600;color:var(--tinte)}
    .bn-fahne .knopf{font-size:14.5px;padding:6px 14px;white-space:nowrap}
    .bn-fahne .uhr{height:3px;flex-basis:100%;background:var(--linie);border-radius:2px;overflow:hidden}
    .bn-fahne .uhr i{display:block;height:100%;width:100%;background:var(--bn-ocker);animation:bnuhr 1.5s linear forwards}
    @keyframes bnfahne{from{transform:translateY(8px);opacity:0}to{transform:none;opacity:1}}
    @keyframes bnuhr{from{width:0}to{width:100%}}
    .bn-meldung{position:fixed;left:50%;top:14px;transform:translateX(-50%);z-index:200001;max-width:min(560px,calc(100% - 24px));
       background:#fff;border:2px solid var(--bn-ocker);border-radius:10px;padding:8px 38px 8px 14px;font-size:14px;
       box-shadow:0 6px 20px rgba(0,0,0,.18)}
    .bn-meldung button{position:absolute;right:6px;top:4px;border:0;background:none;font-size:20px;cursor:pointer;color:var(--matt)}
    /* Rechnung unter einem direkt eingetragenen richtigen Wert */
    .bn-tab .wert.rech{color:var(--richtig);white-space:normal;max-width:9em;margin-left:auto}
    /* NEU (FASSUNG 4): Zug 2 auf dem Tisch - Kopf und Stapel der freiwilligen */
    .bn-tkopf{position:absolute;box-sizing:border-box;font-size:13.5px;line-height:1.4;padding:7px 10px;
      background:#fffaf2;border:1px solid var(--akzent);border-radius:10px;color:var(--tinte)}
    .bn-tkopf b{color:var(--akzent-t,#8a5a24);font-weight:600}
    .bn-tfrei{position:absolute;box-sizing:border-box;text-align:left;font:inherit;font-size:13.5px;font-weight:600;
      padding:6px 10px;border:1.5px dashed #cdbfa8;border-radius:10px;background:transparent;color:var(--akzent-t,#8a5a24);cursor:pointer}
    .bn-tfrei:hover{background:#fff;border-color:var(--akzent)}
    .bn-tfrei .zart{color:var(--matt);font-weight:400}
    .bn-sicht .bn-sknopf{margin-top:8px}
    /* NEU (FASSUNG 6): Kasten unter den Gruppen von Zug 1 - kuendigt Zug 2 an */
    .bn-danach{position:absolute;box-sizing:border-box;font-size:13.5px;line-height:1.4;padding:7px 12px;
      border:1.5px dashed #cdbfa8;border-radius:10px;background:#f3efe8;color:var(--matt)}
    .bn-danach b{font-weight:600;color:#7d7466}
    /* NEU (FASSUNG 6): Etappe 2 - drei Buden, Griffe, σ-Stab, «etwa ___ σ» */
    .bn-buden.drei{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
    .bn-bude .bp,.bn-bude .st{display:block}
    .bn-bude .st{font-size:12px;color:var(--akzent-t,#8a5a24);font-variant-numeric:tabular-nums;min-height:1.2em}
    .bn-bude:disabled{opacity:.5}
    .bn-s2r svg.ziehbar{touch-action:none;cursor:ew-resize}
    .bn-s2r svg:focus-visible{outline:2px solid var(--akzent);outline-offset:2px}
    .bn-wfrage{font-weight:600;font-size:14px;margin:2px 0 2px}
    .bn-wfrage:empty{display:none}
    .bn-stabknoepfe{display:flex;flex-wrap:wrap;align-items:center;gap:5px 6px;margin:4px 0}
    .bn-stabknoepfe button{font:inherit;font-size:14px;padding:2px 10px;border-radius:7px;border:1.4px solid #0065A9;
      background:#fff;color:#0065A9;cursor:pointer}
    .bn-stabknoepfe button:hover:not(:disabled){background:#d3e6f7}
    .bn-stabknoepfe span{font-weight:600;color:#0065A9;margin-left:4px;font-variant-numeric:tabular-nums}
    .bn-etwa{display:flex;flex-wrap:wrap;align-items:center;gap:5px 6px;margin:6px 0 4px;font-size:14px}
    .bn-etwa label{font-weight:600}
    .bn-etwa input{font:inherit;font-size:14px;width:4.5em;padding:2px 6px;border:1.4px solid var(--linie);border-radius:6px}
    .bn-etwa .knopf{margin-left:6px}
    .bn-hinweis.passt{border-left-color:var(--richtig);background:#eef7ef}
    .bn-hinweis.daneben{border-left-color:var(--bn-ocker);background:#fffaf2}
    /* NEU (FASSUNG 8): Zug 1 «Austesten» - Rechner B(n; p) und Aufgaben */
    .bn-rech{margin:4px 0 6px}
    .bn-rz{display:flex;flex-wrap:wrap;align-items:center;gap:5px 8px;margin:4px 0}
    .bn-rz > label,.bn-rk > label{font-weight:600}
    .bn-rk{display:inline-flex;flex-wrap:wrap;align-items:center;gap:4px 6px}
    .bn-rz select{font:inherit;font-size:14px;padding:2px 4px;border:1.4px solid var(--linie);border-radius:6px;background:#fff}
    .bn-pm{display:inline-flex;align-items:stretch}
    .bn-pm input{font:inherit;font-size:14px;width:3.6em;padding:2px 4px;text-align:center;border:1.4px solid var(--linie);
      border-left:0;border-right:0;border-radius:0;background:#fff;font-variant-numeric:tabular-nums}
    .bn-pm input.falsch{background:#fff4f2;border-color:var(--falsch)}
    .bn-pm button{font:inherit;font-size:15px;line-height:1;min-width:1.9em;padding:2px 4px;border:1.4px solid var(--linie);
      background:#fbf6ee;cursor:pointer;color:var(--tinte)}
    .bn-pm button:first-child{border-radius:6px 0 0 6px} .bn-pm button:last-child{border-radius:0 6px 6px 0}
    .bn-pm button:hover{background:#fbefdc;border-color:var(--akzent)}
    .bn-beide{font:inherit;font-size:13px;padding:2px 8px;border-radius:6px;border:1.4px solid var(--linie);background:#fbf6ee;cursor:pointer}
    .bn-beide:hover{background:#fbefdc;border-color:var(--akzent)}
    .bn-zttext{margin:2px 0 6px}
    .bn-ztbild{width:22px;height:22px;object-fit:cover;border-radius:4px;mix-blend-mode:multiply;margin-right:5px;vertical-align:middle}
    .bn-ztantw{display:flex;flex-wrap:wrap;align-items:center;gap:5px 6px;margin:4px 0}
    .bn-ztantw label{font-weight:600}
    .bn-ztantw input{font:inherit;font-size:14px;width:5em;padding:2px 6px;border:1.4px solid var(--linie);border-radius:6px;background:#fff}
    .bn-ztantw input.ok{border-color:var(--richtig);background:#eef7ef}
    .bn-ztantw input.falsch{border-color:var(--falsch);background:#fff4f2}
    .bn-ztantw .knopf{margin-left:4px}
    .bn-ztvk{margin-top:8px}
    #bnztwahl button.fertig::after{content:' ✓';color:var(--richtig)}
    .bn-s2r .bn-ab{margin:2px 0 4px}
    .bn-s2r .bn-ab .knopf:disabled{opacity:.4;cursor:default}
    /* FEHLERBEHOBEN (FASSUNG 7, 2026-10-21): Beim Scrollen lag die
       Spaltenmarke («Aufgaben aus dem Skript», «Zug 2 · Das Band in σ»)
       ueber dem Kasten «Zug 2 · Aufgaben aus dem Skript» bzw. den
       Tabellen. Ursache: Die Marke im Kern ist sticky, ihr Hintergrund
       laeuft aber nach unten durchsichtig aus (linear-gradient 70 % ->
       transparent) - die Schrift darunter scheint durch die Marke. Hier
       (nur Kapitel 7) bekommt sie einen vollen Hintergrund. */
    .haelfte > .marke{background:var(--creme);padding-bottom:5px}
    .haelfte.rechts > .marke{background:var(--papier)}
    /* NEU (FASSUNG 7): Etappe 2 - Regler n, p, c, Tabellen mit «Notieren» */
    .bn-s2r .bn-regler{margin:3px 0;gap:4px 8px}
    .bn-regler .rn{font-weight:700;min-width:1.1em;font-style:italic}
    .bn-regler input[type=range]{min-width:120px}
    .bn-regler input[type=number]{width:5.2em}
    .bn-regler input.pz{font:inherit;font-size:14px;width:4.6em;padding:2px 5px;border:1.4px solid var(--linie);border-radius:6px}
    .bn-regler input.falsch{border-color:var(--falsch);background:#fff4f2}
    .bn-s2r .bn-werte{margin:0 0 4px}
    .bn-s2r .bn-ab{margin:4px 0}
    .bn-s2r .bn-ab .knopf:disabled{opacity:.4;cursor:default}
    .bn-tab td .bn-zweg{font:inherit;font-size:14px;line-height:1;border:0;background:none;color:var(--matt);cursor:pointer;padding:0 3px}
    .bn-tab td .bn-zweg:hover{color:var(--falsch)}
    .bn-tab td .zart{font-size:11.5px}
    .bn-box.aktiv{border-color:var(--akzent)}
    .bn-box .kopf .zart{font-weight:400}
    .bn-cwahl button:disabled{opacity:.45;cursor:default}
    .bn-cwahl button.fertig::after,.bn-wahl button.fertig::after{content:' ✓';color:var(--richtig)}
    .bn-etwa > span{font-weight:600}
    /* Bild auf einer eigenen Karte (kap7_<id>.png, nur wenn vorhanden) */
    .bn-k .bn-kk img{width:22px;height:22px;object-fit:cover;border-radius:4px;mix-blend-mode:multiply;margin-right:4px;vertical-align:middle}
    /* NEU (FASSUNG 9, Rike 2026-11-19, wie Kapitel 6 und 8): die Karte im
       Band immer offen, weiss mit Farbe nur am Rand, ohne Klappe und ohne
       Auftragszeile; darin der Satz, was jetzt zu tun ist. */
    body.ws-oben .wsleiste .bn-skarte{margin:0;background:#fff;border-radius:0;box-shadow:0 1px 2px rgba(60,40,20,.15),0 4px 14px rgba(60,40,20,.18);
       border-left:7px solid var(--bn-ocker);padding:8px 14px 9px 14px}
    body.ws-oben .wsleiste .bn-sklapp,body.ws-oben .wsleiste .bn-skurz,body.ws-oben .wsleiste .bn-snurzu,
    body.ws-oben .wsleiste .bn-sauftragz{display:none !important}
    body.ws-oben .wsleiste .bn-sbild{width:58px;height:58px}
    body.ws-oben .wsleiste .bn-sganz{display:block !important}
    body.ws-oben .bn-jetztsatz{margin:8px 0 0;padding:3px 0 3px 10px;border-left:3px solid var(--bn-ocker);font-size:15px;line-height:1.42;color:var(--tinte)}
    body.ws-oben .wsleiste .bn-stifte{margin:6px 0 0;background:#fffefb}
    /* die Teile von Etappe 2 als Reiter im Band (wie Kapitel 6, Etappe 3) */
    .bn-zuege.imband{margin:0 0 8px}
    .bn-zuege.imband button{border-radius:0;font-size:14px;padding:5px 12px;background:#fffefb}
    .bn-zuege.imband button[aria-current=true]{background:var(--bn-ocker);border-color:var(--bn-ocker);color:#fff}
    .bn-zuege.imband button[aria-current=true].fertig::after{color:#fff}
    /* NEU (FASSUNG 9): das Fenster «Geschafft» an den Uebergaengen */
    .bn-wegweiser .kasten h2{color:#007D57}
    .bn-wegweiser .unten{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}
    .bn-wegfrei{margin:10px 0 4px;padding:8px 10px;border-left:3px solid var(--bn-ocker);background:#fdf8f0;border-radius:4px}
    .bn-wegfrei .was{font-weight:600;margin-bottom:6px}
    .bn-wegfrei .zeile{display:flex;align-items:center;gap:10px;margin:4px 0;flex-wrap:wrap}
    /* NEU (FASSUNG 9, wie die Bude in Kapitel 6): die Aufgaben als Nummern,
       die aktuelle gross */
    .bn-anrn{display:flex;gap:6px;margin:0 0 8px;align-items:center;flex-wrap:wrap}
    .bn-anrn .was{font-size:13px;color:var(--matt);margin-right:4px}
    .bn-anr{position:relative;font:600 17px "Fira Sans",sans-serif;width:44px;height:40px;border:1.5px solid #c9bda8;background:#fffefb;
       border-radius:6px;cursor:pointer;color:var(--tinte)}
    .bn-anr[aria-pressed=true]{background:var(--bn-ocker);border-color:var(--bn-ocker);color:#fff}
    .bn-anr.fertig{border-color:var(--richtig)}
    .bn-anr .ok{position:absolute;right:3px;top:1px;font:700 11px/1 "Fira Sans",sans-serif;color:var(--richtig)}
    .bn-anr.fertig::after{content:none !important}
    .bn-anr[aria-pressed=true] .ok{color:#fff}
    .bn-ztvon{font-size:12.5px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:var(--matt)}
    .bn-box .kopf.gross{font-size:18px}
    .bn-zttext{font-size:15.5px;line-height:1.45}
    /* NEU (FASSUNG 9): Pruefen zeigt, wo - leere Felder rot umrandet */
    .bn-luecke{outline:2.5px solid var(--falsch) !important;outline-offset:1px}
    /* NEU (FASSUNG 9): Ziehbares sichtbar, bis man zum ersten Mal zieht */
    .bn-ziehhinweis{position:absolute;z-index:30;left:12px;right:12px;top:4px;padding:6px 10px;font-size:13.5px;
       background:#fffaf0;border:1.5px dashed var(--bn-ocker);border-radius:8px;color:var(--tinte);pointer-events:none}
  `;
  document.head.appendChild(s);
})();

/* ───────── Stand ───────── */
function bnStand(){
  stand.bn = stand.bn || {};
  const s = stand.bn;
  s.f = s.f || {}; s.mark = s.mark || {};
  // NEU (Fassung 10): Karten, deren Formel schon erschienen ist
  if (!s.formel || typeof s.formel !== 'object') s.formel = {};
  if (s.stift === undefined) s.stift = null;
  // Marken der ersten Fassung hiessen «iv» - jetzt «k».
  Object.values(s.mark).forEach(m => Object.keys(m).forEach(i => { if (m[i] === 'iv') m[i] = 'k'; }));
  // Den Hinweis-Knopf (Tennis) gibt es nicht mehr (Nachtrag 2026-10-16).
  delete s.tipp;
  // Die Rueckwaertsaufgaben der ersten Fassung (s.e2) und «Was sagt σ?»
  // der zweiten (s.s2) gibt es nicht mehr.
  delete s.e2; delete s.s2;
  if (!Array.isArray(s.gruppen)) bnGruppenAusFaechern(s);
  if (!(s.fassung >= 4)){
    // Bis Fassung 3 legte bnFelder() bei Tennis drei und bei 7.7 zwei
    // Zeilen an, auch unberuehrt. Jetzt beginnt jede Karte mit EINER
    // Zeile («+ weiterer Fall»): leere Zeilen am Schluss fallen weg.
    Object.values(s.f).forEach(f => {
      if (!Array.isArray(f.n) || !Array.isArray(f.p) || !Array.isArray(f.k)) return;
      while (f.n.length > 1 && !String(f.n[f.n.length - 1] || '').trim()
             && !String(f.p[f.p.length - 1] || '').trim()
             && !(f.k[f.k.length - 1] || {}).form){
        f.n.pop(); f.p.pop(); f.k.pop();
      }
    });
    s.fassung = 4;
  }
  // NEU (FASSUNG CHILBI, 2026-10-19): Die Karten-IDs bleiben, also auch
  // alle Eintraege. Die Markierungen haengen aber an der Wortnummer - auf
  // den Karten mit neuem Text (BN_NEUER_TEXT) passen sie nicht mehr und
  // fallen weg, mit Hinweis.
  if (s.fassung === 4){
    const weg = BN_NEUER_TEXT.filter(id => s.mark[id] && Object.keys(s.mark[id]).length);
    BN_NEUER_TEXT.forEach(id => { delete s.mark[id]; });
    s.fassung = 5;
    if (weg.length) bnMeldung(BN.meldung_marken, 12000);
  }
  // NEU (gemeinsam entschieden, FASSUNG 4, thema.md «Gespeicherte
  // Stände»): Die Eintraege auf den Karten (s.f) und die Markierungen
  // bleiben. Die Gruppierung aus Fassung Chilbi passt nicht mehr (andere
  // Kartenmenge je Zug), und Etappe 2 hat andere Zeilen: Beide beginnen
  // neu, mit Hinweis - aber nur, wenn dort schon etwas stand.
  if (s.fassung === 5){
    const karten = stand.karten || {}, voll = t => String(t || '').trim() !== '';
    const a = s.abk || {};
    const etwas = Object.keys(karten).some(id => BN_KARTE[id] && karten[id].ort && karten[id].ort !== 'tisch')
      || (s.gruppen || []).some(g => voll(g.name) || voll(g.weg))
      || Object.values(a.z || {}).some(e => Object.values(e || {}).some(voll))
      || voll(a.frage) || Object.values(a.fak || {}).some(voll);
    Object.keys(karten).forEach(id => { if (BN_KARTE[id]) delete karten[id]; });
    s.gruppen = [{name: '', weg: ''}, {name: '', weg: ''}];
    s.sicht = false; s.sicht2 = false;
    delete s.abk;
    // Den Auftrag von Etappe 2 einmal neu zeigen: Er hat sich geaendert.
    if (s.auftrag && typeof s.auftrag === 'object') delete s.auftrag[2];
    s.fassung = 6;
    if (etwas) bnMeldung(BN.meldung_fassung4, 12000);
  }
  // NEU (gemeinsam entschieden, FASSUNG 5, thema.md «Gespeicherte
  // Stände»): Etappe 1 bleibt. Etappe 2 ist neu («Was sagt σ?»): Der alte
  // Stand (s.abk: sieben Zeilen, Faktoren) faellt weg und Etappe 2
  // beginnt neu, mit Hinweis - aber nur, wenn dort schon etwas stand.
  if (s.fassung === 6){
    const a = s.abk || {}, voll = t => String(t || '').trim() !== '';
    const etwas = Object.values(a.z || {}).some(e => Object.values(e || {}).some(voll))
      || voll(a.frage) || voll(a.schlecht) || Object.values(a.fak || {}).some(voll);
    delete s.abk; delete s.sig;
    // Den Auftrag von Etappe 2 einmal neu zeigen: Er hat sich geaendert.
    if (s.auftrag && typeof s.auftrag === 'object') delete s.auftrag[2];
    s.fassung = 7;
    if (etwas) bnMeldung(BN.meldung_fassung5, 12000);
  }
  // NEU (gemeinsam entschieden, FASSUNG 6, thema.md «Gespeicherte
  // Stände»): Etappe 1 bleibt, K27 Torwand liegt neu auf dem Tisch.
  // Etappe 2 ist neu (von der Sicherheit zum c): Der Stand von «Was sagt
  // σ?» (s.sig ohne v: 6) faellt weg, Etappe 2 beginnt neu - mit Hinweis,
  // wenn in Etappe 1 oder 2 schon etwas stand.
  if (s.fassung === 7){
    const z = s.sig || {}, voll = t => String(t || '').trim() !== '', karten = stand.karten || {};
    const e1 = Object.keys(karten).some(id => BN_KARTE[id] && karten[id].ort && karten[id].ort !== 'tisch')
      || Object.keys(s.f).length > 0 || (s.gruppen || []).some(g => voll(g.name) || voll(g.weg));
    const z1 = z.z1 || {}, z2 = z.z2 || {}, z3 = z.z3 || {};
    const e2 = z.v !== 6 && (voll(z1.wahl) || Object.keys(z1.gesehen || {}).length > 0 || voll(z1.text)
      || (z2.pkt || []).length > 0 || voll(z2.text) || Object.values(z3).some(v => typeof v === 'string' && voll(v)));
    if (z.v !== 6) delete s.sig;
    if (s.auftrag && typeof s.auftrag === 'object') delete s.auftrag[2];
    s.fassung = 8;
    if (e1 || e2) bnMeldung(BN.meldung_fassung6, 12000);
  }
  // NEU (gemeinsam entschieden, FASSUNG 7, thema.md «Gespeicherte
  // Stände»): Etappe 1 bleibt. Etappe 2 ist neu (entdeckend, Regler n und
  // p): Der Stand von FASSUNG 6 (s.sig mit v: 6) faellt weg, Etappe 2
  // beginnt neu und zeigt ihren Auftrag noch einmal - mit Hinweis, wenn
  // dort schon etwas stand oder Etappe 2 schon offen war.
  if (s.fassung === 8){
    const z = s.sig || {}, voll = t => String(t || '').trim() !== '';
    const z1 = z.z1 || {}, z2 = z.z2 || {}, z3 = z.z3 || {}, auf = o => Object.values(o || {}).some(x => x && x.auf);
    const e2 = z.v === 6 && (Object.values(z1.g || {}).some(g => g && (g.gezogen || g.auf)) || auf(z2.m) || voll(z2.text)
      || auf(z3.m) || ['mu', 's', 'unten', 'oben', 'a', 'b', 'text'].some(k => voll(z3[k])));
    const war = !!(s.auftrag && typeof s.auftrag === 'object' && s.auftrag[2]);
    // GEAENDERT (FASSUNG 8): bis FASSUNG 7 stand hier «z.v !== BN_SV».
    // Gemeint ist die Kennung von FASSUNG 7 (v: 7); BN_SV ist jetzt 8.
    if (z.v !== 7) delete s.sig;
    if (s.auftrag && typeof s.auftrag === 'object') delete s.auftrag[2];
    s.fassung = 9;
    if (e2 || war) bnMeldung(BN.meldung_fassung7, 12000);
  }
  // NEU (gemeinsam entschieden, FASSUNG 8, thema.md «Gespeicherte
  // Stände»): Die Eintraege der Zuege von FASSUNG 7 bleiben, sie heissen
  // jetzt Zug 2-4 (intern bleiben sie 1-3). Zug 1 «Austesten» ist neu: Der
  // Stand beginnt dort, und der Auftrag von Etappe 2 kommt noch einmal.
  // Stand dort schon etwas, gehen Zug 2-4 auf, ohne dass Zug 1 fertig ist
  // (ohneZt), und es kommt ein Hinweis.
  if (s.fassung === 9){
    const z = s.sig, voll = t => String(t || '').trim() !== '';
    let e2 = false;
    if (z && z.v === 7){
      const z1 = z.z1 || {}, z2 = z.z2 || {}, z3 = z.z3 || {}, auf = o => Object.values(o || {}).some(x => x && x.auf);
      e2 = (z1.rows || []).length > 0 || voll(z1.text) || auf(z2.est)
        || Object.values(z2.rows || {}).some(r => (r || []).length > 0) || voll(z2.text)
        || auf(z3.m) || ['mu', 's', 'unten', 'oben', 'a', 'b', 'text'].some(k => voll(z3[k]));
      z.v = BN_SV; z.zug = 0; z.ohneZt = e2;
    }
    if (s.auftrag && typeof s.auftrag === 'object') delete s.auftrag[2];
    s.fassung = 10;
    if (e2) bnMeldung(BN.meldung_fassung8, 12000);
  }
  bnSigStand(s);
  return s;
}
/* Staende bis Fassung 3 kannten fuenf feste Faecher (Ort «Pk», «Pb», «m1»,
   «sonst», «keine») und je Fach einen Text in s.weg. Daraus werden
   Gruppen mit dem Namen des alten Fachs - nur die, in denen etwas lag
   oder stand, in der alten Reihenfolge. */
function bnGruppenAusFaechern(s){
  const alt = s.weg || {}, karten = stand.karten || {};
  s.gruppen = [];
  BN_ALLE_FAECHER().forEach(fa => {
    const drin = Object.keys(karten).filter(id => BN_KARTE[id] && karten[id].ort === fa.ort);
    const text = String(alt[fa.ort] || '');
    if (!drin.length && !text.trim()) return;
    const ort = 'g' + s.gruppen.length;
    s.gruppen.push({name: fa.name, weg: text});
    drin.forEach(id => { karten[id].ort = ort; });
  });
  while (s.gruppen.length < 2) s.gruppen.push({name: '', weg: ''});
  delete s.weg;
}
/* Die Felder einer Karte. n, p und k stehen je Fall (Zeile); jede Karte
   beginnt mit einer Zeile. Staende der ersten Fassung trugen «10 und 5»
   in EINEM Feld - sie werden hier aufgeteilt. */
function bnFelder(id){
  const s = bnStand();
  if (!s.f[id]) s.f[id] = {n: [''], p: [''], P: '', k: [{form: '', a: '', b: ''}], frage: null};
  const f = s.f[id];
  ['n', 'p'].forEach(g => { if (!Array.isArray(f[g])) f[g] = bnListe(f[g]); });
  if (!Array.isArray(f.k)) f.k = [];
  const m = Math.max(1, f.n.length, f.p.length, f.k.length);
  ['n', 'p'].forEach(g => { while (f[g].length < m) f[g].push(''); });
  while (f.k.length < m) f.k.push({form: '', a: '', b: ''});
  // «k kommt nicht vor» ('leer', Fassung 2) und «keine Trefferzahl»
  // ('keine', Fassung 3) sind gestrichen (Nachtrag 2026-10-16).
  f.k.forEach(z => { if (z.form === 'leer' || z.form === 'keine') z.form = ''; });
  return f;
}
const bnEsc = t => String(t).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ───────── Eintraege lesen ─────────
   Zahl:  «90 %», «> 90 %», «0.9», «1/6», «0,25», «–» (kommt nicht vor). */
function bnZahl(txt){
  let t = String(txt || '').trim();
  if (!t) return {leer: true};
  if (t === '?') return {frage: true};
  if (/^[–—-]$/.test(t)) return {strich: true};
  t = t.replace(/^(?:[<>≤≥=]|&lt;|&gt;)+\s*/, '').replace(/\s+/g, '').replace(/,/g, '.');
  let pro = false;
  if (t.endsWith('%')){ pro = true; t = t.slice(0, -1); }
  let w;
  const br = t.match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (br) w = parseFloat(br[1]) / parseFloat(br[2]);
  else if (/^\d*\.?\d+$/.test(t)) w = parseFloat(t);
  else return {unlesbar: true};
  if (pro) w /= 100;
  return {w, pro};
}
function bnListe(t){ return String(t || '').split(/\s*(?:\bund\b|;|&)\s*/i).filter(x => x.trim() !== ''); }
const bnGanz = t => /^\d+$/.test(String(t).trim()) ? parseInt(t, 10) : NaN;

/* Eine Grenze: Zahl, Buchstabe fuer eine Unbekannte, «?» - oder leer. */
function bnGrenze(t){
  const x = String(t || '').trim();
  if (!x) return {leer: true};
  if (/^\d+$/.test(x)) return {w: parseInt(x, 10)};
  if (/^[a-zA-Z?]$/.test(x)) return {w: x.toLowerCase()};
  return {unlesbar: true};
}
/* Der Bereich, der aus einer k-Zeile folgt: [a, b] oder null.
   frage = true: k ist gesucht, die Zahl ist «?» (Fassung 3: «X ≤ ?»). */
function bnKIv(z, nn, frage){
  const g = t => frage ? {w: '?'} : bnGrenze(t);
  if (z.form === 'eq'){
    const a = g(z.a);
    return 'w' in a ? [a.w, a.w] : null;
  }
  if (z.form === 'le'){
    const b = g(z.b);
    return 'w' in b ? [0, b.w] : null;
  }
  if (z.form === 'ge'){
    const a = g(z.a);
    return 'w' in a ? [a.w, nn] : null;
  }
  if (z.form === 'bereich'){
    const a = g(z.a), b = g(z.b);
    if (a.unlesbar || b.unlesbar) return null;
    return [a.leer ? 0 : a.w, b.leer ? nn : b.w];
  }
  return null;
}
/* Die Bedingung, wie die Studierenden sie eingetragen haben - nach der
   gewaehlten Form, nicht nach dem Bereich («X ≥ 4» bleibt «X ≥ 4»). */
function bnKForm(z, frage){
  const w = t => frage ? '?' : (String(t || '').trim() || '…');
  switch (z.form){
    case 'eq': return 'X = ' + w(z.a);
    case 'le': return 'X ≤ ' + w(z.b);
    case 'ge': return 'X ≥ ' + w(z.a);
    case 'bereich': return w(z.a) + ' ≤ X ≤ ' + w(z.b);
    default: return 'X …';
  }
}
const bnIvText = iv => `[${iv[0]}; ${iv[1]}]`;
const bnGrenzeGleich = (e, s) => typeof s === 'number' ? e === s : typeof e === 'string';
const bnIvGleich = (e, s) => Array.isArray(e) && bnGrenzeGleich(e[0], s[0]) && bnGrenzeGleich(e[1], s[1]);

/* Die Laenge der i-ten Kette, wie die Studierenden sie eingetragen haben
   (fuer eine offene obere Grenze). Unbekannt heisst «n». */
function bnLaenge(f, i){
  if (f.frage === 'n') return 'n';
  const v = bnGanz(f.n[i] || '');
  return isNaN(v) ? 'n' : v;
}

/* Bedingung als Text, mit X fuer die Zufallsgroesse (Entscheid
   2026-10-10): «X = 2», «X ≤ 2», «X ≥ 4», «1 ≤ X ≤ 5». */
function bnKText(iv, nn){
  // die gesuchte Grenze heisst in der Seite «?» (Fassung 3). «n» als obere
  // Grenze heisst: bis zur (gesuchten) Laenge der Kette. NEU (FASSUNG 4):
  // Zwei Buchstaben (K26 Wuerfelbude, «a», «b») sind zwei gesuchte
  // Grenzen, «? ≤ X ≤ ?». Verglichen wird deshalb vor dem Ersetzen.
  const g = v => (typeof v === 'string' && v !== 'n') ? '?' : v;
  const [a, b] = [g(iv[0]), g(iv[1])];
  if (iv[0] === iv[1]) return 'X = ' + a;
  const offen = b === nn || b === 'n';
  if (a === 0 && offen) return '0 ≤ X ≤ ' + b;
  if (a === 0) return 'X ≤ ' + b;
  if (offen) return 'X ≥ ' + a;
  return a + ' ≤ X ≤ ' + b;
}
const BN_TEIL = ['Teil I', 'Teil II'];
/* Soll mit mehreren Faellen: Tennis 7.2 (Fallunterscheidung) und 7.7
   (zwei Ketten). */
const bnMehrfach = k => k.soll.ketten.length > 1;
/* Beschriftung der i-ten Zeile. Waehrend der Arbeit heisst jede Zeile
   «Fall 1», «Fall 2» …; die Loesung zeigt die Aufteilung des Skripts
   («Match dauert 3 Sätze», «Teil I»). */
const bnTeil = (k, i) => (stand.loesungOffen && bnMehrfach(k))
  ? (k.faelle ? k.faelle.zeilen[i] : BN_TEIL[i]) : 'Fall ' + (i + 1);
function bnSollText(k){
  // Keine Binomialaufgabe: die Felder bleiben leer (Nachtrag 2026-10-16).
  if (k.ort === BN.ablage.ort) return BN.ablage.name;
  const so = k.soll, E = so.ketten;
  const kette = c => `n = ${c.n} · p = ${c.p === '?' ? '?' : c.p ? c.p.t : '–'} · ` + bnKText(c.iv, c.n);
  const P = `P ${so.P === '?' ? '= ?' : /^[<>≤≥]/.test(so.P.t) ? so.P.t : '= ' + so.P.t}`;
  if (k.faelle)
    return `${E.length} Fälle: ` + E.map(kette).join('; ') + `, ${k.faelle.zusatz} · ` + P;
  const teile = E.map((c, i) => (E.length > 1 ? BN_TEIL[i] + ': ' : '') + kette(c)).join('; ');
  return `${teile} · ${P}`;
}
/* Die Eintraege einer Karte in EINER Zeile (Fassung 3):
   «n = 8 · p = 1/6 · X = 2 · P = ?», das Gesuchte gelb unterlegt.
   Mehrere Faelle: «3 Fälle · n = 2, 3, 4 · p = 0.65 · X = 2 · P = ?» -
   gleiche Eintraege nur einmal. */
function bnFelderKurz(f, k){
  const wert = v => { const t = String(v || '').trim(); return t ? bnEsc(t) : '<span class="leer">…</span>'; };
  const gs = (frage, html) => frage ? `<span class="gs">${html}</span>` : html;
  const Pt = String(f.P || '').trim();
  const P = f.frage === 'P' ? 'P = ?' : /^[<>≤≥]/.test(Pt) ? 'P ' + bnEsc(Pt) : 'P = ' + wert(Pt);
  const einmal = l => [...new Set(l)].join(', ');
  return (f.n.length > 1 ? `${f.n.length} Fälle · ` : '')
    + gs(f.frage === 'n', 'n = ' + (f.frage === 'n' ? '?' : einmal(f.n.map(wert))))
    + ' · ' + gs(f.frage === 'p', 'p = ' + (f.frage === 'p' ? '?' : einmal(f.p.map(wert))))
    + ' · ' + gs(f.frage === 'k', einmal(f.k.map(z => bnEsc(bnKForm(z, f.frage === 'k')))))
    + ' · ' + gs(f.frage === 'P', P);
}
/* NEU (gemeinsam entschieden, FASSUNG 7): dieselben Angaben als vier
   Chips n · p · k · P fuer das eingeordnete Kaertchen, je in der Farbe
   des Feldes; das Gesuchte gefuellt (.gs). Mehrere Faelle wie oben:
   gleiche Eintraege nur einmal, davor «2 Fälle». */
function bnChips(f){
  const wert = v => { const t = String(v || '').trim(); return t ? bnEsc(t) : '<span class="leer">…</span>'; };
  const einmal = l => [...new Set(l)].join(', ');
  const chip = (g, html) => `<span class="bn-chip m-${g}${f.frage === g ? ' gs' : ''}" data-g="${g}"`
    + `${f.frage === g ? ' title="gesucht"' : ''}>${html}</span>`;
  const Pt = String(f.P || '').trim();
  const P = f.frage === 'P' ? 'P = ?' : /^[<>≤≥]/.test(Pt) ? 'P ' + bnEsc(Pt) : 'P = ' + wert(Pt);
  return (f.n.length > 1 ? `<span class="fz">${f.n.length} Fälle</span>` : '')
    + chip('n', 'n = ' + (f.frage === 'n' ? '?' : einmal(f.n.map(wert))))
    + chip('p', 'p = ' + (f.frage === 'p' ? '?' : einmal(f.p.map(wert))))
    + chip('k', einmal(f.k.map(z => bnEsc(bnKForm(z, f.frage === 'k')))))
    + chip('P', P);
}

/* ───────── Pruefen der vier Felder ─────────
   Liefert {art: ok|falsch|halb|offen, text, felder: {n,p,k,P: art}}
   oder null, wenn auf der Karte noch nichts steht. */
function bnUrteil(k, fAlle){
  const so = k.soll, E = so.ketten, F = {}, texte = [];
  const f = fAlle;
  const leer = !f.frage && !f.n.some(x => x.trim()) && !f.p.some(x => x.trim()) && !f.P.trim() && f.k.every(z => !z.form);
  if (leer) return null;
  // NEU (gemeinsam entschieden, Nachtrag 2026-10-16): Bei Aufgaben, die
  // keine Binomialaufgaben sind, werden die Felder nicht geprueft.
  if (k.ort === BN.ablage.ort) return null;
  if (k.pruefen) return {art: 'offen', felder: {}, text: 'Wird nicht gewertet. Ein Vorschlag: '
    + bnSollText(k) + (k.notiz ? ' — ' + k.notiz : '')};
  // NEU (gemeinsam entschieden, Rike 2026-10-16: «7.2 macht keinen Sinn,
  // weil wir jetzt schon die Fallunterscheidung vorgeben.»): Karten mit
  // mehreren Faellen im Soll (Tennis, 7.7) werden nicht hart geprueft -
  // wie man die Faelle aufteilt, ist offen.
  if (bnMehrfach(k)) return {art: 'offen', mehr: true, text: 'Mehrere Fälle – vergleichen Sie mit der Lösung.',
    felder: {n: 'halb', p: 'halb', k: 'halb', P: 'halb'}};
  // Alle anderen Karten: geprueft wird der erste Fall; jeder weitere ist
  // zu viel («Hier genügt ein Fall»).
  const zuviel = fAlle.n.length > 1;
  // NEU (gemeinsam entschieden, FASSUNG 4): In Zug 2 sind nur das «?» und
  // die k-Form Pflicht. Leere Felder n, p und P werden nicht angemerkt;
  // was eingetragen ist, wird geprueft wie bisher.
  const locker = k.zug === 2;
  // Ist n in Zug 2 leer geblieben, gilt fuer eine offene obere Grenze
  // («X ≥ 1») die Laenge aus der Aufgabe - sonst waere «X ≥ 1» falsch,
  // nur weil das freiwillige n fehlt.
  const laenge = (f, i) => (locker && !String(f.n[i] || '').trim() && typeof (E[i] || {}).n === 'number')
    ? E[i].n : bnLaenge(f, i);
  if (zuviel) texte.push({art: 'falsch', t: 'Hier genügt ein Fall.'});
  fAlle = Object.assign({}, fAlle, {n: fAlle.n.slice(0, 1), p: fAlle.p.slice(0, 1), k: fAlle.k.slice(0, 1)});
  const rang = {ok: 0, halb: 1, falsch: 2};
  const setze = (g, art, t) => {
    if (!F[g] || rang[art] > rang[F[g]]) F[g] = art;
    if (t && art !== 'ok') texte.push({art, t});
  };
  let notiz = '';
  {
  const f = fAlle;

  // 1 - das «?»
  if (!f.frage) texte.push({art: 'falsch', t: 'Welche Grösse ist gesucht? Setzen Sie dort das «?».'});
  else if (f.frage !== k.gesucht) setze(f.frage, 'falsch', `Ist hier wirklich ${f.frage} gesucht?`);
  else setze(f.frage, 'ok');

  // 2 - P
  if (so.P !== '?' && f.frage !== 'P'){
    const z = bnZahl(f.P);
    if (z.leer){ if (!locker) setze('P', 'falsch', 'P steht in der Aufgabe — tragen Sie den Wert ein.'); }
    else if (!('w' in z)) setze('P', 'falsch', 'Bei P steht eine Zahl, z. B. 90 % oder 0.9.');
    else {
      const w = (!z.pro && z.w > 1) ? z.w / 100 : z.w;
      if (Math.abs(w - so.P.w) < 6e-4) setze('P', 'ok');
      else setze('P', 'falsch', 'Dieser Wert für P steht so nicht in der Aufgabe.');
    }
  } else if (so.P === '?' && f.frage !== 'P' && f.P.trim() && !/^[–—-]$/.test(f.P.trim()))
    setze('P', 'falsch', 'Steht diese Wahrscheinlichkeit wirklich in der Aufgabe?');

  // 3 - die Ketten: n, p, k
  const m = E.length;
  const ns = (f.frage === 'n' || E[0].n === '?' || so.frei) ? null : f.n;
  const ps = (f.frage === 'p' || E[0].p === '?' || !E[0].p || so.frei) ? null : f.p;
  // Fassung 3: k wird auch geprueft, wenn es gesucht ist - die Form
  // bleibt stehen («X ≤ ?»).
  const kFrage = f.frage === 'k';
  let ks = f.k;
  // typische Fehleintraege beim k zuerst - sie haben die genauere Rueckmeldung
  let kErledigt = false;
  if (ks && !kFrage){
    const ivs = ks.map((z, i) => bnKIv(z, laenge(f, i)));
    for (const fe of k.fehler){
      if (fe.iv.length === ivs.length && fe.iv.every((s, i) => Array.isArray(ivs[i]) && ivs[i][0] === s[0] && ivs[i][1] === s[1])){
        setze('k', fe.art, fe.text); kErledigt = true; break;
      }
    }
  }

  // Geprueft werden nur Karten mit einem Fall (siehe oben).
  const reihen = [E.map((_, j) => j)];
  let beste = null;
  reihen.forEach(r => {
    const G = {}, T = [];
    let note = '';
    const s2 = (g, art, t) => { if (!G[g] || rang[art] > rang[G[g]]) G[g] = art; if (t && art !== 'ok') T.push({art, t}); };
    E.forEach((c, j) => {
      const i = r[j];
      // n
      if (ns && ns.length === m){
        const v = bnGanz(ns[i]);
        if (v === c.n) s2('n', 'ok');
        else if (!ns[i].trim()){ if (!locker) s2('n', 'falsch', 'n steht in der Aufgabe — tragen Sie es ein.'); }
        else s2('n', 'falsch', /^[–—-]$/.test(ns[i].trim()) ? 'n kommt in der Aufgabe vor.' : 'n passt nicht: Wie lang ist die Kette?');
      }
      // p und k gehoeren zusammen: wer die Nieten zaehlt, nimmt 1 - p
      let pDirekt = null, pSpiegel = null;
      if (ps && ps.length === m){
        const z = bnZahl(ps[i]);
        if (z.leer && locker){ /* freiwillig in Zug 2 */ }
        else if (!('w' in z)) s2('p', 'falsch', z.leer ? 'p steht in der Aufgabe — tragen Sie es ein.'
          : z.strich ? 'p kommt in der Aufgabe vor.' : 'Bei p steht eine Zahl, z. B. 1/6 oder 0.25.');
        else {
          const w = (!z.pro && z.w > 1) ? z.w / 100 : z.w;
          pDirekt = Math.abs(w - c.p.w) < 6e-4; pSpiegel = Math.abs(w - (1 - c.p.w)) < 6e-4;
          if (!pDirekt && !pSpiegel){
            if (Math.abs(w - c.p.w) < 0.01) s2('p', 'halb', 'Ungefähr — genauer, z. B. als Bruch.');
            else s2('p', 'falsch', 'p passt nicht: Wie wahrscheinlich ist ein Treffer?');
          }
        }
      }
      if (ks && !kErledigt && ks.length === m){
        const z = ks[i], iv = bnKIv(z, laenge(f, i), kFrage);
        // NEU (gemeinsam entschieden, FASSUNG 4): beide Grenzen gesucht
        // (K26). Mit «?» liefern «X = ?» und «? ≤ X ≤ ?» denselben Bereich
        // [?; ?] - hier zaehlt deshalb die Form selbst.
        const beide = Array.isArray(c.iv) && typeof c.iv[0] === 'string' && typeof c.iv[1] === 'string';
        if (!z.form) s2('k', 'falsch', 'Wählen Sie bei k zuerst die Form.');
        else if (!iv) s2('k', 'falsch', 'Bei k fehlt noch ein Wert.');
        else if (kFrage && beide && z.form !== 'bereich')
          s2('k', 'falsch', 'Hier fehlt mehr als eine Grenze. Welche Form passt dazu?');
        else if (kFrage && !bnIvGleich(iv, c.iv) && !(c.spiegel && bnIvGleich(iv, c.spiegel)))
          s2('k', 'falsch', 'Welche Form hat das Gesuchte: ein Wert, höchstens, mindestens oder ein Bereich?');
        else {
          const direkt = bnIvGleich(iv, c.iv), spiegel = c.spiegel && bnIvGleich(iv, c.spiegel);
          if (direkt){
            s2('k', 'ok');
            if (pSpiegel && !pDirekt) s2('p', 'falsch', 'Mit 1 − p zählen Sie die Nieten — k zählt hier aber die Treffer.');
            else if (pDirekt !== null) s2('p', 'ok');
          } else if (spiegel){
            if (pDirekt && !pSpiegel) s2('k', 'falsch', 'So zählt k die Nieten — zu diesem p gehören die Treffer.');
            else { s2('k', 'ok'); if (pSpiegel) s2('p', 'ok'); note = 'Richtig — Sie zählen das Gegenteil als Treffer. Das geht auch.'; }
          } else {
            const unbekannt = (typeof c.iv[1] === 'string' && typeof iv[1] === 'number' && iv[0] === c.iv[0])
              || (typeof c.iv[0] === 'string' && typeof iv[0] === 'number' && iv[1] === c.iv[1]);
            const knapp = [c.iv, c.spiegel].some(s => s && typeof s[0] === 'number' && typeof s[1] === 'number'
              && typeof iv[0] === 'number' && typeof iv[1] === 'number'
              && Math.abs(iv[0] - s[0]) + Math.abs(iv[1] - s[1]) === 1);
            if (unbekannt) s2('k', 'halb', 'Diese Grenze kennt man nicht — sie hängt an der gesuchten Grösse. Lassen Sie sie offen.');
            else s2('k', 'falsch', knapp ? 'Knapp daneben: Gehört die Grenze dazu? «Mehr als 3» heisst X ≥ 4, «weniger als 5» heisst X ≤ 4.'
              : 'Diese Bedingung an k passt nicht zur Frage.');
          }
        }
      } else if (pDirekt) s2('p', 'ok');
      else if (pSpiegel && !kErledigt) s2('p', 'falsch', 'p passt nicht: Wie wahrscheinlich ist ein Treffer?');
    });
    const fehl = Object.values(G).filter(a => a !== 'ok').length;
    if (!beste || fehl < beste.fehl) beste = {G, T, note, fehl};
  });
  Object.entries(beste.G).forEach(([g, art]) => setze(g, art));
  texte.push(...beste.T); notiz = beste.note;

  }
  const art = texte.some(t => t.art === 'falsch') ? 'falsch' : texte.some(t => t.art === 'halb') ? 'halb' : 'ok';
  const erst = texte.find(t => t.art === art);
  return {art, felder: F, zuviel, text: art === 'ok' ? notiz : erst.t};
}

/* ───────── Text in markierbare Stuecke zerlegen ─────────
   Zahlen (auch mit Dezimalpunkt) samt «%» sind EIN Stueck, Woerter je
   eines; Leerraum und Satzzeichen sind nicht markierbar. Zwischen zwei
   gleich markierten Stuecken wird der Leerraum mitgefaerbt - so liest
   sich «mindestens zwei» als eine Markierung. */
function bnStuecke(text){
  const re = /(\d+(?:[.,]\d+)?(?:[\s ]?%)?)|([\p{L}\-]+)|(\s+)|(.)/gu;
  let m, i = 0, html = '';
  while ((m = re.exec(text))){
    if (m[1] || m[2]) html += `<span class="w" data-i="${i++}">${bnEsc(m[0])}</span>`;
    else if (m[3]) html += `<span class="ws">${m[0]}</span>`;
    else html += bnEsc(m[0]);
  }
  return html;
}
function bnMalen(textEl, marken){
  const kn = [...textEl.children];
  kn.forEach(el => BN_ARTEN.forEach(a => el.classList.remove('m-' + a)));
  kn.forEach((el, j) => {
    if (el.classList.contains('w')){
      const a = marken[el.dataset.i];
      if (a) el.classList.add('m-' + a);
    } else if (el.classList.contains('ws')){
      const v = kn[j - 1], n = kn[j + 1];
      if (v && n && v.classList.contains('w') && n.classList.contains('w')){
        const a = marken[v.dataset.i];
        if (a && a === marken[n.dataset.i]) el.classList.add('m-' + a);
      }
    }
  });
}
function bnStiftWinken(){
  const b = document.getElementById('bnstifte');
  if (!b) return;
  b.classList.remove('winke'); void b.offsetWidth; b.classList.add('winke');
}

/* ───────── Eine Textkarte ───────── */
function bnKarte(k){
  const s = bnStand();
  const el = document.createElement('div');
  el.className = 'k bn-k' + (k.pruefen ? ' pruefen' : '');
  el.dataset.id = k.id; el._x = 0; el._y = 0; el._rot = 0;
  el.innerHTML = `<div class="bn-kk"><b>${k.bild ? `<img src="${bnEsc(k.bild)}" alt="" aria-hidden="true">` : ''}${bnEsc(k.quelle)}</b><span>${k.knacknuss ? 'Knacknuss' : ''}</span></div>
    <div class="bn-text">${bnStuecke(k.text)}</div>
    <div class="bn-felder"></div>
    <div class="bn-hinweis"></div>
    <div class="bn-formel"></div>
    <div class="bn-kurz"><div class="bn-kz"><b>${bnEsc(k.kurz)}</b><button type="button" class="bn-auf"
      aria-expanded="false" title="Den ganzen Aufgabentext und die Felder zeigen">Text ▾</button></div>
      <div class="bn-chips bn-kw"></div></div>`;
  const text = el.querySelector('.bn-text');
  bnMalen(text, s.mark[k.id] || {});
  bnFormelSetzen(el);

  // NEU (FASSUNG 7): «Text ▾» klappt das eingeordnete Kaertchen auf.
  // Wer es anfasst, zieht nicht.
  const auf = el.querySelector('.bn-auf');
  auf.addEventListener('pointerdown', e => e.stopPropagation());
  auf.addEventListener('click', e => {
    e.stopPropagation();
    bnAuf[k.id] = !bnAuf[k.id];
    bnAufSetzen(el);
    bnNachFeldern();
  });

  /* Textmarker. pointerdown im GANZEN Textbereich geht nicht bis zu
     ziehbar() durch: Gezogen wird am Kartenkopf und an den Feldern. */
  text.addEventListener('pointerdown', e => {
    e.stopPropagation();
    if (document.body.classList.contains('loesungoffen')) return;
    const stift = s.stift;
    if (!stift){ bnStiftWinken(); return; }
    e.preventDefault();
    const vorher = Object.assign({}, s.mark[k.id] || {});
    const w0 = e.target.closest('.w');
    let start = w0 ? +w0.dataset.i : null, ende = start, bewegt = false;
    const anwenden = () => {
      const m = Object.assign({}, vorher);
      if (start !== null){
        const a = Math.min(start, ende), b = Math.max(start, ende);
        // Ein Klick mit demselben Stift auf ein schon markiertes Stueck nimmt die Farbe weg.
        if (a === b && !bewegt && vorher[a] === stift) delete m[a];
        else for (let i = a; i <= b; i++){ if (stift === 'weg') delete m[i]; else m[i] = stift; }
      }
      s.mark[k.id] = m; bnMalen(text, m);
    };
    anwenden();
    const zug = ev => {
      const t = document.elementFromPoint(ev.clientX, ev.clientY);
      const w = t && t.closest ? t.closest('.w') : null;
      if (!w || !text.contains(w)) return;
      const i = +w.dataset.i;
      if (start === null) start = i;
      if (i !== start) bewegt = true;
      if (i !== ende){ ende = i; anwenden(); }
    };
    const fertig = () => {
      window.removeEventListener('pointermove', zug);
      window.removeEventListener('pointerup', fertig);
      window.removeEventListener('pointercancel', fertig);
      sichern();
    };
    window.addEventListener('pointermove', zug);
    window.addEventListener('pointerup', fertig);
    window.addEventListener('pointercancel', fertig);
  });

  bnFelderBauen(el);
  el.ondragstart = () => false;
  ziehbar(el);
  return el;
}

/* Die vier Felder einer Karte, Reihenfolge n, p, k, P (neu gebaut bei
   jeder Aenderung der Form und beim «?»; Tippen baut nicht neu). Bei zwei
   Ketten stehen n, p und k je Kette in einer Zeile «Teil I» / «Teil II»,
   P steht einmal darunter. */
function bnFelderBauen(el){
  const k = BN_KARTE[el.dataset.id], f = bnFelder(k.id);
  const m = f.n.length;
  const box = el.querySelector('.bn-felder');
  const qKnopf = (g, an) => `<button class="bn-q" data-g="${g}" aria-pressed="${an}"
      title="${an ? '«?» wieder wegnehmen' : g + ' ist gesucht'}">?</button>`;
  const zahlFeld = (g, i, titel) => {
    const wert = i === null ? f[g] : f[g][i];
    const di = i === null ? '' : ` data-i="${i}"`;
    return f.frage === g
      ? `<span class="bn-f m-${g}"><span class="bn-fn">${g}</span><span class="bn-frage" data-g="${g}">?</span>${qKnopf(g, true)}</span>`
      : `<span class="bn-f m-${g}"><span class="bn-fn">${g}</span><input type="text" data-g="${g}"${di} spellcheck="false"
          value="${bnEsc(wert)}" aria-label="${g}${m > 1 && i !== null ? ' ' + bnTeil(k, i) : ''} zu ${bnEsc(k.kurz)}" title="${titel}">${qKnopf(g, false)}</span>`;
  };
  /* k: zuerst eine der vier Formen, dann die Zahl. Ist k gesucht, bleibt die Form stehen und die Zahl ist «?»
     (Fassung 3). */
  const kZeile = i => {
    const z = f.k[i], kf = f.frage === 'k';
    const sel = `<select data-i="${i}" aria-label="Form von k">
      <option value="" ${z.form === '' ? 'selected' : ''}>Form wählen …</option>
      ${BN.kformen.map(o =>
        `<option value="${o.form}" ${z.form === o.form ? 'selected' : ''}>${bnEsc(o.text)}</option>`).join('')}</select>`;
    const feld = (w, ph, titel) => kf ? `<span class="bn-frage" data-g="k">?</span>`
      : `<input class="gr" type="text" data-i="${i}" data-w="${w}" value="${bnEsc(z[w])}" placeholder="${ph}" aria-label="${titel}" title="${titel}">`;
    let werte = '';
    // Die Form steht schon in der Auswahl («X ≤ k»); daneben nur k selbst.
    if (z.form === 'eq') werte = feld('a', 'k', 'Wert k');
    if (z.form === 'le') werte = feld('b', 'k', 'obere Grenze k');
    if (z.form === 'ge') werte = feld('a', 'k', 'untere Grenze k');
    if (z.form === 'bereich') werte = `${feld('a', 'a', 'untere Grenze a')}<span class="op">≤ X ≤</span>${feld('b', 'b', 'obere Grenze b')}`;
    if (kf && !z.form) werte = '<span class="bn-frage" data-g="k">?</span>';
    return `<div class="bn-krow m-k"><span class="bn-fn">k</span>${sel}${werte}<span class="bn-iv" data-i="${i}"></span>${qKnopf('k', kf)}</div>`;
  };
  const offen = document.body.classList.contains('loesungoffen');
  let html = '';
  for (let i = 0; i < m; i++){
    html += `<div class="bn-kette" data-i="${i}">${m > 1 ? `<div class="bn-teil">${bnEsc(bnTeil(k, i))}${i && !offen
        ? `<button type="button" class="bn-fallweg" data-i="${i}" title="Diesen Fall wieder wegnehmen" aria-label="Fall ${i + 1} wegnehmen">×</button>` : ''}</div>` : ''}
      <div class="bn-frow">${zahlFeld('n', i, 'eine Zahl, «?» oder «–»')}${zahlFeld('p', i, 'z. B. 1/6 oder 0.25, «?» oder «–»')}</div>
      ${kZeile(i)}${offen && k.faelle && m > 1 ? `<div class="bn-zusatz">${bnEsc(k.faelle.zusatz)}</div>` : ''}</div>`;
  }
  // NEU (gemeinsam entschieden, Rike 2026-10-16: «7.2 macht keinen Sinn,
  // weil wir jetzt schon die Fallunterscheidung vorgeben.»): Auf JEDER
  // Karte, damit der Knopf nichts verraet.
  if (!offen) html += `<button type="button" class="bn-fall" title="noch eine Zeile n, p, k">+ weiterer Fall</button>`;
  html += `<div class="bn-frow">${zahlFeld('P', null, 'z. B. 90 %, «?» oder «–»')}</div>`;
  box.innerHTML = html;

  // Nichts in den Feldern startet ein Ziehen.
  box.querySelectorAll('input,select,button').forEach(x => {
    x.addEventListener('pointerdown', e => e.stopPropagation());
    x.addEventListener('click', e => e.stopPropagation());
  });
  // GEAENDERT (Fassung 10.1, Rike 2026-11-26): Die Formel erscheint, sobald
  // die Karte richtig ausgefuellt ist - nicht erst nach «Pruefen».
  const geaendert = () => {
    bnUrteilWeg(el); bnKurzAuffrischen(el);
    const k = BN_KARTE[el.dataset.id];
    if (k && k.formel && !bnStand().formel[k.id]){
      const u = bnUrteil(k, bnFelder(k.id));
      if (u && u.art === 'ok'){ bnStand().formel[k.id] = true; bnFormelSetzen(el); bnNachFeldern(); }
    }
    sichern();
  };
  box.querySelectorAll('.bn-frow input').forEach(inp => inp.addEventListener('input', () => {
    if (inp.dataset.g === 'P') f.P = inp.value; else f[inp.dataset.g][+inp.dataset.i] = inp.value;
    bnIvAuffrischen(el); geaendert();
  }));
  box.querySelectorAll('select').forEach(sel => sel.addEventListener('change', () => {
    const z = f.k[+sel.dataset.i];
    // Beim Wechsel der Form wandert die Zahl mit: «X ≥ 4» -> «X ≤ 4».
    const alt = String(z.a || z.b || '').trim();
    z.form = sel.value;
    if (z.form === 'le'){ z.b = z.b || alt; z.a = ''; }
    if (z.form === 'eq' || z.form === 'ge'){ z.a = z.a || alt; z.b = ''; }
    bnFelderBauen(el); geaendert(); bnNachFeldern();
    const erstes = el.querySelector(`.bn-krow input[data-i="${sel.dataset.i}"]`);
    if (erstes) erstes.focus();
  }));
  box.querySelectorAll('.bn-krow input').forEach(inp => inp.addEventListener('input', () => {
    f.k[+inp.dataset.i][inp.dataset.w] = inp.value; bnIvAuffrischen(el); geaendert();
  }));
  const fall = box.querySelector('.bn-fall');
  if (fall) fall.addEventListener('click', () => {
    f.n.push(''); f.p.push(''); f.k.push({form: '', a: '', b: ''});
    bnFelderBauen(el); geaendert(); bnNachFeldern();
    const neu = el.querySelector(`.bn-kette[data-i="${f.n.length - 1}"] input`);
    if (neu) neu.focus();
  });
  box.querySelectorAll('.bn-fallweg').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.i;
    f.n.splice(i, 1); f.p.splice(i, 1); f.k.splice(i, 1);
    bnFelderBauen(el); geaendert(); bnNachFeldern();
  }));
  box.querySelectorAll('.bn-q').forEach(b => b.addEventListener('click', () => {
    f.frage = f.frage === b.dataset.g ? null : b.dataset.g;      // genau eines
    bnFelderBauen(el); geaendert(); bnNachFeldern();
  }));
  if (document.body.classList.contains('loesungoffen')) box.querySelectorAll('input,select,button').forEach(x => { x.disabled = true; });
  bnIvAuffrischen(el);
  bnKurzAuffrischen(el);
}
/* Die Karte ist hoeher oder niedriger geworden - der Tisch muss neu legen. */
function bnNachFeldern(){ if (window._bnOrdnen) window._bnOrdnen(); }

function bnIvAuffrischen(el){
  const f = bnFelder(el.dataset.id);
  el.querySelectorAll('.bn-iv').forEach(sp => {
    const i = +sp.dataset.i, z = f.k[i];
    if (!z || z.form === '' || f.frage === 'k'){ sp.textContent = ''; return; }
    const iv = bnKIv(z, bnLaenge(f, i));
    sp.textContent = iv ? '→ ' + bnIvText(iv) : '→ [ ; ]';
  });
}
/* NEU (FASSUNG 7): welche eingeordneten Kaertchen aufgeklappt sind -
   nur fuer diese Sitzung, nicht im Stand. Auf dem Tisch gilt es nicht. */
const bnAuf = {};
function bnAufSetzen(el){
  const an = !!bnAuf[el.dataset.id];
  el.classList.toggle('auf', an);
  const b = el.querySelector('.bn-auf');
  b.textContent = an ? 'Text ▴' : 'Text ▾';
  b.setAttribute('aria-expanded', String(an));
  b.title = an ? 'Wieder zuklappen' : 'Den ganzen Aufgabentext und die Felder zeigen';
}
function bnKurzAuffrischen(el){
  const k = BN_KARTE[el.dataset.id], f = bnFelder(k.id);
  el.querySelector('.bn-kw').innerHTML = bnChips(f);
  el.title = k.quelle + ': ' + k.text;
}
/* NEU (Fassung 10, Rike 2026-11-25, nach Maurus): die Bernoulli-Formel
   auf der Karte, das Gesuchte gelb - erst, wenn die Karte einmal richtig
   ausgefuellt war (oder in der Loesung). k.formel kommt aus
   inhalte.formel_html(). */
function bnFormelSetzen(el){
  const k = BN_KARTE[el.dataset.id], f = el.querySelector('.bn-formel');
  if (!k || !f) return;
  const an = !!k.formel && (!!bnStand().formel[k.id] || document.body.classList.contains('loesungoffen'));
  f.classList.toggle('an', an);
  f.innerHTML = an ? `<span class="was">${bnEsc(BN.formelKopf)}</span>${k.formel}` : '';
}
function bnUrteilWeg(el){
  el.querySelectorAll('.bn-felder .ok,.bn-felder .falsch,.bn-felder .halb,.bn-chip.ok,.bn-chip.falsch,.bn-chip.halb')
    .forEach(x => x.classList.remove('ok', 'falsch', 'halb'));
  const h = el.querySelector('.bn-hinweis');
  h.textContent = ''; h.className = 'bn-hinweis';
  if (stand.loesungOffen) bnLoesungZeigen(el);
}
/* GEAENDERT (FASSUNG 7): Die Sollangaben stehen in .soll - auf dem
   zugeklappten Kaertchen zeigen sie schon die Chips, dort bleibt nur die
   Loesung mit Notiz. */
function bnLoesungZeigen(el){
  const k = BN_KARTE[el.dataset.id], h = el.querySelector('.bn-hinweis');
  h.innerHTML = 'Lösung: <span class="soll">' + bnEsc(bnSollText(k)) + ' · </span>'
    + bnEsc(k.loesung + (k.notiz ? ' — ' + k.notiz : ''));
}

/* ───────── Gruppen, Schreibfelder, Sicht ─────────
   NEU (gemeinsam entschieden, Nachtrag 2026-10-16, Rike «ja»): frei
   gruppieren wie in Reflexion 1, Etappe 2 (kombinatorik/etappen.js):
   Gruppen mit selbst gewaehltem Namen, Ort «g0», «g1» …, dazu ein Wink
   «+ neue Gruppe», auf den man klickt oder eine Karte zieht. Unter jeder
   Gruppe das Schreibfeld. Nichts davon wird geprueft. */
function bnGruppenBauen(feld){
  feld.innerHTML = '';
  const s = bnStand(), offen = document.body.classList.contains('loesungoffen');
  const belegt = bnBelegt();
  s.gruppen.forEach((g, i) => {
    const ort = 'g' + i;
    const c = document.createElement('div');
    c.className = 'feld bn-fach';
    c.dataset.ort = ort;
    c.innerHTML = `<div class="kopf"><input class="gname" type="text" spellcheck="true"
        placeholder="Wie heisst diese Gruppe?" aria-label="Name der Gruppe ${i + 1}">${
        !belegt[ort] && s.gruppen.length > 1 && !offen
          ? `<button type="button" class="gweg" title="Leere Gruppe wegnehmen" aria-label="Gruppe ${i + 1} wegnehmen">×</button>` : ''}</div>
      ${belegt[ort] ? '' : '<span class="leerhinweis">Karten hierher ziehen</span>'}`;
    const inp = c.querySelector('input');
    inp.value = g.name || '';
    inp.addEventListener('pointerdown', e => e.stopPropagation());
    inp.addEventListener('input', () => { g.name = inp.value; bnSichtKnopf(); sichern(); });
    if (offen) inp.disabled = true;
    const weg = c.querySelector('.gweg');
    if (weg) weg.onclick = () => bnGruppeWeg(i);
    feld.appendChild(c);
    const w = document.createElement('div');
    w.className = 'bn-weg'; w.dataset.fach = ort;
    w.innerHTML = `<label for="bnweg-${ort}">${bnEsc(BN.schreibfrage)}</label>`
      + `<textarea id="bnweg-${ort}" spellcheck="true"></textarea>`;
    const ta = w.querySelector('textarea');
    ta.value = g.weg || '';
    ta.addEventListener('input', () => { g.weg = ta.value; sichern(); });
    if (offen) ta.disabled = true;
    feld.appendChild(w);
  });
  if (!offen){
    const neu = document.createElement('div');
    neu.className = 'feld neu bn-neu'; neu.dataset.ort = 'neuegruppe';
    neu.innerHTML = '<span>+ neue Gruppe — klicken oder eine Karte hierher ziehen</span>';
    neu.onclick = () => { s.gruppen.push({name: '', weg: ''}); sichern(); if (window._neuzeichnen) window._neuzeichnen(); };
    feld.appendChild(neu);
  }
  const sicht = document.createElement('div');
  sicht.className = 'bn-sicht';
  feld.appendChild(sicht);
  // NEU (gemeinsam entschieden, FASSUNG 6): In Zug 1 kuendigt ein
  // ausgegrauter Kasten unter den Gruppen die Skript-Aufgaben an.
  if (!s.sicht && !offen){
    const da = document.createElement('div');
    da.className = 'bn-danach'; da.setAttribute('aria-disabled', 'true');
    da.innerHTML = `<b>${bnEsc(BN.danach.kopf)}</b> ${bnEsc(BN.danach.text)}`;
    feld.appendChild(da);
  }
  bnSichtKnopf();
}
/* Welche Gruppen tragen Karten? {g0: 3, …} */
function bnBelegt(){
  const b = {};
  BN.karten.forEach(k => {
    const st = stand.karten && stand.karten[k.id];
    if (st && /^g\d+$/.test(st.ort)) b[st.ort] = (b[st.ort] || 0) + 1;
  });
  return b;
}
/* Eine leere Gruppe wegnehmen; die Karten dahinter ruecken nach. */
function bnGruppeWeg(i){
  const s = bnStand();
  if (bnBelegt()['g' + i] || s.gruppen.length < 2) return;
  s.gruppen.splice(i, 1);
  Object.values(stand.karten).forEach(st => {
    const m = /^g(\d+)$/.exec(st.ort || '');
    if (m && +m[1] > i) st.ort = 'g' + (+m[1] - 1);
  });
  sichern();
  if (window._neuzeichnen) window._neuzeichnen();
}
/* Eine Karte auf dem Wink macht eine neue Gruppe auf (siehe ablegen()). */
function bnNeueGruppe(el, winkOrt){
  if (winkOrt !== 'neuegruppe') return winkOrt;
  const s = bnStand();
  s.gruppen.push({name: '', weg: ''});
  return 'g' + (s.gruppen.length - 1);
}
/* «Eine mögliche Sicht» erst, wenn alle Karten in Gruppen liegen und
   jede Gruppe mit Karten einen Namen hat. NEU (FASSUNG 4): in Zug 1 die
   Chilbi-Karten (seit FASSUNG 6 neun), in Zug 2 (bnSicht2Bereit) die
   Pflichtkarten. */
function bnInGruppen(liste){
  const s = bnStand(), belegt = bnBelegt();
  const alle = liste.every(k => { const st = stand.karten[k.id]; return st && /^g\d+$/.test(st.ort); });
  const benannt = s.gruppen.every((g, i) => !belegt['g' + i] || String(g.name || '').trim().length >= 2);
  return {alle, benannt, ja: alle && benannt};
}
const bnSichtBereit = () => bnInGruppen(BN.karten.filter(k => k.zug === 1));
const bnSicht2Bereit = () => bnInGruppen(BN.karten.filter(k => k.zug === 2 && k.pflicht));
/* Welche Karten liegen in dieser Etappe? Zug 1: die Chilbi-Karten. Ab
   Zug 2 (Sicht von Zug 1 offen) auch die Skriptkarten; die freiwilligen
   auf dem Tisch nur, wenn ihr Stapel aufgeklappt ist. */
function bnSichtbar(k){
  const s = bnStand();
  if (k.zug === 1) return true;
  if (!s.sicht) return false;
  if (!bnFreiwillig(k) || s.freiOffen) return true;
  const st = stand.karten && stand.karten[k.id];
  return !!(st && st.ort && st.ort !== 'tisch');
}
/* Der Inhalt von «Eine mögliche Sicht»: Stufe 1 die fuenf Gruppen mit den
   Chilbi-Karten, Stufe 2 (nach Zug 2) dazu die Skriptkarten.
   PRUEFEN (thema.md, nach dem Bau anschauen): Zeigt die Sicht nach Zug 2
   die eigenen Gruppen mit Vermerken, oder Kaspers fuenf Gruppen? Gebaut
   ist das Zweite. */
function bnSichtHtml(stufe){
  const nach = {};
  BN.karten.forEach(k => {
    const o = nach[k.ort] = nach[k.ort] || {c: [], s: []};
    (k.zug === 1 ? o.c : o.s).push(k.kurz);
  });
  const liste = (titel, l) => l.length ? `<span class="ks">${bnEsc(titel)}: ${bnEsc(l.join(', '))}</span>` : '';
  return `<div class="box"><h4>${stufe === 2 ? bnEsc(BN_Z2.sicht) : 'Eine mögliche Sicht'}</h4>
      ${stufe === 2 ? 'Dieselben fünf Gruppen, jetzt auch mit den Aufgaben aus dem Skript:'
        : 'Man kann die Aufgaben in fünf Gruppen einteilen — nach dem Gesuchten und danach, wie k aussieht:'}
      <ol>${BN_ALLE_FAECHER().map(fa => { const o = nach[fa.ort] || {c: [], s: []};
        return `<li><b>${bnEsc(fa.name)}</b><br>${liste(BN.sicht.chilbi, o.c)}${stufe === 2 && o.s.length
          ? (o.c.length ? '<br>' : '') + liste(BN.sicht.skript, o.s) : ''}<br>${bnEsc(BN.sicht.faecher[fa.ort])}</li>`; }).join('')}</ol>
      <div style="margin-top:4px;color:var(--matt);font-size:12.5px">Vergleichen Sie mit Ihren Gruppen und mit dem,
      was Sie darunter geschrieben haben.</div></div>`;
}
/* Zug 2 beginnt: die Etappe neu aufbauen (Tisch, Marke und Auftragssatz
   aendern sich) und die Sicht zeigen. */
function bnZug2Beginnen(){
  const s = bnStand();
  if (!bnSichtBereit().ja) return;
  s.sicht = true; sichern();
  etappe1();
  const si = document.querySelector('.bn-sicht');
  if (si) si.scrollIntoView({block: 'nearest', behavior: 'smooth'});
}
function bnSicht2Zeigen(){
  const s = bnStand();
  if (!bnSicht2Bereit().ja) return;
  s.sicht2 = true; sichern();
  if (window._neuzeichnen) window._neuzeichnen();
  const si = document.querySelector('.bn-sicht');
  if (si) si.scrollIntoView({block: 'nearest', behavior: 'smooth'});
}
function bnSichtKnopf(){
  bnE1Fahne();
  const box = document.querySelector('.bn-sicht');
  if (!box) return;
  const s = bnStand();
  const stufe = !s.sicht ? 0 : s.sicht2 ? 2 : 1;
  if (box.dataset.stufe !== String(stufe)){
    box.dataset.stufe = String(stufe);
    box.innerHTML = (stufe ? bnSichtHtml(stufe) : '')
      + (stufe < 2 ? `<div class="bn-sknopf"><button class="knopf" type="button">${stufe ? bnEsc(BN_Z2.sicht)
        : 'Eine mögliche Sicht'}</button><span class="zart"></span></div>` : '');
    const kn = box.querySelector('.bn-sknopf button');
    if (kn) kn.onclick = stufe ? bnSicht2Zeigen : bnZug2Beginnen;
    if (window._bnOrdnen) window._bnOrdnen();
  }
  const kn = box.querySelector('.bn-sknopf button');
  if (!kn) return;
  const b = stufe ? bnSicht2Bereit() : bnSichtBereit();
  kn.disabled = !b.ja;
  box.querySelector('.bn-sknopf .zart').textContent = b.ja ? ''
    : !b.alle ? (stufe ? 'Erst alle Pflicht-Aufgaben in Gruppen legen und jede Gruppe benennen.'
                       : 'Erst alle Karten in Gruppen legen und jede Gruppe benennen.')
    : 'Erst jede Gruppe benennen.';
}

/* NEU (FASSUNG CHILBI): die Fahne in Etappe 1. Liegen alle Karten in
   benannten Gruppen: «Eine mögliche Sicht →»; ist sie offen: «Weiter zu
   Etappe 2 →». Ohne Uhr - die Schreibfelder sollen nicht ueberholt werden.
   NEU (FASSUNG 4): dazwischen Zug 2 - «Zu den Skript-Aufgaben →» (einmal,
   bis man ihn anklickt), dann «Eine mögliche Sicht →» auf die
   Skript-Aufgaben, dann Etappe 2. */
let _bnZug2Gezeigt = false;
function bnE1Fahne(){
  if (document.body.classList.contains('loesungoffen') || stand.etappe !== 0) return bnFahne(null);
  const s = bnStand(), WG = BN.wegweiser;
  bnE1Satz();
  // NEU (FASSUNG 9): an den Uebergaengen das Fenster «Geschafft»
  const freiDa = () => BN.karten.filter(bnFreiwillig).some(k => { const st = stand.karten[k.id]; return !st || st.ort === 'tisch'; });
  if (s.sicht2) return bnFahne({notiz: BN_W.etappe2Notiz, knopf: BN_W.etappe2, tun: () => { stand.etappe = 1; los(); },
    fenster: WG.etappe2, schluessel: 'e1etappe2', frei: [freiDa() ? () => {
      s.freiOffen = true; sichern();
      if (window._neuzeichnen) window._neuzeichnen();
      const k = document.querySelector('.bn-tfrei');
      if (k) k.scrollIntoView({block: 'start', behavior: 'smooth'});
    } : null]});
  if (s.sicht && bnSicht2Bereit().ja) return bnFahne({notiz: BN_W.sicht2Notiz, knopf: BN_W.sicht2, tun: bnSicht2Zeigen,
    fenster: WG.sicht2, schluessel: 'e1sicht2'});
  if (s.sicht && !_bnZug2Gezeigt) return bnFahne({notiz: BN_W.zug2Notiz, knopf: BN_W.zug2, tun: () => {
    _bnZug2Gezeigt = true; bnFahne(null);
    const k = document.querySelector('.bn-tkopf');
    if (k) k.scrollIntoView({block: 'start', behavior: 'smooth'});
  }});
  if (!s.sicht && bnSichtBereit().ja) return bnFahne({notiz: BN_W.sichtNotiz, knopf: BN_W.sicht, tun: bnZug2Beginnen,
    fenster: WG.sicht, schluessel: 'e1sicht'});
  bnFahne(null);
}
/* NEU (FASSUNG 9): der Satz im Band, was jetzt zu tun ist; bis man zum
   ersten Mal eine Karte zieht, darunter der Hinweis zum Ziehen. */
function bnE1Satz(){
  const s = bnStand();
  const satz = s.sicht2 ? BN_SK.e1jetzt3 : s.sicht ? BN_SK.e1jetzt2 : BN_SK.e1jetzt;
  bnJetztSatz(bnEsc(satz) + (s.gezogen || document.body.classList.contains('loesungoffen') ? ''
    : `<span class="bn-noch" style="display:block;font-size:13.5px;color:var(--bn-ocker-t);margin-top:3px">✋ ${bnEsc(BN_SK.ziehen)}</span>`));
}

/* Setzt die Gruppen UNTEREINANDER, jede ueber die ganze Breite, darin
   die Kaertchen nebeneinander (FASSUNG 7; bis Fassung 6 je eine Zeile),
   darunter je das Schreibfeld, dann den Wink «+ neue Gruppe» und am
   Schluss die Sicht. Gerechnet wird mit der tatsaechlichen Breite des
   Feldes und der tatsaechlichen Hoehe jeder Karte. */
const BN_KLEIN_BREIT = 172, BN_AUF_BREIT = 250, BN_LUECKE = 6;
function bnGruppenSetzen(feld){
  const W = Math.max(feld.clientWidth, 280);
  const x0 = 6, innen = W - x0 - 8;
  const reihe = BN.karten.map(k => k.id);
  let y = 30;
  bnStand().gruppen.forEach((g, i) => {
    const ort = 'g' + i;
    const c = feld.querySelector(`.feld[data-ort="${ort}"]`);
    if (!c) return;
    c.style.left = x0 + 'px'; c.style.top = y + 'px'; c.style.width = innen + 'px';
    const kopf = c.querySelector(':scope > .kopf');
    let h = kopf ? kopf.offsetHeight + 3 : 5;
    const ks = [...c.querySelectorAll(':scope > .k')];
    // GEAENDERT (FASSUNG 7): Die Kaertchen stehen NEBENEINANDER in
    // gleich breiten Spalten und brechen um; ein aufgeklapptes nimmt so
    // viele Spalten, dass die Felder Platz haben (BN_AUF_BREIT).
    const nutz = innen - 10, sp = Math.max(1, Math.floor((nutz + BN_LUECKE) / (BN_KLEIN_BREIT + BN_LUECKE)));
    const kw = Math.floor((nutz - (sp - 1) * BN_LUECKE) / sp);
    const spannAuf = Math.min(sp, Math.ceil((BN_AUF_BREIT + BN_LUECKE) / (kw + BN_LUECKE)));
    let spalte = 0, oben = h, zeileH = 0;
    ks.sort((p, q) => reihe.indexOf(p.dataset.id) - reihe.indexOf(q.dataset.id))
      .forEach(el => {
        el.classList.add('klein'); bnAufSetzen(el);
        const spann = bnAuf[el.dataset.id] ? spannAuf : 1;
        if (spalte && spalte + spann > sp){ oben += zeileH + BN_LUECKE; zeileH = 0; spalte = 0; }
        el.style.height = '';
        el.style.width = (spann * kw + (spann - 1) * BN_LUECKE) + 'px';
        el._x = 5 + spalte * (kw + BN_LUECKE); el._y = oben; el._rot = 0; pos(el);
        zeileH = Math.max(zeileH, el.offsetHeight);
        spalte += spann;
      });
    if (ks.length) h = oben + zeileH + 4;
    h = Math.max(h + 3, ks.length ? 52 : 64);
    c.style.height = h + 'px'; c.dataset.grundhoehe = String(h);
    y += h + 4;
    const w = feld.querySelector(`.bn-weg[data-fach="${ort}"]`);
    w.style.left = x0 + 'px'; w.style.top = y + 'px'; w.style.width = innen + 'px';
    y += w.offsetHeight + 12;
  });
  const neu = feld.querySelector('.feld.bn-neu');
  if (neu){
    neu.style.left = x0 + 'px'; neu.style.top = y + 'px'; neu.style.width = innen + 'px'; neu.style.height = '52px';
    y += 52 + 12;
  }
  const si = feld.querySelector('.bn-sicht');
  si.style.left = x0 + 'px'; si.style.top = y + 'px'; si.style.width = innen + 'px';
  y += si.offsetHeight;
  // NEU (FASSUNG 6): der Kasten «Danach: die Aufgaben aus dem Skript»
  const da = feld.querySelector('.bn-danach');
  if (da){
    y += 10;
    da.style.left = x0 + 'px'; da.style.top = y + 'px'; da.style.width = innen + 'px';
    y += da.offsetHeight;
  }
  // Platz fuer die Fahne unten rechts (Fassung Chilbi)
  y += 16 + (document.getElementById('bnfahne') ? 64 : 0);
  feld.style.minHeight = y + 'px';
}

/* Die Karten auf dem Tisch: in Spalten, immer in derselben Reihenfolge,
   keine liegt auf einer anderen. NEU (FASSUNG 4): In Zug 2 steht oben
   der Kopf (.bn-tkopf), darunter die Pflichtkarten, dann der Knopf zum
   Stapel der freiwilligen (.bn-tfrei) und - aufgeklappt - diese Karten.
   NEU (gemeinsam entschieden, FASSUNG 7, Rike 2026-10-21): Alle Karten
   auf dem Tisch sind gleich gross, auch bei verschieden langem Text. */
/* Die gemeinsame Hoehe: die groesste natuerliche Hoehe ueber ALLE Karten
   des Kapitels (Zug 1, Zug 2 und Stapel) bei dieser Breite - so sind die
   Karten in beiden Zuegen gleich gross, und nichts wird abgeschnitten.
   Karten auf dem Tisch werden direkt gemessen (ihre Hoehe ist vorher
   geloest), die anderen als unsichtbare Kopie in Tischform. Waechst eine
   Karte (weiterer Fall, Hinweis nach «Prüfen»), wachsen alle mit. */
function bnEinheitsHoehe(tisch, breite){
  const alle = window._bnAlle || [];
  const kopien = alle.filter(el => el.parentElement !== tisch).map(el => {
    const c = el.cloneNode(true);
    c.classList.remove('klein', 'auf', 'zieht');
    c.removeAttribute('data-id');
    Object.assign(c.style, {width: breite + 'px', height: '', transform: '', visibility: 'hidden', position: 'absolute',
                            left: '0', top: '0', pointerEvents: 'none'});
    tisch.appendChild(c);
    return c;
  });
  let h = 0;
  alle.forEach(el => { if (el.parentElement === tisch) h = Math.max(h, el.offsetHeight); });
  kopien.forEach(c => { h = Math.max(h, c.offsetHeight); });
  kopien.forEach(c => c.remove());
  return Math.ceil(h);
}
function bnTischSetzen(tisch){
  const els = [...tisch.querySelectorAll(':scope > .k')];
  els.forEach(el => { el.classList.remove('klein', 'auf'); delete bnAuf[el.dataset.id]; el.style.width = ''; el.style.height = ''; });
  const kopf = tisch.querySelector(':scope > .bn-tkopf'), frei = tisch.querySelector(':scope > .bn-tfrei');
  if (!els.length && !kopf && !frei){ tisch.style.minHeight = ''; return; }
  const W = tisch.clientWidth || 300;
  const reihe = BN.karten.map(k => k.id);
  let kw = null, y = 30;
  const leiste = el => { el.style.left = '6px'; el.style.top = y + 'px'; el.style.width = (W - 12) + 'px'; y += el.offsetHeight + 8; };
  // NEU (gemeinsam entschieden, FASSUNG 7): alle Karten gleich gross
  if (els.length){
    if (els[0].offsetWidth > W - 12) els.forEach(el => { el.style.width = (W - 12) + 'px'; });
    const hh = bnEinheitsHoehe(tisch, els[0].offsetWidth);
    els.forEach(el => { el.style.height = hh + 'px'; });
  }
  const legen = liste => {
    if (!liste.length) return;
    if (kw === null){
      kw = liste[0].offsetWidth;
      if (kw > W - 12) kw = W - 12;
    }
    const sp = Math.max(1, Math.floor((W - 8) / (kw + 8)));
    const x0 = Math.max(6, (W - sp * kw - (sp - 1) * 8) / 2);
    const hoehen = new Array(sp).fill(y);
    liste.sort((a, b) => reihe.indexOf(a.dataset.id) - reihe.indexOf(b.dataset.id)).forEach(el => {
      const j = hoehen.indexOf(Math.min(...hoehen));
      el._x = x0 + j * (kw + 8); el._y = hoehen[j]; el._rot = 0; pos(el);
      hoehen[j] += el.offsetHeight + 8;
    });
    y = Math.max(...hoehen);
  };
  if (kopf) leiste(kopf);
  legen(els.filter(el => !bnFreiwillig(BN_KARTE[el.dataset.id])));
  if (frei){ y += 4; leiste(frei); }
  legen(els.filter(el => bnFreiwillig(BN_KARTE[el.dataset.id])));
  tisch.style.minHeight = (y + 12) + 'px';
}

/* ───────── Bedienung wie Kapitel 5/6 (FASSUNG CHILBI, 2026-10-19) ─────────
   thema.md «FASSUNG CHILBI», lokal nachgebaut nach Kapitel 5
   (bedingte_wahrscheinlichkeit/etappen.js: situationKarte, auftragFenster,
   weiterFahne, vorschlagFinden) und Kapitel 6 (zufallsgroessen/etappen.js:
   zgrKarteHtml, zgrAuftragFenster, zgrFahne). Kern, Kapitel 5 und 6
   bleiben unberuehrt.
     Situationskarte   ueber die ganze Breite, Ocker, Bild (Etappe 1 das
                       Einstiegsbild, sonst kap7_<id>.png, wenn vorhanden),
                       Name, Text, Frage, Auftragssatz mit «☰ Auftrag».
                       Einklappbar; klappt nach dem ersten Eintrag von
                       selbst zu, wenn es eng ist (im niedrigen Fenster
                       von Anfang an). Ob zu, merkt nur die Sitzung.
     Auftragsfenster   beim ersten Oeffnen jeder Etappe (stand.bn.auftrag).
     Fahne             unten rechts am Arbeitsort, mit Uhr von selbst
                       weiter; die Uhr stellt nur ein Eintrag, nie das Laden.
   Die graue Auftragszeile traegt nur «Etappe n · Name». */
const BN_SK = BN.skarte, BN_W = BN.weiter;
const bnSkZu = {};
const BN_PLATZ = 600, BN_KNAPP = 300;
function bnKarteHtml(o){
  const zu = bnSkZu[o.id] === true;
  const knopf = `<button type="button" class="bn-auftragknopf" title="Den Auftrag dieser Etappe noch einmal zeigen">${bnEsc(BN.auftrag.knopf)}</button>`;
  return `<div class="bn-skarte${zu ? ' zu' : ''}" id="bnskarte" role="region" aria-label="Situation" data-sk="${o.id}">
    ${o.bild ? `<img class="bn-sbild" src="${bnEsc(o.bild)}" alt="" aria-hidden="true">` : ''}
    <div class="bn-sinhalt">
      <div class="bn-skopf"><span class="bn-stitel">${bnEsc(o.name)}</span><span class="bn-skurz">${bnEsc(o.frage)}</span>
        <span class="bn-snurzu">${knopf}</span>
        <button type="button" class="bn-sklapp" aria-expanded="${!zu}">${zu ? BN_SK.zeigen : BN_SK.einklappen}</button></div>
      <div class="bn-sganz">
        <p class="bn-stext">${bnEsc(o.text)}</p>
        <p class="bn-sfrage">${bnEsc(o.frage)}</p>
        <div class="bn-sauftragz"><p><span class="was">${bnEsc(BN_SK.auftrag)}</span>${bnEsc(o.auftrag || D.etappen[o.nr - 1].auftrag)}</p>${knopf}</div>
      </div>
    </div></div>`;
}
/* Klappe und Automatik; `nachher` ordnet die Flaeche neu (die Hoehe
   der Arbeitsflaeche aendert sich). */
/* NEU (FASSUNG 9, wie Kapitel 8): ein Satz in der Situationskarte, was
   jetzt zu tun ist. Nur mit dem Band oben. */
function bnJetztSatz(text){
  if (D.leiste !== 'oben') return;
  const inhalt = document.querySelector('#bnskarte .bn-sinhalt');
  if (!inhalt) return;
  let p = inhalt.querySelector(':scope > .bn-jetztsatz');
  if (!p){ p = document.createElement('p'); p.className = 'bn-jetztsatz'; inhalt.appendChild(p); }
  if (p.innerHTML !== text) p.innerHTML = text;
}
function bnKarteHaken(nr, nachher){
  const k = document.getElementById('bnskarte');
  if (!k) return;
  // NEU (FASSUNG 9): Im Band ist die Situation immer ganz zu sehen (wie
  // Kapitel 6 und 8); zugeklappt wird das Band selbst. Der lange Text
  // steht hinter ⓘ neben dem Titel, oben bleiben Frage und Satz.
  if (D.leiste === 'oben'){
    k.classList.remove('zu');
    k.querySelectorAll('.bn-auftragknopf').forEach(b => b.onclick = ev => { ev.stopPropagation(); bnAuftragFenster(nr); });
    const t = k.querySelector('.bn-stext'), kopf = k.querySelector('.bn-skopf');
    if (t && kopf && window.leisteInfo){
      const i = document.createElement('span');
      i.textContent = t.textContent;
      kopf.insertBefore(i, kopf.querySelector('.bn-skurz'));
      t.remove();
      leisteInfo(i);
    }
    return;
  }
  const id = k.dataset.sk, kn = k.querySelector('.bn-sklapp');
  k.querySelectorAll('.bn-auftragknopf').forEach(b => b.onclick = ev => { ev.stopPropagation(); bnAuftragFenster(nr); });
  const setzen = zu => {
    bnSkZu[id] = zu;
    k.classList.toggle('zu', zu);
    kn.textContent = zu ? BN_SK.zeigen : BN_SK.einklappen;
    kn.setAttribute('aria-expanded', String(!zu));
    if (nachher) nachher();
  };
  kn.onclick = ev => { ev.stopPropagation(); setzen(!k.classList.contains('zu')); };
  k.querySelector('.bn-skopf').addEventListener('click', ev => {
    if (!k.classList.contains('zu') || ev.target.closest('button')) return;
    setzen(false);
  });
  const eingetragen = () => [...document.querySelectorAll('#buehne input, #buehne textarea')].some(f => !f.disabled
    && f.type !== 'checkbox' && f.type !== 'radio' && f.value.trim() !== '');
  const eng = () => innerHeight - k.getBoundingClientRect().bottom < BN_PLATZ;
  // Erst nach dem Aufbau pruefen - die Felder entstehen danach.
  setTimeout(() => {
    if (!k.isConnected || bnSkZu[id] !== undefined) return;
    if ((eingetragen() && eng()) || innerHeight - k.getBoundingClientRect().bottom < BN_KNAPP) setzen(true);
  }, 0);
  // Der erste Eintrag (change: Feld verlassen oder Enter)
  const b = document.getElementById('buehne');
  if (b._bnSkHaken) b.removeEventListener('change', b._bnSkHaken, true);
  b._bnSkHaken = ev => {
    if (!k.isConnected || bnSkZu[id] !== undefined || !ev.target.matches('input, select, textarea') || !eingetragen()) return;
    if (eng()) setTimeout(() => { if (k.isConnected && bnSkZu[id] === undefined) setzen(true); }, 0);
  };
  b.addEventListener('change', b._bnSkHaken, true);
}
function bnAuftragFenster(nr){
  const alt = document.getElementById('bnfenster');
  if (alt) alt.remove();
  // NEU (FASSUNG 4): In Zug 2 zeigt «☰ Auftrag» die Schritte von Zug 2.
  const zug2 = nr === 1 && !!bnStand().sicht;
  const A = BN.auftrag, F = A.fenster[zug2 ? '1z2' : String(nr)], vorher = document.activeElement;
  const f = document.createElement('div');
  f.className = 'bn-fenster'; f.id = 'bnfenster';
  f.innerHTML = `<div class="kasten" role="dialog" aria-modal="true" aria-labelledby="bnfenstertitel">
    <button type="button" class="zu" aria-label="Schliessen" title="Schliessen">×</button>
    <h2 id="bnfenstertitel">${bnEsc(A.knopf)} · Etappe ${nr}</h2>
    <p class="satz">${bnEsc(zug2 ? BN_Z2.auftrag : D.etappen[nr - 1].auftrag)}</p>
    <ol>${F.schritte.map(s => `<li>${s}</li>`).join('')}</ol>
    ${F.schluss ? `<p class="schluss">${bnEsc(F.schluss)}</p>` : ''}
    <div class="unten"><button type="button" class="knopf los">${bnEsc(A.los)}</button></div></div>`;
  const zu = () => {
    f.remove();
    document.removeEventListener('keydown', taste, true);
    const kn = document.querySelector('.bn-auftragknopf');
    if (vorher && vorher.isConnected && vorher !== document.body) vorher.focus();
    else if (kn) kn.focus();
  };
  const taste = ev => {
    if (!f.isConnected){ document.removeEventListener('keydown', taste, true); return; }
    if (ev.key === 'Escape'){ ev.preventDefault(); ev.stopPropagation(); zu(); }
    else if (ev.key === 'Tab'){
      const kn = [...f.querySelectorAll('button')], i = kn.indexOf(document.activeElement);
      ev.preventDefault();
      kn[(i + (ev.shiftKey ? kn.length - 1 : 1)) % kn.length].focus();
    }
  };
  document.addEventListener('keydown', taste, true);
  f.querySelector('.zu').onclick = zu;
  f.querySelector('.los').onclick = zu;
  f.addEventListener('pointerdown', ev => { if (ev.target === f) zu(); });
  // Im Buehnenbereich: ein Etappenwechsel ersetzt #buehne und nimmt das Fenster mit.
  (document.getElementById('buehne') || document.body).appendChild(f);
  f.querySelector('.los').focus();
}
/* Beim ersten Oeffnen einer Etappe das Fenster. Ein Stand ohne das Feld
   (bis Fassung 3) zeigt jedes Fenster einmal. */
function bnAuftragBeimOeffnen(nr){
  // GEAENDERT (FASSUNG 9, wie Kapitel 6 und 8): Mit dem Band oben oeffnet
  // die Etappe direkt am Tisch; der Auftrag steht hinter «Auftrag».
  if (D.leiste === 'oben') return;
  const s = bnStand();
  if (!s.auftrag || typeof s.auftrag !== 'object') s.auftrag = {};
  if (s.auftrag[nr] || document.body.classList.contains('loesungoffen')) return;
  s.auftrag[nr] = true;
  sichern();
  bnAuftragFenster(nr);
}
function bnMeldung(text, dauer){
  document.querySelectorAll('.bn-meldung').forEach(m => m.remove());
  const zeigen = () => {
    const m = document.createElement('div');
    m.className = 'bn-meldung'; m.setAttribute('role', 'status');
    m.innerHTML = `${bnEsc(text)}<button aria-label="Schliessen" title="Schliessen">×</button>`;
    m.querySelector('button').onclick = () => m.remove();
    document.body.appendChild(m);
    setTimeout(() => m.remove(), dauer || 3500);
  };
  if (document.body) zeigen(); else document.addEventListener('DOMContentLoaded', zeigen);
}
/* Die Fahne unten rechts in der Buehne. o = {notiz, knopf, tun, uhr,
   meldung, wache}; null nimmt sie weg. Dieselbe Fahne wird nicht neu
   gebaut (sonst liefe die Uhr nie ab). */
let _bnUhr = null;
let _bnWegWartet = null;   // FASSUNG 9: Fenster, das auf das Ende des Schreibens wartet
const bnObj = x => !!x && typeof x === 'object' && !Array.isArray(x);
/* NEU (FASSUNG 9, wie zgrFahne in Kapitel 6, Fassung 20): Mit o.fenster
   und o.schluessel geht beim ersten Mal das Fenster «Geschafft» auf.
   Wer gerade schreibt, wird nicht unterbrochen: Das Fenster wartet, bis
   das Schreibfeld verlassen wird, und nur, wenn die Fahne dann noch steht. */
function bnWegweiserMelden(o){
  if (!o || !o.fenster || !o.schluessel || document.body.classList.contains('loesungoffen')) return;
  if (!bnObj(stand.wegweiser)) stand.wegweiser = {};
  if (stand.wegweiser[o.schluessel]) return;
  const schreibt = a => a && (a.tagName === 'TEXTAREA' || (a.tagName === 'INPUT' && a.type !== 'button' && a.type !== 'range'));
  if (schreibt(document.activeElement)){
    _bnWegWartet = o;
    if (!window._bnWegHorcht){
      window._bnWegHorcht = true;
      document.addEventListener('focusout', () => setTimeout(() => {
        const w = _bnWegWartet;
        if (!w || schreibt(document.activeElement)) return;
        _bnWegWartet = null;
        const fa = document.getElementById('bnfahne');
        if (!fa || !fa.isConnected || fa.dataset.sig !== w._sig || stand.wegweiser[w.schluessel]) return;
        stand.wegweiser[w.schluessel] = true; sichern(); bnWegweiser(w);
      }, 200), true);
    }
    return;
  }
  stand.wegweiser[o.schluessel] = true;
  sichern();
  bnWegweiser(o);
}
/* Das Fenster an einem Uebergang. o.fenster = {text, jetzt, frei:[{knopf,
   text}]}; o.knopf/o.tun der Hauptknopf (o.haupt ersetzt ihn), o.frei =
   [tun] die Handlungen der freiwilligen Knoepfe, in derselben Reihenfolge. */
function bnWegweiser(o){
  const alt = document.getElementById('bnwegweiser');
  if (alt) alt.remove();
  const WG = BN.wegweiser, F = o.fenster, haupt = o.haupt || {knopf: o.knopf, tun: o.tun};
  const frei = (F.frei || []).filter((x, i) => o.frei && o.frei[i]);
  const f = document.createElement('div');
  f.className = 'bn-fenster bn-wegweiser'; f.id = 'bnwegweiser';
  f.innerHTML = `<div class="kasten" role="dialog" aria-modal="true" aria-labelledby="bnwegtitel">
    <button type="button" class="zu" aria-label="${bnEsc(WG.bleiben)}" title="${bnEsc(WG.bleiben)}">×</button>
    <h2 id="bnwegtitel">✓ ${bnEsc(WG.titel)}</h2>
    <p class="satz">${bnEsc(F.text)}</p>
    <p class="schluss"><b>${bnEsc(WG.jetzt)}:</b> ${bnEsc(F.jetzt)}</p>
    ${frei.length ? `<div class="bn-wegfrei"><div class="was">${bnEsc(WG.frei)}</div>`
      + frei.map((x, i) => `<div class="zeile"><button type="button" class="knopf leer" data-frei="${i}">${bnEsc(x.knopf)}</button>`
        + `<span>${bnEsc(x.text)}</span></div>`).join('') + '</div>' : ''}
    <div class="unten"><button type="button" class="knopf leer bleiben">${bnEsc(WG.bleiben)}</button>`
    + `<button type="button" class="knopf los">${bnEsc(String(haupt.knopf).replace(/\s*→$/, ''))} →</button></div></div>`;
  const zu = () => { f.remove(); document.removeEventListener('keydown', taste, true); };
  const taste = ev => {
    if (!f.isConnected){ document.removeEventListener('keydown', taste, true); return; }
    if (ev.key === 'Escape'){ ev.preventDefault(); ev.stopPropagation(); zu(); }
    else if (ev.key === 'Tab'){
      const kn = [...f.querySelectorAll('button')], i = kn.indexOf(document.activeElement);
      ev.preventDefault();
      kn[(i + (ev.shiftKey ? kn.length - 1 : 1)) % kn.length].focus();
    }
  };
  document.addEventListener('keydown', taste, true);
  f.querySelector('.zu').onclick = zu;
  f.querySelector('.bleiben').onclick = zu;
  f.querySelector('.los').onclick = () => { zu(); haupt.tun(); };
  f.querySelectorAll('[data-frei]').forEach(b => b.onclick = () => {
    zu(); const i = (F.frei || []).indexOf(frei[+b.dataset.frei]); o.frei[i]();
  });
  f.addEventListener('click', ev => { if (ev.target === f) zu(); });
  document.body.appendChild(f);
  f.querySelector('.los').focus();
}
function bnFahne(o){
  const alt = document.getElementById('bnfahne');
  const sig = o ? o.notiz + '|' + o.knopf + '|' + !!o.uhr : '';
  if (o) o._sig = sig;
  if (alt && alt.dataset.sig === sig && alt.isConnected){ if (o){ alt._tun = o.tun; bnWegweiserMelden(o); } return; }
  clearTimeout(_bnUhr); _bnUhr = null;
  if (alt) alt.remove();
  if (!o) return;
  const ziel = document.querySelector('#buehne .buehne');
  if (!ziel) return;
  const f = document.createElement('div');
  f.id = 'bnfahne'; f.className = 'bn-fahne'; f.setAttribute('role', 'status'); f.dataset.sig = sig;
  f.innerHTML = (o.notiz ? `<span class="notiz">${bnEsc(o.notiz)}</span>` : '')
    + `<button type="button" class="knopf">${bnEsc(o.knopf)}</button>` + (o.uhr ? '<span class="uhr"><i></i></span>' : '');
  f._tun = o.tun;
  ziel.appendChild(f);
  f.querySelector('button').onclick = ev => { ev.stopPropagation(); clearTimeout(_bnUhr); f._tun(); };
  bnWegweiserMelden(o);
  if (o.uhr) _bnUhr = setTimeout(() => {
    if (!f.isConnected || (o.wache && !o.wache())) return;
    if (o.meldung) bnMeldung(o.meldung);
    f._tun();
  }, 1500);
}

/* ───────── Etappe 1 ───────── */
function bnLoesungE1(){
  // Die fuenf Gruppen von «Eine mögliche Sicht» als Beispiel einer
  // Gruppierung, je mit dem Text der Sicht als Antwort.
  const faecher = BN_ALLE_FAECHER(), karten = {}, f = {};
  const gruppen = faecher.map(fa => ({name: fa.name, weg: BN.sicht.faecher[fa.ort]}));
  BN.karten.forEach(k => {
    karten[k.id] = {ort: 'g' + faecher.findIndex(fa => fa.ort === k.ort), x: 0, y: 0, rot: 0};
    const so = k.soll, E = so.ketten;
    // Keine Binomialaufgabe: die Felder bleiben leer (Nachtrag 2026-10-16).
    if (k.ort === BN.ablage.ort){
      f[k.id] = {frage: null, n: E.map(() => ''), p: E.map(() => ''), P: '',
                 k: E.map(() => ({form: '', a: '', b: ''}))};
      return;
    }
    f[k.id] = {
      frage: k.gesucht,
      n: E.map(c => (c.n === '?' || so.frei) ? '' : String(c.n)),
      p: E.map(c => c.p === '?' ? '' : c.p ? c.p.t : '–'),
      P: so.P === '?' ? '' : so.P.t,
      // die Form, die bnKText fuer den Sollbereich schreibt
      k: E.map(c => {
        const [a, b] = c.iv, offen = b === c.n || b === 'n';
        const t = v => typeof v === 'string' ? '' : String(v);
        if (a === b) return {form: 'eq', a: t(a), b: ''};
        if (a === 0 && !offen) return {form: 'le', a: '', b: t(b)};
        if (offen) return {form: 'ge', a: t(a), b: ''};
        return {form: 'bereich', a: t(a), b: t(b)};
      }),
    };
  });
  return {karten, bn: Object.assign({}, bnStand(), {f, gruppen, sicht: true, sicht2: true})};
}

function etappe1(){
  loesungAnwenden(bnLoesungE1);
  const s = bnStand();
  const a = D.etappen[0];
  const stifte = `<div class="bn-stifte" id="bnstifte" role="toolbar" aria-label="Textmarker"
    title="Erst den Stift wählen, dann über den Text streichen oder Wörter anklicken.">
    <span class="was">Textmarker</span>
    ${BN.marken.map(m => `<button type="button" class="m-${m.art}" data-stift="${m.art}" aria-pressed="${s.stift === m.art}"
       title="Stift ${bnEsc(m.name)}">${bnEsc(m.name)}</button>`).join('')}
    <button type="button" class="weg" data-stift="weg" aria-pressed="${s.stift === 'weg'}" title="Radierer">Radierer</button>
    <span class="zart">Erst den Stift wählen, dann über den Text streichen oder Wörter anklicken.</span></div>`;
  // GEAENDERT (FASSUNG CHILBI): Die graue Auftragszeile traegt nur
  // «Etappe 1 · Name»; Situation und Auftrag stehen in der
  // Situationskarte, die Schritte im Auftragsfenster.
  // NEU (FASSUNG 4): In Zug 2 heissen Tisch und Auftragssatz anders.
  const zug2 = !!s.sicht;
  const karte = bnKarteHtml({id: 'e1', nr: 1, name: BN_SK.e1name, text: BN_SK.e1text,
    frage: BN_SK.e1frage, bild: 'erkundung.png', auftrag: zug2 ? BN_Z2.auftrag : ''});
  buehne({rolle: a.rolle, rang: a.rang, titel: 'Etappe 1 · ' + a.name, text: ''},
    zug2 ? BN_Z2.marke : 'Die Aufgaben', 'Ihre Gruppen',
    `<button class="knopf leer" id="zurueck" title="Alle Karten zurück auf den Tisch">↺</button>
     <button class="knopf" id="pruefen">Prüfen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Etappe 2 →</button>`,
    karte + stifte, null, [1.05, 1.3]);
  window._zustaendig = id => !!BN_KARTE[id];
  const stiftSetzen = () => {
    document.body.classList.toggle('bn-stift-an', !!s.stift);
    document.querySelectorAll('#bnstifte button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.stift === s.stift)));
  };
  document.querySelectorAll('#bnstifte button').forEach(b => b.onclick = () => {
    s.stift = s.stift === b.dataset.stift ? null : b.dataset.stift;
    stiftSetzen(); sichern();
  });
  stiftSetzen();
  const tisch = document.getElementById('tisch'), feld = document.getElementById('feld');
  const els = {};
  BN.karten.forEach(k => { els[k.id] = bnKarte(k); });
  // NEU (FASSUNG 7): fuer die gemeinsame Hoehe auf dem Tisch
  window._bnAlle = Object.values(els);

  window._e1ablage = bnNeueGruppe;

  /* NEU (FASSUNG 4): Kopf von Zug 2 und der Stapel der freiwilligen
     Skriptkarten auf dem Tisch (gesetzt in bnTischSetzen). */
  function tischKopf(){
    tisch.querySelectorAll(':scope > .bn-tkopf, :scope > .bn-tfrei').forEach(x => x.remove());
    if (!s.sicht || document.body.classList.contains('loesungoffen')) return;
    const kopf = document.createElement('div');
    kopf.className = 'bn-tkopf';
    kopf.innerHTML = `<b>${bnEsc(BN_Z2.kopf)}</b><br>${bnEsc(BN_Z2.text)}`;
    tisch.appendChild(kopf);
    const n = BN.karten.filter(bnFreiwillig).filter(k => { const st = stand.karten[k.id]; return !st || st.ort === 'tisch'; }).length;
    const frei = document.createElement('button');
    frei.type = 'button'; frei.className = 'bn-tfrei';
    frei.setAttribute('aria-expanded', String(!!s.freiOffen));
    frei.innerHTML = `${s.freiOffen ? '▾' : '▸'} ${bnEsc(BN_Z2.frei)} <span class="zart">(${n})</span>`;
    frei.addEventListener('pointerdown', e => e.stopPropagation());
    frei.onclick = () => { s.freiOffen = !s.freiOffen; sichern(); zeichnen(); };
    tisch.appendChild(frei);
  }
  function zeichnen(){
    bnGruppenBauen(feld);
    tischKopf();
    BN.karten.forEach(k => {
      if (!bnSichtbar(k)){ els[k.id].remove(); return; }
      const st = stand.karten[k.id];
      const ziel = st && st.ort !== 'tisch' ? feld.querySelector(`.feld[data-ort="${CSS.escape(st.ort)}"]`) : null;
      (ziel || tisch).appendChild(els[k.id]);
      if (stand.loesungOffen) bnLoesungZeigen(els[k.id]);
    });
    ordnen();
  }
  function ordnen(){ bnTischSetzen(tisch); bnGruppenSetzen(feld); }
  window._bnOrdnen = ordnen;
  window._neuzeichnen = zeichnen;
  // Neu zeichnen, nicht nur ordnen: «Karten hierher ziehen» und das «×»
  // haengen daran, ob eine Gruppe Karten traegt.
  window._nachAblegen = () => {
    // NEU (FASSUNG 9): Der Hinweis zum Ziehen verschwindet nach dem ersten Mal.
    if (!s.gezogen){ s.gezogen = true; sichern(); }
    Object.values(els).forEach(bnUrteilWeg);
    zeichnen();
  };
  zeichnen();
  merken();
  bnKarteHaken(1, ordnen);
  bnE1Satz();
  bnAuftragBeimOeffnen(1);

  document.getElementById('zurueck').onclick = () => {
    // NEU (FASSUNG 4): In Zug 2 gehen nur die Skriptkarten zurueck; die
    // Gruppen aus Zug 1 bleiben, wie sie sind.
    if (!confirm(zug2 ? 'Alle Aufgaben aus dem Skript zurück auf den Tisch? Einträge und Gruppen bleiben.'
      : 'Alle Karten zurück auf den Tisch? Markierungen, Einträge und Gruppen bleiben.')) return;
    BN.karten.forEach(k => { if (!zug2 || k.zug === 2) delete stand.karten[k.id]; });
    etappe1();
  };
  document.getElementById('weiter').onclick = () => { stand.etappe = 1; los(); };
  document.getElementById('pruefen').onclick = () => bnPruefenE1(els);
  loesungsKnopf(() => etappe1());
}

/* Geprueft werden nur die Felder auf den Karten. Die Gruppierung wird
   nicht geprueft (Nachtrag 2026-10-16, Rike «ja»). */
function bnPruefenE1(els){
  markenLoeschen();
  let fOk = 0, fDa = 0, fHalb = 0, mehr = 0, offen = 0;
  BN.karten.forEach(k => {
    const el = els[k.id];
    // NEU (FASSUNG 4): nur die Karten, die gerade liegen (Zug 1 / Zug 2)
    if (!el.isConnected) return;
    bnUrteilWeg(el);
    const u = bnUrteil(k, bnFelder(k.id));
    if (!u) return;
    const art = u.art === 'offen' ? 'halb' : u.art;
    Object.entries(u.felder).forEach(([g, fa]) => {
      // GEAENDERT (FASSUNG 7): auch der Chip auf dem eingeordneten Kaertchen
      el.querySelectorAll(`.bn-felder input[data-g="${g}"],.bn-frage[data-g="${g}"],.bn-chip[data-g="${g}"]`).forEach(x => x.classList.add(fa));
      if (g === 'k') el.querySelectorAll('.bn-krow select,.bn-krow input').forEach(x => x.classList.add(fa));
    });
    if (u.zuviel) el.querySelectorAll('.bn-kette:not([data-i="0"])').forEach(x => x.classList.add('zuviel'));
    const h = el.querySelector('.bn-hinweis');
    h.textContent = u.text; h.className = 'bn-hinweis ' + art;
    if (u.art === 'offen'){ if (u.mehr) mehr++; else offen++; }
    else { fDa++; if (u.art === 'ok') fOk++; if (u.art === 'halb') fHalb++; }
    // NEU (Fassung 10): richtig ausgefuellt - die Formel erscheint und bleibt
    if (u.art === 'ok' && k.formel){ bnStand().formel[k.id] = true; bnFormelSetzen(el); }
  });
  bnNachFeldern();
  stand.geprueft = true;
  const b = document.getElementById('befund');
  if (!fDa && !mehr && !offen){ b.textContent = 'Noch nichts eingetragen.'; return; }
  b.innerHTML = `Einträge: ${fOk} von ${fDa} Karten richtig`
    + (fHalb ? ` (${fHalb} gestrichelt: fast, siehe Karte)` : '') + '.'
    + (mehr ? ` ${mehr} ${mehr > 1 ? 'Karten haben' : 'Karte hat'} mehrere Fälle: vergleichen Sie mit der Lösung.` : '')
    + (offen ? ` ${offen} ${offen > 1 ? 'Karten werden' : 'Karte wird'} nicht gewertet (gestrichelt).` : '')
    + ` <span class="zart">${bnStand().sicht ? 'Ihre Zuordnung wird' : 'Ihre Gruppen werden'} nicht geprüft.</span>`;
}

/* ───────── Etappe 2: Gibt es eine Abkuerzung fuers Austesten? ─────────
   NEU (gemeinsam entschieden, FASSUNG 7, thema.md «FASSUNG 7, Etappe 2»,
   2026-10-21, Rike: «Ja, bau Etappe 2 so»). Ein entdeckender Zugang:
   zuerst eine Frage, auf die σ die Antwort ist, dann «wie viel liegt im
   σ-Band», erst am Schluss umgekehrt. Ersetzt die Zuege von FASSUNG 6
   (Griffe an drei Buden, Messen mit dem σ-Stab je Bude).
     rechts  EIN Werkzeug fuer alle Zuege (bnBandBild): Histogramm von
             B(n; p), μ-Linie, schraffiertes Band, Balken im Band
             eingefaerbt, P(a ≤ X ≤ b). Regler n (10 bis 6000, Stellungen
             aus inhalte.n_werte(), daneben ein Zahlenfeld) und p (0.01 bis
             0.99, im Feld auch 1/6). Der σ-Stab liegt unter dem
             Histogramm, sobald σ im Spiel ist (Zug 2 und 3).
             Zug 1  Bens Band μ ± 10, p = 1/6 fest, nur n; «Notieren».
             Zug 2  Band μ ± c·σ, Schalter c = 1 · 2 · 3. P erscheint erst,
                    wenn die Schaetzung zu diesem c festgehalten ist;
                    «Notieren» schreibt (n, p, σ, P) in die Tabelle von c.
             Zug 3  Regler c (0.5 bis 3.5, Schritt 0.01), n und p frei.
                    «c = etwa ___» je Sicherheit 95 / 90 / 99 %, weich
                    geprueft gegen das c, ab dem P die Sicherheit bei den
                    eingestellten n und p erreicht (bnCAb, ±0.3). Bei der
                    Abkuerzung die Wuerfelbude mit μ ± 2σ.
     links   der Zug: Text, Tabellen, Schaetzungen, Schreibfelder; in Zug 3
             die Rechnung μ, σ, μ − 2σ, μ + 2σ, a, b (aus FASSUNG 6) und
             «Eine mögliche Sicht».
   DIE REGEL fuer jedes Band: Es zaehlen die ganzen Trefferzahlen im Band,
   a = ⌈links⌉, b = ⌊rechts⌋ (1e-9 Spielraum wie BINOM.sigmaGrenzen). P
   ueber Logarithmen, nur ueber das Band summiert - schnell genug fuer
   n = 6000. Dieselbe Rechnung baut inhalte.py nach (_js_fest, _js_band,
   _js_P, c_ab) und prueft sie mit asserts gegen die exakte. */
/* Ein Rechenausdruck: Zahlen, + − · × * / : ( ) ^ und √ bzw. sqrt.
   Kein eval - ein kleiner Zerleger. Liefert eine Zahl oder NaN. */
function bnRechne(txt){
  const t = String(txt || '').trim().replace(/,/g, '.').replace(/[·×]/g, '*').replace(/:/g, '/')
    .replace(/[−–]/g, '-').replace(/sqrt|wurzel/gi, '√').replace(/\s+/g, '');
  if (!t) return NaN;
  let i = 0;
  const sieh = () => t[i];
  function zahl(){
    const m = t.slice(i).match(/^\d*\.?\d+/);
    if (!m) throw 0;
    i += m[0].length; return parseFloat(m[0]);
  }
  function grund(){
    if (sieh() === '(') { i++; const v = summe(); if (sieh() !== ')') throw 0; i++; return v; }
    if (sieh() === '√') { i++; return Math.sqrt(potenz()); }
    if (sieh() === '-') { i++; return -potenz(); }
    return zahl();
  }
  function potenz(){
    const b = grund();
    if (sieh() === '^') { i++; return Math.pow(b, potenz()); }
    return b;
  }
  function produkt(){
    let v = potenz();
    while (sieh() === '*' || sieh() === '/') { const o = t[i++]; const w = potenz(); v = o === '*' ? v * w : v / w; }
    return v;
  }
  function summe(){
    let v = produkt();
    while (sieh() === '+' || sieh() === '-') { const o = t[i++]; const w = produkt(); v = o === '+' ? v + w : v - w; }
    return v;
  }
  try { const v = summe(); return i === t.length && isFinite(v) ? v : NaN; } catch (e) { return NaN; }
}
const bnIstAusdruck = t => /[+\-*/:·×√()^]|sqrt/i.test(String(t || '').trim().replace(/^-/, ''));
const bnZ2 = x => BINOM.zahl(x, 2);

/* Die Sollwerte von Etappe 2 (inhalte.abkuerzung(), FASSUNG 7) */
const BN_NW = BN_S.n_werte;
const BN_Z1S = BN_S.zug1, BN_Z2S = BN_S.zug2, BN_Z3S = BN_S.zug3;
const BN_CS = [1, 2, 3];
const BN_ZIEL = s => ({op: '>=', wert: s});
const bnFuell = (t, o) => String(t).replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m));
const bnP1 = P => BINOM.prozent(P);
const bnC = c => c.toFixed(2);
/* «μ − 10 = 15» oder «μ − 2σ ≈ 81.74» */
const bnGl = v => Math.abs(v - Math.round(v)) < 1e-9 ? '= ' + Math.round(v) : '≈ ' + bnZ2(v);

/* P(a <= X <= b) ueber Logarithmen, nur ueber das Band - dieselbe Summe
   wie inhalte._js_P. Mit Speicher: Beim Ziehen am Regler kommt dasselbe
   Band oft mehrmals. */
const _bnPSp = new Map();
function bnPBereich(n, pw, a, b){
  a = Math.max(0, a); b = Math.min(n, b);
  if (a > b) return 0;
  const key = n + '|' + pw + '|' + a + '|' + b;
  let P = _bnPSp.get(key);
  if (P === undefined){
    P = 0;
    for (let k = a; k <= b; k++) P += Math.exp(BINOM.logPmf(n, pw, k));
    P = Math.min(1, P);
    if (_bnPSp.size > 4000) _bnPSp.clear();
    _bnPSp.set(key, P);
  }
  return P;
}
/* Bens festes Band μ ± h (Zug 1) und das Band μ ± c·σ (Zug 2, 3) */
function bnFestBand(n, pw, h){
  const mu = n * pw, s = Math.sqrt(n * pw * (1 - pw));
  const a = Math.max(0, Math.ceil(mu - h - 1e-9)), b = Math.min(n, Math.floor(mu + h + 1e-9));
  return {mu, s, l: mu - h, r: mu + h, a, b, P: bnPBereich(n, pw, a, b)};
}
function bnSigBand(n, pw, c){
  const g = BINOM.sigmaGrenzen(n, pw, c);
  return {mu: g.mu, s: g.s, l: g.mu - c * g.s, r: g.mu + c * g.s, a: g.a, b: g.b, P: bnPBereich(n, pw, g.a, g.b)};
}
/* Zug 3: das kleinste c auf dem Regler (Hundertstel), ab dem P die
   Sicherheit erreicht - wie inhalte.c_ab. null, wenn es bis 3.5 nicht
   reicht. */
function bnCAb(n, pw, S){
  let vor = '';
  for (let j = Math.round(BN_Z3S.c_min * 100); j <= Math.round(BN_Z3S.c_max * 100); j++){
    const g = BINOM.sigmaGrenzen(n, pw, j / 100), key = g.a + '|' + g.b;
    if (key === vor) continue;
    vor = key;
    if (g.a <= g.b && bnPBereich(n, pw, g.a, g.b) >= S / 100) return {c: j / 100, a: g.a, b: g.b};
  }
  return null;
}

/* Regler n: Stellung zum n, n gueltig? p lesen (0.01 bis 0.99, auch 1/6) */
const bnNGut = n => Number.isInteger(n) && n >= 10 && n <= 6000;
function bnNStelle(n){
  let best = 0;
  BN_NW.forEach((v, i) => { if (Math.abs(v - n) < Math.abs(BN_NW[best] - n)) best = i; });
  return best;
}
const bnPGut = w => typeof w === 'number' && w >= 0.01 - 1e-12 && w <= 0.99 + 1e-12;
function bnPLesen(t){
  const w = BINOM.leseP(t);
  return bnPGut(w) ? {t: String(t).trim().replace(/\s+/g, '').replace(',', '.'), w} : null;
}
const bnSigma = (n, pw) => Math.sqrt(n * pw * (1 - pw));
const bnGleichesP = (a, b) => Math.abs(a - b) < 1e-9;

/* ── NEU (FASSUNG 8): Zug 1 «Austesten», der Rechner B(n; p) ──
   Sollwerte aus inhalte.austesten(), Texte aus thema.SIG["zt"]. Je Aufgabe
   ein eigener Rechner-Zustand (beginnt beim Startwert des Generators, nie
   bei der Loesung), eigene Versuche und eine Antwort. */
const BN_ZTS = BN.austesten, BN_ZT = BN_S.zt;
const BN_ZTA = {};
BN_ZTS.aufgaben.forEach(a => { BN_ZTA[a.id] = a; });
const BN_ZT_WB = BN_ZTS.aufgaben.find(a => a.art === 'bereich').id;   // die Wuerfelbude
const BN_ZT_FORMEN = ['eq', 'le', 'ge', 'bereich'];
const bnRnGut = n => Number.isInteger(n) && n >= 1 && n <= BN_ZTS.n_max;
const bnGanzOk = x => Number.isInteger(x) && x >= 0 && x <= BN_ZTS.n_max;
/* [a; b] zur Form - wie inhalte._zt_iv */
const bnZtIv = r => r.form === 'eq' ? [r.k, r.k] : r.form === 'le' ? [0, r.k] : r.form === 'ge' ? [r.k, r.n] : [r.a, r.b];
/* «X ≤ 14», «82 ≤ X ≤ 118» */
const bnZtForm = r => r.form === 'eq' ? `X = ${r.k}` : r.form === 'le' ? `X ≤ ${r.k}` : r.form === 'ge' ? `X ≥ ${r.k}` : `${r.a} ≤ X ≤ ${r.b}`;
function bnZtP(r){
  const [a, b] = bnZtIv(r);
  return bnPBereich(r.n, r.p.w, a, b);
}
const bnZtZiel = A => BN_ZIEL(A.ziel);
function bnZtRStand(r, st){
  if (!r || typeof r !== 'object') r = {};
  if (!bnRnGut(r.n)) r.n = st.n;
  if (!r.p || !bnPGut(r.p.w) || typeof r.p.t !== 'string') r.p = {t: st.p.t, w: st.p.w};
  if (!BN_ZT_FORMEN.includes(r.form)) r.form = st.form;
  ['k', 'a', 'b'].forEach(w => { if (!bnGanzOk(r[w])) r[w] = st[w]; });
  return r;
}
function bnZtStand(z){
  const t = z.zt = (z.zt && typeof z.zt === 'object') ? z.zt : {};
  if (![0, 1, 2, 3].includes(t.auf)) t.auf = 0;
  t.r = t.r || {}; t.v = t.v || {}; t.antw = t.antw || {};
  BN_ZTS.aufgaben.forEach(A => {
    t.r[A.id] = bnZtRStand(t.r[A.id], A.start);
    t.v[A.id] = (Array.isArray(t.v[A.id]) ? t.v[A.id] : []).filter(x => x && bnRnGut(x.n) && bnPGut(x.pw)
      && typeof x.pt === 'string' && BN_ZT_FORMEN.includes(x.form));
    const x = t.antw[A.id] = t.antw[A.id] || {};
    ['t', 'a', 'b'].forEach(w => { if (typeof x[w] !== 'string') x[w] = ''; });
    x.g = !!x.g;
  });
  if (typeof t.text !== 'string') t.text = '';
}
/* Was die Seite zu einer Antwort sagt: {leer} oder {ok, text}. Die
   Hinweise «einen Schritt daneben» rechnet der Generator. */
function bnZtUrteil(A, x){
  const T = BN_ZT, kl = T.kleinst[A.art];
  let gleich, w = null;
  if (A.art === 'bereich'){
    if (!x.a.trim() && !x.b.trim()) return {leer: true};
    const a = BINOM.leseGanz(x.a), b = BINOM.leseGanz(x.b);
    if (!isNaN(a) && !isNaN(b)) w = [a, b];
    gleich = e => w && Array.isArray(e) && e[0] === w[0] && e[1] === w[1];
  } else {
    if (!x.t.trim()) return {leer: true};
    const v = A.art === 'p' ? BINOM.leseP(x.t) : BINOM.leseGanz(x.t);
    if (!isNaN(v)) w = v;
    gleich = e => w !== null && (A.art === 'p' ? Math.abs(Number(e) - w) < 1e-9 : e === w);
  }
  if (gleich(A.loesung)){
    const v = A.nachbarn[0];
    return {ok: true, text: bnFuell(T.richtig, {ereignis: A.ereignis, P: A.Pt, vor: v.wt, vP: v.Pt})};
  }
  const nb = A.nachbarn.find(e => gleich(e.w));
  if (nb) return {ok: false, text: bnFuell(nb.reicht ? T.mehr : T.nicht, {wert: nb.wt, ereignis: nb.ereignis, P: nb.Pt, kleinst: kl})};
  if (A.art === 'bereich' && w && w[0] + w[1] !== A.loesung[0] + A.loesung[1]) return {ok: false, text: T.schief};
  return {ok: false, text: bnFuell(T.sonst, {kleinst: kl, S: A.ziel})};
}
const bnZtOk = (z, id) => z.zt.antw[id].g && !!bnZtUrteil(BN_ZTA[id], z.zt.antw[id]).ok;
const bnZtAlle = z => BN_ZTS.reihe.every(id => bnZtOk(z, id));
const bnZtFertig = z => bnZtAlle(z) && bnVoll(z.zt.text);
/* Der eigene Befund der Wuerfelbude aus Zug 1 (fuer den Vergleich in Zug
   4): die gepruefte Antwort, sonst null. */
function bnZtWuerfel(z){
  const x = z.zt.antw[BN_ZT_WB], a = BINOM.leseGanz(x.a), b = BINOM.leseGanz(x.b);
  return x.g && !isNaN(a) && !isNaN(b) ? {a, b} : null;
}

/* Der Stand von Etappe 2 (stand.bn.sig, FASSUNG 8, Kennung v: 8; die
   Zuege 1-3 wie in FASSUNG 7, Kennung v: 7). */
function bnWStand(x, start){
  if (!bnNGut(x.n)) x.n = start.n;
  if (!x.p || !bnPGut(x.p.w) || typeof x.p.t !== 'string') x.p = {t: start.p, w: start.pw};
}
function bnSigStand(s){
  if (!s.sig || s.sig.v !== BN_SV) s.sig = {v: BN_SV};
  const z = s.sig;
  if (![0, 1, 2, 3].includes(z.zug)) z.zug = 0;
  z.ohneZt = !!z.ohneZt;
  bnZtStand(z);
  z.z1 = z.z1 || {}; z.z2 = z.z2 || {}; z.z3 = z.z3 || {};
  const a = z.z1, b = z.z2, c = z.z3;
  if (!bnNGut(a.n)) a.n = BN_Z1S.start;
  a.rows = (Array.isArray(a.rows) ? a.rows : []).filter(r => r && bnNGut(r.n));
  if (typeof a.text !== 'string') a.text = '';
  bnWStand(b, BN_Z2S.start);
  if (!BN_CS.includes(b.c)) b.c = 1;
  b.est = b.est || {}; b.rows = b.rows || {};
  BN_CS.forEach(k => {
    const e = b.est[k] = b.est[k] || {};
    if (typeof e.t !== 'string') e.t = '';
    e.auf = !!e.auf && e.t.trim() !== '';
    b.rows[k] = (Array.isArray(b.rows[k]) ? b.rows[k] : [])
      .filter(r => r && bnNGut(r.n) && bnPGut(r.pw) && typeof r.pt === 'string');
  });
  if (typeof b.text !== 'string') b.text = '';
  bnWStand(c, BN_Z3S.start);
  if (!(typeof c.c === 'number' && c.c >= BN_Z3S.c_min && c.c <= BN_Z3S.c_max)) c.c = BN_Z3S.start.c;
  if (!['95', '90', '99', 'abk'].includes(c.ansicht)) c.ansicht = '95';
  c.m = c.m || {};
  BN_Z3S.sicherheiten.forEach(S => {
    const x = c.m[S] = c.m[S] || {};
    if (typeof x.etwa !== 'string') x.etwa = '';
    x.auf = !!x.auf && bnNGut(x.n) && bnPGut(x.pw) && typeof x.pt === 'string';
  });
  BN_S.z3.felder.forEach(f => { if (typeof c[f.w] !== 'string') c[f.w] = ''; });
  if (typeof c.text !== 'string') c.text = '';
  c.geprueft = !!c.geprueft;
  z.sicht = !!z.sicht;
  return z;
}
const bnEtwa = t => bnRechne(String(t || '').replace(/σ/g, ''));
const bnVoll = t => String(t || '').trim().length >= 3;
const bnZ1Fertig = z => z.z1.rows.length >= BN_S.z1.mind && bnVoll(z.z1.text);
const bnZ2CFertig = (z, c) => z.z2.est[c].auf && z.z2.rows[c].length >= BN_Z2S.mind[c];
const bnZ2Zeilen = z => BN_CS.every(c => bnZ2CFertig(z, c));
const bnZ2Fertig = z => bnZ2Zeilen(z) && bnVoll(z.z2.text);
const bnZ3Gefunden = z => BN_Z3S.sicherheiten.every(S => z.z3.m[S].auf);
/* Zug 3: die sechs Felder der Abkuerzung (aus FASSUNG 6) */
const BN_Z3 = BN_Z3S.abk;
const BN_Z3_OK = {
  mu: t => Math.abs(bnRechne(t) - BN_Z3.mu) < 0.005,
  s: t => Math.abs(bnRechne(t) - BN_Z3.s) <= Math.max(0.01, 0.003 * BN_Z3.s),
  unten: t => Math.abs(bnRechne(t) - BN_Z3.unten) <= BN_S.z3.toleranz,
  oben: t => Math.abs(bnRechne(t) - BN_Z3.oben) <= BN_S.z3.toleranz,
  a: t => BINOM.leseGanz(t) === BN_Z3.a,
  b: t => BINOM.leseGanz(t) === BN_Z3.b,
};
const bnZ3Rechnet = z => ['mu', 's', 'unten', 'oben', 'a', 'b'].every(w => BN_Z3_OK[w](z.z3[w]));
const bnZ3Fertig = z => bnZ3Gefunden(z) && bnZ3Rechnet(z) && bnVoll(z.z3.text);
const bnZugFertig = (z, nr) => nr === 0 ? bnZtFertig(z) : nr === 1 ? bnZ1Fertig(z) : nr === 2 ? bnZ2Fertig(z) : bnZ3Fertig(z);
/* NEU (FASSUNG 8): Ein Zug geht auf, wenn die Zuege davor fertig sind. Ein
   Stand aus FASSUNG 7 mit Eintraegen (ohneZt) braucht Zug 1 dafuer nicht. */
function bnZugFrei(z, nr, offen){
  if (offen || nr === 0) return true;
  for (let k = z.ohneZt ? 1 : 0; k < nr; k++) if (!bnZugFertig(z, k)) return false;
  return true;
}
/* Die Rechnung unter einem direkt eingetragenen richtigen Wert («z. B. …») */
function bnZ3Rechnung(w){
  const x = BN_Z3;
  if (w === 'mu') return `${x.n} · ${x.p}`;
  if (w === 's') return `√(${x.n} · ${x.p} · ${x.q})`;
  if (w === 'unten') return `${x.mu} − 2 · ${bnZ2(x.s)}`;
  if (w === 'oben') return `${x.mu} + 2 · ${bnZ2(x.s)}`;
  return '';
}
/* Zug 3: Was die Seite zu einem eingetragenen c sagt */
function bnCUrteil(x, S){
  const ab = bnCAb(x.n, x.pw, S), Z3 = BN_S.z3, o = {n: x.n, p: x.pt, S};
  if (!ab) return {ab, passt: false, text: bnFuell(Z3.nie, o)};
  const passt = Math.abs(bnEtwa(x.etwa) - ab.c) <= BN_S.toleranz_c + 1e-9;
  return {ab, passt, text: bnFuell(Z3.genau, Object.assign(o, {c: bnC(ab.c)})) + ' '
    + (passt ? Z3.passt : bnFuell(Z3.daneben, o))};
}

/* ── Das Werkzeug: Histogramm, Band, σ-Stab ──
   Farben wie bisher (Bildstil Kapitel 8): Balken #e7dece, im Band lila
   #d9c6df mit Rand #9867A5, Tinte #2d2924. Der σ-Stab blau wie die
   σ-Strecke in Kapitel 6. Alle Angaben als Attribute, damit das Bild auch
   losgeloest (Mitnehmen) richtig aussieht.
   o = {n, pw, band (bnFestBand/bnSigBand), lt, rt (Namen der Grenzen,
   «μ − 10»), zeigeP (sonst «?»), ziel (fuer die Rundung von P), stab (c:
   Laenge in σ, sonst kein Stab), legende, bereich}.
   NEU (FASSUNG 8): bereich = true fuer den Rechner in Zug 1 - das Bild
   bleibt bei μ ± 4σ (ein Bereich bis n zeichnet sonst tausende Balken),
   Grenzen ausserhalb des Bildes bekommen keine Linie. */
const BN_GB = {W: 600, H: 262, X0: 22, Y0: 168, HOCH: 132,
               tinte: '#2d2924', matt: '#6c6357', flaeche: '#d9c6df', rand: '#9867A5',
               balken: '#e7dece', papier: '#fffefb', stab: '#0065A9', stab2: '#5b9bd0',
               schrift: "'Fira Sans', 'Segoe UI', Helvetica, Arial, sans-serif"};
let _bnMuster = 0;
function bnBandBild(svg, o){
  const G = BN_GB, n = o.n, pw = o.pw, band = o.band;
  const mitStab = typeof o.stab === 'number';
  const W = G.W, H = mitStab ? G.H : G.H - 30, X0 = G.X0, X1 = W - G.X0, Y0 = G.Y0, HOCH = G.HOCH;
  const mu = n * pw, sg = bnSigma(n, pw);
  let lo = Math.floor(mu - 4 * sg), hi = Math.ceil(mu + 4 * sg);
  if (band && !o.bereich){ lo = Math.min(lo, Math.floor(band.l) - 1); hi = Math.max(hi, Math.ceil(band.r) + 1); }
  lo = Math.max(0, lo); hi = Math.min(n, hi);
  while (hi - lo < 12){ if (lo > 0) lo--; if (hi < n) hi++; if (lo === 0 && hi === n) break; }
  const f = [];
  let ymax = 0;
  for (let k = lo; k <= hi; k++){ f[k] = Math.exp(BINOM.logPmf(n, pw, k)); ymax = Math.max(ymax, f[k]); }
  ymax *= 1.06;
  const bw = (X1 - X0) / (hi - lo + 1);
  const X = v => X0 + (v - lo + 0.5) * bw;
  const Y = v => Y0 - v / ymax * HOCH;
  const kl = x => Math.max(X0 - 2, Math.min(X1 + 2, x));
  const txt = (x, y, s, att) => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family="${G.schrift}" ${att || ''}>${s}</text>`;
  const halo = `paint-order="stroke" stroke="${G.papier}" stroke-width="4" stroke-linejoin="round"`;
  const id = 'bnmuster' + (++_bnMuster);
  const h = [`<defs><pattern id="${id}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">`
    + `<line x1="0" y1="0" x2="0" y2="7" stroke="${G.rand}" stroke-width="1.6" stroke-opacity=".5"/></pattern></defs>`
    + `<rect x="0" y="0" width="${W}" height="${H}" fill="${G.papier}"/>`];
  // Das Band, schraffiert
  if (band){
    const l = kl(X(band.l)), r = kl(X(band.r));
    h.push(`<rect x="${l.toFixed(1)}" y="44" width="${Math.max(0, r - l).toFixed(1)}" height="${Y0 - 44}" fill="url(#${id})"/>`);
    [l, r].forEach(x => { if (!o.bereich || (x > X0 - 1 && x < X1 + 1)) h.push(`<line x1="${x.toFixed(1)}" y1="44" x2="${x.toFixed(1)}" y2="${Y0}" stroke="${G.rand}" stroke-width="1.6"/>`); });
  }
  // Balken; im Band eingefaerbt
  const luecke = bw > 7 ? Math.min(2, bw * 0.15) : 0;
  for (let k = lo; k <= hi; k++){
    const drin = band && k >= band.a && k <= band.b;
    h.push(`<rect x="${(X(k) - bw / 2 + luecke / 2).toFixed(2)}" y="${Y(f[k]).toFixed(2)}" width="${Math.max(bw - luecke, 0.6).toFixed(2)}"`
      + ` height="${Math.max(Y0 - Y(f[k]), 0).toFixed(2)}" fill="${drin ? G.flaeche : G.balken}"${drin ? ` stroke="${G.rand}" stroke-width="${bw > 7 ? 1 : 0.3}"` : ''}/>`);
  }
  h.push(`<line x1="${X0 - 4}" y1="${Y0}" x2="${X1 + 4}" y2="${Y0}" stroke="${G.matt}" stroke-width="1.4"/>`);
  // Achse: einige k
  const schritt = [1, 2, 5, 10, 20, 25, 50, 100, 200].find(s => (hi - lo) / s <= 12) || 200;
  for (let k = Math.ceil(lo / schritt) * schritt; k <= hi; k += schritt){
    h.push(`<line x1="${X(k).toFixed(1)}" y1="${Y0}" x2="${X(k).toFixed(1)}" y2="${Y0 + 4}" stroke="${G.matt}"/>`
      + txt(X(k), Y0 + 16, String(k), `font-size="12" fill="${G.matt}" text-anchor="middle"`));
  }
  // μ gestrichelt
  h.push(`<line x1="${X(mu).toFixed(1)}" y1="${Y0}" x2="${X(mu).toFixed(1)}" y2="24" stroke="${G.matt}" stroke-width="1.2" stroke-dasharray="4 4"/>`
    + txt(X(mu), 17, `μ ${bnGl(mu)}`, `font-size="13" fill="${G.tinte}" text-anchor="middle" ${halo}`));
  if (band){
    // Die Grenzen des Bandes (nicht ganzzahlig) und P im Band
    const zl = X(band.l), zr = X(band.r);
    if (zl >= X0 && o.lt) h.push(txt(zl - 3, 40, `${o.lt} ${bnGl(band.l)}`, `font-size="12" fill="${G.rand}" text-anchor="end" ${halo}`));
    if (zr <= X1 && o.rt) h.push(txt(zr + 3, 40, `${o.rt} ${bnGl(band.r)}`, `font-size="12" fill="${G.rand}" text-anchor="start" ${halo}`));
    const xm = Math.min(Math.max(X(mu), X0 + 50), X1 - 50);
    const P = o.zeigeP ? BINOM.prozent(band.P, o.ziel) : '?';
    h.push(txt(xm, Y0 - 0.36 * HOCH, P, `font-size="24" font-weight="600" fill="${o.zeigeP ? G.tinte : G.matt}" text-anchor="middle" ${halo}`));
  }
  // Der σ-Stab: ab μ nach links und rechts, c σ lang, je σ ein Stueck,
  // abwechselnd dunkel und hell
  if (mitStab){
    const L = o.stab, yS = Y0 + 36;
    [-1, 1].forEach(seite => {
      let v = 0, i = 0;
      while (v < L - 1e-9){
        const l = Math.min(1, L - v);
        const x1 = kl(X(mu + seite * v * sg)), x2 = kl(X(mu + seite * (v + l) * sg));
        const xa = Math.min(x1, x2), xb = Math.max(x1, x2);
        h.push(`<rect x="${xa.toFixed(1)}" y="${yS - 5}" width="${(xb - xa).toFixed(1)}" height="10" rx="2" fill="${i % 2 ? G.stab2 : G.stab}"/>`);
        if (l === 1 && xb - xa >= 12) h.push(txt((xa + xb) / 2, yS + 19, 'σ', `font-size="12" fill="${G.stab}" text-anchor="middle"`));
        v += l; i++;
      }
    });
    h.push(`<line x1="${X(mu).toFixed(1)}" y1="${yS - 9}" x2="${X(mu).toFixed(1)}" y2="${yS + 9}" stroke="${G.tinte}" stroke-width="1.6"/>`);
    const xr = kl(X(mu + L * sg)), rechtsEng = xr + 8 > X1 - 50;
    h.push(txt(rechtsEng ? X1 : xr + 8, yS + 4.5, `${BINOM.zahl(L, 2)} σ`, `font-size="12.5" font-weight="600" fill="${G.stab}" text-anchor="${rechtsEng ? 'end' : 'start'}" ${halo}`));
  }
  if (o.legende) h.push(txt(X1, H - 5, bnEsc(o.legende), `font-size="10.5" fill="${G.matt}" text-anchor="end"`));
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = h.join('');
}

function etappe2(){
  loesungAnwenden(bnLoesungE2Stand);
  const s = bnStand(), z = bnSigStand(s), B = BINOM;
  const e = D.etappen[1];
  const offen = document.body.classList.contains('loesungoffen');
  // GEAENDERT (FASSUNG 8): intern 0-3 (0 = Austesten), angezeigt zug + 1
  const zug = z.zug;
  const Z1 = BN_S.z1, Z2 = BN_S.z2, Z3 = BN_S.z3, WT = BN_S.w, ZT = BN_ZT;
  // Die Teile (FASSUNG 9: im Band als Reiter, ohne «Zug» und Nummer)
  const frei = nr => bnZugFrei(z, nr, offen);
  const zuege = `<div class="bn-zuege${D.leiste === 'oben' ? ' imband' : ''}" role="tablist" aria-label="Teile">${[0, 1, 2, 3].map(nr =>
    `<button type="button" role="tab" data-zug="${nr}" aria-current="${nr === zug}" aria-selected="${nr === zug}"
      class="${bnZugFertig(z, nr) ? 'fertig' : ''}"${frei(nr) ? '' : ' disabled title="Erst den Teil davor fertig machen"'}>${bnEsc(BN_S.zuege_kurz[String(nr + 1)])}</button>`).join('')}</div>`;
  // GEAENDERT (FASSUNG 9): Beim Austesten nennt das Band die vier offenen
  // Fragen, danach die Wuerfelbude. Die Teile stehen als Reiter darueber.
  const karte = zug === 0
    ? bnKarteHtml({id: 'e2', nr: 2, name: BN_S.zt_sname, text: BN_S.lage, frage: BN_S.zt_frage})
    : bnKarteHtml({id: 'e2', nr: 2, name: BN_S.sname, text: BN_S.abk_lage,
        frage: BN_S.frage, bild: BN.sbild.wuerfelbude});
  buehne({rolle: e.rolle, rang: e.rang, titel: 'Etappe 2 · ' + e.name, text: ''},
    BN_S.zuege[String(zug + 1)], 'Werkzeug · ' + (zug === 0 ? ZT.rechner : BN_S.werkzeug),
    `<button class="knopf leer" id="zurueckE1">← Etappe 1</button>
     <button class="knopf" id="pruefen">Prüfen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Mitnehmen →</button>`,
    (D.leiste === 'oben' ? zuege : '') + karte, null, [1.1, 1.15]);
  window._zustaendig = () => false;         // diese Etappe hat keine Karten
  window._neuzeichnen = null;
  window._bnOrdnen = null;
  document.body.classList.remove('bn-stift-an');
  const tisch = document.getElementById('tisch'), feld = document.getElementById('feld');
  // In der Kontrollfassung wird nichts gesichert: Der Stand ist dort die
  // Loesung, nicht der eigene.
  const merk = () => { if (!offen) sichern(); };
  const neu = () => { merk(); etappe2(); };

  const schreib = (id, frage) => `<div class="bn-auftrag"><label for="${id}">${bnEsc(frage)}</label>
    <textarea id="${id}" spellcheck="true"></textarea></div>`;
  const tabelle = (id, kopf) => `<table class="bn-tab" id="${id}"><thead><tr>${kopf.map(t => `<th>${bnEsc(t)}</th>`).join('')}<th aria-label="streichen"></th></tr></thead><tbody></tbody></table>`;

  // Rechts: das Werkzeug
  feld.innerHTML = `<div class="bn-s2r">
    <div class="titel" id="bnwtitel"></div>
    <div class="bn-wfrage" id="bnwfrage"></div>
    <svg id="bnwbild" role="img" aria-label="Histogramm"></svg>
    <div class="bn-werte" id="bnwerte" aria-live="polite"></div>
    <div id="bnregler"></div>
    <div id="bnwunten"></div>
  </div>`;
  const svgW = document.getElementById('bnwbild');
  // NEU (FASSUNG 8): Beim Rechner stehen die Felder und P oben, das
  // Histogramm darunter - so bleibt beim Weitertasten alles in Reichweite.
  if (zug === 0) svgW.before(document.getElementById('bnregler'), document.getElementById('bnwerte'), document.getElementById('bnwunten'));

  // Links: der Zug
  let links = '';
  if (zug === 0){
    // NEU (FASSUNG 8): Zug 1 «Austesten» - die vier Aufgaben, je Aufgabe
    // Text, Antwort und «Ihre Versuche»; am Schluss «Was war mühsam?»
    // GEAENDERT (FASSUNG 9, wie die Bude in Kapitel 6): die Aufgaben als
    // Nummern mit ✓, die aktuelle gross; der Satz steht im Band.
    links = `${D.leiste === 'oben' ? '' : `<p>${bnEsc(ZT.text)}</p>`}
      <div class="bn-anrn" id="bnztwahl" role="group" aria-label="Aufgaben"><span class="was">Aufgaben</span>${BN_ZTS.reihe.map((id, i) =>
        `<button type="button" class="bn-anr" data-i="${i}" title="${bnEsc(BN_KARTE[id].kurz)}">${i + 1}</button>`).join('')}</div>
      <div class="bn-box" id="bnztbox"></div>
      <div id="bnztschluss" style="display:none">${schreib('bnzttext', ZT.frage)}
        <div class="bn-hinweis" id="bnztabk" style="display:none">${bnEsc(ZT.abkuerzung)}</div></div>`;
  } else if (zug === 1){
    links = `${D.leiste === 'oben' ? '' : `<p>${bnEsc(Z1.text)}</p>`}
      <div class="bn-box"><div class="kopf">${bnEsc(Z1.ben)}</div>
        <div class="zart" id="bnz1auf">${bnEsc(bnFuell(Z1.aufgabe, {m: Z1.mind}))}</div>
        ${tabelle('bnz1tab', [Z1.tab_n, Z1.tab_band, Z1.tab_P])}</div>
      <div id="bnz1schreib">${schreib('bnz1text', Z1.frage)}</div>
      <div class="bn-hinweis" id="bnz1sigma" style="display:none">${bnEsc(Z1.sigma)}</div>`;
  } else if (zug === 2){
    links = `${D.leiste === 'oben' ? '' : `<p>${bnEsc(Z2.text)}</p>`}
      <div class="bn-box"><div class="bn-cwahl" id="bnc" role="group" aria-label="${bnEsc(Z2.wahl)}"><span>${bnEsc(Z2.wahl)}</span>
        ${BN_CS.map(c => `<button type="button" data-c="${c}">μ ± ${c}σ</button>`).join('')}</div>
        <div id="bnschaetz"></div></div>
      <div id="bnz2tabs"></div>
      <div id="bnz2schreib">${schreib('bnz2text', Z2.frage)}</div>`;
  } else {
    const fe = Z3.felder.filter(f => f.w !== 'a' && f.w !== 'b');
    links = `${D.leiste === 'oben' ? '' : `<p>${bnEsc(Z3.text)}</p>`}
      <div class="bn-wahl" id="bnansicht">${['95', '90', '99', 'abk'].map(w =>
        `<button type="button" data-w="${w}">${bnEsc(Z3.ansichten[w])}</button>`).join('')}</div>
      <div class="bn-box">${tabelle('bnz3tab', [Z3.tab_S, Z3.tab_ihr, Z3.tab_genau])}</div>
      <div class="zart" id="bnabkzart">${bnEsc(Z3.abk_zart)}</div>
      <div class="bn-box" id="bnabk"><div class="kopf">${bnEsc(Z3.abk_kopf)}</div>
        <p style="margin:2px 0 4px">${bnEsc(Z3.abk_text)}</p>
        <div class="bn-z3">${fe.map(f => `<label for="bnz3-${f.w}">${bnEsc(f.name)} =</label>
          <div><input id="bnz3-${f.w}" data-w="${f.w}" type="text" spellcheck="false" title="${bnEsc(f.titel)}"><span class="wert"></span></div>`).join('')}
          <label for="bnz3-a">${bnEsc(Z3.bereich)}</label>
          <div><span class="bn-ab">[ <input id="bnz3-a" class="gr" data-w="a" type="text" inputmode="numeric" spellcheck="false" aria-label="a">
            ; <input id="bnz3-b" class="gr" data-w="b" type="text" inputmode="numeric" spellcheck="false" aria-label="b"> ]</span>
            <span class="wert" id="bnz3abwert"></span></div></div>
        <div class="zart">${bnEsc(Z3.zart)}</div>
        <div class="bn-hinweis" id="bnganz" style="display:none"></div>
        <div class="bn-vergleich" id="bnvergleich" style="display:none"></div>
        ${schreib('bnz3text', Z3.frage)}
        <div class="bn-s2sicht" id="bns2sicht"></div></div>`;
  }
  tisch.innerHTML = `<div class="bn-s2">${D.leiste === 'oben' ? '' : zuege}${links}</div>`;

  document.querySelectorAll('.bn-zuege button').forEach(k => k.onclick = () => {
    const nr = Number(k.dataset.zug);
    if (nr === z.zug || k.disabled) return;
    z.zug = nr; bnFahne(null); neu();
  });

  /* Der Zustand des Werkzeugs in diesem Zug: n (und p, c) */
  const WZ = zug === 0 ? null : zug === 1 ? z.z1 : zug === 2 ? z.z2 : z.z3;
  /* Zug 1 (FASSUNG 8): die aktive Aufgabe und ihr Rechner */
  const ztA = () => BN_ZTS.aufgaben[z.zt.auf];
  const ztR = () => z.zt.r[ztA().id];
  const abkAnsicht = () => zug === 3 && z.z3.ansicht === 'abk';

  /* ── Die Regler ── */
  function reglerBauen(){
    const r = document.getElementById('bnregler');
    if (abkAnsicht()){ r.innerHTML = ''; return; }
    if (zug === 0){ rechnerBauen(r); return; }
    const zeile = (was, inhalt, titel) => `<div class="bn-regler" title="${bnEsc(titel)}"><label class="rn" for="bnr${was}">${bnEsc(WT[was])}</label>${inhalt}</div>`;
    let h = zeile('n', `<input type="range" id="bnrn" min="0" max="${BN_NW.length - 1}" step="1" aria-label="n">
      <input type="number" id="bnzn" min="10" max="6000" step="1" aria-label="n als Zahl">`, WT.n_titel);
    if (zug !== 1) h += zeile('p', `<input type="range" id="bnrp" min="1" max="99" step="1" aria-label="p">
      <input type="text" id="bnzp" class="pz" inputmode="decimal" spellcheck="false" autocomplete="off" aria-label="p als Zahl">`, WT.p_titel);
    if (zug === 3) h += zeile('c', `<input type="range" id="bnrc" min="${Math.round(BN_Z3S.c_min * 100)}" max="${Math.round(BN_Z3S.c_max * 100)}" step="1" aria-label="c">
      <input type="number" id="bnzc" min="${BN_Z3S.c_min}" max="${BN_Z3S.c_max}" step="0.01" aria-label="c als Zahl">`, WT.c_titel);
    r.innerHTML = h;
    const rn = document.getElementById('bnrn'), zn = document.getElementById('bnzn');
    rn.value = bnNStelle(WZ.n); zn.value = WZ.n;
    rn.addEventListener('input', () => { WZ.n = BN_NW[Number(rn.value)]; zn.value = WZ.n; spaeter(); });
    zn.addEventListener('input', () => {
      const n = Number(zn.value);
      if (!bnNGut(n)) return;
      WZ.n = n; rn.value = bnNStelle(n); spaeter();
    });
    zn.addEventListener('change', () => { zn.value = WZ.n; merk(); });
    rn.addEventListener('change', merk);
    if (zug !== 1){
      const rp = document.getElementById('bnrp'), zp = document.getElementById('bnzp');
      rp.value = Math.round(WZ.p.w * 100); zp.value = WZ.p.t;
      rp.addEventListener('input', () => {
        const w = Number(rp.value) / 100;
        WZ.p = {t: BINOM.zahl(w, 2), w}; zp.value = WZ.p.t; zp.classList.remove('falsch'); spaeter();
      });
      zp.addEventListener('input', () => {
        const p = bnPLesen(zp.value);
        zp.classList.toggle('falsch', !p && zp.value.trim() !== '');
        if (!p) return;
        WZ.p = p; rp.value = Math.round(p.w * 100); spaeter();
      });
      zp.addEventListener('change', () => { zp.value = WZ.p.t; zp.classList.remove('falsch'); merk(); });
      rp.addEventListener('change', merk);
    }
    if (zug === 3){
      const rc = document.getElementById('bnrc'), zc = document.getElementById('bnzc');
      rc.value = Math.round(WZ.c * 100); zc.value = WZ.c.toFixed(2);
      rc.addEventListener('input', () => { WZ.c = Number(rc.value) / 100; zc.value = WZ.c.toFixed(2); spaeter(); });
      zc.addEventListener('input', () => {
        const c = Math.round(Number(String(zc.value).replace(',', '.')) * 100) / 100;
        if (!(c >= BN_Z3S.c_min && c <= BN_Z3S.c_max)) return;
        WZ.c = c; rc.value = Math.round(c * 100); spaeter();
      });
      zc.addEventListener('change', () => { zc.value = WZ.c.toFixed(2); merk(); });
      rc.addEventListener('change', merk);
    }
  }
  /* ── NEU (FASSUNG 8): der Rechner B(n; p) in Zug 1 ──
     n, p, Form, k bzw. a und b; neben jedem Wert «−» und «+» (n und k in
     Einerschritten, p in Hundertsteln), beim Bereich «beide ±1». P
     erscheint sofort. */
  function rechnerBauen(el){
    const pm = (f, titel) => `<span class="bn-pm"><button type="button" data-f="${f}" data-d="-1" aria-label="${bnEsc(f + ' ' + (f === 'p' ? ZT.minus_p : ZT.minus))}" title="${bnEsc(f === 'p' ? ZT.minus_p : ZT.minus)}">−</button>`
      + `<input type="text" id="bnq${f}" data-f="${f}" inputmode="${f === 'p' ? 'decimal' : 'numeric'}" spellcheck="false" autocomplete="off" aria-label="${bnEsc(titel || f)}">`
      + `<button type="button" data-f="${f}" data-d="1" aria-label="${bnEsc(f + ' ' + (f === 'p' ? ZT.plus_p : ZT.plus))}" title="${bnEsc(f === 'p' ? ZT.plus_p : ZT.plus)}">+</button></span>`;
    el.innerHTML = `<div class="bn-rech">
      <div class="bn-rz"><label for="bnqn">n</label>${pm('n')}<label for="bnqp">p</label>${pm('p')}</div>
      <div class="bn-rz"><label for="bnqform">${bnEsc(ZT.form)}</label>
        <select id="bnqform">${BN.kformen.map(f => `<option value="${f.form}">${bnEsc(f.text)}</option>`).join('')}</select>
        <span class="bn-rk" id="bnqkz"><label for="bnqk">k</label>${pm('k')}</span>
        <span class="bn-rk" id="bnqabz"><label for="bnqa">a</label>${pm('a')}<span>≤ X ≤</span><label for="bnqb">b</label>${pm('b')}</span></div>
      <div class="bn-rz" id="bnqbeide"><span title="${bnEsc(ZT.beide_titel)}">${bnEsc(ZT.beide)}</span>
        <button type="button" class="bn-beide" data-d="1">${bnEsc(ZT.breiter)}</button>
        <button type="button" class="bn-beide" data-d="-1">${bnEsc(ZT.enger)}</button></div>
      <div class="zart" id="bnqfalsch"></div></div>`;
    const sel = document.getElementById('bnqform');
    const zeigen = () => {
      const r = ztR();
      ['n', 'k', 'a', 'b'].forEach(f => { const i = document.getElementById('bnq' + f); i.value = r[f]; i.classList.remove('falsch'); });
      const ip = document.getElementById('bnqp'); ip.value = r.p.t; ip.classList.remove('falsch');
      sel.value = r.form;
      const ber = r.form === 'bereich';
      document.getElementById('bnqkz').style.display = ber ? 'none' : '';
      document.getElementById('bnqabz').style.display = ber ? '' : 'none';
      document.getElementById('bnqbeide').style.display = ber ? '' : 'none';
      document.getElementById('bnqfalsch').textContent = '';
    };
    const ganz = (f, v) => Math.max(f === 'n' ? 1 : 0, Math.min(f === 'n' ? BN_ZTS.n_max : ztR().n, v));
    el.querySelectorAll('.bn-pm button').forEach(b => b.onclick = () => {
      const r = ztR(), f = b.dataset.f, d = Number(b.dataset.d);
      if (f === 'p'){
        // auf das naechste Hundertstel (1/6 -> 0.17 bzw. 0.16)
        const h = d > 0 ? Math.floor(r.p.w * 100 + 1e-9) + 1 : Math.ceil(r.p.w * 100 - 1e-9) - 1;
        const j = Math.max(1, Math.min(99, h));
        r.p = {t: BINOM.zahl(j / 100, 2), w: j / 100};
      } else r[f] = ganz(f, r[f] + d);
      zeigen(); merk(); werkzeug();
    });
    el.querySelectorAll('.bn-beide').forEach(b => b.onclick = () => {
      const r = ztR(), d = Number(b.dataset.d);
      if (d < 0 && r.b - r.a < 2) return;          // enger geht nicht mehr
      r.a = ganz('a', r.a - d); r.b = ganz('b', r.b + d);
      zeigen(); merk(); werkzeug();
    });
    el.querySelectorAll('.bn-pm input').forEach(i => {
      const f = i.dataset.f;
      i.addEventListener('input', () => {
        const r = ztR();
        let ok;
        if (f === 'p'){
          const p = bnPLesen(i.value);
          ok = !!p; if (ok) r.p = p;
        } else {
          const v = BINOM.leseGanz(i.value);
          ok = f === 'n' ? bnRnGut(v) : bnGanzOk(v);
          if (ok) r[f] = v;
        }
        i.classList.toggle('falsch', !ok && i.value.trim() !== '');
        document.getElementById('bnqfalsch').textContent = ok || !i.value.trim() ? ''
          : f === 'n' ? bnFuell(ZT.n_falsch, {N: BN_ZTS.n_max}) : f === 'p' ? ZT.p_falsch : '';
        if (ok) spaeter();
      });
      i.addEventListener('change', () => { zeigen(); merk(); });
      i.addEventListener('keydown', ev => {
        if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown'){
          ev.preventDefault();
          el.querySelector(`.bn-pm button[data-f="${f}"][data-d="${ev.key === 'ArrowUp' ? 1 : -1}"]`).click();
          i.focus();
        }
      });
    });
    sel.addEventListener('change', () => {
      const r = ztR();
      r.form = sel.value;
      zeigen(); merk(); werkzeug();
    });
    zeigen();
  }

  /* Neu zeichnen hoechstens einmal je Bild (beim Ziehen am Regler) */
  let _raf = 0;
  const spaeter = () => { if (!_raf) _raf = requestAnimationFrame(() => { _raf = 0; werkzeug(); }); };

  /* Das Band des Zuges bei den eingestellten Werten */
  function aktBand(){
    if (zug === 1) return bnFestBand(WZ.n, BN_Z1S.pw, BN_Z1S.h);
    if (zug === 2) return bnSigBand(WZ.n, WZ.p.w, WZ.c);
    if (abkAnsicht()) return bnSigBand(BN_Z3.n, BN_Z3.pw, 2);
    return bnSigBand(WZ.n, WZ.p.w, WZ.c);
  }
  /* Das Werkzeug zeichnen, mit Titel, Werten und Knoepfen */
  function werkzeug(){
    const wt = document.getElementById('bnwtitel'), wf = document.getElementById('bnwfrage');
    const we = document.getElementById('bnwerte');
    if (zug === 0){
      // NEU (FASSUNG 8): der Rechner - der Bereich eingefaerbt, P sofort
      const A = ztA(), r = ztR(), [a, b] = bnZtIv(r), P = bnZtP(r), zi = bnZtZiel(A);
      const aa = Math.max(0, a), bb = Math.min(r.n, b);
      wt.textContent = `B(${r.n}; ${r.p.t})`;
      wf.textContent = BN_KARTE[A.id].kurz;
      bnBandBild(svgW, {n: r.n, pw: r.p.w, band: aa <= bb ? {l: aa - 0.5, r: bb + 0.5, a: aa, b: bb, P} : null,
        zeigeP: true, ziel: zi, legende: ZT.legende, bereich: true});
      we.innerHTML = aa > bb ? `P(${bnEsc(bnZtForm(r))}) = <b>0 %</b> <span class="zart">· ${bnEsc(ZT.leer)}</span>`
        : `P(${bnEsc(bnZtForm(r))}) = <b>${B.prozent(P, zi)}</b>`;
      svgW.setAttribute('aria-label', `Histogramm B(${r.n}; ${r.p.t}), eingefärbt ${bnZtForm(r)}`);
      knoepfe();
      return;
    }
    const Bd = aktBand(), bandText = Bd.a > Bd.b ? WT.leer_band : `Band [${Bd.a}; ${Bd.b}]`;
    if (zug === 1){
      wt.textContent = `${BN_S.sname.replace(/^Die /, '')}: n = ${WZ.n}, p = ${BN_Z1S.p}`;
      wf.textContent = Z1.ben;
      bnBandBild(svgW, {n: WZ.n, pw: BN_Z1S.pw, band: Bd, lt: 'μ − 10', rt: 'μ + 10', zeigeP: true, legende: Z1.legende});
      we.innerHTML = `μ ${bnGl(Bd.mu)} · ${bandText} · P(${Bd.a} ≤ X ≤ ${Bd.b}) = <b>${bnP1(Bd.P)}</b>`;
      svgW.setAttribute('aria-label', `Histogramm B(${WZ.n}; 1/6) mit dem Band μ ± 10`);
    } else if (zug === 2){
      const c = WZ.c, da = z.z2.est[c].auf || offen, cs = c + 'σ';
      wt.textContent = `n = ${WZ.n}, p = ${WZ.p.t}`;
      wf.textContent = `Band μ ± ${cs}`;
      bnBandBild(svgW, {n: WZ.n, pw: WZ.p.w, band: Bd, lt: `μ − ${cs}`, rt: `μ + ${cs}`, zeigeP: da, stab: c, legende: Z2.legende});
      we.innerHTML = `μ ${bnGl(Bd.mu)} · σ ${bnGl(Bd.s)} · ${bandText} · `
        + (da ? `P = <b>${bnP1(Bd.P)}</b>` : `<span class="zart">${bnEsc(WT.verdeckt)}</span>`);
      svgW.setAttribute('aria-label', `Histogramm B(${WZ.n}; ${WZ.p.t}) mit dem Band μ ± ${cs}`);
    } else if (abkAnsicht()){
      const fertig = bnZ3Rechnet(z) || offen;
      wt.textContent = `${BN_S.sname.replace(/^Die /, '')}: n = ${BN_Z3.n}, p = ${BN_Z3.p}`;
      wf.textContent = '';
      bnBandBild(svgW, {n: BN_Z3.n, pw: BN_Z3.pw, band: fertig ? Bd : null, lt: 'μ − 2σ', rt: 'μ + 2σ', zeigeP: true,
        stab: fertig ? 2 : undefined, legende: fertig ? Z3.legende_abk : ''});
      we.innerHTML = fertig ? `μ = ${bnZ2(Bd.mu)} · σ ${bnGl(Bd.s)} · Band [${Bd.a}; ${Bd.b}] · P(${Bd.a} ≤ X ≤ ${Bd.b}) = <b>${bnP1(Bd.P)}</b>` : '';
      svgW.setAttribute('aria-label', 'Histogramm Würfelbude mit dem Band μ ± 2σ');
    } else {
      const S = Number(z.z3.ansicht), zi = BN_ZIEL(S);
      wt.textContent = `n = ${WZ.n}, p = ${WZ.p.t}, c = ${bnC(WZ.c)}`;
      wf.textContent = bnFuell(Z3.frage_s, {S});
      bnBandBild(svgW, {n: WZ.n, pw: WZ.p.w, band: Bd, lt: 'μ − cσ', rt: 'μ + cσ', zeigeP: true, ziel: zi, stab: WZ.c, legende: Z3.legende});
      we.innerHTML = `σ ${bnGl(Bd.s)} · c · σ ≈ ${bnZ2(WZ.c * Bd.s)} · ${bandText} · P = <b>${B.prozent(Bd.P, zi)}</b>`;
      svgW.setAttribute('aria-label', `Histogramm B(${WZ.n}; ${WZ.p.t}) mit dem Band μ ± ${bnC(WZ.c)} σ`);
    }
    knoepfe();
  }
  /* Unter dem Werkzeug: «Notieren» (Zug 1, 2) bzw. «c = etwa» (Zug 3) */
  function untenBauen(){
    const un = document.getElementById('bnwunten');
    if (zug === 0 || zug === 1 || zug === 2){
      un.innerHTML = `<div class="bn-ab"><button type="button" class="knopf" id="bnnotieren">${bnEsc(WT.notieren)}</button>
        <span class="zart" id="bnnotiz"></span></div>`;
      document.getElementById('bnnotieren').onclick = notieren;
      return;
    }
    if (abkAnsicht()){ un.innerHTML = ''; return; }
    const S = z.z3.ansicht;
    un.innerHTML = `<div class="bn-etwa"><label for="bnetwa">${bnEsc(Z3.etwa)}</label>
        <input id="bnetwa" type="text" inputmode="decimal" spellcheck="false" autocomplete="off">
        <button type="button" class="knopf" id="bnzeigen">${bnEsc(Z3.zeigen)}</button>
        <span class="zart" id="bnmessleer"></span></div>
      <div class="bn-hinweis" id="bnmessung" style="display:none"></div>`;
    const x = z.z3.m[S], inp = document.getElementById('bnetwa');
    inp.value = x.etwa;
    inp.addEventListener('input', () => { x.etwa = inp.value; document.getElementById('bnmessleer').textContent = ''; });
    inp.addEventListener('change', merk);
    const zeigen = () => {
      // gesperrt ist das Feld nur, wenn das Eingetragene passt
      if (inp.disabled || offen) return;
      if (isNaN(bnEtwa(inp.value))){ document.getElementById('bnmessleer').textContent = Z3.leer; return; }
      Object.assign(x, {etwa: inp.value, auf: true, n: WZ.n, pt: WZ.p.t, pw: WZ.p.w});
      merk(); messErgebnis(); linksAuffrischen(); e2Fahne();
    };
    inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') zeigen(); });
    document.getElementById('bnzeigen').onclick = zeigen;
    messErgebnis();
  }
  function messErgebnis(){
    const S = z.z3.ansicht, x = z.z3.m[S];
    const inp = document.getElementById('bnetwa'), kn = document.getElementById('bnzeigen'), er = document.getElementById('bnmessung');
    if (!inp) return;
    // Passt es nicht, darf man noch einmal eintragen (weich, nicht rot).
    const u = x.auf ? bnCUrteil(x, Number(S)) : null, zu = (u && u.passt) || offen;
    inp.disabled = zu; kn.style.display = zu ? 'none' : '';
    if (!u){ er.style.display = 'none'; return; }
    er.style.display = '';
    er.className = 'bn-hinweis ' + (u.passt ? 'passt' : 'daneben');
    er.textContent = u.text;
  }
  function knoepfe(){
    const kn = document.getElementById('bnnotieren');
    if (!kn) return;
    const nz = document.getElementById('bnnotiz');
    if (zug === 2 && !z.z2.est[WZ.c].auf && !offen){ kn.disabled = true; nz.textContent = WT.verdeckt; return; }
    kn.disabled = offen;
    nz.textContent = schonDa() ? (zug === 0 ? ZT.schon : WT.schon) : '';
  }
  /* Steht das eingestellte Paar schon in der Tabelle? */
  const ztGleich = (x, r) => x.n === r.n && bnGleichesP(x.pw, r.p.w) && x.form === r.form
    && (r.form === 'bereich' ? x.a === r.a && x.b === r.b : x.k === r.k);
  function schonDa(){
    if (zug === 0) return z.zt.v[ztA().id].some(x => ztGleich(x, ztR()));
    if (zug === 1) return z.z1.rows.some(r => r.n === WZ.n);
    return z.z2.rows[WZ.c].some(r => r.n === WZ.n && bnGleichesP(r.pw, WZ.p.w));
  }
  function notieren(){
    if (offen) return;
    if (zug === 2 && !z.z2.est[WZ.c].auf) return;
    if (schonDa()){ document.getElementById('bnnotiz').textContent = zug === 0 ? ZT.schon : WT.schon; return; }
    if (zug === 0){
      const r = ztR(), x = {n: r.n, pt: r.p.t, pw: r.p.w, form: r.form};
      if (r.form === 'bereich'){ x.a = r.a; x.b = r.b; } else x.k = r.k;
      z.zt.v[ztA().id].push(x);
    } else if (zug === 1){
      z.z1.rows.push({n: WZ.n});
      z.z1.rows.sort((a, b) => a.n - b.n);
    } else z.z2.rows[WZ.c].push({n: WZ.n, pt: WZ.p.t, pw: WZ.p.w});
    merk(); linksAuffrischen(); knoepfe(); e2Fahne();
  }

  /* ── Links ── */
  const streich = (i, c) => offen ? '<td></td>'
    : `<td><button type="button" class="bn-zweg" data-i="${i}"${c ? ` data-c="${c}"` : ''} title="${bnEsc(WT.weg)}" aria-label="${bnEsc(WT.weg)}">×</button></td>`;
  /* NEU (FASSUNG 8): die aktive Aufgabe von Zug 1 - Text der Karte,
     Antwort, Hinweis, «Ihre Versuche». Neu gebaut nur beim Wechsel. */
  function ztBox(){
    const A = ztA(), K = BN_KARTE[A.id], x = z.zt.antw[A.id], box = document.getElementById('bnztbox');
    const zus = ZT.zusatz[A.art] ? ` <span class="zart">(${bnEsc(ZT.zusatz[A.art])})</span>` : '';
    const feld = A.art === 'bereich'
      ? `<span class="bn-ab">[ <input id="bnzta" class="gr" type="text" inputmode="numeric" spellcheck="false" autocomplete="off" aria-label="a">
          ; <input id="bnztb" class="gr" type="text" inputmode="numeric" spellcheck="false" autocomplete="off" aria-label="b"> ]</span>`
      : `<input id="bnztt" type="text" inputmode="${A.art === 'p' ? 'decimal' : 'numeric'}" spellcheck="false" autocomplete="off" aria-label="${bnEsc(ZT.antwort[A.art])}">`;
    box.innerHTML = `<div class="bn-ztvon">${bnEsc(bnFuell(BN_S.aufgabe_von, {n: z.zt.auf + 1, m: BN_ZTS.reihe.length}))}</div>
      <div class="kopf gross">${K.bild ? `<img src="${bnEsc(K.bild)}" alt="" aria-hidden="true" class="bn-ztbild">` : ''}${bnEsc(K.kurz)}</div>
      <p class="bn-zttext">${bnEsc(K.text)}</p>
      <div class="bn-ztantw"><label for="${A.art === 'bereich' ? 'bnzta' : 'bnztt'}">${bnEsc(ZT.antwort[A.art])}</label> ${feld}${zus}
        <button type="button" class="knopf" id="bnztpruefen">${bnEsc(ZT.pruefen)}</button></div>
      <div class="bn-hinweis" id="bnzthinweis" style="display:none"></div>
      <div class="kopf bn-ztvk">${bnEsc(ZT.versuche)}</div>
      <table class="bn-tab" id="bnzttab"><thead><tr><th>${bnEsc(ZT.tab_n)}</th><th>${bnEsc(ZT.tab_p)}</th><th>${bnEsc(ZT.tab_b)}</th><th>${bnEsc(ZT.tab_P)}</th><th aria-label="streichen"></th></tr></thead><tbody></tbody></table>`;
    const felder = A.art === 'bereich' ? [['bnzta', 'a'], ['bnztb', 'b']] : [['bnztt', 't']];
    felder.forEach(([id, w]) => {
      const i = document.getElementById(id);
      i.value = x[w];
      if (offen) i.disabled = true;
      i.addEventListener('input', () => {
        x[w] = i.value; i.classList.remove('bn-luecke');
        if (x.g){ x.g = false; ztUrteil(); zugKnoepfe(); e2Fahne(); ztSchluss(); ztWahl(); }
      });
      i.addEventListener('change', merk);
      i.addEventListener('keydown', ev => { if (ev.key === 'Enter') ztPruefen(); });
    });
    document.getElementById('bnztpruefen').onclick = ztPruefen;
    ztUrteil();
  }
  function ztPruefen(){
    if (offen) return;
    const A = ztA(), x = z.zt.antw[A.id], u = bnZtUrteil(A, x), h = document.getElementById('bnzthinweis');
    if (u.leer){
      h.style.display = ''; h.className = 'bn-hinweis'; h.textContent = ZT.leer_antwort;
      // NEU (FASSUNG 9): Pruefen zeigt, wo - leere Felder rot umrandet
      document.querySelectorAll('#bnztbox .bn-ztantw input').forEach(i => i.classList.toggle('bn-luecke', !i.value.trim()));
      return;
    }
    x.g = true; merk();
    ztUrteil(); ztWahl(); ztSchluss(); zugKnoepfe(); e2Fahne();
    // NEU (FASSUNG 9): Stimmt die Aufgabe, nennt ein Fenster die naechste
    // offene (einmal je Aufgabe). Nach der letzten uebernimmt e2Fahne.
    if (u.ok && !bnZtAlle(z)){
      const R = BN_ZTS.reihe, i0 = z.zt.auf;
      let j = R.findIndex((id, i) => i > i0 && !bnZtOk(z, id));
      if (j < 0) j = R.findIndex(id => !bnZtOk(z, id));
      const WA = BN.wegweiser.aufgabe, o = {n: i0 + 1, m: j + 1, name: BN_KARTE[R[j]].kurz};
      if (!bnObj(stand.wegweiser)) stand.wegweiser = {};
      if (!stand.wegweiser['e2zt' + A.id]){
        stand.wegweiser['e2zt' + A.id] = true; merk();
        bnWegweiser({fenster: {text: bnFuell(WA.text, o), jetzt: bnFuell(WA.jetzt, o)},
          knopf: bnFuell(WA.knopf, o), tun: () => {
            z.zt.auf = j; merk(); ztBox(); rechts(); linksAuffrischen();
            document.getElementById('befund').textContent = '';
          }});
      }
    }
  }
  function ztUrteil(){
    const A = ztA(), x = z.zt.antw[A.id], h = document.getElementById('bnzthinweis');
    const u = x.g || offen ? bnZtUrteil(A, x) : null;
    const ok = !!(u && u.ok);
    document.querySelectorAll('#bnztbox .bn-ztantw input').forEach(i => {
      i.classList.toggle('ok', ok); i.classList.toggle('falsch', !!(u && !u.leer && !u.ok));
    });
    // Stimmt es, ist das Feld zu (wie «c = etwa» in Zug 4); sonst darf man weiter eintragen.
    document.querySelectorAll('#bnztbox .bn-ztantw input').forEach(i => { i.disabled = ok || offen; });
    document.getElementById('bnztpruefen').style.display = ok || offen ? 'none' : '';
    if (!u || u.leer){ h.style.display = 'none'; return; }
    h.style.display = '';
    h.className = 'bn-hinweis ' + (u.ok ? 'passt' : 'daneben');
    h.textContent = u.text;
  }
  function ztWahl(){
    tisch.querySelectorAll('#bnztwahl button').forEach(k => {
      const i = Number(k.dataset.i), ok = bnZtOk(z, BN_ZTS.reihe[i]);
      k.setAttribute('aria-pressed', String(i === z.zt.auf));
      k.classList.toggle('fertig', ok);
      k.innerHTML = `${i + 1}${ok ? '<span class="ok">✓</span>' : ''}`;
    });
  }
  function ztSchluss(){
    const da = bnZtAlle(z) || offen;
    document.getElementById('bnztschluss').style.display = da ? '' : 'none';
    document.getElementById('bnztabk').style.display = bnZtFertig(z) || offen ? '' : 'none';
  }
  function linksAuffrischen(){
    if (zug === 0){
      const A = ztA(), zi = bnZtZiel(A), V = z.zt.v[A.id];
      tisch.querySelector('#bnzttab tbody').innerHTML = V.map((x, i) => {
        const P = bnZtP(Object.assign({}, x, {p: {w: x.pw}}));
        return `<tr><td>${x.n}</td><td>${bnEsc(x.pt)}</td><td>${bnEsc(bnZtForm(x))}</td><td>${BINOM.prozent(P, zi)}</td>${streich(i)}</tr>`;
      }).join('') || `<tr><td class="leer" colspan="5">${bnEsc(ZT.keine)}</td></tr>`;
      ztWahl(); ztSchluss();
    } else if (zug === 1){
      const tb = tisch.querySelector('#bnz1tab tbody');
      tb.innerHTML = z.z1.rows.map((r, i) => {
        const Bd = bnFestBand(r.n, BN_Z1S.pw, BN_Z1S.h);
        return `<tr><td>${r.n}</td><td>[${Bd.a}; ${Bd.b}]</td><td>${bnP1(Bd.P)}</td>${streich(i)}</tr>`;
      }).join('') || `<tr><td class="leer" colspan="4">…</td></tr>`;
      const genug = z.z1.rows.length >= Z1.mind;
      document.getElementById('bnz1auf').textContent = genug ? '' : bnFuell(Z1.aufgabe, {m: Z1.mind})
        + (z.z1.rows.length ? ` (${z.z1.rows.length} von ${Z1.mind})` : '');
      document.getElementById('bnz1schreib').style.display = genug || offen ? '' : 'none';
      document.getElementById('bnz1sigma').style.display = bnZ1Fertig(z) || offen ? '' : 'none';
    } else if (zug === 2){
      const c = WZ.c;
      tisch.querySelectorAll('#bnc button').forEach(k => {
        const kc = Number(k.dataset.c), darf = offen || kc === 1 || bnZ2CFertig(z, kc - 1);
        k.setAttribute('aria-pressed', String(kc === c));
        k.disabled = !darf && kc !== c;
        k.title = darf ? '' : bnFuell(Z2.erst, {c: `μ ± ${kc - 1}σ`, m: BN_Z2S.mind[kc - 1]});
        k.classList.toggle('fertig', bnZ2CFertig(z, kc));
      });
      // Die Schaetzung zum gewaehlten c
      const sc = document.getElementById('bnschaetz'), est = z.z2.est[c], cs = `${c}σ`;
      if (est.auf || offen){
        sc.innerHTML = `<div class="bn-etwa"><span>${bnEsc(bnFuell(Z2.schaetzen, {c: cs}))}</span>
          <b>${bnEsc(bnFuell(Z2.ihre, {t: est.t.trim() || '…'}))}</b></div>`;
      } else if (!sc.querySelector('#bnschaetzt') || sc.dataset.c !== String(c)){
        sc.dataset.c = String(c);
        sc.innerHTML = `<div class="bn-etwa"><label for="bnschaetzt">${bnEsc(bnFuell(Z2.schaetzen, {c: cs}))}</label>
          <input id="bnschaetzt" type="text" inputmode="decimal" spellcheck="false" autocomplete="off" style="width:6em">
          <button type="button" class="knopf" id="bnschaetzk">${bnEsc(Z2.schaetzen_knopf)}</button>
          <span class="zart" id="bnschaetzleer"></span></div>`;
        const inp = document.getElementById('bnschaetzt');
        inp.value = est.t;
        inp.addEventListener('input', () => { est.t = inp.value; document.getElementById('bnschaetzleer').textContent = ''; });
        inp.addEventListener('change', merk);
        const fest = () => {
          if (!est.t.trim()){ document.getElementById('bnschaetzleer').textContent = Z2.schaetzen_leer; return; }
          est.auf = true; merk(); linksAuffrischen(); werkzeug(); e2Fahne();
        };
        inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') fest(); });
        document.getElementById('bnschaetzk').onclick = fest;
      }
      // Je c mit Schaetzung eine Tabelle (n, p, σ, P)
      const tabs = document.getElementById('bnz2tabs');
      tabs.innerHTML = BN_CS.filter(k => z.z2.est[k].auf || offen).map(k => {
        const r = z.z2.rows[k], m = BN_Z2S.mind[k], kcs = `μ ± ${k}σ`;
        return `<div class="bn-box${k === c ? ' aktiv' : ''}"><div class="kopf">Band ${kcs}
            <span class="zart">· ${bnEsc(bnFuell(Z2.ihre, {t: z.z2.est[k].t.trim() || '…'}))}</span></div>
          ${r.length < m ? `<div class="zart">${bnEsc(bnFuell(Z2.aufgabe, {m}))}${r.length ? ` (${r.length} von ${m})` : ''}</div>` : ''}
          <table class="bn-tab"><thead><tr><th>${bnEsc(Z2.tab_n)}</th><th>${bnEsc(Z2.tab_p)}</th><th>${bnEsc(Z2.tab_s)}</th><th>${bnEsc(Z2.tab_P)}</th><th aria-label="streichen"></th></tr></thead>
          <tbody>${r.map((x, i) => {
            const Bd = bnSigBand(x.n, x.pw, k);
            return `<tr><td>${x.n}</td><td>${bnEsc(x.pt)}</td><td>${bnZ2(Bd.s)}</td><td title="Band [${Bd.a}; ${Bd.b}]">${bnP1(Bd.P)}</td>${streich(i, k)}</tr>`;
          }).join('') || '<tr><td class="leer" colspan="5">…</td></tr>'}</tbody></table></div>`;
      }).join('');
      document.getElementById('bnz2schreib').style.display = bnZ2Zeilen(z) || offen ? '' : 'none';
    } else {
      tisch.querySelectorAll('#bnansicht button').forEach(k => {
        const w = k.dataset.w;
        k.setAttribute('aria-pressed', String(w === z.z3.ansicht));
        if (w === 'abk') k.disabled = !(bnZ3Gefunden(z) || offen) && z.z3.ansicht !== 'abk';
        k.classList.toggle('fertig', w === 'abk' ? bnZ3Rechnet(z) : z.z3.m[w].auf);
      });
      tisch.querySelector('#bnz3tab tbody').innerHTML = BN_Z3S.sicherheiten.map(S => {
        const x = z.z3.m[S];
        if (!x.auf) return `<tr class="${String(S) === z.z3.ansicht ? 'aktiv' : ''}"><td>${S} %</td><td class="leer">…</td><td class="leer">…</td><td></td></tr>`;
        const u = bnCUrteil(x, S);
        return `<tr class="${String(S) === z.z3.ansicht ? 'aktiv' : ''}"><td>${S} %</td><td>${bnEsc(String(x.etwa).trim())}</td>`
          + `<td>${u.ab ? bnC(u.ab.c) : '–'} <span class="zart">(${x.n}; ${bnEsc(x.pt)})</span></td><td></td></tr>`;
      }).join('');
      const da = bnZ3Gefunden(z) || offen;
      document.getElementById('bnabk').style.display = da ? '' : 'none';
      document.getElementById('bnabkzart').style.display = da ? 'none' : '';
    }
    tisch.querySelectorAll('.bn-zweg').forEach(k => k.onclick = () => {
      const i = Number(k.dataset.i);
      if (zug === 0) z.zt.v[ztA().id].splice(i, 1);
      else if (zug === 1) z.z1.rows.splice(i, 1); else z.z2.rows[Number(k.dataset.c)].splice(i, 1);
      merk(); linksAuffrischen(); knoepfe(); e2Fahne();
    });
    zugKnoepfe();
  }

  if (zug === 0){
    tisch.querySelectorAll('#bnztwahl button').forEach(k => k.onclick = () => {
      const i = Number(k.dataset.i);
      if (i === z.zt.auf) return;
      z.zt.auf = i; merk(); ztBox(); rechts(); linksAuffrischen();
      document.getElementById('befund').textContent = '';
    });
  }
  if (zug === 2){
    tisch.querySelectorAll('#bnc button').forEach(k => k.onclick = () => {
      const c = Number(k.dataset.c);
      if (k.disabled || c === z.z2.c) return;
      z.z2.c = c; merk(); linksAuffrischen(); werkzeug();
    });
  }
  if (zug === 3){
    tisch.querySelectorAll('#bnansicht button').forEach(k => k.onclick = () => {
      if (k.disabled || k.dataset.w === z.z3.ansicht) return;
      z.z3.ansicht = k.dataset.w; merk(); rechts(); linksAuffrischen();
    });
  }
  [['bnzttext', 0, 'zt'], ['bnz1text', 1, 'z1'], ['bnz2text', 2, 'z2']].forEach(([id, nr, w]) => {
    if (zug !== nr) return;
    const t = document.getElementById(id);
    t.value = z[w].text;
    t.addEventListener('input', () => { z[w].text = t.value; if (nr <= 1) linksAuffrischen(); zugKnoepfe(); e2Fahne(); });
    t.addEventListener('change', merk);
  });

  /* Das Werkzeug fuer den Zug bzw. die Ansicht neu aufbauen */
  function rechts(){ reglerBauen(); untenBauen(); werkzeug(); }

  /* ── Zug 3: die Rechnung (aus FASSUNG 6) ── */
  function zug3Auffrischen(){
    const c = z.z3;
    tisch.querySelectorAll('.bn-z3 input').forEach(inp => {
      const w = inp.dataset.w, ok = BN_Z3_OK[w](c[w]);
      inp.classList.remove('ok', 'falsch');
      if (inp.value.trim()){
        if (ok) inp.classList.add('ok');
        else if (c.geprueft) inp.classList.add('falsch');
      }
      if (w === 'a' || w === 'b') return;
      const sp = inp.parentNode.querySelector('.wert'), v = bnRechne(c[w]);
      sp.textContent = bnIstAusdruck(c[w]) && !isNaN(v) ? '≈ ' + bnZ2(v) : '';
      if (!bnIstAusdruck(c[w]) && inp.value.trim() && ok) sp.textContent = BN.rechnung.zb + bnZ3Rechnung(w);
    });
    // «nur ganze Balken»: sobald die beiden Grenzen stimmen
    const grenzen = BN_Z3_OK.unten(c.unten) && BN_Z3_OK.oben(c.oben);
    const ganz = document.getElementById('bnganz');
    ganz.style.display = grenzen || offen ? '' : 'none';
    ganz.textContent = Z3.ganz.replace('{u}', bnZ2(BN_Z3.unten)).replace('{o}', bnZ2(BN_Z3.oben));
    // a und b: der typische Fehler ist gerundet statt «nur ganze Balken»
    const abw = document.getElementById('bnz3abwert'), a = B.leseGanz(c.a), b = B.leseGanz(c.b);
    abw.className = 'wert'; abw.textContent = '';
    if (grenzen && a === Math.floor(BN_Z3.unten)){ abw.textContent = `${a} liegt unter ${bnZ2(BN_Z3.unten)}, also nicht im Band.`; abw.classList.add('falsch'); }
    else if (grenzen && b === Math.ceil(BN_Z3.oben)){ abw.textContent = `${b} liegt über ${bnZ2(BN_Z3.oben)}, also nicht im Band.`; abw.classList.add('falsch'); }
    const fertig = bnZ3Rechnet(z) || offen;
    const vg = document.getElementById('bnvergleich');
    vg.style.display = fertig ? '' : 'none';
    vg.innerHTML = `<b>${bnEsc(Z3.vergleich_kopf)}</b><br>` + bnEsc(bnZ3Vergleich(z));
    sichtAuffrischen(); linksAuffrischen(); e2Fahne();
  }
  function sichtHtml(){
    const wb = BN_Z3S.wuerfel;
    return `<div class="box"><h4>${bnEsc(BN_S.sicht_knopf)}</h4>
      <ul>${BN_S.sicht.map(t => `<li>${bnEsc(t)}</li>`).join('')}</ul>
      <div class="zart">${bnEsc(BN_S.sicht_gemessen)}${['90', '95', '99'].map(S => `${S} % ab c = ${bnC(wb[S].c)}`).join(' · ')}</div></div>`;
  }
  function sichtAuffrischen(){
    const box = document.getElementById('bns2sicht');
    if (!box) return;
    if (z.sicht || offen){
      if (!box.querySelector('.box')) box.innerHTML = sichtHtml();
      return;
    }
    let kn = box.querySelector('button');
    if (!kn){
      box.innerHTML = `<button class="knopf" type="button">${bnEsc(BN_S.sicht_knopf)}</button> <span class="zart"></span>`;
      kn = box.querySelector('button');
      kn.onclick = () => { if (!bnZ3Fertig(z)) return; z.sicht = true; merk(); sichtAuffrischen(); e2Fahne(); };
    }
    const bereit = bnZ3Fertig(z);
    kn.disabled = !bereit;
    box.querySelector('.zart').textContent = bereit ? '' : BN_S.sicht_zart;
  }
  if (zug === 3){
    tisch.querySelectorAll('.bn-z3 input').forEach(inp => {
      inp.value = z.z3[inp.dataset.w];
      inp.addEventListener('focus', () => {
        // Wer rechnet, sieht rechts die Wuerfelbude mit dem Band.
        if (z.z3.ansicht !== 'abk'){ z.z3.ansicht = 'abk'; rechts(); linksAuffrischen(); }
      });
      inp.addEventListener('input', () => {
        const war = bnZ3Rechnet(z);
        inp.classList.remove('bn-luecke');
        z.z3[inp.dataset.w] = inp.value; zug3Auffrischen();
        document.getElementById('befund').textContent = '';
        if (war !== bnZ3Rechnet(z) && abkAnsicht()) werkzeug();
      });
      inp.addEventListener('change', merk);
      inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') pruefen(); });
    });
    const t = document.getElementById('bnz3text');
    t.value = z.z3.text;
    t.addEventListener('input', () => { z.z3.text = t.value; sichtAuffrischen(); zugKnoepfe(); e2Fahne(); });
    t.addEventListener('change', merk);
  }

  function zugKnoepfe(){
    document.querySelectorAll('.bn-zuege button').forEach(k => {
      const nr = Number(k.dataset.zug);
      k.classList.toggle('fertig', bnZugFertig(z, nr));
      const f = frei(nr);
      k.disabled = !f && nr !== zug;
      if (f) k.removeAttribute('title');
    });
  }

  function pruefen(){
    const b = document.getElementById('befund');
    // NEU (FASSUNG 8): In Zug 1 prueft «Prüfen» die aktive Aufgabe.
    if (zug === 0){ b.textContent = ''; ztPruefen(); return; }
    if (zug !== 3 || !(bnZ3Gefunden(z) || offen)){ b.textContent = 'Hier wird nichts geprüft.'; return; }
    z.z3.geprueft = true; merk(); zug3Auffrischen();
    // NEU (FASSUNG 9): leere Felder rot umrandet
    tisch.querySelectorAll('.bn-z3 input').forEach(i => i.classList.toggle('bn-luecke', !i.value.trim()));
    const da = Z3.felder.filter(f => String(z.z3[f.w]).trim()).length;
    const ok = Z3.felder.filter(f => BN_Z3_OK[f.w](z.z3[f.w])).length;
    b.textContent = !da ? 'Noch nichts eingetragen.' : `${ok} von ${Z3.felder.length} Feldern stimmen.`;
  }
  document.getElementById('pruefen').onclick = pruefen;

  /* Weiterfuehrung am Arbeitsort (wie Kapitel 5/6): «Weiter zu Zug 2 →»,
     «Weiter zu Zug 3 →», «Weiter zu Zug 4 →» (FASSUNG 8), «Eine mögliche
     Sicht →», dann «Mitnehmen →». */
  function e2Fahne(){
    if (offen) return bnFahne(null);
    const W = BN_W;
    if (z.sicht) return bnFahne({notiz: W.mitnehmenNotiz, knopf: W.mitnehmen,
      tun: () => { stand.etappe = ETAPPEN.length; los(); }});
    // GEAENDERT (FASSUNG 9): an jedem Uebergang das Fenster «Geschafft»
    const WG = BN.wegweiser;
    if (zug === 0 && bnZtFertig(z)) return bnFahne({notiz: W.e2zug2Notiz, knopf: W.e2zug2,
      tun: () => { z.zug = 1; bnFahne(null); neu(); }, fenster: WG.zt, schluessel: 'e2zt'});
    if (zug === 1 && bnZ1Fertig(z)) return bnFahne({notiz: W.e2zug3Notiz, knopf: W.e2zug3,
      tun: () => { z.zug = 2; bnFahne(null); neu(); }, fenster: WG.z1, schluessel: 'e2z1'});
    if (zug === 2 && bnZ2Fertig(z)) return bnFahne({notiz: W.e2zug4Notiz, knopf: W.e2zug4,
      tun: () => { z.zug = 3; bnFahne(null); neu(); }, fenster: WG.z2, schluessel: 'e2z2'});
    if (zug === 3 && bnZ3Fertig(z)) return bnFahne({notiz: W.e2sichtNotiz, knopf: W.e2sicht,
      tun: () => { const k = document.querySelector('#bns2sicht button'); if (k){ k.click(); k.scrollIntoView && document.getElementById('bns2sicht').scrollIntoView({block: 'nearest', behavior: 'smooth'}); } },
      fenster: WG.z3, schluessel: 'e2z3'});
    bnFahne(null);
  }

  // In der Kontrollfassung ist alles eingetragen und nur zum Ansehen; die
  // Regler bleiben beweglich (zum Ausprobieren, nichts wird gesichert).
  if (offen) tisch.querySelectorAll('textarea, .bn-z3 input').forEach(x => { x.disabled = true; });

  if (zug === 0) ztBox();
  rechts();
  linksAuffrischen();
  if (zug === 3) zug3Auffrischen();
  bnKarteHaken(2, null);
  bnJetztSatz(bnEsc(BN_S.jetzt[String(zug + 1)]));
  zugKnoepfe(); e2Fahne();
  bnAuftragBeimOeffnen(2);

  document.getElementById('zurueckE1').onclick = () => { stand.etappe = 0; los(); };
  document.getElementById('weiter').onclick = () => { stand.etappe = ETAPPEN.length; los(); };
  loesungsKnopf(() => etappe2());
  if (stand.loesungOffen && window.KASPER_RUECKMELDUNG){
    const p = document.createElement('div');
    p.id = 'loesungpanel'; p.className = 'loesungpanel';
    p.innerHTML = bnLoesungE2();
    document.querySelector('#buehne .buehne').insertAdjacentElement('afterend', p);
  }
}

/* NEU (FASSUNG 8): «ausgetestet» ist der eigene Befund der Wuerfelbude aus
   Zug 1; fehlt er, steht die Loesung da, so beschriftet. */
function bnZ3Vergleich(z){
  const eigen = bnZtWuerfel(z), Z3 = BN_S.z3;
  return bnFuell(eigen ? Z3.vergleich : Z3.vergleich_ohne,
    {ta: eigen ? eigen.a : BN_Z3.test_a, tb: eigen ? eigen.b : BN_Z3.test_b, a: BN_Z3.a, b: BN_Z3.b});
}

/* Die Kontrollfassung: alles eingetragen, wie es die Loesung verlangt -
   die Sollwerte aus inhalte.abkuerzung() als Zeilen, vernuenftige
   Schaetzungen und Antworten aus thema.SIG. */
function bnLoesungE2Stand(){
  const s = bnStand(), alt = bnSigStand(s);
  const rows2 = {};
  BN_CS.forEach(c => { rows2[c] = BN_Z2S.beispiele.map(e => ({n: e.n, pt: e.p, pw: e.pw})); });
  const est = {};
  BN_CS.forEach(c => { est[c] = {t: BN_S.z2.loesung_schaetzung[String(c)], auf: true}; });
  const m3 = {};
  BN_Z3S.sicherheiten.forEach(S => { m3[S] = {etwa: BN_S.z3.loesung_etwa[String(S)], auf: true, n: 600, pt: '1/6', pw: 1 / 6}; });
  const z3 = {ansicht: alt.z3.ansicht, n: alt.z3.n, p: alt.z3.p, c: alt.z3.c, m: m3, text: BN_S.z3.loesung, geprueft: false};
  BN_S.z3.felder.forEach(f => {
    z3[f.w] = {mu: String(BN_Z3.mu), s: `√(${BN_Z3.n} · ${BN_Z3.p} · ${BN_Z3.q})`,
               unten: `${BN_Z3.mu} − 2 · ${bnZ2(BN_Z3.s)}`, oben: `${BN_Z3.mu} + 2 · ${bnZ2(BN_Z3.s)}`,
               a: String(BN_Z3.a), b: String(BN_Z3.b)}[f.w];
  });
  // NEU (FASSUNG 8): Zug 1 mit den Loesungen und einigen Versuchen (vom
  // Startwert an herangetastet, inhalte.austesten()["beispiel"])
  const zt = {auf: alt.zt.auf, r: {}, v: {}, antw: {}, text: BN_ZT.loesung};
  BN_ZTS.aufgaben.forEach(A => {
    zt.r[A.id] = Object.assign({}, alt.zt.r[A.id], {p: Object.assign({}, alt.zt.r[A.id].p)});
    zt.v[A.id] = A.beispiel.map(b => {
      const x = {n: b.n, pt: b.p.t, pw: b.p.w, form: b.form};
      if (b.form === 'bereich'){ x.a = b.a; x.b = b.b; } else x.k = b.k;
      return x;
    });
    zt.antw[A.id] = A.art === 'bereich' ? {t: '', a: String(A.loesung[0]), b: String(A.loesung[1]), g: true}
      : {t: String(A.loesung), a: '', b: '', g: true};
  });
  const sig = {v: BN_SV, zug: alt.zug, sicht: true, ohneZt: false, zt,
    z1: {n: alt.z1.n, rows: BN_Z1S.soll.map(d => ({n: d.n})), text: BN_S.z1.loesung},
    z2: {n: alt.z2.n, p: alt.z2.p, c: alt.z2.c, est, rows: rows2, text: BN_S.z2.loesung},
    z3};
  return {bn: Object.assign({}, s, {sig})};
}

function bnLoesungE2(){
  const z3 = BN_Z3, wb = BN_Z3S.wuerfel;
  return '<h4>Etappe 2 · ' + bnEsc(D.etappen[1].name) + '</h4>'
    + '<div class="zeile matt">Regel für jedes Band: Es zählen die ganzen Trefferzahlen im Band, a = ⌈links⌉, b = ⌊rechts⌋. '
    + `Bei «Umgekehrt gefragt» passt «etwa ___», wenn es höchstens ${BN_S.toleranz_c} neben dem c liegt, ab dem P die Sicherheit bei den eingestellten n und p erreicht.</div>`
    // NEU (FASSUNG 8): Zug 1 «Austesten»
    + '<div class="zeile"><b>Austesten</b> je der kleinste Wert, bei dem P die Sicherheit erreicht: '
    + BN_ZTS.aufgaben.map(A => `${bnEsc(BN_KARTE[A.id].kurz)} ${bnEsc(A.loesung_t)}, ${bnEsc(A.ereignis)} = ${A.Pt}`
      + ` (${A.nachbarn.map(e => `${bnEsc(e.wt)}: ${e.Pt}`).join(', ')})`).join(' · ')
    + '. Der Rechner beginnt bei ' + BN_ZTS.aufgaben.map(A => `B(${A.start.n}; ${bnEsc(A.start.p.t)}), ${bnEsc(bnZtForm(A.start))}`).join(' · ')
    + '. Das Austesten ist fertig, wenn alle vier Antworten stimmen und «Was war mühsam?» beantwortet ist.</div>'
    + '<div class="zeile"><b>Ein festes Band?</b> Bens Band μ ± 10, p = 1/6: '
    + BN_Z1S.soll.map(d => `n = ${d.n}: [${d.a}; ${d.b}] ${bnP1(d.P)}`).join(' · ') + '</div>'
    + '<div class="zeile"><b>Das Band in σ</b> P im Band μ ± 1σ / 2σ / 3σ (Schätzungen werden nicht geprüft): '
    + BN_Z2S.beispiele.map(e => `${e.n}, ${bnEsc(e.p)}: ${BN_CS.map(c => bnP1(e['c' + c].P)).join(' / ')}`).join(' · ') + '</div>'
    + '<div class="zeile"><b>Umgekehrt gefragt</b> Würfelbude (600, 1/6): '
    + ['95', '90', '99'].map(S => `${S} % ab c = ${bnC(wb[S].c)} [${wb[S].a}; ${wb[S].b}]`).join(' · ')
    + '. Andere: ' + BN_Z3S.andere.map(d => `${d.n}, ${bnEsc(d.p)}: ${['95', '90', '99'].map(S => bnC(d.c[S])).join(' / ')}`).join(' · ')
    + `. Abkürzung: μ = ${z3.mu}, σ = √(600 · 1/6 · 5/6) ≈ ${bnZ2(z3.s)}, μ − 2σ ≈ ${bnZ2(z3.unten)}, `
    + `μ + 2σ ≈ ${bnZ2(z3.oben)}, nur ganze Balken: [${z3.a}; ${z3.b}], P = ${bnP1(z3.P)}. `
    + `Ausgetestet beim Austesten: [${z3.test_a}; ${z3.test_b}].</div>`
    + `<div class="zeile">${BN_S.sicht.map(bnEsc).join(' ')}</div>`;
}

/* ───────── Die Bilder zum Mitnehmen ─────────
   Sauber, aus dem Stand gezeichnet, wie Kapitel 6
   (zufallsgroessen/etappen.js). Fassung 3:
     1  die Sortierung: je Fach die Karten in einer Zeile mit Ihren
        Eintraegen und Ihr Text darunter;
     2  die Tabelle (Ihre Eintraege, die letzte Spalte, wo sie steht),
        Ihre Antwort, Ihre Faktoren und EIN Bild: das der aktuellen
        Zeile. */
const BN_BILD = {papier: '#f8f4ec', tinte: '#2d2924', matt: '#6c6357', linie: '#d8cdb8',
                 akzent: '#a9652a', gruen: '#2E7D32'};
const BN_BILD_SCHRIFT = "'Fira Sans', 'Segoe UI', sans-serif";

function bnLeinwand(w, h){
  const c = document.createElement('canvas'), f = 2;
  c.width = Math.ceil(w * f); c.height = Math.ceil(h * f);
  const g = c.getContext('2d'); g.scale(f, f);
  g.fillStyle = BN_BILD.papier; g.fillRect(0, 0, w, h);
  return {c, g};
}
function bnUmbrechen(g, text, breit, gross, fett){
  g.font = `${fett ? '600 ' : ''}${gross}px ${BN_BILD_SCHRIFT}`;
  const zeilen = [];
  String(text || '').split(/\n/).forEach(ab => {
    let z = '';
    ab.split(/\s+/).forEach(w => {
      const p = z ? z + ' ' + w : w;
      if (g.measureText(p).width > breit && z){ zeilen.push(z); z = w; } else z = p;
    });
    zeilen.push(z);
  });
  return zeilen;
}
/* Zeilen sammeln, dann in einem Zug zeichnen: {s, gross, farbe, fett, x},
   {spalten: [{s, x, rechts, fett, farbe}], gross} oder
   {bild: Promise<Image>, h}. */
function bnBildBauen(titel, zeilen, B){
  const R = 26;
  const hoehe = z => z.bild ? z.h + 8 : (z.s === '' && !z.spalten ? 10 : z.gross * 1.5);
  const h = R + 42 + zeilen.reduce((a, z) => a + hoehe(z), 0) + R;
  const {c, g} = bnLeinwand(B, h);
  g.textBaseline = 'middle';
  g.font = `600 22px ${BN_BILD_SCHRIFT}`; g.fillStyle = BN_BILD.akzent; g.fillText(titel, R, R + 10);
  let y = R + 42;
  const warte = [];
  zeilen.forEach(z => {
    if (z.bild){
      const yy = y;
      warte.push(z.bild.then(im => { if (im) g.drawImage(im, R, yy, z.w, z.h); }));
    } else if (z.spalten){
      z.spalten.forEach(sp => {
        g.font = `${sp.fett || z.fett ? '600 ' : ''}${z.gross}px ${BN_BILD_SCHRIFT}`;
        g.fillStyle = sp.farbe || z.farbe || BN_BILD.tinte;
        g.textAlign = sp.rechts ? 'right' : 'left';
        g.fillText(sp.s, R + sp.x, y + hoehe(z) / 2);
      });
      g.textAlign = 'left';
    } else if (z.s){
      g.font = `${z.fett ? '600 ' : ''}${z.gross}px ${BN_BILD_SCHRIFT}`;
      g.fillStyle = z.farbe || BN_BILD.tinte;
      g.fillText(z.s, R + (z.x || 0), y + hoehe(z) / 2);
    }
    y += hoehe(z);
  });
  return Promise.all(warte).then(() => c);
}
const bnKlartext = html => { const d = document.createElement('div'); d.innerHTML = html; return d.textContent; };

function bnBildE1(){
  const s = bnStand();
  const lage = {};
  BN.karten.forEach(k => {
    const st = stand.karten && stand.karten[k.id];
    if (st && st.ort && st.ort !== 'tisch') (lage[st.ort] = lage[st.ort] || []).push(k);
  });
  const etwas = Object.keys(lage).length || s.gruppen.some(g => String(g.weg || '').trim() || String(g.name || '').trim());
  if (!etwas) return null;
  const B = 900, meng = document.createElement('canvas').getContext('2d');
  const zeilen = [], zeile = (t, o) => zeilen.push(Object.assign({s: t, gross: 14}, o || {}));
  s.gruppen.forEach((g, i) => {
    const ks = lage['g' + i] || [];
    if (!ks.length && !String(g.weg || '').trim() && !String(g.name || '').trim()) return;
    zeile(String(g.name || '').trim() || `Gruppe ${i + 1} (ohne Namen)`, {gross: 16.5, fett: true, farbe: BN_BILD.akzent});
    if (!ks.length) zeile('(keine Karte)', {farbe: BN_BILD.matt, x: 14});
    ks.forEach(k => bnUmbrechen(meng, `${k.kurz}  ·  ${bnKlartext(bnFelderKurz(bnFelder(k.id), k))}`, B - 80, 13.5)
      .forEach((t, i) => zeile(t, {gross: 13.5, x: i ? 28 : 14})));
    const text = String(g.weg || '').trim();
    if (text){
      zeile(BN.schreibfrage, {gross: 13, farbe: BN_BILD.matt, x: 14});
      bnUmbrechen(meng, text, B - 80, 14).forEach(t => zeile(t, {x: 28}));
    }
    zeile('');
  });
  return bnBildBauen('Etappe 1 · ' + D.etappen[0].name, zeilen, B);
}

/* Ein SVG der Seite als Bild: Die Klassen (.achse, .gitter, .zahl) gelten
   ausserhalb der Seite nicht, also kommt ein eigener Stil mit. */
function bnSvgBild(svg, w, ohneStil){
  const vb = (svg.getAttribute('viewBox') || '0 0 820 210').split(/\s+/).map(Number);
  const k = svg.cloneNode(true);
  k.setAttribute('xmlns', BINOM.SVGNS);
  k.setAttribute('width', vb[2]); k.setAttribute('height', vb[3]);
  const st = document.createElementNS(BINOM.SVGNS, 'style');
  st.textContent = `text{font-family:${BN_BILD_SCHRIFT};font-size:12px;fill:${BN_BILD.tinte}}
    .zahl{fill:${BN_BILD.matt};font-size:11px} .achse{stroke:${BN_BILD.matt};stroke-width:1}
    .gitter{stroke:#e4d9c7;stroke-width:1}`;
  // Das Bild von Etappe 2 traegt alle Angaben als Attribute; ein
  // Stil «text{font-size}» wuerde sie ueberschreiben.
  if (!ohneStil) k.insertBefore(st, k.firstChild);
  const src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(k));
  return {h: w * vb[3] / vb[2], bild: new Promise(fertig => {
    const im = new Image();
    im.onload = () => fertig(im); im.onerror = () => fertig(null); im.src = src;
  })};
}

/* GEAENDERT (FASSUNG 7): Etappe 2 «Gibt es eine Abkürzung fürs
   Austesten?» - je Zug, was eingetragen ist (FASSUNG 8: zuerst Zug 1
   «Austesten», je Aufgabe Antwort und Versuche; die Nummern unten sind die
   von FASSUNG 7): die Tabelle zu Bens Band
   (Zug 1), je c die Schaetzung und die notierten Paare (Zug 2, dazu EIN
   Bild: das Werkzeug, wie es zuletzt stand), die gefundenen c und die
   Rechnung der Abkuerzung (Zug 3), die Antworten und (falls offen) die
   Sicht. */
function bnBildE2(){
  const z = bnSigStand(bnStand());
  const zt = z.zt;
  const ztEtwas = BN_ZTS.reihe.some(id => zt.v[id].length || zt.antw[id].g) || String(zt.text || '').trim();
  const etwas = ztEtwas || z.z1.rows.length || BN_CS.some(c => z.z2.est[c].auf || z.z2.rows[c].length)
    || BN_Z3S.sicherheiten.some(S => z.z3.m[S].auf) || [z.z1.text, z.z2.text, z.z3.text].some(t => String(t || '').trim())
    || BN_S.z3.felder.some(f => String(z.z3[f.w] || '').trim());
  if (!etwas) return null;
  const B = 900, meng = document.createElement('canvas').getContext('2d');
  const zeilen = [], zeile = (t, o) => zeilen.push(Object.assign({s: t, gross: 14}, o || {}));
  const antwort = (frage, text) => {
    const t = String(text || '').trim();
    zeile(frage, {fett: true});
    bnUmbrechen(meng, t || '…', B - 80, 14).forEach(x => zeile(x, {x: 18, farbe: t ? BN_BILD.tinte : BN_BILD.matt}));
  };
  const kopf = (spalten, X) => zeilen.push({gross: 13, farbe: BN_BILD.matt, spalten: spalten.map((s, i) => ({s, x: X[i]}))});
  const reihe = (spalten, X, farbe) => zeilen.push({gross: 13.5, spalten: spalten.map((s, i) => ({s, x: X[i], farbe: s === '…' ? BN_BILD.matt : farbe}))});
  const Z1 = BN_S.z1, Z2 = BN_S.z2, Z3 = BN_S.z3, ZT = BN_ZT;
  // NEU (FASSUNG 8): Zug 1 «Austesten» - je Aufgabe die Antwort und die Versuche
  zeile(BN_S.zuege['1'], {gross: 15.5, fett: true, farbe: BN_BILD.akzent});
  BN_ZTS.aufgaben.forEach((A, i) => {
    const x = zt.antw[A.id], u = x.g ? bnZtUrteil(A, x) : null, ok = !!(u && u.ok);
    const antw = A.art === 'bereich' ? (x.a.trim() || x.b.trim() ? `[${x.a.trim() || '…'}; ${x.b.trim() || '…'}]` : '…') : (x.t.trim() || '…');
    zeile(`${i + 1} · ${BN_KARTE[A.id].kurz}`, {fett: true, gross: 13.5});
    zeile(`${ZT.antwort[A.art]} ${antw}${ok ? '   ✓' : ''}`, {x: 18, farbe: ok ? BN_BILD.gruen : antw === '…' ? BN_BILD.matt : BN_BILD.tinte});
    const V = zt.v[A.id], zi = bnZtZiel(A);
    if (V.length) bnUmbrechen(meng, `${ZT.versuche}: ` + V.map(v => `B(${v.n}; ${v.pt}) ${bnZtForm(v)}: ${BINOM.prozent(bnZtP(Object.assign({}, v, {p: {w: v.pw}})), zi)}`).join(' · '), B - 90, 13)
      .forEach((t, j) => zeile(t, {gross: 13, x: j ? 30 : 18, farbe: BN_BILD.matt}));
  });
  antwort(ZT.frage, zt.text);
  zeile('');
  // Zug 2 (bis FASSUNG 7 Zug 1)
  zeile(BN_S.zuege['2'], {gross: 15.5, fett: true, farbe: BN_BILD.akzent});
  zeile(Z1.ben + ', p = 1/6', {gross: 13.5});
  const X1 = [18, 140, 300];
  kopf([Z1.tab_n, Z1.tab_band, Z1.tab_P], X1);
  if (!z.z1.rows.length) reihe(['…', '…', '…'], X1);
  z.z1.rows.forEach(r => {
    const Bd = bnFestBand(r.n, BN_Z1S.pw, BN_Z1S.h);
    reihe([String(r.n), `[${Bd.a}; ${Bd.b}]`, bnP1(Bd.P)], X1);
  });
  antwort(Z1.frage, z.z1.text);
  zeile('');
  // Zug 3 (bis FASSUNG 7 Zug 2)
  zeile(BN_S.zuege['3'], {gross: 15.5, fett: true, farbe: BN_BILD.akzent});
  const X2 = [18, 120, 220, 320];
  BN_CS.forEach(c => {
    const est = z.z2.est[c];
    if (!est.auf && !z.z2.rows[c].length) return;
    zeile(`Band μ ± ${c}σ · ${bnFuell(Z2.ihre, {t: est.t.trim() || '…'})}`, {fett: true, gross: 13.5});
    kopf([Z2.tab_n, Z2.tab_p, Z2.tab_s, Z2.tab_P], X2);
    z.z2.rows[c].forEach(r => {
      const Bd = bnSigBand(r.n, r.pw, c);
      reihe([String(r.n), r.pt, bnZ2(Bd.s), bnP1(Bd.P)], X2);
    });
  });
  if (BN_CS.some(c => z.z2.rows[c].length)){
    const w = z.z2, svg = document.createElementNS(BINOM.SVGNS, 'svg'), cs = w.c + 'σ';
    bnBandBild(svg, {n: w.n, pw: w.p.w, band: bnSigBand(w.n, w.p.w, w.c), lt: `μ − ${cs}`, rt: `μ + ${cs}`,
      zeigeP: w.est[w.c].auf, stab: w.c, legende: `n = ${w.n}, p = ${w.p.t} · ` + Z2.legende});
    const b = bnSvgBild(svg, 620, true);
    zeilen.push({bild: b.bild, h: b.h, w: 620});
  }
  antwort(Z2.frage, z.z2.text);
  zeile('');
  // Zug 4 (bis FASSUNG 7 Zug 3)
  zeile(BN_S.zuege['4'], {gross: 15.5, fett: true, farbe: BN_BILD.akzent});
  const X3 = [18, 160, 300];
  kopf([Z3.tab_S, Z3.tab_ihr, Z3.tab_genau], X3);
  BN_Z3S.sicherheiten.forEach(S => {
    const x = z.z3.m[S];
    if (!x.auf){ reihe([`${S} %`, '…', '…'], X3); return; }
    const u = bnCUrteil(x, S);
    reihe([`${S} %`, String(x.etwa).trim(), u.ab ? `${bnC(u.ab.c)}  (n = ${x.n}, p = ${x.pt})` : '–'], X3);
  });
  zeile(Z3.abk_kopf, {fett: true});
  Z3.felder.filter(f => f.w !== 'a' && f.w !== 'b').forEach(f => {
    const roh = String(z.z3[f.w] || '').trim(), v = bnRechne(roh), ok = BN_Z3_OK[f.w](roh);
    zeile(`${f.name} = ${roh || '…'}${roh && bnIstAusdruck(roh) && !isNaN(v) ? '  ≈ ' + bnZ2(v) : ''}${ok ? '   ✓' : ''}`,
      {x: 18, farbe: ok ? BN_BILD.gruen : roh ? BN_BILD.tinte : BN_BILD.matt});
  });
  const ab = bnZ3Rechnet(z);
  zeile(`${Z3.bereich} [${String(z.z3.a || '').trim() || '…'}; ${String(z.z3.b || '').trim() || '…'}]${ab ? '   ✓' : ''}`,
    {x: 18, farbe: ab ? BN_BILD.gruen : BN_BILD.tinte});
  if (ab) zeile(bnZ3Vergleich(z), {x: 18});
  antwort(Z3.frage, z.z3.text);
  if (z.sicht){
    zeile('');
    zeile(BN_S.sicht_knopf, {gross: 15.5, fett: true, farbe: BN_BILD.akzent});
    BN_S.sicht.forEach(t => bnUmbrechen(meng, '· ' + t, B - 80, 14).forEach((x, i) => zeile(x, {x: i ? 30 : 18})));
  }
  return bnBildBauen('Etappe 2 · ' + D.etappen[1].name, zeilen, B);
}
if (typeof mitnehmen === 'function'){
  const _bnMitnehmenKern = mitnehmen;
  // eslint-disable-next-line no-global-assign
  mitnehmen = function(){
    try {
      const b1 = bnBildE1(); if (b1) mitbringsel[1] = b1; else delete mitbringsel[1];
      const b2 = bnBildE2(); if (b2) mitbringsel[2] = b2; else delete mitbringsel[2];
    } catch (fehler){ console.error('Kapitel 7: Bild zum Mitnehmen', fehler); }
    _bnMitnehmenKern();
    const kasten = document.querySelector('.start.mitnehmen');
    if (!kasten) return;
    const h2 = kasten.querySelector('h2'), lage = kasten.querySelector('p.lage');
    if (h2) h2.textContent = 'Nehmen Sie Ihre Ergebnisse mit';
    if (lage){
      const t = [];
      if (mitbringsel[1]) t.push('Etappe 1: Ihre Sortierung, mit Ihren Einträgen und Texten.');
      // GEAENDERT (FASSUNG 7, FASSUNG 8: mit Zug 1 «Austesten»)
      if (mitbringsel[2]) t.push('Etappe 2: Ihre Antworten und Versuche aus dem Austesten, Ihre Tabellen zu Bens Band und zum Band in σ, Ihre Schätzungen, die gefundenen c, Ihre Rechnung zur Abkürzung und Ihre Antworten.');
      t.push('Für Ihre Notizen als PDF.');
      lage.textContent = t.join(' ');
    }
  };
}

// Fenstergroesse: Etappe 1 rechnet ihr Raster aus der Breite.
window.addEventListener('resize', () => {
  if (stand.etappe === 0 && stand.aufnahme !== null && window._neuzeichnen && document.querySelector('.bn-fach'))
    window._neuzeichnen();
});

ETAPPEN.push(etappe1, etappe2);
