import React from "react";
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite } from '@fortawesome/free-solid-svg-icons';

function Cookie() {
    const [show, setShow] = useState(false);
    const fullscreen = true;


    return ( 
        <>
        <button className="coloreCookie" type="button" onClick={() => setShow(true)}>
        <FontAwesomeIcon icon={faCookieBite} size="2x"  />
         </button>
  
   

        <Modal
          
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w fade-left"
          aria-labelledby="example-custom-modal-styling-title"
          animation={true}
        >
        
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Cookie Policy
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >

          <p>

<b>Ultimo aggiornamento 3 febbraio 2024</b>

<p>Questa Politica sui Cookie spiega come Da Giannino L'angolo Dabruzzo ("Azienda," "noi," "ci," e "nostro") utilizza i cookie e tecnologie simili per riconoscerti quando visiti il nostro sito web su https://www.da-giannino-langolo-dabruzzo.it ("Sito Web"). Illustra cosa sono queste tecnologie e perché le utilizziamo, nonché i tuoi diritti per controllarne l'uso.

In alcuni casi, potremmo utilizzare i cookie per raccogliere informazioni personali o che diventano tali se combinate con altre informazioni.</p>

<h4>Cos'è un cookie?</h4>

<p>I cookie sono piccoli file di dati che vengono posizionati sul tuo computer o dispositivo mobile quando visiti un sito web. I cookie sono ampiamente utilizzati dai proprietari dei siti web per far funzionare i loro siti, o per farli funzionare in modo più efficiente, e per fornire informazioni di reportistica.

I cookie impostati dal proprietario del sito web (in questo caso, Da Giannino L'angolo Dabruzzo) sono chiamati "cookie di prima parte". I cookie impostati da parti diverse dal proprietario del sito web sono chiamati "cookie di terze parti". I cookie di terze parti consentono di fornire funzionalità o contenuti di terze parti sul sito web (ad esempio, pubblicità, contenuti interattivi e analisi). Le parti che impostano questi cookie di terze parti possono riconoscere il tuo computer sia quando visita il sito web in questione che quando visita determinati altri siti web.</p>

<h4>Perché utilizziamo i cookie?</h4>

<p>Utilizziamo cookie di prima e terza parte per diverse ragioni. Alcuni cookie sono necessari per ragioni tecniche affinché il nostro sito web funzioni, e li chiamiamo "essenziali" o "strettamente necessari". Altri cookie ci consentono anche di tracciare e mirare agli interessi dei nostri utenti per migliorare l'esperienza sulle nostre proprietà online. Terze parti servono cookie attraverso il nostro sito web per pubblicità, analisi e altri scopi. Questo è descritto in dettaglio di seguito.</p>

<h4>Come posso controllare i cookie?</h4>

<p>"Poiché utilizziamo solo cookie essenziali per fornirti i nostri servizi, non è possibile rifiutarli. Questi cookie sono strettamente necessari per il funzionamento del sito web e non richiedono il tuo consenso. Il Gestore del Consenso ai Cookie non è disponibile poiché non vi è la necessità di selezionare categorie di cookie da accettare o rifiutare. Se scegli di rifiutare i cookie, comprendi che potresti incontrare limitazioni nell'accesso a determinate funzionalità del nostro sito web. Puoi comunque impostare o modificare i controlli del tuo browser web per accettare o rifiutare tutti i cookie."</p>

<h4>Cookie non classificati</h4>
Si tratta di cookie che non sono ancora stati categorizzati. Stiamo attualmente classificando questi cookie con l'aiuto dei loro fornitori.

<table>
    <tr>
        <td>Nome:</td>
        <td>isFirstVisit</td>
    </tr>
    <tr>
        <td>Scopo:</td>
        <td>__________</td>
    </tr>
    <tr>
        <td>Fornitore:</td>
        <td>da-giannino-langolo-dabruzzo.it</td>
    </tr>
    <tr>
        <td>Servizio:</td>
        <td>__________</td>
    </tr>
    <tr>
        <td>Paese:</td>
        <td>Paesi Bassi</td>
    </tr>
    <tr>
        <td>Tipo:</td>
        <td>http_cookie</td>
    </tr>
    <tr>
        <td>Scade in:</td>
        <td>29 giorni</td>
    </tr>
</table>



<h4>Come posso controllare i cookie sul mio browser?</h4>

<p>Poiché i mezzi con cui puoi rifiutare i cookie attraverso i controlli del tuo browser web variano da browser a browser, dovresti consultare il menu di aiuto del tuo browser per ulteriori informazioni. Di seguito trovi informazioni su come gestire i cookie sui browser più popolari:</p>
<ul>
    <li><a className='cookiea' href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies" target="_blank" rel="noreferrer">Chrome</a></li>
    <li><a className='cookiea' href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noreferrer">Internet Explorer</a></li>
    <li><a className='cookiea' href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US" target="_blank" rel="noreferrer">Firefox</a></li>
    <li><a className='cookiea' href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">Safari</a></li>
    <li><a className='cookiea' href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noreferrer">Edge</a></li>
    <li><a className='cookiea' href="https://help.opera.com/en/latest/web-preferences/" target="_blank" rel="noreferrer">Opera</a></li>
</ul>


<p>Inoltre, la maggior parte delle reti pubblicitarie ti offre un modo per escludere la pubblicità mirata. Se desideri ottenere ulteriori informazioni, visita:</p>
<ul>
    <li><a className='cookiea' href="https://optout.aboutads.info/?c=2&lang=EN" target="_blank" rel="noreferrer">Digital Advertising Alliance</a></li>
    <li><a className='cookiea' href="https://youradchoices.ca/" target="_blank" rel="noreferrer">Digital Advertising Alliance of Canada</a></li>
    <li><a className='cookiea' href="https://youronlinechoices.com/" target="_blank" rel="noreferrer">European Interactive Digital Advertising Alliance</a></li>
</ul>


<h4>Cosa succede con altre tecnologie di tracciamento, come i web beacon?</h4>

<p>I cookie non sono l'unico modo per riconoscere o tracciare i visitatori di un sito web. Di tanto in tanto, potremmo utilizzare altre tecnologie simili, come i web beacon (a volte chiamati "pixel di tracciamento" o "clear gif"). Si tratta di piccoli file grafici che contengono un identificatore univoco che ci consente di riconoscere quando qualcuno ha visitato il nostro sito web o aperto una email contenente tali file. Ciò ci permette, ad esempio, di monitorare i modelli di traffico degli utenti da una pagina all'altra di un sito web, di fornire o comunicare con i cookie, di capire se sei arrivato al sito web da una pubblicità online visualizzata su un sito web di terze parti, di migliorare le prestazioni del sito e di misurare il successo delle campagne di marketing via email. In molti casi, queste tecnologie dipendono dai cookie per funzionare correttamente e quindi il rifiuto dei cookie ne comprometterà il funzionamento.</p>

<h4>Utilizzate anche i cookie Flash o gli Oggetti Locali Condivisi?</h4>

<p>I siti web possono anche utilizzare i cosiddetti "cookie Flash" (noti anche come Oggetti Locali Condivisi o "LSO") per, tra le altre cose, raccogliere e memorizzare informazioni sull'uso dei nostri servizi, prevenire frodi e per altre operazioni del sito.

Si noti che impostare il lettore Flash per limitare o limitare l'accettazione dei cookie Flash può ridurre o impedire il funzionamento di alcune applicazioni Flash, comprese, potenzialmente, le applicazioni Flash utilizzate in connessione con i nostri servizi o contenuti online.</p>

<h4>Servite pubblicità mirata?</h4>

<p>"Terze parti potrebbero servire cookie sul tuo computer o dispositivo mobile per erogare pubblicità attraverso il nostro sito web. Tuttavia, desideriamo informarti che al momento il nostro sito non serve pubblicità mirata. Queste aziende potrebbero utilizzare informazioni sulle tue visite a questo e altri siti web per fornire annunci pertinenti su beni e servizi che potrebbero interessarti. Potrebbero anche utilizzare tecnologie che servono per misurare l'efficacia degli annunci. Possono fare ciò utilizzando cookie o web beacon per raccogliere informazioni sulle tue visite a questo e altri siti al fine di fornire annunci pertinenti su beni e servizi di potenziale interesse per te. Le informazioni raccolte attraverso questo processo non ci consentono né a loro di identificare il tuo nome, i dettagli di contatto o altri dettagli che ti identificano direttamente, a meno che tu scelga di fornirli."</p>
<h4>Quanto spesso aggiornate questa Politica sui Cookie?</h4>

<p>Potremmo aggiornare questa Politica sui Cookie di volta in volta per riflettere, ad esempio, modifiche ai cookie che utilizziamo o per altre ragioni operative, legali o regolamentari. Ti invitiamo quindi a rivedere regolarmente questa Politica sui Cookie per essere informato sull'uso dei cookie e delle tecnologie correlate.

La data in cima a questa Politica sui Cookie indica quando è stata aggiornata l'ultima volta.</p>

<h4>Dove posso ottenere ulteriori informazioni?</h4>

<p>Se hai domande sul nostro utilizzo dei cookie o su altre tecnologie, scrivici all'indirizzo angolodabruzzo@outlook.it o per posta a:</p>
<ul>
<li>Da Giannino L'angolo Dabruzzo</li>
<li>Via Rosolino Pilo, 20, 20129 Milano MI, Italia</li>
<li>Milano, Lombardia 20129</li>
<li>Italia</li>
<li>Telefono: (+39) 0229406526</li>
</ul>
<p>Questa politica sui cookie è stata creata utilizzando il Cookie Consent Manager di Termly.</p>
          </p>
          </Modal.Body>
        </Modal>
  
      </>
    );
  }


  export default Cookie;