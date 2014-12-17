@extends('layouts/admin')

@section('title')
Donor List
@stop
		



@section('content')

	{{ Form::open(array('route' => array('admin.users.update',$user->id),'method'=>'PUT')) }}


	<div class="form-group">
		{{Form::label('email','Email')}}
		{{Form::text('email',$user->email,array('class'=>'form-control'))}}
	</div>

	@if($user->email === Auth::user()->email)
		<div class="form-group">
			{{Form::label('password','Change Your Password')}}
			{{Form::password('password',array('class'=>'form-control'))}}
		</div>
		<div class="form-group">
			{{Form::label('password2','Re-Enter New Password')}}
			{{Form::password('password2',array('class'=>'form-control'))}}
		</div>
	@endif

	{{ Form::submit('Update User',array('class'=>'btn btn-success')) }}
	{{ Form::close() }}


@stop
