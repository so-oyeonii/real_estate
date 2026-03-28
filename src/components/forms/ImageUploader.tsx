// --- 이미지 업로드 컴포넌트 ---
// 매물 등록/수정 폼에서 사용
// 최대 5장, 대표 사진 지정, 미리보기, 삭제 기능

'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

/** 업로드된 이미지 정보 */
export interface UploadedImage {
  id?: string;           // DB에 저장된 경우 ID
  url: string;           // 이미지 URL
  path?: string;         // Storage 경로
  isPrimary: boolean;    // 대표 이미지 여부
}

interface ImageUploaderProps {
  propertyId?: string;                           // 매물 ID (수정 시)
  images: UploadedImage[];                       // 현재 이미지 목록
  onChange: (images: UploadedImage[]) => void;    // 변경 콜백
  maxImages?: number;                            // 최대 이미지 수
}

export default function ImageUploader({
  propertyId,
  images,
  onChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 시 업로드
  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // 최대 개수 체크
    const remaining = maxImages - images.length;
    if (remaining <= 0) {
      setError(`최대 ${maxImages}장까지 업로드할 수 있습니다.`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remaining);
    setError('');
    setIsUploading(true);

    try {
      const newImages: UploadedImage[] = [];

      for (const file of filesToUpload) {
        // 파일 크기 체크 (5MB)
        if (file.size > 5 * 1024 * 1024) {
          setError(`${file.name}: 5MB 이하 파일만 업로드 가능합니다.`);
          continue;
        }

        // 파일 형식 체크
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
          setError(`${file.name}: JPG, PNG, WebP만 지원합니다.`);
          continue;
        }

        // API로 업로드
        const formData = new FormData();
        formData.append('file', file);
        if (propertyId) formData.append('propertyId', propertyId);

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          setError(data.error || '업로드 실패');
          continue;
        }

        const result = await response.json();
        newImages.push({
          url: result.url,
          path: result.path,
          isPrimary: images.length === 0 && newImages.length === 0, // 첫 이미지를 대표로
        });
      }

      if (newImages.length > 0) {
        onChange([...images, ...newImages]);
      }
    } catch {
      setError('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
      // input 초기화 (같은 파일 재선택 가능하도록)
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  // 대표 이미지 변경
  function handleSetPrimary(index: number) {
    const updated = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    onChange(updated);
  }

  // 이미지 삭제
  function handleRemove(index: number) {
    const updated = images.filter((_, i) => i !== index);
    // 대표 이미지가 삭제되면 첫 번째를 대표로
    if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
      updated[0].isPrimary = true;
    }
    onChange(updated);
  }

  return (
    <div>
      {/* 이미지 미리보기 그리드 */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
          {images.map((img, index) => (
            <div key={img.url} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-slate-200">
              {/* 이미지 */}
              <Image
                src={img.url}
                alt={`매물 사진 ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 20vw"
              />

              {/* 대표 배지 */}
              {img.isPrimary && (
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded">
                  대표
                </span>
              )}

              {/* 호버 시 액션 버튼 */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!img.isPrimary && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(index)}
                    className="px-2 py-1 bg-white text-slate-800 text-xs rounded font-medium hover:bg-blue-50"
                  >
                    대표 지정
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="px-2 py-1 bg-red-500 text-white text-xs rounded font-medium hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 업로드 영역 */}
      {images.length < maxImages && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
            ${isUploading
              ? 'border-slate-300 bg-slate-50'
              : 'border-slate-300 hover:border-[var(--color-primary)] hover:bg-blue-50/30'
            }`}
        >
          {isUploading ? (
            <div className="text-slate-500">
              <svg className="w-8 h-8 mx-auto mb-2 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-sm">업로드 중...</p>
            </div>
          ) : (
            <>
              <svg className="w-10 h-10 text-slate-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-slate-600 font-medium">
                클릭하여 이미지 선택
              </p>
              <p className="text-xs text-slate-400 mt-1">
                JPG, PNG, WebP · 최대 5MB · {images.length}/{maxImages}장
              </p>
            </>
          )}
        </div>
      )}

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* 에러 메시지 */}
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
