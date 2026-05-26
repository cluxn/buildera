<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nav_items', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->string('url');
            $table->string('parent_group', 100)->nullable();
            $table->integer('display_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->boolean('opens_new_tab')->default(false);
            $table->timestamps();
            $table->index(['parent_group', 'display_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nav_items');
    }
};
