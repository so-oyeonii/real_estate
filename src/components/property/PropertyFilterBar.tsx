// --- 매물 필터 바 ---
// 거래유형, 지역, 면적, 정렬 등의 필터를 제공한다
// URL 쿼리 파라미터를 변경하여 서버 컴포넌트가 다시 렌더링되도록 한다

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import {
  TRANSACTION_TYPE_OPTIONS,
  DISTRICT_OPTIONS,
  SORT_OPTIONS,
} from '@/config/constants';

export default function PropertyFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 필터 변경 시 URL 업데이트
  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      // 필터 변경 시 페이지를 1로 리셋
      params.delete('page');

      router.push(`/properties?${params.toString()}`);
    },
    [router, searchParams],
  );

  // 모든 필터 초기화
  const clearFilters = useCallback(() => {
    router.push('/properties');
  }, [router]);

  // 현재 활성 필터 개수 계산
  const activeFilterCount = ['transactionType', 'district', 'minArea', 'maxArea', 'parking', 'elevator']
    .filter((key) => searchParams.has(key))
    .length;

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
      {/* 거래 유형 */}
      <select
        value={searchParams.get('transactionType') || ''}
        onChange={(e) => updateFilter('transactionType', e.target.value)}
        className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700
                   focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      >
        <option value="">전체 거래유형</option>
        {TRANSACTION_TYPE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* 지역 */}
      <select
        value={searchParams.get('district') || ''}
        onChange={(e) => updateFilter('district', e.target.value)}
        className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700
                   focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      >
        <option value="">전체 지역</option>
        {DISTRICT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* 면적 */}
      <select
        value={searchParams.get('maxArea') || ''}
        onChange={(e) => updateFilter('maxArea', e.target.value)}
        className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700
                   focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      >
        <option value="">전체 면적</option>
        <option value="33">10평 이하</option>
        <option value="66">20평 이하</option>
        <option value="99">30평 이하</option>
        <option value="165">50평 이하</option>
        <option value="330">100평 이하</option>
      </select>

      {/* 주차 가능 */}
      <label className="flex items-center gap-1.5 text-sm text-slate-600 cursor-pointer">
        <input
          type="checkbox"
          checked={searchParams.get('parking') === 'true'}
          onChange={(e) => updateFilter('parking', e.target.checked ? 'true' : '')}
          className="w-4 h-4 rounded border-slate-300 text-[var(--color-primary)]
                     focus:ring-[var(--color-primary)]"
        />
        주차
      </label>

      {/* 정렬 */}
      <select
        value={searchParams.get('sortBy') || 'latest'}
        onChange={(e) => updateFilter('sortBy', e.target.value)}
        className="ml-auto px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700
                   focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* 필터 초기화 */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="px-3 py-2 text-sm text-slate-500 hover:text-slate-700 underline"
        >
          초기화 ({activeFilterCount})
        </button>
      )}
    </div>
  );
}
