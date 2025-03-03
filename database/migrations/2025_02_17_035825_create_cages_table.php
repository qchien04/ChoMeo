<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('cages', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Tên chuồng'); 
            $table->string('image')->comment('Ảnh'); 
            $table->integer('capacity')->default(10)->comment('Sức chứa tối đa');
            $table->integer('quantity')->default(1)->comment('Còn lại');
            $table->enum('breed', ['Chó', 'Mèo'])->comment('Chuồng dành cho chó hoặc mèo');
            $table->decimal('price', 10, 2)->comment('Giá thuê hoặc mua chuồng');
            $table->text('description')->nullable()->comment('Mô tả chi tiết về chuồng');
            $table->string('parameter')->nullable()->comment('Thông số kỹ thuật, ví dụ: kích thước, vật liệu');
            $table->float('evaluate', 2, 1)->default(0)->comment('Điểm đánh giá trung bình');
            $table->integer('number_of_evaluate')->default(0)->comment('Số lượt đánh giá');
            $table->boolean('is_active')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cages');
    }
};
