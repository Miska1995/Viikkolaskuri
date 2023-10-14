/* SCRIPT.JS */

// KUN KOKO DOKUMENTTI ON LATAUTUNUT
document.addEventListener('DOMContentLoaded', function () {
    // REKISTERÖIDÄÄN TAPAHTUMANKUUNTELIJÄT JA PÄIVITETÄÄN YHTEENVETO
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
    const hoursInput = document.getElementById('hours');
    const descriptionInput = document.getElementById('description');
    const categorySelect = document.getElementById('category');

    const hours = parseFloat(hoursInput.value);
    const description = descriptionInput.value;
    const category = categorySelect.value;

    // TARKISTETAAN, ETTEIVÄT SYÖTTEET OLE TYHJIÄ TAI KELVOTTOMIA
    if (isNaN(hours) || hours <= 0 || description === '' || category === '') {
        alert("Tarkista syötteet!");
        return;
    }

    // LUODAAN MERKINTÄ JA TALLENNETAAN SE LOCALSTORAGEEN
    const entry = { hours, description, category };
    const entries = getEntriesFromLocalStorage();
    entries.push(entry);
    setEntriesToLocalStorage(entries);

    // PÄIVITETÄÄN YHTEENVETO JA TYHJENNETÄÄN LOMAKE
    updateSummary();
    resetForm(e.target);
}

function handleResetButtonClick() {
    // KYSYTÄÄN VARMISTUS KÄYTTÄJÄLTÄ ENNEN TIETOJEN POISTAMISTA
    if (confirm("Haluatko varmasti tyhjentää kaikki tiedot?")) {
        // POISTETAAN TIEDOT LOCALSTORAGESTA JA PÄIVITETÄÄN YHTEENVETO
        clearLocalStorage();
        updateSummary();
    }
}

// MÄÄRITETÄÄN KATEGORIATUNNUSTEN JA KÄYTTÄJÄLLE NÄKYVIEN KATEGORIANIMIEN VÄLILLÄ
const categoryMapping = {
    work: 'Työ',
    study: 'Opiskelu',
    exercise: 'Liikunta',
    rest: 'Lepo'
};

// ETSITÄÄN SELECT-ELEMENTTI ID:N PERUSTEELLA
const categorySelect = document.getElementById('category');

// LISÄTÄÄN "VALITSE KATEGORIA" OLETUSARVONA VALIKKOON
addCategoryOption(categorySelect, '', 'Valitse kategoria');

// LISÄTÄÄN MUUT VAIHTOEHDOT VALIKKOON
for (const category in categoryMapping) {
    const optionValue = category;
    const optionText = categoryMapping[category];
    addCategoryOption(categorySelect, optionValue, optionText);
}

function addCategoryOption(selectElement, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    selectElement.appendChild(option);
}

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

function updateSummary() {
    // HAETAAN KAIKKI TALLENNUKSET "LOCALSTORAGESTA"
    const entries = getEntriesFromLocalStorage();
    // HAETAAN "SUMMARY" ELEMENTTI
    const summaryDiv = document.getElementById('summary');
    // TYHJENNETÄÄN "SUMMARY" ELEMENTIN SISÄLTÖ
    summaryDiv.innerHTML = "";

    let summary = {};

    // LUODAAN JA TÄYDENTÄÄ YHTEENVETO-OBJEKTIA KAIKILLA TALLENNETUILLA MERKINNÖILLÄ
    entries.forEach(entry => {
        summary[entry.category] = summary[entry.category] || { hours: 0, descriptions: [] };
        summary[entry.category].hours += entry.hours;
        summary[entry.category].descriptions.push(entry.description);
    });

    // NÄYTETÄÄN TAI PILOTETAAN YHTEENVETO SEN MUKAAN, ONKO MERKINTÖJÄ
    if (entries.length > 0) {
        summaryDiv.style.display = "block";

        // KÄYDÄÄN LÄPI JOKAINEN KATEGORIA JA LISÄTÄÄN NE "SUMMARY" ELEMENTTIIN
        for (const category in summary) {
            const pHours = document.createElement('p');
            pHours.textContent = `${categoryMapping[category]}: ${summary[category].hours} Tuntia`;
            summaryDiv.appendChild(pHours);

            // LISÄTÄÄN KUVAUKSET, JOS NE OVAT OLEMASSA
            if (summary[category].descriptions.length > 0) {
                const pDescriptions = document.createElement('p');
                pDescriptions.textContent = `Kuvaus: ${summary[category].descriptions.join(', ')}`;
                summaryDiv.appendChild(pDescriptions);
            }
        }
    } else {
        // PILOTETAAN "SUMMARY" ELEMENTTI, JOS MERKINTÖJÄ EI OLE
        summaryDiv.style.display = "none";
    }
}
