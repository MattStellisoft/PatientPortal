import fs from "fs";
import path from "path";
export function getLanguage(page, locale) {
    const languagesDirectory = path.join(
        process.cwd(),
        "/i18n/" + (locale || "en-GB") + "/"
    );
    const fullPath = path.join(languagesDirectory, `${page}.json`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    let languageData = JSON.parse(fileContents);
    return languageData;
}
