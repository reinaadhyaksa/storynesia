import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { uploadToCloudinary, optimizeCloudinaryUrl } from '../cloudinary';

export const useAuthForm = (initialState) => {
    const [data, setData] = useState(initialState);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    return { data, setData, error, setError, loading, setLoading, handleChange };
};

export const useAvatar = (initialAvatar) => {
    const [selectedAvatar, setSelectedAvatar] = useState(initialAvatar);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarError, setAvatarError] = useState('');

    const handleAvatarSelect = (avatarUrl) => {
        setSelectedAvatar(avatarUrl);
        setAvatarFile(null);
        setAvatarError('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setAvatarError('Ukuran file maksimal 5MB');
            return;
        }

        if (!file.type.startsWith('image/')) {
            setAvatarError('File harus berupa gambar');
            return;
        }

        setAvatarFile(file);
        setAvatarError('');
        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedAvatar(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    return {
        selectedAvatar,
        avatarFile,
        avatarError,
        handleAvatarSelect,
        handleFileChange,
        setAvatarError
    };
};

export const useAuthHandlers = () => {
    const navigate = useNavigate();
    const { signUp, signIn } = useAuth();

    const handleRegister = async (data, selectedAvatar, avatarFile, setError, setLoading) => {
        if (data.password !== data.confirmPassword) {
            return setError('Password tidak cocok');
        }

        try {
            setError('');
            setLoading(true);

            let avatarUrl = selectedAvatar;

            if (avatarFile) {
                try {
                    avatarUrl = await uploadToCloudinary(avatarFile, {
                        folder: 'user_avatars'
                    });

                    avatarUrl = optimizeCloudinaryUrl(avatarUrl, {
                        width: 300,
                        height: 300,
                        quality: 'q_auto',
                        format: 'f_auto'
                    });
                } catch (uploadError) {
                    setError(`Gagal mengupload gambar: ${uploadError.message}`);
                    setLoading(false);
                    return;
                }
            }

            const { error } = await signUp({
                email: data.email,
                password: data.password,
                full_name: data.full_name,
                avatar_url: avatarUrl
            });

            if (error) {
                setError(error.message);
            } else {
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (data, setError, setLoading) => {
        try {
            setError('');
            setLoading(true);
            const { error } = await signIn(data);
            if (error) {
                setError(error.message);
            } else {
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { handleRegister, handleLogin };
};