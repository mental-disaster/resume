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
  // 기준 날짜(now)는 호출부에서 주입해 카드 간 표시가 어긋나지 않도록 한다.
  // now가 아직 없으면(클라이언트 마운트 전) 빈 문자열을 반환해 하이드레이션 불일치를 피한다.
  formatDuration(startedAt: string, endedAt?: string, now?: Date | null): string {
    if (!now) return '';
    return formatMonths(diffInMonths(startedAt, endedAt, now));
  },

  getTotalCareerDuration(experiences: Experience[], now?: Date | null): string {
    if (!now) return '';
    const totalMonths = experiences.reduce(
      (sum, exp) => sum + diffInMonths(exp.startedAt, exp.endedAt, now),
      0
    );
    return formatMonths(totalMonths);
  },
};
