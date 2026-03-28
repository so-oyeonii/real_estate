# 부동산 웹사이트 프로젝트 — CLAUDE.md

## 프로젝트 개요

### 목적
- 한국 부동산 매물 검색 및 중개 웹사이트
- 참고 사이트: 빌셋 임대 (billset-lease.co.kr)

### 대상 사용자
- 매물을 찾는 임차인/매수자
- 매물을 등록하는 중개사/건물주

---

## 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Next.js (App Router) | 14+ |
| 언어 | TypeScript (strict 모드) | 5+ |
| 스타일링 | Tailwind CSS | 3+ |
| 백엔드/DB | Supabase (Auth, Database, Storage) | - |
| 입력값 검증 | Zod | - |
| 배포 | Vercel | - |
| 패키지 매니저 | npm | - |
| 버전 관리 | Git + GitHub | - |

---

## 코드 작성 원칙

### 1. 한국어 주석 필수
- 파일 상단에 해당 파일의 역할을 한국어로 요약
- 복잡한 로직 앞에 단계별 한국어 설명
- 변수명은 영어 camelCase, 주석은 한국어

### 2. 보안 최우선
- 모든 사용자 입력은 Zod로 서버에서 검증
- `dangerouslySetInnerHTML` 사용 금지
- 환경 변수는 `.env.local`에만, 절대 커밋하지 않음
- RLS 정책 모든 테이블에 활성화
- 에러 응답에 내부 정보 노출 금지

### 3. 성능 최적화
- 서버 컴포넌트 기본, 클라이언트는 필요한 경우에만
- 이미지는 반드시 `next/image` 사용
- 무거운 컴포넌트는 `next/dynamic`으로 지연 로딩
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

### 4. 코드 품질
- `any` 타입 사용 금지
- 컴포넌트당 최대 200줄
- 중첩 최대 2단계
- 미사용 코드 즉시 제거

### 5. 에러 메시지 한국어
- 사용자에게 보여주는 모든 메시지는 한국어
- 콘솔 로그는 영어/한국어 혼용 가능

---

## 폴더 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 메인 페이지
│   ├── properties/        # 매물 관련
│   │   ├── page.tsx       # 매물 목록
│   │   └── [id]/page.tsx  # 매물 상세
│   ├── contact/           # 문의
│   ├── api/               # API Routes
│   └── layout.tsx         # 루트 레이아웃
├── components/
│   ├── ui/                # 범용 UI (Button, Card, Modal, Input)
│   ├── property/          # 매물 관련 (PropertyCard, PropertyFilter)
│   ├── layout/            # 레이아웃 (Header, Footer, Navigation)
│   └── forms/             # 폼 (ContactForm, SearchForm)
├── lib/                   # 비즈니스 로직, 유틸리티
│   ├── supabase.ts        # Supabase 클라이언트 (싱글턴)
│   ├── properties.ts      # 매물 관련 로직
│   ├── validators.ts      # Zod 검증 스키마
│   └── utils.ts           # 공통 유틸리티
├── hooks/                 # 커스텀 React 훅
├── types/                 # TypeScript 타입 정의
├── config/                # 설정 상수
└── styles/                # 글로벌 스타일
```

---

## Git 규칙

### 커밋 메시지
```
<타입>: <한국어 설명>

feat: 매물 검색 필터 UI 구현
fix: 매물 상세 페이지 이미지 로딩 오류 수정
style: 매물 카드 여백 및 폰트 조정
```

### 브랜치
- `main`: 배포용
- `dev`: 개발 통합
- `feat/기능명`: 새 기능
- `fix/버그명`: 버그 수정

### 주의사항
- `.env`, `.env.local` 절대 커밋 금지
- `node_modules/` 커밋 금지
- 커밋 전 `npm run build` 확인

---

## 배포

### Vercel
- `main` 브랜치 push 시 자동 배포
- PR 시 프리뷰 배포
- 환경 변수는 Vercel 대시보드에서 관리
