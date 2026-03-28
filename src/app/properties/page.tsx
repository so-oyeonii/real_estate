// --- 매물 목록 페이지 ---
// URL 쿼리 파라미터로 필터를 받아 매물을 검색/표시한다
// 서버 컴포넌트에서 데이터를 가져오고, 필터는 클라이언트 컴포넌트로 분리

import type { Metadata } from 'next';
import { getProperties } from '@/lib/properties';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyFilterBar from '@/components/property/PropertyFilterBar';
import Pagination from '@/components/ui/Pagination';
import { getTransactionLabel } from '@/lib/utils';
import PublicLayout from '@/components/layout/PublicLayout';
import type { PropertyFilter } from '@/types/property';

export const metadata: Metadata = {
  title: '매물 검색',
  description: '서울 주요 업무지구 사무실 임대, 매매 매물을 검색하세요.',
};

// Next.js App Router에서 URL 쿼리 파라미터를 받는 방식
interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // URL 쿼리 파라미터 → 필터 객체로 변환
  const filters: PropertyFilter = {
    propertyType: params.propertyType as PropertyFilter['propertyType'],
    transactionType: params.transactionType as PropertyFilter['transactionType'],
    district: params.district,
    dong: params.dong,
    minArea: params.minArea ? Number(params.minArea) : undefined,
    maxArea: params.maxArea ? Number(params.maxArea) : undefined,
    minDeposit: params.minDeposit ? Number(params.minDeposit) : undefined,
    maxDeposit: params.maxDeposit ? Number(params.maxDeposit) : undefined,
    parking: params.parking === 'true' ? true : undefined,
    elevator: params.elevator === 'true' ? true : undefined,
    sortBy: (params.sortBy as PropertyFilter['sortBy']) || 'latest',
    page: params.page ? Number(params.page) : 1,
    limit: 12,
  };

  // 서버에서 매물 데이터 가져오기
  const result = await getProperties(filters);

  // 현재 필터 설명 텍스트 생성
  const filterDescription = [
    filters.transactionType && getTransactionLabel(filters.transactionType),
    filters.district,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 페이지 제목 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          매물 검색
          {filterDescription && (
            <span className="text-[var(--color-primary)]"> · {filterDescription}</span>
          )}
        </h1>
        <p className="mt-1 text-slate-500">
          총 <span className="font-semibold text-slate-700">{result.totalCount}개</span> 매물
        </p>
      </div>

      {/* 필터 바 */}
      <PropertyFilterBar />

      {/* 매물 카드 그리드 */}
      {result.data.length > 0 ? (
        <>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {result.data.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* 페이지네이션 */}
          {result.totalPages > 1 && (
            <Pagination
              currentPage={result.page}
              totalPages={result.totalPages}
              baseUrl="/properties"
              searchParams={params}
            />
          )}
        </>
      ) : (
        /* 검색 결과 없음 */
        <div className="mt-12 text-center py-16">
          <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-slate-600">
            조건에 맞는 매물이 없습니다
          </h3>
          <p className="mt-2 text-slate-400">
            검색 조건을 변경하거나, 문의를 남겨주시면 맞춤 매물을 찾아드립니다.
          </p>
        </div>
      )}
    </div>
    </PublicLayout>
  );
}
