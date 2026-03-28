// --- 매물 수정 페이지 ---

import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { mapPropertyRowToProperty } from '@/lib/utils';
import type { PropertyRow } from '@/types/property';
import PropertyForm from '@/components/forms/PropertyForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // 매물 정보 조회
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }

  // 매물 이미지 조회
  const { data: imageData } = await supabase
    .from('property_images')
    .select('*')
    .eq('property_id', id)
    .order('display_order', { ascending: true });

  const property = mapPropertyRowToProperty(data as PropertyRow);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">매물 수정</h1>
      <PropertyForm
        initialData={property}
        propertyId={id}
        initialImages={imageData || []}
      />
    </div>
  );
}
