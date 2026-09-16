/* Die drei Etappen von Kapitel 2 — «Eine Situation, viele Ergebnismengen».

   Entschieden mit Rike am 2026-08-21. Der Bogen:
     E1  Alle moeglichen Ergebnisse aufschreiben - und woran man merkt,
         dass eine solche Liste taugt: vollstaendig und eindeutig.
     E2  Und dann die zweite Frage: Nicht jede GUELTIGE Menge taugt fuer
         jede Frage.
     E3  Erproben - in derselben Eisdiele oder ausserhalb.

   Anlass ist Rikes Befund aus der letzten Pruefung: nach
   ERGEBNISMENGEN gefragt, EREIGNISSE zurueckbekommen. */

/* Der Satz, der fuer die ganze Etappe gilt. Anders als in Kapitel 1
   steht hier EINE Situation ueber allem - sie ist die Voraussetzung,
   gegen die geprueft wird, und bleibt deshalb dauernd sichtbar. */
function praemisse(buchstabe){
  return `<div class="praemisse"><span><span class="wer">${buchstabe}</span>`
       + `${D.situationen[buchstabe]}</span></div>`;
}

/* NEU (Rikes Entscheidung, 2026-08-22): In Etappe 3, Weg A stand
   Situation A nirgends. Die Feldkoepfe tragen B und C, der Auftrag sagt
   «dieselbe Eisdiele, zwei andere Bestellungen» - aber WORAN sich etwas
   geaendert hat, war nicht zu sehen. Rike: «wahrscheinlich muessten wir
   Situation A noch mal anzeigen oder schreiben, dass die weiterhin
   gilt.»

   Nicht praemisse('A') selbst: Die behauptet, A gelte fuer diese
   Etappe: In Etappe 1 und 2 ist A die Voraussetzung, gegen die geprueft
   wird. Hier ist A der VERGLEICHSPUNKT, gegen den man liest. Darum
   dieselbe Form mit einer Beschriftung davor - blass gesetzt, damit sie
   die beiden Situationen im Feld nicht ueberstimmt. */
function vergleichspunkt(buchstabe){
  return `<div class="praemisse vergleich">`
       + `<span class="woher">Von hier kommen Sie:</span>`
       + `<span><span class="wer">${buchstabe}</span>`
       + `${D.situationen[buchstabe]}</span></div>`;
}

/* ───────── Etappe 1 · Ordnen ─────────
   Elf Mengenkarten zu Situation A: sechs gueltige, fuenf kaputte. Der
   ganze Lerngegenstand steckt in der Sortierung - jede kaputte Karte
   stuerzt an einer anderen Stelle. */
/* Fertig sortiertes Brett fuer loesungsKnopf() - gueltig gegen kaputt,
   die beiden festen Faecher aus etappe1(). */
function _loesungStandE1(){
  const karten = {};
  D.e1.gueltig.forEach(id => { karten[id] = {ort:'gut', x:0, y:0, rot:0}; });
  D.e1.kaputt.forEach(id => { karten[id] = {ort:'kaputt', x:0, y:0, rot:0}; });
  return {karten};
}

function etappe1(){
  loesungAnwenden(_loesungStandE1);
  const a = D.etappen[0];
  if (stand.e1stufe === undefined) stand.e1stufe = 0;
  const mehrDa = stand.e1stufe < D.e1.stufen.length - 1;
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 1 · Ordnen',
    /* GEAENDERT (2026-09-16, Rikes Entscheidung zu Maurus' Punkt 5).
       Zwei Aenderungen, und die zweite ist die wichtigere.

       1 · «kaputt» ist weg. Maurus' Einwand ist keine Stilfrage: KEINE
       dieser Karten ist kaputt. Jede ist eine wohlgeformte Menge mit
       einem nachvollziehbaren Gedanken auf der Rueckseite («Ich schreibe
       auf, was mich interessiert»), und X4 ist sogar eine tadellose
       Ergebnismenge - von einem ANDEREN Zufallsexperiment, wie der
       Generator selbst vermerkt. «Kaputt» behauptet einen Defekt, wo es
       um PASSUNG geht.

       2 · Die zwei Fragen sind weg. Hier stand «Prüfen Sie jede Karte an
       zwei Fragen: Kommt jeder mögliche Ausgang darin vor? Und kommt
       jeder nur einmal vor?» - damit schenkte der Auftrag beide
       Bedingungen her, bevor jemand eine Karte anfasste. Genau das
       sollten die Studierenden selbst finden. Rike: «Sie sollen sich
       eigentlich selber überlegen, wann eine Ergebnismenge richtig ist
       und wann nicht … diese Frage, warum stimmt es nicht, die soll
       diskutiert werden.»

       Nebenbei war der Satz auch unvollstaendig: Er nannte zwei
       Bedingungen, der Kartensatz traegt VIER Fehlerarten
       (unvollstaendig, ueberlappend, nicht wohldefiniert, enthaelt
       Unmoegliches). Wer genau die zwei gestellten Fragen anwandte,
       nahm X4 durch.

       Die Aufloesung bleibt, wo sie war: hinter dem Pruefknopf, auf
       Verlangen, Karte fuer Karte. */
    text:'Diese Karten behaupten alle dasselbe: Sie schreiben auf, was bei '
       + 'Tims Bestellung herauskommen kann. <b>Bei welchen stimmt das — und '
       + 'bei welchen nicht?</b> '
       + '<span class="zart">Und vor allem: <b>warum</b> stimmt es bei den '
       + 'anderen nicht? Besprechen Sie das, bevor Sie prüfen. Es liegen '
       + 'zunächst nicht alle Karten aus — wer fertig ist oder mehr will, '
       + 'holt sich weitere.</span>'},
    'Tisch — ungeordnet', 'Ihre Sortierung',
    `<span class="beschriftung">Auf dem Tisch: ${D.e1.stufen[stand.e1stufe]}</span>
     ${mehrDa
        ? `<button class="knopf leer" id="mehrstufe">Weitere Karten zuschalten</button>`
        : `<span class="beschriftung">Alle Karten liegen aus.</span>`}
     <button class="knopf leer" id="zurueck" title="Alle Karten zurück auf den Tisch">↺</button>
     <button class="knopf" id="pruefen">Prüfen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Etappe 2 →</button>`,
    praemisse('A'));

  const feld = document.getElementById('feld'), tisch = document.getElementById('tisch');
  // GEAENDERT (2026-08-24, Rikes Auftrag "genauso wie Kombinatorik"):
  // Nicht mehr alle elf Karten auf einmal - `alle` bleibt die
  // Gesamtmenge (fuer die Pruefung), `sichtbar` ist die freigeschaltete
  // Teilmenge. Siehe agent/16_herkunft.md.
  const alle = D.e1.gueltig.concat(D.e1.kaputt);
  const sichtbar = alle.filter(id => (D.e1.stufe[id] ?? 0) <= stand.e1stufe);
  const els = {};
  alle.forEach(id => { els[id] = karte(id); });

  /* GEAENDERT (2026-09-16, Rikes Entscheidung zu Maurus' Punkt 5):
     «Ergebnismenge» gegen «keine Ergebnismenge».

     Warum kein EIGENSCHAFTSWORT: Jedes Wort fuer «woran es scheitert»
     ist schon die Antwort auf den Auftrag - «unvollstaendig»,
     «ueberlappend», «nicht eindeutig» stehen alle auf der Liste, die die
     Gruppe erst aufstellen soll. «Kaputt» und «taugt nicht» vermeiden
     das, sind aber keine Mathematik.

     Der Ausweg ist, den NAMEN zu verneinen statt eine Eigenschaft zu
     behaupten. Das ist exakt, weil «Ergebnismenge» keine Art von Objekt
     ist, sondern eine ROLLE: Eine Menge ist Ergebnismenge EINES
     Experiments. X4 ist deshalb keine falsche Menge, sondern die
     richtige von etwas anderem - genau das sagt der Zusatzauftrag auf
     ihrer Rueckseite. Und die Verneinung verraet keine Bedingung; sie
     stellt die Frage des Kapitels: Wann darf ich das so nennen?

     Ohne Zusatz «fuer Tims Bestellung», obwohl er die Sache noch
     genauer machen wuerde: Das Situationsband mit Tims Bestellung steht
     dauernd darueber (praemisse('A')), der Bezug ist also gesetzt. Die
     Faecher tragen die Namen, nicht die Voraussetzung. */
  const FAECHER = [
    {ort:'gut',    name:'Ergebnismenge'},
    {ort:'kaputt', name:'keine Ergebnismenge'},
  ];

  function felder(){
    feld.querySelectorAll('.feld').forEach(d=>d.remove());
    const kb = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--kb'));
    const bb = feld.clientWidth || 520;
    const fw = bb - 16;
    const fh = Math.max(kb * 2.1, 180);
    FAECHER.forEach((f, i)=>{
      const d = document.createElement('div');
      d.className = 'feld'; d.dataset.ort = f.ort;
      d.style.left = '8px'; d.style.top = (26 + i*(fh+12)) + 'px';
      d.style.width = fw + 'px'; d.style.height = fh + 'px';
      d.innerHTML = `<div class="kopf"><span class="nr">${i+1}</span>${f.name}</div>`;
      feld.appendChild(d);
    });
    feld.style.minHeight = (26 + FAECHER.length*(fh+12) + 20) + 'px';
    Object.entries(stand.karten).forEach(([id,s])=>{
      const el = els[id]; if (!el) return;
      const ziel = s.ort==='tisch' ? tisch
        : (feld.querySelector(`[data-ort="${s.ort}"]`) || tisch);
      ziel.appendChild(el); el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el);
      if (ziel !== tisch) gruppeOrdnen(ziel);
    });
  }
  window._neuzeichnen = felder;
  felder();

  const neu = sichtbar.filter(id => !(id in stand.karten)).map(id => els[id]);
  if (neu.length){ streuen(neu, tisch); merken(); }

  const mehrstufe = document.getElementById('mehrstufe');
  if (mehrstufe) mehrstufe.onclick = ()=>{ stand.e1stufe++; etappe1(); };

  document.getElementById('zurueck').onclick = ()=>{
    stand.karten = {}; document.getElementById('befund').textContent='';
    document.querySelectorAll('.k').forEach(k=>
      k.classList.remove('ok','falsch','fastok'));
    felder(); streuen(sichtbar.map(id=>els[id]), tisch); merken();
  };

  document.getElementById('pruefen').onclick = ()=>{
    document.querySelectorAll('.k').forEach(k=>
      k.classList.remove('ok','falsch','fastok'));
    let richtig=0, gelegt=0;
    alle.forEach(id=>{
      const s = stand.karten[id]; if (!s || s.ort==='tisch') return;
      gelegt++;
      const sollGut = D.e1.gueltig.includes(id);
      const liegtGut = s.ort === 'gut';
      const ok = sollGut === liegtGut;
      els[id].classList.add(ok ? 'ok' : 'falsch');
      if (ok) richtig++;
    });
    stand.geprueft = true;
    // GEAENDERT (2026-08-24): "offen" und die Vollstaendigkeit zaehlen nur
    // gegen die freigeschaltete Welle, nicht gegen alle elf - sonst
    // meldete der Knopf staendig "liegen noch auf dem Tisch" fuer Karten,
    // die noch gar nicht ausliegen.
    const offen = sichtbar.length - gelegt;
    const b = document.getElementById('befund');
    if (!gelegt){ b.textContent = 'Es liegt noch nichts in den Fächern.'; return; }
    b.textContent = `${richtig} von ${gelegt} richtig.`
      + (offen ? ` ${offen} liegen noch auf dem Tisch.` : '')
      // GEAENDERT (2026-09-16): «kaputte Karte» -> die Karte, die nicht
      // als Ergebnismenge durchgeht. Siehe FAECHER.
      + (richtig === sichtbar.length
         ? ' — Klicken Sie eine abgelehnte Karte an, um zu sehen, woran sie scheitert.'
         : '');
    // Die Aufloesung erst NACH dem Pruefen, und nur auf Verlangen: Der
    // Grund ist die Antwort auf den Auftrag, nicht seine Hilfestellung.
    D.e1.kaputt.forEach(id=>{
      const el = els[id];
      if (el.querySelector('.marke')) return;
      const g = D.e1.grund[id]; if (!g) return;
      el.appendChild(mkMarke({text:'?', art:'sit', titel:g}, el));
    });
  };
  document.getElementById('weiter').onclick = ()=>{ stand.etappe=1; los(); };
  loesungsKnopf(() => etappe1());
}

/* ───────── Etappe 2 · Strategien ─────────
   Die Pointe: Eine GUELTIGE Menge kann fuer eine bestimmte Frage
   UNBRAUCHBAR sein. Sie landet erst, wenn mehrere gueltige
   nebeneinanderliegen - deshalb alle sechs, nicht eine Auswahl.
   M2 traegt alle zehn Ereignisse, M10k genau eines. */
/* Fertig sortiertes Brett fuer loesungsKnopf() - jedes Ereignis in
   jede Menge, die es traegt (D.e2.traegt).

   GEAENDERT (2026-09-10, Rikes Auftrag «das Original bleibt liegen»):
   In den Reihen liegen ausschliesslich KOPIEN (id#…), nie die
   Vorratskarte selbst - genau so, wie ein von Hand gelegtes Brett jetzt
   aussieht. Die zehn Vorratskarten stehen absichtlich NICHT in diesem
   Stand; sie zaehlen dadurch beim Zeichnen als «neu» und werden auf den
   Tisch gestreut, wo sie hingehoeren. Der Suffix ist frei waehlbar,
   grund() liest nur, was vor dem ersten «#» steht. */
function _loesungStandE2(){
  const karten = {};
  let n = 0;
  D.e2.ereignisse.forEach(r=>{
    (D.e2.traegt[r] || []).forEach(m=>{
      karten[r + '#loesung' + (++n)] = {ort:m, x:0, y:0, rot:0};
    });
  });
  return {karten};
}

function etappe2(){
  loesungAnwenden(_loesungStandE2);
  const a = D.etappen[1];
  if (stand.e2stufe === undefined) stand.e2stufe = 0;
  const mehrDa = stand.e2stufe < D.e2.stufen.length - 1;
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 2 · Strategien',
    text:'Jetzt die Ereignisse. Legen Sie jedes Ereignis in <b>jede</b> Menge, '
       + 'in der es sich hinschreiben lässt — und <b>schreiben Sie es dort '
       + 'auch hin</b>, als Teilmenge dieser Ergebnismenge. '
       + '<span class="zart">Das Feld dafür erscheint, sobald die Karte in '
       + 'einer Menge liegt. Die Karte auf dem Tisch <b>bleibt liegen</b> — '
       + 'nach rechts wandert eine Kopie. Dasselbe Ereignis passt oft in '
       + 'mehrere Mengen; ziehen Sie es einfach noch einmal hinüber und '
       + 'schreiben Sie es dort anders hin. Wollen Sie eine Kopie wieder '
       + 'loswerden, ziehen Sie sie zurück auf den Tisch. Passt ein '
       + 'Ereignis in keine Menge, lassen Sie es liegen. Es liegen '
       + 'zunächst nicht alle Ereignisse aus — wer fertig ist oder mehr '
       + 'will, holt sich weitere.</span>'},
    'Ereignisse', 'Die sechs Mengen, die passen',
    `<span class="beschriftung">Auf dem Tisch: ${D.e2.stufen[stand.e2stufe]}</span>
     ${mehrDa
        ? `<button class="knopf leer" id="mehrstufe">Weitere Ereignisse zuschalten</button>`
        : `<span class="beschriftung">Alle Ereignisse liegen aus.</span>`}
     <button class="knopf leer" id="zurueck" title="Alle Karten zurück">↺</button>
     <button class="knopf" id="pruefen">Prüfen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Etappe 3 →</button>`,
    praemisse('A'));

  const feld = document.getElementById('feld'), tisch = document.getElementById('tisch');
  const els = {};
  const grund = id => id.split('#')[0];       // Kopien tragen «#1» hinten

  function reihen(){
    feld.querySelectorAll('.feld').forEach(d=>d.remove());
    const kb = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--kb'));
    const bb = feld.clientWidth || 520;
    const kopfB = kb * 0.72;
    let y = 26;
    D.e2.mengen.forEach((m, i)=>{
      const d = document.createElement('div');
      d.className = 'feld reihe'; d.dataset.ort = m;
      d.style.left='8px'; d.style.top=y+'px';
      d.style.width=(bb-16)+'px'; d.style.height=(kb*1.05)+'px';
      // Die Mengenkarte selbst ist der Kopf der Reihe - sie liegt fest
      // und wird nicht gezogen.
      //
      // UEBERHOLT (2026-08-21, Rikes Entscheidung «Nein, weg»): Hier
      // stand eine laufende Nummer 1-6. Sie war eingefuehrt worden,
      // weil sechs dichte TEXTkarten sich nur durchs Lesen
      // unterscheiden liessen. Genau das gilt nicht mehr: Seit die
      // Karte ihre Menge AUSGESCHRIEBEN traegt, sieht man den
      // Unterschied - runde Klammern gegen Mengenklammern, acht
      // Elemente gegen vier. Die Nummer waere jetzt eine zweite
      // Bezeichnung, die nichts hinzufuegt.
      d.innerHTML = `<img class="reihenkopf" src="karten/${m}.svg" alt=""
                       style="width:${kopfB}px">`;
      feld.appendChild(d);
      y += kb*1.05 + 10;
    });
    feld.style.minHeight = (y + 20) + 'px';
    Object.entries(stand.karten).forEach(([id,s])=>{
      const el = els[id]; if (!el) return;
      const ziel = s.ort==='tisch' ? tisch
        : (feld.querySelector(`[data-ort="${s.ort}"]`) || tisch);
      ziel.appendChild(el); el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el);
    });
    reihenSetzen2();
  }

  // reiheOrdnen() und reihenSetzen() stehen seit dem 2026-08-21 in
  // der gemeinsamen Flaeche - Kapitel 3 braucht dasselbe.
  const reihenSetzen2 = () => { reihenSetzen(feld, 0.72); teilmengenZeigen(); };

  window._neuzeichnen = reihen;
  // Nach jedem Ablegen zuerst den Vorrat wahren (siehe vorratWahren),
  // dann die Reihen setzen - die frisch entstandene Kopie soll gleich
  // mit ins Raster. merken() zuletzt, damit die Kopie und die
  // zurueckgelegte Vorratskarte mit ihren endgueltigen Plaetzen im
  // Stand stehen.
  window._nachAblegen = () => {
    const geaendert = vorratWahren();
    reihenSetzen2();
    if (geaendert) merken();
  };

  D.e2.ereignisse.forEach(id=>{ els[id] = ereigniskarte(id); });
  // Kopien aus einem frueheren Besuch wiederherstellen
  Object.keys(stand.karten).filter(id=>id.includes('#')).forEach(id=>{
    if (!els[id]) els[id] = ereigniskarte(id);
  });

  /* Das Ereignis als TEILMENGE hinschreiben - Rikes Idee vom
     2026-08-21: «Man könnte bei den Ereignissen den Auftrag geben, ein
     Feld zum Eingeben, wo Sie das Ereignis in der jeweiligen
     Ergebnismenge aufschreiben. Und dann soll man, je nachdem wo man
     die Karte hingelegt hat, die passende Teilmenge aufschreiben.»

     Das Feld erscheint ERST, wenn die Karte in einer Menge liegt.
     Vorher gäbe es nichts, wovon eine Teilmenge zu bilden wäre - und
     zehn Eingabefelder auf dem Tisch wären nur Lärm. */
  function teilmengenfeld(el, id){
    const kasten = document.createElement('div');
    kasten.className = 'teilmenge';
    const feld = document.createElement('input');
    feld.placeholder = 'E = { … }';
    feld.value = (stand.teilmenge || {})[id] || '';
    feld.addEventListener('pointerdown', e => e.stopPropagation());
    feld.addEventListener('click', e => e.stopPropagation());
    // GEAENDERT (2026-09-10): Geschrieben wird unter el.dataset.id, nicht
    // unter der Kennung von damals. vorratWahren() TAUFT eine Karte um -
    // aus der herübergezogenen Vorratskarte wird die Kopie -, und ein
    // fest eingeschlossenes `id` haette den Text danach weiter unter der
    // alten Kennung abgelegt.
    feld.addEventListener('input', () => {
      stand.teilmenge = stand.teilmenge || {};
      stand.teilmenge[el.dataset.id] = feld.value;
    });
    kasten.appendChild(feld);
    el.appendChild(kasten);
    return kasten;
  }

  /* Sichtbar nur dort, wo eine Ergebnismenge darunterliegt. */
  function teilmengenZeigen(){
    document.querySelectorAll('.k .teilmenge').forEach(kasten => {
      const el = kasten.closest('.k');
      const ort = (el.parentElement || {}).dataset;
      kasten.classList.toggle('aktiv',
        !!(ort && ort.ort && D.e2.mengen.includes(ort.ort)));
    });
  }

  function ereigniskarte(id){
    const el = karte(id);
    teilmengenfeld(el, id);
    return el;
  }

  /* Die Regel steht jetzt in der gemeinsamen Flaeche (kopierGeste),
     weil vier Kapitel sie brauchen. Hier bleibt nur, was an DIESER
     Etappe besonders ist: die Reihen sind die Ziele, und der
     geschriebene Teilmengentext muss beim Umtaufen mitwandern. */
  function vorratWahren(){
    return kopierGeste({
      tisch, els, bauen: ereigniskarte,
      ziele: () => D.e2.mengen.map(m => feld.querySelector(`[data-ort="${m}"]`)),
      // alt -> neu; neu === null heisst: die Kopie wurde weggelegt.
      mit: (alt, neu) => {
        if (!stand.teilmenge || !(alt in stand.teilmenge)) return;
        if (neu) stand.teilmenge[neu] = stand.teilmenge[alt];
        delete stand.teilmenge[alt];
      },
    });
  }

  reihen();
  // GEAENDERT (2026-08-24): Nur die freigeschaltete Welle wird beim
  // ersten Zeichnen ausgeschuettet - Kopien (id#N), die schon in
  // stand.karten stehen, sind davon unberuehrt, die platziert reihen()
  // selbst ueber ihren gespeicherten Ort.
  const sichtbarE = D.e2.ereignisse.filter(id => (D.e2.stufe[id] ?? 0) <= stand.e2stufe);
  const neu = sichtbarE.filter(id=>!(id in stand.karten)).map(id=>els[id]);
  if (neu.length){ streuen(neu, tisch); merken(); }
  teilmengenZeigen();

  const mehrstufe2 = document.getElementById('mehrstufe');
  if (mehrstufe2) mehrstufe2.onclick = ()=>{ stand.e2stufe++; etappe2(); };

  document.getElementById('zurueck').onclick = ()=>{
    stand.karten = {}; stand.dupl = 0;
    // NEU (2026-09-10): Auch die geschriebenen Teilmengen gehen mit.
    // Sie standen auf den Kopien, und die sind jetzt weg - stehen
    // bliebe sonst Text ohne Karte, der bei der naechsten Kopie mit
    // derselben Kennung wieder auftauchte.
    stand.teilmenge = {};
    document.getElementById('befund').textContent = '';
    etappe2();
  };

  document.getElementById('pruefen').onclick = ()=>{
    document.querySelectorAll('.k').forEach(k=>
      k.classList.remove('ok','falsch','fastok'));
    // Je Ereignis: Welche Mengen wurden belegt, welche haetten es sein
    // muessen? Zu wenig ist etwas anderes als falsch - deshalb wird
    // beides getrennt gezaehlt.
    const gelegt = {};
    Object.entries(stand.karten).forEach(([id,s])=>{
      if (s.ort==='tisch' || !els[id]) return;
      (gelegt[grund(id)] = gelegt[grund(id)] || new Set()).add(s.ort);
    });
    let stimmt=0, zuviel=0, fehlt=0;
    // GEAENDERT (2026-08-24): Nur gegen die freigeschaltete Welle pruefen -
    // sonst meldet "fehlt" Karten, die noch gar nicht ausliegen.
    sichtbarE.forEach(r=>{
      const soll = new Set(D.e2.traegt[r] || []);
      const ist = gelegt[r] || new Set();
      ist.forEach(m=>{ if (!soll.has(m)) zuviel++; });
      soll.forEach(m=>{ if (!ist.has(m)) fehlt++; });
    });
    Object.entries(stand.karten).forEach(([id,s])=>{
      const el = els[id]; if (!el || s.ort==='tisch') return;
      const soll = (D.e2.traegt[grund(id)] || []).includes(s.ort);
      el.classList.add(soll ? 'ok' : 'falsch');
      if (soll) stimmt++;
    });
    stand.geprueft = true;
    const satz = [`${stimmt} richtig gelegt.`];
    if (zuviel) satz.push(`${zuviel} liegen in einer Menge, in der sich das `
      + `Ereignis nicht ausdrücken lässt.`);
    if (fehlt) satz.push(`${fehlt} Möglichkeiten fehlen noch.`);
    // GEAENDERT (2026-08-24): Die Pointe («Vollstaendig») erst aussprechen,
    // wenn wirklich alle Wellen ausliegen - sonst faellt die Schlussfolgerung,
    // waehrend noch Ereignisse fehlen, die einfach noch nicht ausliegen.
    if (!zuviel && !fehlt && stand.e2stufe >= D.e2.stufen.length - 1){
      // Die Pointe benennen. Seit die Nummern weg sind, werden die
      // beiden Mengen ueber ihre GROESSE benannt - die steht als |Ω|
      // auf der Karte und ist damit auf dem Tisch nachzusehen.
      // Welche Menge am wenigsten traegt, wird gerechnet und nicht
      // angenommen: Wer den Kartensatz aendert, bekommt sonst einen
      // Satz, der nicht mehr stimmt.
      const zahl = m => D.e2.ereignisse
        .filter(r => (D.e2.traegt[r]||[]).includes(m)).length;
      const arm = D.e2.mengen.reduce((a,b)=> zahl(b) < zahl(a) ? b : a);
      const reich = D.e2.mengen.reduce((a,b)=> zahl(b) > zahl(a) ? b : a);
      const gr = m => (D.e2.groesse||{})[m];
      satz.push(`Vollständig. Halten Sie die Menge mit ${gr(reich)} Elementen `
        + `neben die mit ${gr(arm)}: Beide sind gültig — die eine trägt `
        + `${zahl(reich)} Ereignisse, die andere ${zahl(arm)}.`);
    }
    document.getElementById('befund').textContent = satz.join(' ');
  };
  document.getElementById('weiter').onclick = ()=>{ stand.etappe=2; los(); };
  loesungsKnopf(() => etappe2());
}

/* ───────── Etappe 3 · Übertragen ─────────
   Zwei Wege, und anders als in Kapitel 1 werden sie NICHT
   nebeneinandergelegt: Sie sind verschieden tief, und beides zugleich
   verwischt das. Darum kein Knopf «das andere dazunehmen». */
function etappe3(){
  if (!stand.e3){
    const b = document.getElementById('buehne');
    b.innerHTML = `<div class="start">
      <h2>Etappe 3 · Übertragen</h2>
      <!-- GEAENDERT (2026-09-10, Maurus' Rueckmeldung «sprachlich
           komisch»): Hier stand «woran eine Ergebnismenge taugt». Man
           sagt «wozu etwas taugt» oder «woran man ERKENNT, ob es taugt» -
           «woran es taugt» ist beides zugleich und deshalb keins von
           beidem. Gemeint war das Erkennen: Etappe 1 hat die drei
           Proben geliefert. Und «Woran wollen Sie das erproben?» stand
           unmittelbar danach; zweimal «woran» in zwei Saetzen, in
           verschiedener Bedeutung. -->
      <p style="color:var(--matt)">Sie wissen jetzt, woran man erkennt, ob
         eine Ergebnismenge taugt — und dass eine gültige noch lange nicht
         für jede Frage brauchbar ist. Wo wollen Sie das erproben?</p>
      <div class="wahl" data-w="a"><b>In der Eisdiele bleiben</b>
        <span>Zwei weitere Bestellungen, dieselbe Maschinerie. Eine kleine
        Änderung an der Situation — und plötzlich passen andere Karten.
        Ihre Karten aus Etappe 1 kommen mit.</span></div>
      <div class="wahl" data-w="b"><b>Die Eisdiele verlassen</b>
        <span>Vier Aufgaben aus dem Skript. Hier gibt es <b>keine
        vorgefertigten Mengenkarten</b> — Sie schreiben Ihre
        Ergebnismengen selbst auf.</span></div>
      <p class="hinweis">Der zweite Weg ist der schwerere. Nehmen Sie ihn,
         wenn Etappe 1 und 2 leichtgefallen sind.</p></div>`;
    b.querySelectorAll('.wahl').forEach(w=>w.onclick=()=>{
      stand.e3 = w.dataset.w; stand.karten = {}; etappe3(); });
    // Ohne diesen Aufruf sah man auf diesem Wahlbildschirm nie eine
    // Loesungsoption - erst nach dem Anklicken einer Wahl. Siehe
    // loesungsHinweis() in flaeche.js.
    loesungsHinweis('<h4>Etappe 3 · Übertragen</h4>'
      + '<div class="zeile matt">Beide Wege haben eine Lösung, sobald Sie '
      + 'gewählt haben: Weg A eine richtige Zuordnung, Weg B nur eine '
      + 'Vergröberungs-Notiz (die Mengen schreiben die Studierenden selbst).'
      + '</div>', b.querySelector('.start'));
    return;
  }
  stand.e3 === 'a' ? etappe3a() : etappe3b();
}

/* Weg A — in der Eisdiele bleiben. Situationen B und C. */
/* Fertig sortiertes Brett fuer loesungsKnopf() - welche Mengen passen
   zu Situation B und C (D.e3.wegA.gueltig).

   GEAENDERT (2026-09-10, wie in Etappe 2): In den Situationsfeldern
   liegen ausschliesslich KOPIEN (id#…). Die Mengenkarten selbst stehen
   absichtlich NICHT in diesem Stand - sie zaehlen dadurch beim Zeichnen
   als «neu» und werden auf den Tisch gestreut. So sieht die gezeigte
   Loesung genau so aus wie ein von Hand richtig gelegtes Brett. */
/* Die drei Faecher von Weg A, in der Reihenfolge, in der sie liegen.
   Das dritte traegt keine Situation - NEU (2026-09-16, Rikes Entscheidung
   zu Maurus' Punkt 7): «Dann wird jedes Mal eine Entscheidung
   eingefordert.» Welche Karten hineingehoeren, rechnet flaeche.py aus. */
function _faecherE3a(){
  return D.e3.wegA.situationen.map(s=>({
    ort: s,
    kopf: `<span class="nr">${s}</span>${D.situationen[s]}`,
  })).concat([{
    ort: D.e3.wegA.keines,
    kopf: `<span class="nr">–</span>${D.e3.wegA.keines_kopf}`,
  }]);
}

function _loesungStandE3a(){
  const karten = {};
  let n = 0;
  _faecherE3a().forEach(f=>{
    (D.e3.wegA.gueltig[f.ort] || []).forEach(m=>{
      karten[m + '#loesung' + (++n)] = {ort:f.ort, x:0, y:0, rot:0};
    });
  });
  return {karten};
}

function etappe3a(){
  loesungAnwenden(_loesungStandE3a);
  const a = D.etappen[2];
  if (stand.e3astufe === undefined) stand.e3astufe = 0;
  const mehrDa = stand.e3astufe < D.e3.wegA.stufen.length - 1;
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 3 · Zwei weitere Bestellungen',
    text:'Dieselbe Eisdiele, zwei andere Bestellungen. Welche Mengenkarten '
       + 'passen jetzt? <span class="zart">Die Karte auf dem Tisch '
       + '<b>bleibt liegen</b> — nach rechts wandert eine Kopie. Eine '
       + 'Karte kann zu <b>beiden</b> Situationen passen; ziehen Sie sie '
       + 'dann einfach zweimal hinüber. Wollen Sie eine Kopie wieder '
       + 'loswerden, ziehen Sie sie zurück auf den Tisch. '
       // GEAENDERT (2026-09-14, Maurus' Rueckmeldung): Hier stand
       // «Situation C liegt noch nicht aus». Situation C liegt sehr wohl
       // aus - ihr Feld steht von Anfang an rechts. Gemeint waren die
       // KARTEN zu Situation C (M1, M4, M7, M9), die erst die zweite
       // Stufe mitbringt. Maurus: «das bezieht sich auf die Kaertchen,
       // die zu Situation C gehoeren, oder? evtl. praezisieren.»
       + 'Die Karten zu Situation C liegen noch nicht aus — wer mit B '
       // NEU (2026-09-16, Rikes Entscheidung zu Maurus' Punkt 7): Das
       // dritte Fach muss angesagt werden, sonst ist es ein Raetsel.
       + 'fertig ist, holt sie sich. <b>Jede</b> Karte gehört am Ende '
       + 'irgendwohin: Passt eine zu keiner der beiden Bestellungen, '
       + 'ziehen Sie sie ins untere Fach.</span>'},
    'Alle Mengenkarten', 'Situation B und C',
    `<span class="beschriftung">Ausliegend: ${D.e3.wegA.stufen[stand.e3astufe]}</span>
     ${mehrDa
        ? `<button class="knopf leer" id="mehrstufe">${D.e3.wegA.stufen[stand.e3astufe+1]} zuschalten</button>`
        : `<span class="beschriftung">Beide Situationen liegen aus.</span>`}
     <button class="knopf leer" id="zurueck" title="Alle Karten zurück auf den Tisch">↺</button>
     <button class="knopf" id="pruefen">Prüfen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="andererweg" style="margin-left:auto">Doch der andere Weg</button>`,
    vergleichspunkt('A'));

  const feld = document.getElementById('feld'), tisch = document.getElementById('tisch');
  // GEAENDERT (2026-08-24): Nur die neuen Mengenkarten (wegA.mengen)
  // werden gestaffelt - die sechs aus Situation A sind schon bekannt und
  // liegen die ganze Etappe ueber aus.
  const alle = D.e3.wegA.mengen.concat(D.e1.gueltig);
  const sichtbar = D.e3.wegA.mengen
    .filter(id => (D.e3.wegA.stufe[id] ?? 0) <= stand.e3astufe)
    .concat(D.e1.gueltig);
  const els = {};
  const grund = id => id.split('#')[0];

  /* Dieselbe Regel wie in Etappe 2 (siehe vorratWahren() dort, wo sie
     ausfuehrlich begruendet steht): Karten OHNE «#» sind Vorratskarten
     und liegen immer auf dem Tisch, Karten MIT «#» sind Kopien und
     liegen immer in einem Situationsfeld.

     GEAENDERT (2026-09-10): Auch hier ist das «+» weg. Eine Mengenkarte,
     die zu B UND C passt, ist in dieser Etappe der Normalfall und nicht
     die Ausnahme - erst recht mühsam war es also, sie vorher von Hand
     verdoppeln zu muessen. Und was hier zusaetzlich zaehlt: Ob eine
     Karte auch zur zweiten Situation passt, entscheidet sich beim
     Vergleichen der beiden - also erst, wenn sie in der ersten liegt. */
  function mengenkarte(id){ return karte(id); }

  function vorratWahren(){
    return kopierGeste({
      tisch, els, bauen: mengenkarte,
      ziele: () => _faecherE3a().map(
        f => feld.querySelector(`[data-ort="${f.ort}"]`)),
    });
  }

  alle.forEach(id=>{ els[id]=mengenkarte(id); });
  Object.keys(stand.karten).filter(id=>id.includes('#')).forEach(id=>{
    if (!els[id]) els[id]=mengenkarte(id); });

  function felder(){
    feld.querySelectorAll('.feld').forEach(d=>d.remove());
    const kb = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--kb'));
    const bb = feld.clientWidth||520;
    const faecher = _faecherE3a();
    /* FEHLERBEHOBEN (2026-09-16, gemessen nach dem Einbau des dritten
       Fachs): Die Feldhoehe stand fest auf `max(kb*1.9, 170)` - bei zwei
       Feldern ging das knapp auf, bei DREI nicht mehr. Gemessen auf der
       Zielgroesse 1180 x 820: sichtbare Hoehe der rechten Haelfte 527
       Punkte, das dritte Fach begann bei 548. Es lag also VOLLSTAENDIG
       unter der Kante, 272 Punkte fehlten - und ein Fach, das man erst
       durch Scrollen findet, fordert keine Entscheidung ein, sondern
       verbirgt sie. Genau das war Rikes Grund fuer das Fach.
       (Auch bei zwei Feldern waren die letzten 33 Punkte schon
       abgeschnitten; das fiel nur niemandem auf.)
       Jetzt wird die Hoehe aus dem vorhandenen Platz GERECHNET, mit
       einer Untergrenze, die Kopf und eine Kartenzeile sicher traegt,
       und der alten Hoehe als Obergrenze. Dass die Faecher beim Belegen
       wachsen und dann unter die Kante reichen, ist richtig und bleibt -
       gesucht war, dass man sie von Anfang an SIEHT. */
    const platz = (feld.closest('.haelfte') || feld).clientHeight || 520;
    const fh = Math.min(Math.max(kb*1.9, 170),
                        Math.max(kb*1.2,
                                 (platz - 26 - 20 - 12*(faecher.length-1))
                                 / faecher.length));
    faecher.forEach((f,i)=>{
      const d=document.createElement('div');
      d.className='feld'; d.dataset.ort=f.ort;
      d.style.left='8px'; d.style.top=(26+i*(fh+12))+'px';
      d.style.width=(bb-16)+'px'; d.style.height=fh+'px';
      d.innerHTML = `<div class="kopf">${f.kopf}</div>`;
      feld.appendChild(d);
    });
    feld.style.minHeight=(26+faecher.length*(fh+12)+20)+'px';
    Object.entries(stand.karten).forEach(([id,s])=>{
      const el=els[id]; if(!el) return;
      const ziel = s.ort==='tisch' ? tisch
        : (feld.querySelector(`[data-ort="${s.ort}"]`)||tisch);
      ziel.appendChild(el); el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el);
    });
    faecherSetzen(feld);
  }
  window._neuzeichnen = felder;
  // Erst den Vorrat wahren, dann die Faecher setzen - die frisch
  // entstandene Kopie soll gleich mit ins Raster. merken() zuletzt,
  // damit Kopie und zurueckgelegte Vorratskarte mit ihren endgueltigen
  // Plaetzen im Stand stehen.
  window._nachAblegen = ()=>{
    const geaendert = vorratWahren();
    faecherSetzen(feld);
    if (geaendert) merken();
  };
  felder();
  const neu = sichtbar.filter(id=>!(id in stand.karten)).map(id=>els[id]);
  if (neu.length){ streuen(neu, tisch); merken(); }

  const mehrstufe3a = document.getElementById('mehrstufe');
  if (mehrstufe3a) mehrstufe3a.onclick = ()=>{ stand.e3astufe++; etappe3a(); };

  document.getElementById('pruefen').onclick = ()=>{
    document.querySelectorAll('.k').forEach(k=>
      k.classList.remove('ok','falsch','fastok'));
    let stimmt=0, daneben=0, fehlt=0;
    const gelegt={};
    Object.entries(stand.karten).forEach(([id,s])=>{
      if (s.ort==='tisch'||!els[id]) return;
      (gelegt[s.ort]=gelegt[s.ort]||new Set()).add(grund(id));
      const soll=(D.e3.wegA.gueltig[s.ort]||[]).includes(grund(id));
      els[id].classList.add(soll?'ok':'falsch');
      soll ? stimmt++ : daneben++;
    });
    // GEAENDERT (2026-08-24): "fehlt" nur gegen ausliegende Karten zaehlen -
    // sonst meldet Situation C staendig vier fehlende Karten, bevor sie
    // ueberhaupt zugeschaltet ist.
    //
    // GEAENDERT (2026-09-16): Das dritte Fach zaehlt hier MIT. Rikes
    // Begruendung fuer das Fach war «dann wird jedes Mal eine Entscheidung
    // eingefordert» - dann muss die Pruefung die beiden Karten, die
    // nirgends passen, auch als fehlend melden, solange sie auf dem Tisch
    // liegen. Sonst ist das Fach ein Angebot und keine Anforderung.
    _faecherE3a().forEach(f=>{
      (D.e3.wegA.gueltig[f.ort]||[]).forEach(m=>{
        if (!sichtbar.includes(m)) return;
        if (!(gelegt[f.ort]&&gelegt[f.ort].has(m))) fehlt++; });
    });
    stand.geprueft=true;
    const satz=[`${stimmt} richtig.`];
    if (daneben) satz.push(`${daneben} passen dort nicht.`);
    if (fehlt) satz.push(`${fehlt} fehlen noch.`);
    document.getElementById('befund').textContent = satz.join(' ');
  };
  /* PRUEFEN (2026-08-22): Den Ruecksetzknopf gab es nur in den
     Etappen 1 und 2. Hier liegen zehn Mengenkarten und beliebig viele
     Kopien auf zwei Situationen - ohne ihn fuehrt kein Weg zurueck auf
     den Tisch. Wie in Etappe 2 wird die Etappe neu aufgebaut; damit
     verschwinden auch die Kopien, und genau das heisst «alle Karten
     zurueck». */
  document.getElementById('zurueck').onclick = ()=>{
    stand.karten = {}; stand.dupl = 0;
    document.getElementById('befund').textContent = '';
    etappe3a();
  };
  document.getElementById('andererweg').onclick = ()=>{
    stand.e3='b'; stand.karten={}; etappe3(); };
  loesungsKnopf(() => etappe3a());
}

/* Weg B — die Eisdiele verlassen. Vier Skript-Aufgaben, und die
   Ergebnismengen schreiben die Studierenden SELBST. Dafuer gibt es
   bewusst keine vorgefertigten Karten: Das ist die staerkere Anwendung,
   und wir muessen keine Karten bauen. */
function etappe3b(){
  const a = D.etappen[2];
  /* FEHLERBEHOBEN (2026-08-22): Hier stand «Und entscheiden Sie, welche
     fuer die GESTELLTEN FRAGE taugt». Es gibt keine gestellte Frage -
     die vier Aufgaben sind reine Situationen, ohne Ereignis. Der Satz
     versprach die Pointe von Etappe 2, die Weg B gar nicht traegt.

     Ursache: Weg B wurde aus Etappe 2 heraus gedacht, aber aus einem
     Kartenvorrat gebaut, der etwas anderes vorsieht. Die Notizen im
     Generator sagen es deutlich - «16 / 10 / 9 / 6», «die einzige
     Vergroeberung ist Anzahl der Punkte»: Es geht um FEINHEIT, nicht um
     Passung zu einer Frage.

     Der Auftrag sagt das jetzt. Und er fragt nach dem, was die
     Vergroeberung KOSTET - das ist die Bruecke zu Etappe 2, ohne ein
     Ereignis zu erfinden. */
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 3 · Ausserhalb der Eisdiele',
    text:'Vier Situationen aus dem Skript. Schreiben Sie zu jeder '
       + '<b>mindestens zwei</b> Ergebnismengen auf: eine <b>feine</b> und '
       + 'eine <b>gröbere</b>. '
       + '<span class="zart">Und sagen Sie zu jeder gröberen, <b>was sie '
       + 'wegwirft</b> — welchen Unterschied man in ihr nicht mehr sieht. '
       + 'Mit <b>+ noch eine Karte</b> legen Sie weitere an.</span>'},
    '', 'Ihre Ergebnismengen',
    `<span class="befund">Hier wird nichts geprüft — Ihre Mengen sind Ihre.
       <b>Vergleichen</b> zeigt, was im Skript dazu steht.</span>
     <button class="knopf leer" id="vergleichen">Vergleichen</button>
     <button class="knopf leer" id="andererweg" style="margin-left:auto">Doch der andere Weg</button>`);

  // Weg B braucht den Tisch nicht: Es gibt keine Vorratskarten.
  document.getElementById('links').style.display = 'none';
  const feld = document.getElementById('feld');
  if (!stand.e3bkarten) stand.e3bkarten = {};

  function bretter(){
    feld.querySelectorAll('.feld').forEach(d=>d.remove());
    const kb = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--kb'));
    const bb = feld.clientWidth||760;
    let y = 26;
    D.e3.wegB.aufgaben.forEach(auf=>{
      const wieviele = (stand.e3bkarten[auf.id] || 2);
      const zeilen = Math.ceil(wieviele / Math.max(1,
        Math.floor((bb-32)/(kb+8))));
      // Der Vergleich haengt am ZUSTAND, nicht am DOM. bretter() raeumt
      // die Felder bei jedem Neuzeichnen ab - ein hineingehaengter
      // Kasten waere beim naechsten Groessenregler weg gewesen. Und
      // seine Hoehe muss ins Brett eingerechnet werden, sonst laeuft er
      // unter den Rand; genau das ist in Kapitel 4 schon passiert.
      const zeigen = stand.e3bvergleich && auf.hinweis;
      const hh = zeigen ? 26 + Math.ceil(auf.hinweis.length / 78) * 17 : 0;
      const h = 62 + zeilen*(kb*0.845+10) + 34 + hh;
      const d = document.createElement('div');
      d.className='feld'; d.dataset.ort=auf.id;
      d.style.left='8px'; d.style.top=y+'px';
      d.style.width=(bb-16)+'px'; d.style.height=h+'px';
      d.innerHTML = `<div class="kopf">${auf.text}</div>`
        + (zeigen ? `<div class="hinweis"><b>Im Skript:</b> ${auf.hinweis}</div>` : '');
      feld.appendChild(d);

      for (let i=0;i<wieviele;i++){
        const id = `${auf.id}~${i}`;
        /* PRUEFEN (2026-08-22): Was die Studierenden hier schreiben,
           IST eine Ergebnismenge - also traegt die Karte, was jede
           Ergebnismenge dieses Kapitels traegt:

             das «Ω =»   Rikes Regel aus Etappe 1: «Die brauchen immer
                         das Gefuehl, dass da irgendwie steht: Omega
                         ist gleich irgendwas.» Dort gilt sie fuer die
                         fertigen Karten, auch die kaputten. Hier
                         schreiben sie die Menge selbst - dann bietet
                         die Karte die Form an, statt sie zu erwarten.
             das Blau    Ergebnismengen sind in Kapitel 2 blau,
                         Ereignisse ocker (Rikes Wahl). Bis hierher
                         zog die Farbe nicht mit: Die beschreibbare
                         Karte lag auf dem neutralen --karte, und die
                         Farbgeschichte brach in Etappe 3 ab.

           Der Ton kommt aus D.toene, also aus kern/kartenbild.py -
           dieselbe Quelle, aus der die Kartenbilder ihn holen. */
        const el = karte(id, null, {schreibbar:true,
          vorsatz: 'Ω =',
          grund: (D.toene||{}).menge,
          platzhalter: i===0 ? '{ … }   die feine'
                     : i===1 ? '{ … }   die gröbere' : '{ … }'});
        d.appendChild(el);
      }
      const plus = document.createElement('div');
      plus.className='feld neu'; plus.style.position='absolute';
      plus.style.left='8px'; plus.style.top=(h-30-hh)+'px';
      plus.style.width=(bb-32)+'px'; plus.style.height='24px';
      plus.innerHTML='<span>+ noch eine Karte</span>';
      plus.onclick=()=>{ stand.e3bkarten[auf.id]=wieviele+1; bretter(); };
      d.appendChild(plus);
      gruppeOrdnen(d);
      y += h + 14;
    });
    feld.style.minHeight = (y+20)+'px';
  }
  window._neuzeichnen = bretter;
  window._nachAblegen = null;
  bretter();

  /* Die Aufloesung, und zwar NACH der eigenen Arbeit - genau wie der
     Grund einer kaputten Karte in Etappe 1. Sie steht in den Notizen
     des Generators und war bisher ungenutzt.

     PLATZ FUER EINEN ZWEITEN ZUG (2026-08-22): Rike erinnerte Weg B
     mit einem Ereignis - «eine passende und eine, die nicht passt».
     Die Quelle gibt das nicht her, und erfunden wird hier nichts. Falls
     sie spaeter vier Ereignisse schreibt, kommt ein zweiter Zug DANEBEN
     und nicht ANSTELLE: Er braucht dieselben Bretter, dieselben Karten
     und dasselbe stand.e3bkarten. Zu tun waere dann nur, `hinweis`
     durch ein Ereignisfeld zu ergaenzen und die Leiste um einen Knopf.
     Nichts von dem, was hier steht, muesste dafuer zurueckgebaut
     werden - das ist der Grund, aus dem der Vergleich ein eigener Knopf
     ist und nicht in den Auftragstext geschrieben wurde. */
  const kn = document.getElementById('vergleichen');
  kn.textContent = stand.e3bvergleich ? 'Vergleich verbergen' : 'Vergleichen';
  kn.onclick = ()=>{ stand.e3bvergleich = !stand.e3bvergleich; bretter();
    kn.textContent = stand.e3bvergleich ? 'Vergleich verbergen' : 'Vergleichen'; };

  document.getElementById('andererweg').onclick = ()=>{
    document.getElementById('links').style.display = '';
    stand.e3='a'; stand.karten={}; etappe3(); };
  loesungsHinweis(D.loesung_e3b);
}

ETAPPEN.push(etappe1, etappe2, etappe3);
