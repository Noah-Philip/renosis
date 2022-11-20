import { useFirebaseAuth } from "../lib/auth-context"

export const Navbar = () => {
    const user = useFirebaseAuth()

    return (
        <div className="bg-white shadow">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <div></div>

                    {user !== null ? (
                        <div className="hidden sm:flex sm:items-center">
                            <a className="text-gray-800 text-lg font-semibold border px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600">
                                Log Out
                            </a>
                        </div>
                    ) : (
                        <div className="hidden sm:flex sm:items-center">
                            <img src="/images/Renosis_Logo.png" alt="" height = "50" align = "center"/>
                            <a
                                href="/login"
                                className="text-gray-800 text-lg font-semibold hover:text-blue-600 mr-4"
                            >
                                Log in
                            </a>
                            <a
                                href="/register"
                                className="text-gray-800 text-lg font-semibold border px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600"
                            >
                                Register
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
