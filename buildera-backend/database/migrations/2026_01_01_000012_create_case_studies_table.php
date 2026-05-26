<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('case_studies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique()->index();
            $table->string('client_name');
            $table->string('industry', 100)->index();
            $table->text('challenge');
            $table->text('solution');
            $table->text('results');
            $table->string('featured_image')->nullable();
            $table->string('featured_image_alt')->nullable();
            $table->json('service_tags')->nullable();
            $table->json('industry_tags')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(false)->index();
            $table->timestamp('published_at')->nullable()->index();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->string('seo_og_image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('case_studies');
    }
};
