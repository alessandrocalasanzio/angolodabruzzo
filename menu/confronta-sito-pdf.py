# -*- coding: utf-8 -*-
"""
CONTROLLO: i prezzi del sito coincidono con quelli del PDF?
===========================================================

    python "menu/confronta-sito-pdf.py"

I prezzi stanno in due posti:
  * menu-dati.py            -> finisce nel PDF
  * src/App.js              -> finisce sulle lavagne del sito

Questo script li rimette a confronto e segnala le differenze. Non modifica
niente: stampa solo un rapporto. Lancialo ogni volta che cambi un prezzo,
prima di pubblicare.

Le righe elencate come "solo sul sito" o "solo nel PDF" di solito non sono
errori: sono lo stesso piatto scritto in modo diverso nelle due fonti
(es. "Gelato crema affogato all'amaro d'Abruzzo" contro "GELATO CON AMARO
ABRUZZESE"). Vanno lette a occhio; quello che conta davvero e' che la
sezione "PREZZI DIVERSI" resti vuota.
"""

import difflib
import io
import os
import re
import sys
import unicodedata

try:
    import fitz  # PyMuPDF
except ImportError:
    sys.exit("Manca PyMuPDF. Installalo con:  pip install pymupdf")

QUI = os.path.dirname(os.path.abspath(__file__))
RADICE = os.path.dirname(QUI)
APPJS = os.path.join(RADICE, "src", "App.js")
PDF = os.path.join(RADICE, "src", "pdf", "MenuAngoloDabruzzo.pdf")

# pagine italiane del PDF (0 = copertina, 1 = menu, 2 = lo chef consiglia)
PAGINE_ITALIANE = (1, 2)

RIGA_PDF = re.compile(r"^(.*?)[.…]{2,}\s*([0-9][0-9/,-]*,[0-9]{2})$")
RIGA_JS = re.compile(r'titolo:\s*"([^"]+)",\s*prezzo:\s*"([^"]*)",'
                     r'\s*sezione:\s*"([^"]+)",\s*numero:\s*"([^"]*)"')


def chiave(t):
    """Nome ridotto all'osso, per appaiare le due fonti nonostante accenti,
    maiuscole, apostrofi e i doppioni di consonante nei refusi."""
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()
    t = t.upper().replace("GG", "G").replace("TT", "T").replace("LL", "L")
    return re.sub(r"[^A-Z0-9]", "", t)


def norm_prezzo(p):
    return p.replace("-", "/").replace(" ", "")


def leggi_sito():
    testo = io.open(APPJS, encoding="utf-8").read()
    blocco = testo[testo.index("const menus = ["):testo.index("\n];")]
    voci = []
    for m in RIGA_JS.finditer(blocco):
        nome, intero, sezione, decimali = m.groups()
        voci.append((nome, intero + (("," + decimali) if decimali else ""), sezione))
    return voci


def leggi_pdf():
    doc = fitz.open(PDF)
    voci = []
    for n in PAGINE_ITALIANE:
        if n >= doc.page_count:
            continue
        for b in doc[n].get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                t = "".join(s["text"] for s in l["spans"]).strip()
                m = RIGA_PDF.match(t)
                if m:
                    voci.append((m.group(1).strip(), m.group(2)))
    return voci


def main():
    sito, pdf = leggi_sito(), leggi_pdf()
    per_chiave = {}
    for nome, prezzo in pdf:
        per_chiave.setdefault(chiave(nome), (nome, prezzo))

    print("righe sul sito: %d   righe nel PDF (pagine italiane): %d\n"
          % (len(sito), len(pdf)))

    usate, diversi, solo_sito = set(), [], []
    for nome, prezzo, sezione in sito:
        k = chiave(nome)
        trovato = per_chiave.get(k)
        if not trovato:
            vicini = difflib.get_close_matches(k, list(per_chiave), n=1, cutoff=0.72)
            if vicini:
                k, trovato = vicini[0], per_chiave[vicini[0]]
        if not trovato:
            solo_sito.append((nome, prezzo, sezione))
            continue
        usate.add(k)
        if norm_prezzo(prezzo) != norm_prezzo(trovato[1]):
            diversi.append((nome, prezzo, trovato[0], trovato[1]))

    print("=== PREZZI DIVERSI: %d ===" % len(diversi))
    for nome, ps, nome_pdf, pp in diversi:
        print("  %-40s sito %-12s pdf %-12s  (nel PDF: %s)"
              % (nome[:40], ps, pp, nome_pdf[:34]))
    if not diversi:
        print("  nessuno: sito e PDF dicono la stessa cosa.")

    print("\n=== SOLO SUL SITO (da leggere a occhio): %d ===" % len(solo_sito))
    for nome, prezzo, sezione in solo_sito:
        print("  %-40s %-12s [%s]" % (nome[:40], prezzo, sezione))

    resto = [v for k, v in per_chiave.items() if k not in usate]
    print("\n=== SOLO NEL PDF (da leggere a occhio): %d ===" % len(resto))
    for nome, prezzo in resto:
        print("  %-46s %s" % (nome[:46], prezzo))

    return 1 if diversi else 0


if __name__ == "__main__":
    sys.exit(main())
