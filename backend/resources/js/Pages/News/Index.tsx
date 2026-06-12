import AppShell from '@/Components/Layout/AppShell';
import NewsCard from '@/Components/News/NewsCard';
import StateMessage from '@/Components/News/StateMessage';
import { fetchCategories, fetchNews, getErrorMessage } from '@/lib/api';
import type { Category, News } from '@/types/news';
import { Head } from '@inertiajs/react';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    Chip,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';

export default function Index() {
    const [news, setNews] = useState<News[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadNews = async (category = selectedCategory, query = search) => {
        setLoading(true);
        setError(null);

        try {
            const [newsResponse, categoriesResponse] = await Promise.all([
                fetchNews({ category: category || undefined, search: query || undefined }),
                categories.length ? Promise.resolve({ data: categories }) : fetchCategories(),
            ]);

            setNews(newsResponse.data);
            setCategories(categoriesResponse.data);
        } catch (requestError) {
            setError(getErrorMessage(requestError));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadNews('', '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        void loadNews(selectedCategory, search);
    };

    const applyCategory = (slug: string) => {
        const nextCategory = slug === selectedCategory ? '' : slug;
        setSelectedCategory(nextCategory);
        void loadNews(nextCategory, search);
    };

    return (
        <AppShell>
            <Head title="News" />

            <Stack spacing={4}>
                <Box>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 900, color: '#16202a' }}>
                        NewsHub
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>
                        Latest curated news with category browsing and related recommendations.
                    </Typography>
                </Box>

                <Box
                    component="form"
                    onSubmit={submitSearch}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 2,
                        alignItems: { xs: 'stretch', md: 'center' },
                    }}
                >
                    <TextField
                        fullWidth
                        label="Search news"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <Button type="submit" variant="contained" startIcon={<SearchIcon />} sx={{ minHeight: 56 }}>
                        Search
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {categories.map((category) => (
                        <Chip
                            key={category.slug}
                            label={category.name}
                            color={selectedCategory === category.slug ? 'primary' : 'default'}
                            onClick={() => applyCategory(category.slug)}
                            variant={selectedCategory === category.slug ? 'filled' : 'outlined'}
                        />
                    ))}
                </Box>

                {loading && <StateMessage loading title="Loading news..." />}
                {error && <StateMessage severity="error" title="News could not be loaded" message={error} />}
                {!loading && !error && news.length === 0 && (
                    <StateMessage title="No news found" message="Try another category or search term." />
                )}

                {!loading && !error && news.length > 0 && (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                md: 'repeat(2, minmax(0, 1fr))',
                                lg: 'repeat(3, minmax(0, 1fr))',
                            },
                            gap: 3,
                        }}
                    >
                        {news.map((item) => (
                            <Box key={item.id}>
                                <NewsCard news={item} />
                            </Box>
                        ))}
                    </Box>
                )}
            </Stack>
        </AppShell>
    );
}
