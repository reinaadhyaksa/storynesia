import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '../utils/imageOptimizer';

export const FavoritesTab = ({ favorites, loadingFavorites, onRemoveFavorite }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Cerita Favorit Anda</h3>

            {loadingFavorites ? (
                <div className="text-center py-8">
                    <Icon icon="eos-icons:loading" className="text-3xl text-purple-500" />
                </div>
            ) : favorites.length > 0 ? (
                <div className="grid gap-4">
                    {favorites.map(favorite => (
                        <div key={favorite.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex">
                            <div className="flex-shrink-0 w-16 h-16 mr-4">
                                <OptimizedImage
                                    src={favorite.book_data.images}
                                    alt={favorite.book_data.title}
                                    options={{ width: 100, height: 100, crop: 'fill' }}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-medium text-gray-900 line-clamp-1">{favorite.book_data.title}</h4>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {favorite.book_data.description}
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                    <Link
                                        to={`/koleksi/${favorite.book_slug}`}
                                        className="text-purple-600 text-sm font-medium hover:text-purple-800 transition"
                                    >
                                        Baca Selengkapnya
                                    </Link>
                                    <button
                                        onClick={() => onRemoveFavorite(favorite.id)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                        title="Hapus dari favorit"
                                    >
                                        <Icon icon="fa6-solid:trash" className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <Icon icon="fa6-regular:bookmark" className="text-4xl text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">Anda belum menandai cerita favorit</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Klik ikon hati pada cerita untuk menambahkannya ke favorit
                    </p>
                </div>
            )}
        </div>
    );
};