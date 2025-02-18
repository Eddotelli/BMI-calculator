let length = document.getElementById('length-input');
let weight = document.getElementById('weight-input');
let submit = document.getElementById('submit-btn');
let result = document.getElementById('bmi-value');
let metricValuesList = document.getElementById('metric-values');
let imperialValuesList = document.getElementById('imperial-values');
let toggleUnitsBtn = document.getElementById('toggle-units');
let u1 = document.getElementById('unit-1');
let u2 = document.getElementById('unit-2');

let isMetric = true; // Håller koll på vilket enhetssystem som används

// Lägger till en eventlyssnare på knappen för att växla mellan enhetssystem
toggleUnitsBtn.addEventListener('click', () => {
    isMetric = !isMetric;
    if (isMetric) {
        toggleUnitsBtn.textContent = 'Switch to Imperial';
        u1.textContent = 'cm';
        u2.textContent = 'kg';
    } else {
        toggleUnitsBtn.textContent = 'Switch to Metric';
        u1.textContent = 'inches';
        u2.textContent = 'lbs';
    }
});

// Lägger till en eventlyssnare på submit-knappen
submit.addEventListener('click', (event) => {

    event.preventDefault();

    try {
        // Kontrollerar att båda fälten är ifyllda
        if (!length.value || !weight.value) {
            throw new Error('Both fields must be filled out');
        }

        let bmi;
        if (isMetric) {
            // Beräknar BMI för metriska enheter
            bmi = weight.value / (length.value / 100 * length.value / 100);
        } else {
            // Beräknar BMI för imperiala enheter
            bmi = (weight.value / (length.value * length.value)) * 703;
        }
        
        // Visar det beräknade BMI-värdet
        result.textContent = bmi.toFixed(2);

        // Hämtar aktuellt datum och tid
        let now = new Date();
        let dateTime = now.toLocaleString(); // Formaterar datum och tid som en sträng

        // Lägger till värdet i listan med tid och datum
        let value = `Length: ${length.value} ${isMetric ? 'cm' : 'inches'}, Weight: ${weight.value} ${isMetric ? 'kg' : 'lbs'} || BMI: ${bmi.toFixed(2)} || Date: ${dateTime}`;
        let liBMI = document.createElement('li');
        liBMI.textContent = value;

        // Skapar en knapp med en "x"-symbol för att ta bort listobjektet
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'x';
        removeBtn.style.marginLeft = '10px';
        removeBtn.addEventListener('click', () => {
            if (isMetric) {
                metricValuesList.removeChild(liBMI);
            } else {
                imperialValuesList.removeChild(liBMI);
            }
        });

        // Lägger till knappen till listobjektet
        liBMI.appendChild(removeBtn);

        // Lägger till listobjektet till rätt lista
        if (isMetric) {
            metricValuesList.appendChild(liBMI);
        } else {
            imperialValuesList.appendChild(liBMI);
        }
    } catch (error) {
        alert(error.message); // Visar ett felmeddelande om något fält är tomt
    }
});