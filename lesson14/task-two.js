
function randomDelay(value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, Math.floor(Math.random() * 4000) + 1000);
    });
}

const promises = [
    randomDelay(1),
    randomDelay(2),
    randomDelay(3),
    randomDelay(4),
    randomDelay(5)
]

Promise.race(promises).then((value) => {
    console.log(value);
})














