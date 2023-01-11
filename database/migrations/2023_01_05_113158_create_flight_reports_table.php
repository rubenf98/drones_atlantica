<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFlightReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flight_reports', function (Blueprint $table) {
            $table->id();
            $table->string('serial_number')->unique()->nullable();
            $table->datetime('date');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('drone_id');
            $table->unsignedBigInteger('operator_id');
            $table->unsignedBigInteger('start_localization_id');
            $table->unsignedBigInteger('end_localization_id');
            $table->unsignedBigInteger('nearby_id')->nullable();
            $table->unsignedBigInteger('condition_id');
            $table->text('objective');
            $table->string('client')->nullable();
            $table->text('plan');
            $table->string('pix4d')->nullable();
            $table->string('visibility')->nullable();
            $table->decimal('max_altitude', 6, 2);
            $table->decimal('max_distance', 6, 2);
            $table->string('payload')->nullable();
            $table->text('description')->nullable();
            $table->text('pre_verification')->nullable();
            $table->text('during_verification')->nullable();
            $table->text('post_verification')->nullable();
            $table->string('connection_type')->nullable();
            $table->string('transmission_power')->nullable();
            $table->text('connected_devices')->nullable();
            $table->string('flight_duration')->nullable();
            $table->timestamps();

            $table->foreign("user_id")->references("id")->on("users")->onDelete("set null");
            $table->foreign("drone_id")->references("id")->on("drones")->onDelete("set null");
            $table->foreign("operator_id")->references("id")->on("operators")->onDelete("set null");
            $table->foreign("start_localization_id")->references("id")->on("localizations")->onDelete("set null");
            $table->foreign("end_localization_id")->references("id")->on("localizations")->onDelete("set null");
            $table->foreign("nearby_id")->references("id")->on("nearbies")->onDelete("set null");
            $table->foreign("condition_id")->references("id")->on("conditions")->onDelete("set null");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flight_reports');
    }
}
