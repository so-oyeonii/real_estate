# 오피스너 — 사무실 임대·매매 전문 웹사이트

서울 주요 업무지구의 사무실 임대·매매 매물을 검색하고 문의할 수 있는 웹사이트입니다.

## 주요 기능

### 공개 페이지
- **메인 페이지** — 매물 검색, 추천 매물, 간편 상담 신청
- **매물 목록** — 거래유형/지역/면적/주차 필터링, 정렬, 페이지네이션
- **매물 상세** — 상세 정보, 구글맵 위치, 매물 문의 폼
- **문의하기** — 희망 면적/예산 포함 상세 상담 신청
- **회사 소개** — 서비스 소개, 핵심 가치, 서비스 영역

### 관리자 페이지 (`/admin`)
- **대시보드** — 매물 통계 (전체/공개/예약), 대기 문의 수, 최근 문의
- **매물 관리** — 매물 등록/수정/삭제, 상태 변경 (공개/예약/마감), 추천 매물 설정
- **문의 관리** — 문의 목록 조회, 상태 변경 (대기→연락완료→완료), 관리자 메모

### SEO
- `sitemap.xml` 자동 생성 (매물 추가 시 반영)
- `robots.txt` (관리자/API 크롤링 차단)
- 매물 상세 페이지 JSON-LD 구조화 데이터
- 페이지별 동적 메타태그, Open Graph

### 보안
- Supabase RLS (Row Level Security) 정책
- Zod 입력값 서버 검증
- 관리자 인증 미들웨어
- 보안 헤더 (X-Frame-Options, XSS-Protection 등)
- 에러 응답 시 내부 정보 비노출

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript (strict 모드) |
| 스타일링 | Tailwind CSS 4 |
| 백엔드/DB | Supabase (PostgreSQL, Auth, Storage) |
| 입력 검증 | Zod |
| 배포 | Vercel |

## 프로젝트 구조

```
src/
├── app/                          # 페이지 (App Router)
│   ├── page.tsx                 # 메인
│   ├── properties/              # 매물 목록 / 상세
│   ├── contact/                 # 문의
│   ├── about/                   # 회사 소개
│   ├── admin/                   # 관리자 페이지
│   │   ├── login/               # 관리자 로그인
│   │   └── (dashboard)/         # 대시보드, 매물관리, 문의관리
│   └── api/                     # API Routes
├── components/
│   ├── ui/                      # 범용 UI (Pagination 등)
│   ├── property/                # 매물 관련 (Card, Filter 등)
│   ├── layout/                  # Header, Footer, AdminSidebar
│   └── forms/                   # 문의폼, 매물등록폼
├── lib/                         # 비즈니스 로직, 유틸리티
│   ├── supabase/                # Supabase 클라이언트
│   ├── properties.ts            # 매물 조회 로직
│   ├── validators.ts            # Zod 검증 스키마
│   └── utils.ts                 # 가격 포맷, 면적 변환 등
├── types/                       # TypeScript 타입 정의
├── config/                      # 상수 (지역 목록, 옵션 등)
└── middleware.ts                # 관리자 인증 미들웨어
```

## 로컬 개발 환경 설정

### 1. 프로젝트 클론 및 패키지 설치

```bash
git clone https://github.com/so-oyeonii/real_estate.git
cd real_estate
npm install
```

### 2. 환경 변수 설정

`.env.example`을 복사하여 `.env.local` 파일을 생성합니다.

```bash
cp .env.example .env.local
```

`.env.local`에 Supabase 프로젝트 정보를 입력합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> Supabase 키는 Supabase Dashboard > Settings > API 에서 확인할 수 있습니다.

### 3. 데이터베이스 초기화

Supabase SQL Editor에서 아래 파일을 순서대로 실행합니다.

1. `supabase/migrations/001_create_tables.sql` — 테이블, 인덱스, RLS 정책 생성
2. `supabase/migrations/002_seed_data.sql` — 더미 매물 데이터 40건 삽입

### 4. 관리자 계정 생성

1. Supabase Dashboard > Authentication > Users > **Add User**
2. 이메일, 비밀번호 입력 + **Auto Confirm User** 체크
3. 생성된 유저의 UUID 복사
4. SQL Editor에서 실행:

```sql
INSERT INTO admin_profiles (id, name, role)
VALUES ('생성된-UUID', '관리자', 'super_admin');
```

### 5. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 배포

Vercel에 GitHub 레포를 연결하고 환경 변수를 설정하면 자동 배포됩니다.

필요한 환경 변수:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (배포 후 Vercel URL 입력)

## 더미 데이터 구성

서울 8개 구, 총 40건의 사무실 매물 데이터가 포함되어 있습니다.

| 지역 | 건수 | 특성 |
|------|------|------|
| 강남구 | 10 | 프라임 오피스, 고가 |
| 서초구 | 6 | 법조타운, 중대형 |
| 마포구 | 5 | IT/미디어, 신축 |
| 영등포구 | 5 | 여의도 금융가 |
| 종로구 | 4 | CBD, 전통 업무지구 |
| 중구 | 4 | CBD, 교통 편리 |
| 성동구 | 3 | 성수 트렌디 |
| 구로구 | 3 | 가산 IT단지, 저가 |

거래유형: 월세 50% / 전세 30% / 매매 20%

## 라이선스

MIT License
