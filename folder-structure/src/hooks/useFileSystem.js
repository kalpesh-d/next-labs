import { useState } from 'react'
import { traversePath, confirmAction, promptName } from '../utils/fileSystem'

export const useFileSystem = (initialData) => {
  const [data, setData] = useState(initialData)

  const handleAddFile = (folderPath = '') => {
    const fileName = promptName()
    if (!fileName) return

    setData(prev => traversePath(prev, folderPath, (current, lastPart) => {
      if (!lastPart) {
        current[fileName] = null
        return current
      }

      if (Array.isArray(current[lastPart])) {
        current[lastPart].push(fileName)
      } else if (current[lastPart].__files) {
        current[lastPart].__files.push(fileName)
      } else {
        current[lastPart] = {
          ...current[lastPart],
          __files: [fileName]
        }
      }
      return current
    }))
  }

  const handleAddFolder = (folderPath = '') => {
    const folderName = promptName()
    if (!folderName) return

    setData(prev => traversePath(prev, folderPath, (current, lastPart) => {
      if (!lastPart) {
        current[folderName] = []
        return current
      }

      if (Array.isArray(current[lastPart])) {
        const existingFiles = current[lastPart]
        current[lastPart] = {
          [folderName]: [],
          __files: existingFiles
        }
      } else if (current[lastPart].__files) {
        current[lastPart][folderName] = []
      } else {
        current[lastPart] = {
          ...current[lastPart],
          [folderName]: []
        }
      }
      return current
    }))
  }

  const handleDeleteFile = (folderPath, fileName) => {
    if (!confirmAction('Are you sure you want to delete this file?')) return

    setData(prev => traversePath(prev, folderPath, (current, lastPart) => {
      if (!lastPart) {
        delete current[fileName]
        return current
      }

      if (Array.isArray(current[lastPart])) {
        current[lastPart] = current[lastPart].filter(file => file !== fileName)
      } else if (current[lastPart].__files) {
        current[lastPart].__files = current[lastPart].__files.filter(file => file !== fileName)
      }
      return current
    }))
  }

  const handleDeleteFolder = (path) => {
    if (!confirmAction('Are you sure you want to delete this folder and its contents?')) return

    setData(prev => traversePath(prev, path, (current, lastPart, newData) => {
      if (!lastPart) {
        delete current[path]
        return current
      }

      const parentFolder = current[Object.keys(current)[0]]
      if (parentFolder && parentFolder.__files) {
        delete current[lastPart]
        // If folder is empty after deletion, convert back to array
        if (Object.keys(current).length === 1 && current.__files) {
          const parentPath = path.split('/')[0]
          return {
            ...newData,
            [parentPath]: current.__files
          }
        }
      } else {
        delete current[lastPart]
      }
      return newData
    }))
  }

  const handleRename = (path, isFolder) => {
    const parts = path.split('/')
    const oldName = parts[parts.length - 1]
    const newName = promptName(oldName)
    if (!newName) return

    setData(prev => traversePath(prev, path, (current, lastPart, newData) => {
      if (!lastPart) {
        const value = current[oldName]
        delete current[oldName]
        current[newName] = value
        return current
      }

      const value = current[oldName]
      delete current[oldName]
      current[newName] = value
      return newData
    }))
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