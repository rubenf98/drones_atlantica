<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCrashReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('crash_reports', function (Blueprint $table) {
            $table->id();
            $table->datetime('date');
            $table->unsignedBigInteger('flight_report_id');
            $table->decimal('latitude', 8, 5);
            $table->decimal('longitude', 8, 5);
            $table->text('analysis')->nullable();
            $table->text('corrections')->nullable();
            $table->timestamps();

            $table->foreign("flight_report_id")->references("id")->on("flight_reports")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crash_reports');
    }
}
