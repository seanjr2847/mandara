import { Theme, Font } from "@/types/mandal";

export const themes = {
  light: {
    background: 'bg-white',
    text: 'text-gray-900',
  },
  dark: {
    background: 'bg-gray-900',
    text: 'text-white',
  },
  holiday: {
    background: 'bg-red-50',
    text: 'text-red-900',
  },
  newyear: {
    background: 'bg-yellow-50',
    text: 'text-yellow-900',
  },
} as const

export const fonts = {
  default: 'font-sans',
  serif: 'font-serif',
  mono: 'font-mono',
  handwriting: 'font-handwriting',
} as const

export type Theme = keyof typeof themes
export type Font = keyof typeof fonts
