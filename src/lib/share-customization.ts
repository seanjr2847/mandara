export const themes = {
  light: {
    background: 'bg-white',
    text: 'text-gray-900',
    label: '밝은 테마'
  },
  dark: {
    background: 'bg-gray-900',
    text: 'text-white',
    label: '어두운 테마'
  },
  holiday: {
    background: 'bg-red-50',
    text: 'text-red-900',
    label: '홀리데이'
  },
  newyear: {
    background: 'bg-yellow-50',
    text: 'text-yellow-900',
    label: '새해'
  },
} as const;

export const fonts = {
  default: {
    className: 'font-sans',
    label: '기본'
  },
  serif: {
    className: 'font-serif',
    label: '명조'
  },
  mono: {
    className: 'font-mono',
    label: '고정폭'
  },
  handwriting: {
    className: 'font-handwriting',
    label: '손글씨'
  },
} as const;

export type ThemeType = keyof typeof themes;
export type FontType = keyof typeof fonts;
