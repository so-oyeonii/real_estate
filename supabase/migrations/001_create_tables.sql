-- =============================================
-- 부동산 웹사이트 DB 스키마 (Supabase PostgreSQL)
-- =============================================
-- Supabase SQL Editor에서 이 파일 전체를 실행하세요

-- 1. UUID 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 2. 테이블 생성
-- =============================================

-- 매물 기본 정보
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,

  -- 분류
  property_type TEXT NOT NULL CHECK (property_type IN ('office', 'store', 'building')),
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('monthly', 'jeonse', 'sale')),

  -- 가격 (만원 단위)
  deposit BIGINT,
  monthly_rent BIGINT,
  sale_price BIGINT,
  maintenance_fee INT,
  maintenance_includes TEXT[] DEFAULT '{}',

  -- 위치
  address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT '서울특별시',
  district TEXT NOT NULL,
  dong TEXT,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  nearest_station TEXT,

  -- 사무실 스펙
  area_total DECIMAL(10,2),
  area_exclusive DECIMAL(10,2),
  floor INT,
  total_floors INT,
  rooms INT,
  direction TEXT,

  -- 부가 정보
  parking BOOLEAN DEFAULT false,
  parking_count INT,
  elevator BOOLEAN DEFAULT false,
  heating_type TEXT,
  air_conditioning BOOLEAN DEFAULT true,
  available_date DATE,
  built_year INT,

  -- 상태/관리
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'reserved', 'closed')),
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  view_count INT DEFAULT 0,

  -- 메타
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- 매물 이미지
CREATE TABLE IF NOT EXISTS property_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 문의/상담
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  inquiry_type TEXT DEFAULT 'property' CHECK (inquiry_type IN ('property', 'general', 'quick')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  company TEXT,
  message TEXT,
  preferred_area TEXT,
  preferred_budget TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 관리자 프로필
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- 3. 인덱스 생성 (검색 성능 향상)
-- =============================================

CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_transaction ON properties(transaction_type);
CREATE INDEX IF NOT EXISTS idx_properties_district ON properties(district);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(deposit, monthly_rent, sale_price);
CREATE INDEX IF NOT EXISTS idx_properties_area ON properties(area_exclusive);
CREATE INDEX IF NOT EXISTS idx_properties_created ON properties(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_images_property ON property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_images_primary ON property_images(property_id) WHERE is_primary = true;

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_property ON inquiries(property_id);

-- =============================================
-- 4. updated_at 자동 갱신 트리거
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 5. RLS (Row Level Security) 정책
-- =============================================

-- 모든 테이블에 RLS 활성화
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- properties: 누구나 조회 가능, 관리자만 수정
CREATE POLICY "매물 공개 조회" ON properties
  FOR SELECT USING (true);

CREATE POLICY "관리자 매물 등록" ON properties
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "관리자 매물 수정" ON properties
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "관리자 매물 삭제" ON properties
  FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

-- property_images: 누구나 조회 가능, 관리자만 수정
CREATE POLICY "이미지 공개 조회" ON property_images
  FOR SELECT USING (true);

CREATE POLICY "관리자 이미지 등록" ON property_images
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "관리자 이미지 삭제" ON property_images
  FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

-- inquiries: 누구나 문의 등록 가능, 관리자만 조회/수정
CREATE POLICY "문의 등록 (공개)" ON inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "관리자 문의 조회" ON inquiries
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

CREATE POLICY "관리자 문의 수정" ON inquiries
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_profiles WHERE id = auth.uid())
  );

-- admin_profiles: 본인만 조회
CREATE POLICY "관리자 본인 프로필 조회" ON admin_profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

-- =============================================
-- 6. Storage 버킷 (Supabase Dashboard에서 수동 생성)
-- =============================================
-- Supabase Dashboard > Storage > New Bucket
-- 이름: property-images
-- Public: Yes (공개 접근 허용)
-- File size limit: 5MB
-- Allowed MIME types: image/jpeg, image/png, image/webp
