import { Link } from 'react-router-dom';
import { getAvailableGenres } from '../utils/categoryUtils';
import { SectionHeader, GenreCard } from '../components/Template';
import Footer from '../components/Footer';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '../components/ErrorBoundary';

const Categories = ({ books }) => {
    const availableGenres = useMemo(() => getAvailableGenres(books), [books]);

    return (
        <>
            <ErrorBoundary fallback={<div>Error in header</div>}>
                <Helmet>
                    <title>Jelajahi Kategori Cerita AI | Storynesia</title>
                    <meta name="description" content="Temukan cerita-cerita AI berdasarkan kategori favorit Anda. Jelajahi genre fantasi, horor, romantis, dan lainnya untuk menemukan kisah baru yang menarik." />
                    <link rel="canonical" href="https://namadomainanda.com/kategori" />
                </Helmet>

                <div className="min-h-screen bg-gray-50 py-20">
                    <div className="container mx-auto px-4">
                        <SectionHeader
                            title={"Temukan Dunia Baru"}
                            subtitle={"Ragam Kategori Cerita AI"}
                            descriptions={"Jelajahi berbagai genre menarik dari fantasi, petualangan, romantis, hingga horor yang semuanya dihasilkan oleh kecerdasan buatan. Setiap kategori menawarkan pengalaman membaca yang unik dan dunia baru yang mengasyikkan untuk dijelajahi."}
                        />

                        <div className="mb-12" data-aos="fade-up" data-aos-delay="100">
                            <h1 className="text-2xl font-semibold mb-6 text-gray-800">Pilih Genre Favoritmu</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {availableGenres.map((genre, index) => (
                                    <Link
                                        key={genre.id}
                                        to={`/kategori/${encodeURIComponent(genre.name)}`}
                                        className="cursor-pointer"
                                        title={`Jelajahi cerita genre ${genre.name}`}
                                    >
                                        <GenreCard
                                            genre={genre}
                                            index={index} 
                                            disableLink={true}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </ErrorBoundary>
        </>
    );
};

export default Categories;