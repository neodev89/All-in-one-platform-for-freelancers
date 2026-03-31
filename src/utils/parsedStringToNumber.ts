interface parsedStringToNumberFuncProps {
    stringa: string | string[];
}

export const parsedStringToNumber = (props: parsedStringToNumberFuncProps): number[] | number => {
    if (Array.isArray(props.stringa)) {
        const parsed = props.stringa.map((el) => {
            const newEl = Number(el.trim().replace(",", "."));
            return newEl;
        });
        return parsed;
    } else {
        const parsedEl = Number(props.stringa.replace(",", "."));
        return parsedEl;
    }
};