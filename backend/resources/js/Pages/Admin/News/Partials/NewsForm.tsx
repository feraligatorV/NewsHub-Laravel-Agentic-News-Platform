import type { Category } from '@/types/news';
import SaveIcon from '@mui/icons-material/Save';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { FormEvent, useMemo, useState } from 'react';

export interface AdminTag {
    id: number;
    name: string;
    slug: string;
}

export interface AdminNewsFormData {
    title: string;
    slug: string;
    summary: string;
    body: string;
    image_url: string;
    category_id: string;
    source_url: string;
    publication_date: string;
    status: string;
    legal_document_type: string;
    decree_number: string;
    institution: string;
    affected_law: string;
    effective_date: string;
    ai_generated: boolean;
    ai_summary: string;
    ai_key_points: string[];
    original_pdf_url: string;
    extracted_text: string;
    tag_ids: number[];
}

interface NewsFormProps {
    data: AdminNewsFormData;
    setData: (key: keyof AdminNewsFormData, value: AdminNewsFormData[keyof AdminNewsFormData]) => void;
    errors: Partial<Record<keyof AdminNewsFormData, string>>;
    processing: boolean;
    categories: Category[];
    tags: AdminTag[];
    statuses: string[];
    documentTypes: string[];
    submitLabel: string;
    onSubmit: () => void;
}

export default function NewsForm({
    data,
    setData,
    errors,
    processing,
    categories,
    tags,
    statuses,
    documentTypes,
    submitLabel,
    onSubmit,
}: NewsFormProps) {
    const [keyPointsText, setKeyPointsText] = useState(data.ai_key_points.join('\n'));

    const selectedTagIds = useMemo(() => data.tag_ids.map(Number), [data.tag_ids]);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setData(
            'ai_key_points',
            keyPointsText
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean),
        );
        onSubmit();
    };

    return (
        <Stack component="form" spacing={4} onSubmit={submit}>
            {Object.keys(errors).length > 0 && (
                <Alert severity="error" variant="outlined">
                    Review the highlighted fields before saving.
                </Alert>
            )}

            <Section title="Main content">
                <TextField label="Title" value={data.title} onChange={(event) => setData('title', event.target.value)} error={Boolean(errors.title)} helperText={errors.title} required fullWidth />
                <TextField label="Slug" value={data.slug} onChange={(event) => setData('slug', event.target.value)} error={Boolean(errors.slug)} helperText={errors.slug} required fullWidth />
                <TextField label="Summary" value={data.summary} onChange={(event) => setData('summary', event.target.value)} error={Boolean(errors.summary)} helperText={errors.summary} required multiline minRows={3} fullWidth />
                <TextField label="Body" value={data.body} onChange={(event) => setData('body', event.target.value)} error={Boolean(errors.body)} helperText={errors.body} required multiline minRows={8} fullWidth />
                <TextField label="Image URL" value={data.image_url} onChange={(event) => setData('image_url', event.target.value)} error={Boolean(errors.image_url)} helperText={errors.image_url} fullWidth />
            </Section>

            <Section title="Legal metadata">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
                    <FormControl fullWidth required error={Boolean(errors.category_id)}>
                        <InputLabel>Category</InputLabel>
                        <Select value={data.category_id} label="Category" onChange={(event) => setData('category_id', event.target.value)}>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={String(category.id)}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth required error={Boolean(errors.status)}>
                        <InputLabel>Status</InputLabel>
                        <Select value={data.status} label="Status" onChange={(event) => setData('status', event.target.value)}>
                            {statuses.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Document type</InputLabel>
                        <Select value={data.legal_document_type} label="Document type" onChange={(event) => setData('legal_document_type', event.target.value)}>
                            <MenuItem value="">None</MenuItem>
                            {documentTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField label="Decree number" value={data.decree_number} onChange={(event) => setData('decree_number', event.target.value)} fullWidth />
                    <TextField label="Institution" value={data.institution} onChange={(event) => setData('institution', event.target.value)} fullWidth />
                    <TextField label="Affected law" value={data.affected_law} onChange={(event) => setData('affected_law', event.target.value)} fullWidth />
                    <TextField label="Publication date" type="date" value={data.publication_date} onChange={(event) => setData('publication_date', event.target.value)} slotProps={{ inputLabel: { shrink: true } }} fullWidth />
                    <TextField label="Effective date" type="date" value={data.effective_date} onChange={(event) => setData('effective_date', event.target.value)} slotProps={{ inputLabel: { shrink: true } }} fullWidth />
                    <TextField label="Source URL" value={data.source_url} onChange={(event) => setData('source_url', event.target.value)} error={Boolean(errors.source_url)} helperText={errors.source_url} fullWidth />
                </Box>
            </Section>

            <Section title="Tags">
                <FormControl fullWidth>
                    <InputLabel>Tags</InputLabel>
                    <Select
                        multiple
                        value={selectedTagIds}
                        input={<OutlinedInput label="Tags" />}
                        onChange={(event) => setData('tag_ids', event.target.value as number[])}
                        renderValue={(selected) => tags.filter((tag) => selected.includes(tag.id)).map((tag) => tag.name).join(', ')}
                    >
                        {tags.map((tag) => (
                            <MenuItem key={tag.id} value={tag.id}>
                                <Checkbox checked={selectedTagIds.includes(tag.id)} />
                                {tag.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Section>

            <Section title="AI draft fields">
                <FormControlLabel
                    control={<Checkbox checked={data.ai_generated} onChange={(event) => setData('ai_generated', event.target.checked)} />}
                    label="AI-generated draft"
                />
                <TextField label="AI summary" value={data.ai_summary} onChange={(event) => setData('ai_summary', event.target.value)} multiline minRows={3} fullWidth />
                <TextField label="AI key points" value={keyPointsText} onChange={(event) => setKeyPointsText(event.target.value)} multiline minRows={4} helperText="One key point per line." fullWidth />
                <TextField label="Original PDF URL" value={data.original_pdf_url} onChange={(event) => setData('original_pdf_url', event.target.value)} error={Boolean(errors.original_pdf_url)} helperText={errors.original_pdf_url} fullWidth />
                <TextField label="Extracted text" value={data.extracted_text} onChange={(event) => setData('extracted_text', event.target.value)} multiline minRows={6} fullWidth />
            </Section>

            <Button type="submit" variant="contained" disabled={processing} startIcon={<SaveIcon />} sx={{ alignSelf: 'flex-start' }}>
                {processing ? 'Saving...' : submitLabel}
            </Button>
        </Stack>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
                {title}
            </Typography>
            {children}
        </Stack>
    );
}
