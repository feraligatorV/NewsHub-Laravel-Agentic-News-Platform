import { Alert, Box, CircularProgress, Typography } from '@mui/material';

interface StateMessageProps {
    title: string;
    message?: string;
    loading?: boolean;
    severity?: 'info' | 'error';
}

export default function StateMessage({
    title,
    message,
    loading = false,
    severity = 'info',
}: StateMessageProps) {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 6 }}>
                <CircularProgress size={24} />
                <Typography>{title}</Typography>
            </Box>
        );
    }

    return (
        <Alert severity={severity} variant="outlined" sx={{ my: 3 }}>
            <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
            {message && <Typography variant="body2">{message}</Typography>}
        </Alert>
    );
}
