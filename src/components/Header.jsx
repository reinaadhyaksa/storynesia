import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { usePWAInstall } from '../utils/components/header'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [installStatus, setInstallStatus] = useState(null) // 'installing', 'success', 'error'
    const { user, profile } = useAuth()
    const { canInstall, handleInstallClick } = usePWAInstall()

    // Timer untuk menghilangkan notifikasi
    useEffect(() => {
        if (installStatus === 'success' || installStatus === 'error') {
            const timer = setTimeout(() => {
                setInstallStatus(null)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [installStatus])

    const handleInstall = async () => {
        setInstallStatus('installing')
        try {
            await handleInstallClick()
            // Status success akan diatur oleh event listener di usePWAInstall
        } catch (error) {
            setInstallStatus('error')
            console.error("Error installing app:", error)
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const generateUsernameSlug = (name, email) => {
        if (name) {
            return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        }
        return email.split('@')[0].toLowerCase();
    }

    return (
        <header className="fixed w-full bg-purple-900 text-white shadow-lg z-50">
            {/* Notifikasi Status Instalasi */}
            {installStatus && (
                <div className={`absolute top-full left-0 right-0 py-2 px-4 text-center ${installStatus === 'installing' ? 'bg-blue-600' :
                        installStatus === 'success' ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                    {installStatus === 'installing' && (
                        <div className="flex items-center justify-center">
                            <Icon icon="svg-spinners:90-ring-with-bg" className="mr-2" />
                            <span>Sedang menginstal aplikasi...</span>
                        </div>
                    )}
                    {installStatus === 'success' && (
                        <div className="flex items-center justify-center">
                            <Icon icon="fa6-solid:check" className="mr-2" />
                            <span>Aplikasi berhasil diinstal!</span>
                        </div>
                    )}
                    {installStatus === 'error' && (
                        <div className="flex items-center justify-center">
                            <Icon icon="fa6-solid:triangle-exclamation" className="mr-2" />
                            <span>Gagal menginstal aplikasi</span>
                        </div>
                    )}
                </div>
            )}

            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to={"/"} className="flex items-center">
                    <Icon icon="fa6-solid:book-open" className="text-2xl text-purple-300 mr-2" />
                    <h1 className="text-2xl font-bold">Storynesia</h1>
                </Link>

                <nav className="hidden md:block">
                    <ul className="flex space-x-6 items-center">
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

                        {user ? (
                            <li className="flex items-center space-x-4">
                                <Link
                                    className="flex items-center"
                                    to={`/profil/${generateUsernameSlug(profile?.full_name, user.email)}`}
                                >
                                    {profile?.avatar_url ? (
                                        <img
                                            src={profile.avatar_url}
                                            alt="Avatar"
                                            className="w-8 h-8 rounded-full mr-2 object-cover"
                                        />
                                    ) : (
                                        <Icon icon="fa6-solid:user" className="text-lg" />
                                    )}
                                    <span className="ml-1">
                                        {profile?.full_name || user.email}
                                    </span>
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/masuk"
                                        className="hover:text-purple-300 transition"
                                    >
                                        Masuk
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/daftar"
                                        className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700 transition"
                                    >
                                        Daftar
                                    </Link>
                                </li>
                            </>
                        )}

                        {canInstall && (
                            <li>
                                <button
                                    onClick={handleInstall}
                                    className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700 transition flex items-center"
                                    disabled={installStatus === 'installing'}
                                >
                                    {installStatus === 'installing' ? (
                                        <>
                                            <Icon icon="svg-spinners:90-ring-with-bg" className="mr-1" />
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            <Icon icon="fa6-solid:download" className="mr-1" />
                                            Install App
                                        </>
                                    )}
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>

                <div className="flex items-center">
                    {canInstall && (
                        <button
                            onClick={handleInstall}
                            className="md:hidden bg-purple-600 text-white px-3 py-1 rounded-lg text-sm mr-3 hover:bg-purple-700 transition flex items-center"
                            disabled={installStatus === 'installing'}
                        >
                            {installStatus === 'installing' ? (
                                <Icon icon="svg-spinners:90-ring-with-bg" className="text-lg" />
                            ) : (
                                <Icon icon="fa6-solid:download" className="text-lg" />
                            )}
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

            <div className={`md:hidden bg-purple-800 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
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

                        {user ? (
                            <li className="pt-2 border-t border-purple-700">
                                <Link
                                    to={`/profil/${generateUsernameSlug(profile?.full_name, user.email)}`}
                                    className="flex items-center px-2 py-2"
                                    onClick={() => setIsMenuOpen(false)}>
                                    {profile?.avatar_url ? (
                                        <img
                                            src={profile.avatar_url}
                                            alt="Avatar"
                                            className="w-8 h-8 rounded-full mr-2 object-cover"
                                        />
                                    ) : (
                                        <Icon icon="fa6-solid:user" className="mr-2" />
                                    )}
                                    <span className="text-purple-300">
                                        {profile?.full_name || user.email}
                                    </span>
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/masuk"
                                        className="block hover:text-purple-300 transition py-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Masuk
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/daftar"
                                        className="block bg-purple-600 text-white px-4 py-2 rounded-lg text-center hover:bg-purple-700 transition"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Daftar
                                    </Link>
                                </li>
                            </>
                        )}

                        {canInstall && (
                            <li>
                                <button
                                    onClick={() => {
                                        handleInstall()
                                        setIsMenuOpen(false)
                                    }}
                                    className="bg-purple-600 text-white px-3 py-2 rounded-lg w-full text-sm hover:bg-purple-700 transition flex items-center justify-center"
                                    disabled={installStatus === 'installing'}
                                >
                                    {installStatus === 'installing' ? (
                                        <>
                                            <Icon icon="svg-spinners:90-ring-with-bg" className="mr-2" />
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            <Icon icon="fa6-solid:download" className="mr-2" />
                                            Install App
                                        </>
                                    )}
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