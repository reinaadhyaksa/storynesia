import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { findBookBySlug, createSlug } from '../utils/helpers'
import { BookRecomendations, LoadingSpinner, NavbarStory, Notification, ShareButton, StoryNotFound } from '../components/Template'
import { NotFoundChapter } from './NotFound'
import { OptimizedImage } from '../utils/imageOptimizer'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet' 
import ErrorBoundary from '../components/ErrorBoundary'

const BookDetail = ({ books }) => {
    const { titleSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [showShareNotification, setShowShareNotification] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const book = useMemo(() => findBookBySlug(books, titleSlug), [books, titleSlug]);

    useEffect(() => {
        if (book) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [book]);

    const imageOptions = {
        width: 800,
        quality: 'q_auto',
        format: 'f_auto'
    };

    const sharePage = () => setShowShareModal(true);

    const handleSocialShare = (platform) => {
        const currentUrl = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(book.title);
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${title}%20-%20${currentUrl}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${currentUrl}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${currentUrl}&text=${title}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
                break;
            default:
                return;
        }

        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                setShowShareNotification(true);
                setTimeout(() => setShowShareNotification(false), 3000);
                setShowShareModal(false);
            })
            .catch(err => {
                console.error('Gagal menyalin URL: ', err);
            });
    };

    const getGenreLink = (genreName) => `/kategori/${encodeURIComponent(genreName)}`;

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!book) {
        return <StoryNotFound />;
    }

    return (
        <>
            <ErrorBoundary fallback={<div>Error in header</div>}>
                <Helmet>
                    <title>{`${book.title} - Baca Cerita Online | Storynesia`}</title>
                    <meta name="description" content={book.description} />
                    <link rel="canonical" href={`https://namadomainanda.com/koleksi/${titleSlug}`} />
                    <meta property="og:title" content={book.title} />
                    <meta property="og:description" content={book.description} />
                    <meta property="og:url" content={`https://namadomainanda.com/koleksi/${titleSlug}`} />
                    <meta property="og:image" content={book.images} />
                    <meta property="og:type" content="book" />
                </Helmet>

                <div className="min-h-screen bg-gray-50 mt-12">
                    {showShareNotification && (
                        <Notification message="Tautan berhasil disalin!" />
                    )}

                    {showShareModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Bagikan Karya AI</h3>
                                    <button
                                        onClick={() => setShowShareModal(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <Icon icon="fa6-solid:xmark" className="w-5 h-5" />
                                    </button>
                                </div>
                                <p className="text-gray-600 mb-4 text-sm">Bagikan cerita AI yang menginspirasi ini dengan dunia</p>

                                <ShareButton copyToClipboard={copyToClipboard} handleSocialShare={handleSocialShare} />

                                {navigator.share && (
                                    <button
                                        onClick={() => {
                                            navigator.share({
                                                title: book.title,
                                                text: `Jelajahi "${book.title}" - karya kecerdasan buatan di Storynesia`,
                                                url: window.location.href
                                            })
                                                .then(() => console.log('Berhasil dibagikan'))
                                                .catch(error => console.error('Error sharing:', error));
                                            setShowShareModal(false);
                                        }}
                                        className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center mt-3"
                                    >
                                        <Icon icon="fa6-solid:share-nodes" className="w-5 h-5 mr-2" />
                                        Bagikan melalui perangkat
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    <NavbarStory sharePage={sharePage} bookTitle={book.title} />

                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col md:flex-row gap-8 mb-12" data-aos="fade-up">
                            <div className="md:w-1/3">
                                <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white">
                                    <OptimizedImage
                                        src={book.images}
                                        alt={book.title}
                                        options={imageOptions}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                                <div className="mt-4 text-center">
                                    <span className="inline-flex items-center px-3 py-1 bg-cyan-100 text-cyan-800 text-sm font-medium rounded-full">
                                        <Icon icon="fa6-solid:robot" className="w-4 h-4 mr-1" />
                                        Karya Kecerdasan Buatan
                                    </span>
                                </div>
                            </div>
                            <div className="md:w-2/3">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{book.title}</h1>
                                <div className="flex items-center text-gray-500 mb-4 text-sm md:text-base">
                                    <Icon icon="fa6-solid:calendar" className="mr-2 flex-shrink-0" />
                                    <span className="leading-tight">
                                        Dibuat oleh AI pada: {new Date(book.date).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {book.genre && book.genre.map(g => (
                                        <Link
                                            key={g}
                                            to={getGenreLink(g)}
                                            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
                                        >
                                            {g}
                                        </Link>
                                    ))}
                                </div>
                                <div className="bg-gray-100 p-6 rounded-xl mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Sinopsis Karya AI</h2>
                                    <p className="text-gray-700 leading-relaxed">{book.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12" data-aos="fade-up" data-aos-delay="100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Petualangan dalam Cerita</h2>
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                {book.contents && book.contents.length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {book.contents.map((chapter, index) => (
                                            <li key={index} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                                                <Link to={`/koleksi/${titleSlug}/chapter?chapter=${index}`} className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">Bagian {chapter.chapter}</h3>
                                                        <div className="text-sm text-gray-600 mt-1 line-clamp-1">{chapter.name}</div>
                                                    </div>
                                                    <Icon icon="fa6-solid:chevron-right" className="text-gray-400" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <NotFoundChapter titleSlug={titleSlug} />
                                )}
                            </div>
                        </div>

                        <BookRecomendations books={books} book={book} createSlug={createSlug} />
                    </div>
                </div>
                <Footer />
            </ErrorBoundary>
        </>
    );
};

export default BookDetail;