$(document).ready(function () {
	$( "input" ).on( "click", function( event ) {
		console.log("here");
		console.log($('input[name=group1]:checked').attr('id'));
	});
});
function startrocket() {
	var fuel = $('input[name=group1]:checked').attr('id');
	var engine = $('input[name=group2]:checked').attr('id');
	var rocket = $('input[name=group3]:checked').attr('id');
	var thrust = $('#textInput').val();
	var drag = $('#textInput2').val();
	var thrusttime = $('input[name=group4]:checked').attr('id');
	console.log(fuel);
	console.log(engine);
	console.log(rocket);
	console.log(thrust);
	console.log(drag);
	console.log(thrusttime);
	$("#content").empty();
	//$("#content").css("background", "purple");
	$("#content").css("overflow-y", "hidden");
	if(rocket=="apo"){
		$("#content").append('<img class="rocket launch" src="apollo-removebg-preview.png">');
	} else if(rocket=="ori") {
		$("#content").append('<img class="rocket launch" src="orion.png">');
	} else {
		$("#content").append('<img class="rocket launch" src="falcon.png">')
	}
	console.log($(".rocket"));
	customizethrust(thrusttime); //thrusttime should affect delay feature at bottom
}
	$("#content").css();
	if(engine=="sol"){
		//thrust is increased, rocket flies farther
	} else if(engine=="liq"){
		//no change to thrust, so altitude does not change, but rocket flies faster
	} else if(engine=="hyb"){
		//thrust is slightly increased, rocket flies slightly further and slightly faster
	}
function customizethrust(seconds){
	var supportedFlag = $.keyframe.isSupported();
	var thrust=parseInt(seconds)/15;
	var durationtime=thrust.toString()+'s'
	console.log(durationtime);
	console.log(thrust);
	console.log(supportedFlag);
	$.keyframe.define([{
		name: 'fly', 
		'0%': {
			'bottom': '0px'
		},
		'100%': {
			'bottom': '100%'
		}
	}]);
	$(".rocket").playKeyframe({
		name: 'fly',
		duration: durationtime,
		timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
	    delay: '0s', //[optional, default: 0s]  how long you want to wait before the animation starts
	    iterationCount: 'infinite', //[optional, default:1]  how many times you want the animation to repeat
	    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
	    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
	    complete: function(){console.log('here')} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
	});
}