<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            if (! Schema::hasColumn('users', 'is_admin')) {
                $table->boolean('is_admin')->default(false)->index()->after('password');
            }
        });

        Schema::table('news', function (Blueprint $table): void {
            if (! Schema::hasColumn('news', 'body')) {
                $table->longText('body')->nullable()->after('content');
            }

            if (! Schema::hasColumn('news', 'source_url')) {
                $table->string('source_url')->nullable()->after('source');
            }

            if (! Schema::hasColumn('news', 'publication_date')) {
                $table->timestamp('publication_date')->nullable()->index()->after('published_at');
            }

            if (! Schema::hasColumn('news', 'status')) {
                $table->string('status')->default('published')->index()->after('publication_date');
            }

            if (! Schema::hasColumn('news', 'legal_document_type')) {
                $table->string('legal_document_type')->nullable()->index()->after('status');
            }

            if (! Schema::hasColumn('news', 'decree_number')) {
                $table->string('decree_number')->nullable()->after('legal_document_type');
            }

            if (! Schema::hasColumn('news', 'institution')) {
                $table->string('institution')->nullable()->index()->after('decree_number');
            }

            if (! Schema::hasColumn('news', 'affected_law')) {
                $table->string('affected_law')->nullable()->after('institution');
            }

            if (! Schema::hasColumn('news', 'effective_date')) {
                $table->date('effective_date')->nullable()->after('affected_law');
            }

            if (! Schema::hasColumn('news', 'ai_generated')) {
                $table->boolean('ai_generated')->default(false)->index()->after('effective_date');
            }

            if (! Schema::hasColumn('news', 'ai_summary')) {
                $table->text('ai_summary')->nullable()->after('ai_generated');
            }

            if (! Schema::hasColumn('news', 'ai_key_points')) {
                $table->json('ai_key_points')->nullable()->after('ai_summary');
            }

            if (! Schema::hasColumn('news', 'original_pdf_url')) {
                $table->string('original_pdf_url')->nullable()->after('ai_key_points');
            }

            if (! Schema::hasColumn('news', 'extracted_text')) {
                $table->longText('extracted_text')->nullable()->after('original_pdf_url');
            }
        });

        if (Schema::hasColumn('news', 'body')) {
            DB::table('news')
                ->whereNull('body')
                ->update(['body' => DB::raw('content')]);
        }
    }

    public function down(): void
    {
        Schema::table('news', function (Blueprint $table): void {
            foreach ([
                'extracted_text',
                'original_pdf_url',
                'ai_key_points',
                'ai_summary',
                'ai_generated',
                'effective_date',
                'affected_law',
                'institution',
                'decree_number',
                'legal_document_type',
                'status',
                'publication_date',
                'source_url',
                'body',
            ] as $column) {
                if (Schema::hasColumn('news', $column)) {
                    $table->dropColumn($column);
                }
            }
        });

        Schema::table('users', function (Blueprint $table): void {
            if (Schema::hasColumn('users', 'is_admin')) {
                $table->dropColumn('is_admin');
            }
        });
    }
};
