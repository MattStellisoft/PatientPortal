export function formatIsoDate(date) {
    return new Date(date)
        .toISOString()
        .split("-")
        .join("")
        .split(":")
        .join("")
        .slice(0, 15)
        .concat("Z");
}
