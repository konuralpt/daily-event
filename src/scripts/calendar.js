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
			$('#myModal').modal('show');
			$('.modal-title').html(info.dateStr);
		  }
	  });
	
	  calendar.render();

}