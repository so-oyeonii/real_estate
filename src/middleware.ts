// --- 미들웨어 ---
// /admin 경로 접근 시 로그인 여부를 확인한다
// 로그인하지 않은 사용자는 /admin/login으로 리다이렉트한다

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin/login 페이지는 인증 불필요 (무한 리다이렉트 방지)
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // /admin 으로 시작하는 경로만 보호
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Supabase 클라이언트로 세션 확인
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // 세션(로그인 상태) 확인
  const { data: { user } } = await supabase.auth.getUser();

  // 로그인하지 않았으면 로그인 페이지로 이동
  if (!user) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: ['/admin/:path*'],
};
