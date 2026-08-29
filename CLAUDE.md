# Da Giannino L'Angolo D'Abruzzo — sito web

Sito vetrina one-page per un ristorante a Milano (via Rosolino Pilo, 20), realizzato con Create React App. Sito live: https://www.da-giannino-langolo-dabruzzo.it

## ⚠️ Struttura repository — IMPORTANTE

Questa cartella (`risto/`) è **una repository Git a sé stante**, separata da qualunque cartella superiore. Non fare mai `git init`/operazioni Git a livelli superiori assumendo che siano collegati.

- Remote: `origin` → `https://github.com/alessandrocalasanzio/angolodabruzzo.git` (rinominato in passato da `ultimo.git`; se un push fallisce con redirect, è normale, Git lo segue da solo)
- Branch principale: `main`
- ⚠️ **`public/CNAME` non va MAI rimosso.** `gh-pages -d build` **sostituisce l'intero contenuto** del branch `gh-pages` con `build/`. Il dominio personalizzato di GitHub Pages vive in un file `CNAME` su quel branch: se `build/` non lo contiene, il deploy lo cancella e il sito risponde "Site not found" finché non lo si rimette. È già successo una volta. Ora il file sta in `public/CNAME` (contenuto: `da-giannino-langolo-dabruzzo.it`), così ogni build lo copia in `build/` da solo. Se un giorno il sito sparisce dopo un deploy, la prima cosa da controllare è questa.
- **Deploy**: `npm run deploy` (script `predeploy` fa la build, poi `gh-pages -d build` pubblica il contenuto di `build/` sul branch `gh-pages` dello stesso repo → questo è ciò che va live sul sito pubblico)
- In passato esisteva una cartella genitrice con una `.git` propria, rotta/con remote non più esistente, contenente asset legacy pre-React (`oldimg/`, `menu/`, `privacy&cookie/`). È stata rimossa (solo la cartella `.git`, i file restano se presenti) — se ricompare qualcosa del genere, non è collegata a questa repo.

## Comandi principali

```
npm start          # dev server (localhost:3000)
npm run build       # build di produzione
npm test            # test (attualmente nessun test reale, --passWithNoTests)
npm run deploy       # build + pubblicazione live (gh-pages)
```

### ⚠️ Se `npm run build`/`start` va in errore OpenSSL

Node.js moderno (v17+, incluso quello su questa macchina) rompe webpack 4 (usato da `react-scripts` 4.0.3, progetto Create React App non più mantenuto) con:
```
Error: error:0308010C:digital envelope routines::unsupported
```
**Già risolto**: gli script `start`/`build` in `package.json` includono `set NODE_OPTIONS=--openssl-legacy-provider&& ...` (sintassi `cmd.exe`, perché npm su questa macchina usa `cmd.exe` come `script-shell` di default, non bash/PowerShell). Se in futuro l'errore si ripresenta, verificare che questi script non siano stati sovrascritti.

## Stack tecnico

- **React 17** (class components + function components misti, no TypeScript)
- **react-scripts 4.0.3** (Create React App — deprecato, non più mantenuto da Meta)
- **react-bootstrap 2.x** + Bootstrap 5 CSS (via npm, non CDN)
- **react-router-dom v5** (usato solo per `HashRouter`, niente routing multi-pagina reale — è tutta una single page con anchor `#sezione`)
- **AOS** (Animate On Scroll) per le animazioni fade-in delle sezioni
- **styled-components** (usato solo in `galleriaLogo.js`/`8.galleriaImm.js`)
- **js-cookie** per il cookie `isFirstVisit` (gestisce la schermata di caricamento e il banner cookie)
- Font Awesome (locale via npm `@fortawesome/fontawesome-free`, incluso `v4-shims.css` per compatibilità con le vecchie classi `fa fa-*` usate nel markup)

## Struttura del sito (componenti, in ordine di rendering)

Tutto parte da `src/App.js`, che monta in sequenza (dentro un `<main>`):

1. `Loading` — schermata di benvenuto iniziale (vedi sotto)
2. `CookieBanner` — banner cookie in basso
3. `Navbar` (`1.navbar.js`) — vedi sezione dedicata sotto
4. `Titoli`/`ScheletroStoria` — sezione "Chi siamo" (carosello + testo storia)
5. Bottoni filtro menu (Antipasto/Primo/Secondo/... — griglia di card con `background-image`)
6. `MenuLista` (`7.menu.js`) — righe della tabella menu, filtrate da `state` in App.js in base al bottone cliccato
7. `GalleriaImmagini`/`galleriaLogo` — galleria foto + loghi partner (Gambero Rosso, Slurpy, ecc.)
8. `Contatti` (`9.contatti.js`) → `TestoContatti` + `Mappa` (iframe Google Maps)
9. `Footer` (`12.footer.js`) — con `Privacy` e `Cookie` (i bottoni che aprono le policy in modale)

I dati del menu (piatti, prezzi, sezioni) sono **hardcoded** nell'array `menus` dentro `App.js`, non arrivano da un CMS/API.

## Schermata di caricamento iniziale

Comportamento voluto (non toccare senza parlarne prima col cliente, gli piace così com'è):
- Alla **prima visita** (nessun cookie `isFirstVisit`): resta visibile finché la pagina non ha *davvero* finito di caricare (bundle JS/CSS/font, controllato via `document.readyState`/`window.load`), con un **minimo garantito di 2.2s** così il messaggio si fa in tempo a leggere anche su connessioni velocissime.
- Alle **visite successive** (cookie presente): nessuna attesa, contenuto immediato.
- Dopo il caricamento, un `useEffect` clicca automaticamente il bottone filtro "antipasto" (`ref` su quel bottone in `App.js`) per mostrare subito una sezione di menu.

## Design system

- **Palette**: nero (`#000`) e bianco come base, rosso `rgb(165, 34, 34)` come accento/hover principale, oro/ambra `rgb(230, 183, 96)` come accento secondario (sezione storia, scrollbar, bordo cookie banner)
- **Font**: `Bebas Neue` (titoli, navbar, bottoni, footer — il font "identità" del sito), `Fredericka the Great` (voci di menu), `Great Vibes` (schermata di caricamento), `Economica` (testo narrativo tipo la sezione "Chi siamo")
- **Stile**: angoli sempre squadrati, mai arrotondati (`border-radius: 0` esplicito quasi ovunque) — è una scelta di design coerente, non dimenticarla se si aggiungono nuovi elementi
- I font Google sono caricati da `public/index.html` (con `preconnect`), non più via `@import` in CSS (vedi gotcha sotto)

## Navbar (`src/components/1.navbar.js`) — attenzione se la si tocca

È stata riscritta da zero in questa sessione: usa il meccanismo standard `react-bootstrap` di collasso responsive (`Navbar` + `Navbar.Toggle` + `Navbar.Collapse`, hamburger sotto i 992px). Punti delicati:
- Lo stato `navbarExpanded` è **controllato** (`expanded={...}` + `onToggle`) — se si aggiungono nuove voci di menu, ricordarsi che il click su una voce chiude il pannello mobile (`onClick` su `<Nav>`), **escluso** il click sul toggle del dropdown "Menu" (altrimenti si richiude invece di aprirsi — controllo `e.target.closest('.dropdown-toggle')`)
- `activeHeader` (sfondo bianco navbar) si attiva sia scrollando oltre `headerBreakPoint` (50px) sia aprendo il menu mobile — se si modifica la logica di scroll, verificare che il menu mobile resti leggibile (sfondo non trasparente)
- **Non mettere mai la classe `nav-link` su due elementi annidati** (es. un `<li className="nav-link">` che contiene un `<a className="nav-link">`): i `font-size` in `em` di `.navbar .navbar-nav .nav-link` in App.css si moltiplicano tra loro invece di sommarsi, producendo testo enorme e aree cliccabili sballate. È già successo due volte in questa sessione.

## Gotcha CSS scoperti in questa sessione (da NON ripetere)

1. **Ordine degli `@import` in `App.css` conta più della loro presenza.** `App.css` importa Bootstrap (`@import 'bootstrap/dist/css/bootstrap.min.css'`) e questo sembra un doppione dell'`import` diretto in `App.js` — **non è vero**: rimuoverlo cambia l'ordine finale con cui le regole vengono sovrascritte nel bundle, e ha rotto il layout a griglia dei bottoni menu (Bootstrap `.row{display:flex}` ha vinto su `.photo-grid{display:grid}`). **Non toccare quell'`@import` senza verificare visivamente tutte le sezioni che mescolano classi Bootstrap e classi custom sullo stesso elemento.**
2. **`.navbar-nav { flex-direction: row }` era forzato sempre**, anche nel pannello mobile — ora è scoped `@media (min-width: 992px)`.
3. **Margini verticali molto negativi** su `.navbar .navbar-nav .nav-link` (`margin: -18px 0 -25px 0 !important`), pensati per compattare i link quando sono in riga orizzontale: se mai si impilano verticalmente (mobile), sovrappongono le voci una sull'altra. Neutralizzati sotto i 991px in una regola dedicata a fine sezione NAVBAR in App.css.
4. Diverse classi usate su `<img>` (`.imgCarousel`, `.imgLogo`, `.caroselloResize`) avevano `background-size/position/repeat` (proprietà per `background-image`, inutili su un tag `<img>` con `src`) invece di `object-fit/object-position` → le immagini venivano stirate/deformate. Corretto.
5. `AOS.init()` **deve essere chiamato una sola volta** (centralizzato in `App.js`, non nei singoli componenti) e va accompagnato da un `AOS.refresh()` quando le immagini finiscono di caricare — altrimenti sezioni sotto il fold (es. i Contatti) possono restare invisibili per sempre se il layout si sposta dopo il calcolo iniziale delle posizioni.
6. La struttura Git nidificata (repo dentro repo) ha causato confusione su dove finissero davvero i `git add`/commit — verificare sempre `git rev-parse --show-toplevel` e `git remote -v` prima di operazioni Git se non si è sicuri in quale repo ci si trova.

## Ambiente / toolchain (limiti noti, non risolti)

- `react-scripts` 4.0.3 = Create React App, **non più mantenuto**. Molti warning di build (`babel-preset-react-app`, dipendenze deprecate) derivano da questo, non sono bug del codice.
- `npm install` "generico" su questo progetto è **rischioso**: le dipendenze hanno conflitti di peer-dependency (es. `react-fittext` vuole React 16, il progetto usa React 17) risolti storicamente con `--legacy-peer-deps`. Un `npm install` senza quel flag può forzare un aggiornamento a cascata di centinaia di pacchetti e rompere la build (già successo in sessione). **Usare sempre `--legacy-peer-deps`** per installare/rimuovere dipendenze, oppure lavorare in modo chirurgico con `npm install <pkg>`/`npm uninstall <pkg>` invece di un `npm install` nudo.
- Il repository ha solo `package-lock.json` (npm). Il `yarn.lock` presente in passato è stato rimosso perché causava incoerenza.

## Metodologia di debug usata in questa sessione (utile da ripetere)

- **Chrome DevTools MCP** (`mcp__plugin_ecc_chrome-devtools__*`) per: screenshot a viewport diversi (mobile/desktop), lettura console per errori/warning React reali, `evaluate_script` per ispezionare lo stato DOM/CSS calcolato (es. per trovare la causa esatta di un elemento invisibile o disallineato), audit Lighthouse (`lighthouse_audit`) e performance trace (`performance_start_trace`/`performance_analyze_insight`) direttamente sul sito live per numeri reali invece di supposizioni.
- Per bug intermittenti legati a timing/caricamento (es. il bug dei Contatti invisibili), è stato decisivo **riprodurre lo scenario esatto** (cookie già presente = caricamento quasi istantaneo) via `evaluate_script` invece di fidarsi solo del codice letto staticamente.
- Sempre verificare `npm run build` dopo ogni gruppo di modifiche (warning ESLint del build spesso rivelano codice morto/variabili inutilizzate in un colpo solo).

## Menu: PDF e prezzi

I prezzi stanno in **due posti** e vanno tenuti allineati:

- `src/App.js` → array `menus`, sono le lavagne del sito
- `../menu/menu-dati.py` → è la sorgente del PDF scaricabile

La cartella `menu/` sta **fuori da questa repo** (è nella cartella genitrice) e contiene:

- `menu-dati.py` — l'unico file da modificare per cambiare piatti e prezzi del PDF
- `genera-menu.py` — ricompone il PDF: `python "menu/genera-menu.py"`. Riusa **tali e quali** le copertine (pagine 1 e 3 di `MENU ANGOLO ABRUZZO.pdf`, le foto originali del cliente), genera le pagine di testo in ODF piatto e ricampiona le immagini a 150 dpi (7,5 MB → 1,3 MB)
- `confronta-sito-pdf.py` — verifica che i prezzi del sito e quelli del PDF coincidano; esce con codice 0 se è tutto allineato

I prezzi nel PDF si allineano da soli: ogni riga è `NOME <tabulazione> PREZZO` con tabulazione destra e riempimento punteggiato definiti nello stile, quindi non ci sono puntini da contare a mano. **Non tornare a comporre le righe con caratteri `…`**: Agency FB ha cifre di larghezza diversa (l'"1" è largo la metà del "3") e il risultato viene irregolare.

Dopo aver rigenerato il PDF serve sempre `npm run build`, altrimenti il sito continua a servire la copia vecchia.

## Cosa resta aperto / backlog noto

- **Iframe Google Maps carica sempre**, senza consenso preventivo dell'utente (imposta un cookie di terze parti anche prima che l'utente clicchi "Accetto" sul banner). Soluzione discussa ma non implementata: caricare la mappa solo dopo un click esplicito ("clicca per caricare la mappa"). È una scelta di prodotto/UX, non un bug da correggere silenziosamente.
- Nessun test automatico reale nel progetto (solo `--passWithNoTests`).
- Non è mai stata affrontata una modernizzazione dello stack (React 17→19, react-scripts→Vite, react-router v5→v7): tutto il lavoro finora è stato conservativo (bug fix, pulizia, performance) senza toccare le versioni major, per non rischiare regressioni su un sito già in produzione.
