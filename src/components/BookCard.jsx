import { Icon } from '@iconify/react';
import { getGenreColorClass } from '../utils/categoryUtils';
import { Link } from 'react-router-dom';
import { createSlug } from '../utils/helpers';
import { OptimizedImage } from '../utils/imageOptimizer';

export const BookCard = ({ book, index }) => {
    const safeIndex = typeof index === 'number' ? index : 0;
    const bookSlug = createSlug(book.title);

    const imageOptions = {
        width: 800,
        quality: 'q_auto',
        format: 'f_auto'
    };

    return (
        <article
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:scale-[1.02] transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay={String(safeIndex * 100)}
        >
            <div className="h-48 overflow-hidden relative">
                <OptimizedImage
                    src={book.images}
                    alt={`Cover novel AI: ${book.title} oleh ${book.author}`}
                    options={imageOptions}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
                <div className="absolute top-3 left-3 bg-purple-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    AI Generated
                </div>
            </div>
            <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                    {book.genre.map((g, i) => (
                        <span
                            key={g}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getGenreColorClass(g)}`}
                        >
                            {g}
                        </span>
                    ))}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-purple-700 transition-colors">
                    <Link to={`/koleksi/${bookSlug}`} className="hover:underline">
                        {book.title}
                    </Link>
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-3">
                    {book.description}
                </p>
                <div className="flex justify-between items-center">
                    <Link
                        to={`/koleksi/${bookSlug}`}
                        className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                        Mulai Membaca
                        <Icon icon="fa6-solid:book-open" className="ml-2" />
                    </Link>
                    <div className="flex items-center text-gray-500 text-sm">
                        <Icon icon="fa6-solid:sparkles" className="text-yellow-500 mr-1" />
                        AI Story
                    </div>
                </div>
            </div>
        </article>
    );
};