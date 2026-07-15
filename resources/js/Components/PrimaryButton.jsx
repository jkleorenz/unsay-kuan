export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-full border border-transparent bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-gray-800 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/40 focus:ring-offset-2 active:bg-gray-900 ${
                    disabled && 'opacity-70'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
