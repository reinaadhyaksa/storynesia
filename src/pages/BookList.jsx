import { useState, useEffect, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { SectionHeader } from '../components/Template'
import { BookCard } from '../components/BookCard'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet' 
import ErrorBoundary from '../components/ErrorBoundary'

const BookList = ({ books }) => {
    const [activeLetter, setActiveLetter] = useState('')
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const groupedBooks = useMemo(() => {
        const grouped = {}
        const sortedBooks = [...books].sort((a, b) =>
            a.title.localeCompare(b.title, 'id', { sensitivity: 'base' })
        )

        sortedBooks.forEach(book => {
            const firstLetter = book.title.charAt(0).toUpperCase()
            if (!grouped[firstLetter]) {
                grouped[firstLetter] = []
            }
            grouped[firstLetter].push(book)
        })
        return grouped
    }, [books])

    useEffect(() => {
        const firstAvailableLetter = Object.keys(groupedBooks).sort()[0]
        if (firstAvailableLetter) {
            setActiveLetter(firstAvailableLetter)
        }
    }, [groupedBooks])

    return (
        <>
            <ErrorBoundary fallback={<div>Error in header</div>}>
                <Helmet>
                    <title>Koleksi Buku Lengkap A-Z | Storynesia</title>
                    <meta name="description" content="Jelajahi seluruh koleksi cerita AI kami, diurutkan secara alfabetis. Temukan buku-buku baru dari setiap huruf A hingga Z." />
                    <link rel="canonical" href="https://namadomainanda.com/koleksi" />
                </Helmet>

                <div className="min-h-screen bg-gray-50 py-20">
                    <div className="container mx-auto px-4">
                        <SectionHeader
                            title={"Perpustakaan Digital"}
                            subtitle={"Koleksi Cerita AI"}
                            descriptions={"Jelajahi semua karya fiksi hasil kreasi kecerdasan buatan kami. Temukan dunia-dunia baru yang unik, karakter tak terduga, dan kisah-kisah segar yang terus berkembang dalam koleksi modern kami."}
                        />

                        <div className="bg-white rounded-xl shadow-md p-6 mb-8 sticky top-4 z-10" data-aos="fade-up" data-aos-delay="100">
                            <h1 className="text-lg font-semibold text-gray-800 mb-4">Jelajahi Berdasarkan Huruf</h1>
                            <div className="flex flex-wrap justify-center gap-2">
                                {alphabet.map(letter => (
                                    <button
                                        key={letter}
                                        onClick={() => setActiveLetter(letter)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${activeLetter === letter
                                            ? 'bg-purple-600 text-white'
                                            : groupedBooks[letter]
                                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                        disabled={!groupedBooks[letter]}
                                        aria-label={`Lihat buku dengan awalan ${letter}`} 
                                    >
                                        {letter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div data-aos="fade-up" data-aos-delay="200">
                            {Object.keys(groupedBooks).length === 0 ? (
                                <div className="text-center py-12">
                                    <Icon icon="fa6-solid:robot" className="text-5xl text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">AI kami sedang menyiapkan karya-karya baru. Segera hadir!</p>
                                </div>
                            ) : (
                                Object.keys(groupedBooks)
                                    .sort()
                                    .map(letter => (
                                        <div
                                            key={letter}
                                            id={`letter-${letter}`}
                                            className={`mb-12 ${activeLetter === letter ? '' : 'hidden'}`}
                                        >
                                            <div className="flex items-center mb-6">
                                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                                    <span className="text-2xl font-bold text-purple-600">{letter}</span>
                                                </div>
                                                <h2 className="text-2xl font-bold text-gray-800">
                                                    Karya AI dengan Awalan "{letter}"
                                                </h2>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {groupedBooks[letter].map(book => (
                                                    <BookCard key={book.id} book={book} />
                                                ))}
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </ErrorBoundary>
        </>
    )
}

export default BookList