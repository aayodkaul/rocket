$(document).ready(function () {
	$( "input" ).on( "click", function( event ) {
		console.log("here");
		console.log($('input[name=group1]:checked').attr('id'));
	});
});
function startrocket() {
	$(document).empty();
	$(document).append('<img style="animation.css" class="rocket launch" src="https://cdn4.iconfinder.com/data/icons/whsr-january-flaticon-set/512/rocket.png">')
}