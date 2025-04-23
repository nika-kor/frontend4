function fetchCountries(searchQuery) {
    const apiUrl = `https://restcountries.com/v2/name/${searchQuery}`;
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
}

export default fetchCountries;