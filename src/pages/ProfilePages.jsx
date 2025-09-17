import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { defaultAvatars } from '../utils/cloudinary'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import EditProfileForm from '../components/EditProfileForm'
import { NotFoundPage } from './NotFound'

const ProfilePage = () => {
    const { username } = useParams()
    const { user, profile, loading } = useAuth() // 👈 pakai loading dari AuthProvider
    const [data, setData] = useState({ full_name: '', email: '', username: '' })
    const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatars[0])
    const [error, setError] = useState('')
    const [isOwnProfile, setIsOwnProfile] = useState(false)
    const [favorites, setFavorites] = useState([])
    const [loadingFavorites, setLoadingFavorites] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return;

        const checkProfileOwnership = async () => {
            if (user) {
                const userUsername = generateUsernameSlug(profile?.full_name, user.email);

                if (username === userUsername) {
                    setIsOwnProfile(true);
                    setData({
                        full_name: profile?.full_name || '',
                        email: user.email || '',
                        username: userUsername
                    });
                    setSelectedAvatar(profile?.avatar_url || defaultAvatars[0]);
                } else {
                    const { data: otherUser, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('username', username)
                        .single();

                    if (otherUser) {
                        setData({
                            full_name: otherUser.full_name || '',
                            email: otherUser.email || '',
                            username
                        });
                        setSelectedAvatar(otherUser.avatar_url || defaultAvatars[0]);
                    } else {
                        setError('Profil tidak ditemukan');
                    }
                    setIsOwnProfile(false);
                }
            } else {
                // public user
                const { data: publicUser } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('username', username)
                    .single();

                if (publicUser) {
                    setData({
                        full_name: publicUser.full_name || '',
                        email: '',
                        username
                    });
                    setSelectedAvatar(publicUser.avatar_url || defaultAvatars[0]);
                } else {
                    setError('Profil tidak ditemukan');
                }
                setIsOwnProfile(false);
            }
        };

        console.log("🔄 ProfilePage mounted, loading:", loading, "user:", user);
        checkProfileOwnership();
    }, [username, user, profile, loading]); 

    useEffect(() => {
        if (isOwnProfile && user?.id) {
            fetchFavorites();
        }
    }, [isOwnProfile, user?.id]); 


    const generateUsernameSlug = (name, email) => {
        if (name) {
            return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
        }
        return email.split('@')[0].toLowerCase()
    }

    const fetchFavorites = async () => {
        if (!user) {
            console.log("⚠️ Tidak ada user saat fetchFavorites jalan")
            return
        }
        setLoadingFavorites(true)
        try {
            const { data: favoritesData, error } = await supabase
                .from('favorites')
                .select('id, book_slug, book_data, created_at') // 👈 pastikan field sesuai tabel
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('❌ Error fetching favorites:', error)
                return
            }

            console.log("✅ Favorites berhasil:", favoritesData)
            setFavorites(favoritesData || [])
        } catch (err) {
            console.error('🔥 Exception saat fetchFavorites:', err)
        } finally {
            setLoadingFavorites(false)
        }
    }

    const removeFavorite = async (favoriteId) => {
        try {
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('id', favoriteId)

            if (error) {
                console.error('Error removing favorite:', error)
                alert('Gagal menghapus dari favorit')
                return
            }

            setFavorites(favorites.filter(fav => fav.id !== favoriteId))
        } catch (err) {
            console.error('Error removing favorite:', err)
            alert('Terjadi kesalahan saat menghapus favorit')
        }
    }

    const handleUpdateSuccess = (newUsername) => {
        if (newUsername !== username) {
            navigate(`/${newUsername}`, { replace: true })
        }
    }

    return (
        <div className="min-h-screen pt-24 bg-gray-50 py-8" data-aos="fade-up">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        {isOwnProfile ? 'Edit Profil' : ""}
                    </h2>

                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    )}

                    {isOwnProfile ? (
                        <EditProfileForm
                            profile={profile}
                            user={user}
                            onUpdateSuccess={handleUpdateSuccess}
                            favorites={favorites}
                            loadingFavorites={loadingFavorites}
                            onRemoveFavorite={removeFavorite}
                        />
                    ) : (
                        <NotFoundPage />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage