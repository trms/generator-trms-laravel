@extends('layouts/admin')

@section('content')

@section('title')
To get a password reset email
@stop




@section('content')	

	{{Form::open(array('action'=>'RemindersController@postRemind'))}}


	<div class="form-group">
		{{Form::label('email','enter your email')}}
		{{Form::email('email','',array('class'=>'form-control'))}}
	</div>


	{{Form::submit('Submit',array('class'=>'btn btn-success form-control'))}}
	{{Form::close()}}



@stop