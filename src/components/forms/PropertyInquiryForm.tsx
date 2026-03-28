// --- 매물 문의 폼 ---
// 매물 상세 페이지 오른쪽에 표시되는 문의 폼
// 이름, 연락처, 메시지를 입력하고 문의를 보낸다

'use client';

import { useState } from 'react';
import { SITE_CONFIG } from '@/config/constants';

interface PropertyInquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

export default function PropertyInquiryForm({ propertyId, propertyTitle }: PropertyInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 입력값 변경 핸들러
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // 폼 제출
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('이름을 입력해주세요');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('연락처를 입력해주세요');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType: 'property',
          propertyId,
          name: formData.name.trim(),
          phone: formData.phone.trim().replace(/-/g, ''),
          email: formData.email.trim() || undefined,
          message: formData.message.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '문의 등록에 실패했습니다');
      }

      setIsSuccess(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : '문의 등록에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 rounded-xl border border-green-200 p-6 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-green-800">문의가 접수되었습니다</h3>
        <p className="mt-1 text-sm text-green-600">빠른 시일 내에 연락드리겠습니다.</p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData({ name: '', phone: '', email: '', message: '' });
          }}
          className="mt-4 text-sm text-green-700 hover:underline"
        >
          추가 문의하기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-1">매물 문의</h3>
      <p className="text-sm text-slate-500 mb-5 truncate">{propertyTitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 이름 */}
        <div>
          <label htmlFor="inquiry-name" className="block text-sm font-medium text-slate-700 mb-1">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            id="inquiry-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="홍길동"
            maxLength={50}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
        </div>

        {/* 연락처 */}
        <div>
          <label htmlFor="inquiry-phone" className="block text-sm font-medium text-slate-700 mb-1">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="010-0000-0000"
            maxLength={13}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
        </div>

        {/* 이메일 (선택) */}
        <div>
          <label htmlFor="inquiry-email" className="block text-sm font-medium text-slate-700 mb-1">
            이메일 <span className="text-slate-400">(선택)</span>
          </label>
          <input
            id="inquiry-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@company.com"
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
        </div>

        {/* 메시지 (선택) */}
        <div>
          <label htmlFor="inquiry-message" className="block text-sm font-medium text-slate-700 mb-1">
            문의 내용 <span className="text-slate-400">(선택)</span>
          </label>
          <textarea
            id="inquiry-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="궁금한 점이나 원하시는 조건을 적어주세요"
            rows={3}
            maxLength={1000}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm resize-none
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
        </div>

        {/* 에러 메시지 */}
        {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold
                     hover:bg-[var(--color-primary-dark)] transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '전송 중...' : '문의하기'}
        </button>
      </form>

      {/* 전화 상담 안내 */}
      <div className="mt-4 pt-4 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400 mb-1">전화 상담</p>
        <a
          href={`tel:${SITE_CONFIG.phone.replace(/-/g, '')}`}
          className="text-lg font-bold text-[var(--color-primary)] hover:underline"
        >
          {SITE_CONFIG.phone}
        </a>
      </div>
    </div>
  );
}
