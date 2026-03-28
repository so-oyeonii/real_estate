// --- 공통 유틸리티 함수 ---
// 가격 포맷, 면적 변환 등 여러 곳에서 재사용하는 함수 모음

import type { PropertyRow } from '@/types/property';
import type { Property } from '@/types/property';
import type { InquiryRow } from '@/types/inquiry';
import type { Inquiry } from '@/types/inquiry';

/**
 * 가격을 한국식으로 포맷한다
 * 예: 10000 → "1억", 50000 → "5억", 1500 → "1,500만"
 */
export function formatPrice(price: number | null): string {
  if (price === null || price === undefined) return '-';
  if (price === 0) return '0';

  // 억 단위 처리
  if (price >= 10000) {
    const billions = Math.floor(price / 10000);
    const remainder = price % 10000;
    if (remainder === 0) {
      return `${billions}억`;
    }
    return `${billions}억 ${remainder.toLocaleString('ko-KR')}만`;
  }

  return `${price.toLocaleString('ko-KR')}만`;
}

/**
 * 거래 정보를 한 줄로 요약한다
 * 예: "월세 1,000/50", "전세 2억", "매매 15억"
 */
export function formatTransactionSummary(property: Property): string {
  switch (property.transactionType) {
    case 'monthly':
      return `월세 ${formatPrice(property.deposit)}/${formatPrice(property.monthlyRent)}`;
    case 'jeonse':
      return `전세 ${formatPrice(property.deposit)}`;
    case 'sale':
      return `매매 ${formatPrice(property.salePrice)}`;
    default:
      return '-';
  }
}

/**
 * ㎡를 평으로 변환한다 (1평 = 3.3058㎡)
 */
export function sqmToPyeong(sqm: number): number {
  return Math.round(sqm / 3.3058 * 10) / 10;
}

/**
 * 면적을 "전용 99㎡ (30평)" 형태로 포맷한다
 */
export function formatArea(areaSqm: number | null): string {
  if (areaSqm === null || areaSqm === undefined) return '-';
  const pyeong = sqmToPyeong(areaSqm);
  return `${areaSqm}㎡ (${pyeong}평)`;
}

/**
 * 거래유형 한글 변환
 */
export function getTransactionLabel(type: string): string {
  const labels: Record<string, string> = {
    monthly: '월세',
    jeonse: '전세',
    sale: '매매',
  };
  return labels[type] || type;
}

/**
 * 매물유형 한글 변환
 */
export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    office: '사무실',
    store: '상가',
    building: '빌딩',
  };
  return labels[type] || type;
}

/**
 * 매물 상태 한글 변환
 */
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    active: '공개중',
    reserved: '예약중',
    closed: '거래완료',
  };
  return labels[status] || status;
}

/**
 * 날짜를 "2026.03.28" 형태로 포맷한다
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\. /g, '.').replace(/\.$/, '');
}

/**
 * DB 응답(스네이크 케이스)을 프론트엔드용(카멜 케이스)으로 변환
 * Supabase는 스네이크 케이스로 데이터를 반환하지만,
 * 프론트엔드에서는 카멜 케이스를 사용하므로 변환이 필요하다
 */
export function mapPropertyRowToProperty(row: PropertyRow): Property {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    propertyType: row.property_type,
    transactionType: row.transaction_type,
    deposit: row.deposit,
    monthlyRent: row.monthly_rent,
    salePrice: row.sale_price,
    maintenanceFee: row.maintenance_fee,
    maintenanceIncludes: row.maintenance_includes || [],
    address: row.address,
    city: row.city,
    district: row.district,
    dong: row.dong,
    latitude: row.latitude,
    longitude: row.longitude,
    nearestStation: row.nearest_station,
    areaTotal: row.area_total,
    areaExclusive: row.area_exclusive,
    floor: row.floor,
    totalFloors: row.total_floors,
    rooms: row.rooms,
    direction: row.direction,
    parking: row.parking,
    parkingCount: row.parking_count,
    elevator: row.elevator,
    heatingType: row.heating_type,
    airConditioning: row.air_conditioning,
    availableDate: row.available_date,
    builtYear: row.built_year,
    status: row.status,
    isFeatured: row.is_featured,
    tags: row.tags || [],
    viewCount: row.view_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    createdBy: row.created_by,
  };
}

/**
 * DB 문의 응답을 프론트엔드용으로 변환
 */
export function mapInquiryRowToInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    propertyId: row.property_id,
    inquiryType: row.inquiry_type,
    name: row.name,
    phone: row.phone,
    email: row.email,
    company: row.company,
    message: row.message,
    preferredArea: row.preferred_area,
    preferredBudget: row.preferred_budget,
    status: row.status,
    adminNote: row.admin_note,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
