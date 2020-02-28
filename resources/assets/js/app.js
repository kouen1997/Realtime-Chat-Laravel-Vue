
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import ChatBox from './components/chat-box.vue';

//for auto scroll


import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

//for notification
import Toaster from 'v-toaster'

import 'v-toaster/dist/v-toaster.css'

Vue.use(Toaster, {timeout: 5000})

Vue.component('chat-box', ChatBox);

const app = new Vue({

    el: '#app',

    data:{

    	message:'',

    	chat:{

    		message:[],

    		user:[],

    		color: [],

    		time: []
    	},

    	typing:'',

    	numberOfUsers: 0

    },

    watch: {

    	message(){

    		Echo.private('chat')

		    	.whisper('typing', {

		        	name: this.message

		    	});
    	}
    },

    methods:{

    	send(){

    		if (this.message.length != 0){

    			this.chat.message.push(this.message);

    			this.chat.color.push('info');

    			this.chat.time.push(this.getTime());

    			this.chat.user.push('You');

    			axios.post('/postChat', {

				    message : this.message,

				    chat: this.chat

				  })

				.then(response => {

				    console.log(response);

					this.message = ''

				  })

				.catch(error => {

				    console.log(error);

				  });
    		}
    	},

	    getTime(){

	    	let time = new Date();

	    	return time.getHours()+":"+time.getMinutes();
	    },

	    getOldMessages(){

			axios.get('/getOldMessages')

				.then(response => {

					if (response.data != ''){

						this.chat = response.data;

					}

				})

				.catch(error => {

					console.log(error);
				});
    	
    	}
    },

    mounted(){

    	this.getOldMessages();
    	
    	Echo.private('chat')

	    	.listen('ChatEvent', (e) => {

	    		this.chat.message.push(e.message);

	    		this.chat.user.push(e.user);

	    		this.chat.color.push('warning');

    			this.chat.time.push(this.getTime());
	        	// console.log(e);

	        	axios.post('/saveChatSession', {

	        		chat: this.chat

	        	})

				.then(response => {

				})

				.catch(error => {

					console.log(error);
				})

	    	})

	    	.listenForWhisper('typing', (e) => {

	    		if(e.name != ''){

	    			this.typing = 'typing...'

	    			// console.log('typing');

	    		}else{

	    			this.typing = ''

	    		}

	    	});


	    	Echo.join(`chat`)

			    .here((users) => {
			        
			        this.numberOfUsers = users.length;

			    })

			    .joining((user) => {

			    	this.numberOfUsers += 1;

			    	this.$toaster.success(user.name+' joined the chat room.');

			        //console.log(user.name);

			    })

			    .leaving((user) => {

			    	this.numberOfUsers -= 1;

			    	this.$toaster.error(user.name+' leave the chat room.');

			        //console.log(user.name);

			    });

    }

});
