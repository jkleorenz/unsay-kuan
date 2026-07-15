export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/30 focus:ring-offset-2 disabled:opacity-70 ${
                    disabled && 'opacity-70'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
