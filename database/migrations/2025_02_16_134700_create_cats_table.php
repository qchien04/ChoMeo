<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cats', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('breed')->nullable(); // Giống loài
            $table->enum('gender', ['male', 'female']);
            $table->unsignedInteger('age');
            $table->float('weight', 8, 2);
            $table->string('color')->nullable();
            $table->decimal('price', 8, 2);
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('vaccinated')->default(false);
            $table->boolean('is_active')->default(false);
            $table->boolean('sterilized')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cats');
    }
};
