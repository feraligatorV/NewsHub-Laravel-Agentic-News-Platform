import { clearSession, getStoredUser, getToken } from '@/lib/auth';
import { logout } from '@/lib/api';
import type { PageProps } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonIcon from '@mui/icons-material/Person';
import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

interface AppShellProps {
    children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
    const page = usePage<PageProps>();
    const pageUser = page.props.auth?.user;
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

        if (pageUser) {
            router.post('/logout', {}, {
                onFinish: () => router.visit('/'),
            });
            return;
        }

        router.visit('/');
    };

    const isAuthenticated = Boolean(pageUser || getToken() || userName);
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    bgcolor: '#062544',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                }}
            >
                <Toolbar
                    component={Container}
                    maxWidth="lg"
                    disableGutters
                    sx={{
                        minHeight: { xs: 72, md: 76 },
                        px: { xs: 2, md: 3 },
                        py: { xs: 1.25, md: 0 },
                        gap: 2,
                        flexWrap: { xs: 'wrap', md: 'nowrap' },
                    }}
                >
                    <Stack direction="row" spacing={1.25} sx={{ flexGrow: 1, alignItems: 'center', minWidth: 180 }}>
                        <Box
                            sx={{
                                width: 42,
                                height: 42,
                                borderRadius: 2,
                                bgcolor: '#00a8cc',
                                color: '#062544',
                                display: 'grid',
                                placeItems: 'center',
                            }}
                        >
                            <NewspaperIcon />
                        </Box>
                        <Box>
                            <Typography variant="h6" component="div" sx={{ fontWeight: 900, lineHeight: 1 }}>
                                NewsHub
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.72)', fontWeight: 700 }}>
                                Regional Business News
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={0.75}
                        sx={{
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            justifyContent: { xs: 'flex-start', md: 'flex-end' },
                            width: { xs: '100%', md: 'auto' },
                        }}
                    >
                        <Button color="inherit" component={Link} href="/" startIcon={<NewspaperIcon />} size="small">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} href="/categories" startIcon={<MenuBookIcon />} size="small">
                            Categories
                        </Button>
                        {pageUser?.is_admin && (
                            <>
                                <Button color="inherit" component={Link} href="/admin" startIcon={<DashboardIcon />} size="small">
                                    Admin
                                </Button>
                                <Button color="inherit" component={Link} href="/admin/ai-drafts" startIcon={<AutoAwesomeIcon />} size="small">
                                    Borradores IA
                                </Button>
                            </>
                        )}
                        {isAuthenticated ? (
                            <>
                                <Button color="inherit" component={Link} href="/profile" startIcon={<PersonIcon />} size="small">
                                    Profile
                                </Button>
                                <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />} size="small">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="inherit" component={Link} href="/login" startIcon={<LoginIcon />} size="small">
                                    Login
                                </Button>
                                <Button
                                    component={Link}
                                    href="/register"
                                    startIcon={<AppRegistrationIcon />}
                                    size="small"
                                    variant="contained"
                                    sx={{ bgcolor: '#00a8cc', color: '#062544', '&:hover': { bgcolor: '#28c7e8' } }}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
                {children}
            </Container>

            <Box component="footer" sx={{ bgcolor: '#061d35', color: '#dbeafe', mt: 4 }}>
                <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 }, px: { xs: 2, md: 3 } }}>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={3}
                        divider={<Divider flexItem orientation="vertical" sx={{ borderColor: 'rgba(255,255,255,0.16)' }} />}
                        sx={{ justifyContent: 'space-between' }}
                    >
                        <Box sx={{ maxWidth: 420 }}>
                            <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                NewsHub
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(219, 234, 254, 0.78)', mt: 1 }}>
                                Independent regional coverage for business, technology and public interest updates.
                            </Typography>
                        </Box>
                        <Stack spacing={1}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                                Sections
                            </Typography>
                            <Button color="inherit" component={Link} href="/" size="small" sx={{ justifyContent: 'flex-start' }}>
                                Home
                            </Button>
                            <Button color="inherit" component={Link} href="/categories" size="small" sx={{ justifyContent: 'flex-start' }}>
                                Categories
                            </Button>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
                                Access
                            </Typography>
                            <Button color="inherit" component={Link} href={isAuthenticated ? '/profile' : '/login'} size="small" sx={{ justifyContent: 'flex-start' }}>
                                {isAuthenticated ? 'Profile' : 'Login'}
                            </Button>
                            {!isAuthenticated && (
                                <Button color="inherit" component={Link} href="/register" size="small" sx={{ justifyContent: 'flex-start' }}>
                                    Register
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}
