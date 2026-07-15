export default function Card({ className = '', children }) {
    return (
        <div
            className={
                'bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm ring-1 ring-gray-100 ' +
                className
            }
        >
            {children}
        </div>
    );
}
