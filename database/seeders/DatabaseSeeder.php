<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Create groups
        DB::table('groups')->insert([
            'name'          => 'Administrador',
            'description'   => 'Este grupo pode realizar todas as funções do sistema.'
        ]);

        DB::table('groups')->insert([
            'name'          => 'Normal',
            'description'   => 'Este grupo pode visualizar e inserir informações'
        ]);
    }
}
