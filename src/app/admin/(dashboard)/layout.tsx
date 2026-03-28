// --- 관리자 대시보드 레이아웃 ---
// /admin 하위 페이지 중 로그인을 제외한 페이지에 적용
// 사이드바 네비게이션을 포함한다
// /admin/login은 이 레이아웃을 사용하지 않는다

import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 사이드바 */}
      <AdminSidebar />

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
