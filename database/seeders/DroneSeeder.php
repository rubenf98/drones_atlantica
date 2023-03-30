<?php

namespace Database\Seeders;

use App\Models\Drone;
use Illuminate\Database\Seeder;

class DroneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            [
                'project_id' => 1,
                'manufacturer_id' => 1,
                'drone_type_id' => 1,
                'serial_number' => '0001',
                'n_motors' => 4,
                'danger_transportation' => false,
            ],
            [
                'project_id' => 1,
                'manufacturer_id' => 1,
                'drone_type_id' => 1,
                'serial_number' => '0002',
                'n_motors' => 4,
                'danger_transportation' => false,
            ],
            [
                'project_id' => 1,
                'manufacturer_id' => 1,
                'drone_type_id' => 1,
                'serial_number' => '0003',
                'n_motors' => 4,
                'danger_transportation' => false,
            ],
            [
                'project_id' => 1,
                'manufacturer_id' => 1,
                'drone_type_id' => 1,
                'serial_number' => '0004',
                'n_motors' => 4,
                'danger_transportation' => false,
            ],


            [
                'project_id' => 2,
                'manufacturer_id' => 1,
                'drone_type_id' => 1,
                'serial_number' => '0001',
                'danger_transportation' => false,
            ],

            [
                'project_id' => 2,
                'manufacturer_id' => 1,
                'drone_type_id' => 1,
                'serial_number' => '0002',
                'danger_transportation' => false,
            ],

            [
                'project_id' => 4,
                'manufacturer_id' => 1,
                'drone_type_id' => 1,
                'serial_number' => '0001',
                'n_motors' => 8,
                'danger_transportation' => false,
            ],
        ];

        foreach ($items as $item) {
            Drone::create($item);
        }
    }
}
