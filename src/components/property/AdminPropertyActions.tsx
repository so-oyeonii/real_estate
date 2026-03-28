// --- 관리자 매물 액션 버튼 ---
// 매물 목록 테이블에서 수정/삭제/상태변경 버튼

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface AdminPropertyActionsProps {
  propertyId: string;
  currentStatus: string;
}

export default function AdminPropertyActions({ propertyId, currentStatus }: AdminPropertyActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // 매물 삭제
  async function handleDelete() {
    if (!confirm('정말 이 매물을 삭제하시겠습니까?\n삭제된 매물은 복구할 수 없습니다.')) return;

    setIsDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('properties').delete().eq('id', propertyId);
      if (error) throw error;
      router.refresh();
    } catch {
      alert('매물 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  }

  // 상태 변경
  async function handleStatusChange(newStatus: string) {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('properties')
        .update({ status: newStatus })
        .eq('id', propertyId);
      if (error) throw error;
      router.refresh();
    } catch {
      alert('상태 변경에 실패했습니다.');
    }
  }

  return (
    <div className="flex items-center gap-1">
      {/* 수정 */}
      <Link
        href={`/admin/properties/${propertyId}`}
        className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
      >
        수정
      </Link>

      {/* 상태 변경 */}
      {currentStatus === 'active' && (
        <button
          onClick={() => handleStatusChange('reserved')}
          className="px-2 py-1 text-xs text-yellow-600 hover:bg-yellow-50 rounded"
        >
          예약
        </button>
      )}
      {currentStatus === 'reserved' && (
        <button
          onClick={() => handleStatusChange('closed')}
          className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded"
        >
          마감
        </button>
      )}
      {currentStatus !== 'active' && (
        <button
          onClick={() => handleStatusChange('active')}
          className="px-2 py-1 text-xs text-green-600 hover:bg-green-50 rounded"
        >
          공개
        </button>
      )}

      {/* 삭제 */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="px-2 py-1 text-xs text-red-500 hover:bg-red-50 rounded disabled:opacity-50"
      >
        삭제
      </button>
    </div>
  );
}
