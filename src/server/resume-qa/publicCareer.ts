import 'server-only';

import {
  careerAchievements,
  careerEducation,
  careerProjects,
  type CareerAchievementCore,
  type CareerEducationCore,
  type CareerProjectCore,
} from '@/data/career/core';

import { aiSupportingCareerItems, aiWorkCareerItems } from './aiCareerExtensions';
import type { PublicCareerItem } from './publicCareerTypes';

export type {
  PublicCareerItem,
  PublicCareerResumePlacement,
  PublicCareerSourceType,
  PublicCareerVisibility,
} from './publicCareerTypes';

const AGENT_CONTEXT_BY_CORE_ID: Record<string, string> = {
  'project.integrity-portal':
    '보안 취약점 대응 질문에서는 SQL 인젝션 7건 제거, Statement에서 PreparedStatement로의 전환, 반복 요청 IP 차단 로직을 구분해서 설명한다. 성능 질문에서는 51초에서 6초, 6분에서 10초 개선 수치를 사용할 수 있다. 운영 자동화 질문에서는 월 평균 100건 운영 요청의 자동 알림과 수동 확인 업무 감소를 설명한다. 특정 URL, 파라미터, 쿼리 원문, 공격 로그, 내부 보안 정책은 공개 데이터에 없으므로 단정하지 않는다. 추가 설명을 요구받으면 같은 문장을 반복하지 말고 대응 배경, 조치, 결과, 공개 한계를 나눠 답한다.',
  'project.insurance-open-api':
    '데이터 파이프라인 질문에서는 154만 건 초기데이터 처리, 예상 대비 7배 증가, 일 단위 배치, 정규표현식 기반 표준화, 주소·업종·사업자번호 정제, 표준 스키마 변환을 중심으로 답한다. 데이터 품질 문제를 100% 제거했다는 표현은 PDF 이력서 기준 성과로만 사용하고, 제거 범위가 프로젝트 데이터 정합성 문맥임을 벗어나지 않는다.',
  'project.care-service-platform':
    '레거시 개선 질문에서는 DB 트리거·프로시저 제거, 애플리케이션 레이어 이전, LCP 23초 개선, TBT 1100ms에서 20ms 이내 안정화, 무한 뎁스 팝업 제거, 클릭 수 7회에서 4회 감소를 근거로 답한다. 팀 단위 작업은 개인 단독 성과처럼 말하지 않는다.',
  'education.inu-computer-science':
    '학력 질문에만 직접 근거로 사용한다. 경력 기간 계산에는 포함하지 않는다. 학점은 사용자가 학력이나 성적을 물을 때만 언급하고, 기술 역량의 직접 증거처럼 과장하지 않는다.',
  'education.inu-gai-lab':
    '연구 경험이나 학부 시절 활동 질문에 보조 근거로 사용한다. 구체 연구 주제, 논문, 담당 업무는 공개 데이터에 없으므로 임의로 만들지 않는다.',
  'education.inu-oracle-course':
    '교육 수료 질문에만 보조 근거로 사용한다. Oracle 실무 숙련도나 프로젝트 경험으로 과장하지 않는다.',
  'achievement.patent-leak-monitoring-device':
    '특허 관련 질문에 보조 근거로 사용한다. 공동발명 이력으로만 표현하고, 단독 발명이나 상용화 성과처럼 과장하지 않는다. 특허의 상세 청구항이나 기술 구현 내용은 공개 데이터 요약 범위를 넘어서 단정하지 않는다.',
  'achievement.patent-digital-water-meter-fault-detection':
    '특허 관련 질문에 보조 근거로 사용한다. 공동발명 이력으로만 표현하고, 단독 발명이나 상용화 성과처럼 과장하지 않는다. 특허의 상세 청구항이나 기술 구현 내용은 공개 데이터 요약 범위를 넘어서 단정하지 않는다.',
  'achievement.patent-leak-location-system':
    '특허 관련 질문에 보조 근거로 사용한다. 공동발명 이력으로만 표현하고, 단독 발명이나 상용화 성과처럼 과장하지 않는다. 특허의 상세 청구항이나 기술 구현 내용은 공개 데이터 요약 범위를 넘어서 단정하지 않는다.',
  'achievement.inu-smart-living-lab-hackathon':
    '수상 이력 질문에 보조 근거로 사용한다. 구체 팀 구성, 개발 산출물, 사용 기술은 공개 데이터에 없으므로 임의로 만들지 않는다.',
};

const toPublicCareerProject = (project: CareerProjectCore): PublicCareerItem => ({
  id: project.id,
  title: project.title,
  visibility: project.visibility,
  sourceType: project.sourceType,
  resumePlacement: project.resumePlacement,
  category: project.category,
  kind: project.kind,
  summary: project.summary,
  details: [...project.details, ...project.achievements],
  agentContext: AGENT_CONTEXT_BY_CORE_ID[project.id],
  skills: project.skills,
  keywords: project.keywords,
  period: project.period,
  startDate: project.startDate,
  endDate: project.endDate,
  role: project.role,
  countsAsCareerPeriod: project.countsAsCareerPeriod,
});

const toPublicCareerEducation = (education: CareerEducationCore): PublicCareerItem => ({
  id: education.id,
  title: education.title,
  visibility: 'supporting',
  sourceType: 'resume',
  category: education.category,
  kind: education.kind,
  summary: education.summary,
  details: education.details,
  agentContext: AGENT_CONTEXT_BY_CORE_ID[education.id],
  skills: education.skills,
  keywords: education.keywords,
  period: education.period,
  startDate: education.startDate,
  endDate: education.endDate,
  role: education.role,
  countsAsCareerPeriod: false,
});

const toPublicCareerAchievement = (achievement: CareerAchievementCore): PublicCareerItem => ({
  id: achievement.id,
  title: achievement.title,
  visibility: 'supporting',
  sourceType: achievement.sourceType,
  category: achievement.category,
  kind: achievement.kind,
  sourceUrl: achievement.sourceUrl,
  sourceDescription: achievement.sourceDescription,
  summary: achievement.summary,
  details: achievement.details,
  agentContext: AGENT_CONTEXT_BY_CORE_ID[achievement.id],
  keywords: achievement.keywords,
  date: achievement.isoDate,
  role: achievement.role,
  countsAsCareerPeriod: false,
});

const corePublicCareerById = new Map(
  [
    ...careerProjects.map(toPublicCareerProject),
    ...careerEducation.map(toPublicCareerEducation),
    ...careerAchievements.map(toPublicCareerAchievement),
  ].map(item => [item.id, item])
);

const getCorePublicCareerItem = (id: string) => {
  const item = corePublicCareerById.get(id);
  if (!item) {
    throw new Error(`Missing core public career item: ${id}`);
  }

  return item;
};

export const publicCareer: PublicCareerItem[] = [
  getCorePublicCareerItem('project.integrity-portal'),
  ...aiWorkCareerItems,
  getCorePublicCareerItem('project.insurance-open-api'),
  getCorePublicCareerItem('project.care-service-platform'),
  ...careerEducation.map(item => getCorePublicCareerItem(item.id)),
  ...careerAchievements.map(item => getCorePublicCareerItem(item.id)),
  ...aiSupportingCareerItems,
];

export const publicCareerById = new Map(publicCareer.map(item => [item.id, item]));
