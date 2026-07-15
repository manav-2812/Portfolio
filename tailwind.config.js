export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper:        '#FAF8F4',
        'paper-dim':  '#F1EEE7',
        'paper-deep': '#E9E4D9',
        ink:          '#191714',
        'ink-soft':   '#6E6A61',
        'ink-faint':  '#9C978C',
        pine:         '#3C4A3F',
        'pine-soft':  '#6B7A6E',
        brass:        '#AE8B57',
      },
      fontFamily: {
        display: ['"Fraunces"', '"Georgia"', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
