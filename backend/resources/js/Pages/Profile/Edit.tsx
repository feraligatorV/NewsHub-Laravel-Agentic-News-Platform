import AppShell from '@/Components/Layout/AppShell';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AppShell>
            <Head title="Profile" />

            <Stack spacing={3}>
                <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 900 }}>
                        Profile
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                        Manage your web account information, password and account lifecycle.
                    </Typography>
                </Box>

                <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                </Paper>

                <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                    <UpdatePasswordForm />
                </Paper>

                <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                    <DeleteUserForm />
                </Paper>
            </Stack>
        </AppShell>
    );
}
