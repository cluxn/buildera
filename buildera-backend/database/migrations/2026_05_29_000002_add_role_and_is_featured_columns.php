<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('authors', function (Blueprint $table) {
            $table->string('role', 100)->nullable()->after('bio');
        });

        Schema::table('blog_posts', function (Blueprint $table) {
            $table->boolean('is_featured')->default(false)->after('is_published');
        });
    }

    public function down(): void
    {
        Schema::table('authors', function (Blueprint $table) {
            $table->dropColumn('role');
        });

        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn('is_featured');
        });
    }
};
