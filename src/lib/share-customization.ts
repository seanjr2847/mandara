import { Theme, Font } from "@/types/mandal";

export const themes: Record<string, Theme> = {
  default: {
    label: "기본",
    className: "bg-white border border-slate-300 text-slate-900 shadow-sm hover:bg-slate-50",
    centerClassName: "bg-slate-900 border-2 border-slate-700 text-white shadow font-bold hover:bg-slate-800",
    background: "bg-slate-100"
  },
  snow: {
    label: "스노우",
    className: "bg-sky-600 border border-sky-500 text-white shadow-sm hover:bg-sky-500",
    centerClassName: "bg-sky-800 border-2 border-sky-600 text-white shadow font-bold hover:bg-sky-700",
    background: "bg-gradient-to-b from-sky-700 to-sky-900"
  },
  gold: {
    label: "골드",
    className: "bg-amber-600 border border-amber-500 text-white shadow-sm hover:bg-amber-500",
    centerClassName: "bg-amber-800 border-2 border-amber-600 text-white shadow font-bold hover:bg-amber-700",
    background: "bg-gradient-to-b from-amber-700 to-amber-900"
  },
  christmas: {
    label: "크리스마스",
    className: "bg-red-600 border border-red-500 text-white shadow-sm hover:bg-red-500",
    centerClassName: "bg-red-800 border-2 border-red-600 text-white shadow font-bold hover:bg-red-700",
    background: "bg-gradient-to-b from-red-700 to-red-900"
  },
  forest: {
    label: "포레스트",
    className: "bg-emerald-600 border border-emerald-500 text-white shadow-sm hover:bg-emerald-500",
    centerClassName: "bg-emerald-800 border-2 border-emerald-600 text-white shadow font-bold hover:bg-emerald-700",
    background: "bg-gradient-to-b from-emerald-700 to-emerald-900"
  }
};

export const fonts: Record<string, Font> = {
  default: {
    label: "기본",
    className: "font-sans"
  },
  gothic: {
    label: "고딕",
    className: "font-gothic"
  },
  handwriting: {
    label: "손글씨",
    className: "font-handwriting"
  }
};
