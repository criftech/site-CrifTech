import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Check, Link } from 'lucide-react';

interface ImageUploadInputProps {
  value: string;
  onChange: (newValue: string) => void;
  label?: string;
  placeholder?: string;
  helpText?: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  value,
  onChange,
  label = 'Image',
  placeholder = 'https://example.com/image.jpg or upload file...',
  helpText = 'Upload an image from your device or paste an image URL.'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP, SVG, etc.)');
      return;
    }

    // Limit size check (e.g., 5MB max before canvas compression or direct base64)
    if (file.size > 8 * 1024 * 1024) {
      alert('File size exceeds 8MB. Please select a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        // If image is very large, compress via HTML5 canvas
        compressImageIfNeeded(result, (compressedDataUrl) => {
          onChange(compressedDataUrl);
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const compressImageIfNeeded = (dataUrl: string, callback: (res: string) => void) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const maxWidth = 1600;
      const maxHeight = 1600;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          callback(canvas.toDataURL('image/jpeg', 0.85));
          return;
        }
      }
      callback(dataUrl);
    };
    img.onerror = () => callback(dataUrl);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
          <span>{label}</span>
        </label>
        <div className="flex items-center gap-1 text-[11px] bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              mode === 'upload' ? 'bg-[#0066FF] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Upload Device File
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              mode === 'url' ? 'bg-[#0066FF] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Image URL
          </button>
        </div>
      </div>

      {/* Preview Box if image exists */}
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-2 flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg bg-slate-900 overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Image load fallback
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+Image';
              }}
            />
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Image Attached</span>
            </p>
            <p className="text-[10px] text-slate-400 truncate font-mono">
              {value.startsWith('data:') ? 'Base64 Local Device File' : value}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition-all border border-rose-500/30"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          {mode === 'upload' ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                isDragging
                  ? 'border-[#0066FF] bg-blue-600/10'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="p-2.5 rounded-full bg-slate-900 text-blue-400 border border-slate-800">
                <Upload className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-white">
                  Click to select image from device or drag & drop
                </p>
                <p className="text-[11px] text-slate-400">
                  Supports PNG, JPG, WEBP, SVG (Max 8MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <Link className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          )}
        </>
      )}

      {helpText && <p className="text-[10px] text-slate-500">{helpText}</p>}
    </div>
  );
};
