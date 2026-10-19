/* Die Etappen von Kapitel 5 — «Der Doppelbaum».

   Stand: FASSUNG 3.1 (thema.md, Rikes acht Punkte zu Fassung 3,
   2026-09-27). Gegenueber Fassung 3:
     - Jedes Feld in Raute und Tafel ist DIREKT beschreibbar, mit einer
       Zahl oder einer Rechnung («100 - 70», «70 % · 85 %», «8 : 44»).
       Das Feld zeigt das Ergebnis.
     - Jeder Eintrag geht in ein nummeriertes RECHENPROTOKOLL; eine blosse
       Zahl traegt den Vermerk «ohne Rechnung». Die Rechnung laesst sich
       nachtragen (dasselbe Feld noch einmal beschreiben).
     - Die Pflichtwahl «Ziel, Regel, Ausgangsstellen» ist weg. Geprueft
       wird nur der WERT (generisch, mit Rundungstoleranz); die Rechnung
       wird ausgewertet und protokolliert, nicht auf ihre Form geprueft.
     - Der Baum ist von beiden Seiten ein klassisches Baumdiagramm mit
       Blattknoten; die Schnittfelder stehen zwischen den Blattspalten.
     - Die bedingten Wahrscheinlichkeiten stehen AUSSERHALB der Tafel:
       zwei Zusatzspalten «Anteil in der Zeile», zwei Zusatzzeilen
       «Anteil in der Spalte».
     - Farben erst im Zug «Gleiches finden», mit einer Legende, die sich
       fuellt.

   Nachgezogen am 2026-10-10 nach FASSUNG 3.2 (thema.md):
     - keine Meta-Bemerkungen (Herkunft, «A2», «Kaspers Sicht») im Text
       fuer Studierende; Skriptaufgaben heissen «Aufgabe 5.4 · Titel»
     - je Zug ein Satz fuer das Ziel und hoechstens drei kurze Schritte
     - im Feld gross das Ergebnis, klein darunter die getippte Rechnung;
       Rechenprotokoll einklappbar, standardmaessig zu
     - oben Situation und Auftrag (#bwkopf), darunter Baum und Tafel
       nebeneinander; Zug- und Aufgabenwahl in der Auftragsleiste

   Nachgezogen am 2026-10-10 nach FASSUNG 3.3 (thema.md):
     - Etappe 1 hat ZWEI Situationen, Wahl in der Auftragsleiste. S2
       «Wuerfel» (Angaben aus Tafelsicht, abgezaehlt, Brueche) wird wie S1
       vollstaendig gefuellt, ohne Paaren (die Farben aus S1 bleiben).
       Danach die Frage «Wo ging es schnell ...», «Haengen A und B
       zusammen?» und der Knopf «Eine moegliche Sicht».
     - Etappe 2: vier Pflichtaufgaben, zwei freiwillige (sichtbar so
       markiert); ein Schritt nach dem anderen: Angaben eintragen («?»
       versteckt), Gesuchtes markieren (genau ein «?»), bis zum «?»
       rechnen; danach werden die nicht gebrauchten Felder blass. Beim
       Jugendtreffen leuchtet EINMAL die jeweils naechste Stelle auf.

   Nachgezogen am 2026-10-10 nach FASSUNG 3.4 (thema.md):
     - Wahrscheinlichkeiten als Dezimalzahl (0.7 · 0.85 = 0.595), an EINER
       Stelle geschaltet (thema.ANZEIGE -> BW.anzeige); Eingaben in %
       werden weiter angenommen. Brueche bleiben Brueche.
     - Pfeile nur im Moment des Rechnens (pfeilZeigen): etwa 2 s, dann
       blenden sie aus. Ein Klick auf eine Protokollzeile zeigt ihren Pfeil
       wieder. Karten (Etappe 3) und Bilder zum Mitnehmen behalten die
       ganze Pfeilkette.
     - Rechnen durch Klicken (E.rechnen): leeres Feld anklicken (Ziel),
       Ausgangswerte anklicken (leuchten auf), Rechenart am Ziel waehlen.
       (Seit dem Nachtrag 2026-10-10 in Lesereihenfolge, siehe oben.)
       Die Flaeche schreibt die Rechnung ins Feld; geprueft wird wie bisher
       nur der Wert. Tippen bleibt moeglich.
     - S1, Zug 3 (seit dem Nachtrag Zug 2) «Finde den Wert» statt «Gleiches finden»: eine Frage in
       Worten, die Stelle im Baum UND in der Tafel anklicken; stimmen beide,
       faerben sich beide. Nach der letzten Frage ist alles gefaerbt.
     - Etappe 2: rechnen im Baum ODER in der Tafel; das gefuehrte Beispiel
       folgt der Darstellung, in der zuletzt eingetragen wurde.

   NEU (Nachtrag 2026-10-10, Rike): Rechnen wie am Taschenrechner, in
   Lesereihenfolge. Zweistellig: Ziel, Feld 1, Rechenart (× ÷ + −), Feld 2
   - dann steht das Ergebnis da. «1 −»: Ziel, «1 −», Feld. Die Rechenleiste
   steht dauernd ueber dem Brett (nicht erst nach zwei Klicks) und zeigt
   die Rechnung, waehrend sie entsteht («0.7 · …»). Tippen bleibt.
   NEU (Nachtrag 2026-10-10, Rike): «Finde den Wert» fragt alle 16 Werte
   (ohne Wurzel), gemischt; die Saat steht im Stand.
   NEU (Nachtrag 2026-10-10, Rike): Der Zug «Angaben markieren» entfaellt.
   S1 hat zwei Zuege; «Finde den Wert» ist jetzt Zug 2 und oeffnet sich,
   sobald Baum und Tafel vollstaendig sind. Alte Staende mit dem
   Markier-Schritt werden beim Laden umgeschrieben (e1stand), ihre
   Markierungen verworfen.

   NEU (FASSUNG 3.5, thema.md, 2026-10-10): Bezeichnungen entstehen lassen,
   oben weniger.
     - Die Felder tragen zuerst KEINE P-Bezeichnung; im Baum stehen nur die
       Knoten und «gesamt», in der Tafel nur die Koepfe und «Anteil in der
       Zeile / Spalte». In «Finde den Wert» erscheint mit jedem Treffer die
       Bezeichnung an beiden Orten (Tafel-Anteile: «= P_Ü(B)»). Wann was
       sichtbar ist, regelt namenAn().
     - Die Anleitung klappt nach dem ersten Eintrag auf eine Zeile zusammen
       (aufklappbar). Die Rechenleiste ist schmal und erscheint erst mit
       dem ersten leeren Ziel; danach bleibt sie.
     - Zug 2: die Frage als Karte direkt ueber dem Brett, daneben nur der
       Zaehler; keine Kategorienamen; Legende nur mit Farben, erst am
       Ende; kein Rechenprotokoll.

   NEU (Nachtrag 2026-10-10, Rike, Etappe 2):
     - Der Hinweis des gefuehrten Beispiels ueberdeckt nie ein Feld. Er
       steht in einer eigenen Leiste UEBER dem Brett (im Fluss, nicht
       schwebend), mit Pfeil und Ort («im Baum» / «in der Tafel»); auf das
       Feld zeigt der Leuchtrand (.zeig). Jede Hinweisblase hat
       pointer-events: none.
     - Keine Farben in Etappe 2 (ctx.farblos, o.farblos): Felder, Kanten
       und Knoten neutral; nur das Blasse am Schluss bleibt. Die
       Bezeichnungen bleiben. PRUEFEN (Kaspers Empfehlung, Rike fragt).
     - Reihenfolge oben: Titel, Situation, darunter die Frage (weiter gross
       und hervorgehoben); vorher stand die Frage vor der Situation.
     - Beide Wege beim Jugendtreffen (zweiWege): Die erste Aufgabe gilt
       erst als geloest, wenn das «?» im Baum UND in der Tafel erreicht
       ist, jede Darstellung fuer sich - Rechnungen nur mit Werten aus
       derselben Darstellung, berechnete Werte nicht als blosse Zahl.
       Reihenfolge frei; nach dem ersten Weg «Jetzt dasselbe in der
       Tafel» (bzw. «im Baum»); am Schluss beide Wege nebeneinander, je
       mit ihrer Zahl der Rechnungen. Ab der zweiten Aufgabe wie bisher
       eine Darstellung nach Wahl.

   NEU (FASSUNG 3.6, thema.md, 2026-10-10, Rike):
     - Keine stille Ablehnung mehr. Jede abgelehnte Eingabe und jeder
       abgelehnte Klick bekommt sofort eine kleine Blase NEBEN dem Feld
       (blase(), nie darueber, pointer-events: none). Sie bleibt, bis man
       weitertippt oder weiterklickt. Vier Gruende, unterscheidbar:
         a  Wert falsch           «Das passt hier nicht.» (Feld rot)
         b  jetzt nicht erlaubt   (Feld grau) - nur noch, wo es noetig ist
         c  andere Darstellung    «Rechnen Sie im Baum mit Werten aus dem Baum.»
         d  nicht lesbar          «Diese Eingabe verstehe ich nicht. ...»
     - Etappe 2 sperrt nichts mehr (Nachtrag Rike: «Das ist zu heftig an
       Einschraenkungen»): Angaben, «?» und Rechnungen in beliebiger
       Reihenfolge, jeder richtige Wert jederzeit, auch beim gefuehrten
       Jugendtreffen. Die Schrittanzeige ist nur Orientierung; die Fuehrung
       schlaegt den naechsten Schritt vor und richtet sich nach dem, was
       schon dasteht. Beim Jugendtreffen bleibt Pflicht: das «?» im Baum
       UND in der Tafel, je mit Werten aus derselben Darstellung.
     - Rechenleiste: Rechenart darf auch vor Feld 1 kommen; «1 −» nach
       Feld 1 nimmt dieses Feld. Knoepfe sind nie stumm gesperrt.
     - Etappe 3 entfaellt. Mitnehmen: je Aufgabe ein Bild mit Pfeilkette.
     - Etappe 2 hat zehn Aufgaben: vier Pflicht, sechs nach Wahl.

   NEU (FASSUNG 3.7, thema.md, 2026-10-16, Rike):
     - Pflicht nur noch: das Jugendtreffen (gefuehrt, beide Wege) und zwei
       weitere nach Wahl, aus dem Skript oder neu. Fortschritt
       «Jugendtreffen ✓ · 1 von 2 weiteren».
     - Statt der langen Chipleiste drei Bereiche in der Kopfzeile: der
       Knopf «Zum Einstieg: Jugendtreffen» und zwei aufklappbare Menues
       «Aus dem Skript» und «Neue Aufgaben» (geloeste mit ✓). Der Titel
       der gewaehlten Aufgabe steht gross im Kopf (e2links, menueHtml).
     - Vier neue Aufgaben. «Brille und Lesen» hat die Antwortform des
       Wuerfels (hängen zusammen / unabhängig, mit Begruendung) als
       vierten Schritt: geloest erst mit richtiger Antwort (vergleichOk).
       Ihre Angaben duerfen auch als Ast stehen (A.gegeben_auch).
     - Alte Staende laden unveraendert: die Aufgaben-IDs bleiben.

   NEU (FASSUNG 4, thema.md, 2026-10-17, Rike): Chilbi-Rahmen. Alle
   Situationen ausserhalb des Skripts spielen an der Chilbi; Mechanik und
   Zahlen bleiben. Uebungsstunden -> Karussell und Magenbrot, Wuerfel ->
   Wuerfelbude, Jugendtreffen -> Zwei Lostoepfe usw. (thema.py). Das Menue
   «Neue Aufgaben» heisst «An der Chilbi» (BW.menues). Neue Aufgaben-IDs;
   alte Staende werden beim Laden umgeschrieben (alteIdsUmschreiben).
   Wo unten in Kommentaren noch Uebungsstunden, Wuerfel oder Jugendtreffen
   steht, ist S1, S2 bzw. die erste Aufgabe von Etappe 2 gemeint.

   NEU (FASSUNG 4.1 «Uebersicht», thema.md, 2026-10-17, Rike): Die
   Situation steht als hervorgehobene Karte ganz oben (situationKarte), mit
   freiwilligem Textmarker (Stifte «Angabe», in Etappe 2 dazu «gesucht»;
   wie Kapitel 7, nicht geprueft; stand.bwmark). Die Schritte als schmale
   Leiste 1 · 2 · 3 ueber dem Brett (schrittLeiste), Details aufklappbar;
   das Rechenprotokoll klappt unter dem Brett ein; Fortschritt und
   Aufgabenwahl in der Kopfleiste. Mechanik unveraendert.

   NEU (FASSUNG 4.2, thema.md, 2026-10-17, Rike): Titel «Vorwaerts und
   rueckwaerts» (flaeche.py); die Darstellung heisst weiter Doppelbaum.
   Auftragsfenster beim ersten Oeffnen jeder Etappe (auftragFenster,
   stand.bwauftrag), Knopf «Auftrag» in der Kopfleiste, Auftragssatz oben
   in der Situationskarte.
   NEU (Rike 2026-10-17, Zusatz): direkter richtiger Wert in einem
   Rechenfeld zeigt eine Rechnung darunter und kurz die Pfeile
   (vorschlagFinden, e.vorschlag).

   NEU (FASSUNG 4.3, thema.md, 2026-10-18, Rike): freiwillige Etappe 3,
   Reiter «freiwillig». Situationskarte mit Bild nur, wo es passt (A.bild).
   Alte Staende behalten alles (standNachziehen).
   GEAENDERT (FASSUNG 4.4, Rike 2026-10-18): Etappe 3 hat zwei Teile statt
   «Vorwaerts oder rueckwaerts?»: Teil 1 «Wohin gehoert der Satz?»
   (Satzkaertchen auf die leeren Felder von Baum und Tafel, zwei neue
   Chilbi-Situationen), Teil 2 «Aendert die Bedingung etwas?» (etappe3).

   E1  Zwei Situationen vollstaendig (OHNE Frage)
       S1 Uebungsstunden
         Zug 1  eintragen und berechnen - sofort weiterrechnen erlaubt
         Zug 2  Finde den Wert (Farben, Legende), dann die Schlussfrage
                «Wie viele Angaben braucht man mindestens?»
       S2 Wuerfel  eintragen und berechnen, dann die drei Schlussteile
   E2  Nur die Frage: welcher Weg?  14 Aufgaben (Einstieg, zwei Menues), dieselbe
         Bedienung, drei Schritte als Orientierung; der Weg ist die
         Reihenfolge der Eintraege, als nummerierte Pfeile

   Stellen heissen «r:K» (Raute) und «t:K» (Tafel); K ist der
   Schluessel aus inhalte.stellen(). Alles, was eine Zahl ist, kommt aus
   D.bw (gerechnet in inhalte.py, als Bruch).

   Stand dieses Kapitels (eigene Namen):
     stand.bwe1      {eintraege, zug, paare}    S1 (zug 1 oder 2)
     stand.bwe1b     {eintraege, wahl}                    S2 (Fassung 3.3)
     stand.bwe1sit   0 oder 1: die gezeigte Situation
     stand.bwe1sicht bool: «Eine moegliche Sicht» geoeffnet
     stand.bwauftrag {1: bool, 2: bool}: Auftragsfenster gesehen (Fassung 4.2)
     stand.bwe2.lostopf 'mit' | 'allein': Lostoepfe mit oder ohne Anleitung
                     (2026-10-18; fehlt in alten Staenden, siehe lostopfModus)
     stand.bwe2      {ansicht, gefuehrt, a: {Aufgaben-ID: {eintraege,
                     gesucht, wahl, markNach, fragen}}}
                     fragen = {r: n, t: n}: in welcher Darstellung das
                     «?» sitzt (n = Zahl der Eintraege beim Setzen)
     (stand.bwgruppen, stand.bwkasper: Etappe 3 bis Fassung 3.5; werden
      nicht mehr gelesen, ein alter Stand stoert nicht)
     stand.bwe3      {v: 44, ansicht, t1, t2, sicht}: Etappe 3 (Fassung
                     4.4, siehe etappe3)
     stand.bwfassung '4.4': Vermerk, dass der Stand nachgezogen ist
                     (standNachziehen)
   Ein Eintrag: {p, ausdruck, text, anz, ohne, quellen, vorschlag?}.
*/

(function(){
  const css = `
  .bwlinks{padding:30px 12px 18px;font-size:14px;line-height:1.45}
  .bwreiter{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px}
  .bwreiter button{font:inherit;font-size:12.5px;padding:4px 10px;border:1px solid var(--linie);
     background:var(--karte);border-radius:999px;cursor:pointer;color:var(--tinte)}
  .bwreiter button[aria-current=true]{background:var(--akzent);color:#fff;border-color:var(--akzent)}
  .bwreiter button .ok{color:var(--richtig);font-weight:700}
  .bwreiter button[aria-current=true] .ok{color:#fff}
  .bwreiter button.pflicht{border-width:2px}
  .bwfrage2{font-family:var(--hand);font-size:21px;line-height:1.25;color:var(--akzent);margin:2px 0 8px}
  .bwaufg{background:var(--karte);border:1px solid var(--linie);border-radius:10px;padding:9px 11px;margin-bottom:10px}
  .bwaufg .kopf{font-weight:600;color:var(--akzent);margin-bottom:3px}
  .bwaufg .kopf i{font-weight:400;color:var(--matt);font-size:12px;font-style:normal;margin-left:6px}
  .bwaufg p{margin:0 0 5px}
  .bwaufg .ziel{font-weight:600}
  .bwaufg .namen{font-size:12.5px;color:var(--matt)}
  .bwaufg .namen b{color:var(--tinte)}
  .bwstand{font-size:12.5px;color:var(--matt);margin:0 0 8px}
  .bwstand b{color:var(--tinte)}
  .bwaktion{background:#fffefb;border:1.5px solid var(--akzent);border-radius:10px;padding:9px 11px;margin-bottom:8px}
  .bwaktion .zart{color:var(--matt);font-size:12.5px}
  .bwaktion input[type=text]{font:inherit;font-size:14px;width:70px;padding:3px 6px;border:1.4px solid var(--linie);border-radius:6px}
  .bwaktion textarea{width:100%;min-height:52px;border:1px solid var(--linie);border-radius:8px;
     padding:6px 8px;font:13.5px/1.4 var(--druck);background:#fff;resize:vertical;margin-top:6px}
  .bwlegende{margin-top:8px;display:flex;flex-direction:column;gap:3px;font-size:12.5px}
  .bwlegende span.m{display:inline-block;width:26px;height:14px;border-radius:4px;border:1.6px solid;vertical-align:middle;margin-right:6px}
  .leiste .befund.bwm{color:var(--tinte);border-radius:8px;padding:5px 10px;background:#f3efe6}
  .leiste .befund.bwm.ok{background:#eaf4ea}
  .leiste .befund.bwm.nein{background:#fbeceb}
  .bwprotokoll .kopf,.bwvergleich .kopf{font-size:13px;font-weight:600;margin:8px 0 4px}
  .bwprotokoll ol{margin:0;padding-left:0;list-style:none;font-size:13px}
  .bwprotokoll li{padding:3px 6px;margin-bottom:3px;background:#fffefb;border-radius:6px;border:1px solid var(--linie)}
  .bwprotokoll li b.nr{display:inline-block;min-width:18px;color:var(--akzent)}
  .bwprotokoll li .wo{font-size:11px;color:var(--matt)}
  .bwprotokoll li .ohne{font-size:11.5px;color:#C77D0A;font-style:italic}
  .bwprotokoll .leer{color:var(--matt);font-size:13px}
  .bwvergleich textarea{width:100%;min-height:56px;border:1px solid var(--linie);
     border-radius:8px;padding:6px 8px;font:13.5px/1.4 var(--druck);background:#fffefb;resize:vertical}
  .bwvergleich label{margin-right:14px;cursor:pointer}
  .bwurteil{font-size:13px;margin-top:4px}
  .bwbrett{position:relative;margin:30px auto 10px}
  .bwbrett > img.bwgrund{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;user-select:none}
  .bwchip{position:absolute;z-index:2;border:1.4px dashed #b9ad99;border-radius:6px;background:#fffefb}
  .bwchip input{width:100%;height:100%;border:none;background:transparent;text-align:center;
     font:inherit;font-size:var(--bwf);color:var(--tinte);padding:0 2px;border-radius:5px}
  .bwchip.anteil input{font-size:var(--bwa)}
  .bwchip input:focus{outline:2px solid var(--akzent);background:#fff}
  .bwchip input[readonly]{cursor:pointer}
  .bwchip .bwname{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);
     font-size:var(--bwn);line-height:1.15;color:var(--matt);white-space:nowrap;padding:0 2px 1px;
     background:rgba(248,244,236,.85);border-radius:3px;pointer-events:none}
  .bwchip .bwname sub,.bwlinks sub,.leiste sub{font-size:.72em}
  .bwchip .bwbild{position:absolute;inset:0;opacity:0;pointer-events:none;display:flex;align-items:center;justify-content:center;font-size:var(--bwf)}
  .bwchip .bwfrag{position:absolute;right:-7px;top:-7px;width:15px;height:15px;border-radius:50%;
     border:1px solid #C77D0A;background:#fff;color:#C77D0A;font:700 10px/13px var(--druck);
     padding:0;cursor:pointer;z-index:3;opacity:.55}
  .bwchip .bwfrag:hover,.bwchip.gesucht .bwfrag{opacity:1}
  .bwchip.gesucht .bwfrag{background:#C77D0A;color:#fff}
  .bwchip.bekannt{border-style:solid;border-color:#9a8f7d}
  .bwchip.gegeben input{font-weight:700}
  .bwchip.falsch{border:2px solid var(--falsch);background:#fbeceb}
  .bwchip.gesucht{border:2px solid #C77D0A}
  .bwchip.gesucht:not(.bekannt) input::placeholder{color:#C77D0A;font-weight:700;opacity:1}
  .bwchip.art-wurzel{border-style:solid;border-color:#cfc5b3}
  .bwchip.art-wurzel input{color:var(--matt)}
  .bwchip.art-schnitt{border-radius:8px}
  .bwchip.f-gelb{background:#fff3c4;border-color:#c9a227}
  .bwchip.f-gruen{background:#e3f2ec;border-color:#007D57}
  .bwchip.f-blau{background:#e1edf7;border-color:#0065A9}
  .bwchip.f-grau{background:#ecebe8}
  .bwchip.t-gruen{border-color:#007D57;border-width:2px;border-style:solid}
  .bwchip.t-gruen input{color:#005c40}
  .bwchip.t-blau{border-color:#0065A9;border-width:2px;border-style:solid}
  .bwchip.t-blau input{color:#004f85}
  /* FEHLERBEHOBEN (Fassung 3.5): Die gewaehlte Stelle in «Finde den Wert»
     zeigte ihren Wert nicht mehr. Ursache: Die Klasse hiess «wahl» wie die
     Wahlkarten des gemeinsamen Geruests (.wahl{padding:15px 18px}); das
     Eingabefeld wurde auf Hoehe 0 gedrueckt. Jetzt eigener Name. */
  .bwchip.bwwahl{box-shadow:0 0 0 3px var(--akzent)}
  .bwhinweis{font-size:13.5px;line-height:1.5}
  /* NEU (Fassung 3.2, Punkt 4): Situation und Auftrag oben ueber die ganze
     Breite, darunter Baum und Tafel nebeneinander. Die linke Haelfte der
     gemeinsamen Buehne bleibt im DOM (#tisch), wird aber nicht gezeigt. */
  .bwnur > #links,.bwnur > .teiler{display:none}
  .bwnur > .haelfte.rechts > .marke{display:none}
  .bwnur #feld{padding:8px 0 4px}
  .bwnur .bwbrett{margin:0 auto}
  .bwtun .nw{white-space:nowrap}
  /* Niedrige Fenster (etwa 800 x 570): Kopf, Brett und Leiste passen nicht
     uebereinander. Dann rollt die ganze Buehne, und das Brett behaelt eine
     brauchbare Mindesthoehe, statt auf null zu schrumpfen. */
  @media (max-height:700px){
    #buehne:has(> .buehne.bwnur){overflow-y:auto}
    #buehne > .buehne.bwnur{flex:0 0 auto}
    .bwnur > .haelfte.rechts{overflow:visible}
    /* FEHLERBEHOBEN (2026-10-10): Die Grundregel fuer .bwkopf steht weiter
       unten und gewann bisher; der Kopf rollte dann in sich, zusaetzlich
       zur Buehne. Die Kennung (#bwkopf) gibt dieser Regel Vorrang. */
    #bwkopf{max-height:none;overflow:visible}
  }
  .bwkopf{flex:0 0 auto;display:flex;flex-wrap:wrap;gap:6px 22px;padding:7px 18px 7px;font-size:13.5px;
     line-height:1.42;border-bottom:1px solid var(--linie);background:var(--karte);max-height:46vh;overflow:auto}
  .bwkopf .bwsit{flex:1.2 1 420px;min-width:0}
  .bwkopf .bwtun{flex:1 1 360px;min-width:0}
  .bwsit p{margin:0}
  .bwsit .t{color:var(--akzent);font-weight:600;margin-right:6px}
  .bwsit .namen{font-size:12px;color:var(--matt);margin-top:2px}
  .bwsit .namen b{color:var(--tinte)}
  .bwsit .bwfrage2{font-size:19px;margin:0 0 2px}
  .bwsit .bwfrage2.nach{margin:4px 0 2px}
  .bwtun .ziel{font-weight:600;margin:0 0 1px}
  .bwtun ol{margin:0;padding-left:20px}
  .bwtun .zeile{display:flex;flex-wrap:wrap;gap:4px 10px;align-items:center;font-size:12.5px;color:var(--matt);margin-top:3px}
  .bwtun .zeile b{color:var(--tinte)}
  .bwtun .knopf{padding:3px 10px;font-size:12.5px}
  .bwtun .bwvergleich .kopf{margin:4px 0 2px}
  .bwtun .bwvergleich textarea,.bwtun textarea{min-height:30px;height:30px;margin-top:3px;font-size:12.5px}
  .bwtun .bwlegende{flex-direction:row;flex-wrap:wrap;gap:2px 12px;margin-top:3px;font-size:12px}
  .bwtun .bwschluss{margin-top:5px;border-top:1px solid var(--linie);padding-top:4px}
  .bwtun .bwschluss input[type=text]{font:inherit;font-size:13px;width:60px;padding:2px 6px;border:1.4px solid var(--linie);border-radius:6px}
  .auftrag .bwreiter{display:inline-flex;margin:0;vertical-align:middle}
  .auftrag .bwreiter button{font-size:12px;padding:3px 9px}
  details.bwprotokoll{margin-top:4px}
  details.bwprotokoll summary{cursor:pointer;font-size:12.5px;font-weight:600;color:var(--matt)}
  details.bwprotokoll ol{max-height:110px;overflow:auto;margin-top:3px;font-size:12.5px}
  /* NEU (Fassung 3.2, Punkt 3): gross das Ergebnis, klein und grau die
     getippte Rechnung direkt unter dem Feld. Reine Zahlen ohne zweite Zeile. */
  .bwchip input{font-weight:600}
  .bwchip .bwrech{position:absolute;top:100%;left:50%;transform:translateX(-50%);margin-top:1px;
     font-size:var(--bwr);line-height:1.15;color:var(--matt);white-space:nowrap;pointer-events:none;
     background:rgba(248,244,236,.88);border-radius:3px;padding:0 3px;z-index:1}
  .bwchip .bwrech:empty{display:none}
  .bwhinweis b{color:var(--akzent)}
  /* NEU (Fassung 3.3): Situationswahl, freiwillige Aufgaben, Schritte,
     blasse Felder, gefuehrtes Beispiel. */
  .auftrag .bwreiter .bwtrenn{display:inline-block;width:1px;align-self:stretch;background:var(--linie);margin:0 4px}
  .auftrag .bwreiter .bwfrei{font-size:11.5px;color:var(--matt);align-self:center;margin-left:4px}
  .bwreiter button.freiwillig{border-style:dashed}
  .bwreiter .bwgruppe{display:inline-flex;flex-wrap:wrap;gap:5px;min-width:0;max-width:100%}
  .bwreiter .bwgruppe button{white-space:nowrap}
  .bwsit .frei{font-size:11px;font-weight:600;color:var(--matt);border:1px dashed var(--matt);border-radius:999px;padding:0 6px;margin-right:6px;vertical-align:1px}
  .bwschritte{display:flex;flex-wrap:wrap;gap:4px;margin:0 0 3px;font-size:12px}
  .bwschritte span{padding:1px 8px;border-radius:999px;border:1px solid var(--linie);color:var(--matt);background:#fff}
  .bwschritte span.jetzt{border-color:var(--akzent);background:var(--akzent);color:#fff;font-weight:600}
  .bwschritte span.fertig{color:var(--richtig)}
  .bwbrett[data-frage=keine] .bwfrag{display:none}
  .bwbrett[data-frage=gesucht] .bwchip:not(.gesucht) .bwfrag{display:none}
  .bwbrett[data-frage=je] .bwchip.fragzu:not(.gesucht) .bwfrag,
  .bwbrett[data-frage=je] .bwchip.fragweg .bwfrag{display:none}
  .bwchip.blass{opacity:.28}
  .bwchip.zeig{box-shadow:0 0 0 3px #C77D0A;animation:bwzeig 1.4s ease-in-out infinite}
  @keyframes bwzeig{50%{box-shadow:0 0 0 6px rgba(199,125,10,.35)}}
  /* GEAENDERT (Nachtrag 2026-10-10): der Hinweis liegt nie ueber einem
     Feld - eigene Leiste ueber dem Brett, im Fluss; nie klickbar. */
  .bwfuehr{position:relative;z-index:6;display:flex;align-items:center;gap:8px;width:max-content;max-width:min(760px,100%);
     margin:4px auto 0;min-height:24px;background:#C77D0A;color:#fff;font-size:12.5px;line-height:1.35;
     padding:4px 11px;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,.18);pointer-events:none}
  .bwfuehr *{pointer-events:none}
  .bwfuehr[hidden]{display:none}
  .bwfuehr .pf{flex:0 0 auto;font-size:15px;line-height:1}
  .bwfuehr .wo{flex:0 0 auto;font-weight:700;white-space:nowrap}
  .bwfuehr sub{font-size:.72em}
  .bwfragen{margin-top:5px;border-top:1px solid var(--linie);padding-top:4px}
  .bwsit textarea{width:100%;min-height:30px;height:30px;margin-top:3px;border:1px solid var(--linie);border-radius:8px;
     padding:4px 8px;font:12.5px/1.4 var(--druck);background:#fffefb;resize:vertical}
  .bwsit .zeile{display:flex;flex-wrap:wrap;gap:4px 10px;align-items:center;margin-top:3px}
  .bwsit .knopf{padding:3px 10px;font-size:12.5px}
  .bwfragen .kopf{font-size:13px;font-weight:600;margin:4px 0 2px}
  .bwsicht{margin-top:4px;padding:5px 8px;border-radius:8px;background:#eaf4ea;font-size:12.5px}
  /* NEU (Fassung 3.4): Pfeil nur kurz, Rechnen durch Klicken, Finde den Wert */
  .bwbrett > img.bwpfeil{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;
     user-select:none;z-index:1;opacity:1;transition:opacity .9s ease}
  .bwbrett > img.bwpfeil.aus{opacity:0}
  .bwchip.blitz{animation:bwblitz 2s ease-out 1}
  @keyframes bwblitz{0%,60%{box-shadow:0 0 0 4px rgba(152,103,165,.55)}100%{box-shadow:0 0 0 0 rgba(152,103,165,0)}}
  .bwchip.rziel{box-shadow:0 0 0 3px var(--akzent);border-style:solid}
  .bwchip.rquelle{box-shadow:0 0 0 3px #9867A5;background:#f1e8f4}
  .bwchip.rquelle input{color:#5b3768}
  /* GEAENDERT (Nachtrag 2026-10-10): die Rechenleiste steht dauernd ueber
     dem Brett, mit der laufenden Rechnung. */
  .bwrleiste{position:relative;z-index:7;display:flex;align-items:center;gap:3px;padding:3px 6px;background:#fff;
     border:1.5px solid var(--linie);border-radius:9px;font-size:12px;white-space:nowrap;
     width:max-content;max-width:100%;margin:6px auto 0;flex-wrap:wrap;justify-content:center}
  .bwrleiste.aktiv{border-color:var(--akzent);box-shadow:0 2px 7px rgba(0,0,0,.12)}
  .bwrleiste[hidden]{display:none}
  .bwrleiste + .bwbrett{margin-top:12px}
  .bwrleiste button{font:600 14px/1 var(--druck);min-width:30px;height:26px;padding:0 6px;border:1px solid var(--linie);
     border-radius:6px;background:var(--karte);color:var(--tinte);cursor:pointer}
  .bwrleiste button:hover:not([disabled]){border-color:var(--akzent);background:#fff}
  .bwrleiste button[disabled]{opacity:.35;cursor:default}
  .bwrleiste button.an{border-color:var(--akzent);background:#fbeee0}
  .bwrleiste button.zu{min-width:24px;font-weight:400;color:var(--matt);border-color:transparent;background:transparent}
  /* feste Breite: sonst wandern die Knoepfe, waehrend die Rechnung waechst */
  .bwrleiste .anz{font:600 13.5px/1.2 var(--druck);color:var(--tinte);padding:0 8px 0 4px;width:340px;max-width:100%;
     overflow:hidden;text-overflow:ellipsis}
  .bwrleiste .anz .tip{font:400 11.5px/1.2 var(--druck);color:var(--matt)}
  .bwprotokoll li[data-i]{cursor:pointer}
  .bwprotokoll li[data-i]:hover{border-color:#9867A5}
  .bwfinde{font-family:var(--hand);font-size:19px;line-height:1.25;color:var(--akzent);margin:1px 0 2px}
  /* NEU (Fassung 3.5): Bezeichnungen entstehen lassen, oben weniger,
     Frage in Zug 2 als Karte direkt ueber dem Brett. */
  .bwchip .bwname:empty{display:none}
  .bwchip.art-wurzel .bwname{color:var(--matt);font-style:italic}
  .bwchip.neuname .bwname{color:var(--tinte);animation:bwneuname 2.4s ease-out 1}
  @keyframes bwneuname{0%,50%{background:#fff3c4}100%{background:rgba(248,244,236,.85)}}
  /* schmale Rechenleiste: erscheint erst mit dem ersten leeren Ziel */
  .bwrleiste{padding:1px 4px;gap:2px;border-width:1px;border-radius:7px;margin-top:2px}
  .bwrleiste button{font-size:13px;min-width:26px;height:22px;padding:0 5px}
  .bwrleiste .anz{font-size:12.5px;width:280px;padding:0 6px 0 3px}
  .bwrleiste .anz .tip{font-size:11px}
  .bwrleiste + .bwbrett{margin-top:6px}
  /* Anleitung: nach dem ersten Eintrag eine Zeile, aufklappbar */
  details.bwanl > summary{cursor:pointer;list-style-position:inside;font-weight:600;margin:0 0 1px}
  details.bwanl:not([open]) > summary{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--tinte)}
  details.bwanl:not([open]) > summary::after{content:' — Anleitung zeigen';font-weight:400;font-size:12px;color:var(--matt)}
  details.bwanl > summary::marker{color:var(--matt)}
  /* Zug 2: die Frage als hervorgehobene Karte ueber dem Brett */
  .bwfkarte{display:flex;align-items:center;gap:16px;max-width:980px;margin:2px auto 6px;padding:10px 18px;
     background:#fff7e0;border:2px solid #C77D0A;border-radius:12px;box-shadow:0 2px 8px rgba(199,125,10,.18)}
  .bwfkarte .q{flex:1 1 auto;min-width:0;font-family:var(--hand);font-size:24px;line-height:1.25;color:var(--tinte)}
  .bwfkarte .n{flex:0 0 auto;font-size:13px;color:var(--matt);white-space:nowrap}
  .bwfkarte .n b{font-size:20px;color:#C77D0A}
  .bwfkarte.still{background:var(--karte);border-color:var(--linie);box-shadow:none}
  .bwfkarte.still .q{font-family:inherit;font-size:14px;color:var(--matt)}
  @media (max-width:900px){ .bwfkarte .q{font-size:20px} .bwfkarte{padding:8px 12px} }
  .bwtun .bwlegende .m{width:22px;height:13px}
  /* NEU (Fassung 3.6): die Rueckmeldeblase - NEBEN dem Feld, nie darueber,
     nie klickbar. Vier Gruende, vier Toene. */
  .bwblase{position:absolute;z-index:9;pointer-events:none;width:max-content;max-width:230px;
     font-size:12px;line-height:1.35;padding:4px 9px 5px;border-radius:8px;border:1.6px solid;
     background:#fff;color:var(--tinte);box-shadow:0 2px 8px rgba(0,0,0,.16);transform:translateY(-50%);white-space:normal}
  .bwblase *{pointer-events:none}
  .bwblase b{display:block;font-size:10.5px;letter-spacing:.02em;text-transform:uppercase;margin-bottom:1px}
  .bwblase sub{font-size:.72em}
  .bwblase::before{content:'';position:absolute;top:50%;width:9px;height:9px;background:inherit;border:inherit;
     border-width:0 0 1.6px 1.6px;transform:translateY(-50%) rotate(45deg)}
  .bwblase.rechts::before{left:-6px}
  .bwblase.links::before{right:-6px;transform:translateY(-50%) rotate(-135deg)}
  .bwblase.unten{transform:translateX(-50%)}
  .bwblase.unten::before{top:-6px;left:50%;transform:translateX(-50%) rotate(135deg)}
  .bwblase.art-a{border-color:var(--falsch);background:#fdf1f0}
  .bwblase.art-a b{color:var(--falsch)}
  .bwblase.art-b{border-color:#8c8478;background:#f3f1ed}
  .bwblase.art-b b{color:#6c6357}
  .bwblase.art-c{border-color:#9867A5;background:#f6eff8}
  .bwblase.art-c b{color:#7a4f88}
  .bwblase.art-d{border-color:#C77D0A;background:#fff6e8}
  .bwblase.art-d b{color:#a3650a}
  .bwchip.b-a{border:2px solid var(--falsch);background:#fbeceb}
  .bwchip.b-b{border:2px solid #8c8478;background:#e9e7e3}
  .bwchip.b-c{border:2px solid #9867A5;background:#f6eff8}
  .bwchip.b-d{border:2px solid #C77D0A;background:#fff6e8}
  .bwrleiste button.aus{opacity:.38;cursor:default}
  .knopf[aria-disabled=true]{opacity:.5;cursor:default}
  /* NEU (Fassung 3.7): Aufgabenwahl in drei Bereichen - Einstieg, «Aus dem
     Skript», «Neue Aufgaben» (aufklappbar). Eine Zeile bei 1280 px, bei
     schmalen Fenstern bricht sie ordentlich um. Der Titel der gewaehlten
     Aufgabe steht gross im Kopf. */
  .auftrag .bwreiter{flex-wrap:wrap;gap:6px;align-items:center}
  .bwreiter .bwmenue{position:relative;display:inline-flex}
  .bwreiter .bwmknopf .pf{font-size:10px;margin-left:6px;color:var(--matt)}
  .bwreiter .bwmknopf[aria-current=true] .pf{color:#fff}
  .bwreiter .bwmknopf[aria-expanded=true]:not([aria-current=true]){border-color:var(--akzent);background:#fff}
  .bwreiter .bwmliste{position:absolute;top:calc(100% + 4px);left:0;z-index:60;display:flex;flex-direction:column;gap:1px;
     width:max-content;min-width:250px;max-width:min(340px,calc(100vw - 32px));padding:5px;background:var(--karte);
     border:1px solid var(--linie);border-radius:10px;box-shadow:0 6px 20px rgba(0,0,0,.18)}
  .bwreiter .bwmliste[hidden]{display:none}
  .bwreiter .bwmliste.rechts{left:auto;right:0}
  .bwreiter .bwmliste button{display:flex;justify-content:space-between;align-items:center;gap:12px;width:100%;
     text-align:left;border:none;border-radius:7px;background:transparent;padding:5px 9px;font-size:12.5px;white-space:normal}
  .bwreiter .bwmliste button:hover{background:#f3efe6}
  .bwreiter .bwmliste button[aria-current=true]{background:var(--akzent);color:#fff}
  .bwreiter button.bwein{border-width:2px}
  .bwsit .bwtitel{font-family:var(--hand);font-size:23px;line-height:1.15;color:var(--akzent);margin:0 0 3px}
  .bwsit .bwtitel .frei{font-family:var(--druck);margin-left:10px;margin-right:0;vertical-align:4px}
  @media (max-width:900px){ .bwsit .bwtitel{font-size:20px} }

  /* NEU (FASSUNG 4.1 «Uebersicht», thema.md, Rike 2026-10-17): Die
     Situation steht als hervorgehobene Karte ganz oben (.bwskarte), mit
     freiwilligem Textmarker. Darunter eine schmale Schrittleiste
     (.bwsbar), Details aufklappbar. Nebenan, nur wenn es sie gibt, die
     Fragen nach dem Ausfuellen (.bwmehr). Das Protokoll klappt unter dem
     Brett ein (#bwprotbox), der Fortschritt steht in der Kopfleiste. */
  .bwkopf{gap:6px 16px;padding:8px 18px 6px;align-items:flex-start}
  .bwskarte{flex:1.6 1 520px;min-width:0;max-width:1180px;background:#fff;border:2px solid var(--akzent);
     border-left-width:7px;border-radius:12px;padding:8px 14px 7px;box-shadow:0 2px 8px rgba(0,0,0,.07)}
  .bwskopf{display:flex;flex-wrap:wrap;align-items:center;gap:4px 12px;margin-bottom:2px}
  .bwstitel{font-weight:700;font-size:17px;color:var(--akzent);line-height:1.25}
  .bwskopf .frei{font-size:11px;font-weight:600;color:var(--matt);border:1px dashed var(--matt);border-radius:999px;padding:0 6px}
  .bwstext{margin:0;font-size:16.5px;line-height:1.5;color:var(--tinte)}
  .bwsfrage{margin:4px 0 0;font-size:18px;line-height:1.35;font-weight:700;color:var(--tinte)}
  .bwskarte .namen{font-size:12.5px;color:var(--matt);margin-top:3px}
  .bwskarte .namen b{color:var(--tinte)}
  /* Textmarker (wie Kapitel 7): Stift waehlen, ueber den Text streichen
     oder Woerter anklicken; Radierer. Nicht geprueft. */
  .bwstifte{display:inline-flex;flex-wrap:wrap;align-items:center;gap:4px;margin-left:auto;font-size:12px;color:var(--matt)}
  .bwstifte button{font:inherit;font-size:12.5px;font-weight:600;height:24px;padding:0 8px;border:1.6px solid var(--mf,#b9ad98);
     border-radius:7px;background:var(--mg,#fff);color:var(--tinte);cursor:pointer;display:inline-flex;align-items:center;gap:5px}
  .bwstifte button::before{content:'';width:7px;height:13px;border-radius:2px 2px 3px 3px;background:var(--mf,#b9ad98);transform:rotate(18deg)}
  .bwstifte button.weg{--mf:#8d8476;--mg:#f3efe8;font-weight:400}
  .bwstifte button.weg::before{width:11px;height:7px;border-radius:2px;background:#e9b8b0;border:1px solid #8d8476;transform:rotate(-18deg)}
  .bwstifte button[aria-pressed=true]{background:var(--mf);color:var(--mt,#fff);box-shadow:0 0 0 3px var(--mg)}
  .bwstifte button[aria-pressed=true]::before{background:var(--mt,#fff)}
  .m-angabe{--mf:#d4ac00;--mg:#fff09a;--mt:#2d2924} .m-gesucht{--mf:#C77D0A;--mg:#ffe0b3;--mt:#fff}
  .bwskarte .w,.bwskarte .ws{border-radius:3px}
  body.bw-stift-an .bwskarte [data-mk]{cursor:crosshair;user-select:none;-webkit-user-select:none}
  body.bw-stift-an .bwskarte [data-mk] .w:hover{box-shadow:inset 0 -2px 0 #c9bda8}
  .bwskarte .w[class*=" m-"],.bwskarte .ws[class*=" m-"]{background:var(--mg)}
  .bwskarte .w[class*=" m-"]{box-shadow:inset 0 -2px 0 var(--mf)}
  /* Was nach dem Ausfuellen kommt (Fragen, Legende, Ergebnis) */
  .bwmehr{flex:1 1 340px;min-width:0;font-size:13px;line-height:1.42}
  .bwmehr .ziel{font-weight:600;margin:0 0 2px}
  .bwmehr .zeile{display:flex;flex-wrap:wrap;gap:4px 10px;align-items:center;font-size:12.5px;color:var(--matt);margin-top:3px}
  .bwmehr .zeile b{color:var(--tinte)}
  .bwmehr .knopf{padding:3px 10px;font-size:12.5px}
  .bwmehr .kopf{font-size:13px;font-weight:600;margin:0 0 2px}
  .bwmehr textarea{width:100%;min-height:30px;height:30px;margin-top:3px;font-size:12.5px;border:1px solid var(--linie);
     border-radius:8px;padding:4px 8px;font-family:var(--druck);background:#fffefb;resize:vertical}
  .bwmehr .bwlegende{flex-direction:row;flex-wrap:wrap;gap:2px 12px;margin-top:3px;font-size:12px}
  .bwmehr .bwlegende .m{width:22px;height:13px}
  .bwmehr .bwschluss{margin-top:5px;border-top:1px solid var(--linie);padding-top:4px}
  .bwmehr .bwschluss input[type=text]{font:inherit;font-size:13px;width:60px;padding:2px 6px;border:1.4px solid var(--linie);border-radius:6px}
  /* Die Schrittleiste */
  .bwsrow{flex:1 1 100%;display:flex;align-items:flex-start;gap:4px 14px;flex-wrap:wrap;font-size:12.5px;min-width:0}
  details.bwsbar{flex:1 1 auto;min-width:0}
  details.bwsbar > summary{list-style:none;cursor:pointer;display:flex;flex-wrap:wrap;align-items:center;gap:4px}
  details.bwsbar > summary::-webkit-details-marker{display:none}
  .bwsbar .st{padding:1px 9px;border-radius:999px;border:1px solid var(--linie);color:var(--matt);background:#fff;white-space:nowrap}
  .bwsbar .st.jetzt{border-color:var(--akzent);background:var(--akzent);color:#fff;font-weight:600}
  .bwsbar .st.fertig{color:var(--richtig)}
  .bwsbar .pt{color:#c9bda8}
  .bwsbar .auf{color:var(--matt);font-size:12px;margin-left:4px;white-space:nowrap}
  .bwsbar .auf::before{content:'▸ '}
  details.bwsbar[open] .auf::before{content:'▾ '}
  .bwsdet{margin:3px 0 1px;padding:4px 10px;border-left:3px solid var(--akzent);background:#fffefb;border-radius:0 8px 8px 0;font-size:13px;line-height:1.45}
  .bwsdet ol{margin:0;padding-left:18px}
  .bwsdet p{margin:0 0 2px}
  .bwsstat{flex:0 1 auto;display:flex;flex-wrap:wrap;gap:3px 10px;align-items:center;color:var(--matt);padding-top:1px}
  .bwsstat b{color:var(--tinte)}
  .bwsstat .hin{color:var(--tinte);font-weight:600}
  .bwsstat .knopf{padding:2px 10px;font-size:12.5px}
  /* NEU (FASSUNG 4.2): der Auftragssatz oben in der Situation, der Knopf
     «Auftrag» in der Kopfleiste und das Auftragsfenster ueber der Flaeche. */
  .bwsauftrag{margin:0 0 4px;padding:3px 9px;border-radius:7px;background:var(--akzent);color:#fff;
     font-size:14.5px;line-height:1.35;font-weight:600}
  .bwsauftrag .was{font-weight:700;margin-right:6px;opacity:.85}
  .bwreiter button.bwauftragknopf{font-weight:700;border:2px solid var(--akzent);color:var(--akzent);background:#fff}
  .bwreiter button.bwauftragknopf::before{content:'☰ ';font-weight:400}
  .bwfenster{position:fixed;inset:0;z-index:200000;display:flex;align-items:center;justify-content:center;
     background:rgba(45,41,36,.42);padding:12px}
  .bwfenster .kasten{position:relative;background:#fff;border-radius:14px;border:2px solid var(--akzent);border-top-width:7px;
     box-shadow:0 10px 36px rgba(0,0,0,.25);width:min(600px,100%);max-height:calc(100vh - 24px);overflow:auto;
     padding:14px 20px 14px;font-size:15px;line-height:1.45;color:var(--tinte)}
  .bwfenster h2{margin:0 30px 4px 0;font-size:19px;color:var(--akzent)}
  .bwfenster .satz{margin:0 0 8px;font-weight:600;font-size:16px}
  .bwfenster ol{margin:0 0 8px;padding-left:24px}
  .bwfenster li{margin:0 0 4px}
  .bwfenster li::marker{font-weight:700;color:var(--akzent)}
  .bwfenster .bsp{color:var(--matt);font-size:13.5px}
  .bwfenster .schluss{margin:0 0 10px;padding:5px 10px;border-left:3px solid var(--akzent);background:#fffefb;font-size:14px}
  .bwfenster .zu{position:absolute;top:6px;right:8px;width:32px;height:32px;border:0;background:none;font-size:24px;
     line-height:1;color:var(--matt);cursor:pointer;border-radius:8px}
  .bwfenster .zu:hover{background:#f3efe6;color:var(--tinte)}
  .bwfenster .unten{display:flex;justify-content:flex-end}
  .bwfenster .los{font-size:15px;padding:6px 18px}
  @media (max-height:640px),(max-width:900px){
    .bwfenster .kasten{font-size:14px;line-height:1.38;padding:10px 16px 10px}
    .bwfenster h2{font-size:17px}
    .bwfenster .satz{font-size:14.5px;margin-bottom:5px}
    .bwfenster li{margin-bottom:2px}
    .bwfenster .schluss{margin-bottom:6px;font-size:13px}
    .bwsauftrag{font-size:13px;padding:2px 8px;margin-bottom:3px}
  }
  /* NEU (Rike 2026-10-17, Zusatz «Zug 2»): zwei Ebenen in der Kopfleiste -
     die Zuege der Situation als nummerierte Schrittreihe, die Wahl der
     Situation bzw. Aufgabe zurueckgenommen (gedimmt, solange Zuege offen
     sind). Die Weiter-Fahne steht unten im Brettbereich. */
  .bwreiter .bwzuege{display:inline-flex;flex-wrap:nowrap;align-items:center;gap:3px;padding:2px 4px;border-radius:999px;background:#f3efe6}
  .bwreiter .bwzuege .pfeil{color:var(--matt);font-weight:700;margin:0 1px}
  .bwreiter button.bwzug{font-weight:600;border-width:2px;display:inline-flex;align-items:center;gap:6px}
  .bwreiter button.bwzug .nr{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;border-radius:50%;
     font-size:11px;font-weight:700;background:var(--linie);color:var(--tinte)}
  .bwreiter button.bwzug.fertig .nr{background:var(--richtig);color:#fff}
  .bwreiter button.bwzug[aria-current=true] .nr{background:#fff;color:var(--akzent)}
  .bwreiter button.bwzug:not(.knopflos)[aria-current=true]{box-shadow:0 0 0 2px #fff,0 0 0 4px var(--akzent)}
  .bwreiter .bwzug.knopflos{cursor:default}
  .bwreiter .bwsitwahl{display:inline-flex;flex-wrap:wrap;align-items:center;gap:4px;font-size:12px}
  .bwreiter .bwsitwahl .was{color:var(--matt);font-size:11.5px}
  .bwreiter .bwsitwahl button{font-size:11.5px;padding:2px 8px}
  .bwreiter .gedimmt > button,.bwreiter .gedimmt > .bwmenue{opacity:.45;filter:grayscale(1)}
  .bwreiter .gedimmt > button:hover,.bwreiter .gedimmt > .bwmenue:hover{opacity:.8}
  .bwreiter .gedimmt .hin{font-size:11.5px;color:var(--matt);font-style:italic}
  .bwfahne{position:absolute;right:14px;bottom:12px;z-index:40;display:flex;align-items:center;gap:10px;flex-wrap:wrap;
     max-width:min(460px,calc(100% - 28px));background:#fff;border:2px solid var(--akzent);border-radius:12px;padding:7px 10px 7px 12px;
     box-shadow:0 6px 20px rgba(0,0,0,.18);font-size:14px;animation:bwfahne .25s ease-out}
  .bwfahne .notiz{font-weight:600;color:var(--tinte)}
  .bwfahne .knopf{font-size:14.5px;padding:6px 14px;white-space:nowrap}
  .bwfahne .uhr{height:3px;flex-basis:100%;background:var(--linie);border-radius:2px;overflow:hidden}
  .bwfahne .uhr i{display:block;height:100%;width:100%;background:var(--akzent);animation:bwuhr 1.5s linear forwards}
  @media (max-width:900px){ .bwreiter .bwzug .lang{display:none} }
  @keyframes bwfahne{from{transform:translateY(8px);opacity:0}to{transform:none;opacity:1}}
  @keyframes bwuhr{from{width:0}to{width:100%}}
  /* NEU (Rike 2026-10-18): Wahl «Mit Anleitung» / «Selbststaendig» */
  .bwmodus{display:inline-flex;flex-wrap:wrap;align-items:center;gap:4px 8px;color:var(--tinte)}
  .bwmodus.wahl{padding:4px 8px;border:2px solid var(--akzent);border-radius:10px;background:#fff}
  .bwmodus .knopf{padding:3px 10px;font-size:12.5px}
  /* Fortschritt in der Kopfleiste */
  .auftrag .bwreiter .bwfort{font-size:12px;color:var(--matt);margin-left:6px;white-space:nowrap}
  .auftrag .bwreiter .bwfort b{color:var(--tinte)}
  /* Das Protokoll unter dem Brett */
  .bwprotbox{width:max-content;max-width:min(760px,100%);margin:6px auto 0}
  .bwprotbox details.bwprotokoll{margin:0}
  .bwprotbox details.bwprotokoll[open] ol{height:74px;max-height:none;width:min(720px,calc(100vw - 60px))}
  @media (max-width:900px),(max-height:640px){
    .bwkopf{padding:5px 10px 4px;gap:4px 10px}
    .bwskarte{padding:5px 10px 5px;border-left-width:5px}
    .bwstext{font-size:15px;line-height:1.42}
    .bwstitel{font-size:15.5px}
    .bwsfrage{font-size:16px;margin-top:2px}
    .bwstifte .was{display:none}
  }
  /* NEU (Rike 2026-10-18, «Situationskarte groesser und huebscher»): gleich
     gebaut wie in Kapitel 6 (.zgr-skarte), nur die Kapitelfarbe ist anders.
     Steht zuletzt und gewinnt damit gegen die aelteren .bwskarte-Regeln. */
  .bwskarte{flex:1 1 100%;max-width:none;display:flex;align-items:flex-start;gap:14px;position:relative;
     background:#f0f7f4;background:color-mix(in srgb,var(--akzent) 8%,#fff);border:0;border-radius:0 10px 10px 0;
     box-shadow:inset 4px 0 0 var(--akzent);padding:10px 16px 9px 18px}
  .bwsbild{flex:0 0 auto;width:76px;height:76px;object-fit:cover;border-radius:8px;mix-blend-mode:multiply;margin-top:2px}
  .bwsinhalt{flex:1 1 auto;min-width:0}
  .bwskopf{display:flex;flex-wrap:wrap;align-items:center;gap:4px 12px;margin-bottom:2px}
  .bwstitel{font-family:var(--hand);font-weight:400;font-size:21px;color:var(--akzent);line-height:1.2}
  .bwskurz,.bwsnurzu{display:none}
  .bwstext{font-size:17px;line-height:1.5;color:var(--tinte)}
  .bwsfrage{margin:5px 0 0;font-size:18px;line-height:1.35;font-weight:700;color:var(--akzent)}
  .bwskarte .bwsfrage .w[class*=" m-"]{color:var(--tinte)}
  .bwskarte .namen{font-size:13px;margin-top:3px}
  .bwsklapp{font:inherit;font-size:12px;color:var(--matt);background:none;border:1px solid transparent;border-radius:7px;
     padding:2px 7px;cursor:pointer;white-space:nowrap}
  .bwsklapp:hover{border-color:var(--linie);background:#fff;color:var(--tinte)}
  .bwsklapp::before{content:'▴ '}
  .bwskarte.zu .bwsklapp::before{content:'▾ '}
  .bwsauftrag{display:flex;align-items:center;gap:6px 12px;margin:6px 0 0;padding:4px 0 0;border-top:1px solid rgba(0,0,0,.08);
     background:none;color:var(--tinte);font-size:14px;line-height:1.35;font-weight:400;border-radius:0}
  .bwsauftrag p{margin:0;flex:1 1 auto;min-width:0}
  .bwsauftrag .was{font-weight:700;color:var(--akzent);margin-right:6px;opacity:1}
  .bwskarte button.bwauftragknopf{font:inherit;font-size:13px;font-weight:700;border:2px solid var(--akzent);color:var(--akzent);
     background:#fff;border-radius:999px;padding:2px 12px;cursor:pointer;white-space:nowrap}
  .bwskarte button.bwauftragknopf::before{content:'☰ ';font-weight:400}
  .bwskarte button.bwauftragknopf:hover{background:var(--akzent);color:#fff}
  /* eingeklappt: eine Zeile mit Name und Frage */
  .bwskarte.zu{padding:5px 12px 5px 16px;align-items:center}
  .bwskarte.zu .bwsbild{width:30px;height:30px;margin:0;border-radius:6px}
  .bwskarte.zu .bwsganz,.bwskarte.zu .bwstifte{display:none}
  .bwskarte.zu .bwskopf{flex-wrap:nowrap;margin:0;cursor:pointer}
  .bwskarte.zu .bwstitel{font-size:18px;white-space:nowrap}
  .bwskarte.zu .bwskurz{display:block;flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
     font-weight:700;color:var(--akzent);font-size:15px}
  .bwskarte.zu .bwsnurzu{display:inline-flex}
  @media (max-width:900px),(max-height:640px){
    .bwskarte{padding:6px 10px 6px 14px;gap:10px}
    .bwsbild{width:52px;height:52px}
    .bwstitel{font-size:18px}
    .bwstext{font-size:15.5px;line-height:1.42}
    .bwsfrage{font-size:16px;margin-top:2px}
    .bwsauftrag{font-size:13px;margin-top:4px}
    .bwskarte.zu .bwsbild{width:24px;height:24px}
    .bwskarte.zu .bwstitel{font-size:16px}
    .bwskarte.zu .bwskurz{font-size:13.5px}
  }
  /* NEU (FASSUNG 4.4): Etappe 3 - Satzliste links, Raute und Tafel
     rechts (Teil 1) bzw. zwei Stapel (Teil 2); Reiter «freiwillig». */
  nav button .bwnavfrei{font-size:10.5px;font-weight:600;border:1px dashed currentColor;border-radius:999px;padding:0 5px;
     margin-left:3px;opacity:.85;vertical-align:1px}
  .bwfenster h2 .frei{font-size:12px;font-weight:600;color:var(--matt);border:1px dashed var(--matt);border-radius:999px;
     padding:0 7px;vertical-align:3px;margin-left:6px}
  .bw3{display:flex;gap:14px;align-items:flex-start;padding:6px 4px 10px}
  .bw3liste{flex:0 0 300px;display:flex;flex-direction:column;gap:6px;min-width:0}
  .bw3rechts{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;align-items:center;gap:8px}
  .bw3satz{font:inherit;text-align:left;display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 8px;width:100%;
     background:#fffefb;border:1.6px solid var(--linie);border-radius:10px;padding:6px 10px;cursor:pointer;
     box-shadow:0 1px 3px rgba(0,0,0,.08);color:var(--tinte);font-size:14px;line-height:1.35}
  .bw3satz:hover{border-color:var(--akzent)}
  /* GEAENDERT (2026-10-18, Rike): Die Zahl stand als eigenes Etikett vor
     dem Satz und wirkte wie eine Nummerierung («0.1, 0.2 …»). Jetzt ist
     sie nur im Satz hervorgehoben. */
  .bw3satz .zahlimsatz{font-weight:700;color:var(--akzent)}
  .bw3satz .satz{flex:1 1 180px;min-width:0}
  .bw3satz .wo{flex:1 1 100%;font-size:12px;color:var(--matt)}
  .bw3satz.gewaehlt{border-color:var(--akzent);box-shadow:0 0 0 3px color-mix(in srgb,var(--akzent) 25%,#fff);background:#fff}
  .bw3satz.gelegt{opacity:.8}
  .bw3satz.gelegt.ok{border-color:var(--richtig)}
  .bw3satz.gelegt.falsch{border-color:var(--falsch);opacity:1}
  .bw3satz.gelegt.falsch .wo{color:var(--falsch);font-weight:600}
  .bw3satz.gelegt.ok .wo{color:var(--richtig)}
  .bw3brett{position:relative}
  .bw3brett > img.bwgrund{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;user-select:none}
  .bw3feld{position:absolute;z-index:2;border:1.4px dashed #b9ad99;border-radius:6px;background:#fffefb;padding:0;cursor:pointer;
     display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:2px;font:inherit}
  .bw3.waehlt .bw3feld{border-color:var(--akzent);background:#f3faf7}
  .bw3feld:hover{border-style:solid;border-color:var(--akzent)}
  .bw3marke{display:inline-block;font-size:12px;font-weight:700;line-height:1.2;padding:1px 4px;border-radius:5px;
     background:#fff;border:1.5px solid var(--linie);color:var(--tinte)}
  .bw3marke.ok{border-color:var(--richtig);color:var(--richtig)}
  .bw3marke.falsch{border-color:var(--falsch);color:var(--falsch)}
  .bw3stapel{font:inherit;display:flex;align-items:center;gap:10px;flex-wrap:wrap;min-width:260px;min-height:38px;padding:6px 14px;
     border:1.6px dashed var(--matt);border-radius:10px;background:#fffefb;cursor:pointer;color:var(--tinte);font-size:14px}
  .bw3.waehlt .bw3stapel,.bw3.waehlt .bw3stapel2{border-color:var(--akzent);background:#f3faf7}
  .bw3stapel .drin{display:inline-flex;gap:4px;flex-wrap:wrap}
  .bw3sicht{margin-top:4px;font-size:13.5px;line-height:1.45}
  .bw3sicht .box{border-left:3px solid var(--akzent);background:#fffefb;border-radius:0 8px 8px 0;padding:6px 12px}
  .bw3sicht h4{margin:0 0 3px;color:var(--akzent);font-size:15px}
  .bw3sicht p{margin:0 0 4px}
  .bw3sicht ul{margin:0;padding-left:18px;font-size:12.5px}
  .bw3t2 .bw3rechts{flex-direction:row;align-items:stretch;gap:12px}
  .bw3stapel2{flex:1 1 0;min-width:0;min-height:220px;border:1.6px dashed var(--linie);border-radius:12px;padding:8px 10px;
     background:#fffefb;cursor:pointer;display:flex;flex-direction:column;gap:6px}
  .bw3stapel2 > b{font-size:15px;color:var(--akzent)}
  .bw3stapel2 .drin{display:flex;flex-direction:column;gap:6px}
  .bw3k2 .zeichen{color:var(--matt);font-size:12.5px;white-space:nowrap}
  .bw3k2 .werte{flex:1 1 100%;font-size:14px;font-weight:600;color:var(--tinte);background:#f3efe6;border-radius:6px;padding:2px 8px}
  .bw3k2 .werte .pt{color:var(--matt);margin:0 4px}
  .bw3k2.gelegt{opacity:1}
  @media (max-width:900px),(max-height:640px){
    .bw3{gap:8px;padding:4px 2px 8px}
    .bw3liste{flex-basis:220px;gap:4px}
    .bw3satz{font-size:12.5px;padding:4px 8px}
    .bw3satz .zahl{font-size:13.5px;min-width:28px}
    .bw3stapel2{min-height:160px}
  }
  `;
  const s = document.createElement('style');
  s.id = 'doppelbaum-stil';
  s.textContent = css;
  document.head.appendChild(s);
})();

/* ───────── Daten und kleine Helfer ───────── */
const BW = D.bw, ST = BW.stellen, GEO = BW.raute, TAF = BW.tafel;
// NEU (Fassung 3.3): zwei Situationen in Etappe 1; SIT bleibt S1.
const SITS = BW.situationen, SIT = SITS[0], SIT2 = SITS[1], AUFG = BW.aufgaben;
const SVGNS = 'http://www.w3.org/2000/svg';
const SCHRIFT = "'Fira Sans', 'Segoe UI', Helvetica, Arial, sans-serif";
const F = {gruen: '#007D57', blau: '#0065A9', gelb: '#fff3c4', gelbRand: '#c9a227',
           gruenHell: '#e3f2ec', blauHell: '#e1edf7', grauHell: '#ecebe8',
           linie: '#b9ad99', tinte: '#2d2924', matt: '#6c6357', papier: '#f8f4ec',
           creme: '#f6ecdf', karte: '#fffefb', frage: '#C77D0A', pfeil: '#9867A5'};
const X_FAM = ['X', 'nX'], Y_FAM = ['Y', 'nY'];
const SCHLUESSEL = Object.keys(ST);
// Die Tafel liegt unter der Raute, in derselben Einheit.
const T_OX = (100 - TAF.breite) / 2, T_OY = GEO.hoehe + 5;
const BRETT_H = T_OY + TAF.hoehe + 3;

const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const aufgabe = id => AUFG.find(a => a.id === id);
const schnittK = (e1, e2) => X_FAM.includes(e1) ? e1 + e2 : e2 + e1;
const vw = p => p[0];                 // 'r' oder 't'
const kk = p => p.slice(2);           // der Schluessel
// GEAENDERT (Fassung 3.2): Fuer Studierende heisst die Raute «Baum» -
// so steht es in thema.md und im Auftrag. Intern bleibt «r».
const WO = {r: 'Baum', t: 'Tafel'};
// NEU (Fassung 3.2, Rike 2026-10-10): Beschriftung einer Aufgabe - aus
// dem Skript «Aufgabe 5.4 · Brandmeldeanlage», sonst nur der Titel.
const label = A => A.label || A.titel;
const ALLE_STELLEN = ['r', 't'].flatMap(v => SCHLUESSEL.filter(k => k !== 'E').map(k => v + ':' + k));
const wahrB = (A, k) => A.werte[k];
const bZahl = a => a[0] / a[1];
const bruchText = b => b[1] === 1 ? String(b[0]) : b[0] + '/' + b[1];

/* NEU (Fassung 3.4, Punkt 1): die EINE Stelle - "dezimal" oder "prozent",
   gesetzt in thema.ANZEIGE. Brueche (A.anzeige === 'bruch') bleiben. */
const ANZ = BW.anzeige === 'prozent' ? 'prozent' : 'dezimal';
/* Die Eins einer Aufgabe: «1» bei Dezimalzahlen und Bruechen, sonst «100 %». */
const einsText = A => (A && A.anzeige === 'bruch') || ANZ === 'dezimal' ? '1' : '100 %';

/* Prozenttext, Dezimalpunkt wie im Skript. Zwei Nachkommastellen, unter
   1 % vier (beim HIV-Test waeren 0.0555 % sonst 0.06 %). */
function prozentText(z){
  const p = z * 100, st = Math.abs(p) < 1 ? 4 : 2, f = 10 ** st;
  const r = Math.round(p * f) / f;
  const t = r.toFixed(st).replace(/0+$/, '').replace(/\.$/, '');
  return {text: t + ' %', gerundet: Math.abs(r - p) > 1e-9};
}
/* Eine Wahrscheinlichkeit als Text - je nach ANZ. Dezimal: vier Stellen,
   unter 0.01 sechs (dieselbe Genauigkeit wie die Prozente oben). */
function zahlText(z){
  if (ANZ === 'prozent') return prozentText(z);
  const st = Math.abs(z) < 0.01 ? 6 : 4, f = 10 ** st;
  const r = Math.round(z * f) / f;
  const t = r.toFixed(st).replace(/0+$/, '').replace(/\.$/, '');
  return {text: t, gerundet: Math.abs(r - z) > 1e-12};
}

/* ───────── Rechnungen lesen ─────────
   NEU (Fassung 3.1, Punkt 2): Ein Feld nimmt eine Zahl ODER eine
   Rechnung. Gerechnet wird exakt, mit Bruechen aus BigInt.
     Zahlen   70   70,5   0.1   2/6   (ein Bruch aus zwei ganzen Zahlen
              gilt als EINE Zahl)
     Prozent  70 %  ->  0.7
     Zeichen  + - −   * · × x   : / ÷   ( )
   Eine Zahl ohne % ist zweideutig («100 - 70» meint Prozent, «0.7»
   meint eine Wahrscheinlichkeit). Deshalb zaehlt am Ende, ob das
   Ergebnis als Wahrscheinlichkeit, als Prozentzahl oder - bei einem
   Produkt zweier Prozentzahlen («70 · 85») - als Prozent von Prozent
   zum wahren Wert passt.
   PRUEFEN: Diese Deutung ist grosszuegig; eine falsche Zahl, die
   zufaellig auf eine der drei Arten passt, wuerde angenommen. */
const BG = {
  ggt(a, b){ a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b){ [a, b] = [b, a % b]; } return a || 1n; },
  r(n, d){ if (d === 0n) throw new Error('durch null'); if (d < 0n){ n = -n; d = -d; } const g = BG.ggt(n, d); return [n / g, d / g]; },
  plus: (a, b) => BG.r(a[0] * b[1] + b[0] * a[1], a[1] * b[1]),
  minus: (a, b) => BG.r(a[0] * b[1] - b[0] * a[1], a[1] * b[1]),
  mal: (a, b) => BG.r(a[0] * b[0], a[1] * b[1]),
  durch: (a, b) => BG.r(a[0] * b[1], a[1] * b[0]),
  zahl: a => Number(a[0]) / Number(a[1]),
  aus(txt){ const [g, f = ''] = txt.split('.'); return BG.r(BigInt(g + f), 10n ** BigInt(f.length)); },
};

function auswerten(eingabe){
  const s = String(eingabe || '').replace(/,/g, '.').replace(/\s+/g, '');
  if (!s) return null;
  const tok = [];
  const re = /(\d+(?:\.\d+)?)|([%+\-−*·×x:\/÷()])/gy;
  let m;
  while (re.lastIndex < s.length){
    m = re.exec(s);
    if (!m) return null;
    tok.push(m[1] !== undefined ? {z: m[1]} : {o: m[2]});
  }
  const OP = {'−': '-', '·': '*', '×': '*', 'x': '*', '÷': ':'};
  tok.forEach(t => { if (t.o && OP[t.o]) t.o = OP[t.o]; });
  let i = 0, ops = 0;
  const literale = [], zeigen = [];
  const sieh = () => tok[i], nimm = () => tok[i++];
  const istZ = t => t && t.z !== undefined;
  function primaer(){
    const t = nimm();
    if (!t) throw new Error('fehlt');
    if (t.o === '('){
      zeigen.push('(');
      const v = summe();
      if (!sieh() || sieh().o !== ')') throw new Error(')');
      nimm(); zeigen.push(')');
      if (sieh() && sieh().o === '%'){ nimm(); zeigen.push(' %'); return BG.mal(v, [1n, 100n]); }
      return v;
    }
    if (t.o === '-'){ zeigen.push('−'); return BG.mal(primaer(), [-1n, 1n]); }
    if (!istZ(t)) throw new Error('Zahl erwartet');
    let v = BG.aus(t.z), txt = t.z, bruch = false;
    // Ein Bruch aus zwei ganzen Zahlen ist EINE Zahl (2/6, 80/200).
    if (sieh() && sieh().o === '/' && istZ(tok[i + 1]) && !t.z.includes('.') && !tok[i + 1].z.includes('.')){
      nimm(); const n = nimm();
      v = BG.durch(v, BG.aus(n.z)); txt = t.z + '/' + n.z; bruch = true;
    }
    let prozent = false;
    if (sieh() && sieh().o === '%'){ nimm(); v = BG.mal(v, [1n, 100n]); prozent = true; txt += ' %'; }
    literale.push({wert: v, prozent, bruch, text: txt});
    zeigen.push(txt);
    return v;
  }
  function produkt(){
    let v = primaer();
    while (sieh() && ['*', ':', '/'].includes(sieh().o)){
      const o = nimm().o; ops++;
      zeigen.push(o === '*' ? ' · ' : ' : ');
      const w = primaer();
      v = o === '*' ? BG.mal(v, w) : BG.durch(v, w);
    }
    return v;
  }
  function summe(){
    let v = produkt();
    while (sieh() && ['+', '-'].includes(sieh().o)){
      const o = nimm().o; ops++;
      zeigen.push(o === '+' ? ' + ' : ' − ');
      const w = produkt();
      v = o === '+' ? BG.plus(v, w) : BG.minus(v, w);
    }
    return v;
  }
  try {
    const wert = summe();
    if (i < tok.length) return null;
    const nurStrich = !tok.some(t => ['*', ':', '/'].includes(t.o) && !(t.o === '/'));
    return {wert, literale, einzeln: ops === 0, text: zeigen.join(''), nurStrich};
  } catch (_){ return null; }
}

const passt = (v, wahr) => Math.abs(v - bZahl(wahr)) * 100 <= BW.toleranz + 1e-9;
/* NEU (Fassung 3.6): Aufgaben mit Anzahlen (A.gesamt, Diabetes): Sind alle
   Zahlen der Rechnung ganze Zahlen ohne % und ohne Bruch, darf das
   Ergebnis auch eine Anzahl von A.gesamt sein («10 + 41» = 51 von 1000). */
const nurAnzahlen = r => r.literale.length && r.literale.every(l => !l.prozent && !l.bruch && !l.text.includes('.'));
/* Welche Deutung des Ergebnisses passt zum wahren Wert? null = keine. */
function deutung(r, wahr, A){
  const v = BG.zahl(r.wert), k = [v, v / 100, v / 10000];
  if (A && A.gesamt && nurAnzahlen(r)) k.push(v / A.gesamt);
  for (const x of k) if (passt(x, wahr)) return x;
  return null;
}

/* ───────── Namen ─────────
   In der RAUTE heissen die Stellen P(Ü), P_Ü(B), P(Ü∩B). In der TAFEL
   heissen sie so, wie man sie dort liest: «Ü/B» (Feld), «Σ Ü»
   (Zeilensumme), «Anteil B in Zeile Ü». Sonst verriete das Protokoll
   schon, welche Stellen in Zug 2 zusammengehoeren. */
const sym = (A, e) => A.namen[e][0];
/* Die P-Bezeichnung einer Stelle: P(Ü), P_Ü(B), P(Ü∩B). */
function pTeile(A, k){
  const s = ST[k];
  if (s.art === 'wurzel') return [{s: 'gesamt'}];
  if (s.art === 'bed') return [{s: 'P'}, {s: sym(A, s.bed), sub: true}, {s: '(' + sym(A, s.ev[0]) + ')'}];
  return [{s: 'P(' + s.ev.map(e => sym(A, e)).join('∩') + ')'}];
}
/* NEU (Fassung 3.5, Punkt 1): Bezeichnungen entstehen lassen. Die
   P-Bezeichnung einer Stelle ist erst sichtbar, wenn sie entdeckt ist:
     S1 Uebungsstunden  je Stelle, sobald ihr Paar in «Finde den Wert»
                        gefunden ist (an beiden Orten zugleich)
     S2 Wuerfel         keine, solange Baum und Tafel nicht vollstaendig
                        sind; danach alle, weil der Vergleich «Haengen A
                        und B zusammen?» sie nennt
     Etappe 2           alle, sobald S1 fertig ist (dort entdeckt)
   PRUEFEN: Etappe 2 mit Bezeichnungen, wenn Etappe 1 fertig ist - Kaspers
   Empfehlung, nicht von Rike entschieden. Ohne S1 bleiben sie weg.
   PRUEFEN: Wuerfel nach dem Ausfuellen beschriftet (wegen des Vergleichs).
   Karten (Etappe 3) und Bilder zum Mitnehmen zeigen immer alle
   Bezeichnungen (_alleNamen). */
let _alleNamen = false;
function namenAn(A, k){
  if (_alleNamen) return true;
  if (A === SIT) return ((stand.bwe1 && stand.bwe1.paare) || []).includes(k);
  if (A === SIT2) return !!(stand.bwe1b && stand.bwe1b.eintraege && vollstaendig(stand.bwe1b));
  return s1fertig();
}
function mitAllenNamen(fn){
  const alt = _alleNamen;
  _alleNamen = true;
  try { return fn(); } finally { _alleNamen = alt; }
}
/* Der Name einer Stelle in Text und Protokoll. In der TAFEL heissen die
   Stellen so, wie man sie dort liest («Ü/B», «Σ Ü», «Anteil B in Zeile
   Ü»), im BAUM P(Ü), P_Ü(B), P(Ü∩B) - dort aber nur, wenn die
   Bezeichnung schon entdeckt ist; sonst leer (GEAENDERT, Fassung 3.5). */
function nameTeile(A, k, wo){
  const s = ST[k];
  if (wo === 't'){
    if (s.art === 'wurzel') return [{s: 'gesamt'}];
    if (s.art === 'rand') return [{s: 'Σ ' + sym(A, s.ev[0])}];
    if (s.art === 'schnitt') return [{s: s.ev.map(e => sym(A, e)).join('/')}];
    return [{s: X_FAM.includes(s.bed) ? `Anteil ${sym(A, s.ev[0])} in Zeile ${sym(A, s.bed)}`
                                      : `Anteil ${sym(A, s.ev[0])} in Spalte ${sym(A, s.bed)}`}];
  }
  if (s.art === 'wurzel') return [{s: 'gesamt'}];
  return namenAn(A, k) ? pTeile(A, k) : [];
}
const teileHtml = tt => tt.map(t => t.sub ? `<sub>${esc(t.s)}</sub>`
  : (t.farbe ? `<span style="color:${t.farbe}">${esc(t.s)}</span>` : esc(t.s))).join('');
const nameHtml = (A, p) => teileHtml(nameTeile(A, kk(p), vw(p)));
// Der Name oder, solange er nicht entdeckt ist, ein Ersatz («Dieses Feld»)
const nameOder = (A, p, ersatz) => nameHtml(A, p) || esc(ersatz);
// «P_Ü(B): » vor einer Rueckmeldung - oder nichts
const vorsatz = (A, p) => { const n = nameHtml(A, p); return n ? n + ': ' : ''; };

/* ───────── Eintraege ───────── */
function werteVon(A, z){
  const w = {};
  z.eintraege.forEach((e, i) => { w[e.p] = Object.assign({nr: i + 1}, e); });
  const eins = {text: einsText(A), fest: true};
  w['r:E'] = eins; w['t:E'] = eins;
  return w;
}

/* Woher kommen die Zahlen einer Rechnung? Jede Zahl der Rechnung wird
   mit den schon eingetragenen Werten verglichen - zuerst in derselben
   Darstellung, dann in der anderen, der juengste Eintrag zuerst. Daraus
   entstehen die Pfeile. Die Wurzel (100 %) zaehlt nicht.
   PRUEFEN: erschlossen, nicht gewaehlt. Stehen zwei Felder mit
   demselben Wert da (beim Wuerfel oft 1/2), kann der Pfeil vom
   «falschen» der beiden kommen. */
function quellenFinden(A, z, p, literale){
  const q = [];
  const kandidaten = [...z.eintraege].reverse().filter(e => e.p !== p);
  // NEU (Fassung 3.3): Beim Wuerfel haben viele Felder denselben Wert
  // (1/6, 2/6, 3/6). Dann gewinnt die Stelle, die mit dem Ziel verwandt
  // ist (gemeinsame Ereignisse), sonst kaeme der Pfeil oft vom falschen
  // Feld - und die Karte in Etappe 3 zeigte einen falschen Weg.
  const evs = k => new Set([...ST[k].ev, ...(ST[k].bed ? [ST[k].bed] : [])]);
  const ziel = evs(kk(p));
  const zb = ST[kk(p)].bed;
  const verwandt = e => {
    const q = [...evs(kk(e.p))];
    return q.filter(x => ziel.has(x)).length - 0.5 * q.filter(x => !ziel.has(x)).length
      + (zb && ST[kk(e.p)].art === 'rand' && ST[kk(e.p)].ev[0] === zb ? 1 : 0);
  };
  kandidaten.sort((a, b) => ((vw(a.p) === vw(p) ? 0 : 1) - (vw(b.p) === vw(p) ? 0 : 1))
                         || (verwandt(b) - verwandt(a)));
  literale.forEach(l => {
    const v = BG.zahl(l.wert), werte = l.prozent || l.bruch ? [v] : [v, v / 100];
    if (A.gesamt && !l.prozent && !l.bruch) werte.push(v / A.gesamt);
    const e = kandidaten.find(e => werte.some(x => passt(x, wahrB(A, kk(e.p)))) && !q.includes(e.p));
    if (e) q.push(e.p);
  });
  return q;
}

/* NEU (Rike 2026-10-17, Zusatz zu Fassung 4.2): Wer in ein Feld, das
   berechnet werden muss, direkt den richtigen Wert tippt, sieht die
   Rechnung trotzdem darunter und kurz die Pfeile - wie bei einer selbst
   eingetragenen Rechnung. Gewaehlt wird die direkteste Rechnung aus den
   Werten, die in DERSELBEN Darstellung schon stehen (sonst kaeme bei den
   Zwei Lostoepfen ein Pfeil aus der anderen Darstellung): zuerst die mit
   den meisten Angaben, dann Produkt am Ast, 1 minus Gegenereignis, Summe,
   Differenz, Quotient. Gibt es mehrere, steht «z. B.» davor.
   Der Vorschlag steht im Eintrag (e.vorschlag = {ausdruck, quellen});
   e.ohne bleibt wahr, gezaehlt wird er nicht als Rechnung. Aeltere Staende
   haben kein e.vorschlag und bleiben, wie sie sind.
   Angaben (gegeben, zaehlbar, gegeben_auch) bekommen keinen Vorschlag. */
const gegenE = e => (e.startsWith('n') ? e.slice(1) : 'n' + e);
function istAngabe(A, k){
  return A.gegeben.includes(k) || (A.zaehlbar || []).includes(k)
    || Object.values(A.gegeben_auch || {}).includes(k);
}
function vorschlagFinden(A, z, p){
  const k = kk(p), v = vw(p), s = ST[k];
  if (k === 'E' || istAngabe(A, k)) return null;
  const da = {};
  z.eintraege.forEach(e => { if (e.p !== p && vw(e.p) === v) da[kk(e.p)] = e; });
  const hat = q => !!da[q];
  const kand = [];   // {rang, q: [Schluessel], art}
  const dazu = (rang, art, q) => { if (q.every(hat)) kand.push({rang, art, q}); };
  if (s.art === 'schnitt'){
    const [x, y] = s.ev;
    dazu(0, 'produkt', [x, x + '_' + y]);
    dazu(0, 'produkt', [y, y + '_' + x]);
    // Differenz: Rand minus das andere Pfadende desselben Randes
    dazu(3, 'differenz', [x, schnittK(x, gegenE(y))]);
    dazu(3, 'differenz', [y, schnittK(gegenE(x), y)]);
  }
  if (s.art === 'rand' || s.art === 'bed'){
    const g = s.art === 'rand' ? gegenE(s.ev[0]) : s.bed + '_' + gegenE(s.ev[0]);
    dazu(1, 'gegen', [g]);
  }
  if (s.art === 'rand'){
    const e = s.ev[0], fam = X_FAM.includes(e) ? Y_FAM : X_FAM;
    dazu(2, 'summe', fam.map(f => schnittK(e, f)));
    // Rand aus Pfadende und Ast: P(X) = P(X∩Y) : P_X(Y)
    fam.forEach(f => dazu(4, 'quotient', [schnittK(e, f), e + '_' + f]));
  }
  if (s.art === 'bed') dazu(4, 'quotient', [schnittK(s.bed, s.ev[0]), s.bed]);
  if (!kand.length) return null;
  const nichtAngabe = c => c.q.filter(q => !istAngabe(A, q)).length;
  kand.sort((a, b) => (nichtAngabe(a) - nichtAngabe(b)) || (a.rang - b.rang));
  const c = kand[0], T = q => da[q].text;
  const ausdruck = c.art === 'produkt' ? `${T(c.q[0])} · ${T(c.q[1])}`
    : c.art === 'gegen' ? einsText(A) + ' − ' + T(c.q[0])
    : c.art === 'summe' ? `${T(c.q[0])} + ${T(c.q[1])}`
    : c.art === 'differenz' ? `${T(c.q[0])} − ${T(c.q[1])}`
    : `${T(c.q[0])} : ${T(c.q[1])}`;
  return {ausdruck: (kand.length > 1 ? 'z. B. ' : '') + ausdruck, quellen: c.q.map(q => v + ':' + q)};
}

/* Was im Feld steht, nachdem es angenommen ist. Prozentaufgaben zeigen
   Prozent, Bruchaufgaben Brueche - bei Summen gleicher Nenner so, wie
   gezaehlt (2/6 + 1/6 = 3/6). */
function anzeige(A, r, wahr, k){
  if (A.anzeige !== 'bruch') return zahlText(bZahl(wahr));
  if (r.einzeln && r.literale[0].bruch) return {text: r.literale[0].text, gerundet: false};
  // NEU (Fassung 3.6): Anzahlen bleiben Anzahlen - Rand und Innenfelder
  // mit dem Nenner der Erhebung (403/1000, nicht gekuerzt).
  if (A.gesamt && A.nenner && ST[k].art !== 'bed'){
    const n = bZahl(wahr) * A.nenner;
    if (Math.abs(n - Math.round(n)) < 1e-9) return {text: `${Math.round(n)}/${A.nenner}`, gerundet: false};
  }
  const nenner = [...new Set(r.literale.filter(l => l.bruch).map(l => l.text.split('/')[1]))];
  if (r.nurStrich && nenner.length === 1){
    const d = BigInt(nenner[0]), [n, dd] = r.wert;
    if ((n * d) % dd === 0n) return {text: `${(n * d) / dd}/${d}`, gerundet: false};
  }
  return {text: bruchText(wahr), gerundet: false};
}

/* Einen Eintrag verarbeiten. Gibt {ok, html} zurueck.
   NEU (Fassung 3.4): `vorgabe` - die angeklickten Ausgangsfelder beim
   Rechnen durch Klicken. Dann sind die Quellen bekannt und werden nicht
   erschlossen (beim Wuerfel kaeme der Pfeil sonst oft vom falschen Feld). */
function eintragVerarbeiten(A, z, p, txt, vorgabe){
  const k = kk(p);
  const r = auswerten(txt);
  // GEAENDERT (Fassung 3.6): Grund d «nicht lesbar», Wortlaut aus thema.md
  if (!r) return {ok: false, art: 'd', html: 'Diese Eingabe verstehe ich nicht. Schreiben Sie z. B. '
    + (A.gesamt ? '10 oder 10 : 51.' : A.anzeige === 'bruch' ? '2/6 oder 2/6 + 1/6.'
       : ANZ === 'prozent' ? '70 % oder 70 % · 85 %.' : '0.7 oder 0.7 · 0.85.')};
  const wahr = wahrB(A, k);
  if (deutung(r, wahr, A) === null){
    const v = BG.zahl(r.wert);
    // FEHLERBEHOBEN (Fassung 3.4): «0.7 + 0.85» meldete «ergibt 0.0155»,
    // weil jedes Ergebnis ueber 1 als Prozentzahl gelesen wurde. Ursache:
    // Die Regel stammt aus der Prozentzeit. Jetzt nur noch, wenn alle Zahlen
    // der Rechnung wie Prozentzahlen aussehen (70, 85 - ohne %, groesser 1).
    const wieProzent = r.literale.length && r.literale.every(l => !l.prozent && !l.bruch && BG.zahl(l.wert) > 1);
    const was = A.anzeige === 'bruch' ? bruchText(r.wert.map(Number)) : zahlText(v > 1 && wieProzent ? v / 100 : v).text;
    // GEAENDERT (Fassung 3.6): Grund a «Wert falsch»
    return {ok: false, art: 'a', html: `${vorsatz(A, p)}${r.einzeln ? 'Das' : 'Diese Rechnung ergibt ' + esc(was) + ' — das'} passt hier nicht. Wessen Anteil steht an dieser Stelle?`};
  }
  const a = anzeige(A, r, wahr, k);
  const e = {p, ausdruck: r.text, text: a.text, ungefaehr: a.gerundet && !r.einzeln,
             ohne: r.einzeln, quellen: r.einzeln ? [] : (vorgabe && vorgabe.length ? vorgabe.slice() : quellenFinden(A, z, p, r.literale))};
  // NEU (Rike 2026-10-17): direkter Wert in einem Rechenfeld - Vorschlag
  if (r.einzeln){ const vs = vorschlagFinden(A, z, p); if (vs) e.vorschlag = vs; }
  const alt = z.eintraege.findIndex(x => x.p === p);
  if (alt >= 0){ z.eintraege[alt] = e; return {ok: true, nr: alt + 1, nachgetragen: true}; }
  z.eintraege.push(e);
  return {ok: true, nr: z.eintraege.length};
}

function protokollTeile(A, e, nr){
  // GEAENDERT (Fassung 3.5): ohne entdeckte Bezeichnung nur die Rechnung
  const n = nameTeile(A, kk(e.p), vw(e.p)), vor = n.length ? [...n, {s: ' = '}] : [];
  // NEU (Rike 2026-10-17): ein direkter Wert mit Vorschlag zeigt die Rechnung
  if (e.ohne && e.vorschlag) return [{s: nr + ' · '}, ...vor, {s: e.vorschlag.ausdruck + ' = ' + e.text}];
  if (e.ohne) return [{s: nr + ' · '}, ...vor, {s: e.text}];
  return [{s: nr + ' · '}, ...vor, {s: e.ausdruck + (e.ungefaehr ? ' ≈ ' : ' = ') + e.text}];
}
/* GEAENDERT (Fassung 3.2, Punkt 3): Das Protokoll ist einklappbar und
   standardmaessig zu. Ob es offen ist, gilt nur fuer diese Sitzung (E). */
function protokollHtml(A, z){
  const n = z.eintraege.length;
  return `<details class="bwprotokoll" id="bwprot"${E && E.protOffen ? ' open' : ''}><summary>Rechenprotokoll (${n} ${n === 1 ? 'Eintrag' : 'Einträge'})</summary>` + (n
    ? '<ol>' + z.eintraege.map((e, i) => {
        const t = protokollTeile(A, e, i + 1);
        return `<li data-i="${i}" title="Pfeil zeigen"><b class="nr">${i + 1}</b> ${teileHtml(t.slice(1))} <span class="wo">(${WO[vw(e.p)]})</span>`
          + (e.ohne && !e.vorschlag ? ' <span class="ohne">ohne Rechnung</span>' : '') + '</li>';
      }).join('') + '</ol>'
    : '<div class="leer">Noch nichts eingetragen.</div>') + '</details>';
}
/* Das Protokoll auf- oder zuklappen: Merken und das Brett neu einpassen. */
function protokollHaken(kopf){
  // NEU (Fassung 3.4, Punkt 2): Klick auf eine Zeile zeigt ihren Pfeil.
  kopf.querySelectorAll('#bwprot li[data-i]').forEach(li =>
    li.addEventListener('click', () => pfeilZeigen(+li.dataset.i)));
  const d = kopf.querySelector('#bwprot');
  if (d) d.addEventListener('toggle', () => {
    if (E.protOffen === d.open) return;
    E.protOffen = d.open;
    if (window._neuzeichnen) window._neuzeichnen();
  });
}

/* NEU (Fassung 3.2, Punkt 4): Die Buehne dieses Kapitels. Die gemeinsame
   buehne() wird benutzt (Leiste, Loesung, Bild sichern bleiben, wie sie
   sind); die linke Haelfte wird ausgeblendet, oben kommt die Kopfzeile
   mit Situation und Auftrag (#bwkopf). Zugwahl und Aufgabenwahl stehen
   in der Auftragsleiste (#bwreiter). */
function bwBuehne(e, titel, leiste){
  buehne({rolle: e.rolle, rang: e.rang, titel, text: '<span class="bwreiter" id="bwreiter"></span>'},
    '', 'Doppelbaum und Vierfeldertafel', leiste,
    '<div class="bwkopf" id="bwkopf"></div>', null, [0.0001, 1]);
  const b = document.querySelector('#buehne .buehne');
  if (b) b.classList.add('bwnur');
}
function namenZeile(A){
  return '<div class="namen">' + ['X', 'nX', 'Y', 'nY'].map(e => `<b>${esc(sym(A, e))}</b> ${esc(A.namen[e][1])}`).join(' · ') + '</div>';
}

/* ───────── NEU (FASSUNG 4.1 «Uebersicht», Rike 2026-10-17) ─────────
   «Die Aufgaben/Situationen werden nicht prominent und auffaellig genug
   angezeigt. [...] Ggf. koennten wir dort auch die wichtigen Werte
   markieren lassen.»
   Die Situation als eigene Karte ganz oben, mit Textmarker wie in
   Kapitel 7 (bernoulli/etappen.js: Stift waehlen, ueber den Text streichen
   oder Woerter anklicken, Radierer). Stifte: «Angabe», in Etappe 2 dazu
   «gesucht». Freiwillig, nicht geprueft. Die Markierungen stehen im
   Stand (stand.bwmark, je Aufgabe und Textstueck), der gewaehlte Stift
   nur in der Sitzung (E.stift). */
const MK_ARTEN = ['angabe', 'gesucht'];
const MK_NAME = {angabe: 'Angabe', gesucht: 'gesucht'};
function mkStuecke(text){
  // \p{M}: Ueberstriche (K̄) gehoeren zum Wort
  const re = /(\d+(?:[.,]\d+)?(?:[\s ]?%)?)|([\p{L}\p{M}\-]+)|(\s+)|(.)/gu;
  let m, i = 0, html = '';
  while ((m = re.exec(text))){
    if (m[1] || m[2]) html += `<span class="w" data-i="${i++}">${esc(m[0])}</span>`;
    else if (m[3]) html += `<span class="ws">${m[0]}</span>`;
    else html += esc(m[0]);
  }
  return html;
}
function mkMalen(el, marken){
  const kn = [...el.children];
  kn.forEach(x => MK_ARTEN.forEach(a => x.classList.remove('m-' + a)));
  kn.forEach((x, j) => {
    if (x.classList.contains('w')){
      const a = marken[x.dataset.i];
      if (a) x.classList.add('m-' + a);
    } else if (x.classList.contains('ws')){
      const v = kn[j - 1], n = kn[j + 1];
      if (v && n && v.classList.contains('w') && n.classList.contains('w')){
        const a = marken[v.dataset.i];
        if (a && a === marken[n.dataset.i]) x.classList.add('m-' + a);
      }
    }
  });
}
/* NEU (Rike 2026-10-18, thema.md «Situationskarte groesser und huebscher»):
   Die Karte steht ueber die ganze Breite, zart in der Kapitelfarbe
   hinterlegt, links ein Balken und ein kleines Bild (das Startbild).
   Name in der Titelschrift, Text gross mit Leuchtstift, die Frage fett in
   der Kapitelfarbe, darunter der Auftragssatz mit dem Knopf «☰ Auftrag»
   (bis dahin in der Kopfleiste). Einklappbar auf eine Zeile mit Name und
   Frage (ohne Frage: Name und Auftrag). Gleich gebaut wie in Kapitel 6
   (zufallsgroessen/etappen.js, zgrKarte), nur die Farbe ist anders.
   GEAENDERT (FASSUNG 4.3, 2026-10-18): ein Bild nur, wo es passt (A.bild
   aus flaeche.py: die Lostoepfe, sonst bilder/situationen/kap5_<id>.png,
   falls vorhanden). Ohne Bild steht der Text buendig links.
   Ob die Karte zu ist, merkt nur die Sitzung (E.skZu, je Aufgabe); der
   Stand bleibt unberuehrt. Ohne eigene Wahl klappt sie nach dem ersten
   Eintrag von selbst zu, wenn das Brett sonst zu wenig Hoehe haette
   (karteHaken).
   o: {titel (HTML), frage (bool), stifte: ['angabe', ...], auftrag (Text),
       nr (Etappe), getan (bool: schon ein Eintrag)} */
function situationKarte(A, o){
  // NEU (FASSUNG 4.4): ohne Stifte (Etappe 3) keine Markierleiste
  const stifte = !o.stifte.length ? '' : `<span class="bwstifte" role="toolbar" aria-label="Textmarker"
      title="Freiwillig: Stift wählen, dann über den Text streichen oder Wörter anklicken.">
    <span class="was">Markieren:</span>
    ${o.stifte.map(a => `<button type="button" class="m-${a}" data-stift="${a}" aria-pressed="${E.stift === a}" title="Stift «${MK_NAME[a]}»">${MK_NAME[a]}</button>`).join('')}
    <button type="button" class="weg" data-stift="weg" aria-pressed="${E.stift === 'weg'}" title="Radierer">Radierer</button></span>`;
  if (!E.skZu) E.skZu = {};
  const zu = E.skZu[A.id] === true;
  const kurz = o.frage ? A.frage : (o.auftrag || '');
  return `<div class="bwskarte${zu ? ' zu' : ''}" role="region" aria-label="Situation" data-sk="${esc(A.id)}" data-getan="${o.getan ? 1 : 0}">
    ${A.bild ? `<img class="bwsbild" src="${esc(A.bild)}" alt="" aria-hidden="true">` : ''}
    <div class="bwsinhalt">
      <div class="bwskopf"><span class="bwstitel">${o.titel}</span><span class="bwskurz">${esc(kurz)}</span>${stifte}
        <span class="bwsnurzu">${AUFTRAG_KNOPF}</span>
        <button type="button" class="bwsklapp" aria-expanded="${!zu}">${zu ? 'Situation zeigen' : 'Situation einklappen'}</button></div>
      <div class="bwsganz">
        <p class="bwstext" data-mk="${esc(A.id)}:t">${mkStuecke(A.text)}</p>
        ${o.frage ? `<p class="bwsfrage" data-mk="${esc(A.id)}:f">${mkStuecke(A.frage)}</p>` : ''}
        ${namenZeile(A)}
        ${o.auftrag ? `<div class="bwsauftrag"><p><span class="was">Auftrag:</span>${esc(o.auftrag)}</p>${AUFTRAG_KNOPF}</div>` : ''}
      </div>
    </div></div>`;
}
/* Einklappen von Hand und von selbst. Die Karte klappt von selbst zu,
   wenn schon ein Eintrag da ist, niemand selbst gewaehlt hat und unter dem
   Kopf weniger als BRETT_PLATZ px fuer das Brett blieben (bei 1280 x 800 nach dem
   ersten Eintrag immer, auf grossen Schirmen nicht). `neu` zeichnet
   die Etappe neu (das Brett passt sich der Hoehe an). */
const BRETT_PLATZ = 560;
function karteHaken(kopf, nr, neu){
  const k = kopf.querySelector('.bwskarte');
  if (!k) return;
  const id = k.dataset.sk;
  auftragKnopfHaken(k, nr);
  const kn = k.querySelector('.bwsklapp');
  const setzen = zu => {
    k.classList.toggle('zu', zu);
    kn.textContent = zu ? 'Situation zeigen' : 'Situation einklappen';
    kn.setAttribute('aria-expanded', String(!zu));
  };
  kn.onclick = ev => { ev.stopPropagation(); E.skZu[id] = !k.classList.contains('zu'); setzen(E.skZu[id]); neu(); };
  // Eingeklappt: ein Klick auf die Zeile oeffnet sie wieder.
  k.querySelector('.bwskopf').addEventListener('click', ev => {
    if (!k.classList.contains('zu') || ev.target.closest('button')) return;
    E.skZu[id] = false; setzen(false); neu();
  });
  if (E.skZu[id] === undefined && k.dataset.getan === '1'){
    const unten = kopf.getBoundingClientRect().bottom;
    if (innerHeight - unten < BRETT_PLATZ){ E.skZu[id] = true; setzen(true); }
  }
}
function markerHaken(kopf){
  if (!stand.bwmark || typeof stand.bwmark !== 'object') stand.bwmark = {};
  const M = stand.bwmark;
  const stiftSetzen = () => {
    document.body.classList.toggle('bw-stift-an', !!E.stift);
    kopf.querySelectorAll('.bwstifte button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.stift === E.stift)));
  };
  kopf.querySelectorAll('.bwstifte button').forEach(b => b.onclick = () => {
    E.stift = E.stift === b.dataset.stift ? null : b.dataset.stift;
    stiftSetzen();
  });
  // Ein Stift, den es hier nicht gibt (gesucht in Etappe 1), gilt nicht.
  if (E.stift && !kopf.querySelector(`.bwstifte button[data-stift="${E.stift}"]`)) E.stift = null;
  stiftSetzen();
  kopf.querySelectorAll('[data-mk]').forEach(text => {
    const key = text.dataset.mk;
    mkMalen(text, M[key] || {});
    text.addEventListener('pointerdown', e => {
      const stift = E.stift;
      if (!stift) return;          // ohne Stift: gewoehnlicher Text
      e.preventDefault();
      const vorher = Object.assign({}, M[key] || {});
      const w0 = e.target.closest('.w');
      let start = w0 ? +w0.dataset.i : null, ende = start, bewegt = false;
      const anwenden = () => {
        const m = Object.assign({}, vorher);
        if (start !== null){
          const a = Math.min(start, ende), b = Math.max(start, ende);
          // Ein Klick mit demselben Stift auf ein markiertes Stueck nimmt die Farbe weg.
          if (a === b && !bewegt && vorher[a] === stift) delete m[a];
          else for (let i = a; i <= b; i++){ if (stift === 'weg') delete m[i]; else m[i] = stift; }
        }
        M[key] = m; mkMalen(text, m);
      };
      anwenden();
      const zug = ev => {
        const t = document.elementFromPoint(ev.clientX, ev.clientY);
        const w = t && t.closest ? t.closest('.w') : null;
        if (!w || !text.contains(w)) return;
        const i = +w.dataset.i;
        if (start === null) start = i;
        if (i !== start) bewegt = true;
        if (i !== ende){ ende = i; anwenden(); }
      };
      const fertig = () => {
        window.removeEventListener('pointermove', zug);
        window.removeEventListener('pointerup', fertig);
        window.removeEventListener('pointercancel', fertig);
        sichern();
      };
      window.addEventListener('pointermove', zug);
      window.addEventListener('pointerup', fertig);
      window.addEventListener('pointercancel', fertig);
    });
  });
}
/* Die schmale Schrittleiste (1 · 2 · 3) ueber dem Brett. schritte: [{t,
   ok, jetzt, tip}]. `det` ist der Detailtext (aufklappbar, offen solange
   nichts getan ist - wie die Anleitung seit Fassung 3.5; E.anlOffen merkt
   die eigene Wahl). `stat` steht rechts daneben (Zaehler, Weiter-Knopf). */
function schrittLeiste(schritte, det, stat, getan){
  // Im kleinen Fenster (etwa 800 x 570) zuerst zu: Baum und Tafel brauchen
  // die Hoehe; die Details stehen dann im title der Schritte und im Aufklapper.
  const klein = window.matchMedia && matchMedia('(max-height:700px), (max-width:900px)').matches;
  const offen = det && (E.anlOffen === undefined ? !getan && !klein : E.anlOffen);
  const chips = schritte.map((s, i) => (i ? '<span class="pt">·</span>' : '')
    + `<span class="st${s.ok ? ' fertig' : s.jetzt ? ' jetzt' : ''}"${s.tip ? ` title="${esc(s.tip)}"` : ''}>${s.ok ? '✓ ' : ''}${s.t}</span>`).join('');
  return `<div class="bwsrow">` + (det
    ? `<details class="bwsbar" id="bwanl" data-war="${offen}"${offen ? ' open' : ''}><summary>${chips}<span class="auf">Details</span></summary><div class="bwsdet">${det}</div></details>`
    : `<div class="bwsbar"><div style="display:flex;flex-wrap:wrap;align-items:center;gap:4px">${chips}</div></div>`)
    + (stat ? `<div class="bwsstat">${stat}</div>` : '') + '</div>';
}
/* ───────── NEU (FASSUNG 4.2, Rike 2026-10-17): Auftragsfenster ─────────
   «In Etappe 1 (und 2) muss sehr deutlich der Auftrag dastehen. Das darf
   auch ein Popup sein, das direkt erscheint, wenn die Seite geoeffnet
   wird, und dann geschlossen wird.»
   Beim ersten Oeffnen jeder Etappe erscheint das Fenster von selbst; zu
   mit «Los geht's», × oder Escape. Danach oeffnet der Knopf «Auftrag» in
   der Kopfleiste (#bwreiter) es wieder.
   Stand: stand.bwauftrag = {1: true, 2: true} - gesehen je Etappe. Ein
   aelterer Stand hat das Feld nicht; er bleibt, wie er ist, und zeigt das
   Fenster einmal. Die Schritte passen zur Schrittleiste (e1links,
   e2links) und zu ANZ (Beispielzahlen). */
const AUFTRAG_KNOPF = '<button type="button" class="bwauftragknopf" data-auftrag title="Den Auftrag dieser Etappe noch einmal zeigen">Auftrag</button>';
function auftragKnopfHaken(reiterEl, nr){
  reiterEl.querySelectorAll('[data-auftrag]').forEach(b => b.onclick = ev => { ev.stopPropagation(); auftragFenster(nr); });
}
function auftragHtml(nr){
  const bsp = ANZ === 'prozent' ? ['70 %', '85 %', '59.5 %'] : ['0.7', '0.85', '0.595'];
  if (nr === 1) return `<h2 id="bwfenstertitel">Auftrag · Etappe 1</h2>
    <p class="satz">${esc(D.etappen[0].auftrag)}</p>
    <ol>
      <li>Lesen Sie die Situation und markieren Sie die Werte <span class="bsp">(Stift «Angabe»)</span>.</li>
      <li>Tragen Sie die Angaben in den Baum oder in die Tafel ein. <span class="bsp">Bei «${esc(label(SIT2))}» zählen Sie ab, z. B. «2/6».</span></li>
      <li>Berechnen Sie die übrigen Felder: <b>die Rechnung</b> ins leere Feld. <span class="bsp">Z. B. ${bsp[0]} · ${bsp[1]} – im Feld steht dann ${bsp[2]}.</span></li>
      <li>Zeichnen Sie den Weg in der zweiten Darstellung nach: Füllen Sie Baum und Tafel je für sich ganz aus.</li>
    </ol>
    <p class="schluss">Am Schluss: ${esc(BW.schlussfrage.frage)}</p>`;
  // NEU (FASSUNG 4.3, ersetzt mit FASSUNG 4.4): Etappe 3, freiwillig, zwei Teile
  if (nr === 3){
    const S1 = E3.teil1[0], st = S1.saetze.find(x => x.ziel !== 'unklar');
    return `<h2 id="bwfenstertitel">Auftrag · Etappe 3 <span class="frei">freiwillig</span></h2>
    <p class="satz">${esc(D.etappen[2].auftrag)}</p>
    <ol>
      <li><b>Teil 1 · Wohin gehört der Satz?</b> Zwei neue Situationen, je ${S1.saetze.length} Sätze mit Zahlen. Klicken Sie einen Satz an, dann das Feld im Baum oder in der Tafel, zu dem er gehört. <span class="bsp">Z. B. «${esc(st.text)}»</span></li>
      <li>Fragen Sie bei jedem Satz: Wer ist hier das Ganze – von welcher Gruppe ist die Rede?</li>
      <li>Fehlt die Gruppe, gehört der Satz auf «${esc(E3.unklar)}».</li>
      <li><b>Teil 2 · Ändert die Bedingung etwas?</b> Vier Kärtchen auf «${esc(E3.stapel2[0].name)}» oder «${esc(E3.stapel2[1].name)}». Abgelegt zeigt jedes Kärtchen beide Werte.</li>
    </ol>
    <p class="schluss">Gerechnet wird hier nicht. Liegt alles, zeigt der Knopf «Eine mögliche Sicht».</p>`;
  }
  const ein = aufgabe(BW.pflicht[0]);
  return `<h2 id="bwfenstertitel">Auftrag · Etappe 2</h2>
    <p class="satz">${esc(D.etappen[1].auftrag)}</p>
    <ol>
      <li>Zuerst «${esc(label(ein))}», dann ${BW.mindestens === 2 ? 'zwei' : BW.mindestens} weitere nach Wahl <span class="bsp">(«${esc(BW.menues.skript)}» oder «${esc(BW.menues.neu)}»)</span>.</li>
      <li>Tragen Sie ein, was gegeben ist.</li>
      <li>Markieren Sie mit <b>?</b>, was gesucht ist: <span class="bsp">am gesuchten Feld auf das kleine ? klicken.</span></li>
      <li>Rechnen Sie nur, was Sie für das ? brauchen.</li>
    </ol>
    <p class="schluss">«${esc(label(ein))}» lösen Sie in beiden Darstellungen: einmal im Baum, einmal in der Tafel – mit Anleitung oder selbstständig, Sie wählen.</p>`;
}
function auftragFenster(nr){
  const alt = document.getElementById('bwfenster');
  if (alt) alt.remove();
  const vorher = document.activeElement;
  const f = document.createElement('div');
  f.className = 'bwfenster'; f.id = 'bwfenster';
  f.innerHTML = `<div class="kasten" role="dialog" aria-modal="true" aria-labelledby="bwfenstertitel">
    <button type="button" class="zu" aria-label="Schliessen" title="Schliessen">×</button>
    ${auftragHtml(nr)}
    <div class="unten"><button type="button" class="knopf los">Los geht's</button></div></div>`;
  const zu = () => {
    f.remove();
    document.removeEventListener('keydown', taste, true);
    const kn = document.querySelector('.bwskarte [data-auftrag]');
    if (vorher && vorher.isConnected && vorher !== document.body) vorher.focus();
    else if (kn) kn.focus();
  };
  // Escape schliesst nur das Fenster (Fangphase, damit nichts anderes reagiert)
  const taste = ev => {
    if (!f.isConnected){ document.removeEventListener('keydown', taste, true); return; }
    if (ev.key === 'Escape'){ ev.preventDefault(); ev.stopPropagation(); zu(); }
    else if (ev.key === 'Tab'){
      // Fokus im Fenster halten
      const kn = [...f.querySelectorAll('button')], i = kn.indexOf(document.activeElement);
      ev.preventDefault();
      kn[(i + (ev.shiftKey ? kn.length - 1 : 1)) % kn.length].focus();
    }
  };
  document.addEventListener('keydown', taste, true);
  f.querySelector('.zu').onclick = zu;
  f.querySelector('.los').onclick = zu;
  f.addEventListener('pointerdown', ev => { if (ev.target === f) zu(); });
  // Im Buehnenbereich: ein Etappenwechsel ersetzt #buehne und nimmt das Fenster mit.
  (document.getElementById('buehne') || document.body).appendChild(f);
  f.querySelector('.los').focus();
}
function auftragBeimOeffnen(nr){
  if (!stand.bwauftrag || typeof stand.bwauftrag !== 'object') stand.bwauftrag = {};
  if (stand.bwauftrag[nr]) return;
  stand.bwauftrag[nr] = true;
  sichern();
  auftragFenster(nr);
}

/* Das Rechenprotokoll unter dem Brett (#bwprotbox, von brettBauen
   angelegt). Nach einem Eintrag nur den Inhalt erneuern. */
function protokollAuffrischen(A, z){
  const box = document.getElementById('bwprotbox');
  if (!box) return;
  box.innerHTML = protokollHtml(A, z);
  protokollHaken(box);
}

/* Nur die Eintraege, die zu einer Stelle hinfuehren (ueber die
   erschlossenen Quellen) - fuer die Karte aus Etappe 1. */
function wegZu(z, zielP){
  const nimm = new Set();
  const suche = p => {
    const i = z.eintraege.findIndex(e => e.p === p);
    if (i < 0 || nimm.has(i)) return;
    nimm.add(i);
    z.eintraege[i].quellen.forEach(suche);
  };
  suche(zielP);
  return z.eintraege.filter((_, i) => nimm.has(i));
}

/* ───────── Zeichnen: eine Szene, zwei Ausgaben ─────────
   Raute und Tafel als Liste einfacher Stuecke, daraus SVG (Schirm,
   Karte) und Leinwand (Bild zum Mitnehmen) - EINE Geometrie. Auf dem
   Brett liegt die Szene als <img> mit SVG-Datenadresse, damit auch
   «Stand als Bild sichern» sie mitnimmt. */
function pfeilGeo(t){
  const dx = t.x1 - t.x0, dy = t.y1 - t.y0, l = Math.hypot(dx, dy) || 1;
  const ux = dx / l, uy = dy / l;
  const kurz = (r, cx, cy) => {        // Abstand bis zum Rand einer Ellipse
    if (!r) return 0;
    const [hw, hh] = r;
    return 1 / Math.sqrt((cx / hw) ** 2 + (cy / hh) ** 2);
  };
  const a = kurz(t.r0, ux, uy) + 2, b = kurz(t.r1, ux, uy) + 3;
  const x0 = t.x0 + ux * a, y0 = t.y0 + uy * a, x1 = t.x1 - ux * b, y1 = t.y1 - uy * b;
  const bog = (t.bogen || 0) * Math.hypot(x1 - x0, y1 - y0);
  const cx = (x0 + x1) / 2 - uy * bog, cy = (y0 + y1) / 2 + ux * bog;
  const tx = x1 - cx, ty = y1 - cy, tl = Math.hypot(tx, ty) || 1;
  const k = t.kopf || 8, vx = tx / tl, vy = ty / tl;
  const kopf = [[x1, y1], [x1 - vx * k - vy * k * 0.5, y1 - vy * k + vx * k * 0.5],
                [x1 - vx * k + vy * k * 0.5, y1 - vy * k - vx * k * 0.5]];
  const mx = 0.25 * x0 + 0.5 * cx + 0.25 * x1, my = 0.25 * y0 + 0.5 * cy + 0.25 * y1;
  return {x0, y0, cx, cy, x1, y1, kopf, mx, my};
}

function svgAus(teile, w, h){
  const e = esc;
  let o = `<svg xmlns="${SVGNS}" viewBox="0 0 ${w.toFixed(1)} ${h.toFixed(1)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}">`;
  teile.forEach(t => {
    if (t.t === 'linie')
      o += `<line x1="${t.x1}" y1="${t.y1}" x2="${t.x2}" y2="${t.y2}" stroke="${t.farbe}" stroke-width="${t.breite}" stroke-linecap="round"${t.strich ? ` stroke-dasharray="${t.strich.join(' ')}"` : ''}/>`;
    else if (t.t === 'kreis')
      o += `<circle cx="${t.x}" cy="${t.y}" r="${t.r}" fill="${t.fuell || 'none'}" stroke="${t.rand || 'none'}" stroke-width="${t.breite || 0}"/>`;
    else if (t.t === 'rechteck')
      o += `<rect x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" rx="${t.r || 0}" fill="${t.fuell || 'none'}" stroke="${t.rand || 'none'}" stroke-width="${t.breite || 0}"${t.strich ? ` stroke-dasharray="${t.strich.join(' ')}"` : ''}/>`;
    else if (t.t === 'pfeil'){
      const p = pfeilGeo(t);
      o += `<path d="M${p.x0.toFixed(1)},${p.y0.toFixed(1)} Q${p.cx.toFixed(1)},${p.cy.toFixed(1)} ${p.x1.toFixed(1)},${p.y1.toFixed(1)}" fill="none" stroke="${t.farbe}" stroke-width="${t.breite}" stroke-opacity=".9"${t.strich ? ` stroke-dasharray="${t.strich.join(' ')}"` : ''}/>`;
      o += `<polygon points="${p.kopf.map(q => q.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${t.farbe}"/>`;
      if (t.nr){
        const r = t.nrgross || 7;
        o += `<circle cx="${p.mx.toFixed(1)}" cy="${p.my.toFixed(1)}" r="${r}" fill="#fff" stroke="${t.farbe}" stroke-width="1.4"/>`;
        o += `<text x="${p.mx.toFixed(1)}" y="${p.my.toFixed(1)}" font-size="${r * 1.35}" font-family="${e(SCHRIFT)}" text-anchor="middle" dominant-baseline="central" fill="${t.farbe}" font-weight="700">${t.nr}</text>`;
      }
    } else if (t.t === 'text'){
      const g = t.gross, anker = t.anker || 'middle';
      const hof = t.hof ? ` stroke="${F.papier}" stroke-width="${(g * 0.3).toFixed(1)}" paint-order="stroke" stroke-linejoin="round"` : '';
      o += `<text x="${t.x}" y="${t.y}" font-size="${g}" font-family="${e(SCHRIFT)}" text-anchor="${anker}" dominant-baseline="central" fill="${t.farbe || F.tinte}" font-weight="${t.fett ? 700 : 400}"${hof}>`;
      let tief = false;
      (t.teile || [{s: t.s}]).forEach(st => {
        const fa = st.farbe ? ` fill="${st.farbe}"` : '';
        if (st.sub && !tief){ o += `<tspan font-size="${(g * 0.72).toFixed(1)}" dy="${(g * 0.3).toFixed(1)}"${fa}>${e(st.s)}</tspan>`; tief = true; }
        else if (!st.sub && tief){ o += `<tspan dy="${(-g * 0.3).toFixed(1)}"${fa}>${e(st.s)}</tspan>`; tief = false; }
        else o += `<tspan${st.sub ? ` font-size="${(g * 0.72).toFixed(1)}"` : ''}${fa}>${e(st.s)}</tspan>`;
      });
      o += '</text>';
    }
  });
  return o + '</svg>';
}
const svgUrl = svg => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

function textAufLeinwand(g, t){
  const gr = t.gross, teile = t.teile || [{s: t.s}];
  const font = (sub) => `${t.fett ? '700 ' : ''}${sub ? gr * 0.72 : gr}px ${SCHRIFT}`;
  const breiten = teile.map(st => { g.font = font(st.sub); return g.measureText(st.s).width; });
  const ganz = breiten.reduce((a, b) => a + b, 0);
  let x = t.anker === 'start' ? t.x : t.anker === 'end' ? t.x - ganz : t.x - ganz / 2;
  g.textBaseline = 'middle'; g.textAlign = 'left';
  teile.forEach((st, i) => {
    g.font = font(st.sub);
    const y = t.y + (st.sub ? gr * 0.3 : 0);
    if (t.hof){ g.lineWidth = gr * 0.3; g.strokeStyle = F.papier; g.lineJoin = 'round'; g.strokeText(st.s, x, y); }
    g.fillStyle = st.farbe || t.farbe || F.tinte;
    g.fillText(st.s, x, y);
    x += breiten[i];
  });
  return ganz;
}

function aufLeinwand(g, teile){
  teile.forEach(t => {
    g.save();
    if (t.t === 'linie'){
      g.beginPath(); g.moveTo(t.x1, t.y1); g.lineTo(t.x2, t.y2);
      g.strokeStyle = t.farbe; g.lineWidth = t.breite; g.lineCap = 'round';
      g.setLineDash(t.strich || []); g.stroke();
    } else if (t.t === 'kreis'){
      g.beginPath(); g.arc(t.x, t.y, t.r, 0, Math.PI * 2);
      if (t.fuell){ g.fillStyle = t.fuell; g.fill(); }
      if (t.rand){ g.strokeStyle = t.rand; g.lineWidth = t.breite || 1; g.stroke(); }
    } else if (t.t === 'rechteck'){
      g.beginPath();
      if (g.roundRect) g.roundRect(t.x, t.y, t.w, t.h, t.r || 0); else g.rect(t.x, t.y, t.w, t.h);
      if (t.fuell){ g.fillStyle = t.fuell; g.fill(); }
      if (t.rand){ g.strokeStyle = t.rand; g.lineWidth = t.breite || 1; g.setLineDash(t.strich || []); g.stroke(); }
    } else if (t.t === 'pfeil'){
      const p = pfeilGeo(t);
      g.beginPath(); g.moveTo(p.x0, p.y0); g.quadraticCurveTo(p.cx, p.cy, p.x1, p.y1);
      g.strokeStyle = t.farbe; g.lineWidth = t.breite; g.setLineDash(t.strich || []); g.stroke();
      g.setLineDash([]);
      g.beginPath(); g.moveTo(...p.kopf[0]); g.lineTo(...p.kopf[1]); g.lineTo(...p.kopf[2]);
      g.closePath(); g.fillStyle = t.farbe; g.fill();
      if (t.nr){
        const r = t.nrgross || 7;
        g.beginPath(); g.arc(p.mx, p.my, r, 0, Math.PI * 2);
        g.fillStyle = '#fff'; g.fill(); g.strokeStyle = t.farbe; g.lineWidth = 1.4; g.stroke();
        textAufLeinwand(g, {x: p.mx, y: p.my, s: String(t.nr), gross: r * 1.35, farbe: t.farbe, fett: true});
      }
    } else if (t.t === 'text') textAufLeinwand(g, t);
    g.restore();
  });
}


/* Die Farbe einer Stelle - erst, wenn sie in Etappe 1, Zug 2 gefunden ist
   (Fassung 3.1, Punkt 7; seit Fassung 3.4 «Finde den Wert», nach der
   letzten Frage sind alle Stellen gefaerbt). Danach bleibt sie, auch in
   Etappe 2. stand.bwe1.paare heisst aus Kompatibilitaet weiter so. */
function farbeVonStand(k){ return farbeVon(k); }
function farbeVon(k){
  const paare = new Set((stand.bwe1 && stand.bwe1.paare) || []);
  if (!paare.has(k)) return '';
  const s = ST[k];
  if (s.art === 'wurzel') return 'grau';
  if (s.art === 'schnitt') return 'gelb';
  if (s.art === 'rand') return X_FAM.includes(k) ? 'gruen' : 'blau';
  return X_FAM.includes(s.bed) ? 't-gruen' : 't-blau';
}
const FUELL = {gelb: F.gelb, gruen: F.gruenHell, blau: F.blauHell, grau: F.grauHell};
const RAND = {gelb: F.gelbRand, gruen: F.gruen, blau: F.blau, grau: '#b0a898', 't-gruen': F.gruen, 't-blau': F.blau};
// GEAENDERT (Fassung 3.5, Punkt 3): keine Kategorienamen mehr («erster Ast
// rechts», «Spaltensumme» ...). Die Legende zeigt nur die Farben, je mit
// den Bezeichnungen, die diese Farbe tragen.
const FARBFOLGE = ['gelb', 'gruen', 'blau', 't-gruen', 't-blau'];

/* Halbe Breite und Hoehe einer Stelle in px, je Massstab. */
function stellenMasse(s, p){
  const art = ST[kk(p)].art;
  if (vw(p) === 't'){
    if (art === 'bed') return [Math.min(30, Math.max(18, 5.0 * s)), Math.min(13, Math.max(9, 2.5 * s))];
    return [Math.min(40, Math.max(22, 6.3 * s)), Math.min(15, Math.max(10, 2.8 * s))];
  }
  if (art === 'schnitt') return [Math.min(46, Math.max(27, 6.6 * s)), Math.min(17, Math.max(11, 3.0 * s))];
  if (art === 'wurzel') return [Math.min(28, Math.max(18, 4.2 * s)), Math.min(13, Math.max(10, 2.2 * s))];
  return [Math.min(38, Math.max(23, 5.5 * s)), Math.min(14, Math.max(10, 2.3 * s))];
}

function ortPx(p, o, i){
  const k = kk(p);
  if (vw(p) === 't'){ const [x, y] = TAF.orte[k]; return [o.tx + x * o.ts, o.ty + y * o.ts]; }
  const [x, y] = GEO.orte[k][i || 0];
  return [o.ox + x * o.s, o.oy + y * o.s];
}
function orteVon(p){ return vw(p) === 'r' ? GEO.orte[kk(p)].map((_, i) => i) : [0]; }

/* Die Szene: Raute und Tafel als Liste einfacher Stuecke.
   o.art   'brett'  Linien, Knoten, Gitter, Koepfe, Pfeile - die Felder
                    liegen als HTML darueber (beschreibbar)
           'bild'   dazu die Werte und Namen (Bild zum Mitnehmen)
           'mini'   Punkte an den Stellen des Weges, «?», Pfeile (Karte)
   o.werte, o.gesucht, o.eintraege (mit Quellen -> Pfeile)
   NEU (Fassung 3.4): o.nurPfeil = i liefert NUR die Pfeile des Eintrags i
   (fuer den kurzen Pfeil auf dem Brett). */
/* Hat ein Symbol einen Strich darueber (vorkomponiert wie Ǖ oder mit
   kombinierendem U+0304/U+0305)? */
function hatStrich(z){
  return /[\u0304\u0305\u01D5\u01D6]/.test(String(z).normalize('NFD').replace(/\u0308/g, '')) || /[\u0304\u0305]/.test(String(z));
}

function szene(A, o){
  const s = o.s, X = x => o.ox + x * s, Y = y => o.oy + y * s;
  const K = GEO.knoten, t = [];
  // NEU (Nachtrag 2026-10-10): o.farblos - Etappe 2 ohne die Farben aus Etappe 1
  const paare = new Set(o.farblos ? [] : (stand.bwe1 && stand.bwe1.paare) || []);
  const farbeVon = k => o.farblos ? '' : farbeVonStand(k);
  const mini = o.art === 'mini';
  // NEU (Rueckmeldung Mitnehmen 2026-10-10): o.mg vergroessert Knoten und
  // Buchstaben im Mini-Bild, damit die Wege-Uebersicht lesbar bleibt.
  const mg = mini ? (o.mg || 1) : 1;
  const lb = mini ? Math.max(1.4, s * 0.45) : Math.max(1.3, s * 0.3);
  // Kanten mit Wert: gruen links, blau rechts - sobald das Paar gefunden ist.
  Object.entries(GEO.kanten).forEach(([k, [a, b]]) => {
    const farbe = paare.has(k) ? (ST[k].seite === 'links' ? F.gruen : F.blau) : F.linie;
    t.push({t: 'linie', x1: X(K[a][0]), y1: Y(K[a][1]), x2: X(K[b][0]), y2: Y(K[b][1]), farbe, breite: lb});
  });
  // Blattknoten -> Schnittfeld: nur eine Verbindung, kein Wert
  GEO.verbindungen.forEach(([a, b]) => t.push({t: 'linie', x1: X(K[a][0]), y1: Y(K[a][1]),
    x2: X(K[b][0]), y2: Y(K[b][1]), farbe: '#cfc5b3', breite: lb * 0.8, strich: [3, 3]}));
  ['tagL', 'tagR'].forEach(k => t.push({t: 'kreis', x: X(K[k][0]), y: Y(K[k][1]), r: mini ? s * 0.9 : 2.5, fuell: F.matt}));
  ['X', 'nX', 'Y', 'nY'].forEach(k => {
    const r = mini ? s * 2.4 * mg : Math.max(8, s * 2.7);
    const farbe = paare.has(k) ? (X_FAM.includes(k) ? F.gruen : F.blau) : F.matt;
    t.push({t: 'kreis', x: X(K[k][0]), y: Y(K[k][1]), r, fuell: F.karte, rand: farbe, breite: mini ? 1.2 : 1.6});
    // FEHLERBEHOBEN (2026-10-10, Rikes Befund «der Strich liegt genau auf
    // dem Kreisrand»): Ursache - ein Symbol mit Strich (Ǖ, B̄) ist hoeher
    // als ein einfacher Buchstabe, bei gleicher Schriftgroesse stiess der
    // Strich an den Rand. Jetzt etwas kleiner und leicht nach unten.
    const g1 = mini ? s * 2.2 * mg : Math.max(10.5, s * 2.4), st1 = hatStrich(sym(A, k));
    t.push({t: 'text', x: X(K[k][0]), y: Y(K[k][1]) + (st1 ? g1 * 0.1 : 0), s: sym(A, k), gross: st1 ? g1 * 0.8 : g1, fett: true});
  });
  Object.entries(GEO.blatt).forEach(([k, e]) => {
    const r = mini ? s * 1.9 * mg : Math.max(7, s * 2.1);
    t.push({t: 'kreis', x: X(K[k][0]), y: Y(K[k][1]), r, fuell: F.karte, rand: F.matt, breite: 1});
    const g2 = mini ? s * 1.8 * mg : Math.max(9, s * 1.9), st2 = hatStrich(sym(A, e));
    t.push({t: 'text', x: X(K[k][0]), y: Y(K[k][1]) + (st2 ? g2 * 0.1 : 0), s: sym(A, e), gross: st2 ? g2 * 0.8 : g2, fett: true, farbe: F.matt});
  });
  // GEAENDERT (Fassung 3.5, Punkt 1): auf dem Brett stehen im Baum nur
  // die Knoten und «gesamt»; die Zeilen «zuerst: ...» bleiben im Bild.
  if (!mini && o.art !== 'brett'){
    const g = Math.max(10, s * 2.0);
    t.push({t: 'text', x: X(2), y: Y(1.5), s: 'zuerst: ' + sym(A, 'X') + ' oder ' + sym(A, 'nX'), gross: g, farbe: F.matt, anker: 'start'});
    t.push({t: 'text', x: X(98), y: Y(1.5), s: 'zuerst: ' + sym(A, 'Y') + ' oder ' + sym(A, 'nY'), gross: g, farbe: F.matt, anker: 'end'});
  }
  // Die Tafel: Kern (2 x 2 und gesamt), rechts «Anteil in der Zeile»,
  // unten «Anteil in der Spalte».
  if (o.tafel !== false){
    const ts = o.ts, TX = x => o.tx + x * ts, TY = y => o.ty + y * ts;
    const kopf = F.creme, rand = '#cfc5b3';
    const kg = mini ? ts * 3 * Math.min(mg, 1.3) : Math.max(9.5, ts * 2.0), kk2 = kg * 0.82;
    const kasten = (x, y, w, h, fuell) => t.push({t: 'rechteck', x: TX(x), y: TY(y), w: w * ts, h: h * ts, fuell, rand, breite: 1});
    const text = (x, y, s2, gr, fett, farbe) => t.push({t: 'text', x: TX(x), y: TY(y), s: s2, gross: gr, fett, farbe});
    kasten(0, 0, TAF.kopfb, TAF.kopfh, kopf);
    TAF.spalten.forEach((c, j) => {
      const x = TAF.kopfb + j * TAF.spb;
      kasten(x, 0, TAF.spb, TAF.kopfh, kopf);
      text(x + TAF.spb / 2, TAF.kopfh / 2 - (c && !mini ? 1.4 : 0), c ? sym(A, c) : 'gesamt', kg, true);
      if (c && !mini) text(x + TAF.spb / 2, TAF.kopfh / 2 + 2, A.namen[c][1], kk2, false, F.matt);
    });
    TAF.zeilen.forEach((r, i) => {
      const y = TAF.kopfh + i * TAF.zh;
      kasten(0, y, TAF.kopfb, TAF.zh, kopf);
      text(TAF.kopfb / 2, y + TAF.zh / 2 - (r && !mini ? 1.4 : 0), r ? sym(A, r) : 'gesamt', kg, true);
      if (r && !mini) text(TAF.kopfb / 2, y + TAF.zh / 2 + 2, A.namen[r][1], kk2, false, F.matt);
    });
    TAF.felder.forEach(f => { const fb = farbeVon(f.k); kasten(f.x, f.y, f.w, f.h, FUELL[fb] || F.karte); });
    // Zusatzspalten und -zeilen
    const zx = TAF.kernb + TAF.luecke, zy = TAF.kernh + TAF.luecke;
    kasten(zx, 0, 2 * TAF.zusb, TAF.kopfh, kopf);
    if (!mini) text(zx + TAF.zusb, 2.2, 'Anteil in der Zeile', kk2, false, F.matt);
    Y_FAM.forEach((c, j) => text(zx + j * TAF.zusb + TAF.zusb / 2, mini ? TAF.kopfh / 2 : 5.6, sym(A, c), kg, true));
    X_FAM.forEach((r, i) => {
      const y = zy + i * TAF.zush;
      kasten(0, y, TAF.kopfb, TAF.zush, kopf);
      if (!mini){
        text(TAF.kopfb / 2, y + 2.1, 'Anteil in der Spalte', kk2 * 0.9, false, F.matt);
        text(TAF.kopfb / 2, y + 5, sym(A, r), kg, true);
      } else text(TAF.kopfb / 2, y + TAF.zush / 2, sym(A, r), kg, true);
    });
    TAF.zusatz.forEach(f => kasten(f.x, f.y, f.w, f.h, F.karte));
    // FEHLERBEHOBEN (2026-10-10, Rikes Befund «die Anteile neben und unter
    // der Tafel sind nicht gefaerbt»): Ursache - die Zusatzzellen wurden
    // immer mit dem grauen Rand gezeichnet; die Farbe stand nur am kleinen
    // Feld darin (duenner Rand), waehrend der Partner im Baum zusaetzlich
    // seinen farbigen Ast hat. Die Kernzellen bekamen ihre Fuellung, die
    // Anteile nichts. Jetzt bekommt die Zelle selbst den Rand ihres Partners
    // (Zeile = zweite gruene Aeste, Spalte = zweite blaue Aeste), auf dem
    // Brett wie im Bild. Zweiter Durchgang, damit die grauen Nachbarraender
    // den farbigen Rand nicht ueberdecken; leicht nach innen versetzt.
    const zb = Math.max(1.6, lb * 0.9);
    TAF.zusatz.forEach(f => {
      const fb = farbeVon(f.k);
      if (!RAND[fb]) return;
      t.push({t: 'rechteck', x: TX(f.x) + zb / 2, y: TY(f.y) + zb / 2, w: f.w * ts - zb, h: f.h * ts - zb,
              fuell: null, rand: RAND[fb], breite: zb});
    });
  }
  const halb = p => mini ? [s * 1.8, s * 1.8] : stellenMasse(vw(p) === 't' ? o.ts : o.s, p);

  if (o.art !== 'brett'){
    const imWeg = new Set();
    (o.eintraege || []).forEach(e => { imWeg.add(e.p); e.quellen.forEach(q => imWeg.add(q)); });
    ALLE_STELLEN.concat(['r:E', 't:E']).forEach(p => {
      const k = kk(p);
      if (vw(p) === 't' && o.tafel === false) return;
      const w = (o.werte || {})[p], gef = o.gesucht === k;
      orteVon(p).forEach(i => {
        const [x, y] = ortPx(p, o, i), [hw, hh] = halb(p);
        const fb = farbeVon(k);
        if (mini){
          if (ST[k].art === 'schnitt' && vw(p) === 'r')
            t.push({t: 'rechteck', x: x - s * 3.4, y: y - s * 2, w: s * 6.8, h: s * 4, r: 2,
                    fuell: FUELL[fb] || F.karte, rand: RAND[fb] || F.linie, breite: 1});
          if (imWeg.has(p) && ST[k].art !== 'wurzel')
            t.push({t: 'kreis', x, y, r: s * 1.5 * Math.min(mg, 1.4), fuell: F.tinte, rand: F.tinte, breite: 1});
          if (gef && (!o.gesuchtWo || vw(p) === o.gesuchtWo)){
            t.push({t: 'kreis', x, y, r: s * 2.4, fuell: 'none', rand: F.frage, breite: 2});
            t.push({t: 'text', x: x + s * 2.8, y: y - s * 2.6, s: '?', gross: s * 3.6, fett: true, farbe: F.frage});
          }
          return;
        }
        const leer = !w;
        t.push({t: 'rechteck', x: x - hw, y: y - hh, w: 2 * hw, h: 2 * hh, r: 4,
                fuell: fb && !fb.startsWith('t-') ? FUELL[fb] : F.karte,
                rand: gef ? F.frage : (RAND[fb] || (leer ? F.linie : '#9a8f7d')),
                breite: gef ? 2 : 1.1, strich: leer ? [4, 3] : null});
        const gr = vw(p) === 't' && ST[k].art === 'bed' ? Math.max(9, o.s * 1.8) : Math.max(10.5, o.s * 2.2);
        if (w) t.push({t: 'text', x, y, s: w.text, gross: gr, fett: false, farbe: F.tinte});
        // NEU (Fassung 3.2, Punkt 3): die Rechnung klein darunter, wie auf dem Schirm
        if (w && !w.fest && !w.ohne && w.ausdruck)
          t.push({t: 'text', x, y: y + hh + gr * 0.5, s: w.ausdruck, gross: gr * 0.62, farbe: F.matt, hof: true});
        // NEU (Rike 2026-10-17): der Vorschlag bei einem direkten Wert
        else if (w && !w.fest && w.ohne && w.vorschlag)
          t.push({t: 'text', x, y: y + hh + gr * 0.5, s: w.vorschlag.ausdruck, gross: gr * 0.62, farbe: F.matt, hof: true});
        else if (gef) t.push({t: 'text', x, y, s: '?', gross: gr * 1.2, fett: true, farbe: F.frage});
        if (vw(p) === 'r' && ST[k].art !== 'wurzel' && namenAn(A, k))
          t.push({t: 'text', x, y: y - hh - Math.max(6, o.s * 1.2), teile: nameTeile(A, k, 'r'),
                  gross: Math.max(9, o.s * 1.7), farbe: F.matt, hof: true});
      });
    });
  }
  // Der Weg: je Eintrag mit Rechnung Pfeile von den erschlossenen
  // Quellen zum Feld, nummeriert; ein Eintrag ohne Rechnung bekommt nur
  // seine Nummer am Feld.
  const n0 = t.length;
  // NEU (Rueckmeldung Mitnehmen 2026-10-10): o.nurSchritte - Angaben
  // ohne Rechnung bekommen keine Nummer, die Pfeile zaehlen 1, 2, ...
  // je Darstellung (beim Jugendtreffen: Baum 1 ..., Tafel 1 ...).
  const schritt = {r: 0, t: 0};
  (o.eintraege || []).forEach((e, i) => {
    if (o.nurPfeil !== undefined && i !== o.nurPfeil) return;
    if (vw(e.p) === 't' && o.tafel === false) return;
    // NEU (Rike 2026-10-17): Ein direkter Wert mit Vorschlag zeigt dessen
    // Pfeile, aber nur kurz (nurPfeil) - in der ganzen Pfeilkette (Bilder
    // zum Mitnehmen) bleibt er ein Eintrag ohne Rechnung.
    if (o.nurPfeil !== undefined && !e.quellen.length && e.vorschlag)
      e = Object.assign({}, e, {quellen: e.vorschlag.quellen});
    const [x1, y1] = ortPx(e.p, o), r1 = halb(e.p);
    const nrg = mini ? s * 2.1 : Math.max(6.5, o.s * 1.45);
    if (!e.quellen.length && o.nurSchritte) return;
    if (e.quellen.length) schritt[vw(e.p)]++;
    if (!e.quellen.length){
      const bx = x1 - r1[0] - nrg * 0.4, by = y1 - r1[1] - nrg * 0.2;
      t.push({t: 'kreis', x: bx, y: by, r: nrg, fuell: '#fff', rand: F.matt, breite: 1.2});
      t.push({t: 'text', x: bx, y: by, s: String(i + 1), gross: nrg * 1.3, fett: true, farbe: F.matt});
      return;
    }
    e.quellen.forEach((q, j) => {
      const [x0, y0] = ortPx(q, o);
      t.push({t: 'pfeil', x0, y0, x1, y1, r0: halb(q), r1,
              farbe: F.pfeil, breite: mini ? Math.max(1.8, s * 0.7) : Math.max(1.8, o.s * 0.42),
              bogen: j === 0 ? 0.12 : -0.12, kopf: mini ? s * 2 : Math.max(7, o.s * 1.6),
              nr: j === 0 ? (o.nurSchritte ? schritt[vw(e.p)] : i + 1) : null, nrgross: nrg});
    });
  });
  return o.nurPfeil !== undefined ? t.slice(n0) : t;
}

/* ───────── Das Brett (rechte Haelfte): Raute oben, Tafel darunter ─────────
   Jedes Feld ist ein Eingabefeld (Fassung 3.1, Punkt 2). Das Brett wird
   nur bei einem Zugwechsel oder einer neuen Fenstergroesse NEU gebaut;
   nach einem Eintrag wird es nur aufgefrischt. Sonst verloere das Feld,
   in das man gerade weiterklickt, seinen Fokus. */
/* GEAENDERT (Fassung 3.2, Punkt 4): Baum links, Tafel rechts NEBENEINANDER.
   Wo die Breite nicht reicht (unter rund 860 px Brettbreite), steht die
   Tafel wieder unter dem Baum; dann darf die Haelfte rollen.
   Die Tafel bekommt einen etwas groesseren Massstab (K), sonst waeren ihre
   Felder neben dem Baum zu klein. */
const T_K = 1.3, T_LU = 5;
function brettMasse(feld, leiste, oben){
  const halb = feld.closest('.haelfte');
  // Im niedrigen Fenster rollt die ganze Buehne (CSS, max-height:700px);
  // dann gibt die Haelfte keine Hoehe vor, und das Brett nimmt 420 px an.
  const niedrig = window.matchMedia && matchMedia('(max-height:700px)').matches;
  // NEU (Nachtrag 2026-10-10): Platz fuer die dauernde Rechenleiste
  // GEAENDERT (Fassung 3.5): die Leiste ist schmaler; `oben` ist die Hoehe
  // der Fragekarte in Zug 2 (im niedrigen Fenster rollt die Buehne ohnehin).
  // GEAENDERT (Fassung 4.1): Im niedrigen Fenster nicht mehr fest 420 px,
  // sondern so hoch, wie unter der (groesseren) Situationskarte im Fenster
  // noch Platz ist - mindestens 250 px. So steht der Baum ganz im Bild.
  let hochNiedrig = 420;
  const bue = document.getElementById('buehne');
  if (niedrig && bue){
    const rb = bue.getBoundingClientRect(), oben0 = feld.getBoundingClientRect().top + bue.scrollTop;
    hochNiedrig = Math.max(250, rb.bottom - oben0 - 14 - (oben || 0));
  }
  // FEHLERBEHOBEN (Fassung 4.1): 22 statt 16 px Abzug. Ursache: der Abstand
  // .bwrleiste + .bwbrett (6 px) gilt auch bei versteckter Rechenleiste;
  // die Haelfte rollte um 2 px.
  const hoch = (niedrig ? hochNiedrig : (halb ? halb.clientHeight : 600) - 22 - (oben || 0)) - (leiste ? 32 : 0);
  const breit = (halb ? halb.clientWidth : (feld.clientWidth || 640)) - 22;
  return masseAus(breit, hoch);
}
/* NEU (FASSUNG 4.4): herausgeloest aus brettMasse - Masse des Bretts aus
   verfuegbarer Breite und Hoehe. Etappe 3 (Teil 1) zeichnet dieselbe
   Raute neben der Satzliste und misst ihren Platz selbst. */
function masseAus(breit, hoch, unten){
  const tH = TAF.hoehe * T_K, tB = TAF.breite * T_K;
  if (breit >= 860){
    // FEHLERBEHOBEN (2026-10-10): 2 px Rand rechts. Ursache: War das Brett
    // durch die Breite begrenzt, lag der rechte Tafelrand genau auf dem
    // Bildrand und wurde zur Haelfte abgeschnitten.
    let s = Math.min((breit - 2) / (100 + T_LU + tB), hoch / Math.max(GEO.hoehe, tH), 8);
    // Etappe 3 gibt `unten` = 0: das Brett passt sich ganz dem Platz an
    s = Math.max(s, unten === undefined ? 3.8 : unten);
    const W = (100 + T_LU + tB) * s + 2, H = Math.max(GEO.hoehe, tH) * s;
    return {W, s, H, neben: true, o: {s, ox: 0, oy: (H - GEO.hoehe * s) / 2,
            ts: T_K * s, tx: (100 + T_LU) * s, ty: (H - tH * s) / 2}};
  }
  // Gestapelt: der Baum so gross, dass er moeglichst in die Hoehe passt,
  // aber lesbar (mindestens 4.2) und nie breiter als das Brett.
  const s = Math.max(Math.min(breit / 100, 4.2), Math.min(breit / 100, hoch / GEO.hoehe, 7));
  const ts = Math.min(T_K * s, breit / TAF.breite);
  const W = Math.max(100 * s, TAF.breite * ts), ty = GEO.hoehe * s + 3 * s;
  return {W, s, H: ty + TAF.hoehe * ts + 4, neben: false,
          o: {s, ox: (W - 100 * s) / 2, oy: 0, ts, tx: (W - TAF.breite * ts) / 2, ty}};
}

let BRETT = null;
/* ctx: {A, z, schreiben (bool), fragen (bool), rechnen (bool),
         eintrag(p, txt), klick(p), frage(p), markiert() -> {p: Klasse},
         fragenSicht ('alle' | 'keine' | 'gesucht' oder je Darstellung
                      {r: ..., t: ...}),
         hervor() -> Set der Stellen, die NICHT blass werden (oder null),
         fuehrung() -> {p, html} oder null}
   GEAENDERT (Fassung 3.4): Kein dauernder Pfeil mehr (ctx.pfeile ist weg);
   `rechnen` erlaubt das Rechnen durch Klicken. eintrag(p, txt, quellen).
   NEU (Nachtrag 2026-10-10): `leiste` zeigt die dauernde Rechenleiste.
   Die Felder lesen ctx immer frisch aus BRETT.ctx: Nach einem Eintrag
   wird ctx ersetzt (z. B. ob geschrieben werden darf), ohne Neubau. */
function brettBauen(feld, ctx){
  const {A} = ctx;
  // FEHLERBEHOBEN (2026-10-10): Erst leeren, dann messen. Sonst gab das
  // alte, breitere Brett die Breite der Haelfte vor, und nach dem
  // Verkleinern des Fensters rollte die Buehne seitwaerts.
  feld.innerHTML = '';
  // NEU (Fassung 3.5, Punkt 3): ctx.oben - die Fragekarte direkt ueber dem
  // Brett (Zug 2). Erst einsetzen, dann messen.
  let karte = null, obenH = 0;
  if (ctx.oben){
    karte = document.createElement('div');
    feld.appendChild(karte);
    karteSetzen(karte, ctx.oben);
    obenH = karte.offsetHeight + 8;
  }
  // GEAENDERT (Fassung 3.5, Punkt 2): Platz fuer die Rechenleiste erst,
  // wenn sie da ist (E.leisteDa).
  // NEU (Nachtrag 2026-10-10): die Hinweisleiste des gefuehrten Beispiels
  // steht ueber Rechenleiste und Brett und bekommt ihren Platz vorab.
  let fl = null;
  if (ctx.fuehrung){
    fl = document.createElement('div');
    fl.className = 'bwfuehr'; fl.setAttribute('role', 'status');
    feld.appendChild(fl);
    const f0 = ctx.fuehrung();
    if (f0){ fl.innerHTML = `<span class="pf">▼</span><span class="wo">${vw(f0.p) === 't' ? 'In der Tafel' : 'Im Baum'}:</span><span>${f0.html}</span>`; obenH += fl.offsetHeight + 4; }
    else fl.hidden = true;
  }
  // NEU (Fassung 4.1): das Rechenprotokoll klappt UNTER dem Brett ein
  // (ctx.protokoll). Erst einsetzen und messen, nach dem Brett anhaengen.
  let pbox = null;
  if (ctx.protokoll){
    pbox = document.createElement('div');
    pbox.className = 'bwprotbox'; pbox.id = 'bwprotbox';
    feld.appendChild(pbox);
    pbox.innerHTML = protokollHtml(A, ctx.z);
    protokollHaken(pbox);
    obenH += pbox.offsetHeight + 8;
  }
  const m = brettMasse(feld, !!ctx.leiste && !!E.leisteDa, obenH);
  const brett = document.createElement('div');
  brett.className = 'bwbrett';
  brett.style.width = m.W + 'px'; brett.style.height = m.H + 'px';
  brett.style.setProperty('--bwf', Math.min(15.5, Math.max(11.5, m.s * 2.6)) + 'px');
  brett.style.setProperty('--bwa', Math.min(14, Math.max(10.5, m.s * 2.3)) + 'px');
  brett.style.setProperty('--bwn', Math.min(12, Math.max(9, m.s * 1.8)) + 'px');
  brett.style.setProperty('--bwr', Math.min(11, Math.max(9, m.s * 1.75)) + 'px');
  const img = document.createElement('img');
  img.className = 'bwgrund'; img.alt = '';
  brett.appendChild(img);
  ['r', 't'].forEach(v => SCHLUESSEL.forEach(k => {
    const p = v + ':' + k;
    orteVon(p).forEach(i => {
      const d = document.createElement('div');
      const [hw, hh] = stellenMasse(vw(p) === 't' ? m.o.ts : m.s, p), [x, y] = ortPx(p, m.o, i);
      d.dataset.p = p;
      d.dataset.grund = 'bwchip art-' + ST[k].art + (vw(p) === 't' && ST[k].art === 'bed' ? ' anteil' : '');
      d.className = d.dataset.grund;
      d.setAttribute('data-alsbildform', 'rechteck');
      d.style.left = (x - hw) + 'px'; d.style.top = (y - hh) + 'px';
      d.style.width = 2 * hw + 'px'; d.style.height = 2 * hh + 'px';
      // GEAENDERT (Fassung 3.5, Punkt 1): jede Stelle hat einen Platz fuer
      // ihre Bezeichnung, auch in der Tafel; gefuellt wird er in
      // brettAuffrischen, sobald die Bezeichnung entdeckt ist.
      if (p !== 't:E'){
        const n = document.createElement('span');
        n.className = 'bwname';
        d.appendChild(n);
      }
      const inp = document.createElement('input');
      inp.type = 'text'; inp.autocomplete = 'off'; inp.spellcheck = false;
      inp.setAttribute('aria-label', (nameTeile(A, k, v).map(t => t.s).join('') || 'Feld') + ' (' + WO[v] + ')');
      if (k === 'E') inp.readOnly = true;
      inp.addEventListener('keydown', ev => {
        if (ev.key === 'Enter') inp.blur();
        if (ev.key === 'Escape' && E.rechnen){ E.rechnen = null; rechnenZeigen(); }
        // NEU (Fassung 3.6): Weitertippen nimmt die Blase weg. Wer in ein
        // Feld tippt, das nicht beschrieben wird, bekommt den Grund (b) -
        // vorher blieb das Tippen stumm.
        const tippt = (ev.key.length === 1 || ev.key === 'Backspace' || ev.key === 'Delete') && !ev.metaKey && !ev.ctrlKey && !ev.altKey;
        if (!tippt) return;
        if (inp.readOnly){
          ev.preventDefault();
          const c = BRETT.ctx;
          blase(p, 'b', k === 'E' ? `«gesamt» steht fest: ${esc(einsText(c.A))}. Hier wird nichts eingetragen.`
            : (c.nurLesen ? c.nurLesen(p) : 'Hier wird gerade nicht geschrieben.'));
          blaseZeichnen();
        } else blaseWeg();
      });
      // Wer ein beschriebenes Feld anklickt, will es meist ersetzen.
      inp.addEventListener('focus', () => { if (!inp.readOnly) inp.select(); });
      inp.addEventListener('change', () => {
        if (!BRETT.ctx.schreiben || k === 'E') return;
        // Getippt statt geklickt: Die Rechenwahl fuer dieses Feld ist erledigt.
        if (E.rechnen && E.rechnen.ziel === p) E.rechnen = null;
        BRETT.ctx.eintrag(p, inp.value);
      });
      d.appendChild(inp);
      const rech = document.createElement('span');
      rech.className = 'bwrech';
      d.appendChild(rech);
      const bild = document.createElement('span');
      bild.className = 'bwbild'; bild.setAttribute('data-alsbild', '');
      d.appendChild(bild);
      if (ctx.fragen && k !== 'E'){
        const f = document.createElement('button');
        f.className = 'bwfrag'; f.textContent = '?'; f.type = 'button';
        f.title = 'Das ist gesucht'; f.tabIndex = -1;
        // FEHLERBEHOBEN (Fassung 3.6): Der Klick auf das «?» lief bis zum
        // Feld durch und machte es zum Rechenziel. Ursache: Seit Etappe 2
        // nicht mehr sperrt, ist das Rechnen auch beim Markieren offen.
        f.addEventListener('mousedown', ev => { ev.preventDefault(); ev.stopPropagation(); blaseWeg(); });
        f.addEventListener('click', ev => { ev.stopPropagation(); BRETT.ctx.frage(p); });
        d.appendChild(f);
      }
      d.addEventListener('mousedown', ev => { blaseWeg(); rechnenKlick(p, ev); });
      d.addEventListener('click', () => { if (!BRETT.ctx.schreiben) BRETT.ctx.klick(p); });
      brett.appendChild(d);
    });
  }));
  // NEU (Fassung 3.4): die Ebene fuer den kurzen Pfeil und die Rechenleiste
  const pf = document.createElement('img');
  pf.className = 'bwpfeil aus'; pf.alt = '';
  brett.appendChild(pf);
  // GEAENDERT (Nachtrag 2026-10-10): die Rechenleiste steht dauernd UEBER
  // dem Brett (ctx.leiste), nicht mehr schwebend am Ziel.
  const rl = document.createElement('div');
  rl.className = 'bwrleiste'; rl.hidden = !ctx.leiste;
  rl.addEventListener('mousedown', ev => { ev.preventDefault(); blaseWeg(); });
  feld.appendChild(rl);
  feld.appendChild(brett);
  if (pbox) feld.appendChild(pbox);
  BRETT = {ctx, m, brett, img, pf, rl, karte, fl};
  brettAuffrischen();
}

/* ───────── Kurzer Pfeil (Fassung 3.4, Punkt 2) ─────────
   Der Pfeil eines Eintrags erscheint, bleibt etwa 2 s und blendet aus. Das
   Zielfeld leuchtet kurz mit. Aufgerufen nach jedem angenommenen Eintrag
   und beim Klick auf eine Protokollzeile. */
let _pfeilUhr = null;
function pfeilZeigen(i){
  if (!BRETT || !BRETT.brett.isConnected) return;
  const {ctx, m, brett, pf} = BRETT, e = ctx.z.eintraege[i];
  if (!e) return;
  pf.src = svgUrl(svgAus(szene(ctx.A, Object.assign({art: 'brett', eintraege: ctx.z.eintraege, nurPfeil: i}, m.o)), m.W, m.H));
  pf.style.transition = 'none'; pf.classList.remove('aus');
  void pf.offsetWidth; pf.style.transition = '';
  brett.querySelectorAll('.bwchip.blitz').forEach(d => d.classList.remove('blitz'));
  const d = brett.querySelector(`.bwchip[data-p="${e.p}"]`);
  if (d){ void d.offsetWidth; d.classList.add('blitz'); }
  clearTimeout(_pfeilUhr);
  _pfeilUhr = setTimeout(() => {
    pf.classList.add('aus');
    brett.querySelectorAll('.bwchip.blitz').forEach(x => x.classList.remove('blitz'));
  }, 2000);
}

/* ───────── Rechnen durch Klicken (Fassung 3.4, Punkt 3) ─────────
   NEU (Nachtrag 2026-10-10, Rike): wie ein Taschenrechner, in der
   natuerlichen Lesereihenfolge.
     E.rechnen = {ziel: p, quellen: [p, ...], op: null | Rechenart-ID}
     - Klick auf ein LEERES Feld: es wird Ziel (Tippen geht dort weiter).
     - Zweistellig: Ziel, Feld 1, Rechenart (× ÷ + −), Feld 2. Mit Feld 2
       ist die Rechnung fertig; die Flaeche schreibt sie aus den
       angezeigten Werten und gibt sie in den gewohnten Eintrag.
     - «1 −»: Ziel, «1 −», Feld.
     - Vor der Rechenart: Feld 1 noch einmal anklicken nimmt es zurueck,
       ein anderes Feld ersetzt es. «↶» nimmt den letzten Teil zurueck.
   Die Leiste steht dauernd ueber dem Brett und zeigt die Rechnung, waehrend
   sie entsteht («0.7 · …»). Ohne Ziel verhaelt sich ein Feld mit Wert wie
   bisher (anklicken, ueberschreiben). */
const RECHENARTEN = [
  {id: 'mal', z: '×', n: 2, t: ' · ', titel: 'mal'},
  {id: 'durch', z: '÷', n: 2, t: ' : ', titel: 'geteilt durch'},
  {id: 'plus', z: '+', n: 2, t: ' + ', titel: 'plus'},
  // PRUEFEN: «−» steht nicht in Rikes erster Liste (× ÷ + 1 −); im
  // Nachtrag 2026-10-10 nennt sie es. Die Tafel braucht die Differenz.
  {id: 'minus', z: '−', n: 2, t: ' − ', titel: 'minus'},
  {id: 'gegen', z: '1 −', n: 1, titel: 'Gegenereignis: 1 minus'},
];
function bekanntAuf(p){
  if (!BRETT) return false;
  const {A, z} = BRETT.ctx;
  return kk(p) !== 'E' && !!werteVon(A, z)[p] && !(E.falsch && E.falsch[p] !== undefined);
}
function rechnenKlick(p, ev){
  const ctx = BRETT && BRETT.ctx;
  if (!ctx || !ctx.rechnen || !ctx.schreiben) return;
  const R = E.rechnen;
  // NEU (Fassung 3.6): Mitten in einer Rechnung wird nichts stumm verworfen.
  if (kk(p) === 'E'){
    if (R && (R.quellen.length || R.op)){
      ev.preventDefault();
      blase(p, 'b', `«gesamt» ist immer ${esc(einsText(ctx.A))} und wird nicht angeklickt. Für «1 −» gibt es den Knopf in der Rechenleiste.`);
      blaseZeichnen();
    }
    return;
  }
  if (R && R.ziel !== p && bekanntAuf(p)){
    ev.preventDefault();
    const a = R.op && RECHENARTEN.find(x => x.id === R.op);
    if (a && a.n === 1){ R.quellen = [p]; return rechnenFertig(); }
    if (a && a.n === 2 && R.quellen.length === 1){ R.quellen.push(p); return rechnenFertig(); }
    // GEAENDERT (Fassung 3.6): Rechenart vor Feld 1 ist erlaubt
    if (a && a.n === 2 && !R.quellen.length) R.quellen = [p];
    else if (!R.op) R.quellen = R.quellen[0] === p ? [] : [p];
    rechnenZeigen();
    return;
  }
  if (!bekanntAuf(p) && R && R.ziel !== p && (R.quellen.length || R.op)){
    // Ein leeres (oder falsch beschriebenes) Feld kann kein Ausgangswert
    // sein. Frueher wurde es stumm zum neuen Ziel und die halbe Rechnung
    // war weg.
    ev.preventDefault();
    blase(p, 'b', E.falsch && E.falsch[p] !== undefined
      ? 'Hier steht noch ein Wert, der nicht passt — damit lässt sich nicht rechnen.'
      : 'Dieses Feld ist noch leer — damit lässt sich nicht rechnen. Klicken Sie ein Feld mit Wert an, oder ✕ für eine neue Rechnung.');
    blaseZeichnen();
    return;
  }
  if (!bekanntAuf(p) && (!R || R.ziel !== p)){
    E.rechnen = {ziel: p, quellen: [], op: null};
    // NEU (Fassung 3.5, Punkt 2): Die Rechenleiste erscheint erst mit dem
    // ersten leeren Ziel und bleibt dann stehen. Beim ersten Mal wird das
    // Brett neu eingepasst (Platz fuer die Leiste); das Ziel behaelt den
    // Fokus, damit man auch gleich tippen kann.
    if (!E.leisteDa){
      E.leisteDa = true;
      setTimeout(() => {
        if (window._neuzeichnen) window._neuzeichnen();
        const inp = BRETT && BRETT.brett.querySelector(`.bwchip[data-p="${p}"] input`);
        if (inp) inp.focus();
      }, 0);
    } else setTimeout(rechnenZeigen, 0);
  }
}
/* Die Rechnung, wie sie gerade dasteht: «0.7 · …», «1 − …». */
function rechnungBisher(R){
  const W = werteVon(BRETT.ctx.A, BRETT.ctx.z), T = p => (W[p] ? W[p].text : '…');
  const a = R.op && RECHENARTEN.find(x => x.id === R.op);
  if (a && a.n === 1) return einsText(BRETT.ctx.A) + ' − ' + (R.quellen[0] ? T(R.quellen[0]) : '…');
  if (!R.quellen.length) return a ? '…' + a.t + '…' : '…';
  return T(R.quellen[0]) + (a ? a.t + (R.quellen[1] ? T(R.quellen[1]) : '…') : '');
}
function rechnenZeigen(){
  if (!BRETT || !BRETT.brett.isConnected) return;
  const {brett, rl, ctx} = BRETT;
  let R = E.rechnen;
  if (R && (!ctx.rechnen || !ctx.schreiben || bekanntAuf(R.ziel))) R = E.rechnen = null;
  if (R) R.quellen = R.quellen.filter(bekanntAuf);
  brett.querySelectorAll('.bwchip').forEach(d => {
    d.classList.toggle('rziel', !!R && d.dataset.p === R.ziel);
    d.classList.toggle('rquelle', !!R && R.quellen.includes(d.dataset.p));
  });
  brett.classList.toggle('rechnet', !!R);
  if (!ctx.leiste || !E.leisteDa){ rl.hidden = true; return; }
  rl.hidden = false;
  rl.classList.toggle('aktiv', !!R);
  const n = R ? R.quellen.length : -1;
  // Was als Naechstes geht - und die Rechnung, waehrend sie entsteht.
  const tip = !ctx.rechnen ? 'Gerechnet wird in Schritt 3.'
    : !R ? 'Leeres Feld anklicken, das berechnet werden soll.'
    : R.op === 'gegen' ? 'Jetzt das Feld anklicken.'
    : R.op ? (n === 0 ? 'Jetzt Feld 1 anklicken.' : 'Jetzt Feld 2 anklicken.')
    : n === 0 ? 'Feld 1 anklicken oder 1 −.'
    : 'Rechenart wählen.';
  const nz = R ? nameHtml(ctx.A, R.ziel) : '';
  const anz = R ? `${nz ? nz + ' = ' : ''}${esc(rechnungBisher(R))} <span class="tip">${esc(tip)}</span>`
                : `<span class="tip">${esc(tip)}</span>`;
  // GEAENDERT (Fassung 3.6): kein Knopf ist mehr stumm gesperrt. Was gerade
  // nichts bewirkt, ist blass (aus) und sagt beim Klick, warum (Grund b).
  const frei = a => !!R;
  const aus = (cl, an) => (an ? '' : ` aria-disabled="true" class="${cl ? cl + ' ' : ''}aus"`) || '';
  rl.innerHTML = `<span class="anz">${anz}</span>`
    + RECHENARTEN.map(a => `<button type="button" data-op="${a.id}" title="${esc(a.titel)}"`
        + `${frei(a) ? (R && R.op === a.id ? ' class="an"' : '') : aus('', false)}>${esc(a.z)}</button>`).join('')
    + `<button type="button" data-op="zurueck" title="Letzten Teil zurücknehmen"${R && (n || R.op) ? ' class="zu"' : aus('zu', false)}>↶</button>`
    + `<button type="button" data-op="zu" title="Abbrechen"${R ? ' class="zu"' : aus('zu', false)}>✕</button>`;
  rl.querySelectorAll('button').forEach(b => b.onclick = () => {
    const R = E.rechnen;
    if (b.getAttribute('aria-disabled') === 'true'){
      blase('op:' + b.dataset.op, 'b', !R ? (b.dataset.op === 'zu' || b.dataset.op === 'zurueck'
          ? 'Es läuft gerade keine Rechnung.'
          : 'Zuerst das leere Feld anklicken, das berechnet werden soll.')
        : 'Noch nichts zum Zurücknehmen.');
      return blaseZeichnen();
    }
    if (!R) return;
    if (b.dataset.op === 'zu'){ E.rechnen = null; return rechnenZeigen(); }
    if (b.dataset.op === 'zurueck'){
      const a = R.op && RECHENARTEN.find(x => x.id === R.op);
      if (a && a.n === 2 && R.quellen.length === 1) R.op = null;
      else if (a && a.n === 1) R.op = null;
      else R.quellen.pop();
      return rechnenZeigen();
    }
    R.op = b.dataset.op;
    // NEU (Fassung 3.6): «1 −» nach Feld 1 nimmt dieses Feld
    if (R.op === 'gegen' && R.quellen.length) { R.quellen = R.quellen.slice(0, 1); return rechnenFertig(); }
    rechnenZeigen();
  });
  blaseZeichnen();
}
function rechnenFertig(){
  const R = E.rechnen, ctx = BRETT && BRETT.ctx;
  const a = R && RECHENARTEN.find(x => x.id === R.op);
  if (!R || !ctx || !a || R.quellen.length !== a.n) return;
  const W = werteVon(ctx.A, ctx.z), T = p => W[p].text;
  const txt = a.id === 'gegen' ? einsText(ctx.A) + ' − ' + T(R.quellen[0])
                               : T(R.quellen[0]) + a.t + T(R.quellen[1]);
  // Das Ziel hat noch den Fokus: leeren und loslassen, ohne dass ein
  // halb Getipptes als Eintrag zaehlt.
  const inp = BRETT.brett.querySelector(`.bwchip[data-p="${R.ziel}"] input`);
  if (inp){ inp.value = ''; if (document.activeElement === inp) inp.blur(); }
  const ziel = R.ziel, quellen = R.quellen.slice();
  E.rechnen = null;
  ctx.eintrag(ziel, txt, quellen);
}
/* Nach einem Eintrag: Rechenwahl aufraeumen und den Pfeil kurz zeigen. */
function nachEintrag(z, r){
  if (!r || !r.ok) return;
  E.rechnen = null;
  pfeilZeigen(r.nr - 1);
}

/* ───────── Die Rueckmeldeblase (NEU, Fassung 3.6) ─────────
   E.blase = {p, art, html, auch}: p ist eine Stelle («r:X») oder ein Knopf
   der Rechenleiste («op:mal»); art a/b/c/d (siehe Kopf der Datei); auch -
   weitere Stellen, die mit markiert werden (Finde den Wert: beide falsch).
   Die Blase steht NEBEN dem Feld (rechts, sonst links, sonst darunter),
   nie darueber, und ist nie klickbar. Sie bleibt, bis man weitertippt oder
   wieder auf das Brett oder die Rechenleiste klickt. Eine Ablehnung steht
   nur in der Blase; die Leiste unten bleibt fuer das, was gelungen ist. */
const BLASE_KOPF = {a: 'Passt nicht', b: 'Jetzt nicht', c: 'Andere Darstellung', d: 'Nicht lesbar'};
function blase(p, art, html, auch){
  E.blase = {p, art, html, auch: auch || []};
  E.meldung = null;
  meldungZeigen();
}
function blaseWeg(){
  if (!E || !E.blase) return;
  E.blase = null;
  blaseZeichnen();
}
function blaseZeichnen(){
  if (!BRETT || !BRETT.brett.isConnected) return;
  const {brett, rl} = BRETT;
  brett.querySelectorAll(':scope > .bwblase').forEach(x => x.remove());
  rl.querySelectorAll(':scope > .bwblase').forEach(x => x.remove());
  brett.querySelectorAll('.bwchip.b-a,.bwchip.b-b,.bwchip.b-c,.bwchip.b-d')
    .forEach(d => d.classList.remove('b-a', 'b-b', 'b-c', 'b-d'));
  const B = E && E.blase;
  if (!B) return;
  const el = document.createElement('div');
  el.className = 'bwblase art-' + B.art;
  el.setAttribute('role', 'alert');
  el.innerHTML = `<b>${BLASE_KOPF[B.art]}</b>${B.html}`;
  if (B.p.startsWith('op:')){
    const b = rl.querySelector(`button[data-op="${B.p.slice(3)}"]`);
    if (!b || rl.hidden) return;
    rl.appendChild(el);
    el.classList.add('unten');
    el.style.left = Math.min(Math.max(b.offsetLeft + b.offsetWidth / 2, el.offsetWidth / 2), rl.clientWidth - el.offsetWidth / 2 + 40) + 'px';
    el.style.top = (b.offsetTop + b.offsetHeight + 9) + 'px';
    return;
  }
  const d = brett.querySelector(`.bwchip[data-p="${B.p}"]`);
  if (!d) return;
  d.classList.add('b-' + B.art);
  B.auch.forEach(q => { const x = brett.querySelector(`.bwchip[data-p="${q}"]`); if (x) x.classList.add('b-' + B.art); });
  brett.appendChild(el);
  const l = d.offsetLeft, t = d.offsetTop, w = d.offsetWidth, h = d.offsetHeight, W = brett.clientWidth;
  const platzR = W - (l + w + 10), platzL = l - 10;
  if (Math.max(platzR, platzL) >= 150){
    const rechts = platzR >= Math.min(el.offsetWidth, 230) || platzR >= platzL;
    el.style.maxWidth = Math.min(230, rechts ? platzR : platzL) + 'px';
    el.classList.add(rechts ? 'rechts' : 'links');
    el.style.left = (rechts ? l + w + 10 : l - 10 - el.offsetWidth) + 'px';
    el.style.top = (t + h / 2) + 'px';
  } else {
    // kein Platz daneben: darunter (unter der kleinen Rechnung), nie darueber
    el.classList.add('unten');
    el.style.left = Math.min(Math.max(l + w / 2, el.offsetWidth / 2), W - el.offsetWidth / 2) + 'px';
    el.style.top = (t + h + 16) + 'px';
  }
}

/* NEU (Fassung 3.3): Das gefuehrte Beispiel - ein kurzer Satz zu der
   Stelle, die als Naechstes dran ist.
   GEAENDERT (Nachtrag 2026-10-10, Rike): Der Satz lag unter oder ueber dem
   Feld im Brett und verdeckte dort andere Felder. Jetzt steht er in der
   Leiste ueber dem Brett (BRETT.fl, im Fluss), mit Pfeil und Ort; auf das
   Feld selbst zeigt nur der Leuchtrand. */
function fuehrungSetzen(brett, f){
  const b = BRETT && BRETT.fl;
  if (!b) return;
  if (!f || !brett.querySelector(`.bwchip[data-p="${f.p}"]`)){ b.hidden = true; b.innerHTML = ''; return; }
  brett.querySelector(`.bwchip[data-p="${f.p}"]`).classList.add('zeig');
  b.hidden = false;
  b.innerHTML = `<span class="pf" aria-hidden="true">▼</span><span class="wo">${vw(f.p) === 't' ? 'In der Tafel' : 'Im Baum'}:</span><span>${f.html}</span>`;
}

let _namenVorher = null;     // welche Bezeichnungen zuletzt zu sehen waren
/* NEU (Rike 2026-10-10): Sitzt an Stelle p ein «?»? In Etappe 2 je
   Darstellung (z.fragen), sonst wie bisher nur nach dem Schluessel. */
function istFrage(z, p){
  if (!z || !z.gesucht || z.gesucht !== kk(p)) return false;
  return z.fragen ? z.fragen[vw(p)] !== undefined : true;
}
function brettAuffrischen(){
  if (!BRETT || !BRETT.brett.isConnected) return;
  const {ctx, m, brett, img} = BRETT, {A, z} = ctx;
  const w = werteVon(A, z);
  // GEAENDERT (Fassung 3.4, Punkt 2): auf dem Brett keine dauernden Pfeile
  img.src = svgUrl(svgAus(szene(A, Object.assign({art: 'brett', eintraege: [], farblos: !!ctx.farblos}, m.o)), m.W, m.H));
  const mk = ctx.markiert ? ctx.markiert() : {};
  // NEU (Fassung 3.3): welche «?» sichtbar sind (alle, keine, nur das
  // gesuchte) und welche Felder hervortreten (alle uebrigen werden blass)
  // FEHLERBEHOBEN (2026-10-10, Rikes Befund: nach dem «?» im Baum liess
  // sich in der Tafel kein «?» mehr setzen): Ursache war, dass die
  // Sichtbarkeit der kleinen ? fuer das GANZE Brett galt (data-frage am
  // Brett). Sobald irgendwo ein «?» sass, verschwanden die ? auch in der
  // anderen Darstellung. Jetzt kann ctx.fragenSicht je Darstellung
  // angeben, was gilt ({r, t}); die Felder tragen dann «fragzu».
  const fs = ctx.fragenSicht;
  const jeSicht = fs && typeof fs === 'object';
  brett.dataset.frage = jeSicht ? 'je' : (fs || 'alle');
  const hervor = ctx.hervor ? ctx.hervor() : null;
  const vorher = _namenVorher && _namenVorher.A === A ? _namenVorher.k : null;
  brett.querySelectorAll('.bwchip').forEach(d => {
    const p = d.dataset.p, k = kk(p), inp = d.querySelector('input');
    const kl = [d.dataset.grund];
    const e = w[p];
    if (e) kl.push('bekannt');
    if (E.falsch && E.falsch[p] !== undefined) kl.push('falsch');
    if (istFrage(z, p)) kl.push('gesucht');
    if (jeSicht && fs[vw(p)] === 'gesucht') kl.push('fragzu');
    if (jeSicht && fs[vw(p)] === 'keine') kl.push('fragweg');
    const fb = ctx.farblos ? '' : farbeVon(k);
    if (fb) kl.push(fb.startsWith('t-') ? fb : 'f-' + fb);
    if (mk[p]) kl.push(mk[p]);
    if (hervor && k !== 'E' && !hervor.has(p)) kl.push('blass');
    // NEU (Fassung 3.5, Punkt 1): die Bezeichnung, sobald entdeckt; in der
    // Tafel bei den Anteilen «= P_Ü(B)» (neben «Anteil in der Zeile»)
    const nm = d.querySelector('.bwname');
    if (nm){
      const html = k === 'E' ? (vw(p) === 'r' ? 'gesamt' : '')
        : namenAn(A, k) ? (vw(p) === 't' && ST[k].art === 'bed' ? '= ' : '') + teileHtml(pTeile(A, k)) : '';
      if (nm.innerHTML !== html) nm.innerHTML = html;
      // eben entdeckt: kurz hervorheben
      if (html && k !== 'E' && vorher && !vorher.has(k)) kl.push('neuname');
    }
    d.className = kl.join(' ');
    inp.readOnly = !ctx.schreiben || k === 'E';
    if (document.activeElement !== inp)
      inp.value = E.falsch && E.falsch[p] !== undefined ? E.falsch[p] : (e ? e.text : '');
    inp.placeholder = istFrage(z, p) && !e ? '?' : '';
    d.querySelector('.bwbild').textContent = e ? e.text : (istFrage(z, p) ? '?' : '');
    // Die Rechnung klein darunter - nur, wenn eine getippt wurde und das
    // Feld nicht gerade eine falsche Eingabe zeigt.
    // NEU (Rike 2026-10-17): bei einem direkten Wert der Vorschlag
    d.querySelector('.bwrech').textContent = !e || e.fest || (E.falsch && E.falsch[p] !== undefined) ? ''
      : !e.ohne && e.ausdruck ? e.ausdruck : e.ohne && e.vorschlag ? e.vorschlag.ausdruck : '';
  });
  _namenVorher = {A, k: new Set(SCHLUESSEL.filter(k => k !== 'E' && namenAn(A, k)))};
  if (BRETT.karte && ctx.oben) karteSetzen(BRETT.karte, ctx.oben);
  fuehrungSetzen(brett, ctx.fuehrung ? ctx.fuehrung() : null);
  rechnenZeigen();
  blaseZeichnen();
}
/* NEU (Fassung 3.5, Punkt 3): die Fragekarte. oben = {html, n, art} */
function karteSetzen(el, o){
  el.className = 'bwfkarte' + (o.art ? ' ' + o.art : '');
  el.innerHTML = `<div class="q">${o.html}</div>` + (o.n ? `<div class="n">${o.n}</div>` : '');
}

/* ───────── Gemeinsames fuer die linke Haelfte ───────── */
let E = null;     // nur fuer diese Sitzung: Auswahl, falsche Eingaben, Meldung

function meldung(html, art){ E.meldung = {html, art: art || ''}; }
function meldungZeigen(){
  const mel = document.getElementById('befund');
  if (!mel) return;
  mel.innerHTML = E && E.meldung ? E.meldung.html : '';
  mel.className = 'befund' + (E && E.meldung ? ' bwm ' + E.meldung.art : '');
}
function namenHtml(A){
  const namen = ['X', 'nX', 'Y', 'nY'].map(e => `<b>${esc(sym(A, e))}</b> ${esc(A.namen[e][1])}`);
  return `<div class="namen">${namen.slice(0, 2).join(' · ')}<br>${namen.slice(2).join(' · ')}</div>`;
}
function mitLage(fn){
  const hl = document.getElementById('links'), hr = document.getElementById('rechts');
  const ol = hl ? hl.scrollTop : 0, or = hr ? hr.scrollTop : 0;
  // FEHLERBEHOBEN (Fassung 3.2): Die Rueckmeldung bekommt in der Leiste
  // eine eigene Zeile. Erschien sie erst NACH dem Einpassen des Bretts,
  // war das Brett um diese Zeile zu hoch und die Haelfte rollte.
  meldungZeigen();
  fn();
  if (hl) hl.scrollTop = ol;
  if (hr) hr.scrollTop = or;
  meldungZeigen();
  mitnehmenAuffrischen();
  sichern();
}
/* Das Ergebnis eines Eintrags melden. */
function eintragMelden(A, z, p, r){
  // GEAENDERT (Fassung 3.6): die Ablehnung am Feld, in der Blase
  if (!r.ok){ blase(p, r.art || 'a', r.html); return; }
  E.blase = null;      // gelungen: eine alte Blase ist erledigt
  const e = z.eintraege[r.nr - 1];
  meldung(`✓ ${teileHtml(protokollTeile(A, e, r.nr))}` + (e.ohne && !e.vorschlag ? ' <span style="color:#C77D0A;font-style:italic">— ohne Rechnung</span>' : '')
    + (r.nachgetragen ? ' <span style="color:var(--matt)">(Eintrag ' + r.nr + ' ersetzt)</span>' : ''), 'ok');
}

/* Eine Rechnung fuer die Loesung: aus den Werten, die schon dastehen. */
function ausdruckFuer(A, z, v, w){
  const W = werteVon(A, z), T = k => W[v + ':' + k].text;
  const art = k => ST[k].art;
  const q = w.quellen.slice();
  if (w.regel === 'produkt') q.sort((a, b) => (art(a) === 'rand' ? 0 : 1) - (art(b) === 'rand' ? 0 : 1));
  if (w.regel === 'definition') q.sort((a, b) => (art(a) === 'schnitt' ? 0 : 1) - (art(b) === 'schnitt' ? 0 : 1));
  if (w.regel === 'produkt') return `${T(q[0])} · ${T(q[1])}`;
  if (w.regel === 'definition') return `${T(q[0])} : ${T(q[1])}`;
  if (w.regel === 'gegen') return einsText(A) + ' − ' + T(q[0]);
  if (art(w.ziel) === 'schnitt'){
    q.sort((a, b) => (art(a) === 'rand' ? 0 : 1) - (art(b) === 'rand' ? 0 : 1));
    return `${T(q[0])} − ${T(q[1])}`;
  }
  return `${T(q[0])} + ${T(q[1])}`;
}
function gegebenText(A, k){
  const w = wahrB(A, k);
  if (A.anzeige !== 'bruch') return zahlText(bZahl(w)).text;
  if (A.nenner && Number.isInteger(bZahl(w) * A.nenner)) return `${Math.round(bZahl(w) * A.nenner)}/${A.nenner}`;
  return bruchText(w);
}
function loesungWeg(A, z, v, weg, gegeben){
  gegeben.forEach(k => eintragVerarbeiten(A, z, v + ':' + k, gegebenText(A, k)));
  weg.forEach(w => {
    const r = eintragVerarbeiten(A, z, v + ':' + w.ziel, ausdruckFuer(A, z, v, w));
    if (!r.ok) console.warn('Loesung: Schritt nicht angenommen', A.id, w, r.html);
  });
}

/* ════════════════ Etappe 1 · Zwei Situationen vollständig ════════════════
   Ohne Frage, nur Angaben (Fassung 3.1, Punkt 1).
   GEAENDERT (Fassung 3.3): zwei Situationen. S1 Uebungsstunden mit zwei
   Zuegen (seit dem Nachtrag 2026-10-10); S2 Wuerfel nur «eintragen und berechnen», danach die
   Frage nach beiden Situationen, «Haengen A und B zusammen?» und «Eine
   moegliche Sicht». Die Situation wird in der Auftragsleiste gewaehlt. */
function e1stand(){
  if (!stand.bwe1 || !stand.bwe1.eintraege) stand.bwe1 = {eintraege: [], zug: 1, paare: []};
  const z = stand.bwe1;
  // NEU (Nachtrag 2026-10-10): «Angaben markieren» entfaellt. Ein alter
  // Stand traegt noch die Markier-Daten; dort war «Finde den Wert» Zug 3
  // und das Markieren Zug 2. Umschreiben, Markierungen verwerfen.
  if ('markiert' in z || 'markGeprueft' in z){
    if (z.zug === 3) z.zug = 2;
    else if (z.zug === 2) z.zug = vollstaendig(z) ? 2 : 1;
    ['markiert', 'markGeprueft', 'markRichtig', 'markText'].forEach(n => { delete z[n]; });
  }
  if (z.zug !== 1 && z.zug !== 2) z.zug = 1;
  if (!Array.isArray(z.paare)) z.paare = [];
  if (!z.findeSaat) findeFolge(z);   // Saat einmal festlegen
  return z;
}
function e1bstand(){
  if (!stand.bwe1b || !stand.bwe1b.eintraege) stand.bwe1b = {eintraege: [], wahl: null};
  return stand.bwe1b;
}
const e1sit = () => (stand.bwe1sit === 1 ? 1 : 0);
const e1A = () => SITS[e1sit()];
const e1z = () => (e1sit() === 1 ? e1bstand() : e1stand());
const vollstaendig = z => ALLE_STELLEN.every(p => z.eintraege.some(e => e.p === p));

function loesungE1(){
  // GEAENDERT (Nachtrag 2026-10-10): ohne Markier-Schritt, «Finde den Wert» ist Zug 2
  const z = {eintraege: [], zug: 2, paare: SCHLUESSEL.slice()};
  ['r', 't'].forEach(v => loesungWeg(SIT, z, v, SIT.weg, SIT.gegeben));
  return z;
}
function loesungE1b(){
  const z = {eintraege: [], wahl: SIT2.vergleich ? SIT2.vergleich.richtig : null};
  ['t', 'r'].forEach(v => loesungWeg(SIT2, z, v, SIT2.weg, SIT2.gegeben));
  return z;
}

function etappe1(){
  loesungAnwenden(() => ({bwe1: loesungE1(), bwe1b: loesungE1b()}));
  e1stand(); e1bstand();
  E = {falsch: {}, meldung: null, finde: {}, rechnen: null, neuSicher: false, protOffen: false};
  bwBuehne(D.etappen[0], 'Etappe 1 · ' + D.etappen[0].name,
    `<button class="knopf leer" id="bwzurueck" title="Letzten Eintrag zurücknehmen">↶ Eintrag zurück</button>
     <button class="knopf leer" id="bwneu" title="Diese Situation von vorn beginnen">↺ Neu</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="bwweiter" style="margin-left:auto">Etappe 2 →</button>`);
  document.getElementById('bwzurueck').onclick = () => {
    const z = e1z();
    E.blase = null;
    if (z.eintraege.length){ z.eintraege.pop(); meldung(`Eintrag ${z.eintraege.length + 1} zurückgenommen.`); }
    else meldung('Es gibt keinen Eintrag zum Zurücknehmen.');
    e1auffrischen();
  };
  document.getElementById('bwneu').onclick = () => {
    const kn = document.getElementById('bwneu');
    if (!E.neuSicher){ E.neuSicher = true; kn.textContent = 'Wirklich von vorn?'; return; }
    E.neuSicher = false; kn.textContent = '↺ Neu';
    if (e1sit() === 1){ stand.bwe1b = null; e1bstand(); }
    else { stand.bwe1 = null; e1stand(); }
    E.falsch = {}; E.finde = {}; E.rechnen = null; E.meldung = null; E.anlOffen = undefined; E.blase = null;
    e1zeichnen();
  };
  document.getElementById('bwweiter').onclick = () => { stand.etappe = 1; los(); };
  window._neuzeichnen = e1zeichnen;
  e1zeichnen();
  loesungsKnopf(() => etappe1());
  auftragBeimOeffnen(1);
}

function e1ctx(A, z){
  const zug = A.paaren ? (z.zug || 1) : 1;
  return {A, z, schreiben: zug === 1, fragen: false, rechnen: zug === 1, leiste: zug === 1, protokoll: zug === 1,
    oben: zug === 2 ? findeKarte(z) : null,
    // NEU (Fassung 3.6): Zug 2 wird angeklickt, nicht beschrieben - der
    // einzige Ort in Etappe 1, an dem Tippen abgelehnt wird (Grund b).
    nurLesen: () => 'In «Finde den Wert» wird nicht geschrieben: Klicken Sie die Stelle im Baum und in der Tafel an. Werte ändern geht in Zug 1.',
    eintrag: (p, txt, q) => e1eintrag(p, txt, q), klick: p => e1klick(p),
    markiert: () => {
      const mk = {};
      // GEAENDERT (Nachtrag 2026-10-10): nur noch die Wahl in «Finde den Wert»
      if (zug === 2) Object.values(E.finde || {}).forEach(p => { if (p) mk[p] = 'bwwahl'; });
      return mk;
    }};
}
function e1zeichnen(){
  // FEHLERBEHOBEN (Fassung 4.1): Ein spaeter Neuzeichnen-Aufruf (Fenstergroesse)
  // nach dem Verlassen der Etappe fand #bwkopf nicht mehr. Ursache: window._neuzeichnen
  // bleibt gesetzt. Ohne Kopf nichts tun.
  if (!document.getElementById('bwkopf')) return;
  mitLage(() => {
    const A = e1A(), z = e1z();
    e1links(A, z);
    brettBauen(document.getElementById('feld'), e1ctx(A, z));
  });
}
function e1auffrischen(){
  // NEU (Fassung 3.5, Punkt 2): Klappt die Anleitung zu (oder auf), aendert
  // sich die Hoehe oben - dann das Brett neu einpassen.
  const kopf = document.getElementById('bwkopf'), h0 = kopf ? kopf.offsetHeight : 0;
  mitLage(() => { const A = e1A(), z = e1z(); e1links(A, z); if (BRETT) BRETT.ctx = e1ctx(A, z); brettAuffrischen(); });
  if (kopf && kopf.isConnected && kopf.offsetHeight !== h0) e1zeichnen();
}
/* ───────── NEU (Rike 2026-10-17, Zusatz «Zug 2») ─────────
   «Studierende sehen nicht, dass sie nach einem Zug zu Zug 2 muessen, nicht
   zur naechsten Situation.» Ist ein Zug fertig, steht unten im Brettbereich
   eine Fahne mit dem Knopf (#bwfahne, in #rechts, ueberlebt den Neubau des
   Bretts). Nach Zug 1 geht es nach etwa 1.5 s von selbst weiter, mit
   sichtbarer Notiz. Nur nach dem letzten Zug: «Naechste Situation →».
   Gemerkt wird nichts im Stand: Die Automatik loest nur der Eintrag aus,
   der den Zug fertig macht - nie das Laden. */
let _zugUhr = null, _fahneUhr = null;
function weiterFahne(o){
  const r = document.getElementById('rechts');
  let f = document.getElementById('bwfahne');
  if (!o || !r){ if (f) f.remove(); return; }
  const sig = o.notiz + '|' + o.knopf + '|' + !!o.uhr;
  if (!f || f.parentNode !== r){
    if (f) f.remove();
    f = document.createElement('div');
    f.id = 'bwfahne'; f.className = 'bwfahne'; f.setAttribute('role', 'status');
    r.appendChild(f);
  }
  if (f.dataset.sig !== sig){
    f.dataset.sig = sig;
    f.innerHTML = (o.notiz ? `<span class="notiz">${esc(o.notiz)}</span>` : '')
      + (o.knopf ? `<button type="button" class="knopf">${esc(o.knopf)}</button>` : '')
      + (o.uhr ? '<span class="uhr"><i></i></span>' : '');
  }
  const kn = f.querySelector('button');
  if (kn) kn.onclick = ev => { ev.stopPropagation(); o.tun(); };
}
function zuZug2(z){
  clearTimeout(_zugUhr); _zugUhr = null;
  const auto = !!E.zugAuto;
  E.zugAuto = false;
  z.zug = 2; E.finde = {}; E.rechnen = null; E.anlOffen = undefined; E.blase = null;
  meldung(auto ? 'Zug 1 fertig – weiter mit Zug 2: Finde den Wert.' : 'Zug 2: Finde den Wert.', 'ok');
  e1zeichnen();
}
function zugAutomatisch(z){
  E.zugAuto = true;
  const Ejetzt = E;
  clearTimeout(_zugUhr);
  _zugUhr = setTimeout(() => {
    // Nur, wenn man noch dort ist: dieselbe Etappe, Situation und Zug 1
    if (E !== Ejetzt || !E.zugAuto || !document.getElementById('bwkopf')) return;
    if (e1sit() !== 0 || e1z() !== z || (z.zug || 1) !== 1 || !vollstaendig(z)) return;
    zuZug2(z);
  }, 1500);
}

/* NEU (Fassung 3.5, Punkt 3): die Frage von «Finde den Wert» als Karte
   direkt ueber dem Brett, daneben nur der Zaehler. */
function findeKarte(z){
  if (!vollstaendig(z)) return {html: 'Erst Zug 1: Der Baum und die Tafel müssen vollständig sein.', art: 'still'};
  const f = findeOffen(z)[0];
  // Am Ende keine Karte: oben steht «Alle Werte gefunden», das Brett
  // bekommt den Platz.
  if (!f) return null;
  return {html: esc(f.frage), n: `<b>${findeFertig(z) + 1}</b> von ${FINDE.length}`};
}
/* NEU (Fassung 3.5, Punkt 2): Die Anleitung ist offen, solange noch
   nichts getan ist; danach eine Zeile, die sich aufklappen laesst
   (E.anlOffen merkt die eigene Wahl fuer diese Sitzung). */
function anleitungHtml(ziel, schritte, getan){
  const offen = E.anlOffen === undefined ? !getan : E.anlOffen;
  return `<details class="bwanl" id="bwanl" data-war="${offen}"${offen ? ' open' : ''}><summary class="ziel">${ziel}</summary>${schritte}</details>`;
}
function anleitungHaken(kopf){
  const d = kopf.querySelector('#bwanl');
  if (d) d.addEventListener('toggle', () => {
    // Der Browser meldet auch das Oeffnen beim Einsetzen - das ist keine Wahl.
    if (String(d.open) === d.dataset.war) return;
    d.dataset.war = String(d.open);
    E.anlOffen = d.open;
    if (window._neuzeichnen) window._neuzeichnen();
  });
}

/* S1 ist fertig, wenn alle Fragen von «Finde den Wert» beantwortet sind
   (dann sind alle Stellen gefaerbt); S2, wenn Baum und Tafel vollstaendig
   sind. */
const FINDE = SIT.finde || [];
// NEU (Nachtrag 2026-10-10, Rike): alle 16 Werte, gemischt. Die Saat
// steht im Stand (z.findeSaat), damit ein Neuladen nicht neu mischt.
function findeFolge(z){
  if (!z.findeSaat) z.findeSaat = 1 + Math.floor(Math.random() * 2147483646);
  let a = z.findeSaat >>> 0;
  const zufall = () => {      // mulberry32
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const f = FINDE.slice();
  for (let i = f.length - 1; i > 0; i--){ const j = Math.floor(zufall() * (i + 1)); [f[i], f[j]] = [f[j], f[i]]; }
  return f;
}
const findeOffen = z => findeFolge(z).filter(f => !(z.paare || []).includes(f.k));
const findeFertig = z => FINDE.length - findeOffen(z).length;
const s1fertig = () => !!(stand.bwe1 && stand.bwe1.eintraege && (stand.bwe1.paare || []).length === SCHLUESSEL.length);
const s2fertig = () => !!(stand.bwe1b && stand.bwe1b.eintraege && vollstaendig(stand.bwe1b));

/* «Haengen ... zusammen?» - abhaengig/unabhaengig mit Begruendung. Aus
   Etappe 2 (Wuerfel, Fassung 3.2) uebernommen; seit Fassung 3.3 in
   Etappe 1, S2.
   NEU (Fassung 3.7): dieselbe Antwortform fuer «Brille und Lesen» in
   Etappe 2. Die Worte der beiden Antworten stehen in A.vergleich.worte
   («hängen zusammen» / «unabhängig»), sonst «abhängig» / «unabhängig».
   Die Bezeichnungen (P_B(L), P(L)) stehen hier immer, weil der Vergleich
   sie nennt (wie beim Wuerfel nach dem Ausfuellen). `nach` (Etappe 2):
   nach der Wahl neu zeichnen statt nur das Urteil setzen. */
const vName = (A, k) => mitAllenNamen(() => nameHtml(A, 'r:' + k));
function vergleichHtml(A, z){
  const v = A.vergleich, w = v.worte || ['abhängig', 'unabhängig'];
  return `<div class="bwvergleich"><div class="kopf">Hängen ${esc(sym(A, 'X'))} und ${esc(sym(A, 'Y'))} zusammen?
    <span style="font-weight:400;color:var(--matt)">Vergleichen Sie ${vName(A, v.links)} mit ${vName(A, v.rechts)}.</span></div>
    <label><input type="radio" name="bwwahl" value="abh"${z.wahl === 'abh' ? ' checked' : ''}> ${esc(w[0])}</label>
    <label><input type="radio" name="bwwahl" value="unabh"${z.wahl === 'unabh' ? ' checked' : ''}> ${esc(w[1])}</label>
    <textarea id="bwbegr" placeholder="Begründung …"></textarea>
    <div class="bwurteil" id="bwurteil"></div></div>`;
}
function vergleichHaken(tisch, A, z, nach){
  const begr = tisch.querySelector('#bwbegr');
  if (!begr) return;
  begr.value = stand.texte['bw_' + A.id + '_begr'] || '';
  begr.oninput = () => { stand.texte['bw_' + A.id + '_begr'] = begr.value; };
  const urteil = () => {
    const u = tisch.querySelector('#bwurteil'), v = A.vergleich;
    if (!z.wahl){ u.textContent = ''; return; }
    const fehlt = [v.links, v.rechts].filter(k => !z.eintraege.some(e => kk(e.p) === k));
    u.innerHTML = fehlt.length
      ? `Tragen Sie zum Vergleich noch ${fehlt.map(k => vName(A, k)).join(' und ')} ein.`
      : z.wahl === v.richtig
      ? `<span style="color:var(--richtig)">✓</span> ${A.schluss}`
      : `Schauen Sie noch einmal: Ist ${vName(A, v.links)} gleich ${vName(A, v.rechts)}?`;
  };
  tisch.querySelectorAll('input[name=bwwahl]').forEach(r => r.onchange = () => {
    z.wahl = r.value; sichern();
    if (nach) nach(); else urteil();
  });
  urteil();
}

/* GEAENDERT (Fassung 3.2, Punkte 1, 2, 4): Situation und Auftrag stehen
   oben in #bwkopf, die Zug- und Situationswahl in der Auftragsleiste. Je
   Zug ein Satz fuer das Ziel und hoechstens drei kurze Schritte - was zu
   tun ist, nicht wie die Flaeche funktioniert. Keine Herkunftsangabe. */
function e1links(A, z){
  const kopf = document.getElementById('bwkopf'), reiterEl = document.getElementById('bwreiter');
  const zug = A.paaren ? (z.zug || 1) : 1, voll = vollstaendig(z);
  const nR = ALLE_STELLEN.filter(p => vw(p) === 'r' && z.eintraege.some(e => e.p === p)).length;
  const nT = ALLE_STELLEN.filter(p => vw(p) === 't' && z.eintraege.some(e => e.p === p)).length;
  const halb = ALLE_STELLEN.length / 2;
  // GEAENDERT (Rike 2026-10-17, Zusatz «Zug 2»): zwei Ebenen. Vorn die
  // Zuege der Situation als nummerierte Schrittreihe (der aktuelle
  // hervorgehoben, fertige mit ✓); dahinter, zurueckgenommen, die Wahl der
  // Situation - gedimmt mit «zuerst Zug 1 und 2», solange Zuege offen sind.
  // (Bis dahin: erst die Situationen, dann die Zuege, gleich gewichtet.)
  let rh = '';
  const zugOffen = !!A.paaren && !s1fertig();
  if (A.paaren){
    // GEAENDERT (Nachtrag 2026-10-10): «Angaben markieren» entfaellt
    const reiter = [[1, 'Eintragen und berechnen', voll],
                    [2, 'Finde den Wert', z.paare.length === SCHLUESSEL.length]];
    rh += '<span class="bwzuege" role="group" aria-label="Züge dieser Situation">' + reiter.map(([n, t, ok], i) =>
      (i ? '<span class="pfeil" aria-hidden="true">›</span>' : '')
      + `<button data-zug="${n}" class="bwzug${ok ? ' fertig' : ''}" aria-current="${zug === n}" title="Zug ${n} · ${t}"><span class="nr">${ok ? '✓' : n}</span>Zug ${n}<span class="lang">&nbsp;· ${t}</span></button>`).join('')
      + '</span>';
  }
  rh += `<span class="bwsitwahl${zugOffen ? ' gedimmt' : ''}"${zugOffen ? ' title="zuerst Zug 1 und 2"' : ''}><span class="was">Situation:</span>`
    + SITS.map((S, i) => `<button data-sit="${i}" aria-current="${e1sit() === i}">${esc(label(S))}`
      + `${(i === 0 ? s1fertig() : s2fertig()) ? ' <span class="ok">✓</span>' : ''}</button>`).join('')
    + (zugOffen ? '<span class="hin">zuerst Zug 1 und 2</span>' : '') + '</span>';
  // GEAENDERT (Rike 2026-10-18): der Knopf «☰ Auftrag» steht jetzt in der
  // Situationskarte neben dem Auftragssatz.
  reiterEl.innerHTML = rh;
  const voll2 = !A.paaren && voll;
  // GEAENDERT (Fassung 4.1): die Situation als Karte ganz oben, mit
  // Textmarker (Stift «Angabe»).
  let h = situationKarte(A, {titel: esc(label(A)), frage: false, stifte: ['angabe'], auftrag: D.etappen[0].auftrag,
    nr: 1, getan: z.eintraege.length > 0});
  // Was nach dem Ausfuellen kommt, steht neben der Karte (.bwmehr).
  let mehr = '';
  // S2, vollstaendig: die Frage nach beiden Situationen, die Sicht und der Vergleich.
  if (voll2)
    mehr += `<div class="kopf">${esc(BW.e1frage)}</div>
      <textarea id="bwe1vgl" placeholder="Ihre Antwort …"></textarea>
      <div class="zeile"><button class="knopf leer" id="bwsichtknopf">Eine mögliche Sicht</button></div>`
      + (stand.bwe1sicht ? `<div class="bwsicht">${esc(BW.e1sicht)}</div>` : '') + vergleichHtml(A, z);
  // GEAENDERT (2026-10-16, Rike: «das ist nicht verstaendlich. Bitte sagen,
  // dass man die Rechnung eintragen soll, und mit Beispiel»).
  const bsp = ANZ === 'prozent' ? ['70 %', '85 %', '59.5 %'] : ['0.7', '0.85', '0.595'];
  const rechnenLi = `<li>Berechnen Sie die übrigen Felder, indem Sie in jedes leere Feld <b>die Rechnung</b> eintragen. <span class="nw">Beispiel: Klicken Sie ins leere Feld, dann auf ${bsp[0]}, auf «·» und auf ${bsp[1]} – im Feld steht dann ${bsp[2]}, darunter «${bsp[0]} · ${bsp[1]}».</span> Sie können die Rechnung auch eintippen.</li>`;
  const rechnenTip = `Rechnung eintragen: leeres Feld anklicken, dann ${bsp[0]}, «·» und ${bsp[1]}.`;
  // GEAENDERT (Fassung 4.1): Schritte als schmale Leiste ueber dem Brett,
  // der aktuelle hervorgehoben; die Anleitung klappt darin auf.
  const angOk = A.gegeben.every(k => z.eintraege.some(e => kk(e.p) === k));
  const fuell = [
    {t: '1 · ' + (A.paaren ? 'Angaben eintragen' : 'Abzählen und eintragen'), ok: angOk,
     tip: A.paaren ? 'Die Angaben aus dem Text in den Baum oder die Tafel eintragen.' : 'Abzählen und als Brüche eintragen, z. B. «2/6».'},
    {t: `2 · Baum ausrechnen <b>${nR}/${halb}</b>`, ok: nR === halb, tip: rechnenTip},
    {t: `3 · Tafel ausrechnen <b>${nT}/${halb}</b>`, ok: nT === halb, tip: rechnenTip}];
  const jetzt = l => { const j = l.find(x => !x.ok); if (j) j.jetzt = true; return l; };
  if (!A.paaren){
    // S2 Wuerfel: Angaben aus Tafelsicht, abgezaehlt
    const l = jetzt(fuell.concat([{t: '4 · Frage beantworten', ok: !!(A.vergleich && z.wahl === A.vergleich.richtig),
      tip: 'Hängen die beiden Merkmale zusammen?'}]));
    h += schrittLeiste(l, `<p><b>${esc(D.etappen[0].auftrag)}</b></p><ol><li>Zählen Sie ab und tragen Sie die Werte als Brüche ein, <span class="nw">z. B. «2/6».</span></li>
      ${rechnenLi}
      <li>Füllen Sie den Baum und die Tafel je für sich ganz aus.</li></ol>`,
      voll ? '<span class="hin">Vollständig.</span>' : '', z.eintraege.length > 0);
  } else if (zug === 1){
    h += schrittLeiste(jetzt(fuell), `<p><b>${esc(D.etappen[0].auftrag)}</b></p><ol><li>Tragen Sie die Angaben aus dem Text ein.</li>
      ${rechnenLi}
      <li>Füllen Sie den Baum und die Tafel je für sich ganz aus.</li></ol>`,
      voll ? '<span class="hin">Vollständig.</span> <button class="knopf" data-geh="2">Weiter: Zug 2 →</button>' : '', z.eintraege.length > 0);
  } else {
    // GEAENDERT (Fassung 3.4, Punkt 4): «Finde den Wert» statt «Gleiches
    // finden» - von der Frage her, Baum UND Tafel anklicken.
    // GEAENDERT (Fassung 3.5, Punkt 3): Die Frage steht als Karte direkt
    // ueber dem Brett (findeKarte). Keine Kategorienamen; die Legende
    // zeigt nur die Farben, und erst am Ende.
    const alle = z.paare.length === SCHLUESSEL.length;
    const sf = BW.schlussfrage, ant = stand.texte.bw_e1_anzahl || '';
    const l = jetzt([
      {t: `1 · Werte finden <b>${findeFertig(z)}/${FINDE.length}</b>`, ok: alle,
       tip: 'Die Frage über dem Baum lesen, die Stelle im Baum und in der Tafel anklicken.'},
      {t: '2 · Wie viele Angaben braucht man?', ok: parseInt(ant, 10) === sf.antwort}]);
    h += schrittLeiste(l, alle ? '' : `<p><b>Wo steht der Wert im Baum und wo in der Tafel?</b></p><ol><li>Lesen Sie die Frage über dem Baum.</li>
         <li>Klicken Sie die Stelle im Baum an und die Stelle in der Tafel.</li>
         <li>Stimmen beide, färben sie sich und bekommen ihre Bezeichnung.</li></ol>`,
      alle ? '<span class="hin">Alle Werte gefunden: Jede Stelle ist gefärbt und beschriftet.</span>' : '', z.paare.length > 0);
    if (alle){
      mehr += '<div class="bwlegende">' + FARBFOLGE.map(a => {
        const ks = SCHLUESSEL.filter(k => farbeVon(k) === a);
        return `<div><span class="m" style="background:${a.startsWith('t-') ? '#fff' : FUELL[a]};border-color:${RAND[a]}"></span>`
          + ks.map(k => teileHtml(pTeile(A, k))).join(', ') + '</div>';
      }).join('') + '</div>';
      mehr += `<div class="bwschluss"><b>${esc(sf.frage)}</b>
        <input type="text" id="bwanzahl" value="${esc(ant)}" inputmode="numeric">
        <button class="knopf leer" id="bwanzahlok">Prüfen</button>
        <div id="bwanzahlurteil" style="font-size:12.5px"></div>
        <textarea id="bwanzahlbegr" placeholder="Warum? …"></textarea>
        <div class="zeile"><button class="knopf" data-sitgeh="1">Weiter: ${esc(label(SIT2))} →</button></div></div>`;
    }
  }
  // Die Leiste steht zuletzt (ueber dem Brett), die Fragen neben der Karte.
  if (mehr){
    const i = h.indexOf('<div class="bwsrow">');
    h = h.slice(0, i) + `<div class="bwmehr">${mehr}</div>` + h.slice(i);
  }
  // GEAENDERT (Fassung 4.1): das Rechenprotokoll steht unter dem Brett
  // (brettBauen, ctx.protokoll); in Zug 2 gibt es keines.
  kopf.innerHTML = h;
  protokollAuffrischen(A, z);
  markerHaken(kopf);
  karteHaken(kopf, 1, e1zeichnen);
  anleitungHaken(kopf);
  const tisch = kopf;
  const zuSit = i => { stand.bwe1sit = i; E.finde = {}; E.rechnen = null; E.meldung = null; E.falsch = {}; E.neuSicher = false; E.anlOffen = undefined; E.blase = null; e1zeichnen(); };
  reiterEl.querySelectorAll('[data-sit]').forEach(b => b.onclick = () => zuSit(+b.dataset.sit));
  tisch.querySelectorAll('[data-sitgeh]').forEach(b => b.onclick = () => zuSit(+b.dataset.sitgeh));
  reiterEl.querySelectorAll('[data-zug]').forEach(b => b.onclick = () => {
    clearTimeout(_zugUhr); E.zugAuto = false;
    z.zug = +b.dataset.zug; E.finde = {}; E.rechnen = null; E.meldung = null; E.anlOffen = undefined; E.blase = null; e1zeichnen(); });
  tisch.querySelectorAll('[data-geh]').forEach(b => b.onclick = () => {
    z.zug = +b.dataset.geh; E.finde = {}; E.rechnen = null; E.meldung = null; E.anlOffen = undefined; E.blase = null; e1zeichnen(); });
  // NEU (Rike 2026-10-17, Zusatz «Zug 2»): Weiter-Fahne im Brettbereich
  if (A.paaren && zug === 1 && voll)
    weiterFahne({notiz: E.zugAuto ? 'Zug 1 fertig – weiter mit Zug 2' : '', uhr: !!E.zugAuto,
                 knopf: 'Weiter zu Zug 2 →', tun: () => zuZug2(z)});
  else if (A.paaren && zug === 2 && z.paare.length === SCHLUESSEL.length)
    weiterFahne({notiz: 'Zug 2 fertig.', knopf: 'Nächste Situation →', tun: () => zuSit(1)});
  else if (!A.paaren && voll && A.vergleich && z.wahl === A.vergleich.richtig)
    weiterFahne({notiz: 'Beide Situationen fertig.', knopf: 'Weiter zu Etappe 2 →', tun: () => { stand.etappe = 1; los(); }});
  else weiterFahne(null);
  const an = tisch.querySelector('#bwanzahl');
  if (an){
    const urteil = () => {
      const u = tisch.querySelector('#bwanzahlurteil'), v = parseInt(an.value, 10);
      if (!an.value.trim()){ u.textContent = ''; return; }
      // FEHLERBEHOBEN (Fassung 3.6): «drei» oder «x» ergab «Brauchen Sie
      // wirklich so viele?». Ursache: NaN fiel durch beide Vergleiche.
      if (!/^\s*\d+\s*$/.test(an.value)){ u.innerHTML = '<span style="color:#a3650a">Diese Eingabe verstehe ich nicht. Schreiben Sie eine ganze Zahl, z. B. 4.</span>'; return; }
      u.innerHTML = v === BW.schlussfrage.antwort ? `<span style="color:var(--richtig)">✓</span> ${esc(BW.schlussfrage.einsicht)}`
        : v < BW.schlussfrage.antwort ? 'Reicht das? Versuchen Sie, nur damit den Baum und die Tafel zu füllen.'
        : `Brauchen Sie wirklich so viele? Welche davon folgen aus den anderen — etwa P(${SIT.namen.nX[0]}) aus P(${SIT.namen.X[0]})?`;
    };
    // GEAENDERT (Fassung 4.1): neu zeichnen, damit die Schrittleiste mitgeht
    tisch.querySelector('#bwanzahlok').onclick = () => { stand.texte.bw_e1_anzahl = an.value; e1auffrischen(); };
    an.addEventListener('keydown', ev => { if (ev.key === 'Enter'){ stand.texte.bw_e1_anzahl = an.value; e1auffrischen(); } });
    if (an.value) urteil();
    const bg = tisch.querySelector('#bwanzahlbegr');
    bg.value = stand.texte.bw_e1_begr || '';
    bg.oninput = () => { stand.texte.bw_e1_begr = bg.value; };
  }
  // S2: die Frage nach beiden Situationen, der Vergleich, die Sicht.
  // «Eine moegliche Sicht» erst, wenn eine eigene Antwort dasteht.
  const vgl = tisch.querySelector('#bwe1vgl');
  if (vgl){
    const sk = tisch.querySelector('#bwsichtknopf');
    // GEAENDERT (Fassung 3.6): nicht mehr stumm gesperrt - der Knopf sagt
    // beim Klick, warum noch nicht.
    const knopfStand = () => {
      const leer = !vgl.value.trim();
      sk.setAttribute('aria-disabled', String(leer)); sk.title = leer ? 'Schreiben Sie zuerst Ihre eigene Antwort.' : '';
    };
    vgl.value = stand.texte.bw_e1_vergleich || '';
    vgl.oninput = () => { stand.texte.bw_e1_vergleich = vgl.value; knopfStand(); };
    knopfStand();
    sk.onclick = () => {
      if (!vgl.value.trim()){ meldung('Schreiben Sie zuerst Ihre eigene Antwort — dann zeigt der Knopf eine mögliche Sicht.', 'nein'); return meldungZeigen(); }
      stand.bwe1sicht = true; e1auffrischen();
    };
    vergleichHaken(tisch, A, z, () => e1auffrischen());
  }
}

function e1eintrag(p, txt, quellen){
  const A = e1A(), z = e1z();
  if (!String(txt).trim()){ delete E.falsch[p]; return e1auffrischen(); }
  const warVoll = vollstaendig(z);
  const r = eintragVerarbeiten(A, z, p, txt, quellen);
  // NEU (Rike 2026-10-17, Zusatz «Zug 2»): Zug 1 eben fertig - nach etwa
  // 1.5 s von selbst zu Zug 2 (zugAutomatisch); zurueck geht es ueber die Leiste.
  if (r.ok && !warVoll && vollstaendig(z) && A.paaren && (z.zug || 1) === 1) zugAutomatisch(z);
  if (r.ok) delete E.falsch[p]; else E.falsch[p] = txt;
  eintragMelden(A, z, p, r);
  if (r.ok && vollstaendig(z))
    meldung(E.meldung.html + ' <b>Baum und Tafel sind vollständig.</b> '
      + (A.paaren ? 'Weiter mit Zug 2.' : 'Jetzt die Fragen oben.'), 'ok');
  e1auffrischen();
  nachEintrag(z, r);
}

function e1klick(p){
  const A = e1A(), z = e1z(), zug = A.paaren ? (z.zug || 1) : 1;
  // GEAENDERT (Nachtrag 2026-10-10): «Finde den Wert» ist jetzt Zug 2
  if (zug !== 2) return;
  // NEU (Fassung 3.4, Punkt 4): «Finde den Wert». Je Darstellung zaehlt
  // die zuletzt angeklickte Stelle; erst wenn beide gewaehlt sind, wird
  // geprueft. Eine falsche Wahl wird zurueckgesetzt, eine richtige bleibt.
  // GEAENDERT (Fassung 3.6): jede Ablehnung als Blase am angeklickten Feld
  if (!vollstaendig(z)){ blase(p, 'b', 'Erst Zug 1: Baum und Tafel vollständig ausfüllen, dann wird hier gesucht.'); return e1auffrischen(); }
  const f = findeOffen(z)[0];
  if (!f){ meldung('Alle Fragen sind gelöst.'); return e1auffrischen(); }
  E.finde[vw(p)] = E.finde[vw(p)] === p ? undefined : p;
  if (!E.finde.r || !E.finde.t){ E.meldung = null; return e1auffrischen(); }
  const okR = kk(E.finde.r) === f.k, okT = kk(E.finde.t) === f.k;
  if (!okR || !okT){
    const g = ST[f.k];
    const falsch = [okR ? null : E.finde.r, okT ? null : E.finde.t].filter(Boolean);
    const richtung = falsch.some(q => { const s = ST[kk(q)]; return g.art === 'bed' && s.art === 'bed' && s.bed === g.ev[0] && s.ev[0] === g.bed; });
    const wo = !okR && !okT ? 'Im Baum und in der Tafel stimmt es noch nicht.'
      : !okR ? 'In der Tafel stimmt es, im Baum noch nicht.' : 'Im Baum stimmt es, in der Tafel noch nicht.';
    // GEAENDERT (Fassung 3.5, Punkt 3): keine Namen und keine Kategorien
    // in der Rueckmeldung - die falsche Stelle verraet sonst ihre Bezeichnung.
    const zeig = falsch.includes(p) ? p : falsch[0];
    blase(zeig, 'a', 'Das passt hier nicht. ' + wo + (richtung ? ' Achtung, Richtung: Wer ist hier die Bedingung?' : ' Lesen Sie die Frage noch einmal.'),
      falsch.filter(q => q !== zeig));
    if (!okR) E.finde.r = undefined;
    if (!okT) E.finde.t = undefined;
    return e1auffrischen();
  }
  E.finde = {};
  z.paare.push(f.k);
  const alle = !findeOffen(z).length;
  // Nach der letzten Frage sind alle Stellen nach ihrer Art gefaerbt.
  if (alle) z.paare = SCHLUESSEL.slice();
  // GEAENDERT (Fassung 3.5): Mit dem Treffer erscheint die Bezeichnung an
  // beiden Orten; die Rueckmeldung nennt sie, ohne Kategorie.
  meldung(`✓ ${teileHtml(pTeile(A, f.k))} — im Baum und in der Tafel.`
    + (alle ? ' <b>Alle Werte gefunden.</b>' : ''), 'ok');
  e1zeichnen();     // neu bauen: Linien und Tafel faerben sich
}

/* ════════════════ Etappe 2 · Nur die Frage: welcher Weg? ════════════════
   Dieselbe Bedienung wie Etappe 1 (Fassung 3.1, Punkt 8). Das Gesuchte
   markiert der «?»-Knopf am Feld. Der Weg ist die Reihenfolge der
   Eintraege mit ihren Rechnungen.

   GEAENDERT (Fassung 3.6, Rike 2026-10-10): KEINE Sperre mehr. Angaben,
   «?» und Rechnungen in beliebiger Reihenfolge; jeder richtige Wert darf
   jederzeit eingetragen oder berechnet werden - auch beim gefuehrten
   Jugendtreffen («Wenn ich P(B) eintrage, trage ich sofort auch P(nicht B)
   ein ... das ist zu heftig an Einschraenkungen»). Die drei Schritte
   bleiben als Orientierung (e2schritt, nur Anzeige):
     1  Angaben eintragen     alle Angaben stehen (in Baum oder Tafel)
     2  Gesuchtes markieren   das «?» sitzt am richtigen Feld
     3  bis zum «?» rechnen   der gesuchte Wert steht da
   Geloest ist eine Aufgabe, wenn alle drei erfuellt sind (geloest); dann
   wird blass, was nicht zum Weg gehoert. Das Brett bleibt beschreibbar.
   Abgelehnt wird nur noch: ein falscher Wert (a), eine unlesbare Eingabe
   (d), ein «?» am falschen Feld (a) und beim Jugendtreffen eine Rechnung
   mit Werten aus der anderen Darstellung (c).
   Gefuehrtes Beispiel (Jugendtreffen): Die Fuehrung SCHLAEGT den naechsten
   Schritt vor (Leuchtrand und Satz) und richtet sich nach dem, was schon
   dasteht; wer mehr oder anderes getan hat, bekommt den naechsten
   Vorschlag. Beide Wege bleiben Pflicht: das «?» im Baum UND in der Tafel,
   in beliebiger Reihenfolge. Danach ist die Fuehrung vorbei
   (stand.bwe2.gefuehrt) - auch nach «Neu».

   NEU (gemeinsam entschieden, Rike 2026-10-10): Das «?» wird JE
   DARSTELLUNG gesetzt. Bisher erschien es mit dem Klick im Baum auch in
   der Tafel (und umgekehrt), weil nur der Schluessel (z.gesucht) zaehlte.
   Jetzt muessen die Studierenden die Stelle im Baum und die Stelle in der
   Tafel je selbst finden; jeder Klick auf ein «?» wird fuer sich geprueft
   (richtige Stelle oder die Begruendungsblase). Beim Jugendtreffen
   (beide Wege Pflicht) braucht es beide «?»; bei den anderen Aufgaben
   genuegt das «?» in der Darstellung, in der bis zum Gesuchten gerechnet
   wird. Nichts wird in die andere Darstellung gespiegelt. z.gesucht
   bleibt als Schluessel stehen (gesetzt, sobald irgendwo ein «?» sitzt),
   damit Protokoll und Bilder weiter lesen koennen. */
/* NEU (Fassung 4, Chilbi-Rahmen): Die Aufgaben haben neue IDs. Ein alter
   Stand (a2, velo, kiosk, brille, spam) wird beim Laden umgeschrieben:
   Eintraege, gewaehlte Aufgabe und Begruendungstexte. Die Zahlen sind
   dieselben, die Eintraege bleiben gueltig. */
function alteIdsUmschreiben(){
  const m = BW.alteIds || {}, s = stand.bwe2;
  if (s && s.a) for (const alt in m){
    if (s.a[alt] && !s.a[m[alt]]) s.a[m[alt]] = s.a[alt];
    delete s.a[alt];
  }
  if (s && m[s.ansicht]) s.ansicht = m[s.ansicht];
  if (stand.texte) for (const alt in m){
    const k = 'bw_' + alt + '_begr', n = 'bw_' + m[alt] + '_begr';
    if (k in stand.texte){
      if (!(n in stand.texte)) stand.texte[n] = stand.texte[k];
      delete stand.texte[k];
    }
  }
}
function e2stand(){
  alteIdsUmschreiben();
  if (!stand.bwe2 || !stand.bwe2.a) stand.bwe2 = {ansicht: AUFG[0].id, a: {}};
  // Aufgaben, die es nicht mehr gibt (vor Fassung 3.3: der Wuerfel), fallen weg
  if (!aufgabe(stand.bwe2.ansicht)) stand.bwe2.ansicht = AUFG[0].id;
  return stand.bwe2;
}
function e2zustand(id){
  const s = e2stand();
  if (!s.a[id] || !s.a[id].eintraege) s.a[id] = {eintraege: [], gesucht: null, wahl: null};
  const z = s.a[id];
  // Ein alter Stand (vor dem «?» je Darstellung): das «?» galt an beiden Orten
  if (z.gesucht && !z.fragen) z.fragen = {r: z.markNach || 0, t: z.markNach || 0};
  if (!z.fragen) z.fragen = {};
  return z;
}
/* NEU (Nachtrag 2026-10-10, Rike): Beim Jugendtreffen beide Wege, erst
   im einen, dann im anderen (Reihenfolge frei). */
const zweiWege = A => A.id === AUFG[0].id;
/* NEU (Rike 2026-10-18, «Lostoepfe mit oder ohne Anleitung»): Bei den
   Zwei Lostoepfen waehlt man «Mit Anleitung» oder «Selbststaendig: beide
   Wege allein»; Wechsel jederzeit, die Eintraege bleiben.
   stand.bwe2.lostopf = 'mit' | 'allein'. stand.bwe2.gefuehrt wird NICHT
   dafuer verwendet: es heisst seit Fassung 3.6 «das gefuehrte Beispiel
   ist vorbei» und wird nach dem Loesen gesetzt.
   Ohne Feld (neuer oder alter Stand): Hat die Aufgabe schon Eintraege oder
   ist die Fuehrung vorbei, gilt «mit» (alte Staende arbeiten weiter wie
   bisher); sonst ist noch nicht gewaehlt (null) - die Flaeche bietet die
   zwei Knoepfe an und verhaelt sich bis dahin wie «mit».
   Selbststaendig: keine Hinweisleiste des gefuehrten Beispiels (e2fuehrung),
   keine Schrittfuehrung (Schrittleiste, Statuszeile, Weg-1-Notiz). Beide
   Wege bleiben Pflicht, geprueft wie bisher (geloest), Hinweise bei Fehlern
   (Blase) wie bisher. */
function lostopfModus(z){
  const s = e2stand();
  if (s.lostopf === 'mit' || s.lostopf === 'allein') return s.lostopf;
  return s.gefuehrt || (z && z.eintraege && (z.eintraege.length || fragIrgendwo(z))) ? 'mit' : null;
}
const alleinArbeiten = (A, z) => zweiWege(A) && lostopfModus(z) === 'allein';
const IM = {r: 'im Baum', t: 'in der Tafel'}, AUS = {r: 'aus dem Baum', t: 'aus der Tafel'};
const andere = v => (v === 'r' ? 't' : 'r');
const daIn = (A, z, v) => z.eintraege.find(e => e.p === v + ':' + A.gesucht);
/* NEU (Fassung 3.7, Brille und Lesen): Steht die Angabe k da - in der
   Darstellung v oder (ohne v) irgendwo? Eine Angabe darf auch an ihrer
   zweiten Stelle stehen (A.gegeben_auch: «6 von ihnen» als 6/25 ODER 6/10). */
const angabeDa = (A, z, k, v) => z.eintraege.some(e => (!v || vw(e.p) === v)
  && (kk(e.p) === k || (A.gegeben_auch && A.gegeben_auch[k] === kk(e.p))));
const angabenIn = (A, z, v) => A.gegeben.every(k => angabeDa(A, z, k, v));
// NEU (Rike 2026-10-10): das «?» je Darstellung
const fragIn = (z, v) => !!(z && z.fragen) && z.fragen[v] !== undefined;
const fragIrgendwo = z => fragIn(z, 'r') || fragIn(z, 't');
/* Der schon erreichte erste Weg ('r' oder 't'), solange der zweite fehlt. */
function e2erster(A, z){
  if (!zweiWege(A)) return null;
  const r = daIn(A, z, 'r'), t = daIn(A, z, 't');
  return r && t ? null : r ? 'r' : t ? 't' : null;
}
// GEAENDERT (Rike 2026-10-10): zuerst der Wert dort, wo das «?» sitzt
const gesuchtDa = (A, z) => zweiWege(A)
  ? (daIn(A, z, 'r') && daIn(A, z, 't') ? daIn(A, z, 't') : undefined)
  : z.eintraege.find(e => kk(e.p) === A.gesucht && fragIn(z, vw(e.p)))
    || z.eintraege.find(e => kk(e.p) === A.gesucht);
/* Sitzen die noetigen «?»? Jugendtreffen: beide. Sonst eines in einer
   Darstellung, in der der gesuchte Wert auch steht. */
const fragOk = (A, z) => zweiWege(A) ? fragIn(z, 'r') && fragIn(z, 't')
  : ['r', 't'].some(v => fragIn(z, v) && daIn(A, z, v));
/* FEHLERBEHOBEN (2026-10-10): je Darstellung ein eigener Weg. In welchen
   Darstellungen ist das «?» gesetzt UND erreicht? Jugendtreffen: erst
   wenn beide stehen. Sonst jede, in der es so ist - auch die zweite, die
   jemand freiwillig noch rechnet. (Vorher zaehlte nur EINE Darstellung,
   die zweite wurde blass und ohne Weg gezeigt.) */
const wegeFertig = (A, z) => !basisGeloest(A, z) ? []
  : zweiWege(A) ? ['r', 't'] : ['r', 't'].filter(v => fragIn(z, v) && daIn(A, z, v));
/* Schritt 2 als Anzeige: im zweiten Weg beide «?», sonst irgendeines. */
const fragSchritt = (A, z) => e2erster(A, z) ? fragIn(z, 'r') && fragIn(z, 't') : fragIrgendwo(z);
/* Wo fehlt das «?» noch, obwohl der Wert dort steht? */
const fragFehlt = (A, z) => fragOk(A, z) ? []
  : ['r', 't'].filter(v => daIn(A, z, v) && !fragIn(z, v)
      && (zweiWege(A) || !['r', 't'].some(w => fragIn(z, w) && daIn(A, z, w))));
const angabenDa = (A, z) => A.gegeben.every(k => angabeDa(A, z, k));
/* NEU (Fassung 3.6): geloest - Angaben, «?» und Wert, gleich in welcher
   Reihenfolge. Ein alter Stand (Schritt fuer Schritt) erfuellt das ohnehin.
   NEU (Fassung 3.7): Aufgaben mit Vergleich (Brille und Lesen) brauchen
   dazu die Antwort «hängen zusammen / unabhängig» wie beim Wuerfel - und
   beide verglichenen Werte muessen dastehen. basisGeloest ist der Weg
   allein (das «?» ist erreicht). */
const basisGeloest = (A, z) => !!(z && z.eintraege) && fragOk(A, z) && !!gesuchtDa(A, z) && angabenDa(A, z);
const vergleichDa = (A, z) => [A.vergleich.links, A.vergleich.rechts].every(k => z.eintraege.some(e => kk(e.p) === k));
const vergleichOk = (A, z) => !A.vergleich || (z.wahl === A.vergleich.richtig && vergleichDa(A, z));
const geloest = (A, z) => basisGeloest(A, z) && vergleichOk(A, z);
/* Die Aufforderung, sobald der Weg steht, die Antwort aber fehlt. */
const vergleichAuf = A => `<b>Das «?» ist erreicht.</b> Vergleichen Sie jetzt ${mitAllenNamen(() => nameHtml(A, 'r:' + A.vergleich.links))} mit ${mitAllenNamen(() => nameHtml(A, 'r:' + A.vergleich.rechts))} und beantworten Sie die Frage.`;
/* Nur noch Anzeige: welcher Schritt als naechster vorgeschlagen wird. */
function e2schritt(A, z){
  if (geloest(A, z)) return 5;
  if (basisGeloest(A, z)) return 4;
  const v1 = e2erster(A, z);
  if (v1 ? !angabenIn(A, z, andere(v1)) : !angabenDa(A, z)) return 1;
  if (!fragSchritt(A, z)) return 2;
  return 3;
}
const fertigZahl = ids => ids.filter(id => geloest(aufgabe(id), e2stand().a[id])).length;
const fertigText = A => '<b>Das «?» ist erreicht' + (zweiWege(A) ? ' — auf beiden Wegen' : '') + '.</b> ' + A.schluss;

function loesungE2(){
  const a = {};
  AUFG.forEach(A => {
    const z = {eintraege: [], gesucht: A.gesucht, wahl: null, fragen: {}};
    loesungWeg(A, z, A.ansicht, A.weg, A.gegeben);
    // NEU (Fassung 3.7): der Vergleichswert und die Antwort (Brille)
    if (A.vergleich){
      if (!z.eintraege.some(e => kk(e.p) === A.vergleich.rechts))
        loesungWeg(A, z, A.ansicht, A.weg.filter(w => w.ziel === A.vergleich.rechts), []);
      z.wahl = A.vergleich.richtig;
    }
    z.markNach = A.gegeben.length;
    z.fragen[A.ansicht] = A.gegeben.length;
    if (zweiWege(A)){
      const n0 = z.eintraege.length;
      loesungWeg(A, z, andere(A.ansicht), A.weg, A.gegeben);
      z.fragen[andere(A.ansicht)] = n0 + A.gegeben.length;
    }
    a[A.id] = z;
  });
  return {ansicht: (stand.bwe2 && stand.bwe2.ansicht) || AUFG[0].id, gefuehrt: true, a};
}

function etappe2(){
  loesungAnwenden(() => ({bwe2: loesungE2()}));
  e2stand();
  E = {falsch: {}, meldung: null, rechnen: null, neuSicher: false, protOffen: false, blase: null};
  bwBuehne(D.etappen[1], 'Etappe 2 · Nur die Frage: welcher Weg?',
    `<button class="knopf leer" id="bwzurueck" title="Letzten Schritt zurücknehmen">↶ Eintrag zurück</button>
     <button class="knopf leer" id="bwneu" title="Diese Aufgabe von vorn beginnen">↺ Neu</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="bwweiter" style="margin-left:auto">Weiter zu Etappe 3 (freiwillig) →</button>`);
  document.getElementById('bwzurueck').onclick = () => {
    const z = e2zustand(e2stand().ansicht);
    E.blase = null;
    // Zurueck in der Reihenfolge, in der es entstand: Was nach dem «?»
    // eingetragen wurde, dann das «?», dann die Eintraege davor.
    // GEAENDERT (Rike 2026-10-10): je Darstellung - das zuletzt gesetzte «?»
    const zul = ['r', 't'].filter(v => fragIn(z, v) && z.eintraege.length <= z.fragen[v])
      .sort((a, b) => (z.fragen[b] - z.fragen[a]) || (b === z.fragLetzt ? 1 : -1))[0];
    if (zul){
      delete z.fragen[zul];
      if (!fragIrgendwo(z)) z.gesucht = null;
      meldung(`Die Markierung «?» ${IM[zul]} ist zurückgenommen.`);
    }
    else if (z.eintraege.length){ z.eintraege.pop(); meldung(`Eintrag ${z.eintraege.length + 1} zurückgenommen.`); }
    else meldung('Es gibt keinen Eintrag zum Zurücknehmen.');
    E.rechnen = null;
    e2auffrischen();
  };
  document.getElementById('bwneu').onclick = () => {
    const kn = document.getElementById('bwneu');
    if (!E.neuSicher){ E.neuSicher = true; kn.textContent = 'Wirklich von vorn?'; return; }
    E.neuSicher = false; kn.textContent = '↺ Neu';
    delete e2stand().a[e2stand().ansicht]; E.falsch = {}; E.rechnen = null; E.meldung = null; E.blase = null;
    e2zeichnen();
  };
  // GEAENDERT (Fassung 3.6): Etappe 3 entfaellt - weiter zum Mitnehmen
  // GEAENDERT (FASSUNG 4.3): weiter zur freiwilligen Etappe 3
  document.getElementById('bwweiter').onclick = () => { stand.etappe = 2; los(); };
  window._neuzeichnen = e2zeichnen;
  e2zeichnen();
  loesungsKnopf(() => etappe2());
  auftragBeimOeffnen(2);
}

/* Die Regel des naechsten Schritts in wenigen Worten - nur fuer das
   gefuehrte Beispiel. GEAENDERT (Fassung 3.4, Punkt 5): je Darstellung,
   und mit der Rechenart aus der Rechenleiste. */
const REGELWINK = {
  r: {produkt: ['Pfadregel: die beiden Äste multiplizieren', '×'],
      gegen: ['Gegenereignis: 1 minus den anderen Ast', '1 −'],
      addition: ['die beiden Pfadenden addieren', '+'],
      definition: ['Anteil: Pfadende durch Rand', '÷']},
  t: {produkt: ['Summe mal Anteil', '×'],
      gegen: ['Gegenereignis: 1 minus den anderen Wert', '1 −'],
      addition: ['die beiden Innenfelder addieren', '+'],
      definition: ['Anteil: Innenfeld durch Summe', '÷']},
};
/* Wo vorgeschlagen wird: in der Darstellung, in der zuletzt eingetragen
   wurde (Fassung 3.4: Baum ODER Tafel, die Studierenden waehlen). */
const e2wo = z => (z.eintraege.length ? vw(z.eintraege[z.eintraege.length - 1].p) : 'r');
/* GEAENDERT (Fassung 3.6): Die Fuehrung sperrt nichts. Sie schlaegt vor,
   was in der Darstellung v noch fehlt - erst eine Angabe, dann das «?»,
   dann den naechsten Schritt des Musterwegs, dessen Ziel noch leer ist.
   Wer etwas anderes oder mehr getan hat, bekommt einfach den naechsten
   Vorschlag. */
function e2fuehrung(A, z){
  const s = e2stand();
  if (s.gefuehrt || !zweiWege(A) || stand.loesungOffen || geloest(A, z)) return null;
  if (alleinArbeiten(A, z)) return null;     // NEU (Rike 2026-10-18): selbststaendig
  const v1 = e2erster(A, z), v = v1 ? andere(v1) : e2wo(z);
  const hat = k => z.eintraege.some(e => e.p === v + ':' + k);
  const vor = v1 ? `Jetzt dasselbe ${IM[v]}. ` : '';
  const k = A.gegeben.find(k => !hat(k));
  if (k)
    return {p: v + ':' + k, html: `${vor}${nameOder(A, v + ':' + k, 'Dieser Wert')} steht im Text. Tragen Sie den Wert hier ein${z.eintraege.length ? '' : ' — hier im Baum oder in der Tafel'}.`};
  // GEAENDERT (Rike 2026-10-10): das «?» je Darstellung
  if (v1 && !fragIn(z, v1))
    return {p: v1 + ':' + A.gesucht, html: `${IM[v1][0].toUpperCase() + IM[v1].slice(1)} fehlt noch das ?. Klicken Sie auf das kleine ? an diesem Feld.`};
  if (!fragIn(z, v))
    return {p: v + ':' + A.gesucht, html: `${vor}Gefragt ist ${nameOder(A, v + ':' + A.gesucht, 'dieses Feld')}. Klicken Sie auf das kleine ? an diesem Feld.`};
  if (hat(A.gesucht)) return null;
  const w = A.weg.find(w => !hat(w.ziel));
  if (!w) return null;
  const [was, op] = REGELWINK[v][w.regel];
  return {p: v + ':' + w.ziel, html: `${vor}Vorschlag: ${nameOder(A, v + ':' + w.ziel, 'dieses Feld')} — ${esc(was)}. `
    + (op === '1 −' ? `Feld anklicken, dann <b>1 −</b>, dann den Wert.`
                    : `Feld anklicken, dann den ersten Wert, dann <b>${esc(op)}</b>, dann den zweiten.`)};
}

function e2ctx(A, z){
  return {A, z, schreiben: true, fragen: true, rechnen: true, leiste: true, farblos: true, protokoll: true,
    // Solange in einer Darstellung kein «?» sitzt, stehen dort alle kleinen
    // ? bereit; danach nur das gesetzte.
    // FEHLERBEHOBEN (2026-10-10): je Darstellung, nicht fuers ganze Brett
    // (Ursache siehe brettAuffrischen) - auch bei den Aufgaben ausser dem
    // Jugendtreffen bleibt das «?» in der zweiten Darstellung setzbar.
    fragenSicht: {r: fragIn(z, 'r') ? 'gesucht' : 'alle', t: fragIn(z, 't') ? 'gesucht' : 'alle'},
    hervor: () => {
      const fertig = wegeFertig(A, z);
      if (!fertig.length) return null;
      // jeder erreichte Weg bleibt kraeftig, nebeneinander
      const set = new Set(fertig.flatMap(v => wegZu(z, v + ':' + A.gesucht).map(e => e.p)));
      // NEU (Fassung 3.7): beim Vergleich bleibt auch der Vergleichswert
      // (Brille: P(L)) mit seinem Weg kraeftig
      if (A.vergleich) ['r', 't'].forEach(v => wegZu(z, v + ':' + A.vergleich.rechts).forEach(e => set.add(e.p)));
      // FEHLERBEHOBEN (2026-10-10): Eine Darstellung, in der das «?» sitzt,
      // aber noch gerechnet wird, bleibt kraeftig (sonst sah sie gesperrt aus).
      ['r', 't'].filter(v => fragIn(z, v) && !fertig.includes(v))
        .forEach(v => Object.keys(ST).forEach(k => set.add(v + ':' + k)));
      return set;
    },
    fuehrung: () => e2fuehrung(A, z),
    eintrag: (p, txt, q) => e2eintrag(A, z, p, txt, q),
    klick: () => {},
    frage: p => e2frage(A, z, p)};
}
function e2zeichnen(){
  // FEHLERBEHOBEN (Fassung 4.1): Ein spaeter Neuzeichnen-Aufruf (Fenstergroesse)
  // nach dem Verlassen der Etappe fand #bwkopf nicht mehr. Ursache: window._neuzeichnen
  // bleibt gesetzt. Ohne Kopf nichts tun.
  if (!document.getElementById('bwkopf')) return;
  mitLage(() => {
    const s = e2stand(), A = aufgabe(s.ansicht), z = e2zustand(A.id);
    e2links(A, z);
    brettBauen(document.getElementById('feld'), e2ctx(A, z));
  });
}
function e2auffrischen(){
  // NEU (Fassung 4.1): aendert sich die Hoehe oben (Schrittleiste, Fragen
  // neben der Karte), das Brett neu einpassen - wie in Etappe 1.
  const kopf = document.getElementById('bwkopf'), h0 = kopf ? kopf.offsetHeight : 0;
  mitLage(() => {
    const s = e2stand(), A = aufgabe(s.ansicht), z = e2zustand(A.id);
    e2links(A, z); if (BRETT) BRETT.ctx = e2ctx(A, z); brettAuffrischen();
  });
  if (kopf && kopf.isConnected && kopf.offsetHeight !== h0) e2zeichnen();
}

/* GEAENDERT (Fassung 3.2): Aufgabenwahl in der Auftragsleiste, Frage,
   Aufgabe und Auftrag oben in #bwkopf. Keine Kuerzel «A2», keine
   Herkunft; Skriptaufgaben tragen ihre Nummer (label).
   GEAENDERT (Fassung 3.7, Rike 2026-10-16: «sehr, sehr unuebersichtlich»):
   keine lange Chipleiste mehr, sondern drei Bereiche - der Knopf «Zum
   Einstieg: Jugendtreffen», das Menue «Aus dem Skript» und das Menue «Neue
   Aufgaben» (aufklappbar, geloeste Aufgaben mit ✓). Die gewaehlte Aufgabe
   steht mit ihrem Titel gross im Kopf. Fortschritt: «Jugendtreffen ✓ · 1
   von 2 weiteren». Die Schritte stehen als Orientierung da; keiner sperrt. */
function menueHtml(id, titel, ids, s){
  const offen = E.menue === id, n = ids.filter(i => geloest(aufgabe(i), s.a[i])).length;
  return `<span class="bwmenue" data-menue="${id}">
    <button class="bwmknopf" aria-haspopup="true" aria-expanded="${offen}" aria-current="${ids.includes(s.ansicht)}">${esc(titel)}${n ? ` <span class="ok">${n} ✓</span>` : ''}<span class="pf">▾</span></button>
    <span class="bwmliste" role="menu"${offen ? '' : ' hidden'}>${ids.map(i => {
      const a = aufgabe(i);
      return `<button role="menuitem" data-ansicht="${i}" aria-current="${s.ansicht === i}"><span>${esc(label(a))}</span>${geloest(a, s.a[i]) ? '<span class="ok">✓</span>' : ''}</button>`;
    }).join('')}</span></span>`;
}
// Ein offenes Menue schliesst bei Klick daneben und mit Escape.
let _menueHaken = false;
function menueSchliessen(){
  if (!E || !E.menue) return;
  E.menue = null;
  document.querySelectorAll('.bwmenue .bwmliste').forEach(l => { l.hidden = true; });
  document.querySelectorAll('.bwmenue .bwmknopf').forEach(k => k.setAttribute('aria-expanded', 'false'));
}
/* Ein Menue, das rechts aus dem Fenster ragte, klappt nach links auf. */
function menuePlatzieren(li){
  li.classList.remove('rechts');
  if (!li.hidden && li.getBoundingClientRect().right > window.innerWidth - 8) li.classList.add('rechts');
}
function e2links(A, z){
  const kopf = document.getElementById('bwkopf'), reiterEl = document.getElementById('bwreiter'), s = e2stand();
  const frei = BW.freiwillig.includes(A.id);
  const ein = aufgabe(BW.pflicht[0]);
  // GEAENDERT (Rike 2026-10-17, Zusatz «Zug 2»): wie in Etappe 1 zwei
  // Ebenen. Bei der Einstiegsaufgabe (zwei Wege) vorn die Wege als
  // Schrittreihe; die Aufgabenwahl dahinter, gedimmt mit «zuerst Weg 1
  // und 2», solange ein Weg offen ist. Waehlbar bleibt sie.
  const wegOffen = zweiWege(A) && !geloest(A, z);
  let zr = '';
  if (zweiWege(A)){
    const w1 = e2erster(A, z) || geloest(A, z) || basisGeloest(A, z);
    zr = '<span class="bwzuege" role="group" aria-label="Wege dieser Aufgabe">'
      + [[1, 'Weg 1', !!w1], [2, 'Weg 2', geloest(A, z)]].map(([n, t, ok], i) =>
        (i ? '<span class="pfeil" aria-hidden="true">›</span>' : '')
        + `<span class="bwzug knopflos${ok ? ' fertig' : ''}" aria-current="${!ok && (n === 1 || w1)}" style="display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;padding:3px 9px;border:2px solid var(--linie);border-radius:999px;background:var(--karte)"><span class="nr">${ok ? '✓' : n}</span>${t}</span>`).join('')
      + '</span>';
  }
  reiterEl.innerHTML = zr + `<span class="bwsitwahl bwaufgwahl${wegOffen ? ' gedimmt' : ''}"${wegOffen ? ' title="zuerst Weg 1 und 2"' : ''}>`
    + `<button class="bwein" data-ansicht="${ein.id}" aria-current="${s.ansicht === ein.id}">Zum Einstieg: ${esc(label(ein))}${geloest(ein, s.a[ein.id]) ? ' <span class="ok">✓</span>' : ''}</button>`
    // GEAENDERT (Fassung 4): die Titel der Menues kommen aus flaeche.py
    // («Aus dem Skript», «An der Chilbi»)
    + menueHtml('skript', BW.menues.skript, BW.skript, s)
    + menueHtml('neu', BW.menues.neu, BW.neu, s)
    + (wegOffen ? '<span class="hin">zuerst Weg 1 und 2</span>' : '') + '</span>';
  // GEAENDERT (Fassung 4.1): Titel, Situation und Frage als Karte ganz
  // oben, mit Textmarker (Stifte «Angabe» und «gesucht»).
  let h = situationKarte(A, {titel: esc(label(A)) + (frei ? ' <span class="frei">nach Wahl</span>' : ''),
    frage: true, stifte: ['angabe', 'gesucht'], auftrag: D.etappen[1].auftrag,
    nr: 2, getan: z.eintraege.length > 0});
  let mehr = '';
  const schritt = e2schritt(A, z), v1 = e2erster(A, z), ganz = geloest(A, z), basis = basisGeloest(A, z);
  const erfuellt = [v1 ? angabenIn(A, z, andere(v1)) : angabenDa(A, z), fragSchritt(A, z), basis];
  const namen = ['1 · Angaben eintragen', '2 · Gesuchtes markieren', '3 · Bis zum ? rechnen'];
  const tips = ['Eintragen, was gegeben ist.', 'Am gesuchten Feld auf das kleine ? klicken.', 'Nur rechnen, was Sie für das ? brauchen.'];
  // NEU (Fassung 3.7): Aufgaben mit Vergleich haben einen vierten Schritt
  if (A.vergleich){ namen.push('4 · Vergleichen und antworten'); erfuellt.push(ganz); tips.push('Hängen die beiden Merkmale zusammen?'); }
  // GEAENDERT (Fassung 4.1): die Schritte als schmale Leiste ueber dem Brett
  const l = (zweiWege(A) ? [{t: 'Weg 1', ok: !!(v1 || ganz), jetzt: !v1 && !ganz},
                            {t: 'Weg 2', ok: ganz, jetzt: !!v1 && !ganz}] : [])
    .concat(namen.map((n, i) => ({t: esc(n), ok: erfuellt[i], jetzt: !erfuellt[i] && i + 1 === schritt, tip: tips[i]})));
  let det = '', stat = '';
  // NEU (Rike 2026-10-18): Modus der Lostoepfe
  const modus = zweiWege(A) ? lostopfModus(z) : null, allein = modus === 'allein';
  let modusHtml = '';
  if (zweiWege(A) && !ganz){
    if (modus === null)
      modusHtml = `<span class="bwmodus wahl"><b>Wie möchten Sie arbeiten?</b>
        <button type="button" class="knopf" data-modus="mit">Mit Anleitung</button>
        <button type="button" class="knopf" data-modus="allein">Selbstständig: beide Wege allein</button></span>`;
    else modusHtml = allein
      ? '<span class="bwmodus"><b>Selbstständig:</b> beide Wege allein, im Baum und in der Tafel. <button type="button" class="knopf leer" data-modus="mit">Doch mit Anleitung</button></span>'
      : '<span class="bwmodus"><button type="button" class="knopf leer" data-modus="allein">Ohne Anleitung weiter</button></span>';
  }
  if (allein && !ganz){
    // keine Schrittfuehrung: nur der Auftrag, die Leiste zeigt die beiden Wege
    l.splice(0, l.length, {t: 'Weg im Baum', ok: !!(daIn(A, z, 'r') && fragIn(z, 'r'))},
                          {t: 'Weg in der Tafel', ok: !!(daIn(A, z, 't') && fragIn(z, 't'))});
    det = `<p><b>${esc(D.etappen[1].auftrag)}</b></p><p>Beide Wege allein: einmal im Baum, einmal in der Tafel, jeder für sich.</p>`;
    stat = modusHtml;
  } else if (!ganz && A.vergleich && basis){
    stat = '<span class="hin">Das ? ist erreicht. Jetzt der Vergleich.</span>';
    mehr += vergleichHtml(A, z);
  } else if (!ganz){
    if (zweiWege(A))
      det += v1 ? '' : '<p>Diese Aufgabe lösen Sie <b>zweimal</b>: einmal im Baum, einmal in der Tafel, jeden Weg für sich. Womit Sie beginnen, ist frei.</p>';
    det += `<p><b>${esc(D.etappen[1].auftrag)}</b></p>`;
    // NEU (Rike 2026-10-10): das «?» je Darstellung, auch im Auftrag
    det += `<p>${zweiWege(A)
      ? 'Das ? setzen Sie in jeder Darstellung selbst: im Baum und in der Tafel.'
      : 'Das ? setzen Sie in der Darstellung, in der Sie rechnen — es erscheint nicht von selbst in der anderen.'} Reihenfolge frei, Baum oder Tafel.</p>`;
    const v = v1 ? andere(v1) : null;
    const da = A.gegeben.filter(k => angabeDa(A, z, k, v)).length;
    if (zweiWege(A) && v1)
      stat += `<span class="hin">Der Weg ${IM[v1]} steht. Jetzt dasselbe ${IM[andere(v1)]} — nur mit Werten ${AUS[andere(v1)]}.</span>`;
    stat += `<span>Angaben <b>${da}/${A.gegeben.length}</b>${v ? ' ' + IM[v] : ''}</span>`
      + `<span>Gesucht: <b>${z.gesucht ? nameOder(A, 'r:' + z.gesucht, 'das Feld mit dem ?') : 'noch kein ?'}</b>${fragIrgendwo(z)
          ? ' (? ' + ['r', 't'].filter(w => fragIn(z, w)).map(w => IM[w]).join(' und ') + ')' : ''}</span>`;
  } else {
    // NEU (Fassung 3.4, Punkt 5): Wie schnell war der Weg? Gezaehlt wird
    // jede Rechnung; der kuerzeste Weg ist der aus thema.py.
    const n = z.eintraege.filter(e => !e.ohne).length;
    const kurz = A.weg.length;
    // Bei Aufgaben mit Vergleich steht der Schluss im Urteil darunter.
    const schluss = A.vergleich ? '' : `<div class="zeile"><span>${A.schluss}</span></div>`;
    if (zweiWege(A) || wegeFertig(A, z).length === 2){
      const zahl = v => { const m = z.eintraege.filter(e => vw(e.p) === v && !e.ohne).length;
        return `${WO[v]}: <b>${m} ${m === 1 ? 'Rechnung' : 'Rechnungen'}</b>${m <= kurz ? ' — schneller geht es nicht' : ` — es geht auch mit ${kurz}`}`; };
      mehr += `<p class="ziel">Das ? ist im Baum und in der Tafel erreicht.</p>${schluss}
        <div class="zeile"><span>${zahl('r')}</span><span>${zahl('t')}</span></div>
        <div class="zeile"><span>Blass ist, was Sie für die beiden ? nicht gebraucht haben.</span></div>`;
    } else
    mehr += `<p class="ziel">Das ? ist erreicht.</p>${schluss}
      <div class="zeile"><span>${n <= kurz ? `<b>${n} ${n === 1 ? 'Rechnung' : 'Rechnungen'}</b> — schneller geht es nicht.`
        : `<b>${n} Rechnungen</b> — es geht auch mit ${kurz}.`} Blass ist, was Sie für das ? nicht gebraucht haben.</span></div>`;
    if (A.vergleich) mehr += vergleichHtml(A, z);
  }
  if (mehr) h += `<div class="bwmehr">${mehr}</div>`;
  if (modusHtml && !allein) stat = modusHtml + stat;
  h += schrittLeiste(l, det, stat, z.eintraege.length > 0 || fragIrgendwo(z));
  // NEU (Fassung 3.7): «Jugendtreffen ✓ · 1 von 2 weiteren»
  // GEAENDERT (Fassung 4.1): der Fortschritt steht in der Kopfleiste.
  const fw = fertigZahl(BW.freiwillig), m = BW.mindestens;
  const einOk = BW.pflicht.every(id => geloest(aufgabe(id), s.a[id]));
  // Fortschritt in die zurueckgenommene Wahl (Fassung 4.1: Kopfleiste)
  (reiterEl.querySelector('.bwaufgwahl') || reiterEl).insertAdjacentHTML('beforeend', `<span class="bwfort"><b>${esc(label(ein))} ${einOk ? '✓' : 'offen'}</b> · <b>${Math.min(fw, m)} von ${m}</b> weiteren`
    + `${fw > m ? ` (dazu ${fw - m} freiwillig)` : ''}${einOk && fw >= m ? ' — <b>Pflicht erfüllt.</b>' : ''}</span>`);
  kopf.innerHTML = h;
  protokollAuffrischen(A, z);
  markerHaken(kopf);
  karteHaken(kopf, 2, e2zeichnen);
  anleitungHaken(kopf);
  // NEU (Rike 2026-10-18): Modus wechseln, die Eintraege bleiben
  kopf.querySelectorAll('[data-modus]').forEach(b => b.onclick = () => {
    s.lostopf = b.dataset.modus;
    // «Mit Anleitung» gewaehlt: das gefuehrte Beispiel gilt wieder
    if (s.lostopf === 'mit' && !geloest(A, z)) s.gefuehrt = false;
    E.wegHinweis = null; E.anlOffen = undefined;
    meldung(s.lostopf === 'mit' ? 'Mit Anleitung: Der nächste Schritt wird vorgeschlagen.'
                                : 'Selbstständig: beide Wege allein, im Baum und in der Tafel.', 'ok');
    e2zeichnen();
  });
  if (A.vergleich){
    const war = geloest(A, z);
    vergleichHaken(kopf, A, z, () => {
      if (!war && geloest(A, z)) meldung(fertigText(A), 'ok');
      e2auffrischen();
    });
  }
  const waehlen = id => {
    E.menue = null;
    s.ansicht = id; E.falsch = {}; E.rechnen = null; E.meldung = null; E.neuSicher = false; E.blase = null; E.anlOffen = undefined; e2zeichnen(); };
  reiterEl.querySelectorAll('[data-ansicht]').forEach(b => b.onclick = ev => { ev.stopPropagation(); waehlen(b.dataset.ansicht); });
  // NEU (Rike 2026-10-17, Zusatz «Zug 2»): Weiter-Fahne im Brettbereich.
  // Weg 1 eben fertig: kurze Notiz (E.wegHinweis, von e2eintrag gesetzt);
  // Aufgabe geloest: «Naechste Aufgabe →» zur naechsten offenen.
  if (ganz){
    const folge = BW.pflicht.concat(BW.skript, BW.neu);
    const i0 = folge.indexOf(A.id);
    const naechste = folge.slice(i0 + 1).concat(folge.slice(0, i0)).find(id => !geloest(aufgabe(id), s.a[id]));
    const pflichtOk = einOk && fw >= m;
    weiterFahne(naechste && !pflichtOk
      ? {notiz: 'Aufgabe fertig.', knopf: 'Nächste Aufgabe →', tun: () => waehlen(naechste)}
      // GEAENDERT (FASSUNG 4.3): nach der Pflicht weiter zur freiwilligen Etappe 3
      : {notiz: pflichtOk ? 'Pflicht erfüllt.' : 'Aufgabe fertig.', knopf: 'Weiter zu Etappe 3 (freiwillig) →', tun: () => { stand.etappe = 2; los(); }});
  } else if (E.wegHinweis === A.id && v1 && !alleinArbeiten(A, z))
    weiterFahne({notiz: `Weg 1 fertig – weiter mit Weg 2 ${IM[andere(v1)]}`, knopf: '', tun: () => {}});
  else weiterFahne(null);
  reiterEl.querySelectorAll('.bwmenue').forEach(mn => {
    const kn = mn.querySelector('.bwmknopf'), li = mn.querySelector('.bwmliste');
    kn.onclick = ev => {
      ev.stopPropagation();
      const auf = E.menue !== mn.dataset.menue;
      menueSchliessen();
      if (auf){ E.menue = mn.dataset.menue; li.hidden = false; kn.setAttribute('aria-expanded', 'true'); menuePlatzieren(li); }
    };
    if (!li.hidden) menuePlatzieren(li);
  });
  if (!_menueHaken){
    _menueHaken = true;
    // pointerdown in der Fangphase: auch Felder, die den Klick fuer sich
    // behalten (stopPropagation), schliessen das Menue
    document.addEventListener('pointerdown', ev => { if (!ev.target.closest || !ev.target.closest('.bwmenue')) menueSchliessen(); }, true);
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape') menueSchliessen(); });
  }
}

function e2eintrag(A, z, p, txt, quellen){
  if (!String(txt).trim()){ delete E.falsch[p]; return e2auffrischen(); }
  const vorher = z.eintraege.slice(), warAngaben = angabenDa(A, z), warGeloest = geloest(A, z), warBasis = basisGeloest(A, z);
  const warWege = wegeFertig(A, z), warErster = e2erster(A, z);
  const r = eintragVerarbeiten(A, z, p, txt, quellen);
  // Beim Jugendtreffen jeder Weg fuer sich: keine Werte aus der anderen
  // Darstellung (Grund c). GEAENDERT (Fassung 3.6): Abschreiben als Zahl
  // und Eintragen im schon fertigen Weg sind erlaubt (jeder richtige Wert
  // jederzeit); die Zahl der Rechnungen am Schluss zeigt den Weg.
  if (r.ok && zweiWege(A)){
    const e = z.eintraege[r.nr - 1], v = vw(p);
    if (e.quellen.some(q => vw(q) !== v)){
      z.eintraege.splice(0, z.eintraege.length, ...vorher);
      delete E.falsch[p]; E.rechnen = null;
      blase(p, 'c', `Rechnen Sie ${IM[v]} mit Werten ${AUS[v]}. Fehlt ein Wert, tragen Sie ihn ${IM[v]} ein.`);
      return e2auffrischen();
    }
  }
  if (r.ok) delete E.falsch[p]; else E.falsch[p] = txt;
  eintragMelden(A, z, p, r);
  if (r.ok){
    const dazu = [];
    if (!warAngaben && angabenDa(A, z)) dazu.push('<b>Alle Angaben stehen.</b>');
    if (kk(p) === A.gesucht && !geloest(A, z)){
      if (zweiWege(A) && !gesuchtDa(A, z)) dazu.push(`<b>Das «?» ist ${IM[vw(p)]} erreicht.</b> Jetzt dasselbe ${IM[andere(vw(p))]}.`);
      else if (!fragOk(A, z)) dazu.push('<b>Der gesuchte Wert steht da.</b> Markieren Sie ihn noch mit dem kleinen ? '
        + (fragFehlt(A, z).map(w => IM[w]).join(' und ') || IM[vw(p)]) + '.');
      else if (!angabenDa(A, z)) dazu.push('Tragen Sie noch die Angaben aus dem Text ein.');
    }
    // NEU (2026-10-10): der zweite, freiwillige Weg wird auch gemeldet
    if (warGeloest && !zweiWege(A) && wegeFertig(A, z).length > warWege.length)
      dazu.push(`<b>Das «?» ist auch ${IM[vw(p)]} erreicht.</b>`);
    if (!warGeloest && geloest(A, z)){
      dazu.push(fertigText(A));
      if (zweiWege(A)) e2stand().gefuehrt = true;   // das gefuehrte Beispiel ist vorbei
    }
    // NEU (Fassung 3.7): Weg steht, die Antwort zum Vergleich fehlt noch
    else if (A.vergleich && !warBasis && basisGeloest(A, z)) dazu.push(vergleichAuf(A));
    if (dazu.length) meldung(E.meldung.html + '<br>' + dazu.join(' '), 'ok');
    // NEU (Rike 2026-10-17, Zusatz «Zug 2»): Weg 1 eben fertig - Notiz an
    // der Fahne fuer einige Sekunden
    if (zweiWege(A) && !warErster && e2erster(A, z)){
      E.wegHinweis = A.id;
      const Ejetzt = E;
      clearTimeout(_fahneUhr);
      _fahneUhr = setTimeout(() => { if (E === Ejetzt && E.wegHinweis){ E.wegHinweis = null; if (document.getElementById('bwkopf')) e2auffrischen(); } }, 4000);
    }
  }
  e2auffrischen();
  nachEintrag(z, r);
}

function e2frage(A, z, p){
  const k = kk(p), warGeloest = geloest(A, z), warWege = wegeFertig(A, z), warBasis = basisGeloest(A, z);
  // GEAENDERT (Fassung 3.6): das «?» darf jederzeit gesetzt und wieder
  // aufgehoben werden.
  // GEAENDERT (Rike 2026-10-10): je Darstellung; kein Spiegeln in die andere
  const v = vw(p);
  if (k === A.gesucht && fragIn(z, v)){
    delete z.fragen[v];
    if (!fragIrgendwo(z)) z.gesucht = null;
    meldung(`Markierung «?» ${IM[v]} aufgehoben.`);
    return e2auffrischen();
  }
  if (k === A.gesucht){
    if (!z.fragen) z.fragen = {};
    z.gesucht = k; z.markNach = z.eintraege.length; z.fragen[v] = z.eintraege.length; z.fragLetzt = v;
    const jetzt = !warGeloest && geloest(A, z);
    const auch = warGeloest && wegeFertig(A, z).length > warWege.length;
    // NEU (Fassung 3.7): Weg steht, die Antwort zum Vergleich fehlt noch
    if (A.vergleich && !jetzt && !warBasis && basisGeloest(A, z)){
      meldung(`✓ Gesucht ist ${nameOder(A, p, 'dieses Feld')} — ${IM[v]}.<br>` + vergleichAuf(A), 'ok');
      return e2auffrischen();
    }
    const fehlt = zweiWege(A) && !fragIn(z, andere(v)) ? ` Das ? ${IM[andere(v)]} setzen Sie dort selbst.` : '';
    meldung(`✓ Gesucht ist ${nameOder(A, p, 'dieses Feld')} — ${IM[v]}.` + (jetzt ? '<br>' + fertigText(A)
      : auch ? `<br><b>Das «?» ist auch ${IM[v]} erreicht.</b>` : fehlt + ' Rechnen Sie nur, was Sie dafür brauchen.'), 'ok');
    if (jetzt && zweiWege(A)) e2stand().gefuehrt = true;
    return e2auffrischen();
  }
  const g = ST[A.gesucht], s = ST[k];
  if (s.art === 'bed' && g.art === 'bed' && s.bed === g.ev[0] && s.ev[0] === g.bed)
    blase(p, 'a', 'Das passt hier nicht. Achtung, Richtung: Was weiss man schon — was ist die Bedingung?');
  else blase(p, 'a', 'Das ist nicht gefragt. Lesen Sie die Frage noch einmal.');
  e2auffrischen();
}

/* ───────── NEU (FASSUNG 4.4, thema.md, 2026-10-18): Etappe 3, freiwillig ─────────
   Ersetzt «Vorwaerts oder rueckwaerts?» aus Fassung 4.3 (die Sortierung
   ging 12:2 auf). Zwei Teile, drei Ansichten in der Kopfleiste:
     Teil 1 «Wohin gehoert der Satz?» - je neue Chilbi-Situation (BW.e3.teil1)
       5-6 Satzkaertchen; jedes kommt auf ein leeres Feld des Doppelbaums
       bzw. der Tafel (dieselbe Raute wie in Etappe 1 und 2, szene/masseAus)
       oder auf «so nicht eindeutig». Gerechnet wird nicht.
     Teil 2 «Aendert die Bedingung etwas?» - vier Kaertchen auf zwei Stapel;
       abgelegt zeigt jedes P(A) und P(A|B).
   Bedienung: Kaertchen anklicken, dann Feld bzw. Stapel anklicken (geht
   auch mit Tastatur und auf dem Tablet). Ein abgelegtes Kaertchen laesst
   sich wieder aufnehmen (anklicken) und neu legen. Falsch gelegt: roter
   Rand und ein Hinweis (BW.e3.hinweis1 / hinweis2); sobald alles liegt,
   «Eine moegliche Sicht». Ob etwas richtig liegt, steht in den Daten
   (ziel, richtig), gerechnet und geprueft in inhalte.py.
   Stand: stand.bwe3 = {v: 44, ansicht, t1: {Situation: {Satz: Ort}},
   t2: {Karte: 'etwas' | 'nichts'}, sicht: {Ansicht: bool}}. Ort ist eine
   Stelle («r:X_Y», «t:XY») oder 'unklar'. Ein Stand von Etappe 3 aus
   Fassung 4.3 (ohne v: 44) wird still verworfen (standNachziehen). */
const E3 = BW.e3;
const E3_ANSICHTEN = E3.teil1.map(S => S.id).concat(['teil2']);
let E3W = {wahl: null};          // nur fuer diese Sitzung: das gewaehlte Kaertchen
function e3stand(){
  if (!stand.bwe3 || typeof stand.bwe3 !== 'object' || stand.bwe3.v !== 44)
    stand.bwe3 = {v: 44, ansicht: E3_ANSICHTEN[0], t1: {}, t2: {}, sicht: {}};
  const z = stand.bwe3;
  ['t1', 't2', 'sicht'].forEach(k => { if (!z[k] || typeof z[k] !== 'object') z[k] = {}; });
  E3.teil1.forEach(S => { if (!z.t1[S.id] || typeof z.t1[S.id] !== 'object') z.t1[S.id] = {}; });
  if (!E3_ANSICHTEN.includes(z.ansicht)) z.ansicht = E3_ANSICHTEN[0];
  return z;
}
const e3sit = id => E3.teil1.find(S => S.id === id);
const satzOk = (st, ort) => ort === 'unklar' ? st.ziel === 'unklar' : !!ort && kk(ort) === st.ziel;
const t1fertig = (S, z) => S.saetze.every(st => z.t1[S.id][st.id]);
const t1richtig = (S, z) => S.saetze.every(st => satzOk(st, z.t1[S.id][st.id]));
const t2fertig = z => E3.teil2.every(k => z.t2[k.id]);
const t2richtig = z => E3.teil2.every(k => z.t2[k.id] === k.richtig);
const ansichtFertig = (id, z) => id === 'teil2' ? t2fertig(z) && t2richtig(z) : t1fertig(e3sit(id), z) && t1richtig(e3sit(id), z);
const hinweis1 = st => E3.hinweis1.replace('…', st.zahl);
const gleich = w => (String(w).startsWith('≈') ? ' ' : ' = ') + w;
const ortText = ort => ort === 'unklar' ? '«' + E3.unklar + '»' : ort && vw(ort) === 't' ? 'in der Tafel' : 'im Baum';

function e3loesung(){
  const z = JSON.parse(JSON.stringify(e3stand()));
  E3.teil1.forEach(S => S.saetze.forEach(st => { z.t1[S.id][st.id] = st.ziel === 'unklar' ? 'unklar' : 'r:' + st.ziel; }));
  E3.teil2.forEach(k => { z.t2[k.id] = k.richtig; });
  E3_ANSICHTEN.forEach(id => { z.sicht[id] = true; });
  return {bwe3: z};
}

function e3reiter(z){
  const r = document.getElementById('bwreiter');
  r.innerHTML = AUFTRAG_KNOPF + E3_ANSICHTEN.map(id => {
    const t = id === 'teil2' ? 'Teil 2 · Ändert die Bedingung etwas?' : 'Teil 1 · ' + esc(e3sit(id).titel);
    return `<button type="button" data-e3="${id}" aria-current="${z.ansicht === id}">${ansichtFertig(id, z) ? '✓ ' : ''}${t}</button>`;
  }).join('');
  auftragKnopfHaken(r, 3);
  r.querySelectorAll('[data-e3]').forEach(b => b.onclick = () => {
    z.ansicht = b.dataset.e3; E3W.wahl = null; sichern(); e3zeichnen();
  });
}
function e3befund(html){ const b = document.getElementById('befund'); if (b) b.innerHTML = html || ''; }

/* Teil 1: Liste links, Raute und Tafel rechts, darunter «so nicht eindeutig». */
function e3teil1(S, z){
  const kopf = document.getElementById('bwkopf');
  const getan = Object.keys(z.t1[S.id]).length > 0;
  kopf.innerHTML = situationKarte(S, {titel: esc(S.titel), frage: false, stifte: [], nr: 3, getan,
    auftrag: 'Legen Sie jeden Satz auf sein Feld im Baum oder in der Tafel – oder auf «' + E3.unklar + '». Gerechnet wird nicht.'});
  karteHaken(kopf, 3, e3zeichnen);
  const feld = document.getElementById('feld');
  feld.innerHTML = `<div class="bw3" id="bw3"><div class="bw3liste" id="bw3liste"></div>
    <div class="bw3rechts" id="bw3rechts"><div class="bw3brett" id="bw3brett"></div>
      <button type="button" class="bw3stapel" data-ort="unklar"><b>${esc(E3.unklar)}</b><span class="drin"></span></button></div></div>`;
  const rechts = document.getElementById('bw3rechts'), halb = feld.closest('.haelfte');
  const unklarH = rechts.querySelector('.bw3stapel').offsetHeight + 10;
  const hoch = Math.max(240, (halb ? halb.clientHeight : 500) - unklarH - 20);
  const m = masseAus(rechts.clientWidth - 6, hoch, 0);
  const brett = document.getElementById('bw3brett');
  brett.style.width = m.W + 'px'; brett.style.height = m.H + 'px';
  brett.innerHTML = `<img class="bwgrund" alt="" src="${svgUrl(svgAus(szene(S, Object.assign({art: 'brett', farblos: true}, m.o)), m.W, m.H))}">`;
  ALLE_STELLEN.forEach(p => orteVon(p).forEach(i => {
    const [hw, hh] = stellenMasse(vw(p) === 't' ? m.o.ts : m.s, p), [x, y] = ortPx(p, m.o, i);
    const d = document.createElement('button');
    d.type = 'button'; d.className = 'bw3feld'; d.dataset.ort = p;
    d.setAttribute('aria-label', 'Feld ' + (vw(p) === 't' ? 'in der Tafel' : 'im Baum'));
    d.style.left = (x - hw) + 'px'; d.style.top = (y - hh) + 'px';
    d.style.width = 2 * hw + 'px'; d.style.height = 2 * hh + 'px';
    brett.appendChild(d);
  }));
  const liste = document.getElementById('bw3liste');
  const zeichnen = () => {
    const lage = z.t1[S.id];
    liste.innerHTML = S.saetze.map(st => {
      const ort = lage[st.id], ok = ort ? satzOk(st, ort) : null;
      return `<button type="button" class="bw3satz${E3W.wahl === st.id ? ' gewaehlt' : ''}${ort ? ' gelegt ' + (ok ? 'ok' : 'falsch') : ''}" data-satz="${st.id}" aria-pressed="${E3W.wahl === st.id}">
        <span class="satz">${esc(st.text).replace(esc(st.zahl), `<b class="zahlimsatz">${esc(st.zahl)}</b>`)}</span>${ort ? `<span class="wo">${ok ? '✓' : '✗'} ${ortText(ort)}</span>` : ''}</button>`;
    }).join('') + '<div class="bw3sicht" id="bw3sicht"></div>';
    document.getElementById('bw3').classList.toggle('waehlt', !!E3W.wahl);
    feld.querySelectorAll('[data-ort]').forEach(d => {
      const drin = S.saetze.filter(st => lage[st.id] === d.dataset.ort);
      const ziel = d.classList.contains('bw3stapel') ? d.querySelector('.drin') : d;
      ziel.innerHTML = drin.map(st => `<span class="bw3marke ${satzOk(st, lage[st.id]) ? 'ok' : 'falsch'}" data-satz="${st.id}">${esc(st.zahl)}</span>`).join('');
    });
    const sicht = document.getElementById('bw3sicht');
    if (z.sicht[S.id]) sicht.innerHTML = `<div class="box"><h4>Eine mögliche Sicht</h4><p>${esc(E3.sicht1)}</p><ul>`
      + S.saetze.map(st => `<li><b>${esc(st.zahl)}</b> ${esc(st.text)} → ${teileHtml(st.feld)}</li>`).join('') + '</ul></div>';
    else if (t1fertig(S, z)){
      sicht.innerHTML = '<button type="button" class="knopf">Eine mögliche Sicht</button>';
      sicht.querySelector('button').onclick = () => { z.sicht[S.id] = true; sichern(); zeichnen(); };
    }
    liste.querySelectorAll('[data-satz]').forEach(b => b.onclick = () => {
      E3W.wahl = E3W.wahl === b.dataset.satz ? null : b.dataset.satz; zeichnen();
    });
    e3reiter(z);
    weiterE3(z);
  };
  feld.querySelectorAll('[data-ort]').forEach(d => d.onclick = ev => {
    const ort = d.dataset.ort, lage = z.t1[S.id];
    if (!E3W.wahl){
      // Ohne gewaehltes Kaertchen: ein liegendes aufnehmen
      const m_ = ev.target.closest('.bw3marke');
      const hier = m_ ? m_.dataset.satz : (S.saetze.filter(st => lage[st.id] === ort).pop() || {}).id;
      if (hier){ E3W.wahl = hier; zeichnen(); }
      else kurzerHinweis('Wählen Sie zuerst links einen Satz.', d);
      return;
    }
    const st = S.saetze.find(x => x.id === E3W.wahl);
    lage[st.id] = ort; E3W.wahl = null; sichern();
    if (satzOk(st, ort))
      e3befund(t1fertig(S, z) && t1richtig(S, z) ? '<b>Alle Sätze liegen auf ihrem Feld.</b>' : `<b>«${esc(st.zahl)}»</b> liegt ${ortText(ort)} richtig.`);
    else {
      e3befund(`<b>«${esc(st.zahl)}»</b> – ${esc(hinweis1(st))}${st.ziel === 'unklar' ? ' Steht die Gruppe im Satz?' : ''}`);
      kurzerHinweis(hinweis1(st), d);
    }
    zeichnen(); mitnehmenAuffrischen();
  });
  zeichnen();
}

/* Teil 2: Kaertchen links, zwei Stapel rechts; abgelegt mit P(A) und P(A|B). */
function e3teil2(z){
  const kopf = document.getElementById('bwkopf');
  kopf.innerHTML = `<div class="bwskarte" role="region" aria-label="Auftrag"><div class="bwsinhalt">
    <div class="bwskopf"><span class="bwstitel">Ändert die Bedingung etwas?</span></div>
    <div class="bwsganz"><p class="bwstext">Vier Situationen von der Chilbi. Ändert das, was man weiss (die Bedingung), die Wahrscheinlichkeit – oder nicht?</p>
    <div class="bwsauftrag"><p><span class="was">Auftrag:</span>Legen Sie jedes Kärtchen auf «${esc(E3.stapel2[0].name)}» oder «${esc(E3.stapel2[1].name)}». Abgelegt zeigt es beide Werte.</p>${AUFTRAG_KNOPF}</div></div></div></div>`;
  auftragKnopfHaken(kopf, 3);
  const feld = document.getElementById('feld');
  feld.innerHTML = `<div class="bw3 bw3t2" id="bw3"><div class="bw3liste" id="bw3liste"></div>
    <div class="bw3rechts">${E3.stapel2.map(st => `<div class="bw3stapel2" data-ort="${st.id}" role="button" tabindex="0"><b>${esc(st.name)}</b><div class="drin"></div></div>`).join('')}</div></div>`;
  const karte2 = (k, gelegt) => {
    const ort = z.t2[k.id], ok = ort === k.richtig;
    return `<button type="button" class="bw3satz bw3k2${E3W.wahl === k.id ? ' gewaehlt' : ''}${gelegt ? ' gelegt ' + (ok ? 'ok' : 'falsch') : ''}" data-satz="${k.id}" aria-pressed="${E3W.wahl === k.id}">
      <span class="satz"><b>${esc(k.titel)}</b> ${esc(k.text)} <b>${esc(k.frage)}</b> <span class="zeichen">${esc(k.zeichen)}</span></span>
      ${gelegt ? `<span class="werte">${teileHtml(k.pa.teile)}${esc(gleich(k.pa.wert))} <span class="pt">·</span> ${teileHtml(k.pab.teile)}${esc(gleich(k.pab.wert))}</span>` : ''}</button>`;
  };
  const zeichnen = () => {
    document.getElementById('bw3liste').innerHTML = E3.teil2.filter(k => !z.t2[k.id]).map(k => karte2(k, false)).join('')
      + '<div class="bw3sicht" id="bw3sicht"></div>';
    feld.querySelectorAll('.bw3stapel2').forEach(d => {
      d.querySelector('.drin').innerHTML = E3.teil2.filter(k => z.t2[k.id] === d.dataset.ort).map(k => karte2(k, true)).join('');
    });
    document.getElementById('bw3').classList.toggle('waehlt', !!E3W.wahl);
    const sicht = document.getElementById('bw3sicht');
    if (z.sicht.teil2) sicht.innerHTML = `<div class="box"><h4>Eine mögliche Sicht</h4><p>${esc(E3.sicht2)}</p></div>`;
    else if (t2fertig(z)){
      sicht.innerHTML = '<button type="button" class="knopf">Eine mögliche Sicht</button>';
      sicht.querySelector('button').onclick = () => { z.sicht.teil2 = true; sichern(); zeichnen(); };
    } else if (!E3.teil2.some(k => !z.t2[k.id])) sicht.innerHTML = '';
    feld.querySelectorAll('[data-satz]').forEach(b => b.onclick = ev => {
      ev.stopPropagation();
      E3W.wahl = E3W.wahl === b.dataset.satz ? null : b.dataset.satz; zeichnen();
    });
    e3reiter(z);
    weiterE3(z);
  };
  const legen = d => {
    if (!E3W.wahl){ kurzerHinweis('Wählen Sie zuerst links ein Kärtchen.', d); return; }
    const k = E3.teil2.find(x => x.id === E3W.wahl);
    z.t2[k.id] = d.dataset.ort; E3W.wahl = null; sichern();
    if (z.t2[k.id] === k.richtig)
      e3befund(t2fertig(z) && t2richtig(z) ? '<b>Alle vier Kärtchen liegen richtig.</b>' : `<b>${esc(k.titel)}</b> liegt richtig.`);
    else { e3befund(`<b>${esc(k.titel)}</b> – ${esc(E3.hinweis2)}`); kurzerHinweis(E3.hinweis2, d); }
    zeichnen(); mitnehmenAuffrischen();
  };
  feld.querySelectorAll('.bw3stapel2').forEach(d => {
    d.onclick = () => legen(d);
    d.onkeydown = ev => { if (ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); legen(d); } };
  });
  zeichnen();
}

/* Weiter-Fahne wie in Etappe 1 und 2: ist eine Ansicht richtig fertig,
   geht es zur naechsten offenen; am Ende zum Mitnehmen. */
function weiterE3(z){
  if (!ansichtFertig(z.ansicht, z)){ weiterFahne(null); return; }
  const i0 = E3_ANSICHTEN.indexOf(z.ansicht);
  const naechste = E3_ANSICHTEN.slice(i0 + 1).concat(E3_ANSICHTEN.slice(0, i0)).find(id => !ansichtFertig(id, z));
  if (naechste){
    const n = naechste === 'teil2' ? 'Teil 2' : '«' + e3sit(naechste).titel + '»';
    weiterFahne({notiz: 'Fertig.', knopf: 'Weiter zu ' + n + ' →', tun: () => { z.ansicht = naechste; E3W.wahl = null; sichern(); e3zeichnen(); }});
  } else weiterFahne({notiz: 'Etappe 3 fertig.', knopf: 'Mitnehmen →', tun: () => { stand.etappe = ETAPPEN.length; los(); }});
}

function e3zeichnen(){
  const z = e3stand();
  if (!document.getElementById('bw3kn')) return;
  e3befund('');
  if (z.ansicht === 'teil2') e3teil2(z); else e3teil1(e3sit(z.ansicht), z);
}
function etappe3(){
  loesungAnwenden(e3loesung);
  e3stand();
  E = {falsch: {}, meldung: null, rechnen: null, skZu: {}};
  E3W = {wahl: null};
  bwBuehne(D.etappen[2], 'Etappe 3 · ' + esc(D.etappen[2].name),
    `<button class="knopf leer" id="bw3kn" title="Diese Ansicht von vorn beginnen">↺ Neu</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="bwweiter" style="margin-left:auto">Mitnehmen →</button>`);
  const b = document.querySelector('#buehne .buehne');
  if (b) b.classList.add('bw3buehne');
  document.getElementById('bw3kn').onclick = () => {
    const z = e3stand();
    if (z.ansicht === 'teil2') z.t2 = {}; else z.t1[z.ansicht] = {};
    z.sicht[z.ansicht] = false; E3W.wahl = null; sichern(); e3zeichnen();
  };
  document.getElementById('bwweiter').onclick = () => { stand.etappe = ETAPPEN.length; los(); };
  window._neuzeichnen = e3zeichnen;
  e3zeichnen();
  loesungsKnopf(() => etappe3());
  auftragBeimOeffnen(3);
}

/* Das Bild zum Mitnehmen von Etappe 3: je Situation von Teil 1 die Saetze
   mit dem Feld, auf das sie gelegt sind; darunter Teil 2 mit beiden Werten.
   Weicht eine Zuordnung von «Eine moegliche Sicht» ab, steht diese dabei.
   Ohne gelegtes Kaertchen kein Bild. */
function e3bild(){
  const z = stand.bwe3;
  if (!z || z.v !== 44) return null;
  const t1 = E3.teil1.filter(S => z.t1 && z.t1[S.id] && Object.keys(z.t1[S.id]).length);
  const t2 = E3.teil2.filter(k => z.t2 && z.t2[k.id]);
  if (!t1.length && !t2.length) return null;
  const W = 1400, R = 28, P = 14, ZH = 24;
  const zeilen = [];
  t1.forEach(S => {
    zeilen.push({kopf: 'Teil 1 · ' + S.titel});
    S.saetze.forEach(st => {
      const ort = z.t1[S.id][st.id];
      if (!ort) return;
      const ok = satzOk(st, ort);
      const wo = ort === 'unklar' ? [{s: E3.unklar}] : pTeile(S, kk(ort));
      zeilen.push({links: st.zahl + '  ' + st.text, teile: ok ? st.feld : wo, anders: ok ? null : st.feld});
    });
  });
  if (t2.length){
    zeilen.push({kopf: 'Teil 2 · Ändert die Bedingung etwas?'});
    t2.forEach(k => {
      const n = s => (E3.stapel2.find(x => x.id === s) || {}).name || s;
      zeilen.push({links: k.titel + ': ' + k.frage,
        teile: [{s: n(z.t2[k.id]) + '   '}].concat(k.pa.teile, [{s: gleich(k.pa.wert) + '  ·  '}], k.pab.teile, [{s: gleich(k.pab.wert)}]),
        anders: z.t2[k.id] === k.richtig ? null : [{s: n(k.richtig)}]});
    });
  }
  const H = R + 50 + zeilen.reduce((a, r) => a + (r.kopf ? 40 : ZH + (r.anders ? 20 : 0)), 0) + R;
  const {c, g} = leinwand(W, H);
  textAufLeinwand(g, {x: R, y: R + 12, s: 'Etappe 3 · ' + D.etappen[2].name, gross: 24, fett: true, farbe: F.gruen, anker: 'start'});
  let y = R + 50;
  zeilen.forEach(r => {
    if (r.kopf){ textAufLeinwand(g, {x: R, y: y + 20, s: r.kopf, gross: 18, fett: true, farbe: F.tinte, anker: 'start'}); y += 40; return; }
    g.font = `14.5px ${SCHRIFT}`;
    let l = r.links;
    while (g.measureText(l).width > 840 && l.length > 4) l = l.slice(0, -2);
    if (l !== r.links) l = l.trimEnd() + ' …';
    textAufLeinwand(g, {x: R + P, y: y + ZH / 2, s: l, gross: 14.5, farbe: F.tinte, anker: 'start'});
    textAufLeinwand(g, {x: R + 900, y: y + ZH / 2, teile: r.teile, gross: 15, fett: true, farbe: r.anders ? F.frage : F.tinte, anker: 'start'});
    y += ZH;
    if (r.anders){
      textAufLeinwand(g, {x: R + 900, y: y + 8, teile: [{s: 'Eine mögliche Sicht: '}].concat(r.anders), gross: 13, farbe: F.matt, anker: 'start'});
      y += 20;
    }
  });
  return c;
}

/* ───────── Die Bilder zum Mitnehmen ─────────
   Die gemeinsame Flaeche sammelt ein Bild je Etappe - aber nur, wenn
   Karten (.k) auf der Buehne liegen. In Etappe 1 und 2 gibt es keine.
   Deshalb legt dieses Kapitel die Bilder dort selbst in `mitbringsel`
   (flaeche.js).

   GEAENDERT (Rueckmeldung 2026-10-10, Rike: «ganz, ganz unuebersichtlich»,
   «Das Rechenprotokoll bringt einem nichts»; Kaspers Vorschlag in
   thema.md, freigegeben): nur noch ZWEI Bilder.
     1  Das Hauptbild: Uebungsstunden so, wie die Situation am Ende von
        «Finde den Wert» aussieht - ausgefuellt, gefaerbt, beschriftet,
        Baum und Tafel nebeneinander. Darunter kleiner der Wuerfel.
        Ist etwas nicht fertig, steht da, was da ist, mit dem Vermerk
        «noch nicht vollständig».
     2  Die Wege: je bearbeitete Aufgabe von Etappe 2 ein Mini-Baum mit
        Mini-Tafel, darin NUR der Weg - Punkte fuer die Angaben, «?» fuer
        das Gesuchte, nummerierte Pfeile fuer die Schritte -, im Raster,
        zwei je Zeile. Beim Jugendtreffen beide Wege (Baum und Tafel).
        Nicht bearbeitete Aufgaben fehlen.
   Weggelassen: Rechenprotokoll, Rechnungen unter den Feldern, ein Bild
   je Aufgabe.

   FEHLERBEHOBEN (2026-10-10): Im PDF stand «Etappe 2.01» im Seitenkopf.
   Ursache: Der Kern schreibt «Etappe <Nummer>», und die Bilder trugen die
   Nummern 2.01 ... 2.1. Mit den Nummern 1 und 2 stimmt der Kopf.

   ANMERKUNG (geklaert): Ueberschrift, Lagetext und Bildunterschriften der
   Schlussseite setzt der Kern («Sortierung», «Karten»); sie werden hier
   ersetzt (mitnehmen umhuellt). */
const BILDNAME = n => {
  if (n === 1) return 'Etappe 1 · ' + [_mitUebung ? label(SIT) : '', _mitWuerfel ? label(SIT2) : ''].filter(Boolean).join(' und ');
  if (n === 2) return 'Etappe 2 · Ihre Wege';
  if (n === 3) return 'Etappe 3 · ' + D.etappen[2].name;      // NEU (Fassung 4.3)
  return `Etappe ${n}`;
};
let _mitWuerfel = false, _mitUebung = false;
if (typeof mitnehmen === 'function'){
  const _mitnehmenKern = mitnehmen;
  // eslint-disable-next-line no-global-assign
  mitnehmen = function(){
    // FEHLERBEHOBEN (2026-09-27): Nach einem Neuladen stand der Stand
    // wieder da, die Bilder aber nicht - sie entstehen erst beim Zeichnen
    // einer Etappe. Deshalb hier zuerst alles zeichnen.
    mitnehmenJetzt();
    // FEHLERBEHOBEN (2026-10-10): Eine neue Fenstergroesse auf der
    // Schlussseite warf «Cannot set properties of null». Ursache: Der
    // Zeichner der zuletzt gezeigten Etappe (window._neuzeichnen) blieb
    // stehen und suchte die Buehne der Etappe, die es nicht mehr gab.
    window._neuzeichnen = null;
    _mitnehmenKern();
    const kasten = document.querySelector('.start.mitnehmen');
    if (!kasten) return;
    const h2 = kasten.querySelector('h2'), lage = kasten.querySelector('p.lage');
    if (h2) h2.textContent = 'Nehmen Sie Ihre Übersicht mit';
    if (lage){
      const teile = [];
      if (mitbringsel[1]) teile.push('Das erste Bild zeigt '
        + (_mitUebung ? `die Situation «${label(SIT)}»` + (_mitWuerfel ? ` und, kleiner, «${label(SIT2)}»` : '')
                      : `die Situation «${label(SIT2)}»`) + ' in Baum und Vierfeldertafel: wo steht was.');
      // GEAENDERT (FASSUNG 4.3): dazu das Bild von Etappe 3; Ordnungszahl je Bild
      const ORD = ['erste', 'zweite', 'dritte'];
      let nr = teile.length;
      const das = () => (Object.keys(mitbringsel).length > 1 ? 'Das ' + ORD[nr++] + ' Bild' : 'Das Bild');
      if (mitbringsel[2]) teile.push(das() + ' zeigt Ihre Wege aus Etappe 2: Punkte für die Angaben, «?» für das Gesuchte, nummerierte Pfeile für die Rechenschritte.');
      if (mitbringsel[3]) teile.push(das() + ' zeigt Etappe 3: wohin Sie die Sätze gelegt haben und ob die Bedingung etwas ändert.');
      const seiten = Object.keys(mitbringsel).length;
      teile.push(seiten > 1 ? `Für Ihre Notizen als ein PDF mit ${seiten === 2 ? 'zwei' : 'drei'} Seiten.` : 'Für Ihre Notizen als PDF.');
      lage.textContent = teile.join(' ');
    }
    kasten.querySelectorAll('.schau figure[data-nr] figcaption').forEach(c => {
      c.textContent = BILDNAME(parseFloat(c.parentElement.dataset.nr));
    });
  };
}

function umbrechen(g, text, breit){
  const zeilen = [];
  String(text || '').split(/\n/).forEach(absatz => {
    let z = '';
    absatz.split(/\s+/).forEach(w => {
      const p = z ? z + ' ' + w : w;
      if (g.measureText(p).width > breit && z){ zeilen.push(z); z = w; } else z = p;
    });
    zeilen.push(z);
  });
  return zeilen;
}
function leinwand(w, h){
  const c = document.createElement('canvas'), s = 2;
  c.width = w * s; c.height = h * s;
  const g = c.getContext('2d'); g.scale(s, s);
  g.fillStyle = F.papier; g.fillRect(0, 0, w, h);
  return {c, g};
}
/* Zeilen Text setzen; gibt das neue y zurueck. */
function zeilenSetzen(g, zeilen, x, y, gross, farbe, zh){
  g.font = `${gross}px ${SCHRIFT}`; g.fillStyle = farbe || F.tinte;
  g.textBaseline = 'middle'; g.textAlign = 'left';
  zeilen.forEach(l => { g.fillText(l, x, y); y += zh; });
  return y;
}
/* Baum und Tafel nebeneinander: Massstab und Orte fuer eine Breite. */
const NEBEN_B = 100 + T_LU + TAF.breite * T_K, NEBEN_H = Math.max(GEO.hoehe, TAF.hoehe * T_K);
function nebenOrte(x, y, breit){
  const s = breit / NEBEN_B, H = NEBEN_H * s;
  return {H, o: {s, ox: x, oy: y + (H - GEO.hoehe * s) / 2,
                 ts: T_K * s, tx: x + (100 + T_LU) * s, ty: y + (H - TAF.hoehe * T_K * s) / 2}};
}
/* Die Werte fuer das Hauptbild: nur die Zahl, ohne Rechnung darunter. */
function nurWerte(A, z){
  const w = werteVon(A, z);
  Object.keys(w).forEach(p => { w[p] = {text: w[p].text, fest: true}; });
  return w;
}

/* Eine Situation von Etappe 1 als Bild in die Leinwand; gibt das neue y
   zurueck (oder nur die Hoehe, wenn g fehlt - zum Vorausmessen). */
function situationBild(g, A, z, x, y, breit, gross, fertig){
  const probe = g || document.createElement('canvas').getContext('2d');
  probe.font = `${gross * 0.6}px ${SCHRIFT}`;
  const textZ = umbrechen(probe, A.text, breit);
  const y0 = y;
  if (g) textAufLeinwand(g, {x, y: y + gross * 0.6, s: label(A), gross, fett: true, farbe: F.gruen, anker: 'start'});
  if (g && !fertig){
    g.font = `700 ${gross}px ${SCHRIFT}`;
    const b = g.measureText(label(A)).width;
    textAufLeinwand(g, {x: x + b + 14, y: y + gross * 0.6, s: '— noch nicht vollständig', gross: gross * 0.7, fett: true, farbe: F.frage, anker: 'start'});
  }
  y += gross * 1.5;
  const zh = gross * 0.6 * 1.4;
  if (g) zeilenSetzen(g, textZ, x, y, gross * 0.6, F.matt, zh);
  y += textZ.length * zh + 8;
  const {H, o} = nebenOrte(x, y, breit);
  if (g) aufLeinwand(g, szene(A, Object.assign({art: 'bild', werte: nurWerte(A, z), gesucht: null, eintraege: []}, o)));
  y += H + 10;
  return g ? y : y - y0;
}

/* Bild 1: Uebungsstunden gross, der Wuerfel kleiner darunter. */
function hauptbild(){
  const z1 = stand.bwe1, z2 = stand.bwe1b;
  const mit1 = !!(z1 && z1.eintraege && z1.eintraege.length);
  const mit2 = !!(z2 && z2.eintraege && z2.eintraege.length);
  _mitWuerfel = mit2; _mitUebung = mit1;
  if (!mit1 && !mit2) return null;
  const W = 1400, R = 28, B = W - 2 * R, B2 = Math.round(B * 0.64);
  const h1 = mit1 ? situationBild(null, SIT, z1, R, 0, B, 26, true) : 0;
  const h2 = mit2 ? situationBild(null, SIT2, z2, R, 0, B2, 20, true) : 0;
  const H = R + h1 + (mit1 && mit2 ? 30 : 0) + h2 + R - 10;
  const {c, g} = leinwand(W, H);
  let y = R;
  if (mit1) y = situationBild(g, SIT, z1, R, y, B, 26, s1fertig() && vollstaendig(z1));
  if (mit1 && mit2){
    g.strokeStyle = F.linie; g.lineWidth = 1; g.beginPath(); g.moveTo(R, y + 4); g.lineTo(W - R, y + 4); g.stroke();
    y += 30;
  }
  if (mit2) situationBild(g, SIT2, z2, R, y, B2, 20, s2fertig());
  return c;
}

/* Der Weg einer Aufgabe von Etappe 2: nur die Eintraege, die zum «?»
   fuehren. Ist das «?» noch nicht erreicht, alles, was dasteht. */
function wegVon(A, z){
  // GEAENDERT (Fassung 3.7): der Weg zaehlt, sobald das «?» erreicht ist;
  // «gelöst» heisst bei Aufgaben mit Vergleich auch: richtig geantwortet.
  const fertig = geloest(A, z), basis = basisGeloest(A, z);
  let eintraege = z.eintraege.slice(), wo;
  if (basis){
    // FEHLERBEHOBEN (2026-10-10): jeder erreichte Weg, auch ein zweiter
    const vs = wegeFertig(A, z), nimm = new Set();
    vs.forEach(v => wegZu(z, v + ':' + A.gesucht).forEach(e => nimm.add(e)));
    eintraege = z.eintraege.filter(e => nimm.has(e));
    if (vs.length === 1) wo = vs[0];
  }
  // NEU (Rike 2026-10-10): das «?» nur dort, wo es gesetzt ist
  if (!basis && z.fragen && fragIrgendwo(z) && !(fragIn(z, 'r') && fragIn(z, 't')))
    wo = fragIn(z, 'r') ? 'r' : 't';
  // Bei Aufgaben mit Vergleich gehoert der Vergleichswert mit ins Bild
  if (basis && A.vergleich){
    const v = wo || vw(eintraege.length ? eintraege[eintraege.length - 1].p : 'r:'), r = A.vergleich.rechts;
    const vz = wegZu(z, v + ':' + r).length ? wegZu(z, v + ':' + r) : wegZu(z, andere(v) + ':' + r);
    const nimm = new Set([...eintraege, ...vz]);
    eintraege = z.eintraege.filter(e => nimm.has(e));
  }
  const wahl = A.vergleich && z.wahl ? (A.vergleich.worte || ['abhängig', 'unabhängig'])[z.wahl === 'abh' ? 0 : 1] : null;
  return {eintraege, fertig, gesuchtWo: wo, wahl,
          gesucht: basis || z.gesucht === A.gesucht ? A.gesucht : null};
}
function bearbeitet(z){ return !!(z && z.eintraege && (z.eintraege.length || z.gesucht)); }

/* Bild 2: die Wege im Raster, zwei je Zeile. */
function wegebild(){
  alteIdsUmschreiben();              // NEU (Fassung 4): alter Stand
  const s2 = stand.bwe2;
  const liste = AUFG.filter(A => s2 && s2.a && bearbeitet(s2.a[A.id]));
  if (!liste.length) return null;
  const W = 1400, R = 28, L = 28, SP = 2, P = 14;
  const zb = (W - 2 * R - (SP - 1) * L) / SP, ib = zb - 2 * P;
  const probe = document.createElement('canvas').getContext('2d');
  const MH = NEBEN_H * ib / NEBEN_B;
  const zellen = liste.map(A => {
    probe.font = `700 17px ${SCHRIFT}`;
    const tz = umbrechen(probe, label(A), ib);
    probe.font = `13.5px ${SCHRIFT}`;
    const fz = umbrechen(probe, A.frage, ib);
    const weg = wegVon(A, s2.a[A.id]);
    const unten = zweiWege(A) || !weg.fertig || weg.wahl ? 22 : 0;
    return {A, tz, fz, weg, h: P + tz.length * 22 + fz.length * 18 + 8 + MH + unten + P};
  });
  const zeilen = [];
  for (let i = 0; i < zellen.length; i += SP) zeilen.push(zellen.slice(i, i + SP));
  const kopf = 96;
  const H = R + kopf + zeilen.reduce((a, r) => a + Math.max(...r.map(c => c.h)) + L, 0) + R - L;
  const {c, g} = leinwand(W, H);
  textAufLeinwand(g, {x: R, y: R + 12, s: 'Etappe 2 · Ihre Wege', gross: 24, fett: true, farbe: F.gruen, anker: 'start'});
  // Legende: Punkt, «?», Pfeil
  let lx = R, ly = R + 52;
  g.beginPath(); g.arc(lx + 6, ly, 5.5, 0, Math.PI * 2); g.fillStyle = F.tinte; g.fill();
  lx += 18 + textAufLeinwand(g, {x: lx + 18, y: ly, s: 'Angabe oder Zwischenwert auf dem Weg', gross: 14, farbe: F.matt, anker: 'start'}) + 34;
  textAufLeinwand(g, {x: lx, y: ly, s: '?', gross: 20, fett: true, farbe: F.frage, anker: 'start'});
  lx += 18 + textAufLeinwand(g, {x: lx + 18, y: ly, s: 'das Gesuchte', gross: 14, farbe: F.matt, anker: 'start'}) + 34;
  aufLeinwand(g, [{t: 'pfeil', x0: lx, y0: ly, x1: lx + 46, y1: ly, farbe: F.pfeil, breite: 2.4, kopf: 8, nr: 1, nrgross: 8}]);
  textAufLeinwand(g, {x: lx + 58, y: ly, s: 'Rechenschritt, in der Reihenfolge nummeriert', gross: 14, farbe: F.matt, anker: 'start'});
  let y = R + kopf;
  zeilen.forEach(r => {
    const rh = Math.max(...r.map(c => c.h));
    r.forEach((cl, j) => {
      const x = R + j * (zb + L);
      aufLeinwand(g, [{t: 'rechteck', x, y, w: zb, h: rh, r: 10, fuell: F.karte, rand: F.linie, breite: 1}]);
      let yy = y + P + 10;
      g.font = `700 17px ${SCHRIFT}`; g.fillStyle = F.tinte; g.textBaseline = 'middle'; g.textAlign = 'left';
      cl.tz.forEach(l => { g.fillText(l, x + P, yy); yy += 22; });
      yy = zeilenSetzen(g, cl.fz, x + P, yy - 2, 13.5, F.matt, 18) + 6;
      const {H: mh, o} = nebenOrte(x + P, yy, ib);
      const w = cl.weg;
      aufLeinwand(g, szene(cl.A, Object.assign({art: 'mini', farblos: true, mg: 2, nurSchritte: true,
        eintraege: w.eintraege, gesucht: w.gesucht, gesuchtWo: w.gesuchtWo}, o)));
      yy += mh + 4;
      if (zweiWege(cl.A)){
        textAufLeinwand(g, {x: o.ox + 50 * o.s, y: yy + 8, s: 'Weg im Baum', gross: 13, farbe: F.matt});
        textAufLeinwand(g, {x: o.tx + TAF.breite * o.ts / 2, y: yy + 8, s: 'Weg in der Tafel', gross: 13, farbe: F.matt});
      }
      // NEU (Fassung 3.7): die Antwort beim Vergleich (Brille und Lesen)
      if (w.wahl)
        textAufLeinwand(g, {x: x + P, y: yy + 8, s: `Antwort: ${w.wahl}`, gross: 13, fett: true, farbe: F.tinte, anker: 'start'});
      if (!w.fertig)
        textAufLeinwand(g, {x: x + zb - P, y: yy + 8, s: 'noch nicht gelöst', gross: 13, fett: true, farbe: F.frage, anker: 'end'});
    });
    y += rh + L;
  });
  return c;
}

let _mitUhr = null;
function mitnehmenJetzt(){
  if (typeof mitbringsel === 'undefined' || !D.mitnehmen) return;
  clearTimeout(_mitUhr);
  // Alte Nummern (1.2, 2.01 ...) aus einer frueheren Fassung raeumen
  Object.keys(mitbringsel).forEach(n => { delete mitbringsel[n]; });
  try {
    const c1 = hauptbild();
    if (c1) mitbringsel[1] = Promise.resolve(c1);
  } catch (e){ console.warn('Hauptbild zum Mitnehmen nicht gezeichnet:', e); }
  try {
    const c2 = wegebild();
    if (c2) mitbringsel[2] = Promise.resolve(c2);
  } catch (e){ console.warn('Wegebild zum Mitnehmen nicht gezeichnet:', e); }
  // NEU (FASSUNG 4.3, seit 4.4 beide Teile): das Bild von Etappe 3
  try {
    const c3 = e3bild();
    if (c3) mitbringsel[3] = Promise.resolve(c3);
  } catch (e){ console.warn('Stapelbild zum Mitnehmen nicht gezeichnet:', e); }
}
function mitnehmenAuffrischen(){
  clearTimeout(_mitUhr);
  _mitUhr = setTimeout(mitnehmenJetzt, 300);
}

/* Fenstergroesse: Raute und Tafel rechnen ihre Masse aus der Breite. */
let _groesseUhr = null;
window.addEventListener('resize', () => {
  clearTimeout(_groesseUhr);
  _groesseUhr = setTimeout(() => { if (window._neuzeichnen) window._neuzeichnen(); }, 150);
});

/* NEU (FASSUNG 4.3): Der Reiter von Etappe 3 traegt «freiwillig». Die
   Reiter baut die gemeinsame Flaeche (nav); hier wird nur angehaengt. */
if (typeof nav === 'function'){
  const _navKern = nav;
  // eslint-disable-next-line no-global-assign
  nav = function(){
    _navKern();
    const b = document.querySelectorAll('#nav button')[3];
    if (b && !b.querySelector('.bwnavfrei')){
      b.insertAdjacentHTML('beforeend', ' <span class="bwnavfrei">freiwillig</span>');
      b.title = 'Etappe 3 ist freiwillig';
    }
  };
}
/* NEU (FASSUNG 4.3): Alte Staende behalten alles. Bis Fassung 4.2 gab es
   zwei Etappen, und stand.etappe === 2 war das Mitnehmen. Ein Stand ohne
   Vermerk (stand.bwfassung) bleibt deshalb beim Mitnehmen, statt in der
   neuen Etappe 3 zu landen. Der Stand wird VOR dem ersten Zeichnen
   gelesen (wie in los()), dann erst umgestellt.
   GEAENDERT (FASSUNG 4.4): Etappe 3 aus 4.3 ist ersetzt. Ihr Stand
   (stand.bwe3 ohne v: 44, die Kaertchen V_* in stand.karten) wird still
   verworfen; Etappe 1 und 2 bleiben unberuehrt. */
function standNachziehen(){
  if (stand.bwfassung === '4.4') return;
  if (!stand.bwfassung && stand.etappe >= 2) stand.etappe = ETAPPEN.length;
  if (stand.bwe3 && stand.bwe3.v !== 44) delete stand.bwe3;
  if (stand.karten) Object.keys(stand.karten).forEach(id => { if (id.startsWith('V_')) delete stand.karten[id]; });
  stand.bwfassung = '4.4';
}
if (typeof los === 'function'){
  const _losKern = los;
  // eslint-disable-next-line no-global-assign
  los = function(){
    if (!_wiederaufgenommen){ _wiederaufgenommen = true; _wiederaufnehmen(); standNachziehen(); }
    return _losKern();
  };
}

// GEAENDERT (Fassung 3.6): nur noch zwei Etappen.
// GEAENDERT (FASSUNG 4.3): wieder drei, die dritte freiwillig (seit 4.4
// in zwei Teilen).
ETAPPEN.push(etappe1, etappe2, etappe3);
