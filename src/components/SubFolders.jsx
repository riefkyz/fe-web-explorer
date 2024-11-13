import React, { useState } from "react";

const SubFolders = ({ subFolders }) => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track the folder id that was clicked
  const [subFoldersData, setSubFoldersData] = useState({}); // Store subfolder data for each folder
  const [loading, setLoading] = useState(false); // Loading state for API call

  // Function to toggle the dropdown and fetch subfolders from the API
  const handleDropdownClick = (folderId) => {
    if (openDropdown === folderId) {
      // If the same folder is clicked again, close the dropdown
      setOpenDropdown(null);
    } else {
      // Open the dropdown and fetch subfolders from API
      setOpenDropdown(folderId);
      setLoading(true);

      // Fetch subfolders for the clicked folder
      fetch(`http://localhost:3000/api/folders/${folderId}`)
        .then((res) => res.json())
        .then((data) => {
          setSubFoldersData((prevData) => ({
            ...prevData,
            [folderId]: data, // Store subfolders under the clicked folder ID
          }));
          setLoading(false); // Stop loading once the data is fetched
        });
    }
  };

  if (subFolders.length === 0) {
    return <p className="text-gray-500 italic">No subfolders available.</p>;
  }

  return (
    <div>
      <ul className="space-y-2 mt-2">
        {subFolders.map((subFolder) => (
          <li key={subFolder.id} className="text-gray-800">
            <div>
              <span
                onClick={() => handleDropdownClick(subFolder.id)}
                className="block bg-gray-50 px-4 py-2 rounded-lg hover:bg-blue-100 cursor-pointer"
              >
                {subFolder.name}
              </span>

              {/* Show subfolders if the dropdown is open for this folder */}
              {openDropdown === subFolder.id && (
                <div className="ml-4 mt-2">
                  {loading ? (
                    <p className="text-gray-500 italic">Loading subfolders...</p>
                  ) : (
                    <ul className="space-y-2">
                      {subFoldersData[subFolder.id]?.map((subFolderItem) => (
                        <li key={subFolderItem.id} className="text-gray-800">
                          <span className="block bg-gray-50 px-4 py-2 rounded-lg hover:bg-blue-100">
                            {subFolderItem.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubFolders;
