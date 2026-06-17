import PasswordTextField from '@/Components/PasswordTextField';
import { useForm } from '@inertiajs/react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from '@mui/material';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const closeDialog = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    const deleteUser: FormEventHandler = (event) => {
        event.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeDialog(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <Stack spacing={3} component="section">
            <Stack spacing={0.5}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 800 }}>
                    Delete account
                </Typography>
                <Typography color="text.secondary">
                    Permanently delete your web account and its stored profile data.
                </Typography>
            </Stack>

            <Alert severity="warning" variant="outlined">
                This action cannot be undone.
            </Alert>

            <Button
                color="error"
                variant="contained"
                onClick={() => setConfirmingUserDeletion(true)}
                startIcon={<DeleteForeverIcon />}
            >
                Delete account
            </Button>

            <Dialog open={confirmingUserDeletion} onClose={closeDialog} fullWidth maxWidth="sm">
                <Box component="form" onSubmit={deleteUser}>
                    <DialogTitle>Delete account</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} sx={{ pt: 1 }}>
                            <Typography color="text.secondary">
                                Enter your password to confirm permanent account deletion.
                            </Typography>
                            <PasswordTextField
                                label="Password"
                                inputRef={passwordInput}
                                value={data.password}
                                onChange={(event) => setData('password', event.target.value)}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                autoComplete="current-password"
                                fullWidth
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 3 }}>
                        <Button onClick={closeDialog}>Cancel</Button>
                        <Button type="submit" color="error" variant="contained" disabled={processing}>
                            {processing ? 'Deleting...' : 'Delete account'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Stack>
    );
}
