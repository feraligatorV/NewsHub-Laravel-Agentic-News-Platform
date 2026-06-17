<?php

namespace App\Services\LegalAi;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class LegalAiClient
{
    /**
     * @return array<string, mixed>
     */
    public function processUrl(string $pdfUrl): array
    {
        $baseUrl = rtrim((string) config('legal_ai.agent_url'), '/');
        $headers = [];
        $sharedSecret = config('legal_ai.shared_secret');

        if (filled($sharedSecret)) {
            $headers['X-NewsHub-AI-Secret'] = (string) $sharedSecret;
        }

        try {
            $response = Http::timeout((int) config('legal_ai.timeout'))
                ->acceptJson()
                ->withHeaders($headers)
                ->post("{$baseUrl}/api/legal/process-url", [
                    'pdf_url' => $pdfUrl,
                ])
                ->throw();
        } catch (ConnectionException $exception) {
            throw new RuntimeException('Legal AI service is unavailable.', previous: $exception);
        } catch (RequestException $exception) {
            $message = $exception->response?->json('detail') ?? 'Legal AI service returned an error.';

            throw new RuntimeException((string) $message, previous: $exception);
        }

        $payload = $response->json();

        if (! is_array($payload) || ! isset($payload['suggested_news']) || ! is_array($payload['suggested_news'])) {
            throw new RuntimeException('Legal AI service returned an invalid draft payload.');
        }

        return $payload;
    }
}
