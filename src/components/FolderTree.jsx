import React, { useState } from "react";

const FolderTree = ({ folders, onFolderClick }) => {
  const [expandedFolders, setExpandedFolders] = useState([]);

  // Handle folder expand/collapse
  const handleToggle = (folderId) => {
    if (expandedFolders.includes(folderId)) {
      setExpandedFolders(expandedFolders.filter((id) => id !== folderId));
    } else {
      setExpandedFolders([...expandedFolders, folderId]);
      onFolderClick(folderId); // Fetch subfolders when expanded
    }
  };

  return (
    <ul className="px-4">
      {folders.map((folder) => (
        <li key={folder.id} className="py-2">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleToggle(folder.id)}
          >
            <span className="mr-2">
              {expandedFolders.includes(folder.id) ? "-" : "+"}
            </span>
            {folder.name}
          </div>
          {expandedFolders.includes(folder.id) && folder.subFolders && (
            <ul className="pl-6">
              {folder.subFolders.map((subFolder) => (
                <li key={subFolder.id} className="py-1 cursor-pointer">
                  {subFolder.name}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FolderTree;
