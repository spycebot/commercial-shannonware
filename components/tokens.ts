export const T = {
  body:  `'Special Elite', 'Courier New', serif`,
  mono:  `'Share Tech Mono', 'Courier New', monospace`,
  ink:   '#1a1208',
  ink2:  '#3c2a10',
  fade:  '#6b5438',
  blue:  '#18385a',
  amber: '#7a5c0a',
} as const;

export const PAPER: React.CSSProperties = {
  backgroundColor: '#ede2bc',
  backgroundImage: [
    'radial-gradient(ellipse 110% 75% at 50% -8%, rgba(248,235,198,0.45) 0%, transparent 55%)',
    'radial-gradient(ellipse 160% 55% at 50% 112%, rgba(88,58,10,0.20) 0%, transparent 65%)',
    'radial-gradient(ellipse 55% 150% at -6% 50%, rgba(96,64,14,0.14) 0%, transparent 65%)',
    'radial-gradient(ellipse 55% 150% at 106% 50%, rgba(96,64,14,0.14) 0%, transparent 65%)',
    'radial-gradient(ellipse 30% 18% at 13% 19%, rgba(148,108,36,0.26) 0%, transparent 100%)',
    'radial-gradient(ellipse 20% 28% at 83% 12%, rgba(138,98,30,0.20) 0%, transparent 100%)',
    'radial-gradient(ellipse 18% 24% at 74% 81%, rgba(155,114,42,0.22) 0%, transparent 100%)',
    'radial-gradient(ellipse 34% 16% at 30% 91%, rgba(126,88,26,0.17) 0%, transparent 100%)',
    'radial-gradient(ellipse 24% 20% at 60% 50%, rgba(168,128,48,0.11) 0%, transparent 100%)',
    'radial-gradient(ellipse 16% 22% at 48% 74%, rgba(135,95,30,0.13) 0%, transparent 100%)',
    'linear-gradient(168deg, #f6edd2 0%, #ede3bc 25%, #f1e8cb 55%, #e8ddb4 100%)',
  ].join(','),
};
