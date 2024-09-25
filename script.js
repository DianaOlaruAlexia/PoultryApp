const symptoms = [
    'Gasping, coughing, and sneezing',
    'Nasal discharge',
    'Reduced feed intake',
    'Drop in egg production and egg quality',
    'Bloody diarrhea',
    'Ruffled feathers and lethargy',
    'Mortality',
    'Restlessness and pecking'
];

const availableSymptoms = document.getElementById('available-symptoms');
const selectedSymptoms = document.getElementById('selected-symptoms');
const placeholder = document.getElementById('placeholder');
const submitBtn = document.getElementById('submit-btn');
const responseArea = document.getElementById('response-area');

// Populate available symptoms
symptoms.forEach((symptom, index) => {
    const li = document.createElement('div');
    li.textContent = symptom;
    li.className = `symptom-item color-${index % 4}`;
    li.draggable = true;
    li.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', symptom);
    });
    availableSymptoms.appendChild(li);
});

// Handle drag and drop
selectedSymptoms.addEventListener('dragover', (e) => e.preventDefault());
selectedSymptoms.addEventListener('drop', (e) => {
    e.preventDefault();
    const symptom = e.dataTransfer.getData('text');
    if (!Array.from(selectedSymptoms.children).some(child => child.textContent.includes(symptom))) {
        addSymptom(symptom);
    }
});

function addSymptom(symptom) {
    const div = document.createElement('div');
    div.className = `selected-symptom color-${symptoms.indexOf(symptom) % 4}`;
    div.innerHTML = `
        <span>${symptom}</span>
        <button class="remove-btn" onclick="this.parentElement.remove(); updatePlaceholder();">×</button>
    `;
    selectedSymptoms.appendChild(div);
    updatePlaceholder();
}

function updatePlaceholder() {
    placeholder.style.display = selectedSymptoms.children.length > 1 ? 'none' : 'block';
}

// Handle form submission
submitBtn.addEventListener('click', async () => {
    const poultryType = document.getElementById('poultry-type').value;
    const selectedSymptomsList = Array.from(selectedSymptoms.children)
        .filter(child => child.className.includes('selected-symptom'))
        .map(child => child.firstElementChild.textContent);

    if (!poultryType || selectedSymptomsList.length === 0) {
        alert('Please select a poultry type and at least one symptom.');
        return;
    }

    // Replace this with your actual API call
    const mockResponse = await mockApiCall(poultryType, selectedSymptomsList);
    displayResponse(mockResponse);
});

async function mockApiCall(poultryType, symptoms) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock response
    return `Based on the symptoms for ${poultryType}, possible illnesses include:
1. Avian Influenza
2. Newcastle Disease
3. Infectious Bronchitis`;
}

function displayResponse(response) {
    const illnesses = response.split('\n').slice(1);
    const html = `
        <h2>Possible Illnesses:</h2>
        <ul>
            ${illnesses.map(illness => `<li><a href="#${illness.split('.')[1].trim()}">${illness.trim()}</a></li>`).join('')}
        </ul>
    `;
    responseArea.innerHTML = html;
}
