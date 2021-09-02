import React from "react";
import { useTranslation } from "react-i18next";
import languages from "../i18n/languages";

const Switch = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      {Object.keys(languages).map((option) => (
        <option key={option} value={option}>
          {languages[option].nativeName}
        </option>
      ))}
    </select>
  );
};

export default Switch;
