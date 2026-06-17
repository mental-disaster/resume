import { useRef } from 'react';
import { useInView } from 'framer-motion';

type RevealOptions = {
  x?: number;
  y?: number;
  delay?: number;
  duration?: number;
};

/**
 * 스크롤 진입 시 1회 등장 애니메이션을 위한 공용 훅.
 * 반복되던 useRef + useInView + initial/animate/transition 보일러플레이트를 한곳으로 모은다.
 *
 * - ref: 가시성 판단 기준이 될 요소에 연결한다(같은 ref의 isInView를 여러 motion 자식이 공유 가능).
 * - reveal(): motion 컴포넌트에 그대로 spread 할 등장 애니메이션 props를 생성한다.
 *
 * transform(x/y) 기반 이동은 prefers-reduced-motion 사용자에게 layout의 MotionConfig가 자동 비활성화한다.
 */
export function useScrollReveal(amount?: number) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  const reveal = ({ x = 0, y = 20, delay = 0, duration = 0.5 }: RevealOptions = {}) => ({
    initial: { opacity: 0, x, y },
    animate: isInView ? { opacity: 1, x: 0, y: 0 } : undefined,
    transition: { duration, delay },
  });

  return { ref, isInView, reveal };
}
