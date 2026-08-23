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
function etappe1(){
  const a = D.etappen[0];
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 1 · Ordnen',
    text:'Diese Karten behaupten alle dasselbe: Sie schreiben auf, was bei '
       + 'Tims Bestellung herauskommen kann. <b>Fünf davon sind kaputt.</b> '
       + '<span class="zart">Prüfen Sie jede Karte an zwei Fragen: Kommt '
       + '<b>jeder</b> mögliche Ausgang darin vor? Und kommt jeder nur '
       + '<b>einmal</b> vor?</span>'},
    'Tisch — ungeordnet', 'Ihre Sortierung',
    `<button class="knopf leer" id="zurueck" title="Alle Karten zurück auf den Tisch">↺</button>
     <button class="knopf" id="pruefen">Prüfen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Etappe 2 →</button>`,
    praemisse('A'));

  const feld = document.getElementById('feld'), tisch = document.getElementById('tisch');
  const alle = D.e1.gueltig.concat(D.e1.kaputt);
  const els = {};
  alle.forEach(id => { els[id] = karte(id); });

  const FAECHER = [
    {ort:'gut',   name:'Passt zu Tims Bestellung'},
    {ort:'kaputt', name:'Ist kaputt'},
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

  const neu = alle.filter(id => !(id in stand.karten)).map(id => els[id]);
  if (neu.length){ streuen(neu, tisch); merken(); }

  document.getElementById('zurueck').onclick = ()=>{
    stand.karten = {}; document.getElementById('befund').textContent='';
    document.querySelectorAll('.k').forEach(k=>
      k.classList.remove('ok','falsch','fastok'));
    felder(); streuen(alle.map(id=>els[id]), tisch); merken();
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
    const offen = alle.length - gelegt;
    const b = document.getElementById('befund');
    if (!gelegt){ b.textContent = 'Es liegt noch nichts in den Fächern.'; return; }
    b.textContent = `${richtig} von ${gelegt} richtig.`
      + (offen ? ` ${offen} liegen noch auf dem Tisch.` : '')
      + (richtig === alle.length
         ? ' — Klicken Sie eine kaputte Karte an, um zu sehen, woran sie scheitert.'
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
}

/* ───────── Etappe 2 · Strategien ─────────
   Die Pointe: Eine GUELTIGE Menge kann fuer eine bestimmte Frage
   UNBRAUCHBAR sein. Sie landet erst, wenn mehrere gueltige
   nebeneinanderliegen - deshalb alle sechs, nicht eine Auswahl.
   M2 traegt alle zehn Ereignisse, M10k genau eines. */
function etappe2(){
  const a = D.etappen[1];
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 2 · Strategien',
    text:'Jetzt die Ereignisse. Legen Sie jedes Ereignis in <b>jede</b> Menge, '
       + 'in der es sich hinschreiben lässt — und <b>schreiben Sie es dort '
       + 'auch hin</b>, als Teilmenge dieser Ergebnismenge. '
       + '<span class="zart">Das Feld dafür erscheint, sobald die Karte in '
       + 'einer Menge liegt. Passt das Ereignis in mehrere, legen Sie mit '
       + 'dem <b>+</b> eine zweite Kopie an — und schreiben Sie es dort '
       + 'anders hin. Passt es in keine, lassen Sie es liegen.</span>'},
    'Ereignisse', 'Die sechs Mengen, die passen',
    `<button class="knopf leer" id="zurueck" title="Alle Karten zurück">↺</button>
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
  window._nachAblegen = reihenSetzen2;

  D.e2.ereignisse.forEach(id=>{ els[id] = mitPlus(id); });
  // Kopien aus einem frueheren Besuch wiederherstellen
  Object.keys(stand.karten).filter(id=>id.includes('#')).forEach(id=>{
    if (!els[id]) els[id] = mitPlus(id);
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
    feld.addEventListener('input', () => {
      stand.teilmenge = stand.teilmenge || {};
      stand.teilmenge[id] = feld.value;
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

  function mitPlus(id){
    const el = karte(id);
    teilmengenfeld(el, id);
    const d = document.createElement('div');
    d.className = 'dop'; d.textContent = '+'; d.title = 'Karte verdoppeln';
    d.onclick = ev => { ev.stopPropagation();
      const kid = grund(id) + '#' + (++stand.dupl);
      const kopie = mitPlus(kid); els[kid] = kopie;
      el.parentElement.appendChild(kopie);
      kopie._x = el._x + 14; kopie._y = el._y + 14; pos(kopie); merken();
      if (el.parentElement.classList.contains('feld')) reihenSetzen2();
    };
    el.appendChild(d);
    return el;
  }

  reihen();
  const neu = Object.keys(els).filter(id=>!(id in stand.karten)).map(id=>els[id]);
  if (neu.length){ streuen(neu, tisch); merken(); }
  teilmengenZeigen();

  document.getElementById('zurueck').onclick = ()=>{
    stand.karten = {}; stand.dupl = 0;
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
    D.e2.ereignisse.forEach(r=>{
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
    if (!zuviel && !fehlt){
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
      <p style="color:var(--matt)">Sie wissen jetzt, woran eine Ergebnismenge
         taugt — und dass eine gültige noch lange nicht für jede Frage
         brauchbar ist. Woran wollen Sie das erproben?</p>
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
    return;
  }
  stand.e3 === 'a' ? etappe3a() : etappe3b();
}

/* Weg A — in der Eisdiele bleiben. Situationen B und C. */
function etappe3a(){
  const a = D.etappen[2];
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 3 · Zwei weitere Bestellungen',
    text:'Dieselbe Eisdiele, zwei andere Bestellungen. Welche Mengenkarten '
       + 'passen jetzt? <span class="zart">Achtung: Eine Karte kann zu '
       + 'beiden passen — legen Sie sie dann mit dem <b>+</b> zweimal.</span>'},
    'Alle Mengenkarten', 'Situation B und C',
    `<button class="knopf leer" id="zurueck" title="Alle Karten zurück auf den Tisch">↺</button>
     <button class="knopf" id="pruefen">Prüfen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="andererweg" style="margin-left:auto">Doch der andere Weg</button>`,
    vergleichspunkt('A'));

  const feld = document.getElementById('feld'), tisch = document.getElementById('tisch');
  const alle = D.e3.wegA.mengen.concat(D.e1.gueltig);
  const els = {};
  const grund = id => id.split('#')[0];

  function mitPlus(id){
    const el = karte(id);
    const d = document.createElement('div');
    d.className='dop'; d.textContent='+'; d.title='Karte verdoppeln';
    d.onclick = ev=>{ ev.stopPropagation();
      const kid = grund(id)+'#'+(++stand.dupl);
      const kopie = mitPlus(kid); els[kid]=kopie;
      el.parentElement.appendChild(kopie);
      kopie._x=el._x+14; kopie._y=el._y+14; pos(kopie); merken();
      if (el.parentElement.classList.contains('feld')) gruppeOrdnen(el.parentElement);
    };
    el.appendChild(d);
    return el;
  }
  alle.forEach(id=>{ els[id]=mitPlus(id); });
  Object.keys(stand.karten).filter(id=>id.includes('#')).forEach(id=>{
    if (!els[id]) els[id]=mitPlus(id); });

  function felder(){
    feld.querySelectorAll('.feld').forEach(d=>d.remove());
    const kb = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--kb'));
    const bb = feld.clientWidth||520, fh = Math.max(kb*1.9, 170);
    D.e3.wegA.situationen.forEach((s,i)=>{
      const d=document.createElement('div');
      d.className='feld'; d.dataset.ort=s;
      d.style.left='8px'; d.style.top=(26+i*(fh+12))+'px';
      d.style.width=(bb-16)+'px'; d.style.height=fh+'px';
      d.innerHTML = `<div class="kopf"><span class="nr">${s}</span>${D.situationen[s]}</div>`;
      feld.appendChild(d);
    });
    feld.style.minHeight=(26+D.e3.wegA.situationen.length*(fh+12)+20)+'px';
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
  const neu = Object.keys(els).filter(id=>!(id in stand.karten)).map(id=>els[id]);
  if (neu.length){ streuen(neu, tisch); merken(); }

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
    D.e3.wegA.situationen.forEach(s=>{
      (D.e3.wegA.gueltig[s]||[]).forEach(m=>{
        if (!(gelegt[s]&&gelegt[s].has(m))) fehlt++; });
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
}

ETAPPEN.push(etappe1, etappe2, etappe3);
