import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Helmet } from 'react-helmet'; 
import ErrorBoundary from '../components/ErrorBoundary';

export const NotfoundStory = () => {
    return (
        <ErrorBoundary fallback={<div>Error in header</div>}>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <Helmet>
                        <title>Buku Tidak Ditemukan (404) | Storynesia</title>
                        <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                    <div className="text-center">
                        <Icon icon="fa6-solid:book" className="text-5xl text-gray-300 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Buku Tidak Ditemukan</h1>
                        <p className="text-gray-600 mb-6">Buku yang Anda cari tidak tersedia. Coba kembali ke beranda.</p>
                        <Link to="/" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                            Kembali ke Beranda
                        </Link>
                    </div>
            </div>
        </ErrorBoundary>
    );
};

export const NotFoundChapter = ({ titleSlug }) => {
    return (
        <ErrorBoundary fallback={<div>Error in header</div>}>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <Helmet>
                        <title>Chapter Tidak Ditemukan (404) | Storynesia</title>
                        <meta name="robots" content="noindex, nofollow" />
                    </Helmet>
                    <div className="text-center">
                        <Icon icon="fa6-solid:book-open" className="text-5xl text-gray-300 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Chapter Tidak Tersedia</h1> 
                        <p className="text-gray-600 mb-6">Buku ini belum memiliki chapter. Anda dapat kembali ke halaman detail buku.</p>
                        <Link to={`/koleksi/${titleSlug}`} className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                            Kembali ke Detail Buku
                        </Link>
                    </div>
            </div>
        </ErrorBoundary>
    );
};

export const GenreNotFound = () => {
    return (
        <ErrorBoundary fallback={<div>Error in header</div>}>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Genre Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-6">Genre yang Anda cari tidak tersedia.</p>
                    <Link to="/kategori" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        Kembali ke Daftar Genre
                    </Link>
                </div>
            </div>
        </ErrorBoundary>
    )
}

export const NotFoundPage = () => {
    return (
        <ErrorBoundary fallback={<div>Error in 404 page</div>}>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Helmet>
                    <title>Halaman Tidak Ditemukan (404) | Storynesia</title>
                    <meta name="description" content="Halaman yang Anda cari tidak ditemukan. Kembali ke beranda Storynesia untuk menjelajahi koleksi cerita menarik." />
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>
                <div className="text-center max-w-md mx-4">
                    <Icon icon="tabler:error-404" className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Halaman Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-6">
                        Maaf, halaman yang Anda cari tidak tersedia. Mungkin telah dipindahkan, dihapus,
                        atau Anda salah mengetikkan URL.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                        >
                            <Icon icon="fa6-solid:house" className="mr-2" />
                            Kembali ke Beranda
                        </Link>
                        <Link
                            to="/koleksi"
                            className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center"
                        >
                            <Icon icon="fa6-solid:book" className="mr-2" />
                            Jelajahi Koleksi
                        </Link>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};