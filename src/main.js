$(document).ready(function() {
	var background_colors = ['#313A87','#F3B900','#F5534F','#1C213F'];
	$('#start_time').timepicker({
		minuteStep: 1,
		showMeridian: false,
		});
	$('#end_time').timepicker({
		minuteStep: 1,
		showMeridian: false,
	});

	$('#save_event').click(function(){

		var obj= {
			title: $('#title').val(),
			start_time: $('#start_time').val(),
			end_time: $('#end_time').val(),
			background_color: background_colors[Math.floor(Math.random() * Math.floor(2))],
			all_day: false,
		};
		alert(JSON.stringify(obj));
	});

	
});