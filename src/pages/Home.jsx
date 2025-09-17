import {
  Hero,
  About,
  FeaturedCategories,
  FeaturedCollection,
  LatestCollection
} from "../components/SectionInterface"
import Footer from "../components/Footer"
import { Helmet } from "react-helmet"
import ErrorBoundary from "../components/ErrorBoundary"

export default function HomePage({ books }) {
  return (
    <>
      <ErrorBoundary fallback={<div>Error in header</div>}>
        <Helmet>
          <title>Storynesia - Cerita Fiksi & Novel AI</title>
          <meta name="description" content="Jelajahi seluruh koleksi cerita AI kami, diurutkan secara alfabetis. Temukan buku-buku baru dari setiap huruf A hingga Z." />
          <link rel="canonical" href="https://namadomainanda.com/koleksi" />
        </Helmet>
        <Hero books={books} />
        <About />
        <LatestCollection books={books} />
        <FeaturedCollection books={books} />
        <FeaturedCategories books={books} />
        <Footer />
      </ErrorBoundary>
    </>
  )
}