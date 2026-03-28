// --- 문의 관련 타입 정의 ---
// 문의(Inquiry) 데이터의 구조를 정의한다

/** 문의 유형 */
export type InquiryType = 'property' | 'general' | 'quick';

/** 문의 상태 */
export type InquiryStatus = 'pending' | 'contacted' | 'completed';

/** 문의 데이터 (프론트엔드용 카멜 케이스) */
export interface Inquiry {
  id: string;
  propertyId: string | null;       // 매물 문의인 경우 매물 ID
  inquiryType: InquiryType;        // 문의 유형
  name: string;                    // 문의자 이름
  phone: string;                   // 연락처
  email: string | null;            // 이메일 (선택)
  company: string | null;          // 회사명 (선택)
  message: string | null;          // 문의 내용
  preferredArea: string | null;    // 희망 면적
  preferredBudget: string | null;  // 희망 예산 범위
  status: InquiryStatus;           // 문의 상태
  adminNote: string | null;        // 관리자 메모
  createdAt: string;               // 접수일
  updatedAt: string;               // 수정일
}

/** DB 스네이크 케이스 (Supabase 응답용) */
export interface InquiryRow {
  id: string;
  property_id: string | null;
  inquiry_type: InquiryType;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  message: string | null;
  preferred_area: string | null;
  preferred_budget: string | null;
  status: InquiryStatus;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}
