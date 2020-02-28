<!DOCTYPE html>

<html lang="en">

<head>

	<meta charset="UTF-8">

	<title>Chat</title>

	<meta name="csrf-token" content="{{ csrf_token() }}">

	<link rel="stylesheet" href="{{ asset('css/app.css') }}">

	<style type="text/css">

		.list-group{

			overflow-y: scroll;
			height: 200px;

		}

	</style>
</head>

<body>
	
	<div class="container">

		<div class="row" id="app">

			<div class="offset-4 col-4 offset-sm-1 col-sm-10">

				<li class="list-group-item active">Chat Room <span class="badge badge-danger badge-pill">@{{ numberOfUsers }}</span></li>

			
				<ul class="list-group" v-chat-scroll>

				  	<chat-box

				  	v-for="value,index in chat.message"

				  	:key=value.index

				  	:color= chat.color[index]

				  	:user= chat.user[index]

				  	:time= chat.time[index]> @{{ value }}</chat-box>

				  	<div class="badge badge-pill badge-primary" style="width: 50px;">@{{ typing }}</div>

				</ul>

				<input type="text" class="form-control" placeholder="Type your message here..." v-model="message" @keyup.enter="send">

			</div>

		</div>

	</div>

	<script src="{{ asset('js/app.js') }}"></script>

</body>

</html>
