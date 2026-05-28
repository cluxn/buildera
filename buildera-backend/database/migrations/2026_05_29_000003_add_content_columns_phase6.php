<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // case_studies: add key_metrics + testimonial fields
        Schema::table('case_studies', function (Blueprint $table) {
            $table->json('key_metrics')->nullable()->after('results');
            $table->text('testimonial_quote')->nullable()->after('key_metrics');
            $table->string('testimonial_author', 150)->nullable()->after('testimonial_quote');
        });

        // guides: add resource_type, description, external_link, cover_image_alt
        Schema::table('guides', function (Blueprint $table) {
            $table->string('resource_type', 50)->nullable()->after('category');
            $table->text('description')->nullable()->after('excerpt');
            $table->string('external_link')->nullable()->after('body');
            $table->string('cover_image_alt')->nullable()->after('featured_image_alt');
        });

        // testimonials: add service_category, industry
        Schema::table('testimonials', function (Blueprint $table) {
            $table->string('service_category', 100)->nullable()->after('rating');
            $table->string('industry', 100)->nullable()->after('service_category');
        });
    }

    public function down(): void
    {
        Schema::table('case_studies', function (Blueprint $table) {
            $table->dropColumn(['key_metrics', 'testimonial_quote', 'testimonial_author']);
        });

        Schema::table('guides', function (Blueprint $table) {
            $table->dropColumn(['resource_type', 'description', 'external_link', 'cover_image_alt']);
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropColumn(['service_category', 'industry']);
        });
    }
};
