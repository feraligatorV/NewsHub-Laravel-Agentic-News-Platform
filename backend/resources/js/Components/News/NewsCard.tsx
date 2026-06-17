import type { News } from '@/types/news';
import { Link } from '@inertiajs/react';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Typography,
} from '@mui/material';

interface NewsCardProps {
    news: News;
    compact?: boolean;
    featured?: boolean;
}

function formatDate(value: string | null): string {
    if (!value) {
        return 'Unpublished';
    }

    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(value));
}

export default function NewsCard({ news, compact = false, featured = false }: NewsCardProps) {
    return (
        <Card
            variant="outlined"
            sx={{
                height: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: featured ? '0 18px 60px rgba(6, 37, 68, 0.14)' : 'none',
            }}
        >
            <CardActionArea
                component={Link}
                href={`/news/${news.slug}`}
                sx={{
                    height: '100%',
                    display: featured ? { xs: 'block', md: 'grid' } : 'block',
                    gridTemplateColumns: featured ? '1fr 1fr' : undefined,
                }}
            >
                {news.image_url && (
                    <CardMedia
                        component="img"
                        height={featured ? 360 : compact ? 140 : 190}
                        image={news.image_url}
                        alt={news.title}
                        sx={{ height: featured ? { xs: 240, md: '100%' } : undefined, objectFit: 'cover' }}
                    />
                )}
                <CardContent sx={{ p: featured ? { xs: 3, md: 4 } : 2 }}>
                    <Stack spacing={featured ? 2 : 1.25}>
                        <Box>
                            <Chip label={news.category.name} size="small" color="primary" variant="outlined" />
                        </Box>
                        <Typography
                            variant={featured ? 'h4' : compact ? 'subtitle1' : 'h6'}
                            component="h2"
                            sx={{ fontWeight: 900, lineHeight: 1.16 }}
                        >
                            {news.title}
                        </Typography>
                        <Typography color="text.secondary" variant={featured ? 'body1' : 'body2'}>
                            {news.summary}
                        </Typography>
                        <Typography color="text.secondary" variant="caption">
                            {formatDate(news.published_at)} · {news.source}
                        </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
