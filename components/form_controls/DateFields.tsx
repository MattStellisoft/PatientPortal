type DateTimeInput = {
    name?: string;
    value?: string | number;
    defaultValue?: any;
    classNames?: Function;
    id?: any;
    type?: string;
    title?: string;
    errors?: [];
};

export default function DateTimeInput({
    name,
    defaultValue,
    value,
    classNames,
    id,
    type = "text",
    title = "",
    errors,
}: DateTimeInput) {
    return (
        <div id="date">
            <div className="inline-block mr-4 mb-0">
                <div>
                    <label htmlFor="day">Day</label>
                    <input
                        className="mt-4 focus:ring-blue-750 focus:border-blue-750 block max-w-xs min-w-0 sm:text-sm border-4 border-black"
                        style={{
                            maxWidth: "7ex",
                        }}
                        maxLength={2}
                        id="day"
                        name={name + "Day"}
                        type="text"
                        autoComplete="day"
                        inputMode="numeric"
                    />
                </div>
            </div>
            <div className="inline-block mr-4 mb-0">
                <div>
                    <label htmlFor="month">Month</label>
                    <input
                        className="mt-4 focus:ring-blue-750 focus:border-blue-750 block max-w-xs min-w-0 sm:text-sm border-4 border-black"
                        style={{
                            maxWidth: "7ex",
                        }}
                        maxLength={2}
                        id="month"
                        name={name + "Month"}
                        type="text"
                        autoComplete="month"
                        inputMode="numeric"
                    />
                </div>
            </div>
            <div className="inline-block mr-4 mb-0">
                <div>
                    <label htmlFor="year">Year</label>
                    <input
                        className="mt-4 focus:ring-blue-750 focus:border-blue-750 flex-grow block max-w-sm min-w-0 sm:text-sm border-4 border-black"
                        style={{
                            maxWidth: "10ex",
                        }}
                        maxLength={4}
                        id="year"
                        name={name + "Year"}
                        type="text"
                        autoComplete="year"
                        inputMode="numeric"
                    />
                </div>
            </div>
        </div>
    );
}
