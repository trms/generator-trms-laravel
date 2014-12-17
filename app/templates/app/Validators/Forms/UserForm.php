<?php namespace Validators\Forms;

class UserForm extends FormValidator {
	protected $rules = [

		'email'=>'required',
		'password'=>'required_with:password'
		
	];
}