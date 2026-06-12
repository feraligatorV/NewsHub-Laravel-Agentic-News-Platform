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
            $table->string('image_url')->nullable();
            $table->string('source')->default('NewsHub');
            $table->timestamp('published_at')->index();
            $table->timestamps();

            $table->index('category_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
