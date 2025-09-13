import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState(null)
    const [canInstall, setCanInstall] = useState(false)

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setCanInstall(true)
        }

        window.addEventListener('beforeinstallprompt', handler)

        window.addEventListener('appinstalled', () => {
            console.log("✅ Aplikasi berhasil diinstall")
            setDeferredPrompt(null)
            setCanInstall(false)
        })

        return () => {
            window.removeEventListener('beforeinstallprompt', handler)
        }
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleInstallClick = async () => {
        if (!deferredPrompt) return
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        console.log("Pilihan user:", outcome) // 
        setDeferredPrompt(null)
        setCanInstall(false)
    }

    return (
        <header className="fixed w-full bg-purple-900 text-white shadow-lg z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to={"/"} className="flex items-center">
                    <Icon icon="fa6-solid:book-open" className="text-2xl text-purple-300 mr-2" />
                    <h1 className="text-2xl font-bold">Storynesia</h1>
                </Link>

                <nav className="hidden md:block">
                    <ul className="flex space-x-8 items-center">
                        <li>
                            <Link
                                to={"/"}
                                className="hover:text-purple-300 transition"
                            >
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/kategori"}
                                className="hover:text-purple-300 transition"
                            >
                                Jelajahi Genre
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/koleksi"}
                                className="hover:text-purple-300 transition"
                            >
                                Koleksi Cerita
                            </Link>
                        </li>
                        {canInstall && (
                            <li>
                                <button
                                    onClick={handleInstallClick}
                                    className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700 transition flex items-center"
                                >
                                    <Icon icon="fa6-solid:download" className="mr-1" />
                                    Install App
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>

                <div className="flex items-center">
                    {canInstall && (
                        <button
                            onClick={handleInstallClick}
                            className="md:hidden bg-purple-600 text-white px-3 py-1 rounded-lg text-sm mr-3 hover:bg-purple-700 transition flex items-center"
                        >
                            <Icon icon="fa6-solid:download" className="text-lg" />
                        </button>
                    )}

                    <button
                        className="md:hidden focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <Icon
                            icon={isMenuOpen ? "fa6-solid:xmark" : "fa6-solid:bars"}
                            className="text-2xl"
                        />
                    </button>
                </div>
            </div>

            <div className={`md:hidden bg-purple-800 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <nav className="container mx-auto px-4 py-3">
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <Link
                                to={"/"}
                                className="block hover:text-purple-300 transition py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/kategori"}
                                className="block hover:text-purple-300 transition py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Jelajahi Genre
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/koleksi"}
                                className="block hover:text-purple-300 transition py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Koleksi Cerita
                            </Link>
                        </li>
                        {canInstall && (
                            <li>
                                <button
                                    onClick={() => {
                                        handleInstallClick()
                                        setIsMenuOpen(false)
                                    }}
                                    className="bg-purple-600 text-white px-3 py-2 rounded-lg w-full text-sm hover:bg-purple-700 transition flex items-center justify-center"
                                >
                                    <Icon icon="fa6-solid:download" className="mr-2" />
                                    Install App
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header