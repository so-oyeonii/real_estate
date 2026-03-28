// --- 매물 등록/수정 폼 ---
// 관리자가 매물 정보를 입력하는 폼
// initialData가 있으면 수정 모드, 없으면 등록 모드

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Property } from '@/types/property';
import {
  PROPERTY_TYPE_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
  DISTRICT_OPTIONS,
  DONG_BY_DISTRICT,
  TAG_OPTIONS,
} from '@/config/constants';

interface PropertyFormProps {
  initialData?: Property;
  propertyId?: string;
}

export default function PropertyForm({ initialData, propertyId }: PropertyFormProps) {
  const router = useRouter();
  const isEditMode = !!propertyId;

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    propertyType: initialData?.propertyType || 'office',
    transactionType: initialData?.transactionType || 'monthly',
    deposit: initialData?.deposit?.toString() || '',
    monthlyRent: initialData?.monthlyRent?.toString() || '',
    salePrice: initialData?.salePrice?.toString() || '',
    maintenanceFee: initialData?.maintenanceFee?.toString() || '',
    address: initialData?.address || '',
    district: initialData?.district || '',
    dong: initialData?.dong || '',
    nearestStation: initialData?.nearestStation || '',
    areaTotal: initialData?.areaTotal?.toString() || '',
    areaExclusive: initialData?.areaExclusive?.toString() || '',
    floor: initialData?.floor?.toString() || '',
    totalFloors: initialData?.totalFloors?.toString() || '',
    rooms: initialData?.rooms?.toString() || '',
    direction: initialData?.direction || '',
    parking: initialData?.parking || false,
    parkingCount: initialData?.parkingCount?.toString() || '',
    elevator: initialData?.elevator || false,
    heatingType: initialData?.heatingType || '',
    builtYear: initialData?.builtYear?.toString() || '',
    status: initialData?.status || 'active',
    isFeatured: initialData?.isFeatured || false,
    tags: initialData?.tags || [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }

  function handleTagToggle(tag: string) {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) { setError('매물 제목을 입력해주세요'); return; }
    if (!formData.address.trim()) { setError('주소를 입력해주세요'); return; }
    if (!formData.district) { setError('구를 선택해주세요'); return; }

    setIsSubmitting(true);

    try {
      const supabase = createClient();

      // DB에 저장할 데이터 (스네이크 케이스)
      const dbData = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        property_type: formData.propertyType,
        transaction_type: formData.transactionType,
        deposit: formData.deposit ? Number(formData.deposit) : null,
        monthly_rent: formData.monthlyRent ? Number(formData.monthlyRent) : null,
        sale_price: formData.salePrice ? Number(formData.salePrice) : null,
        maintenance_fee: formData.maintenanceFee ? Number(formData.maintenanceFee) : null,
        address: formData.address.trim(),
        city: '서울특별시',
        district: formData.district,
        dong: formData.dong || null,
        nearest_station: formData.nearestStation.trim() || null,
        area_total: formData.areaTotal ? Number(formData.areaTotal) : null,
        area_exclusive: formData.areaExclusive ? Number(formData.areaExclusive) : null,
        floor: formData.floor ? Number(formData.floor) : null,
        total_floors: formData.totalFloors ? Number(formData.totalFloors) : null,
        rooms: formData.rooms ? Number(formData.rooms) : null,
        direction: formData.direction || null,
        parking: formData.parking,
        parking_count: formData.parkingCount ? Number(formData.parkingCount) : null,
        elevator: formData.elevator,
        heating_type: formData.heatingType || null,
        built_year: formData.builtYear ? Number(formData.builtYear) : null,
        status: formData.status,
        is_featured: formData.isFeatured,
        tags: formData.tags,
      };

      if (isEditMode) {
        const { error: updateError } = await supabase
          .from('properties').update(dbData).eq('id', propertyId);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('properties').insert(dbData);
        if (insertError) throw insertError;
      }

      router.push('/admin/properties');
      router.refresh();
    } catch (err) {
      console.error('매물 저장 실패:', err);
      setError('매물 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // 선택된 구에 해당하는 동 목록
  const dongOptions = formData.district ? (DONG_BY_DISTRICT[formData.district] || []) : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">

      {/* 기본 정보 */}
      <Section title="기본 정보">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="title">매물 제목 *</Label>
            <input id="title" name="title" value={formData.title} onChange={handleChange}
              placeholder="역삼역 초역세권 프라임 사무실" maxLength={200}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <Label htmlFor="propertyType">매물 유형 *</Label>
            <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              {PROPERTY_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="transactionType">거래 유형 *</Label>
            <select id="transactionType" name="transactionType" value={formData.transactionType} onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              {TRANSACTION_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">상세 설명</Label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange}
              rows={4} maxLength={5000} placeholder="매물에 대한 상세 설명을 입력하세요"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
        </div>
      </Section>

      {/* 가격 정보 */}
      <Section title="가격 정보 (만원)">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(formData.transactionType === 'monthly' || formData.transactionType === 'jeonse') && (
            <div>
              <Label htmlFor="deposit">보증금</Label>
              <input id="deposit" name="deposit" type="number" value={formData.deposit} onChange={handleChange}
                placeholder="5000" min="0"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
            </div>
          )}
          {formData.transactionType === 'monthly' && (
            <div>
              <Label htmlFor="monthlyRent">월세</Label>
              <input id="monthlyRent" name="monthlyRent" type="number" value={formData.monthlyRent} onChange={handleChange}
                placeholder="300" min="0"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
            </div>
          )}
          {formData.transactionType === 'sale' && (
            <div>
              <Label htmlFor="salePrice">매매가</Label>
              <input id="salePrice" name="salePrice" type="number" value={formData.salePrice} onChange={handleChange}
                placeholder="100000" min="0"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
            </div>
          )}
          <div>
            <Label htmlFor="maintenanceFee">관리비</Label>
            <input id="maintenanceFee" name="maintenanceFee" type="number" value={formData.maintenanceFee} onChange={handleChange}
              placeholder="25" min="0"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
        </div>
      </Section>

      {/* 위치 */}
      <Section title="위치 정보">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="address">주소 *</Label>
            <input id="address" name="address" value={formData.address} onChange={handleChange}
              placeholder="서울특별시 강남구 역삼동 테헤란로 152"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <Label htmlFor="district">구 *</Label>
            <select id="district" name="district" value={formData.district} onChange={(e) => {
              handleChange(e);
              setFormData(prev => ({ ...prev, dong: '' }));
            }}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              <option value="">선택</option>
              {DISTRICT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="dong">동</Label>
            <select id="dong" name="dong" value={formData.dong} onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              <option value="">선택</option>
              {dongOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="nearestStation">최근 역</Label>
            <input id="nearestStation" name="nearestStation" value={formData.nearestStation} onChange={handleChange}
              placeholder="역삼역 3번출구 도보 3분"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
        </div>
      </Section>

      {/* 스펙 */}
      <Section title="매물 스펙">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="areaExclusive">전용 면적 (㎡)</Label>
            <input id="areaExclusive" name="areaExclusive" type="number" value={formData.areaExclusive} onChange={handleChange}
              placeholder="99" min="0" step="0.01"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <Label htmlFor="areaTotal">공급 면적 (㎡)</Label>
            <input id="areaTotal" name="areaTotal" type="number" value={formData.areaTotal} onChange={handleChange}
              placeholder="132" min="0" step="0.01"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <Label htmlFor="floor">층</Label>
            <input id="floor" name="floor" type="number" value={formData.floor} onChange={handleChange}
              placeholder="8"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <Label htmlFor="totalFloors">전체 층수</Label>
            <input id="totalFloors" name="totalFloors" type="number" value={formData.totalFloors} onChange={handleChange}
              placeholder="15" min="1"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <Label htmlFor="rooms">룸 수</Label>
            <input id="rooms" name="rooms" type="number" value={formData.rooms} onChange={handleChange}
              placeholder="3" min="0"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <Label htmlFor="direction">방향</Label>
            <select id="direction" name="direction" value={formData.direction} onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              <option value="">선택</option>
              {['동향','서향','남향','북향','남동향','남서향','북동향','북서향'].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="heatingType">난방</Label>
            <select id="heatingType" name="heatingType" value={formData.heatingType} onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              <option value="">선택</option>
              <option value="개별난방">개별난방</option>
              <option value="중앙난방">중앙난방</option>
            </select>
          </div>
          <div>
            <Label htmlFor="builtYear">건축 연도</Label>
            <input id="builtYear" name="builtYear" type="number" value={formData.builtYear} onChange={handleChange}
              placeholder="2020" min="1900" max="2030"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
        </div>

        {/* 체크박스 */}
        <div className="flex flex-wrap gap-6 mt-4">
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input type="checkbox" name="parking" checked={formData.parking} onChange={handleChange} className="w-4 h-4 rounded" />
            주차 가능
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input type="checkbox" name="elevator" checked={formData.elevator} onChange={handleChange} className="w-4 h-4 rounded" />
            엘리베이터
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-4 h-4 rounded" />
            추천 매물
          </label>
        </div>
      </Section>

      {/* 태그 */}
      <Section title="태그">
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map(tag => (
            <button
              key={tag.value}
              type="button"
              onClick={() => handleTagToggle(tag.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                formData.tags.includes(tag.value)
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </Section>

      {/* 상태 */}
      <Section title="매물 상태">
        <select name="status" value={formData.status} onChange={handleChange}
          className="px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
          <option value="active">공개중</option>
          <option value="reserved">예약중</option>
          <option value="closed">거래완료</option>
        </select>
      </Section>

      {/* 에러 + 버튼 */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={isSubmitting}
          className="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-semibold
                     hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50">
          {isSubmitting ? '저장 중...' : isEditMode ? '수정 저장' : '매물 등록'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">
          취소
        </button>
      </div>
    </form>
  );
}

// 섹션 래퍼
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

// 라벨
function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 mb-1">
      {children}
    </label>
  );
}
