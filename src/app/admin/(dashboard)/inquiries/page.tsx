// --- 관리자 문의 목록 ---
// 접수된 문의를 테이블로 보여주고, 상태 변경/메모 작성을 할 수 있다

import { createClient } from '@/lib/supabase/server';
import InquiryStatusChanger from '@/components/forms/InquiryStatusChanger';

export default async function AdminInquiriesPage() {
  const supabase = await createClient();

  // 문의 목록 조회 (최신순)
  const { data: inquiries } = await supabase
    .from('inquiries')
    .select(`
      id, name, phone, email, company, message, inquiry_type, status,
      admin_note, preferred_area, preferred_budget, created_at, property_id
    `)
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">문의 관리</h1>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {inquiries && inquiries.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="p-5 hover:bg-slate-50">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* 문의 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-slate-800">{inquiry.name}</span>
                      <span className="text-sm text-slate-500">{inquiry.phone}</span>
                      <span className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${
                        inquiry.inquiry_type === 'property' ? 'bg-blue-100 text-blue-700' :
                        inquiry.inquiry_type === 'quick' ? 'bg-purple-100 text-purple-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {inquiry.inquiry_type === 'property' ? '매물문의' :
                         inquiry.inquiry_type === 'quick' ? '간편상담' : '일반문의'}
                      </span>
                    </div>

                    {inquiry.company && (
                      <p className="text-sm text-slate-500 mb-1">회사: {inquiry.company}</p>
                    )}
                    {inquiry.email && (
                      <p className="text-sm text-slate-500 mb-1">이메일: {inquiry.email}</p>
                    )}
                    {(inquiry.preferred_area || inquiry.preferred_budget) && (
                      <p className="text-sm text-slate-500 mb-1">
                        {inquiry.preferred_area && `희망면적: ${inquiry.preferred_area}`}
                        {inquiry.preferred_area && inquiry.preferred_budget && ' · '}
                        {inquiry.preferred_budget && `예산: ${inquiry.preferred_budget}`}
                      </p>
                    )}
                    {inquiry.message && (
                      <p className="text-sm text-slate-600 mt-2 bg-slate-50 rounded-lg p-3">
                        {inquiry.message}
                      </p>
                    )}

                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(inquiry.created_at).toLocaleString('ko-KR')}
                    </p>
                  </div>

                  {/* 상태 변경 + 메모 */}
                  <div className="lg:w-72 shrink-0">
                    <InquiryStatusChanger
                      inquiryId={inquiry.id}
                      currentStatus={inquiry.status}
                      currentNote={inquiry.admin_note || ''}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-slate-400">
            접수된 문의가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
