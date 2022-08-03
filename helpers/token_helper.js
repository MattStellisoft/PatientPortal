import fs from "fs";
const jwt = require("jsonwebtoken");
import { nanoid } from "nanoid";
import path from "path";

const GenerateAssertionJwt = function () {
    if (process.env.NEXT_VERCEL == "true") {
        // In order to serve on Vercel you will need to perform this abysmal workaround to read the private key.
        const dirRelativeToPublicFolder = "./keys/private_key.pem";
        const dir = path.resolve("./public", dirRelativeToPublicFolder);
        var privateKey = fs.readFileSync(dir, "utf8");
    } else {
        var privateKey = fs.readFileSync("./keys/private_key.pem", "utf8");
    }
    const signOptions = {
        issuer: process.env.NEXT_NHSLOGIN_CLIENT_ID,
        subject: process.env.NEXT_NHSLOGIN_CLIENT_ID,
        audience: process.env.NEXT_NHSLOGIN_TOKEN_URI,
        expiresIn: "30m",
        algorithm: "RS512",
    };
    return jwt.sign({ jti: nanoid() }, privateKey, signOptions);
};

export default GenerateAssertionJwt;
