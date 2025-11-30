"use client";

import { useState } from "react";
import { Upload, X, Loader2, Plus } from "lucide-react";

interface MultipleImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  maxImages?: number;
}

export default function MultipleImageUpload({
  values,
  onChange,
  label = "Thư viện ảnh",
  maxImages = 5,
}: MultipleImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (files: FileList) => {
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - values.length;
    if (remainingSlots <= 0) {
      alert(`Bạn chỉ có thể upload tối đa ${maxImages} ảnh`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (const file of filesToUpload) {
        if (!file.type.startsWith("image/")) {
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          newUrls.push(data.url);
        }
      }

      onChange([...values, ...newUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Có lỗi xảy ra khi upload ảnh");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label} {values.length > 0 && `(${values.length}/${maxImages})`}
      </label>

      <div className="grid grid-cols-3 gap-3">
        {values.map((url, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square border-2 border-gray-300 rounded-lg overflow-hidden">
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {values.length < maxImages && (
          <label
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-rose-400 hover:bg-gray-50 transition-colors"
          >
            {uploading ? (
              <Loader2 className="w-8 h-8 text-rose-400 animate-spin" />
            ) : (
              <>
                <Plus className="w-8 h-8 text-gray-400 mb-1" />
                <span className="text-xs text-gray-500 text-center px-2">
                  Thêm ảnh
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  handleFileChange(e.target.files);
                }
              }}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>

      <p className="text-xs text-gray-500">
        PNG, JPG, WebP, GIF (tối đa 5MB mỗi ảnh)
      </p>
    </div>
  );
}
