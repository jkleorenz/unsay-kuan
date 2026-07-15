export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f7f7f8] px-6 pt-6 sm:pt-0">
            <div
                className="absolute inset-0 bg-contain bg-cover bg-no-repeat opacity-20"
                style={{ backgroundImage: "url('/map.svg')" }}
            />
      <div className="absolute inset-0 bg-white/60" />

      <div className="relative z-10 mt-6 w-full bg-white/90 px-8 py-10 shadow-xl backdrop-blur-sm sm:max-w-md sm:rounded-2xl">
                {children}
            </div>
        </div>
    );
}
