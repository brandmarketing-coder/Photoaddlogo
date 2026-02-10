import React, { useState, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { Button } from './components/Button';
import { processImage } from './services/imageProcessor';
import { EditorSettings, DEFAULT_SETTINGS } from './types';

function App() {
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Use fixed settings
  const settings: EditorSettings = DEFAULT_SETTINGS;

  useEffect(() => {
    let active = true;

    const generatePreview = async () => {
      if (!mainImage) return;
      
      setIsProcessing(true);
      try {
        let logoUrl: string | null = null;

        // Fetch the logo asset dynamically. 
        // We use fetch + Blob + createObjectURL to:
        // 1. Ensure the file actually loads before passing to canvas
        // 2. Bypass browser caching so if you replace the file on disk, it updates immediately ('no-cache')
        // 3. Handle both SVG and PNG files if renamed, though defaults to checking logo.svg
        try {
            // Use .svg for better quality (vector scaling)
            const response = await fetch('./logo.png', { cache: 'no-cache' });
            if (response.ok) {
                const blob = await response.blob();
                logoUrl = URL.createObjectURL(blob);
            } else {
                console.warn('logo.svg not found. Ensure the file exists in the root directory.');
            }
        } catch (e) {
            console.error('Error fetching logo asset:', e);
        }

        // Process the image (even if logo failed, we still render the footer)
        const result = await processImage(mainImage, logoUrl, settings);
        
        // Clean up the object URL to avoid memory leaks
        if (logoUrl) {
            URL.revokeObjectURL(logoUrl);
        }

        if (active) {
          setProcessedImage(result);
        }
      } catch (err) {
        console.error("Failed to process image", err);
      } finally {
        if (active) setIsProcessing(false);
      }
    };

    // Debounce
    const timer = setTimeout(generatePreview, 100);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [mainImage]);

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.download = `oright-pro-${Date.now()}.jpg`;
      link.href = processedImage;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-800">
      
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#75bc37] to-[#5da628] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              O
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-700">
              O'right | PRO <span className="text-[#75bc37]">影像編輯器</span>
            </span>
          </div>

        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Main Content Area */}
        <div className="flex flex-col gap-6">
            
            {/* 1. Upload Section */}
            {!mainImage && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center space-y-4 max-w-2xl mx-auto w-full">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">上傳照片</h2>
                  <p className="text-gray-500 max-w-md mx-auto">選擇一張照片 自動加入 O'right PRO 品牌Logo設計。</p>
                  
                  <div className="pt-2">
                    <ImageUploader 
                        label=""
                        imageSrc={null}
                        onImageSelected={setMainImage}
                        onClear={() => {}}
                        placeholderText="點擊或拖曳照片至此"
                    />
                  </div>
              </div>
            )}

            {/* 2. Editor / Preview Section */}
            {mainImage && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
                    
                    {/* Left: Preview */}
                    <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                         <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-semibold text-gray-700">預覽</h3>
                            <button 
                                onClick={() => setMainImage(null)}
                                className="text-xs text-gray-500 hover:text-red-500 font-medium px-3 py-1 rounded-full hover:bg-red-50 transition-colors"
                            >
                                重置 / 上傳新照片
                            </button>
                         </div>
                         
                         <div className="p-6 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/subtle-grey.png')] min-h-[400px]">
                            {isProcessing ? (
                                <div className="flex flex-col items-center gap-3 text-gray-400">
                                    <svg className="animate-spin h-8 w-8 text-[#75bc37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className="font-medium">正在套用品牌樣式...</span>
                                </div>
                            ) : (
                                <img 
                                    src={processedImage || mainImage} 
                                    alt="Result" 
                                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-lg ring-1 ring-black/5"
                                />
                            )}
                         </div>
                    </div>

                    {/* Right: Actions & Info */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                            <h3 className="font-bold text-gray-800 mb-4">匯出</h3>
                            <Button onClick={handleDownload} className="w-full justify-center py-3 text-lg" disabled={!processedImage}>
                                下載圖片
                            </Button>
                            <p className="text-xs text-gray-400 mt-3 text-center">
                                高畫質 JPG • 已套用固定品牌樣式
                            </p>
                        </div>
                    </div>

                </div>
            )}
        </div>
      </main>
    </div>
  );
}

export default App;