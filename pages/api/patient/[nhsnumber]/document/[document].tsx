import { documents } from "../../../../../testing/data/testData";

export default function handler(req, res) {
    if (typeof documents[req.query?.document] != "undefined") {
        res.status(200).json({
            document: documents[req.query?.document],
        });
    }
}
