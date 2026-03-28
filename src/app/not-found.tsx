// --- 404 페이지 ---
// 존재하지 않는 페이지에 접근했을 때 표시

import Link from 'next/link';
import PublicLayout from '@/components/layout/PublicLayout';

export default function NotFound() {
  return (
    <PublicLayout>
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-[var(--color-primary)]">404</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-2 text-slate-500">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-dark)]"
          >
            홈으로
          </Link>
          <Link
            href="/properties"
            className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50"
          >
            매물 검색
          </Link>
        </div>
      </div>
    </div>
    </PublicLayout>
  );
}
