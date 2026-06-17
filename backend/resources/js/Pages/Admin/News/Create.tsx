import AppShell from '@/Components/Layout/AppShell';
import type { Category } from '@/types/news';
import { Head, Link, useForm } from '@inertiajs/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Paper, Stack, Typography } from '@mui/material';
import NewsForm, { AdminNewsFormData, AdminTag } from './Partials/NewsForm';

interface CreateProps {
    categories: Category[];
    tags: AdminTag[];
    statuses: string[];
    documentTypes: string[];
}

const initialData: AdminNewsFormData = {
    title: '',
    slug: '',
    summary: '',
    body: '',
    image_url: '',
    category_id: '',
    source_url: '',
    publication_date: '',
    status: 'draft',
    legal_document_type: '',
    decree_number: '',
    institution: '',
    affected_law: '',
    effective_date: '',
    ai_generated: false,
    ai_summary: '',
    ai_key_points: [],
    original_pdf_url: '',
    extracted_text: '',
    tag_ids: [],
};

export default function Create({ categories, tags, statuses, documentTypes }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm<AdminNewsFormData>(initialData);

    return (
        <AppShell>
            <Head title="Create news" />

            <Stack spacing={3}>
                <Button component={Link} href={route('admin.news.index')} startIcon={<ArrowBackIcon />} sx={{ alignSelf: 'flex-start' }}>
                    Back to CMS
                </Button>
                <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
                    <Stack spacing={3}>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 900, color: '#062544' }}>
                            Create legal news
                        </Typography>
                        <NewsForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            categories={categories}
                            tags={tags}
                            statuses={statuses}
                            documentTypes={documentTypes}
                            submitLabel="Create news"
                            onSubmit={() => post(route('admin.news.store'))}
                        />
                    </Stack>
                </Paper>
            </Stack>
        </AppShell>
    );
}
