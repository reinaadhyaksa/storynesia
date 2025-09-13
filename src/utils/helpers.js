export const createSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
};

export const findBookBySlug = (books, slug) => {
    return books.find(book => createSlug(book.title) === slug);
};