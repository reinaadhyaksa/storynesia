import { defaultAvatars } from '../utils/cloudinary';
import { AuthForm, FormInput, AvatarSelector } from '../components/Template';
import { useAuthForm, useAvatar, useAuthHandlers } from '../utils/components/auth';

const RegisterPages = () => {
    const { data, setData, error, setError, loading, setLoading, handleChange } = useAuthForm({
        full_name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { selectedAvatar, avatarFile, avatarError, handleAvatarSelect, handleFileChange } = useAvatar(defaultAvatars[0]);
    const { handleRegister } = useAuthHandlers();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(data, selectedAvatar, avatarFile, setError, setLoading);
    };

    return (
        <AuthForm
            title="Daftar Akun Baru"
            subtitle="Atau"
            linkText="masuk ke akun yang sudah ada"
            linkPath="/masuk"
            onSubmit={handleSubmit}
            error={error || avatarError}
            loading={loading}
        >
            <FormInput
                id="full_name"
                name="full_name"
                type="text"
                label="Nama Lengkap"
                autoComplete="name"
                value={data.full_name}
                onChange={handleChange}
            />

            <FormInput
                id="email"
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                value={data.email}
                onChange={handleChange}
            />

            <AvatarSelector
                selectedAvatar={selectedAvatar}
                onAvatarSelect={handleAvatarSelect}
                onFileChange={handleFileChange}
                error={avatarError}
            />

            <FormInput
                id="password"
                name="password"
                type="password"
                label="Password"
                autoComplete="new-password"
                value={data.password}
                onChange={handleChange}
            />

            <FormInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Konfirmasi Password"
                autoComplete="new-password"
                value={data.confirmPassword}
                onChange={handleChange}
            />
        </AuthForm>
    );
};

export default RegisterPages;