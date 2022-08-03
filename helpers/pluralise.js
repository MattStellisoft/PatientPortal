export function pluralise(val, word, plural = word + "s") {
    const _pluralise = (num, word, plural = word + "s") =>
        [1, -1].includes(Number(num)) ? word : plural;
    if (typeof val === "object")
        return (num, word) => _pluralise(num, word, val[word]);
    return _pluralise(val, word, plural);
}
