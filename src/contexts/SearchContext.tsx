import React, { createContext, useContext, ReactNode } from "react";

interface SearchConfig {
  ALGOLIA_APP_ID: string;
  ALGOLIA_SEARCH_KEY: string;
}

interface SearchContextType {
  config: SearchConfig;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
  config: SearchConfig;
}

export function SearchProvider({ children, config }: SearchProviderProps) {
  return (
    <SearchContext.Provider value={{ config }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
