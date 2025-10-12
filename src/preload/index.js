import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  addUser: (user) => ipcRenderer.invoke('user:add', user),
  getAllUsers: () => ipcRenderer.invoke('user:getAll'),
  updateUser: (user) => ipcRenderer.invoke('user:update', user),
  deleteUser: (user_id) => ipcRenderer.invoke('user:delete', user_id),
  loginUser: (credentials) => ipcRenderer.invoke('user:login', credentials),
  getAllResidents: () => ipcRenderer.invoke('resident:getAllRecords'),
  updateResidentRemarks: (residents) => ipcRenderer.invoke('resident:updateRemarks', residents),
  addResident: (residents) => ipcRenderer.invoke('resident:add', residents),
  searchHouseholdHead: (search) => ipcRenderer.invoke('household:search', search),
  getAllHouseholds: () => ipcRenderer.invoke('household:getAll'),
  getHouseholdById: (householdId) => ipcRenderer.invoke('household:getById', householdId),
  searchFamilyHead: (search) => ipcRenderer.invoke('family:search', search),
  addCertification: (certification) => ipcRenderer.invoke('certification:add', certification),
  getAllCerts: (type) => ipcRenderer.invoke('certification:getAll', type),
  printCertificate: (certification) => ipcRenderer.invoke('certificate:print', certification),
  printToPDF: (options) => ipcRenderer.invoke('print-to-pdf', options),
  printElementToPDF: (payload) => ipcRenderer.invoke('print-element-to-pdf', payload),

}

// Use `contextBridge` APIs to expose Electron APIs t
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
