export const fetchBooksData = async () => {
    try {
        const data = await import('../data/data.json')
        return data.default
    } catch (error) {
        console.error('Error loading data:', error)
        throw error
    }
}