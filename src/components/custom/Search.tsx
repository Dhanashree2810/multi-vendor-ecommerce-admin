import React, { ChangeEvent } from "react";

interface SearchProps {
  setParPage: (value: number) => void;
  setSearchValue: (value: string) => void;
  searchValue: string;
}

const Search = ({ setParPage, setSearchValue, searchValue }:SearchProps) => {
  const handleParPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setParPage(parseInt(e.target.value, 10));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex justify-between items-center">
      <select
        onChange={handleParPageChange}
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <input
        onChange={handleSearchChange}
        value={searchValue}
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
