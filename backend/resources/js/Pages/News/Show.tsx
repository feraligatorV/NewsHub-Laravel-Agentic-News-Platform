import AppShell from '@/Components/Layout/AppShell';
import NewsCard from '@/Components/News/NewsCard';
import StateMessage from '@/Components/News/StateMessage';
import { fetchNewsDetail, fetchRecommendedNews, getErrorMessage } from '@/lib/api';
import type { News } from '@/types/news';
import { Head } from '@inertiajs/react';
import {
    Box,
    Chip,
    Divider,
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
                    <Stack spacing={2}>
                        <Box>
                            <Chip label={news.category.name} color="primary" variant="outlined" />
                        </Box>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 900, color: '#16202a' }}>
                            {news.title}
                        </Typography>
                        <Typography color="text.secondary">
                            {formatDate(news.published_at)} · {news.source}
                        </Typography>
                    </Stack>

                    {news.image_url && (
                        <Box
                            component="img"
                            src={news.image_url}
                            alt={news.title}
                            sx={{
                                width: '100%',
                                maxHeight: 460,
                                objectFit: 'cover',
                                borderRadius: 2,
                            }}
                        />
                    )}

                    <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {news.summary}
                    </Typography>

                    <Divider />

                    <Typography sx={{ whiteSpace: 'pre-line', lineHeight: 1.85, fontSize: '1.05rem' }}>
                        {news.content}
                    </Typography>

                    <Divider />

                    <Box>
                        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 800 }}>
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
                                    <Box key={item.id}>
                                        <NewsCard news={item} compact />
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Stack>
            )}
        </AppShell>
    );
}
