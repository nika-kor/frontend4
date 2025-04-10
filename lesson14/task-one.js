


function delayedPromise(value, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, delay);
    });
}

const promises = [
    delayedPromise(1, 1000),
    delayedPromise(2, 2000),
    delayedPromise(3, 3000),
    delayedPromise(4, 4000),
    delayedPromise(5, 5000)
]

Promise.all(promises).then((values) => {
    console.log(values);
})










