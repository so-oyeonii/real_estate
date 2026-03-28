// --- sitemap.xml 자동 생성 ---
// 검색엔진이 사이트의 모든 페이지를 찾을 수 있도록 사이트맵을 생성한다
// 매물이 추가/삭제되면 자동으로 반영된다

import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  // 공개 매물 목록 가져오기 (id, updated_at만)
  const { data: properties } = await supabase
    .from('properties')
    .select('id, updated_at')
    .eq('status', 'active')
    .order('updated_at', { ascending: false });

  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/properties`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // 매물 상세 페이지 (동적)
  const propertyPages: MetadataRoute.Sitemap = (properties || []).map((p) => ({
    url: `${SITE_URL}/properties/${p.id}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...propertyPages];
}
