// --- Next.js 설정 파일 ---
// 보안 헤더, 이미지 도메인 등 프로젝트 전반 설정

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이미지 최적화: 외부 이미지 도메인 허용
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',  // Supabase Storage 이미지
      },
    ],
  },

  // 보안 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
