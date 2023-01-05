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
            'name' => 'Alpha',
        ]);

        Project::create([
            'name' => 'Alpha Interior',
        ]);

        Project::create([
            'name' => 'Bravo',
        ]);

        Project::create([
            'name' => 'Charlie',
        ]);
    }
}
