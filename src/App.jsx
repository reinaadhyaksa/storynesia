import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from './components/Header'
import Categories from './pages/Categories'
import CategoryDetail from './pages/CategoryDetail'
import BookDetail from './pages/BookDetail'
import BookList from './pages/BookList'
import ChapterReader from './pages/ChapterReader'
import { HomePage } from './pages/Home'
import { ScrollToTop, LoadingSpinner } from './components/Template'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    })

    loadBooksData()
  }, [])

  const loadBooksData = async () => {
    try {
      const data = await import('./data/data.json')
      setBooks(data.default)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Router>
      <div className="bg-gray-50 overflow-x-hidden">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kategori" element={<Categories books={books} />} />
          <Route path="/kategori/:genreName" element={<CategoryDetail books={books} />} />
          <Route path="/koleksi/:titleSlug" element={<BookDetail books={books} />} />
          <Route path="/koleksi" element={<BookList books={books} />} />
          <Route path="/koleksi/:titleSlug/chapter" element={<ChapterReader books={books} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App