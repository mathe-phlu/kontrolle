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
       + 'sich weitere.</span>'},
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
  const els = {};
  D.karten.forEach(k=>{
    els[k.id] = k.typ === 'SS'
      ? karte(k.id, {text: String(D.anzeige[parseInt(k.id.slice(2))]), art:'sit'})
      : karte(k.id);
  });

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

    const paarplaetze = (d, id, zahl, oben, plus) => {
      for (let i=0;i<zahl;i++){
        const pz = document.createElement('div');
        pz.className='paar'; pz.dataset.ort = id+'/p'+i;
        pz.style.left='7px'; pz.style.top=(oben+i*(kh+8))+'px';
        pz.style.width=(fw-14)+'px'; pz.style.height=kh+'px';
        if (i===0) pz.innerHTML='<span class="hint">Urnenmodell</span>'
          + '<span class="hint" style="left:auto;right:6px">Term</span>';
        d.appendChild(pz);
      }
      const p = document.createElement('div');
      p.className='feld neu'; p.style.position='absolute';
      p.style.left='7px'; p.style.top=(oben+zahl*(kh+8))+'px';
      p.style.width=(fw-14)+'px'; p.style.height='26px';
      p.innerHTML='<span>+ weiteres Paar</span>';
      p.onclick=()=>{ plus(); felder(); };
      d.appendChild(p);
    };

    stand.e1gruppen.forEach((g, gi)=>{
      const d = document.createElement('div');
      d.className='feld'; d.dataset.ort='g'+gi;
      d.style.left=x+'px'; d.style.top='26px'; d.style.width=fw+'px';
      const kopfH = kh + 12;
      const h = kopfH + g.paare*(kh+8) + 32;
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

    // Karten an ihre Plaetze
    Object.entries(stand.karten).forEach(([id,s])=>{
      const el = els[id]; if (!el) return;
      const ziel = document.querySelector(`[data-ort="${s.ort}"]`) || feldS;
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

  const mehrstufe = document.getElementById('mehrstufe');
  if (mehrstufe) mehrstufe.onclick = ()=>{
    stand.e1stufe++;
    freischalten(stand.e1stufe);
    merken();
    etappe1();               // Buehne neu aufbauen: neuer Stufenname, ggf. Knopf weg
  };
  document.getElementById('zurueckalles').onclick = ()=>{
    stand.karten={}; stand.e1gruppen=[];
    freischalten(stand.e1stufe);
    felder(); tischOrdnen(); merken();
    document.getElementById('befund').textContent='';
  };

  /* Pruefung, platzweise statt kartenweise.

     NEU (2026-08-21, Rikes Entscheidung): Ein falsch angelegter
     Situationskopf machte bisher ALLE Paare darunter falsch, auch wenn
     das Paar selbst stimmte - das bestraft richtige Arbeit fuer einen
     Fehler eine Zeile hoeher. Zwei Dinge werden unterschieden:

       haelt das Paar zusammen?   Urne und Term derselben Situation
       steht es am richtigen Ort? unter dem passenden Kopf

     GEAENDERT (2026-08-24, Rikes Umbau der Ablage): Es gibt keine
     eigene Ablage-Spalte mehr, also auch keinen separaten «fastAblage»-
     Fall. Der Kopf einer Gruppe wird nicht mehr aus einem gespeicherten
     `g.sit` gelesen (das lief auseinander, sobald jemand eine
     Situationskarte nachtraeglich in einen leeren Kopf zog), sondern
     live aus dem, was tatsaechlich im Kopf liegt.

     Drei Zustaende, nicht mehr vier:
       richtig (gruen)   Paar stimmt, UND die Situation stimmt (oder es
                          ist ein Distraktorpaar OHNE Situationskopf -
                          das ist sein richtiger, endgueltiger Platz)
       auf dem Weg (ocker) Paar stimmt, aber die Situation fehlt noch
                          oder ist falsch - oder ein Distraktorpaar liegt
                          faelschlich UNTER einer Situation
       falsch (rot)       Karten, die nicht zueinander gehoeren, oder ein
                          Distraktor mit einer echten Karte gemischt */
  document.getElementById('fertig').onclick = ()=>{
    document.querySelectorAll('.k').forEach(k=>
      k.classList.remove('ok','falsch','fastok'));

    let richtig=0, fast=0, falsch=0, gelegt=0;
    const setz = (karten, zustand) => {
      karten.forEach(k=>k.classList.add(zustand==='fast' ? 'fastok' : zustand));
      gelegt += karten.length;
      if (zustand==='ok') richtig += karten.length;
      else if (zustand==='fast') fast += karten.length;
      else falsch += karten.length;
    };

    document.querySelectorAll('.paar').forEach(platz=>{
      const ort = platz.dataset.ort || '';
      if (ort.endsWith('/sit')) return;             // der Kopf wird nicht benotet
      const karten = [...platz.querySelectorAll(':scope > .k')];
      if (!karten.length) return;
      const soll = karten.map(k=>D.loesung[k.dataset.id]);

      const gi = parseInt(ort.slice(1));
      // Live aus dem Kopf lesen, nicht aus einem gespeicherten Feld -
      // siehe Vermerk oben und bei _e1ablage.
      const kopfKarte = document.querySelector(`[data-ort="g${gi}/sit"] > .k`);
      const kopf = kopfKarte ? parseInt(kopfKarte.dataset.id.slice(2)) : null;

      const alleDistraktoren = soll.every(s=>s===0);
      if (alleDistraktoren){
        if (karten.length < 2){ setz(karten, 'fast'); return; }
        // Nicht nur «beides Distraktoren», sondern das ZUSAMMENGEHOERIGE
        // Paar - der Generator sagt ausdruecklich «Distraktor-Paare:
        // Urne UDk + Term TDk».
        const nr = karten.map(k=>k.dataset.id.replace(/^[UT]D/, ''));
        const passtZusammen = nr[0] === nr[1];
        // Ein Distraktorpaar gehoert NIE unter eine Situation - das ist
        // sein richtiger Platz, keine Zwischenstation.
        setz(karten, (passtZusammen && kopf===null) ? 'ok' : 'fast');
        return;
      }
      if (soll.some(s=>s===0)){ setz(karten, 'falsch'); return; }  // Distraktor mit echter Karte gemischt

      if (karten.length===1){
        if (kopf!==null && soll[0]===kopf) setz(karten,'ok');
        else if (kopf!==null) setz(karten,'falsch');       // unter der falschen Situation
        else setz(karten,'fast');                            // richtig, aber noch ohne Partner/Situation
        return;
      }
      const haeltZusammen = soll[0]===soll[1];
      if (!haeltZusammen){ setz(karten,'falsch'); return; }
      if (kopf===null){ setz(karten,'fast'); return; }        // Paar stimmt, Situation fehlt noch
      setz(karten, soll[0]===kopf ? 'ok' : 'fast');
    });

    stand.geprueft = true;
    const b = document.getElementById('befund');
    if (!gelegt){ b.textContent = 'Es liegt noch nichts in den Feldern.'; return; }
    const satz = [`${richtig} von ${gelegt} richtig.`];
    if (fast) satz.push(`${fast} auf einem guten Weg — Paar oder Situation `
      + `noch nicht vollständig.`);
    b.textContent = satz.join(' ');
  };
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
    });
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
  window._nachAblegen = streuungMelden;
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

  // FEHLERBEHOBEN: Beim Dazulegen des zweiten Stapels wurden die schon
  // gelegten Karten uebersprungen - und weil die Buehne neu aufgebaut
  // wird, verschwanden sie ganz. Jetzt kommen sie an ihren Platz zurueck.
  const neue = [];
  liste.forEach(x=>{
    const el = karte(x.id, {text:x.marke, art:x.art});
    const d = document.createElement('div');
    d.className='dop'; d.textContent='+'; d.title='Karte verdoppeln';
    d.onclick = ev=>{ ev.stopPropagation();
      const kopie = karte(x.id+'#'+(++stand.dupl), {text:x.marke, art:x.art});
      el.parentElement.appendChild(kopie);
      kopie._x = el._x + 16; kopie._y = el._y + 16; pos(kopie); merken(); };
    el.appendChild(d);
    const s = stand.karten[x.id];
    if (s){
      const ziel = s.ort==='tisch' ? tisch : feld.querySelector(`[data-ort="${s.ort}"]`);
      (ziel || tisch).appendChild(el);
      el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el);
    } else neue.push(el);
  });
  if (neue.length) streuen([...tisch.querySelectorAll('.k'), ...neue], tisch);
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
