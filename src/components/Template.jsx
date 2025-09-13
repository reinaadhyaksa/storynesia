import {
    Link,
    useLocation
} from "react-router-dom"
import { useEffect, useMemo } from "react"
import { Icon } from '@iconify/react'
import {
    FaShareAlt,
} from 'react-icons/fa'
import { OptimizedImage } from '../utils/imageOptimizer';

export const ButtonViewAll = ({ linked, text }) => {
    return (
        <div className="text-center mt-10" data-aos="fade-up">
            <Link
                to={linked}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 inline-flex items-center justify-center"
            >
                Jelajahi Semua {text}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </Link>
        </div>
    );
}

export const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            <span className="ml-3 text-gray-600">AI sedang menyiapkan cerita...</span>
        </div>
    )
}

export const SectionHeader = ({ title, subtitle, descriptions, titleTag = 'h2' }) => {
    const TitleTag = titleTag;
    return (
        <div className="text-center mb-8 px-4" data-aos="fade-up">
            <TitleTag className="text-3xl sm:text-4xl font-extrabold mb-2 leading-tight text-gray-800">
                {title}
            </TitleTag>
            {subtitle && (
                <p className="text-base sm:text-lg font-semibold text-purple-600">
                    {subtitle}
                </p>
            )}
            {descriptions && (
                <p className="mt-3 text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
                    {descriptions}
                </p>
            )}
        </div>
    );
}

export const StoryNotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <Icon icon="fa6-solid:robot" className="text-5xl text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Karya AI Tidak Ditemukan</h2>
                <p className="text-gray-600 mb-6">Cerita yang Anda cari belum tersedia atau sedang dalam proses kreatif AI.</p>
                <Link to="/" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Jelajahi Karya Lainnya
                </Link>
            </div>
        </div>
    )
}

export const NavbarStory = ({ sharePage, bookTitle }) => {
    return (
        <div className="bg-white shadow-sm z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link
                    to="/"
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
                >
                    <Icon icon="fa6-solid:arrow-left" className="mr-2" />
                    <span className="hidden sm:inline">Kembali ke Beranda</span>
                </Link>
                <h1 className="text-lg font-bold text-gray-800 hidden md:block truncate max-w-xs">{bookTitle}</h1>

                <div className="flex items-center gap-2">
                    <button
                        onClick={sharePage}
                        className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                    >
                        <FaShareAlt className="w-5 h-5 mr-2" />
                        <span className="hidden sm:inline">Bagikan Karya</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export const ShareButton = ({ handleSocialShare, copyToClipboard }) => {
    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            <button
                onClick={() => handleSocialShare('whatsapp')}
                className="flex flex-col items-center p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                title="Bagikan via WhatsApp"
            >
                <Icon icon="fa6-brands:whatsapp" className="w-8 h-8 text-green-600 mb-1" />
                <span className="text-xs text-gray-600 mt-1">WhatsApp</span>
            </button>

            <button
                onClick={() => handleSocialShare('facebook')}
                className="flex flex-col items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                title="Bagikan via Facebook"
            >
                <Icon icon="fa6-brands:facebook" className="w-8 h-8 text-blue-600 mb-1" />
                <span className="text-xs text-gray-600 mt-1">Facebook</span>
            </button>

            <button
                onClick={() => handleSocialShare('twitter')}
                className="flex flex-col items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                title="Bagikan via Twitter"
            >
                <Icon icon="fa6-brands:twitter" className="w-8 h-8 text-blue-400 mb-1" />
                <span className="text-xs text-gray-600 mt-1">Twitter</span>
            </button>

            <button
                onClick={() => handleSocialShare('telegram')}
                className="flex flex-col items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                title="Bagikan via Telegram"
            >
                <Icon icon="fa6-brands:telegram" className="w-8 h-8 text-blue-500 mb-1" />
                <span className="text-xs text-gray-600 mt-1">Telegram</span>
            </button>

            <button
                onClick={() => handleSocialShare('linkedin')}
                className="flex flex-col items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                title="Bagikan via LinkedIn"
            >
                <Icon icon="fa6-brands:linkedin" className="w-8 h-8 text-blue-700 mb-1" />
                <span className="text-xs text-gray-600 mt-1">LinkedIn</span>
            </button>

            <button
                onClick={copyToClipboard}
                className="flex flex-col items-center p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                title="Salin tautan"
            >
                <Icon icon="fa6-solid:link" className="w-8 h-8 text-purple-600 mb-1" />
                <span className="text-xs text-gray-600 mt-1">Salin Tautan</span>
            </button>
        </div>
    )
}

export const BookRecomendations = ({ books, book, createSlug }) => {
    const imageOptions = {
        width: 400,
        quality: 'q_auto',
        format: 'f_auto'
    };

    const recommendedBooks = useMemo(() => {
        if (!book.genre || !Array.isArray(book.genre)) return [];

        return books
            .filter(b => b.id !== book.id && b.genre && Array.isArray(b.genre))
            .map(b => {
                const matchingGenres = b.genre.filter(g => book.genre.includes(g));
                return {
                    ...b,
                    matchScore: matchingGenres.length
                };
            })
            .filter(b => b.matchScore > 0) 
            .sort((a, b) => b.matchScore - a.matchScore) 
            .slice(0, 4); 
    }, [books, book]);

    if (recommendedBooks.length === 0) {
        return null;
    }

    return (
        <div data-aos="fade-up" data-aos-delay="300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Karya AI yang mungkin anda suka</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedBooks.map(recBook => (
                    <Link
                        key={recBook.id}
                        to={`/koleksi/${createSlug(recBook.title)}`}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="h-48 overflow-hidden">
                            <OptimizedImage
                                src={recBook.images}
                                alt={recBook.title}
                                options={imageOptions}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                <span className="inline-flex items-center px-2 py-1 bg-cyan-100 text-cyan-800 text-xs font-medium rounded-full">
                                    <Icon icon="fa6-solid:robot" className="w-3 h-3 mr-1" />
                                    AI Generated
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {recBook.genre.slice(0, 2).map(g => (
                                    <span
                                        key={g}
                                        className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                                    >
                                        {g}
                                    </span>
                                ))}
                                {recBook.genre.length > 2 && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                                        +{recBook.genre.length - 2}
                                    </span>
                                )}
                            </div>
                            <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{recBook.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

export const GenreCard = ({ genre, index, disableLink = false }) => {
    const cardContent = (
        <div
            className={`${genre.colorClass} rounded-xl p-6 text-white shadow-lg genre-card`}
            data-aos="flip-left"
            data-aos-delay={index * 100}
        >
            <div className="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
                <Icon icon={genre.icon} className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">{genre.name}</h3>
            <p className="mb-4 opacity-90 h-32">{genre.description}</p>
            <div className="font-medium flex items-center">
                Jelajahi Karya <Icon icon="fa6-solid:arrow-right" className="ml-2 text-sm" />
            </div>
        </div>
    );
    return cardContent;
}

export const Notification = ({ message = 'Berhasil disalin!' }) => {
    return (
        <div className="fixed top-20 right-4 z-50">
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
                <Icon icon="fa6-solid:check-circle" className="mr-2" />
                {message}
            </div>
        </div>
    );
}