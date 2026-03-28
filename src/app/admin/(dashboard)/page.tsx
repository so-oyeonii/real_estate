// --- 관리자 대시보드 ---
// 매물 통계, 최근 문의 등 관리 현황을 한눈에 보여준다

import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // 매물 통계 조회
  const { count: totalProperties } = await supabase
    .from('properties').select('*', { count: 'exact', head: true });
  const { count: activeProperties } = await supabase
    .from('properties').select('*', { count: 'exact', head: true }).eq('status', 'active');
  const { count: reservedProperties } = await supabase
    .from('properties').select('*', { count: 'exact', head: true }).eq('status', 'reserved');

  // 문의 통계 조회
  const { count: totalInquiries } = await supabase
    .from('inquiries').select('*', { count: 'exact', head: true });
  const { count: pendingInquiries } = await supabase
    .from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'pending');

  // 최근 문의 5건
  const { data: recentInquiries } = await supabase
    .from('inquiries')
    .select('id, name, phone, inquiry_type, status, created_at, property_id')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">대시보드</h1>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="전체 매물" value={totalProperties || 0} color="blue" />
        <StatCard label="공개중" value={activeProperties || 0} color="green" />
        <StatCard label="예약중" value={reservedProperties || 0} color="yellow" />
        <StatCard label="대기 문의" value={pendingInquiries || 0} color="red" />
      </div>

      {/* 최근 문의 */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">최근 문의</h2>
        </div>

        {recentInquiries && recentInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">이름</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">연락처</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">유형</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">상태</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">접수일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium text-slate-800">{inquiry.name}</td>
                    <td className="px-6 py-3 text-slate-600">{inquiry.phone}</td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                        {inquiry.inquiry_type === 'property' ? '매물' : inquiry.inquiry_type === 'quick' ? '간편' : '일반'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        inquiry.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {inquiry.status === 'pending' ? '대기' : inquiry.status === 'contacted' ? '연락완료' : '완료'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-slate-500">
                      {new Date(inquiry.created_at).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-8 text-center text-slate-400">
            아직 접수된 문의가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

// 통계 카드 컴포넌트
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className={`rounded-xl border p-5 ${colorMap[color]}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
