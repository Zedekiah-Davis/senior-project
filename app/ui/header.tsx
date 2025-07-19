export function Header() {
    return (
        <header className="bg-gray-800 text-white p-4 text-center">
            <h1 className="text-2xl font-bold">Iron Peak Fitness</h1>
            <nav className="mt-2">
                <a href="/" className="text-blue-400 mx-2">Home</a>
                <a href="/classes" className="text-blue-400 mx-2">Classes</a>
                <a href="/plans" className="text-blue-400 mx-2">Membership Plans</a>
            </nav>
        </header>
    )
}