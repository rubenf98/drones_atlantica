<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDronesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drones', function (Blueprint $table) {
            $table->id();
            $table->string('serial_number');
            $table->integer('n_motors');
            $table->decimal('max_weight', 6, 2);
            $table->decimal('max_altitude', 6, 2);
            $table->decimal('max_speed', 6, 2);
            $table->decimal('max_distance', 6, 2);
            $table->boolean('danger_transportation');
            $table->string('designation');
            $table->string('propulsion_type');
            $table->unsignedBigInteger('drone_type_id');
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('manufacturer_id')->nullable();
            $table->unsignedBigInteger('documentation_id')->nullable();
            $table->timestamps();

            $table->foreign("drone_type_id")->references("id")->on("drone_types")->onDelete("cascade");
            $table->foreign("project_id")->references("id")->on("projects")->onDelete("cascade");
            $table->foreign("manufacturer_id")->references("id")->on("manufacturers")->onDelete("set null");
            $table->foreign("documentation_id")->references("id")->on("documentations")->onDelete("set null");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('drones');
    }
}
