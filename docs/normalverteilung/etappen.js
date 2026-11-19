/* Die zwei Etappen von Kapitel 8 — «Von der Aufgabe über das Bild zur
   Gleichung». FASSUNG 3, 2026-10-16. Spezifikation: thema.md, Abschnitt
   «FASSUNG 3 — verbindlich».

   E1  Aufgabe, Bild, Gleichung
         Jede Situation ist eine ZEILE: Situation · Platz fuer das Bild ·
         Platz fuer die Gleichung · Auswahl «gesucht» (a und b / k / n /
         p). Jeder Platz nimmt genau eine Karte. Die erste Zeile
         (Wahlbeteiligung) liegt als Beispiel fertig da. Stoerbilder und
         Stoergleichungen bleiben im Vorrat. Zwei Kanaele beim Pruefen:
         Passen Bild und Gleichung zusammen (die Karten)? Passt das Paar
         zur Situation (die Plaetze)? Dazu die Auswahl «gesucht».
   E2  Selbst uebersetzen (FASSUNG 3.1 mit den Nachtraegen vom
         2026-10-16, siehe den Abschnitt unten)
         Acht Aufgaben, je zwei pro Typ (a und b · k · n · p). Markieren
         wie in Kapitel 7, Angaben samt mu und sigma links eintragen und
         pruefen, ins Bild uebertragen und beschriften, c waehlen, die
         Gleichung selbst aufstellen (Form und Platzhalter). ERST NACH dem
         Pruefen kommen die Gleichung des Generators und das Ergebnis.

   GEAENDERT (FASSUNG 3): Die fruehere Etappe 2 «Wo ist das
   Fragezeichen?» (gueltige Tripel gruppieren und benennen) entfaellt.
   Ihre Frage steckt jetzt in der Auswahl «gesucht» am Ende jeder Zeile.

   Die Glocke des Bildes in Etappe 2 kommt aus D.e2.glocke - dieselben
   Stuetzpunkte, mit denen bauen.py die Bildkarten zeichnet.

   Entscheid 2026-10-10 (thema.md): X ist die Zufallsgroesse (im Betrag,
   in der Mitte der Kette), a und b sind die berechneten Grenzen, k ein
   einzelner berechneter Wert (FASSUNG 3: auch die einseitige Grenze).

   NEU (FASSUNG CHILBI, thema.md, 2026-10-21, Rike): Die eigenen
   Situationen spielen an der Chilbi (neuer Text, gleiche IDs und Zahlen;
   die Markierungen der Aufgaben mit neuem Text fallen beim Laden weg,
   siehe nvStandUmstellen). Bedienung wie Kapitel 5-7, lokal nachgebaut
   nach Kapitel 7 (themen/bernoulli/etappen.js, Abschnitt «Bedienung wie
   Kapitel 5/6»): Situationskarte in Lila, Auftragsfenster je Etappe mit
   «☰ Auftrag», Fahne am Arbeitsort mit automatischem Weiter, Rechnung
   unter direkt eingetragenem μ und σ. Die graue Leiste traegt nur
   «Etappe n · Name». Abschnitt «Bedienung wie Kapitel 5-7» unten.

   NEU (FASSUNG CHILBI 2, thema.md, 2026-10-21, Rike: «Ja, beides bauen»):
     Etappe 1 in zwei Zuegen wie Kapitel 7: Zug 1 an der Chilbi (Beispiel
     Quizbude), Zug 2 die sechs Skript-Situationen, sobald Zug 1 richtig
     geprueft ist. Zweiseitige Gleichungskarten erklaeren den Betrag.
     Etappe 2 nur an der Chilbi; das Karussell fuehrt (Satz und «Zeigen»
     je Schritt); die Reiter zeigen nur den Namen. Nach der richtigen
     Gleichung: freiwilliges Ergebnisfeld und «Rechenschritte zeigen».

   Eigene Namen im Stand:
     stand.nvZug2       Etappe 1, Zug 2 offen (Fassung Chilbi 2)
     stand.nvgesucht    Etappe 1, Auswahl «gesucht» je Zeile {nr: wert}
     stand.nv3          Etappe 2 (Aufbau beim Abschnitt Etappe 2). Der Name stammt aus der Zeit, als dies
                        Etappe 3 war; er bleibt, damit gesicherte Staende
                        ihre Arbeit behalten.
     stand.nvFassung    5 - siehe nvStandUmstellen() unten
                        (3 bis zur Fassung Chilbi, 4 bis Fassung Chilbi 2)
     stand.nvAuftrag    {1, 2}: Auftragsfenster schon gezeigt (Fassung Chilbi)
*/

(function(){
  const css = `
  .nvzeile{position:absolute;border:1.5px dashed var(--linie);border-radius:10px;background:rgba(255,254,251,.55)}
  .nvzeile.beispiel{border-style:solid;border-color:color-mix(in srgb, var(--akzent) 45%, var(--linie));
     background:color-mix(in srgb, var(--akzent) 6%, #fffefb)}
  .nvloesung{padding:8px 12px;font-size:13px;line-height:1.5;border-style:solid}
  .nvbeispiel{position:absolute;left:10px;top:4px;font-family:var(--hand);font-size:15px;color:var(--akzent)}
  .nvsit{position:absolute;font-size:12.5px;line-height:1.45;color:var(--tinte)}
  .nvsit .nvkurz{display:block;color:var(--akzent);font-weight:600;font-size:13px;margin-bottom:1px}
  .nvsit .quelle{display:block;font-size:10.5px;color:var(--matt);margin-top:3px}
  .nvwahl{position:absolute;display:flex;flex-direction:column;gap:3px;font-size:12.5px;color:var(--matt)}
  .nvwahl select{font:inherit;font-size:14px;padding:3px 5px;border:1.5px solid var(--linie);border-radius:7px;
     background:#fff;color:var(--tinte)}
  .nvwahl select:disabled{opacity:1;color:var(--tinte);background:transparent}
  .nvzeile:has(> .nvurteil) .nvwahl select.ok{border-color:var(--richtig);box-shadow:0 0 0 1px var(--richtig)}
  .nvzeile:has(> .nvurteil) .nvwahl select.falsch{border-color:var(--falsch);box-shadow:0 0 0 1px var(--falsch)}
  .nvwahlbild{position:absolute;inset:0;opacity:0;pointer-events:none;color:var(--tinte);font-size:13px}
  .nvzeile > .sitmarke.nvurteil{bottom:4px;right:10px;max-width:none;white-space:normal;border:none;
     background:transparent;padding:0;font-size:11.5px;line-height:1.35;overflow:visible}
  .nvurteil span{margin-right:10px;white-space:nowrap}
  .nvurteil .ok{color:var(--richtig)} .nvurteil .falsch{color:var(--falsch)} .nvurteil .offen{color:var(--fast)}
  .nv3reiter{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px}
  .nv3reiter button{font:inherit;font-size:12.5px;padding:4px 10px;border:1px solid var(--linie);
     background:var(--karte);border-radius:999px;cursor:pointer;color:var(--tinte)}
  .nv3reiter button[aria-current=true]{background:var(--akzent);color:#fff;border-color:var(--akzent)}
  .nv3reiter button .ok{color:var(--richtig);font-weight:700;margin-left:3px}
  .nv3reiter button[aria-current=true] .ok{color:#fff}
  .nvzug{position:absolute;display:flex;flex-direction:column;gap:1px;padding:2px 4px;font-size:12.5px;color:var(--matt);line-height:1.4}
  .nvzug b{font-family:var(--hand);font-size:17px;font-weight:400;color:var(--akzent)}
  .nv3schritt{font-weight:600;color:var(--akzent);margin:6px 0 3px}
  `;
  const s = document.createElement('style');
  s.id = 'normalverteilung-stil';
  s.textContent = css;
  document.head.appendChild(s);
})();

const NV1 = D.e1, NV3 = D.e2;
/* NEU (Fassung Chilbi): Texte und Bilder der Bedienung wie Kapitel 5-7 */
const NV = D.nv, NV_SK = NV.skarte, NV_W = NV.weiter;
/* Eigene Flucht, weil nv3Esc erst weiter unten steht und nvMeldung schon
   beim Umstellen des Stands laufen kann. */
const nvEsc = t => String(t ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* Eine Quelle, die schon im Kurztitel steht («Aufgabe 8.3 b Ueberbuchen»),
   wird nicht noch einmal daneben gesetzt. */
const nvQuelle = (titel, quelle) => quelle && !String(titel).startsWith(quelle) ? quelle : '';

/* ───────── Gesicherte Staende aus der Zeit vor FASSUNG 3 ─────────
   Bis zum 2026-10-16 hatte das Kapitel drei Etappen (E1 Tripel in
   Gruppen, E2 Fragezeichen, E3 Selbst uebersetzen). Ein gesicherter
   Stand von damals traegt stand.etappe 0..3 und Karten mit Nummern, die
   heute anderen Situationen gehoeren (B4 war der Wuerfeltest, heute ist
   es der Flug). Deshalb wird er umgestellt, BEVOR los() ihn liest - diese
   Datei laeuft nach flaeche.js und vor los():
     - Etappe: alt 0 -> 0, alt 1 und 2 -> 1 (Selbst uebersetzen), alt 3
       (Mitnehmen) -> 2 (Mitnehmen);
     - die Karten von Etappe 1 und die Tripelkarten werden gestrichen,
       ebenso Gruppen und Wellen - sie passen nicht mehr in die Zeilen;
     - stand.nv3 bleibt: «Zehn Sechsen» (S1) behaelt seine Arbeit, die
       Eintraege gestrichener Aufgaben liest niemand mehr.
   Ein frischer Stand bekommt die Marke sofort, sonst wuerde er beim
   naechsten Laden selbst «umgestellt». */
(function nvStandUmstellen(){
  stand.nvFassung = 5;
  let paket = null;
  try { paket = JSON.parse(localStorage.getItem(_SPEICHER) || 'null'); } catch(_) { return; }
  const s = paket && paket.stand;
  if (!s || typeof s !== 'object' || s.nvFassung === 5) return;
  if (s.nvFassung !== 3 && s.nvFassung !== 4) nvVorFassung3(s);
  const a = s.nv3 && s.nv3.a && typeof s.nv3.a === 'object' ? s.nv3.a : {};
  let weg = [];
  if (s.nvFassung === 3){
    /* NEU (FASSUNG CHILBI, thema.md «Gespeicherte Stände»): Alle IDs
       bleiben, also auch alle Eintraege (Etappe 1: Karten und «gesucht»;
       Etappe 2: Felder, Bild, Gleichung, geloest). Die Markierungen in
       Etappe 2 haengen an der Stuecknummer des Textes: In den Aufgaben mit
       neuem Text (NV.neuer_text) passen sie nicht mehr und fallen weg, mit
       Hinweis - aber nur, wenn dort schon etwas markiert war. Etappe 1
       speichert nichts, was am Text haengt. */
    weg = NV.neuer_text.filter(id => a[id] && a[id].marks && Object.keys(a[id].marks).length);
    NV.neuer_text.forEach(id => { if (a[id] && typeof a[id] === 'object') a[id].marks = {}; });
    s.nvFassung = 4;
  }
  /* NEU (FASSUNG CHILBI 2, thema.md «Gespeicherte Stände»):
       - Etappe 2: Die Eintraege der Aufgaben, die nach Etappe 1 gewandert
         sind (NV.nach_etappe1), fallen weg - mit Hinweis, wenn dort schon
         gearbeitet war. Karussell, Getraenkestand und Umfrage behalten
         alles.
       - Etappe 1: Karten und «gesucht» behalten ihre Nummern. Lag schon
         etwas in einer Zeile, die jetzt zu Zug 2 gehoert, ist Zug 2 offen,
         damit die Arbeit sichtbar bleibt. Die Karten der Wahlbeteiligung
         (bis dahin das Beispiel) kommen in den Vorrat. */
  const e2weg = NV.nach_etappe1.filter(id => a[id] && typeof a[id] === 'object' && nv3Angefangen(a[id]));
  NV.nach_etappe1.forEach(id => { delete a[id]; });
  if (s.nv3 && NV.nach_etappe1.includes(s.nv3.akt)) s.nv3.akt = NV3.aufgaben[0].id;
  const zug2nr = new Set(NV1.zeilen.filter(z => z.zug === 2).map(z => String(z.nr)));
  const karten = s.karten && typeof s.karten === 'object' ? s.karten : {};
  const gesucht = s.nvgesucht && typeof s.nvgesucht === 'object' ? s.nvgesucht : {};
  if (Object.values(karten).some(k => { const m = /^z(\d+)\//.exec((k && k.ort) || ''); return m && zug2nr.has(m[1]); })
      || Object.keys(gesucht).some(nr => zug2nr.has(String(nr)) && gesucht[nr])) s.nvZug2 = true;
  s.nvFassung = 5;
  try { localStorage.setItem(_SPEICHER, JSON.stringify(paket)); } catch(_) {}
  if (weg.length) nvMeldung(NV.meldung_marken, 12000);
  if (e2weg.length) nvMeldung(NV.meldung_e1, 12000);
})();
/* Bis FASSUNG 3 (vor dem 2026-10-16): drei Etappen, siehe oben. */
function nvVorFassung3(s){
  const alt = Number(s.etappe) || 0;
  s.etappe = alt <= 0 ? 0 : (alt >= 3 ? 2 : 1);
  if (s.karten && typeof s.karten === 'object')
    Object.keys(s.karten).forEach(id => { if (/^(A|B|G|TR)\d|^(BD|GD|GX)\d/.test(id)) delete s.karten[id]; });
  ['e1gruppen', 'e1stufe', 'nvgruppen', 'nvalle'].forEach(k => { delete s[k]; });
  s.e1gruppen = null;
  s.nvFassung = 3;
}

/* ───────── Bedienung wie Kapitel 5-7 (FASSUNG CHILBI, 2026-10-21) ─────────
   thema.md «FASSUNG CHILBI», lokal nachgebaut nach Kapitel 7
   (themen/bernoulli/etappen.js: bnKarteHtml, bnKarteHaken,
   bnAuftragFenster, bnFahne, bnMeldung). Kern und Kapitel 5-7 bleiben
   unberuehrt.
     Situationskarte   ueber die ganze Breite, Lila, Bild (Etappe 1 das
                       Einstiegsbild, Etappe 2 kap8_<id>.png der gewaehlten
                       Aufgabe, wenn vorhanden), Name, Text, Frage,
                       Auftragssatz mit «☰ Auftrag». Einklappbar; klappt
                       nach dem ersten Eintrag von selbst zu, wenn es eng
                       ist (im niedrigen Fenster von Anfang an). Ob zu,
                       merkt nur die Sitzung.
     Auftragsfenster   beim ersten Oeffnen jeder Etappe (stand.nvAuftrag).
     Fahne             unten rechts am Arbeitsort, mit Uhr von selbst
                       weiter; die Uhr stellt nur ein Eintrag, nie das Laden.
   Die graue Auftragszeile traegt nur «Etappe n · Name». */
(function nvBedienungStil(){
  const s = document.createElement('style');
  s.id = 'normalverteilung-bedienung';
  s.textContent = `
    :root{--nv-lila:${NV.farbe};--nv-lila-t:#6a3d78}
    /* Die graue Leiste traegt nur noch «Etappe n · Name» */
    #buehne > .auftrag > .text:empty{display:none}
    .nv-skarte{flex:0 0 auto;display:flex;align-items:flex-start;gap:14px;margin:0 14px 8px;
       background:#f3edf5;background:color-mix(in srgb,var(--nv-lila) 11%,#fff);border-radius:0 10px 10px 0;
       box-shadow:inset 4px 0 0 var(--nv-lila);padding:10px 16px 9px 18px}
    .nv-sbild{flex:0 0 auto;width:76px;height:76px;object-fit:cover;border-radius:8px;mix-blend-mode:multiply;margin-top:2px}
    .nv-sinhalt{flex:1 1 auto;min-width:0}
    .nv-skopf{display:flex;flex-wrap:wrap;align-items:center;gap:4px 12px;margin-bottom:2px}
    .nv-stitel{font-family:var(--hand);font-size:21px;color:var(--nv-lila-t);line-height:1.2}
    .nv-skurz,.nv-snurzu{display:none}
    .nv-sklapp{font:inherit;font-size:12px;color:var(--matt);background:none;border:1px solid transparent;border-radius:7px;
       padding:2px 7px;cursor:pointer;white-space:nowrap;margin-left:auto}
    .nv-sklapp:hover{border-color:var(--linie);background:#fff;color:var(--tinte)}
    .nv-sklapp::before{content:'▴ '}
    .nv-skarte.zu .nv-sklapp::before{content:'▾ '}
    .nv-stext{margin:0;font-size:16px;line-height:1.48;color:var(--tinte)}
    .nv-sfrage{margin:5px 0 0;font-size:17px;line-height:1.35;font-weight:700;color:var(--nv-lila-t)}
    .nv-sauftragz{display:flex;align-items:center;gap:6px 12px;margin:6px 0 0;padding:4px 0 0;border-top:1px solid rgba(0,0,0,.08);
       font-size:14px;line-height:1.35}
    .nv-sauftragz p{margin:0;flex:1 1 auto;min-width:0}
    .nv-sauftragz .was{font-weight:700;color:var(--nv-lila-t);margin-right:6px}
    .nv-auftragknopf{font:inherit;font-size:13px;font-weight:700;border:2px solid var(--nv-lila);color:var(--nv-lila-t);
       background:#fff;border-radius:999px;padding:2px 12px;cursor:pointer;white-space:nowrap;flex:0 0 auto}
    .nv-auftragknopf::before{content:'☰ ';font-weight:400}
    .nv-auftragknopf:hover{background:var(--nv-lila);color:#fff}
    .nv-skarte.zu{padding:5px 12px 5px 16px;align-items:center}
    .nv-skarte.zu .nv-sbild{width:30px;height:30px;margin:0;border-radius:6px}
    .nv-skarte.zu .nv-sganz{display:none}
    .nv-skarte.zu .nv-skopf{flex-wrap:nowrap;margin:0;cursor:pointer}
    .nv-skarte.zu .nv-stitel{font-size:18px;white-space:nowrap}
    .nv-skarte.zu .nv-skurz{display:block;flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
       font-weight:700;color:var(--nv-lila-t);font-size:15px}
    .nv-skarte.zu .nv-snurzu{display:inline-flex}
    .nv-skarte.zu .nv-sklapp{margin-left:0}
    @media (max-width:900px),(max-height:650px){
      .nv-skarte{padding:6px 10px 6px 14px;gap:10px;margin:0 10px 6px}
      .nv-sbild{width:52px;height:52px}
      .nv-stitel{font-size:18px}
      .nv-stext{font-size:14.5px;line-height:1.4}
      .nv-sfrage{font-size:15.5px;margin-top:2px}
      .nv-sauftragz{font-size:13px;margin-top:4px}
      .nv-skarte.zu .nv-sbild{width:24px;height:24px}
      .nv-skarte.zu .nv-stitel{font-size:16px}
      .nv-skarte.zu .nv-skurz{font-size:13.5px}}
    /* NEU (Rike 2026-10-30, Band oben wie Kapitel 5 und 6): die Karte im
       Band immer offen, weiss mit Farbe nur am Rand (SORT-Karte), ohne
       Klappe und ohne Auftragszeile; darin der Satz, was jetzt zu tun ist. */
    body.ws-oben .wsleiste .nv-skarte{margin:0;background:#fff;border-radius:0;box-shadow:0 1px 2px rgba(60,40,20,.15),0 4px 14px rgba(60,40,20,.18);
       border-left:7px solid var(--nv-lila);padding:8px 14px 9px 14px}
    body.ws-oben .wsleiste .nv-sklapp,body.ws-oben .wsleiste .nv-skurz,body.ws-oben .wsleiste .nv-snurzu,
    body.ws-oben .wsleiste .nv-sauftragz{display:none !important}
    body.ws-oben .wsleiste .nv-sbild{width:58px;height:58px}
    body.ws-oben .wsleiste .nv-sganz{display:block !important}
    body.ws-oben .nv-jetztsatz{margin:8px 0 0;padding:3px 0 3px 10px;border-left:3px solid var(--nv-lila);font-size:15px;line-height:1.42;color:var(--tinte)}
    body.ws-oben .nv-jetztsatz .nv-noch{display:block;font-size:13px;color:var(--matt);margin-top:2px}
    .nv-fenster{position:fixed;inset:0;z-index:200000;display:flex;align-items:center;justify-content:center;
       background:rgba(45,41,36,.42);padding:12px}
    .nv-fenster .kasten{position:relative;background:#fff;border-radius:14px;border:2px solid var(--nv-lila);border-top-width:7px;
       box-shadow:0 10px 36px rgba(0,0,0,.25);width:min(600px,100%);max-height:calc(100vh - 24px);overflow:auto;
       padding:14px 20px 14px;font-size:15px;line-height:1.45;color:var(--tinte)}
    .nv-fenster h2{margin:0 30px 4px 0;font-size:19px;color:var(--nv-lila-t)}
    .nv-fenster .satz{margin:0 0 8px;font-weight:600;font-size:16px}
    .nv-fenster ol{margin:0 0 8px;padding-left:24px}
    .nv-fenster li{margin:0 0 4px}
    .nv-fenster li::marker{font-weight:700;color:var(--nv-lila-t)}
    .nv-fenster .bsp{color:var(--matt);font-size:13.5px}
    .nv-fenster .schluss{margin:0 0 10px;padding:5px 10px;border-left:3px solid var(--nv-lila);background:#fffefb;font-size:14px}
    .nv-fenster .zu{position:absolute;top:6px;right:8px;width:32px;height:32px;border:0;background:none;font-size:24px;
       line-height:1;color:var(--matt);cursor:pointer;border-radius:8px}
    .nv-fenster .zu:hover{background:#f3efe6;color:var(--tinte)}
    .nv-fenster .unten{display:flex;justify-content:flex-end}
    .nv-fenster .los{font-size:15px;padding:6px 18px}
    @media (max-height:640px),(max-width:900px){
      .nv-fenster .kasten{font-size:14px;line-height:1.38;padding:10px 16px 10px}
      .nv-fenster h2{font-size:17px} .nv-fenster .satz{font-size:14.5px;margin-bottom:5px}
      .nv-fenster li{margin-bottom:2px}}
    .nv-fahne{position:absolute;right:14px;bottom:12px;z-index:40;display:flex;align-items:center;gap:10px;flex-wrap:wrap;
       max-width:min(460px,calc(100% - 28px));background:#fff;border:2px solid var(--nv-lila);border-radius:12px;padding:7px 10px 7px 12px;
       box-shadow:0 6px 20px rgba(0,0,0,.18);font-size:14px;animation:nvfahne .25s ease-out}
    .nv-fahne .notiz{font-weight:600;color:var(--tinte)}
    .nv-fahne .knopf{font-size:14.5px;padding:6px 14px;white-space:nowrap}
    .nv-fahne .uhr{height:3px;flex-basis:100%;background:var(--linie);border-radius:2px;overflow:hidden}
    .nv-fahne .uhr i{display:block;height:100%;width:100%;background:var(--nv-lila);animation:nvuhr 1.5s linear forwards}
    @keyframes nvfahne{from{transform:translateY(8px);opacity:0}to{transform:none;opacity:1}}
    @keyframes nvuhr{from{width:0}to{width:100%}}
    .nv-meldung{position:fixed;left:50%;top:14px;transform:translateX(-50%);z-index:200001;max-width:min(560px,calc(100% - 24px));
       background:#fff;border:2px solid var(--nv-lila);border-radius:10px;padding:8px 38px 8px 14px;font-size:14px;
       box-shadow:0 6px 20px rgba(0,0,0,.18)}
    .nv-meldung button{position:absolute;right:6px;top:4px;border:0;background:none;font-size:20px;cursor:pointer;color:var(--matt)}
    /* Rechnung unter einem direkt eingetragenen richtigen μ bzw. σ */
    .nv3rech{color:var(--richtig);font-size:12.5px;font-family:var(--druck)}
    /* NEU (FASSUNG CHILBI 3, wie Kapitel 6): das Fenster «Geschafft» */
    .nv-wegweiser .kasten h2{color:#007D57}
    .nv-wegweiser .unten{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}
    .nv-wegfrei{margin:10px 0 4px;padding:8px 10px;border-left:3px solid var(--nv-lila);background:#f7f2f9;border-radius:4px}
    .nv-wegfrei .was{font-weight:600;margin-bottom:6px}
    .nv-wegfrei .zeile{display:flex;align-items:center;gap:10px;margin:4px 0;flex-wrap:wrap}
    /* NEU (FASSUNG CHILBI 3): die Aufgaben als Nummern, die aktuelle gross */
    .nv3anrn{display:flex;gap:6px;margin:0 0 8px;align-items:center;flex-wrap:wrap}
    .nv3anrn .was{font-size:13px;color:var(--matt);margin-right:4px}
    .nv3anr{position:relative;font:600 17px "Fira Sans",sans-serif;width:44px;height:40px;border:1.5px solid #c9bda8;background:#fffefb;
       border-radius:6px;cursor:pointer;color:var(--tinte)}
    .nv3anr[aria-current=true]{background:var(--nv-lila);border-color:var(--nv-lila);color:#fff}
    .nv3anr.fertig{border-color:var(--richtig)}
    .nv3anr .ok{position:absolute;right:3px;top:1px;font:700 11px/1 "Fira Sans",sans-serif;color:var(--richtig)}
    .nv3anr[aria-current=true] .ok{color:#fff}
    .nv3von{font-size:12.5px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:var(--matt)}
    .nv3kk.gross b{font-size:19px}
    /* NEU (FASSUNG CHILBI 3): Pruefen zeigt, wo - leere Plaetze rot umrandet */
    .nv-luecke{outline:2.5px solid var(--falsch) !important;outline-offset:1px}
    /* Platz fuer die Fahne unter dem Inhalt */
    .nv3links,.nv3rechts{padding-bottom:70px}
  `;
  document.head.appendChild(s);
})();

const nvSkZu = {};
const NV_PLATZ = 600, NV_KNAPP = 300;
function nvKarteHtml(o){
  const zu = nvSkZu[o.id] === true;
  const knopf = `<button type="button" class="nv-auftragknopf" title="Den Auftrag dieser Etappe noch einmal zeigen">${nvEsc(NV.auftrag.knopf)}</button>`;
  return `<div class="nv-skarte${zu ? ' zu' : ''}" id="nvskarte" role="region" aria-label="Situation" data-sk="${o.id}">
    ${o.bild ? `<img class="nv-sbild" src="${nvEsc(o.bild)}" alt="" aria-hidden="true">` : ''}
    <div class="nv-sinhalt">
      <div class="nv-skopf"><span class="nv-stitel">${nvEsc(o.name)}</span><span class="nv-skurz">${nvEsc(o.frage)}</span>
        <span class="nv-snurzu">${knopf}</span>
        <button type="button" class="nv-sklapp" aria-expanded="${!zu}">${zu ? NV_SK.zeigen : NV_SK.einklappen}</button></div>
      <div class="nv-sganz">
        <p class="nv-stext">${nvEsc(o.text)}</p>
        <p class="nv-sfrage">${nvEsc(o.frage)}</p>
        <div class="nv-sauftragz"><p><span class="was">${nvEsc(NV_SK.auftrag)}</span>${nvEsc(D.etappen[o.nr - 1].auftrag)}</p>${knopf}</div>
      </div>
    </div></div>`;
}
/* Klappe und Automatik; `nachher` ordnet die Flaeche neu. */
/* NEU (Rike 2026-10-30, Vorschlag Abschnitt 17 B): ein Satz in der
   Situationskarte, was jetzt zu tun ist. Nur mit dem Band oben. */
function nvJetztSatz(text){
  if (D.leiste !== 'oben') return;
  const inhalt = document.querySelector('#nvskarte .nv-sinhalt');
  if (!inhalt) return;
  let p = inhalt.querySelector(':scope > .nv-jetztsatz');
  if (!p){ p = document.createElement('p'); p.className = 'nv-jetztsatz'; inhalt.appendChild(p); }
  if (p.innerHTML !== text) p.innerHTML = text;
}
function nvKarteHaken(nr, nachher){
  const k = document.getElementById('nvskarte');
  if (!k) return;
  // NEU (Rike 2026-10-30): Im Band ist die Situation immer ganz zu sehen
  // (wie Kapitel 5 und 6); zugeklappt wird das Band selbst.
  if (D.leiste === 'oben'){
    k.classList.remove('zu');
    k.querySelectorAll('.nv-auftragknopf').forEach(b => b.onclick = ev => { ev.stopPropagation(); nvAuftragFenster(nr); });
    // Etappe 1 und 2: Die Karte ist der Einstieg (die Aufgabe steht am Tisch). Der lange
    // Text steht hinter ⓘ neben dem Titel; oben bleiben Frage und Satz.
    const t = k.querySelector('.nv-stext'), kopf = k.querySelector('.nv-skopf');
    if ((nr === 1 || nr === 2) && t && kopf && window.leisteInfo){
      const i = document.createElement('span');
      i.textContent = t.textContent;
      kopf.insertBefore(i, kopf.querySelector('.nv-skurz'));
      t.remove();
      leisteInfo(i);
    }
    return;
  }
  const id = k.dataset.sk, kn = k.querySelector('.nv-sklapp');
  k.querySelectorAll('.nv-auftragknopf').forEach(b => b.onclick = ev => { ev.stopPropagation(); nvAuftragFenster(nr); });
  const setzen = zu => {
    nvSkZu[id] = zu;
    k.classList.toggle('zu', zu);
    kn.textContent = zu ? NV_SK.zeigen : NV_SK.einklappen;
    kn.setAttribute('aria-expanded', String(!zu));
    if (nachher) nachher();
  };
  kn.onclick = ev => { ev.stopPropagation(); setzen(!k.classList.contains('zu')); };
  k.querySelector('.nv-skopf').addEventListener('click', ev => {
    if (!k.classList.contains('zu') || ev.target.closest('button')) return;
    setzen(false);
  });
  const eingetragen = () => [...document.querySelectorAll('#buehne input, #buehne select, #buehne textarea')].some(f => !f.disabled
    && f.type !== 'checkbox' && f.type !== 'radio' && String(f.value).trim() !== '');
  const eng = () => innerHeight - k.getBoundingClientRect().bottom < NV_PLATZ;
  setTimeout(() => {
    if (!k.isConnected || nvSkZu[id] !== undefined) return;
    if ((eingetragen() && eng()) || innerHeight - k.getBoundingClientRect().bottom < NV_KNAPP) setzen(true);
  }, 0);
  // Der erste Eintrag (change: Feld verlassen, Enter oder Auswahl)
  const b = document.getElementById('buehne');
  if (b._nvSkHaken) b.removeEventListener('change', b._nvSkHaken, true);
  b._nvSkHaken = ev => {
    if (!k.isConnected || nvSkZu[id] !== undefined || !ev.target.matches('input, select, textarea') || !eingetragen()) return;
    if (eng()) setTimeout(() => { if (k.isConnected && nvSkZu[id] === undefined) setzen(true); }, 0);
  };
  b.addEventListener('change', b._nvSkHaken, true);
}
function nvAuftragFenster(nr){
  const alt = document.getElementById('nvfenster');
  if (alt) alt.remove();
  const A = NV.auftrag, F = A.fenster[String(nr)], vorher = document.activeElement;
  const f = document.createElement('div');
  f.className = 'nv-fenster'; f.id = 'nvfenster';
  f.innerHTML = `<div class="kasten" role="dialog" aria-modal="true" aria-labelledby="nvfenstertitel">
    <button type="button" class="zu" aria-label="Schliessen" title="Schliessen">×</button>
    <h2 id="nvfenstertitel">${nvEsc(A.knopf)} · Etappe ${nr}</h2>
    <p class="satz">${nvEsc(D.etappen[nr - 1].auftrag)}</p>
    <ol>${F.schritte.map(s => `<li>${s}</li>`).join('')}</ol>
    ${F.schluss ? `<p class="schluss">${nvEsc(F.schluss)}</p>` : ''}
    <div class="unten"><button type="button" class="knopf los">${nvEsc(A.los)}</button></div></div>`;
  const zu = () => {
    f.remove();
    document.removeEventListener('keydown', taste, true);
    const kn = document.querySelector('.nv-auftragknopf');
    if (vorher && vorher.isConnected && vorher !== document.body) vorher.focus();
    else if (kn) kn.focus();
  };
  const taste = ev => {
    if (!f.isConnected){ document.removeEventListener('keydown', taste, true); return; }
    if (ev.key === 'Escape'){ ev.preventDefault(); ev.stopPropagation(); zu(); }
    else if (ev.key === 'Tab'){
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
/* Beim ersten Oeffnen einer Etappe das Fenster. Ein Stand ohne das Feld
   (bis Fassung 3) zeigt jedes Fenster einmal. */
function nvAuftragBeimOeffnen(nr){
  // GEAENDERT (Rike 2026-10-30, Vorschlag Abschnitt 17 A): Mit dem Band
  // oben oeffnet die Etappe direkt am Tisch; gefuehrt wird mit dem Satz in
  // der Situationskarte (nvJetztSatz), der Auftrag steht hinter «Auftrag».
  if (D.leiste === 'oben') return;
  if (!stand.nvAuftrag || typeof stand.nvAuftrag !== 'object') stand.nvAuftrag = {};
  if (stand.nvAuftrag[nr] || document.body.classList.contains('loesungoffen')) return;
  stand.nvAuftrag[nr] = true;
  sichern();
  nvAuftragFenster(nr);
}
function nvMeldung(text, dauer){
  const zeigen = () => {
    document.querySelectorAll('.nv-meldung').forEach(m => m.remove());
    const m = document.createElement('div');
    m.className = 'nv-meldung'; m.setAttribute('role', 'status');
    m.innerHTML = `${nvEsc(text)}<button aria-label="Schliessen" title="Schliessen">×</button>`;
    m.querySelector('button').onclick = () => m.remove();
    document.body.appendChild(m);
    setTimeout(() => m.remove(), dauer || 3500);
  };
  if (document.body) zeigen(); else document.addEventListener('DOMContentLoaded', zeigen);
}
/* Die Fahne unten rechts in der Buehne. o = {notiz, knopf, tun, uhr,
   wache}; null nimmt sie weg. Dieselbe Fahne wird nicht neu gebaut
   (sonst liefe die Uhr nie ab). */
let _nvUhr = null;
let _nvWegWartet = null;
const nvObj = x => !!x && typeof x === 'object' && !Array.isArray(x);
/* NEU (FASSUNG CHILBI 3, Rike 2026-11-19, wie zgrFahne in Kapitel 6,
   Fassung 20): Mit o.fenster und o.schluessel geht beim ersten Mal das
   Fenster «Geschafft» auf. Wer gerade schreibt, wird nicht unterbrochen. */
function nvWegweiserMelden(o){
  if (!o || !o.fenster || !o.schluessel || document.body.classList.contains('loesungoffen')) return;
  if (!nvObj(stand.wegweiser)) stand.wegweiser = {};
  if (stand.wegweiser[o.schluessel]) return;
  const schreibt = a => a && (a.tagName === 'TEXTAREA' || (a.tagName === 'INPUT' && a.type !== 'button' && a.type !== 'range'));
  if (schreibt(document.activeElement)){
    _nvWegWartet = o;
    if (!window._nvWegHorcht){
      window._nvWegHorcht = true;
      document.addEventListener('focusout', () => setTimeout(() => {
        const w = _nvWegWartet;
        if (!w || schreibt(document.activeElement)) return;
        _nvWegWartet = null;
        const fa = document.getElementById('nvfahne');
        if (!fa || !fa.isConnected || fa.dataset.sig !== w._sig || stand.wegweiser[w.schluessel]) return;
        stand.wegweiser[w.schluessel] = true; sichern(); nvWegweiser(w);
      }, 200), true);
    }
    return;
  }
  stand.wegweiser[o.schluessel] = true;
  sichern();
  nvWegweiser(o);
}
function nvWegweiser(o){
  const alt = document.getElementById('nvwegweiser');
  if (alt) alt.remove();
  const WG = NV.wegweiser, F = o.fenster, haupt = o.haupt || {knopf: o.knopf, tun: o.tun};
  const frei = (F.frei || []).filter((x, i) => o.frei && o.frei[i]);
  const f = document.createElement('div');
  f.className = 'nv-fenster nv-wegweiser'; f.id = 'nvwegweiser';
  f.innerHTML = `<div class="kasten" role="dialog" aria-modal="true" aria-labelledby="nvwegtitel">
    <button type="button" class="zu" aria-label="${nvEsc(WG.bleiben)}" title="${nvEsc(WG.bleiben)}">×</button>
    <h2 id="nvwegtitel">✓ ${nvEsc(WG.titel)}</h2>
    <p class="satz">${nvEsc(F.text)}</p>
    <p class="schluss"><b>${nvEsc(WG.jetzt)}:</b> ${nvEsc(F.jetzt)}</p>
    ${frei.length ? `<div class="nv-wegfrei"><div class="was">${nvEsc(WG.frei)}</div>`
      + frei.map((x, i) => `<div class="zeile"><button type="button" class="knopf leer" data-frei="${i}">${nvEsc(x.knopf)}</button>`
        + `<span>${nvEsc(x.text)}</span></div>`).join('') + '</div>' : ''}
    <div class="unten"><button type="button" class="knopf leer bleiben">${nvEsc(WG.bleiben)}</button>`
    + `<button type="button" class="knopf los">${nvEsc(String(haupt.knopf).replace(/\s*→$/, ''))} →</button></div></div>`;
  const zu = () => { f.remove(); document.removeEventListener('keydown', taste, true); };
  const taste = ev => {
    if (!f.isConnected){ document.removeEventListener('keydown', taste, true); return; }
    if (ev.key === 'Escape'){ ev.preventDefault(); ev.stopPropagation(); zu(); }
    else if (ev.key === 'Tab'){
      const kn = [...f.querySelectorAll('button')], i = kn.indexOf(document.activeElement);
      ev.preventDefault();
      kn[(i + (ev.shiftKey ? kn.length - 1 : 1)) % kn.length].focus();
    }
  };
  document.addEventListener('keydown', taste, true);
  f.querySelector('.zu').onclick = zu;
  f.querySelector('.bleiben').onclick = zu;
  f.querySelector('.los').onclick = () => { zu(); haupt.tun(); };
  f.querySelectorAll('[data-frei]').forEach(b => b.onclick = () => {
    zu(); const i = (F.frei || []).indexOf(frei[+b.dataset.frei]); o.frei[i]();
  });
  f.addEventListener('click', ev => { if (ev.target === f) zu(); });
  document.body.appendChild(f);
  f.querySelector('.los').focus();
}
function nvFahne(o){
  const alt = document.getElementById('nvfahne');
  if (o && document.body.classList.contains('loesungoffen')) o = null;
  // GEAENDERT (FASSUNG CHILBI 3, Maurus zu Kapitel 6: «Die Loesungen
  // verschwinden schnell wieder»): nie mehr von selbst weiter, o.uhr
  // wird nicht mehr beachtet.
  if (o) o.uhr = false;
  const sig = o ? o.notiz + '|' + o.knopf + '|' + !!o.uhr : '';
  if (o) o._sig = sig;
  if (alt && alt.dataset.sig === sig && alt.isConnected){ if (o){ alt._tun = o.tun; nvWegweiserMelden(o); } return; }
  clearTimeout(_nvUhr); _nvUhr = null;
  if (alt) alt.remove();
  if (!o) return;
  const ziel = document.querySelector('#buehne .buehne');
  if (!ziel) return;
  const f = document.createElement('div');
  f.id = 'nvfahne'; f.className = 'nv-fahne'; f.setAttribute('role', 'status'); f.dataset.sig = sig;
  f.innerHTML = (o.notiz ? `<span class="notiz">${nvEsc(o.notiz)}</span>` : '')
    + `<button type="button" class="knopf">${nvEsc(o.knopf)}</button>` + (o.uhr ? '<span class="uhr"><i></i></span>' : '');
  f._tun = o.tun;
  ziel.appendChild(f);
  f.querySelector('button').onclick = ev => { ev.stopPropagation(); clearTimeout(_nvUhr); f._tun(); };
  nvWegweiserMelden(o);
  if (o.uhr) _nvUhr = setTimeout(() => {
    if (!f.isConnected || (o.wache && !o.wache())) return;
    f._tun();
  }, 1500);
}

/* ───────── Etappe 1 · Aufgabe, Bild, Gleichung ───────── */

/* Nummer eines Stoerpaars (BD2, GD2 -> 2), sonst null. Einzelgaenger
   (GX) haben keine - sie passen zu nichts. */
function nvStoerNr(id){
  const m = /^(BD|GD)(\d+)$/.exec(id);
  return m ? m[2] : null;
}
const nvHeim = id => id[0] === 'B' ? 'tischB' : 'tischG';
const nvGesuchtName = w => (NV1.gesucht.find(g => g.wert === w) || {}).name || '…';

function _nvLoesungE1(){
  const karten = {}, gesucht = {};
  // NEU (FASSUNG CHILBI 2): Die Loesung zeigt beide Zuege.
  NV1.zeilen.filter(z => !z.beispiel).forEach(z => {
    karten['B' + z.nr] = {ort: `z${z.nr}/bild`, x: 4, y: 4, rot: 0};
    karten['G' + z.nr] = {ort: `z${z.nr}/gl`,   x: 4, y: 4, rot: 0};
    gesucht[z.nr] = z.gesucht;
  });
  return {karten, nvgesucht: gesucht, nvZug2: true};
}

function etappe1(){
  const a = D.etappen[0];
  loesungAnwenden(_nvLoesungE1);
  if (!stand.nvgesucht || typeof stand.nvgesucht !== 'object') stand.nvgesucht = {};
  const loesungZu = !!(window.KASPER_RUECKMELDUNG && stand.loesungOffen);

  // GEAENDERT (FASSUNG CHILBI): Die graue Leiste traegt nur «Etappe 1 ·
  // Name»; Situation und Auftrag stehen in der Situationskarte, die
  // Schritte im Auftragsfenster.
  const sk = nvKarteHtml({id: 'e1', nr: 1, name: NV_SK.e1name, text: NV_SK.e1text,
    frage: NV_SK.e1frage, bild: 'erkundung.png'});
  buehneOben({rolle:a.rolle, rang:a.rang, titel:'Etappe 1 · ' + a.name, text:''},
    'Situationen',
    [{id:'B', name:'Bilder'}, {id:'G', name:'Gleichungen'}],
    `<button class="knopf leer" id="zurueckalles" title="Alle Karten zurück in den Vorrat">↺</button>
     <button class="knopf" id="fertig">Prüfen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Etappe 2 →</button>`, sk);
  // Die Zeilen brauchen mehr Hoehe als der Vorrat.
  document.getElementById('obenhaelfte').style.flex = '2.4 1 0';
  /* NEU (gemeinsam entschieden): FASSUNG CHILBI 2, zwei Zuege wie Kapitel
     7, Etappe 1. Zug 1 an der Chilbi; Zug 2 (stand.nvZug2) mit den
     Skript-Situationen erscheint, sobald alle Zeilen von Zug 1 richtig
     geprueft sind - die Fahne «Zu den Skript-Aufgaben →» oeffnet ihn.
     Karten eines geschlossenen Zuges liegen nicht im Vorrat. */
  const zug2 = !!stand.nvZug2;
  const sichtbar = NV1.karten.filter(k => k.zug === 1 || zug2);
  const zeilenSicht = NV1.zeilen.filter(z => z.zug === 1 || zug2);
  const sichtIds = new Set(sichtbar.map(k => k.id));
  window._zustaendig = id => sichtIds.has(id);

  const feld = document.getElementById('feld');
  NV1.karten.forEach(k => { if (!(k.id in stand.karten)) stand.karten[k.id] = {ort: nvHeim(k.id), x:0, y:0, rot:0}; });

  const els = {};
  sichtbar.forEach(k => { els[k.id] = karte(k.id, null); });
  // Die Karten der Beispielzeile liegen fest - sie werden gelesen, nicht gelegt.
  const beispiel = NV1.zeilen.find(z => z.beispiel);
  const fest = beispiel ? {['B' + beispiel.nr]: karte('B' + beispiel.nr, null, {fest:true}),
                           ['G' + beispiel.nr]: karte('G' + beispiel.nr, null, {fest:true})} : {};

  const kbw = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--kb'));

  function zeilen(){
    feld.querySelectorAll('.nvzeile').forEach(d => d.remove());
    const kb = kbw(), slotW = kb + 8, slotH = kb * NV1.hoch + 8;
    const PAD = 8, GAP = 12, WAHL = 112, URTEIL = 18;
    const platz = (feld.parentElement.clientWidth || 700) - 24;
    const sitW = Math.max(kb * 1.25, Math.min(kb * 2.6, platz - 2 * PAD - 2 * slotW - WAHL - 3 * GAP));
    const zeileW = 2 * PAD + sitW + 2 * slotW + WAHL + 3 * GAP;
    const xBild = PAD + sitW + GAP, xGl = xBild + slotW + GAP, xWahl = xGl + slotW + GAP;
    let y = 30, zugVorher = null;
    zeilenSicht.forEach(z => {
      if (z.zug !== zugVorher){
        // NEU (FASSUNG CHILBI 2): Kopf je Zug
        zugVorher = z.zug;
        const Z = NV1.zuege[String(z.zug)], k = document.createElement('div');
        k.className = 'nvzug'; k.dataset.zug = z.zug; k.dataset.alsbild = '';
        k.style.left = '8px'; k.style.top = y + 'px'; k.style.width = zeileW + 'px';
        k.innerHTML = `<b>${nvEsc(Z.kopf)}</b>${Z.text ? `<span>${nvEsc(Z.text)}</span>` : ''}`;
        feld.appendChild(k);
        y += k.offsetHeight + 6;
      }
      const d = document.createElement('div');
      d.className = 'nvzeile' + (z.beispiel ? ' beispiel' : '');
      d.dataset.zeile = z.nr;
      d.style.left = '8px'; d.style.top = y + 'px'; d.style.width = zeileW + 'px';
      const oben = PAD + (z.beispiel ? 22 : 0);
      if (z.beispiel){
        const b = document.createElement('div');
        b.className = 'nvbeispiel'; b.dataset.alsbild = '';
        b.textContent = 'So sieht ein fertiges Tripel aus';
        d.appendChild(b);
      }
      const sit = document.createElement('div');
      sit.className = 'nvsit'; sit.dataset.alsbild = '';
      sit.style.left = PAD + 'px'; sit.style.top = oben + 'px'; sit.style.width = sitW + 'px';
      const qu = nvQuelle(z.kurz, z.quelle);
      sit.innerHTML = `<span class="nvkurz">${z.kurz}</span> ${z.text}`
                    + (qu ? ` <span class="quelle">${qu}</span>` : '');
      d.appendChild(sit);
      [['bild', xBild, 'B', 'Bild'], ['gl', xGl, 'G', 'Gleichung']].forEach(([art, x, nur, name]) => {
        const p = document.createElement('div');
        p.className = 'paar'; p.dataset.ort = `z${z.nr}/${art}`;
        p.dataset.fasst = '1'; p.dataset.nur = nur;
        p.style.left = x + 'px'; p.style.top = oben + 'px';
        p.style.width = slotW + 'px'; p.style.height = slotH + 'px';
        p.innerHTML = `<span class="hint">${name}</span>`;
        d.appendChild(p);
      });
      const w = document.createElement('label');
      w.className = 'nvwahl';
      w.style.left = xWahl + 'px'; w.style.top = (oben + slotH / 2 - 26) + 'px'; w.style.width = WAHL + 'px';
      const wert = z.beispiel ? z.gesucht : (stand.nvgesucht[z.nr] || '');
      w.innerHTML = `<span>gesucht:</span>
        <select aria-label="gesucht in Zeile ${z.kurz}" ${z.beispiel || loesungZu ? 'disabled' : ''}>
          <option value="">…</option>
          ${NV1.gesucht.map(g => `<option value="${g.wert}"${g.wert === wert ? ' selected' : ''}>${g.name}</option>`).join('')}
        </select>
        <span class="nvwahlbild" data-alsbild>gesucht: ${nvGesuchtName(wert)}</span>`;
      const sel = w.querySelector('select');
      sel.onchange = () => {
        stand.nvgesucht[z.nr] = sel.value;
        w.querySelector('.nvwahlbild').textContent = 'gesucht: ' + nvGesuchtName(sel.value);
        sel.classList.remove('nv-luecke');
        markenLoeschen(); sichern();
        if (!e1Fertig()) nvFahne(null);
      };
      d.appendChild(w);
      feld.appendChild(d);
      const h = Math.max(sit.offsetHeight + (oben - PAD), slotH + (oben - PAD)) + 2 * PAD + URTEIL;
      d.style.height = h + 'px';
      y += h + 12;
    });
    // Kontrollfassung: Was an den Karten im Vorrat faul ist, steht unter
    // den Zeilen - im Feld selbst, damit die Buehne nicht schrumpft.
    if (loesungZu){
      const panel = document.createElement('div');
      panel.className = 'nvzeile nvloesung';
      panel.style.left = '8px'; panel.style.top = y + 'px'; panel.style.width = zeileW + 'px';
      panel.innerHTML = '<b>Im Vorrat bleiben</b>'
        + NV1.stoer.map(s => `<div>Störpaar — ${s.grund}</div>`).join('')
        + NV1.einzel.map(e => `<div>Gleichung ohne Bild — ${e.grund}</div>`).join('');
      feld.appendChild(panel);
      y += panel.offsetHeight + 12;
    }
    feld.style.minWidth = (zeileW + 16) + 'px';
    feld.style.minHeight = (y + 10) + 'px';

    Object.entries(fest).forEach(([id, el]) => {
      const ziel = feld.querySelector(`[data-ort="z${beispiel.nr}/${id[0] === 'B' ? 'bild' : 'gl'}"]`);
      if (!ziel) return;
      ziel.appendChild(el); el._x = 4; el._y = 4; el._rot = 0; pos(el);
    });
    Object.entries(stand.karten).forEach(([id, s]) => {
      const el = els[id]; if (!el) return;
      let ziel = document.querySelector(`.buehne [data-ort="${s.ort}"]`);
      if (!ziel){
        stand.karten[id] = {ort: nvHeim(id), x:0, y:0, rot:0};
        s = stand.karten[id];
        ziel = document.querySelector(`.buehne [data-ort="${s.ort}"]`);
      }
      if (ziel.classList.contains('paar')){ s.x = 4; s.y = 4; s.rot = 0; }
      ziel.appendChild(el); el._x = s.x; el._y = s.y; el._rot = s.rot; pos(el);
    });
  }

  /* Der Vorrat: Bilder links, Gleichungen rechts, gestreut. Nur was
     gerade im Vorrat liegt und dort noch keinen Platz hat. */
  function vorratOrdnen(){
    ['B', 'G'].forEach(s => {
      const blatt = document.getElementById('feld' + s);
      const drauf = sichtbar.map(k => k.id)
        .filter(id => (stand.karten[id] || {}).ort === 'tisch' + s && nvHeim(id) === 'tisch' + s)
        .map(id => els[id]).filter(Boolean);
      streuen(drauf, blatt);
    });
  }
  window._neuzeichnen = () => { zeilen(); vorratOrdnen(); };
  zeilen();
  vorratOrdnen();
  nvKarteHaken(1, null);
  nvAuftragBeimOeffnen(1);
  /* NEU (FASSUNG CHILBI): die Fahne in Etappe 1. Stimmen alle Zeilen
     (Karten am richtigen Platz, «gesucht» richtig), steht «Weiter zu
     Etappe 2 →» da - ohne Uhr: Der Befund fragt noch, woran man die
     Karten im Vorrat erkennt. Gelesen wird der Stand, nicht der DOM, damit
     die Fahne auch beim Laden richtig steht. */
  const zeileFertig = z => (stand.karten['B' + z.nr] || {}).ort === `z${z.nr}/bild`
    && (stand.karten['G' + z.nr] || {}).ort === `z${z.nr}/gl` && stand.nvgesucht[z.nr] === z.gesucht;
  const e1Fertig = () => zeilenSicht.filter(z => !z.beispiel).every(zeileFertig);
  // NEU (FASSUNG CHILBI 2): Erst Zug 2 oeffnen, dann weiter zu Etappe 2
  const zug2Oeffnen = () => {
    stand.nvZug2 = true; stand.geprueft = false; nvFahne(null); sichern();
    etappe1();
    const k = document.querySelector('.nvzug[data-zug="2"]');
    if (k) k.scrollIntoView({block: 'start', behavior: 'smooth'});
  };
  const e1Fahne = () => { e1Satz(); e1Fahne0(); };
  const e1Fahne0 = () => nvFahne(!stand.geprueft || !e1Fertig() || document.body.classList.contains('loesungoffen') ? null
    : zug2 ? {notiz: NV_W.etappe2Notiz, knopf: NV_W.etappe2, tun: () => { stand.etappe = 1; los(); },
              fenster: NV.wegweiser.etappe2, schluessel: 'e1etappe2'}
    : {notiz: NV_W.zug2Notiz, knopf: NV_W.zug2, tun: zug2Oeffnen,
       fenster: NV.wegweiser.zug2, schluessel: 'e1zug2'});
  window._nachAblegen = () => {
    // NEU (FASSUNG CHILBI 3): Der Hinweis zum Ziehen verschwindet nach dem
    // ersten Mal; eine rot umrandete Luecke, sobald sie gefuellt ist.
    if (!stand.nvGezogen){ stand.nvGezogen = true; sichern(); e1Satz(); }
    feld.querySelectorAll('.paar.nv-luecke').forEach(p => { if (p.querySelector(':scope > .k')) p.classList.remove('nv-luecke'); });
    if (!e1Fertig()) nvFahne(null);
  };
  e1Fahne();
  // NEU (Rike 2026-10-30, Vorschlag Abschnitt 17 B): der Satz geht mit
  // der Fahne (nach Pruefen und beim Laden).
  function e1Satz(){ nvJetztSatz(stand.geprueft && e1Fertig()
    ? (zug2 ? 'Alle Zeilen stimmen. Weiter zu Etappe 2.' : 'An der Chilbi stimmt alles. Weiter zu den Aufgaben aus dem Skript.')
    : 'Ziehen Sie zu jeder Situation das passende Bild und die passende Gleichung aus dem Vorrat auf ihre Plätze. '
      + 'Wählen Sie am Ende der Zeile, was gesucht ist. Dann «Prüfen».'
      + (zug2 ? '' : ' <span class="nv-noch">Die erste Zeile, die Quizbude, ist als Beispiel fertig.</span>')
      + (stand.nvGezogen || document.body.classList.contains('loesungoffen') ? ''
        : ` <span class="nv-noch" style="color:var(--nv-lila-t)">✋ ${nvEsc(NV.ziehen)}</span>`)); }

  /* GEAENDERT (FASSUNG CHILBI 2): In Zug 2 gehen nur die Karten zurueck,
     die in Zeilen von Zug 2 liegen oder zu Zug 2 gehoeren; Zug 1 bleibt. */
  document.getElementById('zurueckalles').onclick = () => {
    const zug2Zeilen = new Set(NV1.zeilen.filter(z => z.zug === 2).map(z => z.nr));
    const inZug2 = id => { const m = /^z(\d+)\//.exec((stand.karten[id] || {}).ort || ''); return m && zug2Zeilen.has(+m[1]); };
    sichtbar.forEach(k => {
      if (!zug2 || k.zug === 2 || inZug2(k.id)) stand.karten[k.id] = {ort: nvHeim(k.id), x:0, y:0, rot:0};
    });
    if (!zug2) stand.nvgesucht = {};
    else zug2Zeilen.forEach(nr => { delete stand.nvgesucht[nr]; });
    zeilen(); vorratOrdnen(); merken(); nvFahne(null);
  };

  /* Zwei Kanaele, wie Reflexion 1 (siehe themen/kombinatorik/etappen.js):
       1) DAS PAAR an den Karten: gehoeren Bild und Gleichung zusammen?
       2) DIE SITUATION am Platz: passt das Paar zu dieser Zeile?
     Dazu die Auswahl «gesucht». Gelesen wird NUR der DOM und die Auswahl
     von jetzt - nichts von vorhin. Die Beispielzeile zaehlt nicht mit. */
  function pruefen(){
    markenLoeschen();
    feld.querySelectorAll('.nv-luecke').forEach(x => x.classList.remove('nv-luecke'));
    const zeilenSoll = zeilenSicht.filter(z => !z.beispiel);
    let paarOk = 0, paarFalsch = 0, sitOk = 0, sitFalsch = 0, offen = 0, gesOk = 0, gesFalsch = 0, gesOffen = 0;
    zeilenSoll.forEach(z => {
      const zeile = feld.querySelector(`.nvzeile[data-zeile="${z.nr}"]`);
      if (!zeile) return;
      const pb = zeile.querySelector(`[data-ort="z${z.nr}/bild"]`);
      const pg = zeile.querySelector(`[data-ort="z${z.nr}/gl"]`);
      const kB = pb.querySelector(':scope > .k'), kG = pg.querySelector(':scope > .k');
      const teile = [];
      // NEU (FASSUNG CHILBI 3): leere Plaetze rot umrandet
      if (!kB) pb.classList.add('nv-luecke');
      if (!kG) pg.classList.add('nv-luecke');
      if (!kB && !kG){ offen++; teile.push(['offen', 'Bild und Gleichung fehlen noch']); }
      else if (!kB || !kG){
        offen++; (kB || kG).classList.add('halb');
        teile.push(['offen', kB ? 'Die Gleichung fehlt noch' : 'Das Bild fehlt noch']);
      } else {
        const iB = kB.dataset.id, iG = kG.dataset.id;
        const sB = NV1.loesung[iB], sG = NV1.loesung[iG];
        const paarStimmt = (sB === 0 && sG === 0)
          ? (nvStoerNr(iB) !== null && nvStoerNr(iB) === nvStoerNr(iG))
          : (sB !== 0 && sB === sG);
        [kB, kG].forEach(k => k.classList.add(paarStimmt ? 'ok' : 'falsch'));
        if (!paarStimmt){
          paarFalsch++; [pb, pg].forEach(p => p.classList.add('sit-warte'));
          teile.push(['falsch', 'Bild und Gleichung passen nicht zusammen']);
        } else {
          paarOk++;
          if (sB === z.nr){
            sitOk++; [pb, pg].forEach(p => p.classList.add('sit-ok'));
            teile.push(['ok', 'Bild und Gleichung passen zusammen und zu dieser Situation']);
          } else {
            sitFalsch++; [pb, pg].forEach(p => p.classList.add('sit-falsch'));
            teile.push(['falsch', 'Bild und Gleichung passen zusammen, aber nicht zu dieser Situation']);
          }
        }
      }
      const sel = zeile.querySelector('select');
      sel.classList.remove('ok', 'falsch');
      const w = stand.nvgesucht[z.nr] || '';
      if (!w){ gesOffen++; sel.classList.add('nv-luecke'); teile.push(['offen', '«gesucht» fehlt noch']); }
      else if (w === z.gesucht){ gesOk++; sel.classList.add('ok'); teile.push(['ok', '«gesucht» stimmt']); }
      else { gesFalsch++; sel.classList.add('falsch'); teile.push(['falsch', '«gesucht» stimmt nicht']); }
      const u = document.createElement('div');
      u.className = 'sitmarke nvurteil';
      u.style.left = pb.style.left;
      u.innerHTML = teile.map(([art, t]) =>
        `<span class="${art}">${art === 'ok' ? '✓' : art === 'falsch' ? '✗' : '·'} ${t}</span>`).join('');
      zeile.appendChild(u);
    });
    stand.geprueft = true;

    const n = zeilenSoll.length, satz = [];
    satz.push(`Richtig gelegt: ${sitOk} von ${n} Zeilen.`);
    if (paarFalsch) satz.push(paarFalsch === 1 ? 'In einer Zeile passen Bild und Gleichung nicht zusammen.'
                                               : `In ${paarFalsch} Zeilen passen Bild und Gleichung nicht zusammen.`);
    if (sitFalsch) satz.push(sitFalsch === 1 ? 'Ein Paar passt zusammen, aber zu einer anderen Situation.'
                                             : `${sitFalsch} Paare passen zusammen, aber zu einer anderen Situation.`);
    if (offen) satz.push(offen === 1 ? 'Eine Zeile ist noch nicht vollständig.' : `${offen} Zeilen sind noch nicht vollständig.`);
    satz.push(`«Gesucht»: ${gesOk} von ${n} richtig.`);
    const fertig = sitOk === n && gesOk === n;
    if (fertig){
      const restB = sichtbar.filter(k => k.id[0] === 'B' && NV1.loesung[k.id] === 0).length;
      const restG = sichtbar.filter(k => k.id[0] === 'G' && NV1.loesung[k.id] === 0).length;
      satz.length = 0;
      satz.push(`Alle Zeilen sind richtig. Im Vorrat bleiben ${restB} Bilder und ${restG} Gleichungen — `
              + 'sie passen zu keiner Situation. Woran sieht man das?'
              + (zug2 ? '' : ' Danach kommen die Aufgaben aus dem Skript dazu.'));
    }
    document.getElementById('befund').textContent = satz.join(' ');
    e1Fahne();
    return {fertig};
  }
  document.getElementById('fertig').onclick = pruefen;
  document.getElementById('weiter').onclick = () => { stand.etappe = 1; los(); };
  loesungsKnopf(() => etappe1());
}


/* ───────── Etappe 2 · Selbst übersetzen (FASSUNG 3.1) ─────────
   NEU (gemeinsam entschieden): thema.md, «FASSUNG 3.1 — Etappe 2
   vereinfachen» (Rike, 2026-10-16: «Etappe 2 ist nur sehr umstaendlich
   und technisch ... man sollte die Informationen darunter nur angeben
   (wie bei 7)»).
     1  Markieren wie in Kapitel 7: Stift waehlen, ueber den Text
        streichen. Zahlen und Wortgruppen sind markierbar, ein Radierer
        nimmt Farbe weg. Nicht geprueft. Die Mechanik ist die aus
        themen/bernoulli/etappen.js (bnStuecke, bnMalen, der
        pointerdown-Haken in bnKarte), hier mit eigenem Praefix.
     2  Angaben eintragen wie auf den Karten von Kapitel 7: n, p, Grenze
        (k bzw. a und b), Sicherheit, dazu einseitig / zweiseitig und
        untere / obere Grenze. Genau ein Feld bekommt «?».
     3  Das Bild entsteht von selbst aus den Angaben.
     4  c waehlen; die Gleichung erscheint von selbst, im Kartenlayout
        aus Etappe 1 (Hauptzeile, darunter der getoente Kasten).
     5  Pruefen gegen den Generator (D.e2.aufgaben[].angaben), mit
        Begruendung; erst dann das Ergebnis.
   GEAENDERT (FASSUNG 3.1): Die Bausteinwahl fuer die Gleichung, die
   einrastenden Grenzlinien und die Schraffurwahl sind weggefallen.

   NEU (gemeinsam entschieden): thema.md, «Nachtrag 2026-10-16 (Rike):
   Bild wieder selbst bauen, aber einfach» (Rike: «es ist doof, dass die
   Studierenden nur ablesen und das Bild nicht mehr selbst bauen»).
   Nach dem Markieren und VOR den Feldern baut man das Bild mit wenigen
   Klicks, ohne Ziehen und ohne Einrasten:
     - «eine Grenze» (dazu «links / rechts») oder «zwei Grenzen»: die
       Linien stehen fest und symmetrisch um mu (NV3_POS);
     - Klick auf eine Flaeche schraffiert sie oder nimmt die Schraffur weg;
     - in jede Flaeche (schraffiert oder offener Schwanz) die Prozente;
     - «?» per kleinem Menue an eine Grenze (a, b, k), an mu (p gesucht)
       oder an die Breite sigma (n gesucht).
   «Bild pruefen» vergleicht mit dem Generator (nv3PruefeBild), mit
   Begruendung. Erst dann folgen die Felder; einseitig / zweiseitig,
   untere / obere Grenze und das «?» kommen aus dem Bild und werden nicht
   noch einmal gefragt. Das von selbst gezeichnete Bild (nv3Bild) zeigt
   danach nur noch die EIGENE, gepruefte Wahl - nie vorher ein richtiges
   Bild.
   NEU (gemeinsam entschieden): Rike, 2026-10-16: «man könnte aber als
   Hilfsknopf das Bild bauen lassen». Neben «Bild pruefen» steht «Bild
   zeigen (Hilfe)»: Es baut das richtige Bild, das Bild gilt als
   geprueft, die Aufgabe traegt den Vermerk «mit Hilfe». Gesperrt wird
   nichts.

   NEU (gemeinsam entschieden): thema.md, «Nachtrag 2026-10-16 (Rike):
   Reihenfolge in Etappe 2, mu und sigma selbst». Die Reihenfolge je
   Aufgabe ist jetzt:
     1  Markieren (wie oben).
     2  Links unter der Situation eintragen: n, p, Grenze (k bzw. a und
        b), Sicherheit, «?» beim Gesuchten, dazu mu und sigma als Zahl
        oder als Term in der Unbekannten («0.7 · n», «√(n · 0.7 · 0.3)»).
        «Angaben pruefen» mit Begruendung (nv3PruefeAngaben). Terme
        werden an Probestellen ausgewertet (nv3Term, nv3Vergleich),
        gleichwertige gelten. Erst wenn die Angaben stimmen, erscheint
        das Bild.
     3  Ins Bild uebertragen mit den Klicks von oben; zusaetzlich werden
        mu und eine gegebene Grenze beschriftet. «Bild pruefen» und «Bild
        zeigen (Hilfe)» bleiben.
     4  c waehlen.
     5  Die Gleichung selbst aufstellen: eine der drei Formen waehlen,
        dann die Platzhalter (Grenze, mu, c, sigma) fuellen
        (nv3Schablone, nv3PruefeGl). Die Gleichung, die frueher von
        selbst erschien, steht erst nach dem richtigen Pruefen da, mit
        dem Ergebnis.
     6  Pruefen (nv3Pruefe), dann das Ergebnis.

   Stand: stand.nv3 = {akt, stift, a: {Aufgabe: Eintrag}}
     Eintrag = {v: 32, marks: {Stuecknr: n|p|g|s}, n, p, k, a, b, s,
                mu, sigma, seiten: ''|ein|zwei, lage: ''|unten|oben,
                frage: null|n|p|g|s, c, form: ''|betrag|unten|oben,
                gl: {g, mu, c, s}, angabenGeprueft, angabenOk,
                geprueft, ok, okAlles,
                bild: {gr: ''|ein|zwei, seite: ''|links|rechts,
                       schr: {l, m, r: bool}, proz: {l, m, r: Text},
                       frage: null|g|mu|breite, mu, lab: {a, b, k}},
                bildGeprueft, bildOk, hilfe,
                erg: {w, a, b}, ergGeprueft, ergOk, rechnung}   (Chilbi 2)
   Ein Eintrag der Fassung 31 wird in nv3Auf32() ergaenzt: War die
   Aufgabe geloest, kommt das Neue aus der Loesung; sonst bleibt die
   Arbeit stehen, und mu, sigma und die Gleichung sind noch zu machen.
   Ein Eintrag ohne «bild» (vor dem Nachtrag) bekommt in nv3Stand() ein
   Bild: richtig und geprueft, wenn die Aufgabe schon geloest war, sonst
   aus seiten / lage / s / frage vorbelegt, aber ungeprueft.
   Ein Eintrag aus der Zeit vor FASSUNG 3.1 (ohne v) wird in
   nv3AltUmstellen() uebernommen: Markierungen, Seiten aus den gesetzten
   Linien, Sicherheit aus dem Prozentwert der Flaeche, c und Grenze k aus
   der Gleichung, das «?». */

const NV3STIFTE = [
  {k:'n', name:'n'}, {k:'p', name:'p'}, {k:'g', name:'Grenze'}, {k:'s', name:'Sicherheit'},
];
const NV3ARTEN = NV3STIFTE.map(s => s.k);
const NV3TYP = {ab:'a und b', k:'k', n:'n', p:'p'};
const NV3NAME = {n:'n', p:'p', g:'Die Grenze', s:'Die Sicherheit'};
/* zweiseitig: das S-Intervall; einseitig: das (2S - 100)-Intervall */
const NV3C = {90:1.64, 95:1.96, 98:2.33, 99:2.58};

(function nv3Stil(){
  const s = document.createElement('style');
  s.id = 'normalverteilung-e2';
  s.textContent = `
  /* Stiftfarben wie Kapitel 7: n blau, p gruen, Grenze lila, Sicherheit gelb */
  .nvm-n{--mf:#0065A9;--mg:#d3e6f7;--mt:#fff} .nvm-p{--mf:#007D57;--mg:#d1f0e2;--mt:#fff}
  .nvm-g{--mf:#9867A5;--mg:#eddff3;--mt:#fff} .nvm-s{--mf:#d4ac00;--mg:#fff09a;--mt:#2d2924}
  .nv3links{padding:26px 10px 14px;font-size:14px;line-height:1.5}
  .nv3stifte{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;margin:2px 0 8px;
    padding:6px 10px;border:1px solid var(--linie);border-radius:10px;background:var(--karte);font-size:13px}
  .nv3stifte .was{font-weight:600;color:var(--akzent);margin-right:2px}
  .nv3stifte button{font:inherit;font-size:15px;font-weight:600;min-width:46px;height:32px;padding:0 10px;
    border:2px solid var(--mf,#b9ad98);border-radius:8px;background:var(--mg,#fff);color:var(--tinte);
    cursor:pointer;display:inline-flex;align-items:center;gap:6px}
  .nv3stifte button::before{content:'';width:9px;height:16px;border-radius:2px 2px 4px 4px;
    background:var(--mf,#b9ad98);transform:rotate(18deg)}
  .nv3stifte button.weg{--mf:#8d8476;--mg:#f3efe8;font-weight:400;font-size:13px}
  .nv3stifte button.weg::before{width:14px;height:9px;border-radius:2px;background:#e9b8b0;
    border:1px solid #8d8476;transform:rotate(-18deg)}
  .nv3stifte button[aria-pressed=true]{background:var(--mf);color:var(--mt,#fff);
    box-shadow:0 0 0 3px var(--mg),0 2px 5px rgba(0,0,0,.18);transform:translateY(-1px)}
  .nv3stifte button[aria-pressed=true]::before{background:var(--mt,#fff)}
  .nv3stifte .zart{color:var(--matt);font-size:12.5px}
  .nv3stifte.winke{animation:nv3winke .9s ease 1}
  @keyframes nv3winke{0%,100%{box-shadow:none}30%,70%{box-shadow:0 0 0 3px var(--akzent)}}
  @media (max-width:900px),(max-height:640px){
    .nv3stifte{padding:3px 8px;margin:0 0 4px}
    .nv3stifte button{height:27px;font-size:14px}
    .nv3stifte .zart{display:none}
    .nv3reiter{gap:3px;margin-bottom:6px}
    .nv3reiter button{font-size:11.5px;padding:2px 7px}
    .nv3stifte button{min-width:36px;padding:0 7px}}
  .nv3karte{background:var(--karte);border:1px solid var(--linie);border-radius:10px;
    box-shadow:0 1px 3px rgba(0,0,0,.06)}
  .nv3kk{display:flex;justify-content:space-between;align-items:baseline;gap:6px;padding:5px 10px 3px;
    border-bottom:1px solid var(--linie);background:#f7f0f9;border-radius:10px 10px 0 0;font-size:12.5px;color:var(--akzent)}
  .nv3kk b{font-weight:600} .nv3kk span{color:var(--matt);font-size:11px}
  .nv3text{padding:8px 11px 7px;font-size:15px;line-height:1.7}
  .nv3links.stift-an .nv3text{cursor:crosshair;user-select:none;-webkit-user-select:none}
  .nv3text .w,.nv3text .ws{border-radius:2px}
  .nv3links.stift-an .nv3text .w:hover{box-shadow:inset 0 -2px 0 #c9bda8}
  .nv3text .w[class*=" nvm-"],.nv3text .ws[class*=" nvm-"]{background:var(--mg);color:var(--tinte);
    box-shadow:inset 0 -2px 0 var(--mf)}
  .nv3felder{border-top:1px dashed var(--linie);padding:8px 10px 9px;display:flex;flex-direction:column;gap:7px}
  .nv3frow{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center}
  .nv3f{display:inline-flex;align-items:center;gap:4px;border-radius:7px;padding:1px}
  .nv3fn{display:inline-block;font-weight:700;font-size:13px;min-width:18px;text-align:center;line-height:22px;
    border-radius:5px;background:var(--mf,#b9ad98);color:var(--mt,#fff);padding:0 5px}
  .nv3felder input{font:inherit;font-size:14px;padding:2px 6px;border:1.6px solid var(--mf,var(--linie));
    border-radius:6px;background:var(--mg,#fff);color:var(--tinte);box-sizing:border-box;width:4.6em}
  .nv3felder input:focus{outline:2px solid var(--mf,var(--akzent));outline-offset:0;background:#fff}
  .nv3felder input.gr{width:4.2em}
  .nv3felder .op{color:var(--tinte);font-family:var(--druck);white-space:nowrap}
  .nv3felder .zart{color:var(--matt);font-size:12px}
  .nv3q{font:inherit;font-size:12px;font-weight:700;width:22px;height:22px;padding:0;border-radius:50%;
    border:1.3px solid #c9bda8;background:#fff;color:var(--matt);cursor:pointer;line-height:1}
  .nv3q[aria-pressed=true]{background:var(--mf,var(--akzent));border-color:var(--mf,var(--akzent));color:var(--mt,#fff)}
  .nv3frage{display:inline-block;min-width:2.2em;text-align:center;font-weight:700;font-size:14px;
    padding:1px 6px;border:1.6px solid var(--mf,var(--akzent));border-radius:6px;background:var(--mg,#fff7ec);color:var(--tinte)}
  .nv3wahl{display:inline-flex;border:1.5px solid var(--linie);border-radius:8px;overflow:hidden;background:#fff}
  .nv3wahl button{font:inherit;font-size:13px;padding:3px 10px;border:none;background:#fff;color:var(--tinte);cursor:pointer}
  .nv3wahl button + button{border-left:1.5px solid var(--linie)}
  .nv3wahl button[aria-pressed=true]{background:var(--akzent);color:#fff}
  .nv3f.ok,.nv3wahl.ok,.nv3cwahl.ok{box-shadow:0 0 0 2px var(--richtig)}
  .nv3f.falsch,.nv3wahl.falsch,.nv3cwahl.falsch{box-shadow:0 0 0 2px var(--falsch)}
  .nv3felder button:disabled,.nv3felder input:disabled,.nv3cwahl button:disabled{cursor:default;opacity:1}
  .nv3zart{color:var(--matt);font-size:12.5px}
  .nv3rechts{padding:26px 12px 14px;font-size:14px}
  .nv3svg{width:100%;max-width:640px;height:auto;display:block;background:#fffefb;
    border:1px solid var(--linie);border-radius:10px}
  .nv3cwahl{display:inline-flex;flex-wrap:wrap;gap:6px;border-radius:8px;padding:1px;margin:2px 0 4px}
  .nv3cwahl button{font:inherit;font-size:15px;font-family:var(--druck);padding:3px 12px;border:1.5px solid var(--linie);
    border-radius:8px;background:#fff;color:var(--tinte);cursor:pointer}
  .nv3cwahl button[aria-pressed=true]{background:var(--akzent);border-color:var(--akzent);color:#fff}
  .nv3glk{background:#fffefb;border:1px solid var(--linie);border-radius:10px;padding:10px 12px;
    text-align:center;font-family:var(--druck);font-size:19px;line-height:1.45;color:var(--tinte);max-width:640px}
  .nv3glk .haupt .t{display:inline-block;white-space:nowrap}
  .nv3glk .kasten{display:inline-grid;grid-template-columns:auto auto;column-gap:.3em;text-align:left;
    margin-top:8px;padding:6px 14px;background:#f3ecf5;border:1px solid var(--linie);border-radius:6px;font-size:17px}
  .nv3glk .kasten .folge{grid-column:1 / -1}
  .nv3glk .kasten .l{text-align:right;color:var(--akzent);white-space:nowrap}
  .nv3glk .kasten .r{color:var(--akzent)}
  .nv3glk .kasten.mitte{display:inline-block;text-align:center;color:var(--akzent)}
  .nv3glk.leer{font-family:inherit;font-size:13.5px;color:var(--matt);text-align:left}
  .nv3mit{font-size:13px;color:var(--matt);margin:4px 0 6px}
  .nv3urteil{margin:8px 0;padding:0;list-style:none;font-size:13.5px}
  .nv3urteil li{padding:2px 0}
  .nv3urteil .ja{color:var(--richtig)} .nv3urteil .nein{color:var(--falsch)}
  .nv3ergebnis{background:#f5eff7;border:1.5px solid var(--akzent);border-radius:10px;padding:9px 11px;margin:8px 0;font-size:14px;line-height:1.5}
  .nv3ergebnis .gross{font-size:19px;font-weight:600;color:var(--akzent)}
  .nv3deutung{margin-top:6px;font-size:13.5px}
  /* Bild bauen (Nachtrag 2026-10-16) */
  .nv3bau{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;margin:2px 0 6px}
  .nv3bau .nv3wahl button{font-size:13px;padding:3px 9px}
  .nv3bau .zart{color:var(--matt);font-size:12px}
  .nv3wrap{position:relative;max-width:640px}
  .nv3wrap .ber{cursor:pointer}
  .nv3wrap .ber:hover{fill:rgba(152,103,165,.10)}
  .nv3wrap .ziel{cursor:pointer}
  .nv3wrap .ziel:hover .hit{fill:rgba(152,103,165,.14)}
  .nv3pz{position:absolute;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:1px;
    font-size:13px;color:var(--tinte);background:rgba(255,254,251,.85);border-radius:6px;padding:0 2px}
  .nv3pz input{font:inherit;font-size:13px;width:3.3em;padding:1px 4px;border:1.5px solid #c9bda8;border-radius:5px;
    background:#fff;color:var(--tinte);text-align:right;box-sizing:border-box}
  .nv3pz.schr input{border-color:var(--akzent);background:#f7f0f9}
  .nv3pz input:focus{outline:2px solid var(--akzent);outline-offset:0}
  .nv3menue{position:absolute;z-index:5;background:#fff;border:1px solid var(--linie);border-radius:8px;
    box-shadow:0 3px 10px rgba(0,0,0,.15);padding:4px;display:flex;flex-direction:column;gap:2px;min-width:12em}
  .nv3menue button{font:inherit;font-size:13px;text-align:left;padding:4px 8px;border:none;background:#fff;
    border-radius:5px;cursor:pointer;color:var(--tinte)}
  .nv3menue button:hover{background:#f3ecf5}
  .nv3bildknoepfe{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:6px 0 2px}
  .nv3hilfe{display:inline-block;font-size:11.5px;font-weight:400;color:var(--matt);border:1px solid var(--linie);
    border-radius:9px;padding:0 7px;margin-left:6px;vertical-align:1px}
  .nv3warte{color:var(--matt);font-size:13px;font-style:italic}
  /* mu und sigma selbst, Beschriftung, Gleichung aufstellen (Nachtrag 2026-10-16) */
  .nvm-r{--mf:#6c6357;--mg:#fff;--mt:#fff}
  .nv3felder input.term,.nv3glbau input.term,.nv3lab input{font-family:var(--druck)}
  .nv3felder input.term{width:6em}
  .nv3ins{display:inline-flex;align-items:center;gap:4px}
  .nv3ins button{font:inherit;font-size:14px;min-width:28px;height:26px;padding:0 6px;border:1.3px solid var(--linie);
    border-radius:6px;background:#fff;color:var(--tinte);cursor:pointer}
  .nv3lab{position:absolute;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:3px;
    font-size:13px;color:var(--akzent);font-weight:600;background:rgba(255,254,251,.9);border-radius:6px;padding:0 2px;white-space:nowrap}
  .nv3lab input{font-size:13px;padding:1px 4px;border:1.5px solid var(--akzent);border-radius:5px;background:#fff;
    color:var(--tinte);box-sizing:border-box;width:3.4em}
  .nv3lab input:focus{outline:2px solid var(--akzent);outline-offset:0}
  .nv3formwahl{flex-wrap:wrap;margin:2px 0 6px}
  .nv3formwahl button{font-family:var(--druck);font-size:15px;padding:3px 10px}
  .nv3glbau{background:#fffefb;border:1px solid var(--linie);border-radius:10px;padding:8px 10px;max-width:640px;
    display:flex;flex-direction:column;gap:6px}
  .nv3glzeile{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:2px;
    font-family:var(--druck);font-size:19px;color:var(--tinte)}
  .nv3glzeile .t{white-space:pre}
  .nv3glzeile .nv3f{padding:1px}
  .nv3glbau input.term{font-size:16px;padding:2px 5px;border:1.6px solid var(--akzent);border-radius:6px;
    background:#f7f0f9;color:var(--tinte);box-sizing:border-box;width:3.4em;text-align:center}
  .nv3glbau input.term:focus{outline:2px solid var(--akzent);outline-offset:0;background:#fff}
  .nv3ergebnis .nv3glk{margin:0 0 8px;background:#fff}
  /* NEU (FASSUNG CHILBI 2): gefuehrtes Beispiel, Ergebnisfeld, Rechenschritte */
  .nv3fuehr{display:flex;flex-wrap:wrap;align-items:center;gap:3px 10px;margin:4px 0 8px;padding:6px 10px;
    border:1.5px dashed var(--akzent);border-radius:10px;background:#fbf7fc;font-size:13.5px;line-height:1.45}
  .nv3fuehr .kopf{flex-basis:100%;font-weight:700;color:var(--akzent);font-size:12.5px}
  .nv3fuehr .satz{flex:1 1 16em;color:var(--tinte)}
  .nv3fuehr .nv3zeigen{flex:0 0 auto;font-size:13px;padding:3px 12px}
  .nv3felder > .nv3fuehr{margin:0 0 2px}
  .nv3okzeile{color:var(--richtig);font-weight:600;margin-bottom:4px}
  .nv3ergebnis input.term{font-family:var(--druck);width:4.5em}
  .nv3rs{background:#fff;border:1px solid var(--linie);border-radius:10px;padding:8px 12px;margin:4px 0 8px;
    font-family:var(--druck);font-size:16px;line-height:1.45;color:var(--tinte);text-align:center;max-width:640px}
  .nv3rs .haupt{font-size:18px;margin-bottom:4px}
  .nv3rs .satz{font-family:var(--text, inherit);font-size:13.5px;color:var(--matt);margin:6px 0 2px;text-align:left}
  .nv3rs .abstand{margin:6px auto;padding:6px 10px;background:#f3ecf5;border:1px solid var(--linie);border-radius:6px;max-width:420px}
  .nv3rs .abstand p{margin:0 0 2px;font-size:14.5px}
  .nv3strahl{width:100%;max-width:340px;height:auto;display:block;margin:0 auto}
  .nv3rs .kasten{display:inline-grid;grid-template-columns:auto auto;column-gap:.3em;text-align:left;
    margin:4px 0;padding:4px 12px;background:#f3ecf5;border:1px solid var(--linie);border-radius:6px}
  .nv3rs .kasten .l{text-align:right;color:var(--akzent);white-space:nowrap}
  .nv3rs .kasten .r{color:var(--akzent)}
  .nv3rs .erg{font-size:19px;font-weight:600;color:var(--akzent);margin-top:2px}
  @media (max-width:900px),(max-height:640px){
    .nv3pz input{width:2.9em;font-size:12px}
    .nv3lab,.nv3lab input{font-size:12px}
    .nv3glzeile{font-size:16px} .nv3glbau input.term{font-size:14px}
    .nv3formwahl button{font-size:13px;padding:2px 7px}
    .nv3bau .nv3wahl button{font-size:12px;padding:2px 7px}}
  `;
  document.head.appendChild(s);
})();

const nv3Esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ── Zahlen lesen und schreiben (dieselben Regeln wie inhalte.py) ── */
function nv3Zahl(roh){
  let t = String(roh ?? '').trim();
  if (!t) return {leer: true};
  if (t === '?') return {frage: true};
  t = t.replace(/\s+/g, '').replace(/,/g, '.');
  let pro = false;
  if (t.endsWith('%')){ pro = true; t = t.slice(0, -1); }
  const br = t.match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  let w;
  if (br) w = parseFloat(br[1]) / parseFloat(br[2]);
  else if (/^\d*\.?\d+$/.test(t)) w = parseFloat(t);
  else return {unlesbar: true};
  return {w, pro};
}
const nv3Wert = r => r.w === undefined ? NaN : (r.pro ? r.w / 100 : r.w);       // p, Grenze
const nv3Prozent = r => r.w === undefined ? NaN : (r.pro || r.w > 1 ? r.w : r.w * 100);  // Sicherheit
const nv3Num = v => typeof v === 'number' && !isNaN(v);
const nv3Gleich = (a, b, tol) => nv3Num(a) && nv3Num(b) && Math.abs(a - b) < (tol || 1e-9);
const nv3Z = x => Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : x.toFixed(2);
const nv3Dez = x => x.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
const nv3Pz = x => String(Math.round(x * 10) / 10);
function nv3Bruch(p){
  const m = Math.round(1 / p);
  return (m >= 3 && m <= 12 && Math.abs(p * m - 1) < 0.003 && Math.abs(p - Math.round(p * 100) / 100) > 1e-9) ? m : null;
}

/* Die Eintraege, gelesen: Zahl, «?» (gesucht) oder NaN (fehlt/unlesbar) */
function nv3Lesen(z){
  const rn = nv3Zahl(z.n);
  return {
    n: z.frage === 'n' ? '?' : (rn.w !== undefined && !rn.pro ? rn.w : NaN),
    p: z.frage === 'p' ? '?' : nv3Wert(nv3Zahl(z.p)),
    k: z.frage === 'g' ? '?' : nv3Wert(nv3Zahl(z.k)),
    S: z.frage === 's' ? '?' : nv3Prozent(nv3Zahl(z.s)),
  };
}
/* mu und sigma als Text, wie inhalte.mu_sigma_text() */
function nv3MuSigma(L){
  const pOk = nv3Num(L.p) && L.p > 0 && L.p < 1;
  if (nv3Num(L.n) && pOk){
    const mu = L.n * L.p, s = Math.sqrt(L.n * L.p * (1 - L.p));
    return {mu: nv3Z(mu), s: nv3Z(s), muW: mu, sW: s};
  }
  if (L.n === '?' && pOk){
    const m = nv3Bruch(L.p);
    return m ? {mu: `n/${m}`, s: `√(${m - 1}n/${m * m})`}
             : {mu: `${nv3Dez(L.p)}n`, s: `√(${nv3Dez(L.p * (1 - L.p))}n)`};
  }
  if (L.p === '?' && nv3Num(L.n)) return {mu: `${nv3Z(L.n)}p`, s: `√(${nv3Z(L.n)}p(1 − p))`};
  return {mu: 'μ', s: 'σ', offen: true};
}
const nv3Unbekannt = z => z.frage === 'n' || z.frage === 'p';

/* ── Terme lesen: mu, sigma, Beschriftung im Bild, Platzhalter der
   Gleichung (Nachtrag 2026-10-16, «mu und sigma selbst») ──
   Zahlen (Punkt oder Komma), n und p, + − · / ^ ², √ bzw. «wurzel» oder
   «sqrt», Klammern, «%» hinter einer Zahl. Der Malpunkt darf fehlen
   (0.7n, 190p(1 − p)). √ ohne Klammer gilt fuer die direkt folgenden
   Faktoren: √0.09n = √(0.09n). Liefert {f: env -> Zahl, vars} oder
   {leer} bzw. {fehler}. */
function nv3Term(roh){
  const s = String(roh ?? '').toLowerCase()
    .replace(/wurzel|sqrt/g, '√').replace(/[−–—]/g, '-').replace(/[·⋅×*•∙]/g, '*')
    .replace(/[:÷]/g, '/').replace(/[\[{]/g, '(').replace(/[\]}]/g, ')')
    .replace(/,/g, '.').replace(/²/g, '^2').replace(/\s+/g, '');
  if (!s) return {leer: true};
  const tok = [], re = /(\d*\.\d+|\d+\.?)|([np])|([-+*/^()√%])/y;
  while (re.lastIndex < s.length){
    const m = re.exec(s);
    if (!m) return {fehler: true};
    tok.push(m[1] !== undefined ? {z: parseFloat(m[1])} : m[2] ? {v: m[2]} : {o: m[3]});
  }
  let i = 0;
  const vars = new Set();
  const ist = o => tok[i] && tok[i].o === o;
  const faktor = () => tok[i] && (tok[i].z !== undefined || tok[i].v);
  const faengtAn = () => faktor() || ist('(') || ist('√');
  function summe(){
    let f = produkt();
    while (ist('+') || ist('-')){
      const o = tok[i++].o, a = f, g = produkt();
      f = o === '+' ? e => a(e) + g(e) : e => a(e) - g(e);
    }
    return f;
  }
  function produkt(){
    let f = vorzeichen();
    for (;;){
      let o;
      if (ist('*') || ist('/')) o = tok[i++].o;
      else if (faengtAn()) o = '*';
      else break;
      const a = f, g = vorzeichen();
      f = o === '*' ? e => a(e) * g(e) : e => a(e) / g(e);
    }
    return f;
  }
  function vorzeichen(){
    if (ist('-')){ i++; const g = vorzeichen(); return e => -g(e); }
    if (ist('+')){ i++; return vorzeichen(); }
    return potenz();
  }
  function potenz(){
    const b = atom();
    if (ist('^')){ i++; const x = vorzeichen(); return e => Math.pow(b(e), x(e)); }
    return b;
  }
  function atom(){
    const t = tok[i++];
    if (!t) throw 0;
    if (t.z !== undefined){
      if (ist('%')){ i++; return () => t.z / 100; }
      return () => t.z;
    }
    if (t.v){ vars.add(t.v); return e => e[t.v]; }
    if (t.o === '('){ const f = summe(); if (!ist(')')) throw 0; i++; return f; }
    if (t.o === '√'){
      let f = potenz();
      while (faktor()){ const a = f, g = potenz(); f = e => a(e) * g(e); }
      const a = f;
      return e => Math.sqrt(a(e));
    }
    throw 0;
  }
  try {
    const f = summe();
    return i === tok.length ? {f, vars} : {fehler: true};
  } catch(_) { return {fehler: true}; }
}
/* Eine Eingabe mit Rechnung («100 · 0.25 = 25», «≈ 4.33»): die Teile
   zwischen = bzw. ≈; vorn darf «μ =» bzw. «σ ≈» stehen. */
function nv3Teile(roh){
  return String(roh ?? '').trim().replace(/^[μσ]\s*/, '').replace(/^[=≈]\s*/, '')
    .split(/[=≈]/).map(x => x.trim()).filter(x => x);
}
/* Gleichwertigkeit: Terme werden an Probestellen ausgewertet. Mit der
   Unbekannten genuegt relativ 2e-3 (wer 1/6 als 0.1667 schreibt, liegt
   darin); Zahlen duerfen auf zwei Stellen gerundet sein. */
const NV3_PROBE = {n: [37, 150, 912], p: [0.13, 0.42, 0.77], '': [0]};
function nv3Passt(f, soll, frei){
  let ok = true, nah = true;
  for (const x of NV3_PROBE[frei || '']){
    const e = frei ? {[frei]: x} : {}, a = f(e), b = soll(e);
    if (!isFinite(a)) return 'falsch';
    const d = Math.abs(a - b);
    if (d > (frei ? 2e-3 * Math.abs(b) : Math.max(0.0051, 1e-4 * Math.abs(b)))) ok = false;
    if (d > 0.03 * Math.abs(b) + 1e-9) nah = false;
  }
  return ok ? 'ok' : (nah ? 'rund' : 'falsch');
}
/* leer | unlesbar | fremd (v: eine bekannte Groesse als Buchstabe) |
   zahl (Zahl, wo ein Term in der Unbekannten hingehoert) | ok | rund | falsch */
function nv3Vergleich(roh, soll, frei){
  const r = nv3Term(roh);
  if (r.leer) return {art: 'leer'};
  if (r.fehler) return {art: 'unlesbar'};
  const fremd = [...r.vars].find(v => v !== frei);
  if (fremd) return {art: 'fremd', v: fremd};
  if (frei && !r.vars.has(frei)) return {art: 'zahl', f: r.f};
  return {art: nv3Passt(r.f, soll, frei), f: r.f};
}
/* Das Soll aus den Generator-Angaben: mu und sigma als Funktion der
   Unbekannten, dazu typische Verwechslungen fuer die Begruendung */
function nv3Soll(A){
  const frei = A.n === null ? 'n' : (A.p === null ? 'p' : '');
  const N = e => A.n === null ? e.n : A.n, P = e => A.p === null ? e.p : A.p;
  return {frei,
    mu: e => N(e) * P(e), s: e => Math.sqrt(N(e) * P(e) * (1 - P(e))),
    varianz: e => N(e) * P(e) * (1 - P(e)), gegen: e => N(e) * (1 - P(e)),
    ohne: e => Math.sqrt(N(e) * P(e))};
}
/* mu oder sigma pruefen, mit Rechnung und Begruendung: [ok, Satz] */
function nv3PruefeMuS(roh, welche, A, name){
  const S = nv3Soll(A), soll = S[welche], frei = S.frei;
  const teile = nv3Teile(roh);
  if (!teile.length) return [false, `${name} fehlt noch.`];
  const v = nv3Vergleich(teile[teile.length - 1], soll, frei);
  if (v.art === 'ok') return [true, `${name} stimmt.`];
  if (v.art === 'unlesbar') return [false, `${name}: Das kann ich nicht lesen. Schreiben Sie z. B. «100 · 0.25», «0.7 · n» oder «√(n · 0.7 · 0.3)».`];
  if (v.art === 'fremd') return [false, `${name}: ${v.v} ist bekannt — setzen Sie die Zahl für ${v.v} ein.`];
  if (v.art === 'zahl') return [false, `${name} ist hier ein Term in ${frei}, denn ${frei} ist gesucht.`];
  if (v.art === 'rund') return [false, frei
    ? `${name} liegt knapp daneben. Runden Sie die Zahlen im Term nicht, schreiben Sie z. B. 1/6 statt 0.17.`
    : `${name} liegt knapp daneben. Rechnen Sie genau und runden Sie erst am Schluss, auf zwei Stellen.`];
  const vorher = teile.slice(0, -1).some(x => nv3Vergleich(x, soll, frei).art === 'ok');
  if (vorher) return [false, `${name}: Die Rechnung stimmt, das Ergebnis am Schluss nicht.`];
  const ist = g => v.f && nv3Passt(v.f, g, frei) === 'ok';
  if (welche === 'mu'){
    if (ist(S.gegen)) return [false, `${name}: Das ist n · (1 − p). μ = n · p zählt, wonach gefragt ist.`];
    if (ist(S.s)) return [false, `${name}: Das ist σ, nicht μ.`];
    return [false, `${name} stimmt noch nicht: μ = n · p.`];
  }
  if (ist(S.varianz)) return [false, `${name}: Das ist n · p · (1 − p). σ ist die Wurzel daraus.`];
  if (ist(S.ohne)) return [false, `${name}: Es fehlt der Faktor (1 − p), σ = √(n · p · (1 − p)).`];
  if (ist(S.mu)) return [false, `${name}: Das ist μ, nicht σ.`];
  return [false, `${name} stimmt noch nicht: σ = √(n · p · (1 − p)).`];
}
/* Eine gegebene Grenze (Beschriftung im Bild, Platzhalter der Gleichung) */
function nv3PruefeGrenzwert(roh, t, name){
  const A = t.angaben, r = nv3Term(roh);
  if (r.leer) return [false, `${name} fehlt noch.`];
  if (r.fehler || r.vars.size) return [false, `${name}: Hier gehört die Zahl aus der Aufgabe hin.`];
  const w = r.f({});
  if (nv3Gleich(w, A.grenze, 1e-6)) return [true, `${name} stimmt.`];
  const h = t.hinweise_k.find(([x]) => nv3Gleich(x, w, 1e-6));
  if (h) return [false, `${name}: ${h[1]}`];
  if (A.n !== null && nv3Gleich(w, A.n)) return [false, `${name}: ${A.n} ist n, nicht die Grenze.`];
  if (nv3Gleich(w, A.sicherheit) || nv3Gleich(w, A.sicherheit / 100))
    return [false, `${name}: ${A.sicherheit} % ist die Sicherheit, nicht die Grenze.`];
  return [false, `${name} stimmt noch nicht.`];
}

/* ── Die Gleichung selbst aufstellen ──
   Drei Formen; die Schablone setzt X fest ein, wenn die Grenze gesucht
   ist. Ist n oder p gesucht, steht die gegebene Grenze als Platzhalter
   da, so wie der Generator schreibt: |k − μ| ≤ c · σ, μ − c · σ ≥ k bzw.
   μ + c · σ ≤ k. Platzhalter: $g (Grenze), $mu, $c, $s. */
const NV3FORM = [
  {k: 'betrag', name: '|X − μ| ≤ c · σ'},
  {k: 'unten', name: 'X ≥ μ − c · σ'},
  {k: 'oben', name: 'X ≤ μ + c · σ'},
];
const NV3PLATZ = {g: 'Grenze', mu: 'μ', c: 'c', s: 'σ'};
function nv3Schablone(form, unb){
  if (form === 'betrag') return unb ? ['|', '$g', ' − ', '$mu', '| ≤ ', '$c', ' · ', '$s']
                                    : ['|X − ', '$mu', '| ≤ ', '$c', ' · ', '$s'];
  const u = form === 'unten', vz = u ? ' − ' : ' + ', rel = u ? ' ≥ ' : ' ≤ ';
  return unb ? ['$mu', vz, '$c', ' · ', '$s', rel, '$g'] : ['X' + rel, '$mu', vz, '$c', ' · ', '$s'];
}
/* Die eigene Gleichung als Text (Mitnehmen, Kontrolle beim Laden) */
function nv3GlText(z){
  if (!z.form) return '';
  return nv3Schablone(z.form, nv3Unbekannt(z))
    .map(x => x[0] === '$' ? (String((z.gl || {})[x.slice(1)] || '').trim() || '…') : x).join('');
}

/* Die Gleichungskarte, im Layout von Etappe 1 */
function nv3GlHtml(g){
  if (g.fehlt) return `<div class="nv3glk leer">${g.fehlt}</div>`;
  const haupt = g.zeilen.filter(z => z[1] === 'haupt'), folge = g.zeilen.filter(z => z[1] === 'folge'),
        grenze = g.zeilen.filter(z => z[1] === 'grenze');
  const teile = s => {
    const m = /^(.*?) ([≤≥]) (.*)$/.exec(s);
    return m ? `<span class="t">${nv3Esc(m[1])}</span> <span class="t">${m[2]} ${nv3Esc(m[3])}</span>`
             : `<span class="t">${nv3Esc(s)}</span>`;
  };
  let h = haupt.map(z => `<div class="haupt">${teile(z[0])}</div>`).join('');
  if (grenze.length){
    h += `<div class="kasten">${folge.map(z => `<div class="folge">${nv3Esc(z[0])}</div>`).join('')}`
       + grenze.map(z => { const i = z[0].indexOf(' = ');
           return `<span class="l">${nv3Esc(z[0].slice(0, i))} =</span><span class="r">${nv3Esc(z[0].slice(i + 3))}</span>`; }).join('')
       + '</div>';
  } else if (folge.length){
    h += `<div><div class="kasten mitte">${folge.map(z => nv3Esc(z[0])).join('<br>')}</div></div>`;
  }
  return `<div class="nv3glk">${h}</div>`;
}

/* ── Das Bild aus den Angaben. EINE Geometrie: D.e2.glocke ── */
function nv3Phi(x){
  const t = 1 / (1 + 0.3275911 * Math.abs(x) / Math.SQRT2);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x / 2);
  return x >= 0 ? (1 + y) / 2 : (1 - y) / 2;
}
function nv3InvPhi(q){
  let lo = -6, hi = 6;
  for (let i = 0; i < 60; i++){ const m = (lo + hi) / 2; if (nv3Phi(m) < q) lo = m; else hi = m; }
  return (lo + hi) / 2;
}
/* Wo die Grenze im Bild liegt, in sigma - aus der Sicherheit, nicht aus c */
function nv3Lage(seiten, S){
  if (!nv3Num(S) || S <= 50 || S >= 100) return seiten === 'zwei' ? 1.96 : 1.64;
  const z = seiten === 'zwei' ? nv3InvPhi((1 + S / 100) / 2) : nv3InvPhi(S / 100);
  return Math.max(0.35, Math.min(3.2, z));
}

const NV3_VB = [600, 250];
function nv3Bild(z, A){
  const X0 = 30, X1 = 570, Y0 = 182, H = 142;
  const zmin = NV3.zmin, zmax = NV3.zmax;
  const zx = v => X0 + (v - zmin) / (zmax - zmin) * (X1 - X0);
  const hy = h => Y0 - h * H;
  const hoehe = v => Math.exp(-v * v / 2);
  const F = "font-family=\"'Fira Sans','Segoe UI',Helvetica,Arial,sans-serif\"";
  const txt = (x, y, s, att) => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" ${F} ${att || ''}>${nv3Esc(s)}</text>`;
  const AKZ = '#9867A5', TIN = '#2d2924', MAT = '#6c6357', FL = '#d9c6df';
  const L = nv3Lesen(z), M = nv3MuSigma(L);
  const S = nv3Num(L.S) && L.S > 50 && L.S < 100 ? L.S : null;
  const prozent = L.S === '?' ? '? %' : (S === null ? '… %' : nv3Pz(S) + ' %');
  const rest = S === null ? '… %' : nv3Pz(z.seiten === 'zwei' ? (100 - S) / 2 : 100 - S) + ' %';
  const leerRest = S === null;
  const symbol = L.n === '?' ? 'n' : 'p';
  const kt = nv3Num(L.k) ? nv3Z(L.k) : 'k';
  let h = '';
  const flaeche = (za, zb, v, st) => {
    v = v || 0; st = st || 1;
    const pts = NV3.glocke.filter(([q]) => q * st + v >= za && q * st + v <= zb);
    if (!pts.length) return '';
    const yy = q => hy(hoehe((q - v) / st));
    return `<path d="M${zx(za).toFixed(1)},${Y0} L${zx(za).toFixed(1)},${yy(za).toFixed(1)} `
      + pts.map(([q, hh]) => `L${zx(q * st + v).toFixed(1)},${hy(hh).toFixed(1)}`).join(' ')
      + ` L${zx(zb).toFixed(1)},${yy(zb).toFixed(1)} L${zx(zb).toFixed(1)},${Y0} Z" fill="${FL}" stroke="none"/>`;
  };
  const kurve = (v, st, farbe, lw) => {
    v = v || 0; st = st || 1;
    return `<path d="${NV3.glocke.filter(([q]) => q * st + v >= zmin && q * st + v <= zmax)
      .map(([q, hh], i) => (i ? 'L' : 'M') + zx(q * st + v).toFixed(1) + ',' + hy(hh).toFixed(1)).join(' ')}"
      fill="none" stroke="${farbe || TIN}" stroke-width="${lw || 2.4}" stroke-linejoin="round"/>`;
  };
  const zeiger = (zt, zs, hsp, yt) => {
    h += `<line x1="${zx(zt).toFixed(1)}" y1="${(yt + 4).toFixed(1)}" x2="${zx(zs).toFixed(1)}" y2="${hy(hsp).toFixed(1)}" stroke="${MAT}" stroke-width="1"/>`;
    h += txt(zx(zt), yt, rest, `font-size="19" font-weight="600" fill="${leerRest ? '#b9ad99' : MAT}" text-anchor="middle" paint-order="stroke" stroke="#fffefb" stroke-width="5"`);
  };
  const ACC = `font-size="22" font-weight="700" fill="${AKZ}"`;
  h += `<line x1="${X0 - 8}" y1="${Y0}" x2="${X1 + 8}" y2="${Y0}" stroke="${MAT}" stroke-width="1.4"/>`;
  // mu wie im Bild beschriftet (Nachtrag 2026-10-16), sonst aus den Feldern
  const muText = (z.bild && String(z.bild.mu || '').trim()) || M.mu;
  const muSchrift = muText === 'μ' ? 'μ' : 'μ = ' + muText;

  // Zweiseitig mit gesuchtem n oder p: mehrere Kandidaten, k fest (wie
  // das Bild zu «Partei A» in Etappe 1)
  if (z.seiten === 'zwei' && nv3Unbekannt(z)){
    const st = 0.42, c = nv3Lage('zwei', S);
    h += flaeche(-c * st, c * st, 0, st);
    [-2.35, 2.35].forEach(v => { h += kurve(v, st, MAT, 1.4); });
    h += kurve(0, st, TIN, 2.2);
    // FEHLERBEHOBEN: Beim Linkshaender (zweiseitig, p gesucht) fehlte nach
    // dem Pruefen die Beschriftung von mu. Ursache: Dieser Zweig kehrt
    // vorzeitig zurueck, die mu-Linie und «μ = …» standen nur im
    // allgemeinen Teil weiter unten. Jetzt auch hier, links neben «k = …»
    // (rechtsbuendig, damit sich die beiden nicht ueberdecken).
    h += `<line x1="${zx(0)}" y1="${Y0}" x2="${zx(0)}" y2="${hy(1)}" stroke="${MAT}" stroke-width="1.2" stroke-dasharray="4 4"/>`;
    h += txt(zx(0.62) - 30, Y0 + 20, muSchrift, `font-size="16" fill="${TIN}" text-anchor="end"`);
    h += `<line x1="${zx(0.62)}" y1="${Y0}" x2="${zx(0.62)}" y2="${hy(0.92)}" stroke="${AKZ}" stroke-width="2.4"/>`;
    h += txt(zx(0.62), Y0 + 20, `k = ${kt}`, `font-size="15" font-weight="600" fill="${AKZ}" text-anchor="middle"`);
    h += txt(zx(0), hy(1.06), prozent, `font-size="20" font-weight="600" fill="${TIN}" text-anchor="middle"`);
    [-1, 1].forEach(sei => {
      const zs = sei * (c + 0.45) * st;
      zeiger(sei * 1.3, zs, hoehe(c + 0.45) * 0.45, hy(0.55));
    });
    h += txt(zx(-2.35), hy(1.07), A ? A.folge : `${symbol} ?`, ACC + ' text-anchor="middle"');
    return h;
  }

  const seiten = z.seiten, lage = z.lage;
  const fertig = seiten === 'zwei' || (seiten === 'ein' && lage);
  const c = nv3Lage(seiten, S);
  let linien = [], offen = [], zproz = 0;
  if (fertig){
    if (seiten === 'zwei'){ h += flaeche(-c, c); linien = [-c, c]; offen = [-1, 1]; }
    else if (lage === 'unten'){ h += flaeche(-c, zmax); linien = [-c]; offen = [-1]; zproz = 0.55; }
    else { h += flaeche(zmin, c); linien = [c]; offen = [1]; zproz = -0.55; }
  }
  h += kurve();
  h += `<line x1="${zx(0)}" y1="${Y0}" x2="${zx(0)}" y2="${hy(1)}" stroke="${MAT}" stroke-width="1.2" stroke-dasharray="4 4"/>`;
  h += txt(zx(0), Y0 + 20, muSchrift, `font-size="16" fill="${TIN}" text-anchor="middle"`);
  if (!fertig){
    h += txt(X1, 24, seiten === 'ein' ? 'Grenze unten oder oben?' : 'einseitig oder zweiseitig?',
             `font-size="14" fill="#9a8f7d" text-anchor="end"`);
  }
  linien.forEach(v => {
    h += `<line x1="${zx(v).toFixed(1)}" y1="${Y0}" x2="${zx(v).toFixed(1)}" y2="${(hy(hoehe(v)) - 16).toFixed(1)}" stroke="${TIN}" stroke-width="2.6"/>`;
  });
  if (fertig){
    h += txt(zx(zproz), hy(0.34), prozent, `font-size="25" font-weight="600" fill="${TIN}" text-anchor="middle"`);
    offen.forEach(sei => {
      const zt = sei * Math.min(c + 0.95, 3.0), zs = sei * (c + 0.45);
      zeiger(zt, zs, hoehe(zs) * 0.45, hy(0.42));
    });
  }
  // Die Grenze(n): gesucht («a ?», «k ?»), gegeben («k = 10») oder eingetragen
  linien.forEach((v, i) => {
    const name = seiten === 'zwei' ? (v < 0 ? 'a' : 'b') : 'k';
    const nah = Math.abs(v) < 1.2;
    const anker = nah ? (v < 0 ? 'end' : 'start') : 'middle';
    const x = zx(v) + (nah ? (v < 0 ? 6 : -6) : 0);
    if (z.frage === 'g'){
      const s = A && A.werte[i] ? A.werte[i] : `${name} ?`;
      h += txt(x, Y0 + 40, s, (A ? `font-size="16" font-weight="700" fill="${AKZ}"` : ACC) + ` text-anchor="${anker}"`);
    } else if (seiten === 'ein' && nv3Num(L.k)){
      h += txt(x, Y0 + 20, `k = ${kt}`, `font-size="15" font-weight="600" fill="${AKZ}" text-anchor="${anker}"`);
    } else if (seiten === 'zwei' && !nv3Unbekannt(z)){
      const w = nv3Wert(nv3Zahl(z[name]));
      if (nv3Num(w)) h += txt(x, Y0 + 20, `${name} = ${nv3Z(w)}`, `font-size="15" font-weight="600" fill="${AKZ}" text-anchor="${anker}"`);
    }
  });
  if (nv3Unbekannt(z)) h += txt(zx(0.72), hy(0.9), A ? A.folge : `${symbol} ?`, ACC + ' text-anchor="start"');
  return h;
}

/* ── Das Bild selbst bauen (Nachtrag 2026-10-16) ──
   Feste Linien bei +-NV3_POS sigma; Flaechen l / m / r (bei einer Grenze
   nur l und r). Dieselbe Geometrie wie nv3Bild. */
const NV3_POS = 1.6;
const NV3_GEO = {X0: 30, X1: 570, Y0: 182, H: 142};
const nv3Zx = v => NV3_GEO.X0 + (v - NV3.zmin) / (NV3.zmax - NV3.zmin) * (NV3_GEO.X1 - NV3_GEO.X0);
const nv3Hy = h => NV3_GEO.Y0 - h * NV3_GEO.H;
const nv3Hoehe = v => Math.exp(-v * v / 2);
function nv3BildLeer(){
  return {gr: '', seite: '', schr: {l: false, m: false, r: false}, proz: {l: '', m: '', r: ''}, frage: null,
          mu: '', lab: {a: '', b: '', k: ''}};
}
/* Das richtige Bild aus den Generator-Angaben */
function nv3BildSoll(t){
  const A = t.angaben, b = nv3BildLeer(), S = A.sicherheit;
  b.gr = A.seiten;
  if (A.seiten === 'zwei'){
    b.schr.m = true; b.proz = {l: nv3Pz((100 - S) / 2), m: String(S), r: nv3Pz((100 - S) / 2)};
  } else {
    b.seite = A.lage === 'unten' ? 'links' : 'rechts';
    const sch = A.lage === 'unten' ? 'r' : 'l', off = sch === 'r' ? 'l' : 'r';
    b.schr[sch] = true; b.proz[sch] = String(S); b.proz[off] = nv3Pz(100 - S);
  }
  b.frage = {g: 'g', p: 'mu', n: 'breite'}[A.frage] || null;
  // Beschriftung: mu immer; die Grenze nur, wenn sie gegeben ist und
  // allein steht (einseitig mit gesuchtem n oder p)
  b.mu = A.mu_t;
  if (A.seiten === 'ein' && A.frage !== 'g') b.lab.k = nv3Z(A.grenze);
  return b;
}
function nv3Linien(b){
  if (b.gr === 'zwei') return [-NV3_POS, NV3_POS];
  if (b.gr === 'ein' && b.seite) return [b.seite === 'links' ? -NV3_POS : NV3_POS];
  return [];
}
/* Die Flaechen: k, von, bis (in sigma), und wo die Prozentzahl steht */
function nv3Bereiche(b){
  const P = NV3_POS, lo = NV3.zmin, hi = NV3.zmax;
  const schwanz = (k, von, bis, sei) => {
    const zt = sei * Math.min(P + 0.95, 3.0), zs = sei * (P + 0.45);
    return {k, von, bis, x: zt, y: 0.46, zeiger: [zs, nv3Hoehe(zs) * 0.45]};
  };
  if (b.gr === 'zwei') return [schwanz('l', lo, -P, -1), {k: 'm', von: -P, bis: P, x: 0, y: 0.34}, schwanz('r', P, hi, 1)];
  if (b.gr === 'ein' && b.seite === 'links') return [schwanz('l', lo, -P, -1), {k: 'r', von: -P, bis: hi, x: 0.55, y: 0.34}];
  if (b.gr === 'ein' && b.seite === 'rechts') return [{k: 'l', von: lo, bis: P, x: -0.55, y: 0.34}, schwanz('r', P, hi, 1)];
  return [];
}
/* Die Uebernahme ins Feld: Seiten, Lage und «?» stehen dann fest */
function nv3BildUebernehmen(z){
  const b = z.bild;
  z.seiten = b.gr; z.lage = b.gr === 'ein' ? (b.seite === 'links' ? 'unten' : 'oben') : '';
  // Das «?» steht seit dem Nachtrag «mu und sigma selbst» schon in den
  // Feldern; aus dem Bild kommt es nur, wenn dort noch keines steht.
  if (!z.frage) z.frage = {g: 'g', mu: 'p', breite: 'n'}[b.frage] || null;
}
/* Die Prozentzahl der schraffierten Flaeche (fuer nv3Bild nach dem Pruefen) */
function nv3BildProzent(b){
  const k = ['m', 'l', 'r'].find(q => b.schr[q] && nv3Bereiche(b).some(x => x.k === q));
  return k ? b.proz[k] : '';
}
const nv3ProzLesen = s => { const r = nv3Zahl(s); return r.w === undefined ? NaN : r.w; };

/* Pruefen des Bildes gegen den Generator, mit Begruendung: [[ok, Satz]] */
function nv3PruefeBild(t, b){
  const A = t.angaben, S = A.sicherheit, u = [];
  const add = (ok, s) => u.push([ok, s]);
  let geruest = false;
  if (!b.gr) add(false, 'Wählen Sie zuerst: eine Grenze oder zwei Grenzen?');
  else if (b.gr !== A.seiten) add(false, A.seiten === 'zwei'
      ? 'Hier zählen beide Seiten: Gefragt ist ein Bereich um die Mitte — er hat zwei Grenzen.'
      : 'Hier interessiert nur eine Seite — die andere ist ungefährlich. Es braucht eine Grenze.');
  else if (A.seiten === 'zwei'){ add(true, 'Zwei Grenzen: zweiseitig.'); geruest = true; }
  else {
    const soll = A.lage === 'unten' ? 'links' : 'rechts';
    if (!b.seite) add(false, 'Eine Grenze stimmt. Liegt sie links oder rechts?');
    else if (b.seite !== soll) add(false, A.lage === 'unten'
        ? 'Eine Grenze stimmt, aber sie liegt links: Zu wenige wären das Problem.'
        : 'Eine Grenze stimmt, aber sie liegt rechts: Zu viele wären das Problem.');
    else { add(true, A.lage === 'unten' ? 'Eine Grenze, links: einseitig, X ≥ k.' : 'Eine Grenze, rechts: einseitig, X ≤ k.'); geruest = true; }
  }
  if (geruest){
    const ber = nv3Bereiche(b).map(x => x.k);
    const soll = A.seiten === 'zwei' ? 'm' : (A.lage === 'unten' ? 'r' : 'l');
    const schr = ber.filter(k => b.schr[k]);
    let schrOk = false;
    if (!schr.length) add(false, 'Noch ist keine Fläche schraffiert. Klicken Sie auf die Fläche, in der X mit der Sicherheit liegt.');
    else if (schr.length !== 1 || schr[0] !== soll) add(false, A.seiten === 'zwei'
        ? 'Schraffiert wird nur die Mitte zwischen den Grenzen: Dort liegt X mit der Sicherheit.'
        : (A.lage === 'unten' ? 'Schraffiert wird nur rechts der Grenze: X ≥ k, dort liegt X mit der Sicherheit.'
                              : 'Schraffiert wird nur links der Grenze: X ≤ k, dort liegt X mit der Sicherheit.'));
    else { add(true, 'Die Schraffur stimmt.'); schrOk = true; }
    if (schrOk){
      const w = nv3ProzLesen(b.proz[soll]);
      if (!String(b.proz[soll] || '').trim()) add(false, 'In die schraffierte Fläche gehört noch eine Prozentzahl.');
      else if (nv3Gleich(w, S, 0.05)) add(true, `Schraffierte Fläche: ${S} %, die Sicherheit.`);
      else if (nv3Gleich(w, 100 - S, 0.05) || nv3Gleich(w, (100 - S) / 2, 0.05))
        add(false, 'Das ist das Risiko. In die schraffierte Fläche gehört die Sicherheit.');
      else add(false, 'Die Zahl in der schraffierten Fläche stimmt noch nicht: Wie sicher soll es sein?');
      const offen = ber.filter(k => k !== soll), rest = A.seiten === 'zwei' ? (100 - S) / 2 : 100 - S;
      const werte = offen.map(k => nv3ProzLesen(b.proz[k]));
      if (offen.some(k => !String(b.proz[k] || '').trim()))
        add(false, A.seiten === 'zwei' ? 'In beide offenen Schwänze gehört noch eine Prozentzahl.'
                                       : 'In den offenen Schwanz gehört noch eine Prozentzahl.');
      else if (werte.every(v => nv3Gleich(v, rest, 0.05)))
        add(true, A.seiten === 'zwei' ? `zweiseitig: Der Rest verteilt sich auf beide Schwänze, je ${nv3Pz(rest)} %.`
                                      : `einseitig: Der ganze Rest liegt in einem Schwanz, ${nv3Pz(rest)} %.`);
      else add(false, A.seiten === 'zwei'
          ? 'zweiseitig: Der Rest bis 100 % verteilt sich auf beide Schwänze — je die Hälfte.'
          : 'einseitig: Der ganze Rest bis 100 % liegt im offenen Schwanz.');
    }
  }
  const sollQ = {g: 'g', p: 'mu', n: 'breite'}[A.frage];
  if (!b.frage) add(false, 'Noch fehlt das «?». Klicken Sie auf eine Grenze, auf μ oder auf die Breite σ.');
  else if (b.frage !== sollQ) add(false, {
      g: 'Das «?» an der Grenze hiesse: Die Grenze ist gesucht. Steht sie nicht in der Aufgabe?',
      mu: 'Das «?» an μ hiesse: p ist gesucht. Steht p nicht in der Aufgabe?',
      breite: 'Das «?» an der Breite hiesse: n ist gesucht. Steht n nicht in der Aufgabe?'}[b.frage]);
  else add(true, {g: 'Das «?» an der Grenze: Sie ist gesucht.',
                  mu: 'Das «?» an μ: p ist gesucht, damit ist μ = n · p offen.',
                  breite: 'Das «?» an der Breite: n ist gesucht, damit ist σ offen.'}[b.frage]);
  // Beschriftung (Nachtrag 2026-10-16): mu mit Wert bzw. Term, die
  // gegebene Grenze mit ihrem Wert. Ist die Grenze gesucht, traegt sie «?».
  u.push(nv3PruefeMuS(b.mu, 'mu', A, 'μ im Bild'));
  if (geruest && A.frage !== 'g'){
    const lab = b.lab || {};
    if (A.seiten === 'ein') u.push(nv3PruefeGrenzwert(lab.k, t, 'Die Grenze im Bild'));
    else if (['a', 'b'].some(k => String(lab[k] || '').trim()))
      add(false, `Die Grenzen hängen hier von ${A.frage} ab, an die Linien gehört keine Zahl. `
               + `${nv3Z(A.grenze)} ist das Ergebnis der Stichprobe; es liegt zwischen den Grenzen.`);
  }
  return {u, alles: u.every(x => x[0])};
}

/* Das selbst gebaute Bild als SVG-Inhalt. statisch: Prozente als Text
   (zum Mitnehmen); sonst Klickflaechen, die Prozentfelder liegen als
   HTML darueber (nv3BauFelder). */
function nv3BauSvg(b, statisch){
  const {X0, X1, Y0} = NV3_GEO, zx = nv3Zx, hy = nv3Hy;
  const F = "font-family=\"'Fira Sans','Segoe UI',Helvetica,Arial,sans-serif\"";
  const txt = (x, y, s, att) => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" ${F} ${att || ''}>${nv3Esc(s)}</text>`;
  const AKZ = '#9867A5', TIN = '#2d2924', MAT = '#6c6357', FL = '#d9c6df', ZART = '#9a8f7d';
  const lin = nv3Linien(b), ber = nv3Bereiche(b);
  const flaeche = (za, zb, att) => {
    const pts = NV3.glocke.filter(([q]) => q >= za && q <= zb);
    return `<path d="M${zx(za).toFixed(1)},${Y0} L${zx(za).toFixed(1)},${hy(nv3Hoehe(za)).toFixed(1)} `
      + pts.map(([q, hh]) => `L${zx(q).toFixed(1)},${hy(hh).toFixed(1)}`).join(' ')
      + ` L${zx(zb).toFixed(1)},${hy(nv3Hoehe(zb)).toFixed(1)} L${zx(zb).toFixed(1)},${Y0} Z" ${att}/>`;
  };
  let h = '';
  ber.forEach(x => { if (b.schr[x.k]) h += flaeche(x.von, x.bis, `fill="${FL}" stroke="none"`); });
  h += `<line x1="${X0 - 8}" y1="${Y0}" x2="${X1 + 8}" y2="${Y0}" stroke="${MAT}" stroke-width="1.4"/>`;
  h += `<path d="${NV3.glocke.map(([q, hh], i) => (i ? 'L' : 'M') + zx(q).toFixed(1) + ',' + hy(hh).toFixed(1)).join(' ')}"
    fill="none" stroke="${TIN}" stroke-width="2.4" stroke-linejoin="round"/>`;
  // Klickflaechen: die ganze Spalte unter der Kurve und darueber
  if (!statisch) ber.forEach(x => {
    h += `<rect class="ber" data-ber="${x.k}" x="${zx(x.von).toFixed(1)}" y="12" width="${(zx(x.bis) - zx(x.von)).toFixed(1)}"
      height="${(Y0 - 12).toFixed(1)}" fill="transparent"><title>Fläche schraffieren oder Schraffur entfernen</title></rect>`;
  });
  // Zeiger zu den Prozenten in den Schwaenzen
  ber.filter(x => x.zeiger).forEach(x => {
    h += `<line x1="${zx(x.x).toFixed(1)}" y1="${(hy(x.y) + 12).toFixed(1)}" x2="${zx(x.zeiger[0]).toFixed(1)}"
      y2="${hy(x.zeiger[1]).toFixed(1)}" stroke="${MAT}" stroke-width="1" pointer-events="none"/>`;
  });
  if (statisch) ber.forEach(x => {
    const s = String(b.proz[x.k] || '').trim();
    h += txt(zx(x.x), hy(x.y) + 6, s ? s.replace(/\s*%$/, '') + ' %' : '… %',
             `font-size="${x.zeiger ? 18 : 23}" font-weight="600" fill="${s ? (x.zeiger ? MAT : TIN) : '#b9ad99'}" text-anchor="middle" paint-order="stroke" stroke="#fffefb" stroke-width="5"`);
  });
  // mu und die Breite sigma
  const ziel = (art, inhalt, titel) => statisch ? inhalt
    : `<g class="ziel" data-ziel="${art}"><title>${titel}</title>${inhalt}</g>`;
  const qMu = b.frage === 'mu', qBr = b.frage === 'breite';
  h += `<line x1="${zx(0)}" y1="${Y0}" x2="${zx(0)}" y2="${hy(1)}" stroke="${MAT}" stroke-width="1.2" stroke-dasharray="4 4"/>`;
  h += ziel('mu', `<rect class="hit" x="${zx(0) - 26}" y="${Y0 + 4}" width="52" height="24" rx="5" fill="transparent"/>`
    + txt(zx(0), Y0 + 21, qMu ? 'μ ?' : 'μ', qMu ? `font-size="20" font-weight="700" fill="${AKZ}" text-anchor="middle"`
                                              : `font-size="17" fill="${TIN}" text-anchor="middle"`), '«?» an μ setzen');
  // Beschriftung von mu: im Bau ein Feld darueber (HTML), statisch als Text
  if (statisch && String(b.mu || '').trim())
    h += txt(zx(0), Y0 + 50, 'μ = ' + String(b.mu).trim(), `font-size="15" fill="${AKZ}" font-weight="600" text-anchor="middle"`);
  const yb = hy(Math.exp(-0.5));
  h += ziel('breite', `<rect class="hit" x="${zx(0) + 2}" y="${yb - 24}" width="${zx(1) - zx(0) + 10}" height="32" rx="5" fill="transparent"/>`
    + `<line x1="${zx(0) + 3}" y1="${yb}" x2="${zx(1) - 3}" y2="${yb}" stroke="${qBr ? AKZ : MAT}" stroke-width="1.4"/>`
    + `<path d="M${zx(0) + 3},${yb} l7,-4 v8 Z M${zx(1) - 3},${yb} l-7,-4 v8 Z" fill="${qBr ? AKZ : MAT}"/>`
    + txt((zx(0) + zx(1)) / 2, yb - 7, qBr ? 'σ ?' : 'σ', qBr ? `font-size="19" font-weight="700" fill="${AKZ}" text-anchor="middle"`
                                                             : `font-size="15" fill="${MAT}" text-anchor="middle"`), '«?» an die Breite σ setzen');
  // die Grenzen
  const lab = {};
  Object.entries(b.lab || {}).forEach(([k, w]) => { lab[k] = String(w || '').trim(); });
  lin.forEach(v => {
    const name = b.gr === 'zwei' ? (v < 0 ? 'a' : 'b') : 'k', q = b.frage === 'g';
    const inhalt = `<rect class="hit" x="${zx(v) - 16}" y="${hy(nv3Hoehe(v)) - 22}" width="32" height="${Y0 - hy(nv3Hoehe(v)) + 52}" rx="5" fill="transparent"/>`
      + `<line x1="${zx(v).toFixed(1)}" y1="${Y0}" x2="${zx(v).toFixed(1)}" y2="${(hy(nv3Hoehe(v)) - 16).toFixed(1)}" stroke="${TIN}" stroke-width="2.6"/>`
      + (q ? txt(zx(v), Y0 + 21, name + ' ?', `font-size="20" font-weight="700" fill="${AKZ}" text-anchor="middle"`)
         : statisch ? txt(zx(v), Y0 + 21, lab[name] ? `${name} = ${lab[name]}` : name,
                          `font-size="16" fill="${lab[name] ? AKZ : TIN}" text-anchor="middle"`)
         : '');
    h += ziel('g', inhalt, '«?» an die Grenze setzen');
  });
  if (statisch && !lin.length) h += txt(X1, 24, b.gr === 'ein' ? 'Grenze links oder rechts?' : 'Eine Grenze oder zwei Grenzen?',
                            `font-size="14" fill="${ZART}" text-anchor="end"`);
  return h;
}

/* ── Markieren: wie Kapitel 7 (themen/bernoulli/etappen.js) ──
   Zahlen (auch mit Dezimalpunkt) samt «%» sind EIN Stueck, Woerter je
   eines; Leerraum und Satzzeichen sind nicht markierbar. Zwischen zwei
   gleich markierten Stuecken wird der Leerraum mitgefaerbt - so liest
   sich «mindestens zehn» als eine Markierung. */
function nv3Stuecke(text){
  const re = /(\d+(?:[.,]\d+)?(?:\s?%)?)|([\p{L}\-]+)|(\s+)|(.)/gu;
  let m, i = 0, html = '';
  const teile = [];
  while ((m = re.exec(text))){
    if (m[1] || m[2]){
      teile.push({i, von: m.index, bis: m.index + m[0].length});
      html += `<span class="w" data-i="${i++}">${nv3Esc(m[0])}</span>`;
    } else if (m[3]) html += `<span class="ws">${m[0]}</span>`;
    else html += nv3Esc(m[0]);
  }
  return {html, teile};
}
function nv3Malen(textEl, marken){
  const kn = [...textEl.querySelectorAll(':scope > .w, :scope > .ws')];
  kn.forEach(el => NV3ARTEN.forEach(a => el.classList.remove('nvm-' + a)));
  kn.forEach((el, j) => {
    if (el.classList.contains('w')){
      const a = marken[el.dataset.i];
      if (a) el.classList.add('nvm-' + a);
    } else {
      const v = kn[j - 1], n = kn[j + 1];
      if (v && n && v.classList.contains('w') && n.classList.contains('w')){
        const a = marken[v.dataset.i];
        if (a && a === marken[n.dataset.i]) el.classList.add('nvm-' + a);
      }
    }
  });
}
/* Markierungen in Zeichenbereichen -> Stuecknummern */
function nv3MarkenAusBereichen(text, bereiche){
  const neu = {}, teile = nv3Stuecke(text).teile;
  bereiche.forEach(([von, bis, art]) => teile.forEach(p => { if (p.von < bis && p.bis > von) neu[p.i] = art; }));
  return neu;
}
/* Eine moegliche Markierung (D.e2 «kasper»), fuer die Kontrollfassung */
function nv3KasperMarken(t){
  const art = {n: 'n', p: 'p', Grenze: 'g', Sicherheit: 's'}, b = [];
  t.kasper.forEach(([k, w]) => { const i = t.text.indexOf(w); if (i >= 0 && art[k]) b.push([i, i + w.length, art[k]]); });
  return nv3MarkenAusBereichen(t.text, b);
}

/* ── Stand ── */
function nv3Leer(){
  return {v: 32, marks: {}, n: '', p: '', k: '', a: '', b: '', s: '', mu: '', sigma: '',
          seiten: '', lage: '', frage: null, c: '', form: '', gl: {g: '', mu: '', c: '', s: ''},
          angabenGeprueft: false, angabenOk: false, geprueft: false, ok: false,
          bild: nv3BildLeer(), bildGeprueft: false, bildOk: false, hilfe: false,
          erg: nv3ErgLeer(), ergGeprueft: false, ergOk: false, rechnung: false};
}
/* NEU (FASSUNG CHILBI 2): das freiwillige Ergebnisfeld (w; bei a und b
   die Felder a und b) und ob die Rechenschritte offen sind. Aeltere
   Eintraege bekommen die Felder leer dazu (nv3Stand). */
function nv3ErgLeer(){ return {w: '', a: '', b: ''}; }
function nv3ErgNachruesten(z){
  if (!z.erg || typeof z.erg !== 'object') z.erg = nv3ErgLeer();
  z.erg = Object.assign(nv3ErgLeer(), z.erg);
  z.ergGeprueft = !!z.ergGeprueft; z.ergOk = !!z.ergOk; z.rechnung = !!z.rechnung;
}
/* Ein Eintrag aus der Zeit vor FASSUNG 3.1: Woerter waren die Stuecke
   von text.split(/(\s+)/), das Bild war gezeichnet, die Gleichung aus
   Bausteinen gebaut. Uebernommen wird, was eine Entsprechung hat. */
function nv3AltUmstellen(t, alt){
  const z = nv3Leer();
  const b = [];
  let pos = 0;
  t.text.split(/(\s+)/).forEach((w, i) => {
    const art = (alt.marks || {})[i];
    if (art && NV3ARTEN.includes(art)) b.push([pos, pos + w.length, art]);
    pos += w.length;
  });
  z.marks = nv3MarkenAusBereichen(t.text, b);
  const lin = Array.isArray(alt.linien) ? alt.linien : [];
  if (lin.length === 2) z.seiten = 'zwei';
  else if (lin.length === 1){ z.seiten = 'ein'; z.lage = lin[0] < 0 ? 'unten' : 'oben'; }
  if (alt.prozent !== undefined && String(alt.prozent).trim()) z.s = String(alt.prozent);
  const gl = alt.gl || {};
  if (gl.c) z.c = String(gl.c);
  if (gl.k !== undefined && String(gl.k).trim()) z.k = String(gl.k);
  if (alt.frage === 'mu' && (t.typ === 'n' || t.typ === 'p')) z.frage = t.typ;
  else if (typeof alt.frage === 'string' && alt.frage.startsWith('grenze')) z.frage = 'g';
  if (alt.okAlles) z.okAlles = true;
  delete z.bild;                         // nv3BildNachruesten() baut es
  z.v = 31;                              // nv3Auf32() ergaenzt den Rest
  return z;
}
/* Ein Eintrag der Fassung 31 (Bild vor den Feldern, Gleichung von
   selbst): Felder mu und sigma, Form und Platzhalter der Gleichung und die
   Beschriftung im Bild kommen dazu. War die Aufgabe geloest, wird das
   Neue aus der Loesung ergaenzt und sie bleibt geloest; sonst bleibt die
   Arbeit stehen, und mu, sigma und die Gleichung sind noch zu machen. */
function nv3Auf32(t, z){
  z.v = 32;
  z.mu = z.mu || ''; z.sigma = z.sigma || ''; z.form = z.form || '';
  z.gl = Object.assign({g: '', mu: '', c: '', s: ''}, z.gl && typeof z.gl === 'object' ? z.gl : {});
  z.angabenGeprueft = false;
  z.angabenOk = !!(z.bildOk || z.okAlles);
  if (z.okAlles){
    const L = nv3LoesungEintrag(t);
    ['mu', 'sigma', 'form', 'gl'].forEach(k => { z[k] = L[k]; });
    if (!z.frage) z.frage = L.frage;
    z.angabenGeprueft = true;
    if (z.bild){ z.bild.mu = L.bild.mu; z.bild.lab = L.bild.lab; }
  } else if (z.geprueft){ z.geprueft = false; z.ok = false; }
  return z;
}
function nv3Stand(){
  stand.nv3 = stand.nv3 || {akt: NV3.aufgaben[0].id, stift: null, a: {}};
  const s = stand.nv3;
  if (!s.a || typeof s.a !== 'object') s.a = {};
  if (s.stift === '') s.stift = 'weg';                 // aelterer Stand: Radierer
  if (s.stift !== null && !NV3ARTEN.includes(s.stift) && s.stift !== 'weg') s.stift = null;
  delete s.werkzeug;                                   // aelterer Stand: Zeichenwerkzeug
  NV3.aufgaben.forEach(t => {
    const alt = s.a[t.id];
    if (!alt || typeof alt !== 'object') s.a[t.id] = nv3Leer();
    else if (alt.v !== 31 && alt.v !== 32) s.a[t.id] = nv3AltUmstellen(t, alt);
    nv3BildNachruesten(t, s.a[t.id]);
    if (s.a[t.id].v === 31) nv3Auf32(t, s.a[t.id]);
    nv3ErgNachruesten(s.a[t.id]);
  });
  // Eine gestrichene Aufgabe (aelterer Stand) zeigt auf nichts mehr.
  if (!NV3.aufgaben.some(t => t.id === s.akt)) s.akt = NV3.aufgaben[0].id;
  return s;
}
/* Ein Eintrag ohne Bild (vor dem Nachtrag 2026-10-16): War die Aufgabe
   geloest, ist das Bild das richtige und gilt als geprueft; sonst wird es
   aus den Eintraegen vorbelegt und muss noch geprueft werden. Ein Bild
   ohne Beschriftung bekommt leere Felder dafuer. */
function nv3BildNachruesten(t, z){
  const b = z.bild;
  if (b && typeof b === 'object' && b.schr && b.proz){
    if (typeof b.mu !== 'string') b.mu = '';
    b.lab = Object.assign({a: '', b: '', k: ''}, b.lab && typeof b.lab === 'object' ? b.lab : {});
    if (z.bildOk) nv3BildUebernehmen(z);
    return;
  }
  z.bildGeprueft = false; z.bildOk = false; z.hilfe = !!z.hilfe;
  if (z.okAlles){
    z.bild = nv3BildSoll(t); z.bildGeprueft = true; z.bildOk = true; nv3BildUebernehmen(z);
    return;
  }
  const n = nv3BildLeer();
  if (z.seiten === 'zwei'){ n.gr = 'zwei'; n.schr.m = true; n.proz.m = String(z.s || ''); }
  else if (z.seiten === 'ein'){
    n.gr = 'ein';
    if (z.lage){
      n.seite = z.lage === 'unten' ? 'links' : 'rechts';
      const k = z.lage === 'unten' ? 'r' : 'l';
      n.schr[k] = true; n.proz[k] = String(z.s || '');
    }
  }
  n.frage = {g: 'g', p: 'mu', n: 'breite'}[z.frage] || null;
  z.bild = n;
}
/* Die Loesung (nur Kontrollfassung): alles eingetragen und geprueft */
function nv3LoesungEintrag(t){
  const A = t.angaben, z = nv3Leer();
  z.marks = nv3KasperMarken(t);
  z.n = A.n === null ? '' : String(A.n);
  z.p = A.p === null ? '' : A.p_text;
  z.k = A.grenze === null ? '' : String(A.grenze);
  z.s = String(A.sicherheit);
  z.mu = A.mu_t; z.sigma = A.s_t;
  z.seiten = A.seiten; z.lage = A.lage || ''; z.frage = A.frage; z.c = String(A.c);
  z.form = A.seiten === 'zwei' ? 'betrag' : A.lage;
  z.gl = {g: A.grenze === null ? '' : nv3Z(A.grenze), mu: A.mu_t, c: String(A.c), s: A.s_t};
  z.angabenGeprueft = true; z.angabenOk = true;
  z.geprueft = true; z.ok = true; z.okAlles = true;
  z.bild = nv3BildSoll(t); z.bildGeprueft = true; z.bildOk = true;
  // NEU (FASSUNG CHILBI 2): Ergebnis eingetragen, Rechenschritte offen
  const E = t.erg;
  z.erg = E.art === 'ab' ? {w: '', a: String(E.w[0]), b: String(E.w[1])} : {w: String(E.w), a: '', b: ''};
  z.ergGeprueft = true; z.ergOk = true; z.rechnung = true;
  return z;
}
function nv3LoesungStand(){
  const akt = (stand.nv3 && stand.nv3.akt) || NV3.aufgaben[0].id;
  const a = {};
  NV3.aufgaben.forEach(t => { a[t.id] = nv3LoesungEintrag(t); });
  return {nv3: {akt, stift: null, a}};
}

/* ── Pruefen gegen den Generator, mit Begruendung ──
   Jede Liste: [[ok, Satz, Feld]] - Feld markiert den Eintrag (n, p, g,
   s, mu, sigma, c, form, gl-g, gl-mu, gl-c, gl-s).
   Schritt 2: die Angaben links, mit mu und sigma. */
function nv3PruefeAngaben(t, z){
  const A = t.angaben, u = [];
  const add = (ok, s, f) => u.push([ok, s, f]);
  // das Fragezeichen
  if (!z.frage) add(false, 'Genau ein Feld bekommt «?»: das, was gesucht ist.', null);
  else if (z.frage !== A.frage) add(false, `Das «?» steht noch nicht beim Gesuchten — ${NV3NAME[z.frage]} ist gegeben.`, z.frage);
  else add(true, 'Das «?» steht beim Gesuchten.', z.frage);
  const istGrenze = v => A.grenze !== null && nv3Gleich(v, A.grenze);
  // n
  if (z.frage !== 'n'){
    const r = nv3Zahl(z.n);
    if (A.n === null){
      if (!r.leer) add(false, istGrenze(r.w) ? `${z.n.trim()} ist die Grenze, nicht n.` : 'Steht n wirklich als Zahl in der Aufgabe?', 'n');
    } else if (r.leer) add(false, 'n fehlt noch.', 'n');
    else if (r.w === undefined || r.pro) add(false, 'Bei n gehört eine Anzahl hinein.', 'n');
    else if (nv3Gleich(r.w, A.n)) add(true, 'n stimmt.', 'n');
    else if (istGrenze(r.w)) add(false, `${z.n.trim()} ist die Grenze, nicht n.`, 'n');
    else add(false, 'n stimmt noch nicht: n zählt, wie oft das Zufallsexperiment durchgeführt wird.', 'n');
  }
  // p
  if (z.frage !== 'p'){
    const r = nv3Zahl(z.p), w = nv3Wert(r);
    const h = t.hinweise_p.find(([x]) => nv3Gleich(x, w, 5e-4));
    if (A.p === null){
      if (!r.leer) add(false, h ? h[1] : 'Steht p wirklich als Zahl in der Aufgabe?', 'p');
    } else if (r.leer) add(false, 'p fehlt noch.', 'p');
    else if (!nv3Num(w)) add(false, 'Bei p gehört eine Wahrscheinlichkeit hinein, z. B. 0.25, 25 % oder 1/4.', 'p');
    else if (nv3Gleich(w, A.p, 5e-4)) add(true, 'p stimmt.', 'p');
    else if (w > 1) add(false, 'p ist eine Wahrscheinlichkeit: 0.25 oder 25 %, nicht 25.', 'p');
    else if (h) add(false, h[1], 'p');
    else if (nv3Gleich(w, 1 - A.p, 5e-4)) add(false, 'Das ist die Wahrscheinlichkeit des Gegenteils. X zählt, wonach die Frage fragt.', 'p');
    else add(false, 'p stimmt noch nicht.', 'p');
  }
  // Grenze
  if (z.frage !== 'g'){
    const r = nv3Zahl(z.k), w = nv3Wert(r);
    if (A.grenze === null){
      if (String(z.k || '').trim()) add(false, 'Steht die Grenze wirklich als Zahl in der Aufgabe?', 'g');
    } else if (r.leer) add(false, 'Die Grenze fehlt noch.', 'g');
    else if (!nv3Num(w)) add(false, 'Bei der Grenze gehört eine Zahl hinein.', 'g');
    else if (nv3Gleich(w, A.grenze)) add(true, 'Die Grenze stimmt.', 'g');
    else {
      const h = t.hinweise_k.find(([x]) => nv3Gleich(x, w) || nv3Gleich(x, r.w));
      if (h) add(false, h[1], 'g');
      else if (A.n !== null && nv3Gleich(w, A.n)) add(false, `${A.n} ist n, nicht die Grenze.`, 'g');
      else if (nv3Gleich(r.w, A.sicherheit) || nv3Gleich(w, A.sicherheit / 100))
        add(false, `${A.sicherheit} % ist die Sicherheit, nicht die Grenze.`, 'g');
      else add(false, 'Die Grenze stimmt noch nicht.', 'g');
    }
  }
  // Sicherheit
  if (z.frage !== 's'){
    const r = nv3Zahl(z.s), S = nv3Prozent(r);
    if (r.leer) add(false, 'Die Sicherheit fehlt noch.', 's');
    else if (!nv3Num(S)) add(false, 'Bei der Sicherheit gehört eine Prozentzahl hinein.', 's');
    else if (nv3Gleich(S, A.sicherheit)) add(true, 'Die Sicherheit stimmt.', 's');
    else if (nv3Gleich(S, 100 - A.sicherheit)) add(false, 'Das ist das Risiko. Die Sicherheit ist der Rest bis 100 %.', 's');
    else add(false, 'Die Sicherheit stimmt noch nicht.', 's');
  }
  // mu und sigma, als Zahl oder als Term in der Unbekannten
  const [okM, sM] = nv3PruefeMuS(z.mu, 'mu', A, 'μ');
  add(okM, sM, 'mu');
  const [okS, sS] = nv3PruefeMuS(z.sigma, 's', A, 'σ');
  add(okS, sS, 'sigma');
  return {u, alles: u.every(x => x[0])};
}
/* Schritte 4 und 5: c und die selbst aufgestellte Gleichung */
function nv3PruefeGl(t, z){
  const A = t.angaben, u = [], S = A.sicherheit;
  const add = (ok, s, f) => u.push([ok, s, f]);
  const c = parseFloat(z.c);
  if (!z.c) add(false, 'c fehlt noch.', 'c');
  else if (nv3Gleich(c, A.c)) add(true, 'c stimmt.', 'c');
  else add(false, A.seiten === 'ein'
      ? `Einseitig ${S} %: Die ganzen ${nv3Pz(100 - S)} % liegen in einem Schwanz — das ist das ${2 * S - 100} %-Intervall.`
      : `Zweiseitig ${S} %: das ${S} %-Intervall, je ${nv3Pz((100 - S) / 2)} % in beiden Schwänzen.`, 'c');
  const soll = A.seiten === 'zwei' ? 'betrag' : A.lage;
  if (!z.form){ add(false, 'Wählen Sie eine Form für die Gleichung.', 'form'); return {u, alles: false}; }
  if (z.form !== soll) add(false, {
      betrag: 'Ihr Bild hat zwei Grenzen: Gefragt ist ein Bereich um μ, das ist die Form mit dem Betrag.',
      unten: 'Ihr Bild hat eine Grenze links: X liegt mit der Sicherheit oberhalb, also X ≥ μ − c · σ.',
      oben: 'Ihr Bild hat eine Grenze rechts: X liegt mit der Sicherheit unterhalb, also X ≤ μ + c · σ.'}[soll], 'form');
  else add(true, 'Die Form passt zum Bild.', 'form');
  const gl = z.gl || {};
  if (nv3Unbekannt(z)){
    const [ok, s] = nv3PruefeGrenzwert(gl.g, t, 'Die Grenze in der Gleichung');
    add(ok, s, 'gl-g');
  }
  const [okM, sM] = nv3PruefeMuS(gl.mu, 'mu', A, 'μ in der Gleichung');
  add(okM, sM, 'gl-mu');
  const rc = nv3Term(gl.c);
  if (rc.leer) add(false, 'c in der Gleichung fehlt noch.', 'gl-c');
  else if (rc.fehler || rc.vars.size) add(false, 'Für c gehört eine der vier Zahlen aus der Tabelle hin.', 'gl-c');
  else if (nv3Gleich(rc.f({}), A.c, 1e-6)) add(true, 'c in der Gleichung stimmt.', 'gl-c');
  else if (z.c && !nv3Gleich(rc.f({}), c, 1e-6)) add(false, 'In die Gleichung gehört das c, das Sie gewählt haben.', 'gl-c');
  else add(false, 'c in der Gleichung stimmt noch nicht.', 'gl-c');
  const [okS, sS] = nv3PruefeMuS(gl.s, 's', A, 'σ in der Gleichung');
  add(okS, sS, 'gl-s');
  return {u, alles: u.every(x => x[0])};
}
/* Schritt 6, das Pruefen am Schluss: stimmen die Angaben, steht dort eine
   Zeile; die Gleichung einzeln. */
function nv3Pruefe(t, z){
  const a = nv3PruefeAngaben(t, z), g = nv3PruefeGl(t, z);
  const u = a.alles ? [[true, 'Die Angaben links stimmen.', null]] : a.u.filter(x => !x[0]);
  return {u: u.concat(g.u), alles: a.alles && g.alles, angaben: a};
}

/* ── NEU (gemeinsam entschieden): FASSUNG CHILBI 2, nach der Gleichung ──
   thema.md: «Danach gibt es ein freiwilliges Feld für das Ergebnis und
   immer, ohne Bedingung, einen Knopf ‹Rechenschritte zeigen›. … Ein
   Ergebnis im Feld wird geprüft, ein leeres Feld nicht.»
   nv3PruefeErg: {leer} oder {u: [[ok, Satz]], alles}. Der Soll-Wert kommt
   aus inhalte.py (t.erg): w gerundet, roh ungerundet. Ein ungerundetes
   Ergebnis gilt, mit dem Satz zum Runden. */
function nv3PruefeErg(t, z){
  const E = t.erg, e = z.erg || {};
  const lies = x => nv3Wert(nv3Zahl(x));
  const leer = x => !String(x ?? '').trim();
  const runden = {ab: 'abgerundet', auf: 'aufgerundet', aussen: 'nach aussen gerundet'}[E.runden] || '';
  const tolRoh = E.art === 'p' ? 6e-4 : (E.art === 'n' ? 0.1 : 0.051);
  const eins = (roh, soll, rohSoll, name, richtung) => {
    const v = lies(roh);
    if (!nv3Num(v)) return [false, `${name}: Hier gehört eine Zahl hin.`];
    if (E.art === 'p' ? Math.abs(v - soll) < 5e-4 : nv3Gleich(v, soll))
      return [true, `${name} stimmt.`];
    if (Math.abs(v - rohSoll) <= tolRoh)
      return [true, `${name}: Gerechnet stimmt das. Damit die Sicherheit bleibt, wird ${runden}: ${nv3Esc(E.art === 'p' ? soll.toFixed(3) : String(soll))}.`];
    const schritt = E.art === 'p' ? 0.001 : 1;
    if (Math.abs(v - (soll - richtung * schritt)) < 1e-6)
      return [false, `${name}: Fast. Runden Sie auf die sichere Seite — hier wird ${runden}.`];
    return [false, `${name} stimmt noch nicht. Die Rechenschritte zeigen, wie man rechnet.`];
  };
  // richtung: +1, wenn aufgerundet wird (der Fehler waere eins weniger)
  const r = E.runden === 'auf' ? 1 : -1;
  let u;
  if (E.art === 'ab'){
    if (leer(e.a) && leer(e.b)) return {leer: true};
    u = [eins(e.a, E.w[0], E.roh[0], 'a', -1), eins(e.b, E.w[1], E.roh[1], 'b', 1)];
  } else {
    if (leer(e.w)) return {leer: true};
    u = [eins(e.w, E.w, E.roh, E.art, r)];
  }
  return {u, alles: u.every(x => x[0])};
}
/* Der Zahlenstrahl zum Betrag: mu in der Mitte, c · sigma nach beiden
   Seiten, an den Enden a und b (wie auf den Gleichungskarten, bauen.py) */
function nv3StrahlSvg(st){
  const F = "font-family=\"'Fira Sans','Segoe UI',Helvetica,Arial,sans-serif\"";
  const AKZ = '#9867A5', TIN = '#2d2924', MAT = '#6c6357';
  const pfeil = (x1, x2) => `<line x1="${x1}" y1="27" x2="${x2}" y2="27" stroke="${AKZ}" stroke-width="1.4"/>`
    + `<path d="M${x2},27 l${x2 > x1 ? -7 : 7},-3.5 v7 Z M${x1},27 l${x2 > x1 ? 7 : -7},-3.5 v7 Z" fill="${AKZ}"/>`;
  return `<svg class="nv3strahl" viewBox="0 0 320 64" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Zahlenstrahl: μ in der Mitte, c · σ nach links und nach rechts">
    <line x1="22" y1="40" x2="298" y2="40" stroke="${MAT}" stroke-width="1.3"/>
    ${[40, 160, 280].map(x => `<line x1="${x}" y1="35" x2="${x}" y2="45" stroke="${TIN}" stroke-width="1.4"/>`).join('')}
    ${pfeil(160, 42)}${pfeil(160, 278)}
    <text x="100" y="17" ${F} font-size="13" fill="${AKZ}" text-anchor="middle">${nv3Esc(st.cs)}</text>
    <text x="220" y="17" ${F} font-size="13" fill="${AKZ}" text-anchor="middle">${nv3Esc(st.cs)}</text>
    <text x="40" y="60" ${F} font-size="14" font-weight="700" fill="${AKZ}" text-anchor="middle">a</text>
    <text x="160" y="60" ${F} font-size="14" fill="${TIN}" text-anchor="middle">${nv3Esc(st.mu)}</text>
    <text x="280" y="60" ${F} font-size="14" font-weight="700" fill="${AKZ}" text-anchor="middle">b</text></svg>`;
}
/* Die Rechenschritte (t.rechnung aus inhalte.py): haupt, satz, abstand
   (Satz und Zahlenstrahl), kette, zeile, grenze (am «=» ausgerichtet),
   ergebnis */
function nv3RechHtml(t){
  let h = '', grenzen = [];
  const grenzenAus = () => {
    if (!grenzen.length) return;
    h += '<div class="kasten">' + grenzen.map(g => { const i = g.indexOf(' = ');
      return `<span class="l">${nv3Esc(g.slice(0, i))} =</span><span class="r">${nv3Esc(g.slice(i + 3))}</span>`; }).join('') + '</div>';
    grenzen = [];
  };
  t.rechnung.forEach(([text, rolle]) => {
    if (rolle === 'grenze'){ grenzen.push(text); return; }
    grenzenAus();
    if (rolle === 'haupt') h += `<div class="haupt">${nv3Esc(text)}</div>`;
    else if (rolle === 'satz') h += `<p class="satz">${nv3Esc(text)}</p>`;
    else if (rolle === 'abstand') h += `<div class="abstand"><p>${nv3Esc(text)}</p>${t.strahl ? nv3StrahlSvg(t.strahl) : ''}</div>`;
    else if (rolle === 'ergebnis') h += `<div class="erg">${nv3Esc(text)}</div>`;
    else h += `<div class="zeile">${nv3Esc(text)}</div>`;
  });
  grenzenAus();
  return `<div class="nv3rs">${h}</div>`;
}
/* Ist das Ergebnis offen (Rechenschritte gezeigt oder selbst richtig)?
   Erst dann tragen Bild und Mitnehmen die Werte. */
const nv3Offen = z => !!(z.geprueft && z.ok && (z.rechnung || z.ergOk));

function etappe2(){
  const a = D.etappen[1];
  loesungAnwenden(nv3LoesungStand);
  const S = nv3Stand();
  const t = NV3.aufgaben.find(x => x.id === S.akt) || NV3.aufgaben[0];
  const z = S.a[t.id];
  const gesperrt = !!(window.KASPER_RUECKMELDUNG && stand.loesungOffen);
  const merk = () => { if (!gesperrt) sichern(); };
  const bildDa = z.angabenOk || z.bildOk;

  // GEAENDERT (FASSUNG CHILBI): Die graue Leiste traegt nur «Etappe 2 ·
  // Name»; Situation und Auftrag stehen in der Situationskarte (mit dem
  // Bild der gewaehlten Aufgabe, wenn es vorliegt), die Schritte im
  // Auftragsfenster.
  const sk = nvKarteHtml({id: 'e2', nr: 2, name: NV_SK.e2name, text: NV_SK.e2text,
    frage: NV_SK.e2frage, bild: NV.sbild[t.id] || ''});
  buehne({rolle:a.rolle, rang:a.rang, titel:'Etappe 2 · ' + a.name, text:''},
    'Die Aufgabe', 'Bild und Gleichung',
    `<button class="knopf" id="nv3pruefen"${z.bildOk ? '' : ' hidden'}>Prüfen</button>
     <span class="befund" id="befund"></span>
     <button class="knopf leer" id="weiter" style="margin-left:auto">Fertig →</button>`,
    sk, '', [1.05, 1.25]);
  window._zustaendig = () => false;     // diese Etappe hat keine Karten
  window._neuzeichnen = () => etappe2();
  const tisch = document.getElementById('tisch'), feld = document.getElementById('feld');
  const feldEl = f => tisch.querySelector(`[data-feld="${f}"]`) || feld.querySelector(`[data-feld="${f}"]`);
  const breite = (inp, min) => { inp.style.width = Math.min(13, Math.max(min || 3.4, inp.value.length * 0.6 + 1.6)) + 'em'; };
  const listeHtml = u => u.map(([ok, s]) => `<li class="${ok ? 'ja' : 'nein'}">${ok ? '✓' : '✗'} ${nv3Esc(s)}</li>`).join('');
  const einfuegen = `<span class="nv3ins"><span class="nv3zart">Einfügen:</span>
      <button type="button" data-ins="√()" title="Wurzel einfügen">√</button>
      <button type="button" data-ins=" · " title="Malpunkt einfügen">·</button></span>`;
  /* NEU (gemeinsam entschieden): FASSUNG CHILBI 2, das gefuehrte Beispiel.
     Je Schritt ein kurzer Satz (t.fuehrung) und, solange der Schritt
     offen ist, «Zeigen»: Es traegt die Loesung dieses Schritts ein und
     prueft sie gleich, damit es weitergeht. Nur bei der Aufgabe mit
     «fuehrung» (dem Karussell). */
  const FU = t.fuehrung, FT = NV.fuehrung;
  const fuehr = (schritt, offen) => !FU ? '' : `<div class="nv3fuehr" data-schritt="${schritt}">
      <span class="kopf">${nvEsc(FT.kopf)} · ${nvEsc(FT.schritte[schritt])}</span>
      <span class="satz">${nvEsc(FU[schritt])}</span>
      ${offen && !gesperrt ? `<button type="button" class="knopf leer nv3zeigen" data-zeigen="${schritt}">${nvEsc(FT.zeigen)}</button>` : ''}</div>`;

  /* ── links: Reiter, Textmarker, Aufgabe mit den Feldern darunter ── */
  const st = nv3Stuecke(t.text);
  tisch.innerHTML = `<div class="nv3links">
    <div class="nv3anrn"><span class="was">Aufgaben</span>${NV3.aufgaben.map((x, i) => `<button type="button" class="nv3anr${S.a[x.id].okAlles ? ' fertig' : ''}" data-id="${x.id}"
       title="${nv3Esc(x.titel)}" aria-label="Aufgabe ${i + 1}: ${nv3Esc(x.titel)}"
       aria-current="${x.id === t.id}">${i + 1}${S.a[x.id].okAlles ? '<span class="ok">✓</span>' : ''}</button>`).join('')}</div>
    <div class="nv3stifte" id="nv3stifte" role="toolbar" aria-label="Textmarker"
      title="Erst den Stift wählen, dann über den Text streichen oder Wörter anklicken.">
      <span class="was">Textmarker</span>
      ${NV3STIFTE.map(m => `<button type="button" class="nvm-${m.k}" data-stift="${m.k}" aria-pressed="${S.stift === m.k}"
         title="Stift ${m.name}">${m.name}</button>`).join('')}
      <button type="button" class="weg" data-stift="weg" aria-pressed="${S.stift === 'weg'}" title="Radierer">Radierer</button>
      <span class="zart">Erst den Stift wählen, dann über den Text streichen.</span></div>
    ${fuehr('marken', !z.angabenOk)}
    <div class="nv3karte">
      <div class="nv3von">${nvEsc(NV.aufgabe_von.replace('{n}', NV3.aufgaben.indexOf(t) + 1).replace('{m}', NV3.aufgaben.length))}</div>
      <div class="nv3kk gross"><b>${t.titel}</b><span>${nvQuelle(t.titel, t.quelle)}</span></div>
      <div class="nv3text" id="nv3text">${st.html}</div>
      <div class="nv3felder" id="nv3felder"></div>
    </div>
    <p class="nv3zart">Die Markierung wird nicht geprüft — sie ist Ihr Arbeitsmittel.</p>
    <div id="nv3kasper"></div></div>`;
  const links = tisch.querySelector('.nv3links');
  tisch.querySelectorAll('.nv3anrn button').forEach(b => b.onclick = () => { S.akt = b.dataset.id; merk(); etappe2(); });
  const stiftSetzen = () => {
    links.classList.toggle('stift-an', !!S.stift);
    tisch.querySelectorAll('#nv3stifte button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.stift === S.stift)));
  };
  tisch.querySelectorAll('#nv3stifte button').forEach(b => b.onclick = () => {
    S.stift = S.stift === b.dataset.stift ? null : b.dataset.stift;
    stiftSetzen(); merk();
  });
  stiftSetzen();

  const textEl = document.getElementById('nv3text');
  nv3Malen(textEl, z.marks);
  /* Textmarker wie Kapitel 7: Streichen markiert den ganzen Bereich vom
     ersten bis zum letzten Stueck, ein Klick ein Stueck; derselbe Stift
     auf einem schon so markierten Stueck nimmt die Farbe weg. */
  textEl.addEventListener('pointerdown', e => {
    if (gesperrt) return;
    const stift = S.stift;
    if (!stift){
      const b = document.getElementById('nv3stifte');
      b.classList.remove('winke'); void b.offsetWidth; b.classList.add('winke');
      return;
    }
    e.preventDefault();
    const vorher = Object.assign({}, z.marks);
    const w0 = e.target.closest('.w');
    let start = w0 ? +w0.dataset.i : null, ende = start, bewegt = false;
    const anwenden = () => {
      const m = Object.assign({}, vorher);
      if (start !== null){
        const von = Math.min(start, ende), bis = Math.max(start, ende);
        if (von === bis && !bewegt && vorher[von] === stift) delete m[von];
        else for (let i = von; i <= bis; i++){ if (stift === 'weg') delete m[i]; else m[i] = stift; }
      }
      z.marks = m; nv3Malen(textEl, m);
    };
    anwenden();
    const zug = ev => {
      const el = document.elementFromPoint(ev.clientX, ev.clientY);
      const w = el && el.closest ? el.closest('.w') : null;
      if (!w || !textEl.contains(w)) return;
      const i = +w.dataset.i;
      if (start === null) start = i;
      if (i !== start) bewegt = true;
      if (i !== ende){ ende = i; anwenden(); }
    };
    const fertig = () => {
      window.removeEventListener('pointermove', zug);
      window.removeEventListener('pointerup', fertig);
      window.removeEventListener('pointercancel', fertig);
      merk();
    };
    window.addEventListener('pointermove', zug);
    window.addEventListener('pointerup', fertig);
    window.addEventListener('pointercancel', fertig);
  });

  /* Einfuegeknoepfe (√, ·): in das zuletzt benutzte Termfeld */
  let letztes = null;
  const insBinden = wurzel => {
    wurzel.addEventListener('focusin', e => { if (e.target.matches('input.term')) letztes = e.target; });
    wurzel.querySelectorAll('[data-ins]').forEach(k => {
      k.addEventListener('pointerdown', e => e.preventDefault());
      k.onclick = () => {
        const inp = letztes && document.body.contains(letztes) ? letztes : wurzel.querySelector('input.term');
        if (!inp || inp.disabled) return;
        const s = inp.selectionStart ?? inp.value.length, e = inp.selectionEnd ?? s, w = k.dataset.ins;
        inp.value = inp.value.slice(0, s) + w + inp.value.slice(e);
        const pos = s + (w === '√()' ? 2 : w.length);
        inp.focus(); inp.setSelectionRange(pos, pos);
        inp.dispatchEvent(new Event('input', {bubbles: true}));
      };
    });
  };

  /* ── Schritt 2: die Felder unter der Aufgabe, in den Stiftfarben ── */
  const felderEl = document.getElementById('nv3felder');
  function angabenMarkenWeg(){
    felderEl.querySelectorAll('.nv3f.ok,.nv3f.falsch').forEach(x => x.classList.remove('ok', 'falsch'));
    const u = document.getElementById('nv3angurteil'); if (u) u.innerHTML = '';
  }
  function felderBauen(){
    const q = f => `<button type="button" class="nv3q" data-q="${f}" aria-pressed="${z.frage === f}"
        title="«?»: Das ist gesucht.">?</button>`;
    const chip = s => `<span class="nv3frage">${s}</span>`;
    const inp = (f, ph, titel, klasse, term) => `<input type="text" data-f="${f}" ${klasse ? `class="${klasse}"` : ''} value="${nv3Esc(z[f])}"
        placeholder="${ph}" spellcheck="false" autocomplete="off" inputmode="${term ? 'text' : 'decimal'}" aria-label="${titel}" title="${titel}">`;
    const zahl = (f, name) => `<span class="nv3f nvm-${f}" data-feld="${f}"><span class="nv3fn">${name}</span>${z.frage === f ? chip('?')
        : inp(f, '', name + (f === 'p' ? ' (z. B. 0.25 oder 1/6)' : ''))}${q(f)}</span>`;
    // Die Grenze: vor dem Bild ein Feld; danach so, wie das Bild sie zeigt
    const rel = z.lage === 'unten' ? 'X ≥' : 'X ≤', nachBild = z.bildOk && z.seiten;
    let grenze;
    if (z.frage === 'g'){
      grenze = !nachBild ? chip('?')
        : (z.seiten === 'zwei' ? `${chip('a ?')}<span class="op">≤ X ≤</span>${chip('b ?')}` : `<span class="op">${rel}</span>${chip('?')}`);
    } else if (nachBild && z.seiten === 'zwei') grenze = `<span class="op">k =</span>${inp('k', '', 'Ergebnis k', 'gr')}<span class="zart">beobachtet</span>`;
    else if (nachBild) grenze = `<span class="op">${rel}</span>${inp('k', 'k', 'Grenze k', 'gr')}`;
    else grenze = inp('k', '', 'Grenze k bzw. a und b', 'gr');
    const term = (f, name, titel) => `<span class="nv3f nvm-r" data-feld="${f}"><span class="nv3fn">${name}</span><span class="op">=</span>${inp(f, 'Zahl oder Term', titel, 'term', true)}</span>
      <span class="nv3rech" data-rech="${f}"></span>`;
    felderEl.innerHTML = `${fuehr('angaben', !z.angabenOk)}
      <div class="nv3frow">${zahl('n', 'n')}${zahl('p', 'p')}</div>
      ${nachBild ? `<div class="nv3frow"><span class="nv3zart">Aus dem Bild: ${z.seiten === 'zwei' ? 'zweiseitig'
        : 'einseitig, ' + (z.lage === 'unten' ? 'untere Grenze' : 'obere Grenze')}</span></div>` : ''}
      <div class="nv3frow"><span class="nv3f nvm-g" data-feld="g"><span class="nv3fn">Grenze</span>${grenze}${q('g')}</span></div>
      <div class="nv3frow"><span class="nv3f nvm-s" data-feld="s"><span class="nv3fn">Sicherheit</span>${z.frage === 's' ? chip('?')
        : inp('s', '', 'Sicherheit in Prozent')}<span class="op">%</span>${q('s')}</span></div>
      <div class="nv3frow">${term('mu', 'μ', 'μ, als Zahl oder Term')}</div>
      <div class="nv3frow">${term('sigma', 'σ', 'σ, als Zahl oder Term')}</div>
      <div class="nv3frow">${einfuegen}<button type="button" class="knopf" id="nv3angpruefen" style="margin-left:auto">Angaben prüfen</button></div>
      <ul class="nv3urteil" id="nv3angurteil"></ul>`;
    felderEl.querySelectorAll('input.term').forEach(i => breite(i, 7.5));
    felderEl.querySelectorAll('input').forEach(i => i.addEventListener('input', () => {
      z[i.dataset.f] = i.value;
      if (i.classList.contains('term')) breite(i, 7.5);
      angabenGeaendert();
      rechnungZeigen();
    }));
    rechnungZeigen();
    felderEl.querySelectorAll('[data-q]').forEach(k => k.onclick = () => {
      z.frage = z.frage === k.dataset.q ? null : k.dataset.q;
      felderBauen(); angabenGeaendert();
    });
    insBinden(felderEl);
    zeigenBinden(felderEl);
    document.getElementById('nv3angpruefen').onclick = () => {
      if (gesperrt) return;
      const p = angabenUrteil();
      z.angabenGeprueft = true;
      // NEU (FASSUNG CHILBI): Stimmen die Angaben zum ersten Mal, fuehrt
      // die Fahne mit Uhr zum Bild.
      if (p.alles && !z.angabenOk){ z.angabenOk = true; merk(); _nvE2Weiter = {id: t.id, art: 'bild'}; etappe2(); return; }
      merk();
      rechnungZeigen();
    };
    if (gesperrt) felderEl.querySelectorAll('input,button').forEach(x => { x.disabled = true; });
  }
  /* NEU (FASSUNG CHILBI): die Rechnung unter einem direkt eingetragenen
     richtigen μ bzw. σ («z. B. 100 · 0.25»), sobald die Angaben einmal
     gestimmt haben. Nur wo n und p gegeben sind - sonst stehen dort Terme. */
  function rechnungZeigen(){
    const R = t.angaben.rechnung;
    [['mu', 'mu', 'μ'], ['sigma', 's', 'σ']].forEach(([f, w, name]) => {
      const sp = felderEl.querySelector(`[data-rech="${f}"]`);
      if (!sp) return;
      const roh = String(z[f] || '').trim();
      const direkt = /^\d+(?:[.,]\d+)?$/.test(roh);
      sp.textContent = R && z.angabenOk && direkt && nv3PruefeMuS(roh, w, t.angaben, name)[0]
        ? NV.rechnung.zb + name + ' = ' + R[w] : '';
    });
  }
  function angabenUrteil(){
    const p = nv3PruefeAngaben(t, z);
    angabenMarkenWeg();
    p.u.forEach(([ok, , f]) => {
      const el = f && felderEl.querySelector(`[data-feld="${f}"]`);
      if (el && !el.classList.contains('falsch')) el.classList.add(ok ? 'ok' : 'falsch');
    });
    document.getElementById('nv3angurteil').innerHTML = listeHtml(p.u);
    return p;
  }
  function angabenGeaendert(){
    z.angabenGeprueft = false; angabenMarkenWeg();
    unpruefen();
    if (z.bildOk) bildZeichnen();
    merk();
  }

  /* ── rechts: Schritt 3 Bild, Schritt 4 c, Schritt 5 Gleichung ── */
  const b = z.bild;
  const knopf = (art, w, n) => `<button type="button" data-${art}="${w}" aria-pressed="${b[art] === w}">${n}</button>`;
  const bau = z.bildOk ? '' : `<div class="nv3bau" id="nv3bau">
      <span class="nv3wahl" role="group">${knopf('gr', 'ein', 'eine Grenze')}${knopf('gr', 'zwei', 'zwei Grenzen')}</span>
      ${b.gr === 'ein' ? `<span class="nv3wahl" role="group">${knopf('seite', 'links', 'links')}${knopf('seite', 'rechts', 'rechts')}</span>` : ''}
      <span class="zart">${b.gr && nv3Linien(b).length
        ? 'Fläche anklicken: schraffieren. Prozente eintippen. μ und Grenzen beschriften. Grenze, μ oder Breite σ anklicken: «?».'
        : (b.gr === 'ein' ? 'Liegt die Grenze links oder rechts?' : 'Wie viele Grenzen hat das Bild?')}</span></div>`;
  const nachBild = z.bildOk ? `
    <p class="nv3zart">Das Bild stimmt.
      ${gesperrt ? '' : '<button type="button" class="knopf leer" id="nv3bildneu">Bild ändern</button>'}</p>
    <div class="nv3schritt">c wählen</div>`
    : `<div class="nv3bildknoepfe"><button type="button" class="knopf" id="nv3bildpruefen">Bild prüfen</button>
         <button type="button" class="knopf leer" id="nv3hilfeknopf">Bild zeigen (Hilfe)</button></div>
       <ul class="nv3urteil" id="nv3bildurteil"></ul>`;
  feld.innerHTML = !bildDa ? `<div class="nv3rechts">
    <div class="nv3schritt">Das Bild</div>
    <p class="nv3warte">Das Bild folgt, sobald die Angaben links stimmen.</p></div>` : `<div class="nv3rechts">
    <div class="nv3schritt">Das Bild${z.hilfe ? '<span class="nv3hilfe">mit Hilfe</span>' : ''}</div>
    ${fuehr('bild', !z.bildOk)}
    ${bau}
    <div class="nv3wrap" id="nv3wrap"><svg class="nv3svg" id="nv3svg" viewBox="0 0 ${NV3_VB[0]} ${NV3_VB[1]}" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Glockenkurve"></svg></div>
    ${nachBild}
    ${z.bildOk ? `
    ${fuehr('c', !(z.geprueft && z.ok))}
    <div class="nv3cwahl" data-feld="c">${t.c_liste.map(c => `<button type="button" data-c="${c}"
       aria-pressed="${String(c) === String(z.c)}">c = ${c}</button>`).join('')}</div>
    <div class="nv3schritt">Die Gleichung aufstellen</div>
    ${fuehr('gleichung', !(z.geprueft && z.ok))}
    <div class="nv3wahl nv3formwahl" role="group" data-feld="form">${NV3FORM.map(f => `<button type="button" data-form="${f.k}"
       aria-pressed="${z.form === f.k}">${f.name}</button>`).join('')}</div>
    <div class="nv3glbau" id="nv3glbau"></div>
    <ul class="nv3urteil" id="nv3urteil"></ul>
    <div id="nv3ergebnis"></div>` : ''}</div>`;
  /* Die Zeigen-Knoepfe des gefuehrten Beispiels */
  function zeigenBinden(wurzel){
    wurzel.querySelectorAll('[data-zeigen]').forEach(k => k.onclick = () => {
      if (gesperrt) return;
      const L = nv3LoesungEintrag(t), was = k.dataset.zeigen;
      if (was === 'marken'){ z.marks = L.marks; nv3Malen(textEl, z.marks); merk(); return; }
      if (was === 'angaben'){
        ['n', 'p', 'k', 's', 'frage', 'mu', 'sigma'].forEach(f => { z[f] = L[f]; });
        z.angabenGeprueft = true; z.angabenOk = true; merk();
        _nvE2Weiter = {id: t.id, art: 'bild'}; etappe2(); return;
      }
      if (was === 'bild'){ z.bild = L.bild; bildAnnehmen(); return; }
      if (was === 'c'){ z.c = L.c; merk(); etappe2(); return; }
      if (was === 'gleichung'){
        z.form = L.form; z.gl = L.gl; if (!z.c) z.c = L.c; merk(); etappe2();
        const kn = document.getElementById('nv3pruefen'); if (kn) kn.click();
      }
    });
  }
  zeigenBinden(tisch);
  if (!bildDa){
    felderBauen();
    if (z.angabenGeprueft) angabenUrteil();
    document.getElementById('nv3pruefen').onclick = () => {};
    document.getElementById('weiter').onclick = () => { stand.etappe = ETAPPEN.length; los(); };
    loesungsKnopf(() => etappe2());
    nvE2Bedienung(t, z);
    return;
  }
  feld.querySelectorAll('[data-c]').forEach(k => k.onclick = () => {
    z.c = String(z.c) === k.dataset.c ? '' : k.dataset.c;
    feld.querySelectorAll('[data-c]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.c === String(z.c))));
    geaendert();
  });
  feld.querySelectorAll('[data-form]').forEach(k => k.onclick = () => {
    z.form = z.form === k.dataset.form ? '' : k.dataset.form;
    feld.querySelectorAll('[data-form]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.form === z.form)));
    glBauen(); geaendert();
  });
  if (gesperrt) feld.querySelectorAll('[data-c],[data-form]').forEach(x => { x.disabled = true; });
  zeigenBinden(feld);

  const richtig = () => z.geprueft && z.ok;
  /* Nach dem Pruefen des Bildes zeichnet nv3Bild die EIGENE Wahl (Seiten,
     Lage, «?», Prozent der Schraffur, Beschriftung von mu) zusammen mit
     den Feldern. Vorher steht das selbst gebaute Bild da. */
  function bildZeichnen(){
    if (!z.bildOk){ bauZeichnen(); return; }
    // GEAENDERT (FASSUNG CHILBI 2): Die Werte stehen erst im Bild, wenn
    // das Ergebnis offen ist (Rechenschritte oder richtiges Ergebnisfeld).
    const A = nv3Offen(z) ? Object.assign({folge: t.folge}, t.angaben) : null;
    document.getElementById('nv3svg').innerHTML = nv3Bild(Object.assign({}, z, {s: nv3BildProzent(z.bild)}), A);
  }
  const wrap = document.getElementById('nv3wrap');
  function menueZu(){ wrap.querySelectorAll('.nv3menue').forEach(m => m.remove()); }
  function bildUnpruefen(){
    z.bildGeprueft = false;
    const u = document.getElementById('nv3bildurteil'); if (u) u.innerHTML = '';
  }
  function bauNeu(){ bildUnpruefen(); merk(); etappe2(); }
  function bauZeichnen(){
    const svg = document.getElementById('nv3svg');
    svg.innerHTML = nv3BauSvg(b, false);
    wrap.querySelectorAll('.nv3pz,.nv3lab').forEach(x => x.remove());
    menueZu();
    const proz = (x, y) => [x / NV3_VB[0] * 100, y / NV3_VB[1] * 100];
    nv3Bereiche(b).forEach(x => {
      const [l, o] = proz(nv3Zx(x.x), nv3Hy(x.y));
      const d = document.createElement('label');
      d.className = 'nv3pz' + (b.schr[x.k] ? ' schr' : '');
      d.style.left = l + '%'; d.style.top = o + '%';
      d.innerHTML = `<input type="text" inputmode="decimal" spellcheck="false" autocomplete="off"
        aria-label="Prozent in dieser Fläche" value="${nv3Esc(b.proz[x.k])}">%`;
      const inp = d.querySelector('input');
      if (gesperrt) inp.disabled = true;
      inp.addEventListener('input', () => { b.proz[x.k] = inp.value; bildUnpruefen(); merk(); });
      wrap.appendChild(d);
    });
    // Beschriftung: mu (unter der Achse) und die Grenzen (ausser mit «?»)
    const beschrift = (schluessel, name, x, y) => {
      const [l, o] = proz(x, y);
      const d = document.createElement('label');
      d.className = 'nv3lab';
      d.style.left = l + '%'; d.style.top = o + '%';
      const wert = schluessel === 'mu' ? b.mu : b.lab[schluessel];
      d.innerHTML = `<span>${name} =</span><input type="text" class="term" spellcheck="false" autocomplete="off"
        aria-label="${name} beschriften" title="${name}: Wert oder Term" value="${nv3Esc(wert)}">`;
      const inp = d.querySelector('input');
      breite(inp);
      if (gesperrt) inp.disabled = true;
      inp.addEventListener('input', () => {
        if (schluessel === 'mu') b.mu = inp.value; else b.lab[schluessel] = inp.value;
        breite(inp); bildUnpruefen(); merk();
      });
      wrap.appendChild(d);
    };
    if (b.frage !== 'g') nv3Linien(b).forEach(v =>
      beschrift(b.gr === 'zwei' ? (v < 0 ? 'a' : 'b') : 'k', b.gr === 'zwei' ? (v < 0 ? 'a' : 'b') : 'k', nv3Zx(v), NV3_GEO.Y0 + 21));
    beschrift('mu', 'μ', nv3Zx(0), NV3_GEO.Y0 + 49);
    if (gesperrt) return;
    svg.querySelectorAll('[data-ber]').forEach(r => r.addEventListener('click', () => {
      b.schr[r.dataset.ber] = !b.schr[r.dataset.ber];
      bildUnpruefen(); merk(); bauZeichnen();
    }));
    svg.querySelectorAll('[data-ziel]').forEach(g => g.addEventListener('click', e => {
      e.stopPropagation();
      menueZu();
      const art = g.dataset.ziel, hier = b.frage === art;
      const satz = {g: '«?» an die Grenze — sie ist gesucht', mu: '«?» an μ — p ist gesucht',
                    breite: '«?» an die Breite σ — n ist gesucht'}[art];
      const m = document.createElement('div');
      m.className = 'nv3menue';
      m.innerHTML = (hier ? '<button type="button" data-w="weg">«?» wegnehmen</button>'
                          : `<button type="button" data-w="setzen">${satz}</button>`)
                  + '<button type="button" data-w="nichts">Abbrechen</button>';
      const r = wrap.getBoundingClientRect();
      m.style.left = Math.max(0, Math.min(e.clientX - r.left, r.width - 190)) + 'px';
      m.style.top = (e.clientY - r.top + 8) + 'px';
      m.querySelectorAll('button').forEach(k => k.onclick = ev => {
        ev.stopPropagation();
        if (k.dataset.w === 'setzen') b.frage = art;
        else if (k.dataset.w === 'weg') b.frage = null;
        else { menueZu(); return; }
        bildUnpruefen(); merk(); bauZeichnen();
      });
      wrap.appendChild(m);
    }));
  }
  if (!z.bildOk && !gesperrt){
    feld.querySelectorAll('[data-gr]').forEach(k => k.onclick = () => {
      b.gr = b.gr === k.dataset.gr ? '' : k.dataset.gr;
      b.seite = '';
      b.schr = {l: false, m: false, r: false}; b.proz = {l: '', m: '', r: ''};
      if (b.frage === 'g' && !b.gr) b.frage = null;
      bauNeu();
    });
    feld.querySelectorAll('[data-seite]').forEach(k => k.onclick = () => {
      b.seite = b.seite === k.dataset.seite ? '' : k.dataset.seite;
      b.schr = {l: false, m: false, r: false}; b.proz = {l: '', m: '', r: ''};
      bauNeu();
    });
    document.addEventListener('pointerdown', function zu(e){
      if (!document.body.contains(wrap)){ document.removeEventListener('pointerdown', zu); return; }
      if (!e.target.closest('.nv3menue') && !e.target.closest('[data-ziel]')) menueZu();
    });
  }
  if (gesperrt) feld.querySelectorAll('#nv3bau button,#nv3bildpruefen,#nv3hilfeknopf').forEach(x => { x.disabled = true; });
  function bildUrteilZeigen(){
    const p = nv3PruefeBild(t, b);
    document.getElementById('nv3bildurteil').innerHTML = listeHtml(p.u);
    return p;
  }
  function bildAnnehmen(){
    z.bildGeprueft = true; z.bildOk = true; nv3BildUebernehmen(z);
    z.geprueft = false; z.ok = false;
    // NEU (FASSUNG CHILBI): die Fahne fuehrt mit Uhr zu c und Gleichung
    _nvE2Weiter = {id: t.id, art: 'gleichung'};
    merk(); etappe2();
  }
  if (!z.bildOk){
    if (z.bildGeprueft) bildUrteilZeigen();
    document.getElementById('nv3bildpruefen').onclick = () => {
      if (gesperrt) return;
      const p = bildUrteilZeigen();
      z.bildGeprueft = true;
      if (p.alles) bildAnnehmen(); else merk();
    };
    // NEU (gemeinsam entschieden): Rike, 2026-10-16: «man könnte aber als
    // Hilfsknopf das Bild bauen lassen». Das richtige Bild samt
    // Beschriftung, als geprueft, mit dem Vermerk «mit Hilfe»; gesperrt
    // wird nichts.
    document.getElementById('nv3hilfeknopf').onclick = () => {
      if (gesperrt) return;
      z.bild = nv3BildSoll(t); z.hilfe = true;
      bildAnnehmen();
    };
  } else {
    const neu = document.getElementById('nv3bildneu');
    if (neu) neu.onclick = () => {
      z.bildOk = false; z.bildGeprueft = false; z.geprueft = false; z.ok = false;
      merk(); etappe2();
    };
  }

  /* Schritt 5: die Schablone der gewaehlten Form mit den Platzhaltern */
  function glBauen(){
    const el = document.getElementById('nv3glbau');
    if (!el) return;
    if (!z.form){ el.innerHTML = '<p class="nv3warte">Wählen Sie eine Form. Dann füllen Sie die Platzhalter aus, mit Zahlen oder Termen.</p>'; return; }
    z.gl = z.gl || {g: '', mu: '', c: '', s: ''};
    const teile = nv3Schablone(z.form, nv3Unbekannt(z)).map(x => x[0] === '$'
      ? `<span class="nv3f nvm-r" data-feld="gl-${x.slice(1)}"><input type="text" class="term" data-gl="${x.slice(1)}"
          placeholder="${NV3PLATZ[x.slice(1)]}" value="${nv3Esc(z.gl[x.slice(1)])}" spellcheck="false" autocomplete="off"
          aria-label="${NV3PLATZ[x.slice(1)]}" title="${NV3PLATZ[x.slice(1)]}: Zahl oder Term"></span>`
      : `<span class="t">${nv3Esc(x)}</span>`).join('');
    el.innerHTML = `<div class="nv3glzeile">${teile}</div><div class="nv3frow">${einfuegen}</div>`;
    el.querySelectorAll('input.term').forEach(i => {
      breite(i);
      if (gesperrt) i.disabled = true;
      i.addEventListener('input', () => { z.gl[i.dataset.gl] = i.value; breite(i); geaendert(); });
    });
    insBinden(el);
    if (gesperrt) el.querySelectorAll('button').forEach(x => { x.disabled = true; });
  }
  function markenWeg(){
    [tisch, feld].forEach(w => w.querySelectorAll('.nv3f.ok,.nv3f.falsch,.nv3wahl.ok,.nv3wahl.falsch,.nv3cwahl.ok,.nv3cwahl.falsch')
      .forEach(x => x.classList.remove('ok', 'falsch')));
  }
  function unpruefen(){
    if (!z.geprueft || !z.bildOk) return;
    z.geprueft = false; z.ok = false;
    ['nv3urteil', 'nv3ergebnis', 'nv3kasper'].forEach(id => { const e = document.getElementById(id); if (e) e.innerHTML = ''; });
    document.getElementById('befund').textContent = '';
    markenWeg();
  }
  function geaendert(){ unpruefen(); bildZeichnen(); merk(); }

  function urteilZeigen(){
    if (!z.bildOk) return null;
    const p = nv3Pruefe(t, z);
    markenWeg();
    const marken = p.u.concat(p.angaben.u);
    marken.forEach(([ok, , f]) => {
      const el = f && feldEl(f);
      if (el && !el.classList.contains('falsch')) el.classList.add(ok ? 'ok' : 'falsch');
    });
    document.getElementById('nv3urteil').innerHTML = listeHtml(p.u);
    document.getElementById('nv3kasper').innerHTML = '<p class="nv3zart"><b>Eine mögliche Markierung:</b> '
      + t.kasper.map(([k, w]) => `${k}: «${nv3Esc(w)}»`).join(' · ') + '</p>';
    const e = document.getElementById('nv3ergebnis');
    if (!p.alles){ e.innerHTML = ''; return p; }
    ergebnisTeil();
    return p;
  }
  /* GEAENDERT (FASSUNG CHILBI 2, thema.md «Nach der Gleichung»): Nach der
     richtigen Gleichung kommt nicht mehr sofort das Ergebnis, sondern
     ein freiwilliges Ergebnisfeld und - immer - «Rechenschritte zeigen».
     Ergebnissatz, Vergleich und Deutung stehen da, sobald die
     Rechenschritte offen sind oder das eigene Ergebnis stimmt. */
  function ergebnisTeil(){
    const e = document.getElementById('nv3ergebnis');
    if (!e) return;
    const EF = NV.ergebnisfeld, E = t.erg;
    const inp = (f, name) => `<span class="nv3f nvm-r" data-feld="erg-${f}"><span class="nv3fn">${name}</span>`
      + `<input type="text" class="term" data-erg="${f}" value="${nv3Esc(z.erg[f])}" inputmode="decimal" spellcheck="false"
          autocomplete="off" aria-label="Ergebnis ${name}" ${gesperrt ? 'disabled' : ''}></span>`;
    const felder = E.art === 'ab'
      ? `${inp('a', 'a =')}${inp('b', 'b =')}`
      : inp('w', E.art === 'k' ? 'k =' : `${E.art} ${E.rel}`);
    e.innerHTML = `<div class="nv3ergebnis">
      <div class="nv3okzeile">✓ Die Gleichung stimmt.</div>${nv3GlHtml({zeilen: t.gleichung})}
      ${fuehr('ergebnis', false)}
      <div class="nv3schritt">${nvEsc(EF.titel)}</div>
      <p class="nv3zart">${nvEsc(EF.satz)}</p>
      <div class="nv3frow">${felder}<button type="button" class="knopf leer" id="nv3ergpruefen"${gesperrt ? ' disabled' : ''}>${nvEsc(EF.pruefen)}</button></div>
      <ul class="nv3urteil" id="nv3ergurteil"></ul>
      <div class="nv3frow"><button type="button" class="knopf" id="nv3rechknopf" aria-expanded="${z.rechnung}">${nvEsc(z.rechnung ? EF.rechnungZu : EF.rechnung)}</button></div>
      ${z.rechnung ? `<div class="nv3schritt">${nvEsc(EF.rechnungTitel)}</div>${nv3RechHtml(t)}` : ''}
      ${nv3Offen(z) ? `<div class="gross">Normalverteilung: ${nv3Esc(t.ergebnis)}</div>
      <div>${t.vergleich}</div>
      <div><b>Warum weicht das ab — oder warum nicht?</b> <button class="knopf leer" id="nv3deut">Eine Deutung</button></div>
      <div class="nv3deutung" id="nv3deutung" hidden>${t.deutung}</div>` : ''}</div>`;
    const urteil = () => {
      const u = document.getElementById('nv3ergurteil');
      e.querySelectorAll('[data-feld^="erg-"]').forEach(x => x.classList.remove('ok', 'falsch'));
      if (!z.ergGeprueft){ u.innerHTML = ''; return; }
      const p = nv3PruefeErg(t, z);
      if (p.leer){ u.innerHTML = `<li>${nvEsc(EF.leer)}</li>`; return; }
      u.innerHTML = listeHtml(p.u);
      const f = E.art === 'ab' ? ['a', 'b'] : ['w'];
      p.u.forEach(([ok], i) => { const el = e.querySelector(`[data-feld="erg-${f[i]}"]`); if (el) el.classList.add(ok ? 'ok' : 'falsch'); });
    };
    urteil();
    e.querySelectorAll('input[data-erg]').forEach(i => {
      breite(i);
      i.addEventListener('input', () => {
        z.erg[i.dataset.erg] = i.value; breite(i);
        z.ergGeprueft = false; urteil(); merk();
      });
      i.addEventListener('keydown', ev => { if (ev.key === 'Enter') document.getElementById('nv3ergpruefen').click(); });
    });
    document.getElementById('nv3ergpruefen').onclick = () => {
      if (gesperrt) return;
      const p = nv3PruefeErg(t, z), vorher = nv3Offen(z);
      z.ergGeprueft = true; z.ergOk = !p.leer && p.alles; merk();
      if (nv3Offen(z) !== vorher){ ergebnisTeil(); bildZeichnen(); } else urteil();
    };
    document.getElementById('nv3rechknopf').onclick = () => {
      z.rechnung = !z.rechnung; if (!gesperrt) merk();
      ergebnisTeil(); bildZeichnen();
      const r = e.querySelector('.nv3rs'); if (r) r.scrollIntoView({block: 'nearest', behavior: 'smooth'});
    };
    const d = document.getElementById('nv3deut');
    if (d) d.onclick = () => { const x = document.getElementById('nv3deutung'); x.hidden = !x.hidden; };
  }

  felderBauen();
  if (z.angabenGeprueft && !z.geprueft) angabenUrteil();
  bildZeichnen();
  glBauen();
  if (z.geprueft) urteilZeigen();

  document.getElementById('nv3pruefen').onclick = () => {
    if (gesperrt || !z.bildOk) return;
    const p = nv3Pruefe(t, z);
    z.geprueft = true; z.ok = p.alles;
    const neuGeschafft = p.alles && !z.okAlles;
    if (p.alles) z.okAlles = true;
    merk();
    if (neuGeschafft){ etappe2(); }          // der Haken im Reiter
    else { bildZeichnen(); urteilZeigen(); }
    document.getElementById('befund').textContent = p.alles
      ? 'Angaben, Bild, c und Gleichung stimmen.'
      : `${p.u.filter(x => x[0]).length} von ${p.u.length} Punkten stimmen.`;
  };
  document.getElementById('weiter').onclick = () => { stand.etappe = ETAPPEN.length; los(); };
  loesungsKnopf(() => etappe2());
  nvE2Bedienung(t, z);
}

/* NEU (FASSUNG CHILBI): Situationskarte, Auftragsfenster und Fahne in
   Etappe 2. Die Fahne fuehrt am Arbeitsort weiter:
     - Angaben eben richtig geprueft: «Weiter zum Bild →», mit Uhr;
     - Bild eben richtig geprueft (oder mit Hilfe gebaut): «Weiter zu c
       und Gleichung →», mit Uhr;
     - Aufgabe geloest: «Nächste Aufgabe →» bzw., wenn alle geloest sind,
       «Weiter: Mitnehmen →» - ohne Uhr, damit Ergebnis und Deutung
       gelesen werden. Diese Fahne steht auch nach dem Laden da.
   Die Uhr stellt nur ein Eintrag (_nvE2Weiter), nie das Laden. */
let _nvE2Weiter = null;
function nvE2Bedienung(t, z){
  nvKarteHaken(2, null);
  nvAuftragBeimOeffnen(2);
  // NEU (Rike 2026-10-30, Vorschlag Abschnitt 17 B): der eine Satz
  nvJetztSatz(z.okAlles ? 'Diese Aufgabe ist gelöst. Weiter mit der nächsten.'
    : !z.angabenOk ? 'Markieren Sie im Text, was gegeben ist, und tragen Sie die Angaben links ein, samt μ und σ.'
    : !z.bildOk ? 'Zeichnen Sie rechts das Bild: Wo liegt die Fläche, wo die Grenze, wo das Fragezeichen?'
    : 'Wählen Sie c und stellen Sie die Gleichung auf. Dann «Prüfen».');
  const S = stand.nv3, W = NV_W, frisch = _nvE2Weiter && _nvE2Weiter.id === t.id ? _nvE2Weiter.art : null;
  _nvE2Weiter = null;
  const wache = () => stand.etappe === 1 && stand.nv3.akt === t.id;
  const hin = sel => { nvFahne(null); const el = document.querySelector(sel); if (el) el.scrollIntoView({block: 'start', behavior: 'smooth'}); };
  if (z.okAlles){
    const ids = NV3.aufgaben.map(x => x.id), i = ids.indexOf(t.id);
    const offen = ids.slice(i + 1).concat(ids.slice(0, i)).find(id => !S.a[id].okAlles);
    // GEAENDERT (FASSUNG CHILBI 3): Ist eine Aufgabe geloest, nennt ein
    // Fenster «Geschafft» die naechste offene (einmal je Aufgabe).
    const WA = NV.wegweiser.aufgabe, j = ids.indexOf(offen);
    const o = {n: i + 1, m: j + 1, name: offen ? NV3.aufgaben[j].titel : ''};
    const f = s => s.replace('{n}', o.n).replace('{m}', o.m).replace('{name}', o.name);
    if (offen) nvFahne({notiz: W.naechsteNotiz, knopf: W.naechste,
      tun: () => { nvFahne(null); S.akt = offen; sichern(); etappe2(); },
      fenster: {text: f(WA.text), jetzt: f(WA.jetzt)}, schluessel: 'e2' + t.id,
      haupt: {knopf: f(WA.knopf), tun: () => { nvFahne(null); S.akt = offen; sichern(); etappe2(); }}});
    else nvFahne({notiz: W.mitnehmenNotiz, knopf: W.mitnehmen,
      tun: () => { nvFahne(null); stand.etappe = ETAPPEN.length; los(); },
      fenster: NV.wegweiser.fertig, schluessel: 'e2fertig'});
    return;
  }
  if (frisch === 'bild') return nvFahne({notiz: W.bildNotiz, knopf: W.bild, uhr: true, wache,
    tun: () => hin('#feld .nv3rechts')});
  if (frisch === 'gleichung') return nvFahne({notiz: W.gleichungNotiz, knopf: W.gleichung, uhr: true, wache,
    tun: () => hin('#feld .nv3cwahl')});
  nvFahne(null);
}

/* Kontrolle beim Laden: Besteht die Loesung jede Pruefung, und schreibt
   die Schablone mit den Soll-Eintraegen genau die Hauptzeile des
   Generators? Liefert die Regel fuer c (zweiseitig S, einseitig 2S - 100)
   das c des Generators? */
NV3.aufgaben.forEach(t => {
  const z = nv3LoesungEintrag(t), warn = (...x) => console.warn('Kapitel 8, Etappe 2:', t.id, ...x);
  if (nv3GlText(z) !== t.gleichung[0][0]) warn('Schablone und Generator schreiben verschiedene Gleichungen', nv3GlText(z), t.gleichung[0][0]);
  [['Angaben', nv3PruefeAngaben(t, z)], ['Bild', nv3PruefeBild(t, z.bild)], ['Gleichung', nv3PruefeGl(t, z)]].forEach(([w, p]) => {
    if (!p.alles) warn('Die Lösung besteht die Prüfung nicht:', w, JSON.stringify(p.u.filter(x => !x[0])));
  });
  const A = t.angaben, c = NV3C[A.seiten === 'zwei' ? A.sicherheit : 2 * A.sicherheit - 100];
  if (c !== A.c) warn('c passt nicht zur Sicherheit', c, A.c);
});

/* ───────── Die Bilder zum Mitnehmen ─────────
   Etappe 1 zeichnet der Kern selbst (Karten in Zeilen). Etappe 2 hat
   keine Karten: Hier entsteht je bearbeitete Aufgabe ein Abschnitt mit
   den Angaben, dem Bild und der Gleichung, aus dem Stand gezeichnet. */
const NV3_BILD = {papier: '#f8f4ec', tinte: '#2d2924', matt: '#6c6357', linie: '#d8cdb8',
                  akzent: '#9867A5', toenung: '#f3ecf5', gruen: '#2E7D32'};
const NV3_SCHRIFT = "'Fira Sans', 'Segoe UI', sans-serif";

function nv3Umbrechen(g, text, breit, gross, fett){
  g.font = `${fett ? '600 ' : ''}${gross}px ${NV3_SCHRIFT}`;
  const zeilen = [];
  let z = '';
  String(text || '').split(/\s+/).forEach(w => {
    const p = z ? z + ' ' + w : w;
    if (g.measureText(p).width > breit && z){ zeilen.push(z); z = w; } else z = p;
  });
  if (z) zeilen.push(z);
  return zeilen;
}
function nv3SvgBild(inhalt){
  const src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${NV3_VB[0]}" height="${NV3_VB[1]}" viewBox="0 0 ${NV3_VB[0]} ${NV3_VB[1]}">`
    + `<rect width="100%" height="100%" fill="#fffefb"/>${inhalt}</svg>`);
  return new Promise(fertig => {
    const im = new Image();
    im.onload = () => fertig(im); im.onerror = () => fertig(null); im.src = src;
  });
}
function nv3Angefangen(z){
  return Object.keys(z.marks || {}).length || (z.bild && z.bild.gr)
    || ['n', 'p', 'k', 'a', 'b', 's', 'mu', 'sigma', 'seiten', 'c', 'form'].some(f => String(z[f] || '').trim()) || z.frage
    || z.okAlles;
}
function nv3AngabenText(z){
  const w = (f, name) => `${name} = ${z.frage === f ? '?' : (String(z[f] || '').trim() || '…')}`;
  let g;
  if (z.frage === 'g') g = z.seiten === 'zwei' ? 'a ? ≤ X ≤ b ?' : (z.lage === 'unten' ? 'X ≥ ?' : z.lage === 'oben' ? 'X ≤ ?' : '?');
  else if (z.seiten === 'zwei' && !nv3Unbekannt(z)) g = `${z.a || '…'} ≤ X ≤ ${z.b || '…'}`;
  else g = `${z.lage === 'unten' ? 'X ≥' : z.lage === 'oben' ? 'X ≤' : 'k ='} ${String(z.k || '').trim() || '…'}`;
  const sei = z.seiten === 'zwei' ? 'zweiseitig' : z.seiten === 'ein'
    ? 'einseitig' + (z.lage ? (z.lage === 'unten' ? ', untere Grenze' : ', obere Grenze') : '') : 'ein-/zweiseitig offen';
  return [w('n', 'n'), w('p', 'p'), 'Grenze ' + g,
          'Sicherheit ' + (z.frage === 's' ? '?' : (String(z.s || '').trim() || '…')) + (z.frage === 's' ? '' : ' %'),
          'μ = ' + (String(z.mu || '').trim() || '…'), 'σ = ' + (String(z.sigma || '').trim() || '…'),
          sei, 'c = ' + (z.c || '…')].join('   ·   ');
}
/* NEU (FASSUNG CHILBI 2): das eigene Ergebnis fuers Mitnehmen */
function nv3ErgText(t, z){
  const e = z.erg || {}, E = t.erg, v = x => String(x ?? '').trim();
  const roh = E.art === 'ab' ? (v(e.a) || v(e.b) ? `a = ${v(e.a) || '…'}, b = ${v(e.b) || '…'}` : '')
    : (v(e.w) ? `${E.art === 'k' ? 'k =' : E.art + ' ' + E.rel} ${v(e.w)}` : '');
  if (!roh) return '';
  return 'Ihr Ergebnis: ' + roh + (z.ergGeprueft ? (z.ergOk ? '  ✓' : '  ✗') : '');
}
function nv3BildE2(){
  const S = stand.nv3;
  if (!S || !S.a) return null;
  const liste = NV3.aufgaben.filter(t => S.a[t.id] && S.a[t.id].v === 32 && nv3Angefangen(S.a[t.id]));
  if (!liste.length) return null;
  const B = 1000, R = 26, BW = 470, BH = BW * NV3_VB[1] / NV3_VB[0];
  const meng = document.createElement('canvas').getContext('2d');
  // Vorab die Hoehe jedes Abschnitts
  const teile = liste.map(t => {
    const z = S.a[t.id], ok = z.geprueft && z.ok, offen = nv3Offen(z);
    // GEAENDERT (FASSUNG CHILBI 2): Werte und Ergebnis nur, wenn offen
    const A = offen ? Object.assign({folge: t.folge}, t.angaben) : null;
    const text = nv3Umbrechen(meng, t.text, B - 2 * R, 14);
    const angaben = nv3Umbrechen(meng, nv3AngabenText(z), B - 2 * R, 13);
    // Die eigene Gleichung (Form und Platzhalter); die des Generators erst
    // nach dem richtigen Pruefen
    const gl = ok ? {zeilen: t.gleichung}
      : (z.form ? {zeilen: [[nv3GlText(z), 'haupt']]} : {fehlt: 'Die Gleichung ist noch nicht aufgestellt.'});
    const glz = gl.zeilen || [];
    const eigen = nv3ErgText(t, z);
    const rechtsH = gl.fehlt ? 40 : glz.length * 30 + 30 + (offen ? 60 : 0) + (eigen ? 24 : 0);
    const h = 30 + text.length * 20 + 6 + angaben.length * 18 + 10 + Math.max(BH, rechtsH) + 26;
    // Das eigene Bild: gebaut (noch ungeprueft) oder nach dem Pruefen gezeichnet
    const svg = z.bildOk ? nv3Bild(Object.assign({}, z, {s: nv3BildProzent(z.bild)}), A)
                         : nv3BauSvg(z.bild || nv3BildLeer(), true);
    return {t, z, ok, offen, eigen, A, text, angaben, gl, h, bild: nv3SvgBild(svg)};
  });
  const H = R + 44 + teile.reduce((s, x) => s + x.h, 0) + R;
  const c = document.createElement('canvas'), f = 2;
  c.width = B * f; c.height = Math.ceil(H * f);
  const g = c.getContext('2d'); g.scale(f, f);
  g.fillStyle = NV3_BILD.papier; g.fillRect(0, 0, B, H);
  g.textBaseline = 'middle';
  g.font = `600 22px ${NV3_SCHRIFT}`; g.fillStyle = NV3_BILD.akzent;
  g.fillText('Etappe 2 · ' + D.etappen[1].name, R, R + 10);
  let y = R + 44;
  const warte = [];
  teile.forEach(x => {
    g.strokeStyle = NV3_BILD.linie; g.lineWidth = 1;
    g.beginPath(); g.moveTo(R, y); g.lineTo(B - R, y); g.stroke();
    let yy = y + 18;
    g.font = `600 17px ${NV3_SCHRIFT}`; g.fillStyle = NV3_BILD.akzent; g.textAlign = 'left';
    const qu = nvQuelle(x.t.titel, x.t.quelle);
    g.fillText(x.t.titel + (qu ? '  ·  ' + qu : '') + (x.ok ? '   ✓' : '')
               + (x.z.hilfe ? '   (Bild mit Hilfe)' : ''), R, yy);
    yy += 22;
    g.font = `14px ${NV3_SCHRIFT}`; g.fillStyle = NV3_BILD.tinte;
    x.text.forEach(s => { g.fillText(s, R, yy); yy += 20; });
    yy += 6;
    g.font = `13px ${NV3_SCHRIFT}`; g.fillStyle = NV3_BILD.matt;
    x.angaben.forEach(s => { g.fillText(s, R, yy); yy += 18; });
    yy += 4;
    const yb = yy;
    warte.push(x.bild.then(im => { if (im) g.drawImage(im, R, yb, BW, BH); }));
    // Die Gleichung rechts neben dem Bild, im Kartenlayout
    const xr = R + BW + 24, br = B - R - xr, mitte = xr + br / 2;
    let yg = yb + 14;
    if (x.gl.fehlt){
      g.font = `13px ${NV3_SCHRIFT}`; g.fillStyle = NV3_BILD.matt; g.fillText(x.gl.fehlt, xr, yg);
    } else {
      const glz = x.gl.zeilen;
      const haupt = glz.filter(q => q[1] === 'haupt'), kasten = glz.filter(q => q[1] !== 'haupt');
      g.textAlign = 'center'; g.fillStyle = NV3_BILD.tinte;
      haupt.forEach(q => {
        let gr = 19; g.font = `${gr}px ${NV3_SCHRIFT}`;
        while (g.measureText(q[0]).width > br && gr > 11){ gr -= 1; g.font = `${gr}px ${NV3_SCHRIFT}`; }
        g.fillText(q[0], mitte, yg); yg += 30;
      });
      if (kasten.length){
        g.font = `16px ${NV3_SCHRIFT}`;
        const breit = Math.min(br, Math.max(...kasten.map(q => g.measureText(q[0]).width)) + 28);
        const kh = kasten.length * 26 + 12;
        g.fillStyle = NV3_BILD.toenung; g.strokeStyle = NV3_BILD.linie;
        g.fillRect(mitte - breit / 2, yg - 13, breit, kh); g.strokeRect(mitte - breit / 2, yg - 13, breit, kh);
        g.textAlign = 'left';
        const grz = kasten.filter(q => q[1] === 'grenze');
        const lw = grz.length ? Math.max(...grz.map(q => g.measureText(q[0].slice(0, q[0].indexOf(' = ') + 2)).width)) : 0;
        const x0 = mitte - breit / 2 + 14;
        yg += 6;
        kasten.forEach(q => {
          if (q[1] === 'folge' && !grz.length){
            g.textAlign = 'center'; g.fillStyle = NV3_BILD.akzent; g.fillText(q[0], mitte, yg); g.textAlign = 'left';
          } else if (q[1] === 'folge'){ g.fillStyle = NV3_BILD.tinte; g.fillText(q[0], x0, yg); }
          else {
            const i = q[0].indexOf(' = ');
            g.fillStyle = NV3_BILD.akzent;
            g.textAlign = 'right'; g.fillText(q[0].slice(0, i + 2), x0 + lw, yg);
            g.textAlign = 'left'; g.fillText(q[0].slice(i + 3), x0 + lw + 5, yg);
          }
          yg += 26;
        });
        yg += 10;
      }
      if (x.eigen){
        g.textAlign = 'left'; g.fillStyle = NV3_BILD.tinte; g.font = `13px ${NV3_SCHRIFT}`;
        g.fillText(x.eigen, xr, yg + 8); yg += 22;
      }
      if (x.offen){
        g.textAlign = 'left'; g.fillStyle = NV3_BILD.akzent;
        nv3Umbrechen(g, 'Normalverteilung: ' + x.t.ergebnis, br, 14, true).forEach(s => { g.fillText(s, xr, yg + 8); yg += 20; });
      }
    }
    g.textAlign = 'left';
    y += x.h;
  });
  return Promise.all(warte).then(() => c);
}

if (typeof mitnehmen === 'function'){
  const _nvMitnehmenKern = mitnehmen;
  // eslint-disable-next-line no-global-assign
  mitnehmen = function(){
    try {
      const b2 = nv3BildE2(); if (b2) mitbringsel[2] = b2; else delete mitbringsel[2];
    } catch (fehler){ console.error('Kapitel 8: Bild zum Mitnehmen', fehler); }
    _nvMitnehmenKern();
    // Etappe 2 ist keine Sortierung - der Kopf sagt, was mitkommt (wie Kapitel 7).
    const kasten = document.querySelector('.start.mitnehmen');
    if (!kasten) return;
    const h2 = kasten.querySelector('h2'), lage = kasten.querySelector('p.lage');
    if (h2) h2.textContent = 'Nehmen Sie Ihre Ergebnisse mit';
    if (lage){
      const t = [];
      if (mitbringsel[1]) t.push('Etappe 1: Ihre Zeilen mit Bild und Gleichung.');
      if (mitbringsel[2]) t.push('Etappe 2: je bearbeitete Aufgabe Ihre Angaben, das Bild und die Gleichung.');
      t.push('Für Ihre Notizen als PDF.');
      lage.textContent = t.join(' ');
    }
  };
}

ETAPPEN.push(etappe1, etappe2);
