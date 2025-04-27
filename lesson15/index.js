
import fetchCountries from './fetchCountries.js';

const searchInput = document.querySelector('#country-input');
const countryListContainer = document.querySelector('.country-list');
const countryInfoContainer = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 500;

function clearMarkup() {
  countryListContainer.innerHTML = '';
  countryInfoContainer.innerHTML = '';
}

function countryListTemplate(countries) {
  return `<ul>${countries.map(country => `<li>${country.name.common}</li>`).join('')}</ul>`;
}

function displayCountriesList(countries) {
  const markup = countryListTemplate(countries);
  countryListContainer.innerHTML = markup;
}

function countryInfoTemplate(country) {
  return `<h2>${country.name.common}</h2>
  <div class="wrap">
  <div class="wrap-sec">
    <p><b>Столиця:</b> ${country.capital}</p>
    <p><b>Мови:</b> <ul>${Object.values(country.languages).map(language => `<li>${language}</li>`).join('')}</ul></p>
    <p><b>Популяція:</b> ${country.population}</p></div>
    <img src="${country.flags.svg}" alt="${country.name.common}">
  </div>`;
}

function displayCountryInfo(country) {
  const markup = countryInfoTemplate(country);
  countryInfoContainer.innerHTML = markup;
}

function handleSearchResults(countries) {
  console.log(countries);
  if (countries.length > 10) {
    PNotify.info({
      text: 'Занадто багато співпадінь. Будь ласка, введіть більш конкретний запит.',
      delay: 2000,
    });
    clearMarkup();
  } else if (countries.length >= 2 && countries.length <= 10) {
    displayCountriesList(countries);
    countryInfoContainer.innerHTML = '';
  } else if (countries.length === 1) {
    displayCountryInfo(countries[0]);
    countryListContainer.innerHTML = '';
  } else {
    // PNotify.error({
    //   text: 'Країну не знайдено.',
    //   delay: 2000,
    // });
    clearMarkup();
  }
}

function onSearchInput(event) {
  const searchQuery = event.target.value.trim();
console.log(searchQuery);
  if (searchQuery.length > 0) {
    fetchCountries(searchQuery)
      .then(handleSearchResults)
      .catch(err => {
        console.error('Помилка отримання даних:', err);
        PNotify.error({
          text: 'Помилка отримання даних.',
          delay: 2000,
        });
        clearMarkup();
      });
  } else {
    clearMarkup();
  }
}

searchInput.addEventListener('input', _.debounce(onSearchInput, DEBOUNCE_DELAY));