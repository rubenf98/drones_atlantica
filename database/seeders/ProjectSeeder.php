<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Project::create([
            'name' => 'Alfa',
            'image' => '/images/drones/alfa.png',
            'full_image' => '/images/drones/alfa.png',
        ]);

        Project::create([
            'name' => 'Alfa Interior',
            'image' => '/images/drones/alfa_interior.png',
            'full_image' => '/images/drones/alfa_interior.png',
        ]);

        Project::create([
            'name' => 'Delta',
            'image' => '/images/drones/delta.png',
            'full_image' => '/images/drones/delta.png',
        ]);

        Project::create([
            'name' => 'Charlie',
            'image' => '/images/drones/charlie.png',
            'full_image' => '/images/drones/charlie.png',
        ]);

        Project::create([
            'name' => 'Bravo',
            'image' => '/images/drones/bravo.png',
            'full_image' => '/images/drones/bravo.png',
        ]);
    }
}
