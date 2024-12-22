// SwipeComponent.tsx
import clsx from "clsx";
import React, { useCallback, useState } from "react";

type SwipeComponentProps = {
  children: React.ReactNode;
  minSwipeDistance?: number;
  className?: string;
};

const SwipeComponent: React.FC<SwipeComponentProps> = ({
  className,
  children,
  minSwipeDistance = 50,
}) => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [bgColor, setBgColor] = useState<"red" | "green" | "whitesmoke">(
    "whitesmoke",
  );

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touchEnd = e.changedTouches[0].clientX;

      if (touchStart - touchEnd > minSwipeDistance) {
        // Swiped left
        setBgColor((prevColor) => (prevColor === "red" ? "whitesmoke" : "red"));
      } else if (touchEnd - touchStart > minSwipeDistance) {
        // Swiped right
        setBgColor((prevColor) =>
          prevColor === "green" ? "whitesmoke" : "green",
        );
      }
    },
    [touchStart, minSwipeDistance],
  );

  return (
    <article
      className={clsx("p-4", className)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </article>
  );
};

export default SwipeComponent;
