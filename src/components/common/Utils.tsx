export const utils = {
    formatDuration(startedAt: string, endedAt?: string): string {
      const [startYear, startMonth] = startedAt.split('.').map(Number);
      const [endYear, endMonth] = endedAt
        ? endedAt.split('.').map(Number)
        : [new Date().getFullYear(), new Date().getMonth() + 1];
  
      const yearDiff = endYear - startYear;
      const monthDiff = endMonth - startMonth;
  
      const totalMonths = yearDiff * 12 + monthDiff;
  
      if (totalMonths < 12) {
        return `${totalMonths}개월`;
      } else {
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        return months > 0 ? `${years}년 ${months}개월` : `${years}년`;
      }
    },
  };
  