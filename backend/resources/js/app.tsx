import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'NewsHub';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0b4f8a',
            dark: '#073763',
            light: '#1e88e5',
        },
        secondary: {
            main: '#00a8cc',
        },
        success: {
            main: '#0f8f7a',
        },
        background: {
            default: '#f3f6fa',
            paper: '#ffffff',
        },
        text: {
            primary: '#102033',
            secondary: '#5b6778',
        },
    },
    typography: {
        fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        button: {
            textTransform: 'none',
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App {...props} />
            </ThemeProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
