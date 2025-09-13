import { useState, useEffect } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { findBookBySlug } from '../utils/helpers'
import { NotFoundChapter, NotfoundStory } from './NotFound'
import { LoadingSpinner } from '../components/Template'
import { Helmet } from 'react-helmet' 
import ErrorBoundary from '../components/ErrorBoundary'

const ChapterReader = ({ books }) => {
    const { titleSlug } = useParams()
    const [searchParams] = useSearchParams()
    const [book, setBook] = useState(null)
    const [chapterIndex, setChapterIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [fontSize, setFontSize] = useState('medium')

    useEffect(() => {
        const foundBook = findBookBySlug(books, titleSlug)
        if (foundBook) {
            setBook(foundBook)

            const chapterParam = searchParams.get('chapter')
            if (chapterParam && !isNaN(chapterParam)) {
                const index = parseInt(chapterParam)
                if (index >= 0 && index < foundBook.contents.length) {
                    setChapterIndex(index)
                }
            }

            setLoading(false)
        }
    }, [titleSlug, books, searchParams])

    if (loading) {
        return (
            <LoadingSpinner />
        )
    }

    if (!book) {
        return (
            <NotfoundStory />
        )
    }

    if (!book.contents || book.contents.length === 0) {
        return (
            <NotFoundChapter titleSlug={titleSlug} />
        )
    }

    const currentChapter = book.contents[chapterIndex]
    const isFirstChapter = chapterIndex === 0
    const isLastChapter = chapterIndex === book.contents.length - 1

    const goToPrevChapter = () => {
        if (!isFirstChapter) {
            setChapterIndex(prev => prev - 1)
            window.scrollTo(0, 0)
        }
    }

    const goToNextChapter = () => {
        if (!isLastChapter) {
            setChapterIndex(prev => prev + 1)
            window.scrollTo(0, 0)
        }
    }

    const changeFontSize = (size) => {
        setFontSize(size)
    }

    const fontSizeClass = {
        small: 'text-base sm:text-lg',
        medium: 'text-lg sm:text-xl',
        large: 'text-xl sm:text-2xl',
        xlarge: 'text-2xl sm:text-3xl'
    }[fontSize]

    const chapterUrl = `https://namadomainanda.com/baca/${titleSlug}?chapter=${chapterIndex}`

    return (
        <ErrorBoundary fallback={<div>Error in header</div>}>
            <div className="min-h-screen bg-gradient-to-b from-purple-50 to-gray-50 pt-10 pb-20">
                <Helmet>
                    <title>{`${currentChapter.name} - ${book.title} | Storynesia`}</title>
                    <meta name="description" content={`Baca chapter ${currentChapter.chapter}, berjudul "${currentChapter.name}", dari buku "${book.title}".`} />
                    <link rel="canonical" href={chapterUrl} />
                    <meta property="og:title" content={`${currentChapter.name} - ${book.title}`} />
                    <meta property="og:description" content={`Baca chapter ${currentChapter.chapter}, berjudul "${currentChapter.name}", dari buku "${book.title}".`} />
                    <meta property="og:url" content={chapterUrl} />
                    <meta property="og:type" content="article" />
                </Helmet>

                <div className="bg-white shadow-md mt-5 z-50 py-3 md:py-4">
                    <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                        <Link
                            to={`/koleksi/${titleSlug}`}
                            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium bg-purple-50 px-3 py-1.5 rounded-lg transition-colors group"
                            title={`Kembali ke detail buku ${book.title}`}
                        >
                            <Icon icon="fa6-solid:arrow-left" className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline-block">Kembali</span>
                        </Link>

                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <div className="hidden md:flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full">
                                <Icon icon="fa6-solid:robot" className="text-purple-500" />
                                <span className="text-sm text-purple-700">Karya AI</span>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                                {chapterIndex + 1}/{book.contents.length}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="text-center mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 leading-tight">{book.title}</h1>
                        <h2 className="text-lg sm:text-xl text-purple-600 font-semibold">
                            {currentChapter.chapter}: {currentChapter.name}
                        </h2>
                    </div>

                    <div className="flex justify-center items-center mb-6 bg-white p-3 rounded-lg shadow-sm border border-purple-100">
                        <span className="text-sm text-gray-600 mr-3 hidden sm:inline-block">Ukuran Teks:</span>
                        <div className="flex space-x-2">
                            {['small', 'medium', 'large', 'xlarge'].map((size) => (
                                <button
                                    key={size}
                                    className={`w-8 h-8 flex items-center justify-center rounded-md font-bold text-sm ${fontSize === size
                                        ? 'bg-purple-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    onClick={() => changeFontSize(size)}
                                    aria-label={`Ganti ukuran teks ke ${size}`} 
                                >
                                    {size === 'small' ? 'A-' :
                                        size === 'medium' ? 'A' :
                                            size === 'large' ? 'A+' : 'A++'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-purple-100">
                        <div className="prose max-w-none mx-auto">
                            <div
                                className={`text-gray-800 leading-relaxed ${fontSizeClass} chapter-content`}
                                style={{ lineHeight: '1.8' }}
                                dangerouslySetInnerHTML={{ __html: currentChapter.content }}
                            />
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 p-3">
                    <div className="container mx-auto flex justify-between items-center gap-2">
                        <button
                            className="flex-1 flex items-center justify-center text-purple-600 hover:text-purple-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-white px-3 py-2 rounded-lg border border-purple-200 transition-colors"
                            disabled={isFirstChapter}
                            onClick={goToPrevChapter}
                            aria-label="Chapter sebelumnya" 
                        >
                            <Icon icon="fa6-solid:arrow-left" className="mr-2 hidden sm:block" />
                            <span className="text-sm">Sebelumnya</span>
                        </button>

                        <Link
                            to={`/koleksi/${titleSlug}`}
                            className="flex-1 flex items-center justify-center text-gray-600 hover:text-gray-800 font-medium bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                            title={`Kembali ke daftar bab buku ${book.title}`} 
                        >
                            <Icon icon="fa6-solid:list" className="mr-2 hidden sm:block" />
                            <span className="text-sm">Daftar</span>
                        </Link>

                        <button
                            className="flex-1 flex items-center justify-center text-purple-600 hover:text-purple-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-white px-3 py-2 rounded-lg border border-purple-200 transition-colors"
                            disabled={isLastChapter}
                            onClick={goToNextChapter}
                            aria-label="Chapter selanjutnya"
                        >
                            <span className="text-sm">Selanjutnya</span>
                            <Icon icon="fa6-solid:arrow-right" className="ml-2 hidden sm:block" />
                        </button>
                    </div>
                </div>

                <div className="text-center py-4 border-t border-purple-100 mt-8 hidden sm:block">
                    <p className="text-sm text-gray-500 flex items-center justify-center">
                        <Icon icon="fa6-solid:robot" className="mr-2 text-purple-500" />
                        Cerita ini dihasilkan oleh kecerdasan buatan - Storynesia © {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default ChapterReader