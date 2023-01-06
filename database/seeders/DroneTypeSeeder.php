<?php

namespace Database\Seeders;

use App\Models\DroneType;
use Illuminate\Database\Seeder;

class DroneTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DroneType::create([
            'name' => 'Asa fixa'
        ]);

        DroneType::create([
            'name' => 'Rotorcraft'
        ]);

        DroneType::create([
            'name' => 'Planador'
        ]);

        DroneType::create([
            'name' => 'VTOL'
        ]);

        DroneType::create([
            'name' => 'Outro'
        ]);
    }
}
