// --- 문의 등록 API ---
// POST /api/inquiries
// 공개 API: 누구나 문의를 등록할 수 있다
// Zod로 입력값을 검증하고, Supabase에 저장한다

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { createClient } from '@/lib/supabase/server';

// 문의 등록 스키마 (3가지 유형 통합)
const inquirySchema = z.object({
  inquiryType: z.enum(['property', 'general', 'quick']).default('general'),
  propertyId: z.string().uuid().optional(),
  name: z.string().min(1, '이름을 입력해주세요').max(50),
  phone: z.string().min(10, '연락처를 입력해주세요').max(13),
  email: z.string().email().optional().or(z.literal('')),
  company: z.string().max(100).optional(),
  message: z.string().max(1000).optional(),
  preferredArea: z.string().max(50).optional(),
  preferredBudget: z.string().max(50).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // 1. 요청 본문 파싱
    const body = await request.json();

    // 2. 입력값 검증 (Zod)
    const validated = inquirySchema.parse(body);

    // 3. Supabase에 문의 저장
    const supabase = await createClient();

    const { error } = await supabase.from('inquiries').insert({
      inquiry_type: validated.inquiryType,
      property_id: validated.propertyId || null,
      name: validated.name,
      phone: validated.phone.replace(/-/g, ''),
      email: validated.email || null,
      company: validated.company || null,
      message: validated.message || null,
      preferred_area: validated.preferredArea || null,
      preferred_budget: validated.preferredBudget || null,
      status: 'pending',
    });

    if (error) {
      console.error('문의 저장 실패:', error);
      return NextResponse.json(
        { error: '문의 등록에 실패했습니다. 잠시 후 다시 시도해주세요.' },
        { status: 500 },
      );
    }

    // 4. 성공 응답
    return NextResponse.json(
      { message: '문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.' },
      { status: 201 },
    );
  } catch (err) {
    // Zod 검증 실패
    if (err instanceof z.ZodError) {
      const firstError = err.issues[0]?.message || '입력값을 확인해주세요';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    // 기타 에러 (내부 정보 노출 금지)
    console.error('문의 API 에러:', err);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 },
    );
  }
}
