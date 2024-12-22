import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode, useState } from "react";

interface EmojiRange {
  min: number;
  max: number;
  emoji: string;
}

const ceiledBy = (cap: number, ceil: number) => Math.min(cap, ceil);

type HappyInputProps = {
  name: string;
  emojiRanges: EmojiRange[];
  label?: ReactNode;
};
const HappyInput = ({ emojiRanges, label, name }: HappyInputProps) => {
  const [amount, setAmount] = useState(0);
  const [isLabelVisible, setLabelVisible] = useState(false);

  const handleMouseEnter = () => {
    setLabelVisible(true);
  };

  const handleMouseLeave = () => {
    setLabelVisible(false);
  };

  const getEmojiForAmount = () => {
    const range = (emojiRanges ?? []).find(
      ({ min, max }) => amount >= min && amount <= max,
    );
    return range ? range.emoji : "😃"; // Default emoji if no range is matched
  };

  const calculateFontSize = (): string => {
    // Basic calculation; adjust as needed
    const baseSize = 24; // Base font size in pixels
    const base = 15; // Base font size in pixels
    const sizeIncrease = amount / 1.5; // Increase font size by 1px for every $10
    const factor = ceiledBy((baseSize + sizeIncrease) / base, 5);
    return `${factor}rem`;
  };

  return (
    <>
      <div
        className="flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Input
          name={name}
          type="number"
          className="w-full min-w-[50%] rounded border-2 border-gray-300"
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
          min={0}
        />
        <div className="happy-emoji">
          <span style={{ fontSize: calculateFontSize() }}>
            {getEmojiForAmount()}
          </span>
        </div>
      </div>
      {isLabelVisible ? (
        <div className="happy-tooltip">
          <Label className="money-input-label">{label}</Label>
        </div>
      ) : (
        <div className="happy-tooltip">
          <Label className="money-input-label">
            <span>&nbsp;</span>
          </Label>
        </div>
      )}
    </>
  );
};

export default HappyInput;
