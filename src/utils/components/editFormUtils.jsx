export const generateUsernameSlug = (name, email) => {
    if (name) {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }
    return email?.split('@')[0].toLowerCase() || '';
};

export const handleAvatarSelection = (avatarUrl, setSelectedAvatar, setAvatarFile) => {
    setSelectedAvatar(avatarUrl);
    setAvatarFile(null);
};

export const handleFileSelection = (e, setAvatarFile, setSelectedAvatar) => {
    const file = e.target.files[0];
    if (file) {
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedAvatar(e.target.result);
        };
        reader.readAsDataURL(file);
    }
};

export const processAvatarUpload = async (avatarFile, selectedAvatar, defaultAvatars) => {
    let avatarUrl = selectedAvatar;

    if (avatarFile && !defaultAvatars.includes(selectedAvatar)) {
        try {
            avatarUrl = await uploadToCloudinary(avatarFile, {
                folder: 'user_avatars'
            });

            avatarUrl = applyTransformation(avatarUrl, {
                width: 300,
                height: 300,
                crop: 'fill',
                quality: 'q_auto',
                format: 'f_auto'
            });

            return avatarUrl;
        } catch (uploadError) {
            throw new Error(`Gagal mengupload gambar: ${uploadError.message}`);
        }
    }

    return avatarUrl;
};

export const handleProfileUpdate = async (
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
) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
        const avatarUrl = await processAvatarUpload(avatarFile, selectedAvatar, defaultAvatars);

        const { error: updateError } = await updateProfile({
            full_name: data.full_name,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString()
        });

        if (updateError) {
            setError(updateError.message);
        } else {
            setSuccess('Profil berhasil diperbarui!');
            const newUsername = generateUsernameSlug(data.full_name, user.email);
            if (onUpdateSuccess) {
                onUpdateSuccess(newUsername);
            }
        }
    } catch (error) {
        setError(`Terjadi kesalahan: ${error.message}`);
    } finally {
        setLoading(false);
    }
};