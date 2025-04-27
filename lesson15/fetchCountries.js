export default function fetchCountries(searchQuery) {
    const BASE_URL = 'https://restcountries.com/v3.1';
    const ENDPOINT = '/name';
    const fields = 'fields=name,capital,population,flags,languages';
  
    return fetch(`${BASE_URL}${ENDPOINT}/${searchQuery}/?${fields}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      });
  }