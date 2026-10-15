/* Die drei Etappen von Kapitel 4 — «Viele Erhebungen, eine Wahrheit».

   VORSCHLAG KASPER, mit Rike noch nicht besprochen. Die Arbeitsliste
   sagt dazu ausdruecklich «wird besprochen».

   E1  Fuellen und pruefen   Beim Fuellen ENTDECKT man den Widerspruch.
   E2  Die drei, gegen die nichts spricht - verschiedene Zahlen, alle
       zulaessig. Die Pointe: Die Axiome entscheiden NICHT, welche
       Verteilung stimmt.
   E3  Immer, manchmal, nie. Steht nur in diesem Kapitel, und das ist
       folgerichtig: Kapitel 1 bis 3 handeln von VERFAHREN, dort geht der
       dritte Zug nach aussen. Kapitel 4 handelt vom BEGRIFF; dort geht
       er nach innen.
*/

/* ───────── Das Venn als Zeichnung, nicht als Bild ─────────

   NEU (2026-08-21, Rikes Rueckmeldung «Ich kann die Fragezeichen nicht
   befuellen»): Das war kein Anzeigefehler. Der Auftrag sagte «Fuellen
   Sie sie», die Karte war aber ein fertiges Bild mit hineingezeichneten
   «?» - ein Eingabefeld gab es nirgends.

   Jetzt zeichnet die Flaeche das Venn selbst, aus DERSELBEN Geometrie
   wie das Kartenbild: zeichnen.geometrie() liefert sie, matplotlib
   liest sie fuer den Druck, und hier kommt sie als D.venn an. Zwei
   Zeichnungen, die auseinanderlaufen koennen, waeren genau der Fehler,
   den «Faktorisieren 2» hatte.

   Die Geometrie rechnet in matplotlib-Richtung - y waechst nach OBEN.
   SVG rechnet umgekehrt. Deshalb die eine Spiegelung in Y(). */
const VH = 100;                        // Hoehe des Zeichenfeldes
/* Angezeigt als A, B, C, intern M, V, W - siehe zeichnen.NAMEN. */
const NAME = f => (D.venn.beschriftung || {})[f] || f;
/* Die Legende ueber den Venns, siehe flaeche.legende(). */
const LEGENDE = () => `<div class="legendezeile">${D.legende || ''}</div>`;
const Y = y => VH - y;

/* Was der Nutzer in eine Luecke geschrieben hat. */
function vennWert(id, feld){
  return (stand.venn && stand.venn[id] && stand.venn[id][feld]) || '';
}

/* Prozentangabe zu Zahl. «12,5%» und «12.5» und «12,5 %» sind dasselbe.
   Gibt null zurueck, wenn nichts Brauchbares dasteht. */
function alsZahl(txt){
  if (txt === undefined || txt === null) return null;
  const t = String(txt).replace('%','').replace(',','.').trim();
  if (t === '') return null;
  const z = Number(t);
  return Number.isFinite(z) ? z : null;
}

/* Alle elf Groessen einer Erhebung: gedruckt plus selbst eingetragen -
   oder, mit `richtig`, plus die ausgerechnete Loesung (D aus
   inhalte._ausgefuellt). */
function vennAlle(e, richtig){
  const aus = {};
  Object.keys(e.werte).forEach(k => { aus[k] = alsZahl(e.werte[k]); });
  e.luecken.forEach(k => {
    aus[k] = alsZahl(richtig ? e.loesung[k] : vennWert(e.id, k));
  });
  return aus;
}

/* Die eigenen Zahlen gegen die richtigen, Feld fuer Feld.

   NEU (2026-10-13, Maurus' Rueckmeldung): «Wenn ich nachrechnen lasse,
   weiss ich nicht, ob die angegebenen Zahlen meine waren oder ob das die
   Loesung ist. Eine Gegenueberstellung der eigenen und der korrekten
   Loesung waere hilfreich.»

   Das ist hier unbedenklich, anders als in Etappe 2: Das Fuellen ist
   Rechnen, keine Diskussion. Und es ist noetig - wer sich verrechnet,
   findet sonst einen Widerspruch, den die Erhebung gar nicht hat, oder
   uebersieht einen, den sie hat. */
const NAEHE = 0.15;                    // in Prozentpunkten, fuer Rundung
function vergleich(e){
  return e.luecken.map(f => {
    const eig = alsZahl(vennWert(e.id, f));
    const soll = alsZahl(e.loesung[f]);
    return {feld: f, eig, soll,
            ok: eig !== null && Math.abs(eig - soll) <= NAEHE};
  });
}
const pz = z => String(Math.round(z * 10) / 10).replace('.', ',') + ' %';

/* Ein Venn als SVG. `editierbar` macht aus den Luecken Eingabefelder.
   `richtig` zeigt in den Luecken die ausgerechnete Loesung statt der
   eigenen Zahlen - gebraucht in Etappe 2, siehe dort. */
function vennBild(e, editierbar, richtig){
  const g = D.venn, teile = [];
  // GEAENDERT (2026-10-13, Rikes Entscheidung): Rahmen als Omega,
  // farbige Kreise, und die Gesamtwerte in gleichfarbigen Kaesten mit
  // einem Strich an ihren Kreis. Vorher standen sie klein in einer Zeile
  // unter dem Venn. Die Geometrie kommt aus zeichnen.geometrie(), wie
  // fuer das Kartenbild.
  const [rx0, ry0, rx1, ry1] = g.rahmen;
  teile.push(`<rect x="${rx0}" y="${Y(ry1)}" width="${rx1 - rx0}" `
           + `height="${ry1 - ry0}" class="vrahmen"/>`);
  teile.push(`<text x="${g.omega[0]}" y="${Y(g.omega[1])}" class="vrand">Ω</text>`);
  Object.entries(g.mitten).forEach(([n, [x, y]]) => {
    teile.push(`<circle cx="${x}" cy="${Y(y)}" r="${g.r}" class="vkreis" `
             + `style="stroke:${g.farben[n]}"/>`);
  });
  Object.entries(g.strich).forEach(([n, [[ax, ay], [bx, by]]]) => {
    teile.push(`<line x1="${ax}" y1="${Y(ay)}" x2="${bx}" y2="${Y(by)}" `
             + `class="vstrich" style="stroke:${g.farben[n]}"/>`);
  });

  const zelle = (feld, x, y, klasse) => {
    const gedruckt = e.werte[feld];
    if (gedruckt !== undefined)
      return `<text x="${x}" y="${Y(y)}" class="vwert ${klasse}">${gedruckt}</text>`;
    if (!editierbar){
      const eig = richtig ? e.loesung[feld] : vennWert(e.id, feld);
      return `<text x="${x}" y="${Y(y)}" class="vwert vselbst ${klasse}">`
           + `${eig || '?'}</text>`;
    }
    // foreignObject, weil ein <input> kein SVG-Element ist. Die Breite
    // ist so gewaehlt, dass «100%» hineinpasst, ohne den Nachbarn zu
    // beruehren.
    const bw = 15, bh = klasse === 'imkasten' ? 7.2 : 8.4;
    return `<foreignObject x="${x - bw/2}" y="${Y(y) - bh/2}" `
         + `width="${bw}" height="${bh}">`
         + `<input xmlns="http://www.w3.org/1999/xhtml" class="vfeld" `
         + `data-erh="${e.id}" data-feld="${feld}" `
         + `value="${vennWert(e.id, feld)}" placeholder="?"/></foreignObject>`;
  };

  Object.entries(g.felder).forEach(([feld, [x, y]]) => {
    teile.push(zelle(feld, x, y, ''));
  });
  // Die Kaesten: Name links, Wert rechts - wie im Kartenbild.
  Object.entries(g.kasten).forEach(([feld, k]) => {
    const [mx, my] = k.mitte, farbe = g.farben[feld] || 'var(--matt)';
    teile.push(`<rect x="${mx - k.b/2}" y="${Y(my) - k.h/2}" width="${k.b}" `
             + `height="${k.h}" rx="${k.h*0.18}" class="vkasten" data-feld="${feld}" `
             + `style="stroke:${farbe}"/>`);
    teile.push(`<text x="${mx - k.b/2 + k.h*0.25}" y="${Y(my)}" `
             + `class="${feld === 'aus' ? 'vrand' : 'vname'} vlinks" `
             + `style="fill:${farbe}">${feld === 'aus' ? 'aussen' : NAME(feld)}</text>`);
    teile.push(zelle(feld, mx + k.b/2 - k.h*0.92, my, 'imkasten'));
  });

  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox', `0 0 100 ${VH}`);
  svg.setAttribute('class','venn');
  svg.innerHTML = teile.join('');
  svg.querySelectorAll('input.vfeld').forEach(f => {
    // Das Feld darf das Ziehen nicht ausloesen - sonst nimmt man die
    // Karte mit, statt hineinzuschreiben.
    f.addEventListener('pointerdown', ev => ev.stopPropagation());
    f.addEventListener('click', ev => ev.stopPropagation());
    f.addEventListener('input', () => {
      // Das Urteil vom letzten Nachrechnen gilt nicht mehr.
      f.classList.remove('vrichtig','vfalsch');
      stand.venn = stand.venn || {};
      stand.venn[e.id] = stand.venn[e.id] || {};
      stand.venn[e.id][f.dataset.feld] = f.value;
      merken();
    });
  });
  return svg;
}

/* Eine Erhebung als Karte mit gezeichnetem Venn und ihrem Namen.
   Herausgeloest am 2026-10-13: Zug 2 und Etappe 2 bauten dasselbe je
   fuer sich, und beiden fehlte der Name - das Kartenbild trug ihn, das
   Venn nicht. In Etappe 2 liess sich deshalb nicht sagen, WELCHE der
   drei man meint (Maurus schrieb «#3»). */
function vennKarte(id, richtig, art){
  const e0 = D.e1.erhebungen.find(x=>x.id===id.split('#')[0]);
  const el = karte(id, undefined, art);
  const bild = el.querySelector('img');
  if (bild && e0){
    bild.remove();
    el.appendChild(vennBild(e0, false, richtig));
    el.classList.add('vennkarte');
    const name = document.createElement('span');
    name.className = 'vennid'; name.textContent = e0.id;
    el.appendChild(name);
    // NEU (2026-10-13, Rikes Befund «Wo sehen die Studierenden das n?»):
    // Das n stand nur in der Kopfzeile von Etappe 1 - auf den Karten in
    // Etappe 2, wo es gebraucht wird, fehlte es.
    if (e0.n){
      const n = document.createElement('span');
      n.className = 'vennn';
      n.textContent = `n = ${e0.n.toLocaleString('de-CH')} Beobachtungen`;
      el.appendChild(n);
    }
  }
  return el;
}

/* Die drei Bedingungen - dieselben, die der Generator prueft.
   Sie werden auf DIE EIGENEN ZAHLEN angewandt, nicht gegen eine
   hinterlegte Loesung. Das ist der Punkt des Kapitels: Die Axiome
   entscheiden, ob eine Verteilung moeglich ist - nicht, ob sie stimmt. */
const RAENDER = {M:['nurM','MV','MW','MVW'], V:['nurV','MV','VW','MVW'],
                 W:['nurW','MW','VW','MVW']};
const INNEN = ['nurM','nurV','nurW','MV','MW','VW','MVW','aus'];
const TOLERANZ = 0.25;                 // in Prozentpunkten

function nachrechnen(e, richtig){
  const w = vennAlle(e, richtig), offen = [], verstoss = [];
  Object.keys(w).forEach(k => { if (w[k] === null) offen.push(k); });
  if (INNEN.every(f => w[f] !== null)){
    const summe = INNEN.reduce((s,f) => s + w[f], 0);
    if (Math.abs(summe - 100) > TOLERANZ)
      verstoss.push(`Die acht Felder ergeben zusammen ${summe.toFixed(1)
        .replace('.',',')} % statt 100 %.`);
  }
  Object.entries(RAENDER).forEach(([rand, fs]) => {
    if (w[rand] === null || fs.some(f => w[f] === null)) return;
    const summe = fs.reduce((s,f) => s + w[f], 0);
    if (Math.abs(summe - w[rand]) > TOLERANZ)
      verstoss.push(`${NAME(rand)} ist mit ${w[rand].toString().replace('.',',')} % `
        + `angegeben, die Felder darin ergeben ${summe.toFixed(1)
        .replace('.',',')} %.`);
  });
  Object.entries(w).forEach(([f, v]) => {
    if (v !== null && v < -TOLERANZ)
      verstoss.push(`${(D.feldnamen && D.feldnamen[f]) || f} ist negativ.`);
  });
  return {offen, verstoss};
}

/* ───────── Etappe 1 — in ZWEI ZUEGEN ─────────

   NEU (2026-08-21, Rikes Rueckmeldung): «Also dem wär's wahrscheinlich
   gut, wenn wir hier gestaffelt einblenden und man erst nur die
   Venn-Diagramme, die man ausfüllen kann, in Ruhe. Und dann die Fragen
   füllt.»

     Zug 1  FUELLEN     Die acht Erhebungen liegen als Venn-Diagramme
                        nebeneinander. Man fuellt die Luecken. Nichts
                        wird gezogen, nichts wird einsortiert.
     Zug 2  EINORDNEN   Jetzt erst werden es Karten, die zu dem Axiom
                        gelegt werden, gegen das sie verstossen.

   WAS «Nachrechnen» PRUEFT - GEAENDERT am 2026-10-13: Bis dahin prueften
   die drei Bedingungen nur die selbst eingetragenen Zahlen, ohne
   hinterlegte Loesung. Maurus konnte daraufhin nicht sagen, ob die
   Zahlen in der Rueckmeldung seine waren oder die richtigen. Jetzt zwei
   getrennte Antworten, als solche beschriftet:
     1. Ihre Zahlen gegen die ausgerechneten Luecken (vergleich()).
     2. Der Widerspruch der ERHEBUNG - gerechnet mit den richtigen
        Zahlen, damit ein eigener Rechenfehler keinen erfindet.
   Die Pointe von Etappe 2 bleibt unberuehrt: Verglichen wird das
   Ausrechnen, nicht die Frage, welche Erhebung zutrifft.
*/
function etappe1(){
  if (!stand.zug) stand.zug = 1;
  if (stand.zug === 2) return etappe1einordnen();

  const a = D.etappen[0];
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 1 · Zug 1 — Füllen',
    text:'Jede Erhebung hat Lücken. <b>Füllen Sie sie</b> — rechnen Sie die '
       // GEAENDERT (2026-10-13, Rike): Der Nachsatz «Wogegen eine
       // Erhebung verstoesst, ist hier noch nicht die Frage. Das kommt im
       // zweiten Zug» ist weg - er muss da noch nicht stehen.
       + 'fehlenden Angaben aus dem aus, was dasteht.'},
    'Die acht Erhebungen — zum Füllen', 'Woran es scheitern kann',
    `<button class="knopf leer" id="leeren" title="Alle Eingaben löschen">↺</button>
     <button class="knopf" id="nachrechnen">Nachrechnen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Weiter: Was ist nicht erfüllt? →</button>`,
    LEGENDE());

  const tisch = document.getElementById('tisch');
  tisch.innerHTML = '';
  const raster = document.createElement('div');
  raster.className = 'vennraster';
  D.e1.erhebungen.forEach(e=>{
    const kasten = document.createElement('div');
    kasten.className = 'vennplatz'; kasten.dataset.erh = e.id;
    const kopf = document.createElement('div');
    kopf.className = 'vennkopf';
    kopf.innerHTML = `<b>${e.id}</b>`
      + (e.n ? `<span class="zart"> · ${e.n} Beobachtungen</span>` : '');
    kasten.appendChild(kopf);
    kasten.appendChild(vennBild(e, true));
    const sagt = document.createElement('div');
    sagt.className = 'vennbefund'; kasten.appendChild(sagt);
    raster.appendChild(kasten);
  });
  tisch.appendChild(raster);

  // GEAENDERT (2026-10-13, Rikes Entscheidung): Rechts standen hier die
  // Axiome und Folgerungen zum Nachschlagen. Gebraucht werden sie erst in
  // Zug 2, als Karten. Ohne die Spalte haben die acht Venns die ganze
  // Breite und sind von Anfang an groesser (Rike: «koennen wir die Karten
  // schon von Anfang an groesser machen?»).
  document.getElementById('rechts').style.display = 'none';
  document.querySelectorAll('.buehne > .teiler').forEach(t => t.style.display = 'none');
  window._neuzeichnen = ()=>{};
  window._nachAblegen = ()=>{};

  document.getElementById('leeren').onclick = ()=>{
    stand.venn = {}; merken(); etappe1();
  };

  document.getElementById('nachrechnen').onclick = ()=>{
    let vollstaendig=0, mitWiderspruch=0, offen=0, verrechnet=0;
    D.e1.erhebungen.forEach(e=>{
      const kasten = raster.querySelector(`[data-erh="${e.id}"]`);
      const sagt = kasten.querySelector('.vennbefund');
      kasten.classList.remove('stimmt','widerspruch');

      // Erstens: jedes eigene Feld gegen die richtige Zahl.
      const vgl = vergleich(e);
      vgl.forEach(v=>{
        const f = kasten.querySelector(`input.vfeld[data-feld="${v.feld}"]`);
        if (!f) return;
        f.classList.remove('vrichtig','vfalsch');
        if (v.eig !== null) f.classList.add(v.ok ? 'vrichtig' : 'vfalsch');
      });
      const fehlen = vgl.filter(v => v.eig === null).length;
      const daneben = vgl.filter(v => v.eig !== null && !v.ok);
      const teile = [];
      if (daneben.length){
        verrechnet++;
        teile.push(`<div class="titel">${daneben.length === 1
          ? 'Eine Ihrer Zahlen weicht ab:' : `${daneben.length} Ihrer Zahlen `
          + 'weichen ab:'}</div><div class="gegen">`
          + '<span></span><span>Ihre Zahl</span><span>richtig</span>'
          + daneben.map(v => `<span>${(D.feldnamen && D.feldnamen[v.feld])
              || v.feld}</span><span class="eig">${pz(v.eig)}</span>`
              + `<span class="soll">${pz(v.soll)}</span>`).join('')
          + '</div>'
          // NEU (2026-10-13, Rikes Wunsch «ggf. noch mit Pop-Up, wie
          // gerechnet wurde»): aufklappbar, damit der Befund kurz bleibt.
          // Der Weg kommt aus inhalte._ausgefuellt(), jede Zahl gerechnet.
          + '<details class="weg"><summary>Wie gerechnet?</summary>'
          + '<div class="zart">alle Angaben in %</div>'
          + e.rechenweg.map(z => `<div>${z}</div>`).join('')
          + '</details>');
      }
      if (fehlen){
        offen++;
        teile.push(`${fehlen} ${fehlen === 1 ? 'Angabe fehlt' : 'Angaben fehlen'}`
          + ' noch.');
        sagt.className = 'vennbefund' + (daneben.length ? ' schlimm' : '');
        sagt.innerHTML = teile.join('');
        return;
      }
      if (!daneben.length) teile.push('<div class="titel">Ihre Zahlen stimmen.</div>');

      // Zweitens: der Widerspruch der Erhebung selbst - mit den
      // RICHTIGEN Zahlen gerechnet, damit ein Rechenfehler keinen
      // erfindet und keinen verdeckt.
      vollstaendig++;
      const r = nachrechnen(e, true);
      if (r.verstoss.length){
        mitWiderspruch++;
        kasten.classList.add('widerspruch');
        sagt.className = 'vennbefund schlimm';
        teile.push((daneben.length ? 'Mit den richtigen Zahlen: ' : '')
          + r.verstoss.join('<br>'));
      } else {
        kasten.classList.add('stimmt');
        sagt.className = 'vennbefund gut';
        teile.push(daneben.length ? 'Mit den richtigen Zahlen: kein Widerspruch.'
                                  : 'Kein Widerspruch.');
      }
      sagt.innerHTML = teile.join('');
    });
    const satz = [];
    if (offen) satz.push(offen === 1 ? 'Eine Erhebung ist noch nicht vollständig.'
                                     : `${offen} Erhebungen sind noch nicht vollständig.`);
    if (verrechnet) satz.push(`Bei ${verrechnet} weicht mindestens eine `
      + 'Ihrer Zahlen ab — rot markiert, die richtige steht darunter.');
    if (vollstaendig) satz.push(`${vollstaendig} durchgerechnet, `
      + `davon ${mitWiderspruch} mit Widerspruch.`);
    if (!offen && vollstaendig) satz.push('Weiter zum zweiten Zug: '
      + 'Was genau ist bei jeder nicht erfüllt?');
    document.getElementById('befund').textContent = satz.join(' ');
  };

  document.getElementById('weiter').onclick = ()=>{ stand.zug = 2; etappe1(); };
}

/* ───────── Etappe 1 · Zug 2 — Was ist nicht erfuellt? ─────────

   NEU GEFASST (2026-10-13, Rikes Entscheidung): Vorher waren die drei
   Axiome Faecher, in die man die Erhebungen legte, und die vier
   Folgerungen lagen nur als kleine Nachschlagekaertchen daneben. Rike:
   «es ist dennoch nicht gut, wenn wir die Axiome und Folgerungen
   unterschiedliche Ebenen haben. Sollte man ggf. zu den Erhebungen
   immer Axiome und Folgerungen hineinziehen?»

   Genau so steht es im Skript-Auftrag (Reflexion_A4.tex, Phase 2):
   «Ordnen Sie jeder Erhebung die Karten zu, die bei ihr NICHT erfuellt
   sind ... Welche Karten treten gemeinsam auf, welche allein?»

   Jetzt umgekehrt: Die acht Erhebungen sind die Felder, im selben
   Raster wie in Zug 1. Die sieben Karten K1-K3 und F3-F6 liegen links
   und werden per Kopiergeste hineingezogen - die Karte bleibt liegen,
   zur Erhebung wandert eine Kopie. Die Loesung ist gerechnet
   (inhalte.verstoesse). F4 passt nirgends: Das leere Ereignis hat im
   Venn kein Feld. Wer F4 nirgends hinlegt, hat es richtig gemacht.

   In den Luecken stehen jetzt die RICHTIGEN Zahlen - in Zug 1 sind sie
   den eigenen gegenuebergestellt worden, und wer sich verrechnet hatte,
   faende sonst Verstoesse, die die Erhebung gar nicht hat. */
const E1_KARTEN = () => D.e1.axiome.concat(D.e1.folgerungen).map(x => x.id);

/* Fertig sortiertes Brett fuer loesungsKnopf(). */
function _loesungStandE1Zug2(){
  const karten = {};
  let n = 0;
  E1_KARTEN().forEach(id => { karten[id] = {ort:'tisch', x:0, y:0, rot:0}; });
  D.e1.erhebungen.forEach(e => e.verstoesse.forEach(k => {
    karten[k + '#loesung' + (++n)] = {ort:e.id, x:0, y:0, rot:0};
  }));
  return {karten};
}

function etappe1einordnen(){
  loesungAnwenden(_loesungStandE1Zug2);
  const a = D.etappen[0];
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 1 · Zug 2 — Was ist nicht erfüllt?',
    text:'Ziehen Sie die <b>Axiome</b> und <b>Folgerungen</b> zu den '
       + 'Erhebungen, bei denen sie <b>nicht</b> erfüllt sind. '
       + '<span class="zart">Eine Karte bleibt dabei liegen — zur Erhebung '
       + 'wandert eine Kopie. So lässt sich jede Karte bei mehreren '
       + 'Erhebungen ablegen. In den Lücken stehen jetzt die richtigen '
       + 'Zahlen.</span>'},
    'Axiome und Folgerungen', 'Die acht Erhebungen',
    `<button class="knopf leer" id="zurueck" title="Alle Karten zurück">↺</button>
     <button class="knopf leer" id="zurueckzug">← zurück zum Füllen</button>
     <button class="knopf" id="pruefen">Prüfen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Etappe 2 →</button>`,
    LEGENDE(), '', [0.62, 1.6]);

  const feld = document.getElementById('feld'), tisch = document.getElementById('tisch');
  const els = {};
  const grund = id => id.split('#')[0];
  const KB = () => parseFloat(getComputedStyle(document.documentElement)
                     .getPropertyValue('--kb'));
  // Die Karten tragen ihren Satz als TEXT, nicht als Druckbild - das
  // Bild ist fuer Papier gesetzt und auf dem Bildschirm zu klein.
  const SATZ = {};
  D.e1.axiome.concat(D.e1.folgerungen).forEach(x => { SATZ[x.id] = x.satz; });
  const kartenEl = id => {
    const el = karte(id);
    const bild = el.querySelector('img');
    if (bild){
      bild.remove();
      const g = grund(id);
      const t = document.createElement('div');
      t.className = 'satzkarte' + (g.startsWith('F') ? ' folgerung' : '');
      t.innerHTML = `<span class="nr">${g}</span><div>${SATZ[g]}</div>`;
      el.appendChild(t);
    }
    return el;
  };

  // Die sieben Karten liegen links geordnet, nicht gestreut: erst die
  // Axiome, dann die Folgerungen. Sie sind der Vorrat - jede liegt immer
  // da, und nach jedem Ablegen wieder an ihrem Platz.
  function vorratLegen(){
    const kb = KB(), kh = kb * 0.845;
    const spalten = Math.max(1, Math.floor(((tisch.clientWidth || 300) - 8) / (kb + 8)));
    let y = 24;
    [D.e1.axiome, D.e1.folgerungen].forEach(gruppe => {
      gruppe.forEach((x, i) => {
        const el = els[x.id]; if (!el) return;
        if (el.parentElement !== tisch) tisch.appendChild(el);
        el._x = 8 + (i % spalten) * (kb + 8);
        el._y = y + Math.floor(i / spalten) * (kh + 8);
        el._rot = 0; pos(el);
      });
      y += Math.ceil(gruppe.length / spalten) * (kh + 8) + 14;
    });
    tisch.style.minHeight = (y + 20) + 'px';
  }

  E1_KARTEN().forEach(id => { els[id] = kartenEl(id); });
  Object.keys(stand.karten).filter(id => id.includes('#')).forEach(id => {
    if (E1_KARTEN().includes(grund(id)) && !els[id]) els[id] = kartenEl(id);
  });

  function felder(){
    feld.querySelectorAll('.feld').forEach(d => d.remove());
    const kb = KB(), kh = kb * 0.845;
    const bb = feld.clientWidth || 640;
    // Zwei Karten sollen nebeneinander passen.
    const min = kb * 2 + 26;
    const spalten = Math.max(1, Math.floor((bb - 8) / (min + 10)));
    const b = (bb - 16 - (spalten - 1) * 10) / spalten;
    D.e1.erhebungen.forEach((e, i) => {
      const d = document.createElement('div');
      d.className = 'feld erhfeld'; d.dataset.ort = e.id;
      d.style.left = (8 + (i % spalten) * (b + 10)) + 'px';
      d.style.width = b + 'px';
      const kopf = document.createElement('div');
      kopf.className = 'kopf';
      kopf.innerHTML = `<span class="nr">${e.id}</span>`
        + (e.n ? `<span class="zart">${e.n} Beobachtungen</span>` : '');
      kopf.appendChild(vennBild(e, false, true));
      d.appendChild(kopf);
      feld.appendChild(d);
      d.style.height = (kopf.offsetHeight + kh + 24) + 'px';
    });
    Object.entries(stand.karten).forEach(([id, st]) => {
      const el = els[id]; if (!el || !id.includes('#')) return;
      const ziel = feld.querySelector(`[data-ort="${st.ort}"]`);
      if (ziel) ziel.appendChild(el);
    });
    vorratLegen();
    gitterSetzen(feld);
  }
  window._neuzeichnen = felder;
  window._nachAblegen = () => {
    const geaendert = kopierGeste({
      tisch, els, bauen: kartenEl,
      ziele: () => [...feld.querySelectorAll('.feld')],
    });
    vorratLegen();
    gitterSetzen(feld);
    if (geaendert) merken();
  };
  felder();
  merken();

  document.getElementById('zurueck').onclick = () => {
    stand.karten = {}; stand.dupl = 0;
    document.getElementById('befund').textContent = '';
    etappe1einordnen();
  };
  document.getElementById('zurueckzug').onclick = () => { stand.zug = 1; etappe1(); };

  document.getElementById('pruefen').onclick = () => {
    document.querySelectorAll('.k').forEach(k => k.classList.remove('ok','falsch','fastok'));
    let stimmt = 0, daneben = 0, fehlt = 0;
    D.e1.erhebungen.forEach(e => {
      const d = feld.querySelector(`[data-ort="${e.id}"]`);
      const da = new Set();
      [...d.querySelectorAll(':scope > .k')].forEach(k => {
        const g = grund(k.dataset.id); da.add(g);
        const ok = e.verstoesse.includes(g);
        k.classList.add(ok ? 'ok' : 'falsch');
        ok ? stimmt++ : daneben++;
      });
      e.verstoesse.forEach(g => { if (!da.has(g)) fehlt++; });
    });
    stand.geprueft = true;
    const satz = [`${stimmt} richtig gelegt.`];
    if (daneben) satz.push(`${daneben} ${daneben === 1 ? 'liegt' : 'liegen'} `
      + 'bei einer Erhebung, bei der die Karte erfüllt ist.');
    if (fehlt) satz.push(`${fehlt} ${fehlt === 1 ? 'fehlt' : 'fehlen'} noch.`);
    if (!daneben && !fehlt) satz.push('Vollständig. <b>Erkennen Sie eine '
      + 'Ordnung? Welche Karten treten gemeinsam auf, welche allein?</b> '
      + 'Drei Erhebungen sind leer geblieben — die sehen Sie in Etappe 2.');
    document.getElementById('befund').innerHTML = satz.join(' ');
  };
  document.getElementById('weiter').onclick = () => { stand.etappe = 1; los(); };
  loesungsKnopf(() => etappe1einordnen());
}

/* ───────── Etappe 2 · Die drei, gegen die nichts spricht ─────────

   NEU GEFASST (2026-10-13, Rikes Rueckmeldung und Entscheidungen):
   «Das Feld ‹Was sagen die Axiome dazu?› macht keinen Sinn, das ist doch
   die Bernoulli-Ungleichung und nicht die Axiome. Sie haben alle drei
   Zulaessigen und darunter das Tool zum Austesten. Und dann muss man
   eine Karte auswaehlen und anhand der Karte verschiedene Tests
   durchlaufen. Das muss aber angeleitet werden.»

   Dass die Axiome nicht entscheiden, steht jetzt im Auftrag. Darunter
   vier Schritte, einer nach dem anderen (die erledigten bleiben stehen),
   neben dem Werkzeug. Bruecke ist die Laplace-Annahme aus Kapitel 1-3,
   wie im Skript-Auftrag der Phase 3.

   Was das Werkzeug prueft, ist EIN Ereignis, nicht «die Erhebung»
   (Rike: «wir pruefen nicht die ganze Erhebung, sondern einzelne Werte,
   h_n(M), h_n(V) ...»). Deshalb steht ueberall h_n(M), p(M). Waehlbar
   sind M, V und W - per Klick auf den Kasten im Venn oder per Knopf.
   Bei W liegen alle drei nahe am Modell: ein guter Anlass fuer «passt
   bei einem Ereignis heisst nicht, das Modell stimmt». Die Schnittfelder
   bleiben bewusst draussen - mit elf Ereignissen findet man irgendwann
   zufaellig eines, das nicht passt.

   n jetzt fuer alle drei (2000, 100, 10), wie im Skript - siehe
   inhalte.N_ZUSATZ. Die 95 % in Schritt 3 sind vorgegeben (Rike:
   «tendiere zu vorgeben, aber du entscheidest»). */
const SICHER = 0.95;
const NWERTE = [10, 20, 30, 40, 50, 60, 80, 100, 120, 150, 200, 250, 300,
                400, 500, 600, 800, 1000, 1200, 1500, 2000, 2500, 3000,
                4000, 5000, 6000, 8000, 10000, 15000, 20000];
const nStufe = n => NWERTE.reduce((b, v, i) =>
  Math.abs(v - n) < Math.abs(NWERTE[b] - n) ? i : b, 0);

function etappe2(){
  const a = D.etappen[1];
  // GEAENDERT (2026-10-13, Rikes Rueckmeldung zur ersten Fassung: «Die
  // Erhebungen oben nehmen viel Platz, und unten muss man sehr stark hin
  // und her scrollen. Ich haette die drei Erhebungen gerne links
  // untereinander ... daneben werden alle Schritte oben nebeneinander
  // eingeblendet, und der ganze untere Teil ist dann fuer das
  // Untersuchungsinstrument.»)
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 2 · Drei, gegen die nichts spricht',
    text:'Das sind die drei Erhebungen, die Sie in Etappe 1 als <b>möglich</b> '
       + 'erkannt haben. Die Axiome lassen alle drei zu — welche die Eisdiele '
       + 'richtig beschreibt, entscheiden sie nicht. Hier wird nicht mehr '
       + 'ausgefüllt. Prüfen Sie stattdessen, ob ein <b>Modell</b> zu den '
       + 'Erhebungen passt: In Kapitel 1 bis 3 galt jede Sorte als gleich '
       + 'beliebt.'},
    'Die drei möglichen Erhebungen', 'Das Modell prüfen',
    `<span class="zart">Ein Klick auf A, B oder C in einer Erhebung wählt das Ereignis.</span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Etappe 3 →</button>`,
    LEGENDE(), '', [0.42, 1.7]);

  const B = D.e2.bernoulli, MO = D.e2.modell;
  const st = stand.bern = Object.assign(
    {erh: D.e2.drei[0].id, ereignis: 'M', stufe: nStufe(100), eps: 0.1, schritt: 0},
    stand.bern || {});
  if (st.stufe === undefined || st.stufe >= NWERTE.length) st.stufe = nStufe(100);

  /* Links: die drei Karten untereinander, fest. Ein Klick auf einen
     Kasten waehlt Erhebung und Ereignis. */
  const oben = document.getElementById('tisch');
  const kb = parseFloat(getComputedStyle(document.documentElement)
              .getPropertyValue('--kb'));
  const bb = oben.clientWidth || 300;
  const breit = Math.min(kb * 1.5, bb - 20);
  let y = 26;
  D.e2.drei.forEach((d, i) => {
    const el = vennKarte(d.id, true, {fest: true});
    el.style.width = breit + 'px';
    oben.appendChild(el);
    el._x = Math.max(8, (bb - breit) / 2);
    el._y = y; pos(el);
    y += el.offsetHeight + 12;
    el.querySelectorAll('.vkasten').forEach(r => {
      const f = r.dataset.feld;
      if (!'MVW'.includes(f) || f.length !== 1) return;
      r.style.cursor = 'pointer';
      r.addEventListener('click', ev => {
        ev.stopPropagation(); st.erh = d.id; st.ereignis = f; waehlen();
      });
    });
  });
  oben.style.minHeight = (y + 8) + 'px';

  /* Rechts: oben die Schritte nebeneinander, darunter ueber die ganze
     Breite das Werkzeug - links die Einstellungen, rechts was sie
     ergeben. */
  const unten = document.getElementById('feld');
  unten.innerHTML =
      `<div class="pruefen3">`
    + `<div class="schritte reihe" id="schritte"></div>`
    + `<div class="bernoulli breit" id="bernoulli"><div class="bspalte">`
    + `<div class="satz">${B.satz}</div>`
    + `<div class="formel">${B.formel}</div>`
    + `<div class="modell" id="bmodell"></div>`
    + `<div class="zeile"><span class="lab">Erhebung</span><span class="bwahl" id="bwe">`
    + D.e2.drei.map(d => `<button class="knopf leer" data-erh="${d.id}">${d.id}</button>`).join(' ')
    + `</span></div>`
    + `<div class="zeile"><span class="lab">Ereignis</span><span class="bwahl" id="bwa">`
    + ['M','V','W'].map(f => `<button class="knopf leer" data-ereignis="${f}" `
        + `style="--kfarbe:${D.venn.farben[f]}">${NAME(f)}</button>`).join(' ')
    + `</span><span class="zart" id="bh"></span></div>`
    + `<div class="zeile"><span class="lab">n</span>`
    + `<input type="range" id="bn" min="0" max="${NWERTE.length - 1}" step="1">`
    + `<span class="wert" id="bnw"></span></div>`
    + `<div class="zeile"><span class="lab">&#949;</span>`
    + `<input type="range" id="be" min="0.01" max="0.4" step="0.01">`
    + `<span class="wert" id="bew"></span></div>`
    + `</div><div class="bspalte">`
    + `<svg class="strahl" viewBox="0 0 300 58" id="bstrahl"></svg>`
    + `<div class="ergebnis" id="bergebnis"></div>`
    + `<div class="quelle">${B.quelle}</div>`
    + `</div></div></div>`;

  const X = v => 10 + v * 2.8;
  const erh = () => D.e2.drei.find(d => d.id === st.erh);
  const k1 = (z, d) => z.toFixed(d === undefined ? 1 : d).replace('.', ',');
  const hn = f => `h<sub>n</sub>(${NAME(f)})`;

  /* Die vier Schritte.

     GEAENDERT (2026-10-13, Rike: «Die Schritte sollten nicht auf E2
     ausgerichtet sein, sondern so, dass sie sie fuer alle E's machen
     koennen»). Schritt 1 bis 3 gelten fuer die GEWAEHLTE Erhebung und das
     gewaehlte Ereignis, Schritt 4 vergleicht. Wer fertig ist, faengt mit
     der naechsten Erhebung von vorn an. Die Antworten in Schritt 2 und 3
     werden je Erhebung und Ereignis gemerkt - sonst ueberschriebe E7, was
     man zu E2 geschrieben hat. */
  const wahl = () => `${st.erh}, ${NAME(st.ereignis)}`;
  const SCHRITTE = [
    {titel: 'Erhebung und Ereignis wählen',
     text: () => `Wählen Sie links eine der drei Erhebungen und darin ein `
       + `Ereignis: ein Klick auf <b>A</b>, <b>B</b> oder <b>C</b>. Stellen Sie `
       + `dann n auf die Zahl ihrer Beobachtungen.`,
     erfuellt: () => NWERTE[st.stufe] === erh().n},
    {titel: 'Wie wahrscheinlich?',
     text: () => `<span class="zart">${wahl()}</span><br>Stellen Sie &#949; so `
       + `ein, dass ${hn(st.ereignis)} gerade <b>ausserhalb</b> des Bandes `
       + `liegt. <b>Wenn das Modell stimmt:</b> Mit welcher Wahrscheinlichkeit `
       + `liegt ${hn(st.ereignis)} bei so vielen Beobachtungen näher als &#949; `
       + `an p(${NAME(st.ereignis)})? Was heisst das für das Modell?`,
     schreib: () => `e2s2_${st.erh}_${st.ereignis}`},
    {titel: 'Wie gross müsste die Erhebung sein?',
     text: () => `<span class="zart">${wahl()}</span><br>Angenommen, die `
       + `Erhebung hätte dieselben Anteile, aber eine andere Zahl von `
       + `Beobachtungen. Lassen Sie &#949; stehen und verändern Sie n: `
       + `<b>Ab welchem n</b> wären Sie sich zu mindestens `
       + `${k1(SICHER*100, 0)} % sicher, dass das Modell nicht passt?`,
     schreib: () => `e2s3_${st.erh}_${st.ereignis}`},
    {titel: 'Vergleichen',
     text: () => `Gehen Sie die Schritte 1 bis 3 auch mit den anderen `
       + `Erhebungen und Ereignissen durch. Vergleichen Sie dann: Wo `
       + `widerspricht eine Erhebung dem Modell, wo nicht — und wo sagt die `
       + `Ungleichung gar nichts? Bei einer Erhebung kommt etwas `
       + `Merkwürdiges heraus: Was bedeutet das?`,
     schreib: () => 'e2s4'},
  ];
  function schritteZeigen(){
    const box = document.getElementById('schritte');
    box.innerHTML = '';
    SCHRITTE.forEach((sch, i) => {
      const d = document.createElement('div');
      // Alle vier stehen nebeneinander; die kommenden nur mit Titel,
      // damit man sieht, wohin es geht, ohne vorauszulesen.
      if (i > st.schritt){
        d.className = 'schritt kommt';
        d.innerHTML = `<div class="skopf"><span class="nr">${i + 1}</span>${sch.titel}</div>`;
        box.appendChild(d);
        return;
      }
      d.className = 'schritt' + (i === st.schritt ? ' jetzt' : ' erledigt');
      const ok = sch.erfuellt && sch.erfuellt();
      d.innerHTML = `<div class="skopf"><span class="nr">${i + 1}</span>${sch.titel}`
        + (sch.erfuellt ? `<span class="haken">${ok ? '✓' : ''}</span>` : '')
        + `</div><div class="stext">${sch.text()}</div>`;
      if (sch.schreib){
        const schl = sch.schreib();
        const t = document.createElement('textarea');
        t.className = 'schreibfeld'; t.placeholder = 'Ihre Antwort …';
        t.value = stand.texte[schl] || '';
        t.oninput = () => { stand.texte[schl] = t.value; };
        d.appendChild(t);
      }
      if (i === st.schritt){
        const w = document.createElement('button');
        w.className = 'knopf leer';
        if (i < SCHRITTE.length - 1){
          w.textContent = 'Nächster Schritt →';
          w.onclick = () => { st.schritt++; merken(); schritteZeigen(); };
        } else {
          w.textContent = '↺ Mit einer anderen Erhebung von vorn';
          w.onclick = () => { st.schritt = 0; merken(); schritteZeigen(); };
        }
        d.appendChild(w);
      }
      box.appendChild(d);
    });
  }

  function waehlen(){
    const d = erh();
    // Bei einer anderen Erhebung beginnt n wieder bei 100 - es soll
    // eingestellt werden, nicht von der vorigen Karte mitkommen.
    if (st._zuletzt !== d.id) { st.stufe = nStufe(100); st._zuletzt = d.id; }
    document.getElementById('bn').value = st.stufe;
    document.querySelectorAll('#bwe [data-erh]').forEach(b =>
      b.classList.toggle('an', b.dataset.erh === d.id));
    document.querySelectorAll('#bwa [data-ereignis]').forEach(b =>
      b.classList.toggle('an', b.dataset.ereignis === st.ereignis));
    oben.querySelectorAll('.k').forEach(k => {
      k.classList.toggle('gewaehlt', k.dataset.id === d.id);
      // Passt nicht alles in die Spalte, rollt die gewaehlte ins Bild.
      // Von Hand gerechnet: scrollIntoView() kennt nur den Platz OHNE
      // die Verschiebung, mit der die Karte gesetzt ist.
      if (k.dataset.id === d.id){
        let r = k.parentElement;
        while (r && r !== document.body){
          const o = getComputedStyle(r).overflowY;
          if ((o === 'auto' || o === 'scroll') && r.scrollHeight > r.clientHeight) break;
          r = r.parentElement;
        }
        if (r && r !== document.body){
          const kr = k.getBoundingClientRect(), rr = r.getBoundingClientRect();
          if (kr.bottom > rr.bottom) r.scrollBy({top: kr.bottom - rr.bottom + 10, behavior: 'smooth'});
          else if (kr.top < rr.top) r.scrollBy({top: kr.top - rr.top - 10, behavior: 'smooth'});
        }
      }
    });
    rechnen();
    // Text und Antwortfeld der Schritte haengen an der Wahl.
    if (document.getElementById('schritte').childElementCount) schritteZeigen();
  }

  function rechnen(){
    const d = erh(), f = st.ereignis, p = MO.p[f], h = d.h[f];
    st.stufe = +document.getElementById('bn').value;
    st.eps = +document.getElementById('be').value;
    const n = NWERTE[st.stufe], eps = st.eps;
    document.getElementById('bmodell').innerHTML =
      `Modell «alle Sorten gleich beliebt»: p(${NAME(f)}) = ${MO.herleitung[f]} `
      + `≈ <b>${pz(p)}</b>`;
    document.getElementById('bh').innerHTML = `${hn(f)} von ${d.id} = ${pz(h)}`;
    document.getElementById('bnw').textContent = n.toLocaleString('de-CH')
      + (n === d.n ? ' · wie bei ' + d.id : ` · ${d.id} hat ${d.n.toLocaleString('de-CH')}`);
    document.getElementById('bew').textContent =
      `${k1(eps, 2)} (${Math.round(eps * 100)} Prozentpunkte)`;

    const lo = Math.max(0, p - eps * 100), hi = Math.min(100, p + eps * 100);
    let sv = `<rect x="${X(lo)}" y="14" width="${X(hi) - X(lo)}" height="16" rx="3" class="band"/>`
           + `<line x1="${X(0)}" y1="22" x2="${X(100)}" y2="22" class="achse"/>`;
    [0, 50, 100].forEach(v => {
      sv += `<line x1="${X(v)}" y1="19" x2="${X(v)}" y2="25" class="achse"/>`
          + `<text x="${X(v)}" y="55" class="tick" style="text-anchor:`
          + `${v === 0 ? 'start' : v === 100 ? 'end' : 'middle'}">${v} %</text>`;
    });
    sv += `<line x1="${X(p)}" y1="9" x2="${X(p)}" y2="35" class="p"/>`
        + `<text x="${X(p)}" y="7" class="pt">p(${NAME(f)})</text>`
        + `<circle cx="${X(h)}" cy="22" r="4.5" class="h"/>`
        + `<text x="${X(h)}" y="43" class="ht">h(${NAME(f)})</text>`;
    document.getElementById('bstrahl').innerHTML = sv;

    const schranke = 1 - 1 / (4 * n * eps * eps);
    const formel = `1 − 1 / (4 · ${n.toLocaleString('de-CH')} · ${k1(eps, 2)}²) `
      + `= <b>${k1(schranke, 3)}</b>`;
    const aus = document.getElementById('bergebnis');
    if (schranke <= 0){
      // Die Pointe der alten Skriptfrage - und bei E4 (n = 10) das
      // «Merkwuerdige» aus dem Skript-Hinweis.
      aus.className = 'ergebnis leer';
      aus.innerHTML = `${formel}<br>Damit sagt die Ungleichung <b>nichts</b>: `
        + `Jede Wahrscheinlichkeit ist ohnehin mindestens null.`;
    } else {
      const drin = Math.abs(h - p) < eps * 100;
      aus.className = 'ergebnis gut';
      aus.innerHTML = `${formel}<br>Wenn das Modell stimmt, liegt ${hn(f)} bei `
        + `${n.toLocaleString('de-CH')} Beobachtungen mit mindestens `
        + `<b>${k1(schranke * 100)} %</b> Wahrscheinlichkeit im Band `
        + `(${schranke >= SICHER ? 'das sind' : 'weniger als'} ${k1(SICHER*100, 0)} %). `
        + `${hn(f)} von ${d.id} liegt ` + (drin ? '<b>im Band</b>.' : '<b>ausserhalb</b>.');
    }
    // Schritt 1 hakt sich selbst ab.
    const haken = document.querySelector('.schritt .haken');
    if (haken) haken.textContent = SCHRITTE[0].erfuellt() ? '✓' : '';
  }

  document.getElementById('be').value = st.eps;
  ['bn','be'].forEach(id => document.getElementById(id)
    .addEventListener('input', () => { rechnen(); merken(); }));
  document.querySelectorAll('#bwe [data-erh]').forEach(b =>
    b.onclick = () => { st.erh = b.dataset.erh; waehlen(); });
  document.querySelectorAll('#bwa [data-ereignis]').forEach(b =>
    b.onclick = () => { st.ereignis = b.dataset.ereignis; waehlen(); });
  st._zuletzt = st.erh;
  schritteZeigen();
  waehlen();

  window._neuzeichnen = () => etappe2();
  window._nachAblegen = null;
  document.getElementById('weiter').onclick = () => { stand.etappe = 2; los(); };
  loesungsHinweis(D.loesung_e2);
}

/* ───────── Etappe 3 · Immer, manchmal, nie ─────────
   Die acht Aussagen sind keine allgemeinen Merksaetze, sondern genau
   das, was in Etappe 1 und 2 erlebt wurde. Die Merkkarte zum
   Bernoullischen Satz liegt daneben - an ihr lassen sich die beiden
   «manchmal» begruenden statt aus dem Bauch. */
/* Fertig sortiertes Brett fuer loesungsKnopf() - jede Aussage unter
   ihre richtige Antwort (D.e3.aussagen[].antwort ist 'immer'/'manchmal'
   /'nie', genau die dataset.ort-Werte der drei Faecher unten). */
function _loesungStandE3(){
  const karten = {};
  D.e3.aussagen.forEach(s => { karten[s.id] = {ort: s.antwort, x:0, y:0, rot:0}; });
  return {karten};
}

function etappe3(){
  loesungAnwenden(_loesungStandE3);
  const a = D.etappen[2];
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 3 · Immer, manchmal, nie',
    text:'Acht Aussagen über das, was Sie gerade erlebt haben. Gilt jede '
       + '<b>immer</b>, <b>manchmal</b> oder <b>nie</b>? '
       // GEAENDERT (2026-10-13): Hier stand «Zwei davon sind nur mit
       // manchmal zu beantworten - fuer die liegt rechts eine Merkkarte
       // bereit». Beides stimmte nicht mehr: Es sind jetzt vier (siehe
       // inhalte.AUSSAGEN), und die Merkkarte liegt seit dem 21.08. nicht
       // mehr da. Stattdessen der Auftrag aus dem Skript.
       + '<span class="zart">Begründen Sie jede Einordnung an einer Erhebung, '
       + 'die Sie bearbeitet haben — bei «manchmal» an einer, bei der es '
       + 'zutrifft, und an einer, bei der nicht.</span>'},
    'Die acht Aussagen', 'Ihre Einordnung',
    `<button class="knopf leer" id="zurueck" title="Alle Karten zurück">↺</button>
     <button class="knopf" id="pruefen">Prüfen</button>
     <span class="befund" id="befund"></span>`,
    '', 'Zum Danebenlegen');

  const feld = document.getElementById('feld'), tisch = document.getElementById('tisch');
  const els = {};
  D.e3.aussagen.forEach(s=>{ els[s.id] = karte(s.id); });

  function felder(){
    feld.querySelectorAll('.feld').forEach(d=>d.remove());
    const kb = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--kb'));
    const bb = feld.clientWidth||520, fh = Math.max(kb*1.35, 140);
    D.e3.faecher.forEach((f,i)=>{
      const d=document.createElement('div');
      d.className='feld'; d.dataset.ort=f;
      d.style.left='8px'; d.style.top=(26+i*(fh+10))+'px';
      d.style.width=(bb-16)+'px'; d.style.height=fh+'px';
      d.innerHTML=`<div class="kopf"><span class="nr">${i+1}</span>${f}</div>`;
      feld.appendChild(d);
    });
    feld.style.minHeight=(26+D.e3.faecher.length*(fh+10)+20)+'px';
    Object.entries(stand.karten).forEach(([id,s])=>{
      const el=els[id]; if(!el) return;
      const ziel = s.ort==='tisch' ? tisch
        : (feld.querySelector(`[data-ort="${s.ort}"]`)||tisch);
      ziel.appendChild(el); el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el);
    });
    faecherSetzen(feld);
  }
  window._neuzeichnen = felder;
  window._nachAblegen = ()=>faecherSetzen(feld);
  felder();

  // NEU (2026-08-21, Rikes Entscheidung): Die Merkkarte mit dem Satz vom
  // Gesetz der grossen Zahlen liegt hier NICHT mehr daneben. Sie war die
  // Stuetze fuer die beiden Aussagen, die nach der Zahl der
  // Beobachtungen fragen - diese Arbeit leistet jetzt die
  // Bernoulli-Ungleichung in Etappe 2, und zwar zum Ausprobieren statt
  // zum Nachlesen. Rike: «dann brauchen wir das zum Danebenlegen in
  // Etappe drei nicht mehr.»
  //
  // PRUEFEN: Rikes Satz davor - «der wär tatsächlich eher für …» - ist
  // abgebrochen. Wofuer die Merkkarte sonst gedacht war, ist offen. Sie
  // ist nicht geloescht: Das Kartenbild wird weiter gebaut, und
  // D.e3.merkkarte nennt es. Nur die Flaeche legt es nicht mehr hin.
  const ablage = document.getElementById('ablage');
  if (ablage) ablage.innerHTML = '';

  const neu = D.e3.aussagen.filter(s=>!(s.id in stand.karten)).map(s=>els[s.id]);
  if (neu.length){ streuen(neu, tisch); merken(); }

  document.getElementById('zurueck').onclick = ()=>{
    stand.karten={}; document.getElementById('befund').textContent='';
    etappe3();
  };
  document.getElementById('pruefen').onclick = ()=>{
    document.querySelectorAll('.k').forEach(k=>
      k.classList.remove('ok','falsch','fastok'));
    let stimmt=0, gelegt=0;
    D.e3.aussagen.forEach(s=>{
      const st = stand.karten[s.id];
      if (!st || st.ort==='tisch') return;
      gelegt++;
      const ok = st.ort === s.antwort;
      els[s.id].classList.add(ok?'ok':'falsch');
      if (ok) stimmt++;
    });
    stand.geprueft = true;
    const b = document.getElementById('befund');
    if (!gelegt){ b.textContent='Es liegt noch nichts in den Fächern.'; return; }
    b.innerHTML = `${stimmt} von ${gelegt} richtig.`
      + (stimmt === D.e3.aussagen.length
         ? ' Zwei der <b>manchmal</b> handeln vom Verhältnis zwischen '
           + 'Stichprobengrösse und Abweichung — dort hilft das Werkzeug '
           + 'aus Etappe 2.'
         : '');
  };
  loesungsKnopf(() => etappe3());
}

ETAPPEN.push(etappe1, etappe2, etappe3);
