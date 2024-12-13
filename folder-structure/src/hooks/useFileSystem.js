import { useState } from 'react'
import { findNestedPath, createPath, confirmAction, promptName } from '../utils/fileSystem'

export const useFileSystem = (initialData) => {
  const [data, setData] = useState(initialData)

  const handleAddFile = (folderPath = '') => {
    const fileName = promptName()
    if (!fileName) return

    setData(prev => {
      const newData = { ...prev }
      
      if (!folderPath) {
        // Root level file
        newData[fileName] = null
        return newData
      }

      const parts = folderPath.split('/')
      let current = newData
      
      // Traverse to the parent folder
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]]
      }

      const targetFolder = current[parts[parts.length - 1]]
      
      if (Array.isArray(targetFolder)) {
        targetFolder.push(fileName)
      } else if (typeof targetFolder === 'object') {
        if (!targetFolder.__files) {
          targetFolder.__files = [fileName]
        } else {
          targetFolder.__files.push(fileName)
        }
      }

      return newData
    })
  }

  const handleAddFolder = (folderPath = '') => {
    const folderName = promptName()
    if (!folderName) return

    setData(prev => {
      const newData = { ...prev }
      
      if (!folderPath) {
        // Root level folder
        newData[folderName] = []
        return newData
      }

      const parts = folderPath.split('/')
      let current = newData
      
      // Traverse to the parent folder
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]]
      }

      const targetFolder = current[parts[parts.length - 1]]
      
      if (Array.isArray(targetFolder)) {
        // If it's an array, convert to object with __files
        current[parts[parts.length - 1]] = {
          [folderName]: [],
          __files: targetFolder
        }
      } else if (typeof targetFolder === 'object') {
        // If it's an object (nested folder)
        targetFolder[folderName] = []
      }

      return newData
    })
  }

  const handleDeleteFile = (folderPath, fileName) => {
    if (!confirmAction('Are you sure you want to delete this file?')) return

    setData(prev => {
      const newData = { ...prev }
      
      if (!folderPath) {
        // Root level file
        delete newData[fileName]
        return newData
      }

      const parts = folderPath.split('/')
      let current = newData
      
      // Traverse to the parent folder
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]]
      }

      const targetFolder = current[parts[parts.length - 1]]
      
      if (Array.isArray(targetFolder)) {
        return {
          ...newData,
          [folderPath]: targetFolder.filter(file => file !== fileName)
        }
      } else if (typeof targetFolder === 'object') {
        if (targetFolder.__files) {
          targetFolder.__files = targetFolder.__files.filter(file => file !== fileName)
        }
      }

      return newData
    })
  }

  const handleDeleteFolder = (path) => {
    if (!confirmAction('Are you sure you want to delete this folder and its contents?')) return

    setData(prev => {
      const newData = { ...prev }
      
      const parts = path.split('/')
      let current = newData
      
      // Traverse to the parent folder
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]]
      }

      // Delete the folder
      delete current[parts[parts.length - 1]]

      return newData
    })
  }

  const handleRename = (path, isFolder) => {
    const parts = path.split('/')
    const oldName = parts[parts.length - 1]
    const newName = promptName(oldName)
    if (!newName) return

    setData(prev => {
      const newData = { ...prev }
      
      if (parts.length === 1) {
        // Root level rename
        const value = newData[oldName]
        delete newData[oldName]
        newData[newName] = value
        return newData
      }

      let current = newData
      
      // Traverse to the parent folder
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]]
      }

      const targetFolder = current[parts[parts.length - 1]]
      
      if (isFolder) {
        // Renaming a folder
        const folderContent = targetFolder
        delete current[parts[parts.length - 1]]
        current[newName] = folderContent
      } else {
        // Renaming a file
        if (Array.isArray(current)) {
          // Root-level or simple array
          const index = current.indexOf(oldName)
          if (index !== -1) {
            current[index] = newName
          }
        } else if (typeof current === 'object') {
          // Nested folder with __files
          if (current.__files) {
            const fileIndex = current.__files.indexOf(oldName)
            if (fileIndex !== -1) {
              current.__files[fileIndex] = newName
            }
          }
        }
      }

      return newData
    })
  }

  return {
    data,
    handleAddFile,
    handleAddFolder,
    handleDeleteFile,
    handleDeleteFolder,
    handleRename
  }
}