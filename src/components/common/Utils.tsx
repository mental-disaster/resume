import { Experience } from '@/data/experience';

// 'YYYY.MM' 형식의 두 시점 사이 개월 수. endedAt이 없으면 기준 날짜(now)까지로 계산한다.
function diffInMonths(startedAt: string, endedAt: string | undefined, now: Date): number {
  const [startYear, startMonth] = startedAt.split('.').map(Number);
  const [endYear, endMonth] = endedAt
    ? endedAt.split('.').map(Number)
    : [now.getFullYear(), now.getMonth() + 1];

  return (endYear - startYear) * 12 + (endMonth - startMonth);
}

function formatMonths(totalMonths: number): string {
  if (totalMonths < 12) {
    return `${totalMonths}개월`;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return months > 0 ? `${years}년 ${months}개월` : `${years}년`;
}

export const Utils = {
  // 기준 날짜(now)는 호출부에서 주입해 SSR/CSR 및 카드 간 표시가 어긋나지 않도록 한다.
  formatDuration(startedAt: string, endedAt?: string, now: Date = new Date()): string {
    return formatMonths(diffInMonths(startedAt, endedAt, now));
  },

  getTotalCareerDuration(experiences: Experience[], now: Date = new Date()): string {
    const totalMonths = experiences.reduce(
      (sum, exp) => sum + diffInMonths(exp.startedAt, exp.endedAt, now),
      0
    );
    return formatMonths(totalMonths);
  },
};
