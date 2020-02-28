<?php

namespace App\Http\Controllers;

use App\User;
use App\Events\ChatEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{	
	/**
     * Create a new controller instance
     *
     * @return void
     */
	public function __construct(){

		$this->middleware('auth');

	}

    public function getChat(){

    	return view('chat');

    }

    public function postChat(Request $request){

    	$user = User::find(Auth::id());

        $this->saveChatSession($request);

    	event(new ChatEvent($request->message, $user));
    }

    public function saveChatSession(Request $request){

        session()->put('chat', $request->chat);

    }

    public function getOldMessages(){

        return session('chat');

    }

}
