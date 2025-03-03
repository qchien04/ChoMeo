<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('dogs', function (Blueprint $table) {
            $table->id(); // Khóa chính, tự động tăng
            $table->string('name'); // Tên của chó
            $table->string('breed'); // Giống chó
            $table->enum('gender', ['male', 'female']); // Giới tính
            $table->integer('age'); // Tuổi
            $table->float('weight'); // Cân nặng (kg)
            $table->float('price'); // Giá bán
            $table->string('color')->nullable(); // Màu lông
            $table->text('description')->nullable(); // Mô tả
            $table->string('image')->nullable(); // Ảnh
            $table->boolean('sterilized')->default(false); // Đã triệt sản chưa
            $table->boolean('vaccinated')->default(false); // Đã tiêm vaccine chưa
            $table->boolean('is_active')->default(false);
            $table->timestamps(); // Thời gian tạo & cập nhật
        });
    }

    public function down()
    {
        Schema::dropIfExists('dogs');
    }
};
