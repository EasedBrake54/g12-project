// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// function createWindow () {
//     const mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             preload: path.join(__dirname, 'renderer.js'),
//             nodeIntegration: true,
//             contextIsolation: false
//         }
//     });

//     mainWindow.loadFile('index.html');
// }

// app.whenReady().then(() => {
//     createWindow();

//     app.on('activate', () => {
//         if (BrowserWindow.getAllWindows().length === 0) {
//             createWindow();
//         }
//     });
// });

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

// electron based web approach code