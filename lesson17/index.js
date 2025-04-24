const apiKey = '49368370-1578476699fff1bb36ccd90bb'; // Замініть на свій API-ключ Pixabay
const imageGallery = document.getElementById('image-gallery');
const loadMoreBtn = document.getElementById('load-more-btn');
const perPage = 9; // Кількість зображень на одній сторінці
let currentPage = 1;

async function fetchImages(page) {
    const url = `https://pixabay.com/api/?key=${apiKey}&editors_choice=true&per_page=${perPage}&page=${page}`;

    const response = await fetch(url);

    if (!response.ok) {
        console.error(`Помилка завантаження зображень. Статус: ${response.status}`);
        imageGallery.innerHTML = `<p>Виникла помилка при завантаженні зображень (код помилки: ${response.status}).</p>`;
        loadMoreBtn.style.display = 'none';
        return;
    }

    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
        displayImages(data.hits);
        if (data.totalHits <= page * perPage) {
            loadMoreBtn.style.display = 'none'; // Приховати кнопку, якщо всі зображення завантажено
        } else {
            loadMoreBtn.style.display = 'block';
        }
    } else if (page === 1) {
        imageGallery.innerHTML = '<p>Не знайдено зображень за вашим запитом.</p>';
        loadMoreBtn.style.display = 'none';
    }
}

function displayImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        imgElement.alt = image.tags;
        imageGallery.appendChild(imgElement);
    });
}

function loadMoreImages() {
    currentPage++;
    fetchImages(currentPage);
}

loadMoreBtn.addEventListener('click', loadMoreImages);

// Завантаження першої сторінки зображень при завантаженні сторінки
fetchImages(currentPage);