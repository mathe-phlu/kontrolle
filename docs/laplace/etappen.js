/* Die drei Etappen von Kapitel 3 — «Wer die Wahl hat … oder nicht?».

   Entschieden mit Rike am 2026-08-21.

   Der Kern: Es geht NICHT darum, einen Rechenfehler zu finden. Alle
   Loesungswege sind sauber gerechnet. Es geht darum zu erkennen, dass
   ein KORREKT GERECHNETER Weg trotzdem nicht traegt - weil die gewaehlte
   Ergebnismenge nicht Laplace ist oder das Ereignis gar nicht traegt.
   Darum gibt es hier auch keine Distraktoren.

   E1  Ordnen       zehn Fragen, Versuche in drei Runden. Ein Brett,
                    das waechst.
   E2  Strategien   drei Prueffragen, eine je Stapel - auf demselben
                    Brett, die Karten bleiben liegen.
   E3  Uebertragen  sieben Transferkarten, sortiert nach den eigenen
                    Prueffragen aus E2.
*/

/* Ueber der Flaeche steht, was fuer ALLE Fragen gilt.

   UEBERHOLT (2026-08-21, Rikes Entscheidung): Hier standen beide
   Situationstexte nebeneinander, jeder mit seinem Buchstaben. Ihr
   Einwand: «Dadurch, dass wir oben A und B hinschreiben, machen wir
   diese Unterscheidung schon sehr, sehr explizit - das ist mir zu
   auffaellig.» Was sich unterscheidet, steht jetzt auf der Karte. */
function praemissen(){
  return `<div class="praemisse"><span>${D.lage}</span></div>`;
}

/* Ein Brett aus FESTEN Fragereihen — für Zug 2 und Etappe 2.

   In Zug 1 gibt es das seit dem 2026-08-21 nicht mehr: Dort liegen die
   Fragen MIT auf dem Tisch und werden selbst herübergezogen. Rikes
   Begründung, dieselbe wie in Kapitel 1: «Vielleicht ist es gar nicht
   die Situation, die Ihnen am sympathischsten ist.»

   Sobald die Zuordnung steht, ist ein festes Brett aber genau richtig -
   die Reihenfolge ist dann gewählt und soll liegen bleiben. */
function fragebrett(els, beweglich){
  const feld = document.getElementById('feld');
  feld.querySelectorAll('.feld').forEach(d=>d.remove());
  const kb = parseFloat(getComputedStyle(document.documentElement)
              .getPropertyValue('--kb'));
  const bb = feld.clientWidth || 520;
  D.fragen.forEach(f=>{
    const d = document.createElement('div');
    d.className = 'feld reihe'; d.dataset.ort = f.id;
    d.style.left = '8px'; d.style.width = (bb - 16) + 'px';
    // Kein Buchstabe mehr - die Unterscheidung steht auf der Karte.
    d.innerHTML = `<img class="reihenkopf" src="karten/${f.id}.svg" alt=""
             style="width:${kb * 0.72}px">`;
    feld.appendChild(d);
  });
  const tisch = document.getElementById('tisch');
  Object.entries(stand.karten).forEach(([id, s])=>{
    const el = els[id]; if (!el) return;
    const ziel = s.ort === 'tisch' ? tisch
      : (feld.querySelector(`[data-ort="${s.ort}"]`) || tisch);
    ziel.appendChild(el); el._x = s.x; el._y = s.y; el._rot = s.rot; pos(el);
    if (!beweglich) el.style.pointerEvents = 'none';
  });
  reihenSetzen(feld, 0.72);
}

/* NEU (Rikes Entscheidung, 2026-08-22): Die Ergebnismenge laesst sich
   EINBLENDEN. Auf der Karte steht die Vorschrift in Worten; die Menge
   ausgeschrieben danebenzustellen lehnt Rike aus Platzgruenden ab -
   «rein einfach aus Platzgruenden wuerd ich's im Moment so lassen».
   Ihr Gegenvorschlag ist dieser hier: «Aehnlich, wie wir's haben bei
   den Situationen oder bei den Urnenmodellen, wo man sich die Situation
   noch mal einblenden lassen koennte, koennte man sich dort die
   Ergebnismenge einblenden lassen.»

   Also dieselbe Marke mit derselben Blase wie bei den Situationen -
   nur traegt sie ein Ω statt einer Nummer, damit man ihr ansieht, was
   dahintersteckt.

   Sie verraet nichts: Ob eine Vorschrift Laplace ist, haengt daran, ob
   die Elemente von Ω gleich wahrscheinlich sind - und DAS liest man Ω
   nicht an, dafuer muss man auf die Durchfuehrungen zurueck. Die Blase
   macht sichtbar, WORUEBER geurteilt wird, nicht WIE das Urteil
   ausfaellt. Genau das war Rikes Befund an den Urteilsknoepfen: «Wer
   nicht sieht, worueber er urteilt, haelt den Knopf fuer wirkungslos.»

   Steht hier oben, weil alle drei Stellen, an denen eine
   Loesungskarte entsteht, dieselbe Blase brauchen - Etappe 1 Zug 1,
   Zug 2 und das Nachschlagebrett von Etappe 2. */
function loesungskarte(l){
  return karte(l.id, l.menge ? {text:'Ω', art:'sit', titel:l.menge} : null);
}

/* ───────── Etappe 1 · Ordnen — in ZWEI ZUEGEN ─────────

   NEU (2026-08-21, Rikes Entscheidung «sehr, sehr gut»): Bisher hatte
   Etappe 1 EINEN Auftrag und EINEN Pruefknopf, und der sagte beides auf
   einmal - gruen «am richtigen Ort und traegt», bernstein «am richtigen
   Ort, traegt aber nicht». Damit entschieden die Studierenden nie
   selbst, welcher Versuch traegt; die Flaeche sagte es ihnen. Das war
   Rikes Befund «die gesamte Sortierlogik stimmt noch nicht».

   Neu sind es zwei Zuege auf DEMSELBEN Brett:

     Zug 1  ZUORDNEN    Jeden Versuch zu der Frage legen, bei der er
                        vermutlich gerechnet wurde. Geprueft wird NUR
                        das. Ueber richtig und falsch faellt kein Wort.
     Zug 2  ENTSCHEIDEN Je Karte selbst setzen: traegt / traegt nicht.
                        Erst danach wird geprueft.

   Warum kein Fach «die richtige» und keines «die falsche»: Ihre Zahl
   wuerde verraten, wie viele Wege tragen. Rikes Bedingung war
   ausdruecklich, dass nichts vorweggenommen wird - mal tragen beide,
   mal einer von vieren. Am einzelnen Kaertchen zu urteilen laesst das
   offen.
*/
/* Fertig sortiertes Brett fuer loesungsKnopf() - nur fuer Zug 2, dessen
   Brett feste Reihen je Frage hat (dataset.ort = Fragen-ID direkt).
   Zug 1 hat ein dynamisches Brett wie Kombinatoriks Etappe 1 (Reihen
   werden erst durchs Herueberziehen einer Fragekarte eroeffnet) - dafuer
   gibt es hier bewusst keine Loesungsansicht, das waere derselbe Aufwand
   wie in Kombinatorik noch einmal, an einer Stelle ohne eigene Wertung. */
function _loesungStandZug2(){
  const karten = {};
  D.loesungen.forEach(l => { karten[l.id] = {ort: l.frage, x:0, y:0, rot:0}; });
  return {karten};
}

function etappe1(){
  const a = D.etappen[0];
  if (!stand.runde) stand.runde = 1;
  if (!stand.zug) stand.zug = 1;
  if (!stand.urteil) stand.urteil = {};
  const runde = D.runden.find(r=>r.nr === stand.runde) || D.runden[0];
  const letzte = stand.runde >= D.runden.length;
  const zug2 = stand.zug === 2;
  if (zug2) loesungAnwenden(_loesungStandZug2);

  const auftrag = zug2
    ? 'Bei manchen Fragen liegt jetzt <b>mehr als ein Versuch</b>. '
      + 'Entscheiden Sie für jeden einzeln: Trägt er — oder trägt er nicht? '
      + '<span class="zart">Alle sind sauber gerechnet. Die Frage ist nicht, '
      + 'ob jemand sich verrechnet hat, sondern ob die gewählte '
      + 'Ergebnismenge diese Frage überhaupt tragen kann.</span>'
    : 'Jede Lösungskarte ist ein <b>Versuch</b>: sauber gerechnet, richtig '
      + 'gezählt. Legen Sie jeden Versuch zu der Frage, bei der er '
      + '<b>vermutlich gerechnet wurde</b>. '
      + '<span class="zart">Ob er trägt, ist hier noch nicht die Frage — '
      + 'das kommt im zweiten Zug.</span>';

  buehne({rolle:a.rolle, rang:a.rang,
    titel: zug2 ? 'Etappe 1 · Zug 2 — Entscheiden'
                : 'Etappe 1 · Zug 1 — Zuordnen',
    text: auftrag},
    zug2 ? 'Lösungsversuche' : 'Tisch — Fragen und Rechenwege',
    zug2 ? 'Die sieben Fragen' : 'Ihre Zuordnung',
    `<button class="knopf leer" id="zurueck" title="Alle Karten zurück">↺</button>
     <button class="knopf" id="pruefen">Prüfen</button>
     ${(!zug2 && !letzte) ? '<button class="knopf leer" id="mehr">Nächste Runde dazulegen</button>' : ''}
     ${zug2 ? '<button class="knopf leer" id="zurueckzug">← zurück zum Zuordnen</button>' : ''}
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">${
       zug2 ? 'Etappe 2 →' : 'Weiter: Welche Wege tragen? →'}</button>`,
    praemissen());

  const tisch = document.getElementById('tisch');
  const feld = document.getElementById('feld');
  // In Zug 2 liegt alles auf dem Tisch, was es gibt - sonst faellt ein
  // Stapel aus der Entscheidung heraus.
  const bis = zug2 ? D.runden.length : stand.runde;
  const dabei = D.loesungen.filter(l => l.stapel <= bis);
  const els = {};
  /* NEU (Rikes Entscheidung, 2026-08-22): Die drei Stapel tragen ihre
     Farbe VON ANFANG AN, nicht erst nach der Pruefung von Zug 2.

     Rikes Begruendung, und sie hebt ihren eigenen frueheren Einwand auf:
     «Es ist quasi nicht notwendig, dass sie am Anfang nicht gefaerbt
     sind, weil dadurch, dass wir eh nacheinander sortieren, haben wir
     die eh schon getrennt. Und die Farbe gibt dort keine Informationen,
     die wir nicht geben wollen.»

     Der Stapel IST die Runde - `dabei` filtert auf `l.stapel <= bis`.
     «Neue Karten, neue Farbe» faellt damit von selbst zusammen mit dem,
     was die Marke «neu» sagen sollte. */
  dabei.forEach(l => {
    const el = zug2 ? urteilskarte(l) : loesungskarte(l);
    el.classList.add('stapel' + l.stapel);
    els[l.id] = el;
  });
  // In Zug 1 sind auch die FRAGEN Karten - sie liegen mit auf dem Tisch
  // und werden selbst herübergezogen.
  if (!zug2) D.fragen.forEach(f => { els[f.id] = karte(f.id); });

  if (!stand.e1reihen) stand.e1reihen = [];

  /* ZUG 1: kein festes Brett. Wer eine Fragekarte nach rechts legt,
     macht damit eine ZEILE auf; die Rechenwege kommen DANEBEN.

     BERICHTIGT (2026-08-21, Rikes Einwand «das ist ein echter Fehler»):
     Die erste Fassung stapelte unter der Fragekarte Platz um Platz,
     und neben der Frage blieb die halbe Zeile leer. Rike: «Wir
     brauchen eine lange Liste - Situation, daneben die Rechnungen, alle
     in einer Zeile nebeneinander. Und darunter die naechste Situation.»
     Genau das leistet reiheOrdnen(), das Kapitel 2 schon benutzt; die
     gemeinsame Flaeche kann seit heute auch eine KARTE als Kopf. */
  function reihen(){
    feld.querySelectorAll('.feld').forEach(d => d.remove());
    const bb = feld.clientWidth || 520;
    stand.e1reihen.forEach((r, i) => {
      const d = document.createElement('div');
      d.className = 'feld reihe offen'; d.dataset.ort = 'f' + i;
      d.style.left = '8px'; d.style.width = (bb - 16) + 'px';
      feld.appendChild(d);
    });

    const wink = document.createElement('div');
    wink.className = 'feld neu'; wink.dataset.ort = 'neuereihe';
    wink.style.left = '8px'; wink.style.width = (bb - 16) + 'px';
    wink.style.height = '52px';
    wink.innerHTML = '<span>Fragekarte hierher ziehen</span>';
    feld.appendChild(wink);

    Object.entries(stand.karten).forEach(([id, s]) => {
      const el = els[id]; if (!el) return;
      const ziel = s.ort === 'tisch' ? tisch
        : (feld.querySelector(`[data-ort="${s.ort}"]`) || tisch);
      // Die Fragekarte ist der Kopf ihrer Zeile - reiheOrdnen legt sie
      // nach links, die Rechenwege fliessen daneben.
      el.classList.toggle('kopfkarte',
        s.ort !== 'tisch' && D.fragen.some(f => f.id === id));
      ziel.appendChild(el); el._x = s.x; el._y = s.y; el._rot = s.rot; pos(el);
    });
    const unten = reihenSetzen(feld, 0.72);
    wink.style.top = unten + 'px';
    feld.style.minHeight = (unten + 72) + 'px';
  }

  // Eine Fragekarte auf dem Wink macht eine Reihe auf.
  window._e1ablage = (el, zielOrt) => {
    if (zug2) return zielOrt;
    const id = el.dataset.id;
    if (!D.fragen.some(f => f.id === id)) return zielOrt;
    if (zielOrt === 'neuereihe' || zielOrt === null){
      stand.e1reihen.push({frage: id});
      return 'f' + (stand.e1reihen.length - 1);
    }
    return zielOrt;
  };

  /* Welche Fragekarte liegt in Reihe i? Vom Brett abgelesen. */
  const reiheFrage = i => {
    const k = document.querySelector(`[data-ort="f${i}"] .k.kopfkarte`);
    return k ? k.dataset.id : null;
  };

  /* Beim Wechsel nach Zug 2 wird aus «liegt in Reihe 3» ein «gehoert
     zu Frage FA5». Ohne diese Uebersetzung faenden die Karten in Zug 2
     ihren Platz nicht - dort heissen die Orte nach den Fragen. */
  function uebergabe(){
    const neu = {};
    Object.entries(stand.karten).forEach(([id, s]) => {
      if (D.fragen.some(f => f.id === id)) return;   // Fragen bleiben liegen
      const nr = (s.ort.match(/^f(\d+)$/) || [])[1];
      const frage = nr === undefined ? null : reiheFrage(nr);
      neu[id] = frage ? {...s, ort: frage, x: 8, y: 8} : {...s, ort: 'tisch'};
    });
    stand.karten = neu;
  }

  // Der Tisch in zwei Baendern - Fragen oben, Rechenwege unten.
  const BAENDER = [
    {art:'F', name:'Die Fragen', ids:()=>D.fragen.map(f=>f.id)},
    {art:'R', name:'Die Rechenwege', ids:()=>dabei.map(l=>l.id)},
  ];
  const tischOrdnen = () => baenderOrdnen(tisch, BAENDER, els);

  if (zug2){
    window._neuzeichnen = ()=>fragebrett(els, false);
    window._nachAblegen = ()=>reihenSetzen(feld, 0.72);
    fragebrett(els, false);
  } else {
    window._neuzeichnen = ()=>{ reihen(); tischOrdnen(); };
    // Nach jedem Ablegen die Zeilen neu setzen - eine Zeile waechst mit
    // der Zahl der Rechenwege, die darin liegen.
    window._nachAblegen = ()=>{
      const unten = reihenSetzen(feld, 0.72);
      const w = feld.querySelector('[data-ort="neuereihe"]');
      if (w){ w.style.top = unten + 'px';
              feld.style.minHeight = (unten + 72) + 'px'; }
    };
    reihen();
  }

  const neueF = D.fragen.filter(f=>!(f.id in stand.karten)).map(f=>els[f.id]);
  const neue = dabei.filter(l=>!(l.id in stand.karten)).map(l=>els[l.id]);
  // FEHLERBEHOBEN (2026-08-21): Die erste Fassung trug die neuen Karten
  // von Hand in stand.karten ein und rief dann merken(). Das loeschte
  // sie sofort wieder: merken() baut stand.karten AUS DEM DOM neu auf,
  // und die Karten hingen noch nirgends. Gemessen: 0 Karten auf dem
  // Tisch, obwohl 18 erzeugt waren. Richtig ist die Reihenfolge aus
  // Kapitel 1 - erst streuen (das haengt sie ein), dann merken.
  const neuAlle = [...(zug2 ? [] : neueF), ...neue];
  if (neuAlle.length){
    // UEBERHOLT (2026-08-22, Rikes Entscheidung «die Marke neu brauchen
    // wir nicht»): Hier bekam jede Karte einer spaeteren Runde eine
    // Marke «neu». Sie sollte das Wachsen zeigen, ohne die
    // Stapelzugehoerigkeit zu verraten.
    //
    // Beides ist hinfaellig. Die Zugehoerigkeit wird jetzt ohnehin
    // gezeigt, und das Wachsen zeigt sich von selbst: «Sobald ein neuer
    // Stapel dazukommt, sind die alten Karten schon rueberrgerutscht,
    // nicht mehr auf dem ungeordneten Feld. Dann muessen wir dort diese
    // Unterscheidung nicht haben.»
    streuen(neuAlle, tisch);
    merken();
  }
  if (!zug2) tischOrdnen();

  const befund = document.getElementById('befund');
  if (!zug2){
    befund.textContent = stand.runde === 1
      ? `Runde 1 — ${runde.anzahl} Versuche.`
      : `Runde ${stand.runde}: ${runde.anzahl} weitere Versuche liegen dazu. `
        + `Was machen sie anders?`;
  } else {
    befund.textContent = `${dabei.length} Versuche. Setzen Sie an jeder Karte `
      + `ein Urteil.`;
  }

  const mehr = document.getElementById('mehr');
  if (mehr) mehr.onclick = ()=>{ stand.runde++; etappe1(); };

  const zurueckzug = document.getElementById('zurueckzug');
  if (zurueckzug) zurueckzug.onclick = ()=>{ stand.zug = 1; etappe1(); };

  document.getElementById('zurueck').onclick = ()=>{
    stand.karten = {}; stand.runde = 1; stand.zug = 1; stand.urteil = {};
    stand.e1reihen = [];
    document.querySelectorAll('.k').forEach(k=>
      k.classList.remove('ok','falsch','fastok'));
    etappe1();
  };

  /* Eine Loesungskarte mit ihrem Urteil.

     BERICHTIGT (2026-08-22, Rikes Befund «da gibt's zwar diese Buttons,
     aber die tun nichts»): Sie taten etwas - man sah es nur nicht. Zwei
     Knöpfe mit Beschriftung deckten die Karte in der Reihe fast
     vollständig zu; vom Rechenweg blieb ein Streifen. Wer nicht sieht,
     worüber er urteilt, hält den Knopf für wirkungslos.

     Neu ist es EIN kleines Zeichen in der Ecke, das durchschaltet:
         leer  →  ✓ trägt  →  ✗ trägt nicht  →  leer
     und Rikes Vorschlag dazu: Was nicht trägt, wird DURCHGESTRICHEN.
     Das Urteil steht damit auf der Karte, nicht davor. */
  function urteilskarte(l){
    const el = loesungskarte(l);
    const FOLGE = [null, 'ja', 'nein'];
    const marke = document.createElement('div');
    marke.className = 'urteil';
    const zeichen = () => {
      const u = stand.urteil[l.id];
      marke.textContent = u === 'ja' ? '✓' : u === 'nein' ? '✗' : '·';
      marke.title = u === 'ja' ? 'trägt' : u === 'nein' ? 'trägt nicht'
                                         : 'noch kein Urteil';
      marke.classList.toggle('ja', u === 'ja');
      marke.classList.toggle('nein', u === 'nein');
      el.classList.toggle('traegtnicht', u === 'nein');
    };
    marke.onclick = ev => {
      ev.stopPropagation();
      const jetzt = FOLGE.indexOf(stand.urteil[l.id] || null);
      stand.urteil[l.id] = FOLGE[(jetzt + 1) % FOLGE.length];
      el.classList.remove('ok', 'falsch');
      zeichen(); merken();
    };
    marke.addEventListener('pointerdown', ev => ev.stopPropagation());
    el.appendChild(marke);
    zeichen();
    return el;
  }

  document.getElementById('pruefen').onclick = ()=>{
    document.querySelectorAll('.k').forEach(k=>
      k.classList.remove('ok','falsch','fastok'));

    if (!zug2){
      // ZUG 1 prueft NUR die Zuordnung. Kein Wort ueber tragen.
      //
      // Welche Frage in einer Reihe liegt, wird am BRETT abgelesen und
      // nicht aus stand.e1reihen genommen: Wer die Fragekarte
      // nachtraeglich austauscht, soll auch danach geprueft werden.
      let getroffen=0, daneben=0, offen=0, ohneFrage=0;
      dabei.forEach(l=>{
        const s = stand.karten[l.id];
        if (!s || s.ort === 'tisch'){ offen++; return; }
        const el = els[l.id];
        const nr = (s.ort.match(/^f(\d+)$/) || [])[1];
        const frage = nr === undefined ? null : reiheFrage(nr);
        if (frage === null){ ohneFrage++; return; }
        if (frage === l.frage){ el.classList.add('ok'); getroffen++; }
        else { el.classList.add('falsch'); daneben++; }
      });
      if (ohneFrage) befund.textContent =
        `${ohneFrage} Versuche liegen in einer Reihe ohne Fragekarte. `;
      const satz = [`${getroffen} von ${dabei.length} bei der richtigen Frage.`];
      if (daneben) satz.push(`${daneben} liegen woanders.`);
      if (offen) satz.push(`${offen} liegen noch auf dem Tisch.`);
      if (!daneben && !offen) satz.push('Alles zugeordnet — weiter zum zweiten Zug.');
      befund.textContent = satz.join(' ');
      return;
    }

    // ZUG 2 prueft das URTEIL - und nur bei den Karten, die am
    // richtigen Ort liegen. Ein Urteil ueber eine falsch zugeordnete
    // Karte waere ein Urteil ueber die falsche Frage.
    let richtigBeurteilt=0, falschBeurteilt=0, ohneUrteil=0, verlegt=0;
    dabei.forEach(l=>{
      const s = stand.karten[l.id], el = els[l.id];
      if (!s || s.ort !== l.frage){ verlegt++; return; }
      const u = stand.urteil[l.id];
      if (!u){ ohneUrteil++; return; }
      const stimmt = (u === 'ja') === !!l.richtig;
      el.classList.add(stimmt ? 'ok' : 'falsch');
      if (stimmt) richtigBeurteilt++; else falschBeurteilt++;
    });
    stand.geprueft = true;
    const satz = [];
    if (ohneUrteil) satz.push(`${ohneUrteil} Karten tragen noch kein Urteil.`);
    if (verlegt) satz.push(`${verlegt} liegen bei der falschen Frage — `
      + `zurück zum Zuordnen.`);
    satz.push(`${richtigBeurteilt} richtig beurteilt`
      + (falschBeurteilt ? `, ${falschBeurteilt} nicht.` : '.'));
    if (!ohneUrteil && !verlegt && !falschBeurteilt){
      // UEBERHOLT (2026-08-22): Hier faerbten sich die Stapel erst jetzt.
      // Sie tragen ihre Farbe seit Rikes Entscheidung von Anfang an -
      // siehe oben. Der Satz benennt darum, was man sieht, statt eine
      // Faerbung anzukuendigen, die schon da ist.
      satz.push('Alles beurteilt. Die drei Farben auf dem Tisch sind drei '
        + 'Sorten von Versuch — das ist der Stoff von Etappe 2.');
    }
    befund.textContent = satz.join(' ');
  };

  document.getElementById('weiter').onclick = ()=>{
    if (!zug2){
      // FEHLERBEHOBEN (2026-08-21): Hier stand merken() zwischen
      // uebergabe() und etappe1(). Es baut stand.karten AUS DEM DOM neu
      // auf - und der zeigte in diesem Moment noch Zug 1 mit den Karten
      // in ihren Reihen. Die eben gemachte Uebersetzung wurde damit
      // sofort wieder ueberschrieben: Gemessen 19 Karten uebertragen,
      // davon 0 am richtigen Ort. etappe1() merkt selbst, sobald die
      // Karten stehen.
      uebergabe();
      stand.zug = 2; stand.runde = D.runden.length; etappe1(); return;
    }
    stand.etappe = 1; los();
  };
  // Nur in Zug 2 - siehe _loesungStandZug2().
  if (zug2) loesungsKnopf(() => etappe1());
}

/* ───────── Etappe 2 · Strategien ─────────
   Bleibt, obwohl sie sich zuerst ueberfluessig anfuehlt. In Kapitel 1
   und 2 hat die mittlere Etappe ein ERGEBNIS - benannte Gruppen,
   zugeordnete Ereignisse. Hier hatte sie bisher keines und wirkte wie
   ein blosses Gespraech. Das Material nennt das Ergebnis aber selbst:
   drei geschriebene Prueffragen, eine je Stapel. */
/* Fuellt die drei Pruefframen-Textfelder mit der Formulierung, mit der
   geplant wurde (thema.STAPEL) - keine feste Loesung, aber eine
   moegliche, lesbare Fassung statt eines leeren Feldes. */
function _loesungStandE2(){
  const texte = {};
  Object.entries(D.stapel).forEach(([nr, s]) => { texte['prueffrage'+nr] = s.prueffrage; });
  return {texte};
}

function etappe2(){
  loesungAnwenden(_loesungStandE2);
  const a = D.etappen[1];
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 2 · Strategien',
    text:'Die Versuche bleiben liegen. Sehen Sie sich an, was die drei Stapel '
       + '<b>unterscheidet</b> — und schreiben Sie zu jedem eine Prüffrage: '
       + 'Woran sehen Sie einer Frage an, ob dieser Weg bei ihr trägt, '
       + '<b>bevor</b> Sie rechnen?'},
    'Ihre drei Prüffragen', 'Ihre Zuordnung aus Etappe 1',
    `<span class="befund">Hier gibt es nichts zu prüfen — es sind Ihre Sätze.
       Sie werden in Etappe 3 gebraucht.</span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Etappe 3 →</button>`,
    praemissen());

  // Rechts: dasselbe Brett wie in Etappe 1, aber unbeweglich. Die Karten
  // sollen nachgeschlagen, nicht umsortiert werden - der eigene Satz
  // wird an ihnen geprueft.
  const els = {};
  D.loesungen.forEach(l => { els[l.id] = loesungskarte(l); });
  fragebrett(els, false);

  // Links: drei Schreibfelder, eines je Stapel.
  const tisch = document.getElementById('tisch');
  const kb = parseFloat(getComputedStyle(document.documentElement)
              .getPropertyValue('--kb'));
  const bb = tisch.clientWidth || 340;
  let y = 12;
  Object.keys(D.stapel).forEach(nr=>{
    const kasten = document.createElement('div');
    kasten.className = 'feld'; kasten.dataset.ort = 'prueffrage' + nr;
    kasten.style.left = '8px'; kasten.style.top = y + 'px';
    kasten.style.width = (bb - 16) + 'px';
    kasten.innerHTML = `<div class="kopf"><span class="nr">${nr}</span>`
      + `Stapel ${nr}</div>`;
    const feldchen = document.createElement('textarea');
    feldchen.className = 'schreibfeld';
    feldchen.placeholder = 'Woran erkenne ich, dass dieser Weg trägt?';
    feldchen.value = stand.texte['prueffrage' + nr] || '';
    feldchen.oninput = ()=>{ stand.texte['prueffrage' + nr] = feldchen.value; };
    kasten.appendChild(feldchen);
    tisch.appendChild(kasten);
    kasten.style.height = (kb * 1.15) + 'px';
    y += kb * 1.15 + 12;
  });
  tisch.style.minHeight = (y + 20) + 'px';

  window._neuzeichnen = ()=>etappe2();
  window._nachAblegen = null;
  document.getElementById('weiter').onclick = ()=>{ stand.etappe = 2; los(); };
  loesungsKnopf(() => etappe2());
}

/* ───────── Etappe 3 · Übertragen ─────────
   Die drei Felder tragen die SELBST geschriebenen Prueffragen als
   Ueberschrift - nicht die Stapelnamen. Ohne die drei Saetze aus
   Etappe 2 waere der Transfer wieder Raten; mit ihnen ist er eine
   Anwendung des eigenen Kriteriums. */
function etappe3(){
  const a = D.etappen[2];
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 3 · Übertragen',
    text:'Verlassen Sie die Eisdiele und nehmen Sie Ihre drei Prüffragen mit. '
       + 'Zu welcher gehört welche Aufgabe? '
       + '<span class="zart">Die Karte auf dem Tisch <b>bleibt liegen</b> — '
       + 'nach rechts wandert eine Kopie. Passt eine Aufgabe zu mehreren '
       + 'Prüffragen, ziehen Sie sie einfach noch einmal hinüber. Wollen '
       + 'Sie eine Kopie loswerden, ziehen Sie sie zurück auf den '
       + 'Tisch.</span>'},
    'Aufgaben von ausserhalb', 'Ihre Prüffragen',
    `<span class="befund">Hier gibt es nichts zu prüfen — Sie wenden Ihr
       eigenes Kriterium an. Sichern Sie den Stand als Bild.</span>`);

  const feld = document.getElementById('feld'), tisch = document.getElementById('tisch');
  const els = {};
  const grund = id => id.split('#')[0];

  /* GEAENDERT (2026-09-10, Rikes Rueckmeldung «das ist muehsam»): Das
     «+» ist weg, die Geste selbst ist die Kopie - dieselbe Regel wie in
     Kapitel 2, und sie steht gemeinsam in flaeche.js (kopierGeste).

     Hier zaehlt sie besonders: «Passt eine zu mehreren» ist in dieser
     Etappe der Normalfall, und ob eine Aufgabe auch zur zweiten
     Pruefrage passt, merkt man erst, wenn sie bei der ersten liegt. */
  const marken = {};
  D.transfer.forEach(t=>{ marken[t.id] = {text:t.marke, art:'skript'}; });
  const aufgabenkarte = id =>
    karte(id, marken[grund(id)] || {text:'', art:'skript'});

  D.transfer.forEach(t=>{ els[t.id] = aufgabenkarte(t.id); });
  Object.keys(stand.karten).filter(id=>id.includes('#')).forEach(id=>{
    if (!els[id]) els[id] = aufgabenkarte(id); });

  function vorratWahren(){
    return kopierGeste({
      tisch, els, bauen: aufgabenkarte,
      ziele: () => Object.keys(D.stapel).map(
        nr => feld.querySelector(`[data-ort="p${nr}"]`)),
    });
  }

  function felder(){
    feld.querySelectorAll('.feld').forEach(d=>d.remove());
    const kb = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--kb'));
    const bb = feld.clientWidth||520, fh = Math.max(kb*1.7, 160);
    Object.keys(D.stapel).forEach((nr,i)=>{
      const eigen = (stand.texte['prueffrage'+nr] || '').trim();
      const d = document.createElement('div');
      d.className='feld'; d.dataset.ort='p'+nr;
      d.style.left='8px'; d.style.top=(26+i*(fh+12))+'px';
      d.style.width=(bb-16)+'px'; d.style.height=fh+'px';
      d.innerHTML = `<div class="kopf"><span class="nr">${nr}</span>`
        + (eigen ? eigen
                 : '<i>Sie haben zu diesem Stapel noch keine Prüffrage '
                   + 'geschrieben — zurück zu Etappe 2.</i>') + '</div>';
      feld.appendChild(d);
    });
    feld.style.minHeight=(26+Object.keys(D.stapel).length*(fh+12)+20)+'px';
    Object.entries(stand.karten).forEach(([id,s])=>{
      const el=els[id]; if(!el) return;
      const ziel = s.ort==='tisch' ? tisch
        : (feld.querySelector(`[data-ort="${s.ort}"]`)||tisch);
      ziel.appendChild(el); el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el);
    });
    faecherSetzen(feld);
  }
  window._neuzeichnen = felder;
  window._nachAblegen = ()=>{
    const geaendert = vorratWahren();
    faecherSetzen(feld);
    if (geaendert) merken();
  };
  felder();
  const neu = D.transfer.filter(t=>!(t.id in stand.karten)).map(t=>els[t.id]);
  if (neu.length){ streuen(neu, tisch); merken(); }
  loesungsHinweis(D.loesung_e3);
}

ETAPPEN.push(etappe1, etappe2, etappe3);
