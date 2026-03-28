// --- 관리자 매물 목록 ---
// 등록된 매물을 테이블로 보여주고, 등록/수정/삭제를 할 수 있다

import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getPropertyTypeLabel, getTransactionLabel, getStatusLabel, formatPrice } from '@/lib/utils';
import AdminPropertyActions from '@/components/property/AdminPropertyActions';

export default async function AdminPropertiesPage() {
  const supabase = await createClient();

  const { data: properties } = await supabase
    .from('properties')
    .select('id, title, property_type, transaction_type, deposit, monthly_rent, sale_price, district, dong, area_exclusive, status, is_featured, created_at')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">매물 관리</h1>
        <Link
          href="/admin/properties/new"
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium
                     hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          + 새 매물 등록
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">매물명</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">유형</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">가격</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">위치</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">면적</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">상태</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties?.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {p.is_featured && (
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded">추천</span>
                      )}
                      <Link href={`/admin/properties/${p.id}`} className="font-medium text-slate-800 hover:text-[var(--color-primary)] max-w-[200px] truncate block">
                        {p.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {getTransactionLabel(p.transaction_type)} · {getPropertyTypeLabel(p.property_type)}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {p.transaction_type === 'sale'
                      ? formatPrice(p.sale_price)
                      : p.transaction_type === 'jeonse'
                        ? formatPrice(p.deposit)
                        : `${formatPrice(p.deposit)}/${formatPrice(p.monthly_rent)}`
                    }
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.district} {p.dong}</td>
                  <td className="px-4 py-3 text-slate-600">{p.area_exclusive ? `${p.area_exclusive}㎡` : '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      p.status === 'active' ? 'bg-green-100 text-green-700' :
                      p.status === 'reserved' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {getStatusLabel(p.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <AdminPropertyActions propertyId={p.id} currentStatus={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {(!properties || properties.length === 0) && (
          <div className="px-6 py-12 text-center text-slate-400">
            등록된 매물이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
