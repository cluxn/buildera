<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->index();
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->string('service_interest')->nullable();
            $table->text('message')->nullable();
            $table->string('source_page')->nullable();
            $table->string('source_form')->index();
            $table->string('utm_source')->nullable();
            $table->string('utm_medium')->nullable();
            $table->string('utm_campaign')->nullable();
            $table->string('utm_content')->nullable();
            $table->string('utm_term')->nullable();
            $table->string('utm_first_source')->nullable();
            $table->string('utm_first_medium')->nullable();
            $table->string('utm_first_campaign')->nullable();
            $table->string('ip_hash')->nullable();
            $table->string('timezone')->nullable();
            $table->boolean('is_duplicate')->default(false);
            $table->string('status')->default('new');
            $table->text('notes')->nullable();
            $table->timestamp('submitted_at')->nullable()->index();
            $table->timestamps();
            $table->index('created_at');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
