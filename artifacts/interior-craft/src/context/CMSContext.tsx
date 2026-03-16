import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultData } from '@/lib/defaultData';

type CMSData = typeof defaultData;

interface CMSContextType {
  data: CMSData;
  updateData: (newData: Partial<CMSData> | ((prev: CMSData) => CMSData)) => void;
  resetToDefault: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CMSData>(() => {
    try {
      const stored = localStorage.getItem('interiorcraft_data');
      return stored ? JSON.parse(stored) : defaultData;
    } catch {
      return defaultData;
    }
  });

  useEffect(() => {
    localStorage.setItem('interiorcraft_data', JSON.stringify(data));
    
    // Apply CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary', hexToHsl(data.settings.accentColor));
    root.style.setProperty('--background', hexToHsl(data.settings.bgColor));
  }, [data]);

  const updateData = (newData: Partial<CMSData> | ((prev: CMSData) => CMSData)) => {
    setData((prev) => {
      const updated = typeof newData === 'function' ? newData(prev) : { ...prev, ...newData };
      return updated;
    });
  };

  const resetToDefault = () => setData(defaultData);

  return (
    <CMSContext.Provider value={{ data, updateData, resetToDefault }}>
      {children}
    </CMSContext.Provider>
  );
}

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within CMSProvider');
  return context;
};

function hexToHsl(hex: string): string {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
