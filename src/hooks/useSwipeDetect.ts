import { TouchEvent, useState } from "react";

interface SwipeInput {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

interface SwipeOutput {
  // eslint-disable-next-line no-unused-vars
  onTouchStart: (_: TouchEvent) => void;
  // eslint-disable-next-line no-unused-vars
  onTouchMove: (_: TouchEvent) => void;
  onTouchEnd: () => void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (input: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      input.onSwipedLeft();
    }
    if (isRightSwipe) {
      input.onSwipedRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
