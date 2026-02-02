"use client";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
  SearchIconClassName?: string;
  inputText?: string;
};

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  className = "",
  SearchIconClassName = "",
  inputText = "",
}: SearchBarProps) {
  const [query, setQuery] = useState<string>("");
  const typingTimeoutRef = useRef<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      onSearch?.(value);
    }, 900);
  };

  return (
    <div className={`flex items-center rounded-full border border-hamzaPrimary/80 bg-white px-3 py-2 shadow-sm w-full md:w-76 transition focus:border-none focus-within:border-hamzaPrimary focus-within:ring-2 focus-within:ring-hamzaPrimary/20 ${className}`}>
      <SearchIcon className={`h-5 w-5 text-hamzaPrimary ${SearchIconClassName}`} />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`ml-2 w-full border-none bg-transparent text-sm  placeholder-gray-400 focus:outline-none ${inputText}`}
      />
    </div>
  );
}
