
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

const myInput = document.querySelector(".search");
const output = document.querySelector(".suggestions");

myInput.addEventListener("input", filterCities); 

// Functions

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

getData(endpoint)
    .then((dataReceived) => cities.push(...dataReceived));
    // Above
    // Using ES6 spread operator instead of looping through the list and adding every item to the cities Array

function filterCities() {
    const inputData = this.value.toLowerCase();
    const regex = new RegExp(inputData, 'gi'); // Global and Case Insensitive

    // Get cities that match the input value    
    let filteredByInputData = cities.filter((item) => {
        const city = item.city.toLowerCase();
        const state = item.state.toLowerCase();
        return city.includes(inputData) || state.includes(inputData);
    });

    const html = filteredByInputData.map(item => {
        const cityName = item.city.replace(regex, `<span class="hl">${inputData}</span>`);
        const stateName = item.state.replace(regex, `<span class="hl">${inputData}</span>`);
        return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${item.population}</span>
        </li>
      `;
    });

    if(html.length !== 0) {
        output.innerHTML = html.join("");
    } else {
        output.innerHTML = `<li><span class="hl">${inputData}</span> Not Found</li>`;
    }   
};

