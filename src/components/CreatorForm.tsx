// CreatorForm.tsx
import { Label } from "@/components/ui/label";
import React from "react";
import { useLanguage } from "../i18n/LanguageProvider";
export type CreatorType = {
  urlProject: string;
};

interface CreatorFormProps {
  creator: CreatorType;
  // eslint-disable-next-line no-unused-vars
  setCreator: (updateFunction: (creator: CreatorType) => CreatorType) => void;
}

const CreatorForm: React.FC<CreatorFormProps> = ({ creator, setCreator }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreator((prevCreator) => ({
      ...prevCreator,
      [name]: value,
    }));
  };
  const { locale } = useLanguage();

  const { creatorPortfolioPlaceHolder } = locale;

  return (
    <div>
      <Label
        htmlFor="portfolio"
        className="block text-sm font-medium text-gray-700"
      ></Label>
      <input
        type="text"
        name="urlProject"
        value={creator.urlProject}
        onChange={handleInputChange}
        placeholder={creatorPortfolioPlaceHolder}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default CreatorForm;
