import AppShell from '@/Components/Layout/AppShell';
import { getErrorMessage, login } from '@/lib/api';
import { storeSession } from '@/lib/auth';
import { Head, router } from '@inertiajs/react';
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
            router.visit('/');
        } catch (requestError) {
            setError(getErrorMessage(requestError));
        } finally {
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
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="current-password"
                            required
                            fullWidth
                        />
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
