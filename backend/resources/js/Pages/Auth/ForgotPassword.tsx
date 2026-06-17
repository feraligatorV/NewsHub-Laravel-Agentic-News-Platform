import AppShell from '@/Components/Layout/AppShell';
import { Head, Link, useForm } from '@inertiajs/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
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

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(route('password.email'));
    };

    return (
        <AppShell>
            <Head title="Forgot Password" />

            <Box sx={{ maxWidth: 500, mx: 'auto' }}>
                <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                    <Stack spacing={3} component="form" onSubmit={submit}>
                        <Box>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 900 }}>
                                Forgot password
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                Enter your email and we will send a reset link if the account exists.
                            </Typography>
                        </Box>

                        {status && (
                            <Alert severity="success" variant="outlined">
                                {status}
                            </Alert>
                        )}

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

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'space-between' }}>
                            <Button component={Link} href={route('login')} startIcon={<ArrowBackIcon />}>
                                Back to login
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={processing}
                                startIcon={<MarkEmailReadIcon />}
                            >
                                {processing ? 'Sending...' : 'Send reset link'}
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        </AppShell>
    );
}
