<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('footer_links', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->string('url');
            $table->enum('column_group', ['Services', 'Solutions', 'Company', 'Resources']);
            $table->integer('display_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
            $table->index(['column_group', 'display_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('footer_links');
    }
};
