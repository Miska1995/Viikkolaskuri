# Viikkolaskuri
Projekti 1: DOM-skriptaus

(Yleistä infoa)

Julkistu netlify:ssä https://vikkolaskuri.netlify.app/

Koodit ovat pääasiassa kirjoitettu Englanniksi.

Tiedossa olevia asioita, jotka pitää korjata myöhemmin: Summary-lista ei sulkeudu automaattisesti, kun käyttäjä poistuu sivulta. 
summary-lista ei ole saman levyinen kuin Formi tabletin näytöllä (Samsung S3)
Meillä oli myös synkronointi ongelmia githubin kanssa. Joten kuvasimme tallenteemme Miskan VScode näkymästä.

(Lähteet)

Lähteinä olemme käyttäneet pääasiassa W3schoolia (https://www.w3schools.com/js/default.asp) sekä inspiraation kannalta myös ChatGPT:tä (https://chat.openai.com/)
Mitään koodia ei olla kuitenkaan suoraan kopioineet, vaan kaikkia ollan muunneltu oman näköiseksi. 
HTML,CSS ja Javascript koodien kommentit ovat ChatGPT:n "selkeyttämiä" 

HTML on 100% omaa työtä (kommentit lukuunottamatta)
Alla on CSS-tiedostossa olevat koodit, jotka olemme "napanneet" w3schoolista, jonka jälkeen hieman muunnellut itse miellyttävännän näköiseksi:

1) Animaatio
   
    opacity: 0; /* ALUKSI OTSIKKO ON NÄKYMÄTÖN */
    transform: translateY(-50px); /* ALUKSI OTSIKKO ON HIEMAN YLEMPÄNÄ */
    animation: slideIn 3s forwards; /* KÄYTETÄÄN ANIMAATIOTA */

2) Responsiivisyyden parannus
   
  /* === RESPONSIVISET TYYLIT === */
  @media only screen and (max-width: 768px) {
      form {
          max-width: 90%; /* Muutettu maksimileveys pienemmille näytöille */
      }
      input, select, button {
          font-size: 0.9rem; /* Pienennetty fonttikokoa pienemmille näytöille */
      }
  }

Alla javascript-tiedostossa koodeja, jotka otettu lähteistä.

1) Toiminto, joka piilottaa summary-listan jos siellä ei ole merkintöjä

   // NÄYTÄ TAI PIILOTA YHTEENVETO SEN MUKAAN, ONKO MERKINTÖJÄ
    if (entries.length > 0) {
        summaryDiv.style.display = "block";

2.) Tämä on osittai otettu ChatGPT:stä sekä opettajan näyttämästä mallista. eli localstorage (jota meille ei olla vielä opetettu)

function getEntriesFromLocalStorage() {
    // HAETAAN TALLENNUKSET LOCALSTORAGESTA TAI PALAUTETAAN TYHJÄ TAULUKKO
    return JSON.parse(localStorage.getItem('entries')) || [];
}

function setEntriesToLocalStorage(entries) {
    // TALLENNETAAN MERKINNÄT LOCALSTORAGEEN
    localStorage.setItem('entries', JSON.stringify(entries));
}

function clearLocalStorage() {
    // POISTETAAN MERKINNÄT LOCALSTORAGESTA
    localStorage.removeItem('entries');
}

function resetForm(form) {
    // TYHJENNETÄÄN LOMAKE
    form.reset();
}

// PÄIVITETÄÄN YHTEENVETO
function updateSummary() {
    // HAETAAN KAIKKI TALLENNUKSET "LOCALSTORAGESTA"
    const entries = getEntriesFromLocalStorage();
    // HAETAAN "SUMMARY" ELEMENTTI
    const summaryDiv = document.getElementById('summary');
    // TYHJENNETÄÄN "SUMMARY" ELEMENTIN SISÄLTÖ
    summaryDiv.innerHTML = "";
    
  let summary = {};

    
