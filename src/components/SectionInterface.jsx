import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getAvailableGenres } from '../utils/categoryUtils';
import { SectionHeader, ButtonViewAll } from './Template';
import { BookCard } from './BookCard';
import { GenreCard } from './Template';

export const Hero = ({ books }) => {
    const stats = {
        stories: books.length,
        authors: new Set(books.map(book => book.author)).size,
        readers: 65000,
        rating: 4.8
    };

    return (
        <section className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 pt-24 pb-20 text-white">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Jelajahi Dunia <span className="text-purple-300">Imajinasi AI</span> Tak Terbatas
                    </h1>
                    <p className="text-xl mb-6">
                        Temukan cerita-cerita menakjubkan yang dihasilkan oleh kecerdasan buatan.
                        Dari fantasi epik, petualangan seru, kisah romantis, hingga horor yang mendebarkan.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            to={"/koleksi"}
                            className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg font-medium transition transform hover:-translate-y-1 flex items-center"
                        >
                            Mulai Membaca <Icon icon="fa6-solid:book-open" className="ml-2" />
                        </Link>
                        <Link
                            to={"/koleksi"}
                            className="bg-transparent border-2 border-purple-400 hover:bg-purple-800 px-6 py-3 rounded-lg font-medium transition flex items-center"
                        >
                            Lihat Karya AI <Icon icon="fa6-solid:robot" className="ml-2" />
                        </Link>
                    </div>
                </div>
                <div className="md:w-1/2" data-aos="fade-left">
                    <div className="relative">
                        <div className="bg-white text-purple-900 p-6 rounded-xl shadow-2xl transform rotate-3">
                            <div className="flex items-center mb-2">
                                <Icon icon="fa6-solid:robot" className="text-purple-600 text-2xl mr-2" />
                                <strong className="text-2xl font-bold">Karya AI Terbaru Setiap Hari</strong>
                            </div>
                            <p className="mb-4">
                                Dengan dukungan teknologi kecerdasan buatan, selalu ada cerita orisinal dan segar yang menantimu.
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center">
                                    <Icon icon="fa6-solid:book" className="mr-2 text-purple-600" />
                                    <span>{stats.stories.toLocaleString()}+ Karya AI</span>
                                </div>
                                <div className="flex items-center">
                                    <Icon icon="fa6-solid:bolt" className="mr-2 text-purple-600" />
                                    <span>Konten Baru Setiap Hari</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-purple-500 w-24 h-24 rounded-full -z-10"></div>
                        <div className="absolute -top-4 -right-4 bg-pink-500 w-16 h-16 rounded-full -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const About = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-white to-purple-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
                        <h2 className="text-3xl font-bold mb-6">
                            Tentang <span className="text-purple-600"> Storynesia</span>
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Storynesia adalah platform revolusioner yang menggunakan kecerdasan buatan untuk menciptakan
                            cerita-cerita menarik dari berbagai genre. Kami membuka pintu ke dunia imajinasi tanpa batas,
                            di setiap cerita lahir dari kolaborasi antara teknologi mutakhir dan kreativitas.
                        </p>
                        <p className="text-gray-700 mb-6">
                            Dengan dukungan AI, kami menghadirkan pengalaman membaca yang unik dan personal,
                            menyajikan cerita yang terus berkembang sesuai minat dan preferensi pembaca.
                            Setiap hari, karya-karya baru yang orisinal dan menarik siap untuk dieksplorasi.
                        </p>
                        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2">
                            <div className="flex items-start">
                                <div className="bg-purple-100 p-3 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">AI-Powered</h4>
                                    <p className="text-sm text-gray-600">Cerita dibuat dengan teknologi kecerdasan buatan</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-purple-100 p-3 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Konten Baru Setiap Hari</h4>
                                    <p className="text-sm text-gray-600">Selalu ada cerita segar yang menantimu</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-purple-100 p-3 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Personalized</h4>
                                    <p className="text-sm text-gray-600">Cerita sesuai minat dan preferensi pembaca</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-purple-100 p-3 rounded-full mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Multi-Genre</h4>
                                    <p className="text-sm text-gray-600">Fantasi, petualangan, romantis, horor, dan banyak lagi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12" data-aos="fade-left">
                        <div className="relative">
                            <img
                                src="https://res.cloudinary.com/dc9q58yts/image/upload/f_auto,q_auto,w_800/v1757465976/Gemini_Generated_Image_ia0iwria0iwria0i_3_kocqft.png"
                                alt="Ilustrasi Storynesia: Platform cerita AI"
                                className="rounded-lg shadow-xl w-full h-auto max-h-96 object-cover transform hover:scale-105 transition duration-700"
                            />
                            <div className="absolute -bottom-4 -left-4 bg-purple-600 text-white p-3 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90">
                                <div className="flex items-center">
                                    <div className="bg-white bg-opacity-20 p-2 rounded-full mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">50+</h3>
                                        <p className="text-xs">Cerita Dihasilkan</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-lg shadow-lg border border-purple-200 backdrop-blur-sm bg-opacity-95">
                                <div className="flex items-center">
                                    <div>
                                        <h3 className="font-bold text-lg text-purple-600">98%</h3>
                                        <p className="text-xs text-gray-600">Kepuasan AI</p>
                                        <div className="flex mt-1">
                                            <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-purple-600 rounded-full" style={{ width: '98%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const FeaturedCollection = ({ books }) => {
    const recommendedBooks = books.filter(book => book.recomendations === true);

    return (
        <section id="collection" className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title={"Dunia Baru Menanti"}
                    subtitle={"Karya Unggulan AI"}
                    descriptions={"Temukan cerita-cerita fantasi hasil kreasi kecerdasan buatan kami. Setiap karya menghadirkan karakter tak terduga dan alur yang memikat, membawa Anda menjelajahi imajinasi tanpa batas."}
                />

                {recommendedBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recommendedBooks.map((book, index) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Karya sedang disiapkan oleh AI kami. Segera hadir petualangan baru!</p>
                    </div>
                )}

                <ButtonViewAll linked={"koleksi"} text={"Karya"} />
            </div>
        </section>
    );
};

export const FeaturedCategories = ({ books }) => {
    const allGenres = getAvailableGenres(books);
    const sortedGenres = [...allGenres].sort((a, b) => b.count - a.count);
    const topGenres = sortedGenres.slice(0, 4);

    return (
        <section className="bg-white mb-10">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title={"Temukan Genre Favoritmu"}
                    subtitle={"Ragam Kategori Cerita AI"}
                    descriptions={"Jelajahi semua karya fiksi hasil kreasi kecerdasan buatan kami. Temukan dunia-dunia baru yang unik, karakter tak terduga, dan kisah-kisah segar yang terus berkembang dalam koleksi modern kami."}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topGenres.map((genre, index) => (
                        <Link
                            key={genre.id}
                            to={`/kategori/${encodeURIComponent(genre.name)}`}
                        >
                            <GenreCard genre={genre} index={index} />
                        </Link>
                    ))}
                </div>
                {allGenres.length > 3 && (
                    <ButtonViewAll linked={"kategori"} text={"Kategori"} />
                )}
            </div>
        </section>
    );
};

export const LatestCollection = ({ books }) => {
    const latestBooks = books
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);

    return (
        <section id="latest-collection" className=" bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title={"Karya Terbaru AI"}
                    subtitle={"Karya Terbaru dari Imajinasi Tanpa Batas"}
                    descriptions={"Jelajahi cerita-cerita terbaru yang baru saja dihasilkan oleh kecerdasan buatan kami. Setiap karya menghadirkan kisah segar yang terus berkembang, memberikan pengalaman membaca yang selalu baru dan mengejutkan."}
                />

                {latestBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestBooks.map((book, index) => (
                            <BookCard key={book.id} book={book} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">AI kami sedang menciptakan karya baru. Segera hadir!</p>
                    </div>
                )}

                <ButtonViewAll linked={"koleksi"} text={"Karya"} />
            </div>
        </section>
    );
};