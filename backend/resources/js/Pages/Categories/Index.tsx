import AdSlot from '@/Components/Advertising/AdSlot';
import AppShell from '@/Components/Layout/AppShell';
import NewsCard from '@/Components/News/NewsCard';
import StateMessage from '@/Components/News/StateMessage';
import { fetchCategories, fetchCategoryNews, getErrorMessage } from '@/lib/api';
import type { Category, News } from '@/types/news';
import { Head } from '@inertiajs/react';
import CategoryIcon from '@mui/icons-material/Category';
import {
    Box,
    Button,
    Chip,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function Index() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadCategories() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetchCategories();
                setCategories(response.data);

                if (response.data[0]) {
                    await selectCategory(response.data[0]);
                }
            } catch (requestError) {
                setError(getErrorMessage(requestError));
            } finally {
                setLoading(false);
            }
        }

        void loadCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectCategory = async (category: Category) => {
        setSelectedCategory(category);
        setNewsLoading(true);
        setError(null);

        try {
            const response = await fetchCategoryNews(category.slug);
            setNews(response.data);
        } catch (requestError) {
            setError(getErrorMessage(requestError));
        } finally {
            setNewsLoading(false);
        }
    };

    return (
        <AppShell>
            <Head title="Categories" />

            <Stack spacing={{ xs: 4, md: 5 }}>
                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2, bgcolor: '#062544', color: '#ffffff' }}>
                    <Stack spacing={2} sx={{ maxWidth: 760 }}>
                        <Chip
                            icon={<CategoryIcon />}
                            label="Topic center"
                            sx={{ alignSelf: 'flex-start', bgcolor: '#00a8cc', color: '#062544', fontWeight: 900 }}
                        />
                        <Typography variant="h2" component="h1" sx={{ fontWeight: 900 }}>
                            Categories
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.76)' }}>
                            Browse focused coverage by topic and jump quickly into the most relevant updates.
                        </Typography>
                    </Stack>
                </Paper>

                {loading && <StateMessage loading title="Loading categories..." />}
                {error && <StateMessage severity="error" title="Categories could not be loaded" message={error} />}
                {!loading && !error && categories.length === 0 && <StateMessage title="No categories available" />}

                {!loading && categories.length > 0 && (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', lg: '360px minmax(0, 1fr)' },
                            gap: 4,
                            alignItems: 'start',
                        }}
                    >
                        <Stack spacing={3} sx={{ position: { lg: 'sticky' }, top: { lg: 104 } }}>
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                <Stack spacing={1.5}>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                        Category filter
                                    </Typography>
                                    {categories.map((category) => (
                                        <Paper
                                            key={category.slug}
                                            variant="outlined"
                                            onClick={() => void selectCategory(category)}
                                            sx={{
                                                p: 2,
                                                borderRadius: 2,
                                                cursor: 'pointer',
                                                borderColor: selectedCategory?.slug === category.slug ? 'primary.main' : 'divider',
                                                bgcolor: selectedCategory?.slug === category.slug ? 'rgba(11, 79, 138, 0.08)' : '#ffffff',
                                            }}
                                        >
                                            <Stack spacing={1}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                                                    {category.name}
                                                </Typography>
                                                <Typography color="text.secondary" variant="body2">
                                                    {category.description}
                                                </Typography>
                                                <Button
                                                    variant={selectedCategory?.slug === category.slug ? 'contained' : 'outlined'}
                                                    size="small"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        void selectCategory(category);
                                                    }}
                                                >
                                                    View news
                                                </Button>
                                            </Stack>
                                        </Paper>
                                    ))}
                                </Stack>
                            </Paper>
                            <AdSlot size="rectangle" />
                        </Stack>

                        <Box>
                            {newsLoading && <StateMessage loading title="Loading category news..." />}
                            {!newsLoading && selectedCategory && (
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="h4" component="h2" sx={{ fontWeight: 900, color: '#062544' }}>
                                            {selectedCategory.name}
                                        </Typography>
                                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                                            {selectedCategory.description}
                                        </Typography>
                                    </Box>
                                    {news.length === 0 ? (
                                        <StateMessage title="No news in this category" />
                                    ) : (
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                                                gap: 3,
                                            }}
                                        >
                                            {news.map((item) => (
                                                <NewsCard key={item.id} news={item} compact />
                                            ))}
                                        </Box>
                                    )}
                                </Stack>
                            )}
                        </Box>
                    </Box>
                )}
            </Stack>
        </AppShell>
    );
}
