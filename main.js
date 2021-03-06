require('electron-reload')(__dirname)
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')
const ipc = require('electron').ipcMain
const sqlite3 = require('sqlite3').verbose();

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 1200, height: 800, show: true, icon: path.join(__dirname, 'assets/icons/png/64x64.png') })
  
    // and load the index.html of the app.
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'src/index.html'),
      protocol: 'file:',
      slashes: true    
    }))
  

    // Open the DevTools.
    win.webContents.openDevTools()
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', function(){ 
    createWindow()
    const template = [{}]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(null)

  }  
)

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
  
    // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.

  ipc.on('update-notify-value', function (event, arg) {
    win.webContents.send('targetPriceVal', arg)
  })

  ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})

// sqlite tryouts
ipc.on('itsloaded', function() {

let db = new sqlite3.Database('./userdata/navaadb.naa');
 
let sql = `SELECT DISTINCT chapter FROM story
         ORDER BY chapterorder`;

         db.all(sql, [], (err, rows) => {
          if (err) {
            throw err;
          }
          rows.forEach((row) => {
            console.log(row.name);
          });
        });         


result.then(function(rows){
  mainWindow.webContents.send("resultSent", rows);
})
// close the database connection
db.close()
})
 
 

