// --- 새 매물 등록 페이지 ---

import PropertyForm from '@/components/forms/PropertyForm';

export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">새 매물 등록</h1>
      <PropertyForm />
    </div>
  );
}
