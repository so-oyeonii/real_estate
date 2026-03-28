// --- 상수 정의 ---
// 사이트 전반에서 사용하는 고정값 모음
// 드롭다운 옵션, 지역 목록, 태그 목록 등

import type { SelectOption } from '@/types/common';

/** 사이트 기본 정보 */
export const SITE_CONFIG = {
  name: '오피스너',
  description: '서울 주요 업무지구 사무실 임대·매매 전문',
  phone: '02-1234-5678',
  email: 'info@officener.co.kr',
  address: '서울특별시 강남구 테헤란로 123, 4층',
} as const;

/** 매물 유형 옵션 */
export const PROPERTY_TYPE_OPTIONS: SelectOption[] = [
  { label: '사무실', value: 'office' },
  { label: '상가', value: 'store' },
  { label: '빌딩', value: 'building' },
];

/** 거래 유형 옵션 */
export const TRANSACTION_TYPE_OPTIONS: SelectOption[] = [
  { label: '월세', value: 'monthly' },
  { label: '전세', value: 'jeonse' },
  { label: '매매', value: 'sale' },
];

/** 서울 주요 업무지구 (구 단위) */
export const DISTRICT_OPTIONS: SelectOption[] = [
  { label: '강남구', value: '강남구' },
  { label: '서초구', value: '서초구' },
  { label: '마포구', value: '마포구' },
  { label: '영등포구', value: '영등포구' },
  { label: '종로구', value: '종로구' },
  { label: '중구', value: '중구' },
  { label: '성동구', value: '성동구' },
  { label: '구로구', value: '구로구' },
];

/** 구별 동 목록 (검색 필터용) */
export const DONG_BY_DISTRICT: Record<string, SelectOption[]> = {
  강남구: [
    { label: '역삼동', value: '역삼동' },
    { label: '삼성동', value: '삼성동' },
    { label: '논현동', value: '논현동' },
    { label: '대치동', value: '대치동' },
    { label: '청담동', value: '청담동' },
  ],
  서초구: [
    { label: '서초동', value: '서초동' },
    { label: '반포동', value: '반포동' },
    { label: '잠원동', value: '잠원동' },
    { label: '양재동', value: '양재동' },
  ],
  마포구: [
    { label: '상암동', value: '상암동' },
    { label: '합정동', value: '합정동' },
    { label: '서교동', value: '서교동' },
    { label: '연남동', value: '연남동' },
  ],
  영등포구: [
    { label: '여의도동', value: '여의도동' },
    { label: '영등포동', value: '영등포동' },
    { label: '당산동', value: '당산동' },
  ],
  종로구: [
    { label: '종로1가', value: '종로1가' },
    { label: '관철동', value: '관철동' },
    { label: '세종로', value: '세종로' },
    { label: '내수동', value: '내수동' },
  ],
  중구: [
    { label: '을지로동', value: '을지로동' },
    { label: '명동', value: '명동' },
    { label: '남대문로', value: '남대문로' },
    { label: '충무로', value: '충무로' },
  ],
  성동구: [
    { label: '성수동1가', value: '성수동1가' },
    { label: '성수동2가', value: '성수동2가' },
    { label: '뚝섬로', value: '뚝섬로' },
  ],
  구로구: [
    { label: '가산동', value: '가산동' },
    { label: '구로동', value: '구로동' },
    { label: '디지털로', value: '디지털로' },
  ],
};

/** 매물 정렬 옵션 */
export const SORT_OPTIONS: SelectOption[] = [
  { label: '최신순', value: 'latest' },
  { label: '가격 낮은순', value: 'price_asc' },
  { label: '가격 높은순', value: 'price_desc' },
  { label: '면적 넓은순', value: 'area_desc' },
  { label: '면적 좁은순', value: 'area_asc' },
];

/** 매물 태그 목록 */
export const TAG_OPTIONS: SelectOption[] = [
  { label: '역세권', value: '역세권' },
  { label: '신축', value: '신축' },
  { label: '주차가능', value: '주차가능' },
  { label: '인테리어', value: '인테리어' },
  { label: '전층사용', value: '전층사용' },
  { label: '코너자리', value: '코너자리' },
  { label: '대로변', value: '대로변' },
  { label: '급매', value: '급매' },
  { label: '추천', value: '추천' },
];

/** 관리비 포함 항목 옵션 */
export const MAINTENANCE_INCLUDES_OPTIONS: SelectOption[] = [
  { label: '수도', value: '수도' },
  { label: '전기', value: '전기' },
  { label: '인터넷', value: '인터넷' },
  { label: '냉난방', value: '냉난방' },
  { label: '청소', value: '청소' },
  { label: '경비', value: '경비' },
  { label: '주차', value: '주차' },
];

/** 페이지당 매물 수 (기본값) */
export const DEFAULT_PAGE_SIZE = 12;

/** 매물 상태 배지 색상 */
export const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  reserved: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-gray-100 text-gray-600',
};
