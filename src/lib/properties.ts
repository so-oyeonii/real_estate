// --- 매물 데이터 관련 비즈니스 로직 ---
// Supabase에서 매물 데이터를 조회하는 함수 모음
// 서버 컴포넌트와 API Route에서 사용한다

import { createClient } from '@/lib/supabase/server';
import { mapPropertyRowToProperty } from '@/lib/utils';
import type { Property, PropertyWithPrimaryImage, PropertyWithImages, PropertyFilter, PropertyRow } from '@/types/property';
import type { PaginatedResponse } from '@/types/common';

/**
 * 매물 목록에 대표 이미지 URL을 붙여서 반환하는 헬퍼
 */
async function attachPrimaryImages(
  supabase: Awaited<ReturnType<typeof createClient>>,
  properties: Property[]
): Promise<PropertyWithPrimaryImage[]> {
  if (properties.length === 0) return [];

  const ids = properties.map((p) => p.id);
  const { data: images } = await supabase
    .from('property_images')
    .select('property_id, image_url, is_primary')
    .in('property_id', ids)
    .order('display_order', { ascending: true });

  // 매물 ID → 대표 이미지 URL 맵 생성
  const imageMap = new Map<string, string>();
  (images || []).forEach((img) => {
    // 대표 이미지이거나, 아직 맵에 없으면(첫 번째 이미지) 설정
    if (img.is_primary || !imageMap.has(img.property_id)) {
      imageMap.set(img.property_id, img.image_url);
    }
  });

  return properties.map((p) => ({
    ...p,
    primaryImageUrl: imageMap.get(p.id) || null,
  }));
}

/**
 * 추천 매물 목록을 가져온다 (is_featured = true)
 * 메인 페이지에서 사용
 */
export async function getFeaturedProperties(limit: number = 8): Promise<PropertyWithPrimaryImage[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('is_featured', true)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('추천 매물 조회 실패:', error);
    return [];
  }

  const properties = (data as PropertyRow[]).map(mapPropertyRowToProperty);
  return attachPrimaryImages(supabase, properties);
}

/**
 * 매물 목록을 필터링하여 가져온다
 * 매물 목록 페이지에서 사용
 */
export async function getProperties(
  filters: PropertyFilter
): Promise<PaginatedResponse<PropertyWithPrimaryImage>> {
  const supabase = await createClient();
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const offset = (page - 1) * limit;

  // 기본 쿼리 시작
  let query = supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .eq('status', 'active');

  // 필터 적용
  if (filters.propertyType) {
    query = query.eq('property_type', filters.propertyType);
  }
  if (filters.transactionType) {
    query = query.eq('transaction_type', filters.transactionType);
  }
  if (filters.district) {
    query = query.eq('district', filters.district);
  }
  if (filters.dong) {
    query = query.eq('dong', filters.dong);
  }
  if (filters.minArea) {
    query = query.gte('area_exclusive', filters.minArea);
  }
  if (filters.maxArea) {
    query = query.lte('area_exclusive', filters.maxArea);
  }
  if (filters.minDeposit) {
    query = query.gte('deposit', filters.minDeposit);
  }
  if (filters.maxDeposit) {
    query = query.lte('deposit', filters.maxDeposit);
  }
  if (filters.minMonthlyRent) {
    query = query.gte('monthly_rent', filters.minMonthlyRent);
  }
  if (filters.maxMonthlyRent) {
    query = query.lte('monthly_rent', filters.maxMonthlyRent);
  }
  if (filters.parking) {
    query = query.eq('parking', true);
  }
  if (filters.elevator) {
    query = query.eq('elevator', true);
  }

  // 정렬
  switch (filters.sortBy) {
    case 'price_asc':
      query = query.order('deposit', { ascending: true, nullsFirst: false });
      break;
    case 'price_desc':
      query = query.order('deposit', { ascending: false, nullsFirst: false });
      break;
    case 'area_asc':
      query = query.order('area_exclusive', { ascending: true, nullsFirst: false });
      break;
    case 'area_desc':
      query = query.order('area_exclusive', { ascending: false, nullsFirst: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  // 페이지네이션
  query = query.range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    console.error('매물 목록 조회 실패:', error);
    return { data: [], totalCount: 0, page, limit, totalPages: 0 };
  }

  const properties = (data as PropertyRow[]).map(mapPropertyRowToProperty);
  const propertiesWithImages = await attachPrimaryImages(supabase, properties);
  const totalCount = count || 0;

  return {
    data: propertiesWithImages,
    totalCount,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
  };
}

/**
 * 매물 상세 정보를 가져온다 (이미지 포함)
 */
export async function getPropertyById(id: string): Promise<PropertyWithImages | null> {
  const supabase = await createClient();

  // 매물 정보 조회
  const { data: propertyData, error: propertyError } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (propertyError || !propertyData) {
    console.error('매물 상세 조회 실패:', propertyError);
    return null;
  }

  // 매물 이미지 조회
  const { data: imageData } = await supabase
    .from('property_images')
    .select('*')
    .eq('property_id', id)
    .order('display_order', { ascending: true });

  const property = mapPropertyRowToProperty(propertyData as PropertyRow);

  // 조회수 증가 (비동기, 실패해도 무시)
  supabase
    .from('properties')
    .update({ view_count: property.viewCount + 1 })
    .eq('id', id)
    .then();

  return {
    ...property,
    images: imageData || [],
  };
}
