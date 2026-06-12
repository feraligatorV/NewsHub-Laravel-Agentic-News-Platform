import AppShell from '@/Components/Layout/AppShell';
import NewsCard from '@/Components/News/NewsCard';
import StateMessage from '@/Components/News/StateMessage';
import { fetchCategories, fetchCategoryNews, getErrorMessage } from '@/lib/api';
import type { Category, News } from '@/types/news';
import { Head } from '@inertiajs/react';
import {
    Box,
    Button,
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

            <Stack spacing={4}>
                <Box>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 900, color: '#16202a' }}>
                        Categories
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                        Browse news by topic.
                    </Typography>
                </Box>

                {loading && <StateMessage loading title="Loading categories..." />}
                {error && <StateMessage severity="error" title="Categories could not be loaded" message={error} />}

                {!loading && !error && categories.length === 0 && <StateMessage title="No categories available" />}

                {!loading && categories.length > 0 && (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: '360px minmax(0, 1fr)' },
                            gap: 3,
                        }}
                    >
                        <Box>
                            <Stack spacing={1.5}>
                                {categories.map((category) => (
                                    <Paper
                                        key={category.slug}
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            borderColor:
                                                selectedCategory?.slug === category.slug ? 'primary.main' : 'divider',
                                        }}
                                    >
                                        <Stack spacing={1}>
                                            <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                                {category.name}
                                            </Typography>
                                            <Typography color="text.secondary" variant="body2">
                                                {category.description}
                                            </Typography>
                                            <Button
                                                variant={selectedCategory?.slug === category.slug ? 'contained' : 'outlined'}
                                                onClick={() => void selectCategory(category)}
                                            >
                                                View news
                                            </Button>
                                        </Stack>
                                    </Paper>
                                ))}
                            </Stack>
                        </Box>

                        <Box>
                            {newsLoading && <StateMessage loading title="Loading category news..." />}
                            {!newsLoading && selectedCategory && (
                                <Stack spacing={2}>
                                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                                        {selectedCategory.name}
                                    </Typography>
                                    {news.length === 0 ? (
                                        <StateMessage title="No news in this category" />
                                    ) : (
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: {
                                                    xs: '1fr',
                                                    sm: 'repeat(2, minmax(0, 1fr))',
                                                },
                                                gap: 3,
                                            }}
                                        >
                                            {news.map((item) => (
                                                <Box key={item.id}>
                                                    <NewsCard news={item} compact />
                                                </Box>
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
