import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { uploadToCloudinary, defaultAvatars, applyTransformation } from '../utils/cloudinary'
import { Icon } from '@iconify/react'
import { useNavigate, Link } from 'react-router-dom'
import { FavoritesTab } from './Favorite'
import {
    generateUsernameSlug,
    handleAvatarSelection,
    handleFileSelection,
    handleProfileUpdate
} from '../utils/components/editFormUtils'

const EditProfileForm = ({ profile, user, onUpdateSuccess, favorites, loadingFavorites, onRemoveFavorite }) => {
    const { updateProfile, signOut } = useAuth()
    const [activeTab, setActiveTab] = useState('profile')
    const [data, setData] = useState({
        full_name: profile?.full_name || '',
        email: user?.email || '',
        username: generateUsernameSlug(profile?.full_name, user?.email)
    })
    const [selectedAvatar, setSelectedAvatar] = useState(profile?.avatar_url || defaultAvatars[0])
    const [avatarFile, setAvatarFile] = useState(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleAvatarSelect = (avatarUrl) => {
        handleAvatarSelection(avatarUrl, setSelectedAvatar, setAvatarFile)
    }

    const handleFileChange = (e) => {
        handleFileSelection(e, setAvatarFile, setSelectedAvatar)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleProfileUpdate(
            data,
            selectedAvatar,
            avatarFile,
            defaultAvatars,
            updateProfile,
            user,
            setError,
            setSuccess,
            setLoading,
            onUpdateSuccess
        )
    }

    const handleSignOut = async () => {
        try {
            await signOut()
            navigate('/')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Edit Profil
                    </button>
                    <button
                        onClick={() => setActiveTab('favorites')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'favorites' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Favorit
                    </button>
                </nav>
            </div>

            {activeTab === 'profile' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                            {success}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Foto Profil
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {defaultAvatars.map((avatar, index) => (
                                <div
                                    key={index}
                                    className={`w-12 h-12 rounded-full overflow-hidden cursor-pointer border-2 ${selectedAvatar === avatar && !avatarFile ? 'border-purple-500' : 'border-gray-300'}`}
                                    onClick={() => handleAvatarSelect(avatar)}
                                >
                                    <img
                                        src={avatar}
                                        alt={`Avatar ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden mr-3 border">
                                <img
                                    src={selectedAvatar}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <label className="cursor-pointer bg-purple-100 text-purple-700 px-3 py-2 rounded-md text-sm hover:bg-purple-200 transition">
                                <Icon icon="fa6-solid:upload" className="mr-1" />
                                Pilih File
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                            Nama Lengkap
                        </label>
                        <input
                            id="full_name"
                            name="full_name"
                            type="text"
                            value={data.full_name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={handleChange}
                            disabled
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
                        />
                        <p className="mt-1 text-xs text-gray-500">Email tidak dapat diubah</p>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                        >
                            {loading ? (
                                <Icon icon="eos-icons:loading" className="text-xl" />
                            ) : (
                                'Simpan Perubahan'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="flex-1 flex justify-center items-center py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <Icon icon="fa6-solid:right-from-bracket" className="mr-1" />
                            Keluar
                        </button>
                    </div>
                </form>
            ) : (
                <FavoritesTab
                    favorites={favorites}
                    loadingFavorites={loadingFavorites}
                    onRemoveFavorite={onRemoveFavorite}
                />
            )}
        </div>
    )
}

export default EditProfileForm