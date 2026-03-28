-- =============================================
-- 이미지 저장용 Storage 버킷 설정
-- =============================================
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- 1. 버킷 생성 (공개 접근 허용)
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. 누구나 이미지를 볼 수 있도록 허용
CREATE POLICY "매물 이미지 공개 조회"
ON storage.objects FOR SELECT
USING (bucket_id = 'property-images');

-- 3. 인증된 사용자(관리자)만 업로드 가능
CREATE POLICY "관리자 이미지 업로드"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');

-- 4. 인증된 사용자(관리자)만 삭제 가능
CREATE POLICY "관리자 이미지 삭제"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'property-images');
