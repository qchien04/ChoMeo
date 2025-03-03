<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cage_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cage_id')->constrained('cages')->onDelete('cascade'); // Khóa ngoại
            $table->foreignId('user_id')->constrained('users');;
            $table->text('content'); 
            $table->integer('rate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cage_comments');
    }
};
