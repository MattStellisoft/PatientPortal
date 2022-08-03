module.exports = {
    i18n: {
        /**
         * Provide the locales you want to support in your application
         */
        locales: ["en-GB", "fr-FR", "es-ES"],
        /**
         * This is the default locale you want to be used when visiting
         * a non-locale prefixed path e.g. `/hello`
         */
        defaultLocale: "en-GB",
        localeDetection: true,
    },
    webpack: (config) => {
        // load worker files as a urls by using Asset Modules
        // https://webpack.js.org/guides/asset-modules/
        config.module.rules.unshift({
            test: /pdf\.worker\.(min\.)?js/,
            type: "asset/resource",
            generator: {
                filename: "static/worker/[hash][ext][query]",
            },
        });

        return config;
    },
};
