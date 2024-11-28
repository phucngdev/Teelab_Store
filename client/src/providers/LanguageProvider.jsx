import React, { createContext, useContext, useState } from "react";
import { languageOptions } from "../resources/index";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("vi");
  const toggleLanguage = (lang) => setLanguage(lang);

  const value = {
    language: languageOptions[language],
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
