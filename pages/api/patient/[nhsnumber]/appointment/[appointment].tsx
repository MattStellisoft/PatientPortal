import { appointments } from "../../../../../testing/data/testData";

export default function handler(req, res) {
    if (typeof appointments[req.query?.appointment] != "undefined") {
        res.status(200).json({
            appointment: appointments[req.query?.appointment],
            statusCode: 200,
        });
    } else {
        res.status(200).json({
            appointment: {},
            statusCode: 204,
        });
    }
}
