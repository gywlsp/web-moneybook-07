const throttle = (callback, delay) => {
    let timerId = null;
    return (event) => {
        if (timerId) return;
        timerId = setTimeout(() => {
            callback(event);
            timerId = null;
        }, delay);
    };
};

export default throttle