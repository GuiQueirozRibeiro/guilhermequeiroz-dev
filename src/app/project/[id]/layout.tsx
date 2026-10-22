import { Poppins, Inter, Michroma } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const michroma = Michroma({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-michroma',
  display: 'swap',
});

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${poppins.variable} ${inter.variable} ${michroma.variable}`}>
      {children}
    </div>
  );
}
