export default function handler(req, res) {
    //check for appointment
    //if appointment found then cancel appointment
    //log in reporting
    //else return error
    if (req.body) {
        //store reason in DB
        return res.status(200).json({
            reasonSuccess: true,
        });
    }
    res.status(200).json({
        rejected: true,
    });
}
