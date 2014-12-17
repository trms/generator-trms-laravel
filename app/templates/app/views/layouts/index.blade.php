<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title><%= projectname %></title>

	{{ HTML::style('style/vendor.css') }}
    {{ HTML::style('style/main.css') }} 
    
    {{ HTML::script('js/vendor.js') }}
    {{ HTML::script('js/main.js') }}
    
</head>
<body>

@yield('content')

	
</body>
</html>