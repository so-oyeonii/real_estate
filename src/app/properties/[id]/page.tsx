// --- 매물 상세 페이지 ---
// 매물의 이미지, 상세 정보, 위치 지도, 문의 폼을 표시한다
// 동적 메타데이터로 SEO 최적화

import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPropertyById } from '@/lib/properties';
import {
  formatTransactionSummary,
  formatArea,
  formatPrice,
  formatDate,
  getTransactionLabel,
  getPropertyTypeLabel,
  getStatusLabel,
} from '@/lib/utils';
import PropertyInquiryForm from '@/components/forms/PropertyInquiryForm';
import PublicLayout from '@/components/layout/PublicLayout';

interface PageProps {
  params: Promise<{ id: string }>;
}

// 동적 SEO 메타데이터 (매물마다 다른 제목/설명)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) return { title: '매물을 찾을 수 없습니다' };

  return {
    title: `${property.title} | ${property.district} ${getPropertyTypeLabel(property.propertyType)}`,
    description: `${property.district} ${property.dong || ''} ${getPropertyTypeLabel(property.propertyType)}, ${formatTransactionSummary(property)}. 전용 ${formatArea(property.areaExclusive)}`,
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  // JSON-LD 구조화 데이터 (검색엔진이 매물 정보를 이해할 수 있게)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description || '',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/properties/${property.id}`,
    datePosted: property.createdAt,
    ...(property.transactionType === 'sale' && property.salePrice && {
      offers: {
        '@type': 'Offer',
        price: property.salePrice * 10000, // 만원 → 원
        priceCurrency: 'KRW',
      },
    }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.district,
      addressRegion: property.city,
      addressCountry: 'KR',
    },
    ...(property.latitude && property.longitude && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: property.latitude,
        longitude: property.longitude,
      },
    }),
  };

  return (
    <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* JSON-LD 구조화 데이터 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* 왼쪽: 매물 정보 (2/3 너비) */}
        <div className="lg:col-span-2 space-y-8">

          {/* 이미지 갤러리 */}
          {property.images.length > 0 ? (
            <div className="space-y-2">
              {/* 대표 이미지 (크게) */}
              <div className="relative aspect-[16/9] bg-slate-100 rounded-2xl overflow-hidden">
                <Image
                  src={property.images[0].imageUrl}
                  alt={property.images[0].altText || property.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
              {/* 서브 이미지 (작게, 가로 나열) */}
              {property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {property.images.slice(1).map((img, i) => (
                    <div key={img.id} className="relative aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden">
                      <Image
                        src={img.imageUrl}
                        alt={img.altText || `${property.title} 사진 ${i + 2}`}
                        fill
                        className="object-cover hover:opacity-90 transition-opacity"
                        sizes="(max-width: 1024px) 25vw, 16vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-[16/9] bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="text-center text-slate-400">
                <svg className="w-20 h-20 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-sm">매물 사진</p>
              </div>
            </div>
          )}

          {/* 가격 + 핵심 요약 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-blue-100 text-[var(--color-primary)] text-xs font-semibold rounded-full mb-3">
                  {getTransactionLabel(property.transactionType)} · {getPropertyTypeLabel(property.propertyType)}
                </span>
                <h1 className="text-2xl font-bold text-slate-900">{property.title}</h1>
                <p className="mt-1 text-slate-500">{property.address}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                property.status === 'active' ? 'bg-green-100 text-green-700' :
                property.status === 'reserved' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {getStatusLabel(property.status)}
              </span>
            </div>

            <div className="mt-4 text-3xl font-bold text-[var(--color-primary)]">
              {formatTransactionSummary(property)}
            </div>

            {property.maintenanceFee !== null && property.maintenanceFee > 0 && (
              <p className="mt-1 text-sm text-slate-500">
                관리비 월 {formatPrice(property.maintenanceFee)}
                {property.maintenanceIncludes.length > 0 && (
                  <span className="text-slate-400"> ({property.maintenanceIncludes.join(', ')} 포함)</span>
                )}
              </p>
            )}
          </div>

          {/* 상세 정보 테이블 */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">상세 정보</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
              <InfoItem label="매물 유형" value={getPropertyTypeLabel(property.propertyType)} />
              <InfoItem label="거래 유형" value={getTransactionLabel(property.transactionType)} />
              <InfoItem label="전용 면적" value={formatArea(property.areaExclusive)} />
              <InfoItem label="공급 면적" value={formatArea(property.areaTotal)} />
              <InfoItem label="해당 층" value={property.floor ? `${property.floor}층 / ${property.totalFloors}층` : '-'} />
              <InfoItem label="방향" value={property.direction || '-'} />
              <InfoItem label="룸 수" value={property.rooms ? `${property.rooms}개` : '-'} />
              <InfoItem label="건축 연도" value={property.builtYear ? `${property.builtYear}년` : '-'} />
              <InfoItem label="입주 가능일" value={property.availableDate ? formatDate(property.availableDate) : '즉시 입주'} />
              <InfoItem label="난방" value={property.heatingType || '-'} />
              <InfoItem label="주차" value={property.parking ? `가능 (${property.parkingCount || '-'}대)` : '불가'} />
              <InfoItem label="엘리베이터" value={property.elevator ? '있음' : '없음'} />
            </div>
          </div>

          {/* 설명 */}
          {property.description && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">매물 설명</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>
          )}

          {/* 교통 정보 */}
          {property.nearestStation && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">교통 정보</h2>
              <div className="flex items-center gap-2 text-slate-600">
                <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {property.nearestStation}
              </div>
            </div>
          )}

          {/* 구글맵 (iframe) */}
          {property.latitude && property.longitude && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">위치</h2>
              <div className="aspect-[16/9] rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=16&output=embed`}
                  title={`${property.title} 위치 지도`}
                  allowFullScreen
                />
              </div>
              <p className="mt-2 text-sm text-slate-500">{property.address}</p>
            </div>
          )}

          {/* 태그 */}
          {property.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {property.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 메타 정보 */}
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>등록일: {formatDate(property.createdAt)}</span>
            <span>조회수: {property.viewCount}</span>
          </div>
        </div>

        {/* 오른쪽: 문의 폼 (1/3 너비, 데스크탑에서 sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <PropertyInquiryForm
              propertyId={property.id}
              propertyTitle={property.title}
            />
          </div>
        </div>
      </div>
    </div>
    </PublicLayout>
  );
}

// 상세 정보 한 줄 컴포넌트
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-slate-400 mb-0.5">{label}</dt>
      <dd className="text-sm font-medium text-slate-800">{value}</dd>
    </div>
  );
}
