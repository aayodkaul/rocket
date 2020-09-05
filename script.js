$(document).ready(function () {
	$( "input" ).on( "click", function( event ) {
		console.log("here");
		console.log($('input[name=group1]:checked').attr('id'));
	});
$("#fuelsection").hide();
$("#enginesection").hide();
$("#designsection").hide();
$("#othersection").hide();
});
function home() {
	hideshow("bodysection");
}
function startrocket() {
	var fuel = $('input[name=group1]:checked').attr('id');
	var engine = $('input[name=group2]:checked').attr('id');
	var rocket = $('input[name=group3]:checked').attr('id');
	var thrust = $('#textInput').val();
	var drag = $('#textInput2').val();
	var thrusttime = $('input[name=group4]:checked').attr('id');
	console.log(fuel);
	if(drag && thrust && fuel && engine && rocket && thrusttime){
		drag = parseInt(drag);
		thrust = parseInt(thrust);
		$("#content").empty();
		$("#content2").empty();
		$("#content3").empty();
		$("#content4").empty();
		//$("#content5").empty();
		//$("#content").css("background", "purple");
		$("#content").css("overflow-y", "hidden");
		if(rocket=="apo"){
			$("#content").append('<img class="rocket launch" src="apollo-removebg-preview.png">');
			var weight = 10;
			var mass = 1.5;
		} else if(rocket=="ori") {
			$("#content").append('<img class="rocket launch" src="orion.png" style="left: 35%">');
			var weight = 20;
			var mass = 2;
		} else {
			$("#content").append('<img class="rocket launch" src="falcon.png" style="left: 45%">');
			var weight = 30;
			var mass = 3;
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
	customizethrust(thrusttime, engine, fuel, drag, thrust, time, velocity, accel, altitude); //thrusttime should affect delay feature at bottom
		}
}
function customizethrust(seconds, engine, fuel, drag, th, time, velocity, accel, altitude){
	var supportedFlag = $.keyframe.isSupported();
	var thrust = 1400 / time;
	var durationtime = thrust.toString() + 's';
	var thrusttime = parseInt(seconds) / 30;
	var delay = thrusttime.toString() + 's';
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
			timingFunction: 'ease-in', // [optional, default: ease] specifies the speed curve of the animation
		    delay: delay, //[optional, default: 0s]  how long you want to wait before the animation starts
		    iterationCount: '1', //[optional, default:1]  how many times you want the animation to repeat
		    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
		    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
		    complete: function(){console.log('here')} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
		});
	}
	var ti = 0;
	var interval = setInterval(function() {
		var dtime = parseInt(durationtime.substring(0, durationtime.length - 1));
		var slope = velocity / dtime;
		var slope2 = accel / dtime;
		var slope3 = time / dtime;
		var slope4 = altitude / dtime;
    	document.getElementById("velocity").innerHTML = "Velocity: " + Math.round((slope * ti)*10) / 10 + " meters per second";
    	document.getElementById("accel").innerHTML = "Acceleration: " + Math.round((slope2 * ti)*10) / 10 + " meters per second squared";
    	document.getElementById("time").innerHTML = "Time Up: " + Math.round((slope3 * ti)*10) / 10 + " seconds";
    	document.getElementById("altitude").innerHTML = "Altitude: " + Math.round((slope4 * ti)*1) / 1 + " meters";
    	ti = ti + 0.01;
    	if (ti >= dtime){
    		clearInterval(interval);
    		return;
    	}
    	//figure out right side of equation, durationtime/# of time steps
    	//add clock?
	}, 10);
	//fontawesome icons, bootsrap, tooltips css, hover, header, nav bar
}
function aboutfuel() {
	//$("#content5").empty();
	hideshow("fuel");
	document.getElementById("fueltitle").innerHTML = "What is Fuel Type?";
	document.getElementById("aboutft").innerHTML = "Rocket fuel works on the basis of Newton's Third Law of Motion, which states that every action is accompanied by an equal and opposite reaction. By firing fuel out the back of a rocket, the force propels it upwards with acceleration equal to the force at which the fuel is expelled.";
	document.getElementById("kerosinetitle").innerHTML = "Kerosine";
	document.getElementById("aboutkerosine").innerHTML = "Kerosine, also known as petroleum, is fuel derived from crude oil and hydrocarbons.   You would not fuel your car with this stuff!  Rocket-grade petroleum is called RP-1 and consists of a highly refined kerosene mixed with liquid oxygen.";
	document.getElementById("alctitle").innerHTML = "Alcohol";
	document.getElementById("aboutalc").innerHTML = "Another liquid fuel is alcohol.  Early rockets, such as Germany’s V-2 missile in WWII, used a mix of liquid oxygen and ethyl alcohol, although more efficient fuels were discovered soon after. One of the main advantages of alcohol was its water content which provided cooling in larger rocket engines. However, it does not offer as much power as most rockets need to lift off. It is currently used in the first stages of many orbital launchers.";
	document.getElementById("hydrazinetitle").innerHTML = "Hydrazine";
	document.getElementById("abouthydrazinetitle").innerHTML = "Around 100,000 metric tonnes of hydrazine are manufactured worldwide every year. It keeps us warm, clothes and feeds us, can save our lives and even take us to the moon. Today, some military vehicles use hydrazine, but it is employed mostly in extraterrestrial exploration. The Curiosity Rover, which has been resident on Mars since 2012, used hydrazine to land on the red planet. And, in July this year, the NASA New Frontiers mission 'Juno' made its incredible insertion into the orbit of Jupiter powered by hydrazine and dinitrogen tetroxide.";
	document.getElementById("liqhydtitle").innerHTML = "Liquid Hydrogen";
	document.getElementById("aboutliqhydtitle").innerHTML = "Despite criticism and early technical failures, the taming of liquid hydrogen proved to be one of NASA's most significant technical accomplishments. Liquid hydrogen, a light and extremely powerful rocket propellant, has the lowest molecular weight of any known substance and burns with extreme intensity (5,500 degrees fahrenheit). In combination with an oxidizer such as liquid oxygen, liquid hydrogen yields the highest specific impulse, or efficiency in relation to the amount of propellant consumed, of any known rocket propellant. However, because liquid oxygen and liquid hydrogen are both cryogenic -- gases that can be liquefied only at extremely low temperatures -- they pose enormous technical challenges.";
}
function aboutengine() {
	hideshow("engine");
	$("#enginetitle").html("What is the Chemical Engine Type?");
	document.getElementById("aboutchemengine").innerHTML = "Propellant is the chemical mixture burned to produce thrust in rockets and consists of a fuel and an oxidizer. A fuel is a substance that burns when combined with oxygen producing gas for propulsion. An oxidizer is an agent that releases oxygen for combination with a fuel. The ratio of oxidizer to fuel is called the mixture ratio. Propellants are classified according to their state - liquid, solid, or hybrid. The gauge for rating the efficiency of rocket propellants is specific impulse, stated in seconds. Specific impulse indicates how many pounds (or kilograms) of thrust are obtained by the consumption of one pound (or kilogram) of propellant in one second. Specific impulse is characteristic of the type of propellant, however, its exact value will vary to some extent with the operating conditions and design of the rocket engine.";
	document.getElementById("solidproptitle").innerHTML = "Solid Propellant Type";
	document.getElementById("aboutsolidprop").innerHTML = "Solid propellant motors are the simplest of all rocket designs. They consist of a casing, usually steel, filled with a mixture of solid compounds (fuel and oxidizer) that burn at a rapid rate, expelling hot gases from a nozzle to produce thrust. When ignited, a solid propellant burns from the center out towards the sides of the casing. The shape of the center channel determines the rate and pattern of the burn, thus providing a means to control thrust. Unlike liquid propellant engines, solid propellant motors cannot be shut down. Once ignited, they will burn until all the propellant is exhausted. Solid propellant motors have a variety of uses. Small solids often power the final stage of a launch vehicle, or attach to payloads to boost them to higher orbits. Medium solids such as the Payload Assist Module (PAM) and the Inertial Upper Stage (IUS) provide the added boost to place satellites into geosynchronous orbit or on planetary trajectories.";
	document.getElementById("liqproptitle").innerHTML = "Liquid Propellant Type";
	document.getElementById("aboutliqprop").innerHTML = "In a liquid propellant rocket, the fuel and oxidizer are stored in separate tanks, and are fed through a system of pipes, valves, and turbopumps to a combustion chamber where they are combined and burned to produce thrust. Liquid propellant engines are more complex than their solid propellant counterparts, however, they offer several advantages. By controlling the flow of propellant to the combustion chamber, the engine can be throttled, stopped, or restarted. Liquid propellants used in rocketry can be classified into three types: petroleum, cryogens, and hypergols.";
	document.getElementById("hybproptitle").innerHTML = "Hybrid Propellant Type";
	document.getElementById("abouthybprop").innerHTML = "Hybrid propellant engines represent an intermediate group between solid and liquid propellant engines. One of the substances is solid, usually the fuel, while the other, usually the oxidizer, is liquid. The liquid is injected into the solid, whose fuel reservoir also serves as the combustion chamber. The main advantage of such engines is that they have high performance, similar to that of solid propellants, but the combustion can be moderated, stopped, or even restarted. It is difficult to make use of this concept for vary large thrusts, and thus, hybrid propellant engines are rarely built. A hybrid engine burning nitrous oxide as the liquid oxidizer and HTPB rubber as the solid fuel powered the vehicle SpaceShipOne, which won the Ansari X-Prize.";
}
function aboutdesign() {
	hideshow("design");
	document.getElementById("designtitle").innerHTML = "What is Design Type?";
	document.getElementById("aboutdesign").innerHTML = "In this simulation, the design of the rocket will only change the mass of the rocket. If the rocket weighs less, then the rocket will fly faster. If the rocket has more mass, it will not fly as fast.";
	document.getElementById("apotitle").innerHTML = "Apollo (10 million Newtons)";
	document.getElementById("aboutapo").innerHTML = "The Apollo program was designed to land humans on the Moon and bring them safely back to Earth. Six of the missions (Apollos 11, 12, 14, 15, 16, and 17) achieved this goal. Apollos 7 and 9 were Earth orbiting missions to test the Command and Lunar Modules, and did not return lunar data. Since these rockets were smaller and more compact, they did not weigh as much as many rockets do now. For this simulation, the weight of the 'Apollo' option is 10 million Newtons.";
	document.getElementById("orititle").innerHTML = "Orion (20 million Newtons)";
	document.getElementById("aboutori").innerHTML = "Unlike the Apollo program, Orion is just one rocket. NASA's Orion spacecraft is built to take humans farther than they've ever gone before. Orion will serve as the exploration vehicle that will carry the crew to space, provide emergency abort capability, sustain the crew during the space travel, and provide safe re-entry from deep space return velocities. Orion will launch on NASA's new heavy-lift rocket, the Space Launch System. For this simulation, the weight of the 'Orion' option is 20 million Newtons.";
	document.getElementById("faltitle").innerHTML = "Falcon (30 million Newtons)";
	document.getElementById("aboutfal").innerHTML = "The Falcon rockets developed by SpaceX have launched dozens of rockets in both their 'Falcon 9' and 'Falcon Heavy' series. According to Elon Musk (CEO of SpaceX), almost every piece of the Falcon should be reused over 100 times. For this simulation, the weight of the 'Falcon' option is 30 million Newtons, since they are some of the strongest and heaviest rockets out there.";
}
function aboutother() {
	hideshow("other");
	document.getElementById("tttitle").innerHTML = "What is Thrust Time?";
	document.getElementById("abouttt").innerHTML = "A rocket's thrust time is the amount of time, in seconds, the rocket takes to start accelerating upwards. This value has been scaled down for the actual thrust time of the animation. For example, selecting the '120' option would mean waiting exactly 2 minutes (120 seconds) for the rocket to launch. However, the simulation's thrust time for this option would only last 4 seconds.";
	document.getElementById("thrusttitle").innerHTML = "What is Thrust Force?";
	document.getElementById("aboutthrust").innerHTML = "Thrust is the force which moves the rocket through the air, and through space. Thrust is generated by the propulsion system of the rocket through the application of Newton's third law of motion; For every action there is an equal and opposite re-action. In the propulsion system, an engine does work on a gas or liquid, called a working fluid, and accelerates the working fluid through the propulsion system. The re-action to the acceleration of the working fluid produces the thrust force on the engine. The working fluid is expelled from the engine in one direction and the thrust force is applied to the engine in the opposite direction. For this simulation, the thrust force is a relatively larger value which the user can choose from: between 50 and 75 million Newtons.";
	document.getElementById("dragtitle").innerHTML = "What is Drag Force?";
	document.getElementById("aboutdrag").innerHTML = "Drag is the force directly opposite from the thrust force. Drag depends on the density of the air, the square of the velocity, the air's viscosity and compressibility, the size and shape of the body, and the body's inclination to the flow. In general, the dependence on body shape, inclination, air viscosity, and compressibility is very complex. For this reason, the drag force has been simplified to the user's choice of a value between 5 and 15 million Newtons.";
	//Links used to create definitions:
	//Drag: https://www.grc.nasa.gov/WWW/K-12/rocket/drageq.html#:~:text=The%20drag%20equation%20states%20that,times%20the%20reference%20area%20A.&text=The%20drag%20depends%20directly%20on%20the%20size%20of%20the%20body.
	//Thrust: https://www.grc.nasa.gov/WWW/K-12/rocket/rktth1.html#:~:text=Thrust%20is%20the%20force%20which,the%20air%2C%20and%20through%20space.&text=The%20re%2Daction%20to%20the,engine%20in%20the%20opposite%20direction.
	//Liquid Hydrogen: https://www.nasa.gov/topics/technology/hydrogen/hydrogen_fuel_of_choice.html
	//Hydrazine: https://edu.rsc.org/magnificent-molecules/hydrazine/2000023.article
	//Alcohol: https://www.funkidslive.com/learn/deep-space-high/marvellous-missions/rocket-fuels/
	//Propellants: http://www.braeunig.us/space/propel.htm
}
function hideshow(page) {
	if (page === "fuel") {
		$("#fuelsection").show();
		$("#enginesection").hide();
		$("#designsection").hide();
		$("#othersection").hide();
		$("#bodysection").hide();
	} else if (page === "engine") {
		$("#enginesection").show();
		$("#fuelsection").hide();
		$("#designsection").hide();
		$("#othersection").hide();
		$("#bodysection").hide();
	} else if (page === "bodysection") {
		$("#bodysection").show();
		$("#fuelsection").hide();
		$("#enginesection").hide();
		$("#designsection").hide();
		$("#othersection").hide();
	} else if (page === "design") {
		$("#designsection").show();
		$("#fuelsection").hide();
		$("#enginesection").hide();
		$("#bodysection").hide();
		$("#othersection").hide();
	} else if (page === "other") {
		$("#othersection").show();
		$("#fuelsection").hide();
		$("#enginesection").hide();
		$("#designsection").hide();
		$("#bodysection").hide();
	}
}