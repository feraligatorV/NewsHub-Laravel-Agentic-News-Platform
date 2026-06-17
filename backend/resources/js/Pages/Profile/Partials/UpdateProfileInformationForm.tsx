import { Link, useForm, usePage } from '@inertiajs/react';
import SaveIcon from '@mui/icons-material/Save';
import {
    Alert,
    Button,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <Stack spacing={3} component="section">
            <Stack spacing={0.5}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 800 }}>
                    Profile information
                </Typography>
                <Typography color="text.secondary">
                    Update your account name and email address.
                </Typography>
            </Stack>

            <Stack spacing={2.5} component="form" onSubmit={submit}>
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

                {mustVerifyEmail && user.email_verified_at === null && (
                    <Alert severity="warning" variant="outlined">
                        Your email address is unverified.{' '}
                        <Link href={route('verification.send')} method="post" as="button">
                            Re-send verification email
                        </Link>
                    </Alert>
                )}

                {status === 'verification-link-sent' && (
                    <Alert severity="success" variant="outlined">
                        A new verification link has been sent to your email address.
                    </Alert>
                )}

                {recentlySuccessful && (
                    <Alert severity="success" variant="outlined">
                        Profile saved.
                    </Alert>
                )}

                <Button type="submit" variant="contained" disabled={processing} startIcon={<SaveIcon />}>
                    {processing ? 'Saving...' : 'Save profile'}
                </Button>
            </Stack>
        </Stack>
    );
}
