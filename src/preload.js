import { contextBridge, ipcRenderer } from 'electron'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer and remote without exposing the entire objects
const validChannels = ['fixture-api', 'static-api'];
contextBridge.exposeInMainWorld('electron', {
  invoke: (channel, ...args) => {
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, args)
    }
  },
});
