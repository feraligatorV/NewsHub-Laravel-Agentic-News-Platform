import AppShell from '@/Components/Layout/AppShell';
import PasswordTextField from '@/Components/PasswordTextField';
import { Head, Link, useForm } from '@inertiajs/react';
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
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppShell>
            <Head title="Register" />

            <Box sx={{ maxWidth: 520, mx: 'auto' }}>
                <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                    <Stack spacing={3} component="form" onSubmit={submit}>
                        <Box>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 900 }}>
                                Register
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                Create a web account for the NewsHub frontend. API access remains protected with JWT.
                            </Typography>
                        </Box>

                        {Object.keys(errors).length > 0 && (
                            <Alert severity="error" variant="outlined">
                                Review the highlighted fields and try again.
                            </Alert>
                        )}

                        <TextField
                            label="Name"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                            autoComplete="name"
                            required
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            autoComplete="username"
                            required
                            fullWidth
                        />
                        <PasswordTextField
                            label="Password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            autoComplete="new-password"
                            required
                            fullWidth
                        />
                        <PasswordTextField
                            label="Confirm password"
                            value={data.password_confirmation}
                            onChange={(event) => setData('password_confirmation', event.target.value)}
                            error={Boolean(errors.password_confirmation)}
                            helperText={errors.password_confirmation}
                            autoComplete="new-password"
                            required
                            fullWidth
                        />

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'space-between' }}>
                            <Button component={Link} href={route('login')} startIcon={<LoginIcon />}>
                                Already registered
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={processing}
                                startIcon={<AppRegistrationIcon />}
                            >
                                {processing ? 'Creating account...' : 'Register'}
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        </AppShell>
    );
}
