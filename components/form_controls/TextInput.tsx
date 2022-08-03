import React from "react";

type TextInput = {
    name?: string;
    value?: string | number;
    defaultValue?: any;
    classNames?: Function;
    id?: any;
    type?: string;
    title?: string;
    maxLength?: number;
    autoComplete?: string;
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

export default function TextInput({
    name,
    defaultValue,
    value,
    classNames,
    id,
    type = "text",
    autoComplete,
    title = "",
    maxLength,
    inputMode,
    pattern,
    errors,
    displayCharLimit = false,
}: TextInput) {
    const [charsRemaining, setCharsRemaining] = React.useState(maxLength);
    const calcRemaining = (e) => {
        if (displayCharLimit && maxLength) {
            setCharsRemaining(Number(maxLength) - e.target.value.length);
        }
    };
    return (
        <>
            <input
                name={name}
                value={value}
                id={id}
                type={type}
                title={title}
                autoComplete={autoComplete}
                maxLength={maxLength}
                className={classNames(
                    typeof errors != "undefined" && errors.length > 0
                        ? "border-red-500 pl-4"
                        : "border-black",
                    "max-w-lg block w-full focus:ring-blue-750 focus:border-blue-750 sm:max-w-xs sm:text-sm border-4"
                )}
                defaultValue={defaultValue}
                inputMode={inputMode}
                pattern={pattern}
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
