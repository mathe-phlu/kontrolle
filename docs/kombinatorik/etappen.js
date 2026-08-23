/* ───────── Etappe 1 ─────────
   NEU (2026-08-21, nach Rikes Vorschlag): Kein Raster fertiger
   Situationsfelder mehr. ALLE Karten liegen auf dem Tisch, auch die
   Situationen. Wer eine Situationskarte nach rechts legt, macht damit
   ein Feld auf; darunter kommen die Paare.

   Warum das besser ist: Vorher musste man die Liste von oben nach unten
   durchgehen - erst Situation 1, dann 2. Jetzt darf man mit dem
   anfangen, was man zuerst sieht. Vielleicht faellt ein Term auf, bevor
   die Situation dazu gefunden ist.

   Die Ablage «passt zu keiner Situation» steht oben und nicht ganz
   unten - sonst muesste man jedes Mal ans Ende rollen.
*/
function etappe1(){
  const a = D.etappen[0];
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 1 · Ordnen',
    text:'Legen Sie eine Situationskarte nach rechts — darunter das passende '
       + 'Urnenmodell und den passenden Term, als Paar. '
       + '<span class="zart">Zu den meisten Situationen gibt es <b>zwei</b> Wege, '
       + 'zu manchen sogar drei. Und manche Modelle und Terme passen zu keiner '
       + 'Situation — aber zueinander.</span>'},
    'Tisch — ungeordnet', 'Ihre Zuordnung',
    `<span class="beschriftung">Ausschütten:</span>
     <button class="knopf leer" id="schuettS">Situationen</button>
     <button class="knopf leer" id="schuettU">Urnen</button>
     <button class="knopf leer" id="schuettT">Terme</button>
     <button class="knopf leer" id="zurueckalles" title="Alle Karten zurück auf den Tisch">↺</button>
     <button class="knopf" id="fertig">Prüfen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Etappe 2 →</button>`,
    '', 'Ablage — ohne Situation, aber paarweise');

  const feld = document.getElementById('feld'), tisch = document.getElementById('tisch');
  if (!stand.e1gruppen) stand.e1gruppen = [];
  if (!stand.ablagepaare) stand.ablagepaare = 3;

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

  function felder(){
    feld.querySelectorAll('.feld,.paar').forEach(d=>d.remove());
    const kb = kbw(), kh = kb*0.845 + 10;
    const bb = feld.clientWidth || 520;
    const fw = Math.min(Math.max(bb - 16, kb*2 + 44), kb*2 + 70);
    let y = 26;

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

    // Die Ablage hat eine eigene Flaeche ganz rechts, damit man beim
    // Suchen nach einem Platz nicht durch sie hindurch muss.
    const ablBlatt = document.getElementById('ablage');
    if (ablBlatt){
      ablBlatt.querySelectorAll('.feld,.paar').forEach(d=>d.remove());
      const aw = Math.max((ablBlatt.clientWidth||220) - 16, kb + 24);
      const abl = document.createElement('div');
      abl.className='feld'; abl.dataset.ort='rest';
      abl.style.left='8px'; abl.style.top='26px'; abl.style.width=aw+'px';
      abl.style.height=(10 + stand.ablagepaare*(kh*0.62+8) + 32)+'px';
      abl.style.borderStyle='solid';
      // In der schmalen Flaeche liegen Urne und Term untereinander,
      // nicht nebeneinander - dafuer ist kein Platz.
      for (let i=0;i<stand.ablagepaare;i++){
        const pz=document.createElement('div');
        pz.className='paar'; pz.dataset.ort='rest/p'+i;
        pz.style.left='7px'; pz.style.top=(10+i*(kh*0.62+8))+'px';
        pz.style.width=(aw-14)+'px'; pz.style.height=(kh*0.62)+'px';
        if(i===0) pz.innerHTML='<span class="hint">ein Paar</span>';
        abl.appendChild(pz);
      }
      const pp=document.createElement('div');
      pp.className='feld neu'; pp.style.position='absolute';
      pp.style.left='7px'; pp.style.top=(10+stand.ablagepaare*(kh*0.62+8))+'px';
      pp.style.width=(aw-14)+'px'; pp.style.height='26px';
      pp.innerHTML='<span>+ weiteres Paar</span>';
      pp.onclick=()=>{ stand.ablagepaare++; felder(); };
      abl.appendChild(pp);
      ablBlatt.appendChild(abl);
      ablBlatt.style.minHeight=(60+parseFloat(abl.style.height))+'px';
    }

    stand.e1gruppen.forEach((g, gi)=>{
      const d = document.createElement('div');
      d.className='feld'; d.dataset.ort='g'+gi;
      d.style.left='8px'; d.style.top=y+'px'; d.style.width=fw+'px';
      const kopfH = kh + 12;
      const h = kopfH + g.paare*(kh+8) + 32;
      d.style.height = h+'px';
      const kopf = document.createElement('div');
      kopf.className='paar'; kopf.dataset.ort='g'+gi+'/sit';
      // Genau EINE Situationskarte. Ohne diese Angabe faellt der Kopf
      // unter die Regel «zwei Karten je Platz», und eine zweite
      // Situation legte sich unbemerkt ueber die erste.
      kopf.dataset.fasst = '1';
      kopf.style.left='7px'; kopf.style.top='7px';
      kopf.style.width=(fw-14)+'px'; kopf.style.height=kh+'px';
      kopf.style.background='rgba(152,103,165,.09)';
      kopf.innerHTML='<span class="hint">Situation</span>';
      d.appendChild(kopf);
      paarplaetze(d, 'g'+gi, g.paare, kopfH, ()=>{ g.paare++; });
      feld.appendChild(d); y += h + 14;
    });

    const wink = document.createElement('div');
    wink.className='feld neu'; wink.dataset.ort='neuegruppe';
    wink.style.left='8px'; wink.style.top=y+'px';
    wink.style.width=fw+'px'; wink.style.height='58px';
    wink.innerHTML='<span>Situationskarte hierher ziehen</span>';
    feld.appendChild(wink);
    feld.style.minHeight = (y + 78)+'px';

    // Karten an ihre Plaetze
    Object.entries(stand.karten).forEach(([id,s])=>{
      const el = els[id]; if (!el) return;
      const ziel = s.ort==='tisch' ? tisch
        : (document.querySelector(`[data-ort="${s.ort}"]`) || tisch);
      ziel.appendChild(el); el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el);
    });
  }
  window._neuzeichnen = ()=>{ felder(); tischOrdnen(); };

  // Eine Situationskarte auf dem Wink oder im freien Feld macht ein Feld auf
  window._e1ablage = (el, zielOrt) => {
    const id = el.dataset.id;
    if (!id.startsWith('SS')) return zielOrt;
    if (zielOrt === 'neuegruppe' || zielOrt === null){
      stand.e1gruppen.push({sit:id, paare:2});
      return 'g' + (stand.e1gruppen.length-1) + '/sit';
    }
    return zielOrt;
  };

  felder();

  // NEU (2026-08-21): DREI Baender statt eines Haufens. Ein gemeinsamer
  // Wust aus Situationen, Urnen und Termen zwingt dazu, erst die Sorte zu
  // erkennen, bevor man ueberhaupt vergleichen kann. Aufgefaechert bleibt
  // die Unordnung innerhalb der Sorte - und die ist gewollt.
  const BAENDER = [
    {art:'S', name:'Situationen',  passt:k=>k.typ==='SS'},
    {art:'U', name:'Urnenmodelle', passt:k=>k.typ==='U'||k.typ==='UD'},
    {art:'T', name:'Terme',        passt:k=>k.typ==='T'||k.typ==='TD'},
  ];
  if (!stand.geschuettet) stand.geschuettet = {};

  // Steht seit dem 2026-08-21 in der gemeinsamen Flaeche - Kapitel 3
  // braucht dasselbe.
  BAENDER.forEach(b => { b.ids = () => D.karten.filter(b.passt).map(k=>k.id); });
  function tischOrdnen(){
    baenderOrdnen(tisch, BAENDER, els, stand.geschuettet);
  }
  window._tischOrdnen = tischOrdnen;

  const ausschuetten = art => {
    const b = BAENDER.find(x=>x.art===art);
    D.karten.filter(b.passt).forEach(k=>{
      if (!(k.id in stand.karten)) stand.karten[k.id] = {ort:'tisch',x:0,y:0,rot:0};
    });
    stand.geschuettet[art] = true;
    tischOrdnen(); merken();
  };
  document.getElementById('schuettS').onclick = ()=>ausschuetten('S');
  document.getElementById('schuettU').onclick = ()=>ausschuetten('U');
  document.getElementById('schuettT').onclick = ()=>ausschuetten('T');
  document.getElementById('zurueckalles').onclick = ()=>{
    stand.karten={}; stand.e1gruppen=[]; stand.geschuettet={};
    felder(); tischOrdnen(); merken();
    document.getElementById('befund').textContent='';
  };

  /* Pruefung, platzweise statt kartenweise.

     NEU (2026-08-21, Rikes Entscheidung): Ein falsch angelegter
     Situationskopf machte bisher ALLE Paare darunter falsch, auch wenn
     das Paar selbst stimmte - das bestraft richtige Arbeit fuer einen
     Fehler eine Zeile hoeher. Jetzt werden zwei Dinge unterschieden:

       haelt das Paar zusammen?   Urne und Term derselben Situation
       steht es am richtigen Ort? unter dem passenden Kopf

     Daraus drei Zustaende: richtig (gruen), Paar stimmt aber der Kopf
     nicht (ocker), falsch (rot).

     ENTSCHEIDUNG (Kasper): In der Ablage wird jetzt auch das PAAR
     geprueft, nicht nur «ist ein Distraktor». Der Generator sagt es
     ausdruecklich - «Distraktor-Paare: Urne UDk + Term TDk» -, und die
     Ablage heisst «ohne Situation, aber PAARWEISE». Vorher galt dort
     jede beliebige Zusammenstellung als richtig, und der zweite Teil
     des Auftrags wurde gar nicht geprueft.
     Verworfene Alternative: in der Ablage weiter nur die Sorte pruefen -
     dann ist die Rueckmeldung dort weicher als im Feld daneben, ohne
     dass die Aufgabe leichter waere. */
  document.getElementById('fertig').onclick = ()=>{
    document.querySelectorAll('.k').forEach(k=>
      k.classList.remove('ok','falsch','fastok'));

    // Zwei Sorten «fast»: im Feld stimmt das Paar, aber der Kopf nicht -
    // in der Ablage gibt es keinen Kopf, dort gehoeren die beiden Karten
    // nicht zueinander. Ein gemeinsamer Satz waere fuer einen der beiden
    // Faelle falsch.
    let richtig=0, fastFeld=0, fastAblage=0, falsch=0, gelegt=0;

    const setz = (karten, zustand, wo) => {
      karten.forEach(k=>k.classList.add(zustand==='fast' ? 'fastok' : zustand));
      gelegt += karten.length;
      if (zustand==='ok') richtig += karten.length;
      else if (zustand==='fast'){
        if (wo==='ablage') fastAblage += karten.length;
        else fastFeld += karten.length;
      }
      else falsch += karten.length;
    };

    document.querySelectorAll('.paar').forEach(platz=>{
      const ort = platz.dataset.ort || '';
      if (ort.endsWith('/sit')) return;             // der Kopf wird nicht benotet
      const karten = [...platz.querySelectorAll(':scope > .k')];
      if (!karten.length) return;
      const soll = karten.map(k=>D.loesung[k.dataset.id]);

      if (ort.startsWith('rest')){
        // Ablage: zwei Distraktoren, und zwar die zusammengehoerigen.
        const alleDistraktoren = soll.every(s=>s===0);
        if (!alleDistraktoren){ setz(karten, 'falsch', 'ablage'); return; }
        if (karten.length < 2){ setz(karten, 'fast', 'ablage'); return; }
        const nr = karten.map(k=>k.dataset.id.replace(/^[UT]D/, ''));
        setz(karten, nr[0]===nr[1] ? 'ok' : 'fast', 'ablage');
        return;
      }

      const gi = parseInt(ort.slice(1));
      const g = stand.e1gruppen[gi];
      const kopf = g ? parseInt(g.sit.slice(2)) : null;

      if (soll.some(s=>s===0)){ setz(karten, 'falsch', 'feld'); return; }
      const haeltZusammen = karten.length===2 && soll[0]===soll[1];
      const amRichtigenOrt = soll[0]===kopf;

      if (karten.length===1) setz(karten, amRichtigenOrt ? 'ok' : 'falsch', 'feld');
      else if (haeltZusammen && amRichtigenOrt) setz(karten, 'ok', 'feld');
      else if (haeltZusammen) setz(karten, 'fast', 'feld');
      else setz(karten, 'falsch', 'feld');
    });

    stand.geprueft = true;
    const b = document.getElementById('befund');
    if (!gelegt){ b.textContent = 'Es liegt noch nichts in den Feldern.'; return; }
    // Kurz halten: Die Leiste ist schmal, und drei lange Saetze machen
    // aus ihr einen Absatz.
    const satz = [`${richtig} von ${gelegt} richtig.`];
    if (fastFeld) satz.push(`${fastFeld} richtig gepaart, aber unter der `
      + `falschen Situation.`);
    if (fastAblage) satz.push(`${fastAblage} in der Ablage gehören nicht `
      + `zueinander.`);
    b.textContent = satz.join(' ');
  };
  document.getElementById('weiter').onclick = ()=>{ stand.etappe=1; los(); };
}

/* ───────── Etappe 2 ───────── */
function etappe2(){
  const a = D.etappen[1];
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
  const modelle = D.karten.filter(k=>k.typ==='U').map(k=>k.id);
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
      const ziel = s.ort==='tisch' ? tisch : feld.querySelector(`[data-ort="${s.ort}"]`);
      if(ziel){ ziel.appendChild(el); el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el); }
    });
  }
  window._neuzeichnen = gruppen;      // sonst zeichnet Etappe 1 hier hinein
  gruppen();
  const neu = modelle.filter(id=>!(id in stand.karten)).map(id=>els[id]);
  if (neu.length) { streuen(neu, tisch); merken(); }
  else Object.entries(stand.karten).forEach(([id,s])=>{
    const el=els[id]; if(!el) return;
    const ziel = s.ort==='tisch' ? tisch : feld.querySelector(`[data-ort="${s.ort}"]`);
    if(ziel){ ziel.appendChild(el); el._x=s.x; el._y=s.y; el._rot=s.rot; pos(el); }
  });

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
}

/* ───────── Etappe 3 ───────── */
function etappe3(){
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
}


/* Anmeldung bei der gemeinsamen Flaeche. Die Reihenfolge im Array ist
   die Reihenfolge in der Navigation. */
ETAPPEN.push(etappe1, etappe2, etappe3);
