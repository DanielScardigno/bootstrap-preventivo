// HTML elements links
const form = document.getElementById("form");

// Input elements
const jobTypeElem = document.getElementById("jobType");

const promoCodeElem = document.getElementById("promo");
// End input elements

// ouput elements
const finalPriceElem = document.getElementById("finalPrice");
// End output elements

// Error elements
const jobTypeErrorElem = document.getElementById("jobTypeError");

const promoErrorElem = document.getElementById("promoError");
// End error elements
// End HTML elements links


// Bonus
const selectOptions = [
    {
        option: `<option selected>Seleziona il tipo di lavoro</option>`
    },

    {
        option: `<option aria-label="Sviluppo Backend">Sviluppo Backend</option>`
    },

    {
        option: `<option aria-label="Sviluppo Frontend">Sviluppo Frontend</option>`
    },

    {
        option: `<option aria-label="Analisi Progettuale">Analisi Progettuale</option>`
    }
];

for(let i = 0; i < selectOptions.length; i++) {
    const curOption = selectOptions[i].option;

    jobTypeElem.innerHTML += curOption;
}


// Event listener
form.addEventListener("submit", formHandler);


// Functions
function selectedJobType(jobTypeValue) {
    const workingHours = 10;
    const backEndPrice = 20.50 * workingHours;
    const frontEndPrice = 15.30 * workingHours;
    const analysisPrice = 33.60 * workingHours;
    let result;

    if (jobTypeValue === "Sviluppo Backend") {
        result = backEndPrice;
    } else if (jobTypeValue === "Sviluppo Frontend") {
        result = frontEndPrice;
    } else if (jobTypeValue === "Analisi Progettuale") {
        result = analysisPrice;
    }

    return result;
}

function getDecimals(number) {
    let numberStr = number.toString();
    let dot = numberStr.indexOf(".");
    let decimals = numberStr.substring(dot + 1, dot + 3);

    return decimals;
}

function formHandler(event) {
    event.preventDefault();

    if (jobTypeElem.value === "Seleziona il tipo di lavoro") {
        jobTypeErrorElem.innerText = "Selezion un tipo di lavoro"

        finalPriceElem.innerHTML = `Prezzo finale <br> <span class="fs-2">&euro; 0</span><span class="fw-medium text-secondary">,00</span>`
    } else {
        jobTypeErrorElem.innerText = ""

        const discount = selectedJobType(jobTypeElem.value) * 25 / 100;
        let finalResult;

        if (promoCodeElem.value === "YHDNU32" || promoCodeElem.value === "JANJC63" || promoCodeElem.value === "PWKCN25" || promoCodeElem.value === "SJDPO96" || promoCodeElem.value === "POCIE24") {
            promoErrorElem.innerText = ""

            finalResult = selectedJobType(jobTypeElem.value) - discount;

            finalPriceElem.innerHTML = `Prezzo finale <br> <span class="fs-2">&euro; ${parseInt(finalResult)}</span><span class="fw-medium text-secondary">,${getDecimals(finalResult)}</span>`;

        } else if (promoCodeElem.value === "") {
            promoErrorElem.innerText = ""

            finalResult = selectedJobType(jobTypeElem.value);

            finalPriceElem.innerHTML = `Prezzo finale <br> <span class="fs-2">&euro; ${parseInt(finalResult)}</span><span class="fw-medium text-secondary">,${getDecimals(finalResult)}</span>`;

        } else {
            finalResult = selectedJobType(jobTypeElem.value);

            finalPriceElem.innerHTML = `Prezzo finale <br> <span class="fs-2">&euro; ${parseInt(finalResult)}</span><span class="fw-medium text-secondary">,${getDecimals(finalResult)}</span>`;

            promoErrorElem.innerText = "Il codice promozionale è scaduto o invalido - lo sconto non verrà applicato"
        }        
    }
}