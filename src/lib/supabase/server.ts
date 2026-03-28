// --- Supabase 서버 클라이언트 ---
// 서버 컴포넌트, API Route, Server Actions에서 사용하는 Supabase 클라이언트
// 쿠키 기반 세션 관리를 위해 @supabase/ssr 사용

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// 서버에서 Supabase 클라이언트를 생성하는 함수
// 서버 컴포넌트나 API Route에서 사용한다
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // 서버 컴포넌트에서 호출 시 쿠키 설정이 불가능할 수 있다
            // 미들웨어에서 세션을 갱신하므로 여기서는 무시해도 된다
          }
        },
      },
    },
  );
}

// 관리자 전용: SERVICE_ROLE_KEY를 사용하는 클라이언트
// RLS를 우회해야 하는 관리자 작업에만 사용한다
// 절대 클라이언트 코드에서 호출하지 않는다
export async function createAdminClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // 무시
          }
        },
      },
    },
  );
}
