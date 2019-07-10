// Modules to control application life and create native browser window
const {app, BrowserWindow, shell } = require('electron')
const path = require('path')
const fs = require('fs')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 746,
    height: 665,
    //maxWidth: 746,
    //maxHeight: 665,
    minWidth: 746,
    minHeight: 665,
    icon: path.join(__dirname + '/src/calendar.png'),
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const ipc = require('electron').ipcMain;

ipc.on('save_event', (event, args) => {

  var events = require('./src/scripts/events.json');
  events.push(args);
  fs.writeFileSync('./src/scripts/events.json', JSON.stringify(events, null, "\t"));
  event.sender.send('saved_event',null);

});

ipc.on('update_event', (event, args) => {
  var events = require('./src/scripts/events.json');

  if(events.find(x => x.id === args.id)){
    const index = events.findIndex(x => x.id === args.id);
    events.splice(index, 1);
    events.push(args);
    fs.writeFileSync('./src/scripts/events.json', JSON.stringify(events,null,"\t"));
    event.sender.send('updated_event',null);
  }else{

  }

});

ipc.on('close_app', (event, args) => {
  app.quit();
});

ipc.on('minimize_app', (event, args) => {
  mainWindow.minimize();
});

ipc.on('goto_github', (event, args) => {
  shell.openExternal('https://github.com/konuralpt/daily-event');
});