export interface EditorSettings {
  footerColor: string;
  footerOpacity: number;
  footerHeightRatio: number;
  logoPadding: number;
  forceLogoWhite: boolean;
}

export const DEFAULT_SETTINGS: EditorSettings = {
  footerColor: '#1a331a', // Deep Dark Green
  footerOpacity: 0.4,     // Fixed at 40%

  // [調整 Bar 高度] 
  // 決定綠色底條佔整張照片高度的比例 (0.1 = 10%)
  footerHeightRatio: 0.15, 

  // [調整 Logo 大小] 
  // 決定 Logo 在底條內的上下留白比例 (0.25 = 上下各留 25% 空間，Logo 本身佔 50% 高度)
  // 若要 Logo 變大：請改小這個數字 (例如 改成 0.15)
  // 若要 Logo 變小：請改大這個數字 (例如 改成 0.35)
  logoPadding: 0.12,      

  forceLogoWhite: false,
};
