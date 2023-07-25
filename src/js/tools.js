const delegate = (selector, fn) => {
    return (e) => {
        if (e.target.matches(selector)) {
            fn(e);
        }
    }
}

const debounce = (fn, delay = 300) => {
    let timeout;
    return (e) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => fn(e), delay)
    }
}

export {
    delegate,
    debounce,
}
