export const Navbar = () => (
    <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
        <div className="bg-white shadow">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <div></div>

                    <div className="hidden sm:flex sm:items-center">
                        <a
                            href="/login"
                            className="text-gray-800 text-lg font-semibold hover:text-blue-600 mr-4"
                        >
                            Sign in
                        </a>
                        <a
                            href="/register"
                            className="text-gray-800 text-lg font-semibold border px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600"
                        >
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
