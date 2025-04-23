const bookmarkInput = document.getElementById('bookmarkInput');
        const addBookmarkBtn = document.getElementById('addBookmarkBtn');
        const bookmarkList = document.getElementById('bookmarkList');
        const localStorageKey = 'bookmarks';
        let bookmarks = loadBookmarks();

        renderBookmarks();

        addBookmarkBtn.addEventListener('click', addBookmark);

        function loadBookmarks() {
            const storedBookmarks = localStorage.getItem(localStorageKey);
            return storedBookmarks ? JSON.parse(storedBookmarks) : [];
        }

        function saveBookmarks() {
            localStorage.setItem(localStorageKey, JSON.stringify(bookmarks));
        }

        function renderBookmarks() {
            bookmarkList.innerHTML = '';
            bookmarks.forEach((bookmark, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <a href="${bookmark}" target="_blank">${bookmark}</a>
                    <div class="bookmark-actions">
                        <button class="edit" data-index="${index}">Редагувати</button>
                        <button class="delete" data-index="${index}">Видалити</button>
                    </div>
                `;
                bookmarkList.appendChild(listItem);
            });

            // Додаємо обробники подій для кнопок "Видалити" та "Редагувати" після їх рендерингу
            const deleteButtons = document.querySelectorAll('.delete');
            deleteButtons.forEach(button => {
                button.addEventListener('click', deleteBookmark);
            });

            const editButtons = document.querySelectorAll('.edit');
            editButtons.forEach(button => {
                button.addEventListener('click', showEditInput);
            });
        }

        function addBookmark() {
            const url = bookmarkInput.value.trim();
            if (url) {
                bookmarks.push(url);
                saveBookmarks();
                renderBookmarks();
                bookmarkInput.value = '';
            }
        }

        function deleteBookmark(event) {
            const indexToDelete = parseInt(event.target.dataset.index);
            bookmarks.splice(indexToDelete, 1);
            saveBookmarks();
            renderBookmarks();
        }

        function showEditInput(event) {
            const listItem = event.target.parentNode.parentNode;
            const bookmarkIndex = parseInt(event.target.dataset.index);
            const currentUrl = bookmarks[bookmarkIndex];

            listItem.innerHTML = `
                <div class="edit-input-container">
                    <input type="text" value="${currentUrl}" id="editInput-${bookmarkIndex}">
                    <button class="save-edit" data-index="${bookmarkIndex}">Зберегти</button>
                    <button class="cancel-edit" data-index="${bookmarkIndex}">Скасувати</button>
                </div>
            `;

            const saveButton = listItem.querySelector('.save-edit');
            const cancelButton = listItem.querySelector('.cancel-edit');
            const editInput = listItem.querySelector(`#editInput-${bookmarkIndex}`);

            saveButton.addEventListener('click', () => saveEditedBookmark(bookmarkIndex, editInput.value));
            cancelButton.addEventListener('click', renderBookmarks);
        }

        function saveEditedBookmark(index, newUrl) {
            if (newUrl.trim()) {
                bookmarks[index] = newUrl.trim();
                saveBookmarks();
                renderBookmarks();
            }
        }