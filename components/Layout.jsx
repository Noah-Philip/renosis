import { Navbar } from "./Navbar"

export const Layout = ({ children }) => {
    return (
        <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
            <Navbar />
            {children}
        </div>
    )
}
