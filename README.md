# Resume Tailwind

이 프로젝트는 Next.js와 Tailwind CSS를 사용하여 구축된 이력서입니다.

## 기술 스택

- **프레임워크**: Next.js 15
- **언어**: TypeScript
- **스타일링**: Tailwind CSS

## 시작하기

### 필수 조건

- Node.js (22 버전 권장)
- pnpm

### 설치

```bash
# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
pnpm run dev
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 프로덕션 빌드

```bash
pnpm run build
pnpm run start
```

## 프로젝트 구조

```
resume-tailwind/
├── src/          # 소스 코드
│   ├── app/          # Next.js 앱 디렉토리
│   ├── components/   # React 컴포넌트
│   └── data/         # 데이터 파일
└── public/       # 정적 파일
```

## 배포

이 프로젝트는 Vercel에 배포되어 있으며, 다음 링크에서 확인하실 수 있습니다:  
[이력서 웹사이트](https://resume.imgh.dev/)
[이력서 웹사이트(styled)](https://resume.imgh.dev/styled)

### 배포 방법

1. GitHub 저장소를 Vercel에 연결
2. 자동 배포 설정
3. 환경 변수 설정 (필요한 경우)

### 배포 환경

- **호스팅**: Vercel
- **도메인**: resume.imgh.dev
- **배포 상태**: 프로덕션
