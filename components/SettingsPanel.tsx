import React from 'react';
import { EditorSettings } from '../types';

interface SettingsPanelProps {
  settings: EditorSettings;
  onChange: (newSettings: EditorSettings) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onChange }) => {
  const handleChange = <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-6">
      <h3 className="font-bold text-gray-800 border-b pb-2">Appearance</h3>
      
      {/* Footer Color */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Footer Color</label>
        <div className="flex gap-2 items-center">
          <input 
            type="color" 
            value={settings.footerColor}
            onChange={(e) => handleChange('footerColor', e.target.value)}
            className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
          />
          <span className="text-xs text-gray-400 font-mono">{settings.footerColor}</span>
        </div>
      </div>

      {/* Footer Opacity */}
      <div>
        <div className="flex justify-between mb-1">
            <label className="text-xs font-medium text-gray-500">Transparency</label>
            <span className="text-xs text-gray-400">{Math.round(settings.footerOpacity * 100)}%</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.05"
          value={settings.footerOpacity}
          onChange={(e) => handleChange('footerOpacity', parseFloat(e.target.value))}
          className="w-full accent-green-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Footer Height */}
      <div>
        <div className="flex justify-between mb-1">
            <label className="text-xs font-medium text-gray-500">Bar Height</label>
            <span className="text-xs text-gray-400">{Math.round(settings.footerHeightRatio * 100)}%</span>
        </div>
        <input 
          type="range" 
          min="0.05" 
          max="0.4" 
          step="0.01"
          value={settings.footerHeightRatio}
          onChange={(e) => handleChange('footerHeightRatio', parseFloat(e.target.value))}
          className="w-full accent-green-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

       {/* Logo Options */}
       <div className="pt-2 border-t">
         <label className="flex items-center gap-3 cursor-pointer group">
            <input 
                type="checkbox"
                checked={settings.forceLogoWhite}
                onChange={(e) => handleChange('forceLogoWhite', e.target.checked)}
                className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900">Force Logo White</span>
         </label>
         <p className="text-[10px] text-gray-400 mt-1 pl-7">Useful if your logo is dark and needs to stand out on the green bar.</p>
       </div>
    </div>
  );
};