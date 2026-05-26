<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seo_metas', function (Blueprint $table) {
            $table->id();
            $table->string('page_type', 100);
            $table->string('page_slug', 255)->nullable();
            $table->string('title', 255)->nullable();
            $table->text('description')->nullable();
            $table->string('og_image', 500)->nullable();
            $table->string('canonical_url', 500)->nullable();
            $table->string('robots', 100)->default('index,follow');
            $table->json('schema_json')->nullable();
            $table->timestamps();
            $table->unique(['page_type', 'page_slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seo_metas');
    }
};
