const fs = require('fs');
const ipc = require('electron').ipcRenderer;
const background_colors = ['#313A87','#F3B900','#F5534F','#1C213F',',#F2C9E0','#731F6D','#300A40','#2FBDBD','#90DCD0','#FF5500'];

const save_button = document.querySelector('#save_event');
const update_button = document.querySelector('#update_event');
const close_button = document.querySelector('#close_app_button');
const minimize_button = document.querySelector('#minimize_app_button');
const github_icon = document.querySelector('#github_icon');

save_button.addEventListener('click', function(){
	var start_end = sliceTime(
		document.querySelector('.modal-title').innerHTML,
		document.querySelector('#start_time').value,
		document.querySelector('#end_time').value);
	
	var obj= {
		id: Math.round(new Date().getTime() + (Math.random() * 100)).toString(),
		title: document.querySelector('#title').value,
		start: start_end.start,
		end: start_end.end,
		backgroundColor: background_colors[Math.floor(Math.random() * Math.floor(10))],
		borderColor:'white',
		allDay: document.querySelector('#all_day:checked') != null,
	};

	console.log(obj);
	ipc.send('save_event',obj);
	resetModal();
})

update_button.addEventListener('click', function(){

	var start_end = sliceTime(
		document.querySelector('.modal-title').innerHTML,
		document.querySelector('#start_time').value,
		document.querySelector('#end_time').value);

	var obj= {
		id: document.querySelector('#id').value,
		title: document.querySelector('#title').value,
		start: start_end.start,
		end: start_end.end,
		backgroundColor: document.querySelector('#backgroundColor').value,
		borderColor:'white',
		allDay: document.querySelector('#all_day:checked') != null,
	};
	ipc.send('update_event',obj);
	resetModal();
})

ipc.on('saved_event', (event, args) => {
	console.log('saved');
 	location.reload();
});

ipc.on('updated_event', (event, args) => {
	console.log('updated');
 	location.reload();
});

close_button.addEventListener('click', function(){
	ipc.send('close_app',null);
});

minimize_button.addEventListener('click', function(){
	ipc.send('minimize_app',null);
});

github_icon.addEventListener('click', function(){
	ipc.send('goto_github',null);
})


function resetModal(){
	document.querySelector('#title').value = '';
	document.querySelector('#start_time').value = new Date().getHours() + ":" + new Date().getMinutes();
	document.querySelector('#end_time').value = new Date().getHours() + ":" + new Date().getMinutes();
	document.querySelector('#all_day').checked = false; 
}

function sliceTime(date,start,end){
	var obj = {
		start: null,
		end: null
	}

	if(start)
		obj.start = date + 'T' + (("0" + start.split(':')[0]).slice(-2)) + ":" + (("0" + start.split(':')[1]).slice(-2))
	if(end)
		obj.end = date + 'T' + (("0" + end.split(':')[0]).slice(-2)) + ":" + (("0" + end.split(':')[1]).slice(-2))

	return obj
}