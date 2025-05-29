# Resume Tailwind

이 프로젝트는 Next.js와 Tailwind CSS를 사용하여 구축된 이력서입니다.

## 기술 스택

- **프레임워크**: Next.js 15.3.2
- **언어**: TypeScript
- **스타일링**: Tailwind CSS

## 시작하기

### 필수 조건

- Node.js (22 버전 권장)
- npm

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
npm run start
```

## 프로젝트 구조

```
resume-tailwind/
├── app/          # Next.js 앱 디렉토리
├── src/          # 소스 코드
│   ├── components/   # React 컴포넌트
│   └── data/     # 데이터 파일
└── public/       # 정적 파일
```

## 주의사항

- Next.js 15.3.2 버전을 사용하고 있으며, Turbopack을 개발 서버에 적용했습니다.
- React 19를 사용하고 있어 최신 기능들을 활용할 수 있습니다.
- TypeScript를 사용하여 타입 안정성을 보장합니다.

## 배포

이 프로젝트는 Vercel에 배포되어 있으며, 다음 링크에서 확인하실 수 있습니다:
[이력서 웹사이트](https://resume-tailwind-wheat.vercel.app/)

### 배포 방법

1. GitHub 저장소를 Vercel에 연결
2. 자동 배포 설정
3. 환경 변수 설정 (필요한 경우)

### 배포 환경

- **호스팅**: Vercel
- **도메인**: resume-tailwind-wheat.vercel.app
- **배포 상태**: 프로덕션
