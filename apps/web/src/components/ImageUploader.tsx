'use client';

import { useCallback, useRef, useState } from 'react';
import type { ProductImageDto } from '@bun-bun/shared';
import {
  presignUpload,
  uploadFileToR2,
  addSellerProductImage,
  removeSellerProductImage,
} from '@/lib/api/products';

const ACCEPTED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

interface UploadingFile {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'done' | 'error';
  imageDto?: ProductImageDto;
  errorMsg?: string;
}

interface ImageUploaderProps {
  productId: string;
  images: ProductImageDto[];
  onImagesChange: (images: ProductImageDto[]) => void;
  t: (key: string) => string;
}

export default function ImageUploader({
  productId,
  images,
  onImagesChange,
  t,
}: ImageUploaderProps) {
  const [uploads, setUploads] = useState<UploadingFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      const fileExt = ACCEPTED_TYPES[file.type];
      if (!fileExt) return;

      const uploadId = crypto.randomUUID();
      const preview = URL.createObjectURL(file);

      const entry: UploadingFile = {
        id: uploadId,
        file,
        preview,
        status: 'uploading',
      };

      setUploads((prev) => [...prev, entry]);

      try {
        // Step 1: Get presigned URL
        const { uploadUrl, key } = await presignUpload(productId, file.type, fileExt);
        // Step 2: Upload to R2
        await uploadFileToR2(uploadUrl, file);
        // Step 3: Register in DB
        const img = await addSellerProductImage(productId, key);

        setUploads((prev) =>
          prev.map((u) =>
            u.id === uploadId ? { ...u, status: 'done' as const, imageDto: img } : u,
          ),
        );
        onImagesChange([...images, img]);
      } catch {
        setUploads((prev) =>
          prev.map((u) =>
            u.id === uploadId
              ? { ...u, status: 'error' as const, errorMsg: t('uploadFailed') }
              : u,
          ),
        );
      }
    },
    [productId, images, onImagesChange, t],
  );

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files).filter((f) => f.type in ACCEPTED_TYPES);
      for (const file of fileArray) {
        uploadFile(file);
      }
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

  const handleRemove = useCallback(
    async (imageId: string) => {
      setRemovingId(imageId);
      try {
        await removeSellerProductImage(productId, imageId);
        const updated = images.filter((img) => img.id !== imageId);
        onImagesChange(updated);
        setUploads((prev) => prev.filter((u) => u.imageDto?.id !== imageId));
      } catch {
        // silently fail, image stays
      } finally {
        setRemovingId(null);
      }
    },
    [productId, images, onImagesChange],
  );

  const dismissError = useCallback((uploadId: string) => {
    setUploads((prev) => prev.filter((u) => u.id !== uploadId));
  }, []);

  const isUploading = uploads.some((u) => u.status === 'uploading');

  return (
    <div>
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          dragOver
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
        }`}
      >
        {/* Upload icon */}
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
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* Uploading indicators */}
      {uploads.filter((u) => u.status === 'uploading').length > 0 && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {t('uploading')} ({uploads.filter((u) => u.status === 'uploading').length})
        </div>
      )}

      {/* Error messages */}
      {uploads
        .filter((u) => u.status === 'error')
        .map((u) => (
          <div
            key={u.id}
            className="mt-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-md px-3 py-2"
          >
            <span className="flex-1">{u.errorMsg} — {u.file.name}</span>
            <button
              onClick={() => dismissError(u.id)}
              className="text-red-400 hover:text-red-600"
            >
              &times;
            </button>
          </div>
        ))}

      {/* Image grid */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative group">
              <img
                src={img.url}
                alt=""
                className="w-full aspect-square object-cover rounded-lg border border-gray-200"
              />
              <button
                onClick={() => handleRemove(img.id)}
                disabled={removingId === img.id}
                className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-black/60 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 hover:bg-black/80"
                title={t('removeImage')}
              >
                &times;
              </button>
              {removingId === img.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-lg">
                  <svg className="w-5 h-5 animate-spin text-gray-500" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
