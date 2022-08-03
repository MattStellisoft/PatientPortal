const questionnaireResponses = {
    968636876973: {},
};

export default function handler(req, res) {
    if (req.query?.nhsnumber && req.query?.questionnaire) {
        return res
            .status(200)
            .json(
                questionnaireResponses[req.query.nhsnumber][
                    req.query.questionnaire
                ]
            );
    }
    res.status(400).json({
        error: "We could not find a corresponding set of responses for this patient and this questionnaire.",
    });
}
