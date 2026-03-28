// --- robots.txt 생성 ---
// 검색엔진 크롤러에게 어떤 페이지를 수집해도 되는지 알려준다
// 관리자 페이지는 크롤링 차단

import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],  // 관리자, API는 크롤링 차단
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
