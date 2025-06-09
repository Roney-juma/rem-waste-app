export default function ErrorScreen({fetchSkips, error}) {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center p-8 bg-gray-800 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
                <p className="text-gray-400 mb-4">{error}</p>
                <button
                    onClick={fetchSkips}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    )
}