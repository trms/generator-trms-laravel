@extends('layouts.admin')


@section('title')
Backup Database
@stop




@section('content')

	{{ Form::open(['action'=>'BackupController@store']) }}
	
		<div class="form-group">
			
			{{ Form::submit('Create Backup',array('class'=>'btn btn-success form-control')) }}

		</div>

	{{ Form::close() }}

	@if($backedUp)
		<div class="form-group">
			
			{{ link_to_asset('data/MysqlBackup.sql','Click Here to Download Your Backup') }}
			
		</div>
	@endif


@stop