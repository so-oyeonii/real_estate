// --- 공통 타입 정의 ---
// 여러 곳에서 재사용하는 범용 타입

/** API 응답 형태 (성공) */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/** API 응답 형태 (목록 + 페이지네이션) */
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;              // 전체 개수
  page: number;                    // 현재 페이지
  limit: number;                   // 페이지당 개수
  totalPages: number;              // 전체 페이지 수
}

/** API 에러 응답 */
export interface ApiError {
  error: string;                   // 사용자에게 보여줄 에러 메시지
  code?: string;                   // 에러 코드 (선택)
}

/** 관리자 프로필 */
export interface AdminProfile {
  id: string;
  name: string;
  role: 'admin' | 'super_admin';
  phone: string | null;
  createdAt: string;
}

/** 셀렉트 옵션 (드롭다운에서 사용) */
export interface SelectOption {
  label: string;                   // 화면에 표시할 텍스트
  value: string;                   // 실제 값
}
