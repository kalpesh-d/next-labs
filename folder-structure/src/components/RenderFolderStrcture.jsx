import Folder from "./Folder";
import File from "./File";
import { File as FileIcon, Folder as FolderIcon } from 'lucide-react'

const renderFolderStrcture = ({
  data,
  handleDeleteFile,
  handleAddFile,
  handleAddFolder,
  handleDeleteFolder,
  handleRename,
  currentPath = '',
  isRoot = true
}) => {
  if (!data || typeof data !== 'object') return null;

  return (
    Object.keys(data)
      .filter(key => key !== '__files')
      .map(key => {
        const newPath = currentPath ? `${currentPath}/${key}` : key;

        if (data[key] === null) {
          return <File
            key={key}
            name={key}
            onDelete={() => handleDeleteFile(currentPath, key)}
            onRename={() => handleRename(newPath, false)}
            Icon={FileIcon}
            isRoot={isRoot}
          />
        }

        if (Array.isArray(data[key])) {
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
              {data[key].map(file => (
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

        if (typeof data[key] === 'object') {
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
              {data[key].__files && data[key].__files.map(file => (
                <File
                  key={file}
                  name={file}
                  onDelete={() => handleDeleteFile(newPath, file)}
                  onRename={() => handleRename(`${newPath}/${file}`, false)}
                  Icon={FileIcon}
                  isRoot={false}
                />
              ))}
              {renderFolderStrcture({
                data: Object.fromEntries(
                  Object.entries(data[key]).filter(([k]) => k !== '__files')
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

        return null;
      })
  )
};

export default renderFolderStrcture;
