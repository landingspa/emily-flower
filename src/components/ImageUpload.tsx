"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Hình ảnh",
  required = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh");
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();
      onChange(data.url);
      setPreview(data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(
        error instanceof Error ? error.message : "Có lỗi xảy ra khi upload ảnh"
      );
      setPreview(value); // Revert to original
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {preview ? (
        <div className="relative group">
          <div className="relative w-full h-48 border-2 border-gray-300 rounded-lg overflow-hidden">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleRemove}
            disabled={uploading}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute bottom-2 right-2 px-3 py-1.5 bg-white text-gray-700 text-sm rounded-lg hover:bg-gray-100 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Thay đổi
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive
              ? "border-rose-400 bg-rose-50"
              : "border-gray-300 hover:border-rose-400 hover:bg-gray-50"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-12 h-12 text-rose-400 animate-spin" />
              <p className="text-sm text-gray-600">Đang upload...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-gray-100 rounded-full">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Kéo thả ảnh vào đây hoặc click để chọn
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WebP, GIF (tối đa 5MB)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileChange(file);
        }}
        className="hidden"
      />
    </div>
  );
}
