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
/* KEIN Streifen mehr ueber dem Text. Das Omega sitzt jetzt IM
   Kartenbild, in dem Einzug, den bauen.py links neben der Vorschrift
   freilaesst - es steht damit neben dem Satz, zu dem es gehoert, und
   nicht darueber. Unten bleibt ein Streifen fuer das Fragezeichen;
   dort steht der Bruch mittig, und die Marke soll ihn nicht treffen. */
.tabzelle .k[data-fest]{width:var(--kb);box-sizing:border-box;
   padding-bottom:26px}
/* Die Fragekarte ist NICHT groesser als die Rechnungen. Sie war es
   (1.14), und das kostete rund vierzig Punkte Hoehe in der Zeile, die
   am wenigsten davon braucht - oben steht ohnehin immer dieselbe
   Situation, waehrend unten die Wege verglichen werden. Rikes Ziel
   war, alle vier Wege zugleich zu sehen. */
/* Die Situationskarte ist KLEINER als die Rechnungen - von Anfang an.
   Rike, 2026-09-21: «Es wird besser, wenn wir die Situation kleiner
   schieben koennen. Allerdings sollten wir das vielleicht von Anfang
   an.» Sie steht in jeder Spalte oben und aendert sich nicht; gelesen
   wird sie einmal. Die Rechnungen darunter werden verglichen, und die
   brauchen den Platz. */
.tabreihe.kopfreihe .k[data-fest]{width:calc(var(--kb) * .72);padding-top:0}
/* FEHLERBEHOBEN (2026-09-21, Rikes Befund «durch diese beiden
   Kaestchen oben sind die Saetze ueberschrieben»): Omega und das
   Fragezeichen sassen auf der oberen Kartenkante - und genau dort
   beginnt die Vorschrift, also der Satz, um den es geht. Die Karte
   bekommt jetzt oben einen freien Streifen; das Bild ruecht darunter.
   Verworfen: die Marken an den unteren Rand. Dort sitzt das
   Urteilszeichen, und der Bruch steht in der Mitte. */
/* Nur das OMEGA sitzt oben. FEHLERBEHOBEN (2026-09-21, im Bild
   gesehen): Diese Regel galt fuer .marke - also fuer beide - und
   gewann mit ihrer hoeheren Spezifitaet gegen das top:auto des
   Denkwegs. Das Fragezeichen blieb oben, obwohl es unten stehen
   sollte. Eine Regel, die «alle Marken» sagt und «die obere» meint. */
/* Das Omega steht neben der ERSTEN Zeile der Vorschrift. Die Lage
   kommt aus D.omega_lage und damit aus bauen.py - gerechnet, nicht
   geschaetzt. Klein gesetzt: Es ist eine Marke am Satz, kein Knopf
   ueber der Karte. */
.tabzelle .k[data-fest] .marke.sit{left:3px;padding:0 4px;font-size:10px;
   line-height:1.5;border-radius:4px}
/* Die beiden Haelften der Karte. REINE ANZEIGE - sie fangen nichts ab
   (pointer-events:none), sonst ginge die Blase auf, sobald man ueber
   die Karte faehrt. Sichtbar werden sie nur, wenn man auf die
   zugehoerige Marke zeigt oder sie festhaelt.

   Ueber den Geschwisterwaehler (die Tilde): Beide Marken werden VOR
   den Haelften an die Karte gehaengt, stehen also im Markup davor. */
.kteil{position:absolute;left:0;right:0;z-index:2;pointer-events:none;
   border-radius:7px;transition:background-color .12s}
.kteil.oben{top:0;height:54%}
.kteil.unten{top:54%;bottom:0}
.k .marke.sit:hover ~ .kteil.oben,
.k .marke.sit.offen ~ .kteil.oben,
.k .marke.denkweg:hover ~ .kteil.unten,
.k .marke.denkweg.offen ~ .kteil.unten{background:rgba(255,255,255,.5);
   box-shadow:inset 0 0 0 1.5px var(--akzent)}
.tabzelle .k[data-fest] .marke.denkweg{top:auto;bottom:5px}
/* Eine gewaehlte Situation. Kein Haken und kein Rahmen aussen herum -
   die Karte selbst hebt sich, wie eine, die man in die Hand genommen
   hat. */
.k.gewaehlt{box-shadow:0 0 0 3px var(--akzent), 0 6px 14px rgba(45,41,36,.22);
   transform:translateY(-3px)}
.leiste .knopf[disabled]{opacity:.45;cursor:default}
/* WO die beiden Marken sitzen, ist Rikes Entscheidung vom 2026-09-21
   und keine Anordnungsfrage:

   «Die Information mit dem Omega, die oben steht, die sollte zu dem
   Notiert-Teil. Und das Fragezeichen, so hat die Person gedacht,
   müsste in den unteren Teil. Man müsste einfach unterscheiden, dass
   das Omega die Information ist zu dem, was notiert wird, und dass das
   Fragezeichen etwas anderes ist.»

   Also: Omega OBEN, wo die Vorschrift steht - es zeigt dieselbe Sache
   ausgeschrieben. Das Fragezeichen UNTEN, bei der Rechnung - es
   erzaehlt, wie sie zustande kam. Die Marke sitzt damit jeweils an
   dem, worueber sie spricht.

   Beide bekommen einen freien Streifen, oben und unten. Der obere
   traegt die Wegfarbe und ist Rike ausdruecklich recht: «Prinzipiell
   finde ich es gut mit diesem oberen, dass wir diese gruene Leiste
   oben haben, dass das deutlich wird.» */
.k .marke.denkweg{top:auto;bottom:5px;left:auto;right:5px}
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
/* Durchgestrichen heisst «traegt nicht» - und zwar SICHTBAR.

   Rike, 2026-09-21: «Das Durchstreichen finde ich noch nicht
   ueberzeugend genug. Vielleicht wuerden wir in beide Richtungen
   durchstreichen, so wie ein Kreuz, dass klar wird: komplett
   durchgestrichen.»

   Der Kern zieht einen fast waagrechten Strich (-9 Grad) ueber die
   Kartenmitte. Auf einer Karte, die selbst waagrechte Linien traegt -
   den Bruchstrich, die Trennlinie unter der Vorschrift -, geht er
   darin unter. Zwei Diagonalen von Ecke zu Ecke tun das nicht.

   Gezeichnet mit zwei Farbverlaeufen statt mit gedrehten Balken: Ein
   gedrehter Balken braucht die Diagonale als Laenge, und die haengt an
   der Kartengroesse, die der Regler verstellt. Ein Verlauf «nach
   unten rechts» trifft die Ecke immer. */
.tabzelle .k.traegtnicht{opacity:.62}
.tabzelle .k.traegtnicht::after{
   content:'';position:absolute;left:0;right:0;top:0;bottom:0;
   width:auto;height:auto;transform:none;background-color:transparent;
   pointer-events:none;z-index:3;border-radius:8px;
   background-image:
     linear-gradient(to bottom right, transparent calc(50% - 1.6px),
       #8a5a12 calc(50% - 1.6px), #8a5a12 calc(50% + 1.6px),
       transparent calc(50% + 1.6px)),
     linear-gradient(to bottom left, transparent calc(50% - 1.6px),
       #8a5a12 calc(50% - 1.6px), #8a5a12 calc(50% + 1.6px),
       transparent calc(50% + 1.6px))}
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
.kleeblattbild{position:absolute;top:0;pointer-events:none;z-index:0}
#feld .feld.zone{z-index:2}
#feld .feld.zone > .kopf{font-size:10.5px;padding:3px 5px 0;color:var(--matt)}
/* Die Textkarte. Feste Breite in Punkten, nicht als Bruchteil der
   Kartengroesse: Sie traegt Text, und Text hat eine Lesbarkeitsgrenze,
   die mit dem Regler nichts zu tun hat. */
.k.textkarte{width:132px;padding:5px 7px 6px;box-sizing:border-box;
   background:#fffefb;display:block}
.k.textkarte .kherkunft{display:block;font-size:9.5px;line-height:1.3;
   color:var(--matt);margin-bottom:3px}
.k.textkarte .kereignis{display:block;font-size:11.5px;line-height:1.3;
   color:var(--tinte);font-weight:600}
.k.textkarte b{font-weight:700}
.k.textkarte.vorn{box-shadow:0 4px 14px rgba(45,41,36,.3),
   inset 0 0 0 2.5px var(--akzent)}
/* IM ABLAGEFELD wird die Karte KLEINER.

   Rike, 2026-09-22: «Die Kaertchen werden nicht kleiner, wenn ich sie
   auf die Felder schiebe.» Stimmt - sie waren ueberall gleich breit,
   und damit lagen im Lappen vier Karten, wo drei Platz hatten.

   Auf dem Tisch werden die Karten GELESEN, im Feld werden sie
   GEZAEHLT: Dort geht es darum, welche Situationen beieinander liegen,
   nicht mehr darum, was auf ihnen steht. Deshalb schrumpft die Karte
   beim Ablegen auf zwei Zeilen Ereignis - und wer doch nachlesen
   will, zeigt darauf: Dann klappt sie auf ihre volle Groesse auf und
   kommt nach vorn.

   Die Herkunftszeile faellt im Feld weg. Sie sagt, aus welcher
   Situation die Karte stammt - das ist beim Einsortieren schon
   entschieden. */
#feld .feld.zone .k.textkarte{width:106px;padding:4px 5px 5px;
   transition:width .12s}
#feld .feld.zone .k.textkarte .kherkunft{display:none}
#feld .feld.zone .k.textkarte .kereignis{font-size:10px;line-height:1.25;
   display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;
   overflow:hidden}
#feld .feld.zone .k.textkarte.vorn{width:158px}
#feld .feld.zone .k.textkarte.vorn .kherkunft{display:block}
#feld .feld.zone .k.textkarte.vorn .kereignis{font-size:11.5px;
   -webkit-line-clamp:none;overflow:visible}
#feld .feld.zone{background:rgba(255,254,251,.55)}
#feld .feld.zone.ueber{background:#fff}
/* Woher kommt die Karte? Rike, 2026-09-21: «Ich haette gerne, dass das
   farblich unterschieden ist, ob ich gerade die Situation aus der
   Eisdiele habe oder ob die Situationen aus dem Skript dazugekommen
   sind.» Die Eisdiele warm (Kapitelton), das Skript kuehl und blass -
   es ist Herkunft, keine Wertung, und soll deshalb zuruecktreten. */
.k.auseisdiele{background:color-mix(in srgb, var(--akzent) 20%, #fff);
   box-shadow:inset 0 0 0 2.5px var(--akzent), 0 2px 6px rgba(0,0,0,.14)}
.k.ausskript{background:#f2f1ee;
   box-shadow:inset 0 0 0 2px #9a948a, 0 2px 6px rgba(0,0,0,.14)}
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

/* Kapitel 3 startet GROESSER als der Ausweichwert des Kerns (132).

   Rike, zweimal an einem Abend: «Es ist alles noch sehr, sehr klein» -
   «Ich finde es immer noch sehr, sehr klein.»

   Der Grund liegt an diesem Kapitel und nicht am Kern: Hier traegt die
   KARTE das Lesbare. Auf ihr stehen die Vorschrift in Worten und der
   Bruch mit seinen Binomialkoeffizienten - in Kapitel 1 und 2 steht
   auf einer Karte ein Term oder eine Menge. Dieselbe Kartenbreite
   ergibt hier also deutlich kleinere Schrift.

   Gesetzt wird nur EINMAL, beim ersten Aufbau: Wer danach am Regler
   dreht, soll seine Einstellung behalten - auch ueber den
   Etappenwechsel. */
if (!stand.kbGesetzt){
  document.documentElement.style.setProperty('--kb', '186px');
  stand.kbGesetzt = true;
}

/* Eine Rechnung in der Tabelle. Sie liegt FEST — gezogen wird hier
   nichts, die Zuordnung ist gegeben.

   Zwei Marken:
     Ω   die Ergebnismenge, ausgeschrieben (Rike, 2026-08-22)
     ?   der DENKWEG (Lars' Anstoss, Rikes Ausgestaltung): «Man sollte,
         wenn man auf die Karte drauf geht, den Denkweg einblenden
         koennen.» Er steht deshalb nicht auf der Karte — die bleibt in
         der uebersichtlichen Form, die Rike behalten wollte. */
/* Eine FESTE Karte der Tabelle - Fragekarte wie Rechnung.

   FEHLERBEHOBEN (2026-09-21, Rikes Screenshot, ZWEITER Anlauf): Die
   Ruecknahme der Hebung sass nur in rechenkarte(). Die Fragekarten der
   Kopfzeile entstehen aber woanders, und sie blieben deshalb ueber der
   klebenden ersten Spalte: Beim Rollen nach rechts schob sich
   «Genau zwei Kugeln sind Sorbet» sichtbar ueber «Die Situationen →».

   Die Lehre daraus ist nicht die Zahl, sondern der Ort: Eine
   Eigenschaft, die für JEDE feste Karte gilt, gehoert an EINE Stelle.
   Beim ersten Mal stand sie an der, die gerade offen war.

   Warum z-index 3: ueber den Nachbarkarten (auto), unter der klebenden
   Spalte (4). Die Lupe bleibt und wird am Zeilenkopf beschnitten - das
   ist richtig, der Zeilenkopf sagt, welcher Weg das ist. */
function festkarte(id, marke){
  const el = karte(id, marke || null, {fest:true});
  el.addEventListener('pointerenter', () => { el.style.zIndex = 3; });
  /* FEHLERBEHOBEN (2026-09-21, Maurus' Befund «Rollover-Zoom ist z.T.
     hinter den benachbarten Karten»): Die Hebung wurde nie
     zurueckgenommen. Der Kern setzt sie beim Weggehen auf `_z0`
     zurueck - das ist der Wert VOR dem Daraufzeigen, und der ist leer,
     also falsy; die Zeile `zIndex = _z0 || zIndex` liess damit den
     bestehenden Wert stehen.

     Folge: Jede einmal beruehrte Karte behielt die 3. Zwei Karten mit
     derselben Zahl entscheidet die Reihenfolge im DOM - die spaetere
     gewinnt. Wer erst die rechte und dann die linke Karte ansah, sah
     die linke vergroessert HINTER der rechten. Genau das.

     Jetzt wird beim Weggehen geleert. Dann hat immer nur die Karte
     unter dem Zeiger eine Hebung. */
  el.addEventListener('pointerleave', () => { el.style.zIndex = ''; });
  return el;
}

function rechenkarte(l){
  const el = festkarte(l.id, {text:'Ω', art:'sit', titel:l.menge});
  const zweite = mkMarke({text:'?', art:'skript',
    titel:'<b>So hat die Person gedacht</b><br>' + l.denkweg}, el);
  zweite.classList.add('denkweg');
  el.appendChild(zweite);

  /* DIE KARTE HAT ZWEI TEILE, und das soll man SEHEN - aber nicht
     ungefragt lesen muessen.

     Rike, 2026-09-21: «Das Omega sollte zu dem Notiert-Teil, und das
     Fragezeichen in den unteren Teil. Im Moment wird nicht sichtbar,
     dass das Omega zu diesem Notiert-wird gehoert.»

     Meine erste Antwort darauf war, die ganze Karte in zwei
     Schaltflaechen zu teilen - wer oben hinfuhr, bekam die Menge, wer
     unten hinfuhr, den Denkweg. Rike am 2026-09-22: «Mir gefaellt
     nicht, dass sich die Hilfe-Buttons sofort oeffnen, sobald man
     ueber die Karte faehrt. Das will ich nur, wenn man ueber diese
     Buttons faehrt.»

     Sie hat recht, und der Grund ist mehr als Geschmack: Auf dieser
     Flaeche faehrt man staendig ueber Karten - beim Vergleichen, beim
     Suchen, beim Rollen. Eine Blase, die dabei von selbst aufgeht,
     verdeckt die Nachbarkarte, um die es gerade geht.

     Neu oeffnet NUR die Marke, wie ueberall sonst. Die Zugehoerigkeit
     bleibt trotzdem sichtbar: Wer auf eine Marke zeigt, sieht die
     zugehoerige Kartenhaelfte aufleuchten. Die Haelften sind dafuer
     reine Anzeige - `pointer-events: none` -, sie fangen nichts mehr
     ab.

     Die Trennung sitzt bei 54 Prozent; dort laeuft im Kartenbild die
     Linie, die bauen.py unter die Vorschrift zeichnet. */
  const omega = el.querySelector('.marke.sit');
  if (omega && D.omega_lage){
    omega.style.top = D.omega_lage.oben + '%';
    omega.style.height = D.omega_lage.hoehe + '%';
  }
  ['oben', 'unten'].forEach(wo => {
    const teil = document.createElement('span');
    teil.className = 'kteil ' + wo;
    el.appendChild(teil);
  });

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
    const kk = festkarte(z.id);
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
  /* KEIN PRUEFKNOPF IN ETAPPE 1.

     Rikes Entscheidung vom 2026-09-21, auf Maurus' Frage «Pruefbutton:
     Braucht es den?»: «Den braucht es in eins ehrlich gesagt nicht. Das
     Einzige, wo man pruefen koennte, ist, ob die Falschen richtig
     ausgekreuzt sind. Aber ich glaube, wir lassen den Pruefbutton da
     weg.»

     Der Grund ist der des ganzen Kapitels: Hier soll man VOR dem
     Rechnen sehen, welcher Weg traegt. Ein Knopf, der es nachher sagt,
     kann genau das ersetzen - man kreuzt, drueckt, korrigiert und hat
     nichts gesehen. Das Kreuz bleibt; es haelt fest, was die Gruppe
     entschieden hat, und die zwei Fragen je Weg verlangen die
     Begruendung.

     Die Ruecknahme (↺) bleibt: Sie nimmt keine Antwort ab, sie raeumt
     den Tisch.

     In Etappe 2 bleibt der Pruefknopf. Dort ist die Zuordnung ins
     Kleeblatt gerechnet, und die Frage ist eine andere.

     UEBERHOLT: Hier stand die Auswertung der Urteile - Zaehlung,
     gruene und rote Karten, Befundzeile. Entfernt statt totgelegt,
     damit niemand sie fuer einen noch benutzten Weg haelt; sie steht
     in Git.

     Weg 1 bleibt aus `sichtbar()` heraus: Seine Karten tragen kein
     Urteilszeichen, also kann die Ruecknahme dort auch nichts
     zuruecknehmen. */
  const sichtbar = () => D.loesungen.filter(
    l => l.spalte <= schritt && l.spalte > 1);

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
/* GROESSER, und die Ablageflaechen fuellen die Lappen.

   Rike, 2026-09-21: «Wir haben ja so viel Platz in diesen
   Kreisdiagrammen, nicht nur diese rechten Winkel. Da ist das einfach
   noch nicht optimal geloest.»

   Stimmt: Die erste Fassung setzte acht Briefmarken in eine grosse
   Zeichnung. Jetzt sind die Kreise groesser (r 178 statt 160, weiter
   auseinander), und die drei EINZELLAPPEN bekommen grosszuegige
   Felder - dort landet fast alles. Die Schnittfelder bleiben klein;
   drei von ihnen koennen nach Befund (2) ohnehin nie etwas enthalten,
   und sie stehen da, damit man das sieht.

   Die Ecken eines Rechtecks liegen nicht immer vollstaendig im
   Lappen - ein Kreisabschnitt ist nun einmal kein Rechteck. Die MITTE
   jedes Feldes liegt tief darin, und die Kreise sind durchscheinend
   gezeichnet, also ist die Zugehoerigkeit lesbar. */
const KLEE = {
  breite: 640, hoehe: 610, r: 178,
  mitte: {rf: [205, 205], aus: [435, 205], kat: [320, 405]},
  // Je Feld: Kuerzel, welche Kreise, Rechteck [x, y, b, h].
  felder: [
    {id:'rf',        in:['rf'],              kasten:[ 52, 118, 166, 152]},
    {id:'aus',       in:['aus'],             kasten:[422, 118, 166, 152]},
    {id:'rf-aus',    in:['rf','aus'],        kasten:[268, 140, 104,  84]},
    {id:'rf-kat',    in:['rf','kat'],        kasten:[152, 302, 116,  92]},
    {id:'aus-kat',   in:['aus','kat'],       kasten:[372, 302, 116,  92]},
    {id:'rf-aus-kat',in:['rf','aus','kat'],  kasten:[268, 252, 104,  86]},
    {id:'kat',       in:['kat'],             kasten:[233, 418, 174, 148]},
    {id:'keine',     in:[],                  kasten:[ 16, 452, 176, 140]},
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
  const wo = {rf:[135, 82], aus:[505, 82], kat:[320, 596]};
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
  t.push(`<text x="104" y="443" text-anchor="middle" font-family="sans-serif" `
    + `font-size="14" fill="#8a8279">keiner der drei</text>`);
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

/* Eine Situation als TEXT, nicht als verkleinertes Kartenbild.

   Rike, 2026-09-21: «Die Situationen sind so mini klein im
   Venn-Diagramm, dass man sie praktisch nicht mehr lesen kann. Und
   auch nicht, wenn man draufgeht und sie groesser macht.»

   Sie hat recht, und das Vergroessern hilft wirklich nicht: Das
   Kartenbild ist fuer 186 Punkte Breite gesetzt. Auf 55 Punkte
   geschrumpft ist seine Schrift rund zwei Punkte gross, und die Lupe
   macht daraus drei. Ein Bild kann man nicht kleiner setzen, ohne es
   unleserlich zu machen - Text schon.

   Also traegt die Karte im Kleeblatt ihren Text selbst: oben die
   Herkunft (die Wiederholungszeile bzw. «Skript 3.1»), darunter das
   Ereignis. Bei 150 Punkten Breite sind das zwei bis drei gut lesbare
   Zeilen - auf derselben Flaeche, auf der vorher ein unlesbares
   Bildchen sass.

   `ziehbar()` ist dieselbe Geste wie bei jeder anderen Karte; nur das
   Innere ist ein anderes. */
function textkarte(id, herkunft, oben, ereignis){
  const el = document.createElement('div');
  el.className = 'k textkarte ' + herkunft;
  el.dataset.id = id;
  el._x = 0; el._y = 0; el._rot = 0;
  el.innerHTML = `<span class="kherkunft">${oben}</span>`
               + `<span class="kereignis">${ereignis}</span>`;
  el.ondragstart = () => false;
  /* Liegen mehr Karten in einem Feld, als Platz ist, ruecken sie
     uebereinander - siehe zoneOrdnen(). Dann muss man die untere lesen
     koennen, ohne sie herauszuziehen. Daraufzeigen hebt sie nach vorn.
     Die Lupe des Kerns gibt es hier nicht: Sie vergroessert ein BILD,
     und diese Karte traegt Text - der ist schon lesbar, er war nur
     verdeckt. */
  el.addEventListener('pointerenter', () => {
    el._zVorn = el.style.zIndex;
    el.style.zIndex = 900;
    el.classList.add('vorn');
  });
  el.addEventListener('pointerleave', () => {
    if (el._zieht) return;
    el.style.zIndex = el._zVorn || '';
    el.classList.remove('vorn');
  });
  ziehbar(el);
  return el;
}

/* Die Karten eines Ablagefeldes ordnen - OHNE das Feld zu vergroessern.

   FEHLERBEHOBEN (2026-09-21, Rikes Befund «wenn ich dort Sachen
   reinhuepfe, dann wird das Feld ganz gross»): Der Kern ordnet mit
   gruppeOrdnen(), und das rechnet mit der VOLLEN Kartenbreite und
   macht das Feld so hoch, wie es braucht. In einem Sortierbrett ist
   das richtig. Im Kleeblatt ist es falsch: Die Felder liegen an
   festen Stellen ueber einer Zeichnung, und ein wachsendes Feld
   schiebt sich ueber die Kreise und ihre Namen.

   Hier wird deshalb mit der TATSAECHLICHEN Kartenbreite gerechnet, und
   die Hoehe des Feldes bleibt, wie sie gesetzt wurde. Passen mehr
   Karten hinein, als Platz ist, ruecken sie enger zusammen und
   ueberlappen - wie ein Stapel auf dem Tisch. Das ist besser als ein
   Feld, das die Zeichnung auffrisst.

   ablegen() im Kern ruft gruppeOrdnen() selbst auf; diese Funktion
   laeuft danach ueber window._nachAblegen und stellt die Hoehe wieder
   her. */
function zoneOrdnen(d){
  const karten = [...d.querySelectorAll(':scope > .k')];
  d.style.height = d.dataset.hoehe + 'px';
  if (!karten.length) return;
  const erste = karten[0].getBoundingClientRect();
  const kw = erste.width || 50, kh = erste.height || 42;
  const innen = d.clientWidth - 10, hoch = d.clientHeight - 10;
  const spalten = Math.max(1, Math.floor(innen / (kw + 4)));
  const zeilen = Math.max(1, Math.ceil(karten.length / spalten));
  // Enger ruecken, wenn es sonst unten hinausliefe.
  const schritt = Math.min(kh + 4, Math.max(14, (hoch - kh) / Math.max(1, zeilen - 1)));
  karten.forEach((k, i) => {
    k._rot = 0;
    k._x = 5 + (i % spalten) * (kw + 4);
    k._y = 5 + Math.floor(i / spalten) * schritt;
    k.style.zIndex = 10 + i;
    pos(k);
  });
}

/* ───────── Etappe 2 · Einordnen ─────────

   UMGEBAUT am 2026-09-21 auf Rikes Befunde:

   «Ich haette gerne, dass sowohl die Situationen aus der Eisdiele als
   auch, wenn man moechte, die Situationen aus dem Skript gleichzeitig
   da liegen koennen. Und ich haette gerne, dass das farblich
   unterschieden ist.»

   Die beiden Runden sind damit keine Runden mehr, sondern EIN Brett,
   zu dem man etwas dazulegt. Das ist auch sachlich richtig: Die
   Aufgaben aus dem Skript sind kein zweiter Durchgang, sondern die
   Probe aufs Exempel - und die lebt davon, dass die Eisdiele daneben
   liegen bleibt.

   «Und bei den Sachen aus dem Skript sollte irgendwie auch stehen,
   Aufgabe so und so.» Stimmt, das ging beim Umbau verloren: In der
   alten Etappe 3 trugen die Transferkarten ihre Marke («Skript 3.1»),
   hier bekamen sie keine. Wieder da. */
function etappe2(){
  const a = D.etappen[1];
  if (stand.skriptDa === undefined) stand.skriptDa = false;
  loesungAnwenden(_loesungStandE2);

  buehne({rolle:a.rolle, rang:a.rang,
    titel:'Etappe 2 · Einordnen',
    text:'Drei Erleichterungen, drei Kreise. Legen Sie jede Situation '
       + 'dorthin, wo sie hingehört — <b>mit Reihenfolge</b> geht immer, '
       + 'danach wird nicht gefragt. '
       + '<span class="zart">Passt keine der drei, gibt es unten links '
       + 'ein Feld dafür. Und schauen Sie, welche Felder leer bleiben.'
       + (stand.skriptDa
          ? ' Die grauen Karten kommen aus dem Skript — dort hilft keine '
            + 'hinterlegte Lösung, nur Ihr eigenes Kriterium.'
          : '')
       + '</span>'},
    stand.skriptDa ? 'Eisdiele und Skript' : `Die ${D.zeilen.length} Situationen`,
    'Was ist hier erlaubt? ' + D.kreise.map(k => {
      const eigen = (stand.texte['wegname' + k.weg] || '').trim();
      return `<span class="klegende ${k.id}" title="${k.lang}">${
        eigen || 'Spezialfall ' + (k.weg - 1)}</span>`;
    }).join(''),
    `<button class="knopf leer" id="zurueck" title="Alle Karten zurück">↺</button>
     <button class="knopf" id="pruefen">Prüfen</button>
     ${stand.skriptDa
       ? '<span class="befund zart">Die Aufgaben aus dem Skript liegen dabei.</span>'
       : '<button class="knopf leer" id="mehr">Aufgaben aus dem Skript dazulegen</button>'}
     <span class="befund" id="befund"></span>
     <span class="befund zart" style="margin-left:auto">Die Lösung gilt nur
       für die Eisdiele — für die Aufgaben aus dem Skript gibt es keine.</span>`,
    praemissen());

  const tisch = document.getElementById('tisch');
  const feld = document.getElementById('feld');
  const els = {};
  D.zeilen.forEach(z => {
    els[z.id] = textkarte(z.id, 'auseisdiele', z.lage, z.text);
  });
  if (stand.skriptDa) D.transfer.forEach(t => {
    els[t.id] = textkarte(t.id, 'ausskript', t.marke, t.text);
  });
  const dabei = Object.keys(els);

  function zonen(){
    feld.querySelectorAll('.feld').forEach(d => d.remove());
    feld.querySelectorAll('.kleeblattbild').forEach(d => d.remove());
    /* FEHLERBEHOBEN (2026-09-21): Der Massstab kam allein aus der
       BREITE. Bei einem breiten, niedrigen Feld wurde die Zeichnung
       dann hoeher als das Fenster, und man sah immer nur den halben
       Klee - bei einem Venn-Diagramm ist das der halbe Sinn, weil die
       Aussage in den Lagen ZUEINANDER steckt.

       Jetzt entscheidet, was knapper ist. Die Zeichnung steht damit
       immer ganz da; dafuer werden die Ablagefelder bei niedrigen
       Fenstern kleiner, und die Karten darin ruecken uebereinander wie
       ein Stapel. Das ist der bessere Tausch: Ein Stapel laesst sich
       auseinanderziehen, ein halbes Venn nicht. */
    const bb = feld.clientWidth || 520;
    const bh = feld.clientHeight || 420;
    const f = Math.min(bb / KLEE.breite, Math.max(bh - 12, 260) / KLEE.hoehe);
    const rand = Math.max(0, (bb - KLEE.breite * f) / 2);
    const bild = document.createElement('img');
    bild.className = 'kleeblattbild'; bild.src = kleeblattBild();
    bild.alt = '';
    bild.style.left = rand + 'px';
    bild.style.width = (KLEE.breite * f) + 'px';
    feld.appendChild(bild);
    KLEE.felder.forEach(z => {
      const [x, y, w, h] = z.kasten;
      const d = document.createElement('div');
      d.className = 'feld zone'; d.dataset.ort = z.id;
      d.style.left = (rand + x * f) + 'px'; d.style.top = (y * f) + 'px';
      d.style.width = (w * f) + 'px'; d.style.height = (h * f) + 'px';
      // Die gesetzte Hoehe merken - zoneOrdnen stellt sie wieder her,
      // nachdem der Kern sie beim Ablegen veraendert hat.
      d.dataset.hoehe = Math.round(h * f);
      feld.appendChild(d);
    });
    feld.style.minHeight = (KLEE.hoehe * f + 12) + 'px';
    Object.entries(stand.karten).forEach(([id, s]) => {
      const el = els[id]; if (!el) return;
      const ziel = s.ort === 'tisch' ? tisch
        : (feld.querySelector(`[data-ort="${s.ort}"]`) || tisch);
      ziel.appendChild(el); el._x = s.x; el._y = s.y; el._rot = s.rot; pos(el);
    });
    feld.querySelectorAll('.feld.zone').forEach(zoneOrdnen);
  }

  window._neuzeichnen = zonen;
  window._nachAblegen = () => {
    feld.querySelectorAll('.feld.zone').forEach(zoneOrdnen);
  };
  zonen();
  const neu = dabei.filter(id => !(id in stand.karten)).map(id => els[id]);
  if (neu.length){ streuen(neu, tisch); merken(); }

  const befund = document.getElementById('befund');
  document.getElementById('pruefen').onclick = () => {
    document.querySelectorAll('.k').forEach(k =>
      k.classList.remove('ok', 'falsch'));
    let gut = 0, schief = 0, offen = 0;
    // NUR die Eisdiele. Fuer die Aufgaben aus dem Skript gibt es keine
    // hinterlegte Loesung - sie kommen aus einer anderen Situation und
    // werden am eigenen Kriterium geprueft, nicht an einer Tabelle.
    D.zeilen.forEach(z => {
      const s = stand.karten[z.id], el = els[z.id];
      if (!s || s.ort === 'tisch'){ offen++; return; }
      if (s.ort === KLEEZIEL[z.id]){ el.classList.add('ok'); gut++; }
      else { el.classList.add('falsch'); schief++; }
    });
    const satz = [];
    if (offen) satz.push(`${offen} aus der Eisdiele liegen noch auf dem Tisch.`);
    satz.push(`${gut} von ${D.zeilen.length} richtig eingeordnet`
      + (schief ? `, ${schief} nicht.` : '.'));
    if (stand.skriptDa) satz.push('Die Aufgaben aus dem Skript sind nicht '
      + 'mitgeprüft — dafür gibt es keine hinterlegte Lösung.');
    if (!offen && !schief) satz.push('Und jetzt: Welche Felder sind leer '
      + 'geblieben — und warum können sie gar nicht anders?');
    befund.textContent = satz.join(' ');
  };

  document.getElementById('zurueck').onclick = () => {
    dabei.forEach(id => { delete stand.karten[id]; });
    merken(); etappe2();
  };
  const mehr = document.getElementById('mehr');
  if (mehr) mehr.onclick = () => { stand.skriptDa = true; merken(); etappe2(); };

  /* NUR loesungsKnopf(). FEHLERBEHOBEN (2026-09-21, im Bild gesehen):
     Hier stand zusaetzlich loesungsHinweis() - und beide haengen einen
     eigenen Umschaltknopf an die Leiste. In der Leiste standen zwei
     Knoepfe «Lösung verbergen» nebeneinander, die Verschiedenes taten.
     Was loesungsHinweis() sagen sollte, steht jetzt als Satz daneben:
     Es ist eine Einschraenkung, kein zweiter Schalter. */
  loesungsKnopf(() => etappe2());
}

ETAPPEN.push(etappe1, etappe2);
