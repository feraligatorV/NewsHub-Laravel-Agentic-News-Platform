<?php

return [
    'agent_url' => env('LEGAL_AI_AGENT_URL', 'http://legal-ai-agent:8000'),
    'timeout' => (int) env('LEGAL_AI_AGENT_TIMEOUT', 120),
    'shared_secret' => env('LEGAL_AI_AGENT_SHARED_SECRET'),
];
