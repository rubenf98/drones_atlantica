<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documentations', function (Blueprint $table) {
            $table->id();
            $table->string('registration_certificate')->unique();
            $table->string('type_certificate')->unique();
            $table->string('license_plate')->unique();
            $table->string('noise_certificate')->unique();
            $table->string('noise_certificate_id')->unique();
            $table->string('airworthiness_certificate')->unique();
            $table->string('airworthiness_certificate_id')->unique();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('documentations');
    }
}
