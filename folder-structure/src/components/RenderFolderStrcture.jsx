import React from 'react'
import { File as FileIcon, Folder as FolderIcon } from 'lucide-react'
import Folder from './Folder'
import File from './File'

const renderFolderStructure = ({
  data,
  handleDeleteFile,
  handleAddFile,
  handleAddFolder,
  handleDeleteFolder,
  handleRename,
  currentPath = '',
  isRoot = true
}) => {
  if (!data) return null

  return Object.entries(data).map(([key, value]) => {
    const newPath = currentPath ? `${currentPath}/${key}` : key

    // Null value represents a single file
    if (value === null) {
      return (
        <File
          key={key}
          name={key}
          onDelete={() => handleDeleteFile('', key)}
          onRename={() => handleRename(key, false)}
          Icon={FileIcon}
          isRoot={isRoot}
        />
      )
    }

    // Array represents a folder with files or root-level files
    if (Array.isArray(value)) {
      return (
        <Folder
          key={key}
          name={key}
          onAddFile={() => handleAddFile(newPath)}
          onAddFolder={() => handleAddFolder(newPath)}
          onDelete={() => handleDeleteFolder(newPath)}
          onRename={() => handleRename(newPath, true)}
          Icon={FolderIcon}
          isRoot={isRoot}
        >
          {value.map(file => (
            <File
              key={file}
              name={file}
              onDelete={() => handleDeleteFile(newPath, file)}
              onRename={() => handleRename(`${newPath}/${file}`, false)}
              Icon={FileIcon}
              isRoot={false}
            />
          ))}
        </Folder>
      )
    }

    // Object represents a nested folder
    if (typeof value === 'object') {
      return (
        <Folder
          key={key}
          name={key}
          onAddFile={() => handleAddFile(newPath)}
          onAddFolder={() => handleAddFolder(newPath)}
          onDelete={() => handleDeleteFolder(newPath)}
          onRename={() => handleRename(newPath, true)}
          Icon={FolderIcon}
          isRoot={isRoot}
        >
          {value.__files && value.__files.map(file => (
            <File
              key={file}
              name={file}
              onDelete={() => handleDeleteFile(newPath, file)}
              onRename={() => handleRename(`${newPath}/${file}`, false)}
              Icon={FileIcon}
              isRoot={false}
            />
          ))}
          {renderFolderStructure({
            data: Object.fromEntries(
              Object.entries(value).filter(([k]) => k !== '__files')
            ),
            handleDeleteFile,
            handleAddFile,
            handleAddFolder,
            handleDeleteFolder,
            handleRename,
            currentPath: newPath,
            isRoot: false
          })}
        </Folder>
      )
    }

    return null
  })
}

export default renderFolderStructure