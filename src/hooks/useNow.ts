import { useEffect, useState } from 'react';

/**
 * 현재 시각을 마운트 이후에만 계산해 반환한다.
 *
 * 페이지가 정적으로 프리렌더되면 new Date()가 "빌드 시점"으로 고정되는데,
 * 클라이언트는 "조회 시점"으로 계산하므로 경력 개월 수 등이 어긋나 하이드레이션 경고가 발생할 수 있다.
 * 서버/클라이언트 첫 렌더 모두 null을 반환해 HTML을 일치시킨 뒤, 마운트 후에만 실제 시각으로 채운다.
 */
export function useNow(): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  return now;
}
