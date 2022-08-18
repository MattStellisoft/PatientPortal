export interface PatientInterface {
    NHSNumber: number;
    FirstName: string;
    LastName: string;
    Email: string;
    MobileNumber: string;
    PhysitrackClientID: string;
    BuildingName: string;
    BuildingNumber: string;
    RoadName: string;
    Town: string;
    County: string;
    Postcode: string;
    RegisteredGP: string;
}

export interface StatusMessageInterface {
    cancellationCount: string;
    autoBookingflag: string;
    referralsType: string;
    stages?: StageInterface[];
}

export interface StageInterface {
    NHSNumber: string;
    IDReferral: string;
    Status: string;
    Appointment: boolean;
    Physionow: boolean;
    Document: boolean;
    Questionnaire: boolean;
}

export interface OverviewInterface {
    StatusCode: string;
    statusMessage: StatusMessageInterface;
}

export interface QuestionnaireInterfaceJordan {
    Uuid: string;
    NHSNumber: number;
    IDReferral: number;
    Url: string;
    ExpiresAt: Date;
}

export interface NhsNumberQuestionnaireInterface {
    QuestionnaireTypeUuid: string;
    QuestionnaireName: string;
    QuestionnaireTitle: string;
    QuestionnaireCategories: [] | null;
    CollectionPoint: null;
    PatientsQuestionnaireUuid: string;
    NhsNumber: string;
    ScoresUuid: string;
    DateTimeAnswersDue: string;
    DateTimeAnswersReceived: Date | null;
    completed?: boolean;
    answersUuid: string;
    DisplayOrder: string | null;
    DateTimeReminderSent: Date | null;
    DateTimeSent: string;
    DateTimeS1UploadFinished: Date | null;
    NeedsProcessed: boolean | null;
    AppointmentID: string;
    AppointmentDateTime: string;
    Scores: [];
}

export interface UuidQuestionnaireInterface {
    name: string;
    duration: number;
    informaion: string;
    typeUUID: string;
    DateTimeAnswersReceived?: string;
    completed: boolean;
    mandatory: boolean;
    dateTimeStarted: string;
    dateTimeDue: string;
    patientsUUID: string;
    AnswersUuid: string;
    DisplayOrder: string;
}

export type QuestionnaireInterface =
    | NhsNumberQuestionnaireInterface
    | UuidQuestionnaireInterface;

export interface AppointmentInterface {
    IDAppointment: number;
    NHSNumber: number;
    AppointmentDateTime: Date | string;
    AppointmentEndDateTime: Date | string;
    Duration: number;
    ServiceType: string;
    Clinician: string;
    Location?: string;
    BranchName: string;
    County: string;
    Town: string;
    Locality: string;
    RoadName: string;
    HouseName: string;
    HouseNumber: string;
    PostCode: string;
    Status: string;
    Seq: number;
    AutoBooked: boolean;
    AutoBookedStatus: string | null;
    AppointmentUID: string;
    CancellationCode: number;
    CancellationReason: string | null;
}

export interface DocumentInterface {
    DocumentUID: string;
    NHSNumber: number;
    LetterCreated: Date;
    DocumentType: string;
    DocumentB64: string;
}

export interface ProgrammeInterface {
    id: number;
    external_id: string;
    template_id: number;
    name: string;
    access_code: string;
    start_date: Date;
    end_date: Date;
    track_adherence: boolean;
    track_pain_levels: boolean;
    access_code_sent_date: Date;
    access_code_sent_via: string;
    skip_access_code: boolean;
    last_access_date: Date;
    sso_url: string;
    created_at: Date;
}

export interface ExercisesInterface {
    schedule_type: string;
    exercises: ExerciseInterface[];
    weeks: [
        {
            days: [
                {
                    date: Date;
                    exercises: ExerciseInterface[];
                },
            ];
        },
    ];
}

export interface ExerciseInterface {
    id: number;
    name: string;
    reps: number;
    sets: number;
    hold: number;
    duration: number;
    weight: number;
    thr: number;
    rpe: number;
}

export interface NHSLoginUserInfoInterface {
    age?: number;
    sub: string;
    iss: string;
    aud: string;
    nhs_number: string;
    birthdate: string;
    family_name: string;
    identity_proofing_level: string;
    email: string;
    email_verified: boolean;
    phone_number_verified: boolean;
    phone_number: string;
    phone_number_pds_matched: boolean;
}

export interface Breadcrumb {
    key: string;
    href: string;
    current: boolean;
}

export interface Error {
    name: string;
    description: string;
    contact: boolean;
}

export interface Errors {
    [key: string]: Error;
}
