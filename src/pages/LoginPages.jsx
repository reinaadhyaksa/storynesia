import { AuthForm, FormInput } from '../components/Template';
import { useAuthForm, useAuthHandlers } from '../utils/components/auth';

const LoginPages = () => {
    const { data, error, setError, loading, setLoading, handleChange } = useAuthForm({
        email: '',
        password: '',
    });

    const { handleLogin } = useAuthHandlers();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(data, setError, setLoading);
    };

    return (
        <AuthForm
            title="Masuk ke Storynesia"
            subtitle="Atau"
            linkText="buat akun baru"
            linkPath="/daftar"
            onSubmit={handleSubmit}
            error={error}
            loading={loading}
        >
            <FormInput
                id="email"
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                value={data.email}
                onChange={handleChange}
            />

            <FormInput
                id="password"
                name="password"
                type="password"
                label="Password"
                autoComplete="current-password"
                value={data.password}
                onChange={handleChange}
            />
        </AuthForm>
    );
};

export default LoginPages;