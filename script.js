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
	drag = parseInt(drag);
	thrust = parseInt(thrust);
	$("#content").empty();
	//$("#content").css("background", "purple");
	$("#content").css("overflow-y", "hidden");
	if(rocket=="apo"){
		$("#content").append('<img class="rocket launch" src="apollo-removebg-preview.png">');
		var weight=10;
		var mass=1.5;
	} else if(rocket=="ori") {
		$("#content").append('<img class="rocket launch" src="orion.png" style="left: 35%">');
		var weight=20;
		var mass=2;
	} else {
		$("#content").append('<img class="rocket launch" src="falcon.png" style="left: 45%">');
		var weight=30;
		var mass=3;
	}
	var time = Math.round(((thrust - drag) * 4)*100) / 100;
	// time = (thrust - drag) * 4
	var accel = Math.round(((thrust - weight) / mass)*100) / 100;
	// accel = (thrust - weight) / mass
	var velocity = Math.round((1/2 * accel * time)*100) / 100;
	// v = 1/2 * accel * time
	var altitude = Math.round((Math.pow(velocity,2) / (2 * accel))*100) / 100;
	// h = v^2 / (2 * accel)
	$("#content").append('<div class="my-legend"><div class="legend-title">Rocket Sim Stats</div><div class="legend-scale"><ul class="legend-labels"><li id = "velocity">Velocity: ' + velocity + 'm/s' + '</li><li id = "time">Time: ' + time + 's' + '</li><li id = "altitude">Altitude: ' + altitude + 'm' + '</li><li id = "accel">Accel: ' + accel + 'm/s^2' + '</li></ul></div>');
	customizethrust(thrusttime, engine, fuel, drag, thrust, time); //thrusttime should affect delay feature at bottom
}
function customizethrust(seconds, engine, fuel, drag, th, time){
	var supportedFlag = $.keyframe.isSupported();
	var thrust=1400/time;
	var durationtime=thrust.toString()+'s';
	var thrusttime=parseInt(seconds)/30;
	var delay=thrusttime.toString()+'s';
	/*if(thrusttime=="60"){
		var newthrusttime=1.5;
		var delay = newthrusttime.toString()+'s';
	} else if(thrusttime=="90"){
		var newthrusttime=3;
		var delay = newthrusttime.toString()+'s';
	} else if(thrusttime=="120"){
		var newthrusttime=4.5;
		var delay = newthrusttime.toString()+'s';
	} else if(thrusttime=="150"){
		var newthrusttime=6;
		var delay = newthrusttime.toString()+'s';
	}*/

	if(engine=="sol"){
		var newthrust=thrust - 1.5;
		durationtime=newthrust.toString()+'s';
		//thrust is increased, rocket flies farther
	} else if(engine=="liq"){
		var newthrust=thrust - 1;
		durationtime=newthrust.toString()+'s';
		//no change to thrust, so altitude does not change, but rocket flies faster
	} else if(engine=="hyp"){
		var newthrust=thrust - 0.5;
		durationtime=newthrust.toString()+'s';
		//thrust is slightly increased, rocket flies slightly further and slightly faster
	}

	if (fuel=="lhy"){
		var newthrust2=newthrust - 2;
		durationtime=newthrust2.toString()+'s';
		//fastest
	} else if(fuel=="ker"){
		var newthrust2=newthrust - 1.5;
		durationtime=newthrust2.toString()+'s';
		//faster
	} else if(fuel=="hyd"){
		var newthrust2=newthrust - 1;
		durationtime=newthrust2.toString()+'s';
		//fast
	} else if(fuel=="alc"){
		var newthrust2=newthrust - 0.5;
		durationtime=newthrust2.toString()+'s';
		//slowest
	}
	
	console.log(drag);
	console.log(th);
	if (drag >= th){
		alert("ERROR: DRAG SHOULD NOT BE GREATER THAN THRUST");
		//try to incorporate rocket malfunction animation on second screen
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
		    iterationCount: '1', //[optional, default:1]  how many times you want the animation to repeat
		    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
		    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
		    complete: function(){console.log('here')} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
		});
	}
	setInterval(function() {
		var timestep = 1 / durationtime
		var currentposition = durationtime
    	document.getElementById("velocity").innerHTML = timestep / durationtime;
    	//figure out right side of equation, durationtime/# of time steps
	}, 1000);
}