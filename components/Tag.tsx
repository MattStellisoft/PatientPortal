function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Tag({text, bgColour, textColour, uppercase}) {
    return (
        <span
            className={classNames(
                uppercase ? 'uppercase' : '',
                textColour,
                bgColour,
                'inline-flex items-center px-2 py-1 text-sm font-medium'
            )}>
            {text}
        </span>
    )
}
  