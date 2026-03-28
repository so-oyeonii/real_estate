// --- 공개 페이지 레이아웃 ---
// 공개 페이지(메인, 매물, 문의, 소개)에서만 Header/Footer를 표시한다
// 관리자 페이지에서는 이 컴포넌트를 사용하지 않는다

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
