import { clearSession, getStoredUser, getToken } from '@/lib/auth';
import { logout } from '@/lib/api';
import { Link } from '@inertiajs/react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import {
    AppBar,
    Box,
    Button,
    Container,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

interface AppShellProps {
    children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const syncAuth = () => {
            setUserName(getStoredUser()?.name ?? null);
        };

        syncAuth();
        window.addEventListener('newshub-auth-changed', syncAuth);
        window.addEventListener('storage', syncAuth);

        return () => {
            window.removeEventListener('newshub-auth-changed', syncAuth);
            window.removeEventListener('storage', syncAuth);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch {
            clearSession();
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fb' }}>
            <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#16202a' }}>
                <Toolbar component={Container} maxWidth="lg" disableGutters sx={{ px: { xs: 2, md: 3 } }}>
                    <Stack direction="row" spacing={1} sx={{ flexGrow: 1, alignItems: 'center' }}>
                        <NewspaperIcon />
                        <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
                            NewsHub
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Button color="inherit" component={Link} href="/" startIcon={<NewspaperIcon />}>
                            Home
                        </Button>
                        <Button color="inherit" component={Link} href="/categories" startIcon={<MenuBookIcon />}>
                            Categories
                        </Button>
                        {getToken() || userName ? (
                            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                                Logout
                            </Button>
                        ) : (
                            <Button color="inherit" component={Link} href="/login" startIcon={<LoginIcon />}>
                                Login
                            </Button>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
                {children}
            </Container>
        </Box>
    );
}
