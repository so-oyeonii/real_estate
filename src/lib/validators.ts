// --- Zod 입력값 검증 스키마 ---
// 모든 API 입력값은 여기서 정의한 스키마로 검증한다
// 클라이언트(폼)와 서버(API) 양쪽에서 동일하게 사용

import { z } from 'zod/v4';

// ===== 공통 검증 규칙 =====

/** 한국 휴대폰 번호 (01X-XXXX-XXXX 또는 01XXXXXXXXX) */
const phoneRegex = /^01[0-9]\d{7,8}$/;

// ===== 문의 관련 스키마 =====

/** 매물 문의 폼 (매물 상세 페이지에서 사용) */
export const propertyInquirySchema = z.object({
  propertyId: z.string().uuid('올바른 매물 ID가 아닙니다'),
  name: z
    .string()
    .min(1, '이름을 입력해주세요')
    .max(50, '이름은 50자 이내로 입력해주세요'),
  phone: z
    .string()
    .transform((val) => val.replace(/-/g, '')) // 하이픈 제거
    .pipe(z.string().regex(phoneRegex, '올바른 휴대폰 번호를 입력해주세요')),
  email: z
    .string()
    .email('올바른 이메일 주소를 입력해주세요')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .max(1000, '메시지는 1000자 이내로 입력해주세요')
    .optional(),
});

/** 일반 문의 폼 (문의 페이지에서 사용) */
export const generalInquirySchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요')
    .max(50, '이름은 50자 이내로 입력해주세요'),
  phone: z
    .string()
    .transform((val) => val.replace(/-/g, ''))
    .pipe(z.string().regex(phoneRegex, '올바른 휴대폰 번호를 입력해주세요')),
  email: z
    .string()
    .email('올바른 이메일 주소를 입력해주세요')
    .optional()
    .or(z.literal('')),
  company: z
    .string()
    .max(100, '회사명은 100자 이내로 입력해주세요')
    .optional(),
  preferredArea: z
    .string()
    .max(50)
    .optional(),
  preferredBudget: z
    .string()
    .max(50)
    .optional(),
  message: z
    .string()
    .max(1000, '메시지는 1000자 이내로 입력해주세요')
    .optional(),
});

/** 간편 상담 (메인 페이지 퀵 문의) */
export const quickInquirySchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요')
    .max(50),
  phone: z
    .string()
    .transform((val) => val.replace(/-/g, ''))
    .pipe(z.string().regex(phoneRegex, '올바른 휴대폰 번호를 입력해주세요')),
});

// ===== 매물 검색 필터 스키마 =====

/** 매물 목록 필터 (URL 쿼리 파라미터 검증) */
export const propertyFilterSchema = z.object({
  propertyType: z.enum(['office', 'store', 'building']).optional(),
  transactionType: z.enum(['monthly', 'jeonse', 'sale']).optional(),
  district: z.string().max(20).optional(),
  dong: z.string().max(20).optional(),
  minArea: z.coerce.number().min(0).optional(),
  maxArea: z.coerce.number().min(0).optional(),
  minDeposit: z.coerce.number().min(0).optional(),
  maxDeposit: z.coerce.number().min(0).optional(),
  minMonthlyRent: z.coerce.number().min(0).optional(),
  maxMonthlyRent: z.coerce.number().min(0).optional(),
  minSalePrice: z.coerce.number().min(0).optional(),
  maxSalePrice: z.coerce.number().min(0).optional(),
  parking: z.coerce.boolean().optional(),
  elevator: z.coerce.boolean().optional(),
  tags: z.string().optional(), // 쉼표로 구분된 태그 문자열
  sortBy: z
    .enum(['latest', 'price_asc', 'price_desc', 'area_asc', 'area_desc'])
    .optional()
    .default('latest'),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(12),
});

// ===== 관리자: 매물 등록/수정 스키마 =====

/** 매물 등록/수정 폼 검증 */
export const propertyFormSchema = z.object({
  title: z
    .string()
    .min(1, '매물 제목을 입력해주세요')
    .max(200, '제목은 200자 이내로 입력해주세요'),
  description: z.string().max(5000).optional(),

  propertyType: z.enum(['office', 'store', 'building'], {
    error: '매물 유형을 선택해주세요',
  }),
  transactionType: z.enum(['monthly', 'jeonse', 'sale'], {
    error: '거래 유형을 선택해주세요',
  }),

  // 가격 (만원 단위)
  deposit: z.coerce.number().min(0).optional(),
  monthlyRent: z.coerce.number().min(0).optional(),
  salePrice: z.coerce.number().min(0).optional(),
  maintenanceFee: z.coerce.number().min(0).optional(),
  maintenanceIncludes: z.array(z.string()).optional().default([]),

  // 위치
  address: z.string().min(1, '주소를 입력해주세요').max(300),
  city: z.string().min(1).max(20).default('서울특별시'),
  district: z.string().min(1, '구를 선택해주세요').max(20),
  dong: z.string().max(20).optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  nearestStation: z.string().max(100).optional(),

  // 스펙
  areaTotal: z.coerce.number().min(0).optional(),
  areaExclusive: z.coerce.number().min(0).optional(),
  floor: z.coerce.number().int().optional(),
  totalFloors: z.coerce.number().int().min(1).optional(),
  rooms: z.coerce.number().int().min(0).optional(),
  direction: z
    .enum(['동향', '서향', '남향', '북향', '남동향', '남서향', '북동향', '북서향'])
    .optional(),

  // 부가 정보
  parking: z.boolean().default(false),
  parkingCount: z.coerce.number().int().min(0).optional(),
  elevator: z.boolean().default(false),
  heatingType: z.string().max(20).optional(),
  airConditioning: z.boolean().default(true),
  availableDate: z.string().optional(),
  builtYear: z.coerce.number().int().min(1900).max(2030).optional(),

  // 상태
  status: z.enum(['active', 'reserved', 'closed']).default('active'),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).optional().default([]),
});

// ===== 관리자: 문의 상태 업데이트 스키마 =====

/** 문의 상태 변경 검증 */
export const inquiryUpdateSchema = z.object({
  status: z.enum(['pending', 'contacted', 'completed']).optional(),
  adminNote: z.string().max(1000).optional(),
});

// ===== 인증 스키마 =====

/** 관리자 로그인 검증 */
export const loginSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다'),
});

// ===== 타입 추출 (스키마에서 자동으로 타입 생성) =====
export type PropertyInquiryInput = z.infer<typeof propertyInquirySchema>;
export type GeneralInquiryInput = z.infer<typeof generalInquirySchema>;
export type QuickInquiryInput = z.infer<typeof quickInquirySchema>;
export type PropertyFilterInput = z.infer<typeof propertyFilterSchema>;
export type PropertyFormInput = z.infer<typeof propertyFormSchema>;
export type InquiryUpdateInput = z.infer<typeof inquiryUpdateSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
