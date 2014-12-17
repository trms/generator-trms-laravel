



{{Form::open(['method'=>'GET'])}}
  
  	<div class="input-group form">
       
    		{{Form::input('search','q','',['placeholder'=>'Search','class'=>'form-control'])}}
        
    	<span class="input-group-btn">
         
        	{{Form::button('<span class="glyphicon glyphicon-search"></span>',['type'=>'submit','class'=>'btn btn-primary'])}}

    	</span>
  	</div>

{{Form::close()}}



