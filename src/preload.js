import { contextBridge, ipcRenderer } from "electron"

// Expose protected methods that allow the renderer process to use
// the ipcRenderer and remote without exposing the entire objects
const validChannels = ["static-api", "fixture-api", "element-summary-api", "minimize"];
contextBridge.exposeInMainWorld("electron", {
  invoke(channel, ...args) {
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, args)
    }
  },
});
