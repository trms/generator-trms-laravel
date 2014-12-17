@extends('layouts.admin')

@section('title')
	Login
@stop



@section('content')



{{ Form::open(['action'=>'AuthController@store']) }}

	
	

	
	<!-- Email Input -->
	<div class="form-group">
		
		{{ Form::label('email','Email') }}
		
		{{ Form::text('email','',['class' => 'form-control','placeholder'=>'email'] ) }}
	
	</div>
	
	
	<!-- Password Input -->
	<div class="form-group">
		
		{{ Form::label('password','Password') }}
		
		{{ Form::password('password',['class' => 'form-control','placeholder'=>'password'] ) }}
	
	</div>
	
	
	<div class="form-group">
		
		{{ link_to_action('RemindersController@getRemind','Forgot Your Password?')}}
		
	</div>
	
	
	<!-- Submit Button -->
	<div class="form-group">
	
		{{ Form::submit('Login',['class'=> 'btn btn-primary form-control']) }}
	
	</div>
	
	
	
	
	
	

{{ Form::close() }}



@stop