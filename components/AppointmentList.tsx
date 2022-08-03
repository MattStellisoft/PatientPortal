import Link from "next/link";
export default function appointmentList({
    appointments,
    languageStrings,
    query,
}) {
    return (
        <div className="overflow-hidden">
            <div className="border-t border-black">
                <dl className="sm:divide-y sm:divide-black">
                    {appointments.map((appointment, index) => (
                        <div
                            key={index}
                            className="py-4 px-6 flex items-center justify-between"
                        >
                            <dt className="text-base font-bold text-blue-750">
                                <Link
                                    href={
                                        "/appointment/" +
                                        appointment.IDAppointment +
                                        query
                                    }
                                >
                                    {languageStrings["appointmentSummary"]
                                        .replace(
                                            "[ServiceType]",
                                            appointment.ServiceType
                                        )
                                        .replace(
                                            "[AppointmentDateTime]",
                                            new Date(
                                                appointment.AppointmentDateTime
                                            ).toLocaleString("en-GB")
                                        )
                                        .replace(
                                            "[Clinician]",
                                            appointment.Clinician
                                        )}
                                </Link>
                            </dt>
                            <dd className="mt-1 text-sm text-black sm:mt-0">
                                <span className="inline-flex items-center px-2 py-1 font-bold bg-blue-750 text-white">
                                    {appointment.AutoBooked == 0 &&
                                    appointment.Status != null
                                        ? languageStrings[appointment.Status]
                                        : languageStrings[
                                              appointment.AutoBookedStatus
                                          ]}
                                </span>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}
