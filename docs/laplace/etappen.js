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
   padding-bottom:30px}
/* Die beiden Urteilsknoepfe im unteren Streifen. Links, damit das
   Fragezeichen rechts seinen Platz behaelt. */
.urteilleiste{position:absolute;left:6px;bottom:5px;display:flex;gap:4px;
   z-index:4}
.urteilleiste.kurz .urteilknopf{padding:5px 8px;font-size:11px}
.urteilknopf{font:600 10px/1 var(--druck);padding:5px 7px;cursor:pointer;
   border:1.4px solid var(--linie);border-radius:6px;background:var(--karte);
   color:var(--matt);white-space:nowrap}
.urteilknopf:hover{border-color:var(--akzent);color:var(--akzent)}
.urteilknopf.ja.an{background:#2E7D32;border-color:#2E7D32;color:#fff}
.urteilknopf.nein.an{background:#8a5a12;border-color:#8a5a12;color:#fff}
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
.tabzelle .k[data-fest] .marke.sit{left:7px;padding:0 4px;font-size:10px;
   line-height:1.5;border-radius:4px}
/* FEHLERBEHOBEN (2026-09-22, gemessen): Diese zwei Zeilen standen im
   Block mit den Kartenhaelften und sind beim Aufraeumen mit
   verschwunden. Folge: Das Fragezeichen fiel auf die Vorgabe des
   Kerns zurueck - oben links, genau auf das Omega. Gemessen: beide
   Marken bei y 4, die eine bei x 4, die andere bei x 7.

   Eine geloeschte Regel ist so still wie eine tote: Der Bau lief
   durch, die Seite lud, und zwei Marken lagen uebereinander. */
.k .marke.denkweg{top:auto;bottom:5px;left:auto;right:5px}
.tabzelle .k[data-fest] .marke.denkweg{top:auto;bottom:5px}
/* VIER Wegfarben. Rike, 2026-09-21: «Vielleicht nehmen wir vier
   Farben. Die erste Farbe ist einfach der Standardweg. Die zweite,
   wenn die Reihenfolge keine Rolle spielt. Die dritte, wenn man nur
   einen Ausschnitt anschaut. Die vierte, wenn man mit einer
   Vergroeberung arbeitet. Und diese drei Farben sollten sich im
   Venn-Diagramm in den Kreisfarben widerspiegeln.»

   Sie tun es: Dieselben drei Hexwerte stehen im Kleeblatt und in den
   Namenskaesten. Derselbe Ton fuer dieselbe Sache, ueber beide
   Etappen.

   Weg 1 bekommt einen eigenen, STUMPFEN Ton - Sand. Er muss sich von
   den dreien unterscheiden und darf ihnen zugleich nicht die Stimme
   nehmen: Er ist der Vergleichspunkt, keine Wahl. Nicht das Ocker -
   das ist die Kapitelfarbe und redete als fuenfte Bedeutung
   dazwischen.

   WIEDER DA (2026-09-22): Auch diese vier Regeln standen im Block mit
   den Kartenhaelften und sind mit ihm verschwunden. Rike: «Wir hatten
   in der letzten Version, dass die Wege jeweils die Farbe der
   Spezialfaelle tragen - das tun sie nicht mehr.» Fuenfte Regel an
   einem Tag; sie steht jetzt mit in NOETIGE_STILE. */
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
   unten rechts» trifft die Ecke immer.

   WIEDER DA (2026-09-22): Dieser Block stand zwischen den
   Kartenhaelften und dem Zeilenkopf und ist beim Entfernen der
   Haelften mit verschwunden. Die Karte fiel damit auf den einen
   Strich des Kerns zurueck - lautlos, denn beides sieht nach
   «durchgestrichen» aus. Rike hat es gesehen: «Bitte wieder wie in
   der letzten Version.» */
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
/* ── Etappe 2 · die Entscheidkarte in der Liste ─────────────── */
/* NEU (2026-09-22, Rikes Entscheidung): Etappe 2 hat keine gezogenen
   Karten mehr.

   Der Weg dahin, weil er die Bauart erklaert: Erst drei Kreise, dann
   drei Rechtecke, dann drei gleich grosse ueberlappende Formen - und
   jedes Mal war dasselbe das Problem, naemlich dass eine LESBARE
   Karte in einen Lappen gelegt werden soll, der dafuer zu schmal ist.
   Die Geometrie gibt das nicht her: Ein Bereich zwischen drei Formen
   ist klein, das ist keine Einstellungssache.

   Also wird nicht mehr gelegt. Die Karte bleibt links, in voller
   Groesse und lesbar, und traegt DREI ENTSCHEIDUNGEN - je eine pro
   Spezialfall, ja oder nein. Sobald alle drei stehen, erscheint die
   Kurzform der Karte von selbst im richtigen Bereich des Kleeblatts.

   Das ist nicht nur ein Ausweg aus dem Platzproblem, es ist der
   bessere Handgriff: Wer zielt, entscheidet einmal und stumm; wer
   dreimal ja oder nein sagt, hat die drei Kriterien einzeln in der
   Hand - und beim Pruefen laesst sich sagen, WELCHES der drei
   danebenlag, nicht bloss «falscher Lappen». */
.eliste{padding:6px 10px 14px;box-sizing:border-box}
.ekarte{position:relative;background:var(--karte);border-radius:10px;
   padding:7px 9px 8px;margin:0 0 9px;box-sizing:border-box;
   box-shadow:0 2px 6px rgba(45,41,36,.13);
   font-size:clamp(11px, calc(var(--kb) * .072), 14.5px);line-height:1.3}
.ekarte.auseisdiele{box-shadow:inset 0 0 0 2.5px var(--akzent),
   0 2px 6px rgba(45,41,36,.13)}
.ekarte.ausskript{background:#f2f1ee;
   box-shadow:inset 0 0 0 2px #9a948a, 0 2px 6px rgba(45,41,36,.13)}
.ekarte .ekopf{display:flex;align-items:baseline;gap:7px;margin-bottom:3px}
.ekarte .kwdh{display:inline-block;font-weight:700;flex:0 0 auto;
   font-size:.80em;letter-spacing:.02em;padding:1px 6px;border-radius:7px}
.ekarte.wdhA .kwdh{background:#f4e3cf;color:#8a5a12}
.ekarte.wdhB .kwdh{background:#dfe9f4;color:#3c5f86}
.ekarte .kwdh.skript{background:#ebe9e4;color:#6b655c}
.ekarte .ekurz{font-weight:700;flex:1 1 auto;min-width:0}
.ekarte .eherkunft{color:var(--matt);font-size:.88em;margin-bottom:2px}
.ekarte .eereignis{margin-bottom:6px}
.ekarte b{font-weight:700}
/* Die AMPEL - drei Punkte in den Farben der drei Kreise. Rike,
   2026-09-22: «Die Karten erhalten dann auch farbliche Markierungen
   nach der Entscheidung.» Gefuellt heisst ja, blass durchgestrichen
   heisst nein, leerer Ring heisst noch offen. Dieselbe Ampel steht
   auf dem Schildchen im Kleeblatt - daran erkennt man die Karte
   drueben wieder. */
.eampel{display:inline-flex;gap:3px;flex:0 0 auto;align-self:center}
.eampel i{width:9px;height:9px;border-radius:50%;border:2px solid;
   box-sizing:border-box;display:block}
.eampel i.rf{border-color:#7FB069}
.eampel i.aus{border-color:#6C9BD1}
.eampel i.kat{border-color:#C99BC0}
.eampel i.ja.rf{background:#7FB069}
.eampel i.ja.aus{background:#6C9BD1}
.eampel i.ja.kat{background:#C99BC0}
.eampel i.nein{opacity:.3}
/* Die drei Entscheidungszeilen. Der Name links ist der, den die
   Studierenden in Etappe 1 selbst geschrieben haben - steht dort noch
   nichts, steht hier der Platzhalter und schickt zurueck. */
.wahlzeile{display:flex;align-items:center;gap:6px;margin-top:3px;
   padding-left:13px;position:relative}
.wahlzeile::before{content:'';position:absolute;left:0;top:calc(50% - 4px);
   width:8px;height:8px;border-radius:50%;border:2px solid;box-sizing:border-box}
.wahlzeile.rf::before{border-color:#7FB069}
.wahlzeile.aus::before{border-color:#6C9BD1}
.wahlzeile.kat::before{border-color:#C99BC0}
.wahlzeile .wname{flex:1 1 auto;min-width:0;font-size:.86em;
   color:var(--matt);overflow:hidden;text-overflow:ellipsis;
   white-space:nowrap}
.wahlzeile .wname.ohne{font-style:italic}
.jn{flex:0 0 auto;font:inherit;font-size:.82em;line-height:1;
   padding:3px 8px;border-radius:7px;cursor:pointer;
   border:1.5px solid var(--linie);background:var(--karte);color:var(--matt)}
.jn:hover{border-color:var(--tinte);color:var(--tinte)}
.wahlzeile.rf .jn.an{background:#7FB069;border-color:#7FB069;color:#fff}
.wahlzeile.aus .jn.an{background:#6C9BD1;border-color:#6C9BD1;color:#fff}
.wahlzeile.kat .jn.an{background:#C99BC0;border-color:#C99BC0;color:#fff}
.wahlzeile .jn.nein.an{background:var(--matt);border-color:var(--matt);
   color:#fff}
/* Die Rueckmeldung sitzt an der ZEILE, nicht an der Karte: Beim
   Pruefen soll dastehen, welches der drei Kriterien danebenlag. */
.wahlzeile.ok::after{content:'✓';color:#2f7a3d;font-weight:700;
   flex:0 0 auto;width:13px;text-align:center}
.wahlzeile.falsch::after{content:'✗';color:#a33;font-weight:700;
   flex:0 0 auto;width:13px;text-align:center}
.ekarte.fertig{opacity:.62}
.ekarte.fertig:hover{opacity:1}
.ekarte.hervor{outline:2.5px solid var(--akzent);outline-offset:2px}

/* ── Etappe 2 · das Kleeblatt ───────────────────────────────── */
/* Jetzt wieder KREISE. Das ging vorher nicht: In eine Sichel zwischen
   drei Kreisen passt keine lesbare Karte. Ein Schildchen mit zwei
   Woertern passt - also darf die Figur wieder die sein, die alle
   kennen. Das ist der eigentliche Gewinn des Umbaus. */
.vform{position:absolute;z-index:0;border-radius:50%;border:2.5px solid;
   pointer-events:none;transition:opacity .15s}
.vform.rf{border-color:#7FB069;background:rgba(127,176,105,.13)}
.vform.aus{border-color:#6C9BD1;background:rgba(108,155,209,.13)}
.vform.kat{border-color:#C99BC0;background:rgba(201,155,192,.13)}
#feld .feld.zone{z-index:2;position:absolute;background:none;border:none;
   display:flex;flex-direction:column;align-items:center;
   justify-content:center;gap:3px;overflow:visible;padding:0}
#feld .feld.zone.aussen{align-items:flex-start;justify-content:flex-start}
/* Ein SCHMALER Bereich - die Sichel zwischen zwei Kreisen ist an der
   engsten Stelle keine 90 Punkte breit. Dort traegt das Schildchen
   nur noch Marke und Kurzform; die Ampel faellt weg, denn WO es
   liegt, sagt ohnehin dasselbe wie sie. Ohne diese Regel quoll der
   Text aus dem Kreis heraus (gemessen: 145 Punkte Schild in einem
   78 Punkte breiten Bereich). */
#feld .feld.zone.eng .kleechip{font-size:10px;padding:2px 4px;gap:3px}
#feld .feld.zone.eng .kleechip .eampel{display:none}
#feld .feld.zone.eng .kleechip .ctext{-webkit-line-clamp:3}
/* Das Schildchen im Kleeblatt. Es traegt die Kurzform, die Marke der
   Situation und dieselbe Ampel wie die Karte links. */
.kleechip{display:inline-flex;align-items:center;gap:4px;max-width:100%;
   font-size:clamp(9.5px, calc(var(--kb) * .058), 12.5px);line-height:1.15;
   padding:2px 6px;border-radius:8px;background:var(--karte);
   border:1.5px solid var(--linie);box-shadow:0 1px 3px rgba(45,41,36,.16);
   cursor:default;box-sizing:border-box;text-align:left}
.kleechip .cmarke{font-weight:700;flex:0 0 auto;font-size:.88em;
   padding:0 3px;border-radius:5px}
.kleechip.wdhA .cmarke{background:#f4e3cf;color:#8a5a12}
.kleechip.wdhB .cmarke{background:#dfe9f4;color:#3c5f86}
.kleechip.skript .cmarke{background:#ebe9e4;color:#6b655c}
.kleechip .ctext{overflow:hidden;min-width:0;
   display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.kleechip .eampel i{width:7px;height:7px;border-width:1.5px}
.kleechip.ok{border-color:#2f7a3d;box-shadow:0 0 0 1.5px rgba(47,122,61,.3)}
.kleechip.falsch{border-color:#a33;box-shadow:0 0 0 1.5px rgba(170,51,51,.3)}
.kleechip.hervor{outline:2px solid var(--akzent);outline-offset:1px}
/* Mehr Schildchen als Platz: Der Rest wird gezaehlt, statt aus dem
   Kreis zu quellen. Draufzeigen nennt sie. */
.kleerest{font-size:11px;color:var(--matt);font-style:italic;cursor:default}
/* Hervorheben: Was in der gewaehlten Menge liegt, bleibt; der Rest
   tritt zurueck. Je ein Waehler auf EINER Zeile - ein Umbruch mitten
   in einem Waehler waere ein Nachfahren-Zeichen und traefe nichts
   (gemessen am 2026-09-22). */
#feld.hervor-rf .feld.zone:not([data-ort="rf"]):not([data-ort="rf-aus"]):not([data-ort="rf-kat"]):not([data-ort="rf-aus-kat"]),
#feld.hervor-aus .feld.zone:not([data-ort="aus"]):not([data-ort="rf-aus"]):not([data-ort="aus-kat"]):not([data-ort="rf-aus-kat"]),
#feld.hervor-kat .feld.zone:not([data-ort="kat"]):not([data-ort="rf-kat"]):not([data-ort="aus-kat"]):not([data-ort="rf-aus-kat"]){opacity:.22}
#feld.hervor-rf .vform:not(.rf),
#feld.hervor-aus .vform:not(.aus),
#feld.hervor-kat .vform:not(.kat){opacity:.22}
/* Der Kasten mit dem Kreisnamen. Handschrift, weil er eine
   Ueberschrift ist und keine Beschriftung - und weil die
   Studierenden ihn selbst geschrieben haben. */
.kreisname{position:absolute;z-index:3;pointer-events:none;
   font-family:var(--hand);font-size:16px;line-height:1.25;text-align:center;
   padding:3px 8px;border-radius:9px;background:var(--karte);
   border:1.5px solid;box-shadow:0 1px 3px rgba(45,41,36,.14);
   box-sizing:border-box}
.kreisname.rf{color:#41663a;border-color:#7FB069}
.kreisname.aus{color:#2f5580;border-color:#6C9BD1}
.kreisname.kat{color:#7a4b70;border-color:#C99BC0}
.kreisname.ohne{color:var(--matt);border-color:var(--linie);
   border-style:dashed;background:transparent;box-shadow:none}
.kreisname.keiner{color:var(--matt);border-color:#bdb7ac;font-size:15px}
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
  /* GEAENDERT (2026-09-22, Rikes Befund): Hier stand 3 - unter der
     klebenden ersten Spalte (4). Das war richtig gegen das Wandern
     beim Rollen, aber falsch fuer die erste Kartenspalte: Dort waechst
     die Karte beim Zeigen unter den Zeilenkopf, und man kommt an ihr
     Omega nicht mehr heran.

     «Fuer den Fall des Aufploppens sollte sie vorne dran liegen, damit
     ich das dann sehen kann.»

     Jetzt 20, also DARUEBER. Das geht nur, weil die Hebung beim
     Weggehen wieder faellt (Zeile darunter) - ohne das waere es
     genau der Fehler von gestern. Eine einzige gehobene Karte stoert
     das Rollen nicht; neun gehobene taten es. */
  el.addEventListener('pointerenter', () => { el.style.zIndex = 20; });
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

  /* UEBERHOLT (2026-09-22): Hier wurden zwei unsichtbare Haelften auf
     die Karte gelegt, die beim Zeigen auf eine Marke aufleuchteten -
     mein dritter Versuch, die Zugehoerigkeit des Omegas zur Vorschrift
     zu zeigen.

     Rike: «Diesen Rahmen, der ueber die Haelfte der Karte geht, finde
     ich seltsam und irritierend - er rutscht in den Zaehler der
     Rechnung hinein. Ich verstehe gar nicht, warum es diesen Rahmen
     ueberhaupt braucht. Wenn ich ueber das Omega fahre, sollte einfach
     dieses Pop-up kommen.»

     Sie hat recht, und der Grund ist, dass die eigentliche Frage
     inzwischen anders geloest ist: Das Omega STEHT neben seiner Zeile,
     seit das Kartenbild ihm den Einzug freilaesst. Damit ist die
     Zugehoerigkeit gezeigt, und der Rahmen sagt dasselbe ein zweites
     Mal - nur an der falschen Stelle, weil die Haelfte bei 54 Prozent
     mitten durch die Rechnung laeuft.

     Entfernt statt totgelegt; die Fassung steht in Git. */
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
  if (l.spalte > 1) urteilsknoepfe(el, l);
  return el;
}

/* Das Urteil auf der Karte - ZWEI BESCHRIFTETE KNOEPFE.

   UEBERHOLT (2026-09-22, Rikes Befund): Hier stand EIN kleines Zeichen
   in der Ecke, das durchschaltete: leer, dann Haken, dann Kreuz. Es
   war platzsparend und hat sich seit dem 22.08. bewaehrt - aber nur
   bei Leuten, die wussten, dass es das gibt.

   Rike: «Dieser Kreis, wo man ein Haekchen oder ein Kreuz einfuegt,
   ist nicht sehr intuitiv. Jemand, der nicht weiss, wie es gebaut
   ist, findet nicht raus, dass er dort draufklicken muss.»

   Das ist derselbe Befund wie am 2026-08-22, nur andersherum. Damals
   hiess er «da gibt's zwar diese Buttons, aber die tun nichts» - die
   beschrifteten Knoepfe deckten die Karte zu, und man sah nicht,
   worueber man urteilt. Die Antwort damals war, sie zu einem Zeichen
   zu schrumpfen. Jetzt ist die Karte 186 statt 132 Punkte breit und
   hat unten einen eigenen Streifen: Beschriftete Knoepfe passen
   hinein, ohne etwas zuzudecken. Die Loesung von damals war fuer die
   Karte von damals richtig.

   Zwei Knoepfe statt eines Durchschalters, weil ein Durchschalter
   seinen naechsten Zustand nicht zeigt: «stimmt» und «stimmt nicht»
   sagen, was passiert, bevor man drueckt. Wer den aktiven Knopf noch
   einmal drueckt, nimmt sein Urteil zurueck. */
function urteilsknoepfe(el, l){
  const leiste = document.createElement('div');
  leiste.className = 'urteilleiste';
  const knoepfe = {};
  const zeichnen = () => {
    const u = stand.urteil[l.id];
    Object.entries(knoepfe).forEach(([wert, k]) =>
      k.classList.toggle('an', u === wert));
    el.classList.toggle('traegtnicht', u === 'nein');
  };
  /* Bei kleiner Karte nur die Zeichen. Die beiden beschrifteten
     Knoepfe brauchen rund 150 Punkte; der Regler geht bis auf 96
     hinunter, und dann liefen sie aus der Karte - sichtbar erst, wenn
     jemand den Regler benutzt, also vermutlich vor Publikum.

     Die Beschriftung ist der Grund, warum es die Knoepfe gibt (Rike:
     «findet nicht raus, dass er dort draufklicken muss»). Sie faellt
     deshalb erst, wenn sie nicht mehr passt, und der Titel traegt sie
     weiter. */
  /* Die Beschriftung faellt erst, wenn sie WIRKLICH nicht mehr passt.

     Sie ist der Grund, warum es die Knoepfe ueberhaupt gibt (Rike,
     2026-09-21: «findet nicht raus, dass er dort draufklicken muss»).
     Sie zu kuerzen ist deshalb ein Verlust, kein Gestaltungsmittel.

     FEHLERBEHOBEN (2026-09-22, Rikes Befund «es ueberlappt in
     bestimmten Groessen mit dem Fragezeichen»): Hier stand eine feste
     Schwelle, `kb < 160`. Sie war schlicht zu tief. Gemessen ueber den
     ganzen Regler: Die beschriftete Leiste ist 144 Punkte breit, das
     Fragezeichen belegt rechts weitere 22, dazu 6 Punkte Einzug -
     unter rund 176 Punkten Kartenbreite geht das nicht auf. Zwischen
     160 und 176 schaltete die Leiste also schon auf Text um und
     schob sich dann unter das Fragezeichen: bei 162 Punkten um 13
     Punkte, gemessen.

     Die Schwelle ist jetzt nicht mehr geraten, sondern GEMESSEN -
     siehe urteilBreitePruefen(), das nach dem Aufbau nachsieht, ob
     Leiste und Fragezeichen einander beruehren. Eine Zahl, die man
     hinschreibt, geht beim naechsten Schriftgrad wieder daneben, und
     zwar still. */
  const kb = parseFloat(getComputedStyle(document.documentElement)
              .getPropertyValue('--kb'));
  const kurz = kb < 176;
  if (kurz) leiste.classList.add('kurz');
  [['ja', '✓ stimmt', '✓'], ['nein', '✗ stimmt nicht', '✗']]
      .forEach(([wert, text, zeichen]) => {
    const k = document.createElement('button');
    k.className = 'urteilknopf ' + wert;
    k.textContent = kurz ? zeichen : text;
    k.title = text;
    k.onclick = ev => {
      ev.stopPropagation();
      stand.urteil[l.id] = (stand.urteil[l.id] === wert) ? null : wert;
      zeichnen(); merken();
    };
    k.addEventListener('pointerdown', ev => ev.stopPropagation());
    knoepfe[wert] = k;
    leiste.appendChild(k);
  });
  el.appendChild(leiste);
  zeichnen();
}

/* Beruehren sich Leiste und Fragezeichen? Dann faellt die
   Beschriftung - aber erst dann.

   Das laeuft NACH dem Aufbau, weil vorher nichts gemessen werden kann:
   Breiten gibt es erst, wenn die Karte in der Tabelle steht. Die
   Schwelle oben ist der Vorgriff, damit es nicht flackert; diese
   Pruefung ist das letzte Wort.

   Sie faengt genau die Faelle, die eine hingeschriebene Zahl nicht
   faengt: einen anderen Schriftgrad, einen laengeren Knopftext, eine
   andere Schrift auf einem anderen Rechner. */
function urteilBreitePruefen(){
  document.querySelectorAll('.tabzelle .k').forEach(k => {
    const leiste = k.querySelector('.urteilleiste');
    const frage = k.querySelector('.marke.denkweg');
    if (!leiste || !frage) return;
    if (leiste.classList.contains('kurz')) return;
    const l = leiste.getBoundingClientRect(), f = frage.getBoundingClientRect();
    if (f.left - l.right >= 4) return;
    leiste.classList.add('kurz');
    leiste.querySelectorAll('.urteilknopf').forEach(b => {
      b.textContent = b.classList.contains('ja') ? '✓' : '✗';
    });
  });
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
  // Jetzt steht die Tabelle, jetzt laesst sich messen.
  urteilBreitePruefen();
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
/* DAS KLEEBLATT - wieder aus drei KREISEN.

   Der Weg hierher, weil er die Form erklaert:

   Zuerst drei Kreise. Rike: «Die Boxen sind zu klein.» Stimmte, und
   der Grund ist geometrisch: Ein Lappen zwischen drei gleich grossen
   Kreisen ist eine SICHEL, und in eine Sichel passt keine lesbare
   KARTE. Dann drei Rechtecke - die Bereiche gross genug, die Form
   weg. Dann drei gleich grosse ueberlappende Formen mit runden Ecken -
   die Form wieder da, die Bereiche knapp, die Karten gestapelt.

   Dreimal dasselbe Problem, und es lag nie an der Figur: Eine Karte,
   die man lesen koennen muss, ist rund 150 Punkte breit, und so viel
   gibt kein Schnittbereich zwischen drei Formen her.

   Rikes Entscheidung vom 2026-09-22 nimmt das Problem weg, statt es
   zu verschieben: Die KARTE bleibt links in der Liste, ins Kleeblatt
   kommt nur ihre KURZFORM - ein Schildchen mit zwei Woertern. Damit
   duerfen die Kreise wieder Kreise sein. */
const KLEE = {
  breite: 740, hoehe: 620, r: 195,
  formen: {
    rf:  {cx: 275, cy: 230},
    aus: {cx: 465, cy: 230},
    kat: {cx: 370, cy: 390},
  },
  felder: [
    {id:'rf',         in:['rf']},
    {id:'aus',        in:['aus']},
    {id:'kat',        in:['kat']},
    {id:'rf-aus',     in:['rf','aus']},
    {id:'rf-kat',     in:['rf','kat']},
    {id:'aus-kat',    in:['aus','kat']},
    {id:'rf-aus-kat', in:['rf','aus','kat']},
    {id:'keine',      in:[]},
  ],
};

/* Das groesste achsenparallele Rechteck in jedem Bereich.

   Gerastert, dann je Bereich «groesstes Rechteck im Histogramm»,
   Zeile fuer Zeile. Laeuft nur beim Aufbau. Gerechnet und nicht
   hingeschrieben: Wer die drei Kreise verschiebt oder ihren Radius
   aendert, bekommt die neuen Felder von selbst.

   «keine» ist der Bereich AUSSERHALB aller drei; dort wird die untere
   linke Ecke genommen, weil dort Platz ist. */
let _kaesten = null;
function lappenKaesten(){
  if (_kaesten) return _kaesten;
  const NX = 148, NY = 124;
  const sx = KLEE.breite / NX, sy = KLEE.hoehe / NY;
  const rr = KLEE.r * KLEE.r;
  const drin = (x, y, k) => {
    const f = KLEE.formen[k];
    return (x - f.cx) * (x - f.cx) + (y - f.cy) * (y - f.cy) < rr;
  };
  const lage = [];
  for (let j = 0; j < NY; j++){
    const zeile = [], y = (j + 0.5) * sy;
    for (let i = 0; i < NX; i++){
      const x = (i + 0.5) * sx;
      zeile.push(['rf', 'aus', 'kat'].filter(k => drin(x, y, k)).join('-'));
    }
    lage.push(zeile);
  }
  _kaesten = {};
  KLEE.felder.forEach(f => {
    const soll = f.in.join('-');
    const erlaubt = (i, j) => lage[j][i] === soll
      && (f.in.length || (i < NX * 0.26 && j > NY * 0.70));
    const hoehen = new Array(NX).fill(0);
    let best = {flaeche: 0};
    for (let j = 0; j < NY; j++){
      for (let i = 0; i < NX; i++)
        hoehen[i] = erlaubt(i, j) ? hoehen[i] + 1 : 0;
      const stapel = [];
      for (let i = 0; i <= NX; i++){
        const h = i === NX ? 0 : hoehen[i];
        let start = i;
        while (stapel.length && stapel[stapel.length - 1].h >= h){
          const o = stapel.pop();
          const fl = o.h * (i - o.i) * sx * sy;
          if (fl > best.flaeche)
            best = {flaeche: fl, i: o.i, breite: i - o.i, hoehe: o.h, j};
          start = o.i;
        }
        stapel.push({i: start, h});
      }
    }
    _kaesten[f.id] = best.flaeche
      ? [best.i * sx + 3, (best.j - best.hoehe + 1) * sy + 3,
         best.breite * sx - 6, best.hoehe * sy - 6]
      : [0, 0, 0, 0];
  });
  return _kaesten;
}

/* Was WAERE richtig? Aus D.kleeblatt — gerechnet, nicht behauptet.

   Frueher stand hier nur der Ort (`rf-kat`). Seit die Studierenden
   DREI Entscheidungen faellen statt einer, braucht es die drei
   Wahrheitswerte einzeln: Nur so kann das Pruefen sagen, WELCHES
   Kriterium danebenlag, statt bloss «falscher Lappen». */
const SOLLWAHL = {};
D.kleeblatt.forEach(z => {
  SOLLWAHL[z.id] = {rf: z.gehoert.indexOf('rf')  >= 0,
                    aus: z.gehoert.indexOf('aus') >= 0,
                    kat: z.gehoert.indexOf('kat') >= 0};
});

/* Wo landet eine Karte mit dieser Wahl? `null`, solange nicht alle
   drei Fragen beantwortet sind - dann bleibt sie links liegen und
   taucht im Kleeblatt gar nicht auf. Das ist Absicht: Ein halb
   einsortiertes Schildchen wuerde eine Aussage machen, die noch
   niemand getroffen hat. */
function vennOrt(w){
  if (!w) return null;
  const drin = [];
  for (const k of ['rf', 'aus', 'kat']){
    if (w[k] === undefined || w[k] === null) return null;
    if (w[k]) drin.push(k);
  }
  return drin.length ? drin.join('-') : 'keine';
}

/* FEHLERBEHOBEN (2026-09-22, Rikes Befund «wenn ich auf Loesung gehe,
   wird nur die Eisdiele eingeblendet, alles andere nicht»):

   loesungAnwenden() ersetzt das genannte Standfeld VOLLSTAENDIG durch
   das, was hier steht. Lieferte die Funktion nur die Eisdiele, waren
   die Aufgaben aus dem Skript danach ohne Eintrag - die eigene Arbeit
   daran verschwand, sobald jemand die Loesung ansah.

   Fuer die Aufgaben aus dem Skript gibt es keine hinterlegte Loesung,
   das bleibt so. «Keine Loesung» heisst aber «unveraendert lassen»,
   nicht «wegnehmen». */
function _loesungStandE2(){
  const wahl = {};
  Object.keys(stand.wahl || {}).forEach(id => {
    wahl[id] = Object.assign({}, stand.wahl[id]);
  });
  Object.entries(SOLLWAHL).forEach(([id, w]) => {
    wahl[id] = Object.assign({}, w);
  });
  return {wahl};
}

/* Die drei Farbpunkte - gefuellt, blass oder leer.

   Rike, 2026-09-22: «Die Karten erhalten dann auch farbliche
   Markierungen nach der Entscheidung.» Dieselbe Ampel sitzt auf der
   Karte links und auf dem Schildchen im Kleeblatt; daran erkennt man
   drueben wieder, was man hier entschieden hat. */
function ampel(w){
  const s = document.createElement('span');
  s.className = 'eampel';
  ['rf', 'aus', 'kat'].forEach(k => {
    const i = document.createElement('i');
    const v = w ? w[k] : undefined;
    i.className = k + (v === true ? ' ja' : v === false ? ' nein' : '');
    // Die Punkte sind die Entscheidung. Im Bild zum Mitnehmen muessen
    // sie stehen, sonst nimmt man leere Karten mit.
    i.dataset.alsbildform = 'kreis';
    s.appendChild(i);
  });
  return s;
}

/* Wie heisst der Spezialfall? Die Studierenden haben ihn in Etappe 1
   selbst benannt; steht dort noch nichts, steht hier ein Platzhalter,
   der zurueckschickt. */
function wegname(weg){
  const eigen = (stand.texte['wegname' + weg] || '').trim();
  return {text: eigen || 'Spezialfall ' + (weg - 1), eigen: !!eigen};
}

/* DIE ENTSCHEIDKARTE - die Karte, die links liegen bleibt.

   Sie traegt oben ihre Kurzform (dasselbe Schild wie im Kleeblatt),
   darunter Wiederholungszeile und Ereignis in voller Groesse - und
   dann die drei Fragen, je eine pro Kreis, mit «ja» und «nein».

   Nochmal auf dieselbe Antwort tippen nimmt sie zurueck; so kommt man
   ohne Umweg wieder in den unentschiedenen Zustand. */
function entscheidkarte(p, setzen){
  const el = document.createElement('div');
  el.className = 'ekarte ' + p.herkunft + (p.marke ? ' wdh' + p.marke : '');
  el.dataset.id = p.id;
  /* ALLES, WAS DIE KARTE SAGT, GEHOERT INS BILD ZUM MITNEHMEN.

     Die Entscheidkarte ist kein `.k` - der Kern zeichnet sie also
     nicht von selbst. Ohne die Marken stuende im gesicherten Stand
     nur das Kleeblatt, und die neun Karten waeren eine leere Flaeche:
     die Figur ohne die Begruendungen, die zu ihr gefuehrt haben. */
  el.dataset.alsbildform = '';
  const kopf = document.createElement('div');
  kopf.className = 'ekopf';
  kopf.innerHTML =
      `<span class="kwdh${p.marke ? '' : ' skript'}" data-alsbild>${
        p.marke ? (p.marke === 'A' ? 'mit Wdh.' : 'ohne Wdh.') : 'Skript'}</span>`
    + `<span class="ekurz" data-alsbild>${p.kurz}</span>`;
  kopf.appendChild(ampel(stand.wahl[p.id]));
  el.appendChild(kopf);
  const h = document.createElement('div');
  h.className = 'eherkunft'; h.innerHTML = p.oben; h.dataset.alsbild = '';
  const e = document.createElement('div');
  e.className = 'eereignis'; e.innerHTML = p.text; e.dataset.alsbild = '';
  el.appendChild(h); el.appendChild(e);

  D.kreise.forEach(k => {
    const z = document.createElement('div');
    z.className = 'wahlzeile ' + k.id;
    z.dataset.menge = k.id;
    const n = wegname(k.weg);
    const name = document.createElement('span');
    name.className = 'wname' + (n.eigen ? '' : ' ohne');
    name.textContent = n.text;
    name.title = k.lang;
    name.dataset.alsbild = '';
    z.appendChild(name);
    [['ja', true], ['nein', false]].forEach(([wort, wert]) => {
      const b = document.createElement('button');
      b.className = 'jn ' + wort;
      b.textContent = wort;
      /* Beide Knoepfe ins Bild, als Kasten UND als Wort - so wie sie
         auf der Flaeche stehen. Nur den gewaehlten zu zeichnen waere
         kuerzer, aber sein Wort ist weiss auf weiss, solange der
         farbige Kasten darunter fehlt. */
      b.dataset.alsbildform = '';
      b.dataset.alsbild = '';
      b.onclick = () => setzen(p.id, k.id, wert);
      z.appendChild(b);
    });
    el.appendChild(z);
  });
  return el;
}

/* Das Schildchen im Kleeblatt. Eine Zeile, zwei Woerter, dieselbe
   Ampel. Draufzeigen hebt die zugehoerige Karte links hervor - das
   ist der Rueckweg von der Figur zur Situation. */
function kleeChip(p, hervorheben){
  const el = document.createElement('span');
  el.className = 'kleechip ' + (p.marke ? 'wdh' + p.marke : 'skript');
  el.dataset.id = p.id;
  const m = document.createElement('span');
  m.className = 'cmarke'; m.dataset.alsbild = '';
  m.textContent = p.marke || 'S';
  const t = document.createElement('span');
  t.className = 'ctext'; t.dataset.alsbild = '';
  t.textContent = p.kurz;
  el.appendChild(m); el.appendChild(t);
  el.appendChild(ampel(stand.wahl[p.id]));
  el.title = p.klartext;
  el.addEventListener('pointerenter', () => hervorheben(p.id, true));
  el.addEventListener('pointerleave', () => hervorheben(p.id, false));
  return el;
}

/* ───────── Etappe 2 · Einordnen ─────────

   UMGEBAUT am 2026-09-22 auf Rikes Entscheidung: Es wird nicht mehr
   gezogen, es wird entschieden. Siehe den Block ueber KLEE - dort
   steht, warum drei Anlaeufe mit gezogenen Karten an der Geometrie
   gescheitert sind und was der Tausch bringt.

   Was bleibt:

   «Ich haette gerne, dass sowohl die Situationen aus der Eisdiele als
   auch, wenn man moechte, die Situationen aus dem Skript gleichzeitig
   da liegen koennen. Und ich haette gerne, dass das farblich
   unterschieden ist.» (2026-09-21) - beide Sorten in EINER Liste,
   verschieden gefaerbt, die Aufgaben aus dem Skript mit ihrer Marke.

   «Vielleicht auch so, dass man alle einer Kategorie anzeigen lassen
   kann, um Gemeinsamkeiten zu suchen.» (2026-09-22) - der Klick auf
   einen Kreisnamen laesst nur stehen, was in dieser Menge liegt. */
function etappe2(){
  const a = D.etappen[1];
  if (stand.skriptDa === undefined) stand.skriptDa = false;
  if (!stand.wahl) stand.wahl = {};
  loesungAnwenden(_loesungStandE2);

  buehne({rolle:a.rolle, rang:a.rang,
    titel:'Etappe 2 · Einordnen',
    text:'Drei Erleichterungen, drei Kreise. Entscheiden Sie für jede '
       + 'Situation dreimal: Geht diese Erleichterung hier — ja oder nein? '
       + '<b>Mit Reihenfolge</b> geht immer, danach wird nicht gefragt. '
       + '<span class="zart">Sobald alle drei Antworten stehen, erscheint '
       + 'die Situation von selbst im Kleeblatt. Passt keine der drei, '
       + 'landet sie unten links. Und schauen Sie, welche Felder leer '
       + 'bleiben.'
       + (stand.skriptDa
          ? ' Die grauen Karten kommen aus dem Skript — dort hilft keine '
            + 'hinterlegte Lösung, nur Ihr eigenes Kriterium.'
          : '')
       + '</span>'},
    stand.skriptDa ? 'Eisdiele und Skript' : `Die ${D.zeilen.length} Situationen`,
    'Was ist hier erlaubt? ' + D.kreise.map(k =>
      `<span class="klegende ${k.id}" title="${k.lang}">${
        wegname(k.weg).text}</span>`).join(''),
    `<button class="knopf leer" id="zurueck" title="Alle Entscheidungen zurück">↺</button>
     <button class="knopf" id="pruefen">Prüfen</button>
     ${stand.skriptDa
       ? '<span class="befund zart">Die Aufgaben aus dem Skript liegen dabei.</span>'
       : '<button class="knopf leer" id="mehr">Aufgaben aus dem Skript dazulegen</button>'}
     <span class="befund" id="befund"></span>
     <span class="befund zart" style="margin-left:auto">Die Lösung gilt nur
       für die Eisdiele — für die Aufgaben aus dem Skript gibt es keine.</span>`,
    praemissen(), null,
    /* Das Kleeblatt bekommt gut zwei Drittel. Links stehen Karten mit
       drei Knopfpaaren; schmaler als rund 320 Punkte bricht der Name
       des Spezialfalls um. */
    [1.0, 2.05]);

  const tisch = document.getElementById('tisch');
  const feld = document.getElementById('feld');

  const posten = D.zeilen.map(z => ({
    id: z.id, herkunft: 'auseisdiele', marke: z.sit,
    oben: z.lage, text: z.text, kurz: z.kurz,
    klartext: z.text.replace(/<[^>]*>/g, ''),
  }));
  if (stand.skriptDa) D.transfer.forEach(t => posten.push({
    id: t.id, herkunft: 'ausskript', marke: null,
    oben: '<b>' + t.marke + '</b>', text: t.text, kurz: t.kurz,
    klartext: t.text.replace(/<[^>]*>/g, ''),
  }));
  const nachId = {};
  posten.forEach(p => { nachId[p.id] = p; });

  // --- links: die Liste ---
  const liste = document.createElement('div');
  liste.className = 'eliste';
  const karten = {};
  posten.forEach(p => {
    karten[p.id] = entscheidkarte(p, wahlSetzen);
    liste.appendChild(karten[p.id]);
  });
  tisch.appendChild(liste);

  function karteAuffrischen(id){
    const el = karten[id]; if (!el) return;
    const w = stand.wahl[id] || {};
    el.querySelector('.eampel').replaceWith(ampel(w));
    el.querySelectorAll('.wahlzeile').forEach(z => {
      const v = w[z.dataset.menge];
      z.classList.remove('ok', 'falsch');
      z.querySelector('.jn.ja').classList.toggle('an', v === true);
      z.querySelector('.jn.nein').classList.toggle('an', v === false);
    });
    el.classList.toggle('fertig', !!vennOrt(w));
  }
  posten.forEach(p => karteAuffrischen(p.id));

  function wahlSetzen(id, menge, wert){
    const w = stand.wahl[id] || (stand.wahl[id] = {});
    // Nochmal auf dieselbe Antwort: zurueck in den offenen Zustand.
    w[menge] = (w[menge] === wert) ? null : wert;
    sichern();
    karteAuffrischen(id);
    chipsZeichnen();
    document.getElementById('befund').textContent = '';
  }

  // --- rechts: die Figur ---
  function zonen(){
    feld.querySelectorAll('.feld,.vform,.kreisname').forEach(d => d.remove());
    const kaesten = lappenKaesten();
    const bb = (feld.clientWidth || 520) - 12;
    const platz = (feld.parentElement.clientHeight || 420) - 46;
    const kb = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--kb'));
    /* Der Massstab: so gross wie moeglich, aber ganz sichtbar - bei
       einem Venn steckt die Aussage in den Lagen ZUEINANDER, ein
       halbes nuetzt nichts. Der Regler hebt die Untergrenze, damit er
       spuerbar bleibt (Rike: «der Zoom macht nur die Kaertchen
       groesser, nicht das Venndiagramm»). */
    const f = Math.min(bb / KLEE.breite, platz / KLEE.hoehe)
            * Math.min(1.3, Math.max(0.8, kb / 186));
    const rand = Math.max(0, (bb - KLEE.breite * f) / 2) + 6;
    const px = (v) => rand + v * f;
    const py = (v) => 6 + v * f;

    Object.entries(KLEE.formen).forEach(([id, o]) => {
      const d = document.createElement('div');
      d.className = 'vform ' + id;
      // Damit der Kreis auch im Bild zum Mitnehmen steht - sonst
      // schweben dort nur die Schildchen, und die Lage zueinander,
      // also die ganze Aussage, ist weg.
      d.dataset.alsbildform = 'kreis';
      d.style.left = px(o.cx - KLEE.r) + 'px';
      d.style.top = py(o.cy - KLEE.r) + 'px';
      d.style.width = d.style.height = (2 * KLEE.r * f) + 'px';
      feld.appendChild(d);
    });

    KLEE.felder.forEach(z => {
      const [x, y, w, h] = kaesten[z.id];
      const d = document.createElement('div');
      d.className = 'feld zone' + (z.in.length ? '' : ' aussen');
      d.dataset.ort = z.id;
      // Auf der Flaeche hat der Bereich keinen Rahmen; im Bild soll er
      // auch keinen bekommen. Acht gestrichelte Kaesten quer durch die
      // Kreise machten die Figur unlesbar.
      d.dataset.ohnerahmen = '';
      d.style.left = px(x) + 'px'; d.style.top = py(y) + 'px';
      d.style.width = (w * f) + 'px'; d.style.height = (h * f) + 'px';
      feld.appendChild(d);
    });

    const setzen = (id, x, y, breite, text, eigen, klickbar) => {
      const d = document.createElement('div');
      d.className = 'kreisname ' + id + (eigen ? '' : ' ohne');
      d.dataset.alsbild = '';
      d.textContent = text;
      d.style.left = x + 'px'; d.style.top = y + 'px';
      d.style.maxWidth = breite + 'px';
      if (klickbar){
        d.style.pointerEvents = 'auto'; d.style.cursor = 'pointer';
        d.title = 'Anklicken: nur zeigen, was in dieser Menge liegt';
        d.onclick = () => {
          stand.hervor = stand.hervor === id ? null : id;
          sichern();
          ['rf', 'aus', 'kat'].forEach(m =>
            feld.classList.toggle('hervor-' + m, stand.hervor === m));
        };
      }
      feld.appendChild(d);
    };
    /* Die beiden oberen Kreise stehen nur 190 Punkte auseinander, ihre
       Namen sind aber laenger als das. Mittig gesetzt schoben sie sich
       uebereinander (gesehen am 2026-09-22). Der linke haengt deshalb
       an der linken AUSSENKANTE seines Kreises, der rechte an der
       rechten - so laufen sie nach aussen auseinander statt
       gegeneinander. */
    const NAMENSBREITE = KLEE.r * 1.1;
    D.kreise.forEach(k => {
      const o = KLEE.formen[k.id];
      const n = wegname(k.weg);
      // Oben aussen bei den beiden oberen, unten aussen bei der unteren.
      const y = k.id === 'kat' ? py(o.cy + KLEE.r) - 14 : py(o.cy - KLEE.r) - 16;
      const x = k.id === 'rf'  ? o.cx - KLEE.r
              : k.id === 'aus' ? o.cx + KLEE.r - NAMENSBREITE
                               : o.cx - NAMENSBREITE / 2;
      setzen(k.id, px(x), y, NAMENSBREITE * f, n.text, n.eigen, true);
    });
    const kn = kaesten.keine;
    setzen('keiner', px(kn[0]), py(kn[1]) - 26, kn[2] * f,
           'keiner der drei', true, false);

    feld.style.minHeight = (KLEE.hoehe * f + 40) + 'px';
    ['rf', 'aus', 'kat'].forEach(id =>
      feld.classList.toggle('hervor-' + id, stand.hervor === id));
    chipsZeichnen();
  }

  function hervorheben(id, an){
    const k = karten[id];
    if (k) k.classList.toggle('hervor', an);
    if (an && k) k.scrollIntoView({block:'nearest', behavior:'smooth'});
  }

  function chipsZeichnen(){
    feld.querySelectorAll('.kleechip,.kleerest').forEach(c => c.remove());
    const sammeln = {};
    posten.forEach(p => {
      const ort = vennOrt(stand.wahl[p.id]);
      if (!ort) return;
      (sammeln[ort] || (sammeln[ort] = [])).push(p);
    });
    Object.entries(sammeln).forEach(([ort, liste]) => {
      const d = feld.querySelector(`.feld.zone[data-ort="${ort}"]`);
      if (!d) return;
      /* Mehr Schildchen als Platz: Der Rest wird GEZAEHLT, statt aus
         dem Kreis zu quellen. Ein Schildchen, das ueber die Linie
         ragt, laege sichtbar in zwei Mengen zugleich - und das ist
         genau die Aussage, die hier niemand machen soll. */
      const hoch = d.clientHeight || 60;
      d.classList.toggle('eng', d.clientWidth < 112);
      const passt = Math.max(1, Math.floor((hoch + 3) / 27));
      liste.slice(0, passt).forEach(p =>
        d.appendChild(kleeChip(p, hervorheben)));
      if (liste.length > passt){
        const r = document.createElement('span');
        r.className = 'kleerest';
        r.textContent = '+ ' + (liste.length - passt) + ' weitere';
        r.title = liste.slice(passt).map(p => p.kurz).join(', ');
        d.appendChild(r);
      }
    });
  }

  window._neuzeichnen = zonen;
  zonen();

  const befund = document.getElementById('befund');
  document.getElementById('pruefen').onclick = () => {
    feld.querySelectorAll('.kleechip').forEach(c =>
      c.classList.remove('ok', 'falsch'));
    let gut = 0, schief = 0, offen = 0, einzeln = 0;
    // NUR die Eisdiele. Fuer die Aufgaben aus dem Skript gibt es keine
    // hinterlegte Loesung - sie kommen aus einer anderen Situation und
    // werden am eigenen Kriterium geprueft, nicht an einer Tabelle.
    D.zeilen.forEach(z => {
      const w = stand.wahl[z.id] || {}, soll = SOLLWAHL[z.id];
      const el = karten[z.id];
      let ganz = true;
      el.querySelectorAll('.wahlzeile').forEach(zl => {
        const m = zl.dataset.menge, v = w[m];
        zl.classList.remove('ok', 'falsch');
        if (v === undefined || v === null){ ganz = false; return; }
        if (v === soll[m]){ zl.classList.add('ok'); einzeln++; }
        else { zl.classList.add('falsch'); ganz = false; }
      });
      if (!vennOrt(w)){ offen++; return; }
      const chip = feld.querySelector(`.kleechip[data-id="${z.id}"]`);
      if (ganz){ gut++; if (chip) chip.classList.add('ok'); }
      else { schief++; if (chip) chip.classList.add('falsch'); }
    });
    const satz = [];
    if (offen) satz.push(`${offen} aus der Eisdiele sind noch nicht fertig `
      + 'entschieden.');
    satz.push(`${gut} von ${D.zeilen.length} Situationen ganz richtig`
      + (schief ? `, ${schief} nicht.` : '.')
      + ` ${einzeln} von ${D.zeilen.length * 3} Einzelentscheidungen stimmen.`);
    if (stand.skriptDa) satz.push('Die Aufgaben aus dem Skript sind nicht '
      + 'mitgeprüft — dafür gibt es keine hinterlegte Lösung.');
    if (!offen && !schief) satz.push('Und jetzt: Welche Felder sind leer '
      + 'geblieben — und warum können sie gar nicht anders?');
    befund.textContent = satz.join(' ');
  };

  /* FEHLERBEHOBEN (2026-09-22, Rikes Befund «der Zurueckknopf bewirkt
     beim Venn-Diagramm gar nichts»): Hier stand `merken(); etappe2();`.
     merken() baut den Kartenstand AUS DEM DOM neu auf - und im DOM lag
     in diesem Moment noch alles da, wo es war. Das Loeschen wurde also
     sofort rueckgaengig gemacht, und zwar von der Zeile danach.

     Der Stand von Etappe 2 haengt seit dem Umbau gar nicht mehr an den
     Karten im DOM, sondern an stand.wahl - die Falle ist damit weg.
     Der Hinweis bleibt: Wer stand.* aendert, ruft davor nicht
     merken(). */
  document.getElementById('zurueck').onclick = () => {
    posten.forEach(p => { delete stand.wahl[p.id]; });
    sichern();
    etappe2();
  };
  const mehr = document.getElementById('mehr');
  if (mehr) mehr.onclick = () => { stand.skriptDa = true; sichern(); etappe2(); };

  /* NUR loesungsKnopf(). FEHLERBEHOBEN (2026-09-21, im Bild gesehen):
     Hier stand zusaetzlich loesungsHinweis() - und beide haengen einen
     eigenen Umschaltknopf an die Leiste. In der Leiste standen zwei
     Knoepfe «Lösung verbergen» nebeneinander, die Verschiedenes taten.
     Was loesungsHinweis() sagen sollte, steht jetzt als Satz daneben:
     Es ist eine Einschraenkung, kein zweiter Schalter. */
  loesungsKnopf(() => etappe2());
}

ETAPPEN.push(etappe1, etappe2);
