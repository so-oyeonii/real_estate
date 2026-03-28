// --- 문의 상태 변경 + 관리자 메모 ---
// 관리자가 문의 상태를 변경하고 메모를 남길 수 있다

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface InquiryStatusChangerProps {
  inquiryId: string;
  currentStatus: string;
  currentNote: string;
}

export default function InquiryStatusChanger({
  inquiryId,
  currentStatus,
  currentNote,
}: InquiryStatusChangerProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState(currentNote);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('inquiries')
        .update({ status, admin_note: note || null })
        .eq('id', inquiryId);

      if (error) throw error;
      router.refresh();
    } catch {
      alert('저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  }

  const hasChanges = status !== currentStatus || note !== currentNote;

  return (
    <div className="space-y-2">
      {/* 상태 선택 */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className={`w-full px-3 py-2 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
          status === 'pending' ? 'border-yellow-300 bg-yellow-50 text-yellow-700' :
          status === 'contacted' ? 'border-blue-300 bg-blue-50 text-blue-700' :
          'border-green-300 bg-green-50 text-green-700'
        }`}
      >
        <option value="pending">대기</option>
        <option value="contacted">연락 완료</option>
        <option value="completed">완료</option>
      </select>

      {/* 관리자 메모 */}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="관리자 메모 (내부용)"
        rows={2}
        maxLength={1000}
        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none
                   focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      />

      {/* 저장 버튼 (변경사항이 있을 때만 활성화) */}
      {hasChanges && (
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full px-3 py-2 bg-[var(--color-primary)] text-white text-sm rounded-lg font-medium
                     hover:bg-[var(--color-primary-dark)] disabled:opacity-50"
        >
          {isSaving ? '저장 중...' : '저장'}
        </button>
      )}
    </div>
  );
}
