import { patientData } from "../../../testing/data/testData";

export default function handler(req, res) {
    if (
        req.method == "GET" &&
        req.query?.nhsnumber &&
        patientData[req.query.nhsnumber]
    ) {
        return res.status(200).json({
            patient: patientData[req.query.nhsnumber],
        });
    } else if (
        req.method == "GET" &&
        req.query?.nhsnumber &&
        typeof patientData[req.query.nhsnumber] == "undefined"
    ) {
        res.status(400).json({
            error: "We are unable to locate your patient record at this time.",
        });
    }
    if (req.method == "POST") {
        patientData[req.query.nhsnumber].MobileNumber = req.body.phoneNumber;
        patientData[req.query.nhsnumber].Email = req.body.email;
        res.status(200).json({ profile: patientData[req.query.nhsnumber] });
    } else {
        res.status(400).json({
            error: "We are unable to update your patient record at this time.",
        });
    }
}
