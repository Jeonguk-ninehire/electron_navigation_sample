// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView, ipcMain, webContents } = require('electron')
const path = require('node:path')

const createWindow = () => {
  // Create the browser window.
  

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(async () => {
    console.log('Start Electron');
    const win = new BrowserWindow({ width: 800, height: 600})
    
    const naviView = new BrowserView({webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
    }})
    win.addBrowserView(naviView)
    naviView.setBounds({ x: 0, y: 0, width: 800, height: 50})
    naviView.setAutoResize({width: true, height: false});
    naviView.webContents.loadFile('index.html')

    const view = new BrowserView()
    win.addBrowserView(view)
    const contentBounds = win.getContentBounds();
    view.setBounds({ x: 0, y: 50, width: contentBounds.width, height: contentBounds.height - 50 });
    view.setAutoResize({ width: true, height: true });
    

    naviView.webContents.openDevTools();
    naviView.webContents.on('did-finish-load', () => {
        console.log('did-fininsh-load');
    });

    view.webContents.on('did-navigate-in-page', () => {
        console.log('did-navigate-in-page');
        naviView.webContents.send("canNav", view.webContents.canGoBack(), view.webContents.canGoForward());
    });

    view.webContents.loadURL('https://stage-app.ninehire.com');

    ipcMain.on("goBack", (e, webContentsId) => {
        console.log('goBack');
        view.webContents.goBack();
    });

    ipcMain.on("goForward", (e, webContentsId) => {
        console.log('goForward');
        view.webContents.goForward(); 
    });
    
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', () => {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.