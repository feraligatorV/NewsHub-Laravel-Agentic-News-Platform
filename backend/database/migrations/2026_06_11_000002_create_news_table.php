<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary');
            $table->longText('content');
            $table->longText('body');
            $table->string('image_url')->nullable();
            $table->string('source')->default('NewsHub');
            $table->string('source_url')->nullable();
            $table->timestamp('published_at')->nullable()->index();
            $table->timestamp('publication_date')->nullable()->index();
            $table->string('status')->default('draft')->index();
            $table->string('legal_document_type')->nullable()->index();
            $table->string('decree_number')->nullable();
            $table->string('institution')->nullable()->index();
            $table->string('affected_law')->nullable();
            $table->date('effective_date')->nullable();
            $table->boolean('ai_generated')->default(false)->index();
            $table->text('ai_summary')->nullable();
            $table->json('ai_key_points')->nullable();
            $table->string('original_pdf_url')->nullable();
            $table->longText('extracted_text')->nullable();
            $table->timestamps();

            $table->index('category_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
