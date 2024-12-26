export interface Theme {
  label: string;
  background: string;
  text: string;
  border: string;
  className: string;
  centerClassName: string;
}

export interface Font {
  label: string;
  className: string;
}

export const themes: Record<string, Theme> = {
  dark: {
    label: "다크",
    background: "bg-slate-900",
    text: "text-slate-100",
    border: "border-slate-700",
    className: "bg-slate-800 border-slate-700 text-slate-100",
    centerClassName: "bg-slate-700 border-2 border-slate-600 text-slate-100 font-bold text-lg",
  },
  light: {
    label: "라이트",
    background: "bg-slate-100",
    text: "text-slate-900",
    border: "border-slate-200",
    className: "bg-white border-slate-200 text-black hover:bg-slate-50",
    centerClassName: "bg-white border-2 border-slate-300 text-black shadow-sm hover:bg-slate-50 font-bold text-lg",
  },
  christmas: {
    label: "크리스마스",
    background: "bg-green-900",
    text: "text-red-500",
    border: "border-red-500",
    className: "bg-green-50 border-red-200 text-green-900",
    centerClassName: "bg-red-50 border-2 border-red-500 text-red-900 font-bold text-lg",
  },
  newyear: {
    label: "설날",
    background: "bg-red-900",
    text: "text-yellow-500",
    border: "border-yellow-500",
    className: "bg-red-50 border-yellow-200 text-red-900",
    centerClassName: "bg-yellow-50 border-2 border-yellow-500 text-yellow-900 font-bold text-lg",
  },
};

export const fonts: Record<string, Font> = {
  default: {
    label: "기본",
    className: "font-sans",
  },
  serif: {
    label: "명조체",
    className: "font-serif",
  },
  mono: {
    label: "모노스페이스",
    className: "font-mono",
  },
  gothic: {
    label: "고딕",
    className: "font-noto-sans-kr",
  },
};
