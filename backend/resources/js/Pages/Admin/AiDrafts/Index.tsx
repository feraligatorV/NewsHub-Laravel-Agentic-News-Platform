import AppShell from '@/Components/Layout/AppShell';
import type { PageProps } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SaveIcon from '@mui/icons-material/Save';
import {
    Alert,
    Box,
    Button,
    Chip,
    Collapse,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

interface SuggestedNews {
    [key: string]: string | boolean | string[] | null | undefined;
    title: string;
    slug?: string;
    summary: string;
    body: string;
    tags?: string[];
    status: string;
    ai_generated: boolean;
    ai_summary?: string;
    ai_key_points?: string[];
    original_pdf_url?: string | null;
    extracted_text?: string | null;
    source_url?: string | null;
    publication_date?: string | null;
    legal_document_type?: string | null;
    decree_number?: string | null;
    institution?: string | null;
    affected_law?: string | null;
    effective_date?: string | null;
    suggested_category?: string | null;
}

interface DraftPreview {
    document_title?: string;
    institution?: string | null;
    legal_document_type?: string | null;
    decree_number?: string | null;
    affected_law?: string | null;
    effective_date?: string | null;
    executive_summary?: string;
    key_points?: string[];
    full_explanation?: string;
    disclaimer?: string;
    suggested_news: SuggestedNews;
}

interface SavedDraft {
    title: string;
    edit_url: string;
}

export default function Index() {
    const page = usePage<PageProps>();
    const flash = page.props.flash ?? {};
    const draftPreview = flash.aiDraftPreview as DraftPreview | undefined;
    const savedDraft = flash.savedDraft as SavedDraft | undefined;
    const status = flash.status;
    const [showExtractedText, setShowExtractedText] = useState(false);
    const [saving, setSaving] = useState(false);

    const processForm = useForm({
        pdf_url: draftPreview?.suggested_news.original_pdf_url ?? '',
    });

    const suggestedNews = draftPreview?.suggested_news;
    const keyPoints = suggestedNews?.ai_key_points ?? draftPreview?.key_points ?? [];

    return (
        <AppShell>
            <Head title="Borradores IA" />

            <Stack spacing={3}>
                <Button component={Link} href={route('admin.dashboard')} startIcon={<ArrowBackIcon />} sx={{ alignSelf: 'flex-start' }}>
                    Back to dashboard
                </Button>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 900, color: '#062544' }}>
                            Borradores IA
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                            Procesa publicaciones legales y guarda borradores para revision editorial.
                        </Typography>
                    </Box>
                    <Chip icon={<AutoAwesomeIcon />} label="Human review required" color="secondary" sx={{ alignSelf: { xs: 'flex-start', md: 'center' } }} />
                </Stack>

                {status && <Alert severity="success">{status}</Alert>}
                {savedDraft && (
                    <Alert severity="success" action={<Button component={Link} href={savedDraft.edit_url}>Edit draft</Button>}>
                        Borrador guardado: {savedDraft.title}
                    </Alert>
                )}

                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                    <Stack
                        component="form"
                        spacing={2}
                        onSubmit={(event) => {
                            event.preventDefault();
                            processForm.post(route('admin.ai-drafts.process-url'));
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 900 }}>
                            Procesar PDF legal
                        </Typography>
                        <TextField
                            label="Legal PDF URL"
                            value={processForm.data.pdf_url}
                            onChange={(event) => processForm.setData('pdf_url', event.target.value)}
                            error={Boolean(processForm.errors.pdf_url)}
                            helperText={processForm.errors.pdf_url ?? 'Acepta URLs directas a PDF o paginas que enlacen un PDF.'}
                            fullWidth
                        />
                        <Button type="submit" variant="contained" startIcon={<AutoAwesomeIcon />} disabled={processForm.processing} sx={{ alignSelf: 'flex-start' }}>
                            {processForm.processing ? 'Procesando...' : 'Procesar con IA'}
                        </Button>
                    </Stack>
                </Paper>

                {suggestedNews && (
                    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                        <Stack spacing={2.5}>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 900 }}>
                                        {suggestedNews.title}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                                        {suggestedNews.summary}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="success"
                                    startIcon={<SaveIcon />}
                                    disabled={saving}
                                    onClick={() => {
                                        setSaving(true);
                                        router.post(
                                            route('admin.ai-drafts.save'),
                                            { suggested_news: suggestedNews },
                                            { onFinish: () => setSaving(false) },
                                        );
                                    }}
                                    sx={{ alignSelf: { xs: 'flex-start', md: 'center' } }}
                                >
                                    Guardar como borrador
                                </Button>
                            </Stack>

                            <Divider />

                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
                                <Meta label="Tipo" value={suggestedNews.legal_document_type} />
                                <Meta label="Decreto" value={suggestedNews.decree_number} />
                                <Meta label="Institucion" value={suggestedNews.institution} />
                                <Meta label="Ley afectada" value={suggestedNews.affected_law} />
                                <Meta label="Vigencia" value={suggestedNews.effective_date} />
                                <Meta label="PDF origen" value={suggestedNews.original_pdf_url} />
                            </Box>

                            <Stack spacing={1}>
                                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                    Key points
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                    {keyPoints.map((point) => (
                                        <Chip key={point} label={point} variant="outlined" />
                                    ))}
                                </Stack>
                            </Stack>

                            <Stack spacing={1}>
                                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                    Explanation
                                </Typography>
                                <Typography color="text.secondary">{draftPreview.full_explanation ?? suggestedNews.body}</Typography>
                            </Stack>

                            {draftPreview.disclaimer && <Alert severity="warning">{draftPreview.disclaimer}</Alert>}

                            <Stack spacing={1}>
                                <Button variant="outlined" onClick={() => setShowExtractedText((value) => !value)} sx={{ alignSelf: 'flex-start' }}>
                                    {showExtractedText ? 'Ocultar texto extraido' : 'Ver texto extraido'}
                                </Button>
                                <Collapse in={showExtractedText}>
                                    <Paper variant="outlined" sx={{ p: 2, maxHeight: 260, overflow: 'auto', bgcolor: '#f8fafc' }}>
                                        <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', m: 0, fontSize: 13 }}>
                                            {suggestedNews.extracted_text ?? 'Sin texto extraido.'}
                                        </Typography>
                                    </Paper>
                                </Collapse>
                            </Stack>
                        </Stack>
                    </Paper>
                )}
            </Stack>
        </AppShell>
    );
}

function Meta({ label, value }: { label: string; value?: string | null }) {
    return (
        <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase' }}>
                {label}
            </Typography>
            <Typography sx={{ fontWeight: 700, overflowWrap: 'anywhere' }}>{value || 'Pendiente'}</Typography>
        </Stack>
    );
}
