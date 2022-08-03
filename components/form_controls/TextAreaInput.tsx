import React from "react";

type TextAreaInput = {
    name?: string;
    defaultValue?: any;
    classNames?: Function;
    id?: any;
    rows?: number;
    type?: string;
    title?: string;
    maxLength?: number;
    inputMode?:
        | "none"
        | "text"
        | "tel"
        | "url"
        | "email"
        | "numeric"
        | "decimal"
        | "search"
        | undefined;
    pattern?: string;
    errors?: [];
    displayCharLimit?: boolean;
};

export default function TextAreaInput({
    name,
    defaultValue,
    classNames,
    id,
    rows = 4,
    title,
    maxLength = 10,
    errors,
    displayCharLimit = false,
}: TextAreaInput) {
    const [charsRemaining, setCharsRemaining] = React.useState(maxLength);
    const calcRemaining = (e) => {
        if (displayCharLimit && maxLength) {
            setCharsRemaining(maxLength - e.target.value.length);
        }
    };
    return (
        <>
            <textarea
                rows={rows}
                name={name}
                id={id}
                title={title}
                maxLength={maxLength}
                className={classNames(
                    typeof errors != "undefined" && errors.length > 0
                        ? "border-red-500 pl-4"
                        : "",
                    "max-w-lg block w-full focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-4"
                )}
                defaultValue={defaultValue}
                onChange={(e) => calcRemaining(e)}
            />
            {displayCharLimit && maxLength && (
                <>
                    <noscript>{`You can enter ${maxLength} characters`}</noscript>
                    <p>{`You have ${charsRemaining} characters remaining`} </p>
                </>
            )}
        </>
    );
}
