<template>

	<div>

    	<li class="list-group-item" :class="className"><slot></slot><span id="time">{{ time }}</span></li>
    
    	<small class="badge float-right":class="badgeClass"><small style="color: #fff;"> {{ user }}</small></small>

    </div>

</template>

<script>
    export default {

    	props: [

    		'color',

            'user',

            'time'
    	],

    	computed:{

    		className(){

    			return 'list-group-item-'+this.color;

    		},

    		badgeClass(){

    			return 'badge-'+this.color;

    		},
    	},

        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

<style>

    #time{

        font-size: 9px;

        margin-top: 10px;

        margin-left: 10px;

    }

</style>
