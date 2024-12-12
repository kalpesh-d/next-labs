import example from "../example.json"
import RenderFolderStrcture from "./components/renderFolderStrcture"
import { useFileSystem } from "./hooks/useFileSystem"

function App() {
  const {
    data,
    handleAddFile,
    handleAddFolder,
    handleDeleteFile,
    handleDeleteFolder,
    handleRename
  } = useFileSystem(example)

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Folder Structure</h1>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleAddFile()}
          className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:border-blue-600 hover:text-blue-600 text-xs"
        >
          Add Root File
        </button>
        <button
          onClick={() => handleAddFolder()}
          className="px-3 py-1 border border-green-500 text-green-500 rounded hover:border-green-600 hover:text-green-600 text-xs"
        >
          Add Root Folder
        </button>
      </div>
      <RenderFolderStrcture
        data={data}
        handleDeleteFile={handleDeleteFile}
        handleAddFile={handleAddFile}
        handleAddFolder={handleAddFolder}
        handleDeleteFolder={handleDeleteFolder}
        handleRename={handleRename}
      />
    </div>
  )
}

export default App