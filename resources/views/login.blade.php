<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Login</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round|Open+Sans">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    </head>
    <body>
        <div class="container">
            <br>
            <div class="row d-flex justify-content-center">
                <aside class="col-sm-4">
                    <div class="cardr">
                        <article class="card-body">
	                        <h4 class="card-title text-center mb-4 mt-1">Sign in</h4>
	                        <hr>
    	                    <!--<p class="text-success text-center">Some message goes here</p>-->
	                        <form>
    	                        <div class = "form-group">
	                                <div class = "input-group">
		                                <div class = "input-group-prepend">
		                                    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
		                                </div>
    		                            <input class="form-control" placeholder="Email" type="email" required>
	                                </div>
	                            </div>
	                            <div class="form-group">
	                                <div class="input-group">
		                                <div class="input-group-prepend">
		                                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
		                                </div>
    	                                <input class="form-control" placeholder="******" type="password" required>
	                                </div>
	                            </div>
	                            <div class="form-group">
	                                <button type="submit" class="btn btn-primary btn-block">Login</button>
	                            </div>
	                        </form>
                        </article>
                    </div>
                </aside>
            </div>
        </div>
    </body>
</html>
