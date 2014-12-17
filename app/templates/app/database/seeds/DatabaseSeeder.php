<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
// use CrowWing\User;
// use CrowWing\Building;
// use CrowWing\Department;
// use CrowWing\Department_Meta;
// use CrowWing\Faq;
// use CrowWing\Survey;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		$this->call('UserTableSeeder');

	}

}


class UserTableSeeder extends Seeder {

    public function run()
    {
        DB::table('users')->delete();

        User::create(array('email' => 'admin','password'=>Hash::make('trms')));
        User::create(array('email' => 'seth.phillips@trms.com','password'=>Hash::make('trms140')));
    }

}








