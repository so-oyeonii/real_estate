// --- 회사 소개 페이지 ---
// 오피스너의 서비스, 핵심 가치, 서비스 영역을 소개한다

import type { Metadata } from 'next';
import Link from 'next/link';
import PublicLayout from '@/components/layout/PublicLayout';
import { SITE_CONFIG } from '@/config/constants';

export const metadata: Metadata = {
  title: '회사 소개',
  description: '오피스너는 서울 주요 업무지구 사무실 임대·매매 전문 기업입니다.',
};

export default function AboutPage() {
  return (
    <PublicLayout>
    <div>
      {/* 히어로 */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            최적의 사무 공간,<br />오피스너가 찾아드립니다
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            서울 주요 업무지구 사무실 임대·매매 전문
          </p>
        </div>
      </section>

      {/* 서비스 소개 */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                사무실 찾기, 더 이상 어렵지 않습니다
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                오피스너는 중소기업 대표님들이 최적의 사무 공간을 효율적으로 찾을 수 있도록
                도와드리는 사무실 임대·매매 전문 서비스입니다.
              </p>
              <p className="text-slate-600 leading-relaxed">
                강남, 서초, 여의도, 종로, 마포, 성수 등 서울 주요 업무지구의 검증된 매물만을
                엄선하여 제공하며, 전문 컨설턴트가 처음부터 끝까지 함께합니다.
              </p>
            </div>
            <div className="bg-slate-100 rounded-2xl aspect-square flex items-center justify-center">
              <div className="text-center text-slate-400">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl font-bold text-[var(--color-primary)]">O</span>
                </div>
                <p className="font-semibold text-slate-500">{SITE_CONFIG.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="py-16 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">핵심 가치</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              title="신뢰"
              description="직접 확인한 매물만 등록합니다. 허위 매물 없이 정확한 정보를 제공합니다."
              icon="shield"
            />
            <ValueCard
              title="전문성"
              description="사무실 전문 컨설턴트가 시장 분석부터 계약까지 전 과정을 지원합니다."
              icon="star"
            />
            <ValueCard
              title="효율"
              description="조건에 맞는 매물만 선별하여 추천드립니다. 불필요한 시간 낭비를 줄여드립니다."
              icon="clock"
            />
          </div>
        </div>
      </section>

      {/* 서비스 영역 */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">서비스 영역</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['강남/서초', '여의도', '종로/중구', '마포/성수'].map((area) => (
              <div key={area} className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-800">{area}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-primary)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            지금 바로 상담받으세요
          </h2>
          <p className="text-blue-100 mb-8">
            전문 컨설턴트가 최적의 사무실을 찾아드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-[var(--color-primary)] rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              무료 상담 신청
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/-/g, '')}`}
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
    </PublicLayout>
  );
}

function ValueCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white rounded-xl p-6 text-center shadow-sm">
      <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        {icon === 'shield' && (
          <svg className="w-7 h-7 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )}
        {icon === 'star' && (
          <svg className="w-7 h-7 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        )}
        {icon === 'clock' && (
          <svg className="w-7 h-7 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}
