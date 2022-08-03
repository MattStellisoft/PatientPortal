import { formatIsoDate } from "./formatIsoDate";

export function googleCalendarAppointmentUrl(appointment) {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${
        appointment.ServiceType + " " + "appointment"
    }&details=${appointment.Clinician}&dates=${formatIsoDate(
        appointment.AppointmentDateTime
    )}/${formatIsoDate(appointment.AppointmentEndDateTime)}&location=${
        appointment.Location
    }`;
}
