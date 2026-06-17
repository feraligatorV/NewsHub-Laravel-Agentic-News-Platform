import PasswordTextField from '@/Components/PasswordTextField';
import { useForm } from '@inertiajs/react';
import SaveIcon from '@mui/icons-material/Save';
import {
    Alert,
    Button,
    Stack,
    Typography,
} from '@mui/material';
import { FormEventHandler, useRef } from 'react';

export default function UpdatePasswordForm() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (event) => {
        event.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (formErrors) => {
                if (formErrors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (formErrors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <Stack spacing={3} component="section">
            <Stack spacing={0.5}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 800 }}>
                    Update password
                </Typography>
                <Typography color="text.secondary">
                    Use a long, unique password for your web account.
                </Typography>
            </Stack>

            <Stack spacing={2.5} component="form" onSubmit={updatePassword}>
                <PasswordTextField
                    label="Current password"
                    inputRef={currentPasswordInput}
                    value={data.current_password}
                    onChange={(event) => setData('current_password', event.target.value)}
                    error={Boolean(errors.current_password)}
                    helperText={errors.current_password}
                    autoComplete="current-password"
                    fullWidth
                />
                <PasswordTextField
                    label="New password"
                    inputRef={passwordInput}
                    value={data.password}
                    onChange={(event) => setData('password', event.target.value)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    autoComplete="new-password"
                    fullWidth
                />
                <PasswordTextField
                    label="Confirm new password"
                    value={data.password_confirmation}
                    onChange={(event) => setData('password_confirmation', event.target.value)}
                    error={Boolean(errors.password_confirmation)}
                    helperText={errors.password_confirmation}
                    autoComplete="new-password"
                    fullWidth
                />

                {recentlySuccessful && (
                    <Alert severity="success" variant="outlined">
                        Password updated.
                    </Alert>
                )}

                <Button type="submit" variant="contained" disabled={processing} startIcon={<SaveIcon />}>
                    {processing ? 'Saving...' : 'Update password'}
                </Button>
            </Stack>
        </Stack>
    );
}
