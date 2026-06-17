import AppShell from '@/Components/Layout/AppShell';
import PasswordTextField from '@/Components/PasswordTextField';
import { Head, useForm } from '@inertiajs/react';
import LockIcon from '@mui/icons-material/Lock';
import {
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AppShell>
            <Head title="Confirm Password" />

            <Box sx={{ maxWidth: 460, mx: 'auto' }}>
                <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                    <Stack spacing={3} component="form" onSubmit={submit}>
                        <Box>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 900 }}>
                                Confirm password
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                This secure area requires your current password.
                            </Typography>
                        </Box>

                        {errors.password && (
                            <Alert severity="error" variant="outlined">
                                {errors.password}
                            </Alert>
                        )}

                        <PasswordTextField
                            label="Password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            autoComplete="current-password"
                            required
                            fullWidth
                        />

                        <Button type="submit" variant="contained" disabled={processing} startIcon={<LockIcon />}>
                            {processing ? 'Confirming...' : 'Confirm'}
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </AppShell>
    );
}
