import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Icon } from '@iconify/react'
import { defaultAvatars, uploadToCloudinary, optimizeCloudinaryUrl } from '../utils/cloudinary'

const RegisterPages = () => {
    const [data, setData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatars[0])
    const [avatarFile, setAvatarFile] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { signUp } = useAuth()

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleAvatarSelect = (avatarUrl) => {
        setSelectedAvatar(avatarUrl)
        setAvatarFile(null)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Ukuran file maksimal 5MB')
                return
            }

            if (!file.type.startsWith('image/')) {
                setError('File harus berupa gambar')
                return
            }

            setAvatarFile(file)
            setError('')
            const reader = new FileReader()
            reader.onload = (e) => {
                setSelectedAvatar(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password !== data.confirmPassword) {
            return setError('Password tidak cocok')
        }

        try {
            setError('')
            setLoading(true)

            let avatarUrl = selectedAvatar

            if (avatarFile && !defaultAvatars.includes(selectedAvatar)) {
                try {
                    avatarUrl = await uploadToCloudinary(avatarFile, {
                        folder: 'user_avatars'
                    })

                    avatarUrl = optimizeCloudinaryUrl(avatarUrl, {
                        width: 300,
                        height: 300,
                        quality: 'q_auto',
                        format: 'f_auto'
                    });

                } catch (uploadError) {
                    setError(`Gagal mengupload gambar: ${uploadError.message}`)
                    setLoading(false)
                    return
                }
            } else if (defaultAvatars.includes(selectedAvatar)) {
                avatarUrl = selectedAvatar;
            }

            const { error } = await signUp({
                email: data.email,
                password: data.password,
                full_name: data.full_name,
                avatar_url: avatarUrl 
            })

            if (error) {
                setError(error.message)
            } else {
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen pt-24 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" data-aos="fade-up">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Daftar Akun Baru
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Atau{' '}
                    <Link
                        to="/masuk"
                        className="font-medium text-purple-600 hover:text-purple-500"
                    >
                        masuk ke akun yang sudah ada
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="full_name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nama Lengkap
                            </label>
                            <div className="mt-1">
                                <input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={data.full_name}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={data.email}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pilih Avatar
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

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Atau unggah foto profil
                            </label>
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
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={data.password}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Konfirmasi Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                            >
                                {loading ? (
                                    <Icon icon="eos-icons:loading" className="text-xl" />
                                ) : (
                                    'Daftar'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPages