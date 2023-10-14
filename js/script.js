/* SCRIPT.JS */

// TÄMÄ KOODI SUORITETAAN, KUN KOKO DOKUMENTTI ON LATAUTUNUT
document.addEventListener('DOMContentLoaded', function () {
    registerEventListeners();
    updateSummary();
});

function registerEventListeners() {
    // ETSITÄÄN DOKUMENTISTA LOMAKE JA RESET-NAPPI
    const timeForm = document.getElementById('timeForm');
    const resetButton = document.getElementById('resetButton');

    // LISÄTÄÄN LOMAKKEELLE JA RESET-NAPILLE TAPAHTUMANKUUNTELIJAT
    timeForm.addEventListener('submit', handleFormSubmit);
    resetButton.addEventListener('click', handleResetButtonClick);
}

function handleFormSubmit(e) {
    // ESTETÄÄN LOMAKKEEN OLETUSTOIMINTO (LÄHETYS)
    e.preventDefault();

    // HAETAAN KÄYTTÄJÄN SYÖTTÄMÄT ARVOT
    const hours = parseFloat(document.getElementById('hours').value);
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    // TEHDÄÄN TARKISTUKSET SYÖTETYILLE ARVOILLE
    if (isNaN(hours) || hours <= 0 || description === '' || category === '') {
        alert("Tarkista tuntimäärä, kuvaus ja kategoria!");
        return;
    }

    // HAETAAN TIEDOT LOCALSTORAGESTA JA LISÄTÄÄN UUSI MERKINTÄ
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push({ hours, description, category });
    localStorage.setItem('entries', JSON.stringify(entries));

    // PÄIVITETÄÄN YHTEENVETO JA TYHJENNÄ LOMAKE
    updateSummary();
    e.target.reset();
}

function handleResetButtonClick() {
    // KYSYTÄÄN VARMISTUS KÄYTTÄJÄLTÄ ENNEN TIETOJEN POISTAMISTA
    if (confirm("Haluatko varmasti tyhjentää kaikki tiedot?")) {
        // POISTETAAN TIEDOT LOCALSTORAGESTA JA PÄIVITETÄÄN YHTEENVETO
        localStorage.removeItem('entries');
        updateSummary();
    }
}

// MÄÄRITYS KATEGORIATUNNUSTEN JA KÄYTTÄJÄLLE NÄKYVIEN KATEGORIANIMIEN VÄLILLÄ
const categoryMapping = {
    work: 'Työ',
    study: 'Opiskelu',
    exercise: 'Liikunta',
    rest: 'Lepo'
};

// ETSITÄÄN SELECT-ELEMENTTI ID:N PERUSTEELLA
const categorySelect = document.getElementById('category');

// LISÄTÄÄN "VALITSE KATEGORIA" OLETUSARVONA VALIKKOON
const defaultOption = document.createElement('option');
defaultOption.value = '';
defaultOption.text = 'Valitse kategoria';
categorySelect.appendChild(defaultOption);

// LISÄTÄÄN MUUT VAIHTOEHDOT VALIKKOON
for (const category in categoryMapping) {
    const option = document.createElement('option');
    option.value = category;
    option.text = categoryMapping[category];
    categorySelect.appendChild(option);
}

function updateSummary() {
    // HAETAAN KAIKKI TALLENNUKSET LOCALSTORAGESTA
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    // HAETAAN "SUMMARY" ELEMENTTI
    const summaryDiv = document.getElementById('summary');
    // TYHJENNETÄÄN "SUMMARY" ELEMENTIN SISÄLTÖ
    summaryDiv.innerHTML = "";

    let summary = {};

    // KÄY LÄPI JOKAINEN TALLENNETTU MERKINTÄ JA LASKE YHTEENVETO
    entries.forEach(entry => {
        summary[entry.category] = summary[entry.category] || { hours: 0, descriptions: [] };
        summary[entry.category].hours += entry.hours;
        summary[entry.category].descriptions.push(entry.description);
    });

    // NÄYTTÄÄ TAI PIILETTÄÄ YHTEENVETO SEN MUKAAN, ONKO TALLETUKSIA
    if (entries.length > 0) {
        summaryDiv.style.display = "block";

        // KÄY LÄPI JOKAINEN KATEGORIA JA LISÄÄ NE "SUMMARY" ELEMENTTIIN
        for (const category in summary) {
            const pCategory = document.createElement('p');
            pCategory.textContent = `Kategoria: ${categoryMapping[category]}`;
            summaryDiv.appendChild(pCategory);

            // LISÄTÄÄN KUVAUKSET, JOS NE OVAT OLEMASSA
            if (summary[category].descriptions.length > 0) {
                const pDescriptions = document.createElement('p');
                pDescriptions.textContent = `Kuvaus: ${summary[category].descriptions.join(', ')}`;
                summaryDiv.appendChild(pDescriptions);
            }
        }
    } else {
        // PIILLOTTAA "SUMMARY" ELEMENTIN, JOS TALLETUKSIA EI OLE
        summaryDiv.style.display = "none";
    }
}
