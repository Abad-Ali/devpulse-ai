"use client";
import React from "react";
import ProgramSearchResult from "./ProgramSearchResult";
import SearchEmptyState from "./SearchEmptyState";
import UserSearchResult from "./UserSearchResult";

interface SearchContentProps {
  searchType: string;
  searchValue: string;
}

const SearchContent = ({ searchType, searchValue }: SearchContentProps) => {
  const trimmedSearchValue = searchValue.trim();

  if (!trimmedSearchValue) {
    return <SearchEmptyState />;
  }

  if (searchType === "username") {
    return (
      <UserSearchResult searchValue={trimmedSearchValue}/>
    );
  }

  return (
    <ProgramSearchResult searchValue={trimmedSearchValue}/>
  );
};

export default SearchContent;