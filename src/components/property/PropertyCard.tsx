// --- 매물 카드 컴포넌트 ---
// 매물 목록에서 각 매물의 요약 정보를 보여주는 카드
// 사진, 가격, 위치, 면적 등 핵심 정보를 한눈에 확인할 수 있다

import Link from 'next/link';
import Image from 'next/image';
import type { PropertyWithPrimaryImage } from '@/types/property';
import { formatTransactionSummary, formatArea, getPropertyTypeLabel } from '@/lib/utils';

interface PropertyCardProps {
  property: PropertyWithPrimaryImage;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block bg-white rounded-xl border border-slate-200 overflow-hidden
                 hover:shadow-lg hover:border-slate-300 transition-all duration-200"
    >
      {/* 이미지 영역 */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        {property.primaryImageUrl ? (
          <Image
            src={property.primaryImageUrl}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}

        {/* 배지 (추천, 태그) */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {property.isFeatured && (
            <span className="px-2 py-0.5 bg-[var(--color-secondary)] text-white text-xs font-bold rounded">
              추천
            </span>
          )}
          {property.tags.includes('신축') && (
            <span className="px-2 py-0.5 bg-[var(--color-success)] text-white text-xs font-bold rounded">
              신축
            </span>
          )}
          {property.tags.includes('급매') && (
            <span className="px-2 py-0.5 bg-[var(--color-error)] text-white text-xs font-bold rounded">
              급매
            </span>
          )}
        </div>

        {/* 매물 유형 배지 */}
        <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 text-white text-xs rounded">
          {getPropertyTypeLabel(property.propertyType)}
        </span>
      </div>

      {/* 정보 영역 */}
      <div className="p-4">
        {/* 가격 (가장 중요한 정보, 크게 표시) */}
        <p className="text-lg font-bold text-[var(--color-primary)]">
          {formatTransactionSummary(property)}
        </p>

        {/* 매물 제목 */}
        <h3 className="mt-1 text-sm font-medium text-slate-800 truncate group-hover:text-[var(--color-primary)] transition-colors">
          {property.title}
        </h3>

        {/* 위치 */}
        <p className="mt-1 text-sm text-slate-500">
          {property.district} {property.dong}
        </p>

        {/* 스펙 한 줄 요약 */}
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
          {property.areaExclusive && (
            <span>전용 {formatArea(property.areaExclusive)}</span>
          )}
          {property.floor && (
            <>
              <span className="text-slate-300">·</span>
              <span>{property.floor}층/{property.totalFloors}층</span>
            </>
          )}
          {property.direction && (
            <>
              <span className="text-slate-300">·</span>
              <span>{property.direction}</span>
            </>
          )}
        </div>

        {/* 부가 정보 아이콘 */}
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
          {property.parking && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 20h22M6 20v-4m12 4v-4" />
              </svg>
              주차
            </span>
          )}
          {property.elevator && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M12 3v18" />
              </svg>
              EV
            </span>
          )}
          {property.maintenanceFee !== null && property.maintenanceFee > 0 && (
            <span>관리비 {property.maintenanceFee}만</span>
          )}
        </div>
      </div>
    </Link>
  );
}
