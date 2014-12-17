<?php


class BackupController extends Controller {


	public function __construct(){
		$this->beforeFilter('auth');
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		return View::make('backup.index',['backedUp'=>false]);
	}

	
	public function store()
	{

		Artisan::call('db:backup',['filename'=>public_path()."/data/MySqlBackup.sql"]);

		return View::make('backup.index',array('backedUp'=>true))->with('message', 'Backup Created');
	}

	

}
