import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center rounded-full px-3 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900/30 ' +
                (active
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-900/5 hover:text-gray-900') +
                className
            }
        >
            {children}
        </Link>
    );
}
