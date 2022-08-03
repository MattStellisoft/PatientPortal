export function outlookCalendarAppointmentUrl(appointment) {
    return `https://outlook.office.com/calendar/0/deeplink/compose?subject=${
        appointment.ServiceType + " " + "appointment"
    }&body=${appointment.Clinician}&startdt=${encodeURIComponent(
        appointment.AppointmentDateTime
    )}&enddt=${encodeURIComponent(
        appointment.AppointmentEndDateTime
    )}&location=${
        appointment.Location
    }&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent`;
}
