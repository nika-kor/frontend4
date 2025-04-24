

const messageElement = document.getElementById('message');
        const keyElement = document.getElementById('key');
        const newGameBtn = document.getElementById('newGameBtn');
        const keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];
        let currentKeyIndex = 0;

        function setNextKey() {
            if (currentKeyIndex < keys.length) {
                keyElement.textContent = keys[currentKeyIndex];
            } else {
                messageElement.textContent = 'Ви виграли! Натисніть "Нова гра", щоб почати знову.';
                keyElement.textContent = '';
                currentKeyIndex = 0;
            }
        }

        function startGame() {
            currentKeyIndex = 0;
            messageElement.textContent = 'Натисніть клавішу:';
            setNextKey();

            PNotify.success({ text: "Нова гра розпочалася!", delay: 200 });
        }

        document.addEventListener('keydown', function(event) {
            if (currentKeyIndex < keys.length) {
                if (event.key.toLowerCase() === keys[currentKeyIndex]) {
                    currentKeyIndex++;
                    setNextKey();
                } else  {
                    PNotify.error({ text: "Wrong key!", delay: 200 });
                }
                
            }
        });

        document.addEventListener('keypress', function(event) {
            event.preventDefault();
        });

        newGameBtn.addEventListener('click', startGame);

        startGame();