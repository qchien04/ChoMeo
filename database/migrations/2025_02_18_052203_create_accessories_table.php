<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('accessories', function (Blueprint $table) {
            $table->id(); // Tạo cột ID tự động tăng
            $table->string('name'); // Tên phụ kiện
            $table->string('image')->comment('Ảnh'); 
            $table->integer('quantity')->default(1)->comment('Còn lại');
            $table->boolean('is_active')->default(1)->comment('Hiển thi');
            $table->enum('breed', ['Chó', 'Mèo'])->comment('Chuồng dành cho chó hoặc mèo');
            $table->integer('price')->comment('Giá ');
            $table->text('description')->nullable()->comment('Mô tả chi tiết về chuồng');
            $table->float('evaluate', 2, 1)->default(0)->comment('Điểm đánh giá trung bình');
            $table->integer('number_of_evaluate')->default(0)->comment('Số lượt đánh giá');
            $table->timestamps(); // Tạo cột created_at và updated_at
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accessories');
    }
};
