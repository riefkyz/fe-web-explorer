import React, { useState, useEffect } from "react";
import FolderTree from "./components/FolderTree";
import SubFolders from "./components/SubFolders"; // Import SubFolders component

const App = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null); // Track selected folder
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    // Fetch root folders
    fetch("http://localhost:3000/api/folders")
      .then((res) => res.json())
      .then((data) => setFolders(data));
  }, []);

  const handleFolderClick = (folderId) => {
    if (selectedFolder && selectedFolder.id === folderId) {
      // If the folder is already selected, collapse it
      setSelectedFolder(null);
      return;
    }

    // If a new folder is clicked, start loading
    setLoading(true);

    // Fetch subfolders for the clicked folder
    fetch(`http://localhost:3000/api/folders/${folderId}`)
      .then((res) => res.json())
      .then((subFolders) => {
        // Find the folder object by ID
        const folder = folders.find(f => f.id === folderId);
        
        // Update the selected folder with the full folder object and subfolders
        setSelectedFolder({
          ...folder, // Spread the folder object to include its details (e.g. name)
          subFolders: subFolders,
        });
        setLoading(false); // Stop loading when data is fetched
      });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 bg-white shadow-lg overflow-auto">
        <h2 className="text-xl font-semibold text-gray-800 px-4 py-2 border-b">
          Folder Structure
        </h2>
        <FolderTree folders={folders} onFolderClick={handleFolderClick} />
      </div>

      <div className="w-2/3 bg-white shadow-lg overflow-auto p-4">
        {loading ? (
          <p>Loading subfolders...</p>
        ) : selectedFolder ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Subfolders of {selectedFolder.name}
            </h3>
            <SubFolders subFolders={selectedFolder.subFolders} />
          </div>
        ) : (
          <p className="text-gray-500 italic">Select a folder to see its subfolders.</p>
        )}
      </div>
    </div>
  );
};

export default App;
