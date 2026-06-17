import AppShell from '@/Components/Layout/AppShell';
import type { Category } from '@/types/news';
import { Head, Link, router, useForm } from '@inertiajs/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { Button, Chip, Paper, Stack, Typography } from '@mui/material';
import NewsForm, { AdminNewsFormData, AdminTag } from './Partials/NewsForm';

interface AdminNews extends AdminNewsFormData {
    id: number;
    tag_ids: number[];
}

interface EditProps {
    news: AdminNews;
    categories: Category[];
    tags: AdminTag[];
    statuses: string[];
    documentTypes: string[];
}

export default function Edit({ news, categories, tags, statuses, documentTypes }: EditProps) {
    const { data, setData, patch, processing, errors } = useForm<AdminNewsFormData>({
        ...news,
        category_id: String(news.category_id),
        image_url: news.image_url ?? '',
        source_url: news.source_url ?? '',
        publication_date: news.publication_date ?? '',
        legal_document_type: news.legal_document_type ?? '',
        decree_number: news.decree_number ?? '',
        institution: news.institution ?? '',
        affected_law: news.affected_law ?? '',
        effective_date: news.effective_date ?? '',
        ai_summary: news.ai_summary ?? '',
        ai_key_points: news.ai_key_points ?? [],
        original_pdf_url: news.original_pdf_url ?? '',
        extracted_text: news.extracted_text ?? '',
    });

    return (
        <AppShell>
            <Head title={`Edit ${news.title}`} />

            <Stack spacing={3}>
                <Button component={Link} href={route('admin.news.index')} startIcon={<ArrowBackIcon />} sx={{ alignSelf: 'flex-start' }}>
                    Back to CMS
                </Button>
                <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                    <Stack spacing={3}>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between' }}>
                            <Stack spacing={1}>
                                <Typography variant="h3" component="h1" sx={{ fontWeight: 900, color: '#062544' }}>
                                    Edit legal news
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <Chip label={news.status} color={news.status === 'published' ? 'success' : 'default'} />
                                    {news.ai_generated && <Chip label="AI draft" color="secondary" />}
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
                                {news.status === 'published' ? (
                                    <Button variant="outlined" startIcon={<UnpublishedIcon />} onClick={() => router.post(route('admin.news.unpublish', news.slug))}>
                                        Unpublish
                                    </Button>
                                ) : (
                                    <Button variant="outlined" startIcon={<PublishIcon />} onClick={() => router.post(route('admin.news.publish', news.slug))}>
                                        Publish
                                    </Button>
                                )}
                                <Button color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={() => router.delete(route('admin.news.destroy', news.slug))}>
                                    Delete
                                </Button>
                            </Stack>
                        </Stack>
                        <NewsForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            categories={categories}
                            tags={tags}
                            statuses={statuses}
                            documentTypes={documentTypes}
                            submitLabel="Save changes"
                            onSubmit={() => patch(route('admin.news.update', news.slug))}
                        />
                    </Stack>
                </Paper>
            </Stack>
        </AppShell>
    );
}
