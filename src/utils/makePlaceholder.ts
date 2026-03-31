interface argProps {
    arg: string;
}

export const makePlaceholder = (props: argProps): string => {
    if (typeof props.arg !== 'string') {
        return String(props.arg);
    }
    const trimArg = props.arg.trim();
    const splitArg = trimArg.split("");
    const controlArg = splitArg.flatMap((el) => {
        let newEl = [];
        if (el === el.toUpperCase()) {
            newEl.push(" " + el.toLowerCase())
        } else {
            newEl.push(el);
        }
        return newEl;
    });
    let response = controlArg.join("");
    return response;
};