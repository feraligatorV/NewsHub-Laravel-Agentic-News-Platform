import AdSlot from '@/Components/Advertising/AdSlot';
import AppShell from '@/Components/Layout/AppShell';
import NewsCard from '@/Components/News/NewsCard';
import StateMessage from '@/Components/News/StateMessage';
import { fetchNewsDetail, fetchRecommendedNews, getErrorMessage } from '@/lib/api';
import type { News } from '@/types/news';
import { Head, Link } from '@inertiajs/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Box,
    Button,
    Chip,
    Divider,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface ShowProps {
    slug: string;
}

function formatDate(value: string | null): string {
    if (!value) {
        return 'Unpublished';
    }

    return new Intl.DateTimeFormat('en', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(value));
}

export default function Show({ slug }: ShowProps) {
    const [news, setNews] = useState<News | null>(null);
    const [recommended, setRecommended] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadDetail() {
            setLoading(true);
            setError(null);

            try {
                const [detailResponse, recommendedResponse] = await Promise.all([
                    fetchNewsDetail(slug),
                    fetchRecommendedNews(slug),
                ]);

                setNews(detailResponse.data);
                setRecommended(recommendedResponse.data);
            } catch (requestError) {
                setError(getErrorMessage(requestError));
            } finally {
                setLoading(false);
            }
        }

        void loadDetail();
    }, [slug]);

    return (
        <AppShell>
            <Head title={news?.title ?? 'News detail'} />

            {loading && <StateMessage loading title="Loading news detail..." />}
            {error && <StateMessage severity="error" title="News detail could not be loaded" message={error} />}

            {!loading && !error && news && (
                <Stack spacing={4}>
                    <Button component={Link} href="/" startIcon={<ArrowBackIcon />} sx={{ alignSelf: 'flex-start' }}>
                        Back to news
                    </Button>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 320px' },
                            gap: 4,
                            alignItems: 'start',
                        }}
                    >
                        <Stack spacing={3}>
                            <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
                                <Stack spacing={2.5}>
                                    <Box>
                                        <Chip label={news.category.name} color="primary" />
                                    </Box>
                                    <Typography variant="h2" component="h1" sx={{ fontWeight: 900, color: '#062544', lineHeight: 1.05 }}>
                                        {news.title}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {formatDate(news.published_at)} | {news.source}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                        {news.summary}
                                    </Typography>
                                </Stack>
                            </Paper>

                            {news.image_url && (
                                <Box
                                    component="img"
                                    src={news.image_url}
                                    alt={news.title}
                                    sx={{
                                        width: '100%',
                                        maxHeight: 520,
                                        objectFit: 'cover',
                                        borderRadius: 2,
                                    }}
                                />
                            )}

                            <AdSlot size="horizontal" />

                            <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
                                <Typography sx={{ whiteSpace: 'pre-line', lineHeight: 1.9, fontSize: '1.08rem', color: '#223042' }}>
                                    {news.content}
                                </Typography>
                            </Paper>
                        </Stack>

                        <Stack spacing={3} sx={{ position: { lg: 'sticky' }, top: { lg: 104 } }}>
                            <AdSlot size="sidebar" />
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>
                                        Article metadata
                                    </Typography>
                                    <Divider />
                                    <Typography variant="body2">
                                        <strong>Category:</strong> {news.category.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Source:</strong> {news.source}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Published:</strong> {formatDate(news.published_at)}
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 900 }}>
                            Recommended news
                        </Typography>
                        {recommended.length === 0 ? (
                            <StateMessage title="No recommendations available" />
                        ) : (
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        md: 'repeat(3, minmax(0, 1fr))',
                                    },
                                    gap: 3,
                                }}
                            >
                                {recommended.map((item) => (
                                    <NewsCard key={item.id} news={item} compact />
                                ))}
                            </Box>
                        )}
                    </Box>
                </Stack>
            )}
        </AppShell>
    );
}
