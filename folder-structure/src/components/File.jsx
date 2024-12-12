import { Trash, Pencil } from "lucide-react";
import { useState } from "react";

const File = ({ name, onDelete, onRename, Icon, isRoot }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`flex items-center gap-2 py-1 hover:bg-gray-100 rounded ${!isRoot ? 'pl-4' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-2 items-center flex-1">
        <Icon className="w-4 h-4" />
        <span className="text-sm">{name}</span>
      </div>
      <div className={`flex gap-1 ${!isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
        <button
          className="p-1 hover:bg-blue-100 rounded text-blue-500"
          onClick={onRename}
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          className="p-1 hover:bg-red-100 rounded text-red-500"
          onClick={onDelete}
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
};

export default File;