// --- 문의/상담 페이지 ---
// 일반 문의 폼과 회사 연락처 정보를 표시한다

import type { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import PublicLayout from '@/components/layout/PublicLayout';
import { SITE_CONFIG } from '@/config/constants';

export const metadata: Metadata = {
  title: '문의하기',
  description: '사무실 임대·매매 관련 문의를 남겨주세요. 전문 컨설턴트가 빠르게 답변드립니다.',
};

export default function ContactPage() {
  return (
    <PublicLayout>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900">문의하기</h1>
        <p className="mt-2 text-slate-500">
          원하시는 사무실 조건을 알려주시면 맞춤 매물을 찾아드립니다
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 문의 폼 (2/3) */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* 연락처 정보 (1/3) */}
        <div className="space-y-6">
          <div className="bg-[var(--color-surface)] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">연락처</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400">전화</p>
                  <a href={`tel:${SITE_CONFIG.phone.replace(/-/g, '')}`} className="font-semibold text-slate-800 hover:text-[var(--color-primary)]">
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400">이메일</p>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-slate-800 hover:text-[var(--color-primary)]">
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400">주소</p>
                  <p className="font-semibold text-slate-800">{SITE_CONFIG.address}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-[var(--color-surface)] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">상담 시간</h2>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>평일: 09:00 ~ 18:00</li>
              <li>토요일: 10:00 ~ 14:00</li>
              <li>일요일/공휴일: 휴무</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </PublicLayout>
  );
}
