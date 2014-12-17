@extends('layouts/admin')


@section('title')

Reset Your Password

@stop



@section('content')



{{Form::open(array('action'=>'RemindersController@postReset'))}}
{{Form::hidden('token',$token)}}

<div class="form-group">
	{{Form::label('email','Verify Your Email')}}
	{{Form::text('email','',array('class'=>'form-control'))}}
</div>

<div class="form-group">
	{{Form::label('password','Enter a New Password')}}
	{{Form::password('password',array('class'=>'form-control'))}}
</div>

<div class="form-group">
	{{Form::label('password_confirmation','Repeat The New Password')}}
	{{Form::password('password_confirmation',array('class'=>'form-control'))}}
</div>

{{Form::submit('Submit',array('class'=>'btn btn-success'))}}
{{Form::close()}}




@stop
