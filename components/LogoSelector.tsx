import React from 'react';

interface LogoOption {
  id: string;
  name: string;
  src: string;
}

// Recreating the logos as SVGs based on the description/screenshots
// This ensures they are high quality and available immediately without external hosting
const LOGO_OPTIONS: LogoOption[] = [
  {
    id: 'oright-pro-vertical',
    name: 'O\'right PRO (Vertical)',
    src: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 250" width="600" height="250">
  <circle cx="80" cy="80" r="65" fill="#75bc37"/>
  <path fill="#666" d="M165 40 h10 v80 h-10 z M195 60 q0 -20 20 -20 h5 v10 h-5 q -10 0 -10 10 v60 h-10 z M230 40 h10 v80 h-10 z M250 120 l 10 -80 h10 l -10 80 z M275 60 q 0 -20 20 -20 h20 v80 h-10 v-40 h-10 q -10 0 -10 10 v30 h-10 z M350 30 v90 h-10 v-40 h-10 v40 h-10 v-100 h10 v40 h10 v-30 z M390 110 v10 h-10 v-70 h-20 v-10 h50 v10 h-20 v60 z"/>
  <text x="282" y="117" font-family="Arial, sans-serif" font-size="95" fill="#666" font-weight="normal">g</text>
  <line x1="20" y1="160" x2="580" y2="160" stroke="#999" stroke-width="2" />
  <text x="300" y="235" font-family="Arial, sans-serif" font-size="70" fill="#666" text-anchor="middle" letter-spacing="40">PRO</text>
  <text x="175" y="115" font-family="Arial, sans-serif" font-size="80" fill="#666">r</text>
  <text x="210" y="115" font-family="Arial, sans-serif" font-size="80" fill="#666">i</text>
  <text x="345" y="115" font-family="Arial, sans-serif" font-size="80" fill="#666">h</text>
  <text x="385" y="115" font-family="Arial, sans-serif" font-size="80" fill="#666">t</text>
  <path fill="#666" d="M165 40 h7 v35 h-7 z" transform="translate(0, -10)"/> 
</svg>`)}` 
  },
  {
    id: 'oright-standard',
    name: 'O\'right (Standard)',
    src: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 160" width="500" height="160">
  <circle cx="80" cy="80" r="65" fill="#75bc37"/>
  <text x="160" y="110" font-family="sans-serif" font-size="100" fill="#666" letter-spacing="2">O&apos;right</text>
</svg>`)}`
  },
  {
    id: 'oright-pro-horizontal',
    name: 'O\'right PRO (Horizontal)',
    src: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 160" width="800" height="160">
  <circle cx="80" cy="80" r="65" fill="#75bc37"/>
  <text x="160" y="110" font-family="sans-serif" font-size="100" fill="#666" letter-spacing="2">O&apos;right</text>
  <line x1="500" y1="30" x2="500" y2="130" stroke="#999" stroke-width="3" />
  <text x="540" y="110" font-family="sans-serif" font-size="100" fill="#666" letter-spacing="10">PRO</text>
</svg>`)}`
  }
];

interface LogoSelectorProps {
  selectedLogoSrc: string | null;
  onSelect: (src: string) => void;
}

export const LogoSelector: React.FC<LogoSelectorProps> = ({ selectedLogoSrc, onSelect }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">Select Logo Brand</label>
      <div className="grid grid-cols-1 gap-3">
        {LOGO_OPTIONS.map((logo) => (
          <button
            key={logo.id}
            onClick={() => onSelect(logo.src)}
            className={`
              relative flex items-center p-4 rounded-xl border-2 transition-all duration-200 group
              ${selectedLogoSrc === logo.src 
                ? 'border-green-500 bg-green-50/50 ring-1 ring-green-500' 
                : 'border-gray-200 bg-white hover:border-green-300 hover:bg-gray-50'
              }
            `}
          >
            <div className={`
              w-4 h-4 rounded-full border flex items-center justify-center mr-4 transition-colors
              ${selectedLogoSrc === logo.src ? 'border-green-600 bg-green-600' : 'border-gray-300'}
            `}>
              {selectedLogoSrc === logo.src && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
            
            <div className="flex-1 flex items-center justify-center h-16 bg-white/50 rounded-lg overflow-hidden p-2">
                <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
            </div>
            
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-xs text-green-600 font-medium bg-white px-2 py-1 rounded-full shadow-sm">
                    Select
                </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};