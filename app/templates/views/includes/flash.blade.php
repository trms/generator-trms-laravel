<div class="row">
	<div class="col-sm-12">
	   	@if(Session::get('message')) 
	    	<p class="alert alert-success">{{Session::get('message')}}</p>
	    @endif
	   	@if(Session::get('warning')) 				
			<p class="alert alert-danger">{{Session::get('warning')}}</p>
		@endif
		@if(Session::get('error')) 				
			<p class="alert alert-danger">{{Session::get('error')}}</p>
		@endif
	
		@foreach($errors->all() as $key=>$e)
			<p class="alert alert-danger">{{$e}}</p>
		@endforeach
					       
	</div>
</div>