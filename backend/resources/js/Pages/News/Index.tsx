import AdSlot from '@/Components/Advertising/AdSlot';
import AppShell from '@/Components/Layout/AppShell';
import NewsCard from '@/Components/News/NewsCard';
import StateMessage from '@/Components/News/StateMessage';
import { fetchCategories, fetchNews, getErrorMessage } from '@/lib/api';
import type { Category, News } from '@/types/news';
import { Head, Link } from '@inertiajs/react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    Chip,
    Paper,
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

    const featuredNews = news[0];
    const latestNews = featuredNews ? news.slice(1) : news;

    return (
        <AppShell>
            <Head title="News" />

            <Stack spacing={{ xs: 4, md: 5 }}>
                <Paper elevation={0} sx={{ overflow: 'hidden', borderRadius: 2, bgcolor: '#062544', color: '#ffffff' }}>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: '1.15fr 0.85fr' },
                            minHeight: { md: 380 },
                        }}
                    >
                        <Stack spacing={3} sx={{ p: { xs: 3, md: 5 }, justifyContent: 'center' }}>
                            <Chip
                                label="Regional intelligence"
                                sx={{ alignSelf: 'flex-start', bgcolor: '#00a8cc', color: '#062544', fontWeight: 900 }}
                            />
                            <Box>
                                <Typography variant="h2" component="h1" sx={{ fontWeight: 900, maxWidth: 760 }}>
                                    NewsHub
                                </Typography>
                                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.78)', mt: 1.5, maxWidth: 680 }}>
                                    Corporate news coverage for technology, business and science, organized for fast regional decision making.
                                </Typography>
                            </Box>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                                <Button
                                    component={Link}
                                    href="#latest-news"
                                    variant="contained"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{ bgcolor: '#00a8cc', color: '#062544', '&:hover': { bgcolor: '#28c7e8' } }}
                                >
                                    Latest news
                                </Button>
                                <Button component={Link} href="/categories" variant="outlined" sx={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.42)' }}>
                                    Explore categories
                                </Button>
                            </Stack>
                        </Stack>
                        <Box sx={{ bgcolor: '#0b4f8a', p: { xs: 3, md: 4 }, display: 'grid', alignContent: 'center', gap: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <StatBlock value="8+" label="Published stories" />
                                <StatBlock value="3" label="Core categories" />
                            </Stack>
                            <AdSlot size="rectangle" />
                        </Box>
                    </Box>
                </Paper>

                <Paper
                    component="form"
                    onSubmit={submitSearch}
                    variant="outlined"
                    sx={{
                        p: { xs: 2, md: 2.5 },
                        borderRadius: 2,
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
                </Paper>

                <Stack spacing={2}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 900 }}>
                        Categories
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Chip
                            label="All"
                            color={!selectedCategory ? 'primary' : 'default'}
                            onClick={() => applyCategory('')}
                            variant={!selectedCategory ? 'filled' : 'outlined'}
                        />
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
                </Stack>

                {loading && <StateMessage loading title="Loading news..." />}
                {error && <StateMessage severity="error" title="News could not be loaded" message={error} />}
                {!loading && !error && news.length === 0 && (
                    <StateMessage title="No news found" message="Try another category or search term." />
                )}

                {!loading && !error && news.length > 0 && (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 320px' },
                            gap: 4,
                            alignItems: 'start',
                        }}
                    >
                        <Stack spacing={4}>
                            {featuredNews && (
                                <Box>
                                    <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 900 }}>
                                        Featured news
                                    </Typography>
                                    <NewsCard news={featuredNews} featured />
                                </Box>
                            )}

                            <Box id="latest-news">
                                <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 900 }}>
                                    Latest news
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                                        gap: 3,
                                    }}
                                >
                                    {latestNews.map((item) => (
                                        <NewsCard key={item.id} news={item} />
                                    ))}
                                </Box>
                            </Box>
                        </Stack>

                        <Stack spacing={3} sx={{ position: { lg: 'sticky' }, top: { lg: 104 } }}>
                            <AdSlot size="sidebar" />
                            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: '#ffffff' }}>
                                <Stack spacing={2}>
                                    <EmailOutlinedIcon color="primary" />
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                        Weekly briefing
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Receive a concise digest of regional business and technology updates.
                                    </Typography>
                                    <Button variant="contained">Subscribe</Button>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Box>
                )}
            </Stack>
        </AppShell>
    );
}

function StatBlock({ value, label }: { value: string; label: string }) {
    return (
        <Paper sx={{ p: 2, flex: 1, bgcolor: 'rgba(255,255,255,0.12)', color: '#ffffff', borderRadius: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {value}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.76)' }}>
                {label}
            </Typography>
        </Paper>
    );
}
