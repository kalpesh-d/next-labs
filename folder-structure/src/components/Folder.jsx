import { ChevronDown, ChevronUp, Trash, Plus, FolderPlus, Pencil } from "lucide-react";
import { useState } from "react";

const Folder = ({ name, children, onAddFile, onAddFolder, onDelete, onRename, Icon, isRoot }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className={`${!isRoot ? 'pl-4' : ''}`}>
      <div
        className="flex gap-2 items-center py-1 hover:bg-gray-100 rounded cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-2 items-center flex-1">
          <Icon className="w-4 h-4" />
          <span className="text-sm">{name}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>

        <div className={`flex gap-1 items-center ${!isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
          <button
            className="p-1 hover:bg-gray-200 rounded text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              onAddFile();
            }}
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            className="p-1 hover:bg-gray-200 rounded text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              onAddFolder();
            }}
          >
            <FolderPlus className="w-4 h-4" />
          </button>
          <button
            className="p-1 hover:bg-blue-100 rounded text-blue-500"
            onClick={(e) => {
              e.stopPropagation();
              onRename();
            }}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            className="p-1 hover:bg-red-100 rounded text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-1">
          {children}
        </div>
      )}
    </div>
  )
};

export default Folder;