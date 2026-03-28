// --- 페이지네이션 컴포넌트 ---
// 페이지 번호를 표시하고 클릭 시 해당 페이지로 이동한다
// URL 쿼리 파라미터를 유지하면서 page만 변경한다

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams: Record<string, string | undefined>;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams,
}: PaginationProps) {
  // 페이지 번호로 URL을 생성하는 함수
  function getPageUrl(page: number): string {
    const params = new URLSearchParams();
    // 기존 쿼리 파라미터 유지
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== 'page') {
        params.set(key, value);
      }
    });
    params.set('page', String(page));
    return `${baseUrl}?${params.toString()}`;
  }

  // 표시할 페이지 번호 배열 계산 (현재 페이지 주변 2개씩)
  const pages: number[] = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-1" aria-label="페이지 이동">
      {/* 이전 버튼 */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
          aria-label="이전 페이지"
        >
          &larr; 이전
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-slate-300">&larr; 이전</span>
      )}

      {/* 첫 페이지 */}
      {start > 1 && (
        <>
          <Link href={getPageUrl(1)} className="px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100">
            1
          </Link>
          {start > 2 && <span className="px-2 text-slate-400">...</span>}
        </>
      )}

      {/* 페이지 번호 */}
      {pages.map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={`px-3 py-2 rounded-lg text-sm font-medium ${
            page === currentPage
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}

      {/* 마지막 페이지 */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-2 text-slate-400">...</span>}
          <Link href={getPageUrl(totalPages)} className="px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100">
            {totalPages}
          </Link>
        </>
      )}

      {/* 다음 버튼 */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
          aria-label="다음 페이지"
        >
          다음 &rarr;
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-slate-300">다음 &rarr;</span>
      )}
    </nav>
  );
}
