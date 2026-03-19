// map vinyl colors to Tailwind background classes
const colorClassMap: Record<string, string> = {
  orange: 'bg-orange-500',
  red: 'bg-red-600',
  purple: 'bg-violet-600',
  blue: 'bg-blue-600',
  olive: 'bg-lime-700',
  green: 'bg-green-600',
  yellow: 'bg-yellow-200',
  gold: 'bg-yellow-600',
  'hot pink': 'bg-pink-500',
  pink: 'bg-pink-400',
  brown: 'bg-amber-700',
  gray: 'bg-gray-500',
  grey: 'bg-gray-500',
  silver: 'bg-gray-500',
  smoke: 'bg-gray-700',
  black: 'bg-black',
  white: 'bg-white',
  clear: 'bg-white/30',
  mint: 'bg-teal-200',
}

// use dark text on these light colored backgrounds
const lightColors = ['white', 'yellow', 'mint']

// given a Discogs release.formats[0].text string, return a Tailwind background class
export const getColorClasses = (text: string) => {
  const color = Object.keys(colorClassMap).find((color) => text.toLowerCase().includes(color))

  const bgClass = color ? colorClassMap[color] : 'bg-chart-1'

  const textClass =
    color && lightColors.includes(color) ? 'text-primary-foreground' : 'text-secondary-foreground'

  return `${bgClass} ${textClass}`
}
