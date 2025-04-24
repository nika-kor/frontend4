import debounce from 'lodash.debounce';
import { error, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import countryListTemplate from './templates/country-list.hbs';
import countryInfoTemplate from './templates/country-info.hbs';
import fetchCountries from './fetchCountries';

const searchInput = document.querySelector('#country-input');
const countryListContainer = document.querySelector('.country-list');
const countryInfoContainer = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 500;

function clearMarkup() {
  countryListContainer.innerHTML = '';
  countryInfoContainer.innerHTML = '';
}

function displayCountriesList(countries) {
  const markup = countryListTemplate(countries);
  countryListContainer.innerHTML = markup;
}

function displayCountryInfo(country) {
  const markup = countryInfoTemplate(country);
  countryInfoContainer.innerHTML = markup;
}

function handleSearchResults(countries) {
  if (countries.length > 10) {
    info({
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
    error({
      text: 'Країну не знайдено.',
      delay: 2000,
    });
    clearMarkup();
  }
}

function onSearchInput(event) {
  const searchQuery = event.target.value.trim();

  if (searchQuery) {
    fetchCountries(searchQuery)
      .then(handleSearchResults)
      .catch(err => {
        console.error('Помилка отримання даних:', err);
        error({
          text: 'Помилка отримання даних.',
          delay: 2000,
        });
        clearMarkup();
      });
  } else {
    clearMarkup();
  }
}

searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));