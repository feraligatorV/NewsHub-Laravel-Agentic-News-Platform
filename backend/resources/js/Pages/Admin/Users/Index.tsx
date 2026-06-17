import AppShell from '@/Components/Layout/AppShell';
import { Head, Link, router, usePage } from '@inertiajs/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ShieldIcon from '@mui/icons-material/Shield';
import {
    Alert,
    Box,
    Button,
    Chip,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';

interface AdminUserRow {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    email_verified_at: string | null;
    created_at: string | null;
}

interface IndexProps {
    users: {
        data: AdminUserRow[];
    };
    adminCount: number;
}

export default function Index({ users, adminCount }: IndexProps) {
    const page = usePage();
    const currentUser = page.props.auth.user;
    const errors = page.props.errors as Record<string, string | undefined>;

    return (
        <AppShell>
            <Head title="Admin user management" />

            <Stack spacing={3}>
                <Button component={Link} href={route('admin.dashboard')} startIcon={<ArrowBackIcon />} sx={{ alignSelf: 'flex-start' }}>
                    Back to dashboard
                </Button>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 900, color: '#062544' }}>
                            User management
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                            Review registered users and manage admin access.
                        </Typography>
                    </Box>
                    <Chip icon={<ShieldIcon />} label={`${adminCount} admin${adminCount === 1 ? '' : 's'}`} color="primary" sx={{ alignSelf: { xs: 'flex-start', md: 'center' } }} />
                </Stack>

                {errors.users && <Alert severity="error">{errors.users}</Alert>}

                <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Verified</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.data.map((user) => {
                                const isCurrentUser = currentUser.id === user.id;
                                const isLastAdmin = user.is_admin && adminCount <= 1;
                                const cannotRevoke = isLastAdmin;
                                const cannotDelete = isCurrentUser || isLastAdmin;

                                return (
                                    <TableRow key={user.id} hover>
                                        <TableCell>
                                            <Stack spacing={0.5}>
                                                <Typography sx={{ fontWeight: 800 }}>{user.name}</Typography>
                                                {isCurrentUser && <Typography color="text.secondary">Current session</Typography>}
                                            </Stack>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Chip label={user.is_admin ? 'Admin' : 'User'} color={user.is_admin ? 'primary' : 'default'} size="small" />
                                        </TableCell>
                                        <TableCell>{user.email_verified_at ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Pending'}</TableCell>
                                        <TableCell align="right">
                                            {user.is_admin ? (
                                                <Tooltip title={cannotRevoke ? 'At least one admin is required' : 'Revoke admin'}>
                                                    <span>
                                                        <IconButton disabled={cannotRevoke} onClick={() => router.post(route('admin.users.revoke-admin', user.id))}>
                                                            <PersonRemoveIcon />
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="Grant admin">
                                                    <IconButton onClick={() => router.post(route('admin.users.grant-admin', user.id))}>
                                                        <PersonAddAlt1Icon />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            <Tooltip title={cannotDelete ? 'This user cannot be deleted' : 'Delete user'}>
                                                <span>
                                                    <IconButton color="error" disabled={cannotDelete} onClick={() => router.delete(route('admin.users.destroy', user.id))}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </span>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </Stack>
        </AppShell>
    );
}
