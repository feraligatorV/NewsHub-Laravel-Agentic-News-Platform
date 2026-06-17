import CampaignIcon from '@mui/icons-material/Campaign';
import { Box, Stack, Typography } from '@mui/material';

interface AdSlotProps {
    label?: string;
    size?: 'horizontal' | 'rectangle' | 'sidebar';
}

const dimensions = {
    horizontal: {
        minHeight: 96,
        width: '100%',
    },
    rectangle: {
        minHeight: 220,
        width: '100%',
    },
    sidebar: {
        minHeight: 320,
        width: '100%',
    },
};

export default function AdSlot({ label = 'Espacio publicitario', size = 'horizontal' }: AdSlotProps) {
    return (
        <Box
            aria-label={label}
            sx={{
                ...dimensions[size],
                border: '1px dashed',
                borderColor: 'rgba(11, 79, 138, 0.28)',
                borderRadius: 2,
                bgcolor: 'rgba(255, 255, 255, 0.76)',
                display: 'grid',
                placeItems: 'center',
                px: 2,
            }}
        >
            <Stack spacing={0.75} sx={{ alignItems: 'center', textAlign: 'center', color: 'text.secondary' }}>
                <CampaignIcon color="primary" fontSize="small" />
                <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase' }}>
                    {label}
                </Typography>
            </Stack>
        </Box>
    );
}
