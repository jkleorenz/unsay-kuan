<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('title');
            $table->string('company')->nullable();
            $table->string('location')->nullable();
            $table->string('type')->nullable();
            $table->text('description');
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('status')->default('pending'); // pending|approved|rejected
            $table->timestamps();

            $table->index('status');
            $table->index('category_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_listings');
    }
};
