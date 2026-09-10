/* ───────── Etappe 1 ─────────
   NEU (2026-08-21, nach Rikes Vorschlag): Kein Raster fertiger
   Situationsfelder mehr. Wer eine Karte auf den Wink legt, macht damit
   eine neue Gruppe auf; darunter kommen die Paare.

   Warum das besser ist: Vorher musste man die Liste von oben nach unten
   durchgehen - erst Situation 1, dann 2. Jetzt darf man mit dem
   anfangen, was man zuerst sieht. Vielleicht faellt ein Term auf, bevor
   die Situation dazu gefunden ist.

   GEAENDERT (2026-08-24, Rikes Auftrag): Vier Bereiche statt drei -
   oben EIN grosses sortiertes Feld, darunter drei Quellflaechen
   (Situationen/Urnen/Terme). Keine eigene Ablage-Spalte mehr fuer
   «passt zu keiner Situation»: Eine Gruppe ohne Situationskopf ist die
   Regel, nicht die Ausnahme, solange nicht alle Wellen aus sind - und
   bei Distraktorpaaren dauerhaft richtig. Siehe agent/16_herkunft.md.

   Und gestaffelt (2026-08-24, Anstoss Maurus/Rike, ebenda): Die drei
   Quellflaechen zeigen nicht den ganzen Einstiegssatz auf einmal,
   sondern wellenweise - siehe auswahl.STUFEN.
*/
/* Baut den Stand, der Etappe 1 fertig sortiert zeigt - fuer
   loesungsKnopf(). Dieselben Feldnamen wie ein von Hand sortiertes
   Brett (g0/sit, g0/p0, …), damit felder() sie genauso zeichnet wie
   die eigene Arbeit. Zwei Karten je Paarplatz: links die Urne (x=4),
   rechts der Term (x=halb+2) - dieselbe Rechnung wie einrasten() in
   flaeche.js, hier nur vorweggenommen, weil die Karten nie tatsaechlich
   fallengelassen werden. */
function _loesungStandE1(){
  const kb = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--kb'));
  const halb = Math.round(((kb*2+44)-14)/2);
  const karten = {}, gruppen = [];
  D.loesung_e1.gruppen.forEach(g=>{
    const gi = gruppen.length;
    gruppen.push({paare: g.urnen.length});
    karten[g.sit] = {ort:'g'+gi+'/sit', x:4, y:4, rot:0};
    g.urnen.forEach((u,i)=>{ karten[u] = {ort:'g'+gi+'/p'+i, x:4, y:4, rot:0}; });
    g.terme.forEach((t,i)=>{ karten[t] = {ort:'g'+gi+'/p'+i, x:halb+2, y:4, rot:0}; });
  });
  D.loesung_e1.distraktoren.forEach(d=>{
    const gi = gruppen.length;
    gruppen.push({paare:1});
    karten[d.urne] = {ort:'g'+gi+'/p0', x:4, y:4, rot:0};
    karten[d.term] = {ort:'g'+gi+'/p0', x:halb+2, y:4, rot:0};
  });
  return {karten, e1gruppen: gruppen};
}

function etappe1(){
  const a = D.etappen[0];
  loesungAnwenden(_loesungStandE1);
  if (stand.e1stufe === undefined) stand.e1stufe = 0;
  const mehrDa = stand.e1stufe < D.stufen.length - 1;

  // GEAENDERT (2026-08-24, Rikes Auftrag): Vier statt drei Bereiche.
  // Oben EIN grosses sortiertes Feld, darunter drei Quellflaechen -
  // Situationen, Urnenmodelle, Terme. Die alte Ablage «ohne Situation,
  // aber paarweise» ist keine eigene Spalte mehr: Eine Gruppe ohne
  // Situationskopf ist jetzt keine zweite Kategorie, sondern entweder
  // eine noch unvollstaendige Gruppe (Situation fehlt noch, kommt
  // vielleicht mit der naechsten Welle) oder - bei den Distraktorpaaren -
  // ihr endgueltiger, richtiger Platz. Eine Situation existiert im
  // Prinzip immer; es fragt sich nur, ob das passende Kaertchen schon
  // da ist. Siehe agent/16_herkunft.md.
  //
  // Und weiterhin gestaffelt (2026-08-24, Anstoss Maurus/Rike): Auf den
  // Quellflaechen liegt zu Beginn nur die erste Welle - vollstaendig,
  // mit ihren Distraktoren. «Weitere Situationen zuschalten» holt die
  // naechste Welle dazu, immer als Situation-Urne-Term-Paket.
  buehneOben({rolle:a.rolle, rang:a.rang, titel:'Etappe 1 · Ordnen',
    text:'Legen Sie zusammen, was zu derselben Situation gehört — Situation, '
       + 'Urnenmodell und Term als Gruppe. '
       + '<span class="zart">Zu den meisten Situationen gibt es <b>zwei</b> Wege, '
       + 'zu manchen sogar drei. Manche Urnen und Terme passen zu keiner der '
       + 'ausliegenden Situationen — aber zueinander: Bilden Sie auch daraus '
       + 'eine Gruppe, nur ohne Situationskarte obendrauf. Es liegen zunächst '
       + 'nicht alle Situationen aus — wer fertig ist oder mehr will, holt '
       + 'sich weitere. Auf jeder Rechnung steht ein <b>=</b>; wer darauf '
       + 'zeigt, sieht ihr Ergebnis.</span>'},
    'Ihre Zuordnung',
    [{id:'S', name:'Situationen'}, {id:'U', name:'Urnenmodelle'}, {id:'T', name:'Terme'}],
    `<span class="beschriftung">Auf dem Tisch: ${D.stufen[stand.e1stufe]}</span>
     ${mehrDa
        ? `<button class="knopf leer" id="mehrstufe">Weitere Situationen zuschalten</button>`
        : `<span class="beschriftung">Alle Situationen des Einstiegssatzes liegen aus.</span>`}
     <button class="knopf leer" id="zurueckalles" title="Alle Karten zurück auf den Tisch">↺</button>
     <button class="knopf" id="fertig">Prüfen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Etappe 2 →</button>`);

  const feld = document.getElementById('feld');
  const feldS = document.getElementById('feldS');
  if (!stand.e1gruppen) stand.e1gruppen = [];

  // Welche Quellflaeche gehoert zu welchem Kartentyp?
  function ortFuerTyp(ty){
    if (ty === 'SS') return 'tischS';
    return (ty === 'U' || ty === 'UD') ? 'tischU' : 'tischT';
  }

  // Karten der freigeschalteten Wellen auf ihre Quellflaeche legen, wenn
  // sie noch nirgends liegen. Schon einsortierte Karten bleiben unangetastet.
  function freischalten(bisStufe){
    D.karten.filter(k => (D.stufe[k.id] ?? 0) <= bisStufe && !(k.id in stand.karten))
      .forEach(k => { stand.karten[k.id] = {ort: ortFuerTyp(k.typ), x:0, y:0, rot:0}; });
  }
  freischalten(stand.e1stufe);

  // NEU (2026-08-21): Die Situationskarten tragen ihre Nummer. Nur so
  // laesst sich in Etappe 2 und 3 auf sie zurueckverweisen - dort steht
  // dieselbe Zahl an den Modellkarten.
  //
  // NEU (2026-09-09, Rikes Wunsch): Die Termkarten tragen ein «=», das
  // beim Darueberfahren das Ergebnis zeigt. Rikes Absicht: «So kann man
  // schauen, ob der term das gleiche gibt ... und dann ueberlegen warum?»
  // - also der Vergleich ZWEIER Wege derselben Situation, nicht das
  // Ausrechnen als Selbstzweck.
  //
  // Bewusst DIESELBE Bewegung wie die Situationsblase in Etappe 2 und 3
  // («eher oben als Hilfe, so wie wir es mit den Situationen ab Etappe 2
  // machen»): eine Marke oben links, nichts wird von selbst eingeblendet.
  //
  // Die Urnenkarten bekommen keine. Was ein Urnenbild behauptet, laesst
  // sich auch ausrechnen (pruefe_urnen.py tut es), aber dann waere das
  // Bild nicht mehr zu lesen, sondern nur noch aufzudecken.
  function marke(k){
    if (k.typ === 'SS')
      return {text: String(D.anzeige[parseInt(k.id.slice(2))]), art:'sit'};
    const wert = D.werte && D.werte[k.id];
    return wert === undefined
      ? null
      : {text:'=', art:'sit', titel:'Diese Rechnung ergibt <b>' + wert + '</b>.'};
  }
  const els = {};
  D.karten.forEach(k=>{ els[k.id] = karte(k.id, marke(k)); });

  function kbw(){ return parseFloat(getComputedStyle(document.documentElement)
                    .getPropertyValue('--kb')); }

  // GEAENDERT (2026-08-24, Rikes Auftrag): Gruppen liegen nebeneinander
  // statt untereinander - ein Raster, oben die Situationen, darunter je
  // Spalte die Paare. Die Spaltenbreite ist deshalb FEST (an der
  // Kartenbreite orientiert), nicht mehr an der Panelbreite - sonst
  // gaebe es bei zwei, drei Gruppen nichts zum Scrollen. Das Feld
  // scrollt jetzt auch seitlich, siehe minWidth unten.
  function felder(){
    feld.querySelectorAll('.feld,.paar').forEach(d=>d.remove());
    const kb = kbw(), kh = kb*0.845 + 10;
    const fw = kb*2 + 44;
    let x = 8, hoechste = 58;      // 58 = Hoehe des Winks, Referenzwert

    // GEAENDERT (2026-08-28): 20 statt 8 Pixel Abstand zwischen den
    // Plaetzen. Seit die Pruefung zwei Kanaele hat, haengt unter jedem
    // Platz ein Wort zur Situationszuordnung - das braucht einen eigenen
    // Streifen, sonst liegt es auf der naechsten Karte.
    // 22 Pixel: gerade so viel, dass die Anzeige (rund 17 Pixel hoch)
    // vollstaendig in den Spalt passt und nicht auf die naechste Karte
    // rutscht. Der Kopf braucht dieselbe Luft, deshalb kopfH unten mit
    // seinem eigenen Rand von 7 gerechnet.
    const LUFT = 22;
    const paarplaetze = (d, id, zahl, oben, plus) => {
      for (let i=0;i<zahl;i++){
        const pz = document.createElement('div');
        pz.className='paar'; pz.dataset.ort = id+'/p'+i;
        pz.style.left='7px'; pz.style.top=(oben+i*(kh+LUFT))+'px';
        pz.style.width=(fw-14)+'px'; pz.style.height=kh+'px';
        if (i===0) pz.innerHTML='<span class="hint">Urnenmodell</span>'
          + '<span class="hint" style="left:auto;right:6px">Term</span>';
        d.appendChild(pz);
      }
      const p = document.createElement('div');
      p.className='feld neu'; p.style.position='absolute';
      p.style.left='7px'; p.style.top=(oben+zahl*(kh+LUFT))+'px';
      p.style.width=(fw-14)+'px'; p.style.height='26px';
      p.innerHTML='<span>+ weiteres Paar</span>';
      p.onclick=()=>{ plus(); felder(); };
      d.appendChild(p);
    };

    stand.e1gruppen.forEach((g, gi)=>{
      const d = document.createElement('div');
      d.className='feld'; d.dataset.ort='g'+gi;
      d.style.left=x+'px'; d.style.top='26px'; d.style.width=fw+'px';
      const kopfH = kh + 7 + LUFT;
      const h = kopfH + g.paare*(kh+LUFT) + 32;
      d.style.height = h+'px';
      hoechste = Math.max(hoechste, h);
      const kopf = document.createElement('div');
      kopf.className='paar'; kopf.dataset.ort='g'+gi+'/sit';
      // Genau EINE Situationskarte. Ohne diese Angabe faellt der Kopf
      // unter die Regel «zwei Karten je Platz», und eine zweite
      // Situation legte sich unbemerkt ueber die erste.
      kopf.dataset.fasst = '1';
      // FEHLERBEHOBEN (2026-08-24): Ohne diese Marke konnte eine Urnen-
      // oder Termkarte im Kopf landen, wenn man sie nahe genug daran
      // losliess - der Kopf pruefte bisher nur die Anzahl, nicht die
      // Sorte. Siehe flaeche.js, `data-nur`.
      kopf.dataset.nur = 'SS';
      kopf.style.left='7px'; kopf.style.top='7px';
      kopf.style.width=(fw-14)+'px'; kopf.style.height=kh+'px';
      kopf.style.background='rgba(152,103,165,.09)';
      // GEAENDERT (2026-08-24): Der Kopf ist jetzt ausdruecklich als
      // optional beschriftet - eine Gruppe ohne Situationskarte ist
      // kein Fehler, sondern der Normalfall bei Distraktorpaaren und ein
      // Zwischenstand bei allem anderen.
      kopf.innerHTML='<span class="hint">Situation (falls vorhanden)</span>';
      d.appendChild(kopf);
      paarplaetze(d, 'g'+gi, g.paare, kopfH, ()=>{ g.paare++; });
      feld.appendChild(d); x += fw + 14;
    });

    const wink = document.createElement('div');
    wink.className='feld neu'; wink.dataset.ort='neuegruppe';
    wink.style.left=x+'px'; wink.style.top='26px';
    wink.style.width=fw+'px'; wink.style.height='58px';
    // GEAENDERT (2026-08-24): Nicht mehr nur Situationskarten - jede
    // Karte darf hier eine neue Gruppe eroeffnen, auch ein Distraktorpaar.
    wink.innerHTML='<span>Karte hierher ziehen — eröffnet eine neue Gruppe</span>';
    feld.appendChild(wink);
    // GEAENDERT (2026-08-24): Breite statt Hoehe waechst mit der Zahl der
    // Gruppen - das Feld scrollt jetzt seitlich. Die Hoehe richtet sich
    // nach der hoechsten Gruppe (unterschiedlich viele Paare je Situation).
    feld.style.minWidth = (x + fw + 20)+'px';
    feld.style.minHeight = (hoechste + 46)+'px';

    // Karten an ihre Plaetze.
    //
    // FEHLERBEHOBEN (2026-08-28): Der Rueckfall hiess `|| feldS`. Eine
    // Karte, deren gemerkter Ort es nicht mehr gab, landete damit auf
    // der Situationsflaeche - auch wenn sie eine Urne oder ein Term war.
    // Dort raeumt tischOrdnen() sie nie auf, denn es holt sich je
    // Flaeche nur die Karten der PASSENDEN Sorte. Die Karte lag
    // unsichtbar irgendwo und war fuer Studierende verschwunden.
    // Neu geht sie auf ihre EIGENE Quellflaeche zurueck, und der Stand
    // wird gleich mitkorrigiert - sonst liefe er beim naechsten Mal
    // wieder auseinander.
    const sorte = {};
    D.karten.forEach(k => { sorte[k.id] = k.typ; });
    Object.entries(stand.karten).forEach(([id,s])=>{
      const el = els[id]; if (!el) return;
      let ziel = document.querySelector(`[data-ort="${s.ort}"]`);
      if (!ziel){
        const heim = ortFuerTyp(sorte[id]);
        stand.karten[id] = {ort: heim, x:0, y:0, rot:0};
        s = stand.karten[id];
        ziel = document.querySelector(`[data-ort="${heim}"]`);
      }
      ziel.appendChild(el); el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el);
    });
  }
  window._neuzeichnen = ()=>{ felder(); tischOrdnen(); };

  // GEAENDERT (2026-08-24): Jede Karte darf auf dem Wink eine neue Gruppe
  // eroeffnen, nicht mehr nur Situationskarten - siehe agent/16_herkunft.md,
  // Rikes Umbau der Ablage. Eine Situationskarte geht in den Kopf, alles
  // andere ins erste Paarfeld. Ob eine Gruppe eine Situation hat, wird
  // beim Pruefen live aus dem Kopf gelesen (siehe unten bei «fertig») -
  // nicht hier gespeichert, sonst liefe der Stand auseinander, sobald
  // jemand eine Situationskarte nachtraeglich in einen leeren Kopf zieht.
  window._e1ablage = (el, zielOrt) => {
    const id = el.dataset.id;
    if (zielOrt === 'neuegruppe' || zielOrt === null){
      stand.e1gruppen.push({paare:2});
      const gi = stand.e1gruppen.length - 1;
      return id.startsWith('SS') ? ('g'+gi+'/sit') : ('g'+gi+'/p0');
    }
    return zielOrt;
  };

  // GEAENDERT (2026-08-24): Keine Baender mehr innerhalb einer Flaeche -
  // jede der drei Quellflaechen ist bereits typrein, also genuegt
  // einfaches Streuen je Flaeche. Nur, was zur freigeschalteten Welle
  // gehoert, wird gezeigt.
  const QUELLEN = [
    {id:'S', ort:'tischS', passt:k=>k.typ==='SS'
                                   && (D.stufe[k.id] ?? 0) <= stand.e1stufe},
    {id:'U', ort:'tischU', passt:k=>(k.typ==='U'||k.typ==='UD')
                                   && (D.stufe[k.id] ?? 0) <= stand.e1stufe},
    {id:'T', ort:'tischT', passt:k=>(k.typ==='T'||k.typ==='TD')
                                   && (D.stufe[k.id] ?? 0) <= stand.e1stufe},
  ];
  function tischOrdnen(){
    QUELLEN.forEach(q=>{
      const blatt = document.getElementById('feld'+q.id);
      const drauf = D.karten.filter(q.passt).map(k=>k.id)
        .filter(id => (stand.karten[id]||{}).ort === q.ort)
        .map(id => els[id]).filter(Boolean);
      streuen(drauf, blatt);
    });
  }
  window._tischOrdnen = tischOrdnen;

  felder();
  tischOrdnen();            // die freigeschalteten Wellen sofort zeigen,
                             // kein Knopf mehr noetig fuer die erste Welle

  // NEU (2026-08-26, Rikes Auftrag): Zuschalten prueft zuerst.
  //
  // Begruendung von Rike: Wer mit wenigen Karten anfaengt, soll sehen
  // koennen, ob das Gelegte traegt, BEVOR er sich mehr auf den Tisch
  // holt - «wir haben nicht die Zeit, jedes Mal zu schauen, stimmt es,
  // stimmt es, stimmt es». Weil die Zuordnung Situation-Urne-Term
  // eindeutig ist, kann die Flaeche das selbst beantworten.
  //
  // Kein hartes Sperren: Der erste Klick prueft und haelt an, wenn etwas
  // fehlt oder falsch liegt; der zweite schaltet trotzdem zu. Wer
  // absichtlich weitergehen will, wird nicht aufgehalten - er hat den
  // Befund nur einmal gesehen.
  const mehrstufe = document.getElementById('mehrstufe');
  if (mehrstufe) mehrstufe.onclick = ()=>{
    const zuschalten = ()=>{
      stand.e1stufe++;
      freischalten(stand.e1stufe);
      merken();
      etappe1();             // Buehne neu aufbauen: neuer Stufenname, ggf. Knopf weg
    };
    if (mehrstufe.dataset.trotzdem === 'ja'){ zuschalten(); return; }
    const p = pruefen();
    if (p.fertigeWelle){ zuschalten(); return; }
    mehrstufe.dataset.trotzdem = 'ja';
    mehrstufe.textContent = 'Trotzdem zuschalten';
    document.getElementById('befund').textContent +=
      ' — schauen Sie das noch einmal an, bevor Sie weitere Karten dazunehmen.';
  };
  document.getElementById('zurueckalles').onclick = ()=>{
    stand.karten={}; stand.e1gruppen=[];
    freischalten(stand.e1stufe);
    felder(); tischOrdnen(); merken();
    document.getElementById('befund').textContent='';
    const m = document.getElementById('mehrstufe');
    if (m){ delete m.dataset.trotzdem; m.textContent='Weitere Situationen zuschalten'; }
  };

  /* Pruefung, platzweise - und in ZWEI getrennten Kanaelen.

     NEU (2026-08-28, Rikes Auftrag). Die Vorgeschichte: Bis hierher
     trugen die Karten EINEN Rahmen, in dem zwei verschiedene Fragen
     zusammengefasst waren. Wer Rot sah, wusste nicht, ob Urne und Term
     nicht zueinander passen oder ob das Paar unter der falschen
     Situation liegt. Rike: «Was man leicht ueberpruefen kann, ist
     immer: passt Urne zu Term? Das sind Paerchen, die passen oder
     passen nicht. Und dann gibt es die zweite Frage, passen diese
     Paerchen zu der Situation, zu der man sie gelegt hat? Das muesste
     man anders markieren.»

     Also zwei Kanaele:

       1) DAS PAAR - an den Karten selbst.
          gruen   Urne und Term gehoeren zusammen (auch: zwei
                  zusammengehoerige Distraktoren)
          rot     sie gehoeren nicht zusammen
          gepunktet  erst eine Karte, noch kein Paar

       2) DIE SITUATION - am Platz, mit Rand UND Wort. Sie wird nur
          beurteilt, wenn das Paar stimmt; ueber ein zerrissenes Paar
          laesst sich nicht sagen, wohin es gehoert.
          gruen   passt zu der Situation, unter der es liegt - oder ist
                  ein Distraktorpaar OHNE Situation, sein richtiger Platz
          rot     passt nicht zu dieser Situation - oder ein
                  Distraktorpaar liegt faelschlich unter einer
          gestrichelt  Situation fehlt noch (kein Fehler, ein Zwischenstand)

     Die Situationskarte im Kopf bekommt ihr eigenes Urteil aus dem, was
     unter ihr liegt: Zeigen die richtigen Paare der Gruppe alle auf sie,
     ist sie gruen; zeigt eines woanders hin, ist sie rot.

     WICHTIG fuer die Verlaesslichkeit (das war der eigentliche Fehler,
     ueber den Rike und Maurus gestolpert sind): Diese Funktion liest
     NUR den DOM - welche Karte liegt in welchem Platz, welche Karte
     liegt im Kopf. Kein gespeicherter Zustand, kein Ergebnis von
     vorhin. Und markenLoeschen() in flaeche.js raeumt bei JEDER
     Kartenbewegung die alte Anzeige weg, damit auf dem Feld nie ein
     Urteil steht, das nicht zum aktuellen Bild gehoert. Egal wann
     jemand drueckt: gezeigt wird der Stand von jetzt.

     Gezaehlt wird ausserdem, was noch nicht beurteilt werden KANN:
     Karten auf den Quellflaechen (`offen`) und - als Sicherheitsnetz -
     Karten, die im sortierten Feld liegen, ohne auf einem Platz zu
     sein (`verirrt`). Ohne diese beiden Zahlen sagte «alles richtig»
     nichts darueber, ob ueberhaupt schon alles gelegt ist. */
  function pruefen(){
    markenLoeschen();

    const sitmarke = (platz, wort, art) => {
      const m = document.createElement('span');
      m.className = 'sitmarke ' + art;
      m.textContent = wort;
      m.title = wort;            // falls die Platzbreite den Text kuerzt
      platz.appendChild(m);
    };
    // Die laufende Nummer einer Karte, ohne Sortenvorsatz: U12a -> 12a,
    // UD3 -> 3. Damit laesst sich pruefen, ob UD3 und TD3 dasselbe
    // Distraktorpaar sind - der Generator bildet sie ausdruecklich so.
    const nummer = k => k.dataset.id.replace(/^(SS|UD|TD|U|T)/, '');
    const sorte  = k => (k.dataset.id[0] === 'U' ? 'U' : 'T');
    const kopfVon = gi => {
      const k = document.querySelector(`[data-ort="g${gi}/sit"] > .k`);
      return k ? parseInt(k.dataset.id.slice(2)) : null;
    };

    let paarOk=0, paarFalsch=0, paarHalb=0;
    let sitOk=0, sitFalsch=0, sitOffen=0;
    const zeigtAuf = {};        // je Gruppe: worauf ihre richtigen Paare zeigen

    document.querySelectorAll('.paar').forEach(platz=>{
      const ort = platz.dataset.ort || '';
      if (ort.endsWith('/sit')) return;          // der Kopf wird unten beurteilt
      const karten = [...platz.querySelectorAll(':scope > .k')];
      if (!karten.length) return;
      const gi = parseInt(ort.slice(1));

      // ── Kanal 1: haelt das Paar zusammen?
      if (karten.length === 1){
        karten[0].classList.add('halb'); paarHalb++;
        platz.classList.add('sit-warte');
        sitmarke(platz, 'Paar unvollständig', '');
        return;
      }
      const soll = karten.map(k => D.loesung[k.dataset.id]);
      const beideD = soll.every(s => s === 0);
      let paarStimmt;
      if (sorte(karten[0]) === sorte(karten[1])) paarStimmt = false;  // zwei Urnen, zwei Terme
      else if (beideD)          paarStimmt = nummer(karten[0]) === nummer(karten[1]);
      else if (soll.some(s=>s===0)) paarStimmt = false;               // Distraktor mit echter Karte
      else                      paarStimmt = soll[0] === soll[1];
      karten.forEach(k => k.classList.add(paarStimmt ? 'ok' : 'falsch'));
      if (paarStimmt) paarOk++; else paarFalsch++;

      // ── Kanal 2: passt das Paar zu der Situation, unter der es liegt?
      if (!paarStimmt){
        platz.classList.add('sit-warte');
        sitmarke(platz, 'erst das Paar klären', '');
        return;
      }
      const kopf = kopfVon(gi);
      if (beideD){
        if (kopf === null){
          platz.classList.add('sit-ok'); sitOk++;
          sitmarke(platz, 'ohne Situation — richtig so', 'ok');
        } else {
          platz.classList.add('sit-falsch'); sitFalsch++;
          sitmarke(platz, 'gehört unter keine Situation', 'falsch');
        }
        return;
      }
      (zeigtAuf[gi] = zeigtAuf[gi] || []).push(soll[0]);
      if (kopf === null){
        platz.classList.add('sit-offen'); sitOffen++;
        sitmarke(platz, 'Situation fehlt noch', 'offen');
      } else if (soll[0] === kopf){
        platz.classList.add('sit-ok'); sitOk++;
        sitmarke(platz, 'passt zu dieser Situation', 'ok');
      } else {
        platz.classList.add('sit-falsch'); sitFalsch++;
        sitmarke(platz, 'passt nicht zu dieser Situation', 'falsch');
      }
    });

    // Die Situationskarte im Kopf: Urteil aus dem, was unter ihr liegt.
    // Nur die RICHTIGEN Paare zaehlen - ein zerrissenes Paar sagt nichts
    // ueber die Situation aus, und die Karte dafuer rot zu faerben
    // bestrafte einen Fehler eine Zeile tiefer.
    document.querySelectorAll('[data-ort$="/sit"]').forEach(kopfPlatz=>{
      const k = kopfPlatz.querySelector(':scope > .k');
      if (!k) return;
      const gi = parseInt((kopfPlatz.dataset.ort || '').slice(1));
      const ziele = zeigtAuf[gi] || [];
      if (!ziele.length) return;                 // nichts Beurteilbares darunter
      const nr = parseInt(k.dataset.id.slice(2));
      const stimmt = ziele.every(z => z === nr);
      k.classList.add(stimmt ? 'sitok' : 'sitfalsch');
      kopfPlatz.classList.add(stimmt ? 'sit-ok' : 'sit-falsch');
      sitmarke(kopfPlatz, stimmt ? 'passt zu den Paaren darunter'
                                 : 'passt NICHT zu den Paaren darunter',
                          stimmt ? 'ok' : 'falsch');
    });

    stand.geprueft = true;

    // Was von der laufenden Welle liegt noch auf einer Quellflaeche?
    const QUELLORTE = ['tischS','tischU','tischT'];
    const offen = D.karten.filter(k =>
      (D.stufe[k.id] ?? 0) <= stand.e1stufe
      && QUELLORTE.includes((stand.karten[k.id]||{}).ort)).length;
    // Sicherheitsnetz: Karten, die im sortierten Feld liegen, ohne auf
    // einem Platz zu sein. Seit der Reparatur in flaeche.js/ablegen()
    // sollte das nicht mehr vorkommen; wenn doch, wird es gesagt statt
    // verschwiegen - vorher fielen solche Karten stillschweigend aus
    // der Zaehlung, und «alles richtig» war schlicht falsch.
    const verirrt = feld.querySelectorAll(':scope > .k').length;

    const satz = [];
    const paare = paarOk + paarFalsch;
    if (!paare && !paarHalb) satz.push('Es liegt noch nichts in den Feldern.');
    else {
      satz.push(`Paare: ${paarOk} von ${paare} passen zusammen.`);
      if (paarHalb) satz.push(paarHalb === 1
        ? 'Eine Karte liegt noch allein auf einem Platz.'
        : `${paarHalb} Karten liegen noch allein auf einem Platz.`);
      if (sitOk || sitFalsch || sitOffen){
        const t = [`Zuordnung: ${sitOk} richtig`];
        if (sitFalsch) t.push(`${sitFalsch} unter der falschen Situation`);
        if (sitOffen)  t.push(`${sitOffen} noch ohne Situation`);
        satz.push(t.join(', ') + '.');
      }
    }
    if (offen) satz.push(`Noch auf dem Tisch: ${offen} `
      + (offen === 1 ? 'Karte.' : 'Karten.'));
    if (verirrt) satz.push((verirrt === 1
        ? 'Eine Karte liegt lose im Feld'
        : `${verirrt} Karten liegen lose im Feld`)
      + ', auf keinem Platz — bitte auf einen Platz ziehen.');

    const fertigeWelle = paare > 0 && !offen && !verirrt && !paarHalb
                         && !paarFalsch && !sitFalsch && !sitOffen;
    if (fertigeWelle){
      satz.push('Alles, was ausliegt, ist richtig zugeordnet.');
      // Der Knopf faellt aus dem «Trotzdem»-Zustand zurueck, sobald der
      // Stand stimmt - sonst bliebe die Warnung stehen, nachdem sie
      // erledigt ist.
      const m = document.getElementById('mehrstufe');
      if (m && m.dataset.trotzdem === 'ja'){
        delete m.dataset.trotzdem;
        m.textContent = 'Weitere Situationen zuschalten';
      }
    }
    document.getElementById('befund').textContent = satz.join(' ');
    return {paarOk, paarFalsch, paarHalb, sitOk, sitFalsch, sitOffen,
            offen, verirrt, fertigeWelle};
  }
  document.getElementById('fertig').onclick = pruefen;
  document.getElementById('weiter').onclick = ()=>{ stand.etappe=1; los(); };
  loesungsKnopf(() => etappe1());
}

/* ───────── Etappe 2 ───────── */
/* Ein moegliches Beispiel aus auswahl.STRATEGIE, als fertig benanntes
   und sortiertes Brett - siehe _loesung_e2() in flaeche.py. Die
   Positionen innerhalb jeder Gruppe raeumt gruppeOrdnen() danach auf,
   sobald die Gruppen-Divs im DOM stehen (siehe etappe2() unten). */
function _loesungStandE2(){
  const karten = {}, gruppen = [];
  D.loesung_e2.gruppen.forEach(g=>{
    const gi = gruppen.length;
    gruppen.push({name: g.name, karten: []});
    g.modelle.forEach(m => { karten[m] = {ort:'g'+gi, x:0, y:0, rot:0}; });
  });
  return {karten, gruppen};
}

function etappe2(){
  const a = D.etappen[1];
  loesungAnwenden(_loesungStandE2);
  // NEU (2026-08-21, Rikes Entscheidung): Die Situationsleiste ueber der
  // Flaeche entfaellt ersatzlos, und der Knopf «Zu welcher Situation
  // gehoert das?» mit ihr - es gibt nichts mehr ein- und auszublenden.
  // Die Modellkarten tragen ihre Situationsnummer von Anfang an, und ein
  // Klick auf die Nummer zeigt die Situation im Wortlaut.
  //
  // Das hebt die Entscheidung «Die Abloesung von der Situation in E2
  // bleibt, wird aber sichtbar gemacht» vom selben Tag teilweise auf:
  // Die Anzeige bleibt, der Knopf davor faellt weg. Im Entscheidungslog
  // als ueberholt markiert.
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 2 · Strategien',
    text:'Nehmen Sie die Modellkarten wieder auf und gruppieren Sie sie danach, '
       + '<b>welche Strategie in ihnen steckt</b>. Geben Sie jeder Gruppe einen Namen. '
       + '<span class="zart">Die Zahl auf einer Karte sagt, aus welcher Situation '
       + 'sie stammt — ein Klick darauf zeigt die Situation.</span>'},
    'Modellkarten', 'Ihre Gruppen',
    `<span class="befund" id="befund">Sie benennen die Gruppen selbst. Es gibt keine richtige Zahl.</span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Weiter zu Etappe 3 →</button>`);

  const feld = document.getElementById('feld'), tisch = document.getElementById('tisch');
  if (!stand.gruppen.length) stand.gruppen = [{name:'',karten:[]},{name:'',karten:[]}];
  // NEU (2026-08-21, Rikes Einwand): KEINE Distraktoren in Etappe 2.
  // Auch in ihnen steckt eine Strategie - aber hier soll die Strategie an
  // eine Situation gekoppelt werden, und dazu haben sie keine. Sie
  // blieben in Etappe 1 liegen, wo sie hingehoeren.
  // NEU (2026-08-24): Nur Modelle aus Wellen, die in Etappe 1 tatsaechlich
  // freigeschaltet wurden - sonst tauchen hier Strategiekarten zu
  // Situationen auf, die eine Gruppe nie gesehen hat, weil sie mit der
  // ersten oder zweiten Welle in Etappe 1 aufgehoert hat.
  // Die Loesung zeigt den ganzen Einstiegssatz, unabhaengig davon, wie
  // weit die Wellen in Etappe 1 tatsaechlich aufgezogen wurden - sonst
  // fehlten Modelle aus spaeteren Wellen im fertig sortierten Brett.
  const modelle = D.karten.filter(k=>k.typ==='U'
    && (stand.loesungOffen || (D.stufe[k.id] ?? 0) <= (stand.e1stufe ?? 0))).map(k=>k.id);
  const els = {};
  /* NEU (2026-09-10, siehe merken() in der Flaeche): Diese Etappe zeigt
     nur die Modellkarten. Ohne diese Angabe strich merken() beim ersten
     Ablegen alle Situations- und Termkarten aus dem Stand - und damit
     die Sortierung von Etappe 1. Gemeldet wird die GRUNDkennung, damit
     Kopien (id#N) mitzaehlen und beim Weglegen weiterhin verschwinden. */
  const _meine = new Set(modelle);
  window._zustaendig = id => _meine.has(id.split('#')[0]);
  modelle.forEach(id=>{
    const n = D.loesung[id];
    // Von Anfang an, nicht mehr auf Knopfdruck.
    els[id] = karte(id, n
      ? {text:String(D.anzeige[n]), art:'sit', titel:D.situationstexte['SS'+n]}
      : null);
  });

  function gruppen(){
    feld.querySelectorAll('.feld').forEach(d=>d.remove());
    const kb = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--kb'));
    const bb = feld.clientWidth||520, fw = Math.min(bb-16, kb*2+30), fh = kb*1.5;
    const sp = Math.max(1, Math.floor((bb-8)/(fw+10)));
    stand.gruppen.forEach((g,i)=>{
      const d = document.createElement('div');
      d.className='feld'; d.dataset.ort='g'+i;
      d.style.left = (8 + (i%sp)*(fw+10))+'px';
      d.style.top  = (26 + Math.floor(i/sp)*(fh+10))+'px';
      d.style.width=fw+'px'; d.style.height=fh+'px';
      const inp=document.createElement('input');
      inp.className='gname'; inp.placeholder='Wie heisst diese Strategie?';
      inp.value=g.name; inp.oninput=e=>g.name=e.target.value;
      d.appendChild(inp); feld.appendChild(d);
    });
    // Das Plus liegt AUF der Flaeche, wie bei SORTs offenen Sortierungen
    const i = stand.gruppen.length;
    const p = document.createElement('div');
    p.className='feld neu';
    p.style.left=(8+(i%sp)*(fw+10))+'px'; p.style.top=(26+Math.floor(i/sp)*(fh+10))+'px';
    p.style.width=fw+'px'; p.style.height=fh+'px';
    p.innerHTML='<span>+ noch eine Gruppe</span>';
    p.onclick=()=>{ stand.gruppen.push({name:'',karten:[]}); gruppen(); };
    feld.appendChild(p);
    feld.style.minHeight=(26+Math.ceil((i+1)/sp)*(fh+10)+20)+'px';
    const heimatlos = [];
    // Die Hoehen oben sind VORgerechnet, fuer leere Gruppen. Wie hoch
    // eine Gruppe wirklich wird, weiss erst gitterSetzen() - nach dem
    // Einsetzen der Karten unten wird deshalb noch einmal gestapelt.
    Object.entries(stand.karten).forEach(([id,s])=>{
      const el=els[id]; if(!el) return;
      // FEHLERBEHOBEN (2026-08-24): Etappe 1 legt frisch freigeschaltete
      // Karten jetzt auf 'tischS'/'tischU'/'tischT' ab (drei Quellflaechen
      // statt einem Tisch), nicht mehr auf das schlichte 'tisch'. Ein
      // Modell, das in Etappe 1 nie angefasst wurde, trug deshalb einen
      // Ort, den Etappe 2 nicht kannte - `feld.querySelector` fand nichts,
      // `ziel` blieb undefined, und die Karte erschien nirgends. Gemessen:
      // Direkt zu Etappe 2 gesprungen, «Modellkarten» komplett leer.
      const ziel = s.ort.startsWith('tisch') ? tisch : feld.querySelector(`[data-ort="${s.ort}"]`);
      if(ziel){ ziel.appendChild(el); el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el); }
      /* FEHLERBEHOBEN (2026-09-10, zweite Haelfte von Rikes Bericht:
         «da war dann irgendwie keine Urnenkarte zu sehen»): Ein Modell,
         das in Etappe 1 in einer Gruppe liegt, traegt den Ort «g0/p0».
         Etappe 2 kennt nur «g0» - der querySelector fand nichts, `ziel`
         blieb null, und die Karte erschien NIRGENDS. Wer in Etappe 1
         gruendlich sortiert hatte, fand hier einen leeren Tisch.
         Der Ort gehoert einer anderen Etappe; hier kommt die Karte
         zurueck auf den Tisch, wo der Auftrag sie erwartet («Nehmen Sie
         die Modellkarten wieder auf»). */
      else { el.dataset.fremdlage = JSON.stringify(s); heimatlos.push(el); }
    });
    // Sie liegen hier auf dem Tisch, aber ihr Platz drueben bleibt
    // stehen, solange sie hier niemand anfasst - siehe merken().
    if (heimatlos.length) streuen(heimatlos, tisch);
    gitterSetzen(feld);
  }
  window._neuzeichnen = gruppen;      // sonst zeichnet Etappe 1 hier hinein
  gruppen();
  const neu = modelle.filter(id=>!(id in stand.karten)).map(id=>els[id]);
  if (neu.length) { streuen(neu, tisch); merken(); }
  else Object.entries(stand.karten).forEach(([id,s])=>{
    const el=els[id]; if(!el) return;
    const ziel = s.ort.startsWith('tisch') ? tisch : feld.querySelector(`[data-ort="${s.ort}"]`);
    if(ziel){ ziel.appendChild(el); el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el); }
  });
  // Nach dem Ausstreuen und Einsetzen steht der Stand - erst jetzt
  // merken, sonst faellt gerade Korrigiertes wieder heraus.
  merken();
  // Die Loesung setzt nur, WELCHE Gruppe eine Karte traegt - WO sie
  // innerhalb der Gruppe liegt, richtet dasselbe Raster her, das auch
  // beim Ablegen von Hand greift.
  if (stand.loesungOffen) feld.querySelectorAll(':scope > .feld:not(.neu)').forEach(gruppeOrdnen);

  /* Welche Situation liegt in mehreren Gruppen? Das ist die
     Moderationsfrage aus dem Skript - «Wenn dieselbe Situation in
     mehreren Gruppen liegt, wovon ist die Strategie dann eine
     Eigenschaft?». Sie laesst sich nur stellen, wenn man die Streuung
     sieht.

     Vorher stand die Meldung im Umschalter und erschien nur, wenn man
     ihn drueckte. Jetzt laeuft sie mit: nach jedem Ablegen neu
     gerechnet. */
  function streuungMelden(){
    const b = document.getElementById('befund');
    if (!b) return;
    const nachOrt = {};
    Object.entries(stand.karten).forEach(([id,s])=>{
      const n = D.loesung[id];
      if (!n || !s.ort.startsWith('g')) return;
      (nachOrt[D.anzeige[n]] = nachOrt[D.anzeige[n]] || new Set()).add(s.ort);
    });
    const mehr = Object.entries(nachOrt)
      .filter(([,orte])=>orte.size>1).map(([n])=>n).sort((x,y)=>x-y);
    b.textContent = mehr.length
      ? `Situation ${mehr.join(', ')} liegt in mehreren Gruppen. `
        + `Wovon ist die Strategie dann eine Eigenschaft?`
      : 'Sie benennen die Gruppen selbst. Es gibt keine richtige Zahl.';
  }
  /* NEU (2026-09-10, Rueckmeldung der Studierenden): gitterSetzen() muss
     mit. gruppeOrdnen() machte beim Ablegen die eine Gruppe hoeher, und
     die Zeile darunter blieb stehen, wo sie war - «die Gruppen haben
     sich überschnitten». Der Haken traegt nur EINE Funktion, und
     streuungMelden() stand schon darin; deshalb beides hier zusammen
     und nicht zweimal gesetzt (das zweite gewinnt sonst stillschweigend
     - genau der Fehler, der beim Bauen dieser Zeile passiert ist). */
  window._nachAblegen = ()=>{ gitterSetzen(feld); streuungMelden(); };
  streuungMelden();

  document.getElementById('weiter').onclick = ()=>{ stand.etappe=2; los(); };
  loesungsKnopf(() => etappe2());
}

/* ───────── Etappe 3 ───────── */
/* Moegliche Loesung fuer Etappe 3 - NEU (2026-08-25, Rikes Auftrag "auf
   der Grundlage müsstest du Etappe 3 eine Lösung anbieten können"). Baut
   dieselben zehn Gruppen wie Etappe 2 (gleiche Reihenfolge, damit die
   Gruppenindizes uebereinstimmen) und legt jede Eis-Situation und jede
   Skript-Aufgabe in die Gruppe, die D.loesung_e3 ihr zuweist (siehe
   flaeche.py, _loesung_e3 - PRUEFEN, mit Rike nicht bestaetigt fuer die
   sechs Skript-Karten). Erzwingt ausserdem stand.e3/e3gezeigt, damit die
   Loesung sofort das volle Brett zeigt statt des Wahlbildschirms. */
function _loesungStandE3(){
  const namen = D.loesung_e2.gruppen.map(g=>g.name);
  const idxVon = name => namen.indexOf(name);
  const gruppen = namen.map(name=>({name, karten:[]}));
  const karten = {};
  D.eis.forEach(e=>{
    const strat = D.loesung_e3.eis[e.id];
    if (strat) karten[e.id] = {ort:'g'+idxVon(strat), x:0, y:0, rot:0};
  });
  D.skript.forEach(s=>{
    const strat = D.loesung_e3.skript[s.id];
    if (strat) karten[s.id] = {ort:'g'+idxVon(strat), x:0, y:0, rot:0};
  });
  return {karten, gruppen, e3:'eis', e3gezeigt:['eis','skript']};
}

function etappe3(){
  loesungAnwenden(_loesungStandE3);
  if (!stand.e3){
    const b = document.getElementById('buehne');
    b.innerHTML = `<div class="start">
      <h2>Etappe 3 · Übertragen</h2>
      <p style="color:var(--matt)">Sie haben Strategien herausgearbeitet.
         Woran wollen Sie sie erproben?</p>
      <div class="wahl" data-w="skript"><b>Erst mal die Aufgaben aus dem Skript</b>
        <span>Sechs Aufgaben aus einem fremden Zusammenhang. Sie kennen ihre
        Lösungen — hier können Sie sich prüfen. Wenn Sie unsicher sind, fangen
        Sie hier an.</span></div>
      <div class="wahl" data-w="eis"><b>Erst mal neue Situationen aus der Eisdiele</b>
        <span>Acht neue Fragen, dieselbe Eisdiele. Keine Lösung zum Abgleichen —
        dafür können Sie selbst nachzählen. Wenn Sie sicher sind, nehmen Sie diese.</span></div>
      <p class="hinweis">Eines genügt. Das andere lässt sich später dazunehmen.</p></div>`;
    b.querySelectorAll('.wahl').forEach(w=>w.onclick=()=>{stand.e3=w.dataset.w;etappe3();});
    // GEAENDERT (2026-08-25): Springt jetzt direkt ins volle geloeste
    // Brett, statt nur eine Texthinweis-Randnotiz zu zeigen - siehe
    // _loesungStandE3() oben. Ohne diesen Knopf saehe man auf dem
    // Wahlbildschirm ueberhaupt keine Loesungsoption.
    if (window.KASPER_RUECKMELDUNG){
      const kn = document.createElement('button');
      kn.className = 'knopf leer loesungknopf';
      kn.textContent = 'Lösung anzeigen';
      kn.onclick = () => { stand.loesungOffen = true; etappe3(); };
      b.querySelector('.start').appendChild(kn);
    }
    return;
  }
  const a = D.etappen[stand.e3==='eis'?2:3];
  if (!stand.e3gezeigt) stand.e3gezeigt = [stand.e3];
  const liste = stand.e3gezeigt.includes('eis') && stand.e3gezeigt.includes('skript')
    ? D.eis.concat(D.skript)
    : (stand.e3gezeigt[0]==='eis' ? D.eis : D.skript);
  const beide = stand.e3gezeigt.length > 1;
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 3 · Übertragen',
    // NEU (2026-08-21, Rikes Einwand): «mit dem kleinen Knopf
    // verdoppeln» war unverstaendlich - gemeint ist das Plus unten
    // rechts auf der Karte, und das stand nirgends.
    text:'Welche Strategie greift bei welcher Aufgabe? Legen Sie jede Aufgabe zu '
       + 'der Strategie, die Ihnen am naheliegendsten scheint. '
       + '<span class="zart">Passt eine Aufgabe zu mehreren Strategien, legen Sie '
       + 'mit dem <b>+</b> auf der Karte eine zweite Kopie an.</span>'},
    beide ? 'Alle Aufgaben' :
      (stand.e3gezeigt[0]==='eis' ? 'Neue Situationen aus der Eisdiele'
                                  : 'Aufgaben aus dem Skript'),
    'Ihre Strategien',
    // Die Situationsleiste entfaellt auch hier, und mit ihr der
    // Umschalter «Situationen einblenden». Die Modellkarten aus
    // Etappe 2 tragen ihre Nummer ohnehin, und ein Klick darauf zeigt
    // die Situation - dieselbe Bewegung wie eine Etappe vorher.
    (beide ? '' : `<button class="knopf leer" id="wechsel">Weitere Aufgaben dazunehmen</button>`)
     + `<span class="befund">${beide
        ? 'Jetzt liegt beides nebeneinander — Eis und Skript.'
        : 'Später können Sie die übrigen dazunehmen.'}</span>`);

  const feld = document.getElementById('feld'), tisch = document.getElementById('tisch');
  // NEU (2026-09-10): els fuehrt die Karten dieser Etappe. Vorher gab
  // es hier keine Buchfuehrung - deshalb konnten die «+»-Kopien beim
  // Neuzeichnen verschwinden. kopierGeste() braucht sie ohnehin.
  const els = {};
  const kb = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--kb'));
  const bb = feld.clientWidth||520, fw=Math.min(bb-16,kb*2+30), fh=kb*1.5;
  const sp = Math.max(1, Math.floor((bb-8)/(fw+10)));
  stand.gruppen.forEach((g,i)=>{
    const d=document.createElement('div');
    d.className='feld'; d.dataset.ort='g'+i;
    d.style.left=(8+(i%sp)*(fw+10))+'px'; d.style.top=(26+Math.floor(i/sp)*(fh+10))+'px';
    d.style.width=fw+'px'; d.style.height=fh+'px';
    d.innerHTML=`<div class="gname" style="border:none">${g.name||'(ohne Namen)'}</div>`;
    feld.appendChild(d);
  });
  // NEU (2026-08-21): Was in Etappe 2 sortiert wurde, bleibt liegen.
  // Ohne die Modellkarten waeren die Gruppen nur noch Namen, und man
  // koennte nicht mehr nachsehen, warum eine Gruppe so heisst.
  Object.entries(stand.karten).forEach(([id,s])=>{
    if (!s.ort.startsWith('g')) return;
    const alt = document.querySelector(`.k[data-id="${id}"]`);
    if (alt) return;
    const ziel = feld.querySelector(`[data-ort="${s.ort}"]`);
    if (!ziel) return;
    // NEU (2026-08-21): Die Modellkarten aus Etappe 2 tragen hier ihre
    // Situationsnummer. Ueber die Marke laesst sich die Situation lesen -
    // dieselbe Bewegung wie in Etappe 2, und man erkennt die eigene
    // Sortierung wieder, ohne zurueckblaettern zu muessen.
    const n = D.loesung[id];
    const el = karte(id, n ? {text:String(D.anzeige[n]), art:'sit',
                              titel:D.situationstexte['SS'+n]} : null);
    el.style.opacity = '.68';        // was schon liegt, tritt zurueck
    ziel.appendChild(el); el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el);
  });
  feld.style.minHeight=(26+Math.ceil(stand.gruppen.length/sp)*(fh+10)+20)+'px';
  // Wie in Etappe 2: die Hoehen oben sind fuer LEERE Gruppen gerechnet.
  // Hier liegen die Karten aus Etappe 2 schon drin, also muss gleich
  // beim Aufbau gestapelt werden - und nach jedem Ablegen wieder.
  window._nachAblegen = ()=>{
    const geaendert = vorratWahren();
    gitterSetzen(feld);
    if (geaendert) merken();
  };

  // FEHLERBEHOBEN: Beim Dazulegen des zweiten Stapels wurden die schon
  // gelegten Karten uebersprungen - und weil die Buehne neu aufgebaut
  // wird, verschwanden sie ganz. Jetzt kommen sie an ihren Platz zurueck.
  /* GEAENDERT (2026-09-10, Rikes Rueckmeldung «das ist muehsam»): Das
     «+» ist weg, die Geste selbst ist die Kopie - dieselbe Regel wie in
     den anderen Kapiteln, gemeinsam in flaeche.js (kopierGeste).

     Der alte Knopf hatte hier zusaetzlich einen stillen Fehler: Die
     Kopie wurde zwar gebaut und abgelegt, aber NIE in els eingetragen.
     Beim naechsten Neuzeichnen (Fenstergroesse, Loesung, Etappenwechsel)
     fand felder() kein Element zu ihrer Kennung - die Kopie war weg,
     ihr Eintrag im Stand blieb. Das Zaehlwerk stimmte danach nicht mehr.
     Mit der gemeinsamen Geste kann das nicht mehr passieren: Sie fuehrt
     els selbst. */
  const marken = {};
  liste.forEach(x=>{ marken[x.id] = {text:x.marke, art:x.art}; });
  const grund3 = id => id.split('#')[0];
  const aufgabenkarte = id =>
    karte(id, marken[grund3(id)] || {text:'', art:'skript'});

  function vorratWahren(){
    return kopierGeste({
      tisch, els, bauen: aufgabenkarte,
      ziele: () => [...feld.querySelectorAll(':scope > .feld')],
    });
  }

  const neue = [];
  liste.forEach(x=>{
    const el = aufgabenkarte(x.id);
    els[x.id] = el;
    const s = stand.karten[x.id];
    if (s){
      const ziel = s.ort==='tisch' ? tisch : feld.querySelector(`[data-ort="${s.ort}"]`);
      (ziel || tisch).appendChild(el);
      el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el);
    } else neue.push(el);
  });
  if (neue.length) streuen([...tisch.querySelectorAll('.k'), ...neue], tisch);
  gitterSetzen(feld);
  merken();
  const w = document.getElementById('wechsel');
  if (w) w.onclick=()=>{
    stand.e3gezeigt.push(stand.e3gezeigt[0]==='eis' ? 'skript' : 'eis');
    etappe3(); };

  // GEAENDERT (2026-08-25): Zeigt jetzt das fertig sortierte Brett -
  // siehe _loesungStandE3() oben. Die Zielgruppen sind zwar die in
  // Etappe 2 selbst benannten Strategien, aber D.loesung_e3 ordnet jede
  // Aufgabe trotzdem einer von ihnen zu (ueber die Situationsnummer bzw.
  // die Aufgabenstruktur), als EIN mögliches Beispiel.
  if (stand.loesungOffen) feld.querySelectorAll(':scope > .feld').forEach(gruppeOrdnen);
  loesungsKnopf(() => etappe3());
}


/* Anmeldung bei der gemeinsamen Flaeche. Die Reihenfolge im Array ist
   die Reihenfolge in der Navigation. */
ETAPPEN.push(etappe1, etappe2, etappe3);
