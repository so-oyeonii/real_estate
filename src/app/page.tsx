// --- 메인 페이지 ---
// 사이트 첫 화면: 히어로 검색 + 추천 매물 + 간편 상담 CTA
// 서버 컴포넌트에서 Supabase 데이터를 직접 가져온다

import Link from 'next/link';
import { getFeaturedProperties } from '@/lib/properties';
import PropertyCard from '@/components/property/PropertyCard';
import QuickInquiryForm from '@/components/forms/QuickInquiryForm';
import PublicLayout from '@/components/layout/PublicLayout';
import { SITE_CONFIG, DISTRICT_OPTIONS, TRANSACTION_TYPE_OPTIONS } from '@/config/constants';

export default async function HomePage() {
  // 서버에서 추천 매물 가져오기
  const featuredProperties = await getFeaturedProperties(8);

  return (
    <PublicLayout>
      {/* ===== 히어로 섹션 ===== */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              최적의 사무 공간을<br />찾아드립니다
            </h1>
            <p className="mt-4 text-lg text-blue-100">
              서울 주요 업무지구 사무실 임대·매매 전문
            </p>
          </div>

          {/* 검색 바 */}
          <div className="mt-10 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-6">
            <form action="/properties" method="GET">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* 거래 유형 */}
                <select
                  name="transactionType"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-700
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  defaultValue=""
                >
                  <option value="">거래 유형</option>
                  {TRANSACTION_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* 지역 */}
                <select
                  name="district"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-700
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  defaultValue=""
                >
                  <option value="">지역 선택</option>
                  {DISTRICT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* 면적 */}
                <select
                  name="maxArea"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-700
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  defaultValue=""
                >
                  <option value="">면적</option>
                  <option value="33">10평 이하</option>
                  <option value="66">20평 이하</option>
                  <option value="99">30평 이하</option>
                  <option value="165">50평 이하</option>
                  <option value="330">100평 이하</option>
                </select>

                {/* 검색 버튼 */}
                <button
                  type="submit"
                  className="w-full bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold
                             hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  매물 검색
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ===== 추천 매물 섹션 ===== */}
      <section className="py-16 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">추천 매물</h2>
              <p className="mt-1 text-slate-500">엄선된 프리미엄 사무 공간</p>
            </div>
            <Link
              href="/properties"
              className="text-[var(--color-primary)] hover:underline font-medium text-sm"
            >
              전체 보기 &rarr;
            </Link>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              추천 매물이 아직 없습니다.
            </div>
          )}
        </div>
      </section>

      {/* ===== 서비스 특징 섹션 ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
            오피스너가 특별한 이유
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 특징 1 */}
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">맞춤 매물 추천</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                원하시는 조건을 알려주시면<br />최적의 사무실을 찾아드립니다
              </p>
            </div>

            {/* 특징 2 */}
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">검증된 매물만</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                직접 확인한 매물만 등록하여<br />허위 매물 걱정이 없습니다
              </p>
            </div>

            {/* 특징 3 */}
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">전문 상담</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                사무실 전문 컨설턴트가<br />무료로 상담해드립니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 간편 상담 CTA 섹션 ===== */}
      <section className="py-16 bg-[var(--color-primary)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            사무실 찾기, 혼자 고민하지 마세요
          </h2>
          <p className="text-blue-100 mb-8">
            연락처를 남겨주시면 전문 컨설턴트가 연락드립니다
          </p>
          <QuickInquiryForm />
          <p className="mt-4 text-sm text-blue-200">
            또는 전화 상담: <span className="font-semibold text-white">{SITE_CONFIG.phone}</span>
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
