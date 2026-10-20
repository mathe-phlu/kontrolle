/* Die drei Etappen von Kapitel 6 — Zufallsgroessen.

   FASSUNG 9 (verbindlich, 2026-10-17, thema.md «FASSUNG 9 - weniger
   Zuege, ein Feld je Etappe»), Etappe 1 und 2 seit FASSUNG 11 (thema.md
   «FASSUNG 11 - Farbcodes in Etappe 1, Etappe 2 ‹Anders als die
   Garderobe?›» und die Ergaenzung «Teil B als Kaertchen»). Die aelteren
   Fassungen stehen in Git.

   Der Faden: die SAMMLUNG. Jede Verteilung, die in Etappe 1 und 2
   fertig ist, kommt als kleines Histogramm in ein Band ueber der Buehne
   (zgrSammlungHtml). Etappe 3 arbeitet mit ihr. Das Band erscheint erst
   mit der ersten fertigen Verteilung (6.1).

   Ein gesicherter Stand von vor Fassung 11 wird verworfen, die Seite
   meldet das kurz (zgrStandPruefen).

   FASSUNG 11.1 (thema.md «Bedienung wie in Kapitel 5»): Auftragsfenster
   je Etappe (zgrAuftragKopf), Weiter-Fahne am Arbeitsort mit Uhr
   (zgrFahne), nachrangige, ausgegraute Wahl oben (zgrFortHaken,
   Schrittleiste), Rechnung bei direkten richtigen Werten mit kurz
   leuchtenden Pfaden (zgrPfadRechnung, zgrLeuchten), Geruestbau «mit
   Anleitung / selbststaendig». Ein Stand aus Fassung 11 bleibt gueltig.

   E1  (FASSUNG 10, 11) Die Garderobe an der Chilbi - EIN Feld ohne
       Scrollen (zgrEinFeld): beide Baeume kompakt (zgrBaum,
       ohneRechnung), unter jedem die waagrechte Tabelle X | P mit
       Rechnung in der Zelle (zgrVertQuer). Falsche Werte sind erlaubt;
       «Pruefen» gibt gestufte Hinweise (zgrE1Hinweise). Erst wenn beide
       Verteilungen stimmen: das Histogramm von selbst, dann (FASSUNG 12.2)
       das Zusammenklappen im Baum nach Jacken, Ebene fuer Ebene
       (zgrKlappen), dann «Wie haengen die beiden
       Baeume zusammen?», «Eine moegliche Sicht». Die Wette als Zusatz.
   E2  (FASSUNG 15) eine Reihe von sieben Situationen: je der blaue Satz,
       beide Baeume (zgrWegBaum, zwei Stufen), Schritt 1 «In beiden
       Baeumen anfangen» (ab Situation 6 freiwillig), beim Korbwurf «Baeume
       uebereinanderlegen» (zgrE2Decken), dann die Feststellung. Am Schluss
       die Uebersicht (zgrE2Schluss), freiwillig «Und im Skript?»
       (zgrE2Skript). Teil A/B aus Fassung 11 bis 14 stehen in Git.
   E3  Welche Bude lohnt sich? (Fassung 14) Zug 1 sieben Buden nach
       Augenmass auf die Landkarte, aufdecken (Linie zur wahren Lage), EIN
       Rechenschema Pflicht. Zug 2 die wahren Lagen, vier Fragen, eine
       moegliche Sicht, dazu freiwillig die Sammlung auf einer Landkarte
       fuer X (zgrXKarte, Fassung 11). Zusatz Baukasten. Die Schrittleiste steht
       nur hier, weil nur Etappe 3 Zuege hat.

   Kartenbilder gibt es seit Fassung 7 keine. Die Bilder zum Mitnehmen
   zeichnet dieses Kapitel selbst (ganz unten), wie Kapitel 5.
*/

/* ───────── Brueche ───────── */
const zgrGgT = (a, b) => { a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; } return a || 1; };
function zgrBruch(z, n){ if (n < 0){ z = -z; n = -n; }
  const g = zgrGgT(z, n); return [z / g, n / g]; }
const zgrMal   = (a, b) => zgrBruch(a[0] * b[0], a[1] * b[1]);
const zgrPlus  = (a, b) => zgrBruch(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const zgrGleich = (a, b) => a[0] * b[1] === b[0] * a[1];
const zgrZahl  = b => b[0] / b[1];
const zgrBruchText = b => b[1] === 1 ? String(b[0]) : b[0] + '/' + b[1];

/* Was in ein Astfeld geschrieben wird, als Bruch.
   Erlaubt: 1/3, 0.5, 0,5, 50 %, 0, 1 - und die Bruchzeichen ⅓ ½ usw.
   Gibt null zurueck, wenn nichts Lesbares dasteht. */
const ZGR_ZEICHEN = {'½':[1,2],'⅓':[1,3],'⅔':[2,3],'¼':[1,4],'¾':[3,4],
                     '⅙':[1,6],'⅚':[5,6],'⅛':[1,8]};
function zgrLies(txt){
  if (txt === undefined || txt === null) return null;
  let t = String(txt).replace(/\s+/g, '').replace(',', '.');
  if (!t) return null;
  if (ZGR_ZEICHEN[t]) return ZGR_ZEICHEN[t].slice();
  let prozent = false;
  if (t.endsWith('%')){ prozent = true; t = t.slice(0, -1); }
  let w = null;
  const b = t.match(/^(\d+)\/(\d+)$/);
  if (b){ if (+b[2] === 0) return null; w = zgrBruch(+b[1], +b[2]); }
  else if (/^\d+(\.\d*)?$|^\.\d+$/.test(t)){
    const [g, d = ''] = t.split('.');
    w = zgrBruch(parseInt((g || '0') + d, 10), Math.pow(10, d.length));
  } else return null;
  if (prozent) w = zgrBruch(w[0], w[1] * 100);
  return w;
}
/* Ist der Eintrag dezimal geschrieben? Dann wird auch dezimal gezeigt. */
const zgrDezimal = txt => /[.,%]/.test(String(txt || ''));
/* Gilt ein Eintrag als richtig? Gerundete Dezimalzahlen (0.33, 33 %)
   werden angenommen - geprueft wird das Verstaendnis, nicht die Ziffer. */
const zgrTrifft = (w, soll) => w && Math.abs(zgrZahl(w) - zgrZahl(soll)) < 0.006;
/* Fuer Summen gerundeter Eintraege etwas grosszuegiger. */
const zgrNahe = (a, b) => Math.abs(a - b) < 0.011;

function zgrBruchHtml(w){
  if (!w) return '?';
  if (w[1] === 1) return String(w[0]);
  return `<span class="zb"><i>${w[0]}</i><i>${w[1]}</i></span>`;
}
function zgrDezText(v){ return String(+v.toFixed(4)); }
/* Eine Zahl so zeigen, wie sie eingetragen wurde: Bruch oder dezimal. */
const zgrZeig = (w, dez) => !w ? '?' : dez ? zgrDezText(zgrZahl(w)) : zgrBruchHtml(w);
const zgrZeigText = (w, dez) => !w ? '?' : dez ? zgrDezText(zgrZahl(w)) : zgrBruchText(w);
const zgrEsc = s => String(s == null ? '' : s).replace(/[&<>"]/g,
  c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ───────── Die sechs Rueckgaben ───────── */
const ZGR_R = () => D.e1.rueckgaben;          // z. B. "acb": Anna a, Ben c, Clara b
const zgrEigene = i => D.e1.jacken[i];
const zgrX = r => [...r].filter((j, i) => j === zgrEigene(i)).length;

/* ───────── Stil (eingehaengt; der Kern bleibt unberuehrt) ───────── */
(function zgrStil(){
  if (document.getElementById('zgr-stil')) return;
  const s = document.createElement('style');
  s.id = 'zgr-stil';
  s.textContent = `
    .zb{display:inline-flex;flex-direction:column;vertical-align:middle;
        line-height:1.02;font-size:.86em;text-align:center;margin:0 .1em}
    .zb i{font-style:normal;padding:0 .15em}
    .zb i:first-child{border-bottom:1px solid currentColor}
    .zgr-zart{color:var(--matt);font-size:13px}
    .zgr-bau{position:relative;margin:6px 8px 10px;font-size:14px}
    .zgr-sicht{margin:0 14px 10px;padding:9px 14px;border:1px solid var(--linie);
        border-radius:9px;background:var(--karte);font-size:14px;line-height:1.45;
        max-height:34vh;overflow:auto;flex:0 0 auto}
    .zgr-sicht ul{margin:4px 0 0;padding-left:18px}
    .zgr-sicht p{margin:4px 0}
    .zgr-baum{position:relative}
    .zgr-baum .zgr-linien{position:absolute;left:0;top:0;pointer-events:none}
    .zgr-kopf{position:absolute;top:0;transform:translateX(-50%);font-size:13px;
        color:var(--matt);white-space:nowrap}
    .zgr-weg,.zgr-zurueck{border:none;background:none;cursor:pointer;
        color:var(--matt);font:inherit;padding:0 3px}
    .zgr-weg:hover,.zgr-zurueck:hover{color:var(--falsch)}
    .zgr-knoten{position:absolute;width:24px;height:24px;margin:-12px 0 0 -12px;
        border-radius:50%;border:1.2px solid #8a8279;background:#fffefb;
        font:13px/21px var(--druck);text-align:center;cursor:pointer;padding:0;
        color:var(--tinte)}
    .zgr-knoten.wurzel{width:12px;height:12px;margin:-6px 0 0 -6px;
        background:var(--tinte);border:none}
    .zgr-knoten:hover,.zgr-knoten.gewaehlt{border-color:var(--akzent);
        box-shadow:0 0 0 3px rgba(0,101,169,.18)}
    .zgr-feld{position:absolute;width:52px;height:24px;margin-top:-12px;
        font:14px var(--druck);text-align:center;border:1px solid var(--linie);
        border-radius:6px;background:#fff;padding:0 2px;box-sizing:border-box}
    .zgr-feld:focus,.zgr-label:focus,.zgr-ausdruck:focus{outline:none;border-color:var(--akzent)}
    .ok.zgr-feld,.ok.zgr-ausdruck{border:2px solid var(--richtig);background:#eef7ef}
    .falsch.zgr-feld,.falsch.zgr-ausdruck{border:2px solid var(--falsch);background:#fbeeec}
    .zgr-feld:disabled,.zgr-label:disabled{color:var(--tinte);background:#faf6ef}
    .zgr-weg{position:absolute;margin-top:-10px;font-size:14px;line-height:20px}
    .zgr-grau{position:absolute;margin-top:-9px;font-size:12px;color:#b3a894;
        font-style:italic;white-space:nowrap}
    .zgr-stumpf{position:absolute;margin-top:-10px;font-size:12px;color:#b3a894;
        white-space:nowrap}
    .zgr-stumpf.falsch{color:var(--falsch);font-weight:600}
    .zgr-stumpf.ok{color:var(--richtig)}
    .zgr-x{position:absolute;margin-top:-12px;display:flex;align-items:center;gap:4px;
        font-size:13.5px;white-space:nowrap}
    .zgr-x .zgr-feld{position:static;width:36px;margin:0}
    .zgr-rechnung{position:absolute;margin-top:-13px;font-size:14px;white-space:nowrap;
        line-height:26px;color:var(--tinte)}
    .zgr-hinweisx{position:absolute;margin-top:12px;font-size:11.5px;color:var(--falsch);
        white-space:nowrap}
    .zgr-tabelle{border-collapse:collapse;margin:8px 0 4px;font-size:14px;background:#fffefb}
    .zgr-tabelle td,.zgr-tabelle th{padding:5px 10px;border-bottom:1px solid #eee4d3;white-space:nowrap}
    .zgr-tabelle th{font-weight:500;color:var(--matt);text-align:left}
    .zgr-tabelle td:first-child{color:var(--matt)}
    .zgr-tabelle tr.ok td{background:#eef7ef}
    .zgr-tabelle tr.falsch td{background:#fbeeec}
    .zgr-tabelle tr.summe td{border-top:1.5px solid var(--linie)}
    .zgr-titel{font-family:var(--hand);font-size:17px;color:var(--matt);margin:10px 8px 2px}
    .zgr-text{margin:6px 12px 10px;line-height:1.5}
    .zgr-box{margin:8px 10px;padding:9px 12px;border:1px solid var(--linie);
        border-radius:9px;background:var(--karte);line-height:1.45}
    .zgr-abz .rg{display:inline-block;margin:3px;padding:4px 6px;border-radius:7px;
        border:1px solid var(--linie);background:#fff;text-align:center;min-width:64px}
    .zgr-abz .rg b{font-size:17px;letter-spacing:.35em;font-weight:500}
    .zgr-abz .rg small{display:block;font-size:11px;color:var(--akzent);min-height:14px}
    .zgr-abz .rg.aus{opacity:.25}
    .zgr-abz .namen{font-size:11px;color:var(--matt)}
    .zgr-plan label{display:block;font-size:13px;color:var(--matt);margin:2px 0 4px}
    .zgr-plan textarea{width:100%;box-sizing:border-box;min-height:90px;font:inherit;
        border:1px solid var(--linie);border-radius:8px;padding:6px 8px;background:#fff}
    .zgr-plan textarea:disabled{background:#faf6ef;color:var(--tinte)}
    .zgr-hilfe{font:inherit;font-size:13px;border:1px solid var(--linie);background:var(--karte);
        border-radius:8px;padding:5px 10px;cursor:pointer;color:var(--tinte);margin:2px 10px}
    .zgr-hilfe:hover{border-color:var(--akzent);color:var(--akzent)}
    .zgr-modus{display:flex;gap:0;margin:4px 10px 6px}
    .zgr-modus button{font:inherit;font-size:13.5px;padding:5px 12px;border:1px solid var(--linie);
        background:var(--karte);cursor:pointer;color:var(--matt)}
    .zgr-modus button:first-child{border-radius:8px 0 0 8px}
    .zgr-modus button:last-child{border-radius:0 8px 8px 0;border-left:none}
    .zgr-modus button[aria-pressed=true]{background:var(--akzent);color:#fff;border-color:var(--akzent)}
    .zgr-liste td{padding:3px 4px;border-bottom:1px solid #eee4d3}
    .zgr-liste input{font:14px var(--druck);border:1px solid var(--linie);border-radius:6px;
        padding:3px 6px;background:#fff;box-sizing:border-box}
    .zgr-liste input:disabled{background:#faf6ef;color:var(--tinte)}
    .zgr-hinweise{margin:6px 10px;padding:8px 12px;border-radius:9px;font-size:14px;line-height:1.45;
        border:1px solid var(--linie);background:#fffefb}
    .zgr-hinweise.gut{border-color:var(--richtig);background:#eef7ef}
    .zgr-hinweise ul{margin:2px 0;padding-left:18px}
    /* Etappe 3 */
    .zgr-rechen{margin:8px 10px;padding:8px 12px;border:1px solid var(--linie);border-radius:9px;
        background:var(--karte)}
    .zgr-rechen .zeile{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .zgr-rechen .was{font-size:14.5px;min-width:64px}
    .zgr-ausdruck{font:15px var(--druck);border:1px solid var(--linie);border-radius:7px;
        padding:5px 8px;background:#fff;flex:1 1 220px;min-width:160px;box-sizing:border-box}
    .zgr-rechen .zeigt{font-size:14px;color:var(--tinte);margin:5px 0 0 2px;min-height:18px}
    .zgr-rechen .zeigt.leer{color:#b3a894}
    .zgr-rechen .tipp{font-size:13px;color:var(--falsch);margin-top:4px}
    .zgr-rechen .frage{font-size:14px;margin:0 0 6px;line-height:1.4}
    .zgr-satz{margin:6px 10px;padding:7px 10px;border:1px solid var(--linie);border-radius:9px;
        background:#fff;font-size:14px;line-height:1.4}
    .zgr-satz .zgr-wahlz{display:flex;gap:6px;margin-top:5px}
    .zgr-satz .zgr-wahlz button{font:inherit;font-size:13px;padding:3px 10px;border-radius:7px;
        border:1px solid var(--linie);background:var(--karte);cursor:pointer;color:var(--tinte)}
    .zgr-satz .zgr-wahlz button[aria-pressed=true]{background:var(--akzent);color:#fff;border-color:var(--akzent)}
    .zgr-satz.ok{border:2px solid var(--richtig);background:#f4faf4}
    .zgr-satz.falsch{border:2px solid var(--falsch);background:#fdf5f3}
    .zgr-satz .warum{font-size:13px;color:var(--matt);margin-top:4px}
    .zgr-hist{display:flex;flex-wrap:wrap;gap:8px;margin:6px 10px}
    .zgr-hist img{background:#fffefb;border:1px solid var(--linie);border-radius:9px}
    .zgr-wurf{border-collapse:collapse;margin:6px 0;font-size:12px}
    .zgr-wurf td{width:26px;height:22px;text-align:center;border:1px solid #eee4d3;background:#fff}
    .zgr-wurf td.an{background:#dbe9f5;font-weight:600}
    .zgr-wurf th{font-weight:500;color:var(--matt);padding:0 4px}
    /* Etappe 1, Zug 3: von Omega zu X */
    .zgr-xkopf{position:absolute;left:10px;top:50%;transform:translateY(-50%);
        font:600 16px var(--druck);color:var(--akzent);white-space:nowrap}
    .zgr-unter{position:absolute;left:8px;right:8px}
    .zgr-unter .zgr-box{margin:0 0 8px}
    .zgr-unter img{background:#fffefb;border:1px solid var(--linie);border-radius:9px;
        max-width:100%;height:auto}
    .zgr-zaehl{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-start}
    .zgr-zaehl .zgr-tabelle{margin:0}
    /* Etappe 3: Schaetzen, Landkarte, Baukasten (Fassung 5.1) */
    .zgr-schaetz{margin:4px 10px 6px;background:#fffefb;border:1px solid var(--linie);
        border-radius:9px;padding:4px 6px;touch-action:none;user-select:none;
        -webkit-user-select:none;outline:none;max-width:min(560px,max(300px,calc((100vh - 390px) * 1.8)))}
    .zgr-schaetz:focus-visible{border-color:var(--akzent);box-shadow:0 0 0 3px rgba(0,101,169,.18)}
    .zgr-schaetz svg{display:block;width:100%;height:auto}
    .zgr-schaetz.fest{cursor:default}
    .zgr-bauk{cursor:ns-resize}
    .zgr-bauk .zahlen{text-align:center;font-size:15px;margin:2px 0 3px}
    .zgr-schaetzunten{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin:2px 10px 8px;
        max-width:560px}
    .zgr-schaetzunten .zgr-zart{font-size:12.5px}
    .zgr-abw{flex:1 1 100%;padding:7px 12px;border:1px solid var(--linie);border-radius:9px;
        background:var(--karte);font-size:14px;line-height:1.5}
    .zgr-abw .wahr{color:var(--falsch)}
    .zgr-nav{display:flex;gap:8px;flex:1 1 100%}
    .zgr-wahl{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:5px;margin:4px 10px 8px}
    .zgr-wahl button,.zgr-auftrag{font:inherit;font-size:13.5px;text-align:left;padding:5px 8px;
        border:1px solid var(--linie);border-radius:8px;background:var(--karte);cursor:pointer;color:var(--tinte)}
    .zgr-wahl button .nr,.zgr-auftrag .nr{display:inline-block;min-width:1.4em;color:var(--matt)}
    .zgr-wahl button.an,.zgr-auftrag.an{border:2px solid var(--akzent);background:#eef4fa}
    .zgr-wahl .ok,.zgr-auftrag .ok{color:var(--richtig);font-weight:600}
    .zgr-auftraege{display:flex;flex-direction:column;gap:6px;margin:4px 10px 8px}
    .zgr-auftrag{display:flex;gap:4px;line-height:1.4}
    .zgr-auftrag.ok{border-color:var(--richtig)}
    .zgr-auftrag.falsch{border-color:var(--falsch)}
    .zgr-stapel{display:flex;flex-wrap:wrap;gap:8px;margin:6px 10px;min-height:20px}
    .zgr-hk{width:124px;box-sizing:border-box;background:#fff;border:1px solid var(--linie);border-radius:8px;
        padding:3px 3px 2px;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;
        box-shadow:0 1px 2px rgba(0,0,0,.08);outline:none}
    .zgr-hk svg{display:block;width:100%;height:auto}
    .zgr-hk .name{font-size:12px;text-align:center;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .zgr-hk:focus-visible{border-color:var(--akzent);box-shadow:0 0 0 3px rgba(0,101,169,.25)}
    .zgr-hk.zieht{z-index:1000;cursor:grabbing;box-shadow:0 6px 16px rgba(0,0,0,.18)}
    .zgr-hk.auf{position:absolute;width:92px;padding:2px;z-index:2}
    .zgr-hk.auf .name{font-size:10.5px}
    .zgr-hk.ok{border:2px solid var(--richtig)}
    .zgr-hk.falsch{border:2px solid var(--falsch)}
    .zgr-ebene{position:relative;margin:4px 10px 8px;background:#fffefb;border:1px solid var(--linie);
        border-radius:9px;overflow:hidden}
    .zgr-ebenebild svg{display:block}
    .zgr-unterzeile{font-size:13px;color:var(--matt);margin:0 10px 6px}
    /* Fassung 6: die Sammlung, Tabellen zum Eintragen, Rechenschema */
    .zgr-sammlung{display:flex;align-items:center;gap:6px;margin:0 14px 6px;font-size:12px;
        overflow-x:auto;flex:0 0 auto;scrollbar-width:thin}
    .zgr-sammlung .kopf{font-family:var(--hand);font-size:15px;color:var(--matt);white-space:nowrap;margin-right:2px}
    .zgr-sk{display:inline-flex;align-items:center;gap:4px;flex:0 0 auto;border:1px solid var(--linie);
        border-radius:7px;padding:1px 7px 1px 2px;background:#fff;white-space:nowrap;height:30px;box-sizing:border-box}
    .zgr-sk svg{display:block;width:50px;height:26px}
    .zgr-sk.leer{border-style:dashed;background:transparent;padding:1px 8px;gap:6px;color:var(--matt)}
    .zgr-sk.leer .zgr-zart{font-size:11px}
    .zgr-sk.neu{border:2px solid var(--richtig);animation:zgr-neu 1.2s ease-out}
    @keyframes zgr-neu{from{box-shadow:0 0 0 6px rgba(46,125,50,.35)}to{box-shadow:0 0 0 0 rgba(46,125,50,0)}}
    .zgr-eintrag td{vertical-align:middle}
    .zgr-eintrag .zgr-feld{position:static;width:84px;margin:0}
    .zgr-plan.kurz textarea{min-height:52px}
    .zgr-schritte{display:flex;gap:6px;align-items:center;margin:0 10px 4px;font-size:13px;color:var(--matt);flex-wrap:wrap}
    .zgr-schritte .an{color:var(--akzent);font-weight:600}
    .zgr-schritte .fertig{color:var(--richtig)}
    .zgr-schemabox{overflow-x:auto}
    .zgr-schema{font-size:13.5px}
    .zgr-schema td,.zgr-schema th{padding:4px 6px;vertical-align:top}
    .zgr-schema th{white-space:normal;font-size:12.5px;line-height:1.25}
    .zgr-schema td:nth-child(1),.zgr-schema td:nth-child(2){padding-top:9px}
    .zgr-schema .vor{display:block;font-size:12px;color:var(--matt)}
    .zgr-zelle{font:14px var(--druck);width:96px;border:1px solid var(--linie);border-radius:6px;
        padding:3px 5px;background:#fff;box-sizing:border-box}
    .zgr-zelle:focus{outline:none;border-color:var(--akzent)}
    .zgr-zelle.ok{border:2px solid var(--richtig);background:#eef7ef}
    .zgr-zelle.falsch{border:2px solid var(--falsch);background:#fbeeec}
    .zgr-zelle:disabled{color:var(--tinte)}
    .zgr-schema .wert{font-size:11.5px;color:var(--matt);min-height:13px;white-space:nowrap}
    /* Fassung 6.1: der freie Baum, schlicht */
    .zgr-punkt{position:absolute;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;
        background:#8a8279}
    .zgr-punkt.wurzel{width:14px;height:14px;margin:-7px 0 0 -7px;background:var(--tinte)}
    .zgr-punkt.falsch{background:var(--falsch);box-shadow:0 0 0 4px rgba(192,57,43,.2)}
    .zgr-plus{position:absolute;margin-top:-15px;width:30px;height:30px;border-radius:50%;
        border:1.5px solid var(--akzent);background:#fff;color:var(--akzent);cursor:pointer;
        font:600 21px/26px var(--druck);padding:0;text-align:center}
    .zgr-plus:hover,.zgr-plus:focus-visible{background:var(--akzent);color:#fff;outline:none}
    .zgr-plus.gross{width:auto;border-radius:15px;padding:0 14px 0 10px;font-size:15px;line-height:27px}
    .zgr-plus.gross b{font-size:21px;vertical-align:-2px;margin-right:4px}
    .zgr-label{position:absolute;height:24px;font:13.5px var(--druck);border:1px solid var(--linie);
        border-radius:6px;background:#fff;padding:0 5px;box-sizing:border-box}
    .zgr-label::placeholder,.zgr-feld::placeholder,.zgr-pfeld::placeholder{color:#c2b7a5}
    .zgr-pfeld{position:absolute;width:58px;height:24px;font:14px var(--druck);text-align:center;
        border:1px solid var(--linie);border-radius:6px;background:#fff;padding:0 2px;box-sizing:border-box}
    .zgr-pfeld:focus{outline:none;border-color:var(--akzent)}
    .zgr-pfeld.warn{border:2px solid var(--falsch);background:#fbeeec}
    .zgr-pfeld:disabled,.zgr-label:disabled{color:var(--tinte);background:#faf6ef}
    .zgr-wegfrei{position:absolute;border:none;background:none;cursor:pointer;color:#a39985;
        font:12px var(--druck);padding:0 2px;line-height:24px;white-space:nowrap}
    .zgr-wegfrei:hover{color:var(--falsch);text-decoration:underline}
    .zgr-drei{display:flex;flex-wrap:wrap;gap:8px 14px;margin:4px 10px 6px}
    .zgr-drei .spalte{flex:1 1 200px;min-width:0}
    .zgr-drei .kopf{font-size:13px;color:var(--matt);margin:0 0 2px 2px}
    .zgr-drei .zgr-tabelle{margin:0;width:100%}
    .zgr-drei .zgr-tabelle td{white-space:normal;padding:4px 6px}
    .zgr-drei .zgr-tabelle td:first-child{white-space:nowrap}
    .zgr-sammlung{flex-wrap:wrap;row-gap:3px}
    .zgr-sammlung .satz{flex:1 1 260px;font-size:12.5px;color:var(--matt);order:9;min-width:0}
    /* Fassung 7: allgemeiner Baum, Verteilung mit Rechnung, aufgefaechert */
    .zgr-stufenkopf{line-height:1.15;text-align:center;font-size:12.5px}
    .zgr-stufe{position:absolute;top:36px;font-size:12px;color:var(--matt);white-space:nowrap;
        display:flex;gap:4px;align-items:center}
    .zgr-stufe .zgr-feld{position:static;width:46px;margin:0}
    .zgr-astwert{position:absolute;margin-top:-11px;width:44px;text-align:center;font-size:13.5px;color:var(--tinte)}
    .zgr-vrech td{vertical-align:middle;padding:4px 6px}
    .zgr-vrech .zgr-ausdruck{flex:none;width:190px;min-width:0;padding:4px 7px;font-size:14px}
    .zgr-vrech .wert{color:var(--matt);font-size:13.5px;min-width:56px}
    .zgr-vrech tr.ok td,.zgr-vrech tr.falsch td{background:none}
    .zgr-lage{font-size:13.5px;line-height:1.4}
    .zgr-abz .viele .rg{min-width:50px;padding:2px 4px;margin:2px}
    .zgr-abz .viele .rg b{font-size:14px;letter-spacing:.2em}
    .zgr-abz .viele .rg small{font-size:10px}
    .zgr-abz .zgr-zu{float:right;border:none;background:none;font-size:20px;line-height:1;cursor:pointer;color:var(--matt)}
    .zgr-abz .zgr-zu:hover{color:var(--falsch)}
    .zgr-marke{margin-top:-17px;display:flex;align-items:center;gap:6px;padding:3px 8px;border:2px solid var(--linie);
        border-radius:8px;background:#fff;cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;
        white-space:nowrap;font-size:12.5px;outline:none}
    .zgr-marke b{font-size:15px;letter-spacing:.12em;font-weight:600}
    .zgr-marke .nach{font-weight:600}
    .zgr-marke.gewaehlt,.zgr-marke:focus-visible{box-shadow:0 0 0 3px rgba(0,101,169,.3)}
    .zgr-marke.ok{outline:2px solid var(--richtig);outline-offset:2px}
    .zgr-marke.falsch{outline:2px dashed var(--falsch);outline-offset:2px}
    .zgr-marke.zieht{z-index:1000;box-shadow:0 6px 16px rgba(0,0,0,.18);cursor:grabbing}
    .zgr-zone{margin-top:-17px;min-height:34px;box-sizing:border-box;display:flex;align-items:center;gap:5px;
        padding:2px 8px;border:2px dashed;border-radius:8px;background:#fffefb;cursor:pointer;font-size:12.5px;
        white-space:nowrap;outline:none}
    .zgr-zone:focus-visible{box-shadow:0 0 0 3px rgba(0,101,169,.3)}
    .zgr-zone .pfad{font-weight:600;letter-spacing:.1em;font-size:14px}
    .zgr-tag{border:none;color:#fff;border-radius:6px;padding:3px 7px;font:600 13px var(--druck);cursor:pointer;letter-spacing:.08em}
    .zgr-skelett .zgr-knoten{cursor:default}
    /* Fassung 8: Lage ueber beiden Baeumen, Histogramm selbst, Gewinnplan, Skript */
    .zgr-gemeinsam{margin:0 14px 6px;padding:6px 12px;border:1px solid var(--linie);border-radius:9px;
        background:var(--karte);flex:0 0 auto}
    .zgr-wahlx{display:flex;flex-wrap:wrap;gap:6px;margin:2px 10px 6px}
    .zgr-wahlx button{font:inherit;font-size:14px;padding:4px 12px;border-radius:8px;border:1px solid var(--linie);
        background:var(--karte);cursor:pointer;color:var(--tinte)}
    .zgr-wahlx button[aria-pressed=true]{background:var(--akzent);color:#fff;border-color:var(--akzent)}
    .zgr-hzbild{cursor:ns-resize;max-width:min(520px,max(300px,calc((100vh - 400px) * 1.9)))}
    .zgr-hztab{margin:0 10px}
    .zgr-hzt td{padding:4px 6px;vertical-align:top}
    .zgr-hzt .zgr-zelle{width:78px}
    .zgr-hzt .wert{font-size:11.5px;color:var(--matt);min-height:13px}
    .zgr-planbox{margin-top:6px}
    .zgr-plantitel{font-size:13px;color:var(--matt);margin-bottom:2px}
    .zgr-plan{margin:0;font-size:13.5px}
    .zgr-plan td{padding:2px 6px;text-align:center}
    .zgr-plan td:first-child{text-align:left;white-space:normal;min-width:64px;max-width:92px;line-height:1.2}
    .zgr-wahl .zgr-zusatz{grid-column:1/-1;border-style:dashed;font:inherit;font-size:13.5px;text-align:left;
        padding:5px 8px;border-radius:8px;background:transparent;cursor:pointer;color:var(--matt);border-color:var(--linie)}
    .zgr-wahl .zgr-zusatz.an{border:2px solid var(--akzent);background:#eef4fa;color:var(--tinte)}
    .zgr-faelle{margin:6px 0 0;padding-left:18px}
    .zgr-skript .zgr-satz{margin:6px 10px 8px}
    .zgr-skript .zgr-wahlz{flex-wrap:wrap}
    .zgr-ergebnis{font-size:14px}
    /* Fassung 8.1: Schrittleiste, Wegwahl rechts, Geruest selbst bauen */
    .zgr-sleiste{display:flex;flex-wrap:wrap;align-items:center;gap:4px;margin:0 14px 6px;font-size:12.5px;flex:0 0 auto}
    .zgr-sleiste .vor{color:var(--matt);margin-right:3px}
    .zgr-sleiste .st{font:inherit;padding:2px 10px;border-radius:999px;border:1px solid var(--linie);color:var(--matt);
        background:#fff;cursor:pointer;white-space:nowrap}
    .zgr-sleiste .st:hover:not([disabled]),.zgr-sleiste .st:focus-visible{border-color:var(--akzent);color:var(--akzent);outline:none}
    .zgr-sleiste .st.jetzt{border-color:var(--akzent);background:var(--akzent);color:#fff;font-weight:600}
    .zgr-sleiste .st.fertig{color:var(--richtig)}
    .zgr-sleiste .st.jetzt.fertig{color:#fff}
    .zgr-sleiste .st[disabled]{opacity:.45;cursor:default}
    .zgr-sleiste .pt{color:#c9bda8}
    .zgr-wegwahl{display:flex;flex-wrap:wrap;gap:12px;margin:8px 10px 6px}
    .zgr-wegwahl button{flex:1 1 220px;font:inherit;text-align:left;padding:16px 18px;border:2px solid var(--linie);
        border-radius:12px;background:var(--karte);cursor:pointer;color:var(--tinte);line-height:1.35}
    .zgr-wegwahl button b{display:block;font-size:19px;font-weight:600;color:var(--akzent);margin-bottom:4px}
    .zgr-wegwahl button span{font-size:14px;color:var(--matt)}
    .zgr-wegwahl button:hover,.zgr-wegwahl button:focus-visible{border-color:var(--akzent);background:#eef4fa;outline:none}
    .zgr-wegwahl button[aria-pressed=true]{border-color:var(--akzent);background:#eef4fa}
    .zgr-ihrweg{margin:2px 10px 4px;font-size:14px}
    .zgr-geruest .zeile{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;margin:6px 0}
    .zgr-geruest .stufe{border-top:1px solid #eee4d3;padding:6px 0 4px}
    .zgr-geruest .kopfz{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;font-size:14px}
    .zgr-geruest .aeste{display:flex;flex-wrap:wrap;gap:6px;margin:5px 0 0 2px}
    .zgr-geruest input{font:14px var(--druck);border:1px solid var(--linie);border-radius:6px;padding:3px 6px;background:#fff;box-sizing:border-box}
    .zgr-geruest input:focus{outline:none;border-color:var(--akzent)}
    .zgr-geruest input.kopf{width:170px}
    .zgr-geruest input.ast{width:78px;text-align:center}
    .zgr-geruest input.warn{border:2px solid var(--falsch);background:#fbeeec}
    .zgr-geruest .meldung{font-size:13px;color:var(--falsch)}
    .zgr-pm{display:inline-flex;align-items:center;border:1px solid var(--linie);border-radius:8px;background:#fff;overflow:hidden}
    .zgr-pm button{font:600 16px/1 var(--druck);width:28px;height:26px;border:none;background:var(--karte);cursor:pointer;color:var(--akzent);padding:0}
    .zgr-pm button:hover:not([disabled]){background:var(--akzent);color:#fff}
    .zgr-pm button[disabled]{opacity:.35;cursor:default}
    .zgr-pm b{min-width:26px;text-align:center;font-weight:600}
    .zgr-gsumme{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;margin:4px 10px;font-size:14px}
    .zgr-knoten.lang{border-radius:12px;padding:0 4px;font-size:12.5px;white-space:nowrap}
    .zgr-knmenue{position:absolute;z-index:5;margin-top:-14px;display:flex;flex-direction:column;gap:3px;padding:6px;
        background:#fff;border:1px solid var(--akzent);border-radius:9px;box-shadow:0 4px 12px rgba(0,0,0,.15);font-size:13px}
    .zgr-knmenue button{font:inherit;text-align:left;border:1px solid var(--linie);border-radius:7px;background:var(--karte);
        padding:3px 9px;cursor:pointer;color:var(--tinte);white-space:nowrap}
    .zgr-knmenue button:hover{border-color:var(--akzent);color:var(--akzent)}
    .zgr-knmenue .kopf{color:var(--matt);font-size:12px;white-space:nowrap}
    .zgr-knmenue .zu{position:absolute;right:3px;top:1px;border:none;background:none;padding:0 4px;font-size:16px;color:var(--matt)}
    .zgr-skelett2 .zgr-knoten:not(.wurzel){cursor:pointer}
    .zgr-warum{margin-top:5px;font-size:13px;color:var(--matt)}
    .zgr-warum summary{cursor:pointer;color:var(--akzent)}
    .zgr-warum p{margin:3px 0 0;color:var(--tinte)}
    .zgr-liste24{margin:6px 0 2px;font-size:13px}
    .zgr-liste24 summary{cursor:pointer;color:var(--akzent)}
    .zgr-liste24 .namen{font-size:12px;color:var(--matt);margin:4px 0}
    .zgr-meldung{position:fixed;left:50%;top:12px;transform:translateX(-50%);z-index:3000;max-width:min(560px,calc(100vw - 32px));
        padding:9px 36px 9px 14px;border:1px solid var(--akzent);border-radius:10px;background:#fff;
        box-shadow:0 6px 18px rgba(0,0,0,.18);font-size:14px;line-height:1.4}
    .zgr-meldung button{position:absolute;right:6px;top:4px;border:none;background:none;font-size:20px;cursor:pointer;color:var(--matt)}
    /* Fassung 9: ein Feld je Etappe, eine Bude nach der anderen, vier Histogramme */
    .zgr-e1{padding:0 4px 12px}
    .zgr-spalten{display:flex;flex-wrap:wrap;gap:4px 22px;align-items:flex-start}
    .zgr-spalte{flex:0 0 auto;width:min-content;max-width:100%;min-width:0}
    .zgr-spalte .zgr-vrech .zgr-ausdruck{width:170px}
    .zgr-abschnitt{margin:12px 6px 6px;padding-top:4px;border-top:1px dashed var(--linie)}
    .zgr-titel.gross{font-size:19px;color:var(--akzent)}
    .zgr-zeile{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center;margin:6px 10px}
    .zgr-hinweise .zgr-hilfe{margin:5px 0 0}
    .zgr-hinweise li+li{margin-top:3px}
    .zgr-satz .zgr-wahlz{flex-wrap:wrap}
    .zgr-fortschritt{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 14px 6px;font-size:13px;
        color:var(--matt);flex:0 0 auto}
    .zgr-fortschritt b{color:var(--tinte);font-weight:600}
    .zgr-fortschritt .pkt{display:inline-block;min-width:20px;height:20px;line-height:18px;text-align:center;
        border-radius:50%;border:1px solid var(--linie);background:#fff;font-size:11.5px;box-sizing:border-box}
    .zgr-fortschritt .pkt.jetzt{border-color:var(--akzent);background:var(--akzent);color:#fff}
    .zgr-fortschritt .pkt.fertig{color:var(--richtig);border-color:var(--richtig)}
    .zgr-fortschritt .pkt.jetzt.fertig{color:#fff;background:var(--richtig)}
    .zgr-vorschau{margin:4px 10px 6px}
    .zgr-vorschau img{display:block;max-width:100%;height:auto;background:#fffefb;border:1px solid var(--linie);border-radius:9px}
    .zgr-vier{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px;margin:6px 10px}
    .zgr-vier .karte{border:1px solid var(--linie);border-radius:10px;background:var(--karte);padding:6px 6px 8px;min-width:0}
    .zgr-vier .karte .zgr-schaetz{margin:4px 0;max-width:none}
    .zgr-vier .kopf{font-weight:600;margin:0 4px 2px}
    .zgr-vier .zgr-plantitel{font-size:12px;margin:0 4px}
    .zgr-vier .zgr-plan{font-size:12.5px;margin:0 4px}
    .zgr-vier .ergebnis{font-size:13px;line-height:1.4;margin:2px 4px 0}
    .zgr-vier .ergebnis .wahr{color:var(--falsch)}
    .zgr-vergleich .mini{display:flex;flex-wrap:wrap;gap:4px 8px;align-items:center;margin:6px 0}
    .zgr-vergleich .mini > div{flex:1 1 140px;min-width:0}
    .zgr-vergleich .mini svg{flex:0 0 auto;background:#fff;border:1px solid var(--linie);border-radius:7px}
    .zgr-hk .werte{font-size:10.5px;color:var(--matt);text-align:center;line-height:1.2}
    /* Fassung 10: Etappe 1 ohne Scrollen, Deckung Ebene fuer Ebene */
    .zgr-e1{display:flex;flex-wrap:wrap;gap:4px 16px;align-items:flex-start;padding:0 2px 2px}
    .zgr-e1links{flex:0 0 auto;max-width:100%}
    .zgr-e1rechts{flex:1 1 260px;min-width:240px;overflow:auto;padding:6px 4px 4px 0}
    .zgr-e1 .zgr-spalten{gap:0 12px}
    .zgr-e1 .zgr-titel{margin:2px 8px 0;font-size:16px}
    .zgr-e1 .zgr-bau{margin:0 4px 0}
    .zgr-quer{margin:0 6px 2px}
    .zgr-quer .zgr-tabelle{margin:0}
    .zgr-quer th{color:var(--matt);font-weight:500;padding:2px 6px 2px 2px;text-align:left}
    .zgr-quer td{padding:2px 3px 0;text-align:center;vertical-align:top;border-bottom:none}
    .zgr-quer tr:first-child td,.zgr-quer tr:first-child th{border-bottom:1px solid #eee4d3;font-weight:600}
    .zgr-quer tr:first-child td{color:var(--tinte)}
    .zgr-quer .zgr-zelle{width:84px;height:26px;text-align:center}
    .zgr-quer .zgr-zelle:focus{text-align:left}
    .zgr-e1.eng .zgr-quer .zgr-zelle{width:62px}
    .zgr-e1.eng .zgr-quer td{padding:2px 2px 0}
    .zgr-quer .wert{font-size:12px;color:var(--matt);min-height:15px;line-height:15px;white-space:nowrap}
    .zgr-quer .wert.warn{color:var(--falsch)}
    .zgr-qtext{font-size:12.5px;margin:0 2px 6px;line-height:1.35}
    .zgr-ebenen{margin:4px 6px 0}
    .zgr-e1rechts .zgr-hinweise{margin:0 0 6px}
    .zgr-e1rechts .zgr-zeile{margin:6px 0}
    .zgr-e1rechts .zgr-abschnitt{margin:8px 0 4px}
    .zgr-e1rechts .zgr-titel{margin:4px 0 2px}
    .zgr-e1rechts .zgr-box{margin:4px 0}
    .zgr-e1rechts .zgr-plan textarea{min-height:54px}
    .zgr-deckfrage{margin:0 0 6px;padding:7px 10px;border:1px solid var(--linie);border-radius:9px;background:#fff;
        font-size:14px;line-height:1.4}
    .zgr-dkopf{font-size:12px;color:var(--matt);text-transform:uppercase;letter-spacing:.06em}
    .zgr-deckfrage .frage{font-weight:600;margin:1px 0 4px}
    .zgr-dzeile{display:flex;flex-wrap:wrap;align-items:center;gap:3px 6px;margin:4px 0}
    .zgr-dzeile .pt{color:#c9bda8}
    .zgr-deckfrage input{font:14px var(--druck);width:42px;text-align:center;border:1px solid var(--linie);
        border-radius:6px;padding:2px 3px;background:#fff;box-sizing:border-box}
    .zgr-deckfrage input:focus{outline:none;border-color:var(--akzent)}
    .zgr-deckfrage input:disabled{color:var(--tinte);background:#eef7ef;border-color:var(--richtig)}
    .zgr-dwahl{display:flex;flex-direction:column;gap:4px;margin:2px 0 4px}
    .zgr-dwahl button{font:inherit;font-size:13.5px;text-align:left;padding:4px 9px;border-radius:7px;
        border:1px solid var(--linie);background:var(--karte);cursor:pointer;color:var(--tinte)}
    .zgr-dwahl button[aria-pressed=true]{background:var(--akzent);color:#fff;border-color:var(--akzent)}
    .zgr-dwahl button:disabled{cursor:default}
    .zgr-dwahl button:disabled[aria-pressed=true]{background:var(--richtig);border-color:var(--richtig)}
    .zgr-deckfrage .knopf{margin-top:4px}
    .zgr-chips{display:flex;flex-wrap:wrap;gap:4px;margin:5px 0 2px}
    .zgr-chip{border:2px solid;border-radius:7px;padding:0 7px;font-size:13px;font-weight:600;letter-spacing:.04em;background:#fff}
    .zgr-tipp{font-size:13.5px;margin-top:5px}
    .zgr-tipp.falsch{color:var(--falsch)}
    .zgr-knoten.waehlbar{box-shadow:0 0 0 3px rgba(0,101,169,.3);cursor:pointer}
    .zgr-knoten.f-g{background:#007D57;border-color:#007D57;color:#fff}
    .zgr-knoten.f-y{background:#fff09a;border-color:#d4ac00}
    .zgr-knoten.gewaehlt{box-shadow:0 0 0 4px rgba(0,101,169,.55)}
    .zgr-kreis{position:absolute;width:36px;box-sizing:border-box;border:2px dashed #d4ac00;border-radius:18px;
        pointer-events:none;background:rgba(255,240,154,.25)}
    .zgr-rflabel{position:absolute;font:600 10.5px/12px var(--druck);padding:0 3px;border:1.5px solid;border-radius:5px;
        background:#fff;pointer-events:none;letter-spacing:.04em;z-index:2}
    .zgr-zaehler{font-size:13.5px}
    .zgr-zaehler .g{color:#007D57;font-weight:600}
    .zgr-zaehler .y{color:#9a7b00;font-weight:600}
    .zgr-knoten.waehlbar:hover{background:#eef4fa}
    .zgr-knoten.durch{text-decoration:line-through;color:var(--falsch);border-color:var(--falsch)}
    .zgr-wette{margin:6px 0 2px;font-size:14px}
    .zgr-wette summary{cursor:pointer;color:var(--akzent)}
    /* Fassung 10: Etappe 2 «Fein oder grob?» */
    .zgr-e2schritt .kopf{font-size:12px;color:var(--matt);text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px}
    .zgr-e2schritt .knopf{margin-top:5px}
    .zgr-e2schritt .warum.falsch{color:var(--falsch)}
    .zgr-e2schritt .zgr-plan{margin-top:6px}
    .zgr-e2zahl{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:3px 0;font-size:14px}
    .zgr-e2zahl input{font:14px var(--druck);width:78px;text-align:center;border:1px solid var(--linie);
        border-radius:6px;padding:3px 4px;background:#fff;box-sizing:border-box;flex:0 0 auto}
    .zgr-e2zahl input:focus{outline:none;border-color:var(--akzent)}
    .zgr-e2zahl input:disabled{color:var(--tinte);background:#eef7ef;border-color:var(--richtig)}
    .zgr-e2zahl input.falsch{border:2px solid var(--falsch);background:#fbeeec}
    .zgr-feld.zgr-probe{border:2px solid var(--akzent);background:#eef4fa;box-shadow:0 0 0 3px rgba(0,101,169,.18)}
    .zgr-feld.zgr-probe.ok{border-color:var(--richtig);background:#eef7ef;box-shadow:none}
    .zgr-feld.zgr-probe.falsch{border-color:var(--falsch);background:#fbeeec}
    .zgr-e2schluss{padding:4px 6px 10px;max-width:860px}
    .zgr-uebersicht{margin:6px 10px 10px}
    .zgr-uebersicht th{font-size:13px}
    .zgr-uebersicht td{text-align:center}
    .zgr-uebersicht td:first-child{text-align:left;color:var(--tinte)}
    /* Fassung 11: Farbcodes in Etappe 1 */
    .zgr-code .frage{margin-bottom:2px}
    .zgr-codefeld{position:relative;width:340px;max-width:100%;margin:6px 0 4px}
    .zgr-codetitel{position:absolute;top:0;font-size:12px;color:var(--matt);white-space:nowrap}
    .zgr-codekopf{position:absolute;top:16px;display:flex;gap:2px;font-size:11px;color:var(--matt)}
    .zgr-codekopf span{width:22px;text-align:center}
    .zgr-codelinien{position:absolute;left:0;top:0;pointer-events:none}
    .zgr-coderow{position:absolute;display:flex;gap:2px;align-items:center;padding:0;border:none;background:none;font:inherit}
    .zgr-buchst{width:22px;height:22px;box-sizing:border-box;border:1.5px solid #b3a894;border-radius:5px;background:#fff;
        font:600 14px/19px var(--druck);text-align:center;padding:0;color:var(--tinte)}
    button.zgr-buchst{cursor:pointer}
    button.zgr-buchst:hover,button.zgr-buchst:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(0,101,169,.3)}
    .zgr-buchst.f-g{background:#007D57;border-color:#007D57;color:#fff}
    .zgr-buchst.f-y{background:#fff09a;border-color:#d4ac00}
    button.zgr-rfrow{cursor:pointer;border-radius:6px;padding:1px 3px;margin-left:-3px}
    button.zgr-rfrow:hover,button.zgr-rfrow:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(0,101,169,.3)}
    .zgr-rfrow.leer .zgr-buchst{opacity:.45}
    .zgr-codemarke{font-size:12px;color:var(--matt);margin-left:6px;white-space:nowrap}
    /* Fassung 11: Teil B als Kaertchen-Brett */
    .zgr-bstapel{display:flex;flex-direction:column;gap:8px;margin:6px 8px 10px;min-height:60px;border-radius:9px}
    .zgr-bstapel.ziel{outline:2px dashed var(--akzent);outline-offset:3px}
    .zgr-faecher{display:flex;flex-direction:column;gap:10px;margin:6px 8px 10px}
    .zgr-fach{border:2px dashed var(--linie);border-radius:11px;padding:6px 8px 8px;background:#fffefb;min-height:58px}
    .zgr-fach.ziel{border-color:var(--akzent);cursor:pointer;background:#f4f8fc}
    .zgr-fach > .kopf{font-weight:600;font-size:15px;margin:0 2px 4px}
    .zgr-fach .muster{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:4px}
    .zgr-muster{font-size:12px;color:var(--matt);border:1px dashed var(--linie);border-radius:6px;padding:1px 7px;background:#fff}
    .zgr-fach .zgr-bk{margin-top:6px}
    .zgr-bk{border:1px solid var(--linie);border-radius:9px;background:#fff;padding:6px 9px 7px;font-size:13.5px;
        line-height:1.4;box-shadow:0 1px 2px rgba(0,0,0,.08);outline:none}
    .zgr-bk .griff{cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none}
    .zgr-bk > .griff:first-child{display:flex;align-items:center;gap:6px}
    .zgr-bk .zu{margin-left:auto;border:none;background:none;font-size:18px;line-height:1;cursor:pointer;color:var(--matt);padding:0 3px}
    .zgr-bk .zu:hover{color:var(--falsch)}
    .zgr-bk .satz{margin:2px 0 4px}
    .zgr-bk .knoepfe{display:flex;gap:4px;flex-wrap:wrap}
    .zgr-bk .knoepfe .zgr-hilfe{margin:2px 0;font-size:12.5px;padding:3px 9px}
    .zgr-bk .zgr-hilfe:disabled{opacity:.45;cursor:default}
    .zgr-bk.gewaehlt,.zgr-bk:focus-visible{border:2px solid var(--akzent);box-shadow:0 0 0 3px rgba(0,101,169,.18)}
    .zgr-bk.ok{border:2px solid var(--richtig)}
    .zgr-bk.falsch{border:2px dashed var(--falsch)}
    .zgr-bk.zieht{z-index:3000;box-shadow:0 8px 18px rgba(0,0,0,.2);opacity:.95}
    .zgr-bk .warum{font-size:13px;margin-top:4px}
    .zgr-bk .warum.falsch{color:var(--falsch)}
    .zgr-bhilfe{margin-top:5px;padding:5px 8px;border-radius:8px;background:var(--karte);border:1px solid var(--linie);font-size:13px}
    .zgr-bhilfe .stufe + .stufe{margin-top:6px;padding-top:5px;border-top:1px dashed var(--linie)}
    .zgr-bhilfe .zgr-wahlz{display:flex;gap:5px;margin-top:3px;flex-wrap:wrap}
    .zgr-bhilfe .zgr-wahlz button,.zgr-brueck .zgr-hilfe[aria-pressed=true]{font:inherit;font-size:12.5px}
    .zgr-bhilfe .zgr-wahlz button{padding:2px 9px;border-radius:7px;border:1px solid var(--linie);background:#fff;cursor:pointer;color:var(--tinte)}
    .zgr-bhilfe .zgr-wahlz button[aria-pressed=true],.zgr-brueck .zgr-hilfe[aria-pressed=true]{background:var(--akzent);color:#fff;border-color:var(--akzent)}
    .zgr-brueck{margin:2px 0 4px}
    .zgr-brueck .kopfz{font-size:12px;color:var(--matt)}
    .zgr-brueck .zgr-zeile{margin:3px 0}
    .zgr-brueck .zgr-hilfe{margin:0}
    .zgr-brueck .zgr-tabelle{margin:3px 0;font-size:13px}
    .zgr-bselbst .zgr-bau{margin:4px 0}
    .zgr-bselbst .zgr-vrech .zgr-ausdruck{width:130px}
    .zgr-namen .zgr-e2zahl input{width:260px;max-width:55vw;text-align:left}
    .zgr-namen .zgr-e2zahl{flex-wrap:wrap}
    .zgr-xkarte{margin:10px 10px 8px}
    .zgr-gezeigt{font-size:11px;font-weight:400;color:var(--matt);border:1px dashed var(--linie);border-radius:6px;padding:0 5px;white-space:nowrap}
    .zgr-xkarte summary{cursor:pointer;color:var(--akzent);font-size:14px}
    /* Fassung 11.1: Bedienung wie in Kapitel 5 */
    .auftrag .zgr-auftragknopf{font:inherit;font-size:13px;font-weight:700;border:2px solid var(--akzent);color:var(--akzent);
        background:#fff;border-radius:8px;padding:3px 10px;cursor:pointer;margin-left:8px;white-space:nowrap;flex:0 0 auto}
    .auftrag .zgr-auftragknopf::before{content:'☰ ';font-weight:400}
    .zgr-sauftrag{margin:0 14px 6px;padding:3px 10px;border-radius:7px;background:var(--akzent);color:#fff;font-size:14px;
        line-height:1.35;font-weight:600;flex:0 0 auto}
    .zgr-sauftrag .was{font-weight:700;margin-right:6px;opacity:.85}
    .zgr-fenster{position:fixed;inset:0;z-index:200000;display:flex;align-items:center;justify-content:center;
        background:rgba(45,41,36,.42);padding:12px}
    .zgr-fenster .kasten{position:relative;background:#fff;border-radius:14px;border:2px solid var(--akzent);border-top-width:7px;
        box-shadow:0 10px 36px rgba(0,0,0,.25);width:min(600px,100%);max-height:calc(100vh - 24px);overflow:auto;
        padding:14px 20px 14px;font-size:15px;line-height:1.45;color:var(--tinte)}
    .zgr-fenster h2{margin:0 30px 4px 0;font-size:19px;color:var(--akzent)}
    .zgr-fenster .satz{margin:0 0 8px;font-weight:600;font-size:16px}
    .zgr-fenster ol{margin:0 0 8px;padding-left:24px}
    .zgr-fenster li{margin:0 0 4px}
    .zgr-fenster li::marker{font-weight:700;color:var(--akzent)}
    .zgr-fenster .bsp{color:var(--matt);font-size:13.5px}
    .zgr-fenster .schluss{margin:0 0 10px;padding:5px 10px;border-left:3px solid var(--akzent);background:#fffefb;font-size:14px}
    .zgr-fenster .zu{position:absolute;top:6px;right:8px;width:32px;height:32px;border:0;background:none;font-size:24px;
        line-height:1;color:var(--matt);cursor:pointer;border-radius:8px}
    .zgr-fenster .zu:hover{background:#f3efe6;color:var(--tinte)}
    .zgr-fenster .unten{display:flex;justify-content:flex-end}
    .zgr-fenster .los{font-size:15px;padding:6px 18px}
    .zgr-fahne{position:absolute;right:14px;bottom:12px;z-index:40;display:flex;align-items:center;gap:10px;flex-wrap:wrap;
        max-width:min(460px,calc(100% - 28px));background:#fff;border:2px solid var(--akzent);border-radius:12px;padding:7px 10px 7px 12px;
        box-shadow:0 6px 20px rgba(0,0,0,.18);font-size:14px;animation:zgrfahne .25s ease-out}
    .zgr-fahne .notiz{font-weight:600;color:var(--tinte)}
    .zgr-fahne .knopf{font-size:14.5px;padding:6px 14px;white-space:nowrap}
    .zgr-fahne .uhr{height:3px;flex-basis:100%;background:var(--linie);border-radius:2px;overflow:hidden}
    .zgr-fahne .uhr i{display:block;height:100%;width:100%;background:var(--akzent);animation:zgruhr 1.5s linear forwards}
    @keyframes zgrfahne{from{transform:translateY(8px);opacity:0}to{transform:none;opacity:1}}
    @keyframes zgruhr{from{width:0}to{width:100%}}
    .zgr-fortschritt button.pkt{font:inherit;font-size:11.5px;cursor:pointer;padding:0;color:inherit}
    .zgr-fortschritt button.pkt:hover{border-color:var(--akzent)}
    .zgr-fortschritt.gedimmt .pkt:not(.jetzt),.zgr-sleiste.gedimmt .st:not(.jetzt){opacity:.45;filter:grayscale(1)}
    .zgr-fortschritt.gedimmt .pkt:not(.jetzt):hover,.zgr-sleiste.gedimmt .st:not(.jetzt):hover{opacity:.85}
    .zgr-leuchten{position:absolute;left:0;top:0;pointer-events:none;animation:zgrleucht 1.7s ease-out forwards}
    @keyframes zgrleucht{0%{opacity:0}15%{opacity:1}70%{opacity:1}100%{opacity:0}}
    .zgr-qrech{font-size:12px;color:var(--tinte);min-height:16px;line-height:16px;margin:1px 2px 0;white-space:nowrap;
        overflow:hidden;text-overflow:ellipsis;max-width:100%}
    .zgr-vrech .wert{white-space:normal;max-width:260px}
    .zgr-amodus{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;margin:4px 10px 6px;font-size:13.5px}
    .zgr-amodus.wahl{padding:6px 10px;border:2px solid var(--akzent);border-radius:10px;background:#fff}
    .zgr-amodus .knopf{padding:3px 10px;font-size:13px}
    .zgr-anleitung{margin:4px 10px 6px;padding:5px 10px 5px 8px;border-left:3px solid var(--akzent);background:#fffefb;
        border-radius:0 8px 8px 0;font-size:13.5px;line-height:1.4}
    .zgr-anleitung ol{margin:0;padding-left:20px}
    .zgr-anleitung li{color:var(--matt)}
    .zgr-anleitung li.jetzt{color:var(--tinte);font-weight:600}
    .zgr-anleitung li.fertig{color:var(--richtig)}
    .zgr-anleitung li.fertig::after{content:' ✓'}
    @media (max-height:640px),(max-width:900px){
      .zgr-fenster .kasten{font-size:14px;line-height:1.38;padding:10px 16px 10px}
      .zgr-fenster h2{font-size:17px}
      .zgr-fenster .satz{font-size:14.5px;margin-bottom:5px}
      .zgr-fenster li{margin-bottom:2px}
      .zgr-sauftrag{font-size:12.5px;padding:2px 8px;margin-bottom:4px}
    }
    /* Niedrige Schirme: Der Satz zur Sammlung kostet eine ganze Zeile. */
    @media (max-height:650px){.zgr-sammlung .satz{display:none}
      /* Fassung 11: viele Kaertchen in der Sammlung - nur die Bildchen (Name im Tooltip) */
      .zgr-sk:not(.leer) > span{display:none}.zgr-sk:not(.leer){padding:1px 2px}.zgr-lage{font-size:12.5px}
      .zgr-gemeinsam{padding:3px 10px;cursor:pointer;margin-bottom:4px}
      .zgr-gemeinsam:not(.offen) .zgr-lage{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .zgr-hk.auf{width:74px}.zgr-hk.auf .name{font-size:9.5px}}
    /* NEU (Fassung 11.2, Rike 2026-10-18, «Situationskarte groesser und
       huebscher»): gleich gebaut wie in Kapitel 5 (.bwskarte), nur die
       Kapitelfarbe ist anders. */
    .zgr-skarte{flex:0 0 auto;display:flex;align-items:flex-start;gap:14px;margin:0 14px 8px;
       background:#ebf3f9;background:color-mix(in srgb,var(--akzent) 8%,#fff);border-radius:0 10px 10px 0;
       box-shadow:inset 4px 0 0 var(--akzent);padding:10px 16px 9px 18px}
    .zgr-sbild{flex:0 0 auto;width:76px;height:76px;object-fit:cover;border-radius:8px;mix-blend-mode:multiply;margin-top:2px}
    .zgr-sinhalt{flex:1 1 auto;min-width:0}
    .zgr-skopf{display:flex;flex-wrap:wrap;align-items:center;gap:4px 12px;margin-bottom:2px}
    .zgr-stitel{font-family:var(--hand);font-size:21px;color:var(--akzent);line-height:1.2}
    .zgr-skurz,.zgr-snurzu{display:none}
    .zgr-sklapp{font:inherit;font-size:12px;color:var(--matt);background:none;border:1px solid transparent;border-radius:7px;
       padding:2px 7px;cursor:pointer;white-space:nowrap;margin-left:auto}
    .zgr-sklapp:hover{border-color:var(--linie);background:#fff;color:var(--tinte)}
    .zgr-sklapp::before{content:'▴ '}
    .zgr-skarte.zu .zgr-sklapp::before{content:'▾ '}
    .zgr-stext{margin:0;font-size:17px;line-height:1.5;color:var(--tinte)}
    .zgr-stext b{font-weight:600;background:#fff09a;box-shadow:inset 0 -2px 0 #d4ac00;border-radius:3px;padding:0 2px}
    .zgr-stext .zgr-zart{font-size:14.5px}
    .zgr-sfrage{margin:5px 0 0;font-size:18px;line-height:1.35;font-weight:700;color:var(--akzent)}
    .zgr-sauftragz{display:flex;align-items:center;gap:6px 12px;margin:6px 0 0;padding:4px 0 0;border-top:1px solid rgba(0,0,0,.08);
       font-size:14px;line-height:1.35}
    .zgr-sauftragz p{margin:0;flex:1 1 auto;min-width:0}
    .zgr-sauftragz .was{font-weight:700;color:var(--akzent);margin-right:6px}
    .zgr-skarte .zgr-auftragknopf{font:inherit;font-size:13px;font-weight:700;border:2px solid var(--akzent);color:var(--akzent);
       background:#fff;border-radius:999px;padding:2px 12px;cursor:pointer;white-space:nowrap;flex:0 0 auto}
    .zgr-skarte .zgr-auftragknopf::before{content:'☰ ';font-weight:400}
    .zgr-skarte .zgr-auftragknopf:hover{background:var(--akzent);color:#fff}
    .zgr-skarte.zu{padding:5px 12px 5px 16px;align-items:center}
    .zgr-skarte.zu .zgr-sbild{width:30px;height:30px;margin:0;border-radius:6px}
    .zgr-skarte.zu .zgr-sganz{display:none}
    .zgr-skarte.zu .zgr-skopf{flex-wrap:nowrap;margin:0;cursor:pointer}
    .zgr-skarte.zu .zgr-stitel{font-size:18px;white-space:nowrap}
    .zgr-skarte.zu .zgr-skurz{display:block;flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
       font-weight:700;color:var(--akzent);font-size:15px}
    .zgr-skarte.zu .zgr-snurzu{display:inline-flex}
    .zgr-skarte.zu .zgr-sklapp{margin-left:0}
    @media (max-width:900px),(max-height:650px){
      .zgr-skarte{padding:6px 10px 6px 14px;gap:10px;margin:0 10px 6px}
      .zgr-sbild{width:52px;height:52px}
      .zgr-stitel{font-size:18px}
      .zgr-stext{font-size:15.5px;line-height:1.42}
      .zgr-sfrage{font-size:16px;margin-top:2px}
      .zgr-sauftragz{font-size:13px;margin-top:4px}
      .zgr-skarte.zu .zgr-sbild{width:24px;height:24px}
      .zgr-skarte.zu .zgr-stitel{font-size:16px}
      .zgr-skarte.zu .zgr-skurz{font-size:13.5px}
    }
    /* NEU (Fassung 12): Weg 1 und Weg 2 nebeneinander, die drei
       Feststellungen, das Histogramm in Etappe 1 */
    .zgr-wege{display:flex;flex-wrap:wrap;gap:10px 18px;padding:2px 8px 8px}
    .zgr-wegbox{flex:1 1 230px;min-width:0}
    .zgr-wegbox .titel{font-size:14px;margin:2px 0 2px 4px}
    .zgr-wegbox .titel b{color:var(--akzent);font-family:var(--hand);font-size:18px;font-weight:400}
    .zgr-wegbox .titel span{color:var(--matt);font-size:13px}
    .zgr-wegbox .legende{margin:2px 0 0 4px}
    .zgr-wegsvg{display:block;font-family:var(--druck,'Fira Sans'),sans-serif}
    .zgr-wegbaum{position:relative;flex:0 0 auto}
    .zgr-wegbaum .zgr-wegsvg{position:absolute;left:0;top:0}
    .zgr-wegbaum.skaliert .zgr-wegsvg{position:static;width:100%;height:auto}
    .zgr-wfeld{position:absolute;width:42px;height:22px;box-sizing:border-box;font:12px var(--druck,'Fira Sans'),sans-serif;
       text-align:center;border:1px solid var(--linie);border-radius:5px;background:#fff;padding:0;color:var(--tinte)}
    .zgr-wfeld:focus{outline:none;border-color:var(--akzent);box-shadow:0 0 0 2px rgba(0,101,169,.2)}
    .zgr-wfeld.pflichtfeld{border:2px solid var(--akzent);background:#eef4fa}
    .zgr-wfeld.pflichtfeld.ok,.zgr-wfeld.pflichtfeld:disabled{border-color:var(--richtig);background:#eef7ef;color:var(--tinte)}
    .zgr-wfeld.falsch{border:2px solid var(--falsch)!important;background:#fbeeec!important}
    .zgr-wfeld.frei{border-style:dashed}
    .zgr-wwert{position:absolute;transform:translateX(-50%);font-size:12px;font-weight:600;color:var(--akzent);
       background:rgba(255,255,255,.88);padding:0 2px;border-radius:3px;line-height:17px;white-space:nowrap}
    .zgr-wwert.heikel,.zgr-wwert.korr{color:#b8540a}
    .zgr-wwert.rest{color:#5d7f99;font-weight:400}
    .zgr-wegsvg .kn.pflicht{stroke:var(--akzent);stroke-width:2;fill:#e3eef7}
    .zgr-wegsvg .ast.pflicht{stroke:var(--akzent);stroke-width:1.8}
    .zgr-wegbox{overflow-x:auto}
    /* Fassung 15: der blaue Satz, die Baeume uebereinander (Korbwurf), der Nachtrag */
    .zgr-teilen{margin:2px 10px 6px;padding:6px 10px;border-left:4px solid var(--akzent);background:#eef4fa;
        color:var(--akzent);font-size:14px;line-height:1.4}
    .zgr-wegbox.deckt{overflow:visible}
    .zgr-wegbaum.w2{z-index:2}
    .zgr-wegbaum.w2 .zgr-wegsvg .kn{stroke:var(--richtig);fill:#eef7ee}
    .zgr-wegbaum.w2 .zgr-wegsvg .t{fill:var(--richtig)}
    .zgr-wegbaum.w2 .etk{transition:transform .6s ease}
    .zgr-wegbaum.w2.ruhig .etk{transition:none}
    .zgr-wegbaum.w2.gedeckt .etk{transform:translateY(20px)}
    .zgr-wegbaum.w2.gedeckt .zgr-wfeld,.zgr-wegbaum.w2.gedeckt .zgr-wwert{visibility:hidden}
    .zgr-laplace{color:var(--akzent);font-weight:600;font-size:13.5px}
    /* Fassung 16: Waage, Spiele, Quadrate */
    .zgr-waage svg .balken{transform-box:view-box}
    .zgr-waagefeld{grid-template-columns:minmax(260px,560px)}
    .zgr-waagestatus{margin:4px 4px 0}
    .zgr-nrkreis{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;
        background:var(--akzent);color:#fff;font-size:12px;font-weight:600}
    .zgr-spiele .bild svg{display:block;width:100%;max-width:440px;height:auto}
    .zgr-beispiele{grid-template-columns:repeat(auto-fill,minmax(min(100%,400px),1fr))}
    .zgr-waageteil{margin-top:8px;border-top:1px solid var(--linie);padding-top:6px}
    .zgr-waagekopf{font-weight:600;font-size:14px;margin:0 4px 2px}
    /* Fassung 18: fuenf schmale Karten, das Fenster mit den Waagen, die Landkarte */
    .zgr-fuenf{display:grid;grid-template-columns:repeat(auto-fill,minmax(205px,1fr));gap:8px;margin:6px 10px}
    .zgr-fuenf .karte{border:1px solid var(--linie);border-radius:10px;background:var(--karte);padding:5px 5px 6px;min-width:0}
    .zgr-fuenf .kopf{font-weight:600;font-size:13.5px;margin:0 2px 2px;display:flex;align-items:center;gap:4px;flex-wrap:wrap}
    .zgr-fuenf .zgr-plantitel{font-size:11px;margin:0 2px}
    .zgr-fuenf .zgr-plan{font-size:11px;margin:0 2px}
    .zgr-fuenf .zgr-plan td{padding:1px 3px}
    .zgr-fuenf .zgr-schaetz{margin:3px 0}
    .zgr-fuenf .zgr-schaetz svg{width:100%;height:auto}
    .knopf.klein{font-size:12.5px;padding:3px 9px}
    .zgr-wfenster{position:fixed;inset:0;background:rgba(45,41,36,.35);z-index:3000;display:flex;align-items:center;justify-content:center;padding:12px}
    .zgr-wfenster .kasten{background:#fffefb;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.25);width:min(560px,100%);max-height:100%;
        display:flex;flex-direction:column;padding:10px 12px}
    .zgr-wfenster .kopfzeile{display:flex;align-items:center;justify-content:space-between;font-size:16px}
    .zgr-wfenster .zu{font:inherit;font-size:22px;border:0;background:none;cursor:pointer;line-height:1}
    .zgr-wfenster .inhalt{overflow:auto;min-height:0}
    .zgr-wfenster .inhalt .zgr-schaetz svg{width:100%;height:auto}
    .zgr-kartentip{position:absolute;z-index:5;background:#fff;border:1px solid var(--linie);border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.15);
        padding:5px 7px;font-size:12px;pointer-events:none;width:190px}
    .zgr-kartentip .zgr-plan,.zgr-kartentip .zgr-plantitel{font-size:11px}
    .zgr-kartentabelle{margin:4px 10px 8px;font-size:13px}
    /* Fassung 19: Wahl, Fenster «Alle Buden auf einen Blick», eigene Bude */
    .zgr-wfenster.breit .kasten{width:min(980px,100%)}
    .zgr-wfenster.breit .zgr-landkarte{margin:4px 10px}
    .zgr-legende{display:flex;flex-wrap:wrap;gap:4px 16px;margin:2px 10px 4px;font-size:13px;color:var(--matt)}
    .zgr-legende span{display:inline-flex;align-items:center;gap:4px}
    .zgr-kartentabelle tr.gewaehlt td{background:#fdf1e4}
    .zgr-wahlmarke{font-size:11.5px;color:#a8601c;border:1px solid #E09E5A;border-radius:6px;padding:0 5px;margin-left:3px}
    .zgr-zitat{margin:2px 0 4px;padding:4px 8px;border-left:3px solid #E09E5A;background:#fdf8f0;font-size:13.5px}
    .zgr-wahlliste .zgr-bk.gewaehlt{border:2px solid #E09E5A;box-shadow:0 0 0 3px rgba(224,158,90,.2)}
    .zgr-wahlsatz{max-width:760px}
    .zgr-bude{margin:4px 10px 6px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,330px),1fr));gap:4px 16px;align-items:start}
    .zgr-bude > div{min-width:0}
    .zgr-bude .zgr-einsatz label{font-weight:600}
    .zgr-bude input{font:inherit;font-size:14px;width:56px;padding:2px 4px;border:1px solid var(--linie);border-radius:6px;text-align:right}
    .zgr-bude .zgr-bauk svg,.zgr-budebild svg{display:block;width:100%;max-width:440px;height:auto}
    .zgr-bude .zgr-bauk.fest{cursor:default}
    .zgr-budetab{font-size:12.5px;margin:4px 0;max-width:440px;width:100%}
    .zgr-budetab th,.zgr-budetab td{padding:2px 3px;text-align:center}
    .zgr-budetab th:first-child{text-align:left;font-weight:600;white-space:nowrap}
    .zgr-budetab input{width:100%;min-width:34px;max-width:52px;font-size:13px}
    .zgr-budezahlen{margin:4px 0 0;font-size:14.5px}
    .zgr-weitere{margin:10px 10px 8px}
    .zgr-vier.zgr-spielfeld{grid-template-columns:repeat(auto-fill,minmax(min(100%,380px),1fr))}
    .zgr-decksatz{font-weight:600;font-size:16px;color:var(--akzent);margin:3px 0}
    .zgr-skriptliste{display:flex;flex-direction:column;gap:8px;margin:4px 10px 10px;max-width:860px}
    .zgr-wegsvg .kopf{font-size:11.5px;fill:var(--matt)}
    .zgr-wegsvg .ast{stroke:#8a8279;stroke-width:1.3}
    .zgr-wegsvg .ast.zart{stroke:#c9c0b2;stroke-width:1}
    .zgr-wegsvg .punkt{fill:var(--tinte)}
    .zgr-wegsvg .kn{fill:#fff;stroke:#c9c0b2}
    .zgr-wegsvg .t{font-size:12px;fill:var(--tinte)}
    .zgr-wegsvg .w{font-size:12px;fill:var(--akzent);font-weight:600;paint-order:stroke;stroke:#fff;stroke-width:3px}
    .zgr-wegsvg .w.heikel{fill:#b8540a}
    .zgr-wegsvg .w.frage{fill:#b8540a;font-size:15px;font-weight:700}
    .zgr-wegsvg .zart{font-size:13px;fill:var(--matt)}
    .zgr-e2paar{display:flex;flex-wrap:wrap;align-items:center;gap:6px 16px;margin-top:4px}
    .zgr-e2paar .zgr-e2zahl{justify-content:flex-start}
    .zgr-e2paar .zgr-e2zahl input{width:70px}
    .zgr-e2paar .knopf{margin-top:0}
    .zgr-festwahl{display:flex;flex-direction:column;gap:5px;margin-top:5px}
    .zgr-festwahl button{font:inherit;font-size:14px;text-align:left;padding:5px 10px;border-radius:8px;
       border:1px solid var(--linie);background:#fff;cursor:pointer;color:var(--tinte)}
    .zgr-festwahl button:hover:not(:disabled){border-color:var(--akzent)}
    .zgr-festwahl button[aria-pressed=true]{background:var(--akzent);color:#fff;border-color:var(--akzent)}
    .zgr-festwahl button:disabled{cursor:default}
    .zgr-festwahl button:disabled:not([aria-pressed=true]){opacity:.55}
    .zgr-e2schritt .zgr-box{margin:8px 0 0}
    .zgr-uebersicht td.fest{text-align:left}
    .zgr-e1hist{margin:2px 0 6px}
    /* NEU (Fassung 12.2): Zusammenklappen */
    .zgr-klapplinien{position:absolute;left:0;top:0;pointer-events:none}
    .zgr-klappaus{opacity:0!important;pointer-events:none;transition:opacity .4s}
    .zgr-klappt .zgr-ast,.zgr-klappt .zgr-x{transition:opacity .4s}
    .zgr-klappt .zgr-knoten:not(.wurzel){border-width:2px}
    .zgr-knoten.zgr-rf{background:#f4f8f2;font-weight:700}
    .zgr-klappwert{position:absolute;width:44px;margin-top:-11px;line-height:22px;text-align:center;font-size:13px;
       font-weight:600;color:var(--akzent);background:rgba(255,255,255,.92);border-radius:5px;pointer-events:none}
    .zgr-klappsteuer{font-size:14px}
    /* NEU (Fassung 13): Etappe 3 */
    .zgr-ziel{margin:4px 10px 6px;padding:6px 10px;border-left:4px solid var(--akzent);background:#eef4fa;font-weight:600;font-size:15px}
    /* Fassung 14: Etappe 3, sieben Buden auf der Landkarte */
    .zgr-bliste{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:8px;margin:6px 10px}
    .zgr-bk{border:1px solid var(--linie);border-radius:10px;background:var(--karte);padding:5px 7px 7px;min-width:0;cursor:pointer}
    .zgr-bk.an{border:2px solid var(--akzent);background:#eef4fa}
    .zgr-bliste.fest .zgr-bk{cursor:default}
    .zgr-bk .kopf{display:flex;align-items:center;gap:6px;min-height:26px}
    .zgr-bk .kopf .nr{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;
        background:var(--akzent);color:#fff;font-size:12px;font-weight:600;flex:0 0 auto}
    .zgr-bk .platz:empty{display:none}
    .zgr-bk .platz:not(:empty) ~ .nr,.zgr-bk .platz:not(:empty) ~ b{display:none}
    .zgr-bk.gelegt .kopf::after{content:"✓";color:var(--richtig);font-weight:600;margin-left:auto}
    .zgr-bk .was{font-size:12.5px;color:var(--matt);line-height:1.35;margin:2px 0 3px}
    .zgr-bk .bild svg{display:block;width:100%;max-width:220px;height:auto;background:#fff;border:1px solid var(--linie);border-radius:6px}
    .zgr-bk .bild .unter{font-size:11px;color:var(--matt);margin:1px 0 3px}
    .zgr-bk .zgr-plantitel{font-size:12px}
    .zgr-bk .zgr-plan{font-size:12px}
    .zgr-bk .werte{font-size:12.5px;color:var(--falsch);margin-top:3px;font-weight:600}
    .zgr-bmarke{display:inline-flex;align-items:center;gap:4px;cursor:grab;touch-action:none;user-select:none;
        -webkit-user-select:none;outline:none;border-radius:12px;padding-right:6px;background:#fff;border:1px solid var(--linie);
        font-size:12px;line-height:1;white-space:nowrap;box-shadow:0 1px 2px rgba(0,0,0,.1)}
    .zgr-bmarke .nr{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;
        background:#fff;border:2px solid var(--akzent);color:var(--akzent);font-weight:600;box-sizing:content-box;margin:-1px 0 -1px -1px}
    .zgr-bmarke.an{border-color:var(--akzent);box-shadow:0 0 0 3px rgba(0,101,169,.25)}
    .zgr-bmarke:focus-visible{box-shadow:0 0 0 3px rgba(0,101,169,.35)}
    .zgr-bmarke.zieht{z-index:1000;cursor:grabbing;box-shadow:0 6px 16px rgba(0,0,0,.2)}
    .zgr-bmarke.auf{position:absolute;z-index:2;background:transparent;border-color:transparent;box-shadow:none;padding:0}
    .zgr-bmarke.auf .name{display:none}
    .zgr-bmarke.auf.an .nr,.zgr-bmarke.auf:focus-visible .nr{box-shadow:0 0 0 3px rgba(0,101,169,.3)}
    .zgr-landkarte.fest .zgr-bmarke{cursor:default;pointer-events:none}
    .zgr-landkarte .zgr-bmarke.auf .nr{background:#fff}
    .zgr-muster .karte.frei{opacity:.85;border-style:dashed}
    .zgr-rechner{font-size:12.5px;margin:4px 4px 0;display:flex;flex-wrap:wrap;align-items:center;gap:4px}
    .zgr-rechner input{width:54px;font:12.5px var(--druck);border:1px solid var(--linie);border-radius:5px;padding:2px 4px;text-align:center}
    .zgr-plaetze{gap:8px;align-items:center}
    /* NEU (Fassung 14): E2 Teil A */
    .zgr-kreuz{display:flex;gap:6px;align-items:flex-start;margin:6px 0 2px;font-size:14px;cursor:pointer}
    .zgr-kreuz input{margin-top:3px}
    .zgr-stufenmarke{font-size:12px;color:var(--tinte);background:#fff6d6;border-radius:4px;padding:0 5px;margin-left:4px}
    .zgr-klappsteuer .knopf{margin:6px 6px 2px 0}
    .zgr-klappsteuer .warum.falsch{color:var(--falsch)}
    .zgr-klappfrage{margin-top:4px}
    /* Die Weiter-Fahne unten rechts darf nichts in der rechten Spalte verdecken */
    .zgr-e1rechts{padding-bottom:72px}
    .zgr-e1hist img{display:block;max-width:200px;height:auto}
    /* NEU (Fassung 12): Kopfzeile bei schmalem Fenster (800 px) auf einer
       Zeile - der lange Entwurfsvermerk dieses Kapitels brach sie sonst
       um etwa 46 px hoeher. Nur Abstaende und Umbruch, sonst wie im Kern. */
    @media (max-width:980px){
      header{gap:10px}
      header .streifen{flex-shrink:0}
      header h1,header nav button{white-space:nowrap}
      header nav{gap:4px}
      header nav button{padding-left:9px!important;padding-right:9px!important}
      header .entwurf{font-size:11px!important;white-space:nowrap;min-width:0;overflow:hidden;text-overflow:ellipsis}
    }
  `;
  document.head.appendChild(s);
})();

/* ───────── Ein Schreibfeld ───────── */
function zgrSchreibfeld(label, wert, gesperrt, setzen){
  const r = document.createElement('div');
  r.className = 'zgr-plan zgr-box';
  r.innerHTML = `<label>${label}</label><textarea ${gesperrt ? 'disabled' : ''}></textarea>`;
  const ta = r.querySelector('textarea');
  ta.value = wert || '';
  if (!gesperrt) ta.oninput = () => { setzen(ta.value); };
  return r;
}
function zgrTitel(ziel, t){
  const d = document.createElement('div');
  d.className = 'zgr-titel'; d.textContent = t; ziel.appendChild(d);
  return d;
}

/* ───────── Der allgemeine Baum (FASSUNG 7) ─────────
   Ein Baum kommt fertig aus dem Generator (inhalte.baum_aus): D...baum =
   {stufen, gleich, knoten:[{id, eltern, tiefe, kurz, lang, blatt, w, x,
   hinter}]}. Ein Knoten heisst nach seinem Weg («RF», «ac»), die Wurzel
   ist «» mit eltern = null. Gezeichnet wird ohne Zahlen; eingetragen
   werden die Aeste und X an JEDEM Pfadende. Geprueft wird gegen w und x
   aus dem Generator - die Flaeche rechnet nichts nach, was sie nicht
   zeigen muss.

   Derselbe Baum traegt Etappe 1 (Garderobe nach Jacken und nach
   richtig/falsch) und Etappe 2 (Freiwuerfe, Urne, Wichteln, Penalty).
   Die frueheren Gerueste und der freie Baum (Fassung 6.1) stehen in Git.

   Eintraege m = {p:{id: Text}, x:{id: Text}, s:{tiefe: Text}}. Bei
   T.gleich (Wichteln fein: jede Stufe hat ueberall denselben Wert) wird
   je Stufe einmal eingetragen (m.s), sonst je Ast (m.p).
   Optionen: col, h (Abstaende), abzaehlen(knoten), nurLesen.
   NEU (Fassung 8.1): urteilen() ersetzt die Pruefung gegen w und x (das
   selbst gebaute Geruest hat keine Werte aus dem Generator, siehe
   zgrGeruestPruefen); knotenKlick(k, knopf, baum) fuer das Menue an einem
   Knoten («hier endet der Pfad»). Lange Beschriftungen bekommen einen
   breiteren Knoten.
   NEU (Fassung 10): ohneRechnung - keine Pfadliste rechts, nur X am
   Pfadende (Etappe 1). ast(k) gibt fuer den Ast in k einen Stil
   {farbe, glanz, durch, weg}: farbig, leuchtend hinterlegt,
   durchgestrichen oder ganz ausgeblendet (Deckung Ebene fuer Ebene).
   knotenKlasse(k) haengt eine Klasse an den Knoten, nachZeichnen(baum)
   darf danach Eigenes in den Baum legen. neu() zeichnet mit
   denselben Optionen nochmals; opt darf dazwischen geaendert werden. */
const ZGB = {X0: 14, OBEN: 44, OBEN_GLEICH: 74};
function zgrBaumKinder(T){
  const kinder = {};
  T.knoten.forEach(k => { if (k.eltern !== null) (kinder[k.eltern] = kinder[k.eltern] || []).push(k); });
  return kinder;
}
const zgrBaumNach = T => Object.fromEntries(T.knoten.map(k => [k.id, k]));
const zgrBaumRoh = (T, m, k) => T.gleich ? (m.s || {})[k.tiefe] : (m.p || {})[k.id];
/* Die Pfade fuer zgrTabelle - Flaeche und Bild zum Mitnehmen. */
function zgrBaumPfade(T, m){
  const nach = zgrBaumNach(T);
  return T.knoten.filter(k => k.blatt).map(b => {
    const kette = [];
    for (let k = b; k.eltern !== null; k = nach[k.eltern]) kette.unshift(k);
    return {id: b.id, faktoren: kette.map(k => zgrLies(zgrBaumRoh(T, m, k))),
            dez: kette.some(k => zgrDezimal(zgrBaumRoh(T, m, k))), x: (m.x || {})[b.id]};
  });
}
const zgrBaumBearbeitet = m => !!m && ['p', 'x', 's'].some(f => Object.values(m[f] || {}).some(v => String(v).trim()));

function zgrBaum(ziel, T, m, opt){
  opt = opt || {};
  const COL = opt.col || 120, aendern = !opt.nurLesen;
  let H = opt.h || 38;
  ['p', 'x', 's'].forEach(f => { if (!m[f] || typeof m[f] !== 'object') m[f] = {}; });
  const bau = document.createElement('div');
  bau.className = 'zgr-bau';
  ziel.appendChild(bau);
  const kinder = zgrBaumKinder(T), nach = zgrBaumNach(T), stufen = T.stufen.length;
  const FB = COL < 115 ? 44 : 50;          // Breite eines Astfeldes
  // Halbe Breite eines Knotens: 12 fuer ein Zeichen, breiter fuer «rot»
  const HALB = k => Math.max(12, (String(k.kurz || '').length * 7.6 + 12) / 2);
  let urteil = null;

  function zeichnen(){
    bau.innerHTML = '';
    H = opt.h || 38;                       // darf sich zwischen zwei neu() aendern
    const oben = T.gleich ? ZGB.OBEN_GLEICH : ZGB.OBEN;
    let y = oben;
    const Y = {};
    const lege = k => {
      const ks = kinder[k.id] || [];
      if (!ks.length){ Y[k.id] = y + H / 2; y += H; return; }
      ks.forEach(lege);
      Y[k.id] = (Y[ks[0].id] + Y[ks[ks.length - 1].id]) / 2;
    };
    lege(nach['']);
    const hoehe = y + 6;
    const xk = t => ZGB.X0 + t * COL;
    const xEnde = xk(stufen) + 10 + Math.max(12, ...T.knoten.filter(k => k.blatt && k.tiefe === stufen).map(HALB));
    const breite = xEnde + (opt.ohneRechnung ? 62 : 70 + (opt.rechnung || 150));
    const baum = document.createElement('div');
    baum.className = 'zgr-baum';
    baum.style.width = breite + 'px'; baum.style.height = hoehe + 'px';
    bau.appendChild(baum);

    const L = [], G = [];
    const stil = k => (opt.ast && k.eltern !== null && opt.ast(k)) || {};
    T.knoten.forEach(k => {
      if (k.eltern === null) return;
      const e = nach[k.eltern], st = stil(k);
      if (st.weg) return;
      const cx = xk(k.tiefe);
      const px2 = xk(e.tiefe) + (e.tiefe ? HALB(e) : 3);
      const pkt = `${px2},${Y[e.id]} ${cx - Math.min(94, COL - 44)},${Y[k.id]} ${cx - HALB(k)},${Y[k.id]}`;
      // Leuchten: ein breiter, blasser Strich unter dem Ast
      if (st.glanz) G.push(`<polyline points="${pkt}" fill="none" stroke="${st.glanz}" stroke-width="9" `
        + 'stroke-linecap="round" stroke-linejoin="round" opacity=".28"/>');
      L.push(`<polyline points="${pkt}" fill="none" stroke="${st.farbe || '#8a8279'}" `
        + `stroke-width="${st.farbe ? 3 : 1.3}"${st.durch ? ' stroke-dasharray="5 4"' : ''}/>`);
      if (k.blatt) L.push(`<line x1="${cx + HALB(k)}" y1="${Y[k.id]}" x2="${xEnde - 4}" y2="${Y[k.id]}" `
        + `stroke="${st.durch ? '#C0392B' : '#c9bda8'}" stroke-dasharray="2 3"/>`);
      if (st.durch) L.push(`<line x1="${px2 + 4}" y1="${Y[k.id] - 6}" x2="${cx + 16}" y2="${Y[k.id] + 6}" `
        + 'stroke="#C0392B" stroke-width="2"/>');
    });
    const im = document.createElement('img');
    im.className = 'zgr-linien'; im.alt = ''; im.draggable = false;
    im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${breite}" height="${hoehe}">${G.join('')}${L.join('')}</svg>`);
    im.style.width = breite + 'px'; im.style.height = hoehe + 'px';
    baum.appendChild(im);

    T.stufen.forEach((name, i) => {
      const kp = document.createElement('div');
      kp.className = 'zgr-kopf zgr-stufenkopf'; kp.style.left = (xk(i + 1) - COL * 0.32) + 'px';
      kp.innerHTML = zgrEsc(name).replace(' · ', '<br>');
      baum.appendChild(kp);
      if (!T.gleich) return;
      const sf = document.createElement('label');
      sf.className = 'zgr-stufe'; sf.style.left = (xk(i + 1) - COL * 0.32) + 'px';
      // Die Beschriftung nur an der ersten Stufe, sonst draengen sich
      // Text und Felder (Riesenrad fein, vier Stufen).
      sf.innerHTML = i === 0 ? 'jeder Ast: ' : '';
      const f = document.createElement('input');
      f.className = 'zgr-feld zgr-sfeld'; f.dataset.t = i + 1;
      f.value = m.s[i + 1] || ''; f.placeholder = '?'; f.disabled = !aendern;
      f.setAttribute('inputmode', 'decimal');
      f.oninput = () => { m.s[i + 1] = f.value; geaendert(); };
      sf.appendChild(f);
      baum.appendChild(sf);
    });
    const kx = document.createElement('div');
    kx.className = 'zgr-kopf'; kx.style.left = (xEnde + 8) + 'px'; kx.style.transform = 'none';
    kx.textContent = opt.ohneRechnung ? 'X' : 'X  ·  Wahrscheinlichkeit des Pfads';
    baum.appendChild(kx);

    T.knoten.forEach(k => {
      const cx = xk(k.tiefe), cy = Y[k.id], st = stil(k);
      // Ausgeblendet (Deckung, Ebene 3): Platz bleibt, damit nichts springt
      const zeige = el => { if (st.weg) el.style.visibility = 'hidden'; return el; };
      const kn = zeige(document.createElement('button'));
      kn.className = 'zgr-knoten' + (k.eltern === null ? ' wurzel' : '') + (HALB(k) > 12 ? ' lang' : '')
        + (opt.knotenKlasse ? ' ' + (opt.knotenKlasse(k) || '') : '');
      kn.style.left = cx + 'px'; kn.style.top = cy + 'px';
      if (HALB(k) > 12){ kn.style.width = (2 * HALB(k)) + 'px'; kn.style.marginLeft = (-HALB(k)) + 'px'; }
      kn.textContent = k.kurz;
      kn.title = k.lang || 'Start';
      kn.dataset.id = k.id;
      if (opt.knotenKlick){
        kn.onclick = () => opt.knotenKlick(k, kn, baum);
      } else if (opt.abzaehlen){
        kn.title += ' · Abzählen';
        kn.onclick = () => {
          document.querySelectorAll('.zgr-knoten.gewaehlt').forEach(x => x.classList.remove('gewaehlt'));
          kn.classList.add('gewaehlt');
          opt.abzaehlen(k);
        };
      } else kn.tabIndex = -1;
      baum.appendChild(kn);
      if (k.eltern === null) return;
      if (T.gleich){
        const w = zeige(document.createElement('div'));
        w.className = 'zgr-astwert'; w.dataset.t = k.tiefe;
        w.style.left = (cx - FB - 12) + 'px'; w.style.top = cy + 'px';
        baum.appendChild(w);
      } else {
        const f = zeige(document.createElement('input'));
        f.className = 'zgr-feld zgr-ast'; f.dataset.id = k.id;
        f.style.left = (cx - FB - HALB(k) - 2) + 'px'; f.style.top = cy + 'px'; f.style.width = FB + 'px';
        f.value = m.p[k.id] || ''; f.placeholder = '?'; f.disabled = !aendern;
        f.setAttribute('inputmode', 'decimal');
        f.setAttribute('aria-label', 'Wahrscheinlichkeit: ' + k.lang);
        f.oninput = () => { m.p[k.id] = f.value; geaendert(); };
        baum.appendChild(f);
      }
      if (!k.blatt) return;
      const x = zeige(document.createElement('div'));
      x.className = 'zgr-x'; x.style.left = xEnde + 'px'; x.style.top = cy + 'px';
      x.innerHTML = 'X =';
      const xf = document.createElement('input');
      xf.className = 'zgr-feld zgr-xfeld'; xf.dataset.id = k.id;
      xf.value = m.x[k.id] || ''; xf.placeholder = '?'; xf.disabled = !aendern;
      xf.setAttribute('inputmode', 'numeric');
      const kette = [];
      for (let j = k; j.eltern !== null; j = nach[j.eltern]) kette.unshift(j.kurz);
      xf.setAttribute('aria-label', 'X am Pfadende ' + kette.join(', '));
      xf.oninput = () => { m.x[k.id] = xf.value; geaendert(); };
      x.appendChild(xf);
      baum.appendChild(x);
      if (opt.ohneRechnung) return;
      const r = document.createElement('div');
      r.className = 'zgr-rechnung'; r.dataset.id = k.id;
      r.style.left = (xEnde + 68) + 'px'; r.style.top = cy + 'px';
      baum.appendChild(r);
    });
    rechnen();
    if (opt.nachZeichnen) opt.nachZeichnen(baum);
  }

  /* Pfadprodukte bei jedem Tastendruck neu, ohne neu zu zeichnen. */
  function rechnen(){
    zgrBaumPfade(T, m).forEach(p => {
      const r = bau.querySelector(`.zgr-rechnung[data-id="${CSS.escape(p.id)}"]`);
      if (!r) return;
      p.prod = p.faktoren.every(w => w) ? p.faktoren.reduce((a, w) => zgrMal(a, w), [1, 1]) : null;
      r.innerHTML = p.faktoren.map(w => zgrZeig(w, p.dez)).join(' · ') + ' = '
        + (p.prod ? `<b>${zgrZeig(p.prod, p.dez)}</b>` : '?');
    });
    if (T.gleich) bau.querySelectorAll('.zgr-astwert').forEach(w => {
      const roh = m.s[w.dataset.t], b = zgrLies(roh);
      w.innerHTML = b ? zgrZeig(b, zgrDezimal(roh)) : '?';
    });
  }

  function geaendert(){
    urteil = null;
    bau.querySelectorAll('.ok,.falsch').forEach(e => e.classList.remove('ok', 'falsch'));
    rechnen();
    if (opt.nachAenderung) opt.nachAenderung();
    if (window.sichern) sichern();
  }

  /* Prueft Aeste (bzw. Stufen) und X. Nennt nie die richtige Zahl. */
  function pruefen(){
    if (opt.urteilen){
      const u = opt.urteilen(m);
      ['aeste', 'stufen', 'x'].forEach(f => { if (!u[f]) u[f] = {}; });
      urteil = u; markieren(u);
      return u;
    }
    const u = {aeste: {}, stufen: {}, x: {}, ok: 0, falsch: 0, leer: 0, n: 0,
               xOk: 0, xFalsch: 0, xLeer: 0, xn: 0};
    if (T.gleich){
      for (let t = 1; t <= stufen; t++){
        u.n++;
        const soll = T.knoten.find(k => k.tiefe === t).w, w = zgrLies(m.s[t]);
        if (!w){ u.leer++; continue; }
        const ok = zgrTrifft(w, soll); u.stufen[t] = ok; ok ? u.ok++ : u.falsch++;
      }
    } else T.knoten.forEach(k => {
      if (k.eltern === null) return;
      u.n++;
      const w = zgrLies(m.p[k.id]);
      if (!w){ u.leer++; return; }
      const ok = zgrTrifft(w, k.w); u.aeste[k.id] = ok; ok ? u.ok++ : u.falsch++;
    });
    T.knoten.filter(k => k.blatt).forEach(k => {
      u.xn++;
      const t = String(m.x[k.id] || '').trim();
      if (!t){ u.xLeer++; return; }
      const ok = /^\d+$/.test(t) && +t === k.x;
      u.x[k.id] = ok; ok ? u.xOk++ : u.xFalsch++;
    });
    u.alles = !u.falsch && !u.leer && !u.xFalsch && !u.xLeer;
    urteil = u;
    markieren(u);
    return u;
  }

  function markieren(u){
    bau.querySelectorAll('.ok,.falsch').forEach(e => e.classList.remove('ok', 'falsch'));
    const setze = (sel, ok) => { const f = bau.querySelector(sel); if (f) f.classList.add(ok ? 'ok' : 'falsch'); };
    Object.entries(u.aeste).forEach(([id, ok]) => setze(`.zgr-ast[data-id="${CSS.escape(id)}"]`, ok));
    Object.entries(u.stufen).forEach(([t, ok]) => setze(`.zgr-sfeld[data-t="${t}"]`, ok));
    Object.entries(u.x).forEach(([id, ok]) => setze(`.zgr-xfeld[data-id="${CSS.escape(id)}"]`, ok));
  }

  zeichnen();
  return {pruefen, element: bau, get urteil(){ return urteil; },
          neu(){ zeichnen(); if (urteil) markieren(urteil); }};
}

/* Ein Pruefurteil eines Baums als Satz. */
function zgrBaumSatz(u, gleich){
  const t = [`${gleich ? 'Stufen' : 'Äste'}: ${u.ok} von ${u.n} richtig`
    + (u.leer ? `, ${u.leer} noch leer` : ''),
    `X: ${u.xOk} von ${u.xn} richtig` + (u.xLeer ? `, ${u.xLeer} noch leer` : '')];
  return t.join('. ') + '.';
}

/* ───────── Abzaehlen (Garderobe, Wichteln) ─────────
   Klick auf einen Knoten: alle gleich wahrscheinlichen Ergebnisse, davon
   die hervorgehoben, die bis dorthin moeglich sind - und an jedem, in
   welchen Ast der naechsten Stufe es faellt. Damit laesst sich jede
   bedingte Wahrscheinlichkeit abzaehlen, ohne dass die Zahl dasteht. Die
   Ergebnisse hinter jedem Knoten liefert der Generator (k.hinter). */
function zgrAbzaehlen(T, liste, text){
  const kinder = zgrBaumKinder(T), nach = zgrBaumNach(T);
  return k => {
    const ks = kinder[k.id] || [], drin = k.hinter || [];
    const weg = [];
    for (let j = k; j && j.eltern !== null; j = nach[j.eltern]) weg.unshift(j.lang);
    const kacheln = liste.map(e => {
      const hier = drin.includes(e);
      const c = hier ? ks.find(c => (c.hinter || []).includes(e)) : null;
      return `<span class="rg${hier ? '' : ' aus'}"><b>${e}</b><small>${c ? '→ ' + c.lang : ''}</small></span>`;
    }).join('');
    zgrAbzPanel(`<div><b>Abzählen ${weg.length ? 'nach «' + weg.join(', ') + '»' : 'am Anfang'}</b></div>
      <div class="namen">${text}</div><div class="${liste.length > 8 ? 'viele' : ''}">${kacheln}</div>
      <div class="namen">${drin.length} von ${liste.length} sind hier noch möglich${
        ks.length ? '. Die Marke sagt, in welchen Ast der nächsten Stufe sie fallen.' : '.'}</div>`);
  };
}
function zgrAbzPanel(html){
  let p = document.getElementById('zgrabz');
  if (!p){
    p = document.createElement('div');
    p.id = 'zgrabz'; p.className = 'zgr-sicht zgr-abz';
    document.querySelector('.buehne').insertAdjacentElement('afterend', p);
  }
  p.innerHTML = '<button class="zgr-zu" title="Schliessen" aria-label="Abzählen schliessen">×</button>' + html;
  p.querySelector('.zgr-zu').onclick = () => {
    p.remove();
    document.querySelectorAll('.zgr-knoten.gewaehlt').forEach(x => x.classList.remove('gewaehlt'));
  };
}

/* ───────── Verteilung aus Pfaden (Bild zum Mitnehmen) ─────────
   Ein Pfad ist {faktoren:[Bruch|null], dez, x:'Text'}. Daraus je Wert von
   X die Summe der Pfadwahrscheinlichkeiten. Auf der Flaeche stellen die
   Studierenden die Verteilung seit Fassung 7 selbst auf; zgrTabelle
   braucht nur noch zmBaum. */
function zgrTabelle(pfade){
  const nachK = {};
  let offen = 0, dez = false;
  pfade.forEach(p => {
    p.prod = p.faktoren.length && p.faktoren.every(w => w)
      ? p.faktoren.reduce((a, w) => zgrMal(a, w), [1,1]) : null;
    if (p.dez) dez = true;
    const t = String(p.x || '').trim();
    if (!/^-?\d+$/.test(t)){
      if (!(p.prod && p.prod[0] === 0)) offen++;
      return;
    }
    (nachK[+t] = nachK[+t] || []).push(p);
  });
  const ks = [...new Set([0,1,2,3, ...Object.keys(nachK).map(Number)])].sort((a, b) => a - b);
  let gesamt = [0,1], gesamtBekannt = true;
  const zeilen = ks.map(k => {
    const teile = nachK[k] || [];
    const bekannt = teile.every(p => p.prod);
    const s = bekannt ? teile.reduce((a, p) => zgrPlus(a, p.prod), [0,1]) : null;
    if (s) gesamt = zgrPlus(gesamt, s); else gesamtBekannt = false;
    return {k, teile, summe: s};
  });
  return {zeilen, gesamt: gesamtBekannt ? gesamt : null, offen, dez};
}

/* ───────── Die Verteilung selbst aufstellen (FASSUNG 7) ─────────
   Je Wert von X ein Feld fuer eine Rechnung («1/6 + 1/6») oder eine Zahl,
   darunter der Wert. `werte` = {k: Text} im Stand. Geprueft gegen die
   Verteilung aus dem Generator. */
function zgrVertRechnen(ziel, ks, werte, o){
  o = o || {};
  const box = document.createElement('div');
  box.className = 'zgr-bau';
  box.innerHTML = '<table class="zgr-tabelle zgr-vrech">'
    + ks.map(k => `<tr data-k="${k}"><td>P(X = ${k}) =</td><td><input class="zgr-ausdruck" data-k="${k}" `
      + `placeholder="${o.platz || 'Rechnung oder Zahl'}" aria-label="P(X = ${k})"></td><td class="wert"></td></tr>`).join('')
    + '<tr class="summe"><td>Summe</td><td colspan="2" class="zgr-summe">?</td></tr></table>';
  ziel.appendChild(box);
  const lies = k => { const r = zgrRechne(werte[k]); return r ? r.wert : null; };
  const dez = k => /[.,%]/.test(String(werte[k] || '')) || !!o.dezimal;
  // NEU (Fassung 11.1): direkter richtiger Wert -> Rechnung (o.rechnung),
  // beim Tippen leuchten die Pfade kurz (o.leuchten)
  const direkt = k => {
    const r = zgrRechne(werte[k]);
    if (!r || !r.einzeln || !o.soll || !o.rechnung || Math.abs(r.wert - zgrZahl(o.soll[k] || [0, 1])) >= 0.006) return null;
    return o.rechnung(+k);
  };
  const zeigen = () => {
    let s = 0, alle = true, d = false;
    ks.forEach(k => {
      const z = box.querySelector(`tr[data-k="${k}"] .wert`), roh = String(werte[k] || '').trim(), w = lies(k);
      if (!roh){ z.textContent = ''; alle = false; return; }
      if (w === null){ z.textContent = 'nicht lesbar'; alle = false; return; }
      const e = zgrErgebnis(w, dez(k)), rz = direkt(k);
      z.textContent = rz ? '= ' + rz.text : zgrRechne(roh).einzeln ? '' : (e.genau ? '= ' : '≈ ') + e.t;
      s += w; if (dez(k)) d = true;
    });
    const e = zgrErgebnis(s, d);
    box.querySelector('.zgr-summe').innerHTML = alle ? `<b>${e.genau ? '' : '≈ '}${e.t}</b>` : '?';
  };
  let nachAenderung = null;
  box.querySelectorAll('input').forEach(f => {
    f.value = werte[f.dataset.k] || '';
    f.disabled = !!o.nurLesen;
    f.oninput = () => {
      werte[f.dataset.k] = f.value;
      box.querySelectorAll('.ok,.falsch').forEach(e => e.classList.remove('ok', 'falsch'));
      zeigen();
      const rz = direkt(f.dataset.k);
      if (rz && o.leuchten) o.leuchten(rz.blaetter);
      if (nachAenderung) nachAenderung(); if (window.sichern) sichern();
    };
  });
  zeigen();
  return {
    set nachAenderung(f){ nachAenderung = f; },
    /* `soll` = {k: Bruch}; `extra(lies)` gibt weitere Hinweise. */
    pruefen(soll, extra){
      const w = {}, hinweise = [];
      ks.forEach(k => { w[k] = lies(k); });
      const leer = ks.filter(k => w[k] === null);
      if (leer.length)
        hinweise.push(leer.length > 1 ? `${leer.length} Einträge fehlen noch oder sind nicht lesbar.`
          : 'Ein Eintrag fehlt noch oder ist nicht lesbar.');
      const voll = ks.filter(k => w[k] !== null);
      const gesamt = voll.reduce((a, k) => a + w[k], 0);
      if (!leer.length && !zgrNahe(gesamt, 1))
        hinweise.push(`Die Wahrscheinlichkeiten ergeben zusammen ${zgrDezText(gesamt)} statt 1.`);
      (extra ? extra(w) : []).forEach(h => hinweise.push(h));
      const daneben = voll.filter(k => Math.abs(w[k] - zgrZahl(soll[k] || [0, 1])) >= 0.006);
      voll.forEach(k => {
        const tr = box.querySelector(`tr[data-k="${k}"]`), ok = !daneben.includes(k);
        tr.classList.add(ok ? 'ok' : 'falsch'); tr.querySelector('input').classList.add(ok ? 'ok' : 'falsch');
      });
      if (daneben.length)
        hinweise.push(daneben.map(k => `P(X = ${k})`).join(', ').replace(/, ([^,]*)$/, ' und $1')
          + (daneben.length > 1 ? ' passen nicht.' : ' passt nicht.'));
      return {hinweise, alles: !hinweise.length};
    },
  };
}
/* Liegt die Eingabe bei einer bekannten falschen Verteilung? `w` = {k: Zahl}. */
const zgrWieFalsch = (w, falsch) => falsch.every(([k, b]) => w[k] !== null && w[k] !== undefined
  && Math.abs(w[k] - zgrZahl(b)) < 0.006);
const zgrSollAus = vert => Object.fromEntries(vert.map(([k, b]) => [k, b]));
const zgrObj = v => !!v && typeof v === 'object' && !Array.isArray(v);

/* ───────── Die Sammlung (Fassung 6) ─────────
   Jede Verteilung, die in Etappe 1 und 2 geprueft richtig aufgestellt
   ist, kommt in die Sammlung: ein schmales Band mit kleinen Histogrammen
   ueber der Buehne, in allen drei Etappen. Etappe 3 arbeitet mit ihr.
   Stand: stand.zgrSammlung = {G: true, U: true, ...}.

   FASSUNG 6.1: Das Band erscheint erst, wenn die erste Verteilung
   fertig ist. In Etappe 1 und 2 (mitSatz) steht der Satz dazu, der sagt,
   wozu es da ist. */
function zgrSammlung(){
  const s = stand.zgrSammlung = (stand.zgrSammlung && typeof stand.zgrSammlung === 'object') ? stand.zgrSammlung : {};
  // Alte Staende (Fassung 5 und 6): Wer die sechs Rueckgaben in Zug 3
  // von Etappe 1 richtig gelegt hat, hat die Garderobe gesammelt.
  if (!s.G && stand.karten && ZGR_R().every(r => {
    const k = stand.karten['J-' + r]; return k && k.ort === 'x' + zgrX(r); })) s.G = true;
  return s;
}
function zgrSammlungHtml(mitSatz){
  const s = zgrSammlung(), S = D.sammlung;
  if (!S.liste.some(o => s[o.id])) return '';
  return `<div class="zgr-sammlung" id="zgrsammlung" aria-label="${S.titel}" data-satz="${mitSatz ? 1 : ''}">`
    + `<span class="kopf">${S.titel}</span>`
    // GEAENDERT (Fassung 11, Ergaenzung): «noch offen» nur fuer die
    // Garderobe und die vier Buden; die Kaertchen erst, wenn sie da sind.
    + S.liste.filter(o => s[o.id] || o.kern).map(o => s[o.id]
      ? `<span class="zgr-sk" title="${o.name}">${zgrMiniSvg(o, 50, 26, true)}<span>${o.name}</span></span>`
      : `<span class="zgr-sk leer"><span>${o.name}</span><span class="zgr-zart">${S.leer}</span></span>`).join('')
    + (mitSatz ? `<span class="satz">${S.satz}</span>` : '')
    + '</div>';
}
function zgrSammeln(id){
  const s = zgrSammlung();
  if (s[id]) return;
  s[id] = true; sichern();
  const alt = document.getElementById('zgrsammlung');
  if (alt) alt.outerHTML = zgrSammlungHtml(!!alt.dataset.satz);
  else {
    // Die erste Verteilung: Das Band erscheint unter dem Auftrag.
    const auf = document.querySelector('#buehne > .zgr-sleiste') || document.querySelector('#buehne > .zgr-fortschritt')
      || document.querySelector('#buehne > .zgr-sauftrag') || document.querySelector('#buehne > .auftrag');
    if (auf) auf.insertAdjacentHTML('afterend', zgrSammlungHtml(true));
  }
  // Fassung 15: Die Garderobe (Etappe 1) steht nicht mehr im Band
  const o = D.sammlung.liste.find(x => x.id === id);
  if (!o) return;
  const neu = document.querySelector(`#zgrsammlung .zgr-sk[title="${o.name}"]`);
  if (neu) neu.classList.add('neu');
}

function zgrSichtPanel(id, html){
  let panel = document.getElementById(id);
  if (panel){ panel.remove(); return; }
  panel = document.createElement('div');
  panel.id = id; panel.className = 'zgr-sicht';
  panel.innerHTML = html;
  document.querySelector('.buehne').insertAdjacentElement('afterend', panel);
}
const zgrHinweisBox = (el, satz, hinweise, gut) => {
  el.className = 'zgr-hinweise' + (gut ? ' gut' : '');
  el.innerHTML = (satz ? `<div>${satz}</div>` : '')
    + (hinweise.length ? '<ul>' + hinweise.map(h => `<li>${h}</li>`).join('') + '</ul>' : '');
};

/* ───────── Die Schrittleiste (FASSUNG 8.1, Punkt 1) ─────────
   Wie in Kapitel 5 (schrittLeiste): kleine Pillen 1 · 2 · 3, die aktuelle
   gefuellt, erledigte gruen mit Haken. Hier ist jede Pille ein Knopf.
   schritte = [{t, jetzt, ok, aus}], vor = Text davor.
   GEAENDERT (Fassung 9): nur noch in Etappe 3 - Etappe 1 und 2 haben
   keine Zuege mehr. */
function zgrSchrittleiste(schritte, vor){
  return '<div class="zgr-sleiste" id="zgrsleiste" role="group" aria-label="Schritte">'
    + (vor ? `<span class="vor">${vor}</span>` : '')
    + schritte.map((x, i) => (i ? '<span class="pt">·</span>' : '')
      + `<button class="st${x.jetzt ? ' jetzt' : ''}${x.ok ? ' fertig' : ''}" data-i="${i}"${x.aus ? ' disabled' : ''}`
      + `${x.jetzt ? ' aria-current="step"' : ''}>${x.ok ? '✓ ' : ''}${i + 1} ${x.t}</button>`).join('')
    + '</div>';
}
function zgrSchrittKlick(klick){
  document.querySelectorAll('#zgrsleiste button').forEach(b => b.onclick = () => klick(+b.dataset.i));
}

/* ───────── Alter Speicherstand (seit FASSUNG 9, Marke seit FASSUNG 11) ─────────
   Ist der gesicherte Stand aelter als Fassung 11, beginnt die Seite frisch
   und meldet das kurz - niemand soll Mischzustaende sehen. Wie Kapitel 8
   (nvStandUmstellen): Diese Datei laeuft nach flaeche.js und vor los(),
   also bevor der Kern den Stand liest. Ein frischer Stand bekommt die
   Marke sofort. Die Umstellungen aus Fassung 8 und 8.1 stehen in Git. */
// Fassung 11.1 setzt die Marke bewusst NICHT hoeher: Ein Stand aus Fassung
// 11 behaelt seine Eintraege. Die neuen Felder (stand.zgrAuftrag,
// e1.code.an, zgr11.modus) fehlen dort und werden beim Lesen ergaenzt.
// GEAENDERT (Fassung 12): Marke 120. Ein Stand aus Fassung 11 (110 bis
// 119) bleibt; nur Etappe 2 wird umgestellt (zgrE2Umstellen). Laesst sie
// sich nicht umstellen, beginnt NUR Etappe 2 neu, mit Meldung (D.frischE2).
// GEAENDERT (Fassung 12.1): Marke 121. Ein Stand aus Fassung 11 oder 12
// bleibt; Teil A von Etappe 2 wird umgestellt (zgrE2Umstellen12), die
// neuen Schritte (Gerueste, Pflichtknoten) beginnen leer. Laesst sich Teil A
// nicht umstellen, beginnt nur Teil A neu (Teil B und Etappe 1 bleiben).
// GEAENDERT (Fassung 12.2): Marke 122. Teil A von Etappe 2 aus aelteren
// Fassungen beginnt neu, mit Meldung, wenn dort etwas eingetragen war;
// Teil B und Etappe 1 bleiben.
// GEAENDERT (Fassung 13): Marke 130. Etappe 3 aus aelteren Fassungen
// beginnt neu (vier Zuege statt drei), mit Meldung, wenn dort etwas war;
// Etappe 1 und 2 bleiben.
// GEAENDERT (Fassung 14): Marke 140. Teil A von Etappe 2 und Etappe 3
// beginnen neu (mit Meldung, wenn dort etwas war); Etappe 1 und Teil B bleiben.
// GEAENDERT (Fassung 15): Marke 150. Etappe 2 beginnt neu (zgr15 statt
// zgr11); Etappe 3 nur aus Fassungen vor 141.
// GEAENDERT (Fassung 16): Marke 160. Etappe 3 beginnt neu (Waage,
// Dreieck und Band); Etappe 2 nur aus Fassungen vor 15 (Marke 150).
// GEAENDERT (Fassung 19): Marke 190. Etappe 3 hat neue Zuege und beginnt
// neu (mit Hinweis); Etappe 1 und 2 bleiben.
const ZGR_FASSUNG = 190;      // 190: Fassung 19
const ZGR_FASSUNG_15 = 150;   // ab hier ist Etappe 2 die Reihe aus Fassung 15
const ZGR_FASSUNG_11 = 110;   // ab hier wird umgestellt statt verworfen
function zgrMeldungLang(text){
  const zeigen = () => {
    const m = document.createElement('div');
    m.className = 'zgr-meldung'; m.setAttribute('role', 'status');
    m.innerHTML = `${text}<button aria-label="Schliessen" title="Schliessen">×</button>`;
    m.querySelector('button').onclick = () => m.remove();
    document.body.appendChild(m);
    setTimeout(() => m.remove(), 15000);
  };
  if (document.body) zeigen(); else document.addEventListener('DOMContentLoaded', zeigen);
}
(function zgrStandPruefen(){
  stand.zgrFassung = ZGR_FASSUNG;
  let paket = null;
  try { paket = JSON.parse(localStorage.getItem(_SPEICHER) || 'null'); } catch(_) { return; }
  const s = paket && paket.stand;
  if (!s || typeof s !== 'object' || s.zgrFassung >= ZGR_FASSUNG) return;
  // Zu alt fuer den Kern ohnehin (zwoelf Stunden): Er verwirft ihn still.
  if (!paket.zeit || Date.now() - paket.zeit > _HALTBAR) return;
  // ENTFALLEN (Fassung 19): Ein Stand aus Fassung 17 oder 18 behielt
  // Etappe 3. Jetzt beginnt Etappe 3 neu wie unten.
  // GEAENDERT (Fassung 16): Etappe 3 beginnt immer neu. Etappe 2 nur aus
  // Fassungen vor 15 (neuer Stand stand.zgr15), mit ihr die sieben
  // Verteilungen der Sammlung. Etappe 1 bleibt.
  if (s.zgrFassung >= ZGR_FASSUNG_11){
    const inhalt = v => zgrObj(v) ? Object.values(v).some(inhalt) : Array.isArray(v) ? v.length > 0
      : typeof v === 'boolean' ? v : String(v == null ? '' : v).trim() !== '';
    let war2 = false;
    if (s.zgrFassung < ZGR_FASSUNG_15){
      war2 = zgrObj(s.zgr11) && Object.entries(s.zgr11).some(([k, v]) => k !== 'aktiv' && inhalt(v));
      delete s.zgr11;
      if (zgrObj(s.zgrSammlung)) D.e2.situationen.forEach(x => { delete s.zgrSammlung[x.sammlung]; });
      if (zgrObj(s.zgrAuftrag)) delete s.zgrAuftrag['2'];
    }
    const war3 = zgrObj(s.zgr3) && Object.keys(s.zgr3).length > 0;
    delete s.zgr3; delete s.e3zug;
    if (zgrObj(s.zgrAuftrag)) delete s.zgrAuftrag['3'];
    s.zgrFassung = ZGR_FASSUNG;
    try { localStorage.setItem(_SPEICHER, JSON.stringify(paket)); } catch(_) {}
    if (war2 || war3) zgrMeldungLang([war2 ? D.frischE2 : '', war3 ? D.frischE3 : ''].filter(Boolean).join(' '));
    return;
  }
  const etwas = ['e1', 'zgr2', 'zgr7', 'zgr8', 'zgr81', 'zgr9', 'zgr10', 'zgr11', 'zgr3', 'e1zug', 'e3zug', 'zgrSammlung'].some(k => k in s)
    || Number(s.etappe) > 0 || (zgrObj(s.karten) && Object.keys(s.karten).length > 0);
  try { localStorage.removeItem(_SPEICHER); } catch(_) {}
  if (etwas) zgrMeldungLang(D.frisch);
})();

/* ───────── Ein Feld ueber die ganze Breite (FASSUNG 9) ─────────
   «Das muesste alles auf einem Feld sein»: buehneOben() ohne
   Quellflaechen. Der Griff und die leere untere Reihe fallen weg. */
function zgrEinFeld(auftrag, marke, leiste, extra){
  buehneOben(auftrag, marke, [], leiste, extra);
  document.querySelectorAll('#buehne .buehne > .unten, #buehne .buehne > .teiler').forEach(x => x.remove());
  const oben = document.getElementById('obenhaelfte');
  if (oben) oben.style.flex = '1 1 0';
  return document.getElementById('feld');
}

/* ───────── Bedienung wie in Kapitel 5 (FASSUNG 11.1) ─────────
   Uebernommen aus Kapitel 5, Fassung 4.2 (bedingte_wahrscheinlichkeit/
   etappen.js: auftragFenster, weiterFahne, vorschlagFinden), hier mit
   eigenen Namen nachgebaut - der Kern bleibt unberuehrt.

   Auftragsfenster: beim ersten Oeffnen jeder Etappe von selbst, zu mit
   «Los geht's», × oder Escape. Danach oeffnet der Knopf «Auftrag» in der
   Auftragszeile es wieder. Der Auftragssatz steht hervorgehoben darunter.
   Stand: stand.zgrAuftrag = {1: true, 2: true, 3: true}. Ein Stand aus
   Fassung 11 hat das Feld nicht; er bleibt, wie er ist, und zeigt jedes
   Fenster einmal. */
function zgrAuftragFenster(nr){
  const alt = document.getElementById('zgrfenster');
  if (alt) alt.remove();
  const A = D.zgrAuftrag, F = A.fenster[String(nr)], vorher = document.activeElement;
  const f = document.createElement('div');
  f.className = 'zgr-fenster'; f.id = 'zgrfenster';
  f.innerHTML = `<div class="kasten" role="dialog" aria-modal="true" aria-labelledby="zgrfenstertitel">
    <button type="button" class="zu" aria-label="Schliessen" title="Schliessen">×</button>
    <h2 id="zgrfenstertitel">${A.knopf} · Etappe ${nr}</h2>
    <p class="satz">${D.etappen[nr - 1].auftrag}</p>
    <ol>${F.schritte.map(t => `<li>${t}</li>`).join('')}</ol>
    ${F.schluss ? `<p class="schluss">${F.schluss}</p>` : ''}
    <div class="unten"><button type="button" class="knopf los">${A.los}</button></div></div>`;
  const zu = () => {
    f.remove();
    document.removeEventListener('keydown', taste, true);
    const kn = document.querySelector('.zgr-auftragknopf');
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
/* Nach buehne()/zgrEinFeld(): Knopf «Auftrag», der hervorgehobene
   Auftragssatz, beim ersten Mal das Fenster. */
function zgrAuftragKopf(nr){
  const a = document.querySelector('#buehne > .auftrag');
  if (!a) return;
  // NEU (Fassung 11.2): Mit Situationskarte stehen Auftragssatz und Knopf
  // in der Karte; die Auftragszeile bekommt keinen zweiten.
  const karte = document.getElementById('zgrskarte');
  if (karte) karte.querySelectorAll('.zgr-auftragknopf').forEach(b => b.onclick = ev => { ev.stopPropagation(); zgrAuftragFenster(nr); });
  else if (!a.querySelector('.zgr-auftragknopf'))
    a.insertAdjacentHTML('beforeend', `<button type="button" class="zgr-auftragknopf" title="Den Auftrag dieser Etappe noch einmal zeigen">${D.zgrAuftrag.knopf}</button>`);
  if (!karte) a.querySelector('.zgr-auftragknopf').onclick = ev => { ev.stopPropagation(); zgrAuftragFenster(nr); };
  if (!karte && !document.querySelector('#buehne > .zgr-sauftrag'))
    a.insertAdjacentHTML('afterend', `<div class="zgr-sauftrag"><span class="was">${D.zgrAuftrag.knopf}</span>${D.etappen[nr - 1].auftrag}</div>`);
  if (!zgrObj(stand.zgrAuftrag)) stand.zgrAuftrag = {};
  if (stand.zgrAuftrag[nr]) return;
  stand.zgrAuftrag[nr] = true;
  sichern();
  zgrAuftragFenster(nr);
}

/* Kurze Meldung oben (wie bei einem frischen Stand). */
function zgrMeldung(text){
  document.querySelectorAll('.zgr-meldung.kurz').forEach(m => m.remove());
  const m = document.createElement('div');
  m.className = 'zgr-meldung kurz'; m.setAttribute('role', 'status');
  m.innerHTML = `${text}<button aria-label="Schliessen" title="Schliessen">×</button>`;
  m.querySelector('button').onclick = () => m.remove();
  document.body.appendChild(m);
  setTimeout(() => m.remove(), 3500);
}

/* Weiterfuehrung am Arbeitsort: unten rechts in der Buehne ein Knopf
   mit dem naechsten Schritt (#zgrfahne). Mit `uhr` geht es nach 1.5 s
   von selbst weiter, mit `meldung`. Die Uhr stellt nur der Eintrag, der
   einen Teil fertig macht - nie das Laden. `wache()` prueft vor dem
   Weitergehen, ob man noch dort ist. o = null nimmt die Fahne weg. */
let _zgrUhr = null;
function zgrFahne(o){
  clearTimeout(_zgrUhr); _zgrUhr = null;
  const alt = document.getElementById('zgrfahne');
  if (alt) alt.remove();
  if (!o) return;
  const ziel = document.querySelector('#buehne .buehne');
  if (!ziel) return;
  const f = document.createElement('div');
  f.id = 'zgrfahne'; f.className = 'zgr-fahne'; f.setAttribute('role', 'status');
  f.innerHTML = (o.notiz ? `<span class="notiz">${o.notiz}</span>` : '')
    + `<button type="button" class="knopf">${o.knopf}</button>` + (o.uhr ? '<span class="uhr"><i></i></span>' : '');
  ziel.appendChild(f);
  f.querySelector('button').onclick = ev => { ev.stopPropagation(); clearTimeout(_zgrUhr); o.tun(); };
  if (o.uhr) _zgrUhr = setTimeout(() => {
    if (!f.isConnected || (o.wache && !o.wache())) return;
    if (o.meldung) zgrMeldung(o.meldung);
    o.tun();
  }, 1500);
}

/* Die benutzten Pfade leuchten kurz auf: eine Schicht ueber dem Baum,
   die Aeste als breite blaue Striche zwischen den Knoten. Der Baum wird
   dafuer nicht neu gezeichnet - Felder und Fokus bleiben. */
function zgrLeuchten(bau, blattIds){
  const baum = bau && bau.querySelector('.zgr-baum');
  if (!baum) return;
  const lage = id => { const k = baum.querySelector(`.zgr-knoten[data-id="${CSS.escape(id)}"]`);
    return k ? [parseFloat(k.style.left), parseFloat(k.style.top)] : null; };
  const kanten = new Set();
  blattIds.forEach(id => { for (let i = 1; i <= id.length; i++) kanten.add(id.slice(0, i)); });
  const L = [];
  kanten.forEach(id => {
    const a = lage(id.slice(0, -1)), b = lage(id);
    if (a && b) L.push(`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`);
  });
  baum.querySelectorAll('.zgr-leuchten').forEach(x => x.remove());
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('class', 'zgr-leuchten');
  s.setAttribute('width', baum.offsetWidth); s.setAttribute('height', baum.offsetHeight);
  s.innerHTML = `<g stroke="#0065A9" stroke-width="7" stroke-linecap="round" opacity=".38">${L.join('')}</g>`;
  baum.appendChild(s);
  setTimeout(() => s.remove(), 1700);
}

/* Die Rechnung zu einem Wert von X aus einem Baum des Generators: je
   Pfad mit diesem X das Produkt der Astwerte, als Summe. Gibt {text,
   blaetter} zurueck. dez: Dezimalzahlen statt Brueche. */
function zgrPfadRechnung(T, k, dez){
  const nach = zgrBaumNach(T), zahl = w => dez ? zgrDezText(zgrZahl(w)) : zgrBruchText(w);
  const bl = T.knoten.filter(n => n.blatt && n.x === k);
  if (!bl.length) return {text: D.rechnung.keinPfad.replace('{k}', k), blaetter: []};
  const teile = bl.map(b => {
    const f = [];
    for (let n = b; n.eltern !== null; n = nach[n.eltern]) f.unshift(zahl(n.w));
    return f.join('·');
  });
  return {text: teile.join(' + '), blaetter: bl.map(b => b.id)};
}

/* ───────── Etappe 1 · Die Garderobe an der Chilbi (FASSUNG 10, 11) ─────────
   EIN Feld ohne Scrollen bei 1280x800 (thema.md «FASSUNG 10»). Links die
   beiden Baeume kompakt nebeneinander (zgrBaum, ohneRechnung), unter
   jedem eine waagrechte Tabelle X | 0 1 2 3 / P (zgrVertQuer): gerechnet
   wird direkt in der Zelle, die Zelle zeigt den Wert. Rechts (bei
   schmalem Schirm darunter) die Hinweise und alles, was danach kommt.
   Diese Spalte rollt fuer sich, das Feld nicht. Die Masse richten sich
   nach dem Platz.

   Falsche Werte sind erlaubt. «Pruefen» gibt die gestuften Hinweise aus
   Fassung 9 (zgrE1Hinweise). Erst wenn beide Verteilungen stimmen und
   gleich sind (e.ok): der Satz und die Deckung.

   GEAENDERT (Fassung 12.2, thema.md «Deckung im Baum: Ebene fuer Ebene
   zusammenklappen»): Die Deckung laeuft rechts neben den Baeumen in einem
   eigenen Baum nach Jacken (zgrKlappen): Vorhersage, Zusammenklappen je
   Ebene, die Aeste mit 0, «Wieder aufklappen». Die Farbcodes aus
   Fassung 11 stehen in Git. Danach «Wie haengen die beiden Baeume zusammen?», «Eine moegliche
   Sicht» und die Wette. Die Baeume bleiben dabei sichtbar.
   ENTFALLEN (Fassung 11): Faerben je Ebene und Umkreisen (zgrDeckFrage,
   zgrDeckKreise) - siehe Git.
   -> Die Garderobe kommt in die Sammlung, sobald beide stimmen.

   Stand: stand.e1 = {b:{jacke:{p,x}, rf:{p,x}}, t:{jacke:{k}, rf:{k}},
   hinweis:{key, stufe}, ok, code:{farbe:{abc: 'g-y'}, ok, an (11.1), tipp:{f, l,
   z}, leer:[R/F-Pfad], zwei, meldung}, zusammen, wette}.
   NEU (FASSUNG 11.1): Auftragsfenster (zgrAuftragKopf); sind beide
   Tabellen richtig, fuehrt die Fahne zum Vergleich (nach 1.5 s von
   selbst), nach der Deckung zu Etappe 2. Ein direkt eingetragener
   richtiger Wert in der Tabelle zeigt darunter die Rechnung aus den
   Pfaden, die benutzten Pfade leuchten kurz auf. */
const ZGR_ARTEN = ['jacke', 'rf'];
// richtig gruen, falsch gelb (die Textmarker-Farben aus Kapitel 7)
const ZGR_RF = {R: '#007D57', F: '#d4ac00'};
function zgrE1(){
  if (!zgrObj(stand.e1)) stand.e1 = {};
  const e = stand.e1;
  ['b', 't', 'hinweis', 'klapp'].forEach(k => { if (!zgrObj(e[k])) e[k] = {}; });
  ZGR_ARTEN.forEach(a => {
    if (!zgrObj(e.b[a])) e.b[a] = {};
    ['p', 'x'].forEach(f => { if (!zgrObj(e.b[a][f])) e.b[a][f] = {}; });
    if (!zgrObj(e.t[a])) e.t[a] = {};
  });
  // GEAENDERT (Fassung 12.2): das Zusammenklappen statt der Farbcodes. Der
  // alte Stand der Farbcodes (e.code) faellt still weg; Tabellen und Baeume
  // bleiben.
  delete e.code;
  const k = e.klapp;
  ['vor', 'ok', 'tipp'].forEach(f => { if (!zgrObj(k[f])) k[f] = {}; });
  if (![0, 1, 2, 3].includes(k.L)) k.L = 0;
  k.nul = !!k.nul && k.L === 3;
  k.an = !!k.an; k.fertig = !!k.fertig;
  return e;
}

/* Einen Zug als erledigt markieren (oder nicht) und die Pille umfaerben
   (Etappe 3). */
function zgrFertig(st, i, ok){
  const vorher = !!st.fertig[i];
  st.fertig[i] = !!ok; sichern();
  // NEU (Fassung 11.1): die Weiter-Fahne in Etappe 3
  if (window._zgrFertigHaken) window._zgrFertigHaken(i, !!ok, vorher);
  const b = document.querySelector(`#zgrsleiste button[data-i="${i - 1}"]`);
  if (!b) return;
  b.classList.toggle('fertig', !!ok);
  b.textContent = (ok ? '✓ ' : '') + b.textContent.replace(/^✓ /, '');
}

/* Die Loesung als Stand, alles aus den Baeumen und Farbcodes des Generators. */
function zgrE1Loesung(){
  const b = {}, t = {};
  ZGR_ARTEN.forEach(a => {
    const T = D.e1.baeume[a], m = b[a] = {p: {}, x: {}};
    T.knoten.forEach(k => { if (k.eltern !== null) m.p[k.id] = zgrBruchText(k.w); if (k.blatt) m.x[k.id] = String(k.x); });
    const pf = zgrBaumPfade(T, m), ta = t[a] = {};
    D.e1.verteilung.forEach(([k]) => {
      const teile = pf.filter(p => +p.x === k).map(p => zgrBruchText(p.faktoren.reduce((s, w) => zgrMal(s, w), [1, 1])));
      ta[k] = teile.length ? teile.join(' + ') : '0';
    });
  });
  const K = D.e1.klapp;
  return {b, t, hinweis: {}, ok: true, zusammen: '', wette: '',
          klapp: {an: true, L: 3, nul: true, fertig: true, tipp: {}, ok: {}, vor: {}}};
}

/* ───────── NEU (FASSUNG 11.2, Rike 2026-10-18) ─────────
   thema.md «Situationskarte groesser und huebscher»: Die Situation steht
   als Karte ueber die ganze Breite, zart in der Kapitelfarbe hinterlegt,
   links ein Balken und ein kleines Bild (das Startbild). Name in der
   Titelschrift, Text gross, die Frage fett in der Kapitelfarbe, darunter
   der Auftragssatz mit dem Knopf «☰ Auftrag» (er ersetzt in Etappe 1 und 2
   den Knopf in der Auftragszeile und den blauen Auftragsstreifen).
   Einklappbar auf eine Zeile mit Name und Frage. Gleich gebaut wie in
   Kapitel 5 (bedingte_wahrscheinlichkeit/etappen.js, situationKarte), nur
   die Farbe ist anders. Etappe 3 zeigt keine Situation und bleibt.
   Ob eine Karte zu ist, merkt nur die Sitzung (zgrSkZu, je Karte); der
   Stand bleibt unberuehrt. Ohne eigene Wahl klappt sie nach dem ersten
   Eintrag von selbst zu, wenn unter ihr weniger als ZGR_PLATZ px fuer die
   Arbeitsflaeche blieben (bei 1280 x 800 immer, auf grossen Schirmen nicht).
   o: {id, name, text (HTML), frage, nr (Etappe), bild}
   GEAENDERT (Fassung 12): Ein Bild nur, wenn es zur Situation passt
   (o.bild: die Garderobe hat erkundung.png, andere ihr Situationsbild,
   sobald es vorliegt); sonst keines. */
const zgrSkZu = {};
const ZGR_PLATZ = 560, ZGR_KNAPP = 300;
function zgrKarteHtml(o){
  const K = D.skarte, zu = zgrSkZu[o.id] === true;
  const knopf = `<button type="button" class="zgr-auftragknopf" title="Den Auftrag dieser Etappe noch einmal zeigen">${D.zgrAuftrag.knopf}</button>`;
  return `<div class="zgr-skarte${zu ? ' zu' : ''}" id="zgrskarte" role="region" aria-label="Situation" data-sk="${o.id}">
    ${o.bild ? `<img class="zgr-sbild" src="${o.bild}" alt="" aria-hidden="true">` : ''}
    <div class="zgr-sinhalt">
      <div class="zgr-skopf"><span class="zgr-stitel">${o.name}</span><span class="zgr-skurz">${o.frage}</span>
        <span class="zgr-snurzu">${knopf}</span>
        <button type="button" class="zgr-sklapp" aria-expanded="${!zu}">${zu ? K.zeigen : K.einklappen}</button></div>
      <div class="zgr-sganz">
        <p class="zgr-stext">${o.text}</p>
        <p class="zgr-sfrage">${o.frage}</p>
        <div class="zgr-sauftragz"><p><span class="was">${K.auftrag}</span>${D.etappen[o.nr - 1].auftrag}</p>${knopf}</div>
      </div>
    </div></div>`;
}
/* Klappe und Automatik. `neu` zeichnet die Etappe neu, wenn die Flaeche
   ihre Masse beim Aufbau berechnet (Etappe 1); sonst genuegt die Klasse. */
function zgrKarteHaken(neu){
  const k = document.getElementById('zgrskarte');
  if (!k) return;
  const id = k.dataset.sk, kn = k.querySelector('.zgr-sklapp'), K = D.skarte;
  const setzen = (zu, nachher) => {
    zgrSkZu[id] = zu;
    // Offenes Auftragsfenster: nicht neu zeichnen (es wuerde mit verschwinden)
    if (neu && nachher && !document.getElementById('zgrfenster')) return zgrNeuMitFokus(neu);
    k.classList.toggle('zu', zu);
    kn.textContent = zu ? K.zeigen : K.einklappen;
    kn.setAttribute('aria-expanded', String(!zu));
    if (window._zgrPassen) window._zgrPassen();
  };
  kn.onclick = ev => { ev.stopPropagation(); setzen(!k.classList.contains('zu'), true); };
  k.querySelector('.zgr-skopf').addEventListener('click', ev => {
    if (!k.classList.contains('zu') || ev.target.closest('button')) return;
    setzen(false, true);
  });
  const eingetragen = () => [...document.querySelectorAll('#buehne input')].some(f => !f.disabled && !f.readOnly
    && f.type !== 'checkbox' && f.type !== 'radio' && f.type !== 'range' && f.value.trim() !== '');
  const eng = () => innerHeight - k.getBoundingClientRect().bottom < ZGR_PLATZ;
  // Schon Eintraege da (gesicherter Stand): gleich zu, wenn es eng ist.
  // Im niedrigen Fenster (etwa 800 x 570) bliebe unter der offenen Karte
  // kaum Platz: dann von Anfang an zu. Erst nach dem Aufbau der Etappe
  // pruefen - die Felder entstehen danach.
  setTimeout(() => {
    if (!k.isConnected || zgrSkZu[id] !== undefined) return;
    if ((eingetragen() && eng()) || innerHeight - k.getBoundingClientRect().bottom < ZGR_KNAPP) setzen(true, true);
  }, 0);
  // Der erste Eintrag (change: Feld verlassen oder Enter)
  const b = document.getElementById('buehne');
  if (b._zgrSkHaken) b.removeEventListener('change', b._zgrSkHaken, true);
  b._zgrSkHaken = ev => {
    if (!k.isConnected || zgrSkZu[id] !== undefined || !ev.target.matches('input') || !eingetragen()) return;
    if (eng()) setTimeout(() => { if (k.isConnected && zgrSkZu[id] === undefined) setzen(true, true); }, 0);
  };
  b.addEventListener('change', b._zgrSkHaken, true);
}
/* Neu zeichnen und den Fokus auf dasselbe Eingabefeld zurueckgeben
   (gezaehlt unter allen Feldern der Buehne). */
function zgrNeuMitFokus(neu){
  const alle = () => [...document.querySelectorAll('#buehne input, #buehne button, #buehne [tabindex]')];
  const a = document.activeElement, i = alle().indexOf(a);
  const tisch = document.getElementById('tisch'), feld = document.getElementById('feld');
  const roll = [tisch && tisch.scrollTop, feld && feld.scrollTop];
  neu();
  const t2 = document.getElementById('tisch'), f2 = document.getElementById('feld');
  if (t2 && roll[0]) t2.scrollTop = roll[0];
  if (f2 && roll[1]) f2.scrollTop = roll[1];
  const ziel = i >= 0 ? alle()[i] : document.querySelector('#zgrskarte .zgr-sklapp');
  if (ziel && a && a !== document.body) ziel.focus({preventScroll: true});
}
/* GEAENDERT (Fassung 11.2): die Situation von Etappe 1 als Situationskarte
   (bis dahin eine schmale Zeile .zgr-gemeinsam). */
function zgrE1Lage(){
  const K = D.skarte;
  return zgrKarteHtml({id: 'e1', nr: 1, name: K.e1name, frage: K.e1frage, bild: 'erkundung.png',
    text: D.e1.situation + ' <span class="zgr-zart">Anna gehört Jacke a, Ben Jacke b, Clara Jacke c.</span>'});
}

/* «a, b und c» */
const zgrUnd = xs => xs.length < 2 ? (xs[0] || '') : xs.slice(0, -1).join(', ') + ' und ' + xs[xs.length - 1];

/* Die zwei Saetze zu einem falschen Ast: wo schauen, und wie abzaehlen.
   k = der flachste falsche Ast. Beim typischen Fehler (Ben nach «Anna
   falsch» im Baum nach richtig/falsch) sind es die Saetze aus thema.md. */
function zgrE1AstHinweise(art, T, k){
  const H = D.e1.hinweise, nach = zgrBaumNach(T), e = nach[k.eltern];
  const weg = [];
  for (let j = e; j.eltern !== null; j = nach[j.eltern]) weg.unshift(j.lang);
  const start = !weg.length, w = zgrUnd(weg).replace(' und ', ', ');
  const person = D.e1.personen[k.tiefe - 1], poss = D.e1.possessiv[k.tiefe - 1];
  const ersetze = t => t.replace('{baum}', D.e1.im[art]).replace('{nach}', w).replace('{person}', person)
    .replace('{poss}', poss).replace('{jacke}', k.kurz);
  const wo = ersetze(start ? H.astStart : H.ast);
  const frage = ersetze(art === 'rf' ? (start ? H.abzaehlenRfStart : H.abzaehlenRf)
    : (start ? H.abzaehlenJackeStart : H.abzaehlenJacke));
  const knopf = `<br><button class="zgr-hilfe" data-abz="${art}" data-id="${zgrEsc(e.id)}">`
    + `${ersetze(start ? H.abzaehlenKnopfStart : H.abzaehlenKnopf)}</button>`;
  return [wo, frage + knopf];
}

/* Was «Pruefen» in Etappe 1 sagt. Gibt {ok, key, stufen:[Satz]} zurueck;
   die Reihenfolge der Fehler: Leeres, X, Verteilung passt nicht zum
   eigenen Baum, die beiden Verteilungen ungleich (oder gleich, aber
   falsch), ein falscher Ast. Nennt nie die richtige Zahl. */
function zgrE1Hinweise(e){
  const H = D.e1.hinweise, ks = D.e1.verteilung.map(([k]) => k), soll = zgrSollAus(D.e1.verteilung);
  const ganz = t => /^\d+$/.test(String(t || '').trim());
  const info = ZGR_ARTEN.map(art => {
    const T = D.e1.baeume[art], m = e.b[art];
    const aeste = T.knoten.filter(k => k.eltern !== null), blaetter = T.knoten.filter(k => k.blatt);
    const tab = {};
    ks.forEach(k => { const r = zgrRechne(e.t[art][k]); tab[k] = r ? r.wert : null; });
    const i = {art, T,
      leerA: aeste.filter(k => !zgrLies(m.p[k.id])).length,
      leerX: blaetter.filter(k => !ganz(m.x[k.id])).length,
      leerT: ks.filter(k => tab[k] === null).length,
      xFalsch: blaetter.some(k => ganz(m.x[k.id]) && +String(m.x[k.id]).trim() !== k.x),
      tab,
      falsch: aeste.filter(k => !zgrTrifft(zgrLies(m.p[k.id]), k.w)).sort((a, b) => a.tiefe - b.tiefe)[0] || null};
    if (!i.leerA && !i.leerX && !i.leerT){
      const aus = {};
      zgrBaumPfade(T, m).forEach(p => { aus[+p.x] = (aus[+p.x] || 0) + p.faktoren.reduce((s, w) => s * zgrZahl(w), 1); });
      i.passt = ks.every(k => Math.abs((aus[k] || 0) - tab[k]) < 0.006)
        && Object.keys(aus).every(k => ks.includes(+k) || aus[k] < 0.0005);
      i.richtig = ks.every(k => Math.abs(tab[k] - zgrZahl(soll[k])) < 0.006);
    }
    return i;
  });
  const leer = [];
  info.forEach(i => {
    const w = D.e1.wem[i.art];
    if (i.leerA) leer.push(`${i.leerA} ${i.leerA > 1 ? 'Äste' : 'Ast'} im ${w}`);
    if (i.leerX) leer.push(`${i.leerX} X im ${w}`);
    if (i.leerT) leer.push(`${i.leerT} ${i.leerT > 1 ? 'Einträge' : 'Eintrag'} in der Verteilung unter dem ${w}`);
  });
  if (leer.length) return {key: 'leer', stufen: [H.leer.replace('{liste}', zgrUnd(leer))]};
  const xf = info.find(i => i.xFalsch);
  if (xf) return {key: 'x' + xf.art, stufen: [H.xFalsch.replace('{baum}', D.e1.im[xf.art]), H.xTipp]};
  const tf = info.find(i => !i.passt);
  if (tf) return {key: 'tab' + tf.art, stufen: [H.tabFalsch.replace('{wem}', D.e1.wem[tf.art]), H.tabTipp]};
  const gleich = ks.every(k => Math.abs(info[0].tab[k] - info[1].tab[k]) < 0.006);
  const richtig = info.every(i => i.richtig);
  // Zuerst der Baum nach richtig/falsch (thema.md), dann der nach Jacken
  const fb = info.find(i => i.art === 'rf' && i.falsch) || info.find(i => i.falsch);
  if (gleich && richtig && !fb) return {ok: true};
  const ast = fb ? zgrE1AstHinweise(fb.art, fb.T, fb.falsch) : [];
  const wo = fb ? fb.art + fb.falsch.id : '';
  if (!gleich) return {key: 'ungleich' + wo, stufen: [H.ungleich, ...ast]};
  if (!richtig) return {key: 'gleich' + wo, stufen: [H.gleichFalsch, ...ast]};
  return {key: 'ast' + wo, stufen: ast};
}

function etappe1(){
  loesungAnwenden(() => ({e1: zgrE1Loesung()}));
  const e = zgrE1(), a = D.etappen[0];
  const knopf = (id, t, rechts) => `<button class="knopf leer" id="${id}"${rechts ? ' style="margin-left:auto"' : ''}>${t}</button>`;
  const leiste = knopf('zgrhilfe', 'Hilfe: Abzählen')
    + '<button class="knopf" id="pruefen">Prüfen</button><span class="befund" id="befund"></span>'
    + knopf('weiter', 'Etappe 2 →', true);
  // GEAENDERT (Fassung 12): Die graue Auftragszeile traegt nur «Etappe 1 ·
  // Name»; der Auftrag steht in der Situationskarte.
  const feld = zgrEinFeld({rolle: a.rolle, rang: a.rang, titel: `Etappe 1 · ${a.name}`, text: ''},
    D.e1.marke, leiste, zgrSammlungHtml(true) + zgrE1Lage());
  window._zgrFertigHaken = null;
  window._zgrKlappAnwenden = null;
  zgrAuftragKopf(1);
  zgrKarteHaken(etappe1);
  window._zustaendig = () => false;       // Etappe 1 hat keine Karten
  window._neuzeichnen = null;
  const befund = h => { const b = document.getElementById('befund'); if (b) b.innerHTML = h; };
  const ks = D.e1.verteilung.map(([k]) => k);
  const oben = document.getElementById('obenhaelfte');
  // Das Blatt ist im Kern mindestens 100 % hoch - zusammen mit der Marke
  // darueber rollt die Haelfte dann immer ein wenig. Hier genau so hoch,
  // wie Platz ist.
  const marke = oben && oben.querySelector('.marke');
  if (oben) feld.style.minHeight = `calc(100% - ${(marke ? marke.offsetHeight : 0) + 2}px)`;
  const brett = document.createElement('div'); brett.className = 'zgr-e1';
  const links = document.createElement('div'), rechts = document.createElement('div');
  links.className = 'zgr-e1links'; rechts.className = 'zgr-e1rechts';
  brett.append(links, rechts);
  feld.appendChild(brett);

  // Masse nach dem Platz (Fassung 10). Pfadabstand H so, dass Baum
  // (Kopf 44 + 8 Pfade), Titel und Tabelle in die Hoehe passen;
  // Spaltenbreite so, dass beide Baeume nebeneinander stehen.
  const blaetter = art => D.e1.baeume[art].knoten.filter(k => k.blatt).length;
  const nMax = Math.max(...ZGR_ARTEN.map(blaetter));
  const hoch = oben ? oben.clientHeight : 600, breit = feld.clientWidth || 1000;
  let H = Math.max(26, Math.min(36, Math.floor((hoch - 44 - 157) / nMax)));
  const COL = breit >= 1100 ? 100 : Math.max(74, Math.min(100, Math.floor((breit / 2 - 30 - 98) / 3)));
  // Schmal: auch die Zellen der Tabelle schmaler, sonst rutscht der
  // zweite Baum unter den ersten
  if (COL < 100) brett.classList.add('eng');

  // Links: die beiden Baeume, unter jedem seine Tabelle
  const spalten = document.createElement('div'); spalten.className = 'zgr-spalten';
  links.appendChild(spalten);
  const teile = {};
  ZGR_ARTEN.forEach(art => {
    const sp = document.createElement('div'); sp.className = 'zgr-spalte'; sp.dataset.art = art;
    spalten.appendChild(sp);
    zgrTitel(sp, D.e1.namen[art]);
    const T = D.e1.baeume[art];
    const abz = zgrAbzaehlen(T, D.e1.rueckgaben, D.e1.abzText);
    const opt = {col: COL, h: H * nMax / blaetter(art), abzaehlen: abz, ohneRechnung: true,
                 nachAenderung: () => befund('')};
    const baum = zgrBaum(sp, T, e.b[art], opt);
    const tab = zgrVertQuer(sp, ks, e.t[art], {name: D.e1.wem[art], soll: zgrSollAus(D.e1.verteilung),
      rechnung: k => zgrPfadRechnung(T, k, false), leuchten: ids => zgrLeuchten(baum.element, ids)});
    tab.nachAenderung = () => befund('');
    teile[art] = {T, abz, baum, tab, opt};
  });

  // Rechts: Hinweise, dann der Vergleich, Zusammenhang, Wette
  rechts.insertAdjacentHTML('beforeend', `<div class="zgr-zart zgr-qtext">${D.e1.tabelleText}</div>`);
  const hinweis = document.createElement('div');
  hinweis.className = 'zgr-hinweise'; hinweis.id = 'zgre1hinweis'; hinweis.style.display = 'none';
  hinweis.setAttribute('role', 'status');
  rechts.appendChild(hinweis);
  // NEU (Fassung 12): Stimmen beide Tabellen, erscheint das Histogramm der
  // Garderobe von selbst, kompakt neben den Tabellen - ohne Auftrag.
  const hist = document.createElement('div'); hist.className = 'zgr-e1hist';
  rechts.appendChild(hist);
  const histZeigen = () => {
    hist.innerHTML = '';
    if (!e.ok) return;
    hist.insertAdjacentHTML('beforeend', `<div class="zgr-zart">${D.e2.gezeigt}</div>`);
    hist.appendChild(zgrBild(zgrHistogramm(D.e1.verteilung, '', 0, 3, undefined, {achse: 'X', ymax: 0.5, breite: 200}),
      'Histogramm der Verteilung von X'));
  };
  const nachher = document.createElement('div');
  rechts.appendChild(nachher);
  if (e.ok){ zgrHinweisBox(hinweis, D.e1.hinweise.ok, [], true); hinweis.style.display = ''; histZeigen(); }

  // Die rechte Spalte rollt fuer sich, wenn sie neben den Baeumen steht
  function passen(){
    rechts.style.maxHeight = '';
    if (!oben || !rechts.isConnected) return;
    const nebenan = rechts.getBoundingClientRect().left > links.getBoundingClientRect().left + 40;
    if (nebenan) rechts.style.maxHeight = Math.max(160, oben.getBoundingClientRect().bottom - rechts.getBoundingClientRect().top - 8) + 'px';
  }
  window._zgrPassen = passen;
  if (!window._zgrPassenAn){ window._zgrPassenAn = true; window.addEventListener('resize', () => { if (window._zgrPassen) window._zgrPassen(); }); }

  // NEU (Fassung 11.1): die Weiter-Fahne. autoDeckung stellt nur
  // «Pruefen», wenn es die Tabellen gerade richtig macht.
  let autoDeckung = false;
  function zeichneNachher(){
    const rollen = rechts.scrollTop, c = e.klapp, W = D.weiter;
    nachher.innerHTML = '';
    // GEAENDERT (Fassung 12.2): Zusammenklappen statt Farbcodes
    if (e.ok && c.an){
      zgrKlappen(nachher, e, zeichneNachher, teile.jacke.baum.element);
      if (c.fertig) zeichneZusammen();
    }
    if (e.ok && !c.an) zgrFahne({notiz: W.deckungNotiz, knopf: W.deckung, uhr: autoDeckung, meldung: W.deckungMeldung,
      wache: () => stand.etappe === 0 && !e.klapp.an, tun: deckungAn});
    else if (e.ok && c.fertig) zgrFahne({notiz: W.etappe2Notiz, knopf: W.etappe2, tun: () => { stand.etappe = 1; los(); }});
    else zgrFahne(null);
    autoDeckung = false;
    passen();
    rechts.scrollTop = rollen;
  }
  function deckungAn(){
    e.klapp.an = true; sichern(); zeichneNachher();
    const b = nachher.querySelector('.zgr-klapp');
    if (b){ zgrInSpalte(b.querySelector('.zgr-klappsteuer') || b); const k = b.querySelector('[data-a="klappen"]'); if (k) k.focus({preventScroll: true}); }
  }

  function zeichneZusammen(){
    const ab = document.createElement('div'); ab.className = 'zgr-abschnitt'; ab.id = 'zgrzusammen';
    nachher.appendChild(ab);
    zgrTitel(ab, D.e1.zusammen).classList.add('gross');
    ab.appendChild(zgrSchreibfeld(D.e1.zusammenFeld, e.zusammen, false, v => { e.zusammen = v; sichern(); }));
    const z = document.createElement('div'); z.className = 'zgr-zeile';
    z.innerHTML = '<button class="knopf leer" id="zgrsicht">Eine mögliche Sicht</button>';
    ab.appendChild(z);
    const sicht = document.createElement('div'); ab.appendChild(sicht);
    z.querySelector('button').onclick = () => {
      sicht.innerHTML = sicht.innerHTML ? '' : '<div class="zgr-sicht" style="max-height:none;margin:4px 0">'
        + '<b>Eine mögliche Sicht</b><ul>' + D.e1.sicht.map(t => `<li>${t}</li>`).join('') + '</ul></div>';
    };
    // Die Wette: ein kleiner Zusatz am Schluss
    const wb = document.createElement('details'); wb.className = 'zgr-wette';
    if (String(e.wette || '').trim()) wb.open = true;
    wb.innerHTML = `<summary>${D.e1.wetteTitel}</summary>`;
    nachher.appendChild(wb);
    wb.appendChild(zgrSchreibfeld(D.e1.wette, e.wette, false, v => { e.wette = v; sichern(); }));
    const wz = document.createElement('div'); wz.className = 'zgr-zeile';
    wz.innerHTML = '<button class="knopf leer">Eine mögliche Sicht</button>';
    wb.appendChild(wz);
    const ws = document.createElement('div'); wb.appendChild(ws);
    wz.querySelector('button').onclick = () => {
      ws.innerHTML = ws.innerHTML ? '' : `<div class="zgr-sicht" style="max-height:none;margin:4px 0"><b>Eine mögliche Sicht</b><p>${D.e1.wetteSicht}</p></div>`;
    };
  }
  zeichneNachher();

  // Passt es noch nicht (Schriften, Sammlung, Lage), wird der
  // Pfadabstand kleiner - bis 26 px. Die rechte Spalte zaehlt nicht mit,
  // sie rollt fuer sich.
  function anpassen(){
    if (!oben) return;
    const anzeige = rechts.style.display;
    rechts.style.display = 'none';
    const zuviel = oben.scrollHeight - oben.clientHeight;
    rechts.style.display = anzeige;
    if (zuviel <= 0 || H <= 26) return;
    H = Math.max(26, H - Math.ceil(zuviel / nMax));
    ZGR_ARTEN.forEach(art => { teile[art].opt.h = H * nMax / blaetter(art); teile[art].baum.neu(); });
    // Der neu gezeichnete Baum nach Jacken bekommt den Klapp-Zustand wieder
    if (window._zgrKlappAnwenden) window._zgrKlappAnwenden();
    passen();
  }
  anpassen();

  document.getElementById('zgrhilfe').onclick = () => {
    if (document.getElementById('zgrabz')) document.getElementById('zgrabz').remove();
    else teile.rf.abz(teile.rf.T.knoten[0]);
  };
  document.getElementById('pruefen').onclick = () => {
    const u = zgrE1Hinweise(e);
    if (u.ok){
      // Erst jetzt wird markiert: alles gruen.
      ZGR_ARTEN.forEach(art => { teile[art].baum.pruefen(); teile[art].tab.gruen(); });
      e.hinweis = {};
      zgrHinweisBox(hinweis, D.e1.hinweise.ok, [], true);
      hinweis.style.display = '';
      zgrSammeln('G');
      const neu = !e.ok;
      e.ok = true; sichern();
      histZeigen();
      // Die Sammlung kann gerade erschienen sein: neu einpassen
      if (neu){ autoDeckung = true; zeichneNachher(); anpassen(); } else { anpassen(); passen(); }
    } else {
      if (e.hinweis.key === u.key) e.hinweis.stufe = Math.min((e.hinweis.stufe || 0) + 1, u.stufen.length - 1);
      else e.hinweis = {key: u.key, stufe: 0};
      sichern();
      zgrHinweisBox(hinweis, '', u.stufen.slice(0, e.hinweis.stufe + 1), false);
      hinweis.style.display = '';
      hinweis.querySelectorAll('[data-abz]').forEach(b => b.onclick = () => {
        const t = teile[b.dataset.abz];
        t.abz(t.T.knoten.find(k => k.id === b.dataset.id));
      });
      passen();
    }
    const mehr = !u.ok && e.hinweis.stufe < u.stufen.length - 1;
    befund(u.ok ? `<b>Beide Verteilungen stimmen.</b>`
      : `Noch nicht ganz. Die Hinweise stehen rechts.${mehr ? ' Nochmals «Prüfen» gibt einen weiteren.' : ''}`);
  };
  document.getElementById('weiter').onclick = () => { stand.etappe = 1; los(); };
  loesungsKnopf(() => etappe1());
  if (window.KASPER_RUECKMELDUNG && stand.loesungOffen){
    const panel = document.createElement('div');
    panel.id = 'loesungpanel'; panel.className = 'loesungpanel';
    panel.innerHTML = zgrLoesungE1();
    document.querySelector('.buehne').insertAdjacentElement('afterend', panel);
  }
}

/* ───────── Die waagrechte Tabelle unter einem Baum (FASSUNG 10) ─────────
   X | 0 1 2 3 und P | Zelle. In jede Zelle passt eine Rechnung aus den
   Pfadwahrscheinlichkeiten oder eine Zahl (zgrRechne, wie in Etappe 3),
   darunter steht der Wert, die ganze Rechnung im Tooltip. werte = {k: Text}
   im Stand. Markiert wird nur, wenn
   alles stimmt (gruen) - die Hinweise kommen aus zgrE1Hinweise. */
function zgrVertQuer(ziel, ks, werte, o){
  o = o || {};
  const box = document.createElement('div');
  box.className = 'zgr-quer';
  box.innerHTML = '<table class="zgr-tabelle"><tr><th>X</th>' + ks.map(k => `<td>${k}</td>`).join('')
    + '</tr><tr><th>P</th>' + ks.map(k => `<td><div class="zelle">`
      + `<input class="zgr-zelle" data-k="${k}" placeholder="?" autocomplete="off" spellcheck="false" `
      + `aria-label="P(X = ${k}) unter dem ${o.name || 'Baum'}"></div><div class="wert" data-k="${k}"></div></td>`).join('')
    + '</tr></table><div class="zgr-qrech" aria-live="polite"></div>';
  ziel.appendChild(box);
  let nachAenderung = null;
  // NEU (Fassung 11.1): ein direkt eingetragener richtiger Wert zeigt
  // darunter die Rechnung aus den Pfaden (o.rechnung), die Pfade leuchten
  // kurz (o.leuchten).
  const qrech = box.querySelector('.zgr-qrech');
  const direkt = k => {
    const roh = String(werte[k] || '').trim(), r = roh ? zgrRechne(roh) : null;
    if (!r || !r.einzeln || !o.soll || !o.rechnung || Math.abs(r.wert - zgrZahl(o.soll[k] || [0, 1])) >= 0.006) return null;
    return o.rechnung(+k);
  };
  const zeigen = () => ks.forEach(k => {
    const roh = String(werte[k] || '').trim(), r = roh ? zgrRechne(roh) : null;
    const w = box.querySelector(`.wert[data-k="${k}"]`), f = box.querySelector(`input[data-k="${k}"]`);
    f.title = roh;
    w.classList.toggle('warn', !!roh && !r);
    if (!roh){ w.textContent = ''; return; }
    if (!r){ w.textContent = 'nicht lesbar'; return; }
    const e = zgrErgebnis(r.wert);
    w.textContent = r.einzeln ? '' : (e.genau ? '= ' : '≈ ') + e.t;
  });
  box.querySelectorAll('input').forEach(f => {
    f.value = werte[f.dataset.k] || '';
    f.disabled = !!o.nurLesen;
    f.oninput = () => {
      werte[f.dataset.k] = f.value;
      box.querySelectorAll('.ok,.falsch').forEach(x => x.classList.remove('ok', 'falsch'));
      zeigen();
      const rz = direkt(f.dataset.k);
      if (rz){
        qrech.textContent = `P(X = ${f.dataset.k}) = ${rz.text}`; qrech.title = qrech.textContent; qrech.dataset.k = f.dataset.k;
        if (o.leuchten) o.leuchten(rz.blaetter);
      } else if (qrech.dataset.k === f.dataset.k){ qrech.textContent = ''; qrech.title = ''; delete qrech.dataset.k; }
      if (nachAenderung) nachAenderung(); if (window.sichern) sichern();
    };
  });
  zeigen();
  return {
    set nachAenderung(fn){ nachAenderung = fn; },
    gruen(){ box.querySelectorAll('input').forEach(f => f.classList.add('ok')); },
  };
}

/* ───────── Zusammenklappen im Baum nach Jacken (FASSUNG 12.2) ─────────
   thema.md «Deckung im Baum: Ebene fuer Ebene zusammenklappen», ersetzt
   die Farbcode-Gegenueberstellung aus Fassung 11 (siehe Git).
   GEAENDERT (Rike, «im Baum»): Geklappt wird der Baum nach Jacken LINKS,
   mit den Eintraegen der Studierenden - keine Kopie. Seine Linien werden
   durch eine farbige Schicht ersetzt (gruen = eigene Jacke, gelb =
   fremde). Klappt man bis Ebene L, gleiten die feinen Knoten in etwa 1 s an
   den Platz ihres Asts (gleich gefaerbte Aeste am selben Knoten liegen
   dann aufeinander); die Knoten tragen R bzw. F, die Felder der
   geklappten Ebenen blenden aus, an ihrer Stelle steht der summierte
   Wert. Darunter bleiben die feinen Aeste mit ihren Feldern und gleiten
   mit. Nach Ebene 3 die drei Aeste mit 0 gestrichelt. «Wieder aufklappen»
   stellt den Baum Ebene fuer Ebene wieder her, mit allen Eintraegen.
   Ohne Bewegung bei prefers-reduced-motion. Rechts stehen nur Vorhersage,
   Knoepfe und Texte (zgrKlappen).
   Stand: stand.e1.klapp = {an, L (0 bis 3), nul, vor:{n: Text}, ok:{n:
   true}, tipp:{n: Stufe}, fertig}. */
const ZGR_GRUEN = '#007D57', ZGR_GELB = '#d4ac00';
function zgrRfVon(p){ return [...p].map((j, i) => j === D.e1.jacken[i] ? 'R' : 'F').join(''); }
/* Zeilen bei Klapptiefe L (und den Null-Aesten): {zeile: {Schluessel: r},
   zeilen, key}. Schluessel: 'M' + R/F-Folge (verschmolzen), 'E' + feine
   Folge, 'N' + R/F-Folge (Ast mit 0). */
function zgrKlappZeilen(L, nul){
  const erg = D.e1.rueckgaben, key = p => p.length <= L ? 'M' + zgrRfVon(p) : 'E' + p;
  const fein = [...new Set(erg.flatMap(e => [1, 2, 3].map(t => e.slice(0, t))))];
  const kinder = {}, rang = q => q.replace(/R/g, '0').replace(/F/g, '1');
  const dazu = (eltern, k, sort) => { (kinder[eltern] = kinder[eltern] || new Map()).set(k, sort); };
  fein.forEach(p => dazu(key(p.slice(0, -1)), key(p), p.length <= L ? rang(zgrRfVon(p)) : '2' + p));
  if (nul) D.e1.klapp.nullPfade.forEach(q => dazu('M' + q.slice(0, -1), 'N' + q, rang(q)));
  const ord = k => [...(kinder[k] || new Map()).entries()].sort((a, b) => a[1] < b[1] ? -1 : 1).map(x => x[0]);
  const zeile = {};
  let z = 0;
  const geh = k => {
    const ks = ord(k);
    if (!ks.length){ zeile[k] = z++; return; }
    ks.forEach(geh);
    zeile[k] = (zeile[ks[0]] + zeile[ks[ks.length - 1]]) / 2;
  };
  geh('M');
  return {zeile, zeilen: z, key, fein};
}
/* Der Klapp-Bauer am Baum links. baumEl = Element von zgrBaum. Gibt
   {lage(L, nul, t?), gleite(L1, n1) -> Promise, zurueck()} zurueck. */
function zgrKlappBaum(baumEl, k){
  const T = D.e1.baeume.jacke, nach = zgrBaumNach(T);
  const prefix = {};
  T.knoten.forEach(n => { let p = ''; for (let j = n; j.eltern !== null; j = nach[j.eltern]) p = j.kurz + p; prefix[n.id] = p; });
  const idVon = Object.fromEntries(Object.entries(prefix).map(([id, p]) => [p, id]));
  const ruhig = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const teile = () => {
    const baum = baumEl.querySelector('.zgr-baum');
    if (!baum) return null;
    const kn = {}, ast = {}, x = {};
    baum.querySelectorAll('.zgr-knoten').forEach(b => { kn[prefix[b.dataset.id]] = b; });
    baum.querySelectorAll('.zgr-ast').forEach(f => { ast[prefix[f.dataset.id]] = f; });
    baum.querySelectorAll('.zgr-xfeld').forEach(f => { x[prefix[f.dataset.id]] = f.parentElement; });
    // Die urspruenglichen Lagen einmal merken
    [...Object.values(kn), ...Object.values(ast), ...Object.values(x)].forEach(el => {
      if (el.dataset.ol === undefined){ el.dataset.ol = parseFloat(el.style.left); el.dataset.ot = parseFloat(el.style.top); }
    });
    return {baum, kn, ast, x, linien: baum.querySelector('.zgr-linien')};
  };
  // Lage jedes feinen Knotens (und der Null-Knoten) bei (L, nul)
  const lage = (L, nul) => {
    const t = teile(), Z = zgrKlappZeilen(L, nul);
    const blaetter = Z.fein.filter(p => p.length === 3).map(p => +t.kn[p].dataset.ot);
    const y0 = Math.min(...blaetter), y1 = Math.max(...blaetter);
    const xd = d => +(Object.entries(t.kn).find(([p]) => p.length === d)[1].dataset.ol);
    const y = r => Z.zeilen > 1 ? y0 + r * (y1 - y0) / (Z.zeilen - 1) : y0;
    const pos = {'': [+t.kn[''].dataset.ol, +t.kn[''].dataset.ot]};
    Z.fein.forEach(p => { pos[p] = [xd(p.length), y(Z.zeile[Z.key(p)])]; });
    // Die Wurzel bleibt, wo sie ist
    const nulPos = {};
    if (nul) D.e1.klapp.nullPfade.forEach(q => { nulPos[q] = [xd(3), y(Z.zeile['N' + q])]; });
    return {pos, nulPos, L, nul, key: Z.key, fein: Z.fein};
  };
  // Einen Zustand (oder einen Zwischenstand zwischen A und B) zeichnen
  const zeichne = (A, B, s) => {
    const t = teile();
    if (!t) return;
    const fertig = s >= 1, S = fertig ? B : A;
    const at = p => { const a = A.pos[p], b = B.pos[p]; return [a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s]; };
    t.baum.classList.add('zgr-klappt');
    if (t.linien) t.linien.style.visibility = 'hidden';
    t.baum.querySelectorAll('.zgr-klapplinien,.zgr-klappwert').forEach(el => el.remove());
    const w = t.baum.offsetWidth, h = t.baum.offsetHeight, L = [];
    S.fein.forEach(p => {
      const [x0, y0] = at(p.slice(0, -1)), [x1, y1] = at(p), rf = zgrRfVon(p);
      L.push(`<line x1="${x0 + (p.length > 1 ? 12 : 3)}" y1="${y0}" x2="${x1 - 12}" y2="${y1}" stroke="${rf.slice(-1) === 'R' ? ZGR_GRUEN : ZGR_GELB}" `
        + `stroke-width="${p.length <= S.L && fertig ? 3.4 : 2.4}"/>`);
      // Knoten, Feld und X gleiten mit
      const dx = x1 - +t.kn[p].dataset.ol, dy = y1 - +t.kn[p].dataset.ot;
      const setze = (el, ddx, ddy) => { if (!el) return; el.style.left = (+el.dataset.ol + ddx) + 'px'; el.style.top = (+el.dataset.ot + ddy) + 'px'; };
      setze(t.kn[p], dx, dy); setze(t.ast[p], dx, dy); setze(t.x[p], 0, dy);
      const zu = p.length <= S.L;
      t.kn[p].textContent = zu && fertig ? rf.slice(-1) : p.slice(-1);
      t.kn[p].classList.toggle('zgr-rf', zu && fertig);
      t.kn[p].style.borderColor = rf.slice(-1) === 'R' ? ZGR_GRUEN : ZGR_GELB;
      // Felder der geklappten Ebenen blenden aus (beim Aufklappen erst am Ende ein)
      if (t.ast[p]) t.ast[p].classList.toggle('zgr-klappaus', p.length <= (fertig ? B.L : Math.max(A.L, B.L)));
    });
    // Bei Ebene 3 liegen zwei Pfade aufeinander: ein X-Feld genuegt
    const doppelt = new Set();
    S.fein.filter(p => p.length === 3).forEach(p => {
      const k3 = S.key(p), schon = doppelt.has(k3);
      doppelt.add(k3);
      if (t.x[p]) t.x[p].classList.toggle('zgr-klappaus', schon && S.L === 3 && fertig);
    });
    // Die Aeste mit 0, gestrichelt
    const nA = A.nul, nB = B.nul, deck = nA && nB ? 1 : nB ? s : nA ? 1 - s : 0;
    if (deck > 0){
      const N = nB ? B : A;
      D.e1.klapp.nullPfade.forEach(q => {
        const pa = at([...D.e1.rueckgaben].find(e => zgrRfVon(e).startsWith(q.slice(0, -1))).slice(0, 2));
        const pb = N.nulPos[q], farbe = q.slice(-1) === 'R' ? ZGR_GRUEN : ZGR_GELB;
        L.push(`<g opacity="${deck}"><line x1="${pa[0] + 12}" y1="${pa[1]}" x2="${pb[0] - 12}" y2="${pb[1]}" stroke="${farbe}" stroke-width="2.2" stroke-dasharray="5 4"/>`
          + `<circle cx="${pb[0]}" cy="${pb[1]}" r="11" fill="#fff" stroke="${farbe}" stroke-dasharray="3 2" stroke-width="1.6"/>`
          + `<text x="${pb[0]}" y="${pb[1] + 4.5}" text-anchor="middle" font-size="13" font-weight="600" fill="#2d2924">${q.slice(-1)}</text>`
          + `<text x="${(pa[0] + pb[0]) / 2}" y="${(pa[1] + pb[1]) / 2 - 5}" text-anchor="middle" font-size="12" font-weight="600" fill="#0065A9">0</text></g>`);
      });
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'zgr-klapplinien'); svg.setAttribute('width', w); svg.setAttribute('height', h);
    svg.innerHTML = L.join('');
    t.baum.insertBefore(svg, t.baum.firstChild);
    // Der summierte Wert auf jedem geklappten Ast
    if (fertig){
      const gesehen = new Set();
      S.fein.filter(p => p.length <= S.L).forEach(p => {
        const kk = S.key(p);
        if (gesehen.has(kk)) return;
        gesehen.add(kk);
        const a = S.pos[p.slice(0, -1)], b = S.pos[p], rf = zgrRfVon(p);
        const el = document.createElement('div');
        el.className = 'zgr-klappwert';
        el.textContent = zgrBruchText(D.e1.klapp.wert[rf]);
        el.style.left = (b[0] - 58) + 'px'; el.style.top = b[1] + 'px';
        t.baum.appendChild(el);
      });
    }
  };
  const jetzt = () => lage(k.L, k.nul);
  return {
    // Den gespeicherten Zustand ohne Bewegung zeigen
    zeigen(){ if (!teile()) return; const S = jetzt(); zeichne(S, S, 1); },
    gleite(L1, n1){
      return new Promise(fertig => {
        const A = jetzt(), B = lage(L1, n1);
        k.L = L1; k.nul = n1; sichern();
        if (ruhig()){ zeichne(B, B, 1); return fertig(); }
        const t0 = performance.now(), dauer = 1000;
        const schritt = now => {
          if (!baumEl.isConnected) return fertig();
          const t = Math.min(1, (now - t0) / dauer), e2 = t < .5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t);
          zeichne(A, B, t >= 1 ? 1 : e2);
          if (t < 1) requestAnimationFrame(schritt); else fertig();
        };
        requestAnimationFrame(schritt);
      });
    },
  };
}
/* Ein Element in der rechten Spalte von Etappe 1 sichtbar machen, ohne
   das Feld mit den Baeumen zu verschieben (scrollIntoView rollt alle). */
function zgrInSpalte(el){
  const sp = el && el.closest('.zgr-e1rechts');
  if (!sp) return;
  const r = el.getBoundingClientRect(), s = sp.getBoundingClientRect();
  if (r.bottom > s.bottom - 72) sp.scrollTop += r.bottom - s.bottom + 78;
  else if (r.top < s.top) sp.scrollTop -= s.top - r.top + 6;
}
/* Rechts: Vorhersage, Knoepfe und Texte. Geklappt wird links (zgrKlappBaum). */
function zgrKlappen(ziel, e, nachher, baumEl){
  const K = D.e1.klapp, k = e.klapp;
  const box = document.createElement('div'); box.className = 'zgr-deckfrage zgr-klapp';
  ziel.appendChild(box);
  zgrTitel(box, K.titel).classList.add('gross');
  box.insertAdjacentHTML('beforeend', `<div class="zgr-zart">${K.text}</div>`);
  const steuer = document.createElement('div'); steuer.className = 'zgr-klappsteuer';
  box.appendChild(steuer);
  const KB = zgrKlappBaum(baumEl, k);
  window._zgrKlappAnwenden = () => KB.zeigen();
  const ruhig = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lauf = false;
  const pause = ms => new Promise(r => setTimeout(r, ruhig() ? 0 : ms));
  function zeichneSteuer(meldung){
    let h = '';
    const n = k.L + 1;
    for (let j = 1; j <= k.L; j++) h += `<div class="warum">${K.geklappt.replace('{n}', j).replace('{vorher}', K.vorher[j]).replace('{nachher}', K.soll[j])}</div>`;
    // GEAENDERT (Fassung 13.1, Rike): ohne Vorhersage - der Knopf spielt
    // die naechste Ebene einfach ab.
    if (k.L < 3){
      h += `<button class="knopf" data-a="klappen">${K.klappen.replace('{n}', n)}</button>`;
    } else if (!k.nul){
      h += `<button class="knopf" data-a="null">${K.null}</button>`;
    } else {
      h += `<div class="warum">${K.nullText}</div><button class="knopf leer" data-a="auf">${K.auf}</button>`;
    }
    if (k.fertig && k.L === 0 && !k.nul) h += `<button class="knopf leer" data-a="zu">${K.zu}</button>`;
    steuer.innerHTML = h;
    zgrInSpalte(steuer.lastElementChild);
    steuer.querySelectorAll('[data-a]').forEach(b => b.onclick = async () => {
      if (lauf) return;
      const a = b.dataset.a;
      lauf = true; steuer.querySelectorAll('button').forEach(x => { x.disabled = true; });
      if (a === 'klappen') await KB.gleite(n, false);
      else if (a === 'null'){ await KB.gleite(3, true); const neu = !k.fertig; k.fertig = true; sichern(); if (neu){ lauf = false; return nachher(); } }
      else if (a === 'auf'){
        await KB.gleite(3, false);
        for (let L = 2; L >= 0; L--){ await pause(350); await KB.gleite(L, false); }
      } else if (a === 'zu'){
        for (let L = 1; L <= 3; L++){ await KB.gleite(L, false); await pause(350); }
        await KB.gleite(3, true);
      }
      lauf = false; zeichneSteuer();
    });
  }
  KB.zeigen(); zeichneSteuer();
}

function zgrLoesungE1(){
  const v = D.e1.verteilung, kb = Object.fromEntries(D.e1.baeume.rf.knoten.filter(k => k.w).map(k => [k.id, zgrBruchText(k.w)]));
  const K = D.e1.klapp;
  return '<h4>Etappe 1</h4>'
    + '<div class="zeile"><b>Verteilung</b>: ' + v.map(([k, b]) => `P(X=${k}) = ${zgrBruchText(b)}`).join(', ')
    + '. In der Zelle darf eine Rechnung stehen, z. B. 1/3·1/2·1 + 1/3·1/2·1 + 1/3·1/2·1.</div>'
    + '<div class="zeile"><b>Nach Jacken</b>: Anna je ⅓; Ben je ½ für die zwei übrigen '
    + 'Jacken; Clara 1 für die letzte. Sechs Pfade zu je ⅙. X am Pfadende: abc 3; acb, bac, cba 1; '
    + 'bca, cab 0.</div>'
    + '<div class="zeile"><b>Nach richtig/falsch</b> (Anna, Ben, Clara): Anna ' + kb.R + ' | ' + kb.F
    + '; nach R: Ben ' + kb.RR + ' | ' + kb.RF + '; nach F: Ben ' + kb.FR + ' | ' + kb.FF
    + '; nach RR: ' + kb.RRR + ' | ' + kb.RRF + '; nach RF und FR: 0 | 1; nach FF: ' + kb.FFR + ' | ' + kb.FFF
    + '. X = Anzahl R, auch an den drei Pfaden mit 0 (alle X = 2).</div>'
    + '<div class="zeile"><b>Typischer Fehler:</b> überall ⅓ und ⅔. Dann wird die Tabelle '
    + D.e1.drittel.map(([, b]) => zgrBruchText(b)).join(', ')
    + ', mit P(X=2) > 0. Das sind drei unabhängige Personen; Etappe 3 knüpft daran an.</div>'
    + '<div class="zeile"><b>Zusammenklappen</b> (grün = eigene Jacke, gelb = fremde, automatisch): '
    + [1, 2, 3].map(n => `Ebene ${n}: ${K.vorher[n]} → ${K.soll[n]} Äste`).join('; ')
    + '. Ebene 1: b, c → F. Ebene 2: ab = RR, ac = RF bleiben; cb = FR allein; ba, bc, ca → FF. Ebene 3: nur bca, cab → FFF. '
    + `Danach gestrichelt die Äste mit 0: ${K.nullPfade.join(', ')}. Ohne Eingabe: Die Knöpfe spielen jede Ebene ab; `
    + '«Wieder aufklappen» spielt rückwärts.</div>'
    + `<div class="zeile"><b>Wette</b>: ${D.e1.wetteSicht}</div>`
    + '<div class="zeile"><b>Prüfen</b> markiert nichts, solange etwas falsch ist, sondern gibt gestufte Hinweise: '
    + 'Leeres, dann X, dann Verteilung gegen den eigenen Baum, dann «stimmen nicht überein», «Ast nach …», '
    + '«Wie viele Rückgaben …?». Erst wenn beide stimmen, erscheint von selbst das Histogramm, dann das Zusammenklappen '
    + 'Ebene für Ebene, dann Zusammenhang und Wette.</div>';
}

/* ───────── Etappe 2 · Gibt es hier auch Weg 1 und Weg 2? (FASSUNG 15) ─────────
   GEAENDERT (FASSUNG 15, thema.md «Etappe 2 als eine Reihe von sieben
   Situationen», Rike 2026-10-19): EINE Reihe, kein Teil A/B, kein
   Kaertchen-Brett, keine Schreibfelder «unterscheiden», keine
   Brueckenkarte. Fassung 12 bis 14 stehen in Git.
   - Sieben Situationen (D.e2.situationen, Reihenfolge inhalte.E2_REIHE):
     Glueckstopf, Riesenrad, Entenfischen, Autoscooter, Korbwurf (der
     Clou), Dosenwerfen, Torwand. Oben «Situation n von 7».
   - Links ueber den Baeumen der blaue Satz: wonach Weg 1 und Weg 2
     aufteilen. Darunter beide Baeume, sofort, leer, zwei Stufen
     (zgrWegBaum).
   - Rechts Schritt 1 «In beiden Baeumen anfangen»: erste Stufe und ein
     markierter Knoten je Baum, gestufte Hinweise, beim Riesenrad und
     beim Autoscooter die Hilfe am heiklen Knoten; dann «Rest ausfuellen
     lassen» und unter jedem Baum die Pfadzahl. Ab Situation 6 freiwillig.
   - Beim Korbwurf Schritt 2 «Baeume uebereinanderlegen»: Weg 2 gleitet
     auf Weg 1 (zgrE2Decken), die Etiketten ruecken untereinander.
   - Dann «Was stellen Sie fest?» mit den drei Feststellungen; ist sie
     richtig, steht die Verteilung da und kommt in die Sammlung.
   - Am Schluss (aktiv = 'Z') die Uebersicht und «Eine moegliche Sicht»;
     freiwillig (aktiv = 'S') «Und im Skript?».
   Stand: stand.zgr15 = {aktiv, kn:{id:{1:{Ast: Text}, 2:{…}}}, ok:{id:
   true} (Schritt 1), rest:{id: true}, deck:{id: true}, fest:{id:
   Feststellung}, tipp:{Schluessel: Stufe}, skript:{Aufgabe: Feststellung}}.
   Ein Stand aus Fassung 14 (stand.zgr11) beginnt neu (zgrStandPruefen). */
const zgrE2Ids = () => [...D.e2.situationen.map(s => s.id), 'Z', 'S'];
const zgrFallName = fid => D.e2.faelle.find(f => f.id === fid).name;
/* Fertig: die richtige Feststellung, dazu Schritt 1 (ausser freiwillig)
   und beim Korbwurf das Uebereinanderlegen. */
const zgrE2Fertig = (st, s) => st.fest[s.id] === s.karte.fest && (s.frei || !!st.ok[s.id]) && (!s.decken || !!st.deck[s.id]);
const zgrAlleFertig = st => D.e2.situationen.every(s => zgrE2Fertig(st, s));
const zgrSkriptFertig = st => D.e2.skript.karten.every(k => st.skript[k.id] === k.fall);
function zgrE2Stand(){
  if (!zgrObj(stand.zgr15)) stand.zgr15 = {};
  const st = stand.zgr15;
  ['kn', 'ok', 'rest', 'deck', 'fest', 'tipp', 'skript'].forEach(k => { if (!zgrObj(st[k])) st[k] = {}; });
  D.e2.situationen.forEach(s => {
    if (!zgrObj(st.kn[s.id])) st.kn[s.id] = {};
    ['1', '2'].forEach(n => { if (!zgrObj(st.kn[s.id][n])) st.kn[s.id][n] = {}; });
    if (st.fest[s.id] && !D.e2.faelle.some(f => f.id === st.fest[s.id])) delete st.fest[s.id];
  });
  Object.keys(st.skript).forEach(k => { if (!D.e2.faelle.some(f => f.id === st.skript[k])) delete st.skript[k]; });
  if (!zgrE2Ids().includes(st.aktiv)) st.aktiv = zgrE2Ids()[0];
  // Eine fertige Situation hat ihre Verteilung in der Sammlung
  const sa = zgrSammlung();
  D.e2.situationen.forEach(s => { if (zgrE2Fertig(st, s)) sa[s.sammlung] = true; });
  return st;
}
/* Die Loesung als Stand (Kontrollfassung): alle Knoten, alles
   ausgefuellt, uebereinandergelegt, alle Feststellungen richtig. */
function zgrE2Loesung(){
  const alt = stand.zgr15 || {};
  const st = {aktiv: alt.aktiv, kn: {}, ok: {}, rest: {}, deck: {}, fest: {}, tipp: {}, skript: {}};
  D.e2.situationen.forEach(s => {
    const P = s.karte.pflicht;
    st.kn[s.id] = {1: {}, 2: {}};
    ['1', '2'].forEach(n => P.baeume[n].forEach(kn => kn.aeste.forEach(x => { st.kn[s.id][n][x.id] = x.text; })));
    st.ok[s.id] = true; st.rest[s.id] = true; st.fest[s.id] = s.karte.fest;
    if (s.decken) st.deck[s.id] = true;
  });
  D.e2.skript.karten.forEach(k => { st.skript[k.id] = k.fall; });
  return st;
}

/* Einsatz und Gewinnplan einer Bude als kleine Tabelle - seit Fassung
   8.1 nur noch in Etappe 3. */
function zgrPlanHtml(plan){
  return `<div class="zgr-plantitel">${plan.titel}</div><table class="zgr-tabelle zgr-plan"><tr><td>X</td>`
    + plan.zeilen.map(([k]) => `<td>${k}</td>`).join('') + '</tr><tr><td>Auszahlung in Fr.</td>'
    + plan.zeilen.map(([, a]) => `<td>${a}</td>`).join('') + '</tr></table>';
}

/* GEAENDERT (Fassung 12.1): Ein Weg oder Geruest als kleiner Baum (bis
   drei Stufen), als Element: unten das SVG mit Aesten und Beschriftungen,
   darueber - Pixel fuer Pixel - die Werte als Text oder Feld. Ersetzt
   zgrWegSvg aus Fassung 12 (dort mit «?», das entfaellt).
   W = {koepfe, knoten:[{id, eltern, tiefe, text}], andeuten:{id, n, w}}.
   o = {breite, hoehe, ast(k) -> null | {t, c} | {feld: {wert, cls, label,
   ein(v)}}, pflicht: [Knoten-ID]}. Ein Pfad je Zeile; beim angedeuteten
   Weg 1 (Glueckstopf) bekommt der erste Knoten einen Faecher mit drei
   Zeilen, die anderen ein «…». */
function zgrWegBaum(W, o){
  const SCH = D.e2.schritte, A = W.andeuten, pflicht = new Set(o.pflicht || []);
  const kinder = id => W.knoten.filter(k => k.eltern === id);
  const T = Math.max(W.koepfe.length, ...W.knoten.map(k => k.tiefe));
  // Zeilen je Knoten: ein Blatt eine, der Faecher drei
  const zeilen = k => { const ks = kinder(k.id); return ks.length ? ks.reduce((s, c) => s + zeilen(c), 0) : (A && A.id === k.id ? 3 : 1); };
  const k1 = kinder('');
  const n = k1.reduce((s, k) => s + zeilen(k), 0), kopf = 30;
  const rh = Math.max(o.ast ? (n <= 10 ? 31 : 29) : 22, Math.min(n > 8 ? 31 : n > 6 ? 34 : 40, Math.floor(((o.hoehe || 340) - kopf - 6) / n)));
  const w = o.breite || 320, h = kopf + n * rh + 6;
  // NEU (Fassung 15): o.bx - feste halbe Breite der Etiketten. Beim
  // Korbwurf haben beide Baeume dieselbe, damit sie sich decken.
  const breit = t => o.bx ? 2 * o.bx : String(t).length * 6.6 + 10;
  // Rechts so viel Rand, wie die breiteste Beschriftung der letzten Stufe braucht
  const rand = Math.max(A ? (o.fan ? 104 : 64) : 30, String(W.koepfe[T - 1] || '').length * 3.1 + 4,
    ...W.knoten.filter(k => k.tiefe === T).map(k => breit(k.text) / 2 + 4));
  const x0 = 8, xs = d => Math.round(x0 + d * (w - x0 - rand) / T);
  const lage = {}, teile = [], oben = [];
  let r = 0;
  const setze = k => {
    const ks = kinder(k.id);
    if (!ks.length){ const z = zeilen(k); lage[k.id] = [xs(k.tiefe), kopf + (r + z / 2) * rh]; r += z; return; }
    ks.forEach(setze);
    lage[k.id] = [xs(k.tiefe), (lage[ks[0].id][1] + lage[ks[ks.length - 1].id][1]) / 2];
  };
  k1.forEach(setze);
  const wurzel = [x0, kopf + n * rh / 2];
  W.koepfe.forEach((t, i) => teile.push(`<text class="kopf" x="${xs(i + 1)}" y="16" text-anchor="middle">${zgrEsc(t)}</text>`));
  teile.push(`<circle cx="${wurzel[0]}" cy="${wurzel[1]}" r="3.5" class="punkt${pflicht.has('') ? ' pflicht' : ''}"/>`);
  const ast = k => {
    const von = k.eltern === '' ? wurzel : lage[k.eltern];
    const [x, y] = lage[k.id], bx = breit(k.text) / 2;
    const xa = von[0] + (k.eltern === '' ? 3 : breit(W.knoten.find(q => q.id === k.eltern).text) / 2);
    teile.push(`<line x1="${xa}" y1="${von[1]}" x2="${x - bx}" y2="${y}" class="ast${pflicht.has(k.eltern) ? ' pflicht' : ''}"/>`);
    // Etikett als Gruppe (etk): beim Uebereinanderlegen rueckt es nach unten
    teile.push(`<g class="etk"><rect class="kn${pflicht.has(k.id) ? ' pflicht' : ''}" x="${x - bx}" y="${y - 10}" width="${2 * bx}" height="20" rx="6"/>`
      + `<text class="t" x="${x}" y="${y + 4.5}" text-anchor="middle">${zgrEsc(k.text)}</text></g>`);
    const v = o.ast ? o.ast(k) : null;
    if (v){
      const geschw = kinder(k.eltern).length, t = geschw > 3 ? 0.8 : geschw === 3 ? 0.86 : 0.7;
      const mx = xa + (x - bx - xa) * t, my = von[1] + (y - von[1]) * t;
      oben.push({mx, my, v, k});
    }
    kinder(k.id).forEach(ast);
    if (A && !kinder(k.id).length && k.tiefe === 1){
      const xe = x + bx;
      if (A.id === k.id){
        for (let i = 0; i < A.n; i++){
          const yy = y - 1.1 * rh + i * 2.2 * rh / (A.n - 1);
          teile.push(`<line x1="${xe}" y1="${y}" x2="${xs(2) - 30}" y2="${yy}" class="ast zart"/>`);
        }
        // NEU (Fassung 14): o.fan() - ein Feld (oder Wert) fuer «je» hinter dem Faecher
        const fv = o.fan ? o.fan() : null;
        if (fv){
          teile.push(`<text class="w" x="${xs(2) - 24}" y="${y + 4}">${zgrEsc(SCH.andeutenLeer.replace('{n}', A.n).replace('{wort}', A.wort))}, je</text>`);
          oben.push({mx: xs(2) + 58, my: y, v: fv, k: {id: A.id + '/*', text: 'je', eltern: A.id}});
        } else {
          const txt = (A.w ? SCH.andeuten.replace('{w}', A.w) : SCH.andeutenLeer).replace('{n}', A.n).replace('{wort}', A.wort);
          teile.push(`<text class="w" x="${xs(2) - 24}" y="${y + 4}">${zgrEsc(txt)}</text>`);
        }
      } else teile.push(`<text class="zart" x="${xe + 14}" y="${y + 4}">${SCH.weiter}</text>`);
    }
  };
  k1.forEach(ast);
  const el = document.createElement('div');
  el.className = 'zgr-wegbaum';
  el.style.width = w + 'px'; el.style.height = h + 'px';
  el.innerHTML = `<svg class="zgr-wegsvg" xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${teile.join('')}</svg>`;
  // Ohne Werte (leere Gerueste) darf der Baum mit dem Platz schrumpfen
  if (o.skalieren){ el.classList.add('skaliert'); el.style.width = ''; el.style.maxWidth = w + 'px'; el.style.height = ''; }
  oben.forEach(({mx, my, v, k}) => {
    if (v.feld){
      const f = document.createElement('input');
      f.className = 'zgr-wfeld' + (v.feld.cls ? ' ' + v.feld.cls : '');
      f.value = v.feld.wert == null ? '' : v.feld.wert;
      f.autocomplete = 'off'; f.spellcheck = false; f.placeholder = '?';
      f.setAttribute('aria-label', v.feld.label || k.text);
      f.dataset.id = k.id;
      if (o.weg) f.dataset.weg = o.weg;
      if (v.feld.title) f.title = v.feld.title;
      f.disabled = !!v.feld.aus;
      f.style.left = (mx - 25) + 'px'; f.style.top = (my - 11) + 'px';
      if (v.feld.ein) f.oninput = () => v.feld.ein(f.value, f);
      el.appendChild(f);
    } else {
      const s = document.createElement('span');
      s.className = 'zgr-wwert' + (v.c ? ' ' + v.c : '');
      s.textContent = v.t;
      s.style.left = mx + 'px'; s.style.top = (my - 9) + 'px';
      el.appendChild(s);
    }
  });
  return el;
}

function etappe2(){
  loesungAnwenden(() => ({zgr15: zgrE2Loesung()}));
  const st = zgrE2Stand();
  const a = D.etappen[1], K = D.e2.situationen, SCH = D.e2.schritte, ids = zgrE2Ids();
  const i = ids.indexOf(st.aktiv);
  const knopf = (id, t, rechts) => `<button class="knopf leer" id="${id}"${rechts ? ' style="margin-left:auto"' : ''}>${t}</button>`;
  // Der Fortschritt: Situation 1 bis 7, die Uebersicht, der Nachtrag
  const punkte = () => ids.map((id, j) => {
    const s = K[j];
    const ok = s ? zgrE2Fertig(st, s) : id === 'Z' ? zgrAlleFertig(st) : zgrSkriptFertig(st);
    const zeichen = s ? String(j + 1) : id === 'Z' ? 'Σ' : 'S';
    const titel = s ? s.name : id === 'Z' ? D.e2.uebersicht : D.e2.skript.titel;
    return `<button type="button" class="pkt${j === i ? ' jetzt' : ''}${ok ? ' fertig' : ''}" data-id="${id}" title="${titel}"`
      + `${j === i ? ' aria-current="step"' : ''}>${ok ? '✓' : zeichen}</button>`;
  }).join('');
  const kopf = st.aktiv === 'Z' ? D.e2.uebersicht : st.aktiv === 'S' ? D.e2.skript.titel
    : D.e2.fortschritt.replace('{i}', i + 1).replace('{n}', K.length) + ` · ${K[i].name}`;
  const fort = `<div class="zgr-fortschritt" id="zgrfort"><b>${kopf}</b>${punkte()}</div>`;
  window._zgrFertigHaken = null;
  window._zgrPassen = null;
  if (st.aktiv === 'Z') return zgrE2Schluss(st, a, fort, knopf);
  if (st.aktiv === 'S') return zgrE2Skript(st, a, fort, knopf);

  const S = K[i], c = S.karte, id = S.id;
  const leiste = (i > 0 ? knopf('zgrvorige', D.e2.vorige) : '')
    + '<span class="befund" id="befund"></span>'
    + `<button class="knopf leer" id="weiter" style="margin-left:auto">${i < K.length - 1 ? D.e2.naechste : D.e2.zurUebersicht}</button>`;
  buehne({rolle: a.rolle, rang: a.rang, titel: `Etappe 2 · ${a.name}`, text: ''},
    SCH.baeume, SCH.aufgaben, leiste, fort + zgrSammlungHtml(true)
    + zgrKarteHtml({id: 'e2' + id, nr: 2, name: S.name, frage: D.skarte.e2frage, bild: S.bild, text: S.satz}), '', [1.2, 1]);
  zgrAuftragKopf(2);
  zgrKarteHaken(null);
  zgrFortHaken(st, !zgrE2Fertig(st, S));
  window._zustaendig = () => false;
  window._neuzeichnen = null;
  const tisch = document.getElementById('tisch'), feld = document.getElementById('feld');
  const fortNeu = () => {
    const f = document.getElementById('zgrfort');
    if (!f) return;
    f.querySelectorAll('.pkt').forEach(x => x.remove());
    f.insertAdjacentHTML('beforeend', punkte());
    f.classList.toggle('gedimmt', !zgrE2Fertig(st, S));
  };
  const stufe = (key, liste) => { st.tipp[key] = Math.min((st.tipp[key] || 0) + 1, liste.length); return st.tipp[key]; };
  // Ist die Situation fertig, fuehrt die Fahne weiter - nach 1.5 s von
  // selbst, wenn der letzte Eintrag sie gerade fertig macht.
  const W11 = D.weiter, letzte = i === K.length - 1;
  const fahneKarte = auto => {
    if (!zgrE2Fertig(st, S)) return zgrFahne(null);
    zgrFahne({notiz: W11.budeNotiz, knopf: letzte ? W11.faelle : W11.bude, uhr: auto,
      meldung: letzte ? W11.faelleMeldung : W11.budeMeldung,
      wache: () => stand.etappe === 1 && st.aktiv === id,
      tun: () => { st.aktiv = ids[i + 1]; sichern(); etappe2(); }});
  };
  let warFertig = zgrE2Fertig(st, S);
  const fertigNeu = () => {
    const jetzt = zgrE2Fertig(st, S);
    if (jetzt) zgrSammeln(S.sammlung);
    fortNeu();
    if (jetzt !== warFertig) fahneKarte(jetzt);
    warFertig = jetzt;
  };

  const KT = D.e2.knotenText, DK = D.e2.decken, P = c.pflicht, kn = st.kn[id];
  const knOk = () => !!st.ok[id];
  const feldIds = {1: P.baeume['1'].flatMap(k => k.aeste.map(x => x.id)), 2: P.baeume['2'].flatMap(k => k.aeste.map(x => x.id))};
  const wahr = (nr, aid) => { for (const k of P.baeume[nr]) for (const x of k.aeste) if (x.id === aid) return x; return null; };
  const gleichWert = (e, soll) => { const r = e ? zgrRechne(e) : null; return !!r && Math.abs(r.wert - zgrRechne(soll).wert) < 0.006; };

  // Links: der blaue Satz, darunter beide Baeume
  tisch.insertAdjacentHTML('beforeend', `<div class="zgr-teilen">${S.teilen}</div>`);
  const wege = document.createElement('div'); wege.className = 'zgr-wege';
  tisch.appendChild(wege);
  // Korbwurf: dieselbe Etikettenbreite in beiden Baeumen, damit sie sich decken
  const bx = S.decken ? Math.max(...[c.weg1, c.weg2].flatMap(W => W.knoten.map(k => String(k.text).length))) * 3.3 + 5 : 0;
  const zeichneWege = () => {
    // Klappt die Situationskarte beim Tippen zu, wird neu gezeichnet: Das
    // Feld mit dem Cursor bekommt ihn danach zurueck.
    const af = document.activeElement;
    const fokus = af && wege.contains(af) && af.dataset.id ? {id: af.dataset.id, weg: af.dataset.weg, pos: af.selectionStart} : null;
    wege.innerHTML = '';
    const platz = tisch.clientWidth - 40;
    const hoehe = Math.max(240, tisch.clientHeight - 130);
    // Unter 600 px stehen die Baeume untereinander, je mindestens 300 px
    // breit: schmaler ueberdecken die Felder die Beschriftungen.
    const neben = platz >= 600;
    const b = neben ? Math.min(340, Math.floor((platz - 30) / 2)) : Math.max(300, Math.min(340, platz));
    [1, 2].forEach(nr => {
      const [titel, was] = D.e2.wege[nr];
      const box = document.createElement('div'); box.className = 'zgr-wegbox';
      box.innerHTML = `<div class="titel"><b>${titel}</b> <span>${S.wegTitel[nr] || was}</span> <span class="zgr-stufenmarke">${KT.stufen}</span></div>`;
      const W = c['weg' + nr], eintr = kn[nr];
      const o = {breite: b, hoehe, pflicht: P.baeume[nr].map(k => k.weg), weg: String(nr), bx};
      box.style.flex = `0 1 ${b + 4}px`;
      const feld = aid => ({feld: {wert: eintr[aid], aus: knOk(), cls: 'pflichtfeld' + (knOk() ? ' ok' : ''), label: aid,
        ein: (v, f) => { eintr[aid] = v; f.classList.remove('falsch'); sichern(); }}});
      const restWert = (aid, soll) => {
        const eigen = String(eintr[aid] || '').trim();
        return {t: soll, c: eigen && !gleichWert(eigen, soll) ? 'korr' : eigen ? 'eigen' : 'rest'};
      };
      o.ast = k => {
        if (feldIds[nr].includes(k.id)) return feld(k.id);
        if (st.rest[id]) return restWert(k.id, k.w);
        if (!knOk()) return null;
        return {feld: {wert: eintr[k.id], cls: 'frei', label: k.text, ein: v => { eintr[k.id] = v; sichern(); }}};
      };
      // Der angedeutete Weg 1 (Glueckstopf, Entenfischen): ein Feld «je»
      if (W.andeuten){
        const aid = W.andeuten.id + '/*';
        o.fan = () => feldIds[nr].includes(aid) ? feld(aid) : st.rest[id] ? restWert(aid, W.andeuten.w) : null;
      }
      box.appendChild(zgrWegBaum(W, o));
      if (knOk() || zgrE2Fertig(st, S)){
        const n = nr === 1 ? c.w1 : c.w2, k0 = nr === 2 ? c.null : 0;
        box.insertAdjacentHTML('beforeend', `<div class="zgr-zart legende">${(k0 ? KT.pfadeNull.replace('{k}', k0) : KT.pfade).replace('{n}', n)}</div>`);
      }
      // Fassung 15.1: Riesenrad, Autoscooter - in Weg 1 ist jeder Pfad gleich
      if (nr === 1 && c.gleichW1 && st.rest[id]) box.insertAdjacentHTML('beforeend', `<div class="legende zgr-laplace">${c.gleichW1}</div>`);
      wege.appendChild(box);
    });
    if (S.decken && st.deck[id]) requestAnimationFrame(() => zgrE2Decken(wege, false));
    if (fokus){
      const f = [...wege.querySelectorAll('.zgr-wfeld')].find(q => q.dataset.id === fokus.id && q.dataset.weg === fokus.weg);
      if (f && !f.disabled){ f.focus({preventScroll: true}); try { f.setSelectionRange(fokus.pos, fokus.pos); } catch(_) {} }
    }
  };

  // Rechts: Schritt 1, beim Korbwurf das Uebereinanderlegen, die Feststellung
  const sk = document.createElement('div'), sd = document.createElement('div'), s2 = document.createElement('div'), sv = document.createElement('div');
  [sk, sd, s2].forEach(x => { x.className = 'zgr-satz zgr-e2schritt'; feld.appendChild(x); });
  feld.appendChild(sv);
  const nrFest = S.decken ? 3 : 2;
  function zeichneKn(meldung){
    const ok = knOk();
    sk.classList.toggle('ok', ok);
    let h = `<div class="kopf">1 · ${KT.titel}${S.frei ? ` · ${SCH.frei}` : ''}</div><div>${KT.text}</div>`;
    if (!ok){
      const n1 = st.tipp[id + 'kn1'] || 0, n2 = st.tipp[id + 'kn2'] || 0;
      h += `<div class="zgr-zeile" style="padding:0;margin-top:5px"><button class="knopf zgr-e2pruefen">${SCH.pruefen}</button>`
        + (P.hilfe ? `<button class="zgr-hilfe" data-hilfe="1">${KT.hilfe}</button>` : '') + '</div>'
        + (meldung || '')
        + (n1 ? `<div class="warum"><b>${D.e2.wege[1][0]}:</b> ${P.tipps['1'].slice(0, n1).join(' ')}</div>` : '')
        + (n2 ? `<div class="warum"><b>${D.e2.wege[2][0]}:</b> ${P.tipps['2'].slice(0, n2).join(' ')}</div>` : '')
        + (P.hilfe && st.tipp[id + 'knHilfe'] ? `<div class="warum"><b>${P.hilfe}</b></div>` : '');
    } else {
      h += `<div class="warum">${KT.ok}</div>`;
      h += st.rest[id] ? `<div class="warum">${KT.restOk}</div>`
        : `<div class="zgr-zeile" style="padding:0;margin-top:5px"><button class="knopf leer" data-rest="1">${KT.rest}</button></div><div class="zgr-zart">${KT.selbst}</div>`;
    }
    sk.innerHTML = h;
    const b = sk.querySelector('.zgr-e2pruefen');
    if (b) b.onclick = () => {
      const felder = [...wege.querySelectorAll('.zgr-wfeld.pflichtfeld')];
      felder.forEach(f => f.classList.remove('falsch'));
      const leer = [1, 2].some(nr => feldIds[nr].some(aid => !zgrRechne(kn[nr][aid])));
      if (leer) return zeichneKn(`<div class="warum falsch">${KT.leer}</div>`);
      const saetze = [];
      let falschIrgend = false;
      [1, 2].forEach(nr => {
        const schlecht = feldIds[nr].filter(aid => !gleichWert(kn[nr][aid], wahr(nr, aid).text));
        if (!schlecht.length) return;
        falschIrgend = true;
        schlecht.forEach(aid => { const f = felder.find(q => q.dataset.id === aid && q.dataset.weg === String(nr)); if (f) f.classList.add('falsch'); });
        stufe(id + 'kn' + nr, P.tipps[String(nr)]);
        // Summe eines Knotens (bei «je» nicht)
        P.baeume[nr].forEach(k => {
          if (k.aeste.length < 2) return;
          const s = k.aeste.reduce((acc, x) => acc + (zgrRechne(kn[nr][x.id]) || {wert: 0}).wert, 0);
          if (!zgrNahe(s, 1)) saetze.push(`${D.e2.wege[nr][0]}: ` + KT.summe.replace('{wo}', k.weg ? KT.nachK.replace('{nach}', k.nach) : KT.start).replace('{s}', zgrDezText(s)));
        });
      });
      if (!falschIrgend){ st.ok[id] = true; sichern(); fertigNeu(); return etappe2(); }
      sichern();
      zeichneKn(`<div class="warum falsch">${SCH.nochNicht} ${saetze.join(' ')}</div>`);
    };
    const hb = sk.querySelector('[data-hilfe]');
    if (hb) hb.onclick = () => { st.tipp[id + 'knHilfe'] = 1; sichern(); zeichneKn(); };
    const rb = sk.querySelector('[data-rest]');
    if (rb) rb.onclick = () => { st.rest[id] = true; sichern(); zeichneWege(); zeichneKn(); };
  }
  // NEU (Fassung 15): der Clou beim Korbwurf
  function zeichneDeck(){
    sd.style.display = S.decken ? '' : 'none';
    if (!S.decken) return;
    const fertig = !!st.deck[id];
    sd.classList.toggle('ok', fertig);
    sd.innerHTML = `<div class="kopf">2 · ${DK.titel}</div>`
      + (fertig ? `<div class="zgr-decksatz">${DK.satz}</div><div class="warum">${DK.detail}</div>`
        : `<div>${DK.text}</div>` + (knOk() ? `<div class="zgr-zeile" style="padding:0;margin-top:5px"><button class="knopf" data-deck="1">${DK.knopf}</button></div>`
          : `<div class="zgr-zart">${DK.erst}</div>`));
    const db = sd.querySelector('[data-deck]');
    if (db) db.onclick = () => {
      st.rest[id] = true; st.deck[id] = true; sichern();
      zeichneKn();
      zeichneWegeOhneDecke();
      requestAnimationFrame(() => zgrE2Decken(wege, true, () => { zeichneDeck(); zeichne2(); }));
    };
  }
  // Beim Klick auf «uebereinanderlegen»: die Baeume erst nebeneinander
  // zeichnen, dann gleitet Weg 2 (zgrE2Decken mit Animation)
  const zeichneWegeOhneDecke = () => { const d = st.deck[id]; st.deck[id] = false; zeichneWege(); st.deck[id] = d; };
  function zeichne2(){
    const offen = (S.frei || knOk()) && (!S.decken || st.deck[id]);
    s2.style.display = offen ? '' : 'none';
    if (!offen){ zeichneVert(); return; }
    const f = st.fest[id];
    s2.classList.toggle('ok', f === c.fest);
    let urteil = '';
    if (f === c.fest) urteil = `<div class="warum" role="status">${SCH.ok} ${c.grundFest}</div>`;
    else if (f){
      const n = st.tipp[id + 'fest'] || 1;
      urteil = `<div class="warum falsch" role="status">${SCH.nochNicht} ${c.tippFest.slice(0, n).join(' ')}</div>`;
    }
    s2.innerHTML = `<div class="kopf">${nrFest} · ${SCH.fest}</div>`
      + `<div class="zgr-festwahl" role="group" aria-label="${SCH.fest}">`
      + D.e2.faelle.map(x => `<button data-f="${x.id}" aria-pressed="${f === x.id}">${x.name}</button>`).join('')
      + '</div>' + urteil;
    s2.querySelectorAll('[data-f]').forEach(b => b.onclick = () => {
      st.fest[id] = b.dataset.f;
      if (b.dataset.f !== c.fest) stufe(id + 'fest', c.tippFest);
      sichern(); zeichne2(); fertigNeu();
      if (zgrE2Fertig(st, S)) zeichneWege();
    });
    zeichneVert();
  }
  // Ist die Situation fertig: die Verteilung, fuer die Sammlung
  function zeichneVert(){
    sv.innerHTML = '';
    if (!zgrE2Fertig(st, S)) return;
    zgrTitel(sv, SCH.verteilung);
    sv.insertAdjacentHTML('beforeend', `<div style="margin:0 10px">${zgrVertTabelle(S.vert, 'X', S.dezimal)}</div>`);
  }
  zeichneWege(); zeichneKn(); zeichneDeck(); zeichne2();
  fahneKarte(false);
  window._zgrPassen = () => { if (wege.isConnected) zeichneWege(); };
  if (!window._zgrPassenAn){ window._zgrPassenAn = true; window.addEventListener('resize', () => { if (window._zgrPassen) window._zgrPassen(); }); }

  const vg = document.getElementById('zgrvorige');
  if (vg) vg.onclick = () => { st.aktiv = ids[i - 1]; sichern(); etappe2(); };
  document.getElementById('weiter').onclick = () => { st.aktiv = ids[i + 1]; sichern(); etappe2(); };
  loesungsKnopf(() => etappe2());
  zgrE2LoesungPanel();
}

/* NEU (FASSUNG 15): Weg 2 gleitet auf Weg 1. Beide Baeume sind gleich
   gross und haben gleich breite Etiketten (o.bx), Lage und Zahl decken
   sich. Danach ruecken die Etiketten von Weg 2 unter die von Weg 1
   (Klasse «gedeckt»). Ohne Animation bei reduzierter Bewegung und beim
   Neuzeichnen. */
function zgrE2Decken(wege, animiert, nachher){
  const baeume = wege.querySelectorAll('.zgr-wegbaum');
  if (baeume.length < 2) return;
  const [b1, b2] = baeume, box2 = b2.closest('.zgr-wegbox');
  const r1 = b1.getBoundingClientRect(), r2 = b2.getBoundingClientRect();
  const ruhig = !animiert || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  box2.classList.add('deckt');
  b2.classList.add('w2');
  b2.style.transition = ruhig ? 'none' : 'transform 1.4s ease-in-out';
  const fertig = () => {
    b2.classList.add('gedeckt');
    if (ruhig) b2.classList.add('ruhig');
    if (nachher) setTimeout(nachher, ruhig ? 0 : 650);
  };
  // Erzwingt den Ausgangszustand, bevor die Bewegung beginnt
  void b2.offsetWidth;
  b2.style.transform = `translate(${r1.left - r2.left}px, ${r1.top - r2.top}px)`;
  if (ruhig) fertig();
  else b2.addEventListener('transitionend', function e(ev){ if (ev.propertyName !== 'transform') return; b2.removeEventListener('transitionend', e); fertig(); });
}

/* Die Punkte oben waehlen eine Situation. Sie sind nachrangig und
   ausgegraut, solange die laufende Situation offen ist, bleiben aber
   anklickbar. */
function zgrFortHaken(st, offen){
  const f = document.getElementById('zgrfort');
  if (!f) return;
  f.classList.toggle('gedimmt', !!offen);
  f.title = offen ? D.weiter.gedimmt : '';
  f.onclick = ev => {
    const b = ev.target.closest('.pkt[data-id]');
    if (!b || b.dataset.id === st.aktiv) return;
    st.aktiv = b.dataset.id; sichern(); etappe2();
  };
}
function zgrE2LoesungPanel(){
  if (!(window.KASPER_RUECKMELDUNG && stand.loesungOffen)) return;
  const panel = document.createElement('div');
  panel.id = 'loesungpanel'; panel.className = 'loesungpanel';
  panel.innerHTML = zgrLoesungE2();
  document.querySelector('.buehne').insertAdjacentElement('afterend', panel);
}

/* Die Uebersicht am Schluss: je Situation die Pfadzahlen und die
   Feststellung, «Eine moegliche Sicht», freiwillig «Und im Skript?». */
function zgrE2Schluss(st, a, fort, knopf){
  const Z = D.e2.schluss, K = D.e2.situationen;
  const leiste = knopf('zgrvorige', D.e2.vorige) + knopf('zgrskript', Z.skript)
    + '<span class="befund" id="befund"></span>' + `<button class="knopf" id="weiter" style="margin-left:auto">${Z.weiter}</button>`;
  const feld = zgrEinFeld({rolle: a.rolle, rang: a.rang, titel: `Etappe 2 · ${a.name}`, text: ''},
    Z.titel, leiste, fort + zgrSammlungHtml(true));
  zgrAuftragKopf(2);
  zgrFortHaken(st, false);
  window._zustaendig = () => false;
  window._neuzeichnen = null;
  if (zgrAlleFertig(st)) zgrFahne({notiz: D.weiter.etappe3Notiz, knopf: D.weiter.etappe3, tun: () => { stand.etappe = 2; los(); }});
  else zgrFahne(null);
  const box = document.createElement('div'); box.className = 'zgr-e2schluss';
  box.innerHTML = '<table class="zgr-tabelle zgr-uebersicht"><tr>' + Z.kopf.map(t => `<th>${t}</th>`).join('') + '</tr>'
    + K.map(s => {
      const f = st.fest[s.id], ok = zgrE2Fertig(st, s);
      return `<tr><td><b>${s.name}</b></td><td>${Z.pfade.replace('{n}', s.karte.w1)}</td><td>${Z.pfade.replace('{n}', s.karte.w2)}</td>`
        + `<td class="fest">${f ? zgrEsc(zgrFallName(f)) + (ok ? ' ✓' : f === s.karte.fest ? '' : ' ✗') : Z.leer}</td></tr>`;
    }).join('') + '</table>';
  feld.appendChild(box);
  const z = document.createElement('div'); z.className = 'zgr-zeile';
  z.innerHTML = '<button class="knopf leer" id="zgrsicht">Eine mögliche Sicht</button>';
  box.appendChild(z);
  const sicht = document.createElement('div'); box.appendChild(sicht);
  z.querySelector('button').onclick = () => {
    sicht.innerHTML = sicht.innerHTML ? '' : '<div class="zgr-sicht" style="max-height:none;margin:4px 10px"><b>Eine mögliche Sicht</b><ul>'
      + D.e2.sicht.map(t => `<li>${t}</li>`).join('') + '</ul></div>';
  };
  document.getElementById('zgrvorige').onclick = () => { st.aktiv = K[K.length - 1].id; sichern(); etappe2(); };
  document.getElementById('zgrskript').onclick = () => { st.aktiv = 'S'; sichern(); etappe2(); };
  document.getElementById('weiter').onclick = () => { stand.etappe = 2; los(); };
  loesungsKnopf(() => etappe2());
  zgrE2LoesungPanel();
}

/* NEU (FASSUNG 15): freiwillig «Und im Skript?» - vier Aufgaben aus dem
   Skript, je dieselbe Frage «Was stellen Sie fest?», geprueft mit Hinweis.
   Nicht in der Sammlung. */
function zgrE2Skript(st, a, fort, knopf){
  const T = D.e2.skript, SCH = D.e2.schritte;
  const leiste = knopf('zgrvorige', T.zurueck)
    + '<span class="befund" id="befund"></span>' + `<button class="knopf" id="weiter" style="margin-left:auto">${D.e2.schluss.weiter}</button>`;
  const feld = zgrEinFeld({rolle: a.rolle, rang: a.rang, titel: `Etappe 2 · ${a.name}`, text: ''},
    T.titel, leiste, fort + zgrSammlungHtml(true));
  zgrAuftragKopf(2);
  zgrFortHaken(st, false);
  window._zustaendig = () => false;
  window._neuzeichnen = null;
  zgrFahne(null);
  feld.insertAdjacentHTML('beforeend', `<div class="zgr-text">${T.text}</div>`);
  const liste = document.createElement('div'); liste.className = 'zgr-skriptliste';
  feld.appendChild(liste);
  const zeichne = () => {
    liste.innerHTML = '';
    T.karten.forEach(k => {
      const f = st.skript[k.id];
      const box = document.createElement('div'); box.className = 'zgr-satz zgr-e2schritt' + (f === k.fall ? ' ok' : '');
      box.innerHTML = `<div class="kopf">${k.name}</div><div>${k.satz}</div>`
        + `<div class="zgr-festwahl" role="group" aria-label="${k.name}: ${SCH.fest}">`
        + D.e2.faelle.map(x => `<button data-f="${x.id}" aria-pressed="${f === x.id}">${x.name}</button>`).join('') + '</div>'
        + (f === k.fall ? `<div class="warum">${T.ok} ${k.grund}</div>` : f ? `<div class="warum falsch">${T.nochNicht} ${k.hinweis}</div>` : '');
      box.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { st.skript[k.id] = b.dataset.f; sichern(); zeichne(); fortNeu(); });
      liste.appendChild(box);
    });
    document.getElementById('befund').textContent = zgrSkriptFertig(st) ? T.alle : '';
  };
  const fortNeu = () => {
    const f = document.getElementById('zgrfort');
    const p = f && f.querySelector('.pkt[data-id="S"]');
    if (p){ p.classList.toggle('fertig', zgrSkriptFertig(st)); p.textContent = zgrSkriptFertig(st) ? '✓' : 'S'; }
  };
  zeichne();
  document.getElementById('zgrvorige').onclick = () => { st.aktiv = 'Z'; sichern(); etappe2(); };
  document.getElementById('weiter').onclick = () => { stand.etappe = 2; los(); };
  loesungsKnopf(() => etappe2());
  zgrE2LoesungPanel();
}

function zgrLoesungE2(){
  const KT = D.e2.knotenText;
  return '<h4>Etappe 2 · Sieben Situationen</h4>' + D.e2.situationen.map((s, j) => {
    const c = s.karte, P = c.pflicht;
    const vt = s.vert.map(([k, b]) => `P(X=${k}) = ${s.dezimal ? zgrDezText(zgrZahl(b)) : zgrBruchText(b)}`).join(', ');
    return `<div class="zeile"><b>${j + 1} ${s.name}</b>: Pfade Weg 1 ${c.w1}, Weg 2 ${c.w2}${c.null ? ` (davon ${c.null} nie)` : ''}. `
      + `Schritt 1${s.frei ? ' (freiwillig)' : ''}: `
      + ['1', '2'].map(n => `${D.e2.wege[n][0]}: ` + P.baeume[n].map(kn => `${kn.weg ? `nach «${kn.nach}»` : 'am Anfang'} `
        + kn.aeste.map(x => x.text).join(' | ')).join('; ')).join(' — ')
      + (P.hilfe ? ` (Hilfe ${P.hilfe})` : '')
      + `. Dann «${KT.rest}» oder selbst weiter${c.gleichW1 ? ` (unter Weg 1 dann: «${c.gleichW1}»)` : ''}.`
      + (s.decken ? ` Dann «${D.e2.decken.knopf}»: ${D.e2.decken.satz}` : '')
      + ` Feststellung: «${zgrFallName(c.fest)}». Verteilung ${vt}.</div>`;
  }).join('')
    + '<div class="zeile">Geprüft werden die markierten Felder (gestufte Hinweise, Summe je Knoten) und die Feststellung '
    + '(gestufte Hinweise). Ab Situation 6 ist Schritt 1 freiwillig. Die Pfadzahlen gelten für die ganzen Bäume und stehen nur zur Information da.</div>'
    + `<h4>${D.e2.skript.titel} (freiwillig)</h4><div class="zeile">`
    + D.e2.skript.karten.map(k => `${k.name}: «${zgrFallName(k.fall)}»`).join('; ') + '.</div>';
}

/* ───────── Rechnungen lesen (Etappe 3) ─────────
   Nach dem Vorbild von Kapitel 5 (auswerten), hier mit Gleitkomma, weil
   die Standardabweichung eine Wurzel braucht. Erlaubt:
     Zahlen   2   0.5   0,5   1/3 (als Bruch oder Division)
     Zeichen  + - −   * · × x   : / ÷   ( )   ^ ²   √ oder sqrt( )
   Gibt {wert, text} zurueck - `text` ist die Rechnung in sauberer
   Schreibweise, so wie sie unter dem Feld steht. */
function zgrRechne(eingabe){
  // NEU (Fassung 7): Bruchzeichen wie ⅙ gelten als (1/6).
  const s = String(eingabe || '').replace(/[½⅓⅔¼¾⅙⅚⅛]/g, c => '(' + ZGR_ZEICHEN[c].join('/') + ')').replace(/,/g, '.').replace(/wurzel|sqrt/gi, '√').replace(/\s+/g, '');
  if (!s) return null;
  const tok = [];
  const re = /(\d+(?:\.\d+)?|\.\d+)|([+\-−*·×x:\/÷()^²√])/gy;
  while (re.lastIndex < s.length){
    const m = re.exec(s);
    if (!m) return null;
    tok.push(m[1] !== undefined ? {z: m[1]} : {o: m[2]});
  }
  const OP = {'−': '-', '·': '*', '×': '*', 'x': '*', '÷': ':'};
  tok.forEach(t => { if (t.o && OP[t.o]) t.o = OP[t.o]; });
  let i = 0;
  const sieh = () => tok[i], nimm = () => tok[i++];
  function atom(){
    const t = nimm();
    if (!t) throw 0;
    if (t.z !== undefined) return {w: parseFloat(t.z), t: t.z};
    if (t.o === '('){ const v = summe(); if (!sieh() || sieh().o !== ')') throw 0; nimm(); return {w: v.w, t: '(' + v.t + ')'}; }
    if (t.o === '√'){ const v = potenz(); if (v.w < 0) throw 0; return {w: Math.sqrt(v.w), t: '√' + v.t}; }
    if (t.o === '-'){ const v = potenz(); return {w: -v.w, t: '−' + v.t}; }
    throw 0;
  }
  function potenz(){
    let v = atom();
    for (;;){
      if (sieh() && sieh().o === '²'){ nimm(); v = {w: v.w * v.w, t: v.t + '²'}; }
      else if (sieh() && sieh().o === '^'){ nimm(); const e = atom(); v = {w: Math.pow(v.w, e.w), t: v.t + (e.t === '2' ? '²' : '^' + e.t)}; }
      else return v;
    }
  }
  function produkt(){
    let v = potenz();
    while (sieh() && ['*', ':', '/'].includes(sieh().o)){
      const o = nimm().o, w = potenz();
      if (o !== '*' && w.w === 0) throw 0;
      v = o === '*' ? {w: v.w * w.w, t: v.t + ' · ' + w.t}
        : o === '/' ? {w: v.w / w.w, t: v.t + '/' + w.t}
        : {w: v.w / w.w, t: v.t + ' : ' + w.t};
    }
    return v;
  }
  function summe(){
    let v = produkt();
    while (sieh() && ['+', '-'].includes(sieh().o)){
      const o = nimm().o, w = produkt();
      v = o === '+' ? {w: v.w + w.w, t: v.t + ' + ' + w.t} : {w: v.w - w.w, t: v.t + ' − ' + w.t};
    }
    return v;
  }
  try {
    const v = summe();
    if (i < tok.length || !isFinite(v.w)) return null;
    // Ein gekuerzter Bruch wie 1/3 gilt als einzelne Zahl: Dahinter
    // nochmals «= 1/3» zu zeigen, waere nur Laerm.
    const bruch = tok.length === 3 && tok[1].o === '/' && /^\d+$/.test(tok[0].z || '') && /^\d+$/.test(tok[2].z || '')
      && zgrGgT(+tok[0].z, +tok[2].z) === 1 && +tok[2].z > 1;
    return {wert: v.w, text: v.t, einzeln: tok.length === 1 || bruch};
  } catch (_){ return null; }
}
/* Ein Ergebnis zeigen: als kleiner Bruch, wenn es einer ist, sonst
   gerundet mit «≈». */
function zgrErgebnis(w, dezimal){
  // Wer mit Dezimalzahlen rechnet (Geld), bekommt eine Dezimalzahl zurueck.
  if (dezimal && Math.abs(Math.round(w * 10000) - w * 10000) < 1e-6) return {t: String(+w.toFixed(4)), genau: true};
  for (let n = 1; n <= 60; n++){
    const z = Math.round(w * n);
    if (Math.abs(z / n - w) < 1e-9) return {t: n === 1 ? String(z) : zgrBruchText(zgrBruch(z, n)), genau: true};
  }
  return {t: String(+w.toFixed(3)), genau: false};
}

const zgrPZahl = b => zgrZahl(b);

/* Ein Histogramm als SVG (Bild, damit es auch im Bild zum Mitnehmen
   steht). `vert` = [[k, [z, n]], ...]. `o` = {achse, ymax, schritt,
   breite}. E zeichnet eine gestrichelte Linie. */
function zgrHistogramm(vert, name, xmin, xmax, E, o){
  o = o || {};
  const w = o.breite || 230, h = 170, l = 34, r = 10, ob = name ? 28 : 10, u = 34;
  const ymax = o.ymax || 0.6, schritt = o.schritt || 1;
  const innen = w - l - r - 24;
  const sx = k => l + 12 + (k - xmin) / (xmax - xmin) * innen;
  const sy = p => h - u - p / ymax * (h - ob - u);
  const bb = Math.min(24, innen / (xmax - xmin + 1) * 0.62);
  const F = 'font-family="Fira Sans,sans-serif"';
  const teile = [`<rect width="${w}" height="${h}" fill="#fffefb"/>`];
  if (name) teile.push(`<text x="${w / 2}" y="18" ${F} font-size="14" text-anchor="middle" fill="#2d2924">${name}</text>`);
  for (let p = 0; p <= ymax + 1e-9; p += 0.25)
    teile.push(`<line x1="${l}" x2="${w - r}" y1="${sy(p)}" y2="${sy(p)}" stroke="#eee4d3"/>`,
      `<text x="${l - 5}" y="${sy(p) + 4}" ${F} font-size="11" text-anchor="end" fill="#6c6357">${+p.toFixed(2)}</text>`);
  for (let k = xmin; k <= xmax; k += schritt)
    teile.push(`<text x="${sx(k)}" y="${h - u + 15}" ${F} font-size="11" text-anchor="middle" fill="#6c6357">${k}</text>`);
  vert.forEach(([k, b]) => {
    const p = b[0] / b[1];
    teile.push(`<rect x="${sx(k) - bb / 2}" y="${sy(p)}" width="${bb}" height="${sy(0) - sy(p)}" fill="#0065A9" opacity=".8"/>`);
  });
  teile.push(`<line x1="${l}" x2="${w - r}" y1="${sy(0)}" y2="${sy(0)}" stroke="#8a8279"/>`);
  if (E !== undefined) teile.push(`<line x1="${sx(E)}" x2="${sx(E)}" y1="${ob}" y2="${sy(0)}" stroke="#C0392B" stroke-dasharray="4 3"/>`);
  if (o.achse) teile.push(`<text x="${w / 2}" y="${h - 4}" ${F} font-size="11" text-anchor="middle" fill="#6c6357">${o.achse}</text>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${teile.join('')}</svg>`;
}
function zgrBild(svg, alt){
  const im = document.createElement('img');
  im.alt = alt || ''; im.draggable = false;
  im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  return im;
}
function zgrVertTabelle(vert, kname, dezimal){
  return `<table class="zgr-tabelle"><tr><td>${kname}</td>${vert.map(([k]) => `<td>${k}</td>`).join('')}</tr>`
    + `<tr><td>P</td>${vert.map(([, b]) => `<td>${dezimal ? zgrDezText(zgrZahl(b)) : zgrBruchHtml(b)}</td>`).join('')}</tr></table>`;
}
/* «0 · 1/3 + 1 · 1/2 + …» - die Rechnung fuer E, aus der Verteilung. */
const zgrSummeText = (vert, dezimal) => vert.map(([k, b]) =>
  `${k} · ${dezimal ? zgrDezText(zgrZahl(b)) : zgrBruchText(b)}`).join(' + ');
const zgrFr = v => (+v).toFixed(2);

/* ───────── Etappe 3 · Bausteine ─────────
   Dreieck (E), Schaetzbild, Karten der Landkarte, Baukasten. Wie sie in
   Fassung 9 zusammenspielen, steht bei etappe3(), der Stand bei zgrE3(). */

const ZGR_DREIECK = {SPITZE: 28, HALB: 14, FARBE: '#E09E5A'};
/* Das Dreieck der Waage: Spitze bei (x, y), Grundseite darunter. */
const zgrDreieck = (x, y, o) => {
  o = o || {};
  const h = o.spitze || ZGR_DREIECK.SPITZE, b = o.halb || ZGR_DREIECK.HALB;
  return `<polygon points="${x},${y} ${x - b},${y + h} ${x + b},${y + h}" fill="${o.fill || ZGR_DREIECK.FARBE}"`
    + ` stroke="${o.stroke || '#2d2924'}" stroke-width="1"${o.strich ? ' stroke-dasharray="3 2"' : ''}${o.attr || ''}/>`;
};
const zgrMomente = vert => {
  let s = 0, e = 0, q = 0;
  vert.forEach(([k, p]) => { s += p; e += k * p; q += k * k * p; });
  if (s <= 0) return null;
  e /= s; q /= s;
  return {E: e, sigma: Math.sqrt(Math.max(0, q - e * e))};
};
const zgrVertZahl = vert => vert.map(([k, b]) => [k, zgrZahl(b)]);
/* Zahlen fuer E und sigma: gerundet auf zwei Stellen, «≈» wenn gerundet. */
const zgrRund = v => { const r = Math.round(v * 100) / 100; return {t: String(+r.toFixed(2)).replace('-', '−'), genau: Math.abs(r - v) < 1e-9}; };
const zgrGleichRund = v => { const r = zgrRund(v); return (r.genau ? '= ' : '≈ ') + r.t; };
const zgrHist = id => D.e3.hist.find(h => h.id === id);

/* ───────── Das Schaetzbild (FASSUNG 16, wie Fassung 13) ─────────
   Ein Gewinn-Histogramm mit Dreieck (E) und symmetrischem Band (E − s
   bis E + s) mit zwei Griffen. `o` = Histogramm aus D.e3.hist,
   `z` = {e, s, ge} (ge: schon geschaetzt), auf = aufgedeckt. */
const ZS = {B: 440, H: 240, L: 26, R: 26, OBEN: 30, ACHSE: 168};
const zgrSX = (o, x) => ZS.L + (x - o.lo) / (o.hi - o.lo) * (ZS.B - ZS.L - ZS.R);
const zgrSXinv = (o, px) => o.lo + (px - ZS.L) / (ZS.B - ZS.L - ZS.R) * (o.hi - o.lo);

function zgrSkala(o, sx, y, F){
  const t = [`<line x1="${sx(o.lo)}" x2="${sx(o.hi)}" y1="${y}" y2="${y}" stroke="#c9bda8"/>`];
  const schritt = o.hi - o.lo > 12 ? 2 : 1;
  for (let k = o.lo; k <= o.hi; k++){
    t.push(`<line x1="${sx(k)}" x2="${sx(k)}" y1="${y - 3}" y2="${y + 3}" stroke="#8a8279"/>`);
    if ((k - o.lo) % schritt === 0)
      t.push(`<text x="${sx(k)}" y="${y + 15}" ${F} font-size="12" text-anchor="middle" fill="#6c6357">${String(k).replace('-', '−')}</text>`);
  }
  return t.join('');
}
/* Die Balken eines Gewinn-Histogramms (fuer Schaetzbild und Waage) */
function zgrBalken(o, sx){
  const pmax = Math.max(...o.vert.map(([, b]) => zgrZahl(b)));
  const sy = p => ZS.ACHSE - p / (pmax * 1.12) * (ZS.ACHSE - ZS.OBEN - 14);
  const bb = Math.min(30, (ZS.B - ZS.L - ZS.R) / (o.hi - o.lo + 1) * 0.62);
  return o.vert.filter(([, b]) => zgrZahl(b) > 0).map(([k, b]) => {
    const p = zgrZahl(b);
    return `<rect x="${sx(k) - bb / 2}" y="${sy(p)}" width="${bb}" height="${ZS.ACHSE - sy(p)}" fill="#0065A9" opacity=".8"/>`;
  }).join('');
}

function zgrSchaetzSvg(o, z, auf){
  const F = 'font-family="Fira Sans,sans-serif"';
  const sx = x => zgrSX(o, x);
  const t = [`<rect width="${ZS.B}" height="${ZS.H}" fill="#fffefb"/>`,
    `<defs><clipPath id="zs-clip-${o.id}"><rect x="${ZS.L - 6}" y="0" width="${ZS.B - ZS.L - ZS.R + 12}" height="${ZS.H}"/></clipPath></defs>`];
  const g = [];
  // Band der Schaetzung hinter den Balken
  const bl = sx(z.e - z.s), br = sx(z.e + z.s), oben = ZS.OBEN + 4;
  g.push(`<rect x="${bl}" y="${oben}" width="${Math.max(0, br - bl)}" height="${ZS.ACHSE - oben}" fill="#0065A9" opacity=".12"/>`);
  g.push(zgrBalken(o, sx));
  // Wahrer Wert: Strich bei E, Band als gestrichelter Rahmen
  if (auf){
    const wl = sx(o.E - o.sigma), wr = sx(o.E + o.sigma);
    g.push(`<rect x="${wl}" y="${oben + 10}" width="${wr - wl}" height="${ZS.ACHSE - oben - 10}" fill="none" stroke="#C0392B" stroke-width="1.6" stroke-dasharray="5 3"/>`,
      `<line x1="${sx(o.E)}" x2="${sx(o.E)}" y1="${oben + 10}" y2="${ZS.ACHSE}" stroke="#C0392B" stroke-width="2"/>`);
  }
  // Griffe: senkrechte Linie, oben ein Knauf
  [['l', bl], ['r', br]].forEach(([s, x]) => {
    g.push(`<g data-griff="${s}"${auf ? '' : ' style="cursor:ew-resize"'}>`
      + `<line x1="${x}" x2="${x}" y1="${oben}" y2="${ZS.ACHSE}" stroke="#0065A9" stroke-width="2"/>`
      + (auf ? '' : `<line x1="${x}" x2="${x}" y1="${oben}" y2="${ZS.ACHSE}" stroke="transparent" stroke-width="16"/>`)
      + `<rect x="${x - 8}" y="${oben - 2}" width="16" height="20" rx="5" fill="#fff" stroke="#0065A9" stroke-width="1.6"/>`
      + `<text x="${x}" y="${oben + 12}" ${F} font-size="11" text-anchor="middle" fill="#0065A9">${s === 'l' ? '‹' : '›'}</text></g>`);
  });
  t.push(`<g clip-path="url(#zs-clip-${o.id})">${g.join('')}</g>`);
  t.push(`<line x1="${ZS.L - 6}" x2="${ZS.B - ZS.R + 6}" y1="${ZS.ACHSE}" y2="${ZS.ACHSE}" stroke="#2d2924" stroke-width="2.5" stroke-linecap="round"/>`);
  t.push(`<g data-griff="e"${auf ? '' : ' style="cursor:ew-resize"'}>${zgrDreieck(sx(z.e), ZS.ACHSE + 2)}</g>`);
  if (auf) t.push(zgrDreieck(sx(o.E), ZS.ACHSE + 2, {fill: 'none', stroke: '#C0392B', strich: true}));
  t.push(zgrSkala(o, sx, ZS.ACHSE + ZGR_DREIECK.SPITZE + 8, F));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ZS.B} ${ZS.H}" width="${ZS.B}" height="${ZS.H}">${t.join('')}</svg>`;
}

/* Start links aussen, nicht in der Mitte: Die Mitte der Achse liegt bei
   symmetrischen Verteilungen genau auf E. */
const zgrSchaetzStart = o => ({e: o.lo + (o.hi - o.lo) * 0.15, s: (o.hi - o.lo) / 12, ge: false});

/* Das bedienbare Schaetzbild. Ziehen am Dreieck (oder unter der Achse)
   verschiebt E, an einem Griff aendert sich die Breite, symmetrisch.
   Tastatur: links/rechts das Dreieck, auf/ab das Band. */
function zgrSchaetzer(ziel, o, z, fest, nachAenderung){
  const box = document.createElement('div');
  box.className = 'zgr-schaetz' + (fest ? ' fest' : '');
  box.tabIndex = fest ? -1 : 0;
  box.setAttribute('role', 'group');
  box.setAttribute('aria-label', `Schätzung für ${o.name}. Pfeiltasten links und rechts verschieben das Dreieck, auf und ab ändern die Breite des Bandes.`);
  ziel.appendChild(box);
  const bild = document.createElement('div'); box.appendChild(bild);
  const zeichnen = () => { bild.innerHTML = zgrSchaetzSvg(o, z, fest); };
  const ausZeiger = ev => {
    const r = bild.querySelector('svg').getBoundingClientRect();
    return zgrSXinv(o, (ev.clientX - r.left) / r.width * ZS.B);
  };
  const breit = o.hi - o.lo;
  const setzeE = x => { z.e = Math.max(o.lo, Math.min(o.hi, x)); z.ge = true; };
  const setzeS = s => { z.s = Math.max(0, Math.min(breit, s)); z.ge = true; };
  let griff = null;
  box.addEventListener('pointerdown', ev => {
    if (fest) return;
    const g = ev.target.closest && ev.target.closest('[data-griff]');
    const r = bild.querySelector('svg').getBoundingClientRect();
    const y = (ev.clientY - r.top) / r.height * ZS.H;
    griff = g ? g.dataset.griff : (y > ZS.ACHSE ? 'e' : null);
    if (!griff) return;
    box.setPointerCapture(ev.pointerId); box.focus({preventScroll: true});
    if (griff === 'e') setzeE(ausZeiger(ev));
    zeichnen(); ev.preventDefault();
  });
  box.addEventListener('pointermove', ev => {
    if (!griff) return;
    if (griff === 'e') setzeE(ausZeiger(ev)); else setzeS(Math.abs(ausZeiger(ev) - z.e));
    zeichnen();
  });
  const ende = () => { if (!griff) return; griff = null; sichern(); if (nachAenderung) nachAenderung(); };
  box.addEventListener('pointerup', ende);
  box.addEventListener('pointercancel', ende);
  box.addEventListener('keydown', ev => {
    if (fest) return;
    const schritt = breit / 80 * (ev.shiftKey ? 5 : 1), k = ev.key;
    if (k === 'ArrowLeft' || k === 'ArrowRight') setzeE(z.e + (k === 'ArrowRight' ? schritt : -schritt));
    else if (k === 'ArrowUp' || k === 'ArrowDown') setzeS(z.s + (k === 'ArrowUp' ? schritt : -schritt));
    else return;
    ev.preventDefault(); zeichnen(); sichern(); if (nachAenderung) nachAenderung();
  });
  zeichnen();
}

function zgrAbweichungHtml(o, z){
  const r = zgrRund, dE = z.e - o.E, dS = z.s - o.sigma;
  const eSatz = Math.abs(dE) < 0.005 ? 'Ihr Dreieck steht genau bei E.'
    : `Ihr Dreieck steht ${r(Math.abs(dE)).t} ${dE > 0 ? 'rechts' : 'links'} von E.`;
  const sSatz = Math.abs(dS) < 0.005 ? 'Ihr σ trifft genau.'
    : `Ihr σ ist ${r(Math.abs(dS)).t} ${dS > 0 ? 'grösser' : 'kleiner'}.`;
  return `<div>Ihre Schätzung: E ≈ ${r(z.e).t}, σ ≈ ${r(z.s).t}</div>`
    + `<div class="wahr">Gerechnet: E ${zgrGleichRund(o.E)}, σ ${zgrGleichRund(o.sigma)} (rot im Bild)</div>`
    + `<div>${eSatz} ${sSatz}</div>`;
}

/* ───────── Die Waage (FASSUNG 16) ─────────
   Das Histogramm des Korbwurfs liegt auf einem Balken, der auf dem
   Dreieck ruht. Festgehalten: Das Dreieck ist die Schaetzung. Losgelassen:
   Der Balken kippt um Moment · gradJe Grad (Moment = Σ (g − Dreieck) · P
   = E − Dreieck, exakt), hoechstens gradMax, zur schwereren Seite. Liegt
   das Dreieck auf ±raste bei E, rastet es ein: waagrecht. Animiert mit
   CSS, ohne bei reduzierter Bewegung. Stand w = {e, los, ok}. */
function zgrWaage(ziel, o, w, nachher){
  const W = D.e3.waage, F = 'font-family="Fira Sans,sans-serif"';
  const sx = x => zgrSX(o, x);
  const ruhig = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const box = document.createElement('div');
  box.className = 'zgr-schaetz zgr-waage' + (w.ok ? ' fest' : '');
  box.tabIndex = w.ok ? -1 : 0;
  box.setAttribute('role', 'group');
  box.setAttribute('aria-label', `Waage für ${o.name}. Pfeiltasten links und rechts verschieben das Dreieck.`);
  ziel.appendChild(box);
  box.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ZS.B} ${ZS.H}" width="${ZS.B}" height="${ZS.H}">`
    + `<rect width="${ZS.B}" height="${ZS.H}" fill="#fffefb"/>`
    + `<g class="balken">${zgrBalken(o, sx)}<line x1="${ZS.L - 6}" x2="${ZS.B - ZS.R + 6}" y1="${ZS.ACHSE}" y2="${ZS.ACHSE}" stroke="#2d2924" stroke-width="2.5" stroke-linecap="round"/></g>`
    + `<g class="dreieck"></g>${zgrSkala(o, sx, ZS.ACHSE + ZGR_DREIECK.SPITZE + 8, F)}`
    + `<g class="halter"><rect x="${ZS.L - 6}" y="${ZS.ACHSE + 3}" width="10" height="${ZGR_DREIECK.SPITZE - 3}" fill="#8a8279"/>`
    + `<rect x="${ZS.B - ZS.R - 4}" y="${ZS.ACHSE + 3}" width="10" height="${ZGR_DREIECK.SPITZE - 3}" fill="#8a8279"/></g></svg>`;
  const svg = box.querySelector('svg'), balken = svg.querySelector('.balken'), dreieck = svg.querySelector('.dreieck'), halter = svg.querySelector('.halter');
  const grad = () => w.los && !w.ok ? Math.max(-W.gradMax, Math.min(W.gradMax, (o.E - w.e) * W.gradJe)) : 0;
  const zeichnen = langsam => {
    const x = sx(w.e);
    dreieck.innerHTML = zgrDreieck(x, ZS.ACHSE + 2);
    halter.style.display = w.los ? 'none' : '';
    balken.style.transition = ruhig ? 'none' : `transform ${langsam ? 1.2 : 0.35}s ease-in-out`;
    balken.style.transformOrigin = `${x}px ${ZS.ACHSE}px`;
    balken.style.transform = `rotate(${grad()}deg)`;
  };
  // Eingerastet wird auf ±raste um E - und auch, wenn das Dreieck beim
  // Ziehen ueber E hinweggleitet (sonst verpasst ein schneller Zug die Stelle)
  const setze = e => {
    const vorher = w.e;
    w.e = Math.max(o.lo, Math.min(o.hi, e));
    if (w.los && (Math.abs(w.e - o.E) <= W.raste || (vorher - o.E) * (w.e - o.E) < 0)){ w.e = o.E; w.ok = true; }
  };
  const ausZeiger = ev => { const r = svg.getBoundingClientRect(); return zgrSXinv(o, (ev.clientX - r.left) / r.width * ZS.B); };
  let zieht = false;
  box.addEventListener('pointerdown', ev => {
    if (w.ok) return;
    zieht = true; box.setPointerCapture(ev.pointerId); box.focus({preventScroll: true});
    setze(ausZeiger(ev)); zeichnen(false); ev.preventDefault();
  });
  box.addEventListener('pointermove', ev => { if (zieht && !w.ok){ setze(ausZeiger(ev)); zeichnen(false); } });
  const ende = () => { if (!zieht) return; zieht = false; sichern(); if (nachher) nachher(); };
  box.addEventListener('pointerup', ende);
  box.addEventListener('pointercancel', ende);
  box.addEventListener('keydown', ev => {
    if (w.ok || (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight')) return;
    ev.preventDefault();
    setze(w.e + (ev.key === 'ArrowRight' ? 0.05 : -0.05) * (ev.shiftKey ? 5 : 1));
    zeichnen(false); sichern(); if (nachher) nachher();
  });
  zeichnen(false);
  return {
    loslassen(){ w.los = true; sichern(); requestAnimationFrame(() => zeichnen(true)); },
  };
}

/* ───────── 20-mal spielen (FASSUNG 16) ─────────
   Echte Zufallsspiele nach der Verteilung aus dem Generator. Jeder
   Gewinn ist ein Punkt auf der Zahlengeraden, gleiche Gewinne stapeln
   sich; darueber das wahre Band E − σ bis E + σ. Stand st.sp[id] = [g]. */
function zgrSpielen(o, n){
  const liste = o.vert.map(([g, b]) => [g, zgrZahl(b)]).filter(([, p]) => p > 0);
  return Array.from({length: n}, () => {
    let u = Math.random(), i = 0;
    while (i < liste.length - 1 && u >= liste[i][1]){ u -= liste[i][1]; i++; }
    return liste[i][0];
  });
}
function zgrSpieleSvg(o, werte){
  const B = 440, H = 118, L = 26, R = 26, ACHSE = 88, F = 'font-family="Fira Sans,sans-serif"';
  const sx = x => L + (x - o.lo) / (o.hi - o.lo) * (B - L - R);
  const t = [`<rect width="${B}" height="${H}" fill="#fffefb"/>`];
  const bl = sx(o.E - o.sigma), br = sx(o.E + o.sigma);
  t.push(`<rect x="${bl}" y="10" width="${br - bl}" height="${ACHSE - 10}" fill="#0065A9" opacity=".13"/>`,
    `<line x1="${sx(o.E)}" x2="${sx(o.E)}" y1="10" y2="${ACHSE}" stroke="#0065A9" stroke-width="1.5" stroke-dasharray="4 3"/>`,
    `<text x="${sx(o.E)}" y="9" ${F} font-size="10.5" text-anchor="middle" fill="#0065A9">E</text>`);
  const zahl = {};
  werte.forEach(g => {
    const i = zahl[g] = (zahl[g] || 0) + 1, sp = Math.floor((i - 1) / 7), zl = (i - 1) % 7;
    const anz = werte.filter(v => v === g).length, spalten = Math.ceil(anz / 7);
    t.push(`<circle cx="${sx(g) + (sp - (spalten - 1) / 2) * 9}" cy="${ACHSE - 6 - zl * 9}" r="4" fill="#C0392B" opacity=".85"/>`);
  });
  t.push(`<line x1="${L - 6}" x2="${B - R + 6}" y1="${ACHSE}" y2="${ACHSE}" stroke="#2d2924" stroke-width="2"/>`);
  const schritt = o.hi - o.lo > 12 ? 2 : 1;
  for (let k = o.lo; k <= o.hi; k++){
    t.push(`<line x1="${sx(k)}" x2="${sx(k)}" y1="${ACHSE - 3}" y2="${ACHSE + 3}" stroke="#8a8279"/>`);
    if ((k - o.lo) % schritt === 0) t.push(`<text x="${sx(k)}" y="${ACHSE + 16}" ${F} font-size="11" text-anchor="middle" fill="#6c6357">${String(k).replace('-', '−')}</text>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${B} ${H}" width="${B}" height="${H}">${t.join('')}</svg>`;
}
function zgrSpieleKarte(ziel, o, st){
  const S = D.e3.spiele;
  const k = document.createElement('div'); k.className = 'karte zgr-spiele';
  ziel.appendChild(k);
  const zeichnen = () => {
    const w = st.sp[o.id];
    k.innerHTML = `<div class="kopf">${o.name} <span class="zgr-zart">· E ${zgrGleichRund(o.E)}, σ ${zgrGleichRund(o.sigma)}</span></div>`
      + (w ? `<div class="bild">${zgrSpieleSvg(o, w)}</div><div class="ergebnis">${S.mittel.replace('{m}', zgrRund(w.reduce((a, b) => a + b, 0) / w.length).t)}</div>` : '')
      + `<div class="zgr-zeile" style="padding:2px 0"><button class="knopf${w ? ' leer' : ''}">${w ? S.nochmals : S.knopf}</button></div>`;
    k.querySelector('button').onclick = () => { st.sp[o.id] = zgrSpielen(o, D.e3.spiele.n); sichern(); zeichnen(); };
  };
  zeichnen();
}

/* ───────── Die Streuungs-Waage (FASSUNG 17) ─────────
   Oben das Histogramm mit E (Dreieck, fest) und dem Band E − s bis E + s,
   das die Studierenden aufziehen. Unten eine Tafelwaage: links die
   Abstandsquadrate - je Balken ein Quadrat mit Seite |x − E| · √P, also
   Flaeche (x − E)² · P, gestapelt; zusammen Σ (x − E)² · P = σ² (exakt).
   Rechts das Quadrat des Bandes mit Seite s, Flaeche s². Festgehalten:
   Das Band ist die Schaetzung. Losgelassen: Der Balken kippt um
   gradMax · (s² − σ²) / σ², hoechstens gradMax - zu schmal nach links,
   zu breit nach rechts. Liegt s auf ±raste bei σ (oder gleitet das Band
   beim Ziehen darueber), rastet es ein. Sanft animiert, ohne bei
   reduzierter Bewegung. Stand w = {s, los, ok}. */
const ZSW = {B: 440, ACHSE: 112, ARM: 120};
function zgrSWaage(ziel, o, w, nachher){
  const SW = D.e3.swaage, F = 'font-family="Fira Sans,sans-serif"', L = D.e3.legen;
  const ruhig = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sx = x => ZS.L + (x - o.lo) / (o.hi - o.lo) * (ZSW.B - ZS.L - ZS.R);
  const sxInv = px => o.lo + (px - ZS.L) / (ZSW.B - ZS.L - ZS.R) * (o.hi - o.lo);
  const quad = o.vert.map(([g, b]) => [g, zgrZahl(b)]).filter(([, p]) => p > 0)
    .map(([g, p]) => ({g, seite: Math.abs(g - o.E) * Math.sqrt(p)})).filter(q => q.seite > 1e-9);
  const stapel = quad.reduce((a, q) => a + q.seite, 0);
  // Massstab: der Stapel und das breiteste Band passen in 95 px
  const u = Math.min(40, 95 / Math.max(stapel, 1.5 * o.sigma));
  // NEU (Fassung 17.1): die Abstandsquadrate auch im Histogramm, unter
  // jedem Balken, Seite |x − E| · √P in Pixeln der x-Achse (ux): Ihre
  // Flaeche ist der Beitrag (x − E)² · P. Darunter folgt die Waage.
  // Fassung 18: unter der Achse eine Zeile fuer die Strecken (σ, Ihr Band)
  const ux = (ZSW.B - ZS.L - ZS.R) / (o.hi - o.lo), SEG = ZSW.ACHSE + 40, Q0 = ZSW.ACHSE + 66;
  const qmax = Math.max(0, ...quad.map(q => q.seite * ux));
  const QH = Q0 + qmax + 22;                                // Ende des Histogramm-Teils
  const H = QH + 12 + 95 + 40, Y0 = QH + 12 + 95 + 8, MX = ZSW.B / 2;
  const hq = q => { const d = q.seite * ux; return {x: Math.max(2, Math.min(ZSW.B - 2 - d, sx(q.g) - d / 2)), y: Q0, d}; };
  let gleitet = false;
  const box = document.createElement('div');
  box.className = 'zgr-schaetz zgr-swaage' + (w.ok ? ' fest' : '');
  box.tabIndex = w.ok ? -1 : 0;
  box.setAttribute('role', 'group');
  box.setAttribute('aria-label', `Waage für σ bei ${o.name}. Pfeiltasten auf und ab ändern die Breite des Bandes.`);
  ziel.appendChild(box);
  const pmax = Math.max(...o.vert.map(([, b]) => zgrZahl(b)));
  const sy = p => ZSW.ACHSE - p / (pmax * 1.12) * (ZSW.ACHSE - 24);
  const bb = Math.min(26, (ZSW.B - ZS.L - ZS.R) / (o.hi - o.lo + 1) * 0.62);
  const balken = o.vert.filter(([, b]) => zgrZahl(b) > 0).map(([k, b]) =>
    `<rect x="${sx(k) - bb / 2}" y="${sy(zgrZahl(b))}" width="${bb}" height="${ZSW.ACHSE - sy(zgrZahl(b))}" fill="#0065A9" opacity=".8"/>`).join('');
  const skala = [];
  const schritt = o.hi - o.lo > 12 ? 2 : 1;
  for (let k = o.lo; k <= o.hi; k++){
    skala.push(`<line x1="${sx(k)}" x2="${sx(k)}" y1="${ZSW.ACHSE - 3}" y2="${ZSW.ACHSE + 3}" stroke="#8a8279"/>`);
    if ((k - o.lo) % schritt === 0) skala.push(`<text x="${sx(k)}" y="${ZSW.ACHSE + 28}" ${F} font-size="11" text-anchor="middle" fill="#6c6357">${String(k).replace('-', '−')}</text>`);
  }
  box.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ZSW.B} ${H}" width="${ZSW.B}" height="${H}">`
    + `<rect width="${ZSW.B}" height="${H}" fill="#fffefb"/><g class="band"></g>${balken}`
    + `<line x1="${ZS.L - 6}" x2="${ZSW.B - ZS.R + 6}" y1="${ZSW.ACHSE}" y2="${ZSW.ACHSE}" stroke="#2d2924" stroke-width="2"/>`
    + zgrDreieck(sx(o.E), ZSW.ACHSE + 1, {spitze: 14, halb: 7}) + skala.join('')
    // Pfeile von E zu jedem Balken (|x − E|) und die Quadrate darunter
    + quad.map((q, i) => { const y = ZSW.ACHSE - 7 - i * 9, a = sx(o.E), b = sx(q.g), r = b > a ? -1 : 1;
      return `<line x1="${a}" x2="${b}" y1="${y}" y2="${y}" stroke="#C0392B" stroke-width="1.6"/>`
        + `<polyline points="${b + 5 * r},${y - 3.5} ${b},${y} ${b + 5 * r},${y + 3.5}" fill="none" stroke="#C0392B" stroke-width="1.6"/>`; }).join('')
    + quad.map(q => { const h = hq(q); return `<rect x="${h.x}" y="${h.y}" width="${h.d}" height="${h.d}" fill="#0065A9" fill-opacity=".35" stroke="#0065A9"/>`; }).join('')
    + `<text x="${ZSW.B / 2}" y="${QH - 4}" ${F} font-size="11.5" text-anchor="middle" fill="#0065A9">${L.quadratText}</text>`
    + `<line x1="10" x2="${ZSW.B - 10}" y1="${QH + 6}" y2="${QH + 6}" stroke="#eee4d3"/>`
    + `<g class="strecke"></g><g class="waage"></g><g class="flug"></g></svg>`;
  const svg = box.querySelector('svg'), gBand = svg.querySelector('.band'), gWaage = svg.querySelector('.waage'), gStrecke = svg.querySelector('.strecke');
  // NEU (Fassung 18): nach dem Zusammenlegen (w.zl) liegt σ als Strecke
  // unter dem Histogramm, ab E nach links und rechts, darunter Ihr Band.
  const zeichneStrecke = () => {
    if (!w.zl){ gStrecke.innerHTML = ''; return; }
    const st = (a, b, y, farbe, text) => `<line x1="${sx(a)}" x2="${sx(b)}" y1="${y}" y2="${y}" stroke="${farbe}" stroke-width="3"/>`
      + [a, o.E, b].map(x => `<line x1="${sx(x)}" x2="${sx(x)}" y1="${y - 5}" y2="${y + 5}" stroke="${farbe}" stroke-width="1.6"/>`).join('')
      + `<text x="${sx(b) + 6}" y="${y + 4}" ${F} font-size="11" fill="${farbe}">${text}</text>`;
    gStrecke.innerHTML = st(o.E - o.sigma, o.E + o.sigma, SEG, '#0065A9', 'σ')
      + st(o.E - w.s, o.E + w.s, SEG + 14, '#b8540a', L.ihrBand);
  };
  const ziel0 = () => w.los && !w.ok ? Math.max(-SW.gradMax, Math.min(SW.gradMax, SW.gradMax * (w.s * w.s - o.sigma * o.sigma) / (o.sigma * o.sigma))) : 0;
  let winkel = ziel0(), lauf = null;
  const zeichneBand = () => {
    const l = sx(o.E - w.s), r = sx(o.E + w.s);
    gBand.innerHTML = `<rect x="${l}" y="18" width="${Math.max(0, r - l)}" height="${ZSW.ACHSE - 18}" fill="#E09E5A" opacity=".22"/>`
      + [l, r].map(x => `<line x1="${x}" x2="${x}" y1="18" y2="${ZSW.ACHSE}" stroke="#b8540a" stroke-width="2"/>`
        + `<rect x="${x - 7}" y="14" width="14" height="16" rx="4" fill="#fff" stroke="#b8540a" stroke-width="1.5"${w.ok ? '' : ' style="cursor:ew-resize"'}/>`).join('');
  };
  const zeichneWaage = () => {
    const a = winkel * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    const lx = MX - ZSW.ARM * c, ly = Y0 - ZSW.ARM * s, rx = MX + ZSW.ARM * c, ry = Y0 + ZSW.ARM * s;
    const t = [`<line x1="${MX - (ZSW.ARM + 40) * c}" y1="${Y0 - (ZSW.ARM + 40) * s}" x2="${MX + (ZSW.ARM + 40) * c}" y2="${Y0 + (ZSW.ARM + 40) * s}" stroke="#2d2924" stroke-width="3" stroke-linecap="round"/>`,
      zgrDreieck(MX, Y0 + 1, {spitze: 18, halb: 11, fill: '#8a8279'})];
    // Links die gestapelten Abstandsquadrate (erst nach dem Loslassen,
    // wenn sie aus dem Histogramm herueber geglitten sind), rechts das Bandquadrat
    if (w.los && !gleitet && !zieht2) (w.zl ? [mergeRect(lx, ly)] : panRects(lx, ly)).forEach(r => t.push(`<rect x="${r.x}" y="${r.y}" width="${r.d}" height="${r.d}" fill="#0065A9" fill-opacity=".35" stroke="#0065A9"/>`));
    const ds = w.s * u;
    t.push(`<rect x="${rx - ds / 2}" y="${ry - 2 - ds}" width="${ds}" height="${ds}" fill="#E09E5A" fill-opacity=".45" stroke="#b8540a"/>`,
      `<text x="${lx}" y="${H - 6}" ${F} font-size="11" text-anchor="middle" fill="#6c6357">${L.links}</text>`,
      `<text x="${rx}" y="${H - 6}" ${F} font-size="11" text-anchor="middle" fill="#6c6357">${L.rechts}</text>`);
    if (!w.los) t.push(`<rect x="${MX - ZSW.ARM - 46}" y="${Y0 + 4}" width="10" height="20" fill="#8a8279"/><rect x="${MX + ZSW.ARM + 36}" y="${Y0 + 4}" width="10" height="20" fill="#8a8279"/>`);
    gWaage.innerHTML = t.join('');
  };
  // Fassung 18: ein Quadrat gleicher Gesamtflaeche, Seite σ
  function mergeRect(lx, ly){ const d = o.sigma * u; return {x: lx - d / 2, y: ly - 2 - d, d}; }
  let zieht2 = false;
  const zusammenlegen = fertig => {
    const gFlug = svg.querySelector('.flug');
    const a = winkel * Math.PI / 180, lx = MX - ZSW.ARM * Math.cos(a), ly = Y0 - ZSW.ARM * Math.sin(a);
    const von = panRects(lx, ly), nach = mergeRect(lx, ly);
    const ende = () => { if (!zieht2) return; zieht2 = false; gFlug.innerHTML = ''; w.zl = true; sichern(); zeichneWaage(); zeichneStrecke(); fertig(); };
    zieht2 = true; zeichneWaage();
    if (ruhig){ ende(); return; }
    const t0 = performance.now(), dauer = 1200;
    setTimeout(ende, dauer + 300);
    // Die Flaechen fliessen zusammen: jedes Quadrat wandert und waechst
    // zum gemeinsamen Quadrat, zuletzt bleibt eines.
    const schritt = jetzt => {
      if (!zieht2) return;
      const f = Math.min(1, (jetzt - t0) / dauer), e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
      gFlug.innerHTML = von.map(r => { const d = r.d + (nach.d - r.d) * e;
        return `<rect x="${r.x + (nach.x - r.x) * e}" y="${r.y + (nach.y - r.y) * e}" width="${d}" height="${d}" fill="#0065A9" fill-opacity="${(0.35 / (1 + e * (von.length - 1))).toFixed(3)}" stroke="#0065A9"/>`; }).join('');
      if (f < 1) requestAnimationFrame(schritt); else ende();
    };
    requestAnimationFrame(schritt);
  };
  function panRects(lx, ly){
    let y = ly - 2;
    return quad.map(q => { const d = q.seite * u; y -= d; return {x: lx - d / 2, y, d}; });
  }
  // Fassung 17.1: Beim Loslassen gleiten die Quadrate aus dem Histogramm
  // auf die linke Schale (Waage noch waagrecht), dann kippt sie.
  const gleiten = fertig => {
    const gFlug = svg.querySelector('.flug');
    const von = quad.map(hq), nach = panRects(MX - ZSW.ARM, Y0);
    if (ruhig){ fertig(); return; }
    gleitet = true; zeichneWaage();
    const t0 = performance.now(), dauer = 1100;
    // Ende sicher, auch wenn der Browser keine Bilder zeichnet (Tab im Hintergrund)
    const ende = () => { if (!gleitet) return; gFlug.innerHTML = ''; gleitet = false; fertig(); };
    setTimeout(ende, dauer + 300);
    const schritt = jetzt => {
      if (!gleitet) return;
      const f = Math.min(1, (jetzt - t0) / dauer), e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
      gFlug.innerHTML = von.map((a, i) => { const b = nach[i], d = a.d + (b.d - a.d) * e;
        return `<rect x="${a.x + (b.x - a.x) * e}" y="${a.y + (b.y - a.y) * e}" width="${d}" height="${d}" fill="#0065A9" fill-opacity=".35" stroke="#0065A9"/>`; }).join('');
      if (f < 1) requestAnimationFrame(schritt); else ende();
    };
    requestAnimationFrame(schritt);
  };
  // Sanft: der Winkel naehert sich dem Ziel Bild fuer Bild
  const bewegen = () => {
    const z = ziel0();
    if (ruhig || Math.abs(z - winkel) < 0.05){ winkel = z; zeichneWaage(); lauf = null; return; }
    winkel += (z - winkel) * 0.12; zeichneWaage(); lauf = requestAnimationFrame(bewegen);
  };
  const neu = () => {
    zeichneBand(); zeichneStrecke();
    if (!lauf) lauf = requestAnimationFrame(bewegen);
    // Ohne gezeichnete Bilder (Tab im Hintergrund) steht die Waage sonst still
    clearTimeout(neu.uhr);
    neu.uhr = setTimeout(() => { if (lauf){ cancelAnimationFrame(lauf); lauf = null; } winkel = ziel0(); zeichneWaage(); }, 1500);
  };
  const setze = s => {
    const vorher = w.s;
    w.s = Math.max(0, Math.min(o.hi - o.lo, s));
    if (w.los && (Math.abs(w.s - o.sigma) <= SW.raste || (vorher - o.sigma) * (w.s - o.sigma) < 0)){ w.s = o.sigma; w.ok = true; }
  };
  const ausZeiger = ev => { const r = svg.getBoundingClientRect(); return Math.abs(sxInv((ev.clientX - r.left) / r.width * ZSW.B) - o.E); };
  let zieht = false;
  box.addEventListener('pointerdown', ev => {
    if (w.ok) return;
    const r = svg.getBoundingClientRect();
    if ((ev.clientY - r.top) / r.height * H > ZSW.ACHSE + 30) return;   // nur im Histogramm (ueber den Quadraten)
    zieht = true; box.setPointerCapture(ev.pointerId); box.focus({preventScroll: true});
    setze(ausZeiger(ev)); neu(); ev.preventDefault();
  });
  box.addEventListener('pointermove', ev => { if (zieht && !w.ok){ setze(ausZeiger(ev)); neu(); } });
  const ende = () => { if (!zieht) return; zieht = false; sichern(); if (nachher) nachher(); };
  box.addEventListener('pointerup', ende);
  box.addEventListener('pointercancel', ende);
  box.addEventListener('keydown', ev => {
    if (w.ok || (ev.key !== 'ArrowUp' && ev.key !== 'ArrowDown')) return;
    ev.preventDefault();
    setze(w.s + (ev.key === 'ArrowUp' ? 0.05 : -0.05) * (ev.shiftKey ? 5 : 1));
    neu(); sichern(); if (nachher) nachher();
  });
  zeichneBand(); zeichneWaage(); zeichneStrecke();
  return { loslassen(){ w.los = true; sichern(); gleiten(() => neu()); }, zusammenlegen };
}

/* NEU (FASSUNG 17): beide Waagen einer Bude untereinander - erst die
   E-Waage, ist E gefunden, die Streuungs-Waage. Bei den zwei Beispielen
   (beispiel) gilt als Schaetzung, was vor dem Loslassen eingestellt war:
   st.s[id] = {e, s, ge}. Stand st.wg[id] = {e, los, ok}, st.sw[id] =
   {s, los, ok}. Wird eine Waage waagrecht, zeichnet sich der Zug neu. */
/* NEU (FASSUNG 18): «Mit Waage prüfen» - ein Fenster mit dem grossen
   Histogramm einer unteren Bude, beiden Waagen, den Quadraten und dem
   Zusammenlegen. Die Schaetzung aus der Karte wird uebernommen (solange
   die Waage noch nicht waagrecht ist); beim Schliessen gilt, was im
   Fenster eingestellt ist, als neue Schaetzung. */
function zgrWaagenFenster(h, st){
  const L = D.e3.legen, z = st.s[h.id], w = st.wg[h.id], sw = st.sw[h.id];
  if (!w.ok){ w.e = z.e; w.los = false; }
  if (!sw.ok && !sw.los){ sw.s = z.s; }
  const vorher = document.activeElement;
  const hg = document.createElement('div'); hg.className = 'zgr-wfenster';
  hg.innerHTML = `<div class="kasten" role="dialog" aria-modal="true" aria-label="${L.fensterTitel.replace('{name}', h.name)}">`
    + `<div class="kopfzeile"><b>${L.fensterTitel.replace('{name}', h.name)}</b><button class="zu" aria-label="Schliessen" title="Schliessen">×</button></div>`
    + `<div class="zgr-text zgr-zart">${L.fensterHinweis}</div><div class="inhalt"></div>`
    + `<div class="zgr-zeile" style="justify-content:flex-end"><button class="knopf fertig">${L.fensterZu}</button></div></div>`;
  document.body.appendChild(hg);
  const inhalt = hg.querySelector('.inhalt');
  const zeichnen = () => {
    const y = inhalt.scrollTop;
    inhalt.innerHTML = `<div class="kopf"><b>${h.name}</b></div>${zgrPlanHtml(h.plan)}`;
    zgrWaagenBlock(inhalt, h, st, false, zeichnen);
    inhalt.scrollTop = y;
  };
  zeichnen();
  const schliessen = () => {
    z.e = w.e; z.s = sw.s; z.ge = true; sichern();
    hg.remove(); document.removeEventListener('keydown', taste);
    zgrNeuAmOrt(etappe3);
    if (vorher && vorher.isConnected) vorher.focus({preventScroll: true});
  };
  const taste = ev => { if (ev.key === 'Escape') schliessen(); };
  document.addEventListener('keydown', taste);
  hg.querySelector('.zu').onclick = schliessen;
  hg.querySelector('.fertig').onclick = schliessen;
  hg.addEventListener('pointerdown', ev => { if (ev.target === hg) schliessen(); });
  hg.querySelector('.zu').focus({preventScroll: true});
}
/* Neu zeichnen, ohne dass die Seite nach oben springt */
function zgrNeuAmOrt(neu){
  const els = [...document.querySelectorAll('#buehne *')].filter(e => e.scrollTop > 0 && e.id);
  const lage = els.map(e => [e.id, e.scrollTop]);
  neu();
  lage.forEach(([id, t]) => { const e = document.getElementById(id); if (e) e.scrollTop = t; });
}
function zgrWaagenBlock(karte, h, st, beispiel, neu){
  const L = D.e3.legen, w = st.wg[h.id], sw = st.sw[h.id];
  // Fassung 18: Im Fenster («Mit Waage prüfen») zeichnet sich das Fenster neu
  neu = neu || (() => zgrNeuAmOrt(etappe3));
  const teil = (titel, text) => {
    const d = document.createElement('div'); d.className = 'zgr-waageteil';
    d.innerHTML = `<div class="zgr-waagekopf">${titel}</div>` + (text ? `<div class="zgr-zart">${text}</div>` : '');
    karte.appendChild(d);
    return d;
  };
  const status = (d, ok, los, okText, satz, losText, knopf) => {
    const s = document.createElement('div'); s.className = 'zgr-waagestatus';
    s.innerHTML = ok ? `<div class="warum">${okText}</div><div class="zgr-decksatz">${satz}</div>`
      : los ? `<div class="zgr-zart">${losText}</div>` : `<button class="knopf">${L.loslassen}</button>`;
    d.appendChild(s);
    const b = s.querySelector('button');
    // Kein Neuzeichnen beim Loslassen: Die Waage soll sichtbar kippen
    if (b) b.onclick = () => {
      knopf(); s.innerHTML = `<div class="zgr-zart">${losText}</div>`;
      const intro = d.querySelector(':scope > .zgr-zart'); if (intro) intro.remove();
    };
  };
  const dE = teil(L.waageTitel, w.los ? '' : L.waageText);
  const wE = zgrWaage(dE, h, w, () => { if (w.ok) neu(); });
  status(dE, w.ok, w.los, L.waageOk.replace('{e}', zgrRund(h.E).t), L.waageSatz, L.waageLos, () => {
    if (beispiel){ st.s[h.id].e = w.e; }
    wE.loslassen();
  });
  if (!w.ok) return;
  const dS = teil(L.sTitel, sw.los ? '' : L.sText);
  const wS = zgrSWaage(dS, h, sw, () => { if (sw.ok) neu(); });
  status(dS, sw.ok, sw.los, L.sOk.replace('{s}', zgrGleichRund(h.sigma)), L.sSatz, L.sLos, () => {
    if (beispiel){ st.s[h.id].s = sw.s; st.s[h.id].ge = true; }
    wS.loslassen(); zeigeZl();
  });
  // NEU (Fassung 18): «Quadrate zusammenlegen», sobald die Waage los ist
  const zl = document.createElement('div'); zl.className = 'zgr-waagestatus';
  dS.appendChild(zl);
  const zeigeZl = () => {
    zl.innerHTML = !sw.los ? '' : sw.zl ? `<div class="zgr-decksatz">${L.zSatz}</div>`
      : `<button class="knopf leer">${L.zKnopf}</button>`;
    const b = zl.querySelector('button');
    if (b) b.onclick = () => { b.disabled = true; wS.zusammenlegen(zeigeZl); };
  };
  zeigeZl();
}

/* ───────── Die Karte eines Histogramms (Zug 2) ───────── */
function zgrMiniSvg(o, w, h, nackt){
  w = w || 116; h = h || 54;
  // nackt: ohne Zahlen an der Achse (das Band der Sammlung)
  const u = nackt ? 3 : 12;
  const pmax = Math.max(...o.vert.map(([, b]) => zgrZahl(b)));
  const lo = Math.min(...o.vert.map(([k]) => k)), hi = Math.max(...o.vert.map(([k]) => k));
  const sx = k => 8 + (hi === lo ? 0.5 : (k - lo) / (hi - lo)) * (w - 16);
  const bb = Math.max(3, Math.min(14, (w - 16) / (hi - lo + 1) * 0.7));
  const t = o.vert.filter(([, b]) => zgrZahl(b) > 0).map(([k, b]) => {
    const ph = zgrZahl(b) / pmax * (h - u - 4);
    return `<rect x="${sx(k) - bb / 2}" y="${h - u - ph}" width="${bb}" height="${ph}" fill="#0065A9" opacity=".8"/>`;
  });
  t.push(`<line x1="2" x2="${w - 2}" y1="${h - u}" y2="${h - u}" stroke="#8a8279"/>`);
  if (!nackt) t.push(
    `<text x="${sx(lo)}" y="${h - 1}" font-family="Fira Sans,sans-serif" font-size="9.5" text-anchor="middle" fill="#6c6357">${String(lo).replace('-', '−')}</text>`,
    `<text x="${sx(hi)}" y="${h - 1}" font-family="Fira Sans,sans-serif" font-size="9.5" text-anchor="middle" fill="#6c6357">${String(hi).replace('-', '−')}</text>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${t.join('')}</svg>`;
}

/* Die sieben Buden der Landkarte (Fassung 14), in der Reihenfolge von
   inhalte.E3_BUDEN. */
const zgrBuden3 = () => D.e3.hist.filter(h => h.art === 'G');

/* ───────── Der Baukasten (Zug 3) ───────── */
const ZB = {B: 440, H: 250, L: 30, R: 30, OBEN: 34, ACHSE: 176};
const zgrBX = x => ZB.L + (x + 0.5) / 7 * (ZB.B - ZB.L - ZB.R);
const zgrBauVert = h => D.e3.bau.werte.map((k, i) => [k, h[i] || 0]);

function zgrBauSvg(h, wahl, bild, titel){
  const F = 'font-family="Fira Sans,sans-serif"';
  const S = D.e3.bau.stufen, summe = h.reduce((a, b) => a + b, 0);
  const sy = v => ZB.ACHSE - v / S * (ZB.ACHSE - ZB.OBEN);
  const bb = (ZB.B - ZB.L - ZB.R) / 7 * 0.62;
  const m = zgrMomente(zgrBauVert(h));
  const t = [`<rect width="${ZB.B}" height="${ZB.H}" fill="#fffefb"/>`];
  if (titel) t.push(`<text x="${ZB.L}" y="16" ${F} font-size="13" fill="#2d2924">${titel}</text>`);
  const bx = x => ZB.L + (x + 0.5) / 7 * (ZB.B - ZB.L - ZB.R);
  if (m){
    const bl = bx(Math.max(-0.5, m.E - m.sigma)), br = bx(Math.min(6.5, m.E + m.sigma));
    t.push(`<rect x="${bl}" y="${ZB.OBEN - 6}" width="${br - bl}" height="${ZB.ACHSE - ZB.OBEN + 6}" fill="#0065A9" opacity=".12"/>`,
      `<line x1="${bx(m.E - m.sigma)}" x2="${bx(m.E + m.sigma)}" y1="${ZB.OBEN - 6}" y2="${ZB.OBEN - 6}" stroke="#0065A9" stroke-width="2"/>`);
  }
  D.e3.bau.werte.forEach((k, i) => {
    const x = bx(k);
    if (!bild) t.push(`<rect x="${x - bb / 2 - 4}" y="${ZB.OBEN}" width="${bb + 8}" height="${ZB.ACHSE - ZB.OBEN}" fill="${wahl === i ? '#eef4fa' : '#f6f1e7'}" rx="4"/>`);
    if (h[i]) t.push(`<rect x="${x - bb / 2}" y="${sy(h[i])}" width="${bb}" height="${ZB.ACHSE - sy(h[i])}" fill="#0065A9" opacity=".8"/>`,
      `<text x="${x}" y="${sy(h[i]) - 4}" ${F} font-size="11" text-anchor="middle" fill="#2d2924">${+(h[i] / summe).toFixed(2)}</text>`);
    t.push(`<text x="${x}" y="${ZB.ACHSE + ZGR_DREIECK.SPITZE + 22}" ${F} font-size="12" text-anchor="middle" fill="#6c6357">${k}</text>`);
  });
  t.push(`<line x1="${ZB.L - 6}" x2="${ZB.B - ZB.R + 6}" y1="${ZB.ACHSE}" y2="${ZB.ACHSE}" stroke="#2d2924" stroke-width="2.5" stroke-linecap="round"/>`);
  if (m) t.push(zgrDreieck(bx(m.E), ZB.ACHSE + 2));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ZB.B} ${ZB.H}" width="${ZB.B}" height="${ZB.H}">${t.join('')}</svg>`;
}

function zgrBauUrteil(art, h, hB){
  const B = D.e3.bau, m = zgrMomente(zgrBauVert(h));
  if (!m) return {ok: false, satz: 'Ziehen Sie zuerst mindestens einen Balken hoch.'};
  const E = m.E, s = m.sigma, r = zgrRund;
  const eIst = (soll, name) => Math.abs(E - soll) <= B.tolE ? null : `E ist ${r(E).t}, ${name} ${r(soll).t}.`;
  if (art === 'klein' || art === 'gross'){
    const f = eIst(3, 'gesucht ist'); if (f) return {ok: false, satz: f};
    if (art === 'klein') return s <= B.klein ? {ok: true, satz: `E = 3 und σ ${zgrGleichRund(s)}. Das ist sehr schmal.`}
      : {ok: false, satz: `E = 3 stimmt. σ ${zgrGleichRund(s)}: Es geht noch schmaler.`};
    return s >= B.gross ? {ok: true, satz: `E = 3 und σ ${zgrGleichRund(s)}. Das ist sehr breit.`}
      : {ok: false, satz: `E = 3 stimmt. σ ${zgrGleichRund(s)}: Es geht noch breiter.`};
  }
  if (art === 'garderobe'){
    const f = eIst(B.garderobeE, 'bei der Garderobe ist es'); if (f) return {ok: false, satz: f};
    return s > B.garderobeS + B.tolE ? {ok: true, satz: `E = ${r(B.garderobeE).t} wie bei der Garderobe, σ ${zgrGleichRund(s)} statt ${r(B.garderobeS).t}.`}
      : {ok: false, satz: `E stimmt. σ ${zgrGleichRund(s)}, bei der Garderobe ${r(B.garderobeS).t}. Gesucht ist mehr Streuung.`};
  }
  // NEU (Fassung 13): die Auftraege 5 bis 9 - dieselben Regeln wie
  // inhalte.bau_urteil(), dort an Beispielen nachgerechnet.
  if (art === 'null') return s < 1e-9 ? {ok: true, satz: 'σ = 0: Alles liegt auf einem einzigen Wert, E ist genau dieser Wert.'}
    : {ok: false, satz: `σ ${zgrGleichRund(s)}. Für σ = 0 darf es keine Streuung geben.`};
  if (art === 'schieben'){
    const m0 = zgrMomente(zgrBauVert(B.start)), e2 = m0.E + B.schieben;
    const eOk = Math.abs(E - e2) <= B.tolE, sOk = Math.abs(s - m0.sigma) <= B.tolS;
    if (eOk && sOk) return {ok: true, satz: `E = ${r(E).t}, vorher ${r(m0.E).t}: um 2 grösser. σ bleibt ${r(s).t}.`};
    if (eOk) return {ok: false, satz: `E stimmt, aber σ ist jetzt ${r(s).t}, vorher ${r(m0.sigma).t}. Lassen Sie die Höhen, wie sie waren.`};
    return {ok: false, satz: `E ist ${r(E).t}, vorher ${r(m0.E).t}. Schieben Sie jeden Balken um 2 nach rechts, mit derselben Höhe.`};
  }
  if (art === 'hoechster'){
    const hoch = Math.max(...h), orte = B.werte.filter((k, i) => h[i] === hoch);
    return orte.every(k => Math.abs(E - k) >= B.hoch)
      ? {ok: true, satz: `Der höchste Balken steht bei ${orte.join(' und ')}, E ${zgrGleichRund(E)} liegt woanders.`}
      : {ok: false, satz: `E ${zgrGleichRund(E)} liegt beim höchsten Balken (${orte.join(', ')}). Es geht auch anders.`};
  }
  if (art === 'symm'){
    const ks = B.werte.filter((k, i) => h[i]);
    if (ks.length < 2) return {ok: false, satz: 'Bauen Sie mindestens zwei Balken.'};
    const m2 = ks[0] + ks[ks.length - 1];
    const sym = B.werte.every(k => m2 - k < 0 || m2 - k > 6 || h[k] === h[m2 - k]);
    return sym ? {ok: true, satz: `Symmetrisch um ${r(m2 / 2).t}: E = ${r(E).t}, genau in der Mitte.`}
      : {ok: false, satz: 'Noch nicht symmetrisch: Links und rechts der Mitte sind die Balken verschieden hoch.'};
  }
  if (art === 'zwei'){
    const mB = zgrMomente(zgrBauVert(hB || []));
    if (!mB) return {ok: false, satz: 'Bauen Sie auch auf Platz B eine Verteilung.'};
    const sOk = Math.abs(s - mB.sigma) <= B.tolS, eOk = Math.abs(E - mB.E) >= B.zweiE;
    if (sOk && eOk) return {ok: true, satz: `Gleiches σ (${r(s).t}), verschiedenes E (${r(E).t} und ${r(mB.E).t}).`};
    if (!sOk) return {ok: false, satz: `σ ist ${r(s).t} auf A und ${r(mB.sigma).t} auf B. Gesucht ist dasselbe σ.`};
    return {ok: false, satz: `E ist ${r(E).t} und ${r(mB.E).t}: zu nahe beieinander. Verschieben Sie eine der beiden.`};
  }
  // art === 'nicht'
  const nah = D.e3.bau.werte.filter((k, i) => h[i] && Math.abs(E - k) < B.abstand);
  return nah.length ? {ok: false, satz: `E ${zgrGleichRund(E)}: Diesen Wert nimmt X an, denn P(X = ${nah[0]}) > 0.`}
    : {ok: true, satz: `E ${zgrGleichRund(E)}. Diesen Wert nimmt X nie an.`};
}

function zgrBaukasten(ziel, st, nachAenderung){
  // NEU (Fassung 13): Auftrag 9 hat zwei Speicherplaetze A und B
  const B = D.e3.bau, a = st.bau.a, h = a === 9 && st.bau.platz === 'B' ? st.bau.hB : st.bau.h[a];
  let wahl = 3;
  const box = document.createElement('div');
  box.className = 'zgr-schaetz zgr-bauk';
  box.tabIndex = 0;
  box.setAttribute('role', 'group');
  box.setAttribute('aria-label', 'Baukasten für eine Verteilung auf 0 bis 6. Pfeiltasten links und rechts wählen einen Balken, auf und ab ändern seine Höhe.');
  ziel.appendChild(box);
  // Die Zahlen ueber dem Bild: Auf einem kleinen Schirm bleiben sie so
  // beim Ziehen sichtbar.
  const zahlen = document.createElement('div'); zahlen.className = 'zahlen'; box.appendChild(zahlen);
  const bild = document.createElement('div'); box.appendChild(bild);
  const zeichnen = () => {
    bild.innerHTML = zgrBauSvg(h, wahl, false);
    const m = zgrMomente(zgrBauVert(h));
    zahlen.innerHTML = m ? `E ${zgrGleichRund(m.E)} <span class="zgr-zart">·</span> σ ${zgrGleichRund(m.sigma)}`
      : '<span class="zgr-zart">Ziehen Sie einen Balken hoch.</span>';
  };
  const lage = ev => {
    const r = bild.querySelector('svg').getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width * ZB.B, y = (ev.clientY - r.top) / r.height * ZB.H;
    const i = Math.floor((x - ZB.L) / (ZB.B - ZB.L - ZB.R) * 7);
    const v = Math.round((ZB.ACHSE - y) / (ZB.ACHSE - ZB.OBEN) * B.stufen);
    return {i: Math.max(0, Math.min(6, i)), v: Math.max(0, Math.min(B.stufen, v))};
  };
  let zieht = false;
  const setzen = ev => { const l = lage(ev); wahl = l.i; h[l.i] = l.v; zeichnen(); };
  box.addEventListener('pointerdown', ev => {
    zieht = true; box.setPointerCapture(ev.pointerId); box.focus({preventScroll: true});
    setzen(ev); ev.preventDefault();
  });
  box.addEventListener('pointermove', ev => { if (zieht) setzen(ev); });
  const ende = () => { if (!zieht) return; zieht = false; sichern(); nachAenderung(); };
  box.addEventListener('pointerup', ende);
  box.addEventListener('pointercancel', ende);
  box.addEventListener('keydown', ev => {
    const k = ev.key;
    if (k === 'ArrowLeft' || k === 'ArrowRight') wahl = Math.max(0, Math.min(6, wahl + (k === 'ArrowRight' ? 1 : -1)));
    else if (k === 'ArrowUp' || k === 'ArrowDown') h[wahl] = Math.max(0, Math.min(B.stufen, h[wahl] + (k === 'ArrowUp' ? 1 : -1)));
    else return;
    ev.preventDefault(); zeichnen();
    if (k === 'ArrowUp' || k === 'ArrowDown'){ sichern(); nachAenderung(); }
  });
  zeichnen();
  return {zeichnen};
}

/* ───────── Etappe 3 (FASSUNG 14) ─────────
   Stand in stand.zgr3:
     wg[id]  = {e, los, ok}    (Fassung 17) die E-Waage je Bude
     sw[id]  = {s, los, ok}    (Fassung 17) die Streuungs-Waage je Bude
     wz[id]                    (Fassung 17) Waagen auf einer unteren Karte gezeigt
     s[id]   = {e, s, ge}      (Fassung 16) Schaetzung: Dreieck, halbes Band, geschaetzt
     sp[id]  = [g, …]          (Fassung 16) die letzten 20 Spiele
     auf                       aufgedeckt: wahre Lagen, Schaetzungen fest
     wahl                      die Bude, die gerade nachgerechnet wird
     r[id]   = {g, kp, qp, E, V, S, ok}  Rechenschema
     t                         Schreibfelder (Fassung 19: krit, nie, ub0 ... ub3, bude6; bau6, bau8)
     meine                     (Fassung 19) die Wahl aus Zug 1
     ubAuto                    (Fassung 19) das Fenster «Alle Buden» hat sich einmal geoeffnet
     bude    = {a, b:{1..7: {h, aus, einsatz}}, ok:{1..7}}  (Fassung 19) a = 0: weitere Auftraege
     bau     = {a, h:{1..9: [7 Stufen]}, hB (Auftrag 9, Platz B), platz, ok:{1..9: bool}}
     fertig  = {1, 2, 3}       Zuege fuer die Schrittleiste
     kx[id]  = {E, S}          (Fassung 11) Lage auf der Landkarte fuer X
     kxZeig                    die wahre Lage auf der Landkarte fuer X
   Ein Stand vor Fassung 16 beginnt neu (zgrStandPruefen). */
const ZGR_BAU_N = [1, 2, 3, 4, 5, 6, 7, 8, 9];
/* Die Landkarte aus den Schaetzungen (Fassung 16): nur geschaetzte Buden,
   auf die Achsen beschraenkt. */
function zgrSchaetzKarte(st){
  const E = D.e3.ebene, aus = {};
  zgrBuden3().forEach(h => { const z = (st.s || {})[h.id];
    if (z && z.ge) aus[h.id] = {E: Math.max(E.emin, Math.min(E.emax, z.e)), S: Math.max(0, Math.min(E.smax, z.s))}; });
  return aus;
}
function zgrE3(){
  if (!zgrObj(stand.zgr3)) stand.zgr3 = {};
  const st = stand.zgr3;
  ['r', 's', 't', 'bau', 'fertig', 'kx', 'sp', 'wg', 'sw', 'wz'].forEach(k => { if (!zgrObj(st[k])) st[k] = {}; });
  // Fassung 16: je Bude die Schaetzung (Dreieck und Band), die Waage, die Spiele
  zgrBuden3().forEach(h => {
    const z = st.s[h.id];
    if (!zgrObj(z) || typeof z.e !== 'number' || typeof z.s !== 'number') st.s[h.id] = zgrSchaetzStart(h);
    if (st.sp[h.id] && !(Array.isArray(st.sp[h.id]) && st.sp[h.id].every(v => typeof v === 'number'))) delete st.sp[h.id];
  });
  // Fassung 17: je Bude die E-Waage (wg) und die Streuungs-Waage (sw)
  zgrBuden3().forEach(h => {
    if (!zgrObj(st.wg[h.id]) || typeof st.wg[h.id].e !== 'number') st.wg[h.id] = {e: h.lo + (h.hi - h.lo) * 0.15};
    if (!zgrObj(st.sw[h.id]) || typeof st.sw[h.id].s !== 'number') st.sw[h.id] = {s: (h.hi - h.lo) / 12};
  });
  // NEU (Fassung 13): neun Auftraege im Baukasten, Auftrag 6 beginnt mit
  // den Balken aus D.e3.bau.start, Auftrag 9 hat einen zweiten Platz (hB).
  if (!ZGR_BAU_N.includes(st.bau.a)) st.bau.a = 1;
  if (!zgrObj(st.bau.h)) st.bau.h = {};
  if (!zgrObj(st.bau.ok)) st.bau.ok = {};
  const gut = h => Array.isArray(h) && h.length === 7 && !h.some(v => typeof v !== 'number');
  ZGR_BAU_N.forEach(a => { if (!gut(st.bau.h[a])) st.bau.h[a] = a === 6 ? D.e3.bau.start.slice() : [0, 0, 0, 0, 0, 0, 0]; });
  if (!gut(st.bau.hB)) st.bau.hB = [0, 0, 0, 0, 0, 0, 0];
  if (!['A', 'B'].includes(st.bau.platz)) st.bau.platz = 'A';
  if (![1, 2, 3].includes(stand.e3zug)) stand.e3zug = 1;
  if (!zgrBuden3().some(h => h.id === st.wahl)) st.wahl = null;
  // NEU (Fassung 19): die Wahl aus Zug 1 und «Bauen Sie eine Bude»
  if (!zgrBuden3().some(h => h.id === st.meine)) st.meine = null;
  if (!zgrObj(st.bude)) st.bude = {};
  const sb = st.bude, BU = D.e3.bude;
  if (!zgrObj(sb.b)) sb.b = {};
  if (!zgrObj(sb.ok)) sb.ok = {};
  if (sb.a !== 0 && !ZGR_BUDE_N.includes(sb.a)) sb.a = 1;
  const reihe = (x, max) => Array.isArray(x) && x.length === BU.felder && x.every(v => typeof v === 'number' && v >= 0 && v <= max);
  ZGR_BUDE_N.forEach(n => { const b = sb.b[n];
    if (!zgrObj(b) || !reihe(b.h, BU.stufen) || !reihe(b.aus, BU.ausMax) || typeof b.einsatz !== 'number') sb.b[n] = zgrBudeStart(n); });
  return st;
}

/* ───────── Das Rechenschema (Fassung 6) ─────────
   Je Verteilung eine Tabelle: k | P(X = k) | k · P(X = k) |
   (k − E)² · P(X = k), darunter die Summen E und Var und σ = √Var. In
   jedes Feld darf eine Zahl oder eine Rechnung (zgrRechne). Stand:
   st.r[id] = {kp:{k}, qp:{k}, E, V, S, ok}. */
function zgrSchemaStand(st, o){
  const obj = v => v && typeof v === 'object' && !Array.isArray(v);
  const r = st.r[o.id] = obj(st.r[o.id]) ? st.r[o.id] : {};
  if (!obj(r.kp)) r.kp = {};
  if (!obj(r.qp)) r.qp = {};
  return r;
}
/* Toleranzen: Wer E gerundet weiterverwendet, liegt in der letzten
   Spalte und bei Var etwas daneben - das gilt als richtig. */
const ZGR_TOL = {g: 0.006, kp: 0.006, qp: 0.011, E: 0.006, V: 0.011, S: 0.011};

function zgrRechenschema(ziel, o, r, nachAenderung){
  // NEU (Fassung 8): Bei den Buden (o.art 'G') kommt die Spalte g dazu,
  // der Gewinn je Wert von X (Auszahlung minus Einsatz), einzutragen.
  // Die beiden Rechenspalten heissen dann g · P und (g − E)² · P.
  const G = o.art === 'G', v = G ? 'g' : 'k';
  if (G && !zgrObj(r.g)) r.g = {};
  const pz = b => o.pdezimal ? zgrDezText(zgrZahl(b)) : zgrBruchHtml(b);
  const name = f => f === 'kp' ? `${v} · P` : f === 'qp' ? `(${v} − E)² · P` : f === 'g' ? 'g' : f === 'E' ? 'E' : f === 'V' ? 'Var' : 'σ';
  const feld = (f, k) => `<input class="zgr-zelle" data-f="${f}"${k !== undefined ? ` data-k="${k}"` : ''} placeholder="?" `
    + `aria-label="${name(f)}${k !== undefined ? ` bei X = ${k}` : ''}">`
    + '<div class="wert"></div>';
  const box = document.createElement('div');
  box.className = 'zgr-bau zgr-schemabox';
  const kopf = G ? '<tr><th>X = k</th><th>P(X = k)</th><th>Gewinn g in Fr.</th><th>g · P(X = k)</th><th>(g − E)² · P(X = k)</th></tr>'
    : '<tr><th>k</th><th>P(X = k)</th><th>k · P(X = k)</th><th>(k − E)² · P(X = k)</th></tr>';
  const E = G ? 'E(G)' : 'E', Var = G ? 'Var(G)' : 'Var', Sg = G ? 'σ(G)' : 'σ';
  box.innerHTML = '<table class="zgr-tabelle zgr-schema">' + kopf
    + o.schema.map(z => `<tr><td>${z.k}</td><td>${pz(z.p)}</td>${G ? `<td>${feld('g', z.k)}</td>` : ''}<td>${feld('kp', z.k)}</td><td>${feld('qp', z.k)}</td></tr>`).join('')
    + `<tr class="summe"><td>Summe</td><td>1</td>${G ? '<td></td>' : ''}<td><span class="vor">${E} =</span>${feld('E')}</td><td><span class="vor">${Var} =</span>${feld('V')}</td></tr>`
    + `<tr><td colspan="${G ? 4 : 3}" style="text-align:right">${Sg} = √${Var} =</td><td>${feld('S')}</td></tr></table>`
    + '<div class="zgr-hinweise" style="display:none"></div>';
  ziel.appendChild(box);
  const hinweis = box.querySelector('.zgr-hinweise');
  const lesen = f => f.dataset.k !== undefined ? r[f.dataset.f][f.dataset.k] : r[f.dataset.f];
  const zeigen = f => {
    const w = f.nextElementSibling, roh = String(lesen(f) || '').trim(), e = zgrRechne(roh);
    w.textContent = !roh ? '' : !e ? 'nicht lesbar' : e.einzeln ? '' : (zgrErgebnis(e.wert, /[.,]/.test(roh)).genau ? '= ' : '≈ ')
      + zgrErgebnis(e.wert, /[.,]/.test(roh)).t;
  };
  box.querySelectorAll('input').forEach(f => {
    f.value = lesen(f) || '';
    f.disabled = !!r.ok;
    zeigen(f);
    f.oninput = () => {
      if (f.dataset.k !== undefined) r[f.dataset.f][f.dataset.k] = f.value; else r[f.dataset.f] = f.value;
      f.classList.remove('ok', 'falsch'); hinweis.style.display = 'none';
      zeigen(f); if (nachAenderung) nachAenderung(); if (window.sichern) sichern();
    };
  });
  if (r.ok) box.querySelectorAll('input').forEach(f => f.classList.add('ok'));
  const soll = f => {
    if (f.dataset.f === 'E') return o.E;
    if (f.dataset.f === 'V') return o.sigma * o.sigma;
    if (f.dataset.f === 'S') return o.sigma;
    return o.schema.find(z => String(z.k) === f.dataset.k)[f.dataset.f];
  };
  return {
    pruefen(){
      let leer = 0, falsch = 0;
      const wo = {};
      box.querySelectorAll('input').forEach(f => {
        f.classList.remove('ok', 'falsch');
        const e = zgrRechne(lesen(f));
        if (!e){ leer++; return; }
        const ok = Math.abs(e.wert - soll(f)) < (ZGR_TOL[f.dataset.f] || 0.006);
        f.classList.add(ok ? 'ok' : 'falsch');
        if (!ok){ falsch++; wo[f.dataset.f] = e.wert; }
      });
      const h = [];
      if ('g' in wo) h.push('Spalte g: Auszahlung laut Gewinnplan minus Einsatz. Ein Verlust ist negativ.');
      if ('kp' in wo) h.push(G ? 'Spalte g · P(X = k): den Gewinn mal seine Wahrscheinlichkeit.'
        : 'Spalte k · P(X = k): den Wert von X mal seine Wahrscheinlichkeit.');
      if ('E' in wo) h.push(`${E} ist die Summe der Spalte ${v} · P(X = k).`);
      if ('qp' in wo) h.push(`Letzte Spalte: Abstand von ${v} zu ${E}, quadriert, mal P(X = k).`);
      if ('V' in wo) h.push(`${Var} ist die Summe der letzten Spalte.`);
      if ('S' in wo) h.push(Math.abs(wo.S - o.sigma * o.sigma) < ZGR_TOL.V && Math.abs(o.sigma - 1) > 1e-9
        ? 'Das ist die Varianz. σ ist ihre Wurzel.' : 'σ ist die Wurzel aus Var.');
      if (leer) h.push(`${leer} Feld${leer > 1 ? 'er sind' : ' ist'} noch leer oder nicht lesbar.`);
      hinweis.style.display = h.length ? '' : 'none';
      hinweis.innerHTML = '<ul>' + h.map(t => `<li>${t}</li>`).join('') + '</ul>';
      const ok = !leer && !falsch;
      return {ok, satz: ok ? '' : `${falsch ? `${falsch} Feld${falsch > 1 ? 'er stimmen' : ' stimmt'} nicht` : 'Noch nicht vollständig'}`
        + ' — die Hinweise stehen unter dem Rechenschema.'};
    },
  };
}

let _zgrBeobachter = null;

/* ───────── Die Landkarte der sieben Buden (FASSUNG 14) ─────────
   E(G) nach rechts, sigma(G) nach oben. zgrKarteInhalt() zeichnet in die
   Achsen: Linien von der Schaetzung zur wahren Lage, auf Wunsch die
   Schaetzungen als blaue Marken (Bild zum Mitnehmen) und die wahren
   Lagen als rote Punkte mit Nummer und Namen. Der Name steht rechts,
   links, oben oder unten, wo er nichts ueberdeckt. */
const ZGR_RAND = {L: 44, R: 14, O: 14, U: 36};
const zgrKartePx = (m, p) => {
  const E = D.e3.ebene;
  return {x: ZGR_RAND.L + (p.E - E.emin) / (E.emax - E.emin) * m.iw, y: ZGR_RAND.O + (1 - p.S / E.smax) * m.ih};
};
function zgrKarteInhalt(m, o){
  const B3 = zgrBuden3(), F = 'font-family="Fira Sans,sans-serif"', t = [];
  const wahr = Object.fromEntries(B3.map(h => [h.id, zgrKartePx(m, {E: h.E, S: h.sigma})]));
  const s = o.schaetz || {};
  const schaetz = Object.fromEntries(B3.filter(h => s[h.id]).map(h => [h.id, zgrKartePx(m, s[h.id])]));
  // NEU (Fassung 19, o.grau): Schaetzungen grau, wahre Lagen blau; o.wahl
  // setzt einen Ring um die Wahl aus Zug 1
  const fS = o.grau ? '#8a8279' : '#0065A9', fW = o.grau ? '#0065A9' : '#C0392B';
  if (o.wahr) B3.forEach(h => {
    const a = schaetz[h.id], b = wahr[h.id]; if (!a) return;
    t.push(`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#6c6357" stroke-width="1.6" stroke-dasharray="5 3"/>`);
  });
  if (o.marken) B3.forEach((h, j) => {
    const a = schaetz[h.id]; if (!a) return;
    t.push(`<circle cx="${a.x}" cy="${a.y}" r="10" fill="#fff" stroke="${fS}" stroke-width="2"/>`,
      `<text x="${a.x}" y="${a.y + 4}" ${F} font-size="11.5" font-weight="600" text-anchor="middle" fill="${fS}">${j + 1}</text>`);
  });
  if (o.wahl){
    const q = o.wahr ? wahr[o.wahl] : schaetz[o.wahl];
    if (q) t.push(`<circle cx="${q.x}" cy="${q.y}" r="14.5" fill="none" stroke="#E09E5A" stroke-width="3"/>`);
  }
  // Die Namen (Fassung 18 auch an den Schaetzungen, o.namen): dorthin, wo
  // sie keinen Punkt und keinen anderen Namen ueberdecken - rechts, links,
  // oben, unten; sonst wo am wenigsten.
  const punkte = o.wahr ? B3.map((h, j) => ({h, j, q: wahr[h.id], farbe: fW}))
    : o.namen ? B3.filter(h => schaetz[h.id]).map(h => ({h, j: B3.indexOf(h), q: schaetz[h.id], farbe: o.grau ? '#4d463e' : fS})) : [];
  if (!punkte.length) return t.join('');
  const boxen = [...Object.values(schaetz), ...(o.wahr ? Object.values(wahr) : [])].map(q => [q.x - 11, q.y - 11, q.x + 11, q.y + 11]);
  const ueber = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
  const eigen = q => b => Math.abs((b[0] + b[2]) / 2 - q.x) < 0.5 && Math.abs((b[1] + b[3]) / 2 - q.y) < 0.5;
  punkte.forEach(({h, j, q, farbe}) => {
    const bw = h.name.length * 6.4 + 4;
    const lagen = [
      {x: q.x + 14, y: q.y + 4, a: 'start', b: [q.x + 13, q.y - 8, q.x + 15 + bw, q.y + 6]},
      {x: q.x - 14, y: q.y + 4, a: 'end', b: [q.x - 15 - bw, q.y - 8, q.x - 13, q.y + 6]},
      {x: q.x, y: q.y - 15, a: 'middle', b: [q.x - bw / 2, q.y - 26, q.x + bw / 2, q.y - 11]},
      {x: q.x, y: q.y + 25, a: 'middle', b: [q.x - bw / 2, q.y + 13, q.x + bw / 2, q.y + 28]},
    ].filter(l => l.b[0] >= 2 && l.b[2] <= m.w - 2 && l.b[1] >= 0);
    const ist = eigen(q);
    const kosten = l => boxen.reduce((s2, b) => s2 + (ist(b) ? 0 : ueber(l.b, b)), 0);
    const l = (lagen.length ? lagen : [{x: q.x + 14, y: q.y + 4, a: 'start', b: [0, 0, 0, 0]}])
      .reduce((best, l2) => kosten(l2) < kosten(best) - 0.5 ? l2 : best);
    boxen.push(l.b);
    if (o.wahr) t.push(`<circle cx="${q.x}" cy="${q.y}" r="10" fill="${fW}"/>`,
      `<text x="${q.x}" y="${q.y + 4}" ${F} font-size="11.5" font-weight="600" text-anchor="middle" fill="#fff">${j + 1}</text>`);
    t.push(`<text x="${l.x}" y="${l.y}" ${F} font-size="12" text-anchor="${l.a}" fill="${farbe}"`
      + ` stroke="#fffefb" stroke-width="3" paint-order="stroke">${h.name}</text>`);
  });
  return t.join('');
}
/* Die Karte einer Bude in der linken Spalte: Nummer, Name, was X zaehlt,
   Histogramm des Gewinns, Gewinnplan; nach dem Aufdecken E und sigma. */
function zgrBudenKarte(h, j, werte){
  const k = document.createElement('div');
  k.className = 'zgr-bk'; k.dataset.id = h.id;
  const gezeigt = !zgrSammlung()[h.quelle] ? ` <span class="zgr-gezeigt" title="${D.e3.gezeigtTitel}">${D.e3.gezeigt}</span>` : '';
  k.innerHTML = `<div class="kopf"><span class="platz"></span><span class="nr">${j + 1}</span><b>${h.name}</b>${gezeigt}</div>`
    + `<div class="was">${h.text}</div>`
    + `<div class="bild">${zgrMiniSvg(h, 200, 62)}<div class="unter">Gewinn G in Fr.</div></div>`
    + zgrPlanHtml(h.plan)
    + (werte ? `<div class="werte">E(G) ${zgrGleichRund(h.E)} Fr. · σ(G) ${zgrGleichRund(h.sigma)} Fr.</div>` : '');
  return k;
}
/* Die Masse der Landkarte: so hoch, dass sie mit Anleitung und Knopf
   ohne Rollen in die Haelfte passt; ist die Haelfte klein, wenigstens
   die Karte allein (mindestens 150 px). Die Hoehe bleibt, solange die
   Breite bleibt (merk): Sonst springt die Karte, wenn eine Meldung in der
   Leiste umbricht und die Haelfte kuerzer wird. */
function zgrKarteMasse(ebene, feld, merk){
  const w = ebene.clientWidth || 480;
  let h = merk && merk.w === w ? merk.h : null;
  if (h === null){
    // Platz lassen fuer die Anleitung darueber und «Aufdecken» darunter,
    // auch wenn der Befund in der Leiste eine eigene Zeile bekommt
    const ch = (document.getElementById('rechts') || feld).clientHeight;
    h = Math.min(w * 0.66, 420, ch - 150);
    // Kleiner Bildschirm: Die Karte passt wenigstens allein in die Haelfte
    if (h < 220) h = Math.max(150, Math.min(220, ch - 20));
    if (merk){ merk.w = w; merk.h = h; }
  }
  return {w, h, iw: w - ZGR_RAND.L - ZGR_RAND.R, ih: h - ZGR_RAND.O - ZGR_RAND.U};
}

/* GEAENDERT (FASSUNG 19, thema.md «Etappe 3: erst waehlen, dann
   untersuchen, dann vergleichen», Rike 2026-10-20). Fassung 18 steht in Git.
   Zug 1  «Welche Bude wuerden Sie waehlen?»: die sieben Buden ohne E und
          sigma, «Meine Wahl» (st.meine), Pflichtsatz st.t.krit, freiwillig
          st.t.nie. fertig[1].
   Zug 2  «Schwerpunkt und Breite»: Korbwurf und Torwand mit beiden Waagen,
          die uebrigen fuenf schaetzen (wie Fassung 18). Sind alle sieben
          geschaetzt, oeffnet sich einmal von selbst (st.ubAuto) das Fenster
          «Alle Buden auf einen Blick» (zgrUeberblick): Landkarte, Aufdecken,
          Tabelle, Rechenschema (Pflicht), vier Fragen (st.t.ub0 ... ub3),
          Sicht. fertig[2].
   Zug 3  «Bauen Sie eine Bude»: sieben Auftraege (st.bude), darunter
          freiwillig die neun Auftraege des alten Baukastens (st.bau).
          fertig[3], wenn alle sieben erfuellt sind. */
const zgrGeschaetzt = st => D.e3.beispiele.every(id => st.wg[id].ok && st.sw[id].ok)
  && zgrBuden3().filter(h => !D.e3.beispiele.includes(h.id)).every(h => st.s[h.id].ge);
const zgrGerechnet = st => zgrBuden3().some(h => st.r[h.id] && st.r[h.id].ok);
const zgrFertig1 = st => !!st.meine && !!String(st.t.krit || '').trim();
const zgrFertig2 = st => zgrGeschaetzt(st) && !!st.auf && zgrGerechnet(st)
  && D.e3.ueberblick.fragen.every((f, j) => String(st.t['ub' + j] || '').trim());
const ZGR_BUDE_N = [1, 2, 3, 4, 5, 6, 7];
const zgrFertig3 = st => ZGR_BUDE_N.every(n => st.bude.ok[n] === true);

/* Ein Fenster ueber der Flaeche (Fassung 19, wie «Mit Waage pruefen»):
   o = {titel, hinweis, breit, fuellen(inhalt, neu), zu()}. Zu mit ×,
   Escape oder Klick daneben. */
function zgrFensterAuf(o){
  const vorher = document.activeElement;
  const hg = document.createElement('div'); hg.className = 'zgr-wfenster' + (o.breit ? ' breit' : '');
  hg.innerHTML = `<div class="kasten" role="dialog" aria-modal="true" aria-label="${o.titel}">`
    + `<div class="kopfzeile"><b>${o.titel}</b><button class="zu" aria-label="Schliessen" title="Schliessen">×</button></div>`
    + (o.hinweis ? `<div class="zgr-text zgr-zart">${o.hinweis}</div>` : '') + '<div class="inhalt"></div>'
    + (o.zuText ? `<div class="zgr-zeile" style="justify-content:flex-end"><button class="knopf fertig">${o.zuText}</button></div>` : '') + '</div>';
  document.body.appendChild(hg);
  const inhalt = hg.querySelector('.inhalt');
  const neu = () => { const y = inhalt.scrollTop; inhalt.innerHTML = ''; o.fuellen(inhalt, neu); inhalt.scrollTop = y; };
  neu();
  const schliessen = () => {
    hg.remove(); document.removeEventListener('keydown', taste);
    if (o.zu) o.zu();
    if (vorher && vorher.isConnected) vorher.focus({preventScroll: true});
  };
  const taste = ev => { if (ev.key === 'Escape') schliessen(); };
  document.addEventListener('keydown', taste);
  hg.querySelector('.zu').onclick = schliessen;
  const f = hg.querySelector('.fertig'); if (f) f.onclick = schliessen;
  hg.addEventListener('pointerdown', ev => { if (ev.target === hg) schliessen(); });
  hg.querySelector('.zu').focus({preventScroll: true});
  return {schliessen, neu, inhalt};
}

/* ───────── «Alle Buden auf einen Blick» (FASSUNG 19) ─────────
   Die Landkarte aus den Schaetzungen (grau), «Aufdecken» zeigt die wahren
   Lagen (blau) mit Linien, eine Legende, die Wahl aus Zug 1 als Ring,
   Tabelle, Rechenschema (Pflicht fuer eine Bude), vier Fragen, Sicht. */
function zgrLegende(st){
  const U = D.e3.ueberblick;
  const svg = inhalt => `<svg width="26" height="18" viewBox="0 0 26 18" aria-hidden="true">${inhalt}</svg>`;
  const t = [`<span>${svg('<circle cx="13" cy="9" r="7" fill="#fff" stroke="#8a8279" stroke-width="2"/>')} ${U.legSchaetz}</span>`];
  if (st.auf) t.push(`<span>${svg('<circle cx="13" cy="9" r="7" fill="#0065A9"/>')} ${U.legWahr}</span>`,
    `<span>${svg('<line x1="1" y1="9" x2="25" y2="9" stroke="#6c6357" stroke-width="1.6" stroke-dasharray="5 3"/>')} ${U.legLinie}</span>`);
  if (st.meine) t.push(`<span>${svg('<circle cx="13" cy="9" r="7.5" fill="none" stroke="#E09E5A" stroke-width="3"/>')} ${U.legWahl}</span>`);
  return `<div class="zgr-legende">${t.join('')}</div>`;
}
function zgrUeberblick(st){
  const U = D.e3.ueberblick, B3 = zgrBuden3(), W = D.e3.wahl;
  let beob = null;
  const fenster = zgrFensterAuf({titel: U.titel, breit: true,
    zu: () => { if (beob) beob.disconnect(); zgrNeuAmOrt(etappe3); },
    fuellen: (inhalt, neu) => {
      if (beob){ beob.disconnect(); beob = null; }
      inhalt.insertAdjacentHTML('beforeend', `<div class="zgr-text">${st.auf ? U.aufgedeckt : U.text}</div>` + zgrLegende(st));
      const ebene = document.createElement('div'); ebene.className = 'zgr-ebene zgr-landkarte fest';
      inhalt.appendChild(ebene);
      const flaeche = document.createElement('div'); flaeche.className = 'zgr-ebenebild';
      ebene.appendChild(flaeche);
      const zeichnen = () => {
        const w = ebene.clientWidth || 600, h = Math.max(200, Math.min(w * 0.55, 360));
        const m = {w, h, iw: w - ZGR_RAND.L - ZGR_RAND.R, ih: h - ZGR_RAND.O - ZGR_RAND.U};
        ebene.style.height = h + 'px';
        flaeche.innerHTML = zgrEbeneAchsen(w, h, ZGR_RAND, zgrKarteInhalt(m, {schaetz: zgrSchaetzKarte(st), marken: true,
          wahr: !!st.auf, namen: true, grau: true, wahl: st.meine}), null, 'G');
      };
      zeichnen();
      if (window.ResizeObserver){ beob = new ResizeObserver(() => zeichnen()); beob.observe(ebene); }
      // Die Tabelle: Bude · Ihre Schaetzung · nach dem Aufdecken E und sigma
      inhalt.insertAdjacentHTML('beforeend', '<table class="zgr-tabelle zgr-kartentabelle"><tr><th></th><th>Bude</th>'
        + `<th>${U.legSchaetz}: E</th><th>σ</th>` + (st.auf ? `<th>${U.legWahr}: E(G)</th><th>σ(G)</th>` : '') + '</tr>'
        + B3.map((h, j) => { const z = st.s[h.id], an = st.meine === h.id;
          return `<tr${an ? ' class="gewaehlt"' : ''}><td>${j + 1}</td><td>${h.name}${an ? ` <span class="zgr-wahlmarke">${W.gewaehlt}</span>` : ''}</td>`
            + `<td>≈ ${zgrRund(z.e).t}</td><td>≈ ${zgrRund(z.s).t}</td>`
            + (st.auf ? `<td>${zgrGleichRund(h.E)}</td><td>${zgrGleichRund(h.sigma)}</td>` : '') + '</tr>'; }).join('') + '</table>');
      if (!st.auf){
        const z = document.createElement('div'); z.className = 'zgr-zeile';
        z.innerHTML = `<button class="knopf" id="zgraufdecken">${D.e3.legen.aufdecken}</button>`;
        z.querySelector('button').onclick = () => { st.auf = true; sichern(); neu(); };
        inhalt.appendChild(z);
        return;
      }
      // Das Rechenschema, Pflicht fuer eine Bude
      const ab = document.createElement('div'); ab.className = 'zgr-abschnitt'; inhalt.appendChild(ab);
      zgrTitel(ab, D.e3.rechnenTitel).classList.add('gross');
      ab.insertAdjacentHTML('beforeend', `<div class="zgr-text">${D.e3.rechnenText}</div>`);
      if (!st.wahl && st.meine) st.wahl = st.meine;
      const wahl = document.createElement('div'); wahl.className = 'zgr-wahl';
      B3.forEach((h, j) => {
        const b = document.createElement('button'), ok = st.r[h.id] && st.r[h.id].ok;
        b.className = h.id === st.wahl ? 'an' : '';
        b.setAttribute('aria-pressed', h.id === st.wahl);
        b.innerHTML = `<span class="nr">${j + 1}</span>${h.name}${ok ? ' <span class="ok">✓</span>' : ''}`;
        b.onclick = () => { st.wahl = h.id; sichern(); neu(); };
        wahl.appendChild(b);
      });
      ab.appendChild(wahl);
      const stand2 = () => { const f = zgrFertig2(st); if (f !== !!st.fertig[2]) zgrFertig(st, 2, f); };
      if (st.wahl){
        const o = zgrHist(st.wahl), r = zgrSchemaStand(st, o);
        ab.insertAdjacentHTML('beforeend', `<div class="zgr-box"><b>${o.name}</b> · ${zgrPlanHtml(o.plan)}</div>`);
        if (!r.ok) ab.insertAdjacentHTML('beforeend', `<div class="zgr-text zgr-zart">${D.e3.rechnenG}</div>`);
        const meld = document.createElement('div');
        const schema = zgrRechenschema(ab, o, r, () => { meld.innerHTML = ''; });
        const z = document.createElement('div'); z.className = 'zgr-zeile';
        if (!r.ok){ z.innerHTML = `<button class="knopf">${U.rechnenKnopf}</button>`; ab.appendChild(z); }
        meld.className = 'zgr-text'; ab.appendChild(meld);
        if (r.ok) meld.innerHTML = `<b style="color:var(--richtig)">${U.rechnenOk}</b>`;
        const b = z.querySelector('button');
        if (b) b.onclick = () => {
          const u = schema.pruefen();
          r.ok = u.ok; sichern(); stand2();
          if (u.ok) neu(); else meld.innerHTML = u.satz;
        };
      }
      // Die vier Fragen
      const af = document.createElement('div'); af.className = 'zgr-abschnitt'; inhalt.appendChild(af);
      zgrTitel(af, U.fragenTitel).classList.add('gross');
      U.fragen.forEach((f, j) => {
        const sf = zgrSchreibfeld(f, st.t['ub' + j], false, v => { st.t['ub' + j] = v; sichern(); stand2(); });
        if (j === 0 && st.meine) sf.querySelector('label').insertAdjacentHTML('afterend',
          `<div class="zgr-zart">${W.gewaehlt}: ${zgrHist(st.meine).name}</div>`);
        if (j === 1) sf.querySelector('label').insertAdjacentHTML('afterend',
          `<div class="zgr-zitat"><span class="zgr-zart">${U.ihrSatz}</span> ${String(st.t.krit || '').trim() ? zgrEsc(st.t.krit) : U.keinSatz}</div>`);
        af.appendChild(sf);
      });
      const z = document.createElement('div'); z.className = 'zgr-zeile';
      z.innerHTML = '<button class="knopf leer">Eine mögliche Sicht</button>';
      af.appendChild(z);
      const sicht = document.createElement('div'); sicht.className = 'zgr-sicht'; sicht.style.display = 'none';
      sicht.innerHTML = '<b>Eine mögliche Sicht</b><ul>' + D.e3.sicht.map(t => `<li>${t}</li>`).join('') + '</ul>';
      af.appendChild(sicht);
      z.querySelector('button').onclick = () => { sicht.style.display = sicht.style.display ? '' : 'none';
        if (!sicht.style.display) sicht.scrollIntoView({block: 'nearest'}); };
      zgrXKarte(af, st);
    }});
  return fenster;
}

/* ───────── «Bauen Sie eine Bude» (FASSUNG 19) ─────────
   b = {h: [6 Stufen], aus: [6 Fr.], einsatz}. G = Auszahlung − Einsatz,
   gleiche Gewinne zusammengefasst. zgrBudeHist() gibt ein Histogramm in
   der Form von D.e3.hist (fuer die Waagen). */
function zgrBudeHist(b){
  const n = b.h.reduce((s, v) => s + v, 0);
  if (!n) return null;
  const v = {};
  b.h.forEach((hi, i) => { if (hi){ const g = Math.round((b.aus[i] - b.einsatz) * 100) / 100; v[g] = (v[g] || 0) + hi; } });
  const vert = Object.keys(v).map(Number).sort((x, y) => x - y).map(g => [g, [v[g], n]]);
  const m = zgrMomente(vert.map(([g, p]) => [g, zgrZahl(p)]));
  const sigma = m.sigma < 1e-6 ? 0 : m.sigma;
  const lo = Math.floor(Math.min(vert[0][0] - 1, m.E - sigma)), hi = Math.ceil(Math.max(vert[vert.length - 1][0] + 1, m.E + sigma));
  const plus = vert.filter(([g]) => g > 1e-9).reduce((s, [, p]) => s + zgrZahl(p), 0);
  return {id: 'bude', name: D.e3.bude.titel, art: 'G', vert, E: Math.abs(m.E) < 1e-9 ? 0 : m.E, sigma, lo, hi, plus};
}
const zgrBudeStart = n => JSON.parse(JSON.stringify(n === 7 ? D.e3.bude.fairStart : D.e3.bude.start));
const ZBU = {B: 440, H: 196, L: 20, R: 20, OBEN: 26, ACHSE: 158};
const zgrBudeX = i => ZBU.L + (i + 0.5) / D.e3.bude.felder * (ZBU.B - ZBU.L - ZBU.R);
const zgrP2 = p => String(+p.toFixed(2));
function zgrBudeBalkenSvg(b, wahl, fest){
  const F = 'font-family="Fira Sans,sans-serif"', BU = D.e3.bude, S = BU.stufen;
  const n = b.h.reduce((s, v) => s + v, 0);
  const sy = v => ZBU.ACHSE - v / S * (ZBU.ACHSE - ZBU.OBEN);
  const bb = (ZBU.B - ZBU.L - ZBU.R) / BU.felder * 0.6;
  const t = [`<rect width="${ZBU.B}" height="${ZBU.H}" fill="#fffefb"/>`];
  b.h.forEach((v, i) => {
    const x = zgrBudeX(i);
    if (!fest) t.push(`<rect x="${x - bb / 2 - 4}" y="${ZBU.OBEN}" width="${bb + 8}" height="${ZBU.ACHSE - ZBU.OBEN}" fill="${wahl === i ? '#eef4fa' : '#f6f1e7'}" rx="4"/>`);
    if (v) t.push(`<rect x="${x - bb / 2}" y="${sy(v)}" width="${bb}" height="${ZBU.ACHSE - sy(v)}" fill="#0065A9" opacity=".8"/>`,
      `<text x="${x}" y="${sy(v) - 4}" ${F} font-size="11.5" text-anchor="middle" fill="#2d2924">${zgrP2(v / n)}</text>`);
    t.push(`<text x="${x}" y="${ZBU.ACHSE + 18}" ${F} font-size="12" text-anchor="middle" fill="#6c6357">${BU.feld} ${i + 1}</text>`);
  });
  t.push(`<line x1="${ZBU.L - 6}" x2="${ZBU.B - ZBU.R + 6}" y1="${ZBU.ACHSE}" y2="${ZBU.ACHSE}" stroke="#2d2924" stroke-width="2"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ZBU.B} ${ZBU.H}" width="${ZBU.B}" height="${ZBU.H}">${t.join('')}</svg>`;
}
/* Das Gewinn-Histogramm der eigenen Bude mit Dreieck bei E(G) und dem
   Band von E − σ bis E + σ. */
function zgrBudeGewinnSvg(o, titel){
  const F = 'font-family="Fira Sans,sans-serif"', B = 440, H = 200, Lr = 22, Rr = 22, OBEN = titel ? 34 : 18, ACHSE = 140;
  const sx = x => Lr + (x - o.lo) / (o.hi - o.lo) * (B - Lr - Rr);
  const pmax = Math.max(...o.vert.map(([, p]) => zgrZahl(p)));
  const sy = p => ACHSE - p / (pmax * 1.1) * (ACHSE - OBEN - 12);
  const bb = Math.max(4, Math.min(28, (B - Lr - Rr) / (o.hi - o.lo + 1) * 0.6));
  const t = [`<rect width="${B}" height="${H}" fill="#fffefb"/>`];
  if (titel) t.push(`<text x="${Lr}" y="16" ${F} font-size="13" fill="#2d2924">${titel}</text>`);
  const bl = sx(o.E - o.sigma), br = sx(o.E + o.sigma);
  t.push(`<rect x="${bl}" y="${OBEN}" width="${Math.max(0, br - bl)}" height="${ACHSE - OBEN}" fill="#0065A9" opacity=".12"/>`);
  if (o.lo < 0 && o.hi > 0) t.push(`<line x1="${sx(0)}" x2="${sx(0)}" y1="${OBEN}" y2="${ACHSE}" stroke="#c9bda8" stroke-dasharray="3 3"/>`);
  o.vert.forEach(([g, p]) => {
    const q = zgrZahl(p);
    t.push(`<rect x="${sx(g) - bb / 2}" y="${sy(q)}" width="${bb}" height="${ACHSE - sy(q)}" fill="${g > 1e-9 ? '#007D57' : '#0065A9'}" opacity=".8"/>`,
      `<text x="${sx(g)}" y="${sy(q) - 4}" ${F} font-size="11" text-anchor="middle" fill="#2d2924">${zgrP2(q)}</text>`);
  });
  t.push(`<line x1="${Lr - 6}" x2="${B - Rr + 6}" y1="${ACHSE}" y2="${ACHSE}" stroke="#2d2924" stroke-width="2.5" stroke-linecap="round"/>`);
  t.push(zgrDreieck(sx(o.E), ACHSE + 2, {spitze: 20, halb: 10}));
  const breit = o.hi - o.lo, schritt = breit > 40 ? 10 : breit > 20 ? 5 : breit > 12 ? 2 : 1;
  for (let k = Math.ceil(o.lo / schritt) * schritt; k <= o.hi; k += schritt){
    t.push(`<line x1="${sx(k)}" x2="${sx(k)}" y1="${ACHSE + 24}" y2="${ACHSE + 28}" stroke="#8a8279"/>`,
      `<text x="${sx(k)}" y="${ACHSE + 41}" ${F} font-size="11.5" text-anchor="middle" fill="#6c6357">${String(k).replace('-', '−')}</text>`);
  }
  t.push(`<line x1="${sx(o.lo)}" x2="${sx(o.hi)}" y1="${ACHSE + 26}" y2="${ACHSE + 26}" stroke="#c9bda8"/>`,
    `<text x="${B - Rr}" y="${H - 4}" ${F} font-size="11.5" text-anchor="end" fill="#6c6357">${D.e3.bude.gewinnTitel}</text>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${B} ${H}" width="${B}" height="${H}">${t.join('')}</svg>`;
}
const zgrFrZahl = s => { const v = parseFloat(String(s).replace(',', '.').replace('−', '-')); return isFinite(v) ? v : null; };
const zgrFrText = v => String(+(+v).toFixed(2)).replace('-', '−');
/* Der Bau einer Bude: Einsatz, Balken (Wahrscheinlichkeit je Feld),
   Tabelle mit Auszahlung und Gewinn je Feld, das Gewinn-Histogramm mit
   E(G) und σ(G), die Waagen im Fenster. nurEinsatz: Auftrag 7. */
function zgrBude(ziel, b, nachAenderung, nurEinsatz){
  const BU = D.e3.bude, U = BU, N = BU.felder;
  let wahl = 0;
  const wrap = document.createElement('div'); wrap.className = 'zgr-bude';
  ziel.appendChild(wrap);
  // Breit: links bauen, rechts das Gewinn-Histogramm
  wrap.innerHTML = `<div class="links"><div class="zgr-zeile zgr-einsatz"><label>${BU.einsatz} <input inputmode="decimal" value="${zgrFrText(b.einsatz)}" aria-label="${BU.einsatz} in Fr."> Fr.</label></div>`
    + `<div class="zgr-zart" style="margin:0 2px">${BU.wahrsch}</div>`
    + `<div class="zgr-schaetz zgr-bauk${nurEinsatz ? ' fest' : ''}" ${nurEinsatz ? '' : 'tabindex="0"'} role="group" aria-label="${BU.wahrsch} je ${BU.feld}. ${BU.tastatur}"><div class="bild"></div></div>`
    + '<table class="zgr-tabelle zgr-budetab"><tr><th></th>' + b.h.map((v, i) => `<th>${BU.feld} ${i + 1}</th>`).join('') + '</tr>'
    + `<tr><th>P</th>${b.h.map((v, i) => `<td data-p="${i}"></td>`).join('')}</tr>`
    + `<tr><th>${BU.auszahlung}</th>${b.aus.map((a, i) => `<td><input inputmode="decimal" data-a="${i}" value="${zgrFrText(a)}"${nurEinsatz ? ' disabled' : ''} aria-label="${BU.auszahlung}, ${BU.feld} ${i + 1}"></td>`).join('')}</tr>`
    + `<tr><th>g</th>${b.h.map((v, i) => `<td data-g="${i}"></td>`).join('')}</tr></table></div>`
    + '<div class="rechts"><div class="zgr-budezahlen"></div><div class="zgr-budebild"></div>'
    + `<div class="zgr-zeile"><button class="knopf leer klein zgr-budewaagen">${BU.waagen}</button></div></div>`;
  const box = wrap.querySelector('.zgr-bauk'), bild = box.querySelector('.bild');
  const zahlen = wrap.querySelector('.zgr-budezahlen'), gbild = wrap.querySelector('.zgr-budebild');
  const zeichnen = () => {
    bild.innerHTML = zgrBudeBalkenSvg(b, nurEinsatz ? -1 : wahl, nurEinsatz);
    const n = b.h.reduce((s, v) => s + v, 0);
    b.h.forEach((v, i) => {
      wrap.querySelector(`[data-p="${i}"]`).textContent = n ? zgrP2(v / n) : '0';
      wrap.querySelector(`[data-g="${i}"]`).textContent = v ? zgrFrText(b.aus[i] - b.einsatz) : '';
    });
    const o = zgrBudeHist(b);
    wrap.querySelector('.zgr-budewaagen').disabled = !o || o.sigma === 0;
    if (!o){ zahlen.innerHTML = `<span class="zgr-zart">${BU.leer}</span>`; gbild.innerHTML = ''; return; }
    const ch = Math.abs(o.E) < 1e-9 ? BU.chilbiFair : (o.E < 0 ? BU.chilbi : BU.chilbiVerlust).replace('{v}', zgrRund(Math.abs(o.E)).t);
    zahlen.innerHTML = `<b>E(G) ${zgrGleichRund(o.E)} Fr.</b> <span class="zgr-zart">·</span> <b>σ(G) ${zgrGleichRund(o.sigma)} Fr.</b>`
      + `<div class="zgr-zart">${ch} ${BU.oftText.replace('{p}', zgrP2(o.plus))}</div>`;
    gbild.innerHTML = zgrBudeGewinnSvg(o);
  };
  const geaendert = () => { zeichnen(); nachAenderung(); };
  // Einsatz und Auszahlungen: Komma oder Punkt, begrenzt
  const eIn = wrap.querySelector('.zgr-einsatz input');
  eIn.oninput = () => { const v = zgrFrZahl(eIn.value); if (v === null) return;
    b.einsatz = Math.max(0, Math.min(BU.einsatzMax, v)); geaendert(); };
  eIn.onchange = () => { eIn.value = zgrFrText(b.einsatz); };
  wrap.querySelectorAll('input[data-a]').forEach(f => {
    const i = +f.dataset.a;
    f.oninput = () => { const v = zgrFrZahl(f.value); if (v === null) return;
      b.aus[i] = Math.max(0, Math.min(BU.ausMax, v)); geaendert(); };
    f.onchange = () => { f.value = zgrFrText(b.aus[i]); };
  });
  if (!nurEinsatz){
    const lage = ev => {
      const r = bild.querySelector('svg').getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width * ZBU.B, y = (ev.clientY - r.top) / r.height * ZBU.H;
      const i = Math.floor((x - ZBU.L) / (ZBU.B - ZBU.L - ZBU.R) * N);
      const v = Math.round((ZBU.ACHSE - y) / (ZBU.ACHSE - ZBU.OBEN) * BU.stufen);
      return {i: Math.max(0, Math.min(N - 1, i)), v: Math.max(0, Math.min(BU.stufen, v))};
    };
    let zieht = false;
    const setzen = ev => { const l = lage(ev); wahl = l.i; b.h[l.i] = l.v; zeichnen(); };
    box.addEventListener('pointerdown', ev => {
      zieht = true; box.setPointerCapture(ev.pointerId); box.focus({preventScroll: true});
      setzen(ev); ev.preventDefault();
    });
    box.addEventListener('pointermove', ev => { if (zieht) setzen(ev); });
    const ende = () => { if (!zieht) return; zieht = false; nachAenderung(); };
    box.addEventListener('pointerup', ende);
    box.addEventListener('pointercancel', ende);
    box.addEventListener('keydown', ev => {
      const k = ev.key;
      if (k === 'ArrowLeft' || k === 'ArrowRight') wahl = Math.max(0, Math.min(N - 1, wahl + (k === 'ArrowRight' ? 1 : -1)));
      else if (k === 'ArrowUp' || k === 'ArrowDown') b.h[wahl] = Math.max(0, Math.min(BU.stufen, b.h[wahl] + (k === 'ArrowUp' ? 1 : -1)));
      else return;
      ev.preventDefault(); zeichnen();
      if (k === 'ArrowUp' || k === 'ArrowDown') nachAenderung();
    });
  }
  // Die Waagen im Fenster, mit einem eigenen, fluechtigen Stand
  wrap.querySelector('.zgr-budewaagen').onclick = () => {
    const o = zgrBudeHist(b); if (!o) return;
    const ps = {wg: {bude: {e: o.lo + (o.hi - o.lo) * 0.15}}, sw: {bude: {s: (o.hi - o.lo) / 12}}, s: {bude: {}}};
    zgrFensterAuf({titel: U.waagenTitel, hinweis: U.waagenHinweis, fuellen: (inhalt, neu) => zgrWaagenBlock(inhalt, o, ps, false, neu)});
  };
  zeichnen();
  return {zeichnen};
}
function zgrBudeUrteil(art, b, text){
  const BU = D.e3.bude, T = BU.urteil, o = zgrBudeHist(b);
  const f = (s, w) => s.replace('{e}', w.e != null ? zgrGleichRund(w.e) : '').replace('{s}', w.s != null ? zgrGleichRund(w.s) : '')
    .replace('{p}', w.p != null ? zgrP2(w.p) : '').replace('{soll}', w.soll != null ? w.soll : '')
    .replace('{k}', zgrRund(BU.korbE).t);
  if (art === 'nie'){
    if (String(text || '').trim()) return {ok: true, satz: T.nieOk};
    if (!o) return {ok: false, satz: T.nieLeer};
    return {ok: false, satz: o.vert[0][0] >= -1e-9 ? f(T.nieVersuchNie, {e: o.E}) : T.nieVersuchVerlust};
  }
  if (!o) return {ok: false, satz: T.leer};
  const w = {e: o.E, s: o.sigma, p: o.plus}, fair = Math.abs(o.E) <= BU.tol;
  if (art === 'verdient'){
    if (Math.abs(o.E - BU.verdientE) > BU.tol) return {ok: false, satz: f(T.verdientNein, w)};
    return o.sigma > 0 ? {ok: true, satz: f(T.verdientOk, w)} : {ok: false, satz: T.keinRisiko};
  }
  if (art === 'fairklein' || art === 'lotterie' || art === 'einsatz'){
    if (!fair) return {ok: false, satz: f(T.fairNein, w)};
    if (o.sigma === 0) return {ok: false, satz: T.keinRisiko};
    if (art === 'fairklein') return o.sigma < BU.klein ? {ok: true, satz: f(T.kleinOk, w)} : {ok: false, satz: f(T.kleinNein, Object.assign({soll: BU.klein}, w))};
    if (art === 'lotterie') return o.sigma > BU.lotterie ? {ok: true, satz: f(T.lotterieOk, w)} : {ok: false, satz: f(T.lotterieNein, Object.assign({soll: BU.lotterie}, w))};
    return {ok: true, satz: f(T.einsatzOk, Object.assign({soll: zgrFrText(b.einsatz)}, w))};
  }
  if (art === 'korb'){
    if (Math.abs(o.E - BU.korbE) > BU.tol) return {ok: false, satz: f(T.korbNein, Object.assign({soll: zgrRund(BU.korbE).t}, w))};
    if (o.sigma === 0) return {ok: false, satz: T.keinRisiko};
    const max = BU.korbFaktor * BU.korbS;
    return o.sigma <= max ? {ok: true, satz: f(T.korbOk, Object.assign({soll: zgrRund(BU.korbS).t}, w))}
      : {ok: false, satz: f(T.korbRisiko, Object.assign({soll: zgrRund(max).t}, w))};
  }
  // art === 'aussehen'
  if (o.plus < BU.oft - 1e-9) return {ok: false, satz: f(T.aussehenOft, w)};
  return o.E < -1e-9 ? {ok: true, satz: f(T.aussehenOk, w)} : {ok: false, satz: f(T.aussehenE, w)};
}

function etappe3(){
  const st = zgrE3();
  const zug = stand.e3zug;
  const a = D.etappen[2], Z = D.e3.zuege, B3 = zgrBuden3(), L = D.e3.legen, U = D.e3.ueberblick, W = D.e3.wahl;
  if (_zgrBeobachter){ _zgrBeobachter.disconnect(); _zgrBeobachter = null; }
  const titel = `Etappe 3 · ${Z[zug - 1]}`;
  const text = zug === 1 ? D.e3.text : zug === 2 ? D.e3.text2 : D.e3.bude.text;
  const knopf = (id, t, rechts) => `<button class="knopf leer" id="${id}"${rechts ? ' style="margin-left:auto"' : ''}>${t}</button>`;
  const leiste = (zug > 1 ? knopf('zurueckzug', `← Zug ${zug - 1}`) : '')
    + '<button class="knopf" id="pruefen">Prüfen</button><span class="befund" id="befund"></span>'
    + (zug === 2 ? knopf('zgrblick', U.knopf) : '')
    + knopf('weiter', zug === 1 ? D.weiter.zug2 : zug === 2 ? D.weiter.zug3 : 'Mitnehmen →', true);
  // Fassung 19: die Haken der Schrittleiste aus dem Stand
  const erledigt = [zgrFertig1(st), zgrFertig2(st), zgrFertig3(st)];
  erledigt.forEach((ok, j) => { st.fertig[j + 1] = ok; });
  const oben = zgrSchrittleiste(Z.map((t, j) => ({t, jetzt: j + 1 === zug, ok: erledigt[j]}))) + zgrSammlungHtml();
  const auftrag = {rolle: a.rolle, rang: a.rang, titel, text};
  if (zug < 3) zgrEinFeld(auftrag, Z[zug - 1], leiste, oben);
  else buehne(auftrag, 'Die Aufträge', D.e3.bude.titel, leiste, oben, '', [0.85, 1.5]);
  zgrSchrittKlick(j => { if (j + 1 !== zug){ stand.e3zug = j + 1; sichern(); etappe3(); } });
  zgrAuftragKopf(3);
  const WT = D.weiter;
  const fahne3 = () => {
    const sl = document.getElementById('zgrsleiste');
    if (sl){ sl.classList.toggle('gedimmt', zug < 3 && !st.fertig[zug]); sl.title = zug < 3 && !st.fertig[zug] ? WT.gedimmt : ''; }
    // Ohne Uhr: Wer gerade schreibt, soll nicht weggefuehrt werden
    if (zug === 1 && st.fertig[1]) zgrFahne({notiz: WT.zug2Notiz, knopf: WT.zug2, uhr: false,
      tun: () => { stand.e3zug = 2; sichern(); etappe3(); }});
    else if (zug === 2 && st.fertig[2]) zgrFahne({notiz: WT.zug3Notiz, knopf: WT.zug3, uhr: false,
      tun: () => { const f = document.querySelector('.zgr-wfenster'); if (f) f.remove(); stand.e3zug = 3; sichern(); etappe3(); }});
    else if (zug === 3 && st.fertig[3]) zgrFahne({notiz: WT.mitnehmenNotiz, knopf: WT.mitnehmen, uhr: false, tun: () => { stand.etappe = 3; los(); }});
    else zgrFahne(null);
  };
  window._zgrFertigHaken = (i, ok, vorher) => { if (i === zug) fahne3(); };
  fahne3();
  window._zustaendig = () => false;
  window._neuzeichnen = null;
  const tisch = document.getElementById('tisch'), feld = document.getElementById('feld');
  const befund = h => { document.getElementById('befund').innerHTML = h; };
  const leeren = () => befund('');
  let pruefen = null;
  const abschnitt = (titel, text) => {
    const ab = document.createElement('div'); ab.className = 'zgr-abschnitt';
    feld.appendChild(ab);
    zgrTitel(ab, titel).classList.add('gross');
    if (text) ab.insertAdjacentHTML('beforeend', `<div class="zgr-text">${text}</div>`);
    return ab;
  };

  // NEU (FASSUNG 19): Zug 1 - die Wahl, ohne E und sigma
  if (zug === 1){
    const liste = document.createElement('div'); liste.className = 'zgr-bliste fest zgr-wahlliste';
    feld.appendChild(liste);
    const waehlen = id => { st.meine = id; sichern(); zgrFertig(st, 1, zgrFertig1(st)); leeren(); zgrNeuAmOrt(etappe3); };
    B3.forEach((h, j) => {
      const k = zgrBudenKarte(h, j, false), an = st.meine === h.id;
      k.classList.toggle('gewaehlt', an);
      const z = document.createElement('div'); z.className = 'zgr-zeile'; z.style.marginTop = '5px';
      z.innerHTML = `<button class="knopf${an ? '' : ' leer'} klein" aria-pressed="${an}">${an ? '✓ ' + W.gewaehlt : W.meine}</button>`;
      z.querySelector('button').onclick = () => waehlen(h.id);
      k.appendChild(z); liste.appendChild(k);
    });
    const ab = document.createElement('div'); ab.className = 'zgr-abschnitt zgr-wahlsatz'; feld.appendChild(ab);
    if (st.meine) ab.insertAdjacentHTML('beforeend', `<div class="zgr-text">${W.gewaehlt}: <b>${zgrHist(st.meine).name}</b></div>`);
    ab.appendChild(zgrSchreibfeld(W.krit, st.t.krit, false, v => { st.t.krit = v; sichern();
      const f = zgrFertig1(st); if (f !== !!st.fertig[1]) zgrFertig(st, 1, f); }));
    ab.appendChild(zgrSchreibfeld(W.nie, st.t.nie, false, v => { st.t.nie = v; sichern(); }));
    pruefen = () => {
      if (!st.meine) return befund(W.erst);
      if (!String(st.t.krit || '').trim()) return befund(W.satz);
      zgrFertig(st, 1, true); befund(`<b>${W.ok}</b>`);
    };
  }

  // GEAENDERT (FASSUNG 19): Zug 2 ist der Zug 1 aus Fassung 18 (Korbwurf und
  // Torwand mit beiden Waagen, die uebrigen fuenf schaetzen), dazu das
  // Fenster «Alle Buden auf einen Blick».
  if (zug === 2){
    const BSP = D.e3.beispiele, unten = B3.filter(h => !BSP.includes(h.id));
    const a1 = abschnitt(L.beispieleTitel, L.beispieleText);
    const gross = document.createElement('div'); gross.className = 'zgr-vier zgr-beispiele';
    a1.appendChild(gross);
    BSP.forEach(id => {
      const h = zgrHist(id), karte = document.createElement('div'); karte.className = 'karte';
      karte.innerHTML = `<div class="kopf"><span class="zgr-nrkreis">${B3.indexOf(h) + 1}</span> ${h.name} <span class="zgr-zart">· Gewinn G in Fr.</span></div>${zgrPlanHtml(h.plan)}`;
      gross.appendChild(karte);
      zgrWaagenBlock(karte, h, st, true);
      const det = document.createElement('details'); det.className = 'zgr-xkarte';
      det.innerHTML = `<summary>${D.e3.spiele.titel}</summary><div class="zgr-zart" style="margin:2px 0">${D.e3.spiele.text}</div>`;
      if (st.sp[id]) det.open = true;
      karte.appendChild(det);
      zgrSpieleKarte(det, h, st);
    });
    if (BSP.every(id => st.sp[id])) a1.insertAdjacentHTML('beforeend', `<div class="zgr-decksatz" style="margin:4px 10px">${D.e3.spiele.satz}</div>`);
    const a2 = abschnitt(L.schaetzTitel, L.schaetzText);
    const raster = document.createElement('div'); raster.className = 'zgr-fuenf';
    a2.appendChild(raster);
    const noch = document.createElement('div'); noch.className = 'zgr-zart zgr-noch';
    const WU = D.e3.waagenUnten;
    // Sind alle sieben geschaetzt, oeffnet sich das Fenster einmal von selbst
    const vonSelbst = () => {
      if (!zgrGeschaetzt(st) || st.ubAuto) return;
      st.ubAuto = true; sichern();
      setTimeout(() => {
        if (stand.etappe === 2 && stand.e3zug === 2 && !document.querySelector('.zgr-wfenster')) zgrUeberblick(st);
      }, 700);
    };
    const zaehle = () => {
      const n = unten.filter(h => !st.s[h.id].ge).length;
      noch.textContent = n ? L.noch.replace('{n}', n) : L.alle;
      vonSelbst();
    };
    unten.forEach(h => {
      const karte = document.createElement('div'); karte.className = 'karte';
      const gezeigt = !zgrSammlung()[h.quelle] ? ` <span class="zgr-gezeigt" title="${D.e3.gezeigtTitel}">${D.e3.gezeigt}</span>` : '';
      karte.innerHTML = `<div class="kopf"><span class="zgr-nrkreis">${B3.indexOf(h) + 1}</span> ${h.name}${gezeigt}</div>${zgrPlanHtml(h.plan)}`;
      raster.appendChild(karte);
      zgrSchaetzer(karte, h, st.s[h.id], !!st.auf, () => { leeren(); zaehle(); });
      if (WU === 'immer') zgrWaagenBlock(karte, h, st, false);
      if (WU === 'schalter' && !st.auf){
        const z = document.createElement('div'); z.className = 'zgr-zeile'; z.style.padding = '2px 0';
        z.innerHTML = `<button class="knopf leer klein">${L.pruefenKnopf}</button>`;
        z.querySelector('button').onclick = () => zgrWaagenFenster(h, st);
        karte.appendChild(z);
      }
    });
    a2.insertAdjacentHTML('beforeend', `<div class="zgr-zart" style="margin:0 10px">${L.tastatur}</div>`);
    a2.appendChild(noch);
    // Der Weg zum Fenster bleibt unter den Karten sichtbar
    const zb = document.createElement('div'); zb.className = 'zgr-zeile'; zb.style.margin = '6px 10px 14px';
    zb.innerHTML = `<button class="knopf">${U.knopf} →</button>`;
    zb.querySelector('button').onclick = () => zgrGeschaetzt(st) ? zgrUeberblick(st) : befund(U.erst);
    a2.appendChild(zb);
    document.getElementById('zgrblick').onclick = () => zgrGeschaetzt(st) ? zgrUeberblick(st) : befund(U.erst);
    zaehle();
    pruefen = () => {
      if (!BSP.every(id => st.wg[id].ok && st.sw[id].ok)) return befund(L.pruefenBeispiele);
      const rest = unten.filter(h => !st.s[h.id].ge).length;
      if (rest) return befund(L.pruefenNoch.replace('{n}', rest));
      if (zgrFertig2(st)) return befund(`<b>${U.fertig}</b>`);
      const offen = U.fragen.filter((f, j) => !String(st.t['ub' + j] || '').trim()).length;
      befund(!st.auf || !zgrGerechnet(st) ? L.pruefenAlle : U.nochFragen.replace('{n}', offen));
      zgrUeberblick(st);
    };
  }

  // NEU (FASSUNG 19): Zug 3 «Bauen Sie eine Bude», darunter freiwillig die
  // neun Auftraege des Baukastens (Fassung 13).
  if (zug === 3){
    const BU = D.e3.bude, sb = st.bude;
    const liste = document.createElement('div'); liste.className = 'zgr-auftraege';
    BU.auftraege.forEach((af, j) => {
      const n = j + 1, ok = sb.ok[n];
      const b = document.createElement('button');
      b.className = 'zgr-auftrag' + (sb.a === n ? ' an' : '') + (ok === true ? ' ok' : ok === false ? ' falsch' : '');
      b.setAttribute('aria-pressed', sb.a === n);
      b.innerHTML = `<span class="nr">${n}</span><span>${af.text}${ok === true ? ' <span class="ok">✓</span>' : ''}</span>`;
      b.onclick = () => { sb.a = n; sichern(); etappe3(); };
      liste.appendChild(b);
    });
    tisch.appendChild(liste);
    const det = document.createElement('details'); det.className = 'zgr-xkarte zgr-weitere';
    det.open = sb.a === 0;
    det.innerHTML = `<summary>${BU.weitere}</summary><div class="zgr-zart" style="margin:2px 0 4px">${BU.weitereText}</div>`;
    const l2 = document.createElement('div'); l2.className = 'zgr-auftraege'; l2.style.margin = '4px 0';
    D.e3.bau.auftraege.forEach((af, j) => {
      const n = j + 1, ok = st.bau.ok[n], an = sb.a === 0 && st.bau.a === n;
      const b = document.createElement('button');
      b.className = 'zgr-auftrag' + (an ? ' an' : '') + (ok === true ? ' ok' : ok === false ? ' falsch' : '');
      b.setAttribute('aria-pressed', an);
      b.innerHTML = `<span class="nr">${n}</span><span>${af.text}${ok === true ? ' <span class="ok">✓</span>' : ''}</span>`;
      b.onclick = () => { sb.a = 0; st.bau.a = n; sichern(); etappe3(); };
      l2.appendChild(b);
    });
    det.appendChild(l2);
    tisch.appendChild(det);
    if (sb.a === 0){
      const B = D.e3.bau, af = B.auftraege[st.bau.a - 1];
      tisch.insertAdjacentHTML('beforeend', `<div class="zgr-unterzeile">Zum Vergleich: die Garderobe hat E = ${zgrRund(B.garderobeE).t} und σ = ${zgrRund(B.garderobeS).t}.</div>`);
      feld.insertAdjacentHTML('beforeend', `<div class="zgr-text">${BU.weitere.replace(/ \(.*\)/, '')} · ${st.bau.a} · ${af.text}</div>`);
      if (af.art === 'schieben') feld.insertAdjacentHTML('beforeend', `<div class="zgr-text zgr-zart">${B.startText}</div>`);
      if (af.plaetze){
        const pl = document.createElement('div'); pl.className = 'zgr-zeile zgr-plaetze';
        pl.innerHTML = af.plaetze.map(p => `<button class="knopf${st.bau.platz === p ? '' : ' leer'}" data-p="${p}" aria-pressed="${st.bau.platz === p}">Platz ${p}</button>`).join('')
          + (() => { const m = zgrMomente(zgrBauVert(st.bau.platz === 'A' ? st.bau.hB : st.bau.h[9]));
            return m ? `<span class="zgr-zart">Platz ${st.bau.platz === 'A' ? 'B' : 'A'}: E ${zgrGleichRund(m.E)}, σ ${zgrGleichRund(m.sigma)}</span>` : ''; })();
        feld.appendChild(pl);
        pl.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { st.bau.platz = b.dataset.p; sichern(); etappe3(); });
      }
      zgrBaukasten(feld, st, () => { delete st.bau.ok[st.bau.a]; leeren(); });
      if (af.feld) feld.appendChild(zgrSchreibfeld(af.feld, st.t['bau' + st.bau.a], false, v => { st.t['bau' + st.bau.a] = v; sichern(); }));
      const unten = document.createElement('div'); unten.className = 'zgr-schaetzunten';
      unten.innerHTML = '<button class="knopf leer" id="leeren">Alle Balken auf 0</button>'
        + '<span class="zgr-zart">Tastatur: ← → wählt einen Balken, ↑ ↓ ändert seine Höhe.</span>';
      feld.appendChild(unten);
      document.getElementById('leeren').onclick = () => {
        const leer = af.art === 'schieben' ? B.start.slice() : [0, 0, 0, 0, 0, 0, 0];
        if (st.bau.a === 9 && st.bau.platz === 'B') st.bau.hB = leer; else st.bau.h[st.bau.a] = leer;
        delete st.bau.ok[st.bau.a]; sichern(); etappe3();
      };
      if (af.art === 'schieben') document.getElementById('leeren').textContent = 'Zurück zum Anfang';
      pruefen = () => {
        const u = zgrBauUrteil(af.art, st.bau.h[st.bau.a], st.bau.hB);
        st.bau.ok[st.bau.a] = u.ok; sichern();
        const fertig = ZGR_BAU_N.filter(n => st.bau.ok[n] === true).length;
        const b = l2.children[st.bau.a - 1];
        b.classList.remove('ok', 'falsch'); b.classList.add(u.ok ? 'ok' : 'falsch');
        befund(`${u.satz}${u.ok ? ` <b>${fertig} von ${ZGR_BAU_N.length} weiteren Aufträgen erfüllt.</b>` : ''}`);
      };
    } else {
      const n = sb.a, af = BU.auftraege[n - 1], b = sb.b[n];
      feld.insertAdjacentHTML('beforeend', `<div class="zgr-text">${n} · ${af.text}</div>`);
      if (af.start) feld.insertAdjacentHTML('beforeend', `<div class="zgr-text zgr-zart">${af.start}</div>`);
      zgrBude(feld, b, () => { sichern(); leeren(); }, n === 7);
      if (af.feld){
        feld.appendChild(zgrSchreibfeld(af.feld, st.t['bude' + n], false, v => { st.t['bude' + n] = v; sichern(); }));
        const z = document.createElement('div'); z.className = 'zgr-zeile'; z.style.margin = '0 10px';
        z.innerHTML = `<button class="knopf leer">${BU.sicht}</button>`;
        feld.appendChild(z);
        const sicht = document.createElement('div'); sicht.className = 'zgr-sicht'; sicht.style.display = 'none';
        sicht.innerHTML = `<b>${BU.sicht}</b><div>${af.sicht}</div>`;
        feld.appendChild(sicht);
        z.querySelector('button').onclick = () => { sicht.style.display = sicht.style.display ? '' : 'none'; };
      }
      const unten = document.createElement('div'); unten.className = 'zgr-schaetzunten';
      unten.innerHTML = `<button class="knopf leer" id="leeren">${BU.zurueck}</button>`
        + (n === 7 ? '' : `<span class="zgr-zart">${BU.tastatur}</span>`);
      feld.appendChild(unten);
      document.getElementById('leeren').onclick = () => { sb.b[n] = zgrBudeStart(n); sichern(); etappe3(); };
      pruefen = () => {
        const u = zgrBudeUrteil(af.art, b, st.t['bude' + n]);
        sb.ok[n] = u.ok || sb.ok[n] === true; sichern();
        const fertig = ZGR_BUDE_N.filter(k => sb.ok[k] === true).length;
        const el = liste.children[n - 1];
        el.classList.remove('ok', 'falsch'); el.classList.add(sb.ok[n] ? 'ok' : 'falsch');
        if (u.ok && !el.querySelector('.ok')) el.lastElementChild.insertAdjacentHTML('beforeend', ' <span class="ok">✓</span>');
        zgrFertig(st, 3, zgrFertig3(st));
        befund(`${u.satz}${u.ok ? ` <b>${BU.erfuellt.replace('{n}', fertig).replace('{m}', ZGR_BUDE_N.length)}</b>` : ''}`);
      };
    }
  }

  const pk = document.getElementById('pruefen');
  if (pk) pk.onclick = pruefen;
  const zz = document.getElementById('zurueckzug');
  if (zz) zz.onclick = () => { stand.e3zug = zug - 1; sichern(); etappe3(); };
  document.getElementById('weiter').onclick = () => {
    if (zug < 3){ stand.e3zug = zug + 1; sichern(); etappe3(); }
    else { stand.etappe = 3; los(); }
  };
  loesungsHinweis(zgrLoesungE3(zug));
}

/* Die Achsen der Landkarte, E von emin bis emax (Gewinne koennen negativ
   sein), sigma von 0 bis smax. Flaeche und Bild zum Mitnehmen. */
function zgrEbeneAchsen(w, h, R, inhalt, E0, nachX){
  const E = E0 || D.e3.ebene, F = 'font-family="Fira Sans,sans-serif"', t = [];
  const iw = w - R.L - R.R, ih = h - R.O - R.U, breit = E.emax - E.emin;
  // nachX: true fuer «(X)», ein Buchstabe fuer «(G)» (Fassung 14)
  const zu = nachX === true ? '(X)' : nachX ? `(${nachX})` : '';
  if (inhalt) t.push(`<rect width="${w}" height="${h}" fill="#fffefb"/>`);
  for (let e = E.emin; e <= E.emax; e++){
    const x = R.L + (e - E.emin) / breit * iw;
    t.push(`<line x1="${x}" x2="${x}" y1="${R.O}" y2="${R.O + ih}" stroke="${e === 0 ? '#c9bda8' : '#eee4d3'}"/>`,
      `<text x="${x}" y="${R.O + ih + 15}" ${F} font-size="11" text-anchor="middle" fill="#6c6357">${String(e).replace('-', '−')}</text>`);
  }
  for (let s = 0; s <= E.smax + 1e-9; s += E.sschritt){
    const y = R.O + (1 - s / E.smax) * ih;
    t.push(`<line x1="${R.L}" x2="${R.L + iw}" y1="${y}" y2="${y}" stroke="#eee4d3"/>`,
      `<text x="${R.L - 6}" y="${y + 4}" ${F} font-size="11" text-anchor="end" fill="#6c6357">${+s.toFixed(2)}</text>`);
  }
  t.push(`<line x1="${R.L}" x2="${R.L + iw}" y1="${R.O + ih}" y2="${R.O + ih}" stroke="#8a8279" stroke-width="1.5"/>`,
    `<line x1="${R.L}" x2="${R.L}" y1="${R.O}" y2="${R.O + ih}" stroke="#8a8279" stroke-width="1.5"/>`,
    `<text x="${R.L + iw}" y="${h - 4}" ${F} font-size="12" text-anchor="end" fill="#2d2924">Erwartungswert E${zu} →</text>`,
    `<text transform="translate(13 ${R.O}) rotate(-90)" ${F} font-size="12" text-anchor="end" fill="#2d2924">Streuung σ${zu} →</text>`);
  if (inhalt) t.push(inhalt);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${t.join('')}</svg>`;
}

/* ───────── Zusatz: die Sammlung auf einer Landkarte fuer X (FASSUNG 11) ─────────
   Ergaenzung zu Fassung 11: Neben den vier Buden (Gewinn G) lassen sich
   freiwillig beliebige Kaertchen aus der Sammlung nach E(X) und sigma(X)
   eintragen. Gezogen wird wie auf der Landkarte der Buden; geprueft wird
   nicht, «Wahre Lage zeigen» setzt je ein Kreuz an (E, sigma) aus dem
   Generator. Stand: st.kx[id] = {E, S}, st.kxZeig. */
function zgrXKarte(ziel, st){
  const X = D.e3.xkarte, gesammelt = zgrSammlung();
  const liste = D.sammlung.liste.filter(o => gesammelt[o.id]);
  const det = document.createElement('details'); det.className = 'zgr-xkarte';
  if (Object.keys(st.kx).length) det.open = true;
  det.innerHTML = `<summary>${X.titel}</summary><div class="zgr-zart" style="margin:4px 0">${X.text}</div>`;
  ziel.appendChild(det);
  if (!liste.length){ det.insertAdjacentHTML('beforeend', `<div class="zgr-zart">${X.leer}</div>`); return; }
  const stapel = document.createElement('div'); stapel.className = 'zgr-stapel'; stapel.style.margin = '4px 0';
  const ebene = document.createElement('div'); ebene.className = 'zgr-ebene'; ebene.style.margin = '4px 0';
  const bild = document.createElement('div'); bild.className = 'zgr-ebenebild'; ebene.appendChild(bild);
  const z = document.createElement('div'); z.className = 'zgr-zeile'; z.style.margin = '4px 0';
  z.innerHTML = `<button class="knopf leer">${st.kxZeig ? X.verbergen : X.zeigen}</button>`;
  det.append(stapel, ebene, z);
  const RAND = {L: 44, R: 14, O: 14, U: 36}, breit = X.emax - X.emin;
  const masse = () => { const w = ebene.clientWidth || 500, h = Math.max(200, Math.min(w * 0.6, 360));
    return {w, h, iw: w - RAND.L - RAND.R, ih: h - RAND.O - RAND.U}; };
  const zuPx = (m, p) => ({x: RAND.L + (p.E - X.emin) / breit * m.iw, y: RAND.O + (1 - p.S / X.smax) * m.ih});
  const ausPx = (m, x, y) => ({E: Math.max(X.emin, Math.min(X.emax, X.emin + (x - RAND.L) / m.iw * breit)),
                               S: Math.max(0, Math.min(X.smax, (1 - (y - RAND.O) / m.ih) * X.smax))});
  const els = {};
  liste.forEach(o => {
    const k = document.createElement('div');
    k.className = 'zgr-hk'; k.tabIndex = 0; k.dataset.id = o.id;
    k.setAttribute('aria-label', `${o.name}. Ziehen oder mit den Pfeiltasten auf die Landkarte für X legen.`);
    k.innerHTML = zgrMiniSvg(o) + `<div class="name">${o.name}</div>`;
    els[o.id] = k;
  });
  const zeichnen = () => {
    if (!det.open) return;
    const m = masse();
    ebene.style.height = m.h + 'px';
    const kreuze = !st.kxZeig ? '' : liste.map(o => {
      const q = zuPx(m, {E: o.E, S: o.sigma});
      return `<g stroke="#C0392B" stroke-width="2"><line x1="${q.x - 5}" y1="${q.y - 5}" x2="${q.x + 5}" y2="${q.y + 5}"/>`
        + `<line x1="${q.x - 5}" y1="${q.y + 5}" x2="${q.x + 5}" y2="${q.y - 5}"/></g>`
        + `<text x="${q.x + 7}" y="${q.y - 6}" font-family="Fira Sans,sans-serif" font-size="10.5" fill="#C0392B">${o.name}</text>`;
    }).join('');
    bild.innerHTML = zgrEbeneAchsen(m.w, m.h, RAND, kreuze, X, true);
    liste.forEach(o => {
      const k = els[o.id], p = st.kx[o.id];
      k.style.left = k.style.top = '';
      if (p){
        k.classList.add('auf'); ebene.appendChild(k);
        const q = zuPx(m, p);
        k.style.left = (q.x - k.offsetWidth / 2) + 'px'; k.style.top = (q.y - k.offsetHeight / 2) + 'px';
      } else { k.classList.remove('auf'); stapel.appendChild(k); }
    });
  };
  det.addEventListener('toggle', zeichnen);
  z.querySelector('button').onclick = () => { st.kxZeig = !st.kxZeig; sichern();
    z.querySelector('button').textContent = st.kxZeig ? X.verbergen : X.zeigen; zeichnen(); };
  Object.values(els).forEach(k => {
    const id = k.dataset.id;
    k.addEventListener('pointerdown', ev => {
      ev.preventDefault(); k.focus({preventScroll: true});
      const r = k.getBoundingClientRect(), dx = ev.clientX - r.left, dy = ev.clientY - r.top;
      k.classList.add('zieht'); k.style.position = 'fixed'; k.style.width = r.width + 'px';
      document.body.appendChild(k);
      const fol = e2 => { k.style.left = (e2.clientX - dx) + 'px'; k.style.top = (e2.clientY - dy) + 'px'; };
      fol(ev);
      const los = e2 => {
        window.removeEventListener('pointermove', fol); window.removeEventListener('pointerup', los);
        window.removeEventListener('pointercancel', los);
        k.classList.remove('zieht'); k.style.position = ''; k.style.width = '';
        const er = ebene.getBoundingClientRect();
        const cx = e2.clientX - dx + r.width / 2, cy = e2.clientY - dy + r.height / 2;
        if (e2.type !== 'pointercancel' && cx >= er.left && cx <= er.right && cy >= er.top && cy <= er.bottom)
          st.kx[id] = ausPx(masse(), cx - er.left, cy - er.top);
        else if (e2.type !== 'pointercancel') delete st.kx[id];
        zeichnen(); sichern();
      };
      window.addEventListener('pointermove', fol); window.addEventListener('pointerup', los);
      window.addEventListener('pointercancel', los);
    });
    k.addEventListener('keydown', ev => {
      const t = ev.key, f = ev.shiftKey ? 5 : 1;
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Backspace'].includes(t)) return;
      ev.preventDefault();
      if (t === 'Delete' || t === 'Backspace') delete st.kx[id];
      else {
        const p = st.kx[id] = st.kx[id] || {E: (X.emin + X.emax) / 2, S: X.smax / 2};
        if (t === 'ArrowLeft') p.E = Math.max(X.emin, p.E - 0.1 * f);
        if (t === 'ArrowRight') p.E = Math.min(X.emax, p.E + 0.1 * f);
        if (t === 'ArrowUp') p.S = Math.min(X.smax, p.S + 0.05 * f);
        if (t === 'ArrowDown') p.S = Math.max(0, p.S - 0.05 * f);
      }
      zeichnen(); sichern(); k.focus({preventScroll: true});
    });
  });
  zeichnen();
}

function zgrLoesungE3(zug){
  const B = D.e3.bau, B3 = zgrBuden3();
  const tabelle = '<table class="zgr-tabelle"><tr><th></th><th>Einsatz · Plan</th><th>E(G)</th><th>Var(G)</th><th>σ(G)</th></tr>'
    + B3.map((h, j) =>
      `<tr><td>${j + 1} ${h.name}</td><td>${h.plan.einsatzText} · ${h.plan.zeilen.map(([k, a]) => `${k}→${a}`).join(', ')}</td>`
      + `<td>${zgrBruchText(h.Eb)}${h.Eb[1] > 1 ? ' ≈ ' + zgrRund(h.E).t : ''}</td>`
      + `<td>${zgrBruchText(h.Var)}</td><td>${h.sigma.toFixed(3)}</td></tr>`).join('') + '</table>';
  const paare = '<div class="zeile"><b>Gleiches E(G):</b> Korbwurf und Torwand (−0.57), Glückstopf und Entenfischen (0, fair), '
    + 'Riesenrad-Spiel und Dosenwerfen (−1). Je eine Bude streut stark, die andere wenig. <b>Zielkonflikt:</b> Autoscooter, '
    + 'bestes E(G) der Verlust-Buden (−1/6), aber σ(G) ≈ 4.</div>';
  // GEAENDERT (Fassung 19): Zug 1 waehlen, Zug 2 = Zug 1 aus Fassung 18
  // mit dem Fenster, Zug 3 «Bauen Sie eine Bude»
  if (zug === 1) return `<h4>Etappe 3 · ${D.e3.zuege[0]}</h4>` + tabelle + paare
    + `<div class="zeile">Die sieben Buden mit Histogramm des Gewinns und Gewinnplan, ohne E und σ. «${D.e3.wahl.meine}» hält eine Bude fest; `
    + `Pflicht ist ein Satz zu «${D.e3.wahl.krit}», freiwillig «auf keinen Fall». Nicht geprüft: Jede Wahl ist zulässig. `
    + 'Der Satz erscheint in Zug 2 im Fenster bei der Frage nach dem Kriterium.</div>';
  if (zug === 2) return `<h4>Etappe 3 · ${D.e3.zuege[1]}</h4>` + tabelle + paare
    + `<div class="zeile"><b>Oben:</b> Korbwurf und Torwand je mit E-Waage (Neigung ${D.e3.waage.gradJe}° je Fr. Moment E − Dreieck, höchstens `
    + `${D.e3.waage.gradMax}°, Einrasten ±${D.e3.waage.raste}) und danach Streuungs-Waage: links Σ (x − E)² · P = σ² als gestapelte Quadrate mit Seite |x − E| · √P, `
    + `rechts das Bandquadrat s². Neigung ${D.e3.swaage.gradMax}° · (s² − σ²)/σ², höchstens ${D.e3.swaage.gradMax}°, Einrasten ±${D.e3.swaage.raste}. Beide zuerst festgehalten (= Schätzung `
    + `für die Landkarte), dann «${D.e3.legen.loslassen}». Sätze: «${D.e3.legen.waageSatz}» «${D.e3.legen.sSatz}» 20-mal spielen als Zusatz.</div>`
    + `<div class="zeile"><b>Quadrate zusammenlegen</b> (nach dem Loslassen der σ-Waage): Die Abstandsquadrate fliessen zu einem Quadrat der Fläche σ²; `
    + `seine Seite σ liegt unter dem Histogramm ab E nach links und rechts, darunter das Band der Studierenden. «${D.e3.legen.zSatz}»</div>`
    + `<div class="zeile"><b>Unten:</b> die übrigen fünf schmal nebeneinander, Dreieck und Band, nicht geprüft; je Karte «${D.e3.legen.pruefenKnopf}» `
    + `(Fenster mit beiden Waagen; die Schätzung der Karte wird übernommen, beim Schliessen gilt der Stand im Fenster; Einstellung «${D.e3.waagenUnten}»). `
    + '</div>'
    + `<div class="zeile"><b>«${D.e3.ueberblick.titel}»</b> öffnet sich einmal von selbst, sobald beide Beispiele beide Waagen waagrecht haben und alle fünf geschätzt sind `
    + '(danach über den Knopf). Landkarte mit den Schätzungen grau und Namen, Legende, Ring um die Wahl aus Zug 1, Tabelle Bude · E · σ. «Aufdecken» zeigt die wahren Lagen blau mit Linien; '
    + 'die Schätzungen sind danach fest. Pflicht ein Rechenschema nach Wahl: g = Auszahlung − Einsatz je Wert von X; Spalte g · P summiert ergibt E(G), '
    + `(g − E)² · P summiert ergibt Var(G). Toleranz ±${ZGR_TOL.kp} (g, E, g · P) bzw. ±${ZGR_TOL.V} (übrige Felder). `
    + 'Die vier Fragen werden nicht geprüft. Zug 2 ist fertig, wenn das Rechenschema stimmt und alle vier beantwortet sind.</div>'
    + '<div class="zeile"><b>Sicht:</b> ' + D.e3.sicht.join(' ') + '</div>';
  if (zug === 3){
    const bspH = hs => hs.map((v, i) => v ? `P(X = ${i}) = ${+(v / hs.reduce((a, b) => a + b, 0)).toFixed(3)}` : '').filter(Boolean).join(', ');
    const bsp = n => bspH(B.beispiele[n]);
    const BU = D.e3.bude;
    const bude = BU.auftraege.map((af, j) => {
      const n = j + 1, x = BU.beispiele[n];
      if (!x) return `<div class="zeile">${n} ${af.text.replace(/<[^>]+>/g, '')} Unmöglich: ${af.sicht}</div>`;
      const o = zgrBudeHist(x);
      const felder = x.h.map((v, i) => v ? `P = ${zgrP2(v / x.h.reduce((s, w) => s + w, 0))} → ${zgrFrText(x.aus[i])} Fr.` : '').filter(Boolean).join(', ');
      return `<div class="zeile">${n} ${af.text.replace(/<[^>]+>/g, '')} Z. B. Einsatz ${zgrFrText(x.einsatz)} Fr., ${felder}: `
        + `E(G) ${zgrGleichRund(o.E)}, σ(G) ${zgrGleichRund(o.sigma)}, P(G > 0) = ${zgrP2(o.plus)}.</div>`;
    }).join('');
    return `<h4>Etappe 3 · ${D.e3.zuege[2]}</h4>`
      + `<div class="zeile">Schwellen: E gilt als getroffen bis ±${BU.tol}. 1: E(G) = ${String(BU.verdientE).replace('-', '−')}. 2: E(G) = 0, 0 &lt; σ &lt; ${BU.klein}. `
      + `3: E(G) = 0, σ &gt; ${BU.lotterie}. 4: E(G) = ${zgrRund(BU.korbE).t} wie der Korbwurf, 0 &lt; σ ≤ ${BU.korbFaktor} · ${zgrRund(BU.korbS).t}. `
      + `5: P(G &gt; 0) ≥ ${BU.oft} und E(G) &lt; 0. 6: erfüllt mit einer Antwort im Schreibfeld. 7: E(G) = 0 mit der vorgegebenen Bude, `
      + 'fairer Einsatz = mittlere Auszahlung. In 1 bis 5 und 7 muss σ &gt; 0 sein (sonst ist es kein Spiel). Ein erfüllter Auftrag bleibt erfüllt.</div>'
      + bude
      + '<h4>Weitere Aufträge (freiwillig)</h4>'
      + `<div class="zeile">1 (σ ≤ ${B.klein}): ${bsp(1)}, σ = 0.</div>`
      + `<div class="zeile">2 (σ ≥ ${B.gross}): ${bsp(2)}, σ = 3, mehr geht auf 0 … 6 nicht.</div>`
      + `<div class="zeile">3 (E = 1, σ > 1): z. B. ${bsp(3)}, σ = √5 ≈ 2.24.</div>`
      + `<div class="zeile">4: z. B. ${bsp(4)}, E = 1.5.</div>`
      + `<div class="zeile">5 (σ = 0): ein einziger Balken, z. B. ${bsp(5)}.</div>`
      + `<div class="zeile">6 (um 2 nach rechts): Start ${bspH(B.start)}; Lösung ${bsp(6)}. E wird um 2 grösser, σ bleibt (Toleranz ±${B.tolS}).</div>`
      + `<div class="zeile">7 (E nicht beim höchsten Balken, Abstand ≥ ${B.hoch}): z. B. ${bsp(7)}, E = 2.</div>`
      + `<div class="zeile">8 (symmetrisch, mindestens zwei Balken): z. B. ${bsp(8)}, E = 3 in der Mitte.</div>`
      + `<div class="zeile">9 (gleiches σ, E mindestens ${B.zweiE} auseinander): A ${bspH(B.beispiele[9].A)}, B ${bspH(B.beispiele[9].B)}.</div>`
      + `<div class="zeile">Toleranz für E: ±${B.tolE}.</div>`;
  }
  return '';
}

/* ───────── Die Bilder zum Mitnehmen ─────────
   Die gemeinsame Flaeche sammelt ein Bild je Etappe nur, wenn Karten
   (.k) auf der Buehne liegen - seit Fassung 7 nirgends mehr. Dieses
   Kapitel zeichnet alle drei Bilder selbst aus dem Stand und legt sie in
   `mitbringsel` (flaeche.js), wie Kapitel 5.

   Sauber, ohne Protokolle (FASSUNG 9):
     1  Beide Baeume mit Ihren Eintraegen, je Ihre Verteilung, Ihr
        Histogramm, der Zusammenhang (Antwort und Zuordnung), die Wette.
     2  Je Bude Ihre Antworten (wovon die Aeste abhaengen, welcher Weg,
        Ihr Satz), was Sie selbst aufgestellt haben, Ihre Verteilung.
     3  Etappe 3 (Fassung 14): die Sammlung, die Landkarte mit Ihren
        Schaetzungen und den wahren Lagen, Ihr Rechenschema, die vier
        Antworten, die eigenen Histogramme des Baukastens. */
const ZM = {papier: '#f8f4ec', tinte: '#2d2924', matt: '#6c6357', linie: '#c9bda8',
            akzent: '#0065A9', gruen: '#2E7D32', rot: '#C0392B', karte: '#fffefb'};
const ZM_SCHRIFT = "'Fira Sans', 'Segoe UI', sans-serif";

function zmText(g, s, x, y, gross, farbe, fett, anker){
  g.font = `${fett ? '600 ' : ''}${gross}px ${ZM_SCHRIFT}`;
  g.fillStyle = farbe || ZM.tinte; g.textAlign = anker || 'left'; g.textBaseline = 'middle';
  g.fillText(s, x, y);
  return g.measureText(s).width;
}
function zmUmbrechen(g, text, breit, gross){
  g.font = `${gross}px ${ZM_SCHRIFT}`;
  const zeilen = [];
  String(text || '').split(/\n/).forEach(ab => {
    let z = '';
    ab.split(/\s+/).forEach(w => {
      const p = z ? z + ' ' + w : w;
      if (g.measureText(p).width > breit && z){ zeilen.push(z); z = w; } else z = p;
    });
    zeilen.push(z);
  });
  return zeilen;
}

/* Ein Baum im Bild: G = {kinder:[{text, p, x, grau, kinder}]}.
   Ohne `g` wird nur gemessen. Gibt {w, h} zurueck.
   G.ohneTabelle: keine Tabelle darunter; G.ohneX: kein X am Pfadende
   (es zaehlt trotzdem fuer die Tabelle). */
function zmBaum(g, G, x0, y0){
  const COL = 175, H = 38, info = [];
  let y = y0 + 8, maxT = 0;
  const lege = (n, eltern, tiefe) => {
    const e = {n, eltern, tiefe}; info.push(e);
    maxT = Math.max(maxT, tiefe);
    const ks = n.grau ? [] : (n.kinder || []);
    if (!ks.length){ e.y = y + H / 2; y += n.grau ? 32 : H; return e; }
    const kinder = ks.map(k => lege(k, e, tiefe + 1));
    e.y = (kinder[0].y + kinder[kinder.length - 1].y) / 2;
    return e;
  };
  lege({kinder: G.kinder}, null, 0);
  const xk = t => x0 + 8 + t * COL, xEnde = xk(Math.max(maxT, 1)) + 26;
  // Pfade und Tabelle
  const pfade = [];
  info.filter(e => e.tiefe && !e.n.grau && !(e.n.kinder || []).length).forEach(e => {
    const kette = [];
    for (let k = e; k.eltern; k = k.eltern) kette.unshift(k.n);
    pfade.push({e, faktoren: kette.map(k => zgrLies(k.p)), dez: kette.some(k => zgrDezimal(k.p)), x: e.n.x});
  });
  const t = zgrTabelle(pfade);
  let breit = xEnde + (G.ohneX ? 260 : 330) - x0;
  const yT = y + 10;
  const tabZeilen = t.zeilen.map(r => `P(X = ${r.k}) = `
    + (r.teile.length > 1 ? r.teile.map(p => zgrZeigText(p.prod, t.dez)).join(' + ') + ' = ' : '')
    + (r.teile.length ? zgrZeigText(r.summe, t.dez) : '0'));
  tabZeilen.push('Summe = ' + zgrZeigText(t.gesamt, t.dez));
  if (G.ohneTabelle) tabZeilen.length = 0;
  const h = (G.ohneTabelle ? y + 6 : yT + tabZeilen.length * 20 + 6) - y0;
  if (!g) return {w: breit, h};
  g.save();
  g.strokeStyle = '#8a8279'; g.lineWidth = 1.2;
  info.forEach(e => {
    if (!e.eltern) return;
    const px = xk(e.eltern.tiefe) + 4, cx = xk(e.tiefe);
    g.strokeStyle = e.n.grau ? '#d8cdb8' : '#8a8279';
    g.beginPath(); g.moveTo(px, e.eltern.y); g.lineTo(cx - COL + 50, e.y); g.lineTo(cx - 4, e.y); g.stroke();
    zmText(g, String(e.n.text || '').slice(0, 22), cx - COL + 54, e.y - 8, 11.5, e.n.grau ? '#b3a894' : ZM.matt);
    zmText(g, String(e.n.p || '?'), cx - COL + 54, e.y + 8, 12.5, e.n.grau ? '#b3a894' : ZM.tinte, true);
  });
  info.forEach(e => {
    g.fillStyle = e.eltern ? '#8a8279' : ZM.tinte;
    g.beginPath(); g.arc(xk(e.tiefe), e.y, e.eltern ? 3.5 : 4.5, 0, Math.PI * 2); g.fill();
  });
  pfade.forEach(p => {
    g.setLineDash([2, 3]); g.strokeStyle = '#c9bda8';
    g.beginPath(); g.moveTo(xk(p.e.tiefe) + 8, p.e.y); g.lineTo(xEnde - 4, p.e.y); g.stroke(); g.setLineDash([]);
    if (!G.ohneX) zmText(g, `X = ${String(p.x || '').trim() || '?'}`, xEnde, p.e.y, 12.5, ZM.tinte, true);
    zmText(g, p.faktoren.map(w => zgrZeigText(w, p.dez)).join(' · ') + ' = ' + zgrZeigText(p.prod, p.dez),
      xEnde + (G.ohneX ? 4 : 60), p.e.y, 12.5, ZM.tinte);
  });
  tabZeilen.forEach((z, i) => zmText(g, z, x0 + 8, yT + i * 20 + 10, 13, ZM.tinte, i === tabZeilen.length - 1));
  g.restore();
  return {w: breit, h};
}
/* Ein allgemeiner Baum (zgrBaum) fuers Bild, mit den eigenen Eintraegen. */
function zmGen(T, m){
  const kinder = zgrBaumKinder(T);
  const conv = k => ({text: k.lang, p: String(zgrBaumRoh(T, m, k) || ''), x: (m.x || {})[k.id] || '',
                      kinder: (kinder[k.id] || []).map(conv)});
  return {kinder: (kinder[''] || []).map(conv), ohneTabelle: true};
}
/* Die selbst aufgestellte Verteilung als Zeilen: Eingabe und Wert. */
function zmVertZeilen(ks, werte, dez){
  return ks.map(k => {
    const roh = String(werte[k] || '').trim(), r = zgrRechne(roh);
    if (!roh) return `P(X = ${k}) = …`;
    if (!r) return `P(X = ${k}) = ${roh}`;
    const e = zgrErgebnis(r.wert, dez || /[.,%]/.test(roh));
    return `P(X = ${k}) = ${r.einzeln ? '' : r.text + (e.genau ? ' = ' : ' ≈ ')}${e.t}`;
  });
}
const zmGefuellt = werte => Object.values(werte || {}).some(v => String(v).trim());

function zmLeinwand(w, h){
  const c = document.createElement('canvas'), s = 2;
  c.width = Math.ceil(w * s); c.height = Math.ceil(h * s);
  const g = c.getContext('2d'); g.scale(s, s);
  g.fillStyle = ZM.papier; g.fillRect(0, 0, w, h);
  return {c, g};
}

/* Teile untereinander auf eine Leinwand: {titel, w, h, mal(g, x, y)}. */
function zmSeite(kopf, teile){
  if (!teile.length) return null;
  const R = 26, w = Math.max(820, ...teile.map(t => t.w + 2 * R));
  const h = R + 30 + teile.reduce((s, t) => s + t.h + 44, 0) + R;
  const {c, g} = zmLeinwand(w, h);
  zmText(g, kopf, R, R + 10, 22, ZM.akzent, true);
  let y = R + 40;
  const warte = [];
  teile.forEach(t => {
    zmText(g, t.titel, R, y + 10, 16, ZM.matt, true);
    const v = t.mal(g, R, y + 22);
    if (v && typeof v.then === 'function') warte.push(v);
    y += t.h + 44;
  });
  // Bilder (SVG) laden asynchron: dann ein Versprechen, sonst die Leinwand.
  return warte.length ? Promise.all(warte).then(() => c) : c;
}
const zmMeng = () => document.createElement('canvas').getContext('2d');
function zmBaumTeil(teile, titel, G){
  const m = zmBaum(null, G, 0, 0);
  teile.push({titel, w: m.w, h: m.h, mal: (g, x, y) => zmBaum(g, G, x, y)});
}
function zmZeilenTeil(teile, titel, zeilen, gross){
  gross = gross || 14;
  teile.push({titel, w: 780, h: zeilen.length * (gross + 6) + 8,
    mal: (g, x, y) => zeilen.forEach((s, i) => zmText(g, s, x + 8, y + 12 + i * (gross + 6), gross))});
}
function zmTextTeil(teile, titel, text){
  if (!String(text || '').trim()) return;
  zmZeilenTeil(teile, titel, zmUmbrechen(zmMeng(), text, 760, 14));
}

/* Etappe 1 (FASSUNG 10, 11, 12.2): beide Baeume mit den eigenen Eintraegen, je
   die selbst aufgestellte Verteilung, die Vorhersagen beim Zusammenklappen,
   der Zusammenhang und die Wette. */
function zmBildE1(){
  if (!stand.e1) return null;
  const e = zgrE1(), teile = [], ks = D.e1.verteilung.map(([k]) => k);
  ZGR_ARTEN.forEach(a => {
    if (zgrBaumBearbeitet(e.b[a])) zmBaumTeil(teile, D.e1.namen[a], zmGen(D.e1.baeume[a], e.b[a]));
    if (zmGefuellt(e.t[a])) zmZeilenTeil(teile, `Ihre Verteilung · ${D.e1.namen[a]}`, zmVertZeilen(ks, e.t[a]));
  });
  // GEAENDERT (Fassung 13.1): das Zusammenklappen ohne Vorhersage
  const K = D.e1.klapp;
  if (e.klapp.fertig) zmZeilenTeil(teile, K.titel, [1, 2, 3].map(n => K.geklappt.replace('{n}', n)
    .replace('{vorher}', K.vorher[n]).replace('{nachher}', K.soll[n])).concat([K.nullText.replace(/<[^>]+>/g, '')]));
  zmTextTeil(teile, D.e1.zusammen, e.zusammen);
  zmTextTeil(teile, D.e1.wette, e.wette);
  return zmSeite(`Etappe 1 · ${D.etappen[0].name}`, teile);
}

/* Etappe 2 (GEAENDERT, FASSUNG 15): je Situation Ihre Eintraege in den
   markierten Knoten, die Pfadzahlen, beim Korbwurf der Satz zum
   Uebereinanderlegen, die Feststellung; freiwillig «Und im Skript?». */
function zmBildE2(){
  if (!stand.zgr15) return null;
  const st = zgrE2Stand(), teile = [], SCH = D.e2.schritte;
  D.e2.situationen.forEach((s, j) => {
    const c = s.karte, zl = [];
    ['1', '2'].forEach(n => {
      const kn = c.pflicht.baeume[n].map(k => `${k.weg ? `nach «${k.nach}»` : 'am Anfang'}: `
        + k.aeste.map(a => String((st.kn[s.id][n] || {})[a.id] || '').trim() || '…').join(' | '));
      if (kn.some(t => /\d/.test(t))) zl.push(`${D.e2.wege[n][0]}: ${kn.join('   ')}${st.ok[s.id] ? ' ✓' : ''}`);
    });
    if (st.ok[s.id] || zgrE2Fertig(st, s))
      zl.push(`Pfade: ${c.w1} in Weg 1, ${c.w2} in Weg 2${c.null ? ` (davon kommen ${c.null} nie vor)` : ''}`);
    if (s.decken && st.deck[s.id]) zl.push(D.e2.decken.satz);
    if (st.fest[s.id]) zl.push(`${SCH.fest} ${zgrFallName(st.fest[s.id])}${st.fest[s.id] === c.fest ? ' ✓' : ''}`);
    if (!zl.length) return;
    zmZeilenTeil(teile, `${j + 1} · ${s.name}`, zl, 14);
  });
  const T = D.e2.skript, gewaehlt = T.karten.filter(k => st.skript[k.id]);
  if (gewaehlt.length) zmZeilenTeil(teile, T.titel, gewaehlt.map(k => `${k.name}: ${zgrFallName(st.skript[k.id])}${st.skript[k.id] === k.fall ? ' ✓' : ''}`));
  return zmSeite(`Etappe 2 · ${D.etappen[1].name}`, teile);
}

/* Bilder auf die Leinwand: SVG-Text wird als Bild geladen. Gibt ein
   Versprechen zurueck, damit mitnehmen() auf alle warten kann. */
function zmSvg(g, svg, x, y, w, h){
  return new Promise(fertig => {
    const im = new Image();
    im.onload = () => { g.drawImage(im, x, y, w, h); fertig(); };
    im.onerror = fertig;
    im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
}

/* Etappe 3 im Bild (FASSUNG 16): die Landkarte aus Ihren Schaetzungen
   (blaue Marken), nach dem Aufdecken die wahren Lagen mit Linien. */
function zmEbeneSvg(st, w, h){
  const m = {w, h, iw: w - ZGR_RAND.L - ZGR_RAND.R, ih: h - ZGR_RAND.O - ZGR_RAND.U};
  return zgrEbeneAchsen(w, h, ZGR_RAND, zgrKarteInhalt(m, {schaetz: zgrSchaetzKarte(st), marken: true, wahr: !!st.auf}), null, 'G');
}

function zmBildE3(){
  const st = stand.zgr3;
  if (!st) return null;
  zgrE3();
  const L = D.e3.entscheid, t = st.t || {};
  // GEAENDERT (Fassung 14): Landkarte der sieben Buden, vier Fragen
  const sammlung = D.sammlung.liste.filter(o => zgrSammlung()[o.id]);
  const gelegt = zgrBuden3().filter(o => st.s[o.id] && st.s[o.id].ge);
  const gerechnet = zgrBuden3().filter(o => st.r[o.id] && st.r[o.id].ok);
  const gebaut = ZGR_BAU_N.filter(a => st.bau.h[a].some(v => v > 0) && !(a === 6 && st.bau.ok[6] === undefined));
  // GEAENDERT (Fassung 19): die Wahl aus Zug 1, die Fragen im Fenster, die eigenen Buden
  const fragen = D.e3.ueberblick.fragen.map((f, j) => [f, t['ub' + j]]).filter(([, v]) => String(v || '').trim());
  const sb = st.bude, BU = D.e3.bude;
  const buden = ZGR_BUDE_N.filter(n => n !== 6 && (sb.ok[n] === true
    || JSON.stringify(sb.b[n]) !== JSON.stringify(zgrBudeStart(n))) && zgrBudeHist(sb.b[n]));
  const etwas = st.meine || gelegt.length || gebaut.length || buden.length || fragen.length || sammlung.length;
  if (!etwas) return null;
  const meng = document.createElement('canvas').getContext('2d');
  const R = 26, B = 860;
  const zeilen = [];      // {s, gross, farbe, fett, einzug} oder {bilder:[{svg, w, h, x?}], h}
  const zeile = (s, o) => zeilen.push(Object.assign({s, gross: 14}, o || {}));
  const kopf = s => zeile(s, {gross: 17, fett: true, farbe: ZM.akzent});
  const text = (titel, v) => {
    if (!String(v || '').trim()) return;
    zeile(titel, {farbe: ZM.matt, einzug: 14, gross: 13});
    zmUmbrechen(meng, v, B - 70, 14).forEach(s => zeile(s, {einzug: 28}));
  };
  // Fassung 6: zuerst die Sammlung, dann die Ergebnisse des
  // Rechenschemas neben den Schaetzungen, dann die Landkarte.
  if (sammlung.length){
    kopf(D.sammlung.titel);
    for (let i = 0; i < sammlung.length; i += 4){
      zeilen.push({bilder: sammlung.slice(i, i + 4).map(o => {
        const ks = o.vert.map(([k]) => k);
        const hoch = Math.max(...o.vert.map(([, b]) => zgrZahl(b))) > 0.6 ? 1 : 0.6;
        return {svg: zgrHistogramm(o.vert, o.name, Math.min(...ks), Math.max(...ks), undefined, {achse: 'X', ymax: hoch, breite: 182}), w: 182, h: 170};
      }), h: 182});
    }
    zeile('');
  }
  if (st.meine || String(t.krit || '').trim()){
    kopf(D.e3.zuege[0]);
    if (st.meine) zeile(`${D.e3.wahl.gewaehlt}: ${zgrHist(st.meine).name}`, {einzug: 14, fett: true});
    text(D.e3.wahl.krit, t.krit);
    text(D.e3.wahl.nie, t.nie);
    zeile('');
  }
  if (gelegt.length){
    kopf(D.e3.zuege[1]);
    zeile(zgrBuden3().map((o, j) => `${j + 1} ${o.name}`).join('   ·   '), {einzug: 14, gross: 12.5, farbe: ZM.matt});
    zeilen.push({bilder: [{svg: zmEbeneSvg(st, 620, 400), w: 620, h: 400}], h: 412});
    D.e3.beispiele.forEach(id => { const h = zgrHist(id);
      if (st.wg[id].ok) zeile(`${h.name}, Waage für E: waagrecht bei ${zgrRund(h.E).t}.${st.sw[id].ok ? ` Waage für σ: waagrecht bei ${zgrRund(h.sigma).t}.` : ''}`, {einzug: 14, gross: 13}); });
    if (D.e3.beispiele.some(id => st.sw[id].ok)) zeile(D.e3.legen.sSatz, {einzug: 14, gross: 13});
    gelegt.forEach(o => { const z = st.s[o.id];
      zeile(`${o.name}: Ihre Schätzung E ≈ ${zgrRund(z.e).t}, σ ≈ ${zgrRund(z.s).t}${st.auf ? `   ·   gerechnet E ${zgrGleichRund(o.E)}, σ ${zgrGleichRund(o.sigma)}` : ''}`, {einzug: 14, gross: 12.5}); });
    if (st.auf) zeile(D.e3.legen.aufgedeckt, {einzug: 14, gross: 12.5, farbe: ZM.matt});
    gerechnet.forEach(o => zeile(`${o.name} nachgerechnet: E(G) ${zgrGleichRund(o.E)}, Var(G) ${zgrGleichRund(o.sigma * o.sigma)}, σ(G) ${zgrGleichRund(o.sigma)}   ✓`,
      {einzug: 14, farbe: ZM.gruen}));
    zeile('');
  }
  if (fragen.length){
    kopf(D.e3.ueberblick.titel);
    fragen.forEach(([f, v]) => text(f, v));
    zeile('');
  }
  if (buden.length || String(t.bude6 || '').trim()){
    kopf(D.e3.zuege[2]);
    for (let i = 0; i < buden.length; i += 2){
      const paar = buden.slice(i, i + 2).map(n => {
        const b = sb.b[n], o = zgrBudeHist(b), ok = sb.ok[n] === true;
        const titel = `${n}${ok ? ' ✓' : ''} · Einsatz ${zgrFrText(b.einsatz)} Fr. · E(G) ${zgrGleichRund(o.E)}, σ(G) ${zgrGleichRund(o.sigma)}`;
        return {svg: zgrBudeGewinnSvg(o, titel), w: 390, h: 390 * 200 / 440, unter: BU.auftraege[n - 1].text.replace(/<[^>]+>/g, '')};
      });
      zeilen.push({bilder: paar, h: 390 * 200 / 440 + 8});
      zeilen.push({unter: paar.map(b => zmUmbrechen(meng, b.unter, 380, 12.5)), h: 2 * 17 + 10});
    }
    text(BU.auftraege[5].feld, t.bude6);
    zeile('');
  }
  if (gebaut.length){
    kopf(BU.weitere);
    for (let i = 0; i < gebaut.length; i += 2){
      const paar = gebaut.slice(i, i + 2).map(a => {
        const af = D.e3.bau.auftraege[a - 1], ok = st.bau.ok[a] === true;
        const m = zgrMomente(zgrBauVert(st.bau.h[a]));
        const titel = `${a}${ok ? ' ✓' : ''} · E ${zgrGleichRund(m.E)}, σ ${zgrGleichRund(m.sigma)}`;
        return {svg: zgrBauSvg(st.bau.h[a], -1, true, titel), w: 390, h: 390 * ZB.H / ZB.B, unter: af.text.replace(/<[^>]+>/g, '')};
      });
      zeilen.push({bilder: paar, h: 390 * ZB.H / ZB.B + 8});
      zeilen.push({unter: paar.map(b => zmUmbrechen(meng, b.unter, 380, 12.5)), h: 2 * 17 + 10});
    }
  }
  const hoeheVon = z => z.h || (z.s === '' ? 10 : z.gross * 1.55);
  const h = R + 40 + zeilen.reduce((s, z) => s + hoeheVon(z), 0) + R;
  const {c, g} = zmLeinwand(B, h);
  zmText(g, `Etappe 3 · ${D.etappen[2].name}`, R, R + 10, 22, ZM.akzent, true);
  let y = R + 42;
  const warte = [];
  zeilen.forEach(z => {
    if (z.bilder){
      let x = R + 14;
      z.bilder.forEach(b => { warte.push(zmSvg(g, b.svg, x, y + 4, b.w, b.h)); x += b.w + 24; });
    } else if (z.unter){
      z.unter.forEach((zs, i) => zs.slice(0, 2).forEach((s, j) =>
        zmText(g, s, R + 14 + i * 414, y + 8 + j * 17, 12.5, ZM.matt)));
    } else if (z.s) zmText(g, z.s, R + (z.einzug || 0), y + hoeheVon(z) / 2, z.gross, z.farbe, z.fett);
    y += hoeheVon(z);
  });
  return Promise.all(warte).then(() => c);
}

if (typeof mitnehmen === 'function'){
  const _mitnehmenKern = mitnehmen;
  // eslint-disable-next-line no-global-assign
  mitnehmen = function(){
    window._neuzeichnen = null;
    try {
      const b1 = zmBildE1(); if (b1) mitbringsel[1] = b1; else delete mitbringsel[1];
      const b2 = zmBildE2(); if (b2) mitbringsel[2] = b2; else delete mitbringsel[2];
      const b3 = zmBildE3(); if (b3) mitbringsel[3] = b3; else delete mitbringsel[3];
    } catch (fehler){ console.error('Kapitel 6: Bild zum Mitnehmen', fehler); }
    _mitnehmenKern();
    const kasten = document.querySelector('.start.mitnehmen');
    if (!kasten) return;
    const h2 = kasten.querySelector('h2'), lage = kasten.querySelector('p.lage');
    if (h2) h2.textContent = 'Nehmen Sie Ihre Übersicht mit';
    if (lage){
      const t = [];
      if (mitbringsel[1]) t.push('Etappe 1: Ihre beiden Bäume, Ihre Verteilungen, die Farbcodes mit ihren Partnern, wie die Bäume zusammenhängen, und die Wette.');
      if (mitbringsel[2]) t.push('Etappe 2: je Situation Ihre Einträge in beiden Bäumen, die Pfade von Weg 1 und Weg 2 und was Sie feststellen.');
      if (mitbringsel[3]) t.push('Etappe 3: Ihre Wahl und Ihr Kriterium, Ihre Sammlung, die Landkarte mit Ihren Schätzungen und den wahren Lagen, Ihre Rechnung, Ihre Antworten und Ihre eigenen Buden.');
      t.push('Für Ihre Notizen als PDF.');
      lage.textContent = t.join(' ');
    }
  };
}

ETAPPEN.push(etappe1, etappe2, etappe3);
