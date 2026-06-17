import AppShell from '@/Components/Layout/AppShell';
import { Head, Link } from '@inertiajs/react';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DraftsIcon from '@mui/icons-material/Drafts';
import GroupIcon from '@mui/icons-material/Group';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

interface DashboardProps {
    stats: {
        totalNews: number;
        draftNews: number;
        publishedNews: number;
        aiDrafts: number;
        totalUsers: number;
        adminUsers: number;
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AppShell>
            <Head title="Admin dashboard" />

            <Stack spacing={4}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 900, color: '#062544' }}>
                            Admin dashboard
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                            Manage legal news, draft content and AI-ready editorial review.
                        </Typography>
                    </Box>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                        <Button component={Link} href={route('admin.ai-drafts.index')} variant="outlined" startIcon={<AutoAwesomeIcon />}>
                            Borradores IA
                        </Button>
                        <Button component={Link} href={route('admin.users.index')} variant="outlined" startIcon={<GroupIcon />}>
                            Manage users
                        </Button>
                        <Button component={Link} href={route('admin.news.create')} variant="contained" startIcon={<AddIcon />}>
                            Create news
                        </Button>
                    </Stack>
                </Stack>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))', lg: 'repeat(6, minmax(0, 1fr))' }, gap: 2 }}>
                    <StatCard icon={<ArticleIcon />} label="Total news" value={stats.totalNews} />
                    <StatCard icon={<DraftsIcon />} label="Drafts" value={stats.draftNews} />
                    <StatCard icon={<CheckCircleIcon />} label="Published" value={stats.publishedNews} />
                    <StatCard icon={<AutoAwesomeIcon />} label="AI drafts" value={stats.aiDrafts} />
                    <StatCard icon={<GroupIcon />} label="Users" value={stats.totalUsers} />
                    <StatCard icon={<ManageAccountsIcon />} label="Admins" value={stats.adminUsers} />
                </Box>

                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                    <Stack spacing={2}>
                        <Typography variant="h5" sx={{ fontWeight: 900 }}>
                            Editorial workflow
                        </Typography>
                        <Typography color="text.secondary">
                            AI-generated legal news is stored as draft. Admin users review the source PDF, extracted text,
                            AI summary and key points before publication.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                            <Button component={Link} href={route('admin.news.index')} variant="outlined">
                                Open news CMS
                            </Button>
                            <Button component={Link} href={route('admin.users.index')} variant="outlined">
                                Open user management
                            </Button>
                            <Button component={Link} href={route('admin.ai-drafts.index')} variant="outlined">
                                Open AI drafts
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
        </AppShell>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
    return (
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Stack spacing={1}>
                <Box sx={{ color: 'primary.main' }}>{icon}</Box>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                    {value}
                </Typography>
                <Typography color="text.secondary">{label}</Typography>
            </Stack>
        </Paper>
    );
}
