// --- 사이트 상단 헤더 ---
// 로고, 네비게이션 메뉴, 연락처를 표시한다
// 모바일에서는 햄버거 메뉴로 전환된다

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/constants';

export default function Header() {
  // 모바일 메뉴 열림/닫힘 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-xl font-bold text-[var(--color-primary)]">
              오피스너
            </span>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/properties"
              className="text-slate-700 hover:text-[var(--color-primary)] font-medium transition-colors"
            >
              매물 검색
            </Link>
            <Link
              href="/about"
              className="text-slate-700 hover:text-[var(--color-primary)] font-medium transition-colors"
            >
              회사 소개
            </Link>
            <Link
              href="/contact"
              className="text-slate-700 hover:text-[var(--color-primary)] font-medium transition-colors"
            >
              문의하기
            </Link>
          </nav>

          {/* 데스크탑 연락처 + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-slate-500">
              {SITE_CONFIG.phone}
            </span>
            <Link
              href="/contact"
              className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm font-medium
                         hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              무료 상담
            </Link>
          </div>

          {/* 모바일 햄버거 버튼 */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              // X 아이콘
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // 햄버거 아이콘
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* 모바일 메뉴 (열렸을 때만 표시) */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-100">
            <div className="flex flex-col gap-3">
              <Link
                href="/properties"
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                매물 검색
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                회사 소개
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                문의하기
              </Link>
              <div className="pt-3 border-t border-slate-100">
                <p className="px-3 text-sm text-slate-500">{SITE_CONFIG.phone}</p>
                <Link
                  href="/contact"
                  className="mt-2 block mx-3 text-center bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  무료 상담
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
