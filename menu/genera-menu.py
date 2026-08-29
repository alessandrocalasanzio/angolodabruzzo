# -*- coding: utf-8 -*-
"""
GENERATORE DEL MENU PDF  --  Da Giannino, L'Angolo d'Abruzzo
============================================================

    python "menu/genera-menu.py"

Prende piatti e prezzi da  menu-dati.py,  compone le pagine di testo, ci
attacca le due copertine originali (quelle con le tue foto, riusate tali e
quali, senza rigenerarle) e scrive il PDF che il sito mette in download:

    src/pdf/MenuAngoloDabruzzo.pdf

Perche' i prezzi risultano allineati
------------------------------------
Ogni riga e' scritta come  NOME <tabulazione> PREZZO,  e la tabulazione e'
definita nello stile come "allineata a destra, con riempimento punteggiato".
E' LibreOffice a distribuire i puntini e a far finire ogni prezzo esattamente
alla stessa coordinata: non c'e' niente da contare o da ritoccare a mano.

Le pagine vengono generate in ODF piatto (.fodt): e' un unico file XML, quindi
resta tutto leggibile e versionabile, e LibreOffice lo apre nativamente se
vuoi ritoccare qualcosa a mano.

Serve LibreOffice installato e i font Agency FB e Trebuchet MS (gia' presenti
su Windows). Alla fine lo script verifica l'allineamento e lo stampa a video.
"""

import importlib.util
import os
import re
import subprocess
import sys

try:
    import fitz  # PyMuPDF
except ImportError:
    sys.exit("Manca PyMuPDF. Installalo con:  pip install pymupdf")

QUI = os.path.dirname(os.path.abspath(__file__))
RADICE = os.path.dirname(QUI)
BUILD = os.path.join(QUI, "build")
COPERTINE = os.path.join(QUI, "MENU ANGOLO ABRUZZO.pdf")
USCITA = os.path.join(RADICE, "src", "pdf", "MenuAngoloDabruzzo.pdf")

SOFFICE = r"C:\Program Files\LibreOffice\program\soffice.exe"

# ------------------------------------------------------------------ aspetto
# Cambia questi valori se vuoi ritoccare la resa; sono tutti in centimetri
# tranne i corpi, che sono in punti.
PAG_L, PAG_H = 21.0, 29.7        # A4
MARGINE = 0.7
COL_L = 9.8                      # larghezza di ciascuna delle due colonne
PAD_SX, PAD_DX = 0.1, 0.3        # rientri interni della colonna
CORPO = 10                       # righe dei piatti
TIT_SEZIONE = 26                 # titoli rossi
TIT_PAGINA = 34                  # MENU / LO CHEF CONSIGLIA
ROSSO = "#c8201d"
PASSO = "0.04cm"                 # aria sopra ogni riga
TAB = COL_L - PAD_SX - PAD_DX    # dove finiscono i prezzi, dentro la colonna


def carica_dati():
    perc = os.path.join(QUI, "menu-dati.py")
    spec = importlib.util.spec_from_file_location("menu_dati", perc)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


TESTA = u"""<?xml version="1.0" encoding="UTF-8"?>
<office:document
 xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
 xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"
 xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
 xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0"
 xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"
 xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"
 office:version="1.3" office:mimetype="application/vnd.oasis.opendocument.text">
 <office:font-face-decls>
  <style:font-face style:name="AgencyFB" svg:font-family="'Agency FB'"/>
  <style:font-face style:name="TrebuchetMS" svg:font-family="'Trebuchet MS'"/>
 </office:font-face-decls>
 <office:automatic-styles>
  <style:page-layout style:name="pm1">
   <style:page-layout-properties fo:page-width="%(pagl).1fcm" fo:page-height="%(pagh).1fcm"
    style:print-orientation="portrait" fo:margin-top="%(mg).2fcm" fo:margin-bottom="%(mg).2fcm"
    fo:margin-left="%(mg).2fcm" fo:margin-right="%(mg).2fcm"/>
  </style:page-layout>

  <!-- riga di un piatto: tabulazione a destra con puntini -->
  <style:style style:name="Voce" style:family="paragraph">
   <style:paragraph-properties fo:margin-top="%(passo)s" fo:margin-bottom="0cm"
    fo:line-height="100%%" fo:text-align="start">
    <style:tab-stops>
     <style:tab-stop style:position="%(tab).2fcm" style:type="right"
      style:leader-style="dotted" style:leader-text="."/>
    </style:tab-stops>
   </style:paragraph-properties>
   <style:text-properties style:font-name="AgencyFB" fo:font-size="%(corpo)dpt"/>
  </style:style>

  <!-- titolo rosso di sezione -->
  <style:style style:name="Sez" style:family="paragraph">
   <style:paragraph-properties fo:margin-top="0.25cm" fo:margin-bottom="0.05cm"
    fo:line-height="100%%"/>
   <style:text-properties style:font-name="TrebuchetMS" fo:font-size="%(tits)dpt" fo:color="%(rosso)s"/>
  </style:style>

  <!-- intestazione ____MENU____ -->
  <style:style style:name="Testata" style:family="paragraph">
   <style:paragraph-properties fo:margin-top="0cm" fo:margin-bottom="0.15cm"
    fo:text-align="center" fo:line-height="100%%"/>
   <style:text-properties style:font-name="AgencyFB" fo:font-size="%(titp)dpt"/>
  </style:style>
  <style:style style:name="Filetto" style:family="text">
   <style:text-properties style:font-name="AgencyFB" fo:font-size="17pt"/>
  </style:style>

  <style:style style:name="Chiusura" style:family="paragraph">
   <style:paragraph-properties fo:margin-top="0.9cm" fo:margin-bottom="0cm" fo:text-align="center"/>
   <style:text-properties style:font-name="TrebuchetMS" fo:font-size="15pt"
    fo:font-style="italic" fo:font-weight="bold"/>
  </style:style>
  <style:style style:name="Piede" style:family="paragraph">
   <style:paragraph-properties fo:margin-top="0.7cm" fo:margin-bottom="0cm"/>
   <style:text-properties style:font-name="AgencyFB" fo:font-size="9pt"/>
  </style:style>
  <style:style style:name="Spazio" style:family="paragraph">
   <style:paragraph-properties fo:margin-top="0.45cm" fo:margin-bottom="0cm" fo:line-height="100%%"/>
   <style:text-properties style:font-name="AgencyFB" fo:font-size="2pt"/>
  </style:style>

  <!-- corpi ridotti per i titoli di sezione troppo larghi per la colonna -->
%(titoli)s
  <style:style style:name="Colonne" style:family="table">
   <style:table-properties style:width="%(tot).1fcm" table:align="left"/>
  </style:style>
  <style:style style:name="Colonna" style:family="table-column">
   <style:table-column-properties style:column-width="%(coll).1fcm"/>
  </style:style>
  <style:style style:name="Cella" style:family="table-cell">
   <style:table-cell-properties fo:padding-left="%(psx).2fcm" fo:padding-right="%(pdx).2fcm"
    fo:padding-top="0cm" fo:padding-bottom="0cm" fo:border="none"/>
  </style:style>
 </office:automatic-styles>
 <office:master-styles>
  <style:master-page style:name="Standard" style:page-layout-name="pm1"/>
 </office:master-styles>
 <office:body><office:text>
"""

CODA = u""" </office:text></office:body>
</office:document>
"""


TREBUCHET = os.path.join(os.environ.get("WINDIR", r"C:\Windows"), "Fonts", "trebuc.ttf")
_trebuchet = None


def corpo_titolo(titolo):
    """Rimpicciolisce un titolo di sezione finche' non sta su una riga sola."""
    global _trebuchet
    if _trebuchet is None:
        _trebuchet = fitz.Font(fontfile=TREBUCHET)
    utile = (COL_L - PAD_SX - PAD_DX) * 28.3465
    for corpo in range(TIT_SEZIONE, 15, -1):
        if _trebuchet.text_length(titolo, fontsize=corpo) <= utile:
            return corpo
    return 16


def stili_titoli(d):
    corpi = set()
    for lato in (u"sinistra", u"destra"):
        for titolo, _ in d.get(lato, []):
            corpi.add(corpo_titolo(titolo))
    return chr(10).join(
        '  <style:style style:name="TitS%d" style:family="text">'
        '<style:text-properties fo:font-size="%dpt"/></style:style>' % (c, c)
        for c in sorted(corpi))


def voce(nome, prezzo):
    return (u'   <text:p text:style-name="Voce">%s<text:tab/>%s</text:p>'
            % (esc(nome), esc(prezzo)))


def colonna(sezioni):
    out = []
    for titolo, righe in sezioni:
        out.append(u'   <text:p text:style-name="Sez">'
                   u'<text:span text:style-name="TitS%d">%s</text:span></text:p>'
                   % (corpo_titolo(titolo), esc(titolo)))
        out.extend(voce(n, p) for n, p in righe)
    return out


def testata(titolo, font):
    """____TITOLO____ , con i trattini calcolati per riempire la riga."""
    utile = (PAG_L - 2 * MARGINE) * 28.3465
    n = max(4, int((utile - font.text_length(titolo, fontsize=TIT_PAGINA) - 26)
                   / 2 / font.text_length(u"_", fontsize=17)))
    barra = u'<text:span text:style-name="Filetto">%s</text:span>' % (u"_" * n)
    return u' <text:p text:style-name="Testata">%s%s%s</text:p>' % (barra, esc(titolo), barra)


def documento(d, font):
    parti = [TESTA % dict(pagl=PAG_L, pagh=PAG_H, mg=MARGINE, passo=PASSO, tab=TAB,
                          corpo=CORPO, tits=TIT_SEZIONE, titp=TIT_PAGINA, rosso=ROSSO,
                          tot=COL_L * 2, coll=COL_L, psx=PAD_SX, pdx=PAD_DX,
                          titoli=stili_titoli(d)),
             testata(d[u"titolo"], font),
             u' <table:table table:name="Colonne" table:style-name="Colonne">',
             u'  <table:table-column table:style-name="Colonna" table:number-columns-repeated="2"/>',
             u'  <table:table-row>',
             u'   <table:table-cell table:style-name="Cella" office:value-type="string">']
    parti.extend(colonna(d[u"sinistra"]))
    parti.append(u'   </table:table-cell>')
    parti.append(u'   <table:table-cell table:style-name="Cella" office:value-type="string">')
    parti.extend(colonna(d[u"destra"]))
    if d.get(u"coda"):
        parti.append(u'   <text:p text:style-name="Spazio"/>')
        parti.append(voce(*d[u"coda"]))
    parti.append(u'   </table:table-cell>')
    parti.append(u'  </table:table-row>')
    parti.append(u' </table:table>')
    if d.get(u"chiusura"):
        parti.append(u' <text:p text:style-name="Chiusura">%s</text:p>' % esc(d[u"chiusura"]))
    parti.append(u' <text:p text:style-name="Piede">%s</text:p>' % esc(d[u"piede"]))
    parti.append(CODA)
    return u"\n".join(parti)


def in_pdf(percorso):
    subprocess.run([SOFFICE, "--headless", "--norestore", "--convert-to", "pdf",
                    "--outdir", BUILD, percorso], check=True, capture_output=True)
    atteso = os.path.splitext(percorso)[0] + ".pdf"
    if not os.path.exists(atteso):
        sys.exit("LibreOffice non ha prodotto %s" % atteso)
    return atteso


def controlla_allineamento(percorso):
    """In ogni colonna i prezzi devono finire tutti alla stessa coordinata."""
    finale = re.compile(r"[0-9][0-9/,-]*,[0-9]{2}[ ]*$")
    doc = fitz.open(percorso)
    esito = []
    for n in range(doc.page_count):
        colonne = {}
        for b in doc[n].get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                t = "".join(s["text"] for s in l["spans"]).strip()
                if finale.search(t):
                    lato = "sinistra" if l["bbox"][2] < 320 else "destra"
                    colonne.setdefault(lato, []).append(l["bbox"][2])
        for lato, xs in sorted(colonne.items()):
            esito.append((n, lato, len(xs), max(xs) - min(xs)))
    return esito


def main():
    dati = carica_dati()
    os.makedirs(BUILD, exist_ok=True)
    font = fitz.Font(fontfile=os.path.join(os.environ.get("WINDIR", r"C:\Windows"),
                                           "Fonts", "AGENCYR.TTF"))

    originale = fitz.open(COPERTINE)
    finale = fitz.open()
    contatore = {}

    for tipo, valore in dati.PAGINE:
        if tipo == u"copertina":
            finale.insert_pdf(originale, from_page=valore, to_page=valore)
            print("  copertina originale (pagina %d) riusata intatta, foto comprese" % valore)
            continue
        contatore[tipo] = contatore.get(tipo, 0) + 1
        base = "%s%d" % (tipo, contatore[tipo])
        sorgente = os.path.join(BUILD, base + ".fodt")
        with open(sorgente, "w", encoding="utf-8") as f:
            f.write(documento(valore, font))
        pagina = fitz.open(in_pdf(sorgente))
        if pagina.page_count != 1:
            print("  ATTENZIONE: %s occupa %d pagine invece di 1. Una colonna e'"
                  " troppo lunga: in menu-dati.py sposta una sezione nell'altra."
                  % (base, pagina.page_count))
        finale.insert_pdf(pagina)
        print("  %-6s composta da menu-dati.py (%d pagina/e)" % (base, pagina.page_count))

    grezzo = os.path.join(BUILD, "_unito.pdf")
    finale.save(grezzo, garbage=4, deflate=True)
    finale.close()

    # ricampiona le foto delle copertine a 150 dpi: il PDF scende da ~7,5 a ~1,3 MB
    doc = fitz.open(grezzo)
    doc.rewrite_images(dpi_threshold=200, dpi_target=150, quality=82)
    doc.save(USCITA, garbage=4, deflate=True, clean=True)

    print("\nscritto %s  (%d pagine, %.2f MB)"
          % (os.path.relpath(USCITA, RADICE), fitz.open(USCITA).page_count,
             os.path.getsize(USCITA) / 1e6))
    print("\ncontrollo allineamento prezzi:")
    tutto_ok = True
    for n, lato, quanti, scarto in controlla_allineamento(USCITA):
        ok = scarto < 1.0
        tutto_ok = tutto_ok and ok
        print("  pagina %d, colonna %-8s %2d prezzi, scarto %.2f pt  %s"
              % (n + 1, lato, quanti, scarto, "ok" if ok else "DA GUARDARE"))
    print("\n%s" % ("tutti i prezzi sono allineati." if tutto_ok
                    else "qualche colonna non torna: controlla il PDF."))
    print("Ricordati di rifare la build del sito:  npm run build")


if __name__ == "__main__":
    main()
