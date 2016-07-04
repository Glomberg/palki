$(document).ready(function(){
	$("a.scroll").on("click", function(e){
		e.preventDefault();
		href = $(this).attr("href");
		if($(href).length != 0) {
			$("body,html").stop().animate({ scrollTop: $(href).offset().top - 10}, 1000);
		}
	});
	//ползунок
	$("#slider").slider({
		value:175,
		min: 140,
		max: 210,
		step: 1,
		animate: "slow",
		slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.value );
		}
	});
	$( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ) );
});