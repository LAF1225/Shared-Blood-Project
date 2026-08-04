import { Newsreader, Source_Sans_3, Noto_Nastaliq_Urdu } from 'next/font/google';

/**
 * Typography — editorial pairing for a distinctive, trustworthy voice.
 * Newsreader: a warm editorial serif (designed for long-form reading) used for
 * headings/display. Source Sans 3: a humanist sans for body & UI.
 * Noto Nastaliq Urdu: Urdu script. Exposed as CSS variables (tailwind.config).
 */
export const fontHeading = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

export const fontBody = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
});

export const fontUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-noto-urdu',
  display: 'swap',
});

export const fontVariables = `${fontHeading.variable} ${fontBody.variable} ${fontUrdu.variable}`;
