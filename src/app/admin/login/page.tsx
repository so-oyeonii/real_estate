// --- 관리자 로그인 페이지 ---
// 이메일 + 비밀번호로 관리자 로그인

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      // 로그인 성공 → 관리자 대시보드로 이동
      router.push('/admin');
      router.refresh();
    } catch {
      setError('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[var(--color-primary)] rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-lg">O</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">오피스너 관리자</h1>
          <p className="text-sm text-slate-500 mt-1">관리자 계정으로 로그인하세요</p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-slate-700 mb-1">
                이메일
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@officener.co.kr"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-slate-700 mb-1">
                비밀번호
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 w-full bg-[var(--color-primary)] text-white py-2.5 rounded-lg font-semibold
                       hover:bg-[var(--color-primary-dark)] transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
