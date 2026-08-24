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

/* Alle elf Groessen einer Erhebung: gedruckt plus selbst eingetragen. */
function vennAlle(e){
  const aus = {};
  Object.keys(e.werte).forEach(k => { aus[k] = alsZahl(e.werte[k]); });
  e.luecken.forEach(k => { aus[k] = alsZahl(vennWert(e.id, k)); });
  return aus;
}

/* Ein Venn als SVG. `editierbar` macht aus den Luecken Eingabefelder. */
function vennBild(e, editierbar){
  const g = D.venn, teile = [];
  Object.values(g.mitten).forEach(([x, y]) => {
    teile.push(`<circle cx="${x}" cy="${Y(y)}" r="${g.r}" class="vkreis"/>`);
  });
  Object.entries(g.namen).forEach(([n, [x, y]]) => {
    teile.push(`<text x="${x}" y="${Y(y)}" class="vname">${n}</text>`);
  });

  const zelle = (feld, x, y, klasse) => {
    const gedruckt = e.werte[feld];
    if (gedruckt !== undefined)
      return `<text x="${x}" y="${Y(y)}" class="vwert ${klasse}">${gedruckt}</text>`;
    if (!editierbar){
      const eig = vennWert(e.id, feld);
      return `<text x="${x}" y="${Y(y)}" class="vwert vselbst ${klasse}">`
           + `${eig || '?'}</text>`;
    }
    // foreignObject, weil ein <input> kein SVG-Element ist. Die Breite
    // ist so gewaehlt, dass «100%» hineinpasst, ohne den Nachbarn zu
    // beruehren.
    const bw = 15, bh = 8.4;
    return `<foreignObject x="${x - bw/2}" y="${Y(y) - bh/2}" `
         + `width="${bw}" height="${bh}">`
         + `<input xmlns="http://www.w3.org/1999/xhtml" class="vfeld" `
         + `data-erh="${e.id}" data-feld="${feld}" `
         + `value="${vennWert(e.id, feld)}" placeholder="?"/></foreignObject>`;
  };

  Object.entries(g.felder).forEach(([feld, [x, y]]) => {
    teile.push(zelle(feld, x, y, ''));
  });
  Object.entries(g.rand).forEach(([feld, [x, y]]) => {
    teile.push(`<text x="${x}" y="${Y(y)}" class="vrand">`
             + `${feld === 'aus' ? 'aussen' : feld}</text>`);
    teile.push(zelle(feld, x, y - g.randabstand, 'vklein'));
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
      stand.venn = stand.venn || {};
      stand.venn[e.id] = stand.venn[e.id] || {};
      stand.venn[e.id][f.dataset.feld] = f.value;
      merken();
    });
  });
  return svg;
}

/* Die drei Bedingungen - dieselben, die der Generator prueft.
   Sie werden auf DIE EIGENEN ZAHLEN angewandt, nicht gegen eine
   hinterlegte Loesung. Das ist der Punkt des Kapitels: Die Axiome
   entscheiden, ob eine Verteilung moeglich ist - nicht, ob sie stimmt. */
const RAENDER = {M:['nurM','MV','MW','MVW'], V:['nurV','MV','VW','MVW'],
                 W:['nurW','MW','VW','MVW']};
const INNEN = ['nurM','nurV','nurW','MV','MW','VW','MVW','aus'];
const TOLERANZ = 0.25;                 // in Prozentpunkten

function nachrechnen(e){
  const w = vennAlle(e), offen = [], verstoss = [];
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
      verstoss.push(`${rand} ist mit ${w[rand].toString().replace('.',',')} % `
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

   WAS «Nachrechnen» PRUEFT - und was nicht: Es prueft die DREI
   BEDINGUNGEN an den selbst eingetragenen Zahlen. Es gibt keine
   hinterlegte Loesung, gegen die verglichen wuerde, und das ist kein
   Mangel: Die Axiome sagen, ob eine Verteilung MOEGLICH ist, nicht ob
   sie stimmt. Genau das ist die Pointe von Etappe 2.
*/
function etappe1(){
  if (!stand.zug) stand.zug = 1;
  if (stand.zug === 2) return etappe1einordnen();

  const a = D.etappen[0];
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 1 · Zug 1 — Füllen',
    text:'Jede Erhebung hat Lücken. <b>Füllen Sie sie</b> — rechnen Sie die '
       + 'fehlenden Angaben aus dem aus, was dasteht. '
       + '<span class="zart">Wogegen eine Erhebung verstösst, ist hier noch '
       + 'nicht die Frage. Das kommt im zweiten Zug.</span>'},
    'Die acht Erhebungen — zum Füllen', 'Woran es scheitern kann',
    `<button class="knopf leer" id="leeren" title="Alle Eingaben löschen">↺</button>
     <button class="knopf" id="nachrechnen">Nachrechnen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Weiter: Wogegen verstösst sie? →</button>`);

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

  // Rechts steht, WORAN es scheitern kann - die drei Axiome und die
  // vier Folgerungen zum Nachschlagen. Ohne sie waere «Nachrechnen»
  // ein Orakel: Man saehe, dass etwas nicht stimmt, aber nicht, warum
  // das ueberhaupt ein Einwand ist.
  const feld = document.getElementById('feld');
  feld.innerHTML = '';
  const liste = document.createElement('div');
  liste.className = 'axiomliste';
  D.e1.axiome.forEach(x=>{
    liste.innerHTML += `<div class="axiom"><span class="nr">${x.id}</span>${x.satz}</div>`;
  });
  D.e1.folgerungen.forEach(x=>{
    liste.innerHTML += `<div class="axiom folgerung"><span class="nr">${x.id}</span>${x.satz}</div>`;
  });
  feld.appendChild(liste);
  window._neuzeichnen = ()=>{};
  window._nachAblegen = ()=>{};

  document.getElementById('leeren').onclick = ()=>{
    stand.venn = {}; merken(); etappe1();
  };

  document.getElementById('nachrechnen').onclick = ()=>{
    let vollstaendig=0, mitWiderspruch=0, offen=0;
    D.e1.erhebungen.forEach(e=>{
      const r = nachrechnen(e);
      const kasten = raster.querySelector(`[data-erh="${e.id}"]`);
      const sagt = kasten.querySelector('.vennbefund');
      kasten.classList.remove('stimmt','widerspruch');
      if (r.offen.length){
        offen++;
        sagt.className = 'vennbefund';
        sagt.textContent = `${r.offen.length} Angaben fehlen noch.`;
        return;
      }
      vollstaendig++;
      if (r.verstoss.length){
        mitWiderspruch++;
        kasten.classList.add('widerspruch');
        sagt.className = 'vennbefund schlimm';
        sagt.innerHTML = r.verstoss.join('<br>');
      } else {
        kasten.classList.add('stimmt');
        sagt.className = 'vennbefund gut';
        sagt.textContent = 'Kein Widerspruch.';
      }
    });
    const satz = [];
    if (offen) satz.push(`${offen} Erhebungen sind noch nicht vollständig.`);
    if (vollstaendig) satz.push(`${vollstaendig} durchgerechnet, `
      + `davon ${mitWiderspruch} mit Widerspruch.`);
    if (!offen && vollstaendig) satz.push('Weiter zum zweiten Zug: '
      + 'Wogegen genau verstösst jede?');
    document.getElementById('befund').textContent = satz.join(' ');
  };

  document.getElementById('weiter').onclick = ()=>{ stand.zug = 2; etappe1(); };
}

/* ───────── Etappe 1 · Zug 2 — Einordnen ───────── */
/* Fertig sortiertes Brett fuer loesungsKnopf() - jede Erhebung zu dem
   Axiom, das sie verletzt (D.e1.erhebungen[].verletzt ist eine Liste -
   zwei Erhebungen verstossen gegen zwei Axiome zugleich und brauchen
   eine Kartenkopie). Keine Verletzung -> Fach 'ok'. */
function _loesungStandE1Zug2(){
  const karten = {};
  let n = 0;
  D.e1.erhebungen.forEach(e=>{
    const ziele = e.verletzt.length ? e.verletzt : ['ok'];
    ziele.forEach((ort, i)=>{
      const id = i === 0 ? e.id : (e.id + '#loesung' + (++n));
      karten[id] = {ort, x:0, y:0, rot:0};
    });
  });
  return {karten};
}

function etappe1einordnen(){
  loesungAnwenden(_loesungStandE1Zug2);
  const a = D.etappen[0];
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 1 · Zug 2 — Einordnen',
    text:'Jetzt die Frage, die im ersten Zug offen blieb: <b>Wogegen verstösst '
       + 'jede Erhebung?</b> Legen Sie sie zu dem Axiom, das sie verletzt. '
       + '<span class="zart">Ihre eigenen Zahlen stehen auf den Karten. '
       + 'Verstösst eine gegen <b>zwei</b> Axiome, legen Sie sie mit dem '
       + '<b>+</b> zweimal.</span>'},
    'Die acht Erhebungen', 'Wogegen verstösst sie?',
    `<button class="knopf leer" id="zurueck" title="Alle Karten zurück">↺</button>
     <button class="knopf leer" id="zurueckzug">← zurück zum Füllen</button>
     <button class="knopf" id="pruefen">Prüfen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Etappe 2 →</button>`,
    '', 'Folgerungen');

  const feld = document.getElementById('feld'), tisch = document.getElementById('tisch');
  const els = {};
  const grund = id => id.split('#')[0];

  function mitPlus(id, fehlt){
    // NEU (2026-08-21): Die Karte traegt das Venn als ZEICHNUNG, nicht
    // mehr als Bild - mit den Zahlen, die im ersten Zug eingetragen
    // wurden. Sonst stuenden hier wieder Fragezeichen, obwohl die Werte
    // laengst gerechnet sind.
    //
    // Die Marke «Es fehlen: …» entfaellt damit: Was fehlt, ist im
    // ersten Zug gefuellt worden, und wo noch eine Luecke steht, sieht
    // man sie im Venn selbst.
    const e0 = D.e1.erhebungen.find(x=>x.id===grund(id));
    const el = karte(id);
    const bild = el.querySelector('img');
    if (bild && e0){ bild.remove(); el.appendChild(vennBild(e0, false));
                     el.classList.add('vennkarte'); }
    const d = document.createElement('div');
    d.className='dop'; d.textContent='+'; d.title='Karte verdoppeln';
    d.onclick = ev=>{ ev.stopPropagation();
      const kid = grund(id)+'#'+(++stand.dupl);
      const kopie = mitPlus(kid, fehlt); els[kid]=kopie;
      el.parentElement.appendChild(kopie);
      kopie._x=el._x+14; kopie._y=el._y+14; pos(kopie); merken();
      if (el.parentElement.classList.contains('feld')) gruppeOrdnen(el.parentElement);
    };
    el.appendChild(d);
    return el;
  }
  D.e1.erhebungen.forEach(e=>{ els[e.id] = mitPlus(e.id, e.fehlt); });
  Object.keys(stand.karten).filter(id=>id.includes('#')).forEach(id=>{
    if (!els[id]){
      const e = D.e1.erhebungen.find(x=>x.id===grund(id));
      els[id] = mitPlus(id, e && e.fehlt);
    }
  });

  // Die drei Axiome sind die Faecher, dazu eines fuer «nichts
  // einzuwenden». Die vier FOLGERUNGEN liegen nur daneben und sind
  // KEIN Fach: «Eine Erhebung kann allein an einer Folgerung
  // scheitern» ist eine der Aussagen in Etappe 3, und die Antwort
  // lautet NIE. Ein Fach dafuer naehme sie vorweg.
  const FAECHER = D.e1.axiome.map(x=>({ort:x.id, kopf:x.id, satz:x.satz}))
    .concat([{ort:'ok', kopf:'✓', satz:'Dagegen ist nichts einzuwenden.'}]);

  function felder(){
    feld.querySelectorAll('.feld').forEach(d=>d.remove());
    const kb = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--kb'));
    const bb = feld.clientWidth||520, fh = Math.max(kb*1.25, 130);
    FAECHER.forEach((f,i)=>{
      const d = document.createElement('div');
      d.className='feld'; d.dataset.ort=f.ort;
      d.style.left='8px'; d.style.top=(26+i*(fh+10))+'px';
      d.style.width=(bb-16)+'px'; d.style.height=fh+'px';
      d.innerHTML=`<div class="kopf"><span class="nr">${f.kopf}</span>${f.satz}</div>`;
      feld.appendChild(d);
    });
    feld.style.minHeight=(26+FAECHER.length*(fh+10)+20)+'px';
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

  // Die Folgerungen in die dritte Spalte, zum Nachschlagen.
  const ablage = document.getElementById('ablage');
  if (ablage){
    ablage.innerHTML = '';
    D.e1.folgerungen.forEach(f=>{
      const k = karte(f.id);
      k.style.position='relative'; k.style.margin='8px auto';
      k.style.display='block'; k.style.cursor='default';
      ablage.appendChild(k);
    });
  }

  const neu = D.e1.erhebungen.filter(e=>!(e.id in stand.karten)).map(e=>els[e.id]);
  if (neu.length){ streuen(neu, tisch); merken(); }

  document.getElementById('zurueck').onclick = ()=>{
    stand.karten={}; stand.dupl=0;
    document.getElementById('befund').textContent='';
    etappe1einordnen();
  };
  document.getElementById('zurueckzug').onclick = ()=>{
    stand.zug = 1; etappe1();
  };

  document.getElementById('pruefen').onclick = ()=>{
    document.querySelectorAll('.k').forEach(k=>
      k.classList.remove('ok','falsch','fastok'));
    const gelegt = {};
    Object.entries(stand.karten).forEach(([id,s])=>{
      if (s.ort==='tisch' || !els[id]) return;
      (gelegt[grund(id)] = gelegt[grund(id)] || new Set()).add(s.ort);
    });
    let stimmt=0, daneben=0, fehlt=0;
    Object.entries(stand.karten).forEach(([id,s])=>{
      const el=els[id]; if(!el || s.ort==='tisch') return;
      const e = D.e1.erhebungen.find(x=>x.id===grund(id));
      const soll = e.verletzt.length ? e.verletzt : ['ok'];
      const ok = soll.includes(s.ort);
      el.classList.add(ok?'ok':'falsch');
      ok ? stimmt++ : daneben++;
    });
    D.e1.erhebungen.forEach(e=>{
      const soll = e.verletzt.length ? e.verletzt : ['ok'];
      soll.forEach(x=>{ if(!(gelegt[e.id] && gelegt[e.id].has(x))) fehlt++; });
    });
    stand.geprueft = true;
    const satz=[`${stimmt} richtig zugeordnet.`];
    if (daneben) satz.push(`${daneben} liegen beim falschen Axiom.`);
    if (fehlt) satz.push(`${fehlt} Zuordnungen fehlen noch — zwei Erhebungen `
      + `verstossen gegen <b>zwei</b> Axiome.`);
    if (!daneben && !fehlt) satz.push('Vollständig. Drei Erhebungen bleiben '
      + 'übrig, gegen die nichts spricht — die sehen Sie in Etappe 2.');
    document.getElementById('befund').innerHTML = satz.join(' ');
  };
  document.getElementById('weiter').onclick = ()=>{ stand.etappe=1; los(); };
  loesungsKnopf(() => etappe1einordnen());
}

/* ───────── Etappe 2 · Die drei, gegen die nichts spricht ─────────
   Kein Sortieren. Drei Erhebungen liegen nebeneinander, alle zulaessig,
   mit verschiedenen Zahlen. Die Frage «welche stimmt?» hat keine
   Antwort - und GENAU DAS ist die Einsicht. */
function etappe2(){
  const a = D.etappen[1];
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 2 · Drei, gegen die nichts spricht',
    text:'Diese drei Erhebungen haben Sie in Etappe 1 nicht verwerfen können. '
       + 'Ihre Zahlen sind <b>verschieden</b>. '
       + '<span class="zart">Welche beschreibt die Eisdiele richtig? '
       + 'Schreiben Sie Ihre Antwort auf, bevor Sie weiterlesen.</span>'},
    'Ihre Antwort', 'Alle drei sind zulässig',
    `<button class="knopf leer" id="aufloesen">Was sagen die Axiome dazu?</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Etappe 3 →</button>`);

  const feld = document.getElementById('feld'), tisch = document.getElementById('tisch');
  const kb = parseFloat(getComputedStyle(document.documentElement)
              .getPropertyValue('--kb'));

  // Rechts: die drei nebeneinander, gross genug zum Vergleichen.
  const bb = feld.clientWidth||520;
  const breit = Math.min(kb*1.5, (bb-40)/1);
  let y = 26;
  D.e2.vertraeglich.forEach(id=>{
    // FEHLERBEHOBEN (2026-08-21): Hier stand das KARTENBILD - mit den
    // Fragezeichen darin. Wer in Etappe 1 gerechnet hat, bekam seine
    // Luecken wieder als «?» zurueck, und der Vergleich der drei Zahlen,
    // um den es hier geht, war gar nicht moeglich. Jetzt dasselbe
    // gezeichnete Venn wie dort, mit den eigenen Werten.
    const e0 = D.e1.erhebungen.find(x=>x.id===id);
    const el = karte(id);
    const bild = el.querySelector('img');
    if (bild && e0){ bild.remove(); el.appendChild(vennBild(e0, false));
                     el.classList.add('vennkarte'); }
    el.style.width = breit+'px';
    feld.appendChild(el);
    el._x = (bb - breit)/2; el._y = y; pos(el);
    y += breit*0.845 + 12;
  });
  feld.style.minHeight = (y+20)+'px';

  // Links: ein Schreibfeld fuer die eigene Antwort.
  const kasten = document.createElement('div');
  kasten.className='feld'; kasten.dataset.ort='antwort';
  kasten.style.left='8px'; kasten.style.top='12px';
  kasten.style.width=((tisch.clientWidth||320)-16)+'px';
  kasten.style.height=(kb*1.6)+'px';
  kasten.innerHTML='<div class="kopf">Welche der drei stimmt — und woran '
                 + 'erkennen Sie das?</div>';
  const schreib = document.createElement('textarea');
  schreib.className='schreibfeld';
  schreib.placeholder='Ihre Antwort …';
  schreib.value = stand.texte['e2antwort'] || '';
  schreib.oninput = ()=>{ stand.texte['e2antwort'] = schreib.value; };
  kasten.appendChild(schreib);
  tisch.appendChild(kasten);

  window._neuzeichnen = ()=>etappe2();
  window._nachAblegen = null;

  document.getElementById('aufloesen').onclick = ()=>{
    document.getElementById('befund').innerHTML =
      '<b>Sie entscheiden es nicht.</b> Alle drei erfüllen jedes Axiom. '
      + 'Die Axiome sagen, welche Verteilungen <i>möglich</i> sind — nicht, '
      + 'welche <i>zutrifft</i>. Dafür braucht es Beobachtungen: '
      + `${D.e2.mit_n.join(', ')} ist die einzige mit einer angegebenen `
      + 'Stichprobengrösse.';
    bernoulli();
  };

  /* Die Bernoulli-Ungleichung, zum Ausprobieren.

     NEU (2026-08-21, Rikes Entscheidung): «Wenn man erst diskutieren
     lässt bei Etappe zwei und dann eben auch nicht diesen Satz, sondern
     die Bernoulli-Ungleichung … dass man so ein Eingabefeld hat, dass
     man die relevanten Werte einsetzen muss, um zu sehen, wie gross die
     Wahrscheinlichkeit ist.»

     Sie kommt ERST NACH der Auflösung. Vorher wäre sie die Antwort vor
     der Frage: Die Einsicht «die Axiome entscheiden es nicht» muss
     stehen, bevor man fragt, was denn dann.

     Die Schranke hängt NICHT von p ab. Genau deshalb ist sie hier
     bedienbar - man braucht die gesuchte Wahrscheinlichkeit nicht zu
     kennen, um zu sehen, wie scharf die Aussage wäre. */
  function bernoulli(){
    if (document.getElementById('bernoulli')) return;
    const B = D.e2.bernoulli;
    const k = document.createElement('div');
    k.className = 'bernoulli'; k.id = 'bernoulli';
    // FEHLERBEHOBEN (2026-08-21): Der Antwortkasten ist absolut
    // gesetzt; ein Kasten im normalen Fluss beginnt deshalb ganz oben
    // und legte sich darueber. Er bekommt seinen Platz DARUNTER.
    k.style.position = 'absolute';
    k.style.left = '8px'; k.style.right = '8px';
    k.style.top = (12 + kb * 1.6 + 14) + 'px';
    k.innerHTML =
        `<div class="satz">${B.satz}</div>`
      + `<div class="formel">${B.formel}</div>`
      + `<div class="frage">${B.frage}</div>`
      + `<div class="rechner">`
      + `  <label>n <input id="bn" inputmode="numeric" value="${D.e2.n || B.n_start}"></label>`
      + `  <label>&#949; <input id="be" inputmode="decimal" value="${B.eps_start}"></label>`
      + `</div>`
      + `<div class="ergebnis" id="bergebnis"></div>`
      + `<div class="quelle">${B.quelle}</div>`;
    tisch.appendChild(k);
    tisch.style.minHeight = (k.offsetTop + k.offsetHeight + 20) + 'px';

    const rechnen = ()=>{
      const n = alsZahl(document.getElementById('bn').value);
      const e = alsZahl(document.getElementById('be').value);
      const aus = document.getElementById('bergebnis');
      if (n === null || e === null || n <= 0 || e <= 0){
        aus.className = 'ergebnis';
        aus.textContent = 'n und ε müssen beide grösser als null sein.';
        return;
      }
      const schranke = 1 - 1 / (4 * n * e * e);
      const z = schranke.toFixed(3).replace('.', ',');
      if (schranke <= 0){
        // Das ist die Pointe, und sie steht so schon im Skript: Fuer
        // n = 1000 und eps = 0,01 kommt -1,5 heraus. Eine
        // Wahrscheinlichkeit ist das nicht.
        aus.className = 'ergebnis leer';
        aus.innerHTML = `Die Schranke ist <b>${z}</b> — und damit sagt die `
          + `Ungleichung <b>nichts</b>. Jede Wahrscheinlichkeit ist grösser `
          + `als null. Bei dieser Zahl von Beobachtungen ist ε zu klein `
          + `gewählt.`;
        return;
      }
      aus.className = 'ergebnis gut';
      aus.innerHTML = `Mit <b>${n}</b> Beobachtungen liegt die relative `
        + `Häufigkeit mit einer Wahrscheinlichkeit von mindestens `
        + `<b>${z}</b> um weniger als <b>${String(e).replace('.', ',')}</b> `
        + `neben der theoretischen Wahrscheinlichkeit.`;
    };
    ['bn','be'].forEach(id =>
      document.getElementById(id).addEventListener('input', rechnen));
    rechnen();
  }
  document.getElementById('weiter').onclick = ()=>{ stand.etappe=2; los(); };
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
       + '<span class="zart">Zwei davon sind nur mit «manchmal» zu '
       + 'beantworten — für die liegt rechts eine Merkkarte bereit.</span>'},
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
         ? ' Die beiden <b>manchmal</b> handeln von derselben Sache: dem '
           + 'Verhältnis zwischen Stichprobengrösse und Abweichung. '
           + 'Begründen Sie sie an der Merkkarte.'
         : '');
  };
  loesungsKnopf(() => etappe3());
}

ETAPPEN.push(etappe1, etappe2, etappe3);
