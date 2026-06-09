export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 text-center">

      <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.654-4.654m5.96-4.643.01-.01a2.652 2.652 0 0 1 3.75 3.75l-.01.01" />
        </svg>
      </div>

      <p className="text-sm font-semibold text-blue-400 tracking-wide mb-3">
        cloudpdf.app
      </p>

      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
        Down for maintenance
      </h1>

      <p className="text-gray-400 text-base sm:text-lg max-w-md mb-8 leading-relaxed">
        We're making improvements to give you a better experience. We'll be back up shortly <br /> thanks for your patience.
      </p>

      <div className="w-full max-w-xs border-t border-gray-800 mb-8" />

      <p className="text-gray-500 text-sm">
        Need help? Reach us at{" "}
        <a href="mailto:support@cloudpdf.app" className="text-blue-400 hover:text-blue-300 transition-colors">
          support@cloudpdf.app
        </a>
      </p>

    </div>
  );
}
