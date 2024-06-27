const path = require('path');
const { app, BrowserWindow } = require('electron');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin'; 

function createMainwindow () {
    const mainWindow = new BrowserWindow({
        title: 'Gapp',
        width: 500,
        height: 600
    });


    // Open devtools if in dev environment
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.on('ready', () => {
    createMainwindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainwindow()
        }
    })
});

app.on('window-all-closed', ()=> {
    if (!isMac) {
        app.quit()
    }
})