module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                blue: {
                    750: "#0081C7",
                    950: "#10284C",
                },
            },
            fontSize: {
                "1xs": ".5rem",
            },
            fontFamily: {
                gothamBook: ["gothamBook"],
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
