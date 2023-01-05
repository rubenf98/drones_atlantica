<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCrashMediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('crash_media', function (Blueprint $table) {
            $table->id();
            $table->string('path');
            $table->unsignedBigInteger('crash_report_id');
            $table->string('file_type');
            $table->timestamps();

            $table->foreign("crash_report_id")->references("id")->on("crash_reports")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crash_media');
    }
}
