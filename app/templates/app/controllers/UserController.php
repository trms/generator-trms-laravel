<?php

use Validators\Forms\UserForm;

class UserController extends \BaseController {

	protected $Validator;

	public function __construct(UserForm $Validator){
		$this->beforeFilter('auth');

		$this->Validator = $Validator;
	}

	 
	public function index()
	{
		$users = User::all();

		return View::make('users/index',array('users'=>$users));
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('users/create');
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{

		if(Input::get('password')!=Input::get('password2')){
			return Redirect::back()->with('warning','your passwords did not match')->withInput();
		}


	 	try{
	 		$this->Validator->validate( Input::all() );
	 	}
	 	catch(Exception $e){
	 		return Redirect::back()->withInput()->withErrors($e->getErrors());
	 	}

		$input = Input::all();

		$user = new User;
		$user->email = $input['email'];
		$user->password = Hash::make($input['password']);
		$user->save();

		return Redirect::to('admin/users')->with('message',"$user->email successfully created");

	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{

		$user = User::find($id);

		return View::make('users/edit',array('user'=>$user));
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$input = Input::all();

		try{
	 		$this->Validator->validate( Input::all() );
	 	}
	 	catch(Exception $e){
	 		return Redirect::back()->withInput()->withErrors($e->getErrors());
	 	}

		if(isset($input['password'])){
			if(Input::get('password')!=Input::get('password2')){
				return Redirect::back()->with('warning','your passwords did not match')->withInput();
			}
		}


		$user = User::find($id);
		$user->email = $input['email'];

		if(isset($input['password'])){
			$user->password = Hash::make($input['password']);
		}
		
		$user->save();

		return Redirect::to('admin/users')->with('message',"$user->email successfully edited");
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$user = User::find($id);

		$user->delete();

		return Redirect::to('admin/users')->with('warning',"You have deleted $user->email");
	}


}
