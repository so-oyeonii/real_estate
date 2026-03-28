// --- 에러 페이지 ---
// 서버 에러 등 예상치 못한 오류 발생 시 표시
// 내부 에러 정보는 사용자에게 노출하지 않는다

'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-5xl font-bold text-slate-300">오류</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          문제가 발생했습니다
        </h1>
        <p className="mt-2 text-slate-500">
          잠시 후 다시 시도해주세요. 문제가 계속되면 문의해주세요.
        </p>
        <button
          onClick={reset}
          className="mt-6 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-dark)]"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
