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
                'mtom' => 4,
                'height' => 4,
                'width' => 4,
                'length' => 4,
                'max_speed' => 4,
                'max_distance' => 4,
                'max_altitude' => 4,
                'danger_transportation' => false,
                'designation' => '',
                'propulsion_type' => '',
            ],
            [
                'project_id' => 1,
                'manufacturer_id' => 1,
                'drone_type_id' => 1,
                'serial_number' => '0001',
                'n_motors' => 4,
                'mtom' => 4,
                'height' => 4,
                'width' => 4,
                'length' => 4,
                'max_speed' => 4,
                'max_distance' => 4,
                'max_altitude' => 4,
                'danger_transportation' => false,
                'designation' => '',
                'propulsion_type' => '',
            ],
            [
                'project_id' => 1,
                'manufacturer_id' => 1,
                'drone_type_id' => 1,
                'serial_number' => '0001',
                'n_motors' => 4,
                'mtom' => 4,
                'height' => 4,
                'width' => 4,
                'length' => 4,
                'max_speed' => 4,
                'max_distance' => 4,
                'max_altitude' => 4,
                'danger_transportation' => false,
                'designation' => '',
                'propulsion_type' => '',
            ],
            [
                'project_id' => 1,
                'manufacturer_id' => 1,
                'drone_type_id' => 1,
                'serial_number' => '0001',
                'n_motors' => 4,
                'mtom' => 4,
                'height' => 4,
                'width' => 4,
                'length' => 4,
                'max_speed' => 4,
                'max_distance' => 4,
                'max_altitude' => 4,
                'danger_transportation' => false,
                'designation' => '',
                'propulsion_type' => '',
            ],


            [
                'project_id' => 2,
                'manufacturer_id' => 1,
                'drone_type_id' => 1,
                'serial_number' => '0001',
                'n_motors' => 4,
                'mtom' => 4,
                'height' => 4,
                'width' => 4,
                'length' => 4,
                'max_speed' => 4,
                'max_distance' => 4,
                'max_altitude' => 4,
                'danger_transportation' => false,
                'designation' => '',
                'propulsion_type' => '',
            ],

            [
                'project_id' => 2,
                'manufacturer_id' => 1,
                'drone_type_id' => 1,
                'serial_number' => '0001',
                'n_motors' => 4,
                'mtom' => 4,
                'height' => 4,
                'width' => 4,
                'length' => 4,
                'max_speed' => 4,
                'max_distance' => 4,
                'max_altitude' => 4,
                'danger_transportation' => false,
                'designation' => '',
                'propulsion_type' => '',
            ],

            [
                'project_id' => 4,
                'manufacturer_id' => 1,
                'drone_type_id' => 1,
                'serial_number' => '0001',
                'n_motors' => 4,
                'mtom' => 4,
                'height' => 4,
                'width' => 4,
                'length' => 4,
                'max_speed' => 4,
                'max_distance' => 4,
                'max_altitude' => 4,
                'danger_transportation' => false,
                'designation' => '',
                'propulsion_type' => '',
            ],
        ];

        foreach ($items as $item) {
            Drone::create($item);
        }
    }
}
