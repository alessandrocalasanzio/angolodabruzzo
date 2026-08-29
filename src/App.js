import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/v4-shims.min.css';
import { HashRouter as Router } from "react-router-dom";
import Navbar from './components/1.navbar';
import ScheletroStoria from './components/4.scheletroStoria';
import MenuLista from './components/7.menu';
import GalleriaImmagini from './components/8.galleriaImm';
import Contatti from './components/9.contatti';
import Footer from './components/12.footer';
import Titoli from './components/2.titoli';
import Titoli1 from './components/3.titoli1';
import CookieBanner from './components/cookiebanner';

import pane from './img/bread.jpg';
import carbonara from './img/pasta.jpg';
import carne from './img/carne1.jpg';
import patate from './img/patate.jpg';
import dolci from './img/dolce.jpg';
import frutta from './img/fruit.jpg';
import acqua from './img/bottle.jpg';
import vino from './img/wine.jpg';

import PDF from "./pdf/MenuAngoloDabruzzo.pdf";

import Loading from './components/Loading';

import AOS from 'aos';
import 'aos/dist/aos.css';


import Cookies from 'js-cookie';


const menus = [
  { id: 0, megatitolo: "ANTIPASTI", titolo: "Capocollo all'Abruzzese", prezzo: "12", sezione: "antipasto", numero: "00", dollaro: "€" },
  { id: 1, titolo: "Polpettine d'Agnello all'Abruzzese", prezzo: "9", sezione: "antipasto", numero: "00", dollaro: "€" },
  { id: 3, titolo: "Frittata alla Campagnola", prezzo: "9", sezione: "antipasto", numero: "00", dollaro: "€" },
  { id: 4, titolo: "Salame Nostrano", prezzo: "12", sezione: "antipasto", numero: "00", dollaro: "€" },
  { id: 5, titolo: "Prosciutto Crudo", prezzo: "13", sezione: "antipasto", numero: "00", dollaro: "€" },
  { id: 5.1, titolo: "Ventricina", prezzo: "12", sezione: "antipasto", numero: "00", dollaro: "€" },
  { id: 6, titolo: "Bresaola Carpacciata", prezzo: "14", sezione: "antipasto", numero: "00", dollaro: "€" },
  { id: 7, titolo: "Antipasti Misti della Casa", prezzo: "13", sezione: "antipasto", numero: "00", dollaro: "€" },
  { id: 8, titolo: "Olive Ascolane", prezzo: "12", sezione: "antipasto", numero: "00", dollaro: "€" },
  { id: 9, titolo: "Antipasto Sott'olio", prezzo: "12", sezione: "antipasto", numero: "00", dollaro: "€" },
  { id: 10, titolo: "Crudo al Coltello", prezzo: "13", sezione: "antipasto", numero: "00", dollaro: "€" },
  { id: 11, titolo: "Burrata", prezzo: "13", sezione: "antipasto", numero: "00", dollaro: "€" },
  { id: 12, titolo: "Bufala", prezzo: "13", sezione: "antipasto", numero: "00", dollaro: "€" },
  {},

  { id: 13, megatitolo: "PRIMI", titolo: "Tris di chitarra, schiaffoni e gnocchi", prezzo: "16", sezione: "primo", numero: "00", dollaro: "€" },
  { id: 14, titolo: "Zuppa di cardi all’Abruzzese", prezzo: "13", sezione: "primo", numero: "00", dollaro: "€" },
  { id: 18, titolo: "Maccheroni alla chitarra", prezzo: "15", sezione: "primo", numero: "00", dollaro: "€" },
  { id: 19, titolo: "Schiaffoni della cuoca", prezzo: "16", sezione: "primo", numero: "00", dollaro: "€" },
  { id: 21, titolo: "Sagne e fagioli all’Abruzzese", prezzo: "13", sezione: "primo", numero: "00", dollaro: "€" },
  { id: 22, titolo: "Spaghetti alla d’Annunzio", prezzo: "13", sezione: "primo", numero: "00", dollaro: "€" },
  { id: 23, titolo: "Gnocchetti verdi alla casalinga", prezzo: "13", sezione: "primo", numero: "00", dollaro: "€" },
  { id: 25, titolo: "Tortellini in brodo", prezzo: "13", sezione: "primo", numero: "00", dollaro: "€" },
  { id: 28, titolo: "Tagliatelle alla casalinga", prezzo: "15", sezione: "primo", numero: "00", dollaro: "€" },
  { id: 29, titolo: "Gnocchi ai quattro formaggi", prezzo: "13", sezione: "primo", numero: "00", dollaro: "€" },
  { id: 31, titolo: "Minestrone di verdura", prezzo: "11", sezione: "primo", numero: "00", dollaro: "€" },
  { id: 32, titolo: "Chitarra alla carbonara", prezzo: "15", sezione: "primo", numero: "00", dollaro: "€" },
  { id: 34, titolo: "Spaghetti aglio, olio e peperoncino", prezzo: "11", sezione: "primo", numero: "00", dollaro: "€" },
  { id: 35, titolo: "Maccheroni e melanzane e ricotta", prezzo: "15", sezione: "primo", numero: "00", dollaro: "€" },

  { id: 37, megatitolo: "SECONDI", titolo: "Agnello e scamorza alla griglia", prezzo: "21", sezione: "secondo", numero: "00", dollaro: "€" },
  { id: 38, titolo: "Grigliata mista all’Abruzzese", prezzo: "21", sezione: "secondo", numero: "00", dollaro: "€" },
  { id: 42, titolo: "Costolette d’agnello alla scottadito", prezzo: "21", sezione: "secondo", numero: "00", dollaro: "€" },
  { id: 43, titolo: "Scamorza Abruzzese alla griglia", prezzo: "14", sezione: "secondo", numero: "00", dollaro: "€" },
  { id: 46, titolo: "Polpettine d’agnello con patate", prezzo: "14", sezione: "secondo", numero: "00", dollaro: "€" },
  { id: 47, titolo: "Vitello tonnato con capperi", prezzo: "15", sezione: "secondo", numero: "00", dollaro: "€" },
  { id: 48, titolo: "Carpaccio con grana e rucola", prezzo: "16", sezione: "secondo", numero: "00", dollaro: "€" },
  { id: 49, titolo: "Mozzarelline dorate", prezzo: "12", sezione: "secondo", numero: "00", dollaro: "€" },
  { id: 55, titolo: "Agnello al forno con patate", prezzo: "21", sezione: "secondo", numero: "00", dollaro: "€" },
  { id: 56, titolo: "Arrosticini", prezzo: "15", sezione: "secondo", numero: "00", dollaro: "€" },
  { id: 58, titolo: "Tagliata", prezzo: "18/20", sezione: "secondo", numero: "00", dollaro: "€" },
  { id: 58.1, titolo: "Formaggi", prezzo: "6/9", sezione: "secondo", numero: "00", dollaro: "€" },

  {},

  { id: 62, megatitolo: "CONTORNI", titolo: "Patate Fritte", prezzo: "5", sezione: "contorno", numero: "00", dollaro: "€" },
  { id: 63, titolo: "Insalata mista", prezzo: "5", sezione: "contorno", numero: "00", dollaro: "€" },
  { id: 64, titolo: "Insalata di pomodori, finocchi", prezzo: "5", sezione: "contorno", numero: "00", dollaro: "€" },
  { id: 64.1, titolo: "Carote grattugiate", prezzo: "5", sezione: "contorno", numero: "00", dollaro: "€" },
  { id: 65, titolo: "Verdura cotta all’olio", prezzo: "5", sezione: "contorno", numero: "00", dollaro: "€" },
  { id: 66, titolo: "Antipasti/verdura al carrello", prezzo: "5", sezione: "contorno", numero: "00", dollaro: "€" },
  {},

  { id: 69, megatitolo: "DOLCI", titolo: "Tiramisù", prezzo: "6", sezione: "dolci", numero: "50", dollaro: "€" },
  { id: 70, titolo: "Millefoglie", prezzo: "6", sezione: "dolci", numero: "50", dollaro: "€" },
  { id: 71, titolo: "Gelato crema affogato all’amaro d'Abruzzo", prezzo: "7", sezione: "dolci", numero: "00", dollaro: "€" },
  { id: 72, titolo: "Semifreddo affogato al caffè", prezzo: "7", sezione: "dolci", numero: "00", dollaro: "€" },
  { id: 73, titolo: "Sorbetto al Limone", prezzo: "6/7", sezione: "dolci", numero: "00", dollaro: "€" },
  { id: 74, titolo: "Sorbetto mela verde", prezzo: "6/7", sezione: "dolci", numero: "00", dollaro: "€" },
  { id: 75, titolo: "Tartufo", prezzo: "6/7", sezione: "dolci", numero: "00", dollaro: "€" },
  { id: 75.1, titolo: "Pannacotta", prezzo: "6", sezione: "dolci", numero: "50", dollaro: "€" },
  { id: 77, titolo: "Dolci del giorno con gelato", prezzo: "7", sezione: "dolci", numero: "50", dollaro: "€" },
  {},

  { id: 78, megatitolo: "FRUTTA", titolo: "Frutta di stagione", prezzo: "6,50/7,50", sezione: "frutta", numero: "", dollaro: "€" },
  { id: 79, titolo: "Ananas al Maraschino", prezzo: "6,50/7,50", sezione: "frutta", numero: "", dollaro: "€" },

  { id: 80, megatitolo: "BEVANDE", titolo: "Acqua minerale (75 cl)", prezzo: "3", sezione: "bevande", numero: "00", dollaro: "€" },
  { id: 81, titolo: "Bibita in lattina", prezzo: "3", sezione: "bevande", numero: "00", dollaro: "€" },
  { id: 82, titolo: "Birra (66 cl)", prezzo: "7", sezione: "bevande", numero: "00", dollaro: "€" },

  { id: 82.1, megatitolo: "CAFFÈ E LIQUORI", titolo: "Cappuccino, camomilla, tè", prezzo: "2", sezione: "bevande", numero: "50", dollaro: "€" },
  { id: 82.2, titolo: "Caffè corretto", prezzo: "2", sezione: "bevande", numero: "50", dollaro: "€" },
  { id: 82.3, titolo: "Caffè espresso", prezzo: "1", sezione: "bevande", numero: "50", dollaro: "€" },
  { id: 82.4, titolo: "Liquori nazionali", prezzo: "4/5", sezione: "bevande", numero: "00", dollaro: "€" },
  { id: 82.5, titolo: "Liquori esteri", prezzo: "5/6", sezione: "bevande", numero: "00", dollaro: "€" },
  { id: 82.6, titolo: "Coperto", prezzo: "2", sezione: "bevande", numero: "50", dollaro: "€" },
  {},

  { id: 83, megatitolo: "VINI DELLA CASA IN CARAFFA", titolo: "1/4 Litro", prezzo: "4", sezione: "vino", numero: "00", dollaro: "€" },
  { id: 85, titolo: "1/2 Litro", prezzo: "7", sezione: "vino", numero: "00", dollaro: "€" },
  { id: 87, titolo: "1 Litro", prezzo: "11", sezione: "vino", numero: "00", dollaro: "€" },

  { id: 90, megatitolo: "VINO IN BOTTIGLIA", titolo: "Montepulciano Jorio", prezzo: "30", sezione: "vino", numero: "00", dollaro: "€" },
  { id: 91, titolo: "Marina Cvetic’", prezzo: "45", sezione: "vino", numero: "00", dollaro: "€" },
  { id: 92, titolo: "Montepulciano Zaccagnini", prezzo: "24", sezione: "vino", numero: "00", dollaro: "€" },
  { id: 93, titolo: "Montepulciano Masciarelli", prezzo: "24", sezione: "vino", numero: "00", dollaro: "€" },
  { id: 94, titolo: "Montepulciano Illuminati", prezzo: "28", sezione: "vino", numero: "00", dollaro: "€" },
  { id: 94.1, titolo: "Vin Santo", prezzo: "15", sezione: "vino", numero: "00", dollaro: "€" },
  { id: 95, titolo: "Spumante Nazionale Mionetto", prezzo: "24/28", sezione: "vino", numero: "00", dollaro: "€" },
  {},

  { id: 100, megatitolo: "PRIMI", titolo: "Paccheri alla Giannino", prezzo: "15", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 101, titolo: "Anelli alla Pecorara", prezzo: "15", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 102, titolo: "Schiaffoni burrata e zafferano", prezzo: "16", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 103, titolo: "Bucatini all’Amatriciana", prezzo: "15", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 104, titolo: "Chitarra alla Mugnaia", prezzo: "15", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 105, titolo: "Tagliatelle al ragù di cinghiale", prezzo: "15", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 106, titolo: "Chitarra alla carbonara", prezzo: "15", sezione: "chef", numero: "00", dollaro: "€" },

  { id: 107, megatitolo: "SECONDI", titolo: "Maialino al forno", prezzo: "21", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 108, titolo: "Porchetta di Campli", prezzo: "20", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 109, titolo: "Filetto di maialino alla Robespierre", prezzo: "20", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 110, titolo: "Coniglio al forno", prezzo: "15", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 111, titolo: "Pallotte cace e ova", prezzo: "13", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 112, titolo: "Hamburger di pecora", prezzo: "15", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 113, titolo: "Arrosticini di fegato", prezzo: "15", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 114, titolo: "Salsiccia di fegato con catalogna", prezzo: "15", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 115, titolo: "Fiorentina (1 kg)", prezzo: "65", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 116, titolo: "Agnello cace e ova", prezzo: "20", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 117, titolo: "Pecora alla callara", prezzo: "20", sezione: "chef", numero: "00", dollaro: "€" },
  { id: 118, titolo: "Polpettone con patate", prezzo: "15", sezione: "chef", numero: "00", dollaro: "€" },

  { id: 119, megatitolo: "DOLCI", titolo: "Parrozzo", prezzo: "6", sezione: "chef", numero: "50", dollaro: "€" },
  { id: 120, titolo: "Soffione", prezzo: "6", sezione: "chef", numero: "50", dollaro: "€" },
];

function App() {

  const [state, setState] = useState(menus);
  const ref = useRef(null);


  const filtra = (e) => {
    let word = e.target.value;

    if (word === 'All') {
      setState(menus);
    }
    else if (word === 'antipasto') {
      const filtered = menus.filter(menu => menu.sezione === 'antipasto');
      setState(filtered);
    }
    else if (word === 'appetizers') {
      const filtered = menus.filter(menu => menu.sezione === 'antipasto');
      setState(filtered);
    }
    else if (word === 'primo') {
      const filtered = menus.filter(menu => menu.sezione === 'primo');
      setState(filtered);
    }
    else if (word === 'first') {
      const filtered = menus.filter(menu => menu.sezione === 'primo');
      setState(filtered);
    }
    else if (word === 'secondo') {
      const filtered = menus.filter(menu => menu.sezione === 'secondo');
      setState(filtered);
    }
    else if (word === 'contorno') {
      const filtered = menus.filter(menu => menu.sezione === 'contorno');
      setState(filtered);
    }
    else if (word === 'dolci') {
      const filtered = menus.filter(menu => menu.sezione === 'dolci');
      setState(filtered);
    }
    else if (word === 'frutta') {
      const filtered = menus.filter(menu => menu.sezione === 'frutta');
      setState(filtered);
    }
    else if (word === 'bevande') {
      const filtered = menus.filter(menu => menu.sezione === 'bevande');
      setState(filtered);
    }
    else if (word === 'vino') {
      const filtered = menus.filter(menu => menu.sezione === 'vino');
      setState(filtered);
    }
    else if (word === 'chef') {
      const filtered = menus.filter(menu => menu.sezione === 'chef');
      setState(filtered);
    }
  }


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      return;
    }

    AOS.init({ duration: 1000, once: true, mirror: false });

    const refreshAos = () => AOS.refresh();

    // I font web possono ancora cambiare le dimensioni del testo dopo l'init
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refreshAos);
    }

    // Le immagini non ancora caricate al momento dell'init spostano il
    // contenuto sottostante una volta caricate: senza questo ricalcolo,
    // le sezioni più in basso (es. Contatti) possono restare nascoste,
    // perché AOS ne ha calcolato la posizione quando le immagini sopra
    // occupavano ancora 0px di altezza.
    const pendingImages = Array.from(document.querySelectorAll('img')).filter(
      (img) => !img.complete
    );
    if (pendingImages.length === 0) {
      refreshAos();
    } else {
      let remaining = pendingImages.length;
      const onImageSettled = () => {
        remaining -= 1;
        if (remaining === 0) {
          refreshAos();
        }
      };
      pendingImages.forEach((img) => {
        img.addEventListener('load', onImageSettled, { once: true });
        img.addEventListener('error', onImageSettled, { once: true });
      });
    }
  }, [loading]);

  useEffect(() => {
    // Tempo minimo per cui resta visibile il messaggio di benvenuto, così
    // chi visita il sito per la prima volta fa in tempo a leggerlo anche
    // se la pagina carica molto in fretta.
    const MIN_WELCOME_MS = 2200;
    const start = Date.now();

    const revealContent = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(MIN_WELCOME_MS - elapsed, 0);
      setTimeout(() => setLoading(false), remaining);
    };

    // Alle visite successive (cookie già presente) il contenuto compare
    // appena pronto, senza attesa minima forzata.
    if (Cookies.get('isFirstVisit')) {
      setLoading(false);
      return;
    }

    Cookies.set('isFirstVisit', 'true', { expires: 30 }); // Scade dopo 30 giorni

    // Il contenuto viene mostrato non appena il caricamento reale della
    // pagina (bundle JS/CSS, font) è completo, invece che dopo un tempo
    // fisso scollegato da cosa sta effettivamente accadendo.
    if (document.readyState === 'complete') {
      revealContent();
    } else {
      window.addEventListener('load', revealContent, { once: true });
      return () => window.removeEventListener('load', revealContent);
    }
  }, []);

  useEffect(() => {
    // Filtra automaticamente su "antipasto" appena il contenuto è visibile
    if (loading) {
      return;
    }

    const clickTimeoutId = setTimeout(() => {
      if (ref.current) {
        ref.current.click();
      }
    }, 100);

    return () => clearTimeout(clickTimeoutId);
  }, [loading]);


  return (


    <Router basename={window.location.pathname || ''}>
    
    
      <section id="home"></section>
      
      {loading === true ?
        <Loading /> :
        <div>
         <CookieBanner/>
          <Navbar />
          <main>
          <section id="chisiamo"> </section>
          <Titoli title="CHI SIAMO" />
          <ScheletroStoria />
          <section id="menu"></section>
          <Titoli1 title="MENU" />
          {/*BOTTONI MENU*/}
          <div className="container-fluid">
  <div className="row photo-grid rowCompleto card1-tall card1-wide">
    <div data-filter="menu" className="cardCompleto imgSize sfondoCompleto sfondoMenuPdf ">
      <a className="button posTestomenudw" href={PDF} download="MenuAngoloDabruzzo.pdf" rel="noopener" style={{ color: "black" }}>SCARICA IL MENU COMPLETO</a>
    </div>
  </div>

  <div className="row photo-grid rowCompleto card1-tall card1-wide">
    <div data-filter="menu" className="cardCompleto imgSize sfondoChef" style={{ position: "relative" }}>
      <button className="button" onClick={filtra} value="chef" aria-label="Mostra i piatti consigliati dallo chef" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "transparent", border: "none" }}></button>
      <span>LO CHEF CONSIGLIA</span>
    </div>
  </div>

  <div className="row photo-grid card1-tall card1-wide">
    <div data-filter="menu" className="card1 imgSize" style={{ backgroundImage: `url(${pane})`, position: "relative" }}>
      <button ref={ref} className="button" onClick={filtra} value="antipasto" aria-label="Filtra: Antipasto" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "transparent", border: "none" }}></button>
      <span>ANTIPASTO</span>
    </div>
    <div data-filter="menu" className="card1 imgSize" style={{ backgroundImage: `url(${carbonara})`, position: "relative" }}>
      <button className="button" onClick={filtra} value="primo" aria-label="Filtra: Primo" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "transparent", border: "none" }}></button>
      <span>PRIMO</span>
    </div>
    <div data-filter="menu" className="card1 imgSize" style={{ backgroundImage: `url(${carne})`, position: "relative" }}>
      <button className="button" onClick={filtra} value="secondo" aria-label="Filtra: Secondo" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "transparent", border: "none" }}></button>
      <span>SECONDO</span>
    </div>
    <div data-filter="menu" className="card1 imgSize" style={{ backgroundImage: `url(${patate})`, position: "relative" }}>
      <button className="button" onClick={filtra} value="contorno" aria-label="Filtra: Contorno" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "transparent", border: "none" }}></button>
      <span>CONTORNO</span>
    </div>
  </div>
  <div className="row photo-grid card1-tall card1-wide">
    <div data-filter="menu" className="card1 imgSize" style={{ backgroundImage: `url(${dolci})`, position: "relative" }}>
      <button className="button" onClick={filtra} value="dolci" aria-label="Filtra: Dolci" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "transparent", border: "none" }}></button>
      <span>DOLCI</span>
    </div>
    <div data-filter="menu" className="card1 imgSize" style={{ backgroundImage: `url(${frutta})`, position: "relative" }}>
      <button className="button" onClick={filtra} value="frutta" aria-label="Filtra: Frutta" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "transparent", border: "none" }}></button>
      <span>FRUTTA</span>
    </div>
    <div data-filter="menu" className="card1 imgSize" style={{ backgroundImage: `url(${acqua})`, position: "relative" }}>
      <button className="button" onClick={filtra} value="bevande" aria-label="Filtra: Bevande" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "transparent", border: "none" }}></button>
      <span>BEVANDE</span>
    </div>
    <div data-filter="menu" className="card1 imgSize" style={{ backgroundImage: `url(${vino})`, position: "relative" }}>
      <button className="button" onClick={filtra} value="vino" aria-label="Filtra: Vino" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "transparent", border: "none" }}></button>
      <span>VINO</span>
    </div>
  </div>
</div>


          {/*MENU*/}
          <div className='clearfix sfondoMenu'>
            <div className="container-fluid">
              {state.map((menu, index) => (
                <MenuLista key={menu.id !== undefined ? menu.id : `sep-${index}`} menu={menu} sezione={menu.sezione} />
              ))}
            </div>
          </div>
          <section id="galleria"></section>
          <Titoli title="GALLERIA" />
          <GalleriaImmagini />
          <section id="contatti"></section>
          <Titoli1 title="CONTATTI" />
          <Contatti />
          </main>
          <div className="container-fluid footer"><Footer /></div>
        </div>
      }
    
    </Router>
  );
}

export default App;