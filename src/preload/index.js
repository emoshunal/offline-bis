import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  addUser: (user) => ipcRenderer.invoke('user:add', user),
  getAllUsers: () => ipcRenderer.invoke('user:getAll'),
  updateUser: (user) => ipcRenderer.invoke('user:update', user),
  deleteUser: (user_id) => ipcRenderer.invoke('user:delete', user_id),
  loginUser: (credentials) => ipcRenderer.invoke('user:login', credentials),
  getAllResidents: () => ipcRenderer.invoke('resident:getAllRecords')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
