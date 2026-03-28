// --- 사이트 하단 푸터 ---
// 회사 정보, 메뉴 링크, 연락처를 표시한다

import Link from 'next/link';
import { SITE_CONFIG } from '@/config/constants';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* 회사 정보 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-xl font-bold text-white">오피스너</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              서울 주요 업무지구 사무실 임대·매매 전문.<br />
              최적의 사무 공간을 찾아드립니다.
            </p>
          </div>

          {/* 빠른 메뉴 */}
          <div>
            <h3 className="text-white font-semibold mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-sm text-slate-400 hover:text-white transition-colors">
                  매물 검색
                </Link>
              </li>
              <li>
                <Link href="/properties?transactionType=monthly" className="text-sm text-slate-400 hover:text-white transition-colors">
                  사무실 월세
                </Link>
              </li>
              <li>
                <Link href="/properties?transactionType=jeonse" className="text-sm text-slate-400 hover:text-white transition-colors">
                  사무실 전세
                </Link>
              </li>
              <li>
                <Link href="/properties?transactionType=sale" className="text-sm text-slate-400 hover:text-white transition-colors">
                  사무실 매매
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-white font-semibold mb-4">연락처</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {SITE_CONFIG.phone}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {SITE_CONFIG.email}
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {SITE_CONFIG.address}
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 구분선 + 저작권 */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
