export interface Theme {
  label: string;
  background: string;
  text: string;
  border: string;
}

export interface Font {
  label: string;
  className: string;
}

export const themes: Record<string, Theme> = {
  default: {
    label: "기본",
    background: "bg-slate-900",
    text: "text-white",
    border: "border-red-500",
  },
  dark: {
    label: "다크",
    background: "bg-black",
    text: "text-gray-100",
    border: "border-gray-600",
  },
  christmas: {
    label: "크리스마스",
    background: "bg-green-900",
    text: "text-red-500",
    border: "border-red-500",
  },
  newyear: {
    label: "설날",
    background: "bg-red-900",
    text: "text-yellow-500",
    border: "border-yellow-500",
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
};
