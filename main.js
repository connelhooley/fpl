const { app, ipcMain, BrowserWindow } = require("electron");
const fetch = require("electron-fetch").default;

const createWindow = () => {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  window.loadFile("app/index.html");
  // window.removeMenu();
  window.maximize();
  window.show();
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("fixture-api", async () => {
  const res = await fetch("https://fantasy.premierleague.com/api/fixtures/");
  return await res.json();
});

ipcMain.handle("static-api", async () => {
  const res = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/");
  return await res.json();
});