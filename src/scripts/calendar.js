var eventss = [];

document.addEventListener('DOMContentLoaded', function() {
    readTextFile("scripts/events.json", function(text){
	  var data = JSON.parse(text);
	  Object.keys(data).forEach(function(item){
		  eventss.push(data[item]);
	  });
	  renderCalendar();
  });


});

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
};

function renderCalendar(){
	var calendarEl = document.getElementById('calendar');

	var calendar = new FullCalendar.Calendar(calendarEl, {
		plugins: [ 'dayGrid','interaction','bootstrap' ],
		themeSystem: 'bootstrap',
		header: {
			left:   'title',
			center: '',
			right:  'today prev,next'
		},
		displayEventEnd: true,
		events: eventss,
		eventTimeFormat: {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		},
		dateClick: function(info) {
			$('#update_event').css('display', 'none');
			$('#save_event').css('display', 'block');
			resetModal();
			$('#myModal').modal('show');
			$('.modal-title').html(info.dateStr);
		},
		eventClick: function(info){
			$('#save_event').css('display', 'none');
			$('#update_event').css('display', 'block');
			var obj = {
				id: info.event.id,
				title: info.event.title,
				start: info.event.start,
				end: info.event.end,
				backgroundColor: info.event.backgroundColor,
				borderColor: info.event.borderColor,
				allDay: info.event.allDay,
			}
			$('.modal-title').html(obj.start.getFullYear() + "-" + ("0"+(obj.start.getMonth() + 1)).slice(-2) + "-" + ("0"+obj.start.getDate()).slice(-2));
			$('#id').val(obj.id);
			$('#title').val(obj.title);
			$('#start_time').val((obj.start) ? obj.start.getHours()+':'+obj.start.getMinutes() : null);
			$('#end_time').val((obj.end) ? obj.end.getHours()+':'+ obj.end.getMinutes() : null);
			$('#backgroundColor').val(obj.backgroundColor);
			$('#borderColor').val(obj.borderColor);
			$('#all_day').prop('checked',obj.allDay);
			$('#myModal').modal('show');
		}
	  });
	
	  calendar.render();

}

function resetModal(){
	document.querySelector('#title').value = '';
	document.querySelector('#start_time').value = new Date().getHours() + ":" + new Date().getMinutes();
	document.querySelector('#end_time').value = new Date().getHours() + ":" + new Date().getMinutes();
	document.querySelector('#all_day').checked = false; 
}