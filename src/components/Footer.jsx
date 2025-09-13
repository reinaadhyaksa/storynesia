import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-4">
                            <Icon icon="fa6-solid:robot" className="text-2xl text-purple-400 mr-2" />
                            <h3 className="text-xl font-bold">Storynesia</h3>
                        </div>
                        <p className="text-gray-400 max-w-md">
                            Platform digital terdepan untuk karya fiksi hasil kreasi kecerdasan buatan. Menghadirkan cerita-cerita unik dari berbagai genre yang lahir dari imajinasi tanpa batas.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4">Jelajahi</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition">Beranda</Link></li>
                            <li><Link to="/koleksi" className="text-gray-400 hover:text-white transition">Koleksi AI</Link></li>
                            <li><Link to="/kategori" className="text-gray-400 hover:text-white transition">Kategori</Link></li>
                            <li><Link to="/koleksi" className="text-gray-400 hover:text-white transition">Karya Terbaru</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4">Tentang Kami</h4>
                        <ul className="space-y-2">
                            <li><a href="/tentang-kami/visi" className="text-gray-400 hover:text-white transition">Visi & Misi</a></li>
                            <li><a href="/tentang-kami/teknologi-ai" className="text-gray-400 hover:text-white transition">Teknologi AI</a></li>
                            <li><a href="/kontak" className="text-gray-400 hover:text-white transition">Kontak</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 Storynesia. Ruang imajinasi tanpa akhir yang didukung kecerdasan buatan.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;