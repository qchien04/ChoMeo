<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('accessory_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('accessory_id')->constrained('accessories')->onDelete('cascade'); // Khóa ngoại
            $table->foreignId('user_id')->constrained('users');;
            $table->text('content'); 
            $table->boolean('is_active')->default(false);
            $table->integer('rate');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accessory_comments');
    }
};
