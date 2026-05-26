<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('client_title')->nullable();
            $table->string('client_company')->nullable();
            $table->string('client_photo')->nullable();
            $table->text('content');
            $table->tinyInteger('rating')->default(5);
            $table->json('service_tags')->nullable();
            $table->json('industry_tags')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(false)->index();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->index(['is_published', 'is_featured']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
