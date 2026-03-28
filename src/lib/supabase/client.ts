// --- Supabase 브라우저 클라이언트 ---
// 클라이언트 컴포넌트('use client')에서 사용하는 Supabase 클라이언트
// 브라우저에서 실행되므로 ANON_KEY만 사용 (안전)

import { createBrowserClient } from '@supabase/ssr';

// Supabase 클라이언트를 생성하는 함수
// 컴포넌트에서 const supabase = createClient() 로 사용한다
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
