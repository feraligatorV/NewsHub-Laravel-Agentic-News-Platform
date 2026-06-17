import AppShell from '@/Components/Layout/AppShell';
import PasswordTextField from '@/Components/PasswordTextField';
import { Head, useForm } from '@inertiajs/react';
import LockResetIcon from '@mui/icons-material/LockReset';
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

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppShell>
            <Head title="Reset Password" />

            <Box sx={{ maxWidth: 520, mx: 'auto' }}>
                <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                    <Stack spacing={3} component="form" onSubmit={submit}>
                        <Box>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 900 }}>
                                Reset password
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                Choose a new password for your web account.
                            </Typography>
                        </Box>

                        {Object.keys(errors).length > 0 && (
                            <Alert severity="error" variant="outlined">
                                Review the highlighted fields and try again.
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
                        <PasswordTextField
                            label="New password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            autoComplete="new-password"
                            required
                            fullWidth
                        />
                        <PasswordTextField
                            label="Confirm new password"
                            value={data.password_confirmation}
                            onChange={(event) => setData('password_confirmation', event.target.value)}
                            error={Boolean(errors.password_confirmation)}
                            helperText={errors.password_confirmation}
                            autoComplete="new-password"
                            required
                            fullWidth
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={processing}
                            startIcon={<LockResetIcon />}
                        >
                            {processing ? 'Updating...' : 'Reset password'}
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </AppShell>
    );
}
