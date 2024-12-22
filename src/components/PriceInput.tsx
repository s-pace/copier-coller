import { Label } from "@/components/ui/label";
import { useLanguage } from "../i18n/LanguageProvider";
import HappyInput from "./HappyInput";

const PriceInput = ({ name }: { name: string }) => {
  const { locale } = useLanguage();

  const { maximumGiftLabel, pricePlaceholder } = locale;

  return (
    <div className="m-auto flex w-full">
      <div className="gift-input m-auto">
        <Label className="px-2">{pricePlaceholder}: </Label>
        <HappyInput
          name={name}
          emojiRanges={[
            { min: 0, max: 1, emoji: "😔" },
            { min: 1, max: 3, emoji: "☕" },
            { min: 3, max: 5, emoji: "🧃" },
            { min: 5, max: 5, emoji: "💵" },
            { min: 5, max: 9, emoji: "🍺" },
            { min: 9, max: 12, emoji: "🍽️" },
            { min: 12, max: 14, emoji: "🥰" },
            { min: 14, max: 18, emoji: "😍" },
            { min: 18, max: 23, emoji: "🔥" },
            { min: 23, max: 27, emoji: "🙏" },
            { min: 27, max: 30, emoji: "🚀" },
            { min: 30, max: 37, emoji: "🧑‍🚀" },
            { min: 37, max: Infinity, emoji: "🤑" },
          ]}
          label={maximumGiftLabel}
        />
      </div>
    </div>
  );
};

export default PriceInput;
