/* Leseleiste fuer die Reflexionen (Strategiewerkstatt Teil B).

   NEU (gemeinsam entschieden, Rike 2026-10-29): Die Reflexionen 5-8
   bekommen den Aufbau der neuen SORT-Tische - Kopf in der Kapitelfarbe,
   links eine Leiste mit Situation und Fuehrung, rechts die Arbeit ueber
   die volle Hoehe. VORSCHLAG_werkstatt_b_leseleiste.md.

   Nur eingebunden, wenn ein Thema `daten["leiste"]` setzt (siehe
   kern/flaechen/flaeche/__init__.py). Kapitel 1-4 sehen diese Datei nie.
   kern/tisch/ (SORT) ist NICHT die Vorlage im Code, nur in der
   Gestaltung: Die beiden Welten teilen keinen Code.

   Wie es wirkt: buehne() und buehneOben() aus flaeche.js werden
   umhuellt. Nach dem Zeichnen wandert alles, was ein Kapitel zwischen
   Auftragszeile und Brett legt (`extra`, etwa die Situationskarte), in
   die Leiste links. Die Kapitel fuellen diese Elemente oft erst nach
   buehne() - die Elemente sind dann schon umgezogen, ihre ids bleiben.
   Was ein Kapitel ausdruecklich in der Leiste haben will, legt es mit
   leisteLegen(el) dorthin. */
(function(){
  // D steht als const im Geruest, also nicht an window.
  if (typeof D === 'undefined' || !D.leiste) return;
  document.body.classList.add('ws-leiste');
  // NEU (Rike 2026-10-29, Rueckmeldung zu Kap 5): «diese Informationen
  // eher oben hinzumachen. Dann haetten wir mehr Platz.» Mit
  // daten["leiste"] = "oben" steht die Leiste als Band ueber der Arbeit,
  // die Arbeit bekommt die ganze Breite. `true` bleibt die Spalte links.
  if (D.leiste === 'oben') document.body.classList.add('ws-oben');

  /* Der Kopf in einem dunklen Ton der Kapitelfarbe (Rike: «oben der
     Kopf, den wir sonst in Braun haben, in der Kapitelfarbe»). Aus
     --akzent gerechnet statt mit color-mix(), das aeltere Safari nicht
     kennen. */
  function dunkel(hex, f){
    const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m) return '#333';
    const n = parseInt(m[1], 16);
    const k = v => Math.round(v * f).toString(16).padStart(2, '0');
    return '#' + k(n >> 16 & 255) + k(n >> 8 & 255) + k(n & 255);
  }
  function farbeSetzen(){
    const a = getComputedStyle(document.body).getPropertyValue('--akzent');
    document.documentElement.style.setProperty('--wskopf', dunkel(a, .62));
  }

  // Ob die Leiste zu ist, gilt fuer die Sitzung und alle Etappen.
  let zu = false;
  function neuEinpassen(){
    if (window._neuzeichnen) window._neuzeichnen();
    window.dispatchEvent(new Event('resize'));
  }
  function zuSetzen(z){
    zu = z;
    document.body.classList.toggle('ws-leiste-zu', z);
    neuEinpassen();
  }

  function leisteFuellen(leiste){
    // Leer (die Etappe legt nichts hinein): ganz weg, die Arbeit nimmt
    // die Breite.
    const leer = ![...leiste.children].some(c => !c.classList.contains('wsgriff')
                                            && c.textContent.trim());
    const rumpf = leiste.parentNode;
    if (rumpf.classList.contains('ohne') === leer) return;
    rumpf.classList.toggle('ohne', leer);
    // Die Breite der Arbeit hat sich geaendert: Die Kapitel rechnen ihre
    // Bretter aus der Breite und muessen neu einpassen. Erst im naechsten
    // Bild, sonst laeuft das Neuzeichnen mitten in den Aufbau der Etappe.
    requestAnimationFrame(neuEinpassen);
  }

  /* ── Kopf: «Auftrag» immer ganz rechts ──
     NEU (Rike 2026-10-29, «Ja, so einbauen»; Vorschlag Abschnitt 9). Die
     Kapitel legen ihren Knopf an verschiedene Orte (Karte, Kopf, beides).
     Steht er schon im Kopf, rueckt er ans Ende. Sonst bekommt der Kopf
     einen Stellvertreter, der den Knopf des Kapitels drueckt; die Knoepfe
     in der Leiste blendet leiste.css aus. Die Kapitel bleiben, wie sie
     sind: Ihr Knopf traegt weiter die Wirkung. */
  function kopfAuftrag(){
    const a = document.querySelector('#buehne > .auftrag');
    if (!a) return;
    const eigen = [...a.querySelectorAll('[class*=auftragknopf]')].find(x => !x.classList.contains('wsauftrag'));
    if (eigen){
      a.querySelectorAll('.wsauftrag.ersatz').forEach(x => x.remove());
      eigen.classList.add('wsauftrag');
      if (a.lastElementChild !== eigen) a.appendChild(eigen);
      return;
    }
    const quelle = document.querySelector('#wsleiste [class*=auftragknopf]');
    let k = a.querySelector('.wsauftrag.ersatz');
    if (!quelle){ if (k) k.remove(); return; }
    if (!k){
      k = document.createElement('button');
      k.type = 'button';
      k.className = 'wsauftrag ersatz';
      k.textContent = 'Auftrag';
      k.title = 'Den Auftrag dieser Etappe noch einmal zeigen';
      a.appendChild(k);
    }
    k.onclick = ev => {
      ev.stopPropagation();
      const q = document.querySelector('#wsleiste [class*=auftragknopf]');
      if (q) q.click();
    };
  }

  /* ── Leiste: «Jetzt» ──
     Was die Kapitel als Satz in die Etappenzeile schreiben (was in
     diesem Zug zu tun ist), steht in der Leiste unter «Jetzt». Dorthin
     kommen auch die Hilfeknoepfe aus der Fusszeile. */
  function jetztBlock(){
    const l = document.getElementById('wsleiste');
    if (!l) return null;
    let j = l.querySelector(':scope > .wsjetzt');
    if (!j){
      j = document.createElement('div');
      j.className = 'wsjetzt';
      j.innerHTML = '<div class="wskopfzeile">Jetzt</div>';
      l.appendChild(j);
    }
    return j;
  }
  function jetztSammeln(){
    const t = document.querySelector('#buehne > .auftrag > .text');
    if (t && t.textContent.trim()){
      const j = jetztBlock();
      if (j){
        const p = document.createElement('div');
        p.className = 'wsjetzttext';
        while (t.firstChild) p.appendChild(t.firstChild);
        j.insertBefore(p, j.children[1] || null);
      }
    }
  }

  /* ── Fusszeile: hoechstens Zurueck, Pruefen, Weiter und «⋯» ──
     Alles Uebrige wandert in das Menue: Bild sichern, Neu, Kartengroesse,
     Loesung anzeigen. Die Kapitel fuegen Knoepfe auch nach buehne() an
     (loesungsKnopf); ein Beobachter raeumt sie dann nach. Die Knoepfe
     behalten ihre ids und ihre Wirkung, sie stehen nur woanders. */
  const IN_MENUE = b =>
    b.classList.contains('groesse') || b.classList.contains('loesungknopf')
    || /^(Stand als Bild sichern|[↺\s]*Neu|Alles neu|Von vorn)$/.test(b.textContent.trim())
    // NEU (Rike 2026-10-29, Vorschlag Abschnitt 17 D): auch «Eintrag zurueck»
    || /^[↶\s]*Eintrag zurück$/.test(b.textContent.trim())
    // und ein Knopf nur aus «↺» (Kap 8: alle Karten zurueck)
    || /^↺$/.test(b.textContent.trim());
  const HILFE = b => b.tagName === 'BUTTON' && /^Hilfe\b/.test(b.textContent.trim());
  const WEITER = b => b.tagName === 'BUTTON' && (/^(weiter|bwweiter)$/.test(b.id)
    || (/→\s*$/.test(b.textContent) && !/^\s*←/.test(b.textContent)));
  const PRUEFEN = b => b.tagName === 'BUTTON' && (b.id === 'pruefen' || /^Prüfen$/.test(b.textContent.trim()));

  function menueBauen(fuss){
    let m = fuss.querySelector(':scope > .wsmenue');
    if (m) return m;
    m = document.createElement('div');
    m.className = 'wsmenue';
    m.innerHTML = '<button type="button" class="knopf leer wsmehr" aria-expanded="false" title="Weitere Knöpfe">⋯</button>'
      + '<div class="wsmliste" hidden></div>';
    const kn = m.firstChild, liste = m.lastChild;
    const setzen = auf => { liste.hidden = !auf; kn.setAttribute('aria-expanded', String(auf)); };
    kn.onclick = ev => { ev.stopPropagation(); setzen(liste.hidden); };
    document.addEventListener('click', ev => { if (!m.contains(ev.target)) setzen(false); });
    // Ein Knopf im Menue schliesst es (der Regler nicht).
    liste.addEventListener('click', ev => { if (ev.target.closest('button') && !ev.target.closest('.groesse')) setzen(false); });
    fuss.appendChild(m);
    return m;
  }
  function fussOrdnen(fuss){
    const m = menueBauen(fuss), liste = m.querySelector('.wsmliste');
    [...fuss.children].forEach(c => {
      if (c === m) return;
      if (IN_MENUE(c)){
        if (c.classList.contains('groesse') && !c.querySelector('.wsbeschr'))
          c.insertAdjacentHTML('afterbegin', '<span class="wsbeschr">Kartengrösse</span>');
        liste.appendChild(c);
      }
      else if (HILFE(c)){ const j = jetztBlock(); if (j) j.appendChild(c); }
      else if (WEITER(c)) c.classList.add('wsweiter');
      else if (PRUEFEN(c)) c.classList.add('wspruefen');
    });
    m.hidden = !liste.children.length;
    // Die rechte Gruppe (Pruefen, Weiter, «⋯») rueckt nach rechts. Der
    // Befund dazwischen ist leer oft ausgeblendet und schiebt nicht.
    fuss.querySelectorAll(':scope > .wsrechts').forEach(x => x.classList.remove('wsrechts'));
    const erster = fuss.querySelector(':scope > .wspruefen') || fuss.querySelector(':scope > .wsweiter') || m;
    erster.classList.add('wsrechts');
  }

  function umbauen(){
    farbeSetzen();
    const b = document.getElementById('buehne');
    const auftrag = b.querySelector(':scope > .auftrag');
    const brett = b.querySelector(':scope > .buehne');
    const fuss = b.querySelector(':scope > .leiste');
    if (!brett) return;
    const extra = [...b.children].filter(c => c !== auftrag && c !== brett && c !== fuss);
    // NEU (Rike 2026-10-30, Vorschlag Abschnitt 17 D): Mit dem Band oben
    // keine Marke «Pflicht»; «freiwillig» bleibt, das sagt etwas.
    const rang = auftrag && auftrag.querySelector(':scope > .rang');
    if (rang && D.leiste === 'oben' && /^\s*pflicht\s*$/i.test(rang.textContent)) rang.hidden = true;
    const rumpf = document.createElement('div');
    rumpf.className = 'wsrumpf';
    const leiste = document.createElement('aside');
    leiste.className = 'wsleiste';
    leiste.id = 'wsleiste';
    leiste.setAttribute('aria-label', 'Situation und Führung');
    const griff = document.createElement('button');
    griff.type = 'button';
    griff.className = 'wsgriff';
    griff.title = 'Leiste ein- oder ausklappen';
    griff.innerHTML = D.leiste === 'oben'
      // GEAENDERT (Vorschlag Abschnitt 17 D): offen nur ein Pfeil
      ? '<span class="zu" aria-label="Band einklappen">▴</span><span class="auf">▾ Situation zeigen</span>'
      : '<span class="zu">‹ Leiste</span><span class="auf">Leiste ›</span>';
    griff.onclick = () => zuSetzen(!zu);
    leiste.appendChild(griff);
    extra.forEach(e => leiste.appendChild(e));
    b.insertBefore(rumpf, brett);
    rumpf.appendChild(leiste);
    rumpf.appendChild(brett);
    // Der Loesungstext (loesungsHinweis in flaeche.js) setzt sich hinter
    // die Buehne - im Rumpf waere er eine dritte Spalte und drueckte die
    // Arbeit zusammen. Er gehoert unter den Rumpf, wie bisher unter die
    // Buehne.
    new MutationObserver(() => {
      rumpf.querySelectorAll(':scope > .loesungpanel').forEach(x => rumpf.after(x));
    }).observe(rumpf, {childList: true});
    if (fuss){
      fussOrdnen(fuss);
      new MutationObserver(() => fussOrdnen(fuss)).observe(fuss, {childList: true});
    }
    // Die Kapitel fuellen ihre Teile nach buehne(); erst danach weiss
    // man, ob die Leiste etwas traegt. Bis dahin gilt sie als belegt -
    // der Regelfall; so zeichnet das Brett gleich in der richtigen Breite.
    // NEU (Rike 2026-10-29): Ein Kapitel darf die Teile in der Leiste
    // nachordnen (window.leisteNachher). Es muss das wiederholbar tun:
    // Es laeuft nach jedem Fuellen erneut.
    const nachher = () => { if (typeof window.leisteNachher === 'function') window.leisteNachher(leiste); };
    requestAnimationFrame(() => {
      // FEHLERBEHOBEN (2026-10-29): Kap 5, Etappe 3 rollte beim ersten
      // Zeichnen um 5 px. Ursache: Das Kapitel ordnet das Band erst hier
      // (leisteNachher); das Brett war mit der alten Bandhoehe gemessen.
      const h0 = leiste.offsetHeight;
      jetztSammeln();
      nachher();
      kopfAuftrag();
      leisteFuellen(leiste);
      if (leiste.offsetHeight !== h0) requestAnimationFrame(neuEinpassen);
      let laeuft = false;
      new MutationObserver(() => {
        if (laeuft) return;
        laeuft = true;
        try { nachher(); leisteFuellen(leiste); kopfAuftrag(); } finally { laeuft = false; }
      }).observe(leiste, {childList: true, subtree: true});
    });
  }

  ['buehne', 'buehneOben'].forEach(name => {
    const alt = window[name];
    if (typeof alt !== 'function') return;
    window[name] = function(){
      const r = alt.apply(this, arguments);
      umbauen();
      return r;
    };
  });

  /* Fuer die Kapitel: ein Element ausdruecklich in die Leiste legen
     (oben, unter den Griff, oder ans Ende). */
  window.leisteLegen = function(el, oben){
    const l = document.getElementById('wsleiste');
    if (!l || !el) return false;
    if (oben) l.insertBefore(el, l.children[1] || null);
    else l.appendChild(el);
    return true;
  };
  window.leisteAn = () => !!document.getElementById('wsleiste');

  /* NEU (Rike 2026-10-29: «Zusatzinformationen … besser als Pop-up»):
     macht aus einem Hinweistext ein kleines ⓘ, das den Text auf Klick
     in einer Blase zeigt. Wiederholbar: Ein schon umgebautes Element
     bleibt, wie es ist. */
  let blase = null;
  function blaseZu(){ if (blase){ blase.remove(); blase = null; } }
  document.addEventListener('click', ev => { if (blase && !ev.target.closest('.wsinfo')) blaseZu(); });
  window.leisteInfo = function(el){
    if (!el || el.dataset.wsinfo) return;
    const text = el.textContent.trim();
    if (!text) return;
    el.dataset.wsinfo = '1';
    el.textContent = 'ⓘ';
    el.classList.add('wsinfo');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', text);
    el.tabIndex = 0;
    const zeigen = ev => {
      ev.stopPropagation();
      const war = blase && blase._an === el;
      blaseZu();
      if (war) return;
      blase = document.createElement('div');
      blase.className = 'wsblase';
      blase.textContent = text;
      // Mehrzeilige Hinweise (data-zeilen): Zeilen bleiben Zeilen.
      if (el.dataset.zeilen) blase.style.whiteSpace = 'pre-line';
      blase._an = el;
      document.body.appendChild(blase);
      const r = el.getBoundingClientRect();
      blase.style.left = Math.max(8, Math.min(r.left - 10, innerWidth - blase.offsetWidth - 8)) + 'px';
      blase.style.top = (r.bottom + 6) + 'px';
    };
    el.addEventListener('click', zeigen);
    el.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') zeigen(ev); });
  };
})();
