import { nanoid } from "nanoid";
import { patientData } from "../../../testing/data/testData";
import Cookies from "cookies";
export default function handler(req, res) {
    if (
        req.body?.nhs_number &&
        typeof patientData[req.body.nhs_number] != 'undefined'
    ) {
        //create session (see below)  
        //return session id in response
        return res.status(200).json({
            sessionId: nanoid(),
        });
    }
    // //check patient is registered
    // const isExisting = checkPatientExists();
    // if (isExisting) {
    //     //verify consent (need to read up on IM1 or ask the question to NHS Login)
    //     if (IM1consent(req.body.nhs_number) == true) {
    //         return;
    //     }
    // } else {
    //     //verify age
    //     if (calculateAgeInYears(req.body.dob) < 18) {
    //         return;
    //     }
    //     //verify eligibility to access our service based upon location
    //     if (postcodes.includes(req.body.postcode) == false) {
    //         return;
    //     }
    // }
    //  //create a session id
    // const session = {
    //     session_id: nanoid(),
    //     nhs_number: req.body.nhs_number,
    //     last_access: new Date().toTimeString(),
    //     ip_address: req
    // };
    res.status(400).json({
        error: "We are unable to update your patient record at this time.",
    });
}