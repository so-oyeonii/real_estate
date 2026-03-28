// --- 관리자 최상위 레이아웃 ---
// /admin 하위 모든 페이지에 적용 (login 포함)
// 여기서는 최소한의 설정만, 사이드바는 (dashboard) 레이아웃에서

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
