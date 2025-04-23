// import { alert, notice, info, success, error } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';

// import fetchCountries from './fetchCountries';

const searchInput = document.querySelector('#searchInput');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const countryListItemTemplate = document.querySelector('#country-list-item');
const countryDetailsTemplate = document.querySelector('#country-details');

const renderCountryList = countries => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

    if (countries.length > 10) {
        notice({
            text: 'Занадто багато збігів. Будь ласка, уточніть свій запит.',
            delay: 2000,
        });
        return;
    }

    const listItems = countries.map(country => {
        const listItem = countryListItemTemplate.content.cloneNode(true);
        const img = listItem.querySelector('img');
        const span = listItem.querySelector('span');

        img.src = country.flags.svg;
        img.alt = `Прапор ${country.name}`;
        span.textContent = country.name;

        listItem.querySelector('li').addEventListener('click', () => {
            renderCountryDetails(country);
        });

        return listItem;
    });

    countryList.append(...listItems);
};

const renderCountryDetails = country => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

    const detailsCard = countryDetailsTemplate.content.cloneNode(true);
    detailsCard.querySelector('h2').textContent = country.name;
    detailsCard.querySelector('p:nth-child(2) span').textContent = country.capital;
    detailsCard.querySelector('p:nth-child(3) span').textContent = country.population.toLocaleString();
    detailsCard.querySelector('p:nth-child(4) span').textContent = country.languages.map(lang => lang.name).join(', ');
    detailsCard.querySelector('p:nth-child(5) span').textContent = country.currencies.map(curr => curr.name).join(', ');

    countryInfo.appendChild(detailsCard);
};

const handleSearchInput = event => {
    const searchQuery = event.target.value.trim();

    if (searchQuery) {
        fetchCountries(searchQuery)
            .then(countries => {
                if (countries.length > 0) {
                    if (countries.length === 1) {
                        renderCountryDetails(countries[0]);
                    } else {
                        renderCountryList(countries);
                    }
                } else {
                    error({
                        text: 'Країну не знайдено.',
                        delay: 2000,
                    });
                    countryList.innerHTML = '';
                    countryInfo.innerHTML = '';
                }
            })
            .catch(error => {
                console.error('Помилка при отриманні даних:', error);
                alert({
                    text: 'Виникла помилка при отриманні даних. Спробуйте пізніше.',
                    delay: 2000,
                });
                countryList.innerHTML = '';
                countryInfo.innerHTML = '';
            });
    } else {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
    }
};

searchInput.addEventListener('input', handleSearchInput);