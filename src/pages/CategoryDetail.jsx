import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { BookCard } from '../components/BookCard';
import { getAvailableGenres } from '../utils/categoryUtils';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet'; 
import ErrorBoundary from '../components/ErrorBoundary';

const CategoryDetail = ({ books }) => {
    const { genreName } = useParams();
    const decodedGenreName = useMemo(() => decodeURIComponent(genreName), [genreName]);
    const availableGenres = useMemo(() => getAvailableGenres(books), [books]);
    const genreInfo = useMemo(() => availableGenres.find(g => g.name === decodedGenreName), [availableGenres, decodedGenreName]);

    const filteredBooks = useMemo(() => {
        return books.filter(book => book.genre.includes(decodedGenreName));
    }, [decodedGenreName, books]);

    if (!genreInfo) {
        return (
            <>
                <ErrorBoundary fallback={<div>Error in header</div>}>
                    <Helmet>
                        <title>Genre Tidak Ditemukan (404) | Storynesia</title>
                        <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Genre Tidak Ditemukan</h1>
                            <p className="text-gray-600 mb-6">Genre yang Anda cari tidak tersedia.</p>
                            <Link to="/kategori" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                                Kembali ke Daftar Genre
                            </Link>
                        </div>
                    </div>
                    <Footer />
                </ErrorBoundary>
            </>
        );
    }

    return (
        <>
            <ErrorBoundary fallback={<div>Error in header</div>}>
                <Helmet>
                    <title>{`Cerita Genre ${decodedGenreName} | Storynesia`}</title>
                    <meta name="description" content={`Temukan koleksi cerita fiksi bergenre ${decodedGenreName} yang dibuat oleh kecerdasan buatan. Baca kisah-kisah terbaru yang menarik di Storynesia.`} />
                    <link rel="canonical" href={`https://namadomainanda.com/kategori/${genreName}`} />
                </Helmet>

                <div className="min-h-screen bg-gradient-to-b from-purple-50 to-gray-50 py-12 sm:py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 sm:mt-1 mt-8">
                            <Link
                                to="/kategori"
                                className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800 transition-colors bg-purple-100 px-4 py-2 rounded-lg group"
                                title="Kembali ke Jelajahi Genre" 
                            >
                                <Icon icon="fa6-solid:arrow-left" className="w-5 h-5" />
                                <span className="ml-2 hidden sm:inline-block">Kembali ke Jelajahi Genre</span>
                                <span className="ml-2 sm:hidden">Kembali</span>
                            </Link>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-10 bg-white p-6 rounded-xl shadow-lg border border-purple-100 transition-transform transform hover:scale-[1.01]">
                            <div className="flex flex-col sm:flex-row items-center mb-4 md:mb-0 text-center sm:text-left">
                                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mr-0 sm:mr-5 mb-4 sm:mb-0 shadow-lg`}>
                                    <Icon icon={genreInfo?.icon || "fa6-solid:book-open"} className="text-xl sm:text-2xl text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Genre {decodedGenreName}</h1>
                                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                                        Temukan {filteredBooks.length} cerita AI yang menginspirasi
                                    </p>
                                </div>
                            </div>
                            <div className="bg-purple-50 px-4 py-2 rounded-full border border-purple-200">
                                <p className="text-xs sm:text-sm text-purple-700 flex items-center">
                                    <Icon icon="fa6-solid:robot" className="mr-2 text-purple-500" />
                                    Cerita dibuat dengan AI
                                </p>
                            </div>
                        </div>

                        {filteredBooks.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
                                <Icon icon="fa6-solid:book-open-reader" className="text-6xl text-gray-300 mx-auto mb-6" />
                                <h2 className="text-xl font-medium text-gray-700 mb-2">Belum ada cerita dalam genre ini</h2> {/* ✅ Gunakan H2 */}
                                <p className="text-gray-500 max-w-md mx-auto px-4">
                                    Cerita AI untuk genre {decodedGenreName} sedang dalam pengembangan. Cek kembali nanti untuk menemukan cerita-cerita baru!
                                </p>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-6 flex justify-between items-center px-2">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Koleksi Cerita {decodedGenreName}</h2>
                                    <span className="text-xs sm:text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                                        {filteredBooks.length} cerita
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                    {filteredBooks.map((book) => (
                                        <BookCard key={book.id} book={book} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </ErrorBoundary>
        </>
    );
};

export default CategoryDetail;