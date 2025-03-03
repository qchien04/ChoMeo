<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable(); // Thêm số điện thoại
            $table->string('address')->nullable(); // Thêm địa chỉ
            $table->date('birthdate')->nullable(); // Thêm ngày sinh
            $table->enum('role', ['user', 'admin'])->default('user'); // Thêm role
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'address', 'birthdate', 'role']);
        });
    }
};
