import AppShell from '@/Components/Layout/AppShell';
import { Head, Link, router } from '@inertiajs/react';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import {
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

interface AdminNewsRow {
    id: number;
    title: string;
    slug: string;
    status: string;
    institution: string | null;
    publication_date: string | null;
    ai_generated: boolean;
    category: {
        id: number;
        name: string;
        slug: string;
    } | null;
    tags: Array<{ id: number; name: string; slug: string }>;
}

interface IndexProps {
    news: {
        data: AdminNewsRow[];
    };
}

export default function Index({ news }: IndexProps) {
    return (
        <AppShell>
            <Head title="Admin news CMS" />

            <Stack spacing={3}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 900, color: '#062544' }}>
                            News CMS
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                            Manage legal news, tags, publication status and AI-generated drafts.
                        </Typography>
                    </Box>
                    <Button component={Link} href={route('admin.news.create')} variant="contained" startIcon={<AddIcon />}>
                        Create news
                    </Button>
                </Stack>

                <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Institution</TableCell>
                                <TableCell>Publication date</TableCell>
                                <TableCell>Tags</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {news.data.map((item) => (
                                <TableRow key={item.id} hover>
                                    <TableCell>
                                        <Stack spacing={0.75}>
                                            <Typography sx={{ fontWeight: 800 }}>{item.title}</Typography>
                                            {item.ai_generated && (
                                                <Chip icon={<AutoAwesomeIcon />} label="AI draft" color="secondary" size="small" sx={{ alignSelf: 'flex-start' }} />
                                            )}
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={item.status} color={item.status === 'published' ? 'success' : item.status === 'archived' ? 'default' : 'warning'} size="small" />
                                    </TableCell>
                                    <TableCell>{item.category?.name ?? 'No category'}</TableCell>
                                    <TableCell>{item.institution ?? 'Pending'}</TableCell>
                                    <TableCell>{item.publication_date ?? 'Pending'}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                                            {item.tags.map((tag) => (
                                                <Chip key={tag.id} label={tag.name} size="small" variant="outlined" />
                                            ))}
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton component={Link} href={route('admin.news.edit', item.slug)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {item.status === 'published' ? (
                                            <Tooltip title="Unpublish">
                                                <IconButton onClick={() => router.post(route('admin.news.unpublish', item.slug))}>
                                                    <UnpublishedIcon />
                                                </IconButton>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="Publish">
                                                <IconButton onClick={() => router.post(route('admin.news.publish', item.slug))}>
                                                    <PublishIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <Tooltip title="Delete">
                                            <IconButton color="error" onClick={() => router.delete(route('admin.news.destroy', item.slug))}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Stack>
        </AppShell>
    );
}
