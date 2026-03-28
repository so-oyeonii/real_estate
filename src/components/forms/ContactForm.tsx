// --- 일반 문의 폼 ---
// 문의 페이지에서 사용하는 상세 문의 폼
// 이름, 연락처, 이메일, 회사명, 희망면적, 희망예산, 메시지

'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    preferredArea: '',
    preferredBudget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) { setErrorMessage('이름을 입력해주세요'); return; }
    if (!formData.phone.trim()) { setErrorMessage('연락처를 입력해주세요'); return; }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType: 'general',
          name: formData.name.trim(),
          phone: formData.phone.trim().replace(/-/g, ''),
          email: formData.email.trim() || undefined,
          company: formData.company.trim() || undefined,
          preferredArea: formData.preferredArea || undefined,
          preferredBudget: formData.preferredBudget || undefined,
          message: formData.message.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
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
      <div className="bg-green-50 rounded-xl border border-green-200 p-8 text-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-green-800">문의가 접수되었습니다!</h3>
        <p className="mt-2 text-green-600">빠른 시일 내에 전문 컨설턴트가 연락드리겠습니다.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">상담 신청</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-1">
            이름 <span className="text-red-500">*</span>
          </label>
          <input id="contact-name" name="name" type="text" value={formData.name} onChange={handleChange}
            placeholder="홍길동" maxLength={50}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
        </div>

        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700 mb-1">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input id="contact-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
            placeholder="010-0000-0000" maxLength={13}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-1">
            이메일 <span className="text-slate-400">(선택)</span>
          </label>
          <input id="contact-email" name="email" type="email" value={formData.email} onChange={handleChange}
            placeholder="example@company.com"
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
        </div>

        <div>
          <label htmlFor="contact-company" className="block text-sm font-medium text-slate-700 mb-1">
            회사명 <span className="text-slate-400">(선택)</span>
          </label>
          <input id="contact-company" name="company" type="text" value={formData.company} onChange={handleChange}
            placeholder="(주)회사이름" maxLength={100}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
        </div>

        <div>
          <label htmlFor="contact-area" className="block text-sm font-medium text-slate-700 mb-1">
            희망 면적 <span className="text-slate-400">(선택)</span>
          </label>
          <select id="contact-area" name="preferredArea" value={formData.preferredArea} onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
            <option value="">선택해주세요</option>
            <option value="10평 이하">10평 이하</option>
            <option value="10~20평">10~20평</option>
            <option value="20~30평">20~30평</option>
            <option value="30~50평">30~50평</option>
            <option value="50~100평">50~100평</option>
            <option value="100평 이상">100평 이상</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-budget" className="block text-sm font-medium text-slate-700 mb-1">
            희망 예산 <span className="text-slate-400">(선택)</span>
          </label>
          <select id="contact-budget" name="preferredBudget" value={formData.preferredBudget} onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
            <option value="">선택해주세요</option>
            <option value="월 50만 이하">월 50만 이하</option>
            <option value="월 50~100만">월 50~100만</option>
            <option value="월 100~200만">월 100~200만</option>
            <option value="월 200~500만">월 200~500만</option>
            <option value="월 500만 이상">월 500만 이상</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-1">
          문의 내용 <span className="text-slate-400">(선택)</span>
        </label>
        <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange}
          placeholder="원하시는 위치, 조건, 입주 시기 등을 자유롭게 적어주세요" rows={4} maxLength={1000}
          className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
      </div>

      {errorMessage && <p className="mt-3 text-sm text-red-500">{errorMessage}</p>}

      <button type="submit" disabled={isSubmitting}
        className="mt-6 w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50">
        {isSubmitting ? '전송 중...' : '상담 신청하기'}
      </button>
    </form>
  );
}
