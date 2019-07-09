const fs = require('fs');
const ipc = require('electron').ipcRenderer;
const background_colors = ['#313A87','#F3B900','#F5534F','#1C213F'];

const save_button = document.querySelector('#save_event');

save_button.addEventListener('click', function(){
	var date = document.querySelector('.modal-title').innerHTML;
	var obj= {
		title: document.querySelector('#title').value,
		start: date + 'T' + document.querySelector('#start_time').value,
		end: date + 'T' + document.querySelector('#end_time').value,
		backgroundColor: background_colors[Math.floor(Math.random() * Math.floor(4))],
		borderColor:'white',
		all_day: document.querySelector('#all_day:checked') != null,
	};
	console.log(obj);
	ipc.send('save_event',obj)
})

ipc.on('asynReply', (event, args) => {
 replyDiv.innerHTML = args;
});
