export const timedEvent = (message, ...extraArgs) => {
    const start = new Date().getTime();
    const done = () => {
        const ms = new Date().getTime() - start;
        console.log(`%c${message} ${ms}ms / ${ms/1000}s`, 'font-size:16px;', ...extraArgs);
        return ms;
    };
    return done;
};
