import { patientSteps } from "../../../../testing/data/testData";

// export default function handler(req, res) {
//     if (req.query?.nhsnumber && patientSteps[req.query.nhsnumber]) {
//         const totalResults = patientSteps[req.query.nhsnumber].length;
//         const start = (req.query.offset - 1) * req.query.perPage;
//         const end = start + req.query.perPage;
//         const results = patientSteps[req.query.nhsnumber].slice(start, end);
//         results.sort(function (a, b) {
//             if (req.query.order == "true") {
//                 return new Date(b.date).valueOf() - new Date(a.date).valueOf();
//             } else {
//                 return new Date(a.date).valueOf() - new Date(b.date).valueOf();
//             }
//         });
//         return res.status(200).json({
//             results: results,
//             totalResults: totalResults,
//         });
//     }
//     res.status(400).json({
//         error: "We could not find any steps assigned to your NHS number.",
//     });
// }

export default function handler(req, res) {
    if (req.query?.nhsnumber && patientSteps[req.query.nhsnumber]) {
        const results = patientSteps[req.query.nhsnumber];
        return res.status(200).json({
            StatusCode: results.StatusCode,
            statusMessage: results.statusMessage,
        });
    } else {
        res.status(200).json({
            statusMessage: [],
            statusCode: 204,
            errors: [],
        });
    }
}
