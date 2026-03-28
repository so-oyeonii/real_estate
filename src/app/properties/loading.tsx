// --- 매물 목록 로딩 UI ---
// 매물 데이터를 가져오는 동안 표시되는 스켈레톤 UI

export default function PropertiesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 제목 스켈레톤 */}
      <div className="mb-6">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="h-5 w-24 bg-slate-100 rounded animate-pulse mt-2" />
      </div>

      {/* 필터 스켈레톤 */}
      <div className="h-14 bg-slate-100 rounded-xl animate-pulse mb-6" />

      {/* 카드 그리드 스켈레톤 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="aspect-[4/3] bg-slate-200 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-48 bg-slate-100 rounded animate-pulse" />
              <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
