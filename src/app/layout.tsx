// --- 루트 레이아웃 ---
// 모든 페이지에 공통으로 적용되는 최상위 레이아웃
// 폰트, 메타데이터, 글로벌 스타일을 설정한다

import type { Metadata } from 'next';
import '@/styles/globals.css';

// SEO 기본 메타데이터
export const metadata: Metadata = {
  title: {
    default: '오피스너 | 사무실 임대·매매 전문',
    template: '%s | 오피스너',
  },
  description:
    '서울 주요 업무지구 사무실 임대, 매매 전문. 강남, 여의도, 종로, 마포 등 최적의 사무 공간을 찾아보세요.',
  keywords: ['사무실 임대', '사무실 매매', '오피스 임대', '서울 사무실', '강남 사무실'],
  openGraph: {
    title: '오피스너 | 사무실 임대·매매 전문',
    description: '서울 주요 업무지구 사무실 임대, 매매 전문',
    type: 'website',
    locale: 'ko_KR',
  },
};

// 루트 레이아웃 — HTML/body만 담당
// Header/Footer는 공개 페이지 전용 레이아웃에서 처리한다
// 관리자 페이지는 별도 레이아웃(AdminSidebar)을 사용한다
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
