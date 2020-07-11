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
		$("#content").append('<img class="rocket launch" src="https://i.pinimg.com/originals/da/bd/0b/dabd0b9ee25c58c472343de889fdd472.jpg">');
	} else if(rocket=="ori") {
		$("#content").append('<img class="rocket launch" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShQh4KU-EJI_88u6NF4os4HnAoCc4Abajs2Q&usqp=CAU">');
	} else {
		$("#content").append('<img class="rocket launch" src="https://ideascdn.lego.com/media/generate/lego_ci/a118f882-78d5-4542-973b-237c5531cb8b/resize:800:450">')
	}
	}
	//$("#content").