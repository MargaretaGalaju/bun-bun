'use client';

import { useCallback, useRef, useState } from 'react';
import { presignCategoryUpload } from '@/lib/api/admin';
import { uploadFileToR2 } from '@/lib/api/products';

const ACCEPTED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

interface CategoryImageUploaderProps {
  categoryId: string;
  imageUrl: string | null;
  onImageChange: (url: string | null) => void;
  t: (key: string) => string;
}

export default function CategoryImageUploader({
  categoryId,
  imageUrl,
  onImageChange,
  t,
}: CategoryImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      const fileExt = ACCEPTED_TYPES[file.type];
      if (!fileExt) return;

      setUploading(true);
      setError(null);

      try {
        // Step 1: Get presigned URL
        const { uploadUrl, publicUrl } = await presignCategoryUpload(
          categoryId,
          file.type,
          fileExt,
        );
        // Step 2: Upload to R2
        await uploadFileToR2(uploadUrl, file);
        // Step 3: Return the public URL
        onImageChange(publicUrl);
      } catch {
        setError(t('uploadFailed'));
      } finally {
        setUploading(false);
      }
    },
    [categoryId, onImageChange, t],
  );

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const file = Array.from(files).find((f) => f.type in ACCEPTED_TYPES);
      if (file) uploadFile(file);
    },
    [uploadFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
        e.target.value = '';
      }
    },
    [handleFiles],
  );

  const handleRemove = useCallback(() => {
    onImageChange(null);
  }, [onImageChange]);

  // If image already uploaded, show preview with replace/remove
  if (imageUrl) {
    return (
      <div>
        <div className="relative inline-block">
          <img
            src={imageUrl}
            alt=""
            className="w-48 h-48 object-cover rounded-lg border border-gray-200"
          />
        </div>

        <div className="mt-3 flex gap-2">
          <label
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-md cursor-pointer text-sm font-medium transition-colors ${
              uploading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {uploading ? t('uploading') : t('replaceImage')}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleInputChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <button
            onClick={handleRemove}
            disabled={uploading}
            className="py-2 px-4 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {t('removeImage')}
          </button>
        </div>

        {uploading && (
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t('uploading')}
          </div>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
            {error}
          </p>
        )}
      </div>
    );
  }

  // Drop zone when no image
  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-lg transition-colors ${
          uploading
            ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
            : dragOver
              ? 'border-green-500 bg-green-50 cursor-pointer'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 cursor-pointer'
        }`}
      >
        {uploading ? (
          <>
            <svg className="w-10 h-10 text-gray-400 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-gray-500">{t('uploading')}</p>
          </>
        ) : (
          <>
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 16V4m0 0l-4 4m4-4l4 4M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4"
              />
            </svg>
            <p className="text-sm text-gray-500 text-center">
              {t('dragDropHint')}
            </p>
            <p className="text-xs text-gray-400">JPG, PNG, WebP</p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          disabled={uploading}
          className="hidden"
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}
