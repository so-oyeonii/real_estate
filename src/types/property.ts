// --- 매물 관련 타입 정의 ---
// 매물(Property) 데이터의 구조를 TypeScript로 정의한다
// DB 테이블 구조와 1:1 매칭된다

/** 매물 유형 */
export type PropertyType = 'office' | 'store' | 'building';

/** 거래 유형 */
export type TransactionType = 'monthly' | 'jeonse' | 'sale';

/** 매물 상태 */
export type PropertyStatus = 'active' | 'reserved' | 'closed';

/** 방향 */
export type Direction = '동향' | '서향' | '남향' | '북향' | '남동향' | '남서향' | '북동향' | '북서향';

/** 매물 데이터 전체 (DB에서 가져온 그대로) */
export interface Property {
  id: string;                       // 매물 고유 ID (UUID)
  title: string;                    // 매물 제목
  description: string | null;       // 상세 설명

  // 분류
  propertyType: PropertyType;       // 유형 (사무실/상가/빌딩)
  transactionType: TransactionType; // 거래유형 (월세/전세/매매)

  // 가격 (만원 단위)
  deposit: number | null;           // 보증금
  monthlyRent: number | null;       // 월세
  salePrice: number | null;         // 매매가
  maintenanceFee: number | null;    // 관리비
  maintenanceIncludes: string[];    // 관리비 포함 항목

  // 위치
  address: string;                  // 전체 주소
  city: string;                     // 시/도
  district: string;                 // 구
  dong: string | null;              // 동
  latitude: number | null;          // 위도 (지도용)
  longitude: number | null;         // 경도 (지도용)
  nearestStation: string | null;    // 최근 역 정보

  // 사무실 스펙
  areaTotal: number | null;         // 공급 면적 (㎡)
  areaExclusive: number | null;     // 전용 면적 (㎡)
  floor: number | null;             // 해당 층
  totalFloors: number | null;       // 전체 층수
  rooms: number | null;             // 룸 수
  direction: Direction | null;      // 방향

  // 부가 정보
  parking: boolean;                 // 주차 가능 여부
  parkingCount: number | null;      // 주차 가능 대수
  elevator: boolean;                // 엘리베이터
  heatingType: string | null;       // 난방 종류
  airConditioning: boolean;         // 냉방
  availableDate: string | null;     // 입주 가능일 (ISO 날짜)
  builtYear: number | null;         // 건축 연도

  // 상태/관리
  status: PropertyStatus;           // 매물 상태
  isFeatured: boolean;              // 추천 매물 여부
  tags: string[];                   // 태그 목록
  viewCount: number;                // 조회수

  // 메타
  createdAt: string;                // 등록일 (ISO)
  updatedAt: string;                // 수정일 (ISO)
  createdBy: string | null;         // 등록자 ID
}

/** 매물 이미지 */
export interface PropertyImage {
  id: string;
  propertyId: string;               // 매물 ID
  imageUrl: string;                 // 이미지 URL
  altText: string | null;           // 대체 텍스트
  displayOrder: number;             // 표시 순서
  isPrimary: boolean;               // 대표 이미지 여부
  createdAt: string;
}

/** 매물 + 이미지 (목록에서 사용) */
export interface PropertyWithImages extends Property {
  images: PropertyImage[];
}

/** 매물 목록 필터 조건 */
export interface PropertyFilter {
  propertyType?: PropertyType;      // 유형 필터
  transactionType?: TransactionType;// 거래유형 필터
  district?: string;                // 구 필터
  dong?: string;                    // 동 필터
  minArea?: number;                 // 최소 면적 (㎡)
  maxArea?: number;                 // 최대 면적 (㎡)
  minDeposit?: number;              // 최소 보증금 (만원)
  maxDeposit?: number;              // 최대 보증금 (만원)
  minMonthlyRent?: number;          // 최소 월세
  maxMonthlyRent?: number;          // 최대 월세
  minSalePrice?: number;            // 최소 매매가
  maxSalePrice?: number;            // 최대 매매가
  parking?: boolean;                // 주차 필터
  elevator?: boolean;               // 엘리베이터 필터
  tags?: string[];                  // 태그 필터
  sortBy?: 'latest' | 'price_asc' | 'price_desc' | 'area_asc' | 'area_desc';
  page?: number;                    // 페이지 번호
  limit?: number;                   // 페이지당 개수
}

/** DB 스네이크 케이스 → 카멜 케이스 변환용 (Supabase 응답) */
export interface PropertyRow {
  id: string;
  title: string;
  description: string | null;
  property_type: PropertyType;
  transaction_type: TransactionType;
  deposit: number | null;
  monthly_rent: number | null;
  sale_price: number | null;
  maintenance_fee: number | null;
  maintenance_includes: string[];
  address: string;
  city: string;
  district: string;
  dong: string | null;
  latitude: number | null;
  longitude: number | null;
  nearest_station: string | null;
  area_total: number | null;
  area_exclusive: number | null;
  floor: number | null;
  total_floors: number | null;
  rooms: number | null;
  direction: Direction | null;
  parking: boolean;
  parking_count: number | null;
  elevator: boolean;
  heating_type: string | null;
  air_conditioning: boolean;
  available_date: string | null;
  built_year: number | null;
  status: PropertyStatus;
  is_featured: boolean;
  tags: string[];
  view_count: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}
