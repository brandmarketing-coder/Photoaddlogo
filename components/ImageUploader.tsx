import React, { useRef } from 'react';

interface ImageUploaderProps {
  label: string;
  imageSrc: string | null;
  onImageSelected: (src: string) => void;
  onClear: () => void;
  placeholderText?: string;
  accept?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  imageSrc,
  onImageSelected,
  onClear,
  placeholderText = "點擊上傳圖片",
  accept = "image/*"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageSelected(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />

      {!imageSrc ? (
        <div 
          onClick={triggerUpload}
          className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 hover:border-green-400 transition-colors cursor-pointer flex flex-col items-center justify-center text-gray-400 gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">{placeholderText}</span>
        </div>
      ) : (
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-white">
          <img 
            src={imageSrc} 
            alt="Preview" 
            className="w-full h-32 object-contain bg-checkered" // bg-checkered logic would need css, using plain generic for now
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button 
              onClick={triggerUpload}
              className="text-white text-xs bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30 backdrop-blur-sm"
            >
              更換
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              className="text-red-300 text-xs bg-black/40 px-3 py-1.5 rounded-full hover:bg-red-500/80 backdrop-blur-sm"
            >
              移除
            </button>
          </div>
        </div>
      )}
    </div>
  );
};