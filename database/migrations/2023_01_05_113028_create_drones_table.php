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
            $table->integer('n_motors')->nullable();
            $table->decimal('mtom', 6, 2)->nullable();
            $table->decimal('height', 6, 2)->nullable();
            $table->decimal('width', 6, 2)->nullable();
            $table->decimal('length', 6, 2)->nullable();
            $table->decimal('max_speed', 6, 2)->nullable();
            $table->decimal('max_distance', 6, 2)->nullable();
            $table->decimal('max_altitude', 6, 2)->nullable();
            $table->boolean('danger_transportation');
            $table->string('designation')->nullable();
            $table->string('propulsion_type')->nullable();
            $table->boolean('active')->default(true);
            $table->string('image')->default('default-image.jpg');
            $table->unsignedBigInteger('drone_type_id');
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('manufacturer_id')->nullable();
            $table->timestamps();

            $table->foreign("drone_type_id")->references("id")->on("drone_types")->onDelete("cascade");
            $table->foreign("project_id")->references("id")->on("projects")->onDelete("cascade");
            $table->foreign("manufacturer_id")->references("id")->on("manufacturers")->onDelete("set null");
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
