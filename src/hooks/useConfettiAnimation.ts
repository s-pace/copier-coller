// hooks/useConfettiAnimation.ts
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

interface ConfettiAnimationProps {
  /**
   * Duration of the animation in seconds
   */
  duration: number;
  initialParticleCount: number;
  onAnimationEnd?: () => void;
}

export const useConfettiAnimation = ({
  duration,
  initialParticleCount,
  onAnimationEnd,
}: ConfettiAnimationProps) => {
  const [particleCount, setParticleCount] = useState(initialParticleCount);

  useEffect(() => {
    const animationEnd = Date.now() + duration * 1000;

    const interval = setInterval(() => {
      const timeLeft = duration - (Date.now() - animationEnd);
      if (timeLeft <= 0) {
        clearInterval(interval);
        onAnimationEnd?.();
        return;
      }

      const newParticleCount =
        initialParticleCount * (timeLeft / (duration * 1000));
      setParticleCount(newParticleCount);

      confetti(
        Object.assign(
          {},
          {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 0,
            particleCount,
            origin: { x: Math.random() * 0.2 + 0.1, y: Math.random() - 0.2 },
          },
        ),
      );
      confetti(
        Object.assign(
          {},
          {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 0,
            particleCount,
            origin: { x: Math.random() * 0.2 + 0.7, y: Math.random() - 0.2 },
          },
        ),
      );
    }, 250);

    return () => clearInterval(interval);
  }, [duration, initialParticleCount, onAnimationEnd, particleCount]);
};
