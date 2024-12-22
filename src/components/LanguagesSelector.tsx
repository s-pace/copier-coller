import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Adjust the import path as necessary
import { useLanguage } from "../i18n/LanguageProvider";
import { languageEmojiMap, supportedLanguages } from "./Header";
import LocalesEnum from "@/i18n/LocalesEnum";

const LanguagesSelector = () => {
  const { selectedLanguage, setSelectedLanguage, locale } = useLanguage();

  const { englishLabel, frenchLabel, germanLabel, italianLabel } = locale;

  const languageNameMap: Record<LocalesEnum, string> = {
    [LocalesEnum.EN_US]: englishLabel,
    [LocalesEnum.FR_FR]: frenchLabel,
    [LocalesEnum.DE_DE]: germanLabel,
    [LocalesEnum.IT_IT]: italianLabel,
  };

  return (
    <Select
      name="language"
      onValueChange={(value) => setSelectedLanguage(value as LocalesEnum)}
    >
      <SelectTrigger className="mb-4 w-auto">
        <SelectValue placeholder={languageEmojiMap[selectedLanguage]} />
      </SelectTrigger>
      <SelectContent>
        {supportedLanguages.map((languageCode) => (
          <SelectItem
            key={languageCode}
            value={languageCode}
            className="w-full text-center"
          >
            {languageNameMap[languageCode]} {languageEmojiMap[languageCode]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguagesSelector;
