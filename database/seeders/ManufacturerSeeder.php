<?php

namespace Database\Seeders;

use App\Models\Manufacturer;
use Illuminate\Database\Seeder;

class ManufacturerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Manufacturer::create([
            'name' => 'ARDITI',
            'country' => 'Portugal',
            'email' => 'arditi@arditi.pt',
            'phone' => '+351 291 721 220',
            'postal_code' => '9020-105',
            'locality' => 'Funchal',
            'address' => 'Edif. Madeira Tecnopolo, Piso 2 Caminho da Penteada'
        ]);
    }
}
