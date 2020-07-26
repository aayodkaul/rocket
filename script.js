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
		$("#content").append('<img class="rocket launch" src="orion.png" style="left: 35%">');
	} else {
		$("#content").append('<img class="rocket launch" src="falcon.png" style="left: 45%">');
	}
	var altitude = 0;
	var velocity = 0;
	var time = 0;
	var accel = 0;
	$("#content").append('<div class="my-legend"><div class="legend-title">Rocket Sim Stats</div><div class="legend-scale"><ul class="legend-labels"><li>velocity</li><li>time</li><li>altitude</li><li>accel</li></ul></div>');
	customizethrust(thrusttime, engine, fuel, drag, thrust); //thrusttime should affect delay feature at bottom
}
function customizethrust(seconds, engine, fuel, drag, th){
	var supportedFlag = $.keyframe.isSupported();
	var thrust=parseInt(seconds)/10;
	var durationtime=thrust.toString()+'s';
	var thrusttime=parseInt(seconds)/30;
	var delay=thrusttime.toString()+'s';
	if(engine=="sol"){
		//thrust is increased, rocket flies farther
	} else if(engine=="liq"){
		var newthrust=thrust - 2;
		durationtime=newthrust.toString()+'s';
		//no change to thrust, so altitude does not change, but rocket flies faster
	} else if(engine=="hyb"){
		var newthrust=thrust - 1;
		durationtime=newthrust.toString()+'s';
		//thrust is slightly increased, rocket flies slightly further and slightly faster
	}

	if (fuel=="lhy"){
		var newthrust2=thrust - 4;
		durationtime=newthrust2.toString()+'s';
		//fastest
	} else if(fuel=="ker"){
		var newthrust2=thrust - 3;
		durationtime=newthrust2.toString()+'s';
		//faster
	} else if(fuel=="hyd"){
		var newthrust2=thrust - 2;
		durationtime=newthrust2.toString()+'s';
		//fast
	} else{
		var newthrust2=thrust - 1;
		durationtime=newthrust2.toString()+'s';
		//slowest
	}

	if (drag >= th){
		alert("ERROR: DRAG SHOULD NOT BE GREATER THAN THRUST");
	} else{
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
		    delay: delay, //[optional, default: 0s]  how long you want to wait before the animation starts
		    iterationCount: 'infinite', //[optional, default:1]  how many times you want the animation to repeat
		    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
		    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
		    complete: function(){console.log('here')} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
		});
	}
}