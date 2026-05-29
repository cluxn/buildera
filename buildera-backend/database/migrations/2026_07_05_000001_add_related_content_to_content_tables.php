<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->json('related_content')->nullable();
        });

        Schema::table('case_studies', function (Blueprint $table) {
            $table->json('related_content')->nullable();
        });

        Schema::table('guides', function (Blueprint $table) {
            $table->json('related_content')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn('related_content');
        });

        Schema::table('case_studies', function (Blueprint $table) {
            $table->dropColumn('related_content');
        });

        Schema::table('guides', function (Blueprint $table) {
            $table->dropColumn('related_content');
        });
    }
};
