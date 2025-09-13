import { genreIcons, genreColors, genreData } from '../data/categoryData';

export const getGenreIcon = (genre) => {
    return genreIcons[genre] || genreIcons.default;
};

export const getGenreColorClass = (genre) => {
    return genreColors[genre] || genreColors.default;
};

export const getAvailableGenres = (books) => {
    const allGenres = books.flatMap(book => book.genre);
    const uniqueGenres = [...new Set(allGenres)];

    return genreData.filter(genre => uniqueGenres.includes(genre.name));
};