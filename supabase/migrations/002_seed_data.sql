-- =============================================
-- 더미 매물 데이터 40건 (서울 주요 업무지구)
-- =============================================
-- Supabase SQL Editor에서 001 실행 후 이 파일을 실행하세요

-- ===== 강남구 (10건) =====

INSERT INTO properties (title, description, property_type, transaction_type, deposit, monthly_rent, sale_price, maintenance_fee, maintenance_includes, address, city, district, dong, latitude, longitude, nearest_station, area_total, area_exclusive, floor, total_floors, rooms, direction, parking, parking_count, elevator, heating_type, air_conditioning, available_date, built_year, status, is_featured, tags, view_count) VALUES
('역삼역 초역세권 프라임 사무실', '역삼역 3번출구 도보 1분. 올 리모델링 완료, 탁 트인 전망의 프라임급 사무실입니다. 회의실 2개, 임원실 별도 구성 가능.', 'office', 'monthly', 5000, 300, NULL, 25, ARRAY['수도','전기','인터넷','경비'], '서울특별시 강남구 역삼동 테헤란로 152', '서울특별시', '강남구', '역삼동', 37.5007, 127.0365, '역삼역 3번출구 도보 1분', 198.0, 165.0, 8, 15, 4, '남향', true, 3, true, '개별난방', true, '2026-04-15', 2019, 'active', true, ARRAY['역세권','인테리어','주차가능'], 156),

('삼성동 대형 사무실 전세', '삼성역 인근 대형 사무실. 넓은 공간과 우수한 접근성. 법인 사무실로 최적.', 'office', 'jeonse', 30000, NULL, NULL, 35, ARRAY['수도','전기','경비','청소'], '서울특별시 강남구 삼성동 봉은사로 435', '서울특별시', '강남구', '삼성동', 37.5112, 127.0590, '삼성역 5번출구 도보 5분', 330.0, 264.0, 12, 20, 6, '남향', true, 5, true, '중앙난방', true, '2026-05-01', 2015, 'active', true, ARRAY['역세권','대형'], 203),

('논현동 소형 사무실 월세', '신논현역 인근 아담한 소형 사무실. 1~3인 스타트업에 적합합니다.', 'office', 'monthly', 1000, 80, NULL, 10, ARRAY['수도','인터넷'], '서울특별시 강남구 논현동 강남대로 578', '서울특별시', '강남구', '논현동', 37.5045, 127.0252, '신논현역 6번출구 도보 3분', 46.0, 33.0, 5, 10, 1, '동향', false, 0, true, '개별난방', true, '2026-04-01', 2010, 'active', false, ARRAY['역세권','소형'], 89),

('대치동 빌딩 매매', '대치동 사거리 코너 빌딩. 대로변 가시성 우수, 임대 수익률 4.5%.', 'building', 'sale', NULL, NULL, 450000, 0, ARRAY[]::TEXT[], '서울특별시 강남구 대치동 남부순환로 2947', '서울특별시', '강남구', '대치동', 37.4945, 127.0635, '대치역 4번출구 도보 7분', 990.0, 825.0, 0, 6, 0, '남향', true, 10, true, '개별난방', true, NULL, 2005, 'active', true, ARRAY['대로변','코너자리'], 312),

('역삼동 중형 사무실 월세', '테헤란로 중심부 중형 사무실. 10~15인 규모 기업에 적합.', 'office', 'monthly', 3000, 180, NULL, 18, ARRAY['수도','전기','인터넷','냉난방'], '서울특별시 강남구 역삼동 테헤란로 216', '서울특별시', '강남구', '역삼동', 37.5020, 127.0398, '역삼역 1번출구 도보 4분', 132.0, 99.0, 10, 18, 3, '남동향', true, 2, true, '개별난방', true, '2026-04-20', 2017, 'active', false, ARRAY['역세권','인테리어'], 134),

('삼성동 전층 사무실 임대', '코엑스 인근 전층 사무실. 기업 이미지에 적합한 고급 인테리어.', 'office', 'monthly', 10000, 500, NULL, 45, ARRAY['수도','전기','인터넷','냉난방','청소','경비'], '서울특별시 강남구 삼성동 영동대로 513', '서울특별시', '강남구', '삼성동', 37.5130, 127.0580, '삼성역 6번출구 도보 3분', 495.0, 396.0, 3, 5, 8, '남향', true, 8, true, '중앙난방', true, '2026-06-01', 2020, 'active', true, ARRAY['전층사용','신축','주차가능'], 278),

('청담동 상가 임대', '청담동 명품거리 인근 1층 상가. 유동인구 풍부, 브랜드 입점 적합.', 'store', 'monthly', 15000, 700, NULL, 30, ARRAY['수도','전기'], '서울특별시 강남구 청담동 압구정로 443', '서울특별시', '강남구', '청담동', 37.5238, 127.0470, '청담역 2번출구 도보 5분', 99.0, 82.5, 1, 4, 1, '남향', true, 2, false, '개별난방', true, '2026-05-15', 2012, 'active', false, ARRAY['대로변','역세권'], 167),

('논현동 사무실 전세', '강남 업무지구 중심. 전세로 부담 줄이고 넓은 공간 활용 가능.', 'office', 'jeonse', 15000, NULL, NULL, 20, ARRAY['수도','전기','인터넷'], '서울특별시 강남구 논현동 학동로 171', '서울특별시', '강남구', '논현동', 37.5115, 127.0310, '학동역 10번출구 도보 4분', 165.0, 132.0, 7, 12, 3, '서향', true, 2, true, '개별난방', true, '2026-05-01', 2013, 'active', false, ARRAY['역세권'], 98),

('역삼동 신축 사무실', '2024년 신축 건물. 최신 인테리어와 설비. 채광 우수.', 'office', 'monthly', 2000, 150, NULL, 15, ARRAY['수도','전기','인터넷','냉난방'], '서울특별시 강남구 역삼동 강남대로 382', '서울특별시', '강남구', '역삼동', 37.4968, 127.0295, '역삼역 8번출구 도보 6분', 99.0, 79.2, 6, 10, 2, '남향', true, 1, true, '개별난방', true, '2026-04-10', 2024, 'active', true, ARRAY['신축','인테리어','역세권'], 201),

('대치동 사무실 매매', '학원가 인근 사무실 매매. 안정적인 임대 수익 가능.', 'office', 'sale', NULL, NULL, 85000, 15, ARRAY['수도','전기'], '서울특별시 강남구 대치동 삼성로 510', '서울특별시', '강남구', '대치동', 37.4998, 127.0612, '대치역 7번출구 도보 3분', 132.0, 105.6, 4, 8, 3, '동향', true, 1, true, '개별난방', true, NULL, 2008, 'active', false, ARRAY['역세권','주차가능'], 145);

-- ===== 서초구 (6건) =====

INSERT INTO properties (title, description, property_type, transaction_type, deposit, monthly_rent, sale_price, maintenance_fee, maintenance_includes, address, city, district, dong, latitude, longitude, nearest_station, area_total, area_exclusive, floor, total_floors, rooms, direction, parking, parking_count, elevator, heating_type, air_conditioning, available_date, built_year, status, is_featured, tags, view_count) VALUES
('서초동 법조타운 사무실', '서초역 법조타운 내 사무실. 법무법인, 특허사무소에 최적. 관공서 접근성 우수.', 'office', 'monthly', 5000, 250, NULL, 22, ARRAY['수도','전기','인터넷','경비'], '서울특별시 서초구 서초동 서초대로 248', '서울특별시', '서초구', '서초동', 37.4920, 127.0076, '서초역 2번출구 도보 3분', 165.0, 132.0, 9, 15, 4, '남향', true, 3, true, '개별난방', true, '2026-04-15', 2011, 'active', true, ARRAY['역세권','주차가능'], 187),

('반포동 대형 사무실', '반포 서래마을 인근 대형 사무실. 쾌적한 환경과 넓은 주차장.', 'office', 'monthly', 8000, 400, NULL, 30, ARRAY['수도','전기','인터넷','냉난방','주차'], '서울특별시 서초구 반포동 사평대로 68', '서울특별시', '서초구', '반포동', 37.5040, 127.0020, '반포역 3번출구 도보 7분', 264.0, 211.2, 5, 10, 5, '남향', true, 5, true, '중앙난방', true, '2026-05-01', 2016, 'active', false, ARRAY['주차가능','대형'], 132),

('양재동 IT벤처 사무실', '양재역 인근 IT벤처단지. 스타트업 밀집 지역, 네트워킹 용이.', 'office', 'monthly', 1500, 100, NULL, 12, ARRAY['수도','전기','인터넷'], '서울특별시 서초구 양재동 남부순환로 2621', '서울특별시', '서초구', '양재동', 37.4840, 127.0345, '양재역 9번출구 도보 5분', 66.0, 49.5, 4, 8, 2, '동향', true, 1, true, '개별난방', true, '2026-04-01', 2018, 'active', false, ARRAY['역세권','소형'], 76),

('서초동 사무실 전세', '교대역 인근 전세 사무실. 대중교통 접근성 최상.', 'office', 'jeonse', 20000, NULL, NULL, 25, ARRAY['수도','전기','인터넷','경비'], '서울특별시 서초구 서초동 서초중앙로 110', '서울특별시', '서초구', '서초동', 37.4903, 127.0135, '교대역 1번출구 도보 2분', 198.0, 158.4, 6, 12, 4, '남향', true, 3, true, '중앙난방', true, '2026-06-01', 2014, 'active', false, ARRAY['역세권'], 108),

('서초동 빌딩 매매', '서초대로변 코너 빌딩. 안정적 임대수익, 건물 상태 양호.', 'building', 'sale', NULL, NULL, 350000, 0, ARRAY[]::TEXT[], '서울특별시 서초구 서초동 서초대로 320', '서울특별시', '서초구', '서초동', 37.4935, 127.0095, '서초역 6번출구 도보 5분', 825.0, 660.0, 0, 8, 0, '남향', true, 8, true, '중앙난방', true, NULL, 2003, 'active', false, ARRAY['대로변','코너자리'], 234),

('잠원동 상가 임대', '신반포역 인근 1층 상가. 주거 밀집지역 유동인구 풍부.', 'store', 'monthly', 8000, 350, NULL, 15, ARRAY['수도','전기'], '서울특별시 서초구 잠원동 신반포로 270', '서울특별시', '서초구', '잠원동', 37.5075, 126.9945, '신반포역 4번출구 도보 3분', 82.5, 66.0, 1, 5, 1, '남향', false, 0, false, '개별난방', true, '2026-05-01', 2009, 'active', false, ARRAY['대로변'], 91);

-- ===== 마포구 (5건) =====

INSERT INTO properties (title, description, property_type, transaction_type, deposit, monthly_rent, sale_price, maintenance_fee, maintenance_includes, address, city, district, dong, latitude, longitude, nearest_station, area_total, area_exclusive, floor, total_floors, rooms, direction, parking, parking_count, elevator, heating_type, air_conditioning, available_date, built_year, status, is_featured, tags, view_count) VALUES
('상암동 DMC 사무실', 'DMC 단지 내 IT/미디어 기업 밀집지. 최신 시설, 넓은 주차장.', 'office', 'monthly', 3000, 200, NULL, 20, ARRAY['수도','전기','인터넷','냉난방','경비'], '서울특별시 마포구 상암동 월드컵북로 396', '서울특별시', '마포구', '상암동', 37.5790, 126.8890, 'DMC역 1번출구 도보 5분', 165.0, 132.0, 7, 15, 3, '남향', true, 3, true, '중앙난방', true, '2026-04-15', 2019, 'active', true, ARRAY['신축','주차가능','역세권'], 178),

('합정동 신축 사무실', '합정역 인근 2023년 신축. 트렌디한 분위기, 카페거리 인접.', 'office', 'monthly', 1500, 120, NULL, 12, ARRAY['수도','전기','인터넷'], '서울특별시 마포구 합정동 양화로 45', '서울특별시', '마포구', '합정동', 37.5495, 126.9140, '합정역 5번출구 도보 4분', 82.5, 66.0, 3, 6, 2, '동향', false, 0, true, '개별난방', true, '2026-04-10', 2023, 'active', false, ARRAY['신축','역세권'], 112),

('서교동 홍대입구 상가', '홍대입구역 메인 상권. 높은 유동인구, F&B 업종 추천.', 'store', 'monthly', 20000, 800, NULL, 20, ARRAY['수도','전기'], '서울특별시 마포구 서교동 양화로 186', '서울특별시', '마포구', '서교동', 37.5563, 126.9237, '홍대입구역 9번출구 도보 1분', 66.0, 52.8, 1, 4, 1, '남향', false, 0, false, '개별난방', true, '2026-06-01', 2008, 'active', false, ARRAY['역세권','대로변'], 245),

('연남동 소형 사무실', '연남동 경의선숲길 인근. 감성적 분위기, 크리에이티브 업종 적합.', 'office', 'monthly', 500, 60, NULL, 8, ARRAY['수도','인터넷'], '서울특별시 마포구 연남동 연남로 35', '서울특별시', '마포구', '연남동', 37.5660, 126.9250, '홍대입구역 3번출구 도보 10분', 33.0, 26.4, 2, 4, 1, '서향', false, 0, false, '개별난방', true, '2026-04-01', 2015, 'active', false, ARRAY['소형'], 67),

('상암동 사무실 전세', 'DMC 인근 전세 사무실. IT기업 밀집지, 업무 네트워킹 유리.', 'office', 'jeonse', 12000, NULL, NULL, 18, ARRAY['수도','전기','인터넷','경비'], '서울특별시 마포구 상암동 월드컵북로 434', '서울특별시', '마포구', '상암동', 37.5810, 126.8870, 'DMC역 2번출구 도보 3분', 132.0, 105.6, 5, 12, 3, '남향', true, 2, true, '중앙난방', true, '2026-05-01', 2017, 'active', false, ARRAY['역세권','주차가능'], 94);

-- ===== 영등포구 — 여의도 (5건) =====

INSERT INTO properties (title, description, property_type, transaction_type, deposit, monthly_rent, sale_price, maintenance_fee, maintenance_includes, address, city, district, dong, latitude, longitude, nearest_station, area_total, area_exclusive, floor, total_floors, rooms, direction, parking, parking_count, elevator, heating_type, air_conditioning, available_date, built_year, status, is_featured, tags, view_count) VALUES
('여의도 금융가 프라임 오피스', '여의도 IFC 인근 프라임급 사무실. 금융/증권사 밀집지역.', 'office', 'monthly', 8000, 450, NULL, 40, ARRAY['수도','전기','인터넷','냉난방','청소','경비'], '서울특별시 영등포구 여의도동 국제금융로 10', '서울특별시', '영등포구', '여의도동', 37.5255, 126.9260, '여의도역 3번출구 도보 5분', 330.0, 264.0, 15, 30, 5, '남향', true, 5, true, '중앙난방', true, '2026-05-15', 2012, 'active', true, ARRAY['역세권','대형','주차가능'], 298),

('여의도 소형 사무실', '여의나루역 인근 소형 사무실. 한강 조망, 1~5인 기업 적합.', 'office', 'monthly', 2000, 130, NULL, 15, ARRAY['수도','전기','인터넷','냉난방'], '서울특별시 영등포구 여의도동 여의대로 108', '서울특별시', '영등포구', '여의도동', 37.5268, 126.9320, '여의나루역 1번출구 도보 3분', 66.0, 49.5, 8, 20, 2, '남향', true, 1, true, '중앙난방', true, '2026-04-20', 2018, 'active', false, ARRAY['역세권','소형'], 145),

('당산동 사무실 전세', '당산역 역세권. 합리적인 가격대, 중소기업에 적합.', 'office', 'jeonse', 8000, NULL, NULL, 12, ARRAY['수도','전기','인터넷'], '서울특별시 영등포구 당산동 당산로 137', '서울특별시', '영등포구', '당산동', 37.5340, 126.8985, '당산역 2번출구 도보 3분', 99.0, 79.2, 4, 8, 2, '동향', true, 1, true, '개별난방', true, '2026-04-15', 2014, 'active', false, ARRAY['역세권'], 82),

('여의도 빌딩 매매', '여의도 대로변 빌딩. 금융가 인근 랜드마크급 건물.', 'building', 'sale', NULL, NULL, 980000, 0, ARRAY[]::TEXT[], '서울특별시 영등포구 여의도동 의사당대로 83', '서울특별시', '영등포구', '여의도동', 37.5238, 126.9187, '국회의사당역 6번출구 도보 5분', 1980.0, 1650.0, 0, 25, 0, '남향', true, 30, true, '중앙난방', true, NULL, 2000, 'active', false, ARRAY['대로변','대형'], 456),

('영등포동 사무실 월세', '영등포역 인근 실속형 사무실. 교통 편리, 가성비 우수.', 'office', 'monthly', 1000, 70, NULL, 8, ARRAY['수도','전기'], '서울특별시 영등포구 영등포동 영중로 15', '서울특별시', '영등포구', '영등포동', 37.5158, 126.9072, '영등포역 2번출구 도보 5분', 49.5, 39.6, 3, 7, 1, '남향', false, 0, true, '개별난방', true, '2026-04-01', 2006, 'active', false, ARRAY['역세권','소형'], 58);

-- ===== 종로구 (4건) =====

INSERT INTO properties (title, description, property_type, transaction_type, deposit, monthly_rent, sale_price, maintenance_fee, maintenance_includes, address, city, district, dong, latitude, longitude, nearest_station, area_total, area_exclusive, floor, total_floors, rooms, direction, parking, parking_count, elevator, heating_type, air_conditioning, available_date, built_year, status, is_featured, tags, view_count) VALUES
('광화문 프라임 오피스', '광화문 사거리 CBD 핵심 업무지구. 정부청사/대기업 인근.', 'office', 'monthly', 10000, 550, NULL, 45, ARRAY['수도','전기','인터넷','냉난방','청소','경비','주차'], '서울특별시 종로구 세종로 세종대로 175', '서울특별시', '종로구', '세종로', 37.5720, 126.9768, '광화문역 2번출구 도보 2분', 396.0, 330.0, 18, 25, 6, '남향', true, 5, true, '중앙난방', true, '2026-06-01', 2010, 'active', true, ARRAY['역세권','대형','추천'], 345),

('종로 소형 사무실', '종각역 인근 소형 사무실. 1인 사무실/공유오피스 대안으로 적합.', 'office', 'monthly', 500, 50, NULL, 7, ARRAY['수도','인터넷'], '서울특별시 종로구 관철동 종로 69', '서울특별시', '종로구', '관철동', 37.5700, 126.9840, '종각역 3번출구 도보 2분', 26.4, 19.8, 4, 8, 1, '동향', false, 0, true, '개별난방', true, '2026-04-01', 2001, 'active', false, ARRAY['역세권','소형'], 45),

('종로 사무실 전세', '종로3가역 인근. 전통 업무지구, 관공서 접근 편리.', 'office', 'jeonse', 10000, NULL, NULL, 15, ARRAY['수도','전기','인터넷'], '서울특별시 종로구 종로1가 종로 51', '서울특별시', '종로구', '종로1가', 37.5695, 126.9900, '종로3가역 5번출구 도보 3분', 132.0, 105.6, 6, 10, 3, '남향', true, 2, true, '개별난방', true, '2026-05-15', 2007, 'active', false, ARRAY['역세권'], 87),

('내수동 사무실 매매', '경복궁역 인근 사무실 매매. 리모델링 잠재력 높음.', 'office', 'sale', NULL, NULL, 55000, 12, ARRAY['수도','전기'], '서울특별시 종로구 내수동 새문안로 76', '서울특별시', '종로구', '내수동', 37.5738, 126.9720, '경복궁역 6번출구 도보 5분', 165.0, 132.0, 3, 7, 3, '남향', true, 2, true, '개별난방', true, NULL, 2002, 'active', false, ARRAY['주차가능'], 102);

-- ===== 중구 (4건) =====

INSERT INTO properties (title, description, property_type, transaction_type, deposit, monthly_rent, sale_price, maintenance_fee, maintenance_includes, address, city, district, dong, latitude, longitude, nearest_station, area_total, area_exclusive, floor, total_floors, rooms, direction, parking, parking_count, elevator, heating_type, air_conditioning, available_date, built_year, status, is_featured, tags, view_count) VALUES
('을지로 CBD 사무실', '을지로입구역 CBD 업무지구. 금융/보험사 밀집, 프라임급 시설.', 'office', 'monthly', 6000, 320, NULL, 30, ARRAY['수도','전기','인터넷','냉난방','청소','경비'], '서울특별시 중구 을지로동 을지로 100', '서울특별시', '중구', '을지로동', 37.5665, 126.9826, '을지로입구역 1번출구 도보 3분', 231.0, 184.8, 11, 20, 4, '남향', true, 3, true, '중앙난방', true, '2026-05-01', 2013, 'active', false, ARRAY['역세권','주차가능'], 176),

('명동 상가 임대', '명동 메인 상권 2층 상가. 관광객 + 직장인 유동인구 풍부.', 'store', 'monthly', 30000, 1200, NULL, 25, ARRAY['수도','전기'], '서울특별시 중구 명동 명동길 73', '서울특별시', '중구', '명동', 37.5635, 126.9850, '명동역 8번출구 도보 1분', 82.5, 66.0, 2, 5, 1, '남향', false, 0, false, '개별난방', true, '2026-07-01', 2005, 'active', false, ARRAY['역세권','대로변'], 389),

('남대문로 사무실 전세', '시청역 인근 사무실. CBD 중심, 다수 노선 환승 편리.', 'office', 'jeonse', 18000, NULL, NULL, 22, ARRAY['수도','전기','인터넷','경비'], '서울특별시 중구 남대문로 남대문로 92', '서울특별시', '중구', '남대문로', 37.5610, 126.9780, '시청역 7번출구 도보 4분', 165.0, 132.0, 8, 15, 3, '남향', true, 2, true, '중앙난방', true, '2026-05-01', 2011, 'active', false, ARRAY['역세권'], 121),

('충무로 소형 사무실', '충무로역 인근 가성비 사무실. 을지로/명동 접근 편리.', 'office', 'monthly', 800, 55, NULL, 8, ARRAY['수도','인터넷'], '서울특별시 중구 충무로 퇴계로 200', '서울특별시', '중구', '충무로', 37.5590, 126.9940, '충무로역 3번출구 도보 2분', 39.6, 29.7, 3, 6, 1, '북향', false, 0, true, '개별난방', true, '2026-04-01', 2000, 'active', false, ARRAY['역세권','소형'], 43);

-- ===== 성동구 — 성수 (3건) =====

INSERT INTO properties (title, description, property_type, transaction_type, deposit, monthly_rent, sale_price, maintenance_fee, maintenance_includes, address, city, district, dong, latitude, longitude, nearest_station, area_total, area_exclusive, floor, total_floors, rooms, direction, parking, parking_count, elevator, heating_type, air_conditioning, available_date, built_year, status, is_featured, tags, view_count) VALUES
('성수동 트렌디 사무실', '성수역 카페거리 인근. 크리에이티브/디자인 기업에 인기. 올 리모델링.', 'office', 'monthly', 2000, 140, NULL, 12, ARRAY['수도','전기','인터넷'], '서울특별시 성동구 성수동1가 성수이로 51', '서울특별시', '성동구', '성수동1가', 37.5445, 127.0560, '성수역 3번출구 도보 5분', 99.0, 79.2, 3, 5, 2, '남향', false, 0, true, '개별난방', true, '2026-04-15', 2022, 'active', true, ARRAY['신축','인테리어','역세권'], 198),

('성수동 소형 스타트업 오피스', '뚝섬역 인근 소형 사무실. 3~5인 스타트업에 딱 맞는 공간.', 'office', 'monthly', 1000, 80, NULL, 8, ARRAY['수도','인터넷'], '서울특별시 성동구 성수동2가 뚝섬로 331', '서울특별시', '성동구', '성수동2가', 37.5425, 127.0505, '뚝섬역 2번출구 도보 4분', 49.5, 39.6, 2, 4, 1, '동향', false, 0, false, '개별난방', true, '2026-04-01', 2020, 'active', false, ARRAY['소형','신축'], 87),

('성수동 사무실 매매', '성수 핫플레이스 인근 사무실 매매. 향후 가치 상승 기대.', 'office', 'sale', NULL, NULL, 42000, 10, ARRAY['수도','전기'], '서울특별시 성동구 성수동1가 서울숲2길 44', '서울특별시', '성동구', '성수동1가', 37.5465, 127.0440, '서울숲역 4번출구 도보 7분', 132.0, 105.6, 2, 5, 3, '남향', true, 2, false, '개별난방', true, NULL, 2015, 'active', false, ARRAY['주차가능'], 134);

-- ===== 구로구 — 가산디지털 (3건) =====

INSERT INTO properties (title, description, property_type, transaction_type, deposit, monthly_rent, sale_price, maintenance_fee, maintenance_includes, address, city, district, dong, latitude, longitude, nearest_station, area_total, area_exclusive, floor, total_floors, rooms, direction, parking, parking_count, elevator, heating_type, air_conditioning, available_date, built_year, status, is_featured, tags, view_count) VALUES
('가산디지털 IT사무실', '가산디지털단지역 역세권. IT기업 밀집, 합리적 임대료.', 'office', 'monthly', 1000, 65, NULL, 8, ARRAY['수도','전기','인터넷','냉난방'], '서울특별시 구로구 가산동 가산디지털1로 168', '서울특별시', '구로구', '가산동', 37.4780, 126.8826, '가산디지털단지역 7번출구 도보 5분', 82.5, 66.0, 10, 20, 2, '남향', true, 1, true, '중앙난방', true, '2026-04-10', 2014, 'active', false, ARRAY['역세권','주차가능'], 95),

('가산동 대형 사무실', 'G밸리 내 대형 사무실. IT/제조업 본사 사무실로 적합.', 'office', 'monthly', 3000, 150, NULL, 15, ARRAY['수도','전기','인터넷','냉난방','경비'], '서울특별시 구로구 가산동 디지털로 272', '서울특별시', '구로구', '가산동', 37.4810, 126.8830, '가산디지털단지역 5번출구 도보 3분', 231.0, 184.8, 8, 15, 4, '남향', true, 3, true, '중앙난방', true, '2026-05-01', 2016, 'active', false, ARRAY['역세권','대형','주차가능'], 118),

('구로동 사무실 전세', '구로디지털단지역 인근. 가성비 최고, 중소기업 본사 적합.', 'office', 'jeonse', 5000, NULL, NULL, 10, ARRAY['수도','전기','인터넷'], '서울특별시 구로구 구로동 디지털로26길 72', '서울특별시', '구로구', '구로동', 37.4845, 126.8950, '구로디지털단지역 2번출구 도보 4분', 132.0, 105.6, 5, 10, 3, '동향', true, 2, true, '개별난방', true, '2026-04-15', 2012, 'active', false, ARRAY['역세권'], 72);
