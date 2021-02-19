const {app, BrowserWindow} = require('electron');
const serve = require('electron-serve');

const loadURL = serve({directory: 'build'});

let mainWindow;

(async () => {
	await app.whenReady();

	mainWindow = new BrowserWindow();

	await loadURL(mainWindow);

	// The above is equivalent to this:
	// await mainWindow.loadURL('app://-');
	// The `-` is just the required hostname
})();

// const electron = require("electron");
// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;
// const path = require("path");
// // const isDev = require("electron-is-dev");
// let mainWindow;
// function createWindow() {
// mainWindow = new BrowserWindow({ width: 900, height: 680 });
// // mainWindow.loadURL(
// // isDev
// // ? "http://localhost:3000"
// // : `file://${path.join(__dirname, "../build/index.html")}`
// // );

// mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
// mainWindow.on("closed", () => (mainWindow = null));
// }
// app.on("ready", createWindow);
// app.on("window-all-closed", () => {
// if (process.platform !== "darwin") {
// app.quit();
// }
// });
// app.on("activate", () => {
// if (mainWindow === null) {
// createWindow();
// }
// });