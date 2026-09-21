/* Die ZWEI Etappen von Kapitel 3 — «Wer die Wahl hat … oder nicht?».

   UMGEBAUT am 2026-09-21 auf Rikes Auftrag. Was vorher hier stand —
   ein Sortierbrett in zwei Zuegen, drei Prueffrage-Felder, ein
   Transferbrett — steht in Git und ist hier nicht mehr totgelegt,
   sondern ersetzt.

   E1  Vergleichen  Eine TABELLE. Links die Situation mit ihrer Frage,
                    rechts drei Spalten, in denen Rechnungen
                    zugeschaltet werden. Darunter sieben Antwortfelder.
   E2  Einordnen    Das KLEEBLATT. Drei Kreise, eine je Erleichterung.
                    Runde 1 die Situationen aus E1, Runde 2 die
                    Aufgaben aus dem Skript.

   Der Kern bleibt, was er war: Es geht NICHT darum, einen Rechenfehler
   zu finden. Alle Wege sind sauber gerechnet. Es geht darum zu sehen,
   dass ein KORREKT GERECHNETER Weg trotzdem nicht traegt — weil die
   gewaehlte Ergebnismenge nicht Laplace ist.

   Rikes Befund, der den Umbau ausgeloest hat: Die Zuordnung «welche
   Rechnung gehoert zu welcher Frage» kostete in der Erprobung die
   meiste Zeit und war gar nicht der Entscheidungsfaktor. Sie ist jetzt
   gegeben.
*/

/* Der Stilblock des Kapitels.
   ACHTUNG: KEINE Backticks hier hinein. Der Block steht in einem
   Template-Literal und wuerde es beenden — bei «Komplexe Zahlen» hat
   genau das am 2026-09-20 die Seite stumm gemacht. */
document.head.insertAdjacentHTML('beforeend', '<style>' + `
/* ── Etappe 1 · die Tabelle ─────────────────────────────────

   UMGEDREHT am 2026-09-21, Rikes Entscheidung: «Ob wir Spalten und
   Zeilen aendern. Ziel waere, moeglichst viel zu sehen.»

   Vorher standen die neun Situationen UNTEREINANDER und die vier
   Rechenwege nebeneinander. Man sah dann vier Situationen am Stueck
   und musste fuer die uebrigen fuenf rollen - und die Wege, um die es
   geht, verschwanden dabei aus dem Bild.

   Jetzt stehen die vier WEGE untereinander: sie bleiben alle vier
   sichtbar, die Situationen laufen nach rechts durch. Die erste Spalte
   klebt (position:sticky) - man sieht also immer, welcher Weg in
   welcher Zeile steht, egal wie weit rechts man ist. Und die Antworten
   stehen in derselben ersten Spalte, direkt neben ihrem Weg. */
.tabrahmen{flex:1 1 auto;overflow:auto;padding:0 14px 14px}
.tabelle{display:table;table-layout:fixed;border-collapse:separate;
   border-spacing:0 7px}
.tabreihe{display:table-row}
.tabzelle{display:table-cell;vertical-align:top;padding:7px 8px;width:300px;
   border:1.5px dashed var(--linie);border-left:none;
   background:rgba(255,254,251,.72)}
/* Die erste Spalte klebt am linken Rand - sonst weiss beim Rollen
   niemand mehr, welche Zeile welcher Weg ist. */
.tabzelle:first-child{position:sticky;left:0;z-index:4;width:382px;
   border-left:1.5px dashed var(--linie);border-radius:10px 0 0 10px;
   background:var(--papier);box-shadow:3px 0 6px -3px rgba(45,41,36,.18)}
.tabzelle:last-child{border-radius:0 10px 10px 0}
.tabzelle.leer{background:repeating-linear-gradient(-45deg,
   transparent,transparent 7px,rgba(0,0,0,.035) 7px,rgba(0,0,0,.035) 14px)}
.tabreihe.kopfreihe .tabzelle{border:none;background:none;padding:2px 8px 6px}
.tabreihe.kopfreihe .tabzelle:first-child{background:var(--papier);
   font-size:12px;font-weight:600;color:var(--akzent);padding-top:8px}
.tabzelle .kartenzeile{display:flex;gap:8px;flex-wrap:wrap}
.tabzelle .nichts{font-size:11px;color:var(--matt);font-style:italic}
.k[data-fest]{position:relative;flex:0 0 auto}
/* GROSS, und das ist Rikes Befund: «Es ist alles noch sehr, sehr
   klein.» Die erste Fassung quetschte neun Situationen nebeneinander
   und machte die Karten dafuer auf .62 der Kartenbreite - unleserlich.
   Jetzt volle Kartenbreite; dass dafuer weniger Situationen zugleich
   im Bild sind, ist kein Verlust: Nach rechts wird ohnehin gerollt,
   und die erste Spalte bleibt stehen.

   Der Regler in der Leiste geht weiter - wer noch groesser will,
   bekommt es. */
.tabzelle .k[data-fest]{width:var(--kb);box-sizing:border-box;
   padding-top:23px}
/* Die Fragekarte ist NICHT groesser als die Rechnungen. Sie war es
   (1.14), und das kostete rund vierzig Punkte Hoehe in der Zeile, die
   am wenigsten davon braucht - oben steht ohnehin immer dieselbe
   Situation, waehrend unten die Wege verglichen werden. Rikes Ziel
   war, alle vier Wege zugleich zu sehen. */
.tabreihe.kopfreihe .k[data-fest]{width:var(--kb);padding-top:0}
/* FEHLERBEHOBEN (2026-09-21, Rikes Befund «durch diese beiden
   Kaestchen oben sind die Saetze ueberschrieben»): Omega und das
   Fragezeichen sassen auf der oberen Kartenkante - und genau dort
   beginnt die Vorschrift, also der Satz, um den es geht. Die Karte
   bekommt jetzt oben einen freien Streifen; das Bild ruecht darunter.
   Verworfen: die Marken an den unteren Rand. Dort sitzt das
   Urteilszeichen, und der Bruch steht in der Mitte. */
.tabzelle .k[data-fest] .marke{top:4px}
/* Eine gewaehlte Situation. Kein Haken und kein Rahmen aussen herum -
   die Karte selbst hebt sich, wie eine, die man in die Hand genommen
   hat. */
.k.gewaehlt{box-shadow:0 0 0 3px var(--akzent), 0 6px 14px rgba(45,41,36,.22);
   transform:translateY(-3px)}
.leiste .knopf[disabled]{opacity:.45;cursor:default}
/* Die zweite Marke sitzt neben der ersten, nicht darauf. */
.k .marke.denkweg{left:auto;right:4px}
/* VIER Wegfarben. Rike, 2026-09-21: «Vielleicht nehmen wir vier
   Farben. Die erste Farbe ist einfach der Standardweg. Die zweite,
   wenn die Reihenfolge keine Rolle spielt. Die dritte, wenn man nur
   einen Ausschnitt anschaut. Die vierte, wenn man mit einer
   Vergroeberung arbeitet. Und diese drei Farben sollten sich im
   Venn-Diagramm in den Kreisfarben widerspiegeln.»

   Sie tun es: Dieselben drei Hexwerte stehen im Kleeblatt (siehe
   kleeblattBild) und in der Legende. Derselbe Ton fuer dieselbe Sache,
   ueber beide Etappen.

   Weg 1 bekommt einen eigenen, STUMPFEN Ton - Sand. Er muss sich von
   den drei unterscheiden und darf ihnen zugleich nicht die Stimme
   nehmen: Er ist der Vergleichspunkt, keine Wahl. Nicht das Ocker -
   das ist die Kapitelfarbe und redete als fuenfte Bedeutung dazwischen.

   UEBERHOLT: Weg 1 war bis eben ungefaerbt. Das war lesbar, machte ihn
   aber zum Hintergrund statt zu einem der vier - und im Kleeblatt
   fehlte dann der Bezug, warum genau DREI Kreise dastehen und nicht
   vier. */
.k.spaltenton1{background:color-mix(in srgb, #b8a888 20%, #fff);
   box-shadow:inset 0 0 0 2.5px #b8a888, 0 2px 6px rgba(0,0,0,.14)}
.k.spaltenton2{background:color-mix(in srgb, var(--zugang) 22%, #fff);
   box-shadow:inset 0 0 0 2.5px #7FB069, 0 2px 6px rgba(0,0,0,.14)}
.k.spaltenton3{background:color-mix(in srgb, var(--fach) 22%, #fff);
   box-shadow:inset 0 0 0 2.5px #6C9BD1, 0 2px 6px rgba(0,0,0,.14)}
.k.spaltenton4{background:color-mix(in srgb, var(--aktion) 22%, #fff);
   box-shadow:inset 0 0 0 2.5px #C99BC0, 0 2px 6px rgba(0,0,0,.14)}
/* ── der Zeilenkopf: Nummer, Name, zwei Fragen ─────────────── */
.wegnr{display:block;font-size:10.5px;font-weight:600;letter-spacing:.04em;
   text-transform:uppercase;color:var(--matt);margin-bottom:4px;
   padding-left:13px;position:relative}
/* Der Farbpunkt am Zeilenkopf. Ohne ihn muesste man erst eine Karte
   suchen, um zu sehen, welcher Ton zu welchem Weg gehoert - und in
   einer Zeile ohne Kaertchen gaebe es gar keine. */
.wegnr::before{content:'';position:absolute;left:0;top:2px;width:8px;
   height:8px;border-radius:50%;border:2px solid #b8a888}
.wegreihe[data-weg="2"] .wegnr{color:#5d8a4a}
.wegreihe[data-weg="2"] .wegnr::before{border-color:#7FB069}
.wegreihe[data-weg="3"] .wegnr{color:#4a75a8}
.wegreihe[data-weg="3"] .wegnr::before{border-color:#6C9BD1}
.wegreihe[data-weg="4"] .wegnr{color:#9c6b93}
.wegreihe[data-weg="4"] .wegnr::before{border-color:#C99BC0}
.wegfest{font-size:12.5px;font-weight:600;color:var(--tinte);margin:0 0 2px}
.wegfest + p{font-size:11px;line-height:1.4;color:var(--matt);margin:0}
/* ENG GESETZT, und das ist kein Geschmack: Rikes Grund fuer das
   Umdrehen der Tabelle war «moeglichst viel zu sehen». Wenn der
   Zeilenkopf hoch wird, ist genau das wieder weg - dann sieht man zwei
   Wege statt vier. Die Masse unten sind so gewaehlt, dass alle vier
   Zeilen bei 980 Punkten Fensterhoehe zugleich dastehen. */
.feld.wegname{position:relative;height:auto;padding:0;margin-bottom:5px}
.feld.wegname > .schreibfeld{position:static;width:100%;box-sizing:border-box;
   min-height:26px;height:26px;border:none;background:transparent;padding:4px 6px;
   font:600 12px/1.3 var(--druck);color:var(--akzent);resize:vertical;
   outline:none}
.feld.wegname > .schreibfeld::placeholder{color:#bcae97;font-weight:400;
   font-style:italic}
/* Die beiden Fragen stehen NEBENEINANDER, nicht untereinander.
   Untereinander wurde der Zeilenkopf 195 Punkte hoch, und dann sah man
   zweieinhalb der vier Wege - also genau das nicht mehr, wofuer die
   Tabelle umgedreht wurde. Gemessen, nicht geschaetzt. */
.fragenpaar{display:flex;gap:6px;align-items:stretch}
.fragenpaar > .antwort{flex:1 1 0;min-width:0}
.antwort.feld{position:relative;padding:0 0 5px;margin-bottom:0;
   display:flex;flex-direction:column}

.antwort .kopf{font-size:10px;line-height:1.25;padding:4px 6px 2px;
   color:#555;flex:0 0 auto}
.antwort .kopf b{color:var(--akzent)}
/* FEHLERBEHOBEN (2026-09-21, gemessen): Mit flex:1 1 auto wuchs das
   Feld auf die Hoehe seines PLATZHALTERS - der umbrach auf vier Zeilen
   und machte jede Wegzeile 216 Punkte hoch. Ein Platzhalter darf das
   Layout nicht bestimmen; er steht ja nur da, solange nichts da steht.
   Jetzt feste 30 Punkte, und der Platzhalter ist kurz. */
.antwort > .schreibfeld{position:static;width:calc(100% - 12px);margin:0 6px;
   flex:0 0 auto;min-height:30px;height:30px;box-sizing:border-box;
   border:none;background:transparent;
   font:11.5px/1.35 var(--druck);color:var(--tinte);resize:vertical;outline:none;
   border-top:1px solid var(--linie);padding-top:3px}
.antwort > .schreibfeld::placeholder{color:#bcae97;font-style:italic}
/* ── das Sortiment ──────────────────────────────────────────── */
.sortiment{display:flex;flex-wrap:wrap;gap:4px 18px;margin-top:5px;
   font-size:11.5px;line-height:1.5}
.sortiment .sgruppe b{color:var(--tinte);font-weight:600;margin-right:5px}
.sortiment .sorte{white-space:nowrap;margin-right:9px}
.sortiment i{font-style:normal;font-weight:700;font-size:9.5px;
   border-radius:3px;padding:0 3px;margin-left:2px;vertical-align:1px}
.sortiment i.K{background:#e3ecdd;color:#41663a;border:1px solid #9cbb90}
.sortiment i.N{background:#efe1ec;color:#7a4b70;border:1px solid #c99bc0}
.sortiment .slegende{color:var(--matt);flex-basis:100%}
/* ENTFERNT (2026-09-21, ZWEITES Mal derselbe Fehler): Hier stand ein
   kompletter zweiter Stilblock der Tabelle aus der Fassung mit
   Spalten - .tabreihe, .tabzelle, .tabzelle.zu, die Kartenbreiten und
   die Spaltenfarben. Er stand WEITER UNTEN als der gueltige und gewann
   deshalb jede Regel, die in beiden vorkommt.

   Gemessen: Karte 87 statt 132 Punkte breit, obwohl oben
   width:var(--kb) steht - Rikes Befund «es ist alles noch sehr, sehr
   klein» war genau das. Der Regler half nicht: Er stellt --kb, und
   .66 davon bleibt .66 davon.

   Beim ersten Mal (der Block «die sieben Antworten») war die Lehre
   schon aufgeschrieben. Sie hat nicht getragen, weil beim Ersetzen
   eines Layouts nach dem KOPFKOMMENTAR gesucht wurde und nicht nach
   den Regeln. Wer ein Layout ablöst, sucht nach jedem Selektor, den
   die neue Fassung benutzt - und findet so auch die Reste, die anders
   ueberschrieben sind. */
/* ENTFERNT (2026-09-21): Hier stand der Stilblock der ersten
   Fassung - «die sieben Antworten» als eigenes Raster unter der
   Tabelle, mit .antworten, .antwort und einem zweiten
   .antwort > .schreibfeld. Seit die Tabelle umgedreht ist, stehen die
   Antworten IM Zeilenkopf und werden oben gesetzt.

   Der Block war nicht bloss ueberfluessig: Er stand WEITER UNTEN und
   gewann deshalb. Gemessen: das Antwortfeld war 62 Punkte hoch statt
   30, und jede Wegzeile 216 statt 165 - die vierte Zeile fiel aus dem
   Bild, und zwar genau die, deretwegen die Tabelle umgedreht wurde.
   Tote Regeln sind nicht still. */
/* ── Etappe 2 · das Kleeblatt ───────────────────────────────── */
.kleeblattbild{position:absolute;left:0;top:0;width:100%;
   pointer-events:none;z-index:0}
#feld .feld.zone{z-index:2}
#feld .feld.zone > .kopf{font-size:10.5px;padding:3px 5px 0;color:var(--matt)}
#feld .feld.zone .k{width:calc(var(--kb) * .40)}
.klegende{display:inline-block;margin-left:10px;font-size:11px;font-weight:400;
   color:var(--matt);padding-left:13px;position:relative;text-transform:none}
.klegende::before{content:'';position:absolute;left:0;top:3px;width:8px;
   height:8px;border-radius:50%;border:2px solid}
.klegende.rf::before{border-color:#7FB069}
.klegende.aus::before{border-color:#6C9BD1}
.klegende.kat::before{border-color:#C99BC0}
` + '</style>');

/* Ueber der Flaeche steht, was fuer ALLE Fragen gilt. Seit dem
   2026-09-21 gehoert die 4:4-Aufteilung dazu — ohne sie ist die dritte
   Spalte nicht entscheidbar (siehe thema.LAGE). */
function praemissen(){
  /* NEU (2026-09-21, Rikes Befund aus der Lehre): Die acht Sorten
     stehen AUFGEZAEHLT da, mit beiden Einteilungen nebeneinander.

     «Die Studierenden hatten ein Problem damit, dass ihnen nicht
     bewusst war, was die Neuzugaenge und was die Klassiker sind.»
     Bis heute stand nur die ZAHL da - «4 Klassiker und 4 Neuzugaenge».
     Das genuegt fuer die Rechnung und nicht fuer die Entscheidung: Wer
     vor «genau zwei Kugeln sind Neuzugaenge» sitzt, muss wissen,
     welche Sorte dazugehoert.

     Es ist der zweite Bericht derselben Sache — Maurus hat sie am
     2026-09-18 fuer Kapitel 2 gemeldet, und die Zahl war die Antwort
     darauf. Sie hat nicht gereicht.

     Beide Einteilungen nebeneinander zeigen ausserdem, dass sie QUER
     zueinander liegen: Unter den drei Sorbets sind Klassiker und
     Neuzugaenge, unter den fuenf Milcheis auch. */
  const S = D.sortiment || [];
  const zahl = f => S.filter(f).length;
  const gruppe = art => {
    const drin = S.filter(x => x.art === art);
    return '<div class="sgruppe"><b>' + drin.length + ' ' + art + '</b>'
      + drin.map(x => `<span class="sorte">${x.name}<i class="${
          x.gruppe === 'Klassiker' ? 'K' : 'N'}">${
          x.gruppe === 'Klassiker' ? 'K' : 'N'}</i></span>`).join('')
      + '</div>';
  };
  return `<div class="praemisse"><span>${D.lage}</span>
    <div class="sortiment">${gruppe('Sorbet')}${gruppe('Milcheis')}
      <span class="slegende"><i class="K">K</i> Klassiker (${
        zahl(x => x.gruppe === 'Klassiker')}) &nbsp;·&nbsp; <i class="N">N</i> Neuzugang (${
        zahl(x => x.gruppe === 'Neuzugang')}) &nbsp;— jede Sorte gehört zu
      genau einer der beiden Gruppen.</span>
    </div></div>`;
}

const NACH_ID = {};
D.loesungen.forEach(l => { NACH_ID[l.id] = l; });

/* Eine Rechnung in der Tabelle. Sie liegt FEST — gezogen wird hier
   nichts, die Zuordnung ist gegeben.

   Zwei Marken:
     Ω   die Ergebnismenge, ausgeschrieben (Rike, 2026-08-22)
     ?   der DENKWEG (Lars' Anstoss, Rikes Ausgestaltung): «Man sollte,
         wenn man auf die Karte drauf geht, den Denkweg einblenden
         koennen.» Er steht deshalb nicht auf der Karte — die bleibt in
         der uebersichtlichen Form, die Rike behalten wollte. */
function rechenkarte(l){
  const el = karte(l.id, {text:'Ω', art:'sit', titel:l.menge}, {fest:true});
  const zweite = mkMarke({text:'?', art:'skript',
    titel:'<b>So hat die Person gedacht</b><br>' + l.denkweg}, el);
  zweite.classList.add('denkweg');
  el.appendChild(zweite);
  /* FEHLERBEHOBEN (2026-09-21, Rikes Befund beim Rollen: «die
     erscheinen immer noch in der vorderen Spalte, die werden
     mitgezogen»).

     Ursache: karte() hebt eine Karte beim Daraufzeigen auf
     z-index 99999, damit die Lupe ueber den Nachbarn liegt. Die
     klebende erste Spalte hat z-index 4. Eine einmal angezeigte Karte
     blieb damit ueber ihr - und wanderte beim Rollen sichtbar durch
     den Zeilenkopf.

     Der Zuhoerer hier wird NACH dem von karte() angemeldet und laeuft
     deshalb danach; er nimmt die Hebung auf einen Wert zurueck, der
     ueber den Nachbarkarten und unter der klebenden Spalte liegt. Die
     Lupe bleibt, sie wird am Zeilenkopf nur beschnitten - und das ist
     richtig: Der Zeilenkopf sagt, welcher Weg das ist. */
  el.addEventListener('pointerenter', () => { el.style.zIndex = 3; });
  el.classList.add('spaltenton' + l.spalte);
  /* KEIN Urteilszeichen auf dem Standardweg.

     Rike, 2026-09-21: «Wir sagen ja, ganz links steht die Rechnung,
     die immer stimmt. Dann müssten diese Kreise dort gar nicht mehr
     auftauchen.»

     Sie hat recht, und es ist mehr als Aufraeumen: Ein Knopf, dessen
     Antwort schon im Auftragstext steht, ist keine Entscheidung. Er
     wuerde die drei echten Entscheidungen darunter entwerten - wer
     neunmal «trägt» anklickt, bevor die erste Frage kommt, hat
     gelernt, dass der Knopf nichts bedeutet. */
  if (l.spalte > 1) urteilsmarke(el, l);
  return el;
}

/* Das Urteil auf der Karte — unveraendert aus der alten Etappe 1
   uebernommen, weil es sich dort bewaehrt hat:
       leer  →  ✓ traegt  →  ✗ traegt nicht  →  leer
   und was nicht traegt, wird DURCHGESTRICHEN (Rikes Vorschlag).

   Neu ist nur, wozu es dient: Rike will die falschen Rechnungen am
   Ende AUSSORTIERT haben, «sodass am Ende nur noch richtige Loesungen
   dastehen». Der Strich leistet genau das, ohne die Karte zu
   entfernen — wer sie wegnaehme, koennte nicht mehr zeigen, WARUM sie
   weg ist. */
function urteilsmarke(el, l){
  const FOLGE = [null, 'ja', 'nein'];
  const m = document.createElement('div');
  m.className = 'urteil';
  const zeichen = () => {
    const u = stand.urteil[l.id];
    m.textContent = u === 'ja' ? '✓' : u === 'nein' ? '✗' : '·';
    m.title = u === 'ja' ? 'trägt' : u === 'nein' ? 'trägt nicht'
                                   : 'noch kein Urteil';
    m.classList.toggle('ja', u === 'ja');
    m.classList.toggle('nein', u === 'nein');
    el.classList.toggle('traegtnicht', u === 'nein');
  };
  m.onclick = ev => {
    ev.stopPropagation();
    const jetzt = FOLGE.indexOf(stand.urteil[l.id] || null);
    stand.urteil[l.id] = FOLGE[(jetzt + 1) % FOLGE.length];
    el.classList.remove('ok', 'falsch');
    zeichen(); merken();
  };
  m.addEventListener('pointerdown', ev => ev.stopPropagation());
  el.appendChild(m);
  zeichen();
}

/* ───────── Etappe 1 · Vergleichen ─────────

   Drei Schritte auf DERSELBEN Tabelle. Jeder Schritt schaltet eine
   Spalte frei und mit ihr die Fragen, die zu ihr gehoeren.

   Warum nicht alles auf einmal: Der Reiz liegt im Vergleich. «Was
   macht Spalte 2 anders als Spalte 1?» ist nur eine Frage, solange
   Spalte 1 schon dastand. */
function etappe1(){
  const a = D.etappen[0];
  if (!stand.schritt) stand.schritt = 1;
  if (!stand.urteil) stand.urteil = {};
  /* FEHLERBEHOBEN (2026-09-21, sofort im Browser): Diese zwei Zeilen
     standen weiter unten, bei der Tabelle. Die Leiste wird aber VORHER
     geschrieben und liest stand.spaltenfolge - beim ersten Aufruf war
     sie noch null, und die Etappe brach ab, bevor irgendetwas zu sehen
     war. Ein Ausweichwert gehoert vor den ersten Leser, nicht vor den
     ersten Schreiber. */
  if (!stand.spaltenfolge || stand.spaltenfolge.length !== D.zeilen.length)
    stand.spaltenfolge = D.zeilen.map(z => z.id);
  if (!stand.gewaehlt) stand.gewaehlt = [];
  const schritt = stand.schritt;
  const letzter = schritt >= D.spalten.length;

  const b = document.getElementById('buehne');
  window._nachAblegen = null;
  window._zustaendig = null;
  b.innerHTML = `
    <div class="auftrag"><span class="rang">${a.rang}</span>
      <span class="titel">Etappe 1 · Schritt ${schritt} von ${
        D.spalten.length}</span>
      <span class="text">${a.auftrag}
        <span class="zart">In den Wegen 2 bis 4 trägt jede Rechnung ein
        <b>·</b> in der Ecke: antippen schaltet durch — <b>✓ trägt</b>,
        <b>✗ trägt nicht</b>. Was nicht trägt, wird durchgestrichen.</span>
      </span></div>
    ${praemissen()}
    <div class="buehne"><div class="tabrahmen">
      <div class="tabelle" id="tabelle"></div>
    </div></div>
    <div class="leiste">
      <button class="knopf leer" id="zurueck" title="Alle Urteile zurücknehmen">↺</button>
      <button class="knopf" id="pruefen">Urteile prüfen</button>
      ${letzter ? '' : `<button class="knopf leer" id="mehr">${
        D.spalten[schritt - 1].knopf}</button>`}
      ${schritt > 1 ? '<button class="knopf leer" id="zurueckschritt">← ein Schritt zurück</button>' : ''}
      <button class="knopf leer" id="gruppieren"${
        stand.gewaehlt.length < 2 ? ' disabled' : ''}>${
        stand.gewaehlt.length < 2
          ? 'Situationen anklicken, um sie zu gruppieren'
          : stand.gewaehlt.length + ' nebeneinander legen'}</button>
      ${stand.spaltenfolge.join() !== D.zeilen.map(z=>z.id).join()
        ? '<button class="knopf leer" id="folgezurueck">Reihenfolge zurück</button>' : ''}
      <span class="befund" id="befund"></span>
      <button class="knopf leer" id="weiter" style="margin-left:auto">${
        letzter ? 'Etappe 2 →' : 'Weiter →'}</button>
    </div>`;
  _leisteChrome(b);

  /* ---- die Tabelle: WEGE als Zeilen, Situationen als Spalten ----

     Rikes Bauplan vom 2026-09-21: «Wir haben die Situationszeile, die
     Situationen, und dann haben wir vier weitere Zeilen unten drunter.
     Wir haben vier verschiedene Berechnungswege. Eins ist der
     Standardweg, der geht immer. Und dann haben wir drei
     Spezialfaelle. Und die Frage ist: Wie nennen Sie den Spezialfall
     jeweils? Und wann funktioniert der?»

     Der Standardweg traegt seinen Namen also mit - er ist gegeben,
     nicht zu finden. Die drei Spezialfaelle bekommen ein leeres Feld.
     Ihre Namen wandern nach Etappe 2 ins Kleeblatt. */
  const tab = document.getElementById('tabelle');

  /* Die Reihenfolge der Situationen ist NICHT fest.

     Rike, 2026-09-21: «Ob wir ihnen die Option geben, die Spalten
     nachher zu verschieben, sodass sie dort ein bisschen mehr Muster
     erkennen. Man koennte sagen: Spalten, die Sie nebeneinander haben
     wollen, koennen Sie anklicken, und dann gibt es einen Knopf.»

     Damit ist Etappe 1 wieder eine SORTIERHANDLUNG - nur nicht mehr
     «welche Rechnung gehoert zu welcher Frage» (das kostete die Zeit
     und trug nichts), sondern «welche Situationen verhalten sich
     gleich». Genau das ist der Lerngegenstand.

     Gelegt wird nicht per Ziehen, sondern per Auswahl und Knopf: Eine
     Spalte ist keine Karte, sie ist so breit wie das Fenster hoch ist,
     und das Ziehen einer ganzen Tabellenspalte waere auf dem Tablet
     nicht zu treffen. */
  const nachSit = {};
  D.zeilen.forEach(z => { nachSit[z.id] = z; });
  const SIT = stand.spaltenfolge.map(id => nachSit[id]).filter(Boolean);

  const kopf = document.createElement('div');
  kopf.className = 'tabreihe kopfreihe';
  const ecke = document.createElement('div');
  ecke.className = 'tabzelle';
  ecke.innerHTML = '<span data-alsbild>Die Situationen →</span>';
  kopf.appendChild(ecke);
  SIT.forEach(z => {
    const c = document.createElement('div');
    c.className = 'tabzelle';
    const kz = document.createElement('div');
    kz.className = 'kartenzeile';
    const kk = karte(z.id, null, {fest:true});
    kk.classList.toggle('gewaehlt', stand.gewaehlt.includes(z.id));
    kk.style.cursor = 'pointer';
    kk.title = 'Anklicken, um diese Situation zu wählen';
    kk.onclick = () => {
      const i = stand.gewaehlt.indexOf(z.id);
      if (i < 0) stand.gewaehlt.push(z.id); else stand.gewaehlt.splice(i, 1);
      merken(); etappe1();
    };
    kz.appendChild(kk);
    c.appendChild(kz);
    kopf.appendChild(c);
  });
  tab.appendChild(kopf);

  D.spalten.filter(w => w.nr <= schritt).forEach(w => {
    const r = document.createElement('div');
    r.className = 'tabreihe wegreihe'; r.dataset.weg = w.nr;

    // --- der Zeilenkopf, klebend am linken Rand -----------------
    const kzelle = document.createElement('div');
    kzelle.className = 'tabzelle wegkopf';
    if (w.nr === 1){
      kzelle.innerHTML = '<span class="wegnr" data-alsbild>Der Standardweg</span>'
        + '<p class="wegfest">Geht immer.</p>'
        + '<p>Jede Kugel mit ihrer Sorte, von unten nach oben, '
        + 'vollständig. Hier steht in <b>jeder</b> Situation eine '
        + 'Rechnung — und sie stimmt. Nichts zu beurteilen.</p>';
    } else {
      kzelle.innerHTML = `<span class="wegnr" data-alsbild>Spezialfall ${
        w.nr - 1}</span>`;
      const nf = document.createElement('div');
      nf.className = 'feld wegname'; nf.dataset.ort = 'wegname' + w.nr;
      const nt = document.createElement('textarea');
      nt.className = 'schreibfeld';
      nt.placeholder = 'Wie nennen Sie diesen Weg?';
      nt.value = stand.texte['wegname' + w.nr] || '';
      nt.oninput = () => { stand.texte['wegname' + w.nr] = nt.value; };
      nf.appendChild(nt);
      kzelle.appendChild(nf);
      const paar = document.createElement('div');
      paar.className = 'fragenpaar';
      D.fragen.filter(f => f.spalte === w.nr).forEach(f => {
        const d = document.createElement('div');
        d.className = 'antwort feld'; d.dataset.ort = f.id;
        d.innerHTML = `<div class="kopf">${f.text}</div>`;
        const t = document.createElement('textarea');
        t.className = 'schreibfeld';
        t.placeholder = 'Ihre Antwort …';
        t.value = stand.texte[f.id] || '';
        t.oninput = () => { stand.texte[f.id] = t.value; };
        d.appendChild(t);
        paar.appendChild(d);
      });
      kzelle.appendChild(paar);
    }
    r.appendChild(kzelle);

    // --- je Situation eine Zelle --------------------------------
    SIT.forEach(z => {
      const c = document.createElement('div');
      c.className = 'tabzelle';
      const ids = z.spalten[String(w.nr)] || [];
      if (!ids.length){
        /* Eine LEERE Zelle ist kein Versehen, sondern die Antwort auf
           die erste der beiden Fragen links. Sie wird schraffiert und
           nicht bloss weiss gelassen - weiss saehe aus wie «noch
           nicht gebaut».

           Was dasteht, sagt nur, DASS keine Rechnung da ist. Rike
           fragt: «Warum steht bei manchen Situationen kein Kaertchen,
           warum schon?» - die Antwort gehoert nicht in die Zelle. */
        c.classList.add('leer');
        c.innerHTML = '<span class="nichts">kein Kärtchen</span>';
      } else {
        const kz = document.createElement('div');
        kz.className = 'kartenzeile';
        ids.forEach(i => kz.appendChild(rechenkarte(NACH_ID[i])));
        c.appendChild(kz);
      }
      r.appendChild(c);
    });
    tab.appendChild(r);
  });

  /* Die Breite wird GESETZT, nicht gerechnet vom Browser.

     FEHLERBEHOBEN (2026-09-21, gemessen): Mit width:100% stand die
     Tabelle am Schirm richtig da - und im Bild zum Mitnehmen war sie
     500000 Punkte breit. Grund: _aufklappen() gibt jedem rollenden
     Behaelter fuers Messen width:auto. Eine Tabelle mit width:100% in
     einem Behaelter, dessen Breite von ihr selbst abhaengt, hat dann
     keinen Bezug mehr. Gemessen: Karte 2 bei x = 116703 - weit
     ausserhalb der Leinwand, und sie fiel lautlos aus dem Bild.

     Eine feste Punktbreite hat diesen Bezug nicht noetig. Sie wird
     hier aus der Zahl der Situationen gerechnet und ueberlebt das
     Aufklappen, weil sie als eigener Stil am Element haengt. */
  tab.style.width = (382 + SIT.length * 300 + 24) + 'px';

  // ---- die Knoepfe ------------------------------------------------
  const befund = document.getElementById('befund');
  /* Weg 1 ist NICHT dabei: Seine Karten tragen kein Urteilszeichen
     mehr, könnten also nie eines bekommen. Stünden sie in dieser
     Liste, meldete «Urteile prüfen» dauerhaft neun Karten ohne
     Urteil - eine Meldung, die niemand abstellen kann. */
  const sichtbar = () => D.loesungen.filter(
    l => l.spalte <= schritt && l.spalte > 1);

  document.getElementById('pruefen').onclick = () => {
    document.querySelectorAll('.k').forEach(k =>
      k.classList.remove('ok', 'falsch'));
    let stimmt = 0, daneben = 0, offen = 0;
    sichtbar().forEach(l => {
      const el = document.querySelector(`.k[data-id="${l.id}"]`);
      const u = stand.urteil[l.id];
      if (!u){ offen++; return; }
      const gut = (u === 'ja') === !!l.richtig;
      if (el) el.classList.add(gut ? 'ok' : 'falsch');
      if (gut) stimmt++; else daneben++;
    });
    const satz = [];
    if (offen) satz.push(`${offen} Rechnungen tragen noch kein Urteil.`);
    satz.push(`${stimmt} richtig beurteilt`
      + (daneben ? `, ${daneben} nicht.` : '.'));
    if (!offen && !daneben)
      satz.push('Alles beurteilt — jetzt die Fragen darunter beantworten.');
    befund.textContent = satz.join(' ');
    stand.geprueft = true; merken();
  };

  document.getElementById('zurueck').onclick = () => {
    sichtbar().forEach(l => { delete stand.urteil[l.id]; });
    merken(); etappe1();
  };

  /* Die gewaehlten Spalten ruecken zusammen - an den Platz der am
     weitesten LINKS stehenden von ihnen. Die anderen behalten ihre
     Reihenfolge. So bleibt jede Umstellung nachvollziehbar: Wer drei
     waehlt und den Knopf drueckt, sieht sie beieinander und den Rest
     unveraendert. */
  document.getElementById('gruppieren').onclick = () => {
    const folge = stand.spaltenfolge;
    const gewaehlt = folge.filter(id => stand.gewaehlt.includes(id));
    if (gewaehlt.length < 2) return;
    const wo = folge.indexOf(gewaehlt[0]);
    const rest = folge.filter(id => !stand.gewaehlt.includes(id));
    const vor = rest.filter(id => folge.indexOf(id) < wo);
    stand.spaltenfolge = [...vor, ...gewaehlt,
                          ...rest.filter(id => folge.indexOf(id) > wo)];
    stand.gewaehlt = [];
    merken(); etappe1();
  };
  const zurueckKnopf = document.getElementById('folgezurueck');
  if (zurueckKnopf) zurueckKnopf.onclick = () => {
    stand.spaltenfolge = D.zeilen.map(z => z.id);
    stand.gewaehlt = [];
    merken(); etappe1();
  };

  if (!letzter) document.getElementById('mehr').onclick = () => {
    stand.schritt = schritt + 1; merken(); etappe1();
  };
  if (schritt > 1) document.getElementById('zurueckschritt').onclick = () => {
    stand.schritt = schritt - 1; merken(); etappe1();
  };
  document.getElementById('weiter').onclick = () => {
    if (!letzter){ stand.schritt = schritt + 1; merken(); etappe1(); return; }
    stand.etappe = 1; los();
  };
  window._neuzeichnen = () => etappe1();
  // Nur in index.html sichtbar - sie nennt die vier Ueberschriften,
  // die auf der Flaeche mit Absicht fehlen.
  loesungsHinweis(D.loesung_e1);
}

/* ───────── Etappe 2 · Einordnen ─────────

   Das Kleeblatt. Drei Kreise, eine Erleichterung je Kreis — und zwar
   GENAU die drei Spalten aus Etappe 1. Etappe 2 ordnet, was Etappe 1
   nebeneinandergelegt hat.

   «Mit Reihenfolge» ist kein Kreis. Sie ist immer moeglich, weil sie
   den groessten Detailgrad hat — ein Kreis, in dem alles laege, sagt
   nichts. Die Kreise fragen nach der ERLEICHTERUNG.

   BEFUND, gerechnet in tabelle.pruefen() und erweiterung.pruefen():
   Zwei der sieben Felder bleiben zwingend leer. «Ohne Reihenfolge»
   braucht eine Situation OHNE Wiederholung, «nur die Art» eine MIT —
   die beiden Kreise koennen sich also nicht schneiden. Und ein
   Ausschnitt ist nur moeglich, wo das Ereignis von Plaetzen spricht;
   dann erzwingt es die Reihenfolge, und der linke Kreis ist zu.

   Die leeren Felder sind deshalb DA und nicht weggelassen. Wer sie
   nicht sieht, kann nicht bemerken, dass sie leer bleiben — und genau
   das ist die Einsicht. */

// Die Geometrie des Kleeblatts. EINE Quelle: Das Hintergrundbild und
// die Ablagefelder rechnen beide daraus.
const KLEE = {
  breite: 600, hoehe: 540, r: 160,
  mitte: {rf: [200, 190], aus: [400, 190], kat: [300, 350]},
  // Je Feld: Kuerzel, welche Kreise, Rechteck [x, y, b, h].
  felder: [
    {id:'rf',        in:['rf'],              kasten:[ 80, 140, 140, 105]},
    {id:'aus',       in:['aus'],             kasten:[380, 140, 140, 105]},
    {id:'rf-aus',    in:['rf','aus'],        kasten:[236,  92, 128,  76]},
    {id:'rf-kat',    in:['rf','kat'],        kasten:[134, 290, 118,  76]},
    {id:'aus-kat',   in:['aus','kat'],       kasten:[348, 290, 118,  76]},
    {id:'rf-aus-kat',in:['rf','aus','kat'],  kasten:[248, 234, 104,  68]},
    {id:'kat',       in:['kat'],             kasten:[236, 396, 128,  84]},
    {id:'keine',     in:[],                  kasten:[ 20, 424, 150, 100]},
  ],
};

/* Umbruch auf hoechstens `breit` Zeichen je Zeile, hoechstens drei
   Zeilen. Ein SVG bricht Text nicht von selbst um - und ein
   selbstgeschriebener Name kann lang sein. */
function _umbruch(text, breit){
  const zeilen = [];
  let zeile = '';
  text.split(/\s+/).forEach(w => {
    if ((zeile + ' ' + w).trim().length > breit && zeile){
      zeilen.push(zeile); zeile = w;
    } else zeile = (zeile + ' ' + w).trim();
  });
  if (zeile) zeilen.push(zeile);
  return zeilen.slice(0, 3);
}

/* Was in ein SVG geschrieben wird, muss maskiert sein - der Name kommt
   aus einem Textfeld, in dem ein & oder ein < stehen darf. Ohne das
   waere die Zeichnung ab dort kaputt, und zwar stumm. */
function _roh(s){
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;');
}

function kleeblattBild(){
  const g = KLEE, t = [];
  t.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${g.breite} ${g.hoehe}">`);
  const toene = {rf:'#7FB069', aus:'#6C9BD1', kat:'#C99BC0'};
  D.kreise.forEach(k => {
    const [x, y] = g.mitte[k.id];
    t.push(`<circle cx="${x}" cy="${y}" r="${g.r}" fill="${toene[k.id]}" `
      + `fill-opacity=".13" stroke="${toene[k.id]}" stroke-width="2"/>`);
  });
  /* An den Kreisen stehen DIE SELBST GESCHRIEBENEN NAMEN.

     Rike, 2026-09-21: «Der Name der Spezialfaelle, so wie Sie sie
     benennen, das sollte dann nachher im Venn-Diagramm erscheinen.»

     Damit haengen die beiden Etappen wirklich zusammen: Was in
     Etappe 1 benannt wurde, ist hier die Ueberschrift, unter der
     einsortiert wird. Wer keinen Namen geschrieben hat, sieht das -
     der Platzhalter schickt zurueck, statt einen Namen zu liefern.

     FEHLERBEHOBEN (2026-09-21, beim ersten Blick im Browser): Die
     vollen Saetze standen ueber den Kreisen und ueberlappten einander;
     «Ohne Reihenfolge geht auchEin Ausschnitt genuegt» stand als ein
     Wort da. Der Name sitzt jetzt im aeusseren Zipfel des eigenen
     Kreises, wo kein Ablagefeld liegt, und wird bei Bedarf umbrochen. */
  const wo = {rf:[130, 86], aus:[470, 86], kat:[300, 500]};
  D.kreise.forEach(k => {
    const [x, y] = wo[k.id];
    const eigen = (stand.texte['wegname' + k.weg] || '').trim();
    const zeilen = eigen ? _umbruch(eigen, 20)
                         : ['Spezialfall ' + (k.weg - 1), '(noch ohne Namen)'];
    zeilen.forEach((z, i) => {
      t.push(`<text x="${x}" y="${y + i * 17}" text-anchor="middle" `
        + `font-family="sans-serif" font-size="14" `
        + `font-weight="${eigen ? 600 : 400}" `
        + `fill="${eigen ? '#5a5349' : '#a09786'}">${_roh(z)}</text>`);
    });
  });
  t.push(`<text x="95" y="418" text-anchor="middle" font-family="sans-serif" `
    + `font-size="13" fill="#8a8279">keiner der drei</text>`);
  t.push('</svg>');
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(t.join(''));
}

/* Wo gehoert eine Zeile hin? Aus D.kleeblatt — gerechnet, nicht
   hingeschrieben. */
const KLEEZIEL = {};
D.kleeblatt.forEach(z => {
  KLEEZIEL[z.id] = z.gehoert.length ? z.gehoert.slice().sort().join('-')
                                    : 'keine';
});

function _loesungStandE2(){
  const karten = {};
  Object.entries(KLEEZIEL).forEach(([id, ort]) => {
    karten[id] = {ort, x: 0, y: 0, rot: 0};
  });
  return {karten};
}

function etappe2(){
  const a = D.etappen[1];
  if (!stand.runde2) stand.runde2 = 1;
  const runde2 = stand.runde2 === 2;
  if (!runde2) loesungAnwenden(_loesungStandE2);

  const auftrag = runde2
    ? 'Jetzt die Aufgaben aus dem Skript. Sie spielen nicht mehr in der '
      + 'Eisdiele — Ihr Kriterium muss trotzdem tragen. '
      + '<span class="zart">Hier gibt es keine hinterlegte Lösung. Prüfen '
      + 'Sie am eigenen Satz, nicht an einer Tabelle.</span>'
    : 'Drei Erleichterungen, drei Kreise. Legen Sie jede Situation aus '
      + 'Etappe 1 dorthin, wo sie hingehört — <b>mit Reihenfolge</b> geht '
      + 'immer, danach wird nicht gefragt. '
      + '<span class="zart">Passt keine der drei, gibt es unten links '
      + 'ein Feld dafür. Und schauen Sie, welche Felder leer bleiben.</span>';

  buehne({rolle:a.rolle, rang:a.rang,
    // GEZAEHLT, nicht hingeschrieben: Es waren acht, dann neun. Eine
    // Zahl im Text, die niemand nachzieht, ist eine, die still falsch
    // wird.
    titel: runde2 ? 'Etappe 2 · Runde 2 — die Aufgaben aus dem Skript'
                  : `Etappe 2 · Runde 1 — die ${D.zeilen.length} Situationen`,
    text: auftrag},
    runde2 ? 'Aufgaben aus dem Skript' : `Die ${D.zeilen.length} Situationen`,
    'Was ist hier erlaubt? ' + D.kreise.map(k => {
      const eigen = (stand.texte['wegname' + k.weg] || '').trim();
      return `<span class="klegende ${k.id}" title="${k.lang}">${
        eigen || 'Spezialfall ' + (k.weg - 1)}</span>`;
    }).join(''),
    `<button class="knopf leer" id="zurueck" title="Alle Karten zurück">↺</button>
     ${runde2 ? '' : '<button class="knopf" id="pruefen">Prüfen</button>'}
     ${runde2 ? '<button class="knopf leer" id="zurueckrunde">← zurück zu den Situationen</button>'
              : '<button class="knopf leer" id="mehr">Aufgaben aus dem Skript dazu</button>'}
     <span class="befund" id="befund"></span>`,
    praemissen());

  const tisch = document.getElementById('tisch');
  const feld = document.getElementById('feld');
  const els = {};
  const dabei = runde2 ? D.transfer : D.zeilen;
  dabei.forEach(z => { els[z.id] = karte(z.id); });

  function zonen(){
    feld.querySelectorAll('.feld').forEach(d => d.remove());
    feld.querySelectorAll('.kleeblattbild').forEach(d => d.remove());
    const bb = feld.clientWidth || 520;
    const f = bb / KLEE.breite;
    const bild = document.createElement('img');
    bild.className = 'kleeblattbild'; bild.src = kleeblattBild();
    bild.alt = ''; feld.appendChild(bild);
    KLEE.felder.forEach(z => {
      const [x, y, w, h] = z.kasten;
      const d = document.createElement('div');
      d.className = 'feld zone'; d.dataset.ort = z.id;
      d.style.left = (x * f) + 'px'; d.style.top = (y * f) + 'px';
      d.style.width = (w * f) + 'px'; d.style.height = (h * f) + 'px';
      feld.appendChild(d);
    });
    feld.style.minHeight = (KLEE.hoehe * f + 16) + 'px';
    Object.entries(stand.karten).forEach(([id, s]) => {
      const el = els[id]; if (!el) return;
      const ziel = s.ort === 'tisch' ? tisch
        : (feld.querySelector(`[data-ort="${s.ort}"]`) || tisch);
      ziel.appendChild(el); el._x = s.x; el._y = s.y; el._rot = s.rot; pos(el);
    });
    feld.querySelectorAll('.feld.zone').forEach(d => gruppeOrdnen(d));
  }

  window._neuzeichnen = zonen;
  window._nachAblegen = () => {
    feld.querySelectorAll('.feld.zone').forEach(d => gruppeOrdnen(d));
  };
  zonen();
  const neu = dabei.filter(z => !(z.id in stand.karten)).map(z => els[z.id]);
  if (neu.length){ streuen(neu, tisch); merken(); }

  const befund = document.getElementById('befund');
  if (!runde2) document.getElementById('pruefen').onclick = () => {
    document.querySelectorAll('.k').forEach(k =>
      k.classList.remove('ok', 'falsch'));
    let gut = 0, schief = 0, offen = 0;
    D.zeilen.forEach(z => {
      const s = stand.karten[z.id], el = els[z.id];
      if (!s || s.ort === 'tisch'){ offen++; return; }
      if (s.ort === KLEEZIEL[z.id]){ el.classList.add('ok'); gut++; }
      else { el.classList.add('falsch'); schief++; }
    });
    const satz = [];
    if (offen) satz.push(`${offen} liegen noch auf dem Tisch.`);
    satz.push(`${gut} von ${D.zeilen.length} richtig eingeordnet`
      + (schief ? `, ${schief} nicht.` : '.'));
    if (!offen && !schief) satz.push('Und jetzt: Welche Felder sind leer '
      + 'geblieben — und warum können sie gar nicht anders?');
    befund.textContent = satz.join(' ');
  };

  document.getElementById('zurueck').onclick = () => {
    dabei.forEach(z => { delete stand.karten[z.id]; });
    merken(); etappe2();
  };
  if (runde2) document.getElementById('zurueckrunde').onclick = () => {
    stand.runde2 = 1; merken(); etappe2();
  };
  else document.getElementById('mehr').onclick = () => {
    stand.runde2 = 2; merken(); etappe2();
  };

  if (!runde2) loesungsKnopf(() => etappe2());
  else loesungsHinweis(D.loesung_e2);
}

ETAPPEN.push(etappe1, etappe2);
