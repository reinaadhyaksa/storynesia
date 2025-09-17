import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Header from './components/Header'
import { ScrollToTop } from './components/Template'
import AuthProvider from './context/AuthContext'
import { initializeAOS, useAppData } from './utils/appUtils'
import { StorynesiaLoadingScreen } from './components/Template'
import { NotFoundPage } from './pages/NotFound'

const Categories = lazy(() => import('./pages/Categories'))
const CategoryDetail = lazy(() => import('./pages/CategoryDetail'))
const BookDetail = lazy(() => import('./pages/BookDetail'))
const BookList = lazy(() => import('./pages/BookList'))
const ChapterReader = lazy(() => import('./pages/ChapterReader'))
const HomePage = lazy(() => import('./pages/Home'))
const LoginPages = lazy(() => import('./pages/LoginPages'))
const RegisterPages = lazy(() => import('./pages/RegisterPages'))
const ProfilePage = lazy(() => import('./pages/ProfilePages'))

function App() {
  const { books, isLoading, loadBooksData } = useAppData()
  useEffect(() => {
    initializeAOS()
    loadBooksData()
  }, [])

  if (isLoading) {
    return <StorynesiaLoadingScreen />
  }

  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-50 overflow-x-hidden">
          <ScrollToTop />
          <Header />
          <Suspense>
            <Routes>
              <Route path="/" element={<HomePage books={books} />} />
              <Route path="/kategori" element={<Categories books={books} />} />
              <Route path="/kategori/:genreName" element={<CategoryDetail books={books} />} />
              <Route path="/koleksi/:titleSlug" element={<BookDetail books={books} />} />
              <Route path="/koleksi" element={<BookList books={books} />} />
              <Route path="/koleksi/:titleSlug/chapter" element={<ChapterReader books={books} />} />
              <Route path="/masuk" element={<LoginPages />} />
              <Route path="/daftar" element={<RegisterPages />} />
              <Route path="/profil/:username" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App