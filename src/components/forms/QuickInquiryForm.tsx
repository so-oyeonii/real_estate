// --- 간편 상담 폼 ---
// 메인 페이지 하단에서 이름 + 전화번호만으로 빠르게 문의하는 폼
// 클라이언트 컴포넌트 (폼 상태 관리 필요)

'use client';

import { useState } from 'react';

export default function QuickInquiryForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 폼 제출 처리
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage('');

    // 간단한 클라이언트 검증
    if (!name.trim()) {
      setErrorMessage('이름을 입력해주세요');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('연락처를 입력해주세요');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim().replace(/-/g, ''),
          inquiryType: 'quick',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '문의 등록에 실패했습니다');
      }

      setIsSuccess(true);
      setName('');
      setPhone('');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : '문의 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // 성공 메시지 표시
  if (isSuccess) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
        <p className="text-lg font-semibold">상담 신청이 완료되었습니다!</p>
        <p className="mt-1 text-blue-100 text-sm">빠른 시일 내에 연락드리겠습니다.</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-3 text-sm text-blue-200 hover:text-white underline"
        >
          추가 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          className="flex-1 px-4 py-3 rounded-lg text-slate-800 placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
          maxLength={50}
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="연락처 (010-0000-0000)"
          className="flex-1 px-4 py-3 rounded-lg text-slate-800 placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
          maxLength={13}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-[var(--color-secondary)] text-white rounded-lg font-semibold
                     hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                     whitespace-nowrap"
        >
          {isSubmitting ? '신청 중...' : '무료 상담 신청'}
        </button>
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-300">{errorMessage}</p>
      )}
    </form>
  );
}
