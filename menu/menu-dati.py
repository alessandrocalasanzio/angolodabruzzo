# -*- coding: utf-8 -*-
"""
SORGENTE UNICA DEL MENU  --  Da Giannino, L'Angolo d'Abruzzo
===========================================================

Questo e' l'unico file da toccare per cambiare piatti e prezzi.
Dopo averlo modificato, rigenera il PDF con:

    python "menu/genera-menu.py"

Come si scrive una riga:      ("NOME DEL PIATTO", "12,00")
Come si scrive una sezione:   ("TITOLO SEZIONE", [ ...righe... ])

Regole utili
------------
* I prezzi si allineano da soli: non servono puntini, ci pensa il generatore.
* Per un prezzo doppio scrivi "6,50/7,50" oppure "18-20,00": va bene lo stesso.
* Per togliere un piatto, cancella (o commenta con #) la sua riga.
* "sinistra" e "destra" sono le due colonne della pagina. Se una diventa
  troppo lunga il testo trabocca in una pagina in piu': in quel caso sposta
  una sezione da una colonna all'altra.
* Le copertine NON stanno qui: sono le pagine originali del PDF di Alessandro
  e vengono riusate cosi' come sono, immagini comprese.
"""

PIEDE = u"DA GIANNINO L’ANGOLO D’ABRUZZO – VIA ROSOLINO PILO,20 – TUTTI I DIRITTI RISERVATI©"


# ===========================================================================
#  PAGINA MENU  --  ITALIANO
# ===========================================================================
MENU_IT = {
    u"titolo": u"MENU",
    u"sinistra": [
        (u"ANTIPASTI", [
            (u"CAPOCOLLO ALL’ABRUZZESE",                  u"12,00"),
            (u"POLPETTINE D’AGNELLO ALL’ABRUZZESE",       u"9,00"),
            (u"FRITTATA ALLA CAMPAGNOLA",                 u"9,00"),
            (u"SALAME NOSTRANO",                          u"12,00"),
            (u"VENTRICINA",                               u"12,00"),
            (u"PROSCIUTTO CRUDO",                         u"13,00"),
            (u"BRESAOLA CARPACCIATA",                     u"14,00"),
            (u"ANTIPASTI MISTI DELLA CASA",               u"13,00"),
            (u"OLIVE ASCOLANE",                           u"12,00"),
            (u"ANTIPASTO SOTT’OLIO",                      u"12,00"),
            (u"CRUDO AL COLTELLO",                        u"13,00"),
            (u"BURRATA",                                  u"13,00"),
            (u"BUFALA",                                   u"13,00"),
        ]),
        (u"SECONDI", [
            (u"AGNELLO E SCAMORZA ALLA GRIGLIA",          u"21,00"),
            (u"GRIGLIATA MISTA ALL’ABRUZZESE",            u"21,00"),
            (u"COSTOLETTE D’AGNELLO ALLA SCOTTADITO",     u"21,00"),
            (u"SCAMORZA ABRUZZESE ALLA GRIGLIA",          u"14,00"),
            (u"POLPETTINE D’AGNELLO CON PATATE",          u"14,00"),
            (u"VITELLO TONNATO CON CAPPERI",              u"15,00"),
            (u"CARPACCIO CON GRANA E RUCOLA",             u"16,00"),
            (u"MOZZARELLINE DORATE",                      u"12,00"),
            (u"AGNELLO AL FORNO ALL’ABRUZZESE CON PATATE", u"21,00"),
            (u"ARROSTICINI",                              u"15,00"),
            (u"TAGLIATA",                                 u"18/20,00"),
        ]),
        (u"FRUTTA, CAFFE E LIQUORI", [
            (u"FRUTTA DI STAGIONE",                       u"6,50/7,50"),
            (u"ANANAS AL MARASCHINO",                     u"6,50/7,50"),
            (u"CAPPUCCINO/CAMOMILLA/TE",                  u"2,50"),
            (u"CAFFE CORRETTO",                           u"2,50"),
            (u"CAFFE ESPRESSO",                           u"1,50"),
            (u"LIQUORI NAZIONALI",                        u"4/5,00"),
            (u"LIQUORI ESTERI",                           u"5/6,00"),
        ]),
        (u"DOLCI E GELATI", [
            (u"TIRAMISU",                                 u"6,50"),
            (u"MILLEFOGLIE",                              u"6,50"),
            (u"GELATO CON AMARO ABRUZZESE",               u"7,00"),
            (u"SEMIFREDDO AL CAFFE",                      u"7,00"),
            (u"SORBETTO LIMONE/MELA",                     u"6/7,00"),
            (u"TARTUFO",                                  u"6/7,00"),
            (u"PANNACOTTA",                               u"6,50"),
            (u"DOLCI DEL GIORNO",                         u"7,50"),
        ]),
    ],
    u"destra": [
        (u"PRIMI", [
            (u"TRIS DI CHITARRA, SCHIAFFONI E GNOCCHI",   u"16,00"),
            (u"ZUPPA DI CARDI ALL’ABRUZZESE",             u"13,00"),
            (u"MACCHERONI ALLA CHITARRA",                 u"15,00"),
            (u"SCHIAFFONI DELLA CUOCA",                   u"16,00"),
            (u"SAGNE E FAGIOLI ALL’ABRUZZESE",            u"13,00"),
            (u"SPAGHETTI ALLA D’ANNUNZIO",                u"13,00"),
            (u"GNOCCHETTI VERDI ALLA CASALINGA",          u"13,00"),
            (u"TORTELLINI IN BRODO",                      u"13,00"),
            (u"TAGLIATELLE ALLA CASALINGA",               u"15,00"),
            (u"GNOCCHI AI QUATTRO FORMAGGI",              u"13,00"),
            (u"MINESTRONE DI VERDURA",                    u"11,00"),
            (u"CHITARRA ALLA CARBONARA",                  u"15,00"),
            (u"SPAGHETTI AGLIO, OLIO E PEPERONCINO",      u"11,00"),
            (u"MACCHERONI, MELANZANE E RICOTTA",          u"15,00"),
        ]),
        (u"CONTORNI", [
            (u"PATATE FRITTE",                            u"5,00"),
            (u"INSALATA MISTA",                           u"5,00"),
            (u"INSALATA DI POMODORI E FINOCCHI",          u"5,00"),
            (u"CAROTE GRATTUGIATE",                       u"5,00"),
            (u"VERDURA COTTA ALL’OLIO",                   u"5,00"),
            (u"ANTIPASTI/VERDURA AL CARRELLO",            u"5,00"),
            (u"FORMAGGI",                                 u"6/9,00"),
        ]),
        (u"BEVANDE", [
            (u"ACQUA MINERALE (75CL)",                    u"3,00"),
            (u"BIBITA IN LATTINA",                        u"3,00"),
            (u"BIRRA (66CL)",                             u"7,00"),
        ]),
        (u"VINO DELLA CASA", [
            (u"VINI DELLA CASA IN CARAFFA ¼ LITRO",       u"4,00"),
            (u"VINI DELLA CASA IN CARAFFA ½ LITRO",       u"7,00"),
            (u"VINI DELLA CASA IN CARAFFA 1 LITRO",       u"11,00"),
        ]),
        (u"VINO IN BOTTIGLIA", [
            (u"MONTEPULCIANO ZACCAGNINI",                 u"24,00"),
            (u"MONTEPULCIANO JORIO",                      u"30,00"),
            (u"VIN SANTO",                                u"15,00"),
            (u"MONTEPULCIANO MASCIARELLI",                u"24,00"),
            (u"MONTEPULCIANO ILLUMINATI",                 u"28,00"),
            (u"MARINA CVETIC",                            u"45,00"),
            (u"SPUMANTE MIONETTO",                        u"24/28,00"),
        ]),
    ],
    # riga isolata in fondo alla colonna destra
    u"coda": (u"COPERTO", u"2,50"),
    u"piede": PIEDE,
}


# ===========================================================================
#  PAGINA MENU  --  INGLESE
# ===========================================================================
MENU_EN = {
    u"titolo": u"MENU",
    u"sinistra": [
        (u"APPETIZERS", [
            (u"ABRUZZO-STYLE CAPOCOLLO (CURED NECK OF PORK)", u"12,00"),
            (u"ABRUZZO-STYLE LAMB MEATBALLS",             u"9,00"),
            (u"OMELETTE IN A COUNTRY WAY",                u"9,00"),
            (u"LOCAL SALAMI",                             u"12,00"),
            (u"VENTRICINA",                               u"12,00"),
            (u"RAW HAM",                                  u"13,00"),
            (u"THINLY SLICED KIND OF DRIED SALTED BEEF",  u"14,00"),
            (u"HOMEMADE MIXED STARTED (SLICED CHARCUTERIE, MEATBALLS, OMELETTE)", u"13,00"),
            (u"BREAD-CRUMBED MEAT-STUFFED OLIVES",        u"12,00"),
            (u"APPETIZER IN OIL",                         u"12,00"),
            (u"HAND-CUT RAW HAM",                         u"13,00"),
            (u"BURRATA (KIND OF SOFT MOZZARELLA)",        u"13,00"),
            (u"BUFFALO MILK MOZZARELLA",                  u"13,00"),
        ]),
        (u"SECOND COURSES", [
            (u"GRILLED LAMB AND SCAMORZA CHEESE",         u"21,00"),
            (u"ABRUZZO-STYLE MIXED GRILL (LAMB, SCAMORZA, SAUSAGE, LAIN, ARROSTICINI)", u"21,00"),
            (u"LAMB CHOPS",                               u"21,00"),
            (u"GRILLED SCAMORZA CHEESE FROM ABRUZZO",     u"14,00"),
            (u"LAMB MEATBALLS WITH POTATOES",             u"14,00"),
            (u"VEAL WITH TUNA SAUCE AND CAPERS",          u"15,00"),
            (u"BEEF CARPACCIO WITH PARMESAN CHEESE AND ROCKET", u"16,00"),
            (u"BREAD-CRUMBED LITTLE MOZZARELLA BALLS",    u"12,00"),
            (u"ABRUZZO-STYLE OVEN-BAKED LAMB WITH POTATOES", u"21,00"),
            (u"ARROSTICINI (SHEEP MEAT CHOPS COOKED ON A SPIT)", u"15,00"),
            (u"SLICED-BEEF",                              u"18/20,00"),
        ]),
        (u"FRUIT, COFFE AND LIQUEURS", [
            (u"SEASONAL FRUIT",                           u"6,50/7,50"),
            (u"PINEAPPLE WITH MARASCHINO",                u"6,50/7,50"),
            (u"CAPPUCCINO, CAMOMILLE, TEA",               u"2,50"),
            (u"LACED COFFEE",                             u"2,50"),
            (u"ESPRESSO COFFEE",                          u"1,50"),
            (u"NATIONAL LIQUEURS",                        u"4/5,00"),
            (u"INTERNATIONAL LIQUEURS",                   u"5/6,00"),
        ]),
        (u"DESSERT AND ICE CREAMS", [
            (u"TIRAMISU",                                 u"6,50"),
            (u"MILLEFOGLIE PASTRY",                       u"6,50"),
            (u"CREAM ICE WITH ABRUZZO LIQUOR",            u"7,00"),
            (u"SEMIFREDDO WITH COFFEE",                   u"7,00"),
            (u"LEMON/GREEN APPLE SORBET",                 u"6/7,00"),
            (u"TRUFFLE ICE CREAM",                        u"6/7,00"),
            (u"PANNA COTTA",                              u"6,50"),
            (u"DAILY SPECIALS WITH ICE CREAM",            u"7,50"),
        ]),
    ],
    u"destra": [
        (u"FIRST COURSES", [
            (u"THREE KINDS OF PASTA (CHITARRA, SCHIAFFONI, GNOCCHI)", u"16,00"),
            (u"ABRUZZO-STYLE CARDOON SOUP (CARDOONS, EGGS, BROTH)", u"13,00"),
            (u"FRESH SPAGHETTI WITH LAMB SAUCE",          u"15,00"),
            (u"COOK’S SPECIAL SCHIAFFONI (STUFFED WITH RICOTTA)", u"16,00"),
            (u"ABRUZZO-STYLE SAGNE WITH BEANS",           u"13,00"),
            (u"D’ANNUNZIO-STYLE SPAGHETTI (ANCHOVIES, CAPERS, TOMATO)", u"13,00"),
            (u"HOME-MADE GREEN GNOCCHI (WITH RAGOUT)",    u"13,00"),
            (u"TORTELLINI SOUP",                          u"13,00"),
            (u"HOME-MADE NOODLES (WITH RAGOUT)",          u"15,00"),
            (u"FOUR-CHEESE GNOCCHI",                      u"13,00"),
            (u"MINESTRONE SOUP",                          u"11,00"),
            (u"CARBONARA SPAGHETTI (WITH EGG AND CHEEK LARD)", u"15,00"),
            (u"SPAGHETTI WITH GARLIC, OIL, CHILI PEPPER", u"11,00"),
            (u"MACARONI WITH AUBERGINES AND RICOTTA",     u"15,00"),
        ]),
        (u"SIDE DISHES", [
            (u"CHIPS",                                    u"5,00"),
            (u"MIXED SALAD",                              u"5,00"),
            (u"TOMATO AND FENNEL SALAD",                  u"5,00"),
            (u"GRATED CARROTS",                           u"5,00"),
            (u"BOILED VEGETABLES IN OIL",                 u"5,00"),
            (u"STARTERS/VEGETABLES",                      u"5,00"),
            (u"CHEESE",                                   u"6/9,00"),
        ]),
        (u"SOFT DRINKS", [
            (u"MINERAL WATER (75CL)",                     u"3,00"),
            (u"CANNED DRINKS",                            u"3,00"),
            (u"BEER (66CL)",                              u"7,00"),
        ]),
        (u"HOUSE WINES IN PITCHER", [
            (u"¼ LITRE",                                  u"4,00"),
            (u"½ LITRE",                                  u"7,00"),
            (u"1 LITRE",                                  u"11,00"),
        ]),
        (u"BOTTLED WINES", [
            (u"MONTEPULCIANO ZACCAGNINI",                 u"24,00"),
            (u"MONTEPULCIANO JORIO",                      u"30,00"),
            (u"VIN SANTO",                                u"15,00"),
            (u"MONTEPULCIANO MASCIARELLI",                u"24,00"),
            (u"MONTEPULCIANO ILLUMINATI",                 u"28,00"),
            (u"MARINA CVETIC",                            u"45,00"),
            (u"SPUMANTE MIONETTO",                        u"24/28,00"),
        ]),
    ],
    u"coda": (u"COVER", u"2,50"),
    u"piede": PIEDE,
}


# ===========================================================================
#  PAGINA "LO CHEF CONSIGLIA"  --  ITALIANO
# ===========================================================================
CHEF_IT = {
    u"titolo": u"LO CHEF CONSIGLIA",
    u"sinistra": [
        (u"PRIMI", [
            (u"PACCHERI ALLA GIANNINO",                   u"15,00"),
            (u"ANELLI ALLA PECORARA",                     u"15,00"),
            (u"SCHIAFFONI BURRATA E ZAFFERANO",           u"16,00"),
            (u"BUCATINI ALL’AMATRICIANA",                 u"15,00"),
            (u"CHITARRA ALLA MUGNAIA",                    u"15,00"),
            (u"TAGLIATELLE AL RAGU DI CINGHIALE",         u"15,00"),
            (u"CHITARRA ALLA CARBONARA",                  u"15,00"),
        ]),
        (u"DOLCI", [
            (u"PARROZZO",                                 u"6,50"),
            (u"SOFFIONE",                                 u"6,50"),
        ]),
    ],
    u"destra": [
        (u"SECONDI", [
            (u"MAIALINO AL FORNO",                        u"21,00"),
            (u"PORCHETTA DI CAMPLI",                      u"20,00"),
            (u"FILETTO DI MAIALINO ALLA ROBESPIERRE",     u"20,00"),
            (u"CONIGLIO AL FORNO",                        u"15,00"),
            (u"PALLOTTE CACE E OVA",                      u"13,00"),
            (u"HAMBURGER DI PECORA",                      u"15,00"),
            (u"ARROSTICINI DI FEGATO",                    u"15,00"),
            (u"SALSICCIA DI FEGATO CON CATALOGNA",        u"15,00"),
            (u"FIORENTINA (1 KG)",                        u"65,00"),
            (u"AGNELLO CACE E OVA",                       u"20,00"),
            (u"PECORA ALLA CALLARA",                      u"20,00"),
            (u"POLPETTONE CON PATATE",                    u"15,00"),
        ]),
    ],
    u"chiusura": u"Buon Appetito!!",
    u"piede": PIEDE,
}


# ===========================================================================
#  PAGINA "LO CHEF CONSIGLIA"  --  INGLESE
# ===========================================================================
CHEF_EN = {
    u"titolo": u"CHEF’S RECOMMENDATIONS",
    u"sinistra": [
        (u"FIRST COURSES", [
            (u"PACCHERI GIANNINO-STYLE",                  u"15,00"),
            (u"ANELLI PECORARA-STYLE",                    u"15,00"),
            (u"SCHIAFFONI WITH BURRATA AND SAFFRON",      u"16,00"),
            (u"BUCATINI AMATRICIANA-STYLE",               u"15,00"),
            (u"CHITARRA PASTA MUGNAIA-STYLE",             u"15,00"),
            (u"NOODLES WITH WILD BOAR RAGOUT",            u"15,00"),
            (u"CARBONARA CHITARRA PASTA",                 u"15,00"),
        ]),
        (u"DESSERTS", [
            (u"PARROZZO (ALMOND AND CHOCOLATE CAKE)",     u"6,50"),
            (u"SOFFIONE (RICOTTA CAKE)",                  u"6,50"),
        ]),
    ],
    u"destra": [
        (u"SECOND COURSES", [
            (u"OVEN-BAKED SUCKLING PIG",                  u"21,00"),
            (u"PORCHETTA FROM CAMPLI (ROAST PORK)",       u"20,00"),
            (u"PORK FILLET ROBESPIERRE-STYLE",            u"20,00"),
            (u"OVEN-BAKED RABBIT",                        u"15,00"),
            (u"PALLOTTE CACE E OVA (CHEESE AND EGG BALLS)", u"13,00"),
            (u"SHEEP BURGER",                             u"15,00"),
            (u"LIVER ARROSTICINI (SKEWERS)",              u"15,00"),
            (u"LIVER SAUSAGE WITH CHICORY",               u"15,00"),
            (u"T-BONE STEAK (1 KG)",                      u"65,00"),
            (u"LAMB CACE E OVA (WITH CHEESE AND EGG)",    u"20,00"),
            (u"MUTTON CALLARA-STYLE",                     u"20,00"),
            (u"MEATLOAF WITH POTATOES",                   u"15,00"),
        ]),
    ],
    u"chiusura": u"Enjoy your meal!!",
    u"piede": PIEDE,
}


# Ordine finale delle pagine del PDF.
# ("copertina", N) = pagina N presa cosi' com'e' dal PDF originale, immagini incluse.
PAGINE = [
    (u"copertina", 0),
    (u"menu",      MENU_IT),
    (u"chef",      CHEF_IT),
    (u"copertina", 2),
    (u"menu",      MENU_EN),
    (u"chef",      CHEF_EN),
]
