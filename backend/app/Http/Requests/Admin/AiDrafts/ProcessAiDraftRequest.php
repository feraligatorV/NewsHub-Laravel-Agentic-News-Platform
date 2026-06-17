<?php

namespace App\Http\Requests\Admin\AiDrafts;

use Illuminate\Foundation\Http\FormRequest;

class ProcessAiDraftRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'pdf_url' => ['required', 'string', 'max:2048', 'regex:/^https?:\/\/\S+$/iu'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'pdf_url.regex' => 'The pdf url field must be a valid HTTP or HTTPS URL.',
        ];
    }
}
