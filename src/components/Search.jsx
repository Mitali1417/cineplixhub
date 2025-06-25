/* eslint-disable react/prop-types */

import { RotateCw } from "lucide-react";
import { X } from "lucide-react";

export default function Search({ searchTerm, setSearchTerm, isSearching }) {
  return (
    <div className="relative w-full max-w-md">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setSearchTerm("");
          }
        }}
        type="text"
        placeholder="Search through thousands of movies"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {isSearching && (
          <div className="ml-2 flex items-center">
            <RotateCw size={16} className="animate-spin text-blue-500" />
          </div>
        )}
        {!isSearching && setSearchTerm !== "" && (
          <button>
            <X size={16} onClick={() => setSearchTerm("")} />
          </button>
        )}
      </div>
    </div>
  );
}
