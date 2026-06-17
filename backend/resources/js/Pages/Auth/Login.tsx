import AppShell from '@/Components/Layout/AppShell';
import PasswordTextField from '@/Components/PasswordTextField';
import { getErrorMessage, login } from '@/lib/api';
import { storeSession } from '@/lib/auth';
import { Head, Link, router } from '@inertiajs/react';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import {
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { FormEvent, useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await login(email, password);
            storeSession(response.data.access_token, response.data.user);

            router.post(route('login'), {
                email,
                password,
                remember: false,
            }, {
                onSuccess: () => router.visit('/'),
                onError: () => router.visit('/'),
                onFinish: () => setLoading(false),
            });
        } catch (requestError) {
            setError(getErrorMessage(requestError));
            setLoading(false);
        }
    };

    return (
        <AppShell>
            <Head title="Login" />

            <Box sx={{ maxWidth: 460, mx: 'auto' }}>
                <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                    <Stack spacing={3} component="form" onSubmit={submit}>
                        <Box>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 900 }}>
                                Login
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                Use API credentials to receive a JWT token.
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" variant="outlined">
                                {error}
                            </Alert>
                        )}

                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="username"
                            required
                            fullWidth
                        />
                        <PasswordTextField
                            label="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="current-password"
                            required
                            fullWidth
                        />
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'space-between' }}>
                            <Button component={Link} href={route('password.request')}>
                                Forgot password
                            </Button>
                            <Button component={Link} href={route('register')} startIcon={<AppRegistrationIcon />}>
                                Register
                            </Button>
                        </Stack>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            startIcon={<LoginIcon />}
                        >
                            {loading ? 'Signing in...' : 'Login'}
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </AppShell>
    );
}
