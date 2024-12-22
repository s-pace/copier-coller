import React, { createContext, ReactNode, useContext, useState } from "react";
import LocalesEnum from "./LocalesEnum";
import locales from "./locales.json";

// type LanguageContextProps = {
//   selectedLanguage: LocalesEnum;
//   setSelectedLanguage: (locale: LocalesEnum) => void;
//   locale: Record<string, string>;
// };

const LanguageContext = createContext({
  selectedLanguage: LocalesEnum.EN_US,
  // eslint-disable-next-line no-unused-vars
  setSelectedLanguage: (_: LocalesEnum) => {},
  locale:
    // @ts-ignore:
    locales[LocalesEnum.EN_US] as Record<string, string>,
});

export const useLanguage = () => useContext(LanguageContext);

export type LanguageProviderProps = { children: ReactNode };

const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}: LanguageProviderProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LocalesEnum>(
    LocalesEnum.EN_US,
  );

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        locale: locales[selectedLanguage ?? LocalesEnum.EN_US] as Record<
          string,
          string
        >,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
