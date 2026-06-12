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

export default function NewsCard({ news, compact = false }: NewsCardProps) {
    return (
        <Card variant="outlined" sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
            <CardActionArea component={Link} href={`/news/${news.slug}`} sx={{ height: '100%' }}>
                {news.image_url && (
                    <CardMedia
                        component="img"
                        height={compact ? 140 : 190}
                        image={news.image_url}
                        alt={news.title}
                        sx={{ objectFit: 'cover' }}
                    />
                )}
                <CardContent>
                    <Stack spacing={1.25}>
                        <Box>
                            <Chip label={news.category.name} size="small" color="primary" variant="outlined" />
                        </Box>
                        <Typography variant={compact ? 'subtitle1' : 'h6'} component="h2" sx={{ fontWeight: 800 }}>
                            {news.title}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
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
