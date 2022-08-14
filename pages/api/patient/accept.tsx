export default function handler(req, res) {
    //check for appointment
    //if appointment found then confirm appointment and return details
    //log in reporting
    //else return error
    res.status(200).json({
        appointment: {
            name: "MSK Appointment",
            clinician: "Dr Neil Munnoch",
        },
    });
}
